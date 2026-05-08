# Legendary Arena Website — Enhancement Requests

**Last updated:** 2026-05-07

> **Authority:** This document is a triage queue for ideas. It is
> subordinate to `01-VISION.md` and `03-ROADMAP.md`. Items here are
> **not committed work** — they're candidates for promotion to a WP, or
> for explicit rejection, or for parking.

---

## How this list works

- Ideas accumulate here as they come up.
- Each idea gets a **triage note** explaining its current disposition.
- Ideas that become real work get **promoted** to `03-ROADMAP.md` as a
  new WP, and the entry here is marked 🆕 with the WP ID.
- Ideas that won't be done are **rejected** with rationale.
- Ideas worth doing eventually but not now are **parked** with a note
  about what would unblock them.

This file is informal compared to vision.md and roadmap.md. It exists
to prevent ideas from being lost between sessions, not to commit to
anything.

## Scope protection

This document must not:

- Redefine scope already locked in `01-VISION.md` or `03-ROADMAP.md`
- Introduce implementation details that bypass WP creation
- Function as an alternate planning system

All execution-level work must live in Work Packets only. ERs feed into
WPs through promotion; they never become WPs by accident.

## Entry contract

Each Enhancement Request (ER) must:

- Describe a **user-facing outcome or capability**, not just a tool or
  implementation detail
- Be **independent** of other ideas (not implicitly bundled)
- Include enough context to understand the intent without external
  explanation

Avoid:

- Pure implementation notes ("add CSS class X")
- Duplicates of existing WPs without new scope
- Ideas that violate vision constraints — these should be rejected
  immediately rather than triaged

## Promotion criteria (ER → WP)

An ER may be promoted to a Work Packet only if:

- Scope is clearly defined and bounded
- Dependencies are understood
- It does not conflict with the vision
- It produces a concrete deliverable

Promotion produces:

- A new WP in `03-ROADMAP.md` with full DoD, exit criteria, and rollback
- An update to this ER marking it 🆕 **Promoted** with the WP ID and
  resolution date

## Status legend

- 📥 **New** — captured, not yet reviewed
- 🔄 **Triaging** — under evaluation; disposition unclear
- ✅ **Covered** — already implemented or planned (no action)
- 🆕 **Promoted** — converted to a WP (reference WP ID)
- 🛌 **Parked** — deferred; revisit when conditions change
- ❌ **Rejected** — will not be done (with rationale)

## Disposition values

The **Disposition** field separates state from decision:

- **Covered** — exists in vision/roadmap; no new work
- **Promote** — becomes (or has become) a WP
- **Park** — defer; conditions for revisit noted
- **Reject** — will not be done; rationale noted

## Priority values

Initial estimate at triage time; can change.

- **Low** — nice-to-have; no schedule pressure
- **Medium** — should happen, but not blocking anything
- **High** — foundational or unblocking other work

---

## Items

### ER-001 — Configure global header and footer

**Status:** ✅ Covered
**Disposition:** Covered
**Priority:** Medium
**Created:** 2026-05-07
**Last triaged:** 2026-05-07

**Idea:** Site-wide header and footer with brand styling and unified
navigation across www, play, and registry.

### Triage

- **Header/footer styling** is part of **WP-003** (Apply LA brand via
  theme overrides). PaperMod provides header/footer out of the box;
  W003's job is making them match LA brand.
- **Header/footer content** (nav links, social, legal) is part of
  **WP-004** (Content scaffolding). The unified cross-site nav (links
  to play.*, registry.*) is in scope there.
- **Cross-site brand consistency** of the header/footer across all
  three sites is enforced by the brand token contract (per Global
  invariants in vision.md).

### Vision alignment

✅ Fully compliant:
- Static-only (no SSR needed)
- Cross-site consistency aligns with the architecture
- Brand-token contract enforces visual unity

### Decision

Covered by existing WPs (WP-003 + WP-004). No new WP needed.

