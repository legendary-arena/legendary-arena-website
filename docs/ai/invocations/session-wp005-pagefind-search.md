# Session Execution Prompt — WP-005 (Pagefind search integration)

**Target Work Packet:** WP-005
**Authorized by Pre-Flight:** 2026-05-08 (READY TO EXECUTE / Copilot CONFIRM after Issues 27 + 28 fixes applied)
**Repo:** `C:\www\legendary-arena-com\` — Hugo marketing site for `www.legendary-arena.com`
**Governance regime:** Light (per `docs/01-VISION.md` §Operational). No EC system; Vision + Roadmap + brand strategy + WP-005 are the binding authorities.

This prompt is a **transcription + ordering artifact** derived from
the pre-flight + copilot check at
`docs/ai/invocations/preflight-wp005.md`. It introduces no new
scope, constraints, or interpretations beyond what is already locked
in the WP, brand docs, and pre-flight. If anything in this prompt
appears to add a constraint not present upstream, the upstream
document wins — surface the conflict and stop.

---

## Mission

Add static, fast, client-side search across the marketing site's
content (home, about, blog) via Pagefind. Establish the
single-command, deterministic build pipeline that WP-006 will adopt
verbatim for Cloudflare Pages. Lock WP-005 with verified Lighthouse
scores, a passing reproducibility check, and a passing
card-name-exclusion check.

This is **build-tooling integration + UI wiring + verification**.
No engine, no runtime backend, no database. Hugo + Pagefind + a
small partial + a small inline keyboard-shortcut script.

---

## Read Order (Mandatory, In Sequence)

Do not install or wire anything until all of these are loaded:

1. `docs/01-VISION.md` — Global invariants. Authoritative. Note
   especially:
   - **Deterministic deploys:** same commit → same output, single
     documented command matching CI
   - **Performance + accessibility floor:** Lighthouse ≥ 90 in
     P/A/BP/SEO; no console errors
   - **Brand tokens are an API contract**
   - **No direct modification of third-party dependencies**
2. `docs/03-ROADMAP.md § WP-005` — design source of truth (Goal,
   Deliverables, Build reproducibility, Constraints, DoD, Exit
   criteria, Failure conditions). If this prompt or the WP execution
   pack disagrees with the roadmap, the roadmap wins.
3. `docs/ai/work-packets/WP-005-pagefind-search.md` — execution
   pack. Subordinate to roadmap on conflict. Read end-to-end —
   especially the explicit Failure conditions section.
4. `docs/ai/invocations/preflight-wp005.md` — pre-flight + copilot
   record. Locked decisions in this prompt come from there.
5. `docs/04-CONTENT-CONVENTIONS.md` — front-matter and content
   rules. Step 7 of this WP extends this doc.
6. `docs/brand/strategy.md` § 2, § 5, § 10 — voice, layout patterns,
   failure modes. Binding for any user-facing copy in the search UI
   (placeholder text, empty-state copy, result-count labels).
7. `docs/brand/palette.md` and `assets/css/extended/custom.css` § 5 —
   utility classes already styled. Search input border, focus ring,
   results panel, and result links must route through `var(--la-*)`.
   No raw hex.
8. `themes/PaperMod/layouts/_partials/header.html` and
   `themes/PaperMod/layouts/_default/search.html` — read before
   wiring the header (Step 4) and disabling PaperMod's built-in
   search (Step 3).
9. <https://pagefind.app/docs/> — Quick-start, Indexing, UI sections.
   Note `data-pagefind-body` and `data-pagefind-ignore`.
10. `.gitignore` — confirm `node_modules/` and `public/` are ignored
    before any `npm install` or build.

Do **not** read prior session transcripts. The committed artifacts
are the truth.

---

## Locked Decisions From Pre-Flight (2026-05-08)

These are settled. Do not revisit:

- **Step 1 hard gate.** Step 2 may not begin until: (a) install
  vehicle (npm vs binary) is chosen, (b) the supporting file(s) for
  that vehicle exist (even empty: `package.json` for npm, fetch
  script for binary), and (c) the choice is recorded in
  `docs/04-CONTENT-CONVENTIONS.md` under a "Build pipeline" section.
  Wiring the UI before this gate is a WP-005 failure.
- **Exact-version pinning.** Pin `pagefind` to an exact version
  (e.g., `"1.0.4"`) — no `^`, no `~`. Commit `package-lock.json`.
  The illustrative version in the WP is illustrative only; pin to
  whichever exact version is current at execution time.
- **`npx pagefind`, not bare `pagefind`.** Build script invokes the
  locally-installed binary regardless of `PATH` state.
- **`&&` failure semantics.** Pagefind runs strictly after Hugo. If
  Hugo fails, Pagefind must not run. If Pagefind fails, the overall
  process exits non-zero.
- **Pagefind output must be deterministic.** `public/pagefind/`
  byte-identical across repeated builds from the same commit. If a
  version introduces non-determinism that cannot be resolved by
  configuration, downgrade to the most recent deterministic version
  and pin to it.
- **Pagefind version bumps are governed work.** Any version bump is
  a separate WP — not a casual `npm update`. The upgrade WP must
  re-run the mechanical reproducibility check and re-verify
  Lighthouse ≥ 90 before locking.
- **Canonical mount ID is `la-search`.** Use `<div id="la-search"></div>`
  in the header partial as the single mount element. All JS targets
  this exact ID. Do not introduce aliases (`#search`,
  `#site-search`, `#pf-search`, etc.).
