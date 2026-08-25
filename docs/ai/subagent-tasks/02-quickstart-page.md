# Task 02 — Getting Started / How to Play Quickstart Page

**Objective:** Draft a full "Getting Started / How to Play" page that removes conversion friction and answers "Can I start now? What comes first?" — **marketing orientation for play.legendary-arena.com, not game documentation.**

**Owner:** Jeff Jensen  
**Phase:** P0 (foundational conversion surface)  
**Est. effort:** ~1 hour  
**Dependencies:** None (parallel with Task 01)

---

## Inputs you need

1. **`01-VISION.md`** — Read the "Out of scope (v1)" clarification (lines 128–130, updated 2026-06-12). Key distinction: this is **marketing orientation** ("Can I start?"), not **player documentation** (game rules/mechanics, deferred to wiki.legendary-arena.com).
2. **`ENHANCEMENT-REQUESTS.md`** — Read ER-012 (now promoted to WP-026). It frames the intent: "what is LA? How does a session work at high level? What does a new player click first? Where to learn more? Common questions."
3. **Current homepage + about page** — Know what's already said about LA so you don't duplicate.
4. **`docs/brand/strategy.md`** — Tone: declarative, confident, skill-focused, not hyped.

---

## Task description

The Getting Started page lives at `/getting-started/` (or `/quickstart/` — user will decide). Its job: **move a visitor from "maybe I'll play" to "I'm playing right now."**

It does this by answering four questions in order, each more specific than the last:

### 1. Is this for me? (Section 1: Quick qualification)
**Goal:** In <100 words, help the visitor self-qualify. They already know it's a deck-building game; now they need to know if they're the target player.

Generate 3 variants:

**Variant A: Skill-forward angle**
> "Legendary Arena is for players who love deck-building games where your decisions drive the outcome. No auto-pilot. No RNG deciding the match. Just you, your deck, and your strategy."

**Variant B: Accessibility angle**
> "Legendary Arena takes the best of deck-building and strips away the friction. Quick matches. Free-to-play. No endless progression treadmills. You build a deck in 5 minutes and start playing immediately."

**Variant C: Legacy angle**
> "If you've ever played the original Legendary card game, you know the joy of tactical deck-building. This is that game, digital, instant, and ready to play."

For each, note **who it speaks to** (original Legendary player, card-game veteran, mobile gamer, etc.).

### 2. How does it work? (Section 2: Mechanics snapshot — **NOT detailed rules**)
**Goal:** In <150 words, describe the game loop at 30,000 feet. The visitor should understand: "I build a deck → I play matches → matches have turns → skill matters."

Generate 2 variants (short + medium):

**Variant 1: Short version (for mobile scrollers)**
> "**Build a deck** from 60 unique cards, each with a specific power. **Play matches** against other players online or against AI. **Your turn, every turn:** choose which card to play, when, and how. **Your skill decides** the outcome — there's no luck, no RNG, no randomness. Win matches, earn recognition, build better decks."

**Variant 2: Slightly longer (for engaged readers)**
> "Here's the game loop:
>
> 1. **Deck Building** — You assemble a 40-card deck from 60 possible cards. Each card is a decision point: does this card support my strategy? Am I building around speed, control, power, or balance?
>
> 2. **Match Start** — Your deck faces an opponent (human or AI). Both players draw their starting hands.
>
> 3. **Turn-by-Turn Play** — Each turn, you choose: which card to play? When? In response to what your opponent did? There are no auto-pilot moments. Every action is your choice.
>
> 4. **Outcome** — Matches last ~15 minutes. Winner takes rating points. Loser learns from the loss and builds a better deck.
> 
> That's it. No tutorial walls. No stamina meters. No loot boxes."

### 3. How do I start? (Section 3: First steps — **action-oriented**)
**Goal:** In <100 words, tell the visitor the first three clicks: create account → build deck → play match.

Generate 1 clear variant (must be step-by-step, no waffling):

> **Step 1 — Create an account**
> Click "Play now" at the top of this page. Sign in with email or [single-sign-on option]. That's it.
>
> **Step 2 — Build your first deck**
> The game walks you through choosing 40 cards. Pick cards that sound fun; don't overthink it. Your first deck is always beatable.
>
> **Step 3 — Play a match**
> Hit "Find opponent." A match takes 10–15 minutes. If you lose, good — that's data. Adjust your deck and try again.

