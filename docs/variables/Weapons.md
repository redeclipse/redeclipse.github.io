---
title: Variables - Weapons
layout: docs
origfile: variables/Weapons.md
origtitle: Weapons
permalink: /docs/variables/Weapons
redirect_from:
  - /wiki/variables/Weapons/
---
* TOC
{:toc}
Every weapon's settings, one set for each weapon named by its prefix, such as pistolammoclip.

## Weapon settings

`<weapon>` is one of: `claw`, `pistol`, `sword`, `shotgun`, `smg`, `flamer`, `plasma`, `zapper`, `rifle`, `corroder`, `trident`, `grenade`, `mine`, `rocket`, `minigun`, `jetsaw`, `eclipse`, `melee`. Suffix `[1|2]` selects primary (`1`) or secondary (`2`) fire; optional `[flak]` applies to flak sub-projectiles.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>ammoadd` | the amount added when picking up the weapon or reloading it | `value` |
| `<weapon>ammoclip` | the maximum amount the clip of this weapon can hold | `value` |
| `<weapon>ammoitem` | the amount of ammo added to the inventory by an ammo pickup | `value` |
| `<weapon>ammospawn` | amount of ammo held at spawntime (including ammo loaded in weapon) | `value` |
| `<weapon>ammostore` | maximum amount of ammo carryable in inventory (excludes ammo loaded in weapon) | `value` |
| `<weapon>laser` | determines if this weapon has a laser pointer which is projected to the point where the player is aiming | `value` |
| `<weapon>colour` | determines the weapon main colour;<br>affects the light around the weapon, the ammo and the icon in the weaponlist | `colour` |
| `<weapon>modes` | determines the modes in which this weapon is allowed or disallowed;<br>conveniently set as a sum of bit shifted mode (&lt;&lt; 1 $G_*) vars,<br>positive sum: allow this weapon if one of the declared modes is selected,<br>negative sum: disallow this weapon if one if the declared modes is selected | `sum` |
| `<weapon>muts` | determines the mutators in which this weapon is allowed or disallowed;<br>conveniently set as a sum of $G_M_* vars,<br>positive sum: allow this weapon if one of the declared mutators is selected,<br>negative sum: disallow this weapon if one of the declared mutators is selected | `sum` |
| `<weapon>lightpersist` | determines the light effect around the weapon (bitwise OR):<br>1: dynamic light emission<br>2: material colour on weapon itself<br>3: player hint (glow around player)<br>4: player hint when powering weapon | `value` |
| `<weapon>cookzoom` | determines time to zoom in fully, in milliseconds | `value` |
| `<weapon>cookzoommin` | minimum field of view that zoom can take (min FoV = max zoom) | `value` |
| `<weapon>cookzoommax` | maximum field of view that zoom can take (max FoV = min zoom) | `value` |
| `<weapon>name` | short name of the weapon, used where space is limited | `string` |
| `<weapon>longname` | full name of the weapon, used in messages and pickups | `string` |
| `<weapon>disabled` | when non-zero, the weapon is unavailable in all modes | `boolean` |
| `<weapon>lightradius` | radius of the light emitted by the weapon (currently unused) | `value` |
| `<weapon>spawnstay` | time a dropped weapon of this type stays in the world before it disappears | `milliseconds` |
| `<weapon>spawntime` | time it takes for a weapon pickup of this type to respawn | `milliseconds` |
| `<weapon>spawnduke` | when more than zero, time it takes for a weapon pickup of this type to respawn in duel and survivor, overriding the normal delay | `milliseconds` |

## Crosshairs

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>crosshairsize` | determines size of weapon-specific crosshair | `value` |
| `<weapon>crosshairblend` | determines opacity of weapon-specific crosshair | `value` |
| `<weapon>crosshair` | determines the shape of the weapon-specific crosshair | `string` |
| `<weapon>clip` | determines the shape of the rounds in the weapon's ammo clip | `string` |

