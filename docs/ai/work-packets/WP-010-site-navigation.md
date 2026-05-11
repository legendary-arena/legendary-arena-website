# WP-010 — Header + footer site navigation

Wire the existing About page and Blog index into the site chrome. Today
the About page (`/about/`) and Blog index (`/posts/`) ship and return
200, but no visitor can reach them from the home page: PaperMod's header
menu (`<ul id="menu" class="menu">`) renders empty because
`hugo.toml` carries no `[[menu.main]]` block, and the footer is
PaperMod's default (copyright + Hugo/PaperMod credits, no nav region).

This WP closes that gap. It is the smallest WP that makes the site
navigable.

This file is the **session-ready execution pack**. The design source of
truth is [`docs/03-ROADMAP.md`](../../03-ROADMAP.md). If this file and
the roadmap conflict, the roadmap wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme as a Git submodule. Brand
tokens consumed by `play.*` and `cards.*` via cross-origin link.

## Required reading (in order)

Before editing anything, read these — they set the bar and the
constraints:

1. `docs/01-VISION.md` — vision, Global invariants, Decisions log.
   Authoritative. Note the **deterministic-deploy** invariant: same
   commit → same output, reproducible locally via the WP-005 build
   command (`npm run build`).
2. `docs/03-ROADMAP.md` — full WP list. Read **WP-004** (content
   scaffolding — Done) and the WP-005 / WP-006 lock notes; they
   define the header partial override (Pagefind search) and the
   Cloudflare Pages deploy contract this WP must not disturb.
3. `docs/04-CONTENT-CONVENTIONS.md` — content layout. About lives at
   `content/about/_index.md`, posts at `content/posts/`. These are
   the only two targets the header menu must reach in v1.
4. `docs/brand/strategy.md` § 5 (Layout patterns), § 10 (Brand
   failure modes), and `docs/brand/palette.md` — header nav text
   colour, hover/focus state, and active-state underline must route
   through `var(--la-*)` tokens. No raw hex.
5. `layouts/_partials/header.html` — **the current custom header
   override**. Lines 104-128 already iterate `site.Menus.main` and
   render `<li><a>` markup. Adding `[[menu.main]]` to `hugo.toml`
   is sufficient to populate the header; **no header partial edit
   is required for the header menu**. The Pagefind search mount
   (`<div id="la-search">` at lines 142-146) is **locked under
   WP-005 § Step 4** — do not move it, rename its id, or change its
   placement relative to the menu.
6. `themes/PaperMod/layouts/_partials/footer.html` — current footer
   markup (no nav region). The footer override under this WP must
   add a nav region without removing the copyright line or the
   "Hugo & PaperMod" credit; PaperMod's submodule cleanliness rule
   (WP-001 / WP-005 constraint) still applies — do not modify the
   submodule, only override.
7. `hugo.toml` — current config. No `[[menu.main]]` block exists.
   Pagefind config, brand-tokens link, and the WP-004 / WP-005
   commentary blocks are present and must not be disturbed.
8. <https://gohugo.io/methods/site/menus/> — Hugo's site menus API,
   for reference on `[[menu.main]]` field semantics
   (`identifier`, `name`, `url`, `weight`, `pre`/`post`).
9. WP-009 (class-color usage audit) is currently spec-draft pending
   review. WP-009 audits header / footer chrome surfaces; if WP-010
   lands before WP-009 begins, WP-009 picks up the new nav surfaces
   in its scope. If WP-009 lands first, WP-010 must re-run WP-009's
   class-colour assertions against the new header / footer markup.
   Re-sequencing this WP ahead of WP-009 is the recommended order;
   see § Roadmap sequencing note at the end.

Don't read prior session transcripts; the committed artifacts are the
truth.

## Current state

Locked under WP-001 → WP-006 (verified 2026-05-09 / 2026-05-10):

- Header partial (`layouts/_partials/header.html`) custom override
  exists. The `<ul id="menu" class="menu">` block iterates
  `site.Menus.main` correctly — but the menu source is empty.
- About page (`content/about/_index.md`) ships and returns 200.
- Blog index (`/posts/`) ships and returns 200.
- Pagefind search lives in the header (WP-005). Its mount point
  (`<div id="la-search">`) is canonical and locked.
