# WP-009 — Class-color usage audit (cross-site)

**Status:** v1 DRAFT — pending review (not yet integrated into `03-ROADMAP.md` § WP-009 body)
**Drafted:** 2026-05-08
**Reviewer:** Jeffery Jensen

> **Authority:** This file is currently a **spec draft for review**. Once accepted,
> the spec body moves into `docs/03-ROADMAP.md § WP-009` (which then becomes the
> design source of truth per the 2026-05-07 Decisions log convention), and this
> file is rewritten as the session-ready execution pack closer to execution time.
> Until then, the roadmap Summary table marks WP-009 as draft and points back at
> this file. If this draft and `01-VISION.md` / `palette.md` ever conflict during
> review, those documents win.

---

## Header

**Status:** ⏸️ Pending (post-draft-review; depends on WP-007a + WP-007b)
**Effort:** ~0.5–1 day (scales with consumer UI surface at audit time)
**Dependencies:** WP-007a, WP-007b

## Readiness

- Spec complete: 📝 Draft (this file) — pending review
- Dependencies met: ❌ (waiting on WP-007a + WP-007b)
- Ready for execution: ❌

## Preconditions

- WP-007a complete; `arena-client` consuming brand tokens cross-origin from
  `https://www.legendary-arena.com/brand-tokens.css`
- WP-007b complete; `cards.barefootbetters.com` consuming brand tokens
  cross-origin from the same URL
- Read access to the engine monorepo (`legendary-arena`) confirmed —
  `arena-client` and `registry-viewer` source files reachable for static
  analysis
- `palette.md §4.4` still locked at v1 (no in-flight redefinition); the
  audit assumes a stable token contract

## Goal

Verify that the ten `--la-color-class-*` tokens defined in `palette.md §4.4`
are used correctly across all three consumer sites (`www`, `play`, `cards`)
and produce a written evidence record. This WP is the enforcement layer for
§4.4 role discipline and §10 failure-mode prohibitions.

## What this WP delivers

This is an **enforcement WP**, not an integration WP. The class-color
subsystem was added under WP-002 post-lock iteration on 2026-05-08. WP-009
confirms that downstream usage during WP-007a/b matches the contract and
documents the result. Future class-color usage on any site can reference
this audit as the baseline.

## Audit scope — four checks

### Check 1 — Token definition integrity

All ten tokens present in `static/brand-tokens.css` with hex values matching
`palette.md §4.4` exactly:

- `--la-color-class-strength` (`#40b93c`)
- `--la-color-class-strength-muted` (`#164b33`)
- `--la-color-class-covert` (`#ee2223`)
- `--la-color-class-covert-muted` (`#ae2136`)
- `--la-color-class-instinct` (`#f9b00b`)
- `--la-color-class-instinct-muted` (`#92400e`)
- `--la-color-class-ranged` (`#31a5d6`)
- `--la-color-class-ranged-muted` (`#155e75`)
- `--la-color-class-tech` (`#a7a5a6`)
- `--la-color-class-tech-muted` (`#666666`)

Mode-stable: same value in both `:root` and `html[data-theme="dark"]` blocks.

### Check 2 — No raw class hexes on any consumer

