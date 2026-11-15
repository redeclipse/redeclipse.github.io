---
title: Variables - Modes
layout: docs
origfile: variables/Modes.md
origtitle: Modes
permalink: /docs/variables/Modes
redirect_from:
  - /wiki/variables/Modes/
---
* TOC
{:toc}
Settings for each mode, and the aliases that pick a mode and its mutators.

## Mode settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `duelreset` | determines if duel/survivor winner should be sent back to respawn for next round | `value` |
| `duelclear` | determines if items are reset at the end of each round | `value` |
| `duelcooloff` | cool off period before duel goes to next round | `milliseconds` |
| `duelcycle` | determines if players are force-cycled after a certain number of wins (0 = off, 1 = non-team games, 2 = team games, 3 = both) | `value` |
| `duelcycles` | maximum wins in a row before force-cycling (0 = num team/total players) | `value` |
| `pointlimit` | number of points required to end the round (and win) in deathmatch modes | `value` |
| `capturelimit` | number of captures required to end the round (and win) in ctf | `value` |
| `capturepoints` | points added to score for capturing flag | `value` |
| `capturepickuppoints` | points added to score for picking up enemy flag | `value` |
| `capturethreshold` | automatically drop the flag if the flag-carrier "warps" more than this distance | `distance` |
| `capturebuffing` | buff circumstances | `[near own flag at its base] [near own loose flag] [holding own flag] [near teammate holding own flag] [holding enemy flag] [near teammate holding enemy flag] [near own flag base]` |
| `capturebuffdelay` | buffed when guarding, and for this long after | `milliseconds` |
| `capturebuffarea` | radius around a flag or carrier in which buffing occurs | `distance` |
| `capturebuffdamage` | multiply outgoing damage by this much when buffed | `value` |
| `capturebuffshield` | divide incoming damage by this much when buffed | `value` |
| `captureregenbuff` | 0 = off, 1 = modify regeneration when buffed | `value` |
| `captureregendelay` | regen this often when buffed | `milliseconds` |
| `captureregenextra` | add this to regen when buffed | `value` |
| `defendlimit` | number of points required to end the match in defend and control, 0 = off | `value` |
| `defendinterval` | time in milliseconds to add one tick to the secure gauge | `milliseconds` |
| `defendpoints` | number of points given in dac | `value` |
| `defendoccupy` | ticks needed to overthrow or secure a control area | `value` |
| `defendking` | ticks needed to secure in king-of-the-hill | `value` |
| `defendhold` | ticks an area must remain secured in order to score | `value` |
| `defendflags` | flags to init and how;<br>0 = init all (neutral), 1 = init neutral and team only, 2 = init team only, 3 = init all (team + neutral + converted) | `value` |
| `defendbuffing` | buff circumstances | `[when guarding] [when securing] [even when enemies are present]` |
| `defendbuffoccupy` | for defendbuffing&4, an area must be occupied this much (0-1) before buffing | `value` |
| `defendbuffdelay` | buffed for this long after leaving | `milliseconds` |
| `defendbuffarea` | radius around a control area in which buffing occurs, 0 = anywhere | `distance` |
| `defendbuffdamage` | multiply outgoing damage by this much when buffed | `value` |
| `defendbuffshield` | divide incoming damage by this much when buffed | `value` |
| `defendregenbuff` | 0 = off, 1 = modify regeneration when buffed | `value` |
| `defendregendelay` | regen this often when buffed | `milliseconds` |
| `defendregenextra` | add this to regen when buffed | `value` |
| `bomberlimit` | finish when score is this or more (non-hold) | `value` |
| `bomberholdlimit` | finish when score is this or more (hold) | `value` |
| `bomberpoints` | points added to score for a goal | `value` |
| `bomberthrowinpoints` | points team gets for scoring with throw-in in basket | `value` |
| `bombertouchdownpoints` | points team gets for scoring with touchdown in basket | `value` |
| `bomberpenalty` | points taken from score for throwing the bomb into your own goal | `value` |
| `bomberpickuppoints` | points added to score for picking up the bomb | `value` |
| `bomberholdpoints` | points added to score for each interval (hold) | `value` |
| `bomberholdpenalty` | points subtracted for having the bomb fuse run out (hold) | `value` |
| `bomberthreshold` | automatically drop the bomb if the bomb-carrier "warps" more than this distance | `distance` |
| `bomberbuffing` | buff circumstances | `[when near own base] [when holding bomb] [when holding bomb as the defenders (attack only)]` |
| `bomberbuffdelay` | buffed for this long after leaving | `milliseconds` |
| `bomberbuffarea` | radius around the home base in which buffing occurs, 0 = anywhere | `distance` |
| `bomberbuffdamage` | multiply outgoing damage by this much when buffed | `value` |
| `bomberbuffshield` | divide incoming damage by this much when buffed | `value` |
| `bomberregenbuff` | 0 = off, 1 = modify regeneration when buffed | `value` |
| `bomberregendelay` | regen this often when buffed | `milliseconds` |
| `bomberregenextra` | add this to regen when buffed | `value` |
| `bombercarryspeed` | movement speed added to the player carrying the bomb | `value` |
| `bombercarrytime` | time in milliseconds a player can carry the bomber ball before it explodes | `milliseconds` |
| `bomberholdinterval` | time in milliseconds a player needs to hold the ball in hold bomber-ball to get a point | `milliseconds` |
| `bomberpickupdelay` | time in milliseconds a player needs to wait to be able to pick up the bomber ball again after dropping it | `milliseconds` |
| `bomberresetdelay` | time in milliseconds before the bomber ball resets after being dropped | `milliseconds` |
| `bomberspeed` | speed at which the bomb is thrown | `value` |
| `duelrandom` | randomise the queue before the first round | `bool` |
| `duelregen` | allow regeneration in duel | `bool` |
| `dueldelay` | time a round continues for after it is won | `milliseconds` |
| `duelaffinity` | determines when players entering an affinity zone can respawn in duel;<br>0 = off, 1 = next round, 2 = immediately | `value` |
| `duelovertime` | only spawn the leaders in free-for-all overtime | `bool` |
| `survivorreset` | determines if survivor winners should be sent back to respawn for the next round | `bool` |
| `survivorclear` | determines if items are reset at the end of each round | `bool` |
| `survivorregen` | allow regeneration in survivor | `bool` |
| `survivordelay` | time a round continues for after it is won | `milliseconds` |
| `survivorcooloff` | cool off period before survivor goes to next round | `milliseconds` |
| `survivoraffinity` | players entering an affinity zone can spawn immediately in survivor | `bool` |
| `survivorovertime` | only spawn the leaders in free-for-all overtime | `bool` |
| `speedrunlimit` | number of laps required to end the match, 0 = off | `value` |
| `speedrungauntletwinner` | declare the winner when the final team exceeds the best score | `bool` |
| `speedruncheckpointstrict` | if checkpoints are linked, only allow the next linked checkpoint | `bool` |
| `captureresetfloor` | reset tossed flags to their last position on the floor;<br>0 = off, 1 = team tossing their own flag, 2 = any flag | `value` |
| `captureresetstore` | carry over time already spent dropped when a flag is dropped again, in these capture modes (bitwise OR) | `quick defend protect normal` |
| `capturedefenddelay` | time before a dropped flag resets in defend capture-the-flag | `milliseconds` |
| `captureprotectdelay` | time a flag must be held to capture it in protect capture-the-flag | `milliseconds` |
| `captureretakedelay` | time after capturing before the same player can take the same flag again | `milliseconds` |
| `capturedropheight` | height above the feet at which flags are dropped | `distance` |
| `capturecollide` | collision properties of dropped flags (bitwise OR) | `COLLIDE_TRACE COLLIDE_SCAN COLLIDE_LENGTH COLLIDE_PROJ COLLIDE_OWNER IMPACT_GEOM IMPACT_PLAYER IMPACT_SHOTS BOUNCE_GEOM BOUNCE_PLAYER BOUNCE_SHOTS DRILL_GEOM DRILL_PLAYER DRILL_SHOTS STICK_GEOM STICK_PLAYER` |
| `captureextinguish` | determines when dropped flags are extinguished (bitwise OR) | `water death-material destroy` |
| `captureinteracts` | map entities dropped flags interact with (bitwise OR) | `teleports pushers` |
| `capturerelativity` | factor by which player velocity is transferred to dropped flags | `value` |
| `captureelasticity` | coefficient of restitution for dropped flags hitting surfaces | `value` |
| `captureliquidcoast` | speed at which dropped flags coast through liquids | `value` |
| `captureweight` | weight of dropped flags | `value` |
| `capturebuoyancy` | buoyancy of dropped flags | `value` |
| `capturespeedmin` | minimum speed of dropped flags | `value` |
| `capturespeedmax` | maximum speed of dropped flags, 0 = no limit | `value` |
| `capturerepulsion` | distance within which dropped flags push each other apart, 0 = off | `distance` |
| `capturerepelspeed` | speed at which dropped flags push each other apart | `value` |
| `capturerepeldelay` | time after being dropped before flags push each other apart | `milliseconds` |
| `capturecarryspeedeach` | movement speed added to players for each flag they carry | `value` |
| `capturecarryimpulsespeed` | impulse speed added to players carrying a flag | `value` |
| `capturecarryimpulsespeedeach` | impulse speed added to players for each flag they carry | `value` |
| `capturecarryweight` | weight added to players carrying a flag | `value` |
| `capturecarryweighteach` | weight added to players for each flag they carry | `value` |
| `capturecarrybuoyancy` | buoyancy added to players carrying a flag | `value` |
| `capturecarrybuoyancyeach` | buoyancy added to players for each flag they carry | `value` |
| `bomberbasketonly` | prohibit touchdowns in basket bomber-ball | `bool` |
| `bomberassaultreset` | defenders reset the bomb rather than carry it in attack bomber-ball | `bool` |
| `bomberassaultwinner` | declare the winner when the final team exceeds the best score in attack bomber-ball | `bool` |
| `bomberbasketmindist` | prohibit baskets from closer than this distance, 0 = off | `distance` |
| `bomberwait` | delay before the bomb spawns | `milliseconds` |
| `bomberdropheight` | height above the feet at which the bomb is dropped | `distance` |
| `bomberholdtime` | time a player can carry the bomb in hold bomber-ball before it explodes, 0 = forever | `milliseconds` |
| `bomberspeeddelta` | rate at which a passed bomb turns towards its target | `value` |
| `bomberspeedmin` | minimum speed of the bomb | `value` |
| `bomberspeedmax` | maximum speed of the bomb, 0 = no limit | `value` |
| `bombercollide` | collision properties of the bomb (bitwise OR) | `COLLIDE_TRACE COLLIDE_SCAN COLLIDE_LENGTH COLLIDE_PROJ COLLIDE_OWNER IMPACT_GEOM IMPACT_PLAYER IMPACT_SHOTS BOUNCE_GEOM BOUNCE_PLAYER BOUNCE_SHOTS DRILL_GEOM DRILL_PLAYER DRILL_SHOTS STICK_GEOM STICK_PLAYER` |
| `bomberextinguish` | determines when the bomb is extinguished (bitwise OR) | `water death-material destroy` |
| `bomberinteracts` | map entities the bomb interacts with (bitwise OR) | `teleports pushers` |
| `bomberrelativity` | factor by which player velocity is transferred to the bomb | `value` |
| `bomberelasticity` | coefficient of restitution for the bomb hitting surfaces | `value` |
| `bomberliquidcoast` | speed at which the bomb coasts through liquids | `value` |
| `bomberweight` | weight of the bomb | `value` |
| `bomberbuoyancy` | buoyancy of the bomb | `value` |
| `bombercarryimpulsespeed` | impulse speed added to the player carrying the bomb | `value` |
| `bombercarryweight` | weight added to the player carrying the bomb | `value` |
| `bombercarrybuoyancy` | buoyancy added to the player carrying the bomb | `value` |
| `janitorlimit` | maximum number of janitors | `value` |
| `janitorprize` | prize janitors give;<br>-1 = random, 0 = none, 1 = grenade, 2 = mine, 3 = rocket, 4 = minigun, 5 = jetsaw, 6 = eclipse | `value` |
| `janitorghost` | janitors are ghosts until their prize is ready | `bool` |
| `janitorready` | amount of junk a janitor must collect before it has a prize | `value` |
| `janitorcollect` | amount of junk a janitor collects before dumping it | `value` |
| `janitorbalance` | number of janitors is the current balance times this | `value` |
| `janitorjunktime` | fraction of their lifetime after which shell casings and vanities become junk | `value` |
| `janitorjunkitems` | fraction of their lifetime after which dropped items become junk | `value` |
| `janitorjunkdebris` | fraction of their lifetime after which giblets and debris become junk | `value` |
| `janitorjunkmessy` | scale all junk delays by this much in messy modes | `value` |
| `janitorsuckdist` | distance within which janitors suck up junk | `distance` |
| `janitorsuckspeed` | speed at which janitors suck up junk | `value` |
| `janitorreject` | distance at which janitors reject junk | `distance` |
| `janitorvanities` | list of vanity items for janitors | `list` |

