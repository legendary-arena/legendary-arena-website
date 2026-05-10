# Legendary Arena Website — Vision

**Status:** v1 — decisions locked, brand identity v1 LOCKED for WWW (WP-002 + WP-003 done 2026-05-07; tonal iteration 2026-05-08 under §9.1 Early Lock Revision Window; cross-site consumption pending WP-007a/b)
**Repo:** github.com/legendary-arena/legendary-arena-website
**Production URL:** https://www.legendary-arena.com
**Last updated:** 2026-05-09

> **Authority:** This document is the top-level vision for the marketing
> site. It is subordinate to no other document in this repo. If a conflict
> arises with a Work Packet, README, or implementation detail, this
> document wins.

---

## Purpose

The Legendary Arena website is the **marketing landing for the Legendary
Arena game**. Its primary jobs:

1. Tell visitors what Legendary Arena is — clearly and quickly.
2. Funnel interested visitors to **play.legendary-arena.com** (the live game).
3. Provide a stable home for devblog, news, and announcements.

The site is **not** the game itself. It does not contain card data, deck
builders, or interactive gameplay. Those live at sister subdomains.

## Audience

- **Primary:** Players of the original Legendary: A Marvel Deck Building
  Game looking for a digital adaptation; deck-building game enthusiasts
  discovering LA for the first time.
- **Secondary:** Press, partners, and IP holders evaluating the project.
- **Tertiary:** Future contributors, if/when the project opens to
  outside help.

## Global invariants

These rules apply to all implementation and future changes. Violations
are bugs.

- The site remains **static-only**. No runtime APIs, no client-side data
  fetching from LA infrastructure.
- The site **does not depend on availability** of `play.*`, `registry.*`,
  or `api.*` to render or function.
- All cross-site navigation must **degrade gracefully** if a target is
  unavailable (a broken link is acceptable; a broken page is not).
- **Brand tokens** (`brand-tokens.css`) are the **single source of truth**
  for colors, typography, and spacing. No hardcoded values unless
  explicitly justified with a `// why:` comment.
- All builds must be **deterministic and reproducible locally**. The
  command that builds the site in CI must match the local command
  byte-for-byte.
- **Breaking changes to the brand token contract** require a major
  version bump AND coordinated updates to consuming sites BEFORE the new
  version publishes.
- No change may violate a locked decision without:
  - updating this document, AND
  - adding a Decisions log entry.

## Architecture — three sites, one product

Legendary Arena has three public-facing properties on three subdomains,
sharing a unified brand identity:

| Subdomain | Role | Tech |
|---|---|---|
| `www.legendary-arena.com` | Marketing landing (this repo) | Hugo, static |
| `play.legendary-arena.com` | Live game client | Vue (arena-client), static |
| `cards.barefootbetters.com` | Card registry browser (current) | Vue (registry-viewer), static |

All three are deployed independently on Cloudflare Pages with the
following guarantees:

- Each site is **fully functional in isolation** — no runtime coupling.
- Cross-site navigation is **link-based only** — no shared runtime state
  or message passing.
- **Failure of one subdomain must not degrade the others** beyond broken
  links.

A future migration of the registry from `cards.barefootbetters.com` to
`registry.legendary-arena.com` is planned to align it with the LA brand
but is **not blocking v1**. All cross-site references in v1 use
`cards.barefootbetters.com` as the canonical registry URL. The
migration will be its own scoped effort with its own WP when scheduled.

A future `api.legendary-arena.com` (Render-hosted Node server) will serve
the game backend; this site does not interact with it directly.

### Cross-site contract

The three sites share exactly one runtime artifact: brand tokens.

- **Shared asset:** `https://www.legendary-arena.com/brand-tokens.css`
- **Versioned and backward-compatible** within a major version
- **Consumers:** `play.legendary-arena.com` and the registry viewer
  (currently `cards.barefootbetters.com`; future
  `registry.legendary-arena.com`) must not assume internal structure
  beyond the documented CSS custom properties (`--la-color-*`,
  `--la-font-*`, `--la-space-*`)
- **Local fallback:** consumers SHOULD bundle a local copy of the tokens
  as a safety net for transient unavailability of www
- **Breaking changes** trigger a coordinated version bump across all
  consuming sites per Global invariants

## In scope (v1)

- **Home page** — hero, value prop, primary CTA to play.*
- **About page** — what LA is, who's behind it, project status
- **Blog** — devblog, dev journals, release notes; low cadence acceptable
- **Search** (Pagefind) — across blog/marketing content only
- **Unified header + footer** — links to play.*, registry.*, social, legal
- **Brand token contract** — colors/type/spacing source of truth for all three sites
- **Performance budget** — sub-1s LCP on the home page
- **SEO baseline** — meta tags, Open Graph, Twitter Cards, Schema.org
  JSON-LD, sitemap.xml, robots.txt, Search Console submission
  (per WP-008)

## Out of scope (v1)

Explicitly excluded:

- **Card browsing** — that's `registry.*`'s job
- **Deck building** — that's `play.*`'s job
- **User accounts / authentication** — handled by the game, not this site
- **Comments on blog posts** — moderation overhead too high for v1
- **E-commerce, merch, paid content** — not this site's job
- **Forums, community hub** — Discord or similar fills this need; site
  links out
- **In-depth player documentation** — deferred until demand is proven

## Permanent non-goals

These are explicitly out of scope for **all future versions** of this
site, not just v1:

- This site never hosts the game client.
- This site never authenticates users.
- This site never depends on live card or gameplay data (no runtime
  fetches from `registry.*` or `api.*`).
- This site never becomes a social or community platform.

## Success criteria

The site is successful at v1 if:

- **Comprehension:** A first-time visitor can answer "what is this?"
  within ~5 seconds of landing (validated via clear hero + visible CTA
  above the fold).

