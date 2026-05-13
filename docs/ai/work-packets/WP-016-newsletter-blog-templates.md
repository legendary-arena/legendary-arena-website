# WP-016 — Newsletter & blog templates

Establish reusable system primitives for the newsletter + blog content
pipeline. Stand up the blog section (Hugo list/single/RSS), extend the
existing archetype, create a CTA block partial, define internal linking
conventions, and add subscribe function tests that WP-015 shipped
without.

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
   establishes that the newsletter + blog pipeline is part of the
   revenue-sustaining engagement loop, not optional marketing.
2. `docs/03-ROADMAP.md` — full WP list. WP-016 depends on WP-015.
3. `docs/04-CONTENT-CONVENTIONS.md` — content layout conventions,
   build pipeline (`npm run build` = hugo + pagefind), front-matter
   rules.
4. `docs/brand/palette.md` — all styling must use `var(--la-*)`
   tokens. No raw hex.
5. `docs/brand/strategy.md` — brand voice, terminology, CTA styling
   constraints.
6. `hugo.toml` — current config. Blog menu points to `/posts/`
   (PaperMod default). `archetypes/posts.md` exists with YAML
   front-matter.
7. `layouts/_partials/newsletter-form.html` — WP-015 form partial.
   The CTA block partial created in this WP should be visually
   consistent with the newsletter form's Subscribe button.
8. `functions/api/subscribe.js` — WP-015 CF Pages Function. This WP
   adds unit tests for this file.
9. `assets/css/extended/custom.css` — canonical brand CSS file.
   CTA block styling goes here.

## Current state

Locked under WP-001 → WP-015:

- Newsletter form renders on home page and in footer (WP-015).
- `functions/api/subscribe.js` handles subscriptions (WP-015).
  **No tests exist for this function.**
- `archetypes/posts.md` exists with basic YAML front-matter (title,
  date, description, draft, tags, categories).
- **No `content/posts/` directory exists.** The blog section has zero
  content. PaperMod's `list.html` and `single.html` handle rendering.
- `hugo.toml` already has `[[menu.main]]` and `[[menu.footer]]`
  entries pointing to `/posts/`.
- `extend_footer.html` loads `newsletter.js` via Hugo asset pipeline.
- `package.json` has only `pagefind` as a devDependency. No test
  runner.

What's pending — **your job**:

- ❌ Blog scaffolding: `content/posts/_index.md` (section list page)
- ❌ First placeholder post to verify rendering
- ❌ Extended `archetypes/posts.md` with newsletter-aligned fields
- ❌ CTA block partial (`layouts/_partials/cta-block.html`)
- ❌ CTA block CSS in `custom.css`
- ❌ Brevo email template specification (HTML structure doc)
- ❌ Internal linking conventions documented
- ❌ Subscribe function unit tests (vitest)
- ❌ Test runner setup (`vitest` in devDependencies, `test` script)

## Task

### Step 1 — Set up the test runner and subscribe function tests

Add vitest as a dev dependency and create tests for
`functions/api/subscribe.js`.

**1a. Update `package.json`:**

```json
{
  "scripts": {
    "build": "hugo --minify && npx pagefind --site public",
    "test": "vitest run"
  },
  "devDependencies": {
    "pagefind": "1.5.2",
    "vitest": "3.2.1"
  }
}
```

Pin vitest to an exact version (no `^`, no `~`) per the project's
dependency discipline (`04-CONTENT-CONVENTIONS.md`).

**1b. Create `functions/api/subscribe.test.js`:**

Test the `onRequestPost` and `onRequestOptions` handlers with mocked
`context` objects. Cover these cases:

- **Valid email** — Brevo returns 201, function returns `{ ok: true }`
- **Duplicate contact** — Brevo returns `duplicate_parameter`, function
  returns `{ ok: true, message: "Already subscribed." }`
- **Missing email** — returns 400 with `"Email is required."`
- **Invalid email format** — returns 400 with `"Invalid email address."`
- **Wrong content type** — returns 415 with `"Invalid content type."`
- **Brevo error** — returns 502 with `"Subscription failed."`
- **CORS headers** — allowed origins get their origin back; unknown
  origins get production fallback
