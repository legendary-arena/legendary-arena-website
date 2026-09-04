# WP-249 — Retire the superseded marks + wire the site-wide default OG image

Two cleanups that finish the emblem adoption (WP-247/248):

1. **Retire the old hexagonal "arena" icon and the Fiverr-era wordmark
   lockups.** Repoint every remaining live reference on the `/brand/` page to
   the emblem system, then delete the superseded SVG files.
2. **Wire the brand OG card as the site-wide default** so every shared link
   carries it, not just pages with their own cover image.

**Why:** WP-247 rewrote the top of the `/brand/` page but the page's deeper
Assets & Downloads, Facebook, and YouTube sections still linked
`logo-la-dark-400x200.svg`, `logo-la-light-400x200.svg`, and
`legendary-arena-icon.svg` (the hex mark) — the mixed-identity state the
review flagged. And PaperMod emits `og:image` / `twitter:image` only from a
page's own cover image, so a cover-less page shared as a bare link.

## What changed in this repo

| Path | Change |
|---|---|
| `content/brand/_index.md` | Repointed the Assets & Downloads "Logo files" list to the emblem/lockup/wordmark/monochrome set; repointed the Facebook + YouTube profile pictures to `/brand/social/avatar-800.png`; linked the shipped Facebook cover, Open Graph, YouTube banner, and YouTube watermark files in their spec sections. |
| `static/brand/logo/logo-la-dark-400x200.svg`, `logo-la-light-400x200.svg`, `legendary-arena-icon.svg` | **Deleted** — superseded by the emblem system; no longer referenced by any live page. |
| `layouts/_partials/templates/opengraph.html` | New project override of PaperMod's template — faithful copy whose only change is a site-wide default `og:image` (`/brand/social/og-image.png`, 1200×630) when a page has no cover image. |
| `layouts/_partials/templates/twitter_cards.html` | New project override — on a cover-less page, emit a `summary_large_image` card with the brand OG image instead of a small imageless `summary`. |
| `layouts/_partials/extend_head.html` | Fixed a stale script-name reference in the §7 comment (`build-favicons.py` → `build-brand-icons.py`). |

## Notes

- **Template overrides are faithful copies.** PaperMod is a pinned submodule,
  so the copies will not silently drift; if the theme is ever updated, diff
  these two files against it. Each override changes only its image branch.
- **Per-page covers still win.** Any page (blog posts, etc.) that sets its own
  `cover.image` keeps it; only cover-less pages fall back to the brand card.
  The homepage — which has no cover — now shares as the brand OG card.
- **Deleted files stay in git history.** Old bookmarks to the three retired
  paths will 404, which is the intended "version by replacement" behavior.
- **The email header (WP-018) is out of scope here** — it is produced in Brevo,
  not from a repo asset; repoint it to the emblem/wordmark in Brevo directly.
