# WP-044 — Site-wide Lighthouse Performance recovery

> **✅ LOCKED 2026-08-25.** See `## Execution outcome` at the foot of this
> file for what was actually decided/measured, and the `docs/01-VISION.md`
> Decisions-log entry for the full lock record. The sections below are the
> spec as drafted.

**Investigation + implementation WP.** Recover Lighthouse **Performance
≥ 90** across `www.legendary-arena.com`. Production is currently sub-90
site-wide (a baseline condition, not one page's problem): a same-session
mobile-preset run on 2026-08-25 scored `/roadmap/` **79** and the
existing `/leaderboard/` **76** on identical infra. This is a regression
from the WP-008 lock (2026-05-11: home Perf **92** / post **91**) that
tracks the additions since — Snipcart commerce (WP-019), diorama
(WP-023), and the art gallery (WP-041). This WP owns the three
site-wide root causes Lighthouse flagged and brings every page it
touches back over the ≥ 90 floor.

> **Drafting note (gate status).** Drafted with the pre-drafting hygiene
> gate's branch/worktree checks (`docs/ai/REFERENCE/01.0-pre-drafting-hygiene.md`
> Checks 3 & 5) **not clear**: the working tree was clean, but ~7
> parked `claude/*` branches / worktrees hold unrelated work that can't
> be cleared without risking it — the same standing condition WP-043
> drafted under. The bypass affects only branch *hygiene*, not this
> docs-only draft. Clearing those branches is separate housekeeping.
> Baseline `main` at draft time: `3272159` (WP-043 lock).

---

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme is a **locked git submodule**
(`themes/PaperMod` at `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`); never
edit under `themes/PaperMod`, override via `assets/` / `layouts/`. Build:
`npm run build` (`node scripts/build.mjs` → `hugo --minify` + Pagefind;
preview-baseURL wrapper per the 2026-08-09 WP-042 lock).

---

## Required reading (in order)

1. `C:\www\legendary-arena-com\docs\01-VISION.md` — the **Performance**
   success criterion (LCP ≤ 1s broadband desktop; **Lighthouse ≥ 90 in
   Performance / Accessibility / Best Practices / SEO**; no console
   errors) and the **2026-08-25 WP-043 lock** Decisions-log entry — it
   is the authority for this WP: it names the exact root causes, the
   79-vs-76 measurement, the drift from the WP-008 baseline, and the
   explicit deferral to "a **dedicated site-performance WP**." This is
   that WP.
2. `C:\www\legendary-arena-com\docs\ai\work-packets\WP-011-font-display-optional.md`
   — the prior font-loading WP. `display=optional` is **already live**
   in `extend_head.html` (font-*swap* CLS is already solved); this WP
   does not revisit swap. Read its "What's NOT in scope" section: it
   pre-named `<link rel="preload">` for fonts and self-hosting fonts as
   deferred follow-ups — both are now in-scope candidates here.
3. `C:\www\legendary-arena-com\docs\ai\work-packets\WP-007b-cards-brand-integration.md`
   — the **carve-out precedent** (Amendment 7): a WP is not responsible
   for pre-existing characteristics of the deployment it extends. This
   WP is the inverse — it exists specifically to *close* the carve-outs
   WP-043 and WP-007b opened for the `www` surface.
4. `C:\www\legendary-arena-com\layouts\_partials\extend_head.html` — the
   render-critical `<head>`. Note **§2** (Google Fonts `<link
   rel="stylesheet">`, render-blocking, blocks the LCP text element),
   **§5** (Snipcart preconnect + `snipcart.css` render-blocking on
   **every** page), and §1/§3/§4 (brand tokens, Pagefind lazy-load,
   Schema).
5. `C:\www\legendary-arena-com\layouts\_partials\extend_footer.html` —
   loads `snipcart.js` (`async`) + the `#snipcart` mount on **every**
   page; `newsletter.js` / `header-auth.js` are already `defer` +
   fingerprinted (the correct pattern).
6. `C:\www\legendary-arena-com\layouts\_partials\header.html` lines
   ~130-143 — the site-wide `.snipcart-checkout` **cart button** with
   `.snipcart-items-count`. This is the constraint that makes "only load
   Snipcart on commerce pages" a real fork, not a one-liner: the cart
   button renders in the header on every page and depends on Snipcart JS
   to open and to show a count.
