---
title: Variables - Gameplay
layout: docs
origfile: variables/Gameplay.md
origtitle: Gameplay
permalink: /docs/variables/Gameplay
redirect_from:
  - /wiki/variables/Gameplay/
---
* TOC
{:toc}
The rules of a match: health, damage, spawning, items, teams and scoring.

## Team balance

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `teambalance` | determines the method of team balancing; style is a player ranking (see balancestyle);<br>0 = off, 1 = by number then style, 2 = by style then number,<br>3 = by number, using swap requests, 4 = same as 3, and reassign players if necessary,<br>5 = same as 4, but by style, then number, 6 = by style during waiting, revert to 4 otherwise | - |
| `teambalancestyle` | determines the method of sorting for team balancing;<br>0 = top of list, 1 = time played, 2 = points, 3 = frags, 4 = scoretime, 5 = kdratio, 6 = combined kdratio, 7 = average scoreboard position | `value` |
| `teambalancehighest` | determines if team balancing moves the highest players in the balance sort | `value` |
| `teambalanceduel` | allow reassignments in duel | `bool` |
| `teambalanceplaying` | min players before reassignments occur | `number` |
| `teambalanceamt` | max-min offset for players per team before reassignments occur | `value` |
| `teambalancewait` | how long before reassignment can happen again | `ms` |
| `teambalancedelay` | how long before reassignments start | `ms` |
| `teambalanceswap` | allow swap requests if unable to change team | `bool` |
| `teambalancelock` | level at which one can override swap | `rank` |
| `teampersist` | when a player leaves and rejoins the game, automatically put them on the same team they had before;<br>0 = off, 1 = only attempt, 2 = forced | `value` |

