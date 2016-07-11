(function () {
  angular.module('shava.directives.selectables.selectableDirective', [
    'shava.directives.selectables',
    'shava.directives.selectables.selectablesController'
  ])

    .directive('shSelectable', shSelectable);

  shSelectable.$inject = ['$document'];

  function shSelectable($document) {

    return {
      restrict: 'A',
      require: '^shSelectables',
      link: { post: shSelectableLinker },
      scope: {
        'shSelectable': '=shSelectable',
        'shSelectableObject': '=shSelectableObject',
        'shSelectableWatch': '=shSelectableWatch',
      }
    };

    function shSelectableLinker(scope, element, attrs, shSelectables) {
      shSelectables.registerObject(scope, element, attrs);
    }

  }
})(); 