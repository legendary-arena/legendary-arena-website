# Legendary Arena — Spacing & Layout Primitives (v1 Draft)

**Status:** v1 DRAFT — Phase B; pending review against rendered output (WP-003)
**Owner:** Jeffery Jensen
**Last updated:** 2026-05-07

> **Authority:** This document defines the canonical spacing scale,
> border radii, z-index layers, and motion durations for Legendary
> Arena. It is subordinate to `01-VISION.md` and `docs/brand/strategy.md`.
> `static/brand-tokens.css` MUST be derived directly from this file;
> if they disagree, this file wins and the CSS is treated as broken
> until corrected. No spacing, radius, z-index, or motion values may
> exist anywhere else in the project without explicit `// why:`
> justification.

---

## 1. Status

This file locks the **non-color, non-typography layout primitives**
of the brand:

- Spacing scale (margins, padding, gaps)
- Border radius
- Z-index layers
- Motion / transition durations

It does NOT cover:

- Color decisions → `palette.md`
- Typography (fonts, sizes, weights) → `typography.md`
- Token version history → `CHANGELOG.md`

This is a Phase B (tactical) artifact. Phase B exit criteria are
defined in `strategy.md §11`. Until those criteria are satisfied —
notably: tokens applied to a rendered Hugo page and reviewed —
this document remains "v1 DRAFT."

---

## 2. Design principles

The spacing system enforces:

- **Consistency** — same distances mean the same hierarchy everywhere
- **Clarity** — spacing creates structure, not decoration
- **Hierarchy** — larger gaps = larger conceptual breaks
- **Restraint** — avoid over-dense or over-airy layouts
- **Token-first discipline** — no raw values

---

## 3. Spacing scale (locked)

### 3.1 Base unit

Legendary Arena uses an **8-point grid system**.

```
Base unit = 8px
```

All spacing tokens derive from multiples of 4px (with 4px itself
allowed for micro-adjustments).

### 3.2 Scale

| Token | Value | Multiple |
|---|---|---|
| `--la-space-1` | 4px | 0.5× base |
| `--la-space-2` | 8px | 1× base |
| `--la-space-3` | 12px | 1.5× base |
| `--la-space-4` | 16px | 2× base |
| `--la-space-5` | 24px | 3× base |
| `--la-space-6` | 32px | 4× base |
| `--la-space-7` | 48px | 6× base |
| `--la-space-8` | 64px | 8× base |
| `--la-space-9` | 96px | 12× base |

### 3.3 Semantic roles

Each token has a recommended usage tier. These are guidelines, not
hard rules — but consistent usage produces visual rhythm.

#### Micro (UI-level)

| Token | Value | Used for |
|---|---|---|
| `--la-space-1` | 4px | Icon spacing, tight inline alignment, fine adjustments |
| `--la-space-2` | 8px | Tight spacing, small gaps between related elements |

#### Component (default layout spacing)

| Token | Value | Used for |
|---|---|---|
| `--la-space-3` | 12px | Compact UI elements, input padding |
| `--la-space-4` | 16px | Base spacing unit, paragraph spacing, list items |
| `--la-space-5` | 24px | Card padding, form element spacing, button groups |

#### Section (block structure)

| Token | Value | Used for |
|---|---|---|
| `--la-space-6` | 32px | Between content blocks within a section |
| `--la-space-7` | 48px | Between sections within a page |

#### Page (macro layout)

| Token | Value | Used for |
|---|---|---|
| `--la-space-8` | 64px | Between major page sections, hero → next |
| `--la-space-9` | 96px | Page-level breathing room, top/bottom of hero |

---

## 4. Border radius (locked)

| Token | Value | Usage |
|---|---|---|
| `--la-radius-sm` | 4px | Tight corners — input fields, compact buttons |
| `--la-radius-md` | 8px | Default — most cards, buttons, panels |
| `--la-radius-lg` | 16px | Larger surfaces — feature cards, modals |
| `--la-radius-xl` | 24px | Hero containers, prominent feature blocks |
| `--la-radius-pill` | 9999px | Pill-shaped buttons, badges, tags |

**Rules:**

- Use `--la-radius-md` as the default. Justify deviations.
- `--la-radius-pill` is for genuinely pill-shaped elements only —
  not as a "very rounded" choice.
- Don't mix radii on a single component (button corners should all
  use the same radius, not different per corner).

---

## 5. Z-index layers (locked)

Z-index values are **named, not arbitrary**. Layers stack in
predictable order; new UI elements pick the appropriate tier rather
than inventing a new value.

