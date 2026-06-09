# WP-023 — Diorama product-line landing page (`/diorama/`)

**Type:** Site change (new marketing section page)
**Status:** ⏭️ Up next — catalogued in `03-ROADMAP.md` (WP-023)
**Depends on:** WP-010 (site nav/chrome), WP-014 (section-override
pattern precedent), WP-015 (newsletter capture mechanism)
**Est. effort:** ~half-day–1 day
**Pre-flight:** **Required** before execution — this WP adds a new
top-level section (a `01.4` gate). See §Governance & references.

---

## Context

The diorama / STEM-kit product line is spec'd in
`docs/product/` — `diorama-master-plan.md` (canonical: product,
components, tiers, STEM curriculum, BOM) and
`diorama-gtm-and-resourcing.md` (ICP, positioning one-liners,
time-phased roadmap, break-even). Its placement boundary is recorded
in `01-VISION.md` Decisions log (2026-06-08): **the website's job is to
market and sell the line, not to build it.**

This WP delivers the first website surface for that line: a dedicated
`/diorama/` landing page that tells the story and captures demand. It
is the marketing front door — product pages, shop wiring, and the
ICP email funnel are separate follow-on slices (see §Out of scope).

**Timing reality (load-bearing):** per the GTM roadmap, the Starter
Kit is not available for sale until ~May 2027; a working prototype
doesn't exist until ~Nov 2026. The page therefore **captures demand**
(waitlist via the existing newsletter mechanism) rather than selling.
It must not imply a finished, purchasable product, and must not use
fabricated product photography.

## Governance & references

Execution is bound by the reusable governance templates in
`docs/ai/REFERENCE/`. Pertinent docs and the obligation each imposes on
this WP:

- **`01.4-pre-flight-invocation.md` — pre-flight is MANDATORY.** This WP
  introduces a **new top-level section/page** (`/diorama/`,
  `content/diorama/_index.md`) and may touch `hugo.toml` (the optional
  nav entry) — both are §"When Pre-Flight Is Required" gates. Pre-flight
  is **step 1**: author it from the doc's template and reach a
  `READY` / PASS verdict **before** the execution session starts; a
  `NOT READY` verdict blocks execution. Per its §Workflow Position, the
  execution session is a **new** Claude Code session — not the one that
  authors the pre-flight. The artifact lands in `docs/ai/pre-flights/`.
- **`01.0-pre-drafting-hygiene.md` — run the gate before drafting.**
  Confirm cwd is the marketing repo, you are inside its git tree, origin
  points at `legendary-arena/legendary-arena-website`, and the
  no-parallel-draft-starts rule holds. STOP at the first FAIL.
- **`01.3-commit-hygiene.md` — `WP-023:` prefix; no content lane.** The
  page is **site-affecting and out-of-content-lane** (it adds
  `layouts/diorama/`, edits `assets/css/extended/custom.css`, and adds
  non-image `static/images/diorama/` assets alongside `content/`), so
  every commit MUST use the `WP-023:` prefix — `FIX:` / `POST:` are
  hook-rejected for these paths. Commit at logical milestones; subjects
  are present-tense and specific (no forbidden patterns).
- **`01.8-claude-code-hooks.md` — the enforcing harness.** The
  `commit-msg` + `pre-commit` hooks that enforce `01.3`, and the
  SessionStart branch-prune ritual, are wired per this doc. Do not
  bypass hooks; if one fails, fix the cause rather than skipping it.
- **`01.2-bug-handling.md` — conditional.** If a pre-existing defect
  surfaces mid-build (an already-shipped brand failure mode, a broken
  link, a console error), follow its diagnosis-before-fix protocol
  rather than patching blindly. Not otherwise in play for a greenfield
  feature.

Authority order (highest first): `01-VISION.md` → `03-ROADMAP.md` →
`04-CONTENT-CONVENTIONS.md` → the REFERENCE docs above. On any conflict,
higher authority wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. (The physical/firmware/curriculum build is
out of this repo entirely — see §Out of scope.)

## Scope (in)

- A new section page at `/diorama/` with a section-scoped layout
  override, mirroring the `/brand/` pattern (WP-014).
- Marketing narrative drawn from the product docs: the model-railroad
  problem, the Saturday Project, the build experience, the tiers, and
  the STEM angle — at altitude, not the full spec.
