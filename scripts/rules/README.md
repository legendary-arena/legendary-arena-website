# Rules page generator (`/rules`)

Regenerates [`content/rules/index.md`](../../content/rules/index.md) — the
single-page reproduction of the **Marvel Legendary Universal Rulebook v23** —
from the source PDF. Run this whenever the rulebook is updated; do not hand-edit
`content/rules/index.md`, as edits are overwritten on the next regeneration.

## Sources (cross-repo)

Inputs live in two sibling repos, not in this one:

- **Engine monorepo** (`C:\pcloud\BB\DEV\legendary-arena\`):
  - `docs/Marvel Legendary Universal Rules v23 (hyperlinks).pdf` — the rulebook PDF
    (~43 MB; too large to vendor here). Hosted copy the page links to:
    `https://images.legendary-arena.com/docs/legendary-universal-rules-v23.pdf`.
  - `data/metadata/keywords-full.json` — used only as the keyword-name dictionary
    (which extracted lines are keyword headings) and to size the cross-reference
    coverage report. The prose is the verbatim rulebook, **not** the glossary text.
- **legendary-setup repo** (`C:\pcloud\BB\DEV\barefootbetters-legendary-setup\`):
  the icon SVG assets (`src/assets/svg/icons/card-info`, `public/img/icons/hero-classes`,
  `public/img/icons/hero-teams`). The ones referenced by `icon-map.json` are
  vendored into this repo under `static/img/icons/`. Re-copy if the map grows.

## Prerequisites

`extract.mjs` needs `pdfjs-dist` (not a site dependency — install ad hoc):

```sh
npm install pdfjs-dist@4
```

## Regenerate

From this repo's root, with `$ENGINE` pointing at the engine monorepo:

```sh
ENGINE="C:/pcloud/BB/DEV/legendary-arena"
node scripts/rules/extract.mjs "$ENGINE/docs/Marvel Legendary Universal Rules v23 (hyperlinks).pdf" /tmp/pages.json
node scripts/rules/build.mjs /tmp/pages.json "$ENGINE" content/rules/index.md
hugo --quiet   # verify it builds
```

`extract.mjs` also writes `/tmp/pages.txt` (a plain-text dump) for eyeballing.
`build.mjs` prints a cross-reference coverage report (how many glossary
keyword/rule anchors resolve to a heading on the page).

## How it works

1. **`extract.mjs`** — reads the PDF with `pdfjs-dist` and reconstructs reading
   order with a recursive XY-cut (peel full-width bands, then split columns at a
   low-density gutter valley). This de-interleaves the rulebook's 2- and
   3-column reference pages, which `pdftotext` cannot. Emits one JSON object per
   page: lines tagged with height (for heading detection) and paragraph breaks.
   - **Icons.** The game's symbols (Attack/Recruit/class/team) are drawn as small
     filled **vector paths**, not glyphs or images. The extractor walks the
     operator list, groups fills into icon glyphs, computes a rasterized shape
     signature, and clusters identical shapes doc-wide (Hamming merge). Each icon
     is injected inline into the text flow as a `{{icon:N}}` token (N = stable
     cluster id) so it lands in the right reading position. `pages-icons.json`
     carries each cluster's fallback SVG path.
2. **`build.mjs`** — assembles the page: section `H2`s (hoisted so a section
   whose title mis-orders within its page still renders first), keyword/rule/
   clarification entry headings, bullet lists, card-list structure, front matter,
   attributed lead, and a rebuilt on-page **Table of Contents** (the PDF's only
   hyperlinks are its TOC; those pages are dropped, so the contents — one
   collapsible group per section, linking every heading — are regenerated here).
   - **Icon rendering.** `{{icon:N}}` → the mapped asset `<img>` (per
     `icon-map.json`, with derived `alt`), the literal `*` for the asterisk
     symbol, or — for unidentified clusters — a generated monochrome SVG written
     to `static/img/icons/rules-extracted/icon-N.svg`. Cluster ids are stable as
     long as the source PDF is unchanged; re-verify `icon-map.json` after
     re-extraction (identify by rendering the clusters and matching the assets).

## Cross-reference anchor contract

The registry-viewer glossary (`cards.legendary-arena.com`) deep-links each entry
to this page. The contract:

- **Keyword** entries link to `/rules/#keyword-<slug(label)>`
- **Rule** entries link to `/rules/#rule-<slug(label)>`

where `slug(label)` = lowercase, drop `’'“”"`, non-alphanumeric runs → `-`,
trim `-`. `build.mjs` gives each keyword/rule heading that primary id and adds
alias ids (including variant keywords like "Double Abomination" → their base
entry) so those links resolve. A handful of entries with no corresponding
rulebook heading (e.g. "Burn Shards", "Asterisk Symbol (\*)") fall back to the
top of the page — acceptable, because the viewer keeps its precise
`#page=N` PDF deep-link alongside the HTML link.

## Known limitations

- **Icon identification.** The high-frequency icons (Attack, Recruit, Focus,
  Strength, Tech, the asterisk symbol, and major team badges) are mapped to
  named assets with `alt` text. Less-common clusters fall back to an accurate
  monochrome reconstruction (correct shape, no semantic name). Cost/VP are
  written as words in this rulebook and rarely appear as icons. To improve
  coverage, add cluster ids to `icon-map.json`.
- A few **numeric tables** (per-player setup counts, Challenge Modes) render as
  run-on text rather than markdown tables. Reconstructing them automatically
  risks column misalignment — i.e. *wrong* data on a rules reference — so they
  are left as faithful-but-unformatted text.
- **Source typos** in the rulebook (e.g. "Alechmax", "Fatastic Four") are
  preserved verbatim.