## Mode aliases

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `map` | requests a map change to a given map, with no change of mode or mutators;<br>depending on privileges, this will force or vote for the map change | `map` |
| `gamemode` | returns the current game mode; 0 = demo, 1 = edit, 2 = dm, 3 = ctf, 4 = dac, 5 = bb, 6 = speedrun | - |
| `mode` | sets the mode and mutator values for the next map change request;<br>mode sets the mode type,<br>muts sets the mutators according to a bitwise sum of mutator values,<br>conveniently set using $G_\U* vars and sums of $G_M_* vars,<br>example: mode $G_DEATHMATCH (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `mode muts` |
| `start` | requests a map change to a given map with a specific mode and mutators;<br>depending on privileges, this will force or vote for the map change,<br>mode sets the mode type,<br>muts sets the mutators according to a bitwise sum of mutator values,<br>conveniently set using $G_\U* vars and sums of $G_M_* vars,<br>example: start bath $G_DEATHMATCH (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map mode muts` |
| `edit` | starts editing on a random map. specifying a file name will create a new map file on a blank map canvas | `map` |
| `demo` | starts playback of a given demo | `demo` |
| `deathmatch` | requests a map change to deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values, conveniently set using a sum of $G_M_* vars,<br>example: deathmatch bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `ffa` | requests a map change to free-for-all deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values, conveniently set using a sum of $G_M_* vars,<br>example: ffa bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `fdm` | requests a map change to free-for-all deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values, conveniently set using a sum of $G_M_* vars,<br>example: ffa bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `dm` | requests a map change to deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values, conveniently set using a sum of $G_M_* vars,<br>example: dm bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `teamdm` | requests a map change to team deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: teamdm bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `tdm` | requests a map change to team deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: tdm bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `coop` | requests a map change to coop deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: coop bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `cdm` | requests a map change to coop deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: cdm bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `instagib` | requests a map change to instagib deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: instagib bath (\| (&lt;&lt; 1 $G_M_DUEL) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `insta` | requests a map change to instagib deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: insta bath (\| (&lt;&lt; 1 $G_M_DUEL) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `medieval` | requests a map change to medieval deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: medieval bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |
| `kaboom` | requests a map change to kaboom deathmatch on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: kaboom bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |
| `duel` | requests a map change to duel deathmatch on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: duel bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `survivor` | requests a map change to survivor deathmatch on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: survivor bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `lms` | requests a map change to survivor deathmatch (last man standing) on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: lms bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `classic` | requests a map change to classic deathmatch on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: classic bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |
| `capture` | requests a map change to capture-the-flag on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: capture bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `ctf` | requests a map change to capture-the-flag on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: ctf bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `quickcapture` | requests a map change to quick capture-the-flag on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: quickcapture bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `defendcapture` | requests a map change to defend capture-the-flag on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: defendcapture bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `protectcapture` | requests a map change to protect capture-the-flag on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: protectcapture bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `defend` | requests a map change to defend-and-control on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: defend bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `dac` | requests a map change to defend-and-control on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: dac bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `dnc` | requests a map change to defend-and-control on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: dac bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `quickdefend` | requests a map change to quick defend-and-control on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: quickdefend bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `kingdefend` | requests a map change to king defend-and-control on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: kingdefend bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `koth` | requests a map change to king defend-and-control (king of the hill) on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: koth bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `bomber` | requests a map change to bomber-ball on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: bomber futuresport (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `bb` | requests a map change to bomber-ball on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: bb futuresport (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `holdbomber` | requests a map change to hold bomber-ball on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: holdbomber bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `basketbomber` | requests a map change to basket bomber-ball on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: basketbomber bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `attackbomber` | requests a map change to attack bomber-ball on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: attackbomber bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `speedrun` | requests a map change to speedrun on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: speedrun purge (\| (&lt;&lt; 1 $G_M_DUEL) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `speedrunlapped` | requests a map change to lapped speedrun on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: speedrunlapped purge (\| (&lt;&lt; 1 $G_M_FFA) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |
| `trial` | requests a map change to timed speedrun on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: trial purge (\| (&lt;&lt; 1 $G_M_FFA) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |
| `endurancespeedrun` | requests a map change to endurance speedrun on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: endurancespeedrun purge (\| (&lt;&lt; 1 $G_M_FFA) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |
| `gauntletspeedrun` | requests a map change to gauntlet speedrun on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: gauntletspeedrun purge (\| (&lt;&lt; 1 $G_M_FFA) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |
