# Task 05 — 404 Recovery Funnel

**Objective:** Draft a branded 404 page that recovers lost traffic with highest-value next-step actions (Play, About, Press, Blog, Newsletter signup) per ER-009.

**Owner:** Jeff Jensen  
**Phase:** P1 (resilience + conversion from broken links)  
**Est. effort:** ~30 minutes  
**Dependencies:** None (parallel with Task 04)

---

## Inputs you need

1. **`01-VISION.md`** — Read the "Permanent non-goals" section. Key principle: "All cross-site navigation must degrade gracefully if a target is unavailable (a broken link is acceptable; a broken page is not)."
2. **ER-009** in **ENHANCEMENT-REQUESTS.md** — The enhancement request that promotes this work. Read lines 439–472.
3. **`docs/brand/strategy.md`** — Tone: confident, empowering (not apologetic about the 404).
4. **Current site structure** — Know the main pages: home, about, press (if exists), blog, and what the shop URL is.

---

## Task description

A visitor lands on a broken link. Instead of a generic "404 Not Found," Legendary Arena's 404 page:

1. **Acknowledges the situation** (friendly, brief) — "This page doesn't exist, but here's where to go."
2. **Offers top actions** (ranked by priority) — Play, Blog, About, Press, Newsletter
3. **Provides search** (if Pagefind is live) — "Search for what you were looking for"
4. **Reinforces brand** — Uses the same tone, colors, header/footer as the rest of the site

### Section 1: The headline + subtext (brief acknowledgment)

Generate 3 variants:

**Variant A: Empowering angle**
> **Page not found.**
> 
> It's not here anymore — but the arena is still open. Here's where to go next.

**Variant B: Light-touch angle**
> **404 — That page took a bow.**
> 
> We moved it or removed it, but the rest of the site is still here.

**Variant C: Practical angle**
> **Oops. Dead link.**
> 
> This page doesn't exist, but we've got what you're probably looking for below.

Choose the most on-brand variant (likely Variant A: empowering, matches the positioning).

### Section 2: Top actions (ranked CTAs)

Generate a ranked list of 5 actions in order of priority:

1. **"Play now"** → play.legendary-arena.com
   - Primary CTA (always)
   - Reinforces why they came here in the first place
   
2. **"About Legendary Arena"** → /about/
   - If they're lost, they might want to understand what this is
   
3. **"Read the blog"** → /posts/
   - Content-driven visitor; they might find what they want here
   
4. **"Press kit"** → /press/ (if exists)
   - For evaluators, partners, press who landed on a stale link
   
5. **"Newsletter signup"** → [inline form or link]
   - Lowest priority but still valuable; don't force it, offer it

### Section 3: Search (optional, if Pagefind is live)

Generate 1 variant:

> **Can't find it? Search the site.**
> 
> [Search box — pre-filled with `<input id="la-search" placeholder="Search articles, guides, more...">`]

(The actual Pagefind UI will replace this stub on render.)

### Section 4: Footer + reassurance

Generate 1 variant:

> **Still stuck?** Email [support or press contact] and let us know what you were looking for. We'll point you in the right direction.

---

## Output format

One markdown file: `404-recovery.md`

Structure as follows:

```md
# 404 Page — Lost? Here's where to go.

## Executive Summary

- **Headline variant:** [which one to use]
- **Top action:** "Play now" (always primary)
- **Fallback:** Search + contact info

---

## Headline variants

### Variant A: Empowering
[copy]

### Variant B: Light-touch
[copy]

### Variant C: Practical
[copy]

**Recommendation:** [which one, and why]

---

## Top actions (ranked by priority)

1. **Play now** → play.legendary-arena.com
2. **About Legendary Arena** → /about/
3. **Read the blog** → /posts/
4. **Press kit** → /press/
5. **Join our newsletter** → [link or form]

**Layout note:** These should render as 5 prominent buttons or cards, one per line or in a 2-column grid on mobile.

---

## Search section (if Pagefind is live)

> Can't find it? Search the site.
>
> [Search stub — Pagefind UI replaces on render]

---

## Contact fallback

> Still stuck? Email [contact] and let us know what you were looking for.

---

## Implementation notes

- **Page should render:** `404.html` in Hugo templates (overrides PaperMod's default)
- **Tone:** Match the brand voice (confident, not apologetic)
- **Header + footer:** Use the same as every other page (consistency)
- **Mobile:** Buttons should stack vertically on narrow screens (375×667)
- **No API calls:** All content is static; Pagefind is optional (graceful if offline)

---

## Assumptions

- This page renders when a visitor hits any non-existent path (e.g., `/old-post/`, `/typo/`)
- The header and footer are the same as the rest of the site
- Pagefind search may or may not be live when this page launches
- The "still stuck?" email link works (email address must be configured)
```

---

## Success criteria

- [x] Headline is friendly but not apologetic (empowering tone)
- [x] 5 actions are ranked by priority (Play first, newsletter last)
- [x] CTA buttons are clear and clickable
- [x] Search stub is included (marked as optional/Pagefind-dependent)
- [x] Contact info is included as a fallback
- [x] Tone matches brand voice (confident, not hype)

---

## Constraints

- **Static page.** No dynamic detection of "what were they looking for" (that's speculative).
- **No blame.** Don't say "You broke something" or "You took a wrong turn." Ownership is on the site.
- **Graceful degradation.** If Pagefind is offline, the page still works (search just won't function).
- **Brand consistency.** Use the same header/footer/tokens as the rest of the site.

---

## Do / Don't

**DO:**
- Make the primary CTA obvious (Play now should be the first / most prominent action)
- Keep the message brief (visitors are frustrated; get to the point)
- Use the brand voice (confident, skilled, straightforward)
- Test mentally on mobile (buttons should be large and tappable)
- Think about the visitor's mindset: "I found something that interested me, but the link is dead. Where do I go now?"

**DON'T:**
- Apologize excessively ("We're so sorry!")
- Make jokes that don't land (humor is risky on 404s)
- Include implementation details (CSS, Hugo syntax — those are for WP creation)
- Assume search will always be available (it's optional)
- Make the page so entertaining that it feels like a distraction from getting back on track
