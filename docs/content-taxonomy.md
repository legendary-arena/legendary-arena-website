# Content Taxonomy — 12-Week Newsletter + Blog Pipeline

**Status:** v1 (WP-017, 2026-05-13)
**Last updated:** 2026-05-13

> **Authority:** This document defines the topic framework, slug
> registry, and production workflow for the Legendary Arena weekly
> content pipeline. It is subordinate to `01-VISION.md` and
> `docs/brand/strategy.md` (voice/tone). Slugs listed here are stable
> identifiers — locked once committed.

---

## Taxonomy rules

- Slugs are stable identifiers. Once committed, they do not change.
- Working titles may be refined, but slugs must remain fixed.
- All `newsletter_slug` values are globally unique across weeks 1–52.
- CTA rotation per batch: 2x `"play"`, 1x `"newsletter"`, 1x `"tournament"`.
- Each batch follows a player-progression arc: Fundamentals → Mid-Game
  Strategy → Advanced Play.

---

## Batch 1: Fundamentals (Weeks 1–4)

Target audience: new players building their first decks and entering
their first tournament.

| Week | Slug | Title | Series | CTA |
|---|---|---|---|---|
| 1 | `week-01-deck-checklist` | Your First Deck: A Checklist | Fundamentals | `"play"` |
| 2 | `week-02-resource-curve` | Reading the Resource Curve | Fundamentals | `"play"` |
| 3 | `week-03-scenario-scouting` | Scenario Scouting: Know Before You Build | Fundamentals | `"newsletter"` |
| 4 | `week-04-first-tournament` | Your First Tournament | Fundamentals | `"tournament"` |

---

## Batch 2: Mid-Game Strategy (Weeks 5–8)

Target audience: players who understand the basics and want to sharpen
their in-game decision-making.

| Week | Slug | Title | Series | CTA |
|---|---|---|---|---|
| 5 | `week-05-card-synergy` | Card Synergy Fundamentals | Mid-Game Strategy | `"play"` |
| 6 | `week-06-pivot-points` | Recognizing Pivot Points | Mid-Game Strategy | `"play"` |
| 7 | `week-07-tempo-management` | Tempo and Turn Economy | Mid-Game Strategy | `"newsletter"` |
| 8 | `week-08-mid-tournament` | Mid-Tournament Adjustments | Mid-Game Strategy | `"tournament"` |

---

## Batch 3: Advanced Play (Weeks 9–12)

Target audience: experienced players pushing toward mastery and
competitive standing.

| Week | Slug | Title | Series | CTA |
|---|---|---|---|---|
| 9 | `week-09-meta-reading` | Reading the Meta | Advanced Play | `"play"` |
| 10 | `week-10-matchup-theory` | Matchup Theory | Advanced Play | `"play"` |
| 11 | `week-11-deck-iteration` | Iterating Your Deck | Advanced Play | `"newsletter"` |
| 12 | `week-12-mastery-path` | The Mastery Path | Advanced Play | `"tournament"` |

---

## Production workflow

Seven-step per-week checklist. Every weekly content release follows
this sequence exactly.

### 1. Generate

Run `hugo new posts/<slug>.md`. Fill all front-matter fields from the
archetype: `title`, `date`, `description`, `draft`, `tags`,
`categories`, `series`, `cta`, `newsletter_week`, `newsletter_slug`.

### 2. Images

Create `static/images/blog/<slug>/` with at minimum `hero.webp`.
Directory name must match the post slug exactly. All images ≤ 200KB,
`.webp` preferred.

### 3. Review

Run `hugo server`. Verify: CTA block renders the correct variant,
series navigation links appear, content renders in both light and dark
mode.

### 4. Cross-link

Verify `newsletter_slug` in the post front-matter matches the
newsletter draft's "Read more" URL. Confirm series links render
(back-references to prior weeks, forward hook to next week).

### 5. Newsletter draft

Create the Brevo edition draft per the template spec
(`docs/brevo/newsletter-template.md`). All seven sections required: Header,
Hook, Tip/Strategy, Challenge, Read more, CTA, Footer. Use production
URLs only.

### 6. Pre-send QA

Execute the full checklist from `docs/brevo/newsletter-template.md` §Pre-send
QA checklist: test send, link validation, image validation, rendering
check (desktop + mobile), personalization check, funnel validation
(email → blog → CTA → play.*), deliverability, subject line alignment.

### 7. Publish

Deploy blog post before sending newsletter. The publish order invariant
is non-negotiable: no newsletter may reference a blog post that is not
yet live on production.

---

## Content determinism requirement

Each weekly post follows the same structural skeleton:

1. Intro paragraph
2. Core content sections (ordered)
3. Internal links (back-reference to prior weeks + forward hook)
4. Closing paragraph with forward hook to next week

No post may omit a section or introduce new structural sections without
updating this contract.

## Publish order invariant

The newsletter for week N must never be sent before the corresponding
blog post for week N is live on production. Drafts are created in
advance; sends are sequenced after deploy.

## Recommended cadence

One blog post + one newsletter per week. Batches of four weeks align
with the series arcs (Fundamentals, Mid-Game Strategy, Advanced Play).
