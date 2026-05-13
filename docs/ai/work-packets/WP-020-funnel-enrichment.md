# WP-020 — Newsletter & blog funnel enrichment

Enrich the newsletter and blog pipeline with secondary conversion
modules (Shop, Share/Forward) and a documented funnel hierarchy. This
WP amends the governing docs that WP-017 consumes, so when WP-017
executes it picks up the new requirements automatically. No content
files are created — this is a governance and specification WP.

This file is the **session-ready execution pack**. The design source of
truth is [`docs/03-ROADMAP.md`](../../03-ROADMAP.md). If this file and
the roadmap conflict, the roadmap wins.

**Dependency note:** WP-017 (content pipeline) has been specced but NOT
executed — its deliverables (`docs/content-taxonomy.md`, blog posts,
newsletter drafts) do not exist yet. This WP amends the WP-017 spec
and the newsletter template spec so that when WP-017 runs, the new
funnel requirements are included. No content files are created or
modified by this WP.

**Prerequisite:** WP-019 (Snipcart commerce) is shipped. The `/shop/`
page exists and is linked in the site navigation. UTM-tagged links to
`/shop/` are now viable.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme as a Git submodule. Brand
tokens consumed by `play.*` and `cards.*` via cross-origin link.
Deployed to Cloudflare Pages.

## Required reading (in order)

1. `docs/01-VISION.md` — vision, global invariants, decisions log.
   The **Financial Sustainability** section establishes the newsletter
   as part of the revenue-sustaining engagement loop.
2. `docs/03-ROADMAP.md` — full WP list. WP-020 depends on WP-019
   (Snipcart) for the `/shop/` destination and WP-016 (newsletter +
   blog templates) for the infrastructure.
3. `docs/newsletter-template.md` — email template structural spec
   (WP-016). This WP modifies this file.
4. `docs/ai/work-packets/WP-017-content-pipeline.md` — content
   pipeline spec. This WP amends this file.
5. `docs/brand/strategy.md` — brand voice, CTA styling constraints.
6. `archetypes/posts.md` — blog post archetype with `cta` field.
   Valid values: `"play"`, `"newsletter"`, `"tournament"`. This WP
   does NOT modify the archetype or add new `cta` values.

## Current state

Locked under WP-001 → WP-019:

- Newsletter email template spec at `docs/newsletter-template.md`
  defines a 7-section structure (WP-016).
- Blog archetype supports `cta` values: `play`, `newsletter`,
  `tournament` (WP-016).
- CTA block partial renders per front-matter `cta` value (WP-016).
- Snipcart shop live at `/shop/` with product pages (WP-019).
- WP-017 specced but not executed — `docs/content-taxonomy.md`, blog
  posts, and newsletter drafts do not exist yet.

**Inconsistency to fix (discovered during pre-flight):**

`docs/newsletter-template.md` §6 lists "Share — social sharing prompt"
as a primary CTA option, but the archetype `cta` field only supports
`play`/`newsletter`/`tournament`. The `cta-block.html` partial has no
"share" branch. This WP corrects §6 to align with the archetype
contract and moves share/forward to a dedicated secondary module.

What's pending — **your job**:

- ❌ Newsletter template: add "Featured from the Shop" section
- ❌ Newsletter template: add "Share/Forward" micro-module
- ❌ Newsletter template: fix §6 CTA options to match archetype
- ❌ WP-017 amendment: funnel hierarchy in content-taxonomy.md spec
- ❌ WP-017 amendment: blog post shop section in content requirements
- ❌ WP-017 amendment: newsletter draft secondary CTAs
- ❌ WP-017 amendment: funnel integrity check procedure

## Task

### Step 1 — Update newsletter template spec: fix §6 CTA options

In `docs/newsletter-template.md`, replace the §6 CTA options list with
the values that match the archetype contract:

**Before:**

