(function(){
  angular.module('shava.services.sessions.localStorageAdapter', [])

    .factory('shavaSessionsLocalStorageFactory', shavaSessionsLocalStorageFactory);

  shavaSessionsLocalStorageFactory.$inject = ['$window'];

  function shavaSessionsLocalStorageFactory($window) {
    return {
      get: function(key, def){
        var val = angular.fromJson($window.localStorage.getItem(key));
        return val !== void(0) ? val : def;
      },
      set: function(key, val){
        return $window.localStorage.setItem(key, angular.toJson(val));
      }
    };
  }


}());