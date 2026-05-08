# Legendary Arena — Color Palette (v1 LOCKED for WWW)

**Status:** v1 LOCKED for WWW — Phase B; locked 2026-05-07 [^cross-site]
**Owner:** Jeffery Jensen
**Last updated:** 2026-05-07

> **Authority:** This document defines the canonical color tokens for
> Legendary Arena. It is subordinate to `01-VISION.md` and
> `docs/brand/strategy.md`. `static/brand-tokens.css` MUST be derived
> directly from this file; if they disagree, this file wins and the
> CSS is treated as broken until corrected. No color values may exist
> anywhere else in the project without explicit `// why:` justification.

[^cross-site]: "Locked for WWW" — verified against rendered pages at
`www.legendary-arena.com` under WP-003 on 2026-05-07. WCAG AA verified
on every contrast pair listed in §8 (computed values: see CHANGELOG.md
v1 lock entry). Cross-site consumption by `play.*` and `cards.*` is
verified separately under WP-007a / WP-007b and is explicitly carved
out of this lock. Breaking changes still require the major version
bump + coordinated consumer updates per `01-VISION.md` Global invariants.

---

## 1. Status

This file locks the **color decisions** of the brand. It does NOT cover:

- Typography (sizes, fonts, weights) → `typography.md`
- Spacing scale → `spacing.md`
- Token version history → `CHANGELOG.md`

This is a Phase B (tactical) artifact. Phase B exit criteria are
defined in `strategy.md §11`. Until those criteria are satisfied —
notably: tokens applied to a rendered Hugo page and reviewed in both
modes — this document remains "v1 DRAFT."

---

## 2. Design principles

The color system is built on:

- **Dark cinematic base** — depth, contrast, focus
- **High-contrast accents** — clarity and visual hierarchy
- **Functional semantics** — colors map to gameplay and UI roles
- **Token-first discipline** — no ad-hoc values
- **Light + dark modes** — every role defined for both, not just one

### Mode-switching contract

The active mode is selected by the value of the `data-theme` attribute
on the `<html>` element:

| `<html data-theme="...">` | Tokens active |
|---|---|
| `light` (default) | Light-mode block (defined under `:root`) |
| `dark` | Dark-mode block (defined under `html[data-theme="dark"]`) |

PaperMod's head/footer scripts resolve the user's choice (toggle button,
`localStorage`, or `prefers-color-scheme`) into one of these two values
before the page becomes interactive. Consumer sites (`play.*`,
`registry.*`) MUST set `data-theme` on `<html>` the same way to
inherit the correct tokens. A site using a different convention (e.g.,
a `.dark` class on `<body>`) will see the light tokens applied in
both modes — silent regression.

---

## 3. Token reference (light + dark mode)

### 3.1 Backgrounds

| Token | Light mode | Dark mode | Usage |
|---|---|---|---|
| `--la-color-bg-primary` | `#fdfcf8` | `#0b0f19` | Default page background |
| `--la-color-bg-secondary` | `#f3f1ea` | `#121826` | Sections, panels |
| `--la-color-bg-tertiary` | `#e8e5db` | `#1a2234` | Cards, overlays |

**Rationale (dark):** Deep navy-black avoids pure-black fatigue while
preserving cinematic tone. **Rationale (light):** Warm off-white reads
as paper-like, less harsh than pure white.

### 3.2 Surfaces

| Token | Light mode | Dark mode | Usage |
|---|---|---|---|
| `--la-color-surface` | `#ffffff` | `#1c2438` | UI containers, cards |
| `--la-color-surface-hover` | `#f8f6f0` | `#242f4a` | Hovered cards / buttons |

### 3.3 Text

| Token | Light mode | Dark mode | Usage |
|---|---|---|---|
| `--la-color-text-primary` | `#1a1d2e` | `#f5f7fb` | Main content |
| `--la-color-text-secondary` | `#4a5168` | `#a7b0c5` | Subtext, captions |
| `--la-color-text-muted` | `#767e94` | `#6e7893` | Low-emphasis text |

### 3.4 Borders

| Token | Light mode | Dark mode | Usage |
|---|---|---|---|
| `--la-color-border-subtle` | `#d8d3c5` | `#2a3550` | Dividers |
| `--la-color-border-strong` | `#b8b3a4` | `#3a4668` | Emphasis borders |

---

## 4. Brand colors

### 4.1 Gold (brand / achievement)

| Token | Light mode | Dark mode |
|---|---|---|
| `--la-color-gold` | `#b8901f` | `#d4af37` |
| `--la-color-gold-bright` | `#d4af37` | `#f0c94a` |
| `--la-color-gold-muted` | `#856710` | `#9e7c1c` |

**Roles:** brand identity · headlines · achievement / mastery states ·
victory / win states.

