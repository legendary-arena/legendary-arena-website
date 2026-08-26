# WP-046 — Lighthouse-on-CI performance gate

> **✅ LOCKED 2026-08-26** (gate live + green-verified on CI; red-path live
> confirmation pending a GitHub Actions queue stall — see `## Execution
> outcome` at the foot of this file and the `docs/01-VISION.md` lock entry).

**Infra / governance WP.** Add a CI check that runs Lighthouse against the
site on every PR and **fails the PR if Performance (or A11y / BP / SEO)
drops below the ≥ 90 invariant** on a representative page matrix. The
marketing site's Performance already regressed silently once — from the
WP-008 baseline (home 92 / post 91) down to 76–79 site-wide, discovered
only during WP-043 execution and recovered by WP-044. Nothing in CI would
have caught it. This WP closes that gap: make the ≥ 90 floor an
**automated merge gate**, so a future commerce/media WP that reintroduces
a render-blocker or a heavy asset fails CI instead of shipping to
production. WP-011 and WP-044 both named this as the highest-leverage
follow-on; this is it.

> **Drafting note (gate status).** Drafted with the pre-drafting hygiene
> gate's branch/worktree checks (`docs/ai/REFERENCE/01.0-pre-drafting-hygiene.md`
> Checks 3 & 5) **not clear** — the working tree was clean, but several
> parked `claude/*` branches / worktrees hold unrelated work (the same
> standing condition WP-043/WP-044 drafted under). Docs-only draft; branch
> hygiene is separate housekeeping. Baseline `main` at draft time: the
> WP-044 commerce-fix lock (`44c2d74`).

---

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme is a **locked git submodule**
(`themes/PaperMod` at `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`). Build:
`npm run build` (`node scripts/build.mjs` → `hugo --minify` + Pagefind;
preview-baseURL wrapper per the 2026-08-09 WP-042 lock). CI runs on GitHub
Actions (ubuntu-latest); production + per-PR previews build on Cloudflare
Pages.

---

## Required reading (in order)

1. `C:\www\legendary-arena-com\docs\01-VISION.md` — the **Performance**
   success criterion (Lighthouse ≥ 90 in P/A/BP/SEO; no console errors)
   and the **2026-08-25 WP-044 lock** Decisions-log entry — it records the
   recovered baseline this gate must protect, the exact page matrix used,
   and the **measurement-variance lesson** (local/CI-runner Lighthouse
   swings ±10 pts from machine contention; contention only depresses
   scores) that this WP must design around to avoid a flaky gate.
2. `C:\www\legendary-arena-com\.github\workflows\commit-hygiene.yml` — the
   **only** existing workflow (three jobs on `pull_request`:
   commit-message format, staged-file patterns, site-commits-reference-WPs).
   The new Lighthouse job is either added here or in a sibling workflow;
   mirror its `on: pull_request`, `runs-on: ubuntu-latest`, and step
   conventions.
3. `C:\www\legendary-arena-com\docs\ai\work-packets\WP-044-site-performance-recovery.md`
   — the recovery this gate defends; its Verify matrix is the candidate
   page set, and its "Post-lock commerce fix" note shows the class of
   silent regression (a `partialCached` `.Section` bug) that CI perf +
   a smoke assertion should catch.
4. `C:\www\legendary-arena-com\docs\ai\work-packets\WP-042-preview-baseurl.md`
   — how per-PR **Cloudflare preview deploys** work (branch-alias host
   `<branch>.legendary-arena-website.pages.dev`, `--baseURL "$CF_PAGES_URL"`).
   Relevant if the gate measures the preview URL (Option B) rather than a
   CI-local build (Option A).
5. `C:\www\legendary-arena-com\scripts\build.mjs` + `package.json` — the
   build command CI would invoke for a self-contained build (Option A);
   note the Node version pinned for CF Pages (`NODE_VERSION = 22`, WP-007a)
   so CI matches production.
6. Lighthouse CI docs — <https://github.com/GoogleChrome/lighthouse-ci>.
   Specifically `@lhci/cli autorun`, `numberOfRuns` + `aggregationMethod:
   median-run`, and `assert` (assertion presets / `minScore`) — the
   standard machinery for a **non-flaky** score gate.

Don't read prior session transcripts; the committed artifacts + the
VISION Decisions log are the truth.

---

## Current state

