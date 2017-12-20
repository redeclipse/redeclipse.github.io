---
title: Weapons Guide
origtitle: Weapons-Guide
layout: docs
---
* TOC
{:toc}
In most games all players are equipped with a pistol and two of their favorite loadout weapons. Furthermore, explosive weapons can be collected in the arena, such as grenades, mines and rockets, unless these are disabled via the [basic mutator](Mutators).

## Loadout weapons

These weapons can be chosen in the *profile* game menu, and it is even possible to change the weapon selection mid-match by pressing the *comma* key (per default). Note that one or both of the loadout weapon slots can be randomized. All of loadout weapons come with an unlimited supply of ammo, but must be reloaded when the clip is empty. Each weapon has two unique fire modes.

### Weapon combos

#### Shotgun and Rifle

This traditional choice of loadout weapons is very popular, especially in [deathmatch](Deathmatch), [capture-the-flag](Capture-the-Flag), [defend-and-control](Defend-and-Control), and [bomber-ball](Bomber-ball) games. A player with these tools of destruction prioritizes the ability to inflict heavy damage—any time, anywhere, and over any distance.

#### Flamer and Zapper

This pair of weapons optimizes a players ability to outrun and annoy his enemies and to support his team mates. It serves well for hit-and-run tactics, not only in [capture-the-flag](Capture-the-Flag) games. It is also very effective at getting enemies to waste time telling you in chat how "nooby" your weapon loadout is and attempt to convince you that other (read: shotgun/rifle) loadouts are what you "should" be using.

#### Plasma and Zapper

This pair of weapons optimizes the chances of being kicked by people who don't find getting shredded by "noob" weapons funny. The best way to exploit this is by teamkilling with plasma2 and accidentally using zapper2 on teammates.

This combo can really be very effective since the vast majority of duelists are used to facing the rifle/sword or rifle/shotgun combo.

## Explosives

Explosive weapons can be collected from certain spots of the arena. Unlike other weapons, they cannot be reloaded.

Exception: In [kaboom](Mutators#kaboom) games, players start with grenades and mines that reload over time.

## Spawn weapons

Spawn weapons are available to all players in addition to the chosen loadout weapons. This includes a pistol and the option to use parkour moves as melee attacks.

## Weapon Mechanics

### Status effects

Some weapons induce status ailments that inflict some damage over time and last for about five seconds. Useful to delay enemy health recovery. Multiple effects can be stacked.

#### Shock

Slows down movement greatly. Deals 2 damage per second. Caused by the zapper and by mines.

#### Burn

Deals 3 damage per second. Can be negated with the secondary fire of the flamer or by entering water (as long as you are at least half submerged). Caused by grenades, rockets and the flamer.

#### Bleed

Deals 3 damage per second. Caused by the secondary fire of the shotgun and by the sword.

### Anatomy

The player model is split into 3 parts which determine how much damage is applied to them: head, torso and legs. All damage values determined by the weapon specific variables apply to the head. The torso and legs then take a variable percentage of that damage value, sometimes higher (like the flamer's secondary fire) but usually smaller than the head damage.

### Weapon variables

When playing offline or as a server [operator](Privileges), almost all aspects of game rules can be tuned and modified using the [console](Console) to control thousands of [variables](Variables). This includes a large [array of variables](Variables-and-Commands) for each weapon that give you deep control of the weapon characteristics.

### Weapon IDs

Weapon numbers or IDs are used for certain variables, for instance when defining the weapon for the instagib game mutator or when referring to some particle presets. The following table gives a compact overview of the available weapons slots and their IDs. For some variables, such as fragweap, an additional ID refers to the secondary fire mode.

### Frag and flak vars

Variables related to flak or fragmentation give a plethora of options for creating weapon mods. However, the use of these variables can be rather confusing.

* In essence, when the projectile of a weapon is destroyed (impact or expired lifetime), new flak projectiles can be created (fragmentation).
* The corresponding *fragweap* variable defines which type of projectiles are created according to a [weapon ID](#weapon-ids) (none for -1).
* Further *frag* variables define the number and dynamics of these projectiles.
* A large array of *flak* variables has defaults inherited from their base weapon variables.
* These *flak* variables define many properties of flak projectiles. The variable names refer to the type of flak created (the ID used for *fragweap*), not the type of parent projectile.
