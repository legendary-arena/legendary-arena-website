# Task 03 — Landing Page Friction Audit

**Objective:** Audit every major page on www.legendary-arena.com for confusion points, weak transitions, buried CTAs, and missing trust signals. Produce page-by-page friction report with exact rewrite recommendations.

**Owner:** Jeff Jensen  
**Phase:** P1 (conversion path optimization)  
**Est. effort:** ~45 minutes  
**Dependencies:** Task 01 (homepage variants) + Task 02 (quickstart page) — review their outputs first so you have context on new messaging

---

## Inputs you need

1. **`01-VISION.md`** — Read success criteria (lines 141–165) and constraints (lines 167–190). Key principle: static-only, no runtime dependency, brand-token-driven.
2. **Live site spot-check** — https://www.legendary-arena.com/ — mentally walk through the homepage, about page, blog index, and one blog post. Note what works, what's confusing.
3. **Current header + footer** — Review the global nav: does it make clear where to go next? Are links working?
4. **WP-020 funnel enrichment spec** — If available, review the newsletter/shop/share module doctrine so you know the intended CTA hierarchy.
5. **Task 01 + Task 02 outputs** — After those subagents complete, read their recommendations. Use them as a lens for identifying what the friction audit is solving.

---

## Task description

You're auditing the visitor's journey across five pages. For each page, identify:

1. **Comprehension friction** — Is it clear what the page is about in <10 seconds?
2. **Transition friction** — After reading, is the next action obvious?
3. **CTA friction** — Are CTAs clear, visible, and non-conflicting?
4. **Trust friction** — Are there trust signals (proof, legitimacy, status)?
5. **Mobile friction** — Does the page work on 375×667?

### Page 1: Home (`/`)

**Audit checklist:**
- [ ] Hero answer "what is this?" within ~5 seconds (hero text + primary CTA visible above fold)
- [ ] Primary CTA ("Play now") is visually dominant (color, size, position)
- [ ] Secondary CTAs (newsletter, about, blog) don't distract from primary
- [ ] Value cards clearly state "why"
- [ ] Call-to-action below the fold is clear (newsletter signup, shop, next link)
- [ ] Footer links work and lead somewhere useful

**Questions to answer:**
- What's the clearest friction point on this page?
- What's the weakest transition or next action signal?
- What trust signal is missing (if any)?

### Page 2: About (`/about/`)

