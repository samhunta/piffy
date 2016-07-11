(function () {

  angular.module('app.config', [
    'shava.services.nwSupport',
    'shava.services.sessions',
    'app.services.lastfmFeeds',
    'app.services.soundcloudControl',
    'ui.router'
  ])
    .config(configureApp)
    .run(runApp);

  runApp.$inject = ['$store', '$window', 'shavaNwGui', '$rootScope', '$state'];

  function runApp($store, $window, shavaNwGui, $rootScope, $state) {
    $store.bind('playerStore', $rootScope);

    var $history = {
      noIncrement: false,
      hasNext: false,
      hasPrev: false,
      total: 0,
      index: 0,
      back: function () {
        if ($history.hasPrev) {
          if ($history.index === $history.total) {
            $history.hasNext = true;            
          }

          if (--$history.index === 0) {
            $history.hasPrev = false;
          }

          $history.noIncrement = true;
          $window.history.back();
        }
      },
      forward: function () {
        if ($history.hasNext) {
          $history.hasPrev = true;

          if (++$history.index === $history.total) {
            $history.hasNext = false;
          }

          $history.noIncrement = true;
          $window.history.forward();
        }
      },
      increment: function () {
        if ($history.noIncrement) {
          $history.noIncrement = false;
          return;
        }

        if ($history.index !== $history.total) {
          $history.total = ++$history.index;
          $history.hasNext = false;
        }
        else {
          $history.index++;
          $history.total++;
        }

        $history.hasPrev = true;
      }
    };

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $rootScope.stateLoading = true;
      $rootScope.$broadcast('app:sidebarUpdate', toState.name, toParams.id);

      if ($rootScope.$history == null) {
        $rootScope.$history = $history;
      }
      else {
        $history.increment();
      }
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.stateLoading = false;
    });

    $rootScope.$on('$stateChangeError', function () {
      $rootScope.stateLoading = false;
    });

    if (! shavaNwGui.nodeless) {
      var win = shavaNwGui.Window.get();
      var menu = new shavaNwGui.Menu({ type: 'menubar' });

      switch(process.platform) {
        case 'darwin':
          if (typeof menu.createMacBuiltin === 'function') {
            menu.createMacBuiltin($window.title);
            win.menu = menu;
          }
          break;
        case 'windows':
        case 'linux':
        case 'linux64':
        default:
          win.menu = menu;
          break;
      }
    }
  }

  configureApp.$inject = [
    'soundcloudControlProvider',
    'shavaSessionsFactoryProvider',
    'lastfmFeedsFactoryProvider',
    '$rootScopeProvider'
  ];

  function configureApp(soundcloudControlProvider, shavaSessionsFactoryProvider, lastfmFeedsFactoryProvider, $rootScopeProvider)
  {
    var $rootScope$$get = $rootScopeProvider.$get;

    // Set our drivers
    shavaSessionsFactoryProvider.setDriver('shavaSessionsLocalStorageFactory');
  
    lastfmFeedsFactoryProvider.setKey('a9fdbef9d3ff8a29e4d96c47d88cd60e');
    soundcloudControlProvider.setKey('52f90bc8a437ef08446678dd9a28e459');
    soundcloudControlProvider.setUrl('https://[REDACTED]/app-callback');

    $rootScopeProvider.$get = ['$injector', function ($injector) {
      var obj = $injector.invoke($rootScope$$get);

      return obj;
    }];
  }


}());