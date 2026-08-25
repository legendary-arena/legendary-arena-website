# Task 06 — Registry Landing Page

**Objective:** Draft a marketing-friendly registry landing page on www that explains what the registry is and points visitors to right entry points (cards.barefootbetters.com) per ER-011, without violating static-only / no-live-data constraints.

**Owner:** Jeff Jensen  
**Phase:** P2 (reach extension + secondary surface)  
**Est. effort:** ~45 minutes  
**Dependencies:** Task 04 (press kit) + Task 05 (404 recovery) — understand the style + CTA patterns before writing this

---

## Inputs you need

1. **`01-VISION.md`** — Read architecture section (lines 60–87). The registry lives at `cards.barefootbetters.com` (v1); future migration to `registry.legendary-arena.com` is deferred. This page bridges www to the current registry without breaking static contract.
2. **ER-011** in **ENHANCEMENT-REQUESTS.md** — Lines 510–547. The intent: "explain what the registry is + provide curated entry links to cards.* ('Browse by set', 'Search cards', etc.)."
3. **`docs/brand/strategy.md`** — Tone and voice for consistency.
4. **Current site structure** — What other pages exist (home, about, blog, getting-started if Task 02 landed).

---

## Task description

The registry (`cards.barefootbetters.com`) is a separate property that houses the card browser and search. A visitor landing on `www.legendary-arena.com` should know:

1. "What is the registry?" (1–2 sentences)
2. "What can I do there?" (browse cards, search, filter by set/hero)
3. "How do I get there?" (clear link)

This page (`/registry/` on www) is a **bridge**, not a duplicate. It doesn't show live card data (that violates static-only) and doesn't replicate the registry's search (that's cards.* 's job). It's pure marketing + curated navigation.

### Section 1: What is the registry? (50–75 words)

Generate 1 variant that explains:
- The registry is the card browser for Legendary Arena
- It's where you explore all 60 cards, their abilities, and how they fit into decks
- It's a separate, stable reference for card data
- Link to cards.barefootbetters.com

Example:
> "The Legendary Arena Registry is the complete card browser. Explore all 60 unique cards, see their abilities, and discover which heroes and card combinations work best together. It's a living reference — updated as new cards are added. The registry is maintained separately from the game itself, so it's always fast and always accurate."

### Section 2: How to browse (curated entry points)

Generate 5 curated entry links with brief descriptions:

1. **"Browse cards by set"**
   → cards.barefootbetters.com/sets/
   - Start here if you want to explore the full card collection organized by set
   
2. **"Search cards"**
   → cards.barefootbetters.com/ (with search input highlighted)
   - Find a specific card or filter by hero, cost, or ability
   
3. **"Explore heroes"**
   → cards.barefootbetters.com/heroes/ (or equivalent)
   - See all 5 heroes and which cards belong to each hero's faction
   
4. **"View combos & synergies"**
   → cards.barefootbetters.com/combos/ (if exists; otherwise skip)
   - Discover powerful card combinations and deck-building patterns
   
5. **"Download the reference PDF"**
   → cards.barefootbetters.com/assets/card-reference.pdf (if exists; otherwise skip)
   - Print or reference a complete card list offline

Note: Not all of these links may exist (e.g., `/combos/` might not be a live registry feature). Mark uncertain links as "TBD — confirm with registry team" and focus on "Browse sets" and "Search" as the stable entry points.

### Section 3: Why use the registry? (value prop)

Generate 1 variant that explains value to different persona:

- **For deck builders:** "Find the right cards for your strategy. See all abilities, costs, and synergies at a glance."
- **For players exploring:** "Understand the full card pool before building your first deck."
- **For theorycrafters:** "Analyze card combinations and build optimized decks offline."

### Section 4: Next steps (CTA)

Generate 2 CTA options:

**Option A: Aggressive (just a button)**
> **Explore the full card registry →** cards.barefootbetters.com

**Option B: Soft (framed as optional)**
> **Want to dive deeper into cards?** Browse the full registry at cards.barefootbetters.com. Or head back to play if you're ready to build your first deck.

Recommend Option A (clearer CTA).

### Section 5: Stability + future note (optional boilerplate)

Generate 1 brief note about the registry's place in the three-site architecture:

> **Note:** The registry is maintained separately from the game and www. This means card data, card search, and card reference are stable and don't depend on the game server or the marketing site being online. The registry's URL is `cards.barefootbetters.com` for v1; a future migration to `registry.legendary-arena.com` is planned but not blocking gameplay.

(This is optional — only include if the user wants to explain the three-site architecture to visitors. Can be removed or moved to footer if too technical.)

---

## Output format

One markdown file: `registry-landing.md`

Structure as follows:

```md
# The Card Registry

## Executive Summary

- **One-liner:** "The registry is the card browser for LA; explore all 60 cards and build better decks."
- **Primary entry point:** "Browse sets" (stable, always works)
- **Secondary entry point:** "Search cards" (stable, always works)

---

## What is the registry?

[50–75 word explanation]

---

## How to get there

### Curated entry points

1. **Browse cards by set**
   → cards.barefootbetters.com/sets/
   [description]

2. **Search cards**
   → cards.barefootbetters.com/
   [description]

3. **Explore heroes**
   → cards.barefootbetters.com/heroes/
   [description]

[Continue for remaining entry points]

---

## Why explore the registry?

### For deck builders
[value prop]

### For players exploring
[value prop]

### For theorycrafters
[value prop]

---

## Ready to explore?

[CTA option A or B]

---

## About the registry

[Optional: Note on stability + three-site architecture]

---

## Assumptions

- The registry at cards.barefootbetters.com is stable and live
- Not all potential entry points exist yet (mark uncertain ones as TBD)
- Visitors are familiar with "cards" and "decks" from the home / about pages
- This page is static (no live card data, no dynamic imports from registry)
```

---

## Success criteria

- [x] "What is the registry" explanation is clear and <100 words
- [x] 5 curated entry links are provided (or 2–3 if others are TBD)
- [x] Each entry point includes a brief description of what a visitor will find
- [x] Primary CTA is clear ("Explore the registry")
- [x] Stable links (Browse sets, Search) are marked as confirmed
- [x] Uncertain links (Combos, PDFs) are marked TBD or excluded
- [x] Tone matches brand voice (no jargon, confident)

---

## Constraints

- **Static-only.** No runtime fetching from the registry. No live card count, no dynamic data.
- **No duplication.** Don't re-create registry features (search, filters) on www. Just link to them.
- **Graceful degradation.** If cards.* is offline, this page still renders; links may be broken, but the page isn't.
- **Brand consistency.** Header, footer, tone match the rest of www.

---

## Do / Don't

**DO:**
- Think of this as a "bridge" or "portal" page, not a registry mirror
- Link to stable registry features (sets, search) that are unlikely to move
- Provide multiple entry points (different visitors want different things)
- Mark uncertain links as TBD so the user can verify with registry team before launch
- Explain why the registry matters (helps players build better decks)

**DON'T:**
- Try to show live card data (that's static-only violation)
- Replicate the registry's search or filtering UI (duplication + maintenance nightmare)
- Assume all registry URLs are stable (they might change in the migration to registry.legendary-arena.com)
- Use technical jargon (keep it accessible to new players)
- Make the page so long it becomes a help center (keep it focused: what + why + where)
