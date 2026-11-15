---
title: Editing - Entities
layout: docs
origfile: editing/Entities.md
origtitle: Entities
permalink: /docs/editing/Entities
redirect_from:
  - /wiki/editing/Entities/
---
* TOC
{:toc}
## Placing and Editing Entities

You can place, select, and configure entities either through the editor UI or via console commands while in edit mode (`F2`):

- **Entities panel & quick placement:** Press `F6` to open the Entities panel, `Ctrl+E` for the quick Entity placer, `Ctrl+N` to add an entity at your grid selection, or `Ctrl+Shift+N` to add one at the camera position. Press `Ctrl+F` to search entities.
- **Console command:** Open the console (`~` or `/`) and run `/newent <type> [attributes...]`, for example `/newent light 300 180 180 180`.
- **Selecting & moving:** Left-click an entity to select it (`N` selects entities inside the current grid selection, `End` deselects, `Delete` removes selected entities). Drag along one of its axis arrows to move it; `Shift+C` cycles entity snapping (`/entselsnapmode` or `/entselsnap`).
- **Editing attributes:** Use the `F6` Entities panel, press `.` (`/entset`) to enter attribute values directly, or hold `1`–`9` (and `0` for attribute 10) while scrolling the mouse wheel to adjust attributes 1–10.

## Actor

`/newent actor`

Actor entities are used to spawn additional enemies in the *onslaught* mutator. If no actor entities are present within a map, they will default to use the `playerstart` entities instead.

An actor entity, can allow you to select specific weapons / personality of the actor that spawns in this location.

## Affinity

`/newent affinity`

Affinities are entities that set the positional location of flags, capture points, bomber-balls, etc.
These are usually placed with `modes` and `muts` set to the corresponding bitwise value for specific game modes / mutators.

## Camera

`/newent camera`

