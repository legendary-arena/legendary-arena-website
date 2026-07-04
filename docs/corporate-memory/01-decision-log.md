# Decision Log — Legendary Arena (executive altitude)

**Append-only.** Never edit a past entry. Corrections are new entries that
supersede, with a pointer back. Newest at the bottom.
**Last updated:** 2026-07-03

---

## What goes here vs. `01-VISION.md`

This log records **strategic / business-altitude** decisions (what we're
building, how we make money, where things live, how this memory works).

**Granular site + technical decisions** (token values, redirect mechanisms,
WP locks, layout choices) live in
[`docs/01-VISION.md`](../01-VISION.md) "Decisions log" and are **not**
duplicated here — this log links to them when relevant. If you're about to
record a CSS-token or Hugo-config decision, it belongs in the vision log.

---

## Entries

### 2026-06-12 — Adopt distributed, repo-local corporate memory

Each repo carries its own corporate-memory layer; a private repo
(`C:\www\jefferyjjensen-corporate-memory`) holds the person + portfolio index. All under
`C:\www\` (outside the pcloud backup), edited PR-style with a weekly
maintenance pass. Rationale: keeps cross-business strategy out of any
single product repo (respects each repo's identity boundary) while keeping
each business's memory next to the code it describes.
**Impact:** this layer created; personal repo scaffolded.

### 2026-05-07 — Brand identity v1 locked (LA)

Skill-first, deterministic-fairness positioning; full token contract
(`brand-tokens.css` v1) consumed cross-origin by play.* and registry.*.
Detail + tonal iteration under the §9.1 Early Lock Revision Window:
[`docs/brand/strategy.md`](../brand/strategy.md) and `01-VISION.md`
Decisions log (2026-05-07 / 2026-05-08).
**Impact:** brand is the single source of truth for all three sites.

### 2026-05-07 — Registry stays at `cards.barefootbetters.com` for v1

Migration to `registry.legendary-arena.com` deferred to a future scoped
effort; pinning v1 on a domain change adds risk without proportionate
benefit. Source: `01-VISION.md` Decisions log.
**Impact:** all v1 cross-site references use `cards.barefootbetters.com`.
Still open — see [`03-open-questions.md`](03-open-questions.md).

### 2026-05-12 — E-commerce scope expansion (Snipcart + Stripe)

Marketing site gains a real storefront (WP-019). Enables direct on-site
sales — the channel the diorama product line ships through.
**Impact:** site is no longer brochure-only; it transacts.

### ~2026-06-08 — Diorama product line added

Physical Marvel-figure diorama platform (kits/accessories/digital/STEM)
becomes a first-class product line with its own landing page + waitlist
(WP-023/024) and master plan. *"No margin, no mission."*
**Impact:** LA now has a documented near-term revenue product distinct from
the game. Full plan:
[`docs/product/diorama-master-plan.md`](../product/diorama-master-plan.md).

### 2026-06-11 — Plausible selected as the site-side analytics platform

Closes the long-open "Cloudflare Web Analytics / Plausible / none" question.
Production-only; first use is search demand-signal instrumentation (WP-025).
Unblocks site-side conversion measurement that WP-021 had to defer.
**Status:** decided in the WP draft; **operator prereq** (provision the
Plausible account) still pending — see
[`03-open-questions.md`](03-open-questions.md).
**Impact:** funnel/conversion KPIs become measurable once the account is live.

### 2026-07-03 — Monetization model confirmed (VISION) + profile free/paid boundary locked

Corrects the record and closes an open question. The revenue model was never
undocumented: engine [`docs/01-VISION.md`](../01-VISION.md) §Financial
Sustainability ("No Margin, No Mission") is canonical — four fairness-safe
streams (Supporter Subscriptions, one-time cosmetics, Premium Recognition Tiers,
organized-play licensing), mandatory Upper Deck/Marvel royalties, and the hard
rule that revenue never confers gameplay advantage (NG‑1…NG‑7). Newly decided:
the **profile-page free/paid boundary is locked as proposed** — basic identity
(unique handle + public URL) always free; the paid layer is prestige / cosmetic /
convenience mapped onto VISION's streams; first handle change free, repeats paid;
bio length is not a tier lever; supporter/recognition flair is allowed but must
read as patronage, never rank; owning a Forge diorama unlocks cosmetic profile
items. Full split: [`docs/product/profile-features-free-vs-paid.md`](../product/profile-features-free-vs-paid.md)
(now adopted policy). Published reference: engine ewiki `Monetization Model`
Brand page (`wiki/monetization-model.md`).
**Impact:** closes the 🔴 "monetization model undocumented" open question; the
profile paid layer can be built against a locked boundary (timed post-population
per the doc). Amendments to the split go through a new decision-log entry.

<!-- Append new entries below this line. Copy the heading format:
### YYYY-MM-DD — <decision>
<one paragraph: what + why>
**Impact:** <what changes downstream>
-->