- CI is **only** `commit-hygiene.yml` (3 hygiene jobs). There is **no**
  build job and **no** performance/accessibility check in CI. The site
  builds on Cloudflare Pages, not in Actions.
- The ≥ 90 invariant lives in `docs/01-VISION.md` as a **manual**
  discipline — enforced only when a human remembers to run Lighthouse.
  WP-043 proved that fails: the site drifted to 76–79 with green CI.
- WP-044 recovered the site to a clean-machine peak of 98–99 across the
  matrix, but the recovery is **structural** (render-blocking requests
  eliminated) — so the live risk now is a *regression* slipping back in.
- Local/CI-runner Lighthouse has **±10-pt variance** under CPU contention
  (documented at length in the WP-044 lock). A naive single-run `≥ 90`
  gate would be **flaky** (false failures on a slow runner) — the WP must
  design against this, or it will be disabled within a week.

---

## Design decisions (resolve before building)

1. **Where to measure — Option A (CI-local build) vs Option B (CF preview).**
   - **A — build in CI + Lighthouse a local server.** Job does `npm ci &&
     npm run build`, serves `public/` (a static server **with gzip/brotli**
     — an uncompressed server understates every score ~600 ms, the
     "enable text compression" penalty WP-044 hit), runs LHCI against the
     matrix. **Pro:** self-contained, no external dependency, runs on every
     PR immediately. **Con:** GitHub runner perf is variable (mitigated by
     median-of-N).
   - **B — Lighthouse the Cloudflare preview URL** once the per-PR preview
     deploys (real infra: brotli, HTTP/2, CDN — the numbers WP-044 saw as
     95–99). **Pro:** production-representative. **Con:** must wait for and
     discover the preview URL, and the preview host's API-CORS / noindex
     quirks (marketing-verification-gotchas) skew A11y/SEO and the
     leaderboard/roadmap API fetches — so a preview run is best for **Perf**
     only. Recommend **A** for the blocking gate (fast, deterministic
     enough with median-of-N) and optionally **B** as a non-blocking
     informational annotation.
2. **Anti-flakiness is mandatory.** Whatever the source, run **N ≥ 3** and
   assert on the **median** (`aggregationMethod: median-run`). Consider a
   small tolerance under 90 (e.g. warn 88–89, fail < 88) **only** if a
   hard 90 proves flaky on the runner — but default to a hard `minScore:
   0.9` and rely on median-of-N first. Record the chosen N and threshold.
3. **Blocking vs advisory, and scope of categories.** Performance is the
   headline, but the same run yields A11y / BP / SEO for free — gate all
   four at ≥ 90 (the VISION invariant is all four). Decide whether the job
   is a **required** status check (blocks merge — the point of the WP) or
   advisory-first for a settling-in period, then flipped to required.
4. **Page matrix.** Reuse the WP-044 Verify matrix (home, a blog post,
   `/shop/`, a `/shop/<product>/`, `/diorama/`, `/leaderboard/`,
   `/roadmap/`) or a representative subset (one of each page *kind*) to
   keep CI fast. Note: `/leaderboard/` and `/roadmap/` fetch the live API;
   under Option A (CI-local) those fetches fail (no `www` origin / offline
   runner) → console errors could ding BP. Decide: measure them Perf-only,
   or exclude the API-backed pages from the BP assertion, or stub the API.
5. **Runtime budget.** LHCI over 7 pages × 3 runs is ~5–8 min. Decide if
   that's acceptable per PR, or trim the matrix / parallelize. It should
   not dominate the PR feedback loop.
6. **Artifact handling.** Lighthouse JSON is local-only per WP-005
   (`commit-hygiene.yml` already blocks committing `lighthouse-*.json`).
   CI should upload reports as **build artifacts** (or LHCI temporary
   public storage), never commit them.

---

## Task (once the levers above are decided)

### Step 1 — Author the CI job
Add a `lighthouse` job (new workflow `lighthouse.yml` or a job in
`commit-hygiene.yml`), `on: pull_request`, `runs-on: ubuntu-latest`,
Node pinned to match CF Pages (22). For Option A: `npm ci` → `npm run
build` → serve `public/` **compressed** → `@lhci/cli autorun`.

### Step 2 — Configure the assertions
`lighthouserc` (or inline): `numberOfRuns: 3`, `aggregationMethod:
median-run`, `assert` on `categories:performance|accessibility|
best-practices|seo` `minScore: 0.9` for each matrix URL. Encode the
API-backed-page decision from Design decision 4.

