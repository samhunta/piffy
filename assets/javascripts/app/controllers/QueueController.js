(function () {
  
  angular.module('app.controllers.queue', [
    'app.models.song',
    'app.models.playlist',
    'app.services.app.playlists',
    'app.services.lastfmFeeds',
    'app.services.soundcloudControl',
    'app.services.actions.playerActions'
  ])

    .controller('QueueController', QueueController);

  QueueController.$inject = ['playerActions', '$rootScope', '$store', 'app', 'lastfmFeedsFactory', 'soundcloudControl', '$timeout', 'PlaylistModel', 'SongModel', 'playlists', '$scope'];

  function QueueController(playerActions, $rootScope, $store, app, lastfmFeedsFactory, soundcloudControl, $timeout, PlaylistModel, SongModel, playlists, $scope) {

    $store.bind('playerStore', $scope);

    $scope.app = app;

    $scope.playlistTable = {
      order: '-queuePosition'
    };

    $scope.totalResults = 0;
    $scope.itemsLoaded = 0;
    $scope.currentPage = 0;
    $scope.gotResults = false;
    $scope.columnWidths = app.columnWidths.playlist;

    $scope.$watch(function () {
      return $scope.$stores.playerStore.currentSong;
    }, function (song) {
      var playlist = $scope.$stores.playerStore.currentPlaylist;

      if (song != null && playlist != null) {
        $scope.playlist = playlist.copy(function (song) {
          return song._id !== $scope.$stores.playerStore.currentSong._id;
        });

        $scope.songs = $scope.playlist.songs();
      }
    });

    $scope.saveColumnWidths = function () {
      app.userSettings.set('columnWidths.playlist', $scope.columnWidths);
      app.userSettings.save();
    };

    $scope.songKeyBindings = {
      enter: 'playSong($event, song)'
    };

    $scope.playSong = function($event, song){
      if (! $event.ctrlKey && ! $event.metaKey) {
        $event.preventDefault();
        playerActions.setSong(song);
        playerActions.play();
      }
    };

    $scope.$on('shava:resize', function () {
      $scope.updateColumnWidths();
    });

    $scope.$on('$destroy', function () {
      if ($scope.playlist != null) {
        $scope.playlist.destroy();
      }
    });

    $scope.updateColumnWidths = function () {
      $scope.playlistHeaderWidth = $scope.columnWidths[0] +
        $scope.columnWidths[1] + $scope.columnWidths[2] +
        $scope.columnWidths[3];
    };

    $scope.selectableOpts = {
      onSelect: 'updateSelectables($object, $selected)',
      selectAll: true,
      multi: true,
      selected: []
    };

    $scope.updateSelectables = function (obj, selected) {
      obj.selected = selected;
    };

    $scope.updateColumnWidths();
  }

})(); 