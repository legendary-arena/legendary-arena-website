# WP-021 — Funnel analytics baseline

Define the analytics contract for the Legendary Arena email funnel:
what is measured, how it is measured, and how results are validated.
This WP converts the existing engagement pipeline (WP-018) into a
**measurable, auditable system**.

This is a **governance and instrumentation WP**. No Brevo configuration
changes, no Hugo changes. Outputs are documentation artifacts and
validation procedures only.

This file is the **session-ready execution pack**. The design source of
truth is [`docs/03-ROADMAP.md`](../../03-ROADMAP.md). If this file and
the roadmap conflict, the roadmap wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme as a Git submodule. Brand
tokens consumed by `play.*` and `cards.*` via cross-origin link.
Deployed to Cloudflare Pages.

## Required reading (in order)

1. `docs/01-VISION.md` — vision, global invariants, decisions log.
   The **Financial Sustainability** section establishes the email
   pipeline as part of the revenue-sustaining engagement loop.
2. `docs/03-ROADMAP.md` — full WP list. WP-021 depends on WP-018
   (pipeline infrastructure) and WP-020 (UTM + CTA discipline).
3. `docs/ai/work-packets/WP-018-brevo-automation.md` — defines the
   pipeline execution, subscriber state model, send readiness gate,
   and operational snapshot.
4. `docs/ai/work-packets/WP-020-funnel-enrichment.md` — defines CTA
   hierarchy, UTM parameter conventions, and funnel integrity checks.
5. `docs/email-automation.md` — operational reference produced by
   WP-018. This is the primary file WP-021 modifies.

## Current state

Locked under WP-001 -> WP-020:

- Email pipeline exists: signup -> confirm -> welcome -> weekly
  cadence -> conversion (WP-018).
- UTM tracking conventions defined: `utm_source`, `utm_medium`,
  `utm_campaign`, `utm_content` (WP-020).
- QA + funnel integrity checks enforced (WP-017 / WP-020 / WP-018).
- Subscriber state model documented: Pending -> Confirmed ->
  Welcomed -> Active -> Unsubscribed (WP-018).
- Funnel stages and metric targets defined in
  `docs/email-automation.md` (WP-018).

What's missing — **your job**:

- No formalized measurement contract (which metrics, which formulas)
- No baseline thresholds for detecting failure vs normal operation
- No reporting artifact (append-only metrics log per send)
- No UTM attribution validation procedure
- No analytics invariants (consistency rules across weeks)

## Prerequisites (hard)

| Prereq WP | Required state | Why |
|---|---|---|
| WP-018 | Done | `docs/email-automation.md` must exist. WP-021 modifies it. |
| WP-020 | Done | UTM conventions must be locked. WP-021 references them. |

If either prerequisite is not Done, STOP. This WP cannot execute
without the operational reference and UTM contract in place.

## Analytics platform constraint

The roadmap notes: "Analytics — Cloudflare Web Analytics, Plausible,
or none. Decide post-launch." No site-side analytics platform exists
yet.

This means:

- **Measurable now (Brevo-native):** delivery rate, open rate, CTR,
  CTOR, bounce rate, unsubscribe rate. These come directly from
  Brevo's campaign analytics dashboard.
- **Measurable now (manual):** UTM parameter correctness (URL
  string inspection after clicking email links).
- **Not yet measurable:** site-side conversion rate (did the user
  actually play / buy / enter a tournament after clicking?). UTM
  params are present in URLs but no analytics tool ingests them.

WP-021 defines the measurement contract for what IS measurable today.
Conversion tracking is deferred to a future analytics platform WP.
The UTM contract (WP-020) is already in place so that when a platform
is chosen, attribution data is already flowing.

## Task

### Step 1 — Define funnel measurement contract

Add a new section to `docs/email-automation.md`:

