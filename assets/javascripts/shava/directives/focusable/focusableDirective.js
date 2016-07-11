(function () {
  angular.module('shava.directives.focusable', [
    'shava.directives.focusable.focusable',
    'shava.directives.focusable.focusableController'
  ])
    .directive('shFocusable', [
             'ShFocusableController',
    function (ShFocusableController) {
      return {
        controller: ShFocusableController,
        compile: function (elem, attr) {
          return {
            post: function (scope, elem, attr) {
              elem.on('focusin', function (e) {
              });
            }
          };
        }
      };
    }]);

})(); 