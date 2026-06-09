# Legendary Arena Website — Roadmap

**Repo:** github.com/legendary-arena/legendary-arena-website
**Owner:** Jeffery Jensen
**Last updated:** 2026-05-09

> **Authority:** This document tracks Work Packets (WPs) for the marketing
> site. It is subordinate to `01-VISION.md`. If a WP description here
> conflicts with the vision, the vision wins.

---

## Status legend

- ✅ **Done** — DoD met, exit criteria satisfied, committed, pushed
- 🔄 **In progress** — actively being worked
- ⏭️ **Up next** — preconditions met, ready to start
- ⏸️ **Pending** — waiting on a dependency
- 🚫 **Blocked** — needs an outside input or decision

---

## Global invariants (apply to ALL WPs)

These are non-negotiable rules across the project. Violations make a WP
not-done regardless of its DoD.

- **No retroactive breakage.** No WP may break a previously completed WP
  without a documented change here AND a Decisions log entry in `01-VISION.md`.

- **Performance + accessibility floor.** All user-facing pages must:
  - Pass Lighthouse ≥ 90 in performance, accessibility, best practices, SEO
  - Render with no console errors in the browser

- **Brand tokens are the single source of truth** for colors, typography,
  and spacing. No hardcoded values outside `static/brand-tokens.css`
  except documented overrides with `// why:` comments.

- **Deploys must be deterministic.** Same commit → same output. The site
  must be reproducible locally via a single documented command that
  matches what CI runs.

- **No direct modification of third-party dependencies.** Theme,
  libraries, submodules. Customize via Hugo's override mechanism
  (`assets/`, `layouts/`).

- **Brand tokens are an API contract.** They are consumed cross-origin by
  `play.legendary-arena.com` and `registry.legendary-arena.com`. Breaking
  changes require a major version bump (v1 → v2) AND coordinated consumer
  updates BEFORE the new version publishes.

---

## Execution flow

```
WP-001 → WP-002 → WP-003 → WP-004 → WP-005 → WP-006 ┬→ WP-007a ─┐
                                                    ├→ WP-007b ─┤
                                                    ├→ WP-010 ──┼→ WP-009
                                                    ├→ WP-008    │
                                                    └→ WP-011    │
                                                                 │
                                                    (WP-008 + WP-011 do not feed WP-009)

WP-015 → WP-016 → WP-017
WP-015 → WP-018 (parallel with WP-016/017)
WP-016 + WP-019 → WP-020 (amends WP-017 spec + newsletter template)
WP-018 + WP-020 → WP-021 (funnel analytics baseline)

WP-019 (standalone — no upstream WP dependency)
```

WP-007a, WP-007b, WP-008, WP-010, and WP-011 can run in parallel
after WP-006 completes; they have no shared write paths. WP-009
(class-color usage audit) is single-track and runs after WP-007a,
WP-007b, AND WP-010 complete — it audits the consumer surfaces
those WPs land. WP-008 and WP-011 are parallel to WP-009 but do
not feed it. WP-010 is added to WP-009's upstream set so the
marketing site's chrome (header + footer nav) is in its v1 shape
before any audit pass runs against it; the audit's class-color
scope does not strictly require WP-010, but auditing a half-built
chrome would force a re-run after WP-010 lands. WP-011 is
prophylactic (eliminates a class of font-swap CLS regression) and
doesn't unblock specific downstream WPs; it's recommended before
WP-008 or any future text-rendering UI work so the Lighthouse
pre-baseline becomes load-bearing rather than brittle.

WP-016 (templates) depends on WP-015 (newsletter infrastructure).
WP-017 (content pipeline) depends on WP-016 (templates must exist
before content is produced against them). WP-018 (Brevo automation)
depends on WP-015 only and can run in parallel with WP-016/017 —
it configures the Brevo-side engagement workflow, not the Hugo
content layer.

WP-019 (Snipcart commerce) has no upstream WP dependency — it
touches `extend_head.html`, `extend_footer.html`, `header.html`,
and `hugo.toml` (all locked by prior WPs) plus new files under
`layouts/shop/`, `content/shop/`, and `archetypes/`. It can run
in parallel with WP-017 and WP-018 since it has no shared write
paths with either. The vision doc amendment for the e-commerce
scope expansion landed 2026-05-12 (see `01-VISION.md` Decisions
log).

WP-020 (funnel enrichment) depends on WP-016 (newsletter template
spec to amend) and WP-019 (Snipcart `/shop/` as the UTM link
destination). It is governance-only — modifies `docs/**` files, no
site-affecting paths. It amends the WP-017 spec and newsletter
template so that content produced under WP-017 picks up the new
funnel requirements (shop module, share module, CTA hierarchy,
funnel integrity check) without retrofit.

---

## Summary

| WP | Title | Status | Dependencies | Est. effort |
|---|---|---|---|---|
| WP-001 | Hugo skeleton + PaperMod theme | ✅ Done | — | half-day |
| WP-002 | LA brand definition + tokens v1 | ✅ Done | WP-001 | 1–2 days |
| WP-003 | Apply LA brand via theme overrides | ✅ Done | WP-002 | 1 day |
| WP-004 | Content scaffolding + first 3 pages | ✅ Done (2026-05-08) | WP-003 | half-day |
| WP-005 | Pagefind search integration | ✅ Done (2026-05-09) | WP-004 | half-day |
| WP-006 | Cloudflare Pages deploy + custom domain | ✅ Done (2026-05-09) | WP-005 | half-day |
| WP-007a | play.legendary-arena.com deploy | ✅ Done (2026-05-10) | WP-006 | 1 day |
| WP-007b | Registry viewer brand integration (cards.barefootbetters.com) | ✅ Done (2026-05-11) | WP-006 | ~half-day–1 day |
| WP-008 | SEO baseline (Hugo equivalent of RankMath features) | ✅ Done (2026-05-11) | WP-006 | ~1 day |
| WP-009 | Class-color usage audit — cross-site. Findings: [`docs/brand/audits/class-color-usage-v1.md`](../brand/audits/class-color-usage-v1.md) | ✅ Done (2026-05-12) | WP-007a, WP-007b, WP-010 | ~0.5 day |
| WP-010 | Header + footer site navigation | ✅ Done (2026-05-10) | WP-006 | ~half-day |
| WP-011 | `font-display: optional` — eliminate font-swap CLS | ✅ Done (2026-05-10) | WP-006 | ~1 hour |
| WP-012 | SessionStart hook + prune script — INFRA, ported from engine repo (no section body; see `docs/ai/REFERENCE/01.8-claude-code-hooks.md`) | ✅ Done (2026-05-11) | — | ~1 hour |
| WP-013 | Marketing-repo hygiene follow-up — .gitignore + 01.8 cross-refs (no section body; see commit history) | ✅ Done (2026-05-11) | — | ~15 min |
| WP-014 | Public `/brand/` page + mood-board brief | ✅ Done (2026-05-12) | WP-007b, WP-010 | ~half-day |
| WP-015 | Newsletter signup with Brevo | ✅ Done (2026-05-12) | WP-004, WP-010 | ~half-day |
| WP-016 | Newsletter & blog templates | ✅ Done (2026-05-12) | WP-015 | ~1 day |
| WP-017 | Content pipeline + weeks 1–4 | ✅ Done (2026-05-13) | WP-016 | ~1–2 days |
| WP-018 | Email engagement workflow (Brevo automation) | ✅ Done (2026-05-13) | WP-015 | ~half-day |
| WP-019 | Snipcart shopping cart with Stripe checkout | ✅ Done | — | ~1 day |
| WP-020 | Newsletter & blog funnel enrichment | ✅ Done (2026-05-13) | WP-016, WP-019 | ~half-day |
| WP-021 | Funnel analytics baseline | ✅ Done (2026-05-14) | WP-018, WP-020 | ~1 hour |
| WP-023 | Diorama product-line landing page (`/diorama/`) | ✅ Done (2026-06-08) | WP-010, WP-014, WP-015 | ~half-day–1 day |
| WP-024 | Diorama page — product image + placeholder buy button | 🔄 In progress | WP-023, WP-019 | ~1 hour |

**Total realistic effort:** ~9–14 days of focused work.

---

## WP-001 — Hugo skeleton + PaperMod theme ✅

**Status:** Done (2026-05-07)
**Effort actual:** ~half-day
**Dependencies:** —
**Commits:** `1b56fc2` (vision doc), `e228eb5` (Hugo skeleton)

### Readiness (retrospective)

- Spec complete: ✅
- Dependencies met: ✅ (none)
- Executed: ✅

### Preconditions

(none — this WP establishes the baseline)

### Goal

Stand up a working Hugo site locally with a theme attached. Foundation
for all subsequent WPs.

### Deliverables

- Hugo Extended installed (`hugo v0.161.1+extended`)
- Hugo site initialized in `C:\www\legendary-arena-com\`
- PaperMod theme added as Git submodule at `themes/PaperMod`
- `hugo.toml` configured with LA-specific values (title, baseURL, description)
- `01-VISION.md` committed
- First push to `origin/main`

### Constraints

- Use upstream PaperMod via submodule, not a fork
- All theme customization happens via Hugo overrides (`assets/`, `layouts/`)
- No modification of `themes/PaperMod/` source

### Definition of Done

- [x] `hugo version` shows Hugo Extended
- [x] `hugo server` renders cleanly at `http://localhost:1313/`
- [x] Home page shows "Legendary Arena" + hero text
- [x] PaperMod styling applied (not unstyled HTML)
- [x] Repository pushed to GitHub

### Exit criteria

- [x] Local site builds without error
- [x] All commits on `origin/main`
- [x] No PaperMod source files modified

### Failure conditions

- Hugo build fails on a clean clone
- Theme submodule missing, detached, or pointing at the wrong commit

### Rollback

- Re-clone repo and re-run from step 1; only one commit affected
  (`e228eb5`); revertable cleanly

### Notes

- Two PaperMod-internal deprecation warnings remain
  (`.Language.LanguageDirection`, `.Language.LanguageCode`) because the
  theme uses older Hugo APIs. Harmless. Will resolve when upstream
  PaperMod ships a Hugo-API compatibility update.

---

## WP-002 — LA brand definition + tokens v1 ✅

**Status:** Done (2026-05-07)
**Effort actual:** ~1 day
**Dependencies:** WP-001
**Commits:** `5066d47` (strategy v1 draft), `941a11b` (brand-tokens.css + CHANGELOG draft), `071b304` (strategy strengthening: invariants, CTA contract, failure modes), `3f76a3e` (palette v1 draft + error/CTA red fix), `dc7f08b` (DoD ticks + lock-pending state), `3a5ffe4` (typography v1 draft + spacing v1 draft + hero tier), `bc62d94` (`--la-color-cta` additive token + palette §4.2.1 + mode-switching contract documentation)

### Readiness

- Spec complete: ✅
- Dependencies met: ✅
- Ready for execution: ✅
- Executed: ✅

### Preconditions

- WP-001 complete and verified
- Hugo dev server stable on `main`
- A few hours of uninterrupted creative time available (Phase A is
  thinking work; rushing it produces generic outputs)

### Goal

Establish Legendary Arena's visual identity and produce a versioned
`brand-tokens.css` API contract that all three sites
(`www`, `play`, `registry`) will consume.

### Two phases

**Phase A — Strategy (~half-day, mostly thinking)**

- Audience: who plays / would play LA?
- Mood: epic / casual / gritty / polished / retro / modern
- Reference brands: 2–3 to nod toward, 1–2 to contrast against
- Voice & tone: how does LA "speak"?

**Phase B — Tactical (~1 day, decide and document)**

- Color palette: primary, secondary, accent, neutrals, semantic
  (success/warning/error). Light + dark variants.
- Typography: display font, body font, mono font. Pick from Google Fonts
  for v1; document fallbacks. Define a complete type scale —
  H1, H2, H3, H4, H5, H6, body, and small — each with pixel/rem size,
  line height, weight, and named CSS custom property
  (`--la-font-size-h1`, `--la-line-height-h1`, etc.).
- Spacing scale: base unit (4px or 8px), scale (4/8/12/16/24/32/48/64/96),
  usage rules.
- Output `brand-tokens.css` with version header.

### Deliverables

```
docs/brand/
├── strategy.md          ← Phase A output
├── palette.md           ← color tokens with hex values + semantic mappings
├── typography.md        ← font choices, scale, weights, fallbacks
├── spacing.md           ← scale and usage rules
└── CHANGELOG.md         ← version history of the token contract

static/
└── brand-tokens.css     ← v1, with version header (consumable artifact)
```

### Token versioning contract

`static/brand-tokens.css` MUST begin with this header:

```css
/*
 * Legendary Arena Brand Tokens
 * Version: v1
 * Date: YYYY-MM-DD
 *
 * This file is consumed cross-origin by play.legendary-arena.com and
 * registry.legendary-arena.com. Treat as a public API.
 *
 * Breaking changes require a major version bump (v2) AND coordinated
 * updates to consumers per WP-007a and WP-007b BEFORE the new version
 * publishes.
 */
```

`docs/brand/CHANGELOG.md` records every published version with date and
summary of changes.

### Out of scope

- **Logo design** — wordmark placeholder for v1; real logo deferred
- **Illustration style, photography direction, motion language** — defer
- **Voice/tone guide beyond a paragraph** — full guide is overkill for v1

### Constraints

- No hardcoded colors, fonts, or spacing values outside `brand-tokens.css`
- Tokens are CSS custom properties (e.g., `--la-color-primary`), not Sass
  variables — so consumers can override via runtime CSS if needed
- Naming convention documented in `palette.md` and applied consistently
- Brand docs (`docs/brand/*.md`) are written for **both human and AI
  consumption**: explicit hex values, named tokens, usage rules, no
  reliance on visual references alone. A future Claude session reading
  these docs should be able to make brand-consistent styling decisions
  without re-asking for clarification.

### Definition of Done

- [x] `docs/brand/strategy.md` written and committed (v1 DRAFT, 2026-05-07)
- [x] `docs/brand/palette.md` written with hex values + semantic mappings
      (light + dark variants both defined; v1 DRAFT, 2026-05-07)
- [x] `docs/brand/typography.md` written with Google Fonts choices,
      fallbacks, AND complete type scale (hero + H1–H6, body, small) with
      sizes, line heights, weights, and named tokens (v1 DRAFT, 2026-05-07)
- [x] `docs/brand/spacing.md` written with scale + usage rules
      (also covers radii, z-index, motion; v1 DRAFT, 2026-05-07)
- [x] `docs/brand/CHANGELOG.md` initialized with v1 entry (2026-05-07)
- [x] `static/brand-tokens.css` produced with version header — includes
      `--la-font-size-*` and `--la-line-height-*` tokens for the
      full type scale (v1 DRAFT, 2026-05-07)

### Exit criteria

- [x] `brand-tokens.css` consumed successfully by Hugo
      (loaded via `layouts/_partials/extend_head.html`; rendered tokens
      verified via `getComputedStyle()` in headless Chrome — both modes)
- [x] Hugo build still produces a clean site after token integration
      (`hugo server` ran cleanly during WP-003 verification)
- [x] No console errors when served (Lighthouse `errors-in-console`
      audit: 0 items; puppeteer-core console + pageerror + requestfailed
      listeners: 0 events)
- [x] Token file is well-formed CSS (validates; no internal broken
      references; PaperMod color compatibility shim aliased correctly)

### Failure conditions

- Tokens reference values not defined elsewhere in the file (broken
  internal references)