```markdown
## Funnel measurement contract

Metrics by funnel stage. All metrics must be calculable from Brevo
dashboard data only — no inferred metrics, no external tools.

### Capture (signup)

- **Signup count** — total form submissions (Brevo contact creates)

### Confirm (double opt-in)

- **Confirmation rate** — confirmed contacts / total signups

### Activate (welcome email)

- **Open rate** — opens / delivered
- **Click-through rate (CTR)** — clicks / delivered

### Engage (weekly newsletters)

- **Delivery rate** — delivered / sent
- **Open rate** — opens / delivered
- **Click-through rate (CTR)** — clicks / delivered
- **Click-to-open rate (CTOR)** — clicks / opens

### Convert (downstream actions)

- **CTA click rate** — primary CTA clicks / delivered. **Primary
  CTA** is the single in-body CTA button as defined in
  `docs/newsletter-template.md` §6 (WP-020 authority). Only this
  link is counted for CTA click rate.
- **Conversion rate** — NOT YET MEASURABLE. Requires a site-side
  analytics platform (Cloudflare Web Analytics, Plausible, or
  equivalent). UTM parameters are present in links; ingestion is
  deferred to a future WP.

### Retain

- **Unsubscribe rate** — unsubscribes / delivered
- **List growth rate** — (new subscribers - unsubscribes) / list size
```

### Step 2 — Define metric formulas

Add a new section after the measurement contract:

```markdown
## Metric definitions

Explicit formulas. All inputs are Brevo-reported values.

### Measurement conventions

- All metrics use **unique counts** as reported by Brevo unless
  explicitly stated otherwise
- "Opens" = unique opens
- "Clicks" = unique clicks
- "Delivered" = sent - bounces (as reported by Brevo)
- No total (non-unique) metrics are used in any calculation

| Metric | Formula | Source |
|---|---|---|
| Delivery rate | delivered / sent | Brevo campaign report |
| Open rate | opens / delivered | Brevo campaign report |
| CTR | clicks / delivered | Brevo campaign report |
| CTOR | clicks / opens | Brevo campaign report |
| Unsubscribe rate | unsubscribes / delivered | Brevo campaign report |
| Confirmation rate | confirmed contacts / signups | Brevo contact list |
| List growth rate | (new - unsubscribes) / list size | Brevo contact list |

Only the metrics defined in this table are permitted. Any new
metric requires an explicit addition to this table before use.
No external normalization. No custom calculations.
```

### Step 3 — Define baseline thresholds

Add a new section:

```markdown
## Baseline thresholds (initial)

These are validation ranges for detecting failure, not success
targets. Values outside these ranges trigger investigation and
must be documented in the Notes section of the metrics log entry.

| Metric | Expected range | Failure threshold | Notes |
|---|---|---|---|
| Delivery rate | >95% | <90% | Low delivery suggests auth or reputation issue |
| Open rate | 20–50% | <15% | Wide range due to Apple MPP and privacy proxies |
| CTR | 2–5% | 0% | Zero clicks = non-functional funnel |
| CTOR | 5–15% | <3% | Low CTOR suggests content/CTA mismatch |
| Unsubscribe rate | <1% | >2% | High unsub suggests content or frequency issue |
| Confirmation rate | >70% | <50% | Low confirm suggests form UX or spam signup issue |

Ranges are conservative starting points based on B2C newsletter
benchmarks. Adjust after 4+ weeks of data.
```

### Step 4 — Define UTM attribution validation

Add a new section:

```markdown
## UTM attribution validation

### Required parameters (per WP-020)

All shop links in emails must include:

| Parameter | Newsletter value | Welcome value |
|---|---|---|
| `utm_source` | `newsletter` | `newsletter` |
| `utm_medium` | `email` | `email` |
| `utm_campaign` | `<newsletter_slug>` | `welcome` |
| `utm_content` | `featured-product` | `featured-product` |

### Validation procedure (per send)

1. Open the email in an inbox (not Brevo preview)
2. Click the shop link
3. Copy the final URL from the browser address bar
4. Verify the URL contains exactly the following query parameters:
   `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`
5. Verify parameter values match WP-020 exactly (case-sensitive)
6. Verify no additional `utm_*` or tracking parameters exist

UTM parameter validation must be based on URL string inspection,
not visual rendering or redirect assumptions.

### UTM consistency rules

- Parameters must match WP-020 conventions exactly (case-sensitive)
- `utm_campaign` must equal the blog post slug (slug coupling
  invariant from WP-020)
- No ad-hoc UTM values permitted
- UTM structure must not change between sends
```

