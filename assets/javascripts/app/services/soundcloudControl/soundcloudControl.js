(function () {

  angular.module('app.services.soundcloudControl', [
    'app.services.soundcloudControl.soundcloudControlDirective'
  ])

    .provider('soundcloudControl', function () {
      var def;

      var config = {
        client_id: null,
        redirect_uri: null
      };

      soundCloudControl.$inject = ['$window', '$q'];

      function soundCloudControl($window, $q) {
        if (! def) {
          def = $q.defer();
        }

        $window.onSoundcloudReady = function () {
          $window.SC.initialize(config);
          $window.SC.soundManager = $window.soundManager;
          def.resolve($window.SC);
        };
        
        return def.promise;
      }

      return {
        $get: soundCloudControl,
        setKey: function (key) {
          config.client_id = key;
        },
        setUrl: function (url) {
          config.redirect_uri = url;
        }
      };

    });

})(); 