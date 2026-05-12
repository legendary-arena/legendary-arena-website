# Class-Color Usage Audit — v1 Baseline

**Date:** 2026-05-12
**Auditor:** Claude Opus 4.6 (session `jolly-merkle-682aae`)
**Contract enforced:** `docs/brand/palette.md` §4.4 (role discipline + application patterns) and §10 (failure modes)
**Authority:** Subordinate to `01-VISION.md` > `03-ROADMAP.md` > `WP-009-class-color-usage-audit.md` (v2.1)

---

## Repos audited

| Repo | Path | HEAD commit | Role |
|---|---|---|---|
| www (`legendary-arena-com`) | `C:\www\legendary-arena-com` | `56ac8ec` | Marketing site; hosts canonical `static/brand-tokens.css` |
| arena-client (engine monorepo) | `C:\pcloud\BB\DEV\legendary-arena\apps\arena-client` | `6f5c72a` | Play site (`play.legendary-arena.com`) |
| registry-viewer (engine monorepo) | `C:\pcloud\BB\DEV\legendary-arena\apps\registry-viewer` | `6f5c72a` | Card registry (`cards.barefootbetters.com`) |

## Environment

- **rg:** 14.1.1 (rev 0a466a11ee)
- **OS:** Windows 11 Pro 10.0.26200
- **Shell:** PowerShell 7+ / Git Bash
- **Date:** 2026-05-12

---

## Summary

| Check | Result | Violations |
|---|---|---|
| 1 — Token definition integrity | **PASS** | 0 |
| 2 — No raw class hexes | **PASS** | 0 |
| 3 — Pattern compliance | **PASS** | 0 |
| 4 — Disallowed contexts | **PASS** | 0 |
| 5 — `/brand/` content vs styling boundary | **PASS** | 0 |

**Total violations: 0.** No remediation tickets required.

---

## Check 1 — Token definition integrity

All ten `--la-color-class-*` tokens verified present in `static/brand-tokens.css` with hex values byte-identical to `palette.md §4.4`.

| Token | palette.md §4.4 | brand-tokens.css | Line | Match |
|---|---|---|---|---|
| `--la-color-class-strength` | `#40b93c` | `#40b93c` | 134 | PASS |
| `--la-color-class-strength-muted` | `#164b33` | `#164b33` | 135 | PASS |
| `--la-color-class-covert` | `#ee2223` | `#ee2223` | 136 | PASS |
| `--la-color-class-covert-muted` | `#ae2136` | `#ae2136` | 137 | PASS |
| `--la-color-class-instinct` | `#f9b00b` | `#f9b00b` | 138 | PASS |
| `--la-color-class-instinct-muted` | `#92400e` | `#92400e` | 139 | PASS |
| `--la-color-class-ranged` | `#31a5d6` | `#31a5d6` | 140 | PASS |
| `--la-color-class-ranged-muted` | `#155e75` | `#155e75` | 141 | PASS |
| `--la-color-class-tech` | `#a7a5a6` | `#a7a5a6` | 142 | PASS |
| `--la-color-class-tech-muted` | `#666666` | `#666666` | 143 | PASS |

**Mode-stability:** Tokens are defined in a standalone `:root` block (line 128) that is explicitly NOT overridden in `html[data-theme="dark"]` (line 243+). The CSS comment block at lines 116-126 documents this design: class colors are mode-stable by specification.

**Result: 10/10 PASS. Mode-stability verified.**

---

## Check 2 — No raw class hexes on any consumer

### RG recipes

**www repo** (excluding canonical definition files):

```pwsh
rg --no-heading --color=never -n -i `
  "(#40b93c|#164b33|#ee2223|#ae2136|#f9b00b|#92400e|#31a5d6|#155e75|#a7a5a6|#666666)" `
  "C:\www\legendary-arena-com\" `
  --glob "!node_modules/**" `
  --glob "!public/**" `
  --glob "!themes/**" `
  --glob "!docs/brand/palette.md" `
  --glob "!static/brand-tokens.css" `
  --glob "!docs/ai/**"
```

**arena-client:**

```pwsh
rg --no-heading --color=never -n -i `
  "(#40b93c|#164b33|#ee2223|#ae2136|#f9b00b|#92400e|#31a5d6|#155e75|#a7a5a6|#666666)" `
  "C:\pcloud\BB\DEV\legendary-arena\apps\arena-client\" `
  --glob "!node_modules/**" `
  --glob "!dist/**" `
  --glob "!build/**"
```

**registry-viewer:**

```pwsh
rg --no-heading --color=never -n -i `
  "(#40b93c|#164b33|#ee2223|#ae2136|#f9b00b|#92400e|#31a5d6|#155e75|#a7a5a6|#666666)" `
  "C:\pcloud\BB\DEV\legendary-arena\apps\registry-viewer\" `
  --glob "!node_modules/**" `
  --glob "!dist/**" `
  --glob "!build/**"
