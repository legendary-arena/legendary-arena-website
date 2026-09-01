# Video Commerce Plan (Selling the Gear Through Video)

**Site:** legendary-arena.com
**Framework:** StoryBrand SB7 (Donald Miller) + Player Needs Pyramid
**Companion:** [youtube-channel-plan.md](youtube-channel-plan.md), [go-to-market-plan.md](go-to-market-plan.md), [video-production-workflow.md](video-production-workflow.md), [homepage-spec.md](homepage-spec.md)
**Date:** 2026-09-01

---

The channel plan answers *what content to make*. The go-to-market plan answers
*what happens first, across which channels, and how we measure it*. Neither
answers **how the videos sell the physical gear directly** — the checkout that
happens inside the video, not after a separate trip to the store. That is this
file's job: the **commerce layer** of the video program.

The strategic input is the shift documented in *How YouTube Is Quietly Becoming
An E-Commerce Platform* (My Wife Quit Podcast, 2026-08-18) — that YouTube (and
TikTok/Reels alongside it) is no longer only an awareness surface. Product tags,
shopping shelves, and in-video checkout let a small, loyal audience buy without
leaving the video. Legendary Arena is unusually well-positioned for it because
the two prerequisites already exist: **first-party physical gear** (three real
SKUs, Snipcart checkout) and a **mastery-native content format** (proving
expertise, then selling the product that extends it).

---

## What this file owns (and what it doesn't)

**Owns:**

- The **"gear purchase" conversion goal** — the fourth goal the channel plan's
  single-goal rule does not yet name.
- The **product-tagging strategy** — SKU → video-type mapping, and why tagging
  beats "link in description."
- The **own-product-over-affiliate** stance.
- The **commerce-readiness gates** (the equivalent of the go-to-market launch
  gates, for the *shop* side).
- **Gear-attributed metrics** (product-tag CTR, video-attributed revenue).

**Does NOT own (link here, never duplicate):**

| Concern | Owner |
|---------|-------|
| Channel content strategy, series formats, the three existing conversion goals | [youtube-channel-plan.md](youtube-channel-plan.md) |
| Launch sequence, distribution playbook, cross-channel weekly rhythm | [go-to-market-plan.md](go-to-market-plan.md) |
| Per-video production pipeline (Steps 0–10) | [video-production-workflow.md](video-production-workflow.md) |
| Shop implementation (Snipcart + Stripe, static catalog) | [WP-019](../ai/work-packets/WP-019-snipcart-commerce.md); catalog in `content/shop/*.md` |
| Commerce performance posture (eager SDK on shop, lazy elsewhere) | [WP-044](../ai/work-packets/WP-044-site-performance-recovery.md) |
| Fairness boundary — what revenue may and may not touch | [01-VISION.md § Permanent non-goals](../01-VISION.md) |

If a section here starts to restate channel strategy or launch sequencing, it
has drifted — cut it and link instead. This is the same anti-drift discipline
the [go-to-market plan](go-to-market-plan.md) enforces.

---

## The gear that already exists

The shop is live-capable today: a static Hugo catalog (`content/shop/*.md`)
wired to Snipcart + Stripe checkout ([WP-019](../ai/work-packets/WP-019-snipcart-commerce.md)),
with the three featured SKUs surfaced on the homepage as **"Featured Gear"**
(`layouts/index.html` pulls the first three `featured: true` items) and a
"Browse all gear" link to `/shop/`.

| SKU | Price | What it is | Natural video home |
|-----|-------|-----------|--------------------|
| **Starter Deck Box** (`LA-DECK-001`) | $24.99 | 60-card tournament-ready deck, quick-start rulebook, branded deckbox | "How to Play" first-session videos; setup videos |
| **Arena Playmat** (`LA-MAT-001`) | $34.99 | Full-size neoprene mat with printed zones + turn tracker | Table-setup, "reading the board," zones/turn-tracker clips |
| **Strategy Guide Vol. 1** (`LA-GUIDE-001`) | $14.99 | 52 weekly strategy articles collected — first draft to championship play | Deck-building / mastery / "how standing works" content |

