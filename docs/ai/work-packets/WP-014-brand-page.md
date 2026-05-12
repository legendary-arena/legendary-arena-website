# WP-014 — Public `/brand/` page (brand system surface + art-direction brief)

Ship a public-facing `/brand/` page that exposes the Legendary Arena
brand system to external creators and partners (mod authors, content
creators, press, integration partners). The page is a presentation
layer over the canonical artifacts already living under
`docs/brand/*.md` and `static/brand-tokens.css` — it does NOT
re-author them and does NOT change any token value.

This WP also commits the **mood-board / art-direction brief** as a
new brand doc (`docs/brand/mood-board-spec.md`) and renders it as
Section 8 of the page. The brief is the spec an artist receives when
producing the final one-page poster (PDF/SVG) — the poster artwork
itself is out of scope for this WP.

This file is the **session-ready execution pack**. The design source
of truth is [`docs/03-ROADMAP.md`](../../03-ROADMAP.md). If this file
and the roadmap conflict, the roadmap wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme as a Git submodule. Brand
tokens consumed cross-origin by `play.*` and `cards.*`.

## Required reading (in order)

1. `docs/01-VISION.md` — vision, Global invariants, Decisions log.
   Note the **deterministic-deploy** invariant.
2. `docs/03-ROADMAP.md` — WP-002 (brand-token surface lock), WP-007b
   (cards/brand integration), WP-008 (SEO baseline; re-runs over
   `/brand/` post-hoc), WP-010 (nav menu pattern), WP-004 (content
   scaffolding pattern).
3. `docs/04-CONTENT-CONVENTIONS.md` — `content/<section>/_index.md`
   convention; About lives at `content/about/_index.md` and is the
   structural precedent for `/brand/`.
4. `docs/brand/strategy.md` — full brand strategy. §5 (Layout
   patterns), §10 (Brand failure modes), and the class-color rule
   (gameplay-only, NOT brand identity) are load-bearing for the
   page's editorial decisions and for the mood-board spec.
5. `docs/brand/palette.md` — canonical palette spec. The Color
   System section of `/brand/` is a presentation layer over this
   file. **Do not duplicate; reference and summarise.**
6. `docs/brand/typography.md` — canonical typography spec. Same
   relationship as palette.md.
7. `docs/brand/spacing.md` — canonical spacing spec (referenced from
   the Token Contract section).
8. `docs/brand/CHANGELOG.md` — brand-token change log. This WP must
   NOT add an entry (no token values change).
9. `static/brand-tokens.css` — the canonical token file. The Token
   Contract section names this file as authoritative.
10. `layouts/_partials/header.html` lines 104-128 — menu iteration
    (locked under WP-010); a third `[[menu.main]]` entry adds a
    third `<li>` without partial edits.
11. `layouts/_partials/footer.html` — footer override (introduced by
    WP-010); same iteration pattern for `[[menu.footer]]`.
12. `content/about/_index.md` — structural template for the new
    `content/brand/_index.md`.
13. `assets/css/extended/custom.css` — canonical brand-CSS file
    (WP-002 / WP-003).
14. Appendix A of this WP — the full mood-board spec content that
    becomes `docs/brand/mood-board-spec.md` and Section 8 of the
    rendered page.

Don't read prior session transcripts; committed artifacts are truth.

## Current state

Locked under WP-001 → WP-010, WP-008:

- Brand token surface (`static/brand-tokens.css`) canonical and
  cross-origin consumed by `play.*` and `cards.*` (WP-002 / WP-007b)
- Canonical brand docs in `docs/brand/{strategy,palette,typography,spacing}.md`
  — comprehensive, locked
- `docs/brand/CHANGELOG.md` is the source of truth for token changes
- Header + footer menu iteration works (WP-010); both consume
  `site.Menus.main` / `site.Menus.footer`
- About page (`/about/`) ships and is reachable from header + footer
- SEO baseline (WP-008) shipped; `/brand/` inherits its head-metadata
  conventions automatically

What's pending — **your job**:

- ❌ `content/brand/_index.md` — the `/brand/` page content
  (eight sections in prescribed order)
- ❌ `docs/brand/mood-board-spec.md` — the art-direction brief
  (verbatim from Appendix A, formatted as a standalone brand doc)
- ❌ `[[menu.main]]` entry for Brand in `hugo.toml` (weight 30,
  after Blog at weight 20)
- ❌ `[[menu.footer]]` entry for Brand in `hugo.toml` (weight 25,
  between Blog at 20 and Play at 30, so the footer reads:
  About / Blog / Brand / Play / Cards)
- ❌ Brand-page shortcodes (`layouts/_shortcodes/brand-swatch.html`,
  `layouts/_shortcodes/brand-font-sample.html`)
- ❌ Brand-page styling (CSS additions in `custom.css`)
- ❌ Lighthouse re-verification (≥ 90 on home + post + new
  `/brand/` page)
- ❌ Reproducibility check (two consecutive `npm run build` runs
  byte-identical)

## Task

### Step 1 — Add menu entries in `hugo.toml`

Append to the existing `[[menu.main]]` and `[[menu.footer]]` blocks
introduced by WP-010:

```toml
[[menu.main]]
  identifier = "brand"
  name = "Brand"
  url = "/brand/"
  weight = 30

[[menu.footer]]
  identifier = "footer-brand"
  name = "Brand"
  url = "/brand/"
  weight = 25
```

**Constraints:**

- Do NOT renumber existing weights. Insertion at 25 (footer) /
  30 (header) preserves the WP-010 spacing convention.
