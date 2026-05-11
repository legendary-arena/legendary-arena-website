# WP-011 — `font-display: optional` (eliminate font-swap CLS)

Switch the marketing site's Google Fonts loading from `display=swap`
to `display=optional`. Single-line edit to
`layouts/_partials/extend_head.html`. Eliminates the class of
Cumulative Layout Shift bug surfaced during WP-010 Step 4.6 (Inter
swap on header menu items pushing layout across `.header-nav`'s
flex-wrap boundary → `<main>` shift → CLS = 0.344 pre-fix on home).

This file is the **session-ready execution pack**. The design source
of truth is [`docs/03-ROADMAP.md`](../../03-ROADMAP.md). If this
file and the roadmap conflict, the roadmap wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme as a Git submodule. Brand
tokens consumed cross-origin by `play.legendary-arena.com` and
`cards.barefootbetters.com` via `static/brand-tokens.css`.

## Required reading (in order)

1. `docs/01-VISION.md` — vision, Global invariants, Decisions log.
   Authoritative. Note especially:
   - **Performance + accessibility floor:** Lighthouse ≥ 90 in
     P/A/BP/SEO; no console errors
   - **Brand tokens are an API contract** — `static/brand-tokens.css`
     is locked under WP-002; the `--la-font-display`,
     `--la-font-body`, `--la-font-mono` token declarations
     (font-family strings) MUST NOT change in this WP
   - 2026-05-10 WP-010 lock entry — captures the font-swap CLS
     discovery this WP closes out
2. `docs/03-ROADMAP.md` — full WP list. Read the WP-005 (Pagefind
   search) and WP-006 (Cloudflare Pages deploy) lock notes; they
   define the Lighthouse ≥ 90 floor and the build-determinism
   contract this WP must not disturb. Note the §Execution flow
   placement of WP-011 (parallel to WP-007b / WP-008 / WP-010,
   after WP-006).
3. `docs/04-CONTENT-CONVENTIONS.md` — build pipeline (`npm ci &&
   npm run build`) and production-deploy contract (Cloudflare
   Pages auto-redeploys on push to `main`).
4. `docs/brand/typography.md` — font-family locks. The three
   web-font families are Bebas Neue (display), Inter (body,
   weights 400/500/600/700), JetBrains Mono (mono, 400). All
   declare system fallbacks in the `--la-font-*` tokens, so the
   `display=optional` posture (fallback used if web font isn't
   ready) is brand-permitted.
5. `docs/brand/strategy.md §10` — brand failure modes. Verify
   that "system-ui fallback in light/dark mode" is not on the
   failure-modes list (it isn't — the fallback chain in
   `brand-tokens.css` explicitly permits it).
6. `layouts/_partials/extend_head.html` — the file this WP edits.
   The Google Fonts `<link rel="stylesheet">` is at line 30. Read
   the surrounding `§2. Web fonts` comment block (lines 20-30)
   for the existing rationale and how it will change.
7. `docs/ai/work-packets/WP-010-site-navigation.md` — the WP that
   surfaced the font-swap CLS issue. The Step 4.6 mitigation
   (`@media (max-width: 768px) { .header-nav > .menu
   { flex-basis: 100% } }` in `custom.css §8`) is a workaround,
   not a root-cause fix. WP-011 removes the underlying cause; the
   workaround in `custom.css §8` STAYS in place under WP-011 (it
   has no negative effect when font-swap is eliminated, and
   removing it would be a separate scope-creep edit).
8. <https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display>
   — MDN reference on `font-display` values. Specifically the
   `optional` semantics: browser gives the font ~100 ms to load,
   then commits to either the web font (if ready) or the fallback
   (if not). After that commit point, the browser never swaps.
   No swap = no layout shift from font swap.

Don't read prior session transcripts; the committed artifacts are
the truth.

## Current state

Locked under WP-001 → WP-010 (verified 2026-05-09 / 2026-05-10):

