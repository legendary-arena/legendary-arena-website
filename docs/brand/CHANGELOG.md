# Brand Tokens — Changelog

This file records every published version of `static/brand-tokens.css`.

Cross-origin consumers (`play.legendary-arena.com`,
`cards.barefootbetters.com`) depend on this contract. Per
`01-VISION.md` Global invariants, breaking changes require a major
version bump (v1 → v2) AND coordinated consumer updates BEFORE the
new version publishes.

---

## v1 (2026-05-07) — DRAFT

**Status:** Draft, not yet locked. Pending Phase B review against
rendered output (WP-003) before status changes to "Locked."

Initial token set covering:

- **Colors:** backgrounds (3), surfaces (2), text (3), borders (2),
  brand (gold/red/blue × 3 variants each), semantic
  (success/warning/error), gameplay mapping
  (attack/recruit/victory). Light + dark mode variants for all.
- **Typography:** font families (display/body/mono), full type scale
  (H1–H6 + body + small) with sizes, line heights, weights, and
  letter-spacing tokens. Per-heading line-height and weight tokens
  per WP-002 DoD.
- **Spacing:** 8-pt scale (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96).
- **Border radius:** sm / md / lg / xl / pill.
- **Z-index layers:** base / dropdown / sticky / overlay / modal /
  toast.
- **Transitions:** fast / base / slow.
- **Effects:** brand gradients, soft + strong shadows (per-mode).

Source: `docs/brand/strategy.md` Phase A directions.

### Known TBD before lock

- **Color values reviewed against rendered pages** — current values
  are educated defaults; should be tweaked after WP-003 lands and
  the site is viewable in both modes
- **Light-mode brand color contrast** — gold/red/blue darkened for
  light backgrounds; verify Lighthouse a11y ≥ 90 on actual pages
- **Display font choice** — currently first-of-fallback-stack
  ("Bebas Neue"); confirm or substitute after seeing it in headers
- **Body font choice** — currently first-of-fallback-stack
  ("Inter"); confirm or substitute after reading long-form content

### Consumers at v1

- `www.legendary-arena.com` — direct (loads from `static/`)
- `play.legendary-arena.com` — cross-origin link (when WP-007a lands)
- `cards.barefootbetters.com` — cross-origin link (when WP-007b lands)

---

## How to bump versions

**Patch / additive (no version bump):**
- Adding new tokens (e.g., `--la-color-info`)
- Adding new gradient or shadow variants
- Refining values without changing the *role* a token plays

**Major version bump (v1 → v2):**
- Renaming a token (consumers reference the old name)
- Removing a token
- Changing a token's *role* (e.g., `--la-color-gold` repurposed for
  something other than achievement/brand)
- Changing the *contract* of how the file is consumed (e.g., adding
  required CSS classes consumers must apply)

**Bump procedure for major versions:**

1. Update version header in `brand-tokens.css`
2. Update consumers (`arena-client`, `registry-viewer`) BEFORE
   publishing the new file
3. Add CHANGELOG entry describing what changed and why
4. Coordinate deploy: consumers first, then this site
5. Note in `01-VISION.md` Decisions log