**Light-mode tuning:** values darkened from dark-mode equivalents to
maintain contrast on warm off-white backgrounds.

### 4.2 Red (action / CTA)

| Token | Light mode | Dark mode |
|---|---|---|
| `--la-color-red` | `#c92a30` | `#e5484d` |
| `--la-color-red-bright` | `#e5484d` | `#ff5c62` |
| `--la-color-red-muted` | `#8a1a1f` | `#a72d32` |

**Roles:** attack semantic · brand-red accents · alerts of moderate
urgency · gradient endpoints (`--la-gradient-hero`).

**Not for CTA button backgrounds** — use `--la-color-cta` (§4.2.1)
to satisfy the contrast contract. The dark variant `#e5484d` only
gives 3.91:1 with white text (below AA 4.5:1), so a separate
mode-stable token is required for button backgrounds.

**Distinct from error red** — see §5.3 constraint.

### 4.2.1 CTA (primary action backgrounds)

| Token | Light mode | Dark mode |
|---|---|---|
| `--la-color-cta` | `#c92a30` | `#c92a30` |
| `--la-color-cta-bright` | `#e5484d` | `#e5484d` |
| `--la-color-cta-muted` | `#8a1a1f` | `#8a1a1f` |

**Why mode-stable:** primary CTAs ("Play now") are the conversion
surface — the contrast contract is non-negotiable. White text on
`#c92a30` is 5.44:1 in both modes; white text on the dark `#e5484d`
is 3.91:1 (fails AA). Pinning CTA-button background across modes
keeps the contract intact without forcing brand red to a single value
everywhere.

**Roles:** primary CTA buttons (`.button`, `.btn`) · any element where
"white text on hero red" is required and AA contrast is mandatory.

**Hover** — use `--la-color-cta-bright` (`#e5484d`). The hover state
does not require AA contrast on white text because the user is no
longer reading the resting state; the brand-bright pop is intentional
for interactive feedback.

**Active** — use `--la-color-cta-muted` (`#8a1a1f`).

### 4.3 Blue (system / interaction)

| Token | Light mode | Dark mode |
|---|---|---|
| `--la-color-blue` | `#2563eb` | `#3b82f6` |
| `--la-color-blue-bright` | `#3b82f6` | `#60a5fa` |
| `--la-color-blue-muted` | `#1e40af` | `#1e40af` |

**Roles:** links · interactive elements · system feedback ·
recruit semantic.

---

## 5. Semantic colors

### 5.1 Success

| Token | Light mode | Dark mode |
|---|---|---|
| `--la-color-success` | `#15803d` | `#22c55e` |

**Roles:** confirmations, success states, "task complete" indicators.

### 5.2 Warning

| Token | Light mode | Dark mode |
|---|---|---|
| `--la-color-warning` | `#b45309` | `#f59e0b` |

**Roles:** non-blocking warnings, "review this" prompts.

**Distinct from gold:** warning is a system-state color (amber/orange
family); gold is a brand color (warm yellow). Do not interchange.

### 5.3 Error (distinct from CTA red)

| Token | Light mode | Dark mode |
|---|---|---|
| `--la-color-error` | `#991b1b` | `#dc2626` |

**Roles:** form validation errors, system-level failures, destructive
action confirmations.

#### Constraint — CTA red ≠ error red

Per `strategy.md §4`, CTA red and error red MUST be visually
distinguishable. The system MUST NOT alias one to the other.

| Mode | CTA red | Error red | Distinguishing factor |
|---|---|---|---|
| Light | `#c92a30` | `#991b1b` | Error is darker and more pure-red; CTA leans warmer |
| Dark | `#e5484d` | `#dc2626` | Error is more saturated; CTA leans pinkish |

**Failure mode:** if `--la-color-error` is ever defined as
`var(--la-color-red)` (or vice versa), the contract is broken.
Treat as W003 DoD failure.

---

## 6. Gameplay mapping

Mode-independent aliases that reference the per-mode tokens above.

| Concept | Token | Resolves to |
|---|---|---|
| Attack | `--la-color-attack` | `var(--la-color-red)` |
| Recruit | `--la-color-recruit` | `var(--la-color-blue)` |
| Victory / Mastery | `--la-color-victory` | `var(--la-color-gold)` |

These mappings must remain consistent across www, play, and registry.

---

## 7. Effects

### 7.1 Gradients (mode-dependent via composition)

Gradients reference per-mode tokens, so they automatically adapt
to light/dark:

| Token | Definition |
|---|---|
| `--la-gradient-gold` | `linear-gradient(90deg, var(--la-color-gold-muted), var(--la-color-gold-bright))` |
| `--la-gradient-hero` | `linear-gradient(135deg, var(--la-color-blue), var(--la-color-red))` |

### 7.2 Shadows (mode-dependent)

