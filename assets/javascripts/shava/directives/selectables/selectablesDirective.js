(function () {
  angular.module('shava.directives.selectables', [
    'shava.directives.selectables.selectablesController',
    'shava.directives.scrollarea',
    'shava.directives.selectables.selectableDirective',
    'shava.directives.selectables.selectables'
  ])

    .directive('shSelectables', shSelectables);

  shSelectables.$inject = [];

  function shSelectables() {

    return {
      restrict: 'A',
      link: { pre: shSelectablesLinker },
      controller: 'ShSelectablesController',
      require: ['shSelectables', '?^shScrollarea', '?shScrollarea', '?^shSelectables'],
      scope: {
        'opts': '=shSelectables'
      }
    };

    function shSelectablesLinker(scope, element, attrs, ctrl) {
      ctrl[0].$parent = ctrl[3];
      ctrl[0].setScroller(angular.isDefined(ctrl[1]) ? ctrl[1] : ctrl[2]);
    }

  }
})(); 