## Delays

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>delayreload` | the time it takes for the weapon to reload one 'add' unit (usually one clip) | `milliseconds` |
| `<weapon>delayitem` | the time it takes to pick up ammunition and return to firing condition | `milliseconds` |
| `<weapon>delayswitch` | the time it takes for the weapon be drawn before it is ready to fire | `milliseconds` |
| `<weapon>cookinterrupt` | toggles if the weapon can be switched while in the process of being cooked | `boolean` |

## Player modifiers

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>modhealth` | determines change in maximum health by having weapon in inventory; stacks with other modhealth vars (note that player health is out of 1000) | `value` |
| `<weapon>modhealthammo` | determines change in maximum health per unit of ammo in possession, including ones loaded into weapon; stacks with other modhealth vars (note that player health is out of 1000) | `value` |
| `<weapon>modhealthequip` | determines change in maximum health by holding weapon (as opposed to merely having it inventory); stacks with other modhealth vars (note that player health is out of 1000) | `value` |
| `<weapon>modimpulsespeed` | determines change in impulse move speed while having weapon in inventory; stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeedammo` | determines change in impulse move speed per unit of ammo in possession (including ones loaded into weapon); stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeedequip` | determines change in impulse move speed while holding weapon (as opposed to merely having it inventory); stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeedreload` | determines change in impulse move speed while reloading weapon; stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeedswitch` | determines change in impulse move speed switching from another weapon to this weapon; stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeedpower` | determines change in impulse move speed while cooking the weapon (like in plasma2); stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeeduse` | determines change in impulse move speed while picking up the weapon; stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeedzoom` | determines change in impulse move speed while using weapon zoom; stacks with other modimpulsespeed vars | `value` |
| `<weapon>modspeed` | determines change in run speed while having weapon in inventory; stacks with other modspeed vars | `value` |
| `<weapon>modspeedammo` | determines change in run speed per unit of ammo in possession (including ones loaded into weapon); stacks with other modspeed vars | `value` |
| `<weapon>modspeedequip` | determines change in run speed while holding weapon (as opposed to merely having it in inventory); stacks with other modspeed vars | `value` |
| `<weapon>modspeedreload` | determines change in run speed while reloading the weapon; stacks with other modspeed vars | `value` |
| `<weapon>modspeedswitch` | determines change in run speed while switching from another weapon to this weapon; stacks with other modspeed vars | `value` |
| `<weapon>modspeedpower` | determines change in run speed while cooking the weapon (like in plasma2); stacks with other modspeed vars | `value` |
| `<weapon>modspeeduse` | determines change in run speed while picking up the weapon; stacks with other modspeed vars | `value` |
| `<weapon>modspeedzoom` | determines change in run speed while using weapon zoom; stacks with other modspeed vars | `value` |
| `<weapon>modweight` | determines change in player weight while having weapon in inventory; stacks with other modweight vars | `value` |
| `<weapon>modweightammo` | determines change in player weight per unit of ammo in possession (including ones loaded into weapon); stacks with other modweight vars | `value` |
| `<weapon>modweightequip` | determines change in player weight while holding weapon (as opposed to merely having it in inventory); stacks with other modweight vars | `value` |
| `<weapon>modweightreload` | determines change in player weight while reloading the weapon; stacks with other modweight vars | `value` |
| `<weapon>modweightswitch` | determines change in player weight while switching from another weapon to this weapon; stacks with other modweight vars | `value` |
| `<weapon>modweightpower` | determines change in player weight while cooking the weapon (like in plasma2); stacks with other modweight vars | `value` |
| `<weapon>modweightuse` | determines change in player weight while picking up the weapon; stacks with other modweight vars | `value` |
| `<weapon>modweightzoom` | determines change in player weight while using weapon zoom; stacks with other modweight vars | `value` |
| `<weapon>modbuoyancy` | determines change in player buoyancy while having weapon in inventory; stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancyammo` | determines change in player buoyancy per unit of ammo in possession (including ones loaded into weapon); stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancyequip` | determines change in player buoyancy while holding weapon (as opposed to merely having it in inventory); stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancyreload` | determines change in player buoyancy while reloading the weapon; stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancyswitch` | determines change in player buoyancy while switching from another weapon to this weapon; stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancypower` | determines change in player buoyancy while cooking the weapon (like in plasma2); stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancyuse` | determines change in player buoyancy while picking up the weapon; stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancyzoom` | determines change in player buoyancy while using weapon zoom; stacks with other modbuoyancy vars | `value` |
| `<weapon>ammosub[1\|2]` | the amount taken from the clip for each firing action, set to zero for unlimited ammo | `value` |
| `<weapon>delayattack[1\|2]` | the time it takes after each firing action for the weapon to be ready again | `milliseconds` |
| `<weapon>speed[1\|2]` | the speed of a projectile from each firing action | `value` |
| `<weapon>cooktime[1\|2]` | when more than zero, determines that the weapon can be 'cooked' this long before firing | `value` |
| `<weapon>time[1\|2]` | the maximum lifetime of a projectile for each firing action | `milliseconds` |
| `<weapon>escapedelay[1\|2]` | when more than zero, projectiles from this weapon will not be able to hurt its owner for this long | `milliseconds` |
| `<weapon>rays[1\|2]` | the amount of projectiles spawned from one shot of each firing action | `value` |
| `<weapon>spread[1\|2]` | determines the amount a projectile from each firing action skews off-center | `value` |
| `<weapon>spreadz[1\|2]` | when zero, keeps spread projectiles aligned horizontally, else divide the z axis this much | `value` |
| `<weapon>znudge[1\|2]` | determines the multiplier of targeted distance to nudge the z-axis up by | `value` |
| `<weapon>aiskew[1\|2]` | determines 'added stupidity' for each weapon for AI counterparts | `value` |
| `<weapon>aidist[1\|2]` | determines the 'maximum distance' a weapon should be shot at, used by AI to determine weapon effectiveness ranges | `distance` |
| `<weapon>fragweap[1\|2]` | when projectiles from this firing action are destroyed, create projectiles from this kind of weapon (+12 = alt fire for the weapon); disable flak by setting to -1 | `value` |
| `<weapon>fragrays[1\|2]` | when creating flak, create this many projectiles for it | `value` |
| `<weapon>fragtime[1\|2]` | flak projectiles from this weapon last this long | `milliseconds` |
| `<weapon>fragspeed[1\|2]` | flak projectiles from this weapon start with this much speed (may be influenced by fragspread/fragskew and fragrel) | `value` |
| `<weapon>fullauto[1\|2]` | determines if each firing action is fully automatic (click-and-hold) or not (click-and-click) | `bool` |
| `<weapon>relativity[1\|2]` | multiplier of player velocity added to a projectile of each firing action | `value` |
| `<weapon>kickpush[1\|2]` | determines the amount of pushback from shooting each firing action | `value` |
| `<weapon>fragscale[1\|2]` | flak created by this firing action is scaled by this much | `value` |
| `<weapon>fragspread[1\|2]` | flak created by this firing action spreads its direction randomly by this much if it doesn't impact a player | `value` |
| `<weapon>fragrel[1\|2]` | flak created by this firing action retains this much of its parent relative momentum | `value` |
| `<weapon>fragoffset[1\|2]` | flak created by this firing action is offset by this distance if it impacts a player before being created | `value` |
| `<weapon>fragskew[1\|2]` | flak created by this firing action spreads its direction randomly by this much when it impacts a player | `value` |
| `<weapon>cooked[1\|2]` | determines cooking style for a projectile | `[more damage] [less damage] [longer lifetime] [shorter lifetime] [faster speed] [slower speed] [extra rays] [zoom view] [keep zoom view]` |
| `<weapon>desc[1\|2]` | description of each firing action | `string` |
| `<weapon>timedelay[1\|2]` | delay before a projectile from each firing action is launched | `milliseconds` |
| `<weapon>timeiter[1\|2]` | extra delay added for each successive ray of a multi-ray firing action | `milliseconds` |
| `<weapon>speedlimit[1\|2]` | when cooking scales speed, the speed a projectile from each firing action starts from before scaling | `value` |
| `<weapon>spreadmin[1\|2]` | minimum spread for each firing action after movement modifiers are applied | `value` |
| `<weapon>spreadmax[1\|2]` | maximum spread for each firing action after movement modifiers are applied, 0 = no limit | `value` |
| `<weapon>spreadstill[1\|2]` | spread added for each firing action while not moving | `value` |
| `<weapon>spreadmoving[1\|2]` | spread added for each firing action while moving | `value` |
| `<weapon>spreadrunning[1\|2]` | spread added for each firing action while running | `value` |
| `<weapon>spreadsprinting[1\|2]` | spread added for each firing action while sprinting | `value` |
| `<weapon>spreadcrouch[1\|2]` | spread added for each firing action while crouching | `value` |
| `<weapon>spreadzoom[1\|2]` | spread added for each firing action while zoomed in | `value` |
| `<weapon>spreadinair[1\|2]` | spread added for each firing action while midair, on top of the other spread modifiers | `value` |
| `<weapon>aileaddist[1\|2]` | distance at which AI fully leads its aim by the target's velocity, closer targets are led proportionally less | `distance` |
| `<weapon>aileadvel[1\|2]` | multiplier of the target's velocity that AI adds to its aim to lead a target | `value` |
| `<weapon>fragcond[1\|2]` | determines when flak uses fragoffset and fragskew rather than fragspread (bitwise OR) | `[always] [hit a player] [stuck to a player] [stuck to anything]` |
| `<weapon>fragtimedelay[1\|2]` | delay before the first flak projectile from this firing action is launched | `milliseconds` |
| `<weapon>fragtimeiter[1\|2]` | extra delay added for each successive flak projectile from this firing action | `milliseconds` |
| `<weapon>fragspeedmin[1\|2]` | minimum speed of flak created by this firing action, used when fragspeed is zero | `value` |
| `<weapon>fragspeedmax[1\|2]` | maximum speed of flak created by this firing action, used when fragspeed is zero, 0 = no limit | `value` |
| `<weapon>fragjump[1\|2]` | fraction of fragtime to skip, shortening the lifetime of flak created by this firing action | `value` |
| `<weapon>colourcook[1\|2]` | colour the weapon blends towards while cooking or zooming, 0 = off | `colour` |
| `<weapon>colourproj[1\|2]` | colour the projectile model blends towards as it ages, 0 = off | `colour` |
| `<weapon>fxtypepower[1\|2]` | effect type shown on the weapon while cooking each firing action | `value` |
| `<weapon>fxchain[1\|2]` | links successive projectiles from continuous fire into a chain for effects | `boolean` |
| `<weapon>soundskew[1\|2]` | when cooked, scale the firing sound volume by the cook amount | `boolean` |
| `<weapon>modbuoyancyattack[1\|2]` | determines change in player buoyancy while firing the weapon; stacks with other modbuoyancy vars | `value` |

