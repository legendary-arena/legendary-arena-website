# 06 — Content-Lane Edit Workflow (FIX: prefix)

> **REFERENCE DOCUMENT — Not an execution prompt. No output required.**
>
> **Subordination:** This document is subordinate to:
> 1. `docs/01-VISION.md` (vision, global invariants, decisions log)
> 2. `docs/04-CONTENT-CONVENTIONS.md` (content authoring rules)
> 3. `docs/ai/REFERENCE/01.3-commit-hygiene.md` (commit message contract)

---

## When to use

This workflow applies when your changes are limited to:

- `content/**` — any page or post markdown body
- `static/images/**` — image assets that travel with content

If you need to touch `layouts/`, `hugo.toml`, `static/brand-tokens.css`,
or anything else outside these two paths, the commit hooks will reject
a `FIX:` prefix. Use `WP-NNN:` with a work-packet file instead (see
`01.3-commit-hygiene.md`).

---

## Workflow

### 1. Start from latest main

```pwsh
git pull origin main
```

Or work in a fresh `claude/*` worktree branch.

### 2. Edit content

- Markdown pages under `content/**`
  (e.g., `content/brand/_index.md`)
- Image assets under `static/images/**` only
- Do NOT touch `layouts/`, `hugo.toml`, `static/brand-tokens.css`,
  or anything outside the content lane

### 3. Build-check locally

Open a PowerShell terminal in the repo root
(`C:\www\legendary-arena-com`).

**Option A — one-shot build:**

```pwsh
hugo --minify
```

Outputs to `public/`. Check the terminal for errors.

**Option B — live preview (preferred for iterating):**

```pwsh
hugo server
```

Launches at `http://localhost:1313` with auto-reload on save.

### 4. Stage only content-lane files

```pwsh
git add content/brand/_index.md static/images/brand/palette.svg
```

Staging anything outside `content/**` or `static/images/**` will
cause the commit-msg hook to reject a `FIX:` commit.

### 5. Commit with FIX: prefix

```pwsh
git commit -m "FIX: <description at least 12 chars>"
```

**Skipped ceremony:**

- No WP file in `docs/ai/work-packets/`
- No pre-flight invocation (`01.4`)
- No session notes

**Still enforced:**

- `pre-commit` hook — secrets, build-output scrubbing
- `commit-msg` hook — prefix format, forbidden words, >=12 char
  subject, path allowlist

### 6. Push and open PR

```pwsh
git push -u origin <branch-name>
gh pr create --title "FIX: <summary>" --body "<description>"
```

Or push and create the PR from the GitHub web UI.

### 7. Review and merge

- Open the PR URL and review the diff
- Squash-merge into `main`

---

## When FIX: won't work

If the commit-msg hook rejects your commit, you have staged files
outside the content lane. Two options:

1. **Unstage** the offending files and keep the `FIX:` commit for
   content-only changes
2. **Switch to `WP-NNN:`** with a work-packet file in
   `docs/ai/work-packets/` — required for any site-affecting change
   outside `content/**` + `static/images/**`

---

## POST: prefix (new blog posts)

Same lane, same ceremony rules as `FIX:`. Use when adding a new
blog post:

```pwsh
git commit -m "POST: 2026-05-12 — <summary>"
```

Permitted files: `content/blog/YYYY-MM-DD-<slug>.md` and
`static/images/blog/<slug>/**`. See `01.3-commit-hygiene.md`
for full rules.
