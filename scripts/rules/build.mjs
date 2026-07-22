// build.mjs — assemble the Marvel Legendary Universal Rulebook v23 into a single
// Hugo markdown page from the column-aware extraction (pages.json).
//
// Reading order is reconstructed by extract.mjs. This step adds document
// structure (section H2s, subsection/entry H3s, bullet lists) and stable anchor
// ids that the registry-viewer glossary deep-links to. Anchor ids are driven
// FROM the glossary labels (keyword-<slug(label)> / rule-<slug(label)>) so every
// cross-reference the viewer generates resolves to a real element on the page.
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Usage: node build.mjs <pages.json> <engine-repo-root> <out-index.md>
const PAGES_JSON = process.argv[2];
const ENGINE = process.argv[3];
const OUT_INDEX = process.argv[4] || "content/rules/index.md";
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const pages = JSON.parse(fs.readFileSync(PAGES_JSON, "utf8"));
const keywordsJson = JSON.parse(fs.readFileSync(`${ENGINE}/data/metadata/keywords-full.json`, "utf8"));
const rulesJson = JSON.parse(fs.readFileSync(`${ENGINE}/data/metadata/rules-full.json`, "utf8"));
// Icon shape data (per-cluster fallback SVG paths) sits beside pages.json;
// icon-map.json (cluster id → asset) is committed beside this script.
const iconShapes = JSON.parse(fs.readFileSync(PAGES_JSON.replace(/\.json$/, "-icons.json"), "utf8"));
const iconMap = JSON.parse(fs.readFileSync(`${SCRIPT_DIR}/icon-map.json`, "utf8"));
const shapeById = new Map(iconShapes.map((s) => [s.id, s]));

// Render an inline icon token {{icon:N}} to HTML: the mapped asset <img> (with
// derived alt text), the literal "*" for the asterisk symbol, or — for
// unidentified clusters — a faithful monochrome inline SVG from the PDF paths.
function iconAlt(assetPath) {
  const base = assetPath.split("/").pop().replace(/^(info|class|team)-/, "");
  return base.split("-").map((w) => (w === "vp" ? "VP" : w[0].toUpperCase() + w.slice(1))).join(" ");
}
const EXTRACTED_DIR = "static/img/icons/rules-extracted";
const usedFallbacks = new Set();
function renderIcon(id) {
  const asset = iconMap[String(id)];
  if (asset === "*") return "\\*";
  if (asset) return `<img src="/img/icons/${asset}.svg" alt="${iconAlt(asset)}" class="rules-icon">`;
  const s = shapeById.get(id);
  if (!s) return "";
  // Unidentified icon: reference a generated monochrome SVG file (kept out of the
  // page so it stays small — 900+ icons would bloat it as inline SVG).
  usedFallbacks.add(id);
  return `<img src="/img/icons/rules-extracted/icon-${id}.svg" alt="game symbol" class="rules-icon">`;
}
function writeFallbackSvgs() {
  fs.mkdirSync(EXTRACTED_DIR, { recursive: true });
  for (const id of usedFallbacks) {
    const s = shapeById.get(id);
    fs.writeFileSync(
      `${EXTRACTED_DIR}/icon-${id}.svg`,
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s.w} ${s.h}"><path d="${s.d}" fill="#6a6a72" fill-rule="evenodd"/></svg>`,
    );
  }
}
const renderIcons = (str) =>
  str.replace(/[ \t]*\{\{icon:(\d+)\}\}[ \t]*/g, (_, n) => ` ${renderIcon(+n)} `).replace(/[ \t]{2,}/g, " ");