## Attack modifiers

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>modimpulsespeedattack[1\|2]` | determines change in impulse speed while firing the weapon; stacks with other modimpulsespeed vars | `value` |
| `<weapon>modspeedattack[1\|2]` | determines change in run speed while firing the weapon; stacks with other modspeed vars | `value` |
| `<weapon>modweightattack[1\|2]` | determines change in player weight wihle firing the weapon; stacks with other modweight vars | `value` |

## Recoil

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>recoilpitchcrouch[1\|2]` | determines weapon's crosshair rise scale factor while crouching | `value` |
| `<weapon>recoilpitchinair[1\|2]` | determines weapon's crosshair rise scale factor while midair | `value` |
| `<weapon>recoilpitchmax[1\|2]` | determines weapon's maximum crosshair rise rate | `value` |
| `<weapon>recoilpitchmin[1\|2]` | determines weapon's minimum crosshair rise rate | `value` |
| `<weapon>recoilpitchmoving[1\|2]` | determines weapon's crosshair rise scale factor while moving | `value` |
| `<weapon>recoilpitchdir[1\|2]` | determines weapon's crosshair chance of rising versus falling (0 = always up, >0 = favour rising, &lt;0 = favour falling) | `value` |
| `<weapon>recoilpitchrunning[1\|2]` | determines weapon's crosshair rise scale factor while running | `value` |
| `<weapon>recoilpitchsprinting[1\|2]` | determines weapon's crosshair rise scale factor while sprinting | `value` |
| `<weapon>recoilpitchstill[1\|2]` | determines weapon's crosshair rise scale factor while not moving | `value` |
| `<weapon>recoilpitchzoom[1\|2]` | determines weapon's crosshair rise scale factor while zoomed in | `value` |
| `<weapon>recoiltime[1\|2]` | determines weapon's crosshair rise time (>0 = time in ms, &lt;0 = divided attack delay) | `value` |
| `<weapon>recoiltimecrouch[1\|2]` | determines weapon's crosshair rise duration factor while crouching | `value` |
| `<weapon>recoiltimeinair[1\|2]` | determines weapon's crosshair rise duration factor while midair | `value` |
| `<weapon>recoiltimemoving[1\|2]` | determines weapon's crosshair rise duration factor while moving | `value` |
| `<weapon>recoiltimerunning[1\|2]` | determines weapon's crosshair rise duration factor while running | `value` |
| `<weapon>recoiltimesprinting[1\|2]` | determines weapon's crosshair rise duration factor while sprinting | `value` |
| `<weapon>recoiltimestill[1\|2]` | determines weapon's crosshair rise duration factor while not moving | `value` |
| `<weapon>recoiltimezoom[1\|2]` | determines weapon's crosshair rise duration factor while zoomed in | `value` |
| `<weapon>recoilyawcrouch[1\|2]` | determines weapon's crosshair rise duration factor while crouching | `value` |
| `<weapon>recoilyawinair[1\|2]` | determines weapon's crosshair rise duration factor while midair | `value` |
| `<weapon>recoilyawmax[1\|2]` | determines weapon's maximum lateral crosshair wander rate | `value` |
| `<weapon>recoilyawmin[1\|2]` | determines weapon's minimum lateral crosshair wander rate | `value` |
| `<weapon>recoilyawmoving[1\|2]` | determines weapon's lateral crosshair wander rate scale factor while moving | `value` |
| `<weapon>recoilyawrunning[1\|2]` | determines weapon's lateral crosshair wander rate scale factor while running | `value` |
| `<weapon>recoilyawsprinting[1\|2]` | determines weapon's lateral crosshair wander rate scale factor while sprinting | `value` |
| `<weapon>recoilyawstill[1\|2]` | determines weapon's lateral crosshair wander rate scale factor while not moving | `value` |
| `<weapon>recoilyawzoom[1\|2]` | determines weapon's lateral crosshair wander rate scale factor while zoomed in | `value` |