- `layouts/_partials/extend_head.html` line 30 loads three Google
  Fonts via a single `<link rel="stylesheet">` with the query
  parameter `&display=swap`. With `display=swap`:
  - Browser uses the system-ui fallback at initial paint
  - When the web font loads (any time before ~3 s timeout), the
    browser **swaps** to the web font, re-rendering the text
  - The swap changes text width metrics, which can cascade into
    layout shifts in any container whose dimensions depend on
    text content (e.g., flex containers near a wrap boundary)
- WP-010 Step 4.6 measured CLS = 0.344 on home (mobile preset)
  pre-fix because the WP-010 menu items (Inter-rendered text in
  `.header-nav`) shifted `.header-nav`'s wrap point post-swap.
  The surgical fix lives in `custom.css §8` between §8.1 and
  §8.2; it forces deterministic flex-wrap behavior so the swap
  cannot ripple layout into `<main>`. It mitigates the symptom
  on the WP-010 surfaces but does NOT prevent the same class of
  bug from recurring on different surfaces in future WPs.
- All three web fonts declare system fallbacks in
  `static/brand-tokens.css`:
  - `--la-font-display: "Bebas Neue", "Anton", "Oswald",
    system-ui, sans-serif;`
  - `--la-font-body: "Inter", system-ui, -apple-system,
    "Segoe UI", sans-serif;`
  - `--la-font-mono: "JetBrains Mono", "IBM Plex Mono", Consolas,
    monospace;`
  The fallback chains are brand-permitted; "system-ui rendering"
  is not a `strategy.md §10` failure mode.
- Pre-WP-011 Lighthouse on production build at
  `http://127.0.0.1:1314/` (mobile preset, from WP-010 lock):
  home 94/100/100/100, `/posts/` 95/100/100/100, `/about/`
  92/100/100/100, post 97/100/100/100. These are the WP-011
  regression floor (per-page, per-category).

What's pending — **your job**:

- ❌ Change `&display=swap` to `&display=optional` at
  `extend_head.html` line 30
- ❌ Lighthouse re-verification (≥ pre-baseline AND ≥ 90 on
  home + posts + about + post)
- ❌ Reproducibility check (mirrors WP-005 / WP-010 — two
  consecutive `npm run build` runs produce byte-identical
  `public/`)
- ❌ Roadmap + Vision Decisions log lock

## Task

### Step 1 — Edit `extend_head.html`

In `layouts/_partials/extend_head.html`, line 30, change the
Google Fonts URL query parameter from `&display=swap` to
`&display=optional`. Single-character region-of-effect change in
the `<link rel="stylesheet" href="...">` URL.

Update the surrounding comment block (lines 20-30) to record the
WP-011 rationale: `display=optional` replaces `display=swap` to
eliminate font-swap CLS as a class of bug.

**Constraints:**

- Do NOT remove the Google Fonts `<link>` entirely (would
  eliminate the web fonts for all users, including the
  fast-connection majority who benefit from brand typography)
- Do NOT remove the `<link rel="preconnect">` tags at lines
  28-29 (they save a DNS + TLS handshake before the font CSS
  resolves)
- Do NOT change which families or weights are requested
  (Bebas Neue, Inter weights 400/500/600/700, JetBrains Mono
  weight 400 stay exactly as configured in
  `docs/brand/typography.md §3` and §6)
- Do NOT change anything outside the comment block + the URL
  query parameter

### Step 2 — Verify

#### 2.1 Local build + dev server

```pwsh
if (Test-Path public) { Remove-Item public -Recurse -Force }
npm run build
hugo server --bind=127.0.0.1 --port=1313
```

Expect the same two PaperMod deprecation warnings as WP-005 /
WP-006 / WP-010 (`.Language.LanguageDirection`,
`.Language.LanguageCode`). No new warnings, no errors.

#### 2.2 Render check (production build at `:1314`)

```pwsh
if (Test-Path public) { Remove-Item public -Recurse -Force }
hugo --minify --baseURL "http://127.0.0.1:1314"
npx pagefind --site public
cd public
python -m http.server 1314
```

Open `http://localhost:1314/` and confirm in DevTools Network
panel:

- The Google Fonts CSS file
  (`fonts.googleapis.com/css2?...&display=optional`) is requested
  with `&display=optional` in the URL
- The font files (`fonts.gstatic.com/.../Bebas Neue.woff2`,
  Inter `.woff2`, JetBrains Mono `.woff2`) still load
  successfully (200, not 404) — the fonts are still available;
  we changed loading **behavior**, not availability
- Text rendering on a fast network shows the web fonts (Bebas
  Neue headlines, Inter body, JetBrains Mono code)
- Throttle Network → Slow 3G in DevTools; reload home. Verify:
  text renders with system-ui fallback (no flash to web font
  later in the session). This is the `display=optional` posture
  in action — slow connections never swap.

#### 2.3 Console clean

DevTools shows zero errors, zero page errors, zero failed network
requests on home, `/about/`, `/posts/`, and at least one post
page.

#### 2.4 Lighthouse (regression floor = WP-010 lock baseline)

```pwsh
npx lighthouse@12 http://127.0.0.1:1314/ `
  --output=json --output-path=lighthouse-home-wp011.json `
  --chrome-flags="--headless --no-sandbox --disable-gpu" `
  --only-categories=performance,accessibility,best-practices,seo `
  --quiet
# repeat for /posts/, /about/, and one post page
```

Pre-baseline (WP-010 lock, 2026-05-10):

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` | 94 | 100 | 100 | 100 |
| `/posts/` | 95 | 100 | 100 | 100 |
| `/about/` | 92 | 100 | 100 | 100 |
| `/posts/2026-05-07-launch-announcement/` | 97 | 100 | 100 | 100 |

Post-WP-011 scores MUST NOT drop below these AND MUST NOT drop
below 90 on any page on any category. CLS specifically should be
**at or below** pre-WP-011 levels on every page — the `optional`
posture removes a class of shift, so it should not introduce new
shifts. Raw JSON is local-only (gitignored per `.gitignore` line
~31); do NOT commit.

**Expected direction:** Performance may improve slightly on
home / posts / about (no swap event = no late-render reflow);
Accessibility / Best Practices / SEO should hold at 100. CLS on
home should drop from the WP-010 post-fix value (~0.046) toward
zero now that font-swap-related shift is eliminated at the
source.

#### 2.5 Reproducibility (mirrors WP-005 / WP-010)

```pwsh
if (Test-Path public) { Remove-Item public -Recurse -Force }
npm run build
Get-ChildItem -Recurse -File public |
  Get-FileHash -Algorithm SHA256 |
  Sort-Object Path > build1.txt

if (Test-Path public) { Remove-Item public -Recurse -Force }
npm run build
Get-ChildItem -Recurse -File public |
  Get-FileHash -Algorithm SHA256 |
  Sort-Object Path > build2.txt

Compare-Object (Get-Content build1.txt) (Get-Content build2.txt)
```

`Compare-Object` MUST be empty. Any diff is a failure condition.
`build1.txt` / `build2.txt` are local-only; do not commit.

#### 2.6 Submodule clean

```pwsh
git submodule status
```

Expect: `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926 themes/PaperMod
(heads/master)` with no `+`.

#### 2.7 WP-010 mobile-wrap fix unchanged

```pwsh
git diff assets/css/extended/custom.css
```

Expect: empty output. WP-011 does NOT touch the WP-010 mobile-wrap
fix in `custom.css §8`. The fix remains in place; it has no
negative effect when font-swap is eliminated, and removing it
would be a separate scope-creep edit (and a different WP).

#### 2.8 Brand tokens unchanged

```pwsh
git diff static/brand-tokens.css
```

Expect: empty output. No font-family token changes; cross-site
contract unaffected. No `Version:` bump.

### Step 3 — Lock WP-011

When all DoD + exit criteria pass:

1. Update `docs/03-ROADMAP.md`:
   - Change WP-011 row Status from `⏸️ Pending` to
     `✅ Done (YYYY-MM-DD)` and remove the `*(spec draft
     pending review — see ...)*` parenthetical
   - Add a WP-011 detail section (mirror WP-005 / WP-006 / WP-010
     format — Status, Effort, Dependencies, Commits, Readiness,
     Preconditions, Goal, Deliverables, Constraints, DoD,
     Exit criteria, Failure conditions, Rollback, Notes)
   - Tick all DoD + exit criteria boxes
   - Record final commit hash(es) under `**Commits:**`
   - Record the four Lighthouse scores for home + posts + about
     + post, including CLS deltas vs WP-010 lock
2. Add a Decisions log entry to `docs/01-VISION.md` recording:
   - Why `optional` over `swap` (CLS-free guarantee) vs `block`
     (FOIT, bad UX) vs `fallback` (still permits swap window)
   - The trade-off: brand fidelity on slow connections is
     reduced (fallback used for entire session) — explicitly
     accepted because `strategy.md §10` doesn't list "system-ui
     rendering" as a brand failure mode, and the fallback chain
     in `brand-tokens.css` is brand-permitted
   - Why this is NOT WP-002 v1 → v2 brand-tokens bump
     (font-family tokens unchanged; only the loading behavior
     of the same files changed)
   - The WP-010 `custom.css §8` mobile-wrap fix stays in place
     (no scope-creep removal under WP-011)
   - Anything else a future contributor would otherwise have to
     reverse-engineer
3. Commit at logical milestones throughout the session, then push.

## Constraints

- **`static/brand-tokens.css` is locked.** Font-family tokens
  (`--la-font-display`, `--la-font-body`, `--la-font-mono`)
  unchanged. No cross-site contract bump.
- **`themes/PaperMod` submodule must stay clean.** No edits
  under `themes/PaperMod/`. `git submodule status` shows no `+`.
- **`assets/css/extended/custom.css` is NOT touched.** The WP-010
  §8 mobile-wrap fix stays in place. WP-011's `git diff` against
  `custom.css` MUST be empty.
- **`layouts/_partials/header.html` is NOT touched.** Locked
  under WP-005 / WP-010.
- **No new dependencies.** No `package.json` change. No
  `package-lock.json` change.
- **Build is single-command and deterministic.** `npm run build`
  must produce byte-identical `public/` across runs from the
  same commit (the WP-005 contract). Non-determinism is a
  failure condition.
- **Performance budget.** Lighthouse Performance must stay ≥ 90
  on every measured page AND ≥ the WP-010 pre-baseline (home 94,
  posts 95, about 92, post 97). CLS on every page must not
  exceed WP-010 lock values.
- **Cross-site fallback chain unchanged.** Consumers of
  `brand-tokens.css` (play.*, cards.*) continue to see the same
  font-family declarations and the same fallback chain. Their
  rendering of `--la-font-*` is independent of www's font
  loading; they can each adopt `display=optional` in their own
  WPs if they choose.

## Definition of Done

- [ ] `extend_head.html` line 30 URL contains `&display=optional`
      (not `&display=swap`)
- [ ] Comment block at lines 20-30 updated to record the WP-011
      rationale (`display=optional` over `display=swap` to
      eliminate font-swap CLS)
- [ ] `git diff assets/css/extended/custom.css` is empty (WP-010
      §8 mobile-wrap fix preserved)
- [ ] `git diff static/brand-tokens.css` is empty (no
      cross-site contract change)
- [ ] `git diff layouts/_partials/header.html` is empty
- [ ] `git diff layouts/_partials/footer.html` is empty
- [ ] `git diff hugo.toml` is empty
- [ ] Submodule clean (`git submodule status` shows no `+`)
- [ ] Google Fonts CSS request in DevTools Network panel
      contains `&display=optional` in the URL
- [ ] On a Slow 3G throttled reload, text renders with system-ui
      fallback and never swaps to web fonts mid-session
- [ ] DevTools console zero errors / page errors / failed network
      requests on home, `/about/`, `/posts/`, and one post
- [ ] Lighthouse ≥ pre-baseline (WP-010 lock) AND ≥ 90 on all
      four categories on home + posts + about + post
- [ ] CLS on every measured page is at or below the WP-010 lock
      value (home ≤ 0.046, posts ≤ 0.005, about ≤ 0.000,
      post ≤ 0.004)
- [ ] Mechanical reproducibility check: two consecutive
      `npm run build` produce byte-identical `public/`
- [ ] `docs/03-ROADMAP.md` updated with WP-011 row +
      detail section + commit hashes + Lighthouse scores
- [ ] `docs/01-VISION.md` Decisions log entry added
- [ ] All commits on `origin/main`

## Failure conditions (explicit)

- The Google Fonts URL in `extend_head.html` line 30 contains
  `&display=swap` or any value other than `&display=optional`
  in the final committed state
- Lighthouse Performance, Accessibility, Best Practices, or SEO
  drops below 90 on any page, OR drops below the WP-010 lock
  baseline on home / posts / about / post
- CLS on any page exceeds the WP-010 lock value (font-swap
  elimination should reduce CLS, not introduce new shift)
- Mechanical reproducibility check shows any diff between two
  consecutive `public/` builds
- PaperMod submodule shows `+`
- `static/brand-tokens.css` shows any diff (would be a
  WP-002 v1→v2 contract bump out of WP-011 scope)
- `assets/css/extended/custom.css` shows any diff (would
  inadvertently touch the WP-010 mobile-wrap fix)
- Web fonts fail to load entirely (the Google Fonts `<link>`
  was removed or the URL was mangled — fast users should still
  see Bebas Neue / Inter / JetBrains Mono)

## What's NOT in scope

- **Self-hosting fonts.** Bringing the three font families into
  the repo (`static/fonts/*.woff2`), writing in-repo `@font-face`
  declarations, and removing the Google Fonts dependency
  entirely. That's a larger WP (`WP-012`-shaped) that adds new
  repo assets, a new CORS posture on `/fonts/*.woff2`, and —
  depending on whether play.* / cards.* should consume the same
  hosted fonts cross-origin — potentially a `brand-tokens.css`
  contract bump (v1 → v2 per WP-002 rules). Deferred until
  brand-fidelity-on-slow-loads becomes a real concern OR Google
  Fonts availability becomes a real risk.
- **`size-adjust` / `ascent-override` / `descent-override` /
  `line-gap-override` fallback metric matching.** These CSS
  Fonts Level 4 properties make the system-ui fallback render at
  identical metrics to the web font, eliminating *any* visual
  shift (not just CLS). Requires self-hosted fonts (the
  properties go in `@font-face` rules) — covered by the
  WP-012-shaped scope above.
- **Cross-site coordination of font loading.** Play.* and
  cards.* each manage their own font loading independently of
  www. If they want the same `display=optional` posture, that's
  a per-site WP. WP-011 only changes www.
- **Removing the WP-010 `custom.css §8` mobile-wrap fix.** Even
  with font-swap eliminated, the mobile-wrap fix is harmless
  (deterministic flex-wrap behavior is a UX improvement, not a
  workaround once the root cause is gone). Removing it would be
  a separate scope-creep edit and is not WP-011's job. If a
  future audit determines it's redundant, that's a future WP.
- **Preloading fonts via `<link rel="preload">`.** Would force
  fonts to load before the CSS arrives, potentially eliminating
  the ~100 ms `optional` timeout on more user connections. Adds
  network priority complexity (each font preload is a separate
  request); deferred unless `display=optional` proves insufficient
  in real-world telemetry.
- **A site-wide Lighthouse-on-CI gate.** Catching CLS / Perf
  regressions before merge would prevent the kind of discovery
  loop that surfaced this WP. Out of WP-011 scope; tracked as a
  future direction.

## Authority

Per `docs/01-VISION.md` Decisions log convention, in case of
conflict the authority chain is:

1. `docs/01-VISION.md` (vision + Global invariants + Decisions log)
2. `docs/03-ROADMAP.md` (WP catalogue + WP detail sections)
3. This WP file
4. Active session context

## Background

WP-010 (header + footer site navigation, locked 2026-05-10)
surfaced a font-swap CLS regression during its Step 4.6 Lighthouse
pass. First measurement: home Performance = 77, CLS = 0.344 — a
hard regression below the ≥ 90 floor AND below the WP-010
pre-baseline 92. Diagnosis (recorded in detail in the WP-010
roadmap detail section + `01-VISION.md` 2026-05-10 Decisions log
entry):

1. Lighthouse `layout-shifts` audit attributed the entire 0.344
   to `<main class="main">` — the whole `<main>` was moving
   down after first paint.
2. Bisection isolated the cause to the WP-010 `[[menu.main]]`
   additions in `hugo.toml` alone (removing the WP-010 CSS, or
   removing the WP-010 footer override, did not eliminate the
   CLS).
3. Root cause: `extend_head.html` loads Google Fonts (Bebas Neue,
   Inter, JetBrains Mono) with `display=swap`. WP-010's new
   header menu items render in Inter; the Inter swap pushes
   (logo + menu) combined width across `.header-nav`'s
   `flex-wrap` boundary on narrow viewports, dropping the menu
   to its own flex-line ONLY after the font loads. That adds
   one row of header height post-paint, which shifts `<main>`.

WP-010 fixed the symptom in `custom.css §8` (forcing
deterministic flex-wrap on mobile so the row count is invariant
under font swap). That fix is surgical and works for the WP-010
surfaces, but it doesn't prevent the same class of bug from
recurring on **any future WP that adds text-rendering UI
elements in regions that affect `<main>` positioning**. WP-008
(SEO baseline) is the next candidate — Schema.org JSON-LD won't
cause this, but any visible heading or breadcrumb addition would.

WP-011 removes the underlying enabler. `display=optional`
guarantees no swap event by design: the browser commits to either
the web font (if loaded within ~100 ms) or the fallback (if not),
and never swaps after that commit point. Once `display=optional`
is in place, **font-swap CLS as a class of regression is gone
from the marketing site**. Every future chrome-touching WP gets
the budget back.

The WP-010 retrospective conversation (2026-05-10) named
"a `font-display` site-wide WP" as the highest-leverage
improvement; this WP is that follow-up.

## Roadmap sequencing

WP-011 is **parallel-safe** with WP-007a (Done), WP-007b
(Pending), WP-008 (Pending), and WP-010 (Done). No shared write
paths. WP-011's single edit is in `extend_head.html`, which is
outside every other Pending WP's allowlist.

WP-011 is **not** an upstream blocker for WP-009 (class-color
usage audit). Class-color tokens (`palette.md §4.4`) are
mode-stable and unrelated to font loading; WP-009's scope is
read-only on token usage.

**Recommended ordering:** run WP-011 before WP-008. WP-008 (SEO
baseline) will add Schema.org structured data and possibly visible
breadcrumb / meta-content surfaces. Landing `display=optional`
first removes the font-swap-CLS budget hazard from WP-008's
verification pass. Not strictly required (WP-008 can absorb the
WP-010 mitigation pattern if needed) — but cheaper to do once,
upstream of further chrome work.
