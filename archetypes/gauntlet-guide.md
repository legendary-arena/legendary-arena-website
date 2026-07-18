---
title: "Gauntlet Guide: {{ replace .Name "-" " " | title }}"
date: {{ .Date }}
description: ""
draft: true
tags: ["gauntlet", "strategy"]
categories: ["gauntlet-guides"]
series: "Gauntlet Guides"
gauntlet_set: ""
gauntlet_mastermind: ""
gauntlet_board: ""
guide_version: "v1.0"
cta: "leaderboard"
---

<!--
================================================================================
GAUNTLET GUIDE TEMPLATE
================================================================================

Naming is permitted here: gauntlet editorial may name masterminds, schemes,
and sets, and may show card art (D-24191 + its 2026-07-18 amendment). Bulk
card TEXT is still not reproduced — a post that pastes rules text is a card
database, not editorial.

TITLE. Prefer an editorial title that names the spine, with the set and
mastermind after the colon — "The Fixed-Pool Problem: Magneto, Core Set".
The mechanical form "<Set> <Mastermind> Fixed-Pool Gauntlet Guide" is the
fallback when a post has no spine worth naming. Set/mastermind/division are
already machine-readable in front matter; the title does not have to carry
them.

GUIDE_VERSION. Bump the minor version on any strategic revision (pool
changes, new leg advice), the major version when the scoring model or
`scoringConfigVersion` changes what the guide claims. Cite it in the post
only if the post is being revised — a v1.0 banner on a first draft is noise.

RUN THIS FIRST. Do not hand-type anything it emits:

    node scripts/gauntlet-post-block.mjs <setAbbr> <mastermindSlug>
    # e.g. node scripts/gauntlet-post-block.mjs core magneto

(in the legendary-arena engine repo). It generates the hero image, identity
table, leg gallery, per-player-count setup table, and Fixed-Pool budgets —
all derived from the registry. Typed copies rot on the next set change; that
is not hypothetical, three different gauntlet counts were once live in the
wiki simultaneously.

--------------------------------------------------------------------------------
THE THREE BUCKETS — the rule that keeps these posts honest
--------------------------------------------------------------------------------

DERIVED — generate it, never type it:
  set, mastermind, scheme count, leg list, twist counts, Evil-Wins
  thresholds, escape budgets, per-count setup, Fixed-Pool budget,
  hero team/class coverage, card art URLs.

JUDGMENT — hand-written reasoning; label it as reasoning:
  key pressures per scheme, recommended approach, pool construction and why,
  pool strengths and weaknesses, alternates and their trigger conditions,
  priority order, common mistakes.

BLOCKED — DO NOT WRITE THESE. No competitive score exists yet:
  ✗ "Estimated competitive range: PAR -X to -Y"
  ✗ "Most strong clears land between..."
  ✗ Expected-results-by-skill-level tables
    (New Player / Experienced / Competitive / Elite → outcome)
  ✗ "Usually the score killer" / "typically" / clear rates
  ✗ Difficulty or Score-Risk ratings out of 10, or as star bars
  ✗ A "Final Verdict" scorecard of any kind
  ✗ Per-scheme "Difficulty: Easy/Medium/Hard" or "Score Risk: High" —
    these read as measured, and nothing measured them

  These require data from `legendary.competitive_scores`, which is EMPTY —
  PAR is deliberately unpublished until hero-effect coverage is faithful, so
  every submission fail-closes to `par_not_published`. Inventing these
  numbers puts fabricated authority on a public page. Leave the gap visible.
  When entries land, they get written from real data.

  What you CAN say per leg, because card text supports it: twist count, the
  Evil-Wins condition, whether a leg has a hard clock, whether escapes or
  Bystander loss is the live pressure. That is description, not a rating.

--------------------------------------------------------------------------------
FINDING THE SPINE
--------------------------------------------------------------------------------

The best guides have ONE organising insight, found by reading the actual card
text — not a checklist filled evenly. For Core Set Magneto it was: his Master
Strike demands an X-Men Hero, three of four tactics also key off X-Men, and
yet leg three demands a Tech Hero that no Core Set X-Men has. That conflict
IS the guide.