- **Replace, do not co-exist.** PaperMod's built-in Fuse.js search
  is removed or stubbed. Two search affordances on one site = WP-005
  failure. Disable by removing
  `outputs = ["HTML", "RSS", "JSON"]` from `hugo.toml` (and any
  `content/search.md`), **or** by overriding
  `layouts/_default/search.html` with an empty/redirect stub.
- **`defer` or dynamic-inject is mandatory.** Pagefind UI script
  must not block HTML parsing and must not appear as a
  render-blocking resource in DevTools.
- **Production build serves on `localhost:1314` for verification.**
  Matches WP-004's lock-pass methodology so Lighthouse scores are
  comparable. `python -m http.server 1314` from `public/`.
- **Mechanical reproducibility check.** Two consecutive
  `npm run build` runs; SHA-256 hashes sorted by path; PowerShell
  `Compare-Object` over the two hash listings must return empty.
  Any diff = failure condition.
- **Lighthouse artifact policy.** Run with named outputs
  (`lighthouse-home-wp005.json`, `lighthouse-post-wp005.json`);
  these are local-only — do not commit. Capture the four scores per
  page in the WP-005 lock entry in `03-ROADMAP.md`, format matching
  WP-004's record.
- **Index-scope invariant.** Searching a card name unlikely to
  appear in marketing copy (e.g., "Iron Fist", "Doctor Strange")
  must return zero results. If theme defaults make scope ambiguous,
  enforce structurally with `data-pagefind-body` /
  `data-pagefind-ignore`.
- **Reproducibility / build1.txt / build2.txt artifacts are
  local-only.** Do not commit.

---

## Scope Lock

### Allowed file targets

- `package.json` (new, root) — Node manifest with exact-pinned
  Pagefind devDependency + `build` script
- `package-lock.json` (new, root) — committed lockfile
- `assets/css/extended/custom.css` (modify) — search-UI brand
  styling using `var(--la-*)` only
- `layouts/_partials/extend_head.html` (modify) — keyboard shortcut
  inline script and/or Pagefind UI script load
- `layouts/_partials/<search>.html` (new — name your call,
  recommend `search.html`) — header search partial that mounts
  `<div id="la-search"></div>`
- `layouts/_partials/header.html` (new override) — only if needed
  to insert the search-mount slot; PaperMod's source must remain
  untouched
- `layouts/_default/search.html` (new stub) — disables PaperMod's
  `/search/` page if approach chosen in Step 3 is the override path
- `hugo.toml` (modify) — only to remove `outputs = ["HTML", "RSS",
  "JSON"]` if PaperMod search is disabled by config rather than
  override
- `content/search.md` (delete) — if it exists and PaperMod search
  is disabled by removing the JSON output
- `README.md` (modify) — Prerequisites, Build, Local dev,
  Reproducibility, CI parity sections
