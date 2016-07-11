(function(){

  angular.module("app.services.app.auth", [
    "app.services.app",
    "shava.services.nwSupport",
    "ui.router",
    "ng"
  ])

    .provider("authFactory", authFactoryProvider);

  authFactoryProvider.$inject = [];

  function authFactoryProvider() {
    return {
      $get: authFactory
    };
  }

  authFactory.$inject = ["app", "$state", "shavaNwGui", "$timeout"];

  function authFactory(app, $state, shavaNwGui, $timeout) {
    var auth = {};

    auth.CURRENT_USER = false;
    auth.CURRENT_META = false;

    // Set logged in user
    auth.setUser = function (userStr, userMeta) {
      auth.CURRENT_USER = userStr;
      auth.CURRENT_META = userMeta;
      app.settings.set("CURRENT_USER", auth.CURRENT_USER);
      app.settings.set("CURRENT_META", auth.CURRENT_META);
      app.settings.save();
    };

    // Logout the user sesion
    auth.logoutUser = function () {
      auth.CURRENT_USER = false;
      app.settings.set("CURRENT_USER", false);
      app.settings.set("CURRENT_META", false);
      app.settings.save();
      if (! shavaNwGui.nodeless) {
        process.exit();
      }
      else {
        $timeout(function(){
          $state.go("login");
        });
      }
    };

    // Get logged in user
    auth.getUser = function () {
      if (! auth.CURRENT_USER) {
        auth.CURRENT_USER = app.settings.get("CURRENT_USER", false);
      }
      return auth.CURRENT_USER;
    };

    // Get logged in user
    auth.getUserMeta = function () {
      if (! auth.CURRENT_META) {
        auth.CURRENT_META = app.settings.get("CURRENT_META", {});
      }
      return auth.CURRENT_META;
    };

    // Return auth
    return auth;
  }

}());