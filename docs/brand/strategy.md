# Legendary Arena — Brand Strategy (v1 LOCKED for WWW)

**Status:** v1 LOCKED for WWW — Phase A of WP-002, locked 2026-05-07 [^cross-site]
**Owner:** Jeffery Jensen
**Last updated:** 2026-05-07

> **Authority:** This document captures Phase A of WP-002 (LA brand
> definition). It is subordinate to `01-VISION.md`. WP-002 + WP-003
> jointly verified the brand against rendered pages on 2026-05-07;
> all Phase A directions reflected in committed brand identity.

[^cross-site]: "Locked for WWW" means verified at
`www.legendary-arena.com` (Hugo build, both modes, Lighthouse ≥ 90,
WCAG AA, mobile viewport). Cross-site consumption by
`play.legendary-arena.com` and `cards.barefootbetters.com` is verified
separately under WP-007a / WP-007b and is explicitly carved out of
this lock. A breaking change to tokens still requires the major
version bump + coordinated consumer updates per `01-VISION.md` Global
invariants.

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

## Global brand invariants

Non-negotiable rules governing all brand expression across all
surfaces. Violations of these rules block WP completion (W003/W004)
regardless of other DoD compliance.

- The brand always leads with **player agency and mastery**, not
  mechanics.
- The brand never describes itself as a "fan project" in user-facing
  copy. (Internal documentation may; the brand surface may not.)
- The brand never depends on **external IP naming** or **external
  artwork** for clarity or comprehension.
- All messaging must work as **original content** — no reliance on
  Marvel familiarity for a reader to understand what Legendary Arena
  is or why it matters.
- All visual expression must be reproducible using **brand tokens
  only** — no ad-hoc color values, font choices, or spacing outside
  `static/brand-tokens.css`.
- **Cross-site consistency** (www, play, registry) is enforced via
  shared tokens. No site may redefine brand values independently.

---

## 1. Brand positioning

**Legendary Arena (LA)** is a skill-first, web-based deck-building
system where players assemble decks, face deterministic scenarios,
and earn standing through demonstrated mastery.

It preserves the fantasy of heroic deck-building while removing:

- setup friction
- randomness-driven outcomes
- progression tied to time or spending

### What "deterministic" means here

"Deterministic" refers to:

- Consistent rules — given identical inputs, the engine produces
  identical state transitions
- No hidden or probabilistic progression systems (no loot boxes, no
  random rewards, no time-gated unlocks)
- Outcomes driven by player decisions within a knowable system

It does **not** imply removal of all randomness. Shuffle order, draw
luck, and similar in-session randomness are preserved — that's
core to deck-building. The determinism is at the **system level**:
the rules don't change, the standings don't drift, the system
doesn't grade on a curve.

### Where LA sits relative to the source system

The original Legendary system positions players in cooperative
hero-assembly against an escalating villain threat. LA keeps that
fantasy and shifts emphasis:

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

### Tone invariants (enforceable rules)

These are bright lines, not preferences. Brand-facing copy that
violates any of them is broken and must be rewritten.

- **No emoji** in brand-facing copy (headlines, body, CTAs, marketing)
- **No humor that undermines stakes** ("yeah this is silly but...",
  "we tried our best", etc.)
- **No conversational filler** ("hey", "let's", "so", "well")
- **No questions as primary headlines** ("Want to play?" — never)

### Verb palette

Use these throughout copy:

`assemble · build · recruit · fight · master · defeat · earn · become`

Avoid filler verbs (`get`, `try`, `enjoy`) and softeners
(`perhaps`, `maybe`, `sort of`).

### Tone — do / don't

| Do | Don't |
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

### CTA contract

All primary CTAs **must**:

- Be ≤ 2 words
- Use a single verb
- Map directly to an action the user takes by clicking

**Allowed examples:**

- "Play now"
- "Browse cards"
- "Read rules"
- "View registry"

**Disallowed patterns:**

- "Click here" (no agency)
- "Start playing now" (3 words, redundant)
- "Click here to start playing the game" (multi-clause, verbose)
- "Get started" only acceptable if no clearer verb exists

Secondary CTAs (in body copy, not primary buttons) may run longer if
clarity demands, but should still avoid the disallowed patterns.

---

## 3. Product terminology

Canonical terms used across all surfaces (www, play, cards, blog,
in-game). Pick one term per concept and use it consistently.

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

These terms originate in the Legendary deck-building system. They
are gameplay-mechanic vocabulary — functional terminology, not
third-party marketing copy.

### Terminology rules

- Each concept maps to exactly **one canonical term**
- Synonyms must not be introduced without an entry in
  `01-VISION.md` Decisions log
- UI labels, URLs, and copy must use the canonical term
  consistently
- Deviations require explicit justification (e.g., character-count
  constraint in a UI label, UX clarity for a specific surface) AND
  a Decisions log entry

### Cross-site consistency

The terminology above must remain consistent across all three
properties:

- `www.legendary-arena.com` — marketing
- `play.legendary-arena.com` — game client
- `cards.legendary-arena.com` — registry (migrated from
  `cards.barefootbetters.com` 2026-07-16)

**No site may redefine terms independently.** If a term proves
inadequate on one surface, the canonical term in this document
changes (with a Decisions log entry); all three surfaces then
update together.

---

## 4. Visual direction (Phase B inputs)

These are **directions**, not locked decisions. Phase B turns each
into a specific token value.

### Tokenization requirement

All directions in this section MUST resolve to:

- **Explicit CSS custom properties**, defined in
  `static/brand-tokens.css`
- **Named with the `--la-*` prefix** for cross-site collision
  avoidance

No visual values may exist outside token definitions. If a value
appears that isn't a token, the brand contract is violated.

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

**Constraint — red distinguishability:** CTA red and error red MUST
be visually distinguishable by hue, saturation, or brightness. Two
different "alert" reds in the same UI is broken. If they're hard to
tell apart at a glance in either light or dark mode, the contract
is violated.

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

## 5. Layout patterns (non-binding guidance)

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
registry. The user should always know there are three sites and
where each one lives.

> **Note on registry URL:** the registry migrated to its canonical
> domain `cards.legendary-arena.com` on 2026-07-16 (it landed there
> rather than the originally projected `registry.legendary-arena.com`).
> Cross-site references were updated together per the §3 cross-site
> consistency rule (WP-034 nav, WP-035 docs). The old
> `cards.barefootbetters.com` still answers; redirect posture pending.

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

The brand differentiates Legendary Arena from **both**:

- The original Legendary system (cooperative-with-light-competition,
  physical, expansion-driven)
- Modern live-service game models (grind, time-gating, monetized
  progression, paid advantage)

These differentiations appear in copy where natural — particularly
on the home page and the About page. They are **supporting points**,
not the lead claim. The lead is the fantasy; differentiation reinforces.

Themes to weave in:

- **Skill-first** — outcomes reflect player decisions
- **No grind** — no time-based progression systems
- **No pay-to-win** — no gameplay advantage from spending
- **Deterministic system** — consistent, learnable rules

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

LA is a fan-project digital adaptation **as an internal
characterization** — vital context for legal review and project
planning. Per Global brand invariants, this characterization does
**not** appear in user-facing copy. Brand decisions in this document
attempt to:

- Avoid reproducing protected marketing copy
- Avoid protected character names or imagery
- Use mechanic vocabulary (Hero, Mastermind, Scheme) as functional
  terminology only

A separate review with the project's legal counsel is the
appropriate next step before public launch. This brand strategy
does not replace that review; it captures what the brand *intends*
to do, not whether what it does is cleared.

---

## 10. Brand failure modes

The brand is considered **degraded** if any of the following
conditions appear in shipped output. Treat each as a failure
condition that fails W003 / W004 DoD.

- **Generic adjectives** — copy reaches for "fun", "exciting",
  "awesome", "epic" as the lead descriptor
- **Mechanics-first explanation** — copy explains how the game
  works before establishing fantasy and stakes
- **Terminology drift** — different surfaces use different terms for
  the same concept (e.g., "Mastermind" on www vs "Boss" on play)
- **Visual style divergence** — colors, fonts, or spacing values
  appear that aren't defined in `brand-tokens.css`
- **CTA inconsistency** — CTAs that violate the §2 CTA contract
  (verbose, multi-clause, "click here" style)
- **Tone violations** — emoji in brand copy, humor that undermines
  stakes, conversational filler, questions-as-headlines
- **External IP dependency** — copy that requires Marvel familiarity
  to make sense
- **Self-deprecation** — copy that calls the project "fan-made",
  "amateur", "side project" in user-facing surfaces

Brand failure modes are bright lines, not soft preferences. A WP
DoD that meets every other criterion but produces a brand failure
mode is **not done**.

---

## 11. Next steps (Phase B of WP-002)

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

### Phase B exit criteria

Phase B is complete only if **all** of the following hold:

- [ ] Tokens are defined for every role specified in §4
- [ ] Tokens are applied to a rendered Hugo page (verifiable in
      `hugo server` preview)
- [ ] Cross-site consumption is verified — `play.*` and the registry
      successfully fetch and apply `brand-tokens.css` from www
- [ ] No visual values exist outside token definitions (no hardcoded
      hex, no inline font sizes, no magic spacing values)
- [ ] Lighthouse scores still ≥ 90 in Performance, Accessibility,
      Best Practices, SEO on at least the home page

When all five exit criteria are met, this document is reviewed
against the locked tokens for any drift, refined as needed, and the
status changes from "v1 draft" to "v1 locked."
