---
title: Variables - Interface
layout: docs
origfile: variables/Interface.md
origtitle: Interface
permalink: /docs/variables/Interface
redirect_from:
  - /wiki/variables/Interface/
---
* TOC
{:toc}
Menus, the HUD and the field of view.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `firstpersonbob` | toggles first-person camera bob effect | `boolean` |
| `firstpersonsway` | toggles first-person camera sway effect | `boolean` |
| `showcrosshair` | 0 = off, 1 = on, 2 = blend depending on current accuracy level | `value` |
| `crosshairweapons` | determines weapon-specific crosshair use (bitwise OR) | `[weapon-specific crosshairs] [weapon colours]` |
| `crosshairtone` | colour of crosshair (when weapon specific colours are not enabled) | `colour` |
| `hitcrosshairtone` | colour of the crosshair as it shows a hit | `colour` |
| `crosshairsize` | size of crosshair (in terms of screen size) | `value` |
| `crosshairscale` | scale of crosshair | `value` |
| `crosshairhitspeed` | how long the crosshair shows a hit on an opponent (milliseconds) | `value` |
| `crosshairblend` | determines crosshair opacity (0 = transparent 1 = opaque) | `value` |
| `crosshairaccamt` | determines blend by accuracy level intensity (when blend by accuracy is enabled) | `value` |
| `crosshairflash` | determines how the crosshair shows your health;<br>0 = off<br>&1 = flash red when below spawn health<br>&2 = colour from red to yellow as health rises, the usual colour at spawn health, and green when above it | `value` |
| `crosshairthrob` | determines scale of crosshair throb (size change) effect (like while gaining health) | `value` |
| `crosshair` | name of the crosshair shape, from config/ui/pointers/crosshairs | `string` |
| `crosshairhitthick` | how much the crosshair thickens as a hit effect, in terms of the crosshair's size | `value` |
| `showhitmarker` | shows ticks bursting out from the crosshair as your damage lands | `boolean` |
| `hitmarkertime` | how long the hit marker lasts | `milliseconds` |
| `hitmarkersize` | size of the hit marker (in terms of screen size) | `value` |
| `hitmarkercolour` | colour of the hit marker's ticks | `colour` |
| `hitmarkercore` | colour of the core of the hit marker's ticks | `colour` |
| `crosshairdemo` | cycles through every crosshair shape, one a second | `boolean` |
| `pointeroutline` | width of the dark outline around crosshairs, cursors and ammo clip rounds, in percent of their size | `value` |
| `pointeroutlinefade` | how far the dark outline fades out, in percent of the size | `value` |
| `pointeroutlineblend` | opacity of the dark outline | `value` |
| `pointergap` | space left between the crosshair, the indicator, the circle bar and the ammo clip (in terms of screen size) | `value` |
| `pointermorphtime` | how long a crosshair or cursor takes to change smoothly into another, except when switching weapons, which takes as long as the switch | `milliseconds` |
| `cursorpointer` | name of the cursor shape, from config/ui/pointers/cursors | `string` |
| `cursoraccent` | colour of the cursor's arrow | `colour` |
| `cursorhoveraccent` | colour of the cursor's arrow while over something that can be clicked | `colour` |
| `cursorhoverscale` | size of the cursor while over something that can be clicked, relative to its usual size | `value` |
| `clipgroupscale` | smallest size of ammo clip rounds, relative to their full size, before large clips gain rings or are grouped | `value` |
| `clipgroup` | how large ammo clips stay legible;<br>0 = more rings, up to clipmaxrings<br>1 = each round shown stands for several | `value` |
| `clipmaxrings` | most rings a large ammo clip may use before its rounds shrink | `value` |
| `showfps` | display the frames per second counter on the hud;<br>0 = no display<br>1 = display average fps<br>2 = display average fps and best and worst difference<br>3 = display average fps and fps range<br>4 = display average fps and average/worst frametimes | `value` |
| `showloadinglogos` | display logos while not in game | `boolean` |
| `showconsole` | display console messages in the hud without opening the console, will prevent lines from fading;<br>0 = off, 1 = only while editing, 2 = always | `value` |
| `clearconsole` | clears the selected console output;<br>-1: all<br>0: debug<br>1: event<br>2: frag<br>3: chat | `console-index` |
| `showminimap` | toggle minimap visibility | `boolean` |
| `showhud` | toggle heads up display visibility | `boolean` |
| `autoscores` | 1 = when dead, 2 = also in spectv, 3 = and in waittv too | `value` |
| `scoresdelay` | otherwise use respawn delay | `milliseconds` |
| `showlaptimes` | 0 = off, 1 = only player, 2 = +humans, 3 = +bots | `value` |
| `muzzleflash` | 0 = off, 1 = only other players, 2 = only thirdperson, 3 = all | `value` |
| `radarhardaffinity` | 0 = no radar in hard, 1 = affinity only radar in hard | `value` |
| `animationinterpolationtime` | sets the duration in milliseconds of animation blending | `value` |
| `addpostfx` | adds this effect to the post-processing stack | `value` |
| `setpostfx` | replaces all the current post-processing effects with this one | `value` |
| `clearpostfx` | clears all post-processing effects | - |
| `followdead` | 0 = never, 1 = in all but duel/survivor, 2 = always | `value` |
| `specmode` | 0 = float, 1 = tv | `value` |
| `waitmode` | 0 = float, 1 = tv in duel/survivor, 2 = tv always | `value` |
| `spectvrotate` | rotate style,  0 = absolute angle, 0 = scaled, gt 0 = scaled with max angle | `value` |
| `spectvdead` | 0 = never, 1 = in all but duel/survivor, 2 = always | `value` |
| `deathcamstyle` | 0 = no follow, 1 = follow attacker, 2 = follow self | `value` |
| `zoomdefault` | -1 = last used, else defines default level | `value` |
| `zoomscroll` | 0 = stop at min/max, 1 = go to opposite end | `value` |
| `showpresence` | 0 = never show join/leave, 1 = show only during game, 2 = show when connecting/disconnecting | `value` |
| `showpresencehostinfo` | 0 = do not show host info in join/leave messages, 1 = show host info in join/leave messages when at an appropriate privilege level | `value` |
| `showteamchange` | 0 = never show, 1 = show only when switching between, 2 = show when entering match too | `value` |
| `showtimestyle` | determines display style of remaining game time; 0 = seconds only, 1 = (minutes):(seconds to the thousandths place), 2 = (minutes):(seconds to the tenths place), 3 = (minutes):(seconds), no decimals, 4 = (minutes)m(seconds)s | `value` |
| `showrealtime` | toggles display of local real time beneath gameplay time | `boolean` |
| `deathanim` | 0 = hide player when dead, 1 = old death animation, 2 = ragdolls, 3 = ragdolls, but hide in duel/survivor | `value` |
| `deathfade` | 0 = don't fade out dead players, 1 = fade them out | `value` |
| `bloodsize` | sets the size of blood splatter | `value` |
| `bloodfade` | determines the time (in milliseconds) for blood stains to disappear | `value` |
| `bloodscale` | determines the multiplier for blood droplets shed when taking damage | `value` |
| `bloodsparks` | adds bubble like blood droplets, use with nogore = 1 | `value` |
| `nogore` | 0 = gore is present, 1 = no blood | `value` |
| `gibfade` | determines the time (in milliseconds) for giblets (body parts) to disappear | `value` |
| `gibelasticity` | determines the coefficient of restituition for giblets (body parts) hitting walls or other surfaces | `value` |
| `gibrelativity` | determines the factor by which player velocity is transfered to giblets (body parts) upon death | `value` |
| `gibliquidcoast` | determines the speed at which giblets (body parts) can coast through liquids | `value` |
| `damagedivisor` | damage and health values are displayed divided by this value | `value` |
| `damageinteger` | determines if health and damage values are displayed as integers;<br>0 = display as floats, 1 = display rounded to next integer | `value` |
| `hudsize` | sets the size of the entire hud as a whole, this includes both consoles, menus, inventory, etc | `value` |
| `zoomsensitivity` | determines aiming/look sensitivity while zoomed in with the rifle | `value` |
| `sensitivity` | determines scale by which to multiply mouse input for camera orientation ingame | `value` |
| `yawsensitivity` | determines scale factor for yaw (left/right pan) movement | `value` |
| `pitchsensitivity` | determines scale factor for pitch (up/down tilt) movement | `value` |
| `sensitivityscale` | determines scale factor for all types of mouse sensitivity | `value` |
| `mousesensitivity` | determines scale by which to multiply mouse input for cursor position in menus | `value` |
| `mouseaccel` | determines how much mouse look speeds up with faster mouse movement, 0 disables acceleration; uses the same values as cl_mouseAccel in Quake Live | `value` |
| `mouseaccelexp` | determines the acceleration curve; 2 is linear, above 2 accelerates more at higher speeds, between 1 and 2 gives logarithmic curves, 1 adds a constant boost once past the offset; uses the same values as cl_mouseAccelPower in Quake Live | `value` |
| `mouseacceloffset` | determines the mouse speed (counts per millisecond) that must be exceeded before acceleration starts, negative values accelerate more at lower speeds; uses the same values as cl_mouseAccelOffset in Quake Live | `value` |
| `mouseaccelsenscap` | determines the maximum sensitivity acceleration can reach, keeping fast flicks under control, 0 disables the cap; like sensitivity, this is the Quake Live cl_mouseSensCap multiplied by 2.2 at the default sensitivityscale | `value` |
| `entityedituiselmaxdist` | maximum distance at which the entityedit world interface is drawn for selected entities, 0 = no limit | `distance` |

