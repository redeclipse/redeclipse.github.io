---
title: Materials
layout: docs
origfile: Materials.md
origtitle: Materials
permalink: /docs/Materials
---
* TOC
{:toc}
## MATERIALS

<table cellspacing="10" style="width:100%">
<tr>
<td width="174">
/showmat \[0|1\] (or 'M' Key)

</td>
<td width="219">
toggles the visibility of material volumes.

</td>
</tr>
<tr>
<td width="174">
/air

</td>
<td width="219">
deletes all materials within the selection.

</td>
</tr>
<tr>
<td width="174">
/water

</td>
<td width="219">
creates water within the selected. Use water2, water3, and water4 if more variants are wanted.
</td>
</tr>
<tr>
<td width="174">
/lava

</td>
<td width="219">
creates lava within the selection. Use lava2, lava3, and lava4 if more variants are wanted

</td>
</tr>
<tr>
<td width="174">
/glass

</td>
<td width="219">
creates glass material within the selection. It is recommended that Alpha material is used instead of glass.

</td>
</tr>
<tr>
<td width="174">
/alpha

</td>
<td width="219">
converts selected geometry to Alpha material. The transparency level of the selected material can be adjusted with the /valpha command. Default: /valpha 0.5 Min: /valpha 0.0 (invisible) Max: /valpha 1.0 (normal)

</td>
</tr>
<tr>
<td width="174">
/death

</td>
<td width="219">
creates invisible death material within the selection. Whenever a player's feet enter this material they are killed instantly.

</td>
</tr>
<tr>
<td width="174">
/clip

</td>
<td width="219">
creates an invisible wall within the selection area.

</td>
</tr>
<tr>
<td width="174">
/aiclip

</td>
<td width="219">
prevents ai waypoints from being created within the bounded volume.

</td>
</tr>
<tr>
<td width="174">
/noclip

</td>
<td width="219">
enables the player and projectiles to pass through the bounded geometry.

</td>
</tr>
<tr>
<td width="174">
/ladder

</td>
<td width="219">
allows players to climb the bounded vertical geometry.

</td>
</tr>
</td>
</tr>
<tr>
<td width="174">
/hurt

</td>
<td width="219">
damages players according to /hurtdamage (Remember damage is ten times HP).

</td>
</tr>
</table>
