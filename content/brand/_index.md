---
title: "Brand"
url: "/brand/"
description: "Legendary Arena brand system — colors, typography, tokens, art direction, and usage."
summary: "Legendary Arena brand system — colors, typography, tokens, art direction, and usage."
---

## Brand Overview {#brand-overview}

Legendary Arena's visual identity is a token-driven design system
shared across three surfaces: `www.legendary-arena.com` (marketing),
`play.legendary-arena.com` (game client), and
`cards.barefootbetters.com` (card registry). This page is the public
reference for external creators and partners; the canonical sources
live under [`docs/brand/*.md`][brand-docs] and
[`/brand-tokens.css`][tokens].

[brand-docs]: https://github.com/legendary-arena/legendary-arena-website/tree/main/docs/brand
[tokens]: /brand-tokens.css

## Logo + Identity {#logo-identity}

<p>
  <img src="/brand/logo/logo-la-dark-400x200.svg"
       alt="Legendary Arena wordmark (gold on dark — primary)"
       class="brand-logo"
       width="400" height="200" />
</p>

- **Primary** — gold on dark, `/brand/logo/logo-la-dark-400x200.svg`
- **Inversion** — white-only, `/brand/logo/logo-la-light-400x200.svg`
  (only when a light surface forces inversion)
- **Icon / favicon** — `/brand/logo/legendary-arena-icon.svg`

**Failure mode.** Do not apply class colors
(`--la-color-class-*`) to the logo — class colors communicate gameplay
role, not brand identity (see
[`palette.md` §4.4][palette]).

[palette]: https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/palette.md

## Core Identity (Narrative) {#core-identity}

Brand voice: **cinematic, mature, heroic**. Direct sentences, active
verbs, no irony — see [`strategy.md` §2][strategy-voice] for the full
voice + tone rules.

**Identity colors** — three, deliberately restrained:

- **Gold** — recognition, headlines, achievement, victory
- **Maroon** (deep, not cherry) — action, CTAs, attack semantic
- **Navy** (deep, not royal) — system, links, recruit semantic

**Class colors are gameplay-only.** The five class tokens
(`--la-color-class-{strength,covert,instinct,ranged,tech}`) identify a
hero's gameplay class on chips, filters, deck-builder, and class
borders — never brand surface, never CTA, never logo. They appear
inside the §Color System collapsible with the gameplay-only
annotation.

[strategy-voice]: https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/strategy.md

## Color System {#color-system}

Visual summary first; the full per-mode spec (with class colors)
lives in the collapsible below.

### Visual summary

**Identity (brand-recognition surfaces)**

<div class="brand-swatch-grid">
{{< brand-swatch token="--la-color-gold" role="Identity · Gold" >}}
{{< brand-swatch token="--la-color-red" role="Identity · Maroon" >}}
{{< brand-swatch token="--la-color-blue" role="Identity · Navy" >}}
</div>

**Action (CTA / interactive)**

<div class="brand-swatch-grid">
{{< brand-swatch token="--la-color-cta" role="Action · CTA" >}}
{{< brand-swatch token="--la-color-blue-bright" role="Interactive · Affordance" >}}
{{< brand-swatch token="--la-color-gold-bright" role="Accent · Bright" >}}
</div>

**System (surface / text)**

<div class="brand-swatch-grid">
{{< brand-swatch token="--la-color-bg-primary" role="Surface · Page" >}}
{{< brand-swatch token="--la-color-bg-secondary" role="Surface · Section" >}}
{{< brand-swatch token="--la-color-text-primary" role="Text · Primary" >}}
</div>

`--la-color-cta` is mode-stable at `#7a1d1f` (~10.4:1 contrast on
white text in both modes — AAA). `--la-color-blue-bright` carries
interactive affordance; the deeper `--la-color-blue` base reads
decorative on its own (see
[`palette.md` §4.3](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/palette.md)).

<details>
<summary>Full color spec (supporting neutrals, semantics, class colors)</summary>

**Backgrounds + surfaces**

