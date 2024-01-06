---
title: Editing: Fx
layout: docs
origfile: editing/Fx.md
origtitle: Fx
permalink: /docs/editing/Fx
redirect_from:
  - /wiki/editing/Fx/
---
* TOC
{:toc}
# Description of FX System

Red Eclipse comes with an extensible FX system, which allows for scripted audio/visual events, such as particles and sounds.
Its creation has been motivated by removal of hardcoded parts in the game source code,
allowing for further creative customization of various audio/visual aspects of the game.

## Current support and usage

FX system is currently only used to script effects for weapons, projectiles and entities.
It may be expanded for creation of map FX in the future.

# The innerworkings

## FX definitions

An FX definition consists of a unique name (identifier), type and a set of properties.
This information describes exactly the behavior of an effect.
It may also contain references to other effects (by name), as to allow for automatic instantiation of child effects and so on.
Definitions can be overwritten by simple re-definition.
A single definition can only define a single kind of effect: one kind of a particle, one kind of a sound, etc.
If multiple effects are desired to be emitted from the same source (by the same emitter), be it of the same or various other types, they can be chained together by parent-child relationship.

## FX emitters

An FX emitter is a singular entity responsible for emission of effects. It holds a list of FX instances to emit, as well as all unique states and parameters that modulate the behavior of those instances.
There is a pool of pre-allocated emitters in the engine, which are reused as needed. This however means, that there is a limit to how many emitters can be used at once, at a given time (governed by the `maxfxemitters` variable).

## FX instances

An FX instance is responsible for emission of a single effect. Instances are managed by and bound to emitters. An emitter can have a chain of different instances, each instance emitting a unique effect.
There is a pool of pre-allocated instances in the engine, which are reused as needed. This however means, that there is a limit to how many instances can be used at once, at a given time (governed by the `maxfxinstances` variable).

# Defining FX

Effects are defined by using `registerfx` command.

    registerfx [name] [type] [body]

### Parameters

* name - `string` - unique identifier
* type - `number` - effect type, consult the FX type table. It is recommended handles are used instead, for readability.
* body - `code` - block of properties defining the behavior of the effect

### Example

    registerfx FX_P_AIRBLAST_LIFE $FX_TYPE_PARTICLE [
        fxpropi parttype $FX_PARTTYPE_SINGLE
        fxpropi part $PART_HINT_SOFT
        fxpropf partsize 32
        fxpropi colorized 1
        fxpropi fade 1
        fxpropf blend 0.1
    ]

## FX types

The list of supported FX types is as follows:

| FX type  | Value | CubeScript handle | Description     |
|----------|-------|-------------------|-----------------|
| Particle | 0     | $FX_TYPE_PARTICLE | Particle effect |
| Light    | 1     | $FX_TYPE_LIGHT    | Light source    |
| Sound    | 2     | $FX_TYPE_SOUND    | Sound source    |
| Wind     | 3     | $FX_TYPE_WIND     | Wind source     |
| Stain    | 4     | $FX_TYPE_STAIN    | Residual stain  |

## FX property types

FX properties have different types, in order to change/set them one must use appropriate functions:

| Property type  | Function | Arguments                              |
|----------------|----------|----------------------------------------|
| Integer        | fxpropi  | [integer]                              |
| Floating point | fxpropf  | [float]                                |
| Colour         | fxpropc  | [red 0-255] [green 0-255] [blue 0-255] |
| Integer vector | fxpropiv | [integer x] [integer y] [integer z]    |
| Float vector   | fxpropfv | [float x] [float y] [float z]          |
| String         | fxprops  | [string]                               |

**NOTE:** On top of the aforementioned arguments, each function accepts optional modifier type and modifier parameter blocks. Those will be explained later.

## Scheduling and timing effects

Effects can be scheduled in various ways. To change how timing functions on an effect, one must make use of the appropriate properties. All properties listed here (except for `emitmove`) are `integer` type.

* `activelen` - time window in milliseconds in which an instance may be activated. After this period, the instance may no longer emit and will become invalidated.
    Used only when timed with an interval (see `emitinterval`). Default: `1`.