### Step 5 — Create the reporting artifact

Create a new file `docs/email-metrics-log.md`:

```markdown
# Email Metrics Log

Append-only record of per-send metrics. One entry per newsletter
edition. No retroactive edits — corrections are recorded as new
entries with a note.

---

## Template

Copy this block for each send:

### Week <N> — <newsletter_slug>

- **Date sent:** YYYY-MM-DD
- **Metrics recorded:** YYYY-MM-DD (must be ≥48 hours post-send)
- **Brevo campaign ID or name:**
- **Emails sent:**
- **Delivered:**
- **Opens:**
- **Clicks:**
- **Unsubscribes:**
- **Bounces:**

#### Calculation requirement

All rates must be calculated using the formulas defined in
`docs/email-automation.md`. Values must be recorded as percentages
with one decimal place (e.g., 23.4%). Calculations must be
reproducible from the raw counts in this entry.

#### Derived metrics

- Delivery rate:
- Open rate:
- CTR:
- CTOR:
- Unsubscribe rate:

#### UTM validation

- [ ] Shop link UTM parameters correct
- [ ] `utm_campaign` matches newsletter slug
- [ ] No extra or missing parameters

#### Threshold check

- [ ] Delivery rate ≥90%
- [ ] Open rate ≥15%
- [ ] CTR >0%
- [ ] Unsubscribe rate ≤2%

#### Result

`PASS` / `FAIL`

#### Notes

(failures, anomalies, corrections)

---

## Log entries

(append below this line)
```

### Step 6 — Define reporting cadence

Add a new section to `docs/email-automation.md`:

```markdown
## Reporting cadence

- Metrics recorded 48 hours after send time to allow for delayed
  opens (record timestamp must be ≥48 hours post-send)
- Append-only log — no retroactive edits
- Welcome email metrics recorded once at WP-018 completion, then
  monthly spot-checks
- Monthly review of aggregate trends is optional (future WP)
- Threshold failures require investigation before next send

### Snapshot semantics

- Metrics represent a point-in-time snapshot taken ≥48 hours
  post-send
- Metrics must not be updated after recording, even if Brevo
  values change later
- Changes in Brevo reporting after snapshot are ignored
```

### Step 7 — Define analytics failure conditions

Add a new section to `docs/email-automation.md`:

```markdown
## Failure conditions (analytics)

Any of the following is an analytics failure:

- Missing metrics entry for any production send
- CTR = 0% (funnel is non-functional regardless of opens)
- Missing UTM parameters on any shop link
- `utm_campaign` does not match newsletter slug
- No QA log entry for the corresponding send
- Metrics calculated using a formula not in the metric definitions
  table
- Metrics derived from a source other than Brevo dashboard
- Any metric recorded without corresponding raw counts
  (sent, delivered, opens, clicks, unsubscribes, bounces)
- Any percentage recorded that cannot be reproduced from the
  raw counts in the same log entry
```

### Step 8 — Define analytics invariants

Add a new section to `docs/email-automation.md`:

```markdown
## Analytics invariants

- Metrics must be recorded for every production send — no exceptions
- UTM parameter structure must not change between sends (WP-020
  contract)
- All metrics must be calculated using the formulas in the metric
  definitions table — no custom calculations
- The metrics log is append-only — corrections are new entries, not
  edits to prior entries
- Baseline thresholds apply to all sends equally — no per-send
  overrides without a documented reason
```

### Step 9 — Verify

