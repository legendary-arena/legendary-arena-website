# WORK INDEX — Master Registry

**Purpose:** Single source of truth for all active work — Work Packets (WPs), Subagent Tasks (STs), and Enhancement Requests (ERs).

**Last updated:** 2026-07-22  
**Owner:** Jeff Jensen

---

## Quick navigation

- **[Phase P0](#phase-p0--conversion-foundation)** — Homepage clarity + dominant CTA (5-second comprehension)
- **[Phase P1](#phase-p1--funnel-optimization)** — Friction removal + secondary audience reach
- **[Phase P2](#phase-p2--distribution--reach-extension)** — Registry bridge + social reach
- **[Phase P3](#phase-p3--next-phase-commerce)** — Diorama product line integration
- **[Completed](#completed--v1-shipped)** — Live, stable, locked

---

## Status legend

- ✅ **Done** — Shipped, locked, in production
- 🔄 **In progress** — Active work, PR open or in session
- ⏭️ **Ready** — Preconditions met, ready to start anytime
- ⏸️ **Pending** — Waiting on a dependency or external input
- 🚫 **Blocked** — External blocker, needs user decision
- 🛌 **Parked** — Deferred, revisit when conditions change
- ❌ **Rejected** — Will not be done (with rationale noted)

---

## PHASE P0 — Conversion foundation

**Goal:** Answer "what is this?" in 5 seconds + make "Play now" visually dominant + remove first-time-visitor friction.

### Work Packets

| ID | Title | Status | Effort | Link |
|---|---|---|---|---|
| WP-023 | Diorama product-line landing page | ✅ Done (2026-06-08) | ~half-day | [ROADMAP](03-ROADMAP.md#wp-023--diorama-product-line-landing-page) |
| WP-027 | Header conversion links (Play + Cards in `menu.main`) | ✅ Done (2026-06-18, PR #50) | ~15 min | [WP](work-packets/WP-027-header-conversion-links.md) |

### Subagent Tasks (ready to run)

| ID | Title | Status | Effort | Link |
|---|---|---|---|---|
| ST-01 | Homepage CTA variants | ⏭️ Ready | ~1 hour | [prompt](ai/subagent-tasks/01-homepage-cta-variants.md) |
| ST-02 | Getting Started / Quickstart page | ⏭️ Ready | ~1 hour | [prompt](ai/subagent-tasks/02-quickstart-page.md) |

### Enhancement Requests feeding this phase

| ID | Title | Status | Disposition | Link |
|---|---|---|---|---|
| ER-012 | Getting Started / How to Play quickstart page | 🆕 Promoted to WP-026 | Promote | [ENHANCEMENT-REQUESTS](ENHANCEMENT-REQUESTS.md#er-012--getting-started--how-to-play-quickstart-page) |

### Next steps

1. **Run ST-01 + ST-02 in parallel** (both foundational, no dependencies)
2. **Review outputs** and select top variants
3. **Promote to WP-026 + WP-027** (homepage CTA optimization + quickstart page) if outputs warrant shipping

---

## PHASE P1 — Funnel optimization

**Goal:** Remove conversion friction across all pages + serve secondary audiences (press, partners) + salvage traffic from stale links.

### Work Packets

| ID | Title | Status | Effort | Link |
|---|---|---|---|---|
| WP-024 | Diorama page — product image + placeholder buy button | 🔄 In progress | ~1 hour | [ROADMAP](03-ROADMAP.md#wp-024--diorama-page--product-image--placeholder-buy-button) |
| WP-025 | Search demand-signal instrumentation (Plausible) | ⏸️ Pending (drafted 2026-06-11) | ~1–2 hours | [ROADMAP](03-ROADMAP.md#wp-025--search-demand-signal-instrumentation-plausible) |
| WP-028 | Newsletter honeypot spam trap | ✅ Done (2026-06-18, PR #51) | ~30 min | [WP](work-packets/WP-028-newsletter-honeypot.md) |

### Subagent Tasks (ready to run)

| ID | Title | Status | Effort | Link |
|---|---|---|---|---|
| ST-03 | Landing page friction audit | ⏭️ Ready (depends on ST-01 + ST-02) | ~45 min | [prompt](ai/subagent-tasks/03-friction-audit.md) |
| ST-04 | Press kit / media kit builder | ⏭️ Ready | ~45 min | [prompt](ai/subagent-tasks/04-press-kit.md) |
| ST-05 | 404 recovery funnel | ⏭️ Ready | ~30 min | [prompt](ai/subagent-tasks/05-404-recovery.md) |
| ST-06 | Registry landing page | ⏭️ Ready (depends on ST-04 + ST-05) | ~45 min | [prompt](ai/subagent-tasks/06-registry-landing.md) |

### Enhancement Requests feeding this phase

| ID | Title | Status | Disposition | Link |
|---|---|---|---|---|
| ER-009 | Custom 404 page + lost-user recovery flow | 📥 New | Promote | [ENHANCEMENT-REQUESTS](ENHANCEMENT-REQUESTS.md#er-009--custom-404-page--lost-user-recovery-flow) |
| ER-010 | Press kit / media kit page | 📥 New | Promote | [ENHANCEMENT-REQUESTS](ENHANCEMENT-REQUESTS.md#er-010--press-kit--media-kit-page) |
| ER-011 | Registry landing page on www (no live data) | 📥 New | Promote | [ENHANCEMENT-REQUESTS](ENHANCEMENT-REQUESTS.md#er-011--registry-landing-page-on-www-no-live-data) |

### Execution strategy

**Batch 1 (parallel):** ST-04 (press kit) + ST-05 (404) — independent, no shared dependencies  
**Batch 2 (sequential):** ST-03 (friction audit) after ST-01 + ST-02 complete — uses their outputs as context  
**Batch 3 (sequential):** ST-06 (registry landing) after ST-04 + ST-05 — references their patterns  

**Wall-clock:** ~8 hours (3 parallel batches, 2–3 hours wall-clock per batch)

### Next steps

1. **Finish WP-024** (diorama image + CTA — in progress)
2. **Run P1 subagent batch** (ST-03 through ST-06)
3. **Review outputs** and promote top recommendations to WPs (WP-026 through WP-029 candidate)
4. **Unblock WP-025** (analytics instrumentation — currently pending)

---

## PHASE P2 — Distribution & reach extension

**Goal:** Improve social CTR + establish registry bridge + extend reach to secondary channels.

### Work Packets

| ID | Title | Status | Effort | Link |
|---|---|---|---|---|
| WP-039 | Universal Rulebook page (`/rules`) + registry-viewer cross-reference | 🔄 In progress (site page ✅ Done; engine-repo cross-ref ⏸️ pending) | ~1 day | [WP-039](work-packets/WP-039-universal-rulebook-page.md) |
| WP-040 | Rename blog section URL `/posts/` → `/blog/` | 🔄 Repo change ✅ Done; CF zone Redirect Rule ⏸️ pending (manual) | ~half-day | [WP-040](work-packets/WP-040-blog-url-rename.md) |
| WP-043 | Public roadmap board (`/roadmap/`) — read-only Planned/In-progress/Shipped columns + vote counts, from the engine feedback API (`GET /api/feedback`, guest); the marketing surface of the engine feedback/roadmap system (engine D-24414) | ✅ Done (2026-08-25) — live at `/roadmap/`; A11y/BP/SEO ≥ 90, Perf carved out (pre-existing site-wide, see VISION lock) | ~1 day | [WP-043](work-packets/WP-043-public-roadmap-board.md) |

### Subagent Tasks (ready to run)

| ID | Title | Status | Effort | Link |
|---|---|---|---|---|
| ST-07 | Open Graph share-image brief | ⏭️ Ready (depends on ST-06) | ~30 min | [prompt](ai/subagent-tasks/07-og-share-images.md) |

### Enhancement Requests feeding this phase

| ID | Title | Status | Disposition | Link |
|---|---|---|---|---|
| ER-013 | Open Graph share-image baseline | 📥 New | Promote | [ENHANCEMENT-REQUESTS](ENHANCEMENT-REQUESTS.md#er-013--open-graph-share-image-baseline) |

### Next steps

1. **Run ST-07** after ST-06 (registry landing page) completes
2. **Promote to WP-030** (OG image creation + integration) if output is actionable
3. **Assign design** for image creation (ST-07 is a brief, not the PNGs)

---

## PHASE P3 — Next-phase commerce

**Goal:** Optimize diorama product line for sales + email integration + cross-sell patterns.

### Subagent Tasks (ready to run)

| ID | Title | Status | Effort | Link |
|---|---|---|---|---|
| ST-08 | Diorama product-line optimization brief | ⏭️ Ready (depends on WP-024) | ~30 min | [prompt](ai/subagent-tasks/08-diorama-optimization.md) |

### Enhancement Requests (future consideration)

| ID | Title | Status | Disposition | Link |
|---|---|---|---|---|
| — | Diorama lead magnets (5 PDFs) | 📥 Candidate | Promote | [from ST-08 output] |
| — | Diorama email funnel (4-email sequence) | 📥 Candidate | Promote | [from ST-08 output] |

### Next steps

1. **Finish WP-024** (diorama image + CTA)
2. **Run ST-08** after WP-024 lands
3. **Review output** and promote top recommendations to WPs (lead magnets, email funnel)

---

## COMPLETED — v1 shipped

**Status:** Live, stable, locked. Updates only via new WPs or maintenance.

### Core v1 Work Packets (all ✅ Done)

| ID | Title | Status | Completed | Link |
|---|---|---|---|---|
| WP-001 | Hugo skeleton + PaperMod theme | ✅ Done | 2026-05-07 | [ROADMAP](03-ROADMAP.md#wp-001--hugo-skeleton--papermod-theme-) |
| WP-002 | LA brand definition + tokens v1 | ✅ Done | 2026-05-07 | [ROADMAP](03-ROADMAP.md#wp-002--la-brand-definition--tokens-v1-) |
| WP-003 | Apply LA brand via theme overrides | ✅ Done | 2026-05-07 | [ROADMAP](03-ROADMAP.md#wp-003--apply-la-brand-via-theme-overrides-) |
| WP-004 | Content scaffolding + first 3 pages | ✅ Done | 2026-05-08 | [ROADMAP](03-ROADMAP.md#wp-004--content-scaffolding--first-3-pages-) |
| WP-005 | Pagefind search integration | ✅ Done | 2026-05-09 | [ROADMAP](03-ROADMAP.md#wp-005--pagefind-search-integration-) |
| WP-006 | Cloudflare Pages deploy + custom domain | ✅ Done | 2026-05-09 | [ROADMAP](03-ROADMAP.md#wp-006--cloudflare-pages-deploy--custom-domain-) |
| WP-007a | play.legendary-arena.com deploy | ✅ Done | 2026-05-10 | [ROADMAP](03-ROADMAP.md#wp-007a--playlegendary-arenacom-deploy-) |
| WP-007b | Registry viewer brand integration (cards.barefootbetters.com) | ✅ Done | 2026-05-11 | [ROADMAP](03-ROADMAP.md#wp-007b--registry-viewer-brand-integration-cardsbarefootbetterscom-) |
| WP-008 | SEO baseline + Schema.org markup | ✅ Done | 2026-05-11 | [ROADMAP](03-ROADMAP.md#wp-008--seo-baseline--schemaorg-markup-) |
| WP-009 | Class-color usage audit — cross-site | ✅ Done | 2026-05-12 | [ROADMAP](03-ROADMAP.md#wp-009--class-color-usage-audit--cross-site) |
| WP-010 | Header + footer site navigation | ✅ Done | 2026-05-10 | [ROADMAP](03-ROADMAP.md#wp-010--header--footer-site-navigation-) |
| WP-011 | `font-display: optional` — eliminate font-swap CLS | ✅ Done | 2026-05-10 | [ROADMAP](03-ROADMAP.md#wp-011--font-display-optional--eliminate-font-swap-cls-) |
| WP-012 | SessionStart hook + prune script — INFRA | ✅ Done | 2026-05-11 | [ROADMAP](03-ROADMAP.md#wp-012--sessionstart-hook--prune-script--infra) |
| WP-013 | Marketing-repo hygiene follow-up | ✅ Done | 2026-05-11 | [ROADMAP](03-ROADMAP.md#wp-013--marketing-repo-hygiene-follow-up-) |
| WP-014 | Public `/brand/` page + mood-board brief | ✅ Done | 2026-05-12 | [ROADMAP](03-ROADMAP.md#wp-014--public-brand-page--mood-board-brief-) |
| WP-015 | Newsletter signup with Brevo | ✅ Done | 2026-05-12 | [ROADMAP](03-ROADMAP.md#wp-015--newsletter-signup-with-brevo-) |
| WP-016 | Newsletter & blog templates | ✅ Done | 2026-05-12 | [ROADMAP](03-ROADMAP.md#wp-016--newsletter--blog-templates-) |
| WP-017 | Content pipeline + weeks 1–4 | ✅ Done | 2026-05-13 | [ROADMAP](03-ROADMAP.md#wp-017--content-pipeline--weeks-1-4-) |
| WP-018 | Email engagement workflow (Brevo automation) | ✅ Done | 2026-05-13 | [ROADMAP](03-ROADMAP.md#wp-018--email-engagement-workflow-brevo-automation-) |
| WP-019 | Snipcart shopping cart with Stripe checkout | ✅ Done | — | [ROADMAP](03-ROADMAP.md#wp-019--snipcart-shopping-cart-with-stripe-checkout-) |
| WP-020 | Newsletter & blog funnel enrichment | ✅ Done | 2026-05-13 | [ROADMAP](03-ROADMAP.md#wp-020--newsletter--blog-funnel-enrichment-) |
| WP-021 | Funnel analytics baseline | ✅ Done | 2026-05-14 | [ROADMAP](03-ROADMAP.md#wp-021--funnel-analytics-baseline-) |

### Completed Enhancement Requests (✅ Covered / 🆕 Promoted)

| ID | Title | Status | Disposition | Link |
|---|---|---|---|---|
| ER-001 | Global header and footer | ✅ Covered | Covered by WP-003 + WP-004 | [ENHANCEMENT-REQUESTS](ENHANCEMENT-REQUESTS.md#er-001--configure-global-header-and-footer) |
| ER-002 | Search feature | ✅ Covered | Covered by WP-005 | [ENHANCEMENT-REQUESTS](ENHANCEMENT-REQUESTS.md#er-002--implement-search-feature) |
| ER-003 | Blog index | ✅ Covered | Covered by Hugo + WP-004 | [ENHANCEMENT-REQUESTS](ENHANCEMENT-REQUESTS.md#er-003--create-blog-index) |
| ER-004 | Create blog post | ✅ Covered | Covered by WP-004 + content workflow | [ENHANCEMENT-REQUESTS](ENHANCEMENT-REQUESTS.md#er-004--create-blog-post) |
| ER-005 | Branding readable by Claude + Hugo | ✅ Covered | Covered by WP-002 | [ENHANCEMENT-REQUESTS](ENHANCEMENT-REQUESTS.md#er-005--branding-recognized-by-claude-and-hugo) |
| ER-006 | Sitemap (xml vs html) | ✅ Covered | Sitemap.xml by WP-008; HTML parked | [ENHANCEMENT-REQUESTS](ENHANCEMENT-REQUESTS.md#er-006--create-site-map-for-the-website) |
| ER-007 | SEO (RankMath equivalent) | 🆕 Promoted | Promoted to WP-008 | [ENHANCEMENT-REQUESTS](ENHANCEMENT-REQUESTS.md#er-007--implement-seo-rankmath-equivalent) |
| ER-008 | Cross-site navigation hardening | ✅ Covered | Covered by vision.md + WP-007a/b | [ENHANCEMENT-REQUESTS](ENHANCEMENT-REQUESTS.md#er-008--cross-site-navigation-hardening-cardsvar--future-registryvar) |

---

## Summary table — all items (reference)

| ID | Type | Title | Status | Phase | Effort | Owner | Dependencies |
|---|---|---|---|---|---|---|---|
| WP-001 | WP | Hugo skeleton + PaperMod | ✅ Done | Infra | ~half-day | Jeff | — |
| WP-002 | WP | Brand definition + tokens v1 | ✅ Done | Infra | ~1–2 days | Jeff | WP-001 |
| WP-003 | WP | Apply brand via theme | ✅ Done | Infra | ~1 day | Jeff | WP-002 |
| WP-004 | WP | Content scaffolding + home/about/blog | ✅ Done | v1 | ~half-day | Jeff | WP-003 |
| WP-005 | WP | Pagefind search | ✅ Done | v1 | ~half-day | Jeff | WP-004 |
| WP-006 | WP | Cloudflare Pages deploy | ✅ Done | v1 | ~half-day | Jeff | WP-005 |
| WP-007a | WP | play.* deploy | ✅ Done | v1 | ~1 day | Jeff | WP-006 |
| WP-007b | WP | cards.* brand integration | ✅ Done | v1 | ~half-day | Jeff | WP-006 |
| WP-008 | WP | SEO baseline | ✅ Done | v1 | ~1 day | Jeff | WP-006 |
| WP-009 | WP | Class-color audit | ✅ Done | v1 | ~0.5 day | Jeff | WP-007a + 007b + 010 |
| WP-010 | WP | Header + footer nav | ✅ Done | v1 | ~half-day | Jeff | WP-006 |
| WP-011 | WP | Font-display: optional | ✅ Done | v1 | ~1 hour | Jeff | WP-006 |
| WP-012 | WP | SessionStart hook + prune | ✅ Done | Infra | ~1 hour | Jeff | — |
| WP-013 | WP | Repo hygiene | ✅ Done | Infra | ~15 min | Jeff | — |
| WP-014 | WP | /brand/ page + mood-board | ✅ Done | v1 | ~half-day | Jeff | WP-007b + 010 |
| WP-015 | WP | Newsletter signup (Brevo) | ✅ Done | v1 | ~half-day | Jeff | WP-004 + 010 |
| WP-016 | WP | Newsletter + blog templates | ✅ Done | v1 | ~1 day | Jeff | WP-015 |
| WP-017 | WP | Content pipeline + weeks 1–4 | ✅ Done | v1 | ~1–2 days | Jeff | WP-016 |
| WP-018 | WP | Brevo automation | ✅ Done | v1 | ~half-day | Jeff | WP-015 |
| WP-019 | WP | Snipcart + Stripe | ✅ Done | v1 | ~1 day | Jeff | — |
| WP-020 | WP | Newsletter + blog funnel enrichment | ✅ Done | v1 | ~half-day | Jeff | WP-016 + 019 |
| WP-021 | WP | Analytics baseline | ✅ Done | v1 | ~1 hour | Jeff | WP-018 + 020 |
| WP-023 | WP | Diorama landing page | ✅ Done | P3 | ~half-day–1 day | Jeff | WP-010 + 014 + 015 |
| WP-024 | WP | Diorama product image + CTA | 🔄 In progress | P0 | ~1 hour | Jeff | WP-023 + 019 |
| WP-025 | WP | Search demand-signal instrumentation | ⏸️ Pending | P1 | ~1–2 hours | Jeff | WP-005 |
| WP-027 | WP | Header conversion links (Play + Cards) | ✅ Done | P0 | ~15 min | Claude | WP-010 |
| WP-028 | WP | Newsletter honeypot spam trap | ✅ Done | P1 | ~30 min | Claude | WP-015 |
| ST-01 | ST | Homepage CTA variants | ⏭️ Ready | P0 | ~1 hour | Claude | — |
| ST-02 | ST | Getting Started page | ⏭️ Ready | P0 | ~1 hour | Claude | — |
| ST-03 | ST | Friction audit | ⏭️ Ready | P1 | ~45 min | Claude | ST-01 + ST-02 |
| ST-04 | ST | Press kit | ⏭️ Ready | P1 | ~45 min | Claude | — |
| ST-05 | ST | 404 recovery | ⏭️ Ready | P1 | ~30 min | Claude | — |
| ST-06 | ST | Registry landing page | ⏭️ Ready | P1 | ~45 min | Claude | ST-04 + ST-05 |
| ST-07 | ST | OG share images brief | ⏭️ Ready | P2 | ~30 min | Claude | ST-06 |
| ST-08 | ST | Diorama optimization | ⏭️ Ready | P3 | ~30 min | Claude | WP-024 |
| ER-001 | ER | Global header + footer | ✅ Covered | — | — | — | WP-003 + WP-004 |
| ER-002 | ER | Search feature | ✅ Covered | — | — | — | WP-005 |
| ER-003 | ER | Blog index | ✅ Covered | — | — | — | Hugo + WP-004 |
| ER-004 | ER | Create blog post | ✅ Covered | — | — | — | WP-004 |
| ER-005 | ER | Branding for Claude + Hugo | ✅ Covered | — | — | — | WP-002 |
| ER-006 | ER | Sitemap | ✅ Covered | — | — | — | Hugo + WP-008 |
| ER-007 | ER | SEO (RankMath) | 🆕 Promoted | — | — | — | WP-008 |
| ER-008 | ER | Cross-site nav | ✅ Covered | — | — | — | vision.md + WP-007a/b |
| ER-009 | ER | 404 recovery | 📥 New | P1 | — | — | — |
| ER-010 | ER | Press kit | 📥 New | P1 | — | — | — |
| ER-011 | ER | Registry landing | 📥 New | P1 | — | — | — |
| ER-012 | ER | Getting Started quickstart | 🆕 Promoted | P0 | — | — | — |
| ER-013 | ER | OG share images | 📥 New | P2 | — | — | — |
| ER-014 | ER | Accessibility + keyboard nav | 📥 New | — | — | — | — |
| ER-016 | ER | Player wiki | 🛌 Parked | — | — | — | — |

---

## How to use this index

1. **Start a new phase:** Pick the phase section, review what's ready (`⏭️ Ready`), and run the subagent tasks.
2. **Track dependencies:** If a task is blocked, check the "Dependencies" column to see what's upstream.
3. **Promote to WP:** After a subagent task completes, review the output and create a new WP in ROADMAP.md (numbering continues from WP-025).
4. **Update this index:** Every time status changes, update this file. It's the north star for visibility.

---

## Next immediate actions

1. **Finish WP-024** (diorama image + CTA, in progress)
2. **Run ST-01 + ST-02 in parallel** (P0 subagent batch — ready now)
3. **Review ST-01 + ST-02 outputs** and decide: ship as-is, iterate, or promote to WPs
4. **Run P1 subagent batch** (ST-03–ST-06) after P0 completes
5. **Unblock WP-025** (analytics instrumentation — pending, ready to start when you prioritize)

---

## Notes for future updates

- This index is kept in sync with ROADMAP.md and ENHANCEMENT-REQUESTS.md
- When a new WP or ST is created, add it to the appropriate phase section + the summary table
- Status changes should be reflected in real-time (or at least at the start/end of each session)
- Dependencies are explicitly tracked so you can see what's blocking what
