(function () {
  var Immutable = require('immutable');
  var EventEmitter = require('events').EventEmitter;
  var undef;

  angular.module('app.models.song', [
    'app.services.app.util',
    'app.services.soundcloudControl'
  ])

    .provider('SongModel', SongModelProvider);

  SongModelProvider.$inject = [];

  function SongModelProvider() {
    var defaults = {
      host: 'youtube',
      isPlaying: false,
      isLoaded: false
    };

    SongModelFactory.$inject = ['$q', 'soundcloudControl', 'wordMatch', 'fuzzyMatch', 'scMatch', '$log', 'formatDuration'];

    function SongModelFactory($q, soundcloudControl, wordMatch, fuzzyMatch, scMatch, $log, formatDuration) {

      var lastFmToSoundcloudMap = {};
      var songsLoaded = {};

      function songFactory(host, opts) {
        opts.host = host;
        return Song.load(opts);
      }

      function Song(opts) {
        if (
          !  typeof opts === "object"
          || opts.artist === undef
          || opts.title === undef
          || opts.images === undef
          || opts.duration === undef
          || opts.rating === undef
          || opts.id === undef
        ) {
          $log.info(opts);
          throw new Error("Failed to instantiate Song with arguments");
        }

        opts.durationText = formatDuration(opts.duration);

        opts._id = opts.id;

        if (opts.host === "lastfm" && lastFmToSoundcloudMap[opts._id] != null) {
          opts.host = "soundcloud";
          angular.extend(this, lastFmToSoundcloudMap[opts._id]);
        }

        angular.extend(this, defaults, opts);

        this.initialize();
      }

      Song.fromImmutable = function (im) {
        return Song.load(im.toObject());
      };

      Song.load = function (opts) {
        if (typeof opts === 'object') {
          if (opts instanceof Song) {
            return opts;
          }
          else if (opts._id != null && songsLoaded[opts._id] != null) {
            return songsLoaded[opts._id];
          }
          else if (opts.id != null && songsLoaded[opts.id] != null) {
            return songsLoaded[opts.id];
          }
        }

        return new Song(opts);
      };

      Song.prototype = {
        incrementTries: function () {
          this.tries++;
        },
        incrementLoad: function () {
          this.requiredBy++;
          return this;
        },
        fromImmutable: function (obj) {
          return this(obj.toObject());
        },
        toImmutable: function () {
          return Immutable.fromJS(this);
        },
        initialize: function () {
          this.requiredBy = 0;
          songsLoaded[this._id] = this;
          return this;
        },
        unload: function () {
          if (songsLoaded[this._id] != null && --songsLoaded[this._id].requiredBy <= 0) {
            this.destroySound();
            delete songsLoaded[this._id];
          }
          return this;
        },
        getHost: function () {
          return this.host;
        },
        nextAltStream: function () {
          var track;
          
          if (! this._alt || this._alt.length === 0) {
            return false;
          }

          track = this._alt.shift();
          this._deferred = null;

          if (track != null) {
            angular.extend(this, track);
            this.durationText = formatDuration(this.duration);
            lastFmToSoundcloudMap[this._id] = this.props();
            return true;
          }

          return false;
        },
        destroySound: function (callback) {
          var defSound = this._deferredSound;
          if (defSound != null) {
            this._deferredSound = null;
            defSound.promise.then(function (sound) {
              sound.destruct();
              if (callback != null) callback();
            });
          }
          else {
            if (callback != null) callback();
          }
        },
        getSound: function (opts) {
          var self = this;

          if (this._deferredSound != null) {
            return this._deferredSound.promise;
          }

          var deferred = $q.defer();
          this._deferredSound = deferred;

          this.getSongFromQuery().then(function(self) {
            soundcloudControl.then(function (SC) {
              var ii, soundManager = SC.soundManager;

              if (soundManager.sounds['S'+self.id] === undef) {
                if (self.mp3 == null) {
                  return false;
                }

                var defaults = {
                  id: 'S'+self.id,
                  url: self.mp3,
                  volume: 50,
                  autoPlay: false
                };

                if (typeof opts === 'object') {
                  for (ii in opts) {
                    if (opts.hasOwnProperty(ii)) {
                      defaults[ii] = opts[ii];
                    }
                  }
                }

                var sound = soundManager.createSound(defaults);

                deferred.resolve(sound);

                return true;
              }

              deferred.resolve(soundManager.sounds['S'+self.id]);
              return true;
            });
          });

          return deferred.promise;
        },
        getSongFromQuery: function (start_date, single) {
          var self = this;
          var deferred = $q.defer();

          if (single !== false) {
            if (this._deferred == null) {
              this._deferred = deferred;
            }
            else {
              return this._deferred.promise;
            }
          }

          if (self.host === 'lastfm') {
            soundcloudControl.then(function(SC){
              var reqOpts = {
                'q': self.artist + ' ' + self.title,
                'duration[to]': Math.max((self.duration * 1000) + 200000, 600000),
                'duration[from]': Math.max((self.duration * 1000) - 120000, 120000),
                'limit': 10
              };

              if (start_date != null) {
                var year, month, day, hour, min, sec;
                year = start_date.getFullYear();
                month = start_date.getMonth();
                day = start_date.getDate();
                hour = min = sec = '00';
                if (month < 10) {
                  month = ('0' + month)
                };
                if (day < 10) {
                  day = ('0' + day);
                }
                reqOpts['created_at[from]'] = (year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec);
              }

              SC.get('/tracks', reqOpts, function (res) {
                if (res.length > 0) {
                  var trackMatches = res.filter(function(o){
                    var tester = /(\s+|\(|^)(remix|instrumental|chopped|screwed|mix|edit|freestyle|bootleg|fix)(\s+|\)|$)/gi;
                    return tester.test(o.title) === tester.test(self.title);
                  }).map(function (o) {
                    // Modify result title (strip parameter encapsulated strings)
                    var resTitle = o.title.toLowerCase();
                    var songTitle = self.title.toLowerCase();
                    var songArtist = self.artist.toLowerCase();

                    // Levenshtein distance on modified result title
                    var maxdistance = Math.max(songTitle.length, resTitle.length);
                    var rating = 1 - (scMatch(songArtist + ' - ' + songTitle, resTitle) / maxdistance);
                    var images = self.images;
                    var trackPopSum;

                    rating = (rating * 0.3) + (wordMatch(songTitle, resTitle) * 0.7);

                    if (rating > 0.65 && o.favoritings_count != null && o.playback_count != null) {
                      trackPopSum = (o.favoritings_count / o.playback_count);
                      rating += trackPopSum * 20;
                    }

                    if (o.artwork_url != null && self.images.length === 0) {
                      images = [o.artwork_url];
                    }

                    return {
                      host: 'soundcloud',
                      mp3: 'http://api.soundcloud.com/tracks/'+o.id+'/stream?client_id=' + SC.options.client_id,
                      matchRating: rating, 
                      images: images,
                      waveform: o.waveform_url,
                      duration: Math.ceil((parseInt(o.duration) || 0) / 1000),
                      id: o.id
                    };
                    
                  }).sort(function (a, b) {
                    return b.matchRating - a.matchRating;
                  });

                  if (start_date != null && trackMatches.length === 0) {
                    deferred.reject(new Error('song not found'));
                    return;
                  }
                  else if (trackMatches.length !== 0 && trackMatches[0].matchRating < 0.9 && start_date == null) {
                    var checkd = new Date();
                    checkd.setTime(checkd.getTime() - 654800);
                    self.getSongFromQuery(checkd, false).then(function(res){
                      deferred.resolve(self);
                    });
                    return;
                  }
                }

                self._alt = trackMatches;
                self.nextAltStream();

                deferred.resolve(self);
              });
            });
          }
          else {
            deferred.resolve(self);
          }

          return deferred.promise;
        },
        props: function () {
          return {
            title: this.title,
            artist: this.artist,
            host: this.host,
            images: this.images,
            waveform: this.waveform,
            duration: this.duration,
            rating: this.rating,
            id: this.id,
            _id: this._id
          };
        }
      };

      angular.extend(
        Song.prototype,
        EventEmitter.prototype
      );

      return songFactory;
    };

    return {
      $get: SongModelFactory
    };
  }

})(); 