# WP-041 — Art gallery section (`/art/`) + per-artist portfolios

Build a dedicated **artist gallery** at `https://www.legendary-arena.com/art/`.
The section landing is a **directory of artists**; each artist has their own
page showing a thumbnail grid of the comic and card art they have drawn. Linked
from the **footer** menu (not the header). Scale target: **~25 artists × ~20
images each (~500 images)**.

This is a **section-build WP**: new Hugo layouts, an image-processing pipeline,
one `hugo.toml` footer entry, and **1–2 seed artist bundles** to prove the
layout. Populating all 25 artists with real art + rights is **follow-on content
work** (§Follow-on), not a blocker for this WP.

This file is the self-contained record. There is no separate ROADMAP entry yet;
add one at exit (§Exit criteria).

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme as a Git submodule. Custom section
templates live at `C:\www\legendary-arena-com\layouts\<section>\list.html` and
`...\single.html` (see `layouts\shop\`, `layouts\tournaments\`). Deployed to
Cloudflare Pages; build is `hugo --minify && npx pagefind --site public`
(`package.json` `build` script).

## Required reading (in order)

1. `C:\www\legendary-arena-com\docs\ai\work-packets\WP-010-site-navigation.md`
   — footer menu (`site.Menus.footer`) contract; how `[[menu.footer]]` entries
   are iterated by `layouts\_partials\footer.html`.
2. `C:\www\legendary-arena-com\docs\ai\work-packets\WP-039-universal-rulebook-page.md`
   — precedent for adding a new content section + a `[[menu.footer]]` entry
   (Rules, weight 26).
3. `C:\www\legendary-arena-com\hugo.toml` lines 83–235 — `[[menu.main]]` /
   `[[menu.footer]]` blocks and the **trailing-slash invariant** documented at
   lines 95–104 (active-state styling breaks silently without it).
4. `C:\www\legendary-arena-com\layouts\_partials\footer.html` — the footer nav
   loop this WP feeds a new entry into.
5. `C:\www\legendary-arena-com\layouts\shop\single.html` and
   `...\tournaments\single.html` — existing custom single-page templates to
   match markup/idiom.

## Current state

- Content sections today: `about`, `blog`, `brand`, `diorama`, `emails`,
  `leaderboard`, `rules`, `shop`, `tournaments`. **No `art` section.**
- Header menu is **deliberately trimmed** (`hugo.toml` lines 107, 117 document
  removing items "to reduce header choices"). Decision for this WP: `/art/` goes
  in the **footer**, alongside Brand / Rules / Tags — **not** the header.
- **No image-processing pipeline exists.** `grep` for `.Resize`/`.Fill`/`.Fit`
  across `layouts\` + `assets\` returns only `header.html` (logo). The gallery
  thumbnail pipeline is net-new.
- `resources/` is **gitignored** — Hugo's processed-image cache is **not**
  committed; it regenerates at each Cloudflare Pages build (see §Risk register).

## Design decisions (read before building)

**1. Dedicated section, not the blog.** The blog is text-first and
reverse-chronological (strategy guides, patch notes). Art is visual and
browsable. Mixing them fights both layouts. `/art/` is its own section.

**2. Page bundles per artist — NOT a per-image-page taxonomy.** An earlier
sketch proposed an `artist` taxonomy over image-pages. That suits "each piece is
its own page." At **25 artists × ~20 images**, one page per image = ~500 content
files to hand-maintain — the wrong model. Instead, **the artist is the page**:

```
content/art/
  _index.md                     # section landing → artist directory
  jane-doe/                     # leaf bundle = one artist
    index.md                    # artist metadata + gallery order/captions
    01-red-skull.jpg            # the ~20 works, as PAGE RESOURCES
    02-magneto.jpg
    ...
  john-smith/
    index.md
    ...
```

25 artist bundles, ~20 co-located images each. No taxonomy, no 500 loose files.

**3. Gallery images are page RESOURCES, not `static/`.** Hugo can only run image
processing (`.Resize`/`.Fill`) on **resources** (leaf-bundle files or
`assets/`), never on `static/` files. A 500-image gallery needs generated
thumbnails, so images live **inside each artist bundle**. This intentionally
diverges from the blog convention (`static/images/blog/`, commit ee2c618) —
blog images are hand-placed and unprocessed; gallery images must be processed.

**4. Footer label + URL.** Footer entry **"Art"** → `/art/` (trailing slash
required, per §invariant). "Art" mirrors the content-type labels (Blog, Shop);
if you prefer "Artists," change the `name` only — `url` stays `/art/`.

## Content model — artist front matter schema

`content/art/<slug>/index.md`:

```yaml
---
title: "Jane Doe"                      # artist display name
role: "Comic & Card Artist"            # short medium/role line
summary: "One-line blurb for the directory card + SEO description."
hero: "01-red-skull.jpg"               # resource used as the directory thumbnail
                                       # (fallback: first gallery image)
weight: 10                             # directory ordering (lower = first)
links:                                 # optional external artist links
  - { label: "Portfolio", url: "https://…" }
  - { label: "Instagram", url: "https://…" }
gallery:                               # order + captions; matched by filename
  - { src: "01-red-skull.jpg", title: "Red Skull", caption: "Splash panel, 2026" }
  - { src: "02-magneto.jpg",   title: "Magneto",   caption: "Card art" }
rights: "Displayed with the artist's permission."   # see §Rights governance
---

Optional long-form bio / commentary (markdown).
```

- `gallery` list is the **source of truth for order and captions**. Any bundle
  image not listed in `gallery` is not rendered (lets artists stage WIP files in
  the bundle without publishing them).
- `title`/`caption` drive `alt` text and the lightbox label.

## Task

### Step 1 — Section landing (artist directory)

Create `content/art/_index.md`:

```yaml
---
title: "Art"
description: "Comic and card art from the artists behind Legendary Arena."
---
```

Create `layouts/art/list.html`:

- Iterate the section's artist bundles: `range .Pages` (optionally
  `.Pages.ByWeight`).
- Per artist, render a **card**: hero thumbnail (front-matter `hero`, else first
  `gallery` image, processed to a uniform tile, e.g. `.Fill "600x600 Center"`),
  artist `title`, `role`, and a piece count (`len` of `gallery`). Whole card
  links to the artist page (`.Permalink`).
- Responsive CSS grid (`repeat(auto-fill, minmax(…))`), matching site tokens.
- Every `<img>`: `loading="lazy"`, `decoding="async"`, explicit `width`/`height`
  from the processed resource (`.Width`/`.Height`) to prevent CLS.

### Step 2 — Artist page (portfolio grid)

Create `layouts/art/single.html`:

- **Header:** `title`, `role`, rendered bio (`.Content`), and `links` (external
  → `target="_blank" rel="noopener noreferrer"` + the external-link SVG used in
  `header.html`/`footer.html`, for consistency).
- **Gallery:** iterate front-matter `gallery`; for each entry resolve the
  resource via `.Resources.GetMatch .src`, render a **thumbnail** (e.g.
  `.Resize "800x"` or `.Fill "800x800 Center"`) that opens the **larger**
  render (e.g. `.Resize "1600x"`) in a lightbox.
- `alt` = `title` (fall back to artist name + index). Lazy-load + explicit
  dimensions as in Step 1.
- **Lightbox:** prefer a tiny dependency-free CSS/JS approach (`<a href>` around
  each thumb + a minimal vanilla-JS overlay) over a third-party library. If a
  library is genuinely needed, that is a scope-fork — stop and flag (do not add
  an npm dep silently).

### Step 3 — Image pipeline defaults

- Pick thumbnail vs. lightbox render sizes once, as template constants (Step 1/2
  suggestions above). Uniform grid tiles → `.Fill` with a gravity; preserve
  aspect for lightbox → `.Resize` by width.
- Consider `.webp`/quality: e.g. `.Resize "800x webp q80"`. Keep originals as
  the lightbox source or a high-quality resize.
- Do **not** commit `resources/` (already gitignored). See §Risk register for
  the CI build-time implication.

### Step 4 — Seed content (1–2 artists, placeholder art)

- Create **one or two** example artist bundles under `content/art/` with 3–6
  **placeholder** images each (clearly-labeled non-final art) so the directory
  and portfolio layouts are verifiable end-to-end.
- Seed bundles use the real schema so they double as the template future content
  is copied from. Real 25-artist population is §Follow-on.

### Step 5 — Footer menu entry

In `hugo.toml`, add a `[[menu.footer]]` block:

```toml
[[menu.footer]]
  identifier = "art"
  name = "Art"
  url = "/art/"        # trailing slash REQUIRED (invariant, hugo.toml:95–104)
  weight = 27          # sits just after Rules (26); adjust to taste
```

- Do **not** add a `[[menu.main]]` (header) entry — footer only (§Design #4).

### Step 6 — Verify

- [ ] `npx hugo` (or `npm run build`) succeeds; no template errors.
- [ ] `/art/` renders the artist directory; each card links to its artist page.
- [ ] Artist page renders the portfolio grid; thumbnails open the lightbox.
- [ ] Thumbnails are **processed** renders (check `resources/_gen/images/` is
      populated post-build), not full-size originals.
- [ ] Every gallery `<img>` has `loading="lazy"`, non-empty `alt`, and explicit
      `width`/`height`.
- [ ] Footer shows **Art** → `/art/`; active-state styling lands on `/art/`
      pages (trailing-slash invariant holds).
- [ ] Pagefind indexes artist pages (they appear in site search).
- [ ] `git diff --name-only` matches §Scope lock.

## Rights & attribution governance (content, not code)

These are **third-party artworks**. Every artist bundle must carry explicit
permission-to-display before it goes live (the `rights` front-matter field, or a
tracked release per artist). This is a business-risk flag, not a legal opinion —
gate real-content population (§Follow-on) on rights being on file. The seed
bundles in Step 4 use **placeholder** art specifically to avoid this dependency
blocking the layout build.

## Scope lock

This WP touches **only**:

| Path | Change |
|---|---|
| `content/art/_index.md` | **NEW** — section landing front matter |
| `content/art/<seed-artist>/` (×1–2) | **NEW** — seed bundles (index.md + placeholder images) |
| `layouts/art/list.html` | **NEW** — artist directory template |
| `layouts/art/single.html` | **NEW** — artist portfolio template |
| `hugo.toml` | **MODIFY** — one `[[menu.footer]]` entry (Art) |
| `assets/**` (CSS) | **MODIFY only if** gallery grid needs new styles; prefer existing tokens |

**Do NOT touch:** `[[menu.main]]` (header stays trimmed), `themes/PaperMod/**`
(submodule locked), `functions/**` (WP-015), `content/blog/**`,
`static/images/blog/**`, `package.json` (**no new npm deps** — lightbox is
vanilla; a library is a scope-fork), other sections' layouts.

## Definition of Done

1. `/art/` section exists and renders an artist **directory** of bundle pages.
2. Each artist page renders a **thumbnail grid** of that artist's works with a
   lightbox to a larger render.
3. Gallery images are **page resources**, served through Hugo image processing
   (thumbnails generated, not full-size originals in the grid).
4. Performance hygiene on every gallery image: lazy-load, explicit dimensions,
   non-empty `alt`.
5. **Art** appears in the **footer** menu → `/art/` (trailing slash); **not** in
   the header.
6. 1–2 **seed** artist bundles (placeholder art) prove the layout end-to-end.
7. Rights/attribution field present in the schema; real-content population
   deferred to §Follow-on with rights-on-file as its gate.
8. Build (`hugo --minify && npx pagefind --site public`) succeeds; artist pages
   are Pagefind-indexed.
9. No header change, no new npm dependency, no touched files outside §Scope lock.

## Exit criteria

- All DoD items verified.
- Commit(s) with a `WP-041:` prefix; PR opened.
- ROADMAP updated: add WP-041 (phase P2/P3 "brand showcase / reach") → status
  reflecting seed-shipped, content-population pending.
- Decisions-log entry in `docs/01-VISION.md`: "WP-041 — Art gallery section.
  Added `/art/` as a dedicated section (page-bundle-per-artist, images as
  processed resources), linked from the footer. Header intentionally unchanged.
  Seed bundles shipped; 25-artist population is follow-on content gated on
  display rights."

## Risk register

1. **CI build time for ~500 images.** `resources/` is gitignored, so Hugo
   reprocesses all gallery images on each Cloudflare Pages build. Hugo caches
   within a single build, but the cache may not persist across CI builds →
   slower deploys as the gallery fills. *Mitigation:* revisit at real scale —
   options are committing `resources/_gen/images/` (drop it from `.gitignore`)
   or enabling a persistent CI cache for `resources/`. Note only; the seed set
   is small.
2. **Layout shift / payload.** 20 thumbnails per page × 25 pages. *Mitigation:*
   lazy-load below the fold, explicit dimensions, `.webp` thumbnails, and the
   directory shows only **one** hero per artist (full grid is one level down).
3. **Rights exposure.** Displaying third-party art without permission. *See
   §Rights governance* — real content gated on rights-on-file.
4. **Header-trim regression.** Adding Art to the header would undo the WP-034
   simplification. *Mitigation:* §Scope lock forbids `[[menu.main]]` edits.

## Follow-on (not in scope)

- **Content population** — the real 25 artists × ~20 works, added bundle by
  bundle as art + display rights arrive. Pure content; no code.
- **Per-artwork structured data** — schema.org `VisualArtwork` / `Person` JSON-LD
  for richer SEO (extend `layouts/_partials/seo/`). Separate WP.
- **Filtering / tags** — if artists span media (comics vs. card art), add a
  lightweight taxonomy for cross-cutting browse. Only worth it past a certain
  volume. Separate WP.
- **Lightbox upgrade** — swap the vanilla overlay for a richer viewer
  (captions, keyboard nav, zoom) if the vanilla one proves limiting. Separate WP
  (introduces the dependency decision this WP defers).
