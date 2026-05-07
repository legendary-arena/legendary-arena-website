# Legendary Arena Website — Roadmap

**Repo:** github.com/legendary-arena/legendary-arena-website
**Owner:** Jeffery Jensen
**Last updated:** 2026-05-07

> **Authority:** This document tracks Work Packets (WPs) for the marketing
> site. It is subordinate to `01-VISION.md`. If a WP description here
> conflicts with the vision, the vision wins.

---

## Status legend

- ✅ **Done** — DoD met, committed, pushed
- 🔄 **In progress** — actively being worked
- ⏭️ **Up next** — ready to start, all dependencies met
- ⏸️ **Pending** — waiting on a dependency
- 🚫 **Blocked** — needs an outside input or decision

## Summary

| WP | Title | Status | Dependencies | Est. effort |
|---|---|---|---|---|
| W001 | Hugo skeleton + PaperMod theme | ✅ Done | — | half-day |
| W002 | LA brand definition + tokens.css | ⏭️ Up next | W001 | 1–2 days |
| W003 | Apply LA brand via theme overrides | ⏸️ Pending | W002 | 1 day |
| W004 | Content scaffolding + first 3 pages | ⏸️ Pending | W003 | half-day |
| W005 | Pagefind search integration | ⏸️ Pending | W004 | half-day |
| W006 | Cloudflare Pages deploy + custom domain | ⏸️ Pending | W005 | half-day |
| W007a | play.legendary-arena.com deploy + brand tokens | ⏸️ Pending | W006 | 1 day |
| W007b | registry.legendary-arena.com deploy + brand tokens | ⏸️ Pending | W006 | 1 day |

**Total realistic effort:** ~5–7 days of focused work.

---

## WP-W001 — Hugo skeleton + PaperMod theme ✅

**Status:** Done (2026-05-07)
**Commits:** `1b56fc2` (vision doc), `e228eb5` (Hugo skeleton)

### Deliverables

- Hugo Extended installed (`hugo v0.161.1+extended`)
- Hugo site initialized in `C:\www\legendary-arena-com\`
- PaperMod theme added as Git submodule at `themes/PaperMod`
- `hugo.toml` configured with LA-specific values (title, baseURL, description)
- `01-VISION.md` committed
- First push to `origin/main`

### Definition of Done

- [x] `hugo version` shows Hugo Extended
- [x] `hugo server` renders cleanly at `http://localhost:1313/`
- [x] Home page shows "Legendary Arena" header + hero text
- [x] PaperMod styling applied (not unstyled HTML)
- [x] Repository pushed to GitHub

### Notes

- Using **upstream PaperMod as a submodule**, not a fork. Customizations
  go in `assets/css/extended/` and `layouts/` overrides in this repo —
  the theme stays upgradeable.
- Two harmless deprecation warnings remain (PaperMod templates using
  older Hugo APIs); they resolve when upstream PaperMod ships a Hugo-API
  compatibility update.

---

## WP-W002 — LA brand definition + tokens.css ⏭️

**Status:** Up next
**Effort:** 1–2 days
**Dependencies:** W001

### Goal

Establish Legendary Arena's visual identity and produce the consumable
`brand-tokens.css` that all three sites (www, play, registry) will use.

### Two phases

**Phase A — Strategy (~half-day, mostly thinking)**

- Audience: who plays / would play LA?
- Mood: what does LA *feel* like? (epic / casual / gritty / polished / retro / modern)
- Reference brands: 2–3 to nod toward, 1–2 to contrast against
- Voice & tone: how does LA "speak"?

**Phase B — Tactical (~1 day, decide and document)**

- Color palette: primary, secondary, accent, neutrals, semantic (success/warning/error). Light + dark variants.
- Typography: display font, body font, mono font. Pick from Google Fonts. Document fallbacks.
- Spacing scale: base unit (4px or 8px), scale (4/8/12/16/24/32/48/64/96), usage rules.
- Output `brand-tokens.css` (CSS custom properties).

