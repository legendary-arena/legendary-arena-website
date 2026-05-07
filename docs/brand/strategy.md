# Legendary Arena — Brand Strategy (v1 Draft)

**Status:** v1 draft — Phase A of WP-002 input; pending formal review
**Owner:** Jeffery Jensen
**Last updated:** 2026-05-07

> **Authority:** This document captures Phase A of WP-002 (LA brand
> definition). It is subordinate to `01-VISION.md`. When WP-002 formally
> executes, this document is reviewed, refined as needed, and locked.
> Until then, it is **draft input**, not committed brand identity.

---

## Status

This file represents the **strategic foundation** of the Legendary
Arena brand: positioning, audience, voice, tone, and product
terminology. It does **not** include:

- Final palette (locked tokens) → `palette.md`, Phase B
- Final typography choices (specific fonts, full type scale) →
  `typography.md`, Phase B
- Spacing scale (locked tokens) → `spacing.md`, Phase B
- Logo design — explicitly deferred per vision.md (wordmark
  placeholder for v1)

Phase B converts the directions in this document into hard-locked
token values consumed by Hugo and CSS.

---

## 1. Brand positioning

Legendary Arena is the digital, skill-first evolution of the
Legendary deck-building system. Players assemble decks, face
escalating threats, and earn standing through demonstrated mastery —
not through grind, payment, or chance.

### Where this sits relative to the source system

The original Legendary system positions players in cooperative
hero-assembly against an escalating villain threat. Legendary Arena
keeps that fantasy and shifts emphasis:

| | Source system | Legendary Arena |
|---|---|---|
| Primary mode | Co-op (with light competitive scoring) | Skill-first, ranked play |
| Setup | Physical, time-consuming | Online, instant |
| Variability | Card pool + house rules | Deterministic ruleset |
| Progression | Buy expansions | Demonstrate mastery |

The fantasy is identical. The product shape is different.

### Audience (per vision.md)

- **Primary:** Players of the original Legendary game seeking a
  digital adaptation; deck-building enthusiasts new to LA
- **Secondary:** Press, partners, IP holders evaluating the project
- **Tertiary:** Future contributors

---

## 2. Tone and voice

### The voice

- **Direct.** Short sentences, active verbs
- **Confident.** Tells the player what to do, doesn't apologize
- **Heroic.** Frames stakes and payoff
- **No irony.** No winks, no self-deprecation, no "we know it's silly"
- **No hype.** Exclamation marks reserved for genuinely earned moments

### Verb palette

Use these throughout copy:

`assemble · build · recruit · fight · master · defeat · earn · become`

Avoid filler verbs (`get`, `try`, `enjoy`) and softeners
(`perhaps`, `maybe`, `sort of`).

### Tone — do / don't

| ✅ Do | ❌ Don't |
|---|---|
| Speak directly to the player | Speak about the player in third person |
| Lead with the fantasy ("The arena awaits") | Lead with mechanics ("Build a deck of...") |
| Use one strong verb per sentence | Stack adjectives ("the awesome amazing epic...") |
| Convey weight and consequence | Be flippant or self-aware |
| Trust the reader | Over-explain |

### Copy patterns

Illustrative voice exemplars, not locked copy.

**Hero / above-the-fold:**

> The arena awaits.
> Assemble your deck. Master your strategy.
> Earn your place.

**Secondary / system explanation:**

> Choose your heroes. Read the scenario.
> Outplay the threat.
> Every session pushes back.

**CTA pattern:**

Single verb plus destination. "Play now." "Browse cards." "Read the
rules." Avoid: "Click here to start playing the game."

---

## 3. Product terminology

These are the canonical terms used across all surfaces (www, play,
cards, blog, in-game). Pick one term per concept and use it
consistently.

| Concept | Canonical term |
|---|---|
| Player identity in-game | Hero |
| The system's challenge for a session | Scenario |
| The opposing force in a session | Mastermind |
| Persistent threat group | Villain group |
| Recurring lower-tier opposition | Henchmen |
| Random complicating event | Scheme twist |
| Single play of the game | Session (preferred) / Match |
| Player progress and standing | Mastery |
| In-session win | Victory |

These terms originate in the Legendary deck-building system. They are
gameplay-mechanic vocabulary — functional terminology, not third-party
marketing copy.

---

## 4. Visual direction (Phase B inputs)

These are **directions**, not locked decisions. Phase B turns each
into a specific token value.

### Color

A dark, cinematic base with bright, saturated accents.

| Role | Direction | Phase B output |
|---|---|---|
| Background | Near-black or deep navy | Specific hex + light/dark variants |
| Primary brand accent | Gold (achievement, headlines) | Specific hex |
| System / UI accent | Electric blue (links, highlights) | Specific hex |
| Action / CTA | Hero red | Specific hex |
| Semantic success | Green | Specific hex |
| Semantic warning | Amber | Specific hex |
| Semantic error | Red (distinct from CTA red) | Specific hex |

