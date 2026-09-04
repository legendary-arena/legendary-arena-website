# WP-250 — Emblem email header asset + repoint the Brevo docs

Produce a hosted email-header logo from the approved emblem lockup and point
the Brevo email documentation at it, so the newsletter and automation emails
carry the current identity instead of the retired mark.

**Why:** the emblem adoption (WP-247/248/249) reconciled the site, but the
email header logo is set in Brevo and there was no hosted emblem asset for it —
the only email logos in the repo were old drafts under `logo-drafts/`. This
ships the asset and documents its URL; the final swap is a one-field change in
the Brevo dashboard (external), which the docs now describe.

## What changed in this repo

| Path | Change |
|---|---|
| `static/brand/email/email-header-lockup-on-dark.png` | New — the lockup on a dark rounded bar (self-contained; reads on any email background). 2x/retina, displays ~200–300 px. The recommended email header. |
| `static/brand/email/email-header-lockup.png` | New — the lockup on a transparent background, for templates whose header area is already dark. |
| `scripts/build-email-assets.py` | New — regenerates both from the committed lockup SVG (idempotent). |
| `docs/brevo/newsletter-template.md`, `docs/brevo/email-automation.md` | Header specs now name the hosted asset URL and note it is the split-emblem lockup. |

## Notes

- **Email clients don't render SVG**, so these are PNGs. Served at
  `https://www.legendary-arena.com/brand/email/email-header-lockup-on-dark.png`
  once deployed — Brevo can hotlink that URL or the file can be uploaded to
  Brevo's media library.
- **The dashboard swap is external.** The actual Brevo template header image is
  set in Brevo's UI, not from a repo asset — repoint it there to the URL above.
  This WP ships and documents the asset; it cannot edit Brevo.
- Derived from the committed `logo-la-lockup.svg`, so it cannot drift from the
  mark.
