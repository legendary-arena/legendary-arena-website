# WP-251 — Surface a featured story on the home page

Add a **featured-story module** to the home page that links to a blog post
flagged `featured: true` in its front matter — introduced to surface the
origin-story manuscript (`/blog/the-year-at-the-table/`) from the home page.

**Why:** requested directly. The home page had no path to the blog; the
newly published origin story ("The Year at the Table") had no entry point
from the site's front door. A founder origin story is the StoryBrand guide's
empathy/authority element, so it earns a home-page slot.

This file is the self-contained record. There is no separate ROADMAP entry
(same precedent as WP-039 / WP-040 / WP-246).

## What changed in this repo

| Path | Change |
|---|---|
| `layouts/index.html` | New `home-story` section, rendered after Featured Gear. Pulls the blog post with `featured: true` (first 1) via `site.GetPage "/blog"`, mirroring the existing Featured-Gear idiom (`where .Pages "Params.featured" true`). Renders a `.card` with the post title (linked), its description, and a `.button` to the post. |
| `content/blog/the-year-at-the-table.md` | Front matter: add `featured: true` so the post is the one surfaced. |

## Notes

- **3-pillar lock respected.** The story is its own section parallel to
  Upcoming Tournaments / Featured Gear — NOT a fourth `sections` card, which
  would break the homepage-spec "exactly 3 pillars" rule (`docs/marketing/homepage-spec.md`
  §Product / §Differentiation).
- **CTA language.** Button reads "Read the story" — specific and object-named,
  not the banned generic "Read More" / "Learn More" (`homepage-spec.md`
  §Approved CTA Language; `strategy.md` §2 CTA contract).
- **`featured: true` idiom** matches the shop's featured-products selection so
  the control surface is consistent: flip the flag on whichever post should be
  the home-page story. Empty selection renders nothing (`with $story`).
- The post body itself is content-lane; it was published under #144. This WP
  only adds the flag + the template module.

## DoD

- [ ] Home page renders a "Why the Arena Exists" section linking to
      `/blog/the-year-at-the-table/`.
- [ ] Only one story surfaces (the featured post); non-featured posts do not.
- [ ] No fourth pillar card; the three locked pillars are unchanged.
- [ ] Live on `main` via squash-merge PR; verified on the production build.
