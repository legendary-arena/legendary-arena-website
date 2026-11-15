# WP-255 — Phone header shows every menu link

On phones, show all seven header menu links without sideways scrolling, and
move the cart up beside the wordmark.

**Why:** requested directly (Jeff, 2026-11-15), after a phone-width check of
the home page during WP-254. At 375px wide, measured on production:

- The menu was one row with `overflow-x: auto`. Its seven links need 477px
  in a 347px row, so Legends and Account (and part of Cards) were off the
  right edge behind a scrollbar, with "Legends" cut mid-word.
- The cart button sat alone on its own row between the menu and search.
- The header was 203px tall.

This file is the self-contained record. There is no separate ROADMAP entry
(same precedent as WP-251 / WP-253 / WP-254).

## What changed in this repo

| Path | Change |
|---|---|
| `assets/css/extended/custom.css` | New `@media (max-width: 560px)` block after the §8.1 menu-wrap rule. The menu becomes a four-column grid (two rows, no scroll); links get a 40px line-height instead of PaperMod's 60px header height; the cart takes `order: 1` with an auto start margin so it shares the wordmark's row; search follows the menu. Tokens only, apart from the 40px line-height. |

## Notes

- **CLS holds.** The §8.1 comment explains why the menu is forced onto its own
  row on mobile: the Inter font swap must not change the header's row count.
  A fixed four-column grid keeps that property, since the row count depends on
  the number of links (7 → 2 rows), not their text width. The widest column
  set needs about 317px of the 347px available, which leaves room for Inter's
  slightly wider metrics.
- **Adding an eighth link** still fits (4 + 4). A ninth adds a third row;
  revisit the column count then.
- **Desktop and tablet are unchanged.** The block applies at 560px and below.
  The single row needs about 477px of links, which fits from 561px up (533px
  of row after gutters), so 561px to 768px keeps the existing single row.

## DoD

- [ ] At 375px wide: all seven links visible in two rows, no horizontal
      scroll in the menu or the page, cart on the wordmark's row.
- [ ] Header no taller than before (203px at 375px wide).
- [ ] Desktop header unchanged.
- [ ] `hugo --minify` builds clean; the Lighthouse CI gate passes on the PR.
- [ ] Live on `main` via squash-merge PR; verified on the production build.