* `emitlen` - time in milliseconds how long a single emission lasts. Default: `1`.
* `emitinterval` - interval in milliseconds at which a periodic emission will occur. Emission will only be attempted in a time window determined by `activelen`.
    When `emittimeliness` is enabled, an emission may be skipped if the time it takes to finish it (`emitlen`) from the current point in time exceeds `activelen`.
    Setting interval to a value of `1` implies a standard, non-periodic emission. Default: `1`.
* `emittimeliness` - when enabled, makes sure a periodic emission will be able to finish its full cycle (`emitlen`) before trying to perform it.
    Generally, should only be used in cases when an emitter life is known. In other cases, emitters' life may be prolonged/refreshed (e.g. for projectiles), negating the need to have `activelen` predetermined, unless desired otherwise. Default: `0`.
* `emitdelay` - postpones the emission by a given time in milliseconds. Default: `0`.
* `emitparent` - when enabled, automatically schedules emission to synchronize with a parent effect. Useful when a parent effect emits periodically (uses `emitinterval`).
    Default: `0`.
* `emitsingle` - when enabled, prevents an effect from being prolonged/refreshed. Default: `0`.
* `emitrestart` - when enabled, resets time-driven parameters (such as interpolation or fade-in) on effect prolong/refresh. Default: `0`.
* `emitmove` - as opposed to rest being `integer` type, this one is `float`, when set above `0`, only allows emission when emitter moves at a given speed. Default: `0`.
* `emitparam` - only allows emission when internal emitter parameter (see *"Internal parameters"*) of a given index (`integer`) becomes larger than 0. Default: `-1`.

### Example 1: single-shot emission for 1 second

    registerfx FX_EXAMPLE1 $FX_TYPE_PARTICLE [
        fxpropi emitlen 1000
    ]

### Example 2: periodic emission switching on and off every 1 second during a period of 10 seconds

    registerfx FX_EXAMPLE2 $FX_TYPE_PARTICLE [
        fxpropi activelen 10000
        fxpropi emitlen 1000
        fxpropi emitinterval 2000
        fxpropi emittimeliness 1
    ]

### Example 3: periodic emission, emitting for 100ms every 1 second during a period of 10 seconds

    registerfx FX_EXAMPLE3 $FX_TYPE_PARTICLE [
        fxpropi activelen 10000
        fxpropi emitlen 100
        fxpropi emitinterval 1000
        fxpropi emittimeliness 1
    ]

Various properties can also have modifiers applied such as interpolation or randomness. Using such modifiers one can alter the scheduling parameters randomly or even interpolate them over time.

### Example 4: randomly occurring emission for 100ms during a period of 10 seconds

    registerfx FX_EXAMPLE4 $FX_TYPE_PARTICLE [
        fxpropi activelen 10000
        fxpropi emitlen 100
        fxpropi emitinterval 2
        fxpropi emitinterval 998 $FX_MOD_RAND
        fxpropi emittimeliness 1
    ]

**NOTE: In the supplied example a minimum interval of `2` is used, to ensure the emission is treated as periodic. Remember, value of `1` implies standard emission!**
Emission will occur randomly from 2 to 1000 milliseconds (the random value is added to the base value).

## Iteration

Effect emissions can also be repeated by iterating an effect. It allows you to create repeated patterns using a single effect instance.

* `iter` - how many times an effect should be emitted. Default: `1`.
* `iteroffset` - position vector offset between each emission. Default: `0, 0, 0`.

You can also modulate various properties by interpolating the values by the iteration. (*see "Property modifiers"*)

### Example: single particle repeated 5 times, increasing in size from 0.5 to 1.0, forming a cone

    registerfx FX_EXAMPLE_ITER $FX_TYPE_PARTICLE [
        fxpropi iter 5
        fxpropfv iteroffset 0 10 0
        fxpropf partsize 0.5
        fxpropf partsize 10.0 $FX_MOD_LERP [
            fxpropi lerpmode $FX_MOD_LERP_ITER
        ]
    ]

## Positioning

By default effects will be emitted from the origin position the attached entity and in its direction.
However, this can be overridden with the following properties:

The starting position of an effect is referred to as *position*, *pos* in short or *from*.
The end position of an effect is referred to as *end* or *to*.

