# Profile Features — Free vs. Paid

**Status: adopted policy (locked 2026-07-03; amended 2026-07-04 — history depth gated + scoreboard surface added).** This does **not** invent a
monetization model — the canonical revenue model already exists in engine
`docs/01-VISION.md` §Financial Sustainability ("No Margin, No Mission"), which
authorizes Supporter Subscriptions, one-time cosmetic purchases, premium
recognition tiers, and organized-play licensing, all under the hard rule that
revenue never confers gameplay advantage (NG‑1…NG‑7). This doc **elaborates that
model one level down**, to the profile page: which specific features sit on which
side of the free/paid line. VISION is authoritative; if this doc and VISION
disagree, VISION wins.

The boundary below is now **locked** — logged in
[`docs/corporate-memory/01-decision-log.md`](../corporate-memory/01-decision-log.md)
(2026-07-03), which struck the corresponding 🔴 item in
[`docs/corporate-memory/03-open-questions.md`](../corporate-memory/03-open-questions.md).
The published engineer/designer reference is the engine ewiki `Monetization
Model` Brand page (`wiki/monetization-model.md`), which cites this doc for the
detailed split. Amendments go through a new decision-log entry, not an in-place
edit here.

**Governing principle: mastery, not money, determines standing.** The public
profile is a marketing and virality asset, not a settings page. Nothing paid may
touch — or *appear* to touch — competitive standing (VISION NG‑1…NG‑7). Within
that hard limit, the paid layer sells prestige, self-expression, and convenience.

---

## The two levers that actually matter

Most free-vs-paid write-ups spend all their energy on the à-la-carte cosmetic
grid. That grid is real but it's the supporting act. The strategic core is these
two, and they should lead the model:

### 1. A recurring pass beats one-time cosmetic sales

This is VISION's **Legendary Supporter Subscriptions** stream, applied to the
profile. A recurring **Legendary Pass** is the highest-value structure available:
recurring revenue compounds; one-time banner sales don't. Bundle the prestige
cosmetics, expanded replay/history storage, and early access to new cosmetic
drops into the Pass rather than selling each as a separate SKU. VISION's
**One-Time Cosmetic & Presentation Purchases** stream still serves one-off
buyers, but the Pass is the headline.

### 2. The physical → digital bridge is a moat almost nobody can copy

Owning a **Legendary Forge diorama** (see
[`docs/product/diorama-master-plan.md`](diorama-master-plan.md)) unlocks
exclusive avatar frames, badges, or banner options. This is a genuinely
differentiated lever: a pure-software competitor cannot replicate a physical
product tie-in. It bridges the two businesses without introducing any pay-to-win,
because the unlocks are cosmetic. Treat this as a first-class part of the
monetization story, not a footnote.

Everything below is the cosmetic surface that fills out the Pass.

---

## Core philosophy

| Tier     | Goal                                 | What it should feel like       | What it must **never** feel like    |
|----------|--------------------------------------|--------------------------------|-------------------------------------|
| **Free** | Complete, respectable, shareable     | "I have a real identity here"  | "This is the trial version"         |
| **Paid** | Prestige, self-expression, convenience | "I'm expressing my legend"   | "I paid to have a proper profile"   |

The free profile must be strong. The more impressive and shareable a free
player's profile is, the more likely they are to bring friends in. A crippled
free profile sabotages the acquisition flywheel that the profile exists to feed.

---

## Recommended free vs. paid split

| Feature | Free | Paid | Notes |
|---------|------|------|-------|
| **Unique handle + public URL** | Yes — unique handle at signup, public profile at `play.legendary-arena.com/@handle` | — | **Never gate basic identity.** Free from day one. This is the acquisition and anti-impersonation foundation. |
| **Handle changes** | **First change free** | Repeat changes paid (convenience) | People regret signup names; charging for the *first* fix is petty and hurts early retention. Monetize the repeats. |
| **Display name** | Set at provisioning, changeable with limits | More frequent changes; optional color/flair if added later | Identity — keep core free. |
| **Avatar** | Static server-processed `.webp` upload | Animated avatars, frames/decorations, multiple saved avatars, higher-quality uploads | Classic, safe cosmetic prestige. |
| **About Me / Bio** | Generous length for everyone (~1,000 chars) | Richer formatting / links | **Not a tier lever.** Nobody upgrades for more characters, and a stingy free limit just makes free feel cheap. Give everyone a decent length. |
| **Banner / header** | Basic default | Custom banner image (Discord/Steam-style) | High perceived value, pure cosmetics. |
| **Badges & achievements** | All earned badges visible | More showcase slots, custom ordering, "Featured Highlights" | Badges are *earned through mastery* — keep them prominent on free. Paid = better presentation only. |
| **Teams / affiliations** | Basic team display | Custom team flair, verified team badge, priority team-page features | Core social feature stays accessible. |
| **Replay / scenario gallery** | Basic recent activity; replay verification | Larger "Highlights" gallery, custom ordering, embeddable public replays | Core verification free; polish paid. |
| **Stats / history** | **Recent** personal history + basic stats (scenarios cleared, best PAR delta — enough to feel like a real player) | **Full lifetime depth** + search/filters, advanced visualizations, dashboards, export (same data) | Depth + tooling are fair to gate (no gameplay advantage). The only hard line: paid must never make identical results *look better* or rank higher. |
| **Privacy controls** | Basic (public / friends / private) | Granular per-section controls, "appear offline" | Good paid convenience. |
| **Profile theme / flair** | None | Dark/gold prestige themes, animated elements, profile effects | Pure prestige; on-brand for "legendary." |

