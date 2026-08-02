# WP-040 — Rename the blog section URL from `/posts/` to `/blog/`

Move the blog off the `/posts/` URL prefix and onto `/blog/`, so the section
index and every post serve under `https://www.legendary-arena.com/blog/…`
instead of `/posts/…`. The visible label was already "Blog" everywhere
(header, footer, section title, JSON-LD `@type`); only the URL still said
`posts`. This aligns the path with the label.

**Why:** requested directly — the canonical URL should read
`/blog/<slug>/`, e.g. `/blog/gauntlet-shield-hydra-high-council/`.

This file is the self-contained record. There is no separate ROADMAP entry
(same precedent as WP-039).

## Status

- **Repo change:** ✅ Done (this PR, branch `infra/blog-url-rename`).
- **Cloudflare zone Redirect Rule (`/posts/*` → `/blog/*`):** ⏸️ **Pending —
  manual dashboard action.** See §"Required redirect (manual)". Until it is
  applied, old indexed `/posts/…` URLs 404.

## Mechanism

Hugo derives the section URL straight from the content directory name
(`content/posts/` → `/posts/`). There was no `[permalinks]` config and no
`url:` front matter. The section was renamed rather than remapped so the
directory name matches the URL — no permalink indirection to maintain.

Slugs are unchanged: `content/blog/gauntlet-shield-hydra-high-council.md`
still yields `/blog/gauntlet-shield-hydra-high-council/`. Only the prefix
moved.

## What changed in this repo

| Path | Change |
|---|---|
| `content/posts/` → `content/blog/` | `git mv` the whole section (57 files, history preserved). Section name is now `blog`. |
| `archetypes/posts.md` → `archetypes/blog.md` | Section-keyed archetype follows the section rename so `hugo new blog/…` works. |
| `content/**/*.md` (52 files) | Bulk-fixed in-page cross-links `](/posts/…` → `](/blog/…` (About page, welcome email, week-NN cross-references). Image `src` paths `](/images/posts/…` were **not** touched — see scope boundary. |
| `hugo.toml` | `[[menu.main]]` and `[[menu.footer]]` Blog `url` `/posts/` → `/blog/`; one comment updated. |
| `layouts/_partials/seo/schema.html` | The Blog JSON-LD gate `eq .RelPermalink "/posts/"` → `"/blog/"` (plus the doc-comment table). This gate is load-bearing: it emits the `Blog` entity on the section index only. |
| `.githooks/pre-commit` | Rule 9 (Gauntlet Guide enforcement) detection pattern `^content/posts/` → `^content/blog/`; example command updated. |
| `scripts/git/new-post.ps1` | Drafting path `posts/…` → `blog/…` and doc examples. Image-dir hint left as `static/images/posts/` (unchanged). |
| `docs/04-CONTENT-CONVENTIONS.md`, `docs/05-SEO-CONVENTIONS.md`, `docs/06-CONTENT-LANE-WORKFLOW.md`, `assets/css/extended/custom.css` | Living references to the `/posts/` URL and the `posts` section name updated to `/blog/` / `blog`. Historical WP files left as-is (they are a record of what happened). |

## Required redirect (manual) — load-bearing

`/posts/…` URLs are already indexed. They must 301 to `/blog/…` or they 404.

Per the **WP-006 lock** (`01-VISION.md` Decisions log, 2026-05-09), redirects
on this site are managed as **Cloudflare zone Redirect Rules**, not a
`static/_redirects` file — that file was tried and deliberately removed. So
this redirect is a zone rule, applied by hand in the Cloudflare dashboard:

- **Zone:** `legendary-arena.com`
- **Rules → Redirect Rules → Create**
- **When incoming requests match:** URI Path `starts with` `/posts/`
- **Then… Dynamic redirect**, expression:
  `concat("https://www.legendary-arena.com/blog/", substring(http.request.uri.path, 7))`
  *(7 = length of `/posts/`; strips the old prefix, keeps the slug + trailing slash)*
- **Status:** 301 Permanent — **Preserve query string:** ON

Apply this **before or at merge** so there is no window where `/posts/…`
404s. The existing apex→www zone rule (`legendary-arena.com/*` →
`www…/${1}`) is unaffected; an apex `/posts/x` hit will chain apex→www then
www `/posts/`→`/blog/` (an acceptable double 301).

> Config-as-code alternative: a path-only `static/_redirects`
> (`/posts/* /blog/:splat 301`) *would* work for this case (the WP-006
> limitation was specific to apex full-URL sources, which `_redirects`
> cannot express). It was **not** used here because reintroducing that file
> reverses the WP-006 locked decision. Revisit only as a deliberate
> governance change, not as a side effect of this WP.

## Verification

- `hugo` (v0.161.1 extended) build clean, exit 0.
- `public/blog/index.html` renders; `public/posts/` no longer built.
- Sample post resolves at `public/blog/gauntlet-shield-hydra-high-council/`.
- Blog JSON-LD (`"@type": "Blog"`) still emits on `/blog/` index (the
  RelPermalink gate fix works) and does **not** leak onto post pages.
- Zero `href="/posts/…"` links remain in built HTML.
- Full Lighthouse / reproducibility lock-pass not re-run — this is a
  path rename with no template-logic or asset change; the section's
  rendering is byte-identical apart from the URL and the two gate strings.

## Scope boundary

- **Image asset directory not renamed.** `static/images/posts/<slug>/` and
  the 52 `](/images/posts/…)` `src` references are left as-is. Those are
  `<img>` paths, invisible in page routes, orthogonal to the URL change, and
  renaming them doubles the diff for no user-visible gain. Renaming
  `static/images/posts/` → `static/images/blog/` (and its references, this
  WP file, `new-post.ps1`, and the content-conventions doc) is a clean
  follow-up slice if the directory/URL mismatch is worth closing.
- The old `/posts/` slugs are preserved 1:1; no slug redesign.