- No `layouts/_partials/footer.html` override exists; the theme's
  default ships.
- Submodule clean (`c4ca7ca486ecd67c8f6bba31551a6ee0d1455926
  themes/PaperMod (heads/master)`, no `+`).

What's pending — **your job**:

- ❌ `[[menu.main]]` block in `hugo.toml` listing About + Blog
- ❌ Footer override at `layouts/_partials/footer.html` that adds a
  nav region (About, Blog, Play, Cards — see Step 2) while
  preserving the copyright line and PaperMod credit
- ❌ Footer-menu source: a `[[menu.footer]]` block in `hugo.toml`,
  consumed by the footer partial override via `site.Menus.footer`
  (PaperMod does not iterate `site.Menus.footer` natively)
- ❌ Brand styling: header menu links and footer nav links use
  brand tokens (no raw hex); hover / focus / active states pass
  WCAG AA contrast in both light and dark mode
- ❌ Active-state styling on the header menu — current page is
  visually identified (PaperMod's partial already applies
  `class="active"` to the matching `<span>`; verify the brand
  CSS handles it)
- ❌ External-link icons (the existing `findRE "://" .URL` block
  at header partial line 117-123) — render correctly for `Play`
  and `Cards` if you choose to include external items in either
  menu
- ❌ Lighthouse re-verification (≥ 90 on home + at least one post,
  matching WP-005 / WP-006 floor)
- ❌ Reproducibility check (mirrors WP-005 Step 8.7) — two
  consecutive `npm run build` runs produce byte-identical
  `public/`

## Task

### Step 1 — Define the menus in `hugo.toml`

Append to `hugo.toml` after the existing `[markup]` block (or
anywhere after `[params]`; ordering is irrelevant):

```toml
# Header menu — iterated by layouts/_partials/header.html
# (custom override; lines 104-128). The PaperMod logo (top-left)
# already links Home, so Home is intentionally not in this menu.
[[menu.main]]
  identifier = "about"
  name = "About"
  url = "/about/"
  weight = 10

[[menu.main]]
  identifier = "blog"
  name = "Blog"
  # Trailing slash is REQUIRED. The header partial performs exact
  # string comparison for active-state styling — a missing trailing
  # slash silently breaks `<span class="active">` on the matching
  # page. See § Step 1 Constraints below.
  url = "/posts/"
  weight = 20

# Footer menu — iterated by layouts/_partials/footer.html
# (introduced by this WP). PaperMod does not iterate
# site.Menus.footer natively, so the override is the only consumer.
[[menu.footer]]
  identifier = "footer-about"
  name = "About"
  url = "/about/"
  weight = 10

[[menu.footer]]
  identifier = "footer-blog"
  name = "Blog"
  url = "/posts/"
  weight = 20

[[menu.footer]]
  identifier = "footer-play"
  name = "Play"
  url = "https://play.legendary-arena.com/"
  weight = 30

[[menu.footer]]
  identifier = "footer-cards"
  name = "Cards"
  url = "https://cards.barefootbetters.com/"
  weight = 40
```

**Constraints:**

- Do NOT add any other top-level keys, params, or markup config.
- Do NOT modify existing `[params]` entries (Pagefind, theme toggle,
  reading time, etc.). They are locked under WP-001 / WP-002 /
  WP-004 / WP-005.
- Do NOT touch the WP-004 / WP-005 commentary blocks (the
  `# why: PaperMod's built-in Fuse.js search...` block and the
  `# Home page is rendered by layouts/index.html (WP-004
  approach A)...` block).
- `url` values are root-relative for internal targets (`/about/`,
  `/posts/`) and absolute for external (`https://play.*`,
  `https://cards.*`).
- **Internal URLs MUST include a trailing slash.** The header
  partial performs exact string matching for active-state
  resolution (`(cond (strings.HasSuffix .URL "/") .URL (printf
  "%s/" .URL))` at lines 105-107, then exact-string compare against
  `$page_url` at line 112). Removing the trailing slash silently
  breaks the `<span class="active">` assignment — there is no error,
  the active state just never lands. Hugo's `canonifyURLs = true`
  setting in `hugo.toml` is a complementary guard at render time
  but does NOT compensate for missing trailing slashes in
  `[[menu.main]]` / `[[menu.footer]]` URL fields.
