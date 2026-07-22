// build.mjs — assemble the Marvel Legendary Universal Rulebook v23 into a single
// Hugo markdown page from the column-aware extraction (pages.json).
//
// Reading order is reconstructed by extract.mjs. This step adds document
// structure (section H2s, subsection/entry H3s, bullet lists) and stable anchor
// ids that the registry-viewer glossary deep-links to. Anchor ids are driven
// FROM the glossary labels (keyword-<slug(label)> / rule-<slug(label)>) so every
// cross-reference the viewer generates resolves to a real element on the page.
import fs from "node:fs";

// Usage: node build.mjs <pages.json> <engine-repo-root> <out-index.md>
const PAGES_JSON = process.argv[2];
const ENGINE = process.argv[3];
const OUT_INDEX = process.argv[4] || "content/rules/index.md";
const pages = JSON.parse(fs.readFileSync(PAGES_JSON, "utf8"));
const keywordsJson = JSON.parse(fs.readFileSync(`${ENGINE}/data/metadata/keywords-full.json`, "utf8"));
const rulesJson = JSON.parse(fs.readFileSync(`${ENGINE}/data/metadata/rules-full.json`, "utf8"));

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

  // Body: continuation of previous list item, or paragraph text
  const prev = blocks[blocks.length - 1];
  if (prev && prev.type === "li" && !l.para) {
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
for (const h of headings) {
  if (h.type === "h2") h.primaryId = h.id;
  else if (h.keyword) h.primaryId = `keyword-${slug(h.text)}`;
  else if (h.section && h.section.kind === "rules") h.primaryId = `rule-${slug(h.text)}`;
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
body = body.replace(/\n{3,}/g, "\n\n").trim() + "\n";

const PDF_URL = "https://images.legendary-arena.com/docs/legendary-universal-rules-v23.pdf";
const frontMatter = [
  "---",
  'title: "Marvel Legendary Universal Rulebook (v23)"',
  "date: 2026-07-22T00:00:00-05:00",
  'description: "The complete Marvel Legendary Deck-Building Game universal rules (version 23, updated through Weapon X) — setup, turn structure, every keyword ability, card and location clarifications, additional rules, expansion card lists, and errata. A single searchable reference page."',
  "ShowToc: true",
  "TocOpen: false",
  "draft: false",
  "---",
  "",
].join("\n");
const lead = `This page reproduces the **Marvel Legendary Universal Rulebook, version 23**
(updated through Weapon X), compiled by **Randall Worley** — the rules
reference behind Legendary Arena's [card registry](https://cards.legendary-arena.com/)
and [play client](https://play.legendary-arena.com/). The full rulebook is
laid out below as one searchable page: general setup, the turn sequence,
every keyword ability, card and location clarifications, additional rules,
expansion card lists, and errata.

> **About the ◈ symbol.** The printed rulebook renders Attack, Recruit,
> Victory Points, and card cost as picture icons (and lays a few tables out
> with icon dividers). Those are images in the source file and cannot be shown
> as text, so each appears here as **◈**. For the exact symbol in any passage,
> open the [original illustrated PDF](${PDF_URL}).
>
> *Marvel* and *Legendary* are trademarks of their respective owners; this is a
> freely-distributed community rulebook, reproduced here for reference.

---
`;

fs.writeFileSync(OUT_INDEX, frontMatter + lead + "\n" + body, "utf8");

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