### 4. Common questions (Section 4: Objection handling)
**Goal:** Preemptively answer the five most likely objections / hesitations.

Generate these 5 Q&A pairs (each answer: <50 words):

1. **"Is this official? Who made it?"**
   > "Yes. Legendary Arena is made by the same team that designed the original Legendary card game. It's the official digital adaptation."

2. **"Do I need to pay? Is there a battle pass?"**
   > "No battle pass. No forced spending. Free-to-play means you can play unlimited matches without paying. Optional cosmetics and bundles exist, but the core game is free."

3. **"Will I get stomped by veterans?"**
   > "Matchmaking pairs you with players at your skill level. Your first few matches are against other new players. As you improve, you face better opponents."

4. **"Is there really no RNG / luck?"**
   > "Correct. Your deck is deterministic. Every card does exactly what it says, every time. Matches are decided by your decisions, not dice rolls or shuffled luck."

5. **"What if I don't like deck-building? Can I just play?"**
   > "Deck-building is the core of the game — it's part of the strategy, not separate from play. If you want pure real-time action with no planning, this isn't for you. If you like thinking ahead and outsmarting opponents, you'll love it."

---

## Output format

One markdown file: `quickstart-page.md`

Structure as follows (use this as the page structure itself):

```md
# Getting Started / How to Play

## Executive Summary

- **Primary CTA:** [what's the call-to-action at the top?]
- **Reading time:** [estimate]
- **Key objections addressed:** [list 5]

## Is this for me?

### Variant A: [angle]
[copy]

### Variant B: [angle]
[copy]

### Variant C: [angle]
[copy]

**Recommended:** [which variant to ship]

---

## How it works

### Variant 1: Short (mobile-friendly)
[copy]

### Variant 2: Medium
[copy]

**Recommended:** [which variant to ship]

---

## First steps

[Step 1 — copy]
[Step 2 — copy]
[Step 3 — copy]

---

## Common questions

1. **Is this official?**
   [answer]

2. **Do I need to pay?**
   [answer]

[... repeat for all 5]

---

## Below the fold (optional sections to consider)

- **Visual break with a screenshot** of the game in action (TBD: designer provides this)
- **"Ready to start?" CTA button** linking to play.legendary-arena.com
- **Footer link:** "Want the deep lore? Read the blog" or "Learn game mechanics on the registry"

---

## Assumptions

- Reader is on www.legendary-arena.com (has seen the homepage already)
- Reader is considering clicking "Play now" but has hesitations
- Reader has NOT read detailed game rules and doesn't need to
- Reader assumes "deck-building" means it's complex; we clarify it's actually simple at start
```

---

## Success criteria

- [x] 4 sections generated (Is this for me? / How it works? / First steps / Common Q&A)
- [x] All variants are copy-paste ready (no stubs or "TODO")
- [x] Reading time is <3 minutes (mobile-friendly, scannable)
- [x] Each variant addresses a different visitor persona or objection
- [x] CTA is clear and action-oriented
- [x] Tone matches brand voice (confident, declarative, not hype)

---

## Constraints

- **Marketing orientation, NOT documentation.** Don't explain the rules of card play, mechanics, or strategy. Don't reference specific card abilities or heroes. That's wiki.legendary-arena.com's job.
- **Static page.** No dynamic content, no live game data, no API calls.
- **Conversion-focused.** Every section should move the reader closer to "I'm playing now."
- **Respect failure isolation.** This page must render even if play.legendary-arena.com is offline (the CTA link may break, but the page itself is readable).

---

## Do / Don't

**DO:**
- Write for a reader who has 30 seconds but might stay for 3 minutes if you hook them
- Address the "I'm not sure I'm good enough" objection early
- Be specific (15 minutes per match, 40 cards in a deck) — specificity builds confidence
- Include a single, clear CTA at the top and mention it again at the bottom
- Use short paragraphs and list formatting for scannability

**DON'T:**
- Explain complex card mechanics or advanced strategy
- Promise features not in the game yet (ranked ladder, tournaments, cosmetics if not ready)
- Use hype language or exclamation marks
- Assume the visitor knows what "Legendary" (the original game) is
- Include screenshots of gameplay (that's a design task; mention where they should go)
- Link to the registry or wiki (not your job to bridge; just mention "deep lore")