- `weight` values use 10-spaced steps so future inserts don't
  require renumbering.

### Step 2 — Create the footer partial override

Create `layouts/_partials/footer.html`. Model after the theme's copy
at `themes/PaperMod/layouts/_partials/footer.html` — copy the entire
file verbatim first, then add the nav region **inside** the existing
`<footer>` element as its **first child node**:

```
<footer>
  {{- /* NEW: nav region introduced by WP-010 */ -}}
  <nav class="footer-nav">
    <ul>
      {{- range site.Menus.footer }}
        ...
      {{- end }}
    </ul>
  </nav>
  {{- /* EXISTING upstream content (unchanged below this line) */ -}}
  ...
</footer>
```

This placement is non-negotiable — it eliminates structural ambiguity
between "above the copyright" (could be read as either inside-as-first
or outside-before) and ensures consistent DOM ordering across
executions.

The override must:

1. **Preserve** the theme's existing `<footer>` markup (copyright
   line, "Hugo & PaperMod" credit, any structural classes / ids
   the theme uses for layout). Do NOT refactor or reformat the
   upstream markup — only insert the nav region as the first
   child of `<footer>`.
2. **Add** a nav region (`<nav class="footer-nav"><ul>...</ul></nav>`)
   that iterates `site.Menus.footer` and renders each item as
   `<a href="{{ .URL }}">{{ .Name }}</a>`.
3. **Match the header's external-link icon behaviour** — if a
   footer item's URL matches `findRE "://" .URL`, render the same
   external-link `<svg>` the header partial uses (header partial
   lines 117-123). Copy the SVG markup verbatim so the two
   menus' external-link iconography is byte-identical. NOTE:
   external-link detection relies on `findRE "://"` to mirror
   existing header behaviour. Do NOT change the detection
   predicate unless the header implementation is also updated;
   icon parity is a strict invariant.
4. **Open in a new tab safely** for external links: add
   `target="_blank" rel="noopener noreferrer"` only when the URL
   matches `findRE "://" .URL`. Internal links must NOT carry
   these attributes — they're noise.
5. Keep the custom delta (the nav region + iteration block)
   minimal and visually separable from the upstream copy. Do
   not refactor or reformat upstream markup.

The file should start with the same header comment style as
`layouts/_partials/header.html` (lines 1-16) — explain that this is
a PaperMod footer override, what's different from upstream, and why.

### Step 3 — Brand styling (CSS)

In `assets/css/extended/custom.css` (the canonical brand-CSS file
per WP-002 / WP-003), add styling for:

- `ul#menu li a` — link colour, hover colour, focus ring.
  Already-styled link styles may apply; verify in DevTools.
- `ul#menu li a span.active` — the active-page indicator.
  PaperMod's header partial sets the `active` class on the
  matching `<span>` (header partial line 112). Style it with a
  brand-token underline or weight change, not a raw colour.
- `.footer-nav ul li a` — token-driven; visually distinct from
  body links but consistent with the header menu styling.
- Footer nav external-link SVG colour — `currentColor` (so it
  inherits the link colour); no fill / stroke overrides with raw
  hex.

**Selector stability rule.** Target `ul#menu` directly (the
PaperMod-canonical surface) rather than `.header-nav ul#menu`.
The wrapping `.header-nav` class lives in the header partial
override and could be renamed in a future header-restructure WP;
`ul#menu` is the invariant surface PaperMod's JS depends on.
For the footer, `.footer-nav` is the class introduced by THIS WP
(see Step 2 markup), so it is stable by definition.

**Constraints:**

- All colour, font, spacing values via `var(--la-*)` tokens. No
  raw hex anywhere in this WP's CSS additions.
- Hover and focus states must pass WCAG AA contrast in both light
  and dark mode (DoD check below).
- Do NOT modify `static/brand-tokens.css` token values. The brand
  token surface is locked under WP-002.

### Step 4 — Verify

1. **Local build + dev server (fresh state)**:
   ```powershell
   # why: Hugo cleans `public/` by default on each build, so this
   # Remove-Item is paranoia against stale files from prior
   # unrelated builds (e.g., a half-finished WP-008 or WP-009
   # session left artefacts behind). It is NOT a workaround for a
   # Hugo "menu cache" — Hugo has no such cache.
   if (Test-Path public) { Remove-Item public -Recurse -Force }
   npm run build
   hugo server --bind=127.0.0.1 --port=1313
   ```
   `hugo server` should start clean (the same two PaperMod
   deprecation warnings as WP-001 / WP-005 are expected; no new
   warnings).
