# Legendary Arena — Typography (v1 Draft)

**Status:** v1 DRAFT — Phase B; pending review against rendered output (WP-003)
**Owner:** Jeffery Jensen
**Last updated:** 2026-05-07

> **Authority:** This document defines the canonical typography system
> for Legendary Arena. It is subordinate to `01-VISION.md` and
> `docs/brand/strategy.md`. `static/brand-tokens.css` MUST be derived
> directly from this file; if they disagree, this file wins and the
> CSS is treated as broken until corrected. No font sizes, line heights,
> weights, or letter-spacing values may exist anywhere else in the
> project without explicit `// why:` justification.

---

## 1. Status

This file locks the **typography decisions** of the brand. It does
NOT cover:

- Color decisions → `palette.md`
- Spacing scale → `spacing.md`
- Token version history → `CHANGELOG.md`

This is a Phase B (tactical) artifact. Phase B exit criteria are
defined in `strategy.md §11`. Until those criteria are satisfied —
notably: tokens applied to a rendered Hugo page and reviewed —
this document remains "v1 DRAFT."

---

## 2. Design principles

Typography must:

- Convey **weight and clarity**, not decoration
- Support **heroic tone**, not playful tone
- Prioritize **scanability** over density
- Maintain **consistency** across www, play, registry
- Avoid stylistic drift — no arbitrary variations

---

## 3. Font families (locked)

### 3.1 Display (headlines, hero text)

```
Primary:   "Bebas Neue"
Fallbacks: "Anton", "Oswald", system-ui, sans-serif
Token:     --la-font-display
```

**Characteristics:** condensed · high impact · uppercase-friendly ·
used sparingly, never for body text.

### 3.2 Body (all readable content)

```
Primary:   "Inter"
Fallbacks: system-ui, -apple-system, "Segoe UI", sans-serif
Token:     --la-font-body
```

**Characteristics:** highly readable at all sizes · neutral tone ·
works across dense and sparse layouts.

### 3.3 Mono (code, registry, stats)

```
Primary:   "JetBrains Mono"
Fallbacks: "IBM Plex Mono", Consolas, monospace
Token:     --la-font-mono
```

**Characteristics:** modern monospace · readable at small sizes ·
used for code blocks, card stats, technical content.

---

## 4. Type scale (sizes — locked)

All sizes use a **rem-based scale (16px base)**.

### 4.1 Hero (above-the-fold display)

| Role | Size | Token |
|---|---|---|
| Hero | 3.5rem (56px) | `--la-font-size-hero` |

**Constraint:** at most **one hero** per page, used in the above-the-fold
landing area only. Pages without a hero use H1 as the largest element.

### 4.2 Headings

| Level | Size | Token |
|---|---|---|
| H1 | 3.0rem (48px) | `--la-font-size-h1` |
| H2 | 2.25rem (36px) | `--la-font-size-h2` |
| H3 | 1.75rem (28px) | `--la-font-size-h3` |
| H4 | 1.375rem (22px) | `--la-font-size-h4` |
| H5 | 1.125rem (18px) | `--la-font-size-h5` |
| H6 | 1.0rem (16px) | `--la-font-size-h6` |

### 4.3 Body text

| Role | Size | Token |
|---|---|---|
| Body (default) | 1.0rem (16px) | `--la-font-size-body` |
| Small | 0.875rem (14px) | `--la-font-size-small` |

---

## 5. Line heights (per role — locked)

Line heights are paired with sizes. Each role gets its own token so
templates can apply a coordinated size + line height without
recombination.

### 5.1 Per-role tokens

| Role | Line height | Token |
|---|---|---|
| Hero | 1.05 | `--la-line-height-hero` |
| H1 | 1.1 | `--la-line-height-h1` |
| H2 | 1.15 | `--la-line-height-h2` |
| H3 | 1.2 | `--la-line-height-h3` |
| H4 | 1.3 | `--la-line-height-h4` |
| H5 | 1.4 | `--la-line-height-h5` |
| H6 | 1.5 | `--la-line-height-h6` |
| Body | 1.6 | `--la-line-height-body` |
| Small | 1.5 | `--la-line-height-small` |

### 5.2 Generic line-height tokens

For non-heading typography that doesn't map to a specific role:

