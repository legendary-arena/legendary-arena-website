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