Look for it before writing:
  - Does the Mastermind's Strike check a team, class, or resource?
  - Do the tactics reinforce that check?
  - Does any leg demand something the Strike answer cannot provide?
  - Which legs impose a hard turn ceiling (Twist N = Evil Wins)?
  - Which legs invert a normal instinct (e.g. Bystanders that are Villains)?

If you cannot find a spine, the guide is probably a short one. That is fine.
A tight post with one true thing beats fifteen padded sections. Sections
marked OPTIONAL below are to be DELETED when they have nothing real to say —
an empty section is worse than a missing one.
================================================================================
-->

<!-- GENERATED: hero image from gauntlet-post-block.mjs -->

Open with the spine — the single fact that decides this gauntlet. Quote the
Master Strike if it is a team/class check. Two or three sentences, then say
what the guide is for. This doubles as the at-a-glance summary; do not also
write a separate "At a Glance" block that repeats it.

## The board

*The block below is generated from the live gauntlet catalog. If a set changes, it changes here too.*

<!-- GENERATED: identity table + Fixed-Pool budget table -->

State the substitution budget in words — it is the strategic content of the
division and readers skim tables.

## <The spine, named>

<!-- JUDGMENT -->
The Mastermind's checks, as a table if there are several (Strike + tactics).
Say plainly what carrying the answer is worth, and what it costs to skip.

## The trap

<!-- JUDGMENT, grounded in card text -->
Where the obvious answer to the spine fails. Show the conflict concretely —
a hero/class table beats an assertion. If there is no trap, delete this
section rather than inventing one.

## A pool that solves both

<!-- JUDGMENT -->
Concrete pools per player count, with per-hero reasoning. Requirements:
  - Name heroes, and say WHY each earns its slot
  - Cover both sides of the trap
  - Note that heroes are NOT restricted to the gauntlet's set — the gauntlet
    pins the mastermind and its schemes, nothing else
  - Explain the flex slots and when to spend them

**Alternates.** List each with the condition that calls it in, not a bare
name — "<Hero> — bring when the escape-heavy legs are the ones costing you
runs." An alternate with no trigger is a hedge, not advice.

**Where this pool is thin.** <!-- JUDGMENT --> Two or three honest
weaknesses, tied to legs. A pool with no stated weakness reads as marketing.
Say what beats it and what you would swap toward.

## What actually moves your score

<!-- DERIVED-ish: the formula and its invariants are code; the numbers are not -->
Final Score = Raw Score − PAR; negative is better. The formula, verified
against `packages/game-engine/src/scoring/parScoring.logic.ts`:

    RawScore = (rounds × roundCost)
             + sum(penaltyEvent × its weight)
             − (Bystanders rescued × bystanderReward)
             − (VP × victoryPointReward)

WHAT YOU MAY ASSERT — three invariants are hard-enforced by
`validateScoringConfig`; a scenario config violating any of them fails
validation, so these hold for every gauntlet that ever publishes:

  1. bystanderReward  >  villainEscaped weight
  2. bystanderLost weight  >  villainEscaped weight
  3. bystanderLost weight  >  bystanderReward

In words: rescuing a Bystander is always worth more than a Villain escape
costs, losing a Bystander is always worse than letting a Villain escape, and
losing one always outweighs the credit for saving one. That is a design
commitment in code, not editorial framing.

WHAT YOU MAY NOT ASSERT — **no invariant relates `victoryPointReward` to
`bystanderReward`.** The engine deliberately does not rank VP against
Bystanders; that is per-scenario config, and no scenario config has
published. So BOTH of these are unbacked and must not be written:

  ✗ "Maximise VP first, minimise turns second" (VP-forward ordering)
  ✗ "Bystanders matter more than VP" (the mirror claim)

State the three invariants, note that speed is one term among four rather
than *the* lever, and stop there.

