---
title: Fx Other
layout: docs
origfile: Fx-Other.md
origtitle: Fx-Other
permalink: /docs/Fx-Other
redirect_from:
  - /docs/Fx_Other/
  - /wiki/Fx_Other/
---
* TOC
{:toc}
# Other FX

This section briefly describes other effect types' properties.

# Light

## Light properties

| Property name | Type    | Min     | Default | Max     | Modifiers    | Description                                  |
|---------------|---------|---------|---------|---------|--------------|----------------------------------------------|
| radius        | Float   | FLT_MIN | 32      | FLT_MAX | Random, Lerp | Light radius                                 |
| colour        | Colour  | 0       | 0       | 255     | Random, Lerp | Light colour (unless `colorized` is enabled) |
| flags         | Integer | 0       | 0       | INT_MAX |              | Light flags (see *Light flags*)              |

## Light flags

| Flag          | Value | Description                         |
|---------------|-------|-------------------------------------|
| L_NOSHADOW    | 1     | Disable shadow                      |
| L_NODYNSHADOW | 2     | Disable shadow for dynamic entities |
| L_VOLUMETRIC  | 4     | Volumetric light                    |
| L_NOSPEC      | 8     | Disable specular reflections        |
| L_SMALPHA     | 16    | Coloured transparency shadows       |

# Sound

## Sound properties

| Property name | Type    | Min   | Default | Max     | Modifiers    | Description                                        |
|---------------|---------|-------|---------|---------|--------------|----------------------------------------------------|
| sound         | String  | [n/a] |         | [n/a]   |              | Unique ID of the sound to be played                |
| volume        | Integer | 0     | 255     | 255     | Random, Lerp | Sound volume                                       |
| flags         | Integer | 0     | 0       | INT_MAX |              | Playback flags (see *Sound flags*)                 |
| minrad        | Integer | -1    | -1      | INT_MAX | Random, Lerp | Minimum radius, below which there's no attenuation |
| maxrad        | Integer | -1    | -1      | INT_MAX | Random, Lerp | Maximum radius, above which sound is not audible   |

**NOTE: Sound radius properties can take `-1` as value, in which case they will assume the default values from the definition of the sound slot.**

## Sound flags

| Flag      | Value | Description                                     |
|-----------|-------|-------------------------------------------------|
| SND_LOOP  | 1     | Loops the sound instead of playing it only once |

# Wind

Wind is a purely visual effect affecting some particles and models such as vegetation.

## Wind properties

| Property name | Type    | Min   | Default | Max     | Modifiers    | Description                                                                                |
|---------------|---------|-------|---------|---------|--------------|--------------------------------------------------------------------------------------------|
| mode          | Integer | 0     | 0       | INT_MAX |              | Mode flags (see *Wind mode flags*)                                                         |
| speed         | Float   | 0     | 1       | 2       | Random, Lerp | Wind speed                                                                                 |
| interval      | Integer | 0     | 0       | INT_MAX | Random, Lerp | Cycle interval (ms). When `0`: single-impulse in impulse mode; constant speed otherwise    |
| cyclelen      | Integer | 0     | 4000    | INT_MAX | Random, Lerp | Impulse time (ms)                                                                          |
| radius        | Integer | 0     | 0       | INT_MAX | Random, Lerp | Area of effect. When `0` the area is not limited.                                          |
| atten         | Float   | 0     | 0.1     | FLT_MAX | Random, Lerp | Distance attenuation                                                                       |
| yaw           | Integer | 0     | 0       | 360     | Random, Lerp | Wind direction when in vectored mode                                                       |

## Wind mode flags

| Flag               | Value | Description                                                                         |
|--------------------|-------|-------------------------------------------------------------------------------------|
| WIND_EMIT_IMPULSE  | 1     | Rapid rush of wind. A more constant wind is used if not set.                        |
| WIND_EMIT_VECTORED | 2     | Uniform wind direction when inside of wind radius, regardless of relative position. |

# Stains

**NOTE: Stains require an appropriate direction vector (tip position in the emitter) to function correctly. Thus, they might not work in all scenarios. Currently, only projectiles have support for this.**

## Available stains

Following pre-defined stains are available for use:


| Stain                    | Value |
|--------------------------|-------|
| $STAIN_SMOKE             | 0     |
| $STAIN_SCORCH            | 1     |
| $STAIN_SCORCH_SHORT      | 2     |
| $STAIN_BLOOD             | 3     |
| $STAIN_BULLET            | 4     |
| $STAIN_ENERGY            | 5     |
| $STAIN_STAIN             | 5     |

## Stain properties

| Property name | Type    | Min     | Default      | Max         | Modifiers    | Description                                  |
|---------------|---------|---------|--------------|-------------|--------------|----------------------------------------------|
| staintype     | Integer | 0       | $STAIN_SMOKE | STAIN_STAIN |              | Stain (see *Available stains*)               |
| radius        | Float   | FLT_MIN | 16           | 256         | Random, Lerp | Stain size                                   |
| colour        | Colour  | 0       | 0            | 255         | Random, Lerp | Stain colour (unless `colorized` is enabled) |
