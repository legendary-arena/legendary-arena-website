# WP-006 — Cloudflare Pages deploy + custom domain

Get `www.legendary-arena.com` live from this repo. Bind the custom
apex + www domains, redirect apex → www, configure CORS on
`brand-tokens.css` so `play.*` and `cards.*` can consume it
cross-origin, and prove the production deploy reproduces the local
build byte-for-byte by running the **exact** `npm run build` command
WP-005 locked.

This file is the **session-ready execution pack**. The design source
of truth is [`docs/03-ROADMAP.md` § WP-006](../../03-ROADMAP.md). If
this file and the roadmap conflict, the roadmap wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme as a Git submodule.
Pagefind search wired in WP-005. Brand tokens (`static/brand-tokens.css`
v1) consumed by `play.*` and `cards.*` via cross-origin link.

## Required reading (in order)

Before touching Cloudflare, DNS, or `_headers`, read these — they set
the bar:

1. `docs/01-VISION.md` — vision, Global invariants, Decisions log.
   Authoritative. The two invariants that load-bear here:
   - **Deterministic deploy** — same commit → same output;
     reproducible locally via a single documented command **that
     matches what CI runs**. WP-006 is the WP that turns "matches
     what CI runs" from theory into a binding contract.
   - **Brand tokens are an API contract.** Consumed cross-origin by
     `play.legendary-arena.com` and `cards.barefootbetters.com`.
     Breaking changes need a major bump and coordinated consumer
     updates. WP-006 is the WP that first publishes the contract at
     a stable URL.
2. `docs/03-ROADMAP.md` — full WP list. Read **WP-006** in detail
   (Goal, Deliverables, Constraints, DoD, Exit criteria, Failure
   conditions, Rollback). Re-read WP-005's lock notes — its
   single-command contract is what CF Pages must run verbatim.
   Skim WP-007a, WP-007b, WP-008 — they all start consuming this
   WP's output the moment it locks.
3. `README.md` — Prerequisites, Build, Local dev, Reproducibility,
   CI parity sections (locked under WP-005). The CI parity section
   is the line CF Pages must not cross.
4. `package.json` + `package-lock.json` — pinned Pagefind version
   (`1.5.2` exact, no range operator). Read the `build` script
   verbatim. CF Pages will run `npm ci && npm run build`; any drift
   from that command is a WP-006 failure.
5. `static/brand-tokens.css` — the version header (`Version: v1`).
   This file MUST be reachable cross-origin at
   `https://www.legendary-arena.com/brand-tokens.css` with permissive
   CORS once WP-006 is done.
6. `docs/04-CONTENT-CONVENTIONS.md` — Build pipeline section
   (locked under WP-005). The CF Pages config must be
   indistinguishable from what this section documents for local
   builds.
7. `hugo.toml` — note `baseURL = "https://www.legendary-arena.com/"`
   and `canonifyURLs = true`. The production build resolves absolute
   URLs against this base; CF Pages must not override it.
8. `.gitignore` — confirm `node_modules/`, `public/`, and Pagefind
   build artifacts are ignored before any build runs.
9. <https://developers.cloudflare.com/pages/configuration/build-configuration/>
   and
   <https://developers.cloudflare.com/pages/configuration/headers/>
   — Cloudflare Pages official docs for build config and the
   `_headers` file syntax. Note specifically: `_headers` lives at
   the **root of the build output** (i.e., `public/_headers` after
   Hugo runs); to ship it deterministically from Hugo, it goes in
   `static/_headers` so Hugo copies it to `public/_headers` on
   every build.

Don't read prior session transcripts; the committed artifacts are
the truth.

## Assumptions + DNS posture (read first)

- **DNS authority for `legendary-arena.com` is reachable.** This
  WP creates / modifies DNS records as required to bind the
  custom domains (CNAME for `www`; CNAME-flattening or A/AAAA
  for the apex, depending on whether DNS is on Cloudflare or
  elsewhere). The exact record set is determined by what CF Pages
  prompts for in Step 5; do not pre-create records before the
  prompt or you risk CF rejecting them as "unverified."
- **The Cloudflare account that owns the Pages project has access
  to the DNS zone for `legendary-arena.com`.** If DNS is on a
  different account or registrar, that's a Step 1 pre-flight
  blocker — surface and resolve before continuing.
- **Pre-WP-006 DNS state is recorded before any change.** Note the
  current records (whatever they are — empty, parking page, etc.)
  in the Step 9 Decisions log entry so rollback is one revert away
  if a record needs to be undone.

## Current state

What works (locked under WP-001 through WP-005, verified 2026-05-09):

- Brand tokens load and resolve in both modes (WP-002 + WP-003)
- Real content — home, about, one blog post (WP-004)
- `npm run build` produces a deterministic, byte-identical `public/`
  across runs from the same commit (WP-005, mechanical check via
  `Get-FileHash` + `Compare-Object` returned empty)
- Pagefind index lazy-loads on first interaction; production
  Lighthouse ≥ 90 on home and post in all four categories (WP-005)
