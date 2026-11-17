---
title: Editing - Basics
layout: docs
origfile: editing/Basics.md
origtitle: Basics
permalink: /docs/editing/Basics
redirect_from:
  - /wiki/editing/Basics/
---
* TOC
{:toc}

Red Eclipse makes use of the Tesseract engine, which utilizes an octree node for its level geometry. This allows for a shallow learning curve where anyone can quickly start making their own maps / levels to share with others. The editor itself is also contained within the game as its own game mode, meaning that you can create an entire map without the need of additional tools/software like most other 3D games. You can also join an online server to edit maps with others in realtime multiplayer map editing.

----

### Getting Started

To make your first map, you will want to enter the *editing* game mode. This can be done by selecting *editing* from the map selection menu, or alternatively you can type `/edit <mapname>` at the in-game console.

Once you have loaded the *editing* game mode. You can start a new map, by typing `/newmap`. This gives you an empty world to start from.

Due to the nature of real time editing, you can hop in and out of the edit camera by pressing `F2`. Meaning you are able to run around your map at any time, whilst also able to quickly toggle into edit mode when you want to make changes.

If you wish to save any changes you've made to your map, simply type `/savemap <mapname>`.

----

### The Basics of Cube Manipulation

The level geometry in Red Eclipse is made up of cubes for the most part. They can be easily added or removed from the world with the scroll wheel, whilst using the edit camera.

On a new map, you only need to select an area on the floor, and start using your scroll wheel to see how this functions. You can click & drag to select an area and extrude multiple cube faces simultaneously.

Right clicking different sides of the selection grid allows you to change which cube face you will be extruding cubes from.

You can also change the size of the grid selection, by using `G + scroll` or by typing `/gridpower <value>` into the in-game console.

Here's some of the basic methods you can use to manipulate cubes within the map;

| Default Key/Mouse bind | Description                                |
| ---------------------- | ------------------------------------------ |
| Left Mouse             | Select a cube                              |
| Right Mouse            | Select the active cube face                |
| Middle Mouse           | Select the active corner of a cube         |
| G + SCROLL             | Adjust the size of the selection grid      |
| R + SCROLL             | Rotate the selected cubes                  |
| Q + SCROLL             | Push and pull the selected edges of a cube |
| F + SCROLL             | Push and pull the selected cube faces      |
| Y + SCROLL             | Change the texture slot number             |
| C                      | Copy the selection                         |
| V                      | Paste the selection                        |
| X                      | Flip the cube selection                    |
| Z                      | Undo                                       |
| O                      | Redo                                       |
| +                      | Toggle outline                             |
| -                      | Toggle allfaces                            |
| B                      | Toggle fullbright                          |

----

### Materials

Materials can be used to add visual effects and help with the design / flow of your map. These are similar to cube geometry, but cannot be manipulated in the same ways.

They appear as translucent volumes; their visibility while editing can be toggled with `Ctrl+M` (`M` in legacy binds) or `/showmat [0|1]`.

You can open the Materials panel by pressing `F7`, apply the active material with `M`, or apply materials directly using the default keypad binds or console commands:

| Default Keybind | Command   | Material Name | Description                                          |
| --------------- | --------- | :------------ | ---------------------------------------------------- |
| NUMPAD 1        | `/air`    | Air (none)    | Clears any existing material                         |
| NUMPAD 2        | `/alpha`  | Alpha         | Makes geometry translucent (`/valpha [front] [back]`, `0.0` invisible to `1.0` opaque) |
| NUMPAD 3        | `/water`  | Water         | Creates water (`water2`–`water4` for extra variants) |
| NUMPAD 4        | `/lava`   | Lava          | Creates lava that burns players (`lava2`–`lava4` for extra variants) |
| NUMPAD 5        | `/clip`   | Clip          | Stops players from passing through                   |
| NUMPAD 6        | `/noclip` | Noclip        | Allows players and projectiles to pass through cubes |
| NUMPAD 7        | `/aiclip` | AI Clip       | Stops bots from passing through                      |
| NUMPAD 8        | `/death`  | Death         | Kills players immediately when their feet enter it   |
| NUMPAD 9        | `/ladder` | Ladder        | Allows players to climb vertical geometry            |
| —               | `/glass`  | Glass         | Renders refractive glass surfaces (`glass2`–`glass4` for extra variants) |
| —               | `/volfog` | Volumetric Fog | Creates volumetric fog (`volfog2`–`volfog4` for extra variants) |
| —               | `/hurt`   | Hurt          | Damages players whose feet enter it using `/hurtdamage` (HP is out of `1000`) and `/hurtresidual` |
| —               | `/nogi`   | No GI         | Excludes cubes from global illumination calculations |

