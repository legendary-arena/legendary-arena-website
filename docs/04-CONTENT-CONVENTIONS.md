# Content Conventions

**Status:** v1 (WP-004); Build pipeline + Search sections locked under WP-005 (2026-05-09); Production deploy section added under WP-006 (2026-05-09); description-field rule now enforced under WP-008 (2026-05-11) — see [`05-SEO-CONVENTIONS.md`](05-SEO-CONVENTIONS.md)
**Last updated:** 2026-05-11

> **Authority:** This document records the content-authoring conventions
> for `www.legendary-arena.com`. It is subordinate to `01-VISION.md`
> (top-level vision) and `docs/brand/strategy.md` (brand voice +
> terminology). Where this document is silent, those win.

This file is the on-ramp for anyone adding pages or posts to the
marketing site. Read it once before authoring; consult it when in
doubt about where things go or how front-matter should look.

---

## Build pipeline

**Install vehicle: npm (WP-005, 2026-05-08).** Node tooling is
introduced in this repo by WP-005. The local manifest is
`package.json`; the lockfile (`package-lock.json`, committed) pins
exact versions for byte-stable installs across local and CI.

Pagefind is pinned to an **exact** version (no `^`, no `~`):

```json
"devDependencies": {
  "pagefind": "1.5.2"
}
```

Why exact-pin: WP-005 establishes determinism as the load-bearing
contract for WP-006 (Cloudflare Pages). A floating range could
silently swap the build's index emitter under a future deploy and
introduce non-determinism that the mechanical reproducibility check
would flag, but only after the fact. Any Pagefind version bump is
governed by a separate WP — not a casual `npm update` — and that WP
must re-run the reproducibility check and Lighthouse ≥ 90 before
locking.

The single build command is:

```
npm ci && npm run build
```

Locally and in CI, identically. `npm run build` resolves to
`hugo --minify && npx pagefind --site public` (defined in
`package.json` `scripts.build`). The `&&` ordering and
short-circuit semantics are deliberate:

- Pagefind runs strictly after Hugo
- If Hugo fails, Pagefind does not run
- If either step fails, the script exits non-zero

`npx pagefind` (not bare `pagefind`) ensures the locally-installed
binary is used regardless of `PATH` state.

**Local dev** does NOT run Pagefind. `hugo server --port 1313 --bind
127.0.0.1` is sufficient for content authoring. Search is a
build-time artifact — visible in production builds only (i.e., after
`npm run build`).

**Reproducibility (mechanical):** two consecutive `npm run build`
runs produce byte-identical `public/` per `Compare-Object` over
SHA-256 hashes of every file. Verified at WP-005 lock; future WPs
that touch the build pipeline must re-verify.

## Production deploy

**Host: Cloudflare Pages (WP-006, 2026-05-09).** Production URL is
`https://www.legendary-arena.com`. CF Pages project name:
`legendary-arena-website`; auto-generated alias:
`legendary-arena-website.pages.dev`. Build configuration in CF Pages
matches `README.md` Prerequisites verbatim:

- Production branch: `main`
- Build command: `npm ci && npm run build`
- Build output directory: `public`
- `HUGO_VERSION` env: `0.161.1` (pinned to README's Prerequisites)
- `NODE_VERSION` env: `22` (Node major; CF resolves to `22.22.0`)
- Preview deploys: enabled for non-`main` branches and PRs

CF Pages auto-redeploys on every push to `main`. Preview deploys
land at `<branch-slug>--legendary-arena-website.pages.dev` and at a
unique-deploy URL like `<deploy-id>.legendary-arena-website.pages.dev`.

### CORS contract for `/brand-tokens.css`

`static/_headers` (Hugo copies it verbatim to `public/_headers`)
declares the cross-origin contract:

```
/brand-tokens.css
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=3600, must-revalidate
```

For these headers to actually reach clients on
`www.legendary-arena.com`, the CF zone's **Caching → Configuration
→ Browser Cache TTL** must be set to **"Respect Existing Headers"**.
CF's default zone-level Browser Cache TTL (4 hours = 14400s)
otherwise overrides origin Cache-Control. The locked posture
(1-hour TTL + `must-revalidate`, NOT `immutable`) encodes the
brand-tokens v1 single-URL contract: v1 → v2 is a coordinated
consumer swap on the SAME URL `/brand-tokens.css` (not
filename-versioned URLs like `brand-tokens.v1.css`). Full
governance trace in `01-VISION.md` Decisions log 2026-05-09
(WP-006 lock).

### Apex-redirect mechanism

`legendary-arena.com` (apex) is bound to the same CF Pages project
as `www.legendary-arena.com`, and 301-redirects to www via a
**zone-level Cloudflare Redirect Rule** (CF dashboard → the
`legendary-arena.com` zone → Rules → Redirect Rules), created
from CF's "Redirect from root to WWW" template:

- Wildcard source: `https://legendary-arena.com/*`
- Dynamic target: `https://www.legendary-arena.com/${1}`
- Status: 301 Permanent; preserve query string: ON

NOTE: An earlier in-repo `static/_redirects` mechanism specified
by WP-006 Step 6's original locked decision was discovered to be
unsupported by Cloudflare Pages — CF's `_redirects` engine accepts
path-only sources, not full-URL source patterns. The mechanism was
amended at WP-006 lock to the zone Redirect Rule above. See
`01-VISION.md` Decisions log 2026-05-09 (WP-006 lock) for the full
discovery + amendment trace.

### CF zone settings recorded for reproducibility

These two `legendary-arena.com` zone-level settings are
load-bearing for the contracts above; if a future operator resets
them to CF defaults, the contracts silently regress. They are
NOT in the repo (they live in the CF dashboard). They are
recorded here and in `01-VISION.md` Decisions log so an audit
reading the repo can verify expected zone state.

- **Caching → Configuration → Browser Cache TTL:** "Respect
  Existing Headers" (required for `/brand-tokens.css`
  Cache-Control to fire as locked)
