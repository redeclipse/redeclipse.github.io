---
title: Admin Guide
layout: docs
origfile: Admin-Guide.md
origtitle: Admin-Guide
permalink: /docs/Admin-Guide
redirect_from:
  - /docs/Admin_Guide
  - /wiki/Admin_Guide
---
* TOC
{:toc}
Red Eclipse moderators and administrators have several powerful commands at their disposal to manage players and gameplay. This guide lists common admin commands, print it for a handy cheat sheet. For a complete list of admin commands and variables, see Client and Admin Vars.

## Using Commands
### Entering Commands
To use the commands listed in this guide, open the console with the chat key `T` or `Enter` and type the command symbol `/`, followed by the desired command and press the Enter or Return key to execute it.

### Client Numbers
Many commands use client numbers, abbreviated as `cn`, to refer to specific players on a server. To see client numbers, press the Tab key to open the scoreboard. Client numbers are listed in the column labeled `cn` next to each player's name. Use this number when a commands requires a client number as input.

### Hints
- When typing a command or a player name, pressing the Tab key will autocomplete the command or name being typed. Press Tab multiple times to cycle through possible autocompletions.
- Player nicknames can be used instead of client numbers, however the name must be entered exactly the same as it is displayed.

## Moderation Commands
When using this commands have the [Multiplayer Guidelines](https://github.com/redeclipse/base/blob/master/doc/guidelines.txt) in mind.

| Command                        | Description                                                                                                                                   |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| **setteam** `<cn>` `<team>`    | Moves a player to a specified team. `<team>` can be **1** - Alpha, **2** - Omega, **3** - Kappa, **4** - Sigma                                |
| **limit** `<cn>`               | Limits a player from changing teams.                                                                                                          |
| **mute** `<cn>`                | Mutes a player.                                                                                                                               |
| **clearmutes**                 | Clears all current mutes.                                                                                                                     |
| **spectator** `<cn>` `<state>` | Moves a player to or from spectator. `<state>` can be **0** - Playing, **1** - Spectating, **2** - Quarantined, player cannot exit spectator  |
| **kick** `<cn>` `<reason>`     | "Kicks", or disconnects, a player from the server. The optional `<reason>`, attribute allows moderators to explain why the player was kicked. |
| **ban** `<cn>` `<reason>`      | Temporarily bans a player from the server. The optional `<reason>` attribute allows moderators to explain why the player was banned.          |
| **addpriv** `<cn>` `<priv>`    | Give temporary privileges to a player. `<priv>`  can be **2** - supporter, **3** - moderator, **4** - operator, **5** - administrator.        |
| **resetpriv** `<cn>`           | Removes temporary privileges from a player.                                                                                                   |

## Administration Commands
With `mastermode <mode>`, you can limit the access to a server.

| `<mode>` | Description                                                                           |
|:--------:|---------------------------------------------------------------------------------------|
| 0        | **Normal** server operation                                                           |
| 1        | **Veto**, admins map votes pass immediately                                           |
| 2        | **Locked**, players with less than moderator privileges cannot join the game          |
| 3        | **Private**, players with less than moderator privileges cannot connect to the server |

## Master Server
Trusted moderators are given access to the [master repository](http://github.com/redeclipse/master) which contains the environment for the master server, this includes the global ban (and other) lists. If you don't want to do a git checkout of the repository, you can edit the files using the GitHub visual editor and commit directly to the repository from there. The server runs the update sequence every ten minutes (X:00, X:10, X:20 .. X:50), at which point the master server will reload the configuration and pass the updated information to all connected servers. 
