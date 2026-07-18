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

NOTE ON `cta: "leaderboard"` — that value is introduced by WP-037
(legendary-arena-website#71). Until that merges, `cta-block.html` accepts only
play / newsletter / tournament and SILENTLY falls back to "play" for anything
else. So a post using this archetype before #71 lands will render the generic
play CTA. That is harmless, not broken — but if you expected a board-linked
button and got "Ready to play?", this is why.

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
  priority order, common mistakes.

BLOCKED — DO NOT WRITE THESE. No competitive score exists yet:
  ✗ "Estimated competitive range: PAR -X to -Y"
  ✗ "Most strong clears land between..."
  ✗ Expected-results-by-skill-level tables
  ✗ "Usually the score killer" / "typically" / clear rates
  ✗ Difficulty or Score-Risk ratings out of 10

  These require data from `legendary.competitive_scores`, which is EMPTY —
  PAR is deliberately unpublished until hero-effect coverage is faithful, so
  every submission fail-closes to `par_not_published`. Inventing these
  numbers puts fabricated authority on a public page. Leave the gap visible.
  When entries land, they get written from real data.

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
A tight post with one true thing beats fifteen padded sections.
================================================================================
-->

<!-- GENERATED: hero image from gauntlet-post-block.mjs -->

Open with the spine — the single fact that decides this gauntlet. Quote the
Master Strike if it is a team/class check. Two or three sentences, then say
what the guide is for.

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

## What actually moves your score

<!-- DERIVED-ish: the model is documented, the numbers are not -->
Final Score = Raw Score − PAR; negative is better. Raw Score is driven by
efficiency (rounds), VP, Bystanders rescued, and failures (escapes,
casualties). The moral hierarchy is explicit: rescuing Bystanders beats
preventing escapes, and losing Bystanders is worst.

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
- [Challenge this leg →](https://cards.legendary-arena.com/?schemeId=<set>%2F<scheme-slug>&mastermindId=<set>%2F<mastermind-slug>)

## Common mistakes

<!-- JUDGMENT -->
Five or fewer, each tied to a specific leg or the spine. Generic advice
("play efficiently") is filler — cut it.

## What this section will say later

<!-- REQUIRED — do not delete -->
State plainly that the guidance is derived from card text and the scoring
model, not from observed results, because no board has been claimed. Promise
that this section gets REPLACED with replay-verified data — hero frequencies
among ranked entries, pool compositions, per-leg score spreads — rather than
more opinion.

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
