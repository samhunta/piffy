(function () {
  angular.module('shava.directives.nav.navValueDirective', [])

    .directive('shNavValue', shNavValue);

  function shNavValue() {
    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      require: '^shNav',
      scope: {
        shNavValue: '=',
        shNavCb: '&'
      },
      template: '<li ng-mousedown="selectValue(shNavValue, true)" ng-class="{active: shNav.curValue === shNavValue}" ng-transclude></li>',
      link: function (scope, element, attrs, ShNavController) {
        var oldVal;

        scope.shNav = ShNavController;

        scope.clearSelection = function () {
          ShNavController.setValue(null);
        };

        scope.restoreSelection = function () {
          ShNavController.setValue(oldVal);
        };

        scope.selectValue = function (value, clicked) {
          ShNavController.setValue(value, clicked);
        };

      }
    };
  }
})(); 