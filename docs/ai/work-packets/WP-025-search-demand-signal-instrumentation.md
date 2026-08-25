# WP-025 — Search demand-signal instrumentation (Plausible)

**Status:** DRAFT — pending registration in `docs/03-ROADMAP.md` and operator
sign-off on the Plausible account prerequisite (see Required prerequisites).
Drafted 2026-06-11.

Select **Plausible** as the site-side analytics platform and instrument the
**existing** Pagefind search box to emit a `Search` custom event carrying
`query`, `results_count`, `zero_result`, and `source`. This closes the
roadmap "Beyond" item *"Analytics — Cloudflare Web Analytics, Plausible, or
none. Decide post-launch"* and the WP-005 deferral *"Search analytics / query
logging — out of scope … nothing is reported."* It does **not** touch search
UX.

This file is the **session-ready execution pack**. The design source of truth
is [`docs/03-ROADMAP.md`](../../03-ROADMAP.md). If this file and the roadmap
conflict, the roadmap wins.

## Why this WP exists

The search box is a free demand signal for a planned rules assistant (engine
repo `WP-237`). Two-to-four weeks of query telemetry answers, before any
expensive build: do players search for rules help, and what do they look for
that returns nothing? High volume + a high zero-result rate on rules-intent
queries both (a) justifies authoring a canonical rules corpus and (b) tells us
which rules pages to write first. Instrument first, author corpus second,
build the assistant third — cheapest de-risked order.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme as a Git submodule. Deployed to
Cloudflare Pages. Pagefind search shipped under WP-005.

## Required prerequisites (operator)

- [ ] A **Plausible account** with `www.legendary-arena.com` added as a site,
      and the `data-domain` value confirmed. Plausible Cloud (~$9/mo Starter,
      includes Custom Properties) is the zero-ops option; self-hosting is
      viable but adds an instance to run. **Pick one before Step 1** — the
      `data-domain` and script origin depend on it. This is a normal business
      analytics cost, not a blocker to minimize.

If the account does not exist, Step 1 is **BLOCKED** — provision it first.

## Required reading (in order)

1. `docs/01-VISION.md` — vision, Global invariants, Decisions log. Note the
   **deterministic-deploy** invariant: same commit → byte-identical output via
   `npm run build`. This WP must preserve it.
2. `docs/03-ROADMAP.md` — WP list + the "Beyond" Analytics item this WP closes.
   Add the WP-025 row before execution.
3. `docs/ai/work-packets/WP-005-pagefind-search.md` — the search integration
   this WP extends. Read §"What's NOT in scope" (query logging was explicitly
   deferred to here) and the `#la-search` canonical-id lock (Step 4).
4. `layouts/_partials/extend_head.html` — read §3 (Pagefind lazy-load IIFE) and
   §4 (the `hugo.IsProduction` production-only guard pattern) entirely. The
   Plausible script and the telemetry hook both live in this file.
5. `layouts/_partials/header.html` — confirm the `#la-search` mount + the
   `#la-search-stub` input ids. JS targets these exact ids; aliases are
   forbidden (WP-005 lock).
6. <https://plausible.io/docs/custom-event-goals> and
   <https://plausible.io/docs/custom-props/introduction> — the custom-event +
   custom-properties API used here.
7. <https://pagefind.app/docs/api/> — the low-level Pagefind JS API
   (`pagefind.search(query)` → `{ results }`) used to read the exact result
   count without scraping the DOM.

## Current state

Locked under WP-005 (shipped, verified live 2026-06-11 — `/pagefind/` assets
return HTTP 200 in production):

- Pagefind search ships with a server-rendered `#la-search-stub` input and a
  lazy-loaded `PagefindUI` mounted into `#la-search`.
- Lazy-load triggers on focus, click, and the `/` + `Ctrl/Cmd+K` shortcuts
  (the IIFE in `extend_head.html` §3 already distinguishes these triggers).
- No site-side analytics platform exists (WP-021 is Brevo-email-only).

What's missing — **your job**:

- ❌ No site-side analytics platform installed
- ❌ No telemetry on search usage (queries, result counts, zero-result rate)
- ❌ No `source` attribution (shortcut vs click)
- ❌ No documented event schema for downstream consumers (engine repo WP-237)

## Task

### Step 1 — Install Plausible (production-only)

In `layouts/_partials/extend_head.html`, add the Plausible script behind the
same production guard the schema partial uses
(`{{- if hugo.IsProduction | or (eq site.Params.env "production") }}`), so dev
builds stay analytics-free and the build's JS-in-production posture is
explicit:

