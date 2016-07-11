(function () {
  
  angular.module('shava.services.util.jquery', [])

    .factory('$jQuery', shavaJquery);

  shavaJquery.$inject = ['$window'];

  function shavaJquery($window) {
    return ($window['jQuery'] || $window['$']);
  }

})(); 