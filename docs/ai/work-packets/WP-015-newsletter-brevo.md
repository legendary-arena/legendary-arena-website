# WP-015 — Newsletter signup with Brevo

Add an email-capture form to the marketing site backed by Brevo's
contact API. The form appears in two places: the home page (below the
hero cards) and the site-wide footer (above the copyright line). A
Cloudflare Pages Function acts as a server-side proxy so the Brevo API
key never reaches the browser.

This file is the **session-ready execution pack**. The design source of
truth is [`docs/03-ROADMAP.md`](../../03-ROADMAP.md). If this file and
the roadmap conflict, the roadmap wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`. PaperMod theme as a Git submodule. Brand
tokens consumed by `play.*` and `cards.*` via cross-origin link.
Deployed to Cloudflare Pages.

## Required reading (in order)

1. `docs/01-VISION.md` — vision, Global invariants, Decisions log.
   A CF Pages Function is runtime-only and excluded from Hugo's
   build pipeline. Therefore, identical commits continue to produce
   byte-identical `public/` output — the **deterministic-deploy**
   invariant is preserved.
2. `docs/03-ROADMAP.md` — full WP list. This WP is tracked under
   ER-018.
3. `docs/04-CONTENT-CONVENTIONS.md` — content layout conventions.
   The home page is `content/_index.md`, rendered by
   `layouts/index.html`.
4. `docs/brand/palette.md` — all form styling must use `var(--la-*)`
   tokens. No raw hex.
5. `docs/brand/strategy.md` — § 5 (Layout patterns) for form
   placement; § 10 (Brand failure modes) for CTA styling constraints.
6. `hugo.toml` — current config. Footer menu items are defined here
   under `[[menu.footer]]`.
7. `layouts/index.html` — home page layout. The newsletter form will
   be added as a new `<section>` after the existing `.section`
   (feature cards).
8. `layouts/_partials/footer.html` — footer override (WP-010). The
   newsletter form will be inserted between the `</nav>` close and
   the copyright line.
9. <https://developers.brevo.com/docs/getting-started> — Brevo API
   docs. The key endpoint is `POST https://api.brevo.com/v3/contacts`
   with header `api-key: <key>`.
10. <https://developers.cloudflare.com/pages/functions/> — CF Pages
    Functions docs. A file at `functions/api/subscribe.js` becomes
    the endpoint `POST /api/subscribe`.

## Current state

Locked under WP-001 → WP-014:

- Home page (`layouts/index.html`) renders hero + feature cards.
  No email capture exists.
- Footer (`layouts/_partials/footer.html`) renders nav + copyright.
  No email capture exists.
- No `functions/` directory exists — this WP introduces it.
- `static/brand-tokens.css` defines the token surface. Locked.
- `assets/css/extended/custom.css` is the canonical brand CSS file.
- CF Pages deploy is configured (WP-006). CF Pages Functions are
  auto-detected from a `functions/` directory at the repo root.

What's pending — **your job**:

- ❌ Brevo account setup instructions (manual prerequisite)
- ❌ CF Pages Function at `functions/api/subscribe.js`
- ❌ Newsletter form partial at `layouts/_partials/newsletter-form.html`
- ❌ Home page integration (new `<section>` in `layouts/index.html`)
- ❌ Footer integration (inline form in `layouts/_partials/footer.html`)
- ❌ Brand-consistent CSS in `assets/css/extended/custom.css`
- ❌ Success / error UI states (no page reload)
- ❌ Client-side JS for form submission via `fetch()`
- ❌ Double opt-in configuration (Brevo-side, documented)
- ❌ Local dev testing
- ❌ Build verification (static output unchanged)

## Prerequisites (manual — not automatable)

Before starting the implementation steps, the site owner must:

1. **Create a Brevo account** at <https://app.brevo.com/> (free tier
   supports 300 emails/day).
2. **Generate an API key** at Brevo > Settings > API Keys. Copy the
   key value.
3. **Create a contact list** in Brevo for newsletter subscribers.
   Note the list ID (integer).
4. **Enable double opt-in** in Brevo > Settings > Subscription
   Confirmation. Brevo handles the confirmation email automatically.
5. **Add the API key as a CF Pages environment variable:**
   - CF Dashboard > Pages > `legendary-arena-com` > Settings >
     Environment variables
   - Name: `BREVO_API_KEY`
   - Value: the API key from step 2
   - Set for both Production and Preview environments
