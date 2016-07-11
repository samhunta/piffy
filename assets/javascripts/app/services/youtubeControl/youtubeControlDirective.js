(function () {
  angular.module("app.services.youtubeControl.youtubeControlDirective", [])

    .directive("youtubeControl", function(){
      var ytUrl = 'http://www.youtube.com/embed/?enablejsapi=1&controls=0&autoplay=0&showinfo=0&rel=0';

      return {
        restrict: "A",
        replace: true,
        template: '<div class="youtube-control"><iframe nwdisable nwfaketop type="text/html" width="100%" height="100%" src="'+ytUrl+'" frameborder="0"></iframe></div>',
        scope: {
          player: "="
        },
        link: function (scope, element, attrs) {
          scope.player.bindElement(element.children(0));
        }
      };

    });
})();