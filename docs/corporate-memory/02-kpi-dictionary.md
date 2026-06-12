# KPI Dictionary — Legendary Arena

**Last updated:** 2026-06-12
**Purpose:** one strict, cross-channel index of what we measure, where it
comes from, who owns it, and the target. Formulas that already have an
authoritative home are **linked, not restated**.

**Conventions:** all rates use **unique** counts unless noted. Targets
marked `[CONFIRM]` are not yet set — resolve in the weekly pass. A metric
with no agreed definition does not belong in a report until it's added here.

---

## Email funnel (Brevo)

Authoritative formulas + baseline thresholds:
[`docs/email-automation.md`](../email-automation.md) "Funnel measurement
contract" / "Metric definitions" (defined under WP-021). Per-send numbers
are recorded append-only in
[`docs/email-metrics-log.md`](../email-metrics-log.md).

| Metric | Source | Owner | Target / threshold |
|---|---|---|---|
| Signup count | Brevo contacts | Jeff | trend up |
| Confirmation rate (confirmed / signups) | Brevo contacts | Jeff | >70% (fail <50%) |
| Welcome / newsletter open rate (opens / delivered) | Brevo campaign report | Jeff | 20–50% (fail <15%) |
| CTR (clicks / delivered) | Brevo campaign report | Jeff | 2–5% (fail 0%) |
| CTOR (clicks / opens) | Brevo campaign report | Jeff | 5–15% (fail <3%) |
| Delivery rate (delivered / sent) | Brevo campaign report | Jeff | >95% (fail <90%) |
| Unsubscribe rate (unsubs / delivered) | Brevo campaign report | Jeff | <1% (fail >2%) |
| List growth rate ((new − unsubs) / list size) | Brevo contacts | Jeff | trend up |

> Thresholds are **failure-detection ranges**, not success targets (WP-021).
> Apple MPP inflates open rate — CTR/CTOR are the more reliable signals.

## Search demand (Plausible — production-only)

Event schema + contract defined under WP-025
([`docs/ai/work-packets/WP-025-search-demand-signal-instrumentation.md`](../ai/work-packets/WP-025-search-demand-signal-instrumentation.md)).
The `Search` custom event carries `query`, `results_count`, `zero_result`,
`source` (`shortcut`|`click`|`typed`).

| Metric | Source | Owner | Target |
|---|---|---|---|
| Search event volume | Plausible | Jeff | observe (2–4 wk demand window) |
| Zero-result rate (zero_result=true / all searches) | Plausible | Jeff | high zero-rate on rules-intent queries = signal to author rules corpus (feeds engine WP-237) |
| Top queries | Plausible | Jeff | qualitative |
| Pageviews / traffic baseline | Plausible | Jeff | trend up |

> **Status:** not live until the Plausible account is provisioned (WP-025
> operator prereq). Until then, search telemetry = not measurable.

## Site-side conversion

| Metric | Status |
|---|---|
| Conversion rate (visitor → play / buy / waitlist after click) | **NOT YET MEASURABLE.** UTM params already flow on links (WP-020); ingestion lands with Plausible (WP-025). Until then, do **not** report conversion as a number. |

## YouTube

Authoritative list:
[`docs/marketing/youtube-channel-plan.md`](../marketing/youtube-channel-plan.md)
§Metrics / §Success Criteria. At launch, **trend direction matters more than
absolute numbers** (rolling 30-day window).

| Metric | Source | Owner | Target |
|---|---|---|---|
| Avg view duration | YouTube Studio | Jeff | >50% |
| Click-through rate (packaging) | YouTube Studio | Jeff | improving WoW |
| Viewer → first-game conversion | UTM → first-game event | Jeff | trend up (needs game-side event + Plausible) |
| Newsletter signups per video (by `utm_campaign=[slug]`) | Brevo + UTM | Jeff | trend up |
| Welcome-sequence open rate | Brevo | Jeff | >40% |
| Shorts → long-form conversion | YouTube Studio | Jeff | trend up |
| Subscriber → player ratio | cross-source | Jeff | trend up |

## Commerce (Snipcart + Stripe)

| Metric | Source | Owner | Target |
|---|---|---|---|
| Orders | Snipcart / Stripe | Jeff | `[CONFIRM]` |
| Average order value (AOV) | Snipcart / Stripe | Jeff | `[CONFIRM]` |
| Revenue | Stripe | Jeff | `[CONFIRM]` |
| Diorama waitlist size | Brevo / form store | Jeff | trend up |
| Waitlist → purchase conversion | Snipcart + waitlist | Jeff | `[CONFIRM]` (needs Plausible attribution) |
| Gross margin per kit | cost model | Jeff | `[CONFIRM]` — no documented cost/margin model yet ([`03-open-questions.md`](03-open-questions.md)) |

---

**Owner note:** "Jeff" is the owner of every line today (solo operator). As
the team grows, reassign explicitly — an unowned KPI is an unmeasured KPI.
