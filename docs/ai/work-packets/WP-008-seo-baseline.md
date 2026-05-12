# WP-008 — SEO baseline + Schema.org markup

Stand up the Hugo-native equivalent of a "RankMath-configured" SEO
baseline for `www.legendary-arena.com`: a project-side Schema.org
JSON-LD partial, verified OG / Twitter Card output, accessible
`sitemap.xml` and `robots.txt`, front-matter discipline across every
shipped page, and Google Search Console submission. Codify the
ongoing discipline in `docs/05-SEO-CONVENTIONS.md`.

This file is the **session-ready execution pack**. The design source
of truth is [`docs/03-ROADMAP.md` § WP-008](../../03-ROADMAP.md). If
this file and the roadmap conflict, the roadmap wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme as a Git submodule (clean
at `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`). Brand tokens v1
LOCKED (WP-002 + WP-003; cross-site carve-out fully closed at
WP-007b lock 2026-05-11). Production deploy LOCKED on CF Pages
(WP-006). Site chrome locked under WP-010. Font-display posture
locked under WP-011.

## Baseline anchor

Pre-drafting hygiene gate (`scripts/pre-drafting-hygiene-gate.ps1`)
ran clean immediately before this WP was drafted (2026-05-11):
status **GO**, exit 0. Baseline SHA recorded for the WP-008
execution session:

```
8da6cbdc89e280f362cdd8452746a13cd4b2260a
```

This is the lock commit set the WP executes against; any drift on
`origin/main` between draft and execution invalidates the assumption
set in § Current state and must be re-baselined before Step 1
pre-flight passes.

## Required reading (in order)

Before touching templates, front-matter, or external validators,
read these — they set the bar:

1. `docs/01-VISION.md` — vision, Global invariants, Decisions log.
   The invariants that load-bear here:
   - **Performance + accessibility floor** — Lighthouse ≥ 90 in
     all four categories. WP-008's target tightens to **SEO ≥ 95**
     on home (per § WP-008 Exit criteria in the roadmap) without
     dropping any other category below 90.
   - **Deterministic deploy** — anything added to `static/`,
     `layouts/`, or `content/` must build into a byte-identical
     `public/` across two consecutive `npm run build` runs.
     `Compare-Object` over SHA-256 must return empty at lock.
   - **No retroactive breakage** — WP-006's CORS contract, WP-010's
     site chrome, WP-011's `display=optional` posture, and WP-007a /
     WP-007b's cross-site contract MUST all remain intact.
   - **Brand failure modes apply to copy this WP touches.** Site-
     level meta description (`hugo.toml` `[params].description`),
     any new Schema.org `description` strings, and any new copy in
     `docs/05-SEO-CONVENTIONS.md` are brand surface — `strategy.md
     §10` failure modes apply, especially the "External IP
     dependency (copy requiring Marvel familiarity)" line. See §
     Step 1.4 below for the specific tension this surfaces.
2. `docs/03-ROADMAP.md` — full WP list. Read **WP-008** in detail
   (Goal, Deliverables, Out of scope, Constraints, DoD, Exit
   criteria, Failure conditions, Rollback). Re-read WP-006's lock
   notes — the CF zone "AI Crawl Control / Managed robots.txt: OFF"
   setting is load-bearing for Hugo's clean `robots.txt` to survive
   to the live URL. Re-read WP-010's Step 4.6 — adding any
   text-rendering UI element in regions that affect `<main>`
   positioning is the failure mode WP-011 closed but a new
   text-bearing template could reopen if it grows the header /
   footer surface.
