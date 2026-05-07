# Legendary Arena Website — Roadmap

**Repo:** github.com/legendary-arena/legendary-arena-website
**Owner:** Jeffery Jensen
**Last updated:** 2026-05-07

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
WP-001 → WP-002 → WP-003 → WP-004 → WP-005 → WP-006 ┬→ WP-007a
                                                    └→ WP-007b   (parallel)
```

WP-007a and WP-007b can run in parallel after WP-006 completes; they have
no shared write paths.

---

## Summary

| WP | Title | Status | Dependencies | Est. effort |
|---|---|---|---|---|
| WP-001 | Hugo skeleton + PaperMod theme | ✅ Done | — | half-day |
| WP-002 | LA brand definition + tokens v1 | ⏭️ Up next | WP-001 | 1–2 days |
| WP-003 | Apply LA brand via theme overrides | ⏸️ Pending | WP-002 | 1 day |
| WP-004 | Content scaffolding + first 3 pages | ⏸️ Pending | WP-003 | half-day |
| WP-005 | Pagefind search integration | ⏸️ Pending | WP-004 | half-day |
| WP-006 | Cloudflare Pages deploy + custom domain | ⏸️ Pending | WP-005 | half-day |
| WP-007a | play.legendary-arena.com deploy | ⏸️ Pending | WP-006 | 1 day |
| WP-007b | registry.legendary-arena.com deploy | ⏸️ Pending | WP-006 | 1 day |

**Total realistic effort:** ~5–7 days of focused work.

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

## WP-002 — LA brand definition + tokens v1 ⏭️

**Status:** Up next
**Effort:** 1–2 days
**Dependencies:** WP-001

### Readiness

- Spec complete: ✅
- Dependencies met: ✅
- Ready for execution: ✅

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
  for v1; document fallbacks.
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

### Definition of Done

- [ ] `docs/brand/strategy.md` written and committed
- [ ] `docs/brand/palette.md` written with hex values + semantic mappings
      (light + dark variants both defined)
- [ ] `docs/brand/typography.md` written with Google Fonts choices +
      fallbacks
- [ ] `docs/brand/spacing.md` written with scale + usage rules
- [ ] `docs/brand/CHANGELOG.md` initialized with v1 entry
- [ ] `static/brand-tokens.css` produced with version header

### Exit criteria

- [ ] `brand-tokens.css` consumed successfully by Hugo
      (referenced from a test stylesheet or page)
- [ ] Hugo build still produces a clean site after token integration
- [ ] No console errors when served
- [ ] Token file is well-formed CSS (validates)

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

---

## WP-003 — Apply LA brand via theme overrides ⏸️

**Status:** Pending WP-002
**Effort:** 1 day
**Dependencies:** WP-002

### Readiness

- Spec complete: ✅
- Dependencies met: ❌ (waiting on WP-002)
- Ready for execution: ❌

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

- [ ] Home page reflects LA brand colors and typography
- [ ] Light and dark modes both look intentional and on-brand
- [ ] Header, footer, body text, links all consume brand tokens
- [ ] `themes/PaperMod/` is unmodified (`git submodule status` clean)
- [ ] `hugo server` renders without errors
- [ ] No `!important` declarations without `// why:` comments

### Exit criteria

- [ ] Lighthouse score ≥ 90 on home page (perf, a11y, best practices, SEO)
- [ ] Visual inspection: site reads as "Legendary Arena's marketing site,"
      not "default PaperMod"
- [ ] No regressions vs WP-001 baseline (page still loads, all links work)
- [ ] Before/after DOM diff shows no structural breakage (only style
      changes)

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

## WP-004 — Content scaffolding + first 3 pages ⏸️

**Status:** Pending WP-003
**Effort:** half-day
**Dependencies:** WP-003

### Readiness

- Spec complete: ✅
- Dependencies met: ❌ (waiting on WP-003)
- Ready for execution: ❌

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

- `content/_index.md` — homepage with hero, value prop, "Play now" CTA
- `content/about/_index.md` — what LA is, who's behind it, status
- `content/posts/2026-MM-DD-launch-announcement.md` — first real blog post
- `archetypes/posts.md` — front-matter template for new posts
- `docs/04-CONTENT-CONVENTIONS.md` — front-matter rules, slug rules,
  image conventions

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

- [ ] Home page answers what / why / what-next in that order, above the
      fold
