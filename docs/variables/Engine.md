---
title: Variables - Engine
layout: docs
origfile: variables/Engine.md
origtitle: Engine
permalink: /docs/variables/Engine
redirect_from:
  - /wiki/variables/Engine/
---
* TOC
{:toc}
The engine's own settings, and the values it reports.

## Engine settings

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `maxfps` | caps the maximum framerate at the given value; note that vsync will cap at monitor refresh if enabled | `value` |
| `vsync` | toggles vertical synchronization (frame pacing to monitor refresh rate) | `boolean` |
| `screenres` | sets the gameplay render resolution | `x y` |
| `screenh` | sets the number of vertical pixels onscreen | `value` |
| `screenw` | sets the number of horizontal pixels onscreen | `value` |
| `fullscreen` | toggles fullscreen or windowed mode | `boolean` |
| `volumetric` | toggles rendering volumetric-tagged lights with volumetrics | `boolean` |
| `volsteps` | sets the number of intensity subdivisions for volumetric lights | `value` |
| `gi` | toggles use of global illumination for maps | `boolean` |
| `ao` | toggles use of ambient occlusion (obscurance) for maps; note that this is called "ambient obscurance" in the code but referred to by its common name of "ambient occlusion" in the UI | `boolean` |
| `fxaa` | toggles fast approximate antialiasing (grease filter) | `boolean` |
| `fxaaquality` | sets quality level of FXAA filter | `value` |
| `msaa` | sets level of multisampling antialiasing (usually in powers of 2) | `value` |
| `tqaa` | toggles temporal antialiasing | `boolean` |
| `smaa` | toggles morphological antialiasing | `boolean` |
| `smaaquality` | sets quality level of morphological AA | `value` |
| `bilinear` | toggles bilinear texture filtering | `boolean` |
| `trilinear` | toggles trilinear texture filtering | `boolean` |
| `aniso` | sets level of anisotropic filtering (usually in powers of 2) | `value` |
| `gscale` | sets engine render scale (percent of native resolution) | `value` |
| `texreduce` | factor by which to reduce the resolution of level textures by | `value` |
| `maxtexsize` | maximum resolution to which textures can be loaded into the game at | `value` |
| `envmapsize` | resolution (as a power of 2) for the environment maps on a level | `value` |
| `softparticles` | toggles smoothing of particle effects and weapon glows | `boolean` |
| `caustics` | toggles light caustic rendering for water volumes | `boolean` |
| `waterreflect` | toggles screenspace surface reflection for water volumes | `boolean` |
| `vertwater` | toggles surface height animation for water volumes | `boolean` |
| `filltjoints` | toggles whether to fix geometry t-joints (often visible as 'sparklies' in geometry); this should almost always be enabled | - |
| `stains` | toggles bloodstains on map geometry | `boolean` |
| `maxstaintris` | maximum amount of geometry devoted to blood stains | `value` |
| `smfilter` | shadow filtering level | `value` |
| `smsize` | resolution of shadow rendering | `value` |
| `smstaticdist` | distance from the camera beyond which pickups stop animating in cached light shadows | `value` |
| `smalpha` | enables shadows cast by alpha geometry (1 - sunlight, 2 - pointlights) | `value` |
| `rhtaps` | radiance hint taps; sets global illumination resolution | `value` |
| `aotaps` | number of ambient obscurance taps; sets ambient obscurance resolution | `value` |
| `aoiter` | iterations to smooth ambient obscurance over | `value` |
| `gamma` | sets the screen gamma (luminance curve) | `value` |
| `mapeffects` | sets the visibility of level-defined optional mapmodels, lights, particles, and other entities, from 1 (minimal) to 3 (show all) | `value` |
| `winddebug` | shows debug information for wind emitters | `boolean` |
| `windanimdist` | sets the maximum distance for drawing wind animations | `value` |
| `windanimfalloff` | sets the falloff distance for drawing wind animations | `value` |
| `windmaxemitters` | sets the maximum amount of active wind emitters | `value` |
| `windcostdiv` | how often things sample the wind, divided into the cost of the active wind emitters; higher samples more often | `value` |
| `particlewind` | toggles allowing particles to move with the wind (including map wind and explosions) | `boolean` |
| `fileredirect` | reads replacement in place of removed once removed can't be found anywhere; removed can use * and ? wildcards and \| between alternatives, and replacement fills in what they matched as $1 to $9 ($$ is a $);<br>a texture, sky box, model, sound or music a map names that's removed is ported to replacement when the map loads, so saving the map saves it, and colour (0xRRGGBB) tints a diffuse texture's slot;<br>an empty replacement drops removed, so a map slot loses that texture and its shader the part that used it;<br>example: fileredirect "textures/old/*" "textures/new/$1" | `removed replacement [colour]` |
| `fileredirectclear` | removes every redirect made with fileredirect | - |
| `fileredirectlist` | returns every redirect as a list of removed, replacement and colour triples | - |
| `fileredirectmatch` | returns what path is redirected to, one step on and whether or not it exists, or nothing | `path` |
| `fileredirectverbose` | logs each removed file the first time it's redirected | `boolean` |
| `fileredirectmissing` | logs each texture, composite, sound or required model that can't be found and has no redirect, once, to list what needs one | `boolean` |

