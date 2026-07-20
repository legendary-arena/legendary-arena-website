# legendary-arena-website

Marketing site source for [www.legendary-arena.com](https://www.legendary-arena.com)
— Hugo + PaperMod (theme as a Git submodule) + Pagefind (build-time
search index).

This site is the marketing landing for Legendary Arena. The game
client lives at `play.legendary-arena.com`; the card registry lives
at `cards.legendary-arena.com`. See
[`docs/01-VISION.md`](docs/01-VISION.md) for the three-site
architecture.

## Where things live

This repo holds the marketing site's **text**: post markdown, layouts,
brand tokens, and the images small enough to commit. It does not hold
working files.

- **Source images before export, design comps, product photography
  originals, and video** live in pCloud, not here. Only the optimized
  derivative is committed.
- **Finished video** lives on YouTube; a post embeds it. No video file
  enters this repo.
- **Secrets** live in `.dev.vars` locally (gitignored) and in the
  Cloudflare Pages dashboard in production — never in a commit.

The full map of which storage surface owns which kind of work is the
[Workspace Map](https://ewiki.legendary-arena.com/workspace-map/) on the
engineering wiki. Authoring conventions for this repo are on
[Blog Post Authoring](https://ewiki.legendary-arena.com/blog-post-authoring/)
and [Hugo Onboarding](https://ewiki.legendary-arena.com/hugo-onboarding/).

> Note the checkout location: this repo lives at `C:\www\`, off the
> pCloud sync drive. That is deliberate — syncing a `.git` directory
> causes refs to shift under a running session. Durability comes from
> pushing, not from file sync.

---

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Hugo Extended | `v0.161.1` (or any `>= 0.146.0` per PaperMod's `module.toml`) | The site uses extended-only features (WebP image processing, asset bundling). Standard Hugo will not build. |
| Node.js | `v22+` | Required for the Pagefind build step. The CI deploy (Cloudflare Pages, WP-006) will pin a major. |
| npm | bundled with Node | Used for dependency management and the build script. `pnpm` / `yarn` not supported here — keep `package-lock.json` authoritative. |

Verify locally before building:

```powershell
hugo version
node --version
npm --version
```

The `themes/PaperMod` submodule must be checked out at the locked
commit — clone with `--recurse-submodules` or run
`git submodule update --init` after a plain clone.

## Build

A single command builds the entire site, including the search index:

```
npm ci && npm run build
```

That resolves to:

1. `npm ci` — installs the locked `pagefind` version from
   `package-lock.json` into `node_modules/`. Use `npm ci` (not
   `npm install`) for byte-stable installs across local and CI.
2. `npm run build` — runs `hugo --minify && npx pagefind --site public`.
   - Hugo renders all content into `public/`.
   - Pagefind walks `public/`, indexes pages tagged with
     `data-pagefind-body`, and writes the index to `public/pagefind/`.
   - The `&&` ordering means Pagefind runs strictly after Hugo and
     only if Hugo succeeded; either failure exits non-zero.

The resulting `public/` is the deployable artifact.

## Local dev

For content authoring (editing markdown, adjusting layout, eyeballing
brand tokens), use Hugo's dev server:

```
hugo server --port 1313 --bind 127.0.0.1
```

Search is **not available in dev mode**. Pagefind only runs at build
time, so no `/pagefind/` directory exists on the dev server. Verify
search behavior against the production build (see *Verification*
below).

## Verification

To verify a production build locally on the same surface that
Lighthouse / WP-004 / WP-005 lock against:

```powershell
npm ci
npm run build
cd public
python -m http.server 1314
```

Then visit `http://localhost:1314/`. Search is wired up via the
`/` and `Ctrl+K` (or `Cmd+K`) shortcuts and via the input rendered
in the site header.

## Reproducibility

Same commit + same build command MUST produce byte-identical
`public/`. Mechanical check:

```powershell
npm run build
Get-ChildItem -Recurse -File public | Get-FileHash -Algorithm SHA256 | Sort-Object Path > build1.txt

npm run build
Get-ChildItem -Recurse -File public | Get-FileHash -Algorithm SHA256 | Sort-Object Path > build2.txt

Compare-Object (Get-Content build1.txt) (Get-Content build2.txt)
```

`Compare-Object` MUST return empty. Any diff is a determinism
regression and must be resolved before the change ships. The
`build1.txt` / `build2.txt` files are local-only — they are not
committed.

`pagefind` is pinned to an **exact** version in `package.json` (no
`^`, no `~`). Version bumps are governed work — a separate WP, with
its own reproducibility check and Lighthouse re-verification before
locking. Do not run `npm update`.

## CI parity

Cloudflare Pages (WP-006) MUST run the exact same command:

```
npm ci && npm run build
```

No additional build steps are permitted in CI. Drift between local
and CI is the failure mode this contract exists to prevent. If a
new tooling step is genuinely needed, it MUST land in
`package.json` `scripts.build` (or be invoked from there) so the
single-command contract still holds.

## Documentation

| Doc | Purpose |
|---|---|
| [`docs/01-VISION.md`](docs/01-VISION.md) | Top-level vision, global invariants, decisions log. Authoritative. |
| [`docs/03-ROADMAP.md`](docs/03-ROADMAP.md) | Work-packet roadmap, status, dependencies. |
| [`docs/04-CONTENT-CONVENTIONS.md`](docs/04-CONTENT-CONVENTIONS.md) | Front-matter rules, build pipeline, search UI, keyboard shortcuts, voice/terminology. |
| [`docs/brand/`](docs/brand/) | Brand strategy, palette, typography, spacing — the API contract for visual tokens. |

Brand tokens are a versioned cross-origin API consumed by
`play.legendary-arena.com` and `cards.legendary-arena.com`; see
`docs/brand/CHANGELOG.md` for the contract version history.
