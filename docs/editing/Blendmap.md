---
title: Editing: Blendmap
layout: docs
origfile: editing/Blendmap.md
origtitle: Blendmap
permalink: /docs/editing/Blendmap
redirect_from:
  - /wiki/editing/Blendmap/
---
* TOC
{:toc}

## Blendmap

| **What is a blendmap?** | |
|-|-|
A blendmap allows you to combine textures by overlapping them with a paint-able brush. This lets you create seamless environments where grass meets mud, or where gravel meets rock. Using this technique in a map can add a more natural feel to an environment. It can be used to add more variation to existing textures. The blendmap is stored within the map file itself. The following will explain how to add a blendmap to your map. | [![Blendmap](images/editing/blendmap01.jpg "Examples of blendmap usage")](images/editing/blendmap01.jpg) |

### Texture Layers

The first thing to do is create a layered texture. Within the editor, find the texture slot of a texture (can be viewed at the top left of the texture browser, starting with #) and apply this number to another texture using the `vlayer` command.

`/vlayer 123`

![Blendmap](images/editing/blendmap02.jpg "The texture browser")

If done correctly, the texture preview should show the layered texture at the upper right corner of the thumbnail.

#### Advanced Method

You can also add texture layers manually with the `texlayer` attribute within a map configuration file:

```
setshader bumpspecmapworld
setshaderparam specscale 0.500000 0.500000 0.500000 0.000000
texture 0 "philipk/pk02/sand01_c.png"
texture n "philipk/pk02/sand01_n.png"
texture s "philipk/pk02/sand01_s.png"
texscale 0.5
texlayer 249
```

### Painting

 Now that we have a layered texture, we are ready to start painting. Enable the blendbrush by pressing **[P]**. You can press **[P]** several times for different methods of applying the brush, such as erasing the blendmap or merging the blendmap.

- Scrolling the mouse wheel will enable you to change the brush shape and density, such as a square, circle or gradient.
- Right clicking will allow you to rotate the blendbrush.

**Brush modes:**

-   **1:** Blends both textures, but will overwrite existing blendmapping around the brush area (a square).
-   **2:** Blends textures, adding to the existing blendmap in place.
-   **3:** Erases the blendmap around the brush area (full erase).
-   **4:** Similar to \#1, except inverted: defaults to vlayer texture and paints base texture over it.
-   **5:** Similar to \#2, except removes the vlayer according to the brush, functioning as an eraser.

| **Using the brush** | |
|-|-|
Now that we have a layered texture, we can draw with our brush onto the blendmap. Simply click on the texture with the brush painting mode activated. Choosing "*blend mode: merge*" will allow you to paint the layered texture on top of the base texture. | [![Blendmap](images/editing/blendmap03.jpg "Painting with a blend brush")](images/editing/blendmap03.jpg) |

To exit the blendmap painting mode, press **P** until you see "*blend mode: off*" in the console.

If you can't see your blendbrush having any effect, try to first fix the existing blendmap by running either`/showblendmap` or `/calclight`.

Take note that when you modify cube geometry, the appearance of the blendmap will look broken. This can be easily fixed by re-running either of the above commands.

### Clearing the blendmap

The blendmap can be removed/reset with:

`/clearblendmap`

### Adding custom brushes

A blendbrush can easily be created with any greyscale image. The darker parts are drawn more densely than lighter parts.

| **Where do i place them?** | |
|-|-|
| The default brushes are stored in *data/blendbrush*. To add custom brushes, you will want to add them to *blendbrush/* in your [user data](FAQ#where-do-i-find-screenshots-logs-and-other-user-data) directory. | [![Blendmap](images/editing/blendmap04.jpg "A custom blendbrush used to paint stripes")](images/editing/blendmap04.jpg) |

### Dumping the blendmap

You can dump a greyscale image of the blendmap information to your [user data](FAQ#where-do-i-find-screenshots-logs-and-other-user-data). This can be used to quickly visualise which areas of your map have yet to be painted. The painted areas of the blendmap are represented by black pixels.

`/dumpblendtexs`

### Additional tips

-   You can only paint accurately on horizontal surfaces with a blendbrush. In can be very tricky to paint on a vertical surface (such as a vertical wall).
-   Stacked floors cannot have their own blendmap layer. For example, picture a block of apartments where each floor has a layered texture, the blendmap applied on any of the floors will also appear on every other floor where a layered texture is present.
-   The blendmap can be combined with [grass](grass "wikilink") rendering to create some awesome texture effects.
-   Blendmaps created with custom brushes can be viewed by other players even if they don't have the blendbrushes present in their User Content directory. The blendmap painting information is packed into the map file itself.
