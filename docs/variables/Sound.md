---
title: Variables - Sound
layout: docs
origfile: variables/Sound.md
origtitle: Sound
permalink: /docs/variables/Sound
redirect_from:
  - /wiki/variables/Sound/
---
* TOC
{:toc}
Volume, music, footsteps, and how sounds carry, echo and give way to the announcer.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `soundmastervol` | sets master sound volume (0=mute) | `value` |
| `soundeffectvol` | sets effect sound volume (0=mute) | `value` |
| `soundmusicmenuvol` | sets the music volume on the main menu (0=mute) | `value` |
| `soundmusicprogressvol` | sets the music volume on loading screens (0=mute) | `value` |
| `soundmusicintermissionvol` | sets the music volume during intermission (0=mute) | `value` |
| `soundmusicgamevol` | sets the music volume in game (0=mute) | `value` |
| `soundmusiceditvol` | sets the music volume in edit mode (0=mute) | `value` |
| `sounddevice` | sets the name of the sound device to be used | `value` |
| `soundlimiter` | keeps a loud mix from clipping by briefly turning it down | `value` |
| `footstepsounds` | determines which players' sounds are played, bitwise OR;<br>1: own footsteps<br>2: all other players' footsteps | `value` |
| `footstepsoundmin` | speed at which lower velocities take on the `footstepsoundmingain` value (scales linearly to `footstepsoundmaxgain` above this) | `value` |
| `footstepsoundmax` | speed at which higher velocities are capped at the `footstepsoundmaxgain` (scales linearly down below this) | `value` |
| `footstepsoundlevel` | scale of footstep sounds | `value` |
| `footstepsoundfocus` | scale of the player's own footstep sounds | `value` |
| `footstepsoundlight` | scale of footstep sounds while moving quietly (e.g. crouching) | `value` |
| `footstepsoundmaxgain` | gain of footsteps while at or above `footstepsoundmax` speed | - |
| `footstepsoundmingain` | gain of footsteps while at or below `footstepsoundmin` speed | - |
| `musictheme` | sets the music to play while not in a game | `file` |
| `musicintermission` | sets the music to play during intermission | `file` |
| `musictype` | 0 = no in-game music, 1 = map music (or random if none), 2 = always random, 3 = map music (silence if none), 4-5 = same as 1-2 but pick new tracks when done | `value` |
| `musicedit` | 0 = no editing music, 1 = map music (or random if none), 2 = always random, 3 = map music (silence if none), 4-5 = same as 1-2 but pick new tracks when done | `value` |
| `soundmapfloor` | sets how quiet a map sound's distance falloff gets before it has faded to nothing, as a fraction of its full volume; music that yields to it is back to full there and a streamed one stops being read (0 = map sounds carry on forever) | `value` |
| `soundmaxstreams` | sets how many streamed map sounds are read at once, the loudest first; any more are silent until there's room | `value` |
| `musicyield` | sets how far the music in a match gives way to map sounds that ask for it, such as a song playing from a place in the map (0 = never, 1 = down to silence at that sound's full volume) | `value` |
| `musicyieldspeed` | sets how quickly the music gives way to a map sound and returns, per millisecond | `value` |
| `soundeffectevent` | scales the volume of game sounds such as weapons, players and announcements, on top of soundeffectvol (0 = silent) | `value` |
| `soundeffectenv` | scales the volume of the map's own sounds, on top of soundeffectvol (0 = silent) | `value` |
| `soundmusicfadein` | time music in a match takes to fade in | `milliseconds` |
| `soundmusicfadeinfast` | time the menu, loading and intermission music takes to fade in | `milliseconds` |
| `soundmusicfadeout` | time music in a match takes to fade out | `milliseconds` |
| `soundmusicfadeoutfast` | time music takes to fade out for the menu, loading or intermission music | `milliseconds` |
| `soundduckfactor` | how loud other sounds stay while the announcer speaks, as a fraction of their volume (1 = not turned down) | `value` |
| `musicduckfactor` | how loud the music stays while the announcer speaks, as a fraction of its volume (1 = not turned down) | `value` |
| `soundduckattack` | how quickly sounds are turned down when the announcer starts speaking, per millisecond | `value` |
| `soundduckrelease` | how quickly sounds come back up after the announcer stops speaking, per millisecond | `value` |
| `sounddistfilter` | how much distant sounds are muffled, the more the further away they are (0 = never) | `value` |
| `soundoccluded` | how loud a sound blocked by the world stays, as a fraction of its volume (1 = not quieter) | `value` |
| `soundoccludedhf` | how much of its high end a sound blocked by the world keeps, as a fraction (1 = not muffled) | `value` |
| `sounddoppler` | strength of the Doppler effect, the change in pitch of sounds moving towards or away from you (0 = off) | `value` |
| `soundspeed` | speed of sound used for the Doppler effect (343.3 is its speed in air, in metres per second) | `value` |
| `soundrefdist` | distance within which sounds play at their full volume, from the next start | `value` |
| `soundrolloff` | distance over which sounds fade, from the next start; sounds that carry further fade more slowly | `value` |
| `soundmaxsources` | the most sounds that can play at once, from the next start | `value` |
| `soundefxgain` | scales how strongly the reverb and echo of sound environments are heard (0 = off) | `value` |
| `maxsoundefxslots` | the most sound environments, with their reverb and echo, that can be heard at once | `value` |
| `soundpreviewlength` | how long a sound previewed in a menu plays for | `milliseconds` |
| `mumble` | tells Mumble where you are and which way you face, so its positional audio places other players' voices | `boolean` |
| `music` | plays a music file, from the music directories, looping it if loop is 1 | `file [loop]` |
| `fademusic` | fades the music, with the fast fade times if fast is 1;<br>-2 = fade out, -1 = fade out unless already fading out, 1 = fade in unless already fading in, 2 = fade in, 0 = stop fading | `direction [fast]` |
| `previewsound` | plays a sound file once at the camera, as menus do to preview a sound | `file [gain]` |
| `resetsound` | restarts the sound system, needed for changes to sounddevice and the other settings read at the start | - |
