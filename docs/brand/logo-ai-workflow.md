# Legendary Arena — Logo AI Workflow & v0 Concept

**Status:** Working notes — captures AI tooling recommendations, the
concept-evaluation rubric, and a starter monogram concept. **Not** a design
contract.
**Owner:** Jeffery Jensen
**Last updated:** 2026-05-07

> **Authority:** This file is subordinate to `logo-brief.md`. Where this file
> and the brief disagree, the brief wins. Nothing here approves a logo —
> approval still flows through the brief's §9 acceptance criteria.

---

## 1. Recommended workflow

Given the project's governance rigor and the brief's locked constraints, the
optimal stack is layered — AI for direction and structure, human tools for
production-grade refinement.

### Use Copilot / Claude (LLM) for

- Constraint-perfect concepts aligned to `logo-brief.md`
- SVG-first vector outputs (token-friendly, `currentColor`-driven)
- Monogram exploration grounded in the brief's rules, not vibes

### Use Figma for

- Refinement and grid alignment
- Optical balance (LLMs are still weak here)
- Production export setup
- Usage-guide asset prep

### Use Midjourney / Ideogram / DALL·E only for

- Exploration of visual directions
- **Not** final assets

These tools fail the brief's small-size and token constraints: they cannot
guarantee 16px clarity, ignore token discipline, and introduce illegal
detail (gradients, noise, ornament density).

### What to avoid

- Canva / "AI logo generator" tools — too generic; violate the brief
  immediately on color, ornament, and small-size criteria.
- Treating any raster output as final — every accepted asset must be
  vector-native per `logo-brief.md` §8.

### Bottom line

Use AI for **direction and structure**, not for **final mark integrity**.

---

## 2. Evaluation rubric (required for every concept)

Every concept must be scored before refinement. The rubric maps directly
to the brief's §5.1 priority order. Critical criteria are pass/fail; the
rest are scored 1–5.

