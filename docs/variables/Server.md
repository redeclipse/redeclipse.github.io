---
title: Variables - Server
layout: docs
origfile: variables/Server.md
origtitle: Server
permalink: /docs/variables/Server
redirect_from:
  - /wiki/variables/Server/
---
* TOC
{:toc}
Running a server: its settings, the privileges needed for each action, moderation and the IRC relay.

## Locks

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
| `rotatemodefilter` | determines the modes which can be selected when the server selects the next map,<br>convenient to set using a sum of bit shifted mode (&lt;&lt; 1 $G_*) vars, for example: (\| (&lt;&lt; 1 $G_EDITING) (&lt;&lt; 1 $G_DEATHMATCH)) | - |
| `rotatemuts` | determines if mutators rotate when the server selects the next map;<br>0 = never rotate mutators, 1 = always rotate mutators, >1 = decrease chances the larger this value | `value` |
| `rotatemutsfilter` | determines the mutators which can be picked when the server selects the next map,<br>convenient to set using a sum of $G_M_* vars | - |
| `defaultmap` | default map, "" = random | `map` |
| `defaultmode` | default game mode;<br>1 = editing, 2 = deathmatch, 3 = ctf, 4 = dac, 5 = bomber, 6 = speedrun | `value` |
| `defaultmuts` | default mutators, convenient to set using a sum of $G_M_* vars | - |
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

## Server settings

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
| `overflowsize` | kick players who send this many or more messages in one world update, beyond any allowance they saved up | `value` |
| `overflowburst` | how much unused message allowance a quiet player can save up, so one large update after a stall is not kicked, 0 = none | `milliseconds` |
| `eventfuture` | drop timed events scheduled more than this far ahead, 0 = off | `milliseconds` |
| `eventlimit` | drop events when a client has this many queued, counting each hit and shot they carry, 0 = unlimited | `value` |
| `teamkilllock` | players at or above this privilege level are exempt from team kill warnings and punishments;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `teamkillrelax` | forgive human-on-bot team kills;<br>0 = off, 1 = forgive, 2 = forgive and don't dock points | `value` |
| `resetexceptsonend` | determines when the except list is reset;<br>0 = off, 1 = just when empty, 2 = when matches end | `value` |
| `smallmaps` | maps preferred when the player count is at most smallmapmax | `list` |
| `mediummaps` | maps preferred when the player count is at most mediummapmax | `list` |
| `largemaps` | maps preferred when the player count is above mediummapmax | `list` |
| `mutslockforce` | mutators that are always applied to requested games, convenient to set using a sum of $G_M_* vars | - |
| `rotatecycle` | force a map rotation after this many minutes, 0 = off | `minutes` |
| `waitforplayers` | wait for players before starting a match;<br>0 = off, 1 = until they load the map, 2 = until they leave spectator | `value` |
| `waitforplayertime` | wait at most this long for players to meet the waitforplayers criteria | `milliseconds` |
| `waitforplayerload` | wait this long for players to load the map before scheduling map requests, or in edit mode before a joining player uses their own copy | `milliseconds` |
| `waitforplayermaps` | wait this long for sendmap and getmap requests, and for a player sending the map in edit mode | `milliseconds` |
| `waitforplayerinfo` | wait at least this long for players to send their info | `milliseconds` |
| `mapsnapshotlimit` | largest map sent to a player joining an editing game | `megabytes` |
| `mapreplaylimit` | most messages kept for a player while their map is sent, before starting over | `kilobytes` |
| `resetvars` | resets game variables to their defaults; map variables are only reset if all is true | `all` |
| `savevars` | saves the current game variables to the server's config | - |
| `resetconfig` | reloads the server configuration | - |
| `botoverridelock` | determines who may override bots aiming at them on another team;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |
| `botoverrideffalock` | determines who may command bots in free-for-all games;<br>0 = off, 1 = player, 2 = supporter, 3 = moderator, 4 = administrator, 5 = developer, 6 = founder, 7 = nobody | `value` |

