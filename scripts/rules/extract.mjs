// Column-aware PDF text extractor for the Marvel Legendary Universal Rulebook.
// Reconstructs reading order by detecting a vertical gutter (single-level XY-cut)
// per page, so 2-column reference pages read left-column-then-right-column
// instead of interleaving. Emits page markers for section mapping.
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import fs from "node:fs";

const PDF = process.argv[2];
const OUT = process.argv[3];

// Recursive XY-cut: separate a block of words into reading order by alternately
// finding full-height vertical gutters (→ columns, left-to-right) and full-width
// horizontal gaps (→ stacked blocks, top-to-bottom). Handles pages that mix a
// full-width intro with a 2-column body below it.
function medianLineHeight(words) {
  const hs = words.map((w) => w.h).sort((a, b) => a - b);
  return hs[Math.floor(hs.length / 2)] || 8;
}

// Find maximal empty bands along one axis. A bin counts as "empty" when at most
// `tol` words cross it (tolerance lets a centered header/footer that straddles a
// column gutter not veto the gutter). Returns {lo, hi, size} ranges >= minGap.
function findGaps(words, axis /* 'x' or 'y' */, minGap, tol = 0) {
  const lo = (w) => (axis === "x" ? w.x0 : w.yTop);
  const hi = (w) => (axis === "x" ? w.x1 : w.yTop + w.h);
  const min = Math.min(...words.map(lo));
  const max = Math.max(...words.map(hi));
  const step = 1;
  const n = Math.ceil((max - min) / step) + 1;
  const count = new Array(n).fill(0);
  for (const w of words) {
    const a = Math.max(0, Math.floor((lo(w) - min) / step));
    const b = Math.min(n - 1, Math.floor((hi(w) - min) / step));
    for (let i = a; i <= b; i++) count[i]++;
  }
  const gaps = [];
  let run = -1;
  for (let i = 0; i <= n; i++) {
    const empty = i < n && count[i] <= tol;
    if (empty && run < 0) run = i;
    if (!empty && run >= 0) {
      const g0 = min + run * step;
      const g1 = min + i * step;
      if (run > 0 && i < n && g1 - g0 >= minGap) gaps.push({ lo: g0, hi: g1, size: g1 - g0 });
      run = -1;
    }
  }
  return gaps;
}

function splitAt(words, cuts, axis) {
  const center = (w) => (axis === "x" ? (w.x0 + w.x1) / 2 : w.yTop + w.h / 2);
  const sorted = [...cuts].sort((a, b) => a - b);
  const groups = [];
  let prev = -Infinity;
  for (const c of [...sorted, Infinity]) {
    const g = words.filter((w) => center(w) >= prev && center(w) < c);
    if (g.length) groups.push(g);
    prev = c;
  }
  return groups;
}

// Detect a column gutter as a low-density valley in the vertical coverage
// profile (justified text reaches close to the gutter, so a strictly-empty band
// is too narrow — the gutter is a coverage minimum, not a zero run). Returns the
// cut x, or null. Only cuts when the valley is far emptier than the columns on
// either side and both sides hold real content.
function findColumnCut(words) {
  const minX = Math.min(...words.map((w) => w.x0));
  const maxX = Math.max(...words.map((w) => w.x1));
  const W = maxX - minX;
  if (W < 60) return null;
  const step = 2;
  const n = Math.ceil(W / step) + 1;
  const cov = new Array(n).fill(0); // # of words crossing each x-bin
  for (const w of words) {
    const a = Math.max(0, Math.floor((w.x0 - minX) / step));
    const b = Math.min(n - 1, Math.floor((w.x1 - minX) / step));
    for (let i = a; i <= b; i++) cov[i]++;
  }
  const pad = Math.floor(n * 0.25); // only look for a gutter in the central half
  let bestI = -1;
  let bestCov = Infinity;
  for (let i = pad; i <= n - pad; i++) {
    if (cov[i] < bestCov) {
      bestCov = cov[i];
      bestI = i;
    }
  }
  if (bestI < 0) return null;
  const cutX = minX + bestI * step;
  // typical column density = median coverage over the central region
  const central = cov.slice(pad, n - pad).sort((a, b) => a - b);
  const medCov = central[Math.floor(central.length / 2)] || 0;
  const left = words.filter((w) => (w.x0 + w.x1) / 2 < cutX);
  const right = words.filter((w) => (w.x0 + w.x1) / 2 >= cutX);
  const enough = Math.max(4, words.length * 0.12);
  if (
    bestCov <= Math.max(1, medCov * 0.18) &&
    left.length >= enough &&
    right.length >= enough
  ) {
    return cutX;
  }
  return null;
}