2. **Render check (production build at `:1314`, same convention
   as WP-004 / WP-005)**:
   ```powershell
   npx http-server public -p 1314 --silent
   ```
   Open `http://localhost:1314/` and confirm:
   - Header shows `About` and `Blog` as menu items, in that order
   - Clicking `About` lands at `/about/` with About text rendered
   - Clicking `Blog` lands at `/posts/` with the blog index
     rendered (the launch-announcement post is listed)
   - Footer shows `About`, `Blog`, `Play`, `Cards` — in that order
   - `Play` and `Cards` open in a new tab and carry the
     external-link icon
   - Footer copyright + "Hugo & PaperMod" credit are unchanged
3. **Active-state check**:
   - Navigate to `/about/`; the header `About` link's
     `<span class="active">` is styled per Step 3
   - Navigate to `/posts/`; the header `Blog` link's
     `<span class="active">` is styled
   - Navigate to home `/`; neither `About` nor `Blog` carries
     `active` (logo is the home affordance)
4. **Theme toggle**:
   - Toggle dark / light; header and footer nav links remain
     readable; hover / focus states remain WCAG AA on both modes
5. **Console clean** — DevTools shows zero errors, zero page
   errors, zero failed network requests on home, About, blog
   index, and at least one post page.
6. **Lighthouse** (matches WP-005 § Step 8.5 exactly):
   ```powershell
   npx lighthouse@12 http://localhost:1314/ `
     --output=json --output-path=lighthouse-home-wp010.json `
     --chrome-flags="--headless --no-sandbox --disable-gpu" `
     --only-categories=performance,accessibility,best-practices,seo `
     --quiet
   ```
   Re-run against `http://localhost:1314/posts/2026-05-07-launch-announcement/`
   into `lighthouse-post-wp010.json`. All four categories must
   remain ≥ 90 on both home and post. The raw JSON is local-only;
   do NOT commit.
7. **Reproducibility (mechanical check, mirrors WP-005 § Step
   8.7)**:
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
   `Compare-Object` result must be empty. Any diff is a failure
   condition — investigate before locking. `build1.txt` /
   `build2.txt` are local-only; do not commit.
8. **Submodule clean** — `git submodule status` shows
   `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926 themes/PaperMod
   (heads/master)` with no `+`.

### Step 5 — Lock WP-010

When all DoD + exit criteria pass:

1. Update `docs/03-ROADMAP.md`:
   - Add a WP-010 row to the Summary table:
     `| WP-010 | Header + footer site navigation | ✅ Done (YYYY-MM-DD) | WP-006 | ~half-day |`
   - Add a WP-010 detail section (mirror WP-005 / WP-006 format —
     Status, Effort, Dependencies, Commits, Readiness,
     Preconditions, Goal, Deliverables, Constraints, DoD,
     Exit criteria, Failure conditions, Rollback, Notes)
   - Tick all DoD + exit criteria boxes
   - Record final commit hash(es) under `**Commits:**`
   - Record the four Lighthouse scores (Performance / Accessibility
     / Best Practices / SEO) for home + blog post, matching the
     WP-005 / WP-006 format
2. Add a Decisions log entry to `docs/01-VISION.md` recording:
   - Why Home is not in the header menu (logo is the home
     affordance)
   - The footer-menu source choice (`[[menu.footer]]` consumed by
     an override, rather than a `params.footerLinks` array)
   - Anything else a future contributor would otherwise have to
     reverse-engineer
3. Commit at logical milestones throughout the session, then push.

## Constraints

- **Brand artifacts are locked.** Do NOT modify
  `docs/brand/{strategy,palette,typography,spacing}.md` or
  `static/brand-tokens.css` token values. Nav styling rides on
  existing tokens. If a real brand-failure-mode issue surfaces and
  a token tweak is genuinely required, that's an additive change
  — log in `CHANGELOG.md` per the v1 rules. Don't change values
  silently.
- **No raw colour / font / spacing values in CSS or JS.** Token-first
  contract still applies. Use `var(--la-*)` always.
