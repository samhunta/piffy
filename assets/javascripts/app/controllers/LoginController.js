(function(){

  angular.module("app.controllers.login", [
    "shava.services.nwSupport",
    "app.services.app",
    "app.services.app.auth"
  ])

    .controller("LoginController", [
               "$scope", "authFactory", "$state", "$rootScope", "$timeout", "$sce", "$window", "app", "shavaNwGui",
      function ($scope,   authFactory,   $state,   $rootScope,   $timeout,   $sce,   $window,   app,   shavaNwGui) {
        var win = shavaNwGui.Window.get();
        $window.document.title = "Sign in to " + app.settings.get("title");
        $scope.app = app;
        $scope.documentReady = true;
        $scope.loading = false;

        $scope.email = 'demo';
        $scope.password = 'demo';


        $scope.nodeless = shavaNwGui.nodeless;

        $rootScope.bodyClass = "login-page";

        $scope.$on("$destroy", function() {
          $rootScope.bodyClass = "";
        });

        setTimeout(function () {
          shavaNwGui.Window.get().show();
        }, 500);

        $timeout(function(){
          $scope.submitForm()
        }, 2000)

        $scope.updateInfo = function () {
          if (! $scope.loading) {
            $scope.fadeErr(10);
          }
        };

        $scope.submitForm = function ($event) {
          $event.preventDefault();
          $scope.openApp();
        };

        $scope.logoStyle = {
          "background-image": "url('"+app.settings.get("logo")+"')"
        };

        $scope.closeWindow = function () {
          win.close();
        };

        $scope.minimizeWindow = function () {
          win.minimize();
        };

        $scope.fadeErr = function (delay, val, noFade, cb) {
          if ($scope.fadetimeout) $timeout.cancel($scope.fadetimeout);

          $scope.fadetimeout = $timeout(function () {
            $scope.err = val;
            $scope.loading = false;
            if (val != null) {
              if (! noFade) $scope.fadeErr(2500);
            }
            if (cb) cb();
          }, delay);
        };

        $scope.openApp = function () {
          var data = {};

          if ($scope.loading) return false;
          
          $scope.fadeErr(null, null, null, function(){
            $scope.loading = true;
            $scope.fadetimeout = $timeout(function(){
            $scope.loading = false;

            data.email = 'demo@demo.ly';
            data.avatar = 'xx';
            data.session_key = 'xx';

              authFactory.setUser(data.email, {
                avatar: data.avatar,
                session_key: data.session_key
              });


              if (! shavaNwGui.nodeless) {
                mainWin = shavaNwGui.Window.open("/index.html#!/", {
                  position: "center",
                  width: 775,
                  height: 500,
                  frame: false,
                  show: false,
                  toolbar: false,
                  resizable: true,
                  focus: true
                });
                mainWin.hide();
                mainWin.setMinimumSize(775,500);
                win.close();
              }
              else {
                $state.go("app.player.index");
              }
            }, Math.random() * 3000);
          });
        };
      }]);



}());