# WP-007b — Registry viewer brand integration (cards.barefootbetters.com)

Update the existing `cards.barefootbetters.com` deployment of
`apps/registry-viewer` (engine monorepo) to consume brand tokens
cross-origin from `https://www.legendary-arena.com/brand-tokens.css`
(with a bundled local fallback) and to present a unified header /
footer matching www and play. **No new deployment**, **no new DNS**,
**no custom-domain rebind** — this is a brand-integration update to
an already-live site.

This file is the **session-ready execution pack**. The design source
of truth is [`docs/03-ROADMAP.md` § WP-007b](../../03-ROADMAP.md). If
this file and the roadmap conflict, the roadmap wins.

## Authority note (read before starting)

WP-007b is a **dual-repo WP** with the same governance posture as
WP-007a:

- The WP file, the roadmap, vision, brand tokens, and the live
  `brand-tokens.css` URL contract all live in this repo
  (`legendary-arena/legendary-arena-website`, working dir
  `C:\www\legendary-arena-com\`).
- The actual `registry-viewer` source, build, and deploy artifacts
  live in the **engine monorepo** (current repo:
  `barefootbetters/legendary-arena`; future repo per `01-VISION.md`
  Decisions log: `legendary-arena/legendary-arena-game`; working dir
  on this machine: `C:\pcloud\BB\DEV\legendary-arena\`).

The engine monorepo has its own governance system
(`CLAUDE.md`, `.claude/rules/*.md`, `docs/ai/ARCHITECTURE.md`,
work-packets / execution-checklists). When this WP edits files inside
`apps/registry-viewer/**`, those edits are subject to the engine
repo's rules — particularly the **Layer Boundary** rules
(`.claude/rules/architecture.md`). The brand-token integration in
this WP is UI/CSS-only and does not cross any engine layer boundary,
but the executor MUST NOT take this WP as license to change
engine-side registry, server, or schema code "while in the area." If
a real engine-side change surfaces during execution, stop and raise
it as a separate engine-repo WP.

The marketing-site roadmap is the design source for **what WP-007b
does**; the engine-repo rules are the constraint for **how the
registry-viewer edits land**. Both win in their own domains. If they
appear to conflict, surface the conflict before proceeding.

## Hostname posture (read carefully — do not "fix")

The roadmap, `01-VISION.md` v1 Decisions log (2026-05-07), and
`apps/registry-viewer/CLAUDE.md` all agree: the registry stays at
`cards.barefootbetters.com` for v1. The migration to
`cards.legendary-arena.com` is a **deferred separate WP** with its
own scope, and is **explicitly out of scope here**.

`docs/ops/domains.json` in the engine repo currently lists a
`cards.legendary-arena.com` entry as `state: "planned"` with notes
about migrating off the placeholder Pages project. **That entry
describes the deferred future migration, not WP-007b.** Do NOT flip
that `state` field, do NOT add a new domains.json entry for
`cards.barefootbetters.com`, and do NOT rewrite the notes block —
domains.json is the canonical list of `legendary-arena.com`
subdomains (the file's own header comment says "subdomains of
legendary-arena.com"); `cards.barefootbetters.com` lives outside
that zone by design and is intentionally absent. If this gap feels
wrong, that is a domains.json scope question, not a WP-007b
question — surface and defer.

The only mention WP-007b adds to `domains.json` is **none**. The
file is read-only consulted in this WP.

## Execution discipline (non-negotiable)

This WP executes in **strict integration mode**, not feature mode.

Scope is LIMITED to:

- Static asset wiring (`apps/registry-viewer/index.html`,
  `apps/registry-viewer/public/*`)
- UI presentation (a new
  `apps/registry-viewer/src/components/branding/` directory; scoped
  styles inside existing `.vue` SFCs that currently hold raw color
  hex values; the existing inline `<style>` block in `index.html`)
- Marketing-repo lock metadata (`03-ROADMAP.md`, `01-VISION.md`
  Decisions log)

Scope EXCLUDES:

- Registry data shape, schema, or Zod validators
  (`packages/registry/**`, `apps/registry-viewer/src/registry/**`,
  `apps/registry-viewer/src/lib/*Client.ts`)
- Any `apps/registry-viewer/src/composables/*.ts` runtime logic
- The R2 fetch boundary or `public/registry-config.json`
- Engine packages (`packages/game-engine`, `packages/preplan`,
  `apps/server`, `apps/arena-client`)
- Brand-token contract values
  (`C:\www\legendary-arena-com\static\brand-tokens.css`)
- Cloudflare Pages project configuration of the existing deploy
  (build command, output dir, branch — already-set values are NOT
  changed; the only CF action is a deploy refresh after the source
  edits land on `main`)
- DNS for `cards.barefootbetters.com` (already in place; untouched)
- `docs/ops/domains.json` and `docs/ops/DOMAINS.md` (per Hostname
  posture above)
- Test infrastructure beyond fixing tests broken by the
  brand-integration edits themselves

Any required change outside this scope MUST:

1. Halt execution.
2. Be written as a separate WP in the correct repo (engine-side
   work → engine-repo WP per `.claude/rules/work-packets.md`;
   marketing-side work → new entry in `03-ROADMAP.md`).
3. Be explicitly approved before proceeding.

**No "while we're here" edits are permitted.** A diff that touches
files outside the scope list above is a WP-007b failure condition,
even if the touched files compile and tests pass.

## Working directory

This WP touches files in two working directories:

- `C:\www\legendary-arena-com\` — marketing site repo. The
  brand-token contract URL lives here and is locked under WP-006.
  This WP **does not modify** any file in this repo at execution
  time except the WP file itself (post-lock amendments) and the
  roadmap / vision lock entries. The repo is read-only consulted;
  the only outbound artifact is the live `brand-tokens.css` URL.
- `C:\pcloud\BB\DEV\legendary-arena\` — engine monorepo, pnpm
  workspaces, Node ≥ 22. All registry-viewer code edits happen
  here. The `apps/registry-viewer/` package builds with Vite 5 and
  outputs to `apps/registry-viewer/dist/`.

When the WP says "commit," the repo it commits to is the **engine
monorepo** unless the file path is under
`C:\www\legendary-arena-com\`.

## Required reading (in order)

Before touching registry-viewer or the existing CF Pages project,
read these — they set the bar:

1. **Marketing-site governance:**
   - `C:\www\legendary-arena-com\docs\01-VISION.md` — vision, Global
     invariants, Decisions log. Two invariants load-bear here:
     - **Brand tokens are an API contract** consumed cross-origin by
       `cards.barefootbetters.com`. v1 → v2 requires coordinated
       consumer updates BEFORE the new tokens publish. WP-007b is
       the WP that wires `cards.*` as a real consumer.
     - **No retroactive breakage.** WP-002 v1 LOCKED for WWW
       explicitly carved out cross-site consumption — that
       consumption is verified in this WP for `cards.*`. If anything
       in here requires a token change, stop: a v1 → v2 bump is a
       separate WP.
     - The 2026-05-07 Decisions log entry pinning the registry to
       `cards.barefootbetters.com` for v1.
   - `C:\www\legendary-arena-com\docs\03-ROADMAP.md` — full WP list.
     Read **WP-007b** in detail (Goal, Deliverables, Cross-site
     contract, Constraints, DoD, Exit criteria, Failure conditions,
     Rollback). Re-read WP-006's lock notes — its CORS contract
     (`Access-Control-Allow-Origin: *`,
     `Cache-Control: public, max-age=3600, must-revalidate`,
     `Version: v1` in body) is what this WP consumes. Skim WP-007a
     and WP-008 — they run in parallel and share zero write paths
     with WP-007b.
   - `C:\www\legendary-arena-com\docs\brand\strategy.md` § 2 (Voice
     and tone), § 5 (Layout patterns), § 10 (Brand failure modes).
     The shared header / footer this WP adds to `cards.*` is brand
     surface — terminology rules and failure modes apply.
   - `C:\www\legendary-arena-com\docs\brand\palette.md` § 4
     (semantic tokens), § 4.4 (class-color subsystem — applies to
     any class-scoped chip / accent that appears in card detail
     UI), § 8 (contrast pairs).
   - `C:\www\legendary-arena-com\static\brand-tokens.css` — the
     live token file. Read the version header. `Version: v1` is the
     contract value this WP verifies in consumer fetches.

2. **Engine-monorepo governance (constrains all registry-viewer
   edits):**
   - `C:\pcloud\BB\DEV\legendary-arena\.claude\CLAUDE.md` — root
     coordination. Note the Lint Gate, Execution Checklist
     governance, and architecture-rule hierarchy.
   - `C:\pcloud\BB\DEV\legendary-arena\.claude\rules\architecture.md`
     — Layer Boundary rules. The `apps/registry-viewer` row says it
     may import `@legendary-arena/registry` and a UI framework. It
     must NOT import `game-engine`, `preplan`, `server`, or `pg`
     at runtime. Brand-token integration is pure UI / CSS and does
     not cross any layer boundary, but the executor must read the
     rules before touching the package so that "obviously
     brand-related" edits don't accidentally pull in a
     layer-crossing import.
   - `C:\pcloud\BB\DEV\legendary-arena\.claude\rules\code-style.md`
     — naming, function size, comments, abstraction discipline.
     Applies to any TypeScript / Vue code this WP adds (e.g., a
     header / footer component).
   - `C:\pcloud\BB\DEV\legendary-arena\docs\ai\ARCHITECTURE.md` §
     Layer Boundary — authoritative version of the import-rules
     table.

3. **registry-viewer current state:**
   - `C:\pcloud\BB\DEV\legendary-arena\apps\registry-viewer\CLAUDE.md`
     — package overview, key files, theme data pipeline, scoped-CSS
     convention. Confirms the current canonical URL is
     `https://cards.barefootbetters.com/`.
   - `C:\pcloud\BB\DEV\legendary-arena\apps\registry-viewer\package.json`
     — build script `vite build`, type `module`, deps + devDeps.
     Production deps are `@legendary-arena/registry`, `vue`, `zod`
     — layer-rule clean. No new runtime deps are needed for this
     WP.
   - `C:\pcloud\BB\DEV\legendary-arena\apps\registry-viewer\index.html`
     — the entry HTML Vite serves. Currently contains an inline
     `<style>` block with raw hex values (`#0f0f13`, `#e8e8ee`)
     and a `system-ui` font fallback chain. Step 3 replaces these
     with token references.
   - `C:\pcloud\BB\DEV\legendary-arena\apps\registry-viewer\vite.config.ts`
     — Vite config; `outDir: "dist"`, `target: "es2022"`, vue
     plugin, no special asset pipeline beyond Vite defaults. The
     `public/` directory is copied verbatim into `dist/` during
     build (Vite default), so the local fallback CSS this WP adds
     to `public/` ends up at `dist/brand-tokens.local.css`.
   - `C:\pcloud\BB\DEV\legendary-arena\apps\registry-viewer\src\App.vue`
     — root component. All app state, both views (cards / themes /
     loadout), tab switching. Header / footer mounting goes around
     this component, not inside it. See Step 5 for the mount-point
     rule.
   - `C:\pcloud\BB\DEV\legendary-arena\apps\registry-viewer\src\components\`
     — existing components (CardGrid, CardDetail, ThemeGrid, etc.).
     Audit-scope-only; do not modify their runtime logic. The only
     component-level edits permitted are color-value swaps in
     scoped `<style>` blocks where raw hex values currently live.

4. **Cloudflare Pages docs (consult during Step 8 only if a deploy
   refresh fails):**
   - <https://developers.cloudflare.com/pages/configuration/build-configuration/>
     — build config reference. The existing `cards.barefootbetters.com`
     project's build command and output directory are **already
     set**; this WP does not change them. Consult only if a refresh
     deploy fails and you need to verify the existing config
     against expectation.
   - <https://developers.cloudflare.com/pages/platform/git-integration/>
     — git integration. The existing project is already wired to
     the engine monorepo; pushing to `main` (or whichever branch
     the project tracks) triggers a deploy automatically.

Don't read prior session transcripts; the committed artifacts are
the truth.

## Assumptions (read first)

- **WP-006 is locked and live.** `https://www.legendary-arena.com/`
  serves the marketing site. `https://www.legendary-arena.com/brand-tokens.css`
  returns `200` with `Access-Control-Allow-Origin: *`,
  `Cache-Control: public, max-age=3600, must-revalidate`, and the
  `Version: v1` header comment in body. If any of those preconditions
  fails, **stop** — WP-007b cannot lock against a moving contract.
- **`cards.barefootbetters.com` is already live.** The CF Pages
  project (named "legendary-arena" per `domains.json` notes) is
  already connected to the engine monorepo, building
  `apps/registry-viewer`, and serving the result at the existing
  custom domain. DNS is in place. No new CF project, no new DNS, no
  custom-domain rebind. If any of these is NOT true (e.g., the
  custom domain is unbound, the project doesn't exist, the build
  config points elsewhere), surface as a Step 1 pre-flight blocker —
  do not silently take on standing-up the deployment as part of
  WP-007b.
- **WP-007a is parallel-safe with WP-007b.** Per the roadmap, the
  two WPs touch zero shared write paths. WP-007a may have already
  landed by the time WP-007b runs; WP-007b may also run first. The
  cross-site contract is the same in both directions.

## Current state

What works (locked under WP-001 through WP-006):

- `https://www.legendary-arena.com/` is live (WP-006 lock 2026-05-09)
- `https://www.legendary-arena.com/brand-tokens.css` is reachable
  cross-origin with `Access-Control-Allow-Origin: *`, the WP-006
  cache-control posture, and `Version: v1` visible in body
- Brand tokens v1 LOCKED for WWW (WP-002 + WP-003); cross-site
  consumption verified separately under WP-007a / WP-007b — **this
  WP is that verification for `cards.*`**
- `apps/registry-viewer` builds locally via `pnpm --filter
  registry-viewer build` (Vite 5, output
  `apps/registry-viewer/dist/`)
- `https://cards.barefootbetters.com/` is already live and serving
  the unbranded registry-viewer (current colors: `#0f0f13`
  background, `#e8e8ee` text, scoped per-component dark theme)

What's pending — **your job**:

- ❌ Cross-origin token fetch verified working from a non-www origin
  (specifically, from `cards.barefootbetters.com`)
- ❌ `apps/registry-viewer/index.html` includes a `<link>` to
  `https://www.legendary-arena.com/brand-tokens.css` and a `<link>`
  to a bundled local fallback at `/brand-tokens.local.css`, with
  the inline `<style>` block reduced to a minimal reset that uses
  token variables only
- ❌ Local fallback `brand-tokens.css` bundled with registry-viewer
  (under `apps/registry-viewer/public/brand-tokens.local.css`),
  byte-identical to the live contract after stripping a leading
  SNAPSHOT comment block
- ❌ Shared header / footer matching www + play brand identity, with
  working nav links to `https://www.legendary-arena.com` (label:
  "Home") and `https://play.legendary-arena.com` (label: "Play").
  Per `01-VISION.md` v1 Decisions log, the registry stays at
  `cards.barefootbetters.com` for v1; the registry's own URL is
  not a nav target on its own header.
- ❌ Per-component scoped `<style>` blocks audited for raw hex
  values where a token applies; raw hex replaced with
  `var(--la-*)` references. Class-color tokens
  (`--la-color-class-*`) wired wherever the registry surfaces a
  hero class (e.g., the `filterHC` chip set in `App.vue` covering
  `covert`, `instinct`, `ranged`, `strength`, `tech`).
- ❌ Existing card-search / filter / theme browsing functionality
  unmodified; smoke test passes (search a known card, verify hit;
  open a theme, verify cross-link to a card; toggle the loadout
  tab, verify it renders)
- ❌ Production deploy refreshed via push to `main`; live site at
  `https://cards.barefootbetters.com/` reflects the brand changes
- ❌ Live-site verification: Lighthouse ≥ 90 in all four
  categories; zero console errors; cross-origin token fetch
  succeeds with `Version: v1` confirmed in DevTools network tab;
  local fallback present in the bundle; SHA-256 hash parity
  confirmed between the live www token file and the bundled
  snapshot
- ❌ WP-007b marked ✅ Done in `03-ROADMAP.md`; Decisions log entry
  in `01-VISION.md`

## Task

### Step 1 — Pre-flight + decide what NOT to change

Before opening the CF dashboard or editing `apps/registry-viewer`,
confirm:

- WP-006 is ✅ Done in `03-ROADMAP.md` and the lock commit is on
  `origin/main` of the marketing-site repo.
- `curl -I -H "Origin: https://cards.barefootbetters.com" https://www.legendary-arena.com/brand-tokens.css`
  returns `200` with `Access-Control-Allow-Origin: *` and the
  expected cache headers.
- `curl https://www.legendary-arena.com/brand-tokens.css | head -n 20`
  shows `Version: v1` in the header comment block.
- `pnpm install --frozen-lockfile && pnpm --filter registry-viewer build`
  succeeds from a clean engine-monorepo working tree. Output
  appears at `apps/registry-viewer/dist/index.html` plus assets.
- `https://cards.barefootbetters.com/` currently returns `200` and
  serves the unbranded registry-viewer. (The deploy is live; this
  WP refreshes the same deploy with branding.)
- The CF Pages project that owns `cards.barefootbetters.com` is
  reachable in the dashboard with the engine-monorepo git
  integration active (project name: `legendary-arena` per
  `docs/ops/domains.json`).

**Do not** at this step:

- Touch `static/brand-tokens.css` or any file under
  `C:\www\legendary-arena-com\static\` / `docs\brand\`. The WP-002
  v1 lock applies. If a token gap surfaces (e.g., the registry-viewer
  needs a color the v1 token set doesn't expose), stop and surface —
  a v1 → v2 bump is a separate WP, not a "while we're here" edit.
- Modify `apps/registry-viewer/package.json`, `pnpm-lock.yaml`, or
  any workspace package's `package.json`. Brand integration is pure
  HTML / CSS / Vue work; no new runtime deps are needed.
- Change anything under `packages/game-engine/`, `packages/preplan/`,
  `apps/server/`, or `apps/arena-client/`. The Layer Boundary rules
  prohibit reaching across layers; this WP touches the
  registry-viewer only.
- Change anything under `apps/registry-viewer/src/registry/**`,
  `apps/registry-viewer/src/lib/*Client.ts`, or `apps/registry-viewer/public/registry-config.json`.
  These are data-pipeline files; brand integration does not touch
  them.
- Modify `docs/ops/domains.json` or `docs/ops/DOMAINS.md`. Per
  "Hostname posture," the `cards.legendary-arena.com` entry there
  describes the deferred future migration, not WP-007b.
- Add new top-level dependencies. CF Pages reads the engine
  monorepo's `package.json` and `pnpm-lock.yaml`; no changes needed
  here, no changes needed there.

If any pre-flight check fails, stop and surface — don't push edits
that depend on a state that isn't true yet.

### Step 2 — Verify the WP-006 CORS contract from a foreign origin

Before integrating, confirm the contract behaves correctly when
fetched from an origin that is **not** `www.legendary-arena.com`. The
simplest mechanical check:

```powershell
# Wildcard ACAO check from a synthetic origin
curl -I -H "Origin: https://cards.barefootbetters.com" `
  https://www.legendary-arena.com/brand-tokens.css

# Body check — Version: v1 in header comment
curl -s https://www.legendary-arena.com/brand-tokens.css | Select-String -Pattern '^\s*\*\s*Version:'

# Browser-equivalent fetch check (paste in DevTools Console of the
# live cards.barefootbetters.com site BEFORE branding lands — proves
# the CORS path from the actual production origin):
#   await (await fetch('https://www.legendary-arena.com/brand-tokens.css',
#     { mode: 'cors' })).text()
# Should resolve to the file body (not throw a CORS error).
```

If any of these fails, **stop** — fix the WP-006 contract before
attempting WP-007b. The most likely cause is the
`legendary-arena.com` zone's "Browser Cache TTL" zone setting
drifting back to a non-default value (per WP-006 lock note, it must
be set to "Respect Existing Headers"); a CF zone-setting regression
masks as a `Cache-Control` mismatch.

### Step 3 — Wire brand-token consumption into `apps/registry-viewer/index.html`

Edit `C:\pcloud\BB\DEV\legendary-arena\apps\registry-viewer\index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Legendary Arena — Registry Viewer</title>
    <!-- WP-007b brand-token consumption.
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
         Both files MUST share byte-identical contents (after stripping
         the SNAPSHOT comment header from the local file); SHA-256
         parity is verified at WP lock and at every WP that touches
         either side of the contract (see Step 4 "Snapshot integrity
         check" + DoD).
         The crossorigin attribute is intentionally OMITTED for the
         same reason as WP-007a: the live URL responds with
         Access-Control-Allow-Origin: *, so the link works without an
         explicit CORS mode declaration. -->
    <link rel="stylesheet" href="/brand-tokens.local.css" />
    <link rel="stylesheet" href="https://www.legendary-arena.com/brand-tokens.css" />
    <style>
      /* Minimal reset only — all colors and fonts route through brand
         tokens loaded above. No raw hex here. */
      *, *::before, *::after { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: var(--la-font-sans, system-ui, -apple-system, sans-serif);
        background: var(--la-color-bg-primary);
        color: var(--la-color-text-primary);
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

Hard rules on the wiring (identical to WP-007a):

- **Order is contractual.** Local fallback first, cross-origin live
  URL second. Reversing the order silently breaks the fallback
  path: the live URL would no longer override during normal
  operation, and a stale snapshot would shadow the live contract.
  An audit reading this file MUST be able to confirm the ordering
  by inspection.
- **`@import` is forbidden** for the cross-origin URL. `@import`
  blocks rendering on the imported sheet's resolution; `<link>` in
  `<head>` is parallelizable.
- **No JavaScript-driven token loading.** The wiring is two static
  `<link>` tags; no `onerror` handler, no dynamic injection, no
  Service Worker fetch interception.
- **The inline `<style>` block must NOT reintroduce raw hex.** It
  exists only to apply the box-sizing reset and the body
  background/color from token variables. The token-variable
  references in this block (`--la-color-bg-primary`,
  `--la-color-text-primary`, `--la-font-sans`) MUST exist in
  `static/brand-tokens.css` v1; if any does not, stop — name the
  missing token in the surface, surface as a v1 → v2 bump
  question (separate WP), and do NOT silently substitute a hex
  value as a workaround.

### Step 4 — Bundle the local fallback

Copy the locked v1 token file from the marketing-site repo into the
registry-viewer's static-asset directory:

```powershell
Copy-Item `
  C:\www\legendary-arena-com\static\brand-tokens.css `
  C:\pcloud\BB\DEV\legendary-arena\apps\registry-viewer\public\brand-tokens.local.css
```

Verify the destination file's first lines show the WP-002 lock
header (`Version: v1`, the cross-site-API-contract comment block).
Vite copies anything under `apps/registry-viewer/public/` verbatim
into `dist/` at the same path during build, so this file ends up at
`dist/brand-tokens.local.css` and is reachable at
`https://cards.barefootbetters.com/brand-tokens.local.css` after
deploy.

Add a tracking note inside the file (a leading comment line above
the copied header) so a future reader knows it's a snapshot, not
the canonical source:

```css
/* SNAPSHOT — do not edit here. Canonical source:
 * https://www.legendary-arena.com/brand-tokens.css
 * Refreshed under WP-007b on YYYY-MM-DD; future v1 → v2 bump must
 * also refresh this file per 01-VISION.md cross-site contract. */
/*
 * Legendary Arena Brand Tokens
 * Version: v1
 * ...
 */
```

The "Refreshed under WP-007b on YYYY-MM-DD" line gets a real date
at lock; the snapshot's hash MUST match the live file at lock time
(mechanical check below).

**Snapshot integrity check (required at lock and at every WP that
touches either side of the contract):**

Compute SHA-256 of:

- `https://www.legendary-arena.com/brand-tokens.css` (the live
  contract, as served by CF Pages — fetch with `curl` and hash the
  response body; do NOT hash the file in
  `C:\www\legendary-arena-com\static\` because Hugo's `static/` →
  `public/` copy is byte-identical but the `curl` of the live URL
  is the load-bearing source for consumers)
- `apps/registry-viewer/public/brand-tokens.local.css` (the bundled
  snapshot, hashed at the file system, with the SNAPSHOT comment
  block stripped before hashing)

```powershell
# Live URL
$live = (Invoke-WebRequest -Uri "https://www.legendary-arena.com/brand-tokens.css").Content
$liveHash = (Get-FileHash -InputStream ([IO.MemoryStream]::new([Text.Encoding]::UTF8.GetBytes($live))) -Algorithm SHA256).Hash

# Local snapshot (excluding the SNAPSHOT comment header)
$snapshot = Get-Content -Raw `
  C:\pcloud\BB\DEV\legendary-arena\apps\registry-viewer\public\brand-tokens.local.css
$canonicalBody = ($snapshot -split '/\* SNAPSHOT.*?\*/', 2)[1].TrimStart()
$snapHash = (Get-FileHash -InputStream ([IO.MemoryStream]::new([Text.Encoding]::UTF8.GetBytes($canonicalBody))) -Algorithm SHA256).Hash

if ($liveHash -ne $snapHash) { throw "Snapshot stale — refresh required before lock." }
```

Hash parity rules (identical to WP-007a):

- Hashes MUST match byte-for-byte (after the SNAPSHOT comment
  block is stripped from the local file for comparison).
- Mismatch = the snapshot is stale. Re-copy from
  `C:\www\legendary-arena-com\static\brand-tokens.css`, re-add the
  SNAPSHOT comment header, and re-hash. Do not lock until parity
  holds.
- A v1 → v2 bump on www would also produce a hash mismatch here,
  by design — that's the trip-wire that catches a stale snapshot
  ahead of a contract drift. If the mismatch is a real v2 bump,
  WP-007b is the wrong WP to land that change; stop and surface
  per "Execution discipline."
- **Cross-WP coordination:** if WP-007a is also in flight in
  parallel, both WPs share the same snapshot source. Either WP
  finishing first sets the snapshot for that consumer
  independently; neither WP modifies the canonical source, so
  there is no race. The hash check at lock is each WP's own
  guarantee.

### Step 5 — Apply brand to the registry-viewer UI surface

The registry-viewer now has the tokens in scope. This step makes
the UI consume them.

**Mounting requirement (explicit, non-negotiable):**

The header and footer MUST be mounted at the **top-level layout
boundary** so that:

- They render in every view (cards, themes, loadout — all three
  current tabs).
- They never duplicate across views (no risk of two headers visible
  simultaneously).
- They do not depend on, or read from, registry data, R2 fetch
  state, or tab-switcher state (header/footer must render even
  while the registry is still loading or in a load-error state).

Acceptable mount points:

- A wrapper inside `apps/registry-viewer/src/App.vue` that renders
  `<Header />` above the existing tab-switcher / view content and
  `<Footer />` below it. The wrapper is the outermost element of
  the `<template>` block.
- A new top-level layout component (e.g.,
  `src/components/branding/AppShell.vue`) used by `App.vue` as the
  outermost element.

Unacceptable mount points:

- Injecting `<Header />` / `<Footer />` into individual view
  components (CardGrid, ThemeGrid, LoadoutBuilder) — creates
  duplication risk on any future view that forgets to include
  them.
- Conditionally rendering header / footer based on `loading`,
  `loadError`, registry singleton state, or any other
  data-pipeline-derived flag (couples brand surface to data
  state — explicitly forbidden under "Execution discipline").
- Rendering header / footer inside a `v-if` block whose condition
  could ever evaluate `false` during normal operation (including
  the "registry still loading" state — the brand shell renders
  even while the data pipeline is in flight).

**Header content:**

- Wordmark / placeholder logo per `palette.md` § 4 routing (use
  `--la-color-text-primary` on `--la-color-bg-primary`).
- Nav links:
  - `https://www.legendary-arena.com` → label "Home"
  - `https://play.legendary-arena.com` → label "Play"
- The registry's own URL is not a self-link in its own header.

**Footer content:**

- Legal / copyright line; matches www's footer structure (read
  `C:\www\legendary-arena-com\layouts\partials\footer.html` or the
  PaperMod footer override for parity).

**Per-component color audit:**

Every existing component's scoped `<style>` block under
`apps/registry-viewer/src/components/` is in audit scope **for color
values only**. Layout, sizing, and structural CSS are out of scope.
For each scoped style block:

- Replace any raw hex value (`#xxxxxx`) with `var(--la-*)` from the
  v1 token set.
- Replace any raw `rgb(...)` / `rgba(...)` value used for a brand
  surface (background, foreground, accent) with
  `var(--la-*)`. Functional `rgba(...)` for opacity overlays where
  no token exists is acceptable IF the base color routes through a
  token (e.g., `color-mix(in srgb, var(--la-color-bg-primary) 80%,
  transparent)`).
- For elements that surface a hero class
  (e.g., `App.vue`'s `filterHC` chip set covering
  `covert`, `instinct`, `ranged`, `strength`, `tech`), use
  `--la-color-class-{hc}` per the `palette.md` § 4.4 application
  patterns: `border-accent`, `chip-fill`, `icon-accent`,
  `selection-state`. Full-surface fill is permitted only on
  class-scoped elements per palette.md § 4.4 / § 10.

**No raw hex values** anywhere outside `brand-tokens.local.css`
(which is the snapshot of the canonical contract). This is the
rule WP-009 will audit. Use the tokens correctly the first time
and WP-009 becomes a verification, not a remediation.

Do **not** modify any non-UI registry-viewer file in this step.
Specifically, do not touch:

- `apps/registry-viewer/src/main.ts` (bootstrap; already fine)
- `apps/registry-viewer/src/lib/*Client.ts` (R2 fetch boundary;
  data-pipeline)
- `apps/registry-viewer/src/composables/*.ts` (runtime logic;
  out of scope)
- `apps/registry-viewer/src/registry/**` (schema, types, shared
  helpers; out of scope)
- `apps/registry-viewer/public/registry-config.json` (runtime
  config; out of scope)
- Any `.test.ts` file (existing tests should still pass; if a
  brand edit breaks a snapshot or DOM-shape test, fix the test in
  the same commit and explain in the commit message)

### Step 6 — Smoke test in dev

From the engine monorepo:

```powershell
pnpm --filter registry-viewer dev
```

Open the dev URL Vite prints. Verify:

- The header renders at the top of every view (cards, themes,
  loadout); the footer renders at the bottom.
- Header nav links open the correct destinations
  (`www.legendary-arena.com`, `play.legendary-arena.com`).
- Background, text, and accent colors match www's brand identity
  (eyeball check against `https://www.legendary-arena.com/`).
- Card grid, card detail, theme grid, theme detail, loadout
  builder, and loadout preview all render without DOM-shape
  regressions. Tab switching works.
- Search a known card by name; verify a hit appears in the grid.
- Open a theme; verify cross-link to a card works (theme card link
  cross-navigates to Cards view with filter).
- `filterHC` chips for the five hero classes (`covert`,
  `instinct`, `ranged`, `strength`, `tech`) display with the
  correct class-color accent per `--la-color-class-{hc}`.
- DevTools Console shows no errors. DevTools Network tab shows the
  cross-origin `brand-tokens.css` fetch from
  `www.legendary-arena.com` succeeded (status `200`, served from
  cache or fresh per `Cache-Control` posture).

If any check fails, fix in the corresponding source file and
re-verify. Do not proceed to Step 7 until dev is clean.

### Step 7 — Build + bundle verification

```powershell
pnpm --filter registry-viewer build
```

Verify in `apps/registry-viewer/dist/`:

- `index.html` exists and contains both `<link>` tags from Step 3
  in the contractual order (local fallback first, cross-origin
  second). Vite's HTML transform should preserve this verbatim;
  if it doesn't, that's a build-config blocker — surface, do not
  hand-patch the dist output.
- `brand-tokens.local.css` exists at the dist root (Vite copies
  `public/` verbatim).
- Bundle byte size has NOT exploded — compare to a baseline build
  before WP-007b's edits. The brand integration adds one CSS
  file (the local fallback) plus a header/footer component (small
  Vue SFC); total `dist/` size should grow on the order of single-
  digit kilobytes. A multi-megabyte regression points at an
  accidental import.
- No `apps/registry-viewer/dist/` artifacts reference any forbidden
  package: grep the dist for `game-engine`, `preplan`, `pg`, or
  `apps/server` source-map references — they MUST NOT appear.
  Brand integration must not have pulled in a forbidden import.
- Tests still pass: `pnpm --filter registry-viewer test`.
- Typecheck passes: `pnpm --filter registry-viewer typecheck`.
- Lint passes: `pnpm --filter registry-viewer lint`.

If any check fails, fix in source and rebuild. Do not push to
`main` (Step 8) until the build is clean.

### Step 8 — Refresh the existing CF Pages deploy

This step does **not** create a new CF Pages project, **not**
change build commands, **not** touch DNS, **not** rebind a custom
domain. The existing deployment of `cards.barefootbetters.com` is
already wired to the engine monorepo. The refresh mechanism is a
plain push to the branch the project tracks.

1. Commit the engine-monorepo changes to a feature branch:

   ```powershell
   git -C C:\pcloud\BB\DEV\legendary-arena checkout -b wp-007b-cards-brand
   git -C C:\pcloud\BB\DEV\legendary-arena add apps/registry-viewer/index.html `
     apps/registry-viewer/public/brand-tokens.local.css `
     apps/registry-viewer/src/App.vue `
     apps/registry-viewer/src/components/branding/ `
     # plus any scoped-style edits in src/components/*.vue
   git -C C:\pcloud\BB\DEV\legendary-arena commit -m "WP-007b: cards.barefootbetters.com brand integration"
   git -C C:\pcloud\BB\DEV\legendary-arena push -u origin wp-007b-cards-brand
   ```

2. Open a PR against `main`. CF Pages will build a preview deploy
   on a `*.pages.dev` URL. Verify the preview against the same
   smoke checks as Step 6 (header/footer, color tokens, card
   browse, theme browse, loadout, no console errors,
   cross-origin token fetch succeeds, bundled fallback present).

3. Merge to `main`. CF Pages builds the production deploy and
   serves it at `cards.barefootbetters.com`.

4. Wait for the production deploy to go live (CF dashboard reports
   "Success" on the production deployment for the merge commit).

If the build fails on CF, the most likely causes are:

- The `pnpm-lock.yaml` is out of date (you added a dep you weren't
  supposed to — see Step 1 "Do not"). Fix: revert the dep change.
- The build command on the CF project doesn't match
  `pnpm --filter registry-viewer build`. Fix: verify the project's
  build command in the CF dashboard. Do NOT rewrite it as part of
  WP-007b — if it's wrong, that's a separate issue (the fact that
  the deploy ever worked before WP-007b means the command was
  correct; if a CF project setting drifted, surface and resolve
  separately).
- `NODE_VERSION` env var on the CF project is set to a value below
  22. Fix: same as above — verify, do not rewrite as part of
  WP-007b.

### Step 9 — Live verification on `cards.barefootbetters.com`

After the production deploy goes live:

1. **Lighthouse ≥ 90 in all four categories** (Performance,
   Accessibility, Best Practices, SEO). Run from Chrome DevTools or
   PageSpeed Insights with the production URL. Lower than 90 in any
   category is a failure condition.

2. **Zero console errors** in production. Open DevTools Console on
   the live site; reload; trigger each tab (cards, themes, loadout);
   trigger a card detail open and a theme detail open. Console must
   be clean (info/log lines from the existing devLog instrumentation
   are acceptable; errors and uncaught exceptions are not).

3. **Cross-origin token fetch succeeds.** DevTools Network tab,
   filter by `brand-tokens.css`. The request to
   `https://www.legendary-arena.com/brand-tokens.css` MUST appear,
   return `200`, carry `Access-Control-Allow-Origin: *`, and serve
   the body containing `Version: v1`.

4. **Local fallback present in the bundle.** `curl
   https://cards.barefootbetters.com/brand-tokens.local.css` must
   return `200` with the snapshot body (SNAPSHOT comment header
   visible).

5. **Hash parity holds in production.** Re-run the snapshot
   integrity check from Step 4, but hash the deployed
   `https://cards.barefootbetters.com/brand-tokens.local.css`
   instead of the file system copy:

   ```powershell
   $live = (Invoke-WebRequest -Uri "https://www.legendary-arena.com/brand-tokens.css").Content
   $bundled = (Invoke-WebRequest -Uri "https://cards.barefootbetters.com/brand-tokens.local.css").Content
   $bundledCanonical = ($bundled -split '/\* SNAPSHOT.*?\*/', 2)[1].TrimStart()
   $liveHash = (Get-FileHash -InputStream ([IO.MemoryStream]::new([Text.Encoding]::UTF8.GetBytes($live))) -Algorithm SHA256).Hash
   $bundledHash = (Get-FileHash -InputStream ([IO.MemoryStream]::new([Text.Encoding]::UTF8.GetBytes($bundledCanonical))) -Algorithm SHA256).Hash
   if ($liveHash -ne $bundledHash) { throw "Production snapshot stale — investigate before lock." }
   ```

6. **No mixed content warnings.** Production must be HTTPS-only
   (CF Pages enforces this); the cross-origin token URL is HTTPS;
   no `http://` references in the bundle.

7. **Card-browse smoke test:** search a known card name (e.g.,
   "Cyclops"), verify a hit; open the card detail; verify
   ability tokens render; close.

8. **Theme-browse smoke test:** open a theme; verify cross-link to
   a card works; verify the chosen card filter applies on the
   Cards view.

9. **Loadout smoke test:** switch to the Loadout tab; verify the
   builder renders without error.

10. **Header / footer brand parity:** open the live site side-by-
    side with `https://www.legendary-arena.com/`. Header
    background, foreground, type, and nav-link styling must read as
    the same brand. Footer copyright line and structure must match.

If any check fails, fix in source and redeploy via Step 8. Do not
proceed to Step 10 until live verification is clean.

### Step 10 — Lock metadata

Two repos, two lock actions:

1. **Marketing-site repo** (`C:\www\legendary-arena-com\`):
   - `docs/03-ROADMAP.md` — change WP-007b status from `⏸️ Pending`
     to `✅ Done (YYYY-MM-DD)` in the table at line ~80; update
     the Readiness block in the WP-007b section (line ~1206)
     accordingly. Tick all DoD and Exit-criteria checkboxes that
     are now satisfied.
   - `docs/01-VISION.md` — add a Decisions log entry dated
     YYYY-MM-DD: "WP-007b locked. `cards.barefootbetters.com`
     consumes brand tokens v1 cross-origin from
     `www.legendary-arena.com/brand-tokens.css` with bundled local
     fallback. Hash parity verified at lock. Registry stays at
     `cards.barefootbetters.com` for v1 per 2026-05-07 entry; the
     migration to `cards.legendary-arena.com` remains a deferred
     separate WP."
   - Commit and push to `origin/main`.

2. **Engine monorepo** (`C:\pcloud\BB\DEV\legendary-arena\`):
   - The PR from Step 8 is already merged. No additional
     metadata edits required. Specifically, **do not** modify
     `docs/ops/domains.json` or `docs/ops/DOMAINS.md` — per
     "Hostname posture," the registry's `cards.legendary-arena.com`
     entry there describes a deferred future migration, not
     WP-007b.

Confirm the lock by re-running the production hash-parity check
from Step 9.5 one more time after the marketing-side commits land.
The hash should still match (the marketing-side edits only touch
docs, not `static/brand-tokens.css`).

## Definition of Done

- [ ] `https://cards.barefootbetters.com` loads with updated brand
- [ ] Visual identity matches www (same colors, type, spacing,
      header structure, footer structure)
- [ ] Header has working nav links to `www.legendary-arena.com`
      ("Home") and `play.legendary-arena.com` ("Play")
- [ ] Footer matches www's footer structure
- [ ] Card browsing, theme browsing, loadout builder unaffected
      (smoke tests pass per Step 9)
- [ ] Local fallback `brand-tokens.local.css` present in
      registry-viewer bundle and reachable at
      `https://cards.barefootbetters.com/brand-tokens.local.css`
- [ ] Cross-origin token fetch from `cards.barefootbetters.com` to
      `www.legendary-arena.com/brand-tokens.css` succeeds with
      `Version: v1` confirmed in DevTools network tab
- [ ] SHA-256 hash parity between live www token file and the
      deployed bundled snapshot (Step 9.5 check passes)
- [ ] HTTPS works; no mixed content warnings
- [ ] No raw hex values introduced anywhere in
      `apps/registry-viewer/src/**` outside
      `brand-tokens.local.css`; existing raw hex in scoped styles
      replaced with `var(--la-*)` references where a token applies
- [ ] Class-color tokens (`--la-color-class-*`) wired for the five
      hero-class chips in `App.vue`'s `filterHC` UI per
      `palette.md` § 4.4 application patterns
- [ ] No engine-side files modified outside scope (no edits under
      `packages/game-engine/`, `packages/preplan/`, `apps/server/`,
      `apps/arena-client/`, `packages/registry/`, or
      `apps/registry-viewer/src/registry/**`,
      `apps/registry-viewer/src/lib/*Client.ts`,
      `apps/registry-viewer/src/composables/*.ts`,
      `apps/registry-viewer/public/registry-config.json`)
- [ ] No marketing-side token-contract files modified (no edits
      under `static/brand-tokens.css` or `docs/brand/**`)
- [ ] No edits to `docs/ops/domains.json` or `docs/ops/DOMAINS.md`
- [ ] `pnpm --filter registry-viewer test` passes
- [ ] `pnpm --filter registry-viewer typecheck` passes
- [ ] `pnpm --filter registry-viewer lint` passes
- [ ] WP-007b marked ✅ Done in `03-ROADMAP.md`
- [ ] Decisions log entry added to `01-VISION.md`

## Exit criteria

- [ ] Lighthouse ≥ 90 in all four categories on
      `https://cards.barefootbetters.com/`
- [ ] No console errors in production (info/log lines OK)
- [ ] Cross-origin token fetch succeeds (DevTools network tab
      shows `200` + `Access-Control-Allow-Origin: *` for
      `brand-tokens.css`)
- [ ] Token version v1 confirmed via the version header comment in
      both the live www file and the bundled fallback
- [ ] Card search still returns expected results (smoke test:
      search "Cyclops" or another known card, verify hit)
- [ ] Theme cross-link still works (open a theme, click a
      cross-linked card, verify Cards view filter applies)
- [ ] Loadout tab still renders (switch tab, verify no error)
- [ ] Bundle byte-size growth is in single-digit kilobytes vs.
      pre-WP-007b baseline (no accidental import explosion)

## Failure conditions

- Visual drift from www brand identity (colors, type, header /
  footer structure)
- Card-browse, theme-browse, or loadout-builder regression
- Cross-origin token fetch blocked at runtime (CORS error in
  DevTools console)
- Local fallback missing from production bundle
- Hash parity mismatch between live www token file and deployed
  bundled snapshot at lock
- Any raw hex value in `apps/registry-viewer/src/**` outside
  `brand-tokens.local.css`
- Any edit outside the scope list in "Execution discipline"
- Any edit to `docs/ops/domains.json` or `docs/ops/DOMAINS.md`
  (per Hostname posture)
- Any edit to `static/brand-tokens.css` or `docs/brand/**` (token
  contract is locked under WP-002 / WP-003)
- New runtime dependency added to `apps/registry-viewer/package.json`
- New CF Pages project created (this WP refreshes the existing
  one; creation is out of scope)
- DNS change to `cards.barefootbetters.com` (already in place;
  any change is out of scope)

## Rollback

- **CF Pages:** revert the merge commit on `main` of the engine
  monorepo. CF Pages auto-deploys the previous `main` head, which
  restores the unbranded registry-viewer at
  `cards.barefootbetters.com`.
- **Source-level partial rollback** (e.g., revert just the
  per-component scoped-style edits while keeping the
  index.html token wiring): cherry-pick the relevant revert. The
  index.html token consumption and the local-fallback file are
  independently safe — they do not affect data-pipeline behavior.
- **Marketing-side metadata rollback:** revert the
  `03-ROADMAP.md` and `01-VISION.md` lock commits. The roadmap
  status returns to `⏸️ Pending`; the Decisions log entry is
  removed. Note that this is documentation-only; it does not
  rebrand the site, only re-opens the WP for re-execution.

## Cross-site contract

Same as WP-007a:

- Tokens consumed via cross-origin link from
  `https://www.legendary-arena.com/brand-tokens.css`
- Local fallback bundled with the consumer (under
  `apps/registry-viewer/public/brand-tokens.local.css`), byte-
  identical to the live contract after stripping the SNAPSHOT
  header, hash-verified at lock and at every WP that touches
  either side
- Major-version updates (v1 → v2) require coordinated consumer
  updates BEFORE the new tokens publish — WP-007b is one of two
  consumers (the other is WP-007a's `play.*` deploy); both must
  refresh before a v2 publish

## Out of scope (to forestall scope-creep)

The following are real concerns but are **not** WP-007b's job:

- **Migration of the registry from `cards.barefootbetters.com` to
  `cards.legendary-arena.com`.** Deferred separate WP. The
  `domains.json` entry describing the migration plan stays as-is.
- **Engine repo transfer** (`barefootbetters/legendary-arena` →
  `legendary-arena/legendary-arena-game`) — independent effort,
  per `01-VISION.md` Decisions log.
- **WP-009 cross-site class-color audit.** Runs after both
  WP-007a and WP-007b lock. WP-007b's job is to use the tokens
  correctly the first time; WP-009's job is to verify cross-site
  consistency.
- **Brand token v1 → v2 bump.** If a token gap surfaces during
  this WP, stop and surface — token changes are a separate WP per
  the cross-site contract.
- **Upstream registry-viewer feature work** (e.g., new card
  filters, new view modes). Out of scope.
- **Any change to the R2 data pipeline** (R2 bucket layout,
  `registry-config.json`, set-data fetch logic). Out of scope.