### Deliverables

```
docs/brand/
├── strategy.md        ← Phase A output
├── palette.md         ← color tokens with hex values
├── typography.md      ← font choices, scale, weights
└── spacing.md         ← scale and usage rules

static/
└── brand-tokens.css   ← consumable artifact for all three sites
```

### Out of scope

- **Logo design** — wordmark placeholder for v1; real logo deferred to a later effort
- **Illustration style, photography direction, motion language** — defer
- **Brand voice guide beyond a paragraph** — full guide is overkill for v1

### Definition of Done

- [ ] `docs/brand/strategy.md` written and committed
- [ ] `docs/brand/palette.md` written with hex values + semantic mappings
- [ ] `docs/brand/typography.md` written with Google Fonts choices
- [ ] `docs/brand/spacing.md` written with scale
- [ ] `static/brand-tokens.css` produced from above decisions
- [ ] `hugo server` still renders without errors after CSS added

---

## WP-W003 — Apply LA brand via theme overrides ⏸️

**Status:** Pending W002
**Effort:** 1 day
**Dependencies:** W002

### Goal

Restyle the site to match LA brand without modifying PaperMod's source.

### Approach

Use Hugo's theme override mechanism. Files placed in this repo's
`assets/` and `layouts/` folders take precedence over identically-named
files in the theme. PaperMod stays upgradeable.

### Deliverables

- `assets/css/extended/custom.css` — PaperMod's recommended override location for CSS. Imports `brand-tokens.css` and applies brand to PaperMod's elements.
- Layout overrides in `layouts/` if needed (e.g., custom header partial to match brand nav)
- Updated `hugo.toml` if theme params need adjusting

### Definition of Done

- [ ] Home page reflects LA brand colors and typography
- [ ] Both light and dark modes look on-brand
- [ ] No modifications to `themes/PaperMod/` (verify via `git submodule status`)
- [ ] `hugo server` renders without errors
- [ ] Lighthouse score still ≥90 on home page

---

## WP-W004 — Content scaffolding + first 3 pages ⏸️

**Status:** Pending W003
**Effort:** half-day
**Dependencies:** W003

### Goal

Replace placeholder content with real v1 copy for home, about, and one
blog post. Establish front-matter conventions and folder structure for
ongoing content additions.

### Deliverables

- `content/_index.md` — homepage with hero, value prop, "play now" CTA
- `content/about/_index.md` — what LA is, who's behind it, status
- `content/posts/2026-05-XX-launch-announcement.md` — first blog post (template + real content)
- `archetypes/posts.md` — front-matter template for new posts
- README of front-matter conventions in `docs/04-CONTENT-CONVENTIONS.md`

### Definition of Done

- [ ] Home page reads cleanly to a first-time visitor
- [ ] "Play now" CTA visible above the fold, links to `play.legendary-arena.com` (URL can be a placeholder until W007a)
- [ ] About page has actual content, not lorem ipsum
- [ ] One real blog post published
- [ ] `hugo new posts/whatever.md` produces a properly-stubbed post

---

## WP-W005 — Pagefind search integration ⏸️

**Status:** Pending W004
**Effort:** half-day
**Dependencies:** W004 (need real content to index)

### Goal

Add static, fast search across blog/marketing content (not card data —
that's registry.*'s job).

### Approach

Pagefind runs as a post-build step (`hugo` then `pagefind --site public`)
and emits its own search index + UI bundle. No infrastructure required.

### Deliverables

- Pagefind installed (npm or binary)
- Build script that runs `hugo` followed by `pagefind --site public`
- Search UI partial integrated with PaperMod's header (replace or
  augment the default search)
- Keyboard shortcut (`/` or `Cmd/Ctrl+K`) to focus search

### Definition of Done

- [ ] Search input visible in site header
- [ ] Typing produces relevant matches across home/about/blog content
- [ ] Card data is **not** indexed (verify by searching for a card name and getting no results)
- [ ] Build script runs both Hugo and Pagefind in one command

