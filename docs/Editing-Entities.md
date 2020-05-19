---
title: Editing Entities
layout: docs
origfile: Editing-Entities.md
origtitle: Editing-Entities
permalink: /docs/Editing-Entities
redirect_from:
  - /docs/Editing_Entities/
  - /wiki/Editing_Entities/
---
* TOC
{:toc}
## Actor

`/newent actor`

Actor entities are used to spawn additional enemies in the *onslaught* mutator. If no actor entities are present within a map, they will default to use the `playerstart` entities instead.

An actor entity, can allow you to select specific weapons / personality of the actor that spawns in this location.

## Affinity

`/newent affinity`

Affinities are entities that set the positional location of flags, capture points, bomberball spawns, etc.
These are usually placed with *modebit* and *mutsbit* set to the corresponding bitwise value for specific game modes / mutators.

## Camera

`/newent camera`

These entities are used when spectating with spectv. These can be ~~[linked](Editing-Linking)~~ to [rails](#rails) to allow them to move around.

## Checkpoint

`/newent checkpoint`

The `checkpoint` entity is used to track progress in the ~~[Race](Race)~~ game mode. When a player dies during Race, they will respawn at the last checkpoint.

## Decal

`/newent decal`

The `decal` entity is used to project a texture onto cube geometry. This allows you to add extra detail, such as stains, logos, graffiti or even animations such as raindrops.

## Envmap

`/newent envmap`

Creates an environment map reflecting the geometry around the entity.  The optional radius overrides the maximum distance within which glass or geometry using the  "bumpenv*" shaders will reflect from this environment map. If none is specified, the default is taken from the variable `envmapradius` (which defaults to 128 units), which may also be set in map cfgs. Environment maps are generated on a map load, or can be regenerated whilst editing using the `recalc` command. 

## Light

`/newent light`

The `light` entity is used to add point lights. They can be configured with the following attributes;

| #  | Name     | Description         |
|----|----------|---------------------|
| 1  | radius   | The maximum radius of light emmited by the entity
| 2  | red      | The red channel (0-255)
| 3  | green    | The green channel (0-255)
| 4  | blue     | The blue channel (0-255)
| 5  | flare    | Lens flare
| 6  | fscale   | The scale of the lens flare
| 7  | flags    | Additional bitwise flags for *no-shadow, static, no-specular, volumetric* effects.
| 8  | palette  | The type of colour palette to use
| 9  | palindex | The index of the chosen colour palette
| 10 | variant  | Determines if the entity appears in both ~~[map variants](Editing-Variants)~~ or only one
| 11 | fxlevel  | Determines if the entity will be rendered based on the users [map effects](Editing-Fxlevels) setting

## Lightfx

`/newent lightfx`

An entity that can linked to `light` entities, to apply additional effects such as a spotlight. When linked to a light entity, the light entity takes on the additional properties of the `lightfx`. See ~~[links](Editing-Linking)~~ for more information on how to link these together.

## Mapmodel

`/newent mapmodel`

A map model, i.e. a polygon mesh rendered as md3/md5/obj/iqm which you collide against, cast shadows etc. Mapmodels are useful for interactive objects that may require an animation, or for placing detail within a map for things that cannot be made within the octree.

## Particle

`/newent particle`

Particles allow you to add fire, rain, lasers, snow, etc.

## Playerstart

`/newent playerstart`

Players spawn from these entities.

## Pusher

`/newent pusher`

A pusher entity gives you a push in the direction specified. These can be used for creating jumppads, boosters, or even simulating wind that blows the player in a specific direction.

## Rail

`/newent rail`

Rails are a new feature in the development branch. Entities can be ~~[linked](Editing-Linking)~~ to a rail, allowing it to move around the map. These are used to add spectv cameras to a map, or to make mapmodels/lights move around as true dynamic objects.

## Route

`/newent route`

The `route` entities are used to add possible paths that the player can follow to complete a lap in ~~[Race](Race)~~ mode. 

These are easier to place by using `/droproute 1` similar as to how [waypoints](Editing-Waypoints) are placed.

## Sound

`/newent sound`

Will play a map-specific sound so long as the player is within the radius. By default (size 0), the sound is a point source. Its volume is maximal at the entity's location, and tapers off to 0 at the radius. Radius is always defined as distance from the entity's location. Sound entities can also be ~~[linked](Editing-Linking)~~ to other entities, such as mapmodels (allowing you to play a sound when a door is opened).

## Teleport

`/newent teleport`

A teleport entity does exactly what you'd expect. ~~[Linking](Editing-Linking)~~ two of these together will act as arrival/destination for a teleport mechanism.

## Trigger

`/newent trigger`

A trigger is used to create events. For example; A proximity trigger will allow you to open a door automatically when a player enters the radius of the trigger entity. Triggers are mostly useful when ~~[linked](Editing-Linking)~~ to other entities.

## Weapon

`/newent weapon`

The `weapon` entity is used to place [weapon](Weapons-Guide) spawns within a map. 

## Wind

`/newent wind`

A wind entity allows a [mapmodel](#mapmodel) with the correct vertex painting applied, to sway around with a simulated wind effect.
