---
title: Variables - Variables home
layout: docs
origfile: variables/Variables-home.md
origtitle: Variables-home
permalink: /docs/variables/Variables-home
redirect_from:
  - /docs/variables/Variables_home/
  - /wiki/variables/Variables_home/
---
* TOC
{:toc}
Variables and commands can be used to change almost everything about how the game works. This reference is generated from [`config/usage.cfg`](https://github.com/redeclipse/base/blob/master/config/usage.cfg) in the base repository. Placeholder templates (such as `<actor>`, `<team>`, `<weapon>`, `[alt]`, `[flak]`, and `[1|2]`) indicate families of related variables, with valid values noted above each block.

### basic gameplay commands

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `name` | sets your player's display name | `name` |
| `quit` | quits the game | — |
| `connect` | connect to a multiplayer server | `[IP or hostname port admin or server password]` |
| `accountname` | name to authenticate as | `name` |
| `accountpass` | authentication key to authenticate as | `key` |
| `authconnect` | toggles automatic authentication upon connection | `boolean` |
| `disconnect` | disconnects from the current server or singleplayer game | — |
| `discordenabled` | toggles Discord functionality (if present), from the next start | `boolean` |
| `steamclient` | toggles Steam functionality (if present), from the next start | `boolean` |
| `presence` | what Steam and Discord friends see of your match;<br>0 = nothing, 1 = what you are playing, 2 = also a Join button while the server is listed, open and has room | `value` |
| `getpresence` | returns what Steam and Discord friends would see now: details, state, status, join link, group, players and slots | — |
| `auth` | sends an account authentication request | — |
| `spectate` | toggles spectator status | `boolean` |
| `team` | requests team change to the specified team | `team` |
| `thirdpersonswitch` | change from first to third person point of view or vise-versa | — |
| `playermodel` | toggles between male (0) and female (1) player models | `boolean` |
| `playercolourbody` | sets the player model's body colour and chat icon colour | `colour` |
| `playercolouraccent` | sets the player model's accent colour | `colour` |
| `colour` | sets the player model's body colour and chat icon colour | `colour` |
| `goto` | jumps the spectator camera to the position of the specified client | `name/cn` |

### map commands

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `mapvariant` | returns the current map variant; 1 for normal and 2 for alt | — |
| `forcemapvariant` | force selection of a particular variant when loading maps, will change current variant if called when a map is loaded;<br>0 = off, 1 = default, 2 = alternate | `value` |
| `forcetriggerid` | sets the current triggerid; -1 for random | `value` |

### misc commands

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `connectguidelines` | toggles acceptance of the multiplayer guidelines | `boolean` |
| `joinlinks` | toggles whether this copy of the game registers redeclipse:// links and takes the ones clicked while it runs | `boolean` |
| `setdesc` | sets the description for an alias (you are reading one right now) | `alias description arguments` |
| `version` | game version for scripts | `version` |
| `autosavebackups` | make backups;<br>0 = off, 1 = single backup, 2 = named backup, 3/4 = same as 1/2 with move to "backups/" | `value` |
| `weapautoreload` | 0 = never, 1 = when empty, 2 = weapons that don't add a full clip, 3 = always (+1 zooming weaps too) | `value` |
| `weapselectslot` | determines how weapons are selected using the number keys;<br>0 = by global weapon numbers, 1 = by temporary pickup slot numbers | `boolean` |
| `showaiinfo` | determines how much info is shown for bots;<br>0 = hide bot info, 1 = show bot joins/parts, 2 = show more verbose info | `value` |
| `rehash` | reload configuration, including settings and UIs | — |
| `resetgl` | reloads all textures and re-initalizes OpenGL | — |
| `compresslevel` | level of png (lossless) compression for screenshots (0 = lowest compression; 9 = highest compression) | `value` |
| `movie` | starts recording a movie to an MP4 or AVI file in moviedir, or stops it if one is being recorded; time advances a fixed step every frame while recording, so it plays back smoothly however slowly it records | `name` |
| `movierecording` | returns 1 while a movie is being recorded | — |
| `moviedir` | the directory in the home directory that movies are recorded to | `path` |
| `moview` | width movies are recorded at, scaled from the screen (0 = screen width) | `value` |
| `movieh` | height movies are recorded at, scaled from the screen (0 = screen height) | `value` |
| `moviefps` | frames per second movies are recorded at | `value` |
| `moviesound` | records the sound with movies, rendered in step with each frame | `boolean` |
| `moviesoundrate` | sample rate the sound is recorded at with AVI movies (MP4 movies are always 48000) | `value` |
| `moviepace` | holds a movie recording to real time, otherwise the game runs as fast as frames render while recording; always on when connected to a server or playing with others | `boolean` |
| `moviemonitor` | plays the sound through the speakers while recording a movie, as it is otherwise only heard in the movie | `boolean` |
| `moviecodec` | video format movies are recorded in;<br>0 = uncompressed I420 AVI (very large), 1 = MJPEG AVI, 2 = AV1 MP4, 3 = VP9 MP4;<br>AV1 falls back to VP9, then to MJPEG, if its codec library isn't available | `value` |
| `moviecrf` | constant quality of AV1 and VP9 movies (0 = best and largest, 63 = worst and smallest) | `value` |
| `movieav1preset` | AV1 encoding speed (0 = slowest and smallest, 13 = fastest) | `value` |
| `movievp9speed` | VP9 encoding speed (0 = slowest and smallest, 8 = fastest) | `value` |
| `moviekeyint` | seconds between key frames in AV1 and VP9 movies, which seeking jumps between | `value` |
| `movieaudiobitrate` | kilobits per second of the Opus sound in MP4 movies | `value` |
| `moviequality` | MJPEG quality movies are recorded at (1 = lowest, 100 = highest) | `value` |
| `movieencoders` | number of threads encoding the frames of a movie | `value` |
| `animoverride` | animation index to play in loop instead of normal player actions (see also findanims) | `index` |
| `animtargets` | toggles overriding bots' (in singleplayer) animations as well as the player's in `animoverride` | `boolean` |
| `findanims` | finds the index for an animation from its human-readable name, e.g. `findanim "shotgun reload"; see src/game.h: animnames[] or data/actors/player/player.cfg for entries | `name` |
| `testanims` | toggles locking player model/animation to due north regardless of camera orientation | `boolean` |

### demo settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `demoautoclientsave` | determines if the client automatically saves demos after each match | `value` |
| `demolock` | determines who may record demos;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `democount` | determines the maximum amount of demo files that may be saved simultaneously on the server (deletes old demos if exceeded) | `value` |
| `demomaxsize` | determines the maximum size of individual demo files that may be saved on the server | `bytes` |
| `demoautorec` | determines if demos are automatically recorded each match | `value` |
| `demoautoserversave` | determines if the server automatically saves demos to disk | `value` |
| `demoserverkeeptime` | if greater than 0, only keep auto-recorded demos younger than demoserverkeeptime seconds | `value` |
| `listdemos` | get a list of recorded demos available for download | — |
| `getdemo` | get the demo id and save to the name name, id defaults to the last and name defaults to the current time | `[id] [name]` |

### movement settings

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

Liquid material variables: replace `<liquid>` with `water`, `water2`, `water3`, `water4`, `lava`, `lava2`, `lava3`, or `lava4`, and optionally append `alt` for the alternate map variant.

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

Append `alt` to configure settings for the alternate map variant (`mapvariant 2`).

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<water\|water2\|water3\|water4>extinguish[alt]` | fraction submerged in `<water\|water2\|water3\|water4>` at which burning players are extinguished | `value` |
| `<water\|water2\|water3\|water4>extinguishscale[alt]` | multiply `<water\|water2\|water3\|water4>extinguish` by this much | `value` |

Append `alt` to configure settings for the alternate map variant (`mapvariant 2`).

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

Applies to `<action>`: `jump`, `boost`, `wallrun`, `dash`, `vault`, `slide`, `launch`, `pound`, `kick`, `melee`, `climb`, `grab`, `grabplayer`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `impulsecost<action>` | impulse meter cost of a `<action>` | `value` |

Applies to `<action>`: `jump`, `boost`, `dash`, `slide`, `launch`, `melee`, `kick`, `grab`, `wallrun`, `climb`, `vault`, `pound`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `impulse<action>move` | multiplier of movement control during a `<action>` | `value` |
| `impulse<action>gravity` | multiplier of gravity during a `<action>` | `value` |

Applies to `<action>`: `jump`, `boost`, `dash`, `slide`, `launch`, `melee`, `kick`, `grab`, `wallrun`, `vault`, `pound`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `impulse<action>len` | length of time a `<action>` lasts | `milliseconds` |
| `impulse<action>delay` | extra time after a `<action>` during which actions that check it in their mask are blocked | `milliseconds` |
| `impulse<action>mask` | impulse actions that must have finished before a `<action>` can be used (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |
| `impulse<action>wait` | time of plain movement needed after the impulse actions in its wait mask finish before another `<action>` can be used, 0 = off | `milliseconds` |
| `impulse<action>waitmask` | impulse actions whose finish starts the wait before a `<action>` (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |

Applies to `<action>`: `jump`, `boost`, `dash`, `slide`, `launch`, `melee`, `kick`, `grab`, `wallrun`, `vault`, `pound`, `pusher`, `checkpoint`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `impulse<action>reset` | impulse action timers reset upon a `<action>` (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |
| `impulse<action>clear` | impulse state cleared upon a `<action>` (bitwise OR) | `meter count type regen slip pusher collect-meter last-meter collect-count last-count` |

Applies to `<state>`: `crouch` (crouching), `run` (running), `sprint` (sprinting), `move` (moving), `inair` (in the air).

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `impulse<state>regenmeter` | multiplier of impulse meter regeneration while `<state>` | `value` |
| `impulse<state>regencount` | multiplier of impulse count regeneration while `<state>` | `value` |

Applies to `<action>`: `jump`, `boost`, `dash`, `slide`, `launch`, `melee`, `kick`, `grab`, `wallrun`, `vault`, `pound`, `pusher`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `impulse<action>regenmeter` | multiplier of impulse meter regeneration during a `<action>` | `value` |
| `impulse<action>regencount` | multiplier of impulse count regeneration during a `<action>` | `value` |

### balance settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `teambalance` | determines the method of team balancing; style is a player ranking (see balancestyle);<br>0 = off, 1 = by number then style, 2 = by style then number,<br>3 = by number, using swap requests, 4 = same as 3, and reassign players if necessary,<br>5 = same as 4, but by style, then number, 6 = by style during waiting, revert to 4 otherwise | — |
| `teambalancestyle` | determines the method of sorting for team balancing;<br>0 = top of list, 1 = time played, 2 = points, 3 = frags, 4 = scoretime, 5 = kdratio, 6 = combined kdratio, 7 = average scoreboard position | `value` |
| `teambalancehighest` | determines if team balancing moves the highest players in the balance sort | `value` |
| `teambalanceduel` | allow reassignments in duel | `bool` |
| `teambalanceplaying` | min players before reassignments occur | `number` |
| `teambalanceamt` | max-min offset for players per team before reassignments occur | `value` |
| `teambalancewait` | how long before reassignment can happen again | `ms` |
| `teambalancedelay` | how long before reassignments start | `ms` |
| `teambalanceswap` | allow swap requests if unable to change team | `bool` |
| `teambalancelock` | level at which one can override swap | `rank` |
| `teampersist` | when a player leaves and rejoins the game, automatically put them on the same team they had before;<br>0 = off, 1 = only attempt, 2 = forced | `value` |

### server gameplay locks (server-side configurable gameplay limitations)

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `mastermode` | set a specific mode to the server;<br>0 = open (everybody can join), 1 = veto (vetolock determines who can force a vote), 2 = locked (only moderator or higher can spawn), 3 = private (only global privs and players with the password can join the server) | `value` |
| `masterlock` | determines who can set mastermode;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `spawneditlock` | determines who may spawn in editing mode when the server is locked;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `editlock` | determines who may toggle editing when the server is locked;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `speclock` | determines who may force players to spectate;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `crclock` | determines who may use maps with an incorrect CRC integrity check;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `kicklock` | determines who may kick players;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `allowlock` | determines who may allow players;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `banlock` | determines who may ban players;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `mutelock` | determines who may mute players;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `limitlock` | determines who may limit players;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `vetolock` | determines who may force match votes;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `floodlock` | enables flood protection for everyone below a specific privilege level;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `floodmute` | automatically mute player when warned this many times | `value` |
| `floodtime` | time span to check for floody messages | `value` |
| `floodlines` | number of lines in floodtime span before too many | `value` |
| `floodwarntime` | warn a flooding player at most this often, in milliseconds | `value` |
| `floodwarnreset` | web chat forgets an address's flood warnings after this long without another, in milliseconds | `value` |
| `autospectate` | determines if dead players are moved to spectators;<br>0 = off, 1 = when remaining dead for autospecdelay | `bool` |
| `resetallowsonend` | determines when the allow list is reset;<br>0 = off, 1 = just when empty, 2 = when matches end | `value` |
| `resetbansonend` | determines when the ban list is reset;<br>0 = off, 1 = just when empty, 2 = when matches end | `value` |
| `resetmutesonend` | determines when the mute list is reset;<br>0 = off, 1 = just when empty, 2 = when matches end | `value` |
| `resetlimitsonend` | determines when the limit list is reset;<br>0 = off, 1 = just when empty, 2 = when matches end | `value` |
| `resetvarsonend` | determines when these game variables are reset;<br>0 = off, 1 = just when empty, 2 = when matches end | `value` |
| `resetmmonend` | determines when privilege mode changes are reset;<br>0 = off, 1 = just when empty, 2 = when matches end | `value` |
| `rotatemodefilter` | determines the modes which can be selected when the server selects the next map,<br>convenient to set using a sum of bit shifted mode (&lt;&lt; 1 $G_*) vars, for example: (\| (&lt;&lt; 1 $G_EDITING) (&lt;&lt; 1 $G_DEATHMATCH)) | — |
| `rotatemuts` | determines if mutators rotate when the server selects the next map;<br>0 = never rotate mutators, 1 = always rotate mutators, >1 = decrease chances the larger this value | `value` |
| `rotatemutsfilter` | determines the mutators which can be picked when the server selects the next map,<br>convenient to set using a sum of $G_M_* vars | — |
| `defaultmap` | default map, "" = random | `map` |
| `defaultmode` | default game mode;<br>1 = editing, 2 = deathmatch, 3 = ctf, 4 = dac, 5 = bomber, 6 = speedrun | `value` |
| `defaultmuts` | default mutators, convenient to set using a sum of $G_M_* vars | — |
| `rotatemaps` | determines behaviour of map rotation;<br>0 = off, 1 = sequence, 2 = random | `value` |
| `rotatemapsfilter` | 0 = off, 1 = filter based on mutators, 2 = also filter based on players | `value` |
| `rotatemode` | determines if modes rotate when the server selects the next map | `value` |
| `allowmaps` | determines which maps are allowed to be chosen without elevated privileges | `list` |
| `wipmaps` | determines which maps are works in progress | `list` |
| `mainmaps` | deathmatch maps | `list` |
| `capturemaps` | capture-the-flag maps | `list` |
| `defendmaps` | defend-the-flag maps | `list` |
| `bombermaps` | bomber-ball maps | `list` |
| `holdmaps` | hold bomber-ball maps | `list` |
| `speedrunmaps` | speedrun maps | `list` |
| `duelmaps` | duel map filter (extra filter on top of mode filter) | `list` |
| `gladiatormaps` | gladiator map filter (extra filter on top of mode filter) | `list` |
| `kingmaps` | king-of-the-hill maps | `list` |
| `modelock` | determines at which privilege level modes are locked, according to modelocktype;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `modelocktype` | determines the mode locking type;<br>0 = off, 1 = lock level only, 2 = lock level can set limited mode and higher | `value` |
| `mapsfilter` | 0 = off, 1 = filter based on mutators, 2 = also filter based on players | `value` |
| `mapslock` | determines at which privilege level maps are locked, according to mapslocktype;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `mapslocktype` | determines the maps locking type;<br>0 = off, 1 = lock level needed for maps not in allowmaps, 2 = lock level needed for maps not in the rotation | `value` |
| `varslock` | determines if vars are locked;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `votelock` | determines at which privilege level votes are locked, according to votelocktype;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `votelocktype` | determines the vote locking type;<br>0 = off, 1 = lock level only, 2 = lock level can select prevmaps | `value` |
| `votewait` | time in milliseconds before a player may cast another vote (to avoid flooding) | `milliseconds` |
| `votestyle` | determines how mid-match votes are handled;<br>0 = votes don't pass mid-match, 1 = passes if votethreshold is met, 2 = passes if unanimous | `value` |
| `votethreshold` | auto-pass votes when this many agree | `value` |
| `voteinterm` | determines how intermission votes are handled;<br>0 = must wait entire time, 1 = passes if votethreshold is met, 2 = passes if unanimous, 3 = passes after waiting then selects a random vote | `value` |
| `votefilter` | filters out spectators that have not voted from the threshold | `value` |
| `smallmapmax` | maximum number of players for a small map | `value` |
| `mediummapmax` | maximum number of players for a medium map | `value` |
| `maxalive` | only allow this*maxplayers to be alive at once, 0 = off | `value` |
| `maxalivequeue` | toggle queue system (used if number of players exceeds maxalive*numplayers for current map);<br>0 = prohibits leaving spectator, 1 = players enter queue | `value` |
| `maxaliveminimum` | when maxalive is on, always allow at least this many players to be alive | `value` |
| `maxalivethreshold` | when maxalive is on, always allow at least this fraction of connected clients to be alive | `value` |
| `spawnrotate` | spawn point rotation;<br>0 = let client decide, 1 = sequence, 2 = random | `value` |
| `spawnprotect` | time in milliseconds after spawning players cannot be damaged | `milliseconds` |
| `duelprotect` | time in milliseconds after spawning players cannot be damaged in duel/survivor matches | `milliseconds` |
| `instaprotect` | time in milliseconds after spawning players cannot be damaged in instagib matches | `milliseconds` |
| `protectbreakshoot` | determines if firing a weapon breaks spawn protection | `value` |
| `protectbreakcook` | determines if cooking a weapon breaks spawn protection | `value` |
| `protectbreakaffinity` | determines if picking up an affinity breaks spawn protection | `value` |

### server settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `serverspectators` | number of spectator slots, -1 = same as serverclients | `value` |
| `serverdupclients` | maximum number of clients allowed from the same address, 0 = unlimited | `value` |
| `connectlock` | players below this privilege level are treated as requiring a password to connect;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `queryinterval` | rebuild the client list for server queries this often | `milliseconds` |
| `masterinterval` | keep the master server connection alive this often | `milliseconds` |
| `connecttimeout` | disconnect clients whose connection attempt takes longer than this | `milliseconds` |
| `allowtimeout` | temporary allows last this long | `milliseconds` |
| `bantimeout` | temporary bans last this long | `milliseconds` |
| `mutetimeout` | temporary mutes last this long | `milliseconds` |
| `limittimeout` | temporary team change limits last this long | `milliseconds` |
| `excepttimeout` | temporary excepts last this long | `milliseconds` |
| `messagelock` | determines who may send chat messages;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `messagelength` | maximum length of a chat message | `value` |
| `censorwords` | list of words censored in chat messages | `list` |
| `setinfolock` | determines who may change their player info;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `setinfowait` | minimum time between player info changes | `milliseconds` |
| `demokeep` | determines if demos that don't run to the end of the match are kept | `bool` |
| `teamlock` | determines who may change the team of other players;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `exceptlock` | determines who may except players from bans, mutes and limits;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `spawnlock` | determines who may spawn when the server is locked;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `iphostlock` | determines who may see player addresses and hosts;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `overflowlock` | players at or above this privilege level are not kicked for message overflow;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `overflowsize` | kick players with this many or more queued messages | `value` |
| `eventfuture` | drop timed events scheduled more than this far ahead, 0 = off | `milliseconds` |
| `eventlimit` | drop events when a client has this many queued, counting each hit and shot they carry, 0 = unlimited | `value` |
| `teamkilllock` | players at or above this privilege level are exempt from team kill warnings and punishments;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `teamkillrelax` | forgive human-on-bot team kills;<br>0 = off, 1 = forgive, 2 = forgive and don't dock points | `value` |
| `resetexceptsonend` | determines when the except list is reset;<br>0 = off, 1 = just when empty, 2 = when matches end | `value` |
| `smallmaps` | maps preferred when the player count is at most smallmapmax | `list` |
| `mediummaps` | maps preferred when the player count is at most mediummapmax | `list` |
| `largemaps` | maps preferred when the player count is above mediummapmax | `list` |
| `mutslockforce` | mutators that are always applied to requested games, convenient to set using a sum of $G_M_* vars | — |
| `rotatecycle` | force a map rotation after this many minutes, 0 = off | `minutes` |
| `waitforplayers` | wait for players before starting a match;<br>0 = off, 1 = until they load the map, 2 = until they leave spectator | `value` |
| `waitforplayertime` | wait at most this long for players to meet the waitforplayers criteria | `milliseconds` |
| `waitforplayerload` | wait this long for players to load the map before scheduling map requests, or in edit mode before a joining player uses their own copy | `milliseconds` |
| `waitforplayermaps` | wait this long for sendmap and getmap requests, and for a player sending the map in edit mode | `milliseconds` |
| `waitforplayerinfo` | wait at least this long for players to send their info | `milliseconds` |
| `mapsnapshotlimit` | largest map sent to a player joining an editing game | `megabytes` |
| `mapreplaylimit` | most messages kept for a player while their map is sent, before starting over | `kilobytes` |
| `resetvars` | resets game variables to their defaults; map variables are only reset if all is true | `all` |
| `savevars` | saves the current game variables to the server's config | — |
| `resetconfig` | reloads the server configuration | — |
| `botoverridelock` | determines who may override bots aiming at them on another team;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `botoverrideffalock` | determines who may command bots in free-for-all games;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |

### gameplay settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `instaresizeamt` | each kill adds this much size in insta-resize | `value` |
| `regendelay` | time in milliseconds after being damage before normal regeneration resumes | `milliseconds` |
| `regentime` | regenerate health this often | `milliseconds` |
| `regenhealth` | amount of health regeneration gives | `value` |
| `regendecay` | if over maxhealth, decay this amount each regen | `value` |
| `kamikaze` | determines the level of kamikaze events;<br>0 = never, 1 = holding grenade, 2 = have grenade, 3 = always | `value` |
| `itemspawntime` | time in milliseconds before items (re)spawn | `milliseconds` |
| `itemspawndelay` | time in milliseconds after map start items first spawn | `milliseconds` |
| `itemspawnstyle` | determines the timing of item spawning at map start;<br>0 = all at once, 1 = staggered, 2 = random, 3 = randomise between both | `value` |
| `timelimit` | time in minutes before round ends, for modes without an explicit timelimit;<br>0 = off | `time` |
| `timelimitbomber` | time in minutes before a bomber-ball match ends;<br>0 = off | `time` |
| `timelimitbomberhold` | time in minutes before a hold bomber-ball match ends;<br>0 = off | `time` |
| `timelimitcapture` | time in minutes before a capture-the-flag match ends;<br>0 = off | `time` |
| `timelimitdefend` | time in minutes before a defend-and-control match ends;<br>0 = off | `time` |
| `timelimitdefendking` | time in minutes before a king defend-and-control match ends;<br>0 = off | `time` |
| `timelimitduel` | time in minutes before a duel match ends;<br>0 = off | `time` |
| `timelimitgladiator` | time in minutes before a gladiator deathmatch ends;<br>0 = off | `time` |
| `timelimitspeedrun` | time in minutes before a speedrun match ends;<br>0 = off | `time` |
| `timelimitspeedrungauntlet` | time in minutes before a gauntlet speedrun match ends;<br>0 = off | `time` |
| `timelimitsurvivor` | time in minutes before a survivor deathmatch ends;<br>0 = off | `time` |
| `overtimeallow` | if scores are equal, go into overtime | `value` |
| `overtimelimit` | maximum time overtime may last, 0 = forever | `minutes` |
| `intermlimit` | time intermission lasts before the vote menu comes up, 0 = skip | `milliseconds` |
| `votelimit` | time in milliseconds intermission voting lasts | `milliseconds` |
| `damageself` | determines if the player can damage themselves;<br>0 = off, 1 = either hurt self or use damageteam rules | `value` |
| `damageselfscale` | determines how much self-damage is dealt;<br>0 = off, anything else = scale for damage | `value` |
| `damageteamscale` | determines how much team damage is dealt;<br>0 = off, anything else = scale for damage | `value` |
| `enemyspawntime` | determine length of time before enemies respawn | `milliseconds` |
| `enemyspawndelay` | determine length of time after map start enemies first spawn | `milliseconds` |
| `enemyspawnstyle` | determines enemy spawning style, 0 = all at once, 1 = staggered, 2 = random, 3 = randomise between both | `value` |
| `playerscale` | defines the size of players | `value` |
| `botscale` | defines the size of bots | `value` |
| `captureresetdelay` | time in milliseconds before a dropped flag automatically resets | `milliseconds` |
| `healthscalehard` | multiplier of spawn health with the hard mutator | `value` |
| `maxhealth` | spawnhealth * maxhealth defines the maximum amount of health that can be reached (e.g. standing next to a friendly goal) | `value` |
| `maxhealthvampire` | spawnhealth * maxhealthvampire defines the maximum amount of health that can be reached by damaging other players in vampire | `value` |
| `minresizescale` | defines the smallest scaled size a player can become in a match with the resize mutator enabled | `value` |
| `maxresizescale` | defines the largest scaled size a player can become in a match with the resize mutator enabled | `value` |
| `checkpointspawn` | determines if you will respawn at checkpoints after material deaths | `value` |
| `duelmaxqueued` | number of players that can be queued for duel. 0 = any number of players | — |
| `survivormaxqueued` | number of players that can be queued for survivor. 0 = any number of players | — |
| `followaiming` | determines aim direction when following a player | `[aim in thirdperson] [aim in first person]` |
| `spectvfirstperson` | determines aim direction of spectv;<br>0 = aim in direction followed player is facing, 1 = aim in direction determined by spectv when dead, 2 = always aim in direction | `value` |
| `spectvthirdperson` | determines aim direction of spectv;<br>0 = aim in direction followed player is facing, 1 = aim in direction determined by spectv when dead, 2 = always aim in direction | `value` |
| `previousmaps` | list of previously played maps | — |
| `maphistory` | remember this many maps that can't be voted again if votelock is set | `value` |
| `intermmode` | determines camera style in intermission;<br>0 = float, 1 = tv | `value` |
| `coopbalance` | in coop, number of bots on each enemy team for each human player | `value` |
| `serverclients` | maximum number of allowed clients | `value` |
| `serverdesc` | server description | `text` |
| `servermotd` | server message of the day | `text` |
| `serveropen` | determines which master modes the server allows;<br>0 = all, with privilege claims auto-approved, 1 = open only, with privilege claims auto-approved,<br>2 = open, veto or locked, with privilege claims auto-approved (for public coop-editing), 3 = open or veto, privilege only by moderator or above | `value` |
| `autoadmin` | determines if authorities claim status by default | `value` |
| `aihostnum` | multiply number of bots hosted by this much for the bot hosting decision | `value` |
| `aihostping` | multiply host ping by this much for the bot hosting decision | `value` |
| `aihostshift` | require this difference before shifting bot hosts | `value` |
| `airefreshdelay` | delay imposed before the AI manager reorganises their setup | `milliseconds` |
| `modelockfilter` | determines the modes which are allowed to be used as dictated by modelock,<br>convenient to set using a sum of bit shifted mode (&lt;&lt; 1 $G_*) vars,<br>example: (\| (&lt;&lt; 1$G_EDITING) (&lt;&lt; 1$G_DEATHMATCH)) | — |
| `mutslockfilter` | determines the mutators which are allowed to be used as dictated by modelock,<br>convenient to set using a sum of $G_M_* vars | — |
| `gamespeed` | percentage of default gameplay speed | `value` |
| `gamepaused` | pauses the game, automatically unset by server | `value` |
| `botskillmin` | minimum randomly assigned AI skill level | `value` |
| `botskillmax` | maximum randomly assigned AI skill level | `value` |
| `coopskillmin` | minimum randomly assigned AI skill level in coop | `value` |
| `coopskillmax` | maximum randomly assigned AI skill level in coop | `value` |
| `enemyskillmin` | minimum randomly assigned skill level for neutral actors in onslaught | `value` |
| `enemyskillmax` | maximum randomly assigned skill level for neutral actors in onslaught | `value` |
| `botlimit` | maximum number of bots allowed, regardless of any other variable/setting | `value` |
| `botbalance` | determines bot balancing method;<br>-1 = always use numplayers, 0 = don't balance, 1 or more = fill to at least this many players | `value` |

Actor variables — `<actor>` is one of: `player`, `bot`, `turret`, `grunt`, `drone`, `roller`, `hazard`, `janitor`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<actor>abilities` | allowed actions for `<actor>s`. | `move jump crouch melee primary secondary pushable affinity regen kamikaze living damage ammo float` |
| `<actor>collide` | determines which targets can be attacked | `players bots enemies` |
| `<actor>teamdamage` | determines which targets can take team damage | `players bots enemies ghosts` |
| `<actor>health` | spawn health | `value` |
| `<actor>scale` | actor model scale, also scales movement speed accordingly | `value` |
| `<actor>speed` | base movement speed | `value` |
| `<actor>impulsespeed` | parkour and boost speed | `value` |
| `<actor>impulse` | allowed impulse types (bitwise OR) | `jump boost dash slide launch melee kick grab wallrun vault pound pusher` |
| `<actor>damage` | multiplier of damage dealt | `value` |
| `<actor>coastscale` | multiplier of the world coast, 0 disables coasting drag | `value` |
| `<actor>weight` | base weight, affects how quickly the actor falls | `value` |
| `<actor>buoyancy` | base buoyancy, affects how the actor floats in liquid | `value` |
| `<actor>speedextra` | base movement speed added in single weapon modes | `value` |
| `<actor>impulsespeedextra` | parkour and boost speed added in single weapon modes | `value` |
| `<actor>weightextra` | weight added in single weapon modes | `value` |
| `<actor>buoyancyextra` | buoyancy added in single weapon modes | `value` |
| `<actor>speedprize` | movement speed multiplier while carrying a prize | `value` |
| `<actor>sprinttime` | time spent running before the actor starts sprinting | `milliseconds` |
| `<actor>airtolerance` | time after leaving the ground that the actor is still treated as on the floor | `milliseconds` |
| `<actor>liquidboost` | upward velocity given when surfacing from liquid | `value` |
| `<actor>evadedelay` | time an actor waits after evading before it can evade again when hit, 0 = never evade | `milliseconds` |
| `<actor>evadespeed` | speed of the sideways burst an actor makes when it evades | `value` |
| `<actor>lockdelay` | time an actor warns its target with a beam and a rising tone before it opens fire, 0 = fire without warning | `milliseconds` |
| `<actor>lockreset` | time an actor can hold fire after its last shot before it has to warn its target again | `milliseconds` |
| `<actor>spotdelay` | time before an actor can spot the same player again | `milliseconds` |
| `<actor>spotradius` | distance within which the enemies of an actor that spots a player go after them, 0 = never spot | `value` |
| `<actor>fuse` | time a kamikaze actor counts down after reaching its target before it explodes, 0 = explode at once | `milliseconds` |
| `<actor>fuseflashbright` | brightness added to an armed kamikaze actor's glow at the height of each flash | `value` |
| `<actor>fuseflashtime` | how long each flash of an armed kamikaze actor lasts | `milliseconds` |
| `<actor>fusepulsefast` | time between an armed kamikaze actor's flashes and beeps as its fuse runs out | `milliseconds` |
| `<actor>fusepulseslow` | time between an armed kamikaze actor's flashes and beeps when its fuse starts | `milliseconds` |
| `<actor>hurtstop` | time an AI actor stops moving after being hurt, 0 = never | `milliseconds` |
| `<actor>maxcarry` | maximum number of weapons carried | `value` |
| `<actor>weapondeploy` | weapon selected on spawn and used by AI when deploying, -1 = none | `value` |
| `<actor>spawndelayedit` | time in milliseconds before respawn in edit mode | `milliseconds` |
| `<actor>aiavoidteam` | AI avoids waypoints in front of friendly actors whose aim is within this dot product, 0 = off | `value` |
| `<actor>aifloatheight` | height above its target spot that a floating AI flies at | `distance` |
| `<actor>aifloatduck` | distance a floating AI drops to get past an obstruction | `distance` |
| `<actor>aipitchangle` | pitch above which AI jumps, or below which it crouches, to reach a target | `degrees` |
| `<actor>aiyawscale` | multiplier of the AI's yaw turning speed | `value` |
| `<actor>aipitchscale` | multiplier of the AI's pitch turning speed | `value` |
| `<actor>aihackchance` | one in this many chance of a qualifying hit hacking an enemy actor, 0 = off | `value` |
| `<actor>aihackweap` | weapon that can hack an enemy actor | `value` |
| `<actor>aihacktype` | firing actions of aihackweap that can hack an enemy actor (bitwise OR) | `primary secondary primary-flak secondary-flak` |
| `<actor>vname` | generic name for system messages | `string` |
| `<actor>spawngrenades` | spawn with grenades;<br>0 = never, 1 = all but instagib/speedrun, 2 = always | `value` |
| `<actor>spawnmines` | spawn with mines;<br>0 = never, 1 = all but instagib/speedrun, 2 = always | `value` |
| `<actor>weaponspawn` | weapon players spawn with, defaults to pistol (1) | `value` |
| `<actor>weaponinsta` | weapon players spawn with in instagib, defaults to rifle (8) | `value` |
| `<actor>weaponspeedrun` | weapon players spawn with in speedrun, defaults to claw (0) | `value` |
| `<actor>weapongladiator` | weapon players spawn with in gladiator, defaults to claw (0) | `value` |
| `<actor>weaponkaboom` | weapon players spawn with in kaboom, defaults to grenades (11) | `value` |
| `<actor>weaponmedieval` | weapon players spawn with in medieval, defaults to sword (2) | `value` |
| `<actor>spawndelay` | time in milliseconds before respawn in most modes | `millisecond` |
| `<actor>spawndelayinstascale` | time multiplier before respawn in instagib mutated modes | `value` |
| `<actor>spawndelaycapture` | time in milliseconds before respawn in capture mode | `milliseconds` |
| `<actor>spawndelaybomber` | time in milliseconds before respawn in bomber mode | `milliseconds` |
| `<actor>spawndelaydefend` | time in milliseconds before respawn in defend mode | `milliseconds` |
| `<actor>spawndelayspeedrun` | time in milliseconds before respawn in speedrun mode | `milliseconds` |
| `<actor>spawndelaygauntlet` | time in milliseconds before respawn in gauntlet mode | `milliseconds` |
| `botoffset` | increases or decreases the amount of bots starting from the numplayers value of the current map | `value` |
| `mapcomplete` | enables map completion for a given command or alias;<br>this enables tab-completion for the first argument of an already existing command or alias,<br>the completion uses files that ends with 'mpz' in the 'maps' folders of the game's homedir, and its data dir(s) | `command` |
| `enemybalance` | number of enemies spawned at each actor spawn point | `value` |
| `radialscale` | multiply explosion radius by this much | `value` |
| `radiallimited` | multiply explosion radius by this much in single weapon modes (eg. instagib) | `value` |
| `damagescale` | multiply all damage by this much | `value` |
| `kickpushscale` | multiply kick pushes from weapons by this much | `value` |
| `kickpushcrouch` | multiply kick pushes from weapons by this much when crouching | `value` |
| `kickpushsway` | multiply kick push effect on hud gun sway by this much | `value` |
| `kickpushzoom` | multiply kick pushes from weapons by this much when zoomed | `value` |
| `lasthitdelay` | time in milliseconds before a hit no longer is counted as a last hit | `value` |
| `multikilldelay` | time in milliseconds multiple kills in a row must occur | `value` |
| `spreecount` | number of consecutive frags for each spree level | `value` |
| `dominatecount` | number of frags on a single player without revenge before it is considered domination | `value` |
| `numplayers` | number of players the map is designed for, 0 = determine from number of spawns | `value` |
| `maxplayers` | maximum number of players for the map, 0 = numplayers*3 | `value` |
| `healthscale` | multiplier of spawn health | `value` |
| `vampirescale` | multiplier of damage dealt that is returned to the attacker as health with the vampire mutator | `value` |
| `noweapburn` | enables burn residual effects, 0 = off | `bool` |
| `noweapbleed` | enables bleed residual effects, 0 = off | `bool` |
| `noweapshock` | enables shock residual effects, 0 = off | `bool` |
| `noweapcorrode` | enables corrode residual effects, 0 = off | `bool` |
| `shocktwitchvel` | velocity of the random twitching of ragdolls caused by shock residuals | `value` |
| `survivorprotect` | time in milliseconds after spawning players cannot be damaged in survivor matches | `milliseconds` |
| `radardisabled` | forces the radar off | `bool` |
| `radardistlimit` | forces the radar to this distance at most, 0 = off | `distance` |
| `balancemaps` | determines if map team balancing is used;<br>-1 = map default, 0 = off, 1 = capture/defend/bomber only, 2 = also with team spawns, 3 = forced | `value` |
| `balancereset` | reset players when balancing them;<br>0 = off, 1 = only when necessary, 2 = always | `value` |
| `balancedelay` | delay before mapbalance switches teams | `milliseconds` |
| `balancenospawn` | prevent respawning while waiting to balance | `bool` |
| `balanceduke` | enables map balancing in duel and survivor | `bool` |
| `fraglimit` | number of frags required to end the match in classic, 0 = off | `value` |
| `timelimitspeedrunlapped` | time in minutes before a lapped speedrun match ends;<br>0 = off | `time` |
| `spreeprize` | prize given for each killing spree level;<br>-1 = random, 0 = none, 1 = grenade, 2 = mine, 3 = rocket, 4 = minigun, 5 = jetsaw, 6 = eclipse | `value` |
| `spreemaxprize` | prize given for reaching the highest killing spree level;<br>-1 = random, 0 = none, 1 = grenade, 2 = mine, 3 = rocket, 4 = minigun, 5 = jetsaw, 6 = eclipse | `value` |
| `spreebreakprize` | prize given for ending an opponent's killing spree;<br>-1 = random, 0 = none, 1 = grenade, 2 = mine, 3 = rocket, 4 = minigun, 5 = jetsaw, 6 = eclipse | `value` |
| `revengeprize` | prize given for getting revenge against a dominating player;<br>-1 = random, 0 = none, 1 = grenade, 2 = mine, 3 = rocket, 4 = minigun, 5 = jetsaw, 6 = eclipse | `value` |
| `itemannouncespawn` | announce the spawning of these items | `value` |
| `itemannounceuse` | announce the use of these items | `value` |
| `itemannouncedrop` | announce the dropping of these items | `value` |
| `quakedelta` | amount screen shake decays by over quakefade | `value` |
| `quakefade` | time screen shake takes to decay by quakedelta | `milliseconds` |
| `quakewobble` | maximum view roll caused by screen shake | `value` |
| `quakelimit` | maximum amount of screen shake | `value` |
| `pushscale` | multiply all hit pushes by this much | `value` |
| `pushlimited` | multiply all hit pushes by this much in single weapon modes (eg. instagib) | `value` |
| `stunscale` | multiply all stuns by this much | `value` |
| `stunlimited` | multiply all stuns by this much in single weapon modes (eg. instagib) | `value` |
| `velscale` | multiply all hit velocities by this much | `value` |
| `vellimited` | multiply all hit velocities by this much in single weapon modes (eg. instagib) | `value` |
| `hitpushscale` | multiply push from hits by this much | `value` |
| `deadpushscale` | multiply push from hits that result in a frag by this much | `value` |
| `wavepushscale` | multiply push from explosion waves by this much | `value` |
| `hitstunscale` | multiply stun from hits by this much | `value` |
| `deadstunscale` | multiply stun from hits that result in a frag by this much | `value` |
| `wavestunscale` | multiply stun from explosion waves by this much | `value` |
| `hitvelscale` | multiply velocity from hits by this much | `value` |
| `deadvelscale` | multiply velocity from hits that result in a frag by this much | `value` |
| `wavevelscale` | multiply velocity from explosion waves by this much | `value` |
| `gladiatorregen` | allow regeneration in gladiator | `bool` |
| `gladiatorradialscale` | multiply explosion radius by this much in gladiator | `value` |
| `gladiatorpushscale` | multiply all push by this much in gladiator | `value` |
| `gladiatorextrapushscale` | multiply all push by this much times maxhealth/health in gladiator | `value` |
| `gladiatorhitpushscale` | multiply push from hits by this much in gladiator | `value` |
| `gladiatorextrahitpushscale` | multiply push from hits by this much times maxhealth/health in gladiator | `value` |
| `gladiatordeadpushscale` | multiply push from hits that result in a frag by this much in gladiator | `value` |
| `gladiatorextradeadpushscale` | multiply push from hits that result in a frag by this much times maxhealth/health in gladiator | `value` |
| `gladiatorwavepushscale` | multiply push from explosion waves by this much in gladiator | `value` |
| `gladiatorextrawavepushscale` | multiply push from explosion waves by this much times maxhealth/health in gladiator | `value` |
| `gladiatorstunscale` | multiply all stun by this much in gladiator | `value` |
| `gladiatorextrastunscale` | multiply all stun by this much times maxhealth/health in gladiator | `value` |
| `gladiatorhitstunscale` | multiply stun from hits by this much in gladiator | `value` |
| `gladiatorextrahitstunscale` | multiply stun from hits by this much times maxhealth/health in gladiator | `value` |
| `gladiatordeadstunscale` | multiply stun from hits that result in a frag by this much in gladiator | `value` |
| `gladiatorextradeadstunscale` | multiply stun from hits that result in a frag by this much times maxhealth/health in gladiator | `value` |
| `gladiatorwavestunscale` | multiply stun from explosion waves by this much in gladiator | `value` |
| `gladiatorextrawavestunscale` | multiply stun from explosion waves by this much times maxhealth/health in gladiator | `value` |
| `gladiatorvelscale` | multiply all velocity by this much in gladiator | `value` |
| `gladiatorextravelscale` | multiply all velocity by this much times maxhealth/health in gladiator | `value` |
| `gladiatorhitvelscale` | multiply velocity from hits by this much in gladiator | `value` |
| `gladiatorextrahitvelscale` | multiply velocity from hits by this much times maxhealth/health in gladiator | `value` |
| `gladiatordeadvelscale` | multiply velocity from hits that result in a frag by this much in gladiator | `value` |
| `gladiatorextradeadvelscale` | multiply velocity from hits that result in a frag by this much times maxhealth/health in gladiator | `value` |
| `gladiatorwavevelscale` | multiply velocity from explosion waves by this much in gladiator | `value` |
| `gladiatorextrawavevelscale` | multiply velocity from explosion waves by this much times maxhealth/health in gladiator | `value` |
| `darknessenv` | brightness of the environment with the dark mutator | `value` |
| `darknessglow` | brightness of glowing surfaces with the dark mutator | `value` |
| `darknessaura` | brightness of player auras with the dark mutator | `value` |
| `darknessui` | brightness of world user interfaces with the dark mutator | `value` |
| `darknesssun` | brightness of the sun with the dark mutator | `value` |
| `darknesspart` | brightness of particles with the dark mutator | `value` |
| `darknessflashcolourmin` | minimum brightness of each channel of the flashlight colour with the dark mutator, 0 = off | `value` |
| `darknessflashcolourmax` | maximum brightness of each channel of the flashlight colour with the dark mutator, 0 = off | `value` |
| `darknessflashradiusmin` | minimum flashlight radius with the dark mutator, 0 = off | `distance` |
| `darknessflashradiusmax` | maximum flashlight radius with the dark mutator, 0 = off | `distance` |
| `darknessflashlevel` | flashlight brightness with the dark mutator | `value` |
| `darknessflashspot` | flashlight spot angle with the dark mutator | `degrees` |
| `gibweight` | weight of giblets (body parts) | `value` |
| `gibbuoyancymin` | minimum buoyancy of giblets (body parts), randomised up to gibbuoyancymax | `value` |
| `gibbuoyancymax` | maximum buoyancy of giblets (body parts) | `value` |
| `giblimit` | maximum number of giblets (body parts) in one burst | `value` |
| `gibpieces` | maximum number of pieces a player breaks into | `value` |
| `gibchancevanity` | percentage chance of a player's vanity items being dropped | `value` |
| `gibchancepieces` | percentage chance of a player breaking into pieces | `value` |
| `gibchancecollects` | percentage chance of collected items being dropped | `value` |
| `gibdamage` | number of giblets is damage divided by health times this | `value` |
| `gibheadless` | number of giblets is damage divided by health times this for decapitations | `value` |
| `gibobliterated` | number of giblets is damage divided by health times this for obliterations | `value` |
| `vanityelasticity` | coefficient of restitution for dropped vanity items hitting surfaces | `value` |
| `vanityrelativity` | factor by which player velocity is transferred to dropped vanity items | `value` |
| `vanityliquidcoast` | speed at which dropped vanity items coast through liquids | `value` |
| `vanityweight` | weight of dropped vanity items | `value` |
| `vanitybuoyancy` | buoyancy of dropped vanity items | `value` |
| `debriselasticity` | coefficient of restitution for debris hitting surfaces | `value` |
| `debrisliquidcoast` | speed at which debris coasts through liquids | `value` |
| `debrisweight` | weight of debris | `value` |
| `debrisbuoyancy` | buoyancy of debris | `value` |
| `ejectfade` | time ejected shell casings last, plus a random amount up to this | `milliseconds` |
| `ejectelasticity` | coefficient of restitution for ejected shell casings hitting surfaces | `value` |
| `ejectrelativity` | factor by which player velocity is transferred to ejected shell casings | `value` |
| `ejectliquidcoast` | speed at which ejected shell casings coast through liquids | `value` |
| `ejectweight` | weight of ejected shell casings | `value` |
| `ejectbuoyancy` | buoyancy of ejected shell casings | `value` |
| `itemcollide` | collision properties of dropped items (bitwise OR) | `COLLIDE_TRACE COLLIDE_SCAN COLLIDE_LENGTH COLLIDE_PROJ COLLIDE_OWNER IMPACT_GEOM IMPACT_PLAYER IMPACT_SHOTS BOUNCE_GEOM BOUNCE_PLAYER BOUNCE_SHOTS DRILL_GEOM DRILL_PLAYER DRILL_SHOTS STICK_GEOM STICK_PLAYER` |
| `itemextinguish` | determines when dropped items are extinguished (bitwise OR) | `water death-material destroy` |
| `iteminteracts` | map entities dropped items interact with (bitwise OR) | `teleports pushers` |
| `itemfadetime` | time dropped items take to fade | `milliseconds` |
| `itemelasticity` | coefficient of restitution for dropped items hitting surfaces | `value` |
| `itemrelativity` | factor by which player velocity is transferred to dropped items | `value` |
| `itemliquidcoast` | speed at which dropped items coast through liquids | `value` |
| `itemweight` | weight of dropped items | `value` |
| `itembuoyancy` | buoyancy of dropped items | `value` |
| `itemspeeddelta` | rate at which dropped items turn towards their target | `value` |
| `itemspeedmin` | minimum speed of dropped items | `value` |
| `itemspeedmax` | maximum speed of dropped items, 0 = no limit | `value` |
| `itemrepulsion` | distance within which dropped items push each other apart, 0 = off | `distance` |
| `itemrepelspeed` | speed at which dropped items push each other apart | `value` |
| `itemrepeldelay` | time after being dropped before items push each other apart | `milliseconds` |
| `itemdropminspeed` | minimum speed of dropped items | `value` |
| `itemdropspreadxy` | horizontal angle between items dropped at the same time | `degrees` |
| `itemdropspreadz` | vertical angle between items dropped at the same time | `degrees` |
| `aihunttime` | how long bots chase or escort in objective modes before re-evaluating | `milliseconds` |
| `aiweightpull` | multiplier of waypoint pull when bots weigh routes | `value` |
| `aiweightdrag` | divisor of waypoint drag when bots weigh routes, 0 = ignore drag | `value` |
| `botbalancescale` | multiply the bot balance by this much | `value` |
| `botbalanceduel` | bot balancing method in duel;<br>-1 = always use numplayers, 0 = don't balance, 1 or more = fill to at least this many players | `value` |
| `botbalancesurvivor` | bot balancing method in survivor;<br>-1 = always use numplayers, 0 = don't balance, 1 or more = fill to at least this many players | `value` |
| `botskillfrags` | adjust bot skill by this much for each frag they have | `value` |
| `botskilldeaths` | adjust bot skill by this much for each death they have | `value` |
| `coopskillfrags` | adjust bot skill by this much for each frag they have in coop | `value` |
| `coopskilldeaths` | adjust bot skill by this much for each death they have in coop | `value` |
| `botmalenames` | list of names for male bots | `list` |
| `botfemalenames` | list of names for female bots | `list` |
| `botmalevanities` | list of vanity items for male bots | `list` |
| `botfemalevanities` | list of vanity items for female bots | `list` |
| `botmalemixers` | list of mixers for male bots | `list` |
| `botfemalemixers` | list of mixers for female bots | `list` |
| `botcolourseed` | random bot properties determined by colour as a seed (bitwise OR) | `skill name model loadout` |
| `botrandomcase` | bots randomise the case of the first letter of their name if rnd(botrandomcase) > 0 | `value` |
| `enemylimit` | maximum number of enemies | `value` |
| `prizegrenade` | relative chance of a random prize being a grenade | `value` |
| `prizemine` | relative chance of a random prize being a mine | `value` |
| `prizerocket` | relative chance of a random prize being a rocket | `value` |
| `prizeminigun` | relative chance of a random prize being a minigun | `value` |
| `prizejetsaw` | relative chance of a random prize being a jetsaw | `value` |
| `prizeeclipse` | relative chance of a random prize being an eclipse | `value` |

Overtime settings — `<mode>` is one of: `duel`, `survivor`, `gladiator`, `capture`, `defend`, `defendking`, `bomber`, `bomberhold`, `speedrun`, `speedrunlapped`, `speedrungauntlet`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `overtimeallow<mode>` | if scores are equal in `<mode>`, go into overtime | `value` |
| `overtimelimit<mode>` | maximum time overtime may last in `<mode>`, 0 = forever | `minutes` |

Team variables — `<team>` is one of: `neutral`, `alpha`, `omega`, `enemy`, `environment`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `team<team>name` | display name of the `<team>` team | `string` |
| `team<team>colour` | colour of the `<team>` team | `colour` |
| `obitspawn` | death message for spawning inside solid matter | `string` |
| `obitspectator` | death message for switching to spectator while alive | `string` |
| `obitdrowned` | death message for drowning | `string` |
| `obitmelted` | death message for dying in lava | `string` |
| `obitchoked` | death message for dying in volumetric fog material | `string` |
| `obitdeathmat` | death message for entering death material | `string` |
| `obithurtmat` | death message for dying in hurt material | `string` |
| `obitlost` | death message for falling out of the map | `string` |
| `obitwrongcp` | death message for hitting the wrong checkpoint in speedrun | `string` |
| `obitburn` | death message for being burned to death by another player | `string` |
| `obitburnself` | death message for burning to death by one's own hand | `string` |
| `obitbleed` | death message for bleeding to death from another player | `string` |
| `obitbleedself` | death message for bleeding to death by one's own hand | `string` |
| `obitshock` | death message for being shocked to death by another player | `string` |
| `obitshockself` | death message for shocking oneself to death | `string` |
| `obitcorrode` | death message for being corroded to death by another player | `string` |
| `obitcorrodeself` | death message for corroding oneself to death | `string` |
| `obitobliterated` | death message for being obliterated (gibbed) | `string` |
| `obitheadless` | death message for being decapitated | `string` |
| `obitsuicide` | death message for suicides that match no other obituary | `string` |
| `obitkilled` | death message for kills that match no other obituary | `string` |
| `obitsplat` | death message for touching a lethal map model | `string` |
| `obitsquish` | death message for being crushed by moving geometry | `string` |
| `obitjanitor` | death message for being disposed of as trash by a janitor | `string` |

### gamemode-specific settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `duelreset` | determines if duel/survivor winner should be sent back to respawn for next round | `value` |
| `duelclear` | determines if items are reset at the end of each round | `value` |
| `duelcooloff` | cool off period before duel goes to next round | `milliseconds` |
| `duelcycle` | determines if players are force-cycled after a certain number of wins (0 = off, 1 = non-team games, 2 = team games, 3 = both) | `value` |
| `duelcycles` | maximum wins in a row before force-cycling (0 = num team/total players) | `value` |
| `pointlimit` | number of points required to end the round (and win) in deathmatch modes | `value` |
| `capturelimit` | number of captures required to end the round (and win) in ctf | `value` |
| `capturepoints` | points added to score for capturing flag | `value` |
| `capturepickuppoints` | points added to score for picking up enemy flag | `value` |
| `capturethreshold` | automatically drop the flag if the flag-carrier "warps" more than this distance | `distance` |
| `capturebuffing` | buff circumstances | `[near own flag at its base] [near own loose flag] [holding own flag] [near teammate holding own flag] [holding enemy flag] [near teammate holding enemy flag] [near own flag base]` |
| `capturebuffdelay` | buffed when guarding, and for this long after | `milliseconds` |
| `capturebuffarea` | radius around a flag or carrier in which buffing occurs | `distance` |
| `capturebuffdamage` | multiply outgoing damage by this much when buffed | `value` |
| `capturebuffshield` | divide incoming damage by this much when buffed | `value` |
| `captureregenbuff` | 0 = off, 1 = modify regeneration when buffed | `value` |
| `captureregendelay` | regen this often when buffed | `milliseconds` |
| `captureregenextra` | add this to regen when buffed | `value` |
| `defendlimit` | number of points required to end the match in defend and control, 0 = off | `value` |
| `defendinterval` | time in milliseconds to add one tick to the secure gauge | `milliseconds` |
| `defendpoints` | number of points given in dac | `value` |
| `defendoccupy` | ticks needed to overthrow or secure a control area | `value` |
| `defendking` | ticks needed to secure in king-of-the-hill | `value` |
| `defendhold` | ticks an area must remain secured in order to score | `value` |
| `defendflags` | flags to init and how;<br>0 = init all (neutral), 1 = init neutral and team only, 2 = init team only, 3 = init all (team + neutral + converted) | `value` |
| `defendbuffing` | buff circumstances | `[when guarding] [when securing] [even when enemies are present]` |
| `defendbuffoccupy` | for defendbuffing&4, an area must be occupied this much (0-1) before buffing | `value` |
| `defendbuffdelay` | buffed for this long after leaving | `milliseconds` |
| `defendbuffarea` | radius around a control area in which buffing occurs, 0 = anywhere | `distance` |
| `defendbuffdamage` | multiply outgoing damage by this much when buffed | `value` |
| `defendbuffshield` | divide incoming damage by this much when buffed | `value` |
| `defendregenbuff` | 0 = off, 1 = modify regeneration when buffed | `value` |
| `defendregendelay` | regen this often when buffed | `milliseconds` |
| `defendregenextra` | add this to regen when buffed | `value` |
| `bomberlimit` | finish when score is this or more (non-hold) | `value` |
| `bomberholdlimit` | finish when score is this or more (hold) | `value` |
| `bomberpoints` | points added to score for a goal | `value` |
| `bomberthrowinpoints` | points team gets for scoring with throw-in in basket | `value` |
| `bombertouchdownpoints` | points team gets for scoring with touchdown in basket | `value` |
| `bomberpenalty` | points taken from score for throwing the bomb into your own goal | `value` |
| `bomberpickuppoints` | points added to score for picking up the bomb | `value` |
| `bomberholdpoints` | points added to score for each interval (hold) | `value` |
| `bomberholdpenalty` | points subtracted for having the bomb fuse run out (hold) | `value` |
| `bomberthreshold` | automatically drop the bomb if the bomb-carrier "warps" more than this distance | `distance` |
| `bomberbuffing` | buff circumstances | `[when near own base] [when holding bomb] [when holding bomb as the defenders (attack only)]` |
| `bomberbuffdelay` | buffed for this long after leaving | `milliseconds` |
| `bomberbuffarea` | radius around the home base in which buffing occurs, 0 = anywhere | `distance` |
| `bomberbuffdamage` | multiply outgoing damage by this much when buffed | `value` |
| `bomberbuffshield` | divide incoming damage by this much when buffed | `value` |
| `bomberregenbuff` | 0 = off, 1 = modify regeneration when buffed | `value` |
| `bomberregendelay` | regen this often when buffed | `milliseconds` |
| `bomberregenextra` | add this to regen when buffed | `value` |
| `bombercarryspeed` | movement speed added to the player carrying the bomb | `value` |
| `bombercarrytime` | time in milliseconds a player can carry the bomber ball before it explodes | `milliseconds` |
| `bomberholdinterval` | time in milliseconds a player needs to hold the ball in hold bomber-ball to get a point | `milliseconds` |
| `bomberpickupdelay` | time in milliseconds a player needs to wait to be able to pick up the bomber ball again after dropping it | `milliseconds` |
| `bomberresetdelay` | time in milliseconds before the bomber ball resets after being dropped | `milliseconds` |
| `bomberspeed` | speed at which the bomb is thrown | `value` |
| `duelrandom` | randomise the queue before the first round | `bool` |
| `duelregen` | allow regeneration in duel | `bool` |
| `dueldelay` | time a round continues for after it is won | `milliseconds` |
| `duelaffinity` | determines when players entering an affinity zone can respawn in duel;<br>0 = off, 1 = next round, 2 = immediately | `value` |
| `duelovertime` | only spawn the leaders in free-for-all overtime | `bool` |
| `survivorreset` | determines if survivor winners should be sent back to respawn for the next round | `bool` |
| `survivorclear` | determines if items are reset at the end of each round | `bool` |
| `survivorregen` | allow regeneration in survivor | `bool` |
| `survivordelay` | time a round continues for after it is won | `milliseconds` |
| `survivorcooloff` | cool off period before survivor goes to next round | `milliseconds` |
| `survivoraffinity` | players entering an affinity zone can spawn immediately in survivor | `bool` |
| `survivorovertime` | only spawn the leaders in free-for-all overtime | `bool` |
| `speedrunlimit` | number of laps required to end the match, 0 = off | `value` |
| `speedrungauntletwinner` | declare the winner when the final team exceeds the best score | `bool` |
| `speedruncheckpointstrict` | if checkpoints are linked, only allow the next linked checkpoint | `bool` |
| `captureresetfloor` | reset tossed flags to their last position on the floor;<br>0 = off, 1 = team tossing their own flag, 2 = any flag | `value` |
| `captureresetstore` | carry over time already spent dropped when a flag is dropped again, in these capture modes (bitwise OR) | `quick defend protect normal` |
| `capturedefenddelay` | time before a dropped flag resets in defend capture-the-flag | `milliseconds` |
| `captureprotectdelay` | time a flag must be held to capture it in protect capture-the-flag | `milliseconds` |
| `captureretakedelay` | time after capturing before the same player can take the same flag again | `milliseconds` |
| `capturedropheight` | height above the feet at which flags are dropped | `distance` |
| `capturecollide` | collision properties of dropped flags (bitwise OR) | `COLLIDE_TRACE COLLIDE_SCAN COLLIDE_LENGTH COLLIDE_PROJ COLLIDE_OWNER IMPACT_GEOM IMPACT_PLAYER IMPACT_SHOTS BOUNCE_GEOM BOUNCE_PLAYER BOUNCE_SHOTS DRILL_GEOM DRILL_PLAYER DRILL_SHOTS STICK_GEOM STICK_PLAYER` |
| `captureextinguish` | determines when dropped flags are extinguished (bitwise OR) | `water death-material destroy` |
| `captureinteracts` | map entities dropped flags interact with (bitwise OR) | `teleports pushers` |
| `capturerelativity` | factor by which player velocity is transferred to dropped flags | `value` |
| `captureelasticity` | coefficient of restitution for dropped flags hitting surfaces | `value` |
| `captureliquidcoast` | speed at which dropped flags coast through liquids | `value` |
| `captureweight` | weight of dropped flags | `value` |
| `capturebuoyancy` | buoyancy of dropped flags | `value` |
| `capturespeedmin` | minimum speed of dropped flags | `value` |
| `capturespeedmax` | maximum speed of dropped flags, 0 = no limit | `value` |
| `capturerepulsion` | distance within which dropped flags push each other apart, 0 = off | `distance` |
| `capturerepelspeed` | speed at which dropped flags push each other apart | `value` |
| `capturerepeldelay` | time after being dropped before flags push each other apart | `milliseconds` |
| `capturecarryspeedeach` | movement speed added to players for each flag they carry | `value` |
| `capturecarryimpulsespeed` | impulse speed added to players carrying a flag | `value` |
| `capturecarryimpulsespeedeach` | impulse speed added to players for each flag they carry | `value` |
| `capturecarryweight` | weight added to players carrying a flag | `value` |
| `capturecarryweighteach` | weight added to players for each flag they carry | `value` |
| `capturecarrybuoyancy` | buoyancy added to players carrying a flag | `value` |
| `capturecarrybuoyancyeach` | buoyancy added to players for each flag they carry | `value` |
| `bomberbasketonly` | prohibit touchdowns in basket bomber-ball | `bool` |
| `bomberassaultreset` | defenders reset the bomb rather than carry it in attack bomber-ball | `bool` |
| `bomberassaultwinner` | declare the winner when the final team exceeds the best score in attack bomber-ball | `bool` |
| `bomberbasketmindist` | prohibit baskets from closer than this distance, 0 = off | `distance` |
| `bomberwait` | delay before the bomb spawns | `milliseconds` |
| `bomberdropheight` | height above the feet at which the bomb is dropped | `distance` |
| `bomberholdtime` | time a player can carry the bomb in hold bomber-ball before it explodes, 0 = forever | `milliseconds` |
| `bomberspeeddelta` | rate at which a passed bomb turns towards its target | `value` |
| `bomberspeedmin` | minimum speed of the bomb | `value` |
| `bomberspeedmax` | maximum speed of the bomb, 0 = no limit | `value` |
| `bombercollide` | collision properties of the bomb (bitwise OR) | `COLLIDE_TRACE COLLIDE_SCAN COLLIDE_LENGTH COLLIDE_PROJ COLLIDE_OWNER IMPACT_GEOM IMPACT_PLAYER IMPACT_SHOTS BOUNCE_GEOM BOUNCE_PLAYER BOUNCE_SHOTS DRILL_GEOM DRILL_PLAYER DRILL_SHOTS STICK_GEOM STICK_PLAYER` |
| `bomberextinguish` | determines when the bomb is extinguished (bitwise OR) | `water death-material destroy` |
| `bomberinteracts` | map entities the bomb interacts with (bitwise OR) | `teleports pushers` |
| `bomberrelativity` | factor by which player velocity is transferred to the bomb | `value` |
| `bomberelasticity` | coefficient of restitution for the bomb hitting surfaces | `value` |
| `bomberliquidcoast` | speed at which the bomb coasts through liquids | `value` |
| `bomberweight` | weight of the bomb | `value` |
| `bomberbuoyancy` | buoyancy of the bomb | `value` |
| `bombercarryimpulsespeed` | impulse speed added to the player carrying the bomb | `value` |
| `bombercarryweight` | weight added to the player carrying the bomb | `value` |
| `bombercarrybuoyancy` | buoyancy added to the player carrying the bomb | `value` |
| `janitorlimit` | maximum number of janitors | `value` |
| `janitorprize` | prize janitors give;<br>-1 = random, 0 = none, 1 = grenade, 2 = mine, 3 = rocket, 4 = minigun, 5 = jetsaw, 6 = eclipse | `value` |
| `janitorghost` | janitors are ghosts until their prize is ready | `bool` |
| `janitorready` | amount of junk a janitor must collect before it has a prize | `value` |
| `janitorcollect` | amount of junk a janitor collects before dumping it | `value` |
| `janitorbalance` | number of janitors is the current balance times this | `value` |
| `janitorjunktime` | fraction of their lifetime after which shell casings and vanities become junk | `value` |
| `janitorjunkitems` | fraction of their lifetime after which dropped items become junk | `value` |
| `janitorjunkdebris` | fraction of their lifetime after which giblets and debris become junk | `value` |
| `janitorjunkmessy` | scale all junk delays by this much in messy modes | `value` |
| `janitorsuckdist` | distance within which janitors suck up junk | `distance` |
| `janitorsuckspeed` | speed at which janitors suck up junk | `value` |
| `janitorreject` | distance at which janitors reject junk | `distance` |
| `janitorvanities` | list of vanity items for janitors | `list` |

### game mode aliases

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `map` | requests a map change to a given map, with no change of mode or mutators;<br>depending on privileges, this will force or vote for the map change | `map` |
| `gamemode` | returns the current game mode; 0 = demo, 1 = edit, 2 = dm, 3 = ctf, 4 = dac, 5 = bb, 6 = speedrun | — |
| `mode` | sets the mode and mutator values for the next map change request;<br>mode sets the mode type,<br>muts sets the mutators according to a bitwise sum of mutator values,<br>conveniently set using $G_\U* vars and sums of $G_M_* vars,<br>example: mode $G_DEATHMATCH (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `mode muts` |
| `start` | requests a map change to a given map with a specific mode and mutators;<br>depending on privileges, this will force or vote for the map change,<br>mode sets the mode type,<br>muts sets the mutators according to a bitwise sum of mutator values,<br>conveniently set using $G_\U* vars and sums of $G_M_* vars,<br>example: start bath $G_DEATHMATCH (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map mode muts` |
| `edit` | starts editing on a random map. specifying a file name will create a new map file on a blank map canvas | `map` |
| `demo` | starts playback of a given demo | `demo` |
| `deathmatch` | requests a map change to deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values, conveniently set using a sum of $G_M_* vars,<br>example: deathmatch bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `ffa` | requests a map change to free-for-all deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values, conveniently set using a sum of $G_M_* vars,<br>example: ffa bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `fdm` | requests a map change to free-for-all deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values, conveniently set using a sum of $G_M_* vars,<br>example: ffa bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `dm` | requests a map change to deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values, conveniently set using a sum of $G_M_* vars,<br>example: dm bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `teamdm` | requests a map change to team deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: teamdm bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `tdm` | requests a map change to team deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: tdm bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `coop` | requests a map change to coop deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: coop bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `cdm` | requests a map change to coop deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: cdm bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `instagib` | requests a map change to instagib deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: instagib bath (\| (&lt;&lt; 1 $G_M_DUEL) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `insta` | requests a map change to instagib deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: insta bath (\| (&lt;&lt; 1 $G_M_DUEL) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `medieval` | requests a map change to medieval deathmatch on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: medieval bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |
| `kaboom` | requests a map change to kaboom deathmatch on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: kaboom bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |
| `duel` | requests a map change to duel deathmatch on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: duel bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `survivor` | requests a map change to survivor deathmatch on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: survivor bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `lms` | requests a map change to survivor deathmatch (last man standing) on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: lms bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `classic` | requests a map change to classic deathmatch on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: classic bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |
| `capture` | requests a map change to capture-the-flag on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: capture bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `ctf` | requests a map change to capture-the-flag on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: ctf bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `quickcapture` | requests a map change to quick capture-the-flag on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: quickcapture bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `defendcapture` | requests a map change to defend capture-the-flag on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: defendcapture bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `protectcapture` | requests a map change to protect capture-the-flag on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: protectcapture bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `defend` | requests a map change to defend-and-control on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: defend bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `dac` | requests a map change to defend-and-control on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: dac bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `dnc` | requests a map change to defend-and-control on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: dac bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `quickdefend` | requests a map change to quick defend-and-control on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: quickdefend bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `kingdefend` | requests a map change to king defend-and-control on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: kingdefend bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `koth` | requests a map change to king defend-and-control (king of the hill) on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: koth bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `bomber` | requests a map change to bomber-ball on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: bomber futuresport (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `bb` | requests a map change to bomber-ball on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: bb futuresport (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `holdbomber` | requests a map change to hold bomber-ball on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: holdbomber bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `basketbomber` | requests a map change to basket bomber-ball on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: basketbomber bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `attackbomber` | requests a map change to attack bomber-ball on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: attackbomber bath (\| (&lt;&lt; 1 $G_M_INSTAGIB) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `speedrun` | requests a map change to speedrun on a given map;<br>[muts] optionally adds extra mutators according to bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: speedrun purge (\| (&lt;&lt; 1 $G_M_DUEL) (&lt;&lt; 1 $G_M_MEDIEVAL)) | `map [muts]` |
| `speedrunlapped` | requests a map change to lapped speedrun on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: speedrunlapped purge (\| (&lt;&lt; 1 $G_M_FFA) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |
| `trial` | requests a map change to timed speedrun on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: trial purge (\| (&lt;&lt; 1 $G_M_FFA) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |
| `endurancespeedrun` | requests a map change to endurance speedrun on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: endurancespeedrun purge (\| (&lt;&lt; 1 $G_M_FFA) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |
| `gauntletspeedrun` | requests a map change to gauntlet speedrun on a given map;<br>[muts] optionally adds extra mutators according to a bitwise mutator values,<br>conveniently set using a sum of $G_M_* vars,<br>example: gauntletspeedrun purge (\| (&lt;&lt; 1 $G_M_FFA) (&lt;&lt; 1 $G_M_DUEL)) | `map [muts]` |

### sound settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `soundmastervol` | sets master sound volume (0=mute) | `value` |
| `soundeffectvol` | sets effect sound volume (0=mute) | `value` |
| `soundmusicmenuvol` | sets the music volume on the main menu (0=mute) | `value` |
| `soundmusicprogressvol` | sets the music volume on loading screens (0=mute) | `value` |
| `soundmusicintermissionvol` | sets the music volume during intermission (0=mute) | `value` |
| `soundmusicgamevol` | sets the music volume in game (0=mute) | `value` |
| `soundmusiceditvol` | sets the music volume in edit mode (0=mute) | `value` |
| `sounddevice` | sets the name of the sound device to be used | `value` |
| `soundlimiter` | keeps a loud mix from clipping by briefly turning it down | `value` |
| `footstepsounds` | determines which players' sounds are played, bitwise OR;<br>1: own footsteps<br>2: all other players' footsteps | `value` |
| `footstepsoundmin` | speed at which lower velocities take on the `footstepsoundmingain` value (scales linearly to `footstepsoundmaxgain` above this) | `value` |
| `footstepsoundmax` | speed at which higher velocities are capped at the `footstepsoundmaxgain` (scales linearly down below this) | `value` |
| `footstepsoundlevel` | scale of footstep sounds | `value` |
| `footstepsoundfocus` | scale of the player's own footstep sounds | `value` |
| `footstepsoundlight` | scale of footstep sounds while moving quietly (e.g. crouching) | `value` |
| `footstepsoundmaxgain` | gain of footsteps while at or above `footstepsoundmax` speed | — |
| `footstepsoundmingain` | gain of footsteps while at or below `footstepsoundmin` speed | — |
| `musictheme` | sets the music to play while not in a game | `file` |
| `musicintermission` | sets the music to play during intermission | `file` |

### user interface and hud settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `firstpersonbob` | toggles first-person camera bob effect | `boolean` |
| `firstpersonsway` | toggles first-person camera sway effect | `boolean` |
| `showcrosshair` | 0 = off, 1 = on, 2 = blend depending on current accuracy level | `value` |
| `crosshairweapons` | determines weapon-specific crosshair use (bitwise OR) | `[weapon-specific crosshairs] [weapon colours]` |
| `crosshairtone` | colour of crosshair (when weapon specific colours are not enabled) | `colour` |
| `hitcrosshairtone` | colour of the crosshair as it shows a hit | `colour` |
| `crosshairsize` | size of crosshair (in terms of screen size) | `value` |
| `crosshairscale` | scale of crosshair | `value` |
| `crosshairhitspeed` | how long the crosshair shows a hit on an opponent (milliseconds) | `value` |
| `crosshairblend` | determines crosshair opacity (0 = transparent 1 = opaque) | `value` |
| `crosshairaccamt` | determines blend by accuracy level intensity (when blend by accuracy is enabled) | `value` |
| `crosshairflash` | determines how the crosshair shows your health;<br>0 = off<br>&1 = flash red when below spawn health<br>&2 = colour from red to yellow as health rises, the usual colour at spawn health, and green when above it | `value` |
| `crosshairthrob` | determines scale of crosshair throb (size change) effect (like while gaining health) | `value` |
| `crosshair` | name of the crosshair shape, from config/ui/pointers/crosshairs | `string` |
| `crosshairhitthick` | how much the crosshair thickens as a hit effect, in terms of the crosshair's size | `value` |
| `showhitmarker` | shows ticks bursting out from the crosshair as your damage lands | `boolean` |
| `hitmarkertime` | how long the hit marker lasts | `milliseconds` |
| `hitmarkersize` | size of the hit marker (in terms of screen size) | `value` |
| `hitmarkercolour` | colour of the hit marker's ticks | `colour` |
| `hitmarkercore` | colour of the core of the hit marker's ticks | `colour` |
| `crosshairdemo` | cycles through every crosshair shape, one a second | `boolean` |
| `pointeroutline` | width of the dark outline around crosshairs, cursors and ammo clip rounds, in percent of their size | `value` |
| `pointeroutlinefade` | how far the dark outline fades out, in percent of the size | `value` |
| `pointeroutlineblend` | opacity of the dark outline | `value` |
| `pointergap` | space left between the crosshair, the indicator, the circle bar and the ammo clip (in terms of screen size) | `value` |
| `pointermorphtime` | how long a crosshair or cursor takes to change smoothly into another, except when switching weapons, which takes as long as the switch | `milliseconds` |
| `cursorpointer` | name of the cursor shape, from config/ui/pointers/cursors | `string` |
| `cursoraccent` | colour of the cursor's arrow | `colour` |
| `cursorhoveraccent` | colour of the cursor's arrow while over something that can be clicked | `colour` |
| `cursorhoverscale` | size of the cursor while over something that can be clicked, relative to its usual size | `value` |
| `clipgroupscale` | smallest size of ammo clip rounds, relative to their full size, before large clips gain rings or are grouped | `value` |
| `clipgroup` | how large ammo clips stay legible;<br>0 = more rings, up to clipmaxrings<br>1 = each round shown stands for several | `value` |
| `clipmaxrings` | most rings a large ammo clip may use before its rounds shrink | `value` |
| `showfps` | display the frames per second counter on the hud;<br>0 = no display<br>1 = display average fps<br>2 = display average fps and best and worst difference<br>3 = display average fps and fps range<br>4 = display average fps and average/worst frametimes | `value` |
| `showloadinglogos` | display logos while not in game | `boolean` |
| `showconsole` | display console messages in the hud without opening the console, will prevent lines from fading;<br>0 = off, 1 = only while editing, 2 = always | `value` |
| `clearconsole` | clears the selected console output;<br>-1: all<br>0: debug<br>1: event<br>2: frag<br>3: chat | `console-index` |
| `showminimap` | toggle minimap visibility | `boolean` |
| `showhud` | toggle heads up display visibility | `boolean` |
| `autoscores` | 1 = when dead, 2 = also in spectv, 3 = and in waittv too | `value` |
| `scoresdelay` | otherwise use respawn delay | `milliseconds` |
| `showlaptimes` | 0 = off, 1 = only player, 2 = +humans, 3 = +bots | `value` |
| `muzzleflash` | 0 = off, 1 = only other players, 2 = only thirdperson, 3 = all | `value` |
| `radarhardaffinity` | 0 = no radar in hard, 1 = affinity only radar in hard | `value` |
| `animationinterpolationtime` | sets the duration in milliseconds of animation blending | `value` |
| `addpostfx` | adds this effect to the post-processing stack | `value` |
| `setpostfx` | replaces all the current post-processing effects with this one | `value` |
| `clearpostfx` | clears all post-processing effects | — |
| `musictype` | 0 = no in-game music, 1 = map music (or random if none), 2 = always random, 3 = map music (silence if none), 4-5 = same as 1-2 but pick new tracks when done | `value` |
| `musicedit` | 0 = no editing music, 1 = map music (or random if none), 2 = always random, 3 = map music (silence if none), 4-5 = same as 1-2 but pick new tracks when done | `value` |
| `followdead` | 0 = never, 1 = in all but duel/survivor, 2 = always | `value` |
| `specmode` | 0 = float, 1 = tv | `value` |
| `waitmode` | 0 = float, 1 = tv in duel/survivor, 2 = tv always | `value` |
| `spectvrotate` | rotate style,  0 = absolute angle, 0 = scaled, gt 0 = scaled with max angle | `value` |
| `spectvdead` | 0 = never, 1 = in all but duel/survivor, 2 = always | `value` |
| `deathcamstyle` | 0 = no follow, 1 = follow attacker, 2 = follow self | `value` |
| `zoomdefault` | -1 = last used, else defines default level | `value` |
| `zoomscroll` | 0 = stop at min/max, 1 = go to opposite end | `value` |
| `showpresence` | 0 = never show join/leave, 1 = show only during game, 2 = show when connecting/disconnecting | `value` |
| `showpresencehostinfo` | 0 = do not show host info in join/leave messages, 1 = show host info in join/leave messages when at an appropriate privilege level | `value` |
| `showteamchange` | 0 = never show, 1 = show only when switching between, 2 = show when entering match too | `value` |
| `showtimestyle` | determines display style of remaining game time; 0 = seconds only, 1 = (minutes):(seconds to the thousandths place), 2 = (minutes):(seconds to the tenths place), 3 = (minutes):(seconds), no decimals, 4 = (minutes)m(seconds)s | `value` |
| `showrealtime` | toggles display of local real time beneath gameplay time | `boolean` |
| `deathanim` | 0 = hide player when dead, 1 = old death animation, 2 = ragdolls, 3 = ragdolls, but hide in duel/survivor | `value` |
| `deathfade` | 0 = don't fade out dead players, 1 = fade them out | `value` |
| `bloodsize` | sets the size of blood splatter | `value` |
| `bloodfade` | determines the time (in milliseconds) for blood stains to disappear | `value` |
| `bloodscale` | determines the multiplier for blood droplets shed when taking damage | `value` |
| `bloodsparks` | adds bubble like blood droplets, use with nogore = 1 | `value` |
| `nogore` | 0 = gore is present, 1 = no blood | `value` |
| `gibfade` | determines the time (in milliseconds) for giblets (body parts) to disappear | `value` |
| `gibelasticity` | determines the coefficient of restituition for giblets (body parts) hitting walls or other surfaces | `value` |
| `gibrelativity` | determines the factor by which player velocity is transfered to giblets (body parts) upon death | `value` |
| `gibliquidcoast` | determines the speed at which giblets (body parts) can coast through liquids | `value` |
| `damagedivisor` | damage and health values are displayed divided by this value | `value` |
| `damageinteger` | determines if health and damage values are displayed as integers;<br>0 = display as floats, 1 = display rounded to next integer | `value` |
| `hudsize` | sets the size of the entire hud as a whole, this includes both consoles, menus, inventory, etc | `value` |
| `zoomsensitivity` | determines aiming/look sensitivity while zoomed in with the rifle | `value` |
| `sensitivity` | determines scale by which to multiply mouse input for camera orientation ingame | `value` |
| `yawsensitivity` | determines scale factor for yaw (left/right pan) movement | `value` |
| `pitchsensitivity` | determines scale factor for pitch (up/down tilt) movement | `value` |
| `sensitivityscale` | determines scale factor for all types of mouse sensitivity | `value` |
| `mousesensitivity` | determines scale by which to multiply mouse input for cursor position in menus | `value` |
| `mouseaccel` | determines how much mouse look speeds up with faster mouse movement, 0 disables acceleration; uses the same values as cl_mouseAccel in Quake Live | `value` |
| `mouseaccelexp` | determines the acceleration curve; 2 is linear, above 2 accelerates more at higher speeds, between 1 and 2 gives logarithmic curves, 1 adds a constant boost once past the offset; uses the same values as cl_mouseAccelPower in Quake Live | `value` |
| `mouseacceloffset` | determines the mouse speed (counts per millisecond) that must be exceeded before acceleration starts, negative values accelerate more at lower speeds; uses the same values as cl_mouseAccelOffset in Quake Live | `value` |
| `mouseaccelsenscap` | determines the maximum sensitivity acceleration can reach, keeping fast flicks under control, 0 disables the cap; like sensitivity, this is the Quake Live cl_mouseSensCap multiplied by 2.2 at the default sensitivityscale | `value` |

HUD / world UI element settings — `<hud>` is one of: `player`, `playeroverlay`, `capture`, `captureflag`, `defend`, `bomber`, `entityedit`, `entityitem`, `entityproj`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<hud>ui` | surface the `<hud>` world interface is drawn on, -1 = off | `value` |
| `<hud>uiyaw` | yaw of the `<hud>` world interface, -1 = face the camera | `degrees` |
| `<hud>uipitch` | pitch of the `<hud>` world interface | `degrees` |
| `<hud>uiscale` | scale of the `<hud>` world interface when not drawn in the world | `value` |
| `<hud>uiworld` | scale of the `<hud>` world interface when drawn in the world | `value` |
| `<hud>uimaxdist` | maximum distance at which the `<hud>` world interface is drawn, 0 = no limit | `distance` |
| `<hud>uidetentyaw` | yaw angle the `<hud>` world interface snaps to | `degrees` |
| `<hud>uidetentpitch` | pitch angle the `<hud>` world interface snaps to | `degrees` |
| `entityedituiselmaxdist` | maximum distance at which the entityedit world interface is drawn for selected entities, 0 = no limit | `distance` |

### engine settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `maxfps` | caps the maximum framerate at the given value; note that vsync will cap at monitor refresh if enabled | `value` |
| `vsync` | toggles vertical synchronization (frame pacing to monitor refresh rate) | `boolean` |
| `screenres` | sets the gameplay render resolution | `x y` |
| `screenh` | sets the number of vertical pixels onscreen | `value` |
| `screenw` | sets the number of horizontal pixels onscreen | `value` |
| `fullscreen` | toggles fullscreen or windowed mode | `boolean` |
| `volumetric` | toggles rendering volumetric-tagged lights with volumetrics | `boolean` |
| `volsteps` | sets the number of intensity subdivisions for volumetric lights | `value` |
| `gi` | toggles use of global illumination for maps | `boolean` |
| `ao` | toggles use of ambient occlusion (obscurance) for maps; note that this is called "ambient obscurance" in the code but referred to by its common name of "ambient occlusion" in the UI | `boolean` |
| `fxaa` | toggles fast approximate antialiasing (grease filter) | `boolean` |
| `fxaaquality` | sets quality level of FXAA filter | `value` |
| `msaa` | sets level of multisampling antialiasing (usually in powers of 2) | `value` |
| `tqaa` | toggles temporal antialiasing | `boolean` |
| `smaa` | toggles morphological antialiasing | `boolean` |
| `smaaquality` | sets quality level of morphological AA | `value` |
| `bilinear` | toggles bilinear texture filtering | `boolean` |
| `trilinear` | toggles trilinear texture filtering | `boolean` |
| `aniso` | sets level of anisotropic filtering (usually in powers of 2) | `value` |
| `gscale` | sets engine render scale (percent of native resolution) | `value` |
| `texreduce` | factor by which to reduce the resolution of level textures by | `value` |
| `maxtexsize` | maximum resolution to which textures can be loaded into the game at | `value` |
| `envmapsize` | resolution (as a power of 2) for the environment maps on a level | `value` |
| `softparticles` | toggles smoothing of particle effects and weapon glows | `boolean` |
| `caustics` | toggles light caustic rendering for water volumes | `boolean` |
| `waterreflect` | toggles screenspace surface reflection for water volumes | `boolean` |
| `vertwater` | toggles surface height animation for water volumes | `boolean` |
| `filltjoints` | toggles whether to fix geometry t-joints (often visible as 'sparklies' in geometry); this should almost always be enabled | — |
| `stains` | toggles bloodstains on map geometry | `boolean` |
| `maxstaintris` | maximum amount of geometry devoted to blood stains | `value` |
| `smfilter` | shadow filtering level | `value` |
| `smsize` | resolution of shadow rendering | `value` |
| `smstaticdist` | distance from the camera beyond which pickups stop animating in cached light shadows | `value` |
| `smalpha` | enables shadows cast by alpha geometry (1 - sunlight, 2 - pointlights) | `value` |
| `rhtaps` | radiance hint taps; sets global illumination resolution | `value` |
| `aotaps` | number of ambient obscurance taps; sets ambient obscurance resolution | `value` |
| `aoiter` | iterations to smooth ambient obscurance over | `value` |
| `gamma` | sets the screen gamma (luminance curve) | `value` |
| `mapeffects` | sets the visibility of level-defined optional mapmodels, lights, particles, and other entities, from 1 (minimal) to 3 (show all) | `value` |
| `winddebug` | shows debug information for wind emitters | `boolean` |
| `windanimdist` | sets the maximum distance for drawing wind animations | `value` |
| `windanimfalloff` | sets the falloff distance for drawing wind animations | `value` |
| `windmaxemitters` | sets the maximum amount of active wind emitters | `value` |
| `particlewind` | toggles allowing particles to move with the wind (including map wind and explosions) | `boolean` |
| `fileredirect` | reads replacement in place of removed once removed can't be found anywhere; removed can use * and ? wildcards and \| between alternatives, and replacement fills in what they matched as $1 to $9 ($$ is a $);<br>a texture, sky box, model, sound or music a map names that's removed is ported to replacement when the map loads, so saving the map saves it, and colour (0xRRGGBB) tints a diffuse texture's slot;<br>an empty replacement drops removed, so a map slot loses that texture and its shader the part that used it;<br>example: fileredirect "textures/old/*" "textures/new/$1" | `removed replacement [colour]` |
| `fileredirectclear` | removes every redirect made with fileredirect | — |
| `fileredirectlist` | returns every redirect as a list of removed, replacement and colour triples | — |
| `fileredirectmatch` | returns what path is redirected to, one step on and whether or not it exists, or nothing | `path` |
| `fileredirectverbose` | logs each removed file the first time it's redirected | `boolean` |
| `fileredirectmissing` | logs each texture, composite, sound or required model that can't be found and has no redirect, once, to list what needs one | `boolean` |

### engine read-only

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `camerapitch` | returns the current camera's pitch as a float precise to seven digits | — |
| `cameraroll` | returns the current camera's roll as a float precise to seven digits | — |
| `camerayaw` | returns the current camera's yaw as a float precise to seven digits | — |
| `cameraposx` | returns the x coordinate of the camera's location as a float precise to seven digits | — |
| `cameraposy` | returns the y coordinate of the camera's location as a float precise to seven digits | — |
| `cameraposz` | returns the z coordinate of the camera's location as a float precise to seven digits | — |
| `getenginestat` | returns an engine value:<br>0:wtr     1:wtr%    2:wvt     3:wvt%    4:evt<br>5:eva     6:ond      7:va       8:gl       9:gb<br>10:oq     11:fps    12:best   13:worst  14:ents<br>15:entsel 16:wp     17:pvs    18:vel     19:m/s<br>20:km/h  21:posx  22:posy   23:posz   24:yaw<br>25:pitch  26:roll    27:selox  28:seloy  29:seloz<br>30:selsx  31:selsy  32:selsz  33:selcx  34:selcxs<br>35:selcy  36:selcys 37:cube   38:mat   39:corner<br>40:orient 41:grid | — |

### gameplay vars (numbers for gameplay activities)

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `autospecdelay` | time a player may remain dead before autospectate moves them to spectators | `milliseconds` |
| `bomberlockondelay` | determines the amount of time needed to hold throw button to achieve assisted pass to another team member | `milliseconds` |
| `capturecarryspeed` | movement speed added to players carrying a flag | `value` |
| `capturepickupdelay` | time a player needs to wait to be able to pick up a flag again after losing it | `milliseconds` |
| `fragbonus` | determines the amount of points a player gets for each frag | `value` |
| `enemybonus` | determines the amount of points a player gets for frags against neutral enemies in onslaught | `value` |
| `lasthitbonus` | determines the amount of points a player gets for last hits in gladiator | `value` |
| `headshotpoints` | determines the amount of bonus points a player gets when a frag is caused by a headshot | `value` |
| `multikillpoints` | determines the amount of bonus points a player gets for a double, triple, or multi kill | `value` |
| `multikillbonus` | determines if multikillpoints should be multiplied by 2, 3, or 4 as appropriate | `value` |
| `spreepoints` | determines the amount of points a player gets for achieving each level of killing spree for the first time | `value` |
| `spreebreaker` | determines the amount of points a player gets for ending an opponent's killing spree | `value` |
| `dominatepoints` | determines the amount of points a player gets when he achieves domination on another player | `value` |
| `revengepoints` | determines the amount of points a player gets when he gets revenge against a dominating player | `value` |
| `firstbloodpoints` | determines the amount of points a player gets when he makes the first kill of a match | `value` |
| `assistkilldelay` | determines the time in milliseconds after a registered hit in which that player's death awards an assist | `value` |
| `mapbalance` | determines if teams switch sides on asymmetrical maps at half time;<br>0 = off, 1 = capture/defend/bomber only, 2 = also with team spawns, 3 = forced | `value` |
| `teamkillban` | automatically ban player when warned this many times for teamkill | `value` |
| `teamkillkick` | automatically kick player when warned this many times for teamkill | `value` |
| `teamkillpenalty` | subtract this*fragbonus from the players points when teamkilling | `value` |
| `teamkillrestore` | restore the team score as if the teamkiller was never there if the point loss of the team was greater than this | `value` |
| `teamkilltime` | time threshold in which teamkills are counted | `minutes` |
| `teamkillwarn` | the limit of teamkills after which the player receives a warning | `value` |

### fov vars

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `fov` | determines the size of the field of view in first or third person mode, depending on the current camera mode | `angle` |
| `editfov` | determines the size of the edit mode field of view | `angle` |
| `specfov` | determines the size of the spectator field of view | `angle` |
| `firstpersonfov` | determines the size of the first person ingame field of view | `angle` |
| `thirdpersonfov` | determines the size of the third person ingame field of view | `angle` |

### clients

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `getclientnum` | returns a client number (your own if name is "") | `name/cn` |
| `getclientcolour` | returns the color of a player in HEX format | `name/cn` |
| `getclienthandle` | returns the auth handle of a player | `name/cn` |
| `getclientip` | returns the ip address of a player | `name/cn` |
| `getclienthost` | returns the hostmask of a player | `name/cn` |
| `getclientmodel` | returns the model number of a player's chosen player model | `name/cn` |
| `getclientname` | returns the name of the player given a cn, with toggles for color, icon display, and deduplication number display | `name/cn colour icon/color-display append-dedup-#` |
| `getclientversion` | returns specific information of a player<br>id: 0 = major version, 1 = minor version, 2 = patch version, 3 = game version, 4 = platform (0 = Windows, 1 = OS X, 2 = Unix-like), 5 = architecture<br>6 = OpenGL version, 7 = OpenGL shader version, 8 = CRC checksum, 9 = GPU vendor, 10 = GPU, 11 = GPU version, 12 = platform short form<br>13 = game version, platform, architecture | `name/cn id` |
| `getclientvanity` | returns the vanities of a player | `name/cn` |
| `getclientmixer` | returns the mixer of a player | `name/cn` |
| `getclientweapselect` | returns a player's currently selected loadout | `name/cn` |
| `getclientloadweap` | returns the weaponid of slot in the loadout of a player | `name/cn slot` |
| `getclientteam` | returns the team number of a player (0 = neutral, 1 = alpha, 2 = omega, 3 = enemy) | `name/cn` |
| `getclientfrags` | returns number of frags (kills) in the current match for a specified player | `name/cn` |
| `getclientdeaths` | returns number of deaths in the current match for a specified player | `name/cn` |
| `getscoretotal` | returns total score for a specified scoregroup | `scoregroup` |
| `getscoreteam` | returns team number of the specified scoregroup | `scoregroup` |
| `getmodelname` | returns the model name from a model number, the second argument determines which bits of the path to the model file is printed, defaults to 2;<br>0 = path to model directory, 1 = path to model/hwep directory, name of model directory | `modelnumber value` |
| `listclients` | returns a list with client numbers from actual server<br>boolean: 0 = Adds your cn, 1 = Adds your cn as the first item<br>filter: 0 = off, 1 = enemies, 2 = all ai | `[bool] [filter]` |

### editing (includes subcategories for vtexture commands and materials)

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `editing` | returns 1 if editing, 0 otherwise | — |
| `edittoggle` | toggles editing mode (only possible in edit mode) | — |
| `newent` | creates a new entity with the specified attributes:<br>e.g. '/newent light 128 0 0 200' for blue light with r=128<br>available types:<br>actor affinity checkpoint<br>decal envmap light<br>lightfx mapmodel particles<br>playerstart pusher route<br>sound teleport trigger<br>weapon unused | `type attributes` |
| `entattr` | sets the specified entity attribute to the given value | `index value` |
| `entset` | sets type and properties of the currently selected entity | `type properties..` |
| `entfind` | selects all entities of a specific type and optionally with<br>specific properties, using "1" as type selects all entities | `type properties..` |
| `entfindinsel` | selects all entities, within the selected area,<br>of a specific type and optionally with specific properties,<br>using "1" as type selects all entities | `type properties..` |
| `entcancel` | deselects all entities while leaving area selected | — |
| `entlink` | links two linkable entities (teleporter, light/lightfx) together;<br>use multiple executions to loop through possible<br>linking methods | — |
| `entunlink` | removes entities from their link chains | — |
| `entselradius` | determines size of selection cube for point entities<br>(e.g. lights, sounds) | `radius` |
| `entseldecalbox` | toggles between decal bounding box being the entire decal or<br>just the entity point | `boolean` |
| `entselmapmodelbox` | toggles between mapmodel bounding box being the entire model<br>or just the entity point | `boolean` |
| `envmapradius` | sets the default radius of environment map entities with<br>unspecified radii | `radius` |
| `envmapbb` | toggles interpretation of environment map entities as spherical<br>(envmapbb = 0) or cubical (envmapbb = 1) | `toggle` |
| `gettex` | picks up the texture from the face currently selected,<br>note that allfaces must be turned off | — |
| `replace` | repeats the last texture change across the entire map,<br>note that allfaces must be turned off | — |
| `texturecull` | removes all textures not used in the map from the map config file | — |
| `texturerehash` | adds previously culled textures back to map config file | — |
| `flip` | flips the selected geometry across selected face | — |
| `rotate` | rotates the selected geometry about axis normal to selected face,<br>in units of 90 degrees | — |
| `copy` | copies the selected geometry to the clipboard | — |
| `paste` | pastes the selected geometry from the clipboard | — |
| `saveprefab` | saves the current geometry selection to a prefab file<br>(does not faithfully copy textures) | `name` |
| `copyprefab` | loads a prefab file onto the clipboard, to be pasted with /paste | `name` |
| `grassanimmillis` | sets the length of a gust of wind through the grass | `milliseconds` |
| `grassanimscale` | sets how far the wind bends the grass | `value` |
| `grassdensityscale` | sets the share of grass blades drawn, widening them to cover the same ground | `value` |
| `grassshadow` | toggles shadows cast by grass, static or animated as the map chooses | `boolean` |
| `grassdist` | sets the distance at which grass becomes visible | `value` |
| `grasstrample` | sets whether players, bots and other actors press down the grass they walk through | `value` |
| `grassthin` | sets the share of the grass distance beyond which grass blades start to thin out | `value` |
| `grassthinmin` | sets the share of grass blades left at the grass distance, widened to cover the same ground | `value` |
| `grasslodmesh` | sets the share of the grass distance beyond which grass blades use fewer triangles | `value` |
| `grasspixelsfull` | sets how tall on screen grass blades are when they are drawn at full density | `pixels` |
| `grasspixelsthin` | sets how tall on screen grass blades are when they thin out the most, widened to cover the same ground | `pixels` |
| `grassstalkpixels` | sets how wide on screen the stalks of grass heads are when they use every point of their shape | `pixels` |
| `grassstalkpixelshalf` | sets how wide on screen the stalks of grass heads are when they use every second point of their shape, below which they use every fourth | `pixels` |
| `lodmodels` | turns on using simpler versions of models when they are small on screen | `boolean` |
| `lodmodelshadow` | sets how many levels simpler map models are in shadows than they are on screen | `value` |
| `lodmodelscale` | sets how large models count as on screen when choosing their detail, higher keeps detail further away | `value` |
| `mdllod` | sets a simpler version of the model to use beyond this distance at 1080p, and nearer or further at other views | `name distance` |
| `mdllodpixels` | sets a simpler version of the model to use when it is narrower on screen than this many pixels | `name pixels` |
| `grassheadlodpixels` | sets how wide on screen grass heads are when they start to use fewer points, using a quarter of them at a third of this | `pixels` |
| `grassheadpixels` | sets how wide on screen grass heads are when they stop being drawn | `pixels` |
| `grassleafpixels` | sets how long on screen the leaves on the stalks of grass heads are when they stop being drawn | `pixels` |
| `grassshadowdist` | sets the distance from the camera within which grass casts shadows | `value` |
| `calclight` | recalculate normal map interpolation and remip geometry to<br>optimize vertex/poly counts | — |
| `fixinsidefaces` | replace all inside faces of cubes not renderable with a single<br>texture (defaults to newmap texture) to reduce redundant<br>octree nodes and texslot count | `vslot` |
| `selectbrush` | select a different brush with relative index to the current one:<br>-1 = previous brush<br>1 = next brush | `index` |
| `blendbrushcolour` | display colour for the blendbrush wand | `colour` |
| `blendpaintmode` | action the blendbrush takes:<br>0 (off), 1 (merge), 2 (erase), 3 (overwrite),<br>4 (inverted merge), 5 (inverted erase), 6 (inverted overwrite) | `value` |
| `clearblendmap` | clears the blend map texture from the current map | — |
| `blendbrushreach` | how far behind the aimed surface the blend brush can still paint;<br>the brush is projected from the camera onto everything it falls on,<br>and this keeps paint from falling past a ledge | `units` |
| `blendbrushscale` | scales the blend brush: each brush pixel covers this times 2 units,<br>Shift and the mouse wheel step it by 0.125 in paint mode | `scale` |
| `pruneblendmap` | removes blend map paint that no surface shows, as saving the map does | — |
| `clearblendmapsel` | clears the blend map paint on the surfaces in the selection | — |
| `invertblendmapsel` | inverts the blend map paint on the surfaces in the selection | — |
| `moveblendmap` | moves the blend map paint by an offset, in multiples of 32 units | `x y z` |
| `dropwaypoints` | determines if waypoints are dropped by players in game,<br>0 = no waypoints are dropped,<br>1 = limited number of waypoints are dropped | `value` |
| `showwaypoints` | toggles the visibility of the path that connects waypoints,<br>waypoints are always visible if they are being dropped | `value` |
| `savewaypoints` | saves a .wpt file containing the current maps waypoints,<br>if no argument is given it uses the current map's name | `[name]` |
| `loadwaypoints` | loads a .wpt file containing waypoints, if no argument is given<br>it loads a waypoint file matching the current map's name | `[name]` |
| `delselwaypoints` | delete the waypoints in the currently selected area | — |
| `lerpangle` | sets the maximum mergable angle for linear interpolation<br>of normals and lightmaps | `angle` |
| `lerpsubdiv` | number of sampling points for linear interpolation,<br>as a power of two | `value` |
| `lerpsubdivsize` | minimum grid power the linear interpolation will divide | `value` |
| `maxmerge` | maximum gridpower the remipper can use to simplify geometry | `value` |
| `entitysurf` | toggles movement of camera with movement of selected entities | `boolean` |
| `selectionsurf` | toggles movement of camera with the movement of selection face | `boolean` |
| `allfaces` | toggles texturing of all six faces of geometry cubes (1)<br>or just the selected face (0) | `boolean` |
| `gridpower` | sets the cube size (in powers of 2) of the cursor | `value` |
| `minimapheight` | sets the height (in power 0 cubes) of the minimap above<br>the bottom of the map | `value` |
| `remip` | recalculate the geometry of the map to reduce amount of<br>level geometry | — |
| `recalc` | recalculate prerendered level assets, such as the minimap and environment maps | — |
| `undo` | undoes the last edit command; may require having operated<br>object in the current field of view<br>Return values:<br>1 = world edit<br>2 = entity edit | — |
| `redo` | redoes the last undone edit command<br>Return values:<br>1 = world edit<br>2 = entity edit | — |
| `undomegs` | number of megabytes to allocate to the undo cache | `value` |
| `lse` | returns a list of entities and the quantity of selected entities | — |
| `mapsound` | adds a map sound slot for sound entities to play, returning its index; streamed (0 or 1) reads the file as it plays rather than holding it all in memory, which suits long files such as songs | `file gain pitch rolloff refdist maxdist variants streamed` |
| `mapsoundstream` | sets whether the map sound slot at index is streamed, read as it plays rather than held whole in memory, or returns it if no value is given | `index value` |
| `soundmapfloor` | sets how quiet a map sound's distance falloff gets before it has faded to nothing, as a fraction of its full volume; music that yields to it is back to full there and a streamed one stops being read (0 = map sounds carry on forever) | `value` |
| `soundmaxstreams` | sets how many streamed map sounds are read at once, the loudest first; any more are silent until there's room | `value` |
| `musicyield` | sets how far the music in a match gives way to map sounds that ask for it, such as a song playing from a place in the map (0 = never, 1 = down to silence at that sound's full volume) | `value` |
| `musicyieldspeed` | sets how quickly the music gives way to a map sound and returns, per millisecond | `value` |
| `mapsoundinfo` | returns number of mapsound slots used in the current map when supplied index = -1, otherwise returns path to the sound on the slot provided by the index | `index` |

#### edit map settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `maptitle` | sets the title message of the map | `text` |
| `mapmsg` | sets the title message of the map (alias for maptitle) | `text` |
| `mapauthor` | sets the author message of the map | `text` |
| `mapdesc` | sets the description string of the map | `text` |
| `mapenlarge` | enlarges the map to twice the size (does not center) | `text` |
| `mapfile` | path to map .mpz file | `path` |
| `mapname` | path to map file | `path` |
| `savemap` | saves the current map as "mapname.mpz" in the homedir | `map` |
| `shrinkmap` | shrinks the map size to smallest cubed area,<br>only empty space outside of the map will be removed | — |
| `sendmap` | manually sends map to the server; not in edit mode, where other players send it when needed | — |
| `getmap` | manually retrieves map from the server, or in edit mode from another player | — |
| `newmap` | create new map with the specified gridpower and name | `size, name` |
| `decalreset` | deletes all decal indices from map config file (including ones in use) | — |
| `routenames` | sets the routenames for speedrun mode (list of names) | `text` |
| `routecolours` | sets the routecolours for speedrun mode (list of hexcolours) | `text` |

#### edit visual settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `showentdir` | show the direction of playerstarts and actors:<br>0 = off<br>1 = only selected<br>2 = always when editing<br>3 = always in editmode | `value` |
| `editcursorblend` | sets the opacity of the crosshair while in editing<br>0 = transparent<br>1 = opaque | `value` |
| `editcursorsize` | sets the size of the crosshair while in editing | `value` |
| `editcursor` | sets the shape of the crosshair while in editing | `string` |
| `editmatblend` | sets the opacity of material volumes (when showmat 1 is enabled)<br>0 = transparent<br>1 = opaque | `value` |
| `editmatscale` | sets the colour saturation of material volumes<br>0 = black<br>1 = oversaturated | `value` |

#### edit normal/alt world commands

Append `alt` to configure settings for the alternate map variant (`mapvariant 2`).

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `envlayer[alt]` | sets the level's env layer to the specified file | `path` |
| `skycolour[alt]` | changes the colour of the skybox | `hexcolour` |
| `skybox[alt]` | loads a set of 6 images into the level's skybox associated by name from the specified basepath;<br>e.g. "skyboxes/gradient" will load gradient_{up,dn,lf,rt,bk,ft}.{png,jpg} | `basepath` |
| `cloudbox[alt]` | loads a set of 6 images into the level's cloudbox associated<br>by name from the specified basepath;<br>e.g. "skyboxes/gradient"<br>will load gradient_{up,dn,lf,rt,bk,ft}.{png,jpg} | `path` |
| `cloudlayer[alt]` | sets the level's cloud layer to the specified file | `path` |
| `cloudheight[alt]` | set cloud placement;<br>-1 = bottom of the skybox<br>1 = top of the skybox | `value` |
| `cloudscale[alt]` | controls the scale of the cloud layer | `value` |
| `cloudscrollx[alt]` | controls the movement speed of the cloud layer on the x axis | `value` |
| `cloudscrolly[alt]` | controls the movement speed of the cloud layer on the y axis | `value` |
| `cloudlayercolour[alt]` | controls the colour of the cloud layer | `hexcolour` |
| `cloudfade[alt]` | controls how the cloud layer fades around the edges | `value` |
| `cloudsubdiv[alt]` | sets the cloud layer subdivision size (number of vertices) | `value` |
| `cloudblend[alt]` | sets the opacity of the cloud layer | `value` |
| `skylight[alt]` | set colour and brightness of a uniform downwards-facing<br>lightsource spanning the whole sky | `value` |
| `sunlight[alt]` | set colour and brightness of an infinitely far away point<br>light source from the sky | — |
| `sunlightyaw[alt]` | yaw angle (horizontal orientation) of the sunlight light source | `angle` |
| `sunlightpitch[alt]` | angle of incidence of the sunlight light source from the horizontal<br>plane (90 is vertical) | `angle` |
| `ambient[alt]` | set colour and brightness of a uniform ambient light throughout<br>the whole map | `value` |
| `fog[alt]` | set fade distance of map fog | `value` |
| `fogcolour[alt]` | set colour of map fog | `value` |
| `fogdomecap[alt]` | toggles enclosement of the bottom of the fogdome | `boolean` |
| `fogdomeclip[alt]` | sets the size at which to cut off the fogdome | `value` |
| `fogdomeclouds[alt]` | toggles whether clouds are blocked by the fogdome | `boolean` |
| `fogdomecolour[alt]` | sets the colour of the fogdome | `colour` |
| `fogdomeheight[alt]` | sets the height to which the fogdome is centered | `value` |
| `fogdomemax[alt]` | sets the maximum opacity of the fogdome | `value` |
| `fogdomemin[alt]` | sets the minimum opacity of the fogdome | `value` |
| `yawsky[alt]` | set yaw angle (horizontal orientation) of the skybox | `angle` |
| `pitchsky[alt]` | set pitch angle (y axis orientation) of the skybox | `angle` |
| `rollsky[alt]` | set yaw angle (x axis orientation) of the skybox | `angle` |
| `yawcloudlayer[alt]` | set yaw angle (horizontal orientation) of the cloud layer | `angle` |
| `yawclouds[alt]` | set yaw angle (horizontal orientation) of the cloudbox layer | `angle` |
| `pitchclouds[alt]` | set pitch angle (y axis orientation) of the cloudbox layer | `angle` |
| `rollclouds[alt]` | set yaw angle (x axis orientation) of the cloudbox layer | `angle` |
| `yawenvlayer[alt]` | set yaw angle (horizontal orientation) of the env layer | `angle` |
| `envlayerblend[alt]` | sets the opacity of the env layer | `value` |
| `envlayercolour[alt]` | sets the colour of the env layer | `colour` |
| `spinsky[alt]` | sets the z axis rotation speed of the skybox, in degrees per second | `value` |
| `spinskypitch[alt]` | sets the y axis rotation speed of the skybox, in degrees per second | `value` |
| `spinskyroll[alt]` | sets the x axis rotation speed of the skybox, in degrees per second | `value` |
| `spincloudlayer[alt]` | sets the rotation speed of the cloud layer, in degrees per second | `value` |
| `spinclouds[alt]` | sets the z axis rotation speed of the cloudbox, in degrees per second | `value` |
| `spincloudspitch[alt]` | sets the y axis rotation speed of the cloudbox, in degrees per second | `value` |
| `spincloudsroll[alt]` | sets the x axis rotation speed of the cloudbox, in degrees per second | `value` |
| `spinenvlayer[alt]` | sets the rotation speed of the env layer, in degrees per second | `value` |
| `ambientscale[alt]` | sets the brightness factor for the ambient colour | `value` |
| `gidist[alt]` | sets the global illumination distance for the map | `value` |
| `giscale[alt]` | sets the global illumination scale for the map | `value` |
| `aodark[alt]` | sets the darkness of ambient obscurance (corner darkening)<br>for the map | `value` |
| `aomin[alt]` | sets the floor for ambient obscurance darkness (1 = no AO) | `value` |
| `aoradius[alt]` | sets the radius for ambient obscurance disk area | `value` |
| `aosun[alt]` | toggles if sunlit areas are subject to ambient obscurance | — |

#### edit atmo commands

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `atmo[alt]` | sets mode of atmo-type skybox:<br>0: off<br>1: in front of skybox<br>2: behind skybox | `mode` |
| `atmoblend[alt]` | sets opacity of atmo effect (0: skybox only; 1: atmo only) | `value` |
| `atmobright[alt]` | sets brightness of atmo effect | `value` |
| `atmodensity[alt]` | sets ability of light to penetrate whole sky (higher values<br>mean a darker sky) | `value` |
| `atmodisk[alt]` | sets color of light disk in the sky | `value` |
| `atmodiskbright[alt]` | sets brightness of light disk in sky | `value` |
| `atmodisksize[alt]` | sets diameter of light disk in sky | `size` |
| `atmohaze[alt]` | sets haze scale (how much light disk scatters in sky) | `value` |
| `atmoheight[alt]` | sets thickness of atmosphere | `value` |
| `atmolight[alt]` | sets tint of whole atmo sky | `value` |
| `atmolightscale[alt]` | sets lightscale of whole atmo sky | `value` |
| `atmoplanetsize[alt]` | sets sharpness of haze below horizon | `value` |

#### wind commands

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `windyaw[alt]` | sets yaw angle (horizontal orientation) of the global wind | `angle` |
| `windspeed[alt]` | sets the strength of the global wind | `value` |
| `windinterval[alt]` | sets the period interval of the global wind | `milliseconds` |

#### edit view commands

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `fullbright` | hides lightmap for all textures if enabled | `boolean` |
| `dtoutline` | edit outline only outlines visible surfaces when enabled;<br>when disabled, all rendered geometry is outlined | `boolean` |
| `wireframe` | renders geometry using edges rather than faces | `boolean` |
| `outline` | renders lines on geometry edges if enabled | `boolean` |
| `outlinecolour` | colour to render the geometry outline with | `colour` |
| `changeoutline` | changes the outline colour by moving through the<br>outlinecolours list 'index' number of times:<br>Entries:<br>255 255 255 white<br>000 000 000 black<br>000 127 255 teal<br>255 080 080 salmon<br>255 000 255 magenta<br>080 255 080 green<br>255 255 080 yellow<br>off | `index` |
| `blankgeom` | renders geometry with blank white diffuse maps if enabled | `boolean` |
| `crosshairdistance` | shows distance to geometry at cursor (in metres) if enabled | `boolean` |
| `crosshairdistancex` | x offset for crosshair distance readout | `value` |
| `crosshairdistancey` | y offset for crosshair distance readout | `value` |

#### edit v- texture commands

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `voffset` | replaces texture with one offset by the given number<br>(positive only) of pixels | `x-offset y-offset` |
| `vscroll` | replaces selected textures with a scrolling one,<br>with vscroll 1 being 1 texture/sec | `x-scroll y-scroll` |
| `vrefract` | replaces texture, adding a refractive effect in alpha geometry<br>with the specified colour | `refract red green blue` |
| `valpha` | replaces current texture by one with a new alpha<br>transparency level; 0 (transparent) to 1 (opaque) | `external internal` |
| `vcoastscale` | replaces current texture by one with a new<br>coastscale factor (slipperiness) | `value` |
| `vscale` | replaces selected textures with scaled versions,<br>minimum is 0.125, maximum is 8 | `value` |
| `vrotate` | replaces selected textures with rotated or flipped versions;<br>0 = default<br>1-3 = rotate 90*this degrees<br>4 = flipped left-to-right<br>5 = flipped top-to-bottom<br>6 = transposed<br>7 = flipped & transposed | `value` |
| `vangle` | replaces selected textures with finely rotated versions by angle | `degrees` |
| `autotexangle` | replaces selected textures with rotated versions by angle, based on the slope (1-8). Negative values are accepted. | `slope` |
| `vcolour` | replaces selected textures with colour-tinted versions,<br>e.g. 1 0.2 0.2 will create red versions, default is 1 1 1 | `red green blue` |
| `vpalette` | applies colour specified by set & id from the builtin palette;<br>set 0 = pulse colours<br>0 = turn off all palette effects<br>1 = dark fire pulse colours<br>2 = bright fire pulse colours<br>3 = disco pulse colours (bomber-ball)<br>set 1 = team colours<br>0-3 = only enforced in teamplay games<br>4-7 = enforced at all times<br>set 2 = weapon colours<br>0-17 = only enforced when that weapon is currently spawnable<br>18-35 = enforced at all times | `set id` |
| `vreset` | resets a vtexture to its original settings | — |
| `vdelta` | combines with texture v*-commands to adjust rather than<br>overwrite the setting;<br>example: vdelta [vcolour 1 .5 .5]<br>example: vdelta [voffset 0 +16] | `command settings..` |
| `vshaderparam` | set shader parameters of textures;<br>independent of vdelta, only one shader parameter may be<br>overridden per texture, previous modifications are lost<br>envmin r g b = sets the minimum incidence angle for envmaps<br>(default .1 .1 .1),<br>envmin 1 1 1 makes intense envmaps at any angle<br>envscale r g b = intensity scale of envmaps<br>glowcolor r g b = adjusts the 3d glow colour of a texture,<br>parallaxscale low high = adjusts the heightmap effect of tex,<br>pulseglowcolor r g b = sets the colour to pulse to<br>(when enabled)<br>pulseglowspeed f = frequency (Hz) of pulsing effect<br>(when enabled)<br>pulseglowoffset i = offset interval of pulsing effect<br>(when enabled)<br>specscale r g b = specularity colour/brightness of a texture,<br>(default .2 .2 .2)<br>triplanarbias x y z = adjusts blending factor between<br>side faces and top faces<br>gloss scale = sets scale of specular gloss<br>normalscale scale = sets scale of the normalmap | `parameter properties` |
| `vlayer` | sets the bottom texture layer for all textures in selection;<br>texture_id is the texture number as seen in the<br>texture browser | `texture_id` |
| `vshadow` | sets shadow opacity for alpha geometry (-1 no shadow, 0 (color refract only) to 1 (full opacity contribution) | `value` |
| `vgrasscolourroot` | grows grass on the selected textures from its root up in this colour;<br>0 = no grass, or a pulse colour below 0 | `colour` |
| `vgrasscolourmiddle` | blends the grass of the selected textures to this colour at its middle;<br>0 = keep the root colour | `colour` |
| `vgrasscolourtip` | blends the grass of the selected textures to this colour at its tip;<br>0 = keep the middle colour | `colour` |
| `vgrassblend` | sets the opacity of the grass of the selected textures;<br>0 = the usual | `value` |
| `vgrassdensity` | sets the grass blades per square unit of the selected textures;<br>0 = the usual | `value` |
| `vgrasswidth` | sets the width at the root of the grass blades of the selected textures, or each ribbon of a frond;<br>0 = the usual | `value` |
| `vgrassbladeshape` | sets the shape around the grass blades of the selected textures, as seen cut across them, by its place in the list of grassbladeshapedef;<br>0 = flat | `shape` |
| `vgrassbladetaper` | sets how far the grass blades of the selected textures narrow to their tips, from 0 not at all to 1 to a point;<br>-1 = to a point | `value` |
| `vgrassfrondribbons` | sets how many wavy ribbons the grass blades of the selected textures are drawn as, such as seaweed, which suit flat and crossed shapes, as solid shapes show gaps;<br>0 = a plain blade | `value` |
| `vgrassfrondwaves` | sets how many waves run up the frond ribbons of the selected textures;<br>-1 = the usual | `value` |
| `vgrassfrondswing` | sets how far the frond ribbons of the selected textures swing to each side, in ribbon widths;<br>-1 = the usual | `value` |
| `vgrassfrondruffle` | sets how much the width of the frond ribbons of the selected textures ruffles;<br>-1 = the usual | `value` |
| `vgrassfrondripple` | sets how fast the waves ripple up the frond ribbons of the selected textures;<br>-1 = the usual | `value` |
| `vgrassheight` | sets the height of the grass of the selected textures;<br>0 = the usual | `value` |
| `vgrassspec` | sets the specular shine of the grass of the selected textures;<br>-1 = the usual | `value` |
| `vgrassnormalblend` | sets how far the grass blades of the selected textures are lit like the ground beneath them;<br>-1 = the usual | `value` |
| `vgrassrecover` | sets how long the trampled grass of the selected textures takes to stand up again;<br>0 = the usual | `milliseconds` |
| `vgrasstramplehold` | sets the share of the recovery time the trampled grass of the selected textures stays flat;<br>-1 = the usual | `value` |
| `vgrasselements` | sets which elements affect the grass of the selected textures, as bits: 1 = fire, 2 = energy, 4 = acid;<br>-1 = all of them | `value` |
| `vgrassscorchhold` | sets how long the scorched or wilted grass of the selected textures stays that way;<br>0 = the usual | `milliseconds` |
| `vgrassscorchregrow` | sets how long the scorched or wilted grass of the selected textures takes to recover;<br>0 = the usual | `milliseconds` |
| `vtouchtex` | sets the texture shown where the selected textures are touched, fading back to them after;<br>0 = none | `texture` |
| `vtouchtexfade` | sets how long a touched tile of the touch texture of the selected textures takes to fade back;<br>0 = never shown | `milliseconds` |
| `vtouchtexby` | sets what shows the touch texture of the selected textures, as bits: 1 = live actors, 2 = dead ones, 4 = dropped items, 8 = shots;<br>-1 = all of them | `value` |
| `vgrasscastshadow` | sets the shadows the grass of the selected textures casts for players who turn them on;<br>0 = none, 1 = static, 2 = animated with the wind | `value` |
| `vgrassstiffness` | sets how far the grass blades of the selected textures resist leaning, the wind and trampling;<br>-1 = the usual | `value` |
| `vgrassanimmillis` | sets the length of a gust of wind through the grass of the selected textures;<br>0 = the map's grassanimmillis | `milliseconds` |
| `vgrassanimscale` | sets how far the wind bends the grass of the selected textures;<br>-1 = the map's grassanimscale | `value` |
| `vgrassvariation` | sets how far clumps and blades of the grass of the selected textures stray from their colours;<br>-1 = the usual | `value` |
| `vgrassmottle` | sets how much the grass of the selected textures changes across the ground in broad patches;<br>-1 = the usual | `value` |
| `vgrassmottlesize` | sets how wide the patches of the grass of the selected textures are, 16 to 4096;<br>0 = the usual | `value` |
| `vgrassheadshape` | sets the shape of a kind of head grown among the grass of the selected textures;<br>0 = flower, 1 = cattail, 2 = seed head, 3 = mushroom, 4 = puff,<br>5 = bell, 6 = lavender, 7 = thistle, 8 = glowing bulb | `slot shape` |
| `vgrassheadcolour` | grows a kind of head among the grass of the selected textures in this colour;<br>0 = none, or a pulse colour below 0 | `slot colour` |
| `vgrassheadstalkshape` | sets the blade shape around the stalks of a kind of head of the selected textures, by its place in the list;<br>-1 = the head shape's | `slot shape` |
| `vgrassheadaccent` | sets the colour of the secondary part of a kind of head of the selected textures, such as a flower's centre;<br>0 = the shape's, or a pulse colour below 0 | `slot colour` |
| `vgrassheadshare` | sets the share of the grass blades of the selected textures that grow a kind of head instead;<br>0 = the default, 1 = every blade | `slot value` |
| `vgrassheadsize` | sets the size of a kind of head on the selected textures against its usual size, 0.1 to 3 | `slot value` |
| `vgrassheadvariance` | sets how much bigger or smaller than its size a kind of head on the selected textures may grow, 0 to 1 | `slot value` |
| `vgrassheadstiffness` | sets how far a kind of head on the selected textures resists the wind and trampling;<br>-1 = its shape's usual stiffness | `slot value` |
| `vgrassheadstalkheight` | sets the height of the stalks of a kind of head on the selected textures against its shape's usual, 0.1 to 4;<br>0 = the usual | `slot value` |
| `vgrassheadstalkwidth` | sets the width of the stalks of a kind of head on the selected textures against its shape's usual, 0.1 to 4;<br>0 = the usual | `slot value` |
| `vgrassheadstalktaper` | sets how far the stalks of a kind of head on the selected textures narrow to their tops, 0 to 1;<br>-1 = its shape's usual | `slot value` |

#### edit materials

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `editmat` | modifies the material properties for selected cubes;<br>type is the material to be applied {water, clip, ladder..},<br>filter limits the command to only affect cubes whose material<br>match this, if given as empty string "" it matches all;<br>style limits the command to only affect cubes whose<br>geometry match this:<br>0 = normal<br>1 = non-empty<br>2 = empty<br>3 = not entirely solid<br>4 = entirely solid<br>example: editmat air water 2 would set all empty cubes<br>with water within the current selection to instead be air | `type filtermat filterstyle` |
| `showmat` | toggles the visibility of material volumes | `value` |
| `showphyslayers` | toggles the visibility of physical layers | `value` |
| `air` | removes all materials from the selected volume;<br>specify a material to only clear cubes with the<br>specified material already present | `[filter]` |
| `clip` | fills the selected volume with an invisible barrier<br>which projectiles and particles can pass through;<br>specify a material to only clip cubes with the specified<br>material already present | `filter` |
| `noclip` | allows players and projectiles to pass through the<br>selected volume; specify a material to only noclip cubes<br>with the specified material already present | `filter` |
| `death` | causes projectiles and players (if their feet touch the volume)<br>to be instantly killed; specify a material to only add death<br>to cubes with the specified material already present | `filter` |
| `aiclip` | causes the bot waypoint dropper to not place waypoints<br>within the selected volume; specify a material to only<br>aiclip cubes with the specified material already present | `filter` |
| `ladder` | allows players to climb vertical surfaces within the<br>selected volume; specify a material to only enable ladders<br>with the specified material already present | `filter` |
| `alpha` | makes the selected geometry translucent;<br>specify a material to only alpha cubes with the specified<br>material already present | `filter` |
| `hurt` | causes projectiles and players (if their feet touch the volume)<br>to be damaged at a specified rate and amount<br>(hurtdelay/hurtdamage); specify a material to only<br>enable hurt with the speified material already present | `filter` |
| `optmats` | toggles automatic material remip optimization (recommended on in almost all circumstances) | `boolean` |
| `hurtdamage` | hurt material damages players by this much<br>(note that player HP is out of 1000) | `value` |
| `hurtdelay` | milliseconds between hurtmat damaging players | `value` |
| `hurtresidual` | residual effects inflicted by hurt material (bitwise OR) | `burn bleed shock corrode` |
| `hurtbleeddamage` | hurt's bleed residual (when enabled) damages players this much<br>(note that player HP is out of 1000) | `value` |
| `hurtbleeddelay` | hurt's bleed residual (when enabled) damages players this often<br>(in milliseconds) | `value` |
| `hurtbleedtime` | hurt's bleed residual (when enabled) lasts this long<br>(in milliseconds) | `value` |
| `hurtburndamage` | hurt's burn residual (when enabled) damages players this much<br>(note that player HP is out of 1000) | `value` |
| `hurtburndelay` | hurt's burn residual (when enabled) damages players this often<br>(in milliseconds) | `value` |
| `hurtburntime` | hurt's burn residual (when enabled) lasts this long<br>(in milliseconds) | `value` |
| `hurtshockdamage` | hurt's shock residual (when enabled) damages players this much<br>(note that player HP is out of 1000) | `value` |
| `hurtshockdelay` | hurt's shock residual (when enabled) damages players this often<br>(in milliseconds) | `value` |
| `hurtshocktime` | hurt's shock residual (when enabled) lasts this long<br>(in milliseconds) | `value` |
| `hurtshockstun` | stun effects of hurt's shock residual (when enabled) (bitwise OR) | `[slow over time] [lower gravity over time] [slow immediately] [lower gravity immediately] [slip]` |
| `hurtshockstunfall` | how much hurt's shock residual (when enabled) stun reduces gravity (0-1) | `value` |
| `hurtshockstunscale` | how much hurt's shock residual (when enabled) stun slows movement (0-1) | `value` |
| `hurtshockstuntime` | hurt's shock residual (when enabled) has its stun effect last this long | `milliseconds` |
| `hurtcorrodedamage` | hurt's corrode residual (when enabled) damages players this much<br>(note that player HP is out of 1000) | `value` |
| `hurtcorrodedelay` | hurt's corrode residual (when enabled) damages players this often<br>(in milliseconds) | `value` |
| `hurtcorrodetime` | hurt's corrode residual (when enabled) lasts this long<br>(in milliseconds) | `value` |

#### edit map obituaries

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `obitdeath` | determines death message caused by deathmat<br>(map setting) | `string` |
| `obitfall` | one of the unused obits<br>(should not see in normal gameplay) | `string` |
| `obithurt` | determines death message caused by entering<br>hurt material (map setting) | `string` |
| `obitlava` | determines death message caused by entering<br>lava1 (map setting) | `string` |
| `obitlava2` | determines death message caused by entering<br>lava2 (map setting) | `string` |
| `obitlava3` | determines death message caused by entering<br>lava3 (map setting) | `string` |
| `obitlava4` | determines death message caused by entering<br>lava4 (map setting) | `string` |
| `obitwater` | determines death message caused by entering<br>deathmat water1 (map setting) | `string` |
| `obitwater2` | determines death message caused by entering<br>deathmat water2 (map setting) | `string` |
| `obitwater3` | determines death message caused by entering<br>deathmat water3 (map setting) | `string` |
| `obitwater4` | determines death message caused by entering<br>deathmat water4 (map setting) | `string` |

#### edit read only vars

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `getblendbrushname` | returns the name of the blendmapping brush with the specified index | `index` |
| `getseltex` | returns the currently selected texture's vslot (if selected),<br>or the texture on the cursor if none is selected;<br>if there is no texture (possibly caused by too<br>large of a gridpower), will return -1 | — |
| `gettexname` | returns the path and name of a texture's diffuse texture given a specified vslot (texture) | `vslot` |
| `getdecalname` | returns the path and name of a decal texture's diffuse texture given a specified decal slot | `decal slot` |
| `getvalpha` | returns the alpha setting for the specified vslot (texture) | `vslot` |
| `getvcoastscale` | returns the coast scale (slipperiness factor) for the specified<br>vslot (texture) | `vslot` |
| `getvcolour` | returns the colour modifications for the specified vslot (texture) | `vslot` |
| `getvdetail` | returns the vslot (texture) for the texture assigned as the<br>detail layer | `vslot` |
| `getvlayer` | returns the vslot (texture) for the texture assigned as the<br>blendmap layer | `vslot` |
| `getvoffset` | returns the number of pixels in the x and y directions<br>respectively for the specified vslot (texture) | `vslot` |
| `getvpalette` | returns the palette set/id values for a specified vslot (texture)<br>see `vpalette` for full set/id information | `vslot` |
| `getvrefract` | returns the refraction scale and colours, respectively, for the<br>specified vslot (texture) | `vslot` |
| `getvrotate` | returns the rotation number of the specified vslot (texture)<br>see `vrotate` for translation of rotation numbers | `vslot` |
| `getvangle` | returns the rotation angle of the specified vslot (texture) in degrees | `vslot` |
| `getvscale` | returns the scale factor of the specified vslot (texture) | `vslot` |
| `getvshaderparam` | returns the value of the specified vshader for the specified<br>vslot (texture); see `vshaderparam` for vshader<br>descriptions | `vslot vshader` |
| `lightbatches` | current number of lights batches the scene is using to render | — |
| `lightbatchrects` | current number of rectangles the lighting is using to map lights | — |
| `lightbatchstacks` | current number of light batch stacks the scene is using to render | — |
| `lightpassesused` | current number of lighting passes to render the scene | — |
| `lightsoccluded` | current number of lights the engine is able to occlude and<br>not render | — |
| `lightsvisible` | returns current number of lights the engine is rendering | — |
| `mapcrc` | returns the checksum of the current map | — |
| `maprevision` | returns the revision of the current map | — |
| `mapsize` | dimensions of the map, in gridpower 0 cubes<br>(default newmap is 2^10 = 1024)<br>to convert to metres, divide by 8 | — |
| `numvslots` | number of texture variations in the level | — |

### binds

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `kmod` | takes up to three modifiers (CTRL, ALT, SHIFT) and returns a key modifier mask for use with editbind and geteditbind | `modifer, modifier, modifier` |
| `bind` | binds an action to a key. WARNING: This overrides existing binds for that key;<br>key is a key, for example KP1 or RETURN,<br>action is a command to be executed when the key is pressed,<br>example: bind O [echo O was pressed .. ; onrelease [echo .. and released]] | `key action` |
| `editbind` | binds an edit mode action to a key. WARNING: This overrides existing edit binds for that key;<br>key is a key, for example KP1 or RETURN,<br>action is a command to be executed when the key is pressed in edit mode. | `key action kmod` |
| `specbind` | binds a spectator mode action to a key. WARNING: This overrides existing spectator binds for that key;<br>key is a key, for example KP1 or RETURN,<br>action is a command to be executed when the key is pressed in spectator mode. | `key action` |
| `getbind` | returns the command associated with a given key bind;<br>key is a key, for example KP1 or RETURN. | `key` |
| `geteditbind` | returns the command associated with a given key bind for edit mode;<br>key is a key, for example KP1 or RETURN. | `key kmod` |
| `getspecbind` | returns the command associated with a given key bind for spectator mode;<br>key is a key, for example KP1 or RETURN. | `key` |
| `searchbinds` | finds key binds for a given action;<br>this is used by the dobindsearch alias | `action [formatting options]` |
| `searcheditbinds` | finds edit key binds for a given action;<br>this is used by the dobindsearch alias | `action [formatting options]` |
| `searchspecbinds` | finds spectator key binds for a given action;<br>this is used by the dobindsearch alias | `action [formatting options]` |
| `dobindsearch` | prints out a nicely formatted string with the key binds for a given action;<br>action is the action to search for,<br>[mode] can be edit or spec to search for the corresponding mode specific binds. | `key [mode]` |

### aliases and input

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `echo` | prints the argument to the console | `input` |
| `echocolour` | prints the argument to the console with the specified colour | `colour input` |
| `setpersist` | toggles an alias as persistent, that is, determines if it will be added to config.cfg;<br>bool: 0 = not persistent, 1 = persistent | `alias bool` |
| `local` | declares a set of aliases as local to the alias (function) it was declared in | — |
| `alias` | defines a new alias (variable or command block);<br>example: alias pi 3.14159265359<br>is equivalent to: pi = 3.14159265359 | `name contents` |
| `getalias` | looks up the contents of an alias;<br>example: echo (getalias dm)<br>is equivalent to: echo $dm | `name` |
| `inputconsole` | prepares input to the command line;<br>[init] is the input string<br>[prompt] is an optional prompt to use next to the input<br>[action] is an optional command to execute after inputconsole | `[init] [prompt] [action]` |
| `setcomplete` | Enables (or disables) tab-completion of a command;<br>name is the name of a command or alias,<br>[bool] (1) enables completion of name (the dafault is 0, disabled). | `name [bool]` |
| `listcomplete` | Enables tab-completion of a command's first argument;<br>name is a command or alias,<br>list is a list of valid arguments to be completed | `name list` |
| `playercomplete` | Enables tab-completion for players as argument of a command;<br>name is a command or alias,<br>remove can be omitted to add a completion or set to >0 to remove the completion | `name remove` |
| `complete` | Enables tab-completion for files as argument of a command;<br>name is a command or alias,<br>[path] is a directory to look for the files, note the path is not contained in the auto-completed argument,<br>extension allows to pick only a certain file type, and will omit the extension when completing file names.<br>example: complete filecomp config cfg | `name [path] [extension]` |
| `defvarp` | defines a persistent integer alias | `alias-name min default max exec-on-change` |
| `deffvarp` | defines a persistent float alias | `alias-name min default max exec-on-change` |
| `defhvarp` | defines a persistent hexadecimal alias (note that inputs are decimal) | `alias-name min default max exec-on-change` |
| `defsvarp` | defines a persistent string alias | `alias-name default exec-on-change` |
| `defvar` | defines a non-persistent integer alias | `alias-name min default max exec-on-change` |
| `deffvar` | defines a non-persistent float alias | `alias-name default exec-on-change` |
| `defhvar` | defines a non-persistent hexadecimal alias (note that inputs are decimal) | `alias-name min default max exec-on-change` |
| `defsvar` | defines a non-persistent string alias | `alias-name default exec-on-change` |
| `getvarmin` | returns the minimum value of varname, a built-in integer variable;<br>example: getvarmin firstpersonfov | `varname` |
| `getvarmax` | returns the maximum value of varname, a built-in integer variable;<br>example: getvarmax firstpersonfov | `varname` |
| `getfvarmin` | returns the minimum value of varname, a built-in float variable;<br>example: getfvarmin movespeed | `varname` |
| `getfvarmax` | returns the maximum value of varname, a built-in float variable;<br>example: getfvarmax movespeed | `varname` |
| `isonline` | returns 1 if you are online and 0 if not | — |

### cubescript core commands

Game-agnostic descriptions of the CubeScript implementation in-game: basic control logic and operators.

#### loops and whiles

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `loop` | executes body with var incremented from 0 to count-1;<br>example: loop i 10 [ echo $i ] | `var count body` |
| `loop+` | executes body with var incremented from 0 to count-1, shifted by the offset given | `var offset count body` |
| `loop*` | executes body with var incremented from 0 to (count-1)*step, in increments of the defined step | `var step count body` |
| `loop+*` | executes body with var decremented from 0 to (count-1)*step, in increments of the defined step, and shifted by the offset given | `var offset step count body` |
| `looprev` | executes body with var decremented from 0 to count-1;<br>example: loop i 10 [ echo $i ] | `var count body` |
| `looprev+` | executes body with var decremented from 0 to count-1, shifted by the offset given | `var offset count body` |
| `looprev*` | executes body with var decremented from 0 to (count-1)*step, in increments of the defined step | `var step count body` |
| `looprev+*` | executes body with var decremented from 0 to (count-1)*step, in increments of the defined step, and shifted by the offset given | `var offset step count body` |
| `loopwhile` | executes body with var incremented from 0 to count-1 while the provided condition is true;<br>example: loop i 10 [ echo $i ] | `var count body` |
| `loopwhile+` | executes body with var incremented from 0 to count-1, shifted by the offset given, while the provided condition is true | `var offset count body` |
| `loopwhile*` | executes body with var incremented from 0 to (count-1)*step, in increments of the defined step, while the provided condition is true, while the provided condition is true | `var step count body` |
| `loopwhile+*` | executes body with var decremented from 0 to (count-1)*step, in increments of the defined step, and shifted by the offset given | `var offset step count body` |
| `loopwhilerev` | executes body with var decremented from 0 to count-1 while the provided condition is true;<br>example: loop i 10 [ echo $i ] | `var count body` |
| `loopwhilerev+` | executes body with var decremented from 0 to count-1, shifted by the offset given, while the provided condition is true | `var offset count body` |
| `loopwhilerev*` | executes body with var decremented from 0 to (count-1)*step, in increments of the defined step, while the provided condition is true | `var step count body` |
| `loopwhilerev+*` | executes body with var decremented from 0 to (count-1)*step, in increments of the defined step, and shifted by the offset given, while the provided condition is true | `var offset step count body` |
| `loopconcat` | returns a string with the result of the body concatenated with var incremented from 0 to count-1;<br>example: loopconcat i 10 [ result $i ] | `var count body` |
| `loopconcatword` | returns a string with the result of the body concatword-ed with var incremented from 0 to count-1;<br>example: loopconcatword i 10 [ result $i ] | `var count body` |
| `loopfiles` | executes body with var set to each file in directory with the given extension ("" for extension is all files);<br>example: loopfiles f data cfg [ echo $f ] | `var directory extension body` |
| `looplist` | executes body with var set to each item in list;<br>example: looplist i "this is a list" [ echo $i ] | `var list body` |
| `loopscoreboard` | executes body with var set to players' cn in order of their points within a given scoregroup number (team alpha/omega/neutral/spec etc.) | `var scoregroup body` |
| `loopscoregroups` | executes body with var set to scoregroup numbers in order (0,1,2..) | `var, body` |
| `looplistconcat` | executes body with var set to each entry in list and concats the output together into a list | `var list command` |
| `looplistconcatword` | executes body with var set to each entry in list and concats the output together into a string without spaces | `var list command` |
| `while` | executes body while cond is true;<br>example: i = 0; while [  $i 10 ] [ echo $i; i = (\| $i 1) ] | `<cond> body` |

#### list operations

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `indexof` | returns the index in list of data;<br>example: indexof "this is a list" list | `list data` |
| `listdel` | returns the list1 with all occurrences of each element in list2 removed, it is equivalent to set difference;<br>example: listdel "this list has duplicates" "this duplicates", will return "list has" | `list1 list2` |
| `listintersect` | returns a list containing the elements in the order of list1 with only the elements common to both list1 and list2 | `list1, list1` |
| `listunion` | returns a list containing the elements of list1 followed by nonduplicate elements of list2 | `list1 list2` |
| `listfind` | returns the index in list where the body returns true, similar to looplist;<br>example: listfind i "this is a list" [ result (= (strstr $i l) 0) ] | `var list body` |
| `listlen` | returns the length of the list;<br>example: listlen "this is a list" | `list` |
| `listsplice` | returns a list where the elements between the start index and the end or for count elements is replaced with value;<br>example: listsplice "1 2 3 4 5 6" insert 2 3 | `list value start count` |
| `prettylist` | returns a recombined list with a comma placed between each list element and conjunctor placed between the last two elements (in addition to the comma);<br>example: prettylist "1 2 3 4" and | `list conjunctor` |
| `shrinklist` | returns a list of all element that exists in both list1 and list2;<br>if there are no results and failover is 1 or 2, the list that failover points to is returned,<br>without failover, shrinklist is equivalent to set symmetric difference;<br>example: shrinklist "this is a list" "this is another list", will return "this is list" | `list1 list2 [failover]` |
| `sublist` | returns a sublist of list starting at start and ending at the end or for count elements;<br>example: sublist "this is a list" 1 2 | `list start [count]` |
| `sortlist` | returns a sorted list (quicksort) based on the result of body applied onto list;<br>if body returns true the two elements varname_1 and varname_2 will be swapped, unchanged otherwise,<br>example: sortlist "cat ape bear boar" a b [s $a $b], will return "ape bear boar cat" (&lt;s is ascii-alphabetic comparison) | `<list varname_1 varname_2 body` |
| `at` | returns the element at index in list, subsequent indexes are at'd with the previous result;<br>example: at [this has a [nested list]] 3 1 | `list index [nested_index..]` |
| `strstr` | returns the index of search in string;<br>example: strstr "long string" "str" | `string search` |
| `substr` | returns a substr of string starting at start and continuing to the end or for count characters;<br>example: substr "string" 2 3 | `string start [count]` |

#### conditionals and other control logic

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `do` | executes body;<br>example: do [ echo hi ] | `body` |
| `case` | executes the first body where the corresponding test_value is equivalent to integer using integer comparison;<br>for the 'default' case (always true), use () for the test_value, has a limit of 12 conditions,<br>example: case (rnd 3) 0 [ echo 0 ] 1 [ echo 1 ] () [ echo default ] | `integer [test_value body] [test_value body] [..]` |
| `casef` | executes the first body where the corresponding test_value is equivalent to float using float comparison;<br>for the 'default' case (always true) use () for the test_value, has a limit of 12 conditions,<br>example: case (+f (rnd 3) .1) 0.1 [ echo 0.1 ] 1.1 [ echo 1.1 ] () [ echo default ] | `float [test_value body] [test_value body] [..]` |
| `cases` | executes the first body where the corresponding test_value is equivalent to string using string comparison;<br>for the 'default' case (always true) use () for the test_value, has a limit of 12 conditions,<br>example: case (substr "abc" (rnd 3) 1) a [ echo a ] b [ echo b ] () [ echo default ] | `string [test_value body] [test_value body] [..]` |
| `caseif` | executes a list of conditions and body counterparts, stops evaluating if condition is met;<br>example: caseif (=s $var1 moo) [echo moo] (= $var2 woof) [echo woof] () [echo null] | `condition1 body1 condition2 body2 ..` |
| `cond` | executes the first body where the corresponding condition is true, has a limit of 12 conditions;<br>example: i = (rnd 3); cond [ = $i 0 ] [ echo 0 ] [ = $i 1 ] [ echo 1 ] 1 [ echo default ] | `[condition body] [condition body] [..]` |
| `if` | execute true_body when condition is true, otherwise executes false_body;<br>example: if (&lt;= $var 5) [ echo less than or equal to 5 ] [ echo greater than 5 ] | `condition true_body false_body` |
| `result` | sets the return value for the currently executing code to value, note that this does not stop the code execution like return would;<br>example: result 1 | `value` |
| `doif` | executes a list of conditions and body counterparts, continues evaluating even if condition is met;<br>example: doif (=s $var1 moo) [echo moo] (= $var2 woof) [echo woof] () [echo null] | `condition1 body1 condition2 body2 ..` |
| `push` | pushes value into var's stack and executes body then pops value off of var so that var is untouched after execution of body;<br>example: var = 5; push var 10 [ echo $var ]; echo $var | `var value body` |
| `sleep` | executes body after waiting milliseconds of game time, which stops while paused and follows gamespeed;<br>with real set, waits real time instead and keeps running while paused;<br>example: sleep 2000 [ echo waited 2 seconds ] | `milliseconds body [real]` |

#### multary operators

Multary operators take an arbitrary number of arguments and return a single value.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `max` | returns the maximum integer value;<br>example: max 1 3 -9 | `integer..` |
| `maxf` | returns the maximum float value;<br>example: maxf 1.1, 2.9, -9.5 | `float..` |
| `min` | returns the minimum integer value;<br>example: min 1 3 -9 | `integer..` |
| `minf` | returns the minimum float value;<br>example: minf 1.1, 2.9, -9.5 | `float..` |
| `listavg` | returns the aritmetic mean of the values in the list as an integer | `values` |
| `listavgf` | returns the aritmetic mean of the values in the list as a float | `values` |
| `*` | returns all arguments multiplied together as integers | `int..` |
| `*f` | returns all arguments multiplied together as floats | `float..` |
| `+` | returns all arguments added together as integers | `int..` |
| `+f` | returns all arguments added together as floats | `float..` |
| `-` | returns all other arguments subtracted from the first argument as integers | `int..` |
| `-f` | returns all other arguments subtracted from the first argument as floats | `float..` |
| `div` | returns all other arguments divided from the first argument as integers | `int..` |
| `divf` | returns all other arguments divided from the first argument as floats | `float..` |

#### binary operators

Binary operators take two arguments and return a single value (this is not the same as binary logic).

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `mod` | returns the modulus of int1 and int2 (that is, the remainder of int1/int2) | `int1 int2` |
| `modf` | returns the modulus of float1 and float2 (that is, the remainder of float1/float2) | `float1 float2` |
| `pow` | returns base raised to the power of exponent;<br>example: pow 2.1 8.1 | `base exponent` |
| `rnd` | returns a random number between 0 or min and max;<br>example: rnd 50 25 | `max [min]` |
| `round` | returns the float given rounded to the nearest integer to to the nearest N if N is passed | `value, N` |
| `precf` | returns the value float truncated to accuracy number of decimals;<br>example: (precf 0.14986 2) will give 0.14 | `float accuracy` |

#### unary operators

Unary operators take a single argument and return a single value.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `cos` | returns the cosine of float;<br>example: cos 3.1415 | `float` |
| `sin` | returns the sine of float;<br>example: sin 3.1415 | `float` |
| `tan` | returns the tangent of float;<br>example: tan 3.1415 | `float` |
| `acos` | returns the arc-cosine of float;<br>example: acos 1 | `float` |
| `asin` | returns the arc-sine of float;<br>example: asin 1 | `float` |
| `atan` | returns the arc-tangent of float;<br>example: atan 1 | `float` |
| `abs` | returns the absolute value of integer;<br>example: abs -5 | `integer` |
| `absf` | returns the absolute value of float;<br>example: absf -8.5 | `float` |
| `exp` | returns e (2.71828) raised to the float power;<br>example: exp 5.6 | `float` |
| `sqrt` | returns the square root of float;<br>example: sqrt 4 | `float` |
| `log10` | return the logarithm of float with base 10;<br>example: log10 1000 | `float` |
| `log2` | return the logarithm of float with base 2;<br>example: log2 8 | `float` |
| `loge` | return the logarithm of float with base e;<br>example: loge 20.08 | `float` |
| `ceil` | returns the smallest integer larger than the given float | `float` |
| `ceilf` | returns the smallest integer larger than the given float as a float (e.g. ceilf 5.5 -> 6.0) | `float` |
| `floor` | returns the largest integer smaller than the given float | `float` |
| `floorf` | returns the largest integer smaller than the given float as a float (e.g. floorf 5.5 -> 5.0) | `float` |
| `toint` | returns the int representation of the given float; works like `floor` in practice | `float` |
| `bitscan` | returns value of smallest bit in binary representation of number<br>25 -> 0 (2^0)<br>32 -> 5 (2^5) 6 -> 1 (2^1) | `int` |
| `strlen` | returns the length of string;<br>example: strlen "four" | `string` |
| `rndstr` | returns random characters with a length given by the argument | `length` |

#### boolean operators

Boolean operators output true (`1`) or false (`0`), unlike the arithmetic/bitwise operators above.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `&` | returns the bit-wise AND of int1 and int2 | `int1 int2` |
| `&~` | returns the bit-wise NOT of the bit-wise AND of int1 and int2 | `int1 int2` |
| `<<` | returns &lt;int1 left shifted int2 times | `int1 int2` |
| `>>` | returns int1 right shifted int2 times | `int1 int2` |
| `^` | returns the bit-wise XOR of int1 and int2 | `int1 int2` |
| `^~` | returns the bit-wise NOT of the bit-wise XOR of int1 and int2 | `int1 int2` |
| `\|` | returns the bit-wise OR of int1 and int2 | `int1 int2` |
| `\|~` | returns the bit-wise NOT of the bit-wise OR of int1 and int2 | `int1 int2` |
| `~` | returns the bit-wise NOT of int | `int` |
| `!` | returns the logical not of condition | `condition` |
| `&&` | returns the logical and of all given conditions | `condition..` |
| `?` | returns true_body when condition is true, otherwise false_body | `condition true_body false_body` |
| `\|\|` | returns the logical or of all given conditions | `condition..` |
| `!=` | returns true when int1 is not equal to int2 | `int1 int2` |
| `!=f` | returns true when float1 is not equal to float2 | `float1 float2` |
| `!=s` | returns true when string1 is not equal to string2 on the ascii table | `string1 string2` |
| `<=` | returns true when int1 is less than or equal to int2 | `int1 int2` |
| `<=f` | returns true when float1 is less than or equal to float2 | `float1 float2` |
| `<=s` | returns true when &lt;string1 is less than or equal to string2 on the ascii table | `string1 string2` |
| `<` | returns true when &lt;int1 is less than int2 | `int1 int2` |
| `<f` | returns true when &lt;float1 is less than float2 | `float1 float2` |
| `<s` | returns true when &lt;string1 is less than string2 on the ascii table | `string1 string2` |
| `=` | returns true when int1 is equal to int2 | `int1 int2` |
| `=f` | returns true when float1 is equal to float2 | `float1 float2` |
| `=s` | returns true when string1 is equal to string2 on the ascii table | `string1 string2` |
| `>=` | returns true when int1 is greater than or equal to int2 | `int1 int2` |
| `>=f` | returns true when float1 is greater than or equal to float2 | `float1 float2` |
| `>=s` | returns true when string1 is greater than or equal to string2 on the ascii table | `string1 string2` |
| `>` | returns true when int1 is greater than int2 | `int1 int2` |
| `>f` | returns true when float1 is greater than float2 | `float1 float2` |
| `>s` | returns true when string1 is greater than string2 on the ascii table | `string1 string2` |
| `~=s` | returns true when string1 is equal to string2 ignoring case;<br>example: ~=s "str" "StR" | `string1 string2` |
| `~=sn` | returns true when the first count characters of string1 and string2 are equal ignoring case;<br>example: ~=sn "str" "StRiNg" 3 | `string1 string2 count` |
| `=sn` | returns true when the first count characters of string1 and string2 are equal;<br>example: =sn "str" "string" 3 | `string1 string2 count` |
| `strcasecmp` | returns true when string1 is equal to string2 ignoring case;<br>example: strcasecmp "str" "StR" | `string1 string2` |
| `strcmp` | returns true when string1 is equal to string2, equivalent to =s;<br>example: strcmp "str" "str" | `string1 string2` |
| `strncasecmp` | returns true when the first count characters of string1 and string2 are equal ignoring case;<br>example: strncasecmp "str" "StRiNg" 3 | `string1 string2 count` |
| `strncmp` | returns true when the first count characters of string1 and string2 are equal;<br>example: strncmp "str" "string" 3 | `string1 string2 count` |

#### formatting functions

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `escape` | returns a quoted string with all newline, tab, form feed, ^, and " characters converted to the cubescript escape sequence (^n, ^t, ^f, ^^, ^");<br>example: escape [line1^nline2] | `text` |
| `unescape` | returns a string with all cubescript escape sequences (^n, ^t, ^f, ^^, ^") converted back into newline, tab, form feed, ^, and " respectively;<br>example: unescape [line1^^nline2] | `text` |
| `stripcolors` | returns the string without any colors;<br>example: stripcolors "^frhello ^f[6252287]" | `string` |
| `hexcolour` | converts a decimal color value to a "pretty-printed" hexadecimal color value;<br>example: (hexcolour 342344) will give 0x093548 | `color` |
| `tohex` | converts a decimal integer to one in a hexadecimal base, with the provided length (tohex N 6 is equivalent to hexcolour) | `value, length` |
| `concat` | returns all values concatenated with a space between each argument;<br>example: concat hello (getname) | `value..` |
| `concatword` | returns all values concatenated without a space between each argument;<br>example: concatword squished string | `value..` |
| `clearsleep` | removes all pending sleeps, if clearmapdefs is set, it will only clear sleeps generated in a map's config file;<br>example: clearsleep | `[clearmapdefs]` |
| `format` | returns a formatted string with all %1 - %9 replaced with the respective value argument, %% inserts a % sign;<br>example: format "Hello, %1, welcome to Red Eclipse v. %2" (getname) $version | `format_string value..` |
| `filter` | filters a string by stripping of any or all of the following: newlines, color, and whitespace, each of these values are boolean, and true by default if omitted;<br>[newlines] - if true, replaces newline characters with spaces,<br>[color] - if true, any color formatting will be removed,<br>[whitespace] - if true, whitespace is kept; if false, whitespace is removed | `string [newlines] [color] [whitespace]` |
| `strreplace` | returns string with all occurrences of search replaced with replace;<br>example: strreplace "misspelled sring" "sring" "string" | `string search replace` |
| `strupper` | returns the input string in all uppercase;<br>example: strupper "String" -> "STRING" | — |
| `strlower` | returns the input string in all lowercase;<br>example: strupper "String" -> "string" | — |

### IRC settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `ircaddchan` | joins a channel on a given IRC instance with automatic rejoin;<br>name - name of the IRC instance,<br>channel - channel to join,<br>[friendly] - optional friendly name of channel,<br>[passkey] - optional passkey required for mode +k channels,<br>[relay] - optional relay level (verbosity of output) | `name channel [friendly] [passkey] [relay]` |
| `ircaddclient` | creates an IRC instance of type 'client';<br>name - name of the created IRC instance,<br>host - host to connect to,<br>port - port of host to connect on,<br>nick - nickname to use for the connection,<br>[ip] - optional address to bind to (leave blank for any),<br>[passkey] - optional password required to connect to host | `name host port nick [ip] [passkey]` |
| `ircaddrelay` | creates an IRC instance of type 'relay';<br>name - name of the created IRC instance,<br>host - host to connect to,<br>port - port of host to connect on,<br>nick - nickname to use for the connection,<br>[ip] - optional address to bind to (leave blank for any),<br>[passkey] - optional password required to connect to host | `name host port nick [ip] [passkey]` |
| `ircjoinchan` | joins a channel on a given IRC instance without automatic rejoin;<br>name - name of the IRC instance,<br>channel - channel to join,<br>[friendly] - optional friendly name of channel,<br>[passkey] - optional passkey required for mode +k channels<br>[relay] - optional relay level (verbosity of output) | `name channel [friendly] [passkey] [relay]` |
| `ircfilter` | sets how IRC messages are filtered;<br>0 = send string as is, color escapes not converted, other escapes not filtered,<br>1 = convert Cube2-style color escapes to IRC color escapes,<br>2 = filter out all Cube2-style escapes | `value` |
| `ircbind` | sets the address that an IRC instance binds to;<br>when used without [ip], returns the address that the IRC instance 'name' is currently bound to,<br>name - name of the IRC instance,<br>[ip] - optional ip address for name to bind to | `name [ip]` |
| `ircconnect` | attempts to establish a connection to the IRC instance 'name' | `name` |
| `ircconns` | returns the number of active IRC connections | — |
| `ircfriendlychan` | sets the friendly name of an IRC channel;<br>if the [friendly] parameter is not specified, the current friendly name of the channel is returned,<br>name - name of an IRC instance,<br>channel - the IRC channel,<br>[friendly] - optional new friendly name to use | `name channel [friendly]` |
| `ircnick` | sets the nickname of an IRC instance;<br>if the [nick] parameter is not specified, the current nickname is returned,<br>name - name of the IRC instance,<br>[nick] - optional new nickname | `name [nick]` |
| `ircident` | sets the ident of an IRC instance;<br>if the [ident] parameter is not specified, the current ident is returned,<br>name - name of the IRC instance,<br>[ident] - optional new ident | `name [ident]` |
| `ircauthcommand` | run command to auth when the IRC instance name is connected | `name [command]` |
| `ircpass` | sets the server passkey used by an IRC instance;<br>if the [passkey] parameter is not specified, "set" or "not set" will be returned accordingly,<br>name - name of the IRC instance,<br>[passkey] - optional new passkey | `name [passkey]` |
| `ircpasschan` | sets the passkey for a channel on an IRC instance;<br>if the [passkey] parameter is not specified, "set" or "not set" will be returned accordingly,<br>name - name of the IRC instance<br>channel - the IRC channel,<br>[passkey] - optional new passkey | `name [passkey]` |
| `ircrelaychan` | sets the relay level for a channel on an IRC instance;<br>if the [relay] parameter is not specified, the current relay level will be returned,<br>name - name of the IRC instance,<br>channel - the IRC channel,<br>[relay] - optional new relay level (verbosity of output) | `name channel [relay]` |
| `ircport` | sets the server port used by an IRC instance;<br>if the [port] parameter is not specified, the current server port is returned,<br>name - name of an IRC instance,<br>[port] - optional new port | `name [port]` |
| `ircserv` | sets the host to connect to for a given IRC instance;<br>if the [host] parameter is not specified, the current host is returned,<br>name - name of an IRC instance,<br>[host] - optional new hostname | `name [host]` |
| `ircauth` | sends a message to a specified target when succefully connected to an an IRC server;<br>can be used for setting up automatic authentication,<br>if only name is specified, [target] is returned along with "set" or "not set" for [message],<br>name - name of the IRC instance,<br>[target] - target for the message (user, service, channel),<br>[message] - message sent to [target],<br>example: ircauth myrelay NickServ "IDENTIFY password" | `name [target] [message]` |

### moderation

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `addlocalop` | elevates the privilege of a user to a specified level locally;<br>this allows server administrators to "upgrade" the access of people as they identify, on that particular server,<br>user_handle is the authkey handle of the user,<br>flag is the privilege level {a = administrator m = moderator s = supporter} | `user_handle flag` |
| `resetlocalop` | removes all temporary elevated local privileges;<br>this allows server administrators to reset the access given by addlocalop for all users, on that particular server | — |
| `kick` | kicks a player from the server with an optional reason | `name/cn [text]` |
| `allow` | lets a player join the server while it is locked or private, with an optional reason | `name/cn [text]` |
| `ban` | bans a player from the server with an optional reason | `name/cn [text]` |
| `mute` | mutes a player on the server with an optional reason | `name/cn [text]` |
| `limit` | limits team changing for a player on the server | `name/cn` |
| `except` | protects a player from bans, mutes and limits on the server, with an optional reason | `name/cn [text]` |
| `getcontrols` | asks the server for the allows, bans, mutes, limits and excepts you may see, read with controlinfo | — |
| `controltypes` | returns a bitmask of the control types the server last let you see, or -1 before it has replied | — |
| `controlinfo` | returns a property of a control entry, or the number of entries when index is -1;<br>prop: 0 = id, 1 = type, 2 = scope, 3 = source, 4 = seconds since added, 5 = seconds until it expires (-1 = never), 6 = address, 7 = reason,<br>8 = name and 9 = handle of the player it was applied to, 10 = name, 11 = handle, 12 = address and 13 = privilege of the player who added it | `index prop` |
| `delcontrol` | removes the control entry with an id, from controlinfo | `id` |
| `manageserver` | opens the manage server menu, while connected to a server | — |
| `spectator` | put a player to spectator mode;<br>0 = join/unquarantine, 1 = spectate, 2 = spectate and quarantine | `name/cn mode` |
| `addpriv` | adds local priv to cn;<br>priv: 2 = supporter, 3 = moderator, 4 = administrator | `name/cn priv` |
| `resetpriv` | removes privileges added by addpriv from cn | `name/cn` |
| `adminpass` | sets server admin password, if no password given, it will return the current password | `value` |

### chat commands

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `say` | send a message to the global chat | `text` |
| `me` | send a message to the global chat in the form of an action<br>ex: * foobar demonstrates something | `text` |
| `sayteam` | send a message to the team chat | `text` |
| `meteam` | send a message to the team chat in the form of an action<br>ex: * foobar (to team ..) demonstrates something | `text` |
| `whisper` | send a message directly to another player on the server<br>note: messages are not private and are visible in demos | `name/cn text` |
| `mewhisper` | send a message directly to another player on the server in the form of an action<br>ex: * foobar (whispers to barfoo) demonstrates something<br>note: messages are not private and are visible in demos | `name/cn text` |

### weapon vars, var writing commands

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `writevars` | writes the current server's variables to a config file named file;<br>if [all] is true, every variable will be written with default values commented out; if false, only changed variables will be written (default: false)<br>if [sv_] is true, variables will be prefixed with "sv_" (default: false) | `file [all] [sv_]` |
| `writevarsinfo` | writes raw information about all existing vars, commands and aliases to a file;<br>for each item the following fields are printed: NAME TYPE FLAGS ARGS VALTYPE VALUE MIN MAX DESC USAGE,<br>fields are separated by tabs, and empty if nonexistent | `file` |

#### weapon variables

Weapon variable templates — replace `<weapon>` with one of: `claw`, `pistol`, `sword`, `shotgun`, `smg`, `flamer`, `plasma`, `zapper`, `rifle`, `corroder`, `trident`, `grenade`, `mine`, `rocket`, `minigun`, `jetsaw`, `eclipse`, `melee`. Suffix `[1|2]` selects primary (`1`) or secondary (`2`) fire; optional `[flak]` applies to flak sub-projectiles.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>ammoadd` | the amount added when picking up the weapon or reloading it | `value` |
| `<weapon>ammoclip` | the maximum amount the clip of this weapon can hold | `value` |
| `<weapon>ammoitem` | the amount of ammo added to the inventory by an ammo pickup | `value` |
| `<weapon>ammospawn` | amount of ammo held at spawntime (including ammo loaded in weapon) | `value` |
| `<weapon>ammostore` | maximum amount of ammo carryable in inventory (excludes ammo loaded in weapon) | `value` |
| `<weapon>laser` | determines if this weapon has a laser pointer which is projected to the point where the player is aiming | `value` |
| `<weapon>colour` | determines the weapon main colour;<br>affects the light around the weapon, the ammo and the icon in the weaponlist | `colour` |
| `<weapon>modes` | determines the modes in which this weapon is allowed or disallowed;<br>conveniently set as a sum of bit shifted mode (&lt;&lt; 1 $G_*) vars,<br>positive sum: allow this weapon if one of the declared modes is selected,<br>negative sum: disallow this weapon if one if the declared modes is selected | `sum` |
| `<weapon>muts` | determines the mutators in which this weapon is allowed or disallowed;<br>conveniently set as a sum of $G_M_* vars,<br>positive sum: allow this weapon if one of the declared mutators is selected,<br>negative sum: disallow this weapon if one of the declared mutators is selected | `sum` |
| `<weapon>lightpersist` | determines the light effect around the weapon (bitwise OR):<br>1: dynamic light emission<br>2: material colour on weapon itself<br>3: player hint (glow around player)<br>4: player hint when powering weapon | `value` |
| `<weapon>cookzoom` | determines time to zoom in fully, in milliseconds | `value` |
| `<weapon>cookzoommin` | minimum field of view that zoom can take (min FoV = max zoom) | `value` |
| `<weapon>cookzoommax` | maximum field of view that zoom can take (max FoV = min zoom) | `value` |
| `<weapon>name` | short name of the weapon, used where space is limited | `string` |
| `<weapon>longname` | full name of the weapon, used in messages and pickups | `string` |
| `<weapon>disabled` | when non-zero, the weapon is unavailable in all modes | `boolean` |
| `<weapon>lightradius` | radius of the light emitted by the weapon (currently unused) | `value` |
| `<weapon>spawnstay` | time a dropped weapon of this type stays in the world before it disappears | `milliseconds` |
| `<weapon>spawntime` | time it takes for a weapon pickup of this type to respawn | `milliseconds` |
| `<weapon>spawnduke` | when more than zero, time it takes for a weapon pickup of this type to respawn in duel and survivor, overriding the normal delay | `milliseconds` |

#### crosshair settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>crosshairsize` | determines size of weapon-specific crosshair | `value` |
| `<weapon>crosshairblend` | determines opacity of weapon-specific crosshair | `value` |
| `<weapon>crosshair` | determines the shape of the weapon-specific crosshair | `string` |
| `<weapon>clip` | determines the shape of the rounds in the weapon's ammo clip | `string` |

#### weapon delays

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>delayreload` | the time it takes for the weapon to reload one 'add' unit (usually one clip) | `milliseconds` |
| `<weapon>delayitem` | the time it takes to pick up ammunition and return to firing condition | `milliseconds` |
| `<weapon>delayswitch` | the time it takes for the weapon be drawn before it is ready to fire | `milliseconds` |
| `<weapon>cookinterrupt` | toggles if the weapon can be switched while in the process of being cooked | `boolean` |

#### weapon-specific player buffs/debuffs

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>modhealth` | determines change in maximum health by having weapon in inventory; stacks with other modhealth vars (note that player health is out of 1000) | `value` |
| `<weapon>modhealthammo` | determines change in maximum health per unit of ammo in possession, including ones loaded into weapon; stacks with other modhealth vars (note that player health is out of 1000) | `value` |
| `<weapon>modhealthequip` | determines change in maximum health by holding weapon (as opposed to merely having it inventory); stacks with other modhealth vars (note that player health is out of 1000) | `value` |
| `<weapon>modimpulsespeed` | determines change in impulse move speed while having weapon in inventory; stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeedammo` | determines change in impulse move speed per unit of ammo in possession (including ones loaded into weapon); stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeedequip` | determines change in impulse move speed while holding weapon (as opposed to merely having it inventory); stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeedreload` | determines change in impulse move speed while reloading weapon; stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeedswitch` | determines change in impulse move speed switching from another weapon to this weapon; stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeedpower` | determines change in impulse move speed while cooking the weapon (like in plasma2); stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeeduse` | determines change in impulse move speed while picking up the weapon; stacks with other modimpulsespeed vars | `value` |
| `<weapon>modimpulsespeedzoom` | determines change in impulse move speed while using weapon zoom; stacks with other modimpulsespeed vars | `value` |
| `<weapon>modspeed` | determines change in run speed while having weapon in inventory; stacks with other modspeed vars | `value` |
| `<weapon>modspeedammo` | determines change in run speed per unit of ammo in possession (including ones loaded into weapon); stacks with other modspeed vars | `value` |
| `<weapon>modspeedequip` | determines change in run speed while holding weapon (as opposed to merely having it in inventory); stacks with other modspeed vars | `value` |
| `<weapon>modspeedreload` | determines change in run speed while reloading the weapon; stacks with other modspeed vars | `value` |
| `<weapon>modspeedswitch` | determines change in run speed while switching from another weapon to this weapon; stacks with other modspeed vars | `value` |
| `<weapon>modspeedpower` | determines change in run speed while cooking the weapon (like in plasma2); stacks with other modspeed vars | `value` |
| `<weapon>modspeeduse` | determines change in run speed while picking up the weapon; stacks with other modspeed vars | `value` |
| `<weapon>modspeedzoom` | determines change in run speed while using weapon zoom; stacks with other modspeed vars | `value` |
| `<weapon>modweight` | determines change in player weight while having weapon in inventory; stacks with other modweight vars | `value` |
| `<weapon>modweightammo` | determines change in player weight per unit of ammo in possession (including ones loaded into weapon); stacks with other modweight vars | `value` |
| `<weapon>modweightequip` | determines change in player weight while holding weapon (as opposed to merely having it in inventory); stacks with other modweight vars | `value` |
| `<weapon>modweightreload` | determines change in player weight while reloading the weapon; stacks with other modweight vars | `value` |
| `<weapon>modweightswitch` | determines change in player weight while switching from another weapon to this weapon; stacks with other modweight vars | `value` |
| `<weapon>modweightpower` | determines change in player weight while cooking the weapon (like in plasma2); stacks with other modweight vars | `value` |
| `<weapon>modweightuse` | determines change in player weight while picking up the weapon; stacks with other modweight vars | `value` |
| `<weapon>modweightzoom` | determines change in player weight while using weapon zoom; stacks with other modweight vars | `value` |
| `<weapon>modbuoyancy` | determines change in player buoyancy while having weapon in inventory; stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancyammo` | determines change in player buoyancy per unit of ammo in possession (including ones loaded into weapon); stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancyequip` | determines change in player buoyancy while holding weapon (as opposed to merely having it in inventory); stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancyreload` | determines change in player buoyancy while reloading the weapon; stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancyswitch` | determines change in player buoyancy while switching from another weapon to this weapon; stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancypower` | determines change in player buoyancy while cooking the weapon (like in plasma2); stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancyuse` | determines change in player buoyancy while picking up the weapon; stacks with other modbuoyancy vars | `value` |
| `<weapon>modbuoyancyzoom` | determines change in player buoyancy while using weapon zoom; stacks with other modbuoyancy vars | `value` |
| `<weapon>ammosub[1\|2]` | the amount taken from the clip for each firing action, set to zero for unlimited ammo | `value` |
| `<weapon>delayattack[1\|2]` | the time it takes after each firing action for the weapon to be ready again | `milliseconds` |
| `<weapon>speed[1\|2]` | the speed of a projectile from each firing action | `value` |
| `<weapon>cooktime[1\|2]` | when more than zero, determines that the weapon can be 'cooked' this long before firing | `value` |
| `<weapon>time[1\|2]` | the maximum lifetime of a projectile for each firing action | `milliseconds` |
| `<weapon>escapedelay[1\|2]` | when more than zero, projectiles from this weapon will not be able to hurt its owner for this long | `milliseconds` |
| `<weapon>rays[1\|2]` | the amount of projectiles spawned from one shot of each firing action | `value` |
| `<weapon>spread[1\|2]` | determines the amount a projectile from each firing action skews off-center | `value` |
| `<weapon>spreadz[1\|2]` | when zero, keeps spread projectiles aligned horizontally, else divide the z axis this much | `value` |
| `<weapon>znudge[1\|2]` | determines the multiplier of targeted distance to nudge the z-axis up by | `value` |
| `<weapon>aiskew[1\|2]` | determines 'added stupidity' for each weapon for AI counterparts | `value` |
| `<weapon>aidist[1\|2]` | determines the 'maximum distance' a weapon should be shot at, used by AI to determine weapon effectiveness ranges | `distance` |
| `<weapon>fragweap[1\|2]` | when projectiles from this firing action are destroyed, create projectiles from this kind of weapon (+12 = alt fire for the weapon); disable flak by setting to -1 | `value` |
| `<weapon>fragrays[1\|2]` | when creating flak, create this many projectiles for it | `value` |
| `<weapon>fragtime[1\|2]` | flak projectiles from this weapon last this long | `milliseconds` |
| `<weapon>fragspeed[1\|2]` | flak projectiles from this weapon start with this much speed (may be influenced by fragspread/fragskew and fragrel) | `value` |
| `<weapon>fullauto[1\|2]` | determines if each firing action is fully automatic (click-and-hold) or not (click-and-click) | `bool` |
| `<weapon>relativity[1\|2]` | multiplier of player velocity added to a projectile of each firing action | `value` |
| `<weapon>kickpush[1\|2]` | determines the amount of pushback from shooting each firing action | `value` |
| `<weapon>fragscale[1\|2]` | flak created by this firing action is scaled by this much | `value` |
| `<weapon>fragspread[1\|2]` | flak created by this firing action spreads its direction randomly by this much if it doesn't impact a player | `value` |
| `<weapon>fragrel[1\|2]` | flak created by this firing action retains this much of its parent relative momentum | `value` |
| `<weapon>fragoffset[1\|2]` | flak created by this firing action is offset by this distance if it impacts a player before being created | `value` |
| `<weapon>fragskew[1\|2]` | flak created by this firing action spreads its direction randomly by this much when it impacts a player | `value` |
| `<weapon>cooked[1\|2]` | determines cooking style for a projectile | `[more damage] [less damage] [longer lifetime] [shorter lifetime] [faster speed] [slower speed] [extra rays] [zoom view] [keep zoom view]` |
| `<weapon>desc[1\|2]` | description of each firing action | `string` |
| `<weapon>timedelay[1\|2]` | delay before a projectile from each firing action is launched | `milliseconds` |
| `<weapon>timeiter[1\|2]` | extra delay added for each successive ray of a multi-ray firing action | `milliseconds` |
| `<weapon>speedlimit[1\|2]` | when cooking scales speed, the speed a projectile from each firing action starts from before scaling | `value` |
| `<weapon>spreadmin[1\|2]` | minimum spread for each firing action after movement modifiers are applied | `value` |
| `<weapon>spreadmax[1\|2]` | maximum spread for each firing action after movement modifiers are applied, 0 = no limit | `value` |
| `<weapon>spreadstill[1\|2]` | spread added for each firing action while not moving | `value` |
| `<weapon>spreadmoving[1\|2]` | spread added for each firing action while moving | `value` |
| `<weapon>spreadrunning[1\|2]` | spread added for each firing action while running | `value` |
| `<weapon>spreadsprinting[1\|2]` | spread added for each firing action while sprinting | `value` |
| `<weapon>spreadcrouch[1\|2]` | spread added for each firing action while crouching | `value` |
| `<weapon>spreadzoom[1\|2]` | spread added for each firing action while zoomed in | `value` |
| `<weapon>spreadinair[1\|2]` | spread added for each firing action while midair, on top of the other spread modifiers | `value` |
| `<weapon>aileaddist[1\|2]` | distance at which AI fully leads its aim by the target's velocity, closer targets are led proportionally less | `distance` |
| `<weapon>aileadvel[1\|2]` | multiplier of the target's velocity that AI adds to its aim to lead a target | `value` |
| `<weapon>fragcond[1\|2]` | determines when flak uses fragoffset and fragskew rather than fragspread (bitwise OR) | `[always] [hit a player] [stuck to a player] [stuck to anything]` |
| `<weapon>fragtimedelay[1\|2]` | delay before the first flak projectile from this firing action is launched | `milliseconds` |
| `<weapon>fragtimeiter[1\|2]` | extra delay added for each successive flak projectile from this firing action | `milliseconds` |
| `<weapon>fragspeedmin[1\|2]` | minimum speed of flak created by this firing action, used when fragspeed is zero | `value` |
| `<weapon>fragspeedmax[1\|2]` | maximum speed of flak created by this firing action, used when fragspeed is zero, 0 = no limit | `value` |
| `<weapon>fragjump[1\|2]` | fraction of fragtime to skip, shortening the lifetime of flak created by this firing action | `value` |
| `<weapon>colourcook[1\|2]` | colour the weapon blends towards while cooking or zooming, 0 = off | `colour` |
| `<weapon>colourproj[1\|2]` | colour the projectile model blends towards as it ages, 0 = off | `colour` |
| `<weapon>fxtypepower[1\|2]` | effect type shown on the weapon while cooking each firing action | `value` |
| `<weapon>fxchain[1\|2]` | links successive projectiles from continuous fire into a chain for effects | `boolean` |
| `<weapon>soundskew[1\|2]` | when cooked, scale the firing sound volume by the cook amount | `boolean` |
| `<weapon>modbuoyancyattack[1\|2]` | determines change in player buoyancy while firing the weapon; stacks with other modbuoyancy vars | `value` |

#### weapon-specific attack buffs/debuffs

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>modimpulsespeedattack[1\|2]` | determines change in impulse speed while firing the weapon; stacks with other modimpulsespeed vars | `value` |
| `<weapon>modspeedattack[1\|2]` | determines change in run speed while firing the weapon; stacks with other modspeed vars | `value` |
| `<weapon>modweightattack[1\|2]` | determines change in player weight wihle firing the weapon; stacks with other modweight vars | `value` |

#### recoil effects

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>recoilpitchcrouch[1\|2]` | determines weapon's crosshair rise scale factor while crouching | `value` |
| `<weapon>recoilpitchinair[1\|2]` | determines weapon's crosshair rise scale factor while midair | `value` |
| `<weapon>recoilpitchmax[1\|2]` | determines weapon's maximum crosshair rise rate | `value` |
| `<weapon>recoilpitchmin[1\|2]` | determines weapon's minimum crosshair rise rate | `value` |
| `<weapon>recoilpitchmoving[1\|2]` | determines weapon's crosshair rise scale factor while moving | `value` |
| `<weapon>recoilpitchdir[1\|2]` | determines weapon's crosshair chance of rising versus falling (0 = always up, >0 = favour rising, &lt;0 = favour falling) | `value` |
| `<weapon>recoilpitchrunning[1\|2]` | determines weapon's crosshair rise scale factor while running | `value` |
| `<weapon>recoilpitchsprinting[1\|2]` | determines weapon's crosshair rise scale factor while sprinting | `value` |
| `<weapon>recoilpitchstill[1\|2]` | determines weapon's crosshair rise scale factor while not moving | `value` |
| `<weapon>recoilpitchzoom[1\|2]` | determines weapon's crosshair rise scale factor while zoomed in | `value` |
| `<weapon>recoiltime[1\|2]` | determines weapon's crosshair rise time (>0 = time in ms, &lt;0 = divided attack delay) | `value` |
| `<weapon>recoiltimecrouch[1\|2]` | determines weapon's crosshair rise duration factor while crouching | `value` |
| `<weapon>recoiltimeinair[1\|2]` | determines weapon's crosshair rise duration factor while midair | `value` |
| `<weapon>recoiltimemoving[1\|2]` | determines weapon's crosshair rise duration factor while moving | `value` |
| `<weapon>recoiltimerunning[1\|2]` | determines weapon's crosshair rise duration factor while running | `value` |
| `<weapon>recoiltimesprinting[1\|2]` | determines weapon's crosshair rise duration factor while sprinting | `value` |
| `<weapon>recoiltimestill[1\|2]` | determines weapon's crosshair rise duration factor while not moving | `value` |
| `<weapon>recoiltimezoom[1\|2]` | determines weapon's crosshair rise duration factor while zoomed in | `value` |
| `<weapon>recoilyawcrouch[1\|2]` | determines weapon's crosshair rise duration factor while crouching | `value` |
| `<weapon>recoilyawinair[1\|2]` | determines weapon's crosshair rise duration factor while midair | `value` |
| `<weapon>recoilyawmax[1\|2]` | determines weapon's maximum lateral crosshair wander rate | `value` |
| `<weapon>recoilyawmin[1\|2]` | determines weapon's minimum lateral crosshair wander rate | `value` |
| `<weapon>recoilyawmoving[1\|2]` | determines weapon's lateral crosshair wander rate scale factor while moving | `value` |
| `<weapon>recoilyawrunning[1\|2]` | determines weapon's lateral crosshair wander rate scale factor while running | `value` |
| `<weapon>recoilyawsprinting[1\|2]` | determines weapon's lateral crosshair wander rate scale factor while sprinting | `value` |
| `<weapon>recoilyawstill[1\|2]` | determines weapon's lateral crosshair wander rate scale factor while not moving | `value` |
| `<weapon>recoilyawzoom[1\|2]` | determines weapon's lateral crosshair wander rate scale factor while zoomed in | `value` |

#### projectile properties

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>[flak]attractdist[1\|2]` | determines radius in which the attraction effect takes place | `value` |
| `<weapon>[flak]attractminvel[1\|2]` | when the speed of the projectile exceeds this value, it will stop attracting | `value` |
| `<weapon>[flak]attractscaled[1\|2]` | determines the increase in attraction speed when closer to the center of the attract radius | `value` |
| `<weapon>[flak]attractspeed[1\|2]` | determines the percentage of projectile's speed that will be used as the base of the attraction speed | `value` |
| `<weapon>[flak]liquidcoast[1\|2]` | multiplier of velocity for a projectile of each firing action when in liquid | `value` |
| `<weapon>[flak]weight[1\|2]` | relative weight for a projectile of each firing action | `value` |
| `<weapon>[flak]coastscale[1\|2]` | multiplier of the world coast for a projectile of each firing action, 0 disables coasting drag | `value` |
| `<weapon>[flak]radius[1\|2]` | determines the size for a projectile or length of a scan of each firing action | `value` |
| `<weapon>[flak]elasticity[1\|2]` | multiplier of velocity for a projectile of each firing action when doing a bounce event | `value` |
| `<weapon>[flak]buoyancy[1\|2]` | determines whether a projectile will sink or surface when submerged in a liquid, and how quickly if so | `value` |
| `<weapon>[flak]drill[1\|2]` | determines distance to which the projectile may penetrate level geometry | `value` |
| `<weapon>[flak]collide[1\|2]` | determines collision properties for a projectile from each firing action (bitwise OR) | `COLLIDE_TRACE COLLIDE_SCAN COLLIDE_LENGTH COLLIDE_PROJ COLLIDE_OWNER IMPACT_GEOM IMPACT_PLAYER IMPACT_SHOTS BOUNCE_GEOM BOUNCE_PLAYER BOUNCE_SHOTS DRILL_GEOM DRILL_PLAYER DRILL_SHOTS STICK_GEOM STICK_PLAYER` |
| `<weapon>[flak]guideddelay[1\|2]` | when more than zero, projectiles from this weapon will delay guided settings by this long | `milliseconds` |
| `<weapon>[flak]speeddelta[1\|2]` | determines the amount by which each firing action is guided | `value` |
| `<weapon>[flak]taperin[1\|2]` | determines the fraction of the lifetime from the start until the projectile reaches its full size | `value` |
| `<weapon>[flak]taperout[1\|2]` | determines the fraction of the lifetime from the end where the projectile size "fades out" | `value` |
| `<weapon>[flak]blend[1\|2]` | determines the opacity of the projectile & particle effects of the weapon (0=transparent, 1=opaque) | `value` |
| `<weapon>[flak]speedmin[1\|2]` | minimum speed of a projectile from each firing action after bouncing | `value` |
| `<weapon>[flak]speedmax[1\|2]` | maximum speed of a projectile from each firing action after bouncing, 0 = no limit | `value` |
| `<weapon>[flak]guidedspeed[1\|2]` | multiplier of a guided projectile's speed once guidance starts | `value` |
| `<weapon>[flak]interacts[1\|2]` | determines which map entities a projectile from each firing action interacts with (bitwise OR) | `teleports pushers` |
| `<weapon>[flak]timestick[1\|2]` | when more than zero, a projectile from each firing action has its lifetime reset to this when it sticks | `milliseconds` |
| `<weapon>[flak]taper[1\|2]` | determines how a projectile changes size;<br>0 = off, 1 = by lifetime fraction, 3 = by lifetime in milliseconds, 5 = by distance travelled,<br>+1 = keep tapering out once stuck | `value` |
| `<weapon>[flak]tapermin[1\|2]` | minimum size multiplier of a tapering projectile, also the minimum damage multiplier of tapered damage | `value` |
| `<weapon>[flak]tapermax[1\|2]` | maximum size multiplier of a tapering projectile, also the maximum damage multiplier of tapered damage | `value` |
| `<weapon>[flak]length[1\|2]` | maximum length of the trail drawn behind a projectile from each firing action | `value` |
| `<weapon>[flak]fade[1\|2]` | determines whose projectiles fade out near the camera (bitwise OR) | `own others` |
| `<weapon>[flak]fadeat[1\|2]` | distance from the camera at which a fading projectile is fully visible | `distance` |
| `<weapon>[flak]fadecut[1\|2]` | distance from the camera within which a fading projectile is invisible | `distance` |
| `<weapon>[flak]fadein[1\|2]` | time a projectile from each firing action takes to fade in after launch | `milliseconds` |
| `<weapon>[flak]fadeout[1\|2]` | time before the end of its lifetime that a projectile from each firing action starts fading out | `milliseconds` |
| `<weapon>[flak]vistime[1\|2]` | time a stuck projectile takes to fade to its visfade level | `milliseconds` |
| `<weapon>[flak]visfade[1\|2]` | amount a stuck projectile fades out over vistime (0 = stays visible, 1 = invisible) | `value` |
| `<weapon>[flak]fxtype[1\|2]` | effect type for the muzzle when firing each firing action | `value` |
| `<weapon>[flak]fxtypeproj[1\|2]` | effect type for a projectile from each firing action | `value` |
| `<weapon>[flak]fxcol[1\|2]` | colour of the effects of each firing action | `colour` |
| `<weapon>[flak]fxscale[1\|2]` | size multiplier of the effects of each firing action | `value` |
| `<weapon>[flak]fxblend[1\|2]` | opacity multiplier of the effects of each firing action | `value` |
| `<weapon>[flak]lightcol[1\|2]` | colour of the light emitted by the weapon while lightpersist has the material colour flag | `colour` |
| `<weapon>[flak]explcol[1\|2]` | colour of the explosion of a projectile from this weapon (currently unused) | `colour` |
| `<weapon>[flak]headmin[1\|2]` | maximum distance from an explosion to the head for a radial hit to count as a head shot, beyond this it is a whiplash hit | `distance` |
| `<weapon>[flak]damagewhiplash[1\|2]` | determines the multiplier of damage for whiplash hits (radial hits near the head) | `value` |
| `<weapon>[flak]damagecollect[1\|2]` | multiplier of damage dealt by each firing action that is returned to the attacker as health | `value` |
| `<weapon>[flak]damagepenalty[1\|2]` | when non-zero, killing a teammate with each firing action incurs the team kill penalty | `boolean` |
| `<weapon>[flak]hitvel[1\|2]` | determines the amount of velocity added in the direction of travel when getting hit by this shot | `value` |
| `<weapon>[flak]stun[1\|2]` | determines the stun effects of getting hit by each firing action (bitwise OR) | `[slow over time] [lower gravity over time] [slow immediately] [lower gravity immediately] [slip]` |
| `<weapon>[flak]stunscale[1\|2]` | determines how much a stun slows movement (0-1) | `value` |
| `<weapon>[flak]stunfall[1\|2]` | determines how much a stun reduces gravity (0-1) | `value` |
| `<weapon>[flak]stuntime[1\|2]` | duration of a stun effect | `milliseconds` |
| `<weapon>[flak]shockstunscale[1\|2]` | determines how much a shock residual stun slows movement (0-1) | `value` |
| `<weapon>[flak]shockstunfall[1\|2]` | determines how much a shock residual stun reduces gravity (0-1) | `value` |
| `<weapon>[flak]shockstuntime[1\|2]` | duration of each shock residual stun | `milliseconds` |
| `<weapon>[flak]destroyburn[1\|2]` | when non-zero, a projectile from each firing action is destroyed on hitting a burning player | `boolean` |
| `<weapon>[flak]destroybleed[1\|2]` | when non-zero, a projectile from each firing action is destroyed on hitting a bleeding player | `boolean` |
| `<weapon>[flak]destroyshock[1\|2]` | when non-zero, a projectile from each firing action is destroyed on hitting a shocked player | `boolean` |
| `<weapon>[flak]destroycorrode[1\|2]` | when non-zero, a projectile from each firing action is destroyed on hitting a corroded player | `boolean` |
| `<weapon>[flak]proxtype[1\|2]` | determines how a stuck projectile is triggered;<br>0 = off, 1 = a player comes within proxdist, 2 = a player crosses a tripwire of proxdist length | `value` |
| `<weapon>[flak]proxdist[1\|2]` | trigger distance of a stuck proximity projectile | `distance` |
| `<weapon>[flak]proxdelay[1\|2]` | time after sticking for the proximity distance to grow to its full size | `milliseconds` |
| `<weapon>[flak]proxtime[1\|2]` | time left before a triggered proximity projectile detonates | `milliseconds` |

#### damage settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>[flak]damage[1\|2]` | the amount of damage a projectile from each firing action does | `value` |
| `<weapon>[flak]damagehead[1\|2]` | determines the multiplier of damage for head shots | `value` |
| `<weapon>[flak]damagetorso[1\|2]` | determines the multiplier of damage for torso shots | `value` |
| `<weapon>[flak]damagelimb[1\|2]` | determines the multiplier of damage for limb shots | `value` |
| `<weapon>[flak]damageself[1\|2]` | determines the multiplier of damage for self-inflicted shots | `value` |
| `<weapon>[flak]damageteam[1\|2]` | determines the multiplier of damage for shots at one's own team | `value` |
| `<weapon>[flak]element[1\|2]` | determines what the shot is made of, which decides how grass reacts to it, 0 = nothing, 1 = fire, 2 = energy, 3 = acid | `value` |
| `<weapon>[flak]elementradius[1\|2]` | determines how far the shot's element reaches on the grass it touches, in power 0 cubes | `value` |
| `<weapon>[flak]radial[1\|2]` | determines the radius of splash damage, in power 0 cubes | `value` |
| `<weapon>[flak]radialdelay[1\|2]` | determines the time between ticks of "continuous" radial damage, starts counting from first "radiation" | `milliseconds` |

#### other projectile effects

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>[flak]extinguish[1\|2]` | determines if a projectile from each firing action is extinguished by water | `value` |
| `<weapon>[flak]radial[1\|2]` | determines the explosion radius for a particle of this firing action | `value` |
| `<weapon>[flak]wavepush[1\|2]` | determines the multiplier of explode radius this weapon pushes in | `value` |
| `<weapon>[flak]hitpush[1\|2]` | determines the amount of pushback from getting hit by this shot | `value` |
| `<weapon>[flak]hitpushself[1\|2]` | determines the amount of multiplier of pushback from hitting oneself with this shot | `value` |
| `<weapon>[flak]grab[1\|2]` | determines if the weapon is used for parkour grabs | `[can grab on walls] [can grab players]` |
| `<weapon>[flak]guided[1\|2]` | determines guided style for a projectile, 0 = off, 1 = follow crosshair direction, 2 = home crosshair target (+1 only first target), 4 = home projectile target (+1 only first target), 6 = direct toward first crosshair direction | `value` |

#### residual effects

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>[flak]residual[1\|2]` | determines the residual effects of a projectile from each firing action (bitwise OR) | `burns bleeds shocks corrodes` |
| `<weapon>[flak]residualundo[1\|2]` | determines if a projectile from each firing action will extinguish a residual effect | `burn bleed shock corrode` |
| `<weapon>[flak]bleeddamage[1\|2]` | determines damage caused by bleed residual (if enabled) (note that player health is 1000) | `value` |
| `<weapon>[flak]bleeddelay[1\|2]` | determines time between damage caused by bleed residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]bleedtime[1\|2]` | determines duration of damage caused by bleed residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]burndamage[1\|2]` | determines damage caused by burn residual (if enabled) in (note that player health is out of 1000) | `value` |
| `<weapon>[flak]burndelay[1\|2]` | determines time between damage caused by burn residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]burntime[1\|2]` | determines duration of damage caused by burn residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]shockdamage[1\|2]` | determines damage caused by shock residual (if enabled) in (note that player health is out of 1000) | `value` |
| `<weapon>[flak]shockdelay[1\|2]` | determines time between damage caused by shock residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]shocktime[1\|2]` | determines magnitude of stun effect caused by shock residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]shockstun[1\|2]` | determines magnitude of stun effect caused by shock residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]corrodedamage[1\|2]` | determines damage caused by corrode residual (if enabled) in (note that player health is out of 1000) | `value` |
| `<weapon>[flak]corrodedelay[1\|2]` | determines time between damage caused by corrode residual (if enabled) in milliseconds | `value` |
| `<weapon>[flak]corrodetime[1\|2]` | determines magnitude of stun effect caused by corrode residual (if enabled) in milliseconds | `value` |

#### weapon obituaries

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<weapon>[flak]obitheadless[1\|2]` | determines death message for kills which decapitate opponent | `string` |
| `<weapon>[flak]obitobliterated[1\|2]` | determines death message for kills which gib (reduce to pieces) opponent | `string` |
| `<weapon>[flak]obitsuicide[1\|2]` | determines death message for kills which are inflicted upon oneself | `string` |
| `<weapon>[flak]obituary[1\|2]` | determines death message for normal kills which do not satisfy conditions for other obituaries | `string` |
