# Project Instructions

## Repo identity

This repo (`legendary-arena-com`) is the **Hugo marketing site** for
`www.legendary-arena.com`. It owns brand governance, roadmap, vision,
and cross-site WPs (WP-007a, WP-007b, etc.).

The **engine monorepo** (`legendary-arena`) is checked out in two places
on this machine:

- **Active checkout — `C:\pcloud\BB\DEV\legendary-arena\`.** This is the
  working tree: at `origin/main` HEAD, with `node_modules` installed, and
  where engine sessions actually run. Use this path for all engine work.
- **Secondary/stale clone — `C:\www\legendary-arena\`.** A backup copy that
  lags `origin/main` (it was 132 commits behind with no `node_modules` when
  this note was written, 2026-06-09). Do **not** treat it as canonical — pull
  it or ignore it, but don't edit against it.

Either checkout contains:

- `apps/registry-viewer/` — the Vue app at `cards.legendary-arena.com`
- `apps/arena-client/` — the Vue app at `play.legendary-arena.com`
- `apps/server/`, `packages/game-engine/`, `packages/registry/`, etc.

When a WP in this repo references `apps/registry-viewer/src/...` or
`apps/arena-client/src/...`, those paths live in the engine monorepo
(`C:\pcloud\BB\DEV\legendary-arena\`), not here. Do not attempt to edit
engine monorepo files from this working directory.

## Preview

Do not start dev servers or attempt browser previews automatically.
Ask first — the answer will usually be no. Skip preview verification
unless explicitly requested.