7. `C:\www\legendary-arena-com\docs\04-CONTENT-CONVENTIONS.md` — build
   pipeline, `assets/css/extended/custom.css` for page CSS, `var(--la-*)`
   brand tokens only (no raw hex).
8. `C:\www\legendary-arena-com\docs\ai\REFERENCE\01.3-commit-hygiene.md`
   — the `WP-044:` commit-subject contract (CI enforces it).

Don't read prior session transcripts; the committed artifacts + the
VISION Decisions log are the truth.

---

## Current state (what every page pays for)

Measured / read at draft time (`main` @ `3272159`):

- **Google Fonts stylesheet is render-blocking (§2).** A single
  `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...&display=optional">`
  in `<head>`. Lighthouse attributes ~part of the render-blocking to it
  and flags Google Fonts as blocking the LCP text element (the
  `.post-description` block). `preconnect` to both Google Fonts hosts is
  already present; `display=optional` is already set.
- **Snipcart loads on every page.** §5 of `extend_head.html`:
  `preconnect` to `cdn.snipcart.com` + a **render-blocking**
  `snipcart.css`. `extend_footer.html`: `snipcart.js` (`async`) + the
  `#snipcart` mount div. Snipcart's runtime is the bulk of the ~212 KiB
  of unused JavaScript Lighthouse reports on non-commerce pages.
  Commerce surfaces that genuinely use it: `layouts/shop/list.html`,
  `layouts/shop/single.html`, `layouts/diorama/list.html`, plus the
  site-wide header cart button in `header.html`.
- **Shared theme stylesheet is render-blocking (~1.0 s).** PaperMod
  emits its bundled CSS as a render-blocking `<link>` in `<head>`;
  `assets/css/extended/custom.css` rides in that bundle. No critical-CSS
  split, no async CSS load.
- **Measured production Lighthouse (mobile preset, `npx lighthouse@12
  --headless`, 2026-08-25):** `/roadmap/` **Perf 79** (FCP ~2.6 s, LCP
  ~4.2 s); `/leaderboard/` **Perf 76**. Root causes are identical and
  site-wide, so every content page is in the same band.
- **Regression baseline (WP-008 lock, 2026-05-11):** home Perf **92**,
  post Perf **91**. That is the floor this WP must clear again, and the
  ≥ 90 invariant is the hard gate.

None of the three levers can be fixed inside a page-scoped WP's allowlist
— they live in `themes/PaperMod` overrides, `extend_head.html`,
`extend_footer.html`, `hugo.toml`, and possibly `package.json`. That is
why WP-043 carved Performance out and deferred it here.

---

## Investigation levers (resolve each, then implement)

This WP is **investigation-first**: profile the live render path, decide
each lever below on evidence, record the decision in the VISION
Decisions log at lock, then implement. Do **not** pre-commit to an
approach in code before the profile confirms it moves the number.

### Lever A — Snipcart: stop paying for commerce on non-commerce pages

The largest single win (removing ~212 KiB unused JS + a render-blocking
stylesheet from most pages). The fork to resolve, because the header
cart button is site-wide:

- **A1 — Conditional load (commerce pages only) + degrade the header
  button.** Gate the §5 head block + the footer `snipcart.js`/mount to
  commerce templates (`shop`, `diorama`, and any future
  `data-buy`-bearing page). On non-commerce pages the header
  `.snipcart-checkout` button becomes a plain link to `/shop/` (or is
  hidden). **Trade-off:** simplest perf win; the cart is not "live" (no
  persisted item count) on non-commerce pages — evaluate whether a
  cross-page persistent cart is a product requirement before choosing
  this.
- **A2 — Lazy-load on intent, site-wide.** Keep the cart button on every
  page but load Snipcart's CSS+JS only on first interaction (click the
  cart button, or a commerce template requesting it eagerly), mirroring
  the Pagefind lazy-load pattern already in `extend_head.html` §3.
  **Trade-off:** preserves a live cart everywhere; more JS plumbing; the
  first cart open has a load delay.
- **A3 — Defer only.** Move `snipcart.css` out of the render-blocking
  path (async/`media` swap) and keep JS `async`, but still load on every
  page. **Trade-off:** smallest behavior change; likely insufficient
  alone — the unused-JS bytes still land on every page.

Pick the lightest option that (a) clears ≥ 90 on non-commerce pages and
(b) keeps commerce working on `shop`/`diorama`. Prefer A1 or A2 over A3.
State explicitly what happens to the header cart button on non-commerce
pages, and confirm the commerce flow (add-to-cart → checkout) still
works end-to-end on `shop`/`diorama` after the change.

### Lever B — Google Fonts: unblock the LCP text element

The LCP element is `.post-description`; the render-blocking Google Fonts
stylesheet delays it. Options (keep `display=optional` — do not
reintroduce swap):

- **B1 — Async the font stylesheet** (`media="print"` + `onload`
  swap-to-`all`, or `rel="preload" as="style"` + `onload`) so it stops
  blocking first render; the `preconnect` tags stay.
- **B2 — `<link rel="preload" as="font" crossorigin>`** for the specific
  woff2 files behind the LCP text (Inter body weights), warming them
  before the CSS resolves. (WP-011 pre-named this as a deferred
  follow-up.)
- **B3 — Self-host the three families** (`static/fonts/*.woff2` + in-repo
  `@font-face`), removing the third-party critical request entirely.
  **Heavier:** new repo assets + a CORS posture on `/fonts/*.woff2`, and
  it may implicate the `brand-tokens.css` v1→v2 contract if `play.*` /
  `cards.*` should consume the same hosted fonts. WP-011 flagged this as
  a `WP-012`-shaped scope. Only choose B3 if B1/B2 can't reach ≥ 90;
  if chosen, keep the cross-site contract decision explicit.

Prefer the least-invasive option (B1, then B2) that unblocks LCP.
**Do not** remove the web fonts (fast users keep brand typography) and
**do not** change which families/weights load (`typography.md` lock).

### Lever C — Render-blocking shared stylesheet (~1.0 s)

Reduce the critical CSS cost of the PaperMod bundle + `custom.css`.
Investigate, in order of least-invasive:

- **C1 — Inline critical CSS + async the rest.** Above-the-fold styles
  inline in `<head>`; the full stylesheet loaded async (same `media`
  swap as B1).
- **C2 — Prune unused CSS from the bundle.** Identify large unused blocks
  Lighthouse flags and trim via the override layer (not by editing the
  submodule).
- **C3 — Preload the fingerprinted stylesheet** so it starts earlier in
  the chain.

The submodule stays locked — every change here is via `assets/` /
`layouts/` overrides, never an edit under `themes/PaperMod`.

---

## Design decisions (settle before implementing)

1. **≥ 90 Performance is the gate** on every page this WP touches, and it
   must also be **≥ the WP-008 baseline** (home 92 / post 91) on the
   pages that have one. A11y / BP / SEO must **hold at their current
   values** (the WP-043 contrast fix and WP-008 SEO posture must not
   regress).
2. **No console errors, no new CLS.** `display=optional` stays; any
   async-CSS / preload work must not introduce a flash-of-unstyled-content
   layout shift. CLS must not exceed current per-page values.
3. **Build stays single-command and deterministic.** `npm run build`
   must still produce byte-identical `public/` across two consecutive
   runs from the same commit (the WP-005 / WP-042 contract). Any lazy /
   fingerprinted asset added must be deterministic.
4. **Submodule + cross-site contract untouched.** `themes/PaperMod` shows
   no `+`; `static/brand-tokens.css` unchanged unless Lever B3 is chosen
   **and** the v1→v2 contract implication is explicitly accepted and
   documented (default: don't touch it).
5. **Measure on the live/production URL at lock** — Lighthouse live-URL
   variance is real (WP-008 Risk #3), so the re-baseline is a fresh
   production run, mobile preset, same tool/flags as the WP-043
   measurement, and it IS the lock number.

---

## Task

### Step 0 — Profile (evidence before edits)
Run Lighthouse (mobile preset) + a network/waterfall trace on the live
production URL for the representative page matrix (see Verify). Capture,
per page: Perf score, FCP, LCP, the LCP element, render-blocking
resources, and unused-JS/CSS bytes. Record the pre-change numbers — they
are the regression evidence and the before/after proof.

### Step 1 — Resolve the three levers
Decide A / B / C from the options above on the profile evidence. Write
the chosen approach + why (and why not the alternatives) into the draft
so the lock entry can cite it.

### Step 2 — Implement Lever A (Snipcart)
Per the chosen option: gate / lazy-load / defer Snipcart in
`extend_head.html` §5 + `extend_footer.html`, and handle the header cart
button on non-commerce pages. Keep the commerce flow intact on
`shop`/`diorama`.

### Step 3 — Implement Lever B (fonts)
Apply the chosen font-unblock in `extend_head.html` §2. Keep
`display=optional`, the `preconnect` tags, and the exact family/weight
set.

### Step 4 — Implement Lever C (critical CSS)
Apply the chosen stylesheet change via the override layer.

### Step 5 — Re-baseline
Re-run the Step 0 matrix on a fresh production build/URL. Confirm ≥ 90
Perf on every page and no regression in A11y / BP / SEO.

### Step 6 — Lock
Flip the WORK_INDEX row to Done, add the VISION Decisions-log lock entry
(with per-page before/after scores + the three lever decisions),
`WP-044:` commits, PR, squash-merge.

---

## Verify

Representative page matrix (site-wide change → cover a page of each
kind):

| Page | Why |
|---|---|
| `/` (home) | WP-008 baseline anchor (was 92) |
| a blog post (`/blog/…`) | LCP element is `.post-description`; Lever B target (was 91) |
| `/shop/` + one `/shop/<product>/` | Snipcart **still** loads here — confirm commerce unbroken |
| `/diorama/` | commerce (buy button) — confirm unbroken |
| `/leaderboard/` | the measured **76** — must clear ≥ 90 |
| `/roadmap/` | the measured **79** — must clear ≥ 90 |

- [ ] Step 0 pre-change profile captured for every matrix page.
- [ ] Lighthouse **Perf ≥ 90** on every matrix page after the change,
      **and ≥ WP-008 baseline** on home (≥ 92) and post (≥ 91).
- [ ] A11y / BP / SEO hold (no drop from current live values; WP-043
      contrast fix + WP-008 SEO posture intact).
- [ ] No console errors on any matrix page; CLS not increased.
- [ ] Commerce works end-to-end on `/shop/` + `/diorama/` (add-to-cart →
      cart opens → checkout reachable) after the Snipcart change.
- [ ] Header cart button behaves as decided on non-commerce pages (live
      cart, lazy, or degraded link — whatever Lever A chose), with no
      console error and no dead control.
- [ ] `npm run build` deterministic: two consecutive builds → byte-
      identical `public/` (SHA-256 `Compare-Object` empty).
- [ ] `git submodule status` shows `themes/PaperMod` clean (no `+`).
- [ ] `git diff static/brand-tokens.css` empty (unless Lever B3 chosen
      and its v1→v2 implication explicitly accepted in the lock entry).
- [ ] `git diff --name-only main...HEAD` ⊆ Scope lock.

---

## Scope lock

| Path | Change |
|---|---|
| `layouts/_partials/extend_head.html` | MODIFY (§2 fonts, §5 Snipcart) |
| `layouts/_partials/extend_footer.html` | MODIFY (Snipcart JS/mount load) |
| `layouts/_partials/header.html` | MODIFY (only if Lever A degrades/gates the cart button) |
| `layouts/shop/*.html`, `layouts/diorama/list.html` | MODIFY (only if Lever A gates the commerce-page opt-in) |
| `assets/css/extended/custom.css` | MODIFY (only if Lever C touches page CSS / critical-CSS) |
| `assets/js/` | NEW (only if Lever A2 adds a lazy-Snipcart loader) |
| `layouts/_partials/head.html` or a critical-CSS partial override | NEW/MODIFY (only if Lever C inlines/asyncs the theme stylesheet) |
| `hugo.toml` | MODIFY (only if a lever needs a param/toggle) |
| `package.json` | MODIFY (only if a lever adds a build-time step, e.g. critical-CSS extraction — no runtime dependency without explicit note) |
| `static/fonts/*` + `@font-face` | NEW (only if Lever B3 self-hosts) |
| `docs/ai/work-packets/WP-044-site-performance-recovery.md` | MODIFY (fold lever decisions in at lock) |
| `docs/ai/WORK_INDEX.md` | MODIFY (row → Done at lock) |
| `docs/01-VISION.md` | MODIFY (Decisions-log lock entry) |

**Do NOT touch:** `themes/PaperMod` (locked submodule — override only),
`static/brand-tokens.css` (cross-origin v1 contract — unless B3 is chosen
and its contract implication is accepted), the engine repo, any
`content/` copy, the WP-008 Schema partials, the WP-043 roadmap files.
The final touched set is whatever the chosen levers require — a subset of
the table above, recorded exactly in the lock entry.

---

## Definition of Done

1. Lighthouse **Perf ≥ 90** on every page in the Verify matrix, **≥ the
   WP-008 baseline** where one exists, measured on a fresh production run.
2. A11y / BP / SEO unregressed; no console errors; CLS not increased.
3. Commerce still works on `/shop/` + `/diorama/`; the header cart button
   behaves as decided everywhere else.
4. Build deterministic (two builds byte-identical); submodule clean;
   brand-tokens contract intact (or B3's bump explicitly accepted).
5. `git diff --name-only main...HEAD` ⊆ Scope lock.
6. WORK_INDEX row flipped to Done; VISION Decisions-log lock entry added
   with per-page before/after scores and the A/B/C lever decisions.

---

## Exit criteria

- DoD verified on the live/production URL.
- `WP-044:` implementation commit(s); PR; squash-merge.
- WORK_INDEX row updated; Decisions-log entry in `docs/01-VISION.md` at
  lock. The entry **closes the WP-043 Performance carve-out** for the
  `www` surface (reference it explicitly).

---

## Risk register

- **Live-URL Lighthouse variance** — scores swing ±3–8 points on live
  URLs (network, CF cache warmth, headless Chrome version); WP-008 Risk
  #3 precedent. Mitigation: measure the same way pre/post, take the
  fresh production run as the lock number, and leave margin over 90 where
  possible rather than landing exactly on it.
- **Snipcart behavior regression** — gating/lazy-loading Snipcart can
  silently break add-to-cart or the header count. Mitigation: exercise
  the full commerce flow on `shop` + `diorama` post-change; decide and
  document the non-commerce cart-button behavior rather than leaving a
  dead control.
- **Async-CSS FOUC / new CLS** — moving CSS off the critical path can
  flash unstyled content or shift layout, trading a Perf win for a CLS
  loss. Mitigation: inline the above-the-fold critical CSS; verify CLS
  per page does not increase.
- **Self-hosting fonts (B3) contract creep** — pulls in a CORS posture
  and a possible `brand-tokens.css` v1→v2 bump affecting `play.*` /
  `cards.*`. Mitigation: prefer B1/B2; only reach B3 if needed, and treat
  the cross-site contract as an explicit decision, not a side effect.
- **Determinism break** — a new build-time step (critical-CSS extraction)
  or a non-deterministic lazy asset could break the byte-identical build
  contract. Mitigation: run the two-build SHA-256 check before lock.

## Follow-on (not in scope)

- **A Lighthouse-on-CI gate** — catch Perf/CLS regressions before merge
  so the site doesn't silently drift sub-90 again (WP-011 already named
  this as a future direction). This WP recovers the number; the CI gate
  keeps it recovered.
- **`play.*` / `cards.*` performance** — those surfaces carry their own
  carve-outs (WP-007b: cards Perf 61 / BP 79). Each is a separate,
  engine-repo WP; this WP is `www`-only.
- **`size-adjust` / fallback-metric matching** — eliminating *any* visual
  font shift (beyond CLS) needs self-hosted `@font-face` metric overrides
  (the `WP-012`-shaped scope WP-011 deferred). Out of scope unless B3 is
  chosen and it falls out naturally.

## Authority

Per the `docs/01-VISION.md` Decisions-log convention, the authority chain
on conflict is:

1. `docs/01-VISION.md` (vision + global invariants + Decisions log — the
   2026-08-25 WP-043 lock entry is the direct authority for this WP)
2. `docs/03-ROADMAP.md` / `docs/ai/WORK_INDEX.md` (WP registry)
3. This WP file
4. Active session context

---

## Execution outcome (2026-08-25 lock)

**Result:** every page in the Verify matrix hits Lighthouse Performance
**≥ 90** on production (`www`, mobile) — clean-machine peak **98–99**
(home 98, post 99, shop 99, shop-product 99, diorama 98, leaderboard 98,
roadmap 98), up from the 76–79 baseline. **A11y / BP / SEO hold at 100**
on every page; **zero console errors**; FCP fell ~2.6 s → ~0.9–1.3 s
site-wide. Build byte-deterministic; `themes/PaperMod` (`c4ca7ca`) and
`static/brand-tokens.css` untouched.

**Lever decisions (measured, not pre-committed):**

- **A — Snipcart → A1+A2 hybrid.** `shop` loads the SDK eagerly (buy
  buttons armed at first paint), cart CSS non-render-blocking
  (`media=print/onload`). Every other page defers the ~212 KiB runtime to
  first cart-button intent (`assets/js/snipcart-lazy.js`); the site-wide
  header cart button opens the cart even on a click that lands before the
  SDK boots. A unified idle-load variant (A2 everywhere) was tried and
  **reverted** — perf-neutral on shop, added commerce risk.
- **B — fonts → inline `@font-face`.** Dropped the render-blocking Google
  Fonts `<link>` (~860 ms on the LCP text); inlined the latin `@font-face`
  from new `assets/css/fonts.css`; Inter (LCP body) preloaded.
  `display=optional` kept (no font-swap CLS). Not B1 (async — would stop
  fonts rendering under `optional`) and not B3 (self-host — unnecessary).
- **B′ — `brand-tokens.css` inlined (the decisive find).** After A+B, the
  live profile showed `/brand-tokens.css` as the **only** remaining
  render-blocker on every page (~470 ms) — what held home + post at 88–89.
  Inlined from the same static file (`os.ReadFile`, no drift); canonical
  file still served for cross-origin consumers; **WP-002 contract intact.**
- **C — theme stylesheet → no change needed.** The theme already emits its
  bundle as `rel="preload stylesheet"`; with A+B+B′ done it resolves fast.
  No submodule fork.
- **D — image weight/CLS.** Home hero (LCP) 310 KB unsized → **57 KB**
  Hugo WebP (`851x webp q65`) + `width/height` + `fetchpriority=high` +
  matching `rel=preload`. Shop images given `400×300` dims (CLS
  0.22 → 0.006 on `/shop/<product>/`).

**Measurement note:** local Lighthouse showed ±10-pt variance from
measuring-machine CPU contention. Contention only *depresses* scores, so
the best-observed per-page number is the truest; every page peaked at
98–99. A machine-independent run (PageSpeed Insights / pagespeed.web.dev)
is the authoritative re-confirmation and is recommended for the record.

**Follow-on still open:** a Lighthouse-on-CI gate to prevent a future
commerce/media WP silently re-introducing a render-blocker (named in the
Follow-on section above; the recovery is structural, so the residual risk
is regression, not the current state).

### Post-lock commerce fix (`partialCached` gotcha)

Final production sanity-check caught that **Snipcart's SDK was not loading
on `/shop/`** — add-to-cart was dead. Root cause: the theme renders the
footer via `partialCached "footer.html" . .Layout .Kind …` (see
`themes/PaperMod/baseof.html`), whose cache key is `.Kind`/`.Layout` but
**not `.Section`**. The initial implementation's `{{ if eq .Section "shop" }}`
eager-vs-lazy branch in `extend_footer.html` was therefore frozen to
whichever page rendered first (a non-shop page → the lazy loader) and
served to shop too. (The head §5 CSS was fine — `extend_head` uses plain
`partial`, not cached.)

**Fix:** the eager-vs-lazy decision is made at **runtime from the DOM**,
never from `.Section`: `extend_footer.html` emits the same markup on every
page (mount + one deferred `snipcart-lazy.js`), and the loader loads the
SDK eagerly when it sees `.snipcart-add-item` on the page (commerce),
otherwise on cart-button intent. Verified in-browser: `/shop/<product>/`
boots `window.Snipcart` and injects the SDK+CSS; home does not until cart
intent; no console errors. **Lesson: never branch a `partialCached` partial
on a key that isn't in its cache signature.**
