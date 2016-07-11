(function () {
  var nwGuiSupport = require('nw.gui');

  angular.module('shava.services.nwSupport.nwGui', [])
    .factory('shavaNwGui', nwGui);

  nwGui.$inject = ['$window'];

  function nwGui($window) {
    return nwGuiSupport;
  }

})(); 