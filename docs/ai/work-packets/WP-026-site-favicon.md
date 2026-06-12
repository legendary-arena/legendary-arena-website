# WP-026 — Site favicon

Add the official Legendary Arena favicon (`favicon.ico`) to the
marketing site static directory. Single-file addition to
`C:\www\legendary-arena-com\static\favicon.ico`. Hugo serves it
automatically; no template changes required.

This file is the **session-ready execution pack**. The design source
of truth is [`docs/03-ROADMAP.md`](../../03-ROADMAP.md). If this
file and the roadmap conflict, the roadmap wins.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for
`www.legendary-arena.com`.

## Current state

The marketing site has no favicon. Browsers request
`https://www.legendary-arena.com/favicon.ico` by default and receive
a 404, resulting in a console error and a missing browser-tab icon.

## Task

### Step 1 — Add favicon file

1. Copy the favicon file to the static directory:
   ```
   C:\www\legendary-arena-com\static\favicon.ico
   ```

2. Hugo automatically serves it at:
   ```
   https://www.legendary-arena.com/favicon.ico
   ```

### Step 2 — Verify

1. Local build:
   ```pwsh
   npm run build
   hugo server --bind=127.0.0.1 --port=1313
   ```

2. Open `http://localhost:1313/` in a browser. Verify:
   - Browser tab shows the favicon
   - DevTools Network panel shows `favicon.ico` returns 200 (not 404)
   - DevTools Console shows no favicon-related errors

3. Check the built output:
   ```bash
   ls -la public/favicon.ico
   ```

   Expect: file exists and is non-zero size.

### Step 3 — Commit and push

```bash
git add static/favicon.ico
git commit -m "WP-026: add site favicon"
git push origin main
```

## Definition of Done

- [ ] `static/favicon.ico` exists in the repo
- [ ] `npm run build` successfully includes it in `public/`
- [ ] Local dev server serves it at `/favicon.ico` (200 status)
- [ ] Browser tab displays the favicon
- [ ] DevTools Console shows zero favicon-related errors
- [ ] Commit on `origin/main`

## What's NOT in scope

- Favicon variants for different devices (`apple-touch-icon.png`,
  `icon-192.png`, etc.). Future WP if needed.
- Favicon preloading or cache headers. HTML `<link>` tags. Hugo's
  PaperMod theme handles standard favicon requests automatically.