<div class="brand-swatch-grid">
{{< brand-swatch token="--la-color-bg-primary" role="bg-primary" >}}
{{< brand-swatch token="--la-color-bg-secondary" role="bg-secondary" >}}
{{< brand-swatch token="--la-color-bg-tertiary" role="bg-tertiary" >}}
{{< brand-swatch token="--la-color-surface" role="surface" >}}
{{< brand-swatch token="--la-color-surface-hover" role="surface-hover" >}}
</div>

**Text + borders**

<div class="brand-swatch-grid">
{{< brand-swatch token="--la-color-text-primary" role="text-primary" >}}
{{< brand-swatch token="--la-color-text-secondary" role="text-secondary" >}}
{{< brand-swatch token="--la-color-text-muted" role="text-muted" >}}
{{< brand-swatch token="--la-color-border-subtle" role="border-subtle" >}}
{{< brand-swatch token="--la-color-border-strong" role="border-strong" >}}
</div>

**Brand colors — full scale (each has bright + muted siblings)**

<div class="brand-swatch-grid">
{{< brand-swatch token="--la-color-gold" role="gold" >}}
{{< brand-swatch token="--la-color-gold-bright" role="gold-bright" >}}
{{< brand-swatch token="--la-color-gold-muted" role="gold-muted" >}}
{{< brand-swatch token="--la-color-red" role="red" >}}
{{< brand-swatch token="--la-color-red-bright" role="red-bright" >}}
{{< brand-swatch token="--la-color-red-muted" role="red-muted" >}}
{{< brand-swatch token="--la-color-blue" role="blue" >}}
{{< brand-swatch token="--la-color-blue-bright" role="blue-bright" >}}
{{< brand-swatch token="--la-color-blue-muted" role="blue-muted" >}}
{{< brand-swatch token="--la-color-cta" role="cta" >}}
{{< brand-swatch token="--la-color-cta-bright" role="cta-bright" >}}
{{< brand-swatch token="--la-color-cta-muted" role="cta-muted" >}}
</div>

**Semantic states**

<div class="brand-swatch-grid">
{{< brand-swatch token="--la-color-success" role="success" >}}
{{< brand-swatch token="--la-color-warning" role="warning" >}}
{{< brand-swatch token="--la-color-error" role="error · pure-red family" >}}
</div>

Error red (`--la-color-error`, pure-red family) must remain
visually distinct from CTA red (maroon family) in both modes —
[`palette.md` §5.3](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/palette.md).

**Class colors — gameplay-only.** These tokens identify a hero's
gameplay class on chips, deck-builder selection, filter states, and
class borders. **Not brand identity** — must not appear as
brand-page surface, CTA, system semantic, marketing, or logo.

<div class="brand-swatch-grid">
{{< brand-swatch token="--la-color-class-strength" role="class · strength · gameplay-only" >}}
{{< brand-swatch token="--la-color-class-covert" role="class · covert · gameplay-only" >}}
{{< brand-swatch token="--la-color-class-instinct" role="class · instinct · gameplay-only" >}}
{{< brand-swatch token="--la-color-class-ranged" role="class · ranged · gameplay-only" >}}
{{< brand-swatch token="--la-color-class-tech" role="class · tech · gameplay-only" >}}
</div>

</details>

## Typography System {#typography-system}

Three locked families carry the type system. The display face is used
sparingly for hero / H1 / H2 only; body is the default for everything
readable; mono is reserved for code, registry, and card-stat surfaces.

### Visual summary

{{< brand-font-sample family="display" sample="LEGENDARY ARENA" >}}
{{< brand-font-sample family="body" sample="Forge a deck. Rally allies. Unleash a legendary turn." >}}
{{< brand-font-sample family="mono" sample="--la-color-gold: #b8901f;" >}}

Display: **Bebas Neue** (Anton/Oswald fallbacks). Body: **Inter**
(system-ui fallback). Mono: **JetBrains Mono** (IBM Plex Mono /
Consolas fallback). Full stacks in
[`typography.md` §3](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/typography.md).

<details>
<summary>Full typography spec (size scale, weights, letter-spacing)</summary>

The rem-based scale uses 16px as its base. Each role has a paired
size + line-height + weight token in `static/brand-tokens.css`.

