# WP-045 — Interactive Voting on the Roadmap Board

**Section-enhancement WP.** Add **one-click upvoting** to the enhancement cards on `www.legendary-arena.com/roadmap/` (built by WP-043). A signed-in visitor can vote (and un-vote) for an enhancement; the count updates immediately. This turns the read-only board into the votable roadmap the engine feedback system was designed for (engine `D-24414`: "identity-gated voting; one account, one vote"). It is still a thin client over the engine API — the engine owns the tally; this page only sends the vote and reflects the result.

> **Drafting note (gate bypass).** Drafted with the marketing repo's pre-drafting
> hygiene gate **branch-count checks bypassed** (working tree clean; ~5 pre-existing
> `claude/*` branches hold unrelated parked work that can't be cleared without
> risking it, plus the active WP-044 worktree). Bypass affects only branch hygiene,
> not this docs-only draft. Same posture as WP-043.

---

## Working directory

`C:\www\legendary-arena-com\` — Hugo site, PaperMod (locked submodule; override via `assets/` / `layouts/`, never edit `themes/PaperMod`). Build: `npm run build`.

---

## Required reading (in order)

1. `docs/ai/work-packets/WP-043-public-roadmap-board.md` — this WP **extends** WP-043; do not re-derive the board. Read its Content model + `assets/js/roadmap.js` DOM contract.
2. `assets/js/roadmap.js` — the file this WP modifies (the board's fetch + render).
3. `assets/js/header-auth.js` — **the proven authenticated-call pattern to reuse**: the `hanko` session token is a JS-readable cookie scoped to `.legendary-arena.com` (engine `D-16002` / `WP-347` / `D-24137`, shared across subdomains), read via its `readHankoToken()` and sent as `Authorization: 'Bearer ' + token` on `GET /api/me/profile`. Interactive voting uses the **identical** mechanism — no cookies/`credentials`, no Hanko SDK.
4. **Engine-side contract (reference, other repo):** the vote endpoints exist (engine `WP-604` / `D-24414`), both `authenticated-session-required`:
   - `POST /api/feedback/:id/vote` → `200 { voted: true, voteCount }` (idempotent; 404 unknown id)
   - `DELETE /api/feedback/:id/vote` → `200 { voted: false, voteCount }`
   - `GET /api/feedback` already returns `viewerHasVoted` per item **when called with a valid `Authorization` header** (guest calls get `false`).

---

## Current state

- `/roadmap/` (WP-043) fetches `GET /api/feedback` **as a guest** (no token) and renders read-only cards with a `voteCount` badge. There is no vote control and `viewerHasVoted` is always `false`.
- `header-auth.js` already authenticates from `www` to `api.legendary-arena.com` with the `hanko` Bearer token — the mechanism this WP reuses is live and proven in production.

---

## Design decisions (read before building)

1. **Reuse the proven Bearer-token auth; no cookies/credentials.** Read the `hanko` cookie value in JS (same as `header-auth.js` `readHankoToken()`) and send `Authorization: 'Bearer ' + token`. Because auth is a header, **no** `credentials: 'include'` and **no** `Access-Control-Allow-Credentials` are involved. Duplicate `readHankoToken` into `roadmap.js` with a `// why:` note (second use of the helper; extract a shared `assets/js/hanko-token.js` on the third, per duplicate-first). Do **not** modify `header-auth.js`.
2. **Auth-gated control.** Logged-out (no token) → the card shows a **"Sign in to vote"** affordance linking to the sign-in surface (`https://play.legendary-arena.com/?route=me` — confirm the canonical sign-in URL during build); it never attempts a `POST`. Logged-in → an interactive upvote button.
3. **Toggle, driven by `viewerHasVoted`.** Not voted → `POST` to vote; already voted → `DELETE` to un-vote. Use **optimistic UI** (increment/decrement + flip state immediately), **disable the button while the request is in flight**, and **roll back** on error. Reconcile the count to the authoritative `voteCount` in the response.
4. **The board GET now sends the token when present.** So `viewerHasVoted` and the counts reflect the signed-in user; a guest still gets a working read-only board (token absent → no header → `viewerHasVoted:false`). This is the only change to the existing fetch.
5. **`401` → re-auth prompt, not a dead button.** An expired/invalid token returns 401; surface a full-sentence "Your session expired — sign in again to vote" with the sign-in link. Never silently swallow.
6. **Voting informs priority; it is not a referendum** (engine `D-24414`). No UI implies the top vote ships next.
7. **Lighthouse ≥ 90 preserved** (global invariant). No new dependency, no SDK; the token read + fetch are tiny. (Coordinate with WP-044, which is recovering site-wide Performance — do not regress it.)

---

## Hard dependency — VERIFY, do not assume

**Server CORS must allow `POST` + `DELETE` + the `Authorization` header from the `www` origin.** The guest `GET` works today, and `header-auth.js` proves `GET` + `Authorization` works from `www` — but `POST`/`DELETE` with a preflight (`OPTIONS`) is unverified. **Before writing vote logic**, probe it:

```
curl -i -X OPTIONS https://api.legendary-arena.com/api/feedback/1/vote \
  -H "Origin: https://www.legendary-arena.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: authorization"
```