- PaperMod's Fuse.js search removed; `data-pagefind-body` constrains
  scope to `<main>` (WP-005)
- `README.md` documents `npm ci && npm run build` as the single
  build command and explicitly names CF Pages as the consumer of
  that contract (WP-005, "CI parity" section)
- Submodule clean (`themes/PaperMod` at
  `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`, no `+` modification
  flag — verified through every prior WP lock)
- All commits pushed to `origin/main`

What's pending — **your job**:

- ❌ Cloudflare Pages project created and connected to the GitHub
  repo
- ❌ Build configuration: command `npm ci && npm run build`,
  output directory `public`, production branch `main`, Node version
  pinned
- ❌ Production branch deploy succeeds; first deploy reachable on
  the auto-generated `*.pages.dev` URL
- ❌ Custom domains bound: `legendary-arena.com` AND
  `www.legendary-arena.com`
- ❌ DNS records configured (CNAMEs / apex flattening / whatever the
  registrar+CF combo requires); HTTPS certs provisioned for both
- ❌ Apex `legendary-arena.com` 301-or-308 redirects to
  `www.legendary-arena.com` (canonical per vision.md)
- ❌ `static/_headers` committed; `brand-tokens.css` served with
  permissive CORS (`Access-Control-Allow-Origin`) so `play.*` and
  `cards.*` can fetch cross-origin
- ❌ Preview deploys enabled and verified end-to-end via a test PR
- ❌ Live-site verification: Lighthouse ≥ 90 against the production
  URL; zero console errors; no broken internal links;
  cross-origin fetch of `brand-tokens.css` succeeds; version `v1`
  visible in the response body

## Task

### Step 1 — Pre-flight + decide what NOT to change

Before opening the CF dashboard, confirm:

- WP-005 is ✅ Done in `03-ROADMAP.md` and the lock commit is on
  `origin/main`.
- `npm ci && npm run build` succeeds from a clean working tree.
  This is the exact command CF will run; if it fails locally, CF
  will fail too.
- DNS authority for `legendary-arena.com` is reachable (registrar
  login or, if DNS is already on Cloudflare, the right account).
- The Cloudflare account that will own the Pages project has access
  to the same zone that controls DNS for `legendary-arena.com`.

**Do not** at this step:

- Touch `package.json`, `package-lock.json`, the `build` script, or
  `hugo.toml`. WP-005 locked them. CF must adapt to them, not the
  other way around.
- Modify anything under `themes/PaperMod/` for any reason.
- Add new top-level dependencies. CF Pages reads `package.json`;
  if it's wrong here, it's wrong there.

If any pre-flight check fails, stop and surface — don't push CF
config that depends on a state that isn't true yet.

### Step 2 — Create the Cloudflare Pages project

In the Cloudflare dashboard, create a new Pages project connected
to the GitHub repo `legendary-arena/legendary-arena-website` (the
canonical repo per `01-VISION.md`).

**Build configuration — these values must match locally exactly:**

| Setting | Value | Why |
|---|---|---|
| Production branch | `main` | Single source of truth for the live site |
| Build command | `npm ci && npm run build` | Verbatim from `README.md` "CI parity" section |
| Build output directory | `public` | Hugo's default; matches what `npm run build` produces |
| Root directory | (blank / repo root) | Build runs at the repo root, same as locally |
| Node.js version | pin to the major used locally — **NOT** "latest" | Prevents silent Node major bumps from changing build behavior |
| Hugo version | pin via env var if CF supports it (e.g., `HUGO_VERSION = 0.161.1`); otherwise document the version assumption | Hugo Extended is required; theme requires modern Hugo APIs |

If CF Pages requires environment variables for Hugo version
selection (it does — `HUGO_VERSION`), set:

- `HUGO_VERSION` = the same major.minor.patch the repo expects
  (read from `README.md` Prerequisites; do not invent a version
  here)
- `NODE_VERSION` = the Node major used locally (read from
  `README.md` Prerequisites; do not invent)

Preview deploys: **enabled** for non-`main` branches and PRs. This
is a DoD checkbox; verify the toggle is on before saving.

**No additional build steps** beyond `npm ci && npm run build`.
Don't add a "post-build" hook, a "deploy" hook, or any custom
script that runs in CF but not locally. The contract is single-
command, identical-everywhere.

### Step 3 — First deploy + parity check (no custom domain yet)

Trigger the first production deploy by pushing to `main` (or by
hitting "Retry deployment" on the CF dashboard if the connection
already triggered a build).

When the build completes, the site will be reachable at the auto-
generated URL `https://<project-name>.pages.dev`. Use this URL
for the parity check **before** binding custom domains; if the
parity check fails, fix it on `*.pages.dev` first. DNS work after
this step is mechanical; the parity check is the quality gate.

Parity verifications (mechanical):

- [ ] CF build log shows `npm ci` and `npm run build` running, in
  that order, with no additional commands.
- [ ] CF build log shows Hugo's "Pages |" summary line followed by
  Pagefind's "Building index for…" output. If Pagefind didn't run,
  the index won't ship — that's a regression vs WP-005.
