# WP-245 — Signup source capture (best-effort Brevo attribute)

**Status:** Done
**Lane:** Lightweight (single-purpose, additive)
**Depends on:** WP-015 (signup form + subscribe function), WP-018 (Brevo pipeline)
**Authoritative roadmap:** `docs/brevo/email-automation.md`
§"Planned enhancements (deferred until volume)" #2 (Source / topic segmentation)

## Motivation

Future list segmentation (email roadmap enhancement #2) needs to know
where each subscriber came from. That provenance cannot be backfilled,
so it is captured at signup time now — even though segmentation itself
stays deferred until subscriber volume warrants it. This WP ships the
capture only; it does not act on the data (no segmented sends, no
conditional logic).

## Scope

- `layouts/_partials/newsletter-form.html` — emit a hidden `source`
  field defaulting to the form's render location (`.id`); callers may
  override via a `.source` param.
- `assets/js/newsletter.js` — forward `source` in the subscribe request
  body when present (backward compatible: sends `{ email }` when absent).
- `functions/api/subscribe.js` — validate the optional `source`
  (kebab-case, ≤40 chars) and send it as the Brevo `SIGNUP_SOURCE`
  contact attribute.

## Fail-safe (lead capture never breaks)

Brevo rejects a contact create (HTTP 400) that carries an attribute not
yet provisioned in the dashboard. `subscribe.js` retries the create once
**without** attributes on a 400 (excluding the duplicate case, which
`updateEnabled` already handles), so a missing `SIGNUP_SOURCE` attribute
can never block a signup. Source capture is best-effort; lead capture is
not.

## Operator prerequisite

Create a text contact attribute named `SIGNUP_SOURCE` in the Brevo
dashboard. Until it exists, source values are silently dropped (by the
fail-safe retry) and only the email is stored — signups still succeed.

## Out of scope

- Acting on the captured source (segmentation, routing, segmented sends)
  — deferred per the email roadmap build trigger.
- `WORK_INDEX.md` registration — the marketing WP index is mid-rework on
  a parallel branch; register this row when that lands.

## Definition of Done

- [x] Form emits `source`; JS forwards it; `subscribe.js` stores it as
  `SIGNUP_SOURCE` with the HTTP-400 fail-safe retry.
- [x] `docs/brevo/email-automation.md` roadmap reflects the hedge as
  shipped.
- [ ] `SIGNUP_SOURCE` attribute created in Brevo (operator step).