| Token | Value | Usage |
|---|---|---|
| `--la-line-height-tight` | 1.1 | Display text, large numerals |
| `--la-line-height-normal` | 1.4 | Default for unspecified contexts |
| `--la-line-height-relaxed` | 1.6 | Paragraph copy, long-form |

**Rule:** prefer per-role tokens (`--la-line-height-h1`, etc.) over
generic tokens for headings and body. Generic tokens are for
specialized layouts only.

---

## 6. Font weights (locked)

### 6.1 Per-role weights

| Role | Weight | Token |
|---|---|---|
| H1 | 700 (Bold) | `--la-font-weight-h1` |
| H2 | 700 (Bold) | `--la-font-weight-h2` |
| H3 | 600 (SemiBold) | `--la-font-weight-h3` |
| H4 | 600 (SemiBold) | `--la-font-weight-h4` |
| H5 | 500 (Medium) | `--la-font-weight-h5` |
| H6 | 500 (Medium) | `--la-font-weight-h6` |
| Body | 400 (Regular) | `--la-font-weight-body` |
| Small | 400 (Regular) | `--la-font-weight-small` |

### 6.2 Generic weight tokens

| Token | Value | Usage |
|---|---|---|
| `--la-font-weight-regular` | 400 | Default body text |
| `--la-font-weight-medium` | 500 | Labels, navigation, UI buttons |
| `--la-font-weight-semibold` | 600 | Strong emphasis within body |
| `--la-font-weight-bold` | 700 | Strong headlines, key callouts |

---

## 7. Letter spacing (locked)

| Token | Value | Usage |
|---|---|---|
| `--la-letter-spacing-tight` | -0.01em | Tight display blocks |
| `--la-letter-spacing-normal` | 0 | Default body text |
| `--la-letter-spacing-wide` | 0.04em | Spaced labels, small caps |
| `--la-letter-spacing-display` | 0.04em | H1, H2, hero (display font) |

**Rule for the display font:** condensed display fonts (Bebas Neue,
Anton, Oswald) read better with slight tracking. Apply
`--la-letter-spacing-display` to any element using
`--la-font-display`.

---

## 8. Text transform rules

| Element | Rule |
|---|---|
| Hero | UPPERCASE (display font) |
| H1 | UPPERCASE (display font) |
| H2 | UPPERCASE (display font) |
| H3 | Sentence case |
| H4–H6 | Sentence case |
| Body | Sentence case |
| Small | Sentence case |
| Labels (UI) | UPPERCASE optional |
| Buttons / CTAs | Sentence case |

**Rule:** Uppercase is reserved for display contexts (hero, H1, H2)
and optional micro-labels. Never apply uppercase to body content,
captions, blog posts, or anything more than a few words.

---

## 9. Token reference (contract with `brand-tokens.css`)

The following tokens MUST exist in `static/brand-tokens.css`. If any
are missing or differ in value, the contract is broken.

### Font families
```
--la-font-display
--la-font-body
--la-font-mono
```

### Font sizes
```
--la-font-size-hero
--la-font-size-h1
--la-font-size-h2
--la-font-size-h3
--la-font-size-h4
--la-font-size-h5
--la-font-size-h6
--la-font-size-body
--la-font-size-small
```

### Line heights (per role)
```
--la-line-height-hero
--la-line-height-h1
--la-line-height-h2
--la-line-height-h3
--la-line-height-h4
--la-line-height-h5
--la-line-height-h6
--la-line-height-body
--la-line-height-small
```

### Line heights (generic)
```
--la-line-height-tight
--la-line-height-normal
--la-line-height-relaxed
```

### Font weights (per role)
```
--la-font-weight-h1
--la-font-weight-h2
--la-font-weight-h3
--la-font-weight-h4
--la-font-weight-h5
--la-font-weight-h6
--la-font-weight-body
--la-font-weight-small
```

### Font weights (generic)
```
--la-font-weight-regular
--la-font-weight-medium
--la-font-weight-semibold
--la-font-weight-bold
```

### Letter spacing
```
--la-letter-spacing-tight
--la-letter-spacing-normal
--la-letter-spacing-wide
--la-letter-spacing-display
```

---

## 10. Usage rules (strict)

### 10.1 Global rules

- No hardcoded font sizes, line heights, weights, or letter-spacing
  values outside `brand-tokens.css`
- No inline `style="font-..."` attributes on rendered HTML
  (exception: WP-003 overrides may use them with `// why:` comments)
