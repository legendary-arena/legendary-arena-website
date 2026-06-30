# WP-031 — Header auth links (Sign in + My account)

Surface the game's existing sign-in and profile destinations — **Sign in**
(`play.legendary-arena.com/?route=login`) and **My account**
(`play.legendary-arena.com/?route=me`) — in the header navigation. Single-file
config change to `C:\www\legendary-arena-com\hugo.toml`. This completes the
"Log In" entry that [WP-027](WP-027-header-conversion-links.md) deferred
("no marketing-site login URL exists yet").

## Authority

Decided by the **engine repo's** `docs/ai/DECISIONS.md` **D-24084** (2026-06-30):
`www.legendary-arena.com` stays a static marketing surface and does **not** own
an authentication surface — it links to the existing Hanko sign-in/profile on
`play`. Commerce needs no `www`-owned login either (the shop checks out via
Snipcart, WP-019; in-game purchases via Stripe-on-Hanko). If this file and
D-24084 conflict, D-24084 wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for `www.legendary-arena.com`.

## Current state

`[[menu.main]]` (header) contains About / Blog / Tags / Shop / Brand plus the
external Play / Cards links (WP-027), the Snipcart cart button, and the Pagefind
search stub. There is **no sign-in or account link** — WP-027 explicitly left
the "Log In" entry out because no decision and no destination existed. The
game's sign-in (`?route=login`) and owner profile (`?route=me`) have shipped on
`play.legendary-arena.com` (engine WP-160 / WP-104), and D-24084 has now decided
that `www` links to them rather than growing its own sign-in surface.

## Task

### Step 1 — Add the menu entries

Append two `[[menu.main]]` entries in `hugo.toml`, after the `cards` entry
(weight 50):

| Item | URL | Weight |
|---|---|---|
| Sign in | `https://play.legendary-arena.com/?route=login` | 60 |
| My account | `https://play.legendary-arena.com/?route=me` | 70 |

These are external items (like Play / Cards); the header partial
(`layouts/_partials/header.html`) already detects external links via
`findRE "://" .URL` and renders the outbound-link SVG icon, so **no template
change is required**. A `# why:` comment above the entries cites D-24084 and the
passwordless copy rule.

### Step 2 — Verify

```pwsh
hugo --minify
```

Confirm both links render inside the header `<ul id=menu>` in `public/index.html`
(note: `--minify` strips attribute quotes, so grep for
`play.legendary-arena.com/?route=login` and `?route=me`).

## Definition of Done

- [ ] Sign in + My account added to `[[menu.main]]` (weights 60 / 70)
- [ ] `hugo --minify` builds clean (exit 0)
- [ ] Both links present in the rendered header menu in `public/index.html`
- [ ] Commit on a `claude/*` branch → PR → `origin/main`
- [ ] Post-deploy: the live `www` header shows "Sign in" + "My account", each
      landing on the live `play` `?route=login` / `?route=me` page

## What's NOT in scope

- **A sign-in form, Hanko SDK, session handling, or any authenticated API call
  on `www`** — the site stays static; auth lives entirely on `play` (D-24084).
  This change is config-only; `header.html` is byte-identical.
- **Auth-state-aware nav** ("signed in as …" / "Log out") — a static Hugo site
  cannot know auth state. The copy is fixed: "Sign in" / "My account", never a
  "Log in / Log out" toggle and never "change password" (the model is
  passwordless). Any auth-state-aware header is a `play`-side concern.
- **New-tab behavior** — like Play / Cards (WP-027), these open in the same tab;
  changing that is a `header.html` edit, not a config change.
- **The Snipcart cart button** (WP-019) — cart checkout is unchanged; it is not
  a Hanko sign-in.
