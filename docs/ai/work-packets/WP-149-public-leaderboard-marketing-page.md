# WP-149 — Public Leaderboard Marketing Page

**Cross-repo WP.** The authoritative specification lives in the engine
repo at `docs/ai/work-packets/WP-149-public-leaderboard-marketing-page.md`.

This stub satisfies the marketing-repo commit hook's WP-file-existence
check. The implementation is a read-only `/leaderboard/` page consuming
the public leaderboard API (WP-150 endpoints, WP-148 CORS allowlist).

**Files changed in this repo:**
- `content/leaderboard/_index.md` — section content file
- `layouts/leaderboard/list.html` — section layout override
- `assets/js/leaderboard.js` — client-side fetch, render, pagination