6. **Add the list ID as a CF Pages environment variable:**
   - Name: `BREVO_LIST_ID`
   - Value: the list ID from step 3

## Task

### Step 1 — Create the CF Pages Function

Create `functions/api/subscribe.js`:

```js
export async function onRequestPost(context) {
  const allowedOrigins = [
    "https://www.legendary-arena.com",
    "http://localhost:8788",
    "http://127.0.0.1:8788",
  ];
  const origin = context.request.headers.get("Origin");
  const allowOrigin = allowedOrigins.includes(origin)
    ? origin
    : "https://www.legendary-arena.com";

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const contentType = context.request.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({ error: "Invalid content type." }),
        { status: 415, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { email } = await context.request.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Email is required." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const listId = parseInt(context.env.BREVO_LIST_ID, 10);

    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": context.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (brevoRes.status === 201 || brevoRes.status === 204) {
      return new Response(
        JSON.stringify({ ok: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const brevoBody = await brevoRes.json().catch(() => ({}));

    if (brevoBody.code === "duplicate_parameter") {
      return new Response(
        JSON.stringify({ ok: true, message: "Already subscribed." }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.error("Brevo error:", brevoBody);

    if (brevoBody?.code) {
      return new Response(
        JSON.stringify({ error: "Subscription failed.", detail: brevoBody.code }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Subscription failed. Please try again." }),
      { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Server error. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
}

export async function onRequestOptions(context) {
  const allowedOrigins = [
    "https://www.legendary-arena.com",
    "http://localhost:8788",
    "http://127.0.0.1:8788",
  ];
  const origin = context.request.headers.get("Origin");
  const allowOrigin = allowedOrigins.includes(origin)
    ? origin
    : "https://www.legendary-arena.com";

  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
```

**Key design decisions:**

- `BREVO_API_KEY` is read from `context.env`, never bundled into
  client code. The key exists only on the CF edge.
- `updateEnabled: true` means re-subscribing an existing contact
  just updates it — no error, no duplicate.
- `duplicate_parameter` from Brevo is treated as success (user
  sees "you're subscribed" not an error).
- CORS allows production, `localhost:8788`, and `127.0.0.1:8788`.
  This covers production, local `wrangler pages dev`, and CF
  Preview deploys that use the function's own origin. CF Preview
  branch URLs are same-origin to the function and don't need an
  explicit allowlist entry.
- `onRequestOptions` handles the CORS preflight.
- Content-Type guard: rejects non-JSON requests with 415 before
  attempting to parse the body.
- Input validation: rejects missing/invalid email server-side.
  Client-side validation is a UX courtesy, not a security boundary.
- Data flow: Browser → `POST /api/subscribe` → CF Pages Function
  → Brevo API. No subscriber data is stored in Cloudflare KV, D1,
  logs, or local persistence. Brevo is the sole system of record
  for subscriber data.
- No rate limiting is implemented at this layer. Protection is
  delegated to Cloudflare edge (basic abuse protection) and Brevo
  API limits. A future WP may introduce Turnstile or rate limiting
  if abuse is observed.

### Step 2 — Create the newsletter form partial

Create `layouts/_partials/newsletter-form.html`:

```html
{{- /* Newsletter signup form partial (WP-015).
       Rendered on the home page and in the footer.
       Submits to /api/subscribe (CF Pages Function).
       The form uses progressive enhancement: without JS the form
       still submits (POST to /api/subscribe returns JSON), but
       the intended UX is a fetch()-based submission with inline
       success/error messaging and no page reload.
*/ -}}
<form class="newsletter-form" action="/api/subscribe" method="POST" aria-label="Newsletter signup">
    <label for="newsletter-email-{{ .id }}">{{ .heading | default "Stay in the loop" }}</label>
    <p class="newsletter-desc">{{ .description | default "Get patch notes, new cards, and tournament announcements. No spam — unsubscribe any time." }}</p>
    <div class="newsletter-input-group">
        <input
            type="email"
            id="newsletter-email-{{ .id }}"
            name="email"
            placeholder="you@example.com"
            required
            autocomplete="email"
        />
        <button type="submit">Subscribe</button>
    </div>
    <p class="newsletter-status" role="status" aria-live="polite" hidden></p>
</form>
```

