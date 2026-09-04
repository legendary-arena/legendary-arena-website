---
title: "Brand"
url: "/brand/"
description: "Legendary Arena brand system — colors, typography, tokens, art direction, and usage."
summary: "Legendary Arena brand system — colors, typography, tokens, art direction, and usage."
---

<div class="brand-meta">
  <span>Token version: <strong>v1</strong></span>
  <span>Last updated: <strong>2026-09-04</strong></span>
  <span>Surfaces: <code>www</code> · <code>play</code> · <code>cards</code></span>
</div>

## Brand Overview {#brand-overview}

**Legendary Arena is a competitive deck-building game where mastery — not luck — determines victory.**

Players assemble a team of heroes, build synergy, and overcome
escalating scenarios driven by a mastermind villain. Every decision
compounds. Every card matters. The system rewards knowledge,
sequencing, and execution.

This page defines the **visual and interaction system** that carries
that identity across every surface.

### Mission

To build the definitive, faithful, digital home for the greatest
cooperative deck-building experience ever created — engineered to
last, funded in a way that protects the vision forever, and designed
to send real value back to the creators who make it possible.

### Vision

Legendary Arena becomes not only a place to play, but a **training
ground for mastery** — where excellence is measurable, replayable,
and earned.

### Slogan

**Mastery — not luck — determines victory.**

### The brand in 30 seconds

Legendary Arena is the digital adaptation of the Legendary
deck-building game. You recruit heroes, build synergy, and face
escalating scenarios driven by a mastermind villain. There is no
luck gate, no grind treadmill, no pay-to-win shortcut. The game
measures *how well* you played — not how long or what you unlocked.
A PAR-based scoring system makes skill visible, improvement
measurable, and every scenario worth revisiting with intention.
Every game is replayable, every score is verified, and competition
is earned through demonstrated mastery.

### Brand themes

Four themes define the emotional territory of Legendary Arena:

- **Mastery** — skill is the only currency; victory is earned
- **Heroism** — saving lives outweighs playing it safe; the scoring
  system rewards courage over caution
- **Escalation** — difficulty compounds; every decision echoes
  forward through the scenario
- **Integrity** — fairness is structural, not moderated; replays are
  deterministic, scores are transparent, and the system never lies

### Emotional framework

The brand should make people feel:

- **Accomplishment** — "I earned this"
- **Agency** — "My decisions mattered"
- **Respect** — "This system treats me as a capable player"
- **Aspiration** — "I can get better at this"

The brand must never make people feel manipulated, lucky, or
patronized.

## Start Here {#start-here}

Legendary Arena's visual identity is a **token-driven design system**
shared across three surfaces. All styling resolves through
[`/brand-tokens.css`](/brand-tokens.css) — no raw hex, no ad-hoc
typography. This page is the single reference for using the system.

<div class="brand-quickstart">
  <a href="#color-system" class="brand-quickstart__card">
    <strong>Designer</strong>
    <span>Logo, color palette, type scale, art direction, do/don't rules</span>
  </a>
  <a href="#token-contract" class="brand-quickstart__card">
    <strong>Developer</strong>
    <span>Token contract, copy-paste snippets, spacing scale, interaction patterns</span>
  </a>
  <a href="#usage-guidelines" class="brand-quickstart__card">
    <strong>Partner / Artist</strong>
    <span>Usage guidelines, brand voice, art direction brief, asset downloads</span>
  </a>
</div>

**One rule:** every visual value resolves through `var(--la-*)`.
The canonical source lives at
[`docs/brand/*.md`][brand-docs] in the repo.

[brand-docs]: https://github.com/legendary-arena/legendary-arena-website/tree/main/docs/brand

## The Game {#the-game}

Legendary Arena is a digital adaptation of the **Legendary**
deck-building game. Players assemble a team of heroes, face
escalating scenarios driven by a mastermind villain, and earn
standing through demonstrated mastery — not luck, not grind.

The core loop: **recruit heroes, build synergy, defeat the
mastermind.** Every card in a player's deck is a deliberate choice.
The game rewards knowledge of card interactions and sequencing
over randomness.

<div class="brand-card-showcase">
  <figure class="brand-card-figure">
    <img src="https://images.legendary-arena.com/rlmk/rlmk-hr-medusa-splitting-hairs.webp"
         alt="Hero card — Medusa, Splitting Hairs (Realm of Kings set)"
         loading="lazy" />
    <figcaption>Hero card — recruited into a player's deck</figcaption>
  </figure>
  <figure class="brand-card-figure">
    <img src="https://images.legendary-arena.com/ff04/ff04-mm-galactus.webp"
         alt="Mastermind card — Galactus (Fantastic Four set)"
         loading="lazy" />
    <figcaption>Mastermind card — the villain players defeat</figcaption>
  </figure>
</div>

**Four properties** carry the brand across the product:

