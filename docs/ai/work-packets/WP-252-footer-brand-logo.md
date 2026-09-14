# WP-252 — Add the Legendary Arena emblem to the site footer

> **Renumber note (2026-09-13):** originally filed as **WP-247** and shipped
> under that number in commit `2efab8d` / PR #136. It collided with the
> split-emblem-identity WP (also numbered WP-247, `docs/ai/work-packets/WP-247-adopt-split-emblem-identity.md`,
> commit `9c5c120` / PR #140), which anchors the 247→250 brand-identity series
> and is the target of every inbound `WP-247` reference in the repo. This
> self-contained footer WP had no inbound references, so it was renumbered to
> **WP-252** to resolve the duplicate. The `WP-247:` prefix on its original
> commit remains in git history as the record of when it shipped.

Add the Legendary Arena emblem as a home-linked brand mark at the top of the
site footer, so the brand is present in the site chrome on every page
(including the blog).

**Why:** requested directly. The footer carried nav, newsletter, and copyright
but no brand mark. A footer logo is standard site branding and reinforces
identity on long-scroll pages (blog posts, guides).

This file is the self-contained record (same precedent as WP-246 — no separate
ROADMAP entry).

## What changed in this repo

| Path | Change |
|---|---|
| `static/brand/logo/legendary-arena-emblem.webp` | New asset — the gold winged-blade emblem, trimmed of transparent padding and web-sized to 210×288 / ~12 KB from `Logo-LA-800x800.png` (the real emblem export that sits beside the `Legendary Arena-400x200.ai` source in the brand folder). |
| `layouts/_partials/footer.html` | New `.footer-brand` `<a><img>` as the first child of `<footer>`, linking home (`absLangURL`), ahead of the footer nav. |
| `assets/css/extended/custom.css` | §4.6 — `.footer-brand` rule: centered, 72px tall, `width:auto`, 0.9→1 opacity plus a 1px lift on hover. |

## Notes

- **Emblem, not the full wordmark lockup.** The footer surface is
  `--la-color-bg-primary`, which follows the light/dark theme toggle. The full
  lockup bakes in white "ARENA" text and the white horn half — both would
  disappear on the light-theme footer — plus a black artboard background that
  would show as a rectangle. The gold emblem reads on both light and dark, so
  no theme-swap asset is required.
- **One shared footer.** PaperMod renders a single footer partial for all page
  kinds, so the mark appears site-wide, the blog included — there is no
  blog-only footer to scope to. The partial is `partialCached`, so the markup
  must not branch on `.Section` (documented in `extend_footer.html`).
- **Verification:** `hugo` build clean; the `.footer-brand` link and the webp
  emit in the built HTML; the CSS rule compiles into the stylesheet bundle.
