# Legendary Arena Website — Roadmap

**Repo:** github.com/legendary-arena/legendary-arena-website
**Owner:** Jeffery Jensen
**Last updated:** 2026-05-08

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
                                                    ├→ WP-007b ─┴→ WP-009
                                                    └→ WP-008
```

WP-007a, WP-007b, and WP-008 can run in parallel after WP-006 completes;
they have no shared write paths. WP-009 (class-color usage audit) is
single-track and runs after BOTH WP-007a and WP-007b complete — it audits
their integrations. WP-008 is parallel to WP-009 but does not feed it.

---

## Summary

| WP | Title | Status | Dependencies | Est. effort |
|---|---|---|---|---|
| WP-001 | Hugo skeleton + PaperMod theme | ✅ Done | — | half-day |
| WP-002 | LA brand definition + tokens v1 | ✅ Done | WP-001 | 1–2 days |
| WP-003 | Apply LA brand via theme overrides | ✅ Done | WP-002 | 1 day |
| WP-004 | Content scaffolding + first 3 pages | ✅ Done (2026-05-08) | WP-003 | half-day |
| WP-005 | Pagefind search integration | ⏸️ Pending | WP-004 | half-day |
| WP-006 | Cloudflare Pages deploy + custom domain | ⏸️ Pending | WP-005 | half-day |
| WP-007a | play.legendary-arena.com deploy | ⏸️ Pending | WP-006 | 1 day |
| WP-007b | Registry viewer brand integration (cards.barefootbetters.com) | ⏸️ Pending | WP-006 | ~half-day–1 day |
| WP-008 | SEO baseline (Hugo equivalent of RankMath features) | ⏸️ Pending | WP-006 | ~1 day |
| WP-009 | Class-color usage audit — cross-site *(spec draft pending review — see [`docs/ai/work-packets/WP-009-class-color-usage-audit.md`](ai/work-packets/WP-009-class-color-usage-audit.md))* | ⏸️ Pending | WP-007a, WP-007b | ~0.5–1 day |

**Total realistic effort:** ~6.5–9 days of focused work.

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
- The pre-existing `[params.homeInfoParams]` block in `hugo.toml` is no
  longer rendered by the override but was left in place to avoid a
  config change unrelated to content authoring. Cleaning it up is a
  candidate for a future small-touch commit, not a WP-004 deliverable.

---

## WP-005 — Pagefind search integration ⏸️

**Status:** Pending (WP-004 ✅ done 2026-05-08; ready for execution)
**Effort:** half-day
**Dependencies:** WP-004

### Readiness

- Spec complete: ✅
- Dependencies met: ✅
- Ready for execution: ✅

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

- [ ] Pagefind dependency declared (in `package.json` or as a documented
      binary)
- [ ] Search input visible in site header
- [ ] Typing produces relevant matches across home/about/blog content
- [ ] Card name searches return no results (verify exclusion)
- [ ] `npm run build` (or equivalent) builds Hugo + Pagefind in one
      command
- [ ] Build command documented in `README.md`

### Exit criteria

- [ ] Search returns useful results within ~100ms of typing
- [ ] Lighthouse ≥ 90 maintained
- [ ] Build is fully reproducible: clean clone + single command
      produces a working site

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

## WP-006 — Cloudflare Pages deploy + custom domain ⏸️

**Status:** Pending WP-005
**Effort:** half-day (most of it is DNS propagation waiting)
**Dependencies:** WP-005

### Readiness

- Spec complete: ✅
- Dependencies met: ❌ (waiting on WP-005)
- Ready for execution: ❌

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
- Build command: `npm run build` (matches local exactly)
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

- [ ] `https://www.legendary-arena.com` loads the site
- [ ] `https://legendary-arena.com` redirects (301 or 308) to
      `https://www.legendary-arena.com`
- [ ] Pushing to `main` triggers automatic redeploy
- [ ] Opening a PR creates a preview deploy (verify with a test PR)
- [ ] HTTPS works on both apex and www (no cert errors, no mixed content)

### Exit criteria

- [ ] Live site matches local build output (spot check 3 pages: home,
      about, blog post)
- [ ] No console errors on live site (DevTools → Console clean)
- [ ] All internal links resolve (no 404s) — verify with a link checker
      or manual click-through
- [ ] Lighthouse ≥ 90 on live URL (not just local — production env
      matters)
- [ ] `brand-tokens.css` accessible at
      `https://www.legendary-arena.com/brand-tokens.css` with
      CORS-friendly headers (`Access-Control-Allow-Origin: *` or
      explicit consumer origins: `play.legendary-arena.com`,
      `cards.barefootbetters.com`)
- [ ] Token version v1 visible in the version header comment when
      fetching the CSS

### Failure conditions

- Live build differs from local build (build divergence)
- Console errors in production
- Broken links or 404s on the live site
- HTTPS misconfigured (mixed content, expired cert, missing redirect)
- `brand-tokens.css` not fetchable cross-origin (CORS blocks
  `play.legendary-arena.com` or `cards.barefootbetters.com`)
- Preview deploys not creating on PRs

### Rollback

- Cloudflare Pages: revert to previous deployment via dashboard (one
  click, instant)
- Repo: revert offending commit on `main`, push, auto-deploys

---

## WP-007a — play.legendary-arena.com deploy ⏸️

**Status:** Pending WP-006
**Effort:** ~1 day
**Dependencies:** WP-006

### Parallelization

- Can run in parallel with WP-007b after WP-006 completes (no shared
  write paths between this WP and WP-007b)