```html
<script defer data-domain="www.legendary-arena.com"
        src="https://plausible.io/js/script.js"></script>
<script>
  // why: Plausible's queue stub makes window.plausible callable before the
  // deferred script loads, so a fast first search is not dropped.
  window.plausible = window.plausible || function () {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };
</script>
```

- Use the standard `script.js` (it supports programmatic custom events via
  `window.plausible(name, { props })`; the `tagged-events` variant is only for
  HTML class-based tagging, which we do not use).
- Optionally add `<link rel="preconnect" href="https://plausible.io">` next to
  the existing font/Snipcart preconnects.
- Plausible adds **no npm dependency** — it is a `<script>` tag only. The
  WP-005 "no new top-level dependencies beyond Pagefind" constraint holds.

This also gives the pageview baseline that WP-021 deferred — a side benefit,
not the focus. No funnel/conversion attribution is wired here (out of scope).

### Step 2 — Emit the `Search` custom event

Extend the existing Pagefind IIFE in `extend_head.html` §3 (do not add a second
script block; keep search JS in one place per WP-005 Step 5 discipline):

A) **Track the trigger as `source`.** The IIFE's `focusin` / `click` /
`keydown` handlers already know how search was opened. Set a module-scoped
`var lastSearchSource = 'typed';` and assign:
- `'shortcut'` in the `/` and `Ctrl/Cmd+K` keydown branch
- `'click'` in the `#la-search` click branch
- `'typed'` otherwise (focus/direct typing)

B) **Debounce the settled query.** Add an `input` listener (delegated to
`#la-search`) that debounces ~500 ms after typing stops. Ignore queries shorter
than 2 characters. Trim, lowercase, and cap to 80 characters. Fire at most one
event per settled query value (dedupe against the previous fired value).

C) **Read the exact result count via the low-level API** (no DOM scraping):

```js
// why: PagefindUI does not expose a settled result count callback, so we read
// the count from the low-level Pagefind API. The module is cached after first
// import; the extra search reuses Pagefind's loaded index (negligible cost).
let pagefindModulePromise = null;
async function countResults(query) {
  if (!pagefindModulePromise) {
    pagefindModulePromise = import('/pagefind/pagefind.js');
  }
  const pagefind = await pagefindModulePromise;
  const search = await pagefind.search(query);
  return search.results.length;
}
```

D) **Send the event:**

```js
plausible('Search', {
  props: {
    query: cappedQuery,
    results_count: String(count),
    zero_result: count === 0 ? 'true' : 'false',
    source: lastSearchSource
  }
});
```

E) **Dev + failure safety.** `/pagefind/` does not exist under `hugo server`;
wrap the count + send in try/catch and resolve to a silent no-op on error
(matches the existing `script.onerror` silent-swallow). Telemetry must never
throw into the console or break search.

### Step 3 — Privacy + volume discipline

- Queries are user-entered free text: trim, lowercase, cap at 80 chars, and do
  not associate with any identity. Plausible is cookieless and stores no PII by
  default — this is standard site-search telemetry.
- The 500 ms debounce + 2-char minimum + per-value dedupe keep one event per
  settled query (not per keystroke), which holds Plausible event volume — and
  the bill — sane.

### Step 4 — Document the event schema

Add a short section to `docs/04-CONTENT-CONVENTIONS.md` (or a new
`docs/analytics.md` — your call, but it must be discoverable) recording:
- Platform: Plausible, production-only, `data-domain` value.
- The `Search` event contract: `query`, `results_count`, `zero_result`,
  `source` (`shortcut` | `click` | `typed`), with value formats.
- A one-line note that engine repo `WP-237` (rules assistant) consumes this
  event as its pre-flight demand signal — so the schema is a cross-repo
  contract, not just an internal log.

### Step 5 — Verify

1. **Build** — `npm ci && npm run build` from a clean tree. Succeeds;
   `public/pagefind/` present.
2. **Determinism** — two consecutive `npm run build` runs produce
   byte-identical `public/` (WP-005 Step 8.7 `Compare-Object` check). The added
   inline JS + Plausible tag are static, so output must stay byte-stable.
3. **Production-only** — the Plausible `<script>` appears in
   `public/**/*.html` but NOT in `hugo server` (dev) output.
4. **Functional** (serve the production build, e.g. `python -m http.server`
   from `public/`):
   - Type "arena" → after ~500 ms, one POST to `https://plausible.io/api/event`
     in DevTools Network with `props.results_count` > 0 and
     `props.zero_result: "false"`.
   - Type a known no-results string (e.g. a card name) → `zero_result: "true"`,
     `results_count: "0"`.
   - Open search via `/` → `source: "shortcut"`; via clicking the box →
     `source: "click"`.
   - Hold a key down / type fast → exactly one event after typing settles, not
     one per keystroke.
   - Dev mode (`hugo server`): typing produces no console error (no `/pagefind/`
     present; telemetry no-ops silently).