* `reloffset` - enforces all position calculations to be done with regards to the entity's direction. Default: `1`.
* `posoffset` - offsets the starting position by a given vector. Default: `0, 0, 0`.
* `endoffset` - offsets the end position by a given vector. Default: `0, 0, 0`.
* `endfrompos` - sets the end position to be the same as the starting position, offset by a given vector. Disabled when vector is `0, 0, 0`. Default: `0, 0, 0`.
* `posfromend` - sets the starting position to be the same as the end position, offset by a given vector. Disabled when vector is `0, 0, 0`. Default: `0, 0, 0`.
* `posflip` - swaps the starting and end positions. Default: `0`.
* `endfromprev` - sets the end position as the starting position from the previous frame. Default: `0`.
* `posfromenttag` - sets the starting position to the position of an entity tag (see *"Entity positions"*). Default: `-1`.
* `endfromenttag` - sets the end position to the position of an entity tag (see *"Entity positions"*). Default: `-1`.
* `posfroment` - sets the starting position to one of the positions of an entity (see *"Entity positions"*). Default: `-1`.
* `endfroment` - sets the end position to one of the positions of an entity (see *"Entity positions"*). Default: `-1`.

### Entity positions

Player entities have a number of predefined positions, which can be used to position effects.
In addition, they also have a number of tags, which are attached to the entity's model bones, and follow the entity's animation.

### Entity position points

| Type   | Value | CubeScript handle  | Description                                |
|--------|-------|--------------------|--------------------------------------------|
| Origin | 0     | $FX_ENT_POS_ORIGIN | Origin position of the entity.             |
| Bottom | 1     | $FX_ENT_POS_BOTTOM | Bottom position of the entity.             |
| Middle | 2     | $FX_ENT_POS_MIDDLE | Middle (by height) position of the entity. |
| Top    | 3     | $FX_ENT_POS_TOP    | Top position of the entity.                |
| Dir    | 4     | $FX_ENT_POS_DIR    | Origin offset by the entity's direction.   |
| Muzzle | 5     | $FX_ENT_POS_MUZZLE | Gun muzzle position of the entity.         |

### Entity position tags

| Type      | Value | CubeScript handle     |
|-----------|-------|-----------------------|
| Camera    | 0     | $FX_ENT_TAG_CAMERA    |
| Crown     | 1     | $FX_ENT_TAG_CROWN     |
| Torso     | 3     | $FX_ENT_TAG_TORSO     |
| Limbs     | 5     | $FX_ENT_TAG_LIMBS     |
| Waist     | 7     | $FX_ENT_TAG_WAIST     |
| Muzzle    | 8     | $FX_ENT_TAG_MUZZLE    |
| Origin    | 9     | $FX_ENT_TAG_ORIGIN    |
| Eject 1   | 10    | $FX_ENT_TAG_EJECT1    |
| Eject 2   | 11    | $FX_ENT_TAG_EJECT2    |
| Jet left  | 12    | $FX_ENT_TAG_JET_LEFT  |
| Jet right | 13    | $FX_ENT_TAG_JET_RIGHT |
| Jet back  | 14    | $FX_ENT_TAG_JET_BACK  |
| Toe left  | 15    | $FX_ENT_TAG_TOE_LEFT  |
| Toe right | 16    | $FX_ENT_TAG_TOE_RIGHT |

## Property modifiers

As previously mentioned, various properties can have modifiers applied. The availability of modifiers depends on the property.
Modifiers can also have their own properties, further allowing for fine-tuning their behavior.
Currently, there are two different modifiers available, the list may be expanded in the future:

| Modifier type        | Value | CubeScript handle | Description                                     | Has properties |
|----------------------|-------|-------------------|-------------------------------------------------|----------------|
| Random               | 0     | $FX_MOD_RAND      | Adds a random value of `0-n` to the base value. | No             |
| Interpolation (lerp) | 1     | $FX_MOD_LERP      | Interpolates from the base value to `n`.        | Yes            |

**NOTE: Random state is shared between all instances in an emitter's chain. That way, the "randomness" can be synchronized between various effects within the same chain.**

**NOTE: Modifiers are applied in the following order:**
1. Lerp
2. Random

### Interpolation properties

Interpolation (lerp) modifier has the following properties (all are `integer` type):

