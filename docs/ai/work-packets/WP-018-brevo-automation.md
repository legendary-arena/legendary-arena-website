# WP-018 — Email engagement workflow (Brevo automation)

Configure the Brevo-side automation workflow and document the full
visitor engagement pipeline: signup -> confirm -> welcome -> weekly
cadence -> conversion. This is system architecture work, not marketing
collateral. No Hugo code changes — the entire WP executes inside
Brevo's dashboard and produces documentation artifacts in `docs/`.

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
   The **Financial Sustainability** section ("No margin, no mission")
   establishes that the newsletter pipeline is part of the
   revenue-sustaining engagement loop. The engagement workflow is the
   engine that moves subscribers from capture to conversion.
2. `docs/03-ROADMAP.md` — full WP list. WP-018 depends on WP-015
   (newsletter infrastructure). It runs in parallel with WP-016/017
   — it configures the Brevo-side engagement workflow, not the Hugo
   content layer.
3. `docs/newsletter-template.md` — email template structural spec
   (WP-016, updated to v2 by WP-020). This WP consumes the template
   spec for welcome email design and weekly cadence configuration.
   The v2 spec defines a 10-section structure including secondary
   modules (Shop, Share/Forward).
4. `docs/brand/strategy.md` — brand voice, terminology, CTA styling
   constraints. **Section 2 (Tone and voice)** governs all email
   copy: direct, confident, heroic. No emoji, no exclamation marks,
   no hedging verbs.
5. `docs/brand/palette.md` — visual identity for Brevo template
   design. All colors via `var(--la-*)` token hex equivalents (Brevo
   templates use inline CSS, not CSS custom properties).
6. `functions/api/subscribe.js` — WP-015 CF Pages Function. The
   subscribe function adds contacts to a Brevo list with
   `doubleOptIn: true`. This WP configures what happens AFTER the
   contact confirms and joins the list.
7. `docs/ai/work-packets/WP-017-content-pipeline.md` — content
   pipeline spec. The weekly newsletter cadence configured in this
   WP sends the editions produced by WP-017.
8. `docs/ai/work-packets/WP-020-funnel-enrichment.md` — funnel
   hierarchy and secondary CTA discipline. The welcome email and
   weekly sends must respect the CTA hierarchy defined here.

## Current state

Locked under WP-001 -> WP-019:

- Newsletter signup form live on the site (WP-015).
- `functions/api/subscribe.js` adds contacts to Brevo with
  `doubleOptIn: true` (WP-015). Brevo sends a confirmation email
  automatically on double opt-in — this is Brevo-native behavior
  configured during WP-015, not in-repo code.
- Newsletter template spec at `docs/newsletter-template.md` defines
  v2 10-section structure (WP-016 + WP-020).
- Blog content pipeline specced with 12-week taxonomy (WP-017).
- Blog posts for weeks 1-4 live at `/posts/` (WP-017).
- Newsletter drafts for weeks 1-4 in `docs/newsletter-drafts/`
  (WP-017).
- Snipcart shop live at `/shop/` (WP-019).
- Funnel hierarchy documented: primary CTA rotation (2x play, 1x
  newsletter, 1x tournament per batch), secondary CTAs (shop, share)
  with hard caps (WP-020).

**What Brevo has now (configured in WP-015):**

- Contact list exists (ID stored in CF Pages env as `BREVO_LIST_ID`)
- Double opt-in enabled — new contacts receive a Brevo-native
  confirmation email before being added to the list
- API key stored in CF Pages env as `BREVO_API_KEY`
- No automation workflows configured
- No welcome email configured
- No sender domain authentication (SPF/DKIM/DMARC)
- No branded email template in Brevo's template editor

What's pending — **your job**:

- [] Brevo domain authentication (SPF/DKIM/DMARC) for
  `legendary-arena.com`
- [] Welcome email automation workflow
- [] Branded email template in Brevo matching the v2 spec
- [] Weekly newsletter broadcast workflow (manual or automated)
- [] Funnel architecture documentation
- [] Test the full pipeline with a test contact

## Prerequisites (manual — not automatable)

Before starting the implementation steps, the site owner must:

1. **Brevo domain authentication** — configure SPF, DKIM, and DMARC
   for `legendary-arena.com` in Brevo > Settings > Senders & IPs >
   Domains.

   **SPF:** Add a TXT record to the `legendary-arena.com` DNS zone
   (Cloudflare) that includes Brevo's SPF mechanism. The zone
   already has an SPF record for Namecheap email forwarding
   (`v=spf1 include:spf.efwd.registrar-servers.com ~all`). Amend it
   to include both:

   ```
   v=spf1 include:spf.efwd.registrar-servers.com include:sendinblue.com ~all
   ```

   Do NOT create a second SPF TXT record — multiple SPF records on
   the same domain cause authentication failures. Merge into one.

   **DKIM:** Add the DKIM TXT record that Brevo provides in the
   domain authentication flow. This is a unique key generated per
   account. Record name is typically
   `<selector>._domainkey.legendary-arena.com`.

   **DMARC:** If no DMARC record exists, add a basic policy:

   ```
   _dmarc.legendary-arena.com TXT "v=DMARC1; p=none; rua=mailto:jeff@barefootbetters.com"
   ```

   `p=none` starts in monitoring mode. Tighten to `p=quarantine` or
   `p=reject` after verifying deliverability over 2-4 weeks.

   **Verification:** After DNS records propagate (allow up to 48h,
   typically <1h on Cloudflare), verify in Brevo > Settings >
   Senders & IPs > Domains. All three indicators (SPF, DKIM, DMARC)
   must show green/verified.

2. **Sender identity** — configure a verified sender in Brevo >
   Settings > Senders & IPs > Senders. Use:
   - From name: `Legendary Arena`
   - From email: a dedicated sending address on the
     `legendary-arena.com` domain (e.g.,
     `arena@legendary-arena.com` or
     `newsletter@legendary-arena.com`)
   - Reply-to: the same address or the site owner's address

   The sender must be verified (Brevo sends a confirmation email to
   the address). If using a new address, configure email forwarding
   in Cloudflare or the domain registrar first.

## Task

### Step 1 — Verify domain authentication

Confirm all three authentication mechanisms are active in Brevo:

- [ ] SPF record includes `include:sendinblue.com`
- [ ] DKIM record present and verified in Brevo dashboard
- [ ] DMARC record present (at minimum `p=none`)
- [ ] Brevo domain status shows all three green/verified
- [ ] Verified sender identity configured with
  `@legendary-arena.com` address

If any check fails, complete the relevant prerequisite before
proceeding. Domain authentication is a hard prerequisite — sending
without it risks spam classification and damages sender reputation.

### Step 2 — Create the branded email template in Brevo

In Brevo > Campaigns > Templates, create a reusable email template
that implements the v2 newsletter template spec
(`docs/newsletter-template.md`). The template is the Brevo-side
rendering of the spec — it defines the visual layout, not the
content (content is per-edition).

**Template structure (10 sections per v2 spec):**

1. **Header** — Legendary Arena wordmark/logo linking to
   `https://www.legendary-arena.com/`. Use the logo SVG from
   `static/brand/logo/logo-la-dark-400x200.svg` (convert to PNG
   for email compatibility — SVG support is inconsistent across
   email clients). Center-aligned, max-width 200px.

2. **Hook** — editable text block. 1-2 sentences. Placeholder:
   `[Hook: 1-2 sentence teaser]`

3. **Tip / Strategy** — editable text block. 2-3 paragraphs.
   Placeholder: `[Tip: main value content]`

4. **Challenge** — editable text block with a subtle background
   accent. Placeholder: `[Challenge: weekly in-game challenge]`

5. **Read more** — single link button. Placeholder URL:
   `https://www.legendary-arena.com/posts/SLUG/`. Button text:
   "Read the full post". Secondary styling (not primary CTA
   weight).

6. **CTA** — primary action button. Editable URL and text. Default
   button text: "Play now". Primary styling: background color
   matching `--la-color-cta` hex equivalent, white text, bold.
   This is the ONE primary CTA per email.

7. **Featured from the Shop** — compact product spotlight block.
   Editable product name, one-line description, and link.
   Placeholder URL: `https://www.legendary-arena.com/shop/`.
   Secondary styling — must be visually subordinate to the
   primary CTA (6). Text link, not a button.

8. **Share / Forward** — single line of text with an editable link.
   Default copy: "Know someone who'd find this useful? Forward
   this email or share the post:" + link to blog post. Text
   styling, not button.

