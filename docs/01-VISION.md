# Legendary Arena Website — Vision

**Status:** v1 — decisions locked, brand identity v1 LOCKED for WWW (WP-002 + WP-003 done 2026-05-07; cross-site consumption pending WP-007a/b)
**Repo:** github.com/legendary-arena/legendary-arena-website
**Production URL:** https://www.legendary-arena.com
**Last updated:** 2026-05-07

> **Authority:** This document is the top-level vision for the marketing
> site. It is subordinate to no other document in this repo. If a conflict
> arises with a Work Packet, README, or implementation detail, this
> document wins.

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

- **Primary:** Players of the original Legendary: A Marvel Deck Building
  Game looking for a digital adaptation; deck-building game enthusiasts
  discovering LA for the first time.
- **Secondary:** Press, partners, and IP holders evaluating the project.
- **Tertiary:** Future contributors, if/when the project opens to
  outside help.

## Global invariants

These rules apply to all implementation and future changes. Violations
are bugs.

- The site remains **static-only**. No runtime APIs, no client-side data
  fetching from LA infrastructure.
- The site **does not depend on availability** of `play.*`, `registry.*`,
  or `api.*` to render or function.
- All cross-site navigation must **degrade gracefully** if a target is
  unavailable (a broken link is acceptable; a broken page is not).
- **Brand tokens** (`brand-tokens.css`) are the **single source of truth**
  for colors, typography, and spacing. No hardcoded values unless
  explicitly justified with a `// why:` comment.
- All builds must be **deterministic and reproducible locally**. The
  command that builds the site in CI must match the local command
  byte-for-byte.
- **Breaking changes to the brand token contract** require a major
  version bump AND coordinated updates to consuming sites BEFORE the new
  version publishes.
- No change may violate a locked decision without:
  - updating this document, AND
  - adding a Decisions log entry.

## Architecture — three sites, one product

Legendary Arena has three public-facing properties on three subdomains,
sharing a unified brand identity:

| Subdomain | Role | Tech |
|---|---|---|
| `www.legendary-arena.com` | Marketing landing (this repo) | Hugo, static |
| `play.legendary-arena.com` | Live game client | Vue (arena-client), static |
| `cards.barefootbetters.com` | Card registry browser (current) | Vue (registry-viewer), static |

All three are deployed independently on Cloudflare Pages with the
following guarantees:

- Each site is **fully functional in isolation** — no runtime coupling.
- Cross-site navigation is **link-based only** — no shared runtime state
  or message passing.
- **Failure of one subdomain must not degrade the others** beyond broken
  links.

A future migration of the registry from `cards.barefootbetters.com` to
`registry.legendary-arena.com` is planned to align it with the LA brand
but is **not blocking v1**. All cross-site references in v1 use
`cards.barefootbetters.com` as the canonical registry URL. The
migration will be its own scoped effort with its own WP when scheduled.

A future `api.legendary-arena.com` (Render-hosted Node server) will serve
the game backend; this site does not interact with it directly.

### Cross-site contract

The three sites share exactly one runtime artifact: brand tokens.

- **Shared asset:** `https://www.legendary-arena.com/brand-tokens.css`
- **Versioned and backward-compatible** within a major version
- **Consumers:** `play.legendary-arena.com` and the registry viewer
  (currently `cards.barefootbetters.com`; future
  `registry.legendary-arena.com`) must not assume internal structure
  beyond the documented CSS custom properties (`--la-color-*`,
  `--la-font-*`, `--la-space-*`)
- **Local fallback:** consumers SHOULD bundle a local copy of the tokens
  as a safety net for transient unavailability of www
- **Breaking changes** trigger a coordinated version bump across all
  consuming sites per Global invariants

## In scope (v1)

- **Home page** — hero, value prop, primary CTA to play.*
- **About page** — what LA is, who's behind it, project status
- **Blog** — devblog, dev journals, release notes; low cadence acceptable
- **Search** (Pagefind) — across blog/marketing content only
- **Unified header + footer** — links to play.*, registry.*, social, legal
- **Brand token contract** — colors/type/spacing source of truth for all three sites
- **Performance budget** — sub-1s LCP on the home page
- **SEO baseline** — meta tags, Open Graph, Twitter Cards, Schema.org
  JSON-LD, sitemap.xml, robots.txt, Search Console submission
  (per WP-008)

## Out of scope (v1)

Explicitly excluded:

- **Card browsing** — that's `registry.*`'s job
- **Deck building** — that's `play.*`'s job
- **User accounts / authentication** — handled by the game, not this site
- **Comments on blog posts** — moderation overhead too high for v1
- **E-commerce, merch, paid content** — not this site's job
- **Forums, community hub** — Discord or similar fills this need; site
  links out
- **In-depth player documentation** — deferred until demand is proven

## Permanent non-goals

These are explicitly out of scope for **all future versions** of this
site, not just v1:

- This site never hosts the game client.
- This site never authenticates users.
- This site never depends on live card or gameplay data (no runtime
  fetches from `registry.*` or `api.*`).
- This site never becomes a social or community platform.

## Success criteria

The site is successful at v1 if:

- **Comprehension:** A first-time visitor can answer "what is this?"
  within ~5 seconds of landing (validated via clear hero + visible CTA
  above the fold).

- **Primary CTA ("Play now"):**
  - Visible above the fold on desktop AND mobile
  - Links directly to `play.legendary-arena.com`
  - Visually dominant versus secondary actions

- **Performance:**
  - LCP ≤ 1s on broadband desktop
  - Lighthouse ≥ 90 in Performance, Accessibility, Best Practices, SEO
  - No console errors in production

- **Cross-site consistency:**
  - Visual tokens match across www, play, registry
  - No visible style drift between properties at any given token version

- **Operational:**
  - A new blog post can be added and published in ≤ 10 minutes using
    the documented workflow

## Constraints

### Technical

- **Static-only** — Hugo + Cloudflare Pages. No SSR, no DB, no runtime
  API calls.
- **No build-time data fetching** — content is markdown; no fetching
  from the registry or the game server during build.
- **Brand token contract** — `static/brand-tokens.css`, hosted from
  this repo:
  - Public, versioned, cacheable asset
  - Backward-compatible within a major version
  - Treated as an external dependency by `play.*` and `registry.*`
  - Breaking changes require version increment AND coordinated consumer
    updates (per Global invariants)
- **Theme** — PaperMod **upstream as a Git submodule**:
  - Customized via Hugo overrides (`assets/`, `layouts/`)
  - **Not forked**
  - Custom theme deferred until proven necessary
- **Build contract:**
  - Hugo build must succeed locally and in Cloudflare Pages with
    identical output
  - No environment-specific behavior or configuration branches

### Operational

- **Solo-maintained** — content cadence and infrastructure must fit a
  single-operator pace.
- **Light governance** — this repo does not adopt the engine project's
  full WP/EC system. Vision plus `03-ROADMAP.md` is sufficient.
- **Brand identity TBD** — no LA brand book exists yet. WP-002
  establishes it before WP-003 (theme restyle) can begin.
- **Failure isolation** — this site must remain fully usable even if
  `play.*` or `registry.*` is offline. Cross-site links may fail, but
  rendering, navigation, and search must not break.

## Relationships to other projects

Each row describes the **direction of dependency** — what flows where,
and what doesn't.

| Project | Relationship |
|---|---|
| **Engine monorepo** (`legendary-arena/legendary-arena`) | Source of truth for the game. This site only **markets** the engine; no code or data flows back. |
| **arena-client** (`play.*`) | **Consumes** brand tokens from this site (cross-origin link + local fallback). **No runtime dependency** on www. |
| **registry-viewer** (currently `cards.barefootbetters.com`; future `registry.legendary-arena.com`) | **Consumes** brand tokens from this site. **Owns all card data concerns**; this site never queries it. |
| **API server** (future `api.*`) | **No interaction** with this site, ever. |

## Change discipline

- Changes to the following require an update to this document AND an
  entry in the Decisions log:
  - Architecture (the three-site topology)
  - Scope (in / out / permanent non-goals)
  - Global invariants
  - Constraints (technical or operational)
  - Cross-site contract

- **Minor wording changes** (typos, clarifications that don't shift
  meaning) do not require log entries.

- Any **ambiguity** between this document and implementation must be
  **resolved before merge**. Ambiguity is a defect, not a feature.

