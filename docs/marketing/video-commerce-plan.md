# Video Commerce Plan (Selling the Gear Through Video)

**Site:** legendary-arena.com
**Framework:** StoryBrand SB7 (Donald Miller) + Player Needs Pyramid
**Companion:** [youtube-channel-plan.md](youtube-channel-plan.md), [go-to-market-plan.md](go-to-market-plan.md), [video-production-workflow.md](video-production-workflow.md), [homepage-spec.md](homepage-spec.md), [revenue-operating-spec.md](revenue-operating-spec.md)
**Date:** 2026-09-01

---

Video commerce is the layer that turns a watch session into a gear sale —
in-video checkout on first-party products, not awareness alone and not affiliate
clutter. The channel plan owns *content*; the go-to-market plan owns *launch +
distribution*. This file owns the **commercialization layer** that connects
video consumption to physical gear sales — and the rules that keep it from
stealing the other conversion goals or crossing the no-pay-to-win line.

This is a **governance document**, not a marketing article. Where a statement
could be read two ways, the normative rule wins.

Strategic input: *How YouTube Is Quietly Becoming An E-Commerce Platform* (My
Wife Quit Podcast, 2026-08-18) — product tags and in-video shopping shelves let
a small, loyal audience buy without leaving the video, and a creator's own
product beats affiliate promotion. Legendary Arena already has both
prerequisites: **first-party gear** (three real SKUs, Snipcart checkout) and a
**mastery-native content format**.

---

## What this file owns (and what it doesn't)

**Owns:**

- The fourth **"gear purchase"** conversion goal and its precedence rule.
- The **product-tagging** strategy — SKU → video-type → CTA mapping.
- The **own-product-over-affiliate** stance.
- The **commerce-readiness gates** (C1–C4) with pass/fail criteria.
- **Commerce copy rules** and honest spoken-CTA patterns.
- **Gear-attributed measurement**.

**Does NOT own (link here, never duplicate):**

| Concern | Owner |
|---------|-------|
| Channel content strategy, series, the three existing conversion goals | [youtube-channel-plan.md](youtube-channel-plan.md) |
| Launch sequence, distribution playbook, cross-channel rhythm | [go-to-market-plan.md](go-to-market-plan.md) |
| Per-video production pipeline (Steps 0–10), the shot list | [video-production-workflow.md](video-production-workflow.md) |
| Shop implementation (Snipcart + Stripe, static catalog) | [WP-019](../ai/work-packets/WP-019-snipcart-commerce.md); catalog in `content/shop/*.md` |
| Commerce performance posture (eager SDK on shop, lazy elsewhere) | [WP-044](../ai/work-packets/WP-044-site-performance-recovery.md) |
| Fairness boundary — what revenue may and may not touch | [01-VISION.md § Permanent non-goals](../01-VISION.md) |

## Non-goals (out of scope — refused here)

Video commerce does **not**:

