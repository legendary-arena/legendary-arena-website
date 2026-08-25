# Task 07 — Open Graph Share-Image Brief

**Objective:** Create a brief for Open Graph share images (1200×630 PNG) per page type — home, blog posts, shop pages, and registry link. Establish naming, overlay copy, and composition rules per ER-013.

**Owner:** Jeff Jensen  
**Phase:** P2 (distribution + discoverability)  
**Est. effort:** ~30 minutes  
**Dependencies:** Task 06 (registry landing page established) — understand the full page structure before designing OG images

---

## Inputs you need

1. **`docs/brand/palette.md`** and **`docs/brand/typography.md`** — Know the color scheme, brand fonts (Bebas Neue for display, [body font] for text), and spacing rules. OG images must be on-brand.
2. **`docs/brand/strategy.md`** — Tone and voice.
3. **Live site pages** — https://www.legendary-arena.com/ (home), a blog post, the about page. Imagine what preview text / image you'd want if someone shared each on X / Facebook / LinkedIn.
4. **WP-008 (SEO baseline)** — OG meta tags are already in place; this brief specifies the actual PNG images and composition rules.

---

## Task description

Open Graph (OG) images appear when someone shares a link on social media. Instead of a generic card, Legendary Arena can show intentional, branded previews that improve CTR.

You're defining the **image composition rules** for 4 page types (not creating the actual PNGs — that's design work):

### Page type 1: Home page
**Current OG image:** [TBD — check if one exists]
**Intended message:** "Skill-first deck-building. Play now."

Generate composition rules:

```
Filename: og-home.png
Dimensions: 1200×630 px (16:8.4 aspect ratio, standard for OG)
Background: [Brand color — maroon gradient or navy solid?]
Primary text: "Legendary Arena" (center, large, Bebas Neue, white)
Secondary text: "Skill decides every turn" (smaller, supporting, white)
Visual element: [Card icon? Arena icon? Just typography?]
Safe margin: 60px on all sides (text must be visible if cropped)
```

Provide 2 variants (e.g., maroon gradient vs navy solid background) with rationale for each.

### Page type 2: Blog posts
**Intended message:** Each post has its own story; the OG image should hint at the post topic.

Generate composition rules (generic template, not per-post):

```
Filename pattern: og-post-{slug}.png
Dimensions: 1200×630 px
Background: Brand color (maroon / navy — consistent across all posts)
Primary text: [Post title, 1–2 lines, largest text, white, Bebas Neue]
Secondary text: [Post date or category tag, smaller, supporting text color]
Visual element: [Optional: thin line separator, category tag, or small icon]
Safe margin: 60px
```

Guidance:
- Post title should be readable at small sizes (Twitter preview is ~504×264)
- Post date can be in small text bottom-right or bottom-left
- No featured image in the OG preview (or optional small thumbnail)

Provide 1 variant with example post title.

### Page type 3: Shop / Product pages
**Intended message:** "Buy Legendary merch / diorama products."

Generate composition rules:

```
Filename pattern: og-shop-{product-slug}.png
Dimensions: 1200×630 px
Background: Brand color or product-specific color
Primary text: [Product name, center or left-aligned]
Secondary text: [Price / value prop — e.g., "Limited edition", "Free shipping"]
Visual element: [Product image / icon in a square or circle?]
Safe margin: 60px
```