----

### Lighting

Red Eclipse supports realtime dynamic lighting. Meaning you can add a light entity to the map and instantly see your changes by moving the light entity around.

To add a new light entity, press `F6` to open the Entities panel (`Ctrl+E` for the quick Entity placer, or `Ctrl+N` to add at the cursor), and select `light`. Alternatively, type `/newent light` into the console. The entity appears at your current grid selection.

Most importantly, you will want to set the colour and radius of the light entity. A list of attribute values appears above the entity itself. You can adjust parameters in the Entities panel (`F6`), directly with `.` (`/entset`), or by selecting the entity (left-click) and scrolling the mouse wheel while holding the corresponding number key:

| Key/Mouse bind | Parameter |
| -------------- | --------- |
| 1 + SCROLL     | Radius    |
| 2 + SCROLL     | Red       |
| 3 + SCROLL     | Green     |
| 4 + SCROLL     | Blue      |

You can also add global directional lighting by setting the `sunlight` variable.

This can be adjusted from the *Environment Settings* panel by pressing `F5`.

Alternatively, you can type `/sunlight 140 150 160` into the console, to instantly add light to the world. This command takes the values R G B (0-255).

----

### Remip & calclight

When editing a map, you will often need to `remip` and re-calculate lighting. A `calclight` will optimize the number of polygons used by cube geometry, and will also re-calculate the normal maps of textures.

You can do this by simply running `/calclight` in the console (this command also performs a remip).

----

### Mapmodels

A mapmodel is a polygon mesh that can be placed anywhere without restrictions; they can even intersect cube geometry. These are useful for adding details to a map where it may be hard or unconvincing to create a certain shape with cube geometry. Press `F6` to open the Entities panel (or `Ctrl+E` for the Entity placer), select `mapmodel`, and browse the model list to place one.

You can also use the console to add mapmodels to your map by typing `/newent mapmodel`.

Similar to the light entity, you can hold `1 + SCROLL` to cycle through the mapmodel index, or choose models visually in the Entities panel.

----

### Editor Panels

Red Eclipse features several editor panels for adjusting map settings while in edit mode. Ensure you have pressed `F2` to enter edit mode to access the following:

#### Texture Browser (`F4`)

Pressing `F4` opens the texture browser, which lets you apply a texture to your current grid selection. Scroll through the list and click a texture to apply it. You can press `-` to toggle `allfaces`, which controls whether textures apply only to the selected face or to all faces of the selected cubes.

#### Environment Settings (`F5`)

Pressing `F5` opens Environment Settings, where you can configure world lighting, sunlight, fog, skybox layers, cloud layers, and map sound settings.

#### Entities Panel & Placer (`F6` / `Ctrl+E`)

Pressing `F6` opens the Entities panel to create, browse, and edit [entities](Entities) — including lights, [mapmodels](#mapmodels), sounds, particles, triggers, and game objects. Pressing `Ctrl+E` opens the quick Entity placer.

#### Materials Panel (`F7`)

Pressing `F7` opens the Materials panel to choose and apply material volumes, and `Ctrl+M` toggles material volume overlays.

#### Search Actions (`F3`) & Toolbar (`Tab`)

Pressing `F3` in edit mode opens the action search dialog. Pressing `Tab` switches to cursor mode so you can click icons in the editor toolbar directly, and `/help <command>` prints command or variable usage in the console. Moving the cursor to the top edge of the screen, or pressing `Alt` on its own, shows the menu bar, which lists every editor action by name with its key, and `F1` opens the documentation of the Tool panel under the cursor. See [Interface](Interface).

### More on map editing

[Blendmaps](Blendmap) - Overlapping, and blend textures together.
[Waypoints](Waypoints) - Letting bots navigate around the map.
[Entities](Entities) - Managing particles, lighting, game specific objects, and more.
[General FX](Fx) - General effects when map making.
[Particle FX](Fx-Particle) - Using particle effects on map
[Other FX](Fx-Other) - More effects to using on maps.
[Level FX](Fxlevels) - How to increasing performance for users on lower settings.
[Models](Models) - How to import 3D models for use in redeclipse
[Model Editor](Model-Editor) - Lining up a model's attachments and tags while you watch
