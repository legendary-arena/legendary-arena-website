# Newsletter Email Template Specification

**Status:** v2 (WP-020, 2026-05-13)
**Last updated:** 2026-05-13

**Change summary (WP-020):**
- Removed "Share" as a primary CTA option (§6)
- Introduced "Featured from the Shop" as secondary module (§8)
- Introduced "Share / Forward" as secondary module (§9)
- Formalized CTA hierarchy and 4-link body limit
- Introduced UTM tracking contract for shop links

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

Every newsletter follows this ten-section structure in order:

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
- **Newsletter** — drives newsletter signups (subscribe prompt)
- **Tournament** — links to tournament entry at `play.*`

One primary CTA per email, matching the blog post's `cta` front-matter
value. Follow the CTA contract in `docs/brand/strategy.md §2`
(≤ 2 words, single verb).

### 8. Featured from the Shop (secondary)

A single product spotlight linking to the shop. One product per issue,
maximum one link. This is a secondary module — it must not compete
with or visually dominate the primary CTA (§6).

Link format:

    https://www.legendary-arena.com/shop/?utm_source=newsletter&utm_medium=email&utm_campaign=<newsletter_slug>&utm_content=featured-product

Replace `<newsletter_slug>` with the edition's `newsletter_slug` value.

Layout: compact block below the primary CTA. Product name + one-line
description + link. No images required (keeps email weight low and
avoids rendering issues in restrictive clients).

**Placement constraint:**

"Featured from the Shop" must always appear:
- below the primary CTA in the email
- above the Share/Forward module
- above the footer

Any deviation is a layout violation.

### 9. Share / Forward (secondary)

A low-friction prompt encouraging recipients to forward the email or
share the companion blog post. One line, no images.

Suggested copy: "Know someone who'd find this useful? Forward this
email or share the post: <canonical blog URL>"

The share link points to the companion blog post's canonical URL
(`/posts/<slug>/`) — not a separate sharing service. Blog posts are
easier to share than emails and carry the full CTA stack.

This module is consistent across all editions. It appears after the
Shop module and before the footer.

### 10. Footer

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
  deep-links in the email body.
- Secondary modules add exactly two more links: one Shop link (§8)
  and one share/blog link (§9).
- Maximum deep-links per email body: 4 (Read more + CTA + Shop +
  Share). No additional promotional links in the body.
- Footer links (social, unsubscribe) are not counted toward this limit.
- All links MUST point to production URLs, never preview/localhost.

**Hidden CTA prohibition:**

No additional promotional links may appear:
- inside paragraph text
- inside image links
- inside headings

Only the defined 4 links (Read more, CTA, Shop, Share) are allowed
in the email body. Any link beyond these four is a contract violation.

## UTM parameter conventions

All links to `/shop/` in newsletters and blog posts must include UTM
parameters for attribution tracking.

**Newsletter shop link:**

    https://www.legendary-arena.com/shop/?utm_source=newsletter&utm_medium=email&utm_campaign=<newsletter_slug>&utm_content=featured-product

**Blog post shop link:**

    /shop/?utm_source=blog&utm_medium=post&utm_campaign=<newsletter_slug>&utm_content=featured-product

Parameter definitions:
- `utm_source` — origin surface: `newsletter` or `blog`
- `utm_medium` — delivery channel: `email` or `post`
- `utm_campaign` — edition identifier: the `newsletter_slug` value
- `utm_content` — link purpose: `featured-product` (fixed)

**Slug coupling invariant:**

`newsletter_slug`, blog post slug, and UTM `utm_campaign` value
must be identical strings. Any mismatch is a hard failure condition.

**UTM determinism invariant:**

All UTM parameters must be:
- Lowercase only
- Static keys (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`)
- No additional query parameters allowed on shop links
- No variation in parameter names or ordering

Any deviation is a tracking failure.

## Image requirements

- Newsletter images reuse production URLs:
  `https://www.legendary-arena.com/images/blog/<slug>/hero.webp`
- Images must exist in-repo at `static/images/blog/<slug>/` and be
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
  `/images/blog/<slug>/`, alt text present, email still makes sense
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
