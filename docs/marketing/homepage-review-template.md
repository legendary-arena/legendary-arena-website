# Homepage Marketing Review Template

> **Editing this file**
>
> 1. Edit directly at `C:\www\legendary-arena-com\docs\marketing\homepage-review-template.md`
> 2. Commit with `SPEC:` prefix (e.g., `SPEC: update problem catalog in review template`).
>    `FIX:` is limited to the content lane (`content/**`, `static/images/**`) — `docs/` requires `SPEC:`.
> 3. Push to `main`, or branch + PR if you want review.
> 4. If edits change scope or structure, also update the ewiki page at
>    `C:\pcloud\BB\DEV\legendary-arena\wiki\homepage-review-template.md`
>    and push the `legendary-arena` repo separately.
> 5. If edits change what the homepage actually implements, re-grade the
>    scorecard at `C:\pcloud\BB\DEV\legendary-arena\wiki\homepage-marketing-scorecard.md`.
>
> **Related files:**
> - `C:\www\legendary-arena-com\docs\marketing\homepage-spec.md` — build document (split from this template)
> - `C:\www\legendary-arena-com\docs\marketing\homepage-appendix.md` — strategy reference (split from this template)
> - `C:\www\legendary-arena-com\docs\marketing\go-to-market-plan.md` — launch sequencing; this audit's GO/NO-GO is launch gate **G1**

**Site:** legendary-arena.com
**Framework:** StoryBrand SB7 (Donald Miller) + Business Made Simple website template
**Reference model:** drjjpeterson.com
**Date:** 2026-05-15

---

This is the **audit instrument** for the legendary-arena.com homepage. It
does not restate the build requirements or the strategy — it is the tool
you run an actual homepage against to produce a grade and a GO / NO-GO
decision.

- **What to build** lives in [homepage-spec.md](homepage-spec.md) (the
  build document): hero spec, problem / product / results copy, the
  reference build, the CTA language bank, the objection-handling section,
  the readiness checklist, GO / NO-GO, and the critical fail conditions.
- **Why it's built that way** lives in
  [homepage-appendix.md](homepage-appendix.md) (the strategy reference):
  the Player Needs Pyramid, the 28-problem catalog, the Reality Gap
  model, the Objection Library, the content framework, and the
  physical-vs-digital positioning.

This file owns only the **review layer**: how to run the audit, the
current-state scorecard, and the Sales Conversion Audit overlay.

> **Why this file is thin.** It was originally the monolith the spec and
> appendix were split out of. Everything it used to duplicate now has a
> single owner. Re-adding build copy or strategy theory here re-introduces
> drift (that is how this file once drifted to "20 problems" while the
> catalog had grown to 28). Keep this file to the review layer; send build
> changes to the spec and strategy changes to the appendix.

---

## How to Run This Review

1. Read the current homepage end to end as a cold visitor.
2. Grade it against the **Homepage Readiness Checklist**, the
   **GO / NO-GO Rule**, and the **Critical Fail Conditions** in
   [homepage-spec.md](homepage-spec.md). Those acceptance criteria are
   the audit criteria — there is one canonical copy, and it lives in the
   spec.
3. Run the **Sales Conversion Audit** below — the conversion-layer
   overlay that confirms the page actually moves a visitor from problem
   recognition to a decision, not just that the story elements are
   present.
4. Update the **Current-State Audit** below — re-grade the three
   questions, refresh the element tables, and bump the "last recorded"
   date.
5. If the homepage's implementation changed, re-grade the ewiki scorecard
   at `C:\pcloud\BB\DEV\legendary-arena\wiki\homepage-marketing-scorecard.md`
   (see the editing note at the top of this file).

---

## Current-State Audit (last recorded: 2026-05-15)

Grades reflect the live homepage at the date above. This is the review's
deliverable — re-grade and refresh the tables whenever the homepage
changes, and bump the date.

| Question | SB7 Elements | Answered? | Grade |
|----------|-------------|-----------|-------|
| **What is the problem?** | Character, Problem (villain + 3 levels), Guide (empathy) | Not stated at any level | F |
| **What is the product?** | Guide (authority), Plan (process + agreement), Call to Action (direct + transitional) | Partially — good pillars, poor sequencing, no plan, single CTA | C+ |
| **What are the results?** | Avoid Failure, Ends in Success (3 resolutions), Identity Transformation | Not stated | F |