Expect `Access-Control-Allow-Origin: https://www.legendary-arena.com` (or a value covering it), `Access-Control-Allow-Methods` including `POST`/`DELETE`, and `Access-Control-Allow-Headers` including `authorization`. **If the preflight does not allow it, STOP** — this WP is **blocked** on a small engine-repo CORS change (add `www` origin + `POST`/`DELETE` + `Authorization` to the `/api/feedback` route CORS). That is an **engine companion WP**, not a fix here. Do not proceed on an assumption.

---

## Content model

No new content/section. Vote controls are injected by `roadmap.js` into the existing WP-043 card DOM. Per-card control:
- signed-in: a button `⬆ <count>` with `aria-pressed` reflecting `viewerHasVoted`, `data-feedback-id=<id>`.
- signed-out: a `<a>` "Sign in to vote" to the sign-in URL.

---

## Task

### Step 1 — Token read
Add a `readHankoToken()` to `roadmap.js` (duplicated from `header-auth.js` with the `// why:` note). Full JSDoc; returns the token string or `null`.

### Step 2 — Authenticated board GET
Modify the existing board fetch: when a token is present, add `Authorization: 'Bearer ' + token` to the `GET /api/feedback` headers so `viewerHasVoted` is accurate. Guest path unchanged.

### Step 3 — Render the vote control
In the card renderer, add the per-card control from Content model — the button (signed-in) or the sign-in link (signed-out), built via `document.createElement`, keyboard-accessible, `aria-pressed`.

### Step 4 — Vote toggle handler
On click (signed-in only): optimistic flip + disable; `POST` (vote) or `DELETE` (un-vote) to `/api/feedback/:id/vote` with the Bearer header; on success reconcile to the response `voteCount`; on `401` show the re-auth prompt; on other error roll back + a full-sentence message. `for...of` where iterating; no `.reduce`; descriptive names; full JSDoc.

### Step 5 — Styles
Add vote-button states to `assets/css/extended/custom.css` (`var(--la-*)` only, no raw hex): default, voted (`aria-pressed=true`), in-flight (disabled), and the signed-out link.

---

## Verify

- [ ] **Preflight probe passes** (Hard dependency) — else STOP and mark blocked on the engine CORS WP.
- [ ] `npm run build` succeeds; `/roadmap/` still renders (WP-043 behavior intact).
- [ ] Signed-out: each card shows "Sign in to vote" linking to the sign-in URL; no `POST` fires.
- [ ] Signed-in (valid `hanko` cookie): clicking upvotes → count +1, `aria-pressed=true`; clicking again un-votes → count −1; a refresh **persists** the voted state (`viewerHasVoted` via the authenticated GET).
- [ ] `401` (expired token) shows the re-auth prompt, not a dead button; a network error rolls the optimistic update back.
- [ ] No `credentials`/cookie mode used (Bearer header only); no console errors.
- [ ] Lighthouse ≥ 90 all four categories on `/roadmap/` (no regression vs WP-044's recovery).
- [ ] `git diff --name-only main...HEAD` ⊆ Scope lock.

---

## Scope lock

| Path | Change |
|---|---|
| `assets/js/roadmap.js` | MODIFY (token read, authed GET, vote control + toggle) |
| `assets/css/extended/custom.css` | MODIFY (append vote-button states) |
| `docs/ai/WORK_INDEX.md` | MODIFY (status → Done at lock) |
| `docs/01-VISION.md` | MODIFY (Decisions-log lock entry) |

**Do NOT touch:** `assets/js/header-auth.js` (duplicate the token helper, don't edit it), `layouts/roadmap/list.html` (controls are injected by JS; edit only if a static fallback is required), `themes/PaperMod`, `static/brand-tokens.css`, any other section, the engine repo. No new npm dependency. No raw hex.

---

## Definition of Done

1. Signed-in visitors can vote/un-vote on `/roadmap/`; counts update optimistically and reconcile to the API; state persists across refresh.
2. Signed-out visitors see a "Sign in to vote" affordance; guests still get the working read-only board.
3. `401`/error paths handled (re-auth prompt / rollback); no console errors.
4. Lighthouse ≥ 90 all four categories on `/roadmap/`.
5. `git diff --name-only main...HEAD` ⊆ Scope lock; WORK_INDEX row → Done; VISION lock entry added.

---

## Exit criteria

- DoD verified live/preview (with a real signed-in `hanko` session).
- `WP-045:` implementation commit; PR; squash-merge.
- WORK_INDEX row updated; Decisions-log entry in `docs/01-VISION.md` at lock.

---

## Risk register

- **CORS `POST`/`DELETE` gap (primary)** — verify the preflight FIRST (Hard dependency). If it fails, this WP is blocked on an engine CORS change; do not build around it.
- **Token expiry** — the `hanko` JWT can be expired even when present; the server returns 401 and the handler must prompt re-auth.
- **Optimistic-update race** — disable the button in-flight and reconcile to the response `voteCount` (never trust the local increment as authoritative).
- **Sign-in URL** — confirm the canonical sign-in destination during build (`header-auth.js` / the play client); do not hardcode a guess.

## Follow-on (not in scope)

- **"Submit an idea" form** — creating a new enhancement (`POST /api/feedback`, authenticated) from the board. A separate WP (a form surface + validation).
- **Engine CORS companion WP** — only if the preflight probe fails: add the `www` origin + `POST`/`DELETE` + `Authorization` to the `/api/feedback` route CORS (engine repo).
- **The player-facing changelog / monthly-recap** — the backward-looking companion (engine `D-24414` follow-on).