```
- **Play** — links to `https://play.legendary-arena.com/`
- **Tournament** — links to tournament entry at `play.*`
- **Share** — social sharing prompt
```

**After:**

```
- **Play** — links to `https://play.legendary-arena.com/`
- **Newsletter** — drives newsletter signups (subscribe prompt)
- **Tournament** — links to tournament entry at `play.*`
```

Update the accompanying text to clarify that only one primary CTA
appears per email, matching the blog post's `cta` front-matter value.

**Rationale:** The archetype `cta` field governs both the blog CTA
block and the newsletter CTA. The values must match across both
surfaces. "Share" was never implemented in `cta-block.html` and
belongs as a secondary module (added in Step 3).

### Step 2 — Update newsletter template spec: add §8 "Featured from the Shop"

Add a new section 8 to `docs/newsletter-template.md`, between the
existing §7 (Footer) and the linking requirements section. Renumber
the footer to §9.

**New §8 — Featured from the Shop:**

```markdown
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
```

### Step 3 — Update newsletter template spec: add "Share/Forward" micro-module

Add a new section after "Featured from the Shop" (becomes §9,
footer becomes §10):

```markdown
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
```

### Step 4 — Update newsletter template linking requirements

In the "Linking requirements" section, update to reflect the new
module count:

**Before:**

```
- The primary **CTA** and **"Read more"** link are the two intentional
  deep-links per email.
- Additional links (social, unsubscribe) belong in the footer only.
```

**After:**

```
- The primary **CTA** and **"Read more"** link are the two intentional
  deep-links in the email body.
- Secondary modules add exactly two more links: one Shop link (§8)
  and one share/blog link (§9).
- Maximum deep-links per email body: 4 (Read more + CTA + Shop +
  Share). No additional promotional links in the body.
- Footer links (social, unsubscribe) are not counted toward this limit.
```

**Hidden CTA prohibition:**

No additional promotional links may appear:
- inside paragraph text
- inside image links
- inside headings

Only the defined 4 links (Read more, CTA, Shop, Share) are allowed
in the email body. Any link beyond these four is a contract violation.

### Step 5 — Update newsletter template version header

Update the version line at the top of `docs/newsletter-template.md`:

```
**Status:** v2 (WP-020, 2026-05-13)
**Last updated:** 2026-05-13
```

Update the structure summary line:

```
Every newsletter follows this ten-section structure in order:
```

Add a change summary at the bottom of the version header area:

```markdown
**Change summary (WP-020):**
- Removed "Share" as a primary CTA option (§6)
- Introduced "Featured from the Shop" as secondary module (§8)
- Introduced "Share / Forward" as secondary module (§9)
- Formalized CTA hierarchy and 4-link body limit
- Introduced UTM tracking contract for shop links
```

### Step 6 — Amend WP-017: add funnel hierarchy to content-taxonomy.md spec

In `docs/ai/work-packets/WP-017-content-pipeline.md`, add a new
subsection at the end of Step 1 (after "Taxonomy rules:"):

```markdown
**Funnel purpose and CTA hierarchy:**

Every newsletter edition and blog post serves a measurable funnel
purpose. The hierarchy ensures one clear primary action per touchpoint
while maintaining consistent secondary exposure.

Primary CTA (one per edition, from `cta` front-matter):
- Rotation per 4-week batch: 2x `"play"`, 1x `"newsletter"`,
  1x `"tournament"`
- Primary CTA drives the single most important action for that week
- Primary CTA appears in both the blog post (via `cta-block.html`)
  and the newsletter (§6)

**Primary CTA dominance requirement:**

- Primary CTA must appear as a button (not just text)
- Primary CTA must appear above the "Featured from the Shop" module
- Secondary modules must never appear above the primary CTA
- Secondary modules must not use button styling identical to the
  primary CTA (no `.button` or `.cta-block-button` class)

Secondary CTAs (always present, never dominant):
- **Shop** — exactly 1 link to `/shop/` per edition, with UTM params.
  Appears as "Featured from the Shop" module in newsletter (§8) and
  as a near-end content section in the blog post.
- **Share/Forward** — exactly 1 share prompt per newsletter (§9).
  Points to the companion blog post canonical URL.
- **Read more** — exactly 1 link to the companion blog post per
  newsletter (§5).