- **Submodule must stay clean.** `git submodule status` shows no
  `+`. No edits under `themes/PaperMod/`.
- **`layouts/_partials/header.html` MUST NOT be modified in this
  WP.** The header partial already iterates `site.Menus.main`
  correctly (lines 104-128); this WP only provides the menu
  source (`[[menu.main]]` in `hugo.toml`) and the styling. Any
  diff against `layouts/_partials/header.html` post-execution
  is a failure condition.
- **WP-005 Pagefind mount is locked.** `<div id="la-search">` at
  `layouts/_partials/header.html` lines 142-146 is canonical.
  Do not move it, rename its id, or change its placement. (This
  is a corollary of the no-edit rule above, called out
  separately because the WP-005 lock pre-dates it.)
- **`layouts/index.html` (WP-004 home override) is out of scope.**
  This WP does not touch the home page hero / CTA / sections.
- **WP-004 / WP-005 / WP-006 commentary blocks in `hugo.toml` are
  locked.** Do not touch the `[params].homeInfoParams`-related
  comment block or the `[outputs]`-related Pagefind comment block.
- **Build is single-command and deterministic.** `npm run build`
  must produce byte-identical `public/` across runs from the same
  commit (the WP-005 contract). Non-determinism is a failure
  condition.
- **Performance budget.** Lighthouse Performance must stay ≥ 90 on
  home and on the post. Two extra menu DOM nodes will not break
  this; verify anyway.
- **External-link icon must be the same SVG used by the header
  partial.** Copy markup verbatim; do not redraw.

## Definition of Done

- [ ] `[[menu.main]]` block in `hugo.toml` with About (weight 10)
      and Blog (weight 20)
- [ ] `[[menu.footer]]` block in `hugo.toml` with About / Blog /
      Play / Cards (weights 10 / 20 / 30 / 40)
- [ ] `layouts/_partials/footer.html` exists, iterates
      `site.Menus.footer`, preserves theme copyright + credit
- [ ] Header rendered HTML on every page shows About and Blog
      links (binary check: curl the home page and grep for
      `href="/about/"` and `href="/posts/"` — both must return
      at least one match)
- [ ] Footer rendered HTML on every page shows the four footer
      links (binary check: curl the home page and grep for
      `play.legendary-arena.com` and `cards.barefootbetters.com`
      — both must return at least one match. The two internal
      footer links — About and Blog — are covered by the header
      check above since they share `href` values, but a
      footer-specific spot-check on the post page is still
      worthwhile to confirm the footer partial renders on
      single-page templates not just the home list)
- [ ] `layouts/_partials/header.html` is byte-identical to its
      pre-WP state (`git diff layouts/_partials/header.html`
      returns empty)
- [ ] Internal nav links (About, Blog) are root-relative with
      trailing slash; do NOT carry `target="_blank"` or `rel`
- [ ] External nav links (Play, Cards) carry both
      `target="_blank"` AND `rel="noopener noreferrer"`, plus the
      external-link `<svg>` icon
- [ ] Active state styled and visible on `/about/` and `/posts/`
- [ ] No active state applied to header nav on home `/`
- [ ] Header and footer nav text colour, hover, focus, and active
      states use `var(--la-*)` tokens only (verify in DevTools)
- [ ] WCAG AA contrast confirmed for hover / focus states in both
      light and dark mode (DevTools accessibility inspector or
      manual contrast check against tokens)
- [ ] Theme toggle round-trips cleanly (light → dark → light) with
      no nav style regression
- [ ] DevTools console: zero errors, zero page errors, zero failed
      network requests on home, About, blog index, and one post
- [ ] Lighthouse ≥ 90 on all four categories on home + post (raw
      JSON stays local-only)
- [ ] Mechanical reproducibility check: two consecutive
      `npm run build` runs produce byte-identical `public/`
- [ ] Submodule clean (`git submodule status` shows no `+`)
- [ ] `docs/03-ROADMAP.md` updated with WP-010 row + detail
      section + commit hashes + Lighthouse scores
- [ ] `docs/01-VISION.md` Decisions log entry added
- [ ] All commits on `origin/main`

## Failure conditions (explicit)

- About or Blog appears in the menu source (`hugo.toml`) but does
  not render in `<ul id="menu">` — indicates a Hugo cache issue
  or a header-partial regression; investigate, do not work around
