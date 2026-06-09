# Diorama Line — Go-To-Market & Resourcing Notes

**Project:** Legendary Arena Diorama Platform
**Site:** legendary-arena.com
**Last Updated:** June 8, 2026

> **Provenance:** This document consolidates the diorama go-to-market and
> resourcing material that had been mixed into the legendary-arena (card game)
> dashboard docs under `apps/dashboard/docs/`. It was moved here on
> 2026-06-08 so the diorama product line lives entirely in the marketing
> repo.
>
> **Canonical product spec:** [`diorama-master-plan.md`](diorama-master-plan.md).
> That document is authoritative for the product, components, business model,
> product tiers, STEM curriculum, and bill of materials. This file only holds
> the *planning layer* the master plan does not frame the same way: the ICP
> table, the positioning one-liners, the time-phased roadmap, and the
> break-even math.

---

## 1. Ideal Customer Profiles (by product line)

Each product line has a different buyer. The Strategist defines each one
separately before any spend.

| Product line | Ideal customer profile |
|---|---|
| **Diorama Starter Kit** | Fathers / grandfathers, ages 35–65, Marvel fans, value family bonding time, moderate income, likely homeowners with a bookshelf |
| **STEM Education Kit** | Homeschool parents, STEM-focused teachers, after-school program directors |
| **Digital products** (STL files, light shows) | Existing diorama builders who own 3D printers, tech-savvy hobbyists |

See [`diorama-master-plan.md` §9 (Business Model)](diorama-master-plan.md) and
§10 (STEM Education Platform) for the full product-tier and curriculum detail
behind these profiles.

---

## 2. Positioning & Transformation Messaging

Lead with the transformation, not the product. Every message answers: *what
changes in the customer's life after they buy this?*

- "You're not buying a diorama kit — you're buying a Saturday afternoon with
  your grandson that he'll remember when he's 30."
- "You're not buying LEDs and magnets — you're buying the look on your kid's
  face when Iron Man's chest lights up and they made it happen."

**Competitive positioning** — what makes the kit different from buying random
parts on Amazon: one-stop shop, a pre-configured Raspberry Pi with software,
the Saturday Project experience, the STEM curriculum, and the magnetic rigging
system nobody else sells.

**Urgency triggers:** holiday gifting season, Father's Day, back-to-school STEM
budgets, birthday season.

This is the same emotional core captured in
[`diorama-master-plan.md` §9 "The Saturday Project — Marketing Angle"](diorama-master-plan.md)
and the origin story in §1.

---

## 3. Roadmap Milestones (diorama line)

Time-phased targets for the diorama line. The impact/urgency ordering of the
underlying work lives in
[`diorama-master-plan.md` §13 (Work Tasks & Priorities)](diorama-master-plan.md);
the calendar targets below are the planning overlay.

| Milestone | Target | Est. sessions |
|---|---|---|
| Magnetic LED contact system prototype tested | Aug 2026 | 2 |
| Starter Kit product listing complete | Sep 2026 | 2 |
| Diorama prototype v1 complete (Street Scene) | Nov 2026 | 4 |
| Electronics kit bill of materials (BOM) finalized | Jan 2027 | 2 |
| STEM curriculum Lessons 1–6 drafted | Feb 2027 | 6 |
| STEM curriculum complete (Lessons 1–12) | Apr 2027 | 6 |
| Diorama Starter Kit available for sale | May 2027 | 4 |

> Dates are planning estimates carried over from the original resourcing doc and
> should be re-baselined against actual progress before they're treated as
> commitments.

---

## 4. Break-Even & Year-1 Economics

### Diorama-specific Year-1 costs

| Item | Cost |
|---|---|
| Diorama prototype materials | ~$65 |
| 3D printer (if purchased) | ~$200–400 |
| Initial inventory (electronics kits, if stocking) | ~$500–1,000 |

(The prototype BOM in [`diorama-master-plan.md` §4](diorama-master-plan.md)
estimates the per-prototype materials at ~$55–65.)

### Break-even on the Claude subscription

At a $100 Starter Kit with ~50% gross margin ($50 profit per kit):

| Kits sold | Revenue | Profit | Covers |
|---|---|---|---|
| 24 kits | $2,400 | $1,200 | 6 months of Claude Max |
| 48 kits | $4,800 | $2,400 | Full year of Claude Max |
| 80 kits | $8,000 | $4,000 | All Year-1 costs |

**48 kits in 12 months = 4 kits per month = 1 kit per week.** That's the
break-even target for the Claude subscription alone.
