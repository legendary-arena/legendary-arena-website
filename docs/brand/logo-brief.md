# Legendary Arena — Logo Design Brief (draft)

**Status:** Draft — design input for the deferred real-logo effort
**Owner:** Jeffery Jensen
**Last updated:** 2026-05-07

> **Authority:** This brief is subordinate to `01-VISION.md`,
> `docs/brand/strategy.md`, `docs/brand/palette.md`, and
> `docs/brand/typography.md`. Where this brief and any of those
> documents disagree, those documents win and this brief is treated
> as broken until corrected. The v1 wordmark placeholder
> ("Legendary Arena" set in the locked display typeface) remains in
> effect until a logo produced under this brief is reviewed and
> accepted.

---

## 1. Product, in one sentence

**Legendary Arena** is a skill-first, web-based deck-building game
where players assemble decks, face deterministic scenarios, and earn
standing through demonstrated mastery. The logo will identify this
product across three properties — `www.legendary-arena.com`
(marketing), `play.legendary-arena.com` (live game), and the registry
site (`cards.barefootbetters.com` → future
`registry.legendary-arena.com`).

## 2. Audience

- **Primary:** players of the original Legendary deck-building game
  looking for a digital adaptation; deck-building enthusiasts new to
  LA.
- **Secondary:** press, partners, IP holders.
- The brand surface never references the source IP. The logo must
  read as *original* — comprehensible without Marvel familiarity.

## 3. Brand positioning the logo must carry

- **Heroic, not playful.** Weight and consequence over whimsy.
- **Skill-first.** Earned mastery, not luck-driven.
- **Deterministic system.** Consistent, knowable rules — not chaos.
- **Player agency leads.** The logo is for the player who *assembles,
  fights, masters, earns, becomes* — not for spectators.
- **No grind, no pay-to-win, no live-service connotations.** Avoid
  imagery that reads as RPG-loot or mobile-game-sticker.

The verb palette the brand runs on:
*assemble · build · recruit · fight · master · defeat · earn · become*.
The logo should feel like the visual end-state of those verbs.

**Visual translation guidance:**

- **Heroic** → strong verticals, sharp terminals, disciplined weight
  contrast. Avoid rounded, bubbly forms.
- **Deterministic / skill-first** → symmetry, repeatable geometry,
  grid-aligned construction.
- **Player agency** → forward motion, upward thrust, or converging
  structure. Avoid passive or purely static marks.
- **No grind / no loot** → low ornament density. No sparkle, glow-burst,
  or reward-pop visuals.

## 4. What the logo must do

Deliver a coordinated identity system, not a single asset:

1. **Primary wordmark** — "Legendary Arena" set in (or visually
   compatible with) **Bebas Neue** (display typeface; condensed,
   uppercase-friendly, high-impact). This replaces the v1 wordmark
   placeholder.
2. **Secondary lockup** — wordmark with an iconographic mark.
3. **Standalone mark / monogram** — works as favicon, social avatar,
   app icon, and play-button affordance at 16px, 32px, 64px, 256px,
   512px.
4. **Horizontal and stacked** versions of the lockup.
5. **Light-mode and dark-mode** variants — both must be first-class,
   not an afterthought. Site backgrounds:
   - Light: `#fdfcf8` (warm off-white)
   - Dark: `#0b0f19` (deep navy-black)
6. **Monochrome** version (single-ink) for embossing, merch,
   watermarks, legal-doc letterheads.

## 5. Locked visual constraints (non-negotiable)

These are pulled from `docs/brand/palette.md` and
`docs/brand/typography.md`. The logo must live inside this system,
not next to it.

**Color roles** — the logo may use any of these; it must not
introduce new hues.

| Role | Token | Light | Dark |
|---|---|---|---|
| Brand / achievement / victory | `--la-color-gold` | `#b8901f` | `#d4af37` |
| Action / attack / hero red | `--la-color-red` | `#c92a30` | `#e5484d` |
| System / recruit / interaction | `--la-color-blue` | `#2563eb` | `#3b82f6` |
| Page background | `--la-color-bg-primary` | `#fdfcf8` | `#0b0f19` |
| Text primary | `--la-color-text-primary` | `#1a1d2e` | `#f5f7fb` |

The brand uses **gold for mastery/victory, red for action, blue for
system**. A gold-led mark reads as "the prize"; a red-led mark reads
as "the fight"; a blue-led mark reads as "the system."

Color must be used intentionally by role:

- **Gold** = default primary (mastery / brand ownership).
- **Red or blue** = optional secondary. Never equal-weight with gold.
- All three colors must not appear at equal visual dominance.

Maximum recommended: **one primary + one accent**.

**Typography pairing**

- Display: **Bebas Neue** (fallbacks: Anton, Oswald). Condensed,
  uppercase-friendly. Tracking ~`0.04em` when set
  (`--la-letter-spacing-display`).
- The wordmark should be visually compatible with Bebas Neue even if
  the final letterforms are custom-drawn for a unique mark.
- Body: **Inter** (the logo will sit next to Inter copy in headers
  and footers — make sure they coexist).

**Mode parity** — the dark-mode variant is not a tinted copy of the
light-mode variant. It should be designed to feel native on `#0b0f19`
(cinematic, depth-forward). The light-mode variant should feel native
on `#fdfcf8` (paper-like, less harsh than pure white).

