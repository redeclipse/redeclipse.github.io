---
title: Editing - Models
layout: docs
origfile: editing/Models.md
origtitle: Models
permalink: /docs/editing/Models
redirect_from:
  - /wiki/editing/Models/
---
* TOC
{:toc}
# Models
## Importing Models
### Supported Formats
Redeclipse supports several model formats;
* OBJ (object wavefront)
* IQM (inter-quake model format)

Models that require a bone for positioning, or contain animations will need to be exported as IQM. We reccomend using Blender for 3D modelling, due to the IQM exporter.

An IQM exporter can be obtained here: [https://github.com/lsalzman/iqm](https://github.com/lsalzman/iqm)
Pick the lastest version of the plugin if using blender 3.0+.

### Configuration
Exported models are loaded using a config file. If using the obj format, you will need an obj.cfg file. When using IQM, you will need an iqm.cfg file.

An example obj.cfg:
```
// obj.cfg
objload path/to/mesh.obj
objskin * path/to/diffuse.png
objbumpmap * path/to/normal.png
mdlscale 1000
```
and similarly iqm.cfg:
```
// iqm.cfg
iqmload path/to/mesh.iqm
iqmskin * path/to/diffuse.png
iqmbumpmap * path/to/normal.png
mdlscale 250
```

### Examples
#### obj
This example uses a mesh exported for use as an obj model.

Within blender:
* Add a new mesh to the scene
* Export as obj

save your mesh.obj file to the same folder as your obj.cfg

A correctly configured example of a model can be found here; Download this [map](https://github.com/redeclipse/docs/raw/master/editing/monkey-map.rar) and [model](https://github.com/redeclipse/docs/raw/master/editing/monkey-model.rar). Extract the two folders to the root directory of your [local data folder](https://www.redeclipse.net/docs/FAQ#where-do-i-find-screenshots-logs-and-other-user-data). Load the example map in game with by running `map monkey` at the console. You should see Blender's default monkey mesh present within the map.

#### iqm
This example uses a mesh exported for use as an iqm model.

An IQM model requires at least one bone present.

Within blender:
* Add a new mesh to the scene
* Create an armature
* Select the mesh, then the armature together
* Pair with Ctrl + P, and select automatic weights

You can now export your model to iqm, make sure the mesh and the armature is selected. For now you can use the default settings within the exporter, save your mesh.iqm file to the same folder as your iqm.cfg

## Loading models
Models can be loaded into the game in various ways.

### Mapmodels
Mapmodels can be loaded into a map during an editing session by running `mmodel path/to/model`. You can then find it at the last index on the mapmodel entity. When saving the map, `mmodel path/to/model` will be automatically amended to the maps own cfg file. You can also manually edit the map config to register mapmodels for use in a map.

### Player Vanities
Vanities are defined in `vanities/package.cfg`, and need to be exported as IQM as per requiring a bone for positioning.
