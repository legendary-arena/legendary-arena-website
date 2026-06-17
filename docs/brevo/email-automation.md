# Email Engagement Pipeline

**Status:** v1 (WP-018, 2026-05-13)
**Last updated:** 2026-05-13

## Pipeline overview

Signup -> Confirm (double opt-in) -> Welcome -> Weekly cadence
-> Conversion (play / shop / tournament)

The engagement pipeline converts site visitors into active players
through a structured email sequence. Each stage has a defined trigger,
a measurable metric, and a target outcome. The pipeline is deliberately
linear: no branching, no segmentation, no conditional logic. Complexity
is deferred until subscriber volume warrants it.

## Brevo configuration

- **Account:** Brevo (Legendary Arena)
- **Sender:** Legendary Arena <newsletter@legendary-arena.com>
- **List ID:** `<BREVO_LIST_ID>` (stored in CF Pages env)
- **Template ID:** `<TEMPLATE_ID>` (Brevo weekly newsletter template, v2 10-section structure)
- **Welcome workflow ID:** `<WORKFLOW_ID>` (welcome automation)
- **Domain authentication:** SPF + DKIM + DMARC verified for legendary-arena.com

### API integration

The CF Pages Function at `functions/api/subscribe.js` adds contacts to
Brevo via `POST https://api.brevo.com/v3/contacts` with:

- `listIds: [<BREVO_LIST_ID>]`
- `updateEnabled: true`
- No `doubleOptIn` flag in the API call body; double opt-in is
  configured at the Brevo list level

The API key (`BREVO_API_KEY`) lives in CF Pages environment variables
only. It must never appear in committed code, email content, or
client-side assets.

## Funnel stages

| Stage | Trigger | Metric | Target |
|---|---|---|---|
| Capture | Visitor submits signup form | Signup rate | Track via form submissions |
| Confirm | Brevo sends double opt-in email | Confirmation rate | >70% of signups confirm |
| Activate | Welcome email sends on confirmation | Open rate | >50% open rate |
| Engage | Weekly newsletter broadcast | Click-through rate | >5% CTR |
| Convert | CTA click -> play.*/shop/tournament | Conversion rate | Track via UTM params |
| Retain | Continued engagement over time | Churn rate | <5% monthly unsubscribe |

## CTA hierarchy (per WP-020)

Primary CTA (one per email, from `cta` front-matter value):

- Rotation per 4-week batch: 2x `play`, 1x `newsletter`, 1x `tournament`
- Welcome email primary CTA is always "Play now" -> `https://play.legendary-arena.com/`
- Primary CTA appears as a button (`#7a1d1f` background, white text)

Secondary CTAs (always present, never dominant):

- **Shop** -- exactly 1 link to `/shop/` per edition, UTM-tagged. Text link, not button.
- **Share/Forward** -- exactly 1 share prompt per newsletter, pointing to companion blog post canonical URL
- **Read more** -- exactly 1 link to companion blog post per newsletter

Maximum deep-links per email body: 4 (Read more + CTA + Shop + Share).
Footer links (social, unsubscribe) are not counted toward this limit.

### UTM conventions

Newsletter shop links:

    https://www.legendary-arena.com/shop/?utm_source=newsletter&utm_medium=email&utm_campaign=<newsletter_slug>&utm_content=featured-product

Welcome email shop link:

    https://www.legendary-arena.com/shop/?utm_source=newsletter&utm_medium=email&utm_campaign=welcome&utm_content=featured-product

Parameters:

- `utm_source` -- origin surface: `newsletter`
- `utm_medium` -- delivery channel: `email`
- `utm_campaign` -- edition identifier: the `newsletter_slug` value (or `welcome` for the welcome email)
- `utm_content` -- link purpose: `featured-product` (fixed)

Slug coupling invariant: `newsletter_slug`, blog post slug, and UTM
`utm_campaign` value must be identical strings.

## Welcome email

### Content

- **Subject:** Welcome to Legendary Arena
- **Header:** LA logo linking to `https://www.legendary-arena.com/`
- **Welcome message:** 2-3 paragraphs acknowledging the subscription,
  setting expectations (weekly strategy tips, deck-building guides,
  tournament news), and linking to the week 1 blog post
  (`/posts/week-01-deck-checklist/`)
- **CTA:** "Play now" -> `https://play.legendary-arena.com/`
- **Featured from the Shop:** single product spotlight with UTM link
- **Footer:** unsubscribe link, org identity

### Welcome CTA invariant

