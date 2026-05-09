# Pre-flight + Copilot Check — WP-005 (Pagefind search integration)

**Target Work Packet:** `WP-005`
**Title:** Pagefind search integration
**Previous WP Status:** WP-004 ✅ Done (2026-05-08)
**Pre-Flight Date:** 2026-05-08
**Invocation Stage:** Pre-Execution (Scope & Readiness)
**Work Packet Class:** Infrastructure & Verification (build tooling +
verification; introduces Node toolchain; no behavioral state mutation)

---

## Cross-repo applicability note

The two governance docs cited
(`C:\pcloud\BB\DEV\legendary-arena\docs\ai\REFERENCE\01.4-pre-flight-invocation.md`
and `…\01.7-copilot-check.md`) are calibrated for the **engine repo**
(pnpm monorepo, boardgame.io `^0.50.0`, TypeScript ESM, PostgreSQL,
Cloudflare R2). WP-005 lives in the **Hugo marketing-site repo**
(`C:\www\legendary-arena-com\`).

The engine-specific anchors that 01.4 and 01.7 cite — `G` / `ctx`,
`CardExtId`, `MATCH_PHASES` / `TURN_STAGES`, Immer, `zoneOps.ts`,
`makeMockCtx`, layer boundaries between Registry / Engine / Server,
`02-CODE-CATEGORIES.md`, `00.2-data-requirements.md`, `// why:` on
`ctx.events.setPhase` — have **no surface** in WP-005's scope.

Where an engine-only item has no analog in the Hugo site, the finding
is marked **N/A** with a one-line reason. Where the underlying
governance principle (determinism, scope lock, authority chain,
fail-loud, single-responsibility, naming discipline) does map, the
lens is applied faithfully.

---

## Pre-flight (per 01.4)

### Authority Chain (Must Read) — Hugo-repo edition

In this repo, the chain is shorter than the engine repo's. Read in
order:

1. `docs/01-VISION.md` (highest) — Global invariants (deterministic
   deploy; performance + accessibility floor; brand tokens as API
   contract; no third-party-dep modification)
2. `docs/03-ROADMAP.md` § WP-005 — design source of truth
3. `docs/04-CONTENT-CONVENTIONS.md` — front-matter and content rules
4. `docs/brand/strategy.md` § 2, § 5, § 10 — voice, layout, failure
   modes (canonical for any user-facing copy in the search UI)
5. `docs/ai/work-packets/WP-005-pagefind-search.md` — the WP itself

The engine repo's authority chain (`.claude/CLAUDE.md`,
`docs/ai/ARCHITECTURE.md`, `.claude/rules/*.md`) is **not** in force
here.

### Vision Sanity Check

- **Vision clauses touched by this WP:**
  - Global invariant: *Deploys must be deterministic. Same commit →
    same output. The site must be reproducible locally via a single
    documented command that matches what CI runs.*
  - Global invariant: *Performance + accessibility floor* (Lighthouse
    ≥ 90 in P/A/BP/SEO; no console errors)
  - Global invariant: *Brand tokens are the single source of truth*
    (search UI styling must consume `var(--la-*)`)
  - Global invariant: *No direct modification of third-party
    dependencies* (no PaperMod source edits)
- **Conflict assertion:** No conflict — WP-005 preserves all touched
  clauses.
- **Non-Goal proximity:** N/A — WP touches no monetization, identity,
  or competitive surface.
- **Determinism preservation:** Yes. WP-005's mechanical
  reproducibility check (`Compare-Object` over SHA-256 hashes of two
  consecutive builds) and exact-version Pagefind pin operationalize
  the deterministic-deploy invariant.
- **Vision Alignment in WP body:** Implicit (the Constraints and
  Failure-conditions sections name the deterministic-build and
  Lighthouse floors). Hugo repo does not require a formal
  `## Vision Alignment` block — adequate.

### Dependency & Sequencing Check

| WP | Status | Notes |
|---|---|---|
| WP-001 (Hugo skeleton) | ✅ Done (2026-05-07) | |
| WP-002 (brand tokens v1) | ✅ Done (2026-05-07) | v1 LOCKED for WWW |
| WP-003 (brand applied) | ✅ Done (2026-05-07) | submodule clean |
| WP-004 (content scaffolding) | ✅ Done (2026-05-08) | real content present |

