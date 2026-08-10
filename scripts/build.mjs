#!/usr/bin/env node
/*
 * Legendary Arena — site build wrapper (WP-042).
 *
 * Runs the production build (`hugo --minify` then Pagefind indexing),
 * with ONE conditional: on a Cloudflare Pages *preview* deploy, override
 * Hugo's baseURL with the per-deploy `CF_PAGES_URL`.
 *
 * Why: hugo.toml sets `baseURL = https://www.legendary-arena.com/` with
 * `canonifyURLs = true`, so every build writes ABSOLUTE production URLs
 * into the HTML for fingerprinted assets (CSS/JS bundles), processed
 * images, and menu links. On a preview branch that changes any of those
 * (new CSS → new bundle hash, new images, new JS), the emitted URLs point
 * at production www — where the new files do not exist yet — so the
 * preview renders unstyled with broken images. Pointing baseURL at the
 * preview deploy makes those URLs resolve against the preview host, which
 * DOES serve the branch's assets. See docs/ai/work-packets/WP-042-*.md.
 *
 * Determinism guarantee (WP-006): the production branch (`main`) takes the
 * exact same code path as the previous `hugo --minify && pagefind` script.
 * The baseURL override is applied ONLY when CF_PAGES_BRANCH is set and is
 * not `main`. Local builds (no CF_PAGES_* env) are production builds too,
 * so `npm run build` on a dev machine is byte-identical to before.
 *
 * Cross-platform: spawns via `shell` on Windows (so the `hugo` / `npx`
 * shims resolve) and directly on POSIX (Cloudflare's Linux builders).
 */
import { spawnSync } from 'node:child_process';

const branch = process.env.CF_PAGES_BRANCH;
const previewUrl = process.env.CF_PAGES_URL;
const isPreview = Boolean(branch) && branch !== 'main' && Boolean(previewUrl);

const hugoArgs = ['--minify'];
if (isPreview) {
  // CF_PAGES_URL has no trailing slash (e.g. https://<hash>.<project>.pages.dev);
  // Hugo normalizes it. This deploy hosts its own assets, so the HTML and
  // its asset URLs stay self-consistent.
  hugoArgs.push('--baseURL', previewUrl);
  console.log(`[build] Cloudflare preview deploy — branch="${branch}", baseURL=${previewUrl}`);
} else {
  console.log('[build] production build — baseURL from hugo.toml');
}

const onWindows = process.platform === 'win32';

function run(command, args) {
  console.log(`[build] $ ${command} ${args.join(' ')}`);
  // On Windows the `hugo` / `npx` shims need a shell to resolve. Passing an
  // args array together with `shell:true` trips Node's DEP0190 warning, so
  // there we hand the shell a single pre-joined string instead. Our args
  // contain no spaces or shell metacharacters (flags + a bare URL + a path),
  // so plain joining is safe. On POSIX (Cloudflare's builders) we spawn the
  // binary directly with the args array — no shell, no warning.
  const result = onWindows
    ? spawnSync([command, ...args].join(' '), { stdio: 'inherit', shell: true })
    : spawnSync(command, args, { stdio: 'inherit' });
  if (result.error) {
    console.error(`[build] failed to start "${command}": ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run('hugo', hugoArgs);
run('npx', ['pagefind', '--site', 'public']);
