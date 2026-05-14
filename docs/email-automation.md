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
1. Updating this document (`docs/email-automation.md`)
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
6. Record QA results in `docs/newsletter-drafts/qa-log.md`

### Campaign naming convention

    Newsletter -- <newsletter_slug>

Example: `Newsletter -- week-01-deck-checklist`

The `<newsletter_slug>` must match the blog post slug and UTM
`utm_campaign` value (slug coupling invariant).

### Template version pinning

The Brevo template must match `docs/newsletter-template.md` v2
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
3. QA log entry recorded in `docs/newsletter-drafts/qa-log.md`

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
