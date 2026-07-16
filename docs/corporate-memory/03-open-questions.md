# Open Questions & Gap Tracker — Legendary Arena

**Last updated:** 2026-07-16
**Purpose:** the honest list of what's undefined, unverified, or pending a
decision. Resolved items move to the decision log
([`01-decision-log.md`](01-decision-log.md)) and get struck here with a date.

Priority: 🔴 blocks revenue/strategy · 🟡 efficiency/clarity · 🟢 nice-to-have

---

## 🔴 Critical

- ~~**Game monetization model is undocumented.**~~ **RESOLVED 2026-07-03.**
  This bullet conflated two gaps, both now closed. (1) The model was never
  undocumented — it's canonical in engine [`docs/01-VISION.md`](../01-VISION.md)
  §Financial Sustainability (four fairness-safe streams, Upper Deck/Marvel
  royalties, NG‑1…NG‑7); this bullet was simply wrong to say otherwise.
  (2) The profile-page free/paid boundary — the one thing genuinely missing —
  is now **locked** ([`docs/product/profile-features-free-vs-paid.md`](../product/profile-features-free-vs-paid.md),
  published as the engine ewiki `Monetization Model` Brand page). Logged in
  [`01-decision-log.md`](01-decision-log.md) (2026-07-03). *Diorama margin
  model remains separately open — see below.*

- **What does BarefootBetters sell?** Confirmed: it's a separate business
  identity from LA and the umbrella GitHub org (`barefootbetters`). Its
  actual product/offer is **unrecorded anywhere in this repo.** *Needed:*
  BB's own corporate-memory entry (its own repo), referenced from
  `C:\www\jefferyjjensen-corporate-memory\portfolio.md`. The previous AI draft's claim that
  BB = "natural home & personal care products" was an unverified guess —
  **do not enshrine it** until confirmed.

- **Diorama cost & margin model.** ~$100 starter-kit price is set, but no
  per-unit cost model or margin target is documented. "No margin, no
  mission" needs an actual margin number to be operational.

## 🟡 Structural

- **Plausible account not yet provisioned.** Platform is selected (WP-025)
  but the account/`data-domain` is an open operator prereq. Until it's live,
  site-side conversion + search demand are unmeasurable.

- **Social handles unverified.** The previous AI draft listed conflicting
  handles (`@playlegendarena` vs `@playlegendaryarena`, FB
  `playlegendaryarena`). *Needed:* confirm the real FB / X / YouTube /
  Discord handles and record them in
  [`00-business-brief.md`](00-business-brief.md) Channels.

- ~~**Registry domain migration deferred.**~~ **RESOLVED 2026-07-16.** The
  registry migrated to `cards.legendary-arena.com` (not
  `registry.legendary-arena.com` as originally planned). Nav repointed
  (WP-034), docs swept (WP-035), logged in
  [`01-decision-log.md`](01-decision-log.md). ~~*Remaining open:*
  `cards.barefootbetters.com` still serves 200 with **no redirect**.~~
  **CLOSED 2026-07-16 (same day):** 301 Redirect Rule deployed on the
  `barefootbetters.com` CF zone ("Redirect cards.barefootbetters.com to
  cards.legendary-arena.com" — `http.host eq "cards.barefootbetters.com"`
  → `concat("https://cards.legendary-arena.com", http.request.uri.path)`,
  301, preserve query string). Verified live: `/` and `/sets/?q=test`
  both 301 with path + query preserved. Fully resolved.

- **Unverified personal facts.** Full legal name (middle initial),
  location, and job title from the previous AI draft are **not** in any
  repo. Resolve in `C:\www\jefferyjjensen-corporate-memory\owner-profile.md`, not here.

## 🟢 Backlog / watch

- **Lead-magnet asset.** "The Deck-Builder's Primer" is specified as the
  `/get-started` lead magnet but the PDF/guide itself — built? `[CONFIRM]`.
- **Email segmentation (Phase 2).** Theme-specific lead magnets deferred
  until 20+ videos + signup data (per youtube plan).
- **Rules corpus / rules assistant.** Engine WP-237 is gated on the WP-025
  search demand signal + a canonical rules corpus. Both downstream.

---

> Reviewed every weekly maintenance pass. An item sitting here >4 weeks with
> no movement either gets promoted to a WP/decision or consciously parked
> with a note saying why.
