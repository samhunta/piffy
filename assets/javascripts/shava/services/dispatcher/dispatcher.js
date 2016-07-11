(function () {
  var Dispatcher = require('flux').Dispatcher;

  angular.module('shava.services.dispatcher', [
    'shava.services.action'
  ])

    .factory('$dispatcher', ['$action', function($action){
      var $dispatcher = new Dispatcher();

      var dispatch = $dispatcher.dispatch;

      $dispatcher.dispatch = function (name, action) {
        return dispatch.call($dispatcher, $action(name, action));
      };

      return $dispatcher;
    }]);
})(); 