Secondary CTA limits (hard caps):
- 1 shop link per edition (newsletter + blog post each)
- 1 share link per newsletter
- 1 read-more link per newsletter
- Secondary modules must never exceed these counts
- Secondary CTAs must be visually subordinate to the primary CTA

Future funnel purposes (not implemented, documented for roadmap):
- Feedback/signal collection (one-question poll link)
- Community activation (submit deck, vote topic)
- Retention/reactivation (monthly recap, "missed issues" pointer)
- Membership/pass upsell (when play.legendary-arena.com introduces
  paid tiers)

These are expansion candidates for future WPs and must not be added
to the template without a governing WP.
```

### Step 7 — Amend WP-017: update blog post content requirements

In `docs/ai/work-packets/WP-017-content-pipeline.md`, add to the
"Content requirements" section of each blog post step (Steps 3–6),
after the existing bullet points and before the "Image:" line:

```markdown
- **Featured from the Shop** — add a near-end section (before the
  closing paragraph) with a single link to the shop:

  ```markdown
  ## Gear up

  Browse decks, sleeves, and accessories built for Legendary Arena.

  [Visit the Shop](/shop/?utm_source=blog&utm_medium=post&utm_campaign=<newsletter_slug>&utm_content=featured-product)
  ```

  Replace `<newsletter_slug>` with the post's `newsletter_slug` value.
  This section must NOT replace or modify the CTA block rendered by
  `cta-block.html` — the CTA block remains the primary conversion
  element and is injected after `.post-content` by `layouts/single.html`.
```

**Section heading convention:** Use "Gear up" as the consistent h2
heading for the shop section across all posts. This keeps the section
recognizable and scannable without being generic ("Shop") or
salesy ("Buy now").

**CTA non-interference invariant:**

The "Gear up" section must:
- appear before the closing paragraph in the markdown content
- not be placed after the Hugo-injected CTA block (which is rendered
  after `.post-content` by `layouts/single.html`)
- not use `.button` styling class

The CTA block remains the ONLY primary conversion button on the page.

### Step 8 — Amend WP-017: update newsletter draft requirements

In `docs/ai/work-packets/WP-017-content-pipeline.md`, update Step 7
("Create newsletter edition drafts"). Add to the "Each draft must
contain:" list:

```markdown
7. **Featured from the Shop** — a compact product spotlight with one
   link to `/shop/` using UTM parameters:
   `https://www.legendary-arena.com/shop/?utm_source=newsletter&utm_medium=email&utm_campaign=<newsletter_slug>&utm_content=featured-product`
   Replace `<newsletter_slug>` with the edition's slug.
   One product, one link, one line of copy.
8. **Share / Forward** — a one-line prompt: "Know someone who'd find
   this useful? Forward this email or share the post:
   https://www.legendary-arena.com/posts/<slug>/"
   Points to the companion blog post canonical URL.
```

Update the "Draft quality bar" section to add:

```markdown
- Shop link must use correct UTM parameters (source, medium, campaign,
  content). Verify `<newsletter_slug>` substitution matches the
  edition's actual slug.
- Share link must point to the companion blog post canonical URL
  (not a third-party sharing service).
