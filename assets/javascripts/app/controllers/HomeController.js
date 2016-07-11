(function () {
  
  angular.module('app.controllers.home', [
    'app.models.song',
    'app.models.playlist',
    'app.services.app.playlists',
    'app.services.lastfmFeeds',
    'app.services.soundcloudControl',
    'app.services.actions.playerActions'
  ])

    .controller('HomeController', HomeController);

  HomeController.$inject = ['playerActions', '$rootScope', '$store', 'app', 'lastfmFeedsFactory', 'soundcloudControl', '$timeout', 'PlaylistModel', 'SongModel', 'playlists', '$scope'];

  function HomeController(playerActions, $rootScope, $store, app, lastfmFeedsFactory, soundcloudControl, $timeout, PlaylistModel, SongModel, playlists, $scope) {

    $store.bind('playerStore', $scope);

    $scope.app = app;

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

    $scope.totalResults = 0;
    $scope.itemsLoaded = 0;
    $scope.currentPage = 0;
    $scope.gotResults = false;
    $scope.playlist = new PlaylistModel('$queue');
    $scope.columnWidths = app.columnWidths.playlist;
    $scope.songs = $scope.playlist.songs();

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
      $scope.isLoading = lastfmFeedsFactory('geo.getmetrouniquetrackchart', {
        country: 'united states',
        metro: 'los angeles'
      }, true).then(function (data) {
        var rating = 5.0;

        data.toptracks.track.forEach(function(track) {
          rating -= 0.041;

          images = track.image != null ? track.image.map(function (o) {
            return o['#text'];
          }) : [];
          
          $scope.playlist.add(SongModel('lastfm', {
            artist: track.artist.name,
            title: track.name,
            images: images,
            duration: parseInt(track.duration) || 0,
            id: track.url,
            rating: rating
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