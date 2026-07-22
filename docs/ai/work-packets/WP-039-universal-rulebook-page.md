# WP-039 — Universal Rulebook page (`/rules`) + registry-viewer cross-reference

Publish the full **Marvel Legendary Universal Rulebook v23** (compiled by
Randall Worley) as a single searchable Hugo page at
`https://www.legendary-arena.com/rules/`, and cross-reference it from the
registry-viewer glossary (`cards.legendary-arena.com`).

**Why:** (1) a stable, LLM-readable URL to point Claude at for rules research
during play/design sessions; (2) a clean HTML cross-reference target for the
registry-viewer glossary, which today deep-links only to the source PDF by page
number. This is a P2 "registry bridge" item.

This file is the self-contained record. There is no separate ROADMAP entry.

## Status

- **Site page + tooling + menu:** ✅ Done (this PR, branch `wp-rules-page`).
- **Registry-viewer cross-reference:** ⏸️ Pending — lives in the **engine
  monorepo** (`apps/registry-viewer`), shipped as its own PR. See
  §"Engine-repo follow-up".

## What shipped in this repo

| Path | What |
|---|---|
| `content/rules/index.md` | The generated page (front matter + attributed lead + full rulebook). **Generated — do not hand-edit.** |
| `scripts/rules/extract.mjs` | PDF → per-page line JSON via `pdfjs-dist`, recursive XY-cut for column reading order, inline icon extraction. |
| `scripts/rules/build.mjs` | line JSON → the Hugo page (headings, anchors, lists, front matter, icons, on-page Contents). |
| `scripts/rules/icon-map.json` | Icon cluster id → asset SVG (identified clusters). Editable. |
| `scripts/rules/README.md` | Sources (cross-repo), prerequisites, regeneration steps, anchor contract, known limits. |
| `static/img/icons/**` | Vendored icon SVGs (card-info, hero-classes, mapped teams) + generated `rules-extracted/` fallbacks. |
| `hugo.toml` | `[[menu.footer]]` entry "Rules" → `/rules/` (weight 26). |

## Source & method

- **Source:** `docs/Marvel Legendary Universal Rules v23 (hyperlinks).pdf` in the
  **engine monorepo** (~43 MB; not vendored). Hosted copy the page links to:
  `https://images.legendary-arena.com/docs/legendary-universal-rules-v23.pdf`.
- The page is the **verbatim rulebook prose**, not the curated
  `keywords-full.json` glossary text (which is paraphrased — see
  §"Observation" below). `keywords-full.json` is consulted only as a
  keyword-name dictionary for heading detection and to size the anchor coverage
  report.
- `pdftotext` interleaves the rulebook's 2-/3-column reference pages; the
  `pdfjs`-based recursive XY-cut in `extract.mjs` reconstructs correct reading
  order. Method and limitations: `scripts/rules/README.md`.

## Cross-reference anchor contract

The registry-viewer glossary links each entry to this page:

- **Keyword** → `/rules/#keyword-<slug(label)>`
- **Rule** → `/rules/#rule-<slug(label)>`

`slug(label)` = lowercase, drop `’'“”"`, non-alphanumeric runs → `-`, trim `-`.
`build.mjs` emits those ids (plus alias ids for variant keywords and
differently-worded rulebook headings). Coverage at time of writing:
**keywords 120/123, rules 18/20.** The handful with no matching rulebook
heading fall back to page top — acceptable, because the viewer keeps its precise
`#page=N` PDF deep-link alongside the new HTML link (Jeff's choice:
"add HTML links alongside PDF", not replace).

## Engine-repo follow-up (separate PR)

In `apps/registry-viewer` (engine monorepo), add an HTML "View on the rules
page" link **alongside** the existing per-entry "Rulebook p. N" PDF deep-link in
the glossary. Suggested surface: `useGlossary.ts` / `GlossaryPanel.vue`, gated on
a new optional `registry-config.json` field (e.g. `rulesPageUrl`) so the link is
absent-config-safe, mirroring how `rulebookPdfUrl` is handled today. Build the
target as `` `${rulesPageUrl}#keyword-${slug(entry.label)}` `` /
`` `#rule-${slug(entry.label)}` `` using the same `slug` above.

## Icons and navigation (added after first review)

- **Icons.** The game symbols are drawn as small filled **vector paths** (not
  images or glyphs). `extract.mjs` groups the fills into icon glyphs, clusters
  identical shapes doc-wide, and injects each inline as a `{{icon:N}}` token in
  reading order. `build.mjs` renders them from the **legendary-setup icon SVGs**
  (`icon-map.json` maps identified clusters → assets, with `alt` text);
  unidentified clusters fall back to an accurate monochrome reconstruction.
  ~928 icons render on the page; no `◈` placeholders remain.
- **Hyperlinks.** The source PDF's only hyperlinks are its Table of Contents
  (verified: 382 link annotations, all on the TOC pages, zero in-body cross-
  references). Those pages are dropped, so the contents are **rebuilt on-page** —
  one collapsible group per section, linking every heading — and every heading
  carries a stable anchor.

## Known limitations

- Less-common icon clusters (rare teams, etc.) fall back to a monochrome
  reconstruction (correct shape, no semantic `alt`). Extend `icon-map.json` to
  name more. Cost/VP appear as words, not icons, in this rulebook.
- A few numeric tables (per-player setup counts, Challenge Modes) render as
  run-on text rather than markdown tables (auto-reconstruction risks column
  misalignment = wrong data on a rules reference).
- Source typos are preserved verbatim.

## Observation (out of scope; flag only)

`data/metadata/keywords-full.json` (engine repo) is **paraphrased and appears to
diverge from v23** in places — e.g. its *Abomination* description ("+1 Attack for
each Abomination card in the KO pile") does not match the v23 rulebook
("+Attack equal to the printed cost of the Hero/Ally under it"). The
registry-viewer glossary renders this JSON, so it may be showing stale/inaccurate
definitions. Worth a separate audit; not touched here.