- **AI Crawl Control / Managed `robots.txt`:** OFF (keeps Hugo's
  clean `User-agent: *` `robots.txt`; CF's injected
  `Content-Signal:` directive is not yet recognized by
  Lighthouse v12 and causes a cosmetic SEO regression)

### Authoring deploys

Pushing a commit to `main` deploys to production on its own. Open
a PR for any change you'd like a preview URL for; the
Cloudflare GitHub-app comment on the PR will carry the preview
URL within ~30 seconds of the push.

### SEO surface

The marketing site's SEO discipline (Schema.org JSON-LD partial,
external validator gates, `robots.txt` + `sitemap.xml` posture,
Google Search Console verification, site-level meta-description
contract) is governed by [`05-SEO-CONVENTIONS.md`](05-SEO-CONVENTIONS.md)
(WP-008, 2026-05-11). When editing copy that changes meta
descriptions, OG / Twitter cards, or any front-matter consumed by
the Schema partial, consult that doc.

## Search

**UI: Pagefind default UI, lazy-loaded (WP-005, 2026-05-08).** The
search input and results panel are rendered by `pagefind-ui.js` +
`pagefind-ui.css`, bound to a single mount element with the
canonical id `la-search` (`<div id="la-search"></div>`). The mount
lives in the project's overridden header partial. All JS targets
this exact id; aliases (`#search`, `#site-search`, `#pf-search`,
etc.) MUST NOT be introduced.

**Lazy-load pattern (mandatory).** Pagefind's default UI bundle
(~300 KB across `pagefind-ui.js`, `pagefind.js`,
`pagefind-worker.js`, the `.wasm` shards, and the CSS) is too heavy
to load eagerly without dropping Lighthouse Performance below the
≥ 90 floor. To preserve immediate search affordance without the
weight cost:

1. The header partial renders a server-side `<input
   id="la-search-stub">` immediately, styled to look identical to
   the real Pagefind input.
2. `extend_head.html` loads `pagefind-ui.{js,css}` only on the
   first user signal of intent: focusing the stub, clicking the
   `#la-search` slot, or pressing `/` / `Ctrl+K` / `Cmd+K`.
3. After load, `PagefindUI({ element: '#la-search' })` is
   constructed. PagefindUI replaces the children of `#la-search`,
   so the stub is naturally swapped for the real input. Any text
   the user typed into the stub before the swap is forwarded to
   the real input and the real input is focused.
4. Subsequent shortcut presses just refocus the real input — no
   reload, no remount.

In dev mode (`hugo server`), `/pagefind/` does not exist; the
lazy-load script's `onerror` swallows the network failure
silently so the dev console stays clean.

Brand-token integration: stub-input border + focus ring, real
search-input border + focus ring, results panel background, and
result-link colors all route through `var(--la-*)` tokens via
overrides in `assets/css/extended/custom.css §7`. No raw hex
values.

**PaperMod's built-in Fuse.js search is disabled** by removing
`outputs.home = ["HTML", "RSS", "JSON"]` from `hugo.toml` so the
JSON index that drives Fuse no longer builds. PaperMod's
`themes/PaperMod/layouts/search.html` template remains untouched in
the submodule — it is harmless without `content/search.md` and
without the JSON index (no `/search/` page is emitted).

