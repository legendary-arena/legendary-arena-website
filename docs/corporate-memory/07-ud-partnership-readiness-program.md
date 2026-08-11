# UD Partnership Readiness Program

**Scope:** convert Legendary Arena from an unlicensed derivative into a
**measurable business asset Upper Deck would plausibly want to partner with** —
the execution arm of the strategy in
[`04-ip-licensing-acquisition-plan.md`](04-ip-licensing-acquisition-plan.md).
**Status:** Draft / Proposed (not started). No outreach; no license decision made.
**Last updated:** 2026-08-11

> **What this is (and is not).** This is a **business-readiness program**, not an
> engine work packet. It spans product, BD, marketing, and legal, so most of it is
> not code and it does **not** run through the engine WP system (WORK_INDEX + lint
> gate). The **code-bearing line items are tagged `→ engine WP`** below; each
> becomes a real, separately-scoped engine Work Packet (drafted via the
> `01.0a` WP-drafting workflow, WORK_INDEX, and lint gate) **when execution is
> greenlit** — this program coordinates them, it does not replace them.

> **Gated, not go.** Two items in `04` gate the outreach-facing parts of this
> program: **Phase 0 (retain counsel)** and the **public Marvel-build decision**
> (`04` §5 Immediate action / Risk 7). Build work (license-clean mode, companion
> tooling, dashboards) can proceed in parallel; **anything that surfaces the
> product to the rights-holders or their community** — the community sponsorship
> (`06`), the UD pitch — waits on those gates.

---

## Objective

Reach the state where the honest one-line description of Legendary Arena is:

> *"The strongest Legendary community + organized-play + analytics platform, with a
> license-clean playable core and real player metrics — here's the data; how do you
> want to participate?"*

…rather than *"a fan project seeking permission."* That shift — from **requesting
permission** to **offering a proven opportunity** — is the deliverable. See `04`
§5 "Earn a partnership; don't request a license."

**Deterministic on deliverables, not on a calendar.** Completion is defined by the
exit gate below, not by a fixed "90-day" promise — the remaining delta is quarters
of real work for a small team, and dressing it as weeks guarantees a false miss.

---

## Starting position (much is already built — do not re-spec it)

Legendary Arena already ships the hard parts of "product credibility": PAR scoring
+ Monte-Carlo simulation, gauntlets + public leaderboards, replay/LAGN
verification, bot allies, the card registry viewer, and the ops dashboard. So this
program is **~70% pre-built** — the real delta is the license-clean content set,
the companion/community layer, production hardening, and the pitch/counsel package.
That "mostly done" is itself a stronger pitch than a from-scratch plan.

---

## Success Criteria (binary — PASS only when the condition is literally true)

| ID | Criterion | PASS when |
|----|-----------|-----------|
| **SC-1 Product hardening** | Production reliability reads as a business, not a hobby project | Monitoring + error logging + backups/restore documented and drilled; uptime visible; zero known critical defects |
| **SC-2 License-clean playable build** `→ engine WP` | At least one fully **non-Marvel** ruleset is playable end-to-end | A public demo runs with **no Marvel names/art/marks** (original / fantasy / verified-PD content per `04` §5) |
| **SC-3 Public-build exposure resolved** | Risk 7 is closed, not just mitigated | The **public** site either shows the license-clean build **or** the Marvel build is taken private — a decision counsel has signed off (`04` §5) |
| **SC-4 Companion/community layer** `→ engine WP` | Non-gameplay ecosystem value exists, within the IP caveat | Collection tracking + organized-play tooling + original strategy content live; **counsel-scoped** to avoid reproducing card text/art (`06` §3, `04` companion-wedge caveat) |
| **SC-5 Metrics baseline** | Traction is measurable and defined once | A dashboard reports registered/active users, matches, retention, session length — **using [`02-kpi-dictionary.md`](02-kpi-dictionary.md) definitions** |
| **SC-6 Community relationship** | A genuine, welcome presence in the Legendary community | Executed per [`06`](06-community-advertising-and-sponsorship-plan.md) **after** SC-3 — starting with the Extra Life goodwill sponsorship |
| **SC-7 UD partnership package** | The ask is ready to send the moment counsel clears it | Partnership deck + counsel briefing + KPI baseline complete; frames a **partnership program** (companion / pilot / rev-share), not "a license" (`04` Phase 2 Ask) |

