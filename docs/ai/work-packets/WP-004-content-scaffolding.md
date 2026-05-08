# WP-004 — Content scaffolding + first 3 pages

Replace WP-001 placeholder content with real v1 copy for home, about, and one
blog post. Establish content conventions so future content additions are
frictionless.

This file is the **session-ready execution pack**. The design source of
truth is [`docs/03-ROADMAP.md` § WP-004](../../03-ROADMAP.md). If this file
and the roadmap conflict, the roadmap wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme as a Git submodule. Brand
tokens consumed by `play.*` and `cards.*` via cross-origin link.

## Required reading (in order)

Before writing any content, read these — they set the bar:

1. `docs/01-VISION.md` — vision, Global invariants, success criteria,
   Decisions log. Authoritative. Note especially the "Comprehension"
   and "Primary CTA" success criteria.
2. `docs/03-ROADMAP.md` — full WP list. Read **WP-004** in detail
   (Goal, Conversion intent, Constraints, DoD, Exit criteria, Failure
   conditions). WP-002 + WP-003 are ✅ Done; WP-005 (Pagefind),
   WP-006 (Cloudflare deploy), WP-007a/b (cross-site brand integration),
   WP-008 (SEO baseline) are downstream of this WP.
3. `docs/brand/strategy.md` — **v1 LOCKED for WWW**. This is the
   single most important read for content work. Pay attention to:
   - §2 Voice and tone — verb palette, do/don't, copy patterns,
     **CTA contract** (≤2 words, single verb)
   - §3 Product terminology — canonical terms; **no synonyms
     without a Decisions log entry**
   - §5 Layout patterns — Pattern A (hero-first), Pattern B
     (three-block system explanation), Pattern C (three-site
     ecosystem links)
   - §7 Differentiation messaging — supporting points, not lead claim
   - §9 Source material acknowledgment — note the user-facing /
     internal-doc distinction on "fan project" framing
   - §10 **Brand failure modes** — bright lines that fail WP-004
     DoD regardless of other criteria
4. `docs/brand/palette.md` — color tokens. Note `--la-color-cta`
   (§4.2.1) is the CTA-button background, not `--la-color-red`.
5. `docs/brand/typography.md` — type scale. Hero h1 uses
   `--la-font-size-hero` (3.5rem); regular h1 uses `--la-font-size-h1`
   (3rem). One hero per page maximum (§4.1).
6. `docs/brand/spacing.md` — for any custom layout decisions.
7. `assets/css/extended/custom.css` — read §5 (forward-compat utility
   classes). `.hero`, `.button`/`.btn`, `.card`, `.section`,
   `.section-lg` are already styled and ready. Don't re-style them;
   author content that uses them.
8. `themes/PaperMod/layouts/index.html` — current home page renderer.
   Read this before deciding how to override (see Step 1).

Don't read prior session transcripts; the committed artifacts are the
truth.

## Current state

What works (locked under WP-002 + WP-003, verified 2026-05-07):

- Brand tokens load and resolve in both modes (Lighthouse a11y 100,
  all `palette.md §8` contrast pairs WCAG AA)
- Hugo dev server builds clean, no console errors
- PaperMod theme styled to LA brand via overrides (`.logo a`, `.menu a`,
  `.footer`, `body.list`, etc.)
- `.hero`, `.button`, `.section`, `.card` utility classes ready for
  content authoring (see `custom.css` §5)
- Submodule clean (`git submodule status` shows no `+`)
- Favicon placeholders in place; real branded favicons follow real
  logo design (deferred per `01-VISION.md` Decisions log)

What's pending — **your job**:

- ❌ `content/_index.md` — real homepage content with hero + CTA
- ❌ `content/about/_index.md` — real about page content
- ❌ `content/posts/2026-05-07-launch-announcement.md` — first real blog post
- ❌ `archetypes/posts.md` — front-matter template for `hugo new`
- ❌ `docs/04-CONTENT-CONVENTIONS.md` — front-matter rules, slug rules,
  image conventions
- ❌ Lighthouse re-verification (≥ 90 maintained per WP-004 exit criteria)
- ❌ First-time-reader test — comprehension within ~5 seconds

Note: `hugo.toml` currently uses PaperMod's `homeInfoParams` for the
home page text. WP-004 will likely replace this — see Step 1.

## Task

### Step 1 — Decide home-page layout approach (then implement it)

PaperMod's `homeInfoParams` block in `hugo.toml` doesn't ergonomically
support a styled CTA button above the fold. The DoD requires:

- Hero answering "what is LA?" in one line
- "Why should I care?" value prop
- Visible "Play now" CTA above the fold on desktop AND mobile,
  linked to `https://play.legendary-arena.com/`

Three options, in order of recommendation:

