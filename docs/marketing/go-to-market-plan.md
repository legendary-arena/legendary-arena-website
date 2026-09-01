# Go-to-Market Plan (Launch + 90-Day Execution)

**Site:** legendary-arena.com
**Framework:** StoryBrand SB7 (Donald Miller) + Player Needs Pyramid
**Companion:** [homepage-spec.md](homepage-spec.md), [homepage-appendix.md](homepage-appendix.md), [youtube-channel-plan.md](youtube-channel-plan.md), [video-production-workflow.md](video-production-workflow.md), [homepage-review-template.md](homepage-review-template.md), [video-commerce-plan.md](video-commerce-plan.md)
**Date:** 2026-06-16

---

The other marketing docs answer *what to build* (the homepage spec), *why*
(the appendix), and *how to produce content* (the channel plan and
production workflow). None of them answers **what happens first, in what
order, across which channels, and how we know it's working.** That is this
file's job: the launch and 90-day execution layer that turns the strategy
into a week-by-week operating plan.

---

## What this file owns (and what it doesn't)

**Owns:**

- The **launch sequence** — the gate that decides when promotion starts.
- The **90-day phased calendar** and the list-growth + traffic targets.
- The **cross-channel weekly operating rhythm** (production *plus*
  distribution, community, and email).
- The **multi-channel distribution playbook** beyond YouTube (blog/SEO,
  Discord, X, Reddit, partnerships, paid).
- The **launch scorecard** — the consolidated weekly read across channels.

**Does NOT own (link here, never duplicate):**

| Concern | Owner |
|---------|-------|
| Homepage build copy, hero spec, GO/NO-GO | [homepage-spec.md](homepage-spec.md) |
| Pyramid, 28-problem catalog, objection library, copy theory | [homepage-appendix.md](homepage-appendix.md) |
| Channel-internal strategy, series formats, the 8-week content calendar | [youtube-channel-plan.md](youtube-channel-plan.md) |
| Per-video production pipeline (Steps 0–10), file layout | [video-production-workflow.md](video-production-workflow.md) |
| Homepage audit instrument + current-state grade | [homepage-review-template.md](homepage-review-template.md) |
| Email funnel, subscriber-state model, nurture sequence | [WP-018](../ai/work-packets/WP-018-brevo-automation.md) + `docs/email-automation.md` |
| Email metric formulas, thresholds, per-send log | [WP-021](../ai/work-packets/WP-021-funnel-analytics-baseline.md) + `docs/email-metrics-log.md` |
| Site-build work packets, phases, enhancement requests | [WORK_INDEX.md](../ai/WORK_INDEX.md) |
| Selling the physical gear through in-video product tags (the commerce layer) | [video-commerce-plan.md](video-commerce-plan.md) |

If a section here starts to restate build copy or strategy theory, it has
drifted — cut it and link instead. This is the same anti-drift discipline
the review template enforces.

---

## Governing Sequence: Ship Before You Promote

The single most important decision in this plan is **ordering**, and it is
currently being violated by default.

