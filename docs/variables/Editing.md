---
title: Variables - Editing
layout: docs
origfile: variables/Editing.md
origtitle: Editing
permalink: /docs/variables/Editing
redirect_from:
  - /wiki/variables/Editing/
---
* TOC
{:toc}
Editing maps: entities, the map's settings, its lighting and sky, textures and materials.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `editing` | returns 1 if editing, 0 otherwise | - |
| `edittoggle` | toggles editing mode (only possible in edit mode) | - |
| `newent` | creates a new entity with the specified attributes:<br>e.g. '/newent light 128 0 0 200' for blue light with r=128<br>available types:<br>actor affinity checkpoint<br>decal envmap light<br>lightfx mapmodel particles<br>playerstart pusher route<br>sound teleport trigger<br>weapon unused | `type attributes` |
| `entattr` | sets the specified entity attribute to the given value | `index value` |
| `entset` | sets type and properties of the currently selected entity | `type properties..` |
| `entfind` | selects all entities of a specific type and optionally with<br>specific properties, using "1" as type selects all entities | `type properties..` |
| `entfindinsel` | selects all entities, within the selected area,<br>of a specific type and optionally with specific properties,<br>using "1" as type selects all entities | `type properties..` |
| `entcancel` | deselects all entities while leaving area selected | - |
| `entlink` | links two linkable entities (teleporter, light/lightfx) together;<br>use multiple executions to loop through possible<br>linking methods | - |
| `entunlink` | removes entities from their link chains | - |
| `entselradius` | determines size of selection cube for point entities<br>(e.g. lights, sounds) | `radius` |
| `entseldecalbox` | toggles between decal bounding box being the entire decal or<br>just the entity point | `boolean` |
| `entselmapmodelbox` | toggles between mapmodel bounding box being the entire model<br>or just the entity point | `boolean` |
| `envmapradius` | sets the default radius of environment map entities with<br>unspecified radii | `radius` |
| `envmapbb` | toggles interpretation of environment map entities as spherical<br>(envmapbb = 0) or cubical (envmapbb = 1) | `toggle` |
| `gettex` | picks up the texture from the face currently selected,<br>note that allfaces must be turned off | - |
| `replace` | repeats the last texture change across the entire map,<br>note that allfaces must be turned off | - |
| `texturecull` | removes all textures not used in the map from the map config file | - |
| `texturerehash` | adds previously culled textures back to map config file | - |
| `flip` | flips the selected geometry across selected face | - |
| `rotate` | rotates the selected geometry about axis normal to selected face,<br>in units of 90 degrees | - |
| `copy` | copies the selected geometry to the clipboard | - |
| `paste` | pastes the selected geometry from the clipboard | - |
| `saveprefab` | saves the current geometry selection to a prefab file<br>(does not faithfully copy textures) | `name` |
| `copyprefab` | loads a prefab file onto the clipboard, to be pasted with /paste | `name` |
| `grassanimmillis` | sets the length of a gust of wind through the grass | `milliseconds` |
| `grassanimscale` | sets how far the wind bends the grass | `value` |
| `grassdensityscale` | sets the share of grass blades drawn, widening them to cover the same ground | `value` |
| `grassshadow` | toggles shadows cast by grass, static or animated as the map chooses | `boolean` |
| `grassdist` | sets the distance at which grass becomes visible | `value` |
| `grasstrample` | sets whether players, bots and other actors press down the grass they walk through | `value` |
| `grassthin` | sets the share of the grass distance beyond which grass blades start to thin out | `value` |
| `grassthinmin` | sets the share of grass blades left at the grass distance, widened to cover the same ground | `value` |
| `grasslodmesh` | sets the share of the grass distance beyond which grass blades use fewer triangles | `value` |
| `grasspixelsfull` | sets how tall on screen grass blades are when they are drawn at full density | `pixels` |
| `grasspixelsthin` | sets how tall on screen grass blades are when they thin out the most, widened to cover the same ground | `pixels` |
| `grassstalkpixels` | sets how wide on screen the stalks of grass heads are when they use every point of their shape | `pixels` |
| `grassstalkpixelshalf` | sets how wide on screen the stalks of grass heads are when they use every second point of their shape, below which they use every fourth | `pixels` |
| `lodmodels` | turns on using simpler versions of models when they are small on screen | `boolean` |
| `lodmodelshadow` | sets how many levels simpler map models are in shadows than they are on screen | `value` |
| `lodmodelscale` | sets how large models count as on screen when choosing their detail, higher keeps detail further away | `value` |
| `mdllod` | sets a simpler version of the model to use beyond this distance at 1080p, and nearer or further at other views | `name distance` |
| `mdllodpixels` | sets a simpler version of the model to use when it is narrower on screen than this many pixels | `name pixels` |
| `modeleditor` | opens the Model Editor, on the given host model when given one | `[model]` |
| `modeledithost` | sets the Model Editor's host model, kept for next time | `model` |
| `modeleditattached` | sets the models the Model Editor attaches to its host, as pairs of model and tag, kept for next time | `list` |
| `modeleditanim` | sets the animation the Model Editor shows its host model in, every frame when empty | `name` |
| `modeleditfile` | sets the file in your home folder the Model Editor saves to | `file` |
| `modeleditsave` | saves the placement and tags of each model listed, as the lines of their configs, to a file in your home folder (modeleditfile when none is given) | `file models` |
| `grassheadlodpixels` | sets how wide on screen grass heads are when they start to use fewer points, using a quarter of them at a third of this | `pixels` |
| `grassheadpixels` | sets how wide on screen grass heads are when they stop being drawn | `pixels` |
| `grassleafpixels` | sets how long on screen the leaves on the stalks of grass heads are when they stop being drawn | `pixels` |
| `grassshadowdist` | sets the distance from the camera within which grass casts shadows | `value` |
| `calclight` | recalculate normal map interpolation and remip geometry to<br>optimize vertex/poly counts | - |
| `fixinsidefaces` | replace all inside faces of cubes not renderable with a single<br>texture (defaults to newmap texture) to reduce redundant<br>octree nodes and texslot count | `vslot` |
| `selectbrush` | select a different brush with relative index to the current one:<br>-1 = previous brush<br>1 = next brush | `index` |
| `blendbrushcolour` | display colour for the blendbrush wand | `colour` |
| `blendpaintmode` | action the blendbrush takes:<br>0 (off), 1 (merge), 2 (erase), 3 (overwrite),<br>4 (inverted merge), 5 (inverted erase), 6 (inverted overwrite) | `value` |
| `clearblendmap` | clears the blend map texture from the current map | - |
| `blendbrushreach` | how far behind the aimed surface the blend brush can still paint;<br>the brush is projected from the camera onto everything it falls on,<br>and this keeps paint from falling past a ledge | `units` |
| `blendbrushscale` | scales the blend brush: each brush pixel covers this times 2 units,<br>Shift and the mouse wheel step it by 0.125 in paint mode | `scale` |
| `pruneblendmap` | removes blend map paint that no surface shows, as saving the map does | - |
| `clearblendmapsel` | clears the blend map paint on the surfaces in the selection | - |
| `invertblendmapsel` | inverts the blend map paint on the surfaces in the selection | - |
| `moveblendmap` | moves the blend map paint by an offset, in multiples of 32 units | `x y z` |
| `dropwaypoints` | determines if waypoints are dropped by players in game,<br>0 = no waypoints are dropped,<br>1 = limited number of waypoints are dropped | `value` |
| `showwaypoints` | toggles the visibility of the path that connects waypoints,<br>waypoints are always visible if they are being dropped | `value` |
| `savewaypoints` | saves a .wpt file containing the current maps waypoints,<br>if no argument is given it uses the current map's name | `[name]` |
| `loadwaypoints` | loads a .wpt file containing waypoints, if no argument is given<br>it loads a waypoint file matching the current map's name | `[name]` |
| `delselwaypoints` | delete the waypoints in the currently selected area | - |
| `lerpangle` | sets the maximum mergable angle for linear interpolation<br>of normals and lightmaps | `angle` |
| `lerpsubdiv` | number of sampling points for linear interpolation,<br>as a power of two | `value` |
| `lerpsubdivsize` | minimum grid power the linear interpolation will divide | `value` |
| `maxmerge` | maximum gridpower the remipper can use to simplify geometry | `value` |
| `entitysurf` | toggles movement of camera with movement of selected entities | `boolean` |
| `selectionsurf` | toggles movement of camera with the movement of selection face | `boolean` |
| `allfaces` | toggles texturing of all six faces of geometry cubes (1)<br>or just the selected face (0) | `boolean` |
| `gridpower` | sets the cube size (in powers of 2) of the cursor | `value` |
| `minimapheight` | sets the height (in power 0 cubes) of the minimap above<br>the bottom of the map | `value` |
| `remip` | recalculate the geometry of the map to reduce amount of<br>level geometry | - |
| `recalc` | recalculate prerendered level assets, such as the minimap and environment maps | - |
| `undo` | undoes the last edit command; may require having operated<br>object in the current field of view<br>Return values:<br>1 = world edit<br>2 = entity edit | - |
| `redo` | redoes the last undone edit command<br>Return values:<br>1 = world edit<br>2 = entity edit | - |
| `undomegs` | number of megabytes to allocate to the undo cache | `value` |
| `lse` | returns a list of entities and the quantity of selected entities | - |
| `mapsound` | adds a map sound slot for sound entities to play, returning its index; streamed (0 or 1) reads the file as it plays rather than holding it all in memory, which suits long files such as songs | `file gain pitch rolloff refdist maxdist variants streamed` |
| `mapsoundstream` | sets whether the map sound slot at index is streamed, read as it plays rather than held whole in memory, or returns it if no value is given | `index value` |
| `mapsoundinfo` | returns number of mapsound slots used in the current map when supplied index = -1, otherwise returns path to the sound on the slot provided by the index | `index` |