- [ ] "Play now" CTA visible above the fold on desktop AND mobile
- [ ] About page has real content (not lorem ipsum)
- [ ] One real blog post published (not "Hello World")
- [ ] `hugo new posts/whatever.md` produces a properly-stubbed post via
      the archetype
- [ ] `docs/04-CONTENT-CONVENTIONS.md` committed

### Exit criteria

- [ ] First-time-reader test (try on a friend or a fresh tab after a
      break): they understand what LA is within ~5 seconds
- [ ] No placeholder text anywhere in the rendered output
- [ ] Voice consistent across all three pages
- [ ] Lighthouse ≥ 90 maintained

### Failure conditions

- Copy reads as filler or generic deck-builder marketing
- CTA below fold or ambiguous in label
- Voice drifts between pages (home reads epic, about reads casual, etc.)
- Hugo archetype not actually used (creating a post by hand still works,
  which defeats the convention)

### Rollback

- Revert content commits. Site reverts to the brand-styled
  WP-003 placeholder state but remains functional.

---

## WP-005 — Pagefind search integration ⏸️

**Status:** Pending WP-004
**Effort:** half-day
**Dependencies:** WP-004

### Readiness

- Spec complete: ✅
- Dependencies met: ❌ (waiting on WP-004)
- Ready for execution: ❌

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
      explicit play/registry origins)
- [ ] Token version v1 visible in the version header comment when
      fetching the CSS

### Failure conditions

- Live build differs from local build (build divergence)
- Console errors in production
- Broken links or 404s on the live site
- HTTPS misconfigured (mixed content, expired cert, missing redirect)
- `brand-tokens.css` not fetchable cross-origin (CORS blocks
  `play.*` / `registry.*`)
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

## WP-007b — registry.legendary-arena.com deploy ⏸️

**Status:** Pending WP-006
**Effort:** ~1 day
**Dependencies:** WP-006

### Parallelization

- Can run in parallel with WP-007a after WP-006 completes (no shared
  write paths)

### Readiness

- Spec complete: ✅
- Dependencies met: ❌ (waiting on WP-006)
- Ready for execution: ❌

### Preconditions

- WP-006 complete; `brand-tokens.css` reachable cross-origin
- `registry-viewer` build pipeline working in the engine monorepo
- DNS access for `registry.legendary-arena.com` confirmed

### Goal

Deploy `registry-viewer` at `registry.legendary-arena.com`, consuming
brand tokens for visual unity.

### Deliverables

- Cloudflare Pages project for `registry-viewer`
- Build configured for Vue static export
- `registry-viewer` HTML imports
  `https://www.legendary-arena.com/brand-tokens.css`
- Custom domain bound: `registry.legendary-arena.com`
- Shared header/footer matching www brand
- Local fallback copy of `brand-tokens.css` bundled with the
  registry-viewer
- Registry's structured search remains intact (Pagefind is www-only)

### Cross-site contract

Same as WP-007a: tokens consumed via cross-origin link, major-version
updates coordinated, local fallback included.

### Constraints

- No engine changes solely for branding
- Existing card-search / filter functionality unmodified
- Brand tokens consumed by reference, not copied/forked

### Definition of Done

- [ ] `https://registry.legendary-arena.com` loads the registry
- [ ] Visual identity matches www (same colors, type, spacing, header,
      footer)
- [ ] Header has working nav links to `www.legendary-arena.com` and
      `play.legendary-arena.com`
- [ ] Card browsing/filtering unaffected (smoke test)
- [ ] Local fallback `brand-tokens.css` present in registry-viewer bundle
- [ ] HTTPS works; no mixed content

### Exit criteria

- [ ] Lighthouse ≥ 90 on `registry.legendary-arena.com`
- [ ] No console errors in production
- [ ] Cross-origin token fetch succeeds
- [ ] Token version v1 confirmed via version header
- [ ] Card search returns expected results (smoke test: search a known
      card, verify hit)

### Failure conditions

- Visual drift from www
- Card-search regressions
- Cross-origin fetch blocked
- Local fallback missing

### Rollback

- Cloudflare Pages: revert deploy
- If regression came from a `registry-viewer` source change: revert in
  engine monorepo

---

## After WP-007 — what's not yet planned

Future work without WPs yet:

- **Logo design** — replace wordmark placeholder. Possibly contractor
  engagement.
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
