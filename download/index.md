---
title: Downloads
layout: default
permalink: /download
redirect_from:
  - /torrent
---

# v{{ site.data.game.version }} ({{ site.data.game.release }})
### Released {{ site.data.game.date }}

The best way to play Red Eclipse is by downloading it through <span class="fab fa-steam" aria-hidden="true"></span> **Steam**. It is free of charge, and you will get the latest updates automatically, as well as have Steam features available in-game. If you'd rather not use <span class="fab fa-steam" aria-hidden="true"></span> **Steam** (as described above), you can still download a static installable package, but please note that only the Linux AppImage provides automatic updates, any other version will require you to update your installation manually each release. The Red Eclipse team does not provide support for outdated versions of the software.

Platform                                                             | Downloads                           | Other Sources
---------------------------------------------------------------------|-------------------------------------|-------------------------------------
<span class="fab fa-steam" aria-hidden="true"></span> **Steam**  | **[Store Page](/steam)**      | -
<span class="fab fa-windows" aria-hidden="true"></span> **Windows**  | **[Installer](/download/win)**      | [Torrent](/download/torrent/win) - [ZIP](/download/zip)
<span class="fab fa-linux" aria-hidden="true"></span> **Linux/BSD**  | **[TAR.BZ2](/download/nix)**        | [Torrent](/download/torrent/nix)
<span class="fab fa-apple" aria-hidden="true"></span> **macOS**      | **[TAR.BZ2](/download/mac)**        | [Torrent](/download/torrent/mac)
<span class="fas fa-archive" aria-hidden="true"></span> **Combined** | **[TAR.BZ2](/download/combined)**   | [Torrent](/download/torrent/combined)

**[Installation Help](/docs/Install-Guide)**

### System Requirements
Red Eclipse 2 requires a fairly modern graphics card to run, but is otherwise quite tolerant of hardware specifications. If you find you can't run the game due to insufficient hardware, you might want to try the [last release of Red Eclipse v1.6](https://github.com/redeclipse/base/releases/tag/v1.6.0) which runs on Cube Engine 2 alone without the modern renderer from Tesseract.

#### MINIMUM
* Processor: Intel Pentium Dual-Core E2180 / AMD Athlon 64 X2 4200+
* Memory: 2 GB RAM
* Graphics: Intel HD 630 / Nvidia GeForce GT 630 / AMD Radeon HD 5750
* Storage: 2 GB available space
* Additional Notes: OpenGL 2.0 with GLSL 1.20

#### RECOMMENDED
* Processor: Intel Core i3-530 / AMD Athlon II X2 260
* Memory: 4 GB RAM
* Graphics: Nvidia GeForce GTX 950 / AMD Radeon RX 460
* Storage: 3 GB available space
* Additional Notes: OpenGL 3.0 with GLSL 1.30

### Release Notes

{% include release.md %}

You can view the entire release [on GitHub](https://github.com/redeclipse/base/releases/tag/v{{ site.data.game.version }}).