---

## Workstreams

### A — Product credibility (mostly built)
- **Already shipped:** PAR/simulation, gauntlets, leaderboards, replay/LAGN, bot
  allies, registry viewer, dashboard. Do **not** re-spec.
- **Delta:** production hardening — monitoring, error logging, backups + a **drilled**
  restore, uptime surface. `→ engine WP(s)` for the ops gaps.
- Serves **SC-1**.

### B — License-clean mode `→ engine WP` (the gating build)
- A complete non-Marvel ruleset (original / fantasy / verified-PD content, `04`
  §5), and the **asset/engine separation** so licensed content can plug in later.
- This is what makes **SC-2/SC-3** achievable and directly addresses Risk 7.
- Verified-PD content is **counsel-cleared per character/issue** before use.

### C — Companion / community layer `→ engine WP(s)`
- Collection tracking, organized-play/league tooling, statistics over
  user-entered data, and **original** strategy content.
- **Hard caveat (`06` §3):** lower-not-zero IP exposure — no reproduction of card
  text/art; names/"Legendary®" are trademark. Counsel scopes what ships.
- Serves **SC-4**. Note the overlap/partner question with `legendaryleagues.com`
  (`06` §4.5) — build vs. partner is a live decision, not a foregone build.

### D — Organized play (mostly built)
- **Already shipped:** gauntlets, leaderboards, PAR scoring.
- **Delta:** season framework / rankings polish if the pitch needs it. `→ engine WP`
  only if a real gap exists — do not rebuild what's there.

### E — Partnership readiness (non-engine)
- **Counsel briefing package** (IP inventory, assumptions, the public-build
  question) — feeds `04` Phase 0 and [`05`](05-counsel-and-agent-selection.md).
- **KPI baseline** from SC-5, defined via `02`.
- **UD partnership deck** (~10 slides): problem, community, platform, metrics,
  fairness-first model, organized play, growth, **partnership structure**, next
  steps — the `04` Phase 2 "Ask," options A/B/C.
- **Community relationship** per `06` (gated on SC-3).

---

## Exit gate — "UD-ready"

The program is complete only when **all** are true:

- ✅ SC-1…SC-7 PASS.
- ✅ A license-clean build is the public face **or** the Marvel build is private
  (SC-3) — counsel-approved.
- ✅ Metrics come from a single dashboard on `02` definitions (SC-5).
- ✅ The partnership deck + counsel briefing can be sent the day counsel clears it
  (SC-7).
- ✅ Legendary Arena can be described, truthfully, as **a business with a proven
  community**, not a software project seeking permission.

At that point the licensing conversation (`04` Phases 3–5) shifts from "may we
build this?" to "how do you want to participate?" — which is the entire point.

---

## Relationship to KPIs and governance

- Every metric here uses [`02-kpi-dictionary.md`](02-kpi-dictionary.md) — one
  definition set feeds SC-5, the pitch deck (SC-7), and `04`'s credibility
  milestones.
- [`04`](04-ip-licensing-acquisition-plan.md) is the strategy this executes;
  [`05`](05-counsel-and-agent-selection.md) is Phase 0 counsel; [`06`](06-community-advertising-and-sponsorship-plan.md)
  is the SC-6 community relationship; [`03-open-questions.md`](03-open-questions.md)
  tracks the license gap; commitment lands in [`01-decision-log.md`](01-decision-log.md).
- Engine [`docs/01-VISION.md`](../01-VISION.md) §Financial Sustainability governs
  the fairness-first / royalty-first framing the deck leads with.

## Engine WPs this program will spawn (drafted on greenlight, via WORK_INDEX + lint gate)

- **License-clean content mode + asset/engine separation** (SC-2/SC-3, Workstream B).
- **Companion/community layer** — collection tracking, league tooling, stats
  (SC-4, Workstream C), counsel-scoped.
- **Production hardening / observability** — monitoring, backups+restore drill,
  uptime (SC-1, Workstream A) — to the extent not already covered by
  `docs/ops/DISASTER_RECOVERY.md`.
- **Season/rankings polish** (SC-? / Workstream D) — only if a real gap exists.

Each is a separate, scoped engine Work Packet; this program is their coordinating
spec, not a substitute for them.