- All headings must map to a defined level (H1–H6)
- No custom heading variants without a token

### 10.2 Readability rules

- Body text must not drop below 14px (`--la-font-size-small`)
- Line height must not drop below:
  - 1.4 for body / paragraph content
  - 1.05 for hero / very large display
  - 1.1 for headings
- Mono text (code, stats) follows the body line-height token

### 10.3 Layout rules

- **One H1 per page** (hero element doesn't replace H1 — hero is
  presentational; H1 is semantic)
- Do not stack multiple display headings without intervening content
- Use spacing (per `spacing.md`) to create hierarchy where possible,
  not just font size

### 10.4 Anti-patterns (forbidden)

- Mixing multiple display fonts on the same page
- Using uppercase for body text or paragraphs
- Shrinking H5 / H6 below the body scale (16px)
- Using bold as a substitute for hierarchy (use heading levels)
- Using arbitrary font sizes between scale steps (e.g., 17px, 19px)

---

## 11. Accessibility constraints

Typography MUST satisfy:

- **Body text contrast** ≥ WCAG AA (per `palette.md §8`)
- **Minimum readable size:** 16px for primary content (small reserved
  for captions, footnotes, metadata)
- **Avoid ultra-condensed blocks** — scanability over density
- **Line length** should target 50–75 characters for body text
  (enforced via container width in W003, not in this doc)

---

## 12. Failure modes

The typography system is **degraded** if any of the following
appears in shipped output. Treat each as a failure condition that
fails W003 / W004 DoD.

- **Hardcoded font value** anywhere outside `brand-tokens.css`
  (e.g., `font-size: 18px` in a partial)
- **Wrong heading level used for visual size** (e.g., styling an H4
  to look like H1 instead of just using H1)
- **Multiple H1s on a single page**
- **Uppercase applied to body content** beyond brief labels
- **Mixing display fonts** on the same page
- **Body text below 14px** anywhere it's expected to be readable
- **Display font used for body** or body font used for hero / H1
- **Inline `style="font-..."`** on rendered marketing HTML

---

## 13. Implementation guidance (for WP-003)

When applying these tokens to PaperMod via overrides:

### Override targets

- `.entry-header h1`, `.post-title`, `.entry-title` — H1 styling
- `.entry-header`, `.post-meta` — secondary heading styles
- `.logo` — wordmark display (may use `--la-font-size-hero` or H1)
- Body via `body` selector or PaperMod's content classes
- `code`, `pre` — mono font

### Font loading

- Web fonts loaded via `<link rel="preconnect">` to fonts.googleapis.com
  and `<link rel="stylesheet">` to font CSS
- Brief FOUT (Flash of Unstyled Text) and FOIT (Flash of Invisible
  Text) are acceptable on first load — fallback fonts should display
  reasonable typography during font fetch
- `font-display: swap` on Google Fonts CSS to prefer FOUT over FOIT

### Verification

After WP-003, verify:
- No hardcoded font values introduced in override CSS
- Hero, H1, H2 use display font with correct letter-spacing
- Body uses Inter (or system-ui fallback) with correct line height
- Lighthouse performance not regressed by font loading

---

## 14. Phase B exit criteria (typography portion)

Per `strategy.md §11`, the typography-related exit conditions are:

- [ ] All tokens listed in §9 present in `static/brand-tokens.css`
      with matching values
- [ ] No hardcoded font sizes, line heights, weights, or
      letter-spacing values anywhere else in the repo
- [ ] All headings on rendered pages map to a defined level
- [ ] Type scale visually verified at 1280×720 (desktop) and 375×667
      (mobile)
- [ ] No font-loading regressions vs WP-001 baseline (Lighthouse
      performance ≥ 90)

When all five conditions hold, typography status changes from
"v1 DRAFT" to "v1 LOCKED" with a `CHANGELOG.md` entry recording
the lock date.

---

## 15. Source / change log

This file derives from the directions in `strategy.md §4`. Token
contract version history lives in `CHANGELOG.md`. This local log
tracks revisions to *this document* during the draft phase.

| Date | Change |
|---|---|
| 2026-05-07 | Initial typography definition. Per-heading sizes, line heights, and weights. Hero special case (3.5rem) added as a separate token tier above H1. Letter-spacing tokens (4 values) and weight tokens (per-role + generic) defined. |