- Primary CTA = **demand capture** (waitlist) through the existing
  newsletter signup (WP-015). Secondary CTA = read the story / explore
  (internal links only).
- Section-scoped CSS in `assets/css/extended/custom.css`, tokens only.
- Front-matter + SEO compliance (per `04-CONTENT-CONVENTIONS.md` and
  `05-SEO-CONVENTIONS.md`), including the Schema.org partial.
- Placeholder/illustrative imagery only, with honest alt text.

## Files to create / change

| File | Change |
|---|---|
| `content/diorama/_index.md` | **New.** Section page; `url: "/diorama/"`, front-matter + body copy (sections below). |
| `layouts/diorama/list.html` | **New.** Section-scoped override of PaperMod `list.html`, wrapping rendered content in `<div class="diorama-page">`. Copy the shape of `layouts/brand/list.html` verbatim and swap the wrapper class; drop the child-page iteration block (the section has no child pages in this WP). |
| `assets/css/extended/custom.css` | **Append a new numbered section** (next free §N) scoped under `.diorama-page`. All color/spacing/type via `var(--la-*)` tokens — no raw hex, no ad-hoc px scale. |
| `static/images/diorama/` | **New.** Placeholder hero + section imagery (SVG or compressed WebP ≤ 200 KB per `04-CONTENT-CONVENTIONS.md §Image storage`). Concept/illustrative only until a prototype exists. |
| `hugo.toml` | **Optional, decision required.** Add a `[[menu.main]]` entry for `/diorama/` only if it should sit in the primary nav now. Default: **defer** (link from home/footer first; promote to main nav in a later WP once the page has real product depth). |

## Page content outline

Lead with the **transformation**, then the mechanism, then the proof,
then the ask. Sections (each an anchored `##`):

1. **Hero** — the one-line promise. A bookshelf world you build
   together in an afternoon. Primary CTA (waitlist) above the fold.
2. **The model-railroad problem** — the unmet desire to build a
   miniature world, minus the dedicated room. (`master-plan §2`.)
3. **The Saturday Project** — the build *is* the product; the memory,
   not the box. Parent/child, friend/friend. (`master-plan §1`, §9.)
4. **What's in the kit** — frame, magnetic rigging, LEDs, optional
   Pi-driven light/sound/motion — at a glance, not a BOM.
   (`master-plan §4`, §9.)
5. **Learn by building (STEM)** — the modern Heathkit angle; mechanical
   + electrical + programming through something you want to display.
   (`master-plan §10`.)
6. **Tiers (preview)** — Starter / Complete / Premium at indicative
   price points, clearly framed as *coming*, not for sale.
   (`master-plan §9 Product Tiers`.)
7. **Waitlist** — restate the primary CTA; capture the ICP.

## StoryBrand (SB7) alignment

The page follows the StoryBrand (SB7) framework: the **customer is the
hero**, Legendary Arena is the **guide**. This is a hard contract so the
copy cannot drift into feature-dump or hobby-speak. It binds the seven
sections above to SB7 roles and defines the conversion tests the DoD
checks. Where this section and §Brand/voice constraints overlap, both
apply; neither relaxes the other.

### SB7 → section mapping (no drift)

| SB7 element | Lives in | Contract |
|---|---|---|
| Character (hero) | Hero | The hero is a cold reader with no Marvel/hobby familiarity |
| Problem | §2 | External + internal + philosophical — never technical |
| Guide | §3–§5 | Legendary Arena is the enabler, never the hero |
| Plan | §3–§4 | The Saturday Project + the kit structure |
| Call to action | Hero + §7 | One CTA, repeated verbatim |
| Success | Hero + §3 | A memory / relationship outcome, not a product outcome |
| Failure (implicit) | §2 | Lost time; unfinished projects; the hobby you gave up |

**Rule:** every paragraph maps to exactly one SB7 element. A paragraph
that maps to none is out of scope — cut it. No section introduces
product features before the Plan (§4).

### Per-section copy contracts

1. **Hero (Character + Success + CTA).** Transformation outcome (a
   memory, not an object); zero jargon; no kit components; CTA visible
   immediately. **Forbidden:** feature words (LED, frame, magnetic),
   hobby words (miniatures, terrain). Test: a non-hobby parent gets it
   in three seconds.
