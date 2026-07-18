---
title: "The Fixed-Pool Problem: Magneto, Core Set"
date: 2026-07-18
description: "Magneto's Strike demands an X-Men Hero. One of his eight schemes demands a Tech Hero. No Core Set X-Men has Tech. That conflict is the whole puzzle."
draft: false
tags: ["gauntlet", "strategy", "fixed-pool", "magneto", "core-set"]
categories: ["gauntlet-guides"]
series: "Gauntlet Guides"
gauntlet_set: "core"
gauntlet_mastermind: "magneto"
gauntlet_board: "gauntlet-core-magneto"
cta: "play"
---

![Magneto](https://images.legendary-arena.com/core/core-mm-magneto.webp)

Magneto's Master Strike reads: **"Each player reveals an X-Men Hero or discards down to four cards."**

That one line decides this entire gauntlet. Eight schemes, one hero pool, and a Mastermind who taxes you every single Strike unless you are holding the right team. Then leg three asks for something the X-Men cannot give you.

This is the guide to that problem.

## The board

*The block below is generated from the live gauntlet catalog. If a set changes, it changes here too.*

| | |
|---|---|
| **Mastermind** | Magneto |
| **Set** | Core Set — `core` |
| **Legs** | 8 schemes |
| **Board** | `gauntlet-core-magneto` (solo), `…-p2` … `…-p5` |
| **Divisions** | Open, Fixed-Pool |

| Players | Heroes per match | Fixed-Pool budget | Substitutions across the whole gauntlet |
|---|---|---|---|
| 1 | 3 | 5 | 2 |
| 2–4 | 5 | 7 | 2 |
| 5 | 6 | 8 | 2 |

Whatever the player count, your budget is exactly **two heroes wider than a single match**. Eight schemes, two substitutions.

## The X-Men lock

Magneto is not a generically hard Mastermind. He is a *team-check*, and he checks the same team four different ways:

| Card | Effect |
|---|---|
| **Magneto** (Master Strike) | Each player reveals an X-Men Hero or discards down to four cards |
| **Crushing Shockwave** (tactic) | Each other player reveals an X-Men Hero or gains two Wounds |
| **Electromagnetic Bubble** (tactic) | Choose one of your X-Men Heroes — draw it as a seventh card this turn |
| **Xavier's Nemesis** (tactic) | For each of your X-Men Heroes, rescue a Bystander |

Three of his four tactics and his Strike all read the same word. Carrying X-Men here is not thematic — it is the difference between a Strike costing you nothing and a Strike cutting you to four cards, on every leg, all eight times.

Note the fourth row especially. **Xavier's Nemesis converts X-Men into rescued Bystanders**, and Bystander rescue is score-positive (see [scoring](#what-actually-moves-your-score) below). An X-Men-heavy pool doesn't just defend against Magneto — it turns one of his tactics into points.

The Core Set X-Men are **Cyclops, Emma Frost, Gambit, Rogue, Storm, and Wolverine**.

## The trap: leg three

Here is where a naive all-X-Men pool falls apart.

**The Legacy Virus** twists as: *"Each player reveals a Tech Hero or gains a Wound."* Evil wins if the Wound stack runs out.

Now check the Core Set X-Men against Hero Classes:

| Hero | Team | Classes |
|---|---|---|
| Cyclops | X-Men | Strength, Ranged |
| Emma Frost | X-Men | Ranged, Covert, Instinct, Strength |
| Gambit | X-Men | Covert, Instinct, Ranged |
| Rogue | X-Men | Covert, Strength |
| Storm | X-Men | Ranged, Covert |
| Wolverine | X-Men | Instinct |

**Not one of them has Tech.** A pure X-Men pool blanks Magneto on all eight legs and then takes a Wound on every single Legacy Virus twist — with the Wound stack itself being the loss condition.

That is the Fixed-Pool problem in one sentence: **your Mastermind answer and your leg-three answer cannot be the same card.**

## A pool that solves both

The budget has to cover *both* checks. The Core Set Tech Heroes are Iron Man, Black Widow, Hawkeye, Captain America, Nick Fury, Spider-Man, and Deadpool.

**Solo (3 per match, 5 total):**

- **Cyclops, Storm, Rogue** — three X-Men so the reveal is reliable, not a topdeck prayer
- **Iron Man** — Tech for Legacy Virus, Ranged otherwise
- One flex slot

**2–4 players (5 per match, 7 total):**

- **Cyclops, Storm, Rogue, Gambit** — X-Men core
- **Iron Man** *and* **Black Widow** — two Tech sources, because one Tech Hero in a five-hero game is a card you may simply not draw
- One flex slot

**Why these X-Men.** Storm and Gambit bring Ranged and Covert; Rogue brings Covert and Strength; Cyclops brings Strength and Ranged. That spread matters because Hero Class checks appear across the set, and a pool that is all one class fails the same way the all-X-Men pool fails on Legacy Virus. Wolverine is Instinct-only — the narrowest X-Men on class coverage, and the first one I would cut.

**Why two Tech at higher counts.** Reveal effects check your *hand*, not your deck. One copy-thin Tech Hero across a five-hero deck is a coin flip each twist. Two sources turn it into a reasonable expectation.

**The flex slot.** Spend it on whichever leg you are actually losing. Captain America is the widest single answer in the set — Instinct, Strength, Tech, and Covert on one hero — and covers class checks your core misses. Spider-Man is similar. If your losses come from escapes rather than class checks, a straight combat hero serves better.

## What actually moves your score

Final Score is `Raw Score − PAR`, and **negative is better** — under PAR is exceptional play. PAR is fixed per scenario by simulation before anyone picks heroes, so you cannot game it. You can only play the Raw Score side.

Raw Score is driven by:

- **Efficiency** — how many rounds you took
- **Tactical success** — VP earned
- **Heroism** — Bystanders rescued
- **Failures** — Villain escapes, and civilian casualties

The ordering matters and it is explicit in the model: **rescuing Bystanders beats preventing escapes, and losing Bystanders is the worst outcome of the three.** So a run that clears fast but bleeds civilians can score worse than a slower, cleaner one. Speed is a lever, not *the* lever.

Practical consequence for this gauntlet: Magneto's **Xavier's Nemesis** hands you a free Bystander per X-Men Hero. On an X-Men-heavy pool that tactic is a scoring opportunity, not a threat — one more reason the pool above earns its slots.

## Scheme by scheme

Each leg links straight into the builder with the scheme and Magneto pre-pinned.

**1. Midtown Bank Robbery**

![Midtown Bank Robbery](https://images.legendary-arena.com/core/core-sc-midtown-bank-robbery.webp)

8 Twists, 12 Bystanders in the Villain Deck. Villains get **+1 Attack per Bystander they carry**, and Evil wins when 8 Bystanders are carried away.

- The threat compounds: every Twist has a Villain capture 2 Bystanders *and* plays another Villain card
- Kill loaded Villains before they escape — a Villain carrying two Bystanders is both harder to fight and closer to the loss condition
- This is the leg where the moral hierarchy bites hardest: Bystanders lost to escapes are the worst scoring outcome there is
- [Challenge this leg →](https://cards.legendary-arena.com/?schemeId=core%2Fmidtown-bank-robbery&mastermindId=core%2Fmagneto)

**2. Secret Invasion of the Skrull Shapeshifters**

![Secret Invasion of the Skrull Shapeshifters](https://images.legendary-arena.com/core/core-sc-secret-invasion-of-the-skrull-shapeshifters.webp)

6 Heroes, Skrulls required, and **12 random Heroes shuffled into the Villain Deck**. Those Heroes fight as Villains with Attack equal to their VP + 2, and defeating one gains it. Evil wins if 6 Heroes escape.

- Your recruit targets are now also your threats — defeating a Skrull Hero is recruitment by other means
- Escaping Heroes are the clock; six is not many across 8 Twists
- The HQ's highest-cost Hero leaves on every Twist, so expensive HQ cards are unreliable plans
- [Challenge this leg →](https://cards.legendary-arena.com/?schemeId=core%2Fsecret-invasion-of-the-skrull-shapeshifters&mastermindId=core%2Fmagneto)

**3. The Legacy Virus**

![The Legacy Virus](https://images.legendary-arena.com/core/core-sc-legacy-virus-the.webp)

**The pool-defining leg.** Twist: each player reveals a **Tech** Hero or gains a Wound. Wound stack holds 6 per player, and Evil wins if it empties.

- This is why your pool cannot be all X-Men — see [the trap](#the-trap-leg-three)
- Wounds here are a shared resource; in multiplayer the stack drains at table speed, not your speed
- Holding a Tech Hero rather than playing it out is correct on Twist-heavy turns
- [Challenge this leg →](https://cards.legendary-arena.com/?schemeId=core%2Flegacy-virus-the&mastermindId=core%2Fmagneto)

**4. Negative Zone Prison Breakout**

![Negative Zone Prison Breakout](https://images.legendary-arena.com/core/core-sc-negative-zone-prison-breakout.webp)

An **extra Henchman group**, and every Twist plays the **top 2 cards** of the Villain Deck. Evil wins at 12 escapes.

- Double-speed Villain Deck means the city fills faster than your board develops
- 12 escapes is a generous ceiling, which makes this a tempo test rather than a knife-edge — lean toward efficiency here
- The extra Henchman group is cheap VP; take it when the alternative is letting a real Villain escape
- [Challenge this leg →](https://cards.legendary-arena.com/?schemeId=core%2Fnegative-zone-prison-breakout&mastermindId=core%2Fmagneto)

**5. Portals to the Dark Dimension**

![Portals to the Dark Dimension](https://images.legendary-arena.com/core/core-sc-portals-to-the-dark-dimension.webp)

**7 Twists, and Twist 7 is an immediate loss.** Twist 1 gives Magneto +1 Attack; Twists 2–6 place Portals that buff each city space.

- This is a **hard clock** — the only leg with a fixed, unavoidable turn ceiling
- Everything gets stronger while your window shrinks; a slow engine simply loses
- Magneto himself gets tougher on Twist 1, so plan the Mastermind fight before the buffs stack
- Of the eight, this is the leg where raw speed is most directly correct
- [Challenge this leg →](https://cards.legendary-arena.com/?schemeId=core%2Fportals-to-the-dark-dimension&mastermindId=core%2Fmagneto)

**6. Replace Earth's Leaders with Killbots**

![Replace Earth's Leaders with Killbots](https://images.legendary-arena.com/core/core-sc-replace-earths-leaders-with-killbots.webp)

5 Twists, 18 Bystanders in the Villain Deck. Bystanders **are** Killbot Villains with Attack equal to the number of Twists next to the Scheme. Evil wins if 5 Killbots escape.

- Killbots start trivial and scale with every Twist — clear them early while they cost nothing
- Bystanders are not rescues here, they are enemies; the usual heroism instinct is inverted
- Only 5 escapes allowed against 18 potential Killbots makes this the tightest escape budget in the gauntlet
- [Challenge this leg →](https://cards.legendary-arena.com/?schemeId=core%2Freplace-earths-leaders-with-killbots&mastermindId=core%2Fmagneto)

**7. Super Hero Civil War**

![Super Hero Civil War](https://images.legendary-arena.com/core/core-sc-super-hero-civil-war.webp)

Twist: **KO all Heroes in the HQ.** Evil wins if the Hero Deck runs out. Twist count varies by player count (8 for 2–3, 5 for 4–5).

- Your recruitment engine is the target — every Twist wipes the shop
- Recruit *before* Twists when you can; a held recruit is worth less than a bought one here
- The Hero Deck itself is the clock, so HQ churn is a loss condition, not an inconvenience
- Fewer Twists at higher counts makes this notably shorter at 4–5 players
- [Challenge this leg →](https://cards.legendary-arena.com/?schemeId=core%2Fsuper-hero-civil-war&mastermindId=core%2Fmagneto)

**8. Unleash the Power of the Cosmic Cube**

![Unleash the Power of the Cosmic Cube](https://images.legendary-arena.com/core/core-sc-unleash-the-power-of-the-cosmic-cube.webp)

8 Twists. Twists 5–6 wound every player, Twist 7 deals **three** Wounds each, and **Twist 8 is an immediate loss**.

- The second hard clock, with escalating damage attached
- Wounds clog your deck exactly when you most need it running clean
- Plan to have the Mastermind dead before Twist 7 — after that, Wound density makes recovery unrealistic
- [Challenge this leg →](https://cards.legendary-arena.com/?schemeId=core%2Funleash-the-power-of-the-cosmic-cube&mastermindId=core%2Fmagneto)

## Common mistakes

- **Building all X-Men.** It looks correct against Magneto and loses to Legacy Virus.
- **One Tech Hero at 4–5 players.** Reveal checks your hand. One source is a coin flip.
- **Treating every leg as a speed run.** Portals and Cosmic Cube have hard clocks; Midtown Bank Robbery punishes haste that leaks Bystanders.
- **Rescuing on Killbots.** Bystanders are Villains on leg 6 — the reflex is actively wrong.
- **Spending the flex early.** You get two substitutions total. Spend them on the leg you actually failed, not the one you feared.

## What this section will say later

Straight about the limits: **no Fixed-Pool board on this gauntlet has been claimed yet.** Everything above is derived from card text and the published scoring model, not from observed results. I have not told you what scores well because nobody knows yet — and I would rather leave that gap visible than fill it with a plausible-sounding number.

Every score here is replay-verified. Once entries land, this section becomes real data: the actual pool compositions of ranked entries, per-leg score spreads, and which cores survive all eight schemes. Then the recommendations above get graded against what actually won.

Every Fixed-Pool board is currently unclaimed. When the boards open, the first person to solve this one gets their pool published next to their name.

> **One honest caveat before you start.** The gauntlet boards are not accepting entries yet. Competitive scoring is gated on **PAR calibration** — the per-scenario baseline every score is measured against — and PAR is deliberately unpublished until the engine implements each scenario's card abilities faithfully. Publishing baselines against a partly-implemented engine would bake wrong numbers into permanently version-pinned scores, so the gate stays closed on purpose.
>
> Practically: you can play these matches today, but a finished run will not yet post to the board. When calibration publishes, the boards open. The pool-construction problem above is unchanged either way — it comes from the cards, not the scoring.

**[View the Magneto gauntlet →](https://legends.legendary-arena.com/#/gauntlet/gauntlet-core-magneto)**
