---
title: Editing - Interface
layout: docs
origfile: editing/Interface.md
origtitle: Interface
permalink: /docs/editing/Interface
redirect_from:
  - /wiki/editing/Interface/
---
* TOC
{:toc}
The map editor's screen: the menu bar and toolbar, the docks of Tool panels, the selection box and view toggles, action search, help, editor settings and key bindings. Press `F2` to enter or leave edit mode.

Keys here are the default bind preset's. Where the legacy preset differs, it is noted as "legacy"; see [Bind presets](#bind-presets).

## Cursor mode and keyboard

Edit mode starts in cursor mode: the mouse moves a cursor for the toolbar and Tool panels, and edits go where it points.

- `Tab`: switch between cursor mode and mouse look, where the mouse turns the view and edits go to the centre of the screen.
- Right click in cursor mode: a short click opens the context menu of what is under the cursor; holding it looks around. A mouse icon next to the cursor shows when there is a context menu.
- Up, Down, Left, Right and `Return`: move through and pick items in the Tool panel whose title bar is highlighted. With no such Tool panel, `Return` opens chat.
- `Esc`: back out of a Tool panel's keyboard navigation, else cancel the selection. The main menu is on the toolbar and in the **File** menu.
- `F1`: open the documentation of the Tool panel under the cursor, or these editing pages; see [Help](#help).
- `Shift` + wheel over a value: step the value. With **Free value scrolling** on (see [Editor settings](#editor-settings)), the wheel alone steps it.
- Right click on a value: **Copy value**, **Paste value** and **Reset value**.

## Menu bar

The menu bar across the top of the screen holds every editor action by name, with its key beside it. It is hidden until it is needed: rest the cursor on the top edge of the screen in cursor mode, or press and release `Alt` on its own. It slides in, stays while a menu is open, and slides away again when the cursor leaves it, or on another lone `Alt`. While it shows, the toolbar and docks move down under it.

- **File**: start a new map, save, save as, download the map, reload it, Map settings, enlarge and shrink the map, and the main menu.
- **Edit**: undo, redo, copy, paste, flip; apply, get and replace textures; set a material volume; add, delete, link, unlink and unify entities, and the entity snap mode.
- **Select**: focus an axis; select the entities in the selection or the linked ones, deselect, search and cycle entities.
- **View**: cursor mode, the outline and grid views, fullbright, no textures, the material overlay and physics layers, and collapsing either dock.
- **Tools**: every Tool panel, the waypoint actions, recalculating the map, culling textures, new texture slots and decals, Editor settings, Editor bindings and action search.
- **Help**: help for the Tool panel under the cursor (`F1`), each editing page, and action search.

Click a menu's name to open it; with one open, move along the bar to open the others.

## Toolbar

The toolbar runs across the top of the screen. Hover a button for its name, what it does and its key. A button lights up while its Tool panel is open.

Left side:

- **Main menu**: open the main menu.
- **Save**: save the map, `Ctrl+S` (legacy `F8`).
- **Save as**: save the map under a new name, `Ctrl+Shift+S` (legacy `Shift+F8`).
- **Undo**: `Ctrl+Z` (legacy `Z`).
- **Redo**: `Ctrl+Shift+Z` (legacy `O`).
- **Copy**: copy the selection, `Ctrl+C` (legacy `C`).
- **Paste**: paste, `Ctrl+V` (legacy `V`).
- **Search action**: open [action search](#action-search), `F3`.
- **Help**: open these editing pages; see [Help](#help).

Centre, the map button: the map's name, its revision (`r` and a number, [`maprevision`](../variables/Editing#map-values), which goes up with each save) and the variant being edited, Default or Alternate ([`forcemapvariant`](../variables/General#maps)). Click it to open the Map settings Tool panel (`Shift+F5`).

Right side, the panel buttons, each showing its Tool panel in its [dock](#tool-panels); click a lit one to close it, or right click one to move its Tool panel to the other dock:

- **Textures**: `F4` (legacy `Shift+F1`).
- **Blendmap paint**: painting with blend brushes; see [Blendmap](Blendmap).
- **Material volumes**: `F7`.
- **Shapes**: spheres, boxes, terrain and other shapes built over the selection, `Shift+F4`; see [Shapes](Geometry#shapes).
- **Entities**: `F6`.
- **Environment**: `F5`.
- **Map physics**: `Shift+F7`.
- **AI**: waypoints, `Shift+F6`; see [Waypoints](Waypoints). Not available online.
- **Editor settings**: see [Editor settings](#editor-settings).
- **Editor bindings**: see [Editor bindings](#editor-bindings).

## View toggles

The five buttons under the selection box switch view modes; each is lit while its mode is on. Hover one for its key.

- **Outline**: click for the Outline mode popup. `F9` cycles the mode without it.
  - Mode: **None**, **Wireframe** (draw geometry as edges, [`wireframe`](../variables/Editing#edit-view)) or **Outline** (draw the edges over the textures, [`outline`](../variables/Editing#edit-view)).
  - **Outline depth test**: outline only the surfaces in view ([`dtoutline`](../variables/Editing#edit-view)).
  - **Colour**: the outline's colour ([`outlinecolour`](../variables/Editing#edit-view)).
- **Fullbright**: every surface lit evenly ([`fullbright`](../variables/Editing#edit-view)), `B`.
- **No textures**: blank geometry, textures drawn plain white ([`blankgeom`](../variables/Editing#edit-view)).
- **Physics layers**: show physics layers ([`showphyslayers`](../variables/Editing#materials)), `Ctrl+P`.
- **Materials**: click for the Material volume overlay popup. `Ctrl+M` (legacy `M`) turns the overlay on and off without it.
  - **Enable overlay**: show material volumes ([`showmat`](../variables/Editing#materials)).
  - **Substances**, **Clips**, **Other**: which kinds of material the overlay shows.

## Selection and status

- **Selection** box, bottom left, beside the left dock when one is open: the **Grid** size (`G` + wheel, with its size in metres), the selected **Side** as the axis it faces (such as `+Z (top)`), the selection's **Size** in grid cubes and its **Position**. Under **Material volumes** it lists those in the selection, or None, scrolling when there are more than fit; hover one and click its cross to remove it. The box keeps one size whatever it shows.
- Left of it, the axis view, as tall as the selection box: the X (red), Y (green) and Z (blue) axes as the camera sees them. When there is little room between the docks, it moves above the selection box and the view toggles wrap into rows.
- Next to the cursor: while pushing cubes or faces, the count of cubes changed.
- Info bar, bottom right: what an action just did, such as "Undo map edit". How long it stays and whether it chimes are in [Editor settings](#editor-settings).
- Status line, along the bottom, each value named: **Camera** position, **Yaw** and **Pitch**; **Entities** (and how many are selected) and **Waypoints**; map **Triangles** and **Vertices**, each with how much is drawn; **Extra vertices**; **Particles**; and on the right **FPS** and the **Slowest frame**. **Show extended render status** adds octree nodes, vertex arrays, draw calls and occlusion queries.

## Action search

`F3` opens **Search** in the centre. Every editor action has a name, and many Tool panel settings are listed too.

- Type part of a name and the results show as you type. Up to 20 results are shown.
- An action result shows its key in blue and its category: AI, Editor, Entities, Environment, Map, Materials, Physics, Shapes or Textures. A wheel icon and a `+` mean hold the key and turn the mouse wheel.
- A **Go to** result opens the Tool panel holding that setting and flashes it.
- `Return` leaves the text field, then Up and Down pick a result, `Return` runs it and `Esc` closes the search. Clicking a result runs it too.

## Tool panels

Each editor window is a Tool panel. Most open in a dock, a column down the left or right edge of the screen from the toolbar to the status line; action search, Map settings and the Image editor open in the centre.

- Every Tool panel opens in the right dock until you move it. A dock shows one Tool panel at a time; the toolbar's panel buttons switch between them.
- To move a Tool panel to the other dock, click the arrow on its title bar, or right click its panel button. Each remembers its dock between games.
- The down arrow on the title bar collapses the dock to a thin strip with the icon of the Tool panel it holds; click the up arrow or the icon to open it again. Opening a Tool panel in a collapsed dock opens the dock.
- Both docks take the width of the wider one, as far as room allows, so they don't change width as you switch Tool panels.
- A Tool panel opened from inside another, such as Replace texture from Textures, stacks on top of it in the same dock. The back arrow on its title bar goes back to the one under it; the cross closes it.
- A Tool panel's **?** opens its page of this documentation; small **?** links on section headings open that section.
- Loading a map closes every Tool panel.

Keys that open Tool panels:

- `F4`: Textures (legacy `Shift+F1`).
- `F5`: Environment. `Shift+F5`: Map settings.
- `F6`: Entities. `Shift+F6`: AI. `Ctrl+E`: Entities in templates mode.
- `F7`: Material volumes. `Shift+F7`: Map physics.
- `Shift+F4`: Shapes.

The Image editor opens from an image field's right click menu (**Edit image**).

## Help

- `F1`, the toolbar's **Help** button, or **Help** in the Help menu: open the documentation page of the Tool panel under the cursor, at its heading. With no Tool panel under the cursor, or one whose page isn't written yet, it opens these editing pages.
- The **?** on a Tool panel's title bar, and on a section heading, open its page the same way. They only show when the page exists.
- The Help menu lists each editing page, and the Map Editor, under Dev Tools in the main menu, has a **Documentation** button.

## Editor settings

Open it with the toolbar's Editor settings button, or the Tools menu.

Camera:

- **Float speed**, **Fast float speed**: flying speed in edit mode, normally and with `Shift` held.
- **Float coast**: how gradually flying speeds up and slows down; higher drifts longer.
- **Edit FOV**: field of view in edit mode ([`editfov`](../variables/Interface#field-of-view)).

Editing:

- **Undo size (MB)**: memory kept for undo ([`undomegs`](../variables/Editing)).
- **Lock non-multiplayer functionality**: when editing online, turn off the edits other players can't receive, such as adding texture slots, map sounds and waypoints, and refuse an undo too big to send to them rather than undoing it only on your map.
- **Offset selection grid**: draw the selection grid slightly off the surfaces.
- **Default auto-apply during texture edit**: turn on auto-apply while editing a texture variant.
- **Free value scrolling**: the wheel steps values without `Shift`. It can get in the way of scrolling a Tool panel.

Interface:

- **Edit UI scale**: the size of the menu bar, toolbar and Tool panels, 100% to 150%.
- **Edit info length**: how long the info bar stays.
- **Menu bar delay**: how long the cursor rests on the top edge before the menu bar shows, 0.3 seconds by default.
- **Menu bar slide**: how long the menu bar takes to slide in and out, 0.15 seconds by default; 0 shows it at once.
- **Edit info notification sound**: chime when the info bar shows.
- **Show extended render status**: more renderer counts in the status line.

**Editor bindings** at the bottom opens the [Editor bindings](#editor-bindings) Tool panel. The entity selection and editing options are under **More options** in the Entities Tool panel.

## Editor bindings

Every editor action, grouped by category, with its key. Open it with the toolbar's Editor bindings button, from the bottom of Editor settings, or the Tools menu.

- **Preset**: shows the bind preset last applied; click to choose another.
- **Search**: show only the actions whose names contain the text, as you type.
- Each action's key field: click it and press a key, with `Ctrl`, `Alt` or `Shift` if you like, to bind it. An action has one key, and taking a key from another action leaves that action unbound.
- The cross: clear the action's key.
- A wheel icon marks an action you hold while turning the mouse wheel.

The mouse buttons, the wheel, the arrow keys, `Return` and the digits can't be bound here.

### Bind presets

A preset is a set of editor keys. **Default** is what a new player gets; **Legacy** keeps the older keys. Applying a preset sets its own keys and leaves other actions' keys as they are, and it is remembered between games. When a game update changes the legacy preset, the game applies it again once at start, so legacy players get its new keys, and says so in the console.

Legacy differs in these keys:

- Undo `Z`, redo `O`, copy `C`, paste `V`, flip `X`.
- Grab `Shift+C`, snap mode `Ctrl+Shift+C`; focus axis `Shift+X`, `Shift+Y`, `Shift+Z`.
- Apply texture `Y`, get texture `J`, Textures `Shift+F1`, recalculate lighting `F4`.
- Save `F8`, save as `Shift+F8`.
- Material overlay `M`, set material `Ctrl+M`.
- The default keys for applying and getting textures, save, save as and redo (`T`, `Shift+T`, `Ctrl+S`, `Ctrl+Shift+S`, `Ctrl+Shift+Z`) still work under legacy.

## Text fields

Text fields, such as the map's title and description in Map settings or a search box, work the same everywhere in the game.

- Click a field to type in it. It keeps the keyboard wherever the mouse goes, so editor keys don't fire while you type.
- `Return` confirms the text; so do clicking anywhere else and closing the Tool panel. `Esc` puts the text back as it was.
- `Tab` confirms and moves to the next field in the Tool panel, `Shift+Tab` to the one before.
- Text longer than its field scrolls inside it to follow the cursor; a field several lines tall wraps its text and scrolls with the mouse wheel.
- `Shift` with the arrows, `Home` or `End`, or with a click, selects text. Double click selects a word, triple click the whole line.
- `Ctrl+A` selects all, `Ctrl+C` copies, `Ctrl+X` cuts and `Ctrl+V` pastes, through the system clipboard.
- `Ctrl+Z` undoes and `Ctrl+Y` or `Ctrl+Shift+Z` redoes, in the field you're typing in, not the map.
- `Ctrl` with the left and right arrows moves a word at a time; with `Backspace` or `Delete` it deletes a word.
- On macOS, use `Cmd` where these say `Ctrl`, and `Alt` to move or delete a word.

## Console

The console (`` ` `` or `/`) runs any editor command or variable. Type a name and a box under the input line shows its type, range, current and default value, usage and description. Every variable is listed in [Variables](../variables/).
