Eloquent Music Player
=====================

<img src="https://cdn.rawgit.com/samhunta/piffy/master/media/screenshot.png">

***Eloquent*** is a decentralized, pluggable, cloud music player built with [Web](https://github.io/piffy), [Desktop](https://github.com/rogerwang/node-webkit/wiki), I built of a couple years ago. I never got around to finishing it but most of the major pieces work.

[View demo](https://samhunta.github.io/piffy) (leave login empty)


```
# Install bower and npm dependencies
bower install && npm install
```

# Development

Run development web app:
```
npm run dev
```

Run development desktop app:
```
npm run dev-desktop
```

Create web distribution:
```
npm run dist
```

Create desktop distribution for OSX & Windows:
```
npm run dist-desktop
```

# Resources

[Node webkit package distribution](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps).

# Roadmap
  - [x] Decentralized
  - [x] Desktop support (Node-webkit)
  - [x] Mobile support (Cordova)
  - [x] Keyboard Navigation
  - [x] Multi select songs
  - [ ] Download support
  - [x] Drag drop to playlist
  - [ ] Deprecate node-webkit for electron
  - [ ] Deprecate all hacky angular code with React + Redux
  - [ ] Integrate [player.js](https://github.com/embedly/player.js)
  - [ ] Integrate videos

# Known Issues
  - [ ] Fix "Queue" playlist view
  - [ ]  