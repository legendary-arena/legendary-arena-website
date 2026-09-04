# WP-247 — Adopt the split emblem as the canonical brand identity

Make the **split gold/villain emblem** the canonical Legendary Arena mark
across the marketing site, replacing the older hexagonal "arena" icon and the
Fiverr-era wordmark lockups that `/brand/` still presented as primary. This is
Phase 1 of the adoption — the identity, the production asset set, and the
favicon/app-icon system. The brand book (clear-space, minimum size, do/don't)
and the launch/social rasters are follow-on phases, tracked as their own WPs.

**Why:** the approved emblem (in the `LA\brand\` asset store, already used by
the site footer as `legendary-arena-emblem.webp`) was never reflected on the
public `/brand/` page. That page still shipped `logo-la-dark-400x200.svg`
(hex mark + Bebas wordmark) as "primary" and `legendary-arena-icon.svg` (a
geometric hexagon construction) as the favicon, so the site ran two identities
at once — footer emblem, hex favicon, wordmark-only header. The favicon PNGs
were also 68-byte placeholders. This closes the deferred real-logo effort in
`docs/brand/logo-brief.md`: the emblem fulfils its primary-wordmark,
secondary-lockup, standalone-mark, horizontal, monochrome, and light/dark
requirements.

## What changed in this repo

| Path | Change |
|---|---|
| `static/brand/logo/logo-la-emblem.svg` | New — transparent emblem vector master (traced from the `.ai`). |
| `static/brand/logo/logo-la-lockup.svg` | New — horizontal lockup (emblem + wordmark), true vector extraction from the `.ai`. |
| `static/brand/logo/logo-la-wordmark.svg` | New — `LEGENDARY / ARENA` wordmark, isolated from the lockup. |
| `static/brand/logo/logo-la-emblem-mono.svg` | New — single-ink monochrome (currentColor); the brief's monochrome master. |
| `static/brand/logo/logo-la-hero-gold.png` | New — gold hero half (single-side mark). |
| `static/brand/logo/icon-maskable-512.png` | New — full-bleed square PWA maskable icon. |
| `static/favicon.svg`, `favicon-16/32/48/192/512x*.png`, `apple-touch-icon.png`, `favicon.ico` | Regenerated from the emblem on a dark rounded tile — replaces the 68-byte placeholder PNGs and the hex `.ico`. |
| `static/safari-pinned-tab.svg` | New — mono emblem in solid black; the theme's `mask-icon` referenced this but it did not exist (404). |
| `static/site.webmanifest` | New — PWA manifest (name, icons incl. maskable, brand `theme_color` `#0b0f19`); closes the "no web app manifest" gap. |
| `layouts/_partials/extend_head.html` | New §7 — links the scalable `favicon.svg`, the larger PNG rungs, and the manifest (the pieces PaperMod's head.html does not already emit). |
| `content/brand/_index.md` (`## Logo + Identity`) | Rewritten to present the emblem system — primary lockup, standalone emblem, wordmark, monochrome — with a real Assets & Downloads list. Date bumped to 2026-09-04. |
| `scripts/build-brand-icons.py` | New — regenerates every derived icon (mono, favicons, mask, maskable) from `logo-la-emblem.svg`, so the icon set cannot drift from the mark. |

## Notes

- **The emblem is a dark-surface mark.** Its white villain half is designed
  against the deep-navy ground, so the favicons place it on a dark rounded
  tile and the `/brand/` page shows the full-colour marks on dark swatches.
  Light surfaces use the monochrome master. This is stated on the page and in
  the non-negotiable rules.
- **Icons are generated, not hand-placed.** `scripts/build-brand-icons.py`
  derives the whole set from the committed emblem SVG (Inkscape + ImageMagick);
  re-running it is idempotent.
- **Token binding is partial.** The full-colour SVGs bake the brand golds
  (`#f0c94a`/`#d4af37`/`#b8901f`) rather than `var(--la-*)`, because an SVG
  loaded via `<img>` cannot inherit CSS tokens; only the monochrome master is
  token-friendly (`currentColor`). Inline-SVG token binding is a possible
  future refinement, not a blocker.
- **Superseded marks left in place, deliberately.** `logo-la-dark-400x200.svg`,
  `logo-la-light-400x200.svg`, and `legendary-arena-icon.svg` are no longer
  referenced by the live page but remain on disk; the email pipeline (WP-018)
  and some docs still name them. Retiring them belongs in a follow-up once the
  email header is repointed at the emblem/wordmark.
- **Follow-on phases (separate WPs):** the formal brand book (clear-space,
  minimum size, light/dark pairing matrix, do/don't with the real marks) and
  the launch/social raster kit (OG 1200×630, FB cover, YouTube banner +
  watermark) built from the approved lockup/emblem.
