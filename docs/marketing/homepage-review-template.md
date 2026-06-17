# Homepage Marketing Review Template

> **Editing this file**
>
> 1. Edit directly at `C:\www\legendary-arena-com\docs\marketing\homepage-review-template.md`
> 2. Commit with `SPEC:` prefix (e.g., `SPEC: update problem catalog in review template`).
>    `FIX:` is limited to the content lane (`content/**`, `static/images/**`) — `docs/` requires `SPEC:`.
> 3. Push to `main`, or branch + PR if you want review.
> 4. If edits change scope or structure, also update the ewiki page at
>    `C:\pcloud\BB\DEV\legendary-arena\wiki\homepage-review-template.md`
>    and push the `legendary-arena` repo separately.
> 5. If edits change what the homepage actually implements, re-grade the
>    scorecard at `C:\pcloud\BB\DEV\legendary-arena\wiki\homepage-marketing-scorecard.md`.
>
> **Related files:**
> - `C:\www\legendary-arena-com\docs\marketing\homepage-spec.md` — build document (split from this template)
> - `C:\www\legendary-arena-com\docs\marketing\homepage-appendix.md` — strategy reference (split from this template)

**Site:** legendary-arena.com
**Framework:** StoryBrand SB7 (Donald Miller) + Business Made Simple website template
**Reference model:** drjjpeterson.com
**Date:** 2026-05-15

---

Every homepage must answer three questions in order. If a visitor can't
answer all three within a few seconds of scrolling, the page isn't doing
its job. This document is both the diagnosis and the build spec — each
section includes the SB7 rationale, the current-state audit, and
implementation-ready copy to ship.

### Governing Principles (from *Building a StoryBrand*)

- **The customer is the hero, not your brand.** Position the customer as
  the hero and Legendary Arena as the guide. The moment we start talking
  about ourselves — our origin story, our tech stack, our mission — the
  customer checks out.
- **Clarity over cleverness.** Visitors decide within seconds whether we
  have what they're looking for. If they can't pass the "grunt test"
  (could a caveman glance at the site and grunt what we offer, how it
  improves their life, and how to get it?), the page fails.
- **People don't buy the best products; they buy the products they can
  understand the fastest.** Every line of copy either serves the
  customer's story or descends into noise.
- **Customers buy solutions to internal problems.** Companies tend to
  sell solutions to external problems, but the purchase decision is
  driven by how the problem makes the customer *feel*.
- **Write it in Morse code.** Copy should be brief, punchy, and
  relevant. People scan websites — they don't read them. If there's a
  paragraph above the fold, it's being skipped.
- **Repetition drives action.** CTAs must appear multiple times — in the
  hero, in the top-right nav, and repeated as the visitor scrolls.

---

## Hero Section Specification (Grunt Test)

The hero must communicate the offer in under 5 seconds with zero
ambiguity. A new visitor must be able to answer three questions without
scrolling:

1. What is this?
2. How does it help me?
3. How do I start?

If any answer requires scrolling, the hero fails.

### Required Structure

**1. Category + Benefit Headline**

Format: `[Category] for [who] who want [outcome]`

> A skill-first card game where winning isn't bought

**2. Pain-driven Subhead**

Mirror the internal frustration in one line:

> No pay-to-win. No grind walls. Just strategy.

**3. Direct CTA (Primary)**

> Play Free

Must be above the fold. Button color must differ from everything else
on the page.

**4. Transitional CTA (Secondary)**

> Watch gameplay / How it works

For visitors not ready to commit. Placed next to or below the direct
CTA.

**5. Hero Visual**

Screenshot, gameplay video, or illustrated scene showing the product
in action. Not a placeholder SVG. Not a logo. Not abstract art.

### Current State

| Element | Required | Present? |
|---------|----------|----------|
| Category + benefit headline | Yes | No — "The arena awaits" tells a cold visitor nothing |
| Pain-driven subhead | Yes | No — "Assemble your heroes..." assumes deck-building vocabulary |
| Direct CTA above fold | Yes | Partial — "Play now" exists but visitor has no context yet |
| Transitional CTA | Yes | No |
| Hero visual | Yes | No — placeholder SVG |

---

## 1. What is the problem?

### SB7 elements: The Character + Has a Problem + Meets a Guide (empathy)

The visitor needs to see their own frustration reflected back at them
before they'll care about a solution. In StoryBrand terms, the homepage
must first establish the **character** (the customer-hero) and their
**desire**, then name the **problem** that stands between the hero and
that desire, and finally demonstrate **empathy** — proving the guide
understands the hero's struggle.

#### The Character and Their Desire

StoryBrand Principle One: *The customer is the hero, not your brand.*

A story doesn't pick up until the hero wants something. The homepage must
define a single, clear desire the customer has — and that desire must
connect to survival (broadly: being safe, healthy, happy, strong, or
having the resources to thrive). Vague desires don't open a "story gap";
specific ones do.

| Criterion | Target | Current State |
|-----------|--------|---------------|
| **Single customer desire** | One clear thing the customer wants, stated in their language. StoryBrand: pare the ambition down to a single focus connected to the customer's sense of survival/thriving. For a game: "a card game that rewards your brain, not your wallet." | Not defined. The homepage speaks in product-voice ("The arena awaits") without naming what the customer wants. |
| **Story gap** | The gap between where the customer is and where they want to be. When we name the desire, the audience subconsciously asks: "Will I get it?" That question is what keeps them scrolling. | No story gap opened — the visitor has no reason to wonder "will I get what I want?" because no desire has been named. |

#### Why These Desires Work: The Player Needs Pyramid

StoryBrand grounds its framework in a foundational insight from
behavioral psychology: the brain is constantly scanning its environment
— including advertising — for information that helps it survive and
thrive. If our messaging doesn't connect to that primitive calculus,
the customer tunes us out.

Miller maps this directly to Maslow's hierarchy of needs. The brain
processes needs in order — it is tasked first with physical survival
(eating, drinking, having a dependable income), then with safety (a
roof, well-being, the power to not be vulnerable), then with
relationships (friendships, a tribe who will stick by you against social
threats), and finally with greater psychological, physiological, or
spiritual needs that give life a sense of meaning.

The hierarchy is strict: **if lower-level needs aren't satisfied,
higher-level messaging fails.** In product terms: if the game isn't
functional and fair, nothing else matters. If fairness isn't trusted,
competitive prestige is meaningless.

For Legendary Arena, the generic Maslow levels translate into a
game-specific **Player Needs Pyramid** — five levels that map directly
to the product, the problems catalog, and the homepage messaging
strategy.

```
    5. MASTERY & MEANING
       Become a smarter, better player

    4. RECOGNITION
       Skill is measured and rewarded

    3. COMMUNITY
       Play with others who care about fairness

    2. TRUST & FAIRNESS
       No cheating, no pay-to-win, full transparency

    1. ACCESS & PERFORMANCE
       Fast, reliable, frictionless gameplay
```

#### Level 1 — Access & Performance (Physiological Equivalent)

**What the player asks:** "Can I actually play this easily?"

The base of the pyramid. If the game doesn't load, crashes, or puts
barriers between the player and gameplay, nothing above this level
matters.

| Player Need | How LA Meets It | Problems Addressed |
|-------------|-----------------|-------------------|
| Game works instantly | Web-based — play in your browser, no installs | #15 (session reliability) |
| No barriers to entry | No gating, no waiting systems, no setup friction | #2 (grind/time-gates) |
| Recoverable sessions | Stateless client, reconnection support | #15 (session reliability) |
| Performance-first | Designed for responsiveness (Vision §16) | — |

**Met?** Yes. Strong alignment with product architecture.

**Homepage copy opportunity:**

> Play instantly in your browser. No installs. No friction.

**Homepage section mapping:** Hero, Plan

---

#### Level 2 — Trust & Fairness (Safety Equivalent)

**What the player asks:** "Is this game rigged?"

This is Legendary Arena's **single strongest differentiator.** Most
games compete at levels 3-4 (social, achievement). Very few address
level 2. The pay-to-win villain attacks this level directly — it
threatens the player's sense that the system is fair and stable.

