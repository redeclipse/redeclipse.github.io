---
title: 
layout: docs
origfile: Entities.md
origtitle: Entities
permalink: /docs/Entities
redirect_from:
  - /wiki/Entities/
---
* TOC
{:toc}
## Creating Entities

An entity can be created through usage of either the menu or console commands. To create an entity, you first have to be in edit mode.

-   Using the menu:

Open the main menu with 'ESC'. Click on the "Editing" item. Go to the third tab of the submenu, labeled "ents". You can see some entity commands and a list of all the entities on this tab. By clicking on an item in the entity list, you can create it. Once an item is clicked, a command appears where you can change properties of the entity. Confirm the creation with 'RETURN' or cancel it with 'ESC'.

-   Using console commands.

Open the Console with the Tilde Key (~) or Forward Slash (/) or open the chat with 'T'.

Use the /newent command to create a new light entity. Don't forget to enter the Forward Slash (/) if you opened the chat.

`/newent light 300 180 180 180`

...This will create a Light Entity with a *radius* of 300 and *Red Green and Blue Values* of 180. This will give a medium-sized white/grey light.

## Entity Properties

Entity properties are numbers that change the behaviour of an entity. Properties can be set during creation or after creation.

To modify properties after creation, select the entity you wish to change by clicking on it. After that, either

-   press the Period key (.) to change properties (/entset) directly to the value you want them...
-   hold the corresponding Number Key to the parameter you wish to change while scrolling with the scroll wheel.

To move an entity, left-click the face corresponding to the axis you wish to move it along and drag it to the new position.

You can change if entities snap to the grid while moving them using:

`/entselsnap (0|1)`

## Types of Entities

<table cellspacing="10" style="width:100%">
<tr>
<td width="174">
actor

</td>
<td width="219">
spawnpoint for an enemy type in Campaign or Onslaught mode

</td>
</tr>
<tr>
<td width="174">
affinity

</td>
<td width="219">
special mode objects such as Flags and Bombs

</td>
</tr>
<tr>
<td width="174">
camera

</td>
<td width="219">
camera for spectv viewing mode

</td>
</tr>
<tr>
<td width="174">
checkpoint

</td>
<td width="219">
respawn point for campaign and timetrial modes

</td>
</tr>
<tr>
<td width="174">
envmap

</td>
<td width="219">
an entity that maps a reflection inside its radius to reflective surfaces

</td>
<tr>
<td width="174">
light

</td>
<td width="219">
a spherical light max: 255 255 255

</td>
</tr>
<tr>
<td width="174">
lightfx

</td>
<td width="219">
animates a light when linked to a light entity (see Linking Objects)

</td>
</tr>
<tr>
<td width="174">
mapmodel

</td>
<td width="219">
a numbered mapmodel

</td>
</tr>
</table>
`Mapmodel Palette:`
`palette is the colour type (0 = misc colours, 1 = team colours)`
`palindex is the subset of each palette ->`
`palette 0 = (0 = off, 1/2/3 = random pulse colours [fire/etc], 4/5/6 = linearly interpolated pulse colours)`
`palette 1 = (0/1/2/3/4/5 = team colours neutral/alpha/omega/kappa/sigma/enemy (only in team games), 6/7/8/9/10/11 = forced team colour)`
`colour is a specific colour you want to apply to the model (24 bit colour value, eg. 0xRRGGBB in hex)`

<table>
<tr>
<td width="174">
particles

</td>
<td width="219">
particles like smoke and fire

</td>
<tr>
<td width="174">
playerstart

</td>
<td width="219">
spawn point for players

</td>
</tr>
<tr>
<td width="174">
pusher

</td>
<td width="219">
pushes a player in the direction indicated by its arrow

</td>
</tr>
</table>
`Pusher Type:`
`0 (conditional) will only apply a force if the velocity on each axis to which it is applying it to is below the amount threshold.`
`1 (additional) will add the force to the current velocity.`
`2 (redirectional) will take the current velocity and redirect it into the pusher direction and apply the force.`
`3 (absolute) will simply replace the current velocity with the pusher direction and force."`

<table>
<tr>
<td width="174">
sound

</td>
<td width="219">
a sound that plays when a player is within its radius

</td>
</tr>
<tr>
<td width="174">
sunlight

</td>
<td width="219">
creates a directional light

</td>
</tr>
<tr>
<td width="174">
teleport

</td>
<td width="219">
portal. Link more than one of these to travel between them (see Linking)

</td>
</tr>
<tr>
<td width="174">
trigger

</td>
<td width="219">
triggers an other entities such as sounds and doors when a player is within its radius (see Linking)

</td>
</tr>
<tr>
<td width="174">
weapon

</td>
<td width="219">
creates a spawn point for a weapon.

</td>
</tr>
</table>
## Linking Entities

Some entities may be linked together.

Sounds, Particles and LightFX can be linked to Triggers, Pushers, Teleports, Affinities, Playerstarts or Checkpoints. Triggers can control the state of linked Mapmodels (e.g. visibility, collision, door animations) or other Triggers. Furthermore, LightFX can be linked to Lights and Teleports to each other.

Each entity combination has a set of link modes that can be cycled through with the L key, for example to make a pair of Teleports work in either direction or both.
