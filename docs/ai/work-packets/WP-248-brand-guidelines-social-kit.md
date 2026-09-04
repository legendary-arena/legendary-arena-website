# WP-248 — Brand logo-usage guidelines + launch/social kit

Complete the brand system adopted in WP-247: write the formal logo-usage
guidelines (clear-space, minimum size, light/dark pairing, do/don't) and
produce the launch/social raster kit from the approved marks.

**Why:** WP-247 made the split emblem the canonical identity but left the
"how to use it" layer unwritten — the gap the engineering wiki's Branding page
flagged as an open question — and shipped no social/launch graphics, which the
`/brand/` page and `logo-brief.md` both call for. This closes both.

## What changed in this repo

| Path | Change |
|---|---|
| `docs/brand/logo-usage.md` | New — the formal guidelines: the marks table, clear-space (X = half the mark height), minimum sizes, the light/dark pairing matrix (the emblem is a dark-surface mark; monochrome for light), and the do/don't list. Supersedes the logo-usage guidance in `logo-brief.md`. |
| `static/brand/logo/guide-clearspace.png`, `guide-minsize.png` | New — the clear-space and minimum-size diagrams, composed from the lockup/emblem. |
| `static/brand/social/{og-image,facebook-cover,youtube-banner,youtube-watermark,avatar-800}.png` | New — the launch/social kit: OG 1200×630, FB cover 851×315, YouTube banner 2560×1440 (mark in the TV-safe center), YouTube watermark 150×150, square avatar 800×800. |
| `content/brand/_index.md` | Adds a "Clear space & minimum size" section (with the diagrams) and a "Launch & social kit" downloads block to the Logo + Identity area. |
| `scripts/build-brand-guides.py` | New — regenerates the guideline diagrams from the committed marks. |
| `scripts/build-social-kit.py` | New — regenerates the social kit from the committed marks. |

## Notes

- **All graphics are generated from the committed mark SVGs** (Inkscape), so
  they cannot drift from the emblem; both scripts are idempotent. The tagline
  ("Mastery — not luck — determines victory") is set in Inter, matching the
  brand body face.
- **Clear-space unit** is X = half the mark's height on every side — a simple,
  legible rule that scales with the mark.
- **The emblem stays a dark-surface mark.** Social graphics use the navy
  ground; the YouTube banner keeps the mark inside the 1546×423 TV-safe center
  so it survives cross-device cropping.
- **Site-wide default OG image is intentionally NOT wired here.** Setting
  `og-image.png` as the site default interacts with per-page front-matter
  images and is an SEO change better made on its own; the asset is shipped and
  documented so that follow-up is a one-line config.
