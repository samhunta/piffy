(function (undefined) {

  angular.module('app.controllers.sidebar', [
    'ui.router',
    'app.services.app.playlists',
    'app.services.app'
  ])  
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$timeout', '$window', '$rootScope', 'app', '$state', '$scope', '$state'];

  function SidebarController($timeout, $window, $rootScope, app, $state, $scope, $state) {
    $scope.$state = $state;
    $scope.app = app;

    $scope.sidebar = {
      createPlaylist: function (unshift) {
        var playlist = app.playlists.create({
          name: 'New playlist',
          songs: []
        }, unshift);

        playlist.editing = true;
        $state.transitionTo('app.player.playlist.user', { id: playlist._id });
      }
    };

    $scope.selectPlaylist = function (e) {
      playlist.selected = true;
    };

    $scope.$on('app:sidebarUpdate', function (e, location, id) {
      check(app.sidebarOpts);
      check(app.playlists);

      function check(obj) {
        var i = 0;
        for (; i < obj.length; i++) {
          if (
            app.sidebarNav.selected[0] !== obj[i]
            && obj[i].location === location
            && (id == null && obj[i]._id == null
               || ''+obj[i]._id == id)
          ) {
            $timeout(function () {
              app.sidebarNav.selected.splice(0, app.sidebarNav.selected.length);
              app.sidebarNav.selected.push(obj[i]);
            });
            break;
          }
        }
      }
    });

    $scope.$emit('app:sidebarUpdate', $state.current.name, $state.params.id);

    $scope.updateSelectables = function ($object, $selected) {
      $object.selected = $selected;
      app.tabsNav.selected.splice(0,1);
      
      if ($selected && ($state.current.name !== $object.location || $state.params.id !== $object.id)) {
        $state.go($object.location, { id: $object._id });
      }
    };

    $scope.finishEdit = function (playlist, value, save, refocus) {
      if (value === '' && playlist.songs.length === 0) {
        $window.history.back();
        app.playlists.remove(app.playlists.indexOf(playlist));
      }
      else {
        playlist.editing = false;
        playlist.selected = true;
        save(value);
        app.playlists.save();
      }
    };

  }

}());