- [ ] The deployed site at `*.pages.dev` matches the local
  `public/` output for at least three pages: `/`, `/about/`, and
  the launch announcement post. Spot-check the rendered HTML in
  DevTools "View source" — same hero copy, same CTA href, same
  three `params.sections` cards on home.
- [ ] `https://<project-name>.pages.dev/pagefind/pagefind-ui.js`
  is fetchable (200 OK). If 404, Pagefind didn't run or its output
  wasn't included in the deploy artifact.
- [ ] Search works on `*.pages.dev`: typing "arena" returns at
  least one result; searching "Iron Fist" returns zero.

If any parity check fails, **stop and fix before binding domains**.
The fix is almost always one of:

- CF build env doesn't have Node — set `NODE_VERSION`
- CF build env doesn't have the right Hugo — set `HUGO_VERSION`
- CF treats this as a "Hugo project" and skips `npm ci` — explicitly
  set the build command, don't rely on framework auto-detection

### Step 4 — Add `static/_headers` for CORS (commit before binding domains)

Cloudflare Pages reads a `_headers` file at the root of the build
output. Hugo copies anything under `static/` verbatim into `public/`,
so the deterministic place for this file is `static/_headers` —
that way the CORS contract is reproducible from the same commit
that ships the brand tokens (no out-of-band CF dashboard config).

Commit `static/_headers` with at minimum the brand-tokens CORS
header:

```
/brand-tokens.css
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=3600, must-revalidate
```

Rationale for `Access-Control-Allow-Origin: *`:

- v1 cross-origin consumers are `play.legendary-arena.com` and
  `cards.barefootbetters.com` — both LA-controlled.
- The file is a public CSS contract (already documented as such in
  the version header). Wildcard CORS is the simplest correct answer
  for a token file meant to be consumed publicly.
- The alternative — explicitly listing each consumer origin —
  requires CF dashboard config or a header-rewriting worker for
  each new consumer; the wildcard is statically reproducible from
  the repo and matches how public design tokens are typically
  served.

Rationale for `Cache-Control: public, max-age=3600, must-revalidate`
(NOT `immutable`):

- The brand-tokens API contract locked under WP-002 is **single
  URL, version-in-body**: consumers fetch `/brand-tokens.css` and
  read the `Version: v1` header comment to verify the contract.
  v1→v2 is a coordinated consumer swap on the SAME URL, not a
  multi-URL hosting model.
- `immutable` tells browsers "this URL's bytes will never change."
  That's true within a v1 lock — but a future v2 bump that
  rewrites the file at the same URL would deliver the new contract
  to caches that have promised never to revalidate. Misalignment
  between the cache directive and the API contract.
- Filename-based versioning (`brand-tokens.v1.css`,
  `brand-tokens.v2.css`) WOULD make `immutable` safe, but it's a
  breaking change to the WP-002 v1 lock and the cross-site
  contract pattern documented in `01-VISION.md` Global invariants.
  That is its own future WP if pursued; do NOT introduce it here.
- 1 hour `max-age` cuts revalidation ~12× vs the alternative
  5-minute window while still propagating brand-token updates
  within a coffee-break window — the right tradeoff for an
  unversioned contract URL under v1's stability assumption.
- `must-revalidate` means consumers will re-check past the
  TTL window rather than serving stale forever.

**Do NOT** add caching directives that conflict with CF Pages'
default immutability rules for hashed asset filenames; only set
`Cache-Control` on the explicitly-named files (`/brand-tokens.css`).
Hugo doesn't fingerprint `static/` files, so the brand-tokens URL
is stable across builds and the 5-minute TTL is the only stale-
risk window.

After committing, push and wait for CF to redeploy. Verify on
`*.pages.dev`:

- [ ] `curl -I https://<project-name>.pages.dev/brand-tokens.css`
  returns `200`, `Access-Control-Allow-Origin: *`, and the
  expected `Cache-Control` value.
- [ ] `curl https://<project-name>.pages.dev/brand-tokens.css | head`
  shows the version header comment block (`Version: v1`).

If CORS isn't applied, the most likely cause is the `_headers`
file landed in the wrong location. It MUST be at
`public/_headers` after Hugo runs (which means `static/_headers`
in the repo). `git ls-files static/_headers` should show it
tracked; `npm run build && Get-Content public/_headers` should
show its contents in the build output.

### Step 5 — Bind custom domains + DNS

In the CF Pages dashboard for this project, add both custom
domains:

- `www.legendary-arena.com`
- `legendary-arena.com` (apex)

Cloudflare will instruct what DNS records to create:

- For `www`: a `CNAME` to `<project-name>.pages.dev`. If
  `legendary-arena.com` is already on Cloudflare DNS, CF can manage
  this automatically.
- For the apex: Cloudflare's "CNAME flattening" lets you `CNAME`
  the apex to `<project-name>.pages.dev` on Cloudflare DNS. If
  the registrar is elsewhere, an `A` / `AAAA` record to CF's
  anycast IPs is the fallback per CF's docs.