- `url` is root-relative with trailing slash (per WP-010 §Step 1
  Constraints — exact-string match for active-state).
- Do NOT touch other `[params]` or commentary blocks.

### Step 2 — Create `docs/brand/mood-board-spec.md`

Lift Appendix A of this WP into a new brand doc at
`docs/brand/mood-board-spec.md`, preserving content structure,
wording, and ordering, with **only** the following permitted
transformations:

- Removal of any personal-cloud URLs (SharePoint, OneDrive,
  Copilot share links)
- Minor formatting normalization for markdown linting (whitespace,
  heading spacing, list indentation)
- No semantic edits, rewording, or content additions

All remaining content must match Appendix A exactly. The doc is
the durable artifact for handing to a graphic artist commissioned
to produce the one-page poster (PDF/SVG); the poster artwork itself
is out of scope for this WP.

The spec doc must:

1. Sit alongside the existing canonical brand docs
   (`strategy.md`, `palette.md`, `typography.md`, `spacing.md`)
   as a sibling — not in a subfolder
2. Open with a short preamble explaining its role: "This is the
   art-direction brief used when commissioning the one-page
   Legendary Arena mood board (PDF/SVG). It is rendered as
   Section 8 of `/brand/` and remains the source of truth when
   re-engaging an artist."
3. Preserve the seven content blocks of Appendix A in order
4. Include the external-template references (StudioBinder,
   Milanote, Graphic Design Junction) as a small footer block —
   these are source patterns, not load-bearing standards
5. NOT reference any SharePoint, Copilot, or other personal-cloud
   URLs that may appear in upstream drafts of this content (clean
   pass during execution)

This is an **additive** brand doc, not a modification of the
existing locked docs. Adding it does not require a
`docs/brand/CHANGELOG.md` entry (no token change); however, the
`docs/01-VISION.md` Decisions log entry (Step 7) MUST note that
the mood-board spec is now a canonical brand doc.

### Step 3 — Create `content/brand/_index.md`

Model after `content/about/_index.md` for frontmatter:

```yaml
---
title: "Brand"
url: "/brand/"
summary: "Legendary Arena brand system — colors, typography, tokens, art direction, and usage."
---
```

Body structure (**eight sections**, in order):

#### 1. Brand Overview

Short intro (2-3 sentences). Establish the page's purpose for
external creators: Legendary Arena's visual identity is defined by
a token-driven design system that ships across web, play client,
and card surfaces.

#### 2. Logo + Identity

- Render the canonical logo. Resolution rule (deterministic, no
  decision-making at execution time):
  1. If a production-ready export exists under `static/brand/logo/`,
     use that asset
  2. Otherwise, export the canonical logo from
     `docs/brand/logo-figma/` into `static/brand/logo/` as
     `logo-primary.svg` (preferred); fallback to `logo-primary.png`
     ONLY if an SVG export is genuinely unavailable
  3. The exported asset becomes the canonical marketing-site logo
     surface and MUST be referenced from `static/` thereafter
  4. Record the chosen asset path in the Decisions log (Step 7)
- Primary usage: gold on dark
- Inversion: white-only
- Failure-mode call-out: do NOT apply class colors to the logo

#### 3. Core Identity (Narrative)

Short prose. Brand tone (cinematic, mature, heroic), core color
palette callouts (gold / maroon / navy as identity colors —
explicitly NOT the class colors), contrast-driven hierarchy.
**Lift narrative from `docs/brand/strategy.md`; do not rewrite.**

#### 4. Color System

Two-layer presentation:

- **Visual summary** (top): primary brand colors as swatches with
  token names, semantic role labels (identity / action / system /
  surface). Use the `brand-swatch` shortcode (Step 4).
- **Full spec** (collapsible `<details>`): the complete palette
  including supporting neutrals, semantic states, and class colors
  (with explicit "gameplay-only" annotation on class colors).
  The collapsed-by-default view keeps the visual hierarchy clean.

Class colors render in a separate section inside the collapsible
spec, prefixed with the gameplay-only annotation, so external
creators don't mistake them for brand-identity colors.

#### 5. Typography System

Same two-layer pattern:

- **Visual summary**: display font (Bebas Neue), body font (Inter),
  mono font (JetBrains Mono). Render each at one representative
  size with the `brand-font-sample` shortcode (Step 4).
- **Full spec** (collapsible): hierarchy table (Hero → H1 → H2 →
  H3 → body → caption), with token names and sizes.

#### 6. Token Contract

Authoritative statement:

> All visual styling MUST consume the canonical tokens defined in
> [`/brand-tokens.css`](/brand-tokens.css). No raw hex values. No
> ad-hoc typography. All consumers (`www.*`, `play.*`,
> `cards.*`) consume tokens via cross-origin link.

Tie to governance: name the WP lineage (WP-002 lock, WP-006
cross-origin deploy, WP-007a/b consumer integration). One sentence
each — enough to signal "this is a real contract," not a manifesto.

#### 7. Usage Guidelines

Lift from `docs/brand/strategy.md §10` (Brand failure modes):

- Do not use class colors for branding
- Do not use red as an error state unless semantically appropriate
- Interactive elements must use `--la-color-blue-bright`
- CTAs must use `--la-color-cta`
- Logo: gold on dark / white-only inversion only

