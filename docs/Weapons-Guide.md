---
title: Weapons Guide
layout: docs
origfile: Weapons-Guide.md
origtitle: Weapons-Guide
permalink: /docs/Weapons-Guide
redirect_from:
  - /docs/Weapons_Guide/
  - /wiki/Weapons_Guide/
---
* TOC
{:toc}

In most games all players are equipped with a pistol and two of their favorite loadout weapons. Furthermore, explosive weapons can be collected in the arena, such as grenades and mines, to bolster their offensive abilities.

### Spawn Weapons

| Icon | Weapon | Description |
|-|-|-|
| <img src="images/weapons/pistol.png" width="128px"/> | **Pistol** | The pistol's primary fire deals a moderate amount of damage at a fairly fast rate of fire over a respectable distance. Because it has no bullet drop nor spread, it is a useful tool for picking off weak enemies when loadout weapons are low on ammunition or to stall regeneration speed. |

### Loadout weapons

These weapons can be chosen in the *profile* game menu, and it is possible to change the weapon selection mid-match by pressing the *comma* key (per default). Note that one or both of the loadout weapon slots can be randomized.

| Icon | Weapon | Description |
|-|-|-|
| <img src="images/weapons/sword.png" width="128px"/> | **Sword** | The *energy sword* deals a decent amount of damage with its primary attack and is capable of one shot kills for those capable of timing and aiming its bleed-inducing secondary attack. The generous hitbox afforded to the primary of the sword makes it a much more tenable melee option than other options. |
| <img src="images/weapons/shotgun.png" width="128px"/> | **Shotgun** | The *super shotgun* shoots 25 pellets in a fairly wide spread to a fairly short effective range. For longer range damage, the secondary fire is capable of lobbing bleed-inducing shrapnel much farther. While the primary is as deadly as anything at close range, the shotgun has to reload in pairs of bullets at a time, making its user vulnerable to attack if time is not afforded to allow the user to reload. |
| <img src="images/weapons/smg.png" width="128px"/> | **Submachine Gun** | While hard to control, the *submachine gun* deals very heavy damage at short to medium range. At medium and longer ranges, the SMG can still do damage in bursts, but it is very difficult to maintain accuracy at long ranges at full auto. The SMG has an airbust secondary fire that hurls shrapnel in a moderate radius at a medium distance. While a very useful medium range weapon, the submachine gun is prone to emptying its ammunition quickly if the user is careless, and this can be exploited by attentive opponents. |
| <img src="images/weapons/flamer.png" width="128px"/> | **Flamer** | Another ammunition-limited weapon, the *flamethrower* can deal immense damage very quickly via its stream of fire which lances out in front of it. The flamethrower is not a weapon for the careless though; the operator can quickly find themselves in the midst of their own weapon's flames if they are not prudent about avoiding them. The flamer also has a secondary attack, capable of launching the player and their opponents into the air; this is especially useful as a sword deterrent. |
| <img src="images/weapons/plasma.png" width="128px"/> | **Plasma** | The *plasma inductor* has a medium range primary fire with a large hit radius but a slow projectile speed. While it requires good shot-leading skills, its large hit radius means it is capable of consistent, if unexceptional, damage rates. The secondary fire requires charging, but releases a large mass of plasma which clogs corridors and is useful to get a pursuing enemy off one's tail. |
| <img src="images/weapons/zapper.png" width="128px"/> | **Zapper** | A fairly standard automatic medium-to-long range weapon, the zapper can deal its damage over any range and at a reasonable pace, but is easily overwhelmed at short range by more specialized weapons. The weapon can be zoomed for better accuracy at long range with its secondary fire. |
| <img src="images/weapons/rifle.png" width="128px"/> | **Rifle** | The longest ranged, highest damaging weapon in the game, the fully charged rifle secondary can kill an opponent in a single headshot at any range, thanks to its scope. However, it is heavy, has limited ammunition, and a rather weak primary fire that cannot hold its own at short range very well. |

### Explosives

Explosive weapons can be collected from certain spots of the arena. Unlike other weapons, they cannot be reloaded.

Exception: In [kaboom](Mutators#kaboom) games, players start with grenades and mines that reload over time.

| Icon | Weapon | Description |
|-|-|-|
| <img src="images/weapons/grenade.png" width="128px"/> | **Grenade** | Grenades can be used as either fragmentation (grenade primary) or sticky (grenade secondary) weapons. The primary fragmentation mode deals deadly damage over a large radius after 2.5 seconds (though the grenade can be held in hand by holding down LMB to adjust its detonation time); the secondary sticky mode deals less damage over a smaller radius, but sticks to whatever it touches, including players. |
| <img src="images/weapons/mine.png" width="128px"/> | **Mine** | The mine, like the grenade, can be used in two modes: explosive (mine primary) or beam (mine secondary). Neither can be destroyed during its 45 second lifetime, and as a result mines are useful tactical devices capable of changing the flow of the game. As such, mines are rare weapons, only spawning every minute on the few areas on maps upon which they appear. The primary explosive mode detonates and inflicts a slowing shock effect upon those unfortunate enough to end up in their midst, while the secondary instantly kills those who traverse its trigger beam, even if he or she is far away from the mine.
| <img src="images/weapons/rocket.png" width="128px"/> | **Rocket Launcher** | No official map have this weapon(or you can't use it)in version 2.0.0 but it still can be found in map editor and some unofficial maps. This is the most powerful weapon in the game, as a direct hit can instantly kill mutiple players. It has two firing modes: The primary mode like a normal rocket launcher, which fires a straight rocket to the target, the secondly mode fires a guided rocket, it will fly to the target which your crossair aim at.

### Weapon Mechanics



### Weapon Mechanics

#### Status effects

Some weapons induce status ailments that inflict some damage over time and last for about five seconds. Useful to delay enemy health recovery. Multiple effects can be stacked. See the ~~[main article](Status-effects)~~ for more.

#### Anatomy

The player model is split into 3 parts which determine how much damage is applied to them: head, torso and legs. All damage values determined by the weapon specific variables apply to the head. The torso and legs then take a variable percentage of that damage value, sometimes higher (like the flamer's secondary fire) but usually smaller than the head damage.

#### Weapon variables

When playing offline or as a server [operator](Privileges), almost all aspects of game rules can be tuned and modified using the ~~[console](Console)~~ to control thousands of ~~[variables](Variables)~~. This includes a large ~~[array of variables](Variables-and-Commands)~~ for each weapon that give you deep control of the weapon characteristics.

#### Weapon IDs

Weapon numbers or IDs are used for certain variables, for instance when defining the weapon for the instagib game mutator or when referring to some particle presets. The following table gives a compact overview of the available weapons slots and their IDs. For some variables, such as fragweap, an additional ID refers to the secondary fire mode.

#### Frag and flak vars

Variables related to flak or fragmentation give a plethora of options for creating weapon mods. However, the use of these variables can be rather confusing.

- In essence, when the projectile of a weapon is destroyed (impact or expired lifetime), new flak projectiles can be created (fragmentation).
- The corresponding *fragweap* variable defines which type of projectiles are created according to a [weapon ID](#weapon-ids) (none for -1).
- Further *frag* variables define the number and dynamics of these projectiles.
- A large array of *flak* variables has defaults inherited from their base weapon variables.
- These *flak* variables define many properties of flak projectiles. The variable names refer to the type of flak created (the ID used for *fragweap*), not the type of parent projectile.