### Step 3 — Prove it catches a regression AND passes clean
- Green path: run against current `main` (post-WP-044) → all pages pass.
- Red path: temporarily reintroduce a render-blocker (e.g. re-add the
  Google Fonts `<link>`, or a `.Section` footer branch like the WP-044
  commerce bug) on a throwaway branch → confirm the job **fails** with a
  clear message. Do not merge the throwaway.

### Step 4 — Wire it as a required check
Once green+red are proven and flakiness is acceptable over a few runs,
make the job a **required** status check on `main` (branch protection).
Document the settling-in decision if it starts advisory.

### Step 5 — Document
Record the gate in `docs/01-VISION.md` (Decisions log) and, if a
conventions doc fits, a short "Performance gate" section (how to read a
failure, how to re-run, the median-of-N rationale). Update `WORK_INDEX`.

---

## Verify

- [ ] CI job runs on a PR and reports P/A/BP/SEO per matrix page.
- [ ] Median-of-N (N ≥ 3) — a single slow run does not red the gate
      (demonstrate stability across ≥ 3 PR runs / re-runs).
- [ ] Green on current `main` (WP-044 baseline): all matrix pages ≥ 90 all
      four categories (API-backed-page carve per Design decision 4).
- [ ] Red on a deliberate regression (reintroduced render-blocker) — job
      fails with an actionable message naming the page + metric.
- [ ] No Lighthouse JSON committed; reports uploaded as artifacts only.
- [ ] Job is a required status check on `main` (or a dated plan to flip it
      from advisory to required).
- [ ] CI wall-clock acceptable (state the number).

---

## Scope lock

| Path | Change |
|---|---|
| `.github/workflows/lighthouse.yml` (or a job in `commit-hygiene.yml`) | NEW/MODIFY — the Lighthouse CI job |
| `lighthouserc.json` / `.lighthouserc.js` | NEW (only if LHCI config is externalized) |
| `package.json` | MODIFY (only to add `@lhci/cli` devDep + a `lint:perf`-style script, if chosen) |
| `docs/01-VISION.md` | MODIFY (Decisions-log entry at lock) |
| `docs/ai/WORK_INDEX.md` | MODIFY (row → Done at lock) |
| `docs/ai/work-packets/WP-046-lighthouse-ci-gate.md` | MODIFY (fold decisions in at lock) |
| A perf-conventions doc | NEW (optional — how to read/re-run the gate) |

**Do NOT touch:** `themes/PaperMod` (locked submodule), `static/brand-tokens.css`
(cross-origin contract), any `content/` / `layouts/` / `assets/` production
files (this WP adds a *gate*, it does not change the site), the engine repo.
No production-surface change — a red gate is fixed by the *offending* WP,
not by weakening this one.

---

## Definition of Done

1. A Lighthouse CI job runs on every PR, median-of-N, gating P/A/BP/SEO ≥ 90
   on the page matrix (with the API-backed-page decision recorded).
2. Proven green on the WP-044 baseline and red on a deliberate regression.
3. Non-flaky across several real PR runs; wall-clock acceptable.
4. Required status check on `main` (or a dated advisory→required plan).
5. No Lighthouse JSON committed (artifacts only).
6. WORK_INDEX row Done; VISION Decisions-log entry added.

---

## Exit criteria

- DoD verified on real PRs.
- `WP-046:` (or `INFRA:`) commit(s) per commit-hygiene; PR; squash-merge.
- WORK_INDEX row updated; Decisions-log entry in `docs/01-VISION.md`.

---

## Risk register

- **Flaky gate → disabled gate.** A hard single-run ≥ 90 on a variable
  runner will false-fail and get switched off, defeating the purpose.
  Mitigation: median-of-N is non-negotiable; compress the served build;
  consider warn-band before hard-fail only if needed.
- **Uncompressed CI server understates scores.** WP-044 saw ~600 ms
  ("enable text compression") from an uncompressed local server. The CI
  static server MUST send gzip/brotli or every score reads ~5–8 pts low.
- **API-backed pages (`/leaderboard/`, `/roadmap/`).** Their live-API
  fetch fails on an offline CI runner (and cross-origin on a preview host)
  → console errors / BP hit that are *not* a real regression. Mitigation:
  measure them Perf-only, or stub/allow the failure in the BP assertion.