All prerequisites complete and recorded. **PASS.**

### Dependency Contract Verification (adapted)

Engine-style contract verification (TypeScript field names, helper
signatures, `G` field paths, Zod schemas) is N/A — Hugo + Pagefind
are not TypeScript contracts.

The contracts WP-005 *does* consume:

- [x] **Pagefind CLI surface** — `npx pagefind --site public` is the
  invocation. Exact-version pin satisfies contract stability across
  environments.
- [x] **Hugo build output shape** — `public/` must contain rendered
  HTML before Pagefind runs; `&&` ordering enforces this.
- [x] **PaperMod override path** — `assets/css/extended/`,
  `layouts/_partials/`, `layouts/_default/` are the documented
  override locations. WP-005 forbids `themes/PaperMod/` edits;
  WP-003 lock state (`git submodule status` clean) is the baseline.
- [x] **`brand-tokens.css` API** — search UI consumes `var(--la-*)`
  custom properties. Tokens are v1 LOCKED FOR WWW. WP-005 does not
  modify token values.
- [x] **Cross-origin `brand-tokens.css` contract (downstream
  consumers)** — WP-005 does not touch `play.*` or `cards.*`
  surfaces; the cross-origin contract is unaffected.
- [x] **Existing PaperMod search disposition** — WP-005 explicitly
  resolves the duplicate-affordance question (replace, do not
  co-exist).

**PASS.**

### Code Category Boundary Check (adapted)

Hugo repo has no `02-CODE-CATEGORIES.md`. The analog is "where do
files belong in a Hugo project?" — WP-005's expected file footprint:

| Path | Disposition |
|---|---|
| `package.json` (new, root) | Build tooling — root-level Node manifest, conventional |
| `package-lock.json` (new, root) | Lockfile — required for reproducibility |
| `node_modules/` (new, gitignored) | Already in `.gitignore` — confirmed |
| `assets/css/extended/custom.css` (modify) | Documented PaperMod override path — correct location |
| `layouts/_partials/extend_head.html` (modify) | Already in use for token loading — correct location |
| `layouts/_partials/<search>.html` (new) | Sibling to existing partials — correct location |
| `layouts/_default/search.html` (possibly new stub) | Disables PaperMod's `/search/` page — correct location for theme override |
| `hugo.toml` (possibly modify) | Removes `outputs = ["HTML", "RSS", "JSON"]` if PaperMod search is disabled by config rather than override |
| `README.md` (modify) | Required by DoD |
| `docs/04-CONTENT-CONVENTIONS.md` (modify) | Required by Step 7 |
| `docs/01-VISION.md` (Decisions log) | Required by Step 9 if structural choices made |
| `docs/03-ROADMAP.md` (modify) | Status flip on lock |

No `themes/PaperMod/` modifications. No file lands in an unexpected
directory. **PASS.**

### Scope Lock

WP-005's "What's NOT in scope" section explicitly enumerates:
WP-006/007a/007b/008/009, card-data search, search analytics,
multilingual indexing, branded logo, brand-token additions. The
"Failure conditions (explicit)" section lists 9 bright lines.

Anything not explicitly allowed is out of scope. **PASS.**

### Test Expectations (Locked Before Execution)

Hugo repo does not run `node:test`. The verification surface for
WP-005 is:

- **Functional verification (manual, against production build at
  `localhost:1314`):**
  - Search input visible in header in both modes × both viewports
  - `/` and `Ctrl+K` / `Cmd+K` focus the input
  - Typing returns results within ~100 ms
  - Card-name search returns zero results
- **Reproducibility verification (mechanical):** two consecutive
  `npm run build` runs produce byte-identical `public/` per
  `Compare-Object` over SHA-256 hashes
- **Performance verification:** Lighthouse ≥ 90 in P/A/BP/SEO on
  home + post (production build, `localhost:1314`)
- **Console verification:** zero errors / page-errors / failed
  network requests on home + post + during search
- **Submodule verification:** `git submodule status` clean
  (PaperMod commit `c4ca7ca…` with no `+` flag)

All locked in the WP body. No new test infrastructure introduced.
**PASS.**

### Mutation Boundary Confirmation