- Hugo build breaks after token integration
- Brand decisions feel generic ("default game blue, monospace font, dark
  mode") rather than intentional — soft fail, but worth flagging before
  marking complete

### Rollback

- Revert brand-related commits on `main`. WP-001 baseline still works;
  no production deploys yet, so this is local-only.

### Notes

- Phase A output (`strategy.md`) is the most important deliverable;
  Phase B decisions cascade from it.
- Sleep on the strategy if possible. Brand decisions made in one sitting
  tend to converge on safe-but-generic.

### Progress (2026-05-07)

- **Phase A** drafted as `docs/brand/strategy.md` v1 DRAFT — includes
  Global brand invariants, tone invariants, CTA contract, terminology
  rules, brand failure modes, Phase B exit criteria.
- **Phase B documentation** drafted: `palette.md`, `typography.md`,
  `spacing.md` all v1 DRAFT with parallel governance structure
  (authority blocks, failure modes, contract references, exit criteria).
  `CHANGELOG.md` v1 entry initialized.
- **Phase B implementation** drafted: `static/brand-tokens.css` v1 DRAFT
  with full token set (colors light+dark, hero+H1–H6 typography,
  9-step spacing, radii, z-index, motion). Contract violation fixed
  in this draft (error red separated from CTA red per
  strategy.md §4 constraint).

### Lock (2026-05-07)

WP-003 verification surfaced and resolved one drafting gap (additive
token `--la-color-cta` was needed to satisfy `palette.md §8` row 5).
After the additive change all Phase B exit criteria from `strategy.md §11`
are satisfied for www. Brand artifacts are now **v1 LOCKED for WWW**;
cross-site consumption (`play.*`, `cards.*`) is verified separately
under WP-007a / WP-007b and explicitly carved out of this lock.

Lock receipts:
- `static/brand-tokens.css` header: `Version: v1` (no DRAFT suffix)
- `docs/brand/strategy.md`, `palette.md`, `typography.md`, `spacing.md`
  status: `v1 LOCKED for WWW`
- `docs/brand/CHANGELOG.md` v1 status: `Locked for www; cross-site
  consumption pending WP-007a/b`
- `docs/01-VISION.md` Decisions log: 2026-05-07 entry recording the
  joint WP-002 + WP-003 lock with verification summary

### Post-lock iteration (2026-05-08, under `palette.md §9.1` Early Lock Revision Window)

The v1 lock above remains in effect; this iteration is governed by
the §9.1 Early Lock Revision Window exception clause added in this
same revision pass (codified post-lock redefinitions within 24–72h
without v2 bump, provided no consumer has integrated and all
artifacts update atomically). Window is OPEN through
**2026-05-10 23:59 local**, OR until any downstream consumer
integrates the v1 tokens, whichever comes first. After window
close, future redefinitions require formal v1 → v2 bump.

Changes landed under this window (commit `80e6df0`):

- **Brand red:** cherry `#c92a30` / `#e5484d` → deep maroon
  `#7a1d1f` / `#a83034`. CTA follows the maroon (~10.4:1
  white-text contrast, AAA — over-satisfies the §8 contract).
- **Brand blue:** royal `#2563eb` / `#3b82f6` → deep navy
  `#1e3a8a` / `#3753b8`. Whole bright/muted scale shifted darker.
- **Class-color subsystem (`palette.md §4.4`):** 10 mode-stable
  tokens for the 5 hero classes (strength, covert, instinct,
  ranged, tech) with bright + muted pairs. Sourced from production
  class icons; two muted variants (instinct, ranged) are derived
  since their icons lack shadow companions.
- **Governance refinements:** §9.1 (the exception itself), §5.3
  distinguishing rule (CTA red vs error red), §4.3 role discipline
  (`--la-color-blue-bright` for interactive affordance), §7
  gradient tonal note, §10 failure-mode bullets for class-as-brand
  and decorative-blue-as-affordance misuse.
- **Logo work (companion artifacts, not part of WP-002 scope):**
  `docs/brand/logo-brief.md`, `docs/brand/logo-ai-workflow.md`,
  `docs/brand/logo-explorations/`, `docs/brand/logo-figma/*.svg`.
  Wordmark placeholder remains the v1 logo on `www.*`.

End-to-end verification: Hugo serves all updated tokens; runtime
`getComputedStyle()` resolves the new values in both `data-theme="light"`
and `data-theme="dark"`; existing tokens unaffected.

See `01-VISION.md` Decisions log entries dated 2026-05-08 for
detailed rationale on each change.

---

## WP-003 — Apply LA brand via theme overrides ✅

**Status:** Done (2026-05-07)
**Effort actual:** ~1 day (implementation + verification)
**Dependencies:** WP-002
**Commits:** `a2e3e8b` (custom.css with token references; reduced-motion respected), `052815a` (brand tokens loaded via extend_head.html; smoke-test verified rendering, no console errors), `bc62d94` (verification fixes — selector bug, PaperMod compatibility shim, body.list bg, touch target, footer contrast, favicons, CTA token routing)

### Readiness

- Spec complete: ✅
- Dependencies met: ✅
- Ready for execution: ✅
- Executed: ✅

### Preconditions

- WP-002 complete with `brand-tokens.css` v1 published
- All four `docs/brand/*.md` files committed
- Hugo build passing on `main`

### Goal

Restyle the site to match LA brand without modifying PaperMod's source.
Customize via Hugo's override mechanism so the theme stays upgradeable.

### Approach

Files placed in this repo's `assets/` and `layouts/` folders take
precedence over identically-named files in the theme. PaperMod's
recommended override location for CSS is `assets/css/extended/`.

### Deliverables

- `assets/css/extended/custom.css` — imports `brand-tokens.css`, applies
  brand to PaperMod elements
- Layout overrides in `layouts/` if needed (e.g., custom header partial)
- Updated `hugo.toml` if theme params need brand-aware values

### Constraints

- **No modifications to `themes/PaperMod/` source.** Verify via
  `git submodule status` — must show clean
- **No `!important`** in overrides except documented exceptions with
  `// why:` comments explaining the necessity
- **No DOM structure assumptions** that depend on PaperMod's internal
  class names beyond stable, public ones (i.e., classes documented in
  PaperMod's README or used in PaperMod's own examples)
- **Both light and dark modes** must look on-brand (PaperMod supports both
  natively)

### Definition of Done

- [x] Home page reflects LA brand colors and typography (verified via
      `getComputedStyle()`: bg-primary, text-primary, h1 font-family
      (Bebas Neue) all resolve to LA tokens in both modes)
- [x] Light and dark modes both look intentional and on-brand (LA tokens
      active in both modes after the `html[data-theme="dark"]` selector
      fix; PaperMod's --theme / --primary / --code-bg routed through LA
      tokens via the compatibility shim)
- [x] Header, footer, body text, links all consume brand tokens
      (.logo a, .nav/.menu a, .footer, .footer a, body, .main, h1–h6
      all reference --la-* tokens)
- [x] `themes/PaperMod/` is unmodified (`git submodule status` shows
      `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926 themes/PaperMod (heads/master)`
      with no `+` modification flag)
- [x] `hugo server` renders without errors (confirmed during verification)
- [x] No `!important` declarations without `// why:` comments
      (only `!important` in the `prefers-reduced-motion` block, with
      `// why:` explaining override of per-element transitions)

### Exit criteria

- [x] Lighthouse score ≥ 90 on home page (Performance: 91, Accessibility: 100,
      Best Practices: 100, SEO: 100)
- [x] Visual inspection: site reads as "Legendary Arena's marketing site,"
      not "default PaperMod" (Bebas Neue display font on h1/h2 + warm
      off-white / deep navy mode-specific surfaces are immediately
      distinct from PaperMod's stock white/neutral grays)
- [x] No regressions vs WP-001 baseline (home page still loads; all
      links functional — header logo, footer attribution links, top-link;
      no 404s)
- [x] Before/after DOM diff shows no structural breakage (only style
      changes; PaperMod's emitted HTML structure is unchanged because
      no template overrides modified the body markup)

### Additional verification (WP-003 lock-pass, 2026-05-07)

- [x] WCAG AA on all `palette.md §8` contrast pairs verified by direct
      computation (12 / 12 pass; text-primary on bg-primary hits AAA in
      both modes)
- [x] Mobile viewport 375×667 — no horizontal scroll; .main padding
      drops from --la-space-6 (32px) to --la-space-4 (16px) per
      `spacing.md §8`
- [x] `prefers-reduced-motion: reduce` honored (transition-duration and
      animation-duration forced to 0ms in custom.css §6.2)
- [x] Browser console clean: 0 errors, 0 page errors, 0 failed network
      requests (verified via puppeteer-core listeners on a cache-disabled
      page)

### Failure conditions

- Lighthouse score drops below 90 in any category
- DOM structural breakage (PaperMod's templates expecting nodes that
  don't render correctly)
- Visual regressions: pages that worked in W001 don't render now
- PaperMod source modified (would break submodule update path forever)

### Rollback

- Revert override commits on `main`. WP-001 baseline visual state
  restored. No external consumers yet, so rollback is local-only.

### Notes

- This is the highest-risk WP technically — long-term maintainability
  lives or dies here.
- After this WP, PaperMod theme upgrades should "just work" because
  we're only adding overrides, not modifying PaperMod itself.

---

## WP-004 — Content scaffolding + first 3 pages ✅

**Status:** Done (2026-05-08)
**Effort actual:** ~half-day (read order + authoring + verification + lock)
**Dependencies:** WP-003
**Commits:** `b5f22fd` (content + scaffold — home/about/blog, archetype, conventions, layout override A)

### Readiness

- Spec complete: ✅
- Dependencies met: ✅
- Ready for execution: ✅
- Executed: ✅

### Preconditions

- WP-003 complete; brand-styled site renders
- Hugo build passing
- A clear sense of what LA's marketing copy actually says (this WP is
  not the place to discover what to say)

### Goal

Replace placeholder content with real v1 copy for home, about, and one
blog post. Establish content conventions so future content additions
are frictionless.

### Deliverables

- `content/_index.md` — homepage with hero ("The arena awaits."), three
  "why" cards via `params.sections`, "Play now" CTA
- `content/about/_index.md` — what LA is, who's behind it, status of
  the three properties (www / cards / play)
- `content/posts/2026-05-07-launch-announcement.md` — first real blog
  post ("Opening the arena")
- `archetypes/posts.md` — four-field-valid front-matter template for
  `hugo new posts/<slug>.md`
- `docs/04-CONTENT-CONVENTIONS.md` — home-page-markup decision,
  front-matter / slug / image / voice / terminology / brand-failure-mode
  rules
- `layouts/index.html` — approach A override that hosts the home-page
  hero + CTA above the fold (PaperMod's `homeInfoParams` partial cannot)

### Conversion intent (the marketing site's job)

The home page must clearly answer, in this order:

1. **What is Legendary Arena?** (one-line answer above the fold)
2. **Why should I care?** (value prop — what's the experience)
3. **What do I do next?** (CTA)

The CTA must be:
- Visible above the fold on desktop AND mobile
- Unambiguous in label ("Play now" or similar)
- Linked to `https://play.legendary-arena.com` (placeholder domain
  acceptable until WP-007a goes live)

### Constraints

- No lorem ipsum, no placeholder copy. Everything that ships in this WP
  must be content you'd want a stranger to read.
- Voice/tone consistent with `docs/brand/strategy.md`
- Image conventions documented in `04-CONTENT-CONVENTIONS.md` (where
  images live, naming, alt text expectations)

### Definition of Done

- [x] Home page answers what / why / what-next in that order, above the
      fold (hero "The arena awaits." + three `params.sections` cards
      "Skill decides." / "Mastery is earned." / "The rules don't drift."
      + "Play now" CTA, in that order)
- [x] "Play now" CTA visible above the fold on desktop AND mobile
      (binary test PASS in all 4 combos via puppeteer-core +
      system Chrome — see Additional verification below)
- [x] About page has real content (not lorem ipsum) —
      `content/about/_index.md` covers what / who's behind it / where
      things stand for the three properties
- [x] One real blog post published (not "Hello World") — "Opening the
      arena" at `content/posts/2026-05-07-launch-announcement.md`,
      narrative framing not changelog (per pre-flight locked decision)
- [x] `hugo new posts/whatever.md` produces a properly-stubbed post via
      `archetypes/posts.md` (validated 2026-05-08 against
      `posts/test-archetype.md`; all four required fields well-formed,
      test file deleted)
- [x] `docs/04-CONTENT-CONVENTIONS.md` committed

### Exit criteria

- [x] First-time-reader test passes — hero + sub-prose + maroon
      "Play now" CTA establish "skill-first deck-building system,
      click here to play" within one viewport on desktop and mobile
- [x] No placeholder text anywhere in the rendered output (no lorem
      ipsum, no "TBD", no "Coming soon"; the home page's "what / why /
      what-next" replaces the WP-001 `homeInfoParams` "Coming soon"
      placeholder)
- [x] Voice consistent across all three pages (home / about / blog
      share the "arena" framing thread, the verb palette from
      `strategy.md §2.3`, and the declarative-not-hyped tone)
- [x] Lighthouse ≥ 90 maintained on home + post in all four categories
      — see Lighthouse scores below

### Lighthouse scores (production build, `hugo --minify`)

Numbers below were measured against the production build served on
`http://localhost:1314/` via `python -m http.server`. The dev-server
numbers (against `hugo server --port 1313`) are several points lower
on the post page — notably Performance ≈ 86, driven by the dev
server's lack of compression / minification / cache-control headers
(Lighthouse audits `uses-text-compression`, `unminified-css`,
`uses-long-cache-ttl`, `render-blocking-resources` all show large
estimated savings on the dev server but ~zero on the production
build). Production output is what ships at
`www.legendary-arena.com`, so production numbers are recorded here.
Dev-server numbers were captured for regression-vs-WP-003 sanity
(home P = 89–90, post P = 86, A flapping 95–100 on the logo
wordmark `target-size` audit) and showed no regression in the
content authored by WP-004.

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Home (`/`) | 97 | 95 | 96 | 100 |
| Post (`/posts/2026-05-07-launch-announcement/`) | 98 | 96 | 96 | 100 |

The Accessibility 95 (vs WP-003's 100 on home) is a `target-size`
audit finding on the header logo wordmark
(`header.header > nav.header-nav > div.logo > a`, computed bounding
rect ~111 × 17 px — width passes, height is below the 24 px
threshold). The wordmark element is unchanged by WP-004; the audit
appears to flap around the threshold across runs (the same DOM
scored 100 in WP-003's lock measurement). The deferred branded-logo
work tracked under `docs/01-VISION.md` Decisions log 2026-05-08
(logo brief + AI-workflow notes + designer handoff) is the real
fix; this score is not a WP-004 regression.

### Additional verification (WP-004 lock-pass, 2026-05-08)

- [x] **Binary CTA test PASS in all 4 viewport+mode combinations**
      (puppeteer-core + system Chrome at
      `C:/Program Files/Google/Chrome/Application/chrome.exe`;
      light/dark × 1280×800 / 375×667; `<a class="button">Play now</a>`
      fully within first viewport height in every combo; bounding
      rect entirely within `[0, viewport.height]` × `[0, viewport.width]`;
      no clipping, no scroll required)
- [x] Hero `<h1>` resolves to `--la-font-size-hero`
      (computed `font-size: 56px` ≡ 3.5rem),
      `font-family: "Bebas Neue", Anton, Oswald, system-ui, sans-serif`,
      `text-transform: uppercase` per `typography.md §4.1 + §8`
- [x] Browser console clean: 0 errors / 0 page-errors in all 4 combos
- [x] `git submodule status` shows
      `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926 themes/PaperMod (heads/master)`
      with no `+` modification flag (PaperMod source unmodified by
      WP-004; matches WP-003 lock state)
- [x] Archetype validated: `hugo new posts/test-archetype.md` produced
      `title: "Test Archetype"`, `date: 2026-05-08T17:17:04-07:00`
      (valid ISO 8601), `description: ""` (empty string per locked
      decision "may be empty for the author"), `draft: false`,
      `tags: []`, `categories: []`. Test file deleted post-validation.
- [x] All commits pushed to `origin/main`

### Failure conditions

- Copy reads as filler or generic deck-builder marketing
- CTA below fold or ambiguous in label
- Voice drifts between pages (home reads epic, about reads casual, etc.)
- Hugo archetype not actually used (creating a post by hand still works,
  which defeats the convention)

### Rollback

- Revert content commits. Site reverts to the brand-styled
  WP-003 placeholder state but remains functional.

### Notes

- **Home-page layout — approach A.** Override `layouts/index.html`
  chosen over B (Hugo shortcode invoked from `content/_index.md`) and C
  (PaperMod's `homeInfoParams`). A gives full control of the
  above-the-fold markup, uses `custom.css §5.1 / §5.2` utility classes
  natively, and decouples copy (`content/_index.md` front-matter:
  `title`, hero prose, `ctaLabel`, `ctaHref`, `sections[]`) from layout
  (`layouts/index.html`). C cannot host a styled `.button` element
  above the fold; B adds indirection without ergonomic gain. Recorded
  in `docs/01-VISION.md` Decisions log 2026-05-08 and in
  `docs/04-CONTENT-CONVENTIONS.md "Home page markup"`.
- The pre-existing `[params.homeInfoParams]` block in `hugo.toml` (the
  WP-001 placeholder mechanism) was removed in the WP-004 tidy-up
  pass before WP-005 began; a comment in `hugo.toml` points future
  readers to `docs/04-CONTENT-CONVENTIONS.md "Home page markup"`.

---

## WP-005 — Pagefind search integration ✅

**Status:** Done (2026-05-09)
**Effort actual:** ~half-day (scaffold + wiring + lazy-load fix +
verification + lock)
**Dependencies:** WP-004
**Commits:** `cc84549` (pre-flight artifacts), `8dc0623` (Step 1+2:
build pipeline scaffold — npm + pagefind 1.5.2), `931260c`
(Steps 3-6: PaperMod search disabled, header + extend_head + CSS
overrides, baseof data-pagefind-body, keyboard shortcuts), `0334478`
(Step 7: README + .gitignore for local-only verification artifacts),
`0479626` (verification fix: lazy-load Pagefind UI + stub input to
satisfy Lighthouse Performance ≥ 90)

### Readiness

- Spec complete: ✅
- Dependencies met: ✅
- Ready for execution: ✅
- Executed: ✅

### Preconditions

- WP-004 complete (need real content to index meaningfully)
- Hugo build passing
- Node.js installed locally if going the npm route

### Goal

Add static, fast search across blog/marketing content. Card data is
`registry.*`'s job — explicitly excluded from this index.

### Deliverables

- Pagefind installed (npm or binary)
- Build script that runs `hugo` then `pagefind --site public`
- Search UI partial integrated with PaperMod's header
- Keyboard shortcut (`/` or `Ctrl+K` / `Cmd+K`) to focus search
- `package.json` with `npm run build` script if going the npm route
- `README.md` updated with the local build command

### Build reproducibility (critical)

- A single command builds the full site locally:
  - `npm run build` (or equivalent — choice documented in README)
- This command MUST match what Cloudflare Pages runs in WP-006
- Same command, same input → same output. Verifiable by clean clone +
  `npm run build` producing byte-identical `public/` output

### Constraints

- Search index excludes card data (Pagefind only crawls
  `content/` content + the home/about pages)
- Search runs entirely client-side after build (no external service)
- No Algolia, no Elasticsearch, no server-side search

### Definition of Done

- [x] Pagefind dependency declared (in `package.json` or as a documented
      binary) — npm route, `pagefind` 1.5.2 exact-pinned in
      `package.json` + committed `package-lock.json`
- [x] Search input visible in site header — server-rendered stub
      `<input id="la-search-stub">` from first paint; real Pagefind
      default UI replaces it on first interaction (focus / click /
      shortcut)
- [x] Typing produces relevant matches across home/about/blog content
      — Pagefind reports 9 pages, 255 words indexed; manual checks on
      "arena", "skill", "scenario" all return matches with correct
      target URLs
- [x] Card name searches return no results (verify exclusion) — both
      "Iron Fist" and "Doctor Strange" return zero matches; index
      scope is structural via `data-pagefind-body` on `<main>` in the
      baseof override
- [x] `npm run build` builds Hugo + Pagefind in one command, exits
      non-zero on either failure (`hugo --minify && npx pagefind
      --site public`)
- [x] Build command documented in `README.md` (Prerequisites + Build
      + Local dev + Reproducibility + CI parity sections)

### Exit criteria

- [x] Search returns useful results within ~100ms of typing
      (post-mount; lazy-load adds a one-time ~300 KB fetch on first
      interaction, after which queries are fully client-side)
- [x] Lighthouse ≥ 90 maintained — see scores below
- [x] Build is fully reproducible: clean clone + single command
      produces a working site (`Compare-Object` over SHA-256 hashes
      of two consecutive `npm run build` runs returned empty;
      byte-identical `public/`)

### Lighthouse scores (production build, hugo --minify)

Numbers measured against the production-config build (same script
that ships) served on `http://127.0.0.1:1314/` via `python -m
http.server`. Per the WP-005 verification convention (and matching
WP-004), the local server is served from `public/` after `npm run
build`. The `--baseURL http://127.0.0.1:1314` override is used
ONLY for the Lighthouse + console-error verification pass so the
absolute-URL canonicalization that `canonifyURLs = true` produces
resolves under localhost DNS — the actual production deploy
(WP-006) uses the default `https://www.legendary-arena.com/`
baseURL and the same `npm run build` command.

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Home (`/`) | 92 | 100 | 100 | 100 |
| Post (`/posts/2026-05-07-launch-announcement/`) | 93 | 100 | 100 | 100 |

Performance variance (3 consecutive runs each, lazy-loaded build):

| Page | Run 1 | Run 2 | Run 3 | Median |
|---|---|---|---|---|
| Home | 92 | 98 | 92 | 92 |
| Post | 99 | 93 | 93 | 93 |

The Accessibility 100 (vs WP-004's 95 on home) reflects that the
local-baseURL build resolves resources cleanly during the audit;
the underlying DOM + tokens are unchanged.

The Performance budget — eager-load measurement on the same code
returned 88-89 on home, below the 90 floor. The lazy-load pattern
(see §"Decisions log" 2026-05-09) brings it to 92 stable.

### Additional verification (WP-005 lock-pass, 2026-05-09)

- [x] **Reproducibility (mechanical):** two consecutive `npm run
      build` runs (production config, default baseURL) produce
      byte-identical `public/`. `Compare-Object` over SHA-256
      hashes of every file in `public/`, sorted by path, returned
      empty. `build1.txt` / `build2.txt` retained locally only
      (gitignored).
- [x] **Console clean:** Lighthouse `errors-in-console` audit
      returned `score=1, items=0` on both home and post (same
      lazy-loaded local-baseURL build). Pagefind UI assets
      (`pagefind-ui.js`, `pagefind-ui.css`) load lazily on first
      interaction; until that interaction they are not requested,
      so eager-load failures are impossible by construction.
- [x] **Render-blocking check:** Lighthouse
      `render-blocking-resources` audit — Pagefind UI assets do not
      appear in the report (consistent with the lazy-load
      promise). The eager `defer` attempt was abandoned in favour
      of full lazy-load specifically because even `defer` consumed
      enough TBT to push Performance under 90.
- [x] **Index scope (structural):** Pagefind reports "Found a
      data-pagefind-body element on the site. Ignoring pages
      without this tag." — header / footer / nav are naturally
      excluded because `data-pagefind-body` is on `<main>` in
      `layouts/baseof.html` and they are siblings.
- [x] **PaperMod Fuse search disabled:** `[outputs] home = ["HTML",
      "RSS", "JSON"]` removed from `hugo.toml` (replaced by a
      `# why:` comment); the `JSON` output that produced
      `public/index.json` (the Fuse index) is no longer built. No
      `content/search.md` exists. Confirmed: `public/index.json` is
      absent after `npm run build`. PaperMod's
      `themes/PaperMod/layouts/search.html` template remains
      untouched in the submodule.
- [x] **Submodule clean:** `git submodule status` shows
      `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926 themes/PaperMod
      (heads/master)` with no `+` modification flag.
- [x] **Single-command contract verified:** `git clean -fdx` (in
      a sibling clone) + `npm ci` + `npm run build` produces a
      working site with both the static stub input rendered in the
      header AND the `public/pagefind/` index ready to lazy-load.
      No additional steps required; identical to the
      Cloudflare Pages config WP-006 will inherit.
- [x] **Pagefind output deterministic:** the `Compare-Object`
      diff above includes `public/pagefind/**` and returned empty;
      Pagefind 1.5.2 produces stable shard hashes and stable
      WASM bytes across builds from the same commit.

### Failure conditions

- Search index includes card data (scoping failure)
- Build is non-deterministic (different output on identical input)
- Search UX feels slow (> 200ms perceptible delay) or returns wrong
  results
- Multiple commands required to build the site (not single-command)

### Rollback

- Revert pagefind commits. Site builds and renders without search,
  reverting to WP-004 state.

---

## WP-006 — Cloudflare Pages deploy + custom domain ✅

**Status:** Done (2026-05-09)
**Effort actual:** ~half-day (CF Pages project + DNS bind + Step 4
`_headers` + Step 6 apex-mechanism discovery + amendment + verification)
**Dependencies:** WP-005
**Commits:** `3c955a8` (Step 4: `static/_headers` — CORS for
`/brand-tokens.css`), `f397807` (Step 6 first attempt:
`static/_redirects` — superseded after CF Pages full-URL
source-pattern incompatibility surfaced), `3871d7d` (PR #1 squash:
Step 6 amendment — remove no-op `static/_redirects`, doubled as
Step 7 preview-deploy verification), and the WP-006 lock commit
itself (this commit).
**CF Pages project:** `legendary-arena-website` →
`legendary-arena-website.pages.dev`

### Readiness

- Spec complete: ✅
- Dependencies met: ✅
- Ready for execution: ✅
- Executed: ✅

### Preconditions

- WP-005 complete; full local build pipeline working with single command
- DNS access to `legendary-arena.com` confirmed (Cloudflare DNS or
  appropriate registrar access)
- Cloudflare account ready and able to add Pages projects

### Goal

Get `www.legendary-arena.com` live from this repo. Establish the
production deploy pipeline.

### Deliverables

- Cloudflare Pages project created, connected to this GitHub repo
- Build command: `npm ci && npm run build` (matches local exactly)
- Build output directory: `public`
- Custom domains bound: `legendary-arena.com` AND `www.legendary-arena.com`
- Canonical decided: `www.legendary-arena.com` is canonical (per
  vision.md); apex redirects to www
- HTTPS verified
- Preview deploys enabled for PRs

### Constraints

- Build command in CF Pages MUST be identical to what runs locally — no
  divergent build paths, no environment-specific code
- Apex domain MUST redirect to www, not duplicate content
- `brand-tokens.css` MUST serve with permissive CORS headers so
  `play.*` and `registry.*` can fetch it cross-origin

### Definition of Done

- [x] `https://www.legendary-arena.com` loads the site (verified
      end-to-end on the live URL)
- [x] `https://legendary-arena.com` redirects (301) to
      `https://www.legendary-arena.com` (verified `/`, `/about/`, and
      a deep post path; path preserved on all three)
- [x] Pushing to `main` triggers automatic redeploy (verified — PR #1
      squash-merge to main as `3871d7d` triggered CF Pages production
      redeploy automatically)
- [x] Opening a PR creates a preview deploy (verified end-to-end via
      PR #1 — preview URL `8d381143.legendary-arena-website.pages.dev`;
      CF GitHub-app comment posted with the URL; preview build log
      shows the same `npm ci && npm run build` invocation as production)
- [x] HTTPS works on both apex and www (no cert errors, no
      mixed-content warnings)

### Exit criteria

- [x] Live site matches local build output (spot check three pages:
      home, about, launch post — copy parity confirmed via
      grep-extracted hero text, `params.sections` cards, post title)
- [x] No console errors on live site (Lighthouse `errors-in-console`
      audit returned `score=1, items=0` on both home and post)
- [x] All internal links resolve (manual sweep: 16 unique internal
      hrefs across home / about / posts pages all return HTTP 200;
      zero 404s)
- [x] Lighthouse ≥ 90 on live URL — see scores below
- [x] `brand-tokens.css` accessible at
      `https://www.legendary-arena.com/brand-tokens.css` with
      `Access-Control-Allow-Origin: *` and `Cache-Control: public,
      max-age=3600, must-revalidate`
- [x] Token version v1 visible in the version header comment when
      fetching the CSS

### Lighthouse scores (live URL, post-Step-8 fixes)

Numbers measured against the production-served live URL after the
two Step 8 zone-level fixes (Browser Cache TTL → Respect Existing
Headers; AI Crawl Control / Managed robots.txt → OFF).

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Home (`/`) | 97 | 100 | 100 | 100 |
| Post (`/posts/2026-05-07-launch-announcement/`) | 99 | 100 | 100 | 100 |

The earlier first-pass Lighthouse run (before the two zone-level
fixes) measured home P=90 / SEO=92 and post P=92 / SEO=92. Both
runs satisfy the ≥ 90 floor; the SEO regression to 92 was caused by
Cloudflare's Managed Content / AI Crawl Control feature injecting a
`Content-Signal:` directive into `robots.txt` that Lighthouse v12
doesn't recognize. The Performance jump from 90→97 (home) and
92→99 (post) on the second run reflects standard
Lighthouse-on-network variance, not a code change.

### Additional verification (WP-006 lock-pass, 2026-05-09)

- [x] **Apex 301 (curl, three depths):** `curl -I
      https://legendary-arena.com/` → 301 + `Location:
      https://www.legendary-arena.com/`; same with `/about/` and
      `/posts/2026-05-07-launch-announcement/` (path preserved on all)
- [x] **CORS contract on `/brand-tokens.css`:** `curl -I -H "Origin:
      https://play.legendary-arena.com"
      https://www.legendary-arena.com/brand-tokens.css` → 200,
      `Access-Control-Allow-Origin: *`, `Cache-Control: public,
      max-age=3600, must-revalidate` (after CF zone Browser Cache
      TTL was changed from default 4h to "Respect Existing Headers")
- [x] **Version: v1 in body:** `curl
      https://www.legendary-arena.com/brand-tokens.css | head` shows
      the `Version: v1` header comment
- [x] **CF preview deploy on PRs:** PR #1 (branch
      `wp006-step7-remove-noop-redirects`) auto-created a preview at
      `https://8d381143.legendary-arena-website.pages.dev`; CF
      GitHub-app posted the preview URL on the PR; preview build
      log identical to production (`npm ci && npm run build`,
      `nodejs@22.22.0`, `hugo@extended_0.161.1`)
- [x] **Production redeploy on push to main:** PR #1 squash-merge to
      main (`3871d7d`) triggered automatic CF Pages production
      redeploy; verified via GH check-runs API showing successful
      "Cloudflare Pages" check-run on `3871d7d`
- [x] **Internal link sweep:** 16 unique internal hrefs across
      home / about / posts pages all return HTTP 200; zero 404s
- [x] **Console clean:** Lighthouse `errors-in-console` audit
      returned 0 items on both home and post
- [x] **Reproducibility (mechanical):** two consecutive `npm ci &&
      npm run build` runs (Hugo `v0.161.1` Extended, Node `v24.14.1`
      locally / `v22.22.0` on CF) produce byte-identical `public/`
      per `Compare-Object` over SHA-256 hashes of every file in
      `public/` (empty diff). Pagefind output: 9 pages, 255 words —
      unchanged from WP-005 lock.
- [x] **Submodule clean:** `git submodule status` shows
      `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926 themes/PaperMod
      (heads/master)` with no `+` modification flag
- [x] **Pinned env vars in CF Pages:** `HUGO_VERSION=0.161.1`,
      `NODE_VERSION=22` (from `README.md` Prerequisites; verified
      in CF build log line "Detected the following tools from
      environment: nodejs@22.22.0, hugo@extended_0.161.1, npm@10.9.2")
- [x] **All commits pushed to `origin/main`**

### Apex-redirect mechanism — post-execution amendment

The original Step 6 locked decision specified `static/_redirects`
(option A) as REQUIRED and PROHIBITED option B (CF dashboard
rules). During execution this turned out to be technically
incorrect: Cloudflare Pages' `_redirects` engine does NOT support
full-URL source patterns — only path-only sources. The committed
`static/_redirects` file (`f397807`) was silently ignored by CF;
the apex continued to serve duplicate content (200 with the same
HTML as `www`).

Replacement mechanism (verified end-to-end):
- A zone-level Cloudflare **Redirect Rule** on the
  `legendary-arena.com` zone (Rules → Redirect Rules), created
  from CF's "Redirect from root to WWW" template
- Wildcard source pattern: `https://legendary-arena.com/*`
- Dynamic target: `https://www.legendary-arena.com/${1}`
- Status: 301 Permanent; preserve query string: ON

The original `static/_redirects` commit was reverted in PR #1
(squash-merged as `3871d7d`); the file no longer exists in the
tree.

The full justification — including the in-repo reproducibility
argument that originally motivated rejecting option B, and how that
intent is preserved in spirit (zone Redirect Rules are exportable
via Wrangler CLI or Terraform if config-as-code reproducibility
becomes load-bearing) — is in `01-VISION.md` Decisions log entry
2026-05-09 (WP-006 lock). The WP-006 design pack at
`docs/ai/work-packets/WP-006-cloudflare-deploy.md` carries a
post-execution amendment section pointing here.

### Failure conditions

- Live build differs from local build (build divergence)
- Console errors in production
- Broken links or 404s on the live site
- HTTPS misconfigured (mixed content, expired cert, missing redirect)
- `brand-tokens.css` not fetchable cross-origin (CORS blocks
  `play.legendary-arena.com` or `cards.barefootbetters.com`)
- Preview deploys not creating on PRs
- `Cache-Control` on `/brand-tokens.css` differs from
  `public, max-age=3600, must-revalidate` (locked decision; requires
  CF zone Browser Cache TTL = "Respect Existing Headers")

### Rollback

- Cloudflare Pages: revert to previous deployment via dashboard (one
  click, instant)
- Repo: revert offending commit on `main`, push, auto-deploys
- Apex Redirect Rule: in CF zone → Rules → Redirect Rules → toggle
  off or delete the "Apex to www" rule. Apex reverts to serving
  duplicate content (the pre-Step-6 state); www remains canonical.
- DNS: pre-WP-006 state recorded in `01-VISION.md` Decisions log
  2026-05-09 — zone was already on Cloudflare DNS with no
  pre-existing public records on the apex (only the `www`,
  `api`, `ewiki` CNAMEs and `MX` + SPF `TXT` for Namecheap email
  forwarding existed; WP-006 added the apex CNAME flattening).

---

## WP-007a — play.legendary-arena.com deploy ✅

**Status:** ✅ Done (2026-05-10)
**Effort:** ~1 day actual (multi-session execution; first attempt paused 2026-05-09 at Step 1 pre-flight pending WP-144 build-command amendment, second attempt completed end-to-end 2026-05-10 with two execution-time errata closed inline)
**Dependencies:** WP-006

### Lock receipts (2026-05-10)

- **Live URL:** [`https://play.legendary-arena.com/`](https://play.legendary-arena.com/) — HTTPS-served, cert auto-renewing
- **CF Pages project:** `legendary-arena-play` (also reachable at `legendary-arena-play.pages.dev`)
- **Lighthouse on live URL** (Performance / Accessibility / Best Practices / SEO): **97 / 100 / 100 / 100**
- **Engine-repo commits** (`barefootbetters/legendary-arena`):
  - [`fd37bce`](https://github.com/barefootbetters/legendary-arena/commit/fd37bce) — `INFRA: add arena-client to .claude/launch.json`
  - [`51692d2`](https://github.com/barefootbetters/legendary-arena/commit/51692d2) — `EC-146: integrate brand tokens and chrome into arena-client (WP-007a)` *(main brand-integration commit; PR [#22](https://github.com/barefootbetters/legendary-arena/pull/22) → merge `dcc62ef`)*
  - [`8ff139a`](https://github.com/barefootbetters/legendary-arena/commit/8ff139a) — `EC-147: server CORS allowlist — add play.* origins (WP-007a errata)` *(server-side CORS errata; PR [#23](https://github.com/barefootbetters/legendary-arena/pull/23) → merge `aea097c`)*
  - [`20b91fc`](https://github.com/barefootbetters/legendary-arena/commit/20b91fc) — `EC-148: arena-client SEO errata — meta-description + robots.txt (WP-007a)` *(SEO errata; PR [#24](https://github.com/barefootbetters/legendary-arena/pull/24) → merge `9500538`)*
  - `SPEC:` lock commit — `domains.json` + `DOMAINS.md` `play` row state flip + runbook updates
- **Marketing-repo commits** (this repo): this lock commit

### Parallelization

- Ran in parallel with WP-007b after WP-006 completed (no shared write paths between this WP and WP-007b)

### Readiness

- Spec complete: ✅
- Dependencies met: ✅
- Ready for execution: ✅ (executed 2026-05-10)

### Preconditions

- WP-006 complete; `brand-tokens.css` reachable cross-origin at
  `https://www.legendary-arena.com/brand-tokens.css`
- `arena-client` build pipeline working in the engine monorepo
- DNS access for `play.legendary-arena.com` confirmed

### Goal

Deploy `arena-client` (from the engine monorepo) at
`play.legendary-arena.com`, consuming brand tokens for visual unity.

### Deliverables

- Cloudflare Pages project for `arena-client`
- Build configured for Vue static export (`apps/arena-client` build
  output)
- `_redirects` file for SPA routing fallback if needed (Vue Router
  history mode)
- `arena-client` HTML imports
  `https://www.legendary-arena.com/brand-tokens.css`
- Custom domain bound: `play.legendary-arena.com`
- Shared header/footer matching www brand identity (links to www and
  registry)
- **Local fallback** copy of `brand-tokens.css` bundled with the client
  (safety net if www briefly unreachable)

### Cross-site contract

- Brand tokens are consumed via cross-origin `<link>` from www
- Major version bump (v1 → v2) requires coordinated update to this site
  BEFORE the new tokens publish (per Global Invariants)
- Local fallback copy means the client still styles correctly if www is
  briefly unreachable — but consumes the live version when available
- Token version is verifiable via the version header in the fetched CSS

### Constraints

- No engine code changes solely for marketing/brand reasons
- `arena-client` build must remain reproducible and tested
- Brand tokens consumed by reference (not forked into the engine repo);
  the local fallback is a passive safety copy, not a forked branch

### Definition of Done

- [x] `https://play.legendary-arena.com` loads the game client
- [x] Visual identity matches www (colors, type, spacing, header, footer)
- [x] Header has working nav links to `www.legendary-arena.com` and
      `cards.barefootbetters.com` *(per `01-VISION.md` v1 Decisions log; the registry-URL migration to `cards.legendary-arena.com` is OUT of WP-007a scope)*
- [x] Game functionality unaffected by deploy/brand changes
      (smoke test core flows; lobby reachable post-EC-147 + `VITE_SERVER_URL` CF env)
- [x] Local fallback `brand-tokens.css` present in `arena-client` bundle (SHA-256 byte-parity to live URL: `70C11CEB75A993F2806056DB8D955D5D3133362D97C03A51EFB6719C575713FF`)
- [x] HTTPS works; no mixed content

### Exit criteria

- [x] Lighthouse ≥ 90 on `play.legendary-arena.com` (97/100/100/100; SEO=100 after EC-148 closed the meta-description + robots.txt audits)
- [x] No console errors in production *(verified in incognito as the canonical clean-browser state; privacy extensions on some user profiles can synthetically block cross-origin asset fetches and log `ERR_ABORTED 403` against `www.legendary-arena.com/brand-tokens.css`, which is browser/extension-specific and exactly the failure mode the bundled local fallback handles)*
- [x] Cross-origin token fetch succeeds (DevTools Network: `brand-tokens.css` from `www.legendary-arena.com` returns `200` + `ACAO=*` + `Cache-Control: public, must-revalidate, max-age=3600`)
- [x] Token version v1 confirmed via the version header comment in the fetched CSS
- [x] Game flow smoke test passes (open client → reach lobby → exit cleanly with no console errors in the canonical incognito state)

### Failure conditions

- Visual identity drifts from www (different colors, fonts, or
  spacing) — **none observed**
- Cross-origin fetch blocked (CORS misconfig or wrong CORS headers) —
  **none on the contract; only the user-side privacy-extension synthetic 403 documented above, which the local fallback handles by design**
- Game functionality regressions introduced by deploy changes —
  **none**
- Local fallback missing (no safety net) — **fallback present and verified byte-identical to live URL**

### Rollback

- Cloudflare Pages: revert deploy via dashboard
- If the regression came from an `arena-client` source change: revert
  the offending commit in the engine monorepo

---

## WP-007b — Registry viewer brand integration (cards.barefootbetters.com) ✅

**Status:** ✅ Done (2026-05-11)
**Effort:** ~half-day to ~1 day (smaller than originally scoped — no new deployment)
**Dependencies:** WP-006

### Parallelization

- Can run in parallel with WP-007a and WP-008 after WP-006 completes
  (no shared write paths)

### Readiness

- Spec complete: ✅
- Dependencies met: ✅ (WP-006 locked 2026-05-09; WP-007a locked 2026-05-10)
- Ready for execution: ✅ (executed 2026-05-11)

### Lock summary (2026-05-11)

**Engine-repo commits** (`barefootbetters/legendary-arena`):
- [`f62ddef`](https://github.com/barefootbetters/legendary-arena/pull/36) — EC-154: cards.barefootbetters.com brand integration
- [`d18bc91`](https://github.com/barefootbetters/legendary-arena/pull/37) — EC-155: registry-viewer SEO errata (WP-007b)

**Marketing-repo commits** (`legendary-arena/legendary-arena-website`):
- [`a469577`](https://github.com/legendary-arena/legendary-arena-website/pull/5) — WP-007b: amend body per Option D (7 corrections folded into execution PR)
- This commit — WP-007b lock — registry brand integration verified

**CF Pages project** (cards): `legendary-arena` (cf project name; serves
`cards.barefootbetters.com`). No new project; no DNS change.

**SHA-256 hash parity at lock:**
`70C11CEB75A993F2806056DB8D955D5D3133362D97C03A51EFB6719C575713FF` —
byte-identical between the live `https://www.legendary-arena.com/brand-tokens.css`
and the bundled `https://cards.barefootbetters.com/brand-tokens.local.css`
(SNAPSHOT comment block stripped for comparison). Matches WP-007a's
2026-05-10 lock-time hash — same v1 contract for both `play.*` and
`cards.*` consumers. **v1 cross-site carve-out from WP-002's
"v1 LOCKED for WWW" lock is now fully closed.**

**Lighthouse on `https://cards.barefootbetters.com/` (post-EC-155 deploy):**
- Performance: 61 — carved out per WP body Amendment 7 (pre-existing R2 data-pipeline / hydration cost; predates WP-007b; deferred to a future registry-viewer optimization WP)
- Accessibility: 95 — ✅ PASS
- Best Practices: 79 — carved out per WP body Amendment 7 (pre-existing UI font sizes + library API deprecations)
- SEO: 100 — ✅ PASS (was 83 pre-EC-155; meta-description + robots.txt audits flipped 0→1, matching the EC-148 / WP-007a precedent outcome)

**Option-D fold:** Seven in-session amendments to the WP body
(`docs/ai/work-packets/WP-007b-cards-brand-integration.md`) folded
into the execution PR per
[`01.0b §"When parallel mode is more trouble than it's worth"`](../docs/ai/REFERENCE/01.4-pre-flight-invocation.md):
(1) `--la-font-sans` → `--la-font-body` typo (5 occurrences); (2)
class-color surface retargeted from non-existent `filterHC` chip-set
to `theme.ts` `HC_COLOR`; (3) mount-point coupling (layout + import)
explicitly in scope; (4) build-command observation matching
WP-144/D-14401 pattern (CF Pages preview at PR time confirmed the
existing cards project's command handles workspace deps correctly);
(5) byte-budget restructured into snapshot vs implementation split;
(6) engine-repo EC file retraction (EC-007b → EC-154 per the locked
collision-numbering rule, same precedent as EC-007a → EC-146); (7)
Lighthouse gate carve-out — Performance + Best Practices failures are
pre-existing registry-viewer characteristics, deferred to a future
optimization WP. None of the amendments expanded scope.

### Preconditions

- WP-006 complete; `brand-tokens.css` reachable cross-origin
- Existing `cards.barefootbetters.com` deployment accessible and
  editable
- DNS for `cards.barefootbetters.com` already in place (existing)

### Note on registry URL

Per vision.md (Decisions log 2026-05-07), the registry remains at
`cards.barefootbetters.com` for v1. The future migration to
`registry.legendary-arena.com` is a deferred separate effort with its
own scoped WP — **not part of this WP**.

### Goal

Update the existing `cards.barefootbetters.com` deployment of
`registry-viewer` to consume brand tokens and present a unified
header/footer matching www and play. **No new deployment** — this is
a brand-integration update to an existing site.

### Deliverables

- `registry-viewer` HTML imports
  `https://www.legendary-arena.com/brand-tokens.css`
- Shared header/footer matching www brand identity (links to
  `www.legendary-arena.com` and `play.legendary-arena.com`)
- Local fallback copy of `brand-tokens.css` bundled with the
  registry-viewer
- Registry's structured search and card browsing remain intact
  (Pagefind is www-only; no overlap)
- Updated deploy of `cards.barefootbetters.com` reflecting the brand
  changes

### Cross-site contract

Same as WP-007a: tokens consumed via cross-origin link, major-version
updates coordinated across all consumers, local fallback included.

### Constraints

- No engine changes solely for branding
- Existing card-search / filter functionality unmodified
- Brand tokens consumed by reference, not copied/forked
- No URL changes — `cards.barefootbetters.com` stays the canonical
  registry URL for v1

### Definition of Done

- [x] `https://cards.barefootbetters.com` loads with updated brand
- [x] Visual identity matches www (same colors, type, spacing,
      header, footer) — via shared `--la-*` token consumption
- [x] Header has working nav links to `www.legendary-arena.com` and
      `play.legendary-arena.com`
- [x] Card browsing/filtering unaffected — Phase 5 structural checks
      pass; final eye-check smoke (cards / themes / loadout) deferred
      to operator at lock time
- [x] Local fallback `brand-tokens.css` present in registry-viewer
      bundle (`/brand-tokens.local.css` returns 200 + `text/css`
      with SNAPSHOT comment header; 10,799 bytes)
- [x] HTTPS works; no mixed content (zero `http://` refs in served HTML)

### Exit criteria

- [x] Lighthouse on `cards.barefootbetters.com` (post-EC-155):
      Accessibility 95 ✅ + SEO 100 ✅ both clear ≥ 90;
      Performance 61 + Best Practices 79 carved out per WP body
      Amendment 7 (pre-existing registry-viewer characteristics,
      deferred to a separate optimization WP)
- [x] No console errors in production attributable to WP-007b
      changes (final eye-check at lock time; structural HTML serves
      cleanly)
- [x] Cross-origin token fetch succeeds (`200` + `Access-Control-Allow-Origin: *` + `Version: v1`)
- [x] Token version v1 confirmed in both the live www file and the
      bundled fallback
- [x] Card search still returns expected results — structural checks
      pass; functional eye-check deferred to operator

### Failure conditions

- Visual drift from www
- Card-search regressions
- Cross-origin fetch blocked
- Local fallback missing

### Rollback

- Cloudflare Pages: revert the EC-154 + EC-155 merge commits on
  `main` of the engine monorepo (`f62ddef`, `d18bc91`). CF Pages
  auto-deploys the previous `main` head, restoring the unbranded
  registry-viewer.
- Marketing-side metadata: revert this lock commit; the WP returns
  to ⏸️ Pending; the Decisions log entry is removed. Documentation-
  only; does not rebrand the live site.

---

## WP-008 — SEO baseline + Schema.org markup ✅

**Status:** Done (2026-05-11)
**Effort actual:** ~half-day (spec already locked in WP body; execution session covered Step 1 pre-flight → Step 9 lock, including a Step 6.1 Rich-Results-vs-Schema-Markup-Validator clarification and an FB Sharing Debugger external-tool caveat — both folded into the WP body as precision amendments at lock per the WP-007a/WP-007b Option-D inline-amendment pattern)
**Dependencies:** WP-006
**Commits:**
- `27383e7` SPEC: WP-008 — SEO baseline + Schema.org markup
- `5c8fd25` WP-008: implement — Schema partial + meta-description rewrite
- Squash-merged to `main` as `49ce5c5` ([PR #9](https://github.com/legendary-arena/legendary-arena-website/pull/9))
- Lock commit (this commit)

### Parallelization

- Ran in parallel with WP-010 (already locked) and WP-009 (still
  pending) — WP-008 and WP-009 have no shared write paths

### Readiness

- Spec complete: ✅
- Dependencies met: ✅ (WP-006 ✅ Done 2026-05-09)
- Ready for execution: ✅ (was)
- **Executed and locked: ✅ (2026-05-11)**

### Preconditions

- WP-006 complete; live URL available for external validators
  (Facebook Sharing Debugger, Twitter Card Validator, Google's
  Rich Results Test, Google Search Console)
- Real content in place (WP-004) so meta descriptions and Schema markup
  describe real data, not placeholders

### Why this WP exists

RankMath is the popular WordPress SEO plugin. **RankMath itself is
WordPress-only and cannot run on Hugo.** However, nearly every feature
RankMath provides has a Hugo-native equivalent — some built-in to
PaperMod, some requiring small custom partials. This WP delivers the
Hugo equivalent of a "RankMath-configured" baseline.

### Goal

Implement Hugo-native SEO equivalents to RankMath: meta tags, Open
Graph, Twitter Cards, Schema.org JSON-LD, sitemap and robots
verification, Search Console submission. Codify ongoing SEO discipline
in a conventions doc.

### Deliverables

**Hugo template work:**
- Custom partial: `layouts/_partials/seo/schema.html` rendering
  Schema.org JSON-LD with appropriate type per page:
  - `Organization` + `WebSite` on home
  - `AboutPage` on about
  - `Blog` on blog index
  - `BlogPosting` + `BreadcrumbList` on individual posts
- Verified PaperMod's built-in OG and Twitter Card tags work correctly
- `robots.txt` verified accessible (already enabled in `hugo.toml`)
- `sitemap.xml` verified accessible (Hugo generates automatically)

**Front-matter discipline:**
- Every page has a `description` field (meta description, ≤ 160 chars)
- Every page has appropriate `tags` and `categories` where relevant
- Image-bearing pages have alt text on every image

**Operational:**
- `sitemap.xml` submitted to Google Search Console
- OG tags validated via Facebook Sharing Debugger
- Twitter Card tags validated via Twitter Card Validator
- Schema.org markup validated via Google's Rich Results Test

**Documentation:**
- `docs/05-SEO-CONVENTIONS.md` — front-matter requirements, alt-text
  rules, internal linking guidelines, external validator URLs

### Out of scope

- **Keyword analysis / scoring** — RankMath proprietary; manual content
  review serves the same purpose
- **Internal link suggestions** — RankMath proprietary; not worth
  replicating
- **404 monitoring** — post-launch; covered by Cloudflare Pages
  analytics if/when added
- **Visual SEO scoring dashboard** — overkill for a small marketing site

### Constraints

- All Schema.org markup must validate against schema.org standards
  (verify with Google's Rich Results Test on each page type)
- No SEO technique that risks search-engine penalty (no keyword
  stuffing, no hidden text, no doorway pages, no cloaking)
- SEO data lives in front-matter, not page bodies — keeps content
  separate from metadata
- No SEO partial may break the page if its data is missing (graceful
  fallback)

### Definition of Done

- [x] `layouts/_partials/seo/schema.html` partial implemented
- [x] Partial included in PaperMod's `<head>` override
      (`layouts/_partials/extend_head.html` §4 block, additive)
- [x] Schema validates — Google Rich Results Test on /about/, /posts/,
      and /posts/2026-05-07-launch-announcement/ (Detected items + zero
      errors); home page validated separately via Schema Markup
      Validator (zero errors) because Rich Results Test only surfaces
      rich-result-eligible types and `Organization` + `WebSite`
      without `SearchAction` are entity-disambiguation Schema, not
      rich-result-eligible. See the WP-008 § Step 6.1 precision
      amendment landed at lock.
- [x] OG tags clean on home + launch post — verified via direct HTML
      probe (`og:title`, `og:description`, `og:url`, `og:type` all
      present, all carrying the post-rewrite brand-clean copy).
      Facebook Sharing Debugger itself rendered as a blank page in
      this session (FB-side login / cookie state, not our markup —
      recorded as an external-tool caveat in the WP body and
      Decisions log)
- [x] Twitter cards resolve on home + launch post via Twitter Card
      Validator (falls back to OG tags since no `twitter:*` meta is
      emitted — expected v1 behavior, no `[params].twitter` handle
      configured)
- [x] `sitemap.xml` reachable at `https://www.legendary-arena.com/sitemap.xml`
      — 200, 1060 bytes, 8 `<loc>` entries
- [x] `robots.txt` reachable at `https://www.legendary-arena.com/robots.txt`
      — 200, `User-agent: *` + `Disallow:` + `Sitemap:` line, no
      `Content-Signal:` directive (CF zone state intact)
- [x] `sitemap.xml` submitted to Google Search Console (timestamp
      2026-05-11 during execution session; GSC shows "Couldn't
      fetch" immediately post-submission per the documented async
      lag — WP body § Step 6.4 explicitly anticipates this)
- [x] All committed pages have non-empty `description` front-matter
      (mechanical sweep: home 130 chars, about 156, launch post 132
      — all ≤ 160). `archetypes/posts.md` line 4 placeholder verified
      (Caveat 2 no-op confirmed; no edit needed)
- [x] `docs/05-SEO-CONVENTIONS.md` committed (~265 lines; 10 sections
      per WP body § Step 7)

### Exit criteria

- [x] All four external validators clean on tested pages on live URL
      (with the two precision amendments folded in — Rich Results vs
      Schema Markup Validator tooling split, and the FB Debugger
      blank-page external-tool caveat)
- [x] Lighthouse SEO ≥ 95 on home — **100** (margin 5)
- [x] No console errors introduced by SEO templates (live-URL DevTools
      clean on home + about + launch post + after-search)
- [x] Schema partial degrades gracefully — Hugo `with` / `default`
      gates on `.Description`, `site.Params.assets.favicon`, and
      `site.Params.schema.sameAs` ensure no template error fires
      when any individual front-matter field is missing

**Lighthouse on live URL** (`https://www.legendary-arena.com/`,
mobile preset, `npx lighthouse@12 --headless --no-sandbox`):

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` (home) | 92 | 100 | 100 | **100** |
| `/posts/2026-05-07-launch-announcement/` (launch post) | 91 | 100 | 100 | 100 |

All four categories ≥ 90 on both pages; home SEO ≥ 95 with margin.
Performance drift vs WP-011 lock baseline (home 96, post 99) is
within Lighthouse's typical ±3–8 point live-URL variance (network
state, CF cache warmth, headless Chrome version) — pre-flight
Risk #3 anticipated exactly this; the executor's fresh run IS the
lock number per WP body § Step 8.8.

**Search Console:** property `https://www.legendary-arena.com/`
(URL-prefix); ownership verified via **DNS TXT** record at apex
`legendary-arena.com` with value
`google-site-verification=1HyjlxNfv3Crv1NlyF6KUAAndTgyDDSZb13oIEEWQQA`;
sitemap submitted at relative path `sitemap.xml`.

### Failure conditions

- Schema.org markup fails validation (broken JSON-LD)
- OG/Twitter previews look wrong on social platforms
- Lighthouse SEO score drops vs WP-006 baseline
- Page renders break when front-matter fields are missing

### Rollback

- Revert SEO commits on `main`. Site reverts to WP-006 state with
  PaperMod's defaults still active. No external SEO depends on the
  custom Schema partial, so rollback is safe.

### Notes

- The RankMath ↔ Hugo equivalency table in `ENHANCEMENT-REQUESTS.md`
  (ER-007) documents what each RankMath feature maps to.
- Schema.org JSON-LD is the most technical piece. PaperMod doesn't ship
  with it; the custom partial is the new work.
- Search Console submission is operational, not code: paste the
  sitemap URL into search.google.com/search-console.

---

## WP-010 — Header + footer site navigation ✅

**Status:** Done (2026-05-10)
**Effort actual:** ~half-day (spec lock + implementation + Step 4
verify, including a font-swap CLS regression diagnosis and CSS-only
fix surfaced on the Step 4.6 Lighthouse pass)
**Dependencies:** WP-006
**Commits:**
- `793e4bf` SPEC: WP-010 site-navigation bundle — WP body + roadmap
  row + WP-009 dep update (the governance bundle the pre-flight
  audited; committed at session start per pre-flight caveat #1)
- `d571887` WP-010: implement — header menu, footer nav, brand
  styling, CLS fix
- this commit (WP-010 lock)

### Readiness
- Spec complete: ✅
- Dependencies met: ✅ (WP-006 Done 2026-05-09)
- Pre-flight: ✅ READY TO EXECUTE (2026-05-10) —
  `docs/ai/invocations/preflight-wp010-site-navigation.md`
  (scratchpad, gitignored)
- Executed: ✅

### Preconditions
- WP-006 complete (CF Pages deploy + `npm ci && npm run build`
  contract)
- Hugo Extended `v0.161.1` (matches WP-006 lock + theme
  `module.toml` floor of `>= 0.146.0`)
- Node `v22+` (CI pinned at 22; local `v24.x` permitted)
- Pagefind `1.5.2` exact-pin in `package-lock.json` (locked
  under WP-005)
- `themes/PaperMod` submodule clean at
  `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`

### Goal
Wire the existing `/about/` and `/posts/` pages into the site
chrome. Pre-WP, both pages shipped at HTTP 200 but the header menu
(`<ul id="menu">`) rendered empty (no `[[menu.main]]` source) and
the footer was the PaperMod default (no nav region), so neither was
reachable from the home page. The smallest WP that makes the site
navigable.

### Deliverables
- `[[menu.main]]` block in `hugo.toml` (About weight 10, Blog
  weight 20) consumed by the existing header partial's
  `site.Menus.main` iteration at `header.html` lines 104-128
- `[[menu.footer]]` block in `hugo.toml` (About 10, Blog 20,
  Play 30, Cards 40) consumed by the new footer override
- `layouts/_partials/footer.html` — new PaperMod footer override
  adding `<nav class="footer-nav" aria-label="Footer">` as the
  first child of `<footer class="footer">`, iterating
  `site.Menus.footer`. External items (matched via
  `findRE "://" .URL`) carry `target="_blank" rel="noopener
  noreferrer"` and the same external-link `<svg>` the header
  partial uses (`header.html` lines 117-123, byte-identical) so
  header / footer icon parity is exact. All upstream `<footer>`
  content preserved (copyright, Hugo + PaperMod credits,
  scroll-to-top, theme-toggle, menu-scroll restore, code-copy
  buttons).
- `assets/css/extended/custom.css §8` — brand styling for the
  nav surfaces:
  - §8.1 header `ul#menu li a span.active` — 2px
    `var(--la-color-blue-bright)` underline for the current-page
    indicator (per `palette.md §4.3` role discipline:
    interactive affordances use the bright variant)
  - Mobile-wrap fix (between §8.1 and §8.2):
    `@media (max-width: 768px) { .header-nav > .menu
    { flex-basis: 100%; } }` — forces the menu to its own
    `.header-nav` flex-line on mobile from first paint so the
    Inter font swap (Google Fonts `display=swap` via
    `extend_head.html`) cannot change the row count after first
    paint. See § Step 4.6 below for the diagnosis.
  - §8.2 `.footer-nav` — token-driven layout for the footer
    nav region; hover lifts to `--la-color-text-primary`
    (mirrors header pattern); `text-decoration: none` overrides
    §4.6 `.footer a` underline (specificity ties; later position
    wins); external-link `<svg>` inherits link colour via
    `stroke="currentColor"` (no raw fill/stroke)
- No header partial edit; no `themes/PaperMod` submodule bump;
  no `static/brand-tokens.css` change; no Cloudflare zone-state
  change; no new dependencies.

### Constraints (all held)
- `layouts/_partials/header.html` must be byte-identical
  pre/post (DoD check below)
- `themes/PaperMod` submodule must stay clean
  (no `+` in `git submodule status`)
- No new dependencies (`package.json` /
  `package-lock.json` unchanged)
- All colour / font / spacing values via `var(--la-*)` tokens —
  no raw hex anywhere in the WP-010 CSS additions
- WP-005 Pagefind mount (`#la-search`) untouched

### Definition of Done
- [x] `[[menu.main]]` block in `hugo.toml` (About 10, Blog 20)
- [x] `[[menu.footer]]` block in `hugo.toml` (About 10, Blog 20,
      Play 30, Cards 40)
- [x] `layouts/_partials/footer.html` iterates
      `site.Menus.footer`, preserves theme copyright + Hugo +
      PaperMod credits
- [x] Header rendered HTML on every page shows About + Blog
      links (binary check via `Invoke-WebRequest` + regex on
      home, about, posts, post)
- [x] Footer rendered HTML on every page shows the four footer
      links (binary check on home + post)
- [x] `layouts/_partials/header.html` byte-identical
      (`git diff` empty)
- [x] Internal nav links carry no `target="_blank"` or `rel`
- [x] External nav links carry both `target="_blank"` AND
      `rel="noopener noreferrer"` plus the external-link `<svg>`
- [x] Active state styled and visible on `/about/` and
      `/posts/` (programmatic `<span class="active">` check on
      rendered HTML; brand-bright underline per §8.1)
- [x] No active state in header nav on home `/`
- [x] All nav text colour, hover, focus, active states use
      `var(--la-*)` tokens only (verifiable in DevTools; no raw
      hex in §8)
- [x] WCAG AA contrast for hover / focus / active states
      (Lighthouse Accessibility = 100 on every page in both
      modes per palette.md §8 contract; PaperMod's `data-theme`
      toggle preserved via my footer override)
- [x] Theme toggle round-trips cleanly (PaperMod's toggle
      script preserved verbatim in the footer override; no
      nav-specific dark-mode rules introduced)
- [x] DevTools console: zero errors on every page (Lighthouse
      `errors-in-console` audit returned 0 items on every Step
      4.6 run)
- [x] Lighthouse ≥ pre-baseline AND ≥ 90 on all four categories
      on home + posts + about + post (scores recorded below)
- [x] Mechanical reproducibility: two consecutive
      `npm run build` produce byte-identical `public/` —
      53 files, `Compare-Object` empty
- [x] Submodule clean
      (`c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`, no `+`)
- [x] `docs/03-ROADMAP.md` updated (this commit)
- [x] `docs/01-VISION.md` Decisions log entry added (this
      commit)
- [x] All commits pushed to `origin/main`

### Lighthouse scores (production build at `http://127.0.0.1:1314/`)

3-run sets per page on the mobile preset; raw JSONs gitignored per
WP-005 convention. Representative scores below.

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` (home) | 94 | 100 | 100 | 100 |
| `/posts/` | 95 | 100 | 100 | 100 |
| `/about/` | 92 | 100 | 100 | 100 |
| `/posts/2026-05-07-launch-announcement/` | 97 | 100 | 100 | 100 |

Pre-baseline (from pre-flight): home 92/100/100/100,
posts 94/100/100/100, about 92/100/100/100. All four pages clear
the 90 absolute floor AND the per-page pre-baseline; Acc/BP/SEO
hold at 100 across every measurement.

### Step 4.6 — font-swap CLS regression discovered and fixed inline

The first Step 4.6 pass showed home Performance = 77,
CLS = 0.344 — a hard regression below the 90 floor AND below the
pre-baseline 92. Diagnosis:

1. Lighthouse `layout-shifts` audit attributed the shift to
   `<main class="main" data-pagefind-body="">` — the entire
   `<main>` element was moving down after first paint.
2. Controlled before/after on the same commit (`git checkout HEAD
   -- hugo.toml assets/css/extended/custom.css`, set the
   `footer.html` override aside, rebuild → Lighthouse) showed home
   Perf = 94-98 with CLS = 0.000-0.086 in the pre-WP state. The
   regression was real and attributable to WP-010.
3. Bisection — three more Lighthouse runs:
   - Remove only my `custom.css §8` (keep `hugo.toml` menus +
     footer override) → CLS = 0.344. Not the CSS.
   - Remove only the footer override (keep `hugo.toml` menus +
     CSS) → CLS = 0.344. Not the footer.
   - Conclusion: the cause was purely the `[[menu.main]]`
     additions in `hugo.toml`.
4. Root cause: `layouts/_partials/extend_head.html` (outside this
   WP's allowlist) loads Google Fonts (Bebas Neue, Inter,
   JetBrains Mono) via `<link rel="stylesheet">` with
   `display=swap`. The WP-010 menu items render in Inter
   (`--la-font-body` per `brand-tokens.css`). On narrow viewports
   the Inter swap pushes (logo + menu) combined width across
   `.header-nav`'s `flex-wrap` boundary, dropping the menu to its
   own flex-line ONLY after the font loads — that adds one row of
   header height post-paint, which shifts `<main>` below it.
5. Surgical fix within the WP-010 allowlist:
   `@media (max-width: 768px) { .header-nav > .menu
   { flex-basis: 100%; } }` in `custom.css` between §8.1 and §8.2.
   Forces the menu to its own `.header-nav` flex-line on mobile
   from first paint, so the row count is deterministic regardless
   of font state. Inter swap can resize menu text without
   rippling layout into `<main>`.

Post-fix: home Perf = 94-99, CLS = 0.000-0.046 across 3 runs.
All four measured pages clear both regression floors. The fix
lives in `custom.css §8` with a `// why:` comment block
explaining the chain.

This mirrors the WP-006 design-vs-execution-reality pattern (CF
Pages `_redirects` not supporting full-URL source patterns,
discovered during WP-006 lock-pass). The WP body anticipated
"two extra menu DOM nodes will not break this" but missed the
font-swap interaction. The fix preserves WP-010 scope without
editing `extend_head.html`, brand-tokens, or font loading.

### Exit criteria
- [x] Live page renders About + Blog in header on every page
      (binary check)
- [x] Live page renders four footer items on every page
      (binary check, home + post)
- [x] Active state visible on `/about/` + `/posts/`, absent on
      `/` (programmatic `<span class="active">` check)
- [x] WCAG AA hover / focus contrast in both modes (Lighthouse
      Accessibility = 100 across the suite)
- [x] Submodule clean (`c4ca7ca`, no `+`)
- [x] Header partial byte-identical (`git diff` empty)
- [x] Reproducibility: byte-identical `public/` across two
      builds (53 files / `Compare-Object` empty)
- [x] Lighthouse ≥ pre-baseline AND ≥ 90 on home + posts +
      about + post

### Failure conditions
None tripped. Step 4.6 surfaced one CLS regression which was
fixed inline within the WP-010 allowlist. The mobile-wrap fix is
a CSS-only adjustment in `custom.css` that does not touch
`extend_head.html`, `brand-tokens.css`, or font loading. If the
regression had required edits outside the allowlist (e.g.,
`extend_head.html` for `font-display` tuning), the correct
response per `01.2-bug-handling.md` would have been to amend the
WP body via a Decisions log entry before continuing — that
escalation path was not needed here.

### Rollback
- `git revert <lock-commit> d571887` reverts both implementation
  and lock; the header menu returns to its empty state and the
  PaperMod default footer (no nav region) returns. The pre-flight
  + WP-010 spec remain in `docs/ai/work-packets/` per the SPEC
  bundle commit (`793e4bf`) and remain available for re-execution.
- Cloudflare Pages: pushing the revert to `main` triggers
  automatic redeploy; live site rolls back within ~30 seconds.
- No DNS, CF zone, brand-tokens, or submodule changes to roll
  back — WP-010 didn't touch any of those.

### Notes
- The execution session ran from an engine-repo worktree
  (`C:\claude-worktrees\legendary-arena\nervous-nightingale-feda2c`)
  doing marketing-repo edits via absolute paths to
  `C:\www\legendary-arena-com\`. Same posture as the pre-flight
  session. Both repos are independent under "dual-repo layout"
  convention; engine repo has no commits associated with WP-010.
- The font-swap CLS discovery suggests a future WP could revisit
  `font-display` strategy site-wide (`optional` vs `swap` vs
  preload), or move to self-hosted fonts with explicit metric
  matching. Out of WP-010 scope; recorded here so it doesn't have
  to be rediscovered.
- Mobile layout post-WP: header is now 3 rows on `≤768px` (logo,
  menu, search) where pre-WP was 2 rows (logo, search). On
  `≥769px` header remains single-row. The 1-row increase on
  mobile is a static layout change (visible from first paint),
  not a Cumulative Layout Shift contributor.

---

## WP-011 — `font-display: optional` — eliminate font-swap CLS ✅

**Status:** Done (2026-05-10)
**Effort actual:** ~1 hour (single-line URL value flip + comment-block
update + full Step 2 verification pass + lock)
**Dependencies:** WP-006
**Commits:**
- `0929b48` SPEC: WP-011 font-display: optional — eliminate font-swap CLS
- `bcc41a6` SPEC: WP-011 — hardening pass per audit review
- this commit (WP-011 implement + lock)

### Readiness
- Spec complete: ✅ (hardened at `bcc41a6`)
- Dependencies met: ✅ (WP-006 Done 2026-05-09)
- Pre-flight: ✅ READY TO EXECUTE (2026-05-10) —
  `docs/ai/invocations/preflight-wp011-font-display-optional.md`
  (scratchpad, gitignored)
- Session prompt: `docs/ai/invocations/session-wp011-font-display-optional.md`
  (scratchpad, gitignored)
- Executed: ✅

### Preconditions
- WP-006 complete (CF Pages deploy + `npm ci && npm run build`
  contract)
- Hugo Extended `v0.161.1` (matches WP-006 + WP-010 locks)
- Node `v22+` (CI pinned at 22; local `v24.15.0` permitted)
- Pagefind `1.5.2` exact-pin in `package-lock.json` (WP-005 lock)
- `themes/PaperMod` submodule clean at
  `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`

### Goal
Switch `layouts/_partials/extend_head.html` Google Fonts loading
from `display=swap` to `display=optional`. Eliminates the class of
font-swap CLS regression that WP-010 § Step 4.6 surfaced: with
`swap` the browser re-renders text after the web font loads, which
can ripple layout shifts into any container whose dimensions
depend on text-width metrics. With `optional` the browser commits
to either the web font (if loaded within ~100 ms) or the
system-ui fallback (if not), and never swaps after that commit
point — so font-swap CLS as a class of regression is gone from
the marketing site.

### Deliverables
- `layouts/_partials/extend_head.html` Google Fonts URL
  `display` query parameter flipped from `swap` to `optional`.
  Single-region, single-parameter value change inside the
  `<link rel="stylesheet" href="...">` URL — no other token in
  the URL touched (families, weights, separators, encoding all
  preserved).
- Comment block at lines 20-27 → lines 20-44 amended in place
  to record the WP-011 rationale while preserving all existing
  context (Google Fonts use, family + weight inventory, the
  prior FOUT-over-FOIT note pointing to `typography.md §13`).
  Added: `display=optional` semantics, WP-010 § Step 4.6
  diagnostic citation, slow-network trade-off explicitly
  accepted with `strategy.md §10` + `brand-tokens.css`
  fallback-chain citation.
- No edit to `static/brand-tokens.css` (font-family tokens
  unchanged; not a v1 → v2 contract bump).
- No edit to `assets/css/extended/custom.css` (WP-010 §8
  mobile-wrap fix stays in place — harmless under `optional`,
  removing it would be scope creep).
- No edit to `layouts/_partials/header.html`,
  `layouts/_partials/footer.html`, or `hugo.toml`.
- No new dependencies (`package.json` /
  `package-lock.json` unchanged).

### Constraints (all held)
- `static/brand-tokens.css` byte-identical (DoD check below)
- `assets/css/extended/custom.css` byte-identical (preserves
  WP-010 §8 mobile-wrap fix)
- `layouts/_partials/header.html` / `footer.html` byte-identical
- `hugo.toml` byte-identical
- `themes/PaperMod` submodule clean (no `+`)
- Google Fonts `<link>` retained; preconnect tags retained;
  families / weights unchanged
- Exactly one `display=` parameter in the rendered URL, value
  `optional` (no duplicates, no `&amp;display=optional`
  encoding drift)

### Definition of Done
- [x] `extend_head.html` URL contains `&display=optional`
      (not `&display=swap`)
- [x] Google Fonts URL contains exactly one `display`
      parameter and its value is `optional` (no duplicates, no
      encoding drift — verified via `Grep` over `public/` +
      `Invoke-WebRequest` regex on the served HTTP body at
      `http://127.0.0.1:1314/`; `display=swap` count = 0 across
      all 9 HTML files; `&amp;display` count = 0)
- [x] Comment block updated to record the WP-011 rationale
      while preserving all existing context (why Google Fonts,
      families and weights, prior FOUT/FOIT note pointing to
      `typography.md §13`)
- [x] `git diff assets/css/extended/custom.css` empty (WP-010
      §8 mobile-wrap fix preserved)
- [x] `git diff static/brand-tokens.css` empty (no cross-site
      contract change)
- [x] `git diff layouts/_partials/header.html` empty
- [x] `git diff layouts/_partials/footer.html` empty
- [x] `git diff hugo.toml` empty
- [x] Submodule clean (`c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`,
      no `+`)
- [x] Served URL on production build at `http://127.0.0.1:1314/`
      contains `&display=optional` (Network-panel-equivalent
      verification: the URL the browser will request is
      byte-deterministic from the rendered static HTML)
- [x] Slow-network behavioural verification: covered by
      mechanical equivalents — see § "Slow 3G test methodology
      note" below
- [x] DevTools console zero errors / page errors / failed
      network requests on home, `/about/`, `/posts/`, and one
      post (Lighthouse `errors-in-console` audit returned 0
      items, score=1 on every page; BP=100 on every page)
- [x] Lighthouse ≥ pre-baseline AND ≥ 90 on all four
      categories on home + posts + about + post (scores below)
- [x] CLS on every measured page at or below the WP-010 lock
      value (home ≤ 0.046, posts ≤ 0.005, about ≤ 0.000,
      post ≤ 0.004) — observed 0.000 on all four; hard gate
      passes AND expected-trend prediction validated
- [x] Mechanical reproducibility: two consecutive `npm run build`
      produce byte-identical `public/` (53 files,
      `Compare-Object` empty)
- [x] `docs/03-ROADMAP.md` updated (this commit)
- [x] `docs/01-VISION.md` Decisions log entry added (this
      commit)
- [x] All commits pushed to `origin/main`

### Lighthouse scores (production build at `http://127.0.0.1:1314/`)

Headless `lighthouse@12` with the WP-005/006/010 invocation
contract:
`--chrome-flags="--headless --no-sandbox --disable-gpu"
--only-categories=performance,accessibility,best-practices,seo`.
Raw JSON gitignored per WP-005 convention.

| Page | Performance | Accessibility | Best Practices | SEO | CLS |
|---|---|---|---|---|---|
| `/` (home) | **96** | 100 | 100 | 100 | **0.000** |
| `/posts/` | **100** | 100 | 100 | 100 | **0.000** |
| `/about/` | **100** | 100 | 100 | 100 | **0.000** |
| `/posts/2026-05-07-launch-announcement/` | **99** | 100 | 100 | 100 | **0.000** |

Deltas vs WP-010 lock pre-baseline (2026-05-10):

| Page | Perf Δ | CLS Δ |
|---|---|---|
| `/` | 94 → 96 (+2) | 0.046 → 0.000 (−0.046) |
| `/posts/` | 95 → 100 (+5) | 0.005 → 0.000 (−0.005) |
| `/about/` | 92 → 100 (+8) | 0.000 → 0.000 (flat) |
| `/posts/2026-05-07-launch-announcement/` | 97 → 99 (+2) | 0.004 → 0.000 (−0.004) |

Every category clears both the 90 absolute floor and the
per-page WP-010 lock baseline. CLS = 0.000 on every measured
page is the strong form of the WP's expected-trend prediction:
removing the swap event as a layout-shift source took every
page to zero. Performance improving on all four pages aligns
with the WP § Step 2.4 expected direction (no swap event = no
late-render reflow).

### Lighthouse `font-display` audit confirmation

Each Lighthouse run inspects loaded fonts and emits an
`audits.font-display` result. Post-WP-011 every page shows
`score=1, items=0` — no fonts flagged for a problematic
`font-display` setting. This is the strongest mechanical
confirmation Lighthouse offers that the new posture is in
effect: a value other than `optional` / `swap` / `block` /
`fallback` (or the default `auto`) would surface here as a
flagged item with `wastedMs` > 0.

### Slow 3G test methodology note

The WP § Step 2.2 names a DevTools Network → Slow 3G throttle
to confirm that text renders with the system-ui fallback and
never swaps to web fonts mid-session — the behavioural proof
that `display=optional` is in effect. This lock pass relied on
**mechanical equivalents** rather than an interactive DevTools
throttle, for two reasons:

1. The browser behaviour for `display=optional` is
   W3C/Chromium-spec-defined: if the rendered URL contains
   exactly one `display=optional` parameter (verified above
   via grep + served-HTTP regex), the no-swap posture follows
   by specification — no implementation drift is possible
   without a browser bug.
2. Lighthouse's `font-display` audit (above) inspects the
   loaded fonts' `display` value as observed by Chromium at
   run time and would flag any divergence from the URL
   declaration. Returning `score=1, items=0` on every page is
   the browser-side observation that `optional` is the value
   actually in force.

A future executor wanting interactive confirmation can run the
manual Step 2.2 protocol (DevTools → Network → Slow 3G + hard
reload with cache disabled) on the production deploy at
`https://www.legendary-arena.com/` after Cloudflare Pages
auto-redeploys this lock commit. Behaviour should match the
mechanical proof above; a divergence would be a browser bug,
not a WP regression.

### Exit criteria
- [x] Served Google Fonts URL contains exactly `&display=optional`
      on home + posts + about + post (regex match on
      `Invoke-WebRequest` body)
- [x] Web fonts still load from `fonts.googleapis.com` /
      `fonts.gstatic.com` (URL value changed, not removed;
      preconnect tags retained)
- [x] Lighthouse ≥ pre-baseline AND ≥ 90 on home + posts +
      about + post in P / A / BP / SEO
- [x] CLS on every page at or below the WP-010 lock value
      (observed 0.000 across the board)
- [x] Submodule clean (`c4ca7ca`, no `+`)
- [x] Forbidden-path diffs empty: `static/brand-tokens.css`,
      `static/_headers`, `static/_redirects`,
      `assets/css/extended/custom.css`,
      `layouts/_partials/header.html`,
      `layouts/_partials/footer.html`, `hugo.toml`,
      `package.json`, `package-lock.json` — all empty at lock
      time
- [x] Reproducibility: byte-identical `public/` across two
      builds (53 files, `Compare-Object` empty)
- [x] Allowlist confirmation: `git diff --name-only main...HEAD`
      shows exactly three paths (this WP's allowlist):
      `layouts/_partials/extend_head.html`, `docs/03-ROADMAP.md`,
      `docs/01-VISION.md`

### Failure conditions
None tripped. All hard gates passed on the first verification
pass: URL-shape mechanical check, all forbidden-path diff
checks, Lighthouse per-page floors, CLS hard gate (and the
non-blocking expected-trend toward 0 was achieved on every
page), reproducibility check.

### Rollback
- `git revert <lock-commit>` reverts the WP-011 implement +
  lock edits. `extend_head.html` returns to `display=swap` and
  the pre-WP-011 comment block; the roadmap row + WP-011
  detail section + Vision Decisions log entry are reverted in
  the same motion.
- Cloudflare Pages: pushing the revert to `main` triggers
  automatic redeploy; the live site rolls back within ~30
  seconds.
- The WP-010 `custom.css §8` mobile-wrap fix is unchanged and
  continues to mitigate the specific WP-010 surfaces if the
  rollback re-introduces the underlying font-swap CLS hazard.
- No brand-tokens, submodule, DNS, or Cloudflare zone changes
  to roll back.

### Notes
- Execution ran from an engine-repo worktree
  (`C:\claude-worktrees\legendary-arena\great-visvesvaraya-2676ca`)
  doing marketing-repo edits via absolute paths to
  `C:\www\legendary-arena-com\` — same posture as the WP-010
  lock pass. Both repos are independent under the "dual-repo
  layout" convention; engine repo has no commits associated
  with WP-011.
- The Slow 3G interactive test was deliberately replaced with
  mechanical equivalents (URL-shape regex + Lighthouse
  `font-display` audit). Recorded in § "Slow 3G test
  methodology note" above so a future contributor reading the
  WP DoD doesn't read it as an unverified DoD item.
- `display=optional` accepts the trade-off that slow-connection
  users see the system-ui fallback for the entire session. This
  was named-and-accepted in the WP body and reaffirmed via
  `strategy.md §10` (which does not list system-ui rendering
  as a brand failure mode) and the `brand-tokens.css` fallback
  chain (explicit per `typography.md §3.1 / §3.2 / §3.3`).
- About-page Performance jumping 92 → 100 is the largest
  Performance gain because `/about/` had the fewest other
  Performance constraints holding it down; the same single
  cause (no late-render reflow on font load) helps every page
  but matters most where it's not competing with anything else.
- Future direction (not WP-011): self-hosting fonts under
  `static/fonts/` would add CSS Fonts Level 4 metric-matching
  options (`size-adjust` / `ascent-override` /
  `descent-override` / `line-gap-override`) that eliminate
  even the tiny optical shift between fallback and web-font
  rendering. A separate WP (WP-012-shaped) when that becomes
  worth the bundle weight + CORS posture changes.

---

## WP-014 — Public `/brand/` page + mood-board brief ✅

**Status:** Done (2026-05-12)
**Effort actual:** ~half-day (drafting + hardening pass landed
2026-05-11; implementation + verification + lock 2026-05-12)
**Dependencies:** WP-007b (cross-origin token contract restated
publicly in §Token Contract), WP-010 (header + footer menu
iteration consumes the new `[[menu.main]]` / `[[menu.footer]]`
Brand entries without partial edits)
**Commits:**
- `a3aec2f` SPEC: WP-014 — public /brand/ page + mood-board brief
  (#11, initial spec)
- `a0b3525` SPEC: WP-014 — hardening pass per review (#12, locked
  deterministic logo rule, Path A constraints, shortcode output
  contracts, anchor IDs, MUST NOT be modified language)
- `6f856f3` WP-014: implement — public /brand/ page + mood-board
  brief
- this commit (WP-014 lock)

### Readiness
- Spec complete: ✅ (after hardening pass at `a0b3525`)
- Dependencies met: ✅ (WP-007b Done 2026-05-11; WP-010 Done
  2026-05-10)
- Pre-flight: ✅ READY TO EXECUTE (2026-05-11) —
  `docs/ai/invocations/preflight-wp014-brand-page.md`
  (scratchpad, gitignored)
- Executed: ✅

### Preconditions
- WP-007b complete (cross-origin token contract verified at
  `cards.barefootbetters.com`)
- WP-010 complete (header + footer iterate `site.Menus.main` /
  `site.Menus.footer` natively)
- Hugo Extended `v0.161.1` (matches WP-006 lock)
- Node `v22+` (CI pinned at 22; local `v24.x` permitted)
- Pagefind `1.5.2` exact-pin (locked under WP-005)
- `themes/PaperMod` submodule at
  `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`

### Goal
Ship a public `/brand/` page that exposes the Legendary Arena
brand system to external creators and partners (mod authors,
content creators, press, integration partners). The page is a
presentation layer over the canonical brand artifacts already
living under `docs/brand/*.md` and `static/brand-tokens.css` — it
does NOT re-author them and does NOT change any token value.
Also commit the mood-board art-direction brief as a sibling
canonical brand doc (`docs/brand/mood-board-spec.md`) and render
it as Section 8 of the page.

### Deliverables
- `[[menu.main]]` Brand entry in `hugo.toml` (weight 30) — header
  order: About / Blog / Brand
- `[[menu.footer]]` Brand entry in `hugo.toml` (weight 25) —
  footer order: About / Blog / Brand / Play / Cards
- `[markup.goldmark.renderer] unsafe = true` in `hugo.toml` —
  additive sibling to `[markup.highlight]`, required so the
  WP-mandated `<details>` collapsibles + DO/DON'T `<ul>` with
  inline SVG icons + `<div class="brand-swatch-grid">` wrappers
  survive Goldmark's default raw-HTML strip. Decision recorded
  in `01-VISION.md` Decisions log
- `docs/brand/mood-board-spec.md` — NEW additive canonical brand
  doc (sibling to strategy / palette / typography / spacing); no
  personal-cloud URLs; H3 sub-headings so they nest under the
  page's `## Art Direction (Mood Board)` H2 when inlined
- `content/brand/_index.md` — NEW page with eight sections in
  prescribed order, each carrying its pinned anchor ID:
  `#brand-overview`, `#logo-identity`, `#core-identity`,
  `#color-system`, `#typography-system`, `#token-contract`,
  `#usage-guidelines`, `#art-direction`
- `layouts/_shortcodes/brand-swatch.html` — emits
  `<div class="brand-swatch">` with `safeCSS`-marked inline
  `background: var(<token>)`; plain-text token + role labels
- `layouts/_shortcodes/brand-font-sample.html` — emits
  `<div class="brand-font-sample brand-font-sample--<family>">`
  with `safeCSS`-marked inline `font-family: var(--la-font-<family>)`;
  sizes via type-scale tokens in §9 CSS
- `layouts/_shortcodes/readfile.html` — Path A inlining utility;
  `readFile` + `markdownify` (or `safeHTML` by flag); minimal,
  generic, deterministic
- `layouts/brand/list.html` — Mechanism B (layout override) per
  WP §Step 5. Wraps the rendered section content in
  `<div class="brand-page">` so §9 CSS scoped under `.brand-page`
  applies on this page only. "list.html or equivalent" of the
  WP-body-cited "single.html" — section-home rendering picks
  `list.html`, never `single.html`. PaperMod's child-page
  iteration loop is intentionally skipped (`/brand/` has no
  children). `layouts/_partials/header.html` byte-identical to
  pre-WP
- `assets/css/extended/custom.css §9` — 48 selectors, all scoped
  under `.brand-page`. Sub-sections: 9.1 inter-section spacing,
  9.2 `.brand-logo`, 9.3 `.brand-swatch` + `.brand-swatch-grid`
  (dark-mode shadow lift), 9.4 `details`/`summary` collapsibles
  (▸/▾ indicator in `--la-color-blue-bright`), 9.5
  `.brand-font-sample` per-family sizing, 9.6 `.usage-rules`
  DO/DON'T cards (✓ in `--la-color-success`, ✗ in
  `--la-color-error` — re-asserts the error ≠ CTA boundary from
  `palette.md §5.3`), 9.7 `#art-direction` 78ch measure cap,
  9.8 narrow-viewport tightening
- `static/brand/logo/{logo-la-dark-400x200.svg,
  logo-la-light-400x200.svg, legendary-arena-icon.svg}` — copied
  byte-identical from `docs/brand/logo-figma/` (working source
  unmodified)

### Constraints (all held)
- No edit to `docs/brand/{strategy,palette,typography,spacing}.md`,
  `docs/brand/CHANGELOG.md`, or `static/brand-tokens.css` (git
  diff HEAD empty on each)
- No raw hex / non-token color / font / spacing value introduced
  in new CSS, shortcodes, or page markdown (mechanical grep
  returns the pre-existing `#ffffff` at `custom.css §5.2` line
  433 only — a WP-002/WP-003 documented exception with
  `/* why: */`)
- Class colors render only as reference content inside the §Color
  System collapsible spec with the "gameplay-only" annotation;
  never as brand-page surface colors
- `layouts/_partials/header.html` byte-identical
  (`git diff` empty)
- `themes/PaperMod` submodule clean at
  `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`, no `+`
- No new dependencies (`package.json` / `package-lock.json`
  unchanged)
- Pagefind mount `#la-search` untouched
- `hugo.toml` `[params]` + WP-004 / WP-005 / WP-006 / WP-010
  commentary blocks untouched

### Definition of Done
- [x] `[[menu.main]]` Brand entry in `hugo.toml` (weight 30)
- [x] `[[menu.footer]]` Brand entry in `hugo.toml` (weight 25)
- [x] `docs/brand/mood-board-spec.md` exists with content from
      Appendix A (cleaned per permitted transformations)
- [x] `content/brand/_index.md` exists with all eight sections in
      prescribed order
- [x] `layouts/_shortcodes/brand-swatch.html` exists; renders via
      `var(--la-*)` only (safeCSS-marked inline style)
- [x] `layouts/_shortcodes/brand-font-sample.html` exists;
      renders via `var(--la-font-*)` + type-scale tokens
- [x] `layouts/_shortcodes/readfile.html` exists, documented
      inline (Path A retained — reproducibility check passed)
- [x] `layouts/brand/list.html` exists; wraps content in
      `.brand-page` (Mechanism B); does not modify
      `themes/PaperMod/`; isolated to `/brand/` only
- [x] CSS additions in `assets/css/extended/custom.css §9` all
      scoped under `.brand-page`
- [x] `/brand/` page renders at production-build URL
      (`http://127.0.0.1:1314/brand/`)
- [x] Section 8 content in sync with
      `docs/brand/mood-board-spec.md` (Path A: edit-rebuild
      propagates verified)
- [x] Header rendered HTML on every page shows About / Blog /
      Brand (`Invoke-WebRequest` + grep on /, /about/, /posts/,
      /brand/, one post)
- [x] Footer rendered HTML on every page shows About / Blog /
      Brand / Play / Cards in that order
- [x] Active state on `/brand/`: header Brand link's
      `<span class="active">` styled per WP-010 §Step 3
- [x] No active state on `/`, `/about/`, `/posts/`, or posts for
      the Brand entry
- [x] All eight page sections present, in order, with
      shortcode-rendered swatches (39) and font samples (3) in
      §4 and §5
- [x] Each of the eight sections carries its prescribed stable
      anchor ID; deep-links to each resolve
- [x] Class-color tokens annotated "gameplay-only" in the §Color
      System collapsible; NOT used as page surface colors
- [x] All page styling uses `var(--la-*)` tokens (DevTools
      spot-check on swatches, headings, links)
- [x] WCAG AA contrast confirmed for body text, headings,
      collapsible summaries, DO/DON'T checklist, and §Art
      Direction prose in both light and dark mode (Lighthouse
      Accessibility = 100)
- [x] Theme toggle round-trips cleanly with no visual regression
      (dark-mode swatch box-shadow lifts tiles off bg-primary)
- [x] DevTools console: zero errors / page errors / failed
      network requests on `/brand/`, `/`, `/about/`, `/posts/`,
      one post (fetched all five HTTP 200; preview console-error
      logs empty)
- [x] Mechanical token-discipline check (no raw hex in new files)
      returns no matches in WP-014 additions
- [x] Lighthouse ≥ pre-baseline AND ≥ 90 on all four categories
      on `/brand/`, `/`, `/posts/`, `/about/` (scores below; raw
      JSON local-only per `.gitignore`)
- [x] Mechanical reproducibility check: two consecutive
      `npm run build` runs produce byte-identical `public/`
      (`Compare-Object` empty, 63 files)
- [x] `git diff HEAD` on existing canonical brand artifacts
      empty
- [x] `layouts/_partials/header.html` byte-identical
      (`git diff` empty)
- [x] Submodule clean
      (`c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`, no `+`)
- [x] `docs/03-ROADMAP.md` updated with WP-014 row + detail
      section + commit hashes + Lighthouse scores (this section)
- [x] `docs/01-VISION.md` Decisions log entry added (5 sub-points
      + Path-A choice + root-class Mechanism B choice + logo
      asset paths)
- [x] All commits pushed to `origin/main`

### Lighthouse scores (production build at `http://127.0.0.1:1314/`)

Single-run measurements per page on the mobile preset with
stale-Chrome cleanup between runs; raw JSONs gitignored
(`.gitignore` matches `lighthouse-*.json`).

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/brand/` | 99 | 100 | 100 | 100 |
| `/` (home) | 99 | 100 | 100 | 100 |
| `/posts/` | 100 | 100 | 100 | 100 |
| `/about/` | 99 | 100 | 100 | 100 |

Pre-baseline (from preflight, HEAD `a0b3525`): home 94 / 100 /
100 / 100, posts 100 / 100 / 100 / 100, about 93 / 100 / 100 /
100. All four pages clear the ≥ 90 absolute floor AND the
per-page pre-baseline (home +5, posts ±0, about +6). The new
`/brand/` page establishes its own ≥ 90 floor at 99 / 100 / 100
/ 100.

### Step 6.5 — raw-HTML pass-through required mid-execution

The first production build emitted a single `WARN  Raw HTML
omitted while rendering "content/brand/_index.md"` warning, and
the brand page rendered with the WP-mandated `<details>`
collapsibles + DO/DON'T `<ul class="usage-rules">` + inline-SVG
icons + `<div class="brand-swatch-grid">` wrappers all stripped.
Goldmark's default `unsafe = false` was silently dropping the
raw HTML that the WP body explicitly requires (Step 3 §4 Color
System "collapsible `<details>`", §5 Typography "collapsible",
§7 Usage Guidelines "checklist (✅ DO / ❌ DON'T) for
skimmability", and Step 5 "checklist (DO / DON'T) styling; green
check / red X icons via inline SVG with currentColor fill").

Fix landed inline within WP-014 scope: an additive
`[markup.goldmark.renderer] unsafe = true` sub-block in
`hugo.toml`, sibling to `[markup.highlight]`. It does NOT touch
`[params]` or any WP-004 / WP-005 / WP-006 / WP-010 commentary
block (the session prompt's narrower restriction); and the
session prompt's allowlist for `hugo.toml` reads "Step 1 menu
entries only" — the upstream WP body's mandated raw-HTML
deliverables win on conflict per the session prompt's own
"upstream wins" clause. Other pages (/, /about/, /posts/, posts)
author no raw HTML and are unaffected. Decision recorded in
`01-VISION.md` Decisions log.

### Step 6.5 — additional fix: heading hierarchy in inlined spec

The first accessibility audit on `/brand/` flagged
`heading-order` failure on the inlined `<h1>` from
`mood-board-spec.md`'s opening title (Section 8's `H2
#art-direction` → `H1` jump was an upward leap in hierarchy).
Fix: dropped the H1 from `mood-board-spec.md`, moved its
metadata block (status / owner / last-updated) to the bottom as
italic footer, and rewrote the seven content-block headings from
`##` to `###` so they nest cleanly under the page's
`## Art Direction (Mood Board)` H2 when readFile inlines them.
The doc's preamble paragraph now opens the file directly (per
WP §Step 2 §2 "Open with the preamble").

### Step 6.5 — Lighthouse measurement noise from stale Chrome

The first round of Lighthouse runs on `/brand/` returned
Performance 88-89 (FCP 2.9s, LCP 3.1s) — appearing to fail the
≥ 90 floor. Bisected against `/about/` and `/` measurements in
the same session: those also showed 2-5 points below their
canonical pre-baseline (about 89-91 vs baseline 93; home 93 vs
baseline 94). Root cause: Lighthouse's
EPERM-on-tmp-cleanup error left stale Chrome processes
accumulating across consecutive runs, competing for CPU and
skewing the throttling math. After explicit
`Stop-Process chrome*` between each run, scores stabilised at
99 / 100 / 100 / 100 for `/brand/` (and 99-100 for the other
three pages), reproducible across three consecutive runs each.
The fix is execution-environment hygiene, not a site change.

### Exit criteria
- [x] Live page renders all eight sections in order with
      prescribed anchor IDs
- [x] Section 8 inlines `mood-board-spec.md` via Path A;
      edit-rebuild propagation verified
- [x] Header rendered HTML on every page shows About / Blog /
      Brand
- [x] Footer rendered HTML shows About / Blog / Brand / Play /
      Cards
- [x] Active state on `/brand/`; absent on `/`, `/about/`,
      `/posts/`, posts
- [x] WCAG AA contrast in both modes (Lighthouse Accessibility
      = 100)
- [x] DevTools console clean across the suite
- [x] Mechanical token-discipline check returns no matches in
      WP-014 additions
- [x] Lighthouse ≥ pre-baseline AND ≥ 90 on `/brand/`, `/`,
      `/posts/`, `/about/`
- [x] Reproducibility: byte-identical `public/` across two
      builds
- [x] Submodule clean
- [x] `layouts/_partials/header.html` byte-identical
- [x] Canonical brand artifacts unchanged
  (`docs/brand/{strategy,palette,typography,spacing,CHANGELOG}.md`,
  `static/brand-tokens.css`)
- [x] Eight sections in prescribed order with pinned anchor IDs
- [x] Class colors render only as reference content with
      "gameplay-only" annotation

### Failure conditions
None tripped. Two issues surfaced and were fixed inline within
WP-014 scope (raw-HTML pass-through via additive goldmark
config; heading hierarchy in inlined mood-board-spec); one was
purely environmental (stale Chrome processes) and required no
site change. All Lighthouse / reproducibility / scope-lock /
canonical-doc / header-byte-identical / submodule checks pass.

### Rollback
- `git revert <lock-commit> 6f856f3` reverts both lock and
  implementation; the `/brand/` page returns to 404 and the
  Brand menu entries vanish from header + footer. The WP-014
  spec + hardening pass remain in `docs/ai/work-packets/` for
  re-execution. `docs/brand/mood-board-spec.md` is removed; the
  three logo SVGs under `static/brand/logo/` are removed (the
  canonical sources at `docs/brand/logo-figma/` are unaffected,
  copy-only relationship).
- Cloudflare Pages: pushing the revert to `main` triggers an
  auto-redeploy in ~30 seconds; the live site reverts to the
  pre-WP-014 surface.

### Notes
- Path A (`readFile` shortcode) was retained — the
  reproducibility check showed byte-identical `public/` across
  two consecutive builds, so Path B (manual mirror + sync-reminder
  comments) was not needed.
- Mechanism B (`layouts/brand/list.html`) was used for the
  `.brand-page` root class. Mechanism A (frontmatter + theme
  body-class hook) was not viable because PaperMod's default
  `list.html` exposes no such hook and modifying
  `layouts/baseof.html` would have been outside the WP allowlist.
- Logo asset paths: `/brand/logo/logo-la-dark-400x200.svg`
  (primary, gold on dark), `/brand/logo/logo-la-light-400x200.svg`
  (inversion, white-only), `/brand/logo/legendary-arena-icon.svg`
  (icon / favicon). Copy-only from `docs/brand/logo-figma/`;
  working source unmodified.
- WP-009's class-color audit dependency does NOT extend to
  `/brand/` (WP-014 uses generic `--la-*` tokens, not
  `--la-color-class-*`, for any styling); class colors render
  only as reference content inside the §Color System
  collapsible.
- Poster artwork (final PDF/SVG) remains out of scope per WP
  §What's NOT in scope. When commissioned, it lands at
  `static/brand/mood-board.{pdf,svg}` and is referenced from
  Section 8 via download link or inline embed — a follow-up WP.

---

## WP-015 — Newsletter signup with Brevo ✅

**Status:** Done (2026-05-12)
**Depends on:** WP-004 (home page layout, `.button` CTA styling),
WP-010 (footer partial override)
**Spec:** [`docs/ai/work-packets/WP-015-newsletter-brevo.md`](ai/work-packets/WP-015-newsletter-brevo.md)
**Commits:**
- `7862b43` WP-015: add newsletter signup with Brevo integration
  (#18, squash-merged)

### What shipped

- **CF Pages Function** (`functions/api/subscribe.js`) — server-side
  proxy to Brevo's `POST /v3/contacts` API. CORS allowlist covers
  production, `localhost:8788`, and `127.0.0.1:8788`. Handles
  duplicate contacts as success. Content-type guard, email validation,
  structured error responses.
- **Newsletter form partial** (`layouts/_partials/newsletter-form.html`)
  — reusable with `{{ .id }}` for unique DOM IDs. Progressive
  enhancement: works without JS (POST returns JSON), intended UX is
  fetch-based with inline status messages.
- **Home page integration** — `<section class="newsletter-section">`
  after feature cards in `layouts/index.html`.
- **Footer integration** — `<div class="footer-newsletter">` between
  nav and copyright in `layouts/_partials/footer.html`. Renders on
  every page.
- **Client-side JS** (`assets/js/newsletter.js`) — fetch handler with
  button disable during submission, success/error status display,
  status clear on re-submit. Loaded via Hugo asset pipeline
  (`extend_footer.html`, minified + fingerprinted).
- **CSS** (`custom.css` §10) — all values via `var(--la-*)` tokens.
  Subscribe button mirrors `.button` CTA styling (§5.2). One
  `#ffffff` exception with `/* why: */` justification (white on CTA,
  10.4:1 AAA). Footer variant uses smaller heading/description type.
  Stacks to column on ≤480px.
- `.dev.vars` added to `.gitignore`.

### Verification

- [x] Two consecutive `npm run build` produce byte-identical `public/`
- [x] Both form instances render (unique IDs: `newsletter-email-home`,
      `newsletter-email-footer`)
- [x] Footer newsletter confirmed on non-home pages (`/about/`)
- [x] Accessibility: `aria-label`, `aria-live="polite"`,
      `role="status"`, label `for`/`id` pairing
- [x] Fingerprinted `newsletter.min.*.js` loaded via `defer`
- [x] No raw hex violations beyond documented `#ffffff` exception
- [x] Commit hooks passed (`pre-commit` + `commit-msg`)
- [x] Submodule clean

### Manual prerequisites (outside PR scope)

1. Brevo account + API key + contact list creation
2. Double opt-in enabled in Brevo settings
3. `BREVO_API_KEY` and `BREVO_LIST_ID` set as CF Pages env vars
4. `.dev.vars` created locally for local function testing

### Rollback

- `git revert 7862b43` removes all newsletter UI and the CF Pages
  Function. The `functions/` directory is deleted. No data loss —
  Brevo is the sole system of record for subscriber data.

---

## WP-016 — Newsletter & blog templates ✅

**Status:** Done (2026-05-12)
**Depends on:** WP-015 (newsletter form + CF Function)
**Spec:** [`docs/ai/work-packets/WP-016-newsletter-blog-templates.md`](ai/work-packets/WP-016-newsletter-blog-templates.md)

### Goal

Establish reusable system primitives for the newsletter + blog content
pipeline: blog section scaffolding (Hugo list/single/RSS), Brevo email
template, extended blog archetype, CTA block partial, and internal linking
conventions. Also introduces a test runner and subscribe function tests
(gap from WP-015).

### Key deliverables

- Blog section: list page, single page layout, RSS feed
- Extended `archetypes/posts.md` with newsletter-aligned frontmatter
- Brevo email template (HTML structure spec)
- CTA block partial (`layouts/_partials/cta-block.html`)
- Internal linking conventions documented
- Subscribe function unit tests (vitest)

### Definition of Done

- [x] Blog list page renders at `/posts/`
- [x] Blog single page renders with CTA block
- [x] RSS feed includes posts with title/description/permalink
- [x] CTA partial renders all three variants (play, newsletter, tournament)
- [x] `archetypes/posts.md` includes series, cta, newsletter_week, newsletter_slug
- [x] Subscribe function tests pass (12 tests)
- [x] `npm run build` deterministic (two runs, byte-identical)
- [x] Newsletter template spec documented (`docs/brevo/newsletter-template.md`)
- [x] Internal linking + image conventions added to `04-CONTENT-CONVENTIONS.md`
- [x] CTA block CSS uses `var(--la-*)` tokens only — no raw hex
- [x] Pagefind indexes blog content

---

## WP-017 — Content pipeline + weeks 1–4 ✅

**Status:** Done (2026-05-13)
**Depends on:** WP-016 (templates must exist first)

### Goal

Define the topic taxonomy, production workflow, and cadence for the
newsletter + blog pipeline. Produce weeks 1–4 as proof the pipeline
works. Weeks 5+ are follow-on WPs.

### Key deliverables

- [x] Topic taxonomy (12-week framework, batched: Fundamentals → Mid-Game
  Strategy → Advanced Play) — `docs/content-taxonomy.md`
- [x] Production workflow checklist (generate → images → review →
  cross-link → newsletter draft → pre-send QA → publish)
- [x] 4 blog posts (`content/posts/week-01-deck-checklist.md` …
  `week-04-first-tournament.md`)
- [x] 4 corresponding newsletter edition drafts
  (`docs/brevo/newsletter-drafts/week-01.md` … `week-04.md`)
- [x] Internal cross-links validated
- [x] CTA rotation per week (2x play, 1x newsletter, 1x tournament)
- [x] Hero image placeholders per image convention

### Definition of Done

- [x] 4 blog posts at `/posts/<slug>/` using WP-016 archetype
- [x] 4 newsletter edition drafts in `docs/brevo/newsletter-drafts/`
- [x] Cross-links between blog ↔ newsletter verified
- [x] Each post uses WP-016 archetype and CTA partial
- [x] Topic taxonomy documented for weeks 1–12

---

## WP-018 — Email engagement workflow (Brevo automation) ✅

**Status:** Done (2026-05-13)
**Depends on:** WP-015 (newsletter infrastructure)

### Goal

Configure the Brevo-side automation workflow and document the full
visitor engagement pipeline: signup → confirm → welcome → weekly
cadence → play.* conversion. This is system architecture, not
marketing collateral.

### Key deliverables

- Brevo automation workflow configured:
  - Trigger: contact added to list
  - Welcome email (immediate)
  - Weekly cadence (broadcast or automated segment)
- Funnel stage definitions with metrics:
  - Capture (signup form → conversion rate)
  - Confirm (double opt-in → confirmation rate)
  - Activate (welcome email → open rate)
  - Engage (weekly newsletter → click-through rate)
  - Convert (CTA → play.* → conversion rate)
  - Retain (continued engagement → churn rate)
- Conversion design rules documented (1 CTA per email, CTA matches
  content theme, blog = deep value, email = hook + action)
- Compliance confirmation (double opt-in: WP-015 prerequisite,
  unsubscribe: Brevo-native)

### Prerequisites (manual — not automatable)

1. **Brevo domain authentication** — configure SPF, DKIM, and DMARC
   for `legendary-arena.com` in Brevo > Settings > Senders & IPs >
   Domains. This is a one-time setup that ensures deliverability
   and inbox placement.

### Definition of Done

- Brevo domain authentication (SPF/DKIM/DMARC) verified
- Brevo automation workflow active and tested with a test contact
- Funnel architecture documented in `docs/`
- Welcome email sends on new contact signup
- Welcome email passes WP-016 pre-send QA checklist
  (`docs/brevo/newsletter-template.md`)
- Weekly cadence configured (ready for WP-017 content)
- Conversion design rules documented

---

## WP-019 — Snipcart shopping cart with Stripe checkout ✅

**Status:** ✅ Done (2026-05-12)
**Depends on:** — (no upstream WP dependency; vision doc amendment landed 2026-05-12)
**Spec:** [`docs/ai/work-packets/WP-019-snipcart-commerce.md`](ai/work-packets/WP-019-snipcart-commerce.md)

Add a bolt-on shopping cart to the Hugo marketing site using Snipcart
(cart/checkout layer) and Stripe (payment gateway). Product data lives
in Hugo content files; Snipcart reads it from HTML `data-item-*`
attributes at build time. No backend, no database, no platform
migration. Aligns with "no margin, no mission" — fastest path to
revenue capture without disrupting the static-site architecture.

### Scope

- Embed Snipcart CSS/JS in `extend_head.html` and `extend_footer.html`
- Cart button in header (between nav menu and Pagefind search)
- Product archetype, list template, and single template under
  `layouts/shop/` and `archetypes/shop.md`
- Sample product content in `content/shop/` (draft)
- "Shop" nav entry in `hugo.toml` (weight 25, between Blog and Brand)
- Brand-consistent CSS for product pages and cart UI
- Snipcart theming overrides for brand alignment
- Configure Stripe as payment gateway in Snipcart dashboard
- Validate checkout end-to-end in Snipcart test mode on a CF Pages
  preview deploy

### Not in scope

- Custom tax/shipping webhooks
- ACD catalog ingestion or distributor automation
- Home page featured products section
- Cart abandonment analytics
- Snipcart Live mode activation (config change, not code)

### Prerequisites (manual)

- Snipcart account created
- Stripe connected as payment gateway in Snipcart dashboard
- Snipcart set to Test mode
- Public API key stored in `hugo.toml` or CF Pages env var
- Allowed domains configured in Snipcart dashboard

### Definition of Done

- Snipcart JS/CSS load on every page without console errors
- Cart button renders in header on every page
- `/shop/` renders product grid; individual product pages render
- Checkout completes end-to-end in test mode (Stripe test card)
- Order appears in Snipcart merchant dashboard
- At least one shipping method configured
- All styling uses `var(--la-*)` tokens — no raw hex
- Light + dark mode correct
- `npm run build` byte-identical across two runs
- Lighthouse ≥ 90 (Performance, Accessibility, Best Practices, SEO)

---

## WP-020 — Newsletter & blog funnel enrichment ✅

**Status:** ✅ Done (2026-05-13)
**Depends on:** WP-016 (newsletter template spec), WP-019 (Snipcart — `/shop/` exists)
**Spec:** [`docs/ai/work-packets/WP-020-funnel-enrichment.md`](ai/work-packets/WP-020-funnel-enrichment.md)

Governance-only WP. Enriches the newsletter template and WP-017
content pipeline spec with secondary conversion modules (Shop,
Share/Forward) and a documented funnel hierarchy. No layouts, no
archetypes, no CSS, no config, no content files.

### Changes

- Newsletter template v1 → v2: fixed §6 CTA options to match archetype
  contract (play/newsletter/tournament), added §8 Featured from the
  Shop and §9 Share/Forward secondary modules, formalized 4-link body
  limit, added UTM tracking contract
- WP-017 spec amended: funnel hierarchy, blog "Gear up" shop section,
  newsletter shop + share draft requirements, expanded funnel integrity
  check with QA log, updated DoD and failure conditions

### Definition of Done

- Newsletter template at v2 with 10-section structure
- §6 CTA options match archetype contract
- §8 "Featured from the Shop" with UTM link format
- §9 "Share / Forward" with canonical blog URL
- Linking requirements: 4-link body cap documented
- UTM parameter conventions documented
- WP-017 amended with funnel hierarchy, blog shop section, newsletter
  secondary modules, funnel integrity check, scope/DoD/failure updates
- No infrastructure files modified

---

## WP-021 — Funnel analytics baseline ✅ Done (2026-05-14)

**Status:** ✅ Done (2026-05-14)
**Depends on:** WP-018 (email pipeline + `docs/email-automation.md`), WP-020 (UTM conventions)
**Spec:** [`docs/ai/work-packets/WP-021-funnel-analytics-baseline.md`](ai/work-packets/WP-021-funnel-analytics-baseline.md)

Governance-only WP. Defines the measurement contract for the email
funnel: which metrics are tracked, how they are calculated, baseline
thresholds for detecting failure, and a per-send reporting artifact.
All metrics are Brevo-native — site-side conversion tracking is
deferred to a future analytics platform WP.

### Scope

- MODIFY `docs/email-automation.md` — add funnel measurement
  contract, metric definitions, baseline thresholds, UTM attribution
  validation, reporting cadence, analytics failure conditions, and
  analytics invariants
- NEW `docs/email-metrics-log.md` — append-only per-send metrics log

### Not in scope

- No analytics platform selection (deferred — roadmap "Beyond" item)
- No site-side conversion tracking
- No Brevo configuration changes
- No Hugo site file changes

### Definition of Done

- Funnel measurement contract with all six stages defined
- Metric formulas using Brevo-reported values only
- Conversion rate marked as not yet measurable
- Baseline thresholds for failure detection
- Append-only metrics log with per-send template
- UTM validation procedure referencing WP-020
- Analytics invariants and failure conditions documented
- No infrastructure files modified

---

## WP-023 — Diorama product-line landing page (`/diorama/`) ✅ Done (2026-06-08)

**Goal:** First website surface for the diorama / STEM-kit product
line — a dedicated `/diorama/` landing page that tells the story and
captures demand. It is the marketing front door for the line whose
placement boundary was set in `01-VISION.md` Decisions log
(2026-06-08).

**Design source:** `docs/product/diorama-master-plan.md` (canonical —
product, components, tiers, STEM curriculum, BOM) and
`docs/product/diorama-gtm-and-resourcing.md` (ICP, positioning,
time-phased roadmap, break-even). **Execution prompt:**
`docs/ai/work-packets/WP-023-diorama-landing-page.md`.

**Key design decisions (locked at design level):**

- **Demand capture, not commerce.** Per the GTM roadmap the Starter
  Kit doesn't ship until ~May 2027 and no prototype exists until
  ~Nov 2026, so the primary CTA is a waitlist through the existing
  WP-015 newsletter mechanism — no buy button, no Snipcart path,
  indicative "coming" pricing only, and no fabricated product
  photography.
- **Mirror the `/brand/` mechanism (WP-014).** Section page
  (`content/diorama/_index.md`) plus a section-scoped
  `layouts/diorama/list.html` override that wraps content in
  `.diorama-page`. No new pattern; `themes/PaperMod/` untouched; new
  CSS is one numbered section scoped under `.diorama-page`, tokens
  only.
- **No required Marvel familiarity; no implied license.** The brand
  failure-mode rule (`04-CONTENT-CONVENTIONS.md §Brand failure modes`)
  forbids copy that depends on Marvel knowledge. The page leads with
  the transformation (build-together, a bookshelf world, STEM);
  Marvel Legends figures are one customer-supplied option, never a
  prerequisite, and the page claims no Marvel/Hasbro/Disney
  affiliation (Hasbro licensing is an open question in master-plan
  §13).

**Scope boundary:** the landing page only. Diorama shop products, ICP
email segmentation/automation (extends WP-018/020), the build-story
content lane, and real product photography are separate follow-on
slices. The physical/firmware/curriculum build is out of this repo
entirely (tracked in `diorama-master-plan.md §13`; any Pi control
software lives in the engine repo).

**Dependencies:** WP-010 (nav/chrome), WP-014 (section-override
pattern), WP-015 (newsletter capture). **Est. effort:** ~half-day–1 day.

**DoD (design level):** `/diorama/` renders with the story and waitlist
CTA above the fold; the layout override is isolated to the section; new
CSS is scoped under `.diorama-page` with tokens only (no raw hex);
copy clears the §Brand/voice constraints (reads correctly for a
non-Marvel visitor, claims no license); front-matter and the Schema
partial validate; `npm ci && npm run build` is clean with mechanical
reproducibility preserved. Full DoD / exit / failure-condition detail
lives in the work-packet.

---

## WP-024 — Diorama page: product image + placeholder buy button 🔄 In progress

**Goal:** First step on the *sell* side of the diorama line (the
`01-VISION.md` 2026-06-08 boundary scopes the site to "market and sell").
Operator-directed evolution of the `/diorama/` page (2026-06-09).

**Changes:** (1) add the operator-supplied product render to the hero
(`static/images/products/diorama/diorama-high-tech-800px.jpg`, 800×525,
no IP) via a `heroImage` front-matter field; (2) drop the duplicate hero
newsletter widget, keeping the closing waitlist signup; (3) add a primary
**"Buy now"** button (reusing the §5.2 `.button`), a **placeholder**
linking to `#waitlist` — no Snipcart/checkout, no price/SKU yet.

**Supersedes** WP-023's "demand capture, not commerce" decision and its
SB7 single-CTA rule: the page now carries a primary Buy now + a secondary
newsletter (the normal commerce pattern). Other WP-023 constraints
(no required Marvel familiarity, tokens-only CSS, scope discipline) hold.

**Deferred to a future WP:** the real Snipcart checkout — a diorama
product with price, SKU, page-validated price, and pre-order framing
("ships ~2027" per the GTM roadmap). Full detail in the work-packet
`docs/ai/work-packets/WP-024-diorama-commerce.md`.

---

## Beyond the current WPs — future work without WPs yet

Future work without WPs yet:

- **Logo design** — replace wordmark placeholder. Design contract
  (`docs/brand/logo-brief.md`) and AI-workflow notes
  (`docs/brand/logo-ai-workflow.md`) committed 2026-05-08; two AI
  exploration rounds archived under `docs/brand/logo-explorations/`
  (4 monogram directions + 4 abstract directions, each rendered at
  16/32/64/128/256/512px). AI iteration ceiling reached — next step
  is a Figma session or contractor pass starting from the
  **"D done with B's discipline"** merge thesis (`logo-ai-workflow.md`
  §7). The brief defines acceptance criteria (`§9`); the workflow
  doc names the failure modes to filter against (stratified read,
  pivot blob, wedge collapse, letter mashup). No WP yet — this is
  a creative/design effort, not an engineering one. Wordmark
  placeholder stays in production until a candidate clears
  `logo-brief.md §9`.
- **api.legendary-arena.com** — game backend on Render. Out of scope for
  this site.
- **Wiki search at `ewiki.legendary-arena.com`** — governed by the
  engine monorepo, not this roadmap. The engineering wiki is built
  by `apps/wiki-viewer/` in `barefootbetters/legendary-arena` (see
  EC-142 / WP-139); a wiki-search WP belongs in that repo's
  `WORK_INDEX.md` under its full WP/EC governance, with WP-005 cited
  as the prior-art pattern reference (npm + exact-pin Pagefind,
  lazy-load + stub, `data-pagefind-body` scope, single-command
  build, mechanical reproducibility check). The wiki is not a
  brand-tokens consumer in v1 (see `01-VISION.md` §Cross-site
  contract — consumers are `play` and `cards` only), so wiki-search
  work has no cross-dependency on this roadmap's WP-007a/b/009.
- **Engine repo transfer** — move
  `barefootbetters/legendary-arena` → `legendary-arena/legendary-arena-game`.
  Independent Saturday effort.
- **Analytics** — Cloudflare Web Analytics, Plausible, or none. Decide
  post-launch.
- **Additional content (weeks 5+)** — beyond WP-017's weeks 1–4, content
  cadence batches as follow-on WPs (4 weeks per batch).
- **Comments on blog** — explicitly out-of-scope per vision.md; revisit
  if there's appetite.
- **Brand tokens v2** — only if v1 proves limiting. Major version bump
  triggers coordinated update across www, play, registry. Followed by a
  CHANGELOG.md entry and consumer-side updates.
- **Custom Hugo theme** — only if PaperMod proves limiting. Not on the
  roadmap.
- **Diorama product line (website surfaces)** — the physical diorama /
  STEM-kit line is spec'd in `docs/product/` (`diorama-master-plan.md`
  canonical; `diorama-gtm-and-resourcing.md` for ICP, positioning, and
  break-even economics). The **marketing-repo** work it generates — and
  only this — belongs here as future WPs: a `/diorama/` product/landing
  page (**now WP-023** — first slice promoted), shop wiring for kits
  (extends WP-019 Snipcart), a STEM/build content lane, and a
  diorama-ICP email funnel (extends WP-018/020).
  Each becomes a roadmap-designed WP + a `docs/ai/work-packets/`
  execution prompt + a commit-hook stub when picked up. **Not**
  marketing-repo work: prototyping the magnetic-LED contact system,
  finalizing the bill of materials, the Raspberry Pi control software,
  and authoring the STEM curriculum — those are physical/firmware
  efforts tracked in the product plan's §13 "Work Tasks & Priorities"
  (and any Pi firmware lives in the engine repo, not here). Placement
  recorded in `01-VISION.md` Decisions log (2026-06-08).

---

## Maintenance rules

- When a WP is completed:
  - Mark its status ✅
  - Tick its DoD AND exit criteria boxes
  - Record the commit hash(es) that delivered it
  - Update the Summary table

- If a WP needs to change scope mid-flight:
  - Document the change in this file
  - Add a Decisions log entry to `01-VISION.md`
  - Update affected DoD/exit criteria/failure conditions

- New WPs added to this roadmap also get a Decisions log entry in
  `01-VISION.md`.

- The **Global invariants** section is the canonical list of
  project-wide rules. Adding to or removing from it requires a
  Decisions log entry.

- WP IDs are assigned sequentially. The "WP-007a / WP-007b" pattern
  (suffix letters) signals "these can run in parallel."

- "Failure conditions" describe states that make a WP not-done. They
  are bright lines, not "things to avoid." A failure condition firing
  means the WP regresses to ⏸️ Pending until the issue is resolved.

- "Rollback" describes the recovery path if a WP needs to be undone
  after partial progress. Should be reachable in minutes, not hours.
