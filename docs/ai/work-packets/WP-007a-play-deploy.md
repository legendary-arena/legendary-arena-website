# WP-007a — play.legendary-arena.com deploy

Stand up `play.legendary-arena.com` as a Cloudflare Pages deploy of
`apps/arena-client` from the engine monorepo, consuming brand tokens
cross-origin from `https://www.legendary-arena.com/brand-tokens.css`
(with a bundled local fallback) and presenting a unified header /
footer that matches www. No engine code changes for branding-only
reasons; no game-flow regressions.

This file is the **session-ready execution pack**. The design source
of truth is [`docs/03-ROADMAP.md` § WP-007a](../../03-ROADMAP.md). If
this file and the roadmap conflict, the roadmap wins.

## Post-execution amendment (2026-05-09; WP-144 backfill)

The first execution attempt on 2026-05-09 paused at Step 1 pre-flight:
the originally locked CF Pages build command
`pnpm install --frozen-lockfile && pnpm --filter @legendary-arena/arena-client build`
fails on a fresh tree because the single-package pnpm filter does not
transitively build workspace dependencies, and
`packages/game-engine/dist/` is gitignored. Engine-side **WP-144**
(landed at engine-repo commits `bb0493c` EC-144 + `8a0621a` close)
fixed the underlying boundary by introducing subpath exports
(`@legendary-arena/game-engine` runtime + `@legendary-arena/game-engine/setup`
for Node-IO setup tooling) and codifying the runtime / setup-tooling
Layer Boundary as **D-14401**. The mechanical unblock for this WP is
the trailing `...` topology selector — `pnpm --filter "@legendary-arena/arena-client..." build`
builds the package and its workspace dependencies in dependency order.

This amendment replaces every quote site of the original build command
in this file (and in [`docs/ai/invocations/session-wp007a-play-deploy.md`](../invocations/session-wp007a-play-deploy.md))
with the topology-filtered form. Dev-server invocations
(`pnpm --filter @legendary-arena/arena-client dev`) are intentionally
unchanged — `dev`'s fresh-tree fragility is a separate concern out of
WP-007a / WP-144 scope. See `docs/01-VISION.md` Decisions log for the
2026-05-09 WP-007a pause entry and the post-WP-144 receipt.

The rest of this WP is otherwise unchanged from its pre-amendment
shape. Step 7's "Configuration immutability rule" still applies
verbatim to the amended command — CF Pages's build command must be
`pnpm install --frozen-lockfile && pnpm --filter "@legendary-arena/arena-client..." build`
exactly, and any future change requires a separate WP + Decisions log
entry.

## Authority note (read before starting)

WP-007a is a **dual-repo WP**:

- The WP file, the roadmap, vision, brand tokens, and the live
  `brand-tokens.css` URL contract all live in this repo
  (`legendary-arena/legendary-arena-website`, working dir
  `C:\www\legendary-arena-com\`).
- The actual `arena-client` source, build, and deploy artifacts all
  live in the **engine monorepo** (current repo:
  `barefootbetters/legendary-arena`; future repo per
  `01-VISION.md` Decisions log: `legendary-arena/legendary-arena-game`;
  working dir on this machine: `C:\pcloud\BB\DEV\legendary-arena\`).

The engine monorepo has its own governance system
(`CLAUDE.md`, `.claude/rules/*.md`, `docs/ai/ARCHITECTURE.md`,
work-packets / execution-checklists). When this WP edits files inside
`apps/arena-client/**`, those edits are subject to the engine
repo's rules — particularly the **Layer Boundary** rules
(`.claude/rules/architecture.md`). The brand-token integration in
this WP is UI/CSS-only and does not cross any engine layer
boundary, but the executor MUST NOT take this WP as license to
change engine-side gameplay, registry, or server code "while in
the area." If a real engine-side change surfaces during execution,
stop and raise it as a separate engine-repo WP.

The marketing-site roadmap is the design source for **what WP-007a
does**; the engine-repo rules are the constraint for **how the
arena-client edits land**. Both win in their own domains. If they
appear to conflict, surface the conflict before proceeding.

## Execution discipline (non-negotiable)

This WP executes in **strict integration mode**, not feature mode.

Scope is LIMITED to:

- Static asset wiring (`apps/arena-client/index.html`,
  `apps/arena-client/public/*`)
- UI presentation (`apps/arena-client/src/components/branding/*`,
  `apps/arena-client/src/styles/*`)
- Deployment configuration (Cloudflare Pages project, DNS,
  `_redirects`)
- Marketing-repo lock metadata (`03-ROADMAP.md`, `01-VISION.md`
  Decisions log)
- Engine-repo ops metadata (`docs/ops/domains.json`,
  `docs/ops/DOMAINS.md`)

Scope EXCLUDES:

- Gameplay logic of any kind
- State-shape changes (Pinia stores, fixture types, replay format)
- Network / API behavior (`bgioClient.ts`, `lobbyApi.ts`, profile
  APIs)
- Engine packages (`packages/game-engine`, `packages/registry`,
  `packages/preplan`, `packages/vue-sfc-loader`, `apps/server`)
- Brand-token contract values (`static/brand-tokens.css` in the
  marketing repo)
- Test infrastructure beyond fixing tests broken by the
  brand-integration edits themselves

Any required change outside this scope MUST:

1. Halt execution.
2. Be written as a separate WP in the correct repo (engine-side
   work → engine-repo WP per `.claude/rules/work-packets.md`;
   marketing-side work → new entry in `03-ROADMAP.md`).
3. Be explicitly approved before proceeding.

**No "while we're here" edits are permitted.** A diff that touches
files outside the scope list above is a WP-007a failure condition,
even if the touched files compile and tests pass.

## Working directory

This WP touches files in two working directories:

- `C:\www\legendary-arena-com\` — marketing site repo. The brand-token
  contract URL lives here and is locked under WP-006. This WP **does
  not modify** any file in this repo at execution time except the WP
  file itself (post-lock amendments) and the roadmap / vision lock
  entries. The repo is read-only consulted; the only outbound
  artifact is the live `brand-tokens.css` URL.
- `C:\pcloud\BB\DEV\legendary-arena\` — engine monorepo, pnpm
  workspaces, Node ≥ 22 (`packageManager: pnpm@10.32.1`,
  `engines.node: ">=22"` per the root `package.json`). All
  arena-client code edits and deploy-config changes happen here. The
  `apps/arena-client/` package builds with Vite 5 and outputs to
  `apps/arena-client/dist/`.

When the WP says "commit," the repo it commits to is the **engine
monorepo** unless the file path is under `C:\www\legendary-arena-com\`.

## Required reading (in order)

Before touching arena-client, Cloudflare, or DNS, read these — they
set the bar:

1. **Marketing-site governance:**
   - `C:\www\legendary-arena-com\docs\01-VISION.md` — vision, Global
     invariants, Decisions log. Authoritative on the marketing-site
     side. Two invariants load-bear here:
     - **Brand tokens are an API contract** consumed cross-origin by
       `play.legendary-arena.com`. v1 → v2 requires coordinated
       consumer updates BEFORE the new tokens publish. WP-007a is
       the WP that first wires `play.*` as a real consumer.
     - **No retroactive breakage.** WP-002 v1 LOCKED for WWW
       explicitly carved out cross-site consumption — that
       consumption is verified in this WP. If anything in here
       requires a token change, stop: the "v1 LOCKED for WWW" lock
       trips the no-retroactive-breakage invariant and a v2 bump is
       a separate WP.
   - `C:\www\legendary-arena-com\docs\03-ROADMAP.md` — full WP list.
     Read **WP-007a** in detail (Goal, Deliverables, Cross-site
     contract, Constraints, DoD, Exit criteria, Failure conditions,
     Rollback). Re-read WP-006's lock notes — its CORS contract
     (`Access-Control-Allow-Origin: *`,
     `Cache-Control: public, max-age=3600, must-revalidate`,
     `Version: v1` in body) is what this WP consumes. Skim WP-007b
     and WP-008 — they run in parallel and share zero write paths
     with WP-007a.
   - `C:\www\legendary-arena-com\docs\brand\strategy.md` § 2 (Voice
     and tone), § 5 (Layout patterns), § 10 (Brand failure modes).
     The shared header / footer this WP adds to `play.*` is brand
     surface — the CTA contract, terminology rules, and failure
     modes apply.
   - `C:\www\legendary-arena-com\docs\brand\palette.md` § 4.4
     (class-color subsystem) and § 8 (contrast pairs). The `play.*`
     UI is the first place class-color tokens (`--la-color-class-*`)
     land in production; that contract is what WP-009 will audit.
     Use the tokens correctly the first time and WP-009 becomes a
     verification, not a remediation.
   - `C:\www\legendary-arena-com\static\brand-tokens.css` — the
     live token file. Read the version header. Note that
     `Version: v1` is the contract value this WP verifies in
     consumer fetches.

2. **Engine-monorepo governance (constrains all arena-client edits):**
   - `C:\pcloud\BB\DEV\legendary-arena\.claude\CLAUDE.md` — root
     coordination. Note the Lint Gate, Execution Checklist
     governance, and architecture-rule hierarchy.
   - `C:\pcloud\BB\DEV\legendary-arena\.claude\rules\architecture.md`
     — Layer Boundary rules. The arena-client lives inside the
     **Client / SPA** application layer (consumes Engine + Pre-plan +
     Registry per the import rules table). Brand-token integration
     is pure UI / CSS and does not cross any layer boundary, but the
     executor must read the rules before touching the package so
     that "obviously brand-related" edits don't accidentally pull in
     a layer-crossing import.
   - `C:\pcloud\BB\DEV\legendary-arena\.claude\rules\code-style.md`
     — naming, function size, comments, abstraction discipline.
     Applies to any TypeScript / Vue code this WP adds (e.g., a
     header / footer component).
   - `C:\pcloud\BB\DEV\legendary-arena\docs\ai\ARCHITECTURE.md` §
     Layer Boundary — authoritative version of the import-rules
     table. The `apps/arena-client` row says it may import
     `@legendary-arena/preplan` at runtime (per D-5901) and the
     UI framework. It must NOT import `@legendary-arena/game-engine`
     or `@legendary-arena/registry` at runtime; type-only imports
     are allowed where the framework permits.

3. **arena-client current state:**
   - `C:\pcloud\BB\DEV\legendary-arena\apps\arena-client\package.json`
     — build script `vite build`, type `module`, deps + devDeps. Note
     the `@legendary-arena/preplan` runtime dep (per D-5901 — the
     only workspace runtime dep) and the `@legendary-arena/game-engine`
     and `@legendary-arena/vue-sfc-loader` devDeps (test- /
     compile-time only — do not appear in the production bundle).
   - `C:\pcloud\BB\DEV\legendary-arena\apps\arena-client\index.html`
     — the entry HTML Vite serves. Vite injects script tags here
     during build. The `<link>` tags this WP adds for brand tokens go
     in this file's `<head>`.
   - `C:\pcloud\BB\DEV\legendary-arena\apps\arena-client\src\main.ts`
     — bootstrap. Note the `__WP061_DEV_FIXTURE_HARNESS__` marker
     guarded by `import.meta.env.DEV`; the production build dead-
     code-eliminates the dev fixture branch (verified by EC-067).
     This WP does not change `main.ts`.
   - `C:\pcloud\BB\DEV\legendary-arena\apps\arena-client\src\styles\base.css`
     — current global styles. Token integration may add a sibling
     stylesheet rather than editing `base.css` directly; the choice
     is documented in Step 4.
   - `C:\pcloud\BB\DEV\legendary-arena\docs\ops\domains.json` — the
     canonical subdomain list. `play.legendary-arena.com` is
     currently `state: "planned"`. WP-007a flips it to
     `state: "live"` at lock.
   - `C:\pcloud\BB\DEV\legendary-arena\docs\ops\DOMAINS.md` — the
     companion runbook. Update in lockstep when `domains.json`
     changes.

4. **Cloudflare Pages docs (consult during Step 6 + Step 9):**
   - <https://developers.cloudflare.com/pages/configuration/build-configuration/>
     — build config, framework presets, env vars (`NODE_VERSION` is
     the relevant pin; pnpm version is auto-detected from the root
     `package.json` `packageManager` field).
   - <https://developers.cloudflare.com/pages/configuration/monorepos/>
     — monorepo guidance. The engine repo is a pnpm workspace; CF
     can build a single workspace package via the build command,
     but the build output dir is the workspace package's `dist/`,
     not a top-level path.
   - <https://developers.cloudflare.com/pages/configuration/redirects/>
     — `_redirects` syntax. Path-only sources are supported; SPA
     fallback `/*  /index.html  200` is the standard pattern.
   - <https://developers.cloudflare.com/pages/configuration/custom-domains/>
     — custom domain binding. Same pattern as WP-006.

Don't read prior session transcripts; the committed artifacts are
the truth.

## Assumptions + DNS posture (read first)

- **WP-006 is locked and live.** `https://www.legendary-arena.com/`
  serves the marketing site. `https://www.legendary-arena.com/brand-tokens.css`
  returns `200` with `Access-Control-Allow-Origin: *`,
  `Cache-Control: public, max-age=3600, must-revalidate`, and the
  `Version: v1` header comment in body. If any of those preconditions
  fails, **stop** — WP-007a cannot lock against a moving contract.
- **DNS authority for `legendary-arena.com` is reachable.**
  `legendary-arena.com` is on Cloudflare DNS (per WP-006 lock); adding
  a `play` CNAME is a same-zone change. Do not pre-create the record
  before CF Pages prompts for it (Step 9) — CF may reject pre-created
  records as unverified.
- **The Cloudflare account that owns the WP-006 Pages project also
  owns / has access to the engine monorepo's GitHub.** WP-007a creates
  a *second* Pages project pointed at the engine monorepo. If the
  engine repo lives under a different GitHub org with no CF
  integration, that's a Step 1 pre-flight blocker — surface and
  resolve before continuing.
- **Pre-WP-007a DNS state is recorded before any change.** Note any
  current `play` records (almost certainly none — the subdomain is
  `state: "planned"` per `domains.json`) so rollback is one revert
  away.

## Current state

What works (locked under WP-001 through WP-006):

- `https://www.legendary-arena.com/` is live (WP-006 lock 2026-05-09)
- `https://www.legendary-arena.com/brand-tokens.css` is reachable
  cross-origin with `Access-Control-Allow-Origin: *`, the WP-006
  cache-control posture, and `Version: v1` visible in body
- Brand tokens v1 LOCKED for WWW (WP-002 + WP-003); cross-site
  consumption verified separately under WP-007a / WP-007b — **this WP
  is that verification for `play.*`**
- `apps/arena-client` builds locally via `pnpm --filter
  "@legendary-arena/arena-client..." build` (Vite 5, output
  `apps/arena-client/dist/`)
- `domains.json` lists `play.legendary-arena.com` as `state:
  "planned"` with `source: apps/arena-client`

What's pending — **your job**:

- ❌ Cross-origin token fetch verified working from a non-www origin
- ❌ `apps/arena-client/index.html` includes a `<link>` to
  `https://www.legendary-arena.com/brand-tokens.css`
- ❌ Local fallback `brand-tokens.css` bundled with arena-client
  (under `apps/arena-client/public/`) and wired as a safety-net
  `<link>` so the client styles correctly if www is briefly
  unreachable
- ❌ Shared header / footer matching www brand identity, with
  working nav links to `https://www.legendary-arena.com` and
  `https://cards.barefootbetters.com` (the registry URL per
  `01-VISION.md` v1 Decisions log; **not** `cards.legendary-arena.com`
  — that migration is a deferred separate WP)
- ❌ `apps/arena-client/public/_redirects` committed for SPA
  fallback (`/*  /index.html  200`) — forward-compatibility hedge
  for any future history-mode router; harmless for the current
  query-string-only routing
- ❌ Cloudflare Pages project created and connected to the engine
  monorepo; build command `pnpm install --frozen-lockfile && pnpm
  --filter "@legendary-arena/arena-client..." build`; output directory
  `apps/arena-client/dist`; production branch `main`; `NODE_VERSION`
  pinned
- ❌ Production deploy succeeds; first deploy reachable on the
  auto-generated `*.pages.dev` URL with brand-token consumption
  visibly correct
- ❌ Custom domain bound: `play.legendary-arena.com`; CNAME added
  on the `legendary-arena.com` CF zone; HTTPS cert provisioned
- ❌ Live-site verification: Lighthouse ≥ 90 in all four
  categories; zero console errors; cross-origin token fetch
  succeeds with `Version: v1` confirmed in DevTools network tab;
  local fallback present in the bundle; game-flow smoke test
  passes
- ❌ `domains.json` updated: `play` entry `state: "planned"` →
  `state: "live"`; `DOMAINS.md` updated in lockstep
- ❌ WP-007a marked ✅ Done in `03-ROADMAP.md`; Decisions log
  entry in `01-VISION.md`

## Task

### Step 1 — Pre-flight + decide what NOT to change

Before opening the CF dashboard or editing `apps/arena-client`,
confirm:

- WP-006 is ✅ Done in `03-ROADMAP.md` and the lock commit is on
  `origin/main` of the marketing-site repo.
- `curl -I -H "Origin: https://example.com" https://www.legendary-arena.com/brand-tokens.css`
  returns `200` with `Access-Control-Allow-Origin: *` and the
  expected cache headers. (Use any non-www origin in the `Origin`
  header — the wildcard ACAO must respond.)
- `curl https://www.legendary-arena.com/brand-tokens.css | head -n 20`
  shows `Version: v1` in the header comment block.
- `pnpm install --frozen-lockfile && pnpm --filter
  "@legendary-arena/arena-client..." build` succeeds from a clean engine-
  monorepo working tree. This is the exact command CF will run; if it
  fails locally, CF will fail too. Output appears at
  `apps/arena-client/dist/index.html` plus assets.
- DNS authority for `legendary-arena.com` is reachable (the same
  Cloudflare zone WP-006 used).
- The Cloudflare account that will own the new Pages project has
  GitHub-app access to the engine monorepo.

**Do not** at this step:

- Touch `static/brand-tokens.css` or any file under
  `C:\www\legendary-arena-com\static\` / `docs\brand\`. The WP-002
  v1 lock applies. If a token gap surfaces, stop and surface — a
  v1 → v2 bump is a separate WP, not a "while we're here" edit.
- Modify `apps/arena-client/package.json`, `pnpm-lock.yaml`, or any
  workspace package's `package.json` outside what's strictly
  required for the brand-token integration. Brand integration is
  pure HTML / CSS / Vue work; no new runtime deps are needed.
- Change anything under `packages/game-engine/`,
  `packages/registry/`, `packages/preplan/`, or `apps/server/`. The
  Layer Boundary rules (`.claude/rules/architecture.md` in the
  engine repo) prohibit reaching across layers from the client; this
  WP touches the client only.
- Modify `apps/arena-client/src/main.ts` or any gameplay /
  bootstrap logic. Brand integration is `index.html` + a stylesheet
  + a header / footer component.
- Add new top-level dependencies to either repo. CF Pages reads the
  engine monorepo's `package.json` and `pnpm-lock.yaml`; if they're
  wrong here, they're wrong there.

If any pre-flight check fails, stop and surface — don't push CF
config that depends on a state that isn't true yet.

### Step 2 — Verify the WP-006 CORS contract from a foreign origin

Before integrating, confirm the contract behaves correctly when
fetched from an origin that is **not** `www.legendary-arena.com`. The
simplest mechanical check:

```powershell
# Wildcard ACAO check from a synthetic origin
curl -I -H "Origin: https://play.legendary-arena.com" `
  https://www.legendary-arena.com/brand-tokens.css

# Body check — Version: v1 in header comment
curl -s https://www.legendary-arena.com/brand-tokens.css | Select-String -Pattern '^\s*\*\s*Version:'

# Browser-equivalent fetch check (paste in DevTools Console of any
# unrelated site):
#   await (await fetch('https://www.legendary-arena.com/brand-tokens.css',
#     { mode: 'cors' })).text()
# Should resolve to the file body (not throw a CORS error).
```

If any of these fails, **stop** — fix the WP-006 contract before
attempting WP-007a. The most likely cause is the
`legendary-arena.com` zone's "Browser Cache TTL" zone setting
drifting back to a non-default value (per WP-006 lock note, it
must be set to "Respect Existing Headers"); a CF zone-setting
regression masks as a `Cache-Control` mismatch.

### Step 3 — Wire brand-token consumption into `apps/arena-client/index.html`

Edit `C:\pcloud\BB\DEV\legendary-arena\apps\arena-client\index.html`:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Legendary Arena</title>
  <!-- WP-007a brand-token consumption.
       Cascade contract: both stylesheets set the same CSS custom
       properties on :root at equal specificity. Per CSS spec, equal-
       specificity declarations resolve by source order — the later
       declaration wins. The cross-origin <link> is listed AFTER the
       local fallback BY DESIGN:
         (1) cross-origin fetch succeeds → live v1 declarations apply
             (live contract is authoritative);
         (2) cross-origin fetch fails (network failure, CORS
             regression, www outage) → fallback's v1 declarations
             apply (bundled snapshot is the safety net).
       Both files MUST share byte-identical contents; SHA-256 parity
       is verified at WP lock and at every WP that touches either
       side of the contract (see WP-007a Step 4 "Snapshot integrity
       check" + DoD).
       The crossorigin attribute is intentionally OMITTED: the live
       URL responds with Access-Control-Allow-Origin: *, so the link
       works without an explicit CORS mode declaration; omitting it
       also lets the browser fall back to a non-CORS fetch if a
       middlebox blocks strict CORS, which slightly widens the
       reachability window without weakening the fallback path. -->
  <link rel="stylesheet" href="/brand-tokens.local.css" />
  <link rel="stylesheet" href="https://www.legendary-arena.com/brand-tokens.css" />
</head>
```

Hard rules on the wiring:

- **Order is contractual.** Local fallback first, cross-origin live
  URL second. Reversing the order silently breaks the fallback
  path: the live URL would no longer override during normal
  operation, and a stale snapshot would shadow the live contract.
  An audit reading this file MUST be able to confirm the ordering
  by inspection.
- **`@import` is forbidden** for the cross-origin URL. `@import`
  blocks rendering on the imported sheet's resolution; `<link>` in
  `<head>` is parallelizable. The cascade semantics are identical
  for `:root` custom properties, so there is no upside to
  `@import` and a real downside (render-blocking on a cross-
  origin fetch is exactly the failure mode the local fallback
  exists to mitigate).
- **No JavaScript-driven token loading.** The wiring is two static
  `<link>` tags; no `onerror` handler, no dynamic injection, no
  Service Worker fetch interception. JS-driven loading defers the
  fallback until after first paint and creates a FOUC window
  (forbidden under Step 11.4 PASS criteria).

### Step 4 — Bundle the local fallback

Copy the locked v1 token file from the marketing-site repo into the
arena-client's static-asset directory:

```powershell
Copy-Item `
  C:\www\legendary-arena-com\static\brand-tokens.css `
  C:\pcloud\BB\DEV\legendary-arena\apps\arena-client\public\brand-tokens.local.css
```

Verify the destination file's first lines show the WP-002 lock
header (`Version: v1`, the cross-site-API-contract comment block).
Vite copies anything under `apps/arena-client/public/` verbatim
into `dist/` at the same path during build, so this file ends up
at `dist/brand-tokens.local.css` and is reachable at
`https://play.legendary-arena.com/brand-tokens.local.css` after
deploy.

Add a tracking note inside the file (a leading comment line above
the copied header) so a future reader knows it's a snapshot, not
the canonical source:

```css
/* SNAPSHOT — do not edit here. Canonical source:
 * https://www.legendary-arena.com/brand-tokens.css
 * Refreshed under WP-007a on YYYY-MM-DD; future v1 → v2 bump must
 * also refresh this file per 01-VISION.md cross-site contract. */
/*
 * Legendary Arena Brand Tokens
 * Version: v1
 * ...
 */
```

The "Refreshed under WP-007a on YYYY-MM-DD" line gets a real date
at lock; the snapshot's hash MUST match the live file at lock time
(mechanical check below).

**Snapshot integrity check (required at lock and at every WP that
touches either side of the contract):**

Compute SHA-256 of:

- `https://www.legendary-arena.com/brand-tokens.css` (the live
  contract, as served by CF Pages — fetch with `curl` and hash the
  response body; do NOT hash the file in `C:\www\legendary-arena-com\static\`
  because Hugo's `static/` → `public/` copy is byte-identical but
  the `curl` of the live URL is the load-bearing source for
  consumers)
- `apps/arena-client/public/brand-tokens.local.css` (the bundled
  snapshot, hashed at the file system)

```powershell
# Live URL
$live = (Invoke-WebRequest -Uri "https://www.legendary-arena.com/brand-tokens.css").Content
$liveHash = (Get-FileHash -InputStream ([IO.MemoryStream]::new([Text.Encoding]::UTF8.GetBytes($live))) -Algorithm SHA256).Hash

# Local snapshot (excluding the SNAPSHOT comment header — the
# canonical source has no SNAPSHOT comment, so hash the file body
# AFTER the SNAPSHOT comment block to compare apples-to-apples)
$snapshot = Get-Content -Raw `
  C:\pcloud\BB\DEV\legendary-arena\apps\arena-client\public\brand-tokens.local.css
$canonicalBody = ($snapshot -split '/\* SNAPSHOT.*?\*/', 2)[1].TrimStart()
$snapHash = (Get-FileHash -InputStream ([IO.MemoryStream]::new([Text.Encoding]::UTF8.GetBytes($canonicalBody))) -Algorithm SHA256).Hash

if ($liveHash -ne $snapHash) { throw "Snapshot stale — refresh required before lock." }
```

Hash parity rules:

- Hashes MUST match byte-for-byte (after the SNAPSHOT comment
  block is stripped from the local file for comparison).
- Mismatch = the snapshot is stale. Re-copy from
  `C:\www\legendary-arena-com\static\brand-tokens.css`, re-add the
  SNAPSHOT comment header, and re-hash. Do not lock until parity
  holds.
- A v1 → v2 bump on www would also produce a hash mismatch here,
  by design — that's the trip-wire that catches a stale snapshot
  ahead of a contract drift. If the mismatch is a real v2 bump,
  WP-007a is the wrong WP to land that change; stop and surface
  per "Execution discipline."

### Step 5 — Apply brand to the arena-client UI surface

The arena-client now has the tokens in scope. This step makes the
UI consume them:

**Mounting requirement (explicit, non-negotiable):**

The header and footer MUST be mounted at the **top-level layout
boundary** so that:

- They render on every route / view / fixture state.
- They never duplicate across views (no risk of two headers
  visible simultaneously).
- They do not depend on, or read from, gameplay state, store
  contents, or boardgame.io client state.

Acceptable mount points:

- A wrapper inside `apps/arena-client/src/App.vue` (root
  component) that renders `<Header />`, `<router-view />` (or the
  current single-view equivalent — `<PlayViewport />` per the
  current `src/pages/` layout), then `<Footer />`.
- A new top-level layout component (e.g.,
  `src/components/branding/AppShell.vue`) used by `App.vue` as the
  outermost element.

Unacceptable mount points:

- Injecting `<Header />` / `<Footer />` into individual page or
  view components (creates duplication risk on any future route
  that forgets to include them).
- Conditionally rendering header / footer based on game state,
  fixture name, lobby status, or any other gameplay-derived flag
  (couples brand surface to gameplay logic — explicitly forbidden
  under "Execution discipline").
- Rendering header / footer inside a Pinia store-driven `v-if`
  block where the condition could ever evaluate `false` during
  normal operation.

- Add a shared header / footer Vue component (or a single layout
  component) under
  `apps/arena-client/src/components/branding/` (a new directory).
  - **Header:** wordmark / placeholder logo per `palette.md` § 4
    routing (use `--la-color-text-primary` on
    `--la-color-bg-primary`); nav links to
    `https://www.legendary-arena.com` (label: "Home") and
    `https://cards.barefootbetters.com` (label: "Cards"). Per
    `01-VISION.md` v1 Decisions log, the registry stays at
    `cards.barefootbetters.com` for v1; the migration to
    `cards.legendary-arena.com` is a deferred separate WP and is
    NOT scope here.
  - **Footer:** legal / copyright line; matches www's footer
    structure (read `C:\www\legendary-arena-com\layouts\partials\footer.html`
    or PaperMod's footer override for parity).
- Update or replace global styles in
  `apps/arena-client/src/styles/base.css` so all body / heading /
  link colors route through `var(--la-*)` tokens. **No raw hex
  values** anywhere outside `brand-tokens.local.css` (which is the
  snapshot of the canonical contract). This is the rule WP-009 will
  audit.
- Class-color tokens (`--la-color-class-*`, palette.md § 4.4) apply
  to any UI element that surfaces a hero class (e.g., a deck-builder
  panel scoped to `strength`). Use them per the four §4.4
  application patterns: `border-accent`, `chip-fill`,
  `icon-accent`, `selection-state`. Full-surface fill is permitted
  only on class-scoped elements per palette.md § 4.4 / § 10.

Do **not** modify any non-UI arena-client file in this step.
Specifically, do not touch:

- `apps/arena-client/src/main.ts` (bootstrap; already fine)
- `apps/arena-client/src/client/bgioClient.ts`,
  `apps/arena-client/src/lobby/lobbyApi.ts`, or any
  network / boardgame.io wiring
- `apps/arena-client/src/stores/uiState.ts` (UI state shape;
  unaffected by branding)
- Any `.test.ts` file (existing tests should still pass; if a brand
  edit breaks a snapshot or DOM-shape test, fix the test in the
  same commit and explain in the commit message)

Smoke test in dev:

```powershell
cd C:\pcloud\BB\DEV\legendary-arena
pnpm --filter @legendary-arena/arena-client dev
# Visit http://localhost:5173/ ; verify:
#  - Brand colors / fonts / spacing visible (not Vite default styles)
#  - Header has working nav links to www and cards
#  - Footer matches www's footer in copy / layout
#  - DevTools Network tab: brand-tokens.css fetched cross-origin from
#    www.legendary-arena.com; brand-tokens.local.css also fetched
#    (same-origin)
#  - DevTools Console: zero errors
```

If the cross-origin fetch fails in dev, the `Origin` header sent by
the browser is `http://localhost:5173`, and the wildcard ACAO on
www should accept it. If it doesn't, that's a regression in WP-006
or a network-level interception (corporate proxy, etc.) — surface
before continuing.

### Step 6 — Engine-monorepo build verification (mechanical)

From a clean engine-monorepo tree:

```powershell
cd C:\pcloud\BB\DEV\legendary-arena
git clean -fdx -e .claude/worktrees -e .env -e node_modules
pnpm install --frozen-lockfile
pnpm --filter "@legendary-arena/arena-client..." build
```

Verify:

- Exit code 0 from both commands.
- `apps/arena-client/dist/index.html` exists and references the
  external `<link>` to www's brand-tokens (visible in the source via
  `Get-Content`).
- `apps/arena-client/dist/brand-tokens.local.css` exists (the
  bundled fallback) and starts with the SNAPSHOT comment + `Version:
  v1` block.
- `apps/arena-client/dist/_redirects` does not yet exist — Step 8
  adds it before the lock-pass build.
**Determinism requirement (failure-level, not advisory):**

Two consecutive `pnpm --filter "@legendary-arena/arena-client..." build`
runs MUST produce byte-identical output for every file under
`apps/arena-client/dist/`. Any variance is a **blocker**, not a
warning, and MUST be eliminated before proceeding to Step 7.

Mechanical check:

```powershell
# Capture hashes after build #1
Get-ChildItem -Recurse apps/arena-client/dist | Get-FileHash | `
  Sort-Object Path > build1.txt

pnpm --filter "@legendary-arena/arena-client..." build

Get-ChildItem -Recurse apps/arena-client/dist | Get-FileHash | `
  Sort-Object Path > build2.txt

$diff = Compare-Object (Get-Content build1.txt) (Get-Content build2.txt)
if ($diff) { throw "Determinism violation: $($diff.Count) lines differ. Investigate before proceeding." }
```

Empty diff = WP-007a inherits the WP-005 / WP-006 reproducibility
invariant.

Common causes of determinism violations (each is a blocker, each
must be removed at the source — do NOT mask by sorting / filtering
the diff):

- Timestamp injection (Vite plugins, banner comments,
  `__DATE__`-style replacements)
- Non-deterministic plugin output (plugins that read file mtimes,
  use `Math.random()`, or hash with non-stable inputs)
- Locale-dependent sort order in a plugin's output
- `Date.now()` references in the build pipeline

If the diff is non-empty, identify the source, remove the
nondeterminism at its source, and re-verify. Do not proceed to CF
Pages configuration with a non-deterministic build — CF will
regenerate hashes on every deploy and the "same commit → same
output" invariant becomes unverifiable.

`build1.txt` / `build2.txt` are local-only verification artifacts;
do not commit. Add them to `.gitignore` if they aren't already
ignored under a wildcard.

### Step 7 — Create the Cloudflare Pages project

In the Cloudflare dashboard, create a **new** Pages project (not the
WP-006 `legendary-arena-website` project — that one points at the
marketing-site repo). Name it descriptively, e.g.,
`legendary-arena-play`, so it's grep-able in CF later.

Connect it to the engine monorepo on GitHub. The repo at execution
time is whichever the engine currently lives in — confirm against
`C:\pcloud\BB\DEV\legendary-arena\.git\config` `[remote "origin"]
url`. (Future per `01-VISION.md` Decisions log: a transfer to
`legendary-arena/legendary-arena-game` is queued; if that has
happened by the time WP-007a executes, point CF at the new repo and
note the rename in the Decisions log entry at lock.)

**Build configuration — these values are non-negotiable:**

| Setting | Value | Why |
|---|---|---|
| Production branch | `main` | Single source of truth for the live deploy |
| Framework preset | "None" / "Custom" | Vite is supported as a preset, but this is a monorepo workspace — auto-detection picks the wrong build path. Set the build command explicitly. |
| Build command | `pnpm install --frozen-lockfile && pnpm --filter "@legendary-arena/arena-client..." build` | Verbatim. No `cd`, no extra steps, no post-build hooks. |
| Build output directory | `apps/arena-client/dist` | Workspace-relative path. CF treats this as the artifact directory; `_redirects` must land here (which means `apps/arena-client/public/_redirects` in the repo, copied verbatim by Vite). |
| Root directory | (blank / repo root) | The build runs at the repo root because pnpm needs the workspace root to resolve `workspace:*` deps. |
| Node.js version | pin via `NODE_VERSION = 22` env var | The engine repo's `engines.node` is `>=22`; pin to a major to prevent silent CF-side bumps. |
| pnpm version | auto-detected from root `package.json` `packageManager: pnpm@10.32.1` | CF Pages reads `packageManager` and installs pnpm correspondingly; no override env var needed. |

Preview deploys: **enabled** for non-`main` branches and PRs. This
is a DoD checkbox; verify the toggle is on before saving.

**No additional build steps** beyond `pnpm install --frozen-lockfile
&& pnpm --filter "@legendary-arena/arena-client..." build`. Don't add a
"post-build" hook, a "deploy" hook, or any custom script that runs
in CF but not locally. The contract is single-command,
identical-everywhere — same posture WP-006 locked.

**No other CF dashboard mutations** beyond (1) project creation +
build config + env vars (this step), (2) custom domain binding
(Step 9), (3) preview-deploy toggle confirmation (this step + Step
10). Anything else (Workers, Page Rules, Bulk Redirects, Transform
Rules, Access policies, Cache Rules, etc.) is out of scope. If a
real need surfaces, raise it as a separate WP.

**Configuration immutability rule:**

After initial project creation in this step, the CF Pages build
settings for `legendary-arena-play` MUST NOT be edited through the
dashboard except for:

- Node version bump (only when explicitly required by a future WP
  that justifies the change)
- Custom domain binding (Step 10 — the binding action only, not
  build/deploy settings)
- Preview-deploy toggle re-confirmation (Step 9, mechanical only)

All other changes — build command, output directory, root
directory, framework preset, env vars, branch deploys settings —
require:

1. A WP that documents the change and its rationale.
2. Intentional application via that WP's execution.
3. A Decisions log entry in `01-VISION.md` recording the new
   value and the WP that authorized it.

This rule prevents silent dashboard drift, which is one of the
highest-impact failure modes for "same commit → same output"
invariants. Drift here masks as a CF-only build failure that
reproduces nowhere; the cost of debugging vastly exceeds the cost
of an extra WP to make a deliberate change.

### Step 8 — SPA routing fallback

Commit `apps/arena-client/public/_redirects` with:

```
/*  /index.html  200
```

Vite copies anything under `public/` verbatim into `dist/`, so this
ships at `dist/_redirects` and CF Pages reads it from the build
output. The rule serves `index.html` for any path that doesn't match
a real file, with a `200` status — the standard SPA fallback for
client-side routing.

Why include this even though `apps/arena-client/src/main.ts`
currently uses query-string state (`?fixture=...`) rather than
history-mode routing:

- It's a forward-compatibility hedge. The first time someone adds a
  Vue Router with `createWebHistory`, deep-link 404s would surface
  as a user-visible bug; this rule prevents that.
- It costs nothing. CF only consults `_redirects` when no static
  file matches the request, so existing assets are unaffected.
- It's the documented CF Pages SPA pattern.

WP-006 amendment context: WP-006 discovered that CF Pages'
`_redirects` does **not** support full-URL source patterns (apex →
www required a zone-level Redirect Rule instead). That limitation
does **not** apply here — the SPA fallback uses path-only sources,
which is the supported syntax per CF docs.

After committing, push and let CF redeploy. Verify on `*.pages.dev`:

- [ ] `curl -sI https://<project-name>.pages.dev/some/random/deep/path`
      returns `200` with HTML body matching `dist/index.html`
      (the SPA shell), not a `404`.
- [ ] `curl -sI https://<project-name>.pages.dev/brand-tokens.local.css`
      returns `200` with `Content-Type: text/css` (real file, served
      from disk, not the SPA fallback).

### Step 9 — First production deploy + parity check (no custom domain yet)

Trigger the first production deploy by pushing to `main` (or by
hitting "Retry deployment" on the CF dashboard if the GitHub
connection didn't auto-trigger a build).

When the build completes, the site is reachable at
`https://<project-name>.pages.dev`. Use this URL for the parity
check **before** binding the custom domain; if parity fails, fix it
on `*.pages.dev` first.

Parity verifications (mechanical):

- [ ] CF build log shows `pnpm install --frozen-lockfile` and
  `pnpm --filter "@legendary-arena/arena-client..." build` running, in
  that order, with no additional commands.
- [ ] CF build log shows `vite v5.x` and the "✓ N modules
  transformed." / "✓ built in Xs" lines. If `vite` isn't invoked,
  the build command resolved to the wrong package — confirm the
  filter syntax.
- [ ] The deployed site at `*.pages.dev` matches the local
  `apps/arena-client/dist/` output. Spot-check `index.html`'s
  rendered HTML for the two `<link>` tags (cross-origin + local
  fallback) and at least one `--la-*` token reference in the
  bundled CSS.
- [ ] DevTools Network tab on `*.pages.dev`:
  `https://www.legendary-arena.com/brand-tokens.css` is fetched
  with HTTP `200` and the response shows
  `Access-Control-Allow-Origin: *`. Response body's first lines
  show `Version: v1`.
- [ ] `https://<project-name>.pages.dev/brand-tokens.local.css`
  returns `200` and starts with the SNAPSHOT comment + `Version:
  v1` block.
- [ ] DevTools Console clean: zero errors, zero failed network
  requests on the SPA shell page-load.
- [ ] Smoke-test core game flow: open the client, hit any
  available lobby / fixture entry point, navigate to the play
  surface (or the dev fixture if production fixture support
  isn't shipped yet), and exit. No console errors. No regressions
  vs the local dev surface.

**Build parity assertion (failure-level):**

The `*.pages.dev` deploy MUST be functionally equivalent to the
local `apps/arena-client/dist/` served via a static HTTP server
(e.g., `python -m http.server` from `dist/`).

Differences are ONLY allowed in:

- Absolute URL hostnames (`localhost:N` vs `<project>.pages.dev`)
- Server-injected hosting headers (`server:`, CF-specific
  `cf-ray:`, etc.)
- TLS-vs-HTTP scheme on resource URLs

Any **functional** divergence — different rendered HTML, different
asset bundles, different stylesheet content, different SPA
behavior, different brand-token resolution — is a blocker. Run a
side-by-side comparison: open `http://localhost:8000/` (local
dist) and `https://<project>.pages.dev/` in two browser windows;
they MUST render identically. If they don't, the build pipeline
diverged between local and CF — usually a missing env var or a
framework-preset auto-detection — and the divergence MUST be
resolved before binding the custom domain.

If any parity check fails, **stop and fix before binding the custom
domain**. The most likely failure modes:

- CF can't find `pnpm` — confirm `packageManager` in root
  `package.json` and `NODE_VERSION = 22` in CF env.
- Build output not at `apps/arena-client/dist/` — confirm the
  output-directory CF setting matches verbatim.
- Cross-origin fetch fails — re-run Step 2 against
  `*.pages.dev`'s Origin and confirm WP-006's CORS contract still
  holds.
- `brand-tokens.local.css` 404s — confirm the file is at
  `apps/arena-client/public/brand-tokens.local.css` (Vite's
  static-asset convention) and not in `src/`.

### Step 10 — Bind play.legendary-arena.com + DNS

In the CF Pages dashboard for this project, add the custom domain
`play.legendary-arena.com`. Cloudflare will instruct what DNS record
to create:

- A `CNAME` from `play` to `<project-name>.pages.dev` on the
  `legendary-arena.com` zone (which is already on Cloudflare DNS
  per WP-006). CF can manage this automatically since the zone is
  in the same account.

Wait for HTTPS cert provisioning (typically a few minutes; can take
longer if DNS just changed). The CF dashboard shows certificate
status; it must read "Active" before proceeding.

Verifications:

- [ ] `https://play.legendary-arena.com/` loads the game client (no
  cert warning, no mixed-content warnings in DevTools Console).
- [ ] `curl -I https://play.legendary-arena.com/` returns `200` with
  `Content-Type: text/html`.
- [ ] DNS sanity: `nslookup play.legendary-arena.com` resolves;
  the CNAME chain ends at a CF anycast IP.

### Step 11 — Verify the live site

Run all checks against `https://play.legendary-arena.com/`, not the
`*.pages.dev` URL.

1. **Build log review** — most recent production deploy log shows
   `pnpm install --frozen-lockfile` + `pnpm --filter
   "@legendary-arena/arena-client..." build` only. Build duration in line
   with local. No warnings about missing pnpm, missing Node, or
   framework mis-detection.

2. **Functional check** — `https://play.legendary-arena.com/`:
   - Brand colors / fonts / spacing render correctly (computed
     `font-family` resolves through the brand-tokens stack — at
     least one heading should resolve to the Bebas Neue stack per
     `typography.md`).
   - Header has working nav links to `https://www.legendary-arena.com`
     and `https://cards.barefootbetters.com`. Both clicks navigate
     correctly (open in new tab if that's the design choice; document
     the choice).
   - Footer matches www's footer in copy + structure.
   - Game-flow smoke test: open the client, enter the lobby (or the
     dev fixture path if available in production), navigate to the
     play surface, and exit cleanly. No console errors. No
     regressions vs the local dev surface.

3. **Cross-origin token contract** —
   - DevTools Network tab: `brand-tokens.css` fetched from
     `www.legendary-arena.com` with HTTP `200`,
     `Access-Control-Allow-Origin: *` header, `Version: v1` in the
     response body's leading comment.
   - DevTools Network tab: `brand-tokens.local.css` fetched
     same-origin from `play.legendary-arena.com` with HTTP `200`,
     `Version: v1` in body.
   - `curl -I -H "Origin: https://play.legendary-arena.com" https://www.legendary-arena.com/brand-tokens.css`
     returns `200` + `Access-Control-Allow-Origin: *` (the
     production smoke).

4. **Local fallback functional test (hard requirement, must pass
   before lock):**

   Procedure:
   - In DevTools → Network panel → right-click
     `https://www.legendary-arena.com/brand-tokens.css` → "Block
     request URL."
   - Hard-reload `https://play.legendary-arena.com/` (Ctrl+Shift+R
     to bypass cache).
   - Observe the rendered page through full first paint and
     subsequent re-flow.

   PASS criteria (all must be true):
   - All typography (font-family, font-size, line-height, weight)
     renders correctly per `typography.md`.
   - All spacing (padding, margin, gap) renders correctly per
     `spacing.md`.
   - All colors (text, background, border, accent) render
     correctly per `palette.md`.
   - Header, footer, hero, CTA, and class-color affordances are
     visually indistinguishable from the unblocked state.
   - No layout shift relative to the unblocked state.

   FAIL criteria (any one is a blocker):
   - Any flash of unstyled content (FOUC) at any moment from
     navigation to settled paint.
   - Missing or incorrect font (system fallback visible where
     Bebas Neue should render).
   - Broken spacing (default browser margins, collapsed gaps).
   - Missing class-color affordance on any element that uses
     `--la-color-class-*` tokens.
   - Any CSS custom property resolving to its declared default
     value rather than the v1 contract value (inspect via DevTools
     Computed panel → Filter `--la-`).

   After PASS:
   - Unblock the URL.
   - Reload — the live cross-origin URL takes precedence again.
   - Confirm DevTools Computed panel shows the live values
     winning (mechanical: the values are byte-identical, but the
     Network tab confirms the live fetch happened).

   This test MUST pass before WP-007a can lock. A FAIL means the
   cross-site contract is one outage away from breaking the
   client visually — that's the failure mode the bundled fallback
   exists to prevent, and shipping without it functioning defeats
   the entire fallback design.

5. **Lighthouse** — run on the home / lobby surface:
   ```powershell
   npx lighthouse@12 https://play.legendary-arena.com/ `
     --output=json --output-path=lighthouse-play-wp007a.json `
     --chrome-flags="--headless --no-sandbox --disable-gpu" `
     --only-categories=performance,accessibility,best-practices,seo `
     --quiet
   ```
   All four categories must be ≥ 90. Raw JSON is local-only; do
   not commit (consistent with WP-003 / WP-004 / WP-005 / WP-006).
   The arena-client is JS-heavy compared to the marketing site;
   if Performance dips below 90, identify the dominant cost (TBT
   from boardgame.io initialization is the most likely culprit)
   and decide whether to defer-load it. Do not lock with a
   sub-90 score.

6. **Console clean** — DevTools on the live URL with the SPA
   loaded. Zero errors, zero page errors, zero failed network
   requests beyond the (intentional) test from Step 4.

7. **Submodule / lockfile clean** — both repos:
   - Engine repo: `git submodule status` is clean (if any
     submodules exist); `pnpm-lock.yaml` is unchanged from the
     pre-WP state (this WP added no runtime deps).
   - Marketing-site repo: `git status` shows only the WP file +
     roadmap + vision lock entries.

8. **Reproducibility — production-build sanity** — one final
   `pnpm install --frozen-lockfile && pnpm --filter
   "@legendary-arena/arena-client..." build` run locally;
   `Compare-Object` over SHA-256 hashes of
   `apps/arena-client/dist/` against the previous lock-pass run.
   Empty diff confirms the WP-005 / WP-006 reproducibility
   contract still holds under WP-007a's additions.

### Step 12 — Lock WP-007a

When all DoD + exit criteria pass:

1. **Marketing-site repo** (`C:\www\legendary-arena-com\`):
   - Update `docs/03-ROADMAP.md`:
     - WP-007a: ⏸️ Pending → ✅ Done (date `YYYY-MM-DD`)
     - Tick all DoD + exit criteria boxes
     - Record final commit hash(es) under `**Commits:**` for both
       repos (engine repo: arena-client integration commit(s) +
       any required tooling commits; marketing repo: this lock
       commit)
     - Record the four Lighthouse scores for the live URL
     - Record the `*.pages.dev` project name
   - Add a Decisions log entry to `docs/01-VISION.md` recording:
     - **WP-007a lock receipts:** the live URL is up; cross-origin
       brand-token consumption verified; local fallback verified
       under network-block test.
     - **CF Pages project name** for `play.*` (so future ops can
       find it without dashboard archaeology).
     - **Pinned `NODE_VERSION`** value (so a future CF account
       migration doesn't re-derive the wrong value).
     - **Brand tokens v1 cross-site lock:** with WP-007a + WP-007b
       both locked, the WP-002 v1 LOCKED carve-out for cross-site
       consumption is closed. Any future v1 redefinition is now a
       full v1 → v2 bump per the WP-002 § 9.1 Early Lock Revision
       Window expiry.
     - **Pre-WP-007a DNS state** for `play.legendary-arena.com`
       (the records that existed before this WP changed them —
       almost certainly none, but record explicitly for one-step
       rollback).
   - Commit + push.

2. **Engine monorepo** (`C:\pcloud\BB\DEV\legendary-arena\`):
   - Update `docs/ops/domains.json`: the `play` entry's `state`
     flips from `"planned"` to `"live"`; add a `notes` field with
     the deploy date + WP-007a citation, mirroring the WP-006
     pattern for `www`. Bump `updated` to today's date.
   - Update `docs/ops/DOMAINS.md` in lockstep — one section per
     anchor; the `play` section gets a "live since" line, the CF
     project name, and a pointer back to this WP file.
   - The `apps/arena-client` integration commits (Steps 3–5, 8) are
     subject to the engine repo's commit-hygiene rules
     (`.claude/rules/work-packets.md`,
     `docs/ai/REFERENCE/01.3-commit-hygiene-under-ec-mode.md`).
     Most directly, every commit message in the engine repo should
     cite **WP-007a** as the originating WP and note that this is
     a marketing-side WP that is exercising the cross-site brand-
     token contract. The engine repo does NOT need its own WP file
     for this work — WP-007a is the source of truth — but the
     commit messages provide the audit trail in `git log`.
   - Push.

3. **WP-007b coordination:** WP-007a and WP-007b share a single
   piece of pre-work: the v1 LOCKED carve-out closes when both lock.
   If WP-007b is in flight or pending, do not block on it; just
   note in the Decisions log entry that the carve-out closes only
   when WP-007b also locks. (If WP-007b locks first, mirror this
   structure.)

4. **Server-side coordination — note for follow-up, NOT scope of
   this WP:** the engine monorepo's `apps/server` reads a
   `PUBLIC_BASE_URL` env var consumed by Stripe Checkout success /
   cancel redirects (per `docs/ops/domains.json` API row notes).
   That value should point at `https://play.legendary-arena.com`
   once this WP locks — but it is **server-side env config, not
   an apps/arena-client change**, so it belongs in a separate
   server-config update (or a billing-flow WP). Surface it as a
   linked follow-up at WP-007a lock time so it doesn't fall
   through the cracks; do NOT modify `PUBLIC_BASE_URL` as part of
   this WP's commits.

## Constraints

- **Build command parity is non-negotiable.** CF runs
  `pnpm install --frozen-lockfile && pnpm --filter
  "@legendary-arena/arena-client..." build`, **nothing else**. No
  additional build steps, no environment-specific code paths, no
  "if CF then X" branches. Drift between local and CF is the
  failure mode this WP exists to prevent (same posture WP-005 /
  WP-006 locked).
- **WP-002 v1 brand artifacts are locked.** Do NOT modify
  `static/brand-tokens.css` token values, `docs/brand/*.md`, or
  any v1 lock state in the marketing-site repo. WP-007a is a
  consumer-integration WP; it does not change the contract.
- **Engine layer boundaries hold.** Per the engine repo's
  `.claude/rules/architecture.md`, `apps/arena-client` may import
  `@legendary-arena/preplan` (per D-5901) and the UI framework at
  runtime; it MUST NOT import `@legendary-arena/game-engine` or
  `@legendary-arena/registry` at runtime. This WP's edits stay in
  HTML / CSS / Vue and do not touch imports.
- **No new runtime dependencies** in either repo. The brand-token
  integration is `<link>` + a static fallback file + a Vue
  component; no npm packages need to be added.
- **No engine-side WP file.** WP-007a is a marketing-repo WP that
  exercises a cross-site contract. The engine repo's commits cite
  it via commit message; there is no separate engine WP file. If
  the engine-side work grows beyond pure brand integration during
  execution, stop — that's a sign WP-007a's scope is wrong, and
  the right answer is a separate engine-repo WP.
- **No engine code changes for branding-only reasons.** Game
  logic, rule pipelines, store shapes, network wiring all stay
  put. If a brand integration appears to require a logic change,
  the integration is wrong — surface and rethink.
- **No `themes/PaperMod/` or `apps/wiki-viewer/` modifications.**
  Out of scope. Verify with `git submodule status` (marketing
  repo) and `git diff --stat` (both repos).
- **CORS contract on `/brand-tokens.css` must hold throughout the
  WP.** Re-verify at lock time. If WP-006's CORS contract drifts
  during WP-007a execution (CF zone setting regression), surface
  before locking; the lock requires the contract to be live.
- **Token version `v1` must be visible in fetched response
  bodies.** The contract is single URL, version-in-body. Confirm
  `Version: v1` in DevTools Network tab on the live URL at lock.
- **Local fallback is mandatory and must fully preserve visual
  integrity.** The Cross-site contract (`01-VISION.md` §
  Cross-site contract) calls out the bundled fallback as a
  SHOULD; WP-007a treats it as a MUST. The application MUST
  render correctly with the external token file completely
  unavailable — same typography, same spacing, same colors, same
  class-color affordances, no FOUC, no layout shift. The Step
  11.4 network-block test is the binding verification; no
  subjective interpretation permitted.
- **HTTPS only.** No HTTP fallback. CF Pages enforces HTTPS by
  default; verify it's not been disabled.
- **No analytics / monitoring / Workers / Functions** introduced.
  Same posture as WP-006 — out of scope for the deploy WP.
- **No out-of-scope CF dashboard changes.** Same enumeration as
  WP-006: project creation + build config + env vars (Step 7),
  custom domain binding (Step 10), preview-deploy toggle
  (Step 7 + Step 9). Anything else is a separate WP.

## Definition of Done

- [ ] WP-006 CORS contract re-verified live before integration
  (`Access-Control-Allow-Origin: *`, `Cache-Control: public,
  max-age=3600, must-revalidate`, `Version: v1` in body)
- [ ] `apps/arena-client/index.html` includes a cross-origin
  `<link>` to `https://www.legendary-arena.com/brand-tokens.css`
- [ ] `apps/arena-client/public/brand-tokens.local.css` committed
  as the bundled local fallback; first lines show the SNAPSHOT
  comment + `Version: v1`
- [ ] arena-client UI surface (header, footer, body, headings,
  links) consumes `--la-*` tokens; no raw hex outside the
  fallback file
- [ ] Header has working nav links to
  `https://www.legendary-arena.com` and
  `https://cards.barefootbetters.com`
- [ ] Footer matches www's footer in copy + structure
- [ ] `apps/arena-client/public/_redirects` committed with
  `/*  /index.html  200`
- [ ] `pnpm install --frozen-lockfile && pnpm --filter
  "@legendary-arena/arena-client..." build` succeeds locally; output
  byte-deterministic across consecutive runs
- [ ] CF Pages project created and connected to the engine
  monorepo
- [ ] Build command set to `pnpm install --frozen-lockfile && pnpm
  --filter "@legendary-arena/arena-client..." build` (verbatim);
  output dir `apps/arena-client/dist`; production branch `main`;
  `NODE_VERSION = 22` env var pinned
- [ ] Production deploy succeeds; build log shows the documented
  command and Vite's build output
- [ ] `https://play.legendary-arena.com` loads the client over
  HTTPS
- [ ] DNS: CNAME `play` → `<project-name>.pages.dev` added to
  the `legendary-arena.com` CF zone
- [ ] Pushing to `main` triggers an automatic redeploy
- [ ] Opening a PR creates a preview deploy (verified end-to-end
  via a real test PR)
- [ ] HTTPS works (no cert errors, no mixed-content warnings)
- [ ] DevTools Network tab on
  `https://play.legendary-arena.com/`: cross-origin fetch of
  `https://www.legendary-arena.com/brand-tokens.css` returns
  `200` + `Access-Control-Allow-Origin: *`
- [ ] DevTools Network tab on
  `https://play.legendary-arena.com/`:
  `/brand-tokens.local.css` returns `200` (same-origin); body
  starts with SNAPSHOT comment + `Version: v1`
- [ ] Network-block test passes: with the cross-origin URL
  blocked, the page renders with full visual integrity (typography
  + spacing + colors + class-color affordances all correct, no
  FOUC, no layout shift) per Step 11.4 PASS criteria
- [ ] SHA-256 hash parity verified at lock between the live
  `brand-tokens.css` (fetched from
  `https://www.legendary-arena.com/brand-tokens.css`) and the
  bundled fallback at `apps/arena-client/public/brand-tokens.local.css`
  (with the SNAPSHOT comment block stripped for comparison)
- [ ] Header and footer mounted at the root layout boundary (in
  `App.vue` or a top-level shell component), not injected per-view
  and not conditionally rendered on gameplay state
- [ ] Game-flow smoke test passes (open client → reach play
  surface → exit cleanly with no console errors)
- [ ] No console errors on live URL (Console clean on the SPA
  shell, lobby, and play surface)
- [ ] Lighthouse ≥ 90 in all four categories on
  `https://play.legendary-arena.com/`
- [ ] `docs/ops/domains.json` updated: `play` entry `state:
  "planned"` → `state: "live"` with deploy-date notes
- [ ] `docs/ops/DOMAINS.md` updated in lockstep
- [ ] WP-007a marked ✅ Done in `03-ROADMAP.md` with commits +
  Lighthouse scores + `*.pages.dev` project name
- [ ] Structural choices logged in `01-VISION.md` Decisions log
  (CF project name, pinned `NODE_VERSION`, pre-WP-007a DNS state,
  v1 cross-site carve-out closure status)
- [ ] All commits pushed to both repos' `origin/main`

## Failure conditions (explicit)

WP-007a must NOT be locked if any of the following are true:

- WP-006 CORS contract regressed during WP-007a execution
  (ACAO header missing or wrong, cache-control drift, `Version:
  v1` missing from body)
- CF Pages build command differs from `pnpm install
  --frozen-lockfile && pnpm --filter @legendary-arena/arena-client
  build` (any extra step, any deletion, any reorder)
- CF Pages build log doesn't show Vite's build output (the build
  resolved to the wrong package)
- `https://play.legendary-arena.com/` doesn't load over HTTPS, or
  loads with cert / mixed-content warnings
- Cross-origin fetch of `brand-tokens.css` from
  `play.legendary-arena.com` fails (CORS block — almost certainly
  a WP-006 regression, not a WP-007a-side bug)
- `Version: v1` header comment missing from the response body of
  the cross-origin OR local-fallback `brand-tokens` file
- Local fallback missing from the bundle, OR the Step 11.4
  network-block test produces ANY of the FAIL criteria (FOUC,
  missing font, broken spacing, missing class-color affordance,
  any `--la-*` custom property resolving to its declared default
  rather than the v1 contract value)
- SHA-256 hash parity check fails between the live
  `brand-tokens.css` and the bundled fallback at lock time
  (snapshot is stale; lock is blocked until refreshed)
- Build determinism violation: two consecutive local builds
  produce different `apps/arena-client/dist/` hashes (Step 6
  failure-level requirement)
- Build parity assertion fails: `*.pages.dev` deploy is
  functionally divergent from local `dist/` served via static
  HTTP (Step 9 failure-level requirement)
- Header / footer not mounted at the root layout boundary
  (per-view injection or gameplay-state-conditional rendering
  violates the Step 5 mounting requirement)
- Any file outside the "Execution discipline" scope list was
  modified during this WP's commits — even if compiles and tests
  pass — except where the change is a separate WP that has been
  explicitly approved
- CF Pages dashboard configuration drift: any setting other than
  the Step 7 / Step 10 enumerated changes was edited via the
  dashboard during execution (silent dashboard drift violates the
  Step 7 configuration immutability rule)
- Game-flow smoke test regresses vs local dev (a flow that worked
  locally fails on production)
- A CF dashboard mutation outside the explicit Step 7 / Step 10
  scope was made during this session (out-of-scope infra drift)
- Console errors present on the live URL that weren't present
  locally
- Lighthouse score below 90 on
  `https://play.legendary-arena.com/` in any of the four
  categories
- Preview deploys not creating on PRs (verified with a real test
  PR)
- Engine-side files outside `apps/arena-client/**` modified by
  this WP (layer-boundary spillage)
- `static/brand-tokens.css` or any `docs/brand/*.md` file
  modified in the marketing-site repo (WP-002 v1 lock violation)
- `pnpm-lock.yaml` modified in the engine repo by this WP (no
  new runtime deps were planned; a lockfile change suggests
  scope spillage)
- `themes/PaperMod/` modified (`git submodule status` shows `+`
  flag in the marketing repo)

A failure condition firing means WP-007a regresses to ⏸️ Pending
until the issue is resolved.

## Rollback

CF Pages: revert to the previous deployment via the dashboard (one
click, instant). Sufficient for build-output regressions.

Custom domain: in the CF Pages project for `play.*`, remove the
custom-domain binding and the site reverts to being served only at
`*.pages.dev`. The `play.legendary-arena.com` CNAME on the zone can
be removed at the same time (DNS revert is one-step, since the
record is brand-new — no prior data to preserve, per the Step 1
DNS-state record).

Engine repo: revert offending arena-client commits on `main`, push;
CF Pages auto-redeploys to the prior known-good state. The pre-WP
state was: arena-client without brand integration, no `_redirects`,
no `brand-tokens.local.css`. WP-005 / WP-006 contracts (marketing-
site side) are completely untouched by these reverts.

Marketing-site repo: revert the lock commit on `main`. WP-007a goes
back to ⏸️ Pending; live URLs continue to work but the lock
metadata reverts.

If everything goes catastrophically wrong (cert provisioning fails
for hours, CF Pages hits a regional outage, CF zone DNS misbehaves,
etc.), the fallback is to leave the client on `*.pages.dev` and bind
the custom domain later. `play.*` has no traffic-critical SLO yet
and nothing currently depends on the host name resolving — a
delayed custom-domain bind is annoying, not disastrous.

## What's NOT in scope

- WP-007b (registry-viewer brand integration at
  `cards.barefootbetters.com`) — separate WP, no shared write
  paths. Same cross-site contract pattern, different consumer.
  Coordinates with WP-007a only on Decisions log timing for the
  v1 cross-site carve-out closure.
- WP-008 (SEO baseline / Schema.org markup on www) — separate
  WP. Touches the marketing site's templates, not the arena-client.
- WP-009 (class-color usage audit cross-site) — separate WP that
  audits THIS WP's outputs. WP-007a should USE class-color tokens
  correctly per palette.md § 4.4 so WP-009 becomes verification,
  not remediation; but the audit itself is WP-009's job.
- Migrating the registry from `cards.barefootbetters.com` to
  `cards.legendary-arena.com` (or `registry.legendary-arena.com`)
  — explicitly deferred per `01-VISION.md` Decisions log
  2026-05-07. WP-007a uses the v1 URL `cards.barefootbetters.com`
  for the header nav link; the migration is a separate scoped WP.
- `PUBLIC_BASE_URL` env-var update on the apps/server Render
  deploy — Stripe Checkout's success / cancel redirects need to
  point at `play.legendary-arena.com` once this WP locks, but
  that change is server-side env config, not an arena-client
  change. Surface as a follow-up at WP-007a lock; do not modify
  the server here.
- Engine repo transfer (`barefootbetters/legendary-arena` →
  `legendary-arena/legendary-arena-game`) — explicitly out of
  scope per `01-VISION.md` Decisions log. If the transfer
  happens before WP-007a executes, point CF Pages at the new
  GitHub repo URL and note it in the Decisions log entry; the
  WP itself is unaffected.
- Game-flow features, gameplay logic, store shape changes — out
  of scope. WP-007a is a deploy + brand-integration WP, not a
  client-feature WP.
- Brand-tokens v2 changes — would require a `CHANGELOG.md`
  entry and coordinated consumer updates per the v1 rules.
  WP-007a only consumes v1; it does not bump the version.
- Real branded logo / favicons in arena-client — deferred per
  `01-VISION.md` Decisions log (logo work is a separate creative
  effort); placeholders remain consistent with www.
- Vue Router introduction — the SPA fallback `_redirects` is a
  forward-compatibility hedge; introducing a real router with
  `createWebHistory` is a separate engine-repo WP.
- Analytics integration (Cloudflare Web Analytics, Plausible,
  Google Analytics, etc.) — explicitly deferred per
  `03-ROADMAP.md` "Beyond the current WPs" section. Decide
  post-launch.
- Custom CF Workers, CF Functions, edge logic on `play.*` —
  out of scope. CF Pages is enough for a static SPA;
  introducing Workers expands surface area unnecessarily.
- WAF / rate-limiting / bot management beyond CF defaults —
  out of scope. The arena-client itself has no auth surface
  (the game-server API on `api.*` does, and that's covered by
  its own posture).

## Authority

Subordinate to `docs/01-VISION.md` (highest), then
`03-ROADMAP.md`, then this file (marketing-side authority chain).

When editing files in the engine monorepo
(`apps/arena-client/**`, `docs/ops/domains.json`, etc.), also
subordinate to the engine repo's `.claude/CLAUDE.md`,
`docs/ai/ARCHITECTURE.md`, and `.claude/rules/*.md`. The two
authority chains do not conflict for this WP — the brand-token
integration is UI / CSS / static-asset work that respects every
engine-side layer rule — but if they appear to conflict during
execution, surface the conflict before proceeding.

`docs/01-VISION.md` Global invariants are bright lines: same commit
→ same output, brand tokens are an API contract (consumed
cross-origin by `play.*`), no retroactive breakage of completed WPs
(specifically, WP-006's CORS contract). WP-007a is the WP that
turns "brand tokens are an API contract" from a marketing-side
guarantee into a load-bearing client-side dependency.

`docs/brand/strategy.md` is the canonical authority for voice,
tone, terminology, and CTA contract. WP-007a authors a small amount
of header / footer copy (nav labels) and any in-client status text
that's brand surface; § 10 brand failure modes apply. When in
doubt, defer to the wording already used on www.

## Background

WP-006 locked on 2026-05-09:

- `https://www.legendary-arena.com/brand-tokens.css` is reachable
  cross-origin with `Access-Control-Allow-Origin: *`,
  `Cache-Control: public, max-age=3600, must-revalidate`, and
  `Version: v1` visible in body.
- The CORS contract is reproducible from the marketing repo's
  `static/_headers` plus the zone-level "Respect Existing Headers"
  Browser Cache TTL setting.
- The apex → www redirect is implemented as a zone-level
  Cloudflare Redirect Rule (post-execution amendment); the
  `_redirects` engine on CF Pages does **not** support full-URL
  source patterns — a constraint that is irrelevant for WP-007a's
  SPA-fallback use of `_redirects` (path-only sources are
  supported).

The engine monorepo ships `apps/arena-client` as a Vue 3 + Vite
SPA with workspace dependencies on `@legendary-arena/preplan`
(runtime, per D-5901), `@legendary-arena/game-engine` (devDep —
test / compile-time only), and `@legendary-arena/vue-sfc-loader`
(devDep — build/test-only loader, never in production bundle per
the engine `.claude/rules/architecture.md` Shared Tooling rule).
The build is `vite build`, output `apps/arena-client/dist/`. The
production build dead-code-eliminates the dev-fixture branch in
`src/main.ts` (the `__WP061_DEV_FIXTURE_HARNESS__` marker is the
EC-067 grep target for verifying DCE).

WP-007a is the WP that puts `apps/arena-client` in front of a CDN
and verifies the cross-site brand contract end-to-end. The
marketing-side global invariant "brand tokens are an API contract"
has been theoretical until this WP — `play.*` is the first real
cross-origin consumer in production. Don't lock until the
cross-origin fetch check, the local-fallback network-block check,
and the version-header check have all passed against the live URL
`https://play.legendary-arena.com/` — those are the three things
WP-007b will assume on day one when its analogous integration
ships, and the three things WP-009 will audit when it runs.

After WP-007a locks, the v1 LOCKED carve-out for cross-site
consumption (per `docs/brand/strategy.md` § 11 / WP-002 Lock
notes) is half-closed; closure completes when WP-007b also
locks. WP-009's audit baseline activates after both lock.

`pnpm --filter @legendary-arena/arena-client dev` (Vite at
`http://localhost:5173/`) and the local production-build path
(`pnpm --filter "@legendary-arena/arena-client..." build` then
`python -m http.server` from `apps/arena-client/dist/`) both
remain available throughout this WP. Use whichever fits the
verification step. The CF preview URL
(`*.pages.dev` or `<branch>--<project-name>.pages.dev`) is the
right surface for build-parity verification before binding the
custom domain.
