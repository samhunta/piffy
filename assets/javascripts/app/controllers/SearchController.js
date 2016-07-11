(function () {
  
  angular.module('app.controllers.search', [
    'app.models.song',
    'app.models.playlist',
    'app.services.app.playlists',
    'app.services.lastfmFeeds',
    'app.services.soundcloudControl',
    'app.services.actions.playerActions'
  ])

    .controller('SearchController', SearchController);

  SearchController.$inject = ['searchTerm', '$state', 'playerActions', '$rootScope', '$store', 'app', 'lastfmFeedsFactory', 'soundcloudControl', '$timeout', 'PlaylistModel', 'SongModel', 'playlists', '$scope'];

  function SearchController(searchTerm, $state, playerActions, $rootScope, $store, app, lastfmFeedsFactory, soundcloudControl, $timeout, PlaylistModel, SongModel, playlists, $scope) {

    $store.bind('playerStore', $scope);

    $scope.app = app;

    $scope.totalResults = 0;
    $scope.itemsLoaded = 0;
    $scope.currentPage = 0;
    $scope.gotResults = false;
    $scope.playlist = new PlaylistModel('$queue');
    $scope.columnWidths = app.columnWidths.playlist;
    $scope.songs = $scope.playlist.songs();

    $scope.searchTerm = searchTerm;

    $scope.playlistTable = {
      order: '-rating',
      toggleSort: function (type) {
        if ($scope.playlistTable.order === '-'+type) {
          $scope.playlistTable.order = '+'+type;
        }
        else if ($scope.playlistTable.order === '+'+type) {
          $scope.playlistTable.order = null;
        }
        else {
          $scope.playlistTable.order = '-'+type;
        }
      }
    };

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
        playerActions.setPlaylist($scope.playlist, song);
        playerActions.play();
      }
    };

    $scope.$on('shava:resize', function () {
      $scope.updateColumnWidths();
    });

    $scope.$on('$destroy', function () {
      $scope.playlist.destroy();
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

    $scope.getResults = function () {
      $scope.isLoading = lastfmFeedsFactory('track.search', {
        track: searchTerm
      }, true).then(function (data) {
        data.results.trackmatches.track.forEach(function(track) {
          var images;

          images = track.image != null ? track.image.map(function (o) {
            return o['#text'];
          }) : [];

          $scope.playlist.add(SongModel('lastfm', {
            id: track.url,
            artist: track.artist,
            title: track.name,
            images: images,
            duration: Math.floor(Math.random()*270)+120,
            rating: Math.min(0, (50000 / track.listeners)*500)
          }));
        });
      });
    };



    $scope.updateSelectables = function (obj, selected) {
      obj.selected = selected;
    };

    $scope.getResults();
    $scope.updateColumnWidths();

  }

})(); 
