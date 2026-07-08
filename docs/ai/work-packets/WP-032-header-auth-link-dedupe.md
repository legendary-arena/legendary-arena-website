# WP-032 — Header auth link dedupe (single "Account")

Collapse the two header auth links that [WP-031](WP-031-header-auth-links.md)
added — **Sign in** (`?route=login`) and **My account** (`?route=me`) — into a
single state-neutral **Account** link (`?route=me`). Single-file config change to
`C:\www\legendary-arena-com\hugo.toml`.

## Authority

Still governed by the engine repo's `docs/ai/DECISIONS.md` **D-24084**
(2026-06-30): `www.legendary-arena.com` stays a static marketing surface and does
**not** own an auth surface — it links to Hanko sign-in / profile on `play`. This
WP does not change that posture; `www` remains static and auth-blind. It only
removes a redundant link. If this file and D-24084 conflict, D-24084 wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for `www.legendary-arena.com`.

## Current state

WP-031 shipped two adjacent `[[menu.main]]` entries:

| Item | URL | Weight |
|---|---|---|
| Sign in | `https://play.legendary-arena.com/?route=login` | 60 |
| My account | `https://play.legendary-arena.com/?route=me` | 70 |

The pair exists because the static site cannot know auth state (D-24084), so it
shipped both doors and let `play` resolve which applied. That is redundant: in the
play app, `me` is a **guarded route**
(`apps/arena-client/src/auth/routeAuthPolicy.ts` → `isGuardedRoute`). A signed-out
visitor who lands on `?route=me` is **auto-redirected to `?route=login`**. So a
lone `?route=me` link already covers both states — signed out → bounced to login;
signed in → profile — and the separate "Sign in" link did nothing the account
link did not already do.

## Task

### Step 1 — Collapse to one entry

Replace the two `[[menu.main]]` entries (`signin` weight 60 + `account` weight 70)
with a single entry:

| Item | URL | Weight |
|---|---|---|
| Account | `https://play.legendary-arena.com/?route=me` | 60 |

Copy is the state-neutral **"Account"** — never "Log in / Log out" (the static
site still cannot know auth state) and never "change password" (passwordless).
Update the `# why:` comment above the entry to explain the single-link decision
and cite the guarded-route redirect that makes it safe. No template change:
`layouts/_partials/header.html` already renders external links via
`findRE "://" .URL`.

### Step 2 — Verify

```pwsh
hugo --minify
```

Confirm exactly **one** auth link renders in the header `<ul id=menu>` in
`public/index.html`: `play.legendary-arena.com/?route=me`, labelled "Account",
and that `?route=login` no longer appears.

## Definition of Done

- [x] Two auth entries replaced by a single "Account" entry (`?route=me`, weight 60)
- [x] `hugo --minify` builds clean (exit 0)
- [x] Exactly one auth link in the rendered header; `?route=login` absent
- [ ] Commit on a `claude/*` (or `fix/*`) branch → PR → `origin/main`
- [ ] Post-deploy: the live `www` header shows a single "Account" link that lands
      on the live `play` `?route=me` page (and redirects to sign-in when
      signed out)

## What's NOT in scope

- **Auth-state-aware nav on `www`** ("signed in as …" / username greeting) — a
  static Hugo site cannot know auth state (D-24084). Making `www` auth-aware is a
  separate, larger effort that reverses D-24084 and depends on the play-side
  `/api/me/profile` returning `displayName`/`handle`. Tracked separately.
- **The label wording beyond "Account"** — if a different single label is desired
  ("Sign in", "My account"), that is a one-word config tweak, not a re-scope.
- **The Snipcart cart button** (WP-019) and the **Play / Cards** conversion links
  (WP-027) — unchanged.
