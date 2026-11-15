# WP-256 — Homepage story arc: problem, plan, promise, results, objections

Build the homepage sections `docs/marketing/homepage-spec.md` marks as
"Needs creation", in the spec's order, from its reference copy, using only
claims the product can back today.

**Why:** requested directly (Jeff, 2026-11-15), the follow-on to WP-254. With
the hero passing the grunt test, the page still went hero → pillars → story.
The spec's GO/NO-GO rule lists a missing problem section as a BLOCKER and a
missing plan, objection handling, and results as MAJOR.

This file is the self-contained record. There is no separate ROADMAP entry
(same precedent as WP-251 / WP-253 / WP-254 / WP-255).

## What changed in this repo

| Path | Change |
|---|---|
| `content/_index.md` | New front-matter blocks: `problem`, `pillarsHeading`, `plan` (steps, `promise`, `secondary`), `results`, `objections` (with `newsletter`), `closing`. The hero and the three locked pillars are unchanged. |
| `layouts/index.html` | Renders the blocks in the spec's order: hero → problem → pillars → plan + Fair Play Promise → CTA → results → objections + newsletter → story → closing CTA → tournaments → gear. Each block renders only when its key is set. The story's "Read the story" is now a text link, not a red button. |
| `assets/css/extended/custom.css` | New §5.6a for the arc. Tokens only. |

## Where the copy departs from the spec's reference copy, and why

| Spec reference copy | Shipped | Reason |
|---|---|---|
| Problem headline "Tired of games where the biggest wallet wins…?" | "Most card games sell the edge." | `strategy.md` §2 bans questions as primary headlines. |
| "Questions before you play?" | "Before you play" | Same rule. |
| "The pay-to-win model…" | "paywalls and timers", "sell the edge" | `brand-asset-generation.md` kill-list names "pay-to-win" and "grind" as banned vocabulary in generated copy. |
| Plan step 3 "Earn your rank" | "Defeat the Mastermind." | The ranked boards don't accept entries yet (`cta-block.html`: runs don't post until PAR calibration publishes). "Defeat" is in the verb palette; "Mastermind" is canonical (`strategy.md` §3). Steps 1–2 come from the message bank. |
| Promise "No disruptive balance patches" | "The rules don't drift. The game you learn today is the game you face tomorrow." | The locked pillar and message-bank line, already approved. |
| "Every score links to a replay you can verify." | "…so any session can be replayed move for move." | The Hall of Legends links entries to player profiles, not replays. The engine is deterministic and has a replay producer and inspector, so replayability is backed; per-score replay links are not. |
| "Is it hard to learn? Watch one game first… Most learn it in 10 minutes." | "Start at the featured table…" + link to `/rules/` | No gameplay video exists, and the 10-minute figure has no source. The featured table is live on play.legendary-arena.com. |
| "Is anyone else playing? See the leaderboard, Discord, and live tournaments." | "It's early. The ranked boards… open when scoring calibration publishes. Get the patch notes to hear first." + newsletter form | There is no Discord, every tournament is dated in the past, and the board has two scores. The honest answer turns the objection into an email capture. |

## Not built (needs real inputs)

- **Proof (spec §7):** testimonials, a player or session count, and community
  activity. None exist yet, and `brand-asset-generation.md` refuses synthetic
  testimonials. Add the section when real ones do.
- **Transitional "Watch gameplay" CTA:** no video yet. "Read the rules" and
  the newsletter form are the transitional actions for now.

## DoD

- [ ] Home page renders problem, pillars (with heading), plan + promise + CTA,
      results, objections + newsletter, story, and closing CTA in that order.
- [ ] Direct "Play free" CTA in four places: header nav, hero, after the plan,
      and the closing section.
- [ ] Desktop and 375px phone: no horizontal scroll; light and dark mode read
      cleanly.
- [ ] Newsletter form posts with `source=home-objections`.
- [ ] Jeff approves the copy on the PR (`brand-asset-generation.md` § Humans
      keep final copy).
- [ ] Live on `main` via squash-merge PR; verified on the production build.