- `docs/04-CONTENT-CONVENTIONS.md` (modify) — Build pipeline,
  Search-UI decision, Keyboard shortcut policy sections
- `docs/01-VISION.md` (Decisions log entry only) — at lock time
- `docs/03-ROADMAP.md` (lock entry only) — at lock time
- `.gitignore` (modify) — only if `node_modules/` is not already
  excluded

### Forbidden

- `themes/PaperMod/**` — submodule must stay clean
  (`git submodule status` shows no `+`)
- `docs/brand/{strategy,palette,typography,spacing}.md` — values
  locked
- `static/brand-tokens.css` — token values locked
- `docs/brand/CHANGELOG.md` — no token additions in this WP
- Raw color / font / spacing literals in any CSS or JS — use
  `var(--la-*)` always
- Any new brand token (would require `CHANGELOG.md` entry; only on
  a real contract violation)
- Other search providers (Algolia, Elasticsearch, MeiliSearch,
  Lunr, Fuse.js as the canonical) — Pagefind only
- Server-side search of any kind
- Card-data indexing — registry's job at `cards.barefootbetters.com`
- Any keybinding library — vanilla JS only
- Any new top-level dependency beyond Pagefind — if a real need
  surfaces, raise it as a question first
- Range operators on the Pagefind version (`^`, `~`) — exact pin only
- Bare `pagefind` invocation — use `npx pagefind`
- Modifying WP-002/003/004 deliverables in a way that regresses
  their lock state
- Two visible search affordances anywhere on the site

**Rule:** anything not explicitly allowed is out of scope.

---

## Steps (Execute In Order)

### Step 1 — Decide install vehicle (then commit the scaffold)

Two options:

- **(A) npm — recommended.** `pagefind` in `devDependencies`,
  invoked via `npx pagefind`. Lockfile pins the version; `npm ci`
  gives byte-stable installs in CI; one-line Cloudflare Pages
  config in WP-006.
- **(B) Binary download.** Only with strong reason. Document the
  fetch step in `README.md` with a checksum.

**Gate:** create the supporting file(s) (even as empty scaffolds)
and record the choice in `docs/04-CONTENT-CONVENTIONS.md` under a
new "Build pipeline" section before Step 2.

### Step 2 — Create the build script

For the npm route, `package.json` shape:

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

Pin exactly. Commit `package-lock.json`. Then verify the contract
from a clean state:

```powershell
git clean -fdx
npm ci
npm run build
```

The build must succeed. `public/pagefind/` must contain
`pagefind.js`, the UI assets, and indexed shards. If
`public/pagefind/` is missing, the script is broken — fix before
moving on.

### Step 3 — Decide UI approach + remove PaperMod's built-in search

UI options:

- **(A) Pagefind's default UI** (`pagefind-ui.js` +
  `pagefind-ui.css`) with brand-token override CSS in
  `assets/css/extended/`. **Recommended.**
- **(B) Hand-rolled UI calling the JS API directly.** Only if (A)
  cannot be brand-conformed via CSS overrides.

PaperMod's built-in Fuse.js search must not co-exist. Disable by
**either**:

- Removing `outputs = ["HTML", "RSS", "JSON"]` from `hugo.toml`
  (and any `content/search.md`), **or**
- Overriding `layouts/_default/search.html` with an empty/redirect
  stub.

Document the chosen path in `docs/04-CONTENT-CONVENTIONS.md`.

### Step 4 — Wire the search UI into the header

- Use canonical mount: `<div id="la-search"></div>` in the header
  partial. JS must target this exact ID.
- Add a sibling partial in this repo's `layouts/_partials/`
  (recommend `search.html`); do not edit `themes/PaperMod/`.
- Search input + results panel must respect both light and dark
  modes via brand tokens.
- Results panel must not block header navigation on mobile
  (375 × 667). Position as overlay or push-down panel; verify by
  hand at the mobile viewport.
- Pagefind UI script loads with `defer` (or is dynamically injected
  after initial render). Must not appear as a blocking script in
  `<head>`.

DevTools verification after the build:

- No render-blocking script from Pagefind (the `defer` / async
  attribute or dynamic injection observable on the script tag)
- No CLS contribution when the search UI mounts

### Step 5 — Keyboard shortcuts

