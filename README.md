[WIP]

Piffy – Decentralized Media Player
=====================

<img src="https://cdn.rawgit.com/samhunta/piffy/master/media/screenshot.png">

**Piffy** is a hackable decentralized cloud music player built for [Web](https://github.io/piffy), [Desktop](https://github.com/rogerwang/node-webkit/wiki), and [Mobile](https://cordova.apache.org).

[View demo](https://samhunta.github.io/piffy)

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
  - [ ] **WRITE TESTS AND SWITCH TO REACT + ELECTRON**
  - [ ] Theme support
  - [ ] Add Babel
  - [ ] Add ESLint and Style Guide
  - [ ] Web context menu polyfill/shim
  - [ ] Deprecate node-webkit for electron
  - [ ] Integrate [player.js](https://github.com/embedly/player.js)
  - [ ] Integrate video support
  - [ ] Add video torrent search
  - [ ] Add URL loader
  - [ ] Fire TV launcher
  - [ ] Chromecast launcher
  - [ ] Chrome sync extension
  - [ ] Search (<s>Soundcloud</s>, <s>YouTube</s>, Torrents Plugins, RSS Plugins, XBMC Plugins)
  - [x] Decentralized
  - [x] Sort playlist
  - [x] Multiple search tabs
  - [x] Desktop support (Node-webkit)
  - [x] Mobile support (Cordova)
  - [x] Web support
  - [x] Local settings
  - [x] Sync settings with self-hosted piffy server
  - [x] LEET Keyboard bindings
  - [x] Multi select songs
  - [x] Download view
  - [x] Drag drop to playlist

# Known Issues
  - [ ] Fix "Queue" playlist view
  - [ ] Kill Angular
  - [ ] Kill Node-Webkit
