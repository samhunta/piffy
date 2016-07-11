(function () {
  
  angular.module('shava.services', [
    'shava.services.sessions',
    'shava.services.sessions.localStorageAdapter',
    'shava.services.util',
    'shava.services.settings',
    'shava.services.ctrlTabs',
    'shava.services.nwSupport',
    'shava.services.contextMenu'
  ]);

})(); 