**Index scope:** Pagefind is constrained to indexed content only via
`data-pagefind-body` on the `<main>` element (in the project's
`baseof.html` override) and `data-pagefind-ignore` on header and
footer (in their respective overrides). Card data is out of scope —
that lives at `cards.legendary-arena.com` (registry).

Verification: searching a card name unlikely to appear in marketing
copy ("Iron Fist", "Doctor Strange") MUST return zero results. This
is a WP-005 failure condition.

## Keyboard shortcuts

**Bound by WP-005, 2026-05-08:**

| Key | Action |
|---|---|
| `/` | Focus the search input |
| `Ctrl+K` (Win/Linux) | Focus the search input |
| `Cmd+K` (macOS) | Focus the search input |

Implementation: a single inline `<script>` in
`layouts/_partials/extend_head.html`. Vanilla JS, no keybinding
library.

Discipline:

- Bail out when the user is typing in another input
  (`event.target.matches('input, textarea, [contenteditable]')`)
- `event.preventDefault()` on the focus path so `/` doesn't insert a
  literal slash if focus race-conditions with another input
- If the search input is already focused, repeat presses are a no-op
  (no remount, no toggle, no reset)

New shortcuts MUST NOT collide with the above. If a future WP needs
a different key, document it here and verify no regression in the
existing three.

## Home page markup

**Approach A — overridden `layouts/index.html` (WP-004, 2026-05-08).**

The home page renders via `layouts/index.html`, which overrides
PaperMod's default `list.html`-driven home and the
`home_info.html` partial that reads `[params.homeInfoParams]` in
`hugo.toml`. The override exists because PaperMod's home_info
partial cannot host a styled `.button` CTA above the fold, which the
brand contract requires (`docs/brand/strategy.md §2` CTA contract;
`assets/css/extended/custom.css §5.1 / §5.2` utility classes).

What lives where:

- **Hero h1, prose, CTA label, CTA href** — `content/_index.md`
  front-matter (`title`, `ctaLabel`, `ctaHref`) and body
- **Hero markup + button element** — `layouts/index.html`
- **Hero / button styling** — `assets/css/extended/custom.css §5`
  (locked under WP-003; do not re-style here)

Authors edit `content/_index.md` for copy changes. The layout file
is only touched when the page's structure (not its words) needs to
change.

The legacy `[params.homeInfoParams]` block in `hugo.toml` (the
WP-001 placeholder mechanism) was removed when this override
landed; a comment in `hugo.toml` points future readers back to
this section.

---

## Front-matter (required fields)

Every page and post must include:

| Field | Rule |
|---|---|
| `title` | Sentence-case headline; no trailing punctuation |
| `date` | ISO 8601 with timezone (e.g., `2026-05-07T10:00:00-05:00`) |
| `description` | 1–2 sentences, ≤ 160 characters; SEO + social-share preview. Enforced under WP-008 — see [`05-SEO-CONVENTIONS.md`](05-SEO-CONVENTIONS.md) for the full discipline (Schema.org partial, validator gates, site-level fallback contract). |
| `draft` | `false` for anything intended to publish |

Posts additionally use:

| Field | Rule |
|---|---|
| `tags` | Lower-case kebab-case array; reuse existing tags before inventing new ones |
| `categories` | Same shape as `tags`; broader than tags |

The home page (`content/_index.md`) additionally uses:

| Field | Rule |
|---|---|
| `ctaLabel` | ≤ 2 words, single verb (per `strategy.md §2` CTA contract); defaults to `"Play now"` |
| `ctaHref` | Absolute URL; defaults to `https://play.legendary-arena.com/` |

The archetype at `archetypes/posts.md` pre-populates these fields
for `hugo new posts/whatever.md` so new posts don't drift.

---

## Slugs

- Posts: date-prefix + kebab-case — `2026-05-07-launch-announcement.md`
  yields `/blog/2026-05-07-launch-announcement/`. The date prefix
  keeps file listings chronological and disambiguates posts that
  reuse a topic word.
- Pages: kebab-case section name (`about`, `posts`); page bodies
  live in `_index.md` for sections and `<slug>.md` for leaves.
- Never spaces, capitals, or non-ASCII in slugs.

---

## Images

- Location: `static/images/<section>/<slug>/<image>.<ext>`. The
  `static/` root is served from `/`, so a file at
  `static/images/posts/launch/hero.webp` is available at
  `/images/posts/launch/hero.webp`.
- Naming: kebab-case. Match the post or page slug as the parent
  folder so images travel with the content they belong to.
- Format: prefer **WebP** for photographs; **SVG** for logos and
  icons. JPEG only when WebP is impractical.
- Sizing: export at the largest size you'll display; do not
  upscale. `loading="lazy"` on any image not above the fold.
