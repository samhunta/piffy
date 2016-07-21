(function () {

  angular.module('app.routes', ['app.templates'])
    .constant('TEMPLATE_PATH', 'app/templates/')
    .config(configureRoutes);

  configureRoutes.$inject = ['TEMPLATE_PATH', '$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function configureRoutes(TEMPLATE_PATH, $locationProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false).hashPrefix('!');

    $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        templateUrl: TEMPLATE_PATH+'app.html',
        controller: 'AppController'
      })

      .state('login', {
        url: '/login',
        templateUrl: TEMPLATE_PATH+'login.html',
        controller: 'LoginController'
      })

      .state('app.player', {
        abstract: true,
        url: '',
        views: {
          '': {
            template: '<ui-view />'
          },
          'searchBar': {
            controller: 'SearchBarController',
            templateUrl: TEMPLATE_PATH+'searchBar.html'
          },
          'sidebar': {
            controller: 'SidebarController',
            templateUrl: TEMPLATE_PATH+'sidebar.html'
          },
          'player': {
            controller: 'PlayerController',
            templateUrl: TEMPLATE_PATH+'player.html'
          },
        }
      })

      .state('app.player.index', {
        url: '/',
        templateUrl: TEMPLATE_PATH+'home.html',
        controller: 'HomeController'
      })

      .state('app.player.preferences', {
        templateUrl: TEMPLATE_PATH+'preferences.html',
        controller: 'PreferencesController'
      })

      .state('app.player.browse', {
        url: '/browse',
        controller: 'BrowseController',
        templateUrl: TEMPLATE_PATH+'browse.html',
        abstract: true
      })

      .state('app.player.browse.videos', {
        url: '/videos'
      })

      .state('app.player.browse.books', {
        url: '/books'
      })

      .state('app.player.browse.games', {
        url: '/games'
      })
      
      .state('app.player.browse.music', {
        url: '/music'
      })

      .state('app.player.browse.apps', {
        url: '/apps'
      })

      .state('app.player.controversial', {
        url: '/controversial',
        templateUrl: TEMPLATE_PATH+'controversial.html'
      })

      .state('app.player.downloads', {
        url: '/downloads',
        templateUrl: TEMPLATE_PATH+'downloads.html',
        controller: 'DownloadsController'
      })

      .state('app.player.playlist', {
        abstract: true,
        url: '/playlist'
      })

      .state('app.player.playlist.queue', {
        url: '/queue',
        views: {
          '@app.player': {
            templateUrl: TEMPLATE_PATH+'queue.html',
            controller: 'QueueController'
          }
        }
      })

      .state('app.player.playlist.recent', {
        url: '/recent',
        views: {
          '@app.player': {
            templateUrl: TEMPLATE_PATH+'playlist.html',
            controller: 'PlaylistController'
          }
        }
      })

      .state('app.player.playlist.user', {
        url: '/user/{id:[0-9]+\-[0-9]+}',
        views: {
          '@app.player': {
            templateUrl: TEMPLATE_PATH+'playlist.html',
            controller: 'PlaylistController'
          }
        }
      });


  }


}());