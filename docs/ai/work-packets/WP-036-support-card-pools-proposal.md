# WP-036 — Support card pools: select bystanders, officers, wounds & sidekicks by card, by set, or all

**Status:** 📝 Proposal — Phase A shipped; **Phase B blocked on a governance
decision** (see §8). Decisions locked 2026-07-18.
**Drafted:** 2026-07-18 · **Revised:** 2026-07-18 (pass 2 — Phase B survey)
**Implementation repo:** engine monorepo (`C:\pcloud\BB\DEV\legendary-arena\`),
`apps/registry-viewer/` + `packages/registry/` + `packages/lagn-spec/`
(directory is `lagn-spec`; published package name is `@legendary-arena/lagn`).
Only the LAGN JSON Schema at
`C:\www\legendary-arena-com\static\schemas\lagn\v1\lagn-v1.json` lives in this repo.

---

## 1. The ask, rephrased

Today the loadout builder at `cards.legendary-arena.com` lets you choose the
five **composition** slots — scheme, mastermind, villain groups, henchmen
groups, hero decks — by identity. Everything else in the box is a bare number.

You want the four **support** card kinds — bystanders, S.H.I.E.L.D. officers,
wounds, sidekicks — promoted from *quantities* to *identified pools*, chosen
three ways:

- **Individually** — pick the specific bystander/sidekick/officer cards.
- **By set** — "every sidekick from `LGN-2E`", one click.
- **All** — the complete pool for that card kind across the registry.

The purpose is a **controlled experiment**: freeze the support pool once, then
run games on `legends.legendary-arena.com` where the *only* variable is the
hero selection. Same harness, different heroes, comparable results.

### Naming — settled

You said "a consistent hand." Bystanders, officers, wounds and sidekicks never
land in the opening hand — they sit in the villain deck, the officer stack, the
wound stack, and (2E) the sidekick stack. The thing being defined is therefore a
**Support Preset**: a named, reusable, lockable definition of the non-hero
board. Confirmed by the operator 2026-07-18; this is the term used throughout,
and the 8-card SHIELD starting deck is explicitly out of scope.

---

## 2. Why this isn't a UI-only change

Both the setup contract and LAGN v1 model these four kinds as **scalar counts**.
There is nowhere to put a card identity.

`packages/registry/src/setupContract/setupContract.types.ts:55–65`

```
schemeId, mastermindId, villainGroupIds, henchmanGroupIds, heroDeckIds,
bystandersCount, woundsCount, officersCount, sidekicksCount
```

`static/schemas/lagn/v1/lagn-v1.json:41–44` requires the same four as integers
(`bystanders_count`, `wounds_count`, `shield_officers_count`,
`sidekicks_count`), while mastermind/scheme/villains/henchmen/heroes each carry
`{id, name}`.

The consequences are already wired in:

- `apps/registry-viewer/src/lib/loadoutCardActions.ts:45–65` returns `null` for
  bystander/wound/sidekick/officer card types, and `:114–118` makes the "add to
  loadout" button a **deliberate silent no-op** for them.
- `apps/registry-viewer/src/composables/useLoadoutDraft.ts:52–57` hardcodes the
  defaults: bystanders 30, wounds 30, officers 30, sidekicks 0.
- `apps/registry-viewer/src/components/LoadoutBuilder.vue:668–681` renders them
  as four bare `<input type=number>` boxes.

So: schema change → contract change → UI change, in that order.

The browse taxonomy is already ahead of the contract, which helps.
`data/metadata/card-types.json` carries 19 types including `sidekick`,
`shield-officer`, `shield-officer-special`, `bystander`, `wound`. Every card
already has `setAbbr` / `setName` and a set-qualified `extId`
(`"{setAbbr}/{slug}"` — `src/registry/types/index.ts:34–58`). The identity and
set data you need to select on **already exists**; only the loadout slot is
missing.

---

## 3. Proposed design

### 3.1 Data model — counts stay, pools are added

Do **not** replace the counts. Every downstream validator, the arena lobby
parser, and existing saved LAGN files depend on them. Add pools alongside, and
make the count a derived total.

```jsonc
// setup contract, additive
"bystanders": {
  "count": 30,                       // authoritative total, unchanged semantics
  "pool": {                          // NEW, optional
    "mode": "sets",                  // "default" | "sets" | "explicit"
    "sets": ["LGN-2E"],              // populated when mode = "sets"
    "cards": [                       // resolved, always written when pool present
      { "extId": "LGN-2E/hostage", "name": "Hostage", "copies": 4 }
    ]
  }
}
```

Same shape for `wounds`, `officers`, `sidekicks`.

Rules:

1. `pool` absent ⇒ current behaviour exactly. Old files keep working; old
   consumers ignore the new field.
2. When `pool` is present, `count` **must** equal `sum(copies)`. Validate this
   at write time so the two can never disagree.
3. `mode` is stored so the UI can round-trip the user's *intent* ("all sidekicks
   from 2E") rather than only the flattened result — important when the registry
   later gains cards and the user wants the preset to re-resolve.
4. `cards` is always written out even for `sets`, so a replay is reproducible
   against a registry snapshot that has since changed.
5. **There is no `all` mode.** Per the §6 decision, set-selection is the
   primitive: "all" is `mode: "sets"` with every set abbr listed, written by a
   *Select all sets* button. Three modes, one control, no third code path.

**LAGN impact — the draft was wrong about this; corrected 2026-07-18.**
The intent stands (`*_count` stays required, add optional `*_pool` objects,
publish 1.1.0), but "additive, so 1.0.0 files stay valid" understated the work
in both directions:

- `packages/lagn-spec/src/validator.ts:230` pins `lagn_version: z.literal('1.0.0')`.
  A 1.1.0 document is **rejected outright** by every current consumer. There is
  no migration seam on the LAGN side to extend — it would have to be built.
- The LAGN Zod schema declares no `.strict()`, so Zod **strips** unknown keys.
  A `*_pool` field written into a 1.0.0 document is silently dropped rather than
  rejected — the worst failure mode, since a preset would appear to save and
  come back empty.
- `generateSchema()` (`validator.ts:325–464`) is a **hand-written duplicate** of
  the Zod schema living in the same file, and CI (`.github/workflows/ci.yml:247–278`)
  only checks that the committed JSON matches the generator — not that the
  generator matches Zod. Every field must be added in both places, by hand, or
  the two silently diverge with CI green.

**Correction:** `docs/ai/work-packets/WP-244-lagn-spec-publication.md` in this
repo is an **empty file**. The draft claimed WP-244 "owns the spec-publication
pipeline"; that was inferred from the filename. The engine monorepo's copy of
WP-244 is real and does describe publication steps. Nothing in this repo
automates the sync — `static/schemas/lagn/v1/lagn-v1.json` is served by Hugo
static passthrough and is referenced by no config or content page here.

### 3.2 UI — one picker pattern, reused four times

Replace each bare number box with a **pool control**:

```
Bystanders          [ 30 ]  ▸ Default (count only)
                            ▸ By set…            (set multi-select · [Select all sets])
                            ▸ Choose cards…      (opens picker)
```

"All bystanders" is the *Select all sets* button inside the by-set control, not
a fourth mode — see §3.1 rule 5.

The picker reuses `LoadoutBuilder.vue:109–207`'s existing `activeSlot` machinery
— filter by `cardType`, free-text needle, chip list — with **one addition the
loadout picker doesn't have today: a set filter.** The Cards tab already has
`filterSet` (`App.vue`); the loadout picker filters only by type and needle
(`LoadoutBuilder.vue:136–172`). Lifting that filter into the shared picker is a
prerequisite for "by set" and is independently useful for hero/villain
selection.

Per-card **copies** stepper in the picker (bystanders and sidekicks vary; wounds
and officers are usually uniform).

### 3.3 The Support Preset — the actual deliverable

This is what makes the hero experiment work. A preset is:

```jsonc
{ "presetId": "gauntlet-harness-v1",
  "name": "Gauntlet harness v1",
  "bystanders": {...}, "wounds": {...}, "officers": {...}, "sidekicks": {...} }
```

- **Lock toggle.** When locked, the four support pools are read-only in the UI
  and the "New loadout" action clears heroes only. That structurally enforces
  "only the heroes change."
- Presets are the unit you'd cite in a `legends` run: *"Gauntlet harness v1,
  heroes = X/Y/Z."*

**Storage: file-only.** Decided 2026-07-18. A preset is a downloaded JSON file
(`preset-{presetId}.json`) and is re-applied by uploading it. This preserves the
invariant declared at `useLoadoutDraft.ts:7–10` — the draft *never* persists, no
localStorage / sessionStorage / IndexedDB / cookies — with no amendment and no
backend.

Consequences to build for, since file-only puts the friction on the round trip:

- Reuse the existing anchor-download helper (`LoadoutBuilder.vue:265–283`) and
  the existing upload/validate path modelled on
  `apps/arena-client/src/lobby/parseLoadoutJson.ts`.
- The preset file must be **standalone and versioned** (`presetVersion`,
  `registrySnapshot`), not a fragment of a loadout — it will outlive the tab it
  was made in and be re-applied against a registry that has since gained cards.
- Applying a preset must be **idempotent and total**: it overwrites all four
  pools, never merges. Merge semantics would silently break the "identical
  harness" guarantee, which is the entire point.
- Lock state travels *in* the file, so a shared preset arrives locked.

---

## 4. Gaps this exposes (worth knowing before you approve)

These are pre-existing, and they undercut the goal until fixed:

1. **Counts don't survive a share link.** `src/lib/setupUrlParams.ts:142–151`
   serializes only the five entity-id params. Counts and envelope are
   deliberately excluded. So "Copy Setup Link" today cannot carry a Support
   Preset — and won't carry pools either unless extended. The `?lagn=` inbound
   path (`src/lib/lagnUrlParam.ts`, base64url LAGN) *does* carry everything and
   is the better vehicle.
2. **The handoff to play is a manual file upload.** The registry-viewer never
   links outward with a payload; `apps/arena-client/src/lobby/parseLoadoutJson.ts`
   tells the player to "re-export it from the Registry Viewer." Pools make the
   payload bigger and the manual round-trip more annoying. Worth pairing this WP
   with an outbound deep link.
3. **`expansions` is dead config.** `setupContract.types.ts:89` has
   `expansions: string[]`, hardcoded to `["base"]` in `useLoadoutDraft.ts:57`,
   with no setter and no UI. Any "by set" feature should either drive that field
   or delete it — leaving both is how drift starts.
4. **`FlatCardType` is stale.** `App.vue:187–192` still carries the legacy
   9-value union and widens Phase-2 slugs like `sidekick` to `string` for the
   ribbon; `src/registry/types/index.ts:34–58` types `cardType` even more
   narrowly than `flattenSet` actually emits. Typing pools properly forces this
   cleanup. Good, but it's real work — budget for it.
5. **Over-count blocks export.** `playerCountCompositionMismatches`
   (`useLoadoutDraft.ts:428`) and `isReady` (`:450`) flag over-count and
   `LoadoutBuilder` blocks export. Selecting all sets will put the pool well
   over any sane count, so `count` must be derived from the pool (§3.1 rule 2)
   rather than
   compared against a per-player-count expectation — otherwise "all" produces a
   permanently un-exportable draft.

---

## 5. Proposed phasing

| Phase | Scope | Rough size |
|---|---|---|
| **A** | ✅ **Shipped** — set filter in the loadout picker (engine PR #819). | ~half-day |
| **B** | 🚫 **Blocked** (§8). Contract + LAGN 1.1 pool shape, validators, round-trip tests. No UI. Revised estimate **~3–4 days**, not 1. | see §8 |
| **C** | Pool picker UI for all four kinds; `default` / `sets` / `explicit` modes + *Select all sets*; copies stepper. | ~1–2 days |
| **D** | Support Presets: download, upload, lock. File-only (§3.3) — no storage blocker. | ~1 day |
| **E** | Carry pools through `?lagn=` share links; optional outbound deep link to play/legends. | ~half-day |

A and B are independent and can run in parallel. C depends on both.

---

## 6. Decisions — locked 2026-07-18

| # | Decision | Source |
|---|---|---|
| 1 | **Support Preset** is the concept and the term. Non-hero board only; the 8-card SHIELD starting deck is out of scope. | Operator |
| 2 | **File-only storage.** Download/upload JSON. No localStorage, no backend. `useLoadoutDraft.ts:7–10` invariant stands unamended. | Operator |
| 3 | **Publish LAGN 1.1.0.** Pools are additive and 1.0.0 files stay valid, but the version bump lets replay tooling branch on capability instead of sniffing for a field. Rides WP-244's publication path. | Claude — recommended in draft, no counter-argument |
| 4 | **Set-selection is the primitive; "all" is a button, not a mode.** Three modes (`default` / `sets` / `explicit`); *Select all sets* writes every set abbr into `sets`. One control instead of three, one fewer code path. | Claude |
| 5 | **Phase A ships first, standalone.** The picker set-filter is small, independently useful for hero/villain selection, and de-risks Phase C. | Claude |

Decisions 3–5 were mine to make and are recorded here rather than held open; say
the word if you want any of them flipped before the build starts.

### Still genuinely open (does not block Phase A or B)

- **Phase E's outbound deep link.** Whether `cards` should link *out* to
  `play`/`legends` with an encoded payload, or whether the manual file upload
  stays. This is a product decision about the cross-site flow, not a detail of
  this feature, and it may deserve its own packet.

---

## 7. What's NOT in this proposal

- Any change to the five composition slots' semantics.
- Officer/sidekick *gameplay* rules on `play.legendary-arena.com` — this is
  setup definition only; the engine consumes what it's given.
- The `legends` leaderboard's own display of presets (WP-149 territory).
- Retroactive migration of existing LAGN records — they stay valid untouched.

---

## 8. Phase B is blocked on a locked contract — operator decision needed

Added 2026-07-18 after surveying the engine monorepo. The §3.1 design is sound
but it cannot be built without first amending a governance lock. This is the
repo's own required order of operations, not an optional gate.

### The blocker

The four count fields sit inside the **9-field composition lock (D-1244)**:

- `.claude/rules/code-style.md:188–197` — lists the nine fields and says
  plainly: **"Do not rename, abbreviate, or add fields."**
- `docs/03.1-DATA-SOURCES.md:161` (D-1244) — *"JSON schema must match TypeScript
  contract exactly; `additionalProperties: false` enforced (D-1244 through
  D-1248)."*

`additionalProperties: false` is the hard part. A `pool` object on the
composition block is not merely discouraged — it is **actively rejected** by the
match-setup schema. Two drift-detection tests exist specifically to catch this
and will fail by design:
`packages/registry/src/setupContract/setupContract.test.ts` (registry ↔
game-engine mirror) and `packages/game-engine/src/ui/uiState.types.drift.test.ts`.

Per `.claude/rules/code-style.md`, a locked contract requires a
`docs/ai/DECISIONS.md` entry **amending the decision first, then extending** —
`setupContract.types.ts:67–74` spells this out verbatim.

### Three ways forward

| | Approach | Trade |
|---|---|---|
| **1** | **Amend D-1244** to a 9-field core + optional pool block. Honest, permanent, unblocks C/D/E cleanly. | Touches a lock deliberately set; needs a DECISIONS entry and a careful sweep of ~20 consumer sites the survey enumerated. |
| **2** | **Put pools in the envelope, not the composition.** `code-style.md:198–200` states the envelope *is* extensible by design and the lock applies "specifically to the composition block." Pools ride alongside rather than inside. **No lock amendment needed.** | Splits the support definition from the counts it must stay consistent with; §3.1's "count must equal sum(copies)" becomes a cross-block invariant. |
| **3** | **Keep pools entirely client-side.** Support Presets are a registry-viewer concept; the exported MATCH-SETUP/LAGN carries only the resolved counts, as today. | Zero contract change, ships fastest, and satisfies the stated goal (a fixed harness across runs). But the preset can't travel with a game record, so `legends` can never *show* which harness a run used. |

**My recommendation: option 2**, with option 3 as the fallback if you want Phase
C/D sooner. Option 2 gets identity into the exported document — which is what
makes a `legends` comparison auditable — without touching a lock that exists for
good reason. The cross-block invariant is a validator's job and is cheap to
write. Option 1 is the "right" long-run shape but is a bigger governance move
than this feature justifies on its own.

**Independent of the choice**, Phase B should also introduce an exported
`LAGN_VERSION` constant. The literal `'1.0.0'` is currently duplicated across 5
production sites and ~30 fixtures with no single source, and
`packages/game-engine/src/versioning/versioning.check.ts:22–30` already
establishes the convention (version constants live in TS, deliberately not read
from `package.json`). Any bump without that cleanup means editing 35 places.
