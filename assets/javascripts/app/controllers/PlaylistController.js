(function () {
  
  angular.module('app.controllers.playlist', [
    'app.services.app',
    'app.services.app.playlists',
    'ui.router'
  ])

    .controller('PlaylistController', PlaylistController);

  PlaylistController.$inject = ['$scope', 'app', '$state'];

  function PlaylistController($scope, app, $state) {

  }

})(); 