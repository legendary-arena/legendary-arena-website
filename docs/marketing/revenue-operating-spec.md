# Revenue Operating Spec (Ship the Register, Not Just the Story)

**Site:** legendary-arena.com
**Framework:** StoryBrand SB7 (Donald Miller) + Player Needs Pyramid
**Companion:** [go-to-market-plan.md](go-to-market-plan.md), [video-commerce-plan.md](video-commerce-plan.md), [youtube-channel-plan.md](youtube-channel-plan.md), [homepage-spec.md](homepage-spec.md)
**Date:** 2026-09-02

---

The marketing docs are strong as **governance** and thin as a **revenue
machine**. They optimize StoryBrand coherence, gate discipline, and list growth;
almost none of the operating surface is wired to a dollar. The homepage "Play
now" points at a developer lobby, `/get-started` is a 404, there is no email
capture, and Featured Gear ships with a placeholder product and no public
fulfillment proof.

This file's job is narrow and blunt: **put the cash register and the shippable
object on the same critical path as the story.** For the next 90 days, revenue
can only come from **gear** (physical or digital) — not from play starts — so the
gear offer, its fulfillment, and its attribution get a clock of their own that
does not wait behind a YouTube studio roadmap.

This is a **governance document**, not a marketing article, and it is
**subordinate to the revenue model** — it sequences and instruments; it does not
redefine what may be sold. Where a statement could be read two ways, the
normative rule wins.

Provenance: this spec operationalizes an external revenue review of the three
plans (2026-09-02). The strategic call — governance-strong, revenue-weak; move
the register onto the critical path — was accepted; the numeric targets below are
directional hypotheses, not commitments.

---

## What this file owns (and what it doesn't)

**Owns:**

- The **revenue critical path** — the two-clock model (audience vs. cash).
- Two gates the launch plan is missing: **G0 (legal + shippable)** and **G1b
  (first game is one click)**.
- The **offer** — a bundle for AOV and a digital SKU for near-zero COGS.
- The **money scorecard** — the revenue signals the operator fills weekly.
- The **4-week cash calendar** that runs alongside the channel plan.

**Does NOT own (link here, never duplicate):**