The `{{ .id }}` parameter disambiguates the two form instances
(home vs footer) so `id` attributes remain unique in the DOM.

### Step 3 — Add client-side JS

Create `assets/js/newsletter.js`:

```js
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button[type="submit"]');
      const status = form.querySelector(".newsletter-status");
      const email = input.value.trim();

      if (!email) return;

      status.textContent = "";
      status.className = "newsletter-status";
      status.hidden = true;
      btn.disabled = true;
      btn.textContent = "Sending…";

      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (res.ok) {
          status.textContent = data.message || "You’re subscribed! Check your inbox to confirm.";
          status.className = "newsletter-status success";
          input.value = "";
        } else {
          status.textContent = data.error || "Something went wrong. Please try again.";
          status.className = "newsletter-status error";
        }
      } catch {
        status.textContent = "Network error. Please try again.";
        status.className = "newsletter-status error";
      }

      status.hidden = false;
      btn.disabled = false;
      btn.textContent = "Subscribe";
    });
  });
});
```

Include this script via Hugo's asset pipeline. Add to
`layouts/_partials/extend_footer.html` (or create it if absent):

```html
{{ $newsletter := resources.Get "js/newsletter.js" | minify | fingerprint }}
<script src="{{ $newsletter.RelPermalink }}" defer></script>
```

If `extend_footer.html` already exists and has content, append to it
rather than overwriting.

### Step 4 — Integrate into the home page

Edit `layouts/index.html`. After the closing `{{- end }}` of the
`{{- with .Params.sections }}` block (the feature cards), add:

```html
<section class="newsletter-section">
  {{- partial "newsletter-form.html" (dict "id" "home" "heading" "Stay in the loop" "description" "Get patch notes, new cards, and tournament announcements. No spam — unsubscribe any time.") }}
</section>
```

This places the newsletter CTA below the feature cards and above
the fold's natural end — high visibility, after the value
proposition is established.

### Step 5 — Integrate into the footer

Edit `layouts/_partials/footer.html`. Insert the newsletter form
between the `</nav>` close (line 42) and the copyright block
(line 44):

```html
    {{- /* Newsletter signup (WP-015) — between nav and copyright. */ -}}
    <div class="footer-newsletter">
        {{- partial "newsletter-form.html" (dict "id" "footer" "heading" "Newsletter" "description" "Patch notes and new cards, straight to your inbox.") }}
    </div>
```

### Step 6 — Brand-consistent CSS

Add to `assets/css/extended/custom.css` under a new section header.
All values via `var(--la-*)` tokens:

Styling targets:

- `.newsletter-form` — max-width, center alignment
- `.newsletter-form label` — heading typography (font-size, weight,
  colour via `--la-color-text-primary`)
- `.newsletter-desc` — supporting text (colour via
  `--la-color-text-secondary`, smaller font)
- `.newsletter-input-group` — flex row, input + button side-by-side
- `.newsletter-input-group input` — background via
  `--la-color-bg-secondary`, border via `--la-color-border-primary`,
  text via `--la-color-text-primary`, focus ring via
  `--la-color-accent-primary`
- `.newsletter-input-group button` — styled as `.button` (existing
  utility class from WP-004, § 5.2 of custom.css), reuse or mirror
  the existing hero CTA styling
- `.newsletter-status.success` — colour via
  `--la-color-text-secondary` (not a class color — success states
  use neutral tones per §10 failure modes)
- `.newsletter-status.error` — colour via `--la-color-accent-primary`
  or a subtle warning tone from the brand palette
- `.footer-newsletter` — constrained width, centered, top/bottom
  padding, subtle top border via `--la-color-border-primary`
- `.newsletter-section` — full-width section on home page, centered
  content, vertical padding consistent with `.section` (feature
  cards)

**Constraints:**

- No raw hex. All colour, spacing, and typography values via
  `var(--la-*)` tokens.
- Must look correct in both light and dark mode (PaperMod's
  `html[data-theme]` toggle).
- The Subscribe button should be visually consistent with the
  existing "Play now" CTA (same token set, similar shape).
- Do NOT modify `static/brand-tokens.css`.

### Step 7 — Verify