function xycut(words, mlh) {
  if (words.length <= 1) return [words];
  const Hmin = mlh * 1.6; // horizontal gap between stacked blocks (> line spacing)

  // 1) Peel full-width stacked blocks first (strict: no word may cross the band),
  //    separating centered headers / full-width intros from a columnar body.
  const hGaps = findGaps(words, "y", Hmin, 0);
  if (hGaps.length) {
    const groups = splitAt(words, hGaps.map((g) => (g.lo + g.hi) / 2), "y");
    if (groups.length > 1) return groups.flatMap((g) => xycut(g, mlh));
  }

  // 2) Then split into columns at a low-density gutter valley (recursion handles
  //    3+ columns and per-column stacked blocks).
  const cutX = findColumnCut(words);
  if (cutX !== null) {
    const groups = splitAt(words, [cutX], "x");
    if (groups.length > 1) return groups.flatMap((g) => xycut(g, mlh));
  }

  return [words]; // leaf
}

const BOLD_FONT = "g_d0_f2";
const HEAD_FONTS = new Set(["g_d0_f4", "g_d0_f5"]);

// Returns array of line objects {text, h, boldFrac, headFrac, para} where `para`
// marks a paragraph break before this line.
function emitBlock(col) {
  col.sort((a, b) => a.yTop - b.yTop || a.x0 - b.x0);
  const lines = [];
  let cur = null;
  for (const w of col) {
    if (!cur || Math.abs(w.yTop - cur.yTop) > w.h * 0.6) {
      cur = { yTop: w.yTop, h: w.h, words: [w] };
      lines.push(cur);
    } else {
      cur.words.push(w);
      if (w.h > cur.h) cur.h = w.h;
    }
  }
  const out = [];
  let prevBot = null;
  let prevH = null;
  for (const ln of lines) {
    ln.words.sort((a, b) => a.x0 - b.x0);
    let s = "";
    let px1 = null;
    let boldChars = 0;
    let headChars = 0;
    let totalChars = 0;
    for (const w of ln.words) {
      if (px1 !== null) {
        const gap = w.x0 - px1;
        // A gap ~a full character wide with no text is a lost inline icon image
        // (Attack/Recruit/VP/cost symbols are images, not glyphs, in this PDF).
        if (gap > w.h * 0.85) {
          if (!s.endsWith(" ")) s += " ";
          s += "◈ "; // ◈ icon placeholder
        } else if (gap > w.h * 0.18 && !s.endsWith(" ") && !w.str.startsWith(" ")) {
          s += " ";
        }
      }
      s += w.str;
      px1 = w.x1;
      const nc = w.str.replace(/\s/g, "").length;
      totalChars += nc;
      if (w.font === BOLD_FONT) boldChars += nc;
      if (HEAD_FONTS.has(w.font)) headChars += nc;
    }
    const text = s.replace(/[ \t]+/g, " ").trim();
    if (!text) continue;
    const gapAbove = prevBot !== null ? ln.yTop - prevBot : 0;
    const para = prevBot !== null && gapAbove > (prevH || ln.h) * 0.8;
    out.push({
      text,
      h: Math.round(ln.h * 10) / 10,
      boldFrac: totalChars ? boldChars / totalChars : 0,
      headFrac: totalChars ? headChars / totalChars : 0,
      para,
    });
    prevBot = ln.yTop + ln.h;
    prevH = ln.h;
  }
  return out;
}

function reconstructPage(items) {
  const words = items.filter((i) => i.str.trim().length > 0);
  if (words.length === 0) return [];
  const mlh = medianLineHeight(words);
  const blocks = xycut(words, mlh);
  const lines = [];
  blocks.forEach((b, i) => {
    if (i > 0) lines.push({ blockBreak: true });
    lines.push(...emitBlock(b));
  });
  return lines;
}

const doc = await getDocument({ url: PDF, useSystemFonts: true }).promise;
const parts = [];
for (let p = 1; p <= doc.numPages; p++) {
  const page = await doc.getPage(p);
  const vp = page.getViewport({ scale: 1 });
  const tc = await page.getTextContent();
  const items = tc.items
    .filter((it) => "str" in it)
    .map((it) => {
      const tr = it.transform; // [a,b,c,d,e,f]
      const x0 = tr[4];
      const yBaseline = tr[5];
      const h = Math.abs(tr[0]) || it.height || 8; // font size from transform scale
      const w = it.width || 0;
      return { str: it.str, x0, x1: x0 + w, yTop: vp.height - yBaseline - h, h, font: it.fontName };
    });
  parts.push({ page: p, lines: reconstructPage(items) });
}
fs.writeFileSync(OUT, JSON.stringify(parts), "utf8");
// readable text dump alongside, for eyeballing
const txt = parts
  .map(
    (pg) =>
      `\n\f=== PAGE ${pg.page} ===\n` +
      pg.lines
        .map((l) => (l.blockBreak ? "" : (l.para ? "\n" : "") + l.text))
        .join("\n"),
  )
  .join("\n");
fs.writeFileSync(OUT.replace(/\.json$/, ".txt"), txt, "utf8");
console.log(`Wrote ${OUT}: ${doc.numPages} pages`);
