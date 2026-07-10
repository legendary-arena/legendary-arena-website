# WP-033 — Auth-aware header: greet the signed-in player by name (www)

Upgrade the `www` header so a signed-in visitor sees **their own name** in
place of the static **Account** link (WP-032), while a signed-out visitor still
sees **Account**. Progressive enhancement only: the server-rendered HTML is
unchanged ("Account"), and JavaScript *optionally* swaps in the name when a
Hanko session exists — so the no-JS Lighthouse baseline is untouched.

This file is the **session-ready execution pack**. The design source of truth is
[`docs/03-ROADMAP.md`](../../03-ROADMAP.md). If this file and the roadmap
conflict, the roadmap wins.

## ✅ STATUS: EXECUTED 2026-07-09 (prerequisites cleared)

Both prerequisites are met and this WP is executed:
- **Prereq 1 — Hanko allowed origins.** ✅ `https://www.legendary-arena.com` added
  to the tenant's Allowed origins (operator, 2026-07-09).
- **Prereq 2 — cross-subdomain session cookie.** ✅ engine **WP-347 / D-24137**
  (PR #645) merged + deployed; the `hanko` cookie `Domain` is now
  `.legendary-arena.com` (operator-confirmed), so `www` can read a `play.` login.

**Amendment 2 (2026-07-09) — cookie-read design, NO Hanko SDK on www.** The
original plan loaded the Hanko frontend SDK on `www` to call `getSessionToken()`.
That is unnecessary: the `hanko` session cookie is JS-accessible (D-16002) and now
parent-scoped (WP-347), and its value IS the bearer JWT — so `www` reads the
cookie directly and calls `GET /api/me/profile`. No SDK bundle is loaded, which
keeps the Lighthouse baseline untouched and removes all CSP/bundle risk. The Task
below reflects this simpler design; Steps 1/3 supersede the SDK-load approach.

**Live verification is operator-side.** A static-site auth integration cannot be
unit-tested end to end (there is no real session in CI/jsdom). The DoD's live
check — sign in on `play`, load `www`, see your name in the header — is confirmed
in the operator's browser post-deploy.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for `www.legendary-arena.com`.
Spans a small change in the **engine repo** (`C:\pcloud\BB\DEV\legendary-arena`)
for the D-24084 amendment (see §Cross-repo).

## Authority & the D-24084 amendment

WP-031/WP-032 are governed by the engine repo's **D-24084** (2026-06-30): *"www
stays a static marketing surface and does NOT own an auth surface; it links to
play."* This WP **amends** — not deletes — that decision:

- **www still does NOT OWN auth.** No login form, no passkey UI, no sign-up, no
  Hanko *Elements* on `www`. Sign-in and profile editing stay entirely on `play`
  (Hanko lives there). The single header entry still links to
  `play.legendary-arena.com/?route=me`.
- **www MAY become auth-AWARE.** It may *read* the existing Hanko session
  (read-only, via the frontend SDK's `getSessionToken`) purely to personalize
  the header label. Reflecting existing auth state ≠ owning an auth surface.

The amendment is an **engine-repo DECISIONS entry** (a new `D-241xx` that amends
D-24084) landed at execution time — see §Cross-repo. This WP file records the
intent; the decision is not final until that entry lands.

## Current state

- Header (`hugo.toml` `[[menu.main]]`): a single external **Account** link →
  `https://play.legendary-arena.com/?route=me` (WP-032). Rendered as a plain
  outbound link by `layouts/_partials/header.html` via `findRE "://"`.
- `www` ships **no auth JS** and no Hanko SDK. It is deliberately static
  (D-24084) and Lighthouse-tuned (Performance ≥ 90; search assets are
  lazy-loaded for exactly this reason — see `extend_head.html`).
- **Engine side is already ready** (verified 2026-07-08):
  - Server CORS allowlist already includes `https://www.legendary-arena.com`
    (`apps/server/src/server.mjs` `origins:` array).
  - `GET /api/me/profile` authenticates by **Bearer JWT** (Hanko
    `getSessionToken()` → `Authorization: Bearer`, verified server-side via
    JWKS). It already returns `displayName` + `handleCanonical` (WP-305 /
    D-24089). A valid token works from any origin.
  - `play` resolves the same label via `resolveDisplayLabel`
    (`apps/arena-client/src/composables/useAuthNav.ts`, WP-330 / D-24116):
    `displayName.trim()` → `@handleCanonical` → "My account". This WP mirrors
    that chain (using **"Account"** as the signed-out/last fallback to match
    the www menu copy).

## Task

### Step 1 — Auth-enhancement script (`assets/js/header-auth.js`, new) — DONE

A small vanilla-JS IIFE, loaded **deferred** so it never blocks first paint. NO
Hanko SDK (Amendment 2):

1. `readHankoToken()` — read the JS-accessible `hanko` cookie from
   `document.cookie` (parent-scoped to `.legendary-arena.com` by WP-347; the
   value IS the bearer JWT per D-16002). Absent/empty → return null (signed-out;
   the static "Account" stays).
2. `findAccountLabelElement()` — `document.querySelector('a[href*="?route=me"]')`
   then its inner `<span>` (the Account entry is the only header link to
   `?route=me`, WP-032; targeting by href needs no template hook, and the span
   preserves the outbound-link icon on the anchor).
3. If a token exists, `fetch(API_BASE + '/api/me/profile', { headers:
   { Authorization: 'Bearer ' + token } })`. On non-200 / throw → silent no-op.
4. On 200, `resolveLabel({ displayName, handleCanonical })` mirrors `play`'s
   chain: `displayName.trim()` → `@handleCanonical` → null (leave "Account").
   Set the span's `textContent` to the resolved name.

`API_BASE = 'https://api.legendary-arena.com'` is a documented constant (the www
static site is single-environment, unlike the SPA's `VITE_API_BASE_URL`), and is
already in the server CORS allowlist for the www origin. The Bearer token is
sent as a header (not a cross-origin cookie), so no `credentials: 'include'` and
no server credentials-CORS change is needed — same call shape as the SPA.

### Step 2 — Load the script (`layouts/_partials/extend_footer.html`) — DONE

`resources.Get "js/header-auth.js" | minify | fingerprint` + `<script defer>`,
mirroring the `newsletter.js` load. **No `header.html` change** — the script
targets the Account link by href, so the static markup is byte-unchanged and the
no-JS render is untouched. (Supersedes the original Step 2's `data-*` hook.)

### Step 3 — Config wiring — NOT NEEDED (Amendment 2)

No `hugo.toml` param and no Hanko tenant URL: the cookie-read design needs
neither the SDK nor a tenant origin, and the API origin is the documented
constant in Step 1.

### Step 4 — Verify — DONE (build) + operator live-verify

- ✅ `hugo --minify` builds clean; `header-auth.min.js` is deferred in
  `public/index.html`; the built JS reads the `hanko` cookie; the Account link
  renders as `<a href="…?route=me"><span>Account</span>`.
- **Operator live-verify (post-deploy):** signed-out header shows "Account";
  signed-in (session on `play`) header shows the player's name, link still
  `?route=me`; Lighthouse Performance still ≥ 90 on `/` (the script is deferred,
  off the critical path, and adds no bundle).

## Cross-repo (engine repo)

- **DECISIONS amendment (D-24138):** a new engine-repo `docs/ai/DECISIONS.md`
  entry amends D-24084 — `www` may become auth-AWARE (read the existing session
  to personalize the header) while still NOT owning an auth surface (login /
  profile stay on `play`). Landed as its own engine-repo `SPEC:` PR (not code).
- **No engine code change:** CORS already lists `www`; `/api/me/profile` already
  returns the fields; the Bearer call sends the token as a header (not a
  cross-origin cookie), so no preflight/credentials-CORS gap arises — same call
  shape the SPA already uses successfully.

## Definition of Done

- [x] Prereq 1 cleared — `www` in Hanko allowed origins (operator).
- [x] Prereq 2 cleared — WP-347 / D-24137 (parent-scoped `hanko` cookie) deployed;
      `Domain = .legendary-arena.com` operator-confirmed.
- [x] `assets/js/header-auth.js` (cookie-read, no SDK) + deferred load in
      `extend_footer.html` landed. No `header.html` / `hugo.toml` change needed.
- [x] `hugo --minify` clean; `header-auth.min.js` deferred in the built output;
      no bundle added (Lighthouse baseline untouched).
- [x] Engine-repo **D-24138** amendment to D-24084 landed (its own `SPEC:` PR).
- [x] Commit on a `claude/*` branch → PR → `origin/main` (marketing repo).
- [ ] **Operator live-verify (post-deploy):** signed-out header = "Account";
      signed-in (session on `play`) header = the player's name, link still
      `?route=me`; Lighthouse Performance ≥ 90 on `/`.

## What's NOT in scope

- **Any login / sign-up / passkey UI on `www`** — auth stays on `play`
  (D-24084 as amended). `www` only *reads* the session.
- **Avatar, badges, or a full account menu on `www`** — label text only.
- **A `www`-owned session cookie or a server cookie-domain change** — the Bearer
  token comes from the Hanko SDK; no new cookie surface.
- **Changing the signed-out copy** — stays "Account" (WP-032).
- **Bundling the Hanko SDK into the critical path** — it must be lazy/deferred;
  if it cannot be kept off the critical path without dropping Lighthouse < 90,
  STOP and reconsider the approach rather than shipping the regression.