Render as a checklist (✅ DO / ❌ DON'T) for skimmability.

#### 8. Art Direction (Mood Board)

Render the content of `docs/brand/mood-board-spec.md` (the file
created in Step 2) as Section 8 of this page. Two acceptable
rendering paths:

- **Path A (preferred):** Use Hugo's `readFile` function inside
  the page markdown to inline the spec content at render time,
  so the page and the canonical doc stay in lock-step
  automatically. Example pattern:
  ```
  {{< readfile file="/docs/brand/mood-board-spec.md" markdown="true" >}}
  ```
  (Implement as a shortcode `layouts/_shortcodes/readfile.html` if
  one does not already exist — small, self-contained, no external
  dependencies.)

  **Path A determinism constraints (hard):**
  - The file path MUST be absolute-relative to the Hugo project
    root (e.g., `/docs/brand/mood-board-spec.md`)
  - `readFile` usage MUST NOT depend on environment-specific paths
  - The shortcode MUST NOT introduce non-deterministic content
    (timestamps, dynamic data, build-time env vars)

  If any non-determinism or build inconsistency is observed during
  Step 6 §8 (reproducibility check), Path A is rejected and Path B
  is used instead, with the decision recorded in the Decisions log.
- **Path B (fallback):** Manually mirror the spec content in
  `content/brand/_index.md`. If chosen, add a comment at the top
  of both files reminding contributors to update both. This path
  is acceptable only if Path A introduces a build-determinism issue
  (it should not; document in the decisions log if encountered).

Either way, the rendered Section 8 must include:

- A heading "Art Direction (Mood Board)"
- A short preamble: "This is the art-direction brief used when
  commissioning the one-page Legendary Arena mood board poster.
  Artists, partners, and integrators use it to interpret the
  brand consistently."
- The full body of `mood-board-spec.md`
- (Optional, when artwork lands post-WP) a download link / embed
  of the poster PDF/SVG. WP-014 ships without artwork; a follow-up
  WP commissions and commits the poster.

**Heading anchor IDs (stable, mandatory):**

Each section heading MUST carry a stable anchor ID for external
deep-linking. Use Hugo / markdown attribute syntax (`{#id}`) on
each section heading, with these exact IDs:

- §1 Brand Overview → `#brand-overview`
- §2 Logo + Identity → `#logo-identity`
- §3 Core Identity (Narrative) → `#core-identity`
- §4 Color System → `#color-system`
- §5 Typography System → `#typography-system`
- §6 Token Contract → `#token-contract`
- §7 Usage Guidelines → `#usage-guidelines`
- §8 Art Direction (Mood Board) → `#art-direction`

Rationale: external creators / partners need durable deep-links
into specific sections. Auto-slug derivation from heading text is
brittle under future copy edits — explicit pinning makes the
contract stable. The Step 6 §2 render check confirms each anchor
resolves correctly in the rendered HTML.

**Editorial constraints (all sections):**

- Do NOT duplicate canonical doc content verbatim (except Section 8,
  which is explicitly a mirror of `mood-board-spec.md`). Summarise +
  link to the canonical doc for the full spec.
- Do NOT introduce new brand decisions on this page. If a decision
  isn't in `docs/brand/*.md` already, it isn't on this page.
- All embedded color and font references must use shortcodes
  (Step 4), never inline `<span style="...">`.

### Step 4 — Create brand-page shortcodes

Create shortcodes under `layouts/_shortcodes/`:

**`brand-swatch.html`** — renders a color swatch from a token name.

Signature:
```
{{< brand-swatch token="--la-color-gold" role="Identity" >}}
```

Output contract (strict):

- Container `<div>` with class `brand-swatch`
- Single inline style only: `background: var(<token>)`
- MUST NOT include any other inline styles
- Child content:
  - Token name (plain text)
  - Role label (plain text)
- No additional layout styling inside the shortcode — the CSS in
  Step 5 owns all layout decisions
- No raw hex anywhere; the token name itself is rendered as plain
  text and acceptable to display literally

**`brand-font-sample.html`** — renders a typography sample.

Signature:
```
{{< brand-font-sample family="display" sample="Legendary Arena" >}}
```

Output contract (strict):

- Container `<div>` with class `brand-font-sample`
- Font family MUST resolve via token only:
  `font-family: var(--la-font-<family>)`
- Font size MUST use canonical type-scale tokens
  (no raw `px` / `rem` / `em` values)
- No fallback font stacks defined inline
- Sample content rendered as plain text inside the container

**`readfile.html`** (only if Path A from Step 3 §8 is chosen and
the shortcode does not already exist) — inlines a markdown file
from the repo at render time. Minimal implementation:
```
{{ $file := .Get "file" }}
{{ $markdown := .Get "markdown" }}
{{ if eq $markdown "true" }}
  {{ readFile $file | markdownify }}
{{ else }}
  {{ readFile $file | safeHTML }}
{{ end }}
```

**Constraints:**

- Shortcodes live in `layouts/_shortcodes/`, the canonical location
- `brand-swatch` and `brand-font-sample` are scoped to the brand
  page; do NOT consume them elsewhere in this WP
- `readfile` is a generic utility; document its existence in
  inline comments at the top of the file
- All visual values via tokens; no raw hex / no raw font names

### Step 5 — Brand-page styling (CSS)

In `assets/css/extended/custom.css`, add scoped styling for the
brand page. All selectors MUST be scoped under `.brand-page`.

**Root-class application mechanism (mandatory, deterministic):**

The `.brand-page` root class MUST be applied via one of:

1. Frontmatter + layout binding (preferred if the theme's
   `single.html` supports a body-class or wrapper-class hook
   driven by page frontmatter)
2. A dedicated layout override for `/brand/` that wraps the page
   content in a `.brand-page` container, mirroring WP-010's
   override pattern

The chosen mechanism MUST:

- NOT modify `themes/PaperMod/`
- Be isolated to `/brand/` only (must not leak to other pages)
- Be recorded in the Decisions log (Step 7)

Required selectors:

- `.brand-page .brand-swatch` — square or rounded swatch dimensions,
  drop-shadow on dark mode if contrast against background is
  insufficient
- `.brand-page details > summary` — collapsible spec section header
  styling; cursor pointer; brand-token underline on hover
- `.brand-page .brand-font-sample` — sample container with size
  hierarchy
- `.brand-page .usage-rules` — checklist (DO / DON'T) styling;
  green check / red X icons via inline SVG with `currentColor`
  fill (so they inherit token-driven link colors)
- `.brand-page section.art-direction` — Section 8 styling; visually
  distinct from sections 1-7 (denser content, longer prose); add
  internal spacing so the section reads as a "brief" not a wall

**Constraints:**

- **Token discipline applies to all of the following surfaces:**
  - CSS in `assets/css/extended/custom.css`
  - All shortcode templates under `layouts/_shortcodes/`
  - Any inline styles emitted by shortcodes (e.g., `brand-swatch`'s
    `background:` style)

  No exceptions. Any raw hex, raw font name, or raw spacing value
  is a WP failure.
- WCAG AA contrast on every text element in both light and dark
  modes (DoD check below).
- The class-color tokens (`--la-color-class-*`) MUST NOT be used
  for any styling on this page. They appear only as swatch
  *content* inside the collapsible spec in Section 4, not as
  brand-page surface colors.
- Do NOT modify `static/brand-tokens.css` values.

### Step 6 — Verify

1. **Local build + dev server (fresh state)**:
   ```powershell
   if (Test-Path public) { Remove-Item public -Recurse -Force }
   npm run build
   hugo server --bind=127.0.0.1 --port=1313
   ```
   No new deprecation warnings beyond the WP-001 / WP-005 baseline.

2. **Render check (production build at `:1314`)**:
   ```powershell
   npx http-server public -p 1314 --silent
   ```
   At `http://localhost:1314/brand/`:
   - All eight sections render in order
   - Each section heading carries its prescribed anchor ID (per
     Step 3 §Heading anchor IDs); deep-link to each
     (`/brand/#brand-overview`, `/brand/#logo-identity`,
     `/brand/#core-identity`, `/brand/#color-system`,
     `/brand/#typography-system`, `/brand/#token-contract`,
     `/brand/#usage-guidelines`, `/brand/#art-direction`)
     resolves to the correct section
   - Section 8 renders the full `mood-board-spec.md` content (Path A
     check: edit `mood-board-spec.md`, re-build, confirm change
     propagates to the rendered page)
   - Logo renders with correct usage example
   - Color swatches render with token-driven backgrounds (inspect
     in DevTools to confirm `background` resolves to `var(--la-*)`,
     not inline hex)
   - Font samples render in correct families
   - `<details>` blocks collapse / expand
   - Class-color section inside the spec details block carries the
     "gameplay-only" annotation visibly
   - Page title / metadata render correctly (head check)
   - No console errors

3. **Menu render check** (binary, mirrors WP-010 DoD):
   - Header: curl home page, grep for `href="/brand/"` — at least
     one match
   - Footer: curl any page, grep for `href="/brand/"` in the
     `<footer>` block — at least one match
   - Header order: About, Blog, Brand
   - Footer order: About, Blog, Brand, Play, Cards
   - Active state on `/brand/`: header `Brand` link's
     `<span class="active">` is styled per WP-010 §Step 3

4. **Theme toggle** — light / dark round-trips cleanly across all
   eight sections; swatches and font samples remain readable; all
   contrast WCAG AA.

5. **Token discipline check** (mechanical):
   ```powershell
   # No raw hex in new CSS or new shortcodes
   Select-String -Path 'assets/css/extended/custom.css','layouts/_shortcodes/brand-*.html' `
     -Pattern '#[0-9a-fA-F]{3,8}\b' |
     Where-Object { $_.Line -notmatch '^\s*(//|#|<!--)' }
   ```
   Expected: no matches. Any hit is a failure — replace with the
   canonical token.

6. **Console clean** — DevTools shows zero errors, zero page errors,
   zero failed network requests on `/brand/`, home, About, blog index,
   and one post page.

7. **Lighthouse** (matches WP-005 / WP-010 §Step 4.6 exactly):
   ```powershell
   npx lighthouse@12 http://localhost:1314/brand/ `
     --output=json --output-path=lighthouse-brand-wp014.json `
     --chrome-flags="--headless --no-sandbox --disable-gpu" `
     --only-categories=performance,accessibility,best-practices,seo `
     --quiet
   ```
   Also re-run home + post to confirm no regression. All four
   categories ≥ 90 on all three URLs. Raw JSON local-only; do NOT
   commit.

8. **Reproducibility (mirrors WP-005 §Step 8.7 / WP-010 §Step 4.7)**:
   ```powershell
   npm run build
   Get-ChildItem -Recurse -File public |
     Get-FileHash -Algorithm SHA256 |
     Sort-Object Path > build1.txt

   npm run build
   Get-ChildItem -Recurse -File public |
     Get-FileHash -Algorithm SHA256 |
     Sort-Object Path > build2.txt

   Compare-Object (Get-Content build1.txt) (Get-Content build2.txt)
   ```
   Empty diff. `build*.txt` local-only; do not commit.

9. **Submodule clean** — `git submodule status` shows no `+`.

10. **Canonical-doc no-touch check**:
    ```powershell
    git diff HEAD docs/brand/strategy.md docs/brand/palette.md `
      docs/brand/typography.md docs/brand/spacing.md `
      docs/brand/CHANGELOG.md static/brand-tokens.css
    ```
    Expected: empty. This WP must NOT modify any *existing*
    canonical brand artifact. Adding `docs/brand/mood-board-spec.md`
    is permitted (additive).

11. **No-duplication check** (editorial spot-check):
    - Sections 3-7 of `/brand/` must summarise canonical docs, not
      duplicate them verbatim. Section 8 is excluded — it IS a
      mirror of `mood-board-spec.md` by design.
    - Spot-check: no paragraph in `content/brand/_index.md`
      (sections 3-7) should match verbatim content from
      `docs/brand/strategy.md`, `palette.md`, `typography.md`, or
      `spacing.md`.
    - If duplication is detected, replace with a summary plus a
      link back to the canonical doc.

### Step 7 — Lock WP-014

When all DoD + exit criteria pass:

1. Update `docs/03-ROADMAP.md`:
   - Add WP-014 row to Summary table:
     `| WP-014 | Public /brand/ page + mood-board brief | ✅ Done (YYYY-MM-DD) | WP-010 | ~half-day |`
   - Add WP-014 detail section. Use WP-010's detail section as
     **structural reference only** (Status, Effort, Dependencies,
     Commits, Readiness, Preconditions, Goal, Deliverables,
     Constraints, DoD, Exit criteria, Failure conditions,
     Rollback, Notes). Do NOT copy WP-010 content — every
     sub-section must be explicitly populated for WP-014's scope.
   - Tick all DoD + exit criteria boxes
   - Record final commit hash(es)
   - Record Lighthouse scores (Performance / Accessibility /
     Best Practices / SEO) for `/brand/`, home, post
2. Add a Decisions log entry to `docs/01-VISION.md` recording:
   - Why `/brand/` is a separate surface from `/about/` (audience
     split: external creators / partners need a structured spec
     surface; `/about/` is narrative-only)
   - Token Contract section's role as the public statement of the
     cross-origin token-consumption invariant
   - Class-color gameplay-only restatement (defends against future
     contributors promoting class colors to brand-identity colors)
   - Mood-board spec (`docs/brand/mood-board-spec.md`) is now a
     canonical brand doc, sibling to strategy/palette/typography/spacing
   - Path-A vs Path-B choice for Section 8 rendering (which one was
     used and why)
3. Commit per `01.3-commit-hygiene.md` at logical milestones.

## Constraints

- **Existing brand artifacts are locked.** The following MUST NOT
  be modified under any circumstance:
  `docs/brand/{strategy,palette,typography,spacing}.md`,
  `docs/brand/CHANGELOG.md`, and `static/brand-tokens.css` token
  values. The page is presentation-only over the canonical sources.
  Adding `docs/brand/mood-board-spec.md` is the one permitted
  additive change to `docs/brand/`.
- **No raw colour / font / spacing values in CSS, shortcodes, or
  page markdown.** Token-first contract. Use `var(--la-*)` always.
- **Submodule must stay clean.** No edits under `themes/PaperMod/`.
- **`layouts/_partials/header.html` MUST NOT be modified.**
  The header partial already iterates `site.Menus.main` correctly;
  Brand menu item lands via `[[menu.main]]` addition only.
- **`layouts/_partials/footer.html` MUST NOT be modified except
  trivially** if needed — the footer iterates `site.Menus.footer`
  already; the Brand entry lands via `[[menu.footer]]` addition
  only.
- **WP-005 Pagefind mount is locked.**
- **`layouts/index.html` (WP-004 home override) is out of scope.**
- **`hugo.toml` WP-004 / WP-005 / WP-006 / WP-010 commentary blocks
  are locked.** MUST NOT be modified under any circumstance.
- **Class colors stay gameplay-only.** They render only as
  reference content inside the Color System collapsible spec, with
  explicit annotation. They MUST NOT be used as brand-page surface
  colors and MUST NOT be referenced as identity colors in
  `mood-board-spec.md` (palette block names roles, not class colors).
- **The mood-board spec must be free of personal-cloud URLs.**
  No SharePoint, OneDrive, Copilot, or other personal-cloud links.
  External template references (StudioBinder, Milanote, GDJ) are
  acceptable as source-pattern footnotes only.
- **Build is single-command and deterministic.** `npm run build`
  produces byte-identical `public/` across runs.
- **Performance budget.** Lighthouse Performance ≥ 90 on `/brand/`,
  home, and post.
- **Poster artwork (final PDF/SVG) is out of scope.** WP-014 ships
  the brief only; commissioning the artwork is a follow-up WP or
  manual operator action.

## Definition of Done

- [ ] `[[menu.main]]` Brand entry in `hugo.toml` (weight 30)
- [ ] `[[menu.footer]]` Brand entry in `hugo.toml` (weight 25)
- [ ] `docs/brand/mood-board-spec.md` exists with content from
      Appendix A (cleaned of personal-cloud URLs)
- [ ] `content/brand/_index.md` exists with all eight sections in
      the prescribed order
- [ ] `layouts/_shortcodes/brand-swatch.html` exists; consumes
      token names; renders via `var(--la-*)`
- [ ] `layouts/_shortcodes/brand-font-sample.html` exists; consumes
      family + sample; renders via `var(--la-font-*)`
- [ ] If Path A from Step 3 §8 chosen: `layouts/_shortcodes/readfile.html`
      exists and is documented inline
- [ ] CSS additions in `assets/css/extended/custom.css` scoped under
      `.brand-page`
- [ ] `/brand/` page renders at production-build URL
      (`http://localhost:1314/brand/`)
- [ ] Section 8 content is in sync with `docs/brand/mood-board-spec.md`
      (Path A: edit-mood-board-spec → rebuild → page shows change.
      Path B: both files carry the sync-reminder comment.)
- [ ] Header rendered HTML on every page shows About / Blog / Brand
      (binary: curl + grep `href="/brand/"`)
- [ ] Footer rendered HTML shows About / Blog / Brand / Play / Cards
      in that order
- [ ] Active state on `/brand/`: header Brand link's
      `<span class="active">` styled per WP-010
- [ ] No active state on home `/` or other pages
- [ ] All eight page sections present, in order, with shortcode-
      rendered swatches and font samples in §4 and §5
- [ ] Each of the eight sections carries its prescribed stable
      anchor ID (`#brand-overview`, `#logo-identity`,
      `#core-identity`, `#color-system`, `#typography-system`,
      `#token-contract`, `#usage-guidelines`, `#art-direction`);
      deep-links to each resolve correctly
- [ ] Class-color tokens annotated "gameplay-only" in the Color
      System collapsible spec; not used as page surface colors
- [ ] All page styling uses `var(--la-*)` tokens (verify via
      DevTools spot-check on swatches, headings, links)
- [ ] WCAG AA contrast confirmed for body text, headings,
      collapsible summaries, DO/DON'T checklist, and Section 8
      art-direction prose in both light and dark mode
- [ ] Theme toggle round-trips cleanly with no visual regression
- [ ] DevTools console: zero errors / page errors / failed network
      requests on `/brand/`, home, About, blog index, one post
- [ ] Mechanical token-discipline check (no raw hex in new files)
      returns no matches
- [ ] Lighthouse ≥ 90 on all four categories on `/brand/`, home,
      post (raw JSON local-only)
- [ ] Mechanical reproducibility check: two consecutive
      `npm run build` runs produce byte-identical `public/`
- [ ] `git diff HEAD` on existing canonical brand artifacts is empty
- [ ] `layouts/_partials/header.html` byte-identical to pre-WP
- [ ] Submodule clean (`git submodule status` shows no `+`)
- [ ] `docs/03-ROADMAP.md` updated with WP-014 row + detail section
      + commit hashes + Lighthouse scores
- [ ] `docs/01-VISION.md` Decisions log entry added (covering all
      five sub-points in Step 7 §2)
- [ ] All commits on `origin/main`

## Failure conditions (explicit)

- Any modification to existing `docs/brand/*.md` files (other than
  the additive `mood-board-spec.md`), to `docs/brand/CHANGELOG.md`,
  or to `static/brand-tokens.css` token values
- Any raw hex / non-token colour, font, or spacing value introduced
  in new CSS, new shortcodes, or page markdown
- Class-color tokens used as brand-page surface colors (not
  reference content)
- Class-color section missing the "gameplay-only" annotation
- Personal-cloud URL (SharePoint, OneDrive, Copilot share link)
  introduced anywhere in `mood-board-spec.md` or page content
- `layouts/_partials/header.html` diff non-empty
- Brand menu item missing from header or footer rendered HTML
- Lighthouse drops below 90 on `/brand/`, home, or post
- Reproducibility check shows any diff between two `public/` builds
- Submodule shows `+`
- Page section count ≠ 8, or sections out of prescribed order
- Heading anchor IDs missing, malformed, or different from the
  prescribed list in Step 3 §Heading anchor IDs
- Section 8 out of sync with `docs/brand/mood-board-spec.md` (Path
  A: rebuild didn't propagate; Path B: sync-reminder comment
  missing or content diverged)
- Logo applied with class color (or any non-canonical inversion)
  in the rendered Logo section
- Decisions log entry missing any of the five sub-points
- Poster artwork (PDF/SVG) committed under this WP (out of scope —
  must come via a separate WP)

## What's NOT in scope

- **The one-page mood-board poster artwork itself** (PDF/SVG). The
  brief is committed; an artist produces the artwork in a follow-up.
  Hosting path when produced: `static/brand/mood-board.{pdf,svg}`;
  referenced from Section 8 via download link or inline embed.
- Mod creator asset bundle / downloads — separate WP if needed
- Press kit / press contact form — separate WP
- Brand-token additions or value changes (would land via
  `docs/brand/CHANGELOG.md` under a separate WP scoped to the
  token change)
- Logo file format additions (SVG / PNG / favicon variants) —
  scope only if the canonical export under `docs/brand/logo-figma/`
  or `static/` is genuinely missing; otherwise separate WP
- Translating the brand page (i18n) — site is English-only
  through current roadmap
- Schema.org / JSON-LD markup specific to `/brand/` — WP-008
  baseline applies automatically; deeper structured markup is a
  follow-up if needed
- Cards.* or play.* visual updates — orthogonal repos
- Mobile responsive overhaul — PaperMod's defaults plus the
  existing WP-010 nav are sufficient at the current six-link nav
- Migrating `cards.barefootbetters.com` to
  `cards.legendary-arena.com` — orthogonal infra work

## Authority

Per `docs/01-VISION.md` Decisions log convention, in case of conflict:

1. `docs/01-VISION.md`
2. `docs/03-ROADMAP.md`
3. This WP file
4. Active session context

## Background

The site shipped through WP-001 → WP-010 with `/about/` as the only
narrative public surface, and through WP-008 with SEO baseline.
Canonical brand artifacts live in `docs/brand/*.md` — comprehensive
but designed for internal contributors, not external creators /
partners.

The gap surfaced (2026-05-11 review) when considering whether to
fold brand-system documentation into `/about/`. Verdict: separate
surface, separate audience. `/about/` answers "who are you"; a
`/brand/` page answers "how do we use your visual identity, and
how do we direct art for it."

The mood-board brief (Section 8 + `docs/brand/mood-board-spec.md`)
was added to scope on the same review pass: a public art-direction
artifact serves two audiences — external creators interpreting the
brand for their own work, and graphic artists commissioned to
produce the one-page poster. Committing the brief as a brand doc
(rather than embedding it only in page content) makes it durable
and re-usable across future commissions.

This WP is a small, additive, presentation-and-spec-only fix. No
existing canonical artifact is touched. No new brand decision is
introduced. Cross-origin token consumption invariant (WP-002 /
WP-007b) is restated publicly for the first time as the Token
Contract section.

---

## Appendix A — Mood-board spec content

The following content is the durable source for
`docs/brand/mood-board-spec.md` (Step 2) and Section 8 of the
rendered page (Step 3 §8). Lift verbatim during execution, with
the cleanup pass noted in Step 2 (remove any personal-cloud URLs;
preserve the StudioBinder / Milanote / Graphic Design Junction
references as source-pattern footnotes).

---

Below is a **single-page mood board spec (PDF/SVG)** you can hand
to a graphic artist so they understand **Legendary Arena's look,
feel, and message at a glance**. It's based on common "one-page
brand board / brand guideline poster" patterns (logo + palette +
type + imagery + texture + do/don't) used in popular templates
and guides.

External-template references (source patterns only, not
load-bearing standards):

- StudioBinder — Brand Mood Board Template:
  https://www.studiobinder.com/templates/mood-boards/brand-mood-board-template/
- Milanote — Brand Board template:
  https://milanote.com/templates/moodboards/brand-board
- Graphic Design Junction — Single-Page Brand Guidelines Templates:
  https://graphicdesignjunction.com/2025/10/single-page-brand-guidelines-templates/
- Milanote — Game Design Moodboard guide:
  https://milanote.com/guide/game-design-moodboard
- StudioBinder — Video Game Mood Board:
  https://www.studiobinder.com/blog/video-game-mood-board/
- StudioBinder — How to Make a Brand Mood Board:
  https://www.studiobinder.com/blog/how-to-make-a-brand-mood-board/
- Content Harmony — Great Brand Guidelines:
  https://www.contentharmony.com/blog/great-brand-guidelines/
- ebaqdesign — One Page Style Guide:
  https://www.ebaqdesign.com/one-page-style-guide
- SegmentUI — Figma Kit Branding:
  https://segmentui.com/figmakit/branding
- LinkedIn — Game design style guide best practices:
  https://www.linkedin.com/advice/3/whats-best-way-create-keep-style-guide-your-game-skills-game-design

### 1) Mood board goal (top-of-page micro-brief)

**Header title (large):**
**LEGENDARY ARENA — MOOD BOARD (ART DIRECTION)**

**One-sentence promise (beneath title):**
"Legendary Arena is a modern deck-building arena: strategic,
collectible, heroic — crafted for fast readability and bold moments."

**3 brand pillars (short phrases):**

- **Strategy → Synergy → Power spikes**
- **Mythic spectacle, modern clarity**
- **Collectible craft, digital smoothness**

Why this belongs: one-page boards work best when they anchor
"purpose + vibe" before showing visuals, so artists interpret
images consistently.

### 2) Layout: a proven one-pager structure (what blocks to include)

Use a **grid-based poster** that shows essentials without scrolling
— typical of single-page brand guideline posters.

**Recommended grid (simple + scannable)**

- **Top row (full width):** Brand header + tagline + keywords
- **Middle (3 columns):**
  - **Left:** "Words & rules" (keywords, tone, do/don't)
  - **Center (largest):** Image collage (the "mood")
  - **Right:** System (color, type, shapes, textures, icons)
- **Bottom row (full width):** Signature motif strip + UI/card
  framing snippet + credits/links

This mirrors widely used brand-board templates that combine logo,
imagery, palette, typography, and quotes in one view.

### 3) The exact text blocks to include (copy-paste ready)

**A) "Brand in 6 words" (upper-left)**

Pick one line (or include 2 options):

1. **"Build decks. Trigger combos. Become legendary."**
2. **"Collect power. Craft synergy. Win the arena."**
3. **"Modern strategy with mythic spectacle."**

**B) Brand personality keywords (left column)**

**Primary adjectives (5):**
**Legendary, Strategic, Bold, Clean, Premium**

**Secondary adjectives (5):**
**Energetic, Competitive, Collectible, Satisfying, Modern**

**Avoid (3-5):**
**Goofy, cluttered, grimdark, muddy, generic fantasy**

("Avoid" lists are common in brand guides because they prevent
drift when multiple artists contribute.)

**C) Tone-of-voice micro rules (left column)**

