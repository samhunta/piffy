(function () {

  angular.module('app.services.youtubeControl', [])

    .factory('youtubeControl', ['$window', '$q', function ($window, $q) {
      var def = $q.defer();

      $window.onYouTubeIframeAPIReady = function(){
        def.resolve($window.YT);
      };
      
      return def.promise;
    }]);

})(); 