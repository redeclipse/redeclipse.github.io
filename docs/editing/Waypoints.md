---
title: Editing: Waypoints
layout: docs
origfile: editing/Waypoints.md
origtitle: Waypoints
permalink: /docs/editing/Waypoints
redirect_from:
  - /wiki/editing/Waypoints/
---
* TOC
{:toc}

Waypoints are used to allow bots to navigate through a map. They are hidden by default, but can be viewed by setting `/showwaypoints 1`. 

Creating waypoints for a map is as simple as `/dropwaypoints 1` and then traversing around the map. The waypoints are represented by purple nodes which are linked together, your character will drop these as you move around.

The `aiclip` material can be used to prevent creation of waypoint nodes in specific areas of the map (such as when the player jumps into a lava pit).

Waypoints can be saved by running `/savewaypoints`.

When a match is in play, but there are no waypoints existing within the current map, players will automatically drop waypoint nodes over time which helps the bots to navigate around, causing the bots to follow previous paths made by real players.
