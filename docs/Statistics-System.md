---
title: Statistics System
origtitle: Statistics-System
layout: docs
---
* [Enable statistic system](#enable-statistic-system)
* [Sending Process](#sending-process)
* [Web Interface](#web-interface)
* [Privacy](#privacy)

***
The statistics system, introduced after 1.5.3, records results of games and sends them to a central database on the master server.

# Enable statistic system
Add or edit this lines inside your `servinit.cfg`
```
sv_serverstats 1 // Your server must have thes flag in its auth for this to take effect.
serverauthkey [handle] [key] // Authorization key to validate stats server.
```
# Sending Process
- Before the server will send statistics, `sv_serverstats` must be 1 and the server must have the `s` (statistics) flag on its authentication handle. To get the `s` flag, the server must be issued a key, which may be obtained at request.
- To be sent to the master server, a game needs to meet at least one of the following requirements:
    - Entered intermission.
    - Be timed race and have at least one finished lap. (So race records are kept even for unfinished games)
- The server will then send the game statistics to the master server.
- The master server will save the game statistics to its sqlite database and return the game ID for the server to display.

# Web Interface
The statistics web interface/API is at [http://redeclipse.net/stats](http://redeclipse.net/stats).  
It runs alongside the master server and reads from the sqlite database to return sorted data about games, maps, players, modes, and weapons.

# Privacy
The only information collected by the system about a player's identity is their nickname and their authentication handle.  
IP addresses are not collected, and tracking can only be done via auth handle. Unauthenticated users will only appear in game pages, they will not have a player page.