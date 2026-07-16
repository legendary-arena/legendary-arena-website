# WP-035 — Docs sweep: registry domain `cards.barefootbetters.com` → `cards.legendary-arena.com`

Follow-up to [WP-034](WP-034-header-nav-simplify.md), which repointed the nav
links. This WP sweeps the **current-state documentation and live content** to
reflect the registry's actual domain, `https://cards.legendary-arena.com/`
(live, HTTP 200, verified 2026-07-16).

## Facts established 2026-07-16

- `https://cards.legendary-arena.com/` — live, HTTP 200.
- `https://cards.barefootbetters.com/` — **still serves 200; no redirect.**
  Both domains answer with the registry.
- The migration landed on `cards.legendary-arena.com`, **not**
  `registry.legendary-arena.com` as the 2026-05-07 plan projected. Docs that
  named `registry.legendary-arena.com` as the future canonical are updated to
  reality.

## Sweep policy

- **Update:** files describing *current state* — live content pages, README,
  `01-VISION.md` architecture/contract sections, brand strategy terminology,
  corporate-memory brief, REFERENCE docs, logo brief, brand CHANGELOG
  preamble.
- **Leave:** dated *records* — Decisions-log rows, ROADMAP WP entries, locked
  work packets (WP-006/007a/007b/etc.), `docs/brand/CHANGELOG.md` version
  entries, audits, `docs/ENHANCEMENT-REQUESTS.md` ER text, untracked draft
  docs (`docs/ai/subagent-tasks/`, `docs/ai/WORK_INDEX.md`).
- **Append, never rewrite:** `docs/corporate-memory/01-decision-log.md` gets a
  new 2026-07-16 entry superseding the 2026-05-07 "stays at cards.bb for v1"
  entry; `01-VISION.md` Decisions log gets a matching row (required by its own
  Change-discipline rule — this touches Architecture + Cross-site contract
  text). `03-open-questions.md` migration bullet struck per its house style.
- **Deliberately untouched: `static/brand-tokens.css`.** Its header comment
  names the old domain, but the served file is SHA-256 hash-parity-checked
  against the bundled fallbacks in `apps/arena-client` and
  `apps/registry-viewer` (WP-007a lock,
  `70C11CEB…13FF`). A comment-only edit changes the live bytes, trips the
  parity trip-wire, and forces a coordinated engine-repo fallback refresh —
  all for zero functional gain. The comment gets corrected as a rider on the
  next *real* token change (which pays the coordination cost anyway).

## Files changed

| File | Change |
|---|---|
| `content/about/_index.md` | Registry URL updated; "transitional / will move to registry.legendary-arena.com" sentence dropped |
| `content/brand/_index.md` | Ecosystem list: registry URL updated |
| `content/posts/2026-05-07-launch-announcement.md` | Outbound registry link repointed (FIX-lane precedent: link maintenance in live posts) |
| `README.md` | Two registry-URL mentions updated |
| `docs/01-VISION.md` | Architecture table, migration paragraph, Cross-site contract consumers, project-relationship table, TBD list; new Decisions-log row |
| `docs/brand/strategy.md` | §3 terminology list + §5 Pattern C registry-URL note updated |
| `docs/brand/CHANGELOG.md` | Preamble consumer list updated (version entries untouched) |
| `docs/04-CONTENT-CONVENTIONS.md` | Index-scope note: registry URL updated |
| `docs/corporate-memory/00-business-brief.md` | Properties table, registry bullet, BarefootBetters-relationship note |
| `docs/corporate-memory/01-decision-log.md` | New 2026-07-16 entry (append-only) |
| `docs/corporate-memory/03-open-questions.md` | Migration bullet struck/resolved; redirect posture recorded as the remaining open item |
| `docs/ai/REFERENCE/01.2-bug-handling.md` | Consumer domain updated |
| `docs/ai/REFERENCE/01.3-commit-hygiene.md` | Consumer domain updated (×2) |
| `docs/ai/REFERENCE/01.4-pre-flight-invocation.md` | Consumer domain updated (×2) |
| `docs/brand/logo-brief.md` | Registry property URL updated |

## Definition of Done

- [ ] All "Update" files carry `cards.legendary-arena.com`; no current-state
      doc names `registry.legendary-arena.com` as the future canonical
- [ ] Decision-log entries appended (both logs); open-questions bullet struck
- [ ] `hugo build` clean; rendered `/about/`, `/brand/`, and launch post link
      to `cards.legendary-arena.com`
- [ ] Records verifiably untouched (`git diff` shows no edits inside dated
      entries/WP bodies)
- [ ] Commit on a `claude/*` branch → PR → `origin/main`

## What's NOT in scope

- **Redirect for the old domain.** `cards.barefootbetters.com` still serves
  the registry with no 301. Deciding/deploying redirect posture is
  CF-dashboard/engine-side work, owned outside this repo. Tracked in
  `03-open-questions.md`.
- **`static/brand-tokens.css` comment** — see Sweep policy.
- **Engine-repo docs** referencing the old domain.
- **Historical records** in this repo (see Sweep policy).