1. **Build check (static output stability)**:
   ```powershell
   if (Test-Path public) { Remove-Item public -Recurse -Force }
   npm run build
   ```
   Build must succeed with no new warnings. The `functions/`
   directory is NOT part of Hugo's build — CF Pages deploys it
   separately. Two consecutive `npm run build` runs must produce
   byte-identical `public/`.

2. **Dev server check**:
   ```powershell
   hugo server --bind=127.0.0.1 --port=1313
   ```
   - Home page shows newsletter section below feature cards
   - Footer shows newsletter form above copyright on every page
   - Both forms render correctly in light and dark mode
   - Input field accepts text, button is styled as CTA
   - Form IDs are unique (`newsletter-email-home`,
     `newsletter-email-footer`)

3. **JS behaviour check** (requires CF Pages Function running
   locally or a mock):
   - Empty submit shows browser's native email validation
   - Valid email triggers fetch to `/api/subscribe`
   - Success response shows confirmation message
   - Error response shows error message
   - Status message clears on next submission attempt
   - Button disables during submission, re-enables after

   **Local CF Function testing:**
   ```powershell
   npx wrangler pages dev public --port 8788
   ```
   This serves the static site AND runs the Pages Functions
   locally. Test the form at `http://localhost:8788/`.
   Requires `BREVO_API_KEY` and `BREVO_LIST_ID` in a local
   `.dev.vars` file (NOT committed):
   ```
   BREVO_API_KEY=your-key-here
   BREVO_LIST_ID=2
   ```

4. **Accessibility check**:
   - Form has `aria-label`
   - Input has associated `<label>` via `for`/`id`
   - Label is styled as a visible heading (not just a form caption)
   - Status message has `role="status"` and `aria-live="polite"`
   - Tab order: input → button → status (logical)
   - Subscribe button has sufficient contrast in both modes

## Scope lock

This WP touches **only**:

| File | Change |
|---|---|
| `functions/api/subscribe.js` | **NEW** — CF Pages Function |
| `assets/js/newsletter.js` | **NEW** — client-side form handler |
| `layouts/_partials/newsletter-form.html` | **NEW** — form partial |
| `layouts/index.html` | **MODIFY** — add newsletter section |
| `layouts/_partials/footer.html` | **MODIFY** — add newsletter form |
| `layouts/_partials/extend_footer.html` | **CREATE or MODIFY** — JS include |
| `assets/css/extended/custom.css` | **MODIFY** — newsletter styling |
| `.dev.vars` | **NEW, GITIGNORED** — local Brevo credentials |

**Do NOT touch:**

- `hugo.toml` (no config changes needed)
- `static/brand-tokens.css` (token surface is locked)
- `themes/PaperMod/**` (submodule is locked)
- `content/_index.md` (home page content — the form is structural,
  not content)
- `layouts/_partials/header.html` (header is not in scope)

## Definition of Done

All must be true before marking WP-015 complete:

1. Newsletter form renders on the home page below feature cards
2. Newsletter form renders in the footer on every page
3. Both forms submit to `/api/subscribe` without page reload
4. CF Pages Function proxies to Brevo's contact API
5. `BREVO_API_KEY` exists ONLY in CF environment variables and
   `.dev.vars` — never in committed source
6. Success/error states display inline with `aria-live`
7. Form styling uses `var(--la-*)` tokens only — no raw hex
8. Light and dark mode both render correctly
9. `npm run build` produces byte-identical output across two runs
   (static build is not affected by the new function)
10. `.dev.vars` is in `.gitignore`
11. Double opt-in is configured in Brevo (manual verification)

## Exit criteria

This WP exits when:

- All DoD items verified
- Commit(s) on `main` with `WP-015:` prefix
- ROADMAP updated: WP-015 status → ✅ Done
- Decisions log entry in `01-VISION.md` (if any non-obvious
  decisions were made)

## Failure conditions

- **API key exposure**: If `BREVO_API_KEY` appears in any committed
  file, client-side JS, or HTML output → STOP. Rotate the key in
  Brevo immediately, remove from source, force-push if needed.
- **Build regression**: If `npm run build` fails or produces
  different output across runs → fix before proceeding.
- **Raw hex in CSS**: Any class-color or brand-color hex literal
  in the newsletter CSS → replace with token reference.
- **Submodule modification**: Any change to `themes/PaperMod/` →
  revert immediately.
