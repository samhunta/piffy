(function () {

  /**
   * Default build settings
   */
  var settings = require('build.json');

  /**
   * User Settings
   */
  var userSettings = {
    columnWidths: {
      sidebar: 220,
      playlist: [329, 74, 110, 200, 100]
    }
  };
  
  angular.module('app.settings', [
    'shava.services.settings'
  ])
  .config(configSettings);

  configSettings.$inject = ['shavaSettingsFactoryProvider'];

  function configSettings(shavaSettingsFactoryProvider) {
    shavaSettingsFactoryProvider.defaults("app", settings);
    shavaSettingsFactoryProvider.defaults("user-0", userSettings);
  }

})(); 