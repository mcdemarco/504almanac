# 504 Almanac #

The 504 Almanac is an experiment in navigating publicly-available information about the worlds of the board game 504, most of which is on websites where the navigation is difficult or obscure.  This portal-like page provides a big, easy-to-use, mobile-friendly navigation UI as well as simple URL navigation.

If you're unfamiliar with 504 or want more details about the almanac, look here:  http://mcdemarco.net/tools/504/

## Demo ##

A demo is available at http://mcdemarco.net/504almanac/

To randomize with the keyboard, press `r`.
To navigate directly to a world, e.g., 456, use:  http://mcdemarco.net/504almanac/#456

## Features ##

### Version 2.0.1a ###

Link fix for the official review site.  Note that BoardGameGeek has removed the tagging functionality from threads (where most 504 discussions occur) and, though there may be [a workaround](https://boardgamegeek.com/thread/2827771/article/39633053#39633053), BGG tags for worlds are therefore not up-to-date.

### Version 2.0 ###

New in version 2.0, the Almanac incorporates some (static, local, aggregate) information about ratings and tags in order to randomize to particularly good worlds, bad worlds, discussed worlds, and as-yet unexplored worlds.  These are accessed with the button row above the world name; the center button is still a simple randomizer.

BGG links now go to both a forum text search for the world (or partial world description, e.g., 12x) at [BoardGameGeek](https://boardgamegeek.com/boardgame/175878/504), and, separately, a tag search for the world there.  The tag count is included, but not necessarily up to date. 

### Version 1.1.1 ###

The dialer UI was changed from dragging to clicking or typing.

### Version 1.1 ###

Various fixes for mobile.

### Version 1.0 ###

The dialer brings up links individual pages for rating each world at [the official 504 website](https://504.2f-spiele.de), rules for each world at the unofficial (but adequately blessed) [rules site](http://504rules.github.io/), and a tag search for the world (or partial world description, e.g., 12x) at [BoardGameGeek](https://boardgamegeek.com/boardgame/175878/504).  All links are to off-site information.

The dialer required dragging.


## Build ##

To build your own static site (requires node):

1. Clone the project
2. cd into the repository directory at the command line
3. `npm install`
4. `npm run start`
5. Open dist/index.html.

Note that Chrome may object to opening `index.html` from the filesystem.  In that case you should serve the set of static files (under `dist/`) from a webserver, or remove the offending code (something optional having to do with the page history), or use a different browser.


## Credits & License ##

* Code by M. C. DeMarco.
* Draggable balls from [React Motion](https://github.com/chenglou/react-motion) by Cheng Lou.
* Icons by Font Awesome.
* Background by [SVGeneration](http://www.svgeneration.com/recipes/Sun-Blast).
* MIT License