Bind:

- `/` — focus the search input (preserves PaperMod's prior muscle
  memory)
- `Ctrl+K` (Windows/Linux) and `Cmd+K` (macOS) — focus the search
  input

Implementation:

- Add the listener in a small inline `<script>` in
  `layouts/_partials/extend_head.html` or a dedicated partial —
  keep it in one place
- Bail when typing in another input:
  `event.target.matches('input, textarea, [contenteditable]')`
- `event.preventDefault()` on the focus path so `/` doesn't insert
  a literal slash on race conditions
- Repeated keypress is a no-op (no remount, no toggle, no reset)
- If the search input is already focused, repeat presses are a no-op
- Vanilla JS only — no keybinding library

### Step 6 — Enforce + verify the index scope

If theme defaults make scope ambiguous (header / nav / footer
bleeding into results, boilerplate ranking above content), enforce
structurally:

- `data-pagefind-body` on the main content container
- `data-pagefind-ignore` on nav, header, footer, or any region that
  must never appear in results

Verifications (manual; document outcomes in the lock entry):

- Search a phrase from the home hero (e.g., "arena awaits") →
  match → links to `/`
- Search a phrase from the about page → match → links to `/about/`
- Search a phrase from the launch announcement post → match →
  links to the post URL
- Search a card name unlikely to appear in marketing copy (e.g.,
  "Iron Fist", "Doctor Strange") → **zero results**
- `public/pagefind/` shards exist; total size is reasonable (well
  under 1 MB at current content volume)

### Step 7 — README + conventions docs

Update `README.md` with at minimum:

- **Prerequisites** — Hugo Extended (specific version) + Node.js
  (specific major) + npm
- **Build** — `npm ci && npm run build`
- **Local dev** — `hugo server --port 1313 --bind 127.0.0.1` (no
  Pagefind in dev; search is a build-time artifact)
- **Reproducibility** — same commit + `npm ci && npm run build`
  yields byte-identical `public/`
- **CI parity** — Cloudflare Pages (WP-006) must run the exact
  same command: `npm ci && npm run build`. No additional build
  steps permitted.

Update `docs/04-CONTENT-CONVENTIONS.md` with:

- Build pipeline section (Step 1 decision + the single-command
  contract)
- Search-UI decision (Step 3) + PaperMod-search disposition
- Keyboard shortcut policy (Step 5)

Decisions-log entries (`docs/01-VISION.md`) belong in Step 9, not
here.

### Step 8 — Verify

1. **Build from clean state.**
   ```powershell
   git clean -fdx
   npm ci
   npm run build
   ```
   Must succeed; `public/pagefind/` must exist.

2. **Serve the production build locally.**
   ```powershell
   cd public
   python -m http.server 1314
   ```

3. **Functional check** at `http://localhost:1314/`:
   - Search input visible in header, both modes, both viewports
     (1280 × 800 and 375 × 667)
   - `/` focuses the input from anywhere on the page
   - `Ctrl+K` (or `Cmd+K`) focuses the input
   - Typing "arena" returns at least one result within ~100 ms
   - Result links navigate correctly
   - Searching a card name returns zero results

4. **Visual check** — search input border, focus ring, and results
   panel use brand tokens (DevTools: computed `color`,
   `background-color`, `border-color` resolve to `--la-*` values).
   Both light and dark mode look intentional.

5. **Lighthouse** — against the production build at
   `localhost:1314`:
   ```powershell
   npx lighthouse@12 http://localhost:1314/ `
     --output=json --output-path=lighthouse-home-wp005.json `
     --chrome-flags="--headless --no-sandbox --disable-gpu" `
     --only-categories=performance,accessibility,best-practices,seo `
     --quiet
   npx lighthouse@12 http://localhost:1314/posts/2026-05-07-launch-announcement/ `
     --output=json --output-path=lighthouse-post-wp005.json `
     --chrome-flags="--headless --no-sandbox --disable-gpu" `
     --only-categories=performance,accessibility,best-practices,seo `
     --quiet
   ```
   All four categories ≥ 90 on each page. JSON artifacts are
   local-only — do not commit.

6. **Console clean** — DevTools on home + post + after running a
   search. Zero errors, zero page-errors, zero failed network
   requests.