## Shapes

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `buildsphere` | builds a sphere over the selection from its corner, sizes in cubes of the grid size; detail halves the cubes its surface crosses that many times, the offset moves it in its box, the scales stretch it along each axis, and carve 1 cuts it out of the geometry instead of adding it | `radius` `detail` `offx` `offy` `offz` `scalex` `scaley` `scalez` `carve` |
| `buildellipsoid` | the same as buildsphere, for a sphere stretched by its scales | `radius` `detail` `offx` `offy` `offz` `scalex` `scaley` `scalez` `carve` |
| `buildcylinder` | builds an upright cylinder over the selection, as buildsphere does | `radius` `height` `detail` `offx` `offy` `offz` `carve` |
| `buildtunnel` | builds a block with an arched passage through it along Y over the selection, as buildsphere does | `radius` `length` `detail` `offx` `offy` `offz` `carve` |
| `buildpipebend` | builds a quarter bend of pipe with straight ends over the selection, as buildsphere does | `radius` `piperadius` `detail` `offx` `offy` `offz` `carve` |
| `buildtorus` | builds a flat ring over the selection, as buildsphere does | `radius` `tuberadius` `detail` `offx` `offy` `offz` `carve` |
| `buildparaboloid` | builds a dome as wide as its box at the bottom over the selection, as buildsphere does | `radius` `detail` `offx` `offy` `offz` `carve` |
| `buildoctahedron` | builds an eight-sided diamond over the selection, as buildsphere does | `radius` `detail` `offx` `offy` `offz` `carve` |
| `buildhelix` | builds a coil around Z over the selection, as buildsphere does | `tuberadius` `coilradius` `detail` `carve` |
| `buildbox` | builds a box with its edges and corners rounded over the selection, as buildsphere does | `sizex` `sizey` `sizez` `rounding` `detail` `offx` `offy` `offz` `carve` |
| `buildcone` | builds a cone standing on its base over the selection, as buildsphere does | `radius` `height` `detail` `offx` `offy` `offz` `carve` |
| `buildterrain` | builds terrain from a greyscale heightmap image over the selection, one cube smaller than the image on each side, brighter being higher up to height cubes; name the image with its extension | `image` `height` `carve` |
| `importsmc` | imports an SMC file of cubes from the selection's corner, a line per cube of x y z size and its eight corner densities, negative inside; voxel 1 makes each listed cube solid instead | `file` `voxel` |
| `shapeproblem` | returns why a shape whose box is x y z cubes can't be built at the selection now, or nothing when it can | `x` `y` `z` |