| Token | Value | Layer |
|---|---|---|
| `--la-z-base` | 0 | Page content baseline |
| `--la-z-dropdown` | 5 | Inline dropdowns, autocomplete |
| `--la-z-sticky` | 10 | Sticky headers, sticky table headers |
| `--la-z-overlay` | 50 | Backdrop overlays, dim scrims |
| `--la-z-modal` | 100 | Modal dialogs, full-screen takeovers |
| `--la-z-toast` | 200 | Toast notifications, top of stack |

**Rules:**

- Never use a raw z-index value in CSS (e.g., `z-index: 1000`)
- If a new layer is needed (rare), add a token here AND in
  `brand-tokens.css` with a CHANGELOG entry
- Don't use negative z-index unless absolutely necessary — and
  justify with a `// why:` comment

---

## 6. Motion / transitions (locked)

Standard transition durations for hover, focus, theme toggles, and
similar interactive feedback.

| Token | Value | Usage |
|---|---|---|
| `--la-transition-fast` | 120ms ease-in-out | Hover states, micro-interactions, focus rings |
| `--la-transition-base` | 180ms ease-in-out | Default for most transitions |
| `--la-transition-slow` | 280ms ease | Theme switches, larger UI shifts, modal entry |

**Rules:**

- Default to `--la-transition-base` unless context calls for fast/slow
- Avoid transitions longer than 280ms — feels sluggish
- Avoid `linear` easing for UI; prefer `ease-in-out` or `ease`
- Respect `prefers-reduced-motion` in any new components added in
  WP-003 / future WPs (see §10 Accessibility)

---

## 7. Layout rules

### 7.1 Vertical rhythm

- Standard paragraph spacing: `--la-space-4` (16px)
- Section spacing: `--la-space-6` (32px) or higher
- Heading-to-body gap: minimum `--la-space-3` (12px)
- Headings must not collapse into body text without breathing room

### 7.2 Component spacing reference

| Element | Padding |
|---|---|
| Buttons | `var(--la-space-2) var(--la-space-4)` (8px / 16px) |
| Cards | `var(--la-space-4)` to `var(--la-space-5)` (16–24px) |
| Inputs | `var(--la-space-2) var(--la-space-3)` (8px / 12px) |
| Modals | `var(--la-space-5)` to `var(--la-space-6)` (24–32px) |

### 7.3 Section spacing reference

| Pattern | Value |
|---|---|
| Section → section | `--la-space-7` (48px) |
| Hero → next section | `--la-space-8` (64px) |
| Page top/bottom | `--la-space-9` (96px) |

### 7.4 Container padding

| Context | Token |
|---|---|
| Page horizontal padding (desktop) | `--la-space-6` (32px) |
| Page horizontal padding (mobile) | `--la-space-4` (16px) |
| Max content width (guideline) | 960px–1200px (not tokenized — set in WP-003) |

### 7.5 Gap usage rule

Always prefer `gap` over `margin` when using flex/grid:

```css
/* preferred */
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--la-space-4);
}

/* avoid */
.stack > * + * {
  margin-top: 16px;
}
```

`gap` doesn't collapse, doesn't require last-child rules, and is
explicit about intent.

---

## 8. Responsive behavior

Spacing scales **down one step on mobile** where breathing room
becomes excessive on smaller viewports. This is a usage rule, not
a separate token system.

| Desktop | Mobile (<768px) |
|---|---|
| `--la-space-6` (32px) | `--la-space-5` (24px) |
| `--la-space-7` (48px) | `--la-space-6` (32px) |
| `--la-space-8` (64px) | `--la-space-7` (48px) |
| `--la-space-9` (96px) | `--la-space-8` (64px) |

**Do not create separate mobile tokens.** Adjust usage in
media queries:

```css
.section { padding-top: var(--la-space-7); }
@media (max-width: 768px) {
  .section { padding-top: var(--la-space-6); }
}
```

---

## 9. Usage examples

### 9.1 Stack layout

```css
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--la-space-4);
}
```

### 9.2 Section

```css
.section {
  padding-top: var(--la-space-7);
  padding-bottom: var(--la-space-7);
}

@media (max-width: 768px) {
  .section {
    padding-top: var(--la-space-6);
    padding-bottom: var(--la-space-6);
  }
}
```

### 9.3 Card

```css
.card {
  padding: var(--la-space-5);
  border-radius: var(--la-radius-md);
  background: var(--la-color-surface);
  box-shadow: var(--la-shadow-soft);
  transition: background var(--la-transition-fast);
}

.card:hover {
  background: var(--la-color-surface-hover);
}
```