### Readiness

- Spec complete: ✅
- Dependencies met: ❌ (waiting on WP-006)
- Ready for execution: ❌

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

- [ ] `https://play.legendary-arena.com` loads the game client
- [ ] Visual identity matches www (colors, type, spacing, header, footer)
- [ ] Header has working nav links to `www.legendary-arena.com` and
      `registry.legendary-arena.com`
- [ ] Game functionality unaffected by deploy/brand changes
      (smoke test core flows)
- [ ] Local fallback `brand-tokens.css` present in `arena-client` bundle
- [ ] HTTPS works; no mixed content

### Exit criteria

- [ ] Lighthouse ≥ 90 on `play.legendary-arena.com`
- [ ] No console errors in production
- [ ] Cross-origin token fetch succeeds (verify in DevTools network tab)
- [ ] Token version v1 confirmed via the version header comment in the
      fetched CSS
- [ ] Game flow smoke test passes (open client → start match → exit
      cleanly)

### Failure conditions

- Visual identity drifts from www (different colors, fonts, or
  spacing)
- Cross-origin fetch blocked (CORS misconfig or wrong CORS headers)
- Game functionality regressions introduced by deploy changes
- Local fallback missing (no safety net)

### Rollback

- Cloudflare Pages: revert deploy via dashboard
- If the regression came from an `arena-client` source change: revert
  the offending commit in the engine monorepo

---

## WP-007b — Registry viewer brand integration (cards.barefootbetters.com) ⏸️

**Status:** Pending WP-006
**Effort:** ~half-day to ~1 day (smaller than originally scoped — no new deployment)
**Dependencies:** WP-006

### Parallelization

- Can run in parallel with WP-007a and WP-008 after WP-006 completes
  (no shared write paths)

### Readiness

- Spec complete: ✅
- Dependencies met: ❌ (waiting on WP-006)
- Ready for execution: ❌

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

- [ ] `https://cards.barefootbetters.com` loads with updated brand
- [ ] Visual identity matches www (same colors, type, spacing,
      header, footer)
- [ ] Header has working nav links to `www.legendary-arena.com` and
      `play.legendary-arena.com`
- [ ] Card browsing/filtering unaffected (smoke test)
- [ ] Local fallback `brand-tokens.css` present in registry-viewer bundle
- [ ] HTTPS works; no mixed content

### Exit criteria

- [ ] Lighthouse ≥ 90 on `cards.barefootbetters.com`
- [ ] No console errors in production
- [ ] Cross-origin token fetch succeeds (verify in DevTools network tab)
- [ ] Token version v1 confirmed via version header
- [ ] Card search still returns expected results (smoke test: search
      a known card, verify hit)

### Failure conditions

- Visual drift from www
- Card-search regressions
- Cross-origin fetch blocked
- Local fallback missing

### Rollback

- Cloudflare Pages: revert deploy of `cards.barefootbetters.com`
- If regression came from a `registry-viewer` source change: revert
  in engine monorepo

---

## WP-008 — SEO baseline + Schema.org markup ⏸️

**Status:** Pending WP-006
**Effort:** ~1 day
**Dependencies:** WP-006

### Parallelization

- Can run in parallel with WP-007a and WP-007b after WP-006 completes
  (no shared write paths — touches Hugo templates and front-matter,
  not the deploy configs of the other apps)

### Readiness

- Spec complete: ✅
- Dependencies met: ❌ (waiting on WP-006)
- Ready for execution: ❌

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

- [ ] `layouts/_partials/seo/schema.html` partial implemented
- [ ] Partial included in PaperMod's `<head>` override
      (`layouts/_partials/extend_head.html` or equivalent)
- [ ] Schema validates via Google's Rich Results Test on at least one
      page of each type (home, about, blog post)
- [ ] OG tags pass Facebook Sharing Debugger on home + a blog post
- [ ] Twitter cards pass Twitter Card Validator on home + a blog post
- [ ] `sitemap.xml` accessible at
      `https://www.legendary-arena.com/sitemap.xml`
- [ ] `robots.txt` accessible at
      `https://www.legendary-arena.com/robots.txt`
- [ ] `sitemap.xml` submitted to Google Search Console
- [ ] All committed pages have non-empty `description` front-matter
      (≤ 160 chars)
- [ ] `docs/05-SEO-CONVENTIONS.md` written and committed

### Exit criteria

- [ ] All four external validators (Rich Results, FB Debugger, Twitter
      Validator, Search Console) report no errors on tested pages
- [ ] Lighthouse SEO score ≥ 95 on home page (above the ≥ 90 baseline)
- [ ] No console errors introduced by SEO templates
- [ ] Schema partial degrades gracefully when front-matter fields are
      missing (no template errors)

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
- **Engine repo transfer** — move
  `barefootbetters/legendary-arena` → `legendary-arena/legendary-arena-game`.
  Independent Saturday effort.
- **Analytics** — Cloudflare Web Analytics, Plausible, or none. Decide
  post-launch.
- **Additional content** — beyond the first three pages, content cadence
  is "as inspired."
- **Comments on blog** — explicitly out-of-scope per vision.md; revisit
  if there's appetite.
- **Brand tokens v2** — only if v1 proves limiting. Major version bump
  triggers coordinated update across www, play, registry. Followed by a
  CHANGELOG.md entry and consumer-side updates.
- **Custom Hugo theme** — only if PaperMod proves limiting. Not on the
  roadmap.

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
