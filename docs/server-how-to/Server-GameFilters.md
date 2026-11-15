---
title: Server how to - Server GameFilters
layout: docs
origfile: server-how-to/Server-GameFilters.md
origtitle: Server-GameFilters
permalink: /docs/server-how-to/Server-GameFilters
redirect_from:
  - /docs/server_how_to/Server_GameFilters/
  - /wiki/server_how_to/Server_GameFilters/
---
* TOC
{:toc}
## Vote filtering
If you wish to limit voting on your server to only certain modes or mutators you will need to
- Take all the *bit shifted* values for the modes/mutators you want to allow
- Add them up (or combine them with bitwise OR `|`)
- Use this value for the `sv_modelockfilter` / `sv_mutslockfilter` variable

For example, to lock voting to only deathmatch and bomber-ball you need 4 + 32 = 36:
```cubescript
sv_modelockfilter 36
```

This will also lock the voting to only the allowed maps for those modes.

Red Eclipse exports `$G_*` (mode index) and `$G_M_*` (mutator index) constants, along with precomputed bitmask globals such as `$G_ALL`, `$G_LIMIT`, `$G_M_ALL`, `$G_M_FILTER`, and `$G_M_ROTATE`. Because `$G_*` and `$G_M_*` hold bit indices (`0..6` and `0..16`), bit-shift each one with `(<< 1 ...)` when combining them in CubeScript. For example:
```cubescript
sv_modelockfilter (| (<< 1 $G_DEATHMATCH) (<< 1 $G_CAPTURE))
```
would limit the server to Deathmatch and Capture the Flag.

To allow a moderator to override the filter, set:
```cubescript
sv_modelock 3
```

It is not possible to disable voting for mutators completely, but you can restrict voting to only the third mode-specific variation (`ctf-protect`, `bb-assault`, `speedrun-gauntlet`) by using:
```cubescript
sv_mutslockfilter (<< 1 $G_M_GSP3) // or 65536
```

## Server Rotation Filtering
If you wish to filter the server rotation (without blocking rotation completely) use the `sv_rotatemodefilter` / `sv_rotatemutsfilter` variables.

For example:
```cubescript
sv_rotatemodefilter 36
```

## Filter Values
### Modes

| Number | Bit shifted | Index variable | Constant / Mask | Mode               |
|:------:|------------:|----------------|-----------------|--------------------|
| 0      | 1           | `G_DEMO`       | —               | Demo               |
| 1      | 2           | `G_EDITING`    | —               | Editing            |
| 2      | 4           | `G_DEATHMATCH` | —               | Deathmatch         |
| 3      | 8           | `G_CAPTURE`    | —               | Capture the Flag   |
| 4      | 16          | `G_DEFEND`     | —               | Defend and Control |
| 5      | 32          | `G_BOMBER`     | —               | Bomber Ball        |
| 6      | 64          | `G_SPEEDRUN`   | —               | Speedrun           |
| —      | 60          | —              | `G_LIMIT`       | DM, CTF, Defend, Bomber |
| —      | 127         | —              | `G_ALL`         | All                |

### Mutators

| Number | Bit shifted | Index variable   | Constant / Mask | Mutator                                                                                         |
|:------:|------------:|------------------|-----------------|-------------------------------------------------------------------------------------------------|
| 0      | 1           | `G_M_FFA`        | —               | Free-for-All                                                                                    |
| 1      | 2           | `G_M_COOP`       | —               | Co-op                                                                                           |
| 2      | 4           | `G_M_INSTAGIB`   | —               | Instagib                                                                                        |
| 3      | 8           | `G_M_MEDIEVAL`   | —               | Medieval                                                                                        |
| 4      | 16          | `G_M_KABOOM`     | —               | Kaboom                                                                                          |
| 5      | 32          | `G_M_DUEL`       | —               | Duel                                                                                            |
| 6      | 64          | `G_M_SURVIVOR`   | —               | Survivor                                                                                        |
| 7      | 128         | `G_M_CLASSIC`    | —               | Classic                                                                                         |
| 8      | 256         | `G_M_ONSLAUGHT`  | —               | Onslaught                                                                                       |
| 9      | 512         | `G_M_VAMPIRE`    | —               | Vampire                                                                                         |
| 10     | 1024        | `G_M_RESIZE`     | —               | Resize                                                                                          |
| 11     | 2048        | `G_M_HARD`       | —               | Hard                                                                                            |
| 12     | 4096        | `G_M_ARENA`      | —               | Arena                                                                                           |
| 13     | 8192        | `G_M_DARK`       | —               | Dark                                                                                            |
| 14     | 16384       | `G_M_GSP1`       | —               | First mode variation (`dm-gladiator`, `ctf-quick`, `dac-quick`, `bb-hold`, `speedrun-lapped`)   |
| 15     | 32768       | `G_M_GSP2`       | —               | Second mode variation (`dm-oldschool`, `ctf-defend`, `dac-king`, `bb-basket`, `speedrun-endurance`) |
| 16     | 65536       | `G_M_GSP3`       | —               | Third mode variation (`ctf-protect`, `bb-assault`, `speedrun-gauntlet`)                         |
| —      | 118785      | —                | `G_M_ROTATE`    | Default rotation filter (`FFA`, `Arena`, `GSP1`, `GSP2`, `GSP3`)                                |
| —      | 131071      | —                | `G_M_ALL` / `G_M_FILTER` | All                                                                                    |

## How the Filter Values Work
Filters are simply created using bitwise OR (numbers are bit shifted first):

Example:
2 *(Deathmatch)* + 5 *(Bomber Ball)* = `(1<<2) + (1<<5)` = 4 + 32 = 36
```
00000100 +
00100000 =
00100100 (binary) = 36 (decimal)
```
