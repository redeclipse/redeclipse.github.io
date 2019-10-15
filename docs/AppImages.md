---
title: 
layout: docs
origfile: AppImages.md
origtitle: AppImages
permalink: /docs/AppImages
redirect_from:
  - /wiki/AppImages/
---
* TOC
{:toc}
The Red Eclipse project provides [AppImage](https://appimage.org) builds that should work on any recent Linux distribution as an easy, dependency-free way to install and run the game.

## Available AppImages
* [Stable version](/appimage/stable)
* [Development version](/appimage/master)

### File names
* Client: `redeclipse-<BRANCH>-x86_64.AppImage`.
* Server: `redeclipse-server-<BRANCH>-x86_64.AppImage`.

## Basic instructions
* Download the AppImage.
* After download, give the AppImage executable permissions through your file manager or using the terminal command `chmod +x redeclipse-*.AppImage`
* You can then run Red Eclipse by double-clicking the AppImage or executing it from a terminal.

## Advanced Options
You can set the following environment variables to configure the AppImage's behaviour:
* `REDECLIPSE_APPIMAGE_NO_UPDATE`
  * If set, will prevent automatic updating.
* `REDECLIPSE_APPIMAGE_NOTERM`
  * If set, will prevent the automatic updating from opening a terminal to display progress.
* `REDECLIPSE_APPIMAGE_TERM`
  * If set, will use the value of this variable as the terminal program to display update progress.