3. `docs/04-CONTENT-CONVENTIONS.md` — Front-matter section
   (`description` field rule already documented as a WP-008 prep
   item: "1–2 sentences, ≤ 160 characters; SEO + social share
   preview"). This WP turns that documented expectation into an
   enforced gate.
4. `docs/brand/strategy.md` § 2 (Voice and tone), § 3
   (Terminology), § 10 (Brand failure modes). The Schema.org
   `description` strings, the site-level meta description, and any
   new copy in the SEO conventions doc are brand surface.
5. `hugo.toml` — note `baseURL = "https://www.legendary-arena.com/"`,
   `enableRobotsTXT = true`, `canonifyURLs = true`,
   `[params].env = "production"`, and `[params].description`
   (the latter is the current site-level meta description fallback
   PaperMod's `head.html` line 22-23 uses when a page has no
   `description` front-matter; see § Step 1.4 below for why it
   needs to change).
6. `themes/PaperMod/layouts/_partials/head.html` lines 4-8 (robots
   meta), 11 (title), 14-23 (description fallback chain), 87-94
   (favicons), 189-194 (production-only inclusion of
   `templates/opengraph.html`, `templates/twitter_cards.html`,
   `templates/schema_json.html`). PaperMod already ships the OG /
   Twitter / partial-Schema work; WP-008 augments rather than
   replaces.
7. `themes/PaperMod/layouts/_partials/templates/schema_json.html` —
   PaperMod's existing Schema partial. Currently emits:
   `Organization` (or `Person`) on home; `BreadcrumbList` on
   pages + sections; `BlogPosting` on single pages. The gap this
   WP fills:
   - **`WebSite` on home** (PaperMod does not emit this) — needed
     so Google's Rich Results Test recognizes the site as a
     `WebSite` entity distinct from the publishing `Organization`,
     and so a future Sitelinks Search Box can attach without a
     second redesign.
   - **`AboutPage` on `/about/`** (PaperMod treats `/about/` as a
     generic page and emits only `BreadcrumbList`).
   - **`Blog` on `/posts/`** (PaperMod emits only `BreadcrumbList`
     on the section index).
   - The `Organization` shape PaperMod emits is functional but
     thin — no `sameAs`, no `url`, `logo` defaults to favicon. The
     WP-008 partial fills these from explicit site params.
8. `layouts/_partials/extend_head.html` — the project-level head
   extension (loaded by PaperMod's `head.html` line 186). This is
   where the new `seo/schema.html` partial is included; the order
   matters (see § Step 3 — Wire partial into head).
9. `layouts/baseof.html` — the project-level baseof override (adds
   `data-pagefind-body` to `<main>`). Read to confirm no
   structural change is needed at the body / main boundary for
   WP-008.
10. `static/_headers` — current contents (the `/brand-tokens.css`
    CORS block locked under WP-006). WP-008 does NOT modify this
    file (and MUST NOT — touching it triggers a CF zone-setting
    audit per WP-006 Failure conditions).
11. <https://developers.google.com/search/docs/appearance/structured-data/article>
    — Google's documented requirements for `Article` /
    `BlogPosting` markup. The WP-008 partial must satisfy the
    required-property set (`headline`, `image`, `datePublished`,
    `author`) for the Rich Results Test to return zero errors.
12. <https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox>
    — `WebSite` + `SearchAction` shape (optional in v1; the WP-008
    partial emits `WebSite` but defers `SearchAction` since
    Pagefind is client-only and not URL-addressable; recording the
    decision is in § Step 2.2).
13. <https://search.google.com/test/rich-results> — Google Rich
    Results Test. Used as a Step 6.1 validator against the live
    URL.
14. <https://developers.facebook.com/tools/debug/> — Facebook
    Sharing Debugger. Step 6.2 validator.
15. <https://cards-dev.twitter.com/validator> — Twitter Card
    Validator. Step 6.3 validator. (Note: as of 2026, X's official
    URL is `cards-dev.twitter.com/validator`; mirror at
    `https://x.com/i/cards-dev/validator` if the canonical URL
    redirects.)
16. <https://search.google.com/search-console> — Google Search
    Console (sitemap submission). Step 6.4.

Don't read prior session transcripts; the committed artifacts are
the truth.

## Assumptions + DNS posture (read first)

- **WP-006 is locked and live.** `https://www.legendary-arena.com/`
  serves the marketing site. The `legendary-arena.com` CF zone has
  Browser Cache TTL set to "Respect Existing Headers" and AI Crawl
  Control / Managed `robots.txt` set to **OFF**. The latter is
  load-bearing: if CF's managed `robots.txt` is re-enabled, it
  injects a `Content-Signal:` directive Lighthouse v12 does not
  recognize, causing a cosmetic SEO regression (100 → 92 at
  WP-006 first-pass; see 2026-05-09 Decisions log) and silently
  shadowing Hugo's clean `User-agent: *` `robots.txt`.
- **`hugo.toml` `enableRobotsTXT = true`.** Hugo's default
  `robots.txt` template emits `User-agent: *` with no `Disallow`
  rule. PaperMod does not override this template. The output is
  reachable at `https://www.legendary-arena.com/robots.txt` after
  every build.
- **PaperMod's OG / Twitter / Schema partials run in production
  only** (gated by `hugo.IsProduction | or (eq site.Params.env
  "production")` in `head.html` lines 189-194). `hugo.toml` already
  sets `[params].env = "production"`, so the partials fire on
  every build, including dev (`hugo server`). Verify before Step 5.
- **Production-build Lighthouse SEO is already at 100 on home and
  on the launch post** per WP-010 lock (2026-05-10) and WP-011
  lock (2026-05-10). WP-008's tightened SEO ≥ 95 target is well
  within the existing margin; the WP must not regress these
  scores while adding the new partial.
- **No new top-level dependencies.** WP-008 is template + content
  work only. `package.json` / `package-lock.json` / the `build`
  script / `hugo.toml` `baseURL` / `canonifyURLs` MUST NOT change.

## Current state

What works (locked under WP-001 through WP-011, verified 2026-05-11):

- Home, about, launch post all render with PaperMod's default
  `<head>` meta tags (charset, viewport, robots, title,
  description, author, canonical, favicons; OG + Twitter Card +
  partial Schema via PaperMod's production-only template partials).
- Every committed page has non-empty `description` front-matter —
  home (`content/_index.md`), about (`content/about/_index.md`),
  launch post (`content/posts/2026-05-07-launch-announcement.md`).
  All three descriptions are within the ≤ 160 char rule
  `04-CONTENT-CONVENTIONS.md` documents.
- `hugo.toml` `enableRobotsTXT = true`; Hugo emits a clean
  `User-agent: *` `robots.txt` on every build; CF zone setting
  preserves it through to the live URL.
- Hugo's auto-generated `sitemap.xml` is reachable at
  `https://www.legendary-arena.com/sitemap.xml` (Hugo default;
  PaperMod does not override).
- Lighthouse on production build at `http://127.0.0.1:1314/`
  (WP-011 lock, 2026-05-10): home 96 / 100 / 100 / 100; `/posts/`
  100 / 100 / 100 / 100; `/about/` 100 / 100 / 100 / 100; launch
  post 99 / 100 / 100 / 100. Lighthouse on the live URL (WP-006
  lock, 2026-05-09): home 97 / 100 / 100 / 100; launch post
  99 / 100 / 100 / 100. SEO = 100 on every measured surface.
- Submodule clean (`themes/PaperMod` at
  `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`, no `+` flag).

What's pending — **your job**:

- ❌ Custom partial `layouts/_partials/seo/schema.html`
  implemented, emitting:
  - `Organization` + `WebSite` on home (replacing PaperMod's
    home-only `Organization`-or-`Person` emission with the
    fuller two-entity shape)
  - `AboutPage` on `/about/` (additive — PaperMod's existing
    `BreadcrumbList` stays)
  - `Blog` on `/posts/` (additive)
  - `BlogPosting` + `BreadcrumbList` on individual posts —
    decision in § Step 2.3 below: AUGMENT PaperMod's existing
    partial rather than replace it, by emitting only the
    properties PaperMod misses (`mainEntityOfPage` already
    present; `image` ← needs explicit fallback; `wordCount` ←
    already present; `inLanguage` ← already present); the audit
    in Step 2.3 records the exact delta
- ❌ Partial wired into the project-level head extension
  (`layouts/_partials/extend_head.html`), gated by
  `hugo.IsProduction | or (eq site.Params.env "production")` to
  match PaperMod's posture so dev-mode renders don't ship Schema
  to the dev console
- ❌ `hugo.toml` `[params].description` brand-failure-mode rewrite
  (per § Step 1.4 — the current value is "A digital adaptation of
  the Legendary: A Marvel Deck Building Game", which is an
  `strategy.md §10` "External IP dependency" failure mode and
  cascades into every page's meta description fallback, OG
  description, and Twitter description)
- ❌ `hugo.toml` `[params].schema` map populated (`publisherType =
  "Organization"`; `sameAs = []` — the array stays empty at lock
  per § Step 2.1, recording the explicit decision)
- ❌ Front-matter discipline gate: every committed page has a
  non-empty `description` (already true at draft time per Current
  state above; Step 4 re-verifies mechanically and tightens the
  archetype at `archetypes/posts.md` if needed)
- ❌ External validator pass (Rich Results, FB Debugger, Twitter
  Validator) clean on home + launch post against the live URL
- ❌ `sitemap.xml` submitted to Google Search Console for the
  `www.legendary-arena.com` property
- ❌ `docs/05-SEO-CONVENTIONS.md` written and committed
- ❌ Lighthouse re-verified against the live URL post-deploy: SEO
  ≥ 95 on home; Performance / Accessibility / Best Practices /
  SEO all ≥ 90 on every measured surface; no console-error
  regression
- ❌ WP-008 marked ✅ Done in `03-ROADMAP.md` with commits +
  Lighthouse scores + Search Console verification method recorded
- ❌ Decisions log entry in `01-VISION.md`

## Task

### Step 1 — Pre-flight + decide what NOT to change

Before opening a Hugo template, confirm:

- WP-006 + WP-010 + WP-011 are ✅ Done in `03-ROADMAP.md` and the
  lock commits are on `origin/main`.
- `npm ci && npm run build` succeeds from a clean working tree.
- Two consecutive `npm run build` runs produce byte-identical
  `public/` per `Compare-Object` over SHA-256 hashes (mechanical
  reproducibility check, identical methodology to WP-005 / WP-006
  / WP-010 / WP-011 lock passes).
- `curl -I https://www.legendary-arena.com/robots.txt` returns
  `200`. `curl https://www.legendary-arena.com/robots.txt` returns
  a clean `User-agent: *` with no `Content-Signal:` directive (if
  `Content-Signal:` is present, the CF zone-setting "AI Crawl
  Control / Managed robots.txt: OFF" has regressed and that is a
  Step 1 blocker — fix the zone setting before continuing).
- `curl -I https://www.legendary-arena.com/sitemap.xml` returns
  `200`. The body lists at least the home, about, posts section,
  and launch post URLs.
- `curl -I https://www.legendary-arena.com/brand-tokens.css`
  returns `200` with `Access-Control-Allow-Origin: *` and
  `Cache-Control: public, max-age=3600, must-revalidate` — proves
  the WP-006 contract hasn't regressed in the meantime.
- Submodule clean (`git submodule status` → no `+`).

**Do not** at this step:

- Touch `package.json`, `package-lock.json`, the `build` script,
  `hugo.toml` `baseURL` / `canonifyURLs` / `enableRobotsTXT`,
  `static/brand-tokens.css`, or `static/_headers`. Those are
  WP-002 / WP-005 / WP-006 lock state.
- Modify anything under `themes/PaperMod/` for any reason.
- Add new top-level dependencies. WP-008 is template + content
  work; no new npm package is needed.
- Touch `layouts/_partials/header.html`, `layouts/_partials/footer.html`,
  `layouts/index.html`, `layouts/baseof.html`, or
  `assets/css/extended/custom.css`. Those are WP-003 / WP-004 /
  WP-005 / WP-010 lock state.

#### Step 1.4 — Resolve the `[params].description` brand-failure-mode

`hugo.toml` line 14 currently sets:

```toml
[params]
  description = "A digital adaptation of the Legendary: A Marvel Deck Building Game."
```

This string is PaperMod's site-level meta-description fallback
(`themes/PaperMod/layouts/_partials/head.html` line 22-23 — used
on any page without explicit `description` front-matter, and also
cascaded into `OpenGraph` and `Twitter Card` `description`
emissions via `templates/opengraph.html` line 11 and
`templates/twitter_cards.html` line 22). It is also consumed by
PaperMod's `Organization` Schema emission
(`templates/schema_json.html` line 8).

Per `docs/brand/strategy.md §10` (Brand failure modes), the
following is named explicitly:

> External IP dependency (copy requiring Marvel familiarity)

The current `[params].description` value names "Marvel" directly
and frames the product as an "adaptation" of an external IP. This
is the §10 failure mode in literal form, and it leaks into every
page's meta description, OG description, Twitter description, and
home-page Schema `description`.

**WP-008 fixes this in-scope** because:

1. The string is functioning as site-wide SEO metadata (its primary
   role per PaperMod's template chain); WP-008 owns site-wide SEO
   metadata.
2. Leaving it as-is at lock would mean WP-008 signs off on a
   live-site SEO surface containing a documented brand failure
   mode — a contradiction with the Decisions log "Brand artifacts
   move to **v1 LOCKED**" entry of 2026-05-11.
3. The fix is a one-line `hugo.toml` edit; carving it out to a
   separate copy WP would force WP-008 to either defer locking or
   ship the failure mode. Neither is acceptable.

**Replacement copy (use verbatim — sourced from the home page
hero + section copy already locked under WP-004):**

```toml
[params]
  description = "Legendary Arena is a skill-first, web-based deck-building system. Assemble your heroes, face the scenario, and earn your standing."
```

This is byte-identical to `content/_index.md`'s `description`
front-matter (locked under WP-004), so site-level fallback and
home-page explicit value resolve to the same string — there is no
divergence to maintain. Character count: 152 (within the ≤ 160
rule documented in `04-CONTENT-CONVENTIONS.md`). Names no
external IP; lead clause is concrete-product framing
(`strategy.md §2` voice rule).

If a future copy WP rewrites the home description, it must update
this fallback in the same commit; recording the link here is the
gate against drift.

If any pre-flight check fails, stop and surface — don't push
changes that depend on a state that isn't true yet.

### Step 2 — Author the project-side Schema partial

Create the file `layouts/_partials/seo/schema.html` (new directory
under `layouts/_partials/`, new file). The partial replaces
PaperMod's home-page `Organization` emission with a fuller
`Organization` + `WebSite` pair, adds `AboutPage` on `/about/`
and `Blog` on `/posts/`, and is silent (emits nothing) on
individual posts — letting PaperMod's existing `BlogPosting` +
`BreadcrumbList` emission stand for that page kind.

#### Step 2.1 — `hugo.toml` site-params additions

Before authoring the partial, add the params it reads:

```toml
[params.schema]
  publisherType = "Organization"
  # sameAs intentionally empty at WP-008 lock. The site has no
  # canonical social profile URLs to surface yet (no Twitter / X,
  # no Mastodon, no LinkedIn org page, no GitHub org page at a
  # public-facing URL). Adding a real entry is the natural
  # follow-up to a "marketing presence" effort outside WP-008's
  # scope. Keeping the array empty (vs. omitting the key) makes
  # the gap explicit to the next author touching this map and
  # avoids a silent "Organization with no sameAs" Rich Results
  # warning by emitting the empty array honestly.
  sameAs = []
```

These additions live alongside the existing `[params]` block;
keep them grouped together so a future author finds the SEO
config in one place.

#### Step 2.2 — `WebSite` decision (no `SearchAction` in v1)

Google's `WebSite` + `SearchAction` shape lets Google attach a
Sitelinks Search Box to the search result. The `SearchAction`
shape requires a URL-addressable search endpoint
(`target` = `https://example.com/?q={search_term_string}` or
similar). Pagefind is **client-only**: search is bound to the
`#la-search` mount and the lazy-loaded `pagefind-ui.js` bundle;
there is no server-side `?q=` route, and no static fallback page
that renders a query into results.

**Decision at WP-008 lock:** emit `WebSite` **without**
`SearchAction`. Rationale:

- A fake `SearchAction` URL Google can't actually crawl would be
  worse than nothing — the URL would 404 on Google's verification
  request and likely suppress the entire `WebSite` entity.
- Pagefind plus a URL-addressable `/search/?q=...` page is a real
  feature (Pagefind supports `pagefind.search()` programmatically),
  but it is out of scope for WP-008 and would change the surface
  WP-005 locked. Defer to a future "Pagefind URL-addressable
  search" WP if Sitelinks Search Box becomes valuable.
- Recording the decision here (and in
  `docs/05-SEO-CONVENTIONS.md`) prevents a future executor from
  inferring "the WebSite needs a SearchAction" from Google's docs
  and pushing a half-baked `?q=` shim.

#### Step 2.3 — `BlogPosting` decision (AUGMENT PaperMod, don't replace)

PaperMod's `templates/schema_json.html` lines 62-126 already emit
a substantial `BlogPosting` shape with `headline`, `description`,
`keywords`, `articleBody`, `wordCount`, `inLanguage`,
`datePublished`, `dateModified`, `author`, `mainEntityOfPage`,
and `publisher`. The notable omissions vs Google's
documented-required set for `Article` / `BlogPosting`:

- `image` — PaperMod attempts `Params.cover.image` then a
  `_funcs/get-page-images` partial. If a post has neither, the
  `image` property is silently omitted, which is one of the most
  common reasons the Rich Results Test reports a warning.

**Decision at WP-008 lock:** the WP-008 partial is **silent on
post pages**. The reasoning:

- PaperMod's `BlogPosting` is correct in shape; the `image`
  omission is content-side (the launch post has no `cover.image`
  front-matter and no inline images), not template-side.
- Adding a second `BlogPosting` script tag would duplicate
  Schema for Rich Results — Google de-duplicates by `@id`, but
  emitting two scripts where one suffices is a tax on every
  audit.
- The `image` fix is a content-side action: either add a
  `cover.image` to the launch post's front-matter (out of
  WP-008 scope — content authoring), or set a default site-wide
  social-share image at `static/images/og-default.jpg` and
  reference it via a `[params.assets].og_image` param (also
  arguably content-side, but small enough to fold in if the
  Step 6.1 Rich Results pass surfaces a warning).
- If Step 6.1 surfaces a Rich Results warning on the post page
  for `image` specifically, fix by adding `static/images/og-default.png`
  (Hugo copies it to `/images/og-default.png`) and adding a
  `cover.image: "/images/og-default.png"` line to the launch
  post's front-matter. Document the file's existence and the
  front-matter convention in `docs/05-SEO-CONVENTIONS.md`. Do
  NOT add a project-side `BlogPosting` partial that duplicates
  PaperMod's emission.
- If Step 6.1 surfaces a Rich Results warning on the home page
  for `Organization.logo` (Google's Logo guidelines specify a
  minimum 112×112 px for `Organization.logo`; `favicon.ico` is
  16×16 / 32×32 and would trigger this warning if Google's
  validator inspects it), fix content-side by adding
  `static/images/logo-mark.png` (≥ 112×112 px; PNG with
  transparent background; matches `docs/brand/logo-brief.md`
  placeholder constraints until the real logo lands) and
  pointing `[params.assets]` at it:
  ```toml
  [params.assets]
    favicon = "/images/logo-mark.png"
  ```
  This is a **content-side adjustment only — do NOT alter the
  Schema partial structure**. The partial already routes the
  logo through `site.Params.assets.favicon | default "favicon.ico" | absURL`,
  so swapping the file at the `favicon` param key flows
  through to `Organization.logo` automatically and also
  upgrades the browser-tab favicon to a real mark. The size-
  specific `favicon-16x16.png` / `favicon-32x32.png` /
  `apple-touch-icon` params have their own `[params.assets]`
  keys and are not affected; modern browsers downscale the
  112×112 base in `<link rel="icon">` without visible loss.
  Record the file's existence and the param change in
  `docs/05-SEO-CONVENTIONS.md` (a short "Assets" section is
  the natural home). Like the `BlogPosting.image` contingency
  above, this is the minimum fix to clear a validator warning
  — it does **not** stand in for the real branded logo, which
  is downstream of `docs/brand/logo-brief.md`.

**Decision at WP-008 lock:** on home + about + posts-index, the
project partial emits its own JSON-LD blocks (additive to
PaperMod's `Organization` and `BreadcrumbList`); on individual
posts, the project partial emits nothing.

#### Step 2.4 — Partial body

`layouts/_partials/seo/schema.html`:

```go-html-template
{{- /* Legendary Arena — project-side Schema.org JSON-LD.
       Loaded from layouts/_partials/extend_head.html, gated by the
       same production check PaperMod uses for its OG / Twitter /
       Schema partials in themes/PaperMod/layouts/_partials/head.html
       lines 189-194.

       Page-kind matrix:

       Page                     | This partial emits          | PaperMod emits (unchanged)
       -------------------------|-----------------------------|----------------------------
       / (home)                 | Organization, WebSite       | (suppressed — see note below)
       /about/                  | AboutPage                   | BreadcrumbList
       /posts/                  | Blog                        | BreadcrumbList
       /posts/<slug>/           | (nothing)                   | BreadcrumbList, BlogPosting

       Suppression of PaperMod's home-page Organization: PaperMod's
       head.html unconditionally loads templates/schema_json.html
       on production, which emits Organization on .IsHome. To avoid
       emitting two Organization entities on the home page (a Rich
       Results de-duplication tax), this WP introduces a project-
       side templates/schema_json.html OVERRIDE (Hugo lookup order
       resolves layouts/_partials/templates/schema_json.html ahead
       of themes/PaperMod/...). The override re-exports the
       upstream partial verbatim EXCEPT for the IsHome branch,
       which is replaced by a no-op so this project-side partial
       owns the home-page Schema emission. See Step 2.5 for the
       override file.

       References:
       - docs/03-ROADMAP.md § WP-008 — Deliverables
       - Google docs: WebSite, Organization, AboutPage, Blog
*/ -}}

{{- if .IsHome }}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "{{ site.Params.schema.publisherType | default "Organization" }}",
  "name": {{ site.Title }},
  "url": {{ site.Home.Permalink }},
  "description": {{ site.Params.description | plainify | truncate 180 | safeHTML }},
  "logo": {{ site.Params.assets.favicon | default "favicon.ico" | absURL }},
  "sameAs": [
    {{- with site.Params.schema.sameAs }}
      {{- range $i, $e := . }}{{ if $i }}, {{ end }}{{ trim $e " " }}{{- end }}
    {{- end }}
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": {{ site.Title }},
  "url": {{ site.Home.Permalink }},
  "description": {{ site.Params.description | plainify | truncate 180 | safeHTML }},
  "inLanguage": {{ site.Language.Lang | default "en-us" }}
  {{- /* SearchAction intentionally omitted at WP-008 lock. Pagefind
         is client-only; no URL-addressable search endpoint exists.
         See docs/05-SEO-CONVENTIONS.md "WebSite + SearchAction
         decision" and WP-008 § Step 2.2 for the full rationale. */ -}}
}
</script>
{{- end -}}

{{- if eq .RelPermalink "/about/" }}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": {{ .Title }},
  "url": {{ .Permalink }},
  "description": {{ with .Description | plainify }}{{ . }}{{ else }}{{ .Summary | plainify }}{{ end }},
  "inLanguage": {{ site.Language.Lang | default "en-us" }},
  "isPartOf": {
    "@type": "WebSite",
    "name": {{ site.Title }},
    "url": {{ site.Home.Permalink }}
  }
}
</script>
{{- end -}}

{{- if eq .RelPermalink "/posts/" }}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "{{ .Title }} — {{ site.Title }}",
  "url": {{ .Permalink }},
  "description": {{ with .Description | plainify }}{{ . }}{{ else }}{{ printf "Devblog, dev journals, release notes from %s." site.Title }}{{ end }},
  "inLanguage": {{ site.Language.Lang | default "en-us" }},
  "isPartOf": {
    "@type": "WebSite",
    "name": {{ site.Title }},
    "url": {{ site.Home.Permalink }}
  }
}
</script>
{{- end -}}
```

Hard rules on the partial body:

- **All values route through site / page properties, not
  hardcoded strings** — `site.Title`, `site.Home.Permalink`,
  `site.Params.description`, `site.Params.schema.*`,
  `site.Language.Lang`, `.Title`, `.Permalink`, `.Description`,
  `.Summary`, `.RelPermalink`. The only hardcoded literal in the
  emitted JSON is the structural keyword set (`@context`, `@type`,
  property names) — which is the Schema.org contract, not project
  content.
- **`.RelPermalink` equality (not section / type tests) gates the
  per-page branches** because Hugo's `.Section` returns `""` for
  `/about/` (it's a single section page, not a leaf) and the
  posts index has `.Section == "posts"` but so do individual
  posts. Using `.RelPermalink == "/about/"` and `.RelPermalink ==
  "/posts/"` matches exactly the two index pages WP-008 cares
  about and excludes individual posts (which match neither
  string). **This equality test is intentionally strict. DO NOT
  replace with `.IsSection`, `.Section`, or `.Type` checks in a
  future "cleanup" pass.** Those collapse `/posts/` and
  `/posts/<slug>/` into the same branch and would cause Schema
  leakage on post pages — the project partial would start
  emitting `Blog` and `BreadcrumbList` on every individual post
  alongside PaperMod's `BlogPosting`, which is an explicit
  WP-008 Failure Condition (see § Failure conditions:
  "individual-post pages emit any `Blog` … block").
- **No raw URLs in the body.** Permalinks resolve through Hugo's
  `.Permalink` / `site.Home.Permalink`, which honor `baseURL`.
- **`plainify | truncate 180`** on description strings matches
  PaperMod's existing posture — keeps the emitted Schema in the
  documented Google-friendly length envelope.
- **`safeHTML`** on description preserves any HTML entities Hugo
  emits during plainification (matches PaperMod's existing
  posture).

#### Step 2.5 — PaperMod home-page `Organization` suppression

The Step 2.4 home-page branch emits `Organization` + `WebSite`.
PaperMod's `templates/schema_json.html` (loaded unconditionally
from `head.html`) also emits `Organization` on `.IsHome`. Without
intervention, the home page ships two `Organization` JSON-LD
blocks.

Hugo's lookup order resolves
`layouts/_partials/templates/schema_json.html` ahead of
`themes/PaperMod/layouts/_partials/templates/schema_json.html`.
Create the project-side override:

```bash
# Copy upstream verbatim as the starting point
cp themes/PaperMod/layouts/_partials/templates/schema_json.html \
   layouts/_partials/templates/schema_json.html
```

**Override maintenance contract (LOCK requirement — survivability
clause):**

This file is now a **tracking fork** of PaperMod's upstream
`schema_json.html`. The file lives in this repo, but its
non-`.IsHome` branches are *expected to stay byte-identical* to
whatever the pinned theme submodule ships. That makes any future
`themes/PaperMod` submodule bump a quiet contract event for this
WP's output.

Any future PaperMod submodule update (whether driven by a
dedicated theme-bump WP or a side-effect of an unrelated WP that
pulls the submodule pointer forward) MUST re-run the Step 2.5
mechanical diff to confirm that:

- The upstream `.IsHome` branch is still structurally
  equivalent to what this override suppresses (i.e., the
  override is still suppressing the right thing — upstream
  didn't move home-page Schema out of `.IsHome` into a
  different branch).
- No new required-for-Rich-Results properties were added to
  the upstream `.IsPage` / `.IsSection` branches that this
  override would now mask. (The diff check after Step 2.5
  guards against the override silently dropping a new
  upstream property; it must be re-run on every theme bump,
  not just at WP-008 lock.)
- The marker string `{{- else if (or .IsPage .IsSection) }}`
  is still present in the upstream file. If upstream changes
  the marker (e.g., switches to `{{- else }}` or splits the
  branch), the Step 2.5 mechanical diff will silently fail to
  find a comparison anchor — re-thread the diff against the
  new upstream shape before locking the theme bump.

Failure to re-validate on submodule updates is a potential
**silent SEO regression vector**: the override would continue to
suppress the upstream `.IsHome` branch (intended), but might
also be hiding upstream improvements to the `.IsPage` /
`.IsSection` branches (unintended). The WP-008 Decisions log
entry MUST name this maintenance contract explicitly so a future
theme-bump executor finds it without reading this WP body cold.

Then edit the project copy. Find the `{{ if .IsHome }}` branch
(lines 1-22 of the upstream file) and replace its body with a
single comment + no-op:

```go-html-template
{{ if .IsHome }}
{{- /* Home-page Organization emission suppressed here so the
       project-side layouts/_partials/seo/schema.html can own the
       full Organization + WebSite shape on .IsHome without
       duplicate-Organization de-dup tax in Google Rich Results.
       See WP-008 § Step 2.5 for the rationale. */ -}}
{{- else if (or .IsPage .IsSection) }}
{{/* … rest of file unchanged … */}}
```

Everything from `else if (or .IsPage .IsSection)` onward (lines
23-128 in the upstream file) stays byte-identical. The result:
PaperMod's `BreadcrumbList` and `BlogPosting` emissions on posts
and sections are preserved unchanged; only the home-page
`Organization` branch is suppressed.

Mechanical verification at the end of Step 2:

```powershell
# Diff against upstream to confirm only the .IsHome branch changed
$upstream  = Get-Content -Raw themes\PaperMod\layouts\_partials\templates\schema_json.html
$project   = Get-Content -Raw layouts\_partials\templates\schema_json.html
# Strip both .IsHome blocks down to the {{ if .IsHome }}…{{ else if … }} edge
# and compare the post / breadcrumb / blogposting trailing sections.
# Conceptually: everything from "{{- else if (or .IsPage .IsSection) }}" forward
# must match byte-for-byte.
$marker = '{{- else if (or .IsPage .IsSection) }}'
$upTail   = $upstream.Substring($upstream.IndexOf($marker))
$projTail = $project.Substring($project.IndexOf($marker))
if ($upTail -ne $projTail) {
  throw "schema_json.html override diverges from upstream past the .IsHome branch — review before lock."
}
```

Any divergence past the `.IsHome` branch is a WP-008 failure — it
means a Step 2 edit landed outside scope.

### Step 3 — Wire partial into head + verify locally

`layouts/_partials/extend_head.html` already exists (locked under
WP-005 + WP-011). Append a fourth `§` block at the end of the
file, after the closing `</script>` of the Pagefind lazy-load
block:

```go-html-template
{{- /* §4. Schema.org JSON-LD (WP-008)
       Loaded only in production builds, matching PaperMod's posture
       for its OG / Twitter / Schema partials in
       themes/PaperMod/layouts/_partials/head.html lines 189-194.
       The project-side override at
       layouts/_partials/templates/schema_json.html suppresses
       PaperMod's home-page Organization emission so this partial
       can own the full Organization + WebSite shape. See
       docs/ai/work-packets/WP-008-seo-baseline.md § Step 2 for
       the page-kind matrix and decisions.
*/ -}}
{{- if hugo.IsProduction | or (eq site.Params.env "production") }}
{{- partial "seo/schema.html" . -}}
{{- end -}}
```

Local verification:

```powershell
hugo --minify
# Verify home emits Organization + WebSite from the project partial:
Select-String -Path public\index.html -Pattern '"@type":\s*"Organization"' -SimpleMatch
Select-String -Path public\index.html -Pattern '"@type":\s*"WebSite"' -SimpleMatch
# Verify there is EXACTLY ONE Organization on home (de-dup check):
(Select-String -Path public\index.html -Pattern '"@type":\s*"Organization"' -AllMatches).Matches.Count
# Expected: 1

# Verify /about/ emits AboutPage + BreadcrumbList (PaperMod's):
Select-String -Path public\about\index.html -Pattern '"@type":\s*"AboutPage"'
Select-String -Path public\about\index.html -Pattern '"@type":\s*"BreadcrumbList"'

# Verify /posts/ emits Blog + BreadcrumbList:
Select-String -Path public\posts\index.html -Pattern '"@type":\s*"Blog"'
Select-String -Path public\posts\index.html -Pattern '"@type":\s*"BreadcrumbList"'

# Verify individual post emits BreadcrumbList + BlogPosting (PaperMod's, unchanged):
Select-String -Path public\posts\2026-05-07-launch-announcement\index.html -Pattern '"@type":\s*"BreadcrumbList"'
Select-String -Path public\posts\2026-05-07-launch-announcement\index.html -Pattern '"@type":\s*"BlogPosting"'
# And verify the project partial is SILENT on individual posts (no AboutPage / Blog / WebSite leak):
Select-String -Path public\posts\2026-05-07-launch-announcement\index.html -Pattern '"@type":\s*"(AboutPage|Blog|WebSite)"'
# Expected: zero matches
```

If any check fails, fix the partial source and rebuild. Do not
proceed past Step 3 until every check passes.

### Step 4 — Front-matter discipline gate

Mechanical front-matter sweep:

```powershell
# Every committed content file must have a non-empty description.
Get-ChildItem -Recurse -Path content -Filter *.md | ForEach-Object {
  $body = Get-Content -Raw $_.FullName
  $hasDesc = $body -match '(?m)^description:\s*\S'
  $descLine = if ($hasDesc) { ($body -split "`n" | Where-Object { $_ -match '^description:' })[0] } else { '(missing)' }
  [pscustomobject]@{
    File = $_.FullName.Replace((Get-Location).Path + '\','')
    HasDescription = $hasDesc
    Description = $descLine
  }
} | Format-Table -AutoSize

# Description ≤ 160 char rule.
Get-ChildItem -Recurse -Path content -Filter *.md | ForEach-Object {
  $body = Get-Content -Raw $_.FullName
  if ($body -match '(?m)^description:\s*"([^"]+)"') {
    $desc = $matches[1]
    if ($desc.Length -gt 160) {
      Write-Warning "[$($_.Name)] description = $($desc.Length) chars (exceeds 160)"
    }
  }
}
```

Expected at WP-008 draft time: every committed page has a
`description`; every description is ≤ 160 chars. If a regression
surfaces, fix in front-matter, not in the partial.

Additionally, tighten the archetype at `archetypes/posts.md`:

- Confirm the archetype includes `description: ""` (empty-string
  placeholder) in its front-matter template so `hugo new posts/...`
  forces the author to fill it. If it doesn't, add the line and
  commit.
- Add a comment in the archetype pointing future authors at
  `docs/05-SEO-CONVENTIONS.md` (created in Step 7) for the rule.

### Step 5 — `robots.txt` + `sitemap.xml` verification

`hugo.toml` `enableRobotsTXT = true` is set; Hugo emits both
files on every build. Verify after build:

```powershell
# robots.txt — clean User-agent: *, no Content-Signal: directive
Get-Content public\robots.txt
# Expected output:
#   User-agent: *

# sitemap.xml — lists at least home, about, posts section, launch post
Select-String -Path public\sitemap.xml -Pattern '<loc>'
# Expected: at least 4 <loc> entries:
#   https://www.legendary-arena.com/
#   https://www.legendary-arena.com/about/
#   https://www.legendary-arena.com/posts/
#   https://www.legendary-arena.com/posts/2026-05-07-launch-announcement/
```

After CF Pages auto-redeploys the merge, repeat the checks
against the live URL:

```powershell
curl -s https://www.legendary-arena.com/robots.txt
# Must equal: User-agent: *
# (No Content-Signal: directive. If present, CF zone "AI Crawl Control / Managed robots.txt"
#  has regressed to ON — fix the zone setting; do NOT add a workaround partial.)

curl -s https://www.legendary-arena.com/sitemap.xml | Select-String '<loc>'
# Must list the same URLs as the local build, all rooted at
# https://www.legendary-arena.com/ (NOT localhost, NOT *.pages.dev).
```

### Step 6 — External validators (live URL)

After the production deploy goes live, run the four external
validators in order. **Each validator runs against the live URL,
not localhost, not `*.pages.dev`.** Validators cache aggressively;
if you see stale data, request a recrawl (FB Debugger has a
"Scrape Again" button; Rich Results re-runs on submit; Twitter
re-fetches on submit).

#### Step 6.1 — Google Rich Results Test

For each of the four representative URLs, paste into
<https://search.google.com/test/rich-results> and verify the
"Detected items" panel:

- `https://www.legendary-arena.com/` → `Organization` ✅,
  `WebSite` ✅. Zero errors. Warnings on `Organization.sameAs`
  being empty are expected and acceptable at v1 (decision
  recorded in Step 2.1 + `docs/05-SEO-CONVENTIONS.md`).
- `https://www.legendary-arena.com/about/` → `AboutPage` ✅,
  `BreadcrumbList` ✅. Zero errors.
- `https://www.legendary-arena.com/posts/` → `Blog` ✅,
  `BreadcrumbList` ✅. Zero errors.
- `https://www.legendary-arena.com/posts/2026-05-07-launch-announcement/`
  → `BlogPosting` ✅, `BreadcrumbList` ✅. Zero errors. If a
  warning surfaces on `BlogPosting.image` being absent, see
  Step 2.3 contingency — add `static/images/og-default.png` +
  a `cover.image` front-matter line on the launch post, rebuild,
  re-deploy, re-validate. If the contingency fires, record the
  added file + the decision in `docs/05-SEO-CONVENTIONS.md`.

#### Step 6.2 — Facebook Sharing Debugger

<https://developers.facebook.com/tools/debug/>. For each of:

- `https://www.legendary-arena.com/`
- `https://www.legendary-arena.com/posts/2026-05-07-launch-announcement/`

Click "Scrape Again" until the preview reflects the current
build, then verify:

- `og:title` matches `<title>`
- `og:description` matches the page's meta description
- `og:url` matches the input URL (canonical)
- `og:type` = `website` on home, `article` on the post
- No "warnings" panel red entries

#### Step 6.3 — Twitter Card Validator

<https://cards-dev.twitter.com/validator>. For the same two
URLs as Step 6.2:

- Preview shows correct title + description
- Card type resolves (`summary` is acceptable in v1 without a
  cover image; `summary_large_image` requires a cover image — if
  Step 2.3 contingency fires, this auto-upgrades)

#### Step 6.4 — Google Search Console — sitemap submission

<https://search.google.com/search-console>.

1. Add the property `www.legendary-arena.com` if not already added
   (use the URL-prefix property type so it scopes exactly to
   `https://www.legendary-arena.com/`).
2. Verify ownership via the **DNS TXT** method (Cloudflare DNS
   makes this a one-step add on the `legendary-arena.com` zone).
   Record the verification method + the TXT record value in the
   Decisions log entry (per Step 9) so a future operator can
   inspect or rotate it.
3. Submit the sitemap at the path `sitemap.xml` (i.e., relative —
   Search Console resolves it against the property's base URL).
4. Confirm Search Console reports "Success" on the sitemap
   submission within ~24 hours. (The submission is the action;
   reading "Success" is asynchronous and may take a day to
   appear. Lock can proceed once the submission is **made**;
   record the timestamp.)

### Step 7 — Author `docs/05-SEO-CONVENTIONS.md`

Create the new doc at the repo root. It is a peer to
`docs/04-CONTENT-CONVENTIONS.md` and follows the same authority
header pattern. Required sections:

1. **Authority + status** — same header shape as
   `04-CONTENT-CONVENTIONS.md` lines 1-9. Subordinate to
   `01-VISION.md` and `docs/brand/strategy.md`.
2. **Front-matter requirements** — restates the
   `04-CONTENT-CONVENTIONS.md` `description` rule (1-2 sentences,
   ≤ 160 chars) and points back to that doc for the canonical
   front-matter schema; this doc is the SEO lens, not a second
   canonical schema.
3. **Site-level meta description** — documents the
   `hugo.toml` `[params].description` rewrite from Step 1.4 and
   the brand-failure-mode rationale, so a future author rewriting
   the home description knows to update both in lockstep.
4. **Schema.org partial — `layouts/_partials/seo/schema.html`** —
   page-kind matrix (verbatim from Step 2.4's leading comment),
   the PaperMod override decision (Step 2.5), and the two named
   decisions: `WebSite` without `SearchAction` (Step 2.2),
   `BlogPosting` augment-not-replace (Step 2.3 with the
   contingency).
5. **OG + Twitter Card sources** — points at the PaperMod
   partials and notes that no project-side override is in place,
   so a change to those surfaces means adding a project-side
   override or filing a separate WP.
6. **`robots.txt` + `sitemap.xml`** — both Hugo-auto; calls out
   the CF zone "AI Crawl Control / Managed robots.txt: OFF"
   setting as load-bearing (cross-reference the WP-006 lock
   notes).
7. **External validators** — lists the four validator URLs and
   what each gates (Step 6 verbatim).
8. **Search Console** — records the property name, verification
   method (DNS TXT), and submitted sitemap path. Notes that
   re-verification is required if the TXT record is removed.
9. **Image alt-text rule** — copies the `04-CONTENT-CONVENTIONS.md`
   alt-text rule by reference (same authority). Notes that alt
   text is the only SEO-relevant content-side discipline this
   doc enforces beyond `description`.
10. **What this doc does NOT do** — explicit out-of-scope list:
    keyword analysis, link suggestions, 404 monitoring, SEO
    scoring dashboards, redirect-rule management. Matches the
    roadmap `Out of scope` list verbatim so the boundaries don't
    drift.

Aim: ~150-250 lines of prose, in the same voice and tone as
`04-CONTENT-CONVENTIONS.md`. Re-uses that doc's `// why:` comment
convention and section-marker style.

### Step 8 — Verify the live site

After the merge to `main` triggers CF Pages auto-redeploy, run
the verification suite against the live URL. The methodology is
identical to WP-006 Step 8.

1. **Build log review** — most recent production deploy log
   shows `npm ci` + `npm run build` only. Build duration in line
   with prior locks. No warnings beyond the two harmless
   PaperMod-internal deprecation lines noted at WP-001 lock.
2. **Functional check** — home, about, launch post all render
   correctly; CTAs still visible above the fold per WP-004's
   four-combo test; nav links still functional per WP-010 active-
   state check.
3. **Schema in the live HTML** — repeat Step 3's `Select-String`
   checks against `Invoke-WebRequest` bodies of the four
   representative URLs. The four production HTML bodies must
   contain the JSON-LD blocks the local build had.
4. **`robots.txt` clean** — Step 5 verification against the live
   URL.
5. **`sitemap.xml` complete** — Step 5 verification against the
   live URL.
6. **External validators clean** — Step 6.1 + 6.2 + 6.3 all pass
   on the live URL.
7. **Search Console sitemap submitted** — Step 6.4 done; the
   submission timestamp is captured for the Decisions log entry.
8. **Lighthouse** — re-run on home + launch post against the
   live URL, identical command shape to WP-006 Step 8.5:

   ```powershell
   npx lighthouse@12 https://www.legendary-arena.com/ `
     --output=json --output-path=lighthouse-home-wp008.json `
     --chrome-flags="--headless --no-sandbox --disable-gpu" `
     --only-categories=performance,accessibility,best-practices,seo `
     --quiet

   npx lighthouse@12 https://www.legendary-arena.com/posts/2026-05-07-launch-announcement/ `
     --output=json --output-path=lighthouse-post-wp008.json `
     --chrome-flags="--headless --no-sandbox --disable-gpu" `
     --only-categories=performance,accessibility,best-practices,seo `
     --quiet
   ```

   - SEO ≥ 95 on home (WP-008 tightened gate per roadmap Exit
     criteria); Performance / Accessibility / Best Practices /
     SEO all ≥ 90 on home and on the launch post.
   - Raw JSONs are local-only — do not commit (consistent with
     WP-005 / WP-006 / WP-010 / WP-011 convention).
9. **Console clean** — DevTools on home + post + after running
   a search. Zero errors, zero failed network requests, zero
   uncaught exceptions. Adding the JSON-LD blocks should not
   introduce a console error (the blocks are parsed silently by
   browsers regardless of validity); a regression here means a
   template syntax error landed in the partial.
10. **Submodule clean** — `git submodule status` shows
    `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926 themes/PaperMod
    (heads/master)` with no `+` flag. WP-008 must not touch the
    theme.
11. **Reproducibility — production-build sanity** — one final
    `npm ci && npm run build` locally; `Compare-Object` over
    SHA-256 hashes of `public/` against a fresh second run.
    Empty diff confirms WP-005's reproducibility contract still
    holds after WP-008's template + content additions.

### Step 9 — Lock WP-008

When all DoD + exit criteria pass:

1. Update `docs/03-ROADMAP.md`:
   - WP-008: ⏸️ Pending → ✅ Done (YYYY-MM-DD)
   - Tick all DoD + exit criteria checkboxes
   - Record final commit hash(es) under `**Commits:**`
   - Record the four Lighthouse scores (Performance /
     Accessibility / Best Practices / SEO) for home + launch post
     measured against the live URL, matching the WP-006 / WP-010 /
     WP-011 format
2. Add a Decisions log entry to `docs/01-VISION.md` recording:
   - **Site description rewrite at `hugo.toml` `[params].description`** —
     the old value (verbatim — for the audit trail) and the new
     value (verbatim), plus the `strategy.md §10` "External IP
     dependency" failure-mode rationale.
   - **Schema partial decisions** — page-kind matrix; `WebSite`
     without `SearchAction`; `BlogPosting` augment-not-replace;
     whether the Step 2.3 contingency fired (and if so, the
     content-side fix landed).
   - **PaperMod override** — note the project-side
     `layouts/_partials/templates/schema_json.html` override and
     that it diverges from upstream ONLY in the `.IsHome` branch
     (mechanical check from Step 2.5 result).
   - **Search Console verification** — property name, ownership
     verification method (DNS TXT — record the exact TXT key /
     value so a future operator can recover it without
     re-verifying), sitemap submission timestamp.
   - **Lighthouse on the live URL** — both pages' four-category
     scores, in line with the WP-006 / WP-010 / WP-011 entries.
   - **CF zone state confirmed unchanged** — explicitly note that
     "AI Crawl Control / Managed robots.txt: OFF" and "Browser
     Cache TTL: Respect Existing Headers" both still match the
     WP-006 lock-time state. If a future operator regresses
     either, the live-URL `robots.txt` clean-emit check
     (Step 8.4) is the trip-wire.
3. Update `docs/04-CONTENT-CONVENTIONS.md`:
   - Bump the "Status" line and "Last updated" date.
   - Update the description field row in the Front-matter table:
     remove the "(prep for WP-008)" note since WP-008 is now
     enforcing the rule, and link the row to
     `docs/05-SEO-CONVENTIONS.md`.
   - Add a one-line entry under the existing "Production deploy"
     section pointing at `docs/05-SEO-CONVENTIONS.md` for the
     SEO surface so a future author finds it.
4. Commit at logical milestones throughout the session, then
   push to `origin/main`. CF Pages auto-redeploys.

## Constraints

- **Production-only Schema emission.** The new partial is gated
  by the same `hugo.IsProduction | or (eq site.Params.env
  "production")` check PaperMod uses; dev-mode renders MUST NOT
  ship JSON-LD blocks. This keeps `hugo server` clean for
  authoring and matches PaperMod's posture.
- **Lookup-order overrides only.** The PaperMod `schema_json.html`
  override lives at `layouts/_partials/templates/schema_json.html`
  and works via Hugo's lookup order. NO modification of
  `themes/PaperMod/**` source. `git submodule status` must show
  the theme clean (no `+`) at lock.
- **No new dependencies.** WP-008 is template + content + docs
  work. `package.json`, `package-lock.json`, the `build` script,
  `hugo.toml` `baseURL`, `canonifyURLs`, and `enableRobotsTXT`
  values MUST NOT change. WP-005 + WP-006 lock state is preserved.
- **No `static/_headers` / `static/_redirects` edits.** WP-006
  lock state. Touching `static/_headers` re-opens the CF zone-
  state audit per WP-006 Failure conditions.
- **No template work outside the WP-008 allowlist.** The only
  template files this WP creates or modifies are:
  - `layouts/_partials/seo/schema.html` (new file)
  - `layouts/_partials/templates/schema_json.html` (new file; an
    override of the PaperMod upstream file; diverges only in the
    `.IsHome` branch)
  - `layouts/_partials/extend_head.html` (additive — new §4 block;
    existing §1–§3 blocks byte-identical pre/post)
  Touching any other template (`header.html`, `footer.html`,
  `baseof.html`, `index.html`) is out of scope.
- **No raw URLs in templates or Schema bodies.** All URL values
  resolve through `site.Home.Permalink` / `.Permalink` /
  `site.Params.assets.favicon | absURL`. This keeps the site
  portable if `baseURL` ever changes (it won't — WP-006 lock state
  — but the discipline is cheap and correct).
- **No external-IP language in any Schema description.** The
  Step 1.4 rewrite of `[params].description` propagates through
  every Schema description emission; new strings added to the
  Schema partial MUST NOT name "Marvel", "Legendary: A Marvel
  Deck Building Game", or any other external IP.
- **No analytics, no tracking pixels, no Cloudflare Web
  Analytics opt-in.** Out of scope. WP-008 is SEO baseline, not
  analytics — the two are commonly conflated and the conflation
  is the failure mode this constraint guards against. Analytics
  is explicitly deferred per `03-ROADMAP.md` "Beyond the current
  WPs" section.
- **No real branded social-share image (`og:image` cover).** A
  proper branded cover lives downstream of the logo work
  (`docs/brand/logo-brief.md`). The Step 2.3 contingency at most
  adds a placeholder `static/images/og-default.png` if Rich
  Results warns on `BlogPosting.image`; that placeholder is NOT
  the v1 branded social share — it is the minimum file needed to
  clear the validator warning.
- **Reproducibility holds.** Two consecutive `npm run build`
  runs produce byte-identical `public/` per `Compare-Object`
  over SHA-256 hashes. The new partial's output is deterministic
  (all values route through Hugo properties that resolve
  identically across runs).

## Definition of Done

- [ ] `layouts/_partials/seo/schema.html` created with the
  page-kind matrix from Step 2.4
- [ ] `layouts/_partials/templates/schema_json.html` override
  committed; `.IsHome` branch suppressed; everything from
  `{{- else if (or .IsPage .IsSection) }}` forward byte-identical
  to upstream (mechanical check from Step 2.5)
- [ ] `layouts/_partials/extend_head.html` §4 block added,
  loading `seo/schema.html` under the production-only gate
- [ ] `hugo.toml` `[params].description` rewritten to the
  brand-clean copy from Step 1.4
- [ ] `hugo.toml` `[params.schema]` block added with
  `publisherType = "Organization"` and `sameAs = []`
- [ ] All committed content files have a non-empty `description`
  front-matter ≤ 160 chars (mechanical sweep from Step 4)
- [ ] `archetypes/posts.md` includes `description: ""` placeholder
- [ ] Home HTML contains exactly one `"@type":"Organization"`
  block and one `"@type":"WebSite"` block; about HTML contains
  `AboutPage` + `BreadcrumbList`; posts-index HTML contains
  `Blog` + `BreadcrumbList`; individual post HTML contains
  `BreadcrumbList` + `BlogPosting` and contains zero
  `AboutPage` / `Blog` / `WebSite` blocks (Step 3 mechanical
  checks)
- [ ] **No-duplicate JSON-LD invariant** — no page emits more
  than one JSON-LD block of the same `@type`, except for the
  explicitly-intended combinations recorded in the Step 2.4
  page-kind matrix (`BreadcrumbList` + `BlogPosting` on
  individual posts; `Organization` + `WebSite` on home as two
  different `@type` values, not duplicates of either). Verify
  mechanically by counting each `@type` occurrence per
  rendered HTML file and confirming the count matches the
  page-kind matrix exactly.
- [ ] `https://www.legendary-arena.com/robots.txt` returns
  `200` with `User-agent: *` and no `Content-Signal:` directive
- [ ] `https://www.legendary-arena.com/sitemap.xml` returns
  `200` and lists home, about, posts section, and launch post
- [ ] Google Rich Results Test reports zero errors on home,
  about, posts index, and launch post (warnings on
  `Organization.sameAs` empty + `BlogPosting.image` absent
  are acceptable in v1; if `BlogPosting.image` is added under
  the Step 2.3 contingency, the warning becomes a clean pass)
- [ ] Facebook Sharing Debugger reports clean preview for home
  and launch post (no red warnings)
- [ ] Twitter Card Validator resolves a card preview for home
  and launch post
- [ ] `www.legendary-arena.com` property added to Google Search
  Console; ownership verified via DNS TXT; sitemap submitted
- [ ] `docs/05-SEO-CONVENTIONS.md` committed with the sections
  enumerated in Step 7
- [ ] `docs/04-CONTENT-CONVENTIONS.md` updated (Status / Last
  updated / front-matter table notes / "Production deploy"
  section pointer to `05-SEO-CONVENTIONS.md`)
- [ ] Lighthouse against the live URL: home SEO ≥ 95;
  Performance / Accessibility / Best Practices / SEO all ≥ 90
  on home + launch post
- [ ] DevTools Console clean on home + post + after running a
  search on the live site (zero errors)
- [ ] Mechanical reproducibility: two consecutive `npm run build`
  produce byte-identical `public/` per `Compare-Object` over
  SHA-256 hashes (empty diff)
- [ ] Submodule clean
  (`c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`, no `+`)
- [ ] WP-008 marked ✅ Done in `03-ROADMAP.md` with commits +
  Lighthouse scores + Search Console verification method recorded
- [ ] Decisions log entry in `01-VISION.md` capturing the items
  enumerated in Step 9.2
- [ ] All commits pushed to `origin/main`

## Exit criteria

- [ ] All four external validators (Rich Results, FB Debugger,
  Twitter Validator, Search Console) report no errors on tested
  pages on the live URL
- [ ] Lighthouse SEO ≥ 95 on the home page (above the absolute
  ≥ 90 baseline)
- [ ] No console errors introduced by SEO templates on any
  page
- [ ] Schema partial degrades gracefully when front-matter
  fields are missing (verified by an `omit-description` local
  build test: temporarily remove the `description` from a copy
  of `content/_index.md` in a scratch branch, build, confirm no
  template error and that the partial falls back to
  `site.Params.description`; do NOT commit the scratch state)
- [ ] WP-009 (class-color usage audit) and any future SEO
  enhancement WPs can read this WP's lock state and know:
  which Schema entities ship on which page kind, where the
  override boundary is, what was deferred (and why), and how
  to validate against the same four external tools

## Failure conditions

WP-008 must NOT be locked if any of the following are true:

- The home page emits more than one `"@type":"Organization"`
  JSON-LD block (PaperMod override didn't take effect)
- Any page emits duplicate JSON-LD blocks of the same `@type`,
  except for the explicitly-intended combinations recorded in
  the Step 2.4 page-kind matrix (`BreadcrumbList` + `BlogPosting`
  on individual posts; `Organization` + `WebSite` on home as
  two different `@type` values, not duplicates of either).
  Multiple JSON-LD blocks of the same `@type` on the same page
  is technically valid Schema.org but raises audit noise and
  risks conflicting property values — making it a Failure
  Condition elevates the implicit "don't ship duplicates" rule
  to an explicit invariant a reviewer can hold the diff against.
- The individual-post pages emit any `"@type":"AboutPage"`,
  `"@type":"Blog"`, or `"@type":"WebSite"` block (project
  partial's per-page gating leaked — most likely cause is a
  future refactor swapping `.RelPermalink == "/posts/"` for
  `.IsSection` or `.Section == "posts"`, both of which match
  individual posts; see § Step 2.4 hard rules)
- Any Schema description string names "Marvel" or any other
  external IP (brand failure mode regression)
- `hugo.toml` `[params].description` still contains the original
  Marvel reference at lock time (the Step 1.4 rewrite didn't land)
- Google Rich Results Test reports any **error** (warnings on
  `Organization.sameAs` empty and `BlogPosting.image` absent
  before the Step 2.3 contingency are acceptable; errors are not)
- Facebook Sharing Debugger or Twitter Card Validator reports
  a red error (not a warning) on home or launch post
- Lighthouse SEO drops below 95 on home, OR below 90 on home or
  post in any of the four categories on the live URL
- A console error appears on the live site that wasn't present
  in WP-011's lock state
- `themes/PaperMod/` modified (`git submodule status` shows `+`
  flag)
- `package.json` / `package-lock.json` / `hugo.toml`
  `baseURL` / `canonifyURLs` / `enableRobotsTXT` / the `build`
  script modified by this WP
- `static/_headers` or `static/_redirects` modified by this WP
- `static/brand-tokens.css` modified by this WP (WP-002 lock
  state — any token change is a v1 → v2 bump WP, not WP-008's
  scope)
- The project-side `templates/schema_json.html` override
  diverges from PaperMod upstream past the `.IsHome` branch
  (mechanical check from Step 2.5 returned non-empty)
- Reproducibility check fails (two consecutive `npm run build`
  produce non-byte-identical `public/`)
- The CF zone "AI Crawl Control / Managed robots.txt" setting
  has regressed to ON (live-URL `robots.txt` shows
  `Content-Signal:` directive) and was not restored before lock

A failure condition firing means WP-008 regresses to ⏸️ Pending
until the issue is resolved.

## Rollback

- **Repo:** revert offending commits on `main`, push; CF Pages
  auto-redeploys to the prior known-good state. The new partial
  + override + `extend_head.html` §4 block are all additive (or,
  in the case of the override, behavior-equivalent to upstream
  when the upstream is restored); reverting cleanly returns the
  site to WP-011 lock state.
- **`hugo.toml` description rewrite:** if the new description
  string surfaces an unexpected downstream issue (highly
  unlikely — it's a static string), revert just that hunk. The
  rest of the WP-008 surface is independent.
- **Search Console:** if Search Console verification needs to be
  rotated (TXT record compromise, account migration, etc.),
  remove the TXT record at the registrar / CF DNS panel and
  re-verify with a fresh value. Sitemap stays submitted across
  re-verifications; no need to re-submit unless the property is
  fully deleted.
- **External validators:** validators do not require explicit
  rollback. If a regression surfaces on a future deploy, the
  same four tools serve as the post-fix re-verification path.
- **Brand-tokens contract / CF zone state / CF Pages config:**
  WP-008 does not touch any of these. No rollback needed.

If everything goes catastrophically wrong (Rich Results
permanently rejecting valid markup, Search Console refusing
verification for hours, etc.), the fallback is to lock WP-008
with PaperMod's defaults intact (no project partial, no
override, no `hugo.toml` Schema params) and the
brand-failure-mode description fix still applied — that single
hunk is independent of the Schema work and unblocks the brand
audit even if the Schema work is deferred. Recording such a
fallback would be its own Decisions log entry citing the
specific blocker.

## What's NOT in scope

- **Keyword analysis / scoring** — RankMath proprietary; manual
  content review serves the same purpose. Out of scope.
- **Internal link suggestions** — RankMath proprietary. Out of
  scope.
- **404 monitoring** — post-launch; covered by Cloudflare Pages
  analytics if/when those are wired up (separate future WP).
  Out of scope.
- **Visual SEO scoring dashboard** — overkill for a small
  marketing site. Out of scope.
- **`SearchAction` on `WebSite`** — requires URL-addressable
  search; Pagefind is client-only in WP-005's lock state. A
  future "Pagefind URL-addressable search" WP could revisit this.
- **Real branded `og:image` / Twitter `summary_large_image` cover** —
  blocked on logo design (`docs/brand/logo-brief.md`); the
  Step 2.3 contingency only adds a placeholder if the validator
  warns on missing image.
- **CF Pages analytics, Plausible, Google Analytics, etc.** —
  analytics is explicitly deferred per `03-ROADMAP.md` "Beyond
  the current WPs" section. Decide post-launch.
- **Class-color usage audit (WP-009)** — separate WP; runs after
  WP-007a + WP-007b + WP-010 (all done as of 2026-05-11). WP-009
  reads, not writes, WP-008's templates.
- **`font-display` strategy revisit / self-hosted fonts** —
  closed under WP-011 for v1; any future revisit is its own WP.
- **Brand token v2 changes** — would require a `CHANGELOG.md`
  entry + coordinated consumer updates per `01-VISION.md` Global
  invariants. WP-008 does not bump the version.
- **Migration of registry from `cards.barefootbetters.com` to
  `cards.legendary-arena.com`** — deferred per `01-VISION.md`
  Decisions log 2026-05-07 and 2026-05-11. Separate scoped WP
  when scheduled.
- **Engine-repo or `play.*` / `cards.*` Schema work** — out of
  scope. WP-008 is the marketing-site Schema baseline. Each
  consumer site is independently responsible for its own SEO
  markup; the brand-tokens contract is the only shared surface.

## Authority

Subordinate to `docs/01-VISION.md` (highest), then
`03-ROADMAP.md`, then this file. If anything here conflicts with
vision or roadmap, those win — surface the conflict before
proceeding.

`docs/01-VISION.md` Global invariants are bright lines: same
commit → same output (mechanical reproducibility), brand tokens
are an API contract (untouched here), no retroactive breakage of
completed WPs (every prior lock must remain intact).

`docs/brand/strategy.md` is the canonical authority for voice,
tone, terminology, and the CTA contract. WP-008 touches site-
wide meta description copy (Step 1.4) and authors prose for
`docs/05-SEO-CONVENTIONS.md` (Step 7), so the brand failure
modes (`§10`) apply directly. The "External IP dependency"
failure mode is the load-bearing one — it is the explicit
reason Step 1.4 exists.

`docs/04-CONTENT-CONVENTIONS.md` documented the `description`
front-matter rule as a "prep for WP-008" item. WP-008 is the WP
that turns that documented expectation into an enforced gate
(Step 4) and shifts ownership of the SEO-specific surface to
`docs/05-SEO-CONVENTIONS.md` (Step 7) so the content-conventions
doc can stay focused on authoring ergonomics.

## Background

WP-006 locked on 2026-05-09:

- Marketing site live at `https://www.legendary-arena.com` via
  Cloudflare Pages.
- CF zone "AI Crawl Control / Managed robots.txt: OFF" — required
  for Hugo's clean `User-agent: *` `robots.txt` to survive to
  the live URL. This zone setting is load-bearing for WP-008; a
  regression there shows up as a Lighthouse SEO regression
  (100 → 92 in WP-006's first-pass diagnosis) AND as a hidden
  `Content-Signal:` directive in the live `robots.txt`. Step 1
  pre-flight and Step 8.4 live-verification both check for it.
- CF zone "Caching → Browser Cache TTL: Respect Existing Headers"
  — the WP-006 CORS contract for `/brand-tokens.css` depends on
  it; WP-008 does not touch the headers file but the contract
  must remain unchanged at lock.

WP-007a locked on 2026-05-10 (`play.legendary-arena.com`) and
WP-007b locked on 2026-05-11 (`cards.barefootbetters.com`). Both
consumer sites added their own `<meta name="description">` lines
(engine-side EC-148 and EC-155) under the same SEO failure
pattern WP-008 codifies here: PaperMod / arena-client / registry-
viewer all default to missing-description if no explicit value
is set, and Lighthouse penalizes the omission. The marketing
site already had `description` front-matter on every page (locked
under WP-004), so WP-008 inherits that as a clean starting state
— the mechanical front-matter sweep in Step 4 is a verification,
not a remediation.

WP-010 locked on 2026-05-10 (site chrome — header + footer
navigation). The PaperMod `header.html` and the new
`footer.html` override are both stable; WP-008 does not modify
either. WP-010's Step 4.6 surfaced a font-swap CLS regression
that WP-011 then closed at the source (`display=optional`); any
future WP that adds text-bearing UI in regions that affect
`<main>` positioning inherits the now-stable posture. WP-008's
new template surface lives entirely in `<head>` (JSON-LD scripts
are not rendered visually) so it does not interact with this
hazard.

WP-011 locked on 2026-05-10 (`font-display: optional`). The
Lighthouse SEO scores at WP-011 lock — home 96, about 100,
posts 100, post 99 — are the pre-baseline WP-008 must clear
and improve. The home page's 96 is the only score under the
new SEO ≥ 95 floor, and only by a margin; the new partial's
`WebSite` emission and the brand-failure-mode description fix
together should clear it on the next Lighthouse run. (If they
do not, the Step 8.8 contingency is a content-side fix — likely
adding `static/images/og-default.png` as the Step 2.3 contingency
suggests, which both clears the Rich Results `BlogPosting.image`
warning and gives OG / Twitter Cards a real image to display.)

After WP-008 locks, the only outstanding marketing-site WP in
the v1 set is **WP-009** (class-color usage audit, cross-site).
WP-008 and WP-009 are parallel — WP-008 does not write the same
surfaces WP-009 audits. The two can land in either order without
re-work.

Hugo dev (`hugo server`) and the local production-build path
(`npm run build` then `python -m http.server` from `public/`)
both remain available throughout this WP. The production-only
gate on the new partial means dev-mode renders do not ship
Schema; use `npm run build` + a local `:1314` HTTP server for
any verification that requires the partial's output.