N/A — Hugo site has no `G` / `ctx` / Immer mutation surface.

### Risk & Ambiguity Review (Resolve Now, Lock for Execution)

| # | Risk / ambiguity | Impact | Mitigation in WP | Status |
|---|---|---|---|---|
| 1 | A specific Pagefind version may emit non-deterministic output (timestamps, unstable shard ordering) | HIGH | Exact-version pin + Pagefind-determinism constraint + mechanical reproducibility check; downgrade-and-pin if a version is non-deterministic | Locked |
| 2 | Pagefind default UI styles fight `var(--la-*)` cascade | MEDIUM | Constraints require token-only styling; DevTools verification of computed `color`/`background-color`/`border-color` | Locked |
| 3 | PaperMod's Fuse.js `/search/` co-exists silently | MEDIUM | Step 3 explicitly mandates removal/disable; Failure-conditions list "more than one search UI visible" as bright line | Locked |
| 4 | `/` keybinding collides with PaperMod's prior `/` shortcut | LOW | Step 3 disables PaperMod search; the new `/` binding becomes single-source | Locked |
| 5 | Local build diverges from Cloudflare Pages CI in WP-006 | HIGH | README CI-parity note (`npm ci && npm run build`, no extra steps) + lockfile committed + reproducibility check is strict | Locked |
| 6 | Pagefind UI script becomes render-blocking, regressing Lighthouse Performance | MEDIUM | `defer` / dynamic-inject mandated; DevTools verification of script-tag attribute; Lighthouse ≥ 90 hard floor | Locked |
| 7 | Search index leaks header/nav/footer text | MEDIUM | Step 6 mandates `data-pagefind-body` / `data-pagefind-ignore` if scope drifts; manual verification on home/about/post | Locked |
| 8 | Card name appears in marketing copy and pollutes search results | LOW | Acknowledged as acceptable in Constraints — marketing mention ≠ card-data lookup | Locked |

**PASS.** All risks resolved with locking decisions in the WP body.

### Pre-Flight Verdict (Binary)

**READY TO EXECUTE** — conditional on the two scope-neutral copilot
fixes below.

Justification: WP-004 is locked and the content surface is real.
WP-005 introduces a single new tooling dependency (Pagefind) with
exact-version pinning and a mechanical reproducibility check;
together these collapse the largest determinism risk WP-006
inherits. The scope lock is explicit, the failure conditions are
enumerated, and the file footprint stays within established Hugo
override paths (PaperMod submodule untouched). Test expectations
are realistic for a static-site repo (Lighthouse + functional +
mechanical reproducibility, not `node:test`). The two copilot
findings (Issues 27 and 28 below) are wording fixes that do not
change scope.

---

## Copilot Check (per 01.7) — 30-issue scan

**Discipline note:** strict 30-issue scope. Engine-only items are
marked N/A with a brief reason (the Hugo site has no surface for the
issue). Where the underlying principle maps, the lens is applied.

### 1. Separation of Concerns & Boundaries

1. **Engine vs UI / App boundary drift** — N/A: no engine surface.
   The closest analog (Hugo theme override discipline — no edits
   under `themes/PaperMod/`) is locked in WP-005 Constraints.
   **PASS.**
9. **UI re-implements engine logic** — N/A: no engine.
   **PASS (vacuous).**
16. **Lifecycle wiring creep** — N/A: no `game.ts` / phases / moves.
    **PASS (vacuous).**
29. **Assumptions leaking across layers** — N/A: no layer model.
    **PASS (vacuous).**

### 2. Determinism & Reproducibility