| Concern | Owner |
|---------|-------|
| Which revenue is allowed, the fairness boundary, mandatory royalties | `docs/01-VISION.md` §Financial Sustainability + [Monetization Model (ewiki)](https://ewiki.legendary-arena.com/monetization-model/) — **canonical** |
| Launch sequence and gates G1–G5, distribution playbook | [go-to-market-plan.md](go-to-market-plan.md) |
| Gear-tagging discipline and readiness gates C1–C4, product-tag copy | [video-commerce-plan.md](video-commerce-plan.md) |
| Channel content, series, the three audience conversion goals | [youtube-channel-plan.md](youtube-channel-plan.md) |
| Shop implementation (Snipcart + Stripe, static catalog) | [WP-019](../ai/work-packets/WP-019-snipcart-commerce.md); catalog in `content/shop/*.md` |
| Homepage "Featured Gear" surface, product names/prices | [homepage-spec.md](homepage-spec.md) |

This file **sequences** those; it does not redefine them. It adds no new SKU
beyond a bundle of the existing three and a digital edition of the existing
guide, and it invents no revenue stream outside the canonical model.

## The correction: revenue is the 90-day north star

The go-to-market [north-star funnel](go-to-market-plan.md) ends at "first game
completed → returning player." That is an **acquisition** funnel; revenue is a
gated fourth branch that only [video-commerce-plan.md](video-commerce-plan.md)
names. For a 90-day **cash** goal that ordering is inverted. The operating north
star for this window:

```
Aware player → Trust the table → Buy a session object
                              ↘ Email (owned follow-up)
                              ↘ First digital game (habit, later LTV)
```

Views, Discord members, and even play starts do not pay fulfillment or ads. They
still matter — they build the trust and proof the buy depends on — but they are
Clock A, and Clock B has to run in parallel, not after.

## G0 and G1b — the two gates the launch plan is missing

The go-to-market plan's binary gates G1–G5 are correct and unchanged. Two gates
sit **in front of** them for the revenue path:

- **G0 — Offer is legal and shippable.** The physical **60-card Starter Deck
  Box** (`LA-DECK-001`) is **covered under the Upper Deck / Marvel license** — the
  same license under which royalties are already mandatory (`docs/01-VISION.md`
  §Financial Sustainability) — and so ships and is promoted as a licensed product
  (confirmed by Jeff, 2026-09-02). G0 is therefore a **confirm-scope gate, not a
  block**: before a SKU's first public tag or paid test, confirm the license
  terms cover that specific SKU and surface. Public copy still keeps "Marvel" out
  of headline SEO per the WP-008 brand-failure-mode decision — a deliberate brand
  posture, not a licensing limit. The mat and guide are original-identity
  (presentation / accessory / education) and clear G0 trivially.
- **G1b — First game is one click.** Homepage "Play now" may not point at the
  loadout-JSON lobby (its current target) until a new player can finish a game
  without pasting JSON — or, as an interim, until it points at a bot-replay
  ("Watch a game") or the primer. A cold Marvel Champions / Legendary player will
  not assemble a LAGN loadout, so until this holds, **G1 is cosmetic** and
  "Watch gameplay" has no real destination.

## Two clocks: audience and cash

| Clock | Runs | Contents | Gate it waits on |
|-------|------|----------|------------------|
| **A — Audience** | From day one | Video production, Shorts, Discord / X / Reddit presence, the primer | None (builds the assets the homepage proof needs) |
| **B — Cash** | From day one, **in parallel** | C1–C2 fulfillment + imagery, product pages, the bundle, the first ~20 warm orders | **Not** G4 — a product page with a photo, a shipping SLA, and checkout can take a warm click today |

**Shop-page traffic is allowed before homepage GO.** The leaky homepage
(graded NO-GO) should not block `/shop/arena-playmat/`. A single product page
with real imagery and a clear shipping/returns line can convert a BGG / Reddit /
email click while the homepage is still being rebuilt.

## The offer: pull AOV up, add a near-zero-COGS dollar

Three products at $14.99 / $24.99 / $34.99 with no bundle and no digital SKU is
too thin to justify a 20–30 hr/week content cadence. Two additions — **no new
physical product**, per the [video-commerce non-goals](video-commerce-plan.md):

| SKU | Type | What it is | Why |
|-----|------|-----------|-----|
| **Session Kit** (`LA-KIT-001`) | Bundle of the existing three | Box + mat + guide, priced to clear a free-shipping floor | Raises AOV; makes the first buyers count |
| **Strategy Guide PDF** (`LA-GUIDE-001-PDF`) | Digital | Same editorial as Vol. 1, delivered instantly | Fastest honest dollar; near-zero COGS; trains the email list; **touches no Marvel card IP** (original strategy content) |
| **Free-shipping floor** | Shop-wide rule | e.g. orders over ~$50 ship free (the kit clears it) | Nudges toward the bundle |

Prices and the floor are **hypotheses pending unit-economics calibration** (see
below); the canonical catalog stays `content/shop/*.md`. The digital guide is the
recommended **first** shippable dollar because it clears G0 trivially and needs
no fulfillment.

## Unit economics (fill this in before any paid spend)

The go-to-market G5 paid gate says "small paid tests." Those are guesswork
without the numbers below. Fill before Clock B reaches paid:

| Figure | Value | Source |
|--------|-------|--------|
| COGS per physical SKU | _to fill_ | supplier quote |
| Ship cost by zone | _to fill_ | carrier |
| Contribution margin after ship | _to fill_ | price − COGS − ship |
| Break-even ad CPA | _to fill_ | margin ÷ conversion |

## The money scorecard (add to the weekly read)

[go-to-market-plan.md](go-to-market-plan.md)'s Launch Scorecard tracks signups,
CTR, and play starts — all of which can grow with **$0 revenue**. Add the money
signals the operator fills on Sunday (the [video-commerce Measurement](video-commerce-plan.md)
section already defines most; they just never reached the GTM scorecard):

- **Paid orders** (count) and **AOV**.
- **Contribution margin** after ship — tracked, not guessed.
- **Refund / complaint rate** on video-attributed orders (a trust canary).
- **Revenue by SKU** and **by video** (UTM `utm_campaign=[slug]`).
- **Revenue per 1,000 views** on gear-primary videos.
- **Cannibalization kill-switch:** if an onboarding or trust video's play/email
  conversion drops after a spoken buy CTA, revert it to its channel-plan goal
  **that week** — a live scorecard line, not only prose.

Replace the email-only 90-day target table with a money table (directional,
calibrated after analytics is live):

| Outcome | 90-day directional target |
|---------|---------------------------|
| Paid orders | 40–80 |
| AOV | $45+ (bundle-led) |
| Contribution margin after ship | tracked, not guessed |
| Email subscribers | 300–600 (still useful; no longer the headline) |
| Refund / complaint rate | < 5% |

## The leaks (fix in Week 0)

These are trust-negative under a "no pay-to-win / fairness" brand and should be
handled before any promotion:

1. **Placeholder `sample-product`** (`content/shop/sample-product.md`) — a draft
   product shipping in the live shop. This is the [video-commerce](video-commerce-plan.md)
   C2 hard block in the flesh; unpublish it until a real SKU with real imagery
   replaces it.
2. **"Play now" → JSON lobby** — re-point per **G1b** (bot-replay or primer) until
   a one-click first game exists.
3. **Featured Gear without fulfillment** — if C1 (a test order shipped end to
   end) or C2 (a photograph of the shipped unit) fails for a SKU, remove it from
   the homepage until it passes. A ghost product under a trust brand is worse
   than no shop.

## The 4-week cash calendar (Clock B)

Runs **alongside** the channel plan's content weeks, not after them.

- **Week 0 — Stop the leaks.** Record the G0 license-scope confirmation for each
  public SKU (the deck is license-covered; the mat + guide are original-identity).
  Place one real test order; pack, ship, refund it (C1). Photograph the shipped
  units on a real table; replace every placeholder (C2). Re-point "Play now"
  (G1b).
- **Week 1 — Make the register work.** Product pages (hero photo, what's in the
  box, shipping SLA, returns, one FAQ, UTM on every inbound link). Add the
  **Session Kit** and the free-shipping floor. Stand up email capture on `/shop/`
  and the homepage footer **now** (offer: "primer + first-batch notes"); a thin
  `/get-started` this week, PDF to follow. Turn on the minimum analytics that
  records `checkout_start` and `purchase` (Plausible + Snipcart/Stripe metadata).
- **Weeks 1–2 — Sell to people who already care.** Warm list (Barefoot Betters
  readers, people you already play with) — one honest note with a photo of the
  unit you shipped to yourself. Participate in r/legendary / r/marvelchampions /
  r/boardgames as a person; link only when the answer needs the object. **Goal:
  10 paid orders before any cold promotion.**
- **Weeks 2–6 — Content that builds trust and sells the object.** Record BtA #1
  (fairness) and HtP #1 (first game). Record the **setup-on-the-official-mat**
  video the same week the C2 photos exist — tag the mat, end screen to the
  canonical product URL. Cut 3–5 Shorts per long-form. One companion post per
  long-form, problem-first, pointing at `/get-started` and, when earned,
  `/shop/`. One value email per week.
- **Weeks 6–12 — Amplify only after ~20 orders and 2–4 videos.** Embed real
  footage on the homepage Proof section; re-grade G1. First guest / creator
  outreach. Turn on YouTube Shopping / TikTok Shop (**C3 / Fourthwall**) on the
  three SKUs that already sell on `/shop/`. Tiny paid tests against the **winning
  video or product page**, never the generic homepage, never before G0 / C1 / C2.

The four setup / how-standing-works commerce videos move to **weeks 3–6**, not
"once the channel exists" — the setup-on-the-mat video *is* the product page.

## What "good" looks like in 90 days

Not 1,000 emails and a full series bible — this:

- C1–C2 green; Featured Gear is a real object.
- `/get-started` live; primer exists or is honestly waitlisted.
- **40–80 orders**, AOV pulled up by the kit; refund rate low enough that copy
  isn't overselling.
- 4 long-form videos + ~15 Shorts, at least one **measurably attached to sales**.
- Homepage re-graded toward GO because proof now exists.
- "Play now" is one-click **or** no longer the primary CTA.
- A **written IP posture** you can defend.

## Open decisions (owner: Jeff)

This spec took conservative defaults where a call is genuinely yours. Confirm or
redirect:

1. **Offer pricing** — the Session Kit price and the free-shipping floor are
   placeholders pending unit economics.
2. **"Play now" re-point** — a UX change to the live homepage (bot-replay vs.
   primer vs. one-click first game). Default: flagged as G1b, not yet executed.
3. **Unpublish `sample-product` now** — a live shop change. Default: flagged as a
   Week-0 leak, not yet executed.

**Resolved:** G0 / IP posture — `LA-DECK-001` is license-covered under the
existing Upper Deck / Marvel license (confirmed by Jeff, 2026-09-02); G0 is a
confirm-scope gate, not a block, and the deck stays in the shop.

## Relationship to the other marketing docs

| Doc | Relationship |
|-----|--------------|
| [go-to-market-plan.md](go-to-market-plan.md) | Owns the launch sequence G1–G5. This spec adds G0 + G1b in front of the revenue path and swaps the audience-only 90-day targets for the money table. |
| [video-commerce-plan.md](video-commerce-plan.md) | Owns gear-tagging and gates C1–C4. This spec sequences C1–C2 onto Clock B (ahead of C3) and adds the bundle + digital SKU under its own no-new-physical-SKU rule. |
| [youtube-channel-plan.md](youtube-channel-plan.md) | Owns content. This spec pulls the commerce videos forward to weeks 3–6 and adds revenue lines to the metrics the channel reports. |
| `docs/01-VISION.md` §Financial Sustainability + [Monetization Model](https://ewiki.legendary-arena.com/monetization-model/) | Canonical revenue model and fairness boundary. This spec executes on them and crosses no Non-Goal (NG-1…NG-7). |

The story engine (the channel) and the launch machine (the go-to-market plan)
already exist. This spec is the thin, high-margin layer that turns the same
audience into gear revenue: build the imagery and fulfillment, put a real object
and a real register in front of warm traffic, and measure which videos and which
SKUs actually sell — before pouring cold traffic or paid spend into any of it.