The welcome email primary CTA is always "Play now" linking to
`https://play.legendary-arena.com/`. No rotation, no variation. This
ensures consistent first-session activation regardless of when the
subscriber joins.

### Automation workflow

- **Trigger:** "A contact is added to a list" -> newsletter list (`<BREVO_LIST_ID>`)
- **Action:** Send welcome email (immediately, no delay)
- **Structure:** Exactly 1 trigger, 1 action. No branching, no delays, no additional actions.
- **Status:** Active

### Automation invariants

- **Determinism:** 1 trigger + 1 action. No modifications without a new WP.
- **Workflow identity lock:** Exactly 1 active welcome workflow. No duplicates, no disabled legacy workflows.
- **List coupling:** Workflow bound to `<BREVO_LIST_ID>` only. No additional lists without a governing WP.
- **Trigger constraint:** "Contact added to list" only. Prohibited triggers: "Contact updated", "Tag added", "Event triggered".

### Duplicate send prevention

Brevo's automation workflow fires once per contact per workflow entry.
If a contact unsubscribes and later re-subscribes (triggering a new
list addition), Brevo may re-trigger the welcome workflow. Observed
behavior should be documented here after testing:

- **Observed re-trigger behavior:** `<document after Step 5 testing>`
- **Mitigation (if needed):** `<document if Brevo cannot enforce single-send natively>`

### Mutability constraint

The welcome email template must not be modified after activation without:
1. Updating this document (`docs/brevo/email-automation.md`)
2. Re-running the pipeline test (Step 5 procedure below)

## Weekly send procedure

Weekly newsletters are manual broadcasts (Brevo Campaigns), not
automated drip sequences. This is intentional -- each edition has
unique content and must pass pre-send QA before every send.

### Procedure

1. Content author creates the newsletter edition draft per WP-017
   requirements (including secondary modules: Shop + Share)
2. Content author transfers draft content to the Brevo template
   (template ID: `<TEMPLATE_ID>`)
3. Execute pre-send QA checklist (8 items, see below)
4. Execute funnel integrity check (5 sub-checks, see below)
5. Create Brevo Campaign:
   - Campaign name: `Newsletter -- <newsletter_slug>`
   - Select template, select list, set subject line
   - Schedule or send immediately
6. Record QA results in `docs/brevo/newsletter-drafts/qa-log.md`

### Campaign naming convention

    Newsletter -- <newsletter_slug>

Example: `Newsletter -- week-01-deck-checklist`

The `<newsletter_slug>` must match the blog post slug and UTM
`utm_campaign` value (slug coupling invariant).

### Template version pinning

The Brevo template must match `docs/brevo/newsletter-template.md` v2
(WP-020, 10-section structure). If the template spec is updated in a
future WP, the Brevo template must be updated to match before the next
send. Document any template version change here.

Current template version: v2 (WP-020, 2026-05-13)

### Recommended schedule

- Day: Tuesday or Wednesday
- Time: 10:00 AM ET
- Frequency: Weekly, aligned with WP-017 content cadence

### Pre-send QA checklist

No email may be sent to a production audience without passing all items:

- [ ] Test send to developer inbox (Gmail) and at least one alternate
  client (Outlook or Apple Mail)
- [ ] All URLs resolve: blog link (`/posts/<slug>/`), CTA target
  (`play.*`), shop link (`/shop/`), unsubscribe
- [ ] All images load, alt text present, email comprehensible with
  images blocked
- [ ] Layout verified on desktop and mobile (Brevo preview + real inbox)
- [ ] Personalization preview: fallback values render correctly
- [ ] Funnel validation: click through email -> blog post -> CTA block
  -> target. Each hop resolves.
- [ ] Deliverability: test email lands in inbox (not spam). Sender
  identity matches expected "from" address.
- [ ] Subject line aligns with email content (no mismatch)

### Funnel integrity check (pre-send)

From a Brevo test email sent to a real inbox (not Brevo preview mode):

- [ ] Read more link resolves to correct blog post
- [ ] Blog CTA button navigates to target (play.*/newsletter/tournament)
- [ ] Newsletter shop link resolves to `/shop/` with UTM params in URL bar
- [ ] Blog shop link resolves to `/shop/` with UTM params
- [ ] Share link resolves to blog post canonical URL

All items must pass. Failed items are blockers.

### Send readiness gate

A newsletter may not be sent unless:

1. Pre-send QA checklist passes (all 8 items)
2. Funnel integrity check passes (all 5 items)
3. QA log entry recorded in `docs/brevo/newsletter-drafts/qa-log.md`

