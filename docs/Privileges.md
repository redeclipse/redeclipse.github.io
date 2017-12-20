---
title: Privileges
origtitle: Privileges
layout: docs
---
* TOC
{:toc}
Players can [apply](https://redeclipse.net/apply) for an account that allows them to authenticate as registered users. Registration is optional, so users are free to play anonymously. Some accounts have special privileges that serve for game moderation or server administration. These are indicated in-game as icons, which are shown to the left of all player names.

## Privilege Icons
| Icon                                                                                                               | Description          | Icon                                                                                                            | Description           |
|:------------------------------------------------------------------------------------------------------------------:|----------------------|-----------------------------------------------------------------------------------------------------------------|-----------------------|
<img src="https://raw.githubusercontent.com/red-eclipse/textures/master/privs/bot.png" width="32px" />               | Bot (AI Controlled)  |                                                                                                                                         |
<img src="https://raw.githubusercontent.com/red-eclipse/textures/master/privs/none.png" width="32px"/>               | Guest Player         | <img src="https://raw.githubusercontent.com/red-eclipse/textures/master/privs/player.png" width="32px"/>        | Authenticated Player  |
<img src="https://raw.githubusercontent.com/red-eclipse/textures/master/privs/localsupporter.png" width="32px"/>     | Local Supporters     | <img src="https://raw.githubusercontent.com/red-eclipse/textures/master/privs/supporter.png" width="32px"/>     | Global Supporters     |
<img src="https://raw.githubusercontent.com/red-eclipse/textures/master/privs/localmoderator.png" width="32px"/>     | Local Moderators     | <img src="https://raw.githubusercontent.com/red-eclipse/textures/master/privs/moderator.png" width="32px"/>     | Global Moderators     |
<img src="https://raw.githubusercontent.com/red-eclipse/textures/master/privs/localoperator.png" width="32px"/>      | Local Operators      | <img src="https://raw.githubusercontent.com/red-eclipse/textures/master/privs/operator.png" width="32px"/>      | Global Operators      |
<img src="https://raw.githubusercontent.com/red-eclipse/textures/master/privs/localadministrator.png" width="32px"/> | Local Administrators | <img src="https://raw.githubusercontent.com/red-eclipse/textures/master/privs/administrator.png" width="32px"/> | Global Administrators |
<img src="https://raw.githubusercontent.com/red-eclipse/textures/master/privs/developer.png" width="32px"/>          | Project Developers   | <img src="https://raw.githubusercontent.com/red-eclipse/textures/master/privs/founder.png" width="32px"/>       | Project Founders      |

Of course, [bots](Bots) are not related to player accounts, but they have their own icons to readily distinguish them from human ("real") players. Some privilege levels can be either local or global. Local privileges are given to registered players on specific servers, as described in a following section. In contrast, global privileges are valid on all public servers.

## Levels and lock variables
The levels [above](#privilege-icons) sorted from low to high refer to the usage of certain server variables that define the minimum privileges required to perform a specific action. This allows server owners to give more liberal rights to lower player levels. The same levels can also be used to restrict map editing, joining a game or even connecting to the server. To learn more about these variables, search for *lock* in the *variables* menu, which is accessible from the game's main menu.

## Local Privileges
If you host a game server, you are free to specify local privileges for selected players. To add existing user accounts (including your own) to your local server user lists, in [servinit.cfg](Server-Setup#configuration-files) add:

```
addlocalop <handle> <level>
```
Where level `s` is supporter, `m` is moderator, `o` is operator and `a` is administrator.

If you do not have an account, it is still possible to claim local administrator rights using a password specified in [servinit.cfg](Server-Setup#configuration-files):
```
adminpass <password> 
```
This password can be entered via the *setpriv* command, which also servers to claim helper status.
```
/setpriv <password>
```

## How to apply for an account
Open registrations are available for all recurring players. If you play Red Eclipse with any regularity and would like others to be able to identify you, please [fill out an application](https://redeclipse.net/apply).

Once you have received an authkey and added it to your [config.cfg](Game-Settings#config.cfg), you are free to identify when connecting to a game server. For this you find a checkbox in two of the in-game menus, the server menu (F2) and the user profile menu.
