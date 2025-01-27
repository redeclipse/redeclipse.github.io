---
title: Materials
layout: docs
origfile: Materials.md
origtitle: Materials
permalink: /docs/Materials
redirect_from:
  - /wiki/Materials/
---
* TOC
{:toc}
| Command                      | Description                                                                                                                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /showmat [0\|1] (or 'M' Key) | toggles the visibility of material volumes.                                                                                                                                                                         |
| /air                         | deletes all materials within the selection.                                                                                                                                                                         |
| /water                       | creates water within the selected. Use water2, water3, and water4 if more variants are wanted.                                                                                                                      |
| /lava                        | creates lava within the selection. Use lava2, lava3, and lava4 if more variants are wanted                                                                                                                          |
| /glass                       | creates glass material within the selection. It is recommended that Alpha material is used instead of glass.                                                                                                        |
| /alpha                       | converts selected geometry to Alpha material. The transparency level of the selected material can be adjusted with the /valpha command. Default: /valpha 0.5 Min: /valpha 0.0 (invisible) Max: /valpha 1.0 (normal) |
| /death                       | creates invisible death material within the selection. Whenever a player's feet enter this material they are killed instantly.                                                                                      |
| /clip                        | creates an invisible wall within the selection area.                                                                                                                                                                |
| /aiclip                      | prevents ai waypoints from being created within the bounded volume.                                                                                                                                                 |
| /noclip                      | enables the player and projectiles to pass through the bounded geometry.                                                                                                                                            |
| /ladder                      | allows players to climb the bounded vertical geometry.                                                                                                                                                              |
| /hurt                        | damages players according to /hurtdamage (Remember damage is ten times HP).                                                                                                                                         |