- **OPTIONS preflight** — returns 204 with correct CORS headers

The test file imports `onRequestPost` and `onRequestOptions` directly
from `subscribe.js`. Mock `fetch` globally to simulate Brevo responses.
Do not call any real APIs.

**Test environment constraint:**

Cloudflare Pages Functions run in the Workers runtime. The vitest
environment is Node-based, so tests must:
- Use the Web standard `Request` constructor (available in Node 18+)
- Mock `context.env` explicitly (object injection)
- Mock `fetch` globally via `vi.fn()`
- Avoid any Node-specific APIs (`fs`, `path`, etc.)

This ensures parity with the Workers runtime contract.

**Fetch mocking pattern (required):**

```js
global.fetch = vi.fn();
```

Each test must explicitly set the mock return value:

```js
fetch.mockResolvedValue({
  status: 201,
  json: async () => ({}),
});
```

Reset mocks between tests to prevent cross-test contamination:

```js
afterEach(() => {
  vi.restoreAllMocks();
});
```

**Test determinism requirement:**

Tests must be deterministic:
- No use of random values (`Math.random`)
- No reliance on system time (`Date.now()`) unless mocked
- No environment-dependent behavior
- All inputs must be explicitly controlled within the test

**CORS test requirement:**

Tests must explicitly simulate all three origin categories:
- Allowed production origin (`https://www.legendary-arena.com`)
- Local dev origin (`http://localhost:8788`)
- Unknown origin (e.g., `https://evil.example.com`) — must assert
  fallback to `https://www.legendary-arena.com`

Each must assert the correct `Access-Control-Allow-Origin` header
value in the response.

**1c. Run `npm install` then `npm test` to verify.**

### Step 2 — Scaffold the blog section

**2a. Create `content/posts/_index.md`:**

```markdown
---
title: "Blog"
description: "Patch notes, strategy guides, and development updates from Legendary Arena."
---
```

This gives the `/posts/` list page a proper title and description.
PaperMod's `list.html` renders it automatically.

**URL pattern (required):**

Posts resolve to `/posts/<slug>/`. Slugs must be kebab-case and
match newsletter identifiers when applicable (e.g.,
`week-01-deck-checklist`).

**2b. Create a placeholder first post to verify rendering:**

Create `content/posts/hello-arena.md` using the existing archetype
structure:

```markdown
---
title: "Hello, Arena"
date: 2026-05-12
description: "Legendary Arena's first blog post — what we're building and why."
draft: false
tags: ["announcement"]
categories: ["news"]
---

Welcome to the Legendary Arena blog. This is where we'll share patch
notes, strategy deep-dives, development updates, and tournament
announcements.

Legendary Arena is the definitive digital home for the greatest
cooperative deck-building experience ever created. We're building it
with reverence for the tabletop original, engineering it to last, and
funding it in a way that protects the vision forever.

More soon.
```

**2c. Verify:**
- `hugo server` renders `/posts/` with the blog list
- `/posts/hello-arena/` renders the single post
- RSS feed at `/posts/index.xml` includes the post
- Header "Blog" link and footer "Blog" link both land on `/posts/`
- Pagefind indexes the post (`npm run build`, check
  `public/pagefind/` includes post content)

### Step 3 — Extend the blog archetype

Update `archetypes/posts.md` to include newsletter-aligned fields:

```markdown
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
description: ""
draft: false
tags: []
categories: []
series: ""
cta: "play"
newsletter_week: 0
newsletter_slug: ""
---
```

New fields:

- `series` — groups related posts (e.g., "Fundamentals",
  "Mid-Game Strategy", "Advanced Play"). Used for internal linking
  within a content batch.
- `cta` — which CTA block to render at the bottom of the post.
  See CTA contract table below.
- `newsletter_week` — ties this post to a specific newsletter week
  for cross-referencing. `0` means standalone (not part of a weekly
  batch).
