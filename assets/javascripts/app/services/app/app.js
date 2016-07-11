(function () {

  angular.module("app.services.app", [
    "ng",
    "shava.services.sessions",
    "shava.services.nwSupport",
    "app.services.player",
    "app.models.playlist",
    "app.services.app.playlists",
    "app.services.youtubeControl",
    "shava.services.settings"
  ])

    .service("app", appFactory);

  appFactory.$inject = [
    "shavaSessionsFactory",
    "shavaNwGui",
    "shavaSettingsFactory",
    "playlists",
    "PlaylistModel",
    "youtubeControl",
    "$timeout",
    "$sce"
  ];

  function appFactory(
    shavaSessionsFactory,
    shavaNwGui,
    shavaSettingsFactory,
    playlists,
    PlaylistModel,
    youtubeControl,
    $timeout,
    $sce
  ) {

    // App factory
    var app = {};

    // Playlists
    app.playlists = playlists;

    // Sidebar Options
    app.sidebarOpts = [
      { location: "app.player.index", label: "Hot This Week" },
      { location: "app.player.controversial", label: "New Releases" },
      { location: "app.player.downloads", label: null },
      { location: "app.player.browse.music", label: "Browse" },
      { location: "app.player.playlist.queue", label: null },
      { location: "app.player.browse.videos", label: "Browse TV & Movies" },
      { location: "app.player.browse.games", label: "Browse Games" },
      { location: "app.player.browse.books", label: "Browse Books" }
    ];

    // Sidebar `shSelectables` navigation options
    app.sidebarNav = {
      onSelect: "updateSelectables($object, $selected)",
      selectEvent: "mousedown",
      toggleable: false,
      selected: [],
      multi: false,
      id: "sidebarNav"
    };

    // Toggle dev tools through the shava nw.gui shim
    app.toggleDevTools = function () {
      if (app.settings.get("debug")) {
        shavaNwGui.Window.get().showDevTools();
      }
    };

    // App settings
    app.settings = shavaSettingsFactory("app");

    // The default user settings namespace is 0
    // When the user logs in this instance
    app.userSettings = shavaSettingsFactory("user-0");

    // For main `appLoader` directive
    app.isLoading = false;

    // Column widths, changable with `shColumns` directive
    app.columnWidths = app.userSettings.get("columnWidths");

    // Bind array to localStorage with autosave = `true`
    app.tabs = shavaSessionsFactory.bindArray("tabs", true);

    // Tabs `shSelectables` navigation options
    app.tabsNav = {
      onSelect: "setTab($object, $selected)",
      bindVertical: false,
      bindHorizontal: true,
      multi: false,
      selected: []
    };

    // Return our app singleton!
    return app;
  }
  
})(); 