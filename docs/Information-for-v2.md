---
title: Information for v2
layout: docs
origfile: Information-for-v2.md
origtitle: Information-for-v2
permalink: /docs/Information-for-v2
redirect_from:
  - /docs/Information_for_v2
  - /wiki/Information_for_v2
---
* TOC
{:toc}
The time since the release of v1.6 has seen some major developments within the project, starting at the New UI and culminating in a full port of the Tesseract engine to Red Eclipse that is now being dubbed "version 2.0", which we will hopefully be releasing in the near future. So, what does this mean?

## A New Rendering Engine
From the [Tesseract website](http://tesseract.gg/):
> Tesseract provides a unique open-source engine derived from Cube 2: Sauerbraten technology but with upgraded modern rendering techniques. The new rendering features include fully dynamic omnidirectional shadows, global illumination, HDR lighting, deferred shading, morphological/temporal/multisample anti-aliasing, and much more.

This is great news for us, as we can take more advantage of newer hardware and do things we simply couldn't before, due to the limitations of the old renderer. We know we've prided ourselves for a long time concerning the fact Red Eclipse can "run on a potato(tm)", but we're going to have to say goodbye to the potatoes in order to make progress. We are sorry to leave behind our root vegetable loving friends, but we are trying to make real progress by turning Red Eclipse into a beautiful looking game that people want to play.

You can read more about the renderer [here](http://tesseract.gg/renderer.txt), but this outlines the differences in design choice:
> Sauerbraten was reliant on precomputed lightmapping techniques to handle lighting of the world. This approach posed several problems. Dynamic entities in the world could not fully participate in lighting and so never looked quite "right" due to mismatches between dynamic and static lighting techniques. Lightmap generation took significant amounts of time, making light placement a painful guess-and-check process for mappers, creating a mismatch between the ease of instantly creating the level geometry and the not-so-instant-process of lighting it. Finally, storage of these lightmaps became a concern, so low-precision lightmaps were usually chosen, at the cost of appearance to reduce storage requirements. Tesseract instead chooses to use a fully dynamic lighting engine to resolve the mismatch between lighting of dynamic and static entities while making better trade-offs between appearance and storage requirements.

## A New Start
Since starting the v2.0 project, there have been some deviations from the standard design present in the v1.x series, some minor and some major. Many of these are highly experimental or extensions of previous ideas, and others are attempts to fix flaws we'd become reliant on, but the main idea of the new series will be that it is more considered a "reboot" or "sequel" of the game rather than a direct continuation of what we're currently used to.

### Weapon Load-outs
"In the beginning" what we now consider "load-outs" used to be just a game mutator called "Arena". This was generally so popular for it's "get-in-and-play" style that it eventually became the default play style for Red Eclipse, with the original gameplay replacing the mutator slot with what we now call "Classic" (yep, it really resembles the classic gameplay). The philosophy of how weapons were viewed shifted at this point from that of skewed weapon balancing to what we currently have in v1.6 with fairly even pros and cons.

In choosing your load-out, this was basically among the first of the ways we gave players to customise their character and combat styles. Rather than creating rigid classes, we wanted to offer everything so you could make as many different combinations as you want. In v2.0 this has been extended further to actually give your choices more depth, these include things like changing weight, speed, and health. More modifiers will probably be added as the situation evolves and we find more ways to give deeper mechanics to each weapon, after which we will have to take a look at the balance again before releasing.

### Impulse System
Probably one of the most guarded and heralded aspects of the game, this has always been sensitive to changes. The biggest change here from previous versions is the removal of the "Impulse Meter", a source of conditionally regenerative energy that limited your ability to perform special moves like boosting, dashing, and parkour. This is another response to a popular mutator in v1.6, "Freestyle", which is generally the same idea. The only limit from here will be how many moves you can do before having to touch the ground again, with delay timers between each move, and the mutator will now just lift the move count restrictions.

### Jumping
Not a thing you think would change much, but we've been running a few experiments here to make things a bit more interesting/nuanced, things may or may not change. Holding down jump now lets you jump a little higher, and holding down crouch helps you fall a little faster. Pressing jump in mid-air while holding crouch also allows you impulse directly down. These changes have been made in tandem with the speed/weight changes mentioned above to strike a balance between the new mechanics and the old "feel".

### HUD
The old hard-coded HUD (heads-up-display) has been replaced with the new UI system to allow a level of reconfigurability never seen before. This is still a work in progress that needs the love and attention of an artist, but it should allow us to offer a lot more variations in the future to suit different tastes.

### Planned or Future Stuff
* Utility items (still)
* Emotes

## Mapping and Porting Existing Maps
It is going to take a lot of time and effort to port some existing maps and create new ones with the new renderer specifically in mind. It is important to know that several changes to the way you map will need to be made. In v2.0 the world loader will only accept a map with version 43 or higher, so you will need to use maps saved with at least v1.3.1 (Galactic Edition Patch as of [Dec 5, 2012](https://github.com/redeclipse/oldsvnre/commit/51aaf7d1a8e95e7e8e34d20f1011c8f6a69be094)) to ensure your maps will load in the new version, though it is recommended you just save using v1.6. From there you can get on with the work of porting your map. Also, we have already culled the map list significantly in order to focus on the quality of a few maps rather than relying on quantity.

UPDATE: molexted is attempting to get some core menus going for editing to help those interested in developing new maps and porting old ones. If you have any issues editing please contact us so we can address it quickly.

### Lights
This is the number one thing you need to know when dealing with mapping in the new version: you can't have a ton of dynamic lights without things going terribly wrong. By default, all lights cast shadows, both static and dynamic. You need to think carefully about where you're going to place a light, and you shouldn't under any circumstances allow there to be a ton of lights spammed all over the place, especially if they are dynamic. Unfortunately, that's exactly the situation we face when porting our current maps, as spamming lights was the workaround for crappy static lightmaps due to their size.

You can change how a light behaves by modifying attribute 7 in a bitwise fashion. For those who can't imagine things in bits, the easiest way to think about it is that instead of (0, 1, 2, 3, 4, 5, 6 etc) you double each subsequent value (0, 1, 2, 4, 8, 16, etc) then add the ones you want together. For example: 1 + 2 + 4 = 7. The values are as follows:

- 1 = `L_NOSHADOW` - does not cast shadows at all
- 2 = `L_NODYNSHADOW` - does not cast shadows for dynamic entities (like players, etc)
- 4 = `L_VOLUMETRIC` - creates a volumetric effect inside the area of influence for the light
- 8 = `L_NOSPEC` - disables specular highlights that a normal point source light creates, useful for ambient

Having lights that work in realtime has finally allowed me to add both "palette" and "palindex" attributes to the LIGHT entity at attributes 8 and 9. This means maps can be completely responsive to to the available palettes which includes team colours in team games, even allowing for a neutral fallback if it is a free-for-all game. You can use these attributes in conjunction with "texpalette" to make textures the same colours. We would like to see more maps taking advantage of this feature as we can actually change the colours of the teams with variables. Anyway, I'll try to explain how this works.

Palette "0" - rotating pulse colours:
- 0 = this special value means apply no palette (0, 0)
- 1 = `PULSE_FIRE`, fire like colours
- 2 = `PULSE_BURN`, like fire, but darker (used for the burn residual)
- 3 = `PULSE_DISCO`, disco colours (used for the bomber-ball)
- 4 = `PULSE_SHOCK`, shock colours (used for the shock residual and zapper)
- 5 = `PULSE_BLEED`, bleed colours (used for the bleed residual)
- 6 = `PULSE_BUFF`, buff colours (used for the pulsation effect on buffed players)
- 7 = `PULSE_WARN`, red like colours to highlight a problem or error (used when shooting a teammate)

Palette "1" - team colours:
- 0 = team neutral colour
- 1 through 4 = team colour (or neutral in ffa)
- 5 through 8 = team colour (persistent regardless of mode)

Palette "2" - weapon colours: a little long to list, but the gist is 0-11 (claw to rocket) but will be white if that particular weapon is disabled by some method, 12-23 is persistently the weapon colour.

### LightFX
This has been our variation on Cube's SPOTLIGHT entity, but with several enhancements that include PULSE, FLICKER, and GLOW that have only really been used in the map "Test Chamber". Before, you could only use one LIGHTFX entity per light and get consistent results, but with the new lighting system we was able to revise this so you can link several LIGHTFX to LIGHTs and have it all work nicely in tandem. This means you could have a volumetric spotlight that flickers every so often, as if it were broken.

### Sunlight
For us, this used to be an entity that we'd spam a few times to get a more desirable effect with the lightmaps, but in the new renderer there is only one singular sunlight which is controlled with the variables `sunlight` (colour), `sunlightscale` (brightness) and `sunlightyaw`/`sunlightpitch` (direction). For older maps, this means we had to write an importer which takes all the values of the sunlight entities in the level, then average that out to come up with a single value, and in some cases this may not be 100% representative of where the sun actually is. An alias has been written so you can quickly set the sun direction by entering edit mode and looking in the direction of the sun, and issuing the command `getsundir`.

### Variants
Something we've talked about in the past and wanted to do but couldn't because of the static lightmap system. All maps now have two variants available, "normal" and "alternate". When changing the map, the server will pick a random one (or default to "normal" in editmode) to apply to the game. You can get the current value of this from `$mapvariant` which will be either 1 (normal) or 2 (alternate). You can force a specific variant using the server variable `forcemapvariant` (same values, or 0 for off). Yes, this means you can have a server that only plays a certain variant of maps.

This change involved duplicating a lot of variables and adding a new attribute to a ton of entities to support changing the entire map depending on the situation. And no, you don't have to use it to have a day and night version of your map (you can have two day versions for example), but it would be nice to see two variants of every map to keep things interesting for the players, even if that just means changing the lighting a little, placing items in different places, or changing the layout with mapmodels.

The following entities now have a "variant" attribute:
> light, playerstart, particles, sound, lightfx, decal, weapon, teleport, actor, trigger, pusher, affinity, checkpoint

The following variables now have a "alt" variant (eg. skybox -> skyboxalt) for variant 2:
> ambient, ambientscale, skylight, skylightscale, fog, fogcolour, skybgcolour, skybox, skycolour, skyblend, skyoverbright, skyoverbrightmin, skyoverbrightthreshold, spinsky, yawsky, cloudbox, cloudcolour, cloudblend, spinclouds, yawclouds, cloudclip, cloudlayer, cloudlayercolour, cloudlayerblend, cloudoffsetx, cloudoffsety, cloudscrollx, cloudscrolly, cloudscale, spincloudlayer, yawcloudlayer, cloudheight, cloudfade, cloudsubdiv, envlayer, envlayercolour, envlayerblend, envoffsetx, envoffsety, envscrollx, envscrolly, envscale, spinenvlayer, yawenvlayer, envheight, envfade, envsubdiv, atmo, atmoplanetsize, atmoheight, atmobright, atmolight, atmolightscale, atmodisksize, atmodiskbright, atmohaze, atmohazefade, atmohazefadescale, atmoclarity, atmodensity, atmoblend, fogdomeheight, fogdomemin, fogdomemax, fogdomecap, fogdomeclip, fogdomecolour, fogdomeclouds, skytexture, skyshadow, sunlight, sunlightscale, sunlightyaw, sunlightpitch

When importing a map, the game will copy all the "normal" values to the "alternate" ones for you so your map won't appear inconsistent when the server chooses to load the different variants. You can quickly copy all of the above variables from their normal to their alternate equivalent using the command `copyvariantvars`. This is especially of note if you don't want to create a second variant of your map for some reason. All map submissions from now on will be checked to ensure that both variants are valid for normal gameplay, so be sure to check both variants before saving your map.

### Glass
With the previous renderer, glass was pretty disgusting and static, so we had actually banned widespread use of it in maps. This lead to use of alpha material being used on geometry instead to achieve a better effect. The new renderer now supports glass colours and the application of a normal texture, which is then used to refract what is behind it depending on the pattern. Upon import, the game will reset the glass along with all other material textures stored in the config and apply the default textures to suit the new format, you can change them in your map config.

### Skylight
By default, this is disabled unless there is a valid setting for the sunlight. As a result, the importer will add a minimal sunlight directly above the map to re-enable the feature. If you're setting the variable for skylight and getting no results, this is what you need to check, at the very least you need to set the colour for it (`sunlight`/`sunlightalt`) to a non-zero value. This being said, it is highly discouraged to rely too much on skylight now as you will get better results from the sunlight.

### Decal
This is a new entity which takes the place of the old SUNLIGHT spot. This allows you to apply textures over geometry in a way that respects the properties of the surface (like normals). I've included a selection of decals from Tesseract and made some variations of the panel textures found in the "jojo" set. The importer will automatically add the default list of decals to your map on load, after which you can find it in your map config file.

### Map Descriptions
A new map variable, `mapdesc`, should be set alongside `maptitle` and `mapauthor`. It provides a short description of the map which is shown in menus, and should only be about 1 to 2 sentences long as it is used in tooltips.

## What We Need
Version 1.6 was released in December 2017 and we've been without a release for quite a while now because half the game is being rebuilt. What we need is:
- Maps, either new or ported. We only have a handful of maps at the moment. Post maps up on the discussions for feedback, and assign them to @qreeves when they're ready to review for inclusion in the game.
- Models, ones to replace any low quality assets, and new ones for ammo boxes.
- Any UI work that hasn't covered stuff we previously had, due to the interface rewrite.

## In Conclusion
There's been a lot of work done since v1.5.8 was released, and there's a whole ton more still to do. This is actually an exciting time for the project and we hope you all enjoy the new rendering engine (@qreeves basically stayed up 40 hours at time for a whole week to get it done!). Also be sure to thank @lsalzman for all the hard work he's done on Tesseract and his tireless efforts helping us with everything technical in Red Eclipse, without him this game would not exist.