2. **Problem.** All three layers — external ("you want a miniature
   world"), internal ("but no space or time"), philosophical ("you
   shouldn't need a dedicated room"). One sentence must name
   **frustration**; one must name **abandonment / the unfinished
   attempt**. Fails if it reads like a product-category description, or
   offers a solution before the empathy lands.
3. **The Saturday Project (Guide + Success) — the differentiator.**
   Reframe product → experience; use a time boundary ("an afternoon",
   "a Saturday"); anchor to a relationship (grandson / family). The
   shift is "spend time together building something real," not "build a
   diorama." Fails if it reads like a DIY guide or lists steps instead
   of an outcome.
4. **What's in the kit (Plan) — a confidence layer, NOT a feature
   dump.** Each element is Outcome → Mechanism → Simplicity ("everything
   stays aligned" → magnetic rigging; "it comes alive" → LEDs). Max 4–6
   elements. The Pi is optional, not core; no acronyms to decode. Fails
   if it reads like a BOM or introduces complexity-fear.
5. **STEM (Guide credibility) — justification, not the pitch.**
   "Learning happens while they build," not "an educational product."
   The parent buys the memory; STEM removes the guilt. Fails if it
   reads like a curriculum or a school pitch.
6. **Tiers (Plan clarity) — remove uncertainty, don't sell.** Clearly
   labeled *coming*; show progression (Starter → Complete → Premium).
   **Forbidden:** persuasive pricing, urgency signals. Fails if it
   feels transactional or implies availability.
7. **Waitlist (CTA).** CTA text identical to the hero; one action only;
   no alternative paths. Reinforce "be first" / "we'll tell you when
   it's ready." Fails if it adds friction (multiple options,
   disclaimers) or changes the CTA wording.

### SB7 compliance tests (DoD gates)

1. **Caveman test** — Hero + section headers alone still convey who,
   the problem, the outcome, and the action.
2. **Delete-the-kit test** — remove §4 entirely and the page still
   converts. If it can't, the copy is feature-dependent → fail.
3. **No-Marvel test** — delete every Marvel reference and the page
   stays fully coherent (the §Brand/voice "no required Marvel
   familiarity" rule, made mechanical).
4. **One-sentence test** — the page reduces to: "This page is about
   ___ for people who ___ so they can ___." If that sentence is not
   obvious from the copy, SB7 is broken.
5. **CTA-consistency test** — distinct CTA phrases in the rendered page
   MUST equal exactly 1.

### Highest drift risks

- **§4** drifting to a feature/maker dump → enforce Outcome → Mechanism.
- **STEM** becoming the primary value prop → demote to justification.
- **Tiers** sliding into selling → "preview only," no urgency.
- **CTA** varying via subtle wording → one locked string everywhere.

## CTA / funnel behavior

- **Primary CTA → newsletter waitlist.** Reuse the WP-015 signup
  mechanism (`assets/js/newsletter.js` + existing markup); do not build
  a second capture path. CTA label must satisfy the `strategy.md §2`
  contract (≤ 2 words, single verb) — propose `Get notified` or
  `Join waitlist`; pin one in the build.
- **ICP segmentation** (tagging diorama-interested subscribers in
  Brevo so they can be marketed to separately) is **funnel work, not
  this WP.** If the capture needs a list/tag distinct from the general
  newsletter, that's a dependency to raise against a funnel WP
  (extends WP-018/020) — flag it, don't build Brevo automation here.
- **Secondary CTAs are internal links only** (e.g. a future
  `/posts/` build-story tag, the home page). No outbound, no
  "buy" button until products exist.

## Brand / voice constraints (hard)

These are bright lines from `04-CONTENT-CONVENTIONS.md §Brand failure
modes` and `docs/brand/strategy.md`. Violations are bugs, not taste:

- **No required Marvel familiarity.** The failure-mode list names
  "External IP dependency (copy requiring Marvel familiarity)"
  explicitly. The value (build together, miniature world on a shelf,
  STEM) must land for someone who has never read a comic. Marvel
  Legends figures are *one supported option* the builder supplies —
  lead with the transformation, name Marvel as an example, never as a
  prerequisite. (`master-plan §1`: "the characters on the shelf are
  just the excuse.")
- **No implied license/affiliation.** Do not state or imply an
  official partnership with Marvel, Hasbro, or Disney. Figures are
  customer-supplied; the kit is the rigging/electronics/frame/
  curriculum. (Hasbro licensing is an open question in `master-plan
  §13` — the page must not get ahead of it.)
- **No generic hype adjectives** ("fun", "exciting", "epic") leading
  copy; mechanics-second; no emoji; no self-deprecation
  ("side project", "fan-made").
- **Terminology:** the card-game canon (`strategy.md §3`) is for the
  game; the diorama line has its own vocabulary from the product docs
  (Starter Kit, the Saturday Project, the build). Don't cross the
  streams; if a new canonical term is coined, add a `01-VISION.md`
  Decisions-log entry.
- **Honesty:** indicative prices and "coming" framing only. No
  countdown, no fake stock, no fabricated product photos implying a
  shippable item.

## Front-matter / SEO

- `title`, `date`, `description` (≤ 160 chars), `draft: false`,
  `url: "/diorama/"`, plus `summary` (mirrors the brand page).
- `description` is the social/share + meta line — write it for someone
  cold (transformation-first, no Marvel dependency).
- Verify the page flows through `layouts/_partials/seo/schema.html`
  and validates (per `05-SEO-CONVENTIONS.md`).

## Definition of Done

- [ ] Pre-flight (`01.4`) authored and `READY` / PASS **before** the
      execution session starts (mandatory — new top-level section).
- [ ] `/diorama/` renders locally (`hugo server`) with all seven
      sections, hero CTA above the fold.
- [ ] Layout override is isolated to the section (mirrors
      `layouts/brand/list.html`); `themes/PaperMod/` untouched.
- [ ] CSS is one new numbered section scoped under `.diorama-page`,
      tokens only — zero raw hex / ad-hoc spacing (grep clean).
- [ ] Primary CTA reuses the WP-015 newsletter mechanism (no second
      capture path).
- [ ] Copy passes the §Brand/voice constraints — in particular the
      page reads correctly for a non-Marvel reader, and claims no
      license/affiliation.
- [ ] SB7 mapping holds (per §StoryBrand alignment): every section maps
      to exactly one SB7 role, and no section introduces features before
      the Plan (§4).
- [ ] All five SB7 compliance tests pass (caveman, delete-the-kit,
      no-Marvel, one-sentence, CTA-consistency).
- [ ] Front-matter complete; `description` ≤ 160 chars; Schema
      partial validates.
- [ ] Production build is clean: `npm ci && npm run build` succeeds and
      `/diorama/` is emitted in `public/`.
- [ ] Mechanical reproducibility preserved (two `npm run build` runs
      byte-identical, per `04-CONTENT-CONVENTIONS.md §Build pipeline`).
- [ ] Commits use the `WP-023:` prefix per `01.3` (the page is
      out-of-content-lane, so `FIX:` / `POST:` are rejected); hooks
      pass without bypass.

## Exit / verification

- Read the page aloud back-to-back with `/brand/` and the home page
  (the `04-CONTENT-CONVENTIONS.md §Voice` tone test) — same writer.
- Confirm Lighthouse ≥ 90 Performance is not regressed by hero imagery
  (compress; `loading="lazy"` below the fold).
- Confirm no console errors; no `target="_blank"` without
  `rel="noopener"`.

## Failure conditions (any → not done)

- The page can't be understood without Marvel knowledge.
- Any copy implies the kit is for sale now, or implies a Marvel/Hasbro
  license.
- A "buy"/Snipcart path is wired (that's the shop-wiring WP, not this).
- Raw color/spacing values appear in the new CSS.
- A second newsletter capture path is introduced.
- A section maps to no SB7 role, or features appear before the Plan (§4).
- The page fails the delete-the-kit test (cannot convert without §4).
- The CTA wording varies anywhere on the page.

## Out of scope (explicit follow-on WPs)

- **Diorama shop products** — `content/shop/diorama-*.md` Snipcart
  entries + pricing. Separate WP; gated on real BOM/pricing and the
  prototype existing.
- **ICP email funnel** — Brevo list/tag segmentation + automation for
  diorama-interested subscribers. Extends WP-018/020.
- **Build-story content lane** — `/posts/` series documenting the
  prototype build (the YouTube/marketing content). Separate content WP.
- **Real product photography / renders** — gated on a physical
  prototype (~Nov 2026 per the GTM roadmap).
- **Physical / firmware / curriculum build** — not this repo. Tracked
  in `diorama-master-plan.md §13`; any Pi control software lives in the
  engine repo.
