# WP-033 — Auth-aware header: greet the signed-in player by name (www)

Upgrade the `www` header so a signed-in visitor sees **their own name** in
place of the static **Account** link (WP-032), while a signed-out visitor still
sees **Account**. Progressive enhancement only: the server-rendered HTML is
unchanged ("Account"), and JavaScript *optionally* swaps in the name when a
Hanko session exists — so the no-JS Lighthouse baseline is untouched.

This file is the **session-ready execution pack**. The design source of truth is
[`docs/03-ROADMAP.md`](../../03-ROADMAP.md). If this file and the roadmap
conflict, the roadmap wins.

## ⛔ STATUS: PARKED — do not execute until the prerequisite below is cleared

**Blocking prerequisite (operator, Hanko Cloud — not a repo change):**
Add `https://www.legendary-arena.com` to the Hanko tenant's **allowed origins**
(Hanko Cloud dashboard for `HANKO_TENANT_BASE_URL`). Until then the Hanko SDK on
`www` cannot obtain a session token and this WP renders nothing new. Per
[engine-repo `docs/ops/DOMAINS.md` §Hanko](../../../../pcloud/BB/DEV/legendary-arena/docs/ops/DOMAINS.md),
a new client origin must be allow-listed before its SDK works. This is testable
in minutes once added: on `www`, `hanko.getSessionToken()` returns a JWT for a
user who signed in on `play`.

**Do not open the execution PR until Jeff confirms the origin is added and a
manual cross-origin session read succeeds.**

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

### Step 1 — Auth-enhancement script (`assets/js/header-auth.js`, new)

A small, dependency-light progressive-enhancement module, loaded **deferred /
on idle** so it never blocks first paint:

1. Lazy-import the Hanko **frontend SDK** (`@teamhanko/hanko-frontend-sdk` —
   session read only; NOT `hanko-elements`) from the tenant configured for
   `www`. The tenant base URL is injected as a build-time param (see Step 3);
   no secret is involved (the frontend SDK uses only the public tenant origin).
2. `const token = await hanko.getSessionToken()`. If falsy → **do nothing**
   (the static "Account" label stays). This is the signed-out path.
3. If a token exists, `fetch('https://api.legendary-arena.com/api/me/profile',
   { headers: { Authorization: 'Bearer ' + token } })`. On non-200 → do nothing
   (silent fallback, exactly like `play`'s `useAuthNav`).
4. On 200, read `{ displayName, handleCanonical }` and resolve the label via a
   copy of the `play` chain: `displayName.trim()` → `@handleCanonical` →
   leave "Account". Swap the header entry's visible text to the resolved name;
   keep its `href` pointing at `?route=me`.

Never throw; every failure path leaves the server-rendered "Account" intact.
The API origin (`https://api.legendary-arena.com`) is a build-time param, not
hard-coded, mirroring how the SPA uses `VITE_API_BASE_URL`.

### Step 2 — Header hook (`layouts/_partials/header.html`)

Give the Account menu entry a stable hook the script can target (e.g. a
`data-la-auth-label` attribute or a known id on the `<a>`/`<span>`). Minimal
markup change; the static text stays "Account" so the no-JS render is unchanged.
Load `header-auth.js` with `defer` (or via the existing `extend_head.html`
lazy-load pattern) so it is off the critical path.

### Step 3 — Config wiring (`hugo.toml` params + `extend_head.html`)

Add two `params` (Hanko tenant base URL for `www`, API base URL) and surface
them to the script (data attributes or a tiny inline `window.__LA_*` block).
No secrets — both are public origins.

### Step 4 — Verify (post-Hanko-origin)

- `hugo --minify` builds clean.
- Lighthouse Performance still ≥ 90 on `/` (the SDK is lazy/deferred; confirm it
  is not in the critical path — compare against `lighthouse-home-*.json`).
- Signed-out: header shows "Account" (no network calls block render).
- Signed-in (session created on `play`): header shows the player's name; the
  link still targets `?route=me`.

## Cross-repo (engine repo — execution-time)

- **DECISIONS amendment:** add a new `D-241xx` to
  `C:\pcloud\BB\DEV\legendary-arena\docs\ai\DECISIONS.md` amending D-24084 per
  §Authority above (www auth-AWARE, still not auth-OWNING). Cite it from the
  `hugo.toml` header comment (currently cites D-24084) at execution.
- **No engine code change expected:** CORS already lists `www`; `/api/me/profile`
  already returns the fields. If a preflight (`OPTIONS`) or `Access-Control`
  header gap surfaces for the Bearer call from `www`, that is an engine-repo
  fix under its own EC — surface it, do not patch `www` around it.

## Definition of Done

- [ ] Blocking prerequisite cleared: `www` origin added to Hanko allowed origins;
      a manual `getSessionToken()` on `www` returns a JWT for a play-login.
- [ ] `assets/js/header-auth.js` + header hook + config wiring landed.
- [ ] `hugo --minify` clean; Lighthouse Performance ≥ 90 on `/` (SDK off the
      critical path).
- [ ] Signed-out header = "Account"; signed-in header = the player's name → still
      links to `?route=me`.
- [ ] Engine-repo `D-241xx` amendment to D-24084 landed and cited from
      `hugo.toml`.
- [ ] Commit on a `claude/*` branch → PR → `origin/main` (marketing repo);
      the engine-repo amendment lands as its own commit in that repo.
- [ ] Post-deploy: the live `www` header greets a signed-in player by name.

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