## Map settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `maptitle` | sets the title message of the map | `text` |
| `mapmsg` | sets the title message of the map (alias for maptitle) | `text` |
| `mapauthor` | sets the author message of the map | `text` |
| `mapdesc` | sets the description string of the map | `text` |
| `mapenlarge` | enlarges the map to twice the size (does not center) | `text` |
| `mapfile` | path to map .mpz file | `path` |
| `mapname` | path to map file | `path` |
| `savemap` | saves the current map as "mapname.mpz" in the homedir | `map` |
| `shrinkmap` | shrinks the map size to smallest cubed area,<br>only empty space outside of the map will be removed;<br>it clears the undo history | - |
| `sendmap` | manually sends map to the server; not in edit mode, where other players send it when needed | - |
| `getmap` | manually retrieves map from the server, or in edit mode from another player | - |
| `newmap` | create new map with the specified gridpower and name | `size, name` |
| `decalreset` | deletes all decal indices from map config file (including ones in use) | - |
| `routenames` | sets the routenames for speedrun mode (list of names) | `text` |
| `routecolours` | sets the routecolours for speedrun mode (list of hexcolours) | `text` |

## Visual settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `showentdir` | show the direction of playerstarts and actors:<br>0 = off<br>1 = only selected<br>2 = always when editing<br>3 = always in editmode | `value` |
| `editcursorblend` | sets the opacity of the crosshair while in editing<br>0 = transparent<br>1 = opaque | `value` |
| `editcursorsize` | sets the size of the crosshair while in editing | `value` |
| `editcursor` | sets the shape of the crosshair while in editing | `string` |
| `editmatblend` | sets the opacity of material volumes (when showmat 1 is enabled)<br>0 = transparent<br>1 = opaque | `value` |
| `editmatscale` | sets the colour saturation of material volumes<br>0 = black<br>1 = oversaturated | `value` |

## World settings