- `newsletter_slug` — canonical identifier used in newsletter
  generation and cross-linking (e.g., `"week-01-deck-checklist"`).
  Empty string means standalone. This provides stable linkage
  between blog posts and Brevo campaigns independent of week
  numbering.

**CTA contract (authoritative):**

| Value | Behavior |
|---|---|
| `"play"` (default) | Links to `https://play.legendary-arena.com/` |
| `"newsletter"` | Renders newsletter form partial (WP-015) |
| `"tournament"` | Links to tournament entry (`play.*` until dedicated page exists) |

Any value outside this set is invalid and must fall back to `"play"`.

**Archetype invariant:**

Two consecutive runs of `hugo new posts/test.md` must produce
identical front-matter structure (excluding `date`). No computed or
dynamic fields beyond `.Date` are permitted.

### Step 4 — Create the CTA block partial

Create `layouts/_partials/cta-block.html`:

```html
{{- $cta := .Params.cta | default "play" -}}
{{- if not (in (slice "play" "newsletter" "tournament") $cta) }}
  {{- $cta = "play" -}}
{{- end -}}
{{- if eq $cta "play" }}
<div class="cta-block" data-cta="{{ $cta }}">
    <p class="cta-block-text">Ready to play?</p>
    <a href="https://play.legendary-arena.com/" class="button cta-block-button">Play now</a>
</div>
{{- else if eq $cta "newsletter" }}
<div class="cta-block" data-cta="{{ $cta }}">
    <p class="cta-block-text">Get strategy tips and patch notes in your inbox.</p>
    {{- partial "newsletter-form.html" (dict "id" "cta" "heading" "Subscribe" "description" "Weekly tips, new cards, and tournament news. No spam.") }}
</div>
{{- else if eq $cta "tournament" }}
<div class="cta-block" data-cta="{{ $cta }}">
    <p class="cta-block-text">Think you've got what it takes?</p>
    <a href="https://play.legendary-arena.com/" class="button cta-block-button">Enter a tournament</a>
</div>
{{- end }}
```

The `data-cta` attribute enables future analytics, conversion
tracking, and A/B testing at zero cost. The fallback guard ensures
invalid `cta` values default to `"play"`.

The partial reads `cta` from the post's front-matter and renders the
appropriate block. The `"newsletter"` variant reuses the existing
newsletter form partial from WP-015.

### Step 5 — Inject CTA block into blog single posts

PaperMod's `single.html` does not have a hook for injecting content
after the post body. Two options:

**Option A (preferred): Override `single.html`.**

Copy `themes/PaperMod/layouts/single.html` to `layouts/single.html`.
Add the CTA block partial call after the `.post-content` div closes:

```html
{{- partial "cta-block.html" . }}
```

This is a Hugo override, not a submodule modification — it follows
the project's "customize via Hugo's override mechanism" constraint.

**Override discipline requirement:**

`layouts/single.html` is a full override of PaperMod's upstream
template. To prevent drift:

- Copy the upstream file verbatim before modification
- Add a header comment:

  ```html
  <!-- WP-016 override of PaperMod single.html (submodule commit <hash>) -->
  ```

- Only insert `{{- partial "cta-block.html" . }}` after
  `.post-content` — no other modifications allowed in this file
- Future theme updates must be reconciled manually by diffing
  upstream vs. override

**Option B: Use `extend_footer.html` with JS.**

Inject the CTA block via JavaScript after DOM load. This avoids
copying `single.html` but adds JS complexity. Not recommended.

**Go with Option A.**

### Step 6 — CTA block CSS

Add to `assets/css/extended/custom.css` under a new section header
(`/* §11 — CTA block (WP-016) */`):

Styling targets:

- `.cta-block` — max-width matching `.post-content`, centered,
  top margin, top border via `--la-color-border-primary`, padding
- `.cta-block-text` — typography via `--la-color-text-primary`,
  centered
- `.cta-block-button` — reuse `.button` styling from §5.2 (same
  tokens as the hero CTA and Subscribe button)
