(function(){

  angular.module('shava.directives.nav', [
    'shava.directives.nav.navValueDirective',
    'shava.directives.nav.navController'
  ])

    .directive('shNav', shNav);


    function shNav() {
      return {
        restrict: 'A',
        scope: false,
        controller: 'ShNavController'
      };      
    }

}());