- Govern gameplay rules, matchmaking, PAR, scoring, standing, or progression.
- Introduce digital power, bonuses, or any competitive advantage for sale.
- Promote third-party affiliate products as a primary revenue model.
- Override the single-goal rule defined in the
  [channel plan](youtube-channel-plan.md#single-goal-per-video).
- Authorize new SKUs invented to fill a platform shelf.
- Own channel memberships, Super Thanks, ad RPM, or community monetization —
  those are a later conversation and route through the
  [monetization model](https://ewiki.legendary-arena.com/monetization-model/),
  not this page.

A proposed tag that would touch any item in the first two bullets is refused at
this layer, regardless of its revenue.

## Ownership

Single-operator today: catalog, imagery, commerce-platform setup, and
attribution configuration are all owned by the operator; fulfillment readiness
(C1) is an operations concern the same person currently fills. When roles split,
record the owner per responsibility here — do not stand up a role matrix before
there are roles to fill.

---

## StoryBrand cast for this layer

The channel plan runs the full SB7 arc. For commerce specifically:

| Role | Who / what |
|------|-----------|
| Hero | The player who wants standing from sessions played well |
| Problem | The table is incomplete, or the system is not yet known |
| Guide | The video, speaking as the system — never as a salesman |
| Plan | Watch → understand the decision → play → (only when earned) get the object the video already used |
| Success | The same table, the same rules, better presented |
| Failure | A buy CTA that sounds like an edge, or a tagged product that cannot ship |

---

## The gear that already exists

A static Hugo catalog (`content/shop/*.md`) wired to Snipcart + Stripe
([WP-019](../ai/work-packets/WP-019-snipcart-commerce.md)), with three featured
SKUs surfaced on the homepage as **"Featured Gear"** and a "Browse all gear"
link to `/shop/`. No fourth product until C1 and C2 are true for it.

| SKU | Price | What it is | Natural video home | Honest phrase | Forbidden phrase |
|-----|-------|-----------|--------------------|---------------|------------------|
| Starter Deck Box (`LA-DECK-001`) | $24.99 | 60-card deck, quick-start rulebook, deckbox | First-session / how-to-play | "Everything you need to start" | "The deck that wins" |
| Arena Playmat (`LA-MAT-001`) | $34.99 | Neoprene mat, printed zones, turn tracker | Setup, table presence, zones/turn-tracker | "Table presence" | "The edge you need" |
| Strategy Guide Vol. 1 (`LA-GUIDE-001`) | $14.99 | 52 weeks of deck-building strategy | Deck-building / how standing works | "52 weeks of strategy" | "The secret to standing" |

Prices, SKUs, and copy live in `content/shop/` and are authoritative there. These
three sit on the safe side of the [fairness boundary](#fairness-boundary) by
construction: presentation, accessory, and education for the *tabletop* game;
they touch no digital rules, scoring, PAR, matchmaking, or standing.

---

## The platform bridge (an approved shop partner is required)

A raw `/shop/` URL is a **description link**, not a native product tag. YouTube's
Store tab and on-video product tagging are unlocked only through an **approved
YouTube Shopping partner integration** — and Snipcart, which powers `/shop/`, is
not one. The additive mirror of the operating rules therefore needs a **bridge**:
an approved partner that surfaces the same three SKUs on the platform while
`/shop/` stays the cart of record. Without it, gear reaches YouTube as
description and pinned-comment links only, and gate C3 cannot pass.

**Fourthwall is the named bridge for YouTube.** It is an approved YouTube
Shopping partner (Store tab + product tagging) and, unlike Shopify, does not
force the business onto a new platform of record. Its role is strictly the
**platform-facing mirror of the existing three SKUs**, bound by these invariants:

- **`/shop/` (Snipcart + Stripe) stays the single source of truth** and the cart
  of record. Fourthwall never becomes the main-site cart.
- **Fourthwall mirrors `LA-DECK-001` / `LA-MAT-001` / `LA-GUIDE-001`** onto the
  Store tab so they can be natively tagged. It carries **no SKU** that has not
  already cleared C1–C2 on `/shop/` — the partner shelf is downstream of the
  shop, never ahead of it.
- **Checkout completes on the connected store.** The platform is the surface,
  never the checkout — the same rule that already governs `/shop/`.
- **Partner-mirror drift is a defect.** A SKU tagged on the platform must exist
  and clear C1–C2 on `/shop/`, and must not drift on price or name from the
  homepage. The shop is upstream of the shelf, never the reverse.

**API boundary.** The YouTube Data API manages videos, playlists, descriptions,
and comments — so description links and their UTM tags *can* be automated. The
Store tab and product tagging are **not** exposed through the public API; they
are configured through the Fourthwall integration and YouTube Studio, not
scripted. Automate the description links; treat the Store tab as configured, not
coded.

This is the platform-neutral pattern below made concrete: each native-commerce
platform reaches the shop only through its own approved partner (Fourthwall for
YouTube; TikTok Shop's native integration later), while the two invariants —
`/shop/` stays source of truth, and no new SKU or advertised advantage — hold on
every one.

---

## The fourth conversion goal: gear purchase, and its precedence

The channel plan's [Single Goal Per Video](youtube-channel-plan.md#single-goal-per-video)
rule names three primary goals: play conversion, email signup, subscriber
growth. Video commerce adds a fourth — **gear purchase** — under the same rule.

**Precedence (binary).** Every video may support multiple outcomes but
designates exactly one primary goal. **Gear may be the primary goal only when
all three conditions hold:**

1. The product is materially featured in the video (on screen, doing its job).
2. The product directly supports the topic being taught.
3. A purchase CTA does not conflict with an audience-building objective (play or
   email) the video is better positioned to serve.

If any condition fails, gear is **secondary** (a description link, no spoken
buy) or **omitted**. On trust, fairness, or first-game onboarding videos, a
spoken buy CTA competes with the goal that grows the audience — so it stays out
of the primary slot.

### Video-job decision table

| Video job | Primary goal | Gear? | How |
|-----------|-------------|-------|-----|
| Trust / fairness / "why this system" | Play or email | No | No spoken buy. A `/shop/` description link is enough. |
| First-game onboarding | Play | Soft only | Show the box on the table; do not ask for the sale. |
| Setup / table presence | Gear (mat, then box) | Yes — primary | Tag the mat. End screen to `/shop/arena-playmat/`. |
| How to play / first session | Gear (box) | Yes — primary | Tag the box. Spoken CTA *after* the system has been shown. |
| Deck-building / standing / championship | Gear (guide) | Yes — primary | Tag the guide. CTA is "the volume behind this session," never "buy an advantage." |
| Shorts: one decision | Subscriber or play | Soft only | Object may appear; no hard sell in 20 seconds. |

Tagging beats a URL in the description; own product beats affiliate. Early video
real estate sells the box, the mat, and the guide — not routers, not other
people's binders, not a fourth SKU that does not exist.

---

## Commerce-readiness gates

Parallel to the go-to-market [launch gates](go-to-market-plan.md#launch-readiness-gates).
**All four must pass for a SKU before any public gear tag is enabled for it.**
Failure of any gate blocks tagging; each gate is met or it is not.

| Gate | Requirement | Pass criteria (done when) |
|------|-------------|---------------------------|
| **C1 — Fulfillment real** | The unit can be picked, packed, shipped, and refunded | Supplier + ship-from + shipping SLA + returns path exist, **and a test order has completed end to end** |
| **C2 — Real imagery** | The shop and the tag show the manufactured object, not a stand-in | A photograph of the shipped unit is published to `/shop/`; SVG placeholders and any `draft` sample product are gone |
| **C3 — Platform shop live** | An approved-partner integration, eligibility, and catalog are confirmed on the platform being tagged | An **approved YouTube Shopping partner (Fourthwall, per § The platform bridge)** is connected and mirrors the three SKUs to the Store tab — a raw `/shop/` URL is a description link, not a native tag; the SKUs are purchasable through the connected store; **current eligibility confirmed the week of first tag** — never relied on from a podcast threshold |
| **C4 — Attribution on** | A sale can be traced to a video | UTM on every tagged destination + Snipcart/Stripe metadata or landing param, pulling weekly into the [Launch Scorecard](go-to-market-plan.md#launch-scorecard-weekly-read) |

**C2 is the current hard block.** Tagging a product with placeholder art and no
fulfillment burns trust faster than not tagging at all. If C1–C4 fail for a SKU,
untag it — never leave a dead tag live.

---

## Operating rules

1. `/shop/` (Snipcart + Stripe) remains the **source of truth**; platform shelves
   are additive mirrors onto it, surfaced through an approved partner (Fourthwall
   for YouTube — see § The platform bridge), never a migration and never a raw
   Snipcart link.
2. One tagged SKU per video, unless the video is a catalog/setup tour. Prefer the
   SKU the footage already uses.
3. The spoken CTA comes **after** the system has been demonstrated, never as the
   cold open.
4. End screen and description use the canonical product URL, not a shortening
   service.
5. Confirm YouTube Shopping / TikTok Shop eligibility the **week of first use**.
   The podcast's figures (small-channel tag revenue, a lowered subscriber bar)
   are the source's claims, not Legendary Arena results, and platform policy
   moves without notice.
6. Community, memberships, and "binder-buy" formats stay off this layer until the
   three SKUs convert on long-form.

---

## Copy rules

Voice is the system: direct, mature, no irony. Gear copy describes the **object
and the session**; it never describes power. This is an operating rule, not a
footnote — a bad lower-third is how this layer breaks the brand.

- **Use:** skill, mastery, decision, refine, standing, composition, presentation,
  table, session.
- **Do not use:** luck, RNG, grind, farm, loot, gacha, pack, pay-to-win, edge,
  "advantage you can buy," secret, meta, tier list.

Spoken-CTA patterns that stay honest:

- **Box:** "This is the starter box the session used — cards, rulebook, deckbox."
- **Mat:** "Zones and the turn tracker are on the mat — the same layout as the
  table in this video."
- **Guide:** "Volume 1 is the 52-week path from first draft to championship play."

---

## Fairness boundary

The entire positioning is *skill decides, no pay-to-win*
([01-VISION.md § Permanent non-goals](../01-VISION.md)). Selling gear through
video must not read as selling advantage, and it does not, categorically:

- The physical deckbox, playmat, and guide are **presentation, accessory, and
  education** for the *tabletop* experience. None touch the digital game's rules,
  scoring, PAR, matchmaking, leaderboard eligibility, or standing.
- Buying the playmat does not make you win the digital arena. Buying the guide
  teaches skill — which is *aligned with* the fairness position (the promise is
  that skill, not spend, decides).

This is the same line the [monetization model](https://ewiki.legendary-arena.com/monetization-model/)
draws for every revenue surface, and the shop was added as an **additive** layer
to the free core under exactly that discipline (VISION decision log, 2026-05-12).
Keep the language honest: the mat is "table presence," the guide is "52 weeks of
strategy," the box is "everything you need to start" — never "the edge you need
to win."

---

## Platform neutrality

Although YouTube Shopping is the initial implementation target, this policy
applies to **any** video platform that supports native commerce — TikTok Shop,
Reels, and future platforms not yet adopted. Two invariants hold on every one of
them: `/shop/` stays the source of truth, and no platform integration may require
a change to gameplay rules, progression, or the fairness commitments above. A
platform is a new checkout path onto the same three products — never a reason to
create a new SKU or a new advantage. Each such platform reaches the shop only
through its own **approved commerce partner** (Fourthwall for YouTube; TikTok
Shop's native integration later; see § The platform bridge) — a raw `/shop/` link
is never a native product tag.

---

## Measurement

Video commerce is judged on whether **video sells gear** — tracked per video,
not just per channel. These sit alongside, not inside, the channel plan
[Metrics](youtube-channel-plan.md#metrics) and the go-to-market
[Launch Scorecard](go-to-market-plan.md#launch-scorecard-weekly-read).

| Measure | What it tells you |
|---------|-------------------|
| Product-tag CTR | Is the on-surface tag earning clicks? |
| Tag → product-page session → checkout start → paid order | Where the commerce funnel leaks |
| Revenue by SKU and by video (UTM `utm_campaign=[slug]`) | Which videos actually sell |
| Revenue per 1,000 views (gear-primary videos) | Whether the commerce branch earns its B-roll |
| Refund / complaint rate on video-attributed orders | Trust canary — a rising rate means the copy oversold |

**Cannibalization check.** An onboarding or trust video that adds a gear CTA must
not lose its play/email conversion. If it does, revert that video to its
channel-plan goal.

Vanity metrics (impressions, likes, raw view count) are secondary indicators,
never primary commerce measures. Two verdicts make the standard concrete:

- A tagged video that **doesn't** sell is not a failure if it still hits its
  primary non-gear goal.
- A tagged video that **does** sell by sounding like pay-to-win **is** a failure,
  even if revenue is up.

---

## Highest-leverage first commerce videos

Once C1–C2 clear, these four earn their gear tags because the product is
intrinsic to the content, not bolted on:

1. **Full setup + first game on the official playmat** — tag deckbox + playmat.
2. **"How standing actually works — skill, not grind"** — tag the guide.
3. **One mastermind / scenario deep-dive with a recommended hero lineup** — tag
   deckbox + guide.
4. **Shorts: one decision per clip** ("which threat first," "what you hold") with
   a product tag — the widest, cheapest net, per the channel plan's
   [Shorts-as-testing-engine](youtube-channel-plan.md#shorts-as-testing-engine).

Do these before a paid community, before affiliate tech, and before treating
video as only a logo + end-screen checklist. The shopping layer is already there;
the catalog and brand voice already fit it.

---

## Relationship to the other marketing docs

| Doc | Relationship |
|-----|--------------|
| [youtube-channel-plan.md](youtube-channel-plan.md) | Owns content and the first three conversion goals. This file adds the fourth (gear) and its precedence + tagging discipline. |
| [go-to-market-plan.md](go-to-market-plan.md) | Owns launch and distribution. The commerce gates C1–C4 parallel its launch gates G1–G5 and share its analytics dependency (G3/C4). |
| [homepage-spec.md](homepage-spec.md) | Owns the homepage "Featured Gear" section this plan drives toward; product names, prices, and phrases must match it, not drift in lower-thirds. |
| [video-production-workflow.md](video-production-workflow.md) | Owns the shot list where gear B-roll, table setup, and the spoken CTA are scheduled. Its [Gear CTA subsection](video-production-workflow.md#gear-cta-commerce-videos-only) puts this plan's precedence rule and copy patterns on the shot list. |
| [01-VISION.md](../01-VISION.md) | Owns the fairness boundary and the 2026-05-12 e-commerce-is-additive decision this plan executes on. |

The awareness engine (the channel) and the launch machine (the go-to-market
plan) already exist. Video commerce is the thin, high-margin layer that turns the
same audience into gear revenue — build the imagery and fulfillment, tag the
three products on the videos already about them, and measure which ones sell.