These three are the entire commerce catalog worth promoting. Prices, SKUs, and
copy live in `content/shop/` and are authoritative there — this plan cites them,
it does not set them.

> **Readiness note — imagery.** The shop images are still SVG placeholders
> (`/images/shop/*.svg`), and a `sample-product` remains `draft: true` in test
> mode. You cannot tag a product convincingly on video without real product
> shots and B-roll of the object on a table. Real photography/video of the mat,
> box, and guide is a **commerce-readiness prerequisite** (see the gates below),
> not a polish step.

---

## Where this fits the funnel

The go-to-market [north-star funnel](go-to-market-plan.md#north-star-funnel)
optimizes the *digital free-to-play* path (viewer → site → email → first game →
returning player). Video commerce adds a **parallel monetization branch** off
the same audience:

```
Video viewer ─┬─→ Site visitor → Email → First game → Returning player   (digital funnel — go-to-market)
              └─→ Gear purchase (deckbox / playmat / guide)              (commerce branch — this file)
```

The branch matters because it monetizes the audience **directly and
immediately**, independent of whether a viewer ever installs the free digital
game. The same content that builds the digital funnel also sells physical gear;
the incremental cost of the commerce branch is a product tag and thirty seconds
of B-roll, not a separate content program.

This is the "No margin, no mission" logic the shop was added under
([01-VISION.md](../01-VISION.md), 2026-05-12 decision-log entry: e-commerce is
**additive** to the free core, "the fastest path to revenue capture without a
platform migration"). Video commerce is the distribution arm of that same
decision.

---

## The fourth conversion goal: gear purchase

The channel plan's [Single Goal Per Video](youtube-channel-plan.md#single-goal-per-video)
rule names three primary goals: play conversion, email signup, subscriber
growth. Video commerce adds a fourth — **gear purchase** — under the same rule
and the same discipline:

| Primary goal | Best-fit video types | Product tag |
|--------------|---------------------|-------------|
| Play conversion | Tutorials, feature reveals | — (drives the free game) |
| Email signup | Trust/fairness deep-dives | — (drives the list) |
| Subscriber growth | First videos, Shorts, guests | — |
| **Gear purchase** | Setup, table-presence, deck-building/mastery | Deckbox / Playmat / Guide |

**Non-negotiable subordination.** The single-goal rule still governs: gear is
the primary goal only on videos whose *content is already about the physical
object or the mastery the guide teaches* (a table-setup video, a playmat
walkthrough, a deck-building deep-dive). On a trust/fairness or first-game
onboarding video, a gear CTA **competes** with the goal that actually builds the
audience — so it does not appear as a primary CTA there. Product tags may sit
quietly in the shelf/description on those videos, but the spoken CTA stays on
play or email. Multiple equal-weight CTAs create decision fatigue; the fix is
one primary goal per video, gear included.

---

## Why product tagging beats "link in description"

The core mechanic from the source video: a product tagged **on the video
surface** (shopping shelf, product sticker, pinned shopping card) converts far
better than a URL buried in the description, because the buy path never leaves
the watch session.

> **Attributed claims — verify before relying.** The source video cites a
> channel under 10k subscribers generating roughly $20k in a year by tagging
> products rather than linking them, viewers being materially more likely to
> search a brand and to buy after watching, and creator shopping/affiliate
> eligibility having dropped from a 10k-subscriber floor to a much lower one.
> These are the *podcast's* figures, not measured Legendary Arena results, and
> platform eligibility thresholds change often. **Confirm current YouTube
> Shopping / TikTok Shop eligibility and mechanics against each platform's own
> policy before building on a specific number.** The strategy below holds
> regardless of the exact threshold; only the timing of when we qualify depends
> on it.

The Legendary Arena application:

- **Tag the deckbox** on first-session / "how to play" videos — the object a
  new player needs to start at the table.
- **Tag the playmat** on setup, table-presence, and zones/turn-tracker clips —
  the object that makes the board legible.
- **Tag the guide** on deck-building and "how standing works" content — the
  object that extends the mastery the video just demonstrated.

First-party checkout on `/shop/` (Snipcart + Stripe) stays the **source of
truth** for the catalog and fulfillment. Platform shopping surfaces (YouTube
Shopping shelf, TikTok Shop, Reels tags) are **additive discovery/checkout
paths** layered on top of the same three products — not a migration off the
owned store.

---

## Own product beats affiliate

The source video's durable point: creators should graduate from promoting other
people's products (thin margin, no durability) to their own (higher margin,
compounding brand equity). Legendary Arena starts where most creators are trying
to arrive — it **already sells first-party gear and its own strategy volume**.

The rule that follows: **do not spend early video real estate on random Amazon
affiliate picks.** Sell the deckbox, the mat, and the guide. Affiliate links for
genuinely complementary, on-brand tools (e.g., a sleeve or storage product the
audience already asks about) are a *later, secondary* consideration — never the
lead, and never at the expense of a first-party tag.

---

## Fairness boundary (this is the brand's whole position — don't muddy it)

The entire positioning is *skill decides, no pay-to-win*
([01-VISION.md § Permanent non-goals](../01-VISION.md)). Selling gear through
video must not read as selling advantage. It does not, and the reason is
categorical:

- The physical **deckbox, playmat, and guide are presentation, accessory, and
  education** for the *tabletop* experience. None of them touch the digital
  game's rules, scoring, PAR, matchmaking, leaderboard eligibility, or standing.
- Buying the playmat does not make you win the digital arena. Buying the guide
  teaches skill — which is *aligned with* the fairness position, not in tension
  with it (the brand's promise is that skill, not spend, decides; a guide that
  builds skill is on-message).

This is the same line the [monetization model](https://ewiki.legendary-arena.com/monetization-model/)
draws for every revenue surface: cosmetic, convenience, recognition, and
presentation are fair game; gameplay advantage is never for sale. Physical gear
sits on the safe side of that line by construction. **Keep the language honest:**
the mat is "table presence," the guide is "52 weeks of strategy," the box is
"everything you need to start" — never "the edge you need to win."

**Voice.** Gear CTAs follow the channel plan's
[Copy Direction](youtube-channel-plan.md#copy-direction-anchor-to-internal-feelings):
lean into skill, composition, mastery, and standing; avoid luck/grind/pack
framing. "Set your table the way the game deserves" beats "unlock your
advantage."

---

## Commerce-readiness gates

Promotion of gear ramps in stages, exactly as the go-to-market plan gates
homepage traffic. **Do not tag a product you cannot photograph, ship, or stand
behind.**

| Gate | Condition | Unlocks |
|------|-----------|---------|
| **C1 — Fulfillment real** | The three SKUs ship reliably (stock, packaging, shipping, returns path); Snipcart/Stripe live in production, not test mode | Any public "buy" CTA for gear |
| **C2 — Real imagery** | Real product photography + short B-roll of each SKU on a table exist (placeholders retired; `sample-product` removed or shipped) | Product tags and gear-forward video segments |
| **C3 — Platform shop live** | YouTube Shopping (or TikTok Shop) connected to the catalog *and* current eligibility confirmed against platform policy | On-surface product tags / shelves (vs. description links) |
| **C4 — Attribution on** | Gear links carry UTMs and video-attributed shop revenue is measurable (rides the same analytics decision as go-to-market [G3](go-to-market-plan.md#launch-readiness-gates)) | Optimizing which videos actually sell |

C1 and C2 are the critical path: a tagged product with placeholder art and no
fulfillment burns trust faster than no tag at all. Until C3, use a clean UTM'd
`/shop/` link in the description and a spoken CTA on gear-primary videos — the
strategy works before the platform shelf does; the shelf just raises the
conversion rate.

---

## Highest-leverage first commerce videos

Once C1–C2 clear, these four earn their gear tags because the product is
*intrinsic to the content*, not bolted on:

1. **Full setup + first game on the official playmat** — tag deckbox + playmat.
   The mat and box are on screen doing their job the entire runtime.
2. **"How standing actually works — skill, not grind"** — tag the guide. The
   video proves the mastery; the guide extends it.
3. **One mastermind / scenario deep-dive with a recommended hero lineup** — tag
   deckbox + guide. Strategy content that a physical reference naturally serves.
4. **Shorts: one decision per clip** ("which threat first," "what you hold") with
   a product tag — the widest, cheapest net, per the channel plan's
   [Shorts-as-testing-engine](youtube-channel-plan.md#shorts-as-testing-engine)
   discipline.

Do these before building a paid community, before affiliate tech, and before
treating video as only a logo + end-screen checklist. The shopping layer is
already there; the catalog and brand voice already fit it.

---

## Community / membership is a *later* revenue layer

The source video floats creator memberships as recurring revenue. That is
**deliberately out of scope now**, and it is consistent with two existing
decisions:

- The go-to-market plan's rule: **don't build the community first** — let the
  content identify who actually cares, then serve them.
- The monetization model's [Legendary Pass](https://ewiki.legendary-arena.com/monetization-model/)
  is the sanctioned recurring layer, and it is **earned by play, never sold as
  progression** — a paid "channel membership" that gates gameplay value would
  collide with the fairness guardrail. A membership, if it ever exists, sells
  recognition/community/cosmetic access only, after the audience exists.

Ship the gear tags first. Memberships are a v2 conversation, and they route
through the monetization model, not this channel.

---

## Metrics (gear-specific — kept separate from the funnel metrics)

These sit alongside, not inside, the channel plan
[Metrics](youtube-channel-plan.md#metrics) and the go-to-market
[Launch Scorecard](go-to-market-plan.md#launch-scorecard-weekly-read). They
answer one question the others don't: *is the video selling gear?*

| Metric | What it tells you | Read against |
|--------|-------------------|--------------|
| Product-tag CTR | Is the on-surface tag earning clicks? | YouTube Studio / platform shop analytics |
| Video-attributed shop revenue | Which videos actually sell (by UTM `utm_campaign=[slug]`) | Snipcart/Stripe + UTM (needs C4) |
| Attach rate (gear orders ÷ gear-primary video views) | How efficiently gear-forward content converts | per-video |
| Revenue per 1,000 views (gear-primary videos) | Whether the commerce branch is worth the B-roll | monthly |

Optimize toward the videos that *sell*, not the videos that merely get views —
the same lesson the channel plan applies to email signups, one funnel step over.

---

## Relationship to the other marketing docs

| Doc | Relationship |
|-----|--------------|
| [youtube-channel-plan.md](youtube-channel-plan.md) | Owns content, series, and the first three conversion goals. This file adds the fourth (gear) and its tagging discipline. |
| [go-to-market-plan.md](go-to-market-plan.md) | Owns the launch sequence and distribution. This file's commerce gates (C1–C4) parallel its launch gates (G1–G5) and share its analytics dependency (G3/C4). |
| [homepage-spec.md](homepage-spec.md) | Owns the homepage, including the "Featured Gear" section this plan drives traffic toward. |
| [01-VISION.md](../01-VISION.md) | Owns the fairness boundary and the e-commerce scope decision (2026-05-12) this plan executes on. |

The takeaway: the awareness engine (the channel) and the launch machine (the
go-to-market plan) already exist. Video commerce is the thin, high-margin layer
that turns the same audience into gear revenue — build the imagery and
fulfillment, tag the three products on the videos that are already about them,
and measure which ones sell.
