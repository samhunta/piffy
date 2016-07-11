(function () {
  angular.module('shava.directives.focusable.focusable', [])

    .provider('shFocusableFactory', focusableFactoryProvider);

  focusableFactoryProvider.$inject = [];
  function focusableFactoryProvider() {
    var defaults = {
      overrideTab: true
    };

    function config(config) {
      angular.extend(defaults, config);
    }

    focusableFactory.$inject = [];

    function focusableFactory() {
      
    }

    return {
      $get: focusableFactory,
      defaults: config
    };

  }

})(); 