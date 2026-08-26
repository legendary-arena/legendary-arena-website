# 06 — Performance conventions & the Lighthouse CI gate

**Status:** Active (WP-046, 2026-08-26)
**Owner:** Jeff Jensen

The site holds a **Lighthouse ≥ 90** floor in Performance, Accessibility,
Best Practices, and SEO (`docs/01-VISION.md` success criteria). This doc
describes the CI gate that enforces it, why it is built the way it is, and
how to operate it.

---

## Why the gate exists

The floor used to be a **manual** discipline — enforced only when someone
remembered to run Lighthouse. That failed once, expensively: the site drifted
from the WP-008 baseline (home 92 / post 91) to **76–79 site-wide** with fully
green CI, discovered only by a human running Lighthouse during WP-043 and
recovered by WP-044. The recovery is structural (render-blocking requests
eliminated), so the live risk now is a **regression** slipping back in — a
future commerce/media WP re-adding a render-blocker or a heavy asset. The gate
catches that at PR time instead of in production.

---

## What runs

`.github/workflows/lighthouse.yml` runs on every **site-affecting** PR to
`main` (the `paths:` filter — a docs-only PR skips it). It:

1. Checks out with submodules (`themes/PaperMod`), Node 22, Hugo Extended
   `0.161.1` (both matching CF Pages / WP-006).
2. Builds with a **localhost** baseURL so assets resolve against the local
   server: `hugo --minify --baseURL http://127.0.0.1:4173 && pagefind`. (Not
   `npm run build`, which bakes the production absolute baseURL.)
3. Runs `npx lhci autorun` (`lighthouserc.json`), which starts the compressed
   static server, measures the matrix, asserts the median, and uploads reports
   to LHCI temporary public storage (URLs printed in the job log).

A failed assertion exits non-zero and **reds the check**.

### The page matrix (`lighthouserc.json`)

`/`, a blog post, `/shop/`, a `/shop/<product>/`, `/diorama/`, `/leaderboard/`,
`/roadmap/` — the WP-044 Verify matrix (one of each page kind).

### Two deliberate design choices

- **Median of 3 runs** (`aggregationMethod: median-run`). Lighthouse scores
  swing ±10 points with CI-runner CPU contention (measured in WP-044). A
  single-run ≥90 gate would false-fail and get switched off within a week;
  the median is the anti-flakiness mechanism.
- **Compression is mandatory.** `scripts/lighthouse-serve.mjs` serves the build
  with on-the-fly Brotli/Gzip. An *uncompressed* server understates every score
  ~5–8 points (the "Enable text compression" opportunity, ~600 ms), which would
  make a genuinely-90 page read as ~85 and red the gate falsely. Production
  (Cloudflare) serves Brotli, so this matches production.
- **API-backed pages are Perf-only.** `/leaderboard/` and `/roadmap/` fetch the
  live feedback API, which is CORS-blocked from the CI localhost origin → a
  console error that dings **Best Practices only**. Their Performance / A11y /
  SEO are unaffected, so they are gated on **Performance** alone; every other
  page gates all four categories at ≥ 90.

---

## Reading and fixing a red gate

1. Open the failed **Lighthouse performance gate** check on the PR → the log
   lists each failed assertion (page + category + the median score) and a
   **report URL** (temporary public storage) with the full Lighthouse breakdown.
2. The fix belongs in the **offending change**, not here. Do not weaken the
   gate (lower `minScore`, drop a page, add a page to the Perf-only list) to get
   a PR green — that defeats its purpose. Typical causes and fixes mirror WP-044:
   a new render-blocking `<link>`/`<script>` (defer it or inline it), a heavy
   unsized image (resize/WebP + `width`/`height`), or a per-`.Section` branch in
   a `partialCached` partial (decide at runtime instead — see the WP-044
   commerce-fix note).
3. **Re-run locally** before pushing: `npm run build:lighthouse && npm run
   lint:perf`. (On Windows, chrome-launcher can throw `EPERM` during its temp
   cleanup *after* the audit — a local-only environment bug; the Linux CI runner
   is unaffected and is the source of truth.)

---

## Operating the gate

- **Advisory → required.** By default the check is **advisory**: a red run is
  visible on the PR but does not block merge. To make it blocking, mark
  **"Lighthouse performance gate"** as a required status check in the `main`
  branch protection rule (repo Settings → Branches, or
  `gh api repos/:owner/:repo/branches/main/protection`). Note the `paths:`
  filter means the check does not run on docs-only PRs; GitHub's "required"
  behavior for a check that didn't run depends on the protection settings —
  confirm docs-only PRs are still mergeable after flipping it required.
- **Updating the matrix / baseline.** When a new page *kind* ships, add its URL
  to `lighthouserc.json` `collect.url` (and to the Perf-only pattern if it is
  API-backed). The blog-post URL is a specific dated slug; if that post is ever
  removed, point it at a current post.
- **Never commit Lighthouse JSON.** Reports go to temporary public storage;
  `commit-hygiene.yml` blocks committing `lighthouse-*.json`.

---

## Follow-ons (not built here)

- **Cloudflare-preview measurement** as a non-blocking informational annotation
  (production-representative: real Brotli/HTTP-2/CDN). Deferred to keep the
  blocking gate self-contained.
- **Resource budgets** (max bundle KB / image bytes) via LHCI `budgets.json` —
  a finer-grained gate to layer on once the score gate has settled.
- **Real-user monitoring (CrUX / field data)** — lab Lighthouse is a proxy; a
  field signal catches what synthetic runs miss. A separate, larger effort.