## Projectiles

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>[flak]attractdist[1\|2]` | determines radius in which the attraction effect takes place | `value` |
| `<weapon>[flak]attractminvel[1\|2]` | when the speed of the projectile exceeds this value, it will stop attracting | `value` |
| `<weapon>[flak]attractscaled[1\|2]` | determines the increase in attraction speed when closer to the center of the attract radius | `value` |
| `<weapon>[flak]attractspeed[1\|2]` | determines the percentage of projectile's speed that will be used as the base of the attraction speed | `value` |
| `<weapon>[flak]liquidcoast[1\|2]` | multiplier of velocity for a projectile of each firing action when in liquid | `value` |
| `<weapon>[flak]weight[1\|2]` | relative weight for a projectile of each firing action | `value` |
| `<weapon>[flak]coastscale[1\|2]` | multiplier of the world coast for a projectile of each firing action, 0 disables coasting drag | `value` |
| `<weapon>[flak]radius[1\|2]` | determines the size for a projectile or length of a scan of each firing action | `value` |
| `<weapon>[flak]elasticity[1\|2]` | multiplier of velocity for a projectile of each firing action when doing a bounce event | `value` |
| `<weapon>[flak]buoyancy[1\|2]` | determines whether a projectile will sink or surface when submerged in a liquid, and how quickly if so | `value` |
| `<weapon>[flak]drill[1\|2]` | determines distance to which the projectile may penetrate level geometry | `value` |
| `<weapon>[flak]collide[1\|2]` | determines collision properties for a projectile from each firing action (bitwise OR) | `COLLIDE_TRACE COLLIDE_SCAN COLLIDE_LENGTH COLLIDE_PROJ COLLIDE_OWNER IMPACT_GEOM IMPACT_PLAYER IMPACT_SHOTS BOUNCE_GEOM BOUNCE_PLAYER BOUNCE_SHOTS DRILL_GEOM DRILL_PLAYER DRILL_SHOTS STICK_GEOM STICK_PLAYER` |
| `<weapon>[flak]guideddelay[1\|2]` | when more than zero, projectiles from this weapon will delay guided settings by this long | `milliseconds` |
| `<weapon>[flak]speeddelta[1\|2]` | determines the amount by which each firing action is guided | `value` |
| `<weapon>[flak]taperin[1\|2]` | determines the fraction of the lifetime from the start until the projectile reaches its full size | `value` |
| `<weapon>[flak]taperout[1\|2]` | determines the fraction of the lifetime from the end where the projectile size "fades out" | `value` |
| `<weapon>[flak]blend[1\|2]` | determines the opacity of the projectile & particle effects of the weapon (0=transparent, 1=opaque) | `value` |
| `<weapon>[flak]speedmin[1\|2]` | minimum speed of a projectile from each firing action after bouncing | `value` |
| `<weapon>[flak]speedmax[1\|2]` | maximum speed of a projectile from each firing action after bouncing, 0 = no limit | `value` |
| `<weapon>[flak]guidedspeed[1\|2]` | multiplier of a guided projectile's speed once guidance starts | `value` |
| `<weapon>[flak]interacts[1\|2]` | determines which map entities a projectile from each firing action interacts with (bitwise OR) | `teleports pushers` |
| `<weapon>[flak]timestick[1\|2]` | when more than zero, a projectile from each firing action has its lifetime reset to this when it sticks | `milliseconds` |
| `<weapon>[flak]taper[1\|2]` | determines how a projectile changes size;<br>0 = off, 1 = by lifetime fraction, 3 = by lifetime in milliseconds, 5 = by distance travelled,<br>+1 = keep tapering out once stuck | `value` |
| `<weapon>[flak]tapermin[1\|2]` | minimum size multiplier of a tapering projectile, also the minimum damage multiplier of tapered damage | `value` |
| `<weapon>[flak]tapermax[1\|2]` | maximum size multiplier of a tapering projectile, also the maximum damage multiplier of tapered damage | `value` |
| `<weapon>[flak]length[1\|2]` | maximum length of the trail drawn behind a projectile from each firing action | `value` |
| `<weapon>[flak]fade[1\|2]` | determines whose projectiles fade out near the camera (bitwise OR) | `own others` |
| `<weapon>[flak]fadeat[1\|2]` | distance from the camera at which a fading projectile is fully visible | `distance` |
| `<weapon>[flak]fadecut[1\|2]` | distance from the camera within which a fading projectile is invisible | `distance` |
| `<weapon>[flak]fadein[1\|2]` | time a projectile from each firing action takes to fade in after launch | `milliseconds` |
| `<weapon>[flak]fadeout[1\|2]` | time before the end of its lifetime that a projectile from each firing action starts fading out | `milliseconds` |
| `<weapon>[flak]vistime[1\|2]` | time a stuck projectile takes to fade to its visfade level | `milliseconds` |
| `<weapon>[flak]visfade[1\|2]` | amount a stuck projectile fades out over vistime (0 = stays visible, 1 = invisible) | `value` |
| `<weapon>[flak]fxtype[1\|2]` | effect type for the muzzle when firing each firing action | `value` |
| `<weapon>[flak]fxtypeproj[1\|2]` | effect type for a projectile from each firing action | `value` |
| `<weapon>[flak]fxcol[1\|2]` | colour of the effects of each firing action | `colour` |
| `<weapon>[flak]fxscale[1\|2]` | size multiplier of the effects of each firing action | `value` |
| `<weapon>[flak]fxblend[1\|2]` | opacity multiplier of the effects of each firing action | `value` |
| `<weapon>[flak]lightcol[1\|2]` | colour of the light emitted by the weapon while lightpersist has the material colour flag | `colour` |
| `<weapon>[flak]explcol[1\|2]` | colour of the explosion of a projectile from this weapon (currently unused) | `colour` |
| `<weapon>[flak]headmin[1\|2]` | maximum distance from an explosion to the head for a radial hit to count as a head shot, beyond this it is a whiplash hit | `distance` |
| `<weapon>[flak]damagewhiplash[1\|2]` | determines the multiplier of damage for whiplash hits (radial hits near the head) | `value` |
| `<weapon>[flak]damagecollect[1\|2]` | multiplier of damage dealt by each firing action that is returned to the attacker as health | `value` |
| `<weapon>[flak]damagepenalty[1\|2]` | when non-zero, killing a teammate with each firing action incurs the team kill penalty | `boolean` |
| `<weapon>[flak]hitvel[1\|2]` | determines the amount of velocity added in the direction of travel when getting hit by this shot | `value` |
| `<weapon>[flak]stun[1\|2]` | determines the stun effects of getting hit by each firing action (bitwise OR) | `[slow over time] [lower gravity over time] [slow immediately] [lower gravity immediately] [slip]` |
| `<weapon>[flak]stunscale[1\|2]` | determines how much a stun slows movement (0-1) | `value` |
| `<weapon>[flak]stunfall[1\|2]` | determines how much a stun reduces gravity (0-1) | `value` |
| `<weapon>[flak]stuntime[1\|2]` | duration of a stun effect | `milliseconds` |
| `<weapon>[flak]shockstunscale[1\|2]` | determines how much a shock residual stun slows movement (0-1) | `value` |
| `<weapon>[flak]shockstunfall[1\|2]` | determines how much a shock residual stun reduces gravity (0-1) | `value` |
| `<weapon>[flak]shockstuntime[1\|2]` | duration of each shock residual stun | `milliseconds` |
| `<weapon>[flak]destroyburn[1\|2]` | when non-zero, a projectile from each firing action is destroyed on hitting a burning player | `boolean` |
| `<weapon>[flak]destroybleed[1\|2]` | when non-zero, a projectile from each firing action is destroyed on hitting a bleeding player | `boolean` |
| `<weapon>[flak]destroyshock[1\|2]` | when non-zero, a projectile from each firing action is destroyed on hitting a shocked player | `boolean` |
| `<weapon>[flak]destroycorrode[1\|2]` | when non-zero, a projectile from each firing action is destroyed on hitting a corroded player | `boolean` |
| `<weapon>[flak]proxtype[1\|2]` | determines how a stuck projectile is triggered;<br>0 = off, 1 = a player comes within proxdist, 2 = a player crosses a tripwire of proxdist length | `value` |
| `<weapon>[flak]proxdist[1\|2]` | trigger distance of a stuck proximity projectile | `distance` |
| `<weapon>[flak]proxdelay[1\|2]` | time after sticking for the proximity distance to grow to its full size | `milliseconds` |
| `<weapon>[flak]proxtime[1\|2]` | time left before a triggered proximity projectile detonates | `milliseconds` |

## Damage

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>[flak]damage[1\|2]` | the amount of damage a projectile from each firing action does | `value` |
| `<weapon>[flak]damagehead[1\|2]` | determines the multiplier of damage for head shots | `value` |
| `<weapon>[flak]damagetorso[1\|2]` | determines the multiplier of damage for torso shots | `value` |
| `<weapon>[flak]damagelimb[1\|2]` | determines the multiplier of damage for limb shots | `value` |
| `<weapon>[flak]damageself[1\|2]` | determines the multiplier of damage for self-inflicted shots | `value` |
| `<weapon>[flak]damageteam[1\|2]` | determines the multiplier of damage for shots at one's own team | `value` |
| `<weapon>[flak]element[1\|2]` | determines what the shot is made of, which decides how grass reacts to it, 0 = nothing, 1 = fire, 2 = energy, 3 = acid | `value` |
| `<weapon>[flak]elementradius[1\|2]` | determines how far the shot's element reaches on the grass it touches, in power 0 cubes | `value` |
| `<weapon>[flak]radial[1\|2]` | determines the radius of splash damage, in power 0 cubes | `value` |
| `<weapon>[flak]radialdelay[1\|2]` | determines the time between ticks of "continuous" radial damage, starts counting from first "radiation" | `milliseconds` |