The live homepage is graded **NO-GO** (see
[homepage-review-template.md § Current-State Audit](homepage-review-template.md#current-state-audit-last-recorded-2026-05-15)):
it fails the grunt test, states no problem, shows no proof, and runs a
single CTA. Driving paid or heavy organic traffic to a NO-GO homepage
spends attention on a leaky page — every dollar and every video view lands
on a page that can't convert it.

**Rule:** Asset *creation* starts now. Traffic *to the homepage* waits
until the homepage clears its own GO/NO-GO. These are different things and
they run on different clocks:

- **Runs from day one (builds the assets the homepage needs):** video
  production, Shorts, blog posts, Discord/X/Reddit presence. These
  generate the testimonials, traction metrics, and community signals the
  homepage Proof section is currently missing.
- **Gated behind homepage GO:** the "Play Free" funnel as the primary
  destination, the lead-magnet email capture as a headline offer, and any
  paid spend.

### Launch Readiness Gates

Promotion ramps in stages. Each gate unlocks the next class of activity.

| Gate | Condition | Owner / Source | Unlocks |
|------|-----------|----------------|---------|
| **G1 — Homepage ships** | All BLOCKER + MAJOR items in the [readiness checklist](homepage-spec.md#homepage-readiness-checklist-sb7--enforcement) resolved; grunt test passes; re-graded to GO | Site WPs (P0 in [WORK_INDEX](../ai/WORK_INDEX.md)) + [homepage-review-template.md](homepage-review-template.md) | Sending earned traffic to the homepage as the primary destination |
| **G2 — Lead magnet live** | Deck-Builder's Primer PDF exists *and* the `/get-started` capture page is live (does **not** exist today — ST-02 is "Ready," not done) | ST-02 quickstart + lead-magnet PDF | Headline email-capture offer on homepage + every video |
| **G3 — Analytics on** | Site-side analytics platform chosen and conversion tracking live; UTMs already flow (WP-020) | Analytics-platform WP (deferred per [WP-021](../ai/work-packets/WP-021-funnel-analytics-baseline.md)); Plausible is the leading candidate per [WP-025](../ai/work-packets/WP-025-search-demand-signal-instrumentation.md) | Measuring play-start and signup conversion, not just clicks |
| **G4 — Proof exists** | ≥2 anchor videos live (BtA #1 fairness, HtP #1 first game) + ≥3 Shorts published | [youtube-channel-plan.md](youtube-channel-plan.md) | Embedding real proof on the homepage; "Watch gameplay" has a destination |
| **G5 — Paid unlock** | G1–G4 all true *and* ≥3 videos each clearing CTR >5% and avg view duration >50% (the channel-plan [Metrics](youtube-channel-plan.md#metrics) targets) | This file § Paid | Small, tracked paid tests |

**Each gate is binary** — it is met or it is not; no partial credit. The
condition column *is* the pass/fail evidence, stated in countable terms
(re-graded to GO, page is live, tracking emits events, N videos published,
N videos over threshold). If a gate's status is arguable, treat it as
NO-GO.

G1–G3 are the critical path. Until they clear, the work is building
inventory and audience, not pouring traffic into a funnel that leaks.

---

## North-Star Funnel

This plan optimizes the acquisition funnel already defined in
[video-production-workflow.md § Funnel Movement Review](video-production-workflow.md#funnel-movement-review):

```
Visitor → Video viewer → Site visitor → Email subscriber
                                      ↘ First game started → First game completed → Returning player
```

Every channel and every weekly task maps to one transition in this chain.
Views, impressions, and follower counts are vanity numbers until they move
a person one step right. The **post-signup** email states (Pending →
Confirmed → Welcomed → Active) belong to [WP-018](../ai/work-packets/WP-018-brevo-automation.md)
and `docs/email-automation.md` — this plan's job is to get a person *to*
the site, into the list, and into a first game; the nurture pipeline takes
it from there.

---

## 90-Day Directional Targets

These are **directional targets — not forecasts, commitments, or launch
acceptance criteria — subject to baseline calibration after analytics
instrumentation is live (G3).** Setting them as hard acceptance criteria
before the funnel is instrumented would manufacture a brittle promise. Per
the channel plan's [Success Criteria](youtube-channel-plan.md#success-criteria),
trend direction matters more than absolute numbers at launch: miss the
number but hold the trend and the system is working.

| Outcome | 90-day directional target | Read against |
|---------|---------------|--------------|
| Email subscribers | 500–1,000 | Brevo contact list ([WP-021](../ai/work-packets/WP-021-funnel-analytics-baseline.md)) |
| Weekly play starts | 100–300 by end of period | UTM → first-game event (requires G3) |
| Long-form videos published | 8–12 | YouTube Studio |
| Shorts published | 30–50 | YouTube + TikTok + Reels |
| Companion blog posts | 1 per long-form video | legendary-arena.com |
| Discord members | First 100 (charter community) | Discord |

The email number is the one that compounds: it is the only audience asset
no platform can take away. Optimize toward signups-per-video, not just
views (see channel plan [Email funnel note](youtube-channel-plan.md#metrics)).

---

## Phased Milestones (3 × 4 Weeks)

The phasing follows the **Messaging Priority Rule** — establish Trust (L2)
and Access (L1) before Recognition (L4) and Mastery (L5). This extends the
channel plan's [8-week content calendar](youtube-channel-plan.md#content-calendar-first-8-weeks)
to a full 90 days; weeks 1–8 are that calendar, weeks 9–12 continue it.

### Weeks 1–4 — Foundation (Trust + Access)

**Theme:** Ship the page, prove the villain, open the list.

- **Clear G1** — homepage to spec (the gating dependency for everything
  downstream).
- **Clear G2** — build the Deck-Builder's Primer + `/get-started` page;
  gate it behind email on the homepage and in every video description.
- **Clear G3** — pick the analytics platform (Plausible candidate) and
  turn on conversion tracking.
- **Content:** BtA #1 (prove fairness / replay verification), HtP #1
  (first game in 10 minutes), + 1–2 more per the calendar. Heavy on the
  pay-to-win villain and browser-play access.
- **Stand up** Discord, X, and Reddit presence with UTM'd links.
- **Goal:** homepage live and GO; 100–200 signups; first Shorts testing
  hooks.

### Weeks 5–8 — Momentum (Tutorials + Community Signals)

**Theme:** Make the channel a real "Watch gameplay" destination; start
the proof flywheel.

- More HtP episodes + first solo "Across the Table."
- Embed the first videos in the homepage Proof/Results section (replaces
  placeholders — see channel plan [Relationship to Homepage](youtube-channel-plan.md#relationship-to-homepage)).
- Ramp Discord activity (weekly challenge), Reddit, and X.
- **Goal:** 300–500 total subscribers; consistent weekly play traffic;
  binge paths populated.

### Weeks 9–12 — Amplification (Double Down + Reach)

**Theme:** Find the winners, feed them, extend reach.

- First guest "Across the Table."
- Apply [Top Video Reinforcement](youtube-channel-plan.md#top-video-reinforcement-monthly):
  new Shorts + follow-ups on the top 20%.
- SEO follow-through on companion posts; partnership outreach to 5–10
  tabletop creators.
- **Clear G5** if criteria met — small paid test.
- **Goal:** 700–1,000+ subscribers; a repeatable weekly system.

---

## Cross-Channel Weekly Operating Rhythm

The channel plan already defines a one-video-per-week **production**
cadence in [Weekly Production Cadence](youtube-channel-plan.md#weekly-production-cadence).
This rhythm **layers the distribution, community, and email work on top of
it** — it does not replace it. Where this table and the channel plan name
the same day, the production task is the channel plan's; the lines below
add the go-to-market layer.

| Day | Production (channel plan) | + Distribution / Community / Email layer |
|-----|---------------------------|------------------------------------------|
| **Mon** | Pick topic; build/verify demo | Review last week's scorecard; pick problem from catalog (set pyramid level); draft blog outline |
| **Tue** | Finish build; write script | Collect assets for blog + video; refine lead-magnet copy if iterating |
| **Wed** | Record | Finalize companion blog draft |
| **Thu** | FFmpeg assembly + Premiere edit | Schedule long-form + Shorts (staggered); pinned comment + UTM'd description; publish blog |
| **Fri** | Upload + schedule; Short 1 | Share to X / Reddit / Discord; write 1–2 problem threads; send one **value** email to the list (a tip from the primer, a replay breakdown — not a sales push) |
| **Sat** | Shorts 2–3; cross-post TikTok/Reels | Discord challenge / replay-share prompt |
| **Sun** | Check metrics; research next | Fill the weekly scorecard; plan guest / partnership outreach |

**Realistic load:** ~20–30 hrs/week once the systems are running. Protect
creation time — batch where the workflow allows (see channel plan
[Roadmap v2 § Batch production](youtube-channel-plan.md#roadmap-v2)).
**Build first, record second** — if the demo isn't ready, slide the
recording, don't ship a rushed video that poisons the retention signal.

---

## Multi-Channel Distribution Playbook

YouTube is the engine, but it is not the whole vehicle. Each channel below
has a distinct role, a primary funnel transition, and a single rule that
keeps it from becoming spam. **All outbound links carry UTM parameters**
per the WP-020 convention so attribution is clean from day one.

### Blog / SEO (owned-channel authority)

- **Role:** Capture search demand the videos can't; build long-lived
  authority pages.
- **Funnel transition:** Visitor → Site visitor → Email subscriber.
- **Mechanics already owned:** the companion-post-per-video pipeline is
  [video-production-workflow.md Step 9](video-production-workflow.md#step-9-cross-reference-blog);
  SEO baseline + schema is WP-008; search-demand instrumentation is
  [WP-025](../ai/work-packets/WP-025-search-demand-signal-instrumentation.md).
- **What this plan adds — keyword targeting.** Write companion posts to
  rank for problem-shaped long-tail queries, not brand terms. Seed list:
  - "legendary deck builder no pay to win"
  - "digital card game replay verification"
  - "fair card game leaderboard"
  - "marvel champions style game online"
  - "is [card game] pay to win" (objection-shaped, high intent)
  Each post targets one primary + 3–5 secondary long-tails. Pull the angle
  from the [28-problem catalog](homepage-appendix.md#problems-legendary-arena-solves-full-catalog)
  and write in Mode C (Authority).
- **Rule:** One post per video, problem-first. Never publish a thin post
  just to have one — depth is what ranks.

### Discord (community hub)

- **Role:** Convert one-time players into a returning community; generate
  the activity that becomes homepage community-proof.
- **Funnel transition:** First game → Returning player.
- **Cadence:** daily 15–30 min presence; one weekly anchor event
  (challenge run or replay-share). Community Posts on YouTube unlock at 500
  subs (channel plan [Community Posts](youtube-channel-plan.md#community-posts)) —
  cross-promote between the two.
- **Rule:** It's a hub, not a megaphone. Show up to talk, not just to drop
  links. Use polls to harvest the audience's own villain language for
  future scripts.

### X / Twitter (problem-thread distribution)

- **Role:** Spread the villain framing; reach competitive-card-game
  audiences where the pay-to-win wound is rawest.
- **Funnel transition:** Visitor → Video viewer / Site visitor.
- **What to post:** problem threads built straight from the catalog — e.g.
  "Why most digital card games quietly break rules fidelity (and how to
  tell)." One problem per thread, internal-feeling language
  (see [Copy Direction](homepage-appendix.md#copy-direction-anchor-to-internal-feelings)).
- **Rule:** Lead with the problem, land the product as the resolution —
  never open product-first.

### Reddit (high-intent communities)

- **Role:** Reach players actively discussing the exact pain points.
- **Targets:** r/boardgames, r/marvelchampions, r/legendary, deck-builder
  and TCG subs.
- **Rule — this is the spam-sensitive one.** Reddit punishes
  self-promotion hard. Be a participant first: answer questions, share a
  genuinely useful replay or analysis, and let the link be incidental.
  Read each sub's self-promotion policy before posting. One bad launch
  thread can get the domain shadow-banned.

### Shorts / TikTok / Reels (discovery layer)

- **Role:** Top-of-funnel discovery — already fully specced.
- **Owner:** channel plan [Series 4 "Arena Clips"](youtube-channel-plan.md#series-4-arena-clips-shorts)
  + workflow [Step 8b Cross-Post Shorts](video-production-workflow.md#step-8b-cross-post-shorts).
- **This plan adds nothing** except the reminder that Shorts are the
  widest net and the cheapest test — keep the 3–7-per-video minimum.

### Partnerships (borrowed audiences)

- **Role:** Borrow trust and audience from established tabletop creators.
- **Funnel transition:** Visitor → Video viewer (their audience → ours).
- **Motion:** the "Across the Table" series is the vehicle (channel plan
  [Series 3](youtube-channel-plan.md#series-3-across-the-table-interview--gameplay)).
  This plan owns the **outreach cadence**: start warm (people you already
  know) in weeks 5–8, then work the priority list (active players →
  tabletop creators → reviewers → designers → competitive TCG players) in
  weeks 9+. Target 5–10 outreach touches in the amplification phase.
- **Rule:** Lead with value to *them* (exposure, a fun episode), not a
  pitch. Respect the guest's identity as a tabletop player — position
  digital as "everything you love, minus the friction," never as "better."

### Paid (gated — G5 only)

- **Role:** Amplify what already works; never to discover what works.
- **Precondition:** G1–G4 clear *and* 3–5 videos with healthy retention.
- **Approach:** small, tracked tests — YouTube in-feed or Reddit promoted
  posts targeting "Marvel Champions" / "deck builder" audiences, pointing
  at the strongest existing video or the (now-GO) homepage. Measure with
  the chosen analytics platform (G3); kill anything that doesn't beat
  organic cost-per-signup.
- **Rule:** No paid spend against a NO-GO homepage or an unproven creative.
  Paid multiplies the funnel you have — if the funnel leaks, paid leaks
  faster.

---

## Lead Magnet Launch

The **Deck-Builder's Primer** ("12 Cards Most Players Build Wrong — and Why
the Fair Game Changes Everything") is the email engine's hook. It is
referenced across the channel plan and workflow but is **not yet built**:
neither the PDF nor the `/get-started` capture page exists in this repo
today (verified — `content/` has no get-started/primer page; ST-02 is
"Ready," not done).

This is **Gate G2** and a week-1–4 deliverable:

1. Produce the primer PDF (drafting location:
   `C:\pcloud\LA\video-assets\lead-magnets\deckbuilding-primer-v1.pdf`, per
   the workflow file layout).
2. Build the `/get-started` capture page (ST-02) with the Brevo signup form
   (WP-015 pattern) and the matching UTM contract (WP-020).
3. Gate it behind email on the homepage body (not just the footer) and in
   every video description + pinned comment.

Theme-specific magnets (Phase 2, 20+ videos) are already planned in the
channel plan [Email Funnel Segmentation](youtube-channel-plan.md#email-funnel-segmentation-phase-2)
— don't build them now. One magnet, one link, clean UTM attribution first.

---

## Launch Scorecard (Weekly Read)

A single end-of-week read across channels. This **consolidates** existing
measurement; it does not invent a parallel system.

| Signal | Source | Owned by |
|--------|--------|----------|
| New email signups (by video slug) | Brevo + UTM `utm_campaign` | [WP-021](../ai/work-packets/WP-021-funnel-analytics-baseline.md) / `email-automation.md` |
| Email delivery / open / CTR / unsub | Brevo dashboard | `docs/email-metrics-log.md` (append-only) |
| Video CTR (>5%), avg view duration (>50%) | YouTube Studio | [channel plan Metrics](youtube-channel-plan.md#metrics) + workflow [Step 10](video-production-workflow.md#step-10-performance-review-24-72-hours-post-publish) |
| Shorts views + Shorts → long-form clicks | YouTube + UTM | channel plan |
| **Play starts / first-game conversion** | **Blocked on G3** (analytics platform) | analytics-platform WP |
| Homepage bounce / scroll | **Blocked on G3** | analytics-platform WP |
| Top referral source this week | Plausible (once G3) / per-platform UTM | this file |

**The honest gap:** until **G3** lands, "play starts" and "homepage
bounce" are not measurable site-side — UTMs are flowing (WP-020) but no
tool ingests them yet (see [WP-021 § Analytics platform constraint](../ai/work-packets/WP-021-funnel-analytics-baseline.md)).
Picking the platform (Plausible candidate) is therefore on the critical
path, not a nice-to-have. **Do not substitute Google Analytics unless a
later SPEC explicitly amends [WP-021](../ai/work-packets/WP-021-funnel-analytics-baseline.md)
/ [WP-025](../ai/work-packets/WP-025-search-demand-signal-instrumentation.md).**
GA is not this project's stack; casually adding it would create governance
drift and silently mutate the analytics decision those WPs own.

**Monthly:** run [Top Video Reinforcement](youtube-channel-plan.md#top-video-reinforcement-monthly)
— identify the top 20% and double down (follow-ups, fresh Shorts, A/B
title/thumbnail). Doubling down on winners is the highest-ROI move; this
plan just sets the calendar reminder.

---

## Next Immediate Actions

In dependency order — the first three are the critical path:

1. **Clear G1** — ship the homepage to spec; re-grade to GO
   ([homepage-review-template.md](homepage-review-template.md)).
2. **Clear G2** — build the Deck-Builder's Primer + `/get-started` page;
   gate behind email everywhere.
3. **Clear G3** — choose the analytics platform (Plausible) and turn on
   conversion tracking.
4. **Produce + publish** BtA #1 + HtP #1 (G4) and cut their Shorts.
5. **Stand up** Discord + X + Reddit with UTM'd links; begin the weekly
   cross-channel rhythm.

This positions Legendary Arena as the trustworthy, skill-first alternative
in a noisy market. Build the assets now, ship the homepage, then turn on
the traffic — in that order. Measure ruthlessly once G3 lands, and iterate
on the winners.