---

## WP-W006 — Cloudflare Pages deploy + custom domain ⏸️

**Status:** Pending W005
**Effort:** half-day (most of it is DNS propagation waiting)
**Dependencies:** W005

### Goal

Get `www.legendary-arena.com` live from this repo, on Cloudflare Pages.

### Deliverables

- Cloudflare Pages project created, connected to this GitHub repo
- Build command set: `hugo --gc --minify && pagefind --site public`
- Build output directory: `public`
- Custom domain bound: both `legendary-arena.com` and `www.legendary-arena.com`
- Canonical resolved (one redirects to the other; `www` is canonical per vision.md)
- HTTPS verified

### Definition of Done

- [ ] `https://www.legendary-arena.com` loads the site
- [ ] `https://legendary-arena.com` redirects to the canonical
- [ ] Pushing to `main` triggers automatic redeploy
- [ ] Preview deploys created for any PR (verify by opening one)
- [ ] Lighthouse score ≥90 on the live home page

---

## WP-W007a — play.legendary-arena.com deploy + brand tokens ⏸️

**Status:** Pending W006
**Effort:** ~1 day
**Dependencies:** W006 (brand tokens must be reachable from this site)

### Goal

Deploy `arena-client` (from the engine monorepo) at `play.legendary-arena.com`,
consuming `brand-tokens.css` from this site for visual unity.

### Deliverables

- Cloudflare Pages project for `arena-client`
- Build configured for Vue static export
- `_redirects` file for SPA routing fallback if needed
- `arena-client` HTML imports `brand-tokens.css` from `https://www.legendary-arena.com/brand-tokens.css`
- Custom domain bound: `play.legendary-arena.com`
- Shared header/footer component matches www brand

### Definition of Done

- [ ] `https://play.legendary-arena.com` loads the game client
- [ ] Visual identity matches www (colors, type, spacing)
- [ ] Header has nav links to www and registry
- [ ] Game functionality unaffected by deploy changes

---

## WP-W007b — registry.legendary-arena.com deploy + brand tokens ⏸️

**Status:** Pending W006
**Effort:** ~1 day
**Dependencies:** W006

### Goal

Deploy `registry-viewer` at `registry.legendary-arena.com`, consuming
brand tokens.

### Deliverables

- Cloudflare Pages project for `registry-viewer`
- Build configured for Vue static export
- `registry-viewer` HTML imports `brand-tokens.css`
- Custom domain bound: `registry.legendary-arena.com`
- Shared header/footer component matches www brand
- Registry's own search remains intact (Pagefind is www-only)

### Definition of Done

- [ ] `https://registry.legendary-arena.com` loads the registry
- [ ] Visual identity matches www
- [ ] Header has nav links to www and play
- [ ] Card browsing/filtering unaffected by deploy changes

---

## After W007 — what's not yet planned

These exist as future work but don't have WPs yet:

- **Logo design** — replace wordmark placeholder. Possibly contractor engagement.
- **api.legendary-arena.com** — game backend on Render. Out of scope for the website.
- **Engine repo transfer** — move `barefootbetters/legendary-arena` → `legendary-arena/legendary-arena` (or `legendary-arena-game`). Independent Saturday effort.
- **Analytics** — Cloudflare Web Analytics, Plausible, or none. Decide post-launch.
- **Additional content** — beyond the first three pages, content cadence is "as inspired."
- **Comments on blog** — explicitly out-of-scope per vision.md; revisit if there's appetite.
- **Custom Hugo theme** — only if PaperMod proves limiting. Not on the roadmap.

---

## Maintenance rules

- When a WP is completed, update its status to ✅ and tick its DoD boxes.
- Add the commit hash(es) that delivered it.
- If a WP needs to change scope mid-flight, document the change in this
  file and add a row to the Decisions log in `01-VISION.md`.
- New WPs added to this roadmap also get a Decisions log entry in vision.md.
