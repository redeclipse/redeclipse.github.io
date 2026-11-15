---
title: Variables - General
layout: docs
origfile: variables/General.md
origtitle: General
permalink: /docs/variables/General
redirect_from:
  - /wiki/variables/General/
---
* TOC
{:toc}
Joining and leaving games, your player, recording movies and demos, and the clients in a game.

## Basic commands

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `name` | sets your player's display name | `name` |
| `quit` | quits the game | - |
| `connect` | connect to a multiplayer server | `[IP or hostname port admin or server password]` |
| `accountname` | name to authenticate as | `name` |
| `accountpass` | authentication key to authenticate as | `key` |
| `authconnect` | toggles automatic authentication upon connection | `boolean` |
| `disconnect` | disconnects from the current server or singleplayer game | - |
| `discordenabled` | toggles Discord functionality (if present), from the next start | `boolean` |
| `steamclient` | toggles Steam functionality (if present), from the next start | `boolean` |
| `presence` | what Steam and Discord friends see of your match;<br>0 = nothing, 1 = what you are playing, 2 = also a Join button while the server is listed, open and has room | `value` |
| `getpresence` | returns what Steam and Discord friends would see now: details, state, status, join link, group, players and slots | - |
| `auth` | sends an account authentication request | - |
| `spectate` | toggles spectator status | `boolean` |
| `team` | requests team change to the specified team | `team` |
| `thirdpersonswitch` | change from first to third person point of view or vise-versa | - |
| `playermodel` | toggles between male (0) and female (1) player models | `boolean` |
| `playercolourbody` | sets the player model's body colour and chat icon colour | `colour` |
| `playercolouraccent` | sets the player model's accent colour | `colour` |
| `colour` | sets the player model's body colour and chat icon colour | `colour` |
| `goto` | jumps the spectator camera to the position of the specified client | `name/cn` |

## Maps

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `mapvariant` | returns the current map variant; 1 for normal and 2 for alt | - |
| `forcemapvariant` | force selection of a particular variant when loading maps, will change current variant if called when a map is loaded;<br>0 = off, 1 = default, 2 = alternate | `value` |
| `forcetriggerid` | sets the current triggerid; -1 for random | `value` |
| `getmaptitle` | returns the title of the map file, or its name if it has none | `map` |
| `getmapauthor` | returns the author of the map file | `map` |
| `getmapdesc` | returns the description of the map file | `map` |
| `getmapfile` | returns the path of a map, adding maps/ to a bare name | `map` |
| `getmapstate` | returns 0 with no map, 1 while a map is loading or loaded, 2 while it is being saved | - |
| `gettriggerid` | returns the current triggerid | - |
| `mapversion` | returns the file format version of the current map | - |

## Miscellaneous

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
| `rehash` | reload configuration, including settings and UIs | - |
| `resetgl` | reloads all textures and re-initalizes OpenGL | - |
| `compresslevel` | level of png (lossless) compression for screenshots (0 = lowest compression; 9 = highest compression) | `value` |
| `movie` | starts recording a movie to an MP4 or AVI file in moviedir, or stops it if one is being recorded; time advances a fixed step every frame while recording, so it plays back smoothly however slowly it records | `name` |
| `movierecording` | returns 1 while a movie is being recorded | - |
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

## Demos

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `demoautoclientsave` | determines if the client automatically saves demos after each match | `value` |
| `demolock` | determines who may record demos;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `democount` | determines the maximum amount of demo files that may be saved simultaneously on the server (deletes old demos if exceeded) | `value` |
| `demomaxsize` | determines the maximum size of individual demo files that may be saved on the server | `bytes` |
| `demoautorec` | determines if demos are automatically recorded each match | `value` |
| `demoautoserversave` | determines if the server automatically saves demos to disk | `value` |
| `demoserverkeeptime` | if greater than 0, only keep auto-recorded demos younger than demoserverkeeptime seconds | `value` |
| `listdemos` | get a list of recorded demos available for download | - |
| `getdemo` | get the demo id and save to the name name, id defaults to the last and name defaults to the current time | `[id] [name]` |
| `recorddemo` | records a demo of the next match on the server (1) or stops it being recorded (0); needs demolock privilege | `boolean` |
| `stopdemo` | stops the demo being recorded, or the demo being played back; needs demolock privilege | - |
| `cleardemos` | clears the demo with the given number from the server's list, or every demo if 0; needs demolock privilege | `number` |
| `demoplayback` | returns 1 while a demo is being played back | - |
| `demoendless` | when a demo ends, plays another picked at random from demolist, until a game that isn't a demo starts | `boolean` |
| `demolist` | the demos demoendless picks from | `list` |
| `demoscan` | reads the header of a demo file into the list of demos, returning its index there, or -1 if it can't be read | `file` |
| `demoinfo` | returns the number of demos in the list if index is -1, or one property of a demo in it:<br>0 = game version, 1 = map, 2 = mode, 3 = mutators, 4 = time it started, 5 = file | `index property` |
| `loopdemos` | runs body for every demo in the list, with var set to its index and var2 to its file | `var var2 body` |
| `demosort` | sorts the list of demos | - |
| `demoreset` | forgets the demos that failed to read, and the whole list as well if all is 1 | `all` |

## Clients

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

## Chat

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `say` | send a message to the global chat | `text` |
| `me` | send a message to the global chat in the form of an action<br>ex: * foobar demonstrates something | `text` |
| `sayteam` | send a message to the team chat | `text` |
| `meteam` | send a message to the team chat in the form of an action<br>ex: * foobar (to team ..) demonstrates something | `text` |
| `whisper` | send a message directly to another player on the server<br>note: messages are not private and are visible in demos | `name/cn text` |
| `mewhisper` | send a message directly to another player on the server in the form of an action<br>ex: * foobar (whispers to barfoo) demonstrates something<br>note: messages are not private and are visible in demos | `name/cn text` |
| `echomsg` | prints text to the chat and console as a message from the game, in colour (white if not given) | `colour text` |
| `chatlines` | the most chat messages shown on the HUD at once | `value` |
| `chatouttime` | how long a chat message stays on the HUD (0 = until pushed off by newer ones) | `milliseconds` |
| `chatintime` | time a new chat message takes to grow in | `milliseconds` |
| `chatfadetime` | time a chat message takes to fade away at the end of chatouttime | `milliseconds` |
| `chatblend` | opacity of chat messages on the HUD | `value` |
