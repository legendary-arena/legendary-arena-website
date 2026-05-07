# Legendary Arena Website — Vision

**Status:** v1 — decisions locked, brand identity pending (WP-W002)
**Repo:** github.com/legendary-arena/legendary-arena-website
**Production URL:** https://www.legendary-arena.com
**Last updated:** 2026-05-07

> **Authority:** This document is the top-level vision for the marketing site.
> It is subordinate to no other document in this repo. If a conflict arises with
> a Work Packet, README, or implementation detail, this document wins.

---

## Purpose

The Legendary Arena website is the **marketing landing for the Legendary
Arena game**. Its primary jobs:

1. Tell visitors what Legendary Arena is — clearly and quickly.
2. Funnel interested visitors to **play.legendary-arena.com** (the live game).
3. Provide a stable home for devblog, news, and announcements.

The site is **not** the game itself. It does not contain card data, deck
builders, or interactive gameplay. Those live at sister subdomains.

## Audience

- **Primary:** Players of the original Legendary: A Marvel Deck Building Game
  looking for a digital adaptation; deck-building game enthusiasts discovering
  LA for the first time.
- **Secondary:** Press, partners, and IP holders evaluating the project.
- **Tertiary:** Future contributors, if/when the project opens to outside help.

## Topology — three sites, one product

Legendary Arena has three public-facing properties on three subdomains,
sharing a unified brand identity:

| Subdomain | Role | Tech |
|---|---|---|
| `www.legendary-arena.com` | Marketing landing (this repo) | Hugo, static |
| `play.legendary-arena.com` | Live game client | Vue (arena-client), static |
| `registry.legendary-arena.com` | Card registry browser | Vue (registry-viewer), static |

All three are deployed independently on Cloudflare Pages but consume a shared
`brand-tokens.css` (hosted from this repo's `static/`) for visual consistency.
A unified header+footer links between all three.

A future `api.legendary-arena.com` (Render-hosted Node server) will serve the
game backend; this site does not interact with it directly.

## In scope (v1)

- **Home page** — hero, value prop, primary CTA to play.*
- **About page** — what LA is, who's behind it, project status
- **Blog** — devblog, dev journals, release notes; low cadence acceptable
- **Search** (Pagefind) — across blog/marketing content only
- **Unified header + footer** — links to play.*, registry.*, social, legal
- **Brand tokens** — colors/type/spacing as the source of truth for all three sites
- **Performance budget** — sub-1s LCP on the home page

## Out of scope (v1)

Explicitly excluded:

- **Card browsing** — that's `registry.*`'s job
- **Deck building** — that's `play.*`'s job
- **User accounts / authentication** — handled by the game, not this site
- **Comments on blog posts** — moderation overhead too high for v1
- **E-commerce, merch, paid content** — not this site's job
- **Forums, community hub** — Discord or similar fills this need; site links out
- **In-depth player documentation** — deferred until demand is proven

## Non-goals (long-term)

These won't become goals later, either:

- This site never hosts the game itself.
- This site never authenticates users.
- This site never queries card data at build or runtime. Marketing pages that
  reference cards do so with hand-written/copied content, not live data.

## Success criteria

The site is successful at v1 if:

- A first-time visitor understands what LA is within ~5 seconds of landing.
- The "play now" CTA is unambiguous and converts a healthy fraction of visitors.
- Page loads feel instant on broadband and acceptable on mobile.
- Brand identity feels coherent across www, play, and registry.
- Maintenance is light: publishing a blog post is a 10-minute operation.

## Constraints

### Technical

- **Static-only** — Hugo + Cloudflare Pages. No SSR, no DB, no runtime API calls.
- **Brand tokens externalized** — `static/brand-tokens.css` is the visual
  source of truth, consumed by play.* and registry.* via cross-origin link.
- **No build-time data fetching** — content is markdown; no fetching from the
  registry or the game server during build.
- **Theme** — PaperMod fork, restyled to LA brand. Custom theme deferred until
  content needs prove PaperMod can't accommodate.

### Operational

- **Solo-maintained** — content cadence and infrastructure must fit a
  single-operator pace.
- **Light governance** — this repo does not adopt the engine project's full
  WP/EC system. Vision plus a lightweight `work-index.md` is sufficient.
- **Brand identity TBD** — no LA brand book exists yet. WP-W002 establishes it
  before WP-W003 (theme restyle) can begin.

## Relationships to other projects

| Project | Relationship |
|---|---|
| **Legendary Arena (engine monorepo)** | The product this site markets. Source: `github.com/legendary-arena/legendary-arena` (post-transfer from personal account). |
| **arena-client** (in engine monorepo) | Deployed at `play.*`. Consumes `brand-tokens.css` from this site. |
| **registry-viewer** (in engine monorepo) | Deployed at `registry.*`. Consumes `brand-tokens.css` from this site. |
| **LA Node server** | Future `api.*` subdomain. This site does not interact with it. |

## Decisions log

| Date | Decision | Why |
|---|---|---|
| 2026-05-07 | Separate repo from engine monorepo | Hugo content has different governance needs than engine code |
| 2026-05-07 | Subdomains over path-based hosting | Independent deploys, independent caching, cleaner failure isolation |
| 2026-05-07 | PaperMod fork over custom-thin theme | Faster v1; custom theme deferred until content shape is known |
| 2026-05-07 | Pagefind on Hugo content only | registry.* has its own structured search; no duplication |
| 2026-05-07 | Wordmark placeholder for logo | Real logo design deferred to a later effort, possibly with a contractor |
| 2026-05-07 | New `legendary-arena` GitHub org | Brand consistency; org transferable later if circumstances change |
| 2026-05-07 | Brand tokens hosted from this repo's `static/` | Single SoT consumed cross-origin by play.* and registry.* |

## What's locked vs. TBD

**Locked:**
- Site purpose, audience, topology
- Hosting (Cloudflare Pages, three projects)
- Theme approach (PaperMod fork, restyled)
- Repo location (`legendary-arena/legendary-arena-website`)
- Search (Pagefind, content only)
- Brand-tokens approach (externalized, shared across three sites)

**TBD (with owning effort):**
- LA brand identity — palette, type, voice, tone (WP-W002)
- Logo design (deferred; placeholder for v1)
- Site copy and content beyond home/about/first blog post (WP-W004)
- Launch date

---

## Notes for future authors

- Update this document when a decision changes — don't let it drift.
- New decisions get a row in the Decisions log with date and rationale.
- If a Work Packet is being written that contradicts something here, the
  contradiction is a flag: either the WP needs to change, or this document
  needs to change. Resolve before executing the WP.