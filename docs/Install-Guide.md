---
title: Install Guide
layout: docs
origfile: Install-Guide.md
origtitle: Install-Guide
permalink: /docs/Install-Guide
redirect_from:
  - /docs/Install_Guide/
  - /wiki/Install_Guide/
---
* TOC
{:toc}
## Windows
- [Download the installer](/download/windows) and run it.
- Follow the installation prompts.
- You can now access Red Eclipse from your start menu.

If you get a permission denied error during install, right click the installer and Run as Administrator. Alternatively, you can change the install location to a user-writable folder (like "[My] Documents") during the install process.

## GNU/Linux or BSD
### AppImage
- [Download the stable AppImage](/download/appimage)
- After download, give the AppImage executable permissions through your file manager or using the terminal command `chmod +x redeclipse-*.AppImage`
- You can then run Red Eclipse by double-clicking the AppImage or executing it from a terminal.

[More information and options](AppImages).

### Standard Package
- Install Red Eclipse's dependencies.
    - Debian/Ubuntu: `sudo apt-get install curl libsdl2-mixer-2.0-0 libsdl2-image-2.0-0 libsdl2-2.0-0`
    - Fedora: `dnf install curl SDL2 SDL2_mixer SDL2_image`
- [Download the tarball](/download/linux), move it to your home directory, and extract it with your file manager, an archive utility, or the terminal command `tar -jxvf redeclipse_X.Y.Z_nix.tar.bz2`.
- Enter the extracted folder (redeclipse-X.Y.Z) and run `redeclipse.sh` to launch Red Eclipse.

## macOS
There are no official macOS packages, but you can build the game yourself by following [Building from Source](#building-from-source). macOS support has only recently returned and has not been tested by the developers yet, so please report any problems on our [Discord](/discord) or [Discussions](/discuss).

## Building from Source
Building from source gives you the latest development version of the game on GNU/Linux, BSD or macOS.

### Dependencies
- Debian/Ubuntu: `sudo apt-get install build-essential git pkg-config libsdl2-dev libsdl2-image-dev libopenal-dev libsndfile1-dev libfreetype-dev zlib1g-dev libx11-dev libgl-dev`
- Fedora: `sudo dnf install gcc-c++ make git pkgconf SDL2-devel SDL2_image-devel openal-soft-devel libsndfile-devel freetype-devel zlib-devel libX11-devel mesa-libGL-devel`
- Arch: `sudo pacman -S base-devel git pkgconf sdl2 sdl2_image openal libsndfile freetype2 zlib libx11 libglvnd`
- macOS: install the Xcode command line tools with `xcode-select --install` and [Homebrew](https://brew.sh), then `brew install pkg-config sdl2 sdl2_image openal-soft libsndfile freetype`

### Compile and Run
- Clone the repository and its submodules with `git clone --recurse-submodules https://github.com/redeclipse/base`
- Enter the working directory with `cd base`
- Compile with `make -C src install -jN`, with `-jN` being set to the number of cores your CPU has (e.g. `-j4` for a quad core system)
    - On BSD, use `gmake` instead of `make`
- Run the game with `./redeclipse.sh`

To update later, run `git pull` and `git submodule update --init` in the `base` folder, then compile again.

### CMake and Xcode
The game can also be built with [CMake](https://cmake.org), which can generate an Xcode project on macOS:
- Configure with `cmake -S src -B build`, adding `-G Xcode` on macOS to generate an Xcode project in the `build` folder
- Compile and install with `cmake --build build` followed by `cmake --install build`, or build the `install` target in Xcode
- Run the game with `./redeclipse.sh`

## If you get stuck
Don't panic! If you have trouble working out how to install and run the game, you can get assistance on our [Discord](/discord) or [Discussions](/discuss). Please be ready to provide as much information as possible, especially what operating system you're on and specifically which package you're trying to install!

## Important Notice About Unofficial Packages
Red Eclipse is available only through the official installation methods described on this page or via **[Steam](/steam)**.
Packages found on Flathub, Snap, Flatpak, AUR, Linux distribution repositories, the Ubuntu Software Store, or any other third-party source are not official, not maintained, and not supported by the Red Eclipse development team.
These unofficial packages may be outdated, incomplete, or insecure, and can cause issues that we cannot assist with.
For the best experience and to ensure you're receiving verified, up-to-date builds, please install Red Eclipse exclusively through the official methods provided here or via **[Steam](/steam)**.