**Action:** None.

---

### ER-002 — Implement search feature

**Status:** ✅ Covered
**Disposition:** Covered
**Priority:** Medium
**Created:** 2026-05-07
**Last triaged:** 2026-05-07

**Idea:** Search across site content (blog posts, marketing pages).

### Triage

This is **WP-005** (Pagefind search integration) in the roadmap.
Already scoped to "Hugo content only" per the cross-site contract —
registry.* has its own card search.

### Vision alignment

✅ Fully compliant:
- Static (Pagefind runs at build time; search runs client-side)
- Scope respects cross-site contract (no card-data indexing)
- No runtime API dependency

### Decision

Already a WP (WP-005). No new WP needed.

**Action:** None.

---

### ER-003 — Create blog index

**Status:** ✅ Covered
**Disposition:** Covered
**Priority:** Low
**Created:** 2026-05-07
**Last triaged:** 2026-05-07

**Idea:** A page listing all blog posts.

### Triage

Hugo automatically generates a blog index when you have
`content/posts/` populated. PaperMod renders it as a paginated post
list. No custom work required — once **WP-004** lands its first blog
post, the index page comes for free at `/posts/`.

### Vision alignment

✅ Fully compliant:
- Static, Hugo-native
- No runtime data dependency

### Decision

Covered automatically by Hugo + PaperMod once WP-004 lands content.

**Action:** Verify the index renders correctly as part of WP-004's DoD.

---

### ER-004 — Create blog post

**Status:** ✅ Covered
**Disposition:** Covered
**Priority:** Low
**Created:** 2026-05-07
**Last triaged:** 2026-05-07

**Idea:** Add blog posts.

### Triage

- The **first** blog post is a deliverable of **WP-004**.
- **Ongoing** blog posts are content work, not WPs. The whole point of
  the Hugo + Pagefind workflow is that adding a post is a 10-minute
  operation (per vision.md success criteria), not a project.

### Vision alignment

✅ Fully compliant:
- Aligns with vision.md operational success criterion
  ("publishing a blog post is a 10-minute operation")

### Decision

First post covered by WP-004; ongoing posts are content work,
explicitly out of WP scope.

**Action:** None for the first post (in WP-004). For ongoing posts,
follow the workflow once `04-CONTENT-CONVENTIONS.md` exists (also a
WP-004 deliverable).

---

### ER-005 — Branding recognized by Claude and Hugo

**Status:** ✅ Covered
**Disposition:** Covered
**Priority:** High
**Created:** 2026-05-07
**Last triaged:** 2026-05-07

**Idea:** Brand identity (colors, logo, typography, type scale H1–H6,
etc.) in a form that both Claude (AI assistant) and Hugo (build tool)
can consume.

### Triage

This is **WP-002** (LA brand definition) in the roadmap. The
deliverables already split into two consumption paths:

| Consumer | What they read |
|---|---|
| **Claude** (AI) | `docs/brand/strategy.md`, `palette.md`, `typography.md`, `spacing.md` — plain markdown, Claude reasons about it directly |
| **Hugo** (build) | `static/brand-tokens.css` — CSS custom properties consumed by `assets/css/extended/custom.css` |

The **markdown docs are the authoritative source**; the CSS file is
maintained from them. A future Claude session can read the markdown
docs and propose styling changes that respect the brand without me
having to re-explain it each time.

**DoD clarifications applied to WP-002 (2026-05-07):**

- Added constraint: brand docs (`docs/brand/*.md`) are written for both
  human and AI consumption — explicit hex values, named tokens, usage
  rules, no reliance on visual references alone.
- Strengthened typography deliverable: complete type scale (H1, H2, H3,
  H4, H5, H6, body, small) with sizes, line heights, weights, and named
  CSS custom properties (`--la-font-size-h1`, etc.).
