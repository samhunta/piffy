(function () {
  
  angular.module('shava.directives.rightClick', [])

    .directive('shRightClick', shRightClick);

  shRightClick.$inject = ['$window', '$parse', '$timeout'];

  function shRightClick($window, $parse, $timeout) {
    
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var fn = $parse(attrs.shRightClick);

        element.bind('contextmenu.shRightClick', function (e) {
          e.preventDefault();

          $timeout(function () {
            fn(scope, { $event: e });
          });
        });

        scope.$on('$destroy', function () {
          element.unbind('contextmenu.shRightClick');
        });
      }
    };

  }

})(); 