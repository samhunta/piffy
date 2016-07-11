(function(){

angular.module("app.services.player", [
  "app.models.playlist",
  "app.services.soundcloudControl",
  "app.services.youtubeControl",
  "shava.services.util.mixin",
  "shava.services.dispatcher",
  "app.services.actions.playerActions",
  "app.services.constants.playerConstants"
])

  .factory("playerFactory", [
          "$window", "playerConstants", "playerActions", "PlaylistModel", "$log", "soundcloudControl", "mixin", "$q", "youtubeControl",
  function($window,   playerConstants,   playerActions,   PlaylistModel,   $log,   soundcloudControl,   mixin,   $q,   youtubeControl){
    
    return angular.noop;

  }]);

}());