* `lerptime` - time in milliseconds it takes for the base value to reach the target value. Used only when `lerpmode` is not set to parameter mode. Default: `1000`.
* `lerpmode` - determines interpolation mode, (*see "Interpolation modes"*). Default: `$FX_MOD_LERP_ACTIVE` (`0`).
* `lerpparam` - changes which internal parameter (see *"Internal parameters"*) is used as the interpolator when `lerpmode` in internal parameter mode. Default: `0`.
* `lerpshape` - sets the interpolation shape (*see "Interpolation shapes"*). Default: `$FX_MOD_LERP_SHAPE_LINEAR` (`0`).

### Interpolation modes

| Mode               | Value | CubeScript handle   | Description                                                                      |
|--------------------|-------|---------------------|----------------------------------------------------------------------------------|
| Activation         | 0     | $FX_MOD_LERP_ACTIVE | Interpolation begins with the activation of the emitter.                         |
| Emission           | 1     | $FX_MOD_LERP_EMIT   | Interpolation begins with the scheduled emission of the effect.                  |
| Internal parameter | 2     | $FX_MOD_LERP_PARAM  | Interpolation by using parameter set by `lerpparam` as the factor.               |
| Iteration          | 3     | $FX_MOD_LERP_ITER   | Interpolation by using the iteration progress as the factor. (*see "Iteration"*) |

### Interpolation shapes

| Shape      | Value | CubeScript handle             | Formula            |
|------------|-------|-------------------------------|--------------------|
| Linear     | 0     | $FX_MOD_LERP_SHAPE_LINEAR     | y = x              |
| Square in  | 1     | $FX_MOD_LERP_SHAPE_SQUARE_IN  | y = x^2            |
| Square out | 2     | $FX_MOD_LERP_SHAPE_SQUARE_OUT | y = 1 - (1 - x)^2  |
| Smooth     | 3     | $FX_MOD_LERP_SHAPE_SMOOTH     | y = x^2 * (3 - 2x) |

### Example: Interpolating a particle's size

    registerfx FX_EXAMPLES_PARTICLE_SIZE_LERP $FX_TYPE_PARTICLE [
        fxpropf partsize 0.5
        fxpropf partsize 1.0 $FX_MOD_LERP [
            fxpropi lerptime 1000
            fxpropi lerpshape $FX_MOD_LERP_SHAPE_SMOOTH
        ]
    ]

## Internal parameters

Certain modifiers (such as interpolation) can use parameters, which are supplied from outside to modulate the behavior of an effect.
The availability of parameters depends entirely on the context where an effect is used, therefore, parameters may share IDs if their usage context differs.

| Parameter                  | Context              | Value (ID) | CubeScript handle      | Description                                             |
|----------------------------|----------------------|------------|------------------------|---------------------------------------------------------|
| Weapon power               | Weapon FX            | 0          | $W_FX_POWER_PARAM      | Cooked weapon power, `0-1`.                             |
| Projectile lifetime        | Projectile life FX   | 0          | $P_FX_LIFETIME_PARAM   | Lifetime of a projectile, `0-1`, `1` being end of life. |
| Projectile bounce velocity | Projectile bounce FX | 0          | $P_FX_BOUNCE_VEL_PARAM | Bounce velocity of a projectile, `0-1`.                 |
| Impulse boost              | Player impulse FX    | 0          | <n/a>                  | Set to `1` on player impulse boost, is otherwise `0`.   |

## Chaining effects

There two ways to chain effects together: parenting and end-of-life emission.

When an effect is parented to other, it will be instantiated along with its parent. In order to parent an effect one must use the `fxparent` function, passing the parent's ID as the parameter.

### Example 5: one effect parented to another

    registerfx FX_EXAMPLE5_PARENT $FX_TYPE_PARTICLE [
    ]

    registerfx FX_EXAMPLE5_CHILD $FX_TYPE_PARTICLE [
        fxparent FX_EXAMPLE5_PARENT
    ]

As mentioned, besides parenting one could define an end-of-life emission, which causes an effect to create a **new FX emitter** with a desired effect on its end of life (e.g. past `activelen`). In order to define such behavior, one must use `fxend` command, passing desired effect ID as the parameter.