Optional in-game element mapping (confirm in Phase B):

- Attack-related: red family
- Recruit-related: blue family
- Victory / mastery: gold family

### Typography

| Role | Direction | Phase B output |
|---|---|---|
| Display (hero, H1, H2) | Bold, condensed, slightly all-caps feel | Specific Google Font + fallbacks |
| Body | Readable modern sans-serif | Specific Google Font + fallbacks |
| Mono (code, registry, stats) | Modern monospace | Specific Google Font + fallbacks |

Display font candidates: Bebas Neue · Anton · Oswald · Barlow Condensed
Body font candidates: Inter · Roboto · IBM Plex Sans · system-ui
Mono font candidates: JetBrains Mono · IBM Plex Mono · Fira Code

### Spacing direction

8-pixel base unit. Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.
Specific usage rules locked in `spacing.md` (Phase B).

---

## 5. Layout patterns (informational)

Content-architecture observations, not prescriptions. WP-003 (theme
overrides) and WP-004 (content) make the actual layout decisions.

### Pattern A — Hero-first landing

Full-width hero with single tagline + single primary CTA. The page
should answer "what is this" in one screen.

### Pattern B — Three-block system explanation

Three short blocks with a verb each. Example shape:
"Build your deck. Face the threat. Become legendary."

### Pattern C — Three-site ecosystem links

Explicit, equal-weight cross-links between www, play, and the
registry (`cards.barefootbetters.com` for v1). The user should always
know there are three sites and where each one lives.

---

## 6. Logo treatment for v1

Per vision.md, logo design is deferred. v1 uses a **wordmark
placeholder**: the text "Legendary Arena" set in the chosen display
typeface (Phase B). No icon, no graphic logo.

Real logo design is a separate future effort, possibly involving a
contractor. The wordmark is intentionally simple to avoid premature
visual commitments.

---

## 7. Differentiation messaging

The brand's differentiation appears in copy where natural — particularly
on the home page and the About page. These are **supporting points**,
not the lead claim. The lead is the fantasy; differentiation reinforces.

Themes to weave in:

- **Skill-first.** Standing is earned, not bought.
- **No grind.** Sessions are bounded; no time-gated progression.
- **No pay-to-win.** Outcomes depend on play, not purchases.
- **Modern.** Online, deterministic, multiplayer.

Use these where they advance the message; don't force them into copy
that's about something else.

---

## 8. Out of scope for this strategy

This document deliberately does not address:

- Specific marketing campaigns or promotional language
- Social media or channel strategy
- Press kit content beyond positioning (that's ER-010, may become a WP)
- In-game UI design system (lives in `arena-client`, separate concern)
- Detailed blog content strategy (lives in `04-CONTENT-CONVENTIONS.md`
  per WP-004)

---

## 9. Source material acknowledgment

This brand strategy is informed by analysis of the Legendary
deck-building system and its associated marketing presence. **No
direct copy from third-party marketing is reproduced in this document
or in any brand artifact derived from it.**

Observed patterns that informed the directions above:

- The source system's framing of hero-assembly + escalating threat
- Visual conventions of dark backgrounds + bright character accents
- Modular / expandable product structure (sets, expansions)
- Direct, declarative tone in promotional language across the system

The terminology table in §3 uses the gameplay vocabulary from the
source system, treated as functional mechanic naming.

### Legal / IP consideration (for the team's awareness)

Legendary Arena is a fan-project digital adaptation. Brand decisions
in this document attempt to:

- Avoid reproducing protected marketing copy
- Avoid protected character names or imagery
- Use mechanic vocabulary (Hero, Mastermind, Scheme) as functional
  terminology only

A separate review with the project's legal counsel is the appropriate
next step before public launch. This brand strategy does not replace
that review; it captures what the brand *intends* to do, not whether
what it does is cleared.

---

## 10. Next steps (Phase B of WP-002)

Phase B converts the directions in this document into locked tokens:

- [ ] `palette.md` — specific hex values for every role above, light
      and dark variants
- [ ] `typography.md` — picked fonts (display / body / mono), full
      type scale (H1, H2, H3, H4, H5, H6, body, small) with sizes,
      line heights, weights, and named CSS custom properties
      (`--la-font-size-h1`, etc.)
- [ ] `spacing.md` — locked scale with usage rules
- [ ] `CHANGELOG.md` — initialized with v1 entry
- [ ] `static/brand-tokens.css` — produced from the above with version
      header (per WP-002 token versioning contract)

When Phase B completes, this document is reviewed against the locked
tokens for any drift, refined as needed, and the status changes from
"v1 draft" to "v1 locked."
