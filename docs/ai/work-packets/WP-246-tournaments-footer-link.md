# WP-246 — Add Tournaments to the footer menu

Add a **Tournaments** entry to the site footer menu, pointing at the
`/tournaments/` Tournament Calendar placeholder so the organized-play landing
is reachable from the site chrome.

**Why:** requested directly. The `/tournaments/` section (the organized-play
Tournament Calendar placeholder) had no navigation entry, so it was
unreachable except by typing the URL. Footer, not header — per the WP-034
lean-header convention that keeps reference and secondary destinations
(Brand / Rules / Art / Roadmap) in the footer.

This file is the self-contained record. There is no separate ROADMAP entry
(same precedent as WP-039 / WP-040).

## What changed in this repo

| Path | Change |
|---|---|
| `hugo.toml` | New `[[menu.footer]]` entry `footer-tournaments` — name "Tournaments", url `/tournaments/`, weight 29 (between Roadmap at 28 and the external Play at 30). |

## Notes

- The trailing slash on the `url` is required — the footer active-state
  convention, documented inline in `hugo.toml` above the menu block.
- Weight 29 sits in the internal band (10–29), grouping Tournaments with the
  other internal pages ahead of the external Play / Cards links (30 / 40).
- The `/tournaments/` landing content itself — the placeholder copy and the
  demo events — is a content-lane change tracked separately in the same PR.
