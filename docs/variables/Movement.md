---
title: Variables - Movement
layout: docs
origfile: variables/Movement.md
origtitle: Movement
permalink: /docs/variables/Movement
redirect_from:
  - /wiki/variables/Movement/
---
* TOC
{:toc}
How players move: speeds, jumping and the other impulse moves, gravity, and moving through liquids.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `gravity` | raw gravity value | `value` |
| `gravityscale` | multiply gravity by this much | `value` |
| `gravitycrouch` | multiply gravity by this at all times while crouching | `value` |
| `buoyancycrouch` | multiply buoyancy by this at all times while crouching | `value` |
| `floorcoastscale` | multiply floorcoast by this much | `value` |
| `aircoastscale` | multiply aircoast by this much | `value` |
| `slidecoastscale` | multiply slidecoast by this much | `value` |
| `movespeed` | baseline movement speed | `value` |
| `movecrawl` | multiplier of speed when crawling | `value` |
| `movestraight` | multiplier of speed when only moving forward | `value` |
| `movestrafe` | multiplier of speed when strafing | `value` |
| `moveinair` | multiplier of speed when in-air | `value` |
| `movestepup` | multiplier of speed when stepping up | `value` |
| `movestepdown` | multiplier of speed when stepping down | `value` |
| `impulseboost` | multiplier of impulse when boosting (double jump) | `value` |
| `impulseboostredir` | redirection scale of player's momentum into a boost (double jump) | `value` |
| `impulsedash` | multiplier of impulse when dashing forward | `value` |
| `impulseboostup` | multiplier of impulse when boosting upward | `value` |
| `impulseboostupredir` | redirection scale of player's momentum into a jump | `value` |
| `impulsekick` | parkour kick modifier | `value` |
| `impulsekickredir` | redirection scale of player's momentum into a kick | `value` |
| `impulsewallrun` | multiplier of impulse for wallruns | `value` |
| `impulsewallrunnorm` | minimum parkour surface z normal | `value` |
| `impulsewallrunredir` | redirection scale of player's momentum into a parkour | `value` |
| `impulsecount` | number of impulse actions per air transit | `value` |
| `impulsesliplen` | time before floor friction kicks back in | `milliseconds` |
| `impulsemelee` | multiplier of impulse when using melee | `value` |
| `impulsemeleeredir` | redirection scale of player's momentum into a melee attack | `value` |
| `impulsecostmeter` | impulse meter capacity, 0 = freestyle | `value` |
| `floorcoast` | how long players keep their speed on the floor, higher is slipperier | `value` |
| `aircoast` | how long players and projectiles keep their speed in the air, higher is less drag | `value` |
| `slidecoast` | how long players keep their speed while sliding, higher is slipperier | `value` |

`<liquid>` is one of: `water`, `water2`, `water3`, `water4`, `lava`, `lava2`, `lava3` or `lava4`, and optionally append `alt` for the alternate map variant.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<liquid>buoyancy[alt]` | buoyancy of `<liquid>` material | `value` |
| `<liquid>buoyancyscale[alt]` | multiply `<liquid>buoyancy` by this much | `value` |
| `<liquid>falldist[alt]` | distance from a `<liquid>fall` within which players are pushed by it | `distance` |
| `<liquid>fallspeed[alt]` | speed at which a `<liquid>fall` pushes players | `value` |
| `<liquid>fallpush[alt]` | amount a `<liquid>fall` pushes players away from it | `value` |
| `<liquid>speed[alt]` | multiplier of movement speed in `<liquid>` | `value` |
| `<liquid>speedscale[alt]` | multiply `<liquid>speed` by this much | `value` |
| `<liquid>coast[alt]` | how long players and projectiles keep their speed in `<liquid>`, higher is less drag | `value` |
| `<liquid>coastscale[alt]` | multiply `<liquid>coast` by this much | `value` |
| `<liquid>boost[alt]` | fraction submerged in `<liquid>` at which players get boosted out | `value` |
| `<liquid>boostscale[alt]` | multiply `<liquid>boost` by this much | `value` |
| `<liquid>submerge[alt]` | fraction submerged in `<liquid>` at which players are considered in it | `value` |
| `<liquid>submergescale[alt]` | multiply `<liquid>submerge` by this much | `value` |

Add `alt` to the end of these for the alternate map variant (`mapvariant 2`).

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<water\|water2\|water3\|water4>extinguish[alt]` | fraction submerged in `<water\|water2\|water3\|water4>` at which burning players are extinguished | `value` |
| `<water\|water2\|water3\|water4>extinguishscale[alt]` | multiply `<water\|water2\|water3\|water4>extinguish` by this much | `value` |