```

### Findings — www repo

| File | Lines | Hex values | Bucket | Classification |
|---|---|---|---|---|
| `static/brand-tokens.css` | 134-143 | All 10 | — | **EXCLUDED** (canonical token definition file) |
| `docs/brand/palette.md` | 216-225, 524 | All 10 | — | **EXCLUDED** (authoritative spec doc) |
| `docs/ai/work-packets/WP-009-*.md` | 93-102 | All 10 | — | **EXCLUDED** (audit spec; under `docs/ai/`) |
| `docs/01-VISION.md` | 259 | Multiple | Bucket 3 | **PERMITTED** — Decisions log prose documenting the §4.4 addition |
| `static/images/brand/palette.svg` | 426-518 | All 10 (×2 each: `fill` + `<text>`) | Bucket 3 | **PERMITTED** — SVG documentation image rendering color swatches as visual reference content on `/brand/`; `fill` attributes serve the same display purpose as `brand-swatch` shortcode; `<text>` elements show hex values as readable text |
| `docs/brand/palette.svg` | 426-518 | All 10 (×2 each) | Bucket 3 | **PERMITTED** — docs-only SVG reference copy; not shipped to `public/` |

Additional verification: zero inline `style=` attributes referencing class-color hex values in any `content/**/*.md` file (relevant because `hugo.toml` has `[markup.goldmark.renderer] unsafe = true` per WP-014).

### Findings — arena-client

| File | Lines | Hex values | Bucket | Classification |
|---|---|---|---|---|
| `public/brand-tokens.local.css` | 138-147 | All 10 | — | **PERMITTED** — bundled fallback snapshot of canonical `brand-tokens.css`; SHA-256 hash-parity contract per WP-007a |

Zero other hits. No raw class-color hex in any arena-client source file.

### Findings — registry-viewer

| File | Lines | Hex values | Bucket | Classification |
|---|---|---|---|---|
| `public/brand-tokens.local.css` | 138-147 | All 10 | — | **PERMITTED** — bundled fallback snapshot per WP-007b |

Zero other hits. No raw class-color hex in any registry-viewer source file.

**Result: PASS. Zero Bucket 1 (CSS property) or Bucket 2 (programmatic styling) violations across all three repos.**

---

## Check 3 — Pattern compliance

### RG recipes

**www repo** (consumer surface only, excluding docs):

```pwsh
rg --no-heading --color=never -n `
  "--la-color-class-" `
  "C:\www\legendary-arena-com\" `
  --glob "!node_modules/**" `
  --glob "!public/**" `
  --glob "!docs/**"
```

**arena-client:**

```pwsh
rg --no-heading --color=never -n `
  "--la-color-class-" `
  "C:\pcloud\BB\DEV\legendary-arena\apps\arena-client\" `
  --glob "!node_modules/**" `
  --glob "!dist/**" `
  --glob "!build/**"
```

**registry-viewer:**

```pwsh
rg --no-heading --color=never -n `
  "--la-color-class-" `
  "C:\pcloud\BB\DEV\legendary-arena\apps\registry-viewer\" `
  --glob "!node_modules/**" `
  --glob "!dist/**" `
  --glob "!build/**"
