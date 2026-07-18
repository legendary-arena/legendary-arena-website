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

---

## Revision 2 — 2026-07-18

A second proposed guide template was reviewed against the shipped archetype.
Most of it merged; the parts that did not are the parts the archetype exists
to prevent, so the BLOCKED list was widened to name them explicitly rather
than leaving them to be re-derived next time.

### Merged

- **`guide_version` front matter**, with a bump rule: minor on strategic
  revisions, major when the scoring model or `scoringConfigVersion` changes
  what the guide claims. Currently inert — no layout reads it.
- **Alternates carry a trigger condition**, not a bare hero name. An
  alternate with no "bring when" is a hedge, not advice.
- **"Where this pool is thin"** is now required. A pool with no stated
  weakness reads as marketing.
- **"The legs at a glance"** comparison table, optional, worth it at 6+ legs.
  DERIVED columns (twists, Evil-Wins threshold) plus one JUDGMENT column.
- **"Player counts"**, optional, limited to what the setup deltas actually
  change — explicitly barred from claiming which count scores better, since
  that is a PAR question and PAR is unpublished.
- **"Every leg, one place"** — the per-leg builder links repeated as a flat
  list, so a reader who has picked a pool can start without scrolling back.
- **Long-term hero-power / `scoringConfigVersion` note**, as a commented
  optional block phrased as design intent. Flagged not to repeat in every
  guide: it is boilerplate the second time.

### Rejected, and the BLOCKED list widened

The proposal's first draft included a Final Verdict scorecard (Difficulty
⭐/10, Score Risk /10, Fixed-Pool Dependence /10), an expected-results-by-
skill-level table, an estimated competitive PAR range, and per-scheme
`Difficulty: Easy/Medium/Hard` / `Score Risk` labels.

All four are unbacked: `legendary.competitive_scores` is empty and PAR is
deliberately unpublished. The BLOCKED list now names star bars, the Final
Verdict card, and per-scheme risk labels specifically, because the proposal
demonstrates they are the natural thing to reach for. The list also now says
what card text *does* support as the substitute — twist count, Evil-Wins
condition, and whether escapes, Bystander loss, or a clock is the live
pressure. That is description, not a rating.

### Scoring-order correction

The proposal ordered objectives **VP → turns → penalties**, and a later pass
softened it to "secondary to generating Victory Points while protecting
Bystanders" — still VP-forward, and sourced to "current observed behavior",
which does not exist.

The documented model orders it the other way: **rescuing Bystanders beats
preventing escapes, and losing Bystanders is worst**; speed is a lever, not
*the* lever. That is what the live Magneto guide says. The archetype now
instructs authors not to restate the hierarchy as VP-first, and the claim is
attributed to the model rather than to observation.

If the engine's actual scoring weights contradict this, the fix belongs in
the engine repo's scoring documentation first — after which this archetype
**and** `content/posts/gauntlet-core-magneto-fixed-pool.md` both need
updating together.

### Also changed

- **Title guidance** prefers an editorial title naming the spine ("The
  Fixed-Pool Problem: Magneto, Core Set"), with the mechanical
  `<Set> <Mastermind> Fixed-Pool Gauntlet Guide` as the fallback for a guide
  with no spine worth naming. Set, mastermind and division are already
  machine-readable in front matter; the title need not carry them.
- **No "Quick Overview" / "At a Glance" block.** Set, mastermind and scheme
  count are DERIVED and already emitted by `gauntlet-post-block.mjs` into
  "The board"; hand-typing them into a second table is the exact drift the
  three-bucket rule exists to stop. The spine opener already serves as the
  at-a-glance summary, and the template now says not to duplicate it.
- Optional sections are marked as **delete-when-empty**. An empty section is
  worse than a missing one.

### Scope

**In:** `archetypes/gauntlet-guide.md`, this WP file.

**Out:** revising the three live guides against the new template; any
`layouts/**` change, including rendering `guide_version`.