These entities are used when spectating with SpecTV. They can be linked to [rails](#rail) to allow them to move around.

## Checkpoint

`/newent checkpoint`

The `checkpoint` entity is used to track progress in the [Speedrun](../gameplay/Speedrun) game mode. When a player dies during Speedrun, they respawn at the last checkpoint.

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
| 1  | radius   | The maximum radius of light emitted by the entity
| 2  | red      | The red channel (0-255)
| 3  | green    | The green channel (0-255)
| 4  | blue     | The blue channel (0-255)
| 5  | flare    | Lens flare
| 6  | fscale   | The scale of the lens flare
| 7  | flags    | Additional bitwise flags (`1` no-shadow, `2` no-dynamic-shadow, `4` volumetric, `8` no-specular, etc.)
| 8  | palette  | The type of colour palette (`0` pulse, `1` team, `2` weapon, `3` worldcol)
| 9  | palindex | The index of the chosen colour palette
| 10 | modes    | Bitmask of game modes where the light appears
| 11 | muts     | Bitmask of mutators where the light appears
| 12 | variant  | Determines if the entity appears in both map variants (`0`), normal (`1`), or alternate (`2`)
| 13 | fxlevel  | Determines if the entity is rendered based on the user's [map effects](Fxlevels) setting

## Lightfx

`/newent lightfx`

An entity that can linked to `light` entities, to apply additional effects such as a spotlight. When linked to a light entity, the light entity takes on the additional properties of the `lightfx`. See [Linking Entities](#linking-entities) for more information.

## Mapmodel

`/newent mapmodel`

A map model, i.e. a polygon mesh rendered as md3/md5/obj/iqm which you collide against, cast shadows etc. Mapmodels are useful for interactive objects that may require an animation, or for placing detail within a map for things that cannot be made within the octree. See [Information for v2](../Information-for-v2#variants) for palette details.

## Map UI

`/newent mapui`

Renders an in-world UI surface on the map (or proximity/visor display when triggered), with orientation, radius, scale, flags, blend, and mode/mutator/variant filters.

## Particles

`/newent particles`

Particles allow you to add fire, rain, lasers, snow, etc.

## Physics

`/newent physics`

Defines a 3D physics zone controlling movement speed (`0`), gravity (`1`), or coasting (`2`) within its box volume (`width`, `length`, `height`, `falloff`), with optional mode, mutator, and map-variant filtering.

## Playerstart

`/newent playerstart`

Players spawn from these entities.

## Pusher

`/newent pusher`

A pusher entity gives you a push in the direction specified. These can be used for creating jumppads or boosters. The `type` attribute controls how velocity is applied:

- `0` (conditional): applies force only if velocity along each active axis is below the force threshold.
- `1` (additional): adds the force directly to current velocity.
- `2` (redirectional): redirects current velocity into the pusher direction and applies the force.
- `3` (absolute): replaces current velocity with the pusher direction and force.

## Rail

`/newent rail`

Entities can be linked to a rail, enabling them to move around the map along connected nodes. These are used for moving SpecTV cameras, mapmodels, lights, particles, sounds, triggers, and other dynamic objects.

## Route

`/newent route`

The `route` entities are used to add possible paths that the player can follow to complete a lap in [Speedrun](../gameplay/Speedrun) mode.

These are easier to place by using `/droproute 1` similar as to how [waypoints](Waypoints) are placed.

## Sound

`/newent sound`

Will play a map-specific sound so long as the player is within the radius. By default (size 0), the sound is a point source. Its volume is maximal at the entity's location, and tapers off to 0 at the radius. Radius is always defined as distance from the entity's location. Sound entities can also be linked to other entities, such as mapmodels (allowing you to play a sound when a door is opened).

Looping map sounds play from the match clock, so every player hears the same part of them at the same time.

A map sound fades with distance from full volume at its reference distance, by its attenuation, and is silent from where that falloff reaches the player's `soundmapfloor` (2% of full volume by default): about 800 units away with the default reference distance of 16 and attenuation of 100%, and about 400 at 200%. The **No attenuation** and **No distance** flags turn the falloff off, so those sounds are heard everywhere.

### Songs and other long sounds

A map sound is normally loaded whole into memory when the map loads, which is wasteful for a long file such as a song (about 32 MB for three minutes of stereo). Mark its slot as streamed and the file is read a little at a time as it plays instead. Set it with the **Streamed** button beside the slot in the Environment panel's Sound tab, or with the last argument of `mapsound` in the map's config:

`mapsound "mymap/jukebox" 1 1 1 -1 -1 1 1`

A streamed sound is a map sound in every other way: it is placed, attenuated, occluded and given environment effects like any other, follows the player's effects volume, and plays whether or not they have music turned on. Only a few streamed sounds play at once (the player's `soundmaxstreams`, 4 by default), the loudest first, and the rest are silent until one of them drops out, so don't count on more than that being heard from one place.

### Making the music yield

Tick **Music yields** in a sound entity's flags and the map's music grows quieter the louder that sound is heard, down to silence at the sound's full volume (within its reference distance), and returns as the sound fades with distance, behind walls or in another sound environment. The music is back to full where the sound has faded to silence, or by the entity's distance clamp if it has one. This works on any sound entity, streamed or not, and is what lets a song playing from a place in the map take over from the map's music as the player walks up to it. Players can turn the effect down or off with `musicyield`.

## Sound Env

`/newent soundenv`

Defines a box-shaped acoustic/reverb zone (`type` environment preset index from Environment Settings, `width`, `length`, `height`, and fade parameters) that applies OpenAL EAX reverb effects to sounds heard inside the zone.

## Teleport

`/newent teleport`

A teleport entity does exactly what you'd expect. Linking two of these together will act as arrival/destination for a teleport mechanism.

## Trigger

`/newent trigger`

A trigger is used to create events. For example; A proximity trigger will allow you to open a door automatically when a player enters the radius of the trigger entity. Triggers are mostly useful when linked to other entities.

## Weapon

`/newent weapon`

The `weapon` entity is used to place [weapon](../gameplay/Weapons-Guide) spawns within a map.

## Wind

`/newent wind`

A wind entity allows a [mapmodel](#mapmodel) with wind vertex painting (and optional linked sound entities) to sway dynamically with simulated wind.

## World Colour

`/newent worldcol`

Modifies or blends active world, palette, and material colour slots (`type` blend operation, `flags`, `value` strength, `select` bitmask, `modes`, `muts`, `variant`), useful for dynamic lighting/colour transitions or per-variant styling.

## Linking Entities

Some entities can be linked together to drive dynamic behaviour:

- Press `L` (`ta_ent_chain_link`) to chain-link selected entities or `Shift+L` (`ta_ent_star_link`) to star-link them from the active entity. Use the `F6` Entities panel to unlink or inspect links.
- Sounds, particles, and `lightfx` can link to triggers, pushers, teleports, affinities, playerstarts, checkpoints, and rails (sounds can also link to `wind`).
- Triggers can control linked mapmodels (visibility, collision, door animations) or other triggers; `lightfx` link to `light` entities; `worldcol` can link to `light` entities; `rail` nodes link to each other and to moving entities (`camera`, `mapmodel`, `light`, `particles`, `sound`, etc.); `teleport` pairs link together for one-way or two-way travel.
- Each combination supports link modes that determine direction and behaviour.
