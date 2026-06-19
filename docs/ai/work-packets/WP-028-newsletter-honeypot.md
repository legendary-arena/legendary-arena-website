# WP-028 — Newsletter honeypot spam trap

Add a honeypot field to the newsletter signup so naive form-scraping
bots are silently dropped before they reach Brevo. Touches the form
partial, the progressive-enhancement JS, the Cloudflare Pages Function,
and its test.

This file is the **session-ready execution pack**. The design source
of truth is [`docs/03-ROADMAP.md`](../../03-ROADMAP.md). If this file
and the roadmap conflict, the roadmap wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`.

## Current state

The newsletter endpoint (`functions/api/subscribe.js`, WP-015) gates
submissions on three things only: a CORS origin allowlist, a
`Content-Type: application/json` check, and an email-format regex.
There is **no bot mitigation** — a form-scraping bot that fills every
field and POSTs is accepted and written to Brevo.

## Task

### Step 1 — Honeypot field (`layouts/_partials/newsletter-form.html`)

Add an off-screen `company` text input that real users never see:
wrapped in `<div class="newsletter-hp">` positioned at `left:-9999px`,
with `aria-hidden="true"`, `tabindex="-1"`, and `autocomplete="off"`.
Off-screen (not `type=hidden` / `display:none`) so naive bots still
fill it; `company` is not a standard autofill token, which limits false
positives.

### Step 2 — Forward the field (`assets/js/newsletter.js`)

Read the `company` input and include it in the JSON `fetch()` body only
when non-empty (a real user leaves it blank).

### Step 3 — Server-side drop (`functions/api/subscribe.js`)

Destructure `company` from the request body. When it is a non-empty
string, return a **fake** `{ ok: true }` (HTTP 200) and never call
Brevo, so a caught bot gets no signal to adapt. Place the check
immediately after JSON parse, before email validation.

### Step 4 — Test (`functions/api/subscribe.test.js`)

Add a case: a body with a filled `company` returns 200 `{ ok: true }`
and `fetch` is **not** called.

### Step 5 — Verify

```pwsh
npm test          # all green, including the new honeypot case
hugo --minify     # form renders; grep public/index.html for name=company
```

## Definition of Done

- [x] Off-screen `company` honeypot in `newsletter-form.html`
- [x] `newsletter.js` forwards `company` only when filled
- [x] `subscribe.js` silently drops non-empty `company` without calling Brevo
- [x] New vitest case passes; full suite green (13/13)
- [x] `hugo --minify` builds clean; honeypot present in `public/index.html`
- [ ] Commit on a `claude/*` branch → PR → `origin/main`

## What's NOT in scope

- **CAPTCHA / Cloudflare Turnstile** — a heavier, higher-friction layer.
  The natural next step if bot volume warrants it; a separate decision.
- **Rate limiting** on `/api/subscribe`.
- **Blind direct-POST bots** — a bot that POSTs straight to the endpoint
  without the `company` field is unaffected by the honeypot; it is still
  gated only by the origin allowlist and email validation. The honeypot
  catches form-scrapers, not blind API spammers. Documented honestly in
  `wiki/hugo-web-system.md` § Spam protection.
