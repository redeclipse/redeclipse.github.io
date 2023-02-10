---
title: Editing: Fx Particle
layout: docs
origfile: editing/Fx-Particle.md
origtitle: Fx-Particle
permalink: /docs/editing/Fx-Particle
redirect_from:
  - /docs/editing/Fx_Particle/
  - /wiki/editing/Fx_Particle/
---
* TOC
{:toc}
# Particle FX

This document describes how to create particle effects.

## Particle types

Following particle types are available:

| Particle type | Value | CubeScript handle    | Description                                  |
|---------------|-------|----------------------|----------------------------------------------|
| Single        | 0     | $FX_PARTTYPE_SINGLE  | Single particle                              |
| Splash        | 1     | $FX_PARTTYPE_SPLASH  | Splash of multiple particles                 |
| Shape         | 2     | $FX_PARTTYPE_SHAPE   | Multiple particles following a shape         |
| Flare         | 3     | $FX_PARTTYPE_FLARE   | Single particle, flare from origin to tip    |
| Trail         | 4     | $FX_PARTTYPE_TRAIL   | Multiple particles, trail from origin to tip |
| Explosion     | 5     | $FX_PARTTYPE_EXPLODE | 3D explosion fireball                        |
| Text          | 6     | $FX_PARTTYPE_TEXT    | Text particle                                |

## Available particles

Following pre-defined particles are available for use:

| Particle                 | Value | Explosion/flare/text |
|--------------------------|-------|----------------------|
| $PART_FIREBALL_LERP      | 10    |                      |
| $PART_PLASMA_LERP        | 11    |                      |
| $PART_FLARE_LERP         | 12    |                      |
| $PART_MUZZLE_FLARE_LERP  | 13    |                      |
| $PART_SMOKE_LERP_SOFT    | 14    |                      |
| $PART_SMOKE_LERP         | 15    |                      |
| $PART_HINT_LERP_SOFT     | 16    |                      |
| $PART_HINT_LERP          | 17    |                      |
| $PART_HINT_BOLD_LERP_SOFT| 18    |                      |
| $PART_HINT_BOLD_LERP     | 19    |                      |
| $PART_HINT_VERT_LERP_SOFT| 20    |                      |
| $PART_VERT_BOLD_LERP     | 21    |                      |
| $PART_HINT_HORZ_LERP_SOFT| 22    |                      |
| $PART_HORZ_BOLD_LERP     | 23    |                      |
| $PART_SMOKE_SOFT         | 24    |                      |
| $PART_SMOKE              | 25    |                      |
| $PART_HINT_SOFT          | 26    |                      |
| $PART_HINT               | 27    |                      |
| $PART_HINT_BOLD_SOFT     | 28    |                      |
| $PART_HINT_BOLD          | 29    |                      |
| $PART_HINT_VERT_SOFT     | 30    |                      |
| $PART_VERT_BOLD          | 31    |                      |
| $PART_HINT_HORZ_SOFT     | 32    |                      |
| $PART_HORZ_BOLD          | 33    |                      |
| $PART_BLOOD              | 34    |                      |
| $PART_EDIT               | 35    |                      |
| $PART_EDIT_ONTOP         | 36    |                      |
| $PART_SPARK              | 37    |                      |
| $PART_FIREBALL_SOFT      | 38    |                      |
| $PART_FIREBALL           | 39    |                      |
| $PART_PLASMA_SOFT        | 40    |                      |
| $PART_PLASMA             | 41    |                      |
| $PART_ELECTRIC_SOFT      | 42    |                      |
| $PART_ELECTRIC           | 43    |                      |
| $PART_ELECZAP_SOFT       | 44    |                      |
| $PART_ELECZAP            | 45    |                      |
| $PART_FLAME              | 46    |                      |
| $PART_FLARE              | 47    | Flare                |
| $PART_MUZZLE_FLARE       | 48    | Flare                |
| $PART_LIGHTNING_FLARE    | 49    | Flare                |
| $PART_LIGHTZAP_FLARE     | 50    | Flare                |
| $PART_MUZZLE_FLASH       | 51    |                      |
| $PART_SNOW               | 52    |                      |
| $PART_TEXT               | 53    | Text                 |
| $PART_TEXT_ONTOP         | 54    | Text                 |
| $PART_EXPLOSION          | 55    | Explosion            |
| $PART_SHOCKWAVE          | 56    | Explosion            |
| $PART_SHOCKBALL          | 57    | Explosion            |
| $PART_GLIMMERY           | 58    | Explosion            |
| $PART_LIGHTNING          | 59    | Flare                |
| $PART_LIGHTZAP           | 60    | Flare                |