### 9.4 Modal

```css
.modal {
  position: fixed;
  inset: 0;
  z-index: var(--la-z-modal);
  padding: var(--la-space-6);
  border-radius: var(--la-radius-lg);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--la-z-overlay);
  background: rgba(0, 0, 0, 0.5);
}
```

---

## 10. Accessibility constraints

Layout and motion must satisfy:

- **Touch targets ≥ 44×44px** for interactive elements (Apple HIG /
  WCAG 2.5.5). Use `--la-space-5` (24px) padding minimum on tap
  targets that have small content.
- **`prefers-reduced-motion`** must be respected by any element
  using transitions:

  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      transition-duration: 0ms !important;
    }
  }
  /* why: WCAG 2.3.3 — respect user preference for reduced motion */
  ```

- **Visible focus rings** must use clearly distinguishable spacing
  (e.g., `outline-offset: 2px`) — see `palette.md` for color tokens
- **Sufficient gap** between interactive elements to prevent mis-taps
  on touch devices: minimum `--la-space-2` (8px)

Verification happens during WP-003 (theme application) and WP-014
(accessibility baseline).

---

## 11. Anti-patterns (forbidden)

- Using values like `10px`, `15px`, `18px`, `22px` — anything off
  the 4-pixel grid
- Different spacing scales in different repos (www, play, registry)
- Collapsing spacing to "fix" overflow instead of restructuring
- Using `margin` hacks when `gap` is available
- Mixing padding strategies within the same component
  (e.g., top: 16px, bottom: 24px without good reason)
- Inline `style="margin/padding/..."` on rendered HTML
- Raw z-index values (e.g., `z-index: 99`)
- Transition durations not from the defined motion tokens

---

## 12. Token reference (contract with `brand-tokens.css`)

The following tokens MUST exist in `static/brand-tokens.css`. If any
are missing or differ, the contract is broken.

### Spacing
```
--la-space-1   --la-space-2   --la-space-3
--la-space-4   --la-space-5   --la-space-6
--la-space-7   --la-space-8   --la-space-9
```

### Border radius
```
--la-radius-sm   --la-radius-md   --la-radius-lg
--la-radius-xl   --la-radius-pill
```

### Z-index
```
--la-z-base      --la-z-dropdown   --la-z-sticky
--la-z-overlay   --la-z-modal      --la-z-toast
```

### Motion
```
--la-transition-fast   --la-transition-base   --la-transition-slow
```

---

## 13. Failure modes

Layout primitives are **degraded** if any of the following appears
in shipped output. Treat each as a failure condition that fails
W003 / W004 DoD.

- **Raw spacing value** anywhere outside `brand-tokens.css`
  (e.g., `padding: 18px` in a partial)
- **Off-grid value** (10px, 17px, 22px, etc.) — must be a multiple
  of 4px from the scale
- **Raw z-index** value (e.g., `z-index: 999`) instead of a token
- **Inline `style="margin/padding/..."`** on rendered HTML
- **`!important`** on spacing rules without `// why:` justification
- **Spacing collapse** that creates ambiguous hierarchy
  (e.g., heading flush against body text)
- **Transition longer than 280ms** introduced for UI feedback
  (animations longer than this belong in motion design, not
  layout transitions)
- **Motion without `prefers-reduced-motion` respect** in new
  components

---

## 14. Phase B exit criteria (spacing & layout portion)

Per `strategy.md §11`, the spacing-related exit conditions are:

- [ ] All tokens listed in §12 present in `static/brand-tokens.css`
      with matching values
- [ ] No hardcoded spacing, radius, z-index, or transition values
      anywhere else in the repo
- [ ] Vertical rhythm visually verified at 1280×720 (desktop) and
      375×667 (mobile)
- [ ] `prefers-reduced-motion` respected wherever transitions are used
- [ ] Touch targets ≥ 44×44px on all interactive elements
- [ ] Lighthouse layout-stability score (CLS) ≤ 0.1

When all six conditions hold, spacing status changes from
"v1 DRAFT" to "v1 LOCKED" with a `CHANGELOG.md` entry recording
the lock date.

---

## 15. Source / change log

This file derives from the directions in `strategy.md §4` (8-pixel
base, 9-step scale). Token contract version history lives in
`CHANGELOG.md`. This local log tracks revisions to *this document*
during the draft phase.

| Date | Change |
|---|---|
| 2026-05-07 | Initial spacing system. 8-point base, 9-step scale (4–96px). Border radius (5 levels), z-index layers (6 tiers), motion durations (3 speeds) included as related layout primitives. |
