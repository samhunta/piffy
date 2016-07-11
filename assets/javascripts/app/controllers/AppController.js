
(function(){

  angular.module("app.controllers.app", [
    "shava.services.nwSupport",
    "app.services.youtubeFeeds",
    "app.services.app",
    "app.services.app.auth"
  ])

    .controller('AppController', [
               '$scope', 'playerActions', '$sce', 'authFactory', '$state', 'TEMPLATE_PATH', 'shavaNwGui', 'app', 'youtubeFeedsFactory', '$rootScope', 'app', '$window', '$timeout', '$document',
      function ($scope,   playerActions,   $sce,   authFactory,   $state,   TEMPLATE_PATH,   shavaNwGui,   app,   youtubeFeedsFactory,   $rootScope,   app,   $window,   $timeout,   $document) {
        $scope.app = app;

        $window.document.title = app.settings.get("title");

        var win = shavaNwGui.Window.get();

        setTimeout(function() {
          win.show();
        }, 500);

        var playerFrame = $window.document.createElement('iframe');
        playerFrame.src = (shavaNwGui.nodeless ? '' : 'http://127.0.0.1:24922/') + 'player.html';
        playerFrame.style.width = '0';
        playerFrame.style.height = '0';
        playerFrame.style.opacity = '0';
        playerFrame.style.position = 'absolute';
        playerFrame.style.top = '-9999px';
        $window.document.body.appendChild(playerFrame);
        
        // If not using node.js / node-webkit
        $scope.nodeless = shavaNwGui.nodeless;

        $scope.userMeta = authFactory.getUserMeta();

        $scope.state = $state;

        if (! authFactory.getUser()) {
          $state.go("login");
        }

        var user = authFactory.getUser();

        $scope.closeWindow = function () {
          win.close();
        };

        $scope.minimizeWindow = function () {
          win.minimize();
        };

        $scope.maximizeWindow = function () {
          win.maximize();
        };

        $scope.historyBack = function () {
          if ($rootScope.$history != null) {
            $rootScope.$history.back();
          }
        };

        $scope.historyForward = function () {
          if ($rootScope.$history != null) {
            $rootScope.$history.forward();
          }
        };

        // Flag events
        $scope.flags = {};

        $scope.userPreferencesDropdown = [
          {
            "text": $sce.trustAsHtml("<i class=\"fa fa-sign-out\"></i>&nbsp;Sign Out"),
            "click": function () { authFactory.logoutUser(); }
          }
        ];

        // Remove event listeners when scope is destroyed
        $scope.$on("$destroy", function () {
          playerActions.destroyPlaylist();
          $document.off("keydown", documentKeydown);
        });
        
        $document.on("keydown", documentKeydown);

        function documentKeydown(e) {
          var nodename, docSelected;

          if (e.which === 9) {
            e.preventDefault();
          }

          if (!e.target) {
            return false;
          }

          switch (e.which) {
            case 46:
            case 32:
            case 8:
              nodename = e.target.nodeName;
              docSelected = e.target.getAttribute('contenteditable') == null &&
                nodename !== 'INPUT' &&
                nodename !== 'TEXTAREA' &&
                nodename !== 'SELECT';

              if (docSelected) {
                e.preventDefault();
                if (e.which === 32) {
                  playerActions.toggle();
                }
                else if (e.which === 8 && $rootScope.$history != null) {
                  $timeout(function(){
                    $rootScope.$history.back();
                  });
                }
              }
            break;
          }
        }

      }]);



}());