Add `alt` to the end of these for the alternate map variant (`mapvariant 2`).

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `envlayer[alt]` | sets the level's env layer to the specified file | `path` |
| `skycolour[alt]` | changes the colour of the skybox | `hexcolour` |
| `skybox[alt]` | loads a set of 6 images into the level's skybox associated by name from the specified basepath;<br>e.g. "skyboxes/gradient" will load gradient_{up,dn,lf,rt,bk,ft}.{png,jpg} | `basepath` |
| `cloudbox[alt]` | loads a set of 6 images into the level's cloudbox associated<br>by name from the specified basepath;<br>e.g. "skyboxes/gradient"<br>will load gradient_{up,dn,lf,rt,bk,ft}.{png,jpg} | `path` |
| `cloudlayer[alt]` | sets the level's cloud layer to the specified file | `path` |
| `cloudheight[alt]` | set cloud placement;<br>-1 = bottom of the skybox<br>1 = top of the skybox | `value` |
| `cloudscale[alt]` | controls the scale of the cloud layer | `value` |
| `cloudscrollx[alt]` | controls the movement speed of the cloud layer on the x axis | `value` |
| `cloudscrolly[alt]` | controls the movement speed of the cloud layer on the y axis | `value` |
| `cloudlayercolour[alt]` | controls the colour of the cloud layer | `hexcolour` |
| `cloudfade[alt]` | controls how the cloud layer fades around the edges | `value` |
| `cloudsubdiv[alt]` | sets the cloud layer subdivision size (number of vertices) | `value` |
| `cloudblend[alt]` | sets the opacity of the cloud layer | `value` |
| `skylight[alt]` | set colour and brightness of a uniform downwards-facing<br>lightsource spanning the whole sky | `value` |
| `sunlight[alt]` | set colour and brightness of an infinitely far away point<br>light source from the sky | - |
| `sunlightyaw[alt]` | yaw angle (horizontal orientation) of the sunlight light source | `angle` |
| `sunlightpitch[alt]` | angle of incidence of the sunlight light source from the horizontal<br>plane (90 is vertical) | `angle` |
| `ambient[alt]` | set colour and brightness of a uniform ambient light throughout<br>the whole map | `value` |
| `fog[alt]` | set fade distance of map fog | `value` |
| `fogcolour[alt]` | set colour of map fog | `value` |
| `fogdomecap[alt]` | toggles enclosement of the bottom of the fogdome | `boolean` |
| `fogdomeclip[alt]` | sets the size at which to cut off the fogdome | `value` |
| `fogdomeclouds[alt]` | toggles whether clouds are blocked by the fogdome | `boolean` |
| `fogdomecolour[alt]` | sets the colour of the fogdome | `colour` |
| `fogdomeheight[alt]` | sets the height to which the fogdome is centered | `value` |
| `fogdomemax[alt]` | sets the maximum opacity of the fogdome | `value` |
| `fogdomemin[alt]` | sets the minimum opacity of the fogdome | `value` |
| `yawsky[alt]` | set yaw angle (horizontal orientation) of the skybox | `angle` |
| `pitchsky[alt]` | set pitch angle (y axis orientation) of the skybox | `angle` |
| `rollsky[alt]` | set yaw angle (x axis orientation) of the skybox | `angle` |
| `yawcloudlayer[alt]` | set yaw angle (horizontal orientation) of the cloud layer | `angle` |
| `yawclouds[alt]` | set yaw angle (horizontal orientation) of the cloudbox layer | `angle` |
| `pitchclouds[alt]` | set pitch angle (y axis orientation) of the cloudbox layer | `angle` |
| `rollclouds[alt]` | set yaw angle (x axis orientation) of the cloudbox layer | `angle` |
| `yawenvlayer[alt]` | set yaw angle (horizontal orientation) of the env layer | `angle` |
| `envlayerblend[alt]` | sets the opacity of the env layer | `value` |
| `envlayercolour[alt]` | sets the colour of the env layer | `colour` |
| `spinsky[alt]` | sets the z axis rotation speed of the skybox, in degrees per second | `value` |
| `spinskypitch[alt]` | sets the y axis rotation speed of the skybox, in degrees per second | `value` |
| `spinskyroll[alt]` | sets the x axis rotation speed of the skybox, in degrees per second | `value` |
| `spincloudlayer[alt]` | sets the rotation speed of the cloud layer, in degrees per second | `value` |
| `spinclouds[alt]` | sets the z axis rotation speed of the cloudbox, in degrees per second | `value` |
| `spincloudspitch[alt]` | sets the y axis rotation speed of the cloudbox, in degrees per second | `value` |
| `spincloudsroll[alt]` | sets the x axis rotation speed of the cloudbox, in degrees per second | `value` |
| `spinenvlayer[alt]` | sets the rotation speed of the env layer, in degrees per second | `value` |
| `ambientscale[alt]` | sets the brightness factor for the ambient colour | `value` |
| `gidist[alt]` | sets the global illumination distance for the map | `value` |
| `giscale[alt]` | sets the global illumination scale for the map | `value` |
| `aodark[alt]` | sets the darkness of ambient obscurance (corner darkening)<br>for the map | `value` |
| `aomin[alt]` | sets the floor for ambient obscurance darkness (1 = no AO) | `value` |
| `aoradius[alt]` | sets the radius for ambient obscurance disk area | `value` |
| `aosun[alt]` | toggles if sunlit areas are subject to ambient obscurance | - |

