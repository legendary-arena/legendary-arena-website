# Project Instructions

## Repo identity

This repo (`legendary-arena-com`) is the **Hugo marketing site** for
`www.legendary-arena.com`. It owns brand governance, roadmap, vision,
and cross-site WPs (WP-007a, WP-007b, etc.).

The **engine monorepo** (`legendary-arena`, GitHub
`barefootbetters/legendary-arena`) is checked out at **`C:\dev\legendary-arena\`**.
That's the one checkout; engine sessions run there. It moved off pCloud on
2026-10-17: `C:\pcloud\BB\DEV\legendary-arena.RETIRED-2026-10-17\` is a
rollback copy (never work in it), and the old `C:\www\legendary-arena\`
clone is deleted. The engine checkout is often on a feature branch, so read
the engine's current state from GitHub `main`, not from that folder.

It contains:

- `apps/registry-viewer/` — the Vue app at `cards.legendary-arena.com`
- `apps/arena-client/` — the Vue app at `play.legendary-arena.com`
- `apps/server/`, `packages/game-engine/`, `packages/registry/`, etc.

When a WP in this repo references `apps/registry-viewer/src/...` or
`apps/arena-client/src/...`, those paths live in the engine monorepo
(`C:\dev\legendary-arena\`), not here. Do not attempt to edit
engine monorepo files from this working directory.

## Marketing asset generation

Before generating **any** public-facing copy or image — homepage/blog copy,
thumbnails, OG/social images, video descriptions, ad variants — read
`docs/marketing/brand-asset-generation.md` and the context pack it names
(`docs/brand/strategy.md` §2–3 for voice/verb-palette/terminology, its
brand-failure list, and `docs/marketing/video-commerce-plan.md` for SKU facts and
CTA legality). Do **not** invent SKUs, prices, canonical terms, or player
testimonials, and do not batch-generate product imagery before real photography
exists (the C2 gate). AI-UGC player testimonials are refused outright.

## Preview

Do not start dev servers or attempt browser previews automatically.
Ask first — the answer will usually be no. Skip preview verification
unless explicitly requested.