- Active state applied to home `/` (would imply the URL
  comparison guard in the header partial is wrong)
- External-link icon missing on Play or Cards (footer parity check
  with header)
- Internal link carries `target="_blank"` (noise — visitors
  shouldn't lose context for in-site navigation)
- External link missing `rel="noopener noreferrer"` (security
  regression)
- Lighthouse Performance, Accessibility, Best Practices, or SEO
  drops below 90 on home or post
- Mechanical reproducibility check shows any diff between two
  consecutive `public/` builds
- PaperMod submodule shows `+` (i.e., something edited the theme
  source — must be reverted; the override files are the correct
  surface)
- Any raw hex / non-token colour, font, or spacing value
  introduced under `assets/css/extended/custom.css`
- Footer copyright line or "Hugo & PaperMod" credit removed or
  modified

## What's NOT in scope

- Adding more menu items than the six listed (About + Blog header,
  About / Blog / Play / Cards footer). Future expansion (e.g., a
  Contact link, a Decks gallery link, a Press link) is a separate
  WP and must be drafted with a real need.
- Adding a mobile hamburger menu. PaperMod's default header is
  responsive; six links across header + footer fit without a
  collapse affordance. If a future WP adds a seventh menu item or
  responsive collapse becomes warranted, draft it as a separate
  WP.
- Modifying the Pagefind search affordance, its mount id, its
  keyboard shortcuts, or its placement relative to the menu —
  locked under WP-005.
- Modifying `static/brand-tokens.css` token values — locked under
  WP-002.
- Modifying `layouts/index.html` (home page) or `content/_index.md`
  — locked under WP-004.
- Marketing analytics, cookie banners, consent UI — out of scope;
  no analytics live on the site as of WP-006 lock.
- SEO additions (Schema.org, JSON-LD, structured menu markup) —
  scope of WP-008.
- Class-colour usage audit across the new nav surfaces — scope of
  WP-009. See § Roadmap sequencing note at the end of this WP.
- Migrating `cards.barefootbetters.com` to
  `cards.legendary-arena.com` — orthogonal infra work (see
  engine-repo WP-146 / EC-149 for the CORS prep).

## Authority

Per `docs/01-VISION.md` Decisions log convention, in case of conflict
the authority chain is:

1. `docs/01-VISION.md` (vision + Global invariants + Decisions log)
2. `docs/03-ROADMAP.md` (WP catalogue + WP detail sections)
3. This WP file
4. Active session context

## Background

The site shipped through WP-004 → WP-006 with About and Blog as
real, indexable, addressable pages — but no WP wired them into the
site chrome. WP-001 set up PaperMod's defaults (which do not
auto-populate the menu); WP-004 authored content but its DoD did
not include navigation discovery; WP-005 added the Pagefind search
affordance in the header partial but did not add a menu source;
WP-006 deployed the site as-is.

The gap surfaced when a visitor (project maintainer, 2026-05-10)
reported "I don't see [the About page] on
https://www.legendary-arena.com/" — the page was live, but
unreachable from the home page. Rendered HTML confirms
`<ul id="menu" class="menu"></ul>` is empty across all pages.

This WP is a small, additive fix. No content moves, no existing
markup is rewritten, and no brand surface is redrawn. The header
partial already iterates `site.Menus.main` correctly — it just
needs a source. The footer needs a small override to mirror that
pattern.

## Roadmap sequencing (locked)

WP-010 is an **upstream blocker for WP-009**. Locked in
`docs/03-ROADMAP.md` § Execution flow + Summary table on
2026-05-10. WP-009's `Dependencies` list now reads
`WP-007a, WP-007b, WP-010`; WP-009's Preconditions list includes
WP-010 with the rationale that auditing a half-built chrome would
force a re-run after WP-010 lands.

Note on scope overlap: WP-009 is specifically a class-color token
audit (the ten `--la-color-class-*` tokens in `palette.md §4.4`).
WP-010's nav additions use generic `--la-*` brand tokens, not
class-color tokens, so WP-010's surfaces do not strictly fall in
WP-009's audit scope. The dependency is sequencing-driven (stable
chrome before audit), not scope-driven. WP-010's Step 4 Verify
does NOT need to re-run WP-009's class-color assertions.