| Player Need | How LA Meets It | Problems Addressed |
|-------------|-----------------|-------------------|
| No pay-to-win | No purchasable power, no tier-gated mechanics (NG-1) | #1 (pay-to-win) |
| No hidden manipulation | No secret modifiers, no manipulated RNG | #4 (hidden mechanics) |
| Rules don't change | Deterministic engine, explicit change governance | #3 (balance patches) |
| Verifiable outcomes | Replay verification, inspectable logs (Vision §3) | #10 (verifiable results) |
| Transparent scoring | PAR-based scoring, every component visible | #5 (gameable leaderboards) |

**Met?** Yes. Deeply solved — this is LA's core thesis.

**Homepage copy opportunity:**

> Every game is verifiable. Nothing is hidden. Skill is all that matters.

Alternative (emotion-first):

> Finally, a card game you can trust.

**Homepage section mapping:** Hero, Problem (this is the villain's home
level — the problem section should anchor here)

**Strategic insight:** The pay-to-win villain is powerful precisely
because it attacks level 2 — the player's sense of safety and trust.
When Legendary Arena positions itself as the alternative, it's not just
offering a better game; it's offering relief from a fundamental
betrayal of the player's trust. This is why the villain should anchor
the homepage: it's the lowest unmet need for the target audience, and
the one that resonates before the visitor has any context about the
product.

---

#### Level 3 — Community (Belonging / Tribe Equivalent)

**What the player asks:** "Do people like me play this?"

Once the game works and is fair, the player needs to know they're not
alone — that a community exists, and that it shares their values.

| Player Need | How LA Meets It | Problems Addressed |
|-------------|-----------------|-------------------|
| Cooperative play | Multiplayer mirrors tabletop cooperation (Vision §4) | #14 (multiplayer cooperation) |
| Reliable sessions | Reconnection + late-joining support | #15 (session reliability) |
| Shared experiences | Spectation, shared scenarios, benchmarks | #18 (spectation) |
| Active community | Discord, tournaments, shared challenge runs | #6 (mastery over volume) |

**Met?** Yes, architecturally. But **not communicated on the homepage.**
Discord activity, tournament participation, and community size are not
surfaced.

**Homepage copy opportunity:**

> Join a community of players who believe skill should decide every match.

**Homepage section mapping:** Results, Proof

---

#### Level 4 — Recognition (Esteem / Status Equivalent)

**What the player asks:** "Am I getting better? Does it matter?"

The player now wants proof that their skill is real, measurable, and
respected. Maslow places achievement, mastery, and recognition squarely
in the esteem layer. In gaming, this is where leaderboards, rankings,
scores, and awards live.

Esteem needs have two faces:
- **Self-respect** — confidence in one's own ability ("Am I better than
  I was?")
