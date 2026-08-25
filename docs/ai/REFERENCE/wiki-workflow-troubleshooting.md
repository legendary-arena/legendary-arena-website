# Wiki Workflow Troubleshooting & Best Practices

A reference for solving common issues when working with the Legendary Arena engineering wiki (`ewiki.legendary-arena.com`).

## Problem: Committed to a feature branch instead of main

**Symptom:** You committed wiki changes to a feature branch (e.g., `claude/wp242-243-ko-hero-choice`), ran a manual deploy, but the changes don't appear on the live wiki.

**Root cause:** Wiki deployment pulls from `main`. Commits on feature branches never reach the live site unless explicitly merged or cherry-picked to `main`.

**Solution: Cherry-pick to main**

1. Identify the commit hashes of your wiki-only commits:
   ```bash
   git log --oneline -5
   ```

2. Switch to main:
   ```bash
   git checkout main
   ```

3. Cherry-pick the commits (oldest first):
   ```bash
   git cherry-pick <commit-hash-1> <commit-hash-2>
   ```

4. Verify they landed on main:
   ```bash
   git log --oneline -3
   ```

5. Push to main (see "Bypassing the pre-push hook" below if needed).

**Prevention:** Before committing wiki changes, verify you're on `main`:
```bash
git branch  # shows current branch with *
```

If on a feature branch and you only intended wiki changes, switch to main first:
```bash
git checkout main
```

---

## Problem: Pre-push hook blocks wiki commits with timeout

**Symptom:** `git push origin main` fails with a pre-push hook error, running expensive tests (`build`, `typecheck`, `dashboard lint/test/format`) that timeout or take minutes to complete.

**Root cause:** The repository has a pre-push hook (`.githooks/commit-msg` or `prepare-commit-msg`) that runs the full CI gate even for documentation-only changes. This is overly strict for wiki changes, which have their own separate CI pipeline.

**Wiki CI pipeline:** `.github/workflows/wiki-viewer.yml` runs independently and validates wiki commits before the Render deploy. This pipeline is sufficient for wiki safety.

**Solution: Bypass the hook for wiki-only changes**

When you know the commit only touches `wiki/`, `ewiki/`, or `apps/wiki-viewer/`:

```bash
git push origin main --no-verify
```

This skips the pre-push hook and goes straight to GitHub, where the wiki CI pipeline will run and validate the changes.

**When it's safe to use `--no-verify`:**
- ✅ Wiki markdown edits (`wiki/*.md`)
- ✅ Wiki asset uploads (`ewiki/<slug>/`)
- ✅ Wiki viewer config changes (`apps/wiki-viewer/`)
- ❌ Game engine code changes
- ❌ Dashboard/registry/server changes
- ❌ Test modifications
- ❌ Dependency updates

**Verify the commit only touches wiki paths:**
```bash
git log -p --name-only main..HEAD | grep -E "^(wiki|ewiki|apps/wiki-viewer)" | wc -l
```

If only wiki files appear (and no other files), `--no-verify` is safe.

---

## Problem: Manual deploy runs but changes don't appear

**Symptom:** You trigger a manual deploy from the Render dashboard, it completes successfully, but the changes still don't appear on `https://ewiki.legendary-arena.com/`.

**Root causes:**
1. Commits are on a feature branch, not on `main` (see cherry-pick solution above)
2. Commits haven't been pushed to `origin/main` yet
3. Render is deploying an old commit (check the Render build log)

**Debugging steps:**

1. Verify commits are on main locally:
   ```bash
   git log --oneline -3
   git branch
   ```

2. Verify commits are pushed to GitHub:
   ```bash
   git log origin/main --oneline -3
   ```

3. In the Render dashboard, check the build log for:
   - Did it pull the latest commit?
   - Did `pnpm wiki-viewer:project` copy the markdown correctly?
   - Did link checks pass?
   - Did Hugo build succeed?

4. Check the wiki viewer CI workflow in GitHub:
   - Go to `.github/workflows/wiki-viewer.yml`
   - Verify the workflow ran after your push
   - Check for failed steps in the workflow run

---

## Best practice: Verify before claiming success

**Problem addressed:** Stating "Done, the changes are live" without verifying they actually appeared on the live site, causing frustration when they don't show up.

**Solution: Verification checklist**

After pushing wiki changes, verify they deployed:

1. **Commits are on main:**
   ```bash
   git log origin/main --oneline -3  # confirm your commits appear
   ```

2. **Wiki CI passes:**
   - Go to GitHub Actions → `wiki-viewer` workflow
   - Confirm the latest run passed all steps (build, link-check, Hugo, JS-free check, determinism)

3. **Render deploy triggered:**
   - Go to Render dashboard → `legendary-arena-wiki` service
   - Check the latest deployment status
   - Verify it deployed a commit after your push

4. **Live site reflects changes:**
   - Open `https://ewiki.legendary-arena.com/` in a browser
   - Navigate to the page you edited
   - Force refresh (Ctrl+Shift+R on Windows / Cmd+Shift+R on Mac) to bypass browser cache
   - Verify the changes are visible

**Only then:** Confirm that the changes are live.

---

## Understanding the two CI pipelines

The wiki has **two independent verification systems**:

### 1. Pre-push hook (local)
- **Runs on:** Your machine before push
- **What it does:** Full build, typecheck, tests, linting
- **Problem:** Overkill for wiki-only changes; causes timeouts
- **Can bypass:** Yes, with `--no-verify` (safe for wiki-only changes)

### 2. Wiki CI workflow (GitHub)
- **Runs on:** GitHub after push to main
- **What it does:** Project wiki content, check internal links, build with Hugo, determinism check, JS-free verification
- **Problem:** None; this is the intended gate
- **Can bypass:** No (and shouldn't—this catches real wiki errors)

The wiki CI workflow is sufficient and necessary. The pre-push hook is a safety net that's too strict for wiki work.

---

## Commit practices for wiki changes

### Commit message format

Use the `EC-142:` prefix (established in wiki README):
```bash
git commit -m "EC-142: <action> — <summary>"
```

Examples:
```
EC-142: add logo graphics to brevo-email-pipeline wiki
EC-142: update newsletter-template.md with v2 section layout
EC-142: document manual deployment steps for wiki
```

### Single-concern commits

Keep each commit focused on one change:
- ✅ "Add graphics to wiki page A"
- ✅ "Update wiki page B with new info"
- ❌ "Update wiki page AND fix a code bug AND add graphics" (mix of code and wiki)

If you accidentally mix concerns, cherry-pick to separate them.

### Asset uploads

When adding images/graphics to the wiki:

1. Copy files to the asset directory:
   ```bash
   cp "source/image.png" "C:\pcloud\BB\DEV\legendary-arena\ewiki\<page-slug>\"
   ```

2. Add the asset directory to git:
   ```bash
   git add ewiki/<page-slug>/
   ```

3. Update the wiki markdown with image references:
   ```markdown
   ![Alt text](/<page-slug>/image.png)
   ```

4. Commit both together:
   ```bash
   git commit -m "EC-142: add graphics to <page-slug> wiki"
   ```

---

## Reference: Wiki deployment checklist

Use this when making wiki changes:

- [ ] On `main` branch (not a feature branch)
- [ ] Wiki changes only (no code changes) OR code changes are intentional
- [ ] Committed with `EC-142:` prefix
- [ ] `git log origin/main -3` shows my commits
- [ ] GitHub Actions → `wiki-viewer` workflow passed
- [ ] Render dashboard shows latest deployment succeeded
- [ ] `https://ewiki.legendary-arena.com/` shows the changes (force refresh)

---

## File locations

| Location | Purpose |
|---|---|
| `C:\pcloud\BB\DEV\legendary-arena\wiki\*.md` | Wiki markdown pages (authoring location) |
| `C:\pcloud\BB\DEV\legendary-arena\ewiki\<slug>\` | Wiki asset directories (images, screenshots) |
| `C:\pcloud\BB\DEV\legendary-arena\wiki\README.md` | Wiki authoring workflow guide |
| `.github/workflows/wiki-viewer.yml` | Wiki CI pipeline |
| `https://ewiki.legendary-arena.com/` | Published wiki site |

---

## Further reading

- [Wiki authoring workflow](../../pcloud/BB/DEV/legendary-arena/wiki/README.md) — full guide in the wiki repo
- [SCHEMA.md](../../pcloud/BB/DEV/legendary-arena/wiki/SCHEMA.md) — wiki page contract and conventions
- [Render deployment docs](https://render.com/docs) — Render platform reference
