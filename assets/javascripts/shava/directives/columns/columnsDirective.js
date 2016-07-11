(function () {
  
  angular.module('shava.directives.columns', [
    'shava.directives.columns.columnDirective',
    'shava.directives.columns.columnsController'
  ])

    .directive('shColumns', [function () {
      return {
        restrict: 'A',
        controller: 'ShColumnsController'
      }
    }]);

})(); 