(function () {
  
  angular.module("shava.directives.undoStack", [
    "shava.directives.undoStack.undoStack"
  ])

    .directive("undoStack", [
            "undoStackFactory",
    function(undoStackFactory){

      return {
        restrict: "A",
        scope: {
          undoStack: "="
        },
        link: function (scope, element, attrs) {
          var undoStack = undoStackFactory.create(scope);
        }
      };

    }]);

})(); 