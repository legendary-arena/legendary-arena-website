# Brand Asset Generation (On-Brand, No Slop)

**Site:** legendary-arena.com
**Framework:** StoryBrand SB7 + the locked brand system
**Companion:** [../brand/strategy.md](../brand/strategy.md), [video-commerce-plan.md](video-commerce-plan.md), [../04-CONTENT-CONVENTIONS.md](../04-CONTENT-CONVENTIONS.md), [homepage-spec.md](homepage-spec.md)
**Date:** 2026-09-01

---

This is the operating system for generating marketing assets — copy, thumbnails,
OG/social images, ad variants, video descriptions — with AI **without producing
generic slop or drifting off the brand**. It is a governance document: where a
statement could be read two ways, the normative rule wins.

The strategic input is a one-person AI-CPG workflow (Nate Herk generating a full
fake-brand asset pipeline with Claude Code). The **outputs** do not transfer —
Legendary Arena is a skill-first arena with a locked design system and a
no-pay-to-win line, not a drink brand. The **operating system** does: lock
*Pain, Person, Promise* and the honest product facts in files the generator
cannot wander from, generate a lot of on-brand candidates, and kill the rest.
A protein-can sizzle reel is not compatible; that discipline is.

---

## What this file owns (and what it doesn't)

**Owns:**

- The consolidated **Three Ps** (Pain / Person / Promise) for asset generation.
- The **context pack** — the required-reading manifest before any public copy or
  image is emitted.
- The **generate → QA (kill-list)** loop.
- The **creative tracker** schema and the **volume gate**.
- The explicit **do-not-adopt boundaries**.

**Does NOT own (cites, never restates):**