**Accessibility** — any text-bearing element of the mark must hit
WCAG AA contrast (4.5:1 body / 3:1 large) against both background
tokens, in both modes.

## 5.1 Priority order (when constraints conflict)

When design goals compete, resolve in this order:

1. Legibility at small sizes (16px+)
2. Single-ink recognizability
3. Shape distinctiveness / ownability
4. Brand alignment (heroic, deterministic, skill-first)
5. Color expression (gold / red / blue roles)
6. Decorative or secondary detail

No solution is valid if it compromises #1 or #2.

## 5.2 Small-size behavior (favicon constraints)

At 16–32px:

- The mark must read as a single identifiable silhouette.
- No internal detail relying on strokes thinner than ~1.5px equivalent
  at 16px.
- Counters (negative space) must remain open and legible.
- Color usage must collapse cleanly to 1–2 readable tones.

A design that fails any of these constraints is invalid, regardless
of how well it performs at larger sizes.

## 6. Conceptual cues (open territory — pick or remix)

The brand's positioning gives the designer real conceptual range.
Useful starting points:

- **The arena.** A space, not a stage. Implies confrontation,
  structure, witness. *Not* gladiatorial Roman pastiche — read more
  "ranked-ladder coliseum of the mind" than "swords and sandals."
- **The deck.** Cards are the player's instrument. Stacked, fanned,
  edge-on — the silhouette of a deck is a brand-true shape.
- **Assembly + escalation.** The fantasy is "heroes uniting against
  an escalating threat." A mark that holds a sense of *gathering
  force* fits.
- **Mastery / achievement.** Gold laurels, sigils, seals, monograms —
  handle with care; can tip into generic "esports trophy."
- **Determinism.** Geometric rigor. Symmetry. A grid-true mark
  suggests a knowable system.
- **The "LA" monogram.** Strong candidate for the standalone mark —
  clean, ownable, works at favicon scale, sidesteps illustrative
  pitfalls.

**Preferred direction** (not mandatory, but high-probability fit):

A **geometric LA monogram or arena-disc mark**, built from
**hard-edged, grid-aligned forms**, capable of rendering as a clean
silhouette at 16px, with **gold as primary** and **one accent (red or
blue)** used sparingly. Pair with a **condensed uppercase wordmark**
in Bebas Neue.

Avoid multi-element compositions that cannot collapse into a single
compact icon.

## 7. Hard don'ts

- No emoji-style, mascot, or character illustration.
- No reproduction or evocation of protected character names,
  costumes, or imagery (Marvel/Legendary-source). Mechanic vocabulary
  (Hero, Mastermind, Scheme) is *terminology*, not visual reference.
- No "fan project," "community," "homebrew" visual language. The
  brand never describes itself as a fan project in user-facing
  surfaces.
- No swords, capes, lightning bolts, or generic comic-book tropes.
- No "epic / awesome / legendary-with-a-flame" stock language
  treatments.
- No gradients masquerading as the whole identity. Gradients exist as
  an accent (`--la-gradient-hero`, `--la-gradient-gold`) — they are
  not the logo.
- No drop-shadow-heavy, bevel-heavy, "gaming clan" aesthetic.
- No reliance on color alone — the mark must read in single-ink
  monochrome.
- No designs that fail at 16px favicon scale.
- No micro-detail linework or fine engraving that collapses at small
  sizes.

## 8. Deliverables

- Master vector source (SVG, plus AI/Figma original).
- Exported PNGs at 16, 32, 64, 128, 256, 512, 1024 (light and dark).
- Favicon set (`favicon.ico`, `apple-touch-icon`, maskable PWA icon).
- Open Graph / social share image template (1200×630) using the
  lockup.
- One-page usage guide: clear-space, minimum sizes, approved color
  pairings against the locked tokens, do/don't examples.
- SVG exports must reference brand tokens where possible — no baked
  raw hex values where avoidable. `currentColor` and CSS-variable
  references are preferred so the mark inherits the active theme.
- All deliverables must reference brand tokens by name in the usage
  guide — no raw hex outside `static/brand-tokens.css`.

## 9. Acceptance criteria

The logo system is accepted when **all** of the following hold:

- Renders cleanly at 16px (favicon) and at 1024px+ (hero) without
  redrawing.
- Light-mode and dark-mode variants both pass WCAG AA against their
  respective `--la-color-bg-primary` token.
- When placed in a standard header (Bebas Neue display + Inter body),
  the logo does not overpower or visually clash with adjacent
  typography at equal height.
- The standalone mark is recognizable without the wordmark at 32px.
- Reads as original (no IP-dependent comprehension).
- Single-ink monochrome version exists and is legible.
- No ad-hoc colors introduced; every color used maps to an existing
  `--la-color-*` token.

---

## 10. Source documents consulted

This brief is derived from the following locked artifacts. If those
documents change in ways that affect logo design (palette, type, or
positioning), update this brief in the same change.

- `01-VISION.md` — purpose, audience, three-site architecture,
  brand-token contract, "wordmark placeholder for v1" decision
- `docs/brand/strategy.md` — positioning, voice, tone invariants,
  verb palette, terminology, visual direction inputs, logo-treatment
  note (§6), source/IP considerations (§9)
- `docs/brand/palette.md` — locked color tokens and contrast pairs
- `docs/brand/typography.md` — locked display/body/mono fonts and
  tracking
