# WP-019 — Snipcart shopping cart with Stripe checkout

Add a bolt-on shopping cart to the Hugo marketing site using Snipcart
(cart/checkout layer) and Stripe (payment gateway). Product data lives
in Hugo content files; Snipcart reads it from HTML `data-item-*`
attributes at checkout time. No backend, no database, no platform
migration.

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
   **This WP expands scope beyond v1.** The vision doc lists
   "E-commerce, merch, paid content" as out of scope for v1
   (line 125) but NOT as a permanent non-goal. A companion update
   to the vision doc (WP-016 or separate amendment) must land
   before or alongside this WP to remove the out-of-scope entry
   and add a Decisions log entry. The `static-only` invariant
   (line 40: "No runtime APIs, no client-side data fetching from
   LA infrastructure") is preserved — Snipcart fetches from
   Snipcart's infrastructure, not LA's.
2. `docs/03-ROADMAP.md` — full WP list. This WP must be added to
   the roadmap before execution begins.
3. `docs/04-CONTENT-CONVENTIONS.md` — content layout conventions.
   Product pages will follow a new `shop` content type.
4. `docs/brand/palette.md` — all styling must use `var(--la-*)`
   tokens. No raw hex.
5. `docs/brand/strategy.md` — § 5 (Layout patterns) for product
   page layout; § 10 (Brand failure modes) for CTA styling.
6. `hugo.toml` — current config. Menu items are defined under
   `[[menu.main]]` and `[[menu.footer]]`.
7. `layouts/_partials/extend_head.html` — head extensions. Snipcart
   CSS preconnect and stylesheet go here.
8. `layouts/_partials/extend_footer.html` — footer extensions.
   Snipcart JS snippet goes here (after the existing newsletter
   script include).
9. `layouts/_partials/header.html` — nav header. Cart button goes
   here, between the menu and the search mount.
10. <https://docs.snipcart.com/v3/setup/installation> — Snipcart
    installation docs.
11. <https://docs.snipcart.com/v3/setup/products> — product
    definition via HTML attributes.
12. <https://docs.snipcart.com/v3/dashboard/payment-gateway> —
    Stripe gateway configuration.

## Current state

Locked under WP-001 → WP-015:

- Header (`layouts/_partials/header.html`) renders logo, menu,
  theme toggle, and Pagefind search. No cart element exists.
- Footer (`layouts/_partials/footer.html`) renders nav, newsletter,
  and copyright. No commerce links exist.
- `extend_head.html` loads brand tokens, Google Fonts, Schema.org,
  and Pagefind lazy-loader. No Snipcart assets.
- `extend_footer.html` loads `newsletter.js` via Hugo's asset
  pipeline. No Snipcart JS.
- No `content/shop/` directory exists.
- No product templates or archetypes exist.
- `hugo.toml` menu has: About (10), Blog (20), Brand (30).
- `static/brand-tokens.css` defines the token surface. Locked.
- `assets/css/extended/custom.css` is the canonical brand CSS file.

What's pending — **your job**:

- ❌ Snipcart account + Stripe gateway setup (manual prerequisite)
- ❌ Snipcart CSS/JS embed in `extend_head.html` and
  `extend_footer.html`
- ❌ Cart button in `layouts/_partials/header.html`
- ❌ Product archetype at `archetypes/shop.md`
- ❌ Product list template at `layouts/shop/list.html`
- ❌ Product single template at `layouts/shop/single.html`
- ❌ Sample product content in `content/shop/`
- ❌ "Shop" menu entry in `hugo.toml`
- ❌ Brand-consistent CSS for product pages and cart button
- ❌ Build verification (static output unchanged by Snipcart)
- ❌ Checkout flow verification (Snipcart test mode)

## Prerequisites (manual — not automatable)

Before starting the implementation steps, the site owner must:

1. **Create a Snipcart account** at <https://app.snipcart.com/>.
   Snipcart charges 2% per transaction + Stripe fees, with a
   $20/month minimum under $1,000 monthly sales.
2. **Copy the public API key** from Snipcart Dashboard >
   Account > API Keys. This is the key that goes in HTML — it is
   designed to be public (like Stripe's publishable key). It is
   NOT a secret.
3. **Configure Stripe as the payment gateway** in Snipcart
   Dashboard > Account > Payment Gateway. Connect your Stripe
   account.
4. **Set Snipcart to Test mode** initially. Test mode uses
   Stripe's test keys and no real charges are made. Toggle in
   Snipcart Dashboard > Account > API Keys.
5. **Configure allowed domains** in Snipcart Dashboard > Account
   > Domains & URLs. Add `www.legendary-arena.com` and
   `localhost` for local development.
6. **Store the public API key** as a Hugo build-time parameter.
   Two options (choose one):
   - Option A: Add to `hugo.toml` under `[params]` as
     `snipcartApiKey = "YOUR_PUBLIC_KEY"`. This is safe — the key
     is public by design.
   - Option B: Use an environment variable
     `HUGO_PARAMS_SNIPCARTAPIKEY` in CF Pages build settings.
     This keeps the key out of the repo but adds deploy config.
   Recommendation: Option A for simplicity. The key is public.

**Important: Snipcart product validation.** Snipcart crawls your
product page URLs server-side to validate prices before completing
any checkout. This means:

- Checkout only works on deployed/accessible URLs, not `localhost`.
- CF Pages preview deployments work for testing if the preview URL
  is added to Snipcart's allowed domains.
- The product's `data-item-url` must point to the page where
  Snipcart can find matching `data-item-*` attributes.

## Task

### Step 1 — Add Snipcart assets to the page

**1a.** Edit `layouts/_partials/extend_head.html`. After the
existing content (Pagefind section), add the Snipcart preconnect
and stylesheet:

```html
{{- /* §4. Snipcart cart (WP-019)
       Preconnect to Snipcart CDN and load the default cart theme.
       The JS is loaded in extend_footer.html (deferred). */ -}}
<link rel="preconnect" href="https://cdn.snipcart.com">
<link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.css">
```

**1b.** Edit `layouts/_partials/extend_footer.html`. After the
existing newsletter JS include, add the Snipcart container and
script:

```html
{{- /* Snipcart cart container + SDK (WP-019).
       The hidden div is Snipcart's mount point — it injects the
       cart UI here. data-api-key is the PUBLIC key (not a secret).
       Snipcart docs: https://docs.snipcart.com/v3/setup/installation */ -}}
<div hidden id="snipcart" data-api-key="{{ site.Params.snipcartApiKey }}"></div>
<script async src="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js"></script>
```

**Design decisions:**

- The Snipcart `<div>` uses `hidden` — Snipcart's JS unhides and
  populates it when the cart opens.
- The API key comes from `site.Params.snipcartApiKey` (set in
  `hugo.toml` or via env var). This is Snipcart's **public** key,
  equivalent to Stripe's publishable key. It is designed to appear
  in client HTML.
- The Snipcart **secret** key (used for webhooks, API calls from
  your server) never appears in this repo. It stays in the Snipcart
  dashboard.
- `async` on the script keeps it off the critical path.
- Snipcart CSS is loaded in `<head>` (not async) to prevent FOUC
  when the cart opens. It's ~15 KB gzipped.

### Step 2 — Add cart button to the header

Edit `layouts/_partials/header.html`. Between the closing `</ul>`
of the menu (line 128) and the Pagefind search mount (line 142),
add the cart trigger:

```html
        {{- /* Snipcart cart button (WP-019).
               .snipcart-checkout is a Snipcart-reserved class that
               opens the cart on click. .snipcart-items-count is
               auto-populated by Snipcart JS with the item count. */ -}}
        <button class="snipcart-checkout header-cart" aria-label="Shopping cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span class="snipcart-items-count"></span>
        </button>
```

**Placement rationale:** The cart button sits between the nav menu
and the search input — a natural "actions" zone. It uses the same
SVG icon style (17×17, stroke-based) as the existing theme toggle
and external-link icons for visual consistency.

### Step 3 — Create the product archetype

Create `archetypes/shop.md`:

```markdown
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
type: shop
price: 0.00
sku: ""
image: ""
weight: 10
description: ""
---

Product description goes here.
```

This gives `hugo new shop/my-product.md` a ready-to-fill template
with all the front matter fields the product templates expect.

### Step 4 — Create product templates

**4a.** Create `layouts/shop/list.html` — the `/shop/` index page:

```html
{{- define "main" }}
<header class="page-header">
    <h1>{{ .Title | default "Shop" }}</h1>
    {{- with .Description }}
    <p class="page-description">{{ . }}</p>
    {{- end }}
</header>

<div class="product-grid">
    {{- range where .Pages "Params.draft" "ne" true }}
    {{- $product := . }}
    <article class="product-card">
        {{- with .Params.image }}
        <a href="{{ $product.RelPermalink }}">
            <img src="{{ . }}" alt="{{ $product.Title }}" class="product-card-image" loading="lazy">
        </a>
        {{- end }}
        <div class="product-card-body">
            <h2><a href="{{ .RelPermalink }}">{{ .Title }}</a></h2>
            <p class="product-card-price">${{ printf "%.2f" .Params.price }}</p>
            <p class="product-card-desc">{{ with .Description }}{{ . }}{{ else }}{{ .Params.description }}{{ end }}</p>
            <button
                class="snipcart-add-item button"
                data-item-id="{{ with .Params.sku }}{{ . }}{{ else }}{{ .File.Path }}{{ end }}"
                data-item-name="{{ .Title }}"
                data-item-price="{{ .Params.price }}"
                data-item-url="{{ .Permalink }}"
                data-item-description="{{ with .Description }}{{ . }}{{ else }}{{ .Params.description }}{{ end }}"
                {{- with .Params.image }}
                data-item-image="{{ . }}"
                {{- end }}>
                Add to cart
            </button>
        </div>
    </article>
    {{- end }}
</div>
{{- end }}
```

**4b.** Create `layouts/shop/single.html` — individual product
page:

```html
{{- define "main" }}
<article class="product-detail">
    <div class="product-detail-layout">
        {{- with .Params.image }}
        <div class="product-detail-image">
            <img src="{{ . }}" alt="{{ $.Title }}" loading="lazy">
        </div>
        {{- end }}
        <div class="product-detail-info">
            <h1>{{ .Title }}</h1>
            <p class="product-detail-price">${{ printf "%.2f" .Params.price }}</p>
            <div class="product-detail-body">
                {{ .Content }}
            </div>
            <button
                class="snipcart-add-item button"
                data-item-id="{{ with .Params.sku }}{{ . }}{{ else }}{{ .File.Path }}{{ end }}"
                data-item-name="{{ .Title }}"
                data-item-price="{{ .Params.price }}"
                data-item-url="{{ .Permalink }}"
                data-item-description="{{ with .Description }}{{ . }}{{ else }}{{ .Params.description }}{{ end }}"
                {{- with .Params.image }}
                data-item-image="{{ . }}"
                {{- end }}>
                Add to cart
            </button>
        </div>
    </div>
</article>
{{- end }}
```

**Design decisions:**

- `data-item-url` uses `.Permalink` (absolute URL). Snipcart
  crawls this URL to validate the product price server-side before
  completing checkout. This is a security feature — it prevents
  client-side price tampering.
- `data-item-id` uses `.Params.sku` with a fallback to `.File.Path`
  if SKU is empty. Each product should have a unique SKU; the
  fallback prevents undefined cart behavior during development.
- The "Add to cart" button uses the existing `.button` utility
  class (WP-004, § 5.2 of custom.css) for visual consistency with
  other CTAs.
- Product images use `loading="lazy"` since they're below the fold
  on the list page.
- Price display uses `printf "%.2f"` for deterministic two-decimal
  formatting (prevents `19.9` rendering instead of `19.99`).
- Description uses a fallback chain: `.Description` (Hugo's
  auto-summary) → `.Params.description` (front matter). Ensures
  non-empty `data-item-description` for Snipcart.
- The list template captures `$product := .` before entering
  `with .Params.image` blocks so page-level fields (`.RelPermalink`,
  `.Title`) remain accessible after dot rebinding.
- The list template filters out draft products (`where .Pages
  "Params.draft" "ne" true`) so you can stage products without
  publishing them.

### Step 5 — Create sample product content

Create `content/shop/_index.md`:

```markdown
---
title: "Shop"
description: "Legendary Arena gear and accessories."
---
```

Create at least one sample product, e.g.
`content/shop/sample-product.md`:

```markdown
---
title: "Sample Product"
date: 2026-05-12
draft: true
type: shop
price: 19.99
sku: "LA-SAMPLE-001"
image: "/images/shop/sample-product.jpg"
weight: 10
description: "A sample product for testing the checkout flow."
---

This is a sample product used to validate the Snipcart integration
in test mode. Set `draft: false` and replace with real product data
when ready to go live.
```

The sample product starts as `draft: true` — it won't appear on
the published site until explicitly un-drafted with real product
data. **The sample product MUST remain `draft: true` in the `main`
branch.** Publishing test SKUs to production is a release failure.

### Product validity invariant

Every non-draft product MUST define:

- `price` > 0
- `sku` (non-empty, unique across all products)
- `image` (optional but recommended)

A build is considered invalid if any non-draft product has:

- Empty or missing `sku`
- Duplicate `sku` shared with another product
- `price` ≤ 0

The `data-item-id` fallback to `.File.Path` (Step 4) is a safety
net for development only — it must not be relied on in production.

### Product URL integrity invariant

For every product, `data-item-url` MUST equal the canonical public
URL of the product page. Snipcart crawls this URL server-side to
validate the price before completing checkout.

Violation symptoms:

- Checkout fails silently
- Snipcart cannot validate price → cart rejects the item
- No client-side error — the failure is opaque

Test requirement: the product page, when fetched directly at its
`data-item-url`, must render the same `data-item-*` attributes
that were present when the item was added to cart.

### Backend invariant

This WP MUST NOT introduce:

- Server-side APIs or functions
- Dynamic fetches to LA-owned services
- Runtime data dependencies

All commerce behavior remains:

- Client-side (Snipcart JS)
- Static-site driven (Hugo content files)
- Third-party hosted (Snipcart + Stripe infrastructure)

The `functions/` directory (used by WP-015 for newsletter) is NOT
touched by this WP.

### External dependency pin

Snipcart CSS and JS versions MUST remain pinned (`v3.7.1` at time
of writing). Do NOT use "latest" or unversioned CDN URLs.

Any version upgrade requires:

- Visual regression check (cart overlay, product buttons)
- Checkout validation in test mode
- Lighthouse re-run (all four categories ≥ 90)

Pin the version in both `extend_head.html` (CSS) and
`extend_footer.html` (JS). Both must reference the same version.

### Step 6 — Add "Shop" to the navigation

Edit `hugo.toml`. Add a new `[[menu.main]]` entry and a matching
`[[menu.footer]]` entry:

```toml
[[menu.main]]
  name = "Shop"
  url = "/shop/"
  weight = 25
```

```toml
[[menu.footer]]
  name = "Shop"
  url = "/shop/"
```

**Weight 25** places Shop between Blog (20) and Brand (30) in the
header nav. This is the default — do NOT colocate with the primary
CTA (Play) or place Shop first unless a strategic pivot is approved.
Commerce is a secondary function of this site; the primary funnel
remains play.legendary-arena.com.

### Step 7 — Brand-consistent CSS

Add to `assets/css/extended/custom.css` under a new section header.
All values via `var(--la-*)` tokens:

Styling targets:

- `.header-cart` — button reset (no border/background), flex-center,
  same dimensions as theme toggle. Color via `--la-color-text-primary`.
  Hover: `--la-color-accent-primary`.
- `.header-cart .snipcart-items-count` — small badge, positioned
  top-right of the cart icon. Background via
  `--la-color-accent-primary`, text via `--la-color-text-on-accent`.
  Hidden when empty (Snipcart adds content dynamically).
- `.header-cart .snipcart-items-count:empty` — `display: none`.
  Prevents an empty badge from rendering before Snipcart JS
  populates it, and keeps the icon clean when the cart is empty.
- `.product-grid` — CSS Grid, responsive: 1 column on mobile,
  2 columns at `--la-breakpoint-sm`, 3 at `--la-breakpoint-md`.
  Gap via `--la-space-lg`.
- `.product-card` — border via `--la-color-border-primary`, border-radius,
  overflow hidden. Background via `--la-color-bg-secondary`.
- `.product-card-image` — full width, aspect-ratio 4/3, object-fit cover.
- `.product-card-body` — padding via `--la-space-md`.
- `.product-card-price` — font-weight 600, color via
  `--la-color-text-primary`.
- `.product-card-desc` — color via `--la-color-text-secondary`,
  line-clamp 2.
- `.product-detail-layout` — flex row on desktop, column on mobile.
  Gap via `--la-space-xl`.
- `.product-detail-image img` — max-width 100%, border-radius.
- `.product-detail-price` — font-size `--la-font-size-xl`,
  font-weight 700.
- `.product-detail-body` — prose-width, margin-bottom before the
  Add to cart button.

**Constraints:**

- No raw hex. All colour, spacing, and typography values via
  `var(--la-*)` tokens.
- Must render correctly in both light and dark mode (PaperMod's
  `html[data-theme]` toggle).
- "Add to cart" button must be visually consistent with the
  existing "Play now" CTA (same `.button` class or mirrored tokens).
- Do NOT modify `static/brand-tokens.css`.

### Step 8 — Snipcart theming (optional, recommended)

Snipcart's cart overlay can be themed via CSS custom properties.
If the default Snipcart theme clashes with the brand, add overrides
in `custom.css`:

```css
/* Snipcart brand overrides (WP-019) */
.snipcart-modal__container {
    font-family: var(--la-font-body);
}
.snipcart-cart-header {
    background: var(--la-color-bg-primary);
}
.snipcart-btn--primary {
    background: var(--la-color-accent-primary);
    color: var(--la-color-text-on-accent);
}
```

Exact overrides depend on visual testing. The goal is that the cart
doesn't look like a foreign widget — it should feel like part of
the site.

### Step 9 — Verify

1. **Build check (static output stability)**:
   ```powershell
   if (Test-Path public) { Remove-Item public -Recurse -Force }
   npm run build
   ```
   Build must succeed with no new warnings. Two consecutive
   `npm run build` runs must produce byte-identical `public/`.
   Snipcart's JS/CSS are loaded from CDN, not bundled — the
   static output should only grow by the new product HTML pages
   and template files.

   Snipcart integration MUST NOT introduce:
   - Timestamped inline content
   - Build-time randomness
   - Environment-dependent rendering

   Only static HTML output may change.

2. **Dev server check**:
   ```powershell
   hugo server --bind=127.0.0.1 --port=1313
   ```
   - `/shop/` page renders product grid (empty if all products
     are draft, which is expected for the sample)
   - Set sample product `draft: false` temporarily to verify:
     - Product card renders with image, title, price, description
     - Product detail page renders at `/shop/sample-product/`
     - "Add to cart" button is present and styled
   - Cart icon appears in the header between menu and search
   - Cart icon click opens the Snipcart cart overlay
   - Snipcart cart loads without console errors
   - Light and dark mode both render correctly
   - Cart overlay is visually acceptable (apply Step 8 if not)

3. **Checkout flow check (requires Snipcart test mode + deployed
   preview)**:
   - Deploy to a CF Pages preview branch
   - Add preview URL to Snipcart allowed domains
   - Add sample product to cart
   - Proceed to checkout
   - Use Stripe test card (`4242 4242 4242 4242`, any future
     expiry, any CVC)
   - Verify order appears in Snipcart dashboard
   - Verify order confirmation page renders

   **Note:** Checkout will NOT work on `localhost` because
   Snipcart's server-side product validation cannot reach local
   URLs. This is expected — the preview deploy is the test path.

4. **Accessibility check**:
   - Cart button has `aria-label="Shopping cart"`
   - Product images have `alt` text (product title)
   - "Add to cart" buttons are focusable and keyboard-accessible
   - Product grid is navigable via tab
   - Snipcart's own cart overlay handles its own a11y (Snipcart
     provides this by default)

5. **Lighthouse check**:
   - Performance ≥ 90 (Snipcart CSS is ~15 KB gzipped, JS is
     ~40 KB gzipped async — should not tank LCP)
   - Accessibility ≥ 90
   - Best Practices ≥ 90
   - SEO ≥ 90

6. **Business validation checkpoint (before enabling Live mode)**:

   Compute per-product margin:
   `(net price) − (Snipcart fee: 2%) − (Stripe fee: ~2.9% + $0.30) − (product cost)`

   If margin ≤ 0 for any product, that product MUST NOT be
   published (`draft: true`). This WP enables revenue capture;
   it does NOT guarantee profitability. Margin must be validated
   before switching Snipcart from Test to Live mode.

## Scope lock

This WP touches **only**:

| File | Change |
|---|---|
| `layouts/_partials/extend_head.html` | **MODIFY** — add Snipcart CSS preconnect + stylesheet |
| `layouts/_partials/extend_footer.html` | **MODIFY** — add Snipcart container + JS |
| `layouts/_partials/header.html` | **MODIFY** — add cart button |
| `layouts/shop/list.html` | **NEW** — product listing template |
| `layouts/shop/single.html` | **NEW** — product detail template |
| `archetypes/shop.md` | **NEW** — product content archetype |
| `content/shop/_index.md` | **NEW** — shop section index |
| `content/shop/sample-product.md` | **NEW** — sample product (draft) |
| `hugo.toml` | **MODIFY** — add Shop menu entry + snipcartApiKey param |
| `assets/css/extended/custom.css` | **MODIFY** — product + cart styling |

**Do NOT touch:**

- `static/brand-tokens.css` (token surface is locked)
- `themes/PaperMod/**` (submodule is locked)
- `functions/**` (no server-side code needed — Snipcart handles
  checkout; CF Pages Functions are not involved)
- `layouts/_partials/footer.html` (footer nav unchanged)
- `layouts/index.html` (home page unchanged — products live at
  `/shop/`, not on the home page)
- `assets/js/newsletter.js` (newsletter is independent)

## Definition of Done

All must be true before marking WP-019 complete:

1. Snipcart JS and CSS load on every page without console errors
2. Cart button renders in the header on every page
3. `/shop/` page renders a product grid
4. Individual product pages render with full detail and "Add to
   cart" button
5. "Add to cart" adds the product to the Snipcart cart
6. Checkout completes end-to-end in Snipcart test mode with a
   Stripe test card on a deployed preview
7. Order appears in Snipcart merchant dashboard after test checkout
8. At least one shipping method is configured (flat rate or free)
9. Product content is authored via Hugo content files with front
   matter (portable, not locked to Snipcart)
10. Snipcart public API key is stored in `hugo.toml` or CF Pages
    env var — NOT the secret key
11. All styling uses `var(--la-*)` tokens — no raw hex
12. Light and dark mode both render correctly
13. `npm run build` produces byte-identical output across two runs
14. Lighthouse ≥ 90 on Performance, Accessibility, Best Practices,
    SEO (home page and `/shop/`)

## Exit criteria

This WP exits when:

- All DoD items verified
- Commit(s) on `main` with `WP-019:` prefix
- ROADMAP updated: WP-019 status added and marked appropriately
- Decisions log entry in `01-VISION.md` for the e-commerce scope
  expansion (may be handled by vision doc amendment WP)

## Failure conditions

- **Secret key exposure**: If a Snipcart secret/API key (not the
  public key) appears in any committed file → STOP. Rotate the key
  in Snipcart immediately.
- **Build regression**: If `npm run build` fails or produces
  different output across runs → fix before proceeding.
- **Raw hex in CSS**: Any class-color or brand-color hex literal
  in the commerce CSS → replace with token reference.
- **Submodule modification**: Any change to `themes/PaperMod/` →
  revert immediately.
- **Duplicate SKU**: If two or more non-draft products share the
  same `sku` value → fix immediately. Cart behavior is undefined
  with duplicate item IDs.
- **Lighthouse regression**: If any Lighthouse category drops below
  90 after Snipcart integration → investigate. Likely causes:
  render-blocking CSS (move to preload), JS bundle size (verify
  async loading), or CLS from cart button injection.

## Risk register

1. **Snipcart product validation requires deployment.** Checkout
   does not work on localhost. Mitigation: use CF Pages preview
   deploys for testing. Document this clearly so future developers
   don't waste time debugging local checkout failures.
2. **Transaction fee economics.** Snipcart charges 2% + Stripe
   fees, $20/month minimum under $1k monthly sales. Validate
   margin impact against expected volume and SKU mix before going
   live.
3. **Snipcart CDN dependency.** Cart functionality depends on
   `cdn.snipcart.com` availability. Mitigation: the site itself
   remains static and functional — only the cart widget is
   affected by a Snipcart outage. Product pages still render;
   only "Add to cart" and checkout are impacted.
4. **Snipcart CSS size vs Lighthouse budget.** The default
   Snipcart theme is ~15 KB gzipped. Monitor impact on LCP. If
   it pushes below 90, options: (a) lazy-load the CSS the same
   way Pagefind is lazy-loaded, or (b) self-host a trimmed
   subset. Defer optimization unless the budget is actually blown.

## Follow-on work (not in scope)

- **Custom shipping webhooks** — if flat-rate shipping outgrows
  the product line, Snipcart supports webhook-based shipping
  calculation. Separate WP.
- **Custom tax webhooks** — Snipcart supports webhook-based tax
  calculation when built-in rules are insufficient. Separate WP.
- **Product catalog automation** — ACD distributor data ingestion,
  dynamic inventory sync, drop-ship automation. Separate WP(s).
- **Home page featured products** — a "Featured" section on the
  home page pulling from the shop. Separate WP.
- **Cart abandonment / analytics** — Snipcart provides webhook
  events for abandoned carts. Separate WP.
- **Snipcart Live mode activation** — switching from test to live
  is a config change in the Snipcart dashboard, not a code change.
  Documented in the operational runbook (this WP's docs output).