9. **Footer** — unsubscribe link using Brevo's `{{ unsubscribe }}`
   placeholder. Organizational identity: "You're receiving this
   because you signed up at legendary-arena.com." Physical address
   or organization name (CAN-SPAM). Social links placeholder.

**Visual design constraints:**

- Background: white (`#ffffff`) or near-white matching
  `--la-color-bg-primary` light-mode hex
- Text color: dark matching `--la-color-text-primary` light-mode hex
- Primary CTA button: `--la-color-cta` hex background, white text
- Link color: `--la-color-blue-bright` hex
- Font: system font stack (`-apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`).
  Do NOT use Google Fonts in email — web font loading is unreliable
  across email clients.
- Max content width: 600px (email standard)
- Mobile-responsive: single-column layout on viewports < 480px
- All images must include `alt` text
- Email must remain comprehensible with images blocked

**Email size constraint:**

- Total email HTML size should remain <100KB
- Avoid large inline images — prefer text + single logo image
- Exceeding this risks clipping (notably Gmail, which clips at ~102KB)

**Plain text fallback:**

Brevo template must include a plain-text version. The plain-text
version must:
- Include the primary CTA link
- Include the unsubscribe link

Plain text fallback is critical for deliverability scoring and
accessibility.

**Record the Brevo template ID** in `docs/email-automation.md` (Step
6) once created. The template ID is needed for automation workflow
configuration and API-based sends.

### Step 3 — Create the welcome email

Create a welcome email in Brevo that sends immediately when a new
contact is added to the list (after double opt-in confirmation).

**Welcome email content:**

Subject: `Welcome to Legendary Arena`

Body structure (subset of the full template — welcome emails are
shorter):

1. **Header** — same as weekly template
2. **Welcome message** — 2-3 paragraphs:
   - Acknowledge the subscription
   - Set expectations: what they'll receive (weekly strategy tips,
     deck-building guides, tournament news)
   - Deliver immediate value: link to the most recent blog post
     or the best "start here" post (week 1:
     `/posts/week-01-deck-checklist/`)
3. **CTA** — "Play now" linking to
   `https://play.legendary-arena.com/`. The welcome email's
   primary CTA is always `play` — driving first engagement with
   the game.
4. **Featured from the Shop** — single product spotlight with
   UTM link:
   `https://www.legendary-arena.com/shop/?utm_source=newsletter&utm_medium=email&utm_campaign=welcome&utm_content=featured-product`
5. **Footer** — same as weekly template

**Voice/tone:**

- Direct, confident, heroic. Brand lexicon: `assemble`, `build`,
  `recruit`, `fight`, `master`, `defeat`, `earn`, `become`.
- No emoji. No exclamation marks. No hedging verbs (`get`, `try`,
  `enjoy`, `perhaps`, `maybe`).
- The welcome email is the subscriber's first branded touchpoint
  after the transactional double-opt-in confirmation. It must feel
  intentional, not automated.

**Welcome CTA invariant:**

The welcome email MUST:
- Use `play` as the primary CTA
- Not vary based on content pipeline rotation
- Not include alternative primary CTAs

This ensures consistent first-session activation regardless of which
week the subscriber joins.

**UTM contract alignment:**

All shop links in the welcome email must follow WP-020 UTM conventions
exactly:
- `utm_source=newsletter`
- `utm_medium=email`
- `utm_campaign=welcome`
- `utm_content=featured-product`

Any deviation is a tracking failure.

**Automation trigger:**