- DoD checkbox added: `--la-font-size-*` and `--la-line-height-*`
  tokens for the full type scale must be in `brand-tokens.css`.

### Vision alignment

✅ Fully compliant:
- Brand-token contract is core to the vision (single SoT for color,
  type, spacing across all three sites)
- Machine-readable brand docs reinforce the cross-site contract

### Decision

Covered by WP-002 with DoD clarifications applied 2026-05-07.

**Action:** Done.

---

### ER-006 — Create site map for the website

**Status:** 🔄 Triaging — split into two distinct features
**Disposition:** Mixed (Covered + Park)
**Priority:** Low
**Created:** 2026-05-07
**Last triaged:** 2026-05-07

**Idea:** A sitemap for the site.

### Triage

"Sitemap" is ambiguous and must be disambiguated into two distinct
features:

| Type | Purpose | Status |
|---|---|---|
| `sitemap.xml` | Machine-readable, for search engines (Google, Bing). Submitted to Search Console. | ✅ Hugo generates this automatically. Live once WP-006 deploys; verified in WP-008. |
| `sitemap.html` (or `/sitemap/`) | Human-readable site index. Useful when site has many pages and search isn't enough. | 🛌 Parked — overkill for v1 (3 pages). |

For SEO, `sitemap.xml` is what matters and it's free with Hugo.

For human navigation, a "site map page" is genuinely useful for large
content sites — but at 3 pages, the header nav covers it. Worth adding
when content grows.

### Vision alignment

✅ Fully compliant:
- Both interpretations are static (no runtime dependency)
- `sitemap.xml` is part of WP-008 (SEO baseline) verification

### Decision

- **`sitemap.xml`:** Covered (Hugo built-in; verified as part of WP-008)
- **Human sitemap:** Parked. **Revisit when:** site has 20+ pages OR
  user feedback indicates header nav isn't sufficient

**Action:**
- For `sitemap.xml`: no work needed; verified in WP-008 DoD
- For `sitemap.html`: park; revisit when content count justifies it

---

### ER-007 — Implement SEO (RankMath equivalent)

**Status:** 🆕 Promoted to WP-008
**Disposition:** Promote
**Priority:** High
**Created:** 2026-05-07
**Last triaged:** 2026-05-07
**Resolution date:** 2026-05-07

**Idea:** Implement SEO best practices on the site, modeled on what
RankMath provides for WordPress.

### Triage

Confirmed by user 2026-05-07: "randmath.com" was a typo for **RankMath**
(rankmath.com), the WordPress SEO plugin. **RankMath itself is
WordPress-only and cannot be used on Hugo.** WP-008 delivers the
Hugo-native equivalent baseline.

#### What RankMath does, mapped to Hugo + PaperMod equivalents

| RankMath feature | Hugo / PaperMod equivalent | Status |
|---|---|---|
| Meta title + description per page | Front-matter `title` + `description`; PaperMod renders | ✅ Built-in |
| Open Graph tags (Facebook/LinkedIn previews) | PaperMod has built-in OG support via front-matter | ✅ Built-in |
| Twitter Card tags | PaperMod built-in | ✅ Built-in |
| Schema.org JSON-LD (rich snippets) | Custom Hugo template (partial) — not built-in | 🆕 New work |
| XML sitemap | Hugo generates `sitemap.xml` automatically | ✅ Built-in |
| robots.txt | Hugo generates from `robots.txt` template; we already set `enableRobotsTXT = true` | ✅ Built-in |
| Canonical URL tags | PaperMod handles (we set `canonifyURLs = true`) | ✅ Built-in |
| Breadcrumbs (visual + Schema) | PaperMod has visual breadcrumbs; Schema breadcrumbs need custom partial | 🆕 New work for Schema |
| Image alt-text checking | Manual / linter; no equivalent built-in | 🛌 Discipline matter, not tooling |
| Keyword analysis / scoring | RankMath proprietary; no direct Hugo equivalent | ❌ Not portable; manual content review serves the same purpose |
| Internal link suggestions | RankMath proprietary; no direct equivalent | ❌ Not worth replicating |
| Search Console integration | Direct submission via Google Search Console UI; no plugin needed | ✅ Operational task |
| 404 monitoring | Cloudflare Pages analytics or external tool | 🛌 Post-launch |
| Redirects manager | Cloudflare Pages `_redirects` file or rules | ✅ Operational |