- Alt text: every image must have alt text describing what the
  image *says*, not what it *is* — "A row of hero cards fanned out
  on a dark wood table" beats "image". Decorative images use
  `alt=""` only when they truly contribute nothing semantic.

---

## Voice and tone

Voice is governed by `docs/brand/strategy.md §2` — direct,
confident, heroic, no irony, no hype. Read that section before
writing user-facing copy. The verb palette and CTA contract are
not aspirational guidance; they are enforceable rules.

A useful tone test before publishing: read the new content aloud
back-to-back with an existing page (home or about). If one sounds
like a different writer, rewrite.

---

## Terminology

Canonical terms are defined in `docs/brand/strategy.md §3`:
**Hero · Mastermind · Scenario · Villain group · Henchmen · Scheme
twist · Session · Mastery · Victory.** One concept = one term across
all three sites. Synonyms require a Decisions log entry in
`01-VISION.md`.

When a UI constraint forces a deviation (character count, label
clarity), document the deviation in the same place — never let it
drift silently.

---

## Brand failure modes

`docs/brand/strategy.md §10` defines the bright lines. Any of the
following in shipped output is a bug, not a stylistic preference:

- Generic adjectives leading copy ("fun", "exciting", "epic")
- Mechanics-first explanation
- Terminology drift across pages
- Visual style divergence (raw color/font/spacing values)
- CTA inconsistency (verbose, multi-clause, "click here")
- Tone violations (emoji, humor undermining stakes, conversational
  filler, questions-as-headlines)
- External IP dependency (copy requiring Marvel familiarity)
- Self-deprecation ("fan-made", "amateur", "side project") in
  user-facing surfaces

If you find one, treat it the same as a broken link or a console
error: fix before merge.

---

## Internal linking

**Status:** Added under WP-016 (2026-05-12)

### Blog ↔ newsletter cross-reference

Each weekly blog post links to the newsletter signup (via the CTA
block's `"newsletter"` variant or an inline reference). Each
newsletter links to its companion blog post using the canonical URL
(`/blog/<slug>/`). The `newsletter_slug` front-matter field ties the
two together — it must match between the blog post and the
newsletter's "Read more" link.

### Series linking

Posts in the same `series` should link to the previous and next post
in the series. Hugo's `.PrevInSection` / `.NextInSection` handles
this if posts are ordered by date. PaperMod's `ShowPostNavLinks =
true` (set in `hugo.toml`) renders prev/next navigation automatically.

### CTA consistency

The `cta` front-matter field determines the end-of-post action.
Default is `"play"`. Newsletter-heavy posts should use
`"newsletter"`. Tournament announcements use `"tournament"`. See
the CTA contract table in `archetypes/posts.md` and
`layouts/_partials/cta-block.html` for the authoritative mapping.

### External links

Links to `play.*`, `cards.*`, and `ewiki.*` open in the same tab
(they're part of the Legendary Arena ecosystem). Links to
third-party sites open in a new tab
(`target="_blank" rel="noopener"`).

---

## Image storage and referencing

**Status:** Added under WP-016 (2026-05-12)

### Canonical storage location

All blog and newsletter images MUST be stored in:

```
static/images/posts/<slug>/
```

The image directory name MUST match the post slug exactly. Mismatch
between slug and image directory is a contract violation.

Example:

```
static/images/posts/hello-arena/
  hero.webp
static/images/posts/week-01-deck-checklist/
  hero.webp
  curve-example.webp
  deck-flow-diagram.webp
```

### Naming conventions

- Lowercase, kebab-case only
- No spaces, no underscores
- Use semantic names (`hero.webp`, `curve-example.webp`,
  `deck-flow-diagram.webp`) — not `img1.webp` or `screenshot.webp`

### Allowed formats

- `.webp` — preferred (best size/quality ratio)
- `.png` — when transparency is required
- `.jpg` — acceptable for photography or stock imagery where WebP
  conversion is impractical

### Size budget

- Max 200KB per image (prevents repo bloat at 52-post scale)
- Hero images should target 80–120KB
- Diagrams and illustrations typically compress well under 50KB

### Referencing in Hugo content

Images are referenced via absolute paths from `static/`:

```markdown
![Deck curve example](/images/posts/week-01-deck-checklist/curve-example.webp)
```

### Newsletter usage

Newsletter images reuse the same production URLs:

```
https://www.legendary-arena.com/images/posts/<slug>/hero.webp
```

No separate email asset storage system. Images resolve only after
deploy — local Brevo preview requires the production URL or a
deployed preview branch.

### Determinism invariant

All images required to render blog content MUST exist in-repo.
External image hosting (R2, third-party CDN) is prohibited in
WP-016 scope.
