# WP-005 — Pagefind search integration

Add static, fast, client-side search across the marketing site's content
(home, about, blog). Establish the single-command, reproducible build
pipeline that WP-006 will adopt verbatim for Cloudflare Pages.

This file is the **session-ready execution pack**. The design source of
truth is [`docs/03-ROADMAP.md` § WP-005](../../03-ROADMAP.md). If this
file and the roadmap conflict, the roadmap wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme as a Git submodule. Brand
tokens consumed by `play.*` and `cards.*` via cross-origin link.

## Required reading (in order)

Before installing or wiring anything, read these — they set the bar:

1. `docs/01-VISION.md` — vision, Global invariants, Decisions log.
   Authoritative. Note the **deterministic-deploy** invariant: same
   commit → same output, reproducible locally via a single documented
   command that matches what CI runs.
2. `docs/03-ROADMAP.md` — full WP list. Read **WP-005** in detail
   (Goal, Deliverables, Build reproducibility, Constraints, DoD, Exit
   criteria, Failure conditions). WP-004 is ✅ Done; WP-006
   (Cloudflare deploy) consumes this WP's `npm run build` command
   verbatim, so the contract you set here travels.
3. `docs/04-CONTENT-CONVENTIONS.md` — front-matter rules, content
   layout. The Pagefind index will reflect what this doc says is
   indexable: home, about, posts. Card data is **not** in this repo
   and is explicitly excluded from this index (registry's job).
4. `docs/brand/strategy.md` § 2 (Voice and tone) and § 5 (Layout
   patterns) — the search UI is brand surface. Iconography, label
   text ("Search"), and any empty-state copy must pass `§ 10` brand
   failure modes. CTA contract (§ 2) does not apply to the search
   input itself, but applies to any button-styled affordance you add.
5. `docs/brand/palette.md` and `assets/css/extended/custom.css` § 5 —
   utility classes already styled. The search input border, focus
   ring, results panel background, and result-link colors must route
   through `var(--la-*)` tokens. No raw hex.
6. `themes/PaperMod/layouts/_partials/header.html` — current header
   markup. Read this before deciding where the search trigger lives
   (see Step 4). PaperMod ships its own Fuse.js-based search at
   `/search/` (driven by `themes/PaperMod/layouts/_default/search.html`
   plus `assets/js/fastsearch.js`); WP-005 replaces it — see Step 3.
7. <https://pagefind.app/docs/> — Pagefind's official docs. Quick-start
   + Indexing + UI sections are the relevant ones. Note especially the
   `data-pagefind-body` and `data-pagefind-ignore` attributes for
   index-scope control.
8. `.gitignore` — confirm `node_modules/` and `public/` are ignored
   before running `npm install` or any build.

Don't read prior session transcripts; the committed artifacts are the
truth.

## Current state

What works (locked under WP-002 + WP-003 + WP-004, verified 2026-05-08):

- Brand tokens load and resolve in both modes
- Hugo dev server builds clean, no console errors
- Real content authored: home, about, one blog post — enough text to
  make a search index meaningful
- `archetypes/posts.md` produces well-stubbed posts via `hugo new`
- `docs/04-CONTENT-CONVENTIONS.md` documents front-matter discipline
- `layouts/index.html` overrides PaperMod's home-page renderer
  (approach A from WP-004)
- Submodule clean

What's pending — **your job**:

- ❌ Install vehicle decided (npm vs binary) — see Step 1
- ❌ `package.json` + `package-lock.json` (npm route) committed
- ❌ `npm run build` script that runs `hugo --minify && pagefind --site public`
- ❌ Search UI partial integrated with the site header
- ❌ Keyboard shortcuts: `/` and `Ctrl+K` / `Cmd+K` focus the search
- ❌ PaperMod's built-in Fuse.js search either disabled or removed
- ❌ Index scope verified: home + about + posts indexed; nothing else
- ❌ `README.md` updated with the single build command
- ❌ Lighthouse re-verification (≥ 90 maintained on home + post)
- ❌ Reproducibility check: clean clone + `npm ci && npm run build`
  produces byte-identical `public/` output across runs

Note: there is currently no `package.json` in the repo. WP-005 is the
WP that introduces Node tooling. Pin the Pagefind major version in
`package.json` and commit `package-lock.json` so WP-006 (Cloudflare
Pages) can rely on `npm ci` for deterministic CI builds.

## Task

### Step 1 — Decide install vehicle, then commit the scaffold

Two options:

- **(A) npm — recommended.** Adds `pagefind` to `devDependencies`,
  invoked via `npx pagefind` from the `build` script. Pros: lockfile
  pins the version, `npm ci` gives byte-stable installs in CI, Hugo +
  Pagefind versions co-locate in the same `package.json`, future
  Cloudflare Pages config is one line (`npm run build`). Cons: adds
  `node_modules/` locally (already gitignored).
- **(B) Binary download.** Pros: no Node toolchain. Cons: version
  pinning lives in a separate doc/script; CI must be told where to
  fetch the binary; reproducibility relies on the binary URL not
  changing. Strong reason needed to pick this.

Recommend **(A)**. If choosing (B), document the binary fetch step in
`README.md` and include a checksum so reproducibility is verifiable.

**Gate.** Step 2 may not begin until: (a) the install vehicle is
chosen, (b) the supporting file(s) for that vehicle exist (even
empty: `package.json` for A, the fetch script for B), and (c) the
choice is recorded in `docs/04-CONTENT-CONVENTIONS.md` under a new
"Build pipeline" section (or equivalent — the location is your call,
but it must be discoverable). Wiring the UI before this gate is a
WP-005 failure — it produces orphaned work if the build choice
changes.

### Step 2 — Create the build script

The single-command contract is **the** load-bearing deliverable of
WP-005 (WP-006 inherits it). The command must:

- Invoke Hugo with the same flags CI will use (`--minify` at minimum;
  match WP-004's production build that produced the locked Lighthouse
  numbers)
- Invoke Pagefind against `public/` after Hugo finishes
- Exit non-zero if either step fails
- Be idempotent: running it twice in a row produces the same
  `public/` tree

For the npm route, `package.json` should look roughly like:

```json
{
  "name": "legendary-arena-com",
  "private": true,
  "scripts": {
    "build": "hugo --minify && npx pagefind --site public"
  },
  "devDependencies": {
    "pagefind": "1.0.4"
  }
}
```

Pin `pagefind` to an **exact** version (no range operator). Do **not**
use `^` or `~`. Rationale:

- Ensures byte-stable installs across environments
- Prevents silent minor upgrades from altering index output
- Required for the reproducible Cloudflare Pages builds WP-006
  inherits

The example version above is illustrative — pin to whichever exact
Pagefind version is current at execution time. Commit
`package-lock.json`.

The build script's `&&` operator gives the ordering and failure
semantics WP-005 needs:

- Pagefind must execute strictly after Hugo completes
- If Hugo fails, Pagefind must not run (`&&` short-circuits)
- If Pagefind fails, the overall process must exit non-zero
  (`&&` propagates the non-zero status)

Use `npx pagefind` (not bare `pagefind`) so the script resolves the
locally-installed binary regardless of `PATH` state.

Verify the contract by running `npm run build` from a clean clone:

```powershell
git clean -fdx
npm ci
npm run build
```

The build must succeed. The resulting `public/` must contain a
`pagefind/` subdirectory with `pagefind.js`, `pagefind.css` (or
`pagefind-ui.css`), and the indexed shards. If `pagefind/` is
missing, the script is broken — fix it before moving on.

### Step 3 — Decide the UI approach + remove PaperMod's built-in search

Two options for the search UI:

- **(A) Pagefind's default UI (`pagefind-ui.js` + `pagefind-ui.css`).**
  Drop-in. Brand-token override via custom CSS in `assets/css/extended/`.
  Recommended — matches the "boring, obviously correct" preference.
- **(B) Hand-rolled UI calling Pagefind's JS API directly.** More
  control, more code. Only choose if (A) cannot be brand-conformed
  via CSS overrides.

Whichever is chosen, **PaperMod's built-in search must not co-exist**.
Two search affordances on one site is a usability failure. Disable it
by either:

- Removing `outputs = ["HTML", "RSS", "JSON"]` from `hugo.toml` (and
  any `content/search.md`) so the `/search/` page no longer builds, **or**
- Overriding `layouts/_default/search.html` with an empty/redirect
  stub.

Either is fine; document the choice in `04-CONTENT-CONVENTIONS.md`.

### Step 4 — Wire the search UI into the header

The search input must be visible in the site header on desktop AND
mobile (DoD says "visible in site header"). PaperMod's header is
rendered by `themes/PaperMod/layouts/_partials/header.html`; the
canonical Hugo override path is to add a sibling partial in this
repo's `layouts/_partials/` and a small JS shim that mounts Pagefind's
UI into a header slot.

Constraints:

- No `themes/PaperMod/` source modifications (per WP-003 lock; verified
  via `git submodule status` showing no `+`).
- The search input and results panel must respect both light and dark
  mode, using brand tokens. No raw colors.
- The results panel must not block the header navigation underneath
  it on mobile (375 × 667). Position it as an overlay or push-down
  panel; verify by hand at the mobile viewport.
- Pagefind's UI script must load with `defer` (or be dynamically
  injected after initial render). It must **not** block HTML parsing
  and must not appear as a blocking script in `<head>`.
