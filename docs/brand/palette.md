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
| `--la-color-red` | `#7a1d1f` | `#a83034` |
| `--la-color-red-bright` | `#a83034` | `#c44248` |
| `--la-color-red-muted` | `#4d0d10` | `#7a1d1f` |

**Roles:** attack semantic · brand-red accents · alerts of moderate
urgency · gradient endpoints (`--la-gradient-hero`).

**Tonal direction:** brand red sits in the **deep maroon** family —
not cherry / scarlet. The intent is mature and cinematic, paired
with the gold-led identity. The whole scale was shifted darker on
2026-05-08 (see §12 changelog).

**Not for CTA button backgrounds** — use `--la-color-cta` (§4.2.1)
to satisfy the contrast contract. The mode-stable CTA tokens are
pinned to the new maroon scale (cohesive with brand) and clear
WCAG AAA on white text.

**Distinct from error red** — see §5.3 constraint. Error red is in
the *pure-red* family (`#991b1b` / `#dc2626`); brand red is in the
*maroon* family. They MUST remain visually distinguishable.

### 4.2.1 CTA (primary action backgrounds)

| Token | Light mode | Dark mode |
|---|---|---|
| `--la-color-cta` | `#7a1d1f` | `#7a1d1f` |
| `--la-color-cta-bright` | `#a83034` | `#a83034` |
| `--la-color-cta-muted` | `#4d0d10` | `#4d0d10` |

**Why mode-stable:** primary CTAs ("Play now") are the conversion
surface — the contrast contract is non-negotiable. White text on
`#7a1d1f` is ~10.4:1 in both modes (AAA pass, well above the 4.5:1
AA threshold). Pinning CTA across modes keeps the contract intact
even if brand red receives further per-mode tuning.

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
| `--la-color-blue` | `#1e3a8a` | `#3753b8` |
| `--la-color-blue-bright` | `#1d4ed8` | `#3b82f6` |
| `--la-color-blue-muted` | `#172554` | `#172554` |

**Roles:** links · interactive elements · system feedback ·
recruit semantic.

**Tonal direction:** brand blue sits in the **deep navy** family
(Captain America / X-Men Beast territory) — not bright royal blue.
The whole scale was shifted darker on 2026-05-08 (see §12 changelog)
to match the deep-maroon brand red and reinforce the cinematic,
mature identity.

**Role discipline (post-2026-05-08 navy shift):** the deeper navy
in `--la-color-blue` reads less "clickable" than royal blue
historically did. Discipline:

- `--la-color-blue`: base system/structural tone — used for
  headers, decorative blue surfaces, gradient endpoints. May be
  darker; affordance is *not* its primary job.
- `--la-color-blue-bright`: MUST be used for interactive
  affordances — links, focus rings, hover states, active
  selection. The brighter variant carries the click-signal that
  the deeper base no longer does on its own.

Failure mode (add to §10): using `--la-color-blue` directly on
a link or interactive element. The element will read as
decorative rather than clickable.

### 4.4 Class colors (per-hero-class identity)

Class colors live one layer below brand identity (§4.1–§4.3) and one
layer above gameplay mapping (§6). They identify a hero's *gameplay
class*, not the *product*. Brand stays restrained at three colors;
gameplay is expressive across five. That asymmetry is intentional —
brand recognizes the property, gameplay distinguishes the play
within it.

| Token | Value | Source |
|---|---|---|
| `--la-color-class-strength` | `#40b93c` | `class-strength.svg` (primary fill) |
| `--la-color-class-strength-muted` | `#164b33` | `class-strength.svg` (depth/shadow) |
| `--la-color-class-covert` | `#ee2223` | `class-covert.svg` (primary fill) |
| `--la-color-class-covert-muted` | `#ae2136` | `class-covert.svg` (depth/shadow) |
| `--la-color-class-instinct` | `#f9b00b` | `class-instinct.svg` (primary fill) |
| `--la-color-class-instinct-muted` | `#92400e` | derived (icon has no shadow source) |
| `--la-color-class-ranged` | `#31a5d6` | `class-ranged.svg` (primary fill) |
| `--la-color-class-ranged-muted` | `#155e75` | derived (icon has no shadow source) |
| `--la-color-class-tech` | `#a7a5a6` | `class-tech.svg` (primary fill) |
| `--la-color-class-tech-muted` | `#666666` | `class-tech.svg` (depth/shadow) |