Add `alt` to the end of these for the alternate map variant (`mapvariant 2`).

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<lava\|lava2\|lava3\|lava4>burntime[alt]` | `<lava\|lava2\|lava3\|lava4>` burn residual lasts this long | `milliseconds` |
| `<lava\|lava2\|lava3\|lava4>burndelay[alt]` | `<lava\|lava2\|lava3\|lava4>` burn residual damages players this often | `milliseconds` |
| `moverun` | multiplier of speed when running | `value` |
| `movesprint` | multiplier of speed when sprinting | `value` |
| `movesprintrotvel` | sprinting stops building up when turning faster than this, 0 = no limit | `value` |
| `movesprintdecay` | rate at which sprinting decays when not running, 0 = instantly | `value` |
| `impulsejump` | multiplier of impulse when jumping | `value` |
| `impulsejumpredir` | redirection scale of player's momentum into a jump | `value` |
| `impulseboostpitchmin` | minimum pitch of a boost | `degrees` |
| `impulseboostpitchmax` | maximum pitch of a boost | `degrees` |
| `impulsedashback` | multiplier of impulse when dashing backward | `value` |
| `impulsedashredir` | redirection scale of player's momentum into a dash | `value` |
| `impulsepound` | multiplier of impulse when pounding | `value` |
| `impulsepoundredir` | redirection scale of player's momentum into a pound | `value` |
| `impulselaunch` | multiplier of impulse when launching | `value` |
| `impulselaunchredir` | redirection scale of player's momentum into a launch | `value` |
| `impulselaunchpitchmin` | minimum pitch of a launch | `degrees` |
| `impulselaunchpitchmax` | maximum pitch of a launch | `degrees` |
| `impulselaunchextra` | extra upward impulse added to a launch | `value` |
| `impulseslide` | multiplier of impulse when sliding | `value` |
| `impulseslideredir` | redirection scale of player's momentum into a slide | `value` |
| `impulseslideinair` | minimum time in the air before a slide can be started | `milliseconds` |
| `impulsewallrunstep` | minimum step size in which to climb | `distance` |
| `impulsewallrunhead` | minimum space above the head for climbing | `distance` |
| `impulsekickpitchmin` | minimum pitch of a wall kick | `degrees` |
| `impulsekickpitchmax` | maximum pitch of a wall kick | `degrees` |
| `impulseclimb` | multiplier of impulse when climbing | `value` |
| `impulseclimbredir` | redirection scale of player's momentum into a climb | `value` |
| `impulsegrab` | multiplier of impulse when grabbing a wall | `value` |
| `impulsegrabredir` | redirection scale of player's momentum into a wall grab | `value` |
| `impulsegrabplayer` | multiplier of impulse when grabbing a player | `value` |
| `impulsegrabplayerredir` | redirection scale of player's momentum into a player grab | `value` |
| `impulsevaultstyle` | when to transition into a vault (bitwise OR) | `wallrun climb` |
| `impulsevaultpitchclamp` | clamp vault pitch to the player's pitch | `bool` |
| `impulsevaultpitch` | pitch to funnel into when vaulting | `degrees` |
| `impulsevaultminspeed` | minimum fraction of player speed kept when vaulting | `value` |
| `impulsecounttypes` | impulse actions that count towards impulsecount (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |
| `impulsepoundstyle` | pound style;<br>0 = stop moving first, 1 = allow moving | `value` |
| `impulseyawtime` | time taken to turn the view yaw when starting a wallrun | `milliseconds` |
| `impulseyawscale` | amount the view yaw turns to follow a wallrun | `value` |
| `impulsepitchtime` | time taken to turn the view pitch when starting a wallrun | `milliseconds` |
| `impulsepitchscale` | amount the view pitch turns to follow a wallrun | `value` |
| `impulserolltime` | time taken to roll the view when wallrunning | `milliseconds` |
| `impulserollscale` | amount the view rolls when wallrunning | `value` |
| `impulsetouchtypes` | impulse actions that count as touching a surface (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |
| `impulsetouchmasks` | impulse actions that need a touch before they can be used again (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |
| `impulsecoastmask` | impulse actions during which slide coast is used (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |
| `impulseregenmask` | impulse actions which must have finished before the impulse meter regenerates (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |
| `impulsedashtolerate` | tolerate dashes for jumps;<br>1 = during their length, 2 = also during their delay | `value` |
| `impulsevaulttolerate` | tolerate vaults for jumps;<br>1 = during their length, 2 = also during their delay | `value` |
| `impulsecostcount` | impulse meter cost of regenerating one count | `value` |
| `impulsecostrelax` | impulse actions that can be used without enough meter (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |
| `impulsecostscale` | scale impulse costs by how much the impulse is scaled | `bool` |
| `impulseregendelay` | delay before the impulse meter regenerates | `milliseconds` |

`<action>` is one of: `jump`, `boost`, `wallrun`, `dash`, `vault`, `slide`, `launch`, `pound`, `kick`, `melee`, `climb`, `grab`, `grabplayer`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `impulsecost<action>` | impulse meter cost of a `<action>` | `value` |

`<action>` is one of: `jump`, `boost`, `dash`, `slide`, `launch`, `melee`, `kick`, `grab`, `wallrun`, `climb`, `vault`, `pound`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `impulse<action>move` | multiplier of movement control during a `<action>` | `value` |
| `impulse<action>gravity` | multiplier of gravity during a `<action>` | `value` |

`<action>` is one of: `jump`, `boost`, `dash`, `slide`, `launch`, `melee`, `kick`, `grab`, `wallrun`, `vault`, `pound`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `impulse<action>len` | length of time a `<action>` lasts | `milliseconds` |
| `impulse<action>delay` | extra time after a `<action>` during which actions that check it in their mask are blocked | `milliseconds` |
| `impulse<action>mask` | impulse actions that must have finished before a `<action>` can be used (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |
| `impulse<action>wait` | time of plain movement needed after the impulse actions in its wait mask finish before another `<action>` can be used, 0 = off | `milliseconds` |
| `impulse<action>waitmask` | impulse actions whose finish starts the wait before a `<action>` (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |

`<action>` is one of: `jump`, `boost`, `dash`, `slide`, `launch`, `melee`, `kick`, `grab`, `wallrun`, `vault`, `pound`, `pusher`, `checkpoint`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `impulse<action>reset` | impulse action timers reset upon a `<action>` (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |
| `impulse<action>clear` | impulse state cleared upon a `<action>` (bitwise OR) | `meter count type regen slip pusher collect-meter last-meter collect-count last-count` |

`<state>` is one of: `crouch` (crouching), `run` (running), `sprint` (sprinting), `move` (moving), `inair` (in the air).

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `impulse<state>regenmeter` | multiplier of impulse meter regeneration while `<state>` | `value` |
| `impulse<state>regencount` | multiplier of impulse count regeneration while `<state>` | `value` |

`<action>` is one of: `jump`, `boost`, `dash`, `slide`, `launch`, `melee`, `kick`, `grab`, `wallrun`, `vault`, `pound`, `pusher`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `impulse<action>regenmeter` | multiplier of impulse meter regeneration during a `<action>` | `value` |
| `impulse<action>regencount` | multiplier of impulse count regeneration during a `<action>` | `value` |
