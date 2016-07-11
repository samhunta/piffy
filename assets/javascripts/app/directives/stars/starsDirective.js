(function () {
  angular.module('app.directives.stars', [])
    .directive('appStars', function() {

      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/templates/star-rating.html',
        scope: {
          value: '=value'
        },
        link: function (scope, element, attrs) {
          var floored = Math.floor(scope.value);
          var dec = Math.floor((scope.value - floored) * 10);
          if (dec <= 2) {
            scope.rating = floored;
          }
          else if (dec >= 8) {
            scope.rating = Math.ceil(scope.value);
          }
          else {
            scope.rating = floored + 0.5;
          }
        }
      };

    })
})(); 