Failure to satisfy all conditions blocks send.

## Subscriber states

| State | Definition | Transition trigger |
|---|---|---|
| Pending | Submitted form, not confirmed | Form submission |
| Confirmed | Double opt-in complete | Clicked confirmation link |
| Welcomed | Received welcome email | Welcome automation fires |
| Active | Receiving weekly broadcasts | First broadcast sent |
| Unsubscribed | Opted out | Clicked unsubscribe link |

State transitions are linear and irreversible (except Unsubscribed ->
Pending via a new opt-in submission).

### Unsubscribe invariant

Unsubscribed contacts must not receive further emails. Re-entry requires
a new opt-in submission (form submit -> double opt-in). Manual
re-addition without opt-in is prohibited.

Unsubscribe is handled by Brevo's native `{{ unsubscribe }}` placeholder.

## Metrics

Metrics are measured using:

- **Brevo analytics dashboard** -- opens, clicks, bounces, unsubscribes
  per campaign and per automation
- **UTM tracking on site** -- conversion events (play, shop, tournament)
  via UTM-tagged links in emails. Attribution visible in site analytics
  by filtering on `utm_source=newsletter` and `utm_medium=email`.

No additional analytics tooling is configured in WP-018 scope. Future
WPs may connect Brevo campaign metrics to a centralized dashboard.

## Operational snapshot (at WP completion)

- Date configured: 2026-05-13
- Template ID: `<TEMPLATE_ID>`
- Welcome workflow ID: `<WORKFLOW_ID>`
- List ID: `<BREVO_LIST_ID>`
- Sender: Legendary Arena <newsletter@legendary-arena.com>
- Sender domain: legendary-arena.com (SPF + DKIM + DMARC verified)
- Welcome flow status: active
- Template version: v2 (WP-020)

This snapshot anchors the configuration state. Update when Brevo
configuration changes.

## Compliance

- **Double opt-in:** enforced at the Brevo list level. The subscribe
  function (`functions/api/subscribe.js`) adds contacts; Brevo handles
  the confirmation email flow.
- **Unsubscribe:** Brevo-native `{{ unsubscribe }}` placeholder in
  every email footer. Re-entry requires new opt-in.
- **CAN-SPAM:** organizational identity in footer of every email.
- **SPF/DKIM/DMARC:** domain authentication verified for
  legendary-arena.com.
- **API key security:** `BREVO_API_KEY` stored in CF Pages environment
  variables only. Never committed to the repository.
- **Test isolation:** all test sends use controlled test addresses only.
  Production list does not receive sends until WP completion and all
  verification checks pass.

## Brand voice compliance

All email copy (welcome and weekly) must follow the brand voice defined
in `docs/brand/strategy.md`:

- Direct, confident, heroic tone
- No emoji in any email copy
- No exclamation marks in brand copy
- No hedging verbs: `get`, `try`, `enjoy`, `perhaps`, `maybe`
- Verb palette: `assemble`, `build`, `recruit`, `fight`, `master`,
  `defeat`, `earn`, `become`
- CTA contract: 2 words max, single verb, maps to user action

## Email design constraints

