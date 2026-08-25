# Subagent Task Stack — Marketing Site Conversion Optimization

**Purpose:** Eight parallel/sequential subagent tasks to optimize www.legendary-arena.com for conversion, secondary-audience reach, and resilience.

**Stack owner:** Jeff Jensen  
**Created:** 2026-06-12  
**Status:** Ready to execute

---

## The 8-item stack

| # | Task | Priority | Depends on | Parallel with |
|---|---|---|---|---|
| 01 | Homepage CTA variants | P0 | Vision + ENHANCEMENT-REQUESTS | 02, 03 |
| 02 | Getting Started page | P0 | Vision + ER-012 clarity | 01, 03 |
| 03 | Landing friction audit | P1 | Vision + current copy | 01, 02 |
| 04 | Press kit builder | P1 | WP-002 (brand) + ER-010 | 05, 06 |
| 05 | 404 recovery funnel | P1 | ER-009 | 04, 06 |
| 06 | Registry landing page | P2 | ER-011 + vision | 04, 05 |
| 07 | OG share-image brief | P2 | WP-002 (brand) + ER-013 | 06 |
| 08 | Diorama optimization | P3 | WP-024 (in-progress) | — |

---

## Execution strategy

### Phase 1: P0 conversion foundation (parallel)
- **Tasks 01 + 02** run in parallel (both drive top-of-funnel clarity)
- **Task 03** starts after 01 + 02 for friction context
- **Wall-clock:** ~4 hours per task; total ~8 hours for Phase 1

### Phase 2: Funnel + reach (parallel)
- **Tasks 04 + 05** run in parallel (press + 404 are independent surfaces)
- **Task 06** starts after 04 + 05 (registry landing references press/brand patterns)
- **Wall-clock:** ~4 hours per task; total ~8 hours for Phase 2

### Phase 3: Distribution + next-phase (sequential)
- **Task 07** (OG images) starts after 06 (establishes page patterns)
- **Task 08** (diorama) runs independently after WP-024 completes
- **Wall-clock:** ~3 hours per task; total ~6 hours for Phase 3

**Total estimated overnight capacity:** 22 hours (~3 parallel batches, 6–8 hours wall-clock per batch)

---

## Standard subagent contract (all 8 tasks)

**Inputs:**
- `01-VISION.md` (vision + success criteria + constraints)
- `03-ROADMAP.md` (roadmap + WP lock receipts for context)
- `ENHANCEMENT-REQUESTS.md` (triage + ER status)
- Current site copy / live URL spot-checks where noted

**Required output format:**
- One markdown file per task
- Executive summary (2–3 bullet points)
- Ranked recommendations (top 3–5, why each matters)
- Copy-paste-ready draft text (no "TODO", no stubs)
- DO / DON'T notes (tone, brand, conversion discipline)
- Explicit assumptions listed (what you're assuming about the site, audience, business)

**Constraints (all tasks):**
- Respect static-only architecture (no runtime fetching, no backend dependency)
- Favor play.legendary-arena.com conversion + newsletter signup + shop
- No speculative implementation detail beyond current scope
- Tone: confident but not hype (matches `docs/brand/strategy.md` voice)

**Success criteria per task:** See individual prompt files (01–08).

---

## How to invoke a subagent

Copy the entire contents of the task file (e.g., `01-homepage-cta-variants.md`) and paste into your subagent runner (Ollama, Claude, etc.) as the system prompt or user message.

Expect:
- ~1 hour per P0 task (detailed variant exploration)
- ~45 min per P1 task (structured audit/kit)
- ~30 min per P2–P3 tasks (single-page brief)

---

## Coordination notes

### Brand + tone consistency
All 8 tasks reference `docs/brand/strategy.md` for voice/tone. The brand is already locked (WP-002); tone is **declarative, not hyped** — emphasize clarity and confidence, not excitement.

### CTA discipline
- **Homepage + Quickstart** set the primary CTA frame ("Play now" / "Start playing")
- **Press kit + Registry + 404** surface secondary CTAs (newsletter, shop, docs)
- **Friction audit** ensures no CTA conflict across pages
- Task 03 (friction audit) may call out CTA sequencing issues for later refinement

### Cross-task dependencies
- Tasks 01 + 02 outputs inform Task 03 (friction audit will reference the hero + quickstart flow)
- Tasks 04 + 05 inform Task 06 (registry landing page references press + brand patterns)
- Task 07 (OG images) uses copy from 01 + 02 + 06 for image composition rules
- Task 08 (diorama) stands alone but may reference shop CTAs from Task 04 (press kit includes shop positioning)

---

## Handoff to implementation

Once all 8 subagents complete:

1. **Review outputs** — spot-check for tone consistency + brand alignment
2. **Prioritize** — stack the outputs by implementation effort (some may be quick copy-pastes; others may require design)
3. **Batch by page** — group recommendations by page (home, about, posts, etc.) for efficient implementation
4. **Sequence** — WPs for top recommendations (e.g., if friction audit surfaces a critical CTA fix, that becomes a scoped WP)

---

## Files in this directory

- `README.md` (this file)
- `01-homepage-cta-variants.md`
- `02-quickstart-page.md`
- `03-friction-audit.md`
- `04-press-kit.md`
- `05-404-recovery.md`
- `06-registry-landing.md`
- `07-og-share-images.md`
- `08-diorama-optimization.md`
