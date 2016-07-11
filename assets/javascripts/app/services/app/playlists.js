(function () {
  angular.module("app.services.app.playlists", [
    "app.models.playlist",
    "shava.services.sessions",
    "shava.services.nwSupport"
  ])

    .provider("playlists", PlaylistsFactoryProvider);

  PlaylistsFactoryProvider.$inject = [];

  function PlaylistsFactoryProvider() {
    PlaylistsFactory.$inject = [ "$q", "shavaNwGui", "shavaSessionsFactory", "$rootScope", "$timeout", "PlaylistModel"];
    function PlaylistsFactory(    $q,   shavaNwGui,   shavaSessionsFactory,   $rootScope,   $timeout,   PlaylistModel) {
      var undef, bb = 0, nextId;

      var playlists = shavaSessionsFactory.bindArray("playlists", false, {
        $deserialize: PlaylistModel.$deserialize,
        $serialize: PlaylistModel.$serialize
      });

      nextId = function () {
        return (++bb)+'-'+Math.floor(Math.random()*999999999)+Date.now();
      };

      playlists.create = function (add, unshift) {
        add = PlaylistModel(add._id != null ? add._id : nextId(), add);

        if (unshift) {
          playlists.unshift(add);
        }
        else {
          playlists.push(add);
        }
        
        return add;
      };

      playlists.get = function (key) {
        var obj = _.find(playlists, function (value) {
          return value._id === parseInt(key);
        });

        return obj;
      };

      playlists.contextMenu = function (e, index) {
        var menu = new shavaNwGui.Menu();

        menu.append(new shavaNwGui.MenuItem({
          label: "Rename Playlist",
          click: function () {
            $timeout(function () {
              playlists[index].editing = true;
            });
          }
        }));

        menu.append(new shavaNwGui.MenuItem({
          label: "Delete Playlist",
          click: function () {
            $timeout(function () {
              playlists.remove(index);
              playlists.save();
            });
          }
        }));

        menu.popup(e.clientX+1, e.clientY+1);
      };

      return playlists;
    }

    return {
      $get: PlaylistsFactory
    };
  }

})(); 