# WP-034 — Header nav simplify (Cards domain + drop Brand from header)

Two header-menu changes to `C:\www\legendary-arena-com\hugo.toml`, requested by
the operator on 2026-07-16:

1. **Cards → `cards.legendary-arena.com`.** The registry now answers at
   `https://cards.legendary-arena.com/` (verified live, HTTP 200, 2026-07-16).
   Point the header **Cards** link there instead of
   `https://cards.barefootbetters.com/`. The footer **Cards** link rides along —
   leaving the two surfaces on different domains would be inconsistent.
2. **Remove Brand from the header.** Fewer header choices; **Brand** remains in
   the footer menu, which already carries it.

## Authority

This amends the 2026-05-07 v1 decision ("Registry stays at
`cards.barefootbetters.com` for v1") for the two **nav menus only** — the
domain the site links to, per operator instruction 2026-07-16. The broader
documentation sweep (`docs/01-VISION.md`, `docs/corporate-memory/`, brand docs,
older WPs) still references `cards.barefootbetters.com` as v1-canonical and is
**out of scope** here; see What's NOT in scope.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for `www.legendary-arena.com`.

## Current state

`hugo.toml` `[[menu.main]]` (post-WP-033): About 10, Blog 20, Tags 22, Shop 25,
Brand 30, Play 40, Cards 50 (`cards.barefootbetters.com`), Account 60.
`[[menu.footer]]`: About, Blog, Shop, Brand, Play, Cards
(`cards.barefootbetters.com`).

## Task

### Step 1 — Config edits (`hugo.toml` only)

- Delete the `[[menu.main]]` `brand` entry (weight 30); leave a comment noting
  Brand is footer-only by intent.
- Change `menu.main` `cards` URL to `https://cards.legendary-arena.com/`.
- Change `menu.footer` `footer-cards` URL to `https://cards.legendary-arena.com/`.
- No template change: `layouts/_partials/header.html` already renders external
  links via `findRE "://" .URL`.

### Step 2 — Verify

```pwsh
hugo build
```

Rendered header `<ul id=menu>` in `public/index.html` shows About, Blog, Tags,
Shop, Play, Cards, Account — no Brand; Cards href is
`https://cards.legendary-arena.com/`; `cards.barefootbetters.com` absent from
the homepage; footer still contains `/brand/`.

## Definition of Done

- [x] Header Cards → `https://cards.legendary-arena.com/` (weight 50 unchanged)
- [x] Footer Cards → `https://cards.legendary-arena.com/`
- [x] Brand removed from `[[menu.main]]`; still present in `[[menu.footer]]`
- [x] `hugo build` clean; rendered header/footer verified as above
- [ ] Commit on a `claude/*` branch → PR → `origin/main`
- [ ] Post-deploy: live `www` header shows no Brand link and Cards lands on
      `https://cards.legendary-arena.com/`

## What's NOT in scope

- **Documentation sweep for the registry domain.** ~30 files (VISION, roadmap,
  corporate memory, brand docs, older WPs, content pages such as
  `content/about/_index.md` and `content/brand/_index.md`) still cite
  `cards.barefootbetters.com`. Historical WPs/roadmap entries are records and
  should not be rewritten; live content pages and VISION deserve their own
  scoped pass once the old domain's redirect posture is confirmed.
- **The Tags header entry** — deliberate per WP-017 (post discovery across 55
  tagged posts); untouched here.
- **Removing Brand from the footer** — it stays discoverable there by design.
- **DNS / deploy config for `cards.legendary-arena.com`** — already live;
  owned by the engine-repo side.
