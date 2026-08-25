# Task 04 — Press Kit / Media Kit Builder

**Objective:** Produce a complete press kit draft (project description, fact sheet, talking points, founder summary, media-request language) for press, partners, and IP evaluators per ER-010.

**Owner:** Jeff Jensen  
**Phase:** P1 (secondary audience reach)  
**Est. effort:** ~45 minutes  
**Dependencies:** None (parallel with Task 05)

---

## Inputs you need

1. **`01-VISION.md`** — Read the "Audience" section (lines 27–34). Secondary audience: "Press, partners, and IP holders evaluating the project."
2. **`03-ROADMAP.md`** — Status overview: most WPs are done (as of 2026-06-12), site is live, WP-024 in progress. Use this to frame "project maturity."
3. **`docs/brand/strategy.md`** — Voice + tone (confident, declarative).
4. **Current about page** — What's already said about who's behind it and the project.
5. **Live site** — https://www.legendary-arena.com/ — spot-check the header/footer for social links and press contact.

---

## Task description

A press kit answers: "What is this project, and who do I talk to if I want to cover it / partner on it / evaluate it?"

You're building a `/press/` page (or downloadable package) with these sections:

### 1. Project snapshot (50–100 words)
**Goal:** One paragraph that a press person can lift directly into an article.

Generate 1 variant that covers:
- What Legendary Arena is (the essence)
- Why now (why a digital adaptation)
- Status (live, beta, actively developed)
- Where to play (play.legendary-arena.com)

Example structure:
> "Legendary Arena is the official digital adaptation of Legendary, the acclaimed deck-building card game. Players build 40-card decks from 60 unique cards and compete in skill-based matches where strategy, not randomness, decides the outcome. The game is live and free-to-play, with open matchmaking and a focus on accessibility for new players. [Designer/team names] led the project. [URL]."

### 2. Fact sheet (bullet-pointed)
**Goal:** Scannable reference for journalists, partners, and evaluators.

Generate a fact sheet with these categories:

**Game fundamentals**
- Genre: Deck-building card game (digital adaptation)
- Platform: Web-based, plays in any modern browser
- Price: Free-to-play (no battle pass, no forced spending)
- Matchmaking: Skill-based pairings
- Match length: 10–15 minutes per game

**Project status**
- Launch date: [date live, e.g., "May 2026"]
- Current state: Live, actively maintained
- Upcoming features: [TBD — check WP-024 and roadmap]
- Player count: [TBD — skip if not tracking]

**Team & lineage**
- Original game: Legendary: A Marvel Deck Building Game (Upper Deck Entertainment)
- Digital adaptation led by: [names from about page]
- Design philosophy: Skill-first, accessibility-focused, deterministic gameplay
- Related properties: Registry at cards.barefootbetters.com

**Where to engage**
- Play: https://play.legendary-arena.com/
- Card registry: https://cards.barefootbetters.com/
- Blog/announcements: https://www.legendary-arena.com/blog/
- Discord: [link if exists]
- Contact: [press contact email]

### 3. Talking points (5–7 bullets)
**Goal:** Key differentiators that should appear in any coverage.

Generate these talking points (each <20 words):

1. **Skill decides, not luck** — No RNG, no randomness. Every card does exactly what it says. Matches are won by decisions, not dice.
2. **Deck-building is the strategy** — The game isn't just about playing cards; it's about designing the deck that beats your opponent.
3. **Fast matches, no grind** — A full match in 15 minutes. No stamina, no daily login treadmills, no forced progression.
4. **Official adaptation** — Made by the original designers, bringing the beloved physical game to digital without losing what makes it special.
5. **Free to play, fair to all** — No battle pass. No cosmetics that change gameplay. Free players compete equally with anyone.
6. **Live competition** — Play against real players, earn rankings, build better decks. No single-player campaign.
7. **Card collection ≠ power** — Owning 60 cards means nothing. Skill in choosing which 40 goes into your deck is everything.

### 4. Founder / designer brief (100–150 words)
**Goal:** A short bio that press can use as an author byline or as team context.

Generate 1 variant that includes:
- Name + role
- Background (how they came to LA, why they care)
- Design philosophy (1–2 sentences)
- What's next for the project (vision)

Example:
> "[Name] is the lead designer of Legendary Arena, the digital adaptation of the acclaimed Legendary deck-building game. [His/Her] background in [card game design / competitive play / software] brought [specific insight], which shaped the design philosophy: **skill-first gameplay, no random elements, matches that end in 15 minutes**. The original Legendary game proved that deck-building is endlessly rewarding; the digital version removes the barriers (physical components, shipping, setup time) while preserving the strategic depth. [Name] is focused on building a thriving competitive community and plans to [next feature / next expansion] in Q3 2026."

