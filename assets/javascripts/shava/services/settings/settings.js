(function () {
  
  angular.module('shava.services.settings', [])

    .provider('shavaSettingsFactory', shavaSettingsFactoryProvider);

  shavaSettingsFactoryProvider.$inject = ['shavaSessionsFactoryProvider'];

  function shavaSettingsFactoryProvider(shavaSessionsFactoryProvider) {
    var settings = {};

    shavaSettingsFactory.$inject = ['shavaSessionsFactory', 'shavaDeepMerge'];

    return {
      $get: shavaSettingsFactory,
      defaults: defaults
    };

    function defaults(name, newSettings) {
      angular.extend(getSettings(name), newSettings);
    }

    function getSettings(name) {
      if (settings[name] == null) {
        settings[name] = {};
      }

      return settings[name];
    }

    function shavaSettingsFactory(shavaSessionsFactory, deepMerge) {
      return function (name) {
        var obj = shavaSessionsFactory.bindObject(name + '_settings', false);
        var data = {};

        deepMerge(data, getSettings(name));
        deepMerge(data, obj.data());

        obj.setData(data);

        return obj;
      };
    }
  }

})(); 