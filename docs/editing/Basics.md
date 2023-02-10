---
title: Editing: Basics
layout: docs
origfile: editing/Basics.md
origtitle: Basics
permalink: /docs/editing/Basics
redirect_from:
  - /wiki/editing/Basics/
---
* TOC
{:toc}

Red Eclipse 2 makes use of the Tesseract engine, which utilizes an octree node for its level geometry. This allows for a shallow learning curve where anyone can quickly start making their own maps / levels to share with others. The editor itself is also contained within the game as its own game mode, meaning that you can create an entire map without the need of additional tools/software like most other 3D games. You can also join an online server to edit maps with others in realtime multiplayer map editing. 

----

### Getting Started

To make your first map, you will want to enter the *editing* game mode. This can be done by selecting *editing* from the map selection menu, or alternatively you can type `/edit <mapname>` at the in-game console. 

Once you have loaded the *editing* game mode. You can start a new map, by typing `/newmap`. This gives you an empty world to start from.

Due to the nature of real time editing, you can hop in and out of the edit camera by pressing `F2`. Meaning you are able to run around your map at any time, whilst also able to quickly toggle into edit mode when you want to make changes.

If you wish to save any changes you've made to your map, simply type `/savemap <mapname>`.

----

### The Basics of Cube Manipulation

The level geometry in Red Eclipse 2 is made up of cubes for the most part. They can be easily added or removed from the world with the scroll wheel, whilst using the edit camera. 

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

They appear as translucent cubes, their visibility whilst editing can be toggled from view by pressing `M`.

All available materials can be viewed by pressing `NUMPAD 0`.

| Default Keybind | Command   | Material Name | Description                                          |
| --------------- | --------- | :------------ | ---------------------------------------------------- |
| NUMPAD 1        | `/air`    | Air (none)    | Clears any existing material                         |
| NUMPAD 2        | `/alpha`  | Alpha         | Makes cubes transparent                              |
| NUMPAD 3        | `/water`  | Water         | Makes empty cubes become water                       |
| NUMPAD 4        | `/lava`   | Lava          | Makes empty cubes become lava which kills the player |
| NUMPAD 5        | `/clip`   | Clip          | Stops the player from passing through                |
| NUMPAD 6        | `/noclip` | Noclip        | Allows the player to pass through cubes              |
| NUMPAD 7        | `/aiclip` | AI Clip       | Stops bots from passing through                      |
| NUMPAD 8        | `/death`  | Death         | Kills the player when they enter it                  |
| NUMPAD 9        | `/ladder` | Ladder        | Allows the player to walk vertically upwards         |

----

### Lighting

Red Eclipse 2 supports realtime dynamic lighting. Meaning you can add a light entity to the map and instantly see your changes by moving the light entity around.

To add a new light entity, you can press `E`,`F` to access the entity menu, and select *light*. Or alternatively, you can also type `/newent light` into the console. The entity will appear where your current grid selection is located.

Most importantly, you will want to set the colour and the radius of the light entity. You will see a list of values written above the entity itself. These parameters can be adjusted by their corresponding number, by holding down that key, and scrolling with the mouse, whilst the entity is selected (left click).

| Key/Mouse bind | Parameter |
| -------------- | --------- |
| 1 + SCROLL     | Radius    |
| 2 + SCROLL     | Red       |
| 3 + SCROLL     | Green     |
| 4 + SCROLL     | Blue      |

You can also add some global lighting, by setting the `sunlight` variable. 

This can be adjusted from the *Environment Settings*, accessed by pressing `F3`.

Alternatively, you can type `/sunlight 140 150 160` into the console, to instantly add light to the world. This command takes the values R G B (0-255). 

----

### Remip & calclight

When editing a map, you will often need to `remip` and re-calculate lighting. A `calclight` will optimize the number of polygons used by cube geometry, and will also re-calculate the normal maps of textures.

You can do this by simply running `/calclight` in the console (this command also performs a remip).

----

### Mapmodels

A mapmodel is a polygon mesh that can be placed anywhere without restrictions, they can even intersect cube geometry. These are useful for adding details to a map, where it may be hard or unconvincing to create a certain shape with cube geometry. Pressing `F6` will open up the mapmodel finder, allowing you to quickly find and place a mapmodel.

You can also use the console to add mapmodels to your map, by typing `/newent mapmodel`.

Similar to the light entity, you can hold `1 + SCROLL` to cycle through the mapmodel index.

----

### Helper UI's

Red Eclipse 2 features several helper menus for adjusting various map settings whilst inside the editing mode. Ensure you have pressed `F2` to enter the edit camera to access the following;

#### Texture Browser

Pressing `F1` will open the texture browser, you can use this to apply a texture to your current grid selection. Simply scroll down the list and click on the texture you wish to apply. You can press `-` to toggle the `allfaces` setting, which will dictate whether the texture is applied to a selected cube face, or the entire cube.

#### Environment Settings

These can be accessed by pressing `F3`. Here you can change several things relating to the world lighting, fog, skybox, and ambient lighting.

The above are also accessible from the editing menu, which can be accessed by pressing `E`. 

#### Mapmodel Finder

A menu for finding available mapmodels can be shown by pressing `F6`. Scroll down the list and click to place that model at your active grid selection.

#### The REEE

The *Red Eclipse Editing Encyclopedia*, found within the editing menu (press `E`). This menu displays an alphabetically ordered list of available commands related to editing, along with a description of usage, and the parameters each command expects.

### More on map editing

[Blendmaps](Blendmap) - Overlapping, and blend textures together.
[Waypoints](Waypoints) - Letting bots navigate around the map.
[Entities](Entities) - Managing particles, lighting, game specific objects, and more.
[General FX](Fx) - General effects when map making.
[Particle FX](Fx-Particle) - Using particle effects on map
[Other FX](Fx-Other) - More effects to using on maps.
[Level FX](Fxlevels) - How to increasing performance for users on lower settings.