| Role | Size token | Size | Line-height token | Weight token |
|---|---|---|---|---|
| Hero | `--la-font-size-hero` | 3.5rem / 56px | `--la-line-height-hero` (1.05) | `--la-font-weight-h1` (700) |
| H1 | `--la-font-size-h1` | 3rem / 48px | `--la-line-height-h1` (1.1) | `--la-font-weight-h1` (700) |
| H2 | `--la-font-size-h2` | 2.25rem / 36px | `--la-line-height-h2` (1.15) | `--la-font-weight-h2` (700) |
| H3 | `--la-font-size-h3` | 1.75rem / 28px | `--la-line-height-h3` (1.2) | `--la-font-weight-h3` (600) |
| H4 | `--la-font-size-h4` | 1.375rem / 22px | `--la-line-height-h4` (1.3) | `--la-font-weight-h4` (600) |
| H5 | `--la-font-size-h5` | 1.125rem / 18px | `--la-line-height-h5` (1.4) | `--la-font-weight-h5` (500) |
| H6 | `--la-font-size-h6` | 1rem / 16px | `--la-line-height-h6` (1.5) | `--la-font-weight-h6` (500) |
| Body | `--la-font-size-body` | 1rem / 16px | `--la-line-height-body` (1.6) | `--la-font-weight-body` (400) |
| Small | `--la-font-size-small` | 0.875rem / 14px | `--la-line-height-small` (1.5) | `--la-font-weight-small` (400) |

Hero / H1 / H2 use uppercase with the display letter-spacing token
(`--la-letter-spacing-display`, 0.04em); H3-H6 and body remain in
sentence case. Body text must not drop below 14px anywhere it's
expected to be readable.

</details>

## Token Contract {#token-contract}

All visual styling MUST consume the canonical tokens defined in
[`/brand-tokens.css`](/brand-tokens.css). No raw hex values. No
ad-hoc typography. All consumers (`www.*`, `play.*`, `cards.*`)
consume tokens via cross-origin link.

Governance lineage: **WP-002** locked the v1 token surface
(breaking changes require `v1 → v2` + coordinated consumer
updates); **WP-006** deployed `/brand-tokens.css` with cross-origin
headers; **WP-007a / WP-007b** wired the play client and registry
to consume tokens cross-origin with a bundled fallback per consumer.

`/brand-tokens.css` is a **public API** — treat any proposed token
change as an API change.

## Usage Guidelines {#usage-guidelines}

Bright lines from
[`strategy.md` §10](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/strategy.md)
+ [`palette.md` §10](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/palette.md).

<ul class="usage-rules">
  <li class="usage-do">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg></span>
    <strong>DO</strong> use <code>--la-color-blue-bright</code> on
    interactive elements — links, focus rings, hover, active. The
    deeper navy base reads decorative.
  </li>
  <li class="usage-do">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg></span>
    <strong>DO</strong> use <code>--la-color-cta</code> for primary
    CTA backgrounds — mode-stable, AAA on white text.
  </li>
  <li class="usage-do">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg></span>
    <strong>DO</strong> render the logo as gold-on-dark (primary) or
    white-only (inversion). Two treatments only.
  </li>
  <li class="usage-dont">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></span>
    <strong>DON'T</strong> use class colors
    (<code>--la-color-class-*</code>) for branding, marketing, CTAs,
    or the logo. Gameplay tags, not identity.
  </li>
  <li class="usage-dont">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></span>
    <strong>DON'T</strong> reuse brand red
    (<code>--la-color-red</code> / <code>-cta</code>, maroon family)
    as an error state. Error uses <code>--la-color-error</code>
    (pure-red family).
  </li>
  <li class="usage-dont">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></span>
    <strong>DON'T</strong> introduce raw hex / font / spacing values.
    Every visual resolves through <code>var(--la-*)</code>.
  </li>
</ul>

## Art Direction (Mood Board) {#art-direction}

This is the art-direction brief used when commissioning the
one-page Legendary Arena mood board poster. Artists, partners, and
integrators use it to interpret the brand consistently. The
canonical source is
[`docs/brand/mood-board-spec.md`](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/mood-board-spec.md);
the body is inlined here at render time so a single edit
propagates.

{{< readfile file="/docs/brand/mood-board-spec.md" markdown="true" >}}
