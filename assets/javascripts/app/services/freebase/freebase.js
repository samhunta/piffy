(function () {
  
  angular.module('app.services.freebase', [])

    .provider('freebaseFactory', freebaseFactoryProvider);

  freebaseFactoryProvider.$inject = [];

  function freebaseFactoryProvider() {
    var $config = {
      $url: 'https://www.googleapis.com/freebase/v1/mqlread/',
      $imageUrl: 'https://usercontent.googleapis.com/freebase/v1/image/',
      $lang: 'en'
    };

    freebaseFactory.$inject = ['$http'];

    return {
      $get: freebaseFactory,
      config: function (opts) {
        angular.extend($config, opts);
      }
    };

    function freebaseFactory($http) {
      var freebase = {
        query: query
      };

      function query(q) {
        q = encodeURIComponent(angular.toJson(q));
        return $http.get(
          $config.$url + '?lang=%2Flang%2F'
          + $config.$lang + '&query=' + q)
            .success(function (data) {
              return data.result;
            });
      }

      return freebase;
    }

  }

})(); 