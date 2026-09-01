# Video Production Workflow

**Channel:** Legendary Arena (YouTube)
**Companion:** [youtube-channel-plan.md](youtube-channel-plan.md)
**Date:** 2026-06-04

---

## Overview

Ten steps from idea to published video + cross-referenced blog post +
performance review. Each step has a clear input, output, and tool chain.
The workflow produces three artifacts per video: the video itself, 3-7
Shorts clips, and a companion blog post on legendary-arena.com.

```
 0. Topic Validation
 1. Identify Problem
 2. Select Series
 3. Research & Collect Assets
 4. Write Blog + Script
 4b. Title + Thumbnail Gate
 5. Record (Capture Layer)
 6. Assemble + Normalize (FFmpeg via Claude Code)
 7. Edit + Polish (Premiere)
 8. Upload to YouTube
 8b. Cross-Post Shorts
 9. Cross-Reference Blog
10. Performance Review
```

---

## Core Principles (Quick Reference)

Five rules that govern every decision in this workflow. When in doubt,
check here before checking the details.

| # | Principle | Rule | Implication |
|---|-----------|------|-------------|
| P1 | **One Video = One Goal** | Each video declares exactly one primary goal: play-conversion, email-signup, subscriber-growth, or gear-purchase (the fourth goal, governed by [video-commerce-plan.md](video-commerce-plan.md)). All CTAs align to it. | No mixed CTAs. Pinned comment must not contradict the spoken CTA. Gear is primary only when the video meets the [video-commerce precedence rule](video-commerce-plan.md#the-fourth-conversion-goal-gear-purchase-and-its-precedence). |
| P2 | **Packaging Before Production** | Title, thumbnail, and topic demand are validated before recording begins (Step 4b). | Never record a video that hasn't cleared the Title + Thumbnail Gate. CTR determines distribution — if packaging is weak, the content never gets seen. |
| P3 | **Retention Before Volume** | Do not increase output cadence while retention is declining. Fix retention first, then scale production. | If avg view duration drops across 3+ consecutive videos, pause new production and re-cut or re-approach before adding more videos. |
| P4 | **Shorts = Testing Engine** | Shorts test hooks, topics, angles, and emotional reactions — not just clip existing content. Top-performing Shorts become long-form candidates. | Every Short is a low-cost experiment. Use performance data to decide what earns a full video. |
| P5 | **Session > Single Video** | Each video must feed into another. The goal is 2+ videos per viewer session. | End screens link to the next video in the binge path. No generic "check out my channel" end cards. |
| P6 | **Build Before You Script** | The demo must work before Step 4 (scripting) begins. Never script a live demonstration you haven't actually run. | "Building the Arena": feature must have shipped. "How to Play": UI must be stable. If the demo breaks, fix the build first — don't improvise on screen. |

---

## Production Principles

### Automation First

All repeatable operations MUST be implemented in FFmpeg / Claude Code
before manual editing is allowed in Premiere. Premiere is reserved
for:

- Narrative timing adjustments
- Visual emphasis (zoom, overlays, motion graphics)
- Branding polish

If a step is performed manually more than twice, it must be automated
in Step 6. The pipeline's default posture is: **FFmpeg does the work,
Premiere makes the choices.**

### File Naming Convention

All files must follow:

```
{prefix}-{NNN}-{slug}-{artifact}.{ext}
```

Examples:

```
bta-001-prove-fairness-final.mp4
bta-001-prove-fairness-thumbnail.png
bta-001-prove-fairness-short-01.mp4
htp-003-game-never-decides-script.md
```

This prevents chaos at scale. No unnamed files, no `final-v2-REAL.mp4`.

### Shorts Quality Standard

Each Short must:

- Deliver a complete idea in under 45 seconds
- Contain a hook within the first 2 seconds
- Be understandable without context from the full video

Reject any Short that depends on prior explanation. A Short is a
standalone discovery artifact, not an excerpt.

### Production Time Budget

| Step | Target Time |
|------|------------|
| Steps 1-4 (problem through script) | 60-90 minutes |
| Step 5 (recording) | 45-90 minutes |
| Steps 6-7 (assembly + editing) | 2 hours or less |

If any step exceeds its budget, simplify the video — don't extend the
timeline. Consistency of output matters more than polish on any single
video.

### Good Enough Publish Rule

If the video has:

- A clear hook
- Clear value delivery
- Clean audio

Then **publish**. Do not delay for polish improvements with less than
10% impact on viewer experience. Shipping beats perfecting. A video
that exists outperforms a video that's still in Premiere.

### Value Density Rule

Every 15-30 second window of the video must:

- Deliver a new insight, OR
- Show a new outcome, OR
- Escalate the idea

If a segment doesn't do any of these — cut it. This is enforced in
Step 7 (edit) and measured in Step 10 (retention analysis). Filler
segments correlate directly with retention drop-offs.

### Demonstrate, Don't Describe

Every factual claim in a video must be shown on screen, not only
narrated. "The replay system proves every result is fair" is a claim.
Running a replay verification on camera is proof.

**Rule:** For every factual statement in the script, ask: "Can I show
this?" If not, find a visual equivalent or cut the claim. Narrated
claims without visual confirmation are advertising. On-screen proof
is authority.

---

## File System Layout

### Shared Assets (Reusable Components)

All reusable assets live in a single shared directory. No reusable
component may live inside a single video folder — that creates
duplication and version drift.

```
C:\pcloud\LA\
  video-assets\                          # Shared / reusable assets
    intros\                              # Branded intro sequences per series
      bta-intro.mp4
      htp-intro.mp4
      att-intro.mp4
    outros\                              # Branded outro sequences per series
      bta-outro.mp4
      htp-outro.mp4
      att-outro.mp4
    music\                              # Royalty-free music library
      background\                       # Under-voice background tracks
      intro-outro\                      # Branded stings
    overlays\                           # Visual overlays for Premiere
      watermarks\                       # Channel watermark (goes in EVERY video)
        la-watermark-dark.png           #   dark background variant
        la-watermark-light.png          #   light background variant
      lower-thirds\                     # Guest name bars (Across the Table)
      text-cards\                       # Question/point overlays (pattern interrupts)
      subscribe-cta\                    # Animated subscribe graphic for outros
    lead-magnets\                       # Email capture assets
      deckbuilding-primer-v1.pdf        #   the lead magnet PDF
      cta-graphic-thumbnail.png         #   graphic used in video/description
      newsletter-signup-card.png        #   card overlay for use in Premiere outros
    channel-art\                        # Channel identity assets (versioned)
      channel-banner-2560x1440.png
      profile-picture-800x800.png
      channel-banner-source.psd
    fonts\                              # Brand fonts
    thumbnails\                         # Series thumbnail templates (PSD/PNG)
      bta-template.psd
      htp-template.psd
      att-template.psd
      shorts-template.psd
    _templates\                         # Reusable markdown templates (copy, don't edit)
      problem-card.md
      series-assignment.md
      script-template.md
      shot-list-template.md
      youtube-metadata-template.md
      performance-review-template.md
      production-checklist.md
      hooks\                            # Hook pattern reference (read during scripting)
        curiosity.md                    #   "Can you actually...?" / "What if...?"
        challenge.md                    #   "I bet you can't..." / "Try this..."
        contradiction.md                #   "Everyone thinks X, but actually..."
        outcome-first.md                #   Show the result, then rewind
        question.md                     #   "Why does every game...?"
```

**Watermark note:** `la-watermark-dark.png` / `la-watermark-light.png`
are used in two places: (1) overlaid in Premiere on the final video
export, lower-right corner, 20% opacity; and (2) set as the channel
watermark in YouTube Studio (Channel → Branding → Video watermark) so
it appears as a subscribe prompt on all videos without re-editing.
Keep both uses in sync — if the watermark is updated, update both.

### Per-Video Folders

Each video gets its own folder under `C:\pcloud\LA\videos\`, named by
series prefix + episode number + slug.

```
C:\pcloud\LA\videos\
  bta-001-prove-fairness\             # Building the Arena #1
    01-research\                      # Step 3 output
      notes.md                        # Research notes, problem catalog refs
      screenshots\                    # Screen captures
      card-images\                    # Card art from images.legendary-arena.com
      b-roll\                         # Supplemental footage
      thumbnail-assets\              # Thumbnail source images (per-video, not reusable)
    02-script\                        # Step 4 output
      blog-draft.md                   # Blog post draft (Hugo front matter)
      script.md                       # Video script with timestamps
      shot-list.md                    # Planned screen recordings / demos
    03-recording\                     # Step 5 output
      raw\                            # Raw recording files (.trec, .mkv, etc.)
      exports\                        # Exported .mp4 segments
    04-assembly\                      # Step 6 output (FFmpeg)
      concat.txt                      # FFmpeg concat manifest
      rough-cut-normalized.mp4        # Normalized rough cut (edit-ready)
      cuts.json                       # Cut points and segment metadata
      shorts-raw\                     # Raw Shorts clips (pre-edit)
    05-edit\                          # Step 7 output (Premiere)
      project.prproj                  # Premiere project file
      bta-001-prove-fairness-final.mp4          # Export-ready master
      shorts\                         # 3-7 Shorts clips
        bta-001-prove-fairness-short-01.mp4
        bta-001-prove-fairness-short-02.mp4
        ...
      bta-001-prove-fairness-thumbnail.png      # Final thumbnail
    06-publish\                       # Steps 8-10 metadata
      youtube-metadata.md             # Title, description, tags, cards, end screen
      blog-final.md                   # Final blog post (copied to Hugo)
      performance-review.md           # Step 10 output

  htp-001-learned-deckbuilder\        # How to Play #1
    ...same structure...

  att-001-solo-competitive-grinder\   # Across the Table (Solo) #1
    ...same structure...

  _archive\                           # Completed videos (move here after 90-day review)

  social\                             # Cross-platform clips (referenced in Step 8b)
    tiktok\                           #   per-video subfolders: {prefix}-{NNN}\
    instagram-reels\                  #   per-video subfolders: {prefix}-{NNN}\
```

**Archive rule:** Move a video folder to `_archive\` after the 90-day
performance review is complete and no further edits are anticipated.
Keeps `videos\` at a working size. Archive is not deleted — it remains
the source of truth for production history.

**Series prefixes:**

| Prefix | Series |
|--------|--------|
| `bta` | Building the Arena |
| `htp` | How to Play |
| `att` | Across the Table |

---

## Step 0: Topic Validation

**Input:** Video idea or problem catalog entry
**Output:** Confirmed demand signal — proceed or kill
**Tool:** YouTube search + VidIQ (or TubeBuddy)

Before investing in a full problem card and script, confirm that
someone is looking for this topic. This prevents creating videos no
one searches for.

### Validation Checklist

- [ ] Search YouTube for the topic / keyword
- [ ] Confirm existing videos on related topics have healthy view counts:
  - **Legendary/Marvel Champions niche:** 2K+ views is acceptable
  - **Adjacent topics (MTG, TCG pay-to-win critique, deck-building theory):**
    10K+ — adjacent demand is worth targeting with a Legendary-angle hook;
    don't calibrate exclusively to the niche floor or you'll avoid high-
    demand topics a better-angled video could capture
- [ ] Check VidIQ/TubeBuddy search score for the primary keyword
- [ ] Confirm the topic has not been covered by a recent video on
  this channel (avoid cannibalization)
- [ ] **Demo works (if applicable):** Open the game/app and run the
  planned demo scenario. A 30-second scratch pass now is cheaper
  than a re-record after scripting.

### Decision

| Signal | Action |
|--------|--------|
| Related videos exist with healthy view counts | Proceed to Step 1 |
| Topic exists but all videos are low-performing | Reconsider angle — the topic may need a stronger hook |
| No related videos exist at all | High risk — proceed only if a Short has already validated demand (see Shorts as Testing Engine in channel plan) |
| Topic already covered on this channel | Kill — create a follow-up or deeper angle instead |
| Demo scenario fails on scratch pass | Fix the build first — do not proceed to Step 1 |

**Exception:** "Building the Arena" dev log episodes may skip topic
validation — they document what shipped, not what's searched for.
Their value is authority-building, not search discovery.

---

## Step 1: Identify the Problem

**Input:** The 28-problem catalog in
[homepage-appendix.md](homepage-appendix.md) + current product state
**Output:** A problem statement with all three SB7 levels
**Tool:** This document + the catalog

Pick a problem from the catalog (or identify a new one). Write it out
at all three levels before proceeding — if you can't articulate the
internal and philosophical levels, the video won't have emotional
weight.

### Deliverable: Problem Card

```markdown
## Problem Card

**Problem #:** [catalog number or "NEW"]
**Theme:** [Fairness / Skill Measurement / Authenticity / Scalability]
**Pyramid Level:** [L1-L5]

**External:** [tangible frustration — what's broken]
**Internal:** [how it makes the viewer feel]
**Philosophical:** [why it's wrong — use "should" language]

**Villain tie:** [how this connects to the pay-to-win villain,
or name an alternate villain for this problem]

**Story gap:** [where the viewer is now -> where they want to be]
```

### Selection Criteria

- Does this problem resonate with the target audience right now?
- Has the product shipped a feature that demonstrably solves it?
- Can the solution be shown on screen (not just described)?
- Does the Messaging Priority Rule allow this level yet? (Don't
  publish L4/L5 content before L2 is established on the channel.)

---

## Step 2: Select Series

**Input:** Problem card from Step 1
**Output:** Series assignment + content mode + episode number
**Tool:** [youtube-channel-plan.md](youtube-channel-plan.md)

### Decision Matrix

| If the problem is best solved by... | Series | Content Mode |
|-------------------------------------|--------|-------------|
| Showing how the system works under the hood | Building the Arena | C (Authority) |
| Teaching the viewer to do something | How to Play | A (Sales) or C (Authority) |
| Letting someone experience it and react | Across the Table | B (Narrative) |

### Deliverable: Series Assignment

```markdown
## Series Assignment

**Series:** [Building the Arena / How to Play / Across the Table]
**Episode #:** [next in sequence]
**Content Mode:** [A / B / C]
**Discovery Title:** [curiosity-driven — controversy, challenge,
or curiosity gap]
**Primary Goal:** [Play conversion / Email signup / Subscriber growth / Gear purchase]
**Target Funnel Transition:** [which viewer state this video moves —
e.g., Visitor → Video viewer, Video viewer → Site visitor, Site visitor
→ Email subscriber, Site visitor → First game started. Reviewed in
Step 10.]
**Guide Balance:** [authority-heavy / empathy-heavy / balanced]
**SB7 Elements to Hit:**
- [ ] Villain / problem (which levels?)
- [ ] Empathy beat
- [ ] Authority demonstration
- [ ] Process plan or agreement plan reference
- [ ] Direct CTA (identity/challenge)
- [ ] Transitional CTA
- [ ] Failure stakes (if applicable)
- [ ] Identity transformation moment (if applicable)
```

---

## Step 3: Research & Collect Assets

**Input:** Problem card + series assignment
**Output:** Populated `01-research\` folder
**Tool:** Browser, card database, game client, image assets

### Checklist

- [ ] Create video folder: `C:\pcloud\LA\videos\{prefix}-{NNN}-{slug}\`
- [ ] Create subfolders: `01-research\`, `02-script\`, `03-recording\`,
      `04-assembly\`, `05-edit\`, `06-publish\`
- [ ] Write `01-research\notes.md` — problem card, series assignment,
      research findings, key points to demonstrate
- [ ] Capture screenshots of the feature / problem in action
- [ ] Pull card images from `https://images.legendary-arena.com/` if
      needed
- [ ] Identify b-roll opportunities (game client, card browser, replay
      viewer)
- [ ] Select candidate thumbnail images
- [ ] Identify music / SFX candidates (royalty-free library)
- [ ] For "Across the Table": confirm guest, schedule, prep questions

### Research Notes Template (`01-research\notes.md`)

```markdown
# Research: [Discovery Title]

## Problem Card
[paste from Step 1]

## Series Assignment
[paste from Step 2]

## Key Points to Demonstrate
1. [specific feature / behavior to show on screen]
2. ...

## Demo Plan
- What to set up in the game client before recording
- What card sets / scenarios to use
- What replay to reference (if applicable)

## References
- Problem catalog: homepage-appendix.md #[N]
- Vision doc: [section]
- Related videos: [links to existing channel content]

## Guest Prep (Across the Table only)
- Guest name:
- Guest channel/project:
- Conversation prompts:
  - External: "What's the worst experience you've had with [X]?"
  - Internal: "How did that make you feel about the game?"
  - Philosophical: "Do you think games should work that way?"
```

---

## Step 4: Write Blog + Script

**Input:** Research folder
**Output:** Populated `02-script\` folder
**Tool:** Text editor, Claude Code for drafting assistance

This step produces two paired artifacts: a blog post and a video
script. They share the same problem/solution arc but differ in
structure per content mode.

### Blog Post (`02-script\blog-draft.md`)

Write in Hugo front matter format matching the existing content
pipeline:

```markdown
---
title: "[Discovery Title — adapted for blog SEO]"
date: [YYYY-MM-DDTHH:MM:SS-05:00]
description: "[1-2 sentences, under 160 chars, problem-first]"
draft: true
tags: ["[series-tag]", "[problem-theme]"]
categories: ["[series-category]"]
youtube: "[placeholder — filled in Step 8]"
---

[Blog content — follows the content mode structure from
homepage-appendix.md § Content Framework]
```

**Content mode determines blog structure:**

| Mode | Blog Structure |
|------|---------------|
| A (Sales) | Problem -> Agitate -> Product -> Result -> CTA |
| B (Narrative) | Story/Hook -> Problem (implicit) -> Insight -> Result -> CTA (optional) |
| C (Authority) | Problem -> Deep Analysis -> System/Solution -> Result -> Expansion |

**Blog rules:**
- Lead with the problem, not the product (SB7 strategic alignment)
- Use internal-feeling language, not feature language (see Copy
  Direction table in youtube-channel-plan.md)
- Include the video embed placeholder: `{{</* youtube "VIDEO_ID" */>}}`
- End with the same identity CTA as the video
- Target 600-1200 words — enough for SEO, short enough to not
  compete with the video

### Video Script (`02-script\script.md`)

```markdown
# Script: [Discovery Title]

**Series:** [name]
**Episode:** [#]
**Target Length:** [minutes]
**Content Mode:** [A / B / C]

---

## HOOK (0:00 - 0:15)
[Show outcome or contradiction. Ask the question. Create tension.
Use a proven pattern from C:\pcloud\LA\video-assets\_templates\hooks\]

**Hook pattern used:** [curiosity / challenge / contradiction /
outcome-first / question]
**On screen:** [what the viewer sees]
**Voiceover:** "[exact words]"

---

## SEGMENT 1: [Name] (0:15 - X:XX)
[Problem statement — hit the external, internal, and/or philosophical
level]

**On screen:** [demo / screenshot / gameplay]
**Voiceover:** "[exact words]"

**Pattern interrupt at [timestamp]:** [cut to replay / zoom / overlay]

---

## SEGMENT 2: [Name] (X:XX - X:XX)
[Solution / deep-dive / demo]

**On screen:** [what to show]
**Voiceover:** "[exact words]"

**Empathy beat:** "[We've been there too / I felt the same way]"

**Pattern interrupt at [timestamp]:** [type]

---

## SEGMENT N: [as needed]

---

## MID-VIDEO CTA (placed at peak value delivery)

**Primary goal:** [Play conversion / Email signup / Subscriber growth / Gear purchase]
**On screen:** [CTA card or overlay]
**Voiceover:** "[exact words — must match primary goal]"

*Place this immediately after the strongest demo, insight, or reaction.
Most viewers never reach the outro — this is the highest-conversion
CTA placement in the video.*

---

## OUTRO (X:XX - end)

**Failure stakes (light touch):**
"[What happens if you don't act]"

**Identity CTA:**
"[Challenge — not generic 'try it']"

**Newsletter CTA (include when lead magnet is relevant to this video's topic):**
"Get the free [lead magnet name] — link in description."
*Use this if the video's topic connects to the lead magnet content.
Not every video requires it — but tutorials and fairness episodes
almost always do.*

**Transitional CTA:**
"Watch this next — [specific video + why]"

**End screen:** [specific video to link — placed in final 20 seconds]

---

## SHORTS CANDIDATES
Mark moments during scripting that will become Shorts:

| Timestamp | Type | Problem Level | Hook Line |
|-----------|------|--------------|-----------|
| [X:XX] | [reaction / demo / principle] | [ext / int / phil] | "[2-sec hook]" |
| ... | ... | ... | ... |

Minimum 3 candidates required before proceeding to recording.
```

### Objection Handling Check

Before locking the script, name the single objection most likely to make
this video's target viewer bounce, and confirm the script answers it on
screen (demonstrate, don't assert). Pull from the
[Objection Library](homepage-appendix.md#objection-library) — e.g.
"digital versions always get the rules wrong" is answered by running a
complex interaction and showing the engine resolve it exactly. One
objection per video; don't try to clear the whole list.

### Light Script Option (Faster Cadence)

For build-documentation and feature-demo videos where the result
already exists, use this compressed structure instead of the full
template above. Cuts Step 4 time by half.

**HOOK (0:00-0:15):** Result first — "I built X" / "I tested X" /
"here's what this does." Show the outcome, then rewind.

**PROBLEM (0:15-1:00):** Why this matters — what was broken or
missing before this existed.

**BUILD (1:00-X:XX):**
- Step 1: [on-screen action] + "[voiceover]"
- Step 2: [on-screen action] + "[voiceover]"
- Step 3: [on-screen action] + "[voiceover]"

**RESULT:** What this produced — time saved, problem solved, rank
earned, proof generated.

**CTA:** Identity challenge — not generic "try it."

**SHORTS CANDIDATES:** Mark 3+ timestamps with hook lines before
recording (minimum required — same as full template).

Use the light script when: the build is the content (dev log, feature
demo, system reveal) and you already have a working result to show.
Use the full template when: the video requires narrative structure
(Across the Table), multiple SB7 elements need careful sequencing, or
this is a launch or anchor video.

### Shot List (`02-script\shot-list.md`)

```markdown
# Shot List: [Discovery Title]

| # | Shot | Source | Setup Required | Duration |
|---|------|--------|---------------|----------|
| 1 | [description] | [game client / card browser / replay / screen capture] | [what to prepare] | [est. seconds] |
| ... | ... | ... | ... | ... |
```

### Gear CTA (commerce videos only)

Run this only when the video's declared primary goal is **gear purchase**, or
when a soft gear appearance is allowed. Which is which is decided by the
[video-commerce decision table](video-commerce-plan.md#video-job-decision-table)
— check the video's job (setup / how-to-play / deck-building = gear-primary;
trust / fairness / onboarding = gear forbidden or soft only). This subsection
schedules the tag on the shot list; it does not re-decide eligibility.

When gear is in play, add these to the deliverables above:

1. **A gear B-roll shot row on the shot list** — the object doing its job on the
   table (mat with zones legible, box open with cards/rulebook, guide beside the
   session), not a static product glamour shot. Source: `physical capture`.
2. **The spoken gear CTA in the OUTRO (or a mid-video slot)** placed *after* the
   system has been demonstrated — never the cold open. Use the honest patterns
   from [video-commerce-plan.md § Copy rules](video-commerce-plan.md#copy-rules)
   verbatim in spirit (describe the object and the session, never power):
   - Box: "This is the starter box the session used — cards, rulebook, deckbox."
   - Mat: "Zones and the turn tracker are on the mat — the same layout as this video."
   - Guide: "Volume 1 is the 52-week path from first draft to championship play."
3. **The canonical product URL** on the end screen and in the description with a
   UTM (`utm_campaign=[slug]`), plus the platform product tag once C1–C4 pass for
   that SKU. One tagged SKU per video unless it is a catalog/setup tour.

**Guardrails carried from the commerce plan:** never a forbidden phrase ("the
edge you need," "the deck that wins"); never tag a SKU whose
[readiness gates](video-commerce-plan.md#commerce-readiness-gates) have not all
passed; and on any video whose primary goal is play or email, the gear stays a
description link — it does not get a spoken CTA that competes with the
audience-building goal.

---

## Step 4b: Title + Thumbnail Gate

**Input:** Discovery title + thumbnail concept from Steps 2 and 3
**Output:** Validated title + thumbnail — cleared for recording
**Tool:** Review against checklist + VidIQ (or TubeBuddy)

This gate prevents filming videos that won't get clicks. Title and
thumbnail are the two highest-leverage growth factors on YouTube — they
determine whether the algorithm shows the video at all. Validate before
investing recording time.

### Requirements

1. **Generate 3 title variants** — pick the strongest, keep the others
   as A/B test candidates for later optimization
2. **Check search demand (VidIQ/TubeBuddy):** Run the primary title
   keyword through VidIQ's search score. A high search-volume,
   low-competition keyword in the title is worth 10x the production
   polish. If the keyword scores poorly, try the alt titles before
   committing to recording.
3. **Generate 2 thumbnail concepts** — primary and one backup alt.
   Use the series visual template from `C:\pcloud\LA\video-assets\thumbnails\`.
   Both are saved; the alt becomes the A/B test candidate after
   publish if CTR is weak.

### Validation Checklist

- [ ] Title creates a curiosity gap (the viewer needs to click to
      resolve the question)
- [ ] Title is understandable in under 1 second
- [ ] Title does not depend on product knowledge (a non-player must
      understand the hook)
- [ ] Title is under 70 characters
- [ ] VidIQ/TubeBuddy search score checked — keyword is viable
- [ ] Thumbnail has 1 focal subject (not a cluttered collage)
- [ ] Thumbnail uses 3 words or fewer (text must be readable at 150px)
- [ ] Thumbnail uses high-contrast colors (passes squint test)
- [ ] Thumbnail conveys the video's promise without reading the title
- [ ] Thumbnail follows the series visual template
- [ ] Thumbnail is legible at mobile feed size (150px wide)
- [ ] Alt thumbnail concept exists (for A/B testing post-publish)

**If any item fails, revise before recording.** A well-shot video with
a weak title/thumbnail will underperform a mediocre video with a strong
title/thumbnail.

### Deliverable

```markdown
## Title + Thumbnail Gate

**Primary title:** [selected]
**Alt title 1:** [backup]
**Alt title 2:** [backup]

**VidIQ search score:** [score / notes on keyword competition]

**Primary thumbnail concept:** [description or path to mockup]
**Alt thumbnail concept:** [description or path to mockup — for A/B test]

**Validation:**
- [x] Curiosity gap
- [x] <1 sec comprehension
- [x] No product knowledge required
- [x] Under 70 chars
- [x] VidIQ keyword viable
- [x] Thumbnail conveys promise standalone
- [x] Series template followed
- [x] Mobile-legible
- [x] Alt thumbnail exists

**Cleared for recording:** Yes / No
```

---

## Step 5: Record (Capture Layer)

**Input:** Script + shot list + cleared Title/Thumbnail Gate
**Output:** Populated `03-recording\` folder
**Tool:** Recording software (see below)

The recording tool is the capture layer only — it must not influence
the downstream pipeline. All output is exported as .mp4 segments for
FFmpeg assembly.

**Tool options:**

| Tool | When to Use |
|------|------------|
| Camtasia | Default — screen recording + voiceover in one pass |
| OBS Studio | Advanced workflows — multi-source, scene switching, streaming |
| Snagit | Quick single-screen captures for b-roll |

### Pre-Recording Checklist

- [ ] Title + Thumbnail Gate passed (Step 4b)
- [ ] Demo environment set up per shot list
- [ ] Unnecessary apps closed (notifications, email, chat)
- [ ] Audio levels checked (mic test, room noise)
- [ ] Recording resolution set to 1920x1080 minimum
- [ ] Script visible on a second monitor or printed

### Recording Rules

- Record each segment as a separate file — easier to re-record one
  segment than to splice a monolithic recording
- Name files by segment: `seg-01-hook`, `seg-02-problem`, etc.
  (extension depends on tool — .trec, .mkv, .mp4)
- Record the voiceover live with the screen capture when possible —
  natural pacing beats post-dubbed audio
- For "Across the Table": record the full session continuously, mark
  segment boundaries in notes for later
- Capture extra b-roll of any interesting UI moments — these become
  Shorts candidates and pattern interrupts

### Post-Recording

- Export each segment as .mp4 to `03-recording\exports\`
- Naming: `seg-01-hook.mp4`, `seg-02-problem.mp4`, etc.
- Review each export — flag any segments that need re-recording
- Note actual timestamps vs. script timestamps

---

## Step 6: Assemble + Normalize (FFmpeg via Claude Code)

**Input:** Exported .mp4 segments from `03-recording\exports\`
**Output:** Edit-ready `04-assembly\rough-cut-normalized.mp4` + `cuts.json`
**Tool:** Claude Code running FFmpeg commands

This step automates the mechanical assembly AND pre-edit normalization.
The goal is an edit-ready file — not just concatenated segments. Claude
Code drives FFmpeg; the human reviews the output before moving to
Premiere.

**Automation-first principle:** Everything this step does would
otherwise be manual Premiere busywork. The more this step handles, the
less time Step 7 takes. If you find yourself doing a repeatable
operation in Premiere, move it here.

### Standard FFmpeg Operations (Required)

Claude Code must perform all of the following:

1. **Concat manifest generation:** Read segment files from
   `03-recording\exports\`, generate `concat.txt` in FFmpeg format
2. **Concatenation:** Join segments in script order
3. **Loudness normalization:** Normalize all segments to -14 LUFS
   (YouTube's target loudness) before concatenation — ensures
   consistent voice levels across segments
4. **Resolution enforcement:** Scale all segments to target resolution
   (1920x1080 for long-form, 1080x1920 for Shorts) — no mismatched
   frames
5. **Dead-air trimming:** Detect and trim silence longer than 0.5 sec
   at segment boundaries (configurable threshold)
6. **Intro/outro stub insertion:** Prepend intro and append outro
   placeholders from `C:\pcloud\LA\video-assets\intros\` and
   `C:\pcloud\LA\video-assets\outros\` (series-matched)
7. **Cut points metadata:** Generate `cuts.json` with segment
   boundaries, durations, and Shorts candidate timestamps from the
   script
8. **Shorts extraction:** Cut candidate Shorts clips to
   `04-assembly\shorts-raw\` based on timestamps marked in the script,
   cropped to 1080x1920 vertical

### Claude Code Commands (Reference)

```bash
# Loudness normalization (two-pass)
ffmpeg -i seg-01-hook.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null -
ffmpeg -i seg-01-hook.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=<val>:measured_TP=<val>:measured_LRA=<val>:measured_thresh=<val> normalized-seg-01.mp4

# Resolution enforcement
ffmpeg -i normalized-seg-01.mp4 -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" scaled-seg-01.mp4

# Generate concat manifest
# (Claude Code reads normalized + scaled segments, writes concat.txt)

# Concatenate segments
ffmpeg -f concat -safe 0 -i concat.txt -c copy concatenated.mp4

# Dead-air trimming
ffmpeg -i concatenated.mp4 -af silenceremove=stop_periods=-1:stop_duration=0.5:stop_threshold=-40dB -c:v copy rough-cut-normalized.mp4

# Extract a Shorts clip (vertical crop)
ffmpeg -i rough-cut-normalized.mp4 -ss 02:15 -t 00:45 -vf "crop=ih*9/16:ih,scale=1080:1920" shorts-raw/short-01.mp4
```

### Acceptance Criteria

`rough-cut-normalized.mp4` must meet all of the following before
proceeding to Step 7:

- [ ] No silence > 0.5 sec at segment boundaries
- [ ] Consistent audio levels across all segments (-14 LUFS +/- 1)
- [ ] Resolution matches target (1920x1080)
- [ ] Intro and outro stubs are present
- [ ] Total duration is within 20% of script target length

If any criterion fails, Claude Code re-runs the relevant FFmpeg
operation before presenting for human review.

### Deliverables

- `04-assembly\concat.txt` — FFmpeg concat manifest
- `04-assembly\rough-cut-normalized.mp4` — normalized, edit-ready
  rough cut
- `04-assembly\cuts.json` — segment metadata + Shorts timestamps
- `04-assembly\shorts-raw\` — raw Shorts clips (vertical, pre-edit)

### Human Review Gate

Watch the rough cut before proceeding. Check:
- [ ] Segment order matches script
- [ ] No audio gaps or pops at segment boundaries
- [ ] Audio levels feel consistent (no jarring volume shifts)
- [ ] Shorts candidates are correctly timestamped
- [ ] Overall pacing feels right (flag segments to trim in Premiere)
- [ ] Intro/outro stubs are in place

---

## Step 7: Edit + Polish (Adobe Premiere)

**Input:** `rough-cut-normalized.mp4` from `04-assembly\` + assets from
`01-research\` + shared assets from `C:\pcloud\LA\video-assets\`
**Output:** Final video + Shorts + thumbnail in `05-edit\`
**Tool:** Adobe Premiere Pro

**Scope reminder (Automation-First Principle):** Step 6 already handled
concatenation, loudness normalization, resolution enforcement, dead-air
trimming, intro/outro stubs, and Shorts extraction. Premiere handles
only what requires human judgment:

- Narrative timing (pacing, beat placement, dramatic pauses)
- Visual emphasis (zooms, highlights, motion graphics)
- Overlay placement (text, lower-thirds, question cards)
- Music selection and mix
- Branding polish

If you find yourself doing mechanical work in Premiere that could be
scripted, stop — add it to Step 6 for next time.

### Premiere Workflow

1. **Import:** `rough-cut-normalized.mp4` (already has intro/outro
   stubs, normalized audio, correct resolution), music tracks from
   `C:\pcloud\LA\video-assets\music\`, overlays from
   `C:\pcloud\LA\video-assets\overlays\`, b-roll from `01-research\`,
   thumbnail assets
2. **Refine the timeline:**
   - Replace intro/outro stubs with final branded sequences (if the
     stubs from Step 6 need adjustments)
   - Tighten hook segment (first 15 sec — retention-critical)
   - Adjust pacing in content segments
   - Insert pattern interrupts every 60-90 sec
3. **Add overlays:**
   - Text overlays for key points
   - Question overlays for pattern interrupts
   - Zoom/highlight on UI elements during demos
   - Lower-third for guest name ("Across the Table")
   - Channel watermark: `C:\pcloud\LA\video-assets\overlays\watermarks\`
     (lower-right, 20% opacity, present throughout — use the variant
     that contrasts with the video background)
   - Newsletter CTA card near outro if applicable:
     `C:\pcloud\LA\video-assets\lead-magnets\newsletter-signup-card.png`
4. **Audio mix:**
   - Layer background music (low, under voice — from shared library)
   - Audio is already normalized from Step 6 — Premiere handles only
     creative mix decisions (music levels, emphasis, SFX)
5. **Shorts polish:**
   - Import raw Shorts from `04-assembly\shorts-raw\` (already
     vertical-cropped from Step 6)
   - Add text overlay hook (first 2 seconds)
   - Add channel name end card
   - Export each to `05-edit\shorts\`
6. **Thumbnail:**
   - Create using series visual template from
     `C:\pcloud\LA\video-assets\thumbnails\`
   - Export to `05-edit\{prefix}-{NNN}-{slug}-thumbnail.png` (1280x720)
7. **Export:**
   - Final video: `05-edit\{prefix}-{NNN}-{slug}-final.mp4`
     (H.264, 1080p, high bitrate)
   - Shorts: `05-edit\shorts\{prefix}-{NNN}-{slug}-short-NN.mp4`
     (H.264, 1080p vertical)

### Quality Checklist

- [ ] Hook lands in first 15 seconds
- [ ] First 30 seconds delivers payoff, confirms promise, or escalates
      tension (if this fails in performance review, re-cut is mandatory)
- [ ] Mid-video CTA placed at peak value delivery moment
- [ ] Value density: no 30-second window without a new insight, outcome,
      or escalation
- [ ] Pattern interrupt present every 60-90 seconds
- [ ] Audio levels consistent throughout (voice > music)
- [ ] Intro and outro match series branding template
- [ ] End screen placed in **final 20 seconds** (YouTube hard constraint —
      video must be ≥25 sec total; end screen window opens at -20 sec)
- [ ] End screen points to a specific next video
- [ ] Channel watermark overlay present (lower-right, 20% opacity)
- [ ] Newsletter CTA card present in outro (if applicable to video topic)
- [ ] Thumbnail follows series visual template
- [ ] Alt thumbnail exists (for A/B test post-publish)
- [ ] Minimum 3 Shorts clips produced
- [ ] Each Short is self-contained (understandable without full video)
- [ ] Identity CTA is spoken clearly in outro (not generic)

### Reject Conditions

**Do not publish if any of the following are true:**

- Hook is unclear or missing in first 15 seconds
- No clear problem statement in the video
- No identity CTA (generic "try it" language)
- Fewer than 3 valid Shorts extracted
- Audio levels inconsistent (jarring volume shifts between segments)
- Thumbnail is not legible at mobile size

If any reject condition is met, fix it before proceeding to Step 8.
A rejected video goes back to the relevant step — not forward to
upload.

---

## Step 8: Upload to YouTube

**Input:** Final video + Shorts + thumbnail from `05-edit\`
**Output:** Published video + Shorts on YouTube
**Tool:** YouTube Studio

### Pre-Upload: Write YouTube Metadata

Create `06-publish\youtube-metadata.md`:

```markdown
# YouTube Metadata: [Discovery Title]

## Video
**Title:** [discovery title — under 70 chars, curiosity-driven]
**Description:**
[First line = hook — this shows in search results]

[Problem statement — 1-2 sentences]

[What this video covers — 2-3 bullet points]

[Identity CTA]

[Newsletter CTA — "Get the free deck-building primer:" or omit if not relevant]

Links:
- 🎮 Play: https://play.legendary-arena.com/?utm_source=youtube&utm_medium=video&utm_campaign=[slug]
- 🃏 Cards: https://cards.legendary-arena.com/?utm_source=youtube&utm_medium=video&utm_campaign=[slug]
- 📬 Free primer: https://legendary-arena.com/get-started?utm_source=youtube&utm_medium=video&utm_campaign=[slug]
- 📖 Blog post: https://legendary-arena.com/posts/[slug]/
- ▶️ Start Here playlist: https://www.youtube.com/playlist?list=[START_HERE_PLAYLIST_ID]
- 💬 Discord: [link]

Chapters:
0:00 [Hook]
0:15 [Segment 1 name]
X:XX [Segment 2 name]
...

**Tags:** [series name], [problem theme], legendary, deck-building,
card game, [5-10 relevant tags]

**Thumbnail:** thumbnail.png
**Alt Thumbnail:** alt-thumbnail.png (for A/B test if CTR < 5% at 72hr)
**Playlist:** [series playlist name]
**End Screen:** [specific next video — placed in final 20 sec]
**Cards:** [link to related video at relevant timestamp]
**Category:** Gaming
**Visibility:** Scheduled: [Tuesday–Thursday, 12–4pm audience timezone]

## Pinned Comment
[Identity CTA + newsletter link — this goes as the first comment,
pinned immediately after publish]

Example:
"Play one fair game and see if your rank actually means something →
https://play.legendary-arena.com
Get the free deck-building primer (12 cards most players build wrong) →
https://legendary-arena.com/get-started"

## Shorts
**Short 1:**
- Title: [curiosity hook — under 40 chars]
- Description: [1 line + link to full video]

**Short 2:**
...
```

### Upload Timing

Post on **Tuesday, Wednesday, or Thursday between 12pm–4pm** in the
primary audience timezone. Avoid Mondays (low engagement), Fridays
(weekend drift), and weekends (lower desktop viewership for gaming
tutorials). Schedule in YouTube Studio rather than publishing
immediately — this lets the algorithm serve the video at peak traffic.

**Shorts:** Spread across the week — do not post all 3-5 on the same
day. Example: long-form video on Tuesday → Short 1 Wednesday → Short 2
Friday → Short 3 Sunday. Each one is a separate impression event.

### Upload Checklist

- [ ] Upload final.mp4 to YouTube Studio
- [ ] Set title, description, tags from metadata doc
- [ ] Upload custom thumbnail
- [ ] Add to series playlist
- [ ] Set end screen (specific next video — in final 20 seconds)
- [ ] Add cards at relevant timestamps
- [ ] Set chapters in description
- [ ] Set channel watermark in YouTube Studio (Channel → Branding →
      Video watermark) — matches `video-assets\overlays\watermarks\`
- [ ] Schedule for Tuesday–Thursday 12–4pm (not immediate publish)
- [ ] Upload each Short with title + description + link to full video
- [ ] Schedule Shorts across the week (not all on same day)
- [ ] Record the YouTube video ID for blog cross-reference
- [ ] Post pinned comment immediately after publish (copy from metadata doc)
- [ ] Review and correct auto-generated captions (YouTube Studio →
      Subtitles) — fix game-specific terms (PAR, Legendary Arena,
      etc.) within 48 hours of publish

---

## Step 8b: Cross-Post Shorts

**Input:** Final Shorts from `05-edit\shorts\`
**Output:** Clips posted to TikTok + Instagram Reels
**Tool:** TikTok Studio, Instagram app / Meta Business Suite

The same 9:16 Shorts that go to YouTube also go to TikTok and
Instagram Reels. This drives external discovery back to the channel
and the site from audiences who don't use YouTube as their primary
feed. Each post uses platform-specific UTM parameters so you know
which platform is driving signups and play clicks.

**This is a volume game, not a quality game.** Post every Short from
every video. The overhead per clip is under 5 minutes.

### Cross-Post Checklist (per Short)

- [ ] Save a copy to `C:\pcloud\LA\social\tiktok\{prefix}-{NNN}\`
      and `C:\pcloud\LA\social\instagram-reels\{prefix}-{NNN}\`
- [ ] Upload to TikTok with:
  - Caption: [hook line from script] + "Full video on YouTube — link
    in bio"
  - UTM on bio link: `utm_source=tiktok&utm_medium=short&utm_campaign=[slug]`
- [ ] Upload to Instagram Reels with:
  - Caption: same hook line + "Full video on YouTube (link in bio)"
  - UTM on bio link: `utm_source=instagram&utm_medium=reel&utm_campaign=[slug]`
- [ ] Do NOT repost to TikTok/Instagram the same day as the YouTube
      Short — stagger by 1-2 days to avoid the algorithm treating
      it as duplicate content

---

## Step 9: Cross-Reference Blog

**Input:** YouTube video ID + blog draft from `02-script\`
**Output:** Published blog post on legendary-arena.com
**Tool:** Hugo + git

### Workflow

1. **Finalize blog post:** Copy `02-script\blog-draft.md` to
   `06-publish\blog-final.md`. Insert the YouTube video ID into the
   embed shortcode and the front matter `youtube` field.

2. **Copy to Hugo:** Copy `blog-final.md` to the Hugo content
   directory:
   ```
   C:\www\legendary-arena-com\content\posts\[date]-[slug].md
   ```

3. **Front matter checklist:**
   - [ ] `title` matches the blog-adapted discovery title
   - [ ] `date` is set to publish date
   - [ ] `description` is under 160 chars, problem-first
   - [ ] `draft: false`
   - [ ] `tags` include series tag + problem theme
   - [ ] `categories` include series category
   - [ ] `youtube` field contains the video ID

4. **Embed the video:** Add the YouTube shortcode near the top of the
   post (after the opening hook, before the deep content):
   ```
   {{</* youtube "VIDEO_ID" */>}}
   ```

5. **Cross-link:** Update the YouTube video description to include the
   blog post URL (if not already set in Step 8).

6. **Build and deploy:**
   ```bash
   cd C:\www\legendary-arena-com
   npm ci && npm run build
   ```
   Deploy per the existing Cloudflare Pages pipeline.

7. **Verify:**
   - [ ] Blog post renders correctly on legendary-arena.com
   - [ ] YouTube embed plays in the blog post
   - [ ] YouTube description links back to the blog post
   - [ ] UTM parameters are correct on all links

### Hugo Categories and Tags for Video Content

| Series | Category | Tags |
|--------|----------|------|
| Building the Arena | `dev-log` | `building-the-arena`, `[problem-theme]`, `development` |
| How to Play | `tutorials` | `how-to-play`, `[problem-theme]`, `guide` |
| Across the Table | `interviews` | `across-the-table`, `[problem-theme]`, `community` |

---

## Step 10: Performance Review (24-72 Hours Post-Publish)

**Input:** YouTube Analytics + site analytics
**Output:** `06-publish\performance-review.md`
**Tool:** YouTube Studio analytics + Cloudflare analytics

This step closes the feedback loop. Without it, each video is produced
in isolation — you never learn what works and what doesn't. Review
every video 24-72 hours after publish, when the initial distribution
wave has settled.

### Performance Review Template (`06-publish\performance-review.md`)

```markdown
# Performance Review: [Discovery Title]

**Video ID:** [YouTube ID]
**Published:** [date]
**Reviewed (72hr):** [date]
**Reviewed (30-day):** [date]
**Reviewed (90-day):** [date]

## Metrics (24-72 hr snapshot)

| Metric | Value | Target | Pass? |
|--------|-------|--------|-------|
| Impressions | | | |
| CTR (click-through rate) | | >5% | |
| Avg view duration | | >50% of video length | |
| Views (24 hr) | | | |
| UTM clicks to play.legendary-arena.com | | | |
| Newsletter signups (utm_campaign=[slug]) | | | |
| Blog post views | | | |
| Shorts views (total across all clips) | | | |
| Shorts -> full video clicks | | | |
| New subscribers from this video | | | |

## Retention Analysis

**Drop-off points:**
- [timestamp]: [what was happening — why did viewers leave?]
- [timestamp]: [what was happening]

**Retention peaks:**
- [timestamp]: [what was happening — why did viewers stay/rewatch?]

## Re-Upload Decision (check at 48 hours)

**Avg view duration at 48hr:** [%]

If avg view duration < 40%:
- [ ] Identify primary drop-off timestamp
- [ ] Determine cause: hook problem / pacing problem / wrong audience
- **Hook problem:** Re-cut the first 30 seconds and re-upload
  (YouTube allows unlisting + re-uploading without losing URL — use
  "Replace video" in YouTube Studio if available, or schedule the
  re-upload with the same title/description)
- **Pacing problem:** Identify the segment and trim it in Premiere;
  re-export and re-upload
- **Wrong audience:** Check who YouTube served it to (YouTube
  Analytics → Audience) — if the audience doesn't match, the title
  or thumbnail is pulling the wrong viewers; swap to Alt Title 1
- [ ] Document what was changed and why in this review

## Title + Thumbnail Effectiveness

**CTR at 72hr:** [%]
**CTR assessment:** [strong (>5%) / marginal (3-5%) / weak (<3%)]

**If CTR < 5% at 72hr:**
- [ ] Swap title to Alt Title 1 from Step 4b
- [ ] Set up A/B thumbnail test in YouTube Studio (Content → Test &
      Compare) using alt thumbnail from Step 4b
- [ ] Re-check CTR after 7 days and document result here

## Email Conversion

**Newsletter signups attributed to this video (via UTM):** [count]
**Conversion rate (signups / views):** [%]
**Assessment:** [strong / weak — which topic drove signups?]

*Over time: optimize toward topics that convert, not just topics
that get views.*

## What Worked

- [specific element that performed well]
- [specific element]

## What Failed

- [specific element that underperformed]
- [specific element]

## Changes for Next Video

- [concrete action to take]
- [concrete action]

## 30-Day Check

**Views (30-day total):** [count]
**Did the video find a second life through search?** [yes / no]
**If yes:** Which keyword drove it? Update tags/description if relevant.

## 90-Day Check

**Views (90-day total):** [count]
**Still driving newsletter signups?** [yes / no]
**Still driving play.legendary-arena.com clicks?** [yes / no]
**Follow-up episode warranted?** [yes / no — if yes, add to content calendar]
**Ready to archive?** [ ] Move folder to `C:\pcloud\LA\videos\_archive\`

## Top Performer Check (monthly — apply to top 20% videos)

**Is this video in the top 20% by views or watch time?** [yes / no]

If yes:
- [ ] Schedule a follow-up video (go deeper on this topic)
- [ ] Cut 3-5 new Shorts with fresh hooks from this footage
- [ ] Test new title/thumbnail variant in YouTube Studio

*Doubling down on winners is the highest-ROI growth move.*

## Automation Candidates

Any manual operation performed more than twice in this production
cycle that should be added to Step 6:

- [operation]: [how to automate]
```

### Funnel Movement Review

Views are a vanity metric until they move a viewer to the next business
state. For each video, record which transition in the acquisition funnel
it actually drove — not just how many people watched:

```
Visitor → Video viewer → Site visitor → Email subscriber
                                      ↘ First game started → First game completed → Returning player
```

Compare the achieved transition against the **Target Funnel Transition**
declared in Step 2. A video that earns 5,000 views but moves no one to
the next state failed at its job; a video with 500 views and 50 first
games succeeded. Use the UTM-tracked metrics already in the template
(play clicks, signups, first-game events) as the evidence.

This acquisition funnel is distinct from — and feeds into — the email
subscriber-state model (Pending → Confirmed → Welcomed → Active) owned by
[WP-018](../ai/work-packets/WP-018-brevo-automation.md). Don't duplicate
that model here; this review covers getting the viewer *to* the site and
into a first game.

### Review Cadence

- **24 hours:** Check CTR and early retention — if CTR is below 3%,
  swap the title to Alt Title 1 immediately
- **48 hours:** Check avg view duration — if below 40%, execute the
  re-upload decision protocol above
- **72 hours:** Full review using the template above; set up A/B
  thumbnail test if CTR is below 5%
- **30 days:** Quick re-check — did the video find a second life
  through search or Shorts?
- **90 days:** Final check — archive the folder, decide if a follow-up
  episode belongs on the content calendar

---

## Complete Production Checklist

Use this to track progress on each video. Copy to `01-research\notes.md`
at the start of production.

```markdown
## Production Checklist: [Discovery Title]

### Step 0: Topic Validation
- [ ] YouTube search confirms related videos exist with healthy views
- [ ] VidIQ/TubeBuddy keyword check passed
- [ ] Not already covered on this channel
- [ ] Demand confirmed (or dev-log exception applies)

### Step 1: Identify Problem
- [ ] Problem card written (all three SB7 levels)
- [ ] Story gap defined
- [ ] Villain tie established

### Step 2: Select Series
- [ ] Series assigned
- [ ] Content mode selected
- [ ] Primary goal declared (play / email / subscriber / gear)
- [ ] Discovery title drafted
- [ ] SB7 elements checklist completed

### Step 3: Research & Collect Assets
- [ ] Video folder created (naming convention: {prefix}-{NNN}-{slug})
- [ ] Research notes written
- [ ] Screenshots captured
- [ ] Card images pulled (if needed)
- [ ] B-roll identified
- [ ] Thumbnail candidates selected
- [ ] Music / SFX selected (from shared library)
- [ ] Guest confirmed (Across the Table only)

### Step 4: Write Blog + Script
- [ ] Blog draft written (Hugo front matter, content mode structure)
- [ ] Video script written (hook, segments, pattern interrupts, CTAs)
- [ ] Primary objection identified and answered on screen
- [ ] Newsletter CTA slot filled (or explicitly marked N/A)
- [ ] Shot list completed
- [ ] Minimum 3 Shorts candidates marked in script
- [ ] Each Short candidate is self-contained (no full-video dependency)

### Step 4b: Title + Thumbnail Gate
- [ ] 3 title variants generated
- [ ] VidIQ/TubeBuddy search score checked — keyword viable
- [ ] Primary thumbnail concept created (series template)
- [ ] Alt thumbnail concept created (for A/B test)
- [ ] Curiosity gap validated
- [ ] <1 sec comprehension validated
- [ ] No product knowledge dependency
- [ ] Cleared for recording

### Step 5: Record (Capture Layer)
- [ ] Pre-recording checklist passed
- [ ] All segments recorded
- [ ] Segments exported to .mp4
- [ ] Segments reviewed — no re-records needed

### Step 6: Assemble + Normalize (FFmpeg via Claude Code)
- [ ] Loudness normalized to -14 LUFS
- [ ] Resolution enforced (1920x1080)
- [ ] Dead air trimmed (>0.5 sec)
- [ ] Intro/outro stubs inserted
- [ ] Segments concatenated
- [ ] rough-cut-normalized.mp4 generated
- [ ] cuts.json generated
- [ ] Raw Shorts extracted (vertical crop)
- [ ] Acceptance criteria passed
- [ ] Human review gate passed

### Step 7: Edit + Polish (Premiere)
- [ ] Timeline refined (pacing, beat placement)
- [ ] First 30 seconds delivers payoff / confirms promise / escalates
- [ ] Mid-video CTA placed at peak value delivery
- [ ] Value density verified (no dead 30-sec windows)
- [ ] Overlays and pattern interrupts added
- [ ] Channel watermark overlay added (lower-right, 20% opacity)
- [ ] Newsletter CTA card added to outro (if applicable)
- [ ] End screen placed in final 20 seconds (links to next in binge path)
- [ ] Music mixed
- [ ] Shorts polished (text overlay, end card)
- [ ] Primary thumbnail created (series template, mobile-legible)
- [ ] Alt thumbnail created (for A/B test)
- [ ] Final export complete
- [ ] Quality checklist passed
- [ ] No reject conditions triggered

### Step 8: Upload to YouTube
- [ ] YouTube metadata written (includes newsletter link + Start Here playlist)
- [ ] Video uploaded
- [ ] Thumbnail, tags, description, chapters set
- [ ] Alt thumbnail saved (for A/B test at 72hr if CTR < 5%)
- [ ] Added to series playlist
- [ ] End screen and cards configured (end screen in final 20 sec)
- [ ] Channel watermark set in YouTube Studio (Channel → Branding)
- [ ] Scheduled for Tuesday–Thursday 12–4pm audience timezone
- [ ] Shorts uploaded and scheduled across the week
- [ ] Video ID recorded
- [ ] Pinned comment posted immediately after publish
- [ ] Auto-captions corrected within 48 hours of publish

### Step 8b: Cross-Post Shorts
- [ ] Shorts saved to `social\tiktok\` and `social\instagram-reels\`
- [ ] Uploaded to TikTok (staggered 1-2 days from YouTube post)
- [ ] Uploaded to Instagram Reels (staggered 1-2 days from TikTok)
- [ ] UTM parameters platform-specific on bio links

### Step 9: Cross-Reference Blog
- [ ] Blog post finalized with video ID
- [ ] Copied to Hugo content directory
- [ ] Front matter verified
- [ ] YouTube embed added
- [ ] YouTube description updated with blog URL
- [ ] Site built and deployed
- [ ] Cross-links verified

### Step 10: Performance Review
- [ ] 24-hr CTR check (swap title to Alt 1 if CTR < 3%)
- [ ] 48-hr avg view duration check (execute re-upload protocol if < 40%)
- [ ] 72-hr full review written (performance-review.md)
- [ ] A/B thumbnail test set up if CTR < 5% at 72hr
- [ ] Funnel movement recorded (achieved transition vs. Step 2 target)
- [ ] Drop-off points identified
- [ ] Email conversion rate recorded
- [ ] What worked / what failed documented
- [ ] Changes for next video recorded
- [ ] Automation candidates flagged for Step 6
- [ ] Top performer check (monthly — if top 20%, schedule follow-up + new Shorts)
- [ ] 30-day check scheduled (calendar reminder)
- [ ] 90-day check + archive decision scheduled (calendar reminder)
```
