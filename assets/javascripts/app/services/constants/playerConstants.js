(function () {

  var playerConstants = {

    /**
     * Player settings
     */
    DEFAULT_PLAYER_VOLUME: 50,

    /**
     * Player statuses
     */
    STATUS_UNSTARTED: -1,
    STATUS_ENDED: 0,
    STATUS_PLAYING: 1,
    STATUS_PAUSED: 2,
    STATUS_BUFFERING: 3,
    STATUS_VIDEO_CUED: 5,

    /**
     * Player actions
     */
    ACTION_SET_STATUS:       'playerSetStatus',
    ACTION_SET_SONG:         'playerSetSong',
    ACTION_DESTROY_PLAYLIST: 'playerDestroyPlaylist',
    ACTION_SET_PLAYLIST:     'playerSetPlaylist',
    ACTION_PLAY_ALT:         'soundPlayAlt',
    ACTION_TOGGLE_VOLUME:    'soundToggleVolume',
    ACTION_SET_VOLUME:       'soundSetVolume',
    ACTION_PLAYING:          'soundPlaying',
    ACTION_STOP:             'soundStop',
    ACTION_SEEK_TO:          'soundSeekTo',
    ACTION_TOGGLE:           'soundToggle',
    ACTION_PLAY:             'soundPlay',
    ACTION_RESUME:           'soundResume',
    ACTION_PAUSE:            'soundPause',
    ACTION_BACK:             'soundBack',
    ACTION_FORWARD:          'soundForward'
  };

  angular.module('app.services.constants.playerConstants', [])
    .constant('playerConstants', playerConstants);

})(); 