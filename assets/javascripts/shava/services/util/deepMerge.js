(function () {
  
  angular.module('shava.services.util.deepMerge', [])

    .factory('shavaDeepMerge', shavaDeepMerge);

  function shavaDeepMerge() {
    return deepMerge;

    function deepMerge(obj1, obj2) {
      angular.forEach(obj2, function (data, key) {
        if (! obj2.hasOwnProperty(key)) {
          return;
        }

        if (typeof data === 'object' && typeof obj1[key] === 'object') {
          deepMerge(obj1[key], obj2[key]);
        }
        else {
          obj1[key] = obj2[key];
        }
      });
    }
  }

})(); 