Wait for HTTPS cert provisioning on both domains (typically a few
minutes; can take longer if DNS just changed). The CF dashboard
shows certificate status; both must read "Active" before
proceeding.

Verifications:

- [ ] `https://www.legendary-arena.com/` loads the site (no cert
  warning, no mixed-content warnings in DevTools console).
- [ ] `https://legendary-arena.com/` resolves at the network level
  (no NXDOMAIN, no cert error). Whether it redirects to www is
  Step 6's job; this step just confirms DNS + cert.

### Step 6 — Apex → www redirect (canonical = www)

Per `01-VISION.md`, `www.legendary-arena.com` is canonical. The
apex must redirect to it with a `301` or `308`, not duplicate
content.

**Mechanism — REQUIRED:**

- **(A) `_redirects` file — REQUIRED.** Commit `static/_redirects`
  with:
  ```
  https://legendary-arena.com/* https://www.legendary-arena.com/:splat 301!
  ```
  The trailing `!` forces the redirect even when the apex would
  otherwise serve content; without it, CF treats apex-served pages
  as a fallback. Reproducible from the same commit; this is the
  ONLY acceptable mechanism for a normal lock.

**Mechanism — PROHIBITED (except as documented temporary
emergency override):**

- **(B) Cloudflare Bulk Redirect / Page Rule on the apex.**
  Prohibited. The redirect rule would live in the dashboard, not
  the repo, breaking the in-repo reproducibility invariant
  (`01-VISION.md` Global invariants — same commit → same output).
  An audit reading `static/_redirects` would silently see the
  wrong rule, or no rule. The only circumstance this is acceptable
  is a documented temporary emergency override: a `_redirects`
  bug is blocking apex DNS and (A) cannot be hot-fixed inside the
  cert-issuance window. In that case, the dashboard rule MUST be
  recorded in `01-VISION.md` Decisions log under a "Temporary CF
  dashboard override" entry citing the failure mode, an explicit
  remediation deadline, and a follow-up cleanup WP that returns
  the redirect to (A). Without that paper trail, (B) is a
  WP-006 failure condition.

Implementation flow: commit `static/_redirects`, push, wait for the
redeploy, then verify:

- [ ] `curl -I https://legendary-arena.com/` returns `301` or
  `308` with `Location: https://www.legendary-arena.com/`.
- [ ] `curl -I https://legendary-arena.com/about/` redirects to
  `https://www.legendary-arena.com/about/` (path preserved via
  `:splat`).
- [ ] In a browser, navigating to `legendary-arena.com` lands on
  `www.legendary-arena.com` with the URL bar showing the canonical
  form. Browser caches the redirect on first visit (301) — a hard
  refresh confirms it's a real server-side redirect, not a soft
  client-side hop.

Document the redirect choice (A vs B) in
`docs/04-CONTENT-CONVENTIONS.md` under the "Production deploy"
section (creating it if needed).

### Step 7 — Preview deploys end-to-end

Open a small, no-content PR against `main` to verify CF auto-
creates a preview deploy. The PR can be a typo fix or a no-op
README touch — it must be a real PR, since preview deploy is
specifically the per-PR codepath.

Verifications:

- [ ] CF dashboard shows a preview deployment created for the PR
  branch.
- [ ] The PR comment thread (or CF GitHub integration) posts a link
  to the preview URL — `<branch>--<project-name>.pages.dev` or
  similar.
- [ ] The preview URL serves a working version of the site that
  reflects the PR's changes.
- [ ] The preview build log shows the same `npm ci && npm run
  build` invocation as the production build. No drift.

Close the test PR (merge or close-without-merge — your call) once
preview deploy is confirmed. Don't leave a synthetic PR open just
to keep the preview alive.

### Step 8 — Verify the live site

The verification approach proven in WP-003 + WP-004 + WP-005 is
reusable. Run all checks against the **production URL**, not the
`*.pages.dev` URL or `localhost`.

1. **Build log review** — the most recent production deploy log
   shows `npm ci` + `npm run build` only. Build duration is in line
   with local. No warnings about missing Hugo, missing Node, or
   framework mis-detection.
2. **Functional check** — `https://www.legendary-arena.com/`:
   - Hero "The arena awaits." renders with Bebas Neue (computed
     `font-family` resolves through the brand-tokens stack).
   - Three `params.sections` cards visible.
   - "Play now" CTA visible above the fold on desktop AND mobile
     (375 × 667). The four-combo CTA test from WP-004 still passes.
   - About page loads at `/about/`.
   - Launch announcement post loads at
     `/posts/2026-05-07-launch-announcement/`.
   - Search input renders in the header in both modes; `/` and
     `Ctrl+K` focus it; typing "arena" returns results; "Iron Fist"
     returns zero.
3. **Apex redirect** — `https://legendary-arena.com/` (any path)
   redirects to `https://www.legendary-arena.com/` (same path).