- **Write like:** confident, punchy, invitational.
- **Use verbs:** build, forge, unleash, rally, command.
- **Never:** cynical, snarky, overly ironic.

**D) Audience + feeling (left column)**

- **Audience:** deck-building / strategy players who enjoy collection
  and mastery.
- **Desired feeling (in order):** curiosity → control → momentum →
  triumph.

**E) "Design intent" bullets (left column)**

- **Readability first:** every card / UI element must read in 1-2
  seconds.
- **Iconic silhouettes:** heroes / units look recognizable even small.
- **Reward clarity:** power moments feel bright, not noisy.

### 4) The graphics to include (what to show, not just tell)

**A) Central image collage (the "mood") — 9 to 12 tiles**

The collage should be the **largest area**. Use **9-12 images**
arranged in a clean grid (3×3 or 4×3). Include labels on 3-5 tiles
("Lighting", "Material", "Composition", "Energy"). This matches
common brand-mood-board practice of gathering varied imagery that
evokes the desired feeling.

What the tiles should depict (categories):

1. **Heroic focal portraits** (high-contrast lighting, readable
   silhouettes)
2. **Arena scale / spectacle** (wide scenes with a central "stage"
   shape)
3. **Card / collectible craftsmanship** (foil, emboss, gilded
   edges — tasteful)
