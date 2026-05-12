---
title: "Brand"
url: "/brand/"
description: "Legendary Arena brand system — colors, typography, tokens, art direction, and usage."
summary: "Legendary Arena brand system — colors, typography, tokens, art direction, and usage."
---

<div class="brand-meta">
  <span>Token version: <strong>v1</strong></span>
  <span>Last updated: <strong>2026-05-07</strong></span>
  <span>Surfaces: <code>www</code> · <code>play</code> · <code>cards</code></span>
</div>

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

**Three properties** carry the brand across the product:

- **`www.legendary-arena.com`** — marketing, brand page, blog
- **`play.legendary-arena.com`** — live game client
- **`cards.barefootbetters.com`** — card registry and browsing

All three consume the same token system
([`/brand-tokens.css`](/brand-tokens.css)) so the visual language
is consistent across every surface a player touches.

## Logo + Identity {#logo-identity}

### Primary — gold on dark

<p style="background: #0b0f19; padding: var(--la-space-4); border-radius: var(--la-radius-md); display: inline-block;">
  <img src="/brand/logo/logo-la-dark-400x200.svg"
       alt="Legendary Arena wordmark (gold on dark — primary)"
       class="brand-logo"
       width="400" height="200" />
</p>

### Inversion — white-only

<p style="background: var(--la-color-bg-tertiary); padding: var(--la-space-4); border-radius: var(--la-radius-md); display: inline-block;">
  <img src="/brand/logo/logo-la-light-400x200.svg"
       alt="Legendary Arena wordmark (white-only — inversion)"
       class="brand-logo"
       width="400" height="200" />
</p>

Use only when a light surface forces inversion.

### Icon / favicon

<p>
  <img src="/brand/logo/legendary-arena-icon.svg"
       alt="Legendary Arena icon (favicon)"
       width="64" height="64" />
</p>

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

## Card Graphics {#card-graphics}

The game's visual vocabulary includes three icon families used on
cards, filters, and the deck-builder UI. All icons are SVG,
designed to read clearly at 24px and scale to 64px+.

### Card typography

Two fonts appear on cards and card-adjacent UI. These are
**game-specific** — separate from the web token system's three
locked families (Bebas Neue / Inter / JetBrains Mono).

**Bangers** — card-set icon labels. All 40 card-set SVGs reference
this font for the expansion abbreviation text (CORE, DKCY, FF04,
etc.). Available as a [Google Font](https://fonts.google.com/specimen/Bangers).

**Eurostile Condensed** — card face typography. The closest match
to the physical card's title and body text. Eurostile is a
commercial typeface (URW / Linotype); the condensed weight carries
the card UI's clean, technical feel.

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

## Color System {#color-system}

Visual summary first; the full per-mode spec (with class colors)
lives in the collapsible below.

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

### Inter — body

{{< brand-font-sample family="body" sample="Inter" >}}

Highly readable at all sizes, neutral tone. The default for everything
readable — paragraphs, navigation, UI. Fallbacks: system-ui,
-apple-system, Segoe UI.

### JetBrains Mono — mono

{{< brand-font-sample family="mono" sample="JetBrains Mono" >}}

Code blocks, card stats, token references, technical content.
Fallbacks: IBM Plex Mono, Consolas.

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

## Spacing & Layout {#spacing-layout}

The spacing scale uses an 8-point base with 9 named steps. All
layout spacing resolves through `--la-space-*` tokens. Full spec
in [`spacing.md`](https://github.com/legendary-arena/legendary-arena-website/blob/main/docs/brand/spacing.md).

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