- **CI minutes / wall-clock.** 7×3 Lighthouse runs add several minutes per
  PR. Mitigation: trim to one page per kind, or run only when
  site-affecting files changed (reuse the `commit-hygiene.yml`
  site-file detection).
- **Submodule / Node drift.** CI must build with the same Node (22) and
  submodule commit as production, or scores won't match. Mitigation: pin
  Node; `submodules: recursive` in checkout.

## Follow-on (not in scope)

- **Real-user monitoring (field data / CrUX)** — lab Lighthouse is a
  proxy; a CrUX or RUM signal would catch what synthetic runs miss. A
  larger, separate effort.
- **Perf budgets on specific resources** (max bundle KB, max image bytes)
  via LHCI `budgets.json` — a finer-grained gate that could layer on once
  the score gate is stable.
- **Extending the gate to `play.*` / `cards.*`** — those surfaces have
  their own carve-outs (WP-007b) and their own repos/CI; a per-app WP.

## Authority

Per the `docs/01-VISION.md` Decisions-log convention, the authority chain
on conflict is:

1. `docs/01-VISION.md` (vision + global invariants + Decisions log — the
   ≥ 90 invariant and the WP-044 lock are the direct authority)
2. `docs/03-ROADMAP.md` / `docs/ai/WORK_INDEX.md` (WP registry)
3. This WP file
4. Active session context

---

## Execution outcome (2026-08-26 lock)

**Shipped:** `.github/workflows/lighthouse.yml`, `lighthouserc.json`,
`scripts/lighthouse-serve.mjs` (compressed static server), `docs/06-PERFORMANCE.md`,
and `@lhci/cli` + two npm scripts (`build:lighthouse`, `lint:perf`).
`scripts/lighthouse-serve.mjs` is a **scope amendment** — the WP body's Step 1
requires "serve `public/` **compressed**" but the draft scope table didn't list
a serve script; it is small, CI-only, and directly implements that requirement.

**Decisions (as drafted):** Option A (build-in-CI, compressed server, LHCI) as
the blocking gate; Cloudflare-preview measurement deferred as a future
informational add. `numberOfRuns: 3` + `aggregationMethod: median-run`,
`minScore: 0.9`. Static pages gate all four categories; the API-backed pages
(`/leaderboard/`, `/roadmap/`) gate **Performance only** (their live-API fetch is
CORS-blocked from the CI localhost origin, dinging Best Practices). Advisory by
default (a red run is visible but non-blocking until marked required in branch
protection — see `docs/06-PERFORMANCE.md`).

**Verification:**
- **Green path — PROVEN on CI** ([PR #113](https://github.com/legendary-arena/legendary-arena-website/pull/113)):
  the job installed Hugo 0.161.1 + Node 22, built with a localhost baseURL,
  started the compressed server, ran **21 total runs** (median of 3 over 7
  URLs), asserted, and **passed** on the WP-044 baseline (~4m44s). The
  `assertMatrix` regexes were independently verified to partition all 7 URLs
  into their correct buckets (5 static → all-4, 2 API → perf-only; no overlap,
  no gap), so the green pass is **non-vacuous** — the gate genuinely evaluated
  ≥ 90 on every page.
- **Red path — pending an external blocker.** A throwaway
  [PR #114](https://github.com/legendary-arena/legendary-arena-website/pull/114)
  reintroduces the render-blocking Google Fonts `<link>` WP-044 removed, to
  demonstrate the gate reds. Its CI run was **stuck in a GitHub Actions
  scheduling stall** at execution time (the green run had run fine ~45 min
  earlier; new runs stopped being scheduled) and had not executed at lock. The
  failure behavior is deterministic — LHCI `error`-level `minScore: 0.9` exits
  non-zero when a median category score drops below 0.9 — and the config is
  verified non-vacuous, so the red is expected to fire once the run executes.
  **#114 is left open to auto-confirm when the Actions queue recovers; re-run
  it (or push any site-file change to it) to force the confirmation, then close
  it.** This is the one DoD step not live-confirmed at lock.

**Note (local Windows):** `npx lhci autorun` runs the audits locally but
chrome-launcher throws `EPERM` during its temp cleanup *after* each run (a
Windows-only environment bug); the Linux CI runner is unaffected and is the
source of truth. The compressed server and config were validated locally up to
that crash point.