**Audit checklist:**
- [ ] Opens with "what is this project" (not just "about the company")
- [ ] Explains status of three properties (www / play / registry) — is it clear where to go next?
- [ ] Credibility signals (who's behind it, legitimacy)
- [ ] Clear CTA at the bottom (back to play, or to docs, or to press kit)

**Questions to answer:**
- Does a visitor leave this page wanting to play, or wanting more info?
- What's the clearest next step after reading?
- Are there objections this page doesn't address?

### Page 3: Blog index (`/posts/`)

**Audit checklist:**
- [ ] Latest posts show clearly (date, title, excerpt)
- [ ] Each post title and excerpt compel a click
- [ ] No broken post links or 404s in the list
- [ ] Search (Pagefind) is visible and functional
- [ ] A post about "getting started" or "new player" is surfaced (if it exists)

**Questions to answer:**
- Would a new player find a helpful post here?
- Is the newest content promoted?

### Page 4: Sample blog post (e.g., `/posts/2026-05-07-launch-announcement/`)

**Audit checklist:**
- [ ] Post title and excerpt are clear
- [ ] Content is scannable (headings, lists, short paragraphs)
- [ ] CTA mid-post or at end (e.g., "Ready to play? Click here")
- [ ] Related posts or "read more" suggestions at bottom
- [ ] No broken internal links (try clicking a link to /about/, /posts/, /play, etc.)

**Questions to answer:**
- Would a reader finishing this post feel motivated to play?
- Is there a clear next action after reading?

### Page 5: Press / Media kit (if WP-010 has landed; otherwise skip)

**Audit checklist:**
- [ ] Opens with 1–2 paragraph project summary
- [ ] Fact sheet is scannable (bulleted, not prose)
- [ ] Contact method is clear
- [ ] Download links (if any) are working
- [ ] Secondary audiences (partners, press, IP evaluators) feel welcomed

**Questions to answer:**
- Would a press person feel they have what they need?
- Is there a next action (contact, share, embed)?

---

## Output format

One markdown file: `friction-audit.md`

Structure as follows:

```md
# Landing Page Friction Audit

## Executive Summary

- **Highest friction page:** [page name] — [one-liner on the main issue]
- **Easiest fix:** [e.g., "Homepage CTA is buried; move it up"]
- **Most impactful fix:** [e.g., "About page doesn't explain the three properties clearly"]

---

## Page 1: Home (`/`)

### Friction findings

**Finding 1.1: [friction type — e.g., "CTA below fold on mobile"]**
- **Where:** [specific section or element]
- **Impact:** [why this matters — e.g., "Mobile users scroll off before seeing the CTA"]
- **Rewrite recommendation:** [exact copy or layout change]
- **Expected uplift:** [e.g., "10–20% more mobile CTR if CTA moves above fold"]

[Repeat for 2–4 findings per page]

### Recommended changes

[Bulleted list of high-priority fixes with copy-paste-ready rewrites]

### Questions resolved

- **Comprehension:** [clear / needs work — brief note]
- **Transition:** [clear / needs work — brief note]
- **Trust:** [strong / weak — brief note]

---

## Page 2: About (`/about/`)

[Same structure as Page 1]

---

## Page 3: Blog index (`/posts/`)

[Same structure]

---

## Page 4: Sample blog post

[Same structure]

---

## Page 5: Press kit (if exists)

[Same structure]

---

## Cross-page findings

### CTA Hierarchy
- **Primary (everywhere):** "Play now" → play.legendary-arena.com
- **Secondary (home, footer):** Newsletter signup
- **Tertiary (footer):** Shop, about, press

**Issue:** [If any CTAs conflict, e.g., two different secondary CTAs on home]
**Fix:** [Which CTA should be primary, secondary, etc.]

### Navigation
- **Header:** [list links]
- **Footer:** [list links]

**Issue:** [If any links are broken, unclear, or misleading]
**Fix:** [Reorder, rename, or remove]

### Trust signals
- **Current signals:** [list what's already there]
- **Missing signals:** [what's notable by absence, e.g., "no team bios", "no launch date", etc.]
- **Recommendation:** [which missing signals matter most]

---

## Priority fixes (by effort vs impact)

| Fix | Effort | Impact | Recommendation |
|---|---|---|---|
| [fix 1] | Low | High | **Do first** |
| [fix 2] | Low | Medium | **Do early** |
| [fix 3] | Medium | High | **Worth doing soon** |
| [fix 4] | Medium | Low | **Nice to have** |

---

## Assumptions

- Visitor has 30 seconds on most pages
- Mobile (375×667) represents 40% of traffic
- Newsletter signup and "Play now" are the only two CTAs we care about
- Blog is for announcements and community engagement, not SEO (that's WP-025)
```

---

## Success criteria

- [x] All 5 pages audited for comprehension, transition, CTA, trust, and mobile friction
- [x] At least 2–4 friction findings per page (if none, state explicitly)
- [x] Each finding includes exact rewrite copy (no "consider", no stubs)
- [x] Cross-page CTA hierarchy issues called out
- [x] Priority matrix ranks fixes by effort vs impact
- [x] Tone is actionable, not prescriptive (you're identifying friction, not implementing)

---

## Constraints

- **Audit, don't design.** You're identifying problems, not specifying CSS or layout changes.
- **Respect static-only.** No suggestions that require runtime data or API calls.
- **Brand-aware.** All rewrites should use brand tone (confident, declarative, not hype).
- **Honest assessment.** If a page is working well, say so. Not every page has friction.

---

## Do / Don't

**DO:**
- Assume the reader is busy and skeptical
- Look for moments where a visitor might bounce (unclear value, no CTA, confusion)
- Compare the page to the "ideal" flow: land → understand → act
- Note what works so we don't break it
- Prioritize by impact (fixes that remove major hesitation > cosmetic improvements)

**DON'T:**
- Suggest implementation details (CSS, Hugo shortcodes, etc.)
- Recommend pages that don't exist yet (that's a design decision)
- Assume mobile and desktop behave the same (check both mentally)
- Over-design trust signals (a legitimate project + clear CTA > wall of testimonials)
- Ignore the existing brand voice (maintain tone consistency)
