# WP-254 — Homepage hero passes the grunt test; Featured Gear waits for C2

Make the home page's first screen say what Legendary Arena is, lift the one
primary action in front of everything else, and stop showing SVG stand-ins
as products.

**Why:** requested directly (Jeff, 2026-11-14, from a review of the live
home page against five landing-page patterns). The live page failed two of
this repo's own rules:

- The hero fails the grunt test in `docs/marketing/homepage-spec.md`
  § Hero Section Specification: "The arena awaits." plus "Assemble your
  heroes. Read the scenario. Earn your standing." never states the category
  or how to start. `homepage-review-template.md` records the same gap
  ("tells a cold visitor nothing").
- "Featured Gear" showed three SVG placeholder cards ("400 × 300
  placeholder"). That is the brand-asset kill-list's "placeholder imagery
  presented as product" (`docs/marketing/brand-asset-generation.md`) and
  fails video-commerce gate C2, "Real imagery"
  (`docs/marketing/video-commerce-plan.md`). Their `alt` text was also
  wrong: every product image read "The arena awaits." because the template
  used `$.Title` (the home page) inside the product loop.

This file is the self-contained record. There is no separate ROADMAP entry
(same precedent as WP-251 / WP-253).

## What changed in this repo

| Path | Change |
|---|---|
| `content/_index.md` | Hero prose becomes the category and benefit line: "A deck-building card game where skill decides every match. Runs in your browser. No advantage you can buy." `ctaLabel` becomes "Play free" (in the spec's approved CTA bank and within the strategy.md §2 CTA contract: two words, one verb). The H1 "The arena awaits." stays, as the fantasy lead `strategy.md` §2 calls for. |
| `layouts/index.html` | Hero copy and CTA move into a `.hero-panel`; with a hero image it gets `.hero-panel--lifted`. Featured Gear lists only `featured: true` products whose `image` is set and is not an `.svg`; with none, the section is omitted. Product `alt` uses the product's own title. |
| `assets/css/extended/custom.css` | `.hero-panel--lifted` overlaps the banner's bottom edge as a raised panel (tokens only: `--la-space-*`, `--la-radius-lg`, `--la-shadow-strong`, `--la-color-bg-primary`). The hero CTA is larger and carries `--la-shadow-strong`; its color stays on `--la-color-cta`. Phone width overlaps less. |

## Notes

- **Copy reconciles two docs.** `homepage-spec.md` wants a category and
  benefit headline; `strategy.md` §2 wants the hero to lead with the
  fantasy ("The arena awaits"). Keeping the H1 and making the line under it
  carry the category, benefit, and stakes satisfies both. Jeff approves the
  final copy on the PR (`brand-asset-generation.md` § Humans keep final copy).
- **"Play free" is true today.** play.legendary-arena.com lets a visitor
  enter as a guest ("You'll play as a guest. Sign in to save your results."),
  checked 2026-11-14.
- **Gear comes back by itself.** Once a shop item's `image` points at a
  photograph of the shipped unit (C2), it surfaces again with no template
  change. The three SKUs and `/shop/` are untouched.
- **No secondary CTA.** The spec's secondary is "Watch Gameplay", and no
  gameplay video exists yet. Add it when one does.
- **No motion added.** The overlap is static layout, so it adds no CLS;
  WP-044 / WP-046 performance budgets are unaffected.

## DoD

- [ ] Home page hero shows the H1, the category/benefit line, and a
      "Play free" button that links to `https://play.legendary-arena.com/`.
- [ ] On a wide screen the copy panel overlaps the banner's bottom edge; at
      phone width it still fits with no horizontal scroll.
- [ ] No "Featured Gear" section while all featured items use SVG images;
      `/shop/` still lists all three SKUs.
- [ ] `hugo --minify` builds clean; the Lighthouse CI gate passes on the PR.
- [ ] Live on `main` via squash-merge PR; verified on the production build.