- Lighthouse Performance ≥ 90 is a hard floor.

**Canonical mount point.** Use the canonical id `la-search`
(`<div id="la-search"></div>` in the header partial) as the single
mount element for the search UI. All JS must target this exact ID;
do not introduce aliases or alternate IDs (`#search`, `#site-search`,
`#pf-search`, etc.). Do not rely on implicit DOM structure or
sibling-selector chains. Locking the element name makes future
overrides safe.

**Performance verification.** In DevTools after the build:

- No blocking script in `<head>` originating from Pagefind (the
  `defer`/async attribute or dynamic injection must be observable on
  the script tag)
- No layout shift introduced when the search UI mounts (CLS
  contribution from the search row should be ~0)

### Step 5 — Keyboard shortcuts

Bind:

- `/` — focus the search input (matches PaperMod's prior behavior, so
  muscle memory survives the swap)
- `Ctrl+K` (Windows/Linux) and `Cmd+K` (macOS) — focus the search
  input

Implementation discipline:

- Add the listener in a small inline `<script>` in
  `layouts/_partials/extend_head.html` or a dedicated partial — keep
  it in one place
- Don't trap keystrokes when the user is already typing in an input
  (`event.target.matches('input, textarea, [contenteditable]')` →
  bail)
- `event.preventDefault()` on the focus path so `/` doesn't insert a
  literal slash if focus race-conditions with another input