4. **Modern UI clarity** (clean panels, restrained gradients, crisp
   icons)
5. **Energy effects** (glows, bursts, runes — controlled, not messy)
6. **Material references** (metal, stone, enamel, glass — premium
   feel)
7. **Color mood photography** (2-3 photos that match your palette
   vibe)
8. **Typography vibe reference** (a screenshot of a type pairing
   in use)
9. **Pattern / texture reference** (subtle background motif
   inspiration)

> Tip: The best mood boards include **variety** (photo, illustration,
> UI, texture) rather than only concept art, so artists grasp the
> full brand system.

**B) Color palette block (right column)**

Show **6-8 swatches** with **HEX codes** and roles (Primary /
Secondary / Accent / Neutral). Templates and guides repeatedly
call out including precise palette values for consistent execution.

Recommended structure (labels you should include):

- **Primary Dark (Background)**
- **Primary Light (Surface)**
- **Accent 1 (Energy)**
- **Accent 2 (Rarity / Reward)**
- **Neutral 1 (Text)**
- **Neutral 2 (Lines / Dividers)**

*(Legendary Arena has established brand colors in `palette.md` —
drop in the canonical swatches when populating this block. The
roles above are template labels, not new decisions.)*

**C) Typography block (right column)**

Show **two font roles** and a **hierarchy example**: H1, H2, Body,
UI Label. One-page brand boards commonly include "type pairing +
usage."

