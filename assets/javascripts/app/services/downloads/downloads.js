(function () {

  angular.module('app.services.downloads', [])

    .provider('downloadsFactoryProvider', downloadsFactoryProvider);

  function downloadsFactoryProvider() {
    downloadsFactory.$inject = [];

    function downloadsFactory() {
      var downloadsQueueFactory = function () {
        var q = {
          length: 0,
          running: 0,
          limit: 5,
          data: [],
          run: function () {
            if (q.data.length > 0) {
              var data = q.data.unshift();
            }
          },
          push: function (datum) {
            length++;
            data.push(datum);
            q.run();
          },
          unshift: function (datum) {
            length++;
            data.unshift(datum);
            q.run();
          }
        };

      };

      return downloadsQueueFactory;
    }

    return {
      $get: downloadsFactory
    };
  }

})(); 