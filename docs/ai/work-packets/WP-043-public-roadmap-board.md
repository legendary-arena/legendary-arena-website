# WP-043 — Public Roadmap Board (`/roadmap/`)

**Section-build WP.** Add a public, read-only **roadmap board** at `www.legendary-arena.com/roadmap/` that shows players what's planned, in progress, and shipped for Legendary Arena — grouped into columns by status, each enhancement showing its community vote count. It is a client-side page that fetches the already-public, guest-readable feedback API and renders it; it writes nothing and requires no login. This is the marketing-site surface of the engine-side feedback/roadmap system (engine `D-24414`, the "System of record + Surfaces and authority" split): the engine owns the data and status; this page is a **read-only projection** of it.

> **Drafting note (gate bypass).** This WP was drafted with the marketing repo's
> pre-drafting hygiene gate **count-checks bypassed** — the working tree was clean
> (Checks 1–2 passed), but ~5 pre-existing `claude/*` branches hold unrelated
> parked work (uncommitted content edits + WP-019/020/021 drafts) that could not be
> cleared without risking that work. The bypass affects only branch *hygiene*, not
> this docs-only draft. Clearing those branches is separate housekeeping.

---

## Working directory

`C:\www\legendary-arena-com\` — Hugo site, PaperMod theme (locked git submodule; never edit `themes/PaperMod`, override via `assets/` / `layouts/`). Build: `npm run build` (`node scripts/build.mjs` → `hugo --minify` + Pagefind; preview-baseURL wrapper per `D 2026-08-09`).

---

## Required reading (in order)

1. `C:\www\legendary-arena-com\docs\ai\work-packets\WP-149-public-leaderboard-marketing-page.md` — the closest precedent: a read-only Hugo section consuming a public `api.legendary-arena.com` endpoint with a CORS allowlist. Mirror its shape.
2. `C:\www\legendary-arena-com\assets\js\leaderboard.js` — **the JS pattern to clone**: `API_BASE` constant, `fetch` with `AbortController`, DOM built via `document.createElement` into contract element ids, `for...of` (no `.reduce`), full-sentence error strings, `document.readyState` entry guard.
2b. `C:\www\legendary-arena-com\layouts\leaderboard\list.html` — the section-layout override + fingerprinted `defer` script-load pattern.
2c. `C:\www\legendary-arena-com\assets\js\header-auth.js` — documents that `API_BASE = 'https://api.legendary-arena.com'` is already in the server CORS allowlist for the `www` origin, and that guest-readable endpoints need **no** `credentials: 'include'` and no auth header.
3. `C:\www\legendary-arena-com\docs\04-CONTENT-CONVENTIONS.md` — section/front-matter conventions; `assets/css/extended/custom.css` for page CSS; `var(--la-*)` brand tokens only (no raw hex).
4. `C:\www\legendary-arena-com\hugo.toml` — footer menu (`[[menu.footer]]`); the **trailing-slash-on-`url`** invariant.
5. **Engine-side contract (reference, other repo):** the feedback API is `GET https://api.legendary-arena.com/api/feedback` (guest), built by engine `WP-604` / `D-24414`. Response: `{ items: PublicFeedbackItem[] }`, where `PublicFeedbackItem = { id, type: 'enhancement', title, description, status, voteCount, viewerHasVoted, createdAt }`. Default status set returned is `planned | in_progress | shipped` (the public roadmap view; `under_review` / `declined` are hidden). Confirm the live shape with a `curl` before building.

---

## Current state

- Existing content sections: `about, art, blog, brand, diorama, emails, leaderboard, rules, shop, tournaments`. No `roadmap/` section exists.
- No public roadmap or feedback surface exists on the site. `docs/03-ROADMAP.md` is the internal engineering roadmap; `docs/ENHANCEMENT-REQUESTS.md` is the internal staff triage queue — **this page complements, not supersedes, both** (it renders the *player-voted* enhancements from the engine API, not the internal docs).
- `assets/js/leaderboard.js` + `layouts/leaderboard/list.html` are the working precedent for an API-backed read-only section.

---

## Design decisions (read before building)

1. **Read-only display board this WP; interactive voting is a follow-on.** The page renders the public GET endpoint (guest, no auth). Casting a vote is an authenticated cross-origin `POST /api/feedback/:id/vote` (needs the Hanko session + CORS-with-credentials) — a meatier surface deferred to a follow-on WP (see Follow-on). This WP ships the "see what's planned / in progress / shipped" view with vote counts shown read-only.
2. **Three status columns = the public roadmap.** Group items into **Planned → In progress → Shipped** (in that order). These are exactly the statuses the API returns by default; the page does not request or show `under_review` / `declined`. If the API later exposes a status filter, that's additive.
3. **Engine is the source of truth; this page never caches or authors.** No status is set here, no vote is written here (this WP), and nothing about the roadmap is hardcoded — every card comes from the live API. If the API is unreachable, the page shows a full-sentence error state, never a stale hardcoded roadmap.
4. **Vote count is display-only signal.** Show each enhancement's `voteCount` as a read-only badge. Do not imply the top vote ships next (the engine `D-24414` rule: voting informs priority, it is not a referendum).
5. **Lighthouse ≥ 90 (global invariant).** JS is `defer`, off the critical path, no console errors. The fetch is lazy on `DOMContentLoaded`; the page renders its shell (heading + column skeletons) server-side so first paint is instant.
6. **Footer nav, not header.** New utility pages go in `[[menu.footer]]` (header `[[menu.main]]` is deliberately trimmed, WP-034). Trailing slash on the `url`.

---

## Content model

`content/roadmap/_index.md` front-matter:

```yaml
---
title: "Roadmap"
description: "See what's planned, in progress, and shipped for Legendary Arena — and the community requests behind it."   # ≤160 chars
layout: "list"
---
```

DOM contract element ids (rendered by the layout, populated by `roadmap.js`):

- `#roadmap-status` — loading / error / empty message region
- `#roadmap-board` — the three-column container
- one column per status with ids `#roadmap-col-planned`, `#roadmap-col-in_progress`, `#roadmap-col-shipped`

Each rendered card: title, short description, a `voteCount` badge, and a status-derived accent. All built via `document.createElement`, `data-pagefind-ignore` on the dynamic region.

---

## Task

### Step 1 — Content stub
Create `content/roadmap/_index.md` with the front-matter above.

### Step 2 — Section layout override
Create `layouts/roadmap/list.html` (mirrors `layouts/leaderboard/list.html`): define `main`, render the heading + intro copy + the DOM-contract elements (status region + three empty columns with their ids), mark the dynamic region `data-pagefind-ignore`, then load the script:

```
{{ $js := resources.Get "js/roadmap.js" | minify | fingerprint }}
<script src="{{ $js.RelPermalink }}" defer></script>
```

### Step 3 — Fetch + render logic
Create `assets/js/roadmap.js`, cloning `leaderboard.js` conventions verbatim in shape:
- `"use strict"`; top-of-file `const API_BASE = "https://api.legendary-arena.com/api/feedback";`
- `fetch(API_BASE, { headers: { Accept: "application/json" }, signal })` with an `AbortController`; **no** `credentials`, no auth header (guest endpoint).
- On success: partition `items` by `status` into the three columns via a `for...of` loop (no `.reduce`); render each card via `document.createElement`; show `voteCount`; empty column → a quiet "Nothing here yet" line.
- Loading / error / total-empty states written to `#roadmap-status` as full sentences.
- Entry point guarded by `document.readyState`.
- Full JSDoc on every function; descriptive names; no abbreviations.

### Step 4 — Page styles
Add roadmap styles to `assets/css/extended/custom.css` using `var(--la-*)` tokens only (columns, cards, vote badge, status accents). No raw hex.

### Step 5 — Footer navigation
Add a `[[menu.footer]]` entry in `hugo.toml` for `Roadmap` → `/roadmap/` (trailing slash), placed per the existing footer weight order.

---

## Verify

- [ ] `npm run build` succeeds; `/roadmap/` renders (shell + three columns) in `public/`.
- [ ] With the live API reachable, columns populate from `GET /api/feedback`; vote counts show; empty columns show the quiet line.
- [ ] API-unreachable path shows a full-sentence error in `#roadmap-status`, never a blank or hardcoded board.
- [ ] No `credentials` / auth header sent (guest fetch); no CORS error in console from the `www` origin.
- [ ] Pagefind build passes; dynamic region is `data-pagefind-ignore`.
- [ ] Lighthouse ≥ 90 (Perf / A11y / BP / SEO), no console errors, on `/roadmap/`.
- [ ] Footer shows Roadmap; link resolves with trailing slash; active-state styling correct.
- [ ] `git diff --name-only main...HEAD` matches the Scope lock exactly.

---

## Scope lock

| Path | Change |
|---|---|
| `content/roadmap/_index.md` | NEW |
| `layouts/roadmap/list.html` | NEW |
| `assets/js/roadmap.js` | NEW |
| `assets/css/extended/custom.css` | MODIFY (append roadmap block) |
| `hugo.toml` | MODIFY (one `[[menu.footer]]` entry) |
| `docs/ai/WORK_INDEX.md` | MODIFY (status → Done at lock) |
| `docs/01-VISION.md` | MODIFY (Decisions-log lock entry) |

**Do NOT touch:** `themes/PaperMod` (locked submodule), `static/brand-tokens.css` (cross-origin contract), any other `content/` section, `scripts/build.mjs`, `package.json`, the engine repo. No new npm dependency. No raw hex in CSS.

---

## Definition of Done

1. `/roadmap/` is live and renders the three-column board from the live API, vote counts shown, with working loading/error/empty states.
2. Lighthouse ≥ 90 all four categories on `/roadmap/`, no console errors.
3. Footer Roadmap link works (trailing slash).
4. `git diff --name-only main...HEAD` ⊆ Scope lock.
5. WORK_INDEX row flipped to Done; VISION Decisions-log lock entry added.

---

## Exit criteria

- DoD verified on the live/preview URL.
- `WP-043:` implementation commit; PR; squash-merge.
- WORK_INDEX row updated; Decisions-log entry in `docs/01-VISION.md` at lock.

---

## Risk register

- **API shape drift** — the engine response shape is the contract; `curl` it before building and pin the exact field names (`voteCount`, `status`, `title`, `description`). If the live shape differs from Required-reading §5, stop and reconcile (the engine `WP-604` body is authoritative).
- **CORS** — the `www` origin is already allowlisted for guest endpoints (`header-auth.js`); if a CORS error appears, it is a server-side allowlist gap (engine repo), not a fix in this WP.
- **Empty roadmap at launch** — until an operator triages feedback to `planned`/`in_progress`/`shipped` (engine dashboard, a separate WP), the public columns may be empty. The page must handle that gracefully (quiet empty state), not look broken.

## Follow-on (not in scope)

- **Interactive voting from the board** — an authenticated cross-origin `POST/DELETE /api/feedback/:id/vote` (Hanko session + credentials + CORS-with-credentials), plus a "submit an idea" form. A separate WP (the meatier auth surface).
- **A player-facing changelog / monthly-recap** — the backward-looking companion to this forward board (engine `D-24414` follow-on).
- **Deep-linking / filtering** — `?status=` URL state via `URLSearchParams` (the `leaderboard.js` precedent), if the board grows.
