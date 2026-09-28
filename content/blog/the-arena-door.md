---
title: "The Arena Door: What Riot's Games Teach About a Lobby"
date: 2026-09-28
description: "The play lobby today is a workshop: every control, all at once. Six Riot games and one hard lesson from 2XKO shape the plan to turn it into a door — one decision per screen, a scenario brief before every session, and the workshop kept intact behind it."
draft: false
tags: ["design", "roadmap", "lobby"]
categories: ["news"]
cta: "play"
---

Open [play.legendary-arena.com](https://play.legendary-arena.com/) today and
you land in a workshop.

Everything is there. A display name. A bot-play panel with a player count, an
AI policy, and a delay between moves in milliseconds. A second panel for
playing alongside bot allies. A loadout section that takes an uploaded file, a
sample, or pasted JSON. A manual setup form for anyone who wants to fill the
fields by hand. A join box for a match ID. A list of open matches.

Every one of those controls works, and every one of them earned its place
while the engine was being built. None of them is the first thing a player
should see. The lobby asks a newcomer to configure a session before it has
shown them a reason to want one.

That changes next. The plan below borrows from six of Riot's games — not their
art, their discipline — and from one warning Riot published this summer.

## Six references, one lesson each

**League of Legends: separate the intentions.** League serves players who want
ranked, players who want a normal game, and players who want a rotating
experiment, and it gives each its own front door. Legendary Arena has the same
spread of intent — play a cooperative session with bot allies, play with
friends, climb the leaderboard, watch a session — and today all of it sits on
one scrolling page. Each intention becomes its own mode card, with its own
line of purpose, before any configuration appears.

**2XKO: lead with the contest.** 2XKO's public face promises the fight before
it explains the system. The arena works the same way. The first screen shows
heroes facing a Mastermind and one action: enter. Setup comes after the player
has decided to fight.

**Wild Rift: one decision per screen.** A mobile game cannot show everything at
once, so it doesn't try. The arena adopts that constraint on every screen size:
choose a mode, choose a scenario, assemble the team, review, enter. Loadout
upload and pasted JSON move into a single Import step that shows the loadout
back to you visually before a session is created.

**VALORANT: restraint.** The lesson is not the aesthetic. It is the discipline
— strong type, a narrow palette, one dominant action per screen, and color
that carries state rather than decoration. Ready, unavailable, in danger, and
yours each read at a glance, drawn from the same brand tokens that already
govern this site, the card registry, and the game client.

**Teamfight Tactics: make progress visible without making it noise.** TFT puts
its ladder at the base of its competitive path and still keeps the product
warm. The arena shows standing the same way: where you stand, which
Masterminds you have defeated, which scenarios you have mastered. The raw
rating math stays behind a detail view for the players who want it.

**Legends of Runeterra: one card, three jobs.** Runeterra understands that a
card is read differently depending on where it sits. The arena treats cards in
three presentations. In the [card registry](https://cards.legendary-arena.com/)
a card is art-forward. In a loadout it is compact and sortable. In a session it
is large, with its cost and values in fixed positions, keywords marked the same
way everywhere, and temporary effects visibly separate from printed text.

## The warning in 2XKO

On August 20, 2026, Riot announced that
[2XKO will end active development in December](https://www.riotgames.com/en/news/2xko-active-development-ends-december-2026).
The servers stay on. The reason Riot gave was retention: plenty of players
tried the game, and not enough of them stayed.

2XKO had a strong netcode story, a ranked ladder, regular content, and a
free-to-play door. None of that held players the core loop didn't. That is the
lesson the arena takes most seriously: **infrastructure does not replace the
session.** A ranked system is only worth the sessions underneath it.

So the redesign is built around the cooperative Mastermind session first.
Standing reinforces that session. It is never the reason the session exists.

## Stable core, experimental edge

Riot's R&D office describes
[incubation as a wide funnel](https://www.riotgames.com/en/r-and-d-office/incubation-exploration-with-a-plan)
narrowed down to the few ideas that earn a prototype, and the studio has since
[refocused on fewer, higher-impact projects](https://www.riotgames.com/en/news/2024-player-update).
The arena applies that split to its own surface.

The **core** is what every player depends on and what does not move under
them: creating a session, cooperative play, turn flow, the Mastermind fight,
card resolution, and rejoining a session in progress.

The **edge** is where new ideas get tested without touching the core: draft
formats, alternate schemes, gauntlets, tournament experiments, spectator
presentation, smarter bot allies. That work gets its own labeled space —
Arena Labs — so an experiment never quietly changes the rules of a ranked
session.

## What changes, in order

The first three items carry most of the difference a player will feel. They go
first.

1. **The door.** A new landing screen with one primary action. The arena, a
   Mastermind, the heroes, and *Enter* — with *Watch* beside it. Below that, a
   continue-your-session card and a short view of your standing. Match IDs,
   pasted JSON, validation text, and bot delays leave the front page.
2. **The guided path.** Mode, then scenario, then team — heroes, friends, and
   bot allies — then review. One decision per screen, with the primary action
   within thumb reach on a phone.
3. **The scenario brief.** The screen between setup and play: the Mastermind,
   the scheme, the villain groups and henchmen, the heroes at the table, player
   count, and any special rules, all in one composition, with *Enter* at the
   bottom. It is the moment the table commits to the fight.
4. **The design system underneath.** Card frames for all three presentations,
   one icon set for recruit, attack, wounds, bystanders, and keywords, and
   state treatments for selected, disabled, exhausted, and empowered — so every
   later screen is assembled from the same parts.
5. **Standing, shown plainly.** A standing view built from sessions played
   well: Masterminds defeated, scenarios mastered, hero mastery. No hidden
   variables on display, no noise.
6. **Heroes as more than a list.** A hero page with full art, a short
   background, and your own record with that hero: sessions, victories, and the
   teammates they pair with best.
7. **Playing together.** Friends, parties, and watching a friend's session.
8. **Arena Labs.** The labeled home for the experimental edge.
9. **The Workshop.** Everything on today's lobby, kept whole.

## The workshop stays

That last item matters. The current lobby is not being thrown out. Loadout
import, pasted JSON, manual setup, bot policy and delay controls, and join by
ID are how scenarios get tested and how bugs get reproduced. They move behind a
door marked **Arena Workshop**, one click from the front page, for anyone who
wants them.

The player who wants to fight enters through the arena. The player who wants
to take the machine apart still can.

## What does not change

A new lobby changes how the arena looks. It does not change what the arena is.

Standing comes from sessions played well, not hours logged or money spent.
There are no experience bars, no time-gated unlocks, and no random rewards to
chase. No purchase changes a session. The rules a player learns this week are
the rules they face next week. Every screen on this roadmap is built to serve
those lines, not to work around them.

The arena awaits. The door is next.