## Atmosphere

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `atmo[alt]` | sets mode of atmo-type skybox:<br>0: off<br>1: in front of skybox<br>2: behind skybox | `mode` |
| `atmoblend[alt]` | sets opacity of atmo effect (0: skybox only; 1: atmo only) | `value` |
| `atmobright[alt]` | sets brightness of atmo effect | `value` |
| `atmodensity[alt]` | sets ability of light to penetrate whole sky (higher values<br>mean a darker sky) | `value` |
| `atmodisk[alt]` | sets color of light disk in the sky | `value` |
| `atmodiskbright[alt]` | sets brightness of light disk in sky | `value` |
| `atmodisksize[alt]` | sets diameter of light disk in sky | `size` |
| `atmohaze[alt]` | sets haze scale (how much light disk scatters in sky) | `value` |
| `atmoheight[alt]` | sets thickness of atmosphere | `value` |
| `atmolight[alt]` | sets tint of whole atmo sky | `value` |
| `atmolightscale[alt]` | sets lightscale of whole atmo sky | `value` |
| `atmoplanetsize[alt]` | sets sharpness of haze below horizon | `value` |

## Wind

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `windyaw[alt]` | sets yaw angle (horizontal orientation) of the global wind | `angle` |
| `windspeed[alt]` | sets the strength of the global wind | `value` |
| `windinterval[alt]` | sets the period interval of the global wind | `milliseconds` |
| `windanimdistbias` | adds to windanimdist on this map, so wind animations are drawn further away | `value` |

## Edit view

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `fullbright` | hides lightmap for all textures if enabled | `boolean` |
| `dtoutline` | edit outline only outlines visible surfaces when enabled;<br>when disabled, all rendered geometry is outlined | `boolean` |
| `wireframe` | renders geometry using edges rather than faces | `boolean` |
| `outline` | renders lines on geometry edges if enabled | `boolean` |
| `outlinecolour` | colour to render the geometry outline with | `colour` |
| `changeoutline` | changes the outline colour by moving through the<br>outlinecolours list 'index' number of times:<br>Entries:<br>255 255 255 white<br>000 000 000 black<br>000 127 255 teal<br>255 080 080 salmon<br>255 000 255 magenta<br>080 255 080 green<br>255 255 080 yellow<br>off | `index` |
| `blankgeom` | renders geometry with blank white diffuse maps if enabled | `boolean` |
| `crosshairdistance` | shows distance to geometry at cursor (in metres) if enabled | `boolean` |
| `crosshairdistancex` | x offset for crosshair distance readout | `value` |
| `crosshairdistancey` | y offset for crosshair distance readout | `value` |

