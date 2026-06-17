# Welcome Drip — Draft Copy (DEFERRED v2)

**Status:** NOT BUILT. Bankable draft copy for the planned welcome drip.
This is a planning artifact, not live content and not a Brevo workflow.

**Authority:** see `docs/brevo/email-automation.md`
§"Planned enhancements (deferred until volume)" #1. Email 1 is already
live at `content/emails/welcome.md`; the drip replaces the single
welcome action with a 4-email sequence.

**Build trigger (do not build before this is met):** the v1 welcome
email has a stable open/click baseline (≥4 weeks of sends, per the
Baseline thresholds in `email-automation.md`) AND the confirmed list is
≥ ~200 contacts. Promoting this copy to a live Brevo workflow requires
its own governing WP — it converts the 1-trigger/1-action automation
invariant into a documented multi-step workflow.

**Voice contract** (from `email-automation.md` §Brand voice compliance,
sourced from `docs/brand/strategy.md`):

- Direct, confident, heroic tone
- No emoji
- No exclamation marks
- No hedging verbs: `get`, `try`, `enjoy`, `perhaps`, `maybe`
- Verb palette: `assemble`, `build`, `recruit`, `fight`, `master`,
  `defeat`, `earn`, `become`
- Primary CTA: 2 words max, single verb, maps to a user action

## Sequence overview

Four emails over 10–14 days. Trigger: contact added to the newsletter
list (post double-opt-in). Steps 2–4 fire on Brevo workflow delays.

| # | Send | Theme | Primary CTA | utm_campaign |
|---|---|---|---|---|
| 1 | Immediate | Welcome / set expectations | Play now | `welcome` |
| 2 | Day 2–3 | Your first game, start to finish | Play now | `welcome-2` |
| 3 | Day 5–7 | Sharpen one decision + challenge | Build now | `welcome-3` |
| 4 | Day 10–14 | Where the depth lives | Play now | `welcome-4` |

The `welcome-NN` campaign values are a proposal for distinguishing drip
stages in attribution; the implementing WP decides whether to keep the
flat `welcome` value or adopt the staged form. Each link carries the
standard UTM set (`utm_source=newsletter`, `utm_medium=email`,
`utm_content` per link purpose).

---

## Email 1 — Immediate (already live)

Mirrors `content/emails/welcome.md`. Subject: "Welcome to Legendary
Arena". Primary CTA: Play now → `https://play.legendary-arena.com/`.
Listed here only for sequence completeness — do not duplicate this
action when building the workflow.

---

## Email 2 — Day 2–3 · Your first game, start to finish

**Subject:** Your first game, start to finish
**Preview:** One scenario, one clear line of play.

You assembled a deck. Now field it. This is the shortest path from
signup to a finished game.

Open a quick match and pick the starter scenario. It is built to teach
the core loop: recruit heroes, build your economy, fight the villains,
and close the Scheme before it closes on you.

One rule for your first game — spend every resource every turn. New
players sit on resources and stall out. Empty your hand, recruit
aggressively, and learn the tempo of a real game.

And the result holds up. Every shuffle and draw is seeded and
verifiable, so the win you earn is the win you can prove. No hidden
math, no rigged draws.

**Primary CTA:** Play now → `https://play.legendary-arena.com/`
**Read more:** The 7-Point Deck Health Check →
`/posts/week-01-deck-checklist/`

---

## Email 3 — Day 5–7 · The one decision that wins games

**Subject:** The one decision that wins games
**Preview:** Name your strategy in a sentence. Then cut everything that
fails it.

A strong deck is not a pile of strong cards. It is a focused weapon.

Before your next build, write one sentence that describes what your deck
does. Example: "Build economy fast, then recruit one finisher to close
by turn ten." That sentence becomes your filter — every card either
serves it or stays out.

This single discipline defeats the most common mistake new players make:
recruiting good cards that do not belong together.

**Challenge:** Build a deck, name its strategy in one sentence, and cut
every card that fails the sentence. Run one session and measure how the
revision changes your next game.

**Primary CTA:** Build now → `https://play.legendary-arena.com/`
**Read more:** The Deck-Builder's Primer → `/get-started`

---

## Email 4 — Day 10–14 · Where the depth lives

**Subject:** Where strong players go next
**Preview:** The archive, the ladder, and the long game.

You have played a few games and built a few decks. Here is where the
depth lives.

The strategy archive holds fifty-two weeks of breakdowns, from
fundamentals through championship-level play. Master one mechanic a week
and your results climb on their own.

When you want a sharper test, the leaderboard ranks every verified
result. Climb it the only way that counts here — provable games, earned
outright.

**Primary CTA:** Play now → `https://play.legendary-arena.com/`
**Read more:** Browse the archive → `/posts/`
**Featured from the Shop:** the Play Pass unlocks the full archive and
event access — text link, UTM-tagged, below the primary CTA (per the
template's secondary-module placement rules).

---

## Notes for the implementing WP

- Each email reuses the v2 template's secondary modules (Shop + Share)
  and the same design constraints / link caps as weekly newsletters;
  the drip does not invent new layout.
- Re-entry safety: a contact who unsubscribes mid-drip must exit the
  workflow — confirm Brevo's workflow honors the unsubscribe invariant
  before the first production run.
- Keep Email 1 identical to the live `content/emails/welcome.md` so the
  workflow's first action is not a second, divergent welcome.
- Subject lines and previews above are first drafts; A/B the Email 2 and
  Email 3 subjects once the list is large enough to read a signal.
