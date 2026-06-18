# WP-027 — Header conversion links (Play + Cards)

Surface the two primary external conversion destinations — **Play**
(`play.legendary-arena.com`) and **Cards** (`cards.barefootbetters.com`)
— in the header navigation, not just the footer. Single-file config
change to `C:\www\legendary-arena-com\hugo.toml`.

This file is the **session-ready execution pack**. The design source
of truth is [`docs/03-ROADMAP.md`](../../03-ROADMAP.md). If this file
and the roadmap conflict, the roadmap wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`.

## Current state

`[[menu.main]]` (header) contains About / Blog / Tags / Shop / Brand
plus the Snipcart cart button and the Pagefind search stub. Play and
Cards exist **only** in `[[menu.footer]]` (WP-010), so the primary app
and card-registry destinations are buried below the fold. The home
hero already carries the principal "Play now" CTA button
(`layouts/index.html`), but the persistent header offered no path to
Play or Cards.

## Task

### Step 1 — Add the menu entries

Append two `[[menu.main]]` entries in `hugo.toml`, after the `brand`
entry (weight 30):

| Item | URL | Weight |
|---|---|---|
| Play | `https://play.legendary-arena.com/` | 40 |
| Cards | `https://cards.barefootbetters.com/` | 50 |

These are the first **external** items in `menu.main`. The header
partial (`layouts/_partials/header.html`) already detects external
links via `findRE "://" .URL` and renders the outbound-link SVG icon,
so no template change is required.

### Step 2 — Verify

```pwsh
hugo --minify
```

Confirm both links render inside the header `<ul id=menu>` in
`public/index.html` (note: `--minify` strips attribute quotes, so grep
for `play.legendary-arena.com` / `cards.barefootbetters.com`).

## Definition of Done

- [x] Play + Cards added to `[[menu.main]]` (weights 40 / 50)
- [x] `hugo --minify` builds clean (exit 0)
- [x] Both links present in the rendered header menu in `public/index.html`
- [ ] Commit on a `claude/*` branch → PR → `origin/main`

## What's NOT in scope

- **"Log In" link** — no marketing-site login URL is defined; app
  login lives on `play.legendary-arena.com`. Add a `[[menu.main]]`
  entry once a destination exists.
- **New-tab behavior** — unlike `footer.html`, `header.html` does not
  add `target="_blank"` to external menu items, so Play/Cards open in
  the same tab. Intentional for now (a destination, not a reference
  link); changing it is a `header.html` edit, not a config change.
- **Mobile nav restyling / flex-wrap tuning** — the header gained two
  items; if wrap behavior regresses, that is a separate `custom.css`
  follow-up (cf. WP-010 Step 4.6 / WP-011).