- **(A) Override `layouts/index.html`** — full control, cleanest. Read
  PaperMod's `themes/PaperMod/layouts/index.html` first; copy the
  structure into `layouts/index.html`; replace the `homeInfoParams`
  block with markup that uses `.hero` + `.button`. Recommended.
- **(B) Custom Hugo shortcode** — define a `home-hero` shortcode under
  `layouts/_shortcodes/`, invoke it from `content/_index.md`.
- **(C) Stick with `homeInfoParams`** — only if A and B both prove
  impractical; you'd lose the styled CTA button.

Decide before authoring; document the choice in
`docs/04-CONTENT-CONVENTIONS.md` so future contributors know where
home-page markup lives.

### Step 2 — Author home page content

Apply `strategy.md §2` voice + §5 layout patterns. Three-beat structure
(per WP-004 Conversion intent):

1. **What is LA?** — one declarative line above the fold. Lead with
   fantasy ("The arena awaits") not mechanics ("Build a deck of...").
2. **Why?** — value prop. Themes from `strategy.md §7`: skill-first,
   no grind, no pay-to-win, deterministic system. Use as supporting
   points, not the lead claim.
3. **What next?** — `.button` CTA. Two words max. Single verb.
   "Play now" is the canonical phrasing.

Use the verb palette from `strategy.md §2`: `assemble · build · recruit ·
fight · master · defeat · earn · become`. Avoid `get`, `try`, `enjoy`,
`perhaps`, `maybe`, `sort of`.

Use canonical terminology from `strategy.md §3`: Hero · Mastermind ·
Scenario · Villain group · Henchmen · Scheme twist · Session · Mastery ·
Victory.

### Step 3 — Author about page

`content/about/_index.md`. Cover: what LA is, who's behind it, project
status. Voice consistent with home (same tone test: read both aloud back
to back; if one sounds like a different writer, rewrite).

**Do not** describe LA as a "fan project," "amateur," "side project,"
or "hobby project" in this user-facing surface. `strategy.md §9`
documents the internal-vs-public distinction.

### Step 4 — Author first blog post

`content/posts/2026-05-07-launch-announcement.md`. Real content — not
"Hello World." Could be: project introduction, what's coming, why now,
what to expect. Voice consistent with home + about.

Front-matter must include `title`, `date`, `description` (≤160 chars,
prep for WP-008 SEO), `draft: false`.

### Step 5 — Create archetype

`archetypes/posts.md` — Hugo template for `hugo new posts/whatever.md`.
Pre-populate front-matter so future posts don't drift. Verify with:

```powershell
hugo new posts/test-archetype.md
```

Then delete the test file. The archetype is part of the DoD.

### Step 6 — Create content conventions doc

`docs/04-CONTENT-CONVENTIONS.md`. Cover at minimum:

- Where home-page markup lives (Step 1 decision)
- Front-matter required fields (title, date, description, tags,
  categories, draft)
- Slug rules (kebab-case, date-prefix for posts)
- Image conventions: where they live (`static/images/...` recommended),
  naming (kebab-case), alt text expectations (every image; descriptive)
- Voice / tone reference back to `strategy.md §2`
- Terminology reference back to `strategy.md §3`
- Brand-failure-mode reminder: anything new published must pass
  `strategy.md §10`

### Step 7 — Verify

The verification approach proven in WP-003 is reusable:

1. Start Hugo via `.claude/launch.json` (`hugo-server` config) or
   `hugo server --port 1313 --bind 127.0.0.1`.
2. **Visual check** — open both modes, both viewports (1280×800 and
   375×667). Confirm CTA visible above the fold in both.
3. **First-time-reader test** — fresh tab after a break (or a friend);
   can they answer "what is this?" within ~5 seconds?
4. **Lighthouse** — re-run on the home page and at least one blog
   post. Run against `localhost`, not `127.0.0.1`, to avoid the
   CORS-style false-positive that hit WP-003 verification:
   ```powershell
   npx lighthouse@12 http://localhost:1313/ `
     --output=json --output-path=lighthouse-home.json `
     --chrome-flags="--headless --no-sandbox --disable-gpu" `
     --only-categories=performance,accessibility,best-practices,seo `
     --quiet
   ```
   All four categories must remain ≥ 90.
5. **Headless DOM check (optional, robust)** — same pattern as
   WP-003: puppeteer-core + system Chrome to confirm the CTA
   `<a class="button">` is reachable, the hero `<h1>` resolves to
   `--la-font-size-hero`, no console errors. See `C:/tmp/la-verify.mjs`
   from the WP-003 session as a starting point if you re-create it
   (the file is local, not committed).

Capture the results. Anything below 90 in any Lighthouse category is
a failure to investigate before locking.

### Step 8 — Lock WP-004

When all DoD + exit criteria pass:

1. Update `docs/03-ROADMAP.md`:
   - WP-004: ⏸️ → ✅ Done
   - Tick all DoD + exit criteria boxes
   - Record final commit hash(es) under `**Commits:**`