| Token | Light mode | Dark mode |
|---|---|---|
| `--la-shadow-soft` | `0 2px 8px rgba(26, 29, 46, 0.08)` | `0 2px 8px rgba(0, 0, 0, 0.4)` |
| `--la-shadow-strong` | `0 8px 24px rgba(26, 29, 46, 0.15)` | `0 8px 24px rgba(0, 0, 0, 0.6)` |

**Rationale:** Light-mode shadows use the text-primary color
(warm dark navy) at low opacity for cohesive feel; dark-mode shadows
use pure black at higher opacity for visible depth on dark surfaces.

---

## 8. Accessibility constraints

All color usage MUST satisfy:

- **Text contrast ≥ WCAG AA** (4.5:1 for body text, 3:1 for large text)
- Both light and dark modes must pass — verified per WP-003 and WP-014
- Focus rings (when implemented in WP-014) use a token-defined color
  visible against both surface and bg-primary in both modes

### Smoke-test contrast pairs

These pairs MUST pass AA at v1 lock:

| Foreground | Background | Mode | Required |
|---|---|---|---|
| `--la-color-text-primary` | `--la-color-bg-primary` | Both | AAA preferred, AA mandatory |
| `--la-color-text-secondary` | `--la-color-bg-primary` | Both | AA |
| `--la-color-text-muted` | `--la-color-bg-primary` | Both | AA (large text only) |
| `--la-color-blue` (link) | `--la-color-bg-primary` | Both | AA |
| White text | `--la-color-cta` (button bg) | Both | AA on button text |
| White text | `--la-color-error` (alert bg) | Both | AA on alert text |

Verification happens during WP-003 (theme application) and is
re-verified during WP-014 (accessibility baseline).

---

## 9. Token usage rules

- **No raw hex values** permitted outside `static/brand-tokens.css`
- **All styling** must reference tokens by name
- **Tokens are stable within v1** — additions are non-breaking,
  redefinitions require version bump (per `CHANGELOG.md` rules)
- **Breaking changes** require:
  - Major version bump (v1 → v2)
  - `CHANGELOG.md` entry with rationale
  - Coordinated consumer updates (per `01-VISION.md` Global invariants)

---

## 10. Failure modes

The palette is **degraded** if any of the following appears in
shipped output. Treat each as a failure condition that fails W003 DoD.

- **Raw hex value in CSS** outside `brand-tokens.css` (e.g.,
  `color: #ff0000` in a partial or content file)
- **Mode mismatch** — a token used in light mode that wasn't defined
  for light mode (or vice versa)
- **CTA red used as error** or **error red used as CTA** — violates
  §5.3 constraint
- **Brand gold used as warning** — gold is brand/achievement; warning
  is amber. Don't interchange semantics.
- **Contrast ratio drop** below WCAG AA on any pair listed in §8
- **Inline `style="color: ..."`** on rendered HTML (no exceptions in
  marketing copy; WP-003 overrides may use them with `// why:`)

---

## 11. Phase B exit criteria (palette portion)

Per `strategy.md §11`, the palette-related exit conditions are:

- [ ] All hex values in this file present in `static/brand-tokens.css`
      with matching token keys
- [ ] No hardcoded hex values anywhere else in the repo
      (`assets/`, `layouts/`, `content/`, `themes/PaperMod` overrides)
- [ ] WCAG AA verified on all contrast pairs in §8 — both modes
- [ ] Light and dark modes both render cleanly in `hugo server`
      preview after WP-003 lands

When all four conditions hold, palette status changes from "v1 DRAFT"
to "v1 LOCKED" with a `CHANGELOG.md` entry recording the lock date.

---

## 12. Source / change log

This file derives from the directions in `strategy.md §4`. Token
contract version history lives in `CHANGELOG.md`. This local log
tracks revisions to *this document* during the draft phase.

| Date | Change |
|---|---|
| 2026-05-07 | Initial palette definition. Light + dark mode variants for all colors. Distinct error red (`#991b1b` light, `#dc2626` dark) — separated from CTA red per `strategy.md §4` constraint. |
| 2026-05-07 | WP-003 verification: documented mode-switching contract under §2 — dark mode activates via `html[data-theme="dark"]` (PaperMod's convention), not `.dark` class. Fix landed in `brand-tokens.css` selector. |
| 2026-05-07 | WP-003 verification: added `--la-color-cta` / `-bright` / `-muted` (§4.2.1). Mode-stable CTA token at `#c92a30` in both modes. Required because dark `--la-color-red` (`#e5484d`) only reaches 3.91:1 with white text — fails palette.md §8 row 5 (AA on button text). `--la-color-red` retains its per-mode tuning for non-button uses (gradients, attack semantic, accents). Additive change per §11 token-stability rule. |
