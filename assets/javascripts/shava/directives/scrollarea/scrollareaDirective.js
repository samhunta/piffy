(function () {
  
  angular.module('shava.directives.scrollarea', [
    'shava.directives.scrollarea.scrollareaController'
  ])

    .directive('shScrollarea', scrollerDirective);

  function scrollerDirective() {
    return {
      restrict: 'A',
      controller: 'ShScrollareaController',
      link: function (scope, element, attrs, ctrl) {
        attrs.$observe('shScrollarea', function (value) {
          ctrl.setBodySpacing(value);
        });
      }
    };
  }

})(); 