4. **CORS contract** —
   `curl -I -H "Origin: https://play.legendary-arena.com" https://www.legendary-arena.com/brand-tokens.css`
   returns `200` + `Access-Control-Allow-Origin: *` (or echoed
   origin, depending on CF behavior with wildcard). The version
   header `Version: v1` is in the response body
   (`curl https://www.legendary-arena.com/brand-tokens.css | head`).
5. **Lighthouse** — re-run on home + at least one blog post against
   the live URL:
   ```powershell
   npx lighthouse@12 https://www.legendary-arena.com/ `
     --output=json --output-path=lighthouse-home-wp006.json `
     --chrome-flags="--headless --no-sandbox --disable-gpu" `
     --only-categories=performance,accessibility,best-practices,seo `
     --quiet

   npx lighthouse@12 https://www.legendary-arena.com/posts/2026-05-07-launch-announcement/ `
     --output=json --output-path=lighthouse-post-wp006.json `
     --chrome-flags="--headless --no-sandbox --disable-gpu" `
     --only-categories=performance,accessibility,best-practices,seo `
     --quiet
   ```
   All four categories must remain ≥ 90 on home and on the post.
   The raw JSON is local-only; don't commit (consistent with
   WP-003 / WP-004 / WP-005). Production-served Lighthouse numbers
   are the lock numbers — they will likely match or beat the
   WP-005 production-build numbers since CF serves with
   compression and proper cache headers by default.
6. **Console clean** — open DevTools on home + post + after running
   a search on the live site. Zero errors, zero page errors, zero
   failed network requests. The CF deploy must not introduce a
   console error that wasn't present locally (most likely culprits:
   mixed content from a hardcoded `http://` link, missing asset
   from a Hugo URL canonicalization edge case).