**Mode-stability:** class colors are mode-stable — same value in
light and dark. Class identity does not change with theme. All five
classes carry both bright + muted pairs. The strength, covert, and
tech muted values come from shadow regions in the production icons;
the instinct and ranged muted values are *derived* (the production
icons don't include shadow companions). If the icons are revised to
add shadow tones for instinct or ranged, those tokens should be
re-anchored to the icon source.

**Roles:** UI keyed to a specific hero class — class chips, filter
states, deck-builder selection highlights, card borders by class,
hero-grouping visuals, class-tag indicators.

**Usage patterns (guidance, not tokens):** within those roles,
class colors should be applied using one of the following
patterns, depending on context:

- **Border-accent** — 1–2px border using the class color; neutral
  fill behind it. Lowest-intensity application; safe at any size.
- **Chip-fill** — class color as the chip background with
  contrast-paired text. Use the bright variant under dark text,
  or the muted variant under light text — pick the pair that
  clears WCAG AA for the specific text size.
- **Icon-accent** — class color applied to the icon glyph only;
  surrounding surface stays neutral. Common for class-tag
  indicators.
- **Selection-state** — class color used as a highlight outline,
  underline, or active-state ring around an otherwise-neutral
  element. Common for deck-builder selection.

Avoid **full-surface fills** in large areas unless the element is
explicitly class-identified (e.g., a deck-builder pane that *is*
the strength class, or a class-page hero band). Full-surface fills
on incidental UI tend to over-claim class-membership and read as
brand colour rather than gameplay tag.

These patterns lock visual grammar — so "this card is
strength-class" reads consistently whether the cue is a border
on the card list, a chip on the hover-card, or an icon-accent in
the deck-builder. No new tokens are introduced; the existing
ten class tokens cover all four patterns.

**Non-role constraint:** class colors MUST NOT be used for brand
identity, CTA elements, system-level semantics, marketing visuals,
or logo decoration. Class colors communicate *gameplay role*, not
*product identity*.

**Source asset reference:** values are derived from the production
hero-class icons at
`barefootbetters-legendary-setup/public/img/icons/hero-classes/`.
If those icons are revised, this token group must be re-verified.

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
| Light | `#7a1d1f` | `#991b1b` | CTA is deep maroon (brown-leaning); error is dark pure red. Gap is tighter than v1 (cherry vs error) — verify visually before lock. |
| Dark | `#7a1d1f` | `#dc2626` | CTA is mode-stable maroon; error is bright red. Wide visual gap. |

**Distinguishing rule:** error red MUST remain perceptibly more
saturated and more chromatically pure than CTA red in both modes.
CTA red is permitted to shift toward maroon / brown (per §4.2
brand-direction notes); error red MUST remain in the *pure-red*
family. This rule prevents future drift from collapsing the two
into the same hue neighborhood. Any future redefinition of
`--la-color-error` or `--la-color-cta` must satisfy this rule
before merging.

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

**Tonal note (post-2026-05-08 brand shift):** `--la-gradient-hero`
now spans **navy → maroon** (was royal-blue → cherry-red). Visual
character shifts from "energetic SaaS" to "muted cinematic." This
is consistent with the brand iteration. If a more energetic
gradient is needed in marketing surfaces, compose explicitly with
the `-bright` variants (e.g., `var(--la-color-blue-bright)` and
`var(--la-color-red-bright)`) rather than redefining
`--la-gradient-hero` itself.

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

### 9.1 Exception — Early Lock Revision Window

A palette redefinition that would otherwise trigger §9's
"redefinitions require version bump" rule may proceed within
24–72 hours of initial lock without a v2 bump, provided **all**
of the following hold:

- No downstream consumers (`play.*`, `registry.*`, brand
  satellites) have integrated the locked tokens
- All affected tokens are updated atomically across `palette.md`,
  `palette.svg`, and `static/brand-tokens.css`
- §12 changelog records the redefinition explicitly with rationale

After this window closes, §9's breaking-change rules apply
strictly: any redefinition triggers v1 → v2 with coordinated
consumer updates per `01-VISION.md` Global invariants.

**Window status — v1 lock (locked 2026-05-07):** OPEN through
**2026-05-10 23:59 local**, OR until a downstream consumer
integrates the v1 tokens in production, whichever comes first.
Subsequent revisions during this window are recorded in §12 with
explicit "(Early Lock Revision Window)" tagging.

**At window close:**

- Palette status reverts to strict enforcement of §9 rules
- Any further token redefinitions require a major version bump
  (v1 → v2) with coordinated consumer updates per
  `01-VISION.md` Global invariants
- The exception is *not* extended by silence; closure occurs at
  the deadline above regardless of whether a §12 closure entry
  has been written

**Window closure recording:** the closure event itself is
asserted in §12 changelog when brand iteration stabilises (or
at the deadline, whichever comes first). After closure, this
exception clause remains in the document as a precedent for
future v(n) lock periods, but does NOT auto-renew — each new
major version's window must be opened explicitly by an entry in
§12.

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
- **Class color used as brand identity** — violates §4.4 role
  constraint. Class tokens are scoped to gameplay classification, not
  brand or marketing usage. Examples that fail: green hexagon mark
  from `--la-color-class-strength`; red CTA from
  `--la-color-class-covert`; using `--la-color-class-tech` as a
  neutral surface.
- **Decorative blue used as interactive affordance** — using
  `--la-color-blue` directly on a link, focus ring, or hover state.
  After the 2026-05-08 navy shift, the deep base no longer reads as
  clickable on its own. Interactive surfaces MUST use
  `--la-color-blue-bright`. See §4.3 role discipline.
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
| 2026-05-07 | WP-003 verification: added `--la-color-cta` / `-bright` / `-muted` (§4.2.1). Mode-stable CTA token at `#c92a30` in both modes. Required because dark `--la-color-red` (`#e5484d`) only reaches 3.91:1 with white text — fails palette.md §8 row 5 (AA on button text). `--la-color-red` retains its per-mode tuning for non-button uses (gradients, attack semantic, accents). Additive change per §9 token-stability rule. |
| 2026-05-08 | Added §4.4 class-color token group — eight tokens covering all five hero classes (strength, covert, instinct, ranged, tech). Values sourced from production class icons at `barefootbetters-legendary-setup/public/img/icons/hero-classes/`. Class colors are mode-stable and scoped to gameplay UI (chips, filters, deck-builder, hero grouping). Extended §10 with the matching failure mode for class-color brand misuse. Decision: do NOT add green as a fourth brand color — brand identity stays at three (gold · red · blue), gameplay expressiveness lives in the class-color group. |
| 2026-05-08 | Extended §4.4 with `--la-color-class-instinct-muted` (`#92400e`) and `--la-color-class-ranged-muted` (`#155e75`). All five classes now carry bright + muted pairs. The two new muted values are *derived* (Tailwind amber-800 and cyan-800) — the production icons for instinct and ranged don't include shadow companions, so unlike strength/covert/tech these are not icon-anchored. Mode-stability paragraph updated to call out the source asymmetry. Additive change per §9. |
| 2026-05-08 | **BRAND TONAL SHIFT (redefinition) — Early Lock Revision Window per §9.1.** Brand red and brand blue scales both shifted one tier darker per stakeholder direction. Red moves from cherry / scarlet (`#c92a30` / `#e5484d`) to **deep maroon** (`#7a1d1f` / `#a83034`). Blue moves from royal blue (`#2563eb` / `#3b82f6`) to **deep navy** (`#1e3a8a` / `#3753b8`) — Captain America / X-Men Beast tonal territory. CTA tokens follow the new maroon (`#7a1d1f` mode-stable, ~10.4:1 contrast on white text — AAA, above the previous 5.44:1). All bright/muted variants of red and blue scaled accordingly. Class colors (§4.4) and semantic colors (§5) **unchanged** — semantic state colors and gameplay-class colors are scoped separately from brand identity per §4.4 and §5.3 constraints. **Governance:** strictly per §9, redefinitions trigger v1 → v2; this revision was made one day after lock under the §9.1 Early Lock Revision Window exception (added in this same revision pass to legitimise the contract amendment). After window closure, future redefinitions require formal v2 bump. §5.3 distinguishability table updated — verify CTA-vs-error visual gap once rendered (light-mode gap is tighter than v1). |
| 2026-05-08 | **Governance reinforcement (companion to brand tonal shift).** Added §9.1 Exception — Early Lock Revision Window, codifying the conditions under which a within-72h post-lock redefinition is permitted without v2 bump. Added §5.3 distinguishing rule — error red MUST remain perceptibly more saturated and chromatically purer than CTA red; CTA may shift toward maroon but error stays in the pure-red family. Added §4.3 role discipline — `--la-color-blue` is decorative-tone, `--la-color-blue-bright` MUST carry interactive affordance (links, focus, hover). Added §7 tonal note — `--la-gradient-hero` now spans navy → maroon ("muted cinematic") rather than royal-blue → cherry-red ("energetic SaaS"); compose with `-bright` variants if energetic gradient is needed elsewhere. Corrected three earlier changelog references from `§11` to `§9` (token-stability rules live in §9, not §11). |
| 2026-05-08 | §9.1 closure-behavior clarification — added explicit "At window close" enforcement (revert to §9 strict, redefinitions require v2 bump, no silent extension) and a separate "Window closure recording" paragraph distinguishing the *event* from its *changelog assertion*. Closes the state-machine: §9.1 now defines entry conditions, duration, exit trigger, AND post-close enforcement explicitly. Doc-only refinement; no token values changed. |
| 2026-05-08 | §4.4 usage-patterns guidance — added a "guidance, not tokens" block to §4.4 specifying the four canonical patterns for applying class colors (border-accent, chip-fill, icon-accent, selection-state) plus a "no incidental full-surface fills" rule. Codifies visual grammar so class-membership reads consistently across screens regardless of which pattern is used. No new tokens added, no values changed; existing ten class tokens cover all four patterns. Doc-only refinement. |