- **Recognition from others** — status and reputation among peers ("Do
  others see that I'm skilled?")

Leaderboards, PAR scores, badges, and rankings are not just features —
they are the **engine of esteem**. They give structure to the question
"am I good?" and make the answer visible to both the player and their
peers.

| Player Need | How LA Meets It | Esteem Function | Problems Addressed |
|-------------|-----------------|-----------------|-------------------|
| Objective skill measurement | PAR-based scenario scoring (Vision §20) | Self-respect — defines what "better" means | #7 (skill measurement) |
| Performance benchmarks | Scenario-specific baselines, AI playtesting (§22-23) | Self-respect — feedback loop for growth | #9 (performance reality) |
| Verified leaderboards | Replay-verified, immutable rankings (§24) | Recognition — public, provable standing | #5 (gameable leaderboards) |
| Anti-grind scoring | Quality-based scoring, not volume-based (§25) | Both — rank means skill, not hours | #6 (repetition over mastery) |
| Profiles reflect truth | Performance-derived identity (§19a) | Both — reputation is earned, not inflated | #9 (performance reality) |

**Met?** Yes, deeply. But **not communicated on the homepage.**

**Critical dependency: Recognition requires Trust (L2 → L4).**

This is the most important structural relationship in the pyramid.
Recognition systems only work when the underlying system is trusted.
Most games break the esteem layer by:

- Rewarding **time played** instead of skill
- Inflating achievements so everyone "wins"
- Allowing pay-to-win to corrupt rankings
- Making leaderboards grind-based or gameable

When esteem systems are broken, players stop trusting that rank means
anything. The entire recognition layer collapses into noise.

Legendary Arena's recognition system is fundamentally different because
Level 2 (Trust & Fairness) is rigorously enforced:

- Recognition is **earned through replay-verified performance**
- Rankings are **skill-based, not volume-based**
- Achievements are **provable and deterministic**
- Profiles reflect **truth, not perception** (§19a)

This makes LA's esteem layer authentic, trustworthy, and meaningful —
which is extremely rare. Without trust, recognition is meaningless.
With trust, recognition becomes powerful.

**Recognition also feeds upward into Level 5 (Mastery).** It gives
players feedback loops that define what "better" means, creates
long-term goals, and makes the pursuit of excellence visible. Without
recognition, mastery has no visible structure.

#### Public Leaderboard (WP-149 — Live Surface)

The public leaderboard at `legendary-arena.com/leaderboard/` is the
first user-visible surface of the recognition system. It is a read-only
page consuming the engine's leaderboard API and rendering three views:

1. **Top-N Global PAR** — default view; lowest `finalScore` entries
   across all PAR-published scenarios.
2. **Theme Score** — theme-grouped leaderboard (via `?themeId=`).
3. **Scheme-Mastermind** — URL contract reserved; renders "coming soon"
   placeholder in v1.

Every value on the page (rank, finalScore, rawScore, parVersion,
replayHash, playerDisplayName) comes directly from the API response —
the page performs zero client-side score derivation. Each entry exposes
`replayHash` as a permalink to the underlying replay, making every
ranking position independently verifiable.

This is the recognition system's public face — the surface where esteem
becomes visible to the community. It is also the first proof point the
homepage can link to: "See who's leading. Every score is
replay-verified."

**Status:** Drafted, blocked on WP-148 (CORS) + WP-150 (aggregation
endpoints). Vision alignment: §3 (player identity), §10 (content
semantics), §22 (replay verification), §24 (skill measurement).

#### Badge System Architecture (Esteem Engine)

Badges are not rewards — they are **public proof of identity.** When
designed correctly, they create status, signal skill, and enable
recognition by others. A well-designed badge system is the engine that
translates gameplay performance into visible, social markers of
achievement.

Most games misuse badges by rewarding activity ("Played 100 games,"
"Logged in 30 days," "Spent $50"). This inflates badge counts, destroys
meaning, and collapses the esteem layer into noise. Legendary Arena's
badge system must be fundamentally different: every badge is tied to
replay-verified, deterministic outcomes.

**Five badge categories, each targeting a specific esteem driver:**

| Category | Purpose | Examples | Esteem Driver | Frequency |
|----------|---------|---------|---------------|-----------|
| **Skill** | Prove true competence (highest value) | "Under PAR" — beat scenario benchmark; "Perfect Execution" — no villain escapes; "Strategist" — top X% performance | Competence + respect | Rare |
| **Progression** | Show "I am improving" (momentum) | First sub-PAR run; 5 scenarios under PAR; personal best streak | Self-respect via visible growth | Frequent |
| **Recognition** | Let others see achievement (social) | Weekly Top 10; tournament finalist; "Community Champion" | Status + social standing | Limited |
| **Challenge** | Create aspirational goals | "No Escapes"; "All Bystanders Saved"; scenario-specific achievements | Aspiration + engagement | Moderate |
| **Legacy** | Build long-term identity (lock-in) | Veteran of 50 scenarios; year-end top performer; "Founding Competitor" | Permanent investment + loyalty | Rare |

**System design rules (non-negotiable):**

1. **Badges must represent real achievement.** Every badge is tied to
   replay data, verified scoring, and deterministic outcomes. Without
   this, badges are meaningless noise. (Enforced by §19a + §24.)
2. **Badges must be public and visible.** Show badges on profile cards,
   leaderboards, and match lobbies. Private badges are a wasted system.
3. **Use tiered progression.** Strategist I → Strategist II →
   Strategist III. Tiering shows progression and triggers collector
   psychology.
4. **Balance rare vs. frequent.** Frequent badges (progression) drive
   retention. Rare badges (skill, legacy) drive prestige. Both are
   needed.
5. **No participation badges.** Never reward just "playing a game" or
   inflate badge counts artificially. This destroys the esteem layer.

**Badge metadata model (aligned with the engine):**

```
Badge:
  id:         string
  name:       string
  category:   skill | progression | recognition | challenge | legacy
  criteria:   replay-derived rule
  visibility: public | profile | leaderboard
  rarity:     common | rare | elite
  proof:      replay_id (link to verifiable replay)
```

**The L2 → L4 dependency applies directly to badges.** Because Level 2
(Trust & Fairness) is rigorously enforced, every badge in this system
carries real weight. "Under PAR" means the player genuinely beat the
scenario benchmark in a verifiable game. "Tournament Finalist" means
they placed in a replay-verified bracket. This is the difference
between a badge system that functions as a participation ribbon and one
that functions as proof of skill.

**Badges also bridge upward into Level 5 (Mastery).** They give players
feedback loops that define what "better" means, create long-term goals,
and make the pursuit of excellence visible. Without recognition, mastery
has no visible structure.

**Homepage copy opportunity:**

Do not position recognition as "climb the leaderboard" — that's generic
and overused. Position it as **recognition you can trust**:

> Your rank reflects how well you play — not how much you grind.

> Every score is replay-verified.

> If you earn it here, it's real.

**Homepage section mapping:** Product, Results

---

#### Level 5 — Mastery & Meaning (Self-Actualization Equivalent)

**What the player asks:** "Is this worth mastering?"

The top of the pyramid. The player seeks deep strategy, long-term
growth, and the experience of becoming someone better through play.
This is where identity transformation lives.

| Player Need | How LA Meets It | Problems Addressed |
|-------------|-----------------|-------------------|
| Deep strategy | Deck-building + scenario variety + expansion depth (§10) | #16 (expansion scaling) |
| Post-game growth | Replay analysis, step-by-step playback (§18-19) | #8 (post-game insight) |
| Exportable learning | Structured JSON export, external tool analysis | #8 (post-game insight) |
| True-to-tabletop | Exact rules fidelity, content authenticity (§1-2) | #11 (rules authenticity) |
| Aspirational identity | Strategist, not grinder. Respected competitor. | #7, #9 |

**Met?** Yes. This is the long-term hook — the reason players stay.

**Homepage copy opportunity:**

> A training ground for mastery.

**Homepage section mapping:** Results, Identity Transformation

---

#### Pyramid Summary: What LA Meets and Where It Wins

| Level | Player Need | Met? | Communicated on Homepage? |
|-------|------------|------|--------------------------|
| 5. Mastery & Meaning | Deep strategy, growth, identity | Yes | No |
| 4. Recognition | Skill measurement, provable rank | Yes | No |
| 3. Community | Cooperative play, shared experience | Yes | No (footer only) |
| 2. Trust & Fairness | No pay-to-win, verifiable, deterministic | Yes | No |
| 1. Access & Performance | Instant play, no friction, recoverable | Yes | No |

**The product satisfies all five levels. The homepage communicates
none of them.**

Most games compete at levels 3-4 ("play with friends," "rank up").
Legendary Arena's deepest differentiator is **Level 2: Trust** — an
uncommon and defensible position. The pay-to-win villain lives at this
level, and it's the foundation everything else is built on.

#### How the Homepage Should Map to the Pyramid

Each homepage section should address the need level where it has the
most leverage:

| Homepage Section | Primary Need Level | Why |
|-----------------|-------------------|-----|
| **Hero** | 1 (Access) + 2 (Trust) | Answer "what is this" and "can I trust it" before anything else |
| **Problem** | 2 (Trust) | The villain lives here — anchor the emotional hook at the trust level |
| **Product** | 2 (Trust) + 4 (Recognition) | Pillars resolve the trust problem; scoring system promises recognition |
| **Plan** | 1 (Access) + 2 (Trust) | Process plan removes friction (L1); agreement plan removes fear (L2) |
| **Results** | 4 (Recognition) + 5 (Mastery) | Show what players become — provable skill, deep strategy, identity |
| **Proof** | 3 (Community) + 4 (Recognition) | Testimonials, metrics, and community signals prove belonging + status |

#### Messaging Priority Rule

The hierarchy is strict. Homepage copy should address lower levels
before higher ones. Lead with access and trust, then community, then
recognition, then mastery:

1. "Play instantly in your browser." (L1)
2. "Every game is verifiable. Nothing is hidden." (L2)
3. "Join players who believe skill should decide." (L3)
4. "Your rank reflects how well you play." (L4)
5. "A training ground for mastery." (L5)

If the homepage leads with Level 5 messaging ("become a master
strategist") before establishing Level 2 ("this game is fair"), the
higher-level promise has no foundation and won't land.

#### Copy Direction: Anchor to Internal Feelings

Maslow reinforces the SB7 principle that people buy based on internal
problems, not external ones. The strongest homepage copy addresses how
the player *feels*, not what the product *does*:

| Instead of (external/feature) | Say (internal/feeling) |
|------------------------------|----------------------|
| "Skill-first game" | "Finally, a card game you can trust" |
| "Deterministic engine" | "Nothing is hidden — you can prove it" |
| "PAR-based scoring" | "Your rank means something real" |
| "Content-as-data architecture" | "New content never breaks what you've learned" |
| "Replay verification" | "Every result is provable" |

#### The Problem (Villain + Three Levels)

StoryBrand Principle Two: *Companies tend to sell solutions to external
problems, but customers buy solutions to internal problems.*

Every good story needs a villain — a root cause the audience can point
to. The villain causes problems on three levels, and all three must be
addressed:

- **External problem:** The tangible, surface-level frustration (the
  bomb to disarm, the dragon to slay).
- **Internal problem:** How the external problem makes the hero *feel*
  — the self-doubt, frustration, or inadequacy. This is what actually
  drives the purchase.
- **Philosophical problem:** Why it's simply *wrong* that people have to
  deal with this. Uses "ought" and "should" language.

When all three levels are resolved in one shot, the customer experiences
the "climactic scene" — satisfaction and relief.

| Criterion | Target | Current State |
|-----------|--------|---------------|
| **The villain** | A single, clear antagonist the brand stands against. StoryBrand: the villain should be relatable, singular, real, and dastardly. For Legendary Arena, the villain is the pay-to-win model — the system that sells power instead of rewarding skill. | Not named. No antagonist identified anywhere on the homepage. |
| **External problem** | The tangible frustration the villain causes. "Card games lock the best cards behind paywalls and time-gates." | Not present. |
| **Internal problem** | How the external problem makes the customer feel. "It makes you feel like the game is rigged — like no amount of skill matters if someone else spent more." StoryBrand: this is the most important level because customers buy solutions to internal problems. | Not present. |
| **Philosophical problem** | Why it's simply wrong. "Games *should* be won by the smartest player, not the biggest spender." Uses ought/should language. | Not present. |
| **Empathy statement** | Copy that mirrors the customer's frustration — proving the guide understands the hero's world. StoryBrand: when customers see their problem articulated, they engage, get curious, and begin to trust. BMS: empathy earns attention. | Not present. |

### Problem Section (Homepage Copy)

**Headline**

> Tired of games where the biggest wallet wins — not the best player?

**Villain Statement**

> The pay-to-win model ruins competitive play.

**Three Levels**

- **External:** Top decks are locked behind money or grind.
- **Internal:** It feels like your skill doesn't matter.
- **Philosophical:** Games should reward thinking — not spending.

**Empathy**

> We've played those games too. It's frustrating.

### Problems Legendary Arena Solves (Full Catalog)

The 20 problems below are derived from the Vision & Direction document,
work packets, and engine architecture. They are written in customer-facing
language and organized under three dominant themes. Each problem maps to
one of the SB7 problem levels (external, internal, or philosophical) and
references the source specification.

These are the raw materials for homepage copy, ad campaigns, email
sequences, and social content. The homepage itself should surface 3-5
of the strongest; the rest live here as a library.

#### Theme 1: Fairness (The Villain: Pay-to-Win)

The anchoring villain. Everything in this theme ladders under the
core emotional driver: the system is rigged against players who
won't pay.

**1. Pay-to-win systems destroy fair competition.**
Winning is tied to spending money, not skill. The best cards, heroes,
and strategies are locked behind paywalls.
Solved by: Absolute fairness — no purchasable power. No mechanic,
score, RNG seed, or matchmaking consideration depends on account tier.
(Vision NG-1, NG-3)
SB7 level: External + Internal ("it feels rigged")

**2. Grind walls and time-gates replace actual gameplay.**
Players must grind endlessly, wait on energy timers, or log daily to
stay competitive. The game rewards hours logged, not decisions made.
Solved by: No timers, no energy systems, no artificial friction. Every
player has access to the same competitive surface from day one.
(Vision NG-4)
SB7 level: External + Internal ("I'm on a treadmill, not playing a game")

**3. Balance patches destroy the deck you spent weeks learning.**
A patch drops, your carefully-built strategy is invalidated overnight,
and you start over. The rules shift under your feet every cycle.
Solved by: Deterministic, stable ruleset. The system you learn today
is the system you face tomorrow. Rule changes follow explicit change
governance — no silent drift.
(Vision §14, WP-040)
SB7 level: External + Philosophical ("games should reward the investment
you made in learning them")

**4. Hidden modifiers and opaque mechanics erode trust.**
Players can't verify if outcomes are truly fair. Secret difficulty
adjustments, invisible handicaps, or manipulated RNG create suspicion
that the system is working against you.
Solved by: No hidden modifiers. All randomness is verifiably fair and
seeded for replay verification. The engine enforces rules with perfect
neutrality and never makes strategic decisions on behalf of players.
(Vision §3, WP-027)
SB7 level: Internal ("I don't trust the system") + Philosophical
("players deserve to know the rules are being followed")

**5. Leaderboards and ranks can be gamed or manipulated.**
Profiles, ranks, and achievements feel arbitrary because scores aren't
verified. Players worry that top spots are cheated or secretly adjusted.
Solved by: All leaderboard entries are replay-verified and immutable.
Every score is anchored to a cryptographic hash of the replay — tampering
is impossible.
(WP-053, WP-054, Vision §24)
SB7 level: External + Internal ("my rank doesn't mean anything if others
can cheat")

**6. Competition rewards repetition instead of mastery.**
Grinding the same scenario or farming volume gives an advantage over
players who play fewer, higher-quality sessions.
Solved by: Quality-based scoring and anti-farm rules. PAR-based scoring
rewards how well you play, not how often.
(Vision §25)
SB7 level: External + Philosophical ("skill should matter more than
volume")

#### Theme 2: Skill Measurement (The Promise: Provable Mastery)

Players want to know they're getting better — and they want proof
that their skill is real, not a function of luck or system
manipulation.

**7. Skill is hard to measure objectively.**
No reliable way to compare performance across games, scenarios, or
opponents. "Did I win because I'm good, or because the draw was lucky?"
Solved by: PAR-based scenario scoring with full transparency. Players
see raw score, PAR baseline, and final score. Every scoring component
(rounds survived, villains defeated, bystanders rescued) is visible.
(WP-048, Vision §20-24)
SB7 level: Internal ("I don't know if I'm actually good")

**8. Players lack meaningful post-game insight.**
The game ends and there's no structured way to review what went right
or wrong. No way to learn from mistakes or identify patterns.
Solved by: Replay logs with step-by-step playback. Structured JSON
export for external analysis. Every decision from start to end is
reviewable.
(Vision §18, §19, WP-027)
SB7 level: External + Internal ("I want to get better but I can't see
what to fix")

**9. Performance perception doesn't match reality.**
Players' feelings about their skill level may be wrong. No benchmark
exists for what "good" performance looks like on a given scenario.
Solved by: PAR provides a fixed benchmark per scenario. AI playtesting
generates simulated baseline win rates. Players can compare their
performance to published baselines and measure improvement over time.
(WP-036, WP-037, Vision §22)
SB7 level: Internal ("I think I'm better than I am — or worse")

**10. Game results can't be independently verified.**
When disputes arise — in tournaments, in leaderboards, in community
discussions — there's no way to prove what actually happened.
Solved by: Deterministic replay engine. Any game can be re-executed
from its seed and inputs to produce identical results. Replays are
first-class features, not afterthoughts.
(Vision §3, §18, WP-027)
SB7 level: External + Philosophical ("competitive integrity requires
proof, not trust")

#### Theme 3: Authenticity (The Standard: True to Tabletop)

Players who love the physical card game want a digital version that
respects the original — not a simplified, dumbed-down, or
reinterpreted adaptation.

**11. Digital adaptations alter the original game experience.**
Rules are simplified, misinterpreted, or changed for digital
convenience. Card interactions that work one way at the table work
differently on screen.
Solved by: Exact rules and content authenticity. Every timing window,
trigger interaction, and edge case matches the official game and errata.
No digital shortcuts.
(Vision §1, §2, WP-001)
SB7 level: External + Philosophical ("if it's called Legendary, it should
play like Legendary")

**12. Digital cards don't match their physical counterparts.**
Art is altered, names are changed, card text is rewritten, or gameplay
behavior diverges from what's printed on the physical card.
Solved by: Same card images, names, text, and semantics as physical
cards. Behavior derives from printed rules text and official errata.
(Vision §2, WP-001)
SB7 level: External + Internal ("this isn't the game I know")

**13. The system makes decisions players should make.**
Automated systems play cards, resolve triggers, or make tactical
choices on the player's behalf — removing the agency that makes the
game interesting.
Solved by: The system enforces rules and supports players but never
replaces player judgment with automation. Every decision point that
exists at the tabletop exists in the digital version.
(Vision §3, §4)
SB7 level: Internal ("the game is playing itself") + Philosophical
("players should make their own choices")

**14. Multiplayer cooperation doesn't work like it does at the table.**
Digital multiplayer changes how cooperation works — removing player
agency, adding AI decisions, or forcing simplified turn structures
that don't match the tabletop experience.
Solved by: Turn order, cooperation, and shared responsibility are
preserved exactly as tabletop. The system supports multiplayer rather
than replacing it with automation.
(Vision §4, WP-011, WP-012)
SB7 level: External + Internal ("this doesn't feel like playing with
my friends")

**15. Multiplayer sessions are fragile and unreliable.**
Disconnects, desyncs, and dropouts ruin cooperative games. Players
can't reliably rejoin a game in progress.
Solved by: Reliable synchronization, explicit reconnection semantics,
and late-joining support. A dropped connection doesn't mean a lost game.
(Vision §4, WP-012, WP-116)
SB7 level: External ("we lost 30 minutes of gameplay to a disconnect")

**16. New expansions break existing content.**
Adding new heroes, villains, or sets requires engine rewrites or
introduces bugs that break previously-working cards and interactions.
Solved by: Content-as-data architecture. New content is added as JSON
registry entries without touching engine code. The system scales from
dozens to hundreds of cards without rewrites.
(Vision §5, §10)
SB7 level: External + Philosophical ("expansions should add to the game,
not break it")

**17. Game history is lost after you finish playing.**
The session ends and you can never go back to it — never review it,
share it, or learn from it. Great moments vanish.
Solved by: Every game is automatically saved as a replayable, shareable
log. Replay library persists games for minimum 30 days on server, or
indefinitely via local export.
(WP-052, WP-103, Vision §18)
SB7 level: Internal ("I wish I could show someone that game")

**18. Spectating is a second-class experience.**
Watching someone else play shows different information, behaves
differently than actual play, or is simply unavailable.
Solved by: Live spectation and post-game viewing use the same replay
engine. Zero divergence from actual gameplay. Spectators see filtered
views (no hidden cards) but the same game.
(WP-029, Vision §18)
SB7 level: External + Internal ("I want to watch and learn, but I can't")

**19. Accessibility is an afterthought.**
No keyboard navigation, no screen-reader support, no color-blind
indicators. Players with disabilities are locked out of the experience.
Solved by: Full keyboard navigation, screen-reader support, high-contrast
modes, and color-blind friendly indicators. Accessibility enhancements
never alter rules or give advantage.
(Vision §17)
SB7 level: External + Philosophical ("every player deserves to play")

**20. Player identity and history are controlled by third parties.**
Your account, reputation, and competitive history are tied to a
third-party auth provider. If that provider changes policies or shuts
down, your identity goes with it.
Solved by: Player identity, reputation, and competitive history are
owned exclusively by Legendary Arena, keyed by stable internal account
IDs. Swapping auth providers loses no player data.
(Vision §3, §7a)
SB7 level: Internal ("I don't own my own gaming identity") +
Philosophical ("players should own their history")

#### Theme 4: Scalability (The Barrier: The Physical Game Doesn't Scale)

The umbrella villain for this theme: *the game you love becomes harder
to use the more you invest in it.* These problems hit players who are
deeply committed to the physical game — and feel the friction growing
with every expansion they buy.

**21. You can't access the full game — older sets are out of print.**
New players are locked out of older sets that are no longer available.
The "complete experience" depends on what you managed to buy, not what
exists. The game's depth becomes a function of supply, not interest.
Solved by: Every card, hero, and expansion is available digitally from
day one. Content-as-data architecture means nothing goes "out of print."
The full game is always accessible to every player.
(Vision §5, §10)
SB7 level: External + Internal ("I'm missing part of the game, and
it's not my fault") + Philosophical ("a game shouldn't disappear just
because products go out of print")

**22. The game takes over your space.**
Dozens of expansions mean shelves of boxes, playmats, tokens, and
binders. Playing the full game requires dedicating real physical space.
The more you invest, the more impractical it becomes — especially in
small apartments, dorms, or shared spaces.
Solved by: The entire game lives in your browser. No boxes, no storage,
no physical footprint. Every expansion, every card, zero shelf space.
SB7 level: External + Internal ("I love this game, but it's becoming
impractical")

**23. Taking the game anywhere is a chore.**
Want to play at a friend's house or a family gathering? Now you're
carrying boxes, organizing decks, and hoping nothing gets lost or
damaged. The friction kills spontaneous play — you don't play because
it's too much effort to set up.
Solved by: Play instantly in your browser, anywhere, on any device. No
cards to carry, no setup, no teardown. Spontaneous play is the default.
SB7 level: External + Internal ("this is too much effort just to play")

**24. There's no way to prove what actually happened in a physical game.**
Tracking results manually is slow, inconsistent, and error-prone. When
someone claims a high score or a perfect run, you just have to trust
them. Competition without verification isn't real competition.
Solved by: Every game is automatically recorded, replay-verified, and
publishable. Results are deterministic and independently verifiable.
No manual tracking, no trust required.
(Vision §3, §18, §24)
SB7 level: External + Internal ("does this even mean anything?") +
Philosophical ("competition without verification isn't real competition")

**25. Everything you learn disappears when the game ends.**
There's no shared system for strategies, results, or analysis. No place
to contribute knowledge. No way to build on others' discoveries. Every
insight stays locked in the player's head or scattered across forums
with no structure.
Solved by: Replay analysis, structured JSON export, PAR benchmarks, and
a public leaderboard create a shared knowledge layer. Players can
review their own games, compare against baselines, and learn from the
community's collective performance.
(Vision §18-19, §22, WP-149)
SB7 level: External + Internal ("I want to get better, but there's
nowhere to grow") + Philosophical ("mastery requires a system for
sharing knowledge")

**26. Complex card interactions force you to stop and look up rules.**
Schemes, Masterminds, and edge-case combos create constant rule
ambiguity. Players stop mid-turn to check FAQs, search Discord, or
debate interpretations. The cognitive load turns a strategy game into
a rules-lawyering exercise.
Solved by: The engine enforces every rule automatically — no lookups,
no ambiguity, no debates. Players make strategic decisions; the system
handles the rest. Complex interactions resolve instantly and correctly.
(Vision §3, §4)
SB7 level: External ("I have to stop playing to figure out the rules")
+ Internal ("I feel mentally exhausted when I just want a relaxing
game") + Philosophical ("a game shouldn't require constant rule lookup
just to play correctly")

**27. You can only play with others if you're in the same room.**
Coordinating schedules, locations, and physical setups limits how often
you actually play. Friends who love the game drift apart because getting
together is too hard. The game's social value is hostage to geography.
Solved by: Play with anyone, anywhere, anytime — real-time multiplayer
with reliable sync, reconnection, and late-joining support. No
scheduling logistics, no location constraints.
(Vision §4)
SB7 level: External ("I can't find anyone to play with") + Internal
("I feel disconnected from friends who love this game") + Philosophical
("a great game shouldn't be limited by physical proximity")

**28. Your cards wear out the more you play.**
Cards degrade over time — even with sleeves. Shuffling, handling, and
repeated play damage components. Players feel tension between using
their cards and preserving them, especially for rare or expensive sets.
The more you invest, the more fragile the investment becomes.
Solved by: Digital cards never degrade. Every card is pristine, every
time. No sleeves, no wear, no anxiety about handling your collection.
Play as much as you want — nothing wears out.
SB7 level: External ("my cards are getting damaged") + Internal ("I
feel tension using my own cards because I don't want to ruin them") +
Philosophical ("you shouldn't have to choose between using the game
and preserving it")

#### Strategic Summary

The 28 problems collapse into four dominant themes for homepage messaging:

| Theme | Villain | Core Emotion | Key Problems |
|-------|---------|-------------|--------------|
| **Fairness** | The pay-to-win model | "It's rigged" | 1, 2, 3, 4, 5, 6 |
| **Skill Measurement** | Opaque/unverifiable systems | "I can't prove I'm good" | 7, 8, 9, 10 |
| **Authenticity** | Unfaithful digital adaptations | "This isn't the real game" | 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 |
| **Scalability** | The physical game doesn't scale | "The more I invest, the harder it gets" | 21, 22, 23, 24, 25, 26, 27, 28 |

The strongest anchoring villain for the homepage is **the pay-to-win
system** — it's universally understood, emotionally resonant, and
immediately positions Legendary Arena as the alternative. The
scalability theme (#21-28) is a powerful secondary hook for players
who already love the physical game and feel the friction growing.

**Player Needs Pyramid coverage:**

| Problem | Pyramid Level |
|---------|--------------|
| #21 Access to content (out of print) | L1 (Access) |
| #22 Storage burden | L1 (Access) |
| #23 Transport friction | L1 (Access) |
| #24 No verification | L2 (Trust) |
| #25 Knowledge isolation | L3 → L5 (Community → Mastery) |
| #26 Complexity friction (rule lookup) | L2 (Trust) |
| #27 Multiplayer access (location constraint) | L1 (Access) + L3 (Community) |
| #28 Physical wear & tear (asset degradation) | L1 (Access) |

**Recommended homepage selection (3-5 problems to surface):**

- Problem 1 (pay-to-win) — the villain headline
- Problem 4 (hidden mechanics) — trust/transparency hook
- Problem 7 (skill measurement) — competitive identity hook
- Problem 11 (rules authenticity) — tabletop-fidelity hook
- Problem 21 (out-of-print access) — physical-game-player hook

**Tight marketing copy (scalability problems):**

> - You can't access the full game — older sets are out of print
> - The game takes over your space — shelves of boxes just to play
> - Taking it anywhere is a hassle — setup kills spontaneity
> - Results aren't verifiable — rankings don't mean anything
> - Everything you learn disappears — no shared knowledge or growth
> - Complex interactions force you to stop and look up rules mid-game
> - Playing with others requires being in the same room
> - Your cards wear out the more you use them

#### Physical Cards vs Digital Play — Truth Table

Positioning rule: do NOT position digital as "better" than tabletop.
Position it as: *"Everything you love about the game — without the
friction that stops you from playing."* This respects the hero's
current world (they already love the physical game), removes barriers
without replacing identity, and avoids triggering defensiveness — a
direct L2 (Trust) requirement.

| Dimension | Physical Cards (Tabletop) | Digital (Legendary Arena) |
|-----------|--------------------------|--------------------------|
| Tactile experience | ✅ Real cards, shuffling, physical presence | ❌ No tactile interaction |
| Social presence | ✅ Face-to-face interaction, shared table energy | ⚠️ Remote play (voice/video optional, but not physical) |
| Immersion / Ritual | ✅ Setup, handling cards, table presence creates ritual | ⚠️ Faster, but less ceremonial |
| Rules enforcement | ❌ Manual — requires knowledge, lookup, consensus | ✅ Automatic — enforced instantly and correctly |
| Complex interactions | ❌ Slows gameplay, requires interruption | ✅ Resolved instantly with no ambiguity |
| Ease of play (setup/teardown) | ❌ Time-consuming (setup, sorting, cleanup) | ✅ Instant start, no teardown |
| Accessibility / convenience | ❌ Requires physical location, space, materials | ✅ Play anywhere, any time |
| Multiplayer access | ❌ Limited to same room | ✅ Remote play with anyone |
| Card durability | ❌ Wear, damage, loss over time | ✅ No degradation |
| Cost scaling | ❌ Must purchase expansions, out-of-print issues | ✅ Full content accessible (no scarcity) |
| Verification / competitive integrity | ❌ No way to prove outcomes | ✅ Replay + deterministic verification |
| Learning / improvement | ❌ No structured review or analytics | ✅ Replay analysis + benchmarks |
| Game state tracking | ❌ Manual tracking (errors possible) | ✅ Precise, automatic tracking |
| Collection / ownership feeling | ✅ Physical ownership, collectible value | ⚠️ Digital ownership (functional, not physical) |
| Spontaneity | ❌ Requires planning/logistics | ✅ Immediate play |
| Mental load | ❌ Rules + tracking + memory burden | ✅ Focus on decisions only |

**What physical cards do better** (use explicitly for credibility):
- Tangible, tactile experience
- In-person social bonding
- Collectible ownership and pride
- Ritual and immersion of setup/play
- "Unplugged" experience (no screens)

**What digital solves** (tied to #21-28):
- No rule lookups → fluid gameplay (#26)
- No location constraint → play anytime (#27)
- No card wear → no loss from playing (#28)
- No setup → instant engagement (#22-23)
- Determinism → trust + verifiability (#24)
- Replay → learning + mastery (#25)

**Homepage-ready synthesis** (use AFTER the problem section to close
the gap):

> You love the physical game.
> The cards, the table, the experience — that's not the problem.
>
> The problem is everything that gets in the way of actually playing.
>
> - Stopping to look up rules
> - Waiting to get everyone in the same room
> - Watching your cards wear out over time
>
> Legendary Arena keeps the strategy — and removes the friction.

### Current State

The homepage skips the problem entirely. It opens with product-voice
("The arena awaits") and moves straight into feature pillars. There is
no villain, no named frustration at any of the three levels, and no
empathy statement. A first-time visitor has no reason to keep scrolling
because the page hasn't acknowledged anything they're feeling.

**Grade: F** — problem is not stated at any level.

---

## 2. What is the product?

### SB7 elements: Meets a Guide (authority) + Gives Them a Plan + Calls Them to Action

Once the visitor sees their problem on screen, the page earns the right
to present a solution. In StoryBrand terms, this is where the **guide**
steps in with **authority**, offers a **plan** that clears the path, and
**calls the hero to action**.

The BMS Hero section must answer three questions within seconds:
1. **What do you offer?** — Name the product in plain English.
2. **How will it improve the customer's life?** — State the benefit.
3. **What action should they take?** — A direct CTA button.

#### Section Ordering Rule

The product section must appear *after* the problem is established.
This ordering is non-negotiable. The pillars exist to resolve the
three levels of problem — if the problem hasn't been stated yet, the
pillars have nothing to resolve and the visitor has no context.

Correct sequence:
1. Problem established
2. Empathy earned
3. THEN introduce product + pillars

#### The Guide (Authority)

StoryBrand Principle Three: *Customers aren't looking for another hero;
they're looking for a guide.*

The guide has two qualities: empathy (covered in the problem section) and
**authority** — demonstrated competence that gives the hero confidence
the guide can actually help. Authority signals include testimonials,
statistics, awards, and logos. The guide is Yoda, not Luke.

**Trust = Empathy + Authority.** Both halves are required.

#### The Plan

StoryBrand Principle Four: *Customers trust a guide who has a plan.*

Even after empathy, authority, and a clear product, the customer won't
commit without a plan. The plan is a bridge — it removes confusion and
fear so the hero can take the next step. StoryBrand defines two types:

- **Process plan:** Step-by-step instructions that show the customer how
  to engage. A process plan alleviates *confusion*.
- **Agreement plan:** A list of promises that address the customer's
  fears about doing business with you. An agreement plan alleviates
  *fear*. Title the agreement plan to increase perceived value.

#### The Call to Action

StoryBrand Principle Five: *Customers do not take action unless they are
challenged to take action.*

Heroes never act on their own — they must be challenged. StoryBrand
defines two types of CTAs:

- **Direct CTA:** The "Buy Now" button — a clear, bold, repeated
  invitation to commit. Use direct verbs: "Play Now," "Start a Match,"
  "Join Free." Never "Learn More" or "Our Story."
- **Transitional CTA:** A lower-risk step for visitors who aren't ready
  to commit. Examples: "Download the rules," "Watch a 2-min demo,"
  "Join the Discord." Transitional CTAs stake a claim to territory,
  create reciprocity, and position the brand as a guide.

Both types must be present. The direct CTA should appear in three
locations minimum: the hero, the top-right nav, and repeated in each
section as the visitor scrolls.

### Product Section (Homepage Copy)

**Category + Benefit**

> A web-based deck-building game where skill decides every match.

**3 Pillars (Locked Messaging)**

Each pillar maps 1:1 to a problem level. This mapping is enforced —
if a pillar doesn't resolve a stated problem, it doesn't belong.

| Problem Level | Pillar | Copy |
|---------------|--------|------|
| External | **Skill decides** | Win based on decisions, not purchases. |
| Internal | **Mastery is earned** | Improve through strategy, not grind. |
| Philosophical | **The rules don't drift** | No balance changes that invalidate your skill. |

**Process Plan (Removes Confusion)**

> 1. Build your deck
> 2. Play the scenario
> 3. Earn your rank

**Agreement Plan (Removes Fear)**

> **The Fair Play Promise**
> - No pay-to-win
> - No artificial time-gates
> - No disruptive balance patches

### Current State

| Criterion | Required | Present? |
|-----------|----------|----------|
| Plain-English category label | Yes | No — buried in meta description, not visible |
| Benefit statement | Yes | No — pillars imply benefits but don't state one directly |
| Pillar-to-problem mapping | Yes | Partial — pillars exist but appear before problem context |
| Process plan | Yes | Partial — subhead reads as tagline, not a plan |
| Agreement plan | Yes | No |
| Visual proof (screenshot/video) | Yes | No |
| Direct CTA (repeated) | Yes | Partial — one placement, hero only |
| Transitional CTA | Yes | No |

**Grade: C+** — good differentiating copy exists but is poorly sequenced,
has no plan, no transitional CTA, no visual support, and only one CTA
placement.

---

## 3. What are the results?

### SB7 elements: Avoid Failure + Ends in a Success + Identity Transformation

The visitor now knows the problem and the product. The final question is:
what happens when real people use this product to solve this problem?
This section closes the loop with both the **stakes** (what happens if
the hero *doesn't* act) and the **success** (what life looks like when
they do).

#### Avoiding Failure (The Stakes)

StoryBrand Principle Six: *Every human being is trying to avoid a tragic
ending.*

A story lives and dies on the question: what's at stake? If nothing can
be gained or lost, nobody cares. The homepage must hint at what the
customer stands to lose by *not* engaging — the cost of staying with the
status quo.

StoryBrand caution: fear is salt in the recipe. A pinch is essential; too
much turns customers off. Moderate fear-rousing content is the most
effective at producing behavior change.

#### Ending in Success (The Vision)

StoryBrand Principle Seven: *Never assume people understand how your brand
can change their lives. Tell them.*

Everyone wants to be taken somewhere. The homepage must paint a specific,
concrete picture of what the customer's life looks like after engaging
the product. Vague visions don't work — they must be defined and
specific.

The success vision should resolve all three levels of problem:

- **External resolution:** The tangible outcome.
- **Internal resolution:** How the customer will *feel*.
- **Philosophical resolution:** Why the world is now more right.

#### Identity Transformation

StoryBrand also identifies a deeper motivation beneath every purchase:
the desire to become someone different. The homepage should define an
aspirational identity — who the customer *becomes* by engaging the brand.

### Results Section (Homepage Copy)

**Failure Stakes**

> Stay in pay-to-win systems, and your skill will never matter.

**Success Vision**

- **External:** Every match is decided by your choices.
- **Internal:** You feel the satisfaction of real competition.
- **Philosophical:** You're part of a fair system.

**Identity Transformation**

| From | To |
|------|----|
| Grinding for cards | Competing with strategy |
| Frustrated player | Respected competitor |
| "The game is rigged" | "The game is fair" |

**Required Proof Elements**

These are mandatory — without them, the results section is an empty
promise:

- 2-3 player testimonials showing transformation (who they were
  before, who they are now)
- Player count OR engagement metric (sessions played, tournaments
  completed)
- Discord member count OR active tournament participation

### Current State

| Criterion | Required | Present? |
|-----------|----------|----------|
| Failure stakes | Yes | No |
| Success vision (external) | Yes | No |
| Success vision (internal) | Yes | No |
| Success vision (philosophical) | Yes | No |
| Identity transformation | Yes | No |
| Player testimonials | Yes | No |
| Traction metrics | Yes | No |
| Community signal | Yes | No (footer only) |
| Credibility markers | Yes | No |

The homepage provides zero evidence that anyone has used the product and
gotten a result. There are no testimonials, no player counts, no
community metrics, no failure stakes, no success vision, and no identity
transformation narrative. The visitor is asked to "Play now" on faith
alone.

The tournament section and featured products section are good engagement
hooks for returning visitors, but they don't function as results evidence
for someone who has never played.

By StoryBrand standards, the trust equation is broken on both sides —
empathy (problem) is an F and authority (results) is an F.

**Grade: F** — no stakes, no results, no proof, no transformation.

---

## Recommended Homepage Flow

The homepage sections should follow the three questions in order.
Everything on the page serves one of these three jobs. CTAs repeat
throughout per StoryBrand's placement strategy.

StoryBrand website rules applied throughout:
- **Above the fold:** Offer + benefit + CTA. Must pass the grunt test.
- **CTA buttons:** Different color from everything else on the page.
  Top-right nav + hero center + repeated per section.
- **Images:** Show happy people who have engaged the brand, not just
  product shots.
- **Copy:** Write it in Morse code. Brief, punchy, relevant. No
  paragraphs above the fold.

| # | Section | SB7 Element | Question | Status |
|---|---------|-------------|----------|--------|
| 1 | **Hero: category + benefit + CTA** | Character + grunt test | Product (above fold) | Needs rewrite |
| 2 | **Pain headline + three levels** | Problem (villain + external, internal, philosophical) | Problem | Needs creation |
| 3 | **Empathy statement** | Guide (empathy) | Problem | Needs creation |
| 4 | **CTA (first repeat)** | Call to Action (direct) | — | Needs creation |
| 5 | **Product label + pillars** | Guide (authority) — resolves the three levels | Product | Exists, needs repositioning |
| 6 | **Process plan (3 steps)** | The Plan (process) | Product | Needs creation |
| 7 | **Agreement plan** | The Plan (agreement) — "The Fair Play Promise" | Product | Needs creation |
| 8 | **CTA (second repeat)** | Call to Action (direct + transitional) | — | Needs creation |
| 9 | **Failure stakes** | Avoid Failure — a pinch of what's at stake | Results | Needs creation |
| 10 | **Success vision** | Ends in Success — external, internal, philosophical resolution | Results | Needs creation |
| 11 | **Identity transformation** | Transformation — from/to | Results | Needs creation |
| 12 | **Testimonials / player quotes** | Guide (authority) — testimonials | Results | Needs creation |
| 13 | **Traction metrics** | Guide (authority) — statistics | Results | Needs creation |
| 14 | **CTA (third repeat)** | Call to Action (direct) | — | Needs creation |
| 15 | **Upcoming tournaments** | Ends in Success — active community | Results | Exists |
| 16 | **Featured products** | Ends in Success — ecosystem depth | Results | Exists |
| 17 | **Lead generator / email capture** | Call to Action (transitional) | Results | Exists in footer, needs promotion to body |
| 18 | **Community links** | Guide (authority) — social proof | Results | Exists in footer, needs promotion to body |

---

## Scoring Summary

| Question | SB7 Elements | Answered? | Grade |
|----------|-------------|-----------|-------|
| **What is the problem?** | Character, Problem (villain + 3 levels), Guide (empathy) | Not stated at any level | F |
| **What is the product?** | Guide (authority), Plan (process + agreement), Call to Action (direct + transitional) | Partially — good pillars, poor sequencing, no plan, single CTA, no visuals | C+ |
| **What are the results?** | Avoid Failure, Ends in Success (3 resolutions), Identity Transformation | Not stated | F |

**Overall:** The homepage has strong product-differentiation copy (the
three pillars map perfectly to StoryBrand's three levels of problem
resolution) and solid infrastructure (tournaments, products, newsletter).
What it's missing is the full story arc: the hero's desire and problem
that earn attention up front, the plan and repeated CTAs that reduce
friction in the middle, and the failure stakes + success vision +
identity transformation that close the sale at the end. The customer
should be the hero of the story — right now, the homepage talks about the
product as though the product is the hero.

---

## Homepage Readiness Checklist (SB7 + Enforcement)

**Rule:** If any item is unchecked, the homepage is a **FAIL — do not
ship.**

---

### 1. Hero Section (Grunt Test — Blocker)

Must pass within 5 seconds, no scrolling.

- [ ] Category is explicitly stated (e.g., "web-based deck-building game")
- [ ] Primary benefit is clearly stated
- [ ] Headline is customer-focused (not brand-focused)
- [ ] Subhead reflects customer pain or desired outcome
- [ ] Direct CTA present (e.g., "Play Free")
- [ ] CTA uses a strong verb (no "Learn More")
- [ ] Visual supports clarity (product or outcome, not decorative)

**Grunt Test Validation**

- [ ] Visitor can answer "What is this?" immediately
- [ ] Visitor can answer "How does it help me?"
- [ ] Visitor can answer "What do I do next?"

If any answer requires interpretation or scrolling, the hero fails.

---

### 2. Problem Section (Customer Hook)

**Desire + Story Gap**

- [ ] A single customer desire is clearly defined
- [ ] Desire is stated in customer language (not brand terms)
- [ ] A visible "story gap" is created (makes user want to continue)

**Villain**

- [ ] A single, clear villain is explicitly stated
- [ ] Villain is external (not vague internal phrasing)
- [ ] Villain is understandable in under 2 seconds

**Problem — All Three Levels Present**

- [ ] External problem (tangible issue)
- [ ] Internal problem (emotional frustration)
- [ ] Philosophical problem ("this shouldn't be this way")

**Empathy**

- [ ] Empathy statement present
- [ ] Uses "we understand" positioning
- [ ] Reflects real customer frustration (not generic)

---

### 3. Product Section (Clarity + Solution)

**Category + Benefit**

- [ ] Product category is visible above the fold or immediately after problem
- [ ] Benefit is explicit and tied to resolving the problem
- [ ] Copy passes the "fast comprehension" test

**Differentiation (3 Pillars)**

- [ ] Exactly 3 pillars (no more, no less)
- [ ] Each pillar is benefit-first (not feature-first)
- [ ] Each pillar maps to a problem level:

| Problem Level | Pillar | Mapped? |
|---------------|--------|---------|
| External | Skill decides | [ ] |
| Internal | Mastery is earned | [ ] |
| Philosophical | The rules don't drift | [ ] |

- [ ] Pillars are placed AFTER the problem section

**Visual Proof**

- [ ] Screenshot, demo, or product visualization present
- [ ] Visual shows actual use or outcome (not abstract art)

---

### 4. Plan Section (Simplicity + Trust)

**Process Plan**

- [ ] Exactly 3 steps
- [ ] Steps are simple, sequential, and clear
- [ ] Removes confusion about "what do I do next"

**Agreement Plan**

- [ ] Named plan (e.g., "The Fair Play Promise")
- [ ] At least 3 commitments listed
- [ ] Addresses customer fears (risk, fairness, effort)
- [ ] Commitments are specific (no vague promises)

---

### 5. CTA System (Enforced)

**Direct CTA Placements**

- [ ] CTA in top-right navigation (persistent)
- [ ] CTA in hero section
- [ ] CTA repeated after product section
- [ ] CTA repeated near bottom of page

Minimum: **4 placements.**

**CTA Quality**

- [ ] Uses direct action verbs (Play, Start, Join, Get)
- [ ] Visually distinct color (contrasts with all other UI)
- [ ] Not diluted by too many competing buttons

**Transitional CTA**

- [ ] At least one low-commitment option present (e.g., Watch gameplay /
  Learn rules / View demo)
- [ ] Positioned after problem or product section

---

### 6. Results Section (Closing the Sale)

**Failure Stakes**

- [ ] Clearly defined "what happens if you don't act"
- [ ] Uses moderate tension (not fear-heavy)
- [ ] Reinforces the villain's impact

**Success Vision — All Three Required**

- [ ] External outcome (what changes)
- [ ] Internal outcome (how they feel)
- [ ] Philosophical outcome (why this matters)

**Identity Transformation**

- [ ] "From / To" transformation present
- [ ] Clear aspirational identity defined

---

### 7. Proof and Authority (Trust System)

**Testimonials**

- [ ] At least 2 testimonials
- [ ] Show before/after transformation
- [ ] Specific and real (not generic praise)

**Metrics / Credibility**

- [ ] At least one measurable signal (players, matches, or community
  size) OR alternative credibility (logos, press, recognition)

**Community Signals**

- [ ] Discord or community presence visible on homepage body
- [ ] Evidence of activity (not just a link)

---

### 8. Structure and Flow (Final Validation)

- [ ] Homepage follows the required sequence:
  Hero → Problem → Empathy → Product → Plan → CTA → Results → Proof → CTA
- [ ] No major section is missing
- [ ] No section appears out of order
- [ ] Information builds logically (no premature product pitch)

---

### 9. Content Quality (Scan Test)

- [ ] No paragraphs above the fold
- [ ] Copy is scannable (short lines, bullets)
- [ ] Headlines carry most of the meaning
- [ ] No jargon or internal language
- [ ] Every section answers a customer question

---

### GO / NO-GO Rule

**PASS conditions** — all must be true:

- All 9 checklist sections have every box checked
- Grunt test passes (section 1)
- CTA system fully implemented (section 5)
- All three problem levels present (section 2)
- All three success vision levels present (section 6)

---

### Critical Fail Conditions (Do Not Ship)

If **any** of the following are true, the homepage is not ready. Each
condition names the failure, the test, and the consequence of shipping
with it unresolved.

**1. Hero Clarity Failure (Grunt Test)**

Visitor cannot instantly answer: What is this? How does it help me?
What do I do next? Category or benefit is missing. CTA is absent or
uses weak language (e.g., "Learn More").

Impact: User bounces immediately.

**2. No Defined Problem**

No clear villain. Missing any of the 3 problem levels (external,
internal, philosophical). No empathy statement. The internal problem
is the most critical — customers buy solutions to internal problems.

Impact: No emotional connection, no engagement.

**3. Product-First Instead of Problem-First**

Product or pillars appear before the problem is established.
Messaging assumes context the visitor hasn't been given.

Impact: Differentiation doesn't land — pillars resolve a problem
the visitor doesn't know they have.

**4. Missing Plan**

No 3-step process plan. No agreement/promise plan to reduce fear.

Impact: User hesitates at the moment of commitment and does not act.

**5. Broken CTA System**

Fewer than 4 direct CTA placements. No CTA in navigation. No
transitional CTA for visitors who aren't ready to commit.

Impact: Even interested users don't convert — there is no clear
path to action at the moment they're ready.

**6. No Proof / No Authority**

No testimonials. No metrics or credibility signals. No visible
community activity on the homepage body.

Impact: Requires blind trust. Users won't commit to a product
nobody else has visibly used.

**7. No Results or Transformation**

No failure stakes (why act now). No success vision (what life looks
like after). No identity transformation (from/to).

Impact: No motivation to care or continue. The story has no ending,
so the visitor writes their own — and it's "I'll check back later."

**8. Weak or Misaligned Pillars**

More than or fewer than 3 pillars. Not mapped 1:1 to the 3 problem
levels. Feature-focused instead of benefit-focused.

Impact: Differentiation collapses — the pillars become a feature
list instead of a resolution to the hero's story.

**9. No Visual Product Proof**

No screenshot, gameplay video, or demo. Only abstract or decorative
visuals.

Impact: The visitor cannot validate the product is real. The page
reads as vaporware.

**10. Structural Flow Breakdown**

Homepage does not follow the required sequence:

    Hero → Problem → Product → Plan → Results → Proof → CTA

Sections are missing, reordered, or the page pitches the product
before earning the right to.

Impact: The story arc breaks. Each section depends on the one before
it — skipping or reordering any step means the visitor lacks the
context to process what comes next.

---

## Sales Conversion Audit

A conversion-layer overlay on the SB7 readiness checklist above. The
readiness checklist confirms the *story elements* are present; this audit
confirms the page actually *moves a visitor from problem recognition to a
decision*. A page passes only if every box is checked.

### 1. Outcome, Not Product

- [ ] The page sells the desired outcome before explaining the product
- [ ] The hero communicates transformation, not internal features
- [ ] Feature language is translated into customer-feeling language

### 2. Reality Gap

- [ ] Current reality is clearly stated
- [ ] Desired future reality is clearly stated
- [ ] Legendary Arena is positioned as the bridge between them

### 3. Diagnosis Before Prescription

- [ ] Pain is diagnosed before product features are introduced
- [ ] The villain (pay-to-win) is named
- [ ] External, internal, and philosophical pain are all present

### 4. Objection Prevention

- [ ] Pay-to-win objection answered
- [ ] Install / friction objection answered
- [ ] Trust / proof objection answered
- [ ] Complexity / learning-curve objection answered
- [ ] "Is anyone else playing?" objection answered

### 5. Direct Ask

- [ ] Every major section has a next action
- [ ] CTAs use strong verbs (no "Learn More" / "Explore" / "Check it out")
- [ ] The page asks the visitor to make a clear decision

### 6. Follow-Up Path

- [ ] Email capture is present in the body (not only the footer)
- [ ] The lead magnet is specific and valuable
- [ ] A transitional path exists for visitors not ready to play (Watch gameplay)

Source: conversion principles cross-checked against the build spec
([homepage-spec.md](homepage-spec.md)) and strategy reference
([homepage-appendix.md](homepage-appendix.md) — Reality Gap model,
Objection Library).