## Projectile effects

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>[flak]extinguish[1\|2]` | determines if a projectile from each firing action is extinguished by water | `value` |
| `<weapon>[flak]radial[1\|2]` | determines the explosion radius for a particle of this firing action | `value` |
| `<weapon>[flak]wavepush[1\|2]` | determines the multiplier of explode radius this weapon pushes in | `value` |
| `<weapon>[flak]hitpush[1\|2]` | determines the amount of pushback from getting hit by this shot | `value` |
| `<weapon>[flak]hitpushself[1\|2]` | determines the amount of multiplier of pushback from hitting oneself with this shot | `value` |
| `<weapon>[flak]grab[1\|2]` | determines if the weapon is used for parkour grabs | `[can grab on walls] [can grab players]` |
| `<weapon>[flak]guided[1\|2]` | determines guided style for a projectile, 0 = off, 1 = follow crosshair direction, 2 = home crosshair target (+1 only first target), 4 = home projectile target (+1 only first target), 6 = direct toward first crosshair direction | `value` |

## Residual effects

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>[flak]residual[1\|2]` | determines the residual effects of a projectile from each firing action (bitwise OR) | `burns bleeds shocks corrodes` |
| `<weapon>[flak]residualundo[1\|2]` | determines if a projectile from each firing action will extinguish a residual effect | `burn bleed shock corrode` |
| `<weapon>[flak]bleeddamage[1\|2]` | determines damage caused by bleed residual (if enabled) (note that player health is 1000) | `value` |
| `<weapon>[flak]bleeddelay[1\|2]` | determines time between damage caused by bleed residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]bleedtime[1\|2]` | determines duration of damage caused by bleed residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]burndamage[1\|2]` | determines damage caused by burn residual (if enabled) in (note that player health is out of 1000) | `value` |
| `<weapon>[flak]burndelay[1\|2]` | determines time between damage caused by burn residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]burntime[1\|2]` | determines duration of damage caused by burn residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]shockdamage[1\|2]` | determines damage caused by shock residual (if enabled) in (note that player health is out of 1000) | `value` |
| `<weapon>[flak]shockdelay[1\|2]` | determines time between damage caused by shock residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]shocktime[1\|2]` | determines magnitude of stun effect caused by shock residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]shockstun[1\|2]` | determines magnitude of stun effect caused by shock residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]corrodedamage[1\|2]` | determines damage caused by corrode residual (if enabled) in (note that player health is out of 1000) | `value` |
| `<weapon>[flak]corrodedelay[1\|2]` | determines time between damage caused by corrode residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]corrodetime[1\|2]` | determines magnitude of stun effect caused by corrode residual (if enabled) in milliseconds | `value` |

## Weapon obituaries

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>[flak]obitheadless[1\|2]` | determines death message for kills which decapitate opponent | `string` |
| `<weapon>[flak]obitobliterated[1\|2]` | determines death message for kills which gib (reduce to pieces) opponent | `string` |
| `<weapon>[flak]obitsuicide[1\|2]` | determines death message for kills which are inflicted upon oneself | `string` |
| `<weapon>[flak]obituary[1\|2]` | determines death message for normal kills which do not satisfy conditions for other obituaries | `string` |