- Repeated keypress must not remount or duplicate the UI — focusing
  an already-mounted input is a no-op, not a re-init
- If the search input is already focused (results panel open),
  pressing the shortcut again is a no-op; do not toggle, close, or
  reset state on repeat presses
- No external dependency just for keybindings — vanilla JS

### Step 6 — Enforce + verify the index scope

If theme defaults make the index scope ambiguous (e.g., header / nav
/ footer text bleeding into results, or boilerplate copy ranking
above content), explicitly constrain the scope:

- Add `data-pagefind-body` on the main content container so Pagefind
  indexes only that subtree
- Add `data-pagefind-ignore` on nav, header, footer, or any other
  non-content region that should never appear in results

Do not rely solely on theme defaults if scope drifts. The index
contract is "home + about + posts content, nothing else" — make that
structural, not incidental.

Pagefind by default indexes the contents of the page's `<main>` (or
the element marked `data-pagefind-body`). For www, that means home,
about, and posts get indexed — exactly what we want.

Verifications (manual; document outcomes in the lock entry):

- Search a known phrase from the home hero (e.g., "arena awaits") →
  match returned, links to `/`
- Search a known phrase from the about page → match returned, links
  to `/about/`
- Search a phrase from the launch announcement post → match returned,
  links to the post URL
