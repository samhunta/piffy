(function () {
  angular.module("app.services.soundcloudControl.soundcloudControlDirective", [])

    .directive("soundcloudControl", ["playerActions", "$store", function(playerActions, $store){
      var ytUrl = 'http://www.soundcloud.com/embed/?enablejsapi=1&controls=0&autoplay=0&showinfo=0&rel=0';

      return {
        restrict: "A",
        replace: true,
        template: '<div class="soundcloud-control"><div class="soundcloud-control-image" ng-if="artImg" ng-style="{backgroundImage: artImg}"></div></div>',
        scope: {
          player: "="
        },
        link: function (scope, element, attrs) {
          $store.bind('playerStore', scope);

          scope.$watch(function () {
            var song = scope.$stores.playerStore.currentSong;
            if (song != null) return song.id;
          }, function() {
            var newSong = scope.$stores.playerStore.currentSong;
            if (newSong != null && newSong.images.length > 0) {
              scope.artImg = 'url('+newSong.images[newSong.images.length-1]+')';
            }
            else {
              scope.artImg = null;
            }
          });
        }
      };

    }]);
})();