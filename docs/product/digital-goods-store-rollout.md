# Premium Digital Goods & Printables Store — Rollout One-Pager

**Status: committed 2026-07-04** (see [`docs/corporate-memory/01-decision-log.md`](../corporate-memory/01-decision-log.md)).
Priority: **first** of the new revenue surfaces. This is a rollout plan, not
policy — the monetization boundary it lives under is
[`docs/product/profile-features-free-vs-paid.md`](profile-features-free-vs-paid.md)
and engine `docs/01-VISION.md` §Financial Sustainability.

## What it is

A storefront on `legendary-arena.com` selling **cosmetic and presentation**
digital/print goods — no gameplay content, no advantage. Maps to VISION's
**One-Time Cosmetic & Presentation Purchases** stream, with rotating/seasonal
packs available through **Legendary Supporter Subscriptions**.

## Why first

- **Lowest lift:** the site already transacts — Snipcart + Stripe shipped in
  WP-019, and the diorama waitlist/commerce already rides it. This is new
  catalog, not new infrastructure.
- **Brand synergy:** bundles naturally with the physical Legendary Forge line
  (physical → digital and back).
- **Fairness-clean:** everything sold is decorative, so it clears NG‑1…NG‑7
  without special-casing.

## Initial catalog (candidates)

| Product | Format | Stream |
|---------|--------|--------|
| Printable playmats | High-res print-ready PDF/PNG | One-Time |
| Art book / scenario art | Digital PDF | One-Time |
| Premium sound & theme packs | Digital asset | One-Time / Subscription (rotating) |
| Limited card-back designs | Digital cosmetic | One-Time / Subscription |

## The gate before launch (do not skip)

**IP / royalty routing.** Printables and card-backs are derived from
**Marvel / Upper Deck** IP. VISION requires royalties on *all* revenue, and
print-quality derivative art carries heavier licensing exposure than a UI theme.
Before anything lists:

1. Confirm the licensing scope covers derivative print/digital goods (the Forge
   line's Marvel-figure arrangement is precedent, not a blanket clearance).
2. Wire royalty accounting into the Snipcart/Stripe revenue path so every sale
   routes the Upper Deck/Marvel share automatically.

This is the real blocker. Cosmetic-fairness is easy here; the licensing is the
work.

## Phased rollout

1. **Phase 0 — Licensing + royalty plumbing.** Resolve the gate above. No catalog
   until this is done.
2. **Phase 1 — Digital-only MVP.** 2–3 SKUs (theme pack + printable playmat +
   card-back) on the existing Snipcart catalog. Static product pages in
   `content/shop/*.md`, consistent with the current static-only architecture.
3. **Phase 2 — Subscription rotation.** Fold seasonal packs into the Legendary
   Pass as a recurring drop.
4. **Phase 3 — Print fulfillment (optional).** Only if demand warrants a
   print-on-demand partner; otherwise stay digital-download.

## Success signal

First meaningful revenue from a non-diorama digital SKU, and attach rate of packs
to Pass subscribers. (Concrete targets pending the Plausible/analytics prereq
still open in [`docs/corporate-memory/03-open-questions.md`](../corporate-memory/03-open-questions.md).)

## Open questions

- Licensing scope confirmation (the gate).
- Digital-download only vs. print fulfillment for playmats.
- Which SKUs seed Phase 1.
