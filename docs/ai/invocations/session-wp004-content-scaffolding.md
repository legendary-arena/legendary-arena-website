# Session Execution Prompt — WP-004 (Content scaffolding + first 3 pages)

**Target Work Packet:** WP-004
**Authorized by Pre-Flight:** 2026-05-08 (READY TO EXECUTE / Copilot CONFIRM)
**Repo:** `C:\www\legendary-arena-com\` — Hugo marketing site for `www.legendary-arena.com`
**Governance regime:** Light (per `docs/01-VISION.md` §Operational). No EC system; Vision + Roadmap + brand strategy are the binding authorities.

This prompt is a **transcription + ordering artifact** derived from the
pre-flight. It introduces no new scope, constraints, or interpretations
beyond what is already locked in the WP and brand docs. If anything in
this prompt appears to add a constraint not present upstream, the
upstream document wins — surface the conflict and stop.

---

## Mission

Replace WP-001 placeholder content with real v1 copy for home, about,
and one blog post. Establish content conventions so future content
additions are frictionless. Lock WP-004 with verified Lighthouse scores
and a binary CTA visibility check.

This is **content authoring + verification**. No engine, no runtime, no
backend. Hugo + Markdown + a possible layout override.

---

## Read Order (Mandatory, In Sequence)

Do not author copy until all of these are loaded:

1. `docs/01-VISION.md` — Global invariants, In scope (v1), Permanent
   non-goals, Success criteria (especially **Comprehension** and
   **Primary CTA**), Decisions log. Authoritative.
2. `docs/03-ROADMAP.md § WP-004` — design source of truth (Goal,
   Conversion intent, Constraints, DoD, Exit criteria, Failure
   conditions). If this prompt or the WP execution pack disagrees with
   the roadmap, the roadmap wins.
3. `docs/brand/strategy.md` — v1 LOCKED. Binding for voice, terminology,
   CTA contract, brand failure modes. Read at minimum:
   - §2 Tone and voice (verb palette, do/don't, copy patterns, CTA contract)
   - §3 Product terminology (canonical terms, no synonyms without a Decisions log entry)
   - §5 Layout patterns (Pattern A hero-first, Pattern B three-block, Pattern C three-site)
   - §7 Differentiation messaging (supporting points, not lead claim)
   - §9 Source material acknowledgment (user-facing vs internal-doc distinction on "fan project")
   - §10 Brand failure modes (bright lines)
4. `docs/brand/palette.md` — color tokens. `--la-color-cta` (§4.2.1) is
   the CTA-button background, not `--la-color-red`.
5. `docs/brand/typography.md` — type scale. Hero h1 uses
   `--la-font-size-hero` (3.5rem); regular h1 uses `--la-font-size-h1`
   (3rem). One hero per page maximum.
6. `docs/brand/spacing.md` — for any custom layout decisions.
7. `assets/css/extended/custom.css` §5 — `.hero`, `.button`/`.btn`,
   `.card`, `.section`, `.section-lg` are already styled. Author
   content that uses them; do not re-style them.
8. `themes/PaperMod/layouts/index.html` — read before deciding the
   home-page approach in Step 1.
9. `docs/ai/work-packets/WP-004-content-scaffolding.md` — execution
   pack. Subordinate to roadmap on conflict.

Do **not** read prior session transcripts. The committed artifacts are
the truth.

---

## Locked Decisions From Pre-Flight (2026-05-08)

These are settled. Do not revisit:

- **Step 1 hard gate.** Step 2 may not begin until: (a) home-page
  approach (A, B, or C) is chosen, (b) the supporting file(s) for that
  approach exist (even as empty scaffolds), and (c) the choice is
  recorded in `docs/04-CONTENT-CONVENTIONS.md`. Authoring copy before
  this gate is a WP-004 failure — produces orphaned work when the
  approach changes.
- **Hero-line bright lines (fail examples).** Each violates
  `strategy.md §10`:
  - "Build a deck and fight villains." — mechanics-first
  - "A deck-building game where you..." — definition framing
  - "An epic, exciting card-battle adventure." — generic adjectives
  - "Try Legendary Arena today." — weak verb (`try`) + CTA leakage
  Pattern shape lives in `strategy.md §2.5`.
- **Binary CTA visibility test.** In each of 4 combinations
  (light/dark × 1280×800 / 375×667), without scrolling, at least one
  `.button` element with the canonical CTA label must be **fully**
  visible (not partially clipped) within the first viewport height.
  Any required scroll = fail.
- **Blog post is not a changelog.** Narrative framing for a new
  reader. Bullet-listed release notes are out of place. If you find
  yourself listing what shipped, step back and write the why instead.
- **Archetype validation.** Open the generated test file and confirm
  all four required fields are present and well-formed: `title`
  (non-empty placeholder), `date` (valid ISO timestamp), `description`
  (string, ≤160 chars; may be empty for the author), `draft: false`.
- **Lighthouse artifact policy.** Run with named outputs
  (`lighthouse-home.json`, `lighthouse-post.json`); these are
  local-only — do not commit. Capture the four scores per page in the
  WP-004 lock entry in `03-ROADMAP.md`, format matching the WP-003
  numbers in WP-004 line 303–308 of the execution pack.

---

## Scope Lock

### Allowed file targets

- `content/_index.md` (or its replacement under approach A/B from Step 1)
- `content/about/_index.md`
- `content/posts/2026-05-07-launch-announcement.md`
- `archetypes/posts.md`
- `docs/04-CONTENT-CONVENTIONS.md` (new file)
- One of: `layouts/index.html` (approach A) OR
  `layouts/_shortcodes/home-hero.html` (approach B) OR
  `hugo.toml` `homeInfoParams` edits (approach C)
- `docs/03-ROADMAP.md` — lock entry only (Step 8.1)
- `docs/01-VISION.md` — Decisions log entry only (Step 8.2)

### Forbidden

- `docs/brand/{strategy,palette,typography,spacing}.md` — values locked
- `static/brand-tokens.css` — token values locked
- `themes/PaperMod/**` — submodule must stay clean
  (`git submodule status` shows no `+`)
- Raw color/font/spacing literals in any file — use `var(--la-*)`
  always
- Lorem ipsum, "TBD", "Hello World", or any placeholder copy
- Re-styling existing utility classes (`.hero`, `.button`, etc.)
- Rebuilding favicons or logo (deferred per Vision Decisions log)
- Any new brand token (would require a `CHANGELOG.md` entry; only on a
  real contract violation)

**Rule:** anything not explicitly allowed is out of scope.

---

## Steps (Execute In Order)

### Step 1 — Decide home-page approach (then implement scaffold)

PaperMod's `homeInfoParams` doesn't ergonomically support a styled CTA
button above the fold. Choose, in order of preference:

- **(A) Override `layouts/index.html`** — full control. Read
  `themes/PaperMod/layouts/index.html` first, copy the structure into
  `layouts/index.html`, replace the `homeInfoParams` block with markup
  using `.hero` + `.button`. **Recommended.**
- **(B) Custom Hugo shortcode** — `layouts/_shortcodes/home-hero.html`,
  invoked from `content/_index.md`.
- **(C) Stick with `homeInfoParams`** — only if A and B both prove
  impractical; loses the styled CTA button.

**Gate:** create the supporting file(s) (even as empty scaffolds) and
record the choice in `docs/04-CONTENT-CONVENTIONS.md` before Step 2.

### Step 2 — Author home page

Three-beat structure (per Roadmap Conversion intent):

1. **What is LA?** — one declarative line above the fold. Lead with
   fantasy ("The arena awaits"), not mechanics ("Build a deck of...").
   Pattern shape: `strategy.md §2.5`. Apply the four fail examples
   from Locked Decisions above.
2. **Why?** — value prop. Themes from `strategy.md §7` (skill-first,
   no grind, no pay-to-win, deterministic system) used as supporting
   points, not the lead claim.
3. **What next?** — `.button` CTA, two words max, single verb. "Play
   now" is canonical.

Verb palette (`strategy.md §2.3`): `assemble · build · recruit · fight ·
master · defeat · earn · become`. Avoid `get`, `try`, `enjoy`, `perhaps`,
`maybe`, `sort of`.

Canonical terminology (`strategy.md §3`): Hero · Mastermind · Scenario ·
Villain group · Henchmen · Scheme twist · Session · Mastery · Victory.

CTA links to `https://play.legendary-arena.com/`.

### Step 3 — Author about page

`content/about/_index.md`. Cover: what LA is, who's behind it, project
status. Voice consistent with home (read both aloud back-to-back; if one
sounds like a different writer, rewrite).

**Do not** describe LA as "fan project," "amateur," "side project," or
"hobby project" in this user-facing surface. `strategy.md §9` and §10
"Self-deprecation" failure mode.

### Step 4 — Author first blog post

`content/posts/2026-05-07-launch-announcement.md`. Real content — not
"Hello World." Could be: project introduction, what's coming, why now,
what to expect. Voice consistent with home + about.

**Not a changelog.** Narrative framing for a new reader; bullet-listed
release notes are out of place.

Front-matter: `title`, `date`, `description` (≤160 chars, prep for
WP-008 SEO), `draft: false`.

### Step 5 — Create archetype

`archetypes/posts.md` — Hugo template for `hugo new posts/whatever.md`.
Pre-populate front-matter so future posts don't drift. Verify with:

```powershell
hugo new posts/test-archetype.md
```

Open the generated file and confirm all four required fields are
present and well-formed (see Locked Decisions above). Then delete the
test file. The archetype is part of the DoD.

### Step 6 — Create content conventions doc

`docs/04-CONTENT-CONVENTIONS.md`. Cover at minimum:

- Where home-page markup lives (Step 1 decision)
- Front-matter required fields (`title`, `date`, `description`, `tags`,
  `categories`, `draft`)
- Slug rules (kebab-case; date-prefix for posts)
- Image conventions: location (`static/images/...` recommended), naming
  (kebab-case), alt text expectations (every image; descriptive)
- Voice / tone reference back to `strategy.md §2`
- Terminology reference back to `strategy.md §3`
- Brand-failure-mode reminder: anything new published must pass
  `strategy.md §10`

### Step 7 — Verify

1. Start Hugo. From the repo root:
   ```powershell
   hugo server --port 1313 --bind 127.0.0.1
   ```
   Or use `.claude/launch.json` `hugo-server` config if launching from
   an IDE.
2. **Visual check / binary CTA test.** Open both modes (light + dark)
   at both viewports (1280×800 + 375×667). In each of the 4
   combinations, confirm the canonical `.button` CTA is fully visible,
   no scroll, no clipping, within the first viewport height. Any scroll
   required = fail.
3. **First-time-reader test.** Fresh tab after a break (or a friend);
   can they answer "what is this?" within ~5 seconds?
4. **Lighthouse.** Run on home + at least one blog post against
   `localhost` (not `127.0.0.1` — avoids the WP-003 CORS-style
   false-positive):
   ```powershell
   npx lighthouse@12 http://localhost:1313/ `
     --output=json --output-path=lighthouse-home.json `
     --chrome-flags="--headless --no-sandbox --disable-gpu" `
     --only-categories=performance,accessibility,best-practices,seo `
     --quiet
   npx lighthouse@12 http://localhost:1313/posts/2026-05-07-launch-announcement/ `
     --output=json --output-path=lighthouse-post.json `
     --chrome-flags="--headless --no-sandbox --disable-gpu" `
     --only-categories=performance,accessibility,best-practices,seo `
     --quiet
   ```
   All four categories must remain ≥ 90 on each page. Below 90 in any
   category = investigate before locking.
5. **Headless DOM check (optional).** Same pattern as WP-003:
   puppeteer-core + system Chrome to confirm the CTA `<a class="button">`
   is reachable, the hero `<h1>` resolves to `--la-font-size-hero`, no
   console errors. Reference `C:/tmp/la-verify.mjs` from the WP-003
   session if recreating it.
6. **Console.** No errors when the site is served.
7. **Submodule.** `git submodule status` shows no `+`.

Capture the four scores per page. They go into the lock entry in
Step 8. Do not commit `lighthouse-home.json` / `lighthouse-post.json`.

### Step 8 — Lock WP-004

When all DoD + exit criteria pass:

1. Update `docs/03-ROADMAP.md` § WP-004:
   - ⏸️ → ✅ Done
   - Tick all DoD + exit criteria boxes
   - Record final commit hash(es) under `**Commits:**`
   - Record the four Lighthouse scores (Performance / Accessibility /
     Best Practices / SEO) for home + blog post, format matching the
     WP-003 record in WP-004 Background section.
2. Add a Decisions log entry to `docs/01-VISION.md` recording the
   home-page-layout decision from Step 1 (especially if A or B —
   structural choice future contributors should know about).
3. Commit at logical milestones throughout; push to `origin/main`.

---

## Definition of Done (from WP-004)

- [ ] Home page answers what / why / what-next in that order, above the
  fold, on both 1280×800 and 375×667
- [ ] "Play now" CTA visible above the fold (both viewports), uses
  `.button`/`.btn` class, links to `https://play.legendary-arena.com/`
- [ ] About page has real content (no lorem ipsum, no "TBD")
- [ ] One real blog post published (not "Hello World")
- [ ] `hugo new posts/whatever.md` produces a properly-stubbed post
  via `archetypes/posts.md`, with all four front-matter fields valid
- [ ] `docs/04-CONTENT-CONVENTIONS.md` committed
- [ ] First-time-reader test passes (~5-second comprehension)
- [ ] Voice consistent across home + about + blog
- [ ] Lighthouse ≥ 90 maintained on home + blog post (all four
  categories)
- [ ] Binary CTA test passes (4 combinations, fully visible, no scroll)
- [ ] No console errors when served
- [ ] Submodule clean
- [ ] All commits pushed to `origin/main`
- [ ] WP-004 marked ✅ Done in `03-ROADMAP.md` with hashes + scores
- [ ] Home-page-layout decision logged in `01-VISION.md` Decisions log

---

## Brand Failure Modes (Bright Lines — Per `strategy.md §10`)

Any of these in shipped output = WP-004 not done, regardless of other
DoD criteria:

- Generic adjectives leading copy ("fun", "exciting", "awesome", "epic")
- Mechanics-first explanation (how the game works before fantasy/stakes)
- Terminology drift (different terms across pages for the same concept)
- Visual style divergence (colors/fonts/spacing not from `brand-tokens.css`)
- CTA inconsistency (verbose, multi-clause, "click here")
- Tone violations (emoji in brand copy, humor undermining stakes,
  conversational filler, questions-as-headlines)
- External IP dependency (copy requiring Marvel familiarity)
- Self-deprecation ("fan-made", "amateur", "side project" in
  user-facing surfaces)

---

## Final Instruction

Execute the steps in order. Stop at any step that produces a result you
cannot reconcile with the WP, the brand strategy, or this prompt — and
ask a human before proceeding. Do not silently work around a constraint.

When all DoD checks pass, commit, push, and post the four-line summary:
`WP-004 locked. Lighthouse home: P/A/BP/SEO. Lighthouse post: P/A/BP/SEO. Approach: A|B|C. Commits: <hashes>.`