```

Update the newsletter template reference from "7-section structure" to
"10-section structure" to match the updated spec.

### Step 9 — Amend WP-017: add funnel integrity check procedure

In `docs/ai/work-packets/WP-017-content-pipeline.md`, add a new
subsection to Step 8 ("Validate cross-links and series navigation"),
after the existing item 4 (funnel integrity check):

```markdown
5. Funnel integrity check (expanded — pre-send procedure):

   From a Brevo test email sent to a real inbox (not Brevo's preview
   mode), verify each link in the conversion path:

   a. **Read more** — click the "Read more" link in the email.
      Verify it resolves to the correct blog post at
      `/posts/<slug>/`. Page loads, images render, no 404.

   b. **Blog → CTA** — on the blog post, scroll to the CTA block.
      Click the CTA button. Verify navigation to the target
      (`play.*` for play/tournament, newsletter form for newsletter).
      Target page loads without error.

   c. **Shop link (newsletter)** — click the "Featured from the Shop"
      link in the email. Verify it resolves to `/shop/` with correct
      UTM parameters visible in the URL bar. Shop page loads, products
      render.

   d. **Shop link (blog)** — on the blog post, click the "Gear up"
      shop link. Verify it resolves to `/shop/` with correct UTM
      parameters. Shop page loads.

   e. **Share link** — click the share/forward blog link. Verify it
      resolves to the correct blog post canonical URL.

   **Pass/fail recording format:**

   Record results per edition in `docs/newsletter-drafts/qa-log.md`:

   ```markdown
   ## Week <N> — <slug>

   - Date tested: YYYY-MM-DD
   - Tester: <name or email>
   - [ ] Read more → blog post loads
   - [ ] Blog CTA → target loads
   - [ ] Newsletter shop link → /shop/ loads with UTM params
   - [ ] Blog shop link → /shop/ loads with UTM params
   - [ ] Share link → blog post loads
   - [ ] Images render in email (Gmail)
   - [ ] Images render in email (Outlook or Apple Mail)
   - Result: PASS / FAIL
   - Notes: <any issues found>
   ```

   All items must pass before the edition is sent to production.
   Failed items are blockers — fix and re-test before send.

   **QA log persistence requirement:**

   - Each edition MUST have exactly one QA log entry
   - Entries must not be overwritten or edited post-send
   - Corrections after send must be logged as a new entry
     (append, never replace)

   This provides a full audit trail of funnel validation.
```

### Step 10 — Amend WP-017: update scope lock and DoD

In `docs/ai/work-packets/WP-017-content-pipeline.md`:

**Add to scope lock table:**

```markdown
| `docs/newsletter-drafts/qa-log.md` | **NEW** — funnel integrity QA log |
```

**Add to "Definition of Done" list:**

```markdown
24. Each blog post includes a "Gear up" section with UTM-tagged
    shop link before the closing paragraph
25. Each newsletter draft includes "Featured from the Shop" module
    with UTM-tagged shop link
26. Each newsletter draft includes "Share / Forward" module with
    companion blog post URL
27. UTM parameters use correct values: source (newsletter/blog),
    medium (email/post), campaign (<newsletter_slug>),
    content (featured-product)
28. Funnel integrity check passed for at least one edition (QA log
    recorded in docs/newsletter-drafts/qa-log.md)
```

**Add to "Failure conditions" list:**

```markdown
- **UTM parameter error**: Shop links missing or using incorrect UTM
  parameters → fix before completion.
- **Secondary CTA overflow**: More than one shop link or one share
  link in any newsletter edition or blog post → reduce to one each.
- **Shop section placement**: "Gear up" section appears after the
  CTA block instead of before the closing paragraph → reorder.
  The CTA block (injected by layouts/single.html after .post-content)
  must remain the final conversion element.
