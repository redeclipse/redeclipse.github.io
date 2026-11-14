---
title: FAQ
layout: docs
origfile: FAQ.md
origtitle: FAQ
permalink: /docs/FAQ
redirect_from:
  - /wiki/FAQ/
---
* TOC
{:toc}
## What operating systems are supported?

Red Eclipse can be played under Windows XP/Vista/7/8.1/10/11, macOS, GNU/Linux and BSD.

## How long has the game been in development?

Red Eclipse was branched from the now-defunct [Blood Frontier](https://sourceforge.net/projects/bloodfrontier/) project. Blood Frontier development started in 2007, and Red Eclipse was formed Spring of 2011. Red Eclipse 1.0 Ides Edition debuted on [March 15](http://en.wikipedia.org/wiki/Ides_of_march), 2011.

## Where can I get the game?

The best way to play Red Eclipse is by downloading it through <span class="fab fa-steam" aria-hidden="true"></span> **[Steam](/steam)**.
Red Eclipse is available for download at no cost.

- The [latest release](/download) can be downloaded for all supported operating systems.
- GNU/Linux users can also use the [AppImage](AppImages).
- Or [build from source](Install-Guide#building-from-source) using the developmental [Git version](/devel), which is hosted by [GitHub](https://github.com/redeclipse/base).

These are the only official sources. Packages from Linux distributions, the AUR, BSD ports and other third parties are not maintained or supported by the Red Eclipse development team, see the [Install Guide](Install-Guide#important-notice-about-unofficial-packages).

## What are my rights?

Red Eclipse is a [Free](http://www.gnu.org/philosophy/free-sw.html) and [Open Source](http://www.opensource.org/) game.

- Red Eclipse itself and the Cube Engine 2 are under the [Zlib License](http://en.wikipedia.org/wiki/Zlib_License).
- All content in the game is Free, and no more strict than the Creative Commons [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) license.
- For more details, see the [License](License), [Trademark Policy](Trademark-Policy), and [Privacy Policy](Privacy-Policy).

## What are my rights regarding game servers?

- Anyone may run up to three (3) servers, and can be listed on the Red Eclipse Master Server, *however, only if they are in compliance with the guidelines, rules and policies outlined in the [Multiplayer Guidelines](Multiplayer-Guidelines)*. You can request a "trusted" (more servers) authorisation from the Red Eclipse team with the [server request form](https://github.com/redeclipse/master/issues/new?template=server.yml).
    - Players must also abide by a set of guidelines as well, and are advised to view the **latter half** of the [Multiplayer Guidelines](Multiplayer-Guidelines).
- Any player or server found to not be in compliance with these guidelines are susceptible to denial of access to the Red Eclipse Master Server either temporarily or indefinitely.

## Where else can I get help or discuss the game?

Apart from this wiki, and playing on the game servers, you can:

- Participate in [Discussions](/discuss).
- Chat on our [Discord](/discord).

## Where do I find screenshots, logs and other user data?

The location of user content varies on different operating systems.

### Windows

Check the "My Games" folder in your documents: `%USERPROFILE%\My Documents\My Games\Red Eclipse`

### Linux

See the .redeclipse user data in your home directory: `~/.redeclipse`

### Mac/OSX

Check the app data in your home directory: `/Users/<username>/Library/Application Support/Red Eclipse`

## How do I join a server from a link?

A server's address on the [server browser](/servers) is a join link, such as `redeclipse://203.0.113.5:28801`. Clicking it opens Red Eclipse and joins that server. If the game is already open, the link goes to it instead of starting another copy, and it asks first if that would take you out of a match or away from unsaved edits.

Each server's chat thread on our [Discord](/discord) has a "join it" link, and each post saying someone joined has a "Join them" link. Discord can't open the game itself, so these go to a page on the master server that opens it for you.

The game sets up join links whenever it starts, without needing administrator rights, and the copy you started most recently is the one they open. Join links never include a server's password. If clicking one does nothing, start the game once and try again. To stop a copy of the game from taking join links, set `joinlinks 0` in its console.

## Can my friends see what I'm playing and join me?

On Steam and Discord, your friends see the mode and map you're playing, the server's name and how many people are on it. While you're on a server from the [server browser](/servers) that is open, needs no password and has room, they also get a Join button that brings them to the same server, the same way a join link does. Your server's address is never shown as text.

Choose what friends see under Settings, Gameplay, Friends, or with `presence` in the console: `0` shows nothing, `1` shows what you're playing without a Join button, and `2` (the default) adds the Join button.

On Linux, the game also finds Discord when it's installed as a Flatpak or Snap, or when you use Vesktop from Flathub, as long as Discord is running before you start the game. If your friends still can't see what you're playing, link Discord's socket to where the game looks yourself (this is for the Flatpak; change the folder to match your Discord):

```
ln -s "$XDG_RUNTIME_DIR/app/com.discordapp.Discord/discord-ipc-0" "$XDG_RUNTIME_DIR/discord-ipc-0"
```

The link goes away when you log out. To have it made each time you log in, put this line in `~/.config/user-tmpfiles.d/discord-rpc.conf`:

```
L %t/discord-ipc-0 - - - - app/com.discordapp.Discord/discord-ipc-0
```

## How do I find people to play with?

Join the **Matchmaking Queue**. Say how small a match you'd play, 2+, 4+, 6+ or 8+, then carry on with whatever you're doing. Once enough people are waiting, everyone is sent to the same server together, and anyone already on that server counts towards the match, so a server with a couple of players on it fills first.

You can wait from three places, and they all share one queue:

- **In the game:** the server browser has the queue above the list. Leave the game open in the background and it flashes and asks you to join when your match is ready. It never joins by itself.
- **On the website:** the [server browser](/servers) has the same queue. Keep the page open: it chimes, shows a notification if you allow it, and gives you a Join button.
- **On our [Discord](/discord):** the pinned Matchmaking post in the servers forum lists the servers and has the queue's buttons. You're mentioned in the server's own thread with a join link when your match is ready. Your place lasts 60 minutes, and you'll be asked shortly before it runs out if you want 30 more. Use `/matchmaking status` to see where you stand.

If you join a server while you're waiting, you aren't counted twice, and you're taken out of the queue once that server has as many on as you wanted. Anyone in the @Matchmaking role on Discord hears when one more player would make a match.

## When I launch the game, there's a terminal. Is that normal?

Yes. Red Eclipse will automatically check for updates, and you will see a terminal while the updater script is running.

## Why does the game not start?

If the terminal window closes without launching the game, then there's a problem with the updater, usually missing permissions to replace some files. On windows for example, right-click the game launcher and select "Run as administrator". If the updater still hangs or fails, try a fresh install, but that really should not be necessary.

## What does 'devel' mean?

This is the development version of the game, which can be [built from source](Install-Guide#building-from-source) from our Github repository to check out upcoming features and life on the bleeding edge.

## What does master mean?

All development happens on the master branch of our [base repository](https://github.com/redeclipse/base) on GitHub. Every build of it that passes our automated checks goes to the devel branch on Steam, which is the easiest way to try upcoming changes. The old stable branch holds the 2.0 release from 2019 and is no longer updated.

## I found a bug, where can I report it?

Technical problems can be reported in the [discussion area](/discuss). Evident bugs can be reported on the [issue list](/issues), but first, please have a look at our [contribution guidelines](https://github.com/redeclipse/.github/blob/master/CONTRIBUTING).

## Red Eclipse fails with 'OpenGL 2.0 or greater is required!', but I have 2.0 or greater.

On Windows, when Red Eclipse detects the renderer as 'GDI Generic' it will report a much lower GL version. This has been resolved by removing config.cfg and init.cfg to reset game settings.

## Can I contribute to the game?

Development of Red Eclipse is open and community driven. Contributions can be maps created with the in-game [editor](editing/Basics), art assets like models, or modifications of the [source code](https://github.com/redeclipse/base/tree/master/src). For further information, please read our [contribution guidelines](https://github.com/redeclipse/.github/blob/master/CONTRIBUTING).

## I found a cheater, what can I do?

If you think someone cheats or violates the [Multiplayer Guidelines](Multiplayer-Guidelines) in some other way, you can open a issue in the [discussion area](/discuss). Be sure to attach a demo record of the game, so the problem can be investigated. Convictable cheaters will be sanctioned accordingly.

## How can i change the chat colour?

This is a semi-official feature. You can set the alias *saytextcolour* to a hex colour value, for example yellow: `/saytextcolour = 0xffff00`

Only use bright colours with good contrast. A value of -1 will take your profile colour instead.

## What is the game objective?

This depends on the current [mode and mutators](gameplay/Modes-and-Mutators) of the game, which you can look up any time in the help menu (default key: **F1**). Click the large icons in the help menu to learn more about the rules of the current game. These help menus provide detailed information and tips, of which most can also be read on the wiki. There is also a [guide](gameplay/Gameplay-Guide) for beginners.

## Why is my player score negative?

Be careful not to shoot your team mates, especially when using explosive weapons. Each team kill subtracts six points. Team kills on [flag carriers](gameplay/Capture-the-Flag) or [bombers](gameplay/Bomber-Ball) even double this penalty. For details, see [Scoring System](gameplay/Scoring-System).

## dm, pzap, gg - what did they just say?

For frequently used abbreviations and player slang, see [glossary](Glossary).

## What are those symbols near player names?

These are the [privileges](server-how-to/Privileges) or ranks of registered players.

## Why is there a timer when I get killed?

There is a delay before you can respawn. This adds a tactical value to defeating enemy players, as the time-out is an advantage for your team.

## I hit a guy many times with my shotgun, why didn't he die?

It is easy to hit someone with a shotgun, but the weapon is really only effective at close range. Each loadout weapon has its pros and cons, and some of them are hard to master.

## How did they take away their own flag?

In [capture](gameplay/Capture-the-Flag) games, you can press **F** (per default) to pick up the flag in your own base, so the enemy cannot reach it that easily. The same button can also be used to drop a flag you carry, be it yours or the enemy's.

## Why are there no health pickups?

In Red Eclipse the player regenerates health and [impulse](gameplay/Parkour-Guide) energy. Therefore, map control is less important, and everyone can focus on the real fun: Capturing that flag, grabbing that bomber ball… or just fragging!

## Why am I taking damage when no one is near me?

Your are under the effect of the a negative [status effect](gameplay/Status-Effects).

## A green beeping thing obscured my vision - what the heck?

Someone has probably just thrown a mine on you. Mines are sticky. And yes, they explode.
