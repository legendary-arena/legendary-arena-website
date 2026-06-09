# WP-024 — Diorama page: product image + placeholder buy button

**Type:** Site change (diorama landing page — commerce evolution)
**Status:** 🔄 In progress
**Supersedes:** WP-023's locked "demand capture, not commerce" decision
and its SB7 single-CTA constraint (operator-directed pivot, 2026-06-09).
**Depends on:** WP-023 (the page), WP-019 (Snipcart — for the eventual
real checkout).

## Context

Operator-directed evolution of the `/diorama/` page from a pure
demand-capture waitlist toward a product surface. The `01-VISION.md`
boundary (2026-06-08) already scopes the site to "market and **sell**
the line," so this begins the sell side. Per the GTM roadmap the Starter
Kit doesn't ship until ~May 2027, so the buy control is a **placeholder**
for now — real Snipcart checkout is deferred until price, SKU, and a
sale model (pre-order framing) are finalized.

## Changes

1. **Hero product image** —
   `static/images/products/diorama/diorama-high-tech-800px.jpg`
   (800×525 spec render, operator-supplied, no third-party IP) added to
   the hero via a `heroImage` front-matter field.
2. **Remove the hero newsletter widget** — the duplicate top signup is
   dropped; the closing newsletter (the waitlist) stays as the secondary
   capture.
3. **Placeholder "Buy now" button** — styled with the existing `.button`
   (§5.2 CTA), linking to `#waitlist` (the on-page conversion point). No
   Snipcart/checkout wired yet; no price/SKU. (Operator chose the
   placeholder option, 2026-06-09.)

## Scope

- `content/diorama/_index.md` — add `heroImage` + `heroImageAlt`.
- `layouts/diorama/list.html` — render the hero image; replace the hero
  newsletter block with the Buy now button.
- `assets/css/extended/custom.css` §12 — hero image + button spacing
  (tokens only).
- `static/images/products/diorama/diorama-high-tech-800px.jpg` — asset.
- `docs/03-ROADMAP.md` — WP-024 entry; WP-023 status → Done.

## Out of scope / follow-on

- **Real checkout** — a Snipcart diorama product (price, SKU, page-
  validated price), pre-order framing + "ships ~2027" microcopy. A
  future WP once product/pricing is final.
- **Diorama-ICP email segmentation** — still WP-018/020 funnel work.

## Notes

- This intentionally relaxes WP-023's single-CTA rule: the page now has a
  primary "Buy now" + a secondary newsletter — the normal commerce
  pattern. The other WP-023 / SB7 constraints (no required Marvel
  familiarity, tokens-only CSS, scope discipline) still hold.
- No formal pre-flight: this modifies an existing page (no new top-level
  section, no `hugo.toml` / theme / brand-token change), so the `01.4`
  mandatory gates don't apply.

## Follow-up (2026-06-09) — duplicate opt-in fix

The closing diorama waitlist form and the global footer newsletter
rendered back-to-back (two opt-ins at the page bottom). Fixed by keeping
the page's tailored waitlist form (the `#waitlist` target) and
suppressing the *footer* newsletter on this page only:

- `layouts/_partials/footer.html` — the footer newsletter is now gated
  by a `hideFooterNewsletter` front-matter flag (defaults to shown,
  mirroring the existing `hideFooter` pattern).
- `layouts/baseof.html` — added `(.Param "hideFooterNewsletter")` to the
  `partialCached "footer.html"` cache key. Without it, `partialCached`
  reused the shared section-page footer across pages and silently
  ignored the flag.
- `content/diorama/_index.md` — `hideFooterNewsletter: true`.

Every other page is unchanged (footer newsletter still shown).
