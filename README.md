# 504 Almanac #

The 504 Almanac is an experiment in navigating publicly-available information about the worlds of the board game 504, most of which is on websites where the navigation is difficult or obscure.  This portal-like page provides a big, easy-to-use, mobile-friendly navigation UI as well as simple URL navigation.

If you're unfamiliar with 504 or want more details about the almanac, look here:  http://mcdemarco.net/tools/504/

## Demo ##

A demo is available at http://mcdemarco.net/504almanac/

To navigate directly to a world, e.g., 456, use:  http://mcdemarco.net/504almanac/#456

## Build ##

To build your own static site (requires node):

1. Clone the project with Mercurial or SourceTree
2. cd into the repository directory at the command line
3. `npm install`
4. `npm run start`
5. Open dist/index.html.

Note that Chrome may object to opening index.html from the filesystem.  In that case you should serve the set of static files from a webserver, or remove the offending code (something optional having to do with the page history), or use a different browser.


## Credits & License ##

* Code by M. C. DeMarco.
* Draggable balls from [React Motion](https://github.com/chenglou/react-motion) by Cheng Lou.
* Icons by Font Awesome.
* Background by [SVGeneration](http://www.svgeneration.com/recipes/Sun-Blast).
* MIT License
