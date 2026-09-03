# Legendary Arena — Business Brief

**Scope:** Legendary Arena as governed by this repo (the marketing site).
**Last updated:** 2026-06-12
**Authoritative sources:** [`docs/01-VISION.md`](../01-VISION.md),
[`docs/brand/strategy.md`](../brand/strategy.md),
[`docs/product/diorama-master-plan.md`](../product/diorama-master-plan.md).
This brief summarizes and links; those docs win on any conflict.

---

## What Legendary Arena is

A **skill-first, web-based deck-building game** with a deterministic engine.
The promise, in one line: *every game is fair, every result is provable,
every rank means something.* It preserves the heroic deck-building fantasy
while removing setup friction, randomness-driven outcomes, and
progression-by-spending.

- "Deterministic" = system-level: the rules don't change, standings don't
  drift, no loot boxes / time-gates / pay-to-win. In-session randomness
  (shuffle, draw) is preserved. Full definition:
  [`docs/brand/strategy.md`](../brand/strategy.md) §1.
- The anchoring villain is the **pay-to-win model**; the single customer
  desire is *"a card game that rewards your brain, not your wallet."*
  ([`docs/marketing/youtube-channel-plan.md`](../marketing/youtube-channel-plan.md))

## Properties (three sites, one product)

| Subdomain | Role | Tech | Repo |
|---|---|---|---|
| `www.legendary-arena.com` | Marketing landing (**this repo**) | Hugo, static | `legendary-arena/legendary-arena-website` |
| `play.legendary-arena.com` | Live game client | Vue (`arena-client`), static | engine monorepo |
| `cards.legendary-arena.com` | Card registry browser | Vue (`registry-viewer`), static | engine monorepo |

- The three share exactly one runtime artifact: **brand tokens**
  (`https://www.legendary-arena.com/brand-tokens.css`), a versioned
  cross-origin API contract. Details: [`docs/01-VISION.md`](../01-VISION.md)
  "Cross-site contract".
- Registry migrated to `cards.legendary-arena.com` on 2026-07-16 (from
  `cards.barefootbetters.com`; the old domain still answers, redirect
  pending — see [`03-open-questions.md`](03-open-questions.md)).
- A future `api.legendary-arena.com` (Render-hosted Node server) will serve
  the game backend; the marketing site never touches it.

## Code homes (two GitHub orgs)

| What | Local path | GitHub |
|---|---|---|
| Marketing site (this repo) | `C:\www\legendary-arena-com` | `github.com/legendary-arena/legendary-arena-website` |
| Engine monorepo (active checkout) | `C:\pcloud\BB\DEV\legendary-arena` | `github.com/barefootbetters/legendary-arena` |
| Engine monorepo (stale backup — do not edit) | `C:\www\legendary-arena` | — |

Engine monorepo holds `apps/arena-client`, `apps/registry-viewer`,
`apps/server`, `packages/game-engine`, `packages/registry`.

## Product lines

1. **The game** — the web deck-building platform (play.* + cards.*). The
   marketing site's job is to funnel visitors to `play.legendary-arena.com`.
2. **The Diorama Platform** — physical Marvel action-figure dioramas
   (magnetic mounting + magnetic-LED contact, servos, synchronized sound,
   digital backdrops, all orchestrated by a Raspberry Pi). Positioned as a
   bookshelf-scale answer to "the model railroad problem," a
   parent-and-child Saturday build, and a STEM learning platform.
   ~$100 starter kit. Sold on-site via Snipcart + Stripe (WP-019); landing
   page + waitlist at `/diorama/` (WP-023/024).
   Full plan: [`docs/product/diorama-master-plan.md`](../product/diorama-master-plan.md).

## Origin story

Legendary Arena traces to a real personal chapter — a hard season, a friend
(Tex) offering a room and a seat at the card table, faith, and the idea that
*the real product is the time spent together, not the thing on the shelf.*
Recorded verbatim in
[`docs/product/diorama-master-plan.md`](../product/diorama-master-plan.md)
§"It All Started with a Game." This is the brand's emotional foundation; the
personal/faith dimension is captured in the owner profile
(`C:\www\jefferyjjensen-corporate-memory\owner-profile.md`).

## Channels

| Channel | Notes | Source |
|---|---|---|
| **YouTube** "Legendary Arena" — [`@playlegendaryarena`](https://www.youtube.com/@playlegendaryarena) (confirmed 2026-09-03) | StoryBrand SB7 framework; 4 series (Building the Arena / How to Play / Across the Table / Arena Clips). Deliberately **not** branded "BarefootBetters." | [`youtube-channel-plan.md`](../marketing/youtube-channel-plan.md) |
| **Email newsletter** | Brevo, double opt-in, sender `newsletter@legendary-arena.com`; weekly manual campaigns + welcome automation. Lead magnet "The Deck-Builder's Primer" at `/get-started`. | [`docs/brevo/email-automation.md`](../brevo/email-automation.md) |
| **Discord** | Community hub; the site links out (community is a permanent non-goal for the site itself). | `01-VISION.md` |
| Social (FB / X) | Handles **[CONFIRM: actual handles]** — see [`03-open-questions.md`](03-open-questions.md). | — |

## Revenue model

- **Near-term, documented:** diorama kits + accessories + digital products +
  educational materials, sold via Snipcart/Stripe. Guiding principle:
  *"No margin, no mission"* — margin funds the mission.
- **The game's monetization model is NOT documented.** The site funnels to
  play.*; there is no written subscription/tournament/IAP model. Tracked as
  an open question — see [`03-open-questions.md`](03-open-questions.md). (Do
  not assert a model that isn't written down.)

## Brand guardrails (do not violate in any user-facing surface)

- Lead with **player agency and mastery**, not mechanics.
- **Never** call LA a "fan project" in user-facing copy (internal docs may).
- **Never** rely on Marvel IP naming or external artwork for comprehension —
  all messaging must stand as original content. The Marvel *Legendary*
  lineage is **internal-only context**, not a brand-facing claim.
- All visual expression uses **brand tokens only** (no ad-hoc values).
Full rules: [`docs/brand/strategy.md`](../brand/strategy.md) "Global brand
invariants".

## Relationship to BarefootBetters

BarefootBetters is a **separate business identity** from Legendary Arena
(explicit in [`youtube-channel-plan.md`](../marketing/youtube-channel-plan.md))
*and* the umbrella under which some LA infrastructure sits (GitHub org
`barefootbetters`; the registry ran at `cards.barefootbetters.com` until
its 2026-07-16 move to `cards.legendary-arena.com`). What
BarefootBetters itself sells is **[CONFIRM]** and belongs in its own repo's
memory, not here. Portfolio-level view:
`C:\www\jefferyjjensen-corporate-memory\portfolio.md`.