- When `.cta-block` contains `.newsletter-form`, suppress the
  form's own label (the CTA text replaces it) and constrain width

**Constraints:**
- No raw hex. All values via `var(--la-*)` tokens.
- Must render correctly in light and dark mode.
- Button visually consistent with existing `.button` CTA styling.

**Accessibility requirement:**
- CTA buttons must use descriptive text (`"Play now"`,
  `"Enter a tournament"`) — not generic labels like `"Click here"`
- Buttons must not rely on color alone for meaning
- All CTA buttons must remain keyboard-focusable (`<a>` and
  `<button>` elements are focusable by default — do not override
  with `tabindex="-1"` or disabled pointer behavior)

### Step 7 — Brevo email template specification

Create `docs/newsletter-template.md` documenting the standard
newsletter email structure:

1. **Header** — Legendary Arena wordmark/logo (links to www)
2. **Hook** — 1–2 sentence teaser (what's in this issue)
3. **Tip / Strategy** — the main value block (2–3 paragraphs)
4. **Challenge** — a specific in-game challenge for the week
5. **Read more** — link to the corresponding blog post (see
   linking requirement below)
6. **CTA** — primary action (play, tournament, or share)

**Linking requirement:**

The "Read more" link MUST point to the canonical blog URL
(`/posts/<slug>/`) and use the same `newsletter_slug` value as
the corresponding post's front-matter. The primary CTA and
"Read more" link are the two intentional deep-links per email;
additional links (e.g., social, unsubscribe) belong in the
footer only.
7. **Footer** — unsubscribe link (Brevo-native), social links,
   "You're receiving this because you signed up at
   legendary-arena.com"

This is a structural specification, not an HTML template. The actual
Brevo template is configured in Brevo's template editor using this
spec as the guide. Document the Brevo template ID once created
(manual step, like WP-015's prerequisites).

**Compliance requirements:**

- Must include Brevo unsubscribe placeholder (`{{ unsubscribe }}`)
- Must include organizational identity reference (physical address
  or organization name — CAN-SPAM requirement)
- Subject line must align with email content (no misleading subjects)
- Newsletter content must not include API keys or internal URLs
- Unsubscribe handling is delegated to Brevo (configured in WP-015)

**Pre-send QA checklist (required before any production send):**

This checklist is part of the template contract. WP-017 (content)
and WP-018 (automation) must execute it before every campaign send.
No email may be sent to a production audience without passing this
checklist.

- [ ] **Test send** — send to developer inbox (Gmail) and at least
  one alternate client (Outlook or Apple Mail) before any broadcast
- [ ] **Link validation** — all URLs resolve: blog link
  (`/posts/<slug>/`), CTA target (`play.*`), unsubscribe. Verify
  links point to production, not preview/localhost
- [ ] **Image validation** — all images load from
  `/images/posts/<slug>/`, alt text present, email still makes
  sense with images blocked
- [ ] **Rendering check** — verify layout on desktop and mobile.
  Use Brevo's preview mode and "view in inbox" multi-client
  simulation
- [ ] **Personalization check** — preview as a real contact in
  Brevo, verify fallback values render correctly
- [ ] **Funnel validation** — click through the full path: email →
  blog post → CTA block → `play.*`. Confirm each hop resolves
- [ ] **Deliverability** — test email lands in inbox, not spam.
  Sender identity matches expected "from" address
- [ ] **Subject line** — aligns with email content (no clickbait,
  no mismatch)

### Step 8 — Internal linking conventions

Add a section to `docs/04-CONTENT-CONVENTIONS.md` titled
"Internal linking":

- **Blog ↔ newsletter cross-reference:** Each weekly blog post
  links to the newsletter signup. Each newsletter links to its
  companion blog post.
- **Series linking:** Posts in the same `series` should link to
  the previous and next post in the series. Hugo's
  `.PrevInSection` / `.NextInSection` handles this if posts are
  ordered by date. PaperMod's `ShowPostNavLinks = true` (already
  set in `hugo.toml`) renders prev/next navigation.
- **CTA consistency:** The `cta` front-matter field determines
  the end-of-post action. Default is `"play"`. Newsletter-heavy
  posts should use `"newsletter"`. Tournament announcements use
  `"tournament"`.
- **External links:** Links to `play.*`, `cards.*`, and `ewiki.*`
  open in the same tab (they're part of the Legendary Arena
  ecosystem). Links to third-party sites open in a new tab
  (`target="_blank" rel="noopener"`).

### Step 9 — Image storage and referencing conventions

**Canonical storage location:**

All blog and newsletter images MUST be stored in:

```
static/images/posts/<slug>/
```

Example:

```
static/images/posts/hello-arena/
  hero.webp
static/images/posts/week-01-deck-checklist/
  hero.webp
  curve-example.webp
  deck-flow-diagram.webp
```

**Naming conventions:**

- Lowercase, kebab-case only
- No spaces, no underscores
- Use semantic names (`hero.webp`, `curve-example.webp`,
  `deck-flow-diagram.webp`) — not `img1.webp` or `screenshot.webp`

**Allowed formats:**

- `.webp` — preferred (best size/quality ratio)
- `.png` — when transparency is required
- `.jpg` — acceptable for photography or stock imagery where
  WebP conversion is impractical

**Size budget:**

- Max 200KB per image (prevents repo bloat at 52-post scale)
- Hero images should target 80–120KB
- Diagrams and illustrations typically compress well under 50KB

**Referencing in Hugo content:**

Images are referenced via absolute paths from `static/`:

```markdown
![Deck curve example](/images/posts/week-01-deck-checklist/curve-example.webp)
```

**Newsletter usage:**

Newsletter images reuse the same production URLs:

```
https://www.legendary-arena.com/images/posts/<slug>/hero.webp
```

No separate email asset storage system is introduced. Note: these
URLs resolve only after deploy — local Brevo preview requires the
production URL or a deployed preview branch.

**Slug ↔ image directory invariant:**

The image directory name MUST match the post slug exactly.
Example:
- Post: `/posts/week-01-deck-checklist/`
- Images: `static/images/posts/week-01-deck-checklist/`

Mismatch between slug and image directory is a contract violation.

**Determinism invariant:**

All images required to render blog content MUST exist in-repo.
External image hosting (R2, third-party CDN) is prohibited in
WP-016 scope.

**Future extension (NOT in scope of WP-016):**

Cloudflare R2 may be introduced for large media assets (video,
high-res art) or dynamic image transformations. If adopted, R2
usage must preserve deterministic fallback (local copy or build
sync), be documented as a separate WP, and define cache, lifecycle,
and URL structure.

Add these conventions to `docs/04-CONTENT-CONVENTIONS.md` alongside
the internal linking section from Step 8.

### Step 10 — Verify

1. **Test suite:**
   ```powershell
   npm test
   ```
   All subscribe function tests pass.

2. **Build check (static output stability):**
   ```powershell
   if (Test-Path public) { Remove-Item public -Recurse -Force }
   npm run build
   ```
   Build succeeds. Two consecutive `npm run build` runs produce
   byte-identical `public/`.

3. **Dev server check:**
   ```powershell
   hugo server --bind=127.0.0.1 --port=1313
   ```
   - `/posts/` renders blog list with "Hello, Arena" post
   - `/posts/hello-arena/` renders single post with CTA block
   - CTA block shows "Play now" button (default `cta: "play"`)
   - CTA block renders correctly in light and dark mode
   - Header and footer "Blog" links work
   - Newsletter form still works on home page and footer

4. **Archetype check:**
   ```powershell
   hugo new posts/test-archetype.md
   ```
   Verify the generated file includes `series`, `cta`,
   `newsletter_week`, and `newsletter_slug` fields. Run a second
   `hugo new posts/test-archetype-2.md` and confirm identical
   front-matter structure (excluding `date`). Delete both test
   files after.

5. **Pagefind check:**
   After `npm run build`, verify the blog post appears in
   Pagefind's index (search for "Hello Arena" on the site).

6. **RSS feed check:**
   - `/posts/index.xml` includes post title, description, and
     permalink
   - Draft posts are excluded from the feed

7. **Image existence check:**
   - All images referenced in blog content must resolve (no 404s)
   - Verify at least one image per post loads in the browser
   - Image directory name matches the post slug

8. **Accessibility check:**
   - CTA block button has sufficient contrast in both modes
   - CTA block text is readable
   - CTA buttons are keyboard-focusable
   - Newsletter variant CTA has proper `aria-label` (inherited
     from newsletter-form partial)

## Scope lock

This WP touches **only**:

| File | Change |
|---|---|
| `package.json` | **MODIFY** — add vitest, test script |
| `package-lock.json` | **MODIFY** — lockfile update |
| `functions/api/subscribe.test.js` | **NEW** — subscribe function tests |
| `content/posts/_index.md` | **NEW** — blog section list page |
| `content/posts/hello-arena.md` | **NEW** — first blog post |
| `archetypes/posts.md` | **MODIFY** — add series, cta, newsletter_week, newsletter_slug |
| `layouts/_partials/cta-block.html` | **NEW** — CTA block partial |
| `layouts/single.html` | **NEW** — override PaperMod single.html |
| `assets/css/extended/custom.css` | **MODIFY** — CTA block styling (§11) |
| `docs/newsletter-template.md` | **NEW** — email template spec |
| `docs/04-CONTENT-CONVENTIONS.md` | **MODIFY** — internal linking + image conventions |
| `static/images/posts/<slug>/` | **NEW** (per post) — image directory matching post slug |

**Do NOT touch:**

- `hugo.toml` (no config changes needed — blog menu already exists)
- `static/brand-tokens.css` (token surface is locked)
- `themes/PaperMod/**` (submodule is locked)
- `layouts/_partials/newsletter-form.html` (WP-015, locked)
- `functions/api/subscribe.js` (WP-015, locked — tests only)
- `layouts/index.html` (home page layout, locked)
- `layouts/_partials/footer.html` (footer, locked)
- `layouts/_partials/header.html` (header, locked)

## Definition of Done

All must be true before marking WP-016 complete:

1. Subscribe function tests exist and pass (`npm test`)
2. Blog list page renders at `/posts/` with correct title/description
3. First blog post renders at `/posts/hello-arena/` with CTA block
4. CTA block renders "Play now" for `cta: "play"` (default)
5. CTA block renders newsletter form for `cta: "newsletter"`
6. CTA block renders tournament CTA for `cta: "tournament"`
6a. CTA block falls back to `"play"` for unknown `cta` values
7. `archetypes/posts.md` includes `series`, `cta`, `newsletter_week`,
   `newsletter_slug`
8. `hugo new posts/test.md` generates correct front-matter
9. Newsletter email template structure documented
10. Internal linking + image storage conventions added to
    `04-CONTENT-CONVENTIONS.md`
10a. Image convention: `static/images/posts/<slug>/` structure documented
10b. All in-repo images ≤ 200KB, `.webp` preferred
11. CTA block styling uses `var(--la-*)` tokens only — no raw hex
12. Light and dark mode both render correctly
13. `npm run build` produces byte-identical output across two runs
14. Pagefind indexes blog content
15. RSS feed at `/posts/index.xml` includes posts

## Exit criteria

This WP exits when:

- All DoD items verified
- Commit(s) on `main` with `WP-016:` prefix
- ROADMAP updated: WP-016 status → ✅ Done
- Decisions log entry in `01-VISION.md` (if any non-obvious
  decisions were made)

## Failure conditions

- **Build regression**: If `npm run build` fails or produces
  different output across runs → fix before proceeding.
- **Raw hex in CSS**: Any class-color or brand-color hex literal
  in the CTA block CSS → replace with token reference.
- **Submodule modification**: Any change to `themes/PaperMod/` →
  revert immediately.
- **Test leakage**: Subscribe tests must not call any real APIs.
  All Brevo calls must be mocked.
- **Archetype regression**: Existing `hugo new` behavior for other
  content types must not break.
