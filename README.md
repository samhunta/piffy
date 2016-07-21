# Piffy – Decentralized Cloud Media Player

<img src="https://cdn.rawgit.com/samhunta/piffy/master/media/screenshot.png">

**Piffy** is a hackable decentralized cloud media player for [Web](https://samhunta.github.io/piffy), [Desktop](https://github.com/rogerwang/node-webkit/wiki), and [Mobile](https://cordova.apache.org).

[View web demo](https://samhunta.github.io/piffy)

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
  - [ ] Fix "Queue" playlist view
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

# Changelog

v0.1.0-alpha

  - Public release

# Application Structure

This app is using custom legacy dependency injection resolvers in it's packager, the directory structure is pretty straight-forward.

```ruby
assets/javascripts
├── app
│   ├── config.js
│   ├── controllers
│   │   ├── AppController.js
│   │   ├── BrowseController.js
│   │   ├── DownloadsController.js
│   │   ├── HomeController.js
│   │   ├── LoginController.js
│   │   ├── PlayerController.js
│   │   ├── PlaylistController.js
│   │   ├── PreferencesController.js
│   │   ├── QueueController.js
│   │   ├── SearchBarController.js
│   │   ├── SearchController.js
│   │   ├── SidebarController.js
│   │   └── index.js
│   ├── directives
│   │   ├── index.js
│   │   ├── loader
│   │   │   └── loaderDirective.js
│   │   └── stars
│   │       └── starsDirective.js
│   ├── index.js
│   ├── models
│   │   ├── index.js
│   │   ├── playlist.js
│   │   └── song.js
│   ├── require.js
│   ├── routes.js
│   ├── services
│   │   ├── actions
│   │   │   ├── actions.js
│   │   │   └── playerActions.js
│   │   ├── app
│   │   │   ├── app.js
│   │   │   ├── auth.js
│   │   │   ├── caching.js
│   │   │   ├── index.js
│   │   │   ├── playlists.js
│   │   │   └── util.js
│   │   ├── constants
│   │   │   ├── constants.js
│   │   │   └── playerConstants.js
│   │   ├── downloads
│   │   │   └── downloads.js
│   │   ├── freebase
│   │   │   └── freebase.js
│   │   ├── index.js
│   │   ├── lastfmFeeds
│   │   │   └── lastfmFeeds.js
│   │   ├── player
│   │   │   └── player.js
│   │   ├── soundcloudControl
│   │   │   ├── soundcloudControl.js
│   │   │   └── soundcloudControlDirective.js
│   │   ├── stores
│   │   │   ├── playerStore.js
│   │   │   └── stores.js
│   │   ├── youtubeControl
│   │   │   ├── youtubeControl.js
│   │   │   └── youtubeControlDirective.js
│   │   └── youtubeFeeds
│   │       └── youtubeFeeds.js
│   ├── settings.js
│   └── templates
│       ├── app.html
│       ├── browse.html
│       ├── controversial.html
│       ├── downloads.html
│       ├── home.html
│       ├── index.js
│       ├── loader.html
│       ├── login.html
│       ├── player.html
│       ├── playlist.html
│       ├── preferences.html
│       ├── queue.html
│       ├── search.html
│       ├── searchBar.html
│       ├── sidebar.html
│       └── star-rating.html
├── lib
│   ├── angular-vs-repeat.min.js
│   ├── stub.js
│   └── underscore.js
└── shava
    ├── Event.js
    ├── directives
    │   ├── autofocus
    │   │   └── autofocusDirective.js
    │   ├── columns
    │   │   ├── columnDirective.js
    │   │   ├── columnsController.js
    │   │   └── columnsDirective.js
    │   ├── dropdown
    │   │   └── dropdownDirective.js
    │   ├── editable
    │   │   └── editableDirective.js
    │   ├── fixedScroll
    │   │   └── fixedScrollDirective.js
    │   ├── focusable
    │   │   ├── focusable.js
    │   │   ├── focusableController.js
    │   │   └── focusableDirective.js
    │   ├── include
    │   │   └── includeDirective.js
    │   ├── index.js
    │   ├── key
    │   │   └── keyDirective.js
    │   ├── nav
    │   │   ├── navController.js
    │   │   ├── navDirective.js
    │   │   └── navValueDirective.js
    │   ├── range
    │   │   ├── rangeDirective.js
    │   │   └── rangeSliderDirective.js
    │   ├── rightClick
    │   │   └── rightClickDirective.js
    │   ├── scrollarea
    │   │   ├── scrollareaController.js
    │   │   └── scrollareaDirective.js
    │   ├── selectables
    │   │   ├── selectableDirective.js
    │   │   ├── selectables.js
    │   │   ├── selectablesController.js
    │   │   └── selectablesDirective.js
    │   ├── sorter
    │   │   ├── sorterController.js
    │   │   ├── sorterDirective.js
    │   │   └── sorterItemDirective.js
    │   └── undoStack
    │       ├── undoStack.js
    │       └── undoStackDirective.js
    ├── index.js
    ├── loader.js
    ├── nw-gui.js
    └── services
        ├── action
        │   ├── action.js
        │   └── constants.js
        ├── contextMenu
        │   └── contextMenu.js
        ├── ctrlTabs
        │   └── ctrlTabs.js
        ├── dispatcher
        │   └── dispatcher.js
        ├── index.js
        ├── nwSupport
        │   ├── nwGui.js
        │   └── nwSupport.js
        ├── sessions
        │   ├── localStorageAdapter.js
        │   └── sessions.js
        ├── settings
        │   └── settings.js
        ├── store
        │   └── store.js
        ├── undo
        │   └── undo.js
        └── util
            ├── debounce.js
            ├── deepMerge.js
            ├── driver.js
            ├── jquery.js
            ├── mixin.js
            ├── util.js
            └── watchChange.js
```

# Contributors

The original author of Piffy is [Sam Hunter](https://github.com/samhunta)

This project is currently seeking a lead adopter

[List all contributors](https://github.com/samhunta/piffy/graphs/contributors)

# License

MIT (http://www.opensource.org/licenses/mit-license.php)
