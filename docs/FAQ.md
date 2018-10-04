---
title: FAQ
layout: docs
origfile: FAQ.md
origtitle: FAQ
permalink: /docs/FAQ
---
* TOC
{:toc}
## What operating systems are supported?

Red Eclipse can be played under Windows XP/Vista/7/8.1/10, macOS, GNU/Linux and BSD.

## How long has the game been in development?

Red Eclipse was branched from the now-defunct [Blood Frontier](https://sourceforge.net/projects/bloodfrontier/) project. Blood Frontier development started in 2007, and Red Eclipse was formed Spring of 2011. Red Eclipse 1.0 Ides Edition debuted on [March 15](http://en.wikipedia.org/wiki/Ides_of_march), 2011. ~~[See history](History)~~.

## Where can I get the game?

Red Eclipse is available for download at no cost.

- The [latest release](/download) can be downloaded for all supported operating systems.
- GNU/Linux packages can also be found on:
    - [Debian](Install-Guide#debian/ubuntu_repository)
    - [Ubuntu](Install-Guide#debian/ubuntu_repository)
    - [AUR](https://aur.archlinux.org/packages/redeclipse)
    - [Chakra](https://chakralinux.org/ccr/packages.php?O=0&K=redeclipse&do_Search=+Go+)
- BSD ports are available for:
    - [FreeBSD](https://www.freshports.org/games/redeclipse/)
    - [OpenBSD](http://ports.su/games/redeclipse,-main)
- Or download the developmental [Git version](/devel), which is hosted by [GitHub](https://github.com/red-eclipse/base).

## What are my rights?

Red Eclipse is a [Free](http://www.gnu.org/philosophy/free-sw.html) and [Open Source](http://www.opensource.org/) game.

- Red Eclipse itself and the Cube Engine 2 are under the [zlib License](http://en.wikipedia.org/wiki/Zlib_License).
- All content in the game is Free, and no more strict than the Creative Commons [CC-BY-SA](http://creativecommons.org/licenses/by-sa/3.0/) license.
- For more details, see [license.txt](https://raw.githubusercontent.com/red-eclipse/base/master/doc/license.txt) and [trademark.txt](https://raw.githubusercontent.com/red-eclipse/base/master/doc/trademark.txt).

## What are my rights regarding game servers?

- Anyone may run up to three (3) servers, and can be listed on the Red Eclipse Master Server, *however, only if they are in compliance with the guidelines, rules and policies outlined in [guidelines.txt](https://raw.githubusercontent.com/red-eclipse/base/master/doc/guidelines.txt)*. You can request a "trusted" (more servers) and/or "statistics" (contributes to stats) server from the Red Eclipse team.
    - Players must also abide by a set of guidelines as well, and are advised to view the **latter half** of [guidelines.txt](https://raw.githubusercontent.com/red-eclipse/base/master/doc/guidelines.txt).
- Any player or server found to not be in compliance with these guidelines are susceptible to denial of access to the Red Eclipse Master Server either temporarily or indefinitely.

## Where else can I get help or discuss the game?

Apart from this wiki, and playing on the game servers, you can:

- Participate in the game [discussions](/discuss).
- Connect to [irc.freenode.net](irc://irc.freenode.net) IRC network, and join \#redeclipse channel or use the [WebChat](/chat)

## Where do I find screenshots, logs and other user data?

The location of user content varies on different operating systems.

### Windows

Check the "My Games" folder in your documents: `%USERPROFILE%\My Documents\My Games\Red Eclipse`

### Linux

See the .redeclipse user data in your home directory: `~/.redeclipse`

### Mac/OSX

Check the app data in your home directory: `/Users/<username>/Library/Application Support/Red Eclipse`

## When I launch the game, there's a terminal. Is that normal?

Yes. Red Eclipse will automatically check for updates, and you will see a terminal while the updater script is running.

## Why does the game not start?

If the terminal window closes without launching the game, then there's a problem with the updater, usually missing permissions to replace some files. On windows for example, right-click the game launcher and select "Run as administrator". If the updater still hangs or fails, try a fresh install, but that really should not be necessary.

## What does 'devel' mean?

This is the development version of the game, which can be ~~[obtained](Development-Version)~~ from our Github repository to check out upcoming features and life on the bleeding edge.

## What does master and stable mean?

These are the two branches of our base repository on GitHub, <http://github.com/red-eclipse/base/>. The stable branch is for the current release version of the game. This also includes important bug fixes that are fetched via automatic updates. The master branch is for the current development version.

## I found a bug, where can I report it?

Technical problems can be discussed in the [discussion area](/discuss). Evident bugs can be reported on the [issue list](/issues), but first, please have a look at our ~~[guidelines](Contribution-Guidelines)~~.

## Red Eclipse fails with 'OpenGL 2.0 or greater is required!', but I have 2.0 or greater.

On Windows, when Red Eclipse detects the renderer as 'GDI Generic' it will report a much lower GL version. This has been resolved by removing [config.cfg](Game-Settings#config.cfg) and [init.cfg](Game-Settings#init.cfg) to reset game settings.

## Can I contribute to the game?

Development of Red Eclipse is open and community driven. Contributions can be maps created with the in-game ~~[editor](Editing-Guide)~~, art assets like models, config ~~[scripts](Cubescript-Guide)~~ like game menus, or modifications of the [source code](https://github.com/red-eclipse/base/tree/master/src). For further information, please read our ~~[guidelines](Contribution-Guidelines)~~.

## I found a cheater, what can I do?

If you think someone cheats or violates the ~~[Multiplayer Guidelines](Multiplayer-Guidelines)~~ in some other way, you can open a issue in the [discussion area](/discuss). Be sure to attach a ~~[demo](Demo-Guide)~~ record of the game, so the problem can be investigated. Convictable cheaters will be sanctioned accordingly.

## How can i change the chat colour?

This is a semi-official feature. You can set the alias *saytextcolour* to a hex colour value, for example yellow: `/saytextcolour = 0xffff00`

Only use bright colours with good contrast. A value of -1 will take your profile colour instead.

## What is the game objective?

This depends on the current ~~[mode and mutators](GameModes_and_Mutators)~~ of the game, which you can look up any time in the help menu (default key: **F1**). Click the large icons in the help menu to learn more about the rules of the current game. These help menus provide detailed information and tips, of which most can also be read on the wiki. There is also a ~~[guide](Gameplay-Guide)~~ for beginners.

## Why is my player score negative?

Be careful not to shoot your team mates, especially when using explosive weapons. Each team kill subtracts six points. Team kills on ~~[flag carriers](Capture-the-Flag)~~, ~~[bombers](Bomber-ball)~~ or ~~[defenders](Defend-and-Control)~~ even double this penalty. For details, see [Deathmatch Scoring](Deathmatch#scoring).

## dm, pzap, gg - what did they just say?

For frequently used abbreviations and player slang, see [glossary](Glossary).

## What are those symbols near player names?

These are the [privileges](Privileges) or ranks of registered players. You can request your own player account on </apply>

## Why is there a timer when I get killed?

There is a delay before you can respawn. This adds a tactical value to defeating enemy players, as the time-out is an advantage for your team.

## I hit a guy many times with my shotgun, why didn't he die?

It is easy to hit someone with a shotgun, but the weapon is really only effective at close range. Each loadout weapon has its pros and cons, and some of them are hard to master.

## How did they take away their own flag?

In ~~[capture](Capture-the-Flag)~~ games, you can press **F** (per default) to pick up the flag in your own base, so the enemy cannot reach it that easily. The same button can also be used to drop a flag you carry, be it yours or the enemy's.

## Why are there no ammo and health pickups?

In Red Eclipse, players have an unlimited supply of weapon reloads, health regeneration and ~~[impulse](Impulse-Guide)~~ energy. Therefore, map control is less important, and everyone can focus on the real fun: Capturing that flag, grabbing that bomber ball… or just fragging!

## A green beeping thing obscured my vision - what the heck?

Someone has probably just thrown a mine on you. Mines are sticky. And yes, they explode.
