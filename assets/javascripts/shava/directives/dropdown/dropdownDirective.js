(function(){

  angular.module('shava.directives.dropdown', [])

    .directive('shDropdown', [function () {

      return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        scope: {
          shDropdown: '=',
          shDropdownWatch: '='
        },
        template: '<div></div>',
        link: function (scope, element, attrs) {
          if (scope.shDropdownWatch) {
            scope.$watch(opts, getOpts);
          }
        }
      }

    }]);

}());