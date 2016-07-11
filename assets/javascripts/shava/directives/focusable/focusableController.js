(function () {
  angular.module('shava.directives.focusable.focusableController', [
    'shava.directives.focusable.focusable',
    'shava.directives.focusable'
  ])

  .controller('ShFocusableController', ShFocusableController);

  ShFocusableController.$inject = ["focusableFactory"];
  function ShFocusableController(focusableFactory) {
    
  }
})(); 