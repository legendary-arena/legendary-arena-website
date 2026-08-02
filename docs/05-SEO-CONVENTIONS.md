# SEO Conventions

**Status:** v1 (WP-008, 2026-05-11)
**Last updated:** 2026-05-11

> **Authority:** This document records the SEO discipline for
> `www.legendary-arena.com`. It is subordinate to `01-VISION.md`
> (top-level vision) and `docs/brand/strategy.md` (brand voice,
> tone, terminology, and the failure modes copy must avoid). Where
> this document is silent, those win. It is a peer to
> `04-CONTENT-CONVENTIONS.md` — that doc owns the canonical
> front-matter schema and authoring ergonomics; this doc is the SEO
> lens applied on top of that schema.

The marketing site's SEO surface is intentionally small: it covers
meta tags, Open Graph, Twitter Cards, Schema.org JSON-LD, the
auto-generated `sitemap.xml` and `robots.txt`, and the discipline
that keeps each one accurate. It explicitly does **not** cover
keyword analysis, link-building, 404 monitoring, or analytics — see
"What this doc does NOT do" at the end for the full out-of-scope
list.

---

## Front-matter requirements

The canonical front-matter schema lives in
[`04-CONTENT-CONVENTIONS.md` "Front-matter (required fields)"](04-CONTENT-CONVENTIONS.md#front-matter-required-fields).
This doc does not duplicate it. The SEO-load-bearing rules from
that table are:

- **`description`** — required on every committed page; 1–2
  sentences; ≤ 160 characters. This string is the site's meta
  description, OG description, Twitter Card description, and (on
  `/about/` and `/blog/`) the AboutPage / Blog Schema description.
  When in doubt, write for a human reader; SEO follows from
  honesty, not from keyword density.
- **`title`** — required on every committed page; sentence-case
  headline, no trailing punctuation. This becomes `<title>`, OG
  `og:title`, Twitter `twitter:title`, and the Schema `name`.

The archetype at `archetypes/posts.md` pre-populates a
`description: ""` placeholder so `hugo new posts/<slug>.md` forces
the author to fill it in before publishing. Leaving the placeholder
empty at publish time is a brand-failure-mode regression (the
fallback chain in PaperMod's `head.html` cascades into the
site-level `[params].description`, which is the home-page hero
description — accurate, but not specific to a post).

---

## Site-level meta description

`hugo.toml` `[params].description` is the site-wide fallback that
PaperMod's `head.html` (lines 14-23 in the pinned theme submodule)
uses when a page has no explicit `description` front-matter. It
also cascades into `templates/opengraph.html` and
`templates/twitter_cards.html` description emissions.

**Locked at WP-008** (2026-05-11):

```toml
[params]
  description = "Legendary Arena is a skill-first, web-based deck-building system. Assemble your heroes, face the scenario, and earn your standing."
```

This string is **byte-identical** to `content/_index.md`'s
`description` front-matter (locked under WP-004). The duplication
is intentional: site-level fallback and home-page explicit value
resolve to the same string, so there is no divergence to maintain.

**If a future copy WP rewrites the home-page hero description**,
update `hugo.toml` `[params].description` in the same commit. The
two values are a contract pair — keep them in lockstep or the
site-level fallback will quietly diverge from the home page's
explicit value and PaperMod will display the older copy on any
future page that omits its own description.

**Why this matters as a brand surface, not just an SEO surface.**
The prior value at WP-006 lock named "Marvel" directly and framed
the product as an "adaptation" of an external IP. That is the
`docs/brand/strategy.md §10` "External IP dependency" failure
mode in literal form. WP-008 rewrote it as part of its scope
because the string is functioning as site-wide SEO metadata —
WP-008 owns site-wide SEO metadata — and locking WP-008 against
SEO surfaces containing a documented brand failure mode would be
internally inconsistent. The rewrite is recorded verbatim (old +
new) in `01-VISION.md` Decisions log 2026-05-11 (WP-008 lock).

---

## Schema.org partial — `layouts/_partials/seo/schema.html`

The project-side Schema partial is loaded from
`layouts/_partials/extend_head.html` §4 under a production-only
gate (`hugo.IsProduction | or (eq site.Params.env "production")`).
Dev-mode renders (`hugo server`) do not ship JSON-LD; only
production builds (`npm run build`) emit it.

### Page-kind matrix

| Page | This partial emits | PaperMod (`templates/schema_json.html`) emits |
|---|---|---|
| `/` (home) | `Organization`, `WebSite` | *(suppressed — see "PaperMod override" below)* |
| `/about/` | `AboutPage` | `BreadcrumbList` |
| `/blog/` | `Blog` | `BreadcrumbList` |
| `/blog/<slug>/` | *(nothing)* | `BreadcrumbList`, `BlogPosting` |

No page emits more than one JSON-LD block of the same top-level
`@type`. The two-entity combinations on home (`Organization` +
`WebSite`) and on individual posts (`BreadcrumbList` +
`BlogPosting`) are intentional — two different types, not
duplicates of either.

### Per-page gating uses `.RelPermalink` equality

The partial branches on `.RelPermalink == "/about/"` and
`.RelPermalink == "/blog/"` — **not** on `.IsSection`,
`.Section`, or `.Type`. This is intentional:

- `.Section` returns `"blog"` for both `/blog/` AND
  `/blog/<slug>/`, so a `.Section == "blog"` check would
  emit `Blog` on every individual post page (Schema leakage).
- `.IsSection` is true for `/blog/` but the same trap exists for
  any future section that adds slug pages.
- `.RelPermalink` equality is strict — it matches exactly the two
  index pages WP-008 cares about and excludes individual posts.

**Do not "clean up" these to section-style checks.** Doing so is
an explicit WP-008 Failure Condition; it would cause the project
partial to start emitting `Blog` and `BreadcrumbList` on every
individual post alongside PaperMod's `BlogPosting`, and the
home-page logic would similarly collapse.

### WebSite — no SearchAction at v1

Google's `WebSite` + `SearchAction` shape lets Google attach a
Sitelinks Search Box to the search result. `SearchAction` requires
a URL-addressable search endpoint (`target` =
`https://example.com/?q={search_term_string}` or similar).
Pagefind is **client-only**: search is bound to the `#la-search`
mount and the lazy-loaded `pagefind-ui.js` bundle; there is no
server-side `?q=` route, and no static fallback page that renders
a query into results.

**Decision at WP-008 lock:** emit `WebSite` **without**
`SearchAction`. A fake `SearchAction` URL Google couldn't actually
crawl would 404 on verification and likely suppress the entire
`WebSite` entity. Pagefind plus a URL-addressable `/search/?q=...`
page is a real feature (Pagefind supports `pagefind.search()`
programmatically), but it's out of scope for WP-008 and would
change the surface WP-005 locked. Defer to a future "Pagefind
URL-addressable search" WP if Sitelinks Search Box becomes
valuable.

### BlogPosting — augment, don't replace

PaperMod's `templates/schema_json.html` already emits a
substantial `BlogPosting` shape on individual posts with
`headline`, `description`, `keywords`, `articleBody`, `wordCount`,
`inLanguage`, `datePublished`, `dateModified`, `author`,
`mainEntityOfPage`, and `publisher`.

**Decision at WP-008 lock:** the project partial is **silent on
post pages**. PaperMod's `BlogPosting` is correct in shape; the
common gap (`image`) is content-side, not template-side.

**Contingencies (post-lock).** If the Google Rich Results Test
surfaces a *warning* on `BlogPosting.image` for a post:

1. Add `static/images/og-default.png` (recommend 1200×630, PNG).
2. Add `cover.image: "/images/og-default.png"` to the post's
   front-matter. The PaperMod template picks this up via its
   `.Params.cover.image` branch.
3. Rebuild, push, re-validate.

Document any cover image added under this contingency below in the
"Assets" section, with the original brief reason and the rendered
URL.

If Rich Results surfaces a warning on `Organization.logo` (Google
requires ≥ 112×112 px for `Organization.logo`; favicon-16/-32 won't
clear that floor):

1. Add `static/images/logo-mark.png` (≥ 112×112, PNG, transparent
   background). This is a placeholder; the real branded mark is
   downstream of `docs/brand/logo-brief.md`.
2. Set `[params.assets].favicon = "/images/logo-mark.png"` in
   `hugo.toml`. The schema partial reads `site.Params.assets.favicon`,
   so the change flows through to `Organization.logo` automatically.
   The size-specific `favicon-16x16.png` / `favicon-32x32.png` /
   `apple-touch-icon` params have their own keys and are unaffected.

### PaperMod `schema_json.html` override — tracking fork

`layouts/_partials/templates/schema_json.html` is a project-side
override that Hugo resolves ahead of
`themes/PaperMod/layouts/_partials/templates/schema_json.html`.
The override diverges from upstream **only** in the `.IsHome`
branch — that branch is replaced with a no-op comment so the
project's `seo/schema.html` can own the full `Organization` +
`WebSite` shape on the home page without duplicate-`Organization`
de-dup tax in Google Rich Results.

**Everything past the `else-if-(or-.IsPage-.IsSection)` marker is
expected to stay byte-identical to whatever the pinned theme
submodule ships.** This makes the override a *tracking fork*.

#### Override maintenance contract

Any future `themes/PaperMod` submodule update — whether driven by
a dedicated theme-bump WP or a side-effect of an unrelated WP
that pulls the submodule pointer forward — **MUST re-run the
mechanical drift check** before locking:

```pwsh
$marker = '{{- else if (or .IsPage .IsSection) }}'
$upstream = Get-Content -Raw themes\PaperMod\layouts\_partials\templates\schema_json.html
$project  = Get-Content -Raw layouts\_partials\templates\schema_json.html
$upTail   = $upstream.Substring($upstream.IndexOf($marker))
$projTail = $project.Substring($project.IndexOf($marker))
if ($upTail -ne $projTail) {
  throw "schema_json.html override diverges from upstream past the .IsHome branch — review before lock."
}
"PaperMod override post-.IsHome tail is byte-identical to upstream."
```

The drift check verifies two things at once:

1. The upstream `.IsHome` branch is still the entity this override
   suppresses (i.e., upstream didn't move home-page Schema out
   of `.IsHome` into a different branch).
2. No new required-for-Rich-Results properties were added to the
   upstream `.IsPage` / `.IsSection` branches that this override
   would now mask. The check guards against silently dropping a
   new upstream property.

If the marker string itself changes upstream (e.g., the branch
gets renamed or split), the check fails to find a comparison
anchor and throws. Re-thread the diff against the new upstream
shape before locking the theme bump.

The maintenance contract is recorded verbatim in `01-VISION.md`
Decisions log 2026-05-11 (WP-008 lock) so a future theme-bump
executor finds it without reading WP-008's body cold.

---

## OG and Twitter Card sources

OG and Twitter Cards are emitted by PaperMod's stock partials,
loaded from `themes/PaperMod/layouts/_partials/head.html` lines
189-194 under the same production gate as Schema:

- `themes/PaperMod/layouts/_partials/templates/opengraph.html`
- `themes/PaperMod/layouts/_partials/templates/twitter_cards.html`

**No project-side override is in place for either.** The stock
partials read from `site.Params.description`, `.Description`,
`.Title`, `.Summary`, and (when present) `.Params.cover.image`,
which are the same fields this site already populates correctly.

A future WP that needs to alter OG or Twitter Card emission — for
example, to add a default `og:image` once a branded social-share
image exists — should land a project-side override at
`layouts/_partials/templates/opengraph.html` and/or
`twitter_cards.html` (Hugo lookup order resolves these ahead of
the theme), following the same tracking-fork pattern documented
for `schema_json.html` above. Touching the theme submodule is not
acceptable.

---

## `robots.txt` and `sitemap.xml`

Both files are **auto-generated by Hugo on every build** because
`hugo.toml` sets `enableRobotsTXT = true` and Hugo's default
output formats include `sitemap`.

The emitted `robots.txt` is:

```
User-agent: *
Disallow:
Sitemap: https://www.legendary-arena.com/sitemap.xml
```

`User-agent: *` + empty `Disallow:` means "all bots, no
restrictions"; the `Sitemap:` line is the standard discovery hint
some SEO tools require.

**Two Cloudflare zone-level settings on the `legendary-arena.com`
zone are load-bearing for these files to survive to the live URL
unchanged.** They are recorded here AND in `01-VISION.md`
Decisions log 2026-05-09 (WP-006 lock) AND in
`04-CONTENT-CONVENTIONS.md "Production deploy → CF zone settings
recorded for reproducibility"`:

- **AI Crawl Control / Managed `robots.txt`: OFF.** If CF's
  managed `robots.txt` is re-enabled, it injects a
  `Content-Signal:` directive Lighthouse v12 does not yet
  recognize (cosmetic SEO regression 100 → 92 during WP-006
  first-pass diagnosis) and silently shadows Hugo's clean
  `User-agent: *` `robots.txt`. **Trip-wire:** the live
  `https://www.legendary-arena.com/robots.txt` body must NOT
  contain a `Content-Signal:` directive. If it does, fix the
  CF zone setting — do NOT add a workaround partial in this
  repo.
- **Caching → Configuration → Browser Cache TTL: "Respect
  Existing Headers".** Not directly SEO-load-bearing, but it
  belongs to the same CF-zone audit surface as item 1 (the
  state lives in the dashboard, not in the repo) and is the
  setting that lets `_headers` Cache-Control values survive
  to clients.

---

## External validators

Run these four validators against the **live URL** (not
localhost, not `*.pages.dev`) after every deploy that affects
SEO surface. They cache aggressively; click "Scrape Again" or
re-submit to bust caches.

| Tool | Gates | URL |
|---|---|---|
| Google Rich Results Test | Schema.org JSON-LD shape + required properties | <https://search.google.com/test/rich-results> |
| Facebook Sharing Debugger | `og:*` tags resolve, preview image / title / description | <https://developers.facebook.com/tools/debug/> |
| Twitter Card Validator | `twitter:*` tags resolve, card type valid | <https://cards-dev.twitter.com/validator> |
| Google Search Console | Sitemap discoverability + index coverage | <https://search.google.com/search-console> |

**Acceptable warnings at v1** (do not block lock):

- Rich Results: `Organization.sameAs` empty (decision in
  `hugo.toml` `[params.schema].sameAs = []`; documented above
  under "Schema.org partial").
- Rich Results: `BlogPosting.image` absent on individual posts
  (the contingency under "BlogPosting — augment, don't replace"
  above is the fix path if the warning escalates to a blocker).

**Anything else is an error**, including any red entry on FB
Debugger or Twitter Validator. Errors block lock until fixed.

---

## Search Console

- **Property:** `www.legendary-arena.com` (URL-prefix type — scopes
  exactly to `https://www.legendary-arena.com/`)
- **Ownership verification method:** **DNS TXT** on the
  `legendary-arena.com` Cloudflare zone. The exact TXT record key
  + value is recorded verbatim in `01-VISION.md` Decisions log
  2026-05-11 (WP-008 lock) so a future operator can audit, rotate,
  or re-verify without re-issuing.
- **Sitemap submission path:** `sitemap.xml` (relative — Search
  Console resolves it against the property's base URL).

**Re-verification rules.** If the TXT record is removed from the
zone, Search Console drops verification within ~24 hours and the
property goes "Unverified." Sitemap submissions persist across
re-verifications; the property does not need re-creation.
Re-issue verification by adding the TXT record back (Search
Console retains the expected value) — no fresh sitemap
submission needed unless the property is fully deleted.

---

## Image alt-text

The alt-text rule is owned by
[`04-CONTENT-CONVENTIONS.md "Images"`](04-CONTENT-CONVENTIONS.md#images)
— this doc does not restate it. The SEO-relevant points:

- Every image must carry alt text that describes what the image
  **says**, not what it **is**. "A row of hero cards fanned out on
  a dark wood table" beats "image".
- Decorative images use `alt=""` only when they truly contribute
  nothing semantic; this is rare on a marketing site.
- Alt text is the single content-side SEO discipline beyond
  `description` that this doc enforces. Lighthouse's Accessibility
  audit catches missing alt text; Rich Results does not.

---

## Assets

No new assets at WP-008 lock. The Step 2.3 contingency files
(`static/images/og-default.png`, `static/images/logo-mark.png`)
were not triggered — Rich Results passed without `BlogPosting.image`
or `Organization.logo` warnings. Future asset additions under
either contingency must update this section in the same commit
they land.

---

## What this doc does NOT do

Explicit out-of-scope list — matches the WP-008 / `03-ROADMAP.md`
"Out of scope" enumeration verbatim so the boundaries don't drift:

- **Keyword analysis / scoring** — RankMath proprietary; manual
  content review serves the same purpose.
- **Internal link suggestions** — RankMath proprietary.
- **404 monitoring** — post-launch; covered by Cloudflare Pages
  analytics if/when those are wired up (separate future WP).
- **Visual SEO scoring dashboard** — overkill for this site.
- **`SearchAction` on `WebSite`** — requires URL-addressable
  search; Pagefind is client-only.
- **Real branded `og:image` / Twitter `summary_large_image` cover** —
  blocked on logo design (`docs/brand/logo-brief.md`).
- **CF Pages analytics / Plausible / Google Analytics** — deferred
  per `03-ROADMAP.md` "Beyond the current WPs".
- **Engine-repo or `play.*` / `cards.*` Schema** — each consumer
  site is independently responsible for its own SEO markup; the
  brand-tokens contract is the only shared surface.

If a future need crosses one of these lines, it is its own scoped
WP — not an inline patch on this doc.