7. **Internal link sweep** — exhaustively confirm no 404s. Either
   click every internal link manually (small site; tractable) or
   use `npx broken-link-checker https://www.legendary-arena.com/`
   for a recursive sweep. Any 404 is a failure condition. (External
   links are out of scope for this WP — they can break post-launch
   for reasons CF doesn't control.)
8. **Submodule clean** — `git submodule status` shows
   `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926 themes/PaperMod (heads/master)`
   with no `+` modification flag. WP-006 must not touch the theme.
9. **Reproducibility — production-build sanity** — one final
   `npm ci && npm run build` run locally; `Compare-Object` over
   SHA-256 hashes of `public/` against the previous lock-pass run.
   Empty diff confirms WP-005's reproducibility contract still
   holds after WP-006's `static/_headers` and `static/_redirects`
   additions.

### Step 9 — Lock WP-006

When all DoD + exit criteria pass:

1. Update `docs/03-ROADMAP.md`:
   - WP-006: ⏸️ Pending → ✅ Done
   - Tick all DoD + exit criteria boxes
   - Record final commit hash(es) under `**Commits:**`
   - Record the four Lighthouse scores (Performance / Accessibility
     / Best Practices / SEO) for home + blog post measured against
     the live URL, matching the WP-004 / WP-005 format
   - Record the `*.pages.dev` project name (so future ops can find
     the CF Pages project without dashboard archaeology)
2. Add a Decisions log entry to `docs/01-VISION.md` recording:
   - Apex-redirect mechanism: (A) `static/_redirects` (the REQUIRED
     mechanism per Step 6). If a Temporary CF dashboard override
     was used, log it as a separate "Temporary CF dashboard
     override" entry citing the failure mode, an explicit
     remediation deadline, and a follow-up cleanup WP that returns
     the redirect to (A).
   - CORS posture for `brand-tokens.css`:
     `Access-Control-Allow-Origin: *` + `Cache-Control: public,
     max-age=3600, must-revalidate`. Capture **both** the cache
     value AND the underlying governance commitment: WP-006 commits
     to interpreting WP-002's v1 → v2 "coordinated consumer update"
     contract as a coordinated swap on the SAME URL
     `/brand-tokens.css` (not filename-versioned URLs like
     `brand-tokens.v1.css`); cache-control `max-age=3600` is
     calibrated for that interpretation, while `immutable` would
     require filename versioning. A future WP that proposes
     filename versioning is renegotiating the contract and must
     update this entry. Rationale for `max-age=3600`: 1-hour TTL
     trades a small egress cost for sub-coffee-break propagation
     under the unversioned single-URL v1 contract.
   - The pinned `HUGO_VERSION` and `NODE_VERSION` env-var values
     in CF Pages (so a future CF account migration or environment
     reset doesn't re-derive the wrong values).
   - **Pre-WP-006 DNS state** for `legendary-arena.com` (the
     records that existed before this WP changed them — apex,
     www, MX, TXT, anything else present). This is the rollback
     baseline: without it, undoing a DNS change requires
     archaeology. Recording the snapshot here makes one-step
     rollback possible.
3. Update `docs/04-CONTENT-CONVENTIONS.md` with a "Production
   deploy" section pointing at `static/_headers`, `static/_redirects`
   (if A), and the `*.pages.dev` project name. Future contributors
   shouldn't have to grep CF for the redirect rule.
4. Commit at logical milestones throughout the session, then push.

## Constraints

- **Build command parity is non-negotiable.** CF runs
  `npm ci && npm run build`, **nothing else**. No additional build
  steps, no environment-specific code paths, no "if CF then X"
  branches. Drift between local and CF is the failure mode this
  WP exists to prevent.
- **Brand artifacts are locked.** Do NOT modify
  `docs/brand/{strategy,palette,typography,spacing}.md`,
  `static/brand-tokens.css` token values, `package.json`,
  `package-lock.json`, the `build` script, or `hugo.toml` `baseURL`
  / `canonifyURLs`. WP-006 is a deploy WP, not a build-config WP.
- **No `themes/PaperMod/` source modifications.** Verified via
  `git submodule status` showing no `+` flag (per WP-003 lock).
- **Apex must redirect, not duplicate.** Two URLs serving the
  same content harms SEO and confuses sharing. Canonical is www.
- **CORS on `/brand-tokens.css` is mandatory.** WP-007a and
  WP-007b cannot start until consumers can fetch this file
  cross-origin. Verify with `curl -I` before locking.
- **Token version must be visible in the response.** The
  `Version: v1` header comment in `brand-tokens.css` is how
  consumers verify which contract is live. Don't strip comments
  via Hugo minification; the file is in `static/` and is copied
  verbatim.
- **Preview deploys must be enabled.** Required for safe iteration
  on the marketing site after WP-006 (every future content WP
  benefits).
- **No external service dependencies introduced.** This WP wires
  CF Pages — that's it. No analytics, no monitoring, no CDN-
  beyond-CF, no Workers. If a real need surfaces, raise it as a
  separate WP.
- **No out-of-scope CF dashboard changes.** The CF dashboard
  operations REQUIRED by this WP are explicitly enumerated:
  (1) creating the Pages project + setting build config + env
  vars (Step 2), (2) binding the two custom domains (Step 5),
  (3) confirming preview-deploy toggles (Step 2 + Step 7). Any
  other dashboard-level mutation (Workers, Page Rules, Bulk
  Redirects, Transform Rules, Access policies, Bot Fight Mode
  changes, custom Cache Rules, anything that lives in the
  dashboard but not the repo) is OUT OF SCOPE for this WP. If a
  legitimate need surfaces during execution, stop and raise it as
  a separate WP — do not silently mutate CF state. Dashboard
  config that lives outside the repo violates the in-repo
  reproducibility invariant; the only audit trail then is the
  CF audit log, which the project doesn't read.
- **HTTPS only.** No HTTP fallback. CF Pages enforces HTTPS by
  default; verify it's not been disabled.
- **DNS changes are reversible.** Note the prior DNS records
  before changing them so rollback (per Failure conditions) is
  one revert away.

## Definition of Done

- [ ] Cloudflare Pages project created and connected to
  `legendary-arena/legendary-arena-website`
- [ ] Build command set to `npm ci && npm run build` (verbatim);
  output dir `public`; production branch `main`; `HUGO_VERSION`
  and `NODE_VERSION` env vars pinned to repo-documented majors
- [ ] Production deploy succeeds; build log shows
  `npm ci` + `npm run build` and includes both Hugo's and
  Pagefind's outputs
- [ ] `https://www.legendary-arena.com` loads the site over HTTPS
- [ ] `static/_redirects` committed (the REQUIRED apex-redirect
  mechanism per Step 6); no CF dashboard redirect rule in use
  unless logged as a Temporary CF dashboard override in
  `01-VISION.md` Decisions log
- [ ] `curl -I https://legendary-arena.com/` returns `301` or `308`
  with `Location: https://www.legendary-arena.com/`
- [ ] `curl -I https://legendary-arena.com/about/` returns `301` or
  `308` with `Location: https://www.legendary-arena.com/about/`
  (path preservation via `:splat`)
- [ ] Pushing to `main` triggers an automatic redeploy
- [ ] Opening a PR creates a preview deploy (verified end-to-end
  via a real test PR)
- [ ] HTTPS works on apex and www (no cert errors, no mixed-content
  warnings)
- [ ] `static/_headers` committed
- [ ] `curl -I https://www.legendary-arena.com/brand-tokens.css`
  returns `200` with `Access-Control-Allow-Origin: *` and
  `Cache-Control: public, max-age=3600, must-revalidate`
- [ ] `curl https://www.legendary-arena.com/brand-tokens.css | head`
  shows the `Version: v1` header comment in the response body
- [ ] Live site matches local build for home / about / launch
  post (spot check)
- [ ] No console errors on the live site (DevTools → Console
  clean on home, about, post, after running a search)
- [ ] All internal links resolve (no 404s)
- [ ] Lighthouse ≥ 90 on home + post, all four categories,
  measured against the live URL
- [ ] Submodule clean
- [ ] `docs/04-CONTENT-CONVENTIONS.md` updated with Production
  deploy section
- [ ] WP-006 marked ✅ Done in `03-ROADMAP.md` with commits +
  Lighthouse scores + `*.pages.dev` project name
- [ ] Structural choices logged in `01-VISION.md` Decisions log
  (apex-redirect mechanism, CORS posture, pinned `HUGO_VERSION`
  and `NODE_VERSION`)
- [ ] All commits pushed to `origin/main`

## Failure conditions (explicit)

WP-006 must NOT be locked if any of the following are true:

- CF Pages build command differs from `npm ci && npm run build`
  (any extra step, any deletion, any reorder)
- CF Pages build log doesn't show both Hugo's and Pagefind's
  outputs (search would be missing on production)
- Live site at `https://www.legendary-arena.com/` differs from
  the local `public/` output for home, about, or the launch post
  (build divergence)
- `https://legendary-arena.com/` does NOT redirect to
  `https://www.legendary-arena.com/` (apex serving duplicate
  content)
- Apex redirect implemented via CF dashboard rule (option B)
  WITHOUT a Temporary CF dashboard override entry in
  `01-VISION.md` Decisions log naming the failure mode,
  remediation deadline, and follow-up cleanup WP
- A CF dashboard mutation outside the explicit Step 2 / Step 5 /
  Step 7 scope was made during this session (out-of-scope infra
  drift)
- HTTPS fails on either apex or www (cert error, mixed-content
  warning, missing `Strict-Transport-Security` is acceptable for
  v1 but flag it)
- `Access-Control-Allow-Origin` header missing or wrong on
  `/brand-tokens.css` (WP-007a / WP-007b would be blocked)
- `Version: v1` header comment missing from the response body of
  `/brand-tokens.css` (consumers can't verify the contract)
- Console errors present on the live site that weren't present
  locally
- Any 404 on an internal link
- Lighthouse score drops below 90 on home OR post in any of the
  four categories on the live URL
- Preview deploys not creating on PRs (verified with a real test
  PR)
- `themes/PaperMod/` modified (`git submodule status` shows `+`
  flag)
- `package.json` / `package-lock.json` / `hugo.toml` / the `build`
  script modified by this WP (those are WP-005 lock state; this
  WP only adds `static/_headers` and `static/_redirects`)

A failure condition firing means WP-006 regresses to ⏸️ Pending
until the issue is resolved.

## Rollback

CF Pages: revert to the previous deployment via the dashboard
(one click, instant). Sufficient for build-output regressions.

DNS / domain: if the apex or www binding misbehaves, remove the
custom domain from CF Pages and the site reverts to being served
only at `*.pages.dev`. DNS records can be reverted at the registrar
or in the CF DNS panel using whatever pre-WP-006 state was noted
in Step 5.

Repo: revert offending commits on `main`, push; CF Pages auto-
redeploys to the prior known-good state. WP-005 lock state is
fully recoverable (the local `npm run build` contract is unchanged
by this WP — only the `static/_headers` and optional
`static/_redirects` files are added).

If everything goes catastrophically wrong (cert provisioning fails
for hours, CF Pages hits a regional outage, etc.), the fallback is
to leave the site on `*.pages.dev` and bind the custom domain
later. The marketing site has no traffic-critical SLO — a delayed
custom-domain bind is annoying, not disastrous.

## What's NOT in scope

- WP-007a (`play.legendary-arena.com` deploy) — separate WP.
  WP-006 hands WP-007a a working
  `https://www.legendary-arena.com/brand-tokens.css` with CORS;
  WP-007a deploys `arena-client` and consumes the file
  cross-origin.
- WP-007b (registry-viewer brand integration at
  `cards.barefootbetters.com`) — separate WP. Same handoff as
  WP-007a, different consumer.
- WP-008 (SEO baseline / Schema.org markup) — separate WP. The
  external validators (Rich Results, FB Debugger, Twitter
  Validator, Search Console) will run against the live URL this
  WP produces, but they're WP-008's job, not WP-006's.
- WP-009 (class-color usage audit) — separate WP, spec draft
  pending review.
- Analytics integration (Cloudflare Web Analytics, Plausible,
  Google Analytics, etc.) — explicitly deferred per
  `03-ROADMAP.md` "Beyond the current WPs" section. Decide
  post-launch.
- Custom CF Workers, CF Functions, edge logic — out of scope. CF
  Pages is enough for a static marketing site; introducing
  Workers would expand surface area unnecessarily.
- WAF / rate-limiting / bot management beyond CF defaults — out
  of scope. Static marketing site has no auth surface to protect.
- Migrating registry from `cards.barefootbetters.com` to
  `registry.legendary-arena.com` — explicitly deferred per
  `01-VISION.md` Decisions log 2026-05-07. Separate scoped WP
  later.
- Brand-token v2 changes — would require a `CHANGELOG.md` entry
  and coordinated consumer updates per the v1 rules. WP-006 only
  publishes v1 to a stable URL; it does not bump the version.
- Real branded logo / favicons — deferred per `01-VISION.md`
  Decisions log; placeholders remain.

## Authority

Subordinate to `docs/01-VISION.md` (highest), then `03-ROADMAP.md`,
then this file. If anything here conflicts with vision or roadmap,
those win — surface the conflict before proceeding.

`docs/01-VISION.md` Global invariants are bright lines: same
commit → same output, brand tokens are an API contract, no
retroactive breakage of completed WPs. WP-006 is the WP that turns
those invariants into observable production behavior.

`docs/brand/strategy.md` is the canonical authority for voice, tone,
terminology, and CTA contract. WP-006 doesn't author copy or
templates, so the brand failure modes (`§ 10`) apply only to any
incidental copy this session might add (e.g., a CF Pages
`description` field, a deploy message). When in doubt, defer.

## Post-execution amendment (2026-05-09)

The original Step 6 locked decision specified `static/_redirects` as
the REQUIRED mechanism for the apex → www redirect, and PROHIBITED
the Cloudflare dashboard "Bulk Redirect / Page Rule" path (option
B) for normal locks. During execution this was discovered to be
**technically incorrect**: Cloudflare Pages' `_redirects` engine
does NOT support full-URL source patterns (e.g.,
`https://example.com/* https://www.example.com/:splat 301!`). It
accepts path-only sources only (`/path /dest 301`). The committed
`static/_redirects` file (`f397807`) was silently ignored by CF;
the apex continued to serve duplicate content.

Reference (CF official docs, consulted at execution time):
- `https://developers.cloudflare.com/pages/configuration/redirects/`
  — documents path-only source syntax
- `https://developers.cloudflare.com/pages/how-to/www-redirect/`
  — explicitly directs apex<->www users to CF Bulk Redirects /
  Single Redirects (zone-level features), not `_redirects`

The apex-redirect mechanism was amended at WP-006 lock to a
zone-level **Cloudflare Redirect Rule** on the `legendary-arena.com`
zone, created via CF's "Redirect from root to WWW" template:

- Wildcard source pattern: `https://legendary-arena.com/*`
- Dynamic target: `https://www.legendary-arena.com/${1}`
- Status: 301 Permanent Redirect
- Preserve query string: ON

The original `static/_redirects` commit was reverted in PR #1
(squash-merged as `3871d7d`); the file no longer exists in the
tree.

The full justification — including the in-repo reproducibility
argument that originally motivated rejecting option B, and how
that intent is preserved in spirit (zone Redirect Rules can be
exported via Wrangler CLI or Terraform if config-as-code becomes
load-bearing) — is recorded in `docs/01-VISION.md` Decisions log
entry 2026-05-09 (WP-006 lock).

Two related zone-level settings on the `legendary-arena.com`
Cloudflare zone are also load-bearing for the WP-006 contracts to
hold and are noted in the same Decisions log entry:
- **Caching → Configuration → Browser Cache TTL: "Respect Existing
  Headers"** (required so `static/_headers` Cache-Control values
  actually reach clients; CF's default 4-hour zone TTL otherwise
  overrides)
- **AI Crawl Control / Managed robots.txt: OFF** (kept Hugo's
  clean `User-agent: *` robots.txt; CF was injecting a
  `Content-Signal:` directive Lighthouse v12 didn't recognize,
  causing a cosmetic SEO=92 regression)

## Background

WP-005 locked on 2026-05-09:

- `npm run build` is single-command, deterministic, byte-identical
  across consecutive runs from the same commit (`Compare-Object`
  over SHA-256 hashes of every file in `public/` returned empty).
- Pagefind 1.5.2 exact-pinned in `package.json`; `npm ci` gives
  byte-stable installs.
- Production Lighthouse home: 92 / 100 / 100 / 100. Post: 93 / 100
  / 100 / 100. (Performance variance documented in WP-005 lock
  notes.)
- `README.md` "CI parity" section explicitly names CF Pages as the
  consumer of the single-command contract: "must run the exact same
  command: `npm ci && npm run build`. No additional build steps
  are permitted in CI."
- Submodule clean.

WP-006 is the WP that puts the WP-005 contract in front of a CDN.
Most of the WP is dashboard-and-DNS work; the only repo-level
changes are `static/_headers` (CORS contract) and optionally
`static/_redirects` (apex → www). The two files are small, but
they are first-class artifacts: they live in the repo for the same
reason the build command lives in `package.json` — so the
production posture is reproducible from a clean clone.

After WP-006 locks, three WPs unblock simultaneously: WP-007a,
WP-007b, and WP-008. The Global invariant "brand tokens are an
API contract" stops being theoretical and starts being
load-bearing. Don't lock this WP until the CORS check, the version
header check, and the apex redirect have all passed against the
live URL — those are the three things WP-007a/b/008 will assume
on day one.

Hugo dev (`hugo server`) and the local production-build path
(`npm run build` then `python -m http.server` from `public/`) both
remain available throughout this WP. Use whichever is appropriate
for the verification step you're running. The CF preview URL
(`*.pages.dev` or `<branch>--<project-name>.pages.dev`) is the
right surface for build-parity verification before binding the
custom domain.
