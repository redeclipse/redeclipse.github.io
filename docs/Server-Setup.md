---
title: Server Setup
origtitle: Server-Setup
layout: docs
---
* [System Requirement](#system-requirement)
* [Quickstart](#quickstart)
    * [Using the server shipped with Red Eclipse](#using-the-server-shipped-with-red-eclipse)
        * [Windows](#windows)
        * [GNU/Linux](#gnulinux)
        * [Mac OSX](#max-osx)
    * [Using Docker](#using-docker)
* [Configuration Files](#configuration-files)
     * [serverinit.cfg](#serverinitcfg)
     * [Server Visibility and Access](#server-visibility-and-access)
     * [Access Restrictions](#access-restrictions)
     * [Server Customization](#server-customization)
* [Forwarding Ports](#forwarding-ports)
* [Advanced Setup](#advanced-setup)
    * [Multiple Servers](#multiple-servers)
    * [Using auth to grant permissions](#using-auth-to-grant-permissions)
    
***
**WARNING: Before setting up a public server you should read the [Multiplayer Guidelines](https://github.com/red-eclipse/base/blob/master/doc/guidelines.txt), which governs how you may and may not use the master server. Be warned that modifications to the source code must be approved, and servers must honour the "auth" system. No if's, but's, or maybe's.**

# System Requirements
Hosting one or more Red Eclipse servers on your system will require a decent bandwith (20-30 Kb/s down and ~10 Kb/s up per player/ bot), but use very few compute resources, such as RAM or CPU power. Therefore, no system requirements are specified, a server should run on any supported operating system. A Red Eclipse can even be run on a Raspberry Pi if so desired, though it is advisable to have a little more compute power to avoid lagspikes on player join.

# Quickstart
## Using the server shipped with Red Eclipse

### Windows
1. Copy the [servinit.cfg](https://raw.githubusercontent.com/red-eclipse/base/stable/doc/examples/servinit.cfg) example template from `doc\examples` to the root Red Eclipse directory (copy to the same directory as `server.bat`)
1. Edit these files with a text editor as appropriate, see [Comfiguration Files](#configuration-files) for more.
1. Start the server by executing `server.bat`, an icon should appear in the taskbar. Click on it to view the console.

### GNU/Linux
For details on locating your Red Eclipse home directory, refer to [Game Settings]().

#### Installed
This is normally the case if you installed Red Eclipse via your package manager, or using the "system-install" make target.
1. Copy the [servinit.cfg](https://raw.githubusercontent.com/red-eclipse/base/stable/doc/examples/servinit.cfg) example template from `/usr/share/doc/redeclipse/examples/` to your homedir, using
```sh
cp /usr/share/doc/redeclipse/examples/servinit.cfg ~/.redeclipse/
```
2. Edit these files in the homedir as appropriate
2. Start the server via
```sh
redeclipse-server
```

#### From Unpacked Tarball
This is the case if you are running Red Eclipse directly from the unpacked tarball distributed via redeclipse.net (and others).

1. Copy the [servinit.cfg](https://raw.githubusercontent.com/red-eclipse/base/stable/doc/examples/servinit.cfg) example template located in `doc/examples` either to your homedir
```sh
cp doc/examples/servinit.cfg ~/.redeclipse/
```
or to the root redeclipse directory
```sh
cp doc/examples/servinit.cfg .
```
2. Edit these files as appropriate
2. Start the server via
```sh
./server.sh
```

### Mac OSX

There is currently no server binary for the Mac, yet it is possible to host a non-dedicated server via running the client binary in server mode. To set this up, you will need to follow a few steps:

1. Create a new config file. Name it something like `macserver.cfg` or something to that effect.
    1. You can add any server settings you want to this file, just like you would inside `serverxec.cfg/servinit.cfg`, but without the `sv_` prefix, and one important line: 
```cubescript
servertype 3
```
This line allows the server to be broadcast to the master server, and thus show up in the master list.

2. Save this file to your Red Eclipse home directory
2. Start a game of "offline practice", and type the following in the console:
```cubescript
exec "macserver.cfg"
```
(or whatever you named it)

If all goes well, your client will connect to the master server and register itself, and will then show up in the server list. Please note that the client must be running at all times you wish the server to be online.

## Using [Docker](https://www.docker.com/)
Currently there are two different Docker Images, its up to you which one you choose.
For the installation and configuration steps follow the specific guides.
1. https://github.com/TheAssassin/redeclipse-docker
1. https://hub.docker.com/r/iceflower/redeclipse-server

# Configuration Files
The configuration files are written in [cubescript](), lines starting with `//` are ignored. If you want to configure a setting simply remove the `//` in front of it and change it's value.

## servinit.cfg
[servinit.cfg](https://raw.githubusercontent.com/red-eclipse/base/stable/doc/examples/servinit.cfg) contains the configuration settings for a Red Eclipse server. As of Red Eclipse v1.4 Elara, the settings defined in `servinit.cfg` are set as the server's "default" settings, and using resetvars will simply restore the default settings, rather than re-executing `servexec.cfg`, which is now defunct and no longer used in Red Eclipse.

### Admin Password
- The admin password can (and should!) be set using
```cubescript
adminpass "yourpassword"
```
- To claim Admin, join your server. Open the console and type the command
```cubescript
/setpriv yourpassword
```
**Only give your adminpass to people you trust and deem responsible to manage your server! They can do just about anything to your server after claiming admin!**


### Connection Settings
- If you wish to customize the ports used by the server you can do so by uncommenting the serverport line and changing the port number to that of your liking. For example:
```
serverport 10000
```
Should you desire/need to, you may also specify which address your server binds to by uncommenting the serverip line and changing the address to that of your liking. For example:
```
serverip 127.0.0.1
```
Remember these settings for later, in case you will need to do [port forwarding](#forwarding-ports). 

## Server Visibility and Access
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

## Access Restrictions
You can change the "openness" of your server; ie. allowing anyone to claim **helper** (one hierarchal level lower than [moderator](Privileges)), and/or preventing mastermode from being changed. Although usually unnecessary, these settings are convenient for example, public co-op editing servers. These restrictions may be modified with the serveropen variable, and the following is a list of options:

| Type | Description                                                                                                                    |
|------|--------------------------------------------------------------------------------------------------------------------------------|
| 0    | *Very open* - Allow "open master" (anyone may claim helper with `setpriv 1`) and can set mastermode 2 (locked) or 3 (private). |
| 1    | *Open master* - Mastermode cannot be modified at all.                                                                          |
| 2    | *Open master* - Mastermode can be changed, but cannot set to 3 (private). This is useful for public co-op editing.             |
| 3    | **Default setting** - Only those who know the adminpass may claim admin, and only [Auth users](Privileges) may claim master.   |

## Server Customization
- For information on how to limit modes and mutators please see [Game Filters]()
- For examples of servinit.cfg configurations see [Server Examples]()
- For information on weapon variables, see [Weapon Variables]()

# Forwarding Ports
All servers need enabled port forwarding.

**Important:** Whatever port you choose to forward, you must also forward that port plus one. For example, if you choose port 6551, you would also need to forward port 6552.

- If your server is behind a router you may need to open ports in your routers settings.
- To open ports go to your router's setup menu. This is usually done by opening your web browser (firefox, explorer) and typing http://192.168.1.1 or http://192.168.0.1 in the address bar.
- Find the section of your router's menu that lists connected devices.
- Determine from this list the Internal address of the computer hosting the server. (ex: 192.168.1.5) Remember the address of the hosting computer as you will need it for the next step.
- Note: if your server becomes unconnectable check that this internal address has not been changed by your router.
- Find the section of your router's menu entitled "port forwarding" or "virtual servers"
- In this section create a new instance for Red Eclipse, opening the correct set of ports for your server version using UDP option. Forward these ports to the internal IP of the computer hosting the server.

**Default Ports**

| Type        | Port      |
|-------------|-----------|
| Connections | 28801 UDP |
| Queries     | 28802UDP  |

For more information on port forwarding, including instructions specific to your router, visit the very helpful site [PortForward.com](PortForward.com)

# Advanced Setup
## Multiple Servers
*This do not apply to server running with [Docker](#using-docker).*

To run multiple servers from the same install, one must change the `redeclipse_server.sh` file slightly. First, copy the `redeclipse_server.sh` file to a new directory. Here we will use 'second' Second, the `APP_PATH` variable needs to be set to the base install, so:
```
APP_PATH="/home/user/redeclipse"
```
Then, `APP_OPTIONS` needs to use the `-h` server command-line option to find the correct `servinit.cfg`
```
APP_OPTIONS="-h$HOME/second"
```
After saving the new `redeclipse_server.sh` file, make a `servinit.cfg` file for the server, and place it in the same folder `APP_OPTIONS` points to.

Done! Run your server with:
```
./redeclipse_server.sh
```

## Using auth to grant permissions
Red Eclipse supports a global permissions and identification system called "[auth](Privileges)" that can be used to grant players permission to use commands on your server. In the `servinit.cfg`, simply place a line as so:
```
addlocalop AUTHNAME FLAG
```
The `AUTHNAME` would be that player's handle, that they recieved to use in the `/authkey` command. As for the FLAG argument, that can be an `a`, `m`, or `o`. These stand for administrator, moderator, operator respectively. To take advantage of the different flags, you will have to set the `sv_{mode, maps, vars, vote, spec, kick, allow, ban, mute, limit, veto, flood}lock` variables.