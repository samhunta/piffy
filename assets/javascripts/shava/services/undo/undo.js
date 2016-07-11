(function () {
  angular.module('shava.services.undo', [])

    .factory('shavaUndoFactory', shavaUndoFactory);

  shavaUndoFactory.$inject = [];

  function shavaUndoFactory() {
    return shavaUndo;

    function shavaUndo(threshold) {
      this.threshold = 0;
    }
  }

})(); 