- **Primary CTA ("Play now"):**
  - Visible above the fold on desktop AND mobile
  - Links directly to `play.legendary-arena.com`
  - Visually dominant versus secondary actions

- **Performance:**
  - LCP ≤ 1s on broadband desktop
  - Lighthouse ≥ 90 in Performance, Accessibility, Best Practices, SEO
  - No console errors in production

- **Cross-site consistency:**
  - Visual tokens match across www, play, registry
  - No visible style drift between properties at any given token version

- **Operational:**
  - A new blog post can be added and published in ≤ 10 minutes using
    the documented workflow

## Constraints

### Technical

- **Static-only** — Hugo + Cloudflare Pages. No SSR, no DB, no runtime
  API calls.
- **No build-time data fetching** — content is markdown; no fetching
  from the registry or the game server during build.
- **Brand token contract** — `static/brand-tokens.css`, hosted from
  this repo:
  - Public, versioned, cacheable asset
  - Backward-compatible within a major version
  - Treated as an external dependency by `play.*` and `registry.*`
  - Breaking changes require version increment AND coordinated consumer
    updates (per Global invariants)
- **Theme** — PaperMod **upstream as a Git submodule**:
  - Customized via Hugo overrides (`assets/`, `layouts/`)
  - **Not forked**
  - Custom theme deferred until proven necessary
- **Build contract:**
  - Hugo build must succeed locally and in Cloudflare Pages with
    identical output
  - No environment-specific behavior or configuration branches

### Operational

- **Solo-maintained** — content cadence and infrastructure must fit a
  single-operator pace.
- **Light governance** — this repo does not adopt the engine project's
  full WP/EC system. Vision plus `03-ROADMAP.md` is sufficient.
- **Brand identity TBD** — no LA brand book exists yet. WP-002
  establishes it before WP-003 (theme restyle) can begin.
- **Failure isolation** — this site must remain fully usable even if
  `play.*` or `registry.*` is offline. Cross-site links may fail, but
  rendering, navigation, and search must not break.

## Relationships to other projects

Each row describes the **direction of dependency** — what flows where,
and what doesn't.

| Project | Relationship |
|---|---|
| **Engine monorepo** (`legendary-arena/legendary-arena`) | Source of truth for the game. This site only **markets** the engine; no code or data flows back. |
| **arena-client** (`play.*`) | **Consumes** brand tokens from this site (cross-origin link + local fallback). **No runtime dependency** on www. |
| **registry-viewer** (currently `cards.barefootbetters.com`; future `registry.legendary-arena.com`) | **Consumes** brand tokens from this site. **Owns all card data concerns**; this site never queries it. |
| **API server** (future `api.*`) | **No interaction** with this site, ever. |

## Change discipline

- Changes to the following require an update to this document AND an
  entry in the Decisions log:
  - Architecture (the three-site topology)
  - Scope (in / out / permanent non-goals)
  - Global invariants
  - Constraints (technical or operational)
  - Cross-site contract

- **Minor wording changes** (typos, clarifications that don't shift
  meaning) do not require log entries.

- Any **ambiguity** between this document and implementation must be
  **resolved before merge**. Ambiguity is a defect, not a feature.

