(function () {
  angular.module('app.services.actions.playerActions', [
    'shava.services.dispatcher',
    'app.services.stores.playerStore',
    'app.services.constants.playerConstants'
  ])

    .factory('playerActions', playerActions);

    playerActions.$inject = ['$dispatcher', 'playerStore', 'playerConstants'];

    function playerActions($dispatcher, playerStore, playerConstants) {

      /**
       * Events for soundManager bindings
       */
      var smOptions = {
        onfinish: function () {
          $dispatcher.dispatch(playerConstants.ACTION_FORWARD, {});
          $dispatcher.dispatch(playerConstants.ACTION_PLAY, {
            smOptions: smOptions
          });
        },
        whileplaying: function () {
          $dispatcher.dispatch(playerConstants.ACTION_PLAYING, {
            progress: this.position/1000
          });
        },
        onload: function (success) {
          if (! success) {
            $dispatcher.dispatch(playerConstants.ACTION_PLAY_ALT, {
              smOptions: smOptions
            });
          }
        }
      };

      function transformSong(song, playlist) {
        if (typeof song !== 'object') {
          var songs = playlist.songs();
          song = songs[songs.indexOf(song)];
        }
        return song;
      }

      var actions = {
        /**
         * Stop the track
         */
        stop: function () {
          $dispatcher.dispatch(playerConstants.ACTION_STOP, {});
        },
        
        /**
         * Initial play, shouldn't be used multiple times for now
         */
        play: function () {
          $dispatcher.dispatch(playerConstants.ACTION_PLAY, {
            smOptions: smOptions
          });
        },

        /**
         * Toggle audio status
         */
        toggle: function () {
          $dispatcher.dispatch(playerConstants.ACTION_TOGGLE, {});
        },

        toggleVolume: function () {
          $dispatcher.dispatch(playerConstants.ACTION_TOGGLE_VOLUME, {});
        },

        /**
         * Seek to audio position
         */
        seekTo: function (progress) {
          $dispatcher.dispatch(playerConstants.ACTION_SEEK_TO, {
            progress: progress
          });
        },

        /**
         * Go forward
         */
        forward: function (count) {
          $dispatcher.dispatch(playerConstants.ACTION_FORWARD, {
            count: count
          });

          $dispatcher.dispatch(playerConstants.ACTION_PLAY, {
            smOptions: smOptions
          });
        },

        /**
         * Go back
         */
        back: function (count) {
          $dispatcher.dispatch(playerConstants.ACTION_BACK, {
            count: count
          });

          $dispatcher.dispatch(playerConstants.ACTION_PLAY, {
            smOptions: smOptions
          });
        },
        
        /**
         * Free memory after using a playlist
         */
        destroyPlaylist: function () {
          $dispatcher.dispatch(playerConstants.ACTION_DESTROY_PLAYLIST, {});
        },

        /**
         * Set the playlist with the current song.
         * Also retrieve the sound asynchronously before dispatch.
         */
        setPlaylist: function (playlist, song) {
          song = transformSong(song, playlist);

          $dispatcher.dispatch(playerConstants.ACTION_SET_PLAYLIST, {
            song: song,
            playlist: playlist
          });
        },

        /**
         * Set the song
         *
         * In the case of setting the song, the new song information
         * retrieves data asynchronously, but handlers should be triggered
         * for actions which can not be used with the newly retrieved
         * song data applied to the song's class context.
         */
        setSong: function (song) {
          var playerState = playerStore.getState();

          song = transformSong(song, playerState.currentPlaylist.songs());

          $dispatcher.dispatch(playerConstants.ACTION_SET_SONG, {
            song: song
          });
        },

        /**
         * Set the status
         */
        setStatus: function (status) {
          $dispatcher.dispatch(playerConstants.ACTION_SET_STATUS, {
            status: status
          });
        },

        /**
         * Set the volume
         */
        setVolume: function (volume) {
          $dispatcher.dispatch(playerConstants.ACTION_SET_VOLUME, {
            volume: volume
          });
        }
      };

      window.actions = actions;

      return actions;
    }

})(); 