Include these lines exactly:

- **Display / Logo type:** (Font Name) — used for game title, big
  headings
- **UI / Body type:** (Font Name) — used for interfaces, card text
- **Rules:** "Max 2 families; weight does the work."

Also include a sample sentence in both styles:

- "Forge a deck. Rally allies. Unleash a legendary turn."

**D) Shape language + composition block (right column)**

Include **3-5 simple vector shapes** that define the visual grammar:

- **Shield / crest silhouette** (identity anchor)
- **Hex or diamond framing** (collectible / rarity cue)
- **Arc / arena ring** (the "arena" motif)
- **Card frame corners** (signature radius + bevel)

Label it: **"Shape Language: crisp geometry + heroic crest"**

This aligns with guidance that a style guide should define the
"visual identity system," not just pictures.

**E) Texture & material strip (bottom row)**

Add a thin horizontal strip with **3 textures** (subtle, premium):

- **Brushed metal** (cool)
- **Carved stone / slate** (grounded)
- **Enamel glow / glass bloom** (magic / energy)

Label each with a single word: **METAL / STONE / GLOW**.

**F) Iconography mini-set (right-lower)**

Add a **6-10 icon mini-grid** (simple line icons, consistent stroke):

- attack / power
- recruit / craft
- shield / defense
- rarity star
- timer / turn
- lightning / energy

