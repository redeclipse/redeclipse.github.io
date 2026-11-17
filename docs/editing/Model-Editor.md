---
title: Editing - Model Editor
layout: docs
origfile: editing/Model-Editor.md
origtitle: Model-Editor
permalink: /docs/editing/Model-Editor
redirect_from:
  - /docs/editing/Model_Editor/
  - /wiki/editing/Model_Editor/
---
* TOC
{:toc}
## What it's for

The Model Editor shows a model with other models attached to it, and lets you move, turn and scale each of them while you watch. It's for lining things up: a vanity on a player's head, a weapon or glove in the first person hands, an attachment on a new tag. Without it, each try means editing the model's config, saving, running `/clearmodel` and looking again.

Nothing you change in the editor touches the model's files. When the placement looks right, save it to a file in your home folder and copy the lines you need into the model's own config. Closing the editor puts every model back as its files have it; if you've changed anything since you last saved, it asks first, offering to save and leave, leave without saving, or stay.

The editor can't be used while connected to a server, and connecting puts every model back.

## Opening it

Choose **Dev Tools** in the main menu, then **Model Editor**, or type `/modeleditor` in the console. `/modeleditor <model>` opens it on that model, such as `/modeleditor actors/player/male/hwep`.

The editor remembers what you had on screen (the host model, its attachments and animation, and the save file) for next time.

## The host model and its attachments

The left side of the editor lists what's on screen. Lists to choose from, such as models, tags and vanities, open at the foot of it, with a field to filter them and **Cancel** to close them.

- **Host model** is the model the others attach to. Click its name to tune it, or **Change host** to pick another. The list offers the player bodies, the first person hands and the janitor, then every model loaded so far; type to filter it, or type a model's path and choose **Load** to load one that isn't. During a match hundreds of models can be loaded, so the list shows the first 150 that match and says how many more there are.
- **Attachments** are models shown on one of the host model's tags, listed as `tag : model`. Click one to tune it, or **x** to take it off. To move the selected attachment to another of the host's tags, choose **Change tag** at the top of the right side.
- **Add attachment** asks for a model, the same way as the host, and then for one of the host's tags. A tag the host doesn't have can be typed in, but nothing shows until the host has that tag.
- **Add vanity** lists the vanities. It picks the version of the vanity made for the host's body (male, female or janitor), with your own head on a player body, and puts it on the vanity's tag, as the game would.

## Seeing it

The model turns when you drag it, moves when you drag with the right mouse button, and zooms with the wheel. **Reset view** puts the view back.

**First person** shows the host from where the first person camera sees it, through the same field of view (`firstpersondepthfov`), so the hands and anything in them look as they do in play. Use it with `actors/player/male/hwep` or `actors/player/female/hwep` as the host. The view can't be turned or zoomed in first person, as the camera stays where the game has it, but it can still be moved with the right mouse button.

**Animation** picks one of the host's animations, which the attachments follow as they do in game. A new host starts on `idle` when it has one. **Pause** holds the animation and shows a **Time** slider to hold it at any moment, such as the middle of a swing.

## Placement

The right side tunes whichever model you clicked: the host or an attachment. Its **Placement** tab holds the same values as the model's config commands.

| Value | Command | What it does |
| --- | --- | --- |
| Scale % | `mdlscale` | The model's size, in percent |
| X, Y, Z | `mdltrans` | Moves the model from its origin |
| Yaw | `mdlyaw` | Turns the model around its up axis |
| Pitch | `mdlpitch` | Tips the model forward or back |
| Roll | `mdlroll` | Rolls the model to one side |

Each value has a slider, **-** and **+** buttons, and a field to type it in. **Step**, above both tabs, sets how far the buttons and slider move: fine, normal or coarse (0.01, 0.1 or 1 for distances, 1, 5 or 15 degrees for angles, and 1, 5 or 25 percent for scale).

A change applies to the model everywhere it's drawn, not only in the editor, until the editor closes.

## Tags

The **Tags** tab lists the selected model's tags and the bone each one is on. Click a tag to move it (X, Y, Z) and turn it (Rot X, Rot Y, Rot Z); anything attached to it moves with it. Tags on models without bones (MD2, MD3 and OBJ) are listed but can't be changed.

**Add tag** adds a tag to a model with bones (IQM, MD5 or SMD). Pick the bone, name the tag, and choose **Add tag**. It starts on the bone with no offset; attach something to it to see where it is.

Models that share a skeleton share its tags, so a tag added to `actors/player/male/hwep` is on the female hands too.

## Saving

**Save** writes every model on screen to the file named beside it, `mdledit.cfg` in your home folder unless you change it. The file has a block for each model, headed by the model's path, with its `mdlscale`, `mdltrans`, `mdlyaw`, `mdlpitch` and `mdlroll` lines and a line for each of its tags (`iqmtag`, `md5tag` or `smdtag`):

```
// vanities/afro/head/default/male
mdlscale 136.0
mdltrans 0.0 0.75 0.55
mdlyaw 180.0
mdlpitch 0.0
mdlroll -10.0
```

Copy the lines you changed into the model's config, over the lines they replace. **Copy this model** puts the selected model's block on the clipboard instead.

**Revert this model** puts the selected model back as its files have it, along with any tags you changed or added to its skeleton.

## See also

- [Models](Models) - Importing models and their configs.