- Conflicts between this document and `03-ROADMAP.md` are resolved by
  this document (vision is authoritative). Conflicts between this
  document and `.claude/CLAUDE.md` (project root) are resolved by
  CLAUDE.md (it's higher in the authority hierarchy).

## Decisions log

| Date | Decision | Why |
|---|---|---|
| 2026-05-07 | Separate repo from engine monorepo | Hugo content has different governance needs than engine code |
| 2026-05-07 | Subdomains over path-based hosting | Independent deploys, independent caching, cleaner failure isolation |
| 2026-05-07 | PaperMod upstream submodule + Hugo overrides (over fork or custom-thin theme) | Faster v1; overrides keep the theme upgradeable indefinitely; revised from earlier "fork" plan during WP-001 execution |
| 2026-05-07 | Pagefind on Hugo content only | registry.* has its own structured search; no duplication |
| 2026-05-07 | Wordmark placeholder for logo | Real logo design deferred to a later effort, possibly with a contractor |
| 2026-05-07 | New `legendary-arena` GitHub org | Brand consistency; org transferable later if circumstances change |
| 2026-05-07 | Brand tokens hosted from this repo's `static/` as a versioned API contract | Single SoT consumed cross-origin by play.* and registry.*; treating as a contract prevents silent cross-site breakage |
| 2026-05-07 | Strengthened vision: Global invariants, failure isolation, cross-site contract, change discipline, measurable success criteria | Convert implicit philosophy into enforceable rules; tighten cross-site guarantees; eliminate ambiguity (esp. theme + tokens) |
| 2026-05-07 | Added SEO baseline to v1 scope (WP-008) | RankMath-equivalent SEO is a baseline expectation for a public marketing site; making it explicit prevents it from being skipped or reinvented mid-project |
| 2026-05-07 | Registry remains at `cards.barefootbetters.com` for v1; migration to `registry.legendary-arena.com` deferred to a future scoped effort | Reality recognized: the registry already exists at cards.* and migration would be a substantial coordinated change. Pinning v1 on a non-blocking domain change adds risk without proportionate benefit. |
| 2026-05-07 | Karpathy LLM-wiki pattern evaluated for www; rejected. Engineering wiki spawned in engine project. Player wiki (if needed) → registry.* (per ER-016). | Marketing site scope must remain conversion-focused; wiki content would violate permanent non-goals on card/gameplay data. Reference material belongs with reference material (registry); engineering knowledge belongs with engineering code (engine project). |
| 2026-05-07 | WP-002 + WP-003 locked — brand v1 verified at www.legendary-arena.com (Lighthouse 91/100/100/100, both modes, mobile 375×667, all `palette.md §8` contrast pairs WCAG AA). Brand artifacts move from "v1 DRAFT" to "v1 LOCKED for WWW." | All Phase B exit criteria from `strategy.md §11` met except cross-site consumption (deferred to WP-007a/b). Verification surfaced and resolved a silent dark-mode selector bug, a touch-target gap, a footer contrast violation, missing favicons, and the need for an additive `--la-color-cta` token to satisfy white-on-CTA AA in dark mode — all documented in `docs/brand/CHANGELOG.md`. |
| 2026-05-07 | `docs/ai/work-packets/` adopted for session-ready WP execution prompts (not WP design specs) | Roadmap remains the design source of truth; these files are the "do this" pack a fresh Claude session reads to execute a WP. Same directory name as the engine project but lighter purpose — does NOT adopt the engine's full WP/EC governance system. First instance: `WP-004-content-scaffolding.md`. |

## What's locked vs. TBD

**Locked:**
- Site purpose, audience, architecture
- Hosting (Cloudflare Pages, three projects)
- Theme approach (PaperMod upstream submodule + overrides)
- Repo location (`legendary-arena/legendary-arena-website`)
- Search (Pagefind, content only)
- Brand-token contract (externalized, versioned, cross-origin consumable)
- Failure-isolation principle
- Global invariants
- SEO baseline (per WP-008)

**TBD (with owning effort):**
- LA brand identity — palette, type, voice, tone (WP-002)
- Logo design (deferred; placeholder for v1)
- Site copy and content beyond home/about/first blog post (WP-004)
- Migration of registry from `cards.barefootbetters.com` to `registry.legendary-arena.com` (deferred future effort; not blocking v1)
- Launch date

---

## Notes for future authors

- Update this document when a decision changes — don't let it drift.
- New decisions get a row in the Decisions log with date and rationale.
- If a Work Packet is being written that contradicts something here, the
  contradiction is a flag: either the WP needs to change, or this
  document needs to change. Resolve before executing the WP.
- Treat Global invariants as bright lines, not aspirations. If a feature
  cannot be built without violating one, the feature does not ship in
  its proposed form.
