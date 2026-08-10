# WP-042 — Cloudflare Pages preview deploys resolve their own assets (baseURL fix)

Make Cloudflare Pages **preview** deployments render correctly by building
them with the preview deploy's own URL as Hugo's `baseURL`, instead of the
hardcoded production `baseURL`. Production (`main`) builds are unchanged and
byte-identical.

This is an **INFRA / build-config WP**. It touches the `npm run build` command
(`package.json`) and adds a small Node build wrapper. No content, layout, or
`hugo.toml` changes.

This file is the self-contained record.

## Problem

`hugo.toml` sets `baseURL = "https://www.legendary-arena.com/"` with
`canonifyURLs = true`. Every build therefore writes **absolute production
URLs** into the HTML for fingerprinted asset bundles (CSS/JS), Hugo-processed
images, and internal links.

On a preview deploy that **changes or adds assets** (new CSS → new bundle hash,
new images, new JS), those absolute URLs point at `www.legendary-arena.com` —
where the new files do not exist yet — so the browser 404s them:

- CSS `<link>` → `https://www.legendary-arena.com/assets/css/stylesheet.<NEW-hash>.css`
  → 404 (production serves a different hash) → **unstyled page**.
- `<img src>` → `https://www.legendary-arena.com/art/...webp` → 404 (images only
  on the preview host) → **broken images**.
- Lightbox / other new JS → 404.

Preview deploys only ever "worked" for branches that left static assets
**unchanged** (same hashes as production, so the absolute URLs happened to
resolve). The first branch to change CSS or add images — WP-041 (art gallery) —
surfaced the gap: its preview rendered unstyled with an empty image grid, even
though the assets were built correctly and served fine from the preview host.

**Root cause:** the preview build uses the production `baseURL`. It should use
the preview deploy's URL so asset URLs resolve against the host that actually
serves them.

## Fix

Cloudflare Pages exposes per-build environment variables:

- `CF_PAGES_BRANCH` — the branch being built (production branch is `main`).
- `CF_PAGES_URL` — this deploy's unique URL (e.g.
  `https://<hash>.legendary-arena-website.pages.dev`).

Route the build through a small Node wrapper (`scripts/build.mjs`) that passes
`--baseURL "$CF_PAGES_URL"` to Hugo **only** on preview deploys
(`CF_PAGES_BRANCH` set and ≠ `main`). Everything else — including local builds
and the `main` production build — takes the original code path.

CF Pages runs `npm ci && npm run build` verbatim (WP-006), so the fix lives
entirely in the repo; no Cloudflare dashboard change is required.

## What shipped

| Path | Change |
|---|---|
| `scripts/build.mjs` | **NEW** — build wrapper: `hugo --minify` (+ `--baseURL $CF_PAGES_URL` on preview) then `npx pagefind --site public`. Cross-platform (shell on Windows to resolve the `hugo`/`npx` shims; direct spawn on POSIX). |
| `package.json` | **MODIFY** — `build` script: `hugo --minify && npx pagefind --site public` → `node scripts/build.mjs`. |

## Why this is safe (determinism, WP-006)

WP-006 §"Build command parity" locked `npm run build` to
`hugo --minify && npx pagefind --site public` and warned against changing it.
WP-042 amends that lock with an explicit determinism guarantee:

- On `main` (and any build with no `CF_PAGES_*` env — e.g. local Windows
  builds), the wrapper runs **exactly** `hugo --minify` then
  `npx pagefind --site public`. Same binaries, same flags, same order → same
  output.
- The `--baseURL` override is applied **only** when `CF_PAGES_BRANCH` is set and
  is not `main`. Production output is unaffected.
- Verified: two consecutive production builds are byte-identical
  (`public/index.html`, `sitemap.xml`); the preview path rewrites asset URLs to
  the preview host and leaves genuinely-external nav links (Play, Cards) on
  their real domains.

## Verify

- [x] `node scripts/build.mjs` (no CF env) emits production URLs; runs
  `hugo --minify` + `npx pagefind --site public`.
- [x] `CF_PAGES_BRANCH=<branch> CF_PAGES_URL=https://x.pages.dev node scripts/build.mjs`
  rewrites asset URLs to `https://x.pages.dev/...`; zero `www.legendary-arena.com`
  asset refs; Play/Cards external links unchanged.
- [x] Two production builds byte-identical on key files.
- [x] No Node deprecation warnings on Windows (args not mixed with `shell:true`).
- [ ] **Post-merge:** a preview deploy that changes assets renders styled with
  working images (validated by re-pointing WP-041 at this fix — see below).

## Definition of Done

1. `scripts/build.mjs` added; `package.json` `build` → `node scripts/build.mjs`.
2. Production / local builds byte-identical to the previous script.
3. Preview builds resolve assets against `CF_PAGES_URL`.
4. Commit uses the `WP-042:` prefix (required — the change touches
   `package.json`, a site-affecting path per `wp-site-traceability` CI).
5. No `hugo.toml`, content, or layout changes.

## Exit criteria

- All DoD items verified; PR opened and merged to `main`.
- Decisions-log entry in `docs/01-VISION.md`: "WP-042 — Preview deploys build
  with `CF_PAGES_URL` as baseURL so branch assets resolve on the preview host.
  Production build unchanged/byte-identical. Amends WP-006's build-command lock."

## Interaction with WP-041 (art gallery)

WP-041's preview surfaced this bug and cannot render correctly until this fix is
in the build script **that CF runs for the WP-041 branch**. After WP-042 merges
to `main`, merge `main` into `wp-041-art-gallery` (or rebase) and push; the
WP-041 preview then rebuilds with the fix and renders styled with working
images. This is the general remedy for **every** future asset-changing preview,
not a one-off for WP-041.

## Follow-on (not in scope)

- **Deploy-doc note.** Add a short line to WP-006 / `docs/04-CONTENT-CONVENTIONS.md`
  "Production deploy" that preview builds override `baseURL` via
  `scripts/build.mjs`. Docs-only; separate small change.
