(function () {
  angular.module('shava.directives.sorter', [
    'shava.directives.sorter.sorterItemDirective',
    'shava.directives.sorter.sorterController'
  ])
    .directive('shSorter', sorter);

  function sorter() {
    return {
      restrict: 'A',
      require: '^shSorter',
      controller: 'ShSorterController'
    };
  }
})(); 