### Vision alignment

✅ Fully compliant:
- Static-only (all SEO features are build-time or static)
- No runtime API dependency
- Doesn't violate failure isolation — sitemap, OG tags, Schema all
  resolve at build time

⚠️ Constraint:
- Avoid over-engineering beyond v1 baseline. Specifically: no
  proprietary scoring, no AI keyword tools, no link-suggestion ML.

### Decision

Promoted to **WP-008: SEO baseline + Schema.org markup** in
`03-ROADMAP.md` (2026-05-07). See WP-008 for full scope, DoD, exit
criteria, and rollback.

**Action:** Done. Promoted to WP-008 with full Hugo-equivalent scope
documented there.

---

### ER-008 — Cross-site navigation hardening (cards.* + future registry.*)

**Status:** ✅ Covered
**Disposition:** Covered
**Priority:** High
**Created:** 2026-05-07
**Last triaged:** 2026-05-07
**Resolution date:** 2026-05-07

**Idea:** Define a canonical cross-site link contract that handles
current reality (registry currently lives at
`cards.barefootbetters.com`) AND the future
`registry.legendary-arena.com` plan from vision.md.

### Triage

Vision-vs-reality gap resolved 2026-05-07: vision.md updated
(**Path B — Acknowledge**) to recognize `cards.barefootbetters.com`
as the canonical registry URL for v1, with migration to
`registry.legendary-arena.com` deferred as a future scoped effort.

With the canonical URL now defined in vision.md, the cross-site link
work is absorbed by existing WPs:

- **WP-003** (theme overrides) — header/footer nav links to `cards.*`
- **WP-004** (content) — header/footer link text references `cards.*`
- **WP-007b** (registry brand integration) — updated to target
  `cards.barefootbetters.com` instead of `registry.legendary-arena.com`

The optional "subdomain switchboard" footer note (one sentence
explaining the registry URL is `cards.barefootbetters.com` until
migration) can be added as a content choice during WP-004.

### Vision alignment

✅ Resolved. Path B (Acknowledge) chosen 2026-05-07. Vision.md now
explicitly captures `cards.barefootbetters.com` as the v1 canonical
registry URL with migration deferred.

### Decision

Covered by vision.md update + existing WP-003 / WP-004 / WP-007b.
No new WP needed.

**Action:** Done.

---

### ER-009 — Custom 404 page + lost-user recovery flow

**Status:** 📥 New
**Disposition:** Promote (candidate)
**Priority:** Medium
**Created:** 2026-05-07
**Last triaged:** 2026-05-07

**Idea:** Replace PaperMod's default 404 with a branded recovery page
offering top actions ("Play now", "Open Registry", "Read About"),
search input (if WP-005 has landed), and a list of popular pages.

### Triage

Hugo work: create `layouts/404.html` to override the theme. PaperMod
has a basic 404; customizing is straightforward static template work.
High-ROI UX for stale links, social shares, and indexed-then-moved
pages.

### Vision alignment

✅ Fully compliant:
- Static-only (404 is a build-time HTML page)
- No runtime data dependency
- Brand-consistent (uses tokens)
- Reinforces failure-isolation: a missing page still routes the user
  to working destinations

### Decision

Promote-candidate. Best sequencing: after WP-005 (so search input
can be embedded). Acceptable: after WP-004 without search.

**Action:** Promote to a new WP after WP-005 lands.

---

### ER-010 — Press kit / media kit page

