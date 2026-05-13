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

## Funnel purpose and CTA hierarchy

*(Added by WP-020, 2026-05-13)*

Every newsletter edition and blog post serves a measurable funnel
purpose. The hierarchy ensures one clear primary action per touchpoint
while maintaining consistent secondary exposure.

Primary CTA (one per edition, from `cta` front-matter):
- Rotation per 4-week batch: 2x `"play"`, 1x `"newsletter"`,
  1x `"tournament"`
- Primary CTA drives the single most important action for that week
- Primary CTA appears in both the blog post (via `cta-block.html`)
  and the newsletter (§6)

**Primary CTA dominance requirement:**

- Primary CTA must appear as a button (not just text)
- Primary CTA must appear above the "Featured from the Shop" module
- Secondary modules must never appear above the primary CTA
- Secondary modules must not use button styling identical to the
  primary CTA (no `.button` or `.cta-block-button` class)

Secondary CTAs (always present, never dominant):
- **Shop** — exactly 1 link to `/shop/` per edition, with UTM params.
  Appears as "Featured from the Shop" module in newsletter (§8) and
  as a near-end content section in the blog post.
- **Share/Forward** — exactly 1 share prompt per newsletter (§9).
  Points to the companion blog post canonical URL.
- **Read more** — exactly 1 link to the companion blog post per
  newsletter (§5).

Secondary CTA limits (hard caps):
- 1 shop link per edition (newsletter + blog post each)
- 1 share link per newsletter
- 1 read-more link per newsletter
- Secondary modules must never exceed these counts
- Secondary CTAs must be visually subordinate to the primary CTA

Future funnel purposes (not implemented, documented for roadmap):
- Feedback/signal collection (one-question poll link)
- Community activation (submit deck, vote topic)
- Retention/reactivation (monthly recap, "missed issues" pointer)
- Membership/pass upsell (when play.legendary-arena.com introduces
  paid tiers)

These are expansion candidates for future WPs and must not be added
to the template without a governing WP.

## Blog post shop section requirements

*(Added by WP-020, 2026-05-13)*

Each blog post must include a "Featured from the Shop" section near the
end of the content (before the closing paragraph), with a single link
to the shop:

```markdown
## Gear up

Browse decks, sleeves, and accessories built for Legendary Arena.

[Visit the Shop](/shop/?utm_source=blog&utm_medium=post&utm_campaign=<newsletter_slug>&utm_content=featured-product)
```

Replace `<newsletter_slug>` with the post's `newsletter_slug` value.
This section must NOT replace or modify the CTA block rendered by
`cta-block.html` — the CTA block remains the primary conversion
element and is injected after `.post-content` by `layouts/single.html`.

**Section heading convention:** Use "Gear up" as the consistent h2
heading for the shop section across all posts. This keeps the section
recognizable and scannable without being generic ("Shop") or
salesy ("Buy now").

**CTA non-interference invariant:**

The "Gear up" section must:
- appear before the closing paragraph in the markdown content
- not be placed after the Hugo-injected CTA block (which is rendered
  after `.post-content` by `layouts/single.html`)
- not use `.button` styling class

The CTA block remains the ONLY primary conversion button on the page.

## Newsletter draft secondary modules

*(Added by WP-020, 2026-05-13)*

Each newsletter draft must contain (in addition to the existing
sections 1–6):

7. **Featured from the Shop** — a compact product spotlight with one
   link to `/shop/` using UTM parameters:
   `https://www.legendary-arena.com/shop/?utm_source=newsletter&utm_medium=email&utm_campaign=<newsletter_slug>&utm_content=featured-product`
   Replace `<newsletter_slug>` with the edition's slug.
   One product, one link, one line of copy.
8. **Share / Forward** — a one-line prompt: "Know someone who'd find
   this useful? Forward this email or share the post:
   https://www.legendary-arena.com/posts/<slug>/"
   Points to the companion blog post canonical URL.

**Draft quality bar (additions):**

- Shop link must use correct UTM parameters (source, medium, campaign,
  content). Verify `<newsletter_slug>` substitution matches the
  edition's actual slug.
- Share link must point to the companion blog post canonical URL
  (not a third-party sharing service).

## Funnel integrity check procedure

*(Added by WP-020, 2026-05-13)*

From a Brevo test email sent to a real inbox (not Brevo's preview
mode), verify each link in the conversion path:

a. **Read more** — click the "Read more" link in the email.
   Verify it resolves to the correct blog post at
   `/posts/<slug>/`. Page loads, images render, no 404.

b. **Blog → CTA** — on the blog post, scroll to the CTA block.
   Click the CTA button. Verify navigation to the target
   (`play.*` for play/tournament, newsletter form for newsletter).
   Target page loads without error.

c. **Shop link (newsletter)** — click the "Featured from the Shop"
   link in the email. Verify it resolves to `/shop/` with correct
   UTM parameters visible in the URL bar. Shop page loads, products
   render.

d. **Shop link (blog)** — on the blog post, click the "Gear up"
   shop link. Verify it resolves to `/shop/` with correct UTM
   parameters. Shop page loads.

e. **Share link** — click the share/forward blog link. Verify it
   resolves to the correct blog post canonical URL.

**Pass/fail recording format:**

Record results per edition in `docs/newsletter-drafts/qa-log.md`:

```markdown
## Week <N> — <slug>

- Date tested: YYYY-MM-DD
- Tester: <name or email>
- [ ] Read more → blog post loads
- [ ] Blog CTA → target loads
- [ ] Newsletter shop link → /shop/ loads with UTM params
- [ ] Blog shop link → /shop/ loads with UTM params
- [ ] Share link → blog post loads
- [ ] Images render in email (Gmail)
- [ ] Images render in email (Outlook or Apple Mail)
- Result: PASS / FAIL
- Notes: <any issues found>
```

All items must pass before the edition is sent to production.
Failed items are blockers — fix and re-test before send.

**QA log persistence requirement:**

- Each edition MUST have exactly one QA log entry
- Entries must not be overwritten or edited post-send
- Corrections after send must be logged as a new entry
  (append, never replace)

This provides a full audit trail of funnel validation.

## Scope lock

| File | Change |
|---|---|
| `content/posts/week-01-deck-checklist.md` | **NEW** |
| `content/posts/week-02-resource-curve.md` | **NEW** |
| `content/posts/week-03-scenario-scouting.md` | **NEW** |
| `content/posts/week-04-first-tournament.md` | **NEW** |
| `static/images/posts/week-01-deck-checklist/hero.webp` | **NEW** |
| `static/images/posts/week-02-resource-curve/hero.webp` | **NEW** |
| `static/images/posts/week-03-scenario-scouting/hero.webp` | **NEW** |
| `static/images/posts/week-04-first-tournament/hero.webp` | **NEW** |
| `docs/content-taxonomy.md` | **NEW** |
| `docs/newsletter-drafts/week-01.md` | **NEW** |
| `docs/newsletter-drafts/week-02.md` | **NEW** |
| `docs/newsletter-drafts/week-03.md` | **NEW** |
| `docs/newsletter-drafts/week-04.md` | **NEW** |
| `docs/newsletter-drafts/qa-log.md` | **NEW** — funnel integrity QA log |

## Definition of Done

- [x] 12-week taxonomy documented
- [x] Production workflow checklist documented
- [x] 4 blog posts created with full archetype fields
- [x] 4 newsletter drafts following 10-section template
- [x] Hero image placeholders in correct directories
- [x] Cross-links validated
- [x] Build succeeds, tests pass, reproducibility confirmed
- [x] Word counts in range, brand voice clean
- [x] Roadmap updated
- [ ] Each blog post includes a "Gear up" section with UTM-tagged
  shop link before the closing paragraph
- [ ] Each newsletter draft includes "Featured from the Shop" module
  with UTM-tagged shop link
- [ ] Each newsletter draft includes "Share / Forward" module with
  companion blog post URL
- [ ] UTM parameters use correct values: source (newsletter/blog),
  medium (email/post), campaign (<newsletter_slug>),
  content (featured-product)
- [ ] Funnel integrity check passed for at least one edition (QA log
  recorded in docs/newsletter-drafts/qa-log.md)

## Failure conditions

- **UTM parameter error**: Shop links missing or using incorrect UTM
  parameters → fix before completion.
- **Secondary CTA overflow**: More than one shop link or one share
  link in any newsletter edition or blog post → reduce to one each.
- **Shop section placement**: "Gear up" section appears after the
  CTA block instead of before the closing paragraph → reorder.
  The CTA block (injected by layouts/single.html after .post-content)
  must remain the final conversion element.