```

### Step 11 — UTM parameter reference

Document the UTM parameter conventions for easy reference. Add to
`docs/newsletter-template.md` after the "Linking requirements" section:

```markdown
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
```

### Step 12 — Verify

1. **Newsletter template completeness:**
   - `docs/newsletter-template.md` has 10 numbered sections
   - §6 CTA options match archetype contract (play/newsletter/tournament)
   - §8 "Featured from the Shop" exists with UTM link format
   - §9 "Share / Forward" exists with canonical blog URL format
   - §10 Footer (renumbered from §7)
   - Linking requirements updated with 4-link cap
   - UTM parameter conventions section present
   - Version header shows v2 (WP-020)

2. **WP-017 amendments:**
   - Step 1 includes "Funnel purpose and CTA hierarchy" subsection
   - Steps 3–6 include "Featured from the Shop" content requirement
   - Step 7 includes items 7 (Shop) and 8 (Share) in draft checklist
   - Step 8 includes expanded funnel integrity check procedure with
     QA log format
   - Scope lock includes `docs/newsletter-drafts/qa-log.md`
   - DoD includes items 24–28
   - Failure conditions include UTM, overflow, and placement checks

3. **Internal consistency:**
   - All `newsletter_slug` references in UTM examples are parameterized
     (no hardcoded slugs)
   - CTA terminology is consistent: `play`/`newsletter`/`tournament`
     (not "subscribe" or "share")
   - Shop section heading is consistently "Gear up" across all
     references
   - Secondary CTA limits are stated identically in all locations
     (1 shop, 1 share, 1 read-more)

4. **No infrastructure changes:**
   - `archetypes/posts.md` unchanged
   - `layouts/**` unchanged
   - `cta-block.html` unchanged
   - `hugo.toml` unchanged
   - `package.json` unchanged

5. **Link count validation (spot-check):**
   Review the newsletter template spec and WP-017 amendments to
   confirm exactly 4 links are specified per email body:
   - 1 Read more (§5)
   - 1 Primary CTA (§6)
   - 1 Shop link (§8)
   - 1 Share link (§9)
   Any additional link in the body spec is a failure.

## Scope lock

This WP touches **only**:

| File | Change |
|---|---|
| `docs/newsletter-template.md` | **MODIFY** — fix §6 CTA options, add §8 Shop + §9 Share modules, renumber footer to §10, add UTM conventions, update linking requirements, bump to v2 |
| `docs/ai/work-packets/WP-017-content-pipeline.md` | **MODIFY** — amend taxonomy (funnel hierarchy), blog post requirements (shop section), newsletter draft requirements (shop + share), funnel integrity check procedure, scope lock, DoD, failure conditions |

**Do NOT touch:**

- `hugo.toml` (no config changes)
- `static/brand-tokens.css` (token surface is locked)
- `themes/PaperMod/**` (submodule is locked)
- `layouts/**` (all layout work done in WP-016, locked)
- `archetypes/posts.md` (archetype locked under WP-016)
- `assets/css/extended/custom.css` (CSS locked under prior WPs)
- `functions/api/subscribe.js` (WP-015, locked)
- `content/**` (no content files exist yet; WP-017 creates them)
- `package.json` (no new dependencies)
- `docs/content-taxonomy.md` (does not exist; WP-017 creates it)

## Definition of Done

All must be true before marking WP-020 complete:

1. `docs/newsletter-template.md` updated to v2 with 10-section structure
2. §6 CTA options match archetype contract (play/newsletter/tournament)
3. §8 "Featured from the Shop" defined with UTM link format
4. §9 "Share / Forward" defined with canonical blog URL convention
5. Linking requirements updated: 4-link body cap documented
6. UTM parameter conventions documented with both newsletter and blog
   link formats
7. WP-017 Step 1 amended with funnel purpose and CTA hierarchy
8. WP-017 Steps 3–6 amended with "Gear up" shop section requirement
9. WP-017 Step 7 amended with shop and share draft requirements
10. WP-017 Step 8 amended with expanded funnel integrity check and
    QA log format
11. WP-017 scope lock, DoD, and failure conditions updated
12. All CTA terminology consistent across both documents
13. No infrastructure files modified (layouts, archetypes, config)

## Exit criteria

This WP exits when:

- All DoD items verified
- Commit(s) on `main` with `WP-020:` prefix
- ROADMAP updated: WP-020 status → ✅ Done
- Decisions log entry in `01-VISION.md`: "WP-020 — Moved 'Share' from
  primary CTA (newsletter template §6) to secondary module (§9).
  Primary CTAs now match archetype contract: play/newsletter/tournament."

## Failure conditions

- **CTA contract violation**: §6 CTA options do not match the
  archetype `cta` field values (play/newsletter/tournament) →
  reconcile before proceeding.
- **Secondary CTA overflow**: Any section specifies more than one
  shop link or one share link per edition → reduce.
- **Multiple product violation**: More than one product or more than
  one shop link in the "Featured from the Shop" module → reduce to
  exactly one product and one link.
- **UTM format error**: UTM parameter format is inconsistent between
  newsletter template spec and WP-017 amendments → reconcile.
- **Infrastructure modification**: Any change to layouts, archetypes,
  CSS, or config files → revert immediately. This is a
  governance-only WP.
- **Scope creep into WP-017 content**: This WP must NOT create blog
  posts, newsletter drafts, or `docs/content-taxonomy.md`. Those are
  WP-017 deliverables. If content creation is attempted, stop and
  verify scope.