---

## Scoreboard & performance surfaces

The paid convenience/cosmetic layer extends to the player-facing scoreboard and
stats surfaces in **arena-client** (`play.legendary-arena.com` — the WP-054 /
WP-149 public-leaderboard and personal-stats work). This is *not* the internal
`ewiki.legendary-arena.com/scoring/` engineering doc; that's a wiki page behind
Cloudflare Access, not a product surface.

Same filter as everywhere else: **anything that doesn't confer a gameplay
advantage (NG‑1…NG‑7) defaults to paid** — leaving fair convenience free just
gives away revenue for no fairness reason (no margin, no mission).

| Feature | Free | Paid (Legendary Pass) |
|---------|------|------------------------|
| **History depth** | Recent runs (rolling window / capped count) | Full lifetime history + search & filters |
| **Visualizations** | Basic charts | Rich interactive charts, trend lines, PAR-delta breakdowns, consistency views (same data) |
| **Dashboards / views** | One default view | Multiple saved custom dashboards + advanced filters |
| **Export / sharing** | Basic copy / simple image | High-quality branded image / PDF exports of personal bests |
| **Highlights / pinning** | Basic | Pin/feature runs that surface into profile showcase slots |
| **Priority loading** | Standard | Handles very large histories without degrading |
| **Supporter mark** | None | Small, clearly-labeled "Legendary Supporter" badge on public views (recognition, never rank) |

**Comparison tooling is the one item to watch on fairness.** Comparing against
public examples is part of how a player *learns to optimize*, so free users keep
a fair baseline — view and compare against public examples plus a modest number
of comparison slots. Paid expands the slot count and adds the better side-by-side
replay viewer. Gate the *tooling and quantity*, never the ability to learn from
public examples, so extra slots stay convenience and never become an optimization
advantage.

Always free on this surface: your own best PAR delta per scenario, replay
verification and access to your own replays, and the quality-normalized public
scenario views. Never paid: anything that improves actual performance, hidden or
boosted leaderboard positions, or making a paid player's identical results look
better than a free player's.

## What changed from the first draft, and why

- **Promoted the Pass and the physical bridge to the headline.** They were buried
  in "additional suggestions." They're the strategy; the cosmetic grid is the
  filler.
- **Cut vanity / "reserved premium" handles.** Deciding which names are premium
  invents a squatting problem and a support-ticket generator ("why is *my* name
  reserved?") for thin revenue. Keep handle *changes* monetized; drop the
  reserved-name landgrab.
- **First handle change is now free.** Monetize repeat changes only.
- **Bio length is no longer a tier lever.** Give everyone a decent length; sell
  formatting/links if anything.
- **Relaxed the "any paid signal near a leaderboard is toxic" rule** — see below.

---

## The one nuance worth getting right: patronage vs. rank

The instinct to keep *all* paid signals away from competitive surfaces is
overcalibrated — and VISION already settles it the other way. VISION's **Premium
Recognition Tiers** explicitly authorize "public recognition… on community
surfaces" and a permanent "Hall of Legends" wall. So patronage recognition is
*sanctioned by the vision*; the only question is presentation. The real line is:

> **Anything that could be mistaken for competitive standing is toxic.
> Clearly-cosmetic patronage is not.**

A "supporter" mark that obviously conveys zero advantage (the way trusted
competitive platforms show supporter flair) is patronage, not pay-to-win, and
it's real recurring revenue — and it's exactly what VISION's recognition tier
contemplates. Design it so it reads unambiguously as *thanks for
supporting the game*, never as *this player ranks higher*. If there's any chance
a viewer confuses it for standing, don't ship it. If it's obviously decorative,
ship it.

---

## Timing: this pays off *after* you have a population, not before

Cosmetics need social density to sell — nobody buys a banner to show off to an
empty lobby. Sequencing:

1. **Now:** ship the strong **free** profile. It's an acquisition asset and it
   earns its keep immediately by making shared profiles impressive.
2. **After there's an audience to perform for:** build the paid layer (Pass +
   cosmetics).

If the near-term revenue engine is the Forge diorama line and the game is the
funnel (which the corporate-memory notes currently imply), then profile
monetization is a *post-population* lever. Building the paid cosmetic layer
before there's a population to show off to spends engineering time for revenue
that isn't there yet. Ship free now; time the paid layer to the audience.

---

## Guardrails (hard limits)

1. **No paid competitive signal.** Not stats, not rank, not anything a viewer
   could read as standing. This is the credibility of a mastery game — protect it
   absolutely.
2. **Basic identity is always free.** Unique handle + public URL from day one.
3. **Free must feel complete, never like a trial.**
4. **No randomness.** Every purchase is deterministic, fully disclosed, and
   purchase-known — no loot boxes, gacha, or randomized/mystery goods. (Mirrors
   VISION's "deterministic, fully disclosed" cosmetics language; forecloses
   predatory-monetization drift.)
5. **Test perception before shipping.** Show playtesters / Discord mockups of
   free vs. paid and ask: *"Does the free version still feel like a real player in
   this game?"* If not, move the line.
