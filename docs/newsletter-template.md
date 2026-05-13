# Newsletter Email Template Specification

**Status:** v1 (WP-016, 2026-05-12)
**Last updated:** 2026-05-12

> **Authority:** This document defines the structural specification for
> Legendary Arena's weekly newsletter emails. It is subordinate to
> `01-VISION.md` and `docs/brand/strategy.md` (voice/tone). The actual
> Brevo template is configured in Brevo's template editor using this
> spec as the guide.

This is a **structural specification**, not an HTML template. WP-017
(content batches) and WP-018 (Brevo automation) execute against this
contract.

---

## Email structure

Every newsletter follows this seven-section structure in order:

### 1. Header

Legendary Arena wordmark/logo linking to
`https://www.legendary-arena.com/`. Consistent across all sends.

### 2. Hook

1–2 sentence teaser summarizing what's in this issue. Sets
expectations and earns the scroll.

### 3. Tip / Strategy

The main value block — 2–3 paragraphs delivering actionable content
(deck-building advice, meta analysis, scenario strategy). This is
what subscribers signed up for.

### 4. Challenge

A specific in-game challenge for the week. Concrete, achievable,
tied to the tip content when possible. Drives engagement back into
the game.

### 5. Read more

Link to the corresponding blog post at
`https://www.legendary-arena.com/posts/<slug>/`. The `<slug>` MUST
match the `newsletter_slug` value in the companion blog post's
front-matter.

### 6. CTA

Primary action button. One of:
- **Play** — links to `https://play.legendary-arena.com/`
- **Tournament** — links to tournament entry at `play.*`
- **Share** — social sharing prompt

One CTA per email. Follow the CTA contract in
`docs/brand/strategy.md §2` (≤ 2 words, single verb).

### 7. Footer

- Unsubscribe link (Brevo-native `{{ unsubscribe }}` placeholder)
- Social links (when available)
- Organizational identity: "You're receiving this because you signed
  up at legendary-arena.com"
- Physical address or organization name (CAN-SPAM requirement)

---

## Linking requirements

- The **"Read more" link** MUST point to the canonical blog URL
  (`/posts/<slug>/`) and use the same `newsletter_slug` value as the
  corresponding post's front-matter.
- The primary **CTA** and **"Read more"** link are the two intentional
  deep-links per email.
- Additional links (social, unsubscribe) belong in the footer only.
- All links MUST point to production URLs, never preview/localhost.

## Image requirements

- Newsletter images reuse production URLs:
  `https://www.legendary-arena.com/images/posts/<slug>/hero.webp`
- Images must exist in-repo at `static/images/posts/<slug>/` and be
  deployed before the newsletter send.
- Alt text required on all images.
- Email must remain comprehensible with images blocked.

## Compliance requirements

- MUST include Brevo unsubscribe placeholder (`{{ unsubscribe }}`)
- MUST include organizational identity reference (physical address or
  organization name — CAN-SPAM requirement)
- Subject line MUST align with email content (no misleading subjects)
- Newsletter content MUST NOT include API keys or internal URLs
- Unsubscribe handling is delegated to Brevo (configured in WP-015)

---

## Pre-send QA checklist

This checklist is part of the template contract. WP-017 (content) and
WP-018 (automation) must execute it before every campaign send. **No
email may be sent to a production audience without passing this
checklist.**

- [ ] **Test send** — send to developer inbox (Gmail) and at least one
  alternate client (Outlook or Apple Mail) before any broadcast
- [ ] **Link validation** — all URLs resolve: blog link
  (`/posts/<slug>/`), CTA target (`play.*`), unsubscribe. Verify links
  point to production, not preview/localhost
- [ ] **Image validation** — all images load from
  `/images/posts/<slug>/`, alt text present, email still makes sense
  with images blocked
- [ ] **Rendering check** — verify layout on desktop and mobile. Use
  Brevo's preview mode and "view in inbox" multi-client simulation
- [ ] **Personalization check** — preview as a real contact in Brevo,
  verify fallback values render correctly
- [ ] **Funnel validation** — click through the full path: email → blog
  post → CTA block → `play.*`. Confirm each hop resolves
- [ ] **Deliverability** — test email lands in inbox, not spam. Sender
  identity matches expected "from" address
- [ ] **Subject line** — aligns with email content (no clickbait, no
  mismatch)