**NOTE: `fxend` is meant to be used on the caller, not the callee, which is the opposite of `fxparent`.**

### Example 6: one effect occurring after the end of another

    registerfx FX_EXAMPLE6_FIRST $FX_TYPE_PARTICLE [
        fxend FX_EXAMPLE6_SECOND
    ]

    registerfx FX_EXAMPLE6_SECOND $FX_TYPE_PARTICLE [
    ]

# Generic properties

These properties are available regardless of the effect type.

| Property name  | Type         | Min      | Default | Max     | Modifiers    | Description                                                             |
|----------------|--------------|----------|---------|---------|--------------|-------------------------------------------------------------------------|
| activelen      | Integer      | 1        | 1       | INT_MAX | Random       | Instance active time (ms) (see *"Scheduling and timing effects"*)       |
| emitlen        | Integer      | 1        | 1       | INT_MAX | Random, Lerp | Emission time (ms) (see *"Scheduling and timing effects"*)              |
| emitinterval   | Integer      | 1        | 1       | INT_MAX | Random, Lerp | Emission interval (ms) (see *"Scheduling and timing effects"*)          |
| emitdelay      | Integer      | 0        | 0       | INT_MAX | Random, Lerp | Emission delay (ms) (see *"Scheduling and timing effects"*)             |
| emitparent     | Integer      | 0        | 0       | 1       |              | Parent scheduling (see *"Scheduling and timing effects"*)               |
| emittimeliness | Integer      | 0        | 0       | 1       |              | Emission timeliness (see *"Scheduling and timing effects"*)             |
| emitsingle     | Integer      | 0        | 0       | 1       |              | Single emission (see *"Scheduling and timing effects"*)                 |
| emitrestart    | Integer      | 0        | 0       | 1       |              | Reset emit state on prolong (see *"Scheduling and timing effects"*)     |
| emitmove       | Float        | 0        | 0       | FLT_MAX |              | Emission speed threshold (see *"Scheduling and timing effects"*)        |
| emitparam      | Integer      | -1       | -1      | 8       |              | Emission internal param trigger (see *"Scheduling and timing effects"*) |
| fadein         | Integer      | 0        | 0       | INT_MAX |              | Fade in (ms)                                                            |
| fadeout        | Integer      | 0        | 0       | INT_MAX |              | Fade out (ms)                                                           |
| blend          | Float        | 0        | 1       | 1       | Random, Lerp | Blend                                                                   |
| scale          | Float        | 0        | 1       | 1       | Random, Lerp | Scale                                                                   |
| colorized      | Integer      | 0        | 0       | 1       |              | If enabled, colour is taken from the supplied state.                    |
| reloffset      | Integer      | 0        | 1       | 1       |              | Offset math in relation to direction (see *"Positioning"*)              |
| posoffset      | Float vector | -FLT_MAX | 0       | FLT_MAX | Random, Lerp | Start position offset (see *"Positioning"*)                             |
| endoffset      | Float vector | -FLT_MAX | 0       | FLT_MAX | Random, Lerp | End position offset (see *"Positioning"*)                               |
| endfrompos     | Float vector | -FLT_MAX | 0       | FLT_MAX | Random, Lerp | End position by offset from start (see *"Positioning"*)                 |
| posfromend     | Float vector | -FLT_MAX | 0       | FLT_MAX | Random, Lerp | Start position by offset from end (see *"Positioning"*)                 |
| posflip        | Integer      | 0        | 0       | 1       |              | Flip start and end positions (see *"Positioning"*)                      |
| endfromprev    | Integer      | 0        | 0       | 1       |              | Previous start position as the end position (see *"Positioning"*)       |
| posfromenttag  | Integer      | -1       | -1      | INT_MAX | Random, Lerp | Start position by entity tag (see *"Positioning"*)                      |
| endfromenttag  | Integer      | -1       | -1      | INT_MAX | Random, Lerp | End position by entity tag (see *"Positioning"*)                        |
| posfroment     | Integer      | -1       | -1      | INT_MAX | Random, Lerp | Start position by entity (see *"Positioning"*)                          |
| endfroment     | Integer      | -1       | -1      | INT_MAX | Random, Lerp | End position by entity (see *"Positioning"*)                            |