Grep each consumer's source tree for the ten hex values listed above. Zero
hits permitted outside `static/brand-tokens.css` and `palette.md` itself.
Hits inside HTML / CSS / Vue / TS source = §10 violation ("raw hex outside
brand-tokens.css") plus a §4.4 role violation (token bypass).

### Check 3 — Pattern compliance for any `--la-color-class-*` reference

Each token reference is reviewed against the four §4.4 application patterns:

- **border-accent** — 1–2px border using class color; neutral surface fill
- **chip-fill** — class color on chip background with contrast-paired text
- **icon-accent** — class color applied to icon glyph only; surrounding
  surface stays neutral
- **selection-state** — class color as highlight outline / underline / ring
  on otherwise-neutral element
- **full-surface fill** — only permitted if the element is class-scoped
  (e.g., a deck-builder pane that *is* the strength class, or a class-page
  hero band). Anywhere else = violation.

### Check 4 — Disallowed contexts on any consumer

Class tokens MUST NOT appear in:

- **Brand identity surfaces** — logo, primary header background, marketing
  hero gradients (`palette.md §10` failure mode "class color used as brand
  identity")
- **CTA backgrounds** — `.btn`, `.button`, primary action elements (CTA red
  is `palette.md §4.2.1`; class colors are §4.4 — distinct subsystems)
- **Semantic state indicators** — success / warning / error / info
  (`palette.md §10` failure mode "class color used as system semantic")
- **Interactive affordances on links / focus rings** — `palette.md §4.3`
  cross-rule: `--la-color-blue-bright` carries the click signal, not class
  blues

## Deliverables

- `docs/brand/audits/class-color-usage-v1.md` — findings doc with:
  - Date, auditor, repos audited (with commit hashes)
  - Per-check pass/fail summary
  - `file:line` evidence for every token reference and every violation
  - Per-violation remediation ticket reference (if violations found)
- Reproducible RG recipes embedded in the findings doc — copy-paste runnable
  from a clean clone of each repo. Document the exact ripgrep version + flags
  used so re-runs match.
- Decisions log entry in `01-VISION.md` recording audit completion + outcome

## Constraints

- **Read-only on consumer repos.** This WP audits; it does not remediate.
  Violations get tickets filed in the owning repo (`legendary-arena` for
  arena-client + registry-viewer; `legendary-arena-com` for www).
  Remediation is a separate effort per affected repo and is NOT a
  precondition for closing WP-009 — the audit is "done" when findings are
  documented and tickets exist.
- **Static analysis only.** Source-level grep + manual review of each token
  reference. No runtime crawlers, no headless-browser checks. Runtime visual
  verification is part of WP-007a/b smoke tests, not this audit.
- **No new tokens added by this WP.** Findings may reveal that §4.4 patterns
  need refinement, but token additions / redefinitions remain governed by
  `palette.md §9` (or §9.1 if still inside the lock window — note the
  window closes 2026-05-10 23:59 local OR on first consumer integration,
  whichever comes first; by the time this WP runs the window will be
  closed).
- **Audit doc is committed to www repo**, not engine repo, because the
  contract owner is `palette.md` (which lives in www).

## Definition of Done

- [ ] All ten §4.4 tokens present in `static/brand-tokens.css` with hex
      values matching `palette.md §4.4` exactly (verified by direct
      hex-by-hex comparison)
- [ ] Mode-stability verified for all ten tokens (same value in `:root` and
      `html[data-theme="dark"]` blocks)
- [ ] www repo: zero raw class-color hexes outside `static/brand-tokens.css`
      and `docs/brand/palette.md`
- [ ] www repo: every `--la-color-class-*` reference reviewed against §4.4
      application patterns; pattern noted in findings doc
- [ ] arena-client (engine monorepo): same four checks, written findings
      with commit hash
- [ ] registry-viewer (engine monorepo): same four checks, written findings
      with commit hash
- [ ] `docs/brand/audits/class-color-usage-v1.md` committed with full
      evidence
- [ ] `01-VISION.md` Decisions log entry recorded
- [ ] Any violations found have linked remediation tickets in the owning
      repo (or, if no violations, that fact is recorded explicitly)

## Exit criteria

- [ ] Audit findings doc shows zero open §10 violations across all three
      repos (either no violations existed, or all violations have
      remediation tickets filed)
- [ ] RG recipes in the findings doc reproduce identical results when run
      from a fresh clone of each repo
- [ ] Token-value comparison passes byte-for-byte against `palette.md §4.4`
- [ ] Findings doc reads as a standalone artifact (someone unfamiliar with
      the project can understand what was audited, against what contract,
      with what result)

## Failure conditions

- Token value drift between `palette.md §4.4` and `static/brand-tokens.css`
- Raw class-color hex appears outside `static/brand-tokens.css` /
  `docs/brand/palette.md` on any of the three consumers
- Class-color token used as brand identity, CTA background, semantic state
  indicator, or link / focus-ring affordance on any consumer (§10
  violations)
- Class token used in a context that doesn't match one of the four §4.4
  patterns and isn't a class-scoped element
- Findings doc incomplete (any of the four checks not documented for any of
  the three repos)
- Audit RG recipes not reproducible from a clean clone

## Rollback

- Audit is read-only on consumer repos; nothing to roll back externally.
- If the findings doc itself contains errors, revert the commit and
  re-audit. No production impact from this WP.

## What's NOT in scope

- **Remediation of any violations found.** Remediation is a separate
  per-repo effort. WP-009 produces the evidence; tickets drive the fixes.
- **Continuous CI enforcement.** A regex CI check that prevents future
  violations is a candidate v2 effort, not part of WP-009. Defer until this
  audit confirms the surface area is small enough that a regex check is
  tractable.
- **Other token-discipline audits.** Gradient discipline, focus-ring
  discipline, type-scale audit, spacing-scale audit are separate efforts —
  if WP-009 succeeds the same template is reusable for those.
- **Token redefinitions.** WP-009 audits usage against the locked v1
  contract; it does not propose contract changes. Any contract change
  surfaced by audit findings is a separate effort governed by
  `palette.md §9`.

## Authority

Subordinate to `01-VISION.md` (highest), then `03-ROADMAP.md`, then this
file. The contract being enforced is `docs/brand/palette.md §4.4` (role
discipline + application patterns) and §10 (failure modes). If anything in
this draft conflicts with palette.md or vision, those win.

## Notes (for the eventual session)

- This is the first usage-discipline audit on the brand-tokens contract. If
  it lands clean, the same template applies to gradient / focus-ring /
  type-scale / spacing audits.
- The audit is one-shot. A continuous CI check would belong in a separate
  WP once this audit confirms the surface area is small enough that a
  regex check is tractable.
- Engine-side execution (Checks 2 / 3 / 4 against arena-client +
  registry-viewer) is a candidate for an EC in the engine monorepo's
  `docs/ai/execution-checklists/` system, since that's where ECs live.
  The EC would extract the ten hex values, the four §4.4 patterns, and
  the disallowed-context list into a quick-reference checklist. **Defer
  EC creation until WP-007a/b actually land** — drafting the EC now risks
  staling against the actual UI surface that ends up being audited.

## Review notes (delete on integration)

This file is a draft for review. When accepted:

1. Move the spec content above into `docs/03-ROADMAP.md § WP-009` as a full
   section, matching the format of WP-001..WP-008.
2. Update the roadmap Summary table row to drop the `(spec draft)` marker.
3. Either delete this file, or rewrite it as the session-ready execution
   pack (with required reading, current state, step-by-step tasks) closer
   to actual execution time — analogous to how `WP-004-content-scaffolding.md`
   relates to `03-ROADMAP.md § WP-004`.