2. Add a Decisions log entry to `docs/01-VISION.md` recording the
   home-page-layout decision from Step 1 (especially if A or B —
   that's a structural choice future contributors should know about).
3. Commit at logical milestones throughout the session, then push.

## Constraints

- **Brand artifacts are locked.** Do NOT modify
  `docs/brand/{strategy,palette,typography,spacing}.md` or
  `static/brand-tokens.css` token values. If a real brand-failure-mode
  issue surfaces and a token tweak is genuinely required, that's an
  additive change — log in `CHANGELOG.md` per the v1 rules. Don't
  change values silently.
- **No raw color/font/spacing values in content or layout files.**
  Token-first contract still applies. Use `var(--la-*)` always.
- **Submodule must stay clean.** `git submodule status` shows no `+`.
  No edits under `themes/PaperMod/`.
- **No lorem ipsum.** Per WP-004 spec — everything that ships must
  be content you'd want a stranger to read.
- **CTA color routes through `--la-color-cta`**, not `--la-color-red`.
  `.button`/`.btn` are already wired correctly in `custom.css §5.2`.
  Use those classes; don't reach for raw red tokens for buttons.
- **Cross-site links degrade gracefully.** `play.legendary-arena.com`
  and `cards.barefootbetters.com` may be unreachable until WP-006 +
  WP-007a/b land. Per `01-VISION.md` Global invariants, broken links
  are acceptable; broken pages are not. Linking to those URLs now is
  fine.
- **Performance budget.** Lighthouse Performance must stay ≥ 90.
  Optimize images aggressively (WebP, sized to display, `loading="lazy"`).

## Definition of Done

- [ ] Home page answers what / why / what-next in that order, above
  the fold, on both 1280×800 and 375×667
- [ ] "Play now" CTA visible above the fold (both viewports), uses
  `.button`/`.btn` class, links to `https://play.legendary-arena.com/`
- [ ] About page has real content (no lorem ipsum, no "TBD")
- [ ] One real blog post published (not "Hello World")
- [ ] `hugo new posts/whatever.md` produces a properly-stubbed post
  via `archetypes/posts.md`
- [ ] `docs/04-CONTENT-CONVENTIONS.md` committed
- [ ] First-time-reader test passes (~5-second comprehension)
- [ ] Voice consistent across home + about + blog
- [ ] Lighthouse ≥ 90 maintained on home + blog post (Performance,
  Accessibility, Best Practices, SEO)
- [ ] No console errors when served
- [ ] Submodule clean
- [ ] All commits pushed to `origin/main`
- [ ] WP-004 marked ✅ Done in `03-ROADMAP.md` with hashes
- [ ] Home-page-layout decision logged in `01-VISION.md` Decisions
  log

## What's NOT in scope

- WP-005 (Pagefind search integration) — separate WP, separate session
- WP-006 (Cloudflare Pages deploy) — separate WP
- WP-007a/b (cross-site brand integration) — separate WPs
- WP-008 (SEO baseline / Schema.org) — separate WP. WP-004 lays a
  light foundation by writing front-matter `description` fields, but
  Schema markup, OG tag verification, and Search Console submission
  are WP-008's job.
- Real branded logo / favicons — deferred per `01-VISION.md` Decisions
  log; placeholders remain
- Brand iterations beyond fixing locked-criteria failures
- New brand tokens (would require a `CHANGELOG.md` entry; only
  needed if a real contract violation surfaces)

## Authority

Subordinate to `docs/01-VISION.md` (highest), then `03-ROADMAP.md`,
then this file. If anything here conflicts with vision or roadmap,
those win — surface the conflict before proceeding.

`docs/brand/strategy.md` is the canonical authority for voice, tone,
terminology, and CTA contract. Brand failure modes (`§10`) are bright
lines, not preferences. A WP-004 DoD that meets every other criterion
but produces a brand failure mode is **not done**.

## Background

WP-002 + WP-003 locked on 2026-05-07. Brand v1 is verified at the
www tier:

- Lighthouse home page: 91 / 100 / 100 / 100
- WCAG AA: 12 / 12 contrast pairs (text-primary AAA in both modes)
- Both modes render with LA tokens active (post-fix to dark-mode
  selector + PaperMod compatibility shim)
- Mobile 375×667 clean; `prefers-reduced-motion` honored
- Console clean

WP-004 is the first WP that exposes the brand to *user-facing copy*.
The brand strategy was intentionally drafted to be load-bearing here —
it's what catches "default deck-builder marketing" copy before it ships.
Lean on it.

The Hugo dev server config is in `.claude/launch.json` (committed
during WP-003 verification) — `hugo-server` config on port 1313.
Future Claude sessions can use it via `preview_start` if running from
this repo's working directory.
