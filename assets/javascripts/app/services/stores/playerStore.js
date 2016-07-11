(function () {
  angular.module('app.services.stores.playerStore', [
    'shava.services.store',
    'shava.services.dispatcher',
    'app.services.constants.playerConstants'
  ])

    .factory('playerStore', playerStoreFactory);

  playerStoreFactory.$inject = ['app', '$log', 'playerConstants', '$dispatcher', '$store'];

  function playerStoreFactory(app, $log, playerConstants, $dispatcher, $store) {
    var store = $store('playerStore', {
      currentSong: null,
      currentProgress: 0,
      currentStatus: null,
      currentPlaylist: null,
      currentQueue: null,
      lastVolume: null,
      currentVolume: playerConstants.DEFAULT_PLAYER_VOLUME,

      /**
       * The data to retrieve for $scope.$stores.playerStore
       */
      getState: function () {
        return {
          lastVolume: null,
          currentSong: this.currentSong,
          currentQueue: this.currentQueue,
          currentVolume: this.currentVolume,
          currentProgress: this.currentProgress,
          currentStatus: this.currentStatus,
          currentPlaylist: this.currentPlaylist
        };
      },

      /**
       * Initialize store
       */
      initialize: function () {
        this.$bindAction(playerConstants.ACTION_DESTROY_PLAYLIST, this.destroyPlaylist);
        this.$bindAction(playerConstants.ACTION_SET_STATUS, this.setStatus);
        this.$bindAction(playerConstants.ACTION_SET_SONG, this.setSong);
        this.$bindAction(playerConstants.ACTION_SET_PLAYLIST, this.setPlaylist);
        this.$bindAction(playerConstants.ACTION_SEEK_TO, this.seekTo);
        this.$bindAction(playerConstants.ACTION_PLAY_ALT, this.playAlt);
        this.$bindAction(playerConstants.ACTION_PLAY, this.play);
        this.$bindAction(playerConstants.ACTION_RESUME, this.resume);
        this.$bindAction(playerConstants.ACTION_PAUSE, this.pause);
        this.$bindAction(playerConstants.ACTION_BACK, this.back);
        this.$bindAction(playerConstants.ACTION_FORWARD, this.forward);
        this.$bindAction(playerConstants.ACTION_PAUSE, this.pause);
        this.$bindAction(playerConstants.ACTION_STOP, this.stop);
        this.$bindAction(playerConstants.ACTION_TOGGLE, this.toggle);
        this.$bindAction(playerConstants.ACTION_PLAYING, this.whilePlaying);
        this.$bindAction(playerConstants.ACTION_SET_VOLUME, this.setVolume);
        this.$bindAction(playerConstants.ACTION_TOGGLE_VOLUME, this.toggleVolume);
        
        this.currentQueue = [];
      },

      /**
       * Set the status of the player
       */
      setStatus: function (payload) {
        this.currentStatus = payload.status; 
        this.emit('change');
      },

      seekTo: function (payload) {
        if (this.currentSong != null) {
          this.currentSong.getSound().then(function(sound){
            sound.setPosition(payload.progress * 1000);
          });

          this.currentProgress = payload.progress;
          this.emit('change');
        }
      },

      setVolume: function (payload) {
        var self = this;
        this.currentVolume = payload.volume;

        if (this.currentSong != null) {
          this.currentSong.getSound().then(function(sound) {
            sound.setVolume(self.currentVolume);
          });
        }

        this.emit('change');
      },

      whilePlaying: function (payload) {
        this.currentProgress = payload.progress;
        this.emit('change');
      },

      /**
       * Set the playlist for the player
       */
      setPlaylist: function (payload) {
        this._setCurrentPlaylist(payload.playlist.copy(), payload.song);
        this.emit('change');
      },

      /**
       * Set the song
       *
       * @throws Error no playlist is set
       */
      setSong: function (payload) {
        this._setCurrentSong(payload.song);
        this.emit('change');
      },

      destroyPlaylist: function (payload) {
        this._setCurrentPlaylist(null, null);
        this.emit('change');
      },

      forward: function (payload) {
        var count = payload.count != null ? payload.count : 1
          , songs = this.currentPlaylist.songs()
          , index = songs.indexOf(this.currentSong)
          , length = songs.length;

        if (index+count < length) {
          this._setCurrentSong(songs[index + count]);
        }
        else {
          this._setCurrentSong(songs[0]);
        }

        this.emit('change');
      },

      back: function (payload) {
        var count = payload.count != null ? payload.count : 1
          , songs = this.currentPlaylist.songs()
          , index = songs.indexOf(this.currentSong)
          , length = songs.length;

        if (index-count >= 0) {
          this._setCurrentSong(songs[index - count]);
        }
        else {
          this._setCurrentSong(songs[songs.length - 1]);
        }

        this.emit('change');
      },

      toggle: function (payload) {
        if (this.currentStatus === playerConstants.STATUS_PAUSED) {
          return this.resume();
        }
        else if (this.currentStatus === playerConstants.STATUS_PLAYING) {
          return this.pause();
        }
        else {
          return this.play();
        }
      },

      toggleVolume: function (payload) {
        var self = this;
        
        if (this.currentVolume === 0 && this.lastVolume != null) {
          this.currentVolume = this.lastVolume;
          this.lastVolume = null;
        }
        else {
          this.lastVolume = this.currentVolume;
          this.currentVolume = 0;
        }

        if (this.currentSong != null) {
          this.currentSong.getSound().then(function(sound){
            sound.setVolume(self.currentVolume);
          });
        }

        this.emit('change');
      },

      _setCurrentSong: function (song) {
        if (this.currentSong != null) {
          this.currentSong.destroySound();
        }

        this.currentSong = song;
        this.currentProgress = 0;
      },

      _setCurrentPlaylist: function (playlist, song) {
        if (this.currentPlaylist != null) {
          this.currentPlaylist.destroy();
        }

        this._setCurrentSong(song);

        this.currentPlaylist = playlist;
      },

      /**
       * Play MP3 with soundmanager2
       * can not be used to resume sound
       */
      play: function (payload) {
        if (this.currentSong != null) {
          if (payload.smOptions != null) {
            payload.smOptions.volume = this.currentVolume;
          }
          this.currentSong.getSound(payload.smOptions)
            .then(function (sound) {
              sound.play();
            });

          this.currentStatus = playerConstants.STATUS_PLAYING;
          this.emit('change');
        }
      },

      playAlt: function (payload) {
        if (this.currentSong != null && this.currentSong.nextAltStream()) {
          this.currentSong.destroySound();

          if (payload.smOptions != null) {
            payload.smOptions.volume = this.currentVolume;
          }
          this.currentSong.getSound(payload.smOptions).then(function (sound) {
            sound.play();
          });

          this.currentStatus = playerConstants.STATUS_PLAYING;
          this.emit('change');
        }
      },

      stop: function (payload) {
        if (this.currentSong != null) {
          this.currentSong.getSound().then(function (sound) {
            sound.stop();
          });

          this.currentStatus = playerConstants.STATUS_ENDED;
          this.emit('change');
        }
      },

      pause: function (payload) {
        if (this.currentSong != null) {
          this.currentSong.getSound().then(function (sound) {
            sound.pause();
          });

          this.currentStatus = playerConstants.STATUS_PAUSED;
          this.emit('change');
        }
      },

      /**
       * Resume MP3 with soundmanager2
       */
      resume: function (payload) {
        if (this.currentSong != null) {
          this.currentSong.getSound().then(function (sound) {
            sound.resume();
          });

          this.currentStatus = playerConstants.STATUS_PLAYING;
          this.emit('change');
        }
      }

    });

    return store;
  }

})(); 