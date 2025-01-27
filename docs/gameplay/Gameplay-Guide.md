---
title: Gameplay: Gameplay Guide
layout: docs
origfile: gameplay/Gameplay-Guide.md
origtitle: Gameplay-Guide
permalink: /docs/gameplay/Gameplay-Guide
redirect_from:
  - /docs/gameplay/Gameplay_Guide/
  - /wiki/gameplay/Gameplay_Guide/
---
* TOC
{:toc}
Red Eclipse features 5 playable game modes which can be further customised through mutators. Along with the cooperative map editor and a demo viewer to playback previously recorded matches.

### Basic Gameplay
Default gameplay consists of two teams placed within the level which compete against each other to score the most points within the set time limit.

#### Weapons

In most games all players are equipped with a pistol and two of their favorite loadout weapons. Furthermore, explosive weapons can be collected in the arena, such as grenades and mines, to bolster their offensive abilities. See the [main article](Weapons-Guide) on weapons here.

#### Parkour

Red Eclipse features a parkour system, that allows you to navigate maps in many different ways.
See the [main article](Parkour-Guide) on parkour here.

#### Teams

|Icon                                                 |Team      |Default Colour|
|-----------------------------------------------------|----------|--------------|
|<img src="../images/icons/teamalpha.png" width="64px"/>|Team Alpha|Blue          |
|<img src="../images/icons/teamomega.png" width="64px"/>|Team Omega|Red           |

#### Team swapping

In some gamemodes where teams are present, the server may randomly swap some players onto the opposing team in the event the teams are unbalanced.

#### Affinities

An affinity is an object in game which can be collected to score points, such as a flag or a ball.
In game modes [**Capture the Flag**](Capture-the-Flag) and ~~[**Bomber Ball**](Bomber-ball)~~, you can throw the affinity to your teammates by pressing [F].

#### Friendly fire

By default friendly fire is enabled. Make sure not to injure your own teammates otherwise you will lose points for both yourself and your team. If you deal too much damage to your own teammates you will be warned, before eventually being kicked from the server.

#### Half time

Some maps will have a layout that is not perfectly symmetrical where one team may have a slight advantage. To counteract this for balance, the server may automatically swap the teams spawn points when the time limit reaches halftime.

### Game Modes

|Icon                                                   |Mode                  |Description|
|-------------------------------------------------------|----------------------|------------------------------------------------------|
| <img src="../images/modes/demo.png" width="64px"/>      |**Demo**              |Play back previously recorded games                   |
| <img src="../images/modes/editing.png" width="64px"/>   |**Editing**           |Create and edit existing maps                         |
| <img src="../images/modes/deathmatch.png" width="64px"/>|**Deathmatch**        |Shoot to kill and increase score by fragging          |
| <img src="../images/modes/capture.png" width="64px"/>   |[**Capture the Flag**](Capture-the-Flag)  |Take the enemy flag and return it to the base to score|
| <img src="../images/modes/defend.png" width="64px"/>    |~~[**Defend and Control**](Bomber-ball)~~|Defend control points to score                        |
| <img src="../images/modes/bomber.png" width="64px"/>    |**Bomber Ball**       |Carry the bomb into the enemy goal to score           |
| <img src="../images/modes/race.png" width="64px"/>      |**Race**              |Compete for the fastest time completing a lap         |

### Mutators
Gameplay can be further customised by enabling mutators to create some unique game mode combinations.

|Icon                                                 |Mutator  |Description|
|-----------------------------------------------------|---------|--------------------------------------------------|
|<img src="../images/modes/ffa.png" width="64px"/>      |FFA      |Every player for themselves                       |
|<img src="../images/modes/coop.png" width="64px"/>     |Coop     |Players versus drones                             |
|<img src="../images/modes/instagib.png" width="64px"/> |Instagib |One hit kills instantly                           |
|<img src="../images/modes/medieval.png" width="64px"/> |Medieval |Players spawn only with swords                    |
|<img src="../images/modes/kaboom.png" width="64px"/>   |Kaboom   |Players spawn with explosives only                |
|<img src="../images/modes/duel.png" width="64px"/>     |Duel     |One on one battles to determine the winner        |
|<img src="../images/modes/survivor.png" width="64px"/> |Survivor |Players battle to determine the winner            |
|<img src="../images/modes/classic.png" width="64px"/>  |Classic  |Weapons must be collected from spawns in the arena|
|<img src="../images/modes/onslaught.png" width="64px"/>|Onslaught|Waves of enemies fill the battle arena            |
|<img src="../images/modes/vampire.png" width="64px"/>  |Vampire  |Deal damage to regenerate health                  |
|<img src="../images/modes/resize.png" width="64px"/>   |Resize   |Players change size depending on their health     |
|<img src="../images/modes/hard.png" width="64px"/>     |Hard     |Radar and health regeneration is disabled         |
|<img src="../images/modes/arena.png" width="64px"/>    |Arena    |Players are able to carry all weapons at once     |

An example of how mutators work to change the gameplay:

Selecting the game mode, **Deathmatch**, along with the following mutators:

* FFA
* Instagib
* Medieval
* Hard

This will create a game mode where players are not on teams, they only spawn with the sword, one hit kills instantly and there is no radar present.

The above example will be abbreviated as **FF-In-Me-Ha-Deathmatch** for the active game mode being played.

#### Game mode specific mutators
Additional mutators which can only be enabled in specific game modes.

|Icon                                                      |Mode              |Mutator   |Description|
|----------------------------------------------------------|------------------|----------|------------------------------------------------------------|
|<img src="../images/modes/gladiator.png" width="64px"/>     |Deathmatch        |Gladiator |Fight in a confined area with increased pushback from damage|
|<img src="../images/modes/oldschool.png" width="64px"/>     |Deathmatch        |Old School|Every frag only gives you a single point, like the old days |
|<img src="../images/modes/capturequick.png" width="64px"/>  |Capture the Flag  |Quick     |Dropped flags instantly return to base                      |
|<img src="../images/modes/capturedefend.png" width="64px"/> |Capture the Flag  |Defend    |Dropped flags must be defended until they reset             |
|<img src="../images/modes/captureprotect.png" width="64px"/>|Capture the Flag  |Protect   |Protect the flag and hold the enemy flag to score           |
|<img src="../images/modes/defendquick.png" width="64px"/>   |Defend and Control|Quick     |Control points secure quicker than normal                   |
|<img src="../images/modes/defendking.png" width="64px"/>    |Defend and Control|King      |Remain king of the hill to score                            |
|<img src="../images/modes/bomberhold.png" width="64px"/>    |Bomber Ball       |Hold      |Hold the bomb as long as possible to score                  |
|<img src="../images/modes/bomberbasket.png" width="64px"/>  |Bomber Ball       |Basket    |Throw the bomb into the enemy goal to score                 |
|<img src="../images/modes/bomberassault.png" width="64px"/> |Bomber Ball       |Assault   |Teams take turns attacking and defending                    |
|<img src="../images/modes/racelapped.png" width="64px"/>    |Race              |Lapped    |Compete for the most number of laps                         |
|<img src="../images/modes/raceendurance.png" width="64px"/> |Race              |Endurance |Laps must be completed without dying at all                 |
|<img src="../images/modes/racegauntlet.png" width="64px"/>  |Race              |Gauntlet  |Teams take turns running the gauntlet                       |