`<hud>` is one of these HUD and world UI elements: `player`, `playeroverlay`, `capture`, `captureflag`, `defend`, `bomber`, `entityedit`, `entityitem`, `entityproj`.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `<hud>ui` | surface the `<hud>` world interface is drawn on, -1 = off | `value` |
| `<hud>uiyaw` | yaw of the `<hud>` world interface, -1 = face the camera | `degrees` |
| `<hud>uipitch` | pitch of the `<hud>` world interface | `degrees` |
| `<hud>uiscale` | scale of the `<hud>` world interface when not drawn in the world | `value` |
| `<hud>uiworld` | scale of the `<hud>` world interface when drawn in the world | `value` |
| `<hud>uimaxdist` | maximum distance at which the `<hud>` world interface is drawn, 0 = no limit | `distance` |
| `<hud>uidetentyaw` | yaw angle the `<hud>` world interface snaps to | `degrees` |
| `<hud>uidetentpitch` | pitch angle the `<hud>` world interface snaps to | `degrees` |
| `entityedituiselmaxdist` | maximum distance at which the entityedit world interface is drawn for selected entities, 0 = no limit | `distance` |

## Field of view

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `fov` | determines the size of the field of view in first or third person mode, depending on the current camera mode | `angle` |
| `editfov` | determines the size of the edit mode field of view | `angle` |
| `specfov` | determines the size of the spectator field of view | `angle` |
| `firstpersonfov` | determines the size of the first person ingame field of view | `angle` |
| `thirdpersonfov` | determines the size of the third person ingame field of view | `angle` |
| `firstpersondepthfov` | field of view the first person weapon is drawn with, so it looks the same whatever fov is (0 = the same as fov) | `angle` |
| `firstpersonbodydepthfov` | field of view the first person body is drawn with (0 = the same as fov) | `angle` |
