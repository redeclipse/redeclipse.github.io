---
title: Privileges
origfile: Privileges.md
layout: docs
---
* TOC
{:toc}
Players can [apply](https://redeclipse.net/apply) for an account that allows them to authenticate as registered users. Registration is optional, so users are free to play anonymously. Some accounts have special privileges that serve for game moderation or server administration. These are indicated in-game as icons, which are shown to the left of all player names.

## Privilege Icons

| Icon                                                                         | Description          | Icon                                                                    | Description           |
|:----------------------------------------------------------------------------:|----------------------|:-----------------------------------------------------------------------:|-----------------------|
| <img src="images/privs/bot.png" width="32px" height="32px" />                | Bot (AI Controlled)  |                                                                         |                       |
| <img src="images/privs/none.png" width="32px" height="32px" />               | Guest Player         | <img src="images/privs/player.png" width="32px" height="32px" />        | Authenticated Player  |
| <img src="images/privs/localsupporter.png" width="32px" height="32px" />     | Local Supporters     | <img src="images/privs/supporter.png" width="32px" height="32px" />     | Global Supporters     |
| <img src="images/privs/localmoderator.png" width="32px" height="32px" />     | Local Moderators     | <img src="images/privs/moderator.png" width="32px" height="32px" />     | Global Moderators     |
| <img src="images/privs/localoperator.png" width="32px" height="32px" />      | Local Operators      | <img src="images/privs/operator.png" width="32px" height="32px" />      | Global Operators      |
| <img src="images/privs/localadministrator.png" width="32px" height="32px" /> | Local Administrators | <img src="images/privs/administrator.png" width="32px" height="32px" /> | Global Administrators |
| <img src="images/privs/developer.png" width="32px" height="32px" />          | Project Developers   | <img src="images/privs/founder.png" width="32px" height="32px" />       | Project Founders      |

Of course, [bots](Bots.md) are not related to player accounts, but they have their own icons to readily distinguish them from human ("real") players. Some privilege levels can be either local or global. Local privileges are given to registered players on specific servers, as described in a following section. In contrast, global privileges are valid on all public servers.

## Levels and lock variables
The levels [above](#privilege-icons) sorted from low to high refer to the usage of certain server variables that define the minimum privileges required to perform a specific action. This allows server owners to give more liberal rights to lower player levels. The same levels can also be used to restrict map editing, joining a game or even connecting to the server. To learn more about these variables, search for *lock* in the *variables* menu, which is accessible from the game's main menu.

## Local Privileges
If you host a game server, you are free to specify local privileges for selected players. To add existing user accounts (including your own) to your local server user lists, in [servinit.cfg](Server-Setup.md#configuration-files) add:
```
addlocalop <handle> <level>
```
Where level "s" is supporter, "m" is moderator, "o" is operator, and "a" is administrator.

If you do not have an account, it is still possible to claim local administrator rights using a password specified in [servinit.cfg](Server-Setup.md#configuration-files):
```
adminpass <password> 
```
This password can be entered via the *setpriv* command, which also servers to claim helper status.
```
/setpriv <password>
```

## How to apply for an account
Open registrations are available for all recurring players. If you play Red Eclipse with any regularity and would like others to be able to identify you, please [fill out an application](https://redeclipse.net/apply).

Once you have received an authkey and added it to your [config.cfg](Game-Settings.md#config.cfg), you are free to identify when connecting to a game server. For this you find a checkbox in two of the in-game menus, the server menu (F2) and the user profile menu.
