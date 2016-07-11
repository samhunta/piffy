(function () {
  
  angular.module('app.controllers.player', [
    'app.services.youtubeControl.youtubeControlDirective',
    'app.services.player',
    'app.services.app.util',
    'app.services.actions.playerActions',
    'mgcrea.ngStrap.tooltip',
    'shava.services.util.debounce'
  ])

    .controller('PlayerController', PlayerController);

  PlayerController.$inject = ['playerActions', 'shavaThrottle', '$store', 'playerConstants', '$rootScope', 'app', 'formatDuration', '$scope', '$timeout'];

  function PlayerController(playerActions, shavaThrottle, $store, playerConstants, $rootScope, app, formatDuration, $scope, $timeout) {
    $store.bind('playerStore', $scope);

    $scope.tooltip = {
      "title": "None"
    };

    $scope.playTime = "0:00";

    $scope.playerPositionOpts = {
      useKnob: true,
      knobClass: 'sh-range-knob',
      onStart: function () {
        $scope.$player.isSeeking = true;
      },
      onMove: function () {
        $scope.$player.positionText = formatDuration($scope.$player.playerPositionRange, 1);
      },
      onEnd: function () {
        playerActions.seekTo($scope.$player.playerPositionRange);
        $scope.$player.isSeeking = false;
      },
      max: 0,
      min: 0
    };
    
    $scope.volumeOpts = {
      onStart: function () {
        $scope.$player.isSeekingVolume = true;
      },
      onEnd: function () {
        $scope.$player.isSeekingVolume = false;
      },
      onMove: shavaThrottle(function () {
        playerActions.setVolume($scope.$player.volumeRange);
      }, 25),
      max: 100,
      min: 0
    };
    
    $scope.$player = {
      positionText: '0:00',
      durationText: '0:00',
      button: false,
      waveformBg: null,
      volumeRange: 0,
      playerPositionRange: 0,
      volume: playerConstants.DEFAULT_PLAYER_VOLUME,
      vol: 3,
      isSeeking: false,
      isSeekingVolume: false,
      status: null,
      back: function () {
        playerActions.back();
      },
      forward: function () {
        playerActions.forward();
      },
      play: function () {
        playerActions.toggle();
      },
      toggleVolume: function () {
        playerActions.toggleVolume();
      }
    };

    $scope.$watch(function () {
      return $scope.$stores.playerStore.currentStatus;
    }, function (status) {
      if (status != null) {
        $scope.$player.status = status;
        $scope.$player.button = (status === playerConstants.STATUS_PLAYING);
      }
    });

    $scope.$watch(function () {
      return $scope.$stores.playerStore.currentVolume;
    }, function (volume) {
      $scope.$player.volume = volume;
      $scope.$player.volumeRange = volume;
      $scope.$player.vol = volume > 75 ? 3 : volume > 50 ? 2 : volume > 10 ? 1 : 0;
    });

    $scope.$watch(function () {
      return $scope.$stores.playerStore.currentProgress;
    }, function (progress) {
      if (! $scope.$player.isSeeking) {
        $scope.$player.playerPositionRange = progress;
        $scope.$player.positionText = formatDuration(progress, 1);
      }
    });

    $scope.$watch(function () {
      if ($scope.$stores.playerStore.currentSong != null) {
        return $scope.$stores.playerStore.currentSong.id;
      }
    }, function () {
      var song = $scope.$stores.playerStore.currentSong;
      if (song != null) {
        $scope.$player.durationText = formatDuration(song.duration, 1);
        $scope.playerPositionOpts.max = song.duration;
        $scope.$player.waveformBg = song.waveform ?
          'url("' + song.waveform + '")' :
          null;
      }
    });

    $scope.$on('$destroy', function () {
      removeKeyBindings();
    });

  }

})(); 