Guidance:
- Product name should be the hero text
- Include price or call-to-action if appropriate
- Optional product image (if it's iconic/recognizable, good for CTR)

Provide 1 variant with example product.

### Page type 4: Special pages (About, Press, Registry bridge)
**Intended message:** "Learn about Legendary Arena."

Generate composition rules:

```
Filename pattern: og-{page-slug}.png
Dimensions: 1200×630 px
Background: Brand color (maroon / navy)
Primary text: [Page title — e.g., "About Legendary Arena", "Press Kit"]
Secondary text: [Tagline or value prop]
Visual element: [Optional: icon or thin line separator]
Safe margin: 60px
```

Guidance:
- Simple and clear (these pages are less frequently shared, but consistency matters)
- Match the brand aesthetic

Provide 1 variant for the About page.

---

## Output format

One markdown file: `og-share-images.md`

Structure as follows:

```md
# Open Graph Share-Image Brief

## Executive Summary

- **Standard dimensions:** 1200×630 px (OG standard)
- **Safe margin:** 60px on all sides (Twitter/Facebook may crop)
- **Primary fonts:** Bebas Neue (display), [body font] (body)
- **Color palette:** [brand maroon, navy, white, accent colors]
- **Number of image types:** 4 (home, blog post, shop, special pages)

---

## Design principles

1. **Readability at small sizes** — The preview image appears at ~504×264 on X/Twitter, ~500×261 on Facebook. Text must be legible at these sizes.
2. **Scannability** — Visitor should understand the preview in <2 seconds.
3. **Consistency** — All OG images share the same brand aesthetic, but page type is distinguishable.
4. **No data fetching** — All OG images are static files, pre-generated at build time (no dynamic overlays).

---

## Page type 1: Home page

### Composition rule set

```
Filename: og-home.png
Dimensions: 1200×630 px
Background: [Describe the background — e.g., "Maroon gradient from top-left to bottom-right (#7a1d1f to #c92a30)"]
Primary text: "Legendary Arena" (Bebas Neue, ~80px, white, center, top-aligned around 200px)
Secondary text: "Skill decides every turn" (body font, ~32px, white, center, 100px below primary)
Visual element: [Optional: thin line separator at 400px vertical, or brand icon]
Safe margin: 60px on all sides
Notes: [Any special instructions — e.g., "Avoid transparent elements; solid colors only"]
```

### Variant A: Maroon gradient background
[Description + rationale]

### Variant B: Navy solid background
[Description + rationale]

**Recommendation:** [Which variant, and why]

---

## Page type 2: Blog posts

### Composition rule set

```
Filename pattern: og-post-{slug}.png
Dimensions: 1200×630 px
Background: [Navy solid — consistent across all posts]
Primary text: [Post title, ~60–70px, white, Bebas Neue, left-aligned with 60px margin, max 2 lines]
Secondary text: [Post date (YYYY-MM-DD) or category tag, ~18px, light gray, left-aligned below title, ~50px gap]
Visual element: [Thin line separator above date, or category tag as a small rounded box]
Safe margin: 60px
Notes: [Tested readable at 504×264 (Twitter) and 500×261 (Facebook)]
```

### Example

```
Primary text: "Introducing the Registry Viewer"
Secondary text: "May 7, 2026"
Result: [Clear, scannable, brand-consistent]
```

---

## Page type 3: Shop / Product pages

### Composition rule set

```
Filename pattern: og-shop-{product-slug}.png
Dimensions: 1200×630 px
Background: [Maroon solid or product-accent color]
Primary text: [Product name, ~70px, white, Bebas Neue, center or left-aligned]
Secondary text: [Price / value prop, ~28px, supporting color, below primary, 60px gap]
Visual element: [Optional product image in a 250×250 px square or circle, positioned right side]
Safe margin: 60px
Notes: [If product image included, ensure it's high-contrast against background]
```

### Example

```
Product: "Legendary Arena Diorama Starter Set"
Price / tagline: "$49.99 — Collect & Display"
Result: [Clear product positioning, CTR-optimized]
```

---

## Page type 4: Special pages (About, Press, Registry)

### Composition rule set

```
Filename pattern: og-{page-slug}.png
Dimensions: 1200×630 px
Background: [Navy solid — consistent with blog]
Primary text: [Page title, ~60px, white, Bebas Neue, center]
Secondary text: [Tagline, ~24px, supporting color, center, 50px below primary]
Visual element: [Optional thin line separator]
Safe margin: 60px
```

### Example: About page

```
Primary text: "About Legendary Arena"
Secondary text: "Skill-first deck-building. Digital, instant, free."
```

### Example: Press kit

```
Primary text: "Press Kit"
Secondary text: "For journalists, partners, and evaluators"
```

---

## Technical implementation notes

- **Generation tool:** [TBD — Figma template? Node.js image generation? Manual PNG creation?]
- **Location:** `static/og/*.png` (or similar)
- **Hugo integration:** Front-matter `image: /og/og-{slug}.png` for each page
- **Fallback:** If no specific OG image, use `og-home.png` as default
- **Testing:** Validate via [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and [X Card Validator](https://cards-dev.twitter.com/validator)

---

## Assumptions

- All OG images are static (pre-generated, not dynamic)
- Dimensions are fixed at 1200×630 (standard for Facebook/X/LinkedIn)
- Text must be readable at 504×264 (Twitter preview size)
- Images are always served from `www.legendary-arena.com` (not cross-origin)
```

---

## Success criteria

- [x] 4 page-type composition rule sets defined (home, blog, shop, special)
- [x] Each set includes dimensions, text sizes, colors, visual elements
- [x] Variants provided for home page (2 options)
- [x] Example text provided for blog and shop (so designer can test readability)
- [x] Safe margins and readability at small sizes noted
- [x] Technical implementation path (Hugo integration, testing tools) outlined

---

## Constraints

- **Static images.** No dynamic overlays, no fetching post titles at build time, no rendering on-the-fly.
- **One primary text + one secondary text max.** Keep it scannable.
- **Readable at small sizes.** Test mentally at 504×264 and 500×261.
- **No branded complexity.** The OG preview is a teaser, not a billboard.

---

## Do / Don't

**DO:**
- Make the primary message (page title, product name, post headline) the dominant text
- Use high-contrast colors (white text on maroon/navy works; light text on light background doesn't)
- Include a date or category tag for blog posts (helps with freshness + context)
- Test readability by squinting at your designs (simulate small-screen reading)
- Keep a consistent background color across page types (maroon for home, navy for blog/special)

**DON'T:**
- Use small text (< 20px) for primary information
- Embed photo/complex images (simplicity beats photorealism in OG previews)
- Assume the full 1200×630 will be visible (platforms crop; test at 504×264)
- Change fonts between page types (consistency is part of brand recognition)
- Include social buttons, CTAs, or other chrome (the share itself is the CTA)