## IRC

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `ircaddchan` | joins a channel on a given IRC instance with automatic rejoin;<br>name - name of the IRC instance,<br>channel - channel to join,<br>[friendly] - optional friendly name of channel,<br>[passkey] - optional passkey required for mode +k channels,<br>[relay] - optional relay level (verbosity of output) | `name channel [friendly] [passkey] [relay]` |
| `ircaddclient` | creates an IRC instance of type 'client';<br>name - name of the created IRC instance,<br>host - host to connect to,<br>port - port of host to connect on,<br>nick - nickname to use for the connection,<br>[ip] - optional address to bind to (leave blank for any),<br>[passkey] - optional password required to connect to host | `name host port nick [ip] [passkey]` |
| `ircaddrelay` | creates an IRC instance of type 'relay';<br>name - name of the created IRC instance,<br>host - host to connect to,<br>port - port of host to connect on,<br>nick - nickname to use for the connection,<br>[ip] - optional address to bind to (leave blank for any),<br>[passkey] - optional password required to connect to host | `name host port nick [ip] [passkey]` |
| `ircjoinchan` | joins a channel on a given IRC instance without automatic rejoin;<br>name - name of the IRC instance,<br>channel - channel to join,<br>[friendly] - optional friendly name of channel,<br>[passkey] - optional passkey required for mode +k channels<br>[relay] - optional relay level (verbosity of output) | `name channel [friendly] [passkey] [relay]` |
| `ircfilter` | sets how IRC messages are filtered;<br>0 = send string as is, color escapes not converted, other escapes not filtered,<br>1 = convert Cube2-style color escapes to IRC color escapes,<br>2 = filter out all Cube2-style escapes | `value` |
| `ircbind` | sets the address that an IRC instance binds to;<br>when used without [ip], returns the address that the IRC instance 'name' is currently bound to,<br>name - name of the IRC instance,<br>[ip] - optional ip address for name to bind to | `name [ip]` |
| `ircconnect` | attempts to establish a connection to the IRC instance 'name' | `name` |
| `ircconns` | returns the number of active IRC connections | - |
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

## Moderation

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `addlocalop` | elevates the privilege of a user to a specified level locally;<br>this allows server administrators to "upgrade" the access of people as they identify, on that particular server,<br>user_handle is the authkey handle of the user,<br>flag is the privilege level {a = administrator m = moderator s = supporter} | `user_handle flag` |
| `resetlocalop` | removes all temporary elevated local privileges;<br>this allows server administrators to reset the access given by addlocalop for all users, on that particular server | - |
| `kick` | kicks a player from the server with an optional reason | `name/cn [text]` |
| `allow` | lets a player join the server while it is locked or private, with an optional reason | `name/cn [text]` |
| `ban` | bans a player from the server with an optional reason | `name/cn [text]` |
| `mute` | mutes a player on the server with an optional reason | `name/cn [text]` |
| `limit` | limits team changing for a player on the server | `name/cn` |
| `except` | protects a player from bans, mutes and limits on the server, with an optional reason | `name/cn [text]` |
| `getcontrols` | asks the server for the allows, bans, mutes, limits and excepts you may see, read with controlinfo | - |
| `controltypes` | returns a bitmask of the control types the server last let you see, or -1 before it has replied | - |
| `controlinfo` | returns a property of a control entry, or the number of entries when index is -1;<br>prop: 0 = id, 1 = type, 2 = scope, 3 = source, 4 = seconds since added, 5 = seconds until it expires (-1 = never), 6 = address, 7 = reason,<br>8 = name and 9 = handle of the player it was applied to, 10 = name, 11 = handle, 12 = address and 13 = privilege of the player who added it | `index prop` |
| `delcontrol` | removes the control entry with an id, from controlinfo | `id` |
| `manageserver` | opens the manage server menu, while connected to a server | - |
| `spectator` | put a player to spectator mode;<br>0 = join/unquarantine, 1 = spectate, 2 = spectate and quarantine | `name/cn mode` |
| `addpriv` | adds local priv to cn;<br>priv: 2 = supporter, 3 = moderator, 4 = administrator | `name/cn priv` |
| `resetpriv` | removes privileges added by addpriv from cn | `name/cn` |
| `adminpass` | sets server admin password, if no password given, it will return the current password | `value` |