1. **Measurement contract:**
   - [ ] Funnel measurement contract section exists in
     `docs/email-automation.md`
   - [ ] All six funnel stages covered (Capture, Confirm, Activate,
     Engage, Convert, Retain)
   - [ ] Conversion rate explicitly marked as NOT YET MEASURABLE

2. **Metric definitions:**
   - [ ] Metric definitions table exists with formulas
   - [ ] Measurement conventions section present (unique vs total)
   - [ ] All formulas use Brevo-reported values only
   - [ ] Only defined metrics permitted (no ad-hoc additions)

3. **Baseline thresholds:**
   - [ ] Baseline thresholds table exists
   - [ ] Failure thresholds defined for all measurable metrics
   - [ ] Thresholds described as validation ranges, not success
     targets

4. **UTM validation:**
   - [ ] UTM attribution validation section exists
   - [ ] Validation procedure documented (6 steps, URL string
     inspection)
   - [ ] UTM consistency rules reference WP-020

5. **Reporting artifact:**
   - [ ] `docs/email-metrics-log.md` exists
   - [ ] Template includes Brevo campaign ID or name field
   - [ ] Template includes metrics-recorded timestamp field
   - [ ] Template includes all required raw count fields (sent,
     delivered, opens, clicks, unsubscribes, bounces)
   - [ ] Calculation requirement block present (one decimal place,
     reproducible from raw counts)
   - [ ] Derived metrics section with formulas
   - [ ] UTM validation checklist
   - [ ] Threshold check checklist
   - [ ] PASS/FAIL result field

6. **Reporting cadence:**
   - [ ] Cadence section exists in `docs/email-automation.md`
   - [ ] Snapshot semantics subsection present (≥48h, immutable
     after recording)
   - [ ] Append-only rule documented
   - [ ] Threshold failure investigation requirement documented

7. **Analytics governance:**
   - [ ] Failure conditions section exists
   - [ ] Analytics invariants section exists
   - [ ] Zero-CTR failure explicitly called out

8. **Scope compliance:**
   - [ ] `git diff --name-only` shows only allowed files
   - [ ] No changes to `hugo.toml`, `layouts/**`, `assets/**`,
     `static/**`, `functions/**`, `content/**`, `themes/**`

## Scope lock

This WP touches **only**:

| File | Change |
|---|---|
| `docs/email-automation.md` | **MODIFY** — add measurement contract, metric definitions, baseline thresholds, UTM validation, reporting cadence, failure conditions, analytics invariants |
| `docs/email-metrics-log.md` | **NEW** — append-only per-send metrics log |

All other files are forbidden.

**Do NOT touch:**

- `hugo.toml` (no config changes)
- `static/**` (no static assets)
- `themes/PaperMod/**` (submodule locked)
- `layouts/**` (locked under prior WPs)
- `archetypes/**` (locked under WP-016)
- `assets/**` (CSS locked under prior WPs)
- `functions/**` (WP-015, locked)
- `content/**` (WP-017, locked)
- `package.json` (no dependencies)
- `docs/newsletter-template.md` (WP-020, consume only)
- `docs/ai/work-packets/WP-017-content-pipeline.md` (consume only)
- `docs/ai/work-packets/WP-018-brevo-automation.md` (consume only)
- `docs/ai/work-packets/WP-020-funnel-enrichment.md` (consume only)

## Definition of Done

All must be true before marking WP-021 complete:

1. Funnel measurement contract defined with all six stages
2. Measurement conventions documented (unique counts, not totals)
3. Metric definitions table with explicit formulas
4. All formulas use Brevo-reported values only
5. Conversion rate documented as not yet measurable (pending
   analytics platform decision)
6. Primary CTA attribution scoped to §6 button only
7. Baseline thresholds defined for all measurable metrics
8. Thresholds framed as failure detection, not success targets
9. UTM attribution validation procedure documented (6-step URL
   string inspection, not visual rendering)
