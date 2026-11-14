---
title: Gameplay - Parkour Guide
layout: docs
origfile: gameplay/Parkour-Guide.md
origtitle: Parkour-Guide
permalink: /docs/gameplay/Parkour-Guide
redirect_from:
  - /docs/gameplay/Parkour_Guide/
  - /wiki/gameplay/Parkour_Guide/
---
* TOC
{:toc}

*Red Eclipse* features a fluid parkour and impulse system that lets you chain movement abilities together to build momentum, scale walls, cross gaps, and outmanoeuvre opponents.

## The Impulse System

Parkour actions are governed by two resources shown at the bottom-left of the HUD, directly beneath your health bar:

- **Impulse Move Count** (the **6** segmented bars): You can perform up to **6** counted impulse moves (`impulsecount`) before needing to recharge. Counted moves are **Impulse Jump / Boost**, **Impulse Pound**, **Impulse Dash**, **Slide**, **Impulse Launch**, **Wall Run**, and **Wall Climb**. Other parkour actions (**Jump**, **Vault**, **Wall Kick**, **Melee Kick**, and **Claw Grab**) do not consume a move segment.
- **Impulse Meter** (the thin energy bar beneath the segments): You have a pool of **30,000** impulse energy units (`impulsecostmeter`). Every parkour move (except a standard jump) deducts energy from this meter. When your remaining energy drops below 25%, the bar's background flashes red.

### Regeneration

Your move count and impulse meter begin recharging **0.5 seconds** (`impulseregendelay`) after your last impulse move ends:

- Each move count segment takes **0.25 seconds** (`impulsecostcount`) of base regeneration time to restore, while the impulse meter restores **1,000 units per second** at the base rate.
- **Standing still on a surface** recharges at the full base rate (**100%**).
- **Crouching on a surface** (while not sliding) accelerates regeneration to **200%** for the impulse meter and **125%** for the move count.
- **Moving**, **running**, or **sprinting** on a surface slows regeneration (**90%** while walking, **67.5%** while running, and **45%** while sprinting).
- **Being in mid-air or sliding** reduces regeneration to **25%** of the base rate.

You can also display your impulse energy and cooldown arcs around your crosshair under **Settings > Crosshair > Indicator and circle bar** (**Impulse indicator** and **Circle bar**).

## Default Controls

Movement bindings can be customised under **Settings > Controls > Movement**.

| Action | Default Key(s) | Command | Description |
| --- | --- | --- | --- |
| **Forward / Backward / Left / Right** | **[W]** / **[S]** / **[A]** / **[D]** or **Arrow Keys** | `forward`, `backward`, `left`, `right` | Directional movement. You run by default when not crouching or walking. |
| **Jump** | **[SPACE]** | `jump` | Jump from the ground, kick off walls, launch from slides, or boost in mid-air. |
| **Crouch** | **[LSHIFT]** | `crouch` | Crouch on the ground, slide when landing, or combine with Jump in mid-air to pound. |
| **Special** | **[Q]** or **[LCTRL]** | `special` | Impulse Dash on the ground, run or climb on walls, or perform a fly-kick in mid-air. |
| **Secondary Fire** | **[MOUSE2]** (Right-Click) | `secondary` | With the **Claw** equipped, grab onto walls or pull yourself toward players. |

## Movement & Parkour Abilities

