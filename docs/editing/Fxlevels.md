---
title: Editing: Fxlevels
layout: docs
origfile: editing/Fxlevels.md
origtitle: Fxlevels
permalink: /docs/editing/Fxlevels
redirect_from:
  - /wiki/editing/Fxlevels/
---
* TOC
{:toc}
Fxlevels are used to optimise performance within a map, dependent on the users graphical settings. These attributes are set by the mapper to control level of detail, with maximum performance in mind for lower end hardware. 

## Mapeffects

Mapeffects is a user setting, which allows you to hide specific entities on a per map basis, be that mapmodels, particles, lights, decals; etc. There are 3 `mapeffects ` levels which correspond to the value of an fxlevel attribute.

## Fxlevel attributes

| fxlevel | Corresponding mapeffects state                               |
| ------- | ------------------------------------------------------------ |
| 0       | default setting, entity appears always                       |
| 1       | appears in `mapeffects 1` and above                          |
| 2       | appears in `mapeffects 2` and above                          |
| 3       | appears in `mapeffects 3`                                    |
| -1      | appears in `mapeffects 1` only                               |
| -2      | appears in `mapeffects 2` only                               |
| -3      | appears in `mapeffects 1`  and `mapeffects 2` only           |
| -4      | appears in `mapeffects 3` only                               |
| -5      | appears in `mapeffects 1` and `mapeffects 3` only            |
| -6      | appears in `mapeffects 2` and `mapeffects 3` only            |
| -7      | appears in `mapeffects 1` and `mapeffects 2` and `mapeffects 3` only |

## Examples

The best use-case for fxlevels is to typically remove shadows at lower `mapeffects` values.

#### Lights

Lights can be duplicated and assigned fxlevels to allow volumetric lighting to be hidden. Whilst also disabling shadows.

Shadows tend to be the heaviest thing to render, so limiting most lights to only cast shadows at fxlevel 2 and above can be a good idea. The best way to do this is create a duplicate entity, each with their own fxlevel for the different attributes (eg; *no-shadow*).

#### Mapmodels

The same as above, mapmodels will cast shadows which can be problematic for performance if there are many on lower end hardware. Duplicating the mapmodel entity (in the same location), but setting one of them to use the *no-shadow* flag can be useful.



Below shows a comparison of how fxlevel / mapeffects can be used to remove shadows from map models and lights, depending on the users `mapeffects` setting.

* `mapeffects 3`

![mapeffects 3](images/editing/mapeffects0.jpg)

* `mapeffects 1`

![mapeffects 1](images/editing/mapeffects1.jpg)
