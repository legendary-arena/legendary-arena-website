# WP-037 — Leaderboard CTA for gauntlet posts

Teach `layouts/_partials/cta-block.html` a fourth `cta` value,
`"leaderboard"`, that deep-links a post's own gauntlet board on
`legends.legendary-arena.com`. Switch the three Gauntlet Guides to it and
retire the hand-written board link each one currently ends with.

Requested by the operator 2026-07-18, following the incident recorded in
"Background" below.

## Background — why this exists

The three Gauntlet Guides originally shipped with `cta: "leaderboard"`
in front matter (commits `be2751e`, `fbbbb83`). That value was never in
the partial's allowed set, so `cta-block.html` line 2 silently rewrote it
to `"play"` and all three posts rendered a **"Play now"** button. No build
error, no warning — just the wrong CTA on the site's three highest-effort
posts.

It was fixed the cheap way in `7dbcf65` ("correct the CTA to a valid
value") by changing the posts to `cta: "play"`, which is a content-lane
edit and needs no work packet. That made the posts *valid* but not
*right*: each still ends with a hand-maintained
`**[View the <name> gauntlet →](...)**` link, and the `gauntlet_board`
front-matter field — populated on all three — is read by nothing.

This WP closes the gap properly. Silent-fallback behaviour is retained
(it is the correct posture for a typo'd value) but is now documented in
the template so the next author does not rediscover it the same way.

## Working directory

`C:\www\legendary-arena-com\` — Hugo marketing site for `www.legendary-arena.com`.

## Current state

`layouts\_partials\cta-block.html` gates on
`(slice "play" "newsletter" "tournament")`. All three gauntlet posts
carry `cta: "play"`, `gauntlet_board: "<board-id>"`, and a manual board
link as their final body line.

Board URL pattern, established in the post bodies and unchanged here:

```
https://legends.legendary-arena.com/#/gauntlet/<gauntlet_board>
```

## Task

### Step 1 — Extend the partial (`layouts\_partials\cta-block.html`)

- Add `"leaderboard"` to the allowed slice.
- Add an `else if eq $cta "leaderboard"` branch that builds the href from
  `.Params.gauntlet_board`, falling back to
  `https://legends.legendary-arena.com/` when the field is absent, with
  the button label following the same fork ("View the gauntlet" /
  "View the leaderboard").
- Add a header comment recording the closed-set contract and the silent
  fallback, citing this WP and the two originating commits.

Copy is declarative, not interrogative — `strategy.md` lists "questions
as headlines" as a failure mode. ("Ready to play?" and "Think you've got
what it takes?" predate this WP and are left alone; rewriting them is a
copy decision, not a template one.)

### Step 2 — Switch the posts (`content\posts\gauntlet-*.md`)

- `cta: "play"` → `cta: "leaderboard"` in all three.
- Delete the final-line `**[View the <name> gauntlet →](...)**` from each.
  Keeping it would stack two identical board links, since the CTA block
  renders immediately below the body.

### Step 3 — Verify

```pwsh
hugo --minify
```

Then confirm in `public/posts/<slug>/index.html` for each of the three
posts:

- exactly one `legends.legendary-arena.com` link
- `data-cta="leaderboard"` on the block
- the href carries the post's own board id
- no `Play now` button

## Definition of Done

- [x] `"leaderboard"` accepted by `cta-block.html`; unknown values still
      fall back to `"play"`
- [x] Board href built from `gauntlet_board`, with a root-leaderboard
      fallback when the field is absent
- [x] All three Gauntlet Guides on `cta: "leaderboard"`
- [x] Duplicate hand-written board links removed from all three
- [x] `hugo --minify` clean; rendered output verified per Step 3
- [ ] Commit on a `claude/*` branch → PR → `origin/main`
- [ ] Post-deploy: the three live posts show a single board CTA landing on
      the correct gauntlet

## What's NOT in scope

- **The two pre-existing question-form CTA strings** ("Ready to play?",
  "Think you've got what it takes?"). They conflict with `strategy.md`'s
  "questions as headlines" failure mode, but rewriting shipped conversion
  copy is a separate decision with its own review.
- **A build-time guard against invalid `cta` values.** Worth considering —
  a `warnf` or `errorf` on an unrecognized value would have caught the
  original bug at build time instead of on the live site — but that
  changes build behaviour repo-wide and deserves its own WP.
- **`newsletter_week` / `newsletter_slug` on gauntlet posts.** Absent by
  design; the series has no newsletter companion yet.
- **Other consumers of `gauntlet_board`.** A gauntlet index page or
  taxonomy over the field is unbuilt; this WP only makes the field
  load-bearing for the CTA.
- **The `/posts/` → `/blog/` URL migration** under discussion separately.
  Nothing here depends on the section name.