**Status:** 📥 New
**Disposition:** Promote (candidate)
**Priority:** Medium
**Created:** 2026-05-07
**Last triaged:** 2026-05-07

**Idea:** A `/press/` page with downloadable assets: project
description (1–2 paragraphs), wordmark/logo, screenshot pack, facts
list (platform, tech, status, links), and contact method.

### Triage

Serves vision.md's secondary audience explicitly ("Press, partners,
and IP holders evaluating the project"). All content is static,
assets are stored in repo. Works as a single Hugo page or section.

### Vision alignment

✅ Fully compliant:
- Static, no runtime data
- Serves named audience tier
- Uses brand tokens for visual consistency

### Decision

Promote-candidate. Sequencing: after WP-002 (tokens for branded
assets) + WP-004 (content patterns established).

**Action:** Promote to a new WP after WP-004.

---

### ER-011 — Registry landing page on www (no live data)

**Status:** 📥 New
**Disposition:** Promote (candidate)
**Priority:** Medium
**Created:** 2026-05-07
**Last triaged:** 2026-05-07

**Idea:** A `www` page (e.g., `/registry/`) acting as the registry
portal: explains what the registry is, provides curated entry links
to `cards.barefootbetters.com` ("Browse by set", "Search cards",
etc.), and documents stable deep-link conventions.

### Triage

This is the best "bridge" between marketing and registry without
violating the "no runtime data" constraint. Pure content + a curated
link list. Also doubles as documentation for stable deep links,
reducing future refactor pain on the registry side (especially
relevant once registry migration to `registry.legendary-arena.com`
happens — this page becomes the authoritative source for stable URL
patterns).

ER-008 resolved 2026-05-07; cards.* is canonical for v1. This ER
unblocks.

### Vision alignment

✅ Static, no runtime data fetching. Aligns with vision.md's
failure-isolation principle (this page renders even if cards.* is
offline; the curated links may break, but the page itself does not).

### Decision

Promote-candidate. Sequencing: after WP-004 (content patterns
established).

**Action:** Promote to a new WP after WP-004 lands.

---

### ER-012 — Getting Started / How to Play quickstart page

**Status:** 📥 New
**Disposition:** Triaging — vision interpretation needed
**Priority:** Medium
**Created:** 2026-05-07
**Last triaged:** 2026-05-07

**Idea:** A single page answering: what is LA in plain language? How
does a session work at a high level? What does a new player click
first? Where to learn more? Common questions ("Is this official?",
"Do I need an account?").

### Triage

Marketing pages convert better when they remove hesitation. Home/About
say *what* and *who*; this page would say *how* and *what to expect*.
Reduces bounce, improves conversion to play.*.

### Vision alignment

⚠️ **Potential conflict** with vision.md "Out of scope (v1)":
*"In-depth player documentation — deferred until demand is proven."*

Two interpretations:

- **Strict:** Any player-facing documentation is deferred. This ER is
  parked.
- **Pragmatic:** "In-depth docs" = full rules / mechanics / reference.
  "Getting Started" = orientation / first-five-minutes / conversion
  content. Different things; the ER is in scope.

Recommended: pragmatic interpretation, captured as a vision.md
clarification.

### Decision

Triaging. If pragmatic interpretation accepted: Promote-candidate.
If strict: Park until in-depth docs are also unblocked.

**Action:** Discuss interpretation with user; either update vision.md
to clarify the distinction, or park the ER. If accepted, sequence
after WP-004 or fold into WP-004 as a fourth page.

---

### ER-013 — Open Graph share-image baseline

**Status:** 📥 New
**Disposition:** Promote (candidate; possibly fold into WP-008)
**Priority:** Medium
**Created:** 2026-05-07
**Last triaged:** 2026-05-07

**Idea:** Curated Open Graph share images (1200×630 PNG) per page
type — a default site image, a home image, optional per-post images
for blog posts. Social share previews that look intentional.

