(function () {
  
  angular.module('app.services.youtubeFeeds', [])

    .provider('youtubeFeedsFactory', youtubeFeedsFactoryProvider);

  youtubeFeedsFactoryProvider.$inject = [];

  function youtubeFeedsFactoryProvider() {
    var config = {
      url: 'https://gdata.youtube.com/feeds/api/',
      defaults: {
        'v': 2,
        'format': 5,
        'alt': 'json',
        'max-results': 50
      }
    };

    return {
      $get: youtubeFeedsFactory,
      defaults: function (opts) {
        angular.extend(config.defaults, opts);
      },
      setUrl: function (url) {
        config.url = url;
      }
    };

    youtubeFeedsFactory.$inject = ['$http'];

    function youtubeFeedsFactory($http) {
      return get;

      function get(feed, queryData) {
        var queryObj = angular.extend({}, config.defaults, queryData)
          , query = '?' + window.jQuery.param(queryObj);

        return $http.get(config.url + feed + query)
          .then(function (resp) {
            return resp.data.feed;
          });
      }
    }
  }

})(); 