2. **Non-determinism introduced by convenience** — WP-005 names
   determinism non-negotiable (Constraints: "Build is single-command
   and deterministic" + "Pagefind output must be deterministic"),
   pins Pagefind to an exact version, and verifies via mechanical
   `Compare-Object` over two consecutive builds. **PASS.**
8. **No single debugging-truth artifact** — `npm run build` is the
   single reproducible command; the lockfile + exact-pin make the
   build inputs auditable. **PASS.**
23. **Lack of deterministic ordering guarantees** — the
    reproducibility check sorts file hashes before diffing, which
    catches order-driven non-determinism. **PASS.**

### 3. Immutability & Mutation Discipline

3. **Pure functions vs Immer mutation** — N/A: no Immer / `G`.
   **PASS (vacuous).**
17. **Hidden mutation via aliasing** — N/A.
    **PASS (vacuous).**

### 4. Type Safety & Contract Integrity

4. **Contract drift between types/tests/runtime** — N/A in TS
   sense. The analog (Pagefind version contract drift) is locked by
   exact-version pin + lockfile. **PASS.**
5. **Optional field ambiguity (`exactOptionalPropertyTypes`)** —
   N/A: no TS contracts in scope. **PASS (vacuous).**
6. **Undefined merge semantics (replace vs append)** — explicitly
   resolved: PaperMod's Fuse.js search is **replaced**, not
   co-existed. Failure conditions name "more than one search UI
   visible" as a bright line. **PASS.**
10. **Stringly-typed outcomes** — N/A: no engine outcome types.
    The canonical mount-element naming (Issue 27) is the analog —
    see RISK below. **See Issue 27.**
21. **Type widening at boundaries** — N/A.
    **PASS (vacuous).**
27. **Weak canonical naming discipline** — **RISK.** WP-005 § Step 4
    introduces the canonical mount element with example phrasing:
    *"e.g., `<div id="la-search"></div>`"*. The "e.g." opens the
    door to drift (`#search`, `#site-search`, `#pf-search`). For a
    Hugo override that other partials may target, the exact ID
    should be locked, not exemplified.
    **FIX:** replace "e.g., `<div id="la-search"></div>`" with a
    hard-locked phrasing such as "use the canonical id
    `la-search` (`<div id="la-search"></div>` in the header
    partial). All JS must target this exact ID; do not introduce
    aliases or alternate IDs."

### 5. Persistence & Serialization

7. **Persisting runtime state by accident** — N/A: no `G` to
   persist. **PASS (vacuous).**
19. **Weak JSON-serializability guarantees** — N/A.
    **PASS (vacuous).**
24. **Mixed persistence concerns** — N/A.
    **PASS (vacuous).**

### 6. Testing & Invariant Enforcement

11. **Tests validate behavior, not invariants** — WP-005's
    "Failure conditions (explicit)" enumerates invariants
    (reproducibility, single-affordance, no render-blocking, scope
    purity, exclusion). The verification steps are invariant-style
    (binary pass/fail), not just "feature works." **PASS.**

### 7. Scope & Execution Governance

12. **Scope creep during "small" packets** — explicit "What's NOT
    in scope" + "Failure conditions" + DoD + WP-005's gate at Step 1
    (build choice before UI work). **PASS.**
13. **Unclassified directories and ownership ambiguity** — WP-005
    introduces Node tooling at repo root (a structural change).
    Step 9 requires a `01-VISION.md` Decisions log entry recording
    the install vehicle, UI approach, and shortcut policy. The
    Hugo repo has no `02-CODE-CATEGORIES.md` analog, so this
    governance entry is the only ledger. **PASS.**
30. **Missing pre-session governance fixes** — none required at
    pre-flight time (the two copilot fixes below are scope-neutral
    wording tweaks). **PASS.**

### 8. Extensibility & Future-Proofing

14. **No extension seams** — the canonical mount element is the
    extension seam for any future header tooling. **PASS** once
    Issue 27 is fixed.
28. **No upgrade or deprecation story** — **RISK.** Pagefind is
    pinned to an exact version (good — solves silent drift), but
    WP-005 is silent on **how** Pagefind is upgraded. Without an
    explicit upgrade discipline, a future "just bump it" change
    could ship a version that emits non-deterministic output and
    pass review (because the same-build/same-build check would
    still match), only to break Cloudflare Pages reproducibility
    later or alter result ranking unannounced.
    **FIX:** add a one-line note (Constraints or Background): "Any
    Pagefind version bump is a separate WP — not a silent
    dependency update. The WP must re-run the mechanical
    reproducibility check and re-verify Lighthouse ≥ 90 before
    locking."

### 9. Documentation & Intent Clarity

15. **Missing "why" for invariants and boundaries** — WP-005 names
    the *why* on the major invariants: exact-version pin (rationale
    listed inline), `npx pagefind` (PATH-resolution stability),
    canonical mount element (override safety), `defer` / dynamic
    inject (Lighthouse floor), CI parity (drift prevention). The
    Hugo repo does not enforce inline `// why:` comments the way
    the engine repo does — WP-005's prose-level rationale is
    appropriate for this repo. **PASS.**
20. **Ambiguous authority chain** — WP-005 has an explicit
    "Authority" section: vision → roadmap → this file → brand
    strategy for voice. **PASS.**
26. **Implicit content semantics** — Step 6 makes index scope
    structural (`data-pagefind-body` / `data-pagefind-ignore`)
    rather than "by convention"; Failure conditions names the
    "card name returns zero results" rule as a bright line.
    **PASS** once Issue 27 is fixed.

### 10. Error Handling & Failure Semantics

18. **Outcome evaluation timing ambiguity** — N/A: no game outcome.
    **PASS (vacuous).**
22. **Silent failure vs loud failure decisions made late** — Step 2
    explicitly spells out `&&` ordering and failure semantics:
    Pagefind runs strictly after Hugo, Hugo failure stops the
    chain, Pagefind failure exits non-zero. **PASS.**

### 11. Single Responsibility & Logic Clarity

25. **Overloaded function responsibilities** — the build script has
    two clearly-separated responsibilities (render site, build
    index) joined by `&&`. The keyboard-shortcut listener has one
    job (focus the input). **PASS.**

---

## Findings (RISK summary)

Two RISKs, both scope-neutral wording fixes. Apply in-place; no
re-run of pre-flight required.

| # | Issue | Location | FIX (scope-neutral) |
|---|---|---|---|
| 27 | Canonical mount element introduced as example, not lock | `WP-005-pagefind-search.md` Step 4, "Canonical mount point" paragraph | Change "e.g., `<div id="la-search"></div>`" to a hard-locked phrasing: "use the canonical id `la-search` (`<div id="la-search"></div>` in the header partial). All JS must target this exact ID; do not introduce aliases or alternate IDs." |
| 28 | No upgrade discipline for Pagefind version | `WP-005-pagefind-search.md` Constraints (Pagefind-determinism bullet) or Background | Add: "Any Pagefind version bump is governed by a separate WP — not a silent dependency update. The WP must re-run the mechanical reproducibility check and re-verify Lighthouse ≥ 90 before locking." |

All other 28 issues are **PASS** (16 vacuous N/A for engine-only
surfaces; 12 substantive PASS where the principle maps).

---

## Mandatory Governance Follow-ups

- `docs/01-VISION.md` Decisions log: required at lock time per
  WP-005 Step 9, recording the install vehicle (Step 1), UI
  approach + PaperMod-search disposition (Step 3), and keyboard
  shortcut policy (Step 5). **Not required pre-execution.**
- `docs/03-ROADMAP.md`: status flip + DoD/exit-criteria ticks +
  commit hashes + Lighthouse scores. **At lock time.**
- `docs/04-CONTENT-CONVENTIONS.md`: build pipeline section,
  search-UI decision, keyboard shortcut policy. **At lock time.**
- No `.claude/rules/` or `02-CODE-CATEGORIES.md` updates apply
  (those exist in the engine repo, not here).

---

## Pre-Flight Verdict Disposition

- [ ] CONFIRM — Pre-flight READY TO EXECUTE verdict stands. Session
      prompt generation authorized.
- [x] **HOLD** — Apply Issues 27 + 28 FIXes in-place to
      `WP-005-pagefind-search.md`, then re-run copilot check (which
      will return CONFIRM). Pre-flight does **not** need to re-run
      — the fixes are scope-neutral wording tweaks that resolve
      copilot RISKs without changing the WP's allowlist, mutation
      boundary, or contracts.
- [ ] SUSPEND — not applicable; no architectural blocker.

**Once HOLD fixes are applied:** verdict becomes CONFIRM /
READY TO EXECUTE; WP-005 is cleared for execution.

---

## Authorized Next Step (post-HOLD-resolution)

> You are authorized to generate a session execution prompt for
> WP-005 to be saved as
> `docs/ai/invocations/session-wp005-pagefind-search.md`, modeled
> on the existing `session-wp004-content-scaffolding.md`.

The session prompt must conform exactly to the scope, constraints,
and decisions locked by this pre-flight (and by WP-005 itself
post-FIX). No new scope may be introduced.
