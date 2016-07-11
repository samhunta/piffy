(function () {
  var _ = require("underscore");

  angular.module('shava.services.util.watchChange', [])

    .provider('$$watch', watchChangeProvider);

  watchChangeProvider.$inject = [];

  function watchChangeProvider() {
    var provider = {};

    provider.$get = watchChangeFactory;
    watchChangeFactory.$inject = ['$rootScope'];

    function watchChangeFactory($rootScope) {
      function watchChange() {
        var scope, watch, change, args;

        args = Array.prototype.slice.call(arguments);

        switch (args.length) {
          case 3:
            scope = args[0];
            watch = args[1];
            change = args[2];
            break;
          default:
            scope = $rootScope;
            change = args[2];
            watch = args[1];
            break;
        }

        function watcher(newVal, oldVal) {
          if (! angular.isArray(newVal)) return;

          oldVal = oldVal !== newVal && angular.isArray(oldVal) ? oldVal : [];

          var adds = _.difference(newVal, oldVal)
            , removes = _.difference(oldVal, newVal);

          change(adds, removes, newVal, oldVal);
        }

        return scope.$watchCollection(watch, watcher);

      }

      return watchChange;
      
    }

    return provider;
  }

})(); 