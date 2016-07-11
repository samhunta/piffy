(function () {
  angular.module("shava.directives.undoStack.undoStack", [])

    .factory("undoStackFactory", undoStackFactory);

    undoStackFactory.$inject = ["$rootScope"];

    function undoStackFactory($rootScope){
      
      function UndoStack() {

      }

      UndoStack.prototype = {

      };

      var undoStackFactory = {
        $current: undoStackFactory.create(),

        create: function (scope) {
          return new UndoStack(scope || $rootScope);
        },

        remove: function () {

        },
        
        get: function () {
          return undoStackFactory.$current;
        },
        
        set: function (stack) {
          undoStackFactory.$current = stack;
          return undoStackFactory;
        }
      };

      return undoStackFactory;
    }
})(); 