| Concern | Owner |
|---------|-------|
| Voice, verb palette, tone bright-lines, CTA contract, terminology | [../brand/strategy.md](../brand/strategy.md) §2–3 |
| Brand failure modes (the kill-list's foundation) | [../brand/strategy.md](../brand/strategy.md) §10 + [../04-CONTENT-CONVENTIONS.md § Brand failure modes](../04-CONTENT-CONVENTIONS.md#brand-failure-modes) |
| SKU facts, honest/forbidden phrases, per-video CTA legality | [video-commerce-plan.md](video-commerce-plan.md) |
| Positioning, Player Needs Pyramid, problem catalog (the Pain/Person source) | [homepage-spec.md](homepage-spec.md) + [homepage-appendix.md](homepage-appendix.md) |
| The fairness line revenue may never cross | [../01-VISION.md § Permanent non-goals](../01-VISION.md) |

This file assembles those into one thing an agent must read before generating. It
does not re-author voice or invent facts.

---

## The Three Ps

Every asset must serve Pain, Person, and Promise or it is slop. These consolidate
what already lives in the positioning docs into one block an agent can hold.

| P | Legendary Arena |
|---|-----------------|
| **Pain** | Tabletop Legendary is geography and setup. Most digital card games sell grind, gates, and an edge you can buy. The player who wants mastery has nowhere honest to put the hours. |
| **Person** | A deck-builder who already knows the genre, cares about decisions more than drops, and will read a scenario. Not a gacha whale, not an "open packs" shopper. (Primary audience per [../brand/strategy.md § Audience](../brand/strategy.md).) |
| **Promise** | Assemble heroes, read the scenario, earn standing from sessions played well. Same rules tomorrow as today. No bar, no gate, no purchase that changes the match. |

If an asset connects to none of these, it does not ship — the same job StoryBrand
does on the [video-commerce](video-commerce-plan.md) page.

---

## The context pack (required reading before generating)

Before emitting any public copy or image — a thumbnail, OG image, YouTube
description, social post, or ad variant — the generator (human or agent) reads
this pack. It is the fence the generator cannot wander past.

| Source | What it locks |
|--------|---------------|
| This file § Three Ps | Pain / Person / Promise |
| [../brand/strategy.md](../brand/strategy.md) §2 | Voice, verb palette (`assemble · build · recruit · fight · master · defeat · earn · become`), tone bright-lines (no emoji, no irony, no filler, no questions-as-headlines), copy patterns, CTA contract |
| [../brand/strategy.md](../brand/strategy.md) §3 + [../04-CONTENT-CONVENTIONS.md § Terminology](../04-CONTENT-CONVENTIONS.md#terminology) | Canonical terms (Hero · Mastermind · Scenario · Villain group · Henchmen · Scheme twist · Session · Mastery · Victory) |
| [video-commerce-plan.md § The gear](video-commerce-plan.md#the-gear-that-already-exists) | The three SKUs, prices, and honest vs forbidden phrases |
| [video-commerce-plan.md § video-job table](video-commerce-plan.md#video-job-decision-table) | Which CTA is legal on which surface / video |
| Real product photography (the C2 gate below) | The only images an asset may use — no SVG placeholders |

**Do not invent SKUs, prices, canonical terms, or player testimonials.** If a
fact is not in the pack, it does not go in the asset.

---

## Approved message bank

A short, human-owned set of on-brand lines the generator may reuse verbatim or as
seeds. It grows only by human addition — never by an agent inventing a line and
adding it. Every entry obeys the verb palette and tone bright-lines.

- The arena awaits.
- Assemble your heroes. Read the scenario. Earn your standing.
- Skill decides. Mastery is earned. The rules don't drift.
- Standing comes from sessions played well, not hours logged or money spent.
- No experience bars. No time-gated unlocks. No advantage you can buy.
- The system you learn today is the system you face tomorrow.
- Every session pushes back.

Gear lines are governed separately by [video-commerce-plan.md § Copy rules](video-commerce-plan.md#copy-rules)
(box / mat / guide) — pull them from there, do not paraphrase them here.

---

## Angles that fit (and where the CTA is legal)

Directional angles for asset generation — the Legendary Arena equivalents of a
CPG brand's promos, minus the discount-and-urgency reflex. Each angle inherits
the [video-commerce CTA legality](video-commerce-plan.md#video-job-decision-table):
gear is a primary CTA only where the object is intrinsic to the content.

| Angle | Anchors | Primary CTA legality |
|-------|---------|----------------------|
| Table presence (mat zones + turn tracker) | Playmat | Gear (mat) — where content is setup/table |
| First session / everything you need to start | Deck box | Gear (box) — how-to-play/first-session only |
| 52 weeks of strategy | Guide | Gear (guide) — deck-building/standing content |
| Skill decides / rules don't drift | Trust | **Play or email — never gear** |
| The weekly scenario is live | Calendar | Play |

Never make gear the CTA on a trust/fairness angle — that is the cannibalization
failure the [video-commerce plan](video-commerce-plan.md#the-fourth-conversion-goal-gear-purchase-and-its-precedence)
guards against.

---

## Generate → QA (the kill-list)

Generate many candidates; keep the on-brand ones; kill the rest. A candidate is
**killed** (not "revised until it limps across") if it trips any of these. The
first block is the standing brand-failure list; the second is generation-specific.

**From [../brand/strategy.md § 10 bright-lines](../brand/strategy.md):**
generic adjectives leading copy ("fun/exciting/epic"); mechanics-first framing;
terminology drift; raw color/font/spacing values off the token system; verbose or
"click here" CTAs; tone violations (emoji, humor undermining stakes, filler,
questions-as-headlines); copy requiring Marvel familiarity; self-deprecation
("fan-made", "amateur", "side project").

**Generation-specific kills:**

- Any [forbidden commerce phrase](video-commerce-plan.md#the-gear-that-already-exists)
  — "the edge you need," "the deck that wins," "pack," or the banned commerce
  vocabulary (luck, RNG, grind, gacha, pay-to-win, meta, tier list).
- **Fabricated cards** — invented card art, names, or text that do not exist in
  the registry.
- **AI player-avatar "testimonials"** — a synthetic player reviewing the arena.
  Integrity is the brand; a fake testimonial is a fairness incident waiting for a
  comment thread. **Refused outright** (see do-not-adopt).
- **Generic-template layouts** — page-builder / "AI website" look that fights the
  locked Hugo + token system.
- **Wrong or distorted logo / off-token color** — the design system is locked.
- **Placeholder imagery** presented as product (SVG stand-ins, un-shipped SKUs).

The QA reviewer may be an agent, but a human owns the final approval of any copy
or image before it goes public (see below).

---

## The creative tracker

When volume begins (after the gate), log every candidate. One row per asset.

| Field | Notes |
|-------|-------|
| Date | — |
| Type | still / thumbnail / OG / ad / description |
| Channel | www / YouTube / social |
| Angle | from the angles table |
| SKU | if gear-relevant; else — |
| Cost | generation spend, if any |
| Model / tool | which generator |
| Status | shipped / killed / needs-human |

**Do not track "winner" until there is a real surface to measure it on** — a live
video, a shop session, or a running ad. Before that, "winner" is a guess. Once a
measurable surface exists, judge by the [video-commerce metrics](video-commerce-plan.md#measurement)
(tag CTR, shop conversion, revenue per 1k views), not by impressions or likes.

---

## Volume gate (C2)

**No batch generation of product stills or gear ads until real product
photography exists** — the [video-commerce C2 gate](video-commerce-plan.md#commerce-readiness-gates).
The shop still ships SVG placeholders; generating 18 ad variants around a
placeholder is 18 pieces of trust-eroding slop. The right first batch, *once C2
clears*: 12 pieces — 4 stills (box, mat, guide, table), 4 YouTube thumbnails, 4
OG/social — all drawn from the message bank and real photos, all logged in the
tracker, all mapped to the [video-commerce angle/CTA table](video-commerce-plan.md#video-job-decision-table).

Non-gear assets (trust/positioning copy, thumbnails from real gameplay capture)
are not gated by C2 — they are gated only by the kill-list.

---

## Humans keep final copy

The generator drafts; a human approves every public copy line and image before it
ships. AI-generated marketing skews salesy by default — the brand voice is the
opposite (direct, no hype, no irony). The tone test from
[../04-CONTENT-CONVENTIONS.md § Voice and tone](../04-CONTENT-CONVENTIONS.md#voice-and-tone)
applies: read the candidate aloud next to an existing page; if it sounds like a
different writer, it is killed.

A short "grill me" interview — forcing the operator to state Pain, Person,
Promise, and a banned-word example before a batch — improves every downstream
prompt more than another generator connector does.

---

## Do NOT adopt

These are refused at this layer regardless of short-term conversion appeal:

- **AI-UGC player-avatar testimonials.** A synthetic player endorsing the arena
  is a fairness incident. Integrity is the product.
- **BOGO / urgency / two-for-one on standing or on the digital game.** Discount
  mechanics are permissible **only** on physical gear, and even then must never
  sound like a purchasable advantage ([../01-VISION.md non-goals](../01-VISION.md)).
- **Scroll-toy / "AI website" marketing site.** The site is Hugo + a locked token
  system; a scroll-animation gimmick site fights the brand and the stack.
- **Replacing the deploy path.** Deploy stays Hugo → Cloudflare Pages; not
  localhost/Vercel from a throwaway repo.
- **Treating a generation MCP as the marketing team.** Optional later for YouTube
  B-roll once the table is real — never a reason to spew 40 assets this week.

---

## Relationship to the other marketing docs

| Doc | Relationship |
|-----|--------------|
| [../brand/strategy.md](../brand/strategy.md) | Owns voice, verb palette, tone bright-lines, terminology, brand failure modes. This file assembles them into a generation fence and cites them; it never re-authors voice. |
| [video-commerce-plan.md](video-commerce-plan.md) | Owns the SKU facts, honest/forbidden phrases, and per-surface CTA legality that the pack and the angles table point to. |
| [homepage-spec.md](homepage-spec.md) / [homepage-appendix.md](homepage-appendix.md) | Own the positioning and problem catalog the Three Ps consolidate. |
| [../01-VISION.md](../01-VISION.md) | Owns the fairness line the do-not-adopt list enforces. |

The pertinent idea is not "the AI is the marketing department." It is: lock Pain,
Person, Promise, and the three honest SKUs in files the generator cannot wander
from — then make a lot of on-brand candidates and kill the rest.