| Ability | Input | Move Count | Meter Cost | Description |
| --- | --- | --- | --- | --- |
| **Sprint** | Hold **[W]** on the ground for 1s | 0 | 0 | Running straight forward (without strafing or turning sharply) for 1 second activates your thrusters and increases your ground speed from **1.25×** to **1.5×**. |
| **Jump** | **[SPACE]** on the ground | 0 | 0 | Standard upward jump that preserves most of your horizontal momentum. Includes a brief grace window after stepping off a ledge, Impulse Dash, or Vault. |
| **Impulse Jump** | **[SPACE]** in mid-air (no movement keys) | 1 | 750 | Boosts you straight upward (`3.0×` impulse), redirecting all of your current velocity vertically. |
| **Impulse Boost** | **[SPACE]** + **[W]**/**[A]**/**[S]**/**[D]** in mid-air | 1 | 750 | Boosts you in the direction you are moving and aiming (`2.0×` impulse). You can only perform **one** mid-air Impulse Jump or Boost before you must touch a surface or perform a touch move (such as a Wall Run, Wall Kick, Vault, Claw Grab, or Melee Kick). |
| **Impulse Pound** | **[LSHIFT]** + **[SPACE]** in mid-air (no movement keys) | 1 | 1000 | Redirects all of your momentum straight downward with `2.5×` impulse and `3.0×` gravity, slamming you to the ground. Release **[W]**/**[A]**/**[S]**/**[D]** before pressing **[SPACE]** so you do not perform a directional Impulse Boost instead. |
| **Impulse Dash** | **[Q]** or **[LCTRL]** on the ground | 1 | 2000 | Quickly dashes along the ground in your movement direction (or straight ahead if standing still) with reduced friction. Dashing directly into a wall smoothly transitions into a **Wall Run** or **Wall Climb** at no extra cost. Has a 0.75s cooldown after an Impulse Dash or Slide finishes. |
| **Slide** | Hold **[LSHIFT]** while landing, or **[W]** + **[LSHIFT]** + **[Q]**/**[LCTRL]** on the ground | 1 | 2000 | Puts you into a low-friction power slide for up to 1 second. Sliding down slopes grants extra speed, and pressing **[Q]**/**[LCTRL]** while sliding down a ramp accelerates you even further. Sliding lowers your hitbox to pass under low gaps and deals a melee kick to enemies in your path. Has a 0.75s cooldown after a Slide or Impulse Dash finishes. |
| **Impulse Launch** | **[SPACE]** during a **Slide** | 1 | 1000 | Launches you forward and upward out of a slide, carrying your slide momentum into the air. Aiming higher (above 22.5°) increases your launch angle. Because launching counts as a surface touch, you can still use an **Impulse Jump** or **Boost** afterwards in mid-air. |
| **Wall Run** | **[Q]** or **[LCTRL]** near a wall (at an angle) | 1 | 1000 | Runs horizontally along a wall for up to 1 second with halved gravity and `1.2×` movement speed. Tapping **[Q]**/**[LCTRL]** again while on the wall chains another wall run to build speed or stay aloft as long as you have moves remaining. |
| **Wall Climb** | **[Q]** or **[LCTRL]** while facing a wall head-on | 1 | 1000 | Runs vertically up a wall for up to 1 second when facing within 30° of the wall. Like Wall Run, you can tap **[Q]**/**[LCTRL]** again on the wall to climb higher. |
| **Wall Kick** | **[SPACE]** during a **Wall Run** or **Wall Climb** | 0 | 750 | Kicks off the wall in the direction you are aiming and moving, redirecting 100% of your speed. Does **not** use a move count segment and resets your mid-air **Impulse Boost** availability. |
| **Vault** | Reach the top of a ledge during a **Wall Climb** | 0 | 500 | Automatically vaults up and over a low obstacle or ledge at the end of a climb, preserving your momentum. Still functions with reduced force if you have less than 500 meter left, and allows jumping immediately out of the vault. |
| **Parkour Melee** | Collide with an enemy during a **Slide**, **Impulse Pound**, or while holding **[Q]**/**[LCTRL]** in mid-air | 0 | 500 | Performs a flying kick, slide kick, or downward stomp against the enemy, dealing heavy melee damage and knockback while bouncing you off them with a `1.3×` melee impulse that resets your mid-air **Impulse Boost**. |
| **Claw Grab** | **[MOUSE2]** with the **Claw** (`[1]`) against a wall or player | 0 | 500 (wall) / 250 (player) | The Claw's secondary attack grabs onto walls or enemies, launching you upward off a wall or pulling you toward a player (`2.0×` impulse) and resetting your mid-air **Impulse Boost**. |

## Weapons & Parkour

Your [weapons](Weapons-Guide) directly affect your mobility and open up additional movement techniques:

- **Weapon Weight & Speed**: Heavier weapons in your inventory increase your weight (making you fall faster) and reduce your movement speed, while firing, reloading, cooking, or zooming temporarily slows movement and impulse speed. Conversely, melee weapons like the **Energy Sword** and **Jetsaw** give a small speed and impulse boost during their secondary attacks and lunge you forward (`kickpush`).
- **Weapon Recoil Boosting**: Weapons with strong self-knockback—such as the **Flame Thrower** secondary airblast, **Shotgun**, **Plasma Inductor** secondary, **Rocket Launcher**, and **Frag Grenade**—can be fired opposite your travel direction in mid-air to extend airtime or gain bursts of speed. Crouching on the ground negates weapon recoil pushback.

## Movement Settings

Several parkour behaviours can be tailored to your preference under **Settings > Gameplay > Movement** and **Settings > Camera > Camera roll**:

| Setting | Variable | Options / Description |
| --- | --- | --- |
| **Crouch** | `crouchstyle` | **Hold** (default), **Double-tap**, or **Toggle** the crouch key. |
| **Walk** | `walkstyle` | **Hold** (default), **Double-tap**, or **Toggle** the walk key (if bound). |
| **Wall grab** | `grabstyle` | Direction Claw wall grabs throw you: **Look** (where you aim), **Inverted** (opposite pitch), or **Always up** (default). |
| **Player grab** | `grabplayerstyle` | Direction Claw player grabs throw you: **Look**, **Inverted**, **Always up**, or **Toward them** (default). |
| **Slide** | `impulsemethod` (bit 2) | Toggle whether holding Crouch while landing initiates a slide (enabled by default). |
| **Launch** | `impulsemethod` (bit 1) | Toggle whether pressing Jump during a slide performs an Impulse Launch (enabled by default). |
| **Impulse jump** | `impulseaction` (bit 1) | Toggle whether pressing Jump in mid-air triggers an upward impulse (enabled by default). |
| **Impulse boost** | `impulseaction` (bit 2) | Toggle whether holding movement keys during a mid-air Jump boosts you directionally (enabled by default). |
| **Slide / Wall run roll** | `firstpersonslideroll`, `impulseturnroll` | Adjust how far the camera tilts during slides and wall runs under **Settings > Camera > Camera roll**. |