## Engine values

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `camerapitch` | returns the current camera's pitch as a float precise to seven digits | - |
| `cameraroll` | returns the current camera's roll as a float precise to seven digits | - |
| `camerayaw` | returns the current camera's yaw as a float precise to seven digits | - |
| `cameraposx` | returns the x coordinate of the camera's location as a float precise to seven digits | - |
| `cameraposy` | returns the y coordinate of the camera's location as a float precise to seven digits | - |
| `cameraposz` | returns the z coordinate of the camera's location as a float precise to seven digits | - |
| `getenginestat` | returns an engine value:<br>0:wtr     1:wtr%    2:wvt     3:wvt%    4:evt<br>5:eva     6:ond      7:va       8:gl       9:gb<br>10:oq     11:fps    12:best   13:worst  14:ents<br>15:entsel 16:wp     17:pvs    18:vel     19:m/s<br>20:km/h  21:posx  22:posy   23:posz   24:yaw<br>25:pitch  26:roll    27:selox  28:seloy  29:seloz<br>30:selsx  31:selsy  32:selsz  33:selcx  34:selcxs<br>35:selcy  36:selcys 37:cube   38:mat   39:corner<br>40:orient 41:grid | - |
| `curfps` | the current frame rate, averaged over the last few frames | - |
| `bestfps` | the best frame rate of the last few frames | - |
| `worstfps` | the worst frame rate of the last few frames | - |
| `getfps` | returns the current frame rate, or that of the last frame alone if raw is 1 | `[raw]` |
| `curtime` | milliseconds of game time the last frame took, which is 0 while paused and scaled by timescale | - |
| `lastmillis` | milliseconds of game time since the game started, which stops while paused | - |
| `totalmillis` | milliseconds of real time since the game started | - |
| `elapsedtime` | milliseconds of real time the last frame took | - |
| `paused` | 1 while the game is paused | - |
| `timescale` | the speed game time runs at, as a percentage of real time | - |
| `desktopw` | width of the desktop, in pixels | - |
| `desktoph` | height of the desktop, in pixels | - |
| `refreshrate` | refresh rate of the display the game is on, in hertz | - |
| `renderw` | width the world is rendered at, in pixels | - |
| `renderh` | height the world is rendered at, in pixels | - |
| `hudw` | width the HUD and menus are drawn at, in pixels | - |
| `hudh` | height the HUD and menus are drawn at, in pixels | - |
| `gfxvendor` | the graphics driver's vendor | - |
| `gfxrenderer` | the graphics card, as the driver names it | - |
| `gfxversion` | the graphics driver's OpenGL version string | - |
| `glversion` | the OpenGL version in use, such as 330 for 3.3 | - |
| `glslversion` | the GLSL version in use, such as 330 for 3.30 | - |
| `versionstring` | the game's version, such as 2.1.0 | - |
| `versionmajor` | the major part of the game's version | - |
| `versionminor` | the minor part of the game's version | - |
| `versionpatch` | the patch part of the game's version | - |
| `versionname` | the game's name | - |
| `versionbranch` | the branch the game was built from | - |
| `versionbuild` | the build number of the game, 0 if it was built by hand | - |
| `versionplatname` | the short name of the platform the game is running on | - |
| `versionplatlongname` | the name of the platform the game is running on: windows, macos or linux/bsd | - |