- Search a card name unlikely to appear in marketing copy
  (e.g., "Iron Fist", "Doctor Strange") → **zero results**
  (proves card data is not in the index — exclusion is structural,
  but verify it)
- Open `public/pagefind/` and confirm the index shards exist; their
  total size is reasonable (well under 1 MB for the current content
  volume)

### Step 7 — README + conventions docs

- Update `README.md` with the single build command. Sections to
  add or update at minimum:
  - **Prerequisites** — Hugo Extended (specific version) + Node.js
    (specific major) + npm
  - **Build** — `npm ci && npm run build`
  - **Local dev** — `hugo server --port 1313 --bind 127.0.0.1` (no
    Pagefind in dev; search is a build-time artifact)
  - **Reproducibility** — same commit + `npm ci && npm run build`
    yields byte-identical `public/`
  - **CI parity** — Cloudflare Pages (WP-006) must run the exact
    same command: `npm ci && npm run build`. No additional build
    steps are permitted in CI. Drift between local and CI is the
    failure mode this contract exists to prevent.
- Update `docs/04-CONTENT-CONVENTIONS.md` with:
  - Build pipeline section (Step 1 decision + the single-command
    contract)
  - Search-UI decision (Step 3) + PaperMod-search disposition
  - Keyboard shortcut policy (Step 5)
- If a structural choice was made that future contributors must know
  (e.g., chose (B) over (A) for install vehicle, or chose hand-rolled
  UI over default UI), add a Decisions log entry to
  `docs/01-VISION.md`.

### Step 8 — Verify

The verification approach proven in WP-003 + WP-004 is reusable.

1. **Build** — `npm ci && npm run build` from a clean clone (or after
   `git clean -fdx`). Must succeed; `public/pagefind/` must exist.
2. **Serve the production build locally** (matches the WP-004
   convention; dev-server numbers are not the lock numbers):
   ```powershell
   cd public
   python -m http.server 1314
   ```
3. **Functional check** — at `http://localhost:1314/`:
   - Search input visible in header in both modes, both viewports
     (1280 × 800 and 375 × 667)
   - `/` focuses the input from anywhere on the page
   - `Ctrl+K` focuses the input
   - Typing "arena" returns at least one result within ~100 ms
   - Result links navigate correctly
   - Searching a card name returns zero results
4. **Visual check** — search input border, focus ring, and results
   panel use brand tokens (verify in DevTools: computed `color` /
   `background-color` / `border-color` resolve to `--la-*` values).
   Both light and dark mode look intentional.
5. **Lighthouse** — re-run on home + at least one blog post against
   the **production build served from `localhost:1314`** (same
   convention as WP-004; dev-server numbers are noisy):
   ```powershell
   npx lighthouse@12 http://localhost:1314/ `
     --output=json --output-path=lighthouse-home-wp005.json `
     --chrome-flags="--headless --no-sandbox --disable-gpu" `
     --only-categories=performance,accessibility,best-practices,seo `
     --quiet
   ```
   All four categories must remain ≥ 90 on home and on the post.
   The raw JSON is local-only; don't commit (consistent with
   WP-003 / WP-004).
6. **Console clean** — open DevTools on home + post + after running a
   search. Zero errors, zero page errors, zero failed network
   requests (other than expected analytics-like noise, of which
   there should be none).
7. **Reproducibility (strict, mechanical check)** — run two
   consecutive builds and diff the SHA-256 hashes of every file in
   `public/`:

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

   The `Compare-Object` result must be empty. Any diff is a failure
   condition — investigate and resolve before locking. The
   `build1.txt` / `build2.txt` artifacts are local-only; don't
   commit them.
8. **Submodule clean** — `git submodule status` shows
   `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926 themes/PaperMod (heads/master)`
   with no `+` modification flag.

### Step 9 — Lock WP-005

When all DoD + exit criteria pass:

1. Update `docs/03-ROADMAP.md`:
   - WP-005: ⏸️ → ✅ Done
   - Tick all DoD + exit criteria boxes
   - Record final commit hash(es) under `**Commits:**`
   - Record the four Lighthouse scores (Performance / Accessibility /
     Best Practices / SEO) for home + blog post, matching the WP-004
     format
2. Add a Decisions log entry to `docs/01-VISION.md` recording the
   structural choices from Step 1 (install vehicle), Step 3 (UI
   approach + PaperMod-search disposition), and Step 5 (keyboard
   shortcut policy). Anything a future contributor would otherwise
   have to reverse-engineer.
3. Commit at logical milestones throughout the session, then push.

## Constraints

- **Brand artifacts are locked.** Do NOT modify
  `docs/brand/{strategy,palette,typography,spacing}.md` or
  `static/brand-tokens.css` token values. Search-UI styling rides on
  existing tokens. If a real brand-failure-mode issue surfaces and a
  token tweak is genuinely required, that's an additive change — log
  in `CHANGELOG.md` per the v1 rules. Don't change values silently.
- **No raw color/font/spacing values in CSS or JS.** Token-first
  contract still applies. Use `var(--la-*)` always.
- **Submodule must stay clean.** `git submodule status` shows no `+`.
  No edits under `themes/PaperMod/`.
- **Search runs entirely client-side.** No Algolia, no Elasticsearch,
  no server-side search. Pagefind's index ships in `public/pagefind/`
  and is fetched from the same origin as the page.
- **Card data is out of scope for the index.** Card data does not
  live in this repo (it lives in `cards.barefootbetters.com` /
  registry-viewer). The www index covers home + about + posts. If a
  future blog post mentions a card by name in body copy, that's fine
  — it's marketing content, not a card-data lookup.
- **Build is single-command and deterministic.** `npm run build`
  must produce byte-identical `public/` across runs from the same
  commit. Non-determinism (timestamps in HTML, randomized IDs, etc.)
  is a failure condition.
- **Pagefind output must be deterministic.** The contents of
  `public/pagefind/` must be byte-identical across repeated builds
  from the same commit. Any nondeterminism (timestamped metadata,
  unstable shard ordering, non-stable hashes) is a failure condition
  and must be resolved before WP-005 is locked. If a Pagefind
  version is found to introduce nondeterminism that cannot be
  resolved by configuration, downgrade to the most recent
  deterministic version and pin to it.
- **Pagefind version bumps are governed work, not silent updates.**
  Any change to the pinned Pagefind version is a separate WP — not
  a casual `npm update` or dependency bump. The upgrade WP must
  re-run the mechanical reproducibility check (Step 8.7) and
  re-verify Lighthouse ≥ 90 on home + post before locking. This
  prevents a future version from silently regressing index
  determinism, result ranking, or render-blocking behavior between
  WP-005's lock and Cloudflare Pages' next deploy under WP-006+.
- **Performance budget.** Lighthouse Performance must stay ≥ 90 on
  home and on the post. Pagefind's UI assets must load deferred /
  async; do not block the critical render path.
- **No new top-level dependencies beyond Pagefind.** A search
  framework, a CSS-in-JS lib, etc., are out of scope. If a real need
  surfaces, raise it as a question first.

## Definition of Done

- [ ] Install vehicle decided (npm vs binary) and recorded in
  `docs/04-CONTENT-CONVENTIONS.md`
- [ ] `package.json` (or binary fetch script) committed; lockfile
  committed for the npm route
- [ ] `npm run build` (or the binary equivalent) builds Hugo +
  Pagefind in one command, exits non-zero on failure
- [ ] Search input visible in the site header on desktop AND mobile
  in both modes
- [ ] `/` and `Ctrl+K` / `Cmd+K` focus the search input from anywhere
  on the page (not when typing in another input)
- [ ] PaperMod's built-in Fuse.js search disabled or removed (no
  duplicate search affordance)
- [ ] Typing produces relevant matches across home, about, and blog
  content
- [ ] Searching a card name returns zero results (verified
  exclusion)