**Overall:** strong product-differentiation copy and solid infrastructure,
but the page communicates none of the three questions to a cold visitor.
A first-time visitor can't answer any of them. **GO / NO-GO:** NO-GO.

### Problem (F)

The homepage skips the problem entirely. It opens in product-voice ("The
arena awaits") and moves straight to feature pillars — no villain, no
named frustration at any of the three levels, and no empathy statement.

### Product (C+) — element audit

| Criterion | Required | Present? |
|-----------|----------|----------|
| Plain-English category label | Yes | No — buried in meta description |
| Benefit statement | Yes | No — pillars imply benefits but don't state one |
| Pillar-to-problem mapping | Yes | Partial — pillars exist but appear before problem |
| Process plan | Yes | Partial — subhead reads as tagline, not a plan |
| Agreement plan | Yes | No |
| Visual proof (screenshot/video) | Yes | No |
| Direct CTA (repeated) | Yes | Partial — one placement, hero only |
| Transitional CTA | Yes | No |

Good differentiating copy exists but is poorly sequenced, has no plan, no
transitional CTA, no visual support, and only one CTA placement.

### Results (F) — element audit

| Criterion | Required | Present? |
|-----------|----------|----------|
| Failure stakes | Yes | No |
| Success vision (external) | Yes | No |
| Success vision (internal) | Yes | No |
| Success vision (philosophical) | Yes | No |
| Identity transformation | Yes | No |
| Player testimonials | Yes | No |
| Traction metrics | Yes | No |
| Community signal | Yes | No (footer only) |

The homepage provides zero evidence that anyone has used the product and
gotten a result. The visitor is asked to "Play now" on faith alone.

### Hero — element audit (Grunt Test)

| Element | Required | Present? |
|---------|----------|----------|
| Category + benefit headline | Yes | No — "The arena awaits" tells a cold visitor nothing |
| Pain-driven subhead | Yes | No — "Assemble your heroes..." assumes deck-building vocabulary |
| Direct CTA above fold | Yes | Partial — "Play now" exists but visitor has no context yet |
| Transitional CTA | Yes | No |
| Hero visual | Yes | No — placeholder SVG |

### Existing infrastructure

Tournaments, featured products, the newsletter capture, and community
links exist but are footer-only or under-promoted. They're useful for
returning visitors, but they don't function as results evidence for
someone who has never played.

---

## Sales Conversion Audit

A conversion-layer overlay on the SB7 readiness checklist in
[homepage-spec.md](homepage-spec.md). The readiness checklist confirms the
*story elements* are present; this audit confirms the page actually *moves
a visitor from problem recognition to a decision*. A page passes only if
every box is checked.

### 1. Outcome, Not Product

- [ ] The page sells the desired outcome before explaining the product
- [ ] The hero communicates transformation, not internal features
- [ ] Feature language is translated into customer-feeling language

### 2. Reality Gap

- [ ] Current reality is clearly stated
- [ ] Desired future reality is clearly stated
- [ ] Legendary Arena is positioned as the bridge between them

### 3. Diagnosis Before Prescription

- [ ] Pain is diagnosed before product features are introduced
- [ ] The villain (pay-to-win) is named
- [ ] External, internal, and philosophical pain are all present

### 4. Objection Prevention

- [ ] Pay-to-win objection answered
- [ ] Install / friction objection answered
- [ ] Trust / proof objection answered
- [ ] Complexity / learning-curve objection answered
- [ ] "Is anyone else playing?" objection answered

### 5. Direct Ask

- [ ] Every major section has a next action
- [ ] CTAs use strong verbs (no "Learn More" / "Explore" / "Check it out")
- [ ] The page asks the visitor to make a clear decision

### 6. Follow-Up Path

- [ ] Email capture is present in the body (not only the footer)
- [ ] The lead magnet is specific and valuable
- [ ] A transitional path exists for visitors not ready to play (Watch gameplay)

Source: conversion principles cross-checked against the build spec
([homepage-spec.md](homepage-spec.md)) and strategy reference
([homepage-appendix.md](homepage-appendix.md) — Reality Gap model,
Objection Library).