TWO CAVEATS WORTH A SENTENCE WHEN RELEVANT:

  - `bystanderLost` — the heaviest weight in the model — has no engine
    producer today; `deriveScoringInputs` hardcodes it to 0 (D-4801
    safe-skip), as it does `schemeTwistNegative`,
    `mastermindTacticUntaken`, and `scenarioSpecificPenalty`. Only
    `villainEscaped` currently fires. So the penalty is specified and
    validated but not yet observable. Do not describe civilian casualties
    as something a run is currently scored on.
  - `bystanderCap` and `victoryPointCap` clamp their reward terms, so
    rescues or VP past a cap are worth zero. Per-scenario and unpublished —
    mention the mechanism, never a number.

Tie it to THIS gauntlet — does a tactic hand out Bystanders? Does a leg make
Bystanders into enemies? Do NOT state expected scores.

## Scheme by scheme

<!-- Repeat per leg. 3–5 real bullets each — not a fixed field list. -->

**N. <Scheme Name>**

<!-- GENERATED: card art -->

One line of real setup from the card: twist count, Evil-Wins condition,
special rules.

- What actually threatens you here
- What to prioritise, and why
- Any inverted instinct or hard clock
- Which pool member or alternate carries this leg, if one clearly does
- [Challenge this leg →](https://cards.legendary-arena.com/?schemeId=<set>%2F<scheme-slug>&mastermindId=<set>%2F<mastermind-slug>)

## The legs at a glance

<!-- OPTIONAL — worth it at 6+ legs, noise at 3. Delete otherwise. -->
<!-- DERIVED columns only, plus one JUDGMENT column. No Difficulty or
     Score-Risk ratings — see BLOCKED above. -->

| Leg | Twists | Evil Wins at | Live pressure | Who carries it |
|-----|--------|--------------|---------------|----------------|
|     |        |              | escapes / Bystanders / clock | hero from the pool |

## Player counts

<!-- OPTIONAL — only if the setup deltas actually change the plan. -->
<!-- Setup numbers are DERIVED from the generated per-count table; the
     strategic read is JUDGMENT. Do not claim which count scores better —
     that is a PAR question and PAR is unpublished. -->

What changes between solo, two, and three-plus for THIS gauntlet: more twists
per round, wider board, whether the spine answer has to be duplicated across
players.

## Common mistakes

<!-- JUDGMENT -->
Five or fewer, each tied to a specific leg or the spine. Generic advice
("play efficiently", "don't chase perfect hands") is filler — cut it. If a
mistake would apply verbatim to every gauntlet in the game, it does not
belong in this post.

## Every leg, one place

<!-- OPTIONAL but recommended — the whole point of the post is play. -->
Repeat the per-leg builder links as a flat list so a reader who has picked a
pool can start without scrolling back through the analysis.

## What this section will say later

<!-- REQUIRED — do not delete -->
State plainly that the guidance is derived from card text and the scoring
model, not from observed results, because no board has been claimed. Promise
that this section gets REPLACED with replay-verified data — hero frequencies
among ranked entries, pool compositions, per-leg score spreads — rather than
more opinion.

<!-- OPTIONAL, and only in guides where pool power is genuinely the story:
     the Fixed-Pool division will eventually need a brake on a handful of
     dominant heroes, and the scoring system carries `scoringConfigVersion`
     so baselines can move without breaking historical comparability.
     Candidate levers: raw-score adjustment on high-power pools, ParBaseline
     scaling, tiered curves, periodic recalibration. Say it as a design
     intent, NOT as an announced plan or a dated commitment, and do not
     repeat it in every guide — it is boilerplate the second time. -->

> **One honest caveat before you start.** The gauntlet boards are not
> accepting entries yet. Competitive scoring is gated on **PAR calibration**
> — the per-scenario baseline every score is measured against — and PAR is
> deliberately unpublished until the engine implements each scenario's card
> abilities faithfully. Publishing baselines against a partly-implemented
> engine would bake wrong numbers into permanently version-pinned scores, so
> the gate stays closed on purpose.
>
> Practically: you can play these matches today, but a finished run will not
> yet post to the board. When calibration publishes, the boards open.

<!-- DELETE the caveat above once PAR publishes and boards accept entries. -->

**[View the <Mastermind> gauntlet →](https://legends.legendary-arena.com/#/gauntlet/<board-name>)**
