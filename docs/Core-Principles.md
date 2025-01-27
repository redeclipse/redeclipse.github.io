---
title: Core Principles
layout: docs
origfile: Core-Principles.md
origtitle: Core-Principles
permalink: /docs/Core-Principles
redirect_from:
  - /docs/Core_Principles/
  - /wiki/Core_Principles/
---
* TOC
{:toc}

The core principles for how RE2 gameplay is designed. This does not cover the specific gameplay choices of the game, but instead is focused on the parameters the game has been attempted to be balanced upon. Red Eclipse's gameplay is not a unique solution to these parameters, but explaining what kinds of thoughts led to these decisions.

- This is a free game. All the engine code, the UI design and implementation, the maps, the assets, and the gameplay is made by volunteers.
    - Complaining about how you dislike the game is akin to walking into a soup kitchen and yelling at the volunteer cook.
    - "I think the broth is a little salty" is not a problem, but "WTF the last cook was doing a way better job and you've ruined it" is an unacceptable way to confront the people who work on the game.

### Gameplay Principles

1. Objects exist only if they have a gameplay reason to exist.
    - Redundant mechanics and arbitrarily applied assets are clutter and distracting.
    - This means weapons are all unique in how they affect how the game is played, not just their appearance.
    - Adding content to the game is not always a good thing. Collections of random stuff are easy to find and is not impressive by itself.
    - Ineffective weapons and mechanics are at best no more useful than their absence would be, and at worst misleading and distracting.

2. The game should allow most players to be above average at some aspect of gameplay.
    - This allows most players to feel competent at the game.
    - This means that the game needs to have multiple different, uncorrelated skills crucial to good gameplay, such as:
        - timing
        - accuracy
        - movement ability
        - spatial awareness
        - objective awareness

3. The skills and their relative weights contributing to being good at the game should remain relatively uniform across modes.

4. Good players do not determine how average players have to play the game.
    - Most potential players are approximately average at the relevant gameplay skills.
    - Pleasing the most vocal group of people does not necessarily represent the average player.
        - Data collected from a representative sample of the entire player base is the only useful way to conduct balance.
        - Data about how new players play and interact with the game is the most useful way to increase retention.

5. No weapon is good at everything.
    - Appropriate use of a counter weapon should determine the winner between the play of otherwise equal players.
    - Nobody's meta is protected, and no combination of weapons should overall be better than other combinations.
    - While maps clearly cannot be all balanced relative to each other, all maps should be viable for all weapons (though perhaps only efficiently in certain situations)

6. Assets need to telegraph what the object they represent does.
    - A long range, high damage rifle should be an impressive, long weapon that immediately explains what it does, for example.
    - Ambiguity is a gameplay flaw. An objective of the game design is for people to intuitively understand the game design without text explanations.
    - Players should not be expected to learn any more than is absolutely necessary to play the game.

7. Players cannot be expected to understand exactly how the sausage is made behind the scenes.
    - Messing with players' intuitions gained from other games (or from within the game) is dangerous and can lead to misunderstandings and confusion.
    - Players cannot be expected to understand connections between things that are not made explicitly clear.
    - Game between modes should always follow the exact same rules whenever possible, and never when it is not directly necessary for the mode.

8. Uniqueness does not trump gameplay and gameplay consistency.
    - Maps and weapons are gameplay features before they are interesting or cool-looking.
    - Players see through gimmicks and stick to competent, unexceptional maps over inconsistent, gimmicky, but cool-looking ones.

9. Realism should be admitted whenever possible.
    - People have good intuitions about how physics work and these intuitions should be entertained whenever it does not have to defer to the gameplay in order to meet the constraints of the other criteria.
    - Reality is a comfortable blanket, not a straitjacket. Video games are played to not have to deal with the inconvenient minutiae of real life.

### Pragmatic Constraints

1. Weapons and gameplay are designed for the game as it exists, not as it might be.
    - The game is not owed maps and future assets can't be counted on to exist until they actually exist.
    - Until such time has passed that the development team has coffers large enough to buy assets (which is not particularly likely), no work can be guaranteed in advance.
        - For this reason, being able to consistently execute tasks as promised and on time is very much more useful than scattershot completion of tasks whenever time or motivation is available.
    - Personal issues happen and in a volunteer situation you should expect that to have an impact from time to time and plan accordingly.

2. It is not realistic to claim that a small open source project can beat commercially funded games at what they do.
    - Mimicing the gameplay of other games means that they are in direct competition with the game, and the game then has to be better than those other games.
    - Games which have commercial funding should be looked at as the *absolute ceiling* of how well the game could do in that specific subgenre of AFPS.
        - This means that replicating failed games is the *peak* of how an open-source game in the same vein could do.
        - More successful commercial games are a good case study to understand why certain mechanics or combinations of mechanics succeed or fail.

3. The development team is not on a mission from God.
    - The game can only expect to succeed or fail on the merits of the actual game and not on other metrics.
    - This includes being open source. Most people don't care if a program is open source.
    - The development team is not especially privileged. Developers are ordinary people and are largely only capable of ordinary feats.

4. Losing a potential player to installation difficulties of UI navigation difficulties is always the game's fault.
    - The game cannot assume any computer skills on the behalf of the player.
    - The game cannot assume the user has read the documentation.
