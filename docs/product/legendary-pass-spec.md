# Legendary Pass — Season Spec

**Status: DRAFT — hypotheses, not locked policy.** Every number in this document
(price, XP values, level cap, level-skip terms, reward mix) is a **hypothesis to
be tuned against live data**, not a committed value. Nothing here is binding
until it is logged in
[`docs/corporate-memory/01-decision-log.md`](../corporate-memory/01-decision-log.md);
until then this is a design draft for review.

This does **not** invent a monetization model. The canonical revenue model is
engine `docs/01-VISION.md` §Financial Sustainability ("No Margin, No Mission").
The free/paid boundary this rides on is
[`profile-features-free-vs-paid.md`](profile-features-free-vs-paid.md), and the
published engineer/designer reference is the engine ewiki `Monetization Model`
page (`wiki/monetization-model.md`), which points here for the detailed
mechanics. VISION is authoritative; if this doc and VISION disagree, VISION wins.

## Classification

The Legendary Pass is an **implementation of Revenue Stream #1 (Legendary
Supporter Subscriptions)**. It is **not** a fifth revenue stream and creates no
amendment to the VISION revenue model. It is the seasonal, engagement-scaled
packaging of the recurring subscription the profile-features doc already calls
the headline structure.

## 1. Core concept

- **Name:** Legendary Pass, with per-season branding (Season 1 = "Forge of
  Legends").
- **Model:** dual-track seasonal pass.
  - **Free track** — available to every logged-in player.
  - **Premium track** — unlocked by purchasing the current season's Pass.
- **Progression currency:** **Arena XP**, earned *only by play*. Paid players do
  **not** earn XP faster and cannot buy XP.
- **Season length:** ~10 weeks (hypothesis). Hard end date; unclaimed rewards
  expire, owned cosmetics are kept forever.
- **Reset:** full track reset + a new cosmetic set each season. Previous-season
  cosmetics remain owned permanently.

## 2. Progression system

Arena XP is awarded server-authoritatively from play events the engine already
emits. Values below are hypotheses for the first balance pass.

| Action | Arena XP (hypothesis) | Notes |
|--------|----------------------|-------|
| Complete a game | 100–250 | Scaled by game length / player count |
| Win a game | +50 bonus | |
| Personal-best PAR delta | +100 | Once per season per player |
| Verify a replay (public) | +25 | Encourages sharing |
| Daily first game | +50 | Soft daily engagement — never a punishing streak |
| Weekly challenge | 300–500 | 3–5 rotating challenges |

- **Soft level cap:** ~50–60 per season, reachable by a regular player in
  ~4–6 weeks of normal play (hypothesis; tune so the cap is achievable without
  grind pressure).
- **Excess XP after max level** converts to a small pool of **Legacy Tokens**,
  spendable only on permanent cosmetic frames / sound packs in the store —
  **never** on future Passes, progression, or any advantage.
- **No XP boosters of any kind are ever sold.**

## 3. Reward tracks

**Free track (everyone):** cosmetic crumbs every 3–4 levels (static frames, basic
card backs, small recognition badges, limited-duration replay storage), with
milestone rewards at 10 / 25 / 40 / 50 (a modest animated frame, a unique badge,
one sound pack, one banner). The free track is always present and meaningful.

**Premium track (Pass holders):** a reward at every level — higher density of
animated avatars/frames, exclusive themes, full sound packs, priority-queue
tokens (convenience), deeper history export tools, showcase slots, and
season-exclusive flair. Prestige rewards at the cap: a "Season Legend" title +
animated profile effect that reads unambiguously as **patronage**.

All rewards are **purely presentational or convenience**. Zero impact on rules,
balance, scoring, PAR, matchmaking, leaderboard eligibility, or standing.

## 4. Purchase & monetization (hypotheses)

- **Price:** $9.99 per season (or local equivalent) — a one-time purchase for
  that season's Premium track. **Hypothesis pending conversion data.**
- **Optional level-skip:** players may buy up to 10 levels at a time if behind.
  Transparent, **linearly priced**, deterministic, and it grants only the same
  cosmetics a player could earn by playing — no randomness, no exclusive-to-skip
  content.
- **Mid-season bundle:** "Pass + 20 levels" for late joiners.
- **Stream mapping:** the Pass maps to **Legendary Supporter Subscriptions**;
  it can also be offered as a seasonal One-Time Cosmetic purchase. Recurring
  supporters may receive an automatic loyalty discount or a free Pass (mix TBD).
- All purchases **deterministic and fully disclosed** — no loot boxes, no mystery
  rewards, no gacha.

## 5. Fairness & guardrail compliance

Maps directly onto the `Monetization Model` guardrails:

- **G#1 (no paid competitive signal):** no item affects gameplay, matchmaking,
  PAR, leaderboard eligibility, or standing.
- **G#2 (basic identity free):** handle, public profile/URL, and public
  leaderboard participation stay free regardless of Pass ownership.
- **G#3 (recognition ≠ rank):** season titles/flair are visually unambiguous
  patronage, never a standing signal.
- **G#4 (royalties first):** royalties flow on every dollar of Pass and
  level-skip revenue (VISION), a launch prerequisite.
- **G#5 (no randomness):** every reward and purchase is deterministic and
  previewable before claim/purchase.
- **G#6 (no ads / no data monetization):** not applicable — the Pass sells
  nothing of the kind.

**One fairness edge to resolve before launch (open question):** priority-queue
tokens must reduce *wait time only* and must never alter opponent quality,
matchmaking fairness, or ranked outcomes. If ranked matchmaking cannot honor that
cleanly, restrict tokens to casual/non-ranked queues. See §10.

## 6. Key surfaces & integration points

- **Profile page:** season progress bar, claimed-rewards gallery, "Season Legend"
  showcase slot.
- **Post-game screen:** XP gained + next-reward preview (a healthy, earned
  dopamine beat — see the engine ewiki `Dopamine Trigger Framework`, whose spine
  contract explicitly treats these Pass/meta moments as *out of scope* and paced
  separately from in-match cues).
- **Main lobby / home:** a persistent Pass widget (current level + next reward).
- **Store:** a clean "Legendary Pass" card with a full, no-randomness reward
  preview.
- **Forge bridge:** owning certain [dioramas](diorama-master-plan.md) can unlock
  one or two exclusive cosmetic variants on the Premium track (still pure
  cosmetic).
- Reads existing systems only: Profile / Login, Scoring / PAR, Replay
  verification, Leaderboard (read-only), and game-completion events. **No engine
  footprint** — the Pass is a server + client concern, never engine logic.

## 7. Technical skeleton (for the implementation WP)

```
Season {
  id, name, startDate, endDate, maxLevel, freeRewards[], premiumRewards[]
}

PlayerSeasonProgress {
  playerId, seasonId, xp, level, claimedFree[], claimedPremium[], isPremium
}

XP-granting events (server-authoritative, derived from existing signals):
  GameCompleted, GameWon, PersonalBestPAR, ReplayVerified,
  DailyFirstGame, WeeklyChallengeCompleted
```

XP → level is a pure, server-authoritative calculation. Claimed rewards are
written to the player's permanent cosmetic inventory. Nothing here reads or writes
`G`/`ctx` or affects determinism.

## 8. Rollout sequence

1. Data model + XP-event instrumentation (behind a feature flag).
2. Free track only, one season — validate engagement and XP balance.
3. Premium track + purchase flow.
4. Level-skip purchase.
5. Forge exclusive variants + the Legacy Token sink.
6. Season 2+ with full marketing cadence.

## 9. Success metrics (instrument from day 1)

- Free → Premium conversion rate.
- % of players reaching level 30 / 50.
- Average XP per active player per week.
- Pass-buyer retention into the following season.
- Cosmetic **claim** rate (are rewards actually used?).
- Zero increase in competitive-standing complaints (fairness health).

## 10. Open questions

- **Priority-queue tokens in ranked** — confirm they can be wait-time-only, or
  restrict to casual (see §5).
- **Price point** — $9.99 is a hypothesis; A/B against live conversion.
- **Subscriber loyalty perk** — discount vs. free Pass for recurring supporters.
- **XP curve + weekly-challenge values** — first balance pass owns these.
- **Season length** — 10 weeks is a starting hypothesis.

---

## Season 1 — "Forge of Legends" reward table (draft)

**Season length:** ~10 weeks · **Max level:** 60 · **Theme:** metallic heroics,
molten forge, arena stone, subtle diorama motifs (purely presentational).

All rewards are cosmetics, convenience tools, or recognition flair. "—" means no
free reward at that level (standard battle-pass density). Priority-queue tokens
are consumable convenience (see §5/§10). Titles and flair are written to read
unambiguously as patronage (G#3). Every cosmetic is deterministic and previewable
before claim/purchase. Unclaimed rewards expire at season end; owned cosmetics are
permanent.

| Level | Free track | Premium track |
|-------|------------|---------------|
| 1 | Static "Iron Frame" avatar border | Animated "Molten Edge" avatar frame + 3 priority-queue tokens |
| 2 | — | "Forge Ember" card back |
| 3 | "Arena Initiate" badge | "Ember Glow" profile banner |
| 4 | — | UI theme: "Dark Forge" |
| 5 | +7 days replay storage | Animated "Spark" avatar effect |
| 6 | — | "Hammer Strike" sound pack (UI + victory) |
| 7 | Static "Stone Border" frame | "Molten Banner" profile banner |
| 8 | — | Showcase slot +1 (permanent) |
| 9 | "Apprentice" badge | "Liquid Metal" card back |
| 10 | Static "Bronze Crest" frame + bio highlight | Animated "Forge Heart" frame + "Season of the Forge" title |
| 11 | — | "Anvil" emoji-reaction pack |
| 12 | +3 priority-queue tokens | Full "Forge Ambience" sound pack |
| 13 | — | "Cracked Anvil" profile banner |
| 14 | Static "Copper Frame" | Animated "Ember Trail" avatar |
| 15 | "Journeyman" badge | UI theme: "Molten Core" + export tools (lifetime history CSV/PDF) |
| 16 | — | "Sparks" card-back set (3 variants) |
| 17 | +14 days replay storage | Animated "Legendary Hammer" frame |
| 18 | — | Showcase slot +1 |
| 19 | Static "Iron Lattice" frame | "Forge Master" recognition flair |
| 20 | "Adept" badge + basic stat pin | Animated "Living Metal" frame + 5 priority-queue tokens |
| 21 | — | "Diorama Shadow" profile banner |
| 22 | — | "Echo Chamber" sound pack (crowd + UI) |
| 23 | Static "Steel Band" frame | "Molten Rivers" card back |
| 24 | — | Granular privacy controls unlock |
| 25 | "Artisan" badge | Animated "Forge Phoenix" frame + "Hall of the Forge" temporary wall flair |
| 26 | +7 days replay storage | UI theme: "Obsidian Forge" |
| 27 | — | "Ember Trail" animated avatar |
| 28 | Static "Bronze Lattice" | "Anvil Chorus" full sound pack |
| 29 | — | Showcase slot +1 |
| 30 | "Masterwork" badge + pin-to-profile highlight | Animated "Crown of Embers" frame + exclusive "Forge Legend" title |
| 31 | — | "Living Diorama" card back |
| 32 | — | "Deep Vault" export pack (high-res branded stat images) |
| 33 | Static "Silver Frame" | "Molten Crown" profile banner |
| 34 | — | 5 priority-queue tokens |
| 35 | +14 days replay storage | Animated "Runic Forge" frame |
| 36 | — | UI theme: "Eternal Flame" |
| 37 | "Virtuoso" badge | "Echoes of the Arena" sound pack |
| 38 | — | Showcase slot +1 |
| 39 | Static "Silver Crest" | "Crimson Ember" card-back set |
| 40 | "Grand Artisan" badge | Animated "Titan Frame" + "Season Champion (Patron)" flair |
| 41 | — | "Diorama Glow" animated avatar |
| 42 | — | Full lifetime-history search + advanced filters |
| 43 | Static "Gold Band" frame | "Forge Hymn" sound pack |
| 44 | — | 5 priority-queue tokens |
| 45 | +30 days replay storage | Animated "Apex Ember" frame |
| 46 | — | UI theme: "Legendary Vault" |
| 47 | "Paragon" badge | Animated "Living Metal" profile banner |
| 48 | — | Showcase slot +1 |
| 49 | Static "Gold Lattice" | "Eternal Spark" card back |
| 50 | "Forge Adept" recognition set | **Prestige:** Animated "Legendary Forge Master" frame + permanent "Season 1 Legend" title + exclusive Hall of Legends wall placement |
| 51 | — | "Mythic Ember" sound pack |
| 52 | — | Advanced comparison viewer (extra slots only) |
| 53 | Static "Platinum Frame" | "Celestial Anvil" profile banner |
| 54 | — | 10 priority-queue tokens |
| 55 | +30 days replay storage | Animated "Starforge" frame |
| 56 | — | UI theme: "Cosmic Forge" |
| 57 | "Mythic Artisan" badge | "Void Ember" card-back set |
| 58 | — | Showcase slot +1 (final) |
| 59 | Static "Platinum Crest" | "Apex Soundscape" full pack |
| 60 | **Free prestige:** "Season 1 Completer" badge + static "Eternal Frame" | **Max prestige:** fully animated "Forge of Legends" avatar + exclusive animated profile effect + "Eternal Patron of Season 1" title + permanent exclusive Hall of Legends entry |

### Reward-table notes

- Convenience unlocks (storage boosts, export tools, comparison slots) never erode
  the free baseline — the free experience stays fully playable and meaningful.
- The comparison viewer (level 52) gates *quantity of slots* only, never the
  ability to learn from public examples (mirrors the scoreboard fairness line in
  `profile-features-free-vs-paid.md`).
- Prestige titles/effects at 50 and 60 are patronage recognition, not standing.