- **[`www.legendary-arena.com`](https://www.legendary-arena.com)** — marketing, brand page, blog
- **[`play.legendary-arena.com`](https://play.legendary-arena.com)** — live game client
- **[`cards.legendary-arena.com`](https://cards.legendary-arena.com)** — card registry and browsing
- **[`ewiki.legendary-arena.com`](https://ewiki.legendary-arena.com)** — engineering wiki (architecture,
  decisions, inventory)

The first three consume the same token system
([`/brand-tokens.css`](/brand-tokens.css)) so the visual language
is consistent across every surface a player touches. The engineering
wiki is governed by the engine monorepo and is not a brand-tokens
consumer in v1.

## Logo + Identity {#logo-identity}

The mark is a single emblem split down the centre: a **gold winged sword**
(the hero, the light) mirrored against a **white bone-and-horn mark** (the
villain, the dark). That good-versus-evil duality is the brand made visible —
heroic, symmetric, gold-led. It replaces the v1 wordmark placeholder and the
earlier geometric exploration.

The emblem is built for **dark surfaces**; the white villain half is designed
against the deep-navy ground. On a light surface, use the monochrome single-ink
mark rather than the full-colour emblem.

### Primary lockup — emblem + wordmark

The default identity wherever there is horizontal room: site headers, press,
marketing heroes.

<p style="background: #0b0f19; padding: var(--la-space-4); border-radius: var(--la-radius-md); display: inline-block;">
  <img src="/brand/logo/logo-la-lockup.svg"
       alt="Legendary Arena primary lockup — the hero/villain emblem beside the LEGENDARY ARENA wordmark"
       class="brand-logo"
       style="height: 120px; width: auto;" />
</p>

### The emblem — standalone mark

The mark on its own: favicon, social avatar, app icon, game HUD badge.

<p style="background: #0b0f19; padding: var(--la-space-4); border-radius: var(--la-radius-md); display: inline-block;">
  <img src="/brand/logo/logo-la-emblem.svg"
       alt="Legendary Arena emblem — gold winged sword hero half mirrored by a white horned villain mark"
       class="brand-logo"
       style="height: 200px; width: auto;" />
</p>

### Wordmark

For text-only lockups, or where the emblem is shown separately.

<p style="background: #0b0f19; padding: var(--la-space-4); border-radius: var(--la-radius-md); display: inline-block;">
  <img src="/brand/logo/logo-la-wordmark.svg"
       alt="Legendary Arena wordmark — LEGENDARY in gold above ARENA in white"
       class="brand-logo"
       style="height: 90px; width: auto;" />
</p>

### Monochrome — single ink

For merch, embossing, watermarks, and light surfaces. One ink, no gradient;
shown here in black on light.

<p style="background: var(--la-color-bg-primary); padding: var(--la-space-4); border-radius: var(--la-radius-md); display: inline-block;">
  <img src="/brand/logo/logo-la-emblem-mono.svg"
       alt="Legendary Arena monochrome emblem — single-ink silhouette"
       class="brand-logo"
       style="height: 180px; width: auto;" />
</p>

### Assets & downloads {#logo-downloads}

Production-ready SVG masters (transparent; designed for dark surfaces):

- [Primary lockup — `logo-la-lockup.svg`](/brand/logo/logo-la-lockup.svg)
- [Emblem — `logo-la-emblem.svg`](/brand/logo/logo-la-emblem.svg)
- [Wordmark — `logo-la-wordmark.svg`](/brand/logo/logo-la-wordmark.svg)
- [Monochrome emblem — `logo-la-emblem-mono.svg`](/brand/logo/logo-la-emblem-mono.svg)
- [Gold hero half — `logo-la-hero-gold.png`](/brand/logo/logo-la-hero-gold.png)
- Favicon / app icon: [`favicon.svg`](/favicon.svg) · [`favicon.ico`](/favicon.ico) · [maskable `icon-maskable-512.png`](/brand/logo/icon-maskable-512.png)

The editable master is `Legendary Arena-400x200.ai` (kept in the brand
asset store, not in this repo); the SVGs are extracted/traced from it. Colour
and type come from [`/brand-tokens.css`](/brand-tokens.css).

### Non-negotiable rules

- Do not recolor the emblem or restyle its gold gradient — the only sanctioned
  recolor is the **monochrome** master, which is a single ink by design
- Do not add effects (drop shadows, outer glows, bevels) beyond what the master
  already carries
- Do not place the full-colour emblem on a light surface — use the monochrome
  mark there
- Do not apply class colors (`--la-color-class-*`) — class colors communicate
  gameplay role, not brand identity (see [`palette.md` §4.4][palette])
- Do not alter proportions

Violation weakens brand recognition immediately.

[palette]: https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/palette.md

### Clear space & minimum size {#logo-usage}

Keep a clear space of **X = half the mark's height** on every side, free of
other logos, text, or busy imagery.

<p style="display: inline-block;">
  <img src="/brand/logo/guide-clearspace.png"
       alt="Clear-space rule — the lockup inside a dashed exclusion zone set X (half the mark height) from every edge"
       style="max-width: 100%; border-radius: var(--la-radius-md);" />
</p>

Below these minimums, step up a mark (use the emblem where the lockup would
be too small): emblem **24 px**, lockup **120 px** wide, wordmark **100 px**
wide.

<p style="display: inline-block;">
  <img src="/brand/logo/guide-minsize.png"
       alt="Minimum sizes — the emblem at 24 px and the lockup at 120 px wide"
       style="max-width: 100%; border-radius: var(--la-radius-md);" />
</p>

The full clear-space, minimum-size, light/dark pairing matrix, and do/don't
list are in the [logo usage guidelines][logo-usage].

[logo-usage]: https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/logo-usage.md

### Launch & social kit {#social-kit}

Ready-to-post graphics built from the approved lockup on the brand ground:

<p style="display: inline-block; max-width: 520px;">
  <img src="/brand/social/og-image.png"
       alt="Open Graph share image — the Legendary Arena lockup and tagline on the brand navy ground"
       style="max-width: 100%; border-radius: var(--la-radius-md);" />
</p>

- [Open Graph / share image — 1200×630](/brand/social/og-image.png)
- [Facebook cover — 851×315](/brand/social/facebook-cover.png)
- [YouTube banner — 2560×1440 (mark in the TV-safe center)](/brand/social/youtube-banner.png)
- [YouTube watermark — 150×150 (transparent)](/brand/social/youtube-watermark.png)
- [Square avatar — 800×800](/brand/social/avatar-800.png)

## Core Identity (Narrative) {#core-identity}

Brand voice: **cinematic, mature, heroic**. Direct sentences, active
verbs, no irony — see [`strategy.md` §2][strategy-voice] for the full
voice + tone rules.

### Words to avoid

These terms contradict the brand's identity and must not appear in
any brand-facing copy, UI text, or marketing surface:

| Avoid | Why | Use instead |
|-------|-----|-------------|
| luck, RNG, random | Implies outcome is uncontrolled | skill, mastery, decision |
| grind, farm, repeat | Implies value comes from volume | refine, improve, revisit |
| loot, gacha, pack | Implies randomized purchase | content, expansion, set |
| pay-to-win, premium advantage | Violates non-goal NG-1 | cosmetic, supporter, presentation |
| addictive, hooked | Implies exploitation | compelling, rewarding, deep |
| casual | Dismissive of player investment | accessible, approachable |
| meta, tier list | Implies solved optimization | strategy, composition, approach |

### Positioning

Legendary Arena is a **skill-driven strategy system disguised as a
card game**.

- Not luck-driven
- Not grind-based
- Not collection-gated

Victory is earned through **system mastery**. The scoring system
measures *how well* a game was played — never how long, how often,
or what was unlocked.

### Identity colors

Three colors define brand recognition — constraint is intentional:

- **Gold** — achievement, recognition, victory
- **Maroon** (deep, not cherry) — action, CTAs, decisive moments
- **Navy** (deep, not royal) — system, structure, navigation

Additional color reduces signal strength.

**Class colors are gameplay-only.** The five class tokens
(`--la-color-class-{strength,covert,instinct,ranged,tech}`) identify a
hero's gameplay class on chips, filters, deck-builder, and class
borders — never brand surface, never CTA, never logo. They appear
inside the §Color System collapsible with the gameplay-only
annotation.

[strategy-voice]: https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/strategy.md

## Card Graphics {#card-graphics}

The game's visual vocabulary includes three icon families used on
cards, filters, and the deck-builder UI. All icons are SVG,
designed to read clearly at 24px and scale to 64px+.

### Card typography

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bangers&display=swap">

Two fonts appear on cards and card-adjacent UI. These are
**game-specific** — separate from the web token system's three
locked families (Bebas Neue / Inter / JetBrains Mono).

<div class="brand-font-sample brand-font-sample--card-display">
  <span class="brand-font-sample__sample" style="font-family: 'Bangers', cursive;">CORE · DKCY · FF04</span>
  <span class="brand-font-sample__meta">Bangers — card-set icon labels · <a href="https://fonts.google.com/specimen/Bangers">Google Fonts</a></span>
</div>

**Bangers** — all 40 card-set SVGs reference this font for the
expansion abbreviation text. Bold, comic-style letterforms that
stay legible at small icon sizes.

<div class="brand-font-sample brand-font-sample--card-body">
  <span class="brand-font-sample__sample" style="font-family: 'Eurostile', 'Eurostile Condensed', 'Arial Narrow', sans-serif;">Eurostile Condensed</span>
  <span class="brand-font-sample__meta">Eurostile Condensed — card face typography · commercial (URW / Linotype)</span>
</div>

**Eurostile Condensed** — the closest match to the physical card's
title and body text. Clean, technical condensed weight that carries
the card UI's precise feel.

Neither font is part of `brand-tokens.css` — they live in the game
asset pipeline, not the cross-site token contract.

### Hero classes (5)

Each hero belongs to one of five gameplay classes. Class icons
appear on hero cards, filter chips, and class-border treatments.
Class colors are **gameplay-only** — see §Core Identity.

<div class="brand-icon-grid brand-icon-grid--classes">
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-classes/class-strength.svg"
         alt="Strength class icon" loading="lazy" />
    <figcaption>Strength</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-classes/class-covert.svg"
         alt="Covert class icon" loading="lazy" />
    <figcaption>Covert</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-classes/class-instinct.svg"
         alt="Instinct class icon" loading="lazy" />
    <figcaption>Instinct</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-classes/class-ranged.svg"
         alt="Ranged class icon" loading="lazy" />
    <figcaption>Ranged</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-classes/class-tech.svg"
         alt="Tech class icon" loading="lazy" />
    <figcaption>Tech</figcaption>
  </figure>
</div>

### Hero teams (25)

Team icons identify hero affiliations — Avengers, X-Men,
Guardians of the Galaxy, etc. They appear on hero cards and
team-filter UI.

<div class="brand-icon-grid brand-icon-grid--teams">
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-avengers.svg"
         alt="Avengers" loading="lazy" />
    <figcaption>Avengers</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-x-men.svg"
         alt="X-Men" loading="lazy" />
    <figcaption>X-Men</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-spider-friends.svg"
         alt="Spider Friends" loading="lazy" />
    <figcaption>Spider Friends</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-fantastic-four.svg"
         alt="Fantastic Four" loading="lazy" />
    <figcaption>Fantastic Four</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-guardians-of-the-galaxy.svg"
         alt="Guardians of the Galaxy" loading="lazy" />
    <figcaption>Guardians</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-shield.svg"
         alt="S.H.I.E.L.D." loading="lazy" />
    <figcaption>S.H.I.E.L.D.</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-x-force.svg"
         alt="X-Force" loading="lazy" />
    <figcaption>X-Force</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-marvel-knights.svg"
         alt="Marvel Knights" loading="lazy" />
    <figcaption>Marvel Knights</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-champions.svg"
         alt="Champions" loading="lazy" />
    <figcaption>Champions</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-inhumans.svg"
         alt="Inhumans" loading="lazy" />
    <figcaption>Inhumans</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-new-warriors.svg"
         alt="New Warriors" loading="lazy" />
    <figcaption>New Warriors</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-illuminati.svg"
         alt="Illuminati" loading="lazy" />
    <figcaption>Illuminati</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-heroes-of-asgard.svg"
         alt="Heroes of Asgard" loading="lazy" />
    <figcaption>Heroes of Asgard</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-heroes-of-wakanda.svg"
         alt="Heroes of Wakanda" loading="lazy" />
    <figcaption>Heroes of Wakanda</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-foes-of-asgard.svg"
         alt="Foes of Asgard" loading="lazy" />
    <figcaption>Foes of Asgard</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-brotherhood.svg"
         alt="Brotherhood" loading="lazy" />
    <figcaption>Brotherhood</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-cabal.svg"
         alt="Cabal" loading="lazy" />
    <figcaption>Cabal</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-crime-syndicate.svg"
         alt="Crime Syndicate" loading="lazy" />
    <figcaption>Crime Syndicate</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-hydra.svg"
         alt="HYDRA" loading="lazy" />
    <figcaption>HYDRA</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-sinister-six.svg"
         alt="Sinister Six" loading="lazy" />
    <figcaption>Sinister Six</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-mercs-for-money.svg"
         alt="Mercs for Money" loading="lazy" />
    <figcaption>Mercs for Money</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-warbound.svg"
         alt="Warbound" loading="lazy" />
    <figcaption>Warbound</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-venomverse.svg"
         alt="Venomverse" loading="lazy" />
    <figcaption>Venomverse</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-guardians-of-the-multiverse.svg"
         alt="Guardians of the Multiverse" loading="lazy" />
    <figcaption>Guardians of the Multiverse</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/hero-teams/team-x-factor-investigations.svg"
         alt="X-Factor Investigations" loading="lazy" />
    <figcaption>X-Factor</figcaption>
  </figure>
</div>

### Card sets (40)

Set icons identify which expansion a card belongs to. They appear
on card faces and in set-filter dropdowns.

<details>
<summary>All 40 card-set icons</summary>

<div class="brand-icon-grid brand-icon-grid--sets">
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-core.svg"
         alt="Core Set" loading="lazy" />
    <figcaption>Core</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-dkcy.svg"
         alt="Dark City" loading="lazy" />
    <figcaption>Dark City</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-ff04.svg"
         alt="Fantastic Four" loading="lazy" />
    <figcaption>Fantastic Four</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-pttr.svg"
         alt="Paint the Town Red" loading="lazy" />
    <figcaption>Paint the Town Red</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-gotg.svg"
         alt="Guardians of the Galaxy" loading="lazy" />
    <figcaption>Guardians</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-fear.svg"
         alt="Fear Itself" loading="lazy" />
    <figcaption>Fear Itself</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-ssw1.svg"
         alt="Secret Wars Volume 1" loading="lazy" />
    <figcaption>Secret Wars 1</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-ssw2.svg"
         alt="Secret Wars Volume 2" loading="lazy" />
    <figcaption>Secret Wars 2</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-cvwr.svg"
         alt="Civil War" loading="lazy" />
    <figcaption>Civil War</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-dead.svg"
         alt="Deadpool" loading="lazy" />
    <figcaption>Deadpool</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-noir.svg"
         alt="Noir" loading="lazy" />
    <figcaption>Noir</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-xmen.svg"
         alt="X-Men" loading="lazy" />
    <figcaption>X-Men</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-smhc.svg"
         alt="Spider-Man Homecoming" loading="lazy" />
    <figcaption>Homecoming</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-chmp.svg"
         alt="Champions" loading="lazy" />
    <figcaption>Champions</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-wwhk.svg"
         alt="World War Hulk" loading="lazy" />
    <figcaption>World War Hulk</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-antm.svg"
         alt="Ant-Man" loading="lazy" />
    <figcaption>Ant-Man</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-vnom.svg"
         alt="Venom" loading="lazy" />
    <figcaption>Venom</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-dims.svg"
         alt="Dimensions" loading="lazy" />
    <figcaption>Dimensions</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-rlmk.svg"
         alt="Realm of Kings" loading="lazy" />
    <figcaption>Realm of Kings</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-rvlt.svg"
         alt="Revelations" loading="lazy" />
    <figcaption>Revelations</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-anni.svg"
         alt="Annihilation" loading="lazy" />
    <figcaption>Annihilation</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-wpnx.svg"
         alt="Weapon X" loading="lazy" />
    <figcaption>Weapon X</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-msis.svg"
         alt="Messiah Complex" loading="lazy" />
    <figcaption>Messiah Complex</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-cosm.svg"
         alt="Into the Cosmos" loading="lazy" />
    <figcaption>Into the Cosmos</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-shld.svg"
         alt="S.H.I.E.L.D." loading="lazy" />
    <figcaption>S.H.I.E.L.D.</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-dstr.svg"
         alt="Doctor Strange" loading="lazy" />
    <figcaption>Doctor Strange</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-nmut.svg"
         alt="New Mutants" loading="lazy" />
    <figcaption>New Mutants</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-vill.svg"
         alt="Villains" loading="lazy" />
    <figcaption>Villains</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-ca75.svg"
         alt="Captain America 75th" loading="lazy" />
    <figcaption>Cap 75th</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-msmc.svg"
         alt="Messiah Complex" loading="lazy" />
    <figcaption>MSMC</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-msp1.svg"
         alt="Marvel Studios Phase 1" loading="lazy" />
    <figcaption>Phase 1</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-2099.svg"
         alt="2099" loading="lazy" />
    <figcaption>2099</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-3dtc.svg"
         alt="3D Trading Cards" loading="lazy" />
    <figcaption>3D Cards</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-amwp.svg"
         alt="Ant-Man and the Wasp" loading="lazy" />
    <figcaption>Ant-Man &amp; Wasp</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-asrd.svg"
         alt="Asgard" loading="lazy" />
    <figcaption>Asgard</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-bkpt.svg"
         alt="Black Panther" loading="lazy" />
    <figcaption>Black Panther</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-bkwd.svg"
         alt="Black Widow" loading="lazy" />
    <figcaption>Black Widow</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-mdns.svg"
         alt="Midnight Sons" loading="lazy" />
    <figcaption>Midnight Sons</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-mgtg.svg"
         alt="MGTG" loading="lazy" />
    <figcaption>MGTG</figcaption>
  </figure>
  <figure class="brand-icon-figure">
    <img src="https://images.legendary-arena.com/icons/card-sets/set-wtif.svg"
         alt="What If" loading="lazy" />
    <figcaption>What If</figcaption>
  </figure>
</div>

</details>

## Why This System Exists {#why-this-system-exists}

The brand system enforces four properties:

- **Consistency** — one visual language across all surfaces
- **Scalability** — new features inherit design automatically
- **Velocity** — design decisions are pre-encoded in tokens
- **Integrity** — brand cannot drift over time

The token layer is not styling — it is **governance encoded as code**.

## Color System {#color-system}

Visual summary first; the full per-mode spec (with class colors)
lives in the collapsible below.

### How to think about color

| Category | Purpose |
|----------|---------|
| Identity | Recognition surfaces — gold, maroon, navy |
| Action | Interaction and CTA — what the user clicks |
| System | Layout and readability — backgrounds, text, borders |

### Palette reference (light + dark)

<p>
  <img src="/images/brand/palette.svg"
       alt="Legendary Arena color palette v1 — all tokens in light and dark mode"
       width="720" />
</p>

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

System colors must **never compete** with identity colors.

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

### Bebas Neue — display

{{< brand-font-sample family="display" sample="BEBAS NEUE" >}}

Condensed, high-impact, uppercase-friendly. Used for hero, H1, and
H2 only — never body text. Fallbacks: Anton, Oswald, system-ui.

Effect: **impact, cinematic scale, authority**.

### Inter — body

{{< brand-font-sample family="body" sample="Inter" >}}

Highly readable at all sizes, neutral tone. The default for everything
readable — paragraphs, navigation, UI. Fallbacks: system-ui,
-apple-system, Segoe UI.

Effect: **clarity, neutrality, readability**.

### JetBrains Mono — mono

{{< brand-font-sample family="mono" sample="JetBrains Mono" >}}

Code blocks, card stats, token references, technical content.
Fallbacks: IBM Plex Mono, Consolas.

Effect: **precision, technical clarity**.

Full font stacks in
[`typography.md` §3](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/typography.md).

### Type scale — live samples

Each sample below renders at its actual size, weight, and font.
Hero / H1 / H2 use the display face (Bebas Neue) in uppercase;
H3-H6 and body use the body face (Inter) in sentence case.

<div style="display: flex; flex-direction: column; gap: var(--la-space-4); margin: var(--la-space-5) 0;">
  <div style="padding: var(--la-space-3) var(--la-space-4); background: var(--la-color-bg-secondary); border: 1px solid var(--la-color-border-subtle); border-radius: var(--la-radius-md);">
    <div style="font-family: var(--la-font-display); font-size: var(--la-font-size-hero); line-height: var(--la-line-height-hero); font-weight: 700; letter-spacing: var(--la-letter-spacing-display); text-transform: uppercase; color: var(--la-color-text-primary);">Hero — Legendary Arena</div>
    <div style="font-family: var(--la-font-mono); font-size: var(--la-font-size-small); color: var(--la-color-text-secondary); margin-top: var(--la-space-2);">Bebas Neue · 3.5rem / 56px · weight 700 · --la-font-size-hero</div>
  </div>
  <div style="padding: var(--la-space-3) var(--la-space-4); background: var(--la-color-bg-secondary); border: 1px solid var(--la-color-border-subtle); border-radius: var(--la-radius-md);">
    <div style="font-family: var(--la-font-display); font-size: var(--la-font-size-h1); line-height: var(--la-line-height-h1); font-weight: 700; letter-spacing: var(--la-letter-spacing-display); text-transform: uppercase; color: var(--la-color-text-primary);">H1 — Forge Your Deck</div>
    <div style="font-family: var(--la-font-mono); font-size: var(--la-font-size-small); color: var(--la-color-text-secondary); margin-top: var(--la-space-2);">Bebas Neue · 3rem / 48px · weight 700 · --la-font-size-h1</div>
  </div>
  <div style="padding: var(--la-space-3) var(--la-space-4); background: var(--la-color-bg-secondary); border: 1px solid var(--la-color-border-subtle); border-radius: var(--la-radius-md);">
    <div style="font-family: var(--la-font-display); font-size: var(--la-font-size-h2); line-height: var(--la-line-height-h2); font-weight: 700; letter-spacing: var(--la-letter-spacing-display); text-transform: uppercase; color: var(--la-color-text-primary);">H2 — Rally Your Allies</div>
    <div style="font-family: var(--la-font-mono); font-size: var(--la-font-size-small); color: var(--la-color-text-secondary); margin-top: var(--la-space-2);">Bebas Neue · 2.25rem / 36px · weight 700 · --la-font-size-h2</div>
  </div>
  <div style="padding: var(--la-space-3) var(--la-space-4); background: var(--la-color-bg-secondary); border: 1px solid var(--la-color-border-subtle); border-radius: var(--la-radius-md);">
    <div style="font-family: var(--la-font-body); font-size: var(--la-font-size-h3); line-height: var(--la-line-height-h3); font-weight: 600; letter-spacing: var(--la-letter-spacing-normal); color: var(--la-color-text-primary);">H3 — Unleash a legendary turn</div>
    <div style="font-family: var(--la-font-mono); font-size: var(--la-font-size-small); color: var(--la-color-text-secondary); margin-top: var(--la-space-2);">Inter · 1.75rem / 28px · weight 600 · --la-font-size-h3</div>
  </div>
  <div style="padding: var(--la-space-3) var(--la-space-4); background: var(--la-color-bg-secondary); border: 1px solid var(--la-color-border-subtle); border-radius: var(--la-radius-md);">
    <div style="font-family: var(--la-font-body); font-size: var(--la-font-size-h4); line-height: var(--la-line-height-h4); font-weight: 600; letter-spacing: var(--la-letter-spacing-normal); color: var(--la-color-text-primary);">H4 — Earn your standing</div>
    <div style="font-family: var(--la-font-mono); font-size: var(--la-font-size-small); color: var(--la-color-text-secondary); margin-top: var(--la-space-2);">Inter · 1.375rem / 22px · weight 600 · --la-font-size-h4</div>
  </div>
  <div style="padding: var(--la-space-3) var(--la-space-4); background: var(--la-color-bg-secondary); border: 1px solid var(--la-color-border-subtle); border-radius: var(--la-radius-md);">
    <div style="font-family: var(--la-font-body); font-size: var(--la-font-size-h5); line-height: var(--la-line-height-h5); font-weight: 500; letter-spacing: var(--la-letter-spacing-normal); color: var(--la-color-text-primary);">H5 — Choose your heroes wisely</div>
    <div style="font-family: var(--la-font-mono); font-size: var(--la-font-size-small); color: var(--la-color-text-secondary); margin-top: var(--la-space-2);">Inter · 1.125rem / 18px · weight 500 · --la-font-size-h5</div>
  </div>
  <div style="padding: var(--la-space-3) var(--la-space-4); background: var(--la-color-bg-secondary); border: 1px solid var(--la-color-border-subtle); border-radius: var(--la-radius-md);">
    <div style="font-family: var(--la-font-body); font-size: var(--la-font-size-h6); line-height: var(--la-line-height-h6); font-weight: 500; letter-spacing: var(--la-letter-spacing-normal); color: var(--la-color-text-primary);">H6 — Every card counts</div>
    <div style="font-family: var(--la-font-mono); font-size: var(--la-font-size-small); color: var(--la-color-text-secondary); margin-top: var(--la-space-2);">Inter · 1rem / 16px · weight 500 · --la-font-size-h6</div>
  </div>
  <div style="padding: var(--la-space-3) var(--la-space-4); background: var(--la-color-bg-secondary); border: 1px solid var(--la-color-border-subtle); border-radius: var(--la-radius-md);">
    <div style="font-family: var(--la-font-body); font-size: var(--la-font-size-body); line-height: var(--la-line-height-body); font-weight: 400; letter-spacing: var(--la-letter-spacing-normal); color: var(--la-color-text-primary);">Body — Assemble your heroes, face the scenario, and earn your standing on the leaderboard.</div>
    <div style="font-family: var(--la-font-mono); font-size: var(--la-font-size-small); color: var(--la-color-text-secondary); margin-top: var(--la-space-2);">Inter · 1rem / 16px · weight 400 · --la-font-size-body</div>
  </div>
  <div style="padding: var(--la-space-3) var(--la-space-4); background: var(--la-color-bg-secondary); border: 1px solid var(--la-color-border-subtle); border-radius: var(--la-radius-md);">
    <div style="font-family: var(--la-font-body); font-size: var(--la-font-size-small); line-height: var(--la-line-height-small); font-weight: 400; letter-spacing: var(--la-letter-spacing-normal); color: var(--la-color-text-muted);">Small — Captions, footnotes, and metadata</div>
    <div style="font-family: var(--la-font-mono); font-size: var(--la-font-size-small); color: var(--la-color-text-secondary); margin-top: var(--la-space-2);">Inter · 0.875rem / 14px · weight 400 · --la-font-size-small</div>
  </div>
  <div style="padding: var(--la-space-3) var(--la-space-4); background: var(--la-color-bg-secondary); border: 1px solid var(--la-color-border-subtle); border-radius: var(--la-radius-md);">
    <div style="font-family: var(--la-font-mono); font-size: var(--la-font-size-body); line-height: var(--la-line-height-body); font-weight: 400; letter-spacing: var(--la-letter-spacing-normal); color: var(--la-color-text-primary);">Mono — --la-color-gold: #b8901f;</div>
    <div style="font-family: var(--la-font-mono); font-size: var(--la-font-size-small); color: var(--la-color-text-secondary); margin-top: var(--la-space-2);">JetBrains Mono · 1rem / 16px · weight 400 · --la-font-mono</div>
  </div>
</div>

<details>
<summary>Full typography spec (size scale, weights, letter-spacing)</summary>

The rem-based scale uses 16px as its base. Each role has a paired
size + line-height + weight token in `static/brand-tokens.css`.

| Role | Font | Size token | Size | Line-height token | Weight token |
|---|---|---|---|---|---|
| Hero | Bebas Neue | `--la-font-size-hero` | 3.5rem / 56px | `--la-line-height-hero` (1.05) | `--la-font-weight-h1` (700) |
| H1 | Bebas Neue | `--la-font-size-h1` | 3rem / 48px | `--la-line-height-h1` (1.1) | `--la-font-weight-h1` (700) |
| H2 | Bebas Neue | `--la-font-size-h2` | 2.25rem / 36px | `--la-line-height-h2` (1.15) | `--la-font-weight-h2` (700) |
| H3 | Inter | `--la-font-size-h3` | 1.75rem / 28px | `--la-line-height-h3` (1.2) | `--la-font-weight-h3` (600) |
| H4 | Inter | `--la-font-size-h4` | 1.375rem / 22px | `--la-line-height-h4` (1.3) | `--la-font-weight-h4` (600) |
| H5 | Inter | `--la-font-size-h5` | 1.125rem / 18px | `--la-line-height-h5` (1.4) | `--la-font-weight-h5` (500) |
| H6 | Inter | `--la-font-size-h6` | 1rem / 16px | `--la-line-height-h6` (1.5) | `--la-font-weight-h6` (500) |
| Body | Inter | `--la-font-size-body` | 1rem / 16px | `--la-line-height-body` (1.6) | `--la-font-weight-body` (400) |
| Small | Inter | `--la-font-size-small` | 0.875rem / 14px | `--la-line-height-small` (1.5) | `--la-font-weight-small` (400) |
| Mono | JetBrains Mono | `--la-font-mono` | 1rem / 16px | `--la-line-height-body` (1.6) | 400 |

Hero / H1 / H2 use uppercase with the display letter-spacing token
(`--la-letter-spacing-display`, 0.04em); H3-H6 and body remain in
sentence case. Body text must not drop below 14px anywhere it's
expected to be readable.

</details>

### Reality check

Typography is not decoration. It encodes **hierarchy**, **information
priority**, and **tone**. Misuse breaks comprehension before it breaks
aesthetics.

## Spacing & Layout {#spacing-layout}

The spacing scale uses an 8-point base with 9 named steps. All
layout spacing resolves through `--la-space-*` tokens — spacing
defines rhythm, not just distance. Full spec in
[`spacing.md`](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/spacing.md).

<div class="brand-spacing-grid">
  <div class="brand-spacing-step">
    <div class="brand-spacing-bar" style="width: 4px;"></div>
    <code>--la-space-1</code> <span>4px</span>
  </div>
  <div class="brand-spacing-step">
    <div class="brand-spacing-bar" style="width: 8px;"></div>
    <code>--la-space-2</code> <span>8px</span>
  </div>
  <div class="brand-spacing-step">
    <div class="brand-spacing-bar" style="width: 12px;"></div>
    <code>--la-space-3</code> <span>12px</span>
  </div>
  <div class="brand-spacing-step">
    <div class="brand-spacing-bar" style="width: 16px;"></div>
    <code>--la-space-4</code> <span>16px</span>
  </div>
  <div class="brand-spacing-step">
    <div class="brand-spacing-bar" style="width: 24px;"></div>
    <code>--la-space-5</code> <span>24px</span>
  </div>
  <div class="brand-spacing-step">
    <div class="brand-spacing-bar" style="width: 32px;"></div>
    <code>--la-space-6</code> <span>32px</span>
  </div>
  <div class="brand-spacing-step">
    <div class="brand-spacing-bar" style="width: 48px;"></div>
    <code>--la-space-7</code> <span>48px</span>
  </div>
  <div class="brand-spacing-step">
    <div class="brand-spacing-bar" style="width: 64px;"></div>
    <code>--la-space-8</code> <span>64px</span>
  </div>
  <div class="brand-spacing-step">
    <div class="brand-spacing-bar" style="width: 96px;"></div>
    <code>--la-space-9</code> <span>96px</span>
  </div>
</div>

**Border radius** — `--la-radius-sm` (4px), `--la-radius-md` (8px),
`--la-radius-lg` (16px), `--la-radius-xl` (24px),
`--la-radius-pill` (9999px).

**Z-index layers** — `base` (0), `dropdown` (5), `sticky` (10),
`overlay` (50), `modal` (100), `toast` (200).

**Rule:** tight spacing = density / system. Wide spacing = emphasis /
separation. Never introduce arbitrary pixel values.

## Interaction Patterns {#interaction-patterns}

Interactive elements follow a consistent set of transition and
state rules defined in `brand-tokens.css`.

**Transitions** — three speeds, all ease-in-out:

- `--la-transition-fast` — 120ms (hover, focus ring, toggle)
- `--la-transition-base` — 180ms (expand/collapse, tab switch)
- `--la-transition-slow` — 280ms (page-level reveal, modal)

**Hover states** — surface elements lift to `--la-color-surface-hover`;
interactive text shifts to `--la-color-blue-bright`.

**Focus** — visible focus rings use `--la-color-blue-bright` at 2px
outline offset. Never suppress the default outline without replacing
it.

**Reduced motion** — all transitions respect `prefers-reduced-motion:
reduce`. When active, duration collapses to 0ms. See
[`spacing.md` §10](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/spacing.md).

**Rule:** interaction must feel **responsive**, **predictable**, and
**controlled**. Never decorative. Always meaningful.

## Accessibility {#accessibility}

Accessibility is built into the token system, not bolted on.

**Contrast requirements:**

- Body text on all background tokens must meet **WCAG AA** (4.5:1).
- Large text (display / H1 / H2) must meet **WCAG AA large** (3:1).
- `--la-color-cta` on white text exceeds **AAA** (~10.4:1) in both
  modes — mode-stable by design.
- `--la-color-text-secondary` on `--la-color-bg-primary` clears AA
  in both modes (light: 7.1:1, dark: 6.8:1).

**Color independence:** information must not be conveyed by color
alone. Semantic states (`success`, `warning`, `error`) pair color
with icon or text label.

**Minimum text size:** body text must not drop below 14px
(`--la-font-size-small`) anywhere it is expected to be readable.

**Motion:** all animation respects `prefers-reduced-motion`. No
auto-playing animation without user trigger.

**Focus management:** interactive elements must have a visible focus
indicator. The system default is a 2px `--la-color-blue-bright`
outline.

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

### Copy-paste patterns {#copy-paste-patterns}

**Primary CTA button:**

```css
.btn-primary {
  background-color: var(--la-color-cta);
  color: #fff;
  font-family: var(--la-font-body);
  font-weight: var(--la-font-weight-semibold);
  padding: var(--la-space-3) var(--la-space-5);
  border: none;
  border-radius: var(--la-radius-md);
  transition: background-color var(--la-transition-fast);
}
.btn-primary:hover {
  background-color: var(--la-color-cta-bright);
}
.btn-primary:focus-visible {
  outline: 2px solid var(--la-color-blue-bright);
  outline-offset: 2px;
}
```

**Section card:**

```css
.card {
  background-color: var(--la-color-surface);
  border: 1px solid var(--la-color-border-subtle);
  border-radius: var(--la-radius-md);
  padding: var(--la-space-5);
  transition: background-color var(--la-transition-fast);
}
.card:hover {
  background-color: var(--la-color-surface-hover);
}
```

**Display heading:**

```css
.hero-heading {
  font-family: var(--la-font-display);
  font-size: var(--la-font-size-hero);
  font-weight: var(--la-font-weight-h1);
  line-height: var(--la-line-height-hero);
  letter-spacing: var(--la-letter-spacing-display);
  text-transform: uppercase;
  color: var(--la-color-gold);
}
```

**Consuming tokens cross-origin (play / registry):**

```html
<link rel="stylesheet"
      href="https://www.legendary-arena.com/brand-tokens.css"
      crossorigin="anonymous" />
```

Each consumer bundles a local fallback copy of `brand-tokens.css`
that loads if the cross-origin fetch fails — see WP-007a / WP-007b.

## Usage Guidelines {#usage-guidelines}

Bright lines from
[`strategy.md` §10](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/strategy.md)
+ [`palette.md` §10](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/palette.md).

<ul class="usage-rules">
  <li class="usage-do">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg></span>
    <span><strong>DO</strong> use <code>--la-color-blue-bright</code> on interactive elements — links, focus rings, hover, active. The deeper navy base reads decorative.</span>
  </li>
  <li class="usage-do">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg></span>
    <span><strong>DO</strong> use <code>--la-color-cta</code> for primary CTA backgrounds — mode-stable, AAA on white text.</span>
  </li>
  <li class="usage-do">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg></span>
    <span><strong>DO</strong> render the logo as gold-on-dark (primary) or white-only (inversion). Two treatments only.</span>
  </li>
  <li class="usage-do">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg></span>
    <span><strong>DO</strong> pair semantic states with icons or text labels — never color alone.</span>
  </li>
  <li class="usage-do">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg></span>
    <span><strong>DO</strong> provide a visible focus indicator on every interactive element — <code>2px --la-color-blue-bright</code> outline.</span>
  </li>
  <li class="usage-dont">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></span>
    <span><strong>DON'T</strong> use class colors (<code>--la-color-class-*</code>) for branding, marketing, CTAs, or the logo. Gameplay tags, not identity.</span>
  </li>
  <li class="usage-dont">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></span>
    <span><strong>DON'T</strong> reuse brand red (<code>--la-color-red</code> / <code>-cta</code>, maroon family) as an error state. Error uses <code>--la-color-error</code> (pure-red family).</span>
  </li>
  <li class="usage-dont">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></span>
    <span><strong>DON'T</strong> introduce raw hex / font / spacing values. Every visual resolves through <code>var(--la-*)</code>.</span>
  </li>
  <li class="usage-dont">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></span>
    <span><strong>DON'T</strong> suppress the default focus outline without providing an equivalent visible alternative.</span>
  </li>
  <li class="usage-dont">
    <span class="usage-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></span>
    <span><strong>DON'T</strong> auto-play animations or transitions that ignore <code>prefers-reduced-motion</code>.</span>
  </li>
</ul>

## Assets & Downloads {#assets-downloads}

**Token stylesheet** — [`/brand-tokens.css`](/brand-tokens.css)
(the canonical source; link or download).

**Logo files** (SVG, production-ready):

- [Primary wordmark (gold on dark)](/brand/logo/logo-la-dark-400x200.svg)
- [Inversion wordmark (white-only)](/brand/logo/logo-la-light-400x200.svg)
- [Icon / favicon](/brand/logo/legendary-arena-icon.svg)

**Documentation** (source of truth, in repo):

- [`strategy.md`](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/strategy.md) — positioning, voice, tone
- [`palette.md`](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/palette.md) — full color spec + WCAG contracts
- [`typography.md`](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/typography.md) — font families, size scale
- [`spacing.md`](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/spacing.md) — spacing, radii, z-index, motion
- [`CHANGELOG.md`](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/CHANGELOG.md) — token version history

**Engineering references** (engine monorepo):

- [Architecture inventory](https://ewiki.legendary-arena.com/architecture-inventory/) — auto-generated weekly from `scripts/architecture-inventory.mjs` (WP-145)
- [Engineering wiki](https://ewiki.legendary-arena.com/) — decisions, post-mortems, schema docs

## Real-World Application {#real-world-application}

The system must produce consistent results across all surfaces.

- Same CTA color on marketing and game UI
- Same type hierarchy across pages
- Same spacing rhythm across layouts

If two surfaces feel different, the system is being violated.

## Art Direction (Mood Board) {#art-direction}

This is the art-direction brief used when commissioning the
one-page Legendary Arena mood board poster. Artists, partners, and
integrators use it to interpret the brand consistently. The
canonical source is
[`docs/brand/mood-board-spec.md`](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/mood-board-spec.md);
the body is inlined below at render time so a single edit
propagates.

<details>
<summary>Full art-direction brief (mood board spec)</summary>

{{< readfile file="/docs/brand/mood-board-spec.md" markdown="true" >}}

</details>

## Facebook Graphics {#facebook-graphics}

Visual reference for every Facebook image format Legendary Arena needs —
from page setup through content and campaigns.

<p>
  <img src="/images/brand/facebook-sizes.svg"
       alt="Facebook graphics size reference — all formats with dimensions and aspect ratios"
       width="720" />
</p>

### Page identity (required at launch)

These two assets define how the page appears everywhere on Facebook.

**Profile picture** — the logo, everywhere.

| Property | Value |
|----------|-------|
| Upload size | 800 x 800 px (minimum 320 x 320) |
| Aspect ratio | 1:1 — displays as a circle |
| Format | PNG (transparency-safe for the logo) |
| Safe rule | Center the logo — corners crop into a circle on every surface |

Use the existing icon from `/brand/logo/legendary-arena-icon.svg`,
exported as PNG at 800 x 800. The gold-on-dark variant reads best
against Facebook's white and dark-mode chrome.

**Cover photo** — the brand billboard.

| Property | Value |
|----------|-------|
| Upload size | 851 x 315 px |
| Aspect ratio | ~2.7:1 |
| Desktop display | ~820 x 312 |
| Mobile display | ~640 x 360 (crops left and right edges) |
| Safe zone | Center 640 x 312 px — keep all critical content here |
| Format | JPG for photo-heavy; PNG if text-heavy |

For Legendary Arena: logo wordmark + tagline in the safe zone, hero
card art filling the background, optional CTA text ("Play Online" or
"Join the Arena"). Keep the edges expendable — mobile crops ~100 px
from each side.

### Open Graph image (critical for sharing)

This is what appears when anyone shares a legendary-arena.com link
on Facebook (or any platform that reads Open Graph tags). Set it
site-wide via `<meta property="og:image">`.

| Property | Value |
|----------|-------|
| Size | 1200 x 630 px |
| Aspect ratio | 1.91:1 |
| Format | JPG or PNG |

The OG image should be a standalone brand card — recognizable without
context. Logo, tagline, and one piece of hero art. No small text —
it renders as a thumbnail in most feeds.

### Feed content templates

Three standard formats cover every feed post type. Design templates
for each so posts stay on-brand without per-post design work.

| Format | Size | Ratio | Use case |
|--------|------|-------|----------|
| Square | 1080 x 1080 px | 1:1 | Card previews, hero spotlights, set reveals |
| Portrait | 1080 x 1350 px | 4:5 | Dev updates, announcements, patch notes — takes more screen space in feed |
| Landscape | 1200 x 630 px | 1.91:1 | Blog links, feature launches, site shares (OG-compatible) |

**File guidance:** JPG or PNG, keep under 1 MB. Facebook recompresses
everything — oversized files gain nothing and load slower on upload.
PNG is better for UI screenshots and text-heavy graphics; JPG for
card art and photos.

**Portrait gets the most feed real estate.** At 4:5 it fills more of
the mobile viewport than square or landscape — use it for
announcements and content where visibility matters most.

### Stories and Reels

| Property | Value |
|----------|-------|
| Size | 1080 x 1920 px |
| Aspect ratio | 9:16 (full-screen vertical) |
| Format | JPG / PNG (image), MP4 (video) |

Leave ~250 px margin at top and bottom for Facebook's UI overlays
(profile icon, reply bar, progress indicator). The content-safe area
is roughly 1080 x 1420 centered vertically.

For Legendary Arena: card-of-the-day reveals, 15-second gameplay
clips, set announcement teasers. Vertical format rewards bold
visuals and minimal text.

### Event and group covers

| Asset | Size | Ratio |
|-------|------|-------|
| Event cover | 1920 x 1005 px | ~1.91:1 |
| Group cover | 1640 x 856 px | ~1.91:1 |

Both share the 1.91:1 family — a single wide template scales to
either. Use for game launches, online tournaments, feature releases,
and community group headers.

### Advertising formats

If running paid campaigns later, these are the three ad canvas sizes:

| Format | Size | Ratio | Placement |
|--------|------|-------|-----------|
| Feed ad | 1200 x 628 px | 1.91:1 | News feed, right column |
| Square ad | 1080 x 1080 px | 1:1 | Feed, Marketplace, search |
| Story ad | 1080 x 1920 px | 9:16 | Stories, Reels interstitial |

These overlap with the content templates above — square and story ads
reuse the same canvases. The feed ad is 2 px shorter than the
standard 1200 x 630 link preview; in practice the same template
works for both.

### Launch checklist

The minimum asset set to launch a complete Facebook page:

1. **Profile image** — icon at 800 x 800 PNG
2. **Cover photo** — brand billboard at 851 x 315
3. **Open Graph image** — 1200 x 630 (set in site `<head>`)
4. **3-5 starter posts** — one square (card spotlight), one portrait
   (announcement), one landscape (site link)

Everything else (stories, event covers, ads) can follow once the
page is live and the content cadence is established.

### File type decision guide

| Content type | Recommended | Why |
|--------------|-------------|-----|
| Logo / icon / text-heavy | PNG | Preserves sharp edges, supports transparency |
| Card art / photos / hero images | JPG | Smaller file size, no visible quality loss at 1080+ px |
| Vertical video (stories, reels) | MP4 | Native format; H.264 codec, under 4 GB |

Facebook recompresses all uploads. Exporting at high quality (JPG
90-95%, PNG-24) gives the recompressor the best source material
without inflating file size past the ~1 MB practical ceiling.

## YouTube Graphics {#youtube-graphics}

Visual reference for every YouTube image format Legendary Arena needs —
from channel setup through video content and community engagement.

<p>
  <img src="/images/brand/youtube-sizes.svg"
       alt="YouTube graphics size reference — all formats with dimensions and aspect ratios"
       width="720" />
</p>

### Channel identity (required at launch)

These two assets define how the channel appears across YouTube.

**Profile picture** — the logo, everywhere.

| Property | Value |
|----------|-------|
| Upload size | 800 x 800 px |
| Aspect ratio | 1:1 — displays as a circle (~98 x 98 in UI) |
| Format | PNG (transparency-safe for the logo) |
| Max file size | ~4 MB |
| Safe rule | Center the logo — edges crop into a circle on every surface |

Use the existing icon from `/brand/logo/legendary-arena-icon.svg`,
exported as PNG at 800 x 800. Identical asset as Facebook — one
export covers both platforms.

**Channel banner** — the most crop-hostile asset on YouTube.

| Property | Value |
|----------|-------|
| Upload size | 2560 x 1440 px |
| Aspect ratio | 16:9 |
| Safe area | 1546 x 423 px (center strip only) |
| Max file size | ~6 MB |
| Formats | JPG, PNG, GIF, BMP |

**Device-specific crop behavior (this matters a lot):**

| Device | What displays | Effective size |
|--------|---------------|----------------|
| TV | Full 2560 x 1440 canvas | 2560 x 1440 |
| Desktop | Center horizontal strip | ~2560 x 423 |
| Tablet | Narrower center strip | ~1855 x 423 |
| Mobile | Safe zone only | 1546 x 423 |

Everything outside the safe zone gets cropped on every device except
TV. For Legendary Arena: logo wordmark + tagline inside the safe
zone, hero card art filling the background. The edges are expendable
— design them to look good but carry no critical information.

### Video thumbnail (highest-ROI asset)

The thumbnail is the single most important image on YouTube. It
determines whether someone clicks — more than the title, more than
the description. Every video needs a custom thumbnail.

| Property | Value |
|----------|-------|
| Size | 1280 x 720 px |
| Aspect ratio | 16:9 |
| Min width | 640 px |
| Max file size | ~2 MB |
| Formats | JPG, PNG, GIF |

**Overlay constraint:** the bottom-right corner is covered by the
video timestamp badge (~10-15% of the frame). Keep logos, text, and
CTAs out of that zone.

**Design rules for Legendary Arena thumbnails:**

- Bold, high-contrast visuals — thumbnails render at ~320 x 180 in
  most feeds
- One focal point per thumbnail (a hero card, a mastermind, a score)
- Minimal text — if text is needed, large enough to read at thumbnail
  scale
- Keep key content in the center ~80% of the frame
- Consistent template so viewers recognize the channel at a glance

### Branding watermark (subscribe overlay)

The watermark appears as a clickable subscribe button in the
bottom-right corner of every video. Set it once in YouTube Studio
under Customization > Branding.

| Property | Value |
|----------|-------|
| Size | 150 x 150 px |
| Format | PNG (transparent background recommended) |
| Max file size | ~1 MB |
| Placement | Bottom-right corner (YouTube-controlled) |

**Display timing options:**

- Entire video (recommended for new channels)
- Custom start time
- End of video only

Use the LA icon on a transparent background. Keep it simple — it
renders at roughly 40 x 40 px in the player, so fine detail is
invisible.

### Shorts (vertical video)

| Property | Value |
|----------|-------|
| Size | 1080 x 1920 px |
| Aspect ratio | 9:16 (full-screen vertical) |
| Format | MP4 (video), JPG/PNG (cover image) |

Leave ~200 px margin at top and bottom for YouTube's UI overlays
(channel name, like/comment buttons, description). The content-safe
area is roughly 1080 x 1520 centered vertically.

For Legendary Arena: card-of-the-day reveals, 15-second gameplay
clips, set announcement teasers, quick strategy tips. Vertical
format rewards bold visuals and minimal text — same as Facebook/
Instagram Stories.

### Community posts

| Property | Value |
|----------|-------|
| Size | 1080 x 1080 px (square recommended) |
| Aspect ratio | 1:1 |
| Formats | JPG, PNG |

YouTube also supports landscape images in community posts, but
square gives the most consistent display across devices. Use for
polls, announcements, card spotlights, and engagement content.

### End screen canvas

| Property | Value |
|----------|-------|
| Base size | 1280 x 720 px (matches video resolution) |
| Duration | Last 5-20 seconds of the video |
| Format | Designed into the video itself |

**Critical constraint:** end screen elements (subscribe button,
video suggestions, playlist links) are interactive overlays placed
by YouTube. The video's final frames need to leave space for these
clickable zones — typically two rectangular regions in the lower
two-thirds of the frame.

Design the last segment of each video with a clean background or
branded end card that accommodates the overlay elements without
visual collision.

### Launch checklist

The minimum asset set to launch a complete YouTube channel:

1. **Profile picture** — icon at 800 x 800 PNG
2. **Channel banner** — brand billboard at 2560 x 1440 (safe zone
   tested on mobile)
3. **Branding watermark** — icon at 150 x 150 transparent PNG
4. **Thumbnail template** — reusable 1280 x 720 template with
   consistent brand treatment
5. **End screen template** — branded end card with space for
   YouTube's clickable elements

Everything else (Shorts covers, community post templates) can follow
once the channel is live and the content cadence is established.

### File type decision guide

| Content type | Recommended | Why |
|--------------|-------------|-----|
| Logo / icon / watermark | PNG | Preserves sharp edges, supports transparency |
| Thumbnail (card art / gameplay) | JPG | Smaller file size, no visible quality loss at 1280 px |
| Thumbnail (text-heavy / UI) | PNG | Crisper text rendering |
| Shorts / video | MP4 | H.264 codec, AAC audio |

YouTube recompresses all uploads. Export thumbnails at high quality
(JPG 90-95%, PNG-24) to give the recompressor the best source
material. The banner's 6 MB ceiling is generous — a well-compressed
2560 x 1440 JPG typically lands around 1-2 MB.

### Key risks (worth enforcing in tooling)

| Risk | Failure mode | Prevention |
|------|-------------|------------|
| Banner crop | Text/logo outside safe zone gets cut on mobile | Template with 1546 x 423 safe zone overlay |
| Thumbnail timestamp collision | Video duration badge hides CTA/logo | Keep bottom-right 15% clear |
| Profile icon illegibility | Too much detail at ~98 px display | Use icon only, no wordmark |
| Watermark invisibility | Too complex at ~40 px render size | Simple icon, high contrast |
| File size rejection | Thumbnails > 2 MB or banners > 6 MB | Validate in export pipeline |

## Governance {#governance}

**Token changes are API changes.** Breaking changes to
`/brand-tokens.css` require a major version bump (`v1 → v2`) and
coordinated consumer updates across all three surfaces before the
new version publishes.

**Proposing a change:** open an issue or PR against the
[`docs/brand/`](https://github.com/legendary-arena/legendary-arena-website/tree/main/docs/brand)
directory. Include the token name, proposed value, rationale, and
which surfaces are affected. Non-breaking additions (new tokens)
can land in a minor bump; renames or value changes to existing
tokens are breaking.

**Version history:** see
[`CHANGELOG.md`](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/CHANGELOG.md).

---

## Final Principle

Legendary Arena is not styled — it is **resolved**.

Every visual decision comes from the system.
Every surface reflects the same identity.
Every interaction reinforces mastery.

The brand is the system.