```

### Findings — www repo

| File | Line | Token(s) | Context | Pattern | Classification |
|---|---|---|---|---|---|
| `assets/css/extended/custom.css` | 860 | `--la-color-class-*` (comment) | CSS comment stating the non-usage rule | N/A | **NOT A REFERENCE** — comment only |
| `content/brand/_index.md` | 182 | `--la-color-class-*` (prose) | Documentation text: "Do not apply class colors" | N/A | **Content-display** |
| `content/brand/_index.md` | 236 | `--la-color-class-{strength,...}` (prose) | Documentation text describing class-color tokens | N/A | **Content-display** |
| `content/brand/_index.md` | 784-788 | 5 bright tokens | `{{< brand-swatch token="--la-color-class-*" >}}` shortcode calls | Content-display | **PERMITTED** — swatch display rendering |
| `content/brand/_index.md` | 1128 | `--la-color-class-*` (prose) | "DON'T use class colors" guidance text | N/A | **Content-display** |
| `static/brand-tokens.css` | 134-143 | All 10 | Token definitions | N/A | **EXCLUDED** — canonical definition |
| `static/images/brand/palette.svg` | 427-517 | All 10 (as `<text>`) | SVG text labels | N/A | **Content-display** |

Zero `--la-color-class-*` token references in CSS property values or layout templates on www.

### Findings — arena-client

| File | Lines | Token(s) | Context | Classification |
|---|---|---|---|---|
| `public/brand-tokens.local.css` | 138-147 | All 10 | Token definitions (fallback) | **EXCLUDED** |

Zero `--la-color-class-*` token references in arena-client source code. The arena-client does not currently use class-color tokens in its UI.

### Findings — registry-viewer

| File | Line | Token(s) | Context | §4.4 Pattern | Classification |
|---|---|---|---|---|---|
| `src/lib/theme.ts` | 39 | `--la-color-class-covert` | `HC_COLOR` constant: `var(--la-color-class-covert)` | — | Token routing (definition, not direct usage) |
| `src/lib/theme.ts` | 40 | `--la-color-class-instinct` | `HC_COLOR` constant | — | Token routing |
| `src/lib/theme.ts` | 41 | `--la-color-class-ranged` | `HC_COLOR` constant | — | Token routing |
| `src/lib/theme.ts` | 42 | `--la-color-class-strength` | `HC_COLOR` constant | — | Token routing |
| `src/lib/theme.ts` | 43 | `--la-color-class-tech` | `HC_COLOR` constant | — | Token routing |
| `src/components/CardDetail.vue` | 160 | Via `HC_COLOR[card.hc]` | `:style="{ color: HC_COLOR[card.hc] }"` on `<span class="stat-value">` — hero class name text | **icon-accent** | **PASS** — class color on text glyph, neutral surrounding surface |
| `src/components/CardDetail.vue` | 234 | Via `HC_COLOR[token.value]` | `:style="{ color: HC_COLOR[token.value] }"` on inline hero-class ability token | **icon-accent** | **PASS** — class color on text identifying hero class |
| `src/components/CardGrid.vue` | 123 | Via `HC_COLOR[card.hc]` | `:style="{ color: HC_COLOR[card.hc] }"` on `<span class="hc-tag">` | **icon-accent** | **PASS** — class color on tag text in card grid |
| `public/brand-tokens.local.css` | 138-147 | All 10 | Token definitions (fallback) | — | **EXCLUDED** |

All three Vue template usages apply class color as text `color` on elements that semantically identify a specific hero class (class name label, class ability token, class tag). The surrounding surface is neutral. This matches the **icon-accent** application pattern from §4.4.

The `HC_COLOR` constant routes through `var(--la-color-class-*)` references (not raw hex) — correct token discipline. Only the five bright variants are used; muted variants are not consumed at v1 (acceptable — muted pairs exist for contrast pairing when needed).

**Result: PASS. All consumer-side token references match §4.4 application patterns.**

---

## Check 4 — Disallowed contexts

Every token reference identified in Checks 2-3 was reviewed against the four §10 prohibitions:

| Prohibition | www | arena-client | registry-viewer | Result |
|---|---|---|---|---|
| Brand identity surfaces (logo, header bg, hero gradients, marketing visuals) | No class-color usage | No class-color usage | No class-color usage | **PASS** |
| CTA backgrounds (`.btn`, `.button`, primary action elements) | No class-color usage | No class-color usage | No class-color usage | **PASS** |
| Semantic state indicators (success / warning / error / info) | No class-color usage | No class-color usage | No class-color usage | **PASS** |
| Interactive affordances (links, focus rings, hover states) | No class-color usage | No class-color usage | `HC_COLOR` used on `:style` `color` property, NOT on link/focus/hover | **PASS** |

Registry-viewer detail: the three `HC_COLOR` usages (`CardDetail.vue:160`, `CardDetail.vue:234`, `CardGrid.vue:123`) apply class color to static text labels/tags, not to interactive elements. The `<span>` elements are informational displays, not links or buttons. No `a`, `button`, `:focus`, `:hover`, or `:active` styling uses class-color tokens.

**Result: PASS. Zero §10 violations across all three repos.**

---

## Check 5 — `/brand/` content vs styling boundary

| File | Evidence | Result |
|---|---|---|
| `layouts/brand/list.html` | Zero `--la-color-class-*` references (grep returned no matches) | **PASS** |
| `layouts/_shortcodes/brand-swatch.html` | Renders `background: var(<token>)` where `<token>` is passed from content markdown. Shortcode itself contains zero raw hex. When invoked with class-color tokens (`_index.md:784-788`), the class color is the *displayed content* of the swatch, not brand-page styling. | **PASS** |
| `content/brand/_index.md` | Zero inline `style=` attributes with class-color tokens. Class colors appear only as: (1) shortcode parameters (lines 784-788), (2) prose documentation text (lines 182, 236, 1128). | **PASS** |
| `assets/css/extended/custom.css` | Zero `--la-color-class-*` in CSS property values. Line 860 is a CSS comment documenting the constraint. Comment block at lines 857-863 explicitly states: "Class-color tokens are NEVER used as brand-page surface colours; they appear only as `background` on `.brand-swatch`." | **PASS** |

The `/brand/` page uses generic `--la-*` tokens for its own styling (backgrounds, text, borders, accents). Class colors appear only as content-display: swatch blocks showing "what the color looks like" and prose text documenting usage rules.

**Result: PASS. Content-vs-styling boundary intact.**

---

## Violations and remediation

**Total violations: 0.**

No remediation tickets required. The class-color subsystem is clean across all three consumer repos at v1.

---

## Reproducibility

All RG recipes above are copy-paste runnable from a clean clone of each repo. Output uses `--no-heading --color=never -n` flags for stable diffable output. The environment section at the top of this document records rg version, OS, and shell.

A second operator can reproduce these grep outputs and reach identical pass/fail conclusions using only this findings document and fresh clones of:
- `legendary-arena-com` at commit `56ac8ec`
- `legendary-arena` (engine monorepo) at commit `6f5c72a`