## Texture slots

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `voffset` | replaces texture with one offset by the given number<br>(positive only) of pixels | `x-offset y-offset` |
| `vscroll` | replaces selected textures with a scrolling one,<br>with vscroll 1 being 1 texture/sec | `x-scroll y-scroll` |
| `vrefract` | replaces texture, adding a refractive effect in alpha geometry<br>with the specified colour | `refract red green blue` |
| `valpha` | replaces current texture by one with a new alpha<br>transparency level; 0 (transparent) to 1 (opaque) | `external internal` |
| `vcoastscale` | replaces current texture by one with a new<br>coastscale factor (slipperiness) | `value` |
| `vscale` | replaces selected textures with scaled versions,<br>minimum is 0.125, maximum is 8 | `value` |
| `vrotate` | replaces selected textures with rotated or flipped versions;<br>0 = default<br>1-3 = rotate 90*this degrees<br>4 = flipped left-to-right<br>5 = flipped top-to-bottom<br>6 = transposed<br>7 = flipped & transposed | `value` |
| `vangle` | replaces selected textures with finely rotated versions by angle | `degrees` |
| `autotexangle` | replaces selected textures with rotated versions by angle, based on the slope (1-8). Negative values are accepted. | `slope` |
| `vcolour` | replaces selected textures with colour-tinted versions,<br>e.g. 1 0.2 0.2 will create red versions, default is 1 1 1 | `red green blue` |
| `vpalette` | applies colour specified by set & id from the builtin palette;<br>set 0 = pulse colours<br>0 = turn off all palette effects<br>1 = dark fire pulse colours<br>2 = bright fire pulse colours<br>3 = disco pulse colours (bomber-ball)<br>set 1 = team colours<br>0-3 = only enforced in teamplay games<br>4-7 = enforced at all times<br>set 2 = weapon colours<br>0-17 = only enforced when that weapon is currently spawnable<br>18-35 = enforced at all times | `set id` |
| `vreset` | resets a vtexture to its original settings | - |
| `vdelta` | combines with texture v*-commands to adjust rather than<br>overwrite the setting;<br>example: vdelta [vcolour 1 .5 .5]<br>example: vdelta [voffset 0 +16] | `command settings..` |
| `vshaderparam` | set shader parameters of textures;<br>independent of vdelta, only one shader parameter may be<br>overridden per texture, previous modifications are lost<br>envmin r g b = sets the minimum incidence angle for envmaps<br>(default .1 .1 .1),<br>envmin 1 1 1 makes intense envmaps at any angle<br>envscale r g b = intensity scale of envmaps<br>glowcolor r g b = adjusts the 3d glow colour of a texture,<br>parallaxscale low high = adjusts the heightmap effect of tex,<br>pulseglowcolor r g b = sets the colour to pulse to<br>(when enabled)<br>pulseglowspeed f = frequency (Hz) of pulsing effect<br>(when enabled)<br>pulseglowoffset i = offset interval of pulsing effect<br>(when enabled)<br>specscale r g b = specularity colour/brightness of a texture,<br>(default .2 .2 .2)<br>triplanarbias x y z = adjusts blending factor between<br>side faces and top faces<br>gloss scale = sets scale of specular gloss<br>normalscale scale = sets scale of the normalmap | `parameter properties` |
| `vlayer` | sets the bottom texture layer for all textures in selection;<br>texture_id is the texture number as seen in the<br>texture browser | `texture_id` |
| `vshadow` | sets shadow opacity for alpha geometry (-1 no shadow, 0 (color refract only) to 1 (full opacity contribution) | `value` |
| `vgrasscolourroot` | grows grass on the selected textures from its root up in this colour;<br>0 = no grass, or a pulse colour below 0 | `colour` |
| `vgrasscolourmiddle` | blends the grass of the selected textures to this colour at its middle;<br>0 = keep the root colour | `colour` |
| `vgrasscolourtip` | blends the grass of the selected textures to this colour at its tip;<br>0 = keep the middle colour | `colour` |
| `vgrassblend` | sets the opacity of the grass of the selected textures;<br>0 = the usual | `value` |
| `vgrassdensity` | sets the grass blades per square unit of the selected textures;<br>0 = the usual | `value` |
| `vgrasswidth` | sets the width at the root of the grass blades of the selected textures, or each ribbon of a frond;<br>0 = the usual | `value` |
| `vgrassbladeshape` | sets the shape around the grass blades of the selected textures, as seen cut across them, by its place in the list of grassbladeshapedef;<br>0 = flat | `shape` |
| `vgrassbladetaper` | sets how far the grass blades of the selected textures narrow to their tips, from 0 not at all to 1 to a point;<br>-1 = to a point | `value` |
| `vgrassfrondribbons` | sets how many wavy ribbons the grass blades of the selected textures are drawn as, such as seaweed, which suit flat and crossed shapes, as solid shapes show gaps;<br>0 = a plain blade | `value` |
| `vgrassfrondwaves` | sets how many waves run up the frond ribbons of the selected textures;<br>-1 = the usual | `value` |
| `vgrassfrondswing` | sets how far the frond ribbons of the selected textures swing to each side, in ribbon widths;<br>-1 = the usual | `value` |
| `vgrassfrondruffle` | sets how much the width of the frond ribbons of the selected textures ruffles;<br>-1 = the usual | `value` |
| `vgrassfrondripple` | sets how fast the waves ripple up the frond ribbons of the selected textures;<br>-1 = the usual | `value` |
| `vgrassheight` | sets the height of the grass of the selected textures;<br>0 = the usual | `value` |
| `vgrassspec` | sets the specular shine of the grass of the selected textures;<br>-1 = the usual | `value` |
| `vgrassnormalblend` | sets how far the grass blades of the selected textures are lit like the ground beneath them;<br>-1 = the usual | `value` |
| `vgrassrecover` | sets how long the trampled grass of the selected textures takes to stand up again;<br>0 = the usual | `milliseconds` |
| `vgrasstramplehold` | sets the share of the recovery time the trampled grass of the selected textures stays flat;<br>-1 = the usual | `value` |
| `vgrasselements` | sets which elements affect the grass of the selected textures, as bits: 1 = fire, 2 = energy, 4 = acid;<br>-1 = all of them | `value` |
| `vgrassscorchhold` | sets how long the scorched or wilted grass of the selected textures stays that way;<br>0 = the usual | `milliseconds` |
| `vgrassscorchregrow` | sets how long the scorched or wilted grass of the selected textures takes to recover;<br>0 = the usual | `milliseconds` |
| `vtouchtex` | sets the texture shown where the selected textures are touched, fading back to them after;<br>0 = none | `texture` |
| `vtouchtexfade` | sets how long a touched tile of the touch texture of the selected textures takes to fade back;<br>0 = never shown | `milliseconds` |
| `vtouchtexby` | sets what shows the touch texture of the selected textures, as bits: 1 = live actors, 2 = dead ones, 4 = dropped items, 8 = shots;<br>-1 = all of them | `value` |
| `vgrasscastshadow` | sets the shadows the grass of the selected textures casts for players who turn them on;<br>0 = none, 1 = static, 2 = animated with the wind | `value` |
| `vgrassstiffness` | sets how far the grass blades of the selected textures resist leaning, the wind and trampling;<br>-1 = the usual | `value` |
| `vgrassanimmillis` | sets the length of a gust of wind through the grass of the selected textures;<br>0 = the map's grassanimmillis | `milliseconds` |
| `vgrassanimscale` | sets how far the wind bends the grass of the selected textures;<br>-1 = the map's grassanimscale | `value` |
| `vgrassvariation` | sets how far clumps and blades of the grass of the selected textures stray from their colours;<br>-1 = the usual | `value` |
| `vgrassmottle` | sets how much the grass of the selected textures changes across the ground in broad patches;<br>-1 = the usual | `value` |
| `vgrassmottlesize` | sets how wide the patches of the grass of the selected textures are, 16 to 4096;<br>0 = the usual | `value` |
| `vgrassheadshape` | sets the shape of a kind of head grown among the grass of the selected textures;<br>0 = flower, 1 = cattail, 2 = seed head, 3 = mushroom, 4 = puff,<br>5 = bell, 6 = lavender, 7 = thistle, 8 = glowing bulb | `slot shape` |
| `vgrassheadcolour` | grows a kind of head among the grass of the selected textures in this colour;<br>0 = none, or a pulse colour below 0 | `slot colour` |
| `vgrassheadstalkshape` | sets the blade shape around the stalks of a kind of head of the selected textures, by its place in the list;<br>-1 = the head shape's | `slot shape` |
| `vgrassheadaccent` | sets the colour of the secondary part of a kind of head of the selected textures, such as a flower's centre;<br>0 = the shape's, or a pulse colour below 0 | `slot colour` |
| `vgrassheadshare` | sets the share of the grass blades of the selected textures that grow a kind of head instead;<br>0 = the default, 1 = every blade | `slot value` |
| `vgrassheadsize` | sets the size of a kind of head on the selected textures against its usual size, 0.1 to 3 | `slot value` |
| `vgrassheadvariance` | sets how much bigger or smaller than its size a kind of head on the selected textures may grow, 0 to 1 | `slot value` |
| `vgrassheadstiffness` | sets how far a kind of head on the selected textures resists the wind and trampling;<br>-1 = its shape's usual stiffness | `slot value` |
| `vgrassheadstalkheight` | sets the height of the stalks of a kind of head on the selected textures against its shape's usual, 0.1 to 4;<br>0 = the usual | `slot value` |
| `vgrassheadstalkwidth` | sets the width of the stalks of a kind of head on the selected textures against its shape's usual, 0.1 to 4;<br>0 = the usual | `slot value` |
| `vgrassheadstalktaper` | sets how far the stalks of a kind of head on the selected textures narrow to their tops, 0 to 1;<br>-1 = its shape's usual | `slot value` |

## Materials

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `editproblem` | returns why an edit over the selection is too big to send to the other players online, or nothing when it can be made | |
| `editmat` | modifies the material properties for selected cubes;<br>type is the material to be applied {water, clip, ladder..},<br>filter limits the command to only affect cubes whose material<br>match this, if given as empty string "" it matches all;<br>style limits the command to only affect cubes whose<br>geometry match this:<br>0 = normal<br>1 = non-empty<br>2 = empty<br>3 = not entirely solid<br>4 = entirely solid<br>example: editmat air water 2 would set all empty cubes<br>with water within the current selection to instead be air | `type filtermat filterstyle` |
| `showmat` | toggles the visibility of material volumes | `value` |
| `showphyslayers` | toggles the visibility of physical layers | `value` |
| `air` | removes all materials from the selected volume;<br>specify a material to only clear cubes with the<br>specified material already present | `[filter]` |
| `clip` | fills the selected volume with an invisible barrier<br>which projectiles and particles can pass through;<br>specify a material to only clip cubes with the specified<br>material already present | `filter` |
| `noclip` | allows players and projectiles to pass through the<br>selected volume; specify a material to only noclip cubes<br>with the specified material already present | `filter` |
| `death` | causes projectiles and players (if their feet touch the volume)<br>to be instantly killed; specify a material to only add death<br>to cubes with the specified material already present | `filter` |
| `aiclip` | causes the bot waypoint dropper to not place waypoints<br>within the selected volume; specify a material to only<br>aiclip cubes with the specified material already present | `filter` |
| `ladder` | allows players to climb vertical surfaces within the<br>selected volume; specify a material to only enable ladders<br>with the specified material already present | `filter` |
| `alpha` | makes the selected geometry translucent;<br>specify a material to only alpha cubes with the specified<br>material already present | `filter` |
| `hurt` | causes projectiles and players (if their feet touch the volume)<br>to be damaged at a specified rate and amount<br>(hurtdelay/hurtdamage); specify a material to only<br>enable hurt with the speified material already present | `filter` |
| `optmats` | toggles automatic material remip optimization (recommended on in almost all circumstances) | `boolean` |
| `hurtdamage` | hurt material damages players by this much<br>(note that player HP is out of 1000) | `value` |
| `hurtdelay` | milliseconds between hurtmat damaging players | `value` |
| `hurtresidual` | residual effects inflicted by hurt material (bitwise OR) | `burn bleed shock corrode` |
| `hurtbleeddamage` | hurt's bleed residual (when enabled) damages players this much<br>(note that player HP is out of 1000) | `value` |
| `hurtbleeddelay` | hurt's bleed residual (when enabled) damages players this often<br>(in milliseconds) | `value` |
| `hurtbleedtime` | hurt's bleed residual (when enabled) lasts this long<br>(in milliseconds) | `value` |
| `hurtburndamage` | hurt's burn residual (when enabled) damages players this much<br>(note that player HP is out of 1000) | `value` |
| `hurtburndelay` | hurt's burn residual (when enabled) damages players this often<br>(in milliseconds) | `value` |
| `hurtburntime` | hurt's burn residual (when enabled) lasts this long<br>(in milliseconds) | `value` |
| `hurtshockdamage` | hurt's shock residual (when enabled) damages players this much<br>(note that player HP is out of 1000) | `value` |
| `hurtshockdelay` | hurt's shock residual (when enabled) damages players this often<br>(in milliseconds) | `value` |
| `hurtshocktime` | hurt's shock residual (when enabled) lasts this long<br>(in milliseconds) | `value` |
| `hurtshockstun` | stun effects of hurt's shock residual (when enabled) (bitwise OR) | `[slow over time] [lower gravity over time] [slow immediately] [lower gravity immediately] [slip]` |
| `hurtshockstunfall` | how much hurt's shock residual (when enabled) stun reduces gravity (0-1) | `value` |
| `hurtshockstunscale` | how much hurt's shock residual (when enabled) stun slows movement (0-1) | `value` |
| `hurtshockstuntime` | hurt's shock residual (when enabled) has its stun effect last this long | `milliseconds` |
| `hurtcorrodedamage` | hurt's corrode residual (when enabled) damages players this much<br>(note that player HP is out of 1000) | `value` |
| `hurtcorrodedelay` | hurt's corrode residual (when enabled) damages players this often<br>(in milliseconds) | `value` |
| `hurtcorrodetime` | hurt's corrode residual (when enabled) lasts this long<br>(in milliseconds) | `value` |

## Map obituaries

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `obitdeath` | determines death message caused by deathmat<br>(map setting) | `string` |
| `obitfall` | one of the unused obits<br>(should not see in normal gameplay) | `string` |
| `obithurt` | determines death message caused by entering<br>hurt material (map setting) | `string` |
| `obitlava` | determines death message caused by entering<br>lava1 (map setting) | `string` |
| `obitlava2` | determines death message caused by entering<br>lava2 (map setting) | `string` |
| `obitlava3` | determines death message caused by entering<br>lava3 (map setting) | `string` |
| `obitlava4` | determines death message caused by entering<br>lava4 (map setting) | `string` |
| `obitwater` | determines death message caused by entering<br>deathmat water1 (map setting) | `string` |
| `obitwater2` | determines death message caused by entering<br>deathmat water2 (map setting) | `string` |
| `obitwater3` | determines death message caused by entering<br>deathmat water3 (map setting) | `string` |
| `obitwater4` | determines death message caused by entering<br>deathmat water4 (map setting) | `string` |

## Map values

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `getblendbrushname` | returns the name of the blendmapping brush with the specified index | `index` |
| `getseltex` | returns the currently selected texture's vslot (if selected),<br>or the texture on the cursor if none is selected;<br>if there is no texture (possibly caused by too<br>large of a gridpower), will return -1 | - |
| `gettexname` | returns the path and name of a texture's diffuse texture given a specified vslot (texture) | `vslot` |
| `getdecalname` | returns the path and name of a decal texture's diffuse texture given a specified decal slot | `decal slot` |
| `getvalpha` | returns the alpha setting for the specified vslot (texture) | `vslot` |
| `getvcoastscale` | returns the coast scale (slipperiness factor) for the specified<br>vslot (texture) | `vslot` |
| `getvcolour` | returns the colour modifications for the specified vslot (texture) | `vslot` |
| `getvdetail` | returns the vslot (texture) for the texture assigned as the<br>detail layer | `vslot` |
| `getvlayer` | returns the vslot (texture) for the texture assigned as the<br>blendmap layer | `vslot` |
| `getvoffset` | returns the number of pixels in the x and y directions<br>respectively for the specified vslot (texture) | `vslot` |
| `getvpalette` | returns the palette set/id values for a specified vslot (texture)<br>see `vpalette` for full set/id information | `vslot` |
| `getvrefract` | returns the refraction scale and colours, respectively, for the<br>specified vslot (texture) | `vslot` |
| `getvrotate` | returns the rotation number of the specified vslot (texture)<br>see `vrotate` for translation of rotation numbers | `vslot` |
| `getvangle` | returns the rotation angle of the specified vslot (texture) in degrees | `vslot` |
| `getvscale` | returns the scale factor of the specified vslot (texture) | `vslot` |
| `getvshaderparam` | returns the value of the specified vshader for the specified<br>vslot (texture); see `vshaderparam` for vshader<br>descriptions | `vslot vshader` |
| `lightbatches` | current number of lights batches the scene is using to render | - |
| `lightbatchrects` | current number of rectangles the lighting is using to map lights | - |
| `lightbatchstacks` | current number of light batch stacks the scene is using to render | - |
| `lightpassesused` | current number of lighting passes to render the scene | - |
| `lightsoccluded` | current number of lights the engine is able to occlude and<br>not render | - |
| `lightsvisible` | returns current number of lights the engine is rendering | - |
| `mapcrc` | returns the checksum of the current map | - |
| `maprevision` | returns the revision of the current map | - |
| `mapsize` | dimensions of the map, in gridpower 0 cubes<br>(default newmap is 2^10 = 1024)<br>to convert to metres, divide by 8 | - |
| `numvslots` | number of texture variations in the level | - |