In Brevo > Automation > Create a workflow:
- Trigger: "A contact is added to a list" -> select the newsletter
  list (the list ID from WP-015's `BREVO_LIST_ID`)
- Action: Send email -> select the welcome email
- Timing: Immediately (no delay)
- Status: Active

**Automation determinism invariant:**

The welcome workflow must:
- Contain exactly 1 trigger (contact added to list)
- Contain exactly 1 action (send welcome email)
- Contain no branching, delays, or additional actions

Any modification to this structure requires a new WP.

**Workflow identity lock:**

There must be exactly one active welcome workflow associated with
the newsletter list.

- No duplicate workflows targeting the same trigger condition
- No disabled legacy workflows left in Brevo

Multiple workflows on the same trigger are a failure condition.

**List coupling invariant:**

The welcome workflow MUST be bound to the exact list ID defined by
`BREVO_LIST_ID`. No additional lists may trigger the welcome
workflow without a governing WP.

**Trigger definition constraint:**

Workflow trigger must be:

"A contact is added to the list"

The following triggers are prohibited:
- "Contact updated"
- "Tag added"
- "Event triggered"

These introduce non-deterministic behavior.

**Welcome email mutability constraint:**

The welcome email template must not be modified after activation
without:
- Updating `docs/email-automation.md`
- Re-running Step 5 pipeline test

Any change to content, structure, or links requires re-validation.

**Duplicate send prevention:**

The workflow must ensure contacts do NOT receive the welcome email
more than once. If Brevo re-triggers on list re-addition (e.g., an
unsubscribed contact re-subscribes), document the observed behavior
in `docs/email-automation.md`. If Brevo cannot enforce single-send
natively, document this limitation and add a manual check to the
send procedure.

### Step 4 — Configure weekly newsletter broadcast workflow

The weekly newsletter is a **manual broadcast** (Brevo Campaign),
not a fully automated drip sequence. This is intentional:

- Each weekly edition has unique content (WP-017 produces per-week
  drafts)
- Content must pass the pre-send QA checklist before each send
  (`docs/newsletter-template.md` > Pre-send QA checklist)
- The funnel integrity check (WP-020 amendment to WP-017) requires
  manual verification from a real inbox before production send
- Automated drip would bypass these quality gates

**Broadcast vs automation constraint:**

Weekly newsletters MUST remain manual broadcasts. Automated drip
sequences are explicitly prohibited in WP-018 scope because they
bypass:
- Pre-send QA
- Funnel integrity checks

Any automation of weekly sends requires a new governing WP.

**Send readiness gate:**

A newsletter may not be sent unless:
- Pre-send QA checklist passes
- Funnel integrity check passes
- QA log entry is recorded in `docs/newsletter-drafts/qa-log.md`

Failure to satisfy all conditions blocks send.

**Test isolation requirement:**

All test sends (Step 5) must be:
- Sent to a controlled test address only
- Not sent to the full production list

The production list must not receive any sends until WP completion
and all verification checks pass.

**Campaign naming convention:**

Weekly campaigns in Brevo must follow:

`Newsletter — <newsletter_slug>`

Example: `Newsletter — week-01-deck-checklist`

This ensures consistency across Brevo analytics, QA logs, and UTM
`utm_campaign` values. The `<newsletter_slug>` must match the blog
post slug and `utm_campaign` value (slug coupling invariant from
WP-020).

**Template version pinning:**

The Brevo template used for campaigns must match:

`docs/newsletter-template.md` v2 (WP-020)

If the template spec is updated in a future WP, the Brevo template
must be updated to match before the next send. Document any
template version change in `docs/email-automation.md`.

**Weekly send workflow:**

1. Content author creates the newsletter edition draft per WP-017
   Step 7 requirements (including secondary modules: Shop + Share)
2. Content author transfers draft content to the Brevo template
   (created in Step 2)
3. Pre-send QA checklist executed (8 items from
   `docs/newsletter-template.md` + 5 funnel integrity checks from
   WP-020)
4. Brevo Campaign created: select template, select list, set
   subject line, schedule or send immediately
5. Post-send: record QA results in
   `docs/newsletter-drafts/qa-log.md` per WP-020 format

**Recommended send schedule:**

- Day: Tuesday or Wednesday (optimal open rates for B2C newsletters)
- Time: 10:00 AM ET (covers US morning + EU afternoon)
- Frequency: Weekly, aligned with WP-017's content cadence

**Segmentation (future — not in scope):**

Brevo supports list segmentation (by engagement, by tags, by custom
attributes). This WP configures a single-list broadcast. Segmentation
is a follow-on effort when the subscriber base warrants it (100+
contacts as a rough threshold).

### Step 5 — Test the full pipeline

Execute an end-to-end test with a test contact (use a personal email
address not already on the list):

**5a. Signup flow:**

1. Navigate to `https://www.legendary-arena.com/`
2. Enter the test email in the newsletter signup form (footer)
3. Submit the form
4. Verify: CF Pages Function returns success
5. Verify: Brevo sends a double opt-in confirmation email
6. Click the confirmation link in the email
7. Verify: contact appears in the Brevo list

**5b. Welcome email:**

8. Verify: welcome email arrives within 5 minutes of confirmation
9. Verify: welcome email renders correctly (images, layout, links)
10. Click all links in the welcome email:
    - Blog post link resolves
    - "Play now" CTA resolves to `play.legendary-arena.com`
    - Shop link resolves to `/shop/` with UTM params
    - Unsubscribe link works
11. Verify: welcome email lands in Primary inbox or Promotions tab
    (acceptable) — not Spam. Spam placement is a failure.

**5c. Weekly broadcast (dry run):**

12. Create a test campaign in Brevo using the branded template
13. Send to a test segment (just the test contact)
14. Verify: email arrives, renders correctly
15. Execute the full pre-send QA checklist
16. Execute the full funnel integrity check (5 sub-checks from
    WP-020)

**5d. Unsubscribe flow:**

17. Click the unsubscribe link in any test email
18. Verify: Brevo processes the unsubscribe
19. Verify: contact is removed from the list (or marked
    unsubscribed, per Brevo's handling)
20. Verify: no further emails are sent to the unsubscribed contact

**5e. UTM validation:**

21. Verify UTM parameters present and correct in:
    - Welcome email shop link (`utm_campaign=welcome`)
    - Test campaign shop link (`utm_campaign=<newsletter_slug>`)
22. Navigate to the shop link from each email and confirm UTM params
    appear in the browser URL bar

**5f. Delivery health check:**

23. Check Brevo dashboard for:
    - Bounce status (must be none for test contact)
    - Delivery status (must be "delivered" for all test sends)
24. Confirm inbox placement:
    - Acceptable: Primary inbox, Promotions tab
    - Unacceptable: Spam, missing delivery

Record all test results. Any failure is a blocker — fix and re-test
before marking the WP complete.

### Step 6 — Document the funnel architecture

Create `docs/email-automation.md` documenting the full engagement
pipeline. This is the operational reference for anyone managing the
newsletter going forward.

**Document structure:**

```markdown
# Email Engagement Pipeline

**Status:** v1 (WP-018, YYYY-MM-DD)
**Last updated:** YYYY-MM-DD

## Pipeline overview

Signup -> Confirm (double opt-in) -> Welcome -> Weekly cadence
-> Conversion (play / shop / tournament)

## Brevo configuration

- **Account:** <Brevo account identifier>
- **Sender:** Legendary Arena <address@legendary-arena.com>
- **List ID:** <from BREVO_LIST_ID env var>
- **Template ID:** <from Step 2>
- **Welcome workflow ID:** <from Step 3>
- **Domain authentication:** SPF + DKIM + DMARC verified

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

- Primary CTA: 1 per email (play/newsletter/tournament, per
  front-matter `cta` value)
- Secondary: 1 shop link (UTM-tagged), 1 share link, 1 read-more
- Maximum 4 deep-links per email body
- Welcome email primary CTA is always "play"

## Weekly send procedure

1. Draft content per WP-017 requirements
2. Transfer to Brevo template
3. Execute pre-send QA (docs/newsletter-template.md)
4. Execute funnel integrity check (WP-020)
5. Create Brevo Campaign, schedule send
6. Record QA results in docs/newsletter-drafts/qa-log.md

## Subscriber states

| State | Definition | Transition trigger |
|---|---|---|
| Pending | Submitted form, not confirmed | Form submission |
| Confirmed | Double opt-in complete | Clicked confirmation link |
| Welcomed | Received welcome email | Welcome automation fires |
| Active | Receiving weekly broadcasts | First broadcast sent |
| Unsubscribed | Opted out | Clicked unsubscribe link |

State transitions are linear and irreversible (except
Unsubscribed -> Pending via a new opt-in submission).

**Unsubscribe invariant:** Unsubscribed contacts must not receive
further emails. Re-entry requires a new opt-in submission (form
submit -> double opt-in). Manual re-addition without opt-in is
prohibited.

## Metrics

Metrics are measured using:
- **Brevo analytics dashboard** — opens, clicks, bounces, unsubscribes
- **UTM tracking on site** — conversion events (play, shop, tournament)
  via UTM-tagged links in emails

## Operational snapshot (at WP completion)

- Date configured: YYYY-MM-DD
- Template ID: <id>
- Workflow ID: <id>
- List ID: <id>
- Sender domain: legendary-arena.com (verified)
- Welcome flow status: active
- Template version: v2 (WP-020)

This snapshot anchors the configuration for future WPs.

## Compliance

- Double opt-in: enforced by subscribe function (WP-015)
- Unsubscribe: Brevo-native {{ unsubscribe }} placeholder
- CAN-SPAM: organizational identity in footer
- SPF/DKIM/DMARC: domain authentication verified
- No API keys or internal URLs in newsletter content
```

Replace placeholder values with actual Brevo IDs after configuration.

### Step 7 — Verify

1. **Domain authentication:**
   - [ ] SPF record verified in Brevo dashboard
   - [ ] DKIM record verified in Brevo dashboard
   - [ ] DMARC record present
   - [ ] Sender identity verified

2. **Brevo template:**
   - [ ] Template created with 10-section v2 structure
   - [ ] Template uses brand-consistent colors (hex equivalents of
     `--la-color-*` tokens)
   - [ ] Template renders correctly on desktop and mobile (Brevo
     preview)
   - [ ] Template renders correctly in Gmail, Outlook, and Apple
     Mail (test send)
   - [ ] Primary CTA is visually dominant over secondary modules
   - [ ] Shop link uses text styling, not button styling
   - [ ] Unsubscribe link uses `{{ unsubscribe }}` placeholder
   - [ ] Organizational identity present in footer
   - [ ] Email HTML size <100KB (Gmail clipping threshold)
   - [ ] Plain-text version present with CTA link + unsubscribe link

3. **Welcome email:**
   - [ ] Automation workflow active in Brevo
   - [ ] Exactly one active welcome workflow exists (identity lock)
   - [ ] Workflow bound to `BREVO_LIST_ID` list only (list coupling)
   - [ ] Workflow trigger is "contact added to list" (no prohibited
     trigger types)
   - [ ] Workflow has exactly 1 trigger and 1 action (determinism
     invariant)
   - [ ] Welcome email sends on new contact confirmation
   - [ ] Welcome email does NOT re-send on list re-addition
     (duplicate prevention)
   - [ ] Welcome email passes pre-send QA checklist
   - [ ] Welcome email CTA is "Play now" -> play.legendary-arena.com
     (CTA invariant: always `play`, no rotation)
   - [ ] Welcome email shop link has correct UTM params
     (utm_campaign=welcome)
   - [ ] Welcome email includes plain-text fallback with CTA link
     and unsubscribe link

4. **Pipeline test (end-to-end):**
   - [ ] All test sends used controlled test address only (test
     isolation)
   - [ ] Signup -> confirm -> welcome email flow works
   - [ ] Welcome email arrives in Primary inbox or Promotions tab
     (not Spam; missing delivery is also a failure)
   - [ ] All links in welcome email resolve correctly
   - [ ] UTM parameters verified in browser URL bar after clicking
     shop links
   - [ ] Brevo dashboard shows delivered status, zero bounces
   - [ ] Unsubscribe flow works (contact cannot receive further
     emails without new opt-in)
   - [ ] Weekly broadcast dry run succeeds

5. **Documentation:**
   - [ ] `docs/email-automation.md` created with all sections
   - [ ] Brevo template ID recorded
   - [ ] Welcome workflow ID recorded
   - [ ] Funnel stages documented with metrics
   - [ ] Subscriber state model documented
   - [ ] Metrics measurement sources documented (Brevo + UTM)
   - [ ] Duplicate send behavior documented
   - [ ] Operational snapshot recorded (template ID, workflow ID,
     list ID, sender domain, welcome flow status)
   - [ ] Unsubscribe invariant documented
   - [ ] Campaign naming convention documented

6. **No site changes:**
   - [ ] `hugo.toml` unchanged
   - [ ] `layouts/**` unchanged
   - [ ] `assets/**` unchanged
   - [ ] `functions/**` unchanged
   - [ ] `static/**` unchanged
   - [ ] `content/**` unchanged
   - [ ] `npm run build` produces byte-identical output (no
     regressions from doc additions)

## Scope lock

This WP touches **only**:

| File | Change |
|---|---|
| `docs/email-automation.md` | **NEW** — funnel architecture + operational reference |

All other work happens in the Brevo dashboard (automation workflows,
email templates, domain authentication). No Hugo site files are
modified.

**Do NOT touch:**

- `hugo.toml` (no config changes)
- `static/brand-tokens.css` (token surface is locked)
- `themes/PaperMod/**` (submodule is locked)
- `layouts/**` (all layout work done in prior WPs, locked)
- `archetypes/**` (locked under WP-016)
- `assets/css/extended/custom.css` (CSS locked under prior WPs)
- `functions/api/subscribe.js` (WP-015, locked)
- `content/**` (WP-017 content, not modified by this WP)
- `package.json` (no new dependencies)
- `docs/newsletter-template.md` (WP-020, locked — consume only)
- `docs/ai/work-packets/WP-017-content-pipeline.md` (WP-020,
  consume only)

## Definition of Done

All must be true before marking WP-018 complete:

1. Brevo domain authentication verified (SPF + DKIM + DMARC green)
2. Verified sender identity on `@legendary-arena.com` domain
3. Branded email template in Brevo implementing v2 10-section spec
4. Welcome email automation workflow active and tested
5. Welcome email sends on new contact signup (post double opt-in)
6. Welcome email passes pre-send QA checklist
7. Welcome email CTA is "Play now" linking to play.legendary-arena.com
8. Welcome email includes Shop secondary module with UTM params
9. Full pipeline tested end-to-end with a test contact
10. Unsubscribe flow verified
11. Weekly broadcast dry run completed successfully
12. `docs/email-automation.md` created with funnel stages, Brevo
    config, CTA hierarchy, weekly send procedure, and compliance
13. Brand voice compliance: no emoji, no exclamation marks, no
    hedging verbs in welcome email copy
14. Primary CTA visually dominant over secondary modules in template
15. Welcome automation workflow satisfies determinism invariant
    (1 trigger, 1 action, no branching)
16. Duplicate welcome send prevention verified or limitation documented
17. Email HTML <100KB, plain-text fallback present
18. Send readiness gate documented in `docs/email-automation.md`
19. Subscriber state model documented
20. Exactly one active welcome workflow (no duplicates or legacy
    workflows)
21. Workflow bound to `BREVO_LIST_ID` only (list coupling invariant)
22. Workflow trigger is "contact added to list" (trigger definition
    constraint)
23. Campaign naming convention follows `Newsletter — <newsletter_slug>`
24. Template version pinned to `docs/newsletter-template.md` v2
25. Operational snapshot recorded in `docs/email-automation.md`
26. All test sends used controlled test address only (no production
    list sends before completion)
27. Brevo dashboard shows zero bounces for all test sends
28. No site files modified (docs-only in-repo changes)
29. `npm run build` deterministic (two runs, byte-identical output)

## Exit criteria

This WP exits when:

- All DoD items verified
- Commit(s) on `main` with `WP-018:` prefix
- ROADMAP updated: WP-018 status -> Done
- Decisions log entry in `01-VISION.md`: "WP-018 — Brevo email
  engagement workflow configured. Welcome email automation active.
  Weekly cadence is manual broadcast (not automated drip) to
  preserve pre-send QA gates. Domain authentication
  (SPF/DKIM/DMARC) verified for legendary-arena.com."

## Failure conditions

- **Domain authentication failure**: SPF, DKIM, or DMARC not
  verified in Brevo -> resolve DNS records before proceeding.
  Sending without authentication risks spam classification.
- **Welcome email spam classification**: Welcome email lands in
  spam instead of inbox -> investigate sender reputation, domain
  authentication, and email content. Fix before marking complete.
- **Brand voice violation**: Welcome email or template copy uses
  emoji, exclamation marks, or hedging verbs -> rewrite.
- **CTA hierarchy violation**: Secondary modules (Shop, Share)
  visually dominate the primary CTA in the template -> redesign.
  Primary CTA must be a button; secondary modules must be text
  links.
- **Missing unsubscribe**: Template does not include Brevo's
  `{{ unsubscribe }}` placeholder -> add immediately. CAN-SPAM
  violation.
- **UTM parameter error**: Welcome email shop link missing UTM
  params or using incorrect values (utm_campaign must be
  `welcome`) -> fix.
- **Site regression**: Any change to Hugo site files (layouts,
  config, CSS, content, functions) -> revert immediately. This WP
  modifies Brevo configuration and docs only.
- **Automation drift**: Welcome workflow modified to include
  additional triggers, actions, branching, or delays beyond the
  determinism invariant (1 trigger, 1 action) -> revert workflow
  to compliant structure. Any structural change requires a new WP.
- **Duplicate welcome send**: Contact receives the welcome email
  more than once -> investigate Brevo re-trigger behavior, document
  findings, and implement prevention.
- **Email clipping**: Email HTML exceeds 100KB -> reduce content
  or inline image size. Gmail clips at ~102KB, causing the
  unsubscribe link and footer to be hidden.
- **Missing plain text fallback**: Template lacks a plain-text
  version -> create one with primary CTA link and unsubscribe link.
  Missing fallback degrades deliverability scoring.
- **Send gate bypass**: Newsletter sent without completing the
  pre-send QA checklist, funnel integrity check, or QA log entry
  -> halt sends until the gate is restored.
- **Multiple welcome workflows**: More than one active workflow
  triggers on contact add -> disable duplicates immediately. Only
  one welcome workflow may exist per the workflow identity lock.
- **Incorrect trigger type**: Workflow uses any trigger other than
  "contact added to list" (e.g., "contact updated", "tag added",
  "event triggered") -> reconfigure to the correct trigger type.
- **Test leakage**: Test email sent to the production list before
  WP completion -> halt and audit list segmentation before
  proceeding.
- **Unsubscribe bypass**: Unsubscribed contact manually re-added
  to list without new opt-in -> remove contact and investigate
  process gap.
- **API key exposure**: Brevo API key (secret, not the public
  Snipcart key) appears in any committed file -> STOP. Rotate the
  key in Brevo immediately. The API key lives in CF Pages env vars
  only.

## Risk register

1. **DNS propagation delay.** SPF/DKIM/DMARC records may take up to
   48 hours to propagate. Mitigation: Cloudflare DNS typically
   propagates in <1h. Verify in Brevo dashboard before proceeding.
   If delayed, the WP pauses at Step 1 — no other work can proceed
   without verified authentication.

2. **SPF record conflict.** The zone already has an SPF record for
   Namecheap email forwarding. Adding a second SPF record instead of
   merging will break authentication for all senders. Mitigation:
   Step 1 prerequisites explicitly require merging into a single
   record. The exact merged record is provided.

3. **Welcome email deliverability.** New sending domains have no
   reputation. Initial sends may have lower inbox placement.
   Mitigation: domain authentication (SPF/DKIM/DMARC) is the
   strongest signal for inbox placement. Start with low volume
   (welcome emails only) to build reputation before weekly
   broadcasts. Monitor the Brevo deliverability dashboard.

4. **Brevo free tier limits.** Brevo's free plan allows 300 emails
   per day. Welcome emails + weekly broadcasts must stay within
   this limit until subscriber volume justifies a paid plan.
   Mitigation: at current scale (pre-launch), this limit is not
   constraining. Monitor as the subscriber list grows.

5. **Template rendering across clients.** Email rendering varies
   across Gmail, Outlook, Apple Mail, and others. Mitigation:
   Step 5 requires test sends to at least Gmail + one alternate
   client. Brevo's multi-client preview helps but is not a
   substitute for real-inbox testing.

## Follow-on work (not in scope)

- **Drip campaign automation** — when content pipeline reaches
  weeks 5+, consider converting from manual broadcast to automated
  drip for back-catalog content (new subscribers receive weeks 1-4
  automatically). Separate WP.
- **Segmentation** — segment by engagement level, signup source, or
  custom attributes. Separate WP when subscriber base exceeds ~100.
- **A/B testing** — Brevo supports subject line and content A/B
  tests. Separate WP when weekly send volume justifies it.
- **Analytics integration** — connect Brevo campaign metrics to
  site analytics (UTM tracking is in place via WP-020; ingestion
  into an analytics dashboard is a future WP).
- **Re-engagement campaign** — automated email to subscribers who
  haven't opened in 30+ days. Separate WP.
- **Cart abandonment emails** — Snipcart webhook -> Brevo trigger
  for abandoned cart recovery. Separate WP requiring Snipcart
  webhook configuration.
