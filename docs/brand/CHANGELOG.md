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
  (success/warning/error). Error red is a **distinct hex from CTA
  red** (`#991b1b` light / `#dc2626` dark) per `strategy.md §4` +
  `palette.md §5.3` constraint — must not be aliased. Gameplay
  mapping: attack/recruit/victory. Light + dark mode variants for
  all colors.
- **Typography:** font families (display/body/mono), full type scale
  with **hero (3.5rem) + H1–H6 + body + small** sizes, per-role line
  heights and weights, generic line-height/weight tokens for
  specialized layouts, and letter-spacing tokens (tight / normal /
  wide / display). Per-heading line-height and weight tokens per
  WP-002 DoD. Hero tier added above H1 for above-the-fold display
  text per `typography.md §4.1`.
- **Spacing:** 8-pt scale (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96).
  Documented in `spacing.md §3`.
- **Border radius:** sm / md / lg / xl / pill. Documented in
  `spacing.md §4`.
- **Z-index layers:** base / dropdown / sticky / overlay / modal /
  toast. Documented in `spacing.md §5`.
- **Transitions:** fast (120ms) / base (180ms) / slow (280ms).
  Documented in `spacing.md §6`.
- **Effects:** brand gradients, soft + strong shadows (per-mode).
  Documented in `palette.md §7`.

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

### Pre-lock fix (2026-05-07, during WP-003 verification)

- **Dark-mode selector corrected.** The dark block was scoped to
  `.dark { ... }`, but PaperMod toggles modes via
  `<html data-theme="dark">`. The `.dark` class is never applied,
  so LA dark tokens were silently inert — the visible mode change
  came from PaperMod's own `--theme` variables, not LA tokens.
  Selector changed to `html[data-theme="dark"]`. Documented in
  `palette.md §2 Mode-switching contract`. No token *values* changed;
  this is a routing fix only.

- **`--la-color-cta` / `-bright` / `-muted` added (additive).** The
  dark variant of `--la-color-red` (`#e5484d`) only achieves 3.91:1
  with white text — below WCAG AA's 4.5:1 for small text — failing
  `palette.md §8` row 5 ("white on red CTA — AA, both modes"). Adding
  a mode-stable CTA token at `#c92a30` in both modes lifts that pair
  to 5.44:1 in both modes. `--la-color-red` keeps its per-mode tuning
  for non-button uses (attack semantic, gradients, brand-bright accents).
  Per §11 token-stability rule, additive token changes are non-breaking
  within a major version, so this remains v1 (no v2 bump).

- **PaperMod color compatibility shim.** `assets/css/extended/custom.css`
  redefines PaperMod's named CSS custom properties (`--theme`,
  `--primary`, `--secondary`, `--code-bg`, etc.) as aliases for LA
  brand tokens. PaperMod's own rules render in LA colors automatically
  through this alias layer. Specificity matches PaperMod's
  `:root[data-theme=dark]` (0,2,0) so the cascade resolves correctly
  in both modes. Not a token *value* change — just routing.

- **Touch target + footer contrast fixes.** WP-003 verification ran
  Lighthouse and found two real issues: (a) header logo `<a>` was 17px
  tall, below WCAG 2.5.8 24×24 minimum; fixed by adding
  `padding-block: var(--la-space-2)` to `.logo a` in custom.css, raising
  the touch area to ~33px without altering visible type. (b) footer
  used `--la-color-text-muted` for 14px (small) text — but palette.md §8
  ties text-muted to "AA large only"; corrected to `--la-color-text-secondary`
  for 7.04:1 contrast. Footer background also pinned to
  `--la-color-bg-primary` so the footer surface matches the rest of the
  page. Verified Lighthouse a11y = 100, contrast pairs all pass AA.

- **Favicon placeholders.** Added 1×1 transparent PNG placeholders for
  `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
  `apple-touch-icon.png`, and a minimal `safari-pinned-tab.svg` to stop
  console 404s emitted by PaperMod's hardcoded `<link rel="icon">` tags.
  Real branded favicons follow real logo design (deferred per
  `01-VISION.md` Decisions log).

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