### Triage

Distinct from WP-008. WP-008 covers OG **meta tags** (the metadata).
This ER covers OG **images** (the actual PNG files):

- **WP-008 deliverable:** front-matter `image` fields, PaperMod's OG
  tag rendering
- **ER-013 deliverable:** actual PNG files in `static/`, designed to
  brand

Two paths:

- Fold into WP-008 (image creation becomes a WP-008 deliverable)
- Promote as a separate WP (after WP-002 brand + WP-008 tags)

### Vision alignment

✅ Fully compliant:
- Static (PNG files served from `/static/`)
- Brand-consistent (uses tokens for design)
- No runtime data dependency

### Decision

Promote-candidate. Recommend folding into WP-008 unless the image-
design work feels substantial enough to warrant its own WP (would
depend on whether you're commissioning images or generating them).

**Action:** Promote, with the fold-vs-separate question to be decided
when WP-008 is opened for execution.

---

### ER-014 — Accessibility + keyboard navigation baseline

**Status:** 📥 New
**Disposition:** Promote (candidate)
**Priority:** High
**Created:** 2026-05-07
**Last triaged:** 2026-05-07

**Idea:** Establish an accessibility baseline beyond Lighthouse:
keyboard-navigable header and menus, visible focus rings (brand-
consistent), color contrast verified in both light/dark modes,
skip-to-content link, basic ARIA labels where needed.

### Triage

Vision.md's Global invariants require Lighthouse ≥ 90 in
Accessibility. Lighthouse catches roughly 30% of accessibility issues
— it's a floor, not a ceiling. A real audit adds:

- Manual keyboard testing (Tab through every page)
- Focus ring visibility against brand colors
- Screen reader smoke test (NVDA or VoiceOver, one major flow)
- Skip-to-content link
- Contrast pass in both modes

Pairs naturally with WP-002 (tokens) + WP-003 (overrides) — contrast
becomes enforceable once tokens are defined and applied.

### Vision alignment

✅ Reinforces the "Performance + accessibility floor" Global invariant.
Strengthens it from "Lighthouse passes" to "actual audit."

### Decision

Promote-candidate. Sequence after WP-003 (theme overrides) so the
audit happens against the actual styled site, not generic PaperMod.

**Action:** Promote to a new WP after WP-003 lands.

---

### ER-016 — Player wiki (deferred; future home = registry.*)

**Status:** 🛌 Parked
**Disposition:** Park
**Priority:** Low (post-launch consideration)
**Created:** 2026-05-07
**Last triaged:** 2026-05-07

**Idea:** A player-facing wiki covering game mechanics, rules, cards,
heroes, glossary — modeled on Andrej Karpathy's LLM Wiki pattern.

### Triage

Evaluated as a candidate for `www.legendary-arena.com` on 2026-05-07.
**Rejected for www scope** — would violate vision.md permanent
non-goals on card / gameplay data, and would conflate marketing-site
purpose (conversion to play.*) with reference-site purpose
(documentation lookup).

Two related decisions captured here for audit trail:

1. **Engineering wiki** (different audience, different home):
   internal docs for engineers working on the engine project. Lives
   in the **engine project repo** at `docs/wiki/`. Spawned as a
   separate session on 2026-05-07 with its own self-contained Claude
   prompt. Not part of this repo, not part of any subdomain. Pure
   internal documentation.

2. **Player wiki** (this ER): if/when player-facing wiki content is
   needed, the canonical home is **registry.legendary-arena.com**
   (current `cards.barefootbetters.com`), extending the registry
   from "card browser" to "reference hub." Reasons:
   - Players already go to the registry for reference material
   - Cards + mechanics + rules belong together (cross-linked)
   - Avoids spinning up a 4th subdomain and 4th deploy
   - Single tech stack and identity for reference content
   - Putting it on `play.*` was rejected: mixes game-client
     lifecycle with documentation lifecycle (different audiences,
     different update cadences, SPA hurts SEO)

### Vision alignment

✅ Compliant with deferral:
- Vision.md "Out of scope (v1)" lists "In-depth player documentation
  — deferred until demand is proven"
- Vision.md "Permanent non-goals": "This site never depends on live
  card or gameplay data" — preserved by parking on www
- Cross-site contract still applies: future wiki on registry.*
  consumes `brand-tokens.css` from www

### Decision

**Park** until conditions for revisit are met:

- Player questions accumulate (forum threads, support emails) that a
  wiki would actually answer
- Demand for in-depth game documentation is **demonstrated**, not
  assumed
- Marketing site is live and stable (post-WP-006)
- Engine project's `docs/wiki/` (engineering wiki) is in use,
  providing potential content seeds for player-facing extraction

When revisited, **canonical home is registry.\*** (current cards.*),
NOT a separate `wiki.*` subdomain or part of `play.*`.

### Out of scope for this ER

- Karpathy LLM-wiki pattern as applied to www → rejected per
  evaluation 2026-05-07; tracked in vision.md Decisions log
- Engineering wiki → separate effort, engine-project scope, not
  tracked here

**Action:** Park. Revisit when conditions above are met.

---

## Summary table

| ID | Title | Status | Disposition | Priority |
|---|---|---|---|---|
| ER-001 | Global header and footer | ✅ Covered | Covered | Medium |
| ER-002 | Search feature | ✅ Covered | Covered | Medium |
| ER-003 | Blog index | ✅ Covered | Covered | Low |
| ER-004 | Create blog post | ✅ Covered | Covered | Low |
| ER-005 | Branding readable by Claude + Hugo | ✅ Covered | Covered | High |
| ER-006 | Sitemap (xml vs html) | 🔄 Triaging | Mixed | Low |
| ER-007 | SEO (RankMath equivalent) | 🆕 Promoted | Promote | High |
| ER-008 | Cross-site nav hardening (cards.* vs registry.*) | ✅ Covered | Covered | High |
| ER-009 | Custom 404 + recovery flow | 📥 New | Promote | Medium |
| ER-010 | Press kit / media kit page | 📥 New | Promote | Medium |
| ER-011 | Registry landing page on www (no live data) | 📥 New | Promote | Medium |
| ER-012 | Getting Started / How to Play quickstart | 📥 New | Triaging | Medium |
| ER-013 | Open Graph share-image baseline | 📥 New | Promote | Medium |
| ER-014 | Accessibility + keyboard nav baseline | 📥 New | Promote | High |
| ER-016 | Player wiki (deferred; future home = registry.*) | 🛌 Parked | Park | Low |

## Summary integrity rules

- Every ER in the **Items** section MUST appear in the Summary table.
- Status, disposition, and priority in the table MUST match the entry.
- The table is updated as part of any triage change. Failing to update
  the table is a defect, not a stylistic miss.

---

## How to add new ideas to this file

1. Append a new `ER-NNN` entry at the bottom of the **Items** section
2. Use the next sequential number
3. Use the standardized template (below)
4. Mark it 📥 **New** with **Disposition: TBD** until first triage
5. Triage during your next planning pass: promote, park, or reject
6. Update the Summary table

Do not delete entries when they're done — change their status. The
audit trail (what we considered, when, and why we decided) is more
valuable than a clean list.

### ER template

```md
### ER-NNN — Title

**Status:** 📥 New
**Disposition:** TBD
**Priority:** Low / Medium / High
**Created:** YYYY-MM-DD
**Last triaged:** —

**Idea:** 1–2 sentence description of the user-facing outcome.

### Triage

(Filled in during first triage pass.)

### Vision alignment

(✅ / ⚠️ / ❌ with explanation. Filled in during triage.)

### Decision

(Covered / Promote / Park / Reject + rationale.)

**Action:**
(Concrete next step or "None".)
```
