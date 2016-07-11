(function () {
  var EventEmitter = require('events').EventEmitter;
  
  var undef;
  var immutable = require('immutable');

  angular.module('app.models.playlist', [])

    .provider('PlaylistModel', PlaylistModelProvider);

  PlaylistModelProvider.$inject = [];

  function PlaylistModelProvider() {    
    PlaylistModelFactory.$inject = ['SongModel'];

    function PlaylistModelFactory(SongModel) {
      var playlistFactory = function (id, opts) {
        return new Playlist(id, opts);
      };

      playlistFactory.$deserialize = function (val) {
        var playlist = playlistFactory((val._id !== undef ? val._id : null), val);
        playlist._songs = angular.isArray(playlist._songs) ?
          playlist._songs.map(function (song) {
            return SongModel(song.host, song);
          }) :
          [];
        return playlist;
      };

      playlistFactory.$serialize = function (val) {
        return {
          _id: val._id,
          name: val.name,
          songs: val._songs.map(function(song){
            return song.props();
          })
        };
      };

      function Playlist(id, opts) {
        var self = this;

        self._id = id;
        self.length = 0;

        if (typeof opts === 'object') {
          if (opts.songs != null) {
            for (var ii = 0; ii < opts.songs.length; ii++) {
              opts.songs[ii].incrementLoad();
            }
            self._songs = opts.songs.slice();
            self.length = self._songs.length;
            self.emit('lengthChange', self.length);
            delete opts.songs;
          }

          angular.extend(self, opts);
        }

        if (self._songs == null) {
          self._songs = [];
        }

        self.location = 'app.player.playlist.user';
      }

      function copyPlaylist(filterCallback) {
        return new Playlist(this._id, {
          songs: filterCallback ?
            this._songs.slice().filter(filterCallback) :
            this._songs
        });
      }

      function destroyPlaylist() {
        angular.forEach(this._songs, function (song) {
          song.unload();
        });

        this.length = 0;
        this._songs = [];
        this.emit('lengthChange', this.length);
      }

      function songs() {
        return this._songs;
      }

      function addSong(song) {
        if (angular.isArray(song)) {
          for (var i = 0; i < song.length; i++) {
            song[i].incrementLoad();
            this.songs().push(song[i]);
          }
        }
        else {
          song.incrementLoad();
          this.songs().push(song);
        }

        this.length = this._songs.length;
        return this;
      }

      Playlist.prototype = {
        copy: copyPlaylist,
        destroy: destroyPlaylist,
        songs: songs,
        add: addSong
      };

      angular.extend(
        Playlist.prototype,
        EventEmitter.prototype
      );

      return playlistFactory;
    }

    return {
      $get: PlaylistModelFactory
    };

  }

}()); 