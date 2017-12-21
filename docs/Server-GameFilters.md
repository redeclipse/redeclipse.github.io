---
title: Server GameFilters
origfile: Server-GameFilters.md
origtitle: Server-GameFilters
permalink: /docs/Server-GameFilters
layout: docs
---
* TOC
{:toc}
## Vote filtering
If you wish to limit voting on your server to only certain modes or mutators you will need to
- Take all the the *bit shifted* values for the modes/mutators you want to allow
- Add them up
- Use this sum value for the `sv_modelockfilter`/`sv_mutslockfilter` variable

For example, to lock voting to only deathmatch and bomber-ball you need 4 + 32 = 36
```cubescript
sv_modelockfilter 36
```

This will also lock the voting to only the allowed maps for those modes.

As of Red Eclipse 1.3 (Galactic Edition), there are now `idx vars` that represent each bit-shifted value for each mode and mutator. These vars can be easily added when changing settings that involve these filters. For example:
```cubescript
sv_modelockfilter (+ $modebitdeathmatch $modebitcapture)
```
Would limit the server to deathmatch and capture the flag

To allow the admin to override the filter, set
```cubescript
sv_modelock 3
```

It is not possible to disable voting for mutators completely, but you can get close by using
```cubescript
sv_mutslockfilter 65536
```
which will only keep the third mode variation mutator (ctf-protect) enabled.

## Server Rotation Filtering
If you wish to filter the server rotation (without blocking rotation completely) use the `sv_rotatemodefilter`/`sv_rotatemutsfilter` variables

For example
```cubescript
sv_rotatemodefilter 36
```

## Filter Values
### Modes

| Number | Bit shifted | idxvar              | Mutator          |
|:------:|------------:|---------------------|------------------|
|    0   | 1           | `modebitdemo`       | Demo             |
|    1   | 2           | `modebitediting`    | Editing          |
|    2   | 4           | `modebitdeathmatch` | Deathmatch       |
|    3   | 8           | `modebitcapture`    | Capture the Flag |
|    4   | 16          | `modebitdefend`     | Defend the Flag  |
|    5   | 32          | `modebitbomber`     | Bomber-ball      |
|    6   | 64          | `modebitrace`       | Race             |
|    7   | 127         | `modebitall`        | All              |

### Mutators

| Number | Bit shifted | idxvar             | Mutator                                                                       |
|:------:|------------:|--------------------|-------------------------------------------------------------------------------|
|    0   | 1           | `mutsbitmulti`     | Multi                                                                         |
|    1   | 2           | `mutsbitffa`       | Free-for-all                                                                  |
|    2   | 4           | `mutsbitcoop`      | Co-op                                                                         |
|    3   | 8           | `mutsbitinstagib`  | Instagib                                                                      |
|    4   | 16          | `mutsbitmedieval`  | Medieval                                                                      |
|    5   | 32          | `mutsbitkaboom`    | Kaboom                                                                        |
|    6   | 64          | `mutsbitduel`      | Duel                                                                          |
|    7   | 128         | `mutsbitsurvivor`  | Survivor                                                                      |
|    8   | 256         | `mutsbitclassic`   | Classic                                                                       |
|    9   | 512         | `mutsbitonslaught` | Onslaught                                                                     |
|   10   | 1024        | `mutsbitfreestyle` | Freestyle                                                                     |
|   11   | 2048        | `mutsbitvampire`   | Vampire                                                                       |
|   12   | 4096        | `mutsbitresize`    | Resize                                                                        |
|   13   | 8192        | `mutsbithard`      | Hard                                                                          |
|   14   | 16384       | `mutsbitbasic`     | Basic                                                                         |
|   15   | 32768       | `mutsbitgsp1`      | First mode variation (ctf-defend, dtf-king, bomber-touchdown, gauntlet-hard)  |
|   16   | 65536       | `mutsbitgsp2`      | Second mode variation (ctf-defend, dtf-king, bomber-touchdown, gauntlet-hard) |
|   17   | 131072      | `mutsbitgsp3`      | Third mode variation (ctf-protect)                                            |
|   18   | 262143      | `mutsbitall`       | All                                                                           |

## How the Filter Values Work
Filters are simply created using bitwise OR (numbers are bit shifted first):

Example: 
2 *(Deathmatch)* + 5 *(Bomber Ball)* = (1<<2) + (1<<5) = 4 + 32 = 36
```
00000100 +
00100000 =
00100100 (binary) = 36 (decimal)
```
