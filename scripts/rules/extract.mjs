// Column-aware PDF text extractor for the Marvel Legendary Universal Rulebook.
// Reconstructs reading order by detecting a vertical gutter (single-level XY-cut)
// per page, so 2-column reference pages read left-column-then-right-column
// instead of interleaving. Emits page markers for section mapping.
import { getDocument, OPS } from "pdfjs-dist/legacy/build/pdf.mjs";
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
        // Inline icons are injected as pseudo-words (str = "{{icon:N}}"), so a
        // wide gap no longer needs a placeholder — just normal word spacing.
        if (gap > w.h * 0.18 && !s.endsWith(" ") && !w.str.startsWith(" ")) s += " ";
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

// ── Inline icon extraction ───────────────────────────────────────────────────
// The rulebook's game symbols (Attack/Recruit/class/team icons) are drawn as
// small filled vector paths, not glyphs or images. Extract each icon glyph, its
// device-space position, a shape signature (rasterized grid) for clustering, and
// a normalized path `d` for a faithful inline-SVG fallback. iconMap.json (built
// once, committed) maps a stable cluster id → asset name.
const IG = 20; // signature grid resolution
const matMul = (a, b) => [
  a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1],
  a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3],
  a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5],
];
const matApply = (m, x, y) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
function gridSig(fills) {
  const all = fills.flatMap((f) => f.pts);
  const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys);
  const w = Math.max(...xs) - x0 || 1, h = Math.max(...ys) - y0 || 1;
  const g = new Uint8Array(IG * IG);
  for (const f of fills)
    for (let i = 0; i < f.pts.length; i++) {
      const a = f.pts[i], b = f.pts[(i + 1) % f.pts.length];
      for (let s = 0; s <= 10; s++) {
        const t = s / 10, px = a[0] + (b[0] - a[0]) * t, py = a[1] + (b[1] - a[1]) * t;
        g[Math.min(IG - 1, Math.floor((py - y0) / h * IG)) * IG + Math.min(IG - 1, Math.floor((px - x0) / w * IG))] = 1;
      }
    }
  return g;
}
const hamming = (a, b) => { let d = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++; return d; };

function extractIconGlyphs(ops, vpHeight) {
  let ctm = [1, 0, 0, 1, 0, 0];
  const stack = [];
  let cur = null;
  const fills = [];
  for (let i = 0; i < ops.fnArray.length; i++) {
    const fn = ops.fnArray[i], a = ops.argsArray[i];
    if (fn === OPS.save) stack.push(ctm.slice());
    else if (fn === OPS.restore) ctm = stack.pop() || [1, 0, 0, 1, 0, 0];
    else if (fn === OPS.transform) ctm = matMul(ctm, a);
    else if (fn === OPS.constructPath) {
      const c = a[1];
      cur = cur || [];
      for (let k = 0; k + 1 < c.length; k += 2) {
        const [dx, dy] = matApply(ctm, c[k], c[k + 1]);
        cur.push([dx, vpHeight - dy]);
      }
    } else if (fn === OPS.fill || fn === OPS.eoFill) {
      if (cur && cur.length) {
        const xs = cur.map((q) => q[0]), ys = cur.map((q) => q[1]);
        const w = Math.max(...xs) - Math.min(...xs), h = Math.max(...ys) - Math.min(...ys);
        if (w > 3 && w < 18 && h > 3 && h < 18)
          fills.push({ pts: cur, cx: (Math.min(...xs) + Math.max(...xs)) / 2, cy: (Math.min(...ys) + Math.max(...ys)) / 2 });
      }
      cur = null;
    } else if (fn === OPS.endPath) cur = null;
  }
  fills.sort((a, b) => a.cy - b.cy || a.cx - b.cx);
  const glyphs = [];
  for (const f of fills) {
    let g = glyphs.find((g) => Math.abs(g.cx - f.cx) < 8 && Math.abs(g.cy - f.cy) < 8);
    if (!g) { g = { cx: f.cx, cy: f.cy, fills: [f] }; glyphs.push(g); }
    else g.fills.push(f);
  }
  return glyphs.map((g) => {
    const all = g.fills.flatMap((f) => f.pts);
    const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]);
    const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
    const d = g.fills.map((f) => "M" + f.pts.map((p) => `${(p[0] - x0).toFixed(1)},${(p[1] - y0).toFixed(1)}`).join("L") + "Z").join("");
    return { cx: g.cx, cy: g.cy, w, h, grid: gridSig(g.fills), d };
  });
}

const doc = await getDocument({ url: PDF, useSystemFonts: true }).promise;

// ── Phase A: collect text items + icon glyphs per page ───────────────────────
const pageData = [];
const allGlyphs = []; // {page, cx, cy, w, h, grid, d}
for (let p = 1; p <= doc.numPages; p++) {
  const page = await doc.getPage(p);
  const vp = page.getViewport({ scale: 1 });
  const tc = await page.getTextContent();
  const items = tc.items
    .filter((it) => "str" in it)
    .map((it) => {
      const tr = it.transform;
      const x0 = tr[4];
      const h = Math.abs(tr[0]) || it.height || 8;
      const w = it.width || 0;
      return { str: it.str, x0, x1: x0 + w, yTop: vp.height - tr[5] - h, h, font: it.fontName };
    });
  const ops = await page.getOperatorList();
  const glyphs = extractIconGlyphs(ops, vp.height);
  for (const g of glyphs) allGlyphs.push({ page: p, ...g });
  pageData.push({ page: p, items });
}

// ── Cluster icon glyphs (Hamming merge), order deterministically, assign ids ──
const clusters = []; // {grid, count, d, w, h}
const TH = Math.round(IG * IG * 0.1);
for (const g of allGlyphs) {
  let best = null, bd = Infinity;
  for (const c of clusters) { const dd = hamming(c.grid, g.grid); if (dd < bd) { bd = dd; best = c; } }
  if (best && bd <= TH) { best.count++; g.cluster = best; }
  else { const c = { grid: g.grid, count: 1, d: g.d, w: g.w, h: g.h }; clusters.push(c); g.cluster = c; }
}
// deterministic order: by count desc, then by signature bytes
clusters.sort((a, b) => b.count - a.count || Buffer.from(a.grid).compare(Buffer.from(b.grid)));
clusters.forEach((c, i) => (c.id = i));
// icon-shapes.json: id → normalized path + viewBox (for inline-SVG fallback)
const shapes = clusters.map((c) => ({ id: c.id, count: c.count, w: +c.w.toFixed(1), h: +c.h.toFixed(1), d: c.d }));
fs.writeFileSync(OUT.replace(/\.json$/, "-icons.json"), JSON.stringify(shapes), "utf8");

// ── Phase B: reconstruct each page with icons injected as pseudo-words ────────
const parts = [];
for (const pd of pageData) {
  const iconWords = allGlyphs
    .filter((g) => g.page === pd.page)
    .map((g) => ({ str: `{{icon:${g.cluster.id}}}`, x0: g.cx - g.w / 2, x1: g.cx + g.w / 2, yTop: g.cy - g.h / 2, h: g.h, font: "icon" }));
  parts.push({ page: pd.page, lines: reconstructPage([...pd.items, ...iconWords]) });
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
