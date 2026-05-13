# WP-017 — Content pipeline + weeks 1–4

Ship the first four weeks of the newsletter + blog content pipeline
and document the full 12-week taxonomy. This WP proves the pipeline
works end-to-end: taxonomy → blog post → newsletter draft →
cross-links → funnel validation.

This file is the **session-ready execution pack**. The design source of
truth is [`docs/03-ROADMAP.md`](../../03-ROADMAP.md). If this file and
the roadmap conflict, the roadmap wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme as a Git submodule. Brand
tokens consumed by `play.*` and `cards.*` via cross-origin link.
Deployed to Cloudflare Pages.

## Required reading (in order)

1. `docs/01-VISION.md` — vision, global invariants, decisions log
2. `docs/03-ROADMAP.md` — full WP list; WP-017 depends on WP-016
3. `docs/ai/work-packets/WP-017-content-pipeline.md` — this file
4. `docs/04-CONTENT-CONVENTIONS.md` — content layout, build pipeline,
   front-matter rules, internal linking conventions, image storage
5. `docs/brand/strategy.md` §2 — voice/tone governs all blog copy
6. `docs/newsletter-template.md` — email template structural spec
7. `archetypes/posts.md` — blog post archetype
8. `layouts/_partials/cta-block.html` — CTA block partial

## Scope

Content-only WP. No layouts, no CSS, no JS, no config changes. All
infrastructure locked under WP-016.

### Deliverables

1. **Taxonomy** — 12-week topic framework (`docs/content-taxonomy.md`)
2. **Blog content** — 4 weekly posts under `content/posts/`
3. **Newsletter drafts** — 4 markdown drafts under
   `docs/newsletter-drafts/`
4. **Images** — hero image placeholders in
   `static/images/posts/<slug>/`

### Allowed file targets

```
content/posts/week-01-deck-checklist.md
content/posts/week-02-resource-curve.md
content/posts/week-03-scenario-scouting.md
content/posts/week-04-first-tournament.md
static/images/posts/week-01-deck-checklist/hero.webp
static/images/posts/week-02-resource-curve/hero.webp
static/images/posts/week-03-scenario-scouting/hero.webp
static/images/posts/week-04-first-tournament/hero.webp
docs/content-taxonomy.md
docs/newsletter-drafts/week-01.md
docs/newsletter-drafts/week-02.md
docs/newsletter-drafts/week-03.md
docs/newsletter-drafts/week-04.md
docs/03-ROADMAP.md
docs/01-VISION.md
```

### Forbidden

Any change to `hugo.toml`, `layouts/**`, `archetypes/**`, `assets/**`,
`functions/**`, `package.json`, `themes/**`, or locked content files.

## Content contracts

- **Word count:** 400–800 words per post
- **Brand voice:** direct, confident, heroic; no emoji, no exclamation
  marks, no hedging verbs
- **CTA rotation:** 2x play, 1x newsletter, 1x tournament per batch
- **Cross-link directionality:** back-reference + forward hook per post
- **Slug uniqueness:** all `newsletter_slug` values globally unique
- **Publish order:** newsletter never sent before blog post is live
- **Newsletter adaptation:** summarize (not copy), include original
  content, stay consistent
- **Image pipeline:** directory name matches slug, hero.webp ≤ 200KB

## Definition of Done

- [x] 12-week taxonomy documented
- [x] Production workflow checklist documented
- [x] 4 blog posts created with full archetype fields
- [x] 4 newsletter drafts following 7-section template
- [x] Hero image placeholders in correct directories
- [x] Cross-links validated
- [x] Build succeeds, tests pass, reproducibility confirmed
- [x] Word counts in range, brand voice clean
- [x] Roadmap updated