## Gameplay settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `instaresizeamt` | each kill adds this much size in insta-resize | `value` |
| `regendelay` | time in milliseconds after being damage before normal regeneration resumes | `milliseconds` |
| `regentime` | regenerate health this often | `milliseconds` |
| `regenhealth` | amount of health regeneration gives | `value` |
| `regendecay` | if over maxhealth, decay this amount each regen | `value` |
| `kamikaze` | determines the level of kamikaze events;<br>0 = never, 1 = holding grenade, 2 = have grenade, 3 = always | `value` |
| `itemspawntime` | time in milliseconds before items (re)spawn | `milliseconds` |
| `itemspawndelay` | time in milliseconds after map start items first spawn | `milliseconds` |
| `itemspawnstyle` | determines the timing of item spawning at map start;<br>0 = all at once, 1 = staggered, 2 = random, 3 = randomise between both | `value` |
| `timelimit` | time in minutes before round ends, for modes without an explicit timelimit;<br>0 = off | `time` |
| `timelimitbomber` | time in minutes before a bomber-ball match ends;<br>0 = off | `time` |
| `timelimitbomberhold` | time in minutes before a hold bomber-ball match ends;<br>0 = off | `time` |
| `timelimitcapture` | time in minutes before a capture-the-flag match ends;<br>0 = off | `time` |
| `timelimitdefend` | time in minutes before a defend-and-control match ends;<br>0 = off | `time` |
| `timelimitdefendking` | time in minutes before a king defend-and-control match ends;<br>0 = off | `time` |
| `timelimitduel` | time in minutes before a duel match ends;<br>0 = off | `time` |
| `timelimitgladiator` | time in minutes before a gladiator deathmatch ends;<br>0 = off | `time` |
| `timelimitspeedrun` | time in minutes before a speedrun match ends;<br>0 = off | `time` |
| `timelimitspeedrungauntlet` | time in minutes before a gauntlet speedrun match ends;<br>0 = off | `time` |
| `timelimitsurvivor` | time in minutes before a survivor deathmatch ends;<br>0 = off | `time` |
| `overtimeallow` | if scores are equal, go into overtime | `value` |
| `overtimelimit` | maximum time overtime may last, 0 = forever | `minutes` |
| `intermlimit` | time intermission lasts before the vote menu comes up, 0 = skip | `milliseconds` |
| `votelimit` | time in milliseconds intermission voting lasts | `milliseconds` |
| `damageself` | determines if the player can damage themselves;<br>0 = off, 1 = either hurt self or use damageteam rules | `value` |
| `damageselfscale` | determines how much self-damage is dealt;<br>0 = off, anything else = scale for damage | `value` |
| `damageteamscale` | determines how much team damage is dealt;<br>0 = off, anything else = scale for damage | `value` |
| `enemyspawntime` | determine length of time before enemies respawn | `milliseconds` |
| `enemyspawndelay` | determine length of time after map start enemies first spawn | `milliseconds` |
| `enemyspawnstyle` | determines enemy spawning style, 0 = all at once, 1 = staggered, 2 = random, 3 = randomise between both | `value` |
| `playerscale` | defines the size of players | `value` |
| `botscale` | defines the size of bots | `value` |
| `captureresetdelay` | time in milliseconds before a dropped flag automatically resets | `milliseconds` |
| `healthscalehard` | multiplier of spawn health with the hard mutator | `value` |
| `maxhealth` | spawnhealth * maxhealth defines the maximum amount of health that can be reached (e.g. standing next to a friendly goal) | `value` |
| `maxhealthvampire` | spawnhealth * maxhealthvampire defines the maximum amount of health that can be reached by damaging other players in vampire | `value` |
| `minresizescale` | defines the smallest scaled size a player can become in a match with the resize mutator enabled | `value` |
| `maxresizescale` | defines the largest scaled size a player can become in a match with the resize mutator enabled | `value` |
| `checkpointspawn` | determines if you will respawn at checkpoints after material deaths | `value` |
| `duelmaxqueued` | number of players that can be queued for duel. 0 = any number of players | - |
| `survivormaxqueued` | number of players that can be queued for survivor. 0 = any number of players | - |
| `followaiming` | determines aim direction when following a player | `[aim in thirdperson] [aim in first person]` |
| `spectvfirstperson` | determines aim direction of spectv;<br>0 = aim in direction followed player is facing, 1 = aim in direction determined by spectv when dead, 2 = always aim in direction | `value` |
| `spectvthirdperson` | determines aim direction of spectv;<br>0 = aim in direction followed player is facing, 1 = aim in direction determined by spectv when dead, 2 = always aim in direction | `value` |
| `previousmaps` | list of previously played maps | - |
| `maphistory` | remember this many maps that can't be voted again if votelock is set | `value` |
| `intermmode` | determines camera style in intermission;<br>0 = float, 1 = tv | `value` |
| `coopbalance` | in coop, number of bots on each enemy team for each human player | `value` |
| `serverclients` | maximum number of allowed clients | `value` |
| `serverdesc` | server description | `text` |
| `servermotd` | server message of the day | `text` |
| `serveropen` | determines which master modes the server allows;<br>0 = all, with privilege claims auto-approved, 1 = open only, with privilege claims auto-approved,<br>2 = open, veto or locked, with privilege claims auto-approved (for public coop-editing), 3 = open or veto, privilege only by moderator or above | `value` |
| `autoadmin` | determines if authorities claim status by default | `value` |
| `aihostnum` | multiply number of bots hosted by this much for the bot hosting decision | `value` |
| `aihostping` | multiply host ping by this much for the bot hosting decision | `value` |
| `aihostshift` | require this difference before shifting bot hosts | `value` |
| `airefreshdelay` | delay imposed before the AI manager reorganises their setup | `milliseconds` |
| `modelockfilter` | determines the modes which are allowed to be used as dictated by modelock,<br>convenient to set using a sum of bit shifted mode (&lt;&lt; 1 $G_*) vars,<br>example: (\| (&lt;&lt; 1$G_EDITING) (&lt;&lt; 1$G_DEATHMATCH)) | - |
| `mutslockfilter` | determines the mutators which are allowed to be used as dictated by modelock,<br>convenient to set using a sum of $G_M_* vars | - |
| `gamespeed` | percentage of default gameplay speed | `value` |
| `gamepaused` | pauses the game, automatically unset by server | `value` |
| `botskillmin` | minimum randomly assigned AI skill level | `value` |
| `botskillmax` | maximum randomly assigned AI skill level | `value` |
| `coopskillmin` | minimum randomly assigned AI skill level in coop | `value` |
| `coopskillmax` | maximum randomly assigned AI skill level in coop | `value` |
| `enemyskillmin` | minimum randomly assigned skill level for neutral actors in onslaught | `value` |
| `enemyskillmax` | maximum randomly assigned skill level for neutral actors in onslaught | `value` |
| `botlimit` | maximum number of bots allowed, regardless of any other variable/setting | `value` |
| `botbalance` | determines bot balancing method;<br>-1 = always use numplayers, 0 = don't balance, 1 or more = fill to at least this many players | `value` |

`<actor>` is one of: `player`, `bot`, `turret`, `grunt`, `drone`, `roller`, `hazard`, `janitor`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<actor>abilities` | allowed actions for `<actor>s`. | `move jump crouch melee primary secondary pushable affinity regen kamikaze living damage ammo float` |
| `<actor>collide` | determines which targets can be attacked | `players bots enemies` |
| `<actor>teamdamage` | determines which targets can take team damage | `players bots enemies ghosts` |
| `<actor>health` | spawn health | `value` |
| `<actor>scale` | actor model scale, also scales movement speed accordingly | `value` |
| `<actor>speed` | base movement speed | `value` |
| `<actor>impulsespeed` | parkour and boost speed | `value` |
| `<actor>impulse` | allowed impulse types (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |
| `<actor>damage` | multiplier of damage dealt | `value` |
| `<actor>coastscale` | multiplier of the world coast, 0 disables coasting drag | `value` |
| `<actor>weight` | base weight, affects how quickly the actor falls | `value` |
| `<actor>buoyancy` | base buoyancy, affects how the actor floats in liquid | `value` |
| `<actor>speedextra` | base movement speed added in single weapon modes | `value` |
| `<actor>impulsespeedextra` | parkour and boost speed added in single weapon modes | `value` |
| `<actor>weightextra` | weight added in single weapon modes | `value` |
| `<actor>buoyancyextra` | buoyancy added in single weapon modes | `value` |
| `<actor>speedprize` | movement speed multiplier while carrying a prize | `value` |
| `<actor>sprinttime` | time spent running before the actor starts sprinting | `milliseconds` |
| `<actor>airtolerance` | time after leaving the ground that the actor is still treated as on the floor | `milliseconds` |
| `<actor>liquidboost` | upward velocity given when surfacing from liquid | `value` |
| `<actor>evadedelay` | time an actor waits after evading before it can evade again when hit, 0 = never evade | `milliseconds` |
| `<actor>evadespeed` | speed of the sideways burst an actor makes when it evades | `value` |
| `<actor>lockdelay` | time an actor warns its target with a beam and a rising tone before it opens fire, 0 = fire without warning | `milliseconds` |
| `<actor>lockreset` | time an actor can hold fire after its last shot before it has to warn its target again | `milliseconds` |
| `<actor>spotdelay` | time before an actor can spot the same player again | `milliseconds` |
| `<actor>spotradius` | distance within which the enemies of an actor that spots a player go after them, 0 = never spot | `value` |
| `<actor>fuse` | time a kamikaze actor counts down after reaching its target before it explodes, 0 = explode at once | `milliseconds` |
| `<actor>fuseflashbright` | brightness added to an armed kamikaze actor's glow at the height of each flash | `value` |
| `<actor>fuseflashtime` | how long each flash of an armed kamikaze actor lasts | `milliseconds` |
| `<actor>fusepulsefast` | time between an armed kamikaze actor's flashes and beeps as its fuse runs out | `milliseconds` |
| `<actor>fusepulseslow` | time between an armed kamikaze actor's flashes and beeps when its fuse starts | `milliseconds` |
| `<actor>hurtstop` | time an AI actor stops moving after being hurt, 0 = never | `milliseconds` |
| `<actor>maxcarry` | maximum number of weapons carried | `value` |
| `<actor>weapondeploy` | weapon selected on spawn and used by AI when deploying, -1 = none | `value` |
| `<actor>spawndelayedit` | time in milliseconds before respawn in edit mode | `milliseconds` |
| `<actor>aiavoidteam` | AI avoids waypoints in front of friendly actors whose aim is within this dot product, 0 = off | `value` |
| `<actor>aifloatheight` | height above its target spot that a floating AI flies at | `distance` |
| `<actor>aifloatduck` | distance a floating AI drops to get past an obstruction | `distance` |
| `<actor>aipitchangle` | pitch above which AI jumps, or below which it crouches, to reach a target | `degrees` |
| `<actor>aiyawscale` | multiplier of the AI's yaw turning speed | `value` |
| `<actor>aipitchscale` | multiplier of the AI's pitch turning speed | `value` |
| `<actor>aihackchance` | one in this many chance of a qualifying hit hacking an enemy actor, 0 = off | `value` |
| `<actor>aihackweap` | weapon that can hack an enemy actor | `value` |
| `<actor>aihacktype` | firing actions of aihackweap that can hack an enemy actor (bitwise OR) | `primary secondary primary-flak secondary-flak` |
| `<actor>vname` | generic name for system messages | `string` |
| `<actor>spawngrenades` | spawn with grenades;<br>0 = never, 1 = all but instagib/speedrun, 2 = always | `value` |
| `<actor>spawnmines` | spawn with mines;<br>0 = never, 1 = all but instagib/speedrun, 2 = always | `value` |
| `<actor>weaponspawn` | weapon players spawn with, defaults to pistol (1) | `value` |
| `<actor>weaponinsta` | weapon players spawn with in instagib, defaults to rifle (8) | `value` |
| `<actor>weaponspeedrun` | weapon players spawn with in speedrun, defaults to claw (0) | `value` |
| `<actor>weapongladiator` | weapon players spawn with in gladiator, defaults to claw (0) | `value` |
| `<actor>weaponkaboom` | weapon players spawn with in kaboom, defaults to grenades (11) | `value` |
| `<actor>weaponmedieval` | weapon players spawn with in medieval, defaults to sword (2) | `value` |
| `<actor>spawndelay` | time in milliseconds before respawn in most modes | `millisecond` |
| `<actor>spawndelayinstascale` | time multiplier before respawn in instagib mutated modes | `value` |
| `<actor>spawndelaycapture` | time in milliseconds before respawn in capture mode | `milliseconds` |
| `<actor>spawndelaybomber` | time in milliseconds before respawn in bomber mode | `milliseconds` |
| `<actor>spawndelaydefend` | time in milliseconds before respawn in defend mode | `milliseconds` |
| `<actor>spawndelayspeedrun` | time in milliseconds before respawn in speedrun mode | `milliseconds` |
| `<actor>spawndelaygauntlet` | time in milliseconds before respawn in gauntlet mode | `milliseconds` |
| `botoffset` | increases or decreases the amount of bots starting from the numplayers value of the current map | `value` |
| `mapcomplete` | enables map completion for a given command or alias;<br>this enables tab-completion for the first argument of an already existing command or alias,<br>the completion uses files that ends with 'mpz' in the 'maps' folders of the game's homedir, and its data dir(s) | `command` |
| `enemybalance` | number of enemies spawned at each actor spawn point | `value` |
| `radialscale` | multiply explosion radius by this much | `value` |
| `radiallimited` | multiply explosion radius by this much in single weapon modes (eg. instagib) | `value` |
| `damagescale` | multiply all damage by this much | `value` |
| `kickpushscale` | multiply kick pushes from weapons by this much | `value` |
| `kickpushcrouch` | multiply kick pushes from weapons by this much when crouching | `value` |
| `kickpushsway` | multiply kick push effect on hud gun sway by this much | `value` |
| `kickpushzoom` | multiply kick pushes from weapons by this much when zoomed | `value` |
| `lasthitdelay` | time in milliseconds before a hit no longer is counted as a last hit | `value` |
| `multikilldelay` | time in milliseconds multiple kills in a row must occur | `value` |
| `spreecount` | number of consecutive frags for each spree level | `value` |
| `dominatecount` | number of frags on a single player without revenge before it is considered domination | `value` |
| `numplayers` | number of players the map is designed for, 0 = determine from number of spawns | `value` |
| `maxplayers` | maximum number of players for the map, 0 = numplayers*3 | `value` |
| `healthscale` | multiplier of spawn health | `value` |
| `vampirescale` | multiplier of damage dealt that is returned to the attacker as health with the vampire mutator | `value` |
| `noweapburn` | enables burn residual effects, 0 = off | `bool` |
| `noweapbleed` | enables bleed residual effects, 0 = off | `bool` |
| `noweapshock` | enables shock residual effects, 0 = off | `bool` |
| `noweapcorrode` | enables corrode residual effects, 0 = off | `bool` |
| `shocktwitchvel` | velocity of the random twitching of ragdolls caused by shock residuals | `value` |
| `survivorprotect` | time in milliseconds after spawning players cannot be damaged in survivor matches | `milliseconds` |
| `radardisabled` | forces the radar off | `bool` |
| `radardistlimit` | forces the radar to this distance at most, 0 = off | `distance` |
| `balancemaps` | determines if map team balancing is used;<br>-1 = map default, 0 = off, 1 = capture/defend/bomber only, 2 = also with team spawns, 3 = forced | `value` |
| `balancereset` | reset players when balancing them;<br>0 = off, 1 = only when necessary, 2 = always | `value` |
| `balancedelay` | delay before mapbalance switches teams | `milliseconds` |
| `balancenospawn` | prevent respawning while waiting to balance | `bool` |
| `balanceduke` | enables map balancing in duel and survivor | `bool` |
| `fraglimit` | number of frags required to end the match in classic, 0 = off | `value` |
| `timelimitspeedrunlapped` | time in minutes before a lapped speedrun match ends;<br>0 = off | `time` |
| `spreeprize` | prize given for each killing spree level;<br>-1 = random, 0 = none, 1 = grenade, 2 = mine, 3 = rocket, 4 = minigun, 5 = jetsaw, 6 = eclipse | `value` |
| `spreemaxprize` | prize given for reaching the highest killing spree level;<br>-1 = random, 0 = none, 1 = grenade, 2 = mine, 3 = rocket, 4 = minigun, 5 = jetsaw, 6 = eclipse | `value` |
| `spreebreakprize` | prize given for ending an opponent's killing spree;<br>-1 = random, 0 = none, 1 = grenade, 2 = mine, 3 = rocket, 4 = minigun, 5 = jetsaw, 6 = eclipse | `value` |
| `revengeprize` | prize given for getting revenge against a dominating player;<br>-1 = random, 0 = none, 1 = grenade, 2 = mine, 3 = rocket, 4 = minigun, 5 = jetsaw, 6 = eclipse | `value` |
| `itemannouncespawn` | announce the spawning of these items | `value` |
| `itemannounceuse` | announce the use of these items | `value` |
| `itemannouncedrop` | announce the dropping of these items | `value` |
| `quakedelta` | amount screen shake decays by over quakefade | `value` |
| `quakefade` | time screen shake takes to decay by quakedelta | `milliseconds` |
| `quakewobble` | maximum view roll caused by screen shake | `value` |
| `quakelimit` | maximum amount of screen shake | `value` |
| `pushscale` | multiply all hit pushes by this much | `value` |
| `pushlimited` | multiply all hit pushes by this much in single weapon modes (eg. instagib) | `value` |
| `stunscale` | multiply all stuns by this much | `value` |
| `stunlimited` | multiply all stuns by this much in single weapon modes (eg. instagib) | `value` |
| `velscale` | multiply all hit velocities by this much | `value` |
| `vellimited` | multiply all hit velocities by this much in single weapon modes (eg. instagib) | `value` |
| `hitpushscale` | multiply push from hits by this much | `value` |
| `deadpushscale` | multiply push from hits that result in a frag by this much | `value` |
| `wavepushscale` | multiply push from explosion waves by this much | `value` |
| `hitstunscale` | multiply stun from hits by this much | `value` |
| `deadstunscale` | multiply stun from hits that result in a frag by this much | `value` |
| `wavestunscale` | multiply stun from explosion waves by this much | `value` |
| `hitvelscale` | multiply velocity from hits by this much | `value` |
| `deadvelscale` | multiply velocity from hits that result in a frag by this much | `value` |
| `wavevelscale` | multiply velocity from explosion waves by this much | `value` |
| `gladiatorregen` | allow regeneration in gladiator | `bool` |
| `gladiatorradialscale` | multiply explosion radius by this much in gladiator | `value` |
| `gladiatorpushscale` | multiply all push by this much in gladiator | `value` |
| `gladiatorextrapushscale` | multiply all push by this much times maxhealth/health in gladiator | `value` |
| `gladiatorhitpushscale` | multiply push from hits by this much in gladiator | `value` |
| `gladiatorextrahitpushscale` | multiply push from hits by this much times maxhealth/health in gladiator | `value` |
| `gladiatordeadpushscale` | multiply push from hits that result in a frag by this much in gladiator | `value` |
| `gladiatorextradeadpushscale` | multiply push from hits that result in a frag by this much times maxhealth/health in gladiator | `value` |
| `gladiatorwavepushscale` | multiply push from explosion waves by this much in gladiator | `value` |
| `gladiatorextrawavepushscale` | multiply push from explosion waves by this much times maxhealth/health in gladiator | `value` |
| `gladiatorstunscale` | multiply all stun by this much in gladiator | `value` |
| `gladiatorextrastunscale` | multiply all stun by this much times maxhealth/health in gladiator | `value` |
| `gladiatorhitstunscale` | multiply stun from hits by this much in gladiator | `value` |
| `gladiatorextrahitstunscale` | multiply stun from hits by this much times maxhealth/health in gladiator | `value` |
| `gladiatordeadstunscale` | multiply stun from hits that result in a frag by this much in gladiator | `value` |
| `gladiatorextradeadstunscale` | multiply stun from hits that result in a frag by this much times maxhealth/health in gladiator | `value` |
| `gladiatorwavestunscale` | multiply stun from explosion waves by this much in gladiator | `value` |
| `gladiatorextrawavestunscale` | multiply stun from explosion waves by this much times maxhealth/health in gladiator | `value` |
| `gladiatorvelscale` | multiply all velocity by this much in gladiator | `value` |
| `gladiatorextravelscale` | multiply all velocity by this much times maxhealth/health in gladiator | `value` |
| `gladiatorhitvelscale` | multiply velocity from hits by this much in gladiator | `value` |
| `gladiatorextrahitvelscale` | multiply velocity from hits by this much times maxhealth/health in gladiator | `value` |
| `gladiatordeadvelscale` | multiply velocity from hits that result in a frag by this much in gladiator | `value` |
| `gladiatorextradeadvelscale` | multiply velocity from hits that result in a frag by this much times maxhealth/health in gladiator | `value` |
| `gladiatorwavevelscale` | multiply velocity from explosion waves by this much in gladiator | `value` |
| `gladiatorextrawavevelscale` | multiply velocity from explosion waves by this much times maxhealth/health in gladiator | `value` |
| `darknessenv` | brightness of the environment with the dark mutator | `value` |
| `darknessglow` | brightness of glowing surfaces with the dark mutator | `value` |
| `darknessaura` | brightness of player auras with the dark mutator | `value` |
| `darknessui` | brightness of world user interfaces with the dark mutator | `value` |
| `darknesssun` | brightness of the sun with the dark mutator | `value` |
| `darknesspart` | brightness of particles with the dark mutator | `value` |
| `darknessflashcolourmin` | minimum brightness of each channel of the flashlight colour with the dark mutator, 0 = off | `value` |
| `darknessflashcolourmax` | maximum brightness of each channel of the flashlight colour with the dark mutator, 0 = off | `value` |
| `darknessflashradiusmin` | minimum flashlight radius with the dark mutator, 0 = off | `distance` |
| `darknessflashradiusmax` | maximum flashlight radius with the dark mutator, 0 = off | `distance` |
| `darknessflashlevel` | flashlight brightness with the dark mutator | `value` |
| `darknessflashspot` | flashlight spot angle with the dark mutator | `degrees` |
| `gibweight` | weight of giblets (body parts) | `value` |
| `gibbuoyancymin` | minimum buoyancy of giblets (body parts), randomised up to gibbuoyancymax | `value` |
| `gibbuoyancymax` | maximum buoyancy of giblets (body parts) | `value` |
| `giblimit` | maximum number of giblets (body parts) in one burst | `value` |
| `gibpieces` | maximum number of pieces a player breaks into | `value` |
| `gibchancevanity` | percentage chance of a player's vanity items being dropped | `value` |
| `gibchancepieces` | percentage chance of a player breaking into pieces | `value` |
| `gibchancecollects` | percentage chance of collected items being dropped | `value` |
| `gibdamage` | number of giblets is damage divided by health times this | `value` |
| `gibheadless` | number of giblets is damage divided by health times this for decapitations | `value` |
| `gibobliterated` | number of giblets is damage divided by health times this for obliterations | `value` |
| `vanityelasticity` | coefficient of restitution for dropped vanity items hitting surfaces | `value` |
| `vanityrelativity` | factor by which player velocity is transferred to dropped vanity items | `value` |
| `vanityliquidcoast` | speed at which dropped vanity items coast through liquids | `value` |
| `vanityweight` | weight of dropped vanity items | `value` |
| `vanitybuoyancy` | buoyancy of dropped vanity items | `value` |
| `debriselasticity` | coefficient of restitution for debris hitting surfaces | `value` |
| `debrisliquidcoast` | speed at which debris coasts through liquids | `value` |
| `debrisweight` | weight of debris | `value` |
| `debrisbuoyancy` | buoyancy of debris | `value` |
| `ejectfade` | time ejected shell casings last, plus a random amount up to this | `milliseconds` |
| `ejectelasticity` | coefficient of restitution for ejected shell casings hitting surfaces | `value` |
| `ejectrelativity` | factor by which player velocity is transferred to ejected shell casings | `value` |
| `ejectliquidcoast` | speed at which ejected shell casings coast through liquids | `value` |
| `ejectweight` | weight of ejected shell casings | `value` |
| `ejectbuoyancy` | buoyancy of ejected shell casings | `value` |
| `itemcollide` | collision properties of dropped items (bitwise OR) | `COLLIDE_TRACE COLLIDE_SCAN COLLIDE_LENGTH COLLIDE_PROJ COLLIDE_OWNER IMPACT_GEOM IMPACT_PLAYER IMPACT_SHOTS BOUNCE_GEOM BOUNCE_PLAYER BOUNCE_SHOTS DRILL_GEOM DRILL_PLAYER DRILL_SHOTS STICK_GEOM STICK_PLAYER` |
| `itemextinguish` | determines when dropped items are extinguished (bitwise OR) | `water death-material destroy` |
| `iteminteracts` | map entities dropped items interact with (bitwise OR) | `teleports pushers` |
| `itemfadetime` | time dropped items take to fade | `milliseconds` |
| `itemelasticity` | coefficient of restitution for dropped items hitting surfaces | `value` |
| `itemrelativity` | factor by which player velocity is transferred to dropped items | `value` |
| `itemliquidcoast` | speed at which dropped items coast through liquids | `value` |
| `itemweight` | weight of dropped items | `value` |
| `itembuoyancy` | buoyancy of dropped items | `value` |
| `itemspeeddelta` | rate at which dropped items turn towards their target | `value` |
| `itemspeedmin` | minimum speed of dropped items | `value` |
| `itemspeedmax` | maximum speed of dropped items, 0 = no limit | `value` |
| `itemrepulsion` | distance within which dropped items push each other apart, 0 = off | `distance` |
| `itemrepelspeed` | speed at which dropped items push each other apart | `value` |
| `itemrepeldelay` | time after being dropped before items push each other apart | `milliseconds` |
| `itemdropminspeed` | minimum speed of dropped items | `value` |
| `itemdropspreadxy` | horizontal angle between items dropped at the same time | `degrees` |
| `itemdropspreadz` | vertical angle between items dropped at the same time | `degrees` |
| `aihunttime` | how long bots chase or escort in objective modes before re-evaluating | `milliseconds` |
| `aiweightpull` | multiplier of waypoint pull when bots weigh routes | `value` |
| `aiweightdrag` | divisor of waypoint drag when bots weigh routes, 0 = ignore drag | `value` |
| `botbalancescale` | multiply the bot balance by this much | `value` |
| `botbalanceduel` | bot balancing method in duel;<br>-1 = always use numplayers, 0 = don't balance, 1 or more = fill to at least this many players | `value` |
| `botbalancesurvivor` | bot balancing method in survivor;<br>-1 = always use numplayers, 0 = don't balance, 1 or more = fill to at least this many players | `value` |
| `botskillfrags` | adjust bot skill by this much for each frag they have | `value` |
| `botskilldeaths` | adjust bot skill by this much for each death they have | `value` |
| `coopskillfrags` | adjust bot skill by this much for each frag they have in coop | `value` |
| `coopskilldeaths` | adjust bot skill by this much for each death they have in coop | `value` |
| `botmalenames` | list of names for male bots | `list` |
| `botfemalenames` | list of names for female bots | `list` |
| `botmalevanities` | list of vanity items for male bots | `list` |
| `botfemalevanities` | list of vanity items for female bots | `list` |
| `botmalemixers` | list of mixers for male bots | `list` |
| `botfemalemixers` | list of mixers for female bots | `list` |
| `botcolourseed` | random bot properties determined by colour as a seed (bitwise OR) | `skill name model loadout` |
| `botrandomcase` | bots randomise the case of the first letter of their name if rnd(botrandomcase) > 0 | `value` |
| `enemylimit` | maximum number of enemies | `value` |
| `prizegrenade` | relative chance of a random prize being a grenade | `value` |
| `prizemine` | relative chance of a random prize being a mine | `value` |
| `prizerocket` | relative chance of a random prize being a rocket | `value` |
| `prizeminigun` | relative chance of a random prize being a minigun | `value` |
| `prizejetsaw` | relative chance of a random prize being a jetsaw | `value` |
| `prizeeclipse` | relative chance of a random prize being an eclipse | `value` |

`<mode>` is one of: `duel`, `survivor`, `gladiator`, `capture`, `defend`, `defendking`, `bomber`, `bomberhold`, `speedrun`, `speedrunlapped`, `speedrungauntlet`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `overtimeallow<mode>` | if scores are equal in `<mode>`, go into overtime | `value` |
| `overtimelimit<mode>` | maximum time overtime may last in `<mode>`, 0 = forever | `minutes` |

`<team>` is one of: `neutral`, `alpha`, `omega`, `enemy`, `environment`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `team<team>name` | display name of the `<team>` team | `string` |
| `team<team>colour` | colour of the `<team>` team | `colour` |
| `obitspawn` | death message for spawning inside solid matter | `string` |
| `obitspectator` | death message for switching to spectator while alive | `string` |
| `obitdrowned` | death message for drowning | `string` |
| `obitmelted` | death message for dying in lava | `string` |
| `obitchoked` | death message for dying in volumetric fog material | `string` |
| `obitdeathmat` | death message for entering death material | `string` |
| `obithurtmat` | death message for dying in hurt material | `string` |
| `obitlost` | death message for falling out of the map | `string` |
| `obitwrongcp` | death message for hitting the wrong checkpoint in speedrun | `string` |
| `obitburn` | death message for being burned to death by another player | `string` |
| `obitburnself` | death message for burning to death by one's own hand | `string` |
| `obitbleed` | death message for bleeding to death from another player | `string` |
| `obitbleedself` | death message for bleeding to death by one's own hand | `string` |
| `obitshock` | death message for being shocked to death by another player | `string` |
| `obitshockself` | death message for shocking oneself to death | `string` |
| `obitcorrode` | death message for being corroded to death by another player | `string` |
| `obitcorrodeself` | death message for corroding oneself to death | `string` |
| `obitobliterated` | death message for being obliterated (gibbed) | `string` |
| `obitheadless` | death message for being decapitated | `string` |
| `obitsuicide` | death message for suicides that match no other obituary | `string` |
| `obitkilled` | death message for kills that match no other obituary | `string` |
| `obitsplat` | death message for touching a lethal map model | `string` |
| `obitsquish` | death message for being crushed by moving geometry | `string` |
| `obitjanitor` | death message for being disposed of as trash by a janitor | `string` |

## Gameplay values

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `autospecdelay` | time a player may remain dead before autospectate moves them to spectators | `milliseconds` |
| `bomberlockondelay` | determines the amount of time needed to hold throw button to achieve assisted pass to another team member | `milliseconds` |
| `capturecarryspeed` | movement speed added to players carrying a flag | `value` |
| `capturepickupdelay` | time a player needs to wait to be able to pick up a flag again after losing it | `milliseconds` |
| `fragbonus` | determines the amount of points a player gets for each frag | `value` |
| `enemybonus` | determines the amount of points a player gets for frags against neutral enemies in onslaught | `value` |
| `lasthitbonus` | determines the amount of points a player gets for last hits in gladiator | `value` |
| `headshotpoints` | determines the amount of bonus points a player gets when a frag is caused by a headshot | `value` |
| `multikillpoints` | determines the amount of bonus points a player gets for a double, triple, or multi kill | `value` |
| `multikillbonus` | determines if multikillpoints should be multiplied by 2, 3, or 4 as appropriate | `value` |
| `spreepoints` | determines the amount of points a player gets for achieving each level of killing spree for the first time | `value` |
| `spreebreaker` | determines the amount of points a player gets for ending an opponent's killing spree | `value` |
| `dominatepoints` | determines the amount of points a player gets when he achieves domination on another player | `value` |
| `revengepoints` | determines the amount of points a player gets when he gets revenge against a dominating player | `value` |
| `firstbloodpoints` | determines the amount of points a player gets when he makes the first kill of a match | `value` |
| `assistkilldelay` | determines the time in milliseconds after a registered hit in which that player's death awards an assist | `value` |
| `mapbalance` | determines if teams switch sides on asymmetrical maps at half time;<br>0 = off, 1 = capture/defend/bomber only, 2 = also with team spawns, 3 = forced | `value` |
| `teamkillban` | automatically ban player when warned this many times for teamkill | `value` |
| `teamkillkick` | automatically kick player when warned this many times for teamkill | `value` |
| `teamkillpenalty` | subtract this*fragbonus from the players points when teamkilling | `value` |
| `teamkillrestore` | restore the team score as if the teamkiller was never there if the point loss of the team was greater than this | `value` |
| `teamkilltime` | time threshold in which teamkills are counted | `minutes` |
| `teamkillwarn` | the limit of teamkills after which the player receives a warning | `value` |