Label: **"Icons: simple, bold, readable at 24px"**

Many brand-guideline examples emphasize including icon rules for
consistency.

**G) "Card + UI snippet" (bottom center)**

Include one small "system preview" graphic:

- A **card frame mock** (blank art window + title bar + cost gem +
  text area)
- A **button set** (Primary / Secondary / Disabled)
- A **panel** (modal or tooltip style)

Label: **"System Preview (readability first)"**

Game-style guidance often pairs mood boards with practical UI /
system references so teams can build consistently.

### 5) Do / Don't mini panel (left-lower): prevents style drift fast

**DO**

- High contrast focal points
- Clean silhouettes
- Controlled glow
- Premium materials
- Spacious layouts

**DON'T**

- Over-textured backgrounds behind text
- Rainbow gradients everywhere
- Tiny unreadable detail at card scale
- Excessive particle noise
- Mixed icon styles

Short "dos and don'ts" are common in one-page guideline posters
because they communicate constraints instantly.

### 6) References (tiny footer): where artists can pull templates

Add a small footer line on the produced poster like:

"Layout inspired by one-page brand-guide / brand-board formats
(logo + palette + type + imagery + rules). See: Milanote Brand
Board, StudioBinder Brand Mood Board Template, and single-page
poster collections like Graphic Design Junction."

That gives the commissioned artist context without forcing them
to read long docs.

### 7) Quick assembly checklist (so the final PDF/SVG is truly "instant")

Content requirements that can sit directly on the produced poster
(small text):

- **Max 12 images** in the collage; label 3-5 of them.
- **Palette must include HEX codes + roles.**
- **Type must show hierarchy sample (H1 / H2 / Body / UI).**
- **Include 1 "system preview" (card frame + button + panel).**
- **Include Do / Don't list.**