7. **Reproducibility (mechanical, strict).**
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
   `Compare-Object` result must be empty. Any diff = failure.
   `build1.txt` / `build2.txt` are local-only — do not commit.

8. **Submodule** — `git submodule status` shows
   `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926 themes/PaperMod (heads/master)`
   with no `+` flag.

Capture the four Lighthouse scores per page. They go into the lock
entry in Step 9.

### Step 9 — Lock WP-005

When all DoD + exit criteria + Failure-condition checks pass:

1. Update `docs/03-ROADMAP.md` § WP-005:
   - ⏸️ → ✅ Done
   - Tick all DoD + exit criteria boxes
   - Record final commit hash(es) under `**Commits:**`
   - Record the four Lighthouse scores (Performance / Accessibility /
     Best Practices / SEO) for home + blog post, format matching
     WP-004's record.
2. Add a Decisions log entry to `docs/01-VISION.md` recording:
   - Install vehicle (Step 1)
   - UI approach + PaperMod-search disposition (Step 3)
   - Keyboard shortcut policy (Step 5)
   - The exact-pinned Pagefind version
3. Commit at logical milestones throughout; push to `origin/main`.

---

## Definition of Done (from WP-005)

- [ ] Install vehicle decided (npm vs binary) and recorded in
  `docs/04-CONTENT-CONVENTIONS.md`
- [ ] `package.json` (or binary fetch script) committed; lockfile
  committed for the npm route
- [ ] `npm run build` (or binary equivalent) builds Hugo + Pagefind
  in one command; exits non-zero on failure
- [ ] Search input visible in the site header on desktop AND mobile
  in both modes
- [ ] `/` and `Ctrl+K` / `Cmd+K` focus the search input from
  anywhere on the page (not when typing in another input)
- [ ] PaperMod's built-in Fuse.js search disabled or removed (no
  duplicate search affordance)
- [ ] Typing produces relevant matches across home, about, and blog
  content
- [ ] Searching a card name returns zero results (verified
  exclusion)
- [ ] `README.md` documents the single build command + prerequisites
  + CI parity
- [ ] `docs/04-CONTENT-CONVENTIONS.md` updated with build pipeline,
  search-UI, and keyboard-shortcut sections
- [ ] Lighthouse ≥ 90 maintained on home + blog post (Performance,
  Accessibility, Best Practices, SEO)
- [ ] No console errors when served (production build)
- [ ] Reproducibility verified: two consecutive `npm run build`
  runs produce byte-identical `public/` per `Compare-Object`
- [ ] Submodule clean
- [ ] All commits pushed to `origin/main`
- [ ] WP-005 marked ✅ Done in `03-ROADMAP.md` with hashes + scores
- [ ] Structural choices logged in `01-VISION.md` Decisions log

---

## Failure Conditions (Bright Lines — Per WP-005 Explicit List)

Any of these in shipped output = WP-005 not done, regardless of
other DoD criteria:

- `public/pagefind/` output differs across two consecutive
  identical builds (`Compare-Object` non-empty)
- `public/pagefind/` directory missing or incomplete after a
  successful `npm run build`
- More than one search UI affordance visible anywhere on the site
- Any Pagefind asset blocks initial render (no `defer`/async on the
  script tag, or render-blocking in DevTools)
- Search index contains unintended content (header, nav, footer,
  metadata, or any region marked for exclusion in Step 6)
- Searching a card name returns any result (card-data exclusion
  failed)
- Lighthouse Performance drops below 90 on either home or post
  (production build)
- Build is non-deterministic (different output on identical input)
- Multiple commands required to build the site (single-command
  contract violated)

---

## Final Instruction

Execute the steps in order. Stop at any step that produces a result
you cannot reconcile with the WP, the brand strategy, the
pre-flight, or this prompt — and ask a human before proceeding. Do
not silently work around a constraint.

When all DoD + Failure-condition checks pass, commit, push, and
post the four-line summary:

`WP-005 locked. Lighthouse home: P/A/BP/SEO. Lighthouse post: P/A/BP/SEO. Install: A|B. UI: A|B. Pagefind pin: <version>. Commits: <hashes>.`
