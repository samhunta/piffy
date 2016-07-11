(function () {
  
  angular.module('app.services.lastfmFeeds', ['ng'])

    .provider('lastfmFeedsFactory', lastfmFeedsFactoryProvider);

  lastfmFeedsFactoryProvider.$inject = [];

  function lastfmFeedsFactoryProvider() {
    var config = {
      url: 'https://ws.audioscrobbler.com/2.0/',
      defaults: {
        'format': 'json',
        'limit': 30
      }
    };

    return {
      $get: lastfmFeedsFactory,
      setKey: function (key) {
        config.defaults.api_key = key;
      },
      setUrl: function (url) {
        config.url = url;
      },
      defaults: function (opts) {
        angular.extend(config, opts);
      }
    };

    lastfmFeedsFactory.$inject = ['$http'];

    function lastfmFeedsFactory($http) {
      return get;

      function get(method, queryData, cache) {
        var queryObj, query;

        queryData.method = method;

        queryObj = angular.extend({}, config.defaults, queryData);
        query = '?' + angular.element.param(queryObj);

        return $http({
          method: 'GET',
          url: config.url + query,
          cache: cache
        })
          .then(function (resp) {
            return resp.data;
          });
      }
    }
  }

})(); 