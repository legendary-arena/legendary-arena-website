# Task 01 — Homepage CTA Variants

**Objective:** Generate 25 homepage hero headline + subheadline + CTA variants that improve first-5-second comprehension and make "Play now" visually + messaging dominant, without changing core positioning.

**Owner:** Jeff Jensen  
**Phase:** P0 (foundational conversion surface)  
**Est. effort:** ~1 hour  
**Dependencies:** None (parallel with Task 02)

---

## Inputs you need

1. **`01-VISION.md`** — Read the "Success criteria" section (lines 141–165). Key constraint: "A first-time visitor can answer 'what is this?' within ~5 seconds of landing."
2. **Current homepage hero** — The live https://www.legendary-arena.com/ shows the current hero. Read the current title, subheadline, and CTA. Assume it's something like "The arena awaits." / value cards / "Play now" button.
3. **`docs/brand/strategy.md`** — Reference the tone invariants and voice guidelines (should already be locked in the repo). The tone is **declarative, confident, not hyped**.
4. **`docs/brand/palette.md`** — So you know the CTA button color is `--la-color-cta` (maroon).

---

## Task description

The home page must answer three questions in order, above the fold:
1. **What is this?** (headline)
2. **Why should I care?** (value signal)
3. **What do I do next?** (CTA)

Currently this works, but can be sharper. Generate 25 variants across **three exploration axes:**

### Axis 1: The "What is this?" hook (8 variants)
Different angles on answering what Legendary Arena is in one line:
- **Skill angle:** "Skill decides every turn"
- **Experience angle:** "Master the digital arena"
- **Accessibility angle:** "Deck-building, skill-first, instant play"
- **Comparison angle:** "The Legendary game, reborn for digital"
- **Emotion angle:** "Every card is a choice. Every choice matters."
- **Speed angle:** "Strategic card battles. Play now, anywhere."
- **Social angle:** "Legendary card battles with real competition"
- **Legacy angle:** "The original card game, fully digital, fully yours"

For each, briefly note **why this angle works** and **what visitor mindset it targets** (original Legendary fan, card-game enthusiast, skeptical casual, etc.).

### Axis 2: The value signal (8 variants)
Below the headline, the subheadline clarifies *why*. Generate 8 variants:
- **Skill emphasis:** "Matches are won by your decisions, not randomness."
- **Accessibility emphasis:** "No tutorial wall. No battle pass. No paywalls."
- **Community emphasis:** "Build your deck. Challenge real players. Climb the ranks."
- **Depth emphasis:** "60 unique cards. Infinite strategic combinations."
- **Speed emphasis:** "A full match in 15 minutes. Play anytime."
- **Craft emphasis:** "Master deck-building. Outthink every opponent."
- **Legitimacy emphasis:** "Made by the original Legendary designers."
- **Freedom emphasis:** "Your deck, your strategy, your rules."

For each, note **what objection it removes** and **what emotional response it aims for**.

### Axis 3: The CTA framing (9 variants)
The button text + surrounding context. Generate 9 CTA variants:
- **"Play now"** — Direct, action-oriented. (current baseline)
- **"Start playing"** — Slightly softer, inviting.
- **"Open the arena"** — Brand-forward, leans into positioning.
- **"Challenge the deck"** — Specific, stakes-focused.
- **"Build & battle"** — Shows both halves of the game loop.
- **"Play free now"** — Addresses payment objection.
- **"Launch the game"** — Neutral, technical.
- **"Take your turn"** — Assumes familiarity (good for returning Legendary players).
- **"Enter the arena"** — Theatrical, matches the positioning.

For each CTA, note:
- **Button color:** Always maroon (`--la-color-cta`), but note if background contrast matters
- **Supporting text option:** E.g., "Start with a free deck" or "No sign-up required" or nothing
- **Target audience:** Who does this CTA resonate with?

---

## Output format

One markdown file: `homepage-variants.md`

Structure as follows:

```md
# Homepage CTA Variants — Exploration

## Executive Summary

- **Highest ROI variant:** [title + subheadline + CTA combo that stands out]
- **Runner-up:** [second-best combo]
- **Dark horse:** [unexpected combo worth A/B testing]

## Axis 1: "What is this?" Headlines (8 variants)

### Variant 1A: Skill angle
**Headline:** "Skill decides every turn"
**Why:** [explain the angle]
**Target:** [who responds to this]

[... repeat for all 8]

## Axis 2: Value signals (8 variants)

### Variant 2A: Skill emphasis
**Subheadline:** "Matches are won by your decisions, not randomness."
**Objection removed:** [what hesitation does this address?]
**Emotional response:** [what feeling should a reader have?]

[... repeat for all 8]

## Axis 3: CTA framing (9 variants)

### Variant 3A: "Play now"
**Button text:** "Play now"
**Supporting text:** (none — direct)
**Color/contrast note:** Maroon on [background color], check at small sizes
**Target audience:** [who clicks this?]

[... repeat for all 9]

## Combinations: Top 5 full-page variants

Combine one headline (Axis 1) + one subheadline (Axis 2) + one CTA (Axis 3) to form a complete hero section.

### Combo 1: [headline title]
**Headline:** [from Axis 1]
**Subheadline:** [from Axis 2]
**CTA:** [from Axis 3]
**Why this combo:** [explain how they reinforce each other]
**Risk:** [if any]

[... repeat for top 5 combos]

## Assumptions

- The rest of the page (value cards, social proof, footer) remains stable
- Hero area is single-column on mobile, desktop neutral spacing
- All copy must fit above the fold on 1280×800 (desktop) and 375×667 (mobile)
- Tone is declarative, confident, not hyped (per docs/brand/strategy.md)
```

---

## Success criteria

- [x] 25 variants generated (8 + 8 + 9)
- [x] Each variant includes a brief rationale (why this works)
- [x] Top 5 combinations are copy-paste ready (no "TODO" or stubs)
- [x] CTA variants note color + contrast implications
- [x] Tone is consistent with brand voice (confident, not hype)
- [x] Variants span different visitor segments (new players, returning Legendary fans, skeptical casuals)

---

## Constraints

- **No implementation detail.** Don't spec CSS, layout, or responsive breakpoints beyond "fits above fold."
- **No speculative positioning.** Stick to what vision.md + current site already claim.
- **Tone discipline.** Every variant must sound like Legendary Arena: strategic, skill-forward, confident. No "EPIC BATTLES" or "UNLEASH THE POWER" hype.
- **Static only.** No assumptions about dynamic content or personalization. Every variant is static copy.

---

## Do / Don't

**DO:**
- Emphasize clarity (what, why, what next)
- Test both emotional (appeal to feeling) and rational (appeal to logic) angles
- Include variants that appeal to different personas (original Legendary players, new card-game players, skeptics)
- Note which combinations feel strongest and why
- Assume visitor has 5 seconds before they scroll or bounce

**DON'T:**
- Use all-caps, exclamation marks, or ALL-HYPE tone
- Promise features not in scope (matchmaking rankings, cosmetics, etc.)
- Assume the visitor knows what "Legendary" is (speak for newcomers)
- Reference specific card names or mechanics (that's play.* / registry.* 's job)
- Suggest implementation solutions (leave that to WP creation)