# Particle properties

Those properties are only available when the effect type is particle.

| Property name  | Type         | Min                     | Default              | Max                 | Modifiers    | Description                                                |
|----------------|--------------|-------------------------|----------------------|---------------------|--------------|------------------------------------------------------------|
| parttype       | Integer      | 0                       | $FX_PART_TYPE_SINGLE | $FX_PARTTYPE_TEXT   |              | Particle type (see *"Particle types"*)                     |
| part           | Integer      | $PART_FIREBALL_LERP     | $PART_FIREBALL_LERP  | $PART_FIREBALL_LERP |              | Particle (see *"Available particles"*)                     |
| num            | Integer      | 1                       | 1                    | 100                 | Random, Lerp | Number of splash particles generated                       |
| shape          | Integer      | 0                       | 0                    | 58                  |              | Particle shape (for shape type)                            |
| colour         | Colour       | 0                       | 0                    | 255                 | Random, Lerp | Particle colour (unless `colorized` is enabled)            |
| fade           | Integer      | 1                       | 1                    | INT_MAX             | Random, Lerp | Particle fade (lifetime) (ms)                              |
| collide        | Integer      | $FX_PARTCOLLIDE_NOSTAIN | $FX_PARTCOLLIDE_NONE | $STAIN_STAIN        |              | Geometry collision and stain. (see *"Particle collision"*) |
| regdelay       | Integer      | 0                       | 0                    | INT_MAX             | Random, Lerp | Random delay (higher the value the lower emit chance)      |
| shapesize      | Float        | 0                       | 4                    | FLT_MAX             | Random, Lerp | Splash/shape/flare size                                    |
| partsize       | Float        | FLT_MIN                 | 4                    | FLT_MAX             | Random, Lerp | Particle size                                              |
| maxpartsize    | Float        | FLT_MIN                 | 16                   | FLT_MAX             | Random, Lerp | Final particle size (explosion)                            |
| vel            | Float        | 0                       | 50                   | FLT_MAX             | Random, Lerp | Splash/shape particle speed                                |
| gravity        | Float        | -FLT_MAX                | 0                    | FLT_MAX             | Random, Lerp | Particle gravity                                           |
| vel            | Float        | 0                       | 50                   | FLT_MAX             | Random, Lerp | Splash/shape particle speed                                |
| text           | String       | [n/a]                   |                      | [n/a]               |              | Text                                                       |
| parttrack      | Integer      | 0                       | 1                    | 1                   |              | Follow entity position (when not using offsets)            |

**NOTE ON `parttrack`: This property makes particles follow a bound entity's position (when an entity calls an FX emitter, it's considered bound to it). There are two main motivations to use this mechanism:**

 * Making long-fade particles (single/explosion/flare/text) follow the entity's position.
 * Dealing with model tag positions, being always one frame behind (such as when creating muzzle effects for weapons).

# Particle collision

With the use of the `collide` property one can define how a particle should behave upon collision with map geometry.
By default it passes right through (value: `$FX_PARTCOLLIDE_NONE`).
By setting `collide` to a stain index value (for instance `$STAIN_SMOKE`) (see *"Available stains"* in *Fx-Other.md*)
the particle will collide with geometry and leave the set stain.
Alternatively, one can set the value to `$FX_PARTCOLLIDE_NOSTAIN` in order to simply
enable geometry collision without making the particle leave any stains.

When collision is enabled and a particle hits geometry, the particle simply vanishes.
