# WP-253 — Public vision page at /vision/

Add a public `/vision/` page that states the game's promise to players, and
link it from the About page and the footer.

**Why:** requested directly (2026-11-12). The engine vision
(`legendary-arena` `docs/01-VISION.md`) was updated under engine decision
D-24843 (the AI line at the live match, success measures, accessibility as
correctness), and the ewiki page and dashboard VisionCard were brought in
line. The marketing site had no vision page at all (`/vision/` returned 404),
so this WP creates the public one.

This file is the self-contained record (same precedent as WP-246 and WP-252 —
no separate ROADMAP entry).

## What changed in this repo

| Path | Change |
|---|---|
| `content/vision/index.md` | New single page: the fantasy lead, the six-line promise, how mastery is measured (par, quality-only rankings, heroism over caution), the AI line, and the never-sold list. Renders through `layouts/single.html`, so it ends with the standard `play` CTA block. |
| `hugo.toml` | New `[[menu.footer]]` entry `footer-vision` → `/vision/`, weight 11 (beside About). |
| `content/about/_index.md` | One sentence in "What it is" linking to `/vision/`. |

## What the page deliberately leaves out

- **Internal success measures** (contribution margin, runway, completed-match
  rate). Those live on the operator dashboard. Naming them on a public page
  reads as a financial disclosure.
- **Royalty and licensor names.** The brand never depends on external IP
  naming (`docs/brand/strategy.md` § Global brand invariants), and the
  licensing posture is legal-review territory (§9).
- **Named products or prices** (for example, the paid coaching tier). The
  context pack forbids inventing SKUs or prices, and none is marketed on www
  yet. The AI section states the policy only.
- **Banned commerce vocabulary.** The never-sold list is phrased without
  the kill-list words ("pay-to-win", "gacha", "grind", "luck", "RNG").

## Source

Condensed from the engine `docs/01-VISION.md` § North Star (Player Promise,
The Fantasy), §19 (as amended by D-24843), §20–§26 (scoring), and
§Non-Goals NG-1…NG-8. The engine document stays authoritative; this page is
public copy, not governance.

## Copy pass (2026-11-12, external review)

A Grok review of the live page proposed seven edits. Adopted:

- **Tighter promise lines** for rhythm, except "Skill decides", which keeps
  the approved message-bank line verbatim ("Standing comes from sessions
  played well, not hours logged or money spent") instead of the clipped
  "not hours or money".
- **Longevity sentence** in the opening: new expansions arrive with the same
  cards and rules, closed with the message-bank line "The system you learn
  today is the system you face tomorrow." The review's "added as data"
  phrasing was dropped as mechanics-first.
- **"Together"** in the opening, so a first-time reader knows the play is
  cooperative.
- **Heroism paragraph:** losing a civilian now also reads as worse than a
  villain escaping empty-handed.

Declined:

- **"Rescuing civilians is the strongest positive action."** Inaccurate since
  engine D-24409 (WP-599): a rescue is its printed 1 Victory Point with no
  bonus, and the moral hierarchy sits on the penalty side.
- **A second card-registry link** and **repeating the close-call line at the
  page foot.** The promise already links the registry, and the close-call
  line already ends the promise section; repeating either adds length for
  no new claim.
- **An accessibility / performance line.** It would be a public commitment
  ahead of the product's accessibility work; it stays in the engine vision
  (§16–§17) for now.

## Notes

- Copy follows `docs/brand/strategy.md` §2–3 (voice, verb palette, canonical
  terms: Hero, Scenario, Mastermind, Session, Victory) and uses the approved
  message-bank lines "Skill decides" / "Standing comes from sessions played
  well, not hours logged or money spent" / "The arena awaits."
- A human approves the final copy before it ships
  (`docs/marketing/brand-asset-generation.md` § Humans keep final copy). The
  PR review is that approval.
- **Verification:** `hugo --minify` builds clean; `/vision/index.html` emits
  with the promise, the AI section, and the play CTA; the footer link and the
  About link render.
