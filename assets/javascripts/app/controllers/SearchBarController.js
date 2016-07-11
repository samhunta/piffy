(function () {
  
  angular.module('app.controllers.searchBar', [
    'ui.router',
    'app.services.app'
  ])

    .controller('SearchBarController', SearchBarController);

  SearchBarController.$inject = ['$scope', '$state', 'app', '$document', '$rootScope'];

  function SearchBarController($scope, $state, app, $document, $rootScope) {
    $scope.updateSearch = updateSearch;

    $scope.opts = {};

    $scope.flags = {};
    $scope.app = app;
    $scope.$state = $state;

    $scope.tabBindings = {
      del: 'removeTab($event, $index)',
      bsp: 'removeTab($event, $index)'
    };

    $scope.searchBindings = {
      enter: 'updateSearch($event)'
    };

    $scope.setTab = function (object, selected) {
      object.$$selected = selected;
    };

    $scope.removeTab = function (e, index) {
      if (e !== null) {
        e.preventDefault();
        e.stopPropagation();
      }

      app.tabs.splice(index, 1);
    };

    $scope.$on('app:search', function (e, value) {
      if (typeof value !== 'string' || value.length < 2) {
        return;
      }

      $rootScope.searchText = '';

      if (app.tabs.length > 4) {
        app.tabs.splice(4, 1);
      }

      app.tabs.unshift({
        text: value,
        icon: 'icon icon-search',
        locals: { searchTerm: value },
        controller: 'SearchController',
        templateUrl: 'app/templates/search.html'
      });

      app.tabsNav.selected[0] = app.tabs[0];
    });

    function updateSearch() {
      $rootScope.$broadcast('app:search', $rootScope.searchText);
    }
  }

})(); 