# WP-257 — Clear the Hugo 0.158 deprecations

Replace the two template calls Hugo 0.158 deprecated, so the build is clean
under `--panicOnWarning` and doesn't break when a future Hugo release removes
them.

**Why:** requested directly (Jeff, 2026-11-15), after a `--panicOnWarning`
build during WP-256 failed on them. Hugo 0.161.1 (the local and CI version)
still renders them but warns:

- `.Language.LanguageDirection` → use `.Language.Direction`
- `.Language.LanguageCode` → use `.Language.Locale`

This file is the self-contained record. There is no separate ROADMAP entry
(same precedent as WP-251 / WP-253 to WP-256).

## What changed in this repo

| Path | Change |
|---|---|
| `layouts/baseof.html` | `.Language.LanguageDirection` → `.Language.Direction` (three `<html>` variants). |
| `layouts/_partials/templates/opengraph.html` | `site.Language.LanguageCode` → `site.Language.Locale` (`og:locale`). |
| `layouts/rss.xml` | New: a site override of `themes/PaperMod/layouts/rss.xml` (PaperMod `c4ca7ca`), identical except `site.Language.LanguageCode` → `site.Language.Locale` in `<language>`. The theme is a submodule, so it's overridden by Hugo's lookup order rather than edited (the WP-004 principle). |

## Notes

- **Output unchanged.** A full `hugo --minify` build before and after is
  identical file for file: `dir="auto"`, `og:locale` `en_us`, and the RSS
  `<language>en-us</language>` all render as before, because `hugo.toml` sets
  `locale = "en-us"`.
- **Drop `layouts/rss.xml`** once the PaperMod submodule is updated to a
  version that ships the same change; until then, a submodule bump should
  diff the theme's `rss.xml` against this copy.
- `.Language.LanguageName` in `layouts/_partials/header.html` is not
  deprecated (no warning) and is unchanged.

## DoD

- [x] `hugo --minify --panicOnWarning` builds with no warnings.
- [x] Built output identical to the pre-change build.
- [ ] Live on `main` via squash-merge PR.