### 5. High-resolution assets checklist
**Goal:** List what a press person might ask for + where they live.

Generate a checklist:

- [ ] **Logo** (wordmark, icon, lockup) — `static/brand/logo-*.svg` or similar
- [ ] **Screenshots** (hero, gameplay, deck-building UI) — `/static/images/press/screenshots/` (if they exist)
- [ ] **Hero image** (game in action, promotional) — `static/images/press/hero.png`
- [ ] **Fact sheet** (this file, as PDF) — `www.legendary-arena.com/press/assets/fact-sheet.pdf` (TBD: implement)
- [ ] **Founder headshot** (high-res, 300 DPI) — `static/images/press/founder-photo.jpg` (TBD: implement)

For each asset, note:
- Current location (or "TBD — needs design")
- Recommended dimensions / format
- Alt-text for accessibility

### 6. Media request / contact form copy
**Goal:** Tell journalists and partners how to reach you.

Generate 1 variant:

> **For press inquiries, interviews, or partnership opportunities:**
>
> Email: [press contact email]
> 
> Include:
> - Your publication / organization name
> - What you'd like to discuss (coverage, partnership, IP licensing)
> - Your deadline (if time-sensitive)
>
> Response time: 24–48 hours (Pacific time).

---

## Output format

One markdown file: `press-kit.md`

Structure as follows:

```md
# Press Kit — Legendary Arena

## Executive Summary

- **One-liner:** [boilerplate project description]
- **Key differentiator:** [what makes this different from other deck-builders]
- **Press contact:** [email]

---

## Project snapshot

[50–100 word paragraph suitable for liftng into an article]

---

## Fact sheet

### Game fundamentals
- [bullets]

### Project status
- [bullets]

### Team & lineage
- [bullets]

### Where to engage
- [bullets]

---

## Key talking points

1. [Point 1, <20 words]
2. [Point 2, <20 words]
...

---

## Founder / Designer

[Name + bio, 100–150 words]

---

## High-resolution assets

| Asset | Location | Format | Notes |
|---|---|---|---|
| Logo | [path or "TBD"] | SVG | [dimensions if relevant] |
| Screenshots | [path or "TBD"] | PNG | [recommended set: hero, gameplay, deck-builder] |
| [other] | ... | ... | ... |

---

## Media requests & contact

[Contact form copy + instructions]

---

## Boilerplate company description (if needed)

[If press want your company details too, not just the game]

---

## FAQ (optional — if you want to include press-specific questions)

**Q: Where can journalists / evaluators / partners reach you?**
A: [contact info]

**Q: Can we get an exclusive interview?**
A: We're always interested in speaking with press. Email [contact] with details.

**Q: Can we embed screenshots / video in our article?**
A: Yes. All assets in the press kit are free to use with attribution. Video: please link to play.legendary-arena.com.

[Add 2–4 more relevant Q&A based on likely press questions]
```

---

## Success criteria

- [x] Project snapshot is <100 words and press-liftable
- [x] Fact sheet is scannable (bullets, no dense prose)
- [x] Talking points are 5–7 clear differentiators (<20 words each)
- [x] Founder bio includes background + design philosophy
- [x] Assets checklist is complete (lists what exists, flags what's TBD)
- [x] Contact form copy is clear and welcoming
- [x] Tone is professional but not stuffy (matches brand voice)

---

## Constraints

- **Static content.** No dynamic updates, no live game stats in the kit.
- **Accuracy.** Don't promise features not in scope or not shipped yet.
- **Tone.** Professional, confident, but match the brand voice (not corporate jargon).
- **Scope.** This is a press kit, not a business plan or technical whitepaper. Keep it accessible to non-technical readers.

---

## Do / Don't

**DO:**
- Write for people who skim (bullets, short paragraphs)
- Include specific details (15 minutes per match, 60 cards, etc.)
- Make it easy to find contact info
- Use language that press can lift directly
- Think about what a Forbes/Kotaku/GameInformer reporter would ask for

**DON'T:**
- Include confidential business data (financials, player count if not public, etc.)
- Make promises about future features not committed to
- Use hype language (no "REVOLUTIONARY" or all-caps claims)
- Assume the reader knows what Legendary is (the original game)
- Make the file so long it becomes a whitepaper
