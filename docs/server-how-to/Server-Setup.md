---
title: Server How To - Server Setup
layout: docs
origfile: server-how-to/Server-Setup.md
origtitle: Server-Setup
permalink: /docs/server-how-to/Server-Setup
redirect_from:
  - /docs/server_how_to/Server_Setup/
  - /wiki/server_how_to/Server_Setup/
---
* TOC
{:toc}
**WARNING: Before setting up a public server you should read the [Multiplayer Guidelines](../Multiplayer-Guidelines), which governs how you may and may not use the master server. Be warned that modifications to the source code must be approved, and servers must honour the "auth" system. No if's, but's, or maybe's.**

## System Requirements
Hosting one or more Red Eclipse servers on your system will require a decent bandwith (20-30 Kb/s down and ~10 Kb/s up per player/ bot), but use very few compute resources, such as RAM or CPU power. Therefore, no system requirements are specified, a server should run on any supported operating system. A Red Eclipse can even be run on a Raspberry Pi if so desired, though it is advisable to have a little more compute power to avoid lagspikes on player join.

## Quickstart
### Using the server shipped with Red Eclipse

#### Windows
1. Copy the [servinit.cfg](https://raw.githubusercontent.com/redeclipse/base/master/doc/examples/servinit.cfg) example template from `doc\examples` to the root Red Eclipse directory (copy to the same directory as `redeclipse_server.bat`).
1. Edit these files with a text editor as appropriate, see [Configuration Files](#configuration-files) for more.
1. Start the server by executing `redeclipse_server.bat`.

#### GNU/Linux

##### Installed
This is normally the case if you installed Red Eclipse via your package manager, or using the "system-install" make target.
1. Copy the [servinit.cfg](https://raw.githubusercontent.com/redeclipse/base/master/doc/examples/servinit.cfg) example template from `/usr/share/doc/redeclipse/examples/` to your homedir (`~/.redeclipse/` by default), using:
```sh
cp /usr/share/doc/redeclipse/examples/servinit.cfg ~/.redeclipse/
```
2. Edit these files in the homedir as appropriate.
2. Start the server via:
```sh
redeclipse-server
```

##### From Unpacked Tarball
This is the case if you are running Red Eclipse directly from the unpacked release archive.

1. Copy the [servinit.cfg](https://raw.githubusercontent.com/redeclipse/base/master/doc/examples/servinit.cfg) example template located in `doc/examples` either to your homedir:
```sh
cp doc/examples/servinit.cfg ~/.redeclipse/
```
or to the root Red Eclipse directory:
```sh
cp doc/examples/servinit.cfg .
```
2. Edit these files as appropriate.
2. Start the server via:
```sh
./redeclipse_server.sh
```

#### macOS

There is currently no dedicated server launcher for macOS, yet it is possible to host a non-dedicated server via running the client binary in server mode. To set this up, follow these steps:

1. Create a new config file in your Red Eclipse home directory, such as `macserver.cfg`.
    1. You can add any server settings you want to this file, just like you would inside `servinit.cfg`, but without the `sv_` prefix, and with:
```cubescript
servertype 3
```
This line allows the server to register with the master server, and thus show up in the master list.

2. Save this file to your Red Eclipse home directory.
2. Start an offline game and run the following in the console:
```cubescript
exec "macserver.cfg"
```

If all goes well, your client will connect to the master server and register itself, and will then show up in the master list. Note that the client must remain running the whole time you want the server online.

### Using [Docker](https://www.docker.com/)
Currently there are two different Docker images, it's up to you which one you choose.
For installation and configuration steps follow their respective guides:
1. [https://github.com/TheAssassin/redeclipse-docker](https://github.com/TheAssassin/redeclipse-docker)
1. [https://hub.docker.com/r/iceflower/redeclipse-server](https://hub.docker.com/r/iceflower/redeclipse-server)

## Configuration Files
The configuration files are written in CubeScript; lines starting with `//` are ignored. If you want to configure a setting, remove the `//` in front of it and change its value.

### servinit.cfg
[servinit.cfg](https://raw.githubusercontent.com/redeclipse/base/master/doc/examples/servinit.cfg) contains the configuration settings for a Red Eclipse server. Settings defined in `servinit.cfg` become the server's defaults, and using `resetvars` restores those defaults.

#### Admin Password
- The admin password can (and should!) be set using:
```cubescript
adminpass "yourpassword"
```
- To claim Admin, join your server, open the console, and type:
```cubescript
/setpriv yourpassword
```
**Only give your `adminpass` to people you trust and deem responsible to manage your server! They can do just about anything to your server after claiming admin!**

#### Connection Settings
- To customize the port used by the server, uncomment the `serverport` line and change the port number as desired. For example:
```cubescript
serverport 10000
```
- You may also specify which address your server binds to by uncommenting the `serverip` line and changing the address as desired. For example:
```cubescript
serverip 127.0.0.1
```
Remember these settings in case you need to configure [port forwarding](#forwarding-ports).

#### Web API
Servers also expose an HTTP/WebSocket Web API (configured via `webport`, `webip`, `webpass`, and TLS options in `servinit.cfg`). See [Server HTTPS](Server-HTTPS) for configuring HTTPS certificates and TLS settings.

### Server Visibility and Access
You can control the visibility and/or accessibility of your server to the public.

- For a private server that does not register with the master server (and therefore does not show up on the public server list), you can use:
```cubescript
servertype 1
```
- For a private server that DOES show on the public server list, **but requires a password to join**, simply set the serverpass variable.
```
serverpass "password_to_connect"
```
Note however that this is **NOT** the same as adminpass, and will **NOT** allow those connected to claim admin.

### Access Restrictions
You can change the "openness" of your server; i.e., allowing anyone to claim local **moderator** privileges (`/setpriv 1`), and/or preventing `mastermode` from being changed. Although usually unnecessary, these settings are convenient for public co-op editing servers. These restrictions may be modified with the `sv_serveropen` variable:

| Type | Description                                                                                                                        |
|:----:|------------------------------------------------------------------------------------------------------------------------------------|
| 0    | *Very open* — allows any master mode (`0..3`), and privilege claims (`/setpriv 1`) are auto-approved when no moderator+ is present |
| 1    | *Open only* — allows only `mastermode 0` (open); privilege claims (`/setpriv 1`) are auto-approved                                 |
| 2    | *Co-op edit friendly* — allows open (`0`), veto (`1`), and locked (`2`) master modes, with privilege claims auto-approved           |
| 3    | **Default setting** — allows open (`0`) or veto (`1`); privileges require an [account](Privileges) or `adminpass`               |

### Server Customization
- For information on how to limit modes and mutators please see [Game Filters](Server-GameFilters)
- For an example `servinit.cfg` configuration see [doc/examples/servinit.cfg](https://github.com/redeclipse/base/blob/master/doc/examples/servinit.cfg)
- For information on server and game variables, see the [server variables](../variables/Server) and the rest of the [variables](../variables/Variables)

## Forwarding Ports
Public servers need port forwarding (and firewall rules) configured for the game ports, plus the Web API port if direct HTTP/HTTPS connections are desired.

**Important:** Whatever game port you choose to forward, you must also forward that port plus one (UDP). For example, with the default port `28801`, forward both `28801` and `28802` UDP.

- If your server is behind a router you may need to open ports in your router's settings.
- To open ports go to your router's setup menu. This is usually done by opening your web browser and typing `http://192.168.1.1` or `http://192.168.0.1` in the address bar.
- Find the section of your router's menu that lists connected devices and determine the internal IP address of the computer hosting the server.
- Note: if your server becomes unconnectable, check that this internal address has not changed.
- Create a port forwarding / virtual server rule opening UDP ports `28801`–`28802` (or your chosen `serverport` and `serverport + 1`), and TCP port `28888` (if exposing the Web API directly), forwarding them to the server's internal IP.

**Default Ports**

| Type        | Port      |
|-------------|-----------|
| Connections | 28801 UDP |
| Queries     | 28802 UDP |
| Web API     | 28888 TCP |

For more information on port forwarding, including instructions specific to your router, visit [PortForward.com](https://portforward.com/).

## Advanced Setup
### Multiple Servers
*This does not apply to servers running with [Docker](#using-docker).*

To run multiple servers from the same install, create a separate directory for the second server's configuration (for example `~/second`), place a custom `servinit.cfg` inside it (with its own `serverport` and `httpserverport`), and pass `-h$HOME/second` when launching `redeclipse_server.sh` (or edit `APP_OPTIONS="-h$HOME/second"` in a copy of the launcher script). Note that each server will also automatically increment `httpserverport` up to `httpserverportrange` times if port `28888` is already in use.

### Using auth to grant permissions
Red Eclipse supports a global permissions and identification system called "[auth](Privileges)" that can be used to grant players permission to use commands on your server. In `servinit.cfg`, place a line such as:
```
addlocalop <authname> <privilege>
```
The `<authname>` is that player's account handle (`authkey`). The `<privilege>` argument can be `a`, `m`, or `s`, standing for **administrator**, **moderator**, or **supporter** respectively. To customize which level each action requires, configure the lock variables (`sv_{mode, maps, vars, vote, spec, team, kick, allow, ban, mute, limit, except, veto, edit, spawn, spawnedit, master, flood, demo, crc, iphost, overflow, teamkill, connect, message, setinfo}lock` and `sv_teambalancelock`).
