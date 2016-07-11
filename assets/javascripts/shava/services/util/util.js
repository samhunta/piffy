(function () {
  
  angular.module('shava.services.util', [
    'shava.services.util.driver',
    'shava.services.util.debounce',
    'shava.services.util.deepMerge',
    'shava.services.util.mixin',
    'shava.services.util.watchChange',
    'shava.services.util.jquery'
  ]);
})(); 