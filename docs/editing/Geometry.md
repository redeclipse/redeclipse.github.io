---
title: Editing - Geometry
layout: docs
origfile: editing/Geometry.md
origtitle: Geometry
permalink: /docs/editing/Geometry
redirect_from:
  - /wiki/editing/Geometry/
---
* TOC
{:toc}
A map's geometry is cubes on a grid: select some, then extrude, carve, push, rotate, flip, move, copy and paste them. Press `F2` to enter or leave edit mode, and [`newmap`](../variables/Editing) gives an empty world to try things on.

Keys here are the default bind preset's. Where the legacy preset differs, it is noted as "legacy"; see [Bind presets](Interface#bind-presets). Most edits act on the selection and work only while it is in view; otherwise the console says "Selection not in view".

## Selecting

Edit mode starts in cursor mode, so the editor works on whatever the mouse cursor points at; in mouse look (`Tab`) it works on the centre of the screen. With nothing selected, the cube under the cursor is outlined: that cube, at the current grid size, is what the keys below act on.

- Left click: select the cube under the cursor. Drag to select an area of cubes on the face you started on.
- `Shift` + left click, or `Shift` + right click: extend the selection to take in the cube clicked, turning it to the side clicked. In mouse look a right click does this without `Shift`; in cursor mode a right click opens the context menu of an entity under the cursor and, held, looks around.
- Middle click and drag: select corners instead of whole cubes, down to half a cube, for [pushing](#pushing-faces-and-corners).
- `Space` or `Esc`: cancel the selection, and stop moving entities.
- Hold left `Ctrl`: select through the selection and entities, to reach the cubes behind them. It also shows the [paste preview](#copy-and-paste).

The selection always has one side, the face the edits push from: the side you started on, shown as **Side** in the selection box (see [Selection and status](Interface#selection-and-status)).

- `X`, `Y`, `Z`: turn the selection to its side on that axis, and press again for the opposite side (legacy `Shift+X`, `Shift+Y`, `Shift+Z`). While moving the selection or entities, they keep the move to that axis instead, and a second press frees it.
- `;` + wheel: step the selection through its six sides.

## The grid

Every cube is a power of two in size. The grid size is the size of cube you select and edit, from 1 unit (gridpower 0) to 4096 (gridpower 12); 16 units is one metre.

- `G` + wheel: grid size ([`gridpower`](../variables/Editing)). Changing it drops the selection, as a selection is made of cubes of one size.
- `Alt+G`: cycle the grid drawn over surfaces: the paste grid with the paste preview, a grid around the cursor, a grid around the selection box, or none.

## Extruding and carving

The mouse wheel, with no key held, adds or removes a layer of cubes on the selected side.

- Wheel down: extrude, adding a layer of cubes out from the selected side. The selection moves out with the new face.
- Wheel up: carve, removing the layer of cubes behind the selected side. The selection moves in with it.
- `Shift` + wheel: the same, but the selection grows over the new cubes, or shrinks as they go, rather than moving. This is the quick way to select a block: extrude it with `Shift` held.
- Next to the cursor, **Edit cubes** counts the layers added (negative) or removed since the selection was made.

## Pushing faces and corners

A cube's faces can be pushed in, in eighths of the cube, to make slopes, ramps and wedges. These keys are held while turning the wheel; wheel up pushes in and wheel down pulls back out.

- `F` + wheel: push the selected side of every cube in the selection. With corners selected (middle drag), only those corners move.
- `Q` + wheel: push one corner, the corner of the cube nearest the cursor, on every cube in the selection.
- Next to the cursor, **Cut face** shows how far, in eighths, the face has been pushed.

A push that would bend a cube out of shape is left out, or only the part that keeps it whole is made.

## Moving

- `C` (default preset; legacy `Shift+C`): grab. Point at the selection and press it, and the selection box follows the mouse along the surface it lies on until you left click. The cubes stay where they are: grabbing moves the box, ready to select somewhere else of the same size. With entities selected it moves them instead.
- `Alt+C`: grab as `C` does, adding every entity under the cursor to the entities moved, not only the first.
- `U` (hold): cut. Point at the selection and hold it, and the selected cubes and entities move with the mouse, landing where the selection is when you let go.
- While moving, the wheel moves the selection or entities out and in along its side, and `X`, `Y` or `Z` keeps the move to that axis.
- Grab and cut need the cursor on the selection when you press the key.

## Rotating and flipping

Both turn the contents of the selection around the axis of its selected side, and turn and flip the selected entities with them.

- `R` + wheel: rotate the selection a quarter turn per notch ([`rotate`](../variables/Editing)). A selection that isn't square is made square first, taking in more cubes on its shorter side.
- `Ctrl+X`: flip the selection, mirroring it across its selected side ([`flip`](../variables/Editing)). Legacy `X`.

## Copy and paste

A copy fills the paste buffer, which keeps it across maps until the next copy.

- `Ctrl+C`: copy the selected cubes, with the selected entities ([`copy`](../variables/Editing)). Legacy `C`.
- `Ctrl+V`: paste. Hold it to see where the paste will go, and let go to paste ([`paste`](../variables/Editing)). Legacy `V`.
- The toolbar's **Copy** and **Paste** buttons do the same, the Paste button pasting at once at the selection.

Holding `Ctrl`, or the paste key, shows the paste preview: the copy drawn see-through at the spot it would land, with a box around it.

- With no selection, the preview follows the cursor, and the paste lands with its corner on the cube under the cursor.
- With a selection, the paste lands with its corner on the selection's.
- Pasting at another grid size scales the copy to it, so a copy made at gridpower 4 and pasted at gridpower 3 comes out half the size.
- A paste replaces whatever was in its box, empty cubes included.
- With only entities selected and no cubes, copy takes the selected entity, and paste sets the selected entities to it, or adds it at the selection when none are selected.
- `pastepreview 0` in the console turns the preview off and leaves only the box.

Selections can also be saved to file and loaded back as prefabs, with [`saveprefab`](../variables/Editing) and [`copyprefab`](../variables/Editing), which loads one into the paste buffer.

## Undo and redo

- `Ctrl+Z`: undo ([`undo`](../variables/Editing)). Legacy `Z`.
- `Ctrl+Shift+Z`: redo ([`redo`](../variables/Editing)). Legacy `O`, and `Ctrl+Shift+Z` still works.
- The toolbar's **Undo** and **Redo** buttons do the same, and the info bar says what was undone, a map edit or an entity edit.

An undo step covers every change made to the same selection in a row. Each notch of extruding moves the selection, so each is its own step, but a run of pushes, rotations and flips on one selection undoes all at once. Undo selects the area it changed. How much is kept is set by **Undo size** in [Editor settings](Interface#editor-settings) ([`undomegs`](../variables/Editing)).

## Deleting

- `Backspace`: delete the selected entities, or with none selected, empty the selected cubes.
- `Delete`: delete the selected entities.

## Heightmaps

Heightmap mode shapes terrain with a brush, pushing the corners of the cubes under it rather than whole faces.

- `H`: heightmap mode, on or off. `P` and left `Alt` also turn it off.
- Wheel: raise (down) or lower (up) the surface under the brush.
- `K` + wheel: choose the brush; its name is shown in the console.
- Middle click a surface: add its texture to the textures the brush changes, or take it away again. With none chosen, or with a selection, the brush changes any surface.

## Shapes

A shape is geometry worked out from a formula, such as a sphere, a cone or terrain from a heightmap image, and built over the selection in one go. Open the Shapes Tool panel with `Shift+F4`, its toolbar button or **Tools** in the menu bar, choose a shape and its size, and press **Build**.

- The shape starts at the selection's corner, the one nearest the world's origin, and sizes are in cubes of the current grid size. The selection grows to the box the shape is built in, which the panel shows under **Detail**.
- **Add** joins the shape to the geometry already there, which is kept, and **Carve** cuts the shape out of it, like a carving wheel turn in that shape: build a box, then carve a cylinder through it for a doorway.
- **Detail** halves the cubes the surface passes through that many times, so the surface is smoother without filling the inside with small cubes. Big shapes are cheapest built at a large grid size with some detail.
- **Offset** moves the shape inside its box, so it can sit part way into the selection, and a sphere's **Stretch** makes it longer along an axis, an ellipsoid.
- New faces take the texture last applied, as extruding does.
- One undo takes the whole shape back. A shape whose box is too big for **Undo size** in [Editor settings](Interface#editor-settings) isn't built: raise it, or use a larger grid size.
- A box holds at most 2048 cubes on a side and 1048576 in all. Its **Build** button is grey while a shape can't be built, and its tip says why.

The shapes, and their commands, which take the same sizes followed by the detail, the offset and `1` to carve:

- Sphere ([`buildsphere`](../variables/Editing#shapes), or [`buildellipsoid`](../variables/Editing#shapes)): radius and stretch.
- Cylinder ([`buildcylinder`](../variables/Editing#shapes)): radius and height, standing upright.
- Tunnel ([`buildtunnel`](../variables/Editing#shapes)): a block with an arched passage through it along Y, by radius and length.
- Pipe bend ([`buildpipebend`](../variables/Editing#shapes)) and torus ([`buildtorus`](../variables/Editing#shapes)): the radius of the bend or ring, and of the pipe.
- Paraboloid ([`buildparaboloid`](../variables/Editing#shapes)): a dome as wide as its box at the bottom.
- Octahedron ([`buildoctahedron`](../variables/Editing#shapes)): an eight-sided diamond.
- Helix ([`buildhelix`](../variables/Editing#shapes)): a coil around Z, by the radius of its tube and of its coil.
- Box ([`buildbox`](../variables/Editing#shapes)): three sizes and a rounding of its edges and corners.
- Cone ([`buildcone`](../variables/Editing#shapes)): radius and height, standing on its base.

### Terrain from a heightmap

**Build terrain** raises ground from a greyscale image ([`buildterrain`](../variables/Editing#shapes)): each pixel is the height of a corner of a column of cubes, brighter being higher, up to **Height** cubes for white. The terrain is one cube smaller than the image on each side, so an image of 65 by 65 pixels makes terrain 64 cubes across. Typed in the console, the image is named with its extension, such as `buildterrain mymap/height.png 16`.

### Importing cubes

**Import** reads an SMC file, a list of cubes made by a marching cubes tool outside the game ([`importsmc`](../variables/Editing#shapes)). Each line is a cube, `x y z size` from the selection's corner followed by the densities of its eight corners, negative inside. **Solid cubes** makes each listed cube solid instead. Lines that aren't cubes inside the world are skipped and counted in the console.

### Editing online

Shapes, terrain, imports and heightmap strokes reach the other players in the session. A very large one is sent a part at a time, so they may see it arrive over a few moments, and one too big to send at all is taken back, saying so in the console.

The server limits how fast each player's edits may arrive ([`editcost`](../variables/Server)), so the game sends large edits and many quick ones a little at a time to stay within it. An edit over a selection holding more cubes than that allows at once (1048576 at the server's defaults, counted at the selection's grid size) is refused online, saying so in the console: select a larger grid size, or edit it in parts. A copy too big to send, such as a large prefab, can't be pasted online either.

Commands that change the whole map, such as shrinking it or culling texture slots, reach everyone in the order the server gets them. An edit another player made just before, still on its way, lands where the map was, so run them while nobody else is in the middle of an edit.

Two players placing new entities at the same moment can each take the same slot, and each ends up with the other's entity in place of their own. Check entities placed together with someone else, and place again any that went missing.

## Keys

| Key | Action |
| :--- | :--- |
| Left click | Select a cube; drag to select an area |
| `Shift` + left or right click | Extend the selection to the cube clicked |
| Right click (mouse look) | Extend the selection to the cube clicked |
| Middle click | Select corners; in heightmap mode, choose brush textures |
| `Space` | Cancel the selection |
| Left `Ctrl` (hold) | Select through the selection and entities; show the paste preview |
| Wheel | Carve (up) or extrude (down) on the selected side |
| `Shift` + wheel | Carve or extrude, keeping the selection over the cubes |
| `G` + wheel | Grid size |
| `Alt+G` | Cycle the grid drawn over surfaces |
| `F` + wheel | Push the selected side, or the selected corners |
| `Q` + wheel | Push the corner nearest the cursor on every selected cube |
| `R` + wheel | Rotate the selection |
| `;` + wheel | Step through the selection's sides |
| `X`, `Y`, `Z` | Turn the selection to that axis's side; keep a move to that axis (legacy `Shift+X`, `Shift+Y`, `Shift+Z`) |
| `Ctrl+X` | Flip the selection (legacy `X`) |
| `C` | Grab: move the selection box, or the selected entities (legacy `Shift+C`) |
| `Alt+C` | Grab, with every entity under the cursor |
| `U` (hold) | Cut: move the selected cubes and entities |
| `Ctrl+C` | Copy (legacy `C`) |
| `Ctrl+V` | Paste; hold for the preview (legacy `V`) |
| `Ctrl+Z` | Undo (legacy `Z`) |
| `Ctrl+Shift+Z` | Redo (legacy `O`) |
| `Backspace` | Delete the selected entities, else empty the selected cubes |
| `H` | Heightmap mode |
| `K` + wheel | Heightmap brush |
| `Shift+F4` | Shapes Tool panel |
| `-` | Texture every face of the selected cubes, or only the selected side ([`allfaces`](../variables/Editing)) |
| `B` | Fullbright |
| `F9` | Cycle the outline mode |

The keys of editor actions, such as grab, flip and the wheel keys `G`, `F`, `Q`, `R` and `;`, can be changed in the [Editor bindings](Interface#editor-bindings) Tool panel. The others, such as the mouse buttons, `Space`, `Backspace`, `H`, `K` and `-`, are set in the console with `editbind`.
