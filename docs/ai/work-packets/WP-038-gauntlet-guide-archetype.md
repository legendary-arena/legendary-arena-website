# WP-038 — Gauntlet Guide archetype

Adds `archetypes/gauntlet-guide.md` so every future guide in the **Gauntlet
Guides** series starts from a template instead of being reconstructed from the
last post.

```
hugo new content posts/<slug>.md --kind gauntlet-guide
```

Site-affecting path (`archetypes/**`), hence a WP rather than a `POST:` commit
per [01.3 §Site-Affecting Paths](../REFERENCE/01.3-commit-hygiene.md).

## Why now

Three guides shipped on 2026-07-18 (Red Skull / co2e, Hydra High Council /
shld, Magneto / core). The series is intended to scale toward the full
**110-gauntlet** catalog, so the authoring pattern is worth fixing before it
is copied 107 more times.

It also closes a gap the ewiki authoring page currently documents as manual:
*"The archetype does not include the Gauntlet Guides fields below — add those
by hand when writing a gauntlet post."* The archetype now pre-populates
`gauntlet_set`, `gauntlet_mastermind`, `gauntlet_board`, the series and
category, and `draft: true`.

## What the template encodes

Not a generic outline — it captures what the first three guides actually
taught.

### 1. Generate the composition block; never type it

The template's first instruction is to run, in the engine repo:

```
node scripts/gauntlet-post-block.mjs <setAbbr> <mastermindSlug>
```

Every composition fact (mastermind, legs, twist counts, per-player-count
setup, Fixed-Pool budgets, card art) is registry-derived. Hand-typed copies
drift: three different gauntlet counts (105 / 109 / 110) were simultaneously
live in the ewiki before the 2026-07-18 correction.

### 2. The three-bucket rule

- **DERIVED** — generated, never typed.
- **JUDGMENT** — hand-written reasoning, labelled as reasoning.
- **BLOCKED** — must not be written at all.

The BLOCKED list is the load-bearing part. It explicitly forbids:

- estimated competitive score ranges (`PAR -X to -Y`)
- expected-results-by-skill-level tables
- "usually the score killer" / "typically" / clear rates
- difficulty or score-risk ratings out of 10

All of these require rows in `legendary.competitive_scores`, which is **empty**:
PAR is deliberately unpublished until hero-effect coverage is faithful, so
every submission fail-closes to `par_not_published`. Writing those fields
would put fabricated authority on a public page. The template says to leave
the gap visible and fill it from real data later.

This directly rejects several fields from a proposed guide template that
would have mandated them.

### 3. Find the spine before writing

The strongest of the three guides works because it has one organising insight
found by reading card text: Magneto's Master Strike demands an X-Men Hero,
three of four tactics reinforce that check, and yet leg three (The Legacy
Virus) demands a Tech Hero that **no Core Set X-Men carries**.

A fixed field list produces padding around the one true thing, so the
scheme blocks prescribe **3–5 real bullets** rather than a mandatory schema,
and the template says outright that a guide without a spine should be short.

### 4. The PAR caveat as required boilerplate

Carries the standard caveat added to all three live guides, with an explicit
delete-when-it-ships marker so it does not outlive the gate.

## Known dependency

The archetype sets `cta: "leaderboard"`, which is introduced by **WP-037**
(PR #71, open at time of writing — its WP file is not on `main` yet, so this
is deliberately an unlinked reference rather than a dangling link). Until that
merges, `layouts/_partials/cta-block.html`
accepts only `play` / `newsletter` / `tournament` and **silently falls back to
`play`**. The template documents this so an unexpected generic CTA is
explicable rather than mysterious. No action needed once #71 lands.

## Scope

**In:** `archetypes/gauntlet-guide.md`, this WP file.

**Out:** rewriting the three existing guides to match; any `layouts/**`
change; the leaderboard CTA itself (WP-037); the derived-field generator
(already shipped in the engine repo).

## Verification

- `hugo new content posts/<slug>.md --kind gauntlet-guide` produces the full
  front matter with all gauntlet fields present and `draft: true`
- `hugo` builds clean; the archetype is not itself a published page
- Probe file removed after testing; never committed