- Conflicts between this document and `03-ROADMAP.md` are resolved by
  this document (vision is authoritative). Conflicts between this
  document and `.claude/CLAUDE.md` (project root) are resolved by
  CLAUDE.md (it's higher in the authority hierarchy).

## Decisions log

| Date | Decision | Why |
|---|---|---|
| 2026-05-10 | WP-007a locked — `play.legendary-arena.com` is live. CF Pages project: **`legendary-arena-play`** (`legendary-arena-play.pages.dev` auto-hostname; `play.legendary-arena.com` custom-domain bound + cert Active 2026-05-10). Lighthouse on the live URL: **97 / 100 / 100 / 100** (Performance / Accessibility / Best Practices / SEO). Pinned **`NODE_VERSION = 22`** as the only CF Pages env var (pnpm version auto-detected from root `package.json` `packageManager: pnpm@10.32.1`); plus **`VITE_SERVER_URL = https://api.legendary-arena.com`** (Production scope) added during execution to satisfy the arena-client source contract at `apps/arena-client/src/lobby/lobbyApi.ts:14-21`. **Pre-WP-007a DNS state for `play.legendary-arena.com`** (rollback baseline): no public records on the `legendary-arena.com` Cloudflare zone; `Resolve-DnsName` returned `DNS name does not exist`. WP-007a added a CNAME `play` → `legendary-arena-play.pages.dev` (Proxied) at Step 10 when CF Pages prompted. **SHA-256 hash-parity contract codified:** the live `https://www.legendary-arena.com/brand-tokens.css` body and the bundled fallback at `apps/arena-client/public/brand-tokens.local.css` (with the SNAPSHOT comment block stripped for comparison) MUST hash byte-identical. Lock-time hash: `70C11CEB75A993F2806056DB8D955D5D3133362D97C03A51EFB6719C575713FF`. Future v1 → v2 brand-tokens bump must refresh the bundled fallback in lockstep with the live URL update; mismatch is the trip-wire that catches stale snapshots before consumers diverge. **v1 cross-site carve-out: HALF-CLOSED** at WP-007a lock; full closure when WP-007b (registry-viewer brand integration) also locks. Until then, brand artifacts remain `v1 LOCKED for WWW; cross-site consumption pending WP-007b` in the marketing-repo `docs/brand/CHANGELOG.md` and palette/typography/spacing.md status lines. **Two execution-time errata closed inline** (engine-side ECs in the engine repo; this WP is the originating contract per engine-repo `.claude/rules/work-packets.md`): (1) **EC-147** — `apps/server/src/server.mjs` boardgame.io `Server({ origins: [...] })` allowlist amended to include `https://play.legendary-arena.com` and `https://legendary-arena-play.pages.dev`. Surfaced during WP-007a Step 9: `https://api.legendary-arena.com/games/legendary-arena` returned 200 with no `Access-Control-Allow-Origin` header to a probe from `https://legendary-arena-play.pages.dev` Origin (boardgame.io `Server`'s cors-package behavior when the request Origin is not in the allowlist). The original WP-007a Step 7 env-var lock missed `VITE_SERVER_URL`; both gaps closed with the env-var add + EC-147 server-side change. Branch-prefixed CF Pages preview-deploy hostnames (`<branch>.legendary-arena-play.pages.dev`) are NOT in the allowlist (cors-package allowlist matching is exact-string; no wildcard support); preview-deploy lobby fetch failure is small blast-radius (short-lived URLs; brand-integration visual check on a preview deploy doesn't depend on lobby API) and is scope-deferred. (2) **EC-148** — `apps/arena-client/index.html` gained a `<meta name="description" content="Legendary Arena — the digital deck-building arena. The arena awaits." />` line (copy aligns with the WP-004 home-page tagline lock); `apps/arena-client/public/robots.txt` (new) ships a verbatim two-line allow-all (`User-agent: *\nDisallow:`). Surfaced during WP-007a Step 11.5 Lighthouse: SEO scored 82 because `index.html` had no meta description and `/robots.txt` was being shadowed by CF Pages's default SPA fallback (returning the SPA shell HTML; Lighthouse parsed it as a robots.txt and found 37 errors). After fix, both audits flipped 0→1 → SEO=100. **Three additional execution-time observations recorded** (not contract gaps; documented for future executors): (a) **CF Pages `_redirects` lint quirk** — `/*  /index.html  200` is rejected by CF Pages's lint as "infinite loop detected" and the rule is ignored at deploy time. CF's default SPA fallback covers the deep-path use case (verified by Step 9 deep-path probe returning 200 + SPA shell HTML), so the WP-007a Step 8-prescribed `_redirects` file is functionally inert in CF Pages. The file remains in the bundle per the Step 8 contract; a future INFRA WP can either remove it or convert to a syntax CF accepts. (b) **Cross-platform line-ending observation** — Windows `core.autocrlf=true` converts source files to CRLF on checkout; CF Pages clones on Linux with LF. Bundle bytes diverge between local-Windows and CF-Linux builds (Vue scoped-CSS hashes encode source content at compile time, including line endings; lazy-chunk filenames cascade from those). Functional + visual render parity preserved (same DOM, same styles, same routing); per-machine determinism (Step 6 contract) holds. Cross-machine bundle byte-determinism would require a `.gitattributes` `* text=auto eol=lf` change + `git add --renormalize` — wider scope than WP-007a, recurring across the engine repo, deferred to a future INFRA WP. The Step 9 build-parity assertion's "render identically" wording (not "byte-identical") is satisfied. (c) **Browser-extension cross-origin blocking** — privacy / tracking extensions on some user browser profiles (uBlock Origin with strict lists, Privacy Badger, NoScript, etc.) can synthetically block cross-origin asset fetches and log `(index):30 GET https://www.legendary-arena.com/brand-tokens.css net::ERR_ABORTED 403 (Forbidden)` in the user's DevTools Console. This is browser/extension-specific, not a CF or server contract failure: server-side probes from synthetic origins all return 200 + ACAO=*. Verified in incognito as the canonical clean-browser state. This IS exactly the failure mode the bundled local fallback is designed to handle — the cascade contract makes the live-URL outage visually invisible (`<link>.disabled = true` test confirms before/after computed `--la-*` values byte-identical). **Server-side follow-up note (NOT in WP-007a scope, surfaced for tracking):** `apps/server`'s `PUBLIC_BASE_URL` env var should be updated to `https://play.legendary-arena.com` so Stripe Checkout success/cancel redirects land on the live arena-client. Hanko allowed origins should include `play.legendary-arena.com`. Stripe webhook redirect allowlist similar. All three are server-side env / dashboard config changes, owned by a separate server-config or billing-flow WP. Tracked in engine-repo `docs/ops/DOMAINS.md` Cutover step 5 as still-pending. | First real cross-origin consumer of the WP-002 v1 brand-tokens contract goes live; the contract moves from "theoretical" to "load-bearing." Two execution-time errata pattern continues the WP-006 → WP-007a precedent of "design correct on paper, reality surfaces gaps that need surgical inline fixes" — same as the WP-006 `_redirects` discovery. Each fix landed with its own EC + governance trail (EC-147 + EC-148 in the engine repo) so future readers can see what surfaced when. The half-closed cross-site carve-out is honest reporting: WP-007a verifies one half of the contract (play consumes www's tokens correctly); WP-007b will verify the other half (registry consumes the same tokens correctly). The three observation items (CF lint quirk, line-ending divergence, extension blocking) are each "known characteristic, not a regression" — recording them now prevents a future executor from rediscovering the same diagnostics from scratch. The browser-extension blocking observation is particularly load-bearing for the cascade contract's reason-to-exist: this is the failure mode the bundled fallback was designed for, and it surfaces in the wild more often than network outages. Verifying the cascade contract under that exact stress (via `<link>.disabled = true` in DevTools) is the correct way to certify the fallback works in production conditions. |
| 2026-05-07 | Separate repo from engine monorepo | Hugo content has different governance needs than engine code |
| 2026-05-07 | Subdomains over path-based hosting | Independent deploys, independent caching, cleaner failure isolation |
| 2026-05-07 | PaperMod upstream submodule + Hugo overrides (over fork or custom-thin theme) | Faster v1; overrides keep the theme upgradeable indefinitely; revised from earlier "fork" plan during WP-001 execution |
| 2026-05-07 | Pagefind on Hugo content only | registry.* has its own structured search; no duplication |
| 2026-05-07 | Wordmark placeholder for logo | Real logo design deferred to a later effort, possibly with a contractor |
| 2026-05-07 | New `legendary-arena` GitHub org | Brand consistency; org transferable later if circumstances change |
| 2026-05-07 | Brand tokens hosted from this repo's `static/` as a versioned API contract | Single SoT consumed cross-origin by play.* and registry.*; treating as a contract prevents silent cross-site breakage |
| 2026-05-07 | Strengthened vision: Global invariants, failure isolation, cross-site contract, change discipline, measurable success criteria | Convert implicit philosophy into enforceable rules; tighten cross-site guarantees; eliminate ambiguity (esp. theme + tokens) |
| 2026-05-07 | Added SEO baseline to v1 scope (WP-008) | RankMath-equivalent SEO is a baseline expectation for a public marketing site; making it explicit prevents it from being skipped or reinvented mid-project |
| 2026-05-07 | Registry remains at `cards.barefootbetters.com` for v1; migration to `registry.legendary-arena.com` deferred to a future scoped effort | Reality recognized: the registry already exists at cards.* and migration would be a substantial coordinated change. Pinning v1 on a non-blocking domain change adds risk without proportionate benefit. |
| 2026-05-07 | Karpathy LLM-wiki pattern evaluated for www; rejected. Engineering wiki spawned in engine project. Player wiki (if needed) → registry.* (per ER-016). | Marketing site scope must remain conversion-focused; wiki content would violate permanent non-goals on card/gameplay data. Reference material belongs with reference material (registry); engineering knowledge belongs with engineering code (engine project). |
| 2026-05-07 | WP-002 + WP-003 locked — brand v1 verified at www.legendary-arena.com (Lighthouse 91/100/100/100, both modes, mobile 375×667, all `palette.md §8` contrast pairs WCAG AA). Brand artifacts move from "v1 DRAFT" to "v1 LOCKED for WWW." | All Phase B exit criteria from `strategy.md §11` met except cross-site consumption (deferred to WP-007a/b). Verification surfaced and resolved a silent dark-mode selector bug, a touch-target gap, a footer contrast violation, missing favicons, and the need for an additive `--la-color-cta` token to satisfy white-on-CTA AA in dark mode — all documented in `docs/brand/CHANGELOG.md`. |
| 2026-05-07 | `docs/ai/work-packets/` adopted for session-ready WP execution prompts (not WP design specs) | Roadmap remains the design source of truth; these files are the "do this" pack a fresh Claude session reads to execute a WP. Same directory name as the engine project but lighter purpose — does NOT adopt the engine's full WP/EC governance system. First instance: `WP-004-content-scaffolding.md`. |
| 2026-05-08 | Added §9.1 "Early Lock Revision Window" exception clause to `palette.md` governance — codifies a 24–72h post-lock redefinition allowance with explicit entry conditions, duration, exit trigger, and post-close enforcement. Window for v1 lock is OPEN through **2026-05-10 23:59 local**, OR until any downstream consumer integrates the locked tokens, whichever comes first. After close, future redefinitions require formal v1 → v2 bump per §9 strict. | Allows brand iteration immediately post-lock without paying the v2 coordination cost, while preserving rule authority and audit trail. The contract amendment converts what would otherwise be a silent contract violation into a documented, time-bounded exception. The clause persists in the doc as precedent for future v(n) lock periods but does NOT auto-renew — each new major version's window must be opened explicitly in `palette.md §12`. |
| 2026-05-08 | Brand tonal shift performed under §9.1 window. Brand red moved cherry → **deep maroon** (`#7a1d1f` light / `#a83034` dark). Brand blue moved royal → **deep navy** (`#1e3a8a` light / `#3753b8` dark) — Captain America / X-Men Beast tonal territory. CTA tokens follow new maroon (~10.4:1 contrast on white text — AAA, well above the previous 5.44:1). All bright/muted variants of red and blue scaled accordingly. Gold unchanged. Class colors and semantic colors (success/warning/error) unchanged. Companion governance refinements: `palette.md §5.3` distinguishing rule (error red MUST stay in pure-red family; CTA may shift toward maroon), `§4.3` role discipline (`--la-color-blue-bright` MUST carry interactive affordance), `§7` gradient tonal note (`--la-gradient-hero` now spans navy → maroon), `§10` failure-mode bullet for blue affordance misuse. | Visual identity shifts from "energetic SaaS" to "muted cinematic" — better aligned with the mythic / Marvel-adjacent brand position. Per §9.1, treated as v1 revision rather than v2 bump (no consumer integration yet at lock time). Verified end-to-end via Hugo serving the new tokens and `getComputedStyle` resolving them in both modes. |
| 2026-05-08 | Class-color subsystem added at `palette.md §4.4` — 10 mode-stable tokens for the 5 hero classes (`strength`, `covert`, `instinct`, `ranged`, `tech`) with bright + muted pairs each. Sourced from production class icons in `barefootbetters-legendary-setup/public/img/icons/hero-classes/`. Two muted variants (`instinct-muted` `#92400e`, `ranged-muted` `#155e75`) are *derived* (Tailwind amber-800 / cyan-800) since their source icons lack shadow companions. Class colors live one layer below brand identity (§4.1–§4.3) and parallel to gameplay mapping (§6); they identify *gameplay role*, not *product identity*. Usage patterns documented (border-accent, chip-fill, icon-accent, selection-state). Failure mode added to `§10`. | Decision-by-elimination: a desired green for mythic / forest / cleric narrative could have been added as a 4th brand color, but doing so would have collapsed the brand-color hierarchy (gold-led with red+blue accents) and collided semantically with `--la-color-success`. Treating class colors as a parallel subsystem keeps brand restrained at three colors while enabling gameplay expressiveness across ten tokens. Brand = stable + small palette; gameplay = expressive + larger palette. That asymmetry is intentional. |
| 2026-05-08 | Logo work moved from "deferred placeholder" to "design contract + designer handoff." Artifacts: `docs/brand/logo-brief.md` (acceptance criteria, locked constraints, accessibility), `docs/brand/logo-ai-workflow.md` (evaluation rubric + exploration record + designer-handoff thesis), `docs/brand/logo-explorations/` (8 directions × 6 sizes archived — 4 monogram directions + 4 abstract-symbol directions, each rendered at 16/32/64/128/256/512px), `docs/brand/logo-figma/` (4 SVG variants from a Figma export — icon-only, light-mode lockup, dark-mode lockup, alternating-color hexagon test). Conclusion of AI iteration: monogram round was "letters in proximity, not real monograms"; abstract round split into "form discipline (B Summit) vs product fit (D Hand) without fusion." Designer handoff thesis is **"D done with B's discipline"** — start from D, apply B's silhouette filter; cards form the silhouette, peak emerges from convergence rather than being imposed on top. Wordmark placeholder remains active on `www.legendary-arena.com` until a logo passes `logo-brief.md §9` acceptance. | The logo TBD entry was abstract — now it has a concrete spec, named failure modes (stratified read, pivot blob, wedge collapse, letter mashup), a named candidate direction, and an explicit handoff. Anyone (designer, contractor, future-self) can pick this up cold from the brief + workflow notes + exploration archive. AI iteration ceiling reached on this problem; further progress requires Figma optical-balance work that LLM SVG generation can't reliably produce. |
| 2026-05-08 | WP-004 locked (content scaffolding + first 3 pages). Home page (hero "The arena awaits." + three "why" cards + "Play now" CTA), about page, blog post "Opening the arena", `archetypes/posts.md`, and `docs/04-CONTENT-CONVENTIONS.md` shipped. Home-page-layout choice: **Approach A — override `layouts/index.html`**. The override hosts the `.hero` block + `.button` CTA above the fold (PaperMod's `homeInfoParams` partial cannot host a styled CTA, ruling out approach C; a Hugo shortcode invoked from `content/_index.md` — approach B — adds an indirection layer without ergonomic gain). Hugo's lookup resolves `layouts/index.html` ahead of the theme's `list.html` for the home kind; PaperMod's `baseof.html` still applies `body class="list"` to `.Kind == "home"` so `custom.css §1`'s `body.list` background anchor continues to apply. Copy (`title`, hero prose, `ctaLabel`, `ctaHref`, `sections[]`) lives in `content/_index.md` front-matter so authors can edit text without touching layout. Lighthouse on production build: home 97/95/96/100, post 98/96/96/100. Binary CTA test PASS in all four viewport+mode combinations (light/dark × 1280×800/375×667). The `[params.homeInfoParams]` block in `hugo.toml` (the WP-001 placeholder mechanism) was removed during the WP-004 tidy-up pass; a comment in `hugo.toml` points future readers to `docs/04-CONTENT-CONVENTIONS.md`. | The home-page-markup choice is a structural decision future contributors need to discover quickly when editing the home page. Recording it here (and in `docs/04-CONTENT-CONVENTIONS.md "Home page markup"`) prevents the next person from re-deriving the constraint or — worse — replacing the override with a `homeInfoParams` change that silently strips the CTA. The override pattern keeps the PaperMod theme submodule clean (no fork, `git submodule status` unchanged), satisfies `01-VISION.md §Success criteria → Primary CTA` directly, and follows the same principle as WP-003's `assets/css/extended/custom.css` overrides: customise via Hugo's lookup order, not by modifying upstream. |
| 2026-05-09 | WP-005 locked (Pagefind search integration). Build pipeline established: npm route, `pagefind` 1.5.2 exact-pinned in `package.json` + committed `package-lock.json`, single build command `npm ci && npm run build` resolving to `hugo --minify && npx pagefind --site public`. Pagefind UI: default UI lazy-loaded on first interaction (focus stub, click `#la-search`, or press `/` / `Ctrl+K` / `Cmd+K`) with a server-rendered stub `<input id="la-search-stub">` for immediate affordance — eager `defer` loading consumed enough TBT to push Performance to 88-89 on home, below the ≥ 90 floor. PaperMod's built-in Fuse.js search disabled via `[outputs] home = ["HTML", "RSS", "JSON"]` removal from `hugo.toml` (no `content/search.md` existed; PaperMod template untouched in submodule). Index scope structural via `data-pagefind-body` on `<main>` in `layouts/baseof.html` override; header/footer/nav naturally excluded. Keyboard policy: `/` and `Ctrl+K` / `Cmd+K` focus the search input; bail when typing in any input EXCEPT the stub itself; preventDefault on focus path. Lighthouse on production build (served at `localhost:1314` with `--baseURL http://127.0.0.1:1314` for localhost DNS parity): home 92/100/100/100, post 93/100/100/100. Reproducibility verified mechanically (two consecutive builds, `Compare-Object` over SHA-256 hashes returned empty). Submodule clean. The single-command contract is the WP-006 deliverable (Cloudflare Pages will run the same `npm ci && npm run build` verbatim). | Search is the last load-bearing piece before the marketing site can deploy. The exact-pin + reproducibility-check discipline collapses the largest determinism risk WP-006 inherits from a CI build — silent dependency drift between local and CI was the failure mode WP-005 most needed to prevent. The lazy-load pattern is a new structural decision: future search-related work must preserve the "stub renders eagerly, real UI loads on intent" contract or the Performance budget will silently regress. Pagefind version bumps are governed work, not casual updates — a separate WP must re-run the mechanical reproducibility check and re-verify Lighthouse ≥ 90 before locking, per WP-005 Constraints. |
| 2026-05-09 | WP-006 locked (Cloudflare Pages deploy + custom domain). Site live at `https://www.legendary-arena.com` (canonical) + `https://legendary-arena.com` 301-redirecting to www (path-preserved). **Apex-redirect mechanism amendment:** the WP-006 Step 6 locked decision specified `static/_redirects` (option A) as REQUIRED and PROHIBITED CF dashboard rules (option B). During execution this turned out to be technically incorrect — CF Pages' `_redirects` engine does NOT support full-URL source patterns (only path-only). The committed `static/_redirects` file (commit `f397807`) was silently ignored; apex served duplicate content. Mechanism amended to a zone-level **Cloudflare Redirect Rule** on the `legendary-arena.com` zone (Rules → Redirect Rules), created from CF's "Redirect from root to WWW" template — wildcard source `https://legendary-arena.com/*`, dynamic target `https://www.legendary-arena.com/${1}`, 301 permanent, preserve query string. The no-op `static/_redirects` was reverted in PR #1 (squash-merged as `3871d7d`). The in-repo reproducibility argument that originally motivated rejecting option B is preserved in spirit: zone Redirect Rules are exportable via Wrangler CLI or Terraform; a future WP can land a config-as-code artifact for the rule if reproducibility becomes load-bearing for cross-site contracts. **CORS posture for `/brand-tokens.css`:** `Access-Control-Allow-Origin: *` + `Cache-Control: public, max-age=3600, must-revalidate` shipped via in-repo `static/_headers` (commit `3c955a8`). Locked posture encodes the brand-tokens v1 contract commitment — single URL, version-in-body. Consumers fetch `/brand-tokens.css` and read the `Version: v1` header comment to verify the contract; v1 → v2 is a coordinated consumer swap on the SAME URL, not filename-versioned URLs (`brand-tokens.v1.css`). `immutable` was rejected because it would silently misalign with that contract on a future v2 bump. 1-hour TTL trades a small egress cost for sub-coffee-break propagation under the unversioned single-URL v1 model. A future WP that proposes filename-versioned brand-tokens is renegotiating WP-002's contract and must update this posture (or move to `immutable`) at the same time. **Two CF zone-level settings recorded as load-bearing for the contracts above to actually fire:** (1) Caching → Configuration → **Browser Cache TTL: "Respect Existing Headers"** — required so origin Cache-Control survives to clients (CF's default 4-hour zone TTL was overriding `static/_headers` and serving `max-age=14400` instead of `3600`); (2) **AI Crawl Control / Managed robots.txt: OFF** — kept Hugo's clean `User-agent: *` `robots.txt` rather than CF-injected version with `Content-Signal:` directive that Lighthouse v12 doesn't recognize (cosmetic SEO regression 100→92 was caused by this; `Content-Signal:` is a valid newer AI-bot signal but not yet in Lighthouse's recognized-directive list). **Pinned env vars in CF Pages:** `HUGO_VERSION=0.161.1` (matches `README.md` Prerequisites and theme `module.toml` floor of 0.146.0) and `NODE_VERSION=22` (Node major from README; CF resolves to `22.22.0`). **Pre-WP-006 DNS state on the `legendary-arena.com` Cloudflare zone (rollback baseline):** zone was already on Cloudflare DNS with authoritative NS `lakas.ns.cloudflare.com` / `teagan.ns.cloudflare.com`; no public records on the apex; `www`, `api`, and `ewiki` CNAMEs already existed alongside Namecheap email-forwarding `MX` records (eforward1-5.registrar-servers.com priorities 10/10/10/15/20) and the matching SPF `TXT` (`v=spf1 include:spf.efwd.registrar-servers.com ~all`). WP-006 added the apex CNAME (`legendary-arena.com` → `legendary-arena-website.pages.dev`, Proxied) when CF Pages prompted for it during custom-domain bind. **CF Pages project name:** `legendary-arena-website` → `legendary-arena-website.pages.dev`. **Lighthouse against live URL (post-zone-fixes):** home P=97 / A=100 / BP=100 / SEO=100; post P=99 / A=100 / BP=100 / SEO=100. All four categories ≥ 90 with margin. Console errors: 0 items on both pages. Internal link sweep: 16 unique hrefs, all 200. Reproducibility: two consecutive `npm ci && npm run build` runs produce byte-identical `public/` per `Compare-Object` over SHA-256 hashes (empty diff). Submodule clean: `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926 themes/PaperMod (heads/master)` with no `+` flag. **Commits:** `3c955a8` (Step 4 `_headers`), `f397807` (Step 6 first attempt — superseded), `3871d7d` (PR #1 squash: amendment + Step 7 verification), and the WP-006 lock commit itself. **Invocation scratchpads** under `docs/ai/invocations/` (`context-wp006-pre-execution-notes.md`, `preflight-wp006.md`, `session-wp006-cloudflare-deploy.md`) remain untracked per project convention — they helped this session but don't need to live in history. The WP-006 design pack at `docs/ai/work-packets/WP-006-cloudflare-deploy.md` IS committed (matching WP-005's pre-flight-artifacts pattern), with a post-execution amendment section pointing to this Decisions log entry. | First production deploy of the marketing site. Three downstream WPs (WP-007a, WP-007b, WP-008) unblock immediately; the brand-tokens cross-site contract is now load-bearing rather than theoretical. The discovery that CF Pages `_redirects` doesn't support full-URL source patterns is the kind of design-vs-reality drift that an inline review pass can't catch — only execution surfaces it. The amendment preserves the in-repo reproducibility intent in spirit (Wrangler/Terraform export available) without forcing an emergency-override paper trail under the WP's "Temporary CF dashboard override" mechanism (which was designed for time-bounded emergencies, not for "the WP's premise was wrong"). The two zone-level settings (Browser Cache TTL, AI Crawl Control) are recorded explicitly because they are CF dashboard state that lives outside the repo and would silently regress contracts if a future operator reset zone defaults — the Decisions log is the only place this state is auditable from the repo. |
| 2026-05-09 | WP-007a paused at Step 1 pre-flight on first execution attempt — not locked. The locked CF Pages build command `pnpm install --frozen-lockfile && pnpm --filter @legendary-arena/arena-client build` (per WP-007a Step 7) fails to resolve `@legendary-arena/game-engine` on a fresh checkout, with Vite reporting `[commonjs--resolver] Failed to resolve entry for package "@legendary-arena/game-engine"`. **Root cause:** the engine package's `package.json` declares `"main": "./dist/index.js"`, but `packages/game-engine/dist/` is a build artifact directory and is gitignored — present in long-lived dev checkouts only because someone has run `pnpm -r build` at some point. The pnpm single-package filter (`--filter @legendary-arena/arena-client`) does NOT transitively build workspace dependencies, so on a fresh CF Pages clone (or any clean clone, including this session's worktree) the dist directory does not exist and the runtime import in `apps/arena-client/src/client/bgioClient.ts` (`import { LegendaryGame } from '@legendary-arena/game-engine'`) fails to resolve. `pnpm -r build` recursively builds all workspace packages and then arena-client builds successfully — that is how the existing main checkout has been operating, but it is not the locked WP-007a build path. **Secondary concern surfaced during the recursive-build verification (warnings, not errors):** `packages/game-engine/dist/scoring/scoringConfigLoader.js` imports `node:fs/promises`, `node:path`, `readdir`, `readFile`, and `join`, which Vite externalizes for browser compatibility with five warnings. The loader's author anticipated this and added a deliberate namespace-import workaround (`import * as fsPromises from 'node:fs/promises'`) so Rollup tree-shakes the unused functions out of the browser bundle — the warnings are expected and the bundle is correct, but the runtime / setup-tooling boundary is enforced implicitly by tree-shaking rather than explicitly by the package's `exports` field. **Decision:** WP-007a regresses to ⏸️ Pending pending **WP-144** (`docs/ai/work-packets/WP-144-arena-client-production-bundle-isolation.md` in the engine repo, drafted 2026-05-09, not yet executed) which (a) splits `packages/game-engine`'s `package.json` `exports` into a runtime entry (browser-bundle-safe) and a `./setup` subpath (Node-IO setup-tooling), (b) relocates `loadScoringConfigForScenario` / `loadAllScoringConfigs` behind the new subpath, (c) updates `apps/server/` import sites accordingly, (d) drops the namespace-import workaround in `scoringConfigLoader.ts` since the loader no longer reaches the browser-bundle import graph, (e) records a new architectural decision **D-14401** codifying the runtime / setup-tooling Layer Boundary contract, and (f) amends WP-007a's locked CF Pages build command to `pnpm install --frozen-lockfile && pnpm --filter "@legendary-arena/arena-client..." build` (trailing `...` is pnpm's topological selector — builds the package and its workspace dependencies in dependency order). After WP-144 lands, WP-007a re-executes with the amended build command and the rest of WP-007a's scope (Cloudflare Pages project creation, brand-tokens wiring, header/footer integration, custom domain binding, network-block test, Lighthouse) proceeds unchanged. **State at pause:** marketing repo clean (untracked `docs/ai/work-packets/WP-007a-play-deploy.md` is the WP body itself, deferred for commit until lock); engine repo clean across both main and the WP-007a session worktree (`claude/elated-booth-4e1c0f`, no source edits, parked for re-attempt). No CF Pages project created, no DNS changed, no commits landed. **Cross-site contract status:** WP-002 v1 LOCKED for WWW carve-out remains fully OPEN — the v1 cross-site contract was scheduled to half-close at WP-007a lock + fully close at WP-007b lock; with WP-007a paused, both halves remain open and `play.legendary-arena.com` is still `state: "planned"` in the engine repo's `docs/ops/domains.json`. **Pre-flight artifacts that DID validate cleanly** (preserved for the re-attempt): WP-006 CORS contract verified live from a synthetic `https://play.legendary-arena.com` origin (`Access-Control-Allow-Origin: *`, `Cache-Control: public, must-revalidate, max-age=3600`, `Version: v1` in body); foreign-origin `curl -I` and Origin-header probes both passed; PaperMod submodule still clean at `c4ca7ca486ecd67c8f6bba31551a6ee0d1455926`; WP-006 lock commit `b3d8c5d` confirmed on www `origin/main`. | This is the second design-vs-execution-reality discovery on the marketing-side deploy track in two days (after WP-006's CF-Pages-`_redirects`-doesn't-support-full-URL-sources finding). The pattern is the same: a WP that reads correctly on paper hits a constraint that only execution surfaces. The cost of pausing here is one extra WP and a few days; the cost of working around the locked build command (e.g., adding a non-locked CF prebuild step in the dashboard, or pre-building dist locally and pushing a "lock-pass" deploy that doesn't reproduce on CF) would be exactly the silent-dashboard-drift / same-commit-different-output failure mode that WP-007a Step 7's "Configuration immutability rule" exists to prevent. WP-144's wider-scope shape (runtime / setup-tooling subpath split, not just a topology-filter amendment) was chosen because the implicit tree-shaking boundary in the engine package was already a latent fragility — a future barrel re-export accidentally landing a Node-IO import inside the runtime path would silently inflate the SPA bundle and add more `__vite-browser-external` warnings, and there is no gate that would catch it. Codifying the boundary via `package.json` `exports` makes it testable. The v1 cross-site carve-out staying open through the pause is correct — half-closing it on a lock that didn't actually happen would lie about the contract's state. |
| 2026-05-09 | WP-144 receipt landed — post-execution amendment to WP-007a's locked CF Pages build command. The 2026-05-09 WP-007a pause entry (above) anticipated WP-144's topology-filter amendment as a marketing-side coordination receipt; that receipt is now applied here. Both `docs/ai/work-packets/WP-007a-play-deploy.md` and `docs/ai/invocations/session-wp007a-play-deploy.md` have every `pnpm --filter @legendary-arena/arena-client build` quote site replaced with `pnpm --filter "@legendary-arena/arena-client..." build` (15 + 11 = 26 occurrences total). A new "Post-execution amendment (2026-05-09; WP-144 backfill)" section near the top of WP-007a's body records the change and points back to engine-repo commits `bb0493c` (EC-144 implementation) + `8a0621a` (close) and to D-14401 in the engine repo's `docs/ai/DECISIONS.md`. Dev-server invocations (`pnpm --filter @legendary-arena/arena-client dev`) are intentionally NOT amended — `dev`'s fresh-tree fragility is a separate concern out of WP-007a / WP-144 scope. After this receipt lands, WP-007a's Step 1 pre-flight gates can be re-run with the amended build command and the rest of WP-007a's scope (CF Pages project creation, brand-tokens wiring, header / footer integration, custom domain binding, network-block test, Lighthouse) proceeds unchanged. WP-007a remains ⏸️ Pending in `03-ROADMAP.md` until execution actually completes; this receipt only unblocks the build command — it does not complete the deploy. | The receipt closes the loop on the 2026-05-09 pause entry by applying the amendment that entry described. WP-006's `_redirects` precedent already established that post-execution amendments to locked WP bodies are valid governance under this repo's "light governance" regime when the amendment records reality discovered during execution rather than redefines design intent. Same pattern here: the locked build command was correct in shape (single command, no extra steps, verbatim from local) but wrong in topology selector — fixed verbatim, not redesigned. The dev-server carve-out is recorded explicitly so a future executor doesn't read the amendment as an "always use topology filter for everything arena-client" rule and inadvertently change `pnpm dev` behavior. |
| 2026-05-08 | Added WP-009 (class-color usage audit, cross-site) to roadmap as **DRAFT** — full spec in `docs/ai/work-packets/WP-009-class-color-usage-audit.md` pending review. Audit verifies the ten `--la-color-class-*` tokens (`palette.md §4.4`) are used correctly across all three consumer sites (`www`, `play`, `cards`) — Check 1: token definition integrity vs `palette.md §4.4`; Check 2: no raw class hexes outside `brand-tokens.css`; Check 3: every `--la-color-class-*` reference matches one of the four §4.4 application patterns (border-accent / chip-fill / icon-accent / selection-state) or is class-scoped; Check 4: no class tokens in brand identity, CTA backgrounds, semantic-state indicators, or link / focus-ring affordances. Depends on WP-007a + WP-007b. Roadmap Summary table updated; full section body deferred until draft is reviewed and integrated. Engine-side EC deferred until WP-007a/b actually land (drafting now risks staling against the not-yet-built UI surface). | The class-color subsystem (`palette.md §4.4`, locked 2026-05-08) ships ten new tokens with explicit role discipline and four named application patterns. Without a usage audit, downstream consumer integrations during WP-007a/b can silently introduce `palette.md §10` violations (class colors used as brand identity, CTA backgrounds, or semantic state indicators) that are expensive to find later. Drafting WP-009 now — before WP-007a/b execute — keeps enforcement intent visible to whoever runs those WPs and gives them a forward target. Read-only on consumer repos: WP-009 produces evidence and files tickets; remediation is a separate per-repo effort. First usage-discipline audit on the brand-tokens contract; if it lands clean, the same template applies to gradient / focus-ring / type-scale / spacing audits. |

## What's locked vs. TBD

**Locked:**
- Site purpose, audience, architecture
- Hosting (Cloudflare Pages, three projects)
- Theme approach (PaperMod upstream submodule + overrides)
- Repo location (`legendary-arena/legendary-arena-website`)
- Search (Pagefind, content only)
- Brand-token contract (externalized, versioned, cross-origin consumable)
- LA brand identity v1 — palette, typography, spacing (WP-002 + WP-003 lock 2026-05-07; tonal iteration 2026-05-08 under `palette.md §9.1`)
- Color-system architecture — three layers: **brand identity** (3 colors: gold + maroon + navy), **class-color subsystem** (10 tokens for 5 hero classes — strength, covert, instinct, ranged, tech), **semantic colors** (success / warning / error). Brand stays restrained; gameplay is expressive. Asymmetry intentional.
- Failure-isolation principle
- Global invariants
- SEO baseline (per WP-008)

**TBD (with owning effort):**
- Logo design — design contract written (`docs/brand/logo-brief.md`); two AI exploration rounds archived (`docs/brand/logo-explorations/`). Next step: Figma session or contractor pass starting from the "D done with B's discipline" merge thesis (`docs/brand/logo-ai-workflow.md §7`). Wordmark placeholder remains active on `www.legendary-arena.com` until a candidate passes `logo-brief.md §9` acceptance.
- Site copy and content beyond home/about/first blog post (WP-004)
- Migration of registry from `cards.barefootbetters.com` to `registry.legendary-arena.com` (deferred future effort; not blocking v1)
- Class-color UI integration on `play.*` and `registry.*` (post-WP-007 — usage patterns from `palette.md §4.4` provide the visual grammar; no engine changes for branding alone)
- Launch date

---

## Notes for future authors

- Update this document when a decision changes — don't let it drift.
- New decisions get a row in the Decisions log with date and rationale.
- If a Work Packet is being written that contradicts something here, the
  contradiction is a flag: either the WP needs to change, or this
  document needs to change. Resolve before executing the WP.
- Treat Global invariants as bright lines, not aspirations. If a feature
  cannot be built without violating one, the feature does not ship in
  its proposed form.