const slug = (s) =>
  s.toLowerCase().replace(/[’'“”"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

const SECTIONS = [
  { title: "Overview", id: "overview" },
  { title: "Gameplay", id: "gameplay" },
  { title: "General Game Setup", id: "general-game-setup" },
  { title: "Playing the Game", id: "playing-the-game" },
  { title: "Keyword Abilities", id: "keyword-abilities", kind: "keywords" },
  { title: "Card Clarifications", id: "card-clarifications", kind: "clarifications" },
  { title: "Additional Rules and Clarifications", id: "additional-rules", kind: "rules" },
  { title: "Expansion Flavor texts", id: "expansion-flavor" },
  { title: "Card lists by Expansion", id: "card-lists", kind: "cardlists" },
  { title: "Errata", id: "errata" },
  { title: "Quick Setup Guide: Hero Board", id: "quick-setup-hero" },
  { title: "Quick Setup Guide: Villain Board", id: "quick-setup-villain" },
];
const sectionByNorm = new Map(SECTIONS.map((s) => [norm(s.title), s]));
const kwLabels = keywordsJson.map((e) => e.label);
const pluralEq = (a, b) => a === b || a === b + "s" || a + "s" === b;

// ── Locate each section's start page (h>=15 title) ───────────────────────────
const startPage = new Map();
for (const pg of pages) {
  for (const l of pg.lines) {
    if (!l.blockBreak && l.h >= 15) {
      const sec = sectionByNorm.get(norm(l.text));
      if (sec && !startPage.has(sec.id)) startPage.set(sec.id, pg.page);
    }
  }
}
// Dense reference sections mis-order their title within the page, so attribute
// them by page range instead of stream position. [start, nextSectionStart).
const KIND_ORDER = ["keyword-abilities", "card-clarifications", "additional-rules", "card-lists"];
const nextStart = {
  "keyword-abilities": startPage.get("card-clarifications"),
  "card-clarifications": startPage.get("additional-rules"),
  "additional-rules": startPage.get("expansion-flavor"),
  "card-lists": startPage.get("errata"),
};
function rangeSection(pageNum) {
  for (const id of KIND_ORDER) {
    const s = startPage.get(id);
    const e = nextStart[id];
    if (s != null && e != null && pageNum >= s && pageNum < e) return SECTIONS.find((x) => x.id === id);
  }
  return null;
}

// ── Flatten pages → line stream, dropping front matter and page-number junk.
//    Each line is tagged with its section: kind sections by page range, other
//    sections by stream-order title carryover. Section-title lines are marked
//    `skipTitle` (the H2 is hoisted to the section's first content instead). ───
const isJunk = (t) => /^\d{1,3}$/.test(t) || /^[ivxlcdm]{1,5}$/i.test(t) || /^®+$/.test(t);
const stream = [];
let started = false;
let streamSection = null;
for (const pg of pages) {
  const kind = rangeSection(pg.page);
  for (const l of pg.lines) {
    if (l.blockBreak) {
      if (started) stream.push({ blockBreak: true });
      continue;
    }
    if (!started) {
      if (l.h >= 15 && norm(l.text) === "overview") started = true;
      else continue;
    }
    if (isJunk(l.text)) continue;
    const titleSec = l.h >= 15 ? sectionByNorm.get(norm(l.text)) : null;
    if (titleSec && !kind) streamSection = titleSec; // non-kind title updates carryover
    const sec = kind || streamSection;
    stream.push({ ...l, sec, skipTitle: !!titleSec });
  }
}

// ── Parse the stream into structured blocks ──────────────────────────────────
const bulletRe = /^[•○]\s*/;
const blocks = [];
const emittedH2 = new Set();
const seenHeadingIds = new Set();

// Emit a section's H2 the first time its content appears (hoisting), so a section
// whose title mis-orders within its page still renders its heading first.
function ensureH2(sec) {
  if (!sec || emittedH2.has(sec.id)) return;
  emittedH2.add(sec.id);
  blocks.push({ type: "h2", text: sec.title, section: sec, id: sec.id });
}

// A keyword heading line is JUST the keyword name — possibly with a single
// trailing period, a singular/plural difference, or a printed parenthetical the
// glossary label omits ("Circle of Kung-Fu (and Quack-Fu)"). Anything longer is
// body text, not a heading.
function keywordHeadingText(text) {
  const raw = text.trim().replace(/\.$/, "").trim(); // drop one trailing period
  const n = norm(raw);
  const rl = raw.toLowerCase();
  for (const L of kwLabels) {
    if (pluralEq(n, norm(L))) return raw;
    if (rl.startsWith(L.toLowerCase() + " (") && raw.endsWith(")")) return raw;
  }
  return null;
}

for (let i = 0; i < stream.length; i++) {
  const l = stream[i];
  if (l.blockBreak) {
    blocks.push({ type: "break" });
    continue;
  }
  let text = l.text.trim();
  if (!text) continue;
  const section = l.sec || null;
  ensureH2(section);

  // Section-title lines are hoisted via ensureH2 — skip the in-stream title.
  if (l.skipTitle) continue;

  // Merge a heading that wrapped onto continuation lines (same large height,
  // continuation not flagged as a new paragraph).
  const isHeadLine = (x) => x && !x.blockBreak && x.h >= 13 && !x.skipTitle;
  if (l.h >= 13) {
    let j = i + 1;
    while (isHeadLine(stream[j]) && stream[j].para !== true && !isJunk(stream[j].text.trim())) {
      text += " " + stream[j].text.trim();
      j++;
    }
    i = j - 1;
    if (section && section.kind === "rules") {
      const id = `rule-${slug(text)}`;
      if (seenHeadingIds.has(id)) continue;
      seenHeadingIds.add(id);
    }
    blocks.push({ type: "h3", text, section });
    continue;
  }

  // Keyword entry name (h~12) — dictionary / printed-title match
  if (section && section.kind === "keywords" && !bulletRe.test(text)) {
    const kwText = keywordHeadingText(text);
    if (kwText) {
      const id = `keyword-${slug(kwText)}`;
      // A definition split across columns/pages repeats its name — merge the
      // continuation under the first occurrence instead of emitting a dup anchor.
      if (!seenHeadingIds.has(id)) {
        seenHeadingIds.add(id);
        blocks.push({ type: "h3", text: kwText, section, keyword: true });
      }
      continue;
    }
  }

  // Card-clarification entry name (short, ends with colon, starts a block)
  if (
    section &&
    section.kind === "clarifications" &&
    l.para &&
    /:$/.test(text) &&
    text.split(/\s+/).length <= 10 &&
    !bulletRe.test(text)
  ) {
    blocks.push({ type: "h4", text: text.replace(/:$/, ""), section });
    continue;
  }

  // Card-list category label
  if (section && section.kind === "cardlists" && !bulletRe.test(text)) {
    if (/^\d+\s+\S/.test(text) || /^(Special|Sidekicks|Bystanders)\b/i.test(text)) {
      blocks.push({ type: "label", text, section });
      continue;
    }
  }

  // Bullet item (may hold several ○-delimited items merged on one line). In the
  // card lists a ○ bullet's indent gap is misread as a leading icon — strip it.
  if (bulletRe.test(text)) {
    const chunks = text.split(/[•○]/).map((c) => c.trim()).filter(Boolean);
    for (let c of chunks) {
      if (section && section.kind === "cardlists") c = c.replace(/^◈\s*/, "");
      blocks.push({ type: "li", text: c, section });
    }
    continue;
  }

  // Body text. Merge wrapped continuation lines into the current paragraph (or
  // the current list item) — the rulebook wraps sentences across many lines, and
  // each is otherwise emitted as its own one-line paragraph. A real paragraph
  // break (para flag) or an intervening heading/bullet/block-break starts fresh.
  const prev = blocks[blocks.length - 1];
  if (prev && prev.type === "li" && !l.para) {
    prev.text += " " + text;
    continue;
  }
  if (prev && prev.type === "p" && !l.para) {
    prev.text += " " + text;
    continue;
  }
  blocks.push({ type: "p", text, para: l.para === true, section });
}

// ── Assign anchor aliases from glossary labels ───────────────────────────────
// Collect heading blocks and give each a primary id. Then, for every glossary
// label, attach an alias id (keyword-/rule-<slug(label)>) to its best-matching
// heading so the registry viewer's links always resolve.
const headings = blocks.filter((b) => b.type === "h2" || b.type === "h3" || b.type === "h4");
const usedIds = new Set();
const uniqueId = (base) => {
  let id = base || "section";
  let n = 1;
  while (usedIds.has(id)) id = `${base}-${n++}`;
  usedIds.add(id);
  return id;
};
for (const h of headings) {
  // Every heading gets a stable explicit id so the on-page Contents links and the
  // registry-viewer deep-links all resolve (Hugo's auto-slugging would append
  // -1/-2 to the many duplicate names like "Locations", breaking anchors).
  if (h.type === "h2") h.primaryId = uniqueId(h.id);
  else if (h.keyword) h.primaryId = uniqueId(`keyword-${slug(h.text)}`);
  else if (h.section && h.section.kind === "rules") h.primaryId = uniqueId(`rule-${slug(h.text)}`);
  else h.primaryId = uniqueId(slug(h.text));
  h.aliases = new Set();
}
// A few glossary rule labels map to a differently-worded rulebook heading (or to
// a concept the rulebook files under the keyword section). Point the alias at the
// heading whose normalized text matches the target here.
const MANUAL_RULE_TARGET = {
  "veiled schemes": "veiled and unveiled schemes",
  "unveiled schemes": "veiled and unveiled schemes",
  "transforming schemes": "double-sided transforming schemes",
  "additional mastermind": "villains ascending to become additional masterminds",
};
function attachAlias(labels, prefix, kind) {
  const pool = headings.filter((h) => h.section && h.section.kind === kind);
  for (const label of labels) {
    const id = `${prefix}-${slug(label)}`;
    const ln = norm(label);
    const manual = MANUAL_RULE_TARGET[label.toLowerCase()];
    // Variant keywords ("Double Abomination", "Highest Striker") are explained
    // inside their base keyword's entry — point the alias at the base heading.
    const base = label.replace(/^(Double|Triple|Quadruple|Highest|Ultimate)\s+/i, "");
    let hit =
      (manual && headings.find((h) => norm(h.text) === norm(manual))) ||
      pool.find((h) => (h.primaryId || "") === id) ||
      pool.find((h) => norm(h.text) === ln) ||
      pool.find((h) => norm(h.text).startsWith(ln) || ln.startsWith(norm(h.text))) ||
      // last resort: a heading of any kind that names the same concept
      headings.find((h) => norm(h.text) === ln) ||
      (base !== label && pool.find((h) => pluralEq(norm(h.text), norm(base))));
    if (hit && hit.primaryId !== id && !(hit.aliases && [...hit.aliases].includes(id))) {
      hit.aliases.add(id);
    }
  }
}
attachAlias(keywordsJson.map((e) => e.label), "keyword", "keywords");
attachAlias(rulesJson.map((e) => e.label), "rule", "rules");

// ── Render blocks to markdown ────────────────────────────────────────────────
const out = [];
let listOpen = false;
function closeList() {
  if (listOpen) {
    out.push("");
    listOpen = false;
  }
}
for (const b of blocks) {
  if (b.type === "break") {
    closeList();
    continue;
  }
  if (b.type === "li") {
    out.push("- " + b.text.replace(/\s+/g, " ").trim());
    listOpen = true;
    continue;
  }
  closeList();
  if (b.type === "h2" || b.type === "h3" || b.type === "h4") {
    const lvl = b.type === "h2" ? 2 : b.type === "h3" ? 3 : 4;
    for (const a of b.aliases || []) out.push(`<span id="${a}"></span>`);
    const idAttr = b.primaryId ? ` {#${b.primaryId}}` : "";
    out.push(`${"#".repeat(lvl)} ${b.text.replace(/\s+/g, " ").trim()}${idAttr}`);
    out.push("");
  } else if (b.type === "label") {
    out.push(`**${b.text.replace(/\s+/g, " ").trim()}**`);
    out.push("");
  } else if (b.type === "p") {
    out.push(b.text.replace(/\s+/g, " ").trim());
    out.push("");
  }
}

let body = out.join("\n");
body = body.replace(/([a-z])-\s+([a-z])/g, "$1$2"); // rejoin soft hyphenation
body = renderIcons(body); // replace {{icon:N}} tokens with asset <img> / inline SVG
body = body.replace(/\n{3,}/g, "\n\n").trim() + "\n";

// ── On-page Table of Contents ────────────────────────────────────────────────
// The source PDF's only hyperlinks are its Table of Contents (every entry links
// to its section/keyword). Those TOC pages are dropped, so reconstruct the
// contents on-page: each section is a collapsible group linking to every heading
// under it. This restores the PDF's link navigation and is fully clickable.
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function buildContents() {
  const groups = [];
  let g = null;
  for (const h of headings) {
    if (h.type === "h2") { g = { h, children: [] }; groups.push(g); }
    else if (g) g.children.push(h);
  }
  const parts = ['<nav class="rules-toc">', "<h2 id=\"contents\">Contents</h2>"];
  for (const { h, children } of groups) {
    const link = `<a href="#${h.primaryId}">${esc(h.text)}</a>`;
    if (!children.length) { parts.push(`<p class="rules-toc-section">${link}</p>`); continue; }
    parts.push(`<details class="rules-toc-group"><summary>${link} <span class="rules-toc-count">(${children.length})</span></summary>`);
    parts.push('<ul>' + children.map((c) => `<li><a href="#${c.primaryId}">${esc(c.text)}</a></li>`).join("") + "</ul>");
    parts.push("</details>");
  }
  parts.push("</nav>");
  return parts.join("\n");
}
const contents = buildContents();

const PDF_URL = "https://images.legendary-arena.com/docs/legendary-universal-rules-v23.pdf";
const frontMatter = [
  "---",
  'title: "Marvel Legendary Universal Rulebook (v23)"',
  "date: 2026-07-22T00:00:00-05:00",
  'description: "The complete Marvel Legendary Deck-Building Game universal rules (version 23, updated through Weapon X) — setup, turn structure, every keyword ability, card and location clarifications, additional rules, expansion card lists, and errata. A single searchable reference page."',
  "ShowToc: false",
  "draft: false",
  "---",
  "",
].join("\n");
const lead = `<style>
/* why: outrank PaperMod's \`.md-content img { margin: 1rem 0 }\` (specificity
   0,1,1) — as a bare .rules-icon class (0,1,0) it lost, so every inline icon got
   a 1rem top/bottom margin that double-spaced the paragraph. Scoping to
   .md-content img.rules-icon (0,2,1) wins and keeps icons truly inline. */
.md-content img.rules-icon,.md-content svg.rules-icon{display:inline-block;height:1em;width:auto;margin:0 .08em;vertical-align:-.12em;border-radius:0}
svg.rules-icon{fill:currentColor}
.rules-toc{margin:1.5rem 0;font-size:0.95em}
.rules-toc h2{margin:0 0 .5rem}
.rules-toc-section{margin:.15rem 0;font-weight:600}
.rules-toc-group{margin:.15rem 0}
.rules-toc-group>summary{cursor:pointer;font-weight:600;padding:.15rem 0}
.rules-toc-count{opacity:.6;font-weight:400}
.rules-toc-group ul{margin:.25rem 0 .5rem 1.25rem;columns:2;column-gap:2rem;padding-left:1rem}
.rules-toc-group li{break-inside:avoid}
@media (max-width:640px){.rules-toc-group ul{columns:1}}
</style>

This page reproduces the **Marvel Legendary Universal Rulebook, version 23**
(updated through Weapon X), compiled by **Randall Worley** — the rules
reference behind Legendary Arena's [card registry](https://cards.legendary-arena.com/)
and [play client](https://play.legendary-arena.com/). The full rulebook is
laid out below as one searchable page: general setup, the turn sequence,
every keyword ability, card and location clarifications, additional rules,
expansion card lists, and errata.

> **Icons and navigation.** The game's symbols — Attack <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon">, Recruit <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon">, hero classes, and team badges — are
> rendered inline from the rulebook's own artwork. The linked table of contents
> below jumps to any section, keyword, or rule, and every heading has a stable
> anchor. For the fully illustrated original, open the [source PDF](${PDF_URL}).
>
> *Marvel* and *Legendary* are trademarks of their respective owners; this is a
> freely-distributed community rulebook, reproduced here for reference.

---
`;

fs.writeFileSync(OUT_INDEX, frontMatter + lead + "\n" + contents + "\n\n" + body, "utf8");
writeFallbackSvgs();

// ── Cross-reference coverage report ──────────────────────────────────────────
const allIds = new Set();
for (const m of body.matchAll(/\{#([^}]+)\}/g)) allIds.add(m[1]);
for (const m of body.matchAll(/id="([^"]+)"/g)) allIds.add(m[1]);
const missKw = keywordsJson.map((e) => e.label).filter((l) => !allIds.has(`keyword-${slug(l)}`));
const missRule = rulesJson.map((e) => e.label).filter((l) => !allIds.has(`rule-${slug(l)}`));
const kwIds = (body.match(/\{#keyword-/g) || []).length;
const ruleIds = (body.match(/\{#rule-/g) || []).length;
console.log(`rules-body.md: ${body.length} bytes | keyword headings ${kwIds} | rule headings ${ruleIds}`);
console.log(
  `cross-ref coverage: keywords ${keywordsJson.length - missKw.length}/${keywordsJson.length}, rules ${rulesJson.length - missRule.length}/${rulesJson.length}`,
);
if (missKw.length) console.log("  unresolved keyword anchors:", missKw.join(", "));
if (missRule.length) console.log("  unresolved rule anchors:", missRule.join(", "));
