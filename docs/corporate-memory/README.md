# Corporate Memory — Legendary Arena (marketing repo)

**Scope:** the Legendary Arena business as governed by THIS repo
(`C:\www\legendary-arena-com` — the Hugo marketing site for
`www.legendary-arena.com`).
**Owner:** Jeffery Jensen
**Last updated:** 2026-06-12

---

## What this is

A **thin executive layer** that sits above the detailed governance already
in this repo (`01-VISION.md`, `03-ROADMAP.md`, `docs/brand/`,
`docs/product/`, `docs/brevo/`). It does **not** re-document any of that —
it points down into it. The detailed docs remain the source of truth; this
layer is the map.

It is one node in a **distributed, repo-local corporate-memory system**:
each repo carries its own memory, and a private identity repo holds the
person and the portfolio index.

| Layer | Location | Holds |
|---|---|---|
| Personal / identity / portfolio | `C:\www\jefferyjjensen-corporate-memory` (private, no remote) | Owner profile, operating principles, cross-business portfolio index |
| **Legendary Arena (this repo)** | `C:\www\legendary-arena-com\docs\corporate-memory\` | LA business brief, decisions, KPIs, open questions |
| Engine monorepo | `C:\pcloud\BB\DEV\legendary-arena` (org `barefootbetters`) | *(future — its own memory when scaffolded)* |
| BarefootBetters site | *(repo TBD)* | *(future)* |

The portfolio index that ties these together lives in
`C:\www\jefferyjjensen-corporate-memory\portfolio.md`.

## Files in this layer

| File | Purpose |
|---|---|
| [`00-business-brief.md`](00-business-brief.md) | What LA is, its properties, product lines, channels, revenue model — all linking down to the authoritative docs |
| [`01-decision-log.md`](01-decision-log.md) | Append-only, executive-altitude strategic decisions. Granular site/technical decisions live in `01-VISION.md` Decisions log; this links to them |
| [`02-kpi-dictionary.md`](02-kpi-dictionary.md) | Strict KPI definitions, owners, and sources across email, search, YouTube, and commerce |
| [`03-open-questions.md`](03-open-questions.md) | Gap tracker — what's undefined, unverified, or pending a decision |
| [`04-ip-licensing-acquisition-plan.md`](04-ip-licensing-acquisition-plan.md) | Research-backed plan to secure Marvel + Upper Deck rights (the royalty covenant this makes true). Draft, pre-outreach; points down to VISION |
| [`05-counsel-and-agent-selection.md`](05-counsel-and-agent-selection.md) | Phase 0/3 companion to the plan: Disney's no-unsolicited-submissions policy, counsel & agent selection criteria, and verified candidate counsel/agents (citations). Draft, pre-engagement |

## Update rules (treat this like code)

1. **Append-only decision log.** Never edit a historical entry in
   `01-decision-log.md`. Corrections are new entries that supersede, with a
   note pointing back.
2. **Timestamp everything.** Absolute dates (`2026-06-12`), never relative
   ("last week").
3. **No duplication.** If a fact has an authoritative home in `01-VISION.md`,
   a WP, or a brand doc, **link to it** — don't copy it. Two sources of truth
   is the failure mode this system exists to prevent.
4. **`[CONFIRM: …]` for anything unverified.** Never write a guess as a fact.
   The weekly pass resolves these.
5. **Weekly maintenance pass (~30 min).** Once a week: reconcile the decision
   log against what actually shipped; refresh KPI targets/actuals; clear or
   re-confirm `[CONFIRM:]` markers; prune stale open questions.

## Commit convention

Corporate-memory edits are non-site governance. Per the marketing-repo
prefix convention (`docs/ai/REFERENCE/01.8-claude-code-hooks.md`), use the
**`SPEC:`** prefix (governance), e.g. `SPEC: corporate-memory — log Plausible
selection`. If a dedicated `MEMORY:` prefix is wanted, the commit-msg hook's
allowed-prefix set has to be updated first — don't bypass it.

## Authority

Subordinate to `docs/01-VISION.md`. If anything here conflicts with the
vision, a WP, or a brand doc, **those win** and this layer is wrong and must
be corrected.