- [ ] `README.md` documents the single build command + prerequisites
- [ ] `docs/04-CONTENT-CONVENTIONS.md` updated with build pipeline,
  search-UI, and keyboard-shortcut sections
- [ ] Lighthouse ≥ 90 maintained on home + blog post (Performance,
  Accessibility, Best Practices, SEO)
- [ ] No console errors when served (production build)
- [ ] Reproducibility verified: two consecutive `npm run build` runs
  produce byte-identical `public/`
- [ ] Submodule clean
- [ ] All commits pushed to `origin/main`
- [ ] WP-005 marked ✅ Done in `03-ROADMAP.md` with hashes
- [ ] Structural choices logged in `01-VISION.md` Decisions log

## Failure conditions (explicit)

WP-005 must NOT be locked if any of the following are true:

- `public/pagefind/` output differs across two consecutive
  identical builds (`Compare-Object` non-empty in Step 8.7)
- `public/pagefind/` directory is missing or incomplete after a
  successful `npm run build`
- More than one search UI affordance is visible anywhere on the
  site (PaperMod's built-in search not disabled)
- Any Pagefind asset blocks initial render (no `defer` / async on
  the script tag, or script appears as a render-blocking resource
  in DevTools)
- Search index contains unintended content (header, nav, footer,
  metadata, or any region marked for exclusion in Step 6)
- Searching a card name returns any result (card-data exclusion
  failed)
- Lighthouse Performance drops below 90 on either home or post
  (production build)
- Build is non-deterministic (different output on identical input)
- Multiple commands required to build the site (single-command
  contract violated)

A failure condition firing means WP-005 regresses to ⏸️ Pending
until the issue is resolved.

## What's NOT in scope

- WP-006 (Cloudflare Pages deploy + custom domain) — separate WP,
  separate session. WP-005 hands WP-006 a working `npm run build`;
  WP-006 binds it to CF Pages and adds DNS / HTTPS / CORS for
  `brand-tokens.css`.
- WP-007a (`play.legendary-arena.com`) and WP-007b (registry-viewer
  brand integration) — separate WPs.
- WP-008 (SEO baseline / Schema.org) — separate WP.
- WP-009 (class-color usage audit) — separate WP, spec draft pending
  review.
- Card-data search — explicitly out of scope; that's the registry
  viewer's job at `cards.barefootbetters.com`.
- Search analytics / query logging — out of scope. Pagefind runs
  client-side only; nothing is reported.
- Multilingual indexing — site is `en-us` only for v1.
- Real branded logo / favicons — deferred per `01-VISION.md`
  Decisions log; placeholders remain.
- Brand-token additions — would require a `CHANGELOG.md` entry; only
  needed if a real contract violation surfaces.

## Authority

Subordinate to `docs/01-VISION.md` (highest), then `03-ROADMAP.md`,
then this file. If anything here conflicts with vision or roadmap,
those win — surface the conflict before proceeding.

`docs/brand/strategy.md` is the canonical authority for voice, tone,
terminology, and CTA contract. Brand failure modes (`§ 10`) are
bright lines for any user-facing copy in the search UI (placeholder
text, empty-state copy, result-count labels, etc.).

## Background

WP-004 locked on 2026-05-08:

- Lighthouse home (production): 97 / 95 / 96 / 100
- Lighthouse post (production): 98 / 96 / 96 / 100
- All four CTA viewport+mode combinations PASS
- Console clean across all four combos
- Submodule clean

WP-005 is the first WP that introduces a build-time tooling
dependency (Node + Pagefind). The single-command contract it
establishes is **the** contract WP-006 inherits when wiring
Cloudflare Pages — same command, same input, same output. Drift
between local and CI builds is the failure mode that WP-005's
reproducibility check exists to catch before WP-006 is ever
reached.

The Hugo dev server config remains at `.claude/launch.json`
(`hugo-server` config on port 1313). Dev mode (`hugo server`) does
not include Pagefind by design. Search is only available in
production builds generated via `npm run build`. Future Claude
sessions can use `preview_start` if running from this repo's
working directory.
