# Content Conventions

**Status:** v1 (WP-004)
**Last updated:** 2026-05-08

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

## Search

**UI: Pagefind default UI (WP-005, 2026-05-08).** The search input
and results panel are rendered by `pagefind-ui.js` +
`pagefind-ui.css`, bound to a single mount element with the
canonical id `la-search` (`<div id="la-search"></div>`). The mount
lives in the project's overridden header partial. All JS targets
this exact id; aliases (`#search`, `#site-search`, `#pf-search`,
etc.) MUST NOT be introduced.

Brand-token integration: search-input border, focus ring, results
panel background, and result-link colors route through `var(--la-*)`
tokens via overrides in `assets/css/extended/custom.css §7`. No raw
hex values.

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
that lives at `cards.barefootbetters.com` (registry).

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
| `description` | 1–2 sentences, ≤ 160 characters; SEO + social share preview (prep for WP-008) |
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
  yields `/posts/2026-05-07-launch-announcement/`. The date prefix
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
