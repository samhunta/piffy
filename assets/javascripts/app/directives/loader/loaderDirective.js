(function () {
  
  angular.module('app.directives.loader', [])

    .directive('appLoader', appLoader);

  appLoader.$inject = ['$timeout'];

  function appLoader($timeout) {
    return {
      restrict: 'A',
      replace: true,
      scope: { showLoader: '=appLoader' },
      templateUrl: 'app/templates/loader.html',
      link: function (scope, element, attrs) {
        scope.$watch('showLoader', function (loader) {
          if (angular.isObject(loader) && angular.isFunction(loader.then)) {
            loader.then(setLoader, setLoader);
          }
        });

        function setLoader() {
          $timeout(function () {
            scope.showLoader = false;
          });
        }
      }
    };
  }

})(); 