5. **Lighthouse** — Performance / Accessibility / Best-Practices / SEO all
   remain ≥ 90 on home + one post (production build), per the WP-005 floor.
6. **Submodule clean** — `git submodule status` shows no `+`.

## Constraints

- **No search UX changes.** `#la-search`, `#la-search-stub`, the lazy-load
  behavior, and the keyboard shortcuts are unchanged except for the added
  telemetry hook. This WP observes search; it does not redesign it.
- **`#la-search` canonical id is locked (WP-005).** Telemetry targets it; no
  aliases.
- **Plausible is a `<script>` only — no npm dependency.** WP-005's "no new
  top-level dependencies beyond Pagefind" holds.
- **Deterministic build preserved.** `npm run build` stays byte-identical
  across runs from the same commit. Runtime use of `Date.now()` inside the
  telemetry JS is fine (it does not appear in built output); the built bytes
  must not vary.
- **Lighthouse ≥ 90 hard floor** on home + post. Plausible's `script.js` is
  ~1 KB and deferred; the telemetry JS is small and not render-blocking.
- **No `themes/PaperMod/` edits.** Submodule stays clean.
- **No PII, cookieless.** Capped query text only; no identity association.

## Definition of Done

- [ ] Plausible script added, production-guarded, `data-domain` set
- [ ] `window.plausible` queue stub present so early events are not dropped
- [ ] `Search` event emits `query` (trimmed/lowercased/≤80), `results_count`,
      `zero_result`, `source`
- [ ] `source` correctly distinguishes `shortcut` / `click` / `typed`
- [ ] Debounced to one event per settled query (≥2 chars); no per-keystroke
      spam
- [ ] Result count read via the low-level Pagefind API (no DOM scraping)
- [ ] Telemetry no-ops silently in dev (no `/pagefind/`) — no console errors
- [ ] Event schema documented in `docs/04-CONTENT-CONVENTIONS.md` (or
      `docs/analytics.md`), including the cross-repo WP-237 consumer note
- [ ] `npm run build` deterministic (two runs byte-identical `public/`)
- [ ] Plausible script absent from dev output, present in production output
- [ ] Lighthouse ≥ 90 maintained on home + post
- [ ] Submodule clean; all commits pushed to `origin/main`
- [ ] WP-025 added to `docs/03-ROADMAP.md` and marked ✅ Done with commit hash
- [ ] Decisions log entry added to `docs/01-VISION.md` (Plausible selected;
      `Search` event schema; production-only posture)

## Failure conditions (explicit)

WP-025 must NOT be locked if any of the following are true:

- `public/` output differs across two consecutive identical builds
  (determinism regressed)
- The Plausible `<script>` appears in dev (`hugo server`) output, or blocks
  initial render in production
- The `Search` event fires per-keystroke instead of once per settled query
- `source` does not distinguish shortcut from click
- Telemetry throws into the console (dev or prod) or breaks the search box
- Any search UX/visual behavior changed
- Lighthouse Performance drops below 90 on home or post
- `themes/PaperMod/` modified (`git submodule status` shows `+`)

## What's NOT in scope

- **Rules corpus authoring** — the D2 follow-on that the demand data informs.
  Separate work.
- **The rules assistant** — engine repo `WP-237`. This WP only produces its
  pre-flight signal.
- **Conversion / revenue attribution** — no Snipcart event wiring, no UTM
  ingestion, no funnel-completion tracking. WP-021 (email) is untouched.
- **Search ranking / UX / index-scope changes** — WP-005 owns those.
- **A dashboard or aggregation** of the query data — read it in the Plausible
  UI; any visualization is a later WP.
- **A/B testing or segmentation.**

## Authority

Subordinate to `docs/01-VISION.md` (highest), then `docs/03-ROADMAP.md`, then
this file. WP-005 owns the search integration; this WP extends it additively
and must not regress any WP-005 DoD or failure condition. Surface any conflict
before proceeding.

## Background

WP-005 shipped client-side Pagefind search and explicitly deferred query
logging ("Pagefind runs client-side only; nothing is reported"). WP-021
defined the Brevo email funnel's measurement contract but recorded that no
site-side analytics platform exists, deferring platform selection to a roadmap
"Beyond" item. WP-025 closes that item with Plausible and spends it first on
the cheapest high-value signal: what players search for. The engine repo's
WP-237 (rules assistant) is gated on this signal plus a canonical rules corpus
— this WP supplies the signal.