10. UTM consistency rules reference WP-020 conventions
11. `docs/email-metrics-log.md` created with per-send template
12. Template includes Brevo campaign ID, metrics-recorded timestamp,
    raw counts, calculation requirement, derived metrics, UTM
    validation checklist, threshold check, and PASS/FAIL result
13. Reporting cadence documented (per-send, append-only)
14. Snapshot semantics documented (≥48h post-send, immutable after
    recording)
15. Analytics failure conditions defined (including reproducibility
    from raw counts)
16. Analytics invariants defined
17. No conflicts with WP-018 or WP-020 contracts
18. No site files modified (docs-only in-repo changes)
19. `npm run build` deterministic (two runs, byte-identical output)

## Exit criteria

This WP exits when:

- All DoD items verified
- Commit(s) on `main` with `WP-021:` prefix
- ROADMAP updated: WP-021 status -> Done
- Decisions log entry in `01-VISION.md`: "WP-021 — Funnel analytics
  baseline. Defined measurement contract, metric formulas, and
  baseline thresholds for the email funnel. All metrics Brevo-native;
  site-side conversion tracking deferred to analytics platform WP.
  Created append-only metrics log for per-send recording."

## Failure conditions

- **Metrics cannot be calculated from Brevo**: A defined metric
  requires data Brevo does not expose -> remove the metric or mark
  it as not yet measurable with a note.
- **UTM parameters inconsistent with WP-020**: Any UTM convention
  in this WP deviates from WP-020 -> align with WP-020 (WP-020 is
  the authority for UTM conventions).
- **Missing metrics log file**: `docs/email-metrics-log.md` not
  created -> create it.
- **Analytics implemented outside documented contract**: Metrics
  calculated using undocumented formulas or external tools -> remove
  and document properly.
- **Scope violation**: Any file outside `docs/**` modified -> revert.
- **Conversion rate presented as measurable**: Conversion rate
  framed as trackable without a site-side analytics platform ->
  correct to "not yet measurable".

## Risk register

1. **Open rate accuracy.** Apple Mail Privacy Protection (MPP) and
   privacy proxies inflate open rates by pre-fetching tracking
   pixels. Mitigation: the baseline threshold range (20-50%) is
   deliberately wide to account for this. CTR and CTOR are more
   reliable engagement indicators. Document this caveat in the
   measurement contract.

2. **Brevo free tier reporting limits.** Brevo's free plan may
   limit historical reporting access or API-based metric retrieval.
   Mitigation: WP-021 uses only the Brevo dashboard (no API-based
   metric retrieval). The append-only log in
   `docs/email-metrics-log.md` ensures metrics are captured
   immediately and not dependent on Brevo's retention window.

3. **Link tracking disabled or broken.** Some email clients or
   privacy tools strip tracking parameters or block redirects,
   reducing reported clicks. Mitigation: CTR failure threshold
   (0%) explicitly detects total tracking failure. Manual UTM
   validation (Step 4) ensures links are structurally correct
   even if client-side tracking is suppressed.

4. **Baseline thresholds may not fit this audience.** Thresholds
   are based on general B2C benchmarks. A niche gaming newsletter
   may have different engagement patterns. Mitigation: thresholds
   are explicitly framed as validation ranges, not targets. Adjust
   after 4+ weeks of data.

## Follow-on work (not in scope)

- **Analytics platform selection** — choose Cloudflare Web
  Analytics, Plausible, or equivalent. Enable site-side conversion
  tracking. Separate WP.
- **Dashboard / visualization** — aggregate metrics into a visual
  report. Separate WP (requires analytics platform).
- **A/B testing framework** — define testing methodology, sample
  sizes, and statistical significance rules. Separate WP.
- **Segmentation analytics** — metrics by subscriber segment
  (engagement level, signup source). Separate WP (requires Brevo
  segmentation from WP-018 follow-on).
- **Revenue attribution** — link email engagement to Snipcart
  purchases via UTM params. Separate WP (requires analytics
  platform + Snipcart webhook data).