| Criterion | Weight | Threshold |
|---|---|---|
| 16px legibility (brief §5.2) | Critical | Pass / Fail |
| Single-ink monochrome recognizability (brief §5.1 #2) | Critical | Pass / Fail |
| Shape distinctiveness / ownability (brief §5.1 #3) | High | 1–5 |
| Brand alignment — heroic, deterministic, skill-first (brief §3, §5.1 #4) | High | 1–5 |
| Color discipline — gold-led, ≤1 accent (brief §5, §5.1 #5) | Medium | 1–5 |
| Complexity (lower is better) (brief §5.2, §6) | Medium | 1–5 |

**Rejection rules:**

- Any Critical fail → rejected immediately, no further work.
- Average across non-Critical criteria must be ≥4 to advance to Figma.
- Concepts that pass Critical but average 3.x are recorded as "explored,
  not advanced" — not silently dropped.

This turns concept generation into a **filter**, not just exploration.

---

## 3. Starter concept — "Arena Monogram (LA Disc)" — v0

A geometric LA monogram inside an arena-disc form. Symmetrical, gold-led,
designed to survive at favicon size. Treat as a *direction*, not a
candidate.

### Drop-in SVG

```svg
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>Legendary Arena Monogram</title>
  <desc>Geometric LA monogram inside an arena-disc form</desc>

  <!-- Arena outer ring -->
  <circle cx="256" cy="256" r="220" fill="none" stroke="currentColor" stroke-width="32"/>

  <!-- Inner structure (suggests arena + system grid) -->
  <circle cx="256" cy="256" r="140" fill="none" stroke="currentColor" stroke-width="16" opacity="0.4"/>

  <!-- "L" vertical bar -->
  <rect x="170" y="140" width="36" height="232" fill="currentColor" />

  <!-- "L" base -->
  <rect x="170" y="336" width="140" height="36" fill="currentColor" />

  <!-- "A" structure -->
  <polygon points="300,372 370,140 440,372" fill="currentColor"/>

  <!-- "A" counter -->
  <rect x="330" y="260" width="80" height="36" fill="currentColor" transform="skewX(-15)" />
</svg>
```

### Self-review against the §2 rubric

| Criterion | Verdict | Note |
|---|---|---|
| 16px legibility | At risk | Inner ring + "A" detail may merge with outer strokes at favicon scale |
| Single-ink monochrome | Pass | `currentColor`-only; no color dependency |
| Shape distinctiveness | 3 / 5 | Circle + L + A read as three primitives layered, not one unified mark |
| Brand alignment | 3 / 5 | Skew on the "A" counter breaks the deterministic / grid-aligned principle |
| Color discipline | Pass | Single-color-driven; no accent yet |
| Complexity | 3 / 5 | More internal structure than §5.2 wants |

**Conclusion:** v0 is a viable direction, **not a §9 candidate**. Named
failures:

- Skewed counter on the "A" violates the brief's deterministic /
  grid-aligned positioning (§3, §5.1).
- Circle + L + A are layered as three primitives — the mark should read
  as one engineered shape that *implies* LA, not three ideas stacked.
- "L" is visually dominant over "A," biasing the read toward "L+A"
  rather than "LA" as a unified monogram.
- Inner ring at 16px risks merging into surrounding strokes.

This is the rubric working as intended — v0 is filtered out, with
specific failures named, before any Figma time is spent.

### Specific fixes if iterating this direction

1. **Enforce grid purity.** Remove the skew entirely. Use verticals, 45°
   diagonals, and horizontal cuts only.
2. **Collapse into one shape.** Replace circle + L + A with a single
   engineered form that implies LA — e.g., L as the left wall of the
   arena, A as the internal structural peak, sharing one stroke logic.
3. **Reduce layers.** Drop the inner ring *or* the outer thickness
   variation. Keep one dominant structure.
4. **Equalize L/A visual weight.** Match stroke logic and proportions so
   the mark reads as "LA" rather than "L with an A next to it."

---

## 4. Direction set & next steps

The right move is not to refine v0 in isolation — it's to generate 3–4
competing directions, score them against §2, kill the bottom half, and
only then advance to Figma.

### Candidate directions (all constraint-faithful)

1. **Pure monogram (no enclosure).** LA fused into a single vertical
   form. Highest distinctiveness ceiling; depends on letter design.
2. **Arena disc (refined v0).** Simplified, unified structure with the
   §3 fixes applied.
3. **Tiered arena (ranking feel).** Concentric or stepped geometry; LA
   implied via negative space rather than drawn glyphs.
4. **Deck-edge abstraction.** Card-stack silhouette as the spine of the
   mark — geometric, not illustrative.

### Process

1. Generate SVG for all four.
2. Score each on the §2 rubric.
3. Reject anything failing a Critical criterion.
4. Take the top one or two into Figma for optical balance, grid
   snapping, and 16px hinting.
5. Build lockups, light/dark variants, and the usage guide from the
   chosen mark only — per the brief's §8 deliverables.

### Optional full-system bundle (after a direction wins)

- Wordmark (Bebas Neue–tuned)
- Icon + lockups (horizontal and stacked)
- Light/dark variants
- Usage rules matching the brief's §8 deliverables list

---

## 5. Strategic framing

The strongest long-term asset for this project is a **monogram that
becomes synonymous with the system** — not an illustration, not a "cool
logo." Reference points:

- Nike → swoosh
- OpenAI → knot
- Legendary Arena → an LA disc / system mark

The brief is already 90% aligned with this philosophy (see §6's "Preferred
direction").

**Sharper framing:** the winner will not look like "LA inside a circle."
The winner will feel like **a system symbol that happens to encode LA**.
That's the difference between a generic esports logo and an ownable
identity. The §4 candidate directions are scored against that bar.

---

## 6. Explorations conducted (record of what was tried)

Two AI-driven exploration rounds were run before stopping. All artifacts
(test pages and rendered PNGs at 16/32/64/128/256/512px) are archived
under `logo-explorations/`. None of the eight directions reached §9
acceptance — the value of these explorations is the named failure modes.

### Round 1 — Letter-based monograms (`logo-explorations/monograms/`)

Four LA-monograms generated and rendered:

- **D1 Hard-Grid LA.** Cleanest construction; single closed L path. The
  "A" is a triangle with a horizontal slot rather than a real letterform;
  it reads as A only by stencil suggestion.
- **D2 Tier Rings.** Failed §5.2 — three horizontal bands cut through
  both the L and the A under `evenodd`, fragmenting the interior. At 16px
  the disc reads but the contents collapse to noise.
- **D3 Deck-Edge.** Two SVG-level bugs: L corner has a hole (overlapping
  rects under `evenodd`), and three card-edge slabs slice the A into four
  bands. Switching to `nonzero` fixes the L but the slabs then occlude
  the A as solid overlays.
- **D4 Split-Axis.** Strongest of the four as rendered; the L corner
  renders solid by accident (a third overlapping path winds the
  cancelled corner back to filled). The A has a real triangular counter,
  giving it the clearest letter read of the set.

**Verdict:** All four were "letters in proximity," not real monograms.
The L and A never share strokes or geometry. Compare with VW, GE, HP,
YSL — real monograms fuse letterforms; these don't.

### Round 2 — Abstract symbols (`logo-explorations/abstract/`)

Four no-letter system marks generated and rendered:

- **A The Keep.** Square fortification top-down, four cardinal gates.
  Fails: at 512px the gates overpower the wall — reads as four corner
  pieces, not a ring with breaks. Hierarchy is wrong; either gates need
  to be much thinner relative to the wall, or commit to the
  quadrant-segmentation reading and drop the "arena" framing.
- **B The Summit.** Stepped silhouette ascending to a triangular peak.
  Strongest silhouette discipline of all eight; only direction that
  survives 16px cleanly with center-of-gravity intact. Fails: encodes
  *achievement* (end-state), not *assembly + system + arena*
  (mechanism). Could be any peak/mountain/podium logo.
- **C The Diamond.** Diamond split by a horizon line (two triangles with
  a gap). Distinctive abstract glyph. Fails: symbolic without semantic
  anchor — viewers will read it as hourglass, medal, play/pause. No
  natural narrative hook to accumulate brand meaning.
- **D The Hand.** Three vertical cards fanned from a single pivot. Most
  product-true direction (deck = the player's instrument). Fails: card
  proportions wrong (too tall and thin, reading as fence-rails); pivot
  merge collapses the three cards into a single blob; below 32px the fan
  collapses to an undifferentiated wedge.

**Verdict:** B has form discipline but no meaning. D has meaning but no
form. Neither hits the brief's "system symbol that happens to encode
LA." A and C are structurally one redraw away from being viable but
neither merits taking forward.

---

## 7. Designer handoff — the merge thesis

The strongest path forward, established by elimination across the eight
directions above, is **D done with B's discipline**. This section is the
designer brief.

### Lead direction

Start from D's product truth (a hand of cards / convergent stack) and
apply B's silhouette discipline as the rubric filter. **Do not** start
from B and add card-edge details — that produces stratification (peak +
internal decoration), not fusion. The cards must *be* the silhouette.

Specifically:

- The **outer silhouette** is made of card edges. There is no separate
  container shape (no peak frame, no disc, no boundary).
- A **peak emerges** when three angled cards converge at a point. The
  peak is the *result* of card geometry, not a frame imposed on top.
- The mark should read as **"three converging cards"** at large size,
  and as **"a single confident shape"** at 16px — same lines doing both
  jobs. If it reads as "peak with cards inside," the merge has failed.

### Success criteria (rubric filter from §2, applied)

- **Single dominant silhouette.** No internal primitives competing with
  the outline.
- **One counter maximum.** A single piece of negative space, if any.
- **No internal detail relying on strokes thinner than ~1.5px equivalent
  at 16px.**
- **At 16px the mark reads as one confident shape**, not a fragmenting
  fan or a featureless wedge. This is the binary pass/fail.
- **Card aspect ratio close to a real card** (~5:7), not the elongated
  fence-rail proportions in `abstract/D-hand.png`.

### Failure modes already identified

Use these as veto criteria during iteration:

- **Stratified read.** Peak read first, cards noticed second. Means the
  cards became decoration. Veto.
- **Pivot blob.** The three cards merge into a solid mass at the bottom
  fan-point. Veto.
- **Wedge collapse.** Below 32px the fan reads as a featureless wedge.
  Veto.
- **Letter mashup.** L and A forced back into the mark. Veto — Round 1
  already established this doesn't work.

### Why AI iteration stopped here

LLM-generated SVG produced constraint-compliant geometry across both
rounds, but cannot reliably:

- Tune optical balance of converging primitives
- Make three card-edges resolve into one confident silhouette rather
  than a busy blob
- Find the proportions where "fan of cards" *becomes* "peak" without
  losing either reading

The realistic next step is a Figma session iterating proportions,
convergence angles, and edge resolution against the success criteria
above. The artifacts under `logo-explorations/` exist as references for
what was tried and ruled out — not as starting points to refine.
