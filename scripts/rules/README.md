# Rules page generator (`/rules`)

Regenerates [`content/rules/index.md`](../../content/rules/index.md) — the
single-page reproduction of the **Marvel Legendary Universal Rulebook v23** —
from the source PDF. Run this whenever the rulebook is updated; do not hand-edit
`content/rules/index.md`, as edits are overwritten on the next regeneration.

## Sources (cross-repo)

Both inputs live in the **engine monorepo** (`C:\pcloud\BB\DEV\legendary-arena\`),
not in this repo:

- `docs/Marvel Legendary Universal Rules v23 (hyperlinks).pdf` — the rulebook PDF
  (~43 MB; too large to vendor here). The hosted copy the registry viewer and
  this page link to is
  `https://images.legendary-arena.com/docs/legendary-universal-rules-v23.pdf`.
- `data/metadata/keywords-full.json` — used only for the keyword-name dictionary
  (which lines in the extracted text are keyword headings) and to size the
  cross-reference coverage report. The prose itself is the verbatim rulebook,
  **not** the curated glossary text.

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
   The game's Attack/Recruit/VP/cost icons are **images**, not glyphs, so they
   are unrecoverable from the text layer — each is emitted as a `◈` placeholder.
2. **`build.mjs`** — assembles the page: section `H2`s (hoisted so a section
   whose title mis-orders within its page still renders first), keyword/rule/
   clarification entry headings, bullet lists, and card-list structure. Adds the
   front matter and attributed lead.

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

- **Icons** render as `◈` (see above). The lead paragraph explains this and
  links the illustrated PDF.
- A few **numeric tables** (per-player setup counts, Challenge Modes) render as
  `◈`-delimited run-on text rather than markdown tables. Reconstructing them
  automatically risks column misalignment — i.e. *wrong* data on a rules
  reference — so they are left as faithful-but-unformatted text.
- **Source typos** in the rulebook (e.g. "Alechmax", "Fatastic Four") are
  preserved verbatim.