- Background: `#fdfcf8` (light-mode bg-primary)
- Text: `#1a1d2e` (light-mode text-primary)
- Secondary text: `#4a5168` (light-mode text-secondary)
- Primary CTA button: `#7a1d1f` background, white text (10.4:1 contrast, AAA)
- Link color: `#1d4ed8` (light-mode blue-bright)
- Font: system stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`)
- Max content width: 600px
- Mobile: single-column on viewports < 480px
- HTML size: < 100KB (Gmail clips at ~102KB)
- Plain-text fallback: required, includes CTA link + unsubscribe link
- All images: alt text required, email comprehensible with images blocked
- Logo: PNG (not SVG), max 200px wide

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
  `docs/brevo/newsletter-template.md` §6 (WP-020 authority). Only this
  link is counted for CTA click rate.
- **Conversion rate** — NOT YET MEASURABLE. Requires a site-side
  analytics platform (Cloudflare Web Analytics, Plausible, or
  equivalent). UTM parameters are present in links; ingestion is
  deferred to a future WP.

### Retain

- **Unsubscribe rate** — unsubscribes / delivered
- **List growth rate** — (new subscribers - unsubscribes) / list size

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

## Planned enhancements (deferred until volume)

The pipeline overview commits to a deliberately linear v1: no
branching, no segmentation, no drip. The enhancements below are
recorded so the design thinking is not lost — they are **not approved
work**. Each names a concrete *build trigger* (the condition that
justifies the added complexity), and each requires its own governing
WP before implementation, per the automation invariants above.
Building any of them ahead of its trigger is premature optimization
and is out of scope until the trigger is met.

Volume context: as of this writing the Brevo IDs are still placeholders
(`<BREVO_LIST_ID>`, `<TEMPLATE_ID>`, `<WORKFLOW_ID>`) and the dashboard
setup is incomplete. The first priority is launching v1 and capturing
confirmed subscribers — not stacking automation on an empty list.

### 1. Welcome drip (v2 of the welcome email)

Replace the single immediate welcome email with a short 3–4 email
onboarding sequence over 10–14 days, bridging "signed up" to "first
game played":

- **Email 1 (immediate)** — current welcome. Set expectations,
  "Play now" CTA. (Already live in v1.)
- **Email 2 (day 2–3)** — first-game onboarding: a strong starter
  scenario plus a direct play link. Companion to the how-to-play
  content.
- **Email 3 (day 5–7)** — one strategy tip from the deck-building
  content plus a specific challenge. Reinforce "every result is
  provable."
- **Email 4 (day 10–14)** — social proof / community teaser plus a
  return hook.

The trigger stays "contact added to list" (post-confirmation);
subsequent emails use Brevo workflow delays. This replaces the
1-trigger/1-action automation invariant with a documented multi-step
workflow — which is exactly why it needs its own WP, not a silent
template edit.

**Build trigger:** the v1 welcome email has a stable open/click
baseline (≥4 weeks of sends, per Baseline thresholds) AND the confirmed
list is large enough that drip tuning is measurable (≥ ~200 confirmed
contacts). Until then, a single deterministic welcome email is the
correct design.

### 2. Source / topic segmentation

v1 sends one list, one generic weekly broadcast. Future segmentation
would route signups by origin (homepage vs. footer vs. a specific
video) and by interest, so e.g. fairness-driven signups receive more of
that content.

**Forward hedge (shipped, WP-245):** signup source is captured at
submission time (see "Signup source capture" below) so the provenance
data exists when segmentation is built — but it is **not acted upon** in
v1. No segmented sends, no conditional logic.

**Build trigger:** ≥2 meaningfully distinct, sufficiently large source
cohorts exist in the captured data, AND weekly send volume is high
enough that a generic broadcast is measurably underperforming a
segmented one. Segmentation on a small undifferentiated list adds
operational cost with no return.

### 3. Re-engagement / win-back

A flow for subscribers who go inactive (no opens or clicks for ~30
days): a re-engagement campaign with a strong hook and a direct play
link, then a sunset step for non-responders to protect deliverability.

**Build trigger:** a 30-day-inactive cohort exists at a size worth
recovering — you cannot win back subscribers you do not yet have. Also
requires the Funnel measurement contract metrics to be flowing.

### 4. Closed-loop conversion metrics

The Funnel measurement contract above already defines every Brevo-side
metric and explicitly flags **conversion rate as NOT YET MEASURABLE**
(it needs a site-side analytics platform; UTM params are present,
ingestion is deferred). Closing the loop:

- Stand up the deferred site-analytics ingestion (Cloudflare Web
  Analytics / Plausible) so UTM-tagged email clicks resolve to play
  starts. This is the already-scoped follow-up WP.
- Add Brevo conversion-tracking goals for key URLs
  (`https://play.legendary-arena.com/`) once analytics is live.
- Primary KPI to watch: **email-driven first-game starts**.

**Build trigger:** the site-analytics ingestion WP lands. The Brevo
goals are a thin add on top of it.

### Signup source capture (forward hedge — shipped, WP-245)

To keep the segmentation option open without acting on it, the signup
path captures where each contact came from (shipped under WP-245):

- The newsletter form (`layouts/_partials/newsletter-form.html`) emits
  a `source` value — its render location (`cta`, `footer`,
  `diorama-waitlist`, …).
- `assets/js/newsletter.js` forwards `source` in the subscribe request.
- `functions/api/subscribe.js` stores it on the Brevo contact as the
  `SIGNUP_SOURCE` attribute — **best-effort**: if the attribute is not
  yet provisioned in Brevo, the create is retried without it so the
  subscription still succeeds. Source capture is best-effort; lead
  capture never breaks.

**Brevo prerequisite:** create a text
contact attribute named `SIGNUP_SOURCE` in the Brevo dashboard. Until
it exists, source values are silently dropped (by design) and only the
email is stored.
