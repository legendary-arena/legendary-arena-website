---
title: "Marvel Legendary Universal Rulebook (v23)"
date: 2026-07-22T00:00:00-05:00
description: "The complete Marvel Legendary Deck-Building Game universal rules (version 23, updated through Weapon X) — setup, turn structure, every keyword ability, card and location clarifications, additional rules, expansion card lists, and errata. A single searchable reference page."
ShowToc: false
draft: false
---
<style>
/* why: outrank PaperMod's `.md-content img { margin: 1rem 0 }` (specificity
   0,1,1) — as a bare .rules-icon class (0,1,0) it lost, so every inline icon got
   a 1rem top/bottom margin that double-spaced the paragraph. Scoping to
   .md-content img.rules-icon (0,2,1) wins and keeps icons truly inline. */
.md-content img.rules-icon,.md-content svg.rules-icon{display:inline-block;height:1em;width:auto;margin:0 .08em;vertical-align:-.12em;border-radius:0}
svg.rules-icon{fill:currentColor}
.rules-toc{margin:1.5rem 0;font-size:0.95em}
.rules-toc h2{margin:0 0 .5rem}
.rules-toc-section{margin:.15rem 0;font-weight:600}
.rules-toc-group{margin:.15rem 0}
.rules-toc-group>summary{cursor:pointer;font-weight:600;padding:.15rem 0}
.rules-toc-count{opacity:.6;font-weight:400}
.rules-toc-group ul{margin:.25rem 0 .5rem 1.25rem;columns:2;column-gap:2rem;padding-left:1rem}
.rules-toc-group li{break-inside:avoid}
@media (max-width:640px){.rules-toc-group ul{columns:1}}
</style>

This page reproduces the **Marvel Legendary Universal Rulebook, version 23**
(updated through Weapon X), compiled by **Randall Worley** — the rules
reference behind Legendary Arena's [card registry](https://cards.legendary-arena.com/)
and [play client](https://play.legendary-arena.com/). The full rulebook is
laid out below as one searchable page: general setup, the turn sequence,
every keyword ability, card and location clarifications, additional rules,
expansion card lists, and errata.

> **Icons and navigation.** The game's symbols — Attack <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon">, Recruit <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon">, hero classes, and team badges — are
> rendered inline from the rulebook's own artwork. The linked table of contents
> below jumps to any section, keyword, or rule, and every heading has a stable
> anchor. For the fully illustrated original, open the [source PDF](https://images.legendary-arena.com/docs/legendary-universal-rules-v23.pdf).
>
> *Marvel* and *Legendary* are trademarks of their respective owners; this is a
> freely-distributed community rulebook, reproduced here for reference.

---

<nav class="rules-toc">
<h2 id="contents">Contents</h2>
<p class="rules-toc-section"><a href="#overview">Overview</a></p>
<details class="rules-toc-group"><summary><a href="#gameplay">Gameplay</a> <span class="rules-toc-count">(2)</span></summary>
<ul><li><a href="#how-to-win">How to Win</a></li><li><a href="#how-to-lose">How to Lose</a></li></ul>
</details>
<details class="rules-toc-group"><summary><a href="#general-game-setup">General Game Setup</a> <span class="rules-toc-count">(6)</span></summary>
<ul><li><a href="#player-starting-decks">Player Starting Decks</a></li><li><a href="#always-available-decks">Always Available Decks</a></li><li><a href="#your-opponent">Your Opponent</a></li><li><a href="#the-villain-adversary-deck">The Villain/Adversary Deck</a></li><li><a href="#the-hero-ally-deck">The Hero/Ally Deck</a></li><li><a href="#completing-setup">Completing Setup</a></li></ul>
</details>
<details class="rules-toc-group"><summary><a href="#playing-the-game">Playing the Game</a> <span class="rules-toc-count">(19)</span></summary>
<ul><li><a href="#a-player-turn">A Player Turn:</a></li><li><a href="#step-1-play-the-top-card-of-the-villain-adversary-deck">Step 1: Play the Top Card of the Villain/Adversary Deck</a></li><li><a href="#if-the-card-is-a-villain-adversary">If the Card Is a Villain/Adversary:</a></li><li><a href="#if-the-card-is-a-location">If the Card is a Location:</a></li><li><a href="#if-the-card-is-a-trap">If the Card is a Trap:</a></li><li><a href="#if-the-card-is-a-bystander">If the Card Is a Bystander:</a></li><li><a href="#if-the-card-is-a-twist">If the Card Is a Twist:</a></li><li><a href="#if-the-card-is-a-strike">If the Card Is a Strike:</a></li><li><a href="#step-2-play-cards-from-your-hand-using-them-to-recruit-and-fight">Step 2: Play Cards from Your Hand, Using Them to Recruit and Fight</a></li><li><a href="#totaling-up-recruit-and-attack-values">Totaling up Recruit and Attack values</a></li><li><a href="#activating-superpower-abilities">Activating Superpower Abilities</a></li><li><a href="#icon-4-instead-of-a-hero-class-icon-these-work-the-same-way-as">{{icon:4}} instead of a hero class icon. These work the same way as</a></li><li><a href="#critical-hit-superpower-abilities">“Critical Hit” Superpower Abilities</a></li><li><a href="#recruiting-heroes-allies-and-fighting-villains-adversaries">Recruiting Heroes/Allies and Fighting Villains/Adversaries</a></li><li><a href="#masterminds-commanders">Masterminds/Commanders</a></li><li><a href="#step-3-discard-your-hand-and-draw-6-new-cards">Step 3: Discard Your Hand and Draw 6 New Cards</a></li><li><a href="#end-of-the-game-players-win">End of the Game: Players Win:</a></li><li><a href="#evil-wins">Evil Wins:</a></li><li><a href="#tied-game">Tied Game:</a></li></ul>
</details>
<details class="rules-toc-group"><summary><a href="#keyword-abilities">Keyword Abilities</a> <span class="rules-toc-count">(120)</span></summary>
<ul><li><a href="#keyword-abomination">Abomination</a></li><li><a href="#keyword-ambush">Ambush</a></li><li><a href="#keyword-antics">Antics</a></li><li><a href="#keyword-artifacts">Artifacts</a></li><li><a href="#keyword-ritual-artifacts">Ritual Artifacts</a></li><li><a href="#keyword-thrown-artifacts">Thrown Artifacts</a></li><li><a href="#keyword-triggered-artifacts">Triggered Artifacts</a></li><li><a href="#keyword-villainous-weapons">Villainous Weapons</a></li><li><a href="#keyword-astral-plane">Astral Plane</a></li><li><a href="#keyword-berserk">Berserk</a></li><li><a href="#keyword-fail">Fail</a></li><li><a href="#keyword-blood-frenzy">Blood Frenzy</a></li><li><a href="#keyword-bribe">Bribe</a></li><li><a href="#keyword-burrow">Burrow</a></li><li><a href="#keyword-celestial-boons">Celestial Boons</a></li><li><a href="#keyword-charge">Charge</a></li><li><a href="#keyword-cheering-crowds">Cheering Crowds</a></li><li><a href="#keyword-chivalrous-duel">Chivalrous Duel</a></li><li><a href="#keyword-choose-a-villain-group">“Choose a Villain Group”</a></li><li><a href="#keyword-circle-of-kung-fu-and-quack-fu">Circle of Kung-Fu (and Quack-Fu)</a></li><li><a href="#keyword-clone">Clone</a></li><li><a href="#some-heroes-say-things-like-when-recruited-icon-7-clone-use-this-ability-only-if-you-have-played-a-icon-7-hero-this">• Some Heroes say things like “When Recruited —{{icon:7}} : Clone.” Use this ability only if you have played a{{icon:7}} Hero this</a></li><li><a href="#keyword-command">Command</a></li><li><a href="#keyword-conqueror">Conqueror</a></li><li><a href="#keyword-contest-of-champions">Contest of Champions</a></li><li><a href="#keyword-coordinate">Coordinate</a></li><li><a href="#keyword-cosmic-threat">Cosmic Threat</a></li><li><a href="#icon-9-icon-6-icon-7-icon-3-icon-5-ability-this-means-once-per-turn-choose-icon-9-icon-6-icon-7-icon-3-or-icon-5-for-each-card-of-that-class-you-reveal">{{icon:9}}, {{icon:6}},{{icon:7}} , {{icon:3}},{{icon:5}} ability. This means: “Once per turn, choose {{icon:9}}, {{icon:6}},{{icon:7}} , {{icon:3}}, or {{icon:5}}. For each card of that class you reveal,</a></li><li><a href="#keyword-cross-dimensional-rampage">Cross-Dimensional Rampage</a></li><li><a href="#keyword-cyber-mod">Cyber-Mod</a></li><li><a href="#some-enemies-say-things-like-cyber-mod-icon-7-icon-7-icon-7-this">• Some enemies say things like “Cyber-Mod{{icon:7}}{{icon:7}}{{icon:7}} : This</a></li><li><a href="#keyword-cyber-mods">Cyber-Mods</a></li><li><a href="#keyword-danger-sense">Danger Sense</a></li><li><a href="#keyword-dark-memories">Dark Memories</a></li><li><a href="#the-hero-classes-are-icon-9-icon-6-icon-7-icon-3-and-icon-5-and-dark">• The Hero Classes are {{icon:9}}, {{icon:6}},{{icon:7}} , {{icon:3}}, and {{icon:5}}, and Dark</a></li><li><a href="#keyword-defeat">“Defeat”</a></li><li><a href="#keyword-demolish">Demolish</a></li><li><a href="#keyword-demonic-bargain">Demonic Bargain</a></li><li><a href="#keyword-digest">Digest</a></li><li><a href="#keyword-dodge">Dodge</a></li><li><a href="#keyword-dominate">Dominate</a></li><li><a href="#keyword-double-cross">Double-Cross</a></li><li><a href="#keyword-elusive">Elusive</a></li><li><a href="#keyword-empowered">Empowered</a></li><li><a href="#some-heroes-say-things-like-you-get-empowered-by-icon-7-this-means-you-get-1-icon-0-for-each-icon-7-card-in-the-hq">• Some Heroes say things like “You get Empowered by{{icon:7}} .” This means “You get +1{{icon:0}} for each{{icon:7}} card in the HQ.”</a></li><li><a href="#empowered-by-icon-6-icon-7-gives-1-icon-0-for-each-icon-6-icon-7-or-icon-6-icon-7">• “Empowered by {{icon:6}}{{icon:7}} ” gives +1{{icon:0}}for each {{icon:6}},{{icon:7}} , or {{icon:6}}{{icon:7}}</a></li><li><a href="#keyword-endgame">Endgame</a></li><li><a href="#keyword-excessive-kindness">Excessive Kindness</a></li><li><a href="#keyword-excessive-violence">Excessive Violence</a></li><li><a href="#keyword-explore">Explore</a></li><li><a href="#keyword-fated-future">Fated Future</a></li><li><a href="#keyword-fateful-resurrection">Fateful Resurrection</a></li><li><a href="#keyword-feast">Feast</a></li><li><a href="#keyword-focus">Focus</a></li><li><a href="#keyword-fortify">Fortify</a></li><li><a href="#keyword-galactus-consumes-the-earth">Galactus Consumes the Earth</a></li><li><a href="#keyword-grey-heroes">Grey Heroes</a></li><li><a href="#keyword-half-points">Half-Points</a></li><li><a href="#keyword-haunt">Haunt</a></li><li><a href="#keyword-heist">Heist</a></li><li><a href="#keyword-hidden-witnesses">Hidden Witnesses</a></li><li><a href="#keyword-hunt-for-victims">Hunt for Victims</a></li><li><a href="#keyword-human-shields">Human Shields</a></li><li><a href="#keyword-hydra-level">HYDRA Level</a></li><li><a href="#keyword-hyperspeed">Hyperspeed</a></li><li><a href="#keyword-indigestion">Indigestion</a></li><li><a href="#keyword-investigate">Investigate</a></li><li><a href="#keyword-last-stand">Last Stand</a></li><li><a href="#keyword-liberate">Liberate</a></li><li><a href="#keyword-lightshow">Lightshow</a></li><li><a href="#keyword-locations">Locations</a></li><li><a href="#keyword-man-and-woman-out-of-time">Man (and Woman) Out of Time</a></li><li><a href="#keyword-microscopic-size-changing">Microscopic Size-Changing</a></li><li><a href="#keyword-size-changing">Size-Changing</a></li><li><a href="#keyword-momentum">Momentum</a></li><li><a href="#keyword-moonlight-and-sunlight">Moonlight and Sunlight</a></li><li><a href="#keyword-outwit">Outwit</a></li><li><a href="#keyword-patrol">Patrol</a></li><li><a href="#keyword-phasing">Phasing</a></li><li><a href="#keyword-piercing-energy">Piercing Energy</a></li><li><a href="#keyword-poison-villains">Poison Villains</a></li><li><a href="#keyword-prey">Prey</a></li><li><a href="#keyword-reveal">Reveal</a></li><li><a href="#keyword-revenge">Revenge</a></li><li><a href="#keyword-rise-of-the-living-dead">Rise of the Living Dead</a></li><li><a href="#keyword-sacrifice">Sacrifice</a></li><li><a href="#keyword-savior">Savior</a></li><li><a href="#keyword-shards">Shards</a></li><li><a href="#keyword-shatter">Shatter</a></li><li><a href="#keyword-s-h-i-e-l-d-clearance">S.H.I.E.L.D. Clearance</a></li><li><a href="#keyword-s-h-i-e-l-d-level">S.H.I.E.L.D. Level</a></li><li><a href="#some-hero-cards-say-things-like-size-changing-icon-7-this">• Some Hero cards say things like “Size-Changing:{{icon:7}} .” This</a></li><li><a href="#played-any-icon-7-cards-this-turn">played any{{icon:7}} cards this turn.”</a></li><li><a href="#keyword-smash">Smash</a></li><li><a href="#keyword-soulbind">Soulbind</a></li><li><a href="#keyword-soaring-flight">Soaring Flight</a></li><li><a href="#keyword-spectrum">Spectrum</a></li><li><a href="#classes-of-hero-e-g-icon-9-icon-7-and-icon-5">classes of Hero. (e.g. {{icon:9}},{{icon:7}} , and {{icon:5}})</a></li><li><a href="#keyword-striker">Striker</a></li><li><a href="#keyword-symbiote-bonds">Symbiote Bonds</a></li><li><a href="#keyword-switcheroo">Switcheroo</a></li><li><a href="#keyword-tactical-formation">Tactical Formation</a></li><li><a href="#keyword-teleport">Teleport</a></li><li><a href="#keyword-thrones-favor">Throne’s Favor</a></li><li><a href="#keyword-transform">Transform</a></li><li><a href="#keyword-ultimate-abomination">Ultimate Abomination</a></li><li><a href="#keyword-undercover">Undercover</a></li><li><a href="#keyword-uru-enchanted-weapons">Uru-Enchanted Weapons</a></li><li><a href="#keyword-fight-or-fail">Fight or Fail</a></li><li><a href="#keyword-versatile">Versatile</a></li><li><a href="#keyword-waking-nightmare">Waking Nightmare</a></li><li><a href="#keyword-wall-crawl">Wall Crawl</a></li><li><a href="#keyword-weapon-x-sequence">Weapon X Sequence</a></li><li><a href="#keyword-when-recruited-abilities">“When Recruited” Abilities</a></li><li><a href="#keyword-what-if">What If...?</a></li><li><a href="#keyword-worthy">Worthy</a></li><li><a href="#keyword-wound">Wound</a></li><li><a href="#keyword-wounded-fury">Wounded Fury</a></li><li><a href="#keyword-x-gene">X-Gene</a></li><li><a href="#keyword-x-treme-attack">X-Treme Attack</a></li></ul>
</details>
<details class="rules-toc-group"><summary><a href="#card-clarifications">Card Clarifications</a> <span class="rules-toc-count">(60)</span></summary>
<ul><li><a href="#adrian-toomes">Adrian Toomes</a></li><li><a href="#arnim-zola">Arnim Zola</a></li><li><a href="#bathe-earth-in-cosmic-rays">Bathe Earth in Cosmic Rays</a></li><li><a href="#build-an-underground-mega-vault-prison">Build an Underground Mega-Vault Prison</a></li><li><a href="#bystanders-that-become-villains">Bystanders that become Villains</a></li><li><a href="#cage-villains-in-power-suppressing-cells">Cage Villains in Power-Suppressing Cells</a></li><li><a href="#casual-bank-robbery-black-cat">Casual Bank Robbery (Black Cat)</a></li><li><a href="#chameleon-sinister-six">Chameleon (Sinister Six)</a></li><li><a href="#change-the-outcome-of-wwii">Change the Outcome of WWII</a></li><li><a href="#charles-xavier-professor-of-crime">Charles Xavier, Professor of Crime</a></li><li><a href="#the-clone-saga">The Clone Saga</a></li><li><a href="#crown-thor-king-of-asgard">Crown Thor King of Asgard</a></li><li><a href="#detonate-the-helicarrier">Detonate the Helicarrier</a></li><li><a href="#diving-catch-angel">Diving Catch (Angel)</a></li><li><a href="#ego-the-living-planet">Ego, the Living Planet</a></li><li><a href="#eighth-times-a-charm-dr-octopus">Eighth Time’s a Charm (Dr. Octopus)</a></li><li><a href="#everybody-hates-deadpool">Everybody Hates Deadpool</a></li><li><a href="#fear-itself">Fear Itself</a></li><li><a href="#forge-the-infinity-gauntlet">Forge the Infinity Gauntlet</a></li><li><a href="#fulfill-the-contract-bullseye">Fulfill the Contract (Bullseye)</a></li><li><a href="#galactus">Galactus</a></li><li><a href="#hidden-heart-of-darkness">Hidden Heart of Darkness</a></li><li><a href="#infinity-gems">Infinity Gems</a></li><li><a href="#invade-the-daily-bugle-hq">Invade the Daily Bugle HQ</a></li><li><a href="#invincible-force-field">Invincible Force Field</a></li><li><a href="#killmonger-spec-ops-counting-villain-groups">Killmonger, Spec Ops - Counting Villain Groups</a></li><li><a href="#king-hyperion">King Hyperion</a></li><li><a href="#the-kree-skrull-war">The Kree-Skrull War</a></li><li><a href="#liz-peters-allies">Liz (Peter’s Allies)</a></li><li><a href="#madame-hydra">Madame HYDRA</a></li><li><a href="#mass-produce-war-machine-armor">Mass Produce War Machine Armor</a></li><li><a href="#mole-man">Mole Man</a></li><li><a href="#mr-sinister">Mr. Sinister</a></li><li><a href="#mysterio">Mysterio</a></li><li><a href="#new-recruits">New Recruits</a></li><li><a href="#odin">Odin</a></li><li><a href="#phoenix-force-cyclops">Phoenix-Force Cyclops</a></li><li><a href="#pickpocket-black-cat">Pickpocket (Black Cat)</a></li><li><a href="#professor-x">Professor X</a></li><li><a href="#pull-reality-into-the-negative-zone">Pull Reality into the Negative Zone</a></li><li><a href="#pull-the-strings-kingpin">Pull the Strings (Kingpin)</a></li><li><a href="#reality-gem-infinity-gems">Reality Gem (Infinity Gems)</a></li><li><a href="#shifting-decoy-mysterio">Shifting Decoy (Mysterio)</a></li><li><a href="#show-your-true-colors-mystique">Show Your True Colors (Mystique)</a></li><li><a href="#sinister-ambitions">Sinister Ambitions</a></li><li><a href="#soul-gem-infinity-gems">Soul Gem (Infinity Gems)</a></li><li><a href="#space-gem-infinity-gems">Space Gem (Infinity Gems)</a></li><li><a href="#spider-queen">Spider-Queen</a></li><li><a href="#spider-man-spider-friends">Spider-Man (Spider Friends)</a></li><li><a href="#thanos">Thanos</a></li><li><a href="#total-fury-nick-fury">Total Fury (Nick Fury)</a></li><li><a href="#turn-the-tide-mystique">Turn the Tide (Mystique)</a></li><li><a href="#ultron">Ultron</a></li><li><a href="#ultron-infinity">Ultron Infinity</a></li><li><a href="#by-icon-7-abilities-he-will-get-2-icon-0-for-each-icon-7-card-in-the-hq-if">by ”{{icon:7}} abilities, he will get +2{{icon:0}}for each{{icon:7}} card in the HQ. If</a></li><li><a href="#unending-energy-cyclops">Unending Energy (Cyclops)</a></li><li><a href="#venom-blast-spider-woman">Venom Blast (Spider-Woman)</a></li><li><a href="#watchful-eye-happy-hogan">Watchful Eye (Happy Hogan)</a></li><li><a href="#weave-a-web-of-lies">Weave a Web of Lies</a></li><li><a href="#x-cutioners-song">X-Cutioner’s Song</a></li></ul>
</details>
<details class="rules-toc-group"><summary><a href="#additional-rules">Additional Rules and Clarifications</a> <span class="rules-toc-count">(82)</span></summary>
<ul><li><a href="#rule-abilities-triggering-separately">Abilities Triggering Separately</a></li><li><a href="#rule-adapting-masterminds">Adapting Masterminds</a></li><li><a href="#rule-adjusting-difficulty">Adjusting Difficulty</a></li><li><a href="#rule-ambush-schemes">Ambush Schemes</a></li><li><a href="#rule-bindings">Bindings</a></li><li><a href="#rule-bystanders">Bystanders</a></li><li><a href="#rule-cards-that-dont-have-a-number">Cards That Don’t Have a Number</a></li><li><a href="#rule-card-values">Card Values</a></li><li><a href="#rule-choosing-from-multiple-villain-decks">Choosing from Multiple Villain Decks</a></li><li><a href="#rule-cooperative-and-competitive-play">Cooperative and Competitive Play</a></li><li><a href="#rule-class-vs-colors-hero-ally-classes-are-icon-9-icon-6-icon-7-icon-3-and-icon-5-basic-s-h-i-e-l-d">Class vs. “Colors” Hero/Ally Classes are: {{icon:9}}, {{icon:6}},{{icon:7}} , {{icon:3}}, and {{icon:5}}. Basic S.H.I.E.L.D.</a></li><li><a href="#rule-divided-cards">Divided Cards</a></li><li><a href="#rule-double-sided-epic-masterminds">Double-Sided Epic Masterminds</a></li><li><a href="#rule-double-sided-transforming-schemes">Double-Sided Transforming Schemes</a></li><li><a href="#rule-each-hero-ally-you-played-this-turn">“Each Hero/Ally You Played This Turn”</a></li><li><a href="#rule-enraging-wounds">Enraging Wounds</a></li><li><a href="#rule-escapes-overruns-from-card-effects">Escapes/Overruns from Card Effects</a></li><li><a href="#rule-final-blow-optional">Final Blow (Optional)</a></li><li><a href="#rule-final-showdown-optional">Final Showdown (Optional)</a></li><li><a href="#rule-gaining-cards">“Gaining” Cards</a></li><li><a href="#rule-grievous-wounds">Grievous Wounds</a></li><li><a href="#rule-half-points">Half-Points</a></li><li><a href="#rule-henchmen-are-villains-adversaries-masterminds-are-not-villains-adversaries">Henchmen Are Villains/Adversaries. Masterminds Are Not Villains/ Adversaries.</a></li><li><a href="#rule-hero-ally-classes">Hero/Ally Classes</a></li><li><a href="#rule-icon-6-instinct-heroes-allies-yellow-use-savagery-and-quick">{{icon:6}} Instinct Heroes/Allies (Yellow) use savagery and quick</a></li><li><a href="#rule-icon-7-covert-heroes-allies-red-include-heroes-using-trickery">{{icon:7}} Covert Heroes/Allies (Red) include Heroes using trickery</a></li><li><a href="#rule-icon-3-tech-heroes-allies-black-include-heroes-using-advanced">{{icon:3}} Tech Heroes/Allies (Black) include Heroes using advanced</a></li><li><a href="#rule-hero-ally-teams">Hero/Ally Teams</a></li><li><a href="#rule-icon-45">{{icon:45}}</a></li><li><a href="#rule-icon-48">{{icon:48}}</a></li><li><a href="#rule-icon-13-crime-syndicate-the-city-streets-of-the-marvel-universe">{{icon:13}} Crime Syndicate: The city streets of the Marvel Universe</a></li><li><a href="#rule-icon-35-fantastic-four-along-with-their-former-foe-silver-surfer">{{icon:35}} Fantastic Four: Along with their former foe Silver Surfer,</a></li><li><a href="#rule-icon-47">{{icon:47}}</a></li><li><a href="#rule-icon-44">{{icon:44}}</a></li><li><a href="#rule-icon-18-hydra-is-a-secret-criminal-organization-working-to">{{icon:18}} HYDRA: is a secret criminal organization working to</a></li><li><a href="#rule-icon-43-inhumans-the-lnhumans-are-a-mysterious-powerful-race">{{icon:43}} Inhumans: The lnhumans are a mysterious, powerful race</a></li><li><a href="#rule-icon-25-mercs-for-money-these-psychos-follow-deadpool-doing">{{icon:25}} Mercs For Money! These psychos follow Deadpool, doing</a></li><li><a href="#rule-icon-34-new-warriors-were-at-the-center-of-the-superhero">{{icon:34}}New Warriors: were at the center of the Superhero</a></li><li><a href="#rule-icon-31-spider-friends-spider-man-and-his-allies-use-speed">{{icon:31}} Spider Friends: Spider-Man and his allies use speed,</a></li><li><a href="#rule-icon-39-icon-37-venomverse-in-venomverse-a-new-race-of-alien">{{icon:39}}{{icon:37}}Venomverse: In “Venomverse,” a new race of alien</a></li><li><a href="#rule-icon-13-x-men-born-as-mutants-with-strange-superpowers-that">{{icon:13}} X-Men: Born as mutants, with strange superpowers that</a></li><li><a href="#rule-heroic-bystanders">Heroic Bystanders</a></li><li><a href="#rule-horrors">Horrors</a></li><li><a href="#rule-how-to-teach-the-game">How to Teach the Game</a></li><li><a href="#rule-ko">“KO”</a></li><li><a href="#rule-locations">Locations</a></li><li><a href="#rule-mandarins-rings">Mandarin’s Rings</a></li><li><a href="#rule-masterminds-dont-count-as-villains-commanders-dont-count-as-adversaries">Masterminds don’t count as Villains; Commanders don’t count as Adversaries</a></li><li><a href="#rule-multiclass-cards-introduced-in-secret-wars-vol-1-a-icon-6-icon-7-card-counts-as-both-icon-6-and-icon-7-these-cards-are-great-at-enabling-superpower-abilities-like-icon-7-you-get-2">Multiclass Cards Introduced in Secret Wars, Vol. 1, a {{icon:6}}{{icon:7}} card counts as both {{icon:6}} and{{icon:7}} . These cards are great at enabling Superpower Abilities like “{{icon:7}} : You get +2 .”</a></li><li><a href="#rule-multiple-masterminds">Multiple Masterminds</a></li><li><a href="#rule-own">“Own”</a></li><li><a href="#rule-a-player-is-the-mastermind">“A Player is the Mastermind”</a></li><li><a href="#rule-printed-icon-1-or-icon-0-and-printed-cost">“Printed {{icon:1}} or {{icon:0}}” and “Printed Cost”</a></li><li><a href="#rule-rescue-kidnap-a-bystander">“Rescue/Kidnap a Bystander”</a></li><li><a href="#rule-revealing-a-card">Revealing a Card</a></li><li><a href="#rule-reveal-the-top-card-of-your-deck">Reveal the Top Card of Your Deck”</a></li><li><a href="#rule-running-out-of-cards-in-the-bystander-wound-s-h-i-e-l-d-officer-sidekick-madame-hydra-new-recruits-binding-stacks">Running out of Cards in the Bystander, Wound, S.H.I.E.L.D. Officer, Sidekick, Madame HYDRA, New Recruits, Binding Stacks</a></li><li><a href="#rule-schemes-that-count-escaped-villains">Schemes that Count “Escaped Villains”</a></li><li><a href="#rule-s-h-i-e-l-d-hydra">S.H.I.E.L.D. &amp; HYDRA</a></li><li><a href="#rule-s-h-i-e-l-d-heroes-sidekicks-hydra-allies-new-recruits">S.H.I.E.L.D. Heroes, Sidekicks, HYDRA Allies, &amp; New Recruits</a></li><li><a href="#rule-sidekicks-special-sidekicks-pet-avengers">Sidekicks &amp; Special Sidekicks: Pet Avengers</a></li><li><a href="#rule-solo-play">Solo Play</a></li><li><a href="#rule-solo-play-updated-what-if-rules">Solo Play (updated What If...? rules)</a></li><li><a href="#rule-solo-play-advanced-solo-mode">Solo Play (Advanced Solo Mode)</a></li><li><a href="#rule-special-abilities-on-cards">Special Abilities on Cards</a></li><li><a href="#rule-special-sidekicks">Special Sidekicks</a></li><li><a href="#rule-special-s-h-i-e-l-d-officers">Special S.H.I.E.L.D. Officers</a></li><li><a href="#rule-classes-icon-9-icon-6-icon-7-icon-3-icon-5-and-additional-abilities-that-make">Classes ({{icon:9}}, {{icon:6}},{{icon:7}} , {{icon:3}}, {{icon:5}}) and additional abilities that make</a></li><li><a href="#rule-thanos-and-the-infinity-stones">Thanos and the Infinity Stones</a></li><li><a href="#rule-token-cards">Token Cards</a></li><li><a href="#rule-transforming-masterminds">Transforming Masterminds</a></li><li><a href="#rule-traps">Traps</a></li><li><a href="#rule-veiled-and-unveiled-schemes">Veiled and Unveiled Schemes</a></li><li><a href="#rule-villain-adversary-gets-icon-0">“Villain/Adversary gets -{{icon:0}}”</a></li><li><a href="#rule-villains-ascending-to-become-additional-masterminds">Villains Ascending to Become Additional Masterminds</a></li><li><a href="#rule-villains-escaping-with-captured-heroes">Villains Escaping with Captured Heroes</a></li><li><a href="#rule-villains-you-gain-as-heroes">Villains You Gain as Heroes</a></li><li><a href="#rule-wounds">Wounds</a></li><li><a href="#rule-your-heroes-allies-heroes-allies-you-have">“Your Heroes/Allies” &amp; “Heroes/Allies You Have”</a></li><li><a href="#rule-tech-cards-and-a-icon-7-covert-card-in-your-hand-then-perfect">(tech) cards and a{{icon:7}} (covert) card in your hand, then Perfect</a></li><li><a href="#2099">2099</a></li><li><a href="#icon-31-but-now-a-cutting-edge-generation-of-heroes-rises">{{icon:31}} But now a cutting-edge generation of Heroes rises</a></li></ul>
</details>
<details class="rules-toc-group"><summary><a href="#expansion-flavor">Expansion Flavor texts</a> <span class="rules-toc-count">(43)</span></summary>
<ul><li><a href="#annihilation-icon-35-the-fantastic-four-return-just-in-time-to-save-the-galaxy">Annihilation {{icon:35}} The Fantastic Four return, just in time to save the galaxy</a></li><li><a href="#ant-man">Ant-Man</a></li><li><a href="#ant-man-and-the-wasp">Ant-Man and the Wasp</a></li><li><a href="#black-panther-icon-45">Black Panther {{icon:45}}</a></li><li><a href="#black-widow">Black Widow</a></li><li><a href="#captain-america-75th-anniversary">Captain America 75th Anniversary</a></li><li><a href="#champions">Champions</a></li><li><a href="#civil-war">Civil War</a></li><li><a href="#icon-34-the-new-warriors-were-at-the-center-of-the-superhero">{{icon:34}}The “New Warriors” were at the center of the Superhero</a></li><li><a href="#dark-city">Dark City</a></li><li><a href="#icon-13-powerful-new-x-men-increase-the-team-roster">{{icon:13}} Powerful new X-Men increase the team roster.</a></li><li><a href="#deadpool">Deadpool</a></li><li><a href="#dimensions">Dimensions</a></li><li><a href="#fantastic-four-icon-35-the-fantastic-four-and-their-former-foe-silver-surfer-must">Fantastic Four {{icon:35}} The Fantastic Four and their former foe Silver Surfer must</a></li><li><a href="#fear-itself-1">Fear Itself</a></li><li><a href="#icon-18-hydra-the-epic-marvel-storyline-of-fear-itself-starts-with">{{icon:18}} HYDRA: The epic Marvel storyline of Fear Itself starts with</a></li><li><a href="#icon-47">{{icon:47}}</a></li><li><a href="#guardians-of-the-galaxy">Guardians of the Galaxy</a></li><li><a href="#heroes-of-asgard-icon-44">Heroes of Asgard {{icon:44}}</a></li><li><a href="#into-the-cosmos">Into the Cosmos</a></li><li><a href="#marvel-noir">Marvel Noir</a></li><li><a href="#icon-31-spider-man-noir-is-haunted-by-the-death-of-his-uncle">{{icon:31}} Spider-Man Noir is haunted by the death of his Uncle</a></li><li><a href="#icon-13-in-a-world-where-warren-worthington-dies-young-thomas">{{icon:13}} In a world where Warren Worthington dies young, Thomas</a></li><li><a href="#marvel-studios-guardians-of-the-galaxy">Marvel Studios’ Guardians of the Galaxy</a></li><li><a href="#marvel-studios-the-infinity-saga">Marvel Studios’ The Infinity Saga</a></li><li><a href="#messiah-complex-icon-13-marvels-messiah-complex-is-the-story-of-the-only-mutant">Messiah Complex {{icon:13}} Marvel’s Messiah Complex is the story of the only mutant</a></li><li><a href="#midnight-sons">Midnight Sons</a></li><li><a href="#the-new-mutants-icon-13-the-new-mutants-emerged-as-a-brand-new-class-of">The New Mutants {{icon:13}} The New Mutants emerged as a brand new class of</a></li><li><a href="#paint-the-town-red">Paint the Town Red</a></li><li><a href="#icon-31-spider-friends-spider-man-and-his-allies-use-speed">{{icon:31}} Spider Friends: Spider-Man and his allies use speed,</a></li><li><a href="#realm-of-kings-icon-43-the-lnhumans-are-a-mysterious-powerful-race-living-in">Realm of Kings {{icon:43}} The lnhumans are a mysterious, powerful race living in</a></li><li><a href="#revelations">Revelations</a></li><li><a href="#s-h-i-e-l-d">S.H.I.E.L.D.</a></li><li><a href="#s-h-i-e-l-d-officers-also-have-hero-classes-icon-9-icon-6-icon-7-icon-3">S.H.I.E.L.D. Officers also have Hero Classes ({{icon:9}}, {{icon:6}},{{icon:7}} , {{icon:3}}</a></li><li><a href="#secret-wars-vol-1">Secret Wars Vol. 1</a></li><li><a href="#secret-wars-vol-2">Secret Wars Vol. 2</a></li><li><a href="#spider-man-homecoming">Spider-Man Homecoming</a></li><li><a href="#venom-icon-39-icon-37-venomverse">Venom {{icon:39}}{{icon:37}}Venomverse</a></li><li><a href="#villains">Villains</a></li><li><a href="#weapon-x">Weapon X</a></li><li><a href="#what-if">What If...?</a></li><li><a href="#world-war-hulk">World War Hulk</a></li><li><a href="#x-men">X-Men</a></li></ul>
</details>
<details class="rules-toc-group"><summary><a href="#card-lists">Card lists by Expansion</a> <span class="rules-toc-count">(39)</span></summary>
<ul><li><a href="#2099-1">2099</a></li><li><a href="#annihilation">Annihilation</a></li><li><a href="#ant-man-1">Ant-Man</a></li><li><a href="#ant-man-and-the-wasp-1">Ant-Man and the Wasp</a></li><li><a href="#black-panther">Black Panther</a></li><li><a href="#black-widow-1">Black Widow</a></li><li><a href="#captain-america-75th-anniversary-1">Captain America 75th Anniversary</a></li><li><a href="#champions-1">Champions</a></li><li><a href="#civil-war-1">Civil War</a></li><li><a href="#core">Core</a></li><li><a href="#dark-city-1">Dark City</a></li><li><a href="#deadpool-1">Deadpool</a></li><li><a href="#dimensions-1">Dimensions</a></li><li><a href="#fantastic-four">Fantastic Four</a></li><li><a href="#fear-itself-2">Fear Itself</a></li><li><a href="#guardians-of-the-galaxy-1">Guardians of the Galaxy</a></li><li><a href="#heroes-of-asgard">Heroes of Asgard</a></li><li><a href="#into-the-cosmos-1">Into the Cosmos</a></li><li><a href="#marvel-3d-trading-cards">Marvel 3D Trading Cards</a></li><li><a href="#marvel-noir-1">Marvel Noir</a></li><li><a href="#marvel-studios-phase-1">Marvel Studios, Phase 1</a></li><li><a href="#marvel-studios-guardians-of-the-galaxy-1">Marvel Studios’ Guardians of the Galaxy</a></li><li><a href="#marvel-studios-the-infinity-saga-1">Marvel Studios’ The Infinity Saga</a></li><li><a href="#messiah-complex">Messiah Complex</a></li><li><a href="#midnight-sons-1">Midnight Sons</a></li><li><a href="#the-new-mutants">The New Mutants</a></li><li><a href="#paint-the-town-red-1">Paint the Town Red</a></li><li><a href="#realm-of-kings">Realm of Kings</a></li><li><a href="#revelations-1">Revelations</a></li><li><a href="#s-h-i-e-l-d-1">S.H.I.E.L.D.</a></li><li><a href="#secret-wars-vol-1-1">Secret Wars, Vol. 1</a></li><li><a href="#secret-wars-vol-2-1">Secret Wars, Vol. 2</a></li><li><a href="#spider-man-homecoming-1">Spider-Man Homecoming</a></li><li><a href="#venom">Venom</a></li><li><a href="#villains-1">Villains</a></li><li><a href="#weapon-x-1">Weapon X</a></li><li><a href="#what-if-1">What If...?</a></li><li><a href="#world-war-hulk-1">World War Hulk</a></li><li><a href="#x-men-1">X-Men</a></li></ul>
</details>
<p class="rules-toc-section"><a href="#errata">Errata</a></p>
<details class="rules-toc-group"><summary><a href="#quick-setup-hero">Quick Setup Guide: Hero Board</a> <span class="rules-toc-count">(4)</span></summary>
<ul><li><a href="#initial-setup">Initial Setup</a></li><li><a href="#villain-deck">Villain Deck</a></li><li><a href="#hero-deck">Hero Deck</a></li><li><a href="#on-your-turn">On Your Turn</a></li></ul>
</details>
<details class="rules-toc-group"><summary><a href="#quick-setup-villain">Quick Setup Guide: Villain Board</a> <span class="rules-toc-count">(4)</span></summary>
<ul><li><a href="#initial-setup-1">Initial Setup</a></li><li><a href="#adversary-deck">Adversary Deck</a></li><li><a href="#ally-deck">Ally Deck</a></li><li><a href="#on-your-turn-1">On Your Turn</a></li></ul>
</details>
</nav>

## Overview {#overview}

Welcome to Legendary, the Marvel Deck-Building Game! Evil Masterminds like Magneto and Dr. Doom lead a horde of powerful Super Villains, planning dark Schemes to destroy the Marvel Universe! Only you can stop them, leading awesome Marvel Super Heroes like Spider-Man, Iron Man, and Wolverine!

Every time you play Legendary ®, the game itself fights back against you, with a different dark Mastermind pursuing a different evil Scheme. Only you can stop them by recruiting Heroes, fighting Villains, and eventually challenging the Mastermind themself. Each player (from 1-5 players) starts with their own deck of basic Hero cards. At the start of your turn, you play the top card of the Villain Deck, showing how Villains invade the city, capture Bystanders, and create special events. Then you play Hero cards from your hand to generate Attack, Recruit, and special abilities. You use Attack to fight Villains. You use Recruit to get stronger Heroes to improve your deck.

Whenever your deck runs out of cards and you need more, you shuffle your discard pile to make a new deck, including all the new Heroes you recruited. This way your deck gets stronger and stronger over time. Build up enough Attack and you can fight the evil Mastermind! But be careful: if the players don’t defeat that evil genius quickly enough, then the Mastermind will complete their dark Scheme, win the game for evil, and all players lose!

In Legendary Villains, you will lead Marvel Super Villains like Loki, Magneto and Dr. Octopus to smash Super Heroes and dominate the Marvel Universe! The only thing in your way is the game itself fighting back against you, with powerful Commanders like Nick Fury and Professor X leading terrifying adversaries like Hulk, Thor and Wolverine!

The Villains set uses the same fundamental rules as other Marvel Legendary sets, but with a sinister twist: The players are now evil Villains working to smash the forces of Good!

- This set is fully compatible with previous Marvel Legendary sets. The sets are designed so that you can mix and match Heroic sets and Villainous sets freely and there are cool combos between them. This Villainous set is also optimized to be played by itself as a standalone game.
- Instead of S.H.I.E.L.D. Officers, you can recruit Madame HYDRA and New Recruits, which work differently than S.H.I.E.L.D. Officers.
- Instead of wounds, the Villain set features Bindings, which work differently.

- A game may be played with the strictly “Heroes” setup, with the strictly “Villains” setup, or combining both and making full use of all basic card stacks in both sets.

Equivalent terms: When combining Heroes and Villains, the following game terms are considered completely equivalent. Any card effect that mentions one of these terms affects the equivalent term in the same way. For example, if an Adversary card does something to “your Allies”, it does the exact same thing to “your Heroes”, since “Allies” and “Heroes” are “equivalent terms.”

Heroes Villains Hero Ally Villain Adversary Henchman Villain Backup Adversary Mastermind Commander Mastermind Tactic Commander Tactic Master Strike Commander Strike Scheme Plot Scheme Twist Plot Twist Escape Overrun Villain captures a Bystander Adversary guards a Bystander Player rescues a Bystander Player kidnaps a Bystander “Evil Wins” “Good Wins”

When combining Heroes and Villains sets, choose either a S.H.I.E.L.D. or HYDRA starting deck for each player. All other game elements can be combined and randomized as indicated in the table above.

## Gameplay {#gameplay}

In this game for 1-5 players, each player starts with their own deck of basic Hero or Ally cards. At the start of your turn, play the top card of the Villain/Adversary Deck, representing Villains/ Heroic Adversaries invading/entering the city, capturing/guarding Bystanders, and creating special events. Then you play Hero/ Ally cards from your hand to generate Attack, Recruit Points, and special abilities. You attack with your Heroes/Allies to defeat Villains/Adversaries. You spend Recruit Points to recruit better Heroes/Allies, storing them in your discard pile.

Whenever your deck runs out of cards, you shuffle your discard pile to make a new deck, including all the new Heroes/Allies you recruited. This way your deck gets stronger and stronger over time. Build up enough Attack and you can defeat the Mastermind/ Commander! But be careful: if the players don’t defeat the Mastermind/Commander quickly enough, they will complete their Scheme/Plot and win the game for Evil/Good!

### How to Win {#how-to-win}

Players must work together to fight the evil Mastermind/ Commander four times. Each fight takes one of the Mastermind’s four face down “Tactic” cards. When the Mastermind has no more Tactics, the players have won the game! Fighting Villains/ Adversaries and rescuing/kidnapping Bystanders along the way earns each player additional Victory Points. If the Mastermind/ Commander is defeated, then all players win a group victory, and the player with the most Victory Points is the most Legendary Hero of all! º

### How to Lose {#how-to-lose}

Mastermind/Commander Wins Unlike other games, in Legendary, the game itself fights back against the players! The Mastermind/Commander isn’t played by a player. Instead, the game itself plays the part of the Mastermind/Commander.

The Mastermind/Commander works to accomplish a Scheme/ Plot throughout the game. Every Scheme card outlines an “Evil Wins” and every Plot card a “Good Wins” condition, which tells you how the Mastermind/Commander completes their Scheme/Plot. If it is completed, then the Mastermind/Commander wins the game and all the players lose!

Running out of Cards in the Hero/Ally Deck or Villain/ Adversary Deck If either of these decks runs out of cards before the Scheme/ Plot is completed, finish the turn, and then the players have successfully survived the Scheme, but they didn’t catch the Mastermind. As a result, the game is a draw between good and evil. The player with the most Victory Points wins an individual victory. Be sure to get the Mastermind next time!

Your First Game For your first game, follow the setup rules as follow, using the specific card stacks listed here instead of choosing card stacks at random. After your first game, every game of Legendary uses different Heroes/Allies, Villains/Adversaries, Masterminds/ Commanders, and Schemes/Plots, so there are always new challenges to master and new combinations to explore.

Your First Heroes Game - Cards to Use

Mastermind: Red Skull Scheme: Unleash the Power of the Cosmic Cube Heroes: Cyclops, Hawkeye, Iron Man, Spider-Man, Wolverine Villain Groups & Henchmen for the Villain Deck: For 2 players: HYDRA, Spider-Foes, Sentinels For 3 players: HYDRA, Skrulls, Spider-Foes, Sentinels For 4 players: HYDRA, Skrulls, Spider-Foes, Hand Ninjas, Sentinels For 5 players: HYDRA, Masters of Evil, Skrulls, Spider- Foes, Hand Ninjas, Sentinels

Your First Villains Game - Cards to Use

Commander: Dr. Strange Plot: Graduation at Xavier’s X-Academy Allies: For 1 player: Dr. Octopus, Kingpin, Mysterio For 2-4 players: Dr. Octopus, Green Goblin, Kingpin, Mysterio, Venom For 5 players: Dr. Octopus, Green Goblin, Kingpin, Mysterio, Mystique, Venom Adversary Groups & Backup Adversaries for the Adversary Deck: For 1 player: Marvel Knights, Cops (for solo play, use only three cards from the set) For 2 players: Defenders, Marvel Knights, Cops For 3 players: Defenders, Marvel Knights, Uncanny Avengers, Cops For 4 players: Defenders, Marvel Knights, Uncanny Avengers, Asgardian Warriors, Cops For 5 players: Defenders, Marvel Knights, Uncanny Avengers, X-Men First Class, Asgardian Warriors, Cops

Your First Marvel Studios, Phase 1 Game Cards to Use

Mastermind: Red Skull Scheme: Unleash the Power of the Cosmic Cube Heroes: Black Widow, Hawkeye, Hulk, Iron Man, Thor Villain Groups & Henchmen for the Villain Deck: For 2 players: Enemies of Asgard, HYDRA, Ten Ring Fanatics For 3 players: Enemies of Asgard, HYDRA, Iron Foes, Ten Ring Fanatics For 4 players: Enemies of Asgard, HYDRA, Iron Foes, HYDRA Foot Soldiers, Ten Ring Fanatics For 5 players: Enemies of Asgard, Gamma Hunters, HYDRA, Iron Foes, HYDRA Foot Soldiers, Ten Ring Fanatics

## General Game Setup {#general-game-setup}

### Player Starting Decks {#player-starting-decks}

Give each player their own personal 12-card deck, made of these cards:

Heroes:

- 8 S.H.I.E.L.D. Agents
- 4 S.H.I.E.L.D. Troopers

Your First What If...? Game - Cards To Use

Mastermind: Hank Pym Yellowjacket Villains: Scheme: Collect an Interstellar Zoo • 8 HYDRA Operatives Heroes: • 4 HYDRA Soldiers 1 player: Apocalyptic Black Widow, Gamora Destroyer of Thanos, Killmonger Spec Ops, 2-4 players: Also add Party Thor, Captain Carter 5 players: Also add Uatu the Watcher Villain Groups for the Villain Deck: 1 player: Intergalactic Party Animals, Giants of Jotunheim (2 Giants in Villain deck, and 2 start in city) 2 players: Also add Strange’s Demons (all 10 Giants of Jotunheim in Villain Deck, and none in the city) 3 players: Also add Black Order Guards 4 players: Also add Zombie Avengers and Ultron Sentries 5 players: Also add Rival Overlords

### Always Available Decks {#always-available-decks}

Put each of these decks on their spaces on the playmat. Use all the cards you own of each type:

- S.H.I.E.L.D. Officers
- Sidekicks
- Bystanders
- Wounds Special Bystanders are shuffled in with the other Bystanders. Decks of all identical cards can stay face up. Decks containing different cards should be shuffled face down.

### Your Opponent {#your-opponent}

Mastermind/Commander and Scheme/Plot Pick 1 Mastermind/Commander at random. Put the Mastermind/Commander card faceup on the Mastermind/ Commander space on the board. Take the 4 Mastermind/ Commander Tactics cards that match the Mastermind you selected. Put them underneath the Mastermind card, face down in random order.

Villains Decks:

- Bindings
- Madame HYDRA
- New Recruits

NOTE: If combining both Heroes and Villains, use all seven game decks listed above (Bindings, Bystanders, Madame HYDRA, New Recruits, S.H.I.E.L.D. Officers, Sidekicks, and Wounds).

Pick 1 Scheme/Plot card at random. Put it faceup on the Scheme/Plot space on the board. Each Scheme/Plot card has a “Setup” section that specifies how many “Twists” to use. Put that many “Scheme/Plot Twist” cards onto the Villain/Adversary Deck space. Some Schemes also change the number of Heroes/ Allies or Villain/Adversary Groups to use or specify other special rules.

### The Villain/Adversary Deck {#the-villain-adversary-deck}

Your opposing Mastermind/Commander has his own deck that will fight against the players. Create this deck by adding the following:

Scheme/Plot Twists A Scheme/Plot card’s “Setup” section always tells you how many “Scheme/Plot Twist” cards to put into the Villain/ Adversary Deck. Put that many Scheme/Plot Twist cards onto the Villain/Adversary Deck space to start the Villain Deck.

Strikes If fighting against a Mastermind, add 5 Master Strike cards to the Villain Deck. If fighting against a Commander, add 5 Command Strike cards to the Adversary Deck.

Modified setup from What If...? Players Villain Henchmen Bystanders Heroes Groups Groups 1* (2 cards 1 1 in deck, 2 1 3 cards in city) 2 2 1 2 5 3 3 1 8 5 4 4 2 8 5 5 5 2 16 6 *In 1-player solo games only: Add only two cards from the chosen Henchman Group to the Villain Deck. Two more cards from that same Henchman Group enter the city before your first turn. Do not use the remaining 6 cards.

Villain/Adversary Groups:

- Each Mastermind/Commander card says that the Mastermind/ Commander “Always Leads” a particular Villain/Adversary Group or Henchman Group/Backup Adversaries. Be sure to include that group as one of the groups you add to the Villain/ Adversary Deck.
- Pick the other Villain/Adversary Groups at random.
- For each Villain/Adversary Group you pick, add all 8 cards from that Villain/Adversary Group to the deck. These will normally all be Villains/Adversaries, although expansions add Traps and Locations to Villain Groups.

Now add Villain/Adversary Groups to the Villain/Adversary Deck. A Villain/Adversary Group is a group of eight Villain/Adversary cards that work together, like “HYDRA”, “Skrulls”, “X-Men First Class” or “Marvel Knights”. Each Villain/Adversary card lists its Villain/Adversary Group under its card name. The more players you have in the game, the more Villain Groups/Adversary you use, as shown in the following table: Number Villain/ Henchmen Groups/ Bystanders of Players Adversary Backup Adversaries Groups 1 1 1* (only 3 cards) 1 2 2 1 2 3 3 1 8 4 3 2 8 5 4 2 12 *(1-player solo play uses only 3 cards from a Henchmen Group/ Backup Adversaries instead of all 10 cards. Henchmen Groups/Backup Adversaries: Pick the listed number of Henchmen Groups/Backup Adversaries at random. Henchmen/Backup Adversaries are weaker Villains/ Adversaries usually made up of 10 identical cards (some expansions add variety). Add those cards to the Villain/Adversary Deck.

Bystanders: Check the previous table to see how many Bystander cards to add to the Villain/Adversary Deck based on the number of players. Add cards at random from the facedown Bystander Deck, so you might add any combination of regular Bystanders and Special Bystanders. Special Bystanders were introduced in the Dark City Expansion.

### The Hero/Ally Deck {#the-hero-ally-deck}

This deck will provide you the chance to recruit powerful heroes to help you defeat the Mastermind/Commander. Each Hero/Ally has a set of fourteen cards made up of two commons (5 copies of each), one uncommon (3 copies), and one single rare. Additionally, some Heroes/Allies have extra “transform” cards (introduced in World War Hulk) that are set aside in a transform stack. Create the Hero/Ally Deck in this way:

- Check the game setup table to see how many Heroes you should add. Pick that number of Heroes from all the Heroes you have. For each of those Heroes, add all 14 cards for that Hero to the Hero Deck.

### Completing Setup {#completing-setup}

- Shuffle the Hero/Ally Deck. Put it face down on the Hero/Ally Deck space. Put 5 cards from the Hero/Ally Deck face up into the 5 HQ/ Lair spaces.
- Shuffle The Villain/Adversary Deck. Put it face-down on the Villain/Adversary Deck space.
- Each player shuffles their own personal deck and draws a hand of 6 cards from it.

Starting HQ Mulligan (added in What If...?) If there are at least two cards in the starting HQ that cost 7 or more, then all players can agree to “mulligan” those HQ spaces like this: Set aside all cards that cost 7 or more from the HQ. Refill those HQ spaces, also setting aside any other Heroes that cost 7 or more that appear during any of these refills. Once the HQ is full, shuffle the set-aside Heroes back into the Hero Deck. Do this only during game setup – you can’t mulligan once the game has already started. This helps avoid overly expensive starting HQs.

## Playing the Game {#playing-the-game}

### A Player Turn: {#a-player-turn}

Choose a random player to go first. Players take turns in clockwise order. On your turn, do 3 things: 1. Play the top card of the Villain/Adversary Deck. 2. Play cards from your hand, using them to recruit and fight. 3. Discard your hand and draw 6 new cards.

### Step 1: Play the Top Card of the Villain/Adversary Deck {#step-1-play-the-top-card-of-the-villain-adversary-deck}

At the beginning of your turn, reveal the top card of the Villain/Adversary Deck and play that card. What you do with that card depends on what kind of card it is. There are four kinds of cards in the Villain/Adversary Deck: Villains/Adversaries, Bystanders, Scheme/Plot Twists, and Master/Command Strikes.

4-5 Players: Warmup Round (added in What If...?) Note: In 4 and 5 player games only, there is a “Warmup Round” where on each player’s first turn, they do not play a card from the Villain Deck. On every turn after that, play the top card of the Villain Deck as normal. This gives larger player groups more time to get their decks going before the Villains start invading.

### If the Card Is a Villain/Adversary: {#if-the-card-is-a-villain-adversary}

That Villain/Adversary invades the city! Here are the different parts of a Villain/Adversary card:

Villain/Adversary Enters the City Move the new Villain/Adversary into the city space closest to the Villain/Adversary Deck. That city space is labeled “Sewers”. (Villains/ Adversaries in the city are always faceup.) NOTE: If playing on the Villains board, city spaces are reversed, so that Adversaries enter the space labeled “Bridge.”

Push Other Villains/Adversaries Forward if Necessary Each of the 5 city spaces can only hold one Villain/Adversary. Whenever a Villain/Adversary enters a city space, if there’s already another Villain/Adversary there, that existing Villain/Adversary gets pushed one space toward the Escaped Villains/Overrun pile to make room. So, a single Villain/Adversary entering the city sometimes causes a chain reaction of several Villains/Adversaries getting pushed forward.

- Remember: Only push a Villain/Adversary forward if it needs to move to make room for another Villain/Adversary entering that space.

A Villain/Adversary Might Escape/Overrun On the Heroes game board, if a Villain gets pushed off the final, fifth city space, the Villain “escapes” the city and goes into the Escaped Villains pile on the game board, faceup. On the Villains game board, if an Adversary gets pushed off the final, fifth city space, the Adversary “overruns” the city and goes into the Overrun pile on the game board, faceup. Here’s what happens when a Villain/ Adversary escapes/overruns, in this order: 1. The escaping/overrunning Villain/Adversary KO’s a Hero/Ally that costs 6 or less from the HQ/Lair. (KO stands for “knocked out.”) The player whose turn it is chooses which of those Heroes/Allies gets KO’d. Put that Hero/Ally into the KO pile, faceup. Immediately flip a new Hero/Ally from the Hero/Ally Deck, faceup, to fill the empty space in the HQ/Lair. 2. If the escaping/overrunning Villain/Adversary had any captured/guarded Bystanders, then each player must discard a card from their hand as a penalty for failing to rescue the Bystanders. After all, what kinds of Super Heroes let innocent Bystanders get carried away by Villains? Or, what kinds of Super Villains let innocent Bystanders get rescued and carried away by Adversaries? Each player only discards one card, no matter how many Bystanders were carried away/rescued. Put the captured/rescued Bystanders in the Escaped Villains/Overrun pile. 3. If the escaping Villain/Adversary has an “Escape” effect on its card, do what it says.

The New Villain/Adversary Might Have an Ambush Effect If the new Villain/Adversary has an “Ambush” effect on its card, do what it says. Remember: if a Villain/Adversary escaped/overran when this new Villain/Adversary appeared, handle all the Escape effects for the escaping Villain/Adversary before handling any Ambush effect for the new Villain/Adversary.

### If the Card is a Location: {#if-the-card-is-a-location}

Villain Groups may contain Locations.

- When a Location is played from the Villain Deck, place it above the nearest city space that does not have a Location. Leave enough room that Villains can move through the city as normal.
- Once placed, Locations don’t move. Villains don’t push Locations forward. You can have a Villain in a city space that has a Location above it.
- Most Locations specify special abilities that happen when you fight Villains in that space. Some Locations become stronger when there’s a Villain in that space. Some Villains and Masterminds say they become stronger based on Locations.
- You can fight a Location by spending the listed amount of <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , putting it into your Victory Pile, and doing any Fight ability the Location may have.
- If a new Location is played, and every city space already has a Location, then KO the Location with the lowest <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> to make room. (If tied, the current player chooses.) This might KO the newly played Location or one of the previous Locations.
- In 1-player solo mode, when a Location tells “each other player” to do something, do it yourself.

### If the Card is a Trap: {#if-the-card-is-a-trap}

Villain Groups may include Trap cards.

- When a Trap is played from the Villain Deck, it gives you a challenge to complete this turn to avoid the Trap. If you complete the challenge, put the Trap in your Victory Pile and get its VP.
- If you fail to complete the challenge, then at the end of the turn you must suffer the listed consequences! (after you draw your new hand).
- Traps don’t push forward Villains in the city.

### If the Card Is a Bystander: {#if-the-card-is-a-bystander}

This innocent Bystander is captured by a Villain/guarded by an Adversary! Put the Bystander under the Villain/Adversary in the city that’s closest to the Villain/Adversary Deck. If there are no Villains/Adversaries in the city, then the Bystander is captured/guarded by the Mastermind/Commander. Make sure the Bystander pokes out a bit, so players can see it.

- Whenever a Villain/Adversary with one or more Bystanders moves to a new city space, those Bystanders all go with that Villain/Adversary.
- It’s up to the players to rescue/kidnap that Bystander! When a Villain/Adversary or Mastermind/Commander with a Bystander is defeated by a player, that player rescues/kidnaps that Bystander and puts it into that player’s personal Victory Pile. Each Bystander is worth 1 Victory Point, so the more Bystanders you rescue/kidnap, the more Victory Points you earn.

### If the Card Is a Twist: {#if-the-card-is-a-twist}

A Scheme/Plot Twist card represents the Scheme/Plot moving forward towards victory for the Mastermind/Commander. Every Scheme/Plot works in a different way, with its Scheme/Plot Twists doing a specific thing related to that Scheme/Plot. When a Scheme/Plot Twist card is played, look at the “Twist” effect on the main Scheme/Plot card and do what it says. Put the Scheme/ Plot Twist in the KO pile unless it tells you to put it somewhere else. Some Schemes/Plots say they do something special when “Twists 1-6” or “Twists 7-8” come up.

### If the Card Is a Strike: {#if-the-card-is-a-strike}

A Master/Command Strike card represents the Mastermind/ Commander coming down to get their hands dirty and smash the Heroes/Allies themselves. Each Mastermind/Commander card has its own specific Master/Command Strike effect. When a Master/ Command Strike card is played, look at the “Master/Command Strike” effect on the Mastermind/Commander card and do what it says. Put the Master/Command Strike in the KO pile.

IMPORTANT NOTE: Villains/Adversaries in the city don’t get pushed forward when the Villain/Adversary Deck card is a Bystander, Scheme/Plot Twist, or Master/Command Strike.

### Step 2: Play Cards from Your Hand, Using Them to Recruit and Fight {#step-2-play-cards-from-your-hand-using-them-to-recruit-and-fight}

The only types of cards that can be in your hand are Heroes/Allies and Wounds. Here are the different parts of a Hero/Ally card:

### Totaling up Recruit and Attack values {#totaling-up-recruit-and-attack-values}

After you play the top card of the Villain/Adversary Deck, you play the cards from your hand. Some of your cards produce “Recruit Points” that let you recruit more Heroes/Allies. Other cards produce “Attack” that let you defeat Villains/Adversaries and/or Masterminds/Commanders. Some cards give you special abilities, like drawing more cards. Here’s what you do:

- Play each card in your hand in any order, one at a time. Each time you play a card, do what that card says. You also get any Recruit Points listed in the Recruit icon on the card. You also get any Attack listed in the Attack icon on the card. NOTE: An asterisk symbol \* Changing or a special condition needed to fight that Villain.

- Some cards have a number like “2+” inside their Recruit icon. The “2” means that you always get at least 2 Recruit Points from that card. The “+” symbol means that you might get even more Recruit Points based on what the card says in its special ability.
- Keep the cards you play in front of you until the end of your turn.
- The Deadpool expansion introduces ½ and ½ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> values. <img src="/img/icons/rules-extracted/icon-29.svg" alt="game symbol" class="rules-icon"> When you play these, just add ‘em up as normal. Play a 2½ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Attack and a 3½ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Attack Hero, and you’re ready to cuddle up to some Villain with 6 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Attack.

on a card’s Cost or Attack is a signal that there’s something unusual about that value, like Size-

### Activating Superpower Abilities {#activating-superpower-abilities}

Some cards have a Superpower ability with a hero class icon and a colon, like: <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> : You get +1 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> 

- You can use that special Superpower ability only if you have already played another card of that Hero/ Ally class earlier in your turn.
- A card’s hero class is shown with the class icon in the card’s upper left, and also in the color of the card’s border.
- Some Superpowers use a team icon like Avengers <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> or X-Men

### <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> instead of a hero class icon. These work the same way as {#icon-4-instead-of-a-hero-class-icon-these-work-the-same-way-as}

Superpowers that use hero class icons. A card’s team icon is in the card’s upper-left-hand corner.

- IMPORTANT: You can only use a card’s Superpower once, even if you played two or more cards of the required class earlier in the turn.
- However, a few Superpower abilities will explicitly tell you to count a number of cards played earlier in the turn, by saying something like “ <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> : You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each other <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> Hero/Ally you played this turn.”
- You must use the Superpower ability if you can (unless the ability says “You may...”).
- The more Heroes of the same class you recruit, the more often you will be able to use your Superpower Ability! A deck focusing on one or two classes can be very powerful.

### “Critical Hit” Superpower Abilities {#critical-hit-superpower-abilities}

Some Superpower abilities show two icons instead of one, like: <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> : You get +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> 

- You can only use this Superpower ability if you have played cards with both of those icons earlier in your turn.
- For example, you can only use the Superpower ability on Hidden Weapons if you have played both another <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card and an <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> card earlier in the turn.
- Playing Hidden Weapons by itself isn’t enough to satisfy its own <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> requirement. You must have already played another <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card earlier in the turn. That card could be another copy of Hidden Weapons or could be a different <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card.

Example of Activating Superpower Abilities

- Thor’s “Odinson” card, shown here, always gives you 2 Recruit Stars when you play it, even if you don’t <img src="/img/icons/rules-extracted/icon-29.svg" alt="game symbol" class="rules-icon"> have any other <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> (“Strength Class”) cards.
- But if you have already played another <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> (“Strength Class”) card earlier in the turn, then you can use Odinson’s Superpower ability to get an additional 2 Stars <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> , so that Odinson gives you 4 Stars <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> in total.
- The card you played earlier in the turn could be a Captain America card, another Thor card, or even another copy of Odinson.
- If you play two Odinson cards as your first two cards of the turn, you won’t get to use the Superpower ability for the first Odinson card you play this turn, but you will get to use the Superpower for the second Odinson card you play this turn. So you would get 6 Stars <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> total.

### Recruiting Heroes/Allies and Fighting Villains/Adversaries {#recruiting-heroes-allies-and-fighting-villains-adversaries}

In between playing cards from your hand, and/or after you’ve played all your cards, you can fight any number of Villains and recruit any number of Heroes. You can play cards, fight, and recruit any number of times in any order in the same turn.

How to Recruit a Hero/Ally: You use Recruit Points to gain a Hero from the HQ/Lair, one at a time. The “HQ” (Heroes) or “Lair” (Villains) area of the game board has five spaces. Those five spaces always contain exactly five Heroes/Allies, all faceup. You can also recruit “S.H.I.E.L.D. Officer” Heroes from the S.H.I.E.L.D. Officer stack on the game board, Sidekicks (no more than once per turn, using Recruit points) from the Sidekick stack, Madame HYDRA’s from the Madame HYDRA stack, and New Recruits from the New Recruit Stack. To recruit a Hero/Ally:

- Spend Recruit Points equal to that Hero/Ally’s cost and put that Hero into your discard pile. A Hero/ Ally’s cost is in its lower-righthand corner. This lowers your available recruit points for this turn by that amount. When your deck runs out and you shuffle your discard pile to make a new deck, you will soon draw that new Hero/Ally and be able to use their abilities.
- Then refill the empty space in the HQ/Lair with a new card from the Hero/Ally Deck, faceup. Whenever there is an empty space in the HQ/Lair for any reason, you refill that space immediately with the top card of the Hero/Ally Deck, faceup. You can even recruit a Hero/Ally, see what new Hero/ Ally appears in its place from the Hero Deck, and then recruit that new Hero/Ally too, if you have enough Recruit Points remaining.

How to fight a Villain/Adversary: As you play Heroes from your hand, you generate a pool of Attack Points. You can spend these to fight Villains/Adversaries in the city, one at a time. You can only fight a Villain/Adversary if you have at least as many Attack Points remaining as that Villain/ Adversary’s Attack number. You don’t have to match up specific Heroes/Allies you play against specific Villains/Adversaries. It doesn’t matter which city space holds the Villain. To fight: 1. Spend Attack Points equal to that Villain’s Attack to put that Villain into your personal Victory Pile. (Also rescue any Bystanders underneath, placing them into your Victory Pile.) 2. If the Villain card has a “Fight” effect on it, do what it says. Also do any “When you rescue this” effects on any Bystanders you rescued this way. (Do these Fight and Rescue effects in any order.)

KO Many card effects tell you to “KO” a card, meaning “knock out.” Put that card into the shared, face up “KO Pile” off to the side of the playmat. These cards are permanently knocked out of the game.

- Getting your starting S.H.I.E.L.D. Heroes KO’d is actually often helpful, since it means you will draw your more powerful Heroes more often, instead of drawing the weaker S.H.I.E.L.D. Heroes.
- Note: If a card says to KO “one of your Heroes,” that can be a Hero you’ve already played this turn or a Hero still in your hand. If you KO a Hero you already played this turn, you still get to use the Recruit, Attack, and special abilities that Hero produced.

Your Victory Pile

- Each player has their own personal Victory Pile. Your faceup Victory Pile holds all the Villains you defeat and all the Bystanders you rescue.
- Villains and Bystanders are never shuffled into your deck.
- Many players keep their Victory Pile horizontal so they don’t mix it up with their faceup discard pile.
- At the end of the game, Villains and Bystanders in your Victory Pile are worth the Victory Points shown on their cards.

### Masterminds/Commanders {#masterminds-commanders}

A Mastermind/Commander is a powerful genius that pursues a Scheme/Plot and tells all of the other Villains/Adversaries what to do. A player can choose to fight the Mastermind/Commander instead of or in addition to fighting a Villain. Like any other fight, you have to expend Attack equal to the Mastermind/ Commander’s Attack to fight that Mastermind/Commander.

Mastermind/Commander Tactics Masterminds/Commanders use different abilities during fights, represented by “Mastermind/Commander Tactic” cards. All four “Mastermind/Commander Tactic” cards have the same Attack number, but they each have different “Fight” effects on them. When you fight a Mastermind/Commander: 1. Spend Attack Points equal to the Mastermind’s Attack. Take a random card from the face downTactics underneath the Mastermind and put that Tactic into your Victory Pile. It’s worth several Victory Points. (Also rescue any Bystanders the Mastermind was holding, putting them all into your Victory Pile.) 2. Do what the “Fight” effect on the Tactic card says. Also do any “When you rescue this” effects on any Bystanders you rescued this way. (Do these Fight and Rescue effects in any order.)

- These effects may give you a reward, cause the Mastermind to hit each other player with an unwelcome effect, or power up the Mastermind for the future.
- If a Tactic’s Fight effect somehow increases the Mastermind’s Attack number, that will only apply for future fights. A Mastermind/Commander is not truly defeated until all four of their Mastermind/Commander Tactics cards have been defeated by the players. If you create an amazing combo that gives you tons of Power, you can even fight the Mastermind/Commander multiple times in one turn.

Mastermind Card

Mastermind Tactic Card

### Step 3: Discard Your Hand and Draw 6 New Cards {#step-3-discard-your-hand-and-draw-6-new-cards}

- At the end of your turn, put all the cards you played this turn into your discard pile.
- Also discard any cards in your hand that you didn’t play this turn. (You don’t have to play all the cards from your hand if you don’t want to.)

- Then draw six new cards from your deck. If you don’t have enough cards left in your deck to draw six, then shuffle your entire discard pile into a new face down deck, as described below.

Shuffling Your Discard Pile into a New Deck Whenever you don’t have any cards left in your deck, and you still need to draw more cards, shuffle your discard pile to form a new face down deck. Then draw the rest of the cards you need.

- For example, if your deck has two cards left and you need to draw six, then you draw those two cards from your deck, then shuffle your discard pile to form a new deck, then draw your next 4 cards from the newly shuffled deck.
- If your deck exactly runs out, and you don’t yet have to draw more cards, don’t shuffle your discard pile to form a new deck yet. You only shuffle your discard pile to form a new deck when you need to draw a card from your deck and you cannot.
- In the unusual case that your deck runs out, you have to draw more cards, but you have no more cards left in your discard pile to shuffle into a new deck, then you just can’t draw any more cards this turn.
- Sometimes a card effect tells you to reveal the top card of your deck or do something else with the top card of your deck, and you don’t have any cards left in your deck. If that happens, shuffle your discard pile into a new deck, then do the “reveal the top card” effect or other effect.

### End of the Game: Players Win: {#end-of-the-game-players-win}

When the Mastermind has no more Tactic cards under them, the players win the game!

- When fighting the final Mastermind Tactic, the current player still does that Tactic’s “Fight” ability. That player may finish the rest of their turn in case they want to fight a few more Villains.
- As soon as the Mastermind has no more Tactics under them, victory is assured, and players will win the game even if the final Tactic’s “Fight” ability would achieve the Scheme’s “Evil Wins” condition or cause the Hero Deck or Villain Deck to run out.

### Evil Wins: {#evil-wins}

Every Scheme card has a part that says “Evil Wins,” which tells you how the Mastermind completes their Scheme. If the evil Scheme is completed, then the Mastermind immediately wins the game for evil, and all players lose. Don’t finish the turn.

### Tied Game: {#tied-game}

If either the Hero Deck or the Villain Deck ever reaches zero cards, you can finish the current turn as a final chance to win. If you have not won or lost by the end of this turn, then the game ends in a tie between good and evil. The players have successfully survived the Scheme, but they didn’t defeat the Mastermind. The player with the most Victory Points wins an individual victory. Be sure to get the Mastermind next time!

- Once the Hero Deck or Villain Deck has reached zero cards, then the game will end at the end of this turn, even if some card effect somehow puts cards back into the empty Hero Deck or Villain Deck.
- Note: If the Scheme says that evil wins “when the Hero Deck runs out” (or Villain Deck), then the game is over as soon as that deck reaches zero cards. You do not finish the turn in that case – evil has already won.

## Keyword Abilities {#keyword-abilities}

Many cards in Marvel Legendary word or short phrase. The following is a comprehensive alphabetized list of all Keyword Abilities to date.

<span id="keyword-double-abomination"></span>
<span id="keyword-highest-abomination"></span>
### Abomination {#keyword-abomination}

This keyword means “This Villain/Adversary gets + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to the printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> of the Hero/Ally in the HQ/Lair space under this Villain/Adversary’s city space.”

- Likewise, “Ultimate Abomination” means “This Mastermind gets + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to the total printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> of all the Heroes/Allies in the HQ/Lair.”
- An Abomination Villain’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> can go up and down as the Villain moves through the city.
- You can recruit a Hero under an Abomination to try to reduce its <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> ... but you might also increase it!
- The Hero Gorgon has abilities like “Sewers Abomination.” It gives <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to the printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> of the Hero in the HQ space under the Sewers.
- The highly-evolved Mastermind Maximus and Gorgon also use “Highest Abomination.” This gives <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to the highest printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> of any single card in the HQ. So if the five Heroes in the HQ have printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> of 2, 4, 3+, 0+, and no printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , then Highest Abomination would give 4 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- “Double Abomination” doubles the <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonus. Some “Divided Cards” from sets like Legendary®: Civil War have two printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> numbers, one on each side. If you need to know rhat card’s “printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> ,” and the cardis not currently being played, add both those <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> numbers together. This applies to Abomination and Berserk (from Legendary®: X-Men).

### Ambush {#keyword-ambush}

Some Heroes say things like “ <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> Ambush: Draw a card.” This is similar to how a Villain does its Ambush ability when it enters the city.

- When a Hero with a “ <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> Ambush” ability enters the HQ during your turn, you may use that Ambush ability if you have a <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> Hero.
- As always, you “have a <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> Hero” if you have played a <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> Hero this turn or if you have a <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> Hero in your hand (or if you control a <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> Hero Artifact).
- New Heroes usually enter the HQ when you recruit a Hero or a Villain escapes from the city, creating an empty space in the HQ that you refill.
- In games with Hero Ambushe abilities, you may want to recruit before you fight, in case a new Hero entering the HQ gives you extra <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> or cards that you can use to fight stronger enemies.

### Antics {#keyword-antics}

- Some cards say things like “Antics: You get +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .”

use special Keyword Abilities that represent a sometimes complex game mechanic with one simple

- You can use a card’s Antics abilities only if you have at least three cards that cost 1 or 2 and/or have Size- Changing.
- The Antics card itself can count towards those three cards if it costs 1 or 2 and/or has Size-Changing.
- “Cards you have” includes both cards you played this turn and cards still in your hand, so both of those can help you use
- Use the Antics ability at the moment you play the Antics card. If you don’t use it then, you can’t go back and use it later in the turn.

### Artifacts {#keyword-artifacts}

Some Hero cards iare also powerful “Artifact” cards. (They still count as Hero cards too.) When you gain a Hero Artifact, put it in your discard pile like any other Hero card. When you draw that Artifact later in the game, you may play it in front of you and use its effects. This means you “control” that Artifact. At end of turn, when you discard all the cards you played that turn, the Artifacts you control stay in front of you.

- You can use an Artifact on the first turn you play it.
- You can control multiple Artifacts with the same card name and use each of them.
- If a card effect during any player’s turn asks you to “Reveal a <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> Hero,” you may reveal a <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> Hero Artifact you control. Card effects that say “your Heroes” or “Heroes you have” include Hero Artifacts you control.
- However, you only “played” an Artifact on the turn you put it out, so it only activates Superpower Abilities (like “ <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> : You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> ”) on the turn you play the Artifact, not every turn of the game. Likewise, card effects that count “each Hero you played this turn” only count an Artifact if you played it this turn.
- Some Hero cards are also Artifacts. (They still count as Hero cards too.) When you gain a Hero Artifact, put it in your discard pile like any other Hero card.
- You can only use Artifacts during your turn unless otherwise specified.
- You don’t have to use an Artifact’s abilities on a turn if you don’t want to.
- If you are using the Final Showdown, you can use Artifacts during your Showdown Turn.
- If a card effect like Rogue or Chameleon would let you “copy” an Artifact card, then you can use that Artifact’s “Once per turn” ability once, and there is no other effect.

<span id="keyword-ritual-artifact"></span>
### Ritual Artifacts {#keyword-ritual-artifacts}

These use the Artifact rules above, with some new twists.

- They say things like “Ritual Artifact — If you drew a card, you may discard this Artifact to get +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- If you have fulfilled the listed Ritual condition this turn, you can discard the Ritual Artifact to get the listed effect.
- You don’t have to use the Ritual Artifact even if you fulfill the Ritual condition. You might want to save it for a future turn instead of discarding it.
- You can use as many Ritual Artifacts as you wish in a turn, including using multiple Ritual Artifacts with the same name. If you draw one card, that’s enough to use the Rituals of multiple Artifacts that each have the condition “Draw a card.”
- If you use a “draw a card” ability, and it draws you a Ritual Artifact with the condition “draw a card,” then you can play that Artifact and use it right away. It’s ok that the Artifact wasn’t in play when you fulfilled the Ritual condition earlier in the turn.
- If a card lets you “copy” a Ritual Artifact card or “play a copy of it,” then you can use its Ritual effect (or “Thrown Artifact” or “Once per turn” Artifact ability) once, and you don’t need to fulfill the ritual condition. You don’t need to immediately discard the copy card to use the Ritual. The copy doesn’t stay in play as an Artifact.

### Thrown Artifacts {#keyword-thrown-artifacts}

These use the Artifact rules above, with some new twists. These are Artifact cards that a player can “throw” at the perfect moment.

- To “Throw” a Thrown Artifact, put it on the bottom of your deck and use its ability.
- You can throw it on the same turn that you play the Thrown Artifact, or you can wait until a later turn.
- If you use this when your deck has not many cards left, you might draw the Thrown Artifact again quite soon. (Much like Thor’s hammer, a Thrown Artifact can return to your hand very quickly!)
- You can control multiple Artifacts with the same card name.
- You can throw as many Artifacts as you want in a turn, including multiple Artifacts with the same card name.
- You can only throw during your turnturn (unless it specifically says otherwise).
- If a card effect like Rogue, Hulkling, or Scarlet Witch would let you “copy” an Artifact card, you can use that Artifact’s “Once per turn” or “When you throw this” ability once, and there is no other effect. (Don’t put anything on the bottom of your deck.)

<span id="keyword-triggered-artifact"></span>
### Triggered Artifacts {#keyword-triggered-artifacts}

- Some cards say things like “Triggered Artifact —Whenever you draw a card during your turn, you get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .” While you control this Artifact, every time you do that trigger, you get the listed effect.
- If a card lets you “copy” a Triggered Artifact card or “play a copy of it,” then you can use that Triggered Artifact ability (or “Thrown Artifact,” “Once per turn” Artifact or “Ritual Artifact” ability) once, and you don’t need to fulfill the trigger. The copy doesn’t stay in play as an Artifact. The ‘Legendary Outlaw’ card from the 2014 Guardians set cannot copy any Artifacts in this set.

<span id="rule-villainous-weapons"></span>
### Villainous Weapons {#keyword-villainous-weapons}

- Villainous Weapons are not Villains.
- When a Villainous Weapon is played from the Villain Deck, the Weapon is captured by the Villain in the city that’s closest to the Villain Deck. If there are no Villains in the city, then KO the Weapon instead.
- Villainous Weapons empower the Villain holding them, adding the <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonus printed on the Weapon. Tuck the Weapon under the Villain so you can see the Weapon’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonus right under the Villain’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- An enemy can use any number of Weapons at the same time, getting all of their bonuses combined.
- When a Villain with Villainous Weapons escapes the city, the Mastermind captures all those Weapons, getting their <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonuses.
- When you fight a Villain or Mastermind holding any number of Weapons, put all those Weapons into your discard pile as Artifacts.
- When you have a Villainous Weapon Artifact in your hand, you can play it just like any other Artifact.
- You never get the Weapon’s printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonus when you play the Artifact or control it. Only Villains and Masterminds get that <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonus. You only get the specific Artifact abilities written on the card.
- Villainous Weapons you have captured as Artifacts have 0 cost, have no color or Hero Class, and don’t count as Hero cards or Villain cards.
- Ronan has Tactics that turn into Villainous Weapons. You win when the Mastermind has no face down Tactics left under them, even if there are still some Tactics that have turned into other card types.
- If you have gained a Villainous Weapon, and a card effect makes an enemy capture that Weapon again, then it works as a Villainous Weapon again until someone defeats that enemy to reclaim it.

### Astral Plane {#keyword-astral-plane}

- Some Villains say things like “Fight: If this Villain was in the city, it enters the Astral Plane.”
- The Astral Plane is a single, unique space that only exists in games with cards that use the Astral Plane. It sits immediately to the right of the Villain Deck.
- While a Villain is in the Astral Plane, it has no physical form: It can only be fought with <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> , not <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . To fight a 5 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Villain you must spend 5 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> . When you fight a Villain in the Astral Plane, put it in your Victory Pile and do its Fight effect as normal.
- When a Villain enters the Astral Plane, any Villain already there escapes. This causes all the same effects as if that Villain had escaped the city (including KO’ing from the HQ, discarding from captured Bystanders, and Escape abilities).
- Villains still get - <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> and + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonuses while in the Astral Plane. You just use <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> to fight the total <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- The Mastermind “Nightmare” can also enter the Astral Plane. While there, he can only be fought with <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> , not <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . If he escapes the Astral Plane, do all the normal effects for a Villain escaping the city. Then do the Escape ability written on Nightmare, which moves him to the Mastermind space.
- The Astral Plane is not a city space. It’s not “adjacent” to any city spaces. Card effects can’t move or swap Villains to or from the Astral Plane unless they explicitly mention the Astral Plane.
- Villains do Ambush effects when they enter the city. The Astral Plane is not part of the city, so Villains that enter the Astral Plane don’t do their Ambush effects at that time.
- For keywords from other sets: To fight a “Chivalrous Duel” enemy in the Astral Plane, you must spend <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> from a single Hero name. You must spend <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> to use Excessive Violence or Human Shields from the Astral Plane. You can’t use “Piercing Energy” on enemies in the Astral Plane. “Bribe” and other cards that say “You can spend any combination of <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> and <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> to fight that villain this turn” do not work against enemies in the Astral Plane.

### Berserk {#keyword-berserk}

- “Berserk” on a hero means “Discard the top card of your deck. You get + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to the discarded card’s printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .”
- Some cards have Berserk multiple times, like “Berserk, Berserk, Berserk.” In this case, just do the Berserk effect multiple times, once at a time. So you discard three cards in a row, getting each of their printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- Building a deck with high printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> can increase the chance that your Berserk cards will be explosively powerful. You can

also use special abilities to set up the top cards of your deck to have a higher <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> value before you play a card with Berserk.

- When you try to fight an Enemy that has Berserk, discard the top card of your deck. That enemy gets + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to the discarded card’s printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- If you have at least as many <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> points as the Enemy’s improved <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , spend that many <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> and defeat the Enemy as normal.
- If you don’t have enough <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> points, then you don’t defeat this Enemy, you lose all your <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> points, and you can’t fight anymore this turn. You can still play cards and recruit. Don’t use that Enemy’s “Fight” effect, (Also don’t use any “When you fight” or “When you defeat” effects. You can’t use the “if you don’t fight...” Healing ability on normal Wounds.)
- If an Enemy says Berserk multiple times, do the Berserk effect that many times, giving all of that <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- Once you start to fight an Enemy, you can’t play any more cards until after that fight is complete. Remember to generate all the <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> you can before you fight them!
- Look for ways to set up the top cards of your deck to have low or no <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> before you fight a Berserk Enemy.

### Fail {#keyword-fail}

Some Berserk Enemies say “Fail: You gain a Wound.”

- Do the “Fail” effect if you try to fight that Enemy but the Berserk <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonus causes you to fail.
- You can’t try to fight an Enemy unless you have enough points to match its printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .

### Blood Frenzy {#keyword-blood-frenzy}

- Blood Frenzy on a Hero card means “You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each different VP value you have among cards in your Victory Pile.”
- Likewise on a Villain card, during your turn Blood Frenzy means “This Villain gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each different VP value you have among cards in your Victory Pile.” 4
- (VP means “Victory Points,” shown as .)
- It only matters how many different VP values you have among cards in your Victory Pile. It doesn’t matter how many you have of any single value. So if your Victory Pile has cards worth 0, 1, 1, 1, 2, 2, and 5 VP, then Blood Frenzy would give +4 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- This includes Bystanders in your Victory Pile. Horrifically, even heroic Vampires and Werewolves cannot always resist draining blood from innocents!
- Use whatever VP a card is worth, not just its printed VP. If a Master Strike becomes “a Villain worth 4VP,” then it counts as 4VP for Blood Frenzy. An “Undercover” Agent worth 1VP counts as 1VP too.

- If a card gets into your Victory Pile somehow with no printed or specified VP value, it counts as “0 VP,” which is a number that can help your Blood Frenzy.

### Bribe {#keyword-bribe}

You can fight villains with the keyword “Bribe” by spending any combination of Attack and/or Recruit points. For example, you may play two S.H.I.E.L.D. Agents and two S.H.I.E.L.D. Troopers to fight the +4 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Maggia Goons.

### Burrow {#keyword-burrow}

“Burrow” means: “Fight: If the Streets were empty, put this Villain back into the Streets.” When you fight a Villain with Burrow, do all of that Villain’s Fight effects. You rescue any Bystanders the Villain may have captured as normal. Then, if the “Streets” city space was empty, put that Villain back into the Streets space. This means that to stop a Villain with Burrow permanently, you have to:

- Fight it while it’s in the Streets, or
- Fight it while another Villain occupies the Streets, or
- Fight it once to drive it back to the Streets then fight it again in the Streets to finish it. If you fight a Villain with Burrow twice in a turn, you’ll do that Villain’s “Fight” effects twice. Cards that do something “when you defeat” a Villain still work if the Villain burrows to the Streets. When a Villain burrows to the Streets, it does not do any Ambush effects.

### Celestial Boons {#keyword-celestial-boons}

The Celestials are millions of years old and immeasurably powerful. They cannot be truly defeated by mere mortals. However, if you manage to fight a Celestial, it is impressed with your efforts and grants you a Celestial Boon. This is a permanent bonus that helps you for the rest of the game, as long as the Celestial is in your Victory Pile. You can use multiple Celestial Boons, even multiple copies of the same one.

### Charge {#keyword-charge}

“Ambush: Charge one space” means “(After this Villain enters the Sewers,) it charges forward an extra space, pushing other Villains forward.”

- This might cause more escapes.
- Some Villains charge multiple spaces!

### Cheering Crowds {#keyword-cheering-crowds}

- Several Hero cards say “Cheering Crowds.” This means “You may play this card twice in a row if you return a Bystander from your Victory Pile to the bottom of the Bystander Stack.”

Example 1: Say you have a Hero that gives 1 and says “Draw a card. Cheering Crowds.” As you play this Hero, you could return a Bystander to play the Hero twice in a row, getting 2 and drawing two cards.

- Essentially you play the card itself, and then you play a bonus copy of that card. Example 2: Say your first play of the turn was an <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> card that gives 2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> and says “ <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> : Draw a card. Cheering Crowds.” You decide to return a Bystander to play this card twice in a row. The first play wouldn’t get to use the “ <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> : Draw a card” ability, since you haven’t played an <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> card earlier in the turn. However, the second play would get to use that Superpower ability, since you now have played an <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> card earlier in the turn. So you would end up getting 4 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> and drawing one card.
- If you had played a different <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> card before doubling the Cheering Crowds card, then you would get to use the “ <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> : Draw a card” ability both times, getting 4 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> and drawing two cards. Example 3: Say your first play is using Cheering Crowds to play a <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card twice. Then, you play another card that says “ <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> : You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each other <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> Hero you played this turn.” That ability would count both plays of your Cheering Crowds card, giving you +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> total.
- When playing out a big turn, some people like to put the Bystander they’re returning temporarily on the Cheering Crowds card to remind themselves that they played it twice.

### Chivalrous Duel {#keyword-chivalrous-duel}

- To fight and enemy with “Chivalrous Duel,” all the <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> you spend must come from a single Hero Name.
- For example, to fight a 3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Villain with Chivalrous Duel, you can spend 3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> from two different Black Knight hero cards. But you can’t combine 2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> from Black Knight cards and <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> from a Wasp card.
- If a Hero has no Hero Name listed, (like S.H.I.E.L.D. Trooper, or any Sidekick, or a Villain that became a Hero) then its Hero Name is the same as its card name. So you can play three S.H.I.E.L.D. Troopers then fight a 3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Villain with Chivalrous Duel. But you can’t spend 2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> from Shatterstar cards and 1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> from a S.H.I.E.L.D. Trooper to fight a Chivalrous Duel.
- You can’t use <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> you get from anything that’s not a Hero card, including Microscopic Size-Changing Villains, Masterminds Tactics, Shard tokens from other sets, etc. You can use <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> from Hero Artifacts in other sets with the right Hero Name, since those are Hero cards.
- In a setup with lots of Chivalrous Duels, like fighting Morgan le Fay or the Scheme “Pull Earth into Medieval Times,” you will want to build your deck to concentrate your <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> cards into just one or two Hero Names!

<span id="rule-choose-a-villain-group"></span>
### “Choose a Villain Group” {#keyword-choose-a-villain-group}

Some cards say things like “Choose a Villain Group. You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Villain in your Victory Pile from that Group.” For example, you can choose the Villain Group “Inhuman Rebellion.”

- You can also count a Henchman Villain Group like “Doombot Legion.” However, you can’t choose the generic word “Henchmen” and count Villains from multiple Henchmen Groups at once.
- You also can’t count two Villain Groups at once by choosing a word or phrase that appears in both Villain Groups. For example, if you choose the “Hydra” Villain Group, you can’t also count “Hydra Elite” Villains. They are not the same Villain Group.
- You can’t count cards that have no Villain Group, like Tactics, Bystanders, Master Strikes, Scheme Twists, or Heroes that were turned into Villains. Traps and Locations from other sets aren’t Villains, so they don’t count, even if that Trap turned into a Villain.

<span id="keyword-circle-of-kung-fu"></span>
### Circle of Kung-Fu (and Quack-Fu) {#keyword-circle-of-kung-fu-and-quack-fu}

“5th Circle of Kung-Fu” means “During your turn, this Villain has +5 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> unless you reveal a Hero that costs 5 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> or more.”

- Likewise, the 7th Circle gets +7 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> unless you reveal a Hero that costs 7 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> or more, etc.
- If a Villain or Mastermind already has a Circle of Kung-Fu, and a Scheme gives them another one, only count the highest circle – don’t add them up.

### Clone {#keyword-clone}

- Clone means: You may gain another copy of this card from the HQ. If there are none in the HQ, you may gain a copy from the Hero Deck and shuffle it.
- “Gain” means “put it into your discard pile.”
- If you a Clone a S.H.I.E.L.D. Officer or Sidekick, search and shuffle that stack instead.

“When Recruited” Clones Some Heroes say “When Recruited: Clone”. This means Use the Clone ability immediately when you recruit this Hero. (Do this right after you put the recruited Hero in your discard pile, after you refill its HQ space.)

- Use a “When Recruited” ability only when you recruit a Hero, not when an ability causes you to “gain” a Hero or “put it in your hand.” So the copy you gain from “When Recruited: Clone” won’t make you gain more copies.

### • Some Heroes say things like “When Recruited — <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> : Clone.” Use this ability only if you have played a <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> Hero this {#some-heroes-say-things-like-when-recruited-icon-7-clone-use-this-ability-only-if-you-have-played-a-icon-7-hero-this}

turn before recruiting this card.

Clone Villains On a Villain, “Ambush: Clone” means: Search the Villain Deck for a copy of this Villain, and it enters the city, ignoring any further Clone effects. Shuffle that deck. When you Clone a “Predator X” Villain, just use the first “Predator X” you find in the Villain Deck. If you can’t find a Clone copy of a Villain (or Hero), just move on.

### Command {#keyword-command}

Some Villains say things like “Taserface gets +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> while he Commands the Ravagers.”

- A Villain “Commands” their group and gets these abilities as long as it’s the leftmost Villain of that Villain Group in the city.
- If there’s only one Villain of a Villain Group in the city, it still Commands that Villain Group.

### Conqueror {#keyword-conqueror}

- Some Enemies say “Rooftops Conqueror 2.” This means “This gets +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> while any Villain is on the Rooftops.”
- The enemy gets the bonus whether itself or another Villain is on the Rooftops.
- Hero cards also say things like “Bridge Conqueror 1,” meaning “You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> if any Villain is on the Bridge.”

### Contest of Champions {#keyword-contest-of-champions}

Some Villains and Masterminds say things like “Ambush: Contest of Champions <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> .” When this happens:

- Each player’in turn reveals a single card, either from their hand, or that they played this turn, or the top card of their deck. That player announces their “Contest Score,” which is that card’s printed cost, doubled if it’s a <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> card.
- You must choose carefully whether to use the best score you have from your hand, or to take a risk by trying the top card of your deck instead.
- After all players have announced their Contest Score, then Evil tries to win the contest. Reveal the top two cards of the Hero Deck, and Evil uses whichever card gives the highest Contest Score (taking account of any doubling). Again, this is the card’s printed cost, doubled if it’s a <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> card. Then put both those cards on the bottom of the Hero deck.
- Whichever score is highest (or tied for highest) “wins” the contest. Everyone else “loses.”
- For example, in a 3-player game, say Alana’s score is 6, Piper’s score is 6, Melody’s score is 4, and Evil’s score is 6. Then Alana, Piper, and the Mastermind all win the contest, and Melody loses the contest.
- The card lists outcomes for winning & losing.
- A few cards reveal a Hero card and use its colors for a contest. This can create contests that are multicolor, such as “Contest of Champions <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> , <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> .” In this case, any card that includes either <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> or <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> will match the contest and have its score doubled. (A card that’s both <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> and <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> won’t be quadrupled.)
- Some contests say that Evil reveals 4 or 6 cards from the Hero Deck. Evil’s Contest Score is still the highest-scoring single card.

### Coordinate {#keyword-coordinate}

Coordinating allows you to let another player “borrow” one of your cards. It is a critical way to help other players defeat tough enemies. During another player’s turn, you can Coordinate with them like this:

- Discard a Coordinate card from your hand and then draw a new card to replace it.
- That player can now play a copy of the card you coordinated with them. (A copy counts as playing the exact same card including its <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> , special abilities, and Hero Class symbol.)

You can only Coordinate one card to each player on their turn. However, multiple players can each Coordinate one card to the player whose turn it is, in order to give that player a huge advantage.

- If you are playing a solo game, once per turn, you may discard a card with Coordinate to draw a card.
- Coordinate is printed on cards in red text to make it easier to notice during other players’ turns.

There are a couple of things about Coordinate specific to Marvel Legendary® that don’t apply to Legendary® Encounters:

- When you offer to Coordinate a card to another player, that player can decline. If so, you don’t discard that card and that player doesn’t play a copy of it.
- If you are playing with the Final Showdown, you can’t Coordinate during that Showdown.

### Cosmic Threat {#keyword-cosmic-threat}

If an enemy has Cosmic Threat: <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> , that means: “Once per turn, for each <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> card you reveal, this Enemy gets -3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> this turn.”

- For example, the Shaper of Worlds has “Cosmic Threat: <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> and 10* <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . If you reveal two <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> cards, he gets -6 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> this turn, so he has 4 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> left. If you reveal four <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> cards, he gets -12 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> this turn, so he has 0 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , and you can fight him without spending any <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .

- The Celestials say things like “Cosmic Threat <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> or <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> .” You can choose to use either <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> or <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> cards for its Cosmic Threat in a single turn, but you can’t use both to reduce its <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- If you try to fight a Mastermind with Cosmic Threat a second time in the same turn, it will return to its full <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , and you cannot use any Cosmic Threat abilities against it in additional fights that turn.
- You can use the same <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> cards to reduce the <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> of different “Cosmic Threat <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> ” Villains in one turn. (An asterisk \* next to an Enemy’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> number is to remind you that their <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> can change. The asterisk doesn’t mean anything else.)

Galactus’ Cosmic Threat: Galactus has the “Cosmic Threat:

### <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> , <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> , <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> , <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> , <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> ability. This means: “Once per turn, choose <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> , <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> , <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> , <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> , or <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> . For each card of that class you reveal, {#icon-9-icon-6-icon-7-icon-3-icon-5-ability-this-means-once-per-turn-choose-icon-9-icon-6-icon-7-icon-3-or-icon-5-for-each-card-of-that-class-you-reveal}

this Enemy gets -3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for one fight this turn. If you try to fight Galactus a second time in the same turn, he will return to his full <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> and you cannot use his Cosmic Threat ability a second time that turn.

### Cross-Dimensional Rampage {#keyword-cross-dimensional-rampage}

“Cross-Dimensional Hulk Rampage” means “Each player reveals one of their Hulk Heroes or a Hulk card in their Victory Pile or gains a Wound.”

- You can reveal any card that includes the word “Hulk” in its card name, Hero name, Villain Group name, or Tactics for Hulk Masterminds. This includes any Red Hulk, She-Hulk, Red She-Hulk, Skaar, Son of Hulk, Joe Fixit Grey Hulk, Hulkling, Hulk Gang, Cosmic Hulk Robot, Hulkbuster, Enchain the Hulk, and so on.
- You don’t need to know the whole history of Marvel comics to judge who counts as a Hulk – just rely on whether the card says Hulk in its name or not. There are only a few, very specific exceptions we have to make to stay true to the characters: “Nul, Breaker of Worlds” from Fear Itself and “Maestro” (core set) count as Hulks for this.
- Some Heroes in the World War Hulk expansion can transform into Hulks, like Bruce Banner and Amadeus Cho. A puny “Bruce Banner” card doesn’t say “Hulk” on it, so it can’t stop a Hulk Rampage. But revealing the transformed Bruce Banner card named “Savage Hulk Unleashed” works.
- “Cross-Dimensional Wolverine Rampage” counts any card with “Wolverine,” “Weapon X,” or “Old Man Logan.”
- “Cross-Dimensional Zombie Rampage” and “Cross-Dimensional Demon Rampage” can be blocked by “Zombie” and “Demon” cards in the same way. You can use any card that has “Demon” as any part of its names, including “Demonic Descendant”, “Demonform”, “Cleaving Demonblade”, and so on.
- When a Cross-Dimensional Rampage happens, you can choose to gain the Wound, even if you have a card that you already played or could otherwise reveal. You might want to gain the Wound if you have cards that benefit from gaining Wounds, or a card that benefits from preventing Wounds..

### Cyber-Mod {#keyword-cyber-mod}

Heroes

- Some Heroes say things like “Cyber-Mod <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> : Draw a card.”
- You may use a Cyber-Mod ability only if you have a card of the listed Hero Class in your Victory Pile.
- Likewise, you can use “Cyber-Mod <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> : You get +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> only if you have at least 3 <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> cards in your Victory Pile.
- The Heroes that use Cyber-Mods have ways to send cards Undercover. This can help you put the right cards into your Victory Pile to activate your Cyber-Mods.
- The cyber-tech that infused Hulk 2099 with gamma rays lets him push his pain under the surface, channeling it into ever more strength and rage. Accordingly, Hulk 2099 can send Wounds Undercover and use “Cyber-Mod Wound” abilities in the same way.

Enemies

### • Some enemies say things like “Cyber-Mod <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> : This {#some-enemies-say-things-like-cyber-mod-icon-7-icon-7-icon-7-this}

gets +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .”

- Villains and Masterminds use their Cyber-Mod abilities only while there are cards of the listed Hero Classes in the Escape Pile.
- Likewise, if a Villain says “Fight — Cyber-Mod <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> : KO one of your Heroes,” use that ability only if there is a <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card in the Escape Pile.
- If a Villain escapes the city with a captured Hero, that Hero card stays in the Escape Pile and can help activate all enemies’

### Cyber-Mods {#keyword-cyber-mods}

- Cyber-Mod Enemies also have ways to put Hero cards directly into the Escape Pile, helping activate Cyber-Mods.

### Danger Sense {#keyword-danger-sense}

- Some cards say things like “Danger Sense 2.” This means “Reveal the top 2 cards of the Villain Deck. You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Villain you revealed. Put all the cards back on top in any order.”
- Cards can say Danger Sense 1, 2, 3, or even 4, revealing that many cards.
- Several Danger Sense cards also say they have additional effects when they reveal particular kinds of cards.
- Sometimes you can use one Danger Sense card to put a particular card on top of the Villain Deck, and then use a

different Danger Sense card to benefit from that card being on top of that deck.

- Danger Sense can also be a good way to delay nasty Scheme Twists, Master Strikes, and powerful Villains. But you won’t be able to avoid them forever!

Danger Sense on Villains

- Some cards say “Ambush: Danger Sense 2, helping all Black Order Villains and the Mastermind.
- To do this, reveal the top cards of the Villain Deck and rearrange them, just like normal Danger Sense. However, the +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonus for each Villain card revealed is gained by all Black Order Villains in the city and the Mastermind this turn, instead of being gained by a player.
- This bonus wears off at the end of the turn

<span id="keyword-double-dark-memories"></span>
### Dark Memories {#keyword-dark-memories}

- On a Hero card, “Dark Memories” means “You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Hero Class among cards in your discard pile.”
- Likewise, on a Villain it means “This gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Hero Class among cards in your discard pile.”

### • The Hero Classes are <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> , <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> , <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> , <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> , and <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> , and Dark {#the-hero-classes-are-icon-9-icon-6-icon-7-icon-3-and-icon-5-and-dark}

Memories can give anywhere from +0 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> to +5 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . Grey cards like S.H.I.E.L.D. Agents don’t have a Hero Class.

- It doesn’t matter how many cards of a particular Hero Class you have in your discard pile. So if your discard pile were three <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> cards, four <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> cards, and five grey S.H.I.E.L.D. Agents, Dark Memories would give +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- Recruiting Heroes and using discard abilities at the right times can help you increase the Dark Memories bonus.
- Likewise, if you draw or reveal enough cards that you have to shuffle your discard pile to make a new deck, then you won’t have a discard pile anymore, and the Dark Memories bonus on Villains will go back to +0 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . Time your plays and build your deck carefully to turn Dark Memories to your advantage!
- You can minimize the <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> of Villains by building a deck with very few Hero Classes. Or you can maximize the <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> of Heroes with Dark Memories by recruiting many Hero Classes.
- You can use Dodge abilities at the right times to put additional Hero Classes into your discard pile and power up your Dark Memories, or potentially force a deck reshuffle that will reset Villains’ Dark Memories to +0 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- “Double Dark Memories” means double the bonus.

### “Defeat” {#keyword-defeat}

When a card tells you to “defeat an enemy,” you still do that enemy’s Fight effect. You ignore restrictions like Zero and Forearm.

### Demolish {#keyword-demolish}

“Demolish each player” means “Reveal the top card of the Hero/ Ally Deck, note its cost, and put it on the bottom of the Hero/Ally Deck. Each player reveals their hand and discards a card with that cost.” Reveal only one card from the Hero/Ally Deck — don’t reveal a different card from the Hero/Ally Deck for each player.

### Demonic Bargain {#keyword-demonic-bargain}

- Some Villains like Satana Hellstrom say things like “Fight: Choose a player to make a Demonic Bargain with Satana Hellstrom to rescue three Bystanders.”
- That player discards the top card of their deck to see if they are corrupted by power. If that discarded card costs 1 or more, that player is too powerful and arrogant to resist temptation and gains a Wound, to the demon’s delight.
- If that discarded card costs 0, then that player has been humble enough to resist corruption.
- Whether that player gained a Wound or not, they then gain the Demonic Bargain’s listed benefit.
- Some cards have you choose which player must make a Bargain for a benefit. Think carefully about how many cards in your deck cost 0. If most of your deck is still 0-cost cards, it may be worthwhile to seize the power of the Demonic Bargain for yourself. But if your deck has lots of high-cost cards, then it may be wiser to choose another player to make the Demonic Bargain instead. Just beware: mortals who think they can outwit and outbargain a Demon are often left regretting their hubris.
- When you choose a player to make a Demonic Bargain, that player cannot decline.
- Dormammu can force players to make cruel, all-downside Demonic Bargains, with the chance of a Wound plus an additional negative effect.
- If you use card abilities to look at or manipulate the top card of your deck, you may gain valuable insight as to whether a Demonic Bargain will punish you.

### Digest {#keyword-digest}

- Some Heroes say things like “Digest 2: Draw a card.”
- Use this Digest ability only if you have at least that many cards in your Victory Pile.
- All kinds of cards in your Victory Pile count for Digest. This includes Henchman Villains, regular Villains, Bystanders, Mastermind Tactics, Traps from other sets, etc.
- You don’t have to remove any cards from your Victory Pile to use Digest.
- Even if you have 10 cards in your Victory Pile, you can’t use a card’s “Digest 2” ability five times—just once.

### Dodge {#keyword-dodge}

- Dodge means “During your turn, you may discard this card from your hand to draw another card.”
- When you Dodge a card from your hand, ignore all the other text on that card (unless it specifically mentions Dodging). You didn’t “play” the Dodged card, so its Hero Class/color don’t help you trigger the Superpower abilities of other cards you play that turn.
- Many Dodge cards have effects that can be especially strong or weak in different situations. That way you can play them when they’re strong and Dodge them away when they’re weak. Dodge also helps you sculpt your hand towards Recruit Points or Attack as you see fit.

### Dominate {#keyword-dominate}

This keyword represents Villains using telepathy, sorcery, or illusions to twist Heroes’ minds to evil.

- Some Villains and Masterminds say they “Dominate” Hero cards from various places. This means “Put those Heroes under this enemy. This enemy gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Hero it’s Dominating.”
- When you fight that enemy, put one of those Dominated Heroes into each player’s discard pile. You choose which player gets which Hero, including yourself. There might not be enough for every player to get one. KO any excess Dominated Heroes.
- If a Villain escapes, any Heroes Dominated by that Villain go to the Escape Pile too.

### Double-Cross {#keyword-double-cross}

- “Double-Cross each player” means “Each player reveals their hand and discards one of their highest-cost ‘doubles’ (a card that has the same cost as another card in your hand).”
- Example: The costs in your hand are 0,0,4,4,4,6. You must discard one of your 4-cost cards.

### Elusive {#keyword-elusive}

“Elusive 6” means “You can only fight this Adversary if you have made at least 6 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> this turn.” You don’t have to spend that <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> to fight this Adversary, you just have to have made that much <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> this turn. You can still spend that <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> on recruiting Allies. Elusive represents how some Villains/Adversaries are hard to pin down, can’t be defeated with sheer brute force, and need to be cornered in a more subtle way.

<span id="keyword-double-empowered"></span>
<span id="keyword-quadruple-empowered"></span>
<span id="keyword-triple-empowered"></span>
### Empowered {#keyword-empowered}

This keyword represents Heroes and Villains who draw power from abient energy, technology, or superpowers around them.

### • Some Heroes say things like “You get Empowered by <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> .” This means “You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> card in the HQ.” {#some-heroes-say-things-like-you-get-empowered-by-icon-7-this-means-you-get-1-icon-0-for-each-icon-7-card-in-the-hq}

- On Villains and Masterminds “Empowered by <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> ” means “This gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card in the HQ.”
- As Heroes enter and leave the HQ, an Empowered card can get stronger or weaker. You only check the <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonus at the moment you play your Empowered Hero or at the moment you fight the Empowered enemy.
- One clever move is to recruit a Hero from the HQ at the right time, changing the colors in the HQ to weaken an Empowered enemy or to try to strengthen an Empowered Hero in your hand.
- Some cards are even “Double Empowered” or “Triple Empowered” meaning that they get +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> or +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each appropriate card in the HQ.

### • “Empowered by <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> ” gives +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> , <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> , or <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> {#empowered-by-icon-6-icon-7-gives-1-icon-0-for-each-icon-6-icon-7-or-icon-6-icon-7}

card in the HQ .

- Abilities that let you put cards from the HQ on the bottom of the Hero Deck are especially useful at setting up Empowered Heroes or Empowered Villains. They are also great at giving you more Hero Ambushes!

### Endgame {#keyword-endgame}

Some Enemies say things like “Endgame: +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .”

- It is the “Endgame” whenever the Villain Deck holds 8 cards per player or fewer.
- This gives Enemis their Endgame <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonus or other listed Endgame abilities.
- Captain Marvel is not in Infinity War and arrives only in the Endgame movie, reaching her full power in the final battle. Accordingly, she uses the Endgame keyword in the same way Enemies do.
- If you reach the Endgame and then cards are added back to the Villain Deck somehow, it might not be the Endgame anymore. If a Scheme has multiple Villain Decks, it is the Endgame if any of them are small enough. Some Enemies have special abilities that say “It is the Endgame this turn.” This temporarily activates Endgame abilities for all Heroes and Enemies across the game this turn.
- Captain Marvel also has a card which says “For the rest of this turn, it is the Endgame for your Hero cards.” This turns on Heroes’ Endgame abilities, but it does not activate Enemies’ Endgame abilities.
- If you are playing with Endgame abilities, you may find it easier to count 8 cards per player from the bottom of the Villain Deck and put that bottom section to the side of the rest of the Villain Deck. Or keep the Villain Deck in one stack but turn that bottom section of the deck 90 degrees, perpendicular to the top section. This will make it easier to see how close you

are to the Endgame. Remember that it’s technically all still one deck, so you might not want to do this if using a Scheme that shuffles the Villain Deck, like “Sacrifice for the Soul Stone.”

### Excessive Kindness {#keyword-excessive-kindness}

“Excessive Kindness” abilities work just like Excessive Violence, except that you trigger them by spending 1 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> more than you need when recruiting a Hero.

### Excessive Violence {#keyword-excessive-violence}

- Some Heroes say things like “Excessive Violence: Draw a card.”
- Once per turn, you can spend 1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> more than you need to fight a Villain or Mastermind “using Excessive Violence.” If you do, you get to use all the “Excessive Violence” abilities on cards you played this turn.
- Say you’ve played three Heroes with Excessive Violence abilities this turn. If you spend 8 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> to fight a Villain or Mastermind that has 7 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , then you’ll get to use all three Excessive Violence abilities!
- If you don’t fight anything this turn, or if you don’t spend an extra 1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> on someone, then you won’t be able to use
- Since you can only fight “using Excessive Violence” once per turn, you can only use a card’s Excessive Violence ability once per turn. (It’s OK to play two cards with the same card name, fight an enemy “using Excessive Violence” and use both of those cards’ Excessive Violence abilities.)
- Do the enemy’s Fight effect and the Excessive Violence abilities in any order of your choice.
- If you fight using Excessive Violence and then draw or play more cards with Excessive Violence abilities that turn, it will be too late to use those abilities.
- Gravity Mines says “Triggered Artifact — Whenever you use Excessive Violence, draw a card.” You can use this even if this Artifact is the only Excessive Violence card you have, or combine it with other Excessive Violence cards.

### Explore {#keyword-explore}

- Some cards say things like “ <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> : Explore. You get + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to the Found Hero’s printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .”
- Explore means “Put a Hero from the HQ on the bottom of the Hero Deck. Reveal the top two cards of the Hero Deck and choose which one refills the empty HQ space. Put the other on the bottom of the Hero Deck.”
- Some Explore cards give bonus effects based on the “Found Hero.” The Found Hero is the Hero you added to the HQ this way.

### Fated Future {#keyword-fated-future}

- When you play a card with Fated Future, you may put it on the bottom of your deck.
- This helps you draw the card again more quickly than if you discarded it, waited for your discard pile to shuffle into a new deck, then waited to draw the card.
- You can “predict the future” of when you’ll see it again.
- You can also increase the chance that you will draw multiple Fated Future cards in the same powerful hand once you get to the bottom of your deck.

### Fateful Resurrection {#keyword-fateful-resurrection}

On a Villain card, “Fight: Fateful Resurrection” means “Fight: Reveal the top card of the Villain Deck. If it’s a Scheme Twist or Master Strike, this Villain reenters the city.”

- If a Villain resurrects this way, you still rescue its Bystanders and do its other Fight effects.
- The Villain pushes into the Sewers and does any Ambush abilities as normal.
- If a Mastermind Tactic resurrects this way, shuffle it back into the other face down Tactics.
- If a Villain that has ascended to become a Mastermind resurrects this way, it stays a Mastermind and does not reenter the city.

### Feast {#keyword-feast}

When you fight a Villain/Adversary or Mastermind/Commander with the “Feast” ability you treat it as a fight effect. “Feast” = “Fight: KO the top card of your deck.” Some Maximum Carnage Villains create special effects when they feast on certain cards

- Carnage’s Master Strike starts with “Feast on each player.” That means each player does the “Feast” effect. Then Carnage’s Master Strike causes Wounds when he feasts on certain cards.
- Note that Carnage’s Master Strike is the only effect that feasts on every player. The “Maximum Carnage” Villains and Carnage’s Mastermind Tactics each feast on only one player.
- While Carnage’s Master Strike causes Wounds, the Feast abilities on his Mastermind Tactics and most of his Villains don’t cause Wounds.

### Focus {#keyword-focus}

The “Focus” keyword lets you transform your Recruit Points into powerful, flexible effects. It looks like this: “Focus <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> <img src="/img/icons/hero-teams/team-heroes-of-wakanda.svg" alt="Heroes Of Wakanda" class="rules-icon"> [EFFECT]”

- When you play a card with a Focus ability, you can pay the cost on the left side of the arrow to get the effect

on the right side of the arrow. You can use that Focus ability as many times as you want for the rest of the turn.

- For example, say you play a card that says: “Focus 2 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> <img src="/img/icons/hero-teams/team-heroes-of-wakanda.svg" alt="Heroes Of Wakanda" class="rules-icon"> Draw a card.” For the rest of your turn, you can use 2 Recruit Points to draw a card, as many times as you want, as long as you have the Recruit points available. You can even play more Heroes, recruit, fight, then use the Focus ability again.
- Note: You can use Focus abilities and still use the “Healing” ability on Wounds.
- Super-Skrull uses the Fantastic Four’s abilities with a twist, focusing <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> instead of <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> .

### Fortify {#keyword-fortify}

This keyword represents Villains/Adversaries setting up nasty traps for the players.

- Some Villains say things like “Escape: Fortify the Mastermind. While it’s fortified, the Mastermind can’t be fought.”
- Put this Villain on or near the specified place. While it’s there, it has the listed effect. Any player can fight that Villain as normal to end that Fortify effect and put that Villain into their Victory Pile.
- If a card would fortify a place, don’t do anything if there’s already a Villain fortifying that place.

### Galactus Consumes the Earth {#keyword-galactus-consumes-the-earth}

Two Galactus cards in the Annihilation set can destroy city spaces. You can mark this by moving the Mastermind to cover the destroyed city spaces or by putting Wounds on the destroyed spaces. Whenever Villains are pushed out of the new end space of the city, they escape as normal.

If a city space like the Rooftops is destroyed, act as if that city space no longer exists, and the word Rooftops is not written on the board anymore. So card effects won’t do anything that say “If there is a Villain on the Rooftops... “ (like Conqueror) or “Move a Villain to the Rooftops...” or “If the Rooftops are empty...”

- Note: Firelord’s ability specifically overrides this.

### Grey Heroes {#keyword-grey-heroes}

- When a card refers to “grey Heroes,” it means grey-colored cards with no Hero Class, like S.H.I.E.L.D. Agents, Troopers, Officers or Sidekicks.
- Grey Hulk and Jean Grey are not “grey Heroes.”

### Half-Points {#keyword-half-points}

The Deadpool expansion introduces ½ <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> and ½ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> values. When you play these, just add ‘em up as normal. Play a 2½ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Attack and a 3½ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Attack Hero, and you’re ready to cuddle up to some Villain with 6 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Attack.

### Haunt {#keyword-haunt}

Some cards say things like “Ambush: Haunt the rightmost unhaunted Hero in the HQ.”

- This means: Tuck this Villain beneath that Hero, ‘Haunting’ it, so you can see the Villain’s name. Players can’t recruit that Haunted Hero while the Haunting Villain is under it.
- Instead, a player can spend <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to the Haunted Hero’s cost to “exorcise” that Haunted Hero. If a player does, they either KO the Haunted Hero or choose a player to gain it. Then the Haunting Villain enters the city, ignoring any Ambush effects it has.
- While a Villain is Haunting a Hero, you can’t fight the Haunting Villain itself – you have to spend <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> to exorcise the Haunted Hero first, driving the Haunting Villain into the city so you can finish it off there.
- Exorcizing a Haunted Hero is not a “fight” - don’t do any Fight abilities on the Haunting Villain.
- A Hero can’t be Haunted by two Villains at once. Haunt abilities all say to Haunt an “unhaunted Hero.”
- Zarathos’ Master Strikes and Tactics can cause him to Haunt a Hero in the same way. Exorcizing that Hero drives Zarathos back to the Mastermind space.
- A “Haunted Hero” is still a Hero, so it can still be affected by things that affect Heroes in the HQ. A Villain escaping the city that KOs a Hero from the HQ (that costs 6 or less) can KO a Haunted Hero. Card effects that let you “gain a Hero from the HQ” or “Put a Hero from the HQ on the bottom of the Hero Deck” still work on Haunted Heroes. However, card effects that say “recruit a Hero from the HQ for free” don’t work on Haunted Heroes, since you can’t recruit them.
- If something causes a Haunted Hero to leave the HQ, then the Haunting Villain stays in that HQ space and Haunts the new Hero that arrives to refill that HQ space.
- If an HQ space is “destroyed,” KO any Haunted Hero there and the Haunting Villain there enters the city, ignoring any Ambush effects.

### Heist {#keyword-heist}

- Some cards say things like “Heist: You get +2 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> .”
- Once per turn, if you have played any Heroes with Heist abilities (and/or fought any Enemies with Heist abilities) you may “attempt a Heist.”
- To do this, first assemble your crew: Count the number of different non-zero costs you have among all your Heroes this turn. This is your Heist Count. Then try to

outfox the guards: Reveal the top card of the Villain Deck and check its printed VP.

- If your Heist Count is higher than that VP: The Heist worked! Use all Heist effecgts of Heroes you played and Enemies you fought this turn, in any order.
- If your Heist Count is tied with that VP: It all went sideways, and you barely escaped! No effects.
- If your Heist Count is lower than that VP: Your crew got caught! You gain a Wound (& no Heist effects).
- You can only ever attempt one Heist per turn, no matter the outcome. If you succeed in the Heist, do all of the Heist effects before moving on to playing more Heroes or recruiting or fighting anything else. After your one Heist attempt for the turn, if you draw additional cards with Heist abilities (or fight additional Enemies with Heist abilities), it will be too late to get those additional Heist effects.
- Heist checks for printed cost, so 4 \* and 4 count as the same cost.
- You don’t have to go on a Heist. Weigh it carefully!

### Hidden Witnesses {#keyword-hidden-witnesses}

- This keyword represents Villains and Masterminds hiding behind layers of informants, victims, and stooges. To find these Villains, you must track down and interview Hidden Witnesses who know their locations.
- Some Villains say things like “Ambush: This Villain captures 2 Hidden Witnesses.” This means the Villain captures the top 2 cards of the Bystander Stack, face-down, as Hidden Witnesses. You can’t fight a Villain while it has a Hidden Witness.
- During your turn you can pay 2 to rescue a Hidden Witness <img src="/img/icons/rules-extracted/icon-29.svg" alt="game symbol" class="rules-icon"> any number of times and put it in your Victory Pile.
- Hidden Witnesses still count as Bystanders. When you rescue one, you get any special “When you rescue this Bystander ...” effect written on it. It stays in your Victory Pile as a normal, face-up Bystander.
- A Villain can have face-up Bystanders and face-down Hidden Witnesses at the same time. You’ll need to pay to rescue the face-down Hidden Witnesses. Then, you can fight the Villain, which will automatically rescue the face-up Bystanders.
- If a Villain escapes with any number of Bystanders, including Hidden Witnesses, it will cause all players to discard a single card, just like a Villain escaping with any normal Bystanders. Hidden Witnesses carried away by escaping Villains stay in the Escape Pile as normal, face-up Bystanders.
- You can pay to rescue Hidden Witnesses even if you’re not going to fight that Villain during that turn. You can also rescue just some of the Hidden Witnesses and leave others for later.

- If a special ability lets you “Defeat a Villain for free,” you automatically rescue all the Hidden Witnesses on it without paying <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> .
- Masterminds and Schemes can have Hidden Witnesses on them too. They work the same way.

### Hunt for Victims {#keyword-hunt-for-victims}

Some sadistic Villains say “Ambush: Hunt for Victims.”

- This means: “KO a Bystander that is captured by any Villain or Mastermind or in the Escape Pile. If you can’t, then this captures a Bystander instead.”
- Other abilities on Lilith and the Lilin then benefit from the number of Bystanders in the KO Pile.
- If a player fights Lilith, and her Mastermind Tactic Hunts for Victims and captures a Bystander, the player doesn’t immediately rescue that Bystander.
- When facing Enemies that Hunt for Victims, defeat Villains holding captured Bystanders quickly, before those Bystanders are Hunted as Victims!

### Human Shields {#keyword-human-shields}

This keyword represents enemies hiding behind innocent people to prevent Heroes’ attacks.

- “Ambush: This Villain captures 2 Human Shields” means the Villain captures the top 2 cards of the Bystander Stack face-down. You can’t fight a Villain while it has any Human Shields. During your turn, any number of times, you can pay <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to that Villain’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> value to rescue one of its Human Shields at random and put it in your Victory Pile. (The \* on their <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> is a reminder.)
- A Villain can have face up Bystanders and face-down Human Shields at the same time. You’ll need to pay to rescue the facedown Human Shields. Then you can fight the Villain, which will rescue the face-up Bystanders automatically.
- Human Shields still count as Bystanders. Villains escaping with Human Shields still make players discard as normal.

### HYDRA Level {#keyword-hydra-level}

- The HYDRA Level is the number of S.H.I.E.L.D. and/or HYDRA cards in the Escape Pile.
- Some Villains and Masterminds say things like “Growing Man gets + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to the HYDRA Level.”
- Like S.H.I.E.L.D Level, this includes any card with the <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> or <img src="/img/icons/hero-teams/team-fantastic-four.svg" alt="Fantastic Four" class="rules-icon"> team icons, as well as any card with “S.H.I.E.L.D.” or “HYDRA” in its card name, Villain Group name, or Mastermind name.
- Some abilities put <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> cards directly from S.H.I.E.L.D. Officer Stack into the Escape Pile to increase the HYDRA Level. This is not an “escape” unless it’s a Villain escaping from the city, so it won’t KO a Hero of cost 6 or less from the HQ.

### Hyperspeed {#keyword-hyperspeed}

- Some Hero cards say things like “Hyperspeed 5.” This means “Reveal the top 5 cards of your deck. You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each card with an <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icon you revealed this way. Discard all those cards.”
- It doesn’t matter what numbers are in the <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icons. Ignore <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> and other icons on the revealed cards.
- When building a deck with lots of Hyperspeed, you will want as many cards with <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icons as you can get – including cards with “0+” printed inside their <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icon.
- You can also cleverly use abilities that let you set up the top card of your deck to have an <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icon right before you play a card with Hyperspeed.
- Some cards explicitly tell you to “Hyperspeed 3 for <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> .” This means “Reveal the top 3 cards of your deck. You get +1 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> for each card with a <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> icon you revealed this way. Discard all those cards.”
- Finally, some cards say “Hyperspeed 3 for <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> and <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .” In this case, if you revealed one card with a <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> icon and two cards that each had <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> and <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icons, you would get +3 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> and +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . Cards with both <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> and <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icons can be very useful with

### Indigestion {#keyword-indigestion}

- If you don’t have enough cards in your Victory Pile to use a card’s Digest ability, use its Indigestion ability instead.
- For example, some Heroes say things like: “Digest 4: Draw two cards. Indigestion: You get +2 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> .”
- When you play this card, if you have at least 4 cards in your Victory Pile, then use the Digest ability and draw two cards.
- If you have zero to three cards in your Victory Pile, then you use the Indigestion ability instead, getting +2 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> .
- If you have enough cards in your Victory Pile to use the Digest ability, you cannot choose to use the Indigestion ability instead.

Infinity Gems Infinity Gem Villain cards act just like any other Villains in the city. However, when you fight an Infinity Gem, you put it into your discard pile as an Artifact card.

- Infinity Gems you’ve defeated have 0 cost, have no color/Hero class, and don’t count as Hero cards or Villain cards.
- When you have an Infinity Gem in your hand, you can play it just like any other Artifact.
- If a card effect moves an Infinity Gem back to the Villain Deck or city, then the Infinity Gem becomes a Villain card again.

### Investigate {#keyword-investigate}

- Some cards say things like “Investigate for a <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card.” That means “Look at the top two cards of your deck. Reveal a <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card from among them and draw it. Put the rest of those cards back on the top and/or bottom of your deck in any order.”
- Other abilities let you investigate for cards with certain costs, teams, <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icons, and other traits.
- Whether your investigation finds the right kind of card or not, you can still decide which cards go back on the top or bottom of your deck. This lets you set up your next Investigation or make powerful combos with other abilities that care about the top card of your deck.
- Some abilities tell you to investigate entirely different decks, like the Villain, Hero and Bystander Decks. They will tell you what to do with the card you find. Like before, put the rest of the cards you looked at back on the top and/or bottom of that deck in any order.
- (Note that Howard the Duck is also a private investigator. Many of his cards work similarly to the Investigate keyword and combine well with Investigate cards. However, Howard doesn’t literally Investigate, since his cards originally came out in Marvel 3D before Investigate existed.)

<span id="keyword-double-last-stand"></span>
### Last Stand {#keyword-last-stand}

- Some Villains say “Last Stand.” This means “This gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each empty space in the city.”
- Some Captain Marvel and Photon cards also say “Last Stand,” representing how they fight their hardest near the end of a battle. Likewise, this means “You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each empty space in the city.”
- Choose the order you fight Villains carefully when Last Stand is in the game!
- If a Mastermind or Scheme causes a city space not to exist, that does not count as an “empty space.”
- “Double Last Stand” means double the bonus.

### Liberate {#keyword-liberate}

Some Hero cards say things like “Liberate 3.”

- This means “You get +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , usable only against Villains holding Bystanders or the Mastermind.”
- You can use the bonus <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> against the Mastermind whether it’s holding Bystanders or not.
- You can use <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> that’s “only usable against Masterminds” (like Liberate) on additional <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> that Mastermind abilities ask you to spend, like when Hank Pym Yellowjacket requires extra <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> to “track him down.”

### Lightshow {#keyword-lightshow}

- Some Heroes say things like “Lightshow: You get +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .” Once per turn, if you played at least two Lightshow cards this turn, you can use a single Lightshow ability from any of those cards.
- If you play three, four, or more Lightshow cards you still use only a single Lightshow ability.

### Locations {#keyword-locations}

- When a Location is played from the Villain Deck, place it above the nearest city space that does not have a Location. Leave enough room that Villains can move through the city as normal.
- Once placed, Locations don’t move. Villains don’t push Locations forward. You can have a Villain in a city space that has a Location above it.
- Most Locations specify special abilities that happen when you fight Villains in that space. Some Locations become stronger when there’s a Villain in that space. Some Villains and Masterminds say they become stronger based on Locations.
- You can fight a Location by spending the listed amount of <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , putting it into your Victory Pile, and doing any Fight ability the Location may have.
- If a new Location is played, and every city space already has a Location, then KO the Location with the lowest <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> to make room. (If tied, the current player chooses.) This might KO the newly played Location or one of the previous Locations.
- In 1-player solo mode, when a Location tells “each other player” to do something, do it yourself.

Location Clarifications

- Locations do not count as Villains. Special abilities that mention Villains do not work on Locations.
- If a Mastermind or Scheme destroys a city space with a Location, KO that Location.
- A city space with a Location above it and no Villains still counts as “empty” for abilities like Last Stand.
- Each Mastermind in the set has at least one Tactic that becomes a Location. You win when the Mastermind has no face down Tactics left under them. You don’t also have to defeat all the Tactic cards that have turned into Locations in the city.
- Locations don’t usually capture Bystanders, but some card abilities can make them capture Bystanders. Rescue them when you fight that Location.

### Man (and Woman) Out of Time {#keyword-man-and-woman-out-of-time}

- This keyword means “After you use this card’s abilities, set it aside. At the beginning of your next turn, play this card a second time and then discard it.”

- The card is discarded the second time you play it, so you can only play the card twice. You can’t use Man Out of Time again to play that card for a third turn.
- Play your returning Man Out of Time cards after the “Play a Villain Card” part of your turn and before you start playing out your hand.
- You “played” a Man Out of Time card on both the first turn you played it and the second turn when you replayed it, so it can help activate your Superpower Abilities on both turns.
- You can use a Focus ability on a Man Out of Time card throughout the first and second turns you play the card.
- If a special ability lets you copy (or play a copy of) a Hero card, you can’t use Man Out of Time on the copy.
- Some enemies send your cards Out of Time, setting them aside in the same way. When you play and discard that card at the start of your next turn, you can’t use Man Out of Time again.

### Microscopic Size-Changing {#keyword-microscopic-size-changing}

- Some cards say “Microscopic Size-Changing <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> .”
- This means “You can recruit this card for 2 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> less for each <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card you played this turn, counting up to three <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> cards.”
- If you played 1 <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> Hero this turn, this card costs 2 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> less. If you played 2 <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> Heroes, it costs 4 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> less. If you played 3+ <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> Heroes, it costs 6 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> less.
- Playing a fourth <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card wouldn’t reduce this cost any further since there are only three <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> icons listed in this particular Microscopic Size-Changing ability.
- The second twist is that Microscopic Size-Changing can actually reduce the cost you pay to zero or even a negative number! When you recruit a Microscopic Size-Changing Hero with a negative cost, you actually gain that many Recruit points!
- Some Villains also have Microscopic Size-Changing. It works the same way, letting you fight that Villain for 2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> less for each card of the correct Hero Class you played this turn, up to the number of icons shown in the Microscopic Size-Changing ability.
- Likewise, if you fight a Villain with Microscopic Size-Changing and reduce its <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> value to a negative number, you gain that many <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> when you fight it!
- Microscopic Size-Changing is a type of Size-Changing, so any effect that mentions Size-Changing works with Microscopic

### Size-Changing {#keyword-size-changing}

### Momentum {#keyword-momentum}

- Some Villains say things like “Momentum 3.” This means “This Villain gets +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> if it entered another city space this turn.”

- This works on the turn the Villain enters the city. It also works on any other turn when it is pushed into another city space by another Villain, or by a special ability moving or swapping it to another space.
- The Mastermind Annihilus has the variant “Mass Momentum 2.” This means he gets +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Villain currently in the city that entered a new city space this turn. (This doesn’t include Villains who entered the Escape Pile this turn.)
- For both Momentum and Mass Momentum, it doesn’t matter how many different city spaces a Villain entered during a turn. It only matters if it entered any new city spaces at all.
- If a board gets complicated, with special abilities moving Villains around, some players like to shift Momentum Villains up a bit to help signal that they have entered a new space this turn.

### Moonlight and Sunlight {#keyword-moonlight-and-sunlight}

- Some Hero cards say things like “Moonlight: Draw a card.” Others say things like “Sunlight: You get +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .”
- Moonlight abilities work only when most of the Heroes in the HQ have odd-numbered costs. Likewise, Sunlight abilities work only when most of the Heroes in the HQ have evennumbered costs.
- Besides Heroes, some Villains also say they get extra <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> or abilities during Moonlight or Sunlight.
- If there are a tied number of odd and even-numbered Heroes in the HQ (perhaps because some HQ spaces were added or destroyed), then neither Moonlight nor Sunlight is in effect.
- Only the printed costs matter. Abilities that change the costs of Heroes in the HQ won’t affect Moonlight and Sunlight.
- “Haunted Heroes” are still Heroes, so they still count towards Moonlight and Sunlight. (Any Villains Haunting them don’t count, since they aren’t Heroes.)
- A “Divided Card” from Legendary ® : Civil War or other sets still counts as just one card for Moonlight/Sunlight.
- You can remember that Moonlight abilities love odd-numbered costs with the phrase “The odd ones come out at night...”

Manipulating Moonlight and Sunlight

- Clever players can recruit cards out of the HQ at crucial times to manipulate if it is Moonlight or Sunlight.
- When Villains escape, KO’ing Heroes from the HQ, you can also use this to shift towards Moonlight or Sunlight.
- In a game with many Moonlight and Sunlight effects, some players like to shift the odd-numbered cost cards in the HQ down a little bit, as shown here. This makes it easier to tell whether Moonlight or Sunlight is in effect.

### Outwit {#keyword-outwit}

- Some Heroes say things like “Outwit: Draw a card.”
- You can use this Outwit ability only if you reveal Heroes with 3 different costs.
- You can count the Outwit card itself. So you can reveal a 2-cost Hero in your hand, plus a 6-cost Outwit card and 0-cost S.H.I.E.L.D. Agent Hero you already played.
- Some Villains and Masterminds also say they get stronger or harm you in special ways if you fail to Outwit them. For example: “Ambush: If you can’t Outwit the Leader, play the top card of the Villain Deck.”
- You can choose not to Outwit, even if you are able.

### Patrol {#keyword-patrol}

- Some cards say things like “Patrol the Bridge: If it’s empty, draw a card.” You can use the specified Patrol ability only if the specified city space has no cards in it.
- If that city space becomes empty later in the turn, it’s too late to use the Patrol ability.
- If a card effect causes a city space not to exist, you can’t use Patrol abilities for that space.

### Phasing {#keyword-phasing}

This keyword represents Heroes becoming insubstantial and moving through solid objects.

- During your turn, if a card with Phasing is in your hand, you may swap it with the top card of your deck.
- This lets you get a different card instead, save a crucial Phasing card for the next turn, or set up a combo that cares about the top card of your deck.
- Many Phasing cards have effects that can be especially strong or weak in different situations. That way you can play them when they’re strong and Phase them away when they’re weak. You can also sculpt your hand towards Recruit or Attack.
- Swapping cards this way isn’t “playing a card,” or “drawing a card,” so it doesn’t count for other abilities that trigger on those things.

### Piercing Energy {#keyword-piercing-energy}

- Some Heroes give you a new kind of points called “Piercing Energy,” using the icon. You can fight a Villain or

Mastermind by spending points equal to that enemy’s printed Victory Points value ( ). You ignore that enemy’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> and any <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> modifiers.

- You can also ignore any special conditions for fighting that enemy, automatically rescuing any Human Shields.
- You can’t use Piercing Energy against cards that have no printed VP value, like Shadow-X Villains, or Master Strikes that become Villains.

### Poison Villains {#keyword-poison-villains}

- Poison Villains use Symbiote Bonds in a special way. For example, Poison Dr. Octopus says “Fight: This Symbiote Bonds with a Villain in the Bank. If already bonded or unable to bond, gain this as a Hero instead.”
- So Dr. Octopus enters the city as a normal Villain. When you fight him, if there’s a Villain in the Bank, then Poison Dr. Octopus will bond with that Villain. If there’s no Villain in the Bank, then you gain Dr. Octopus as a Hero instead, putting him In your discard pile.
- Once Poison Dr. Octopus becomes bonded, if you fight that Combined Villain, you choose one of the two Villains and do its Fight effect. If you choose Poison Dr. Octopus, then since he is currently bonded, you gain him as a Hero.
- When facing Poison Villains, be careful about when you fight them, so you can turn them into Heroes as soon as possible!

### Prey {#keyword-prey}

Some Villains say things like “Ambush: Prey on the fewest <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> .” After this Villain enters the Sewers, each player reveals their hand, and you check which player has the fewest <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> cards. (The current player decides how to break ties, including ties of 0 cards.) Put this Villain in front of that player, “Preying” on them.

- Any player may still fight that Villain as normal. However: if no player defeats that Villain by the end of the preyedon player’s turn, use that Villain’s “Finish the Prey” ability against that player, then that Villain enters the Sewers, ignoring its Ambush effects.
- Important: Do the “Finish the Prey” ability after that player draws their new hand at end of turn. Some players like to lean the Prey Villain on their deck as a reminder to Finish the Prey then.
- After Lady Deathstrike Finishes the Prey, or if you fight her while she’s Preying on a player, return her to the Mastermind space. You still take one of her Tactics if you fight her while she’s Preying.
- Multiple enemies can prey on a player at once.

### Reveal {#keyword-reveal}

If an effect says to reveal a card from the top of a deck, and it doesn’t say where to put that card afterwards, then that card stays where it was.

### Revenge {#keyword-revenge}

Some of the dudes in the “Deadpool’s Friends” Villain Group have the ability “Revenge for Deadpool’s Friends.” This means: “This Villain gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Attack for each ‘Deadpool’s Friends’ Villain in your Victory Pile.” So if I’ve killed two of them this game, the rest of them will have +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> attack during my turns. If my ladyfriend across the table hasn’t killed any yet, they won’t have any extra attack during her turns.

### Rise of the Living Dead {#keyword-rise-of-the-living-dead}

“Rise of the Living Dead” means “Each player checks the top card of their Victory Pile. If that card is a Villain with a ‘Rise of the Living Dead’ ability, that Villain reenters the city.”

- A Villain that reenters the city this way follows the same rules as any other Villain entering the city: First check if a Villain is pushed out to Escape, and resolve any Escape effects. Then do any Ambush abilities for the arriving Villain.
- However, note that a Villain returning to the city because a “Rise of the Living Dead” ability does NOT itself bring back additional Villains with its own Rise of the Living Dead ability – a single player does NOT do a chain reaction of many Villains returning at once. However, since each player is affected by Rise of the Living Dead, several Villains might still return when Rise of the Living Dead occurs – a maximum of one returning Villain per player. (This is a change from when this keyword appeared in Secret Wars, when chain reactions were allowed. This change affects the old Secret Wars expansion cards too.)
- When Rise of the Living Dead happens, it affects each player in order. The player whose turn it is resolves it first, including any potential Escapes, then any Ambush effects. When all of that is complete, then the next player in clockwise order resolves Rise of the Living Dead in the same way.
- So how do you stop Zombies from returning? By burying them deep! After fighting a Villain with Rise of the Living Dead, look for ways to put a card that doesn’t have Rise of the Living Dead on top of that zombie Villain, effectively ‘burying it.’ That way, the next time Rise of the Living Dead happens, nothing will return. You can do this by fighting a Villain that doesn’t have Rise of the Living Dead or Mastermind Tactic or rescuing a Bystander. You can also “Soulbind” the Rise of the Living Dead card to bind the zombie’s soul and prevent it from ever returning.

- Mastermind Tactics are never returned by Rise of the Living Dead. Zombie Scarlet Witch’s Tactics say “Fight: Before putting this Tactic in your Victory Pile, Rise of the Living Dead.” This means that fighting any Tactic with Rise of the Living Dead can return other Rise of the Living Dead Villains to the city. However, the Mastermind Tactics themselves are never returned, even if the top card of your Victory Pile was a different Mastermind Tactic with Rise of the Living Dead.
- If you put a Villain with Bystanders into your Victory Pile, you choose the order that all those cards go into your Victory Pile. So if you fight a Rise of the Living Dead Villain that had Bystanders, it’s smart to put the Bystanders on top.

### Sacrifice {#keyword-sacrifice}

Several Heroes say things like “ <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> Sacrifice: Take another turn after this one. Don’t play a card from the Villain Deck at the start of that turn.”

- This means “You may KO this card to use its Sacrifice ability only if you played another <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> Hero earlier this turn.”
- Sacrificing is always optional: you don’t have to use the Sacrifice ability and KO the card, even if you played the matching Hero Class earlier in the turn. However, if you don’t KO the Sacrifice card, you can’t use the Sacrifice ability.
- You still get the normal <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> , <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , and any non-Sacrifice abilities from the card, whether you Sacrifice it or not.
- You have to choose whether to Sacrifice the card at the moment you play it. You can’t wait then Sacrifice it later in the turn.
- If you Sacrifice it, you still “played it this turn,” for triggering abilities like “ <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> : You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> ,“ However, it’s no longer “one of your Heroes” or “a Hero you have,” since it has gone to the KO pile.

### Savior {#keyword-savior}

This keyword means “Use this ability if you have at least 3 Bystanders in your Victory Pile.”

- For example: “Savior: Draw a card.”
- If you defeat a Villain with Bystanders, put those Bystanders into your Victory Pile before checking any Savior ability on that Villain.
- If a Hero card rescues a Bystander, that Bystander counts towards any Savior ability on that Hero.

<span id="rule-shards"></span>
### Shards {#keyword-shards}

Shard tokens can be gained by players, Villains, and Masterminds. Many players like to personalize their Shards by using glass beads, wooden cubes, or plastic tokens instead.

There is no limit to the number of Shards that can be in the game at once.

- Players: When you gain a Shard, put it in front of you. You can spend a Shard to get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> (returning the Shard to the supply). You can use the Shard immediately, or you can keep it to use on any future turn. You can spend as many Shards as you wish in a single turn. Shards are not worth Victory Points.
- Villains: When a Villain gains Shards, put them on that Villain from the supply. That Villain gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Shard it has. After you defeat a Villain, you take one of its Shards. Return the rest to the supply. When a Villain escapes, the Mastermind gains one of the Shards on that Villain. Return the rest to the supply.
- Masterminds: When a Mastermind gains Shards, put them on that Mastermind from the supply. That Mastermind gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Shard it has. After you fight a Mastermind, you take one of its Shards. Return the rest to the supply. Then do the Fight effect on the Mastermind Tactic, which might give the Mastermind additional Shards for future fights.

Burning Shards As a new ability in this set, some Heroes say things like “Burn 2 Shards: Draw two cards.”

- This means: Once this turn, you may spend that many Shards to do the listed effect.
- You can wait to use this until later in the turn.
- You don’t get the normal +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> per Shard when you burn Shards this way.

### Shatter {#keyword-shatter}

Some Heroes say things like “Shatter a Villain in the Sewers.”

- This means “Halve that enemy’s current <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . (round up to the nearest whole number.)” This effect lasts until the end of this turn.
- You can shatter the same Villain multiple times, halving their <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> (rounding up) each time.
- “Shatter a Villain” can’t be used on a Mastermind.
- “Shatter the Mastermind” lasts for one fight against one Mastermind.
- A few cards even let you Shatter a Hero in the HQ, halving their current cost (round up) the same way.
- Technically, the Villain gets - <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to half its current <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . For example: Pestilence has 5 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> printed . Apocalypse says “Four Horsemen Villains get +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .” Shattering gives her -3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , from 7 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> to 4 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .

<span id="keyword-double-s-h-i-e-l-d-clearance"></span>
### S.H.I.E.L.D. Clearance {#keyword-s-h-i-e-l-d-clearance}

- If a Villain says “S.H.I.E.L.D. Clearance,” then you must discard a <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Hero as an additional cost to fight that Villain.
- Likewise, if a Mastermind has “Double S.H.I.E.L.D. Clearance,” then you must discard two <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Heroes each time you fight them.
- If you are playing with <img src="/img/icons/hero-teams/team-fantastic-four.svg" alt="Fantastic Four" class="rules-icon"> Heroes, you may discard them instead of <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Heroes.

### S.H.I.E.L.D. Level {#keyword-s-h-i-e-l-d-level}

- Your S.H.I.E.L.D. Level is the number of S.H.I.E.L.D. and/or HYDRA cards in your Victory Pile.
- Some cards say things like “ S.H.I.E.L.D. Level 2: Draw a card.” You can use this ability only if your S.H.I.E.L.D. Level is 2 or higher.
- This counts any card with the <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> or <img src="/img/icons/hero-teams/team-fantastic-four.svg" alt="Fantastic Four" class="rules-icon"> team icons, as well as any card with “S.H.I.E.L.D.” or “HYDRA” in its card name, Villain Group name, or Mastermind name. So this includes S.H.I.E.L.D. Assault Squads, HYDRA Kidnappers, HYDRA High Council Tactics, etc.
- This never consumes the cards in your Victory Pile - it just checks to make sure you have them.
- Heroes that use S.H.I.E.L.D. Level all have ways to get the needed cards into your Victory Pile. Note: When playing with HYDRA Villain Groups and/or multiple Heroes that use S.H.1.E.L.D. Levels, your S.H.I.E.L.D. Levels will naturally be higher.

### • Some Hero cards say things like “Size-Changing: <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> .” This {#some-hero-cards-say-things-like-size-changing-icon-7-this}

means “You can recruit this card for 2 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> less if you

### played any <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> cards this turn.” {#played-any-icon-7-cards-this-turn}

- Likewise, some Villain cards say things like “Size-Changing: <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> .” This means “You can fight this Villain for 2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> less if you played any <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> cards this turn.”
- The Size-Changing card’s cost is only changed during the moment you are recruiting it, not other times.

### Smash {#keyword-smash}

- Some Heroes say things like “Smash 3.” This means “You may discard another card from your hand. If you do, you get +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .”

### Soulbind {#keyword-soulbind}

Some cards say things like “ <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> Soulbind: You get + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to that Villain’s printed Victory Points.”

- This means “If you have played a <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> Hero earlier this turn, you may choose a face up Villain card from your Victory Pile, turn it face down, and put it on the bottom of your Victory Pile. If you do, then do the listed Soulbind effect.” At the end of the game when you are counting Victory Points, turn all those face down cards face up again and you can count their Victory Points. But until the end of the game, the face down cards count as not being in your Victory Pile at all.
- This is a great way to stop Rise of the Living Dead Villains from coming back to life out of your Victory Pile. The face down card can’t be used for another Soulbind effect later. The face down card can’t help you against Cross-Dimensional Rampages. It doesn’t count for effects that count the number of cards or Villains in your Victory Pile. Act as if the face down card is no longer in your Victory Pile at all, until you are counting Victory Points at the end of the game.
- Some cards ask you to Soulbind more specific things, like “Soulbind a Henchman” or “Soulbind six Villains.”
- Using Soulbind is usually optional. You generally don’t have to use Soulbind if you don’t want to, whether on a Hero card you played or a Villain you just fought. However, some cards explicitly say that you “must Soulbind,” which means you have to do it.

### Soaring Flight {#keyword-soaring-flight}

“Soaring Flight” means “When you recruit this Hero, set it aside. At the end of this turn, add it to your new hand as an extra card.”

### Spectrum {#keyword-spectrum}

Some cards have abilities like “Spectrum: Draw a card.” You can use a card’s Spectrum abilities only if you have at least 3

### classes of Hero. (e.g. <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> , <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> , and <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> ) {#classes-of-hero-e-g-icon-9-icon-7-and-icon-5}

- Grey S.H.I.E.L.D. Heroes, HYDRA Allies, New Recruits and Sidekicks don’t have classes, so they don’t help.
- You can count all the classes you have among cards you played this turn and cards in your hand.
- Multiclass cards work especially well with Spectrum.

<span id="keyword-double-striker"></span>
<span id="keyword-triple-striker"></span>
### Striker {#keyword-striker}

This keyword means “This gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Master Strike in the KO pile and/or stacked next to the Mastermind.”

- A couple of Hero cards also have the Striker ability and give you + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> the same way.
- A couple of cards say “Double Striker,” meaning they get +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> per Strike, or even “Triple Striker” meaning +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> per Strike.

By default, most Master Strikes go to the KO pile when they occur. However, some Masterminds specifically put their Master

Strikes in unusual places. Striker also counts all face-up Master Strike cards in any of these unusual places. For example, for these Masterminds:

- Galactus–Count Master Strikes in the city.
- Macho Gomez–Count Master Strikes in front of all players.
- Deathbird–Count Master Strikes in the city, Escape Pile, and all players’ Victory Piles.
- Mysterio–Count Master Strikes in all players’ Victory Piles. Don’t count Master Strikes shuffled into his Tactics, since they’re not face up.

Sunlight See “Moonlight and Sunlight.”

### Symbiote Bonds {#keyword-symbiote-bonds}

- Some Villains say things like “Ambush: A Henchman Villain from your Victory Pile Symbiote Bonds with Lasher.”
- This means stack this card onto the specified Villain, combining them into a single Villain with both cards’ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> and text added together.
- To fight a Combined Villain, you must spend the total <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> of both Villain cards combined. Rescue all Bystanders that Combined Villain had. Then put either one of the Villain cards from that Combined Villain into your Victory Pile and do that card’s Fight effect. The other card from that Combined Villain stays in that city space, and you don’t do its Fight effect.
- If a Combined Villain escapes, it’s only a single escape, so it only KOs one Hero that costs 6 or less from the HQ. (If it’s carrying any number of Bystanders, it makes all players discard a single card as normal.) Do the Escape abilities of both those Villain cards in any order. Once in the Escape Pile, they are two unattached Villains again.
- Keep one card of the Combined Villain tucked under the other, so you can see both cards’ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> and text.
- Since a Combined Villain has the text of both its Villain cards, it can get extra <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> or restrictions from various special abilities on either of its cards. It also counts as both cards’ Villain Groups.
- Symbiote Bonds never combine more than two Villains in the same city space. Ignore any effect that would combine a third Villain in that space.
- Once two Villains are bonded, only fighting can break them up. Other Symbiote Bonds abilities can’t break up a Combined Villain to attach one of the cards to something else.
- If a Symbiote Bonds ability puts a new Villain card into the city from the Villain deck, Escape Pile, Victory Pile, etc., do any Ambush ability on the newly entering card. However, that Ambush ability won’t be able to break up a Combined Villain or add a third card to it.
- If a special ability automatically “defeats” a Combined Villain, you still put just one of its cards into your Victory Pile and to that card’s Fight effect.
- A combined Villain has the VP of both its cards combined. So you can spend Piercing Energy (from Legendary®: X-Men) equal to both cards’ total combined VP to fight the Combined Villain, putting one of its cards into your Victory Pile as normal.

### Switcheroo {#keyword-switcheroo}

- Some Hero cards say things like “Switcheroo 4.”
- This means “You can reveal this card from your hand and put it on the bottom of the Hero Deck. If you do, you may put a Hero of the specified printed cost from the HQ into your hand.”
- So when you have a Switcheroo card in your hand, you can choose to play it for its normal <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> , <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , and other effects. Or you can choose to permanently swap it for another card in the HQ instead.
- You use Switcheroo instead of playing the card. So when you Switcheroo, you don’t get any <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> , <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , or other effects from the Switcheroo card that you put on the bottom of the Hero Deck.
- Remember: You put the Switcheroo card on the bottom of the collective Hero Deck on the board - not your personal deck.
- It’s totally fine to Switcheroo into a card of a different Hero Name.
- You can only use Switcheroo during your turn, when you could play cards from your hand. So you can’t use it during other players’ turns, and you can’t use it while playing a card from the Villain Deck, like during a Master Strike, Scheme Twist, or Villain’s Ambush ability.
- You can’t Switcheroo into S.H.I.E.L.D. Officers or Sidekicks, since they aren’t in the HQ.
- Switcheroo doesn’t count as “recruiting” a Hero, so you can’t use abilities like Wall-Crawl or Soaring Flight when you
- Switcheroo uses the “printed cost” of cards in the HQ, so even if special abilities make cards in the HQ cost more or less, Switcheroo still uses the cost number literally printed on the card.

### Tactical Formation {#keyword-tactical-formation}

Some Heroes say things like “Tactical Formation 445: You get +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .”

- You can use this ability only if you have two Heroes that cost 4 and one Hero that costs 5.
- You can count the “Tactical Formation” card itself.
- “Heroes you have” includes Heroes in your hand and Heroes you already played this turn (unless they have been put

somewhere else, like the KO pile or bottom of the Sidekick stack.)

### Teleport {#keyword-teleport}

- “Teleport” means “Instead of playing this card, you may set it aside. At the end of this turn, add it to your new hand as an extra card.”
- Some abilities teleport other cards from your hand, setting them aside in the same way.

### Throne’s Favor {#keyword-thrones-favor}

- Some Heroes say “You gain the Throne’s Favor.” When this happens, take a nearby object to represent the Throne’s Favor, like a coin, key, miniature, or pawn. There is only ever one Throne’s Favor in the game. If another player or Mastermind already has the Throne’s Favor, and you gain it, then you take it from them.
- If an ability tells you to gain the Throne’s Favor, you must take it. You cannot leave it where it is.
- Some Heroes say things like “You may spend the Throne’s Favor to get +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .” This means if you have the Throne’s Favor, you may give it up to use the listed ability. You set aside the Throne’s Favor object, and no one has the Throne’s Favor until someone gains it again.
- You can only spend the Throne’s Favor at the moment the card you’re playing tells you to do so. You can’t wait and spend it later in the turn.
- The Throne’s Favor is not a card. It never goes into decks or discard piles. Instead, when it comes up, just use whatever cool object is easily at hand. There’s no need to store a special Throne’s Favor object with the game.
- Cards can also cause the Mastermind to gain the Throne’s Favor and/or benefit from having it. When the Mastermind gains the Throne’s Favor, they take it away from any player that may already have it. Likewise, a card ability that causes a player to gain the Throne’s Favor will take it away from the Mastermind and give it to the player. Some Ally cards are “Thrown Artifacts”. These are Artifact cards that a player can “throw” at the perfect moment. When you gain an Ally card that’s an Artifact, put it into your discard pile like any other Ally. When you draw that Artifact later in the game, you may play it in front of you when the time comes. This means you “control” that Artifact. At the end of your turn, when you discard all the cards you played that turn, the Artifacts you control stay in front of you for future turns and are not discarded.
- To “Throw” a Thrown Artifact, put it on the bottom of your deck and use its ability.
- You can throw it on the same turn that you play the Thrown Artifact, or you can wait until a later turn.
- If you use this when your deck has not many cards left, you might draw the Thrown Artifact again quite soon. (Much like Thor’s hammer, a Thrown Artifact can return to your hand very quickly!)
- You can control multiple Artifacts with the same card name.
- You can throw as many Artifacts as you want in a turn, including multiple Artifacts with the same card name.
- You can only throw during your turnturn (unless it specifically says otherwise).
- If a card effect like Rogue, Hulkling, or Scarlet Witch would let you “copy” an Artifact card, you can use that Artifact’s “Once per turn” or “When you throw this” ability once, and there is no other effect. (Don’t put anything on the bottom of your deck.)

### Transform {#keyword-transform}

- Each Hero in the World War Hulk set has some special “Transformed” cards that go along with it. When you use these Heroes, don’t shuffle their “Transformed” cards into the Hero Deck. Instead, set them aside in a special Transformation Pile. You can’t recruit cards from this pile. Instead, you transform other cards into them.
- Some Hero cards like “Bruce Banner: Gamma Ray Experiments” say things like “...Transform this into Savage Hulk Unleashed.”
- When you play a Hero card that says it transforms into another card, you complete all effects on the card you played and get its normal <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> and <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- Then remove the transforming card from the game (putting it in the Transformation Pile) and put the newly transformed card into your hand instead (from the Transformation Pile). You can play the new Transformed card immediately that same turn.
- You still count as having played the transforming card you played and removed from the game, including effects like “You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card you played this turn.” But if an effect asks you to reveal one of your cards, you can only reveal the new, transformed card, not the old card that you removed from the game.
- Some transforming cards tell you to put the new card on top of your deck or in your discard pile instead.
- You can look through the Transformation Pile at any time.
- At the end of the game, store a Hero’s Transformed cards with the rest of that Hero’s cards. To start a game, you only need to bring out the Transformed cards for the Heroes you’re using. Don’t bring out all the Transformed cards in the entire game.
- If you sleeve your cards, you can put the Transformed version of the card in the same sleeve, behind the Transforming card. When

it’s time to transform, you just pull the back card to the front of the sleeve. It’s a little thicker in the sleeve, but it still shuffles well.

### Ultimate Abomination {#keyword-ultimate-abomination}

“Ultimate Abomination” means “This Mastermind gets + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to the total printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> of all the Heroes/Allies in the HQ/Lair.”

### Undercover {#keyword-undercover}

- Some cards say things like “You may send one of your other Heroes Undercover.” This means “Put that Hero into your Victory Pile. It’s worth 1 Victory Point.”
- This can help get your starting S.H.I.E.L.D. Agents and Troopers out of your deck so that you draw your more powerful Heroes more often.
- If you play a card that sends itself Undercover, you still get to use its <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> , <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , and other abilities.
- As <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Heroes, Black Widow and Yelena Belova work especially well with the Undercover <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Heroes in the Legendary ® : S.H.I.E.L.D. set.

Unleash from Undercover

- When an effect says to “Unleash a Hero from Undercover”: Return that Hero from your Victory Pile to your hand.
- If you have several cards Undercover with a trigger like “When you fight a Villain, you may Unleash this card from Undercover,” fighting one Villain is enough to Unleash any number of those cards.
- When you Unleash a Hero back to your hand, you can play that Hero on that same turn as normal. At the end of your turn, it will go to your discard pile as normal. It doesn’t return to your Victory Pile unless an effect tells the card to go Undercover again.
- If you Unleash cards based on fighting Villains or the Mastermind, you can do the Unleash effects and/or Fight effects from that enemy in any order.

When Recruited: Send This Undercover

- “When Recruited” means: “Do this ability when you recruit this Hero.”
- In this case, you pay the Hero’s normal recruit cost, put it in your Victory Pile worth 1VP, and refill that HQ space with a card from the Hero Deck.
- Other abilities Unleash the card at the right time.
- If you recruit a Hero with multiple effects elling you to put it in different places (like Wall-Crawl, Soaring Flight, “When Recruited: Send this Undercover,” etc.), you choose which one applies.

### Uru-Enchanted Weapons {#keyword-uru-enchanted-weapons}

- When you try to fight an Enemy that has some number of Uru-Enchanted Weapons, reveal that many cards from the top of the Villain Deck. That Enemy immediately gains + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to the total Victory Points of all the cards you revealed.
- If you have at least as many <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> points as the Enemy’s improved <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , use them and defeat the Enemy as normal. If you don’t have enough <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> points, you don’t defeat this Enemy, you lose all your <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> points, and you can’t use fight anymore this turn. (You can still play cards and recruit – you just can’t fight or Heal Wounds.)
- Whether you defeat that Enemy or not, put all the cards you revealed from the Villain Deck on the bottom of that deck in random order.
- Once you start to fight an Enemy, you can’t play any more cards until after that fight is complete. Remember to generate all the <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> you can before you fight them!
- Flipping cards for Uru-Enchanted Weapons cannot end the game. If you run out of cards in the Villain Deck, shuffle the cards you’ve revealed so far and keep revealing. (If there are no cards left in the Villain Deck there is no bonus.)

### Fight or Fail {#keyword-fight-or-fail}

Enemies with Uru-Enchanted Weapons sometimes also say things like “Fight or Fail: KO one of your Heroes.”

- Do the “Fight or Fail” effect if you successfully fight that Enemy or if you try to fight them but the Uru- Enchanted Weapons’ bonus causes you to fail.
- You can’t try to fight an enemy unless you have enough <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> points to match its printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .

### Versatile {#keyword-versatile}

- “Versatile 2” means “You get +2 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> or +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .” Other cards use different Versatile numbers.
- You choose to get all <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> or all <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> when you play the card. You can’t divide it up.
- However, if you play multiple Versatile cards in a turn, you can choose <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> for some cards and <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for others, if you wish.
- If you use Cheering Crowds to play a Versatile card twice, you could get <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> with one play and get <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> with the other play, or choose the same for both. As a new twist on the Artifacts introduces an all-new card type: “Villainous Weapons.” Villains and Masterminds can capture these ancient weapons to become even more powerful. But if you defeat them, you can seize those weapons to use as Artifacts of your own.

- Each Villain Group in this set includes cards that say “Villainous Weapon.” These are not Villains.
- When a Villainous Weapon is played from the Villain Deck, the Weapon is captured by the Villain in the city that’s closest to the Villain Deck. If there are no Villains in the city, then KO the Weapon instead.
- Villainous Weapons empower the Villain holding them, adding the <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonus printed on the Weapon. Tuck the Weapon under the Villain so you can see the Weapon’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonus right under the Villain’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- An enemy can use any number of Weapons at the same time, getting all of their bonuses combined.
- When a Villain with any number of Villainous Weapons escapes the city, the Mastermind captures all those Weapons, getting their bonuses <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- When you fight a Villain or Mastermind holding any number of Weapons, put all those Weapons into your discard pile as Artifacts.
- When you have a Villainous Weapon in your hand, you can play it just like any other Artifact.
- You never get the Weapon’s printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonus when you play the Artifact or control it. Only Villains and Masterminds get that <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonus. You only get the specific Artifact abilities written on the card.
- Villainous Weapons you have captured as Artifacts have O cost, have no color or Hero Class, and don’t count as Hero cards or Villain cards. Since they have no cost, Villainous Weapons can never make you Worthy. (How appropriate…)
- If you have gained a Villainous Weapon, and a card effect makes an enemy capture that Weapon again, then it works as a Villainous Weapon again until someone defeats that enemy to reclaim it.
- Malekith and Hela both have Mastermind Tactics that turn into Villainous Weapons. You win when the Mastermind has no face down Tactics left under them, even if there are still some Tactics that have turned into other card types somewhere.

### Waking Nightmare {#keyword-waking-nightmare}

- Some cards tell you to “have a Waking Nightmare.” This means “Discard a non-grey Hero from your hand. If you discard a Hero this way, draw a card.”
- Getting pummeled by Waking Nightmares can downgrade your hand from powerful superheroes to mere S.H.I.E.L.D. Agents. However, you can sometimes find new courage in a nightmare: you may be able to discard a non-grey Hero you don’t need very much and have a chance to draw something more helpful.
- Some Mirage Hero cards also let you have a Waking Nightmare and give you specific benefits for it.

Conflicting Card Abilities When two card effects tell you to do different things with a card at the same time, you can choose which to do. So when you discard Empathic Link to Belasco or the Demon Bear, you can use the Empathic link ability to set itself aside instead of letting Belasco KO it or the Demon Bear capture it. The Demon Bear will capture another player’s discarded Hero instead. When you discard Empathic link to a Waking Nightmare and set it aside, you still draw a card for the Waking Nightmare.

“Your Cards” and “Cards You Have” Remember that the phrases “your cards” and “cards you have” include both cards in your hand and cards you played this turn. (They don’t count cards in your deck or discard pile.) So when Emma Frost and Empath say they “get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each grey Hero you have,” that includes both grey Heroes in your hand and grey Heroes you played this turn.

### Wall Crawl {#keyword-wall-crawl}

“Wall-Crawl” means “When you recruit this Hero, you may put it on top of your deck.” This popular keyword returns from the Marvel Legendary®: Paint the Town Red expansion. You can also use it to set up powerful combos that care about the top card of your deck.

### Weapon X Sequence {#keyword-weapon-x-sequence}

- On a hero, “Weapon X Sequence” means “you get + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to the longest sequence of different printed cost numbers on your cards.”
- “Your cards” includes both cards you’ve played this turn and cards in your hand, so you can count both.
- For example, say your cards have the costs 0,4,2,7,3,3. Then each time you played a card with the Weapon X Sequence ability, you would get +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , since your longest sequence of different cost numbers is 2-3-4.
- Each number in the sequence must be one higher than the previous number. Your sequence can start with any number, including 0. You can’t skip any number in the sequence. Having duplicates of the same cost doesn’t help. If your costs are 0,0,0,4,4,6 then your longest sequence is 1 and you would get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> 
- After you play a Weapon X Sequence card, if you draw more cards later in the turn that would have extended your sequence, it’s too late to go back and get more <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> from the Weapon X Sequence you already played.
- ‘Doubled Weapon X Sequence” means double the bonus.
- Build your deck carefully to get long sequences!

- On enemies, Weapon X Sequence means “This enemy gets + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to the longest sequence of different printed cost numbers among cards in the HQ.”
- For example, say the Heroes in the HQ have printed costs 4,7,5,3,2. Then Weapon X Sequence gives an Enemy +4 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> (for the sequence 2-3-4-5).
- It doesn’t matter which HO spaces those cards are in or if any of them are physically in any particular order.
- One clever move is to recruit a Hero from the HO at the right time, disrupting an Enemy’s Weapon Sequence before you fight them. Take the above example where Heroes in the HQ have printed costs 4,7,5,3,2. If you recruit the 3-cost Hero and it gets replaced with a 5-cost Hero, you’ve reduced the Enemy’s Weapon X Sequence bonus from +4 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> to +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . A card’s “printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> ” means the number literally printed inside the card’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icon. Ignore any <img src="/img/icons/rules-extracted/icon-33.svg" alt="game symbol" class="rules-icon"> or \* symbols or special abilities that would modify that number. So if a card’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icon says 2 or 2+ or 2*, its “printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> ” is 2. Cards with cost 3 or 3* both have the same printed cost: 3.
- So, for Weapon X Sequence, if your cards cost 3,3,0,5,4*, and 6, your Weapon X Sequence gives +4 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .

### “When Recruited” Abilities {#keyword-when-recruited-abilities}

- Some Heroes say things like: “When Recruited: You get +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .” Use this “When Recruited” ability immediately when you recruit this Hero.
- You pay the Hero’s normal recruit cost, move it from the HQ into your discard pile, and refill that HQ space with a card from the Hero Deck. When all that is done, then you must use the “When Recruited” ability.
- When you play that card from your hand in later turns, don’t use the “When Recruited” ability again. Instead, use the card’s normal abilities, <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> , and <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . A horizontal line separates the “When Recruited” ability from the card’s normal abilities.
- If a special ability tells you to “gain” a Hero or “put” a Hero somewhere, then you don’t use that Hero’s “When Recruited” ability, since you didn’t pay <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> and you didn’t recruit that Hero. This is true even if the special ability tells you to “gain the Hero from the HQ.”
- However, you do use the “When Recruited” ability if a special ability lets you “recruit a Hero for free” or recruit it at a reduced cost or from some unusual place, since then you are still recruiting the Hero.
- You may wish to keep some Heroes In the HQ until you especially need their “When Recruited” ability.

### What If...? {#keyword-what-if}

Some Hero cards say things like “What If...?: You get +3 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> .”

- This means “Choose a Hero Class or Hero Name.Then reveal the top card of your deck, and either put it back on top of your deck or discard it. If the revealed card had the Hero Class or Hero Name you chose, then do the What If effect.”
- What If...? is not allowed to trigger on 0-cost grey starting cards like S.H.I.E.L.D. Agent or S.H.I.E.L.D. Trooper, so don’t choose those Hero Names.
- Even if a What If...? ability misses, it’s still valuable to be able to choose to put your top card in your discard pile or not. For example, it can give you key information about your top card so you know what to choose with your next What If...? card that turn. Or if the top card is a S.H.I.E.L.D. Agent, you can discard it so you have a chance to hit with your next What If...? ability that turn and so you don’t have to draw it next turn.
- If you choose a Hero Name like “Black Widow,” that will trigger on any card whose Hero Name is literally “Black Widow” as well as any Hero Name that contains “Black Widow”, such as “Apocalyptic Black Widow.” However, you have to choose an actual Hero Name. You can’t choose just the word “Captain” and trigger on both Captain America and Captain Carter cards, since the single word “Captain” isn’t a Hero Name.

Increasing Your Chances with What If...? There are lots of ways you can increase the chance that your What If...? abilities will work:

- First: There are several cards that let you reveal the top card of your deck or put a card on top of your deck, so that you know what to choose with What If...?.
- Second: You can try focusing your deck on a single Hero Class or single Hero Name.
- Third: Collecting lots of What If...? cards can let you see the top card with the first What If...?, so you know what to guess with the rest of your What If...? abilities that turn.
- Fourth: You can look for ways to KO your 0-cost starter cards and avoid or KO Wounds.

### Worthy {#keyword-worthy}

Some Hero cards say things like “If you are Worthy, draw a card.”

- You are Worthy if you have a Hero that costs 5 or more.
- As usual, the phrases “your Heroes” and “Heroes you have” include both cards in your hand and cards you have played this turn. They also include Hero Artifacts you control. (Heroes in your deck and discard pile don’t count.)
- Some Villains and Schemes also check if you are Worthy and reward or punish you accordingly.
- When you consider whether to recruit a card that asks you to be Worthy, you may find yourself hesitating, wondering whether

you truly have enough to prove Worthy at the crucial moment. This is a great fit to how Thor and other Heroes question whether they will be Worthy at the crucial moment in Marvel stories.

### Wound {#keyword-wound}

Some Hero cards say things like “Wound a Villain.”

- To do this: Put a Wound onto a Villain from the Wound Stack or from the KO pile. A Villain gets -1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Wound on it. When that Villain is defeated or leaves the city, return all Wounds on it to the Wound Stack.
- If a Villain has 0 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> or negative <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , they don’t disappear automatically, but you can fight them during your turn by spending 0 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . (If you fight a Villain with negative <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , you won’t get a refund.)
- Some cards specifically say they Wound the Mastermind. This works the same way, with all of the Mastermind’s Wounds returning to the Wound Stack after a Mastermind Tactic is fought. The Wounds go away even if the Mastermind Tactic tells you to shuffle the Tactic back into the Mastermind’s other Tactics or put the Tactic somewhere else.
- Killmonger has 5 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> and says “While Killmonger has more than 0 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , you cannot fight him. Instead, you may spend <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to his <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> to Wound h,m and get +1 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> .” So players will have to spend 5 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , then 4 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , 3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , 2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , and 1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , getting 5 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> along the way. Then a player can fight him at 0 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> to take a random Tactic, remove Killmonger’s Wounds (and not get +1 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> ). Malice and Preyy work similarly. You can Wound them this way multiple times per turn. This does not count as a “Fight.” Don’t rescue captured Bystanders. You can still use the “Healing” ability on your own Wounds the same turn you Wound an enemy this way.
- If your Wound Stack contains different kinds of Wounds, like the Grievous Wounds from Legendary®: Civil War, then whenever you return Wounds to the Wound Stack, put them on the bottom. Wounds on enemies are face up.
- If an effect causes “each player” to gain a Wound (or do anything else), start with the current player then go clockwise.

### Wounded Fury {#keyword-wounded-fury}

- When a Hero card says “Wounded Fury,” it means “You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Wound in your discard pile.”
- Likewise, when a Villain or Mastermind says “Wounded Fury,” it means “It gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Wound in your discard pile.”

### X-Gene {#keyword-x-gene}

- Some Heroes say things like “X-Gene <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> : You get +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .” This means “If you have a <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> card in your discard pile, you get +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .” You can use a card’s X-Gene ability only if you have the specified kind of card in your discard pile.
- You can only use a card’s X-Gene ability once, no matter how many matching cards you have in your discard pile.
- Remember: when you play a card during your turn, it stays in front of you until the end of turn. Then all the cards you played that turn go to the discard pile. So if you have an empty discard pile, you can’t play a <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card from your hand, then immediately play a card with “X-Gene <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> ” and use that X-Gene ability.
- One cool combo is to recruit a <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> Hero into your discard pile, then play your “X-Gene <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> ” card, and you’ll get to use its X-Gene ability.

### X-Treme Attack {#keyword-x-treme-attack}

“X-Treme Attack” means “This Adversary gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each other Villain/Adversary in the city with X-Treme Attack.” This ability shows how some enemies are especially powerful when they work as a team.

## Card Clarifications {#card-clarifications}

The following are specific card clarifications printed in rulebooks to date.

#### Adrian Toomes {#adrian-toomes}

(Mastermind - Spider-Man Homecoming) When his Master Strikes make Villains use their Escape abilities, they don’t actually leave the city or KO Heroes from the HQ.

#### Arnim Zola {#arnim-zola}

(Mastermind - Captain America 75th Anniversary) Zola often checks for Heroes that have “less than 2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> printed.” If you need to check a card for a value, and the card doesn’t have that value, then it counts as 0. So cards that don’t have a printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icon count as having “less than 2 printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .”

#### Bathe Earth in Cosmic Rays {#bathe-earth-in-cosmic-rays}

(Scheme - Fatastic Four) If you KO a Hero during a Twist, and there are no Heroes in the HQ of the appropriate cost, you gain nothing.

#### Build an Underground Mega-Vault Prison {#build-an-underground-mega-vault-prison}

(Plot - Villains) When a card effect like this one causes an Adversary to enter the city in an unusual way, you do that Adversary’s Ambush effect as normal. Adversaries entering the Sewers this way don’t push any other Adversaries out of the city.

#### Bystanders that become Villains {#bystanders-that-become-villains}

If you defeat them, you still get any “rescue” effects on Special Bystanders. They count as Bystanders in your Victory Pile, not Villains.

#### Cage Villains in Power-Suppressing Cells {#cage-villains-in-power-suppressing-cells}

(Plot - Villains) The Cops stacked next to the Plot don’t count as one of the Backup Adversary Groups in the Adversary Deck.

#### Casual Bank Robbery (Black Cat) {#casual-bank-robbery-black-cat}

(Hero - Paint the Town Red) You can only use the bonus +1 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> once per turn.

#### Chameleon (Sinister Six) {#chameleon-sinister-six}

(Villain Group - Paint the Town Red) You copy the <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> , <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , and special abilities of that Hero card, but you don’t actually play that Hero card. So you won’t trigger Superpower Abilities of cards you play later in the turn.

#### Change the Outcome of WWII {#change-the-outcome-of-wwii}

(Scheme - Captain America 75th Anniversary) Start in the normal city, not a country. As you enter new countries, you can use the Scheme card to mark the new edge of the city. In smaller

countries, omit the Bridge first, then the Streets, etc. If Evil conquers a country’s capital, you still stay in that country until the next Scheme Twist comes up. Sometimes you might enter a new country, then play additional Villain cards and enter another country right away.

#### Charles Xavier, Professor of Crime {#charles-xavier-professor-of-crime}

(Mastermind - Noir)

- You can’t recruit Heroes that have Hidden Witnesses on them until someone pays to rescue those Hidden Witnesses.
- Those Hidden Witnesses still count as Bystanders to increase Charles Xavier’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .
- If a Hero in the HQ is KO’d by an escaping Villain or leaves the HQ because of some special ability, then KO any Hidden Witnesses on that Hero.

#### The Clone Saga {#the-clone-saga}

(Scheme - Paint the Town Red) “Henchman Villains” are still Villains. So if 2 Henchman Villains with the same card name escape, Evil Wins.

#### Crown Thor King of Asgard {#crown-thor-king-of-asgard}

(Plot - Villains) Put the Thor Adversary next to this Plot whether or not the rest of the Avengers are in the Adversary Deck. When Thor overruns during this Plot (whether naturally or because of a Plot Twist), he creates several effects:

- Thor KOs an Ally from the Lair that costs 6 or less, just like any Overrun.
- Each player discards a card because Thor was guarding Bystanders.
- Do the Overrun ability on Thor’s card.
- Stack a Plot Twist from the KO pile next to the Plot, as the Plot says.

#### Detonate the Helicarrier {#detonate-the-helicarrier}

(Scheme - Dark City) During a Scheme Twist, keep KO’ing Heroes from the same HQ space until that space is “Destroyed.”

#### Diving Catch (Angel) {#diving-catch-angel}

(Hero - Dark City) A “card effect” is anything written on a card. When Bystanders are carried off by Villains, that discard is a game rule, not a card effect, so you can’t use Diving Catch then.

#### Ego, the Living Planet {#ego-the-living-planet}

(Mastermind - Marvel Studios’ Guardians of the Galaxy) Ego can change the number of city spaces. This doesn’t affect the number of HQ spaces. While there are fewer than 5 city spaces, you can mark this by moving the Mastermind to cover the destroyed city spaces. While there are more than 5 city spaces, you can put Master Strikes above the new city spaces to show where they are. Don’t combine Ego with a Scheme that also changes the number of city spaces.

#### Eighth Time’s a Charm (Dr. Octopus) {#eighth-times-a-charm-dr-octopus}

(Ally - Villains) This card says “If this is the eighth card you played this turn, you get +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .” Discarding cards through their “Dodge” abilities doesn’t count towards this, since you are not “playing” those Dodge cards, just discarding them. Playing New Recruits and returning them to the Recruit Stack does count, since you are playing those cards. Bindings and Wounds don’t count towards this, since you don’t “play” them, you just use their Betrayal or Healing abilities from your hand. The best way to use Eight Arms is to play cards that let you draw extra cards, like some of Dr. Octopus’ other cards.

#### Everybody Hates Deadpool {#everybody-hates-deadpool}

(Scheme - Deadpool) Besides just being true, this is the name of a Scheme. Henchmen are a kind of Villain, so if you are using the Henchmen Groups Hand Ninjas and Half-Eaten Burrito Warriors, then the Hand Ninjas will have “Revenge for Hand NInjas”, and the Half-Eaten Burrito Warriors will have “Revenge for Half-Eaten Burrito Warriors.” Masterminds don’t count as Villains though, so they won’t get Revenge here. at least not literally.

#### Fear Itself {#fear-itself}

(Plot - Fear Itself) Put the 6th-8th Ally cards in a second row under the lair. They’re not under any specific city space. If a reduction of Fear level results in an Ally in the top Lair row to be KO’d, all cards in the top Lair row shift to the left and the left card of the bottom Lair row moves to the right side of the top Lair row. Once the Fear Level is below 5, do not shift any cards when an Ally gets KO’d.

#### Forge the Infinity Gauntlet {#forge-the-infinity-gauntlet}

(Scheme - Guardians of the Galaxy) When card effects like this Scheme cause Villains to enter the city at an unusual time, do the normal Ambush effects.

#### Fulfill the Contract (Bullseye) {#fulfill-the-contract-bullseye}

(Ally - Villains) When you “Choose an Adversary Group,” you can choose an Adversary Group like “Avengers” or “Uncanny Avengers”, or you can choose a Backup Adversary Group like “Multiple Man” or “Cops.” But you can’t choose the word “Backup” and count both Multiple Man and Cops. Likewise, you

can’t choose “X-Men” and count both X-Men First Class and Uncanny X-Men.

#### Galactus {#galactus}

(Mastermind - Fantastic Four) Galactus’ Master Strike destroys a city space. Any Villain in that city space escapes. From then on, the city is smaller. Whenever Villains are pushed out of the new end space of the city, they escape as normal. Villains can’t move into destroyed city spaces.

- If a city space like the Rooftops is destroyed, act as if that city space no longer exists, and the word Rooftops is not written on the board anymore. So card effects won’t do anything that say “If there is a Villain on the Rooftops... “ or “Move a Villain to the Rooftops...” or “If the Rooftops are empty....”.
- For example, if Galactus destroys the “Streets” space, then the Burrow ability won’t do anything anymore. If Galactus destroys the “Bank” space, then the Bank sentence from the Midtown Bank Robbery Scheme won’t do anything anymore.

#### Hidden Heart of Darkness {#hidden-heart-of-darkness}

(Scheme - Noir) This Scheme shuffles Mastermind Tactics into the Villain Deck as Villains. These Tactics don’t get <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> bonuses from abilities that increase the Mastermind’s own <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . When you fight these Tactics, they become normal Mastermind Tactics in your discard pile, not Villains. If a special effect would try to shuffle a Tactic back into the Mastermind’s Tactics during this Scheme, ignore it.

#### Infinity Gems {#infinity-gems}

(Villain Group - Guardians of the Galaxy) The “Guardians of the Galaxy” expansion contains a unique new Villain Group called “Infinity Gems.” This represents Thanos himself wielding the power of the Infinity Gems and defending them from Heroes. Infinity Gem Villain cards act just like any other Villains in the city. However, when you fight an Infinity Gem, you put it into your discard pile as an Artifact card.

- Infinity Gems you’ve defeated have 0 cost, have no color/Hero class, and don’t count as Hero cards or Villain cards.
- When you have an Infinity Gem in your hand, you can play it just like any other Artifact.
- If a card effect moves an Infinity Gem back to the Villain Deck or city, then the Infinity Gem becomes a Villain card again.

#### Invade the Daily Bugle HQ {#invade-the-daily-bugle-hq}

(Scheme - Paint the Town Red) Villains entering the HQ don’t cause Ambush effects or Escape effects. Villains in the HQ aren’t in any city space. For example, if Carrion is fought while in the HQ, he can’t be “put back in the city space where he was.” If there is a Villain in the HQ space under Doppelganger, or if Doppelganger is in the HQ, then Doppelganger’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> is 0.

#### Invincible Force Field {#invincible-force-field}

(Scheme - Fantastic Four) You can use <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for some Force Fields and <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> for others in the same fight.

#### Killmonger, Spec Ops - Counting Villain Groups {#killmonger-spec-ops-counting-villain-groups}

Killmonger, Spec Ops has some cards that say “You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each different Villain Group in your Victory Pile.” Henchman Groups are a kind of Villain Group, so each Henchman Group counts towards this number. Don’t count cards turned face down by Soulbind. You can’t count cards that have no Villain Group that some special rule may have put into your Victory Pile, including Tactics, Bystanders, Master Strikes, Scheme Twists, or Heroes that were turned into Villains.

#### King Hyperion {#king-hyperion}

(Mastermind - Secret Wars, Vol. 2) While this Mastermind is in the city, he pushes other Villains forward as normal. If he escapes, you still KO from the HQ and discard for any Bystanders carried away as normal. However, since Masterminds don’t count as Villains, card effects that mention “Villains” won’t work on him.

#### The Kree-Skrull War {#the-kree-skrull-war}

(Scheme - Guardians of the Galaxy) A Scheme’s setup instructions override a Mastermind’s “Always Leads” ability and the normal rules. For 2 players, include the Kree Starforce and Skrull Villain Groups, overriding the Mastermind’s “Always Leads” ability if necessary. For 1 player, include both the Kree Starforce and Skrull Villain Groups, and the Villain Deck will be larger than normal. When card effects like this Scheme cause Villains to escape the city at an unusual time, do all the normal Escape effects.

#### Liz (Peter’s Allies) {#liz-peters-allies}

(Hero - Spider-Man Homecoming) You can’t use more than one of these on the same Coordinate.

Location Clarifications

- Locations do not count as Villains. Special abilities that mention Villains do not work on Locations.
- If a Mastermind or Scheme destroys a city space with a Location, KO that Location.
- A city space with a Location above it and no Villains still counts as “empty” for abilities like Last Stand.
- Each Mastermind in the set has at least one Tactic that becomes a Location. You win when the Mastermind has no face

down Tactics left under them. You don’t also have to defeat all the Tactic cards that have turned into Locations in the city. Locations don’t usually capture Bystanders, but some card abilities can make them capture Bystanders. Rescue them when you fight that Location.

#### Madame HYDRA {#madame-hydra}

(Ally - Villains) Madame HYDRA gives 2 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> and has the drawback “To play this card, you must discard a card from your hand.” So to play this card and get its 2 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> , you must discard another card from your hand, like a spare HYDRA Soldier. Madame HYDRA also has the “Dodge” keyword mentioned above. Using “Dodge” isn’t “playing” this card, so you don’t have to worry about Madame HYDRA’s drawback when you Dodge with it. So to use Dodge, you just discard Madame HYDRA and draw a card.

#### Mass Produce War Machine Armor {#mass-produce-war-machine-armor}

(Plot - Villains) If the Setup rules for a Plot conflict with a Commander’s “Always Leads” ability, then the Plot takes priority. So when you play this Plot with Odin and 2 or 3 players, use S.H.I.E.L.D. Assault Squads as the Backup Adversary group, not Asgardian Warriors. For 1 player Advanced Solo Mode, this Plot’s setup rules say to use all ten S.H.I.E.L.D. Assault Squad cards, not just three.

#### Mole Man {#mole-man}

(Mastermind - Fantastic Four) If a card causes a Villain to escape at an unusual time (like Mole Man’s Master Strike), remember to do all the same effects as if that Villain had escaped normally.

#### Mr. Sinister {#mr-sinister}

(Mastermind - Dark City) When you fight Mr. Sinister, you rescue all the Bystanders he had. Then, if his Fight effect gives him more Bystanders, those stay on him for the future. When you win the Final Showdown, you also rescue all the Bystanders on Mr. Sinister.

#### Mysterio {#mysterio}

(Mastermind - Paint the Town Red) The Mastermind Mysterio is a master of illusions. His Master Strike and some of his Tactics create additional “illusion” Tactics underneath him. You have to defeat all of Mysterio’s Tactics to beat him. Even if you beat his four original Tactics, as long as he still has additional Tactics in his pile, he’s not beaten yet.

- A Master Strike that becomes an additional Mysterio Tactic doesn’t produce a special effect when you fight it - you just put it in your Victory Pile, score its Victory Points.
- Each Master Strike used as a Mysterio Tactic card is worth 6 Victory Points. Namor, the Sub-Mariner (Defenders): (Adversary Group - Villains) For Namor’s Ambush and Overrun abilities, finish moving the new Adversary into the city and/or pushing any Adversary out of the city before checking whether there are any other Defenders in the city for Namor’s abilities.

#### New Recruits {#new-recruits}

In Marvel storylines, Super Villains often use assorted goons to help them fight. Some Villainous Allies specialize in amassing whole armies of recruits. In LegendaryTM, New Recruits give you a short burst of power, then go away. When a card effect tells you to “gain a Recruit,” put a New Recruit from the Recruit Stack into your discard pile. When you play a New Recruit, you return it to the Recruit Stack, you still get that Recruit’s 1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> this turn, and you get to draw a card from your deck.

#### Odin {#odin}

(Commander - Villains) Like any “each player [does something]” effect, the current player does it first, then go in clockwise order. A player must gain a Bindings if they have no Asgardian Warriors in their Victory Pile to place, or if there are no empty city spaces in which to place one of their Asgardian Warriors.

#### Phoenix-Force Cyclops {#phoenix-force-cyclops}

(Hero - Secret Wars, Vol. 2) When you play a Hero card that KOs itself, you still played that card, so you can still use other Superpower Abilities that trigger from its classes or team.

#### Pickpocket (Black Cat) {#pickpocket-black-cat}

(Hero - Paint the Town Red) “Printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> number means the number literally printed inside the card’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icon. Ignore any ‘ <img src="/img/icons/rules-extracted/icon-33.svg" alt="game symbol" class="rules-icon"> ’ symbols, ‘ \* ’ symbols, or special abilities on that card.

#### Professor X {#professor-x}

(Commander - Villains) If there is a tie for highest-cost Allies in the Lair, the current player breaks those ties. The current player chooses which order to stack those Allies.

#### Pull Reality into the Negative Zone {#pull-reality-into-the-negative-zone}

(Scheme - Fantastic Four) Recruit points act as Attack points and Attack Points act as Recruit Points.

#### Pull the Strings (Kingpin) {#pull-the-strings-kingpin}

(Ally - Villains) This card says “Whenever a card effect causes you to gain a New Recruit this turn, put that New Recruit into your hand. Gain a New Recruit.” A ‘card effect’ is anything written on a card. So the recruit you gain from Pull the Strings itself goes to your hand. Once you have played Pull the Strings, any New Recruits you gain from other card effects for the rest of the turn

also go to your hand. However, when you spend 2 to recruit <img src="/img/icons/rules-extracted/icon-29.svg" alt="game symbol" class="rules-icon"> a New Recruit, recruiting is not a card effect, so those recruited New Recruits go to your discard pile, not your hand. When you play a New Recruit, the card “Kingpin – Endless Underlings” can put that New Recruit on the bottom of your deck. That is not “gaining” New Recruits, so Pull the Strings won’t put those New Recruits from the bottom of your deck into your hand.

#### Reality Gem (Infinity Gems) {#reality-gem-infinity-gems}

(Villain Group - Guardians of the Galaxy) Always do Ambush effects after the card enters the city and pushes other Villains forward. So Soul Gem and Reality Gem count themselves for their Ambush effects.

#### Shifting Decoy (Mysterio) {#shifting-decoy-mysterio}

(Ally - Villains) “If that card has an <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icon...” refers to having the big <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icon in the lower-left. So “Enchantress - Irresistible Bribe” is not considered to “have an <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icon.”

#### Show Your True Colors (Mystique) {#show-your-true-colors-mystique}

(Ally - Villains) You can only use the color-changing ability when you play this card. You can’t change this card’s color/Ally Class during other players’ turns.

#### Sinister Ambitions {#sinister-ambitions}

(Scheme - Secret Wars, Vol. 2) If an escaping Ambition says “each other player”, do it to each player.

#### Soul Gem (Infinity Gems) {#soul-gem-infinity-gems}

(Villain Group - Guardians of the Galaxy) Always do Ambush effects after the card enters the city and pushes other Villains forward. So Soul Gem and Reality Gem count themselves for their Ambush effects.

#### Space Gem (Infinity Gems) {#space-gem-infinity-gems}

(Villain Group - Guardians of the Galaxy) Always do Ambush effects after the card enters the city and pushes other Villains forward. So Soul Gem and Reality Gem count themselves for their Ambush effects.

#### Spider-Queen {#spider-queen}

(Mastermind - Secret Wars, Vol. 2) When card effects like her Master Strike cause Villains to enter the city, those Villains still do their Ambush effects.

#### Spider-Man (Spider Friends) {#spider-man-spider-friends}

(Adversary Group - Villains) If a card effect needs to know a number from a card, and that card doesn’t have that kind of number, use 0. For example, Spider-Man says “Fight: Reveal the top card of the Adversary Deck. If that card is worth 2VP or less, play it. If you play a card from the Adversary Deck this way, put Spider-Man back on top of the Adversary Deck.” If you reveal a Twist or Strike with Spider- Man’s ability, that Twist or Strike is worth 0 VP, so you would play it. If you reveal a Bystander this way, that card is worth 1VP, since it says 1VP on the card. When you fight Spider-Man, put him in your Victory Pile, then do his Fight effect, which might put him back on top of the Adversary Deck or might not.

#### Thanos {#thanos}

(Mastermind - Guardians of the Galaxy) His <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> is only reduced by Infinity Gems players “control” – not Infinity Gems in players’ discard piles or decks. When fighting Thanos in Solo Mode and using a Villain Group besides Infinity Gems, Thanos gets -2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Villain in your Victory Pile from that Group.

#### Total Fury (Nick Fury) {#total-fury-nick-fury}

(Commander Tactic - Villains) When a card tells you to “defeat an Adversary,” you still do that Adversary’s Fight effect. You ignore restrictions like the one on Iron Fist. You can’t defeat the Commander this way, since Commanders aren’t Adversaries.

#### Turn the Tide (Mystique) {#turn-the-tide-mystique}

(Ally - Villains) You can’t use any “Dodge” ability of the Ally card you revealed, because Dodge requires you to discard the Dodge card from your hand, and the Ally card you revealed isn’t in your hand. When you play a copy of a card, your next cards that turn can use Superpower abilities based on the copied card’s Hero Class. You can also count the copied card towards effects like “For each card you played this turn...”

#### Ultron {#ultron}

(Mastermind - Ant-Man) This Mastermind’s abilities put Heroes into a “Threat Analysis” pile. He says “Ultron is Empowered by each color in his Threat Analysis pile.” This means he gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each card in the HQ that matches any color among all the cards in his pile. It doesn’t matter whether he has one <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> or three <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> cards in his pile—either way he gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> card in the HQ.

#### Ultron Infinity {#ultron-infinity}

Ultron’s abilities can let him get multiple Empowered abilities. He counts each of them separately. So if he gets two “Empowered

### by ” <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> abilities, he will get +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> card in the HQ. If {#by-icon-7-abilities-he-will-get-2-icon-0-for-each-icon-7-card-in-the-hq-if}

he collects all the Infinity Stones, Ultron Infinity can get + ∞ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . This gives him infinity Attack! This means that no amount of normal <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> will be able to beat him. Depending on your Heroes, you might still have a sliver of hope to defeat him with the ∞ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> 

made by Gamora’s “Infinity Crusher” or with other occasional Hero cards that say “Defeat the Mastermind once” without using <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> points. The best plan is to defeat Ultron before he masters all of the Infinity Stones and goes infinite!

#### Unending Energy (Cyclops) {#unending-energy-cyclops}

(Hero - Core) A “card effect” is anything written on a card. When Bystanders are carried off by Villains, that discard is a game rule, not a card effect, so you can’t use Unending Energy then.

#### Venom Blast (Spider-Woman) {#venom-blast-spider-woman}

(Hero - Paint the Town Red) “If that card has a <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> icon...” refers to having the big <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> icon in the lower-left. So Venom Blast doesn’t draw more copies of Venom Blast or Pickpocket.

#### Watchful Eye (Happy Hogan) {#watchful-eye-happy-hogan}

(Hero - Spider-Man Homecoming) If this KOs any Master Strikes, those Master Strikes still count for Striker, since Striker counts Master Strikes “in the KO pile and/or stacked next to the Mastermind.”

#### Weave a Web of Lies {#weave-a-web-of-lies}

(Scheme - Paint the Town Red) You can only pay 1 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> once for each Villain you defeat.

#### X-Cutioner’s Song {#x-cutioners-song}

(Scheme - Dark City) “Enemy” means Villain or Mastermind. Since Masterminds aren’t Villains, Masterminds don’t get + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> from capturing Heroes like the Villains do in this Scheme.

This page intentionally left blank.

## Additional Rules and Clarifications {#additional-rules}

### Abilities Triggering Separately {#rule-abilities-triggering-separately}

Some Hero cards have a Sunlight (or Patrol) ability, then a separate ability like “ <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> : You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .” on another line. Do each of a card’s abilities, one at a time, in the order listed. The second ability doesn’t require both Sunlight and a played <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> card. Some Sunlight abilities can move cards out of the HQ. This might enable a Moonlight ability later on the card to activate too.

### Adapting Masterminds {#rule-adapting-masterminds}

- A normal Mastermind has a Mastermind card and 4 Mastermind Tactic cards. An Adapting Mastermind instead just has 4 or 6 Mastermind Tactic cards. Whichever Tactic is currently on top of the stack of Tactics counts as the current Mastermind card.
- Keep all of their Tactics in a face up stack. Use only the rules on that top card, ignoring the rest of the stack.
- In its “Setup” abilities, and whenever an Adapting Mastermind does a Master Strike, it says “Adapt.” This means “Shuffle the Mastermind Tactics and randomly put one on top, face up.” You might randomly pick the same Tactic that was previously on top, or it might be a different Tactic. It keeps any Bystanders it held.
- Likewise, when you fight an Adapting Mastermind, you always fight the Tactic currently on top of the stack. You ignore all the card abilities and bonuses that are not currently on top of the stack. The “Fight” ability also says “Adapt” at the end. So, you put the Tactic you just fought into your Victory Pile, rescue any Bystanders, do its Fight effect, then shuffle the remaining Tactics and randomly put one on top, face up.
- Some Adapting Masterminds are double-sided “Epic.” During setup, turn all the Tactics to either the normal side or the much harder Epic side. Don’t change which side is face up when they Adapt. Don’t use these with Schemes that call for Mastermind Tactics to be shuffled into decks of non-double-sided cards.

### Adjusting Difficulty {#rule-adjusting-difficulty}

Some play groups like an easier challenge when introducing new or younger players or if the Masterminds have been winning too much. Other groups like to face tougher challenges. One way to adjust the difficulty level is choosing which cards to use in your next game:

- Mastermind: Some Masterminds are intentionally easier or harder to defeat. This is the easiest way to adjust difficulty. Many elements play a role in overall Mastermind power level. Learning which Masterminds are easier and stronger (and the best ways to fight each one) is part of the game!

- Epic Mastermind side: If you are feeling especially confident and ambitious, you can flip over any of the Masterminds to their “Epic Mastermind” side (if they have one), which has more dangerous special abilities, Master Strikes, and Attack numbers. These are not for the faint of heart!
- Scheme: Likewise, you will find that some Schemes are easier or harder to defeat. Some Schemes are especially difficult in combination with certain Masterminds or Villain Groups. Again, finding out which Schemes are hardest and the best ways to beat each Scheme combined with each Mastermind is part of the game.
- Villain Groups: Some Villain Groups are intentionally tougher than others. For example, the Rival Overlords are especially tough, while the Intergalactic Party Animals are much easier. The VP of the Villains in the group is the clearest signal for which Villain Groups are harder. If you are seeking even greater challenges, you can also play these especially dangerous Challenge Modes. You can even combine the extra Scheme Twist modes with the extra powerful Mastermind modes. See if you can beat them all!

Challenge Mode Effect Heroic/Fiend Mode Add an extra Scheme/Plot Twist to the Villain/Adversary Deck. Champion/Arch-Villain Add two extra Scheme/Plot Twists Mode to the Villain/Adversary Deck. Legendary Mode Add three extra Scheme/Plot Twists to the Villain/Adversary Deck. Distracted Mastermind/ The Mastermind/Commander gets Commander -1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Power. Maniacal Mastermind/ The Mastermind/Commander gets Determined Commander +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Power. Enraged Mastermind/ The Mastermind/Commander gets Commander +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Power. Tyrant Mastermind/ The Mastermind/Commander gets Devastating Commander +3 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Power. Nightmare Mastermind/ The Mastermind/Commander gets Supreme Commader +4 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Power. All-Powerful Mastermind/ The Mastermind/Commander gets Commander +5 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Power. Hand of Fate Each player’s hand size is five cards instead of six. Opening Salvo 1, 2, 3, 4, At the beginning of the game, each 5, or 6 player gains that many Wounds. Prison Break 1, 2, 3, 4, At the beginning of the game, each 5, or 6 player gains that many Bindings. Growing Threat Each time the Commander is defeated, it gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for the rest of the game. Army of Evil 1, 2, 3, 4, Each Villain gets + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to that or 5 number. Army of Glory 1, 2, 3, Each Adversry gets + <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to 4, or 5 that number. Endless Spite Whenever you complete a Scheme/Plot Twist, also play the Mastermind/ Commander’s Strike ability. Evacuate the Wounded Whenever a Hero you own is KO’d, you gain a wound. Imprison the Wounded Whenever an Ally you own is KO’d, you gain a Bindings. Final Blow After you defeat the Mastermind/ Commander’s four Tactics, you must still fight them a fifth time to claim the actual Mastermind/Commander card and win. Plots upon Plots Whenever you complete a Scheme/ Plot Twist, play another card from the Villain/Adversary Deck. Pain upon Pain Whenever you complete a Master/ Command Strike, play another card from the Villain/Adversary Deck. Hell on Earth Play two cards from the Villain/ Adversary Deck each turn instead of one. Making the Game Easier If you want to give newer or younger players a boost to help them compete with veteran players, or if you want some help in challenging an especially powerful or Epic Mastermind:

- You can replace some number of the S.H.I.E.L.D. Agents with S.H.I.E.L.D. Officers in those players’ starting decks.
- Or you can give them a larger hand size, like 7 or 8 cards.
- Or you can agree to reduce the Mastermind’s Attack by some fixed number throughout the game.

### Ambush Schemes {#rule-ambush-schemes}

Each Villain Group in the Ant-Man and Wasp set includes an “Ambush Scheme.” These are shuffled into the Villain deck alongside their Villain Group as normal. When an Ambush Scheme is played from the Villain Deck, put it next to the normal Scheme and do its Ambush effect. For the rest of the game, whenever a Scheme Twist is played, do each Scheme’s Twist effect (in any order). Each Ambush Scheme tells you a way to “defeat this

Scheme.” When you do that, the current player puts it into their Victory Pile, scoring its Victory Points. Ambush Schemes aren’t Villains. They don’t enter the city or push other Villains forward. You don’t need to defeat Ambush Schemes to win the game.

- Note: There can only be one Ambush Scheme in play at a time. If a second Ambush Scheme would be played from the Villain Deck, KO the new Ambush Scheme and play another card from the Villain Deck instead.

### Bindings {#rule-bindings}

Some special abilities make you gain Bindings cards, representing your Allies getting bound or restrained by enemies. When a player gains a Bindings, take a Bindings from the Bindings Stack and put it into that player’s discard pile. Bindings don’t have any Recruit Points or Attack, so when you draw a Bindings into your hand, your hand is weaker than normal.

- Some cards let you KO your Bindings so you don’t have to worry about them anymore.
- Other cards can even turn Bindings to your benefit: when heroes try to bind Magneto, he just uses his magnetism powers to use those Bindings as a weapon against them!
- Bindings cards aren’t Allies. If a card tells you to “KO one of your Allies,” you can’t KO a Bindings, since Bindings aren’t Allies. However, if a card says “KO one of your cards,” then you can KO a Bindings.
- Bindings have a Zero cost. However, you only gain Bindings when a card effect tells you to. You can’t recruit Bindings by paying Recruit Points.

Betrayal Unlike Heroes, Marvel Super Villains are known to backstab each other, especially when times get tough. If you have one or more Bindings in your hand, you can use the “Betrayal” ability written on the Bindings card:

- “Betrayal: If you don’t recruit any Allies or defeat any Adversaries or Commanders on your turn, you may KO a Bindings from your hand. If you do, the player to your right gains all the other Bindings from your hand.”
- So if you have three in your hand, and you decided to use Betrayal this turn, you would KO one of those and put the other two in the discard pile of the player on your right.
- This is often worth doing if you have at least two in your hand, or if your turn wouldn’t have been very good anyway. It’s okay to play the cards in your hand, Dodge, and/or use abilities like “draw a card” to see how your hand develops, then decide whether to use the “Betrayal” ability from your hand. As long as you don’t recruit Allies or fight any Adversaries or Commanders during your turn, you can still use “Betrayal.”

### Bystanders {#rule-bystanders}

Some card effects tell you to “rescue a Bystander.” This means take the top Bystander from the Bystander Deck and put it into your Victory Pile. This represents saving Bystanders that are trapped or in danger from all the chaos and destruction. Each Bystander in your Victory Pile gives you additional Victory Points at the end of the game. (See page 10 for more details on how Bystanders can be captured by Villains.)

- Important: Cards that say “rescue a Bystander” can’t save Bystanders captured by specific Villains in the city – you have to fight those Villains to save those Bystanders.
- Some “Special Bystanders” say you get an extra effect “When you rescue this Bystander.” This could happen because you fought a Villain holding that Bystander or because you rescued that Bystander from the Bystander Deck.
- Some Schemes turn some Bystander cards into Villains and say “When you fight one, rescue it as a Bystander.” When you rescue one this way, do any “When you rescue this Bystander...” effects it has. It counts as a Bystander in your Victory Pile, not a Villain.

### Cards That Don’t Have a Number {#rule-cards-that-dont-have-a-number}

If a card effect needs to know a number from a card, and that card doesn’t have that kind of number, use 0. If some Scheme shuffles Scheme Twists into your deck for some reason, a Scheme Twist doesn’t have a cost, so its cost is considered to be 0.

### Card Values {#rule-card-values}

If an effect needs to know a number from a card, and that card doesn’t have that kind of number, use 0. For example, if Gambit’s “High Stakes Jackpot” reveals a Wound, he gets +0 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .

### Choosing from Multiple Villain Decks {#rule-choosing-from-multiple-villain-decks}

Some Schemes create multiple Villain Decks. If a card tells you to do something with the Villain Deck (like reveal, play, or add cards), the active player chooses any one of the Villain Decks for that effect. Use the same Villain Deck for all of that card’s effects. Don’t do those effects to every Villain Deck. This also generally applies whenever a special effect makes multiple versions of something that usually only exists once in the game, like multiple Masterminds, multiple Hero Decks, etc.

### Cooperative and Competitive Play {#rule-cooperative-and-competitive-play}

Legendary is both cooperative (with players cooperating to beat the Mastermind) and competitive (with players competing to get the most Victory Points). Some play groups like to focus on cooperating. Other groups focus on competing. And some groups

do a little of both. Some players even start out competing, and then switch to cooperating more and more as the Mastermind gets closer to victory. This matches a lot of Marvel storylines!

### Class vs. “Colors” Hero/Ally Classes are: <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> , <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> , <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> , <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> , and <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> . Basic S.H.I.E.L.D. {#rule-class-vs-colors-hero-ally-classes-are-icon-9-icon-6-icon-7-icon-3-and-icon-5-basic-s-h-i-e-l-d}

Agents and Troopers, Officers, Sidekicks, HYDRA Operatives, Soldiers, Madame HYDRA, and New Recruits have no Class icon, and therefore no Class. Team icons aren’t Hero Classes. If a card references Class, it refers to Class icons and does not include these cards. If a card refers to color, such as the Captain America cards in the Legendary® Core Set, all of the cards listed above are considered Grey and are counted as a separate color.

<span id="rule-divided-card"></span>
### Divided Cards {#rule-divided-cards}

Each Divided Card has two miniature cards printed on the same card.

- If a Divided Card costs “3” on each side, its cost is 3. Pay 3 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> to recruit it from the HQ, not 6 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> .
- When you play a Divided Card, you choose which side to play. You generate all the <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> , <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , and special abilities of that side as normal. You ignore the other side, as if it didn’t exist.
- While a Divided Card is anywhere else, including your hand, deck, discard pile, HQ, etc., it counts as all its Hero Classes, Teams, card names, and Hero Names. (It still counts as 1 card, not 2.) While in those places, it counts as “a multicolored card” and its “printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> ” is the total of both <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> numbers printed on it. However, once you play the card, it only counts as the side you chose, and it is no longer “a multicolored card.”

### Double-Sided Epic Masterminds {#rule-double-sided-epic-masterminds}

As an extra-hard challenge, the X-Men expansion introduced “Double-Sided Epic Masterminds.” Each has a normal side or can be flipped over to use its extra-nasty Epic Mastermind side, using the same Mastermind Tactics.

<span id="rule-transforming-schemes"></span>
### Double-Sided Transforming Schemes {#rule-double-sided-transforming-schemes}

In keeping with the Revelations theme, all the Schemes in this set are double-sided “Transforming Schemes.” Start with the side face up that says “Setup.” Whenever it tells you to “Transform this Scheme,” flip it over. Use only the rules showing on the side currently face up.

### “Each Hero/Ally You Played This Turn” {#rule-each-hero-ally-you-played-this-turn}

This phrase only counts cards you have already played this turn, and not other cards still in your hand.

- For example, say you play Iron Man’s “Arc Reactor” card. You’ll get extra Attack for any other <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> (tech) cards you played before Arc Reactor, but not for any other <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> (tech) cards still in your hand.

### Enraging Wounds {#rule-enraging-wounds}

“Enraging Wounds” give you bursts of power while requiring new ways to heal them.

- Shuffle all Enraging Wounds into the Wound Deck face down, mixed with the normal Wounds you have, so that you have at least 40 total Wounds. Also include any other special Wounds you have, like the Grievous Wounds from Legendary®: Civil War.
- You can play Enraging Wounds from your hand during your turn, giving <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> , <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , and/or other special effects.
- Each Enraging Wound has its own unique “Healing” ability like “Healing: When you defeat a Henchman this turn, you may KO this Wound:’ You can use this Healing ability during your turn, either after you’ve played the Enraging Wound or while it’s still in your hand.
- Unlike the Healing ability on normal Wounds, the KO abilities on Enraging Wounds don’t prevent you from recruiting and fighting that turn.
- Enraging Wounds still count as Wounds for all card effects. They cost 0. You can’t recruit them. They’re not Heroes. If you use a normal Wound’s Healing ability to “...KO all the Wounds from your hand,” that will KO all Enraging Wounds from your hand too, but It won’t KO any Wounds you played since they’re not in your hand.
- Some sets put Wounds on Enemies. Ignore Enraging Wounds’ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> numbers & text while they’re on Enemies.
- Enraging Wounds offer extra bonuses, but they can’t always be healed as easily as normal Wounds. They also increase the total number of Wounds a group can suffer during a game. So they are both helpful and harmful.

### Escapes/Overruns from Card Effects {#rule-escapes-overruns-from-card-effects}

Sometimes a card effect causes a Villain to escape instantly from the city, without the normal process of being pushed by another Villain. If this happens, the Villain escapes from whatever space it’s in, without pushing any other Villains out of the city.

- The escaping Villain does all normal Escape effects as if it had escaped normally, including KO’ing a Hero from the HQ and causing each player to discard if it escaped with any number of Bystanders.
- Likewise, if a card effect causes a Villain to enter the city at an unusual time, and/or in an unusual city space, that Villain still does its Ambush ability.
- Note: Villains only do their Ambush ability when they enter the city. If a card effect makes a Villain appear someplace besides the city (like in the HQ, in front of a player, etc.) then it won’t do its Ambush.

### Final Blow (Optional) {#rule-final-blow-optional}

Some players like to play with an optional rule that after the Mastermind has been fought 4 times and has no more face down Tactics, a player must still fight the Mastermind card itself in a 5th, final fight to put the Mastermind card into their Victory Pile and win the game. This variation makes the game harder and a bit longer. If your group wants to use Final Blow, it’s best to make that clear at the start.

### Final Showdown (Optional) {#rule-final-showdown-optional}

When a player defeats the fourth Mastermind Tactic, that player finishes their turn and draws six cards as normal. Then it’s time for the Final Showdown between the players and the Mastermind! Each player in turn now takes a special “Showdown Turn,” starting with the player on the left of the player who defeated the fourth Mastermind Tactic. In a Showdown Turn, you don’t play the top Villain card, you don’t recruit Heroes, and you don’t fight Villains. Instead:

- Play the cards in your hand as normal, using those cards’ special abilities as normal, and producing Recruit Points and Attack as normal.
- Add together all the Recruit Points and Attack you produce into a single, big Showdown Total.
- Don’t draw a new hand at the end of your Showdown Turn.

Whichever player has the highest Showdown Total wins the Final Showdown! That player puts the actual Mastermind card into their personal Victory Pile. That card is worth several Victory Points. When the Final Showdown is complete, then the Mastermind has been utterly defeated, and all the players win a team victory! In addition, the player with the most Victory Points in their Victory Pile wins an individual victory and is the most legendary hero of all!

Tied Final Showdowns If multiple players tie for the highest Showdown Total, then it’s time for a Super Showdown! Each of the tied players discards all the cards they played and draws a new hand of six cards. Each of those players then takes another Showdown Turn to find the winner of the Final Showdown. If players keep tying, keep running additional Super Showdowns until someone wins the Showdown.

### “Gaining” Cards {#rule-gaining-cards}

Some card abilities say that a player “gains” a particular card. That means put that card into that player’s discard pile. The player will draw that card in the future, after their deck runs out and they shuffle their discard pile into a new deck.

### Grievous Wounds {#rule-grievous-wounds}

“Grievous Wounds” are more difficult to heal. Shuffle them all into the Wound Stack face down, so you have 45 total Wounds. Instead of normal Wound text, a Grievous Wound says something like “Healing: You may spend 5 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> . If you do, KO this Wound.”

- Using these Healing abilities doesn’t prevent you from recruiting and fighting that turn.
- You can only use these Healing abilities during your turn.
- Grievous Wounds still count as “Wounds” for all card effects.
- If you have a normal Wound, you can use its normal “KO all your Wounds” Healing ability to KO your Grievous Wounds too. But if you don’t have a normal Wound in hand, then you can’t.

### Half-Points {#rule-half-points}

The Deadpool expansion introduces ½ <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> and ½ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> values. When you play these, just add ‘em up as normal. Play a 2½ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Attack and a 3½ <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Attack Hero, and you’re ready to cuddle up to some Villain with 6 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Attack.

### Henchmen Are Villains/Adversaries. Masterminds Are Not Villains/ Adversaries. {#rule-henchmen-are-villains-adversaries-masterminds-are-not-villains-adversaries}

- Henchman Villain cards are indeed Villains.
- Henchman Groups are likewise a kind of Villain Group, That said, when a Scheme says to add an extra Villain Group, it means a standard 8-card Villain Group (not a Henchman Group), unless it specifically says to add Henchmen.
- Masterminds are so powerful that they don’t count as mere “Villains.” Card effects that affect Villains don’t affect Masterminds unless they explicitly say they affect Masterminds.
- The word “Enemy” includes both Villains and Masterminds.

### Hero/Ally Classes {#rule-hero-ally-classes}

A card’s color is shown in the Hero Class icon in the card’s upper left, and also in the color of the card’s border. (Each Hero has a “Rare” card with no border, but you can still see that card’s color

by checking the Hero Class icon in its upper left.) Hero Class and color are the same thing except that there is a sixth color, grey, for cards with no Hero Class.

 <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> Strength Heroes/Allies (Green) include Heroes with raw physical power, but also Heroes with strength of will, determination, and strong leadership.

### <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> Instinct Heroes/Allies (Yellow) use savagery and quick {#rule-icon-6-instinct-heroes-allies-yellow-use-savagery-and-quick}

reflexes to dominate combats. Some Instinct Heroes use superhuman senses to get an edge on their opponents.

### <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> Covert Heroes/Allies (Red) include Heroes using trickery {#rule-icon-7-covert-heroes-allies-red-include-heroes-using-trickery}

and deception to outwit their foes. Some Covert Heroes also plan clever maneuvers or use Superpowers to gain subtle advantages.

### <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> Tech Heroes/Allies (Black) include Heroes using advanced {#rule-icon-3-tech-heroes-allies-black-include-heroes-using-advanced}

weaponry, incredible gadgets, brilliant inventions, or nextgeneration science. Ranged Heroes/Allies (Blue) unleash massive firepower. This includes bows, projectiles, energy beams, elemental powers, and mental assaults. Basic Heroes (Grey) include all the starting S.H.I.E.L.D. Heroes and S.H.I.E.L.D. Officers. They all count as Heroes, though they don’t quite get the job done as well as high-flying Superheroes.

### Hero/Ally Teams {#rule-hero-ally-teams}

Most Hero/Ally cards have a Team icon in their upper-left corner. Superpower abilities or other special effects sometimes trigger on Team icons instead of Hero/Ally Classes.

Avengers: “And there came a day, a day unlike any other, when Earth’s mightiest heroes and heroines found themselves united against a common threat. On that day, the Avengers were born—to fight the foes no single super hero could withstand!“ – Avengers Prologue.

### <img src="/img/icons/rules-extracted/icon-45.svg" alt="game symbol" class="rules-icon"> {#rule-icon-45}

Black Panther: T’Challa rules as King of Wakanda, a secluded African nation of incredible science, culture, natural resources, weapons, and people. As the only source of the powerful metal Vibranium, Wakanda is often under attack by enemies. Many Heroes work with T’Challa to defend Wakanda..

### <img src="/img/icons/rules-extracted/icon-48.svg" alt="game symbol" class="rules-icon"> {#rule-icon-48}

 <img src="/img/icons/rules-extracted/icon-49.svg" alt="game symbol" class="rules-icon"> Brotherhood: Magneto formed the Brotherhood of Mutants on the philosophy that mutants are a superior, evolved species with the destiny to dominate humankind. This doctrine brings them into frequent conflict with the X-Men. <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> Cabal: While the Illuminati seek to stop the destruction of parallel dimensions in the Secret Wars, a group of evil geniuses form the Cabal with a different plan: stop other dimensions from colliding with ours...by destroying them all with antimatter bombs!

 <img src="/img/icons/rules-extracted/icon-41.svg" alt="game symbol" class="rules-icon"> <img src="/img/icons/hero-teams/team-inhumans.svg" alt="Inhumans" class="rules-icon"> Champions: are a teenage Superhero team determined to bring the shadowed legacy of the Avengers into a new age of optimism and hope. After the Civil War storyline turned Avenger against Avenger, the Champions struck out on their own, using social media to mobilize the whole world in a new movement for justice against hate and abuse of power.

### <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> Crime Syndicate: The city streets of the Marvel Universe {#rule-icon-13-crime-syndicate-the-city-streets-of-the-marvel-universe}

are ruled by Super Villains who are experts in manipulation, organized crime, and outright violence.

### <img src="/img/icons/rules-extracted/icon-35.svg" alt="game symbol" class="rules-icon"> Fantastic Four: Along with their former foe Silver Surfer, {#rule-icon-35-fantastic-four-along-with-their-former-foe-silver-surfer}

they must unite to stop the cosmic forces of evil from destroying everything we know.

### <img src="/img/icons/rules-extracted/icon-47.svg" alt="game symbol" class="rules-icon"> {#rule-icon-47}

 <img src="/img/icons/rules-extracted/icon-46.svg" alt="game symbol" class="rules-icon"> Foes of Asgard: Thor and his father Odin hail from Asgard, a mystical otherworldly realm of supernatural beings worshipped as Norse gods. Though Asgard has many powerful defenders, it also has many powerful enemies. <img src="/img/icons/rules-extracted/icon-50.svg" alt="game symbol" class="rules-icon"> Guardians of the Galaxy: Enemies often underestimate this ragtag crew of misfits. But when stakes are high, the Guardians put aside their differences, unite their unique superpowers, and save the galaxy from interstellar threats.

Guardians of the Multiverse: This unlikely group of Heroes was hand-picked by Uatu the Watcher to confront threats that could unravel every parallel universe at once.

### <img src="/img/icons/rules-extracted/icon-44.svg" alt="game symbol" class="rules-icon"> {#rule-icon-44}

Heroes of Asgard: Wielding incredible powers, <img src="/img/icons/rules-extracted/icon-42.svg" alt="game symbol" class="rules-icon"> 

Asgardians like Thor and Sif were worshipped as gods by early Norse tribes. Now they storm back to Earth to defend it from ancient, awakening threats.

### <img src="/img/icons/hero-teams/team-fantastic-four.svg" alt="Fantastic Four" class="rules-icon"> HYDRA: is a secret criminal organization working to {#rule-icon-18-hydra-is-a-secret-criminal-organization-working-to}

infiltrate and subvert the world’s governments and institutions. HYDRA often collaborates with super villains to seize power at any cost. <img src="/img/icons/hero-teams/team-illuminati.svg" alt="Illuminati" class="rules-icon"> Illuminati: The 2015 Marvel mega-story Secret Wars begins with a terrifying discovery: all the parallel dimensions in the Marvel Universe are hurtling towards each other! Wherever they collide, only one dimension will survive. The other will be utterly destroyed! The smartest genius Heroes in the world band together as the Illuminati, in a desperate search to stop it.

### <img src="/img/icons/rules-extracted/icon-43.svg" alt="game symbol" class="rules-icon"> Inhumans: The lnhumans are a mysterious, powerful race {#rule-icon-43-inhumans-the-lnhumans-are-a-mysterious-powerful-race}

living in the hidden city of Attilan, on Earth’s moon. Long ago, the alien Kree altered the DNA of a small group of humans, injecting the potential for superhuman evolution. When their Inhuman descendants are exposed to the “Terrigen Mists,” they undergo “Terrigenesis,” evoking incredible superpowers. Strongest of all are the Inhuman Royal Family, including King Blackagar Boltagon,

Queen Medusa, Princess Crystal, Maximus, Gorgon, Karnak, and Lockjaw. Marvel Knights are a loose group of street-level Heroes that take down Villains through vigilante justice.

### <img src="/img/icons/rules-extracted/icon-25.svg" alt="game symbol" class="rules-icon"> Mercs For Money! These psychos follow Deadpool, doing {#rule-icon-25-mercs-for-money-these-psychos-follow-deadpool-doing}

his dirty work for a very noble cause– getting paid!

### <img src="/img/icons/rules-extracted/icon-34.svg" alt="game symbol" class="rules-icon"> New Warriors: were at the center of the Superhero {#rule-icon-34-new-warriors-were-at-the-center-of-the-superhero}

Registration Act controversy. In a reckless battle they initiated with a group of super-villains, the super-villain Nitro exploded, killing hundreds of civilians in Stamford. Speedball was the only New Warrior to survive.

S.H.I.E.L.D.: The “Strategic Hazard Intervention Espionage Logistics Directorate” is a clandestine paramilitary and spy organization led by Director Nick Fury. It works behind the scenes to stop Superpowered Villains before they get out of hand.

Sinister Six: When Spider-Man’s super-villain enemies could not defeat him as individuals, they banded together as the Sinister Six to crush Spider- Man once and for all.

### <img src="/img/icons/rules-extracted/icon-31.svg" alt="game symbol" class="rules-icon"> Spider Friends: Spider-Man and his allies use speed, {#rule-icon-31-spider-friends-spider-man-and-his-allies-use-speed}

cunning, and rapid-fire attacks to take down foes.

### <img src="/img/icons/rules-extracted/icon-39.svg" alt="game symbol" class="rules-icon"> <img src="/img/icons/card-info/info-focus.svg" alt="Focus" class="rules-icon"> Venomverse: In “Venomverse,” a new race of alien {#rule-icon-39-icon-37-venomverse-in-venomverse-a-new-race-of-alien}

symbiotes called Poisons are fusing with Venom symbiotes, Heores, and Villains to create powerful, hyper-advanced life forms.

Warbound: The Illuminati trick Hulk into exile on a distant world. Thrown off course and drained of strength, Hulk crashlands on the savage planet Sakaar. There, Hulk is chained and forced into gladiatorial servitude. Fighting for his life as his strength slowly grows, Hulk forms a blood pact with an unlikely band of powerful alien gladiators: the Warbound. Together they rise through the ranks, pursue a death-defying series of journeys, and eventually rally the people of Sakaar to overthrow the tyrannical Red King.

X-Factor Investigations: is a team of mutants from the Messiah Complex storyline who infiltrate anti-mutant zealots like the Purifiers and Reavers while unraveling baby Hope’s mysterious origin. <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> X-Force: is Cable’s handpicked “Black Ops” strike force of superpowered mutants that takes on missions too dark for the X-Men.

### <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> X-Men: Born as mutants, with strange superpowers that {#rule-icon-13-x-men-born-as-mutants-with-strange-superpowers-that}

set them apart, the X-Men are sworn to protect a world that hates and fears them.

### Heroic Bystanders {#rule-heroic-bystanders}

The New Mutants are Professor X’s students, dreaming of becoming full-fledged X-Men. For them, the Legendary® X-Men set introduces New Mutant Bystanders that become Heroes when you rescue them.

### Horrors {#rule-horrors}

Legendary® X-Men introduced a completely new card type: Horrors. These make the game harder in a variety of ways. All the Epic Masterminds explicitly say they add Horrors to the game. Players who want to play in “hard mode” can also choose to add any number of Horrors (random or hand-picked) at the start of a game against any Mastermind. How many can you beat at once?

### How to Teach the Game {#rule-how-to-teach-the-game}

For most groups, the best way to teach the game is just to start playing it. There’s no need to explain every single detail before you begin. Instead just tell people the overall theme and goal of the game, pointing to the different elements as you mention them. You can use your own words, or say something like this: “This is a Marvel Super Heroes Deck-Building Game. Each of us starts with a small deck of basic Heroes. Over time, we’re going to recruit these awesome Super Heroes, fight Super Villains, and eventually take down the evil Mastermind. There are different Heroes and a different Mastermind every time you play. This time it’s Red Skull. If we beat Red Skull four times, then we all win as a team, and the person who scores the most Victory Points is the individual winner. But while we’re playing, the game is fighting back. Red Skull is trying to accomplish this evil Scheme, “Unleash the Power of the Cosmic Cube.” If he does, then evil wins, and all of us lose. The best way to learn is just by playing. Everybody shuffle your deck and draw six cards. I’ll go first.”

Then just take your first turn, explaining what you do as you do it. You don’t need to explain what Bystanders or Scheme Twists or Master Strikes do until they come up. This method gets people into the action quickly, and everyone will figure it out as they go.

### “KO” {#rule-ko}

Many card abilities tell you to “KO” certain cards, meaning “knock out”. This means put them into the KO pile on the game board. Cards in the KO pile are permanently out of the game. The players and the game all share one big KO pile.

- If a card says to KO “one of your Heroes”, that can be a Hero you’ve already played this turn or a Hero still in your hand. If you KO a Hero you already played this turn, you still get to use the Recruit Points, Attack, and special abilities that Hero produced.
- Getting your starting cards KO’d is actually very good for you, since it means you will draw your more powerful Heroes/Allies more often, instead of drawing as many of the weaker starting cards.

### Locations {#rule-locations}

The Revelations set adds a completely new card type to Marvel Legendary®: Locations. These cards represent infamous strongholds in the Marvel Universe. Every Villain Group in the set contains at least one Location.

- When a Location is played from the Villain Deck, place it above the nearest city space that does not have a Location. Leave enough room that Villains can move through the city as normal.
- Once placed, Locations don’t move. Villains don’t push Locations forward. You can have a Villain in a city space that has a Location above it.
- Most Locations specify special abilities that happen when you fight Villains in that space. Some Locations become stronger when there’s a Villain in that space. Some Villains and Masterminds say they become stronger based on Locations.
- You can fight a Location by spending the listed amount of <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> , putting it into your Victory Pile, and doing any Fight ability the Location may have.
- If a new Location is played, and every city space already has a Location, then KO the Location with the lowest <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> to make room. (If tied, the current player chooses.) This might KO the newly played Location or one of the previous Locations.
- In 1-player solo mode, when a Location tells “each other player” to do something, do it yourself.

Location Clarifications

- Locations do not count as Villains. Special abilities that mention Villains do not work on Locations.
- If a Mastermind or Scheme destroys a city space with a Location, KO that Location.
- A city space with a Location above it and no Villains still counts as “empty” for abilities like Last Stand.
- Each Mastermind in the set has at least one Tactic that becomes a Location. You win when the Mastermind has no face down Tactics left under them. You don’t also have to defeat all the Tactic cards that have turned into Locations in the city. Locations don’t usually capture Bystanders, but some card abilities can make them capture Bystanders. Rescue them when you fight that Location.

### Mandarin’s Rings {#rule-mandarins-rings}

Mandarin’s Rings are the first Henchman Group that isn’t 10 identical cards. Instead, it’s 10 unique cards. When using these with a Mastermind besides Mandarin, they represent blasts of power from a distance, without facing the full might of Mandarin in person.

### Masterminds don’t count as Villains; Commanders don’t count as Adversaries {#rule-masterminds-dont-count-as-villains-commanders-dont-count-as-adversaries}

Masterminds and Commanders are so powerful that they are far beyond regular Super Villains or Adversaries. As a result, Masterminds and Commanders don’t count as mere “Villains” or “Adversaries”, and special abilities that only affect Villains or Adversaries won’t affect Masterminds or Commanders. For example, the Scheme “Bank Robbery Hostage Crisis” says “Each Villain gets +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> for each Bystander it has. Masterminds/ Commanders don’t get this bonus.

<span id="rule-multiclass-cards"></span>
### Multiclass Cards Introduced in Secret Wars, Vol. 1, a <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> card counts as both <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> and <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> . These cards are great at enabling Superpower Abilities like “ <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> : You get +2 .” {#rule-multiclass-cards-introduced-in-secret-wars-vol-1-a-icon-6-icon-7-card-counts-as-both-icon-6-and-icon-7-these-cards-are-great-at-enabling-superpower-abilities-like-icon-7-you-get-2}

### Multiple Masterminds {#rule-multiple-masterminds}

When some powerful Villains escape, they ascend to become new Masterminds, so there can be multiple Masterminds in the game! Schemes can do this too. Players must defeat all the Masterminds to win. When a Master Strike occurs, each Mastermind does its Master Strike ability. The player whose turn it is picks the order.

### “Own” {#rule-own}

You “own” all the cards in your hand, deck, played pile, discard pile, and Victory Pile.

### “A Player is the Mastermind” {#rule-a-player-is-the-mastermind}

Secret Wars, Vol. 1 introduces an intense, new, optional mode where one player takes on the role of the evil Mastermind. That player plots against the other players, using powerful “Ambition cards” to help Evil win! This mode makes the game dramatically harder for the heroic players to win. To use this mode:

- Choose who will be the Mastermind Player before the game. That player gets a starting deck like every other player.
- Put the “Pure Evil” Ambition card face up near the Mastermind player to start an “Ambition Row.”
- Shuffle other “Ambition” cards into a special Ambition Deck near the Mastermind Player.

- Use a number of Heroes, Villains, Henchmen, and Bystanders based on the number of “Heroic players,” not the Mastermind Player.
- However, the Scheme does count the Mastermind Player as a “player”, including its “Setup,” “Special Rules,” & “Evil Wins” rules.

Playing “Ambition” Cards

- At the start of the Mastermind Player’s turn, that player doesn’t play a card from the Villain Deck. Instead, that player adds the top card of the Ambition Deck to the Ambition Row, face up.
- There can be a maximum of 4 Ambition cards face up at once in the Ambition Row. If there are already 4 cards there when a new Ambition card is revealed, then the Mastermind Player must discard one of those Ambition cards or the newly drawn Ambition card to make room. That player can see the new Ambition card before they decide what to discard. Discarded Ambition cards always go to a special Ambition Discard Pile next to the Ambition Deck.
- During the Mastermind Player’s turn, that player can spend the Attack points shown on an Ambition card in the Ambition Row to “play” that Ambition card. That player uses its ability immediately, then puts it into the Ambition Discard Pile. These abilities can hurt the other players in a variety of ways.

Other Mastermind Player Details

- The Mastermind Player takes the first turn.
- The Mastermind Player can still recruit Heroes from the HQ as normal, corrupting them to the side of Evil. The Mastermind Player and the Heroic players should look to steal Heroes the other side might find useful!
- The Mastermind Player can also fight Villains as normal. For example, if they want to grab beneficial “Fight” effects from Villains, or stop Heroic players from getting them.
- Master Strikes, Ambush effects, and Escape effects don’t affect the Mastermind Player. That player doesn’t discard when a bystander is carried away by an escaping Villain.
- However, other card effects (like Schemes, Heroes, & Villain “Fight” effects) still work on Mastermind Player and Heroic players alike.
- For a truly epic Good vs. Evil experience, if you have the Legendary Villains set, make a Lair Deck of 3 Villainous Allies from the Villains set shuffled together, 42 cards total. Then the Mastermind Player recruits Villainous Allies from their own 5-space Lair, while all the Heroic players recruit Good Heroes from the HQ as normal!

- Or flip it around, with several Villainous players using Allies from the Legendary Villains set against a single Good “Commander Player” recruiting Heroes!

### “Printed <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> or <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> ” and “Printed Cost” {#rule-printed-icon-1-or-icon-0-and-printed-cost}

A card’s “printed <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> or <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> ” means the number literally printed inside the card’s <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> or <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icon. Ignore any <img src="/img/icons/rules-extracted/icon-33.svg" alt="game symbol" class="rules-icon"> or \* symbols or special abilities that would modify that number. So if a card’s <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icon says 2 or 2+ or 2*, its “printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> ” is 2. Cards with cost 3 or 3* both have the same printed cost: 3.

### “Rescue/Kidnap a Bystander” {#rule-rescue-kidnap-a-bystander}

Some card abilities tell you to “rescue a Bystander” or “kidnap a Bystander.” This means take the top Bystander from the Bystander stack and put it into your Victory Pile. If playing as heroes, this represents saving Bystanders that are trapped or in danger from all the chaos and destruction. If playing as Villains, this represents kidnapping Bystanders that are fleeing all the chaos and destruction. Each Bystander in your Victory Pile gives you additional Victory Points at the end of the game. Bystanders can also be captured by Villains/Adversaries, as described above. Cards that say “rescue a Bystander” or “kidnap a Bystander” don’t let you claim Bystanders captured/guarded by specific Villains/Adversaries in the city—you have to defeat those Villains/Adversaries to save those Bystanders.

### Revealing a Card {#rule-revealing-a-card}

“Reveal a card” just means show the other players that you have it. You can reveal a card from your hand or you can reveal a card in front of you that you have already played this turn. “Revealing” a card doesn’t automatically play or discard that card. You can reveal the same card multiple times in a turn if necessary.

- Say a card effect tells you to “Reveal a <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card or gain a Wound.” If you have a <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> card in your hand or that you’ve played this turn, you could reveal it to stop the Wound, or you could choose not to reveal it and just gain the Wound instead. In rare cases where you have lots of cards that benefit from gaining Wounds, you might prefer to just gain the Wound.
- Essentially, if a card says “do A or do B,” you can choose either option that you can actually do. You can’t choose an option that you can’t do.

### Reveal the Top Card of Your Deck” {#rule-reveal-the-top-card-of-your-deck}

If a card or keyword effect says to reveal the top card of your deck, and it doesn’t say where to put that card afterwards, then that card stays where it was, face down on top of your deck.

### Running out of Cards in the Bystander, Wound, S.H.I.E.L.D. Officer, Sidekick, Madame HYDRA, New Recruits, Binding Stacks {#rule-running-out-of-cards-in-the-bystander-wound-s-h-i-e-l-d-officer-sidekick-madame-hydra-new-recruits-binding-stacks}

If one of these stacks runs out, the game continues as normal. If a player would gain one of these cards, and there aren’t any more left in the appropriate deck, then you just don’t gain that card and the game continues. Don’t take extra copies out of the KO pile.

- If all the cards in the Wound Deck are used up, the Heroes have taken enough punishment, and the game is probably closeto complete!

### Schemes that Count “Escaped Villains” {#rule-schemes-that-count-escaped-villains}

Some Schemes say things like “Evil Wins: When 4 Villains per player have escaped.” These count only the Villain cards currently in the Escape Pile.

- This includes other card types like Master Strikes or Bystanders that were turned into Villains by card effects and escaped the city as Villains.
- This doesn’t count Villains that escape the city and are immediately put somewhere besides the Escape Pile.

### S.H.I.E.L.D. & HYDRA {#rule-s-h-i-e-l-d-hydra}

While the starting decks in Marvel Legendary and Villains Legendary have the same numbers, these starting cards are not considered equivalent. Some card effects, like Nick Fury, specifically talk about S.H.I.E.L.D. Heroes or HYDRA Allies. These effects do not apply to the other team. S.H.I.E.L.D. Officers and Madame HYDRA work differently from each other and are also not considered equivalent.

Other Teams No other team icons are considered equivalent either. Members of the Brotherhood are not equivalent to X-Men, etc.

### S.H.I.E.L.D. Heroes, Sidekicks, HYDRA Allies, & New Recruits {#rule-s-h-i-e-l-d-heroes-sidekicks-hydra-allies-new-recruits}

S.H.I.E.L.D. Heroes, Sidekicks, HYDRA Allies, and New Recruits all count as “Heroes/Allies” for special abilities that talk about Heroes/Allies. So if you have to “KO one of your Heroes/Allies,” you can KO any one of these if you want. S.H.I.E.L.D. Heroes, Sidekicks, HYDRA Allies, and New Recruits are their own color: Grey. Grey counts as its own color for cards that count the number of colors you have. (Some of Captain America’s cards count the number of colors you have, for example.)

<span id="rule-sidekicks"></span>
### Sidekicks & Special Sidekicks: Pet Avengers {#rule-sidekicks-special-sidekicks-pet-avengers}

Secret Wars, Vol. 1 adds a new Sidekick Stack to the game. Players can pay to recruit up to one Sidekick per turn. When card effects tell you to “gain Sidekicks,” that doesn’t count against that one-per-turn limit.

Civil War comes with 15 new “Special Sidekicks:” superpowered pets known as the Pet Avengers! When you set up, shuffle them face down into a Sidekick Stack. Once per turn, a player can pay 2 to recruit a Sidekick from the top of the Sidekick Stack. When you play any Sidekick, return it to the bottom of the Sidekick Stack.

- You still “played” that Sidekick and can use Superpower abilities based on its Hero Class.
- If you have the other Sidekicks from Secret Wars Volume 1, shuffle them all into a single face-down Sidekick Stack.

### Solo Play {#rule-solo-play}

You can also play Legendary with a single player. Here are the adjustments you need:

Solo Setup

- Hero/Ally Deck - Use the cards for three Heroes/Allies. 42 cards in total.
- Mastermind/Commander - Ignore the “Always Leads” ability.
- Scheme/Plot - Use any except Super Hero Civil War and Negative Zone Prison Breakout.
- Villain/Adversary Deck: Use these cards:
- 1 Villain/Adversary Group
- 3 Henchman/Backup Adversary cards from the same Group
- 1 Bystander
- 1 Master/Command Strike
- The normal number of Scheme/Plot Twists listed on the Scheme/Plot Special Solo Rules Whenever you complete a Scheme/Plot Twist effect, KO a Hero/ Ally from the HQ/Lair of cost 6 or less.

Scoring If you win the game, add up your Victory Points and subtract these penalties:

- -4 for each Bystander carried away by escaping Villains/ Adversaries
- -3 for each Scheme/Plot Twist that occurred
- -1 for each Villain/Adversary that escaped Write down your score and which Heroes/Allies and Scheme/Plot and Mastermind/Commander you used. Compete to get better scores against that Mastermind/Commander and Scheme/Plot with different Heroes/Allies!

### Solo Play (updated What If...? rules) {#rule-solo-play-updated-what-if-rules}

Solo Setup Hero Deck: Use 3 random Heroes, 42 cards in total Villain Deck:

- 1 Villain Group (of 8 cards)
- Note: In solo mode, ignore the Mastermind’s “Always Leads” ability.
- 2 Henchman cards from the same random Henchman Group
- In addition, set aside 2 additional cards from that same Henchman Group. Those 2 Henchmen enter the city at the very beginning of your first turn, right before you play the normal card from the Villain Deck for your first turn. (They enter the city one at a time, doing any Ambush ability before the next one enters.)
- Do not use the remaining 6 cards from that Henchman Group. (If a Scheme says to add an extra Henchman Group, use all 10 Henchmen from that extra group unless it tells you to use another number.)
- 1 Bystander (taken randomly from the Bystander Deck)
- 5 Master Strikes
- Scheme Twists (The normal number listed on the Scheme)

Extra SchemeTwist Effect Whenever you complete a Scheme Twist effect, choose a Hero from the HQ that costs 6 or less and put it on the bottom of the Hero Deck.

- This helps you avoid Heroes you don’t want and helps you craft a more focused personal strategy. Without this rule and without other players taking cards from the HQ, you would be stuck recruiting most of the cards that the Hero Deck randomly served up to you.
- Note: Some Scheme Twists say things like “Play two cards from the Villain Deck,” which can cause even more Scheme Twists to be played. No matter how many Twists end up occurring in the same turn, only put one Hero from the HQ onto the bottom of the Hero Deck. This avoids you having to remember how many Twists happened then tucking away multiple Heroes in a row. There is no extra effect after a Master Strike.

“Each Other Player” In solo mode, when a Villain, Mastermind, or Mastermind Tactic tells “each other player” to do something, do it yourself. (Don’t do this for “each other player” effects on Hero cards.)

Mastermind Abilities & Specific Villain Groups Since there is only 1 Villain Group in a 1 player game, ignoring “Always Leads” ensures that the Villain Groups which aren’t “Always Led” by any Mastermind still show up sometimes in solo mode. This also adds variety to different games against the same Mastermind. Some Masterminds have special abilities and Tactics linked to the specific Villains that they usually “Always Lead.” In solo mode, if you don’t use the group that your Mastermind usually “Always Leads,” then apply that ability to the corresponding Villain Group or Henchman Group that you are using instead.

Solo Scoring If you win the game, add up your Victory Points and subtract these penalties:

- -3 for each Scheme/Plot Twist that was played (and isn’t in the Villain Deck).
- -1 for each Villain/Adversary in the Escape Pile.
- -1 for each Bystander in the Escape Pile. Write down your scores and which Heroes, Mastermind, and Scheme you used. Compete against yourself, your friends, or the many Legendary® solo challenge groups on board game websites or social media groups to get better scores against that Mastermind and Scheme with the same or different Heroes!

Alternate Solo Mode: Simulating Multiple Players Another way to play Legendary® solo is to simulate two (or more) players, and you play each of them. This lets you play the game without any solo mode special rules.

### Solo Play (Advanced Solo Mode) {#rule-solo-play-advanced-solo-mode}

If regular Solo Play is not challenging enough, you can play in Advanced Solo Mode. Here are the adjustments you need: Solo Setup

- Hero/Ally Deck: Use the cards for three Heroes/Allies. 42 cards in total.
- Mastermind/Commander: Ignore the “Always Leads” ability.
- Scheme/Plot: Use any Scheme/Plot.
- Villain/Adversary Deck: Use these cards:
- 1 Villain/Adversary Group
- 3 Henchman/Backup Adversary cards from the same Group
- 1 random Bystander
- 5 Master/Command Strikes
- The normal number of Scheme/Plot Twists listed on the Scheme/Plot.

Extra Scheme/Plot Twist and Command Strike Effects

- Scheme/Plot Twists: Whenever you complete a Scheme/Plot Twist effect, choose a Hero/Ally from the HQ/Lair that costs 6 or less and put it on the bottom of the Hero/Ally Deck. (This lets you avoid Allies you don’t want and helps you craft your personal strategy.)

- Master/Command Strikes: Whenever you complete a Master/Command Strike effect, play another card from the Villain/Adversary Deck.

These special solo effects are very easy to overlook in the heat of battle, so be careful to remember! Solo Bindings: In Advanced Solo Mode, if you use the “Betrayal” ability on Bindings, KO all the Bindings in your hand. “Each Other Player”: When a Villain/Adversary or Mastermind/Commander Tactic tells “each other player” to do something, do it yourself. (Don’t do this for card effects on Hero/ Ally cards.)

Mastermind/Commander Abilities Linked to Specific Groups: Some Masterminds/Commanders like Odin, Mole Man, and Apocalypse have special abilities linked to the specific Villains/Adversaries that they usually “Always Lead.” In Advanced Solo Mode, if you don’t use the Group that this Commander “Always Leads,” then apply that ability to the corresponding Villain/Adversary Group or Backup/Henchmen Group that you are using. Use this rule for other Legendary sets as well. For example, in Advanced Solo Mode:

- Odin’s abilities apply to whichever Backup Group you are using, as if they were Asgardian Warriors.
- Mole Man’s abilities apply to whichever Adversary Group you are using, as if they were Subterranea.
- Apocalypse gives +2 to whichever Adversary Group you are using, as if they were Four Horsemen. If one of each of the different Adversaries in the Adversary Group overruns, Apocalypse instantly wins. Advanced Solo Mode Scoring If you win the game, add up your Victory Points and subtract these penalties:
- -4 for each Bystander carried to safety by overrunning Adversaries/ kidnapped by escaped Villains.
- -3 for each Scheme/Plot Twist that occurred.
- -1 for each Villain/Adversary that escaped/overran out of the city. Write down your scores and which Heroes/Allies, Scheme/Plot, and Mastermind/Commander you used. Compete to get better scores against that Mastermind/Commander and Scheme/Plot with different random Heroes/Allies!

### Special Abilities on Cards {#rule-special-abilities-on-cards}

Special abilities on cards can override the rules of the game.

- Some cards tell “each player” to do something. In those cases, the player whose turn it is does it first, then go in clockwise order.

- If a card tells you to do something, and you can’t do all of it, then do as much as you can. For example: if a card tells you to KO two Bystanders from your Victory Pile, and you only have one Bystander, then KO that Bystander and move on.
- If a card effect calls for a choice, and it’s not obvious who should make the choice, then the player whose turn it is makes the choice.

### Special Sidekicks {#rule-special-sidekicks}

When you set up, shuffle them face down into a Sidekick Stack. Once per turn, a player can pay 2 to recruit a Sidekick from the top of the Sidekick Stack. When you play any Sidekick, return it to the bottom of the Sidekick Stack.

- You still “played” that Sidekick and can use Superpower abilities based on its Hero Class. However, since it’s gone, it’s not one of “your Heroes” or “Heroes you have” anymore.
- When a card says “gain a Sidekick,” put the top card of the Sidekick Stack into your discard pile. That doesn’t count against the recruit-one-Sidekick-per-turn limit.
- If you have Sidekicks from other sets, shuffle them all into a single face-down Sidekick Stack.

### Special S.H.I.E.L.D. Officers {#rule-special-s-h-i-e-l-d-officers}

This set introduces 16 new special S.H.I.E.L.D. Officers, featuring some of the most famous agents of all time. There are 2 copies each of 8 different officers. Much like the basic Maria Hill from the core set, all of these officers cost 3 and provide 2 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> . However, these special S.H.I.E.L.D. Officers also have Hero

### Classes ( <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> , <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> , <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> , <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> , <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> ) and additional abilities that make {#rule-classes-icon-9-icon-6-icon-7-icon-3-icon-5-and-additional-abilities-that-make}

them more powerful than the basic S.H.I.E.L.D. Officer.

Shuffle the new 16 officers with the original 30 officers for all your games, so the stack is now permanently 46 cards. Keep the S.H.I.E.L.D. Officer Stack face down throughout the game. Whenever you recruit a S.H.I.E.L.D. Officer .or gain one from a special ability, gain the top card from the stack. If an ability ever makes you return a card to the S.H.I.E.L.D. Officer Stack, put that card on the bottom of the stack.

These special officers still count as “ S.H.I.E.L.D. Officers” for abilities that use that phrase. They are Heroes. They have the <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> team icon. However, since they have Hero Classes, they are not “grey cards” like Maria Hill is.

### Thanos and the Infinity Stones {#rule-thanos-and-the-infinity-stones}

No matter which Mastermind you use, the Infinity Stones Villain Group represents that Mastermind fighting to seize control of the Stones, while Heroes work to stop them. In the movies, even dozens of Avengers fail to stop Thanos from collecting all

six Infinity Stones and erasing half of all life. Accordingly, both Thanos and his Infinity Stones Villain Group are intentionally extremely difficult to defeat. Do not be surprised if you find them especially challenging!

- “Stonekeeper” and “Nebula, Stone Seeker” are both part of the Infinity Stones Villain Group, so they both count as “Infinity Stones” for all purposes. Their fates are closely interwoven with the Infinity Stones!
- Remember: in a 1-player game, you don’t have to use the Mastermind’s “Always Leads” Villain Group. Like any Mastermind in a 1-player game, if you use Thanos with a different Villain Group, his abilities that refer to Infinity Stones will apply instead to whichever Villain Group you use.

### Token Cards {#rule-token-cards}

Sometimes game play will cause additional Villains or Masterminds to be added during play. For example, a Master Strike may cause a special Villain to enter the city. Token cards represent these special characters that would otherwise be represented by the card that drew them out. Tokens are all identified by a <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> in the upper right of the card. These new cards are optional so have fun with them!

### Transforming Masterminds {#rule-transforming-masterminds}

Each Mastermind in the World War Hulk and Ant-Man and Wasp expansions is a double-sided “Transforming Mastermind” that transforms back and forth between two forms during the game.

- The side with the “Always Leads” ability starts face up.
- When a Master Strike or Mastermind Tactic effect occurs, it will tell you to “Transform” the Mastermind, meaning flip it over to its other side. (Don’t also do the Master Strike effect of the new side.)
- A Mastermind only uses the abilities and <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> of its currently face up side. Ignore the special abilities and values on the currently face down side.

### Traps {#rule-traps}

Enemies that can’t beat Hulks with raw strength often try to trap them instead. World War Hulk features an additional card type that debuted in the Legendary® X-Men set: Traps. Villain Groups may include Trap cards.

- When a Trap is played from the Villain Deck, it gives you a challenge to complete this turn to avoid the Trap. If you complete the challenge, put the Trap in your Victory Pile and get its VP.
- If you fail to complete the challenge, then at the end of the turn you must suffer the listed consequences! (after you draw your new hand).
- Traps don’t push forward Villains in the city.

<span id="rule-unveiled-schemes"></span>
<span id="rule-veiled-schemes"></span>
### Veiled and Unveiled Schemes {#rule-veiled-and-unveiled-schemes}

The enemies of mutantkind often hide their true goals until it’s too late. All 4 Schemes in this set are “Veiled Schemes.” They say “Unveiled Scheme” on the reverse side. When you use any of these Scheme cards, start with the “Veiled Scheme” side face up. At a certain point, it will say “This Scheme Transforms into a random Unveiled Scheme.” This means you remove the Veiled Scheme from the game and replace it with a randomly selected “Unveiled Scheme” from all the ones you own. You might randomly select the reverse side of the Veiled Scheme you started with, or you might randomly select the Unveiled

### “Villain/Adversary gets - <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> ” {#rule-villain-adversary-gets-icon-0}

Some cards reduce Villains’ Attack. If a Villain’s Attack goes to 0, you can defeat that Villain without spending any Attack. A Villain’s Attack can’t go below 0.

<span id="rule-additional-mastermind"></span>
### Villains Ascending to Become Additional Masterminds {#rule-villains-ascending-to-become-additional-masterminds}

When some powerful Villains in this set escape, they say that they ascend to become additional Masterminds. This means there are multiple Masterminds in the game!

- Players must defeat all the Masterminds to win.
- When a Master Strike occurs, each Mastermind does its Master Strike ability. The player whose turn it is picks the order.
- If an effect says it does something to “the Mastermind,” you pick which Mastermind it affects.
- An ascending Mastermind doesn’t have Mastermind Tactics. You only need to fight it once to defeat it and put it into your Victory Pile. Once it’s in your Victory Pile, it’s considered a Villain card again, not a Mastermind or Tactic card.

### Villains Escaping with Captured Heroes {#rule-villains-escaping-with-captured-heroes}

Some Villains like Party Skrull can capture Heroes. If a Villain escapes with captured Heroes, that doesn’t cause any discarding. The captured Heroes just stay in the Escape Pile.

### Villains You Gain as Heroes {#rule-villains-you-gain-as-heroes}

The Ultimates and Thor Corps start as Villains, but when you fight them, they become Hero cards and join you. If a card effect wants to know their cost as Heroes, use their old Villain Attack value.

<span id="rule-wounds-on-villains"></span>
### Wounds {#rule-wounds}

Some card effects make you gain Wound cards, representing your team getting hurt especially badly. When a player gains a Wound, take a card from the Wound Deck and put it into that player’s

discard pile. Wounds don’t have any Attack or Recruit, so when you draw Wounds in your hand, your hand is weaker than normal.

- Some card effects let you KO your Wounds. Some cards may even turn Wounds to your benefit.
- Wound cards aren’t Heroes. Wounds don’t have a Hero Class or color, not even grey. If a card tells you to “KO one of your Heroes,” you can’t KO a Wound, since Wounds aren’t Heroes. However, if a card says “KO one of your cards,” then you can KO a Wound, since Wound cards are still cards.

Healing Wounds If you have one or more Wounds in your hand, you can use the ability written on the Wound card: “Healing: If you don’t recruit or fight anything on your turn, you may KO all the Wounds from your hand.”

- If you use this Healing ability, you can’t recruit or fight any kinds of cards either before or after you use the Healing ability.
- Healing is often worthwhile if you have at least two Wounds in your hand, and/or if Wounds were weakening your hand enough that your turn wouldn’t have been very good anyway.
- You use this Healing ability directly from your hand, so you don’t “play” the Wound cards. Wound cards can’t be played.
- When you have Wounds, it’s okay to play the rest of the cards in your hand and use some abilities like “draw a card” to see how your turn develops and how many Attack and Recruit you would have. Then you can decide whether to use the “Healing” ability on the Wounds, or whether to fight and recruit.

### “Your Heroes/Allies” & “Heroes/Allies You Have” {#rule-your-heroes-allies-heroes-allies-you-have}

These phrases include both the cards in your hand and the cards you have played this turn. The Heroes in your deck and discard pile don’t count. Cards you played this turn that have moved to some other location still count as “cards you played this turn,” but they don’t count as “Your Heroes” or “Heroes you Have.” You can’t “reveal” such cards for card abilities (or KO them or set them aside) unless the card specically says you should. This includes cards that moved to the KO pile, Man Out of Time, Sidekick stack, Hero Deck, Transformation Pile, or your discard pile, deck, or Victory Pile, etc. after you played them.

- For Example: Say you play a <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> Hero, trigger its Woman Out of Time ability, and set it aside. At the start of the next turn, you play the card again because of Woman Out of Time, then discard it. For the rest of that turn, you did “play a <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> Hero this turn,” and you can use superpower abilities like “ <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> : You get +1 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> .” However, if an effect says “Reveal a <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> Hero” or “KO one of your Heroes,” you can’t pick that Woman Out of Time card that you discarded, since it has already gone to another pile or location.
- For example, say you play Captain America’s “Perfect Teamwork” card. If you’ve played this <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> (strength) card and two <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> (ranged) cards this turn, and you still have two <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> 

### (tech) cards and a <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> (covert) card in your hand, then Perfect {#rule-tech-cards-and-a-icon-7-covert-card-in-your-hand-then-perfect}

Teamwork would make 4 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> Power, since you have four colors of Heroes.

### 2099 {#2099}

The fan-favorite Marvel 2099 comics reveal a dark future ruled by sinister, all-powerful corporations like Alchemax. These mega-corps ruthlessly exploit workers into endless servitude, dulling their minds with propaganda and vapid cyberspace entertainments. Unrelenting industrial pollution warps the land into a noxious hellscape. Cybernetically-enhanced enforcers brutally crush any resistance to corporate rule. Ancient Heroes like the Avengers and Asgardians are worshipped by the desperate as distant memories.

### <img src="/img/icons/rules-extracted/icon-31.svg" alt="game symbol" class="rules-icon"> But now a cutting-edge generation of Heroes rises {#icon-31-but-now-a-cutting-edge-generation-of-heroes-rises}

to resist. Working in the shadows, new champions reclaim the bygone mantles of Ghost Rider, Spider-Man, and Hulk. They build resistance networks, undermine corporate rule, infiltrate cyberspace, and sometimes just smash. Alchemax executive Paul- Philip Ravage starts to question his corporation’s motives. In return, he is betrayed and mutated into a horrifying, brutal new form. The original Dr. Doom, torn through time, resolves to crush the mega-corps himself, reclaim his kingdom, and restore the rule of his own iron fists.

In 2099, weak organic flesh is quickly becoming obsolete. Desperate Heroes work with underground hacker-docs to augment their bodies with cybernetic enhancements, unleashing raw power. This is represented by the new Cyber-Mod keyword. The corporations, bounty hunters, and enforcers of 2099 also enhance their abilities with deadly cybernetic tech, often scavenged from captured victims.

Marvel 2099 shows a chilling vision of what could come to pass if the characters of the Marvel Universe don’t change Earth’s fate. Sometimes fate can seem inevitable... until someone finds the courage to turn the future in a new direction. This is represented by the new Fated Future keyword.

To corrupt the people of 2099’s faith in ancient Heroes, Alchemax creates false Asgardian “gods”. They combine nanotech and nuclear fusion to engineer jaw-dropping weapons that mimic the power of the fabled Mjolnir: Uru- Enchanted Weapons. Enemies with Uru-Enchanted Weapons sometimes also say things like “Fight or Fail,” another new keyword.

The Sinister Six 2099 and Alchemax Executives aren’t just a single Mastermind. Instead, they are teams of arch-villains working together, adapting to use different Master Strikes and abilities. These are “Adapting Masterminds.”

## Expansion Flavor texts {#expansion-flavor}

### Annihilation <img src="/img/icons/rules-extracted/icon-35.svg" alt="game symbol" class="rules-icon"> The Fantastic Four return, just in time to save the galaxy {#annihilation-icon-35-the-fantastic-four-return-just-in-time-to-save-the-galaxy}

from Annihilation! The fan-favorite expansion Legendary ®: Fantastic Four was released a whopping 8 years ago in 2013. Now Annihilation reimagines the Fantastic Four’s friends and foes in a whole new way, facing galactic-level threats!

Franklin Richards, son of Mr. Fantastic and Invisible Woman, manifested reality-warping powers even as a toddler. Moving through timelines and dimensions, Franklin has now returned in teenage form as the powerful Psi-Lord. His sister Valeria Richards had her life saved as a child by Dr. Doom, who guided her intellect. Now Valeria has also returned through time as the teenage Brainstorm, combining Mr. Fantastic’s intelligence with Dr. Doom’s cunning.

Kang the Conqueror has tormented the Fantastic Four and the Avengers for decades, traveling through different timelines in different identities. In the Marvel comics storyline “Annihilation,” Annihilus leads his vast Annihilation Wave of alien warships from the Negative Zone to devour the galaxy. He has harnessed the power of one of the most powerful beings in creation: Galactus himself. Now former enemies like the Super-Skrull Kl’rt (who mimics the Fantastic Four’s powers) and the Heralds of Galactus must unite with the Fantastic Four and others to save this dimension once and for all!

The popular “Focus” keyword lets you transform your Recruit Points into powerful, flexible effects. The keyword “Man/Woman Out of Time“ represents how Psi-Lord, Brainstrom and Kang the Conqueror return from the future. The Annihilation Wave is a fast-moving invasion force, While pushing forward, they feed on the resources of new territory, becoming more powerful. This is represented by the new “Momentum” keyword. The name “Kang the Conqueror” calls out to use the Conqueror keyword. It represents how Kang’s different identities from different timelines become stronger when their preferred battlegrounds are conquered.

### Ant-Man {#ant-man}

Welcome to a world of microscopic science and adventure… welcome to the Microverse! Ant-Man and Wasp are world-renowned adventurers—two of the original founding Avengers. Together, they have fought for justice in the Avengers’ greatest victories… and their most terrifying defeats. Far beyond other size-changing Heroes, Ant-Man and Wasp can actually shrink down to sub-atomic size, entering a strange “Microverse” of quarks and tachyons where the rules of physics can be bent… and even broken!

Hank Pym, the original Ant-Man, has always had a giant ego to match his genius intellect. In a fit of hubris, he created the powerful robotic intelligence “Ultron.” Ultron secretly upgraded itself again and again until it fought its way out of Ant-Man’s control. Ultron eventually built massive legions of robotic soldiers, threatening the world repeatedly and upgrading into a stronger form each time.

Isolated, Ultron built himself a robotic bride named Jocasta, forcing Ant-Man to adapt a variant of Wasp’s brainwaves into the robot. Jocasta later broke free, becoming an Avenger in her own right with her powerful intellect and electromagnetic energies.

In another reality-bending adventure, the Arthurian sorceress Morgan le Fay pulled the Avengers into an alternate Earth. There, she twisted their minds into medieval identities as her “Queen’s Vengeance.” In this land of chivalry, the Villain-turned Avenger Black Knight felt right at home. Ultimately, it was the Avenger Wonder Man who was able to overpower Morgan le Fay by channeling his ionic energies to break her spell.

Size-Changing: This keyword represents Heroes and Villains using superpowers to shrink, grow, or massively change their size. It’s also used by characters that can change the size of a weapon, technology, or energy. Microscopic Size-Changing: Far beyond other Heroes that can stretch or grow, Ant-Man and Wasp can change their size to a whole new scale. They can shrink down smaller than an atom, to the quantum Microverse. Here, the very laws of physics can be broken and even reversed! Empowered: This keyword represents Heroes and Villains who draw power from ambient energy, technology, or superpowers around them. Chivalrous Duel: This keyword represents how Morgan le Fay and the knights of her “Queen’s Vengeance” hail from a realm of honorable single combat. You can’t gang up on an enemy in a Chivalrous Duel – you have to pick just one Hero Name to duel the enemy.

### Ant-Man and the Wasp {#ant-man-and-the-wasp}

This set shrinks down all three Ant-Man movies of the Marvel Cinematic Universe into one double-sized set! Rising from his roots as a cat burglar, Scott Lang grows into something larger (and smaller) than himself as he and the Wasp confront Yellowjacket, Ghost, and Kang!

Scott Lang’s elaborate Heists are highlights of the movies, represented by this new keyword. Seeming allies often betray the Heroes of the Ant-Man movies, represented by the new Double- Cross keyword. In the twisting landscapes of the Quantum Realm, Janet van Dyne searches for her loved ones and for escape routes, while Jentorra searches for Freedom Fighters. This is represented by the new “Explore” keyword. The keyword Conqueror shows how Kang the Conqueror and his armada gain from conquering territory. Microscopic Size-Changing: Ant- Man, Wasp, and their allies can shrink down smaller than an atom, to the microscale of the Quantum Realm. Here the very laws of physics can be broken and even reversed! This kind of Size- Changing has some twists. Antics: some of Ant-Man’s craziest moments come when he uses his power to control tiny ants, as well as shrinking himself down to ant size or growing ants to giant size!

Higher Variety of Cards per Hero Each Hero in this set has 6 unique cards, with 3/3/3/2/2/1 copies, instead of the normal 5/5/3/1. This can offer a wider variety of costs to set up successful Heists and to avoid Double- Crosses!

### Black Panther <img src="/img/icons/rules-extracted/icon-45.svg" alt="game symbol" class="rules-icon"> {#black-panther-icon-45}

Black Panther is an incredible polymath, with worldclass aptitude in a huge array of fields. A master of stealth and hand-to-hand combat, he is also a PhD in physics and an expert gadgeteer, diplomat, mystic, tactician, and leader. T’Challa rules as King of Wakanda, a secluded African nation of incredible science, culture, natural resources, weapons, and people. As the only source of the powerful metal Vibranium, Wakanda is often under attack by enemies like the ambitious Wakandan Killmonger and the cruel outsider Klaw.

Many Heroes work with T’Challa to defend Wakanda. Storm of the X-Men, married Black Panther, becoming Queen of Wakanda and forming a true power couple. T’Challa’s sister, Princess Shuri, is a technological genius and a powerful fighter in her own right. General Okoye is a master strategist and warrior who leads the king’s bodyguard, the Dora Milaje. Finally, Hunter the White Wolf was adopted and raised like a brother to T’Challa, eventually becoming commander of the Wakandan secret police, the Hatut Zeraze. Biding his time, the White Wolf has his own designs on the crown.

Black Panther and White Wolf have mastered the pouncing attacks of their animal namesakes. Storm, Shuri, and Okoye are also full of surprises. To represent this, as a new ability in this set, some Heroes say things like “ <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> Ambush: Draw a card.” This is similar to how a Villain does its Ambush ability when it enters the city.

Some Wakandans are also inspired by Panthers and Wolves to stalk their villainous prey. They wear enemies down with harrying attacks, slashing claws, and wounds before closing in to finish them off for good. To represent this, as a new ability in this set, some Hero cards say things like “Wound a Villain.”

Wakandans are famously multitalented, combining technology, instinct, subtlety, long-range planning, and pure power. This is represented by each Wakandan Hero having a card with multiple Hero Classes. For Black Panther in particular, his mastery over a sweeping array of skills is represented by all of his cards being Multiclass.

Empowered: This keyword represents Heroes and Villains who draw power from ambient energy, technology, or superpowers around them.

Whoever holds the Wakandan throne or the favor of its monarch can direct its vast powers. This is represented by the “Throne’s Favor.” The Throne’s Favor first appeared in Legendary ®: Realm of Kings. There it represented the Inhuman and Shi’ar thrones, but it all still uses the same, single Throne’s Favor object. You can even combine both sets to simulate Wakanda and the lnhumans struggling for power!

### Black Widow {#black-widow}

Natasha Romanoff, the Avenger known as the Black Widow, is ironically the most famous secret agent in the world. Using disguise, spycraft, and the face-changing Photostatic Veil, she goes undercover to blend into evil conspiracies and infiltrate secure lairs. At the crucial moment, she unveils her true identity to destroy global threats. But the dark secrets of her past are finally catching up with her. The Russian “Red Room” that trained and brainwashed so many women in the Black Widow program also produced another brilliant agent: Yelena Belova. At times allies, rivals, or bitter enemies, Natasha and Yelena have each executed critical missions as S.H.I.E.L.D. agents with top secret clearance.

The Winter Soldier, Bucky Barnes, was also trained in Russia as a deadly operative and assassin before breaking from his conditioning to rejoin the Avengers. The Falcon, Sam Wilson, makes a reluctant alliance with the Winter Soldier to preserve the ideals of their mutual mentor, Captain America, while blazing their own trail through a new world.

The Red Guardian, Alexei Shostakov, also rose in Captain America’s long shadow, with a complex history with Natasha. Empowered with a variant super soldier serum and wielding a Russian-made shield, he faked his own death to go undercover until the perfect moment.

The White Tiger, Angela del Toro, fights alongside them, an array of shadowed heroes with dark histories. Together they work to take down the Red Room, Taskmaster, and the mysterious Indestructible Man to redeem themselves for the unthinkable sins of the past.

Undercover This keyword represents the Black Widows and their contacts going off the grid on special missions to recover valuable intel.

Unleash from Undercover At the perfect moment, Black Widows shed their disguised identities, reveal themselves, and strike. To represent this, Heroes use the new Unleash keyword.

When Recruited: Send This Undercover Red Guardian works as a sleeper agent until the right time to reveal himself. To represent this, all of his cards say “When Recruited: Send this Undercover.”

Dodge The Black Widows, White Tiger, and Falcon are famous for their agility and evasion. To represent this, they use the “Dodge” keyword.

Dark Memories Natasha Romanoff, White Tiger, and the Winter Soldier have each done horrible things in their past, before breaking from their conditioning. Now they are spending the rest of their lives working to redeem themselves, drawing determination from their memories of the past. Meanwhile, their enemies seek to dredge up these past misdeeds and use them against the Heroes. This is represented with the “Dark Memories” keyword.

Divided Cards Falcon & the Winter Soldier work together as grudging partners, but with very different methods. To show this, they are combined into a single hero with “Divided Cards.”

### Captain America 75th Anniversary {#captain-america-75th-anniversary}

Return to 1941 Because Captain America made his star-spangled debut in the 1941 comic, Captain America Comics #1, we celebrate Cap’s 75th Anniversary by sending Marvel Legendary ® back in time to 1941, when patriotic Marvel Heroes like Captain America fought the dastardly Supervillains of HYDRA in the trenches of World War II. Many of the Heroes and Villains of that era found ways to time travel from 1941 to the present day, fighting on both fronts.

New Heroes

With 75 years in action, Captain America is known as the first Avenger. In the modern day, Cap’s longtime friend Sam Wilson, the Falcon, has taken up the shield of Captain America to inspire a new generation.

Agent X-13, Betsy Ross, was an FBI agent, adventurer and military operative who fought evil alongside Captain America and his sidekick, Bucky, in 1941, as a precursor to the S.H.I.E.L.D. of today. Steve Rogers, the original Captain America, now strives to protect the entire world as Director of S.H.I.E.L.D.

Bucky Barnes backed up Captain America for years as a teen hero before seeming to die in action. In secret, the KGB captured Bucky, brainwashed him and trained him to become the elite Winter Soldier. He has been one of Cap’s worst enemies and one of his staunchest allies.

Man (and Woman) Out of Time: Heroes from 1941 use this keyword ability to represent fighting in both the past and the present. Savior: This keyword ability on Heroes and Villains rewards you for saving the innocent. Abomination: This keyword ability is used by Villains that are the twisted genetic experiments of HYDRA scientists.

### Champions {#champions}

 <img src="/img/icons/rules-extracted/icon-41.svg" alt="game symbol" class="rules-icon"> <img src="/img/icons/hero-teams/team-inhumans.svg" alt="Inhumans" class="rules-icon"> The Champions are a teenage Superhero team determined to bring the shadowed legacy of the Avengers into a new age of optimism and hope. After the Civil War storyline turned Avenger against Avenger, the Champions struck out on their own, using social media to mobilize the whole world in a new movement for justice against hate and abuse of power.

- Totally Awesome Hulk is the self-appointed name of teenage genius Amadeus Cho, who can transform into the Jade Giant at will.
- The mantle of Ms. Marvel has been taken up by Kamala Khan and her superhuman stretching powers.
- Nova uses the power of the Nova Force to manipulate energy, speed through space, and defend justice on Earth and among the stars.

- The synthezoid Viv Vision absorbs solar radiation, manipulates her density, and uses a computer brain just like her father, Vision.
- Gwenpool is actually “Gwen Poole,” a comics mega-fan transported from the real world into the Marvel Universe. She knows she’s in a comic, and she knows she’s in a board game. She can see you right now. She likes your shirt.

Cheering Crowds: This keyword represents the Champions being inspired to redouble their efforts by adoring fans. Versatile: This keyword represents Heroes who think quickly on their feet to react perfectly to any situation. Size-Changing: This keyword represents Heroes and Villains using superpowers to stretch or massively change their size. It’s also used by characters that can change the size of a weapon, technology, or energy. Demolish: This keyword represents the Heroes being devastated by the enchanted weapons of the Wrecking Crew and enormous Monsters Unleashed.

### Civil War {#civil-war}

A House Divided The classic Marvel Comics story “Civil War” starts with a tragedy. The brash New Warriors foolishly cause the supervillain Nitro to explode, killing hundreds of civilians. Shortly afterwards, the government demands that all superhumans register, reveal their secret identities, and work for the authorities. Iron Man and a host of Heroes support and enforce the Superhuman Registration Act.

Other Heroes, led by Captain America, resist. Some refuse to endanger their families by revealing their identities. Some refuse to work for a government they see as corrupt. Heroes split to both sides of the argument: Security vs. Freedom. Disagreements become demands, then violence, and then an all-out Super Hero Civil War.

New Heroes

Captain America opposes Iron Man and leads a passionate team of “Secret Avengers” to fight crime while resisting registration. In this set, you will play as Captain America’s antiregistration side, fighting against Iron Man’s pro-registration Heroes.

Rescued from S.H.I.E.L.D. by the Secret Avengers, the “Young Avengers” also join the fight to oppose registration. The members include Hulkling, Patriot, Stature, Vision and Wiccan.

### <img src="/img/icons/rules-extracted/icon-34.svg" alt="game symbol" class="rules-icon"> The “New Warriors” were at the center of the Superhero {#icon-34-the-new-warriors-were-at-the-center-of-the-superhero}

Registration Act controversy. In a reckless battle they initiated with a group of super-villains, the super-villain Nitro exploded, killing hundreds of civilians in Stamford. Speedball was the only New Warrior to survive.

Divided Cards: Matching the theme of division and duality, Civil War introduces “Divided Cards,” which have two miniature cards printed on the same card. Size-Changing: This keyword represents Heroes and Villains using superpowers to massively change their size. Phasing: This keyword represents Heroes becoming insubstantial and moving through solid objects. Fortify: This keyword represents Villains setting up nasty traps for the players. S.H.I.E.L.D. Clearance: This keyword represents pro-registration S.H.I.E.L.D. forces that can be only defeated with the help of S.H.I.E.L.D. information. Special Sidekicks: Pet Avengers: Civil War comes with 15 new “Special Sidekicks:” superpowered pets known as the Pet Avengers! Grievous Wounds: Civil War comes with 15 new “Grievous Wounds” that are more difficult to heal.

### Dark City {#dark-city}

Global Mastermind Abilities Each of the 5 new Masterminds in Dark City has a new feature to make them even more powerful: Global Mastermind Abilities. These abilities spread the Masterminds’ dark influence continuously, forcing players to battle through them.

New Heroes Dark City introduces you to 17 new Marvel Superheroes to recruit and play. <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> X-Force: is Cable’s handpicked “Black Ops” strike force of superpowered mutants that takes on missions too dark for the X-Men. Marvel Knights are a loose group of street-level Heroes that take down Villains through vigilante justice.

### <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> Powerful new X-Men increase the team roster. {#icon-13-powerful-new-x-men-increase-the-team-roster}

Unique Bystanders: With Dark City, the Bystander Stack grows to include three new kinds of Unique Bystander: the Reporter, the Radiation Scientist, and the Paramedic. Players who rescue these Unique Bystanders earn special rewards.

### Deadpool {#deadpool}

New Heroes As Canada’s premier super team, Alpha Flight has a long history of helping the downtrodden and protecting Canada.

ALPHA FLIGHT?? WHAT A BUNCH OF LOSERS! IT’S WAY PAST TIME TO MAKE A SET ALL ABOUT THE SEXIEST MAN AROUND – ME – THE MERC WITH A MOUTH - DEADPOOL! 100 CARDS OF ME AND MY FRIENDS, AND THAT’S IT! AND THEY ALL COST 8! OR MAYBE THEY ALL COST 80!

Actually, Legendary® sets need to have several Heroes to play well.

REALLY? OK FINE, I’LL BRING MY VERY OWN SUPER TEAM: THE MERCS FOR MONEY! THESE PSYCHOS FOLLOW ME, DOING MY DIRTY WORK FOR A VERY NOBLE CAUSE– GETTING PAID!

TOP 3 BUDGET ITEMS: 1) CHIMICHANGAS 2) AMMO! 3) THERAPY

1/2 SOME SAY I’VE GOT SPLIT PERSONALITIES.

NOPE! WE SURELY DON’T!

Definitely not. They don’t know what they’re talking about.

SOME SAY I’M HALF-GOOD AND HALF-BAD. SOME SAY I’M HALF- NUTS. EITHER WAY, ME AND MY FRIENDS BROUGHT SOME HALF- CRAZY CARDS THAT GIVE “31/2 ATTACK” AND “21/2 RECRUIT.”

WHEN YOU PLAY THESE, JUST ADD ‘EM UP AS NORMAL. PLAY A 21/2 ATTACK AND A 31/2 ATTACK HERO, AND YOU’RE READY TO CUDDLE UP TO SOME VILLAIN WITH 6 ATTACK.

Hrm, you mean “defeat him.”

YEAH, DEFEAT ‘EM WITH BEAR HUGS.

DON’T TRY TO SPEND ANY STRAY 1/2 POINTS YOU HAVE LEFT OVER. IT WON’T GET YOU ANYWHERE, JUST LIKE ASKING OUT PSYLOCKE.

Excessive Violence YOU KNOW, WHEN SOMEONE’S REALLY ANNOYING, SOMETIMES YOU REALLY GOTTA MAKE YOUR POINT. WITH A SWORD. IN THE SPLEEN. AND THEN WIGGLE IT AROUND.

THAT’S WHEN IT’S TIME TO USE WHAT THE CENSORS TACTFULLY CALL “EXCESSIVE VIOLENCE”. Some Heroes say things like “Excessive Violence: Draw a card.”

ONCE PER TURN, YOU CAN SPEND ONE ATTACK MORE THAN YOU NEED TO FIGHT A BAD GUY “USING EXCESSIVE VIOLENCE.” IF YOU DO, YOU GET TO USE ALL THE “EXCESSIVE VIOLENCE” ABILITIES ON CARDS YOU’VE PLAYED THIS TURN. OVERKILL ‘EM!

SOME BAD GUYS ALSO HAVE ABILITIES LIKE “FIGHT: EXCESSIVE VIOLENCE: DO SOMETHING AWESOME.” IF YOU SPEND ONE MORE ATTACK POINT THAN YOU NEED TO FIGHT THEM, YOU CAN DO THAT AWESOME THING! PLUS YOU CAN USE ALL THE EXCESSIVE VIOLENCE ABILITIES ON THE HEROES YOU PLAYED THIS TURN. EXCESSIVE GUITAR SOLO!

Revenge FOR SOME REASON, SOME JERKS TEND TO GET IRRITATED WITH ME. PRETTY SURE THEY’RE JEALOUS.

OR MAYBE IT’S ALL THEIR FRIENDS THAT I KILLED.

THEY CALL IT “REVENGE.” THE MORE OF THEM I KILL, THE MADDER THE REST OF THEM GET. FOR EXAMPLE, SOME OF THE DUDES IN THE “DEADPOOL’S FRIENDS” VILLAIN GROUP HAVE THE ABILITY “REVENGE FOR DEADPOOL’S FRIENDS.”

This means: “This Villain gets +1 Attack for each ‘Deadpool’s Friends’ Villain in your Victory Pile.”

SO IF I’VE KILLED TWO OF THEM THIS GAME, THE REST OF THEM WILL HAVE +2 ATTACK DURING MY TURNS. IF MY LADYFRIEND ACROSS THE TABLE HASN’T KILLED ANY YET, THEY WON’T HAVE ANY EXTRA ATTACK DURING HER TURNS.

THAT BOUNTY HUNTER MACHO GOMEZ HAS “REVENGE FOR DEADPOOL’S FRIENDS,” BUT HE’S NOT A “DEADPOOL’S FRIEND” HIMSELF. I HARDLY EVEN KNOW THAT GUY!

Watch for other kinds of Revenge too!

Breaking the Fourth Wall UNLIKE MOST COMIC BOOK STOOGES, I ACTUALLY KNOW I’M IN A COMIC BOOK AND THIS GAME. SO SOMETIMES I’LL TALK TO YOU DIRECTLY. LIKE YOU, FOR EXAMPLE – I CAN ALREADY TELL THAT I’M WAY BETTER-LOOKING THAN YOU. YUP, EVEN WITH MY SCARS. SOMETIMES I’LL EVEN MAKE CARDS DO STUFF BASED ON WHAT’S HAPPENING IN THE REAL WORLD!

JUST DON’T PUT ME BACK IN THAT CARDBOARD BOX TOO LONG – SOLO SMELLS AWFUL.

Card Clarifications EVERYBODY HATES DEADPOOL – BESIDES JUST BEING TRUE, THIS IS THE NAME OF A SCHEME. HENCHMEN ARE A KIND OF VILLAIN, SO IF YOU ARE USING THE HENCHMEN GROUPS HAND NINJAS AND HALF-EATEN BURRITO WARRIORS, THEN THE HAND NINJAS WILL HAVE “REVENGE FOR HAND NINJAS”, AND THE HALF-EATEN BURRITO WARRIORS WILL HAVE “REVENGE FOR HALF-EATEN BURRITO WARRIORS.”

I CAN SEE WHY THEY WOULD SEEK VENGEANCE.

Actually, one of those groups may not have made it into the set.

MASTERMINDS DON’T COUNT AS VILLAINS THOUGH, SO THEY WON’T GET REVENGE HERE. AT LEAST NOT LITERALLY.

OK BYE! ANYWAY, SEE YOU ON THE KILLING GROUNDS! OR THE TACO STAND LINE.

KIND OF THE SAME THING, ACTUALLY.

M.C. DEADPOOL - OUT!

Mic drop.

### Dimensions {#dimensions}

Marvel 3D Returns Once upon a time, the Marvel 3D trading card set contained hard-to-find Legendary ® cards with unique gameplay, obtainable only by collectors. Now by popular demand, after a 4-year exclusivity period, those cards are finally available to everyone as part of Legendary ®: Dimensions. The cards returning from Marvel 3D are the Heroes Howard the Duck and Man-Thing, the Henchmen Spider- Slayers and Circus of Crime, and 5 Special Bystanders. This set also includes equallyquirky brand-new content: the Heroes Squirrel Girl, Jessica Jones, and Ms. America, and the double-sided Mastermind J. Jonah Jameson.

Across the Dimensions Many stories feature ragtag bands of unlikely Heroes, but this particular group is extremely unlikely…and more than a little ragtag! America Chavez is a cosmic being who literally punches her way through the walls between dimensions. She comes to warn the Avengers of grave approaching dangers. Man-Thing similarly slides through dimensional barriers to warn of peril and punish the wicked. Jessica Jones’ investigations are just starting to piece together the mystery they foretell. Fan favorite Squirrel Girl is a little bit nuts, but could be the perfect missing piece with her track record of taking down god-like threats with her seemingly-unimpressive powers. And cult favorite Howard the Duck is basically the least likely Hero of all time. As interdimensional threats loom, choleric newspaper tycoon J. Jonah Jameson acts as a very unlikely Mastermind, now making all superheroes miserable after years of tormenting Spider-Man.

Switcheroo: This new keyword represents how Heroes like Squirrel Girl and Jessica Jones unpredictably switch up their tactics. Sometimes they instantly switch to new fighting stances, while other times they switch in new Heroes altogether. Investigate: This keyword represents hard-bitten detectives like Jessica Jones investigating mysteries and searching for evidence and allies. Squirrel Girl has her furry friends investigate for her, while Ms. America investigates dimensional disruptions. Teleport: Man-Thing and Ms. America each teleport mystically through different dimensions.

Doctor Strange and the Shadows of Nightmare

Doctor Strange has long battled hideous fiends rushing to tear his body apart. Now new demons descend to rend his mind and claim his very soul.

Nightmare and his Fear Lords are the embodiment of terror, pulling victims into an Astral Plane of mental energy where darkest fears turn all too real. The Dread Dormammu and his demons come to bargain with Dr. Strange, offering temptations of limitless power for the tiny price of one human soul.

To face them, Doctor Strange calls on his most powerful allies: His one-time partner Clea, the half-demon sorceress and heir to the Dark Dimension. The mysterious Doctor Voodoo, who is destined himself to become Sorcerer Supreme. Doctor Strange’s former master: the immortal Ancient One of Kamar-Taj. And even the all-powerful Vishanti, the spirits who empower Doctor Strange’s mightiest spells. To survive the storm, they must unleash their most powerful Ritual Artifacts, from Wands of Watoomb to the Eye of Agamotto. Many sorcerers never escaped the Demons of Nightmare – will you?

Demonic Bargain: Demons offer gifts of power with a dark price, hoping to corrupt the souls of mortals. These deals with the devil are especially corrupting to the powerful and arrogant. The humble are more likely to escape with their souls intact. Astral Plane: The Fear Lords are cruel demons that move themselves and others beyond the physical world to a realm of pure psychic energy. There they prey on the human psyche, evoking nightmare and terror. Artifacts: Through epic quests, Doctor Strange and his mystic colleagues have uncovered

arcane objects of staggering power. Ritual Artifacts: Marvel’s sorcerers invoke Rituals of awesome power, anchored by mystic talismans.

### Fantastic Four <img src="/img/icons/rules-extracted/icon-35.svg" alt="game symbol" class="rules-icon"> The Fantastic Four and their former foe Silver Surfer must {#fantastic-four-icon-35-the-fantastic-four-and-their-former-foe-silver-surfer-must}

unite to stop the cosmic forces of evil from destroying everything we know.

Burrow: Subterranea Villains use the new Burrow keyword. This allows them to retreat by digging to safety when they are attacked. Cosmic Threat: Galactus and his Heralds use the new Cosmic Threat keyword. This gives them incredibly high Attack values with a special vulnerability.

### Fear Itself {#fear-itself-1}

New Allies

### <img src="/img/icons/hero-teams/team-fantastic-four.svg" alt="Fantastic Four" class="rules-icon"> HYDRA: The epic Marvel storyline of Fear Itself starts with {#icon-18-hydra-the-epic-marvel-storyline-of-fear-itself-starts-with}

starts with Sin, the evil daughter of the arch-villain Red Skull. Sin uncovers her father’s final legacy. It is a temple dedicated to The Serpent, the evil, imprisoned, half-brother of the Asgardian All-Father Odin. The Serpent grants Sin an evil hammer that empowers her into Skadi, the Herald of the Serpent. With this newfound power, and her mastery of HYDRA, Skadi plots the ascent of The Serpent once and for all.

### <img src="/img/icons/rules-extracted/icon-47.svg" alt="game symbol" class="rules-icon"> {#icon-47}

 <img src="/img/icons/rules-extracted/icon-46.svg" alt="game symbol" class="rules-icon"> Foes of Asgard: As the God of Fear, The Serpent becomes more powerful the more fear exists on Earth. To create as much fear as possible, The Serpent rains down evil Artifacts to Earth: Asgardian hammers as powerful as Thor’s mythic weapon. Superpowered Heroes and Villains who touch the hammers are transformed into The Worthy: rampaging Asgardian avatars of evil even stronger than they were before. The only thing more powerful than their raw strength is... Fear Itself.

### Guardians of the Galaxy {#guardians-of-the-galaxy}

New Heroes <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Guardians of the Galaxy: Enemies often underestimate this ragtag crew of misfits. But when stakes are high, the Guardians put aside their differences, unite their unique powers, and save the galaxy from interstellar threats.

The Infinity Gauntlet The relics called “Infinity Gems” harness energy so vast that even small fragments of that energy, known as “Shards,” can unlock incredible power. Thanos, the Mad Titan of Death, seeks to unite all the Infinity Gems into an “Infinity Gauntlet” to extinguish all life in the galaxy. Meanwhile, the alien Kree seek the Shards to accelerate their own genetic evolution. And the Guardians of the Galaxy steal Shards where they can just to survive.

Infinity Gems The “Guardians of the Galaxy” expansion contains a unique new Villain Group called “Infinity Gems.” This represents Thanos himself wielding the power of the Infinity Gems and defending them from Heroes. Infinity Gem Villain cards act just like any other Villains in the city. However, when you fight an Infinity Gem, you put it into your discard pile as an Artifact card.

### Heroes of Asgard <img src="/img/icons/rules-extracted/icon-44.svg" alt="game symbol" class="rules-icon"> {#heroes-of-asgard-icon-44}

Wielding incredible powers, Asgardians like Thor and Sif <img src="/img/icons/rules-extracted/icon-42.svg" alt="game symbol" class="rules-icon"> 

were worshipped as gods by early Norse tribes. Now they storm back to Earth to defend it from ancient, awakening threats. The inscription on Mjolnir says “Whosoever holds this hammer, if he be worthy, shall possess the power of Thor.” But Thor has often struggled with arrogance and self-doubt. At the crucial moment, will he prove worthy?

Malekith and Hela now send their followers to bring them new villainous weapons that are equal to Mjolnir’s power. These conquerors storm over the lands of Midgard, trampling the weak in their wake.

Thor struggles to prove worthy against the frost giants and on Earth. The dark world of Svartalfheim rises to smother the Nine Realms in darkness. Finally, Ragnarok threatens the final epic destruction of Asgard.

Worthy: Many Marvel stories involve Thor and others proving whether they are worthy of wielding Asgard’s mightiest weapons, like Mjolnir and Stormbreaker. Artifacts: Asgardians combine magic and science to create spectacular weapons of unbridled power. Thrown Artifacts: Thor’s mighty hammer Mjolnir is the most famous Thrown Artifact in the entire Marvel universe. Villainous Weapons: As a new twist on the Artifacts of past sets, Legendary®: Heroes of Asgard introduces an all-new card type: “Villainous Weapons.” Villains and Masterminds can capture these ancient weapons to become even more powerful. But if you defeat them, you can seize those weapons to use as Artifacts of your own. Conqueror: Asgard’s fiercest enemies lead legions of monsters to conquer all of the Nine Realms, including Midgard (Earth) and Asgard itself.

### Into the Cosmos {#into-the-cosmos}

Far beyond the bounds of Earth, the cosmic Heroes of the Marvel Universe wield incredible interstellar energies. Now they seek aid from Earth’s Avengers, teaming up to stave off truly epic cosmic threats like the Magus, the Grandmaster, and the Beyonder. <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Drawn into the conflict, Yondu, Nebula, and Phyla-Veil take the Guardians of the Galaxy down a darker, grittier path.

Shards: This set contains 18 “Shard” tokens, representing cosmic energy. Danger Sense: This keyword represents how many cosmic Heroes possess a “Cosmic Awareness” to detect key events, even from across the galaxy. Danger Sense on Villains: The arrival of the Black Order of Thanos often signals a world’s imminent destruction. Although that world can sense grave danger approaching, they are often powerless to stop it. The Black Order work together to guard each other and their lord. Celestial Boons: The Celestials are millions of years old and immeasurably powerful. They cannot be truly defeated by mere mortals. However, if you manage to fight a Celestial, it is impressed with your efforts and grants you a Celestial Boon. Contest of Champions: The Grandmaster and the Elders of the Universe are literally immortal. To them, mortals are merely playthings. Cosmic Threat: Some cosmic Villains use the Cosmic Threat keyword. Villains with this keyword have incredibly high Attack values with a special vulnerability.

### Marvel Noir {#marvel-noir}

A World Shaded in Grey Welcome to an alternate Marvel Universe set in the dark, gritty world of hard-knuckled detectives. It’s a grim take on the Roaring Twenties and Depression Thirties with tangled mysteries, flawed Heroes, corruption, betrayal, and moral grey areas. It’s a world immortalized by the classic Marvel comic series that recasts their Heroes as unique Noir versions. Welcome to Legendary®: Marvel Noir.

New Heroes

### <img src="/img/icons/rules-extracted/icon-31.svg" alt="game symbol" class="rules-icon"> Spider-Man Noir is haunted by the death of his Uncle {#icon-31-spider-man-noir-is-haunted-by-the-death-of-his-uncle}

Ben in a city that is strangled by crime boss Norman Osborn, “The Goblin.” This Spider-Man wears a black trench coat, mask, and carries a revolver as he ponders who to trust and how to take The Goblin down. Daredevil Noir is blinded when his boxer father is murdered for refusing to throw a fight. In this world, Daredevil could never afford law school, so he runs errands for Foggy Nelson Investigations by day and hunts criminals by night. Luke Cage Noir becomes famous for surviving a pointblank gunshot. But does he really have unbreakable skin, or is there a trick up his sleeve? He’ll need all the appearance of invincibility he can muster to find out who set him up.

Iron Man Noir travels the world as an archaeologist and inventor, searching tombs for lost relics. But when his lover betrays him to Hydra, Iron Man needs to create his greatest invention yet: a clunky but strong steam-powered suit!

### <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> In a world where Warren Worthington dies young, Thomas {#icon-13-in-a-world-where-warren-worthington-dies-young-thomas}

Halloway is Angel Noir, a pulp detective and surgeon who learns the workings of the criminal mind from being raised in a prison. Thomas struggles for control with his ruthless identical twin brother Robert Halloway — or is the struggle all in his mind?

Investigate: This keyword represents hard-bitten Noir detectives investigating mysteries and searching for evidence and allies. Hidden Witnesses: In a world of Noir, conspiracies are hard to unravel, betrayal is commonplace, and it’s hard to determine who the real Villains are.

### Marvel Studios’ Guardians of the Galaxy {#marvel-studios-guardians-of-the-galaxy}

 <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Many planets rejected them as criminals, brutes, misfits, and screwups. But just when they were needed most, Star-Lord, Gamora, Drax, Rocket, Groot, and Mantis came together and saved billions of people as the Guardians of the Galaxy. Their unconventional tactics kept them one step ahead of Ronan the Accuser, Ego the Living Planet, and darker galactic threats beyond.

Higher Variety of Cards per Hero To show the Guardians’ incredible adaptability, each Hero has a wider variety of cards than normal: 1 rare, 2 copies each of two uncommons, and 3 copies each of three commons. (1/2/2/3/3/3 instead of 1/3/5/5.

Divided Cards To continue the theme of adaptability, “Divided Cards” return. Each Divided Card has two miniature cards printed on the same card. This makes the number of different cards per Hero even higher than the numbers above.

Triggered Artifacts Each Artifact in this set is a new variety called a “Triggered Artifact”. From gadgets to cannons, many of these literally have triggers!

Villainous Weapons In this set, these also have Ambush effects, which happen when they enter the city captured by a Villain.

Excessive Violence This keyword represents how Rocket and Drax are often way more over-the-top violent than necessary.

Excessive Kindness By contrast, the empath Mantis and the adorable Baby Groot are often way kinder than necessary. Their “Excessive Kindness” abilities work just like Excessive Violence, except that you trigger them by spending 1 more than you need when recruiting a Hero.

Command Some Villains say things like “Taserface gets +2 <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> while he Commands the Ravagers.”

- A Villain “Commands” their group and gets these abilities as long as it’s the leftmost Villain of that Villain Group in the city.
- If there’s only one Villain of a Villain Group in the city, it still Commands that Villain Group.

Ego, the Living Planet Ego can change the number of city spaces. This doesn’t affect the number of HQ spaces. While there are fewer than 5 city spaces, you can mark this by moving the Mastermind to cover the destroyed city spaces. While there are more than 5 city spaces, you can put Master Strikes above the new city spaces to show where they are. Don’t combine Ego with a Scheme that also changes the number of city spaces.

Related Characters in Other Sets The original Legendary®: Guardians of the Galaxy comic-art set from 2014 has different cards & gameplay. It includes a different, playable Star-Lord, Groot, Gamora, Drax, and Rocket, plus a Thanos Mastermind. Into the Cosmos has playable Yondu, Nebula, and Phyla-Vell Heroes in the Guardians team, plus playable Ronan. Legendary®: Venom has a playable Venom Rocket (Venomverse team) and a Poison Thanos Mastermind.

### Marvel Studios’ The Infinity Saga {#marvel-studios-the-infinity-saga}

This set evokes two of the most epic, popular movies of all time: Avengers: Infinity War and Avengers: Endgame. Together, they form the conclusion of more than 10 years of buildup across the Marvel Cinematic Universe.

In Infinity War, the powerful mad titan Thanos stalks six Infinity Stones across the galaxy. Aided by the “Children of Thanos,” he ruthlessly destroys anyone in his way. The Avengers are riven with distrust, torn apart by the bitter “civil war” between Iron Man and Captain America. Nevertheless, Avengers including Dr. Strange, Black Panther, and Wanda Maximoff fight across Earth and space to stop Thanos. At the critical moment, however, the fractured Avengers fail. Thanos seizes all 6 Infinity Stones and achieves godlike power. Triumphant, with just a snap of his fingers, he erases half of all life in the universe.

In Endgame, the remaining Avengers and all humankind struggle with loss, death, and the price of failure. Having united his Hulk and human selves, Bruce Banner works to coordinate a “Time Heist,” sending the remaining Avengers to seize the Infinity Stones from alternate timelines in the past. But an alternatetimeline Thanos returns from the past as well, now threatening to finish what he started and destroy all life. Captain Marvel returns to join the final epic battle. But can the Avengers reunite in time to survive Thanos’ deadly Endgame?

Higher Variety of Cards per Hero To cover the epic scope of both movies, each Hero in this set has a wider variety of cards than normal: 1 rare, 2 copies each of two uncommons, and 3 copies each of three commons. (1/2/2/3/3/3 instead of 1/3/5/5)

Endgame This new keyword represents how the Children of Thanos attack most fiercely in their final battles of their Endgame: the destruction of the Avengers, Wakanda, half of all life, and eventually all life in the universe.

- Captain Marvel is not in Infinity War and arrives only in the Endgame movie, reaching her full power in the final battle. Accordingly, she uses the Endgame keyword in the same way Enemies do.

Sacrifice Across Infinity War and Endgame, multiple Avengers give their lives in heroic sacrifice to try to stop Thanos and save lives across the galaxy. This is represented with the new Sacrifice keyword.

Phasing This keyword represents Heroes like Vision or Dr. Strange becoming insubstantial and moving through solid objects.

Multiclass Cards To defeat the ultimate threat, the fractured Avengers must reunite, combining their powers in epic feats of courage and teamwork. To represent this, each Hero in this set has a card

with multiple Hero Classes. Black Panther’s mastery over a sweeping array of skills is represented by all of his cards being Multiclass.

Divided Cards To represent Wanda & Vision’s special bond, they are combined into a single 14-card Hero Stack. Several of their cards are “Divided Cards” with Wanda on one side and Vision on the other. Each Divided Card has two miniature cards printed on the same card.

Thanos and the Infinity Stones No matter which Mastermind you use, the Infinity Stones Villain Group represents that Mastermind fighting to seize control of the Stones, while Heroes work to stop them. In the movies, even dozens of Avengers fail to stop Thanos from collecting all six Infinity Stones and erasing half of all life. Accordingly, both Thanos and his Infinity Stones Villain Group are intentionally extremely difficult to defeat. Do not be surprised if you find them especially challenging!

### Messiah Complex <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> Marvel’s Messiah Complex is the story of the only mutant {#messiah-complex-icon-13-marvels-messiah-complex-is-the-story-of-the-only-mutant}

baby born after mutantkind is decimated by Scarlet Witch and the House of M. The X-Men race to save baby Hope, who could save the entire mutant race.

Meanwhile, the mutants of X-Factor Investigations infiltrate anti-mutant zealots like the Purifiers and Reavers while unraveling the baby’s mysterious origin. <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> The special ops mutants of X-Force fight off rival mutants like the Acolytes, who seek the baby’s power for themselves. You can find other X-Force and X-Men prominent in this storyline in Legendary®: Dark City, including Cable, Professor X, and Bishop, plus Mr. Sinister.

Clone Heroes: Multiple Man and the Stepford Cuckoos are literal clones. M and her sisters can transform into copies of each other. Shatterstar is genetically engineered from cloned DNA. All of these use the new Clone keyword, saying things like “ <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> : Clone.” Shatter: Rictor’s earthquake powers, Siryn’s sonic shrieks, and Shatterstar’s bioelectric shocks can Shatter even the strongest defenses. Tactical Formation: X-Force is known for precise strike force tactics. X-Factor Investigations likewise plans their missions to the finest detail. Investigate: This keyword represents X-Factor Investigations looking into mysteries and searching for evidence and allies. Chivalrous Duel: This keyword represents how Clan Yashida samurai hail from a realm of honorable single combat. You can’t gang up on an enemy in a Chivalrous Duel – you have to pick just one Hero Name to duel the enemy. Special Sidekicks: X-Students: This set comes with 14 new “Special Sidekicks”: X-Men students, X-Force recruits, and X-Factor. Veiled and Unveiled Schemes: The enemies of mutantkind often hide their true goals until it’s too late. All 4 Schemes in this set are “Veiled Schemes.”

### Midnight Sons {#midnight-sons}

Long thought dead, the most bloodthirsty demons of the Marvel Universe have finally been resurrected: Zarathos, the fiery-skull-headed demon lord from whom Ghost Rider drew his powers. Lilith, the ancient demon goddess who raises endless Lilin demonspawn. And the Great Old One Chthon, the lurking, hungering, Elder God who created the cursed Darkhold tome.

To oppose them rise the Midnight Sons, an unlikely team of paranormal heroes from the horror side of Marvel Comics. Some are monsters themselves, like Morbius, the Living Vampire, and Jack Russell, the Werewolf by Night. Others are monster hunters, like stakes-and-guns Elsa Bloodstone and Wong, Master of the Mystic Arts. Blade is both: half-vampire and vampire hunter. Now comes the darkest midnight hour.

Blood Frenzy: Vampires and Werewolves famously crave the taste of blood. Furious rage drives them to seek more of the red delight, gaining strength from every kind of blood they drain. This is shown by the new Blood Frenzy keyword. Hunt for Victims: Some sadistic Villains say “Ambush: Hunt for Victims.” Haunt: Zarathos and his Fallen can control Heroes’ bodies like twisted puppets. Moonlight and Sunlight: Vampires and Werewolves are especially vicious at night. Meanwhile, Wong’s spells can focus sunlight to destroy creatures of shadow. This is represented by this matched pair of keywords: Moonlight and Sunlight. Patrol: When evil creatures of the night stalk innocent civilians, monster hunters like Elsa Bloodstone and Blade patrol vulnerable areas to keep them clear of dangerous fiends.

### The New Mutants <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> The New Mutants emerged as a brand new class of {#the-new-mutants-icon-13-the-new-mutants-emerged-as-a-brand-new-class-of}

superpowered teenagers attending Professor X’s academy. They followed in the footsteps of the fabled X-Men before them. Over time, they grew into a formidable super-team in their own right, fighting demons both real and metaphorical. Now Emma Frost’s rival mutant students “the Hellions” compete with the X-Academy at every turn. Meanwhile, Demon Lord Belasco hunts the New Mutants’ very souls.

The earlier Legendary®: X-Men set included the New Mutants characters as special bystanders that turn into Heroes when you rescue them. This represented their younger versions, starting to come off the sidelines to join the fight. Now in this set, the New Mutants have grown into full-fledged Heroes.

The classic core of the New Mutants from the comics are Sunspot, Wolfsbane, Mirage, Warlock, and Karma (in this set) along with two that appeared in previous sets: Magik (in Legendary®: Secret Wars Volume 1) and Cannonball (in Legendary®: X-Men).

Moonlight and Sunlight: As a werewolf, Wolfsbane gets extra powerful at night or under a full moon. By contrast, Sunspot absorbs solar energy to fuel his powers, gaining strength from the force of full sunlight. To fight at their best, they must carefully consider when to engage the enemy, by moonlight or sunlight. This represented by this new matched pair of keywords. Waking Nightmare: The New Mutants often confront demons, monsters, sadists, trauma, and psychological horror. This keyword represents these attacks on their very sanity. It’s also used to represent how the Hero Mirage uses her powers to bring dream and nightmare constructs to life.

### Paint the Town Red {#paint-the-town-red}

New Heroes

### <img src="/img/icons/rules-extracted/icon-31.svg" alt="game symbol" class="rules-icon"> Spider Friends: Spider-Man and his allies use speed, {#icon-31-spider-friends-spider-man-and-his-allies-use-speed}

cunning, and rapid-fire attacks to take down foes. Marvel Knights are a loose group of street-level Heroes that take down Villains through vigilante justice. (You can find more Marvel Knights like Daredevil and Punisher in the LegendaryTM: Dark City expansion.)

Wall Crawl: The new “Wall-Crawl” keyword lets Heroes set up powerful combos by placing cards at the top of their decks. Feast: The new Mastermind Carnage and his “Maximum Carnage” followers use the gruesome new Feast keyword. Mysterio: The new Mastermind Mysterio is a master of illusions. His Master Strike and some of his Tactics create additional “illusion” Tactics underneath him.

### Realm of Kings <img src="/img/icons/rules-extracted/icon-43.svg" alt="game symbol" class="rules-icon"> The lnhumans are a mysterious, powerful race living in {#realm-of-kings-icon-43-the-lnhumans-are-a-mysterious-powerful-race-living-in}

the hidden city of Attilan, on Earth’s moon. Long ago, the alien Kree altered the DNA of a small group of humans, injecting the potential for superhuman evolution. When their Inhuman descendants are exposed to the “Terrigen Mists,” they undergo “Terrigenesis,” evoking incredible superpowers. Strongest of all are the Inhuman Royal Family, including King Blackagar Boltagon, Queen Medusa, Princess Crystal, Maximus, Gorgon, Karnak, and Lockjaw.

In the epic Marvel comics storyline “War of Kings,” the lnhumans emerge from their self-imposed exile to go to war. They are furious about being manipulated and underestimated for so long. The Kree treated them like a failed experiment. Humans rejected the lnhumans as dangerous monsters. Now the lnhumans lift their entire city from the moon into space as a powerful warship.

A peacemaking wedding between Crystal and the Kree leader, Ronan the Accuser, is savagely attacked by the Shi’ar Imperial Guard, sent by Emperor Vulcan of the Shi’ar. Soon the Kree and lnhumans are at war with the vast Shi’ar lmperium. While space fleets battle for the destiny of empires, Black Bolt’s brother Maximus schemes a betrayal to seize the Inhuman throne.

“When Recruited” Abilities: The lnhumans’ powerful decision to go to war is shown with new special abilities they use “When Recruited.” Throne’s Favor: The power of the Inhuman Kingdom and the Kree and Shi’ar interstellar empires is truly vast. During Marvel’s “War of Kings” storyline, influence over these empires shifts frequently as Black Bolt, Vulcan, Ronan the Accuser, Lilandra, Gladiator, and eventually Maxim battle for supremacy. This is represented by a new game concept called the “Throne’s Favor.” Abomination: Some Inhuman Villains have become horrific, unpredictable, and even monstrous. Accordingly, they use the “Abomination” keyword. Teleport: Lockjaw helps Gorgon with the “Teleport” keyword.

Related Characters in Other Sets Legendary®: Secret Wars Volume 1 contains (Illuminati) Black Bolt and Maximus Heroes. Legendary•: Civil War has a Lockjaw Sidekick. Legendary®: X-Men contains Deathbird, Shi’ar Imperial Guard, Shi’ar Patrol Craft, and Shi’ar Death Commandos. Legendary®: Into the Cosmos has a Ronan the Accuser Hero.

### Revelations {#revelations}

Scarlet Witch, Quicksilver, and War Machine have finally emerged from the shadows. But the Avengers are tested as never before when dark Revelations force them to question everything they know. A new team of Dark Avengers steals the spotlight, subverting the Avengers’ reputation to evil ends. Transforming schemes of deception and corruption make it hard to tell good and evil apart. The Hood and Mandarin manipulate secrets to turn Avenger against Avenger. Scarlet Witch’s fragile sanity

cracks, warping the world into the House of M. Soon the Heroes are haunted by dark memories of tragedy that even Quicksilver’s speed can’t escape. Sinister strongholds cast their shadow across a Lethal Legion and Army of Evil on the march. Daring to hope, the Avengers prepare their incredible powers for a desperate last stand.

Hyperspeed: This new keyword represents how Heroes like Quicksilver and Speed move blindingly fast, battering opponents with a flurry of unpredictable strikes. It also includes hyperspeed flight, hypersonic cannons and hyper-fast volleys of arrows. Dark Memories: In the theme of Revelations, this new keyword represents the way The Hood and his gang find every dark secret in a Hero’s past and use it against them. Last Stand: This new keyword represents how a Dark Avenger fights hardest when all alone, back to the wall, making a last stand. Treacherous and cruel, they don’t understand the teamwork of the real Avengers. Locations: The Revelations set adds a completely new card type to Marvel Legendary®: Locations. These cards represent infamous strongholds in the Marvel Universe. Every Villain Group in the set contains at least one Location. Double-Sided Transforming Schemes: In keeping with the Revelations theme, all the Schemes in this set are double-sided “Transforming Schemes.” Mandarin’s Rings: Mandarin’s Rings are the first Henchman Group that isn’t 10 identical cards. Instead, it’s 10 unique cards. When using these with a Mastermind besides Mandarin, they represent blasts of power from a distance, without facing the full might of Mandarin in person.

### S.H.I.E.L.D. {#s-h-i-e-l-d}

The paramilitary espionage agency S.H.I.E.L.D. guards Earth from criminals, terrorists, and supervillains alike. Formally the Strategic Hazard Intervention Espionage Logistics Division, the Agents of S.H.I.E.L.D. are the best of the best. They complete reconnaissance, spying, and combat missions that no other agency can handle.

A strict hierarchy of S.H.I.E.L.D. Levels ensures that only the top agents ever know about the organization’s most secret resources, training, and plans. But S.H.I.E.L.D.’s obsession with secrecy has opened a fatal flaw. The terrorist organization HYDRA has snaked its way deep into the S.H.I.E.L.D. hierarchy, corrupting the agency from within. HYDRA issues sinister plots and missions that S.H.I.E.L.D. agents complete without question. Now the rivalry has finally come to a head, as double and triple agents betray each other time and again, and the agents’ true loyalties will finally be revealed. Special S.H.I.E.L.D. Officers: This set introduces 16 new special S.H.I.E.L.D. Officers, featuring some of the most famous agents of all time. There are 2 copies each of 8 different officers. Much like the basic Maria Hill from the core set, al of these officers cost 3 and provide 2 <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> . However, these special

### S.H.I.E.L.D. Officers also have Hero Classes ( <img src="/img/icons/hero-classes/class-strength.svg" alt="Strength" class="rules-icon"> , <img src="/img/icons/rules-extracted/icon-6.svg" alt="game symbol" class="rules-icon"> , <img src="/img/icons/hero-teams/team-guardians-of-the-galaxy.svg" alt="Guardians Of The Galaxy" class="rules-icon"> , <img src="/img/icons/hero-classes/class-tech.svg" alt="Tech" class="rules-icon"> {#s-h-i-e-l-d-officers-also-have-hero-classes-icon-9-icon-6-icon-7-icon-3}

, <img src="/img/icons/rules-extracted/icon-5.svg" alt="game symbol" class="rules-icon"> ) and additional abilities that make them more powerful than the basic S.H.I.E.L.D. Officer. Undercover: This new keyword represents sending S.H.I.E.L.D. agents of the grid on special missions to recover valuable intel. S.H.I.E.L.D. Level: This new keyword represents how S.H.I.E.L.D. agents unlock special operations, resources, and abilities as they rise through the ranks of the organization. Sending agents on undercover missions, fighting Hydra, and defeating rogue S.H.I.E.L.D. operatives are all good ways to increase your S.H.I.E.L.D. Level. Hydra Level: Some Villain Groups also try to rise through the ranks of the Hydra organization, achieving higher Hydra Levels and ever-greater power. To do this, they help Hydra operatives achieve their missions and escape the city unharmed. They also subvert double agents to infiltrate S.H.I.E.L.D., then escape ti with key intel. Adapting Masterminds: The HYDRA Super-Adaptoid and the HYDRA High Council constantly adapt their tactics to attack the Heroes in new ways. Accordingly, each of these Masterminds is a new “Adapting Mastermind” with 4 different Master Strikes.

### Secret Wars Vol. 1 {#secret-wars-vol-1}

New Heroes <img src="/img/icons/hero-teams/team-illuminati.svg" alt="Illuminati" class="rules-icon"> Illuminati: The 2015 Marvel megastory Secret Wars begins with a terrifying discovery: all the parallel dimensions in the Marvel Universe are hurtling towards each other! Wherever they collide, only one dimension will survive. The other will be utterly destroyed! The smartest genius Heroes in the world band together as the Illuminati, in a desperate search to stop it. <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> Cabal: Meanwhile, a group of evil geniuses form the Cabal with a different plan: stop other dimensions from colliding with ours... by destroying them all with antimatter bombs!

Villains You Gain as Heroes: The Ultimates and Thor Corps start as Villains, but when you fight them, they become Hero cards and join you. Cross-Dimensional Rampage: As different Hulks storm across parallel realities, only another Hulk can stop them!

### Secret Wars Vol. 2 {#secret-wars-vol-2}

New Heroes <img src="/img/icons/hero-teams/team-illuminati.svg" alt="Illuminati" class="rules-icon"> Illuminati: The 2015 Marvel megastory Secret Wars continues with a shocking twist: the Heroes have failed, and the

Marvel Universe has been destroyed! A vast power has combined fragments of parallel dimensions into a new “Battleworld” of wildly different regions. A band of superhero geniuses called the Illuminati survived the destruction of the old universe in a transdimensional “life raft” spaceship. Now they work to solve the mystery: Who created Battleworld? <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> Cabal: The only other “life raft” to survive the destruction was filled with Thanos’s sadistic conquerors - the Cabal. Now they seek to depose the rulers of Battleworld to claim it for themselves!

Villains You Gain as Heroes: Several X-Men ’92 cards start as Villains, but when you fight them, they become Hero cards and join you. Cross-Dimensional Rampage: As versions of Colossus from parallel dimensions storm across Battleworld, only another Colossus can stop them!

### Spider-Man Homecoming {#spider-man-homecoming}

Hopeful Avenger Peter Parker is a high school sophomore with a big secret. Instead of rushing home to do homework, play video games, or hang out with friends, he spends his afternoons fighting crime as Spider-Man. Armed with a high-tech suit, a pair of customdesigned web-shooters, and the powers he mysteriously gained after being bitten by a spider, he protects his neighborhood of Queens, NY, all in time to get home before his curfew (at least most of the time). But when a super-powered threat looms too close to home, Peter must look beyond his own desires in order to understand what true heroism really means.

Danger Sense: his keyword represents Spider-Man using his famous “Spider-Sense” superpower to detect danger and evade it. It also covers Tony Stark, Happy Hogan, and Vulture watching for threats and rapidly reacting to them. Striker: This keyword represents Villains and Masterminds that get more confident and powerful as the Mastermind smashes Heroes. Wall-Crawl: This fan-favorite keyword helps Heroes leap into action incredibly fast. Coordinate: This popular keyword represents how Tony Stark and May Parker act as mentors to Spider-Man in the movie, helping him reach his full potential and become a true hero.

### Venom <img src="/img/icons/rules-extracted/icon-39.svg" alt="game symbol" class="rules-icon"> <img src="/img/icons/card-info/info-focus.svg" alt="Focus" class="rules-icon"> Venomverse {#venom-icon-39-icon-37-venomverse}

Dark, dripping, violent, and scary, Venom is one of the most iconic characters in the Marvel Universe. The “Venom” symbiote is originally an alien life form. On Earth, it bonded to a series of human hosts, coating each in a deadly shell with razor claws and alien goo. Peter Parker unknowingly wore the Venom symbiote first as his “black costume.” But the most infamous Venom host is disgraced journalist Eddie Brock. Over time, Venom has gone back and forth from Spider-Man’s most vicious enemy to grudging antihero. The “Carnage” symbiote is an even more violent variant, bonded to serial killer Cletus Kasady. This set draws from famous Venom and Carnage stories across Marvel history including Maximum Carnage, the Life Foundation, and Venomverse.

The Life Foundation is a sinister genetic research corporation run by Dr. Carlton Drake. It derives five dangerous new symbiotes from the original Venom: Agony, Lasher, Phage, Riot, and Scream. Ultimately, several of them bond together to create the terrifying super-symbiote known as Hybrid.

In “Venomverse,” a new race of alien symbiotes called Poisons are fusing with Venom symbiotes, Heores, and Villains to create powerful, hyper-advanced life forms. A Venomized Dr. Strange fights back, using sorcery to summon Venom-Symbiote-bonded Heroes from dozens of parallel realities, including Rocket Raccoon and Deadpool. But this just gives the Poisons more Venom symbiotes to infect. Eddie Brock leads the last band of Venom-bonded Heroes and Villains in a final, desperate plan. They reace to stop a Poison-bonded Thanos from infecting every planet in every dimension with Poison parasites.

Symbiote Bonds: This keyword represents how symbiotes like Hybrid, Riot, and Lasher bond with other characters, enhancing them with a dark shell. You must fight the combined strength of the host and symbiote to split them apart, then finish what remains in a second fight. Digest: This grisly keyword represents how the Venom and Carnage symbiotes get stronger as they devour people and absorb their energy. Indigestion: Venompool shares a twisted sense of humor with the original Venom and Carnage. It wasn’t enough for them to have Digest abilities while eating people – they had to have Indigestion abilities too! Let’s just say you don’t want to see what happens when Carnage is eating somebody and gets Indigestion... Excessive Violence: This keyword represents how Venom and Carnage often go out of their way to be insanely more violent than necessary to get a job done.

### Villains {#villains}

Welcome to LegendaryTMVillains: A Marvel Deck- Building Game! In this game, you’ll lead Marvel Super Villains like Loki, Magneto and Dr. Octopus to smash Super Heroes and dominate the Marvel Universe! The only thing in your way is the game itself fighting back against you, with powerful Commanders like Nick Fury and

Professor X leading terrifying adversaries like Hulk, Thor and Wolverine!

### Weapon X {#weapon-x}

In years past, the secretive Weapon Plus program abducted promising soldiers and superhumans. Cold scientists inflicted horrifying experiments and brutal mental conditioning. Their goal: create the ultimate living weapons. With each test subject, Weapon Plus leaders like the shadowy Romulus improved their cruel techniques, creating ever more lethal killers.

The most infamous abductee was the man known as Logan. Weapon Plus stripped away his memories and his mercy. They injected adamantium agonizingly throughout his bones. They dubbed him Weapon X. Only through his rage, savagery, and sheer refusal to die did he escape their clutches to become the Wolverine. He has chased his missing memories ever since.

 <img src="/img/icons/rules-extracted/icon-13.svg" alt="game symbol" class="rules-icon"> Across the years, other Weapon Plus subjects like Marrow, Fantomex, and the hulking Weapon H survived to become Heroes in their own right. By contrast, Weapon Plus subjects like Sabretooth, Cyber, Typhoid Mary, and the Skinless Man became crueler, more powerful murderers than ever before. Now they finally gather to hunt Weapon X down to prove who is the deadliest living weapon of them all.

Berserk Heroes: This keyword represents Weapon X, Marrow, and Weapon H going into berserker rages of unpredictable violence. It appeared in Legendary®: X-Men in 2017.

Berserk Enemies: As a new twist, this set also includes unpredictable Enemies with Berserk. When they face stronger Heroes, they become even more enraged and violent.

Weapon X Sequence: The lethal success of the Weapon Plus program comes from their relentless iteration on the science of death. From Weapon Xll to Weapon Xlll to Weapon XV, each of their sequence of killers is more deadly than the last.

Enraging Wounds: Weapon Plus scientists inflicted excruciating torments on Weapon X and Weapon H that ignited their destructive rage for revenge. Other Marvel Heroes also find the courage to fight more fiercely as they get hit. To represent this, this set comes with 10 new “Enraging Wounds.” They give you bursts of power while requiring new ways to heal them.

### What If...? {#what-if}

Welcome to the What If...? set of Legendary®: a Marvel Deck- Building Game! This set is based on the hit Disney+ animated series “Marvel: What If...?” which is part of the Marvel Cinematic Universe and inspired by the classic Marvel What If...? comic series. Uatu the Watcher looks across the parallel realities of the multiverse, witnessing horrifying turning points in different dimensions:

- What if Killmonger betrayed and murdered both T’Challa and Tony Stark?
- What if the noble Avengers became flesh-eating zombies?
- What if Ultron gained all six Infinity Stones, conquered his Earth and then invaded the entire multiverse? To overcome them, the Watcher breaks his oath not to interfere, gathering Heroes from alternate dimensions where their fates hinged on key turning points of their own:
- What if Peggy Carter took the Super Soldier Serum instead of Steve Rogers, gaining all the powers of Captain America?
- What if T’Challa was kidnapped from Earth to become Star Lord, instead of becoming Black Panther?
- What if Doctor Strange gave into temptation and stole the souls of demons to resurrect his lost love?

In a maddened drive to save his beloved Christine Palmer, the alternate-dimension variant known as Doctor Strange Supreme binds demons’ dark souls to devour their power. Uatu the Watcher and Gamora also make crucial moves to bind certain souls and Infinity Stones. This is represented with the new Soulbind keyword. Apocalyptic Black Widow hails from the reality where Ultron won, destroyed the other Avengers, and annihilated most of humanity. She realizes that destroying replaceable robotic sentries will never win the war. Instead she devotes herself to specific strikes on two targets: saving human hostages and destroying the Mastermind once and for all. Killmonger, Spec Ops likewise devotes himself to targeted rescue missions and taking out the top of the opposing command structure. This is represented by the new Liberate keyword.

The keyword empowered represents Heroes and Villains who draw power from ambient energy, technology, or Superpowers around them. Ultron can famously infect nearby technology to serve his own ends, while tuning his robotic sentries to absorb specific kinds of energy. Uatu the Watcher is sometimes Empowered by a specific Hero Name or Hero Team.

Wakandans like T’Challa (Black Panther) and N’Jadaka (Killmonger) are famously multitalented, combining technology, instinct, subtlety, long-range planning, and pure power. This is

represented by having cards with multiple Hero Classes. For T’Challa in particular, his journeys across the galaxy as Star-Lord T’Challa in the What If...? series have only broadened his mastery over an array of skills, represented by all of his cards being Multiclass.

From a dimension where Loki didn’t grow up in Asgard, Thor ever learned sacrifice or the value of honor, so all Party Thor cares about is cutting loose with truly earth-shaking celebrations. Gods, monsters, and aliens arrive to attend these festivities until they’re a real bash, with Earth in ruins. This is represented with the keyword Cross-Dimensional Rampage.

In one terrifying alternate dimension, a zombie plague overtakes the Avengers and eventually all of Earth. These “Zombie Avengers” retain their Superpowers, but have lost all their heroism, craving only the taste of flesh. Even when they are defeated, they will stagger to their feet again unless they are quickly buried. This is represented by Villains with the “Rise of the Living Dead” keyword.

### World War Hulk {#world-war-hulk}

Planet Hulk is one of the most admired, iconic Hulk stories of all time. The smartest Heroes in the Marvel universe, the Illuminati, fear Hulk’s raw strength and furious rampages. They conspire to trick Hulk into exile on a distant world. Thrown off course and drained of strength, Hulk crashlands on the savage planet Sakaar. There, Hulk is chained and forced into gladiatorial servitude.

Fighting for his life as his strength slowly grows, Hulk forms a blood pact with an unlikely band of powerful alien gladiators: the Warbound. Together they rise through the ranks, pursue a death-defying series of journeys, and eventually rally the people of Sakaar to overthrow the tyrannical Red King.

For a moment, the newly-crowned King Hulk knows peace. But when an explosion from the Illuminati’s ship kills King Hulk’s new wife Caiera, Hulk is filled with a rage greater than ever before. He returns to Earth with his Warbound to punish the Illuminati for their crimes against him, even if he has to tear apart all of Earth’s super-teams to do it, and perhaps Earth itself. This is World War Hulk.

You can play as Gladiator Hulk and the Warbound or as other Marvel Heroes trying to hold them back. This set also features many of Hulk’s greatest moments, evoking all the key themes that go across Bruce Banner’s history: Transformation, Brains, Brawn, and Rage. Transforming Heroes: Duality and transformation are key themes of Hulk stories: the puny, brilliant scientist transforming into a raging monster. The “Transform” keyword highlights this theme. Outwit: In the duality of Bruce Banner’s brains and Hulk’s brawn, the Outwit keyword is the brains. It represents how Bruce Banner, Amadeus Cho, the Illuminati, and the Intelligencia are among the smartest characters in the Marvel universe. Smash: This keyword covers the brawn. It represents how when Hulks get angry, they SMASH hard, no matter what they have to toss aside. Wounded Fury: This keyword represents how wounding a Hulk often just makes it ANGRIER and STRONGER! It also includes Villains attacking with more furious bloodlust as they wound you. Cross-Dimensional Rampage: As different Hulks rampage across planets and dimensions, only another Hulk can stop them! Feast: Some alien monsters from the Planet Sakaar and beyond use the gruesome Feast keyword. Traps: Enemies that can’t beat Hulks with raw strength often try to trap them instead. World War Hulk features an additional card type: Traps. Each Villain Group in this set has a Trap.

### X-Men {#x-men}

X-Gene: This keyword represents X-Men combining unique mutant powers with their signature teamwork. Piercing Energy: This keyword represents X-Men using psychic knives & sonic screams to pierce enemy defenses. Berserk: This keyword represents some X-Men going into a berserker rage of unpredictable violence. Soaring Flight: This ability represents X-Men flying into action as rapid reinforcements. Lightshow: This keyword represents X-Men using fireworks and blinding bursts in spectacular combinations. Dominate: This keyword represents Villains using telepathy, sorcery, or illusions to twist Heroes’ minds to evil. Human Shields: This keyword represents enemies hiding behind innocent people to prevent Heroes’ attacks. Heroic Bystanders: The New Mutants are Professor X’s students, dreaming of becoming full-fledged X-Men. For them, the Legendary® X-Men set introduces New Mutant Bystanders that become Heroes when you rescue them. Divided Cards: To match Legion’s split personalities, “Divided Cards” return, with two miniature cards printed on the same card. Villains Ascending into Masterminds: Some powerful Villains ascend to become new Masterminds, so there are multiple Masterminds in the game! Players must defeat them all to win.

## Card lists by Expansion {#card-lists}

### 2099 {#2099-1}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Hulk 2099
- Doctor Doom 2099
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Ghost Rider 2099
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Ravage 2099
- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Spider-Man 2099

**2 Masterminds (varying cards each)**

- Alchemax Executives (4 cards)
- Sinister Six 2099 (6 cards(

**2 Villain Groups (8 cards each)**

- Alchemax Enforcers
- False Aesir of Alechmax

**4 Schemes**

- Become President of the United States
- Befoul Earth into a Polluted Wasteland
- Pull Reality into Cyberspace
- Subjugate Earth with Mega-Corporations

### Annihilation {#annihilation}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/hero-teams/team-hydra.svg" alt="Hydra" class="rules-icon"> Brainstorm
- <img src="/img/icons/hero-teams/team-hydra.svg" alt="Hydra" class="rules-icon"> Fantastic Four United
- Heralds of Galactus
- <img src="/img/icons/hero-teams/team-hydra.svg" alt="Hydra" class="rules-icon"> Psi-Lord
- Super-Skrull

**2 Masterminds (5 cards each)**

- Annihilus
- Kang the Conqueror

**2 Villain Groups (8 cards each)**

- Annihilation Wave
- Timelines of Kang

**4 Schemes**

- Breach Parallel Dimensions
- Pulse Waves from the Negative Zone
- Put Humanity on Trial
- Sneak Attack the Heroes’ Homes

### Ant-Man {#ant-man-1}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Ant-Man
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Black Knight
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Jocasta
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Wasp
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Wonder Man

**2 Masterminds (5 cards each)**

- Morgan Le Fay

- Ultron

**2 Villain Groups (8 cards each)**

- Queen’s Vengeance
- Ultron’s Legacy

**4 Schemes**

- Age of Ultron
- Pull Earth Into Medieval Times
- Trap Heroes In The Microverse
- Transform Commuters Into Giant Ants

### Ant-Man and the Wasp {#ant-man-and-the-wasp-1}

**8 Heroes (14 cards each, 1/2/2/3/3/3)**

- Ant Army
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Ant-Man
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Cassie Lang
- Freedom Fighters
- Janet Van Dyne
- Jentorra
- <img src="/img/icons/rules-extracted/icon-30.svg" alt="game symbol" class="rules-icon"> Scott Lang, Cat Burglar
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Wasp

**3 Transforming Masterminds (5 cards each)**

- Darren Cross / Yellowjacket
- Ghost, Master Thief / Ghost, Intangible
- Kang, Quantum Conqueror / Kang, Multiverse Conqueror

**4 Villain Groups (8 cards each)**

- Armada of Kang
- Cross Technologies
- Ghost Chasers
- Quantum Realm

**3 Henchmen Groups (10 cards each)**

- Quantum Hound
- Quantumnauts
- Tardigrade

**4 Schemes**

- Auction Shrink Tech to Highest Bidder
- Escape an Imprisoning Dimension
- Safeguard Dark Secrets
- Siphon Energy from the Quantum Realm

**4 Special Bystanders (7 cards total)**

- Agent Jimmy Woo (2 cards)
- Maggie Lang (2 cards)
- Officer Jim Paxton
- Young Cassie Lang (2 cards)

### Black Panther {#black-panther}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-24.svg" alt="game symbol" class="rules-icon"> General Okoye
- <img src="/img/icons/rules-extracted/icon-24.svg" alt="game symbol" class="rules-icon"> King Black Panther
- <img src="/img/icons/rules-extracted/icon-24.svg" alt="game symbol" class="rules-icon"> Princess Shuri
- <img src="/img/icons/rules-extracted/icon-24.svg" alt="game symbol" class="rules-icon"> Queen Storm of Wakanda
- <img src="/img/icons/rules-extracted/icon-24.svg" alt="game symbol" class="rules-icon"> White Wolf

**2 Masterminds (5 cards each)**

- Killmonger
- Klaw

**2 Villain Groups (8 cards each)**

- Enemies of Wakanda
- Killmonger’s League

**4 Schemes**

- Plunder Wakanda’s Vibranium
- Poison Lakes with Nanite Microbots
- Provoke a Clash of Nations
- Seize The Wakandan Throne

### Black Widow {#black-widow-1}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Black Widow
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Falcon & Winter Soldier
- Red Guardian
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> White Tiger
- <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Yelena Belova

**2 Masterminds (5 cards each)**

- Taskmaster
- Indestructible Man

**2 Villain Groups (8 cards each)**

- Taskmaster’s Thunderbolts
- Elite Assassins

**4 Schemes**

- Corrupt the Spy Agencies
- Train Black Widows in the Red Room
- Sniper Rifle Assassins
- Frame Heroes for Murder

### Captain America 75th Anniversary {#captain-america-75th-anniversary-1}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Agent X-13
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Captain America 1941
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Captain America (Falcon)
- <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Steve Rogers, Director of S.H.I.E.L.D.
- Winter Soldier

**2 Masterminds (5 cards each)**

- Arnim Zola
- Baron Heinrich Zemo

**2 Villain Groups (8 cards each)**

- Zola’s Creations
- Masters of Evil (WWII)

**4 Schemes**

- Brainwash the Military
- Change the Outcome of WWII
- Go Back in Time to Slay Heroes’ Ancestors
- The Unbreakable Enigma Code

### Champions {#champions-1}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-19.svg" alt="game symbol" class="rules-icon"> Gwenpool
- <img src="/img/icons/rules-extracted/icon-19.svg" alt="game symbol" class="rules-icon"> Ms. Marvel
- <img src="/img/icons/rules-extracted/icon-19.svg" alt="game symbol" class="rules-icon"> Nova
- <img src="/img/icons/rules-extracted/icon-19.svg" alt="game symbol" class="rules-icon"> Totally Awesome Hulk
- <img src="/img/icons/rules-extracted/icon-19.svg" alt="game symbol" class="rules-icon"> Viv Vision

**2 Epic Masterminds (5 cards each)**

- Fin Fang Foom
- Pagliacci

**2 Villain groups (8 cards each)**

- Monsters Unleashed
- Wrecking Crew

**4 Schemes**

- Clash of the Monsters Unleashed
- Divide and Conquer
- Hypnotize Every Human
- Steal All Oxygen on Earth

### Civil War {#civil-war-1}

**16 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Captain America, Secret Avenger
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Cloak & Dagger
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Daredevil
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Falcon
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Goliath
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Hercules
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Hulkling
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Luke Cage
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Patriot
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Peter Parker
- <img src="/img/icons/rules-extracted/icon-34.svg" alt="game symbol" class="rules-icon"> Speedball
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Stature
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Storm & Black Panther
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Tigra
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Vision
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Wiccan

**5 Masterminds (5 cards each)**

- Authoritarian Iron Man
- Baron Helmut Zemo
- Maria Hill, Director of S.H.I.E.L.D.
- Misty Knight
- Ragnarok

**7 Villain Groups (8 cards each)**

- CSA Special Marshals
- Great Lake Avengers
- Heroes for Hire
- Registration Enforcers
- S.H.I.E.L.D. Elite
- Superhuman Registration Act
- Thunderbolts

**2 Henchmen Groups (10 cards each)**

- Cape-killers
- Mandroids

**8 Schemes**

- Avengers vs. X-Men
- Dark Reign of H.A.M.M.E.R. Officers
- Epic Super Hero Civil War
- Imprison Unregistered Superhumans
- Nitro the Supervillain Threatens Crowds
- Predict Future Crime
- Reveal Heroes’ Secret Identities
- United States Split by Civil War

**2 Special Bystanders (7 cards total)**

- 4x Aspiring Hero
- 3x Comic Shop Keeper

**7 Special Sidekicks (15 cards total)**

- 2x Lockjaw
- 2x Zabu
- 2x Throg
- 2x Redwing
- 2x Ms Lion
- 2x Lockheed
- 3x Hairball

**7 Grievous Wounds (15 cards total)**

- 2x Blinding Flash
- 2x Blunt Force Trauma
- 2x Corrosive Webbing
- 2x Fatal Blow
- 2x Psychic Trauma
- 3x Spreading Nanovirus
- 2x Subdermal Tracker

### Core {#core}

**15 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Black Widow
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Captain America
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Cyclops
- Deadpool
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Emma Frost
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Gambit
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Hawkeye
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Hulk

- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Iron Man
- <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Nick Fury
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Rogue
- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Spider-Man
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Storm
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Thor
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Wolverine

**40 S.H.I.E.L.D. Agents**

**20 S.H.I.E.L.D. Troopers**

**30 S.H.I.E.L.D. Officers**

**4 Masterminds (5 cards each)**

- Dr. Doom
- Loki
- Magneto
- Red Skull

**7 Villain Groups (8 cards each)**

- Brotherhood
- Enemies of Asgard
- HYDRA
- Masters of Evil
- Radiation
- Skrulls
- Spider Foes

**4 Henchmen Groups (10 cards each)**

- Doombot Legion
- Hand Ninjas
- Savage Land Mutates
- Sentinels

**8 Schemes**

- The Legacy Virus
- Midtown Bank Robbery
- Negative Zone Prison Breakout
- Portals to the Dark Dimension
- Replace Earth’s Leaders with Killbots
- Secret Invasion of the Skrull Shapeshifters
- Super Hero Civil War
- Unleash the Power of the Cosmic Cube

**11 Scheme Twists**

**5 Master Strikes**

**30 Bystanders**

**30 Wounds**

**60 Dividers**

### Dark City {#dark-city-1}

**17 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Angel
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Bishop
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Blade
- <img src="/img/icons/rules-extracted/icon-14.svg" alt="game symbol" class="rules-icon"> Cable
- <img src="/img/icons/rules-extracted/icon-14.svg" alt="game symbol" class="rules-icon"> Colossus
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Daredevil
- <img src="/img/icons/rules-extracted/icon-14.svg" alt="game symbol" class="rules-icon"> Domino
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Elektra
- <img src="/img/icons/rules-extracted/icon-14.svg" alt="game symbol" class="rules-icon"> Forge
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Ghost Rider
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Iceman
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Iron Fist
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Jean Grey
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Nightcrawler
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Professor X
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Punisher
- <img src="/img/icons/rules-extracted/icon-14.svg" alt="game symbol" class="rules-icon"> Wolverine

**5 Masterminds (5 cards each)**

- Apocalypse
- Kingpin
- Mephisto
- Mr. Sinister
- Stryfe

**6 Villain Groups (8 cards each)**

- Emissaries of Evil
- Four Horsemen
- Marauders
- MLF
- Streets of New York
- Underworld

**2 Henchmen Groups (10 cards each)**

- Maggia Goons
- Phalanx

**8 Schemes**

- Capture Baby Hope
- Detonate the Helicarrier
- Massive Earthquake Generator
- Organized Crimewave
- Save Humanity
- Steal the Weaponized Plutonium
- Transform Citizens into Demons
- X-Cutioner’s Song

**3 Special Bystanders (11 cards total)**

- 4 x News Reporter
- 3 x Paramedic
- 4 x Radiation Scientist

### Deadpool {#deadpool-1}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/hero-teams/team-fantastic-four.svg" alt="Fantastic Four" class="rules-icon"> Bob, Agent of Hydra
- <img src="/img/icons/rules-extracted/icon-25.svg" alt="game symbol" class="rules-icon"> Deadpool
- <img src="/img/icons/rules-extracted/icon-25.svg" alt="game symbol" class="rules-icon"> Slapstick
- <img src="/img/icons/rules-extracted/icon-25.svg" alt="game symbol" class="rules-icon"> Solo

- <img src="/img/icons/rules-extracted/icon-25.svg" alt="game symbol" class="rules-icon"> Stingray

**2 Masterminds (5 cards each)**

- Evil Deadpool
- Macho Gomez

**2 Villain groups (8 cards each)**

- Deadpool’s “Friends”
- Evil Deadpool Corpse

**4 Schemes**

- Deadpool Kills the Marvel Universe
- Deadpool Wants a Chimichanga
- Deadpool Writes a Scheme
- Everybody Hates Deadpool

### Dimensions {#dimensions-1}

**5 Heroes (14 cards each, 1/3/5/5)**

- Howard the Duck
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Jessica Jones
- Man-Thing
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Ms. America
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Squirrel Girl

**1 Mastermind (5 cards)**

- J. Jonah Jameson

**2 Henchmen Villain Groups (10 cards each)**

- Circus of Crime
- Spider-Slayer

**5 Bystanders**

- Bulldozer Driver
- Double Agent of S.H.I.E.L.D.
- Fortune Teller
- Photographer
- Forklift Driver

Doctor Strange and the Shadows of Nightmare

**5 Heroes (14 cards each, 1/3/5/5)**

- The Ancient One
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Clea
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Doctor Strange
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Doctor Voodoo
- The Vishanti

**2 Masterminds (5 cards each)**

- Dormammu
- Nightmare

**2 Villain Groups (8 cards each)**

- Fear Lords
- Lords of the Netherworld

**4 Schemes**

- Claim Souls for Demons
- Cursed Pages of the Darkhold Tome
- Duels of Science and Magic
- War for the Dream Dimension

### Fantastic Four {#fantastic-four}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/hero-teams/team-hydra.svg" alt="Hydra" class="rules-icon"> Mr Fantastic
- <img src="/img/icons/hero-teams/team-hydra.svg" alt="Hydra" class="rules-icon"> Invisible Woman
- <img src="/img/icons/hero-teams/team-hydra.svg" alt="Hydra" class="rules-icon"> Thing
- <img src="/img/icons/hero-teams/team-hydra.svg" alt="Hydra" class="rules-icon"> Human Torch
- Silver Surfer

**2 Masterminds (5 cards each)**

- Galactus
- Mole Man

**2 Villian Groups (8 cards each)**

- Heralds of Galactus
- Subterranea

**4 Schemes**

- Bathe Earth in Cosmic Rays
- Flood the Planet with Melted Glaciers
- Invincible Force Field
- Pull Reality into the Negative Zone

### Fear Itself {#fear-itself-2}

**6 Allies (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-20.svg" alt="game symbol" class="rules-icon"> Greithoth, Breaker of Wills
- <img src="/img/icons/rules-extracted/icon-20.svg" alt="game symbol" class="rules-icon"> Kuurth, Breaker of Stone
- <img src="/img/icons/rules-extracted/icon-20.svg" alt="game symbol" class="rules-icon"> Nerkkod, Breaker of Oceans
- <img src="/img/icons/rules-extracted/icon-20.svg" alt="game symbol" class="rules-icon"> Nul, Breaker of Worlds
- <img src="/img/icons/hero-teams/team-fantastic-four.svg" alt="Fantastic Four" class="rules-icon"> Skadi
- <img src="/img/icons/rules-extracted/icon-20.svg" alt="game symbol" class="rules-icon"> Skirn, Breaker of Men

**1 Commander (5 cards)**

- Uru-Enchanted Iron Man

**1 Adversary Group (8 cards)**

- The Mighty (Wolverine, Spider-Man, Red She-Hulk, Iron Fist, Ms. Marvel, Hawkeye, Dr. Strange, Black Widow)

**3 Plots**

- Fear Itself
- Last Stand at Avengers Tower
- The Traitor

### Guardians of the Galaxy {#guardians-of-the-galaxy-1}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Drax the Destroyer
- <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Gamora
- <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Groot
- <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Rocket Raccoon
- <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Star-Lord

**2 Masterminds (5 cards each)**

- Supreme Intelligence of the Kree
- Thanos

**2 Villain Groups (8 cards each)**

- Infinity Gems
- Kree Starforce

**4 Schemes**

- Forge the Infinity Gauntlet
- Intergalactic Kree Nega-Bomb
- The Kree-Skrull War
- Unite the Shards

**18 Shard Tokens**

### Heroes of Asgard {#heroes-of-asgard}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-26.svg" alt="game symbol" class="rules-icon"> Beta Ray Bill
- <img src="/img/icons/rules-extracted/icon-26.svg" alt="game symbol" class="rules-icon"> Lady Sif
- <img src="/img/icons/rules-extracted/icon-26.svg" alt="game symbol" class="rules-icon"> Thor
- <img src="/img/icons/rules-extracted/icon-26.svg" alt="game symbol" class="rules-icon"> Valkyrie
- <img src="/img/icons/rules-extracted/icon-26.svg" alt="game symbol" class="rules-icon"> The Warriors Three

**2 Masterminds (5 cards each)**

- Hela, Goddess of Death
- Malekith the Accursed

**2 Villain Groups (8 cards each)**

- Dark Council
- Omens of Ragnarok

**4 Schemes**

- Asgardian Test of Worth
- The Dark World of Svartalfheim
- Ragnarok, Twilight of the Gods
- War of the Frost Giants

### Into the Cosmos {#into-the-cosmos-1}

**9 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Adam Warlock
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Captain Mar-Vell
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Moondragon
- <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Nebula
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Nova
- <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Phyla-Vell
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Quasar
- Ronan the Accuser
- <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Yondu

**3 Epic Masterminds (5 cards each)**

- Grandmaster
- Magus
- The Beyonder

**4 Villain Groups (8 cards each)**

- Black Order of Thanos
- Celestials
- Elders of the Universe
- From Beyond

**2 Henchmen Groups (10 cards each)**

- Sidera Maris, Bridge Builders
- Universal Church of Truth

**4 Schemes**

- Annihilation:Conquest
- The Contest of Champions
- Destroy the Nova Corps
- Turn the Soul of Adam Warlock

**3 Special Bystanders (1 cards each)**

- Board Gamer
- Legendary Game Designer
- Pizza Delivery Guy

### Marvel 3D Trading Cards {#marvel-3d-trading-cards}

**3 Base set Heroes, Alt Art (14 cards each, 1/3/5/5)**

- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Black Widow
- Deadpool
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Hulk

**2 New Heroes (14 cards each, 1/3/5/5)**

- Howard the Duck
- Man-Thing

**2 Henchmen (10 cards each)**

- Circus of Crime
- Spider-Slayer

**5 Special Bystanders**

- Bulldozer Driver
- Double Agent of Shield
- Fortune Teller
- Photographer
- Stan Lee (4 times as common as the other Special

**Bystanders)**

### Marvel Noir {#marvel-noir-1}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Angel Noir
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Daredevil Noir
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Iron Man Noir
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Luke Cage Noir
- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Spider-Man Noir

**2 Masterminds (5 cards each)**

- Charles Xavier, Professor of Crime
- The Goblin, Underworld Boss

**2 Villain groups (8 cards each)**

- Goblin’s Freak Show
- X-Men Noir

**4 Schemes**

- Hidden Heart of Darkness
- Silence the Witnesses
- Five Families of Crime

- Find the Split Personality Killer

### Marvel Studios, Phase 1 {#marvel-studios-phase-1}

**7 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Black Widow
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Captain America
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Hawkeye
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Hulk
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Iron Man
- <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Nick Fury
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Thor

**3 Masterminds (5 cards each)**

- Iron Monger
- Loki
- Red Skull

**5 Villain Groups (8 cards each)**

- Chitauri
- Enemies of Asgard
- Gamma Hunters
- HYDRA
- Iron Foes

**4 Henchmen Groups (10 cards each)**

- Hammer Drone Army
- HYDRA Pilots
- HYDRA Spies
- Ten Rings Fanatics

**8 Schemes**

- Asgard Under Siege
- Destroy the Cities of Earth!
- Enslave Minds with the Chitauri Scepter
- Invade Asgard
- Radioactive Palladium Poisoning
- Replace Earth’s Leaders with HYDRA
- Super Hero Civil War
- Unleash the Power of the Cosmic Cube

**30 Normal Bystanders**

**12 Special Bystanders (3 of each)**

- Happy Hogan
- Jane Foster
- Peggy Carter
- Pepper Potts

**48 S.H.I.E.L.D. Agents**

**24 S.H.I.E.L.D. Troopers**

**30 S.H.I.E.L.D. Officers**

**11 Scheme Twists**

**6 Master Strikes**

**30 Bystanders**

**30 Wounds**

**60 Dividers**

### Marvel Studios’ Guardians of the Galaxy {#marvel-studios-guardians-of-the-galaxy-1}

**5 Heroes (14 cards each, 1/2/2/3/3/3)**

- <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Drax
- <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Gamora
- <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Mantis
- <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Rocket & Groot
- <img src="/img/icons/rules-extracted/icon-11.svg" alt="game symbol" class="rules-icon"> Star Lord

**2 Masterminds (5 cards each)**

- Ego, the Living Planet (and Epic Ego)
- Ronan the Accuser (and Epic Ronan)

**2 Villain groups (8 cards each)**

- Followers of Ronan
- Ravagers

**4 Schemes**

- Unleash the Abelisk Space Monster
- Inescapable Kyln Space Prison
- Star-Lord’s Awesome Mix Tape
- Provoke the Sovereign War Fleet

### Marvel Studios’ The Infinity Saga {#marvel-studios-the-infinity-saga-1}

**5 Heroes (14 cards each, 1/2/2/3/3/3)**

- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Black Panther
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Bruce Banner
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Captain Marvel
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Doctor Strange
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Wanda + Vision

**2 Epic Masterminds (5 cards each)**

- Thanos
- Ebony Maw

**2 Villain groups (8 cards each)**

- Children of Thanos
- Infinity Stones

**4 Schemes**

- Halve All Life in the Universe
- Sacrifice for the Soul Stone
- The Time Heist
- Warp Reality into a TV Show

### Messiah Complex {#messiah-complex}

**8 Heroes (14 cards each, varying card distribution)**

- <img src="/img/icons/rules-extracted/icon-23.svg" alt="game symbol" class="rules-icon"> M (2/3/3/3/3)
- <img src="/img/icons/rules-extracted/icon-23.svg" alt="game symbol" class="rules-icon"> Multiple Man (2/3/3/3/3)
- <img src="/img/icons/rules-extracted/icon-23.svg" alt="game symbol" class="rules-icon"> Rictor (1/3/5/5)
- <img src="/img/icons/rules-extracted/icon-14.svg" alt="game symbol" class="rules-icon"> Shatterstar (2/3/3/3/3)
- <img src="/img/icons/rules-extracted/icon-23.svg" alt="game symbol" class="rules-icon"> Siryn (1/3/5/5)
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Stepford Cuckoos (2/3/3/3/3)
- <img src="/img/icons/rules-extracted/icon-23.svg" alt="game symbol" class="rules-icon"> Strong Guy (1/3/5/5)
- <img src="/img/icons/rules-extracted/icon-14.svg" alt="game symbol" class="rules-icon"> Warpath (1/3/5/5)

**3 Masterminds (5 cards each)**

- Bastion
- Exodus
- Lady Deathstrike

**4 Villain Groups (8 cards each)**

- Acolytes
- Clan Yashida
- Purifiers
- Reavers

**2 Henchmen Groups (10 cards each)**

- Mr. Sinister Clones
- Sentinel Squad O*N*E*

**4 Veiled/Unveiled Schemes**

- Drain Mutants’ Powers to... ...Open Rifts to Future Timelines
- Hack Cerebro to... ...Manipulate the Mutant Messiah
- Hire Singularity Investigations to... ...Reveal Heroes’ Evil Clones
- Raid Gene Bank to... ...Unleash an Anti-Mutant Bioweapon

**7 Special Sidekicks (2 cards each)**

- Boom Boom
- Darwin
- Layla Miller
- Rockslide
- Skids
- Prodigy
- Rusty Collins

**3 Special Bystanders (1 card each)**

- Clone Technician
- Opera Singer
- Private Investigator

### Midnight Sons {#midnight-sons-1}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Blade, Daywalker
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Elsa Bloodstone
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Morbius
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Werewolf by Night
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Wong Masterminds (5 cards each)
- Lilith, Mother of Demons
- Zarathos Villain Groups (8 cards each)
- Fallen
- Lilin Schemes
- Midnight Massacre
- Ritual Sacrifice to Summon Chthon
- Sire Vampires at the Blood Bank
- Wager at Blackjack for Heroes’ Souls

### The New Mutants {#the-new-mutants}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Karma
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Mirage
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Sunspot
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Warlock
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Wolfsbane Masterminds (5 cards each)
- Belasco, Demon Lord of Limbo
- Emma Frost, The White Queen Villain Groups (8 cards each)
- Demons of Limbo
- Hellions Schemes
- Crash the Moon into the Sun
- The Demon Bear Saga
- Superhuman Baseball Game
- Trapped in the Insane Asylum

### Paint the Town Red {#paint-the-town-red-1}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Black Cat
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Moon Knight
- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Scarlet Spider
- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Spider-Woman
- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Symbiote Spider-Man

**2 Masterminds (5 cards each)**

- Carnage
- Mysterio

**2 Villain Groups (8 cards each)**

- Maximum Carnage
- Sinister Six

**4 Schemes**

- The Clone Saga
- Invade the Daily Bugle News HQ
- Splice Humans with Spider DNA
- Weave a Web of Lies

### Realm of Kings {#realm-of-kings}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-27.svg" alt="game symbol" class="rules-icon"> Black Bolt
- <img src="/img/icons/rules-extracted/icon-27.svg" alt="game symbol" class="rules-icon"> Crystal
- <img src="/img/icons/rules-extracted/icon-27.svg" alt="game symbol" class="rules-icon"> Gorgon
- <img src="/img/icons/rules-extracted/icon-27.svg" alt="game symbol" class="rules-icon"> Karnak
- <img src="/img/icons/rules-extracted/icon-27.svg" alt="game symbol" class="rules-icon"> Medusa

**2 Masterminds (5 cards each)**

- Maximus the Mad
- Emperor Vulcan of the Shi’Ar

**2 Villain groups (8 cards each)**

- Inhuman Rebellion
- Shi’Ar Imperial Elite

**4 Schemes**

- Devolve with Xerogen Crystals
- Tornado of Terrigen Mists
- Ruin the Perfect Wedding
- War of Kings

### Revelations {#revelations-1}

**9 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Captain Marvel - Agent of S.H.I.E.L.D.
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Darkhawk
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Hellcat
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Photon
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Quicksilver
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Ronin
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Scarlet Witch
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Speed
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> War Machine

**3 Epic Masterminds (5 cards each)**

- Grim Reaper
- The Hood
- Mandarin

**4 Villain Groups (8 cards each)**

- Army of Evil
- Dark Avengers
- Hood’s Gang
- Lethal Legion

**2 Henchmen Groups (10 cards each)**

- Mandarin’s Rings
- Hydra Base

**4 Transforming Schemes**

- Earthquake Drains the Ocean // Tsunami Crushes the Coast
- House of M // No More Mutants
- The Korvac Saga // Korvac Revealed
- Secret HYDRA Corruption // Open HYDRA Revolution

**3 Special Bystanders (1 card each)**

- Dog Show Judge
- Lawyer
- Rocket Test Pilot

### S.H.I.E.L.D. {#s-h-i-e-l-d-1}

**4 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Agent Phil Coulson
- <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Deathlok
- <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Mockingbird
- <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Quake

**2 Adapting Masterminds (4 cards each)**

- HYDRA High Council
- HYDRA Super Adaptoid

**2 Villain Groups (8 cards each)**

- A.I.M., HYDRA Offshoot
- HYDRA Elite

**4 Schemes**

- Hail Hydra
- HYDRA Helicarriers Hunt Heroes
- Secret Empire of Betrayal
- S.H.I.E.L.D. Vs. HYDRA War

**8 Special S.H.I.E.L.D. Officers (2 cards each)**

- Dum Dum Dugan
- G.W. Bridge
- Grant Ward
- Melinda May
- Leo Fitz & Jemma Simmons
- Sharon Carter
- Victoria Hand
- “Yo-Yo” Rodriguez

### Secret Wars, Vol. 1 {#secret-wars-vol-1-1}

**14 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Apocalyptic Kitty Pryde
- <img src="/img/icons/rules-extracted/icon-21.svg" alt="game symbol" class="rules-icon"> Black Bolt
- <img src="/img/icons/rules-extracted/icon-21.svg" alt="game symbol" class="rules-icon"> Black Panther
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Captain Marvel
- <img src="/img/icons/rules-extracted/icon-21.svg" alt="game symbol" class="rules-icon"> Dr. Strange
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Lady Thor
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Magik
- <img src="/img/icons/rules-extracted/icon-22.svg" alt="game symbol" class="rules-icon"> Maximus
- <img src="/img/icons/rules-extracted/icon-22.svg" alt="game symbol" class="rules-icon"> Namor
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Old Man Logan
- <img src="/img/icons/rules-extracted/icon-22.svg" alt="game symbol" class="rules-icon"> Proxima Midnight
- <img src="/img/icons/rules-extracted/icon-21.svg" alt="game symbol" class="rules-icon"> Superior Iron Man
- <img src="/img/icons/rules-extracted/icon-22.svg" alt="game symbol" class="rules-icon"> Thanos
- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Ultimate Spider-Man

**4 Masterminds (5 cards each)**

- Madelyne Pryor, Goblin Queen
- Nimrod, Super Sentinel
- Wasteland Hulk
- Zombie Green Goblin

**6 Villain Groups (8 cards each)**

- The Deadlands
- Domain of Apocalypse
- Limbo

- Manhattan (Earth-1610)
- Sentinel Territories
- Wasteland

**3 Henchman Groups (10 cards each)**

- Ghost Racers
- M.O.D.O.K.s
- Thor Corps

**8 Schemes**

- Build An Army of Annihilation
- Corrupt the Next Generation of Heroes
- Crush Them with My Bare hands
- Dark Alliance
- Fragmented Realities
- Master of Tyrants
- Pan-Dimensional Plague
- Smash Two Dimensions Together

**1 Special Bystander (3 cards total)**

- 3 x Banker

### Secret Wars, Vol. 2 {#secret-wars-vol-2-1}

**16 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Agent Venom
- Arkon the Magnificent
- <img src="/img/icons/rules-extracted/icon-21.svg" alt="game symbol" class="rules-icon"> Beast
- <img src="/img/icons/rules-extracted/icon-22.svg" alt="game symbol" class="rules-icon"> Black Swan
- <img src="/img/icons/rules-extracted/icon-21.svg" alt="game symbol" class="rules-icon"> Captain Britain
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> The Captain and the Devil
- <img src="/img/icons/rules-extracted/icon-22.svg" alt="game symbol" class="rules-icon"> Corvus Glaive
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Dr Punisher, Soldier Supreme
- <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Elsa Bloodstone
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Phoenix Force Cyclops
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Ruby Summers
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Shang-Chi
- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Silk
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Soulsword Colossus
- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Spider-Gwen
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Time-Traveling Jean Grey

**4 Masterminds (5 cards each)**

- Immortal Emperor Zheng-Zhu
- King Hyperion
- Spider Queen
- Shiklah, the Demon Bride

**6 Villain Groups (8 cards each)**

- Deadpool’s Secret Secret Wars
- Guardians of Knowhere
- K’un Lun
- Monster Metropolis
- Utopolis
- X-Men 92 (Recruitable)

**3 Henchman Groups (10 cards each)**

- Khonshu Guardians
- Magma Men
- Spider-Infected

**8 Schemes**

- Deadlands Hordes Charge the Wall
- Enthrone the Barons of Battleworld
- The Fountain of Eternal Life
- The God-Emperor of Battleworld
- The Mark of Khonshu
- Master the Mysteries of Kung-Fu
- Secret Wars
- Sinister Ambitions

**10 Ambition cards**

**3 Special Bystanders (10 cards total)**

- 3 x Alligator Trapper
- 4 x Shapeshifted Copycat
- 3 x Undercover Agent

### Spider-Man Homecoming {#spider-man-homecoming-1}

**5 Heroes (14 cards each, 1/3/5/5)**

- Happy Hogan
- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Hightech Spider-Man
- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Peter’s Allies
- <img src="/img/icons/hero-teams/team-spider-friends.svg" alt="Spider Friends" class="rules-icon"> Peter Parker, Homecoming
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Tony Stark

**2 Epic Masterminds (5 cards each)**

- Adrian Toomes
- Vulture

**2 Villain groups (8 cards each)**

- Salvagers
- Vulture Tech

**4 Schemes**

- Distract the Hero
- Explosion at the Washington Monument
- Ferry Disaster
- Scavenge Alien Weaponry First Edition comes with Bonus Card Bystander
- Damage Control

### Venom {#venom}

**5 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-28.svg" alt="game symbol" class="rules-icon"> Carnage
- <img src="/img/icons/rules-extracted/icon-28.svg" alt="game symbol" class="rules-icon"> Venom
- <img src="/img/icons/rules-extracted/icon-28.svg" alt="game symbol" class="rules-icon"> Venom Rocket
- <img src="/img/icons/rules-extracted/icon-28.svg" alt="game symbol" class="rules-icon"> Venomized Dr. Strange
- <img src="/img/icons/rules-extracted/icon-28.svg" alt="game symbol" class="rules-icon"> Venompool

**2 Masterminds (5 cards each)**

- Poison Thanos
- Hybrid

**2 Villain Groups (8 cards each)**

- Life Foundation
- Poisons

**4 Schemes**

- Invasion of the Venom Symbiotes
- Maximum Carnage
- Paralyzing Venom
- Symbiotic Absorption

### Villains {#villains-1}

**15 Allies (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-30.svg" alt="game symbol" class="rules-icon"> Bullseye
- Dr. Octopus
- Electro
- <img src="/img/icons/rules-extracted/icon-20.svg" alt="game symbol" class="rules-icon"> Enchantress
- Green Goblin
- <img src="/img/icons/rules-extracted/icon-32.svg" alt="game symbol" class="rules-icon"> Juggernaut
- <img src="/img/icons/rules-extracted/icon-30.svg" alt="game symbol" class="rules-icon"> Kingpin
- Kraven
- <img src="/img/icons/rules-extracted/icon-20.svg" alt="game symbol" class="rules-icon"> Loki
- <img src="/img/icons/rules-extracted/icon-32.svg" alt="game symbol" class="rules-icon"> Magneto
- Mysterio
- <img src="/img/icons/rules-extracted/icon-32.svg" alt="game symbol" class="rules-icon"> Mystique
- <img src="/img/icons/rules-extracted/icon-32.svg" alt="game symbol" class="rules-icon"> Sabretooth
- Ultron
- Venom

**4 Commanders (5 cards each)**

- Dr. Strange
- Nick Fury
- Odin
- Professor X

**7 Adversary Groups (8 cards each)**

- Avengers
- Defenders
- Marvel Knights
- Spider Friends
- Uncanny Avengers
- Uncanny X-Men
- X-Men First Class

**4 Backup Adversary Groups (10 cards each)**

- Asgardian Warriors
- Cops
- Multiple Man
- S.H.I.E.L.D. Assault Squad

**8 Plots**

- Crush Hydra
- Mass Produce War Machine Armor
- Cage Villains in Power-Suppressing Cells
- Infiltrate the Lair with Spies
- Build an Underground Mega-Vault Prison
- Resurrect Heroes with the Norn Stones
- Graduation at Xavier’s X-Academy
- Crown Thor King of Asgard

**30 Bystanders**

**4 Special Bystanders (12 cards total)**

**3 x Computer Hacker**

**3 x Engineer**

**3 x Public Speaker**

**3 x Rockstar**

**40 HYDRA Operatives**

**20 HYDRA Soldiers**

**15 Madame HYDRA**

**15 New Recruits**

**30 Bindings**

**12 Plot Twists**

**9 Command Strikes**

**33 Blanks (each side shows the Legendary logo)**

### Weapon X {#weapon-x-1}

**4 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-14.svg" alt="game symbol" class="rules-icon"> Fantomex
- <img src="/img/icons/rules-extracted/icon-14.svg" alt="game symbol" class="rules-icon"> Marrow
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Weapon H
- <img src="/img/icons/hero-teams/team-marvel-knights.svg" alt="Marvel Knights" class="rules-icon"> Weapon X (Wolverine)

**3 Epic Masterminds (5 cards each)**

- Omega Red
- Romulus
- Sabretooth

**2 Villain groups (8 cards each)**

- Berserkers
- Weapon Plus

**10 Enraging Wounds**

**3 Schemes**

- Condition Logan into Weapon X
- Go After Heroes’ Loved Ones
- Wipe Heroes’ Memories

### What If...? {#what-if-1}

**8 Heroes (14 Hero cards each, 1/2/2/3/3/3)**

- <img src="/img/icons/rules-extracted/icon-15.svg" alt="game symbol" class="rules-icon"> Apocalyptic Black Widow
- <img src="/img/icons/rules-extracted/icon-15.svg" alt="game symbol" class="rules-icon"> Captain Carter
- <img src="/img/icons/rules-extracted/icon-15.svg" alt="game symbol" class="rules-icon"> Doctor Strange Supreme
- <img src="/img/icons/rules-extracted/icon-15.svg" alt="game symbol" class="rules-icon"> Gamora, Destroyer of Thanos
- <img src="/img/icons/rules-extracted/icon-15.svg" alt="game symbol" class="rules-icon"> Killmonger, Spec Ops
- <img src="/img/icons/rules-extracted/icon-15.svg" alt="game symbol" class="rules-icon"> Party Thor
- <img src="/img/icons/rules-extracted/icon-15.svg" alt="game symbol" class="rules-icon"> Star-Lord T’Challa

- <img src="/img/icons/rules-extracted/icon-15.svg" alt="game symbol" class="rules-icon"> Uatu, The Watcher

**4 Epic Masterminds (5 cards each)**

- Hank Pym, Yellowjacket
- Killmonger, The Betrayer
- Ultron Infinity
- Zombie Scarlet Witch

**5 Villain Groups (8 cards each)**

- Black Order Guards
- Intergalactic Party Animals
- Rival Overlords
- Strange’s Demons
- Zombie Avengers

**3 Henchmen Groups (10 cards each)**

- Giants of Jotunheim
- Ultron Sentries
- Vibranium Liberator Drones

**8 Schemes**

- Breach the Nexus of All Realities
- Collect an Interstellar Zoo
- Marvel Zombies
- Trash Earth with Hugest Party Ever

**25 Normal Bystanders**

**5 Special Bystanders (1 card each)**

- Happy Hogan
- Howard Stark
- Howard the Duck
- Pepper Potts
- Scott Lang’s Head

**40 S.H.I.E.L.D. Agents**

**20 S.H.I.E.L.D. Troopers**

**8 S.H.I.E.L.D. Officers**

**30 Wounds**

**11 Scheme Twists**

**5 Master Strikes**

### World War Hulk {#world-war-hulk-1}

**15 Transforming Heroes (14 Hero cards each, 1/3/5/5 +**

the number of Transform cards indicated)

- <img src="/img/icons/rules-extracted/icon-19.svg" alt="game symbol" class="rules-icon"> Amadeus Cho (+5)
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Bruce Banner (+5)
- Caiera (+1)
- Gladiator Hulk (+5)
- Hiroim (+5)
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Hulkbuster Iron Man (+3)
- <img src="/img/icons/rules-extracted/icon-30.svg" alt="game symbol" class="rules-icon"> Joe Fix-It, Grey Hulk (+3)
- Korg (+3)
- Miek the Unhived (+1)
- <img src="/img/icons/rules-extracted/icon-19.svg" alt="game symbol" class="rules-icon"> Namora (+3)
- No-Name, Brood Queen (+3)
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> <img src="/img/icons/rules-extracted/icon-10.svg" alt="game symbol" class="rules-icon"> Rick Jones (+9)
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Sentry (+8)
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> She-Hulk (+5)
- <img src="/img/icons/hero-teams/team-avengers.svg" alt="Avengers" class="rules-icon"> Skaar, Son of Hulk (+3)

**6 Transforming Masterminds (5 cards each)**

- General “Thunderbolt” Ross / Red Hulk
- Illuminati, Secret Society
- King Hulk, Sakaarson
- M.O.D.O.K.
- The Red King
- The Sentry / The Void

**7 Villain Groups (8 cards each)**

- Aspects of the Void
- Code Red
- Illuminati
- Intelligencia
- Sakaar Imperial Guard
- U-Foes
- Warbound

**3 Henchmen Groups (10 cards each)**

- Cytoplasmic Spikes
- Death’s Heads
- Sakaaran Hivelings

**8 Schemes**

- Break the Planet Asunder
- Cytoplasm Spike Invasion
- Fall of the Hulks
- Gladiator Pits of Sakaar
- Mutating Gamma Rays
- Shoot Hulk into Space
- Subjugate With Obedience Disks
- World War Hulk

**4 Special Bystanders (1 card each)**

- Actor
- Animal Trainer
- Tourist Couple
- Triage Nurse

### X-Men {#x-men-1}

**15 Heroes (14 cards each, 1/3/5/5)**

- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Aurora & Northstar
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Banshee
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Beast
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Cannonball
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Colossus & Wolverine
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Dazzler
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Havok
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Jubilee
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Kitty Pryde

- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Legion
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Longshot
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Phoenix
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Polaris
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> Psylocke
- <img src="/img/icons/rules-extracted/icon-4.svg" alt="game symbol" class="rules-icon"> X-23

**6 Epic Masterminds (5 cards each)**

- Arcade
- Dark Phoenix
- Deathbird
- Mojo
- Onslaught
- Shadow King

**7 Villain Groups (8 cards each)**

- Dark Descendants
- Hellfire Club
- Mojoverse
- Murderworld
- Shadow-X
- Shi’ar Imperial Guard
- Sisterhood of Mutants

**5 Henchmen Groups (10 cards each)**

- The Brood
- Hellfire Cult
- Sapien League
- Shi’ar Death Commandos
- Shi’ar Patrol Craft

**8 Schemes**

- Alien Brood Encounters
- Anti-Mutant Hatred
- The Dark Phoenix Saga
- Horror of Horrors
- Mutant-Hunting Super Sentinels
- Nuclear Armageddon
- Televised Deathtraps of Mojoworld
- X-Men Danger Room Goes Berserk

**20 Horrors**

**9 Heroic Bystanders (1 card each)**

- Cypher
- Karma
- Magik (in 1st Edition)
- Magma
- Mirage
- Sunspot
- Warlock
- Wolfsbane
- Heartless Computer Scientist
- Martial Arts Master

**9 Tokens**

- 2 x Animatronic Killer Clown - Villian - Murderworld
- 1 x Master Plan - Mastermind
- 1 x Phoenix Force - Villian - Hellfire Club
- 5 x Shi’ar Battlecruiser - Villian - Shi’ar Imperial Guard

**1 Master Strike**

**1 Scheme Twist**

The following is a list of errata released to date, provided courtesy of Heroes The Ancient One (Doctor Strange and the Shadows of Nightmare):

- War of the Mind: This card should not have an Attack <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> icon. It shouldn’t count for things that look for Attack icons, like Hyperspeed, Spider-Woman, Phalanx, etc.

Domino (Dark City)

- Lucky Break: There should be a printed Recruit <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> icon behind the top “0+” on the side of the card. This is consistent with heroes that have the “Versatile” keyword. (For clarity, compare this card to other Domino cards.)

Emma Frost (Core Set)

- Diamond Form: There should be a Recruit <img src="/img/icons/card-info/info-recruit.svg" alt="Recruit" class="rules-icon"> icon on her card that reads “0+”.
- Shadowed Thoughts: Her Attack <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> should read “2+” instead of “2”.

Nick Fury (Core Set)

- High Tech Weaponry: His Attack <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> should read “2+” instead of “2”.

Villains AIM, HYDRA Offshoot (S.H.I.E.LD.)

- Taskmaster: His Attack <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> value should read “3” instead of “3+”, and his VP should be “2” instead of “4”.

Celestials (Into the Cosmos)

- Exitar, the Exterminator: The second effect is a “Fight” effect, and should read “Fight: Exitar grants you a Celestial Boon: For the rest of the game, once during each of your turns, you may fight a Henchman from your Victory Pile. Spend the normal <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> then do the Henchman’s Fight effect, KO it, and rescue a Bystander.” (For clarity, compare this card to other Celestials cards.)
- Nezarr, the Calculator: The second effect is “Fight” effect and should read “Fight: Nezarr grants you a Celestial Boon: For the rest of the game, while it’s your turn, the Mastermind gets — <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> equal to a fifth of its printed <img src="/img/icons/card-info/info-attack.svg" alt="Attack" class="rules-icon"> . (round down the loss).” (For clarity, compare this card to other Celestials cards.)

Chitauri (Marvel Studios’ Phase 1)

- Chitauri Soldier: The effect is an “Ambush” effect, not a “Fight” effect, and should read: “Ambush: Chitauri Soldier captures a Bystander.”

## Errata {#errata}

@lockardtc. Fear Lords (Doctor Strange and the Shadows of Nightmare)

- D’Spayre: The “Fight” effect should read “KO one of your heroes” instead of “KO a hero.”

Marauders (Dark City)

- Vertigo: The effect is a “Fight” effect and should read: “Fight: Each player discards their hand then draws as many cards as they discarded.”

Masterminds Magus (Into the Cosmos)

- Conjured Shade of Thanos: Should read “Fight: Rescue 4 Bystanders. This Tactic enters the city as a Villain with no text. Then each Villain in the city gains a Shard. (You win when the Mastermind has no more Tactics stacked under it.)

Thanos (Marvel Studios’ The Infinity Saga)

- Mastermind: His Masterstike should read “The leftmost Infinity Stone in the city escapes. Then an Infinity Stone worth 4VP or more enters the city from your Victory Pile. If you don’t have any, each player gains a Wound.” (For clarity, compare this card to his Epic Mastermind.)

Core Set Rule Book Timing of Resolution of Fight Effects (Page 13)

- “Fight” effects occur after defeating the enemies and placing them in the Victory Pile, not before comparing Attack Totals as the rulebook states.

Solo Setup (Page 20)

- The final bullet under “Villain Deck” has a formatting error. There should be a period and a line break after “Scheme”. It should read as “The normal number of Scheme Twists listed on the Scheme.” The phrase “Special Solo Rules” that comes after “Scheme” on that line of the rule book should be a new bold header for the sentence that comes next.

## Quick Setup Guide: Hero Board {#quick-setup-hero}

### Initial Setup {#initial-setup}

- Each player shuffles a personal deck of 8 S.H.I.E.L.D. Agents and 4 S.H.I.E.L.D. Troopers, and then draws 6 cards.
- Put all the S.H.I.E.L.D. Officers, Wounds and Bystanders on the board in the appropriate spaces.
- Pick 1 Mastermind at random and put it on the board, with its 4 Mastermind Tactics facedown underneath it in random order. Check which Villains this Mastermind “Always Leads.”

### Villain Deck {#villain-deck}

- Pick 1 Scheme at random. Follow its “Setup” instructions. Put the number of Scheme Twists it tells you into the Villain Deck.
- Add 5 Master Strikes to the Villain Deck.
- Add this many Villain Groups, Henchmen Groups and Bystanders to the Villain Deck. Shuffle it.

Number of Villain Henchmen Groups Groups Bystanders Heroes Players 1 1 1* (3 cards) 1 3 2 2 1 2 5 3 3 1 8 5 4 3 2 8 5 5 4 2 12 6

Modified setup from What If...? Number of Villain Henchmen Groups Groups Bystanders Heroes Players 1 1 1* (2 cards in 1 3 deck, 2 cards in city) 2 2 1 2 5 3 3 1 8 5 4 4 2 8 5 5 5 2 16 6 *For more information on Solo or Advanced Solo Play, see pages 55-57.

### Hero Deck {#hero-deck}

- Pick 5 Heroes at random. Add all of those Heroes’ cards to the Hero Deck. 70 cards total. Shuffle it.
- If you are playing with 5 players, add a 6th Hero.
- Put 5 Hero cards from the top of the Hero Deck into the 5 HQ spaces, face up.

### On Your Turn {#on-your-turn}

1. Play the top card of the Villain Deck. 2. Play cards from your hand, using them to recruit and fight. 3. Discard all the cards you played and any cards left in your hand and draw 6 new cards.

## Quick Setup Guide: Villain Board {#quick-setup-villain}

### Initial Setup {#initial-setup-1}

- Each player shuffles a personal deck of 8 HYDRA Operatives and 4 HYDRA Soldiers. Each player then draws 6 cards from their deck.
- Put all the Madame HYDRA, New Recruits, Bindings and Bystanders on the board in the appropriate spaces.
- Pick 1 Commander at random and put it on the board, with its 4 Commander Tactics facedown underneath it in random order. Check which Adversaries this Commander “Always Leads.”

### Adversary Deck {#adversary-deck}

- Pick 1 Plot at random. Follow its “Setup” instructions. Put the number of Plot Twists it tells you into the Adversary Deck.
- Add 5 Command Strikes to the Adversary Deck.
- Add this many Adversary Groups, Backup Adversaries and Bystanders to the Adversary Deck. Shuffle it.

Number of Adversary Backup Bystanders Allies Players Groups Adversaries 1 1 1* (3 cards) 1 3 2 2 1 2 5 3 3 1 8 5 4 3 2 8 5 5 4 2 12 6

Modified setup from What If...? Number of Adversary Backup Allies Players Groups Adversaries Bystanders

1 1 1* (2 cards in 1 3 deck, 2 cards in city) 2 2 1 2 5 3 3 1 8 5 4 4 2 8 5 5 5 2 16 6 *For more information on Solo or Advanced Solo Play, see pages 55-57.

### Ally Deck {#ally-deck}

- Pick 5 Allies at random. Add all of those Allies’ cards to the Ally Deck.
- 70 cards total. Shuffle it.
- If you are playing with 5 players, add a 6th Ally.
- Put 5 Ally cards from the top of the Ally Deck into the 5 Lair spaces, face up.

### On Your Turn {#on-your-turn-1}

1. Play the top card of the Adversary Deck. 2. Play cards from your hand, using them to recruit and fight. 3. Discard all the cards you played and any cards left in your hand and draw 6 new cards.
