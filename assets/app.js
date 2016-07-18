/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	__webpack_require__(3);
	__webpack_require__(!(function webpackMissingModule() { throw new Error("Cannot find module \"ui.router\""); }()));
	__webpack_require__(!(function webpackMissingModule() { throw new Error("Cannot find module \"mgcrea.ngStrap\""); }()));
	__webpack_require__(!(function webpackMissingModule() { throw new Error("Cannot find module \"ngAnimate\""); }()));
	__webpack_require__(11);
	__webpack_require__(10);
	__webpack_require__(12);
	__webpack_require__(2);
	__webpack_require__(7);
	__webpack_require__(6);
	__webpack_require__(5);
	__webpack_require__(4);
	__webpack_require__(9);
	/* WEBPACK VAR INJECTION */(function(angular) {(function(){

	  'use strict';

	  //========================================
	  // App modules
	  //========================================

	  // Main app
	  (module.exports['app'] = angular.module('app', [
	    'ng',
	    'shava',
	    'vs-repeat',
	    'app.config',
	    'app.routes',
	    'app.settings',
	    'app.models',
	    'app.templates',
	    'app.controllers',
	    'app.directives',
	    'app.services',
	    'ngAnimate',
	    'mgcrea.ngStrap',
	    'ui.router'
	  ]));

	}());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14);
	__webpack_require__(13);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {

	  'use strict';

	  //========================================
	  // Core modules
	  //========================================

	  (module.exports['shava'] = angular.module('shava', [
	    'shava.directives',
	    'shava.services'
	  ]));

	}());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(!(function webpackMissingModule() { throw new Error("Cannot find module \"ui.router\""); }()));
	__webpack_require__(18);
	__webpack_require__(17);
	__webpack_require__(16);
	__webpack_require__(15);
	/* WEBPACK VAR INJECTION */(function(angular, process) {(function () {

	  (module.exports['app.config'] = angular.module('app.config', [
	    'shava.services.nwSupport',
	    'shava.services.sessions',
	    'app.services.lastfmFeeds',
	    'app.services.soundcloudControl',
	    'ui.router'
	  ]))
	    .config(configureApp)
	    .run(runApp);

	  runApp.$inject = ['$store', '$window', 'shavaNwGui', '$rootScope', '$state'];

	  function runApp($store, $window, shavaNwGui, $rootScope, $state) {
	    $store.bind('playerStore', $rootScope);

	    var $history = {
	      noIncrement: false,
	      hasNext: false,
	      hasPrev: false,
	      total: 0,
	      index: 0,
	      back: function () {
	        if ($history.hasPrev) {
	          if ($history.index === $history.total) {
	            $history.hasNext = true;            
	          }

	          if (--$history.index === 0) {
	            $history.hasPrev = false;
	          }

	          $history.noIncrement = true;
	          $window.history.back();
	        }
	      },
	      forward: function () {
	        if ($history.hasNext) {
	          $history.hasPrev = true;

	          if (++$history.index === $history.total) {
	            $history.hasNext = false;
	          }

	          $history.noIncrement = true;
	          $window.history.forward();
	        }
	      },
	      increment: function () {
	        if ($history.noIncrement) {
	          $history.noIncrement = false;
	          return;
	        }

	        if ($history.index !== $history.total) {
	          $history.total = ++$history.index;
	          $history.hasNext = false;
	        }
	        else {
	          $history.index++;
	          $history.total++;
	        }

	        $history.hasPrev = true;
	      }
	    };

	    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
	      $rootScope.stateLoading = true;
	      $rootScope.$broadcast('app:sidebarUpdate', toState.name, toParams.id);

	      if ($rootScope.$history == null) {
	        $rootScope.$history = $history;
	      }
	      else {
	        $history.increment();
	      }
	    });

	    $rootScope.$on('$stateChangeSuccess', function () {
	      $rootScope.stateLoading = false;
	    });

	    $rootScope.$on('$stateChangeError', function () {
	      $rootScope.stateLoading = false;
	    });

	    if (! shavaNwGui.nodeless) {
	      var win = shavaNwGui.Window.get();
	      var menu = new shavaNwGui.Menu({ type: 'menubar' });

	      switch(process.platform) {
	        case 'darwin':
	          if (typeof menu.createMacBuiltin === 'function') {
	            menu.createMacBuiltin($window.title);
	            win.menu = menu;
	          }
	          break;
	        case 'windows':
	        case 'linux':
	        case 'linux64':
	        default:
	          win.menu = menu;
	          break;
	      }
	    }
	  }

	  configureApp.$inject = [
	    'soundcloudControlProvider',
	    'shavaSessionsFactoryProvider',
	    'lastfmFeedsFactoryProvider',
	    '$rootScopeProvider'
	  ];

	  function configureApp(soundcloudControlProvider, shavaSessionsFactoryProvider, lastfmFeedsFactoryProvider, $rootScopeProvider)
	  {
	    var $rootScope$$get = $rootScopeProvider.$get;

	    // Set our drivers
	    shavaSessionsFactoryProvider.setDriver('shavaSessionsLocalStorageFactory');
	  
	    lastfmFeedsFactoryProvider.setKey('a9fdbef9d3ff8a29e4d96c47d88cd60e');
	    soundcloudControlProvider.setKey('52f90bc8a437ef08446678dd9a28e459');
	    soundcloudControlProvider.setUrl('https://[REDACTED]/app-callback');

	    $rootScopeProvider.$get = ['$injector', function ($injector) {
	      var obj = $injector.invoke($rootScope$$get);

	      return obj;
	    }];
	  }


	}());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), __webpack_require__(74)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {

	  (module.exports['app.routes'] = angular.module('app.routes', ['app.templates']))
	    .constant('TEMPLATE_PATH', 'app/templates/')
	    .config(configureRoutes);

	  configureRoutes.$inject = ['TEMPLATE_PATH', '$locationProvider', '$stateProvider', '$urlRouterProvider'];

	  function configureRoutes(TEMPLATE_PATH, $locationProvider, $stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise('/');

	    $locationProvider.html5Mode(false).hashPrefix('!');

	    $stateProvider
	      .state('app', {
	        abstract: true,
	        url: '',
	        templateUrl: TEMPLATE_PATH+'app.html',
	        controller: 'AppController'
	      })

	      .state('login', {
	        url: '/login',
	        templateUrl: TEMPLATE_PATH+'login.html',
	        controller: 'LoginController'
	      })

	      .state('app.player', {
	        abstract: true,
	        url: '',
	        views: {
	          '': {
	            template: '<ui-view />'
	          },
	          'searchBar': {
	            controller: 'SearchBarController',
	            templateUrl: TEMPLATE_PATH+'searchBar.html'
	          },
	          'sidebar': {
	            controller: 'SidebarController',
	            templateUrl: TEMPLATE_PATH+'sidebar.html'
	          },
	          'player': {
	            controller: 'PlayerController',
	            templateUrl: TEMPLATE_PATH+'player.html'
	          },
	        }
	      })

	      .state('app.player.index', {
	        url: '/',
	        templateUrl: TEMPLATE_PATH+'home.html',
	        controller: 'HomeController'
	      })

	      .state('app.player.preferences', {
	        templateUrl: TEMPLATE_PATH+'preferences.html',
	        controller: 'PreferencesController'
	      })

	      .state('app.player.browse', {
	        url: '/browse',
	        controller: 'BrowseController',
	        templateUrl: TEMPLATE_PATH+'browse.html',
	        abstract: true
	      })

	      .state('app.player.browse.videos', {
	        url: '/videos'
	      })

	      .state('app.player.browse.books', {
	        url: '/books'
	      })

	      .state('app.player.browse.games', {
	        url: '/games'
	      })
	      
	      .state('app.player.browse.music', {
	        url: '/music'
	      })

	      .state('app.player.browse.apps', {
	        url: '/apps'
	      })

	      .state('app.player.controversial', {
	        url: '/controversial',
	        templateUrl: TEMPLATE_PATH+'controversial.html'
	      })

	      .state('app.player.downloads', {
	        url: '/downloads',
	        templateUrl: TEMPLATE_PATH+'downloads.html',
	        controller: 'DownloadsController'
	      })

	      .state('app.player.playlist', {
	        abstract: true,
	        url: '/playlist'
	      })

	      .state('app.player.playlist.queue', {
	        url: '/queue',
	        views: {
	          '@app.player': {
	            templateUrl: TEMPLATE_PATH+'queue.html',
	            controller: 'QueueController'
	          }
	        }
	      })

	      .state('app.player.playlist.recent', {
	        url: '/recent',
	        views: {
	          '@app.player': {
	            templateUrl: TEMPLATE_PATH+'playlist.html',
	            controller: 'PlaylistController'
	          }
	        }
	      })

	      .state('app.player.playlist.user', {
	        url: '/user/{id:[0-9]+\-[0-9]+}',
	        views: {
	          '@app.player': {
	            templateUrl: TEMPLATE_PATH+'playlist.html',
	            controller: 'PlaylistController'
	          }
	        }
	      });


	  }


	}());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(19);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {

	  /**
	   * Default build settings
	   */
	  var settings = __webpack_require__(75);

	  /**
	   * User Settings
	   */
	  var userSettings = {
	    columnWidths: {
	      sidebar: 220,
	      playlist: [329, 74, 110, 200, 100]
	    }
	  };
	  
	  (module.exports['app.settings'] = angular.module('app.settings', [
	    'shava.services.settings'
	  ]))
	  .config(configSettings);

	  configSettings.$inject = ['shavaSettingsFactoryProvider'];

	  function configSettings(shavaSettingsFactoryProvider) {
	    shavaSettingsFactoryProvider.defaults("app", settings);
	    shavaSettingsFactoryProvider.defaults("user-0", userSettings);
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(21);
	__webpack_require__(20);
	/* WEBPACK VAR INJECTION */(function(angular) {

	  // Models
	  (module.exports['app.models'] = angular.module('app.models', [
	    'app.models.song',
	    'app.models.playlist'
	  ]));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {

	  (module.exports['app.templates'] = angular.module('app.templates', []));

	  var style = __webpack_require__(91);
	  style.use();

	  // Load angular strap templates, for some reason
	  // webpack is not including these?
	  __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"angular-strap/dist/angular-strap.tpl.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	  __webpack_require__(76);
	  __webpack_require__(77);
	  __webpack_require__(78);
	  __webpack_require__(79);
	  __webpack_require__(80);
	  __webpack_require__(81);
	  __webpack_require__(82);
	  __webpack_require__(83);
	  __webpack_require__(84);
	  __webpack_require__(85);
	  __webpack_require__(86);
	  __webpack_require__(87);
	  __webpack_require__(88);
	  __webpack_require__(89);
	  __webpack_require__(90);

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(28);
	__webpack_require__(23);
	__webpack_require__(33);
	__webpack_require__(32);
	__webpack_require__(31);
	__webpack_require__(30);
	__webpack_require__(24);
	__webpack_require__(22);
	__webpack_require__(27);
	__webpack_require__(26);
	__webpack_require__(25);
	__webpack_require__(29);
	/* WEBPACK VAR INJECTION */(function(angular) {
	// Controllers
	(module.exports['app.controllers'] = angular.module('app.controllers', [
	  'app.controllers.app',
	  'app.controllers.downloads',
	  'app.controllers.browse',
	  'app.controllers.login',
	  'app.controllers.sidebar',
	  'app.controllers.playlist',
	  'app.controllers.preferences',
	  'app.controllers.search',
	  'app.controllers.searchBar',
	  'app.controllers.player',
	  'app.controllers.home',
	  'app.controllers.queue'
	]));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(35);
	__webpack_require__(34);
	/* WEBPACK VAR INJECTION */(function(angular) {
	  // Directives
	  (module.exports['app.directives'] = angular.module('app.directives', [
	    'app.directives.loader',
	    'app.directives.stars'
	  ]));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(40);
	__webpack_require__(41);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(36);
	__webpack_require__(39);
	__webpack_require__(38);
	__webpack_require__(37);
	/* WEBPACK VAR INJECTION */(function(angular) {
	  // Services
	  (module.exports['app.services'] = angular.module('app.services', [
	    'app.services.app',
	    'app.services.stores',
	    'app.services.freebase',
	    'app.services.youtubeFeeds',
	    'app.services.youtubeControl',
	    'app.services.soundcloudControl',
	    'app.services.lastfmFeeds',
	    'app.services.player'
	  ]));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {//
	// Copyright Kamil Pękala http://github.com/kamilkp
	// Angular Virtual Scroll Repeat v1.0.0-rc5 2014/08/01
	//

	(function(window, angular){
	  'use strict';
	  /* jshint eqnull:true */
	  /* jshint -W038 */

	  // DESCRIPTION:
	  // vsRepeat directive stands for Virtual Scroll Repeat. It turns a standard ngRepeated set of elements in a scrollable container
	  // into a component, where the user thinks he has all the elements rendered and all he needs to do is scroll (without any kind of
	  // pagination - which most users loath) and at the same time the browser isn't overloaded by that many elements/angular bindings etc.
	  // The directive renders only so many elements that can fit into current container's clientHeight/clientWidth.

	  // LIMITATIONS:
	  // - current version only supports an Array as a right-hand-side object for ngRepeat
	  // - all rendered elements must have the same height/width or the sizes of the elements must be known up front

	  // USAGE:
	  // In order to use the vsRepeat directive you need to place a vs-repeat attribute on a direct parent of an element with ng-repeat
	  // example:
	  // <div vs-repeat>
	  //    <div ng-repeat="item in someArray">
	  //      <!-- content -->
	  //    </div>
	  // </div>
	  //
	  // You can also measure the single element's height/width (including all paddings and margins), and then speficy it as a value
	  // of the attribute 'vs-repeat'. This can be used if one wants to override the automatically computed element size.
	  // example:
	  // <div vs-repeat="50"> <!-- the specified element height is 50px -->
	  //    <div ng-repeat="item in someArray">
	  //      <!-- content -->
	  //    </div>
	  // </div>
	  //
	  // IMPORTANT!
	  //
	  // - the vsRepeat directive must be applied to a direct parent of an element with ngRepeat
	  // - the value of vsRepeat attribute is the single element's height/width measured in pixels. If none provided, the directive
	  //    will compute it automatically

	  // OPTIONAL PARAMETERS (attributes):
	  // vs-scroll-parent="selector" - selector to the scrollable container. The directive will look for a closest parent matching
	  //                he given selector (defaults to the current element)
	  // vs-horizontal - stack repeated elements horizontally instead of vertically
	  // vs-offset-before="value" - top/left offset in pixels (defaults to 0)
	  // vs-offset-after="value" - bottom/right offset in pixels (defaults to 0)
	  // vs-excess="value" - an integer number representing the number of elements to be rendered outside of the current container's viewport
	  //            (defaults to 2)
	  // vs-size-property - a property name of the items in collection that is a number denoting the element size (in pixels)
	  // vs-autoresize - use this attribute without vs-size-property and without specifying element's size. The automatically computed element style will
	  //        readjust upon window resize if the size is dependable on the viewport size

	  // EVENTS:
	  // - 'vsRepeatTrigger' - an event the directive listens for to manually trigger reinitialization
	  // - 'vsRepeatReinitialized' - an event the directive emits upon reinitialization done

	  var isMacOS = navigator.appVersion.indexOf('Mac') != -1,
	    wheelEventName = typeof window.onwheel !== 'undefined' ? 'wheel' : typeof window.onmousewheel !== 'undefined' ? 'mousewheel' : 'DOMMouseScroll',
	    dde = document.documentElement,
	    matchingFunction = dde.matches ? 'matches' :
	              dde.matchesSelector ? 'matchesSelector' :
	              dde.webkitMatches ? 'webkitMatches' :
	              dde.webkitMatchesSelector ? 'webkitMatchesSelector' :
	              dde.msMatches ? 'msMatches' :
	              dde.msMatchesSelector ? 'msMatchesSelector' :
	              dde.mozMatches ? 'mozMatches' :
	              dde.mozMatchesSelector ? 'mozMatchesSelector' : null;

	  var closestElement = angular.element.prototype.closest || function (selector){
	    var el = this[0].parentNode;
	    while(el !== document.documentElement && el != null && !el[matchingFunction](selector)){
	      el = el.parentNode;
	    }

	    if(el && el[matchingFunction](selector))
	      return angular.element(el);
	    else
	      return angular.element();
	  };

	  angular.module('vs-repeat', []).directive('vsRepeat', ['$compile', function($compile){
	    return {
	      restrict: 'A',
	      scope: true,
	      require: '?^vsRepeat',
	      controller: ['$scope', function($scope){
	        this.$scrollParent = $scope.$scrollParent;
	        this.$fillElement = $scope.$fillElement;
	      }],
	      compile: function($element, $attrs){
	        var ngRepeatChild = $element.children().eq(0),
	          ngRepeatExpression = ngRepeatChild.attr('ng-repeat'),
	          childCloneHtml = ngRepeatChild[0].outerHTML,
	          expressionMatches = /^\s*(\S+)\s+in\s+([\S\s]+?)(track\s+by\s+\S+)?$/.exec(ngRepeatExpression),
	          lhs = expressionMatches[1],
	          rhs = expressionMatches[2],
	          rhsSuffix = expressionMatches[3],
	          collectionName = '$vs_collection',
	          attributesDictionary = {
	            'vsRepeat': 'elementSize',
	            'vsOffsetBefore': 'offsetBefore',
	            'vsOffsetAfter': 'offsetAfter',
	            'vsExcess': 'excess'
	          };

	        $element.empty();
	        if(!window.getComputedStyle || window.getComputedStyle($element[0]).position !== 'absolute')
	          $element.css('position', 'relative');
	        return {
	          pre: function($scope, $element, $attrs, $ctrl){
	            var childClone = angular.element(childCloneHtml),
	              originalCollection = [],
	              originalLength,
	              $$horizontal = typeof $attrs.vsHorizontal !== "undefined",
	              $wheelHelper,
	              $fillElement,
	              autoSize = !$attrs.vsRepeat,
	              sizesPropertyExists = !!$attrs.vsSizeProperty,
	              $scrollParent = $attrs.vsScrollParent ? closestElement.call($element, $attrs.vsScrollParent) : $element,
	              positioningPropertyTransform = $$horizontal ? 'translateX' : 'translateY',
	              positioningProperty = $$horizontal ? 'left' : 'top',

	              clientSize =  $$horizontal ? 'clientWidth' : 'clientHeight',
	              offsetSize =  $$horizontal ? 'offsetWidth' : 'offsetHeight',
	              scrollPos =  $$horizontal ? 'scrollLeft' : 'scrollTop';

	            if($scrollParent.length === 0) throw 'Specified scroll parent selector did not match any element';
	            $scope.$scrollParent = $scrollParent;

	            if(sizesPropertyExists) $scope.sizesCumulative = [];

	            //initial defaults
	            $scope.elementSize = $scrollParent[0][clientSize] || 50;
	            $scope.offsetBefore = 0;
	            $scope.offsetAfter = 0;
	            $scope.excess = 2;

	            Object.keys(attributesDictionary).forEach(function(key){
	              if($attrs[key]){
	                $attrs.$observe(key, function(value){
	                  $scope[attributesDictionary[key]] = +value;
	                  reinitialize();
	                });
	              }
	            });


	            $scope.$watchCollection(rhs, function(coll){
	              originalCollection = coll || [];
	              refresh();
	            });

	            function refresh(){
	              if(!originalCollection || originalCollection.length < 1){
	                $scope[collectionName] = [];
	                originalLength = 0;
	                resizeFillElement(0);
	                $scope.sizesCumulative = [0];
	                return;
	              }
	              else{
	                originalLength = originalCollection.length;
	                if(sizesPropertyExists){
	                  $scope.sizes = originalCollection.map(function(item){
	                    return item[$attrs.vsSizeProperty];
	                  });
	                  var sum = 0;
	                  $scope.sizesCumulative = $scope.sizes.map(function(size){
	                    var res = sum;
	                    sum += size;
	                    return res;
	                  });
	                  $scope.sizesCumulative.push(sum);
	                }
	                setAutoSize();
	              }

	              reinitialize();
	            }

	            function setAutoSize(){
	              if(autoSize){
	                $scope.$$postDigest(function(){
	                  if($element[0].offsetHeight || $element[0].offsetWidth){ // element is visible
	                    var children = $element.children(),
	                      i = 0;
	                    while(i < children.length){
	                      if(children[i].attributes['ng-repeat'] != null){
	                        if(children[i][offsetSize]){
	                          $scope.elementSize = children[i][offsetSize];
	                          reinitialize();
	                          autoSize = false;
	                          if($scope.$root && !$scope.$root.$$phase)
	                            $scope.$apply();
	                        }
	                        break;
	                      }
	                      i++;
	                    }
	                  }
	                  else{
	                    var dereg = $scope.$watch(function(){
	                      if($element[0].offsetHeight || $element[0].offsetWidth){
	                        dereg();
	                        setAutoSize();
	                      }
	                    });
	                  }
	                });
	              }
	            }

	            childClone.attr('ng-repeat', lhs + ' in ' + collectionName + (rhsSuffix ? ' ' + rhsSuffix : ''))
	                .addClass('vs-repeat-repeated-element');

	            var offsetCalculationString = sizesPropertyExists ?
	              '(sizesCumulative[$index + startIndex] + offsetBefore)' :
	              '(($index + startIndex) * elementSize + offsetBefore)';

	            if(typeof document.documentElement.style.transform !== "undefined"){ // browser supports transform css property
	              childClone.attr('ng-style', '{ "transform": "' + positioningPropertyTransform + '(" + ' + offsetCalculationString + ' + "px)"}');
	            }
	            else if(typeof document.documentElement.style.webkitTransform !== "undefined"){ // browser supports -webkit-transform css property
	              childClone.attr('ng-style', '{ "-webkit-transform": "' + positioningPropertyTransform + '(" + ' + offsetCalculationString + ' + "px)"}');
	            }
	            else{
	              childClone.attr('ng-style', '{' + positioningProperty + ': ' + offsetCalculationString + ' + "px"}');
	            }

	            $compile(childClone)($scope);
	            $element.append(childClone);

	            $fillElement = angular.element('<div class="vs-repeat-fill-element"></div>')
	              .css({
	                'position':'relative',
	                'min-height': '100%',
	                'min-width': '100%'
	              });
	            $element.append($fillElement);
	            $compile($fillElement)($scope);
	            $scope.$fillElement = $fillElement;

	            var _prevMouse = {};
	            if(isMacOS){
	              $wheelHelper = angular.element('<div class="vs-repeat-wheel-helper"></div>')
	                .on(wheelEventName, function(e){
	                  e.preventDefault();
	                  e.stopPropagation();
	                  if(e.originalEvent) e = e.originalEvent;
	                  $scrollParent[0].scrollLeft += (e.deltaX || -e.wheelDeltaX);
	                  $scrollParent[0].scrollTop += (e.deltaY || -e.wheelDeltaY);
	                }).on('mousemove', function(e){
	                  if(_prevMouse.x !== e.clientX || _prevMouse.y !== e.clientY)
	                    angular.element(this).css('display', 'none');
	                  _prevMouse = {
	                    x: e.clientX,
	                    y: e.clientY
	                  };
	                }).css('display', 'none');
	              $fillElement.append($wheelHelper);
	            }

	            $scope.startIndex = 0;
	            $scope.endIndex = 0;

	            $scrollParent.on('scroll', function scrollHandler(e){
	              if(updateInnerCollection())
	                $scope.$apply();
	            });

	            if(isMacOS){
	              $scrollParent.on(wheelEventName, wheelHandler);
	            }
	            function wheelHandler(e){
	              var elem = e.currentTarget;
	              if(elem.scrollWidth > elem.clientWidth || elem.scrollHeight > elem.clientHeight)
	                $wheelHelper.css('display', 'block');
	            }

	            function onWindowResize(){
	              if(typeof $attrs.vsAutoresize !== 'undefined'){
	                autoSize = true;
	                setAutoSize();
	                if($scope.$root && !$scope.$root.$$phase)
	                  $scope.$apply();
	              }
	              if(updateInnerCollection())
	                $scope.$apply();
	            }

	            angular.element(window).on('resize', onWindowResize);
	            $scope.$on('$destroy', function(){
	              angular.element(window).off('resize', onWindowResize);
	            });

	            $scope.$on('vsRepeatTrigger', refresh);
	            $scope.$on('vsRepeatResize', function(){
	              autoSize = true;
	              setAutoSize();
	            });

	            var _prevStartIndex,
	              _prevEndIndex;
	            function reinitialize(){
	              _prevStartIndex = void 0;
	              _prevEndIndex = void 0;
	              updateInnerCollection();
	              resizeFillElement(sizesPropertyExists ?
	                        $scope.sizesCumulative[originalLength] :
	                        $scope.elementSize*originalLength
	                      );
	              $scope.$emit('vsRepeatReinitialized');
	            }

	            function resizeFillElement(size){
	              if($$horizontal){
	                $fillElement.css({
	                  'width': $scope.offsetBefore + size + $scope.offsetAfter + 'px',
	                  'height': '100%'
	                });
	                if($ctrl && $ctrl.$fillElement){
	                  var referenceElement = $ctrl.$fillElement[0].parentNode.querySelector('[ng-repeat]');
	                  if(referenceElement)
	                    $ctrl.$fillElement.css({
	                      'width': referenceElement.scrollWidth + 'px'
	                    });
	                }
	              }
	              else{
	                $fillElement.css({
	                  'height': $scope.offsetBefore + size + $scope.offsetAfter + 'px',
	                  'width': '100%'
	                });
	                if($ctrl && $ctrl.$fillElement){
	                  referenceElement = $ctrl.$fillElement[0].parentNode.querySelector('[ng-repeat]');
	                  if(referenceElement)
	                    $ctrl.$fillElement.css({
	                      'height': referenceElement.scrollHeight + 'px'
	                    });
	                }
	              }
	            }

	            var _prevClientSize;
	            function reinitOnClientHeightChange(){
	              var ch = $scrollParent[0][clientSize];
	              if(ch !== _prevClientSize){
	                reinitialize();
	                if($scope.$root && !$scope.$root.$$phase)
	                  $scope.$apply();
	              }
	              _prevClientSize = ch;
	            }

	            $scope.$watch(function(){
	              if(typeof window.requestAnimationFrame === "function")
	                window.requestAnimationFrame(reinitOnClientHeightChange);
	              else
	                reinitOnClientHeightChange();
	            });

	            function updateInnerCollection(){
	              if(sizesPropertyExists){
	                $scope.startIndex = 0;
	                while($scope.sizesCumulative[$scope.startIndex] < $scrollParent[0][scrollPos] - $scope.offsetBefore)
	                  $scope.startIndex++;
	                if($scope.startIndex > 0) $scope.startIndex--;

	                $scope.endIndex = $scope.startIndex;
	                while($scope.sizesCumulative[$scope.endIndex] < $scrollParent[0][scrollPos] - $scope.offsetBefore + $scrollParent[0][clientSize])
	                  $scope.endIndex++;
	              }
	              else{
	                $scope.startIndex = Math.max(
	                  Math.floor(
	                    ($scrollParent[0][scrollPos] - $scope.offsetBefore) / $scope.elementSize + $scope.excess/2
	                  ) - $scope.excess,
	                  0
	                );

	                $scope.endIndex = Math.min(
	                  $scope.startIndex + Math.ceil(
	                    $scrollParent[0][clientSize] / $scope.elementSize
	                  ) + $scope.excess,
	                  originalLength
	                );
	              }


	              var digestRequired = $scope.startIndex !== _prevStartIndex || $scope.endIndex !== _prevEndIndex;

	              if(digestRequired)
	                $scope[collectionName] = originalCollection.slice($scope.startIndex, $scope.endIndex);

	              _prevStartIndex = $scope.startIndex;
	              _prevEndIndex = $scope.endIndex;

	              return digestRequired;
	            }
	          }
	        };
	      }
	    };
	  }]);

	  angular.element(document.head).append([
	    '<style>' +
	    '.vs-repeat-wheel-helper{' +
	      'position: absolute;' +
	      'top: 0;' +
	      'bottom: 0;' +
	      'left: 0;' +
	      'right: 0;' +
	      'z-index: 99999;' +
	      'background: rgba(0, 0, 0, 0);' +
	    '}' +
	    '.vs-repeat-repeated-element{' +
	      'position: absolute;' +
	      'z-index: 1;' +
	    '}' +
	    '</style>'
	  ].join(''));
	})(window, window.angular);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	__webpack_require__(43);
	__webpack_require__(55);
	__webpack_require__(54);
	__webpack_require__(53);
	__webpack_require__(52);
	__webpack_require__(51);
	__webpack_require__(44);
	__webpack_require__(42);
	__webpack_require__(48);
	__webpack_require__(47);
	__webpack_require__(46);
	__webpack_require__(45);
	__webpack_require__(50);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives'] = angular.module('shava.directives', [
	    'shava.directives.dropdown',
	    'shava.directives.rightClick',
	    'shava.directives.columns',
	    'shava.directives.include',
	    'shava.directives.editable',
	    'shava.directives.selectables',
	    'shava.directives.undoStack',
	    'shava.directives.fixedScroll',
	    'shava.directives.focusable',
	    'shava.directives.autofocus',
	    'shava.directives.range',
	    'shava.directives.sorter',
	    'shava.directives.key',
	    'shava.directives.nav'
	  ]));


	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(19);
	__webpack_require__(60);
	__webpack_require__(15);
	__webpack_require__(59);
	__webpack_require__(16);
	__webpack_require__(58);
	__webpack_require__(57);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.services'] = angular.module('shava.services', [
	    'shava.services.sessions',
	    'shava.services.sessions.localStorageAdapter',
	    'shava.services.util',
	    'shava.services.settings',
	    'shava.services.ctrlTabs',
	    'shava.services.nwSupport',
	    'shava.services.contextMenu'
	  ]));

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {

	  (module.exports['shava.services.nwSupport'] = angular.module('shava.services.nwSupport', [
	    'shava.services.nwSupport.nwGui'
	  ]));

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(61);
	/* WEBPACK VAR INJECTION */(function(angular) {(function(){
	  var EventEmitter = __webpack_require__(112).EventEmitter;

	  (module.exports['shava.services.sessions'] = angular.module('shava.services.sessions', [
	    'shava.services.util.driver',
	    'shava.services.util.deepMerge'
	  ]))

	    .provider('shavaSessionsFactory', shavaSessionsFactoryProvider);

	    shavaSessionsFactoryProvider.$inject = ['shavaDriverFactoryProvider'];

	    function shavaSessionsFactoryProvider(shavaDriverFactoryProvider) {
	      var sessions = {};

	      var undef;

	      var driver = shavaDriverFactoryProvider.create('shavaSessionsFactory', {
	        $contract: { get: 'function', set: 'function' },
	        bindArray: function (key, autosave, method) {
	          var dat, arr, session = this;

	          var defObj = function (obj) {
	            if (! obj || ! angular.isArray(obj.data)) {
	              obj = { _id: 0, data: [] };
	            }
	            return obj;
	          };

	          dat = defObj(session.get(key, null));
	          arr = dat.data;

	          angular.extend(arr, new EventEmitter(), {
	            find: function (attrs) {
	              return arr.filter(function (value) {
	                var result = true;

	                Object.keys(attrs).forEach(function(key) {
	                  result = result && (attrs[key] === value[key]);
	                })

	                return result;
	              });
	            },
	            redirect: function (newKey) {
	              dat = defObj(session.get(newKey, null));
	              arr = dat.data;
	            },
	            getKey: function () { return ++dat._id; },
	            push: function () { return patchArray(arr, save, 'push', arguments); },
	            unshift: function () { return patchArray(arr, save, 'unshift', arguments); },
	            splice: function () { return patchArray(arr, save, 'splice', arguments); },
	            remove: function (index) { return arr.splice(index, 1); },
	            data: function () { return arr.data; },
	            set: function (index, value) { arr[index] = value; autosave && save(); },
	            clear: function () { arr.splice(0, arr.length); },
	            save: function () { return save(); }
	          });

	          if (method != null) {
	            angular.extend(arr, method);
	          }

	          if (arr.$deserialize != null) {
	            angular.forEach(arr, function (value, key) {
	              arr[key] = arr.$deserialize(value);
	            });
	          }

	          function save() {
	            var data = Array.prototype.slice.call(arr);

	            if (arr.$serialize != null) {
	              angular.forEach(data, function (value, key) {
	                data[key] = arr.$serialize(value);
	              });
	            }

	            return session.set(key, { _id: dat._id, data: Array.prototype.slice.call(data) });
	          }

	          function patchArray(arr, after, method, args) {
	            var ac = Array.prototype[method].apply(arr, args);
	            autosave && after();
	            return ac;
	          }

	          return arr;
	        },
	        bindObject: function (skey, autosave, applier) {
	          var session = this
	            , obj;
	          
	          var defObj = function (obj) {
	            if (! angular.isObject(obj) || obj._id == null) {
	              obj = { _id: 0, data: {} };
	            }
	            return obj;
	          };

	          obj = defObj(session.get(skey, null));

	          return {
	            save: function () {
	              return session.set(skey, obj);
	            },
	            set: function (key, val) {
	              try {
	                eval('(obj.data.'+key+'=val);');
	                autosave && session.save();
	                return true;
	              } catch (e) {
	                return false;
	              }
	            },
	            getKey: function () {
	              return 'i'+(++obj._id);
	            },
	            get: function (key, def) {
	              var val;
	              try {
	                val = eval('(obj.data.'+key+');');
	                return val !== undef ? val : def;
	              } catch (e) {
	                return def;
	              }
	            },
	            extend: function (vals, replace) {
	              replace = replace !== undef || replace;
	              if (replace) {
	                angular.forEach(vals, function (val, key) {
	                  session.set(key, val);
	                });
	              }
	              else {
	                angular.forEach(vals, function (val, key) {
	                  if (session.get(key) == null) {
	                    session.set(key, val);
	                  }
	                });                
	              }
	            },
	            redirect: function (newKey) {
	              dat = defObj(session.get(newKey, null));
	              arr = dat.data;
	            },
	            create: function (add) {
	              add._id = add._id || session.getKey();
	              session.set(add._id, add);
	            },
	            setData: function (data) {
	              obj.data = data;
	            },
	            data: function () {
	              return obj.data;
	            },
	            remove: function (key) {
	              try {
	                eval('(delete obj.data.'+key+');');
	                autosave && session.save();
	              } catch (e) {}
	            },
	            clear: function () {
	              var key;
	              for (key in obj.data) {
	                if (obj.data.hasOwnProperty(key)) {
	                  delete obj.data[key];
	                }
	              }
	              autosave && session.save();
	            }
	          };
	        }
	      });

	      return driver;

	    }

	}());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['app.services.lastfmFeeds'] = angular.module('app.services.lastfmFeeds', ['ng']))

	    .provider('lastfmFeedsFactory', lastfmFeedsFactoryProvider);

	  lastfmFeedsFactoryProvider.$inject = [];

	  function lastfmFeedsFactoryProvider() {
	    var config = {
	      url: 'https://ws.audioscrobbler.com/2.0/',
	      defaults: {
	        'format': 'json',
	        'limit': 30
	      }
	    };

	    return {
	      $get: lastfmFeedsFactory,
	      setKey: function (key) {
	        config.defaults.api_key = key;
	      },
	      setUrl: function (url) {
	        config.url = url;
	      },
	      defaults: function (opts) {
	        angular.extend(config, opts);
	      }
	    };

	    lastfmFeedsFactory.$inject = ['$http'];

	    function lastfmFeedsFactory($http) {
	      return get;

	      function get(method, queryData, cache) {
	        var queryObj, query;

	        queryData.method = method;

	        queryObj = angular.extend({}, config.defaults, queryData);
	        query = '?' + angular.element.param(queryObj);

	        return $http({
	          method: 'GET',
	          url: config.url + query,
	          cache: cache
	        })
	          .then(function (resp) {
	            return resp.data;
	          });
	      }
	    }
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {

	  (module.exports['app.services.soundcloudControl'] = angular.module('app.services.soundcloudControl', [
	    'app.services.soundcloudControl.soundcloudControlDirective'
	  ]))

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.services.settings'] = angular.module('shava.services.settings', []))

	    .provider('shavaSettingsFactory', shavaSettingsFactoryProvider);

	  shavaSettingsFactoryProvider.$inject = ['shavaSessionsFactoryProvider'];

	  function shavaSettingsFactoryProvider(shavaSessionsFactoryProvider) {
	    var settings = {};

	    shavaSettingsFactory.$inject = ['shavaSessionsFactory', 'shavaDeepMerge'];

	    return {
	      $get: shavaSettingsFactory,
	      defaults: defaults
	    };

	    function defaults(name, newSettings) {
	      angular.extend(getSettings(name), newSettings);
	    }

	    function getSettings(name) {
	      if (settings[name] == null) {
	        settings[name] = {};
	      }

	      return settings[name];
	    }

	    function shavaSettingsFactory(shavaSessionsFactory, deepMerge) {
	      return function (name) {
	        var obj = shavaSessionsFactory.bindObject(name + '_settings', false);
	        var data = {};

	        deepMerge(data, getSettings(name));
	        deepMerge(data, obj.data());

	        obj.setData(data);

	        return obj;
	      };
	    }
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(18);
	__webpack_require__(64);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  var Immutable = __webpack_require__(113);
	  var EventEmitter = __webpack_require__(112).EventEmitter;
	  var undef;

	  (module.exports['app.models.song'] = angular.module('app.models.song', [
	    'app.services.app.util',
	    'app.services.soundcloudControl'
	  ]))

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  var EventEmitter = __webpack_require__(112).EventEmitter;
	  
	  var undef;
	  var immutable = __webpack_require__(113);

	  (module.exports['app.models.playlist'] = angular.module('app.models.playlist', []))

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65);
	__webpack_require__(36);
	__webpack_require__(39);
	__webpack_require__(15);
	/* WEBPACK VAR INJECTION */(function(angular) {
	(function(){

	  (module.exports['app.controllers.app'] = angular.module("app.controllers.app", [
	    "shava.services.nwSupport",
	    "app.services.youtubeFeeds",
	    "app.services.app",
	    "app.services.app.auth"
	  ]))

	    .controller('AppController', [
	               '$scope', 'playerActions', '$sce', 'authFactory', '$state', 'TEMPLATE_PATH', 'shavaNwGui', 'app', 'youtubeFeedsFactory', '$rootScope', 'app', '$window', '$timeout', '$document',
	      function ($scope,   playerActions,   $sce,   authFactory,   $state,   TEMPLATE_PATH,   shavaNwGui,   app,   youtubeFeedsFactory,   $rootScope,   app,   $window,   $timeout,   $document) {
	        $scope.app = app;

	        $window.document.title = app.settings.get("title");

	        var win = shavaNwGui.Window.get();

	        setTimeout(function() {
	          win.show();
	        }, 500);

	        var playerFrame = $window.document.createElement('iframe');
	        playerFrame.src = (shavaNwGui.nodeless ? '' : 'http://127.0.0.1:24922/') + 'player.html';
	        playerFrame.style.width = '0';
	        playerFrame.style.height = '0';
	        playerFrame.style.opacity = '0';
	        playerFrame.style.position = 'absolute';
	        playerFrame.style.top = '-9999px';
	        $window.document.body.appendChild(playerFrame);
	        
	        // If not using node.js / node-webkit
	        $scope.nodeless = shavaNwGui.nodeless;

	        $scope.userMeta = authFactory.getUserMeta();

	        $scope.state = $state;

	        if (! authFactory.getUser()) {
	          $state.go("login");
	        }

	        var user = authFactory.getUser();

	        $scope.closeWindow = function () {
	          win.close();
	        };

	        $scope.minimizeWindow = function () {
	          win.minimize();
	        };

	        $scope.maximizeWindow = function () {
	          win.maximize();
	        };

	        $scope.historyBack = function () {
	          if ($rootScope.$history != null) {
	            $rootScope.$history.back();
	          }
	        };

	        $scope.historyForward = function () {
	          if ($rootScope.$history != null) {
	            $rootScope.$history.forward();
	          }
	        };

	        // Flag events
	        $scope.flags = {};

	        $scope.userPreferencesDropdown = [
	          {
	            "text": $sce.trustAsHtml("<i class=\"fa fa-sign-out\"></i>&nbsp;Sign Out"),
	            "click": function () { authFactory.logoutUser(); }
	          }
	        ];

	        // Remove event listeners when scope is destroyed
	        $scope.$on("$destroy", function () {
	          playerActions.destroyPlaylist();
	          $document.off("keydown", documentKeydown);
	        });
	        
	        $document.on("keydown", documentKeydown);

	        function documentKeydown(e) {
	          var nodename, docSelected;

	          if (e.which === 9) {
	            e.preventDefault();
	          }

	          if (!e.target) {
	            return false;
	          }

	          switch (e.which) {
	            case 46:
	            case 32:
	            case 8:
	              nodename = e.target.nodeName;
	              docSelected = e.target.getAttribute('contenteditable') == null &&
	                nodename !== 'INPUT' &&
	                nodename !== 'TEXTAREA' &&
	                nodename !== 'SELECT';

	              if (docSelected) {
	                e.preventDefault();
	                if (e.which === 32) {
	                  playerActions.toggle();
	                }
	                else if (e.which === 8 && $rootScope.$history != null) {
	                  $timeout(function(){
	                    $rootScope.$history.back();
	                  });
	                }
	              }
	            break;
	          }
	        }

	      }]);



	}());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['app.controllers.downloads'] = angular.module('app.controllers.downloads', []))

	    .controller('DownloadsController', DownloadsController);

	  DownloadsController.$inject = [];

	  function DownloadsController() {
	    
	  }
	  
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['app.controllers.browse'] = angular.module('app.controllers.browse', []))
	    .controller('BrowseController', BrowseController);

	  BrowseController.$inject = [];

	  function BrowseController() {

	  }
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65);
	__webpack_require__(36);
	__webpack_require__(15);
	/* WEBPACK VAR INJECTION */(function(angular) {(function(){

	  (module.exports['app.controllers.login'] = angular.module("app.controllers.login", [
	    "shava.services.nwSupport",
	    "app.services.app",
	    "app.services.app.auth"
	  ]))

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(36);
	__webpack_require__(66);
	__webpack_require__(!(function webpackMissingModule() { throw new Error("Cannot find module \"ui.router\""); }()));
	/* WEBPACK VAR INJECTION */(function(angular) {(function (undefined) {

	  (module.exports['app.controllers.sidebar'] = angular.module('app.controllers.sidebar', [
	    'ui.router',
	    'app.services.app.playlists',
	    'app.services.app'
	  ]))  
	    .controller('SidebarController', SidebarController);

	  SidebarController.$inject = ['$timeout', '$window', '$rootScope', 'app', '$state', '$scope', '$state'];

	  function SidebarController($timeout, $window, $rootScope, app, $state, $scope, $state) {
	    $scope.$state = $state;
	    $scope.app = app;

	    $scope.sidebar = {
	      createPlaylist: function (unshift) {
	        var playlist = app.playlists.create({
	          name: 'New playlist',
	          songs: []
	        }, unshift);

	        playlist.editing = true;
	        $state.transitionTo('app.player.playlist.user', { id: playlist._id });
	      }
	    };

	    $scope.selectPlaylist = function (e) {
	      playlist.selected = true;
	    };

	    $scope.$on('app:sidebarUpdate', function (e, location, id) {
	      check(app.sidebarOpts);
	      check(app.playlists);

	      function check(obj) {
	        var i = 0;
	        for (; i < obj.length; i++) {
	          if (
	            app.sidebarNav.selected[0] !== obj[i]
	            && obj[i].location === location
	            && (id == null && obj[i]._id == null
	               || ''+obj[i]._id == id)
	          ) {
	            $timeout(function () {
	              app.sidebarNav.selected.splice(0, app.sidebarNav.selected.length);
	              app.sidebarNav.selected.push(obj[i]);
	            });
	            break;
	          }
	        }
	      }
	    });

	    $scope.$emit('app:sidebarUpdate', $state.current.name, $state.params.id);

	    $scope.updateSelectables = function ($object, $selected) {
	      $object.selected = $selected;
	      app.tabsNav.selected.splice(0,1);
	      
	      if ($selected && ($state.current.name !== $object.location || $state.params.id !== $object.id)) {
	        $state.go($object.location, { id: $object._id });
	      }
	    };

	    $scope.finishEdit = function (playlist, value, save, refocus) {
	      if (value === '' && playlist.songs.length === 0) {
	        $window.history.back();
	        app.playlists.remove(app.playlists.indexOf(playlist));
	      }
	      else {
	        playlist.editing = false;
	        playlist.selected = true;
	        save(value);
	        app.playlists.save();
	      }
	    };

	  }

	}());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(!(function webpackMissingModule() { throw new Error("Cannot find module \"ui.router\""); }()));
	__webpack_require__(66);
	__webpack_require__(36);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['app.controllers.playlist'] = angular.module('app.controllers.playlist', [
	    'app.services.app',
	    'app.services.app.playlists',
	    'ui.router'
	  ]))

	    .controller('PlaylistController', PlaylistController);

	  PlaylistController.$inject = ['$scope', 'app', '$state'];

	  function PlaylistController($scope, app, $state) {

	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['app.controllers.preferences'] = angular.module('app.controllers.preferences', []))

	    .controller('PreferencesController', PreferencesController);

	  PreferencesController.$inject = [];

	  function PreferencesController() {
	    
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	__webpack_require__(18);
	__webpack_require__(17);
	__webpack_require__(66);
	__webpack_require__(21);
	__webpack_require__(20);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['app.controllers.search'] = angular.module('app.controllers.search', [
	    'app.models.song',
	    'app.models.playlist',
	    'app.services.app.playlists',
	    'app.services.lastfmFeeds',
	    'app.services.soundcloudControl',
	    'app.services.actions.playerActions'
	  ]))

	    .controller('SearchController', SearchController);

	  SearchController.$inject = ['searchTerm', '$state', 'playerActions', '$rootScope', '$store', 'app', 'lastfmFeedsFactory', 'soundcloudControl', '$timeout', 'PlaylistModel', 'SongModel', 'playlists', '$scope'];

	  function SearchController(searchTerm, $state, playerActions, $rootScope, $store, app, lastfmFeedsFactory, soundcloudControl, $timeout, PlaylistModel, SongModel, playlists, $scope) {

	    $store.bind('playerStore', $scope);

	    $scope.app = app;

	    $scope.totalResults = 0;
	    $scope.itemsLoaded = 0;
	    $scope.currentPage = 0;
	    $scope.gotResults = false;
	    $scope.playlist = new PlaylistModel('$queue');
	    $scope.columnWidths = app.columnWidths.playlist;
	    $scope.songs = $scope.playlist.songs();

	    $scope.searchTerm = searchTerm;

	    $scope.playlistTable = {
	      order: '-rating',
	      toggleSort: function (type) {
	        if ($scope.playlistTable.order === '-'+type) {
	          $scope.playlistTable.order = '+'+type;
	        }
	        else if ($scope.playlistTable.order === '+'+type) {
	          $scope.playlistTable.order = null;
	        }
	        else {
	          $scope.playlistTable.order = '-'+type;
	        }
	      }
	    };

	    $scope.saveColumnWidths = function () {
	      app.userSettings.set('columnWidths.playlist', $scope.columnWidths);
	      app.userSettings.save();
	    };

	    $scope.songKeyBindings = {
	      enter: 'playSong($event, song)'
	    };

	    $scope.playSong = function($event, song){
	      if (! $event.ctrlKey && ! $event.metaKey) {
	        $event.preventDefault();
	        playerActions.setPlaylist($scope.playlist, song);
	        playerActions.play();
	      }
	    };

	    $scope.$on('shava:resize', function () {
	      $scope.updateColumnWidths();
	    });

	    $scope.$on('$destroy', function () {
	      $scope.playlist.destroy();
	    });

	    $scope.updateColumnWidths = function () {
	      $scope.playlistHeaderWidth = $scope.columnWidths[0] +
	        $scope.columnWidths[1] + $scope.columnWidths[2] +
	        $scope.columnWidths[3];
	    };

	    $scope.selectableOpts = {
	      onSelect: 'updateSelectables($object, $selected)',
	      selectAll: true,
	      multi: true,
	      selected: []
	    };

	    $scope.getResults = function () {
	      $scope.isLoading = lastfmFeedsFactory('track.search', {
	        track: searchTerm
	      }, true).then(function (data) {
	        data.results.trackmatches.track.forEach(function(track) {
	          var images;

	          images = track.image != null ? track.image.map(function (o) {
	            return o['#text'];
	          }) : [];

	          $scope.playlist.add(SongModel('lastfm', {
	            id: track.url,
	            artist: track.artist,
	            title: track.name,
	            images: images,
	            duration: Math.floor(Math.random()*270)+120,
	            rating: Math.min(0, (50000 / track.listeners)*500)
	          }));
	        });
	      });
	    };



	    $scope.updateSelectables = function (obj, selected) {
	      obj.selected = selected;
	    };

	    $scope.getResults();
	    $scope.updateColumnWidths();

	  }

	})(); 
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(36);
	__webpack_require__(!(function webpackMissingModule() { throw new Error("Cannot find module \"ui.router\""); }()));
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['app.controllers.searchBar'] = angular.module('app.controllers.searchBar', [
	    'ui.router',
	    'app.services.app'
	  ]))

	    .controller('SearchBarController', SearchBarController);

	  SearchBarController.$inject = ['$scope', '$state', 'app', '$document', '$rootScope'];

	  function SearchBarController($scope, $state, app, $document, $rootScope) {
	    $scope.updateSearch = updateSearch;

	    $scope.opts = {};

	    $scope.flags = {};
	    $scope.app = app;
	    $scope.$state = $state;

	    $scope.tabBindings = {
	      del: 'removeTab($event, $index)',
	      bsp: 'removeTab($event, $index)'
	    };

	    $scope.searchBindings = {
	      enter: 'updateSearch($event)'
	    };

	    $scope.setTab = function (object, selected) {
	      object.$$selected = selected;
	    };

	    $scope.removeTab = function (e, index) {
	      if (e !== null) {
	        e.preventDefault();
	        e.stopPropagation();
	      }

	      app.tabs.splice(index, 1);
	    };

	    $scope.$on('app:search', function (e, value) {
	      if (typeof value !== 'string' || value.length < 2) {
	        return;
	      }

	      $rootScope.searchText = '';

	      if (app.tabs.length > 4) {
	        app.tabs.splice(4, 1);
	      }

	      app.tabs.unshift({
	        text: value,
	        icon: 'icon icon-search',
	        locals: { searchTerm: value },
	        controller: 'SearchController',
	        templateUrl: 'app/templates/search.html'
	      });

	      app.tabsNav.selected[0] = app.tabs[0];
	    });

	    function updateSearch() {
	      $rootScope.$broadcast('app:search', $rootScope.searchText);
	    }
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	__webpack_require__(!(function webpackMissingModule() { throw new Error("Cannot find module \"mgcrea.ngStrap.tooltip\""); }()));
	__webpack_require__(67);
	__webpack_require__(64);
	__webpack_require__(41);
	__webpack_require__(68);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['app.controllers.player'] = angular.module('app.controllers.player', [
	    'app.services.youtubeControl.youtubeControlDirective',
	    'app.services.player',
	    'app.services.app.util',
	    'app.services.actions.playerActions',
	    'mgcrea.ngStrap.tooltip',
	    'shava.services.util.debounce'
	  ]))

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	__webpack_require__(18);
	__webpack_require__(17);
	__webpack_require__(66);
	__webpack_require__(21);
	__webpack_require__(20);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['app.controllers.home'] = angular.module('app.controllers.home', [
	    'app.models.song',
	    'app.models.playlist',
	    'app.services.app.playlists',
	    'app.services.lastfmFeeds',
	    'app.services.soundcloudControl',
	    'app.services.actions.playerActions'
	  ]))

	    .controller('HomeController', HomeController);

	  HomeController.$inject = ['playerActions', '$rootScope', '$store', 'app', 'lastfmFeedsFactory', 'soundcloudControl', '$timeout', 'PlaylistModel', 'SongModel', 'playlists', '$scope'];

	  function HomeController(playerActions, $rootScope, $store, app, lastfmFeedsFactory, soundcloudControl, $timeout, PlaylistModel, SongModel, playlists, $scope) {

	    $store.bind('playerStore', $scope);

	    $scope.app = app;

	    $scope.playlistTable = {
	      order: '-rating',
	      toggleSort: function (type) {
	        if ($scope.playlistTable.order === '-'+type) {
	          $scope.playlistTable.order = '+'+type;
	        }
	        else if ($scope.playlistTable.order === '+'+type) {
	          $scope.playlistTable.order = null;
	        }
	        else {
	          $scope.playlistTable.order = '-'+type;
	        }
	      }
	    };

	    $scope.totalResults = 0;
	    $scope.itemsLoaded = 0;
	    $scope.currentPage = 0;
	    $scope.gotResults = false;
	    $scope.playlist = new PlaylistModel('$queue');
	    $scope.columnWidths = app.columnWidths.playlist;
	    $scope.songs = $scope.playlist.songs();

	    $scope.saveColumnWidths = function () {
	      app.userSettings.set('columnWidths.playlist', $scope.columnWidths);
	      app.userSettings.save();
	    };

	    $scope.songKeyBindings = {
	      enter: 'playSong($event, song)'
	    };

	    $scope.playSong = function($event, song){
	      if (! $event.ctrlKey && ! $event.metaKey) {
	        $event.preventDefault();
	        playerActions.setPlaylist($scope.playlist, song);
	        playerActions.play();
	      }
	    };

	    $scope.$on('shava:resize', function () {
	      $scope.updateColumnWidths();
	    });

	    $scope.$on('$destroy', function () {
	      $scope.playlist.destroy();
	    });

	    $scope.updateColumnWidths = function () {
	      $scope.playlistHeaderWidth = $scope.columnWidths[0] +
	        $scope.columnWidths[1] + $scope.columnWidths[2] +
	        $scope.columnWidths[3];
	    };

	    $scope.selectableOpts = {
	      onSelect: 'updateSelectables($object, $selected)',
	      selectAll: true,
	      multi: true,
	      selected: []
	    };

	    $scope.getResults = function () {
	      $scope.isLoading = lastfmFeedsFactory('geo.getmetrouniquetrackchart', {
	        country: 'united states',
	        metro: 'los angeles'
	      }, true).then(function (data) {
	        var rating = 5.0;

	        data.toptracks.track.forEach(function(track) {
	          rating -= 0.041;

	          images = track.image != null ? track.image.map(function (o) {
	            return o['#text'];
	          }) : [];
	          
	          $scope.playlist.add(SongModel('lastfm', {
	            artist: track.artist.name,
	            title: track.name,
	            images: images,
	            duration: parseInt(track.duration) || 0,
	            id: track.url,
	            rating: rating
	          }));
	        });
	      });

	    };

	    $scope.updateSelectables = function (obj, selected) {
	      obj.selected = selected;
	    };

	    $scope.getResults();
	    $scope.updateColumnWidths();

	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	__webpack_require__(18);
	__webpack_require__(17);
	__webpack_require__(66);
	__webpack_require__(21);
	__webpack_require__(20);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['app.controllers.queue'] = angular.module('app.controllers.queue', [
	    'app.models.song',
	    'app.models.playlist',
	    'app.services.app.playlists',
	    'app.services.lastfmFeeds',
	    'app.services.soundcloudControl',
	    'app.services.actions.playerActions'
	  ]))

	    .controller('QueueController', QueueController);

	  QueueController.$inject = ['playerActions', '$rootScope', '$store', 'app', 'lastfmFeedsFactory', 'soundcloudControl', '$timeout', 'PlaylistModel', 'SongModel', 'playlists', '$scope'];

	  function QueueController(playerActions, $rootScope, $store, app, lastfmFeedsFactory, soundcloudControl, $timeout, PlaylistModel, SongModel, playlists, $scope) {

	    $store.bind('playerStore', $scope);

	    $scope.app = app;

	    $scope.playlistTable = {
	      order: '-queuePosition'
	    };

	    $scope.totalResults = 0;
	    $scope.itemsLoaded = 0;
	    $scope.currentPage = 0;
	    $scope.gotResults = false;
	    $scope.columnWidths = app.columnWidths.playlist;

	    $scope.$watch(function () {
	      return $scope.$stores.playerStore.currentSong;
	    }, function (song) {
	      var playlist = $scope.$stores.playerStore.currentPlaylist;

	      if (song != null && playlist != null) {
	        $scope.playlist = playlist.copy(function (song) {
	          return song._id !== $scope.$stores.playerStore.currentSong._id;
	        });

	        $scope.songs = $scope.playlist.songs();
	      }
	    });

	    $scope.saveColumnWidths = function () {
	      app.userSettings.set('columnWidths.playlist', $scope.columnWidths);
	      app.userSettings.save();
	    };

	    $scope.songKeyBindings = {
	      enter: 'playSong($event, song)'
	    };

	    $scope.playSong = function($event, song){
	      if (! $event.ctrlKey && ! $event.metaKey) {
	        $event.preventDefault();
	        playerActions.setSong(song);
	        playerActions.play();
	      }
	    };

	    $scope.$on('shava:resize', function () {
	      $scope.updateColumnWidths();
	    });

	    $scope.$on('$destroy', function () {
	      if ($scope.playlist != null) {
	        $scope.playlist.destroy();
	      }
	    });

	    $scope.updateColumnWidths = function () {
	      $scope.playlistHeaderWidth = $scope.columnWidths[0] +
	        $scope.columnWidths[1] + $scope.columnWidths[2] +
	        $scope.columnWidths[3];
	    };

	    $scope.selectableOpts = {
	      onSelect: 'updateSelectables($object, $selected)',
	      selectAll: true,
	      multi: true,
	      selected: []
	    };

	    $scope.updateSelectables = function (obj, selected) {
	      obj.selected = selected;
	    };

	    $scope.updateColumnWidths();
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['app.directives.loader'] = angular.module('app.directives.loader', []))

	    .directive('appLoader', appLoader);

	  appLoader.$inject = ['$timeout'];

	  function appLoader($timeout) {
	    return {
	      restrict: 'A',
	      replace: true,
	      scope: { showLoader: '=appLoader' },
	      templateUrl: 'app/templates/loader.html',
	      link: function (scope, element, attrs) {
	        scope.$watch('showLoader', function (loader) {
	          if (angular.isObject(loader) && angular.isFunction(loader.then)) {
	            loader.then(setLoader, setLoader);
	          }
	        });

	        function setLoader() {
	          $timeout(function () {
	            scope.showLoader = false;
	          });
	        }
	      }
	    };
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['app.directives.stars'] = angular.module('app.directives.stars', []))
	    .directive('appStars', function() {

	      return {
	        restrict: 'E',
	        replace: true,
	        templateUrl: 'app/templates/star-rating.html',
	        scope: {
	          value: '=value'
	        },
	        link: function (scope, element, attrs) {
	          var floored = Math.floor(scope.value);
	          var dec = Math.floor((scope.value - floored) * 10);
	          if (dec <= 2) {
	            scope.rating = floored;
	          }
	          else if (dec >= 8) {
	            scope.rating = Math.ceil(scope.value);
	          }
	          else {
	            scope.rating = floored + 0.5;
	          }
	        }
	      };

	    })
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(21);
	__webpack_require__(19);
	__webpack_require__(40);
	__webpack_require__(66);
	__webpack_require__(2);
	__webpack_require__(41);
	__webpack_require__(15);
	__webpack_require__(16);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {

	  (module.exports['app.services.app'] = angular.module("app.services.app", [
	    "ng",
	    "shava.services.sessions",
	    "shava.services.nwSupport",
	    "app.services.player",
	    "app.models.playlist",
	    "app.services.app.playlists",
	    "app.services.youtubeControl",
	    "shava.services.settings"
	  ]))

	    .service("app", appFactory);

	  appFactory.$inject = [
	    "shavaSessionsFactory",
	    "shavaNwGui",
	    "shavaSettingsFactory",
	    "playlists",
	    "PlaylistModel",
	    "youtubeControl",
	    "$timeout",
	    "$sce"
	  ];

	  function appFactory(
	    shavaSessionsFactory,
	    shavaNwGui,
	    shavaSettingsFactory,
	    playlists,
	    PlaylistModel,
	    youtubeControl,
	    $timeout,
	    $sce
	  ) {

	    // App factory
	    var app = {};

	    // Playlists
	    app.playlists = playlists;

	    // Sidebar Options
	    app.sidebarOpts = [
	      { location: "app.player.index", label: "Hot This Week" },
	      { location: "app.player.controversial", label: "New Releases" },
	      { location: "app.player.downloads", label: null },
	      { location: "app.player.browse.music", label: "Browse" },
	      { location: "app.player.playlist.queue", label: null },
	      { location: "app.player.browse.videos", label: "Browse TV & Movies" },
	      { location: "app.player.browse.games", label: "Browse Games" },
	      { location: "app.player.browse.books", label: "Browse Books" }
	    ];

	    // Sidebar `shSelectables` navigation options
	    app.sidebarNav = {
	      onSelect: "updateSelectables($object, $selected)",
	      selectEvent: "mousedown",
	      toggleable: false,
	      selected: [],
	      multi: false,
	      id: "sidebarNav"
	    };

	    // Toggle dev tools through the shava nw.gui shim
	    app.toggleDevTools = function () {
	      if (app.settings.get("debug")) {
	        shavaNwGui.Window.get().showDevTools();
	      }
	    };

	    // App settings
	    app.settings = shavaSettingsFactory("app");

	    // The default user settings namespace is 0
	    // When the user logs in this instance
	    app.userSettings = shavaSettingsFactory("user-0");

	    // For main `appLoader` directive
	    app.isLoading = false;

	    // Column widths, changable with `shColumns` directive
	    app.columnWidths = app.userSettings.get("columnWidths");

	    // Bind array to localStorage with autosave = `true`
	    app.tabs = shavaSessionsFactory.bindArray("tabs", true);

	    // Tabs `shSelectables` navigation options
	    app.tabsNav = {
	      onSelect: "setTab($object, $selected)",
	      bindVertical: false,
	      bindHorizontal: true,
	      multi: false,
	      selected: []
	    };

	    // Return our app singleton!
	    return app;
	  }
	  
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(70);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['app.services.stores'] = angular.module('app.services.stores', [
	    'app.services.stores.playerStore'
	  ]))
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['app.services.freebase'] = angular.module('app.services.freebase', []))

	    .provider('freebaseFactory', freebaseFactoryProvider);

	  freebaseFactoryProvider.$inject = [];

	  function freebaseFactoryProvider() {
	    var $config = {
	      $url: 'https://www.googleapis.com/freebase/v1/mqlread/',
	      $imageUrl: 'https://usercontent.googleapis.com/freebase/v1/image/',
	      $lang: 'en'
	    };

	    freebaseFactory.$inject = ['$http'];

	    return {
	      $get: freebaseFactory,
	      config: function (opts) {
	        angular.extend($config, opts);
	      }
	    };

	    function freebaseFactory($http) {
	      var freebase = {
	        query: query
	      };

	      function query(q) {
	        q = encodeURIComponent(angular.toJson(q));
	        return $http.get(
	          $config.$url + '?lang=%2Flang%2F'
	          + $config.$lang + '&query=' + q)
	            .success(function (data) {
	              return data.result;
	            });
	      }

	      return freebase;
	    }

	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['app.services.youtubeFeeds'] = angular.module('app.services.youtubeFeeds', []))

	    .provider('youtubeFeedsFactory', youtubeFeedsFactoryProvider);

	  youtubeFeedsFactoryProvider.$inject = [];

	  function youtubeFeedsFactoryProvider() {
	    var config = {
	      url: 'https://gdata.youtube.com/feeds/api/',
	      defaults: {
	        'v': 2,
	        'format': 5,
	        'alt': 'json',
	        'max-results': 50
	      }
	    };

	    return {
	      $get: youtubeFeedsFactory,
	      defaults: function (opts) {
	        angular.extend(config.defaults, opts);
	      },
	      setUrl: function (url) {
	        config.url = url;
	      }
	    };

	    youtubeFeedsFactory.$inject = ['$http'];

	    function youtubeFeedsFactory($http) {
	      return get;

	      function get(feed, queryData) {
	        var queryObj = angular.extend({}, config.defaults, queryData)
	          , query = '?' + window.jQuery.param(queryObj);

	        return $http.get(config.url + feed + query)
	          .then(function (resp) {
	            return resp.data.feed;
	          });
	      }
	    }
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {

	  (module.exports['app.services.youtubeControl'] = angular.module('app.services.youtubeControl', []))

	    .factory('youtubeControl', ['$window', '$q', function ($window, $q) {
	      var def = $q.defer();

	      $window.onYouTubeIframeAPIReady = function(){
	        def.resolve($window.YT);
	      };
	      
	      return def.promise;
	    }]);

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71);
	__webpack_require__(73);
	__webpack_require__(67);
	__webpack_require__(72);
	__webpack_require__(21);
	__webpack_require__(40);
	__webpack_require__(18);
	/* WEBPACK VAR INJECTION */(function(angular) {(function(){

	(module.exports['app.services.player'] = angular.module("app.services.player", [
	  "app.models.playlist",
	  "app.services.soundcloudControl",
	  "app.services.youtubeControl",
	  "shava.services.util.mixin",
	  "shava.services.dispatcher",
	  "app.services.actions.playerActions",
	  "app.services.constants.playerConstants"
	]))

	  .factory("playerFactory", [
	          "$window", "playerConstants", "playerActions", "PlaylistModel", "$log", "soundcloudControl", "mixin", "$q", "youtubeControl",
	  function($window,   playerConstants,   playerActions,   PlaylistModel,   $log,   soundcloudControl,   mixin,   $q,   youtubeControl){
	    
	    return angular.noop;

	  }]);

	}());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function(){

	  (module.exports['shava.directives.dropdown'] = angular.module('shava.directives.dropdown', []))

	    .directive('shDropdown', [function () {

	      return {
	        restrict: 'AE',
	        replace: true,
	        transclude: true,
	        scope: {
	          shDropdown: '=',
	          shDropdownWatch: '='
	        },
	        template: '<div></div>',
	        link: function (scope, element, attrs) {
	          if (scope.shDropdownWatch) {
	            scope.$watch(opts, getOpts);
	          }
	        }
	      }

	    }]);

	}());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.directives.rightClick'] = angular.module('shava.directives.rightClick', []))

	    .directive('shRightClick', shRightClick);

	  shRightClick.$inject = ['$window', '$parse', '$timeout'];

	  function shRightClick($window, $parse, $timeout) {
	    
	    return {
	      restrict: 'A',
	      link: function (scope, element, attrs) {
	        var fn = $parse(attrs.shRightClick);

	        element.bind('contextmenu.shRightClick', function (e) {
	          e.preventDefault();

	          $timeout(function () {
	            fn(scope, { $event: e });
	          });
	        });

	        scope.$on('$destroy', function () {
	          element.unbind('contextmenu.shRightClick');
	        });
	      }
	    };

	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(94);
	__webpack_require__(93);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.directives.columns'] = angular.module('shava.directives.columns', [
	    'shava.directives.columns.columnDirective',
	    'shava.directives.columns.columnsController'
	  ]))

	    .directive('shColumns', [function () {
	      return {
	        restrict: 'A',
	        controller: 'ShColumnsController'
	      }
	    }]);

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.directives.include'] = angular.module('shava.directives.include', []))

	    .directive('shInclude', shInclude);

	  shInclude.$inject = ['$compile', '$parse', '$templateCache', '$http', '$controller'];

	  function shInclude($compile, $parse, $templateCache, $http, $controller) {

	    return {
	      restrict: 'A',
	      link: function (scope, element, attrs) {
	        var html = element.html()
	          , init = false;

	        scope.shInclude = $parse(attrs.shInclude)(scope);
	        scope.shWatch = $parse(attrs.shWatch)(scope);

	        scope.$watch('shInclude.controller', updateController);
	        scope.$watch('shInclude.templateUrl', updateTemplateUrl);
	        scope.$watch('shInclude.template', updateTemplate);

	        function updateTemplateUrl(value) {
	          if (value != null) {
	            $http.get(value, { cache: $templateCache })
	              .then(function(resp) {
	                compile(element, resp.data, scope);
	              });
	          }
	        }

	        function updateController(value) {
	          if (value != null) {
	            var locals = scope.shInclude.locals || {};
	            $controller(value, angular.extend(locals, {
	              $scope: scope,
	            }));
	          }
	        }

	        function updateTemplate(value) {
	          if (value != null) {
	            compile(element, value, scope);
	          }
	        }

	        function compile(element, html, scope) {
	          element.html(html);
	          $compile(element.contents())(scope);
	        }
	      }
	    };

	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.directives.editable'] = angular.module('shava.directives.editable', []))

	    .directive('shEditable', shEditable)


	  shEditable.$inject = ['$timeout', '$window', '$parse'];

	  function shEditable($timeout, $window, $parse) {
	    return {
	      restrict: 'A',
	      require: 'ngModel',
	      transclude: true,
	      replace: true,
	      template: '<span class="sh-editable-wrapper"><span ng-transclude></span></span>',
	      link: function (scope, element, attrs, ngModel) {
	        var cb = angular.isDefined(attrs.shEditableCallback)
	          ? $parse(attrs.shEditableCallback)
	          : false;

	        var subel, input = null;

	        subel = element.find(':first-child');
	        subel.addClass('sh-editable-text');

	        scope.$watch(attrs.shEditable, function (value) {
	          if (value) {
	            element.addClass('sh-editable-editing');
	            input = createEditableArea();
	            element.append(input);
	            refocus();
	          }
	          else {
	            element.removeClass('sh-editable-editing');
	            if (input !== null) {
	              input.remove();
	              input = null;
	            }
	          }
	        });

	        ngModel.$render = function () {
	          subel.html(prepValue(ngModel.$modelValue));
	        };

	        element.on('$destroy', function () {
	          if (input !== null) {
	            input.remove();
	          }
	        });

	        function prepValue(value) {
	          return value.replace(/(^\s+|\<[^>]+\>|\&[a-z0-9]+\;|\s+$)/gi, '').replace(/\s+/g, ' ');
	        }

	        function createEditableArea() {
	          var input = angular.element('<input>')
	            .attr('type', 'text')
	            .attr('autofocus', true)
	            .val(ngModel.$modelValue);

	          input.on('keydown', shEditableKeydown);
	          input.on('blur', shEditableBlur);
	          input.on('focus', shEditableFocus);

	          input[0].className = ('sh-editable-input');
	          return input;
	        }

	        function updateVal(value, render) {
	          ngModel.$setViewValue(value);
	          subel.html(value);
	        }

	        function refocus() {
	          if (input !== null) {
	            input.focus();
	          }
	        }

	        function stopEdit() {
	          $timeout(function () {
	            cb !== false ? cb(scope, { $value: prepValue(input.val()), $update: updateVal, $refocus: refocus }) : updateVal(prepValue(input.val()));
	          });
	        }

	        function shEditableBlur(e) {
	          stopEdit();
	        }

	        function shEditableFocus(e) {
	          $(this).select();
	        }

	        function shEditableKeydown(e) {
	          switch (e.which) {
	            case 27:
	              e.preventDefault();
	              input.val(ngModel.$modelValue);
	              stopEdit();
	              break;
	            case 13:
	            case 9:
	              e.preventDefault();
	              stopEdit();
	              break;
	          }
	        }

	      }
	    }
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(98);
	__webpack_require__(97);
	__webpack_require__(96);
	__webpack_require__(95);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.selectables'] = angular.module('shava.directives.selectables', [
	    'shava.directives.selectables.selectablesController',
	    'shava.directives.scrollarea',
	    'shava.directives.selectables.selectableDirective',
	    'shava.directives.selectables.selectables'
	  ]))

	    .directive('shSelectables', shSelectables);

	  shSelectables.$inject = [];

	  function shSelectables() {

	    return {
	      restrict: 'A',
	      link: { pre: shSelectablesLinker },
	      controller: 'ShSelectablesController',
	      require: ['shSelectables', '?^shScrollarea', '?shScrollarea', '?^shSelectables'],
	      scope: {
	        'opts': '=shSelectables'
	      }
	    };

	    function shSelectablesLinker(scope, element, attrs, ctrl) {
	      ctrl[0].$parent = ctrl[3];
	      ctrl[0].setScroller(angular.isDefined(ctrl[1]) ? ctrl[1] : ctrl[2]);
	    }

	  }
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(99);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.directives.undoStack'] = angular.module("shava.directives.undoStack", [
	    "shava.directives.undoStack.undoStack"
	  ]))

	    .directive("undoStack", [
	            "undoStackFactory",
	    function(undoStackFactory){

	      return {
	        restrict: "A",
	        scope: {
	          undoStack: "="
	        },
	        link: function (scope, element, attrs) {
	          var undoStack = undoStackFactory.create(scope);
	        }
	      };

	    }]);

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(96);
	__webpack_require__(69);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  var raf = __webpack_require__(118);

	  (module.exports['shava.directives.fixedScroll'] = angular.module('shava.directives.fixedScroll', [
	    'shava.services.util.debounce',
	    'shava.directives.scrollarea'
	  ]))

	    .directive('shFixedScroll', fixedScrollDirective);

	  fixedScrollDirective.$inject = ['$rootScope', 'shavaThrottle', '$compile', '$window'];

	  function fixedScrollDirective($rootScope, shavaThrottle, $compile, $window) {
	    return {
	      restrict: 'E',
	      scope: {},
	      require: '^shScrollarea',
	      compile: function (element, attrs) {
	        element.html('<div class="sh-fixed-scroll-area">' + element.html() + '</div>');
	        element.addClass('sh-fixed-scroll-area-wrapper');

	        return {
	          post: function (scope, element, attrs, shScrollarea) {
	            var isFixed, bodySpacing, scrollAreaEl;
	            var throttler = shavaThrottle(onScroll, 10, { leading: true });
	            var $win = angular.element($window);
	            var spaceEl = angular.element('<div></div>');

	            scrollAreaEl = element.children(0);

	            spaceEl.addClass('sh-fixed-scroll-spacer');

	            shScrollarea.onScroll(element, throttler);

	            if (attrs.hasOwnProperty('watch') && attrs.watch !== false) {
	              $rootScope.$on('shava:resize', function(){
	                if (isFixed) {
	                  var pos = shScrollarea.position();
	                  element.css({ position: 'fixed', top: pos.top, left: pos.left, right: ($win.width() - pos.left - spaceEl.outerWidth()) });
	                }
	              });
	            }

	            element.on('$destroy', function () {
	              off();
	            });

	            function on(offset) {
	              var $win = angular.element($window);
	              var pos = shScrollarea.position();
	              isFixed = offset;

	              bodySpacing = scrollAreaEl.outerHeight();
	              shScrollarea.incrementSpacing(bodySpacing);
	              spaceEl.css({ height: bodySpacing, width: '100%' });
	              element.after(spaceEl);
	              element.css({ position: 'fixed', top: pos.top, left: pos.left, right: ($win.width() - pos.left - spaceEl.outerWidth()) });
	            }

	            function off() {
	              isFixed = null;
	              shScrollarea.decrementSpacing(bodySpacing);
	              bodySpacing = null;
	              spaceEl.remove();
	              element.css({ position: '', top: '', left: '', right: '' });
	              scrollAreaEl.css({ marginLeft: '' });
	            }

	            function onScroll(e) {
	              var offset, top;

	              offset = shScrollarea.elOffsetTop(element);
	              top = shScrollarea.scrollTop();

	              if (isFixed != null) {
	                if (top < isFixed) off();
	              }
	              else {
	                if (offset <= 0) on(top + offset);
	              }

	              if (isFixed != null) {
	                raf(function(){
	                  scrollAreaEl.css({ marginLeft: '-' + shScrollarea.scrollLeft() + 'px' });
	                });
	              }
	            }

	          }
	        };

	      }
	    };

	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(101);
	__webpack_require__(100);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.focusable'] = angular.module('shava.directives.focusable', [
	    'shava.directives.focusable.focusable',
	    'shava.directives.focusable.focusableController'
	  ]))
	    .directive('shFocusable', [
	             'ShFocusableController',
	    function (ShFocusableController) {
	      return {
	        controller: ShFocusableController,
	        compile: function (elem, attr) {
	          return {
	            post: function (scope, elem, attr) {
	              elem.on('focusin', function (e) {
	              });
	            }
	          };
	        }
	      };
	    }]);

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.directives.autofocus'] = angular.module('shava.directives.autofocus', []))

	    .directive('shAutofocus', autofocusDirective);

	  autofocusDirective.$inject = ['$timeout'];

	  function autofocusDirective($timeout) {

	    return {
	      restrict: 'A',
	      link: function (scope, element, attrs) {
	        var evt = function(){
	          element[0].setAttribute('autofocus', 'autofocus');
	          element[0].removeAttribute('autofocus');
	          element.focus();
	        };

	        scope.$watch(attrs.shAutofocus, function(val){
	          if (val) {
	            evt();
	          }
	        });
	      }
	    };

	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	__webpack_require__(102);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.range'] = angular.module('shava.directives.range', [
	    'shava.directives.range.rangeSliderDirective',
	    'shava.services.util.debounce'
	  ]))

	    .directive("shRange", ["$q", function($q){
	      var promise = $q.defer();
	      return {
	        scope: true,
	        controller: [
	                 "$scope", "$timeout", "$parse", "$element", "$document", "shavaThrottle", "$attrs",
	        function ($scope,   $timeout,   $parse,   $element,   $document,   shavaThrottle,   $attrs) {
	          var ctrl = this;
	          var model = $parse($attrs.shRange);

	          ctrl.opts = $parse($attrs.opts)($scope);

	          if (! ctrl.opts.hasOwnProperty('min')) {
	            ctrl.opts['min'] = 0;
	          }
	          if (! ctrl.opts.hasOwnProperty('max')) {
	            ctrl.opts['max'] = 100;
	          }

	          if (! ctrl.opts.hasOwnProperty('onStart')) {
	            ctrl.opts['onStart'] = angular.noop;
	          }
	          if (! ctrl.opts.hasOwnProperty('onEnd')) {
	            ctrl.opts['onEnd'] = angular.noop;
	          }
	          if (! ctrl.opts.hasOwnProperty('onMove')) {
	            ctrl.opts['onMove'] = angular.noop;
	          }

	          ctrl.getRange = function () {
	            return model($scope);
	          };

	          ctrl.updateRange = function (value, min, max) {
	            var newValue = Math.min(ctrl.opts['max'], Math.max(value, ctrl.opts['min']));
	            model.assign($scope, newValue);
	            ctrl.opts['onMove'].call($element, newValue);
	            if (! $scope.$$phase) $scope.$apply();
	          };

	          ctrl.initialize = function (cssProp) {
	            var $moving = false;

	            var rangeStartDrag;

	            if (cssProp === "width") {
	              rangeStartDrag = shavaThrottle(function (e) {
	                if ($moving) {
	                  ctrl.updateRange(((e.clientX - $element.offset().left) / $element.width()) * ctrl.opts['max']);
	                }
	              }, 25);
	            }
	            else if (cssProp === "height") {
	              rangeStartDrag = shavaThrottle(function (e) {
	                if ($moving) {
	                  ctrl.updateRange(ctrl.opts['max'] - (((e.clientY - $element.offset().top) / $element.height()) * ctrl.opts['max']));
	                }
	              }, 25);
	            }

	            var rangeFinishDrag = function (e) {
	              $moving = false;
	              $timeout(function () {
	                ctrl.opts['onEnd'].call($element, e);
	              });
	              $document.off('mousemove', rangeStartDrag);
	              $document.off('mouseup', rangeFinishDrag);
	              $document.off('focusout', rangeFinishDrag);
	            };

	            $element.on('mousedown', function (e) {
	              $moving = true;
	              ctrl.opts['onStart'].call($element, e);
	              rangeStartDrag.call(this, e);
	              $document.on('mousemove', rangeStartDrag);
	              $document.on('mouseleave', rangeStartDrag);
	              $document.on('mouseup', rangeFinishDrag);
	            });

	          };
	          return this;
	        }]
	      };
	    }]);
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(104);
	__webpack_require__(103);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.sorter'] = angular.module('shava.directives.sorter', [
	    'shava.directives.sorter.sorterItemDirective',
	    'shava.directives.sorter.sorterController'
	  ]))
	    .directive('shSorter', sorter);

	  function sorter() {
	    return {
	      restrict: 'A',
	      require: '^shSorter',
	      controller: 'ShSorterController'
	    };
	  }
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.directives.key'] = angular.module('shava.directives.key', []))

	    .directive('shKey', shKeyDirective);

	  shKeyDirective.$inject = ['$parse'];

	  function shKeyDirective($parse) {

	    return {
	      restrict: 'A',
	      link: function (scope, element, attrs) {
	        var model, methods;

	        if (attrs.shKeyWatch) {
	          scope.$watch(attrs.shKey, function (newModel) {
	            initModels(newModel);
	          });
	        }
	        else {
	          initModels($parse(attrs.shKey)(scope));
	        }

	        function keydown(e) {
	          if (model != null) {
	            var key = model.indexOf(e.which);
	            if (key !== -1) {
	              methods[key](scope, { $event: e });
	              if (! scope.$$phase) scope.$apply();
	            }
	          }
	        }

	        element.on('keydown', keydown);
	        
	        function initModels(newModel) {
	          model = [];
	          methods = [];
	          angular.forEach(newModel, function (value, key) {
	            model.push(getKey(key));
	            methods.push($parse(value));
	          });
	        }

	      }
	    };

	    function getKey(key) {
	      switch (key) {
	        case 'up':    return 38;
	        case 'down':  return 40;
	        case 'left':  return 37;
	        case 'right': return 39;
	        case 'enter': return 13;
	        case 'tab':   return 9;
	        case 'del':   return 46;
	        case 'bsp':   return 8;
	        default:  return key;
	      }
	    }

	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(106);
	__webpack_require__(105);
	/* WEBPACK VAR INJECTION */(function(angular) {(function(){

	  (module.exports['shava.directives.nav'] = angular.module('shava.directives.nav', [
	    'shava.directives.nav.navValueDirective',
	    'shava.directives.nav.navController'
	  ]))

	    .directive('shNav', shNav);


	    function shNav() {
	      return {
	        restrict: 'A',
	        scope: false,
	        controller: 'ShNavController'
	      };      
	    }

	}());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  var nwGuiSupport = __webpack_require__(111);

	  (module.exports['shava.services.nwSupport.nwGui'] = angular.module('shava.services.nwSupport.nwGui', []))
	    .factory('shavaNwGui', nwGui);

	  nwGui.$inject = ['$window'];

	  function nwGui($window) {
	    return nwGuiSupport;
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function(){
	  (module.exports['shava.services.sessions.localStorageAdapter'] = angular.module('shava.services.sessions.localStorageAdapter', []))

	    .factory('shavaSessionsLocalStorageFactory', shavaSessionsLocalStorageFactory);

	  shavaSessionsLocalStorageFactory.$inject = ['$window'];

	  function shavaSessionsLocalStorageFactory($window) {
	    return {
	      get: function(key, def){
	        var val = angular.fromJson($window.localStorage.getItem(key));
	        return val !== void(0) ? val : def;
	      },
	      set: function(key, val){
	        return $window.localStorage.setItem(key, angular.toJson(val));
	      }
	    };
	  }


	}());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(108);
	__webpack_require__(107);
	__webpack_require__(71);
	__webpack_require__(62);
	__webpack_require__(69);
	__webpack_require__(61);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.services.util'] = angular.module('shava.services.util', [
	    'shava.services.util.driver',
	    'shava.services.util.debounce',
	    'shava.services.util.deepMerge',
	    'shava.services.util.mixin',
	    'shava.services.util.watchChange',
	    'shava.services.util.jquery'
	  ]));
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  var undef;
	  
	  (module.exports['shava.services.ctrlTabs'] = angular.module('shava.services.ctrlTabs', []))

	    .factory('shavaCtrlTabsFactory', CtrlTabsFactory);

	  CtrlTabsFactory.$inject = ['$rootScope'];

	  function CtrlTabsFactory($rootScope) {
	    var tabs = {};

	    return function (instance) {
	      if (! tabs[instance]) {
	        tabs[instance] = CtrlTabsBuilder(instance, $rootScope);
	      }

	      return tabs[instance];
	    };
	  }

	  function CtrlTabsBuilder(tabName, scope) {
	    angular.extend(CtrlTabs.prototype, {
	      setTab: function (index) {
	        var self = this;

	        self.tabIndex = index;
	        self.$broadcast('change', index, self.tabs);
	      },
	      removeTab: function (index) {
	        var self = this;

	        self.tabs.splice(index, 1);
	        self.$broadcast('delete', index, self.tabs);

	        if (self.tabs.length === 0) {
	          self.setTab(null);
	        }
	        else if (undef !== (self.tabs[self.tabIndex])) {
	          self.setTab(0);
	        }

	      },
	      $on: function () {
	        var args = Array.prototype.slice.call(arguments, 1);
	        args.unshift('ctrlTab:' + name + ':' + arguments[0]);

	        scope.$on.apply(scope, args);
	      },
	      $broadcast: function () {
	        var args = Array.prototype.slice.call(arguments, 1);
	        args.unshift('ctrlTab:' + name + ':' + arguments[0]);

	        scope.$broadcast.apply(scope, args);
	      }
	    });

	    function CtrlTabs() {
	      this.tabs = [];
	      this.tabIndex = null;
	    }

	    return new CtrlTabs();
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {

	  (module.exports['shava.services.contextMenu'] = angular.module('shava.services.contextMenu', []))

	    // Context menu
	    .factory('shavaContextMenuFactory',
	              ['$document', '$compile', '$rootScope', '$controller', '$timeout',
	      function( $document,   $compile,   $rootScope,   $controller,   $timeout) {
	        var defaults = {
	          options: {},
	          controller: null,
	          x: 0,
	          y: 0
	        };

	        var body = angular.element(document.body);
	        var $window = angular.element(window);

	        var instance;

	        function ContextMenu(options) {
	          var locals, ctrl, scope, cxtMenuEl, backdropEl
	            , handleEscPressed, disableContextMenu, closeFn, self;

	          options = angular.extend({}, defaults, options);

	          if ($rootScope.stateLoading) return false;

	          scope = options.scope || $rootScope.$new();

	          self = this;

	          cxtMenuEl = angular.element(
	            '<div class="context-menu">\
	              <div class="context-menu-top" ng-if="top">{{top}}</div>\
	              <ul ng-repeat="opts in options">\
	              <li ng-if="opts.label && opts.options.length > 0" class="cat" ng-bind="opts.label"></li>\
	              <li ng-repeat="opt in opts.options">\
	                <a target="_blank" href="{{opt.link || \'#\'}}" ng-click="$closeContextMenu($event, opt.binding)">\
	                <i ng-if="opt.icon" ng-class="opt.iconClass" class="icon icon-{{opt.icon}}"></i> {{opt.text}}</a>\
	              </li>\
	              </ul>\
	            </div>'
	          );

	          backdropEl = angular.element(
	            '<div class="context-menu-backdrop"></div>' 
	          );

	          if (instance) {
	            instance.closeFn();
	          }

	          instance = {};

	          // Close when escape key is pressed
	          handleEscPressed = function(e) {
	            if (e.which === 27) {
	              closeFn(e);
	            }
	          };

	          // Close 
	          disableContextMenu = function(e) {
	            e.stopPropagation();
	            e.preventDefault();
	          };

	          instance.closeFn = closeFn = function(e, fn) {
	            if (e && ! fn) {
	              e.preventDefault();
	            }

	            if (typeof fn === 'function' && fn.call(self, e, fn) === false) {
	              return false;
	            }

	            body.off('keydown', handleEscPressed)
	            backdropEl.off('mousedown', closeFn);
	            backdropEl.remove();
	            cxtMenuEl.remove();
	          };

	          backdropEl.on('mousedown', closeFn);

	          if (options.options.length === 0) {
	            closeFn();
	            return false;
	          }
	          else if (typeof options.options[0].options === 'undefined') {
	            options.options = [{ label: 'options', options: options.options }];
	          }

	          options.y += angular.element(window).scrollTop();

	          scope.options = options.options;
	          scope.right = options.right;
	          scope.posX = options.x;
	          scope.posY = options.y;
	          scope.top  = options.top;
	          scope.$closeContextMenu = closeFn;

	          if (options.controller != null) {
	            locals = angular.extend({ $scope: scope }, passedInLocals);
	            ctrl = $controller(options.controller, locals);
	            cxtMenuEl.contents().data('$ngControllerController', ctrl);
	          }

	          $compile(cxtMenuEl)(scope);

	          if (options.x + 190 > $window.width()) {
	            options.x = options.x - 190;
	          }

	          cxtMenuEl.css({ left: (options.x + 1) + 'px', top: options.y + 'px' });

	          // Bind context menu to keydown
	          body.on('keydown', handleEscPressed);
	          cxtMenuEl.on('contextmenu', disableContextMenu);
	          
	          cxtMenuEl.on('mousedown', function (e) {
	            e.stopPropagation();
	          });

	          backdropEl.on('contextmenu', disableContextMenu);

	          // Append context menu element to body
	          body.append(backdropEl);
	          body.append(cxtMenuEl);
	        };

	        return function (opts) {
	          return new ContextMenu(opts);
	        };
	      }]);

	}());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {

	  var annotationFn;
	  
	  (module.exports['shava.services.util.driver'] = angular.module('shava.services.util.driver', []))

	    .provider('shavaDriverFactory', shavaDriverFactory);

	  function shavaDriverFactory() {
	    return {
	      create: create,
	      $get: angular.noop
	    };
	  }

	  function create(providerName, data) {
	    var driverName = null;    
	    var newService = {};
	    var driver;
	    var cached;

	    if (typeof data == null) {
	      data = {};
	    }

	    driverGetter.$inject = ['$injector', '$log'];

	    driver = {
	      setDriver: setDriver,
	      $get: driverGetter
	    };

	    return driver;
	    
	    function driverGetter($injector, $log) {        
	      if (driverName == null) {
	        throw new Error('Driver not set for "' + providerName + '"');
	      }

	      return (function () {
	        if (cached == null) {
	          cached = $injector.invoke([
	            driverName,
	            function (methods) {
	              var errs, d, errFormat;

	              for (d in data) {
	                if (typeof d === 'string' && d.indexOf('$') === 0) {
	                  driver[d.substring(1)] = data[d];
	                  delete data[d];
	                }
	                else if (data.hasOwnProperty(d) && typeof data[d] === 'function') {
	                  data[d] = angular.bind(newService, data[d]);
	                }
	              }

	              angular.extend(newService, data, methods);

	              if (driver.contract != null) {
	                errs = Object.keys(driver.contract).filter(function (k) {
	                  var o = driver.contract[k];

	                  switch(o) {
	                    case 'iterable':
	                      return !(typeof newService[k] === 'object'
	                          || typeof newService[k] === 'function'
	                          || angular.isArray(k));
	                    case 'object':
	                    case 'function':
	                      return (typeof newService[k] !== o);
	                    default:
	                      return !(newService[k] != null);
	                  }
	                });

	                if (errs.length > 0) {
	                  errFormat = [];
	                  errs.forEach(function (name) {
	                    errFormat.push(driverName + '.' + name + ' must '
	                    + (driver.contract[name] != null ? 'implement '
	                    + driver.contract[name] : 'not be null'));
	                  });

	                  throw new Error(errFormat.join('\r\n')+'\r\n');
	                }
	              }

	              return newService;
	            }]);
	        }

	        return cached;
	      })();        
	    }

	    function setDriver(newDriverName) {
	      cached = null;
	      driverName = newDriverName;
	    }
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.services.util.deepMerge'] = angular.module('shava.services.util.deepMerge', []))

	    .factory('shavaDeepMerge', shavaDeepMerge);

	  function shavaDeepMerge() {
	    return deepMerge;

	    function deepMerge(obj1, obj2) {
	      angular.forEach(obj2, function (data, key) {
	        if (! obj2.hasOwnProperty(key)) {
	          return;
	        }

	        if (typeof data === 'object' && typeof obj1[key] === 'object') {
	          deepMerge(obj1[key], obj2[key]);
	        }
	        else {
	          obj1[key] = obj2[key];
	        }
	      });
	    }
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['app.services.soundcloudControl.soundcloudControlDirective'] = angular.module("app.services.soundcloudControl.soundcloudControlDirective", []))

	    .directive("soundcloudControl", ["playerActions", "$store", function(playerActions, $store){
	      var ytUrl = 'http://www.soundcloud.com/embed/?enablejsapi=1&controls=0&autoplay=0&showinfo=0&rel=0';

	      return {
	        restrict: "A",
	        replace: true,
	        template: '<div class="soundcloud-control"><div class="soundcloud-control-image" ng-if="artImg" ng-style="{backgroundImage: artImg}"></div></div>',
	        scope: {
	          player: "="
	        },
	        link: function (scope, element, attrs) {
	          $store.bind('playerStore', scope);

	          scope.$watch(function () {
	            var song = scope.$stores.playerStore.currentSong;
	            if (song != null) return song.id;
	          }, function() {
	            var newSong = scope.$stores.playerStore.currentSong;
	            if (newSong != null && newSong.images.length > 0) {
	              scope.artImg = 'url('+newSong.images[newSong.images.length-1]+')';
	            }
	            else {
	              scope.artImg = null;
	            }
	          });
	        }
	      };

	    }]);
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {

	  function fuzzyMatch(str, str2) {
	    var score = 0, li2 = 0;
	    str = str.toLowerCase();
	    str2 = str2.toLowerCase();
	    for(var i = 0; i < str.length; i++) {
	      for (var i2 = 0; i2 < str2.length; i2++) {
	          if (str2[i2] === str[i] && i2 > li2) {
	            score++;
	            li2 = i2;
	            break;
	          }
	      }
	    }
	    return score;
	  }

	  function wordMatch(str, str2) {
	    var score = 0;
	    var astr = str.toLowerCase().split(/[^a-z0-9]+/g);
	    str2 = str2.toLowerCase();
	    for (var i = 0; i < astr.length; i++) {
	      if (~str2.indexOf(astr[i])) {
	        score++;
	      }
	    }

	    return score === 0 ? 0 : score / astr.length;
	  }

	  (module.exports['app.services.app.util'] = angular.module("app.services.app.util", []))

	    .constant("formatDuration", function (seconds, floating) {
	        var durations = [];

	        durations[0] = seconds > 3600 ? Math.floor(seconds / 3600) : 0;
	        durations[1] = seconds > 60 ? Math.floor((seconds - durations[0] * 3600) / 60) : 0;
	        
	        if (floating > 0) {
	          durations[2] = (seconds % 60).toFixed(1);
	          if (durations[2] < 0 || (1/durations[2]) === -Infinity) {
	            durations[2] = "0.0";
	          }
	        }
	        else {
	          durations[2] = (seconds % 60);
	        }
	        
	        if (durations.length > 2 && durations[0] === 0) {
	          durations.shift();
	        }
	        return durations.map(function(d,k){
	          return k <= 0 || d >= 10 ? d : "0" + d;
	        }).join(":");
	    })

	    .constant("fuzzyMatch", fuzzyMatch)
	    
	    .constant("wordMatch", wordMatch)

	    .constant("scMatch", function (s, t) {
	      // Determine the Damerau-Levenshtein distance between s and t
	      if (!s || !t) {
	        return 99;
	      }
	      var m = s.length;
	      var n = t.length;      
	      var charDictionary = new Object();

	      /* For all i and j, d[i][j] holds the Damerau-Levenshtein distance
	       * between the first i characters of s and the first j characters of t.
	       * Note that the array has (m+1)x(n+1) values.
	       */
	      var d = new Array();
	      for (var i = 0; i <= m; i++) {
	        d[i] = new Array();
	        d[i][0] = i;
	      }
	      for (var j = 0; j <= n; j++) {
	        d[0][j] = j;
	      }

	      // Populate a dictionary with the alphabet of the two strings
	      for (var i = 0; i < m; i++) {
	        charDictionary[s.charAt(i)] = 0;
	      }
	      for (var j = 0; j < n; j++) {
	        charDictionary[t.charAt(j)] = 0;
	      }

	      // Determine substring distances
	      for (var i = 1; i <= m; i++) {
	        var db = 0;
	        for (var j = 1; j <= n; j++) {
	          var i1 = charDictionary[t.charAt(j-1)];
	          var j1 = db;
	          var cost = 0;

	          if (s.charAt(i-1) == t.charAt(j-1)) { // Subtract one to start at strings' index zero instead of index one
	            db = j;
	          } else {
	            cost = 2;
	          }
	          d[i][j] = Math.min(d[i][j-1] + 1,                 // insertion
	                             Math.min(d[i-1][j] + 1,        // deletion
	                                      d[i-1][j-1] + cost)); // substitution
	          if(i1 > 0 && j1 > 0) {
	            d[i][j] = Math.min(d[i][j], d[i1-1][j1-1] + (i-i1-1) + (j-j1-1) + 1); //transposition
	          }
	        }
	        charDictionary[s.charAt(i-1)] = i;
	      }

	      // Return the strings' distance
	      return d[m][n];
	    });
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(!(function webpackMissingModule() { throw new Error("Cannot find module \"ui.router\""); }()));
	__webpack_require__(15);
	__webpack_require__(36);
	/* WEBPACK VAR INJECTION */(function(angular, process) {(function(){

	  (module.exports['app.services.app.auth'] = angular.module("app.services.app.auth", [
	    "app.services.app",
	    "shava.services.nwSupport",
	    "ui.router",
	    "ng"
	  ]))

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), __webpack_require__(74)))

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(21);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['app.services.app.playlists'] = angular.module("app.services.app.playlists", [
	    "app.models.playlist",
	    "shava.services.sessions",
	    "shava.services.nwSupport"
	  ]))

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(73);
	__webpack_require__(70);
	__webpack_require__(72);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['app.services.actions.playerActions'] = angular.module('app.services.actions.playerActions', [
	    'shava.services.dispatcher',
	    'app.services.stores.playerStore',
	    'app.services.constants.playerConstants'
	  ]))

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['app.services.youtubeControl.youtubeControlDirective'] = angular.module("app.services.youtubeControl.youtubeControlDirective", []))

	    .directive("youtubeControl", function(){
	      var ytUrl = 'http://www.youtube.com/embed/?enablejsapi=1&controls=0&autoplay=0&showinfo=0&rel=0';

	      return {
	        restrict: "A",
	        replace: true,
	        template: '<div class="youtube-control"><iframe nwdisable nwfaketop type="text/html" width="100%" height="100%" src="'+ytUrl+'" frameborder="0"></iframe></div>',
	        scope: {
	          player: "="
	        },
	        link: function (scope, element, attrs) {
	          scope.player.bindElement(element.children(0));
	        }
	      };

	    });
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.services.util.debounce'] = angular.module('shava.services.util.debounce', []))

	    .constant('shavaDebounce', shavaDebounce)
	    .constant('shavaThrottle', shavaThrottle);

	  function shavaDebounce(method, timeMs, triggerFn) {
	    var timeoutObj;

	    timeoutFn.$stop = $stop;

	    if (triggerFn) {
	      timeoutWrapper();
	    }

	    return timeoutFn;

	    function timeoutFn() {
	      var self = this
	        , args = arguments;

	      $stop();
	      timeoutObj = timeoutWrapper(timeMs, self, args);
	    };

	    function $stop() {
	      if (timeoutObj != null) {
	        clearTimeout(timeoutObj);
	        timeoutObj = null;
	      }
	    };

	    function timeoutWrapper(time, self, args) {
	      return setTimeout(function () {
	        method.apply(self, args);
	      }, time);
	    }
	  }

	  function shavaThrottle(func, wait, options) {
	    // copied from ngStrap to save tme 
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    options || (options = {});
	    var later = function () {
	      previous = options.leading === false ? 0 : new Date();
	      timeout = null;
	      result = func.apply(context, args);
	    };
	    return function () {
	      var now = new Date();
	      if (!previous && options.leading === false)
	        previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0) {
	        clearTimeout(timeout);
	        timeout = null;
	        previous = now;
	        result = func.apply(context, args);
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(73);
	__webpack_require__(72);
	__webpack_require__(109);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['app.services.stores.playerStore'] = angular.module('app.services.stores.playerStore', [
	    'shava.services.store',
	    'shava.services.dispatcher',
	    'app.services.constants.playerConstants'
	  ]))

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  /**
	  * Mixin Module
	  *
	  * helper to mixin objects into class-like objects
	  */
	  (module.exports['shava.services.util.mixin'] = angular.module('shava.services.util.mixin', []))

	    .constant('mixin', mixin);

	  function mixin(){
	    var source;
	    var recurse = false;
	    var oldFn, i;
	    
	    if (arguments[0] === true) {
	      recurse = true;
	      source = arguments[1];
	      i = 2;
	    }
	    else {
	      source = arguments[0];
	      i = 1;
	    }

	    for (; i < arguments.length; i++) {
	      for (var i2 in arguments[i]) {
	        if (arguments[i].hasOwnProperty(i2)) {
	          if (typeof arguments[i][i2] === 'function') {
	            oldFn = typeof source[i2] === 'function' ? source[i2] : angular.noop;
	            source[i2] = arguments[i][i2].bind(source[i2]);
	            source[i2]._super = oldFn;
	          }
	          else if (recurse && angular.isArray(arguments[i][i2]) && angular.isArray(source[i2])) {
	            source[i2].concat(arguments[i][i2]);
	          }
	          else if (recurse && typeof arguments[i][i2] === 'object' && typeof source[i2] === 'object') {
	            mixin(source[i2], arguments[i][i2]);
	          }
	          else {
	            source[i2] = arguments[i][i2];
	          }
	        }
	      }
	    }
	  }
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(110);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  var Dispatcher = __webpack_require__(119).Dispatcher;

	  (module.exports['shava.services.dispatcher'] = angular.module('shava.services.dispatcher', [
	    'shava.services.action'
	  ]))

	    .factory('$dispatcher', ['$action', function($action){
	      var $dispatcher = new Dispatcher();

	      var dispatch = $dispatcher.dispatch;

	      $dispatcher.dispatch = function (name, action) {
	        return dispatch.call($dispatcher, $action(name, action));
	      };

	      return $dispatcher;
	    }]);
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {

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

	  (module.exports['app.services.constants.playerConstants'] = angular.module('app.services.constants.playerConstants', []))
	    .constant('playerConstants', playerConstants);

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    draining = true;
	    var currentQueue;
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        var i = -1;
	        while (++i < len) {
	            currentQueue[i]();
	        }
	        len = queue.length;
	    }
	    draining = false;
	}
	process.nextTick = function (fun) {
	    queue.push(fun);
	    if (!draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		"title": "piffy",
		"logo": "public/logo.png",
		"debug": true,
		"apps": {
			"movies": false,
			"music": false,
			"books": false,
			"tv_shows": false
		}
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div ng-controller=\"LoginController\"> <div ng-if=\"!nodeless\" class=\"navbar navbar-main navbar-login navbar-inverse navbar-fixed-top\" role=\"navigation\"> <div class=\"container-fluid\"> <div class=\"clearfix navbar-titlebar\" style=\"-webkit-app-region: drag\"> <div class=\"navbar-window-buttons\"> <div ng-click=\"closeWindow($event)\" class=\"navbar-window-button navbar-window-button-close\"></div> <div ng-click=\"minimizeWindow($event)\" class=\"navbar-window-button navbar-window-button-min\"></div> </div> </div> </div> </div> <div class=\"login-container\"> <a class=\"login-logo\" ng-style=\"logoStyle\" ng-bind=\"::app.settings.get('title')\"></a> <form ng-submit=\"submitForm($event)\" class=\"login-form\"> <div ng-if=\"err\" class=\"alert login-form-err slide-top alert-ptr\" ng-bind=\"err\"></div> <div ng-if=\"loading\" class=\"login-form-loader small-loader\">Signing in...</div> <div class=\"form-spacing\"> <input type=\"text\" ng-model=\"email\" ng-change=\"updateInfo()\" class=\"form-control\" placeholder=\"Email or Username\"> </div> <div class=\"form-spacing\"> <input type=\"password\" ng-model=\"password\" ng-change=\"updateInfo()\" class=\"form-control\" placeholder=\"Password\"> </div> <label class=\"toggler-label\"> <input class=\"toggle-checkbox\" type=\"checkbox\"> <div class=\"toggler\"></div> Keep me signed in </label> <button ng-disabled=\"loading\" ng-bind=\"loading ? 'Signing in...' : 'Sign in'\" class=\"btn login-main-btn\" type=\"submit\"></button> </form> </div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/login.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div app-loader=\"app.loading\"></div> <div ng-if=\"!app.loading\" class=\"navbar navbar-main navbar-inverse navbar-fixed-top\" role=\"navigation\"> <div class=\"container-fluid\"> <div class=\"clearfix navbar-titlebar\" style=\"-webkit-app-region: drag\"> <div class=\"navbar-app-title\"> <a class=\"navbar-app-brand\" ng-bind=\"::app.settings.get('title').toUpperCase()\"></a> </div> <div class=\"clearfix navbar-window-buttons\"> <div ng-if=\"!nodeless\" class=\"pull-left\"> <div ng-click=\"closeWindow($event)\" class=\"navbar-window-button navbar-window-button-close\"></div> <div ng-click=\"minimizeWindow($event)\" class=\"navbar-window-button navbar-window-button-min\"></div> <div ng-click=\"maximizeWindow($event)\" class=\"navbar-window-button navbar-window-button-max\"></div> </div> <div ng-if=\"!nodeless\" class=\"pull-left history-nav\"> <span ng-click=\"historyBack($event)\" ng-class=\"{'has-history': $root.$history.hasPrev}\" class=\"pull-left player-controls-back-small\"></span>\n<span ng-click=\"historyForward($event)\" ng-class=\"{'has-history': $root.$history.hasNext}\" class=\"pull-left player-controls-forward-small\"></span> </div> </div> </div> <div class=\"pull-right\"> <ul class=\"nav navbar-nav\"> <li><a bs-dropdown=\"userPreferencesDropdown\" data-placement=\"bottom-right\" data-html=\"true\" class=\"btn-lg\"><img ng-src=\"https://www.gravatar.com/avatar/{{userMeta.avatar}}\" class=\"avatar-settings\"></a></li> </ul> </div> <div ui-view=\"searchBar\"></div> </div> </div> <div sh-columns=\"{}\" sh-columns-callback=\"app.saveColumnWidths()\" class=\"main-wrapper\"> <div ui-view=\"sidebar\"></div> <div ng-style=\"{'left': app.columnWidths.sidebar}\" class=\"main\" sh-column=\"{last:true}\"> <div ng-show=\"app.tabsNav.selected.length === 0\"> <div app-loader=\"app.isLoading\"></div> <div ng-show=\"!app.isLoading\"> <div ng-animate=\"'toggle'\" ui-view></div> </div> </div> <div ng-repeat=\"tab in app.tabs\"> <div ng-show=\"app.tabsNav.selected[0] === tab\" ng-style=\"{'left': app.columnWidths.sidebar}\" sh-column=\"{last:true}\"> <div sh-watch=\"true\" sh-include=\"tab\"></div> </div> </div> </div> </div> <div ui-view=\"player\"></div>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/app.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div class=\"hard-notice\">The &quot;Browse&quot; feature is currently unavailable in your country.</div>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/browse.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div class=\"hard-notice\">The &quot;Playlist&quot; feature is currently unavailable in your country.</div>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/downloads.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div app-loader=\"isLoading\"></div> <div ng-show=\"!isLoading\" sh-autofocus=\"1\" sh-key=\"{ del: '$event.preventDefault()', bsp: '$event.preventDefault()' }\" sh-scrollarea=\"85\" class=\"full-container\"> <div sh-focussable sh-selectables=\"selectableOpts\" class=\"main-stretch song-table main-top\"> <h2 class=\"hot-header\">Play Queue</h2> <sh-fixed-scroll watch> <div class=\"song-table-headers\" ng-style=\"{width: playlistHeaderWidth}\" sh-columns-callback=\"saveColumnWidths()\" sh-columns=\"{}\"> <div class=\"song-table-header\" sh-column-model=\"columnWidths[0]\" ng-style=\"{width: columnWidths[0]}\" sh-column>Track</div> <div class=\"song-table-header\" sh-column-model=\"columnWidths[3]\" ng-style=\"{width: columnWidths[3]}\" sh-column>Artist</div> <div class=\"song-table-header\" sh-column-model=\"columnWidths[1]\" ng-style=\"{width: columnWidths[1]}\" sh-column>Time</div> <div class=\"song-table-header\" sh-column-model=\"columnWidths[2]\" ng-style=\"{width: columnWidths[2]}\" sh-column=\"{min: 115}\">Rating</div> </div> </sh-fixed-scroll> <div ng-switch on=\"playlist.length\"> <div ng-switch-when=\"0\"> <div class=\"song-table-msg\">Your play queue is currently empty.</div> </div> <div ng-switch-default> <div sh-key=\"songKeyBindings\" ng-dblclick=\"playSong($event, song)\" class=\"song-table-row\" ng-style=\"{width: playlistHeaderWidth}\" ng-class=\"{'sh-selected': song.selected}\" sh-selectable=\"$index\" sh-selectable-object=\"song\" ng-repeat=\"(songIndex, song) in songs | orderBy:playlistTable.order track by song._id\"> <div class=\"song-table-column\" ng-style=\"{width: columnWidths[0]}\"><span class=\"song-play-icon\">&#9656;</span> <span ng-bind=\"::song.title\"></span></div> <div class=\"song-table-column\" ng-style=\"{width: columnWidths[3]}\" ng-bind=\"::song.artist\"></div> <div class=\"song-table-column\" ng-style=\"{width: columnWidths[1]}\" ng-bind=\"song.durationText\"></div> <div class=\"song-table-column\" ng-style=\"{width: columnWidths[2]}\"> <app-stars value=\"song.rating\"/> </div> </div> </div> </div> </div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/queue.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div class=\"hard-notice\">The &quot;Playlist&quot; feature is currently unavailable in your country.</div>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/playlist.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<span ng-click=\"$event.stopPropagation()\" class=\"star-rating\"> <input type=\"radio\" ng-model=\"rating\" value=\"0.5\"><i></i>\n<input type=\"radio\" ng-model=\"rating\" value=\"1\"><i></i>\n<input type=\"radio\" ng-model=\"rating\" value=\"1.5\"><i></i>\n<input type=\"radio\" ng-model=\"rating\" value=\"2\"><i></i>\n<input type=\"radio\" ng-model=\"rating\" value=\"2.5\"><i></i>\n<input type=\"radio\" ng-model=\"rating\" value=\"3\"><i></i>\n<input type=\"radio\" ng-model=\"rating\" value=\"3.5\"><i></i>\n<input type=\"radio\" ng-model=\"rating\" value=\"4\"><i></i>\n<input type=\"radio\" ng-model=\"rating\" value=\"4.5\"><i></i>\n<input type=\"radio\" ng-model=\"rating\" value=\"5\"><i></i> </span>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/star-rating.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div class=\"hard-notice\"> The &quot;New Releases&quot; feature is currently unavailable in your country. <p>Until then, check out the new &amp; popular on the <a ui-sref=\"app.player.index\">Hot This Week</a> section. </p></div>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/controversial.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div ng-if=\"showLoader\" class=\"toggle el-loader-screen\"> <div class=\"el-loader-container\"> <div class=\"el-loader\"></div> </div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/loader.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div app-loader=\"isLoading\"></div> <div ng-show=\"!isLoading\" sh-autofocus=\"1\" sh-key=\"{ del: '$event.preventDefault()', bsp: '$event.preventDefault()' }\" sh-scrollarea=\"85\" class=\"full-container\"> <div sh-focussable sh-selectables=\"selectableOpts\" class=\"main-stretch song-table main-top\"> <h2 class=\"hot-header\">Hot This Week</h2> <div ng-bind=\"$state\"></div> <sh-fixed-scroll watch> <div class=\"song-table-headers\" ng-style=\"{width: playlistHeaderWidth}\" sh-columns-callback=\"saveColumnWidths()\" sh-columns=\"{}\"> <div class=\"song-table-header\" sh-column-model=\"columnWidths[0]\" ng-style=\"{width: columnWidths[0]}\" sh-column> <div ng-click=\"playlistTable.toggleSort('title')\" ng-class=\"{'sort-asc': playlistTable.order === '+title', 'sort-desc': playlistTable.order === '-title'}\">Track</div> </div> <div class=\"song-table-header\" sh-column-model=\"columnWidths[3]\" ng-style=\"{width: columnWidths[3]}\" sh-column> <div ng-click=\"playlistTable.toggleSort('artist')\" ng-class=\"{'sort-asc': playlistTable.order === '+artist', 'sort-desc': playlistTable.order === '-artist'}\">Artist</div> </div> <div class=\"song-table-header\" sh-column-model=\"columnWidths[1]\" ng-style=\"{width: columnWidths[1]}\" sh-column> <div ng-click=\"playlistTable.toggleSort('duration')\" ng-class=\"{'sort-asc': playlistTable.order === '+duration', 'sort-desc': playlistTable.order === '-duration'}\">Time</div> </div> <div class=\"song-table-header\" sh-column-model=\"columnWidths[2]\" ng-style=\"{width: columnWidths[2]}\" sh-column=\"{min: 115}\"> <div ng-click=\"playlistTable.toggleSort('rating')\" ng-class=\"{'sort-asc': playlistTable.order === '+rating', 'sort-desc': playlistTable.order === '-rating'}\">Rating</div> </div> </div> </sh-fixed-scroll> <div ng-switch on=\"playlist.length\"> <div ng-switch-when=\"0\"> <div class=\"song-table-msg\">No results found. Please try again later.</div> </div> <div ng-switch-default> <div sh-key=\"songKeyBindings\" ng-dblclick=\"playSong($event, song)\" class=\"song-table-row\" ng-style=\"{width: playlistHeaderWidth}\" ng-class=\"{'sh-selected': song.selected, 'song-playing-row': $stores.playerStore.currentSong === song}\" sh-selectable=\"$index\" sh-selectable-object=\"song\" ng-repeat=\"(songIndex, song) in songs | orderBy:playlistTable.order track by song._id\"> <div class=\"song-table-column\" ng-style=\"{width: columnWidths[0]}\"><span class=\"song-play-icon\">&#9656;</span> <span ng-bind=\"::song.title\"></span></div> <div class=\"song-table-column\" ng-style=\"{width: columnWidths[3]}\" ng-bind=\"::song.artist\"></div> <div class=\"song-table-column\" ng-style=\"{width: columnWidths[1]}\" ng-bind=\"song.durationText\"></div> <div class=\"song-table-column\" ng-style=\"{width: columnWidths[2]}\"> <app-stars value=\"song.rating\"/> </div> </div> </div> </div> </div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/home.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div class=\"el-player\"> <div ng-click=\"$player.back();\" class=\"pull-left player-controls-back\"> </div> <div ng-click=\"$player.play();\" ng-if=\"!$player.button\" class=\"pull-left player-controls-play\"> </div> <div ng-click=\"$player.play();\" ng-if=\"$player.button\" class=\"pull-left player-controls-pause\"> </div> <div ng-click=\"$player.forward();\" class=\"pull-left player-controls-forward\"> </div> <div ng-class=\"{'change-active': $player.isSeekingVolume}\" class=\"volume-control pull-left\"> <div class=\"volume-bar\" opts=\"volumeOpts\" sh-range=\"$player.volumeRange\"> <div class=\"volume-bar-range\" sh-range-slider=\"vertical\"></div> </div> <div ng-show=\"$player.vol === 0\" ng-click=\"$player.toggleVolume();\" class=\"player-controls-vol0 pull-left\"> </div> <div ng-show=\"$player.vol === 1\" ng-click=\"$player.toggleVolume();\" class=\"player-controls-vol1 pull-left\"> </div> <div ng-show=\"$player.vol === 2\" ng-click=\"$player.toggleVolume();\" class=\"player-controls-vol2 pull-left\"> </div> <div ng-show=\"$player.vol === 3\" ng-click=\"$player.toggleVolume();\" class=\"player-controls-vol3 pull-left\"> </div> </div> <div ng-bind=\"$player.positionText\" class=\"pull-left player-time\">0:03</div> <div ng-bind=\"$player.durationText\" class=\"pull-right player-time\">0:03</div> <div class=\"player-bar\" opts=\"playerPositionOpts\" sh-range=\"$player.playerPositionRange\"> <div class=\"player-bar-background\" ng-style=\"{backgroundImage: $player.waveformBg}\" ng-if=\"$player.waveformBg\"></div> <div class=\"player-bar-range\" sh-range-slider></div> </div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/player.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="asdfsadf";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/preferences.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div class=\"pull-left\"> <div ng-class=\"{'search-form-focus': flags.searchFocused}\" class=\"navbar-form search-form\"> <i class=\"icon icon-search search-icon\"></i>  <div class=\"search-control-wrap\"> <input type=\"text\" ng-style=\"{width: (app.columnWidths.sidebar - 65)}\" ng-model=\"$root.searchText\" sh-key=\"searchBindings\" ng-focus=\"flags.searchFocused = true\" ng-blur=\"flags.searchFocused = false\" class=\"search-control form-control\" placeholder=\"Search\"> </div> </div> </div> <ul sh-selectables=\"app.tabsNav\" class=\"nav navbar-nav navbar-nav-tabs\"> <li ng-repeat=\"tab in app.tabs\" ng-class=\"{'tab-active': tab.$$selected}\"><a sh-autofocus=\"tab.$$selected\" sh-key=\"tabBindings\" sh-selectable=\"$index\" sh-selectable-object=\"tab\"><span ng-click=\"removeTab($event, $index)\" class=\"tab-close\">&times;</span> <i ng-if=\"tab.icon\" ng-class=\"tab.icon\"></i> <span ng-bind=\"tab.text\"></span></a></li> </ul>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/searchBar.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div sh-focusable=\"1\" class=\"sidebar-wrapper\" sh-column=\"{min:174,max:300,distance:4}\" sh-column-model=\"app.columnWidths.sidebar\" ng-style=\"{width: app.columnWidths.sidebar}\"> <div class=\"sidebar-full\"> <div sh-scrollarea=\"85\" class=\"sidebar\" sh-selectables=\"app.sidebarNav\" ng-style=\"{bottom: app.columnWidths.sidebar}\"> <div class=\"sidebar-scroll\"> <h5 class=\"navbar-top-header navbar-section-header\">Browse Selections</h5> <ul class=\"nav nav-sidebar\"> <li sh-selectable=\"0\" sh-selectable-object=\"app.sidebarOpts[0]\" ng-class=\"{active: app.sidebarOpts[0].selected}\"><a ng-bind=\"app.sidebarOpts[0].label\"></a></li> <li sh-selectable=\"1\" sh-selectable-object=\"app.sidebarOpts[1]\" ng-class=\"{active: app.sidebarOpts[1].selected}\"><a ng-bind=\"app.sidebarOpts[1].label\"></a></li> </ul> <h5 class=\"navbar-section-header\">My Music</h5> <ul class=\"nav nav-sidebar\"> <li sh-selectable=\"2\" sh-selectable-object=\"app.sidebarOpts[2]\" ng-class=\"{active: app.sidebarOpts[2].selected}\"><a>Downloads</a></li> <li sh-selectable=\"3\" sh-selectable-object=\"app.sidebarOpts[3]\" ng-class=\"{active: app.sidebarOpts[3].selected}\"><a ng-bind=\"app.sidebarOpts[3].label\"></a></li> <li sh-selectable=\"4\" sh-selectable-object=\"app.sidebarOpts[4]\" ng-class=\"{active: app.sidebarOpts[4].selected}\"><a>Queue <span ng-bind=\"app.player.length\" class=\"badge badge-alt\"></span></a></li> </ul> <h5 class=\"navbar-section-header\">Entertainment</h5> <ul class=\"nav nav-sidebar\"> <li sh-selectable=\"5\" sh-selectable-object=\"app.sidebarOpts[5]\" ng-class=\"{active: app.sidebarOpts[5].selected}\"><a ng-bind=\"app.sidebarOpts[5].label\"></a></li> <li sh-selectable=\"6\" sh-selectable-object=\"app.sidebarOpts[6]\" ng-class=\"{active: app.sidebarOpts[6].selected}\"><a ng-bind=\"app.sidebarOpts[6].label\"></a></li> <li sh-selectable=\"7\" sh-selectable-object=\"app.sidebarOpts[7]\" ng-class=\"{active: app.sidebarOpts[7].selected}\"><a ng-bind=\"app.sidebarOpts[7].label\"></a></li> </ul> <a ng-click=\"sidebar.createPlaylist(true)\" class=\"navbar-btn sh-btn sh-btn-long sh-btn-primary btn-xs btn-icon\"><i class=\"icon icon-sm icon-circle-plus\"></i> ADD PLAYLIST</a> <ul class=\"nav nav-sidebar\"> <li sh-selectable=\"$index+8\" sh-selectable-object=\"playlist\" ng-class=\"{active: playlist.selected}\" sh-right-click=\"app.playlists.contextMenu($event, $index)\" ng-repeat=\"playlist in app.playlists track by $index\"> <a ng-class=\"{navEditing: playlist.editing}\"> <span sh-editable-callback=\"finishEdit(playlist, $value, $update, $refocus)\" sh-editable=\"playlist.editing\" ng-model=\"playlist.name\"></span>\n<i class=\"icon icon-notes\"></i>\n&nbsp; </a> </li> </ul> </div> </div> <div ng-style=\"{height: app.columnWidths.sidebar, width: app.columnWidths.sidebar}\" class=\"sidebar-artist-info\"> <div soundcloud-control ng-class=\"{'hide-player': $hidden}\" player=\"app.player\"></div> </div> </div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/sidebar.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div app-loader=\"isLoading\"></div> <div ng-show=\"!isLoading\" sh-autofocus=\"1\" sh-key=\"{ del: '$event.preventDefault()', bsp: '$event.preventDefault()' }\" sh-scrollarea=\"85\" class=\"full-container\"> <div sh-focussable sh-selectables=\"selectableOpts\" class=\"main-stretch song-table main-top\"> <h2 class=\"search-header\">Search results for <span class=\"search-header-term\" ng-bind=\"searchTerm\"></span></h2> <div class=\"search-result-details\">Showing {{songs.length}} of {{'10000' | number:0}} results</div> <sh-fixed-scroll watch> <div class=\"song-table-headers\" ng-style=\"{width: playlistHeaderWidth}\" sh-columns-callback=\"saveColumnWidths()\" sh-columns=\"{}\"> <div class=\"song-table-header\" sh-column-model=\"columnWidths[0]\" ng-style=\"{width: columnWidths[0]}\" sh-column> <div ng-click=\"playlistTable.toggleSort('title')\" ng-class=\"{'sort-asc': playlistTable.order === '+title', 'sort-desc': playlistTable.order === '-title'}\">Track</div> </div> <div class=\"song-table-header\" sh-column-model=\"columnWidths[3]\" ng-style=\"{width: columnWidths[3]}\" sh-column> <div ng-click=\"playlistTable.toggleSort('artist')\" ng-class=\"{'sort-asc': playlistTable.order === '+artist', 'sort-desc': playlistTable.order === '-artist'}\">Artist</div> </div> <div class=\"song-table-header\" sh-column-model=\"columnWidths[1]\" ng-style=\"{width: columnWidths[1]}\" sh-column> <div ng-click=\"playlistTable.toggleSort('duration')\" ng-class=\"{'sort-asc': playlistTable.order === '+duration', 'sort-desc': playlistTable.order === '-duration'}\">Time</div> </div> <div class=\"song-table-header\" sh-column-model=\"columnWidths[2]\" ng-style=\"{width: columnWidths[2]}\" sh-column=\"{min: 115}\"> <div ng-click=\"playlistTable.toggleSort('rating')\" ng-class=\"{'sort-asc': playlistTable.order === '+rating', 'sort-desc': playlistTable.order === '-rating'}\">Rating</div> </div> </div> </sh-fixed-scroll> <div ng-switch on=\"playlist.length\"> <div ng-switch-when=\"0\"> <div class=\"song-table-msg\">No results found. Please try again later.</div> </div> <div ng-switch-default> <div sh-key=\"songKeyBindings\" ng-dblclick=\"playSong($event, song)\" class=\"song-table-row\" ng-style=\"{width: playlistHeaderWidth}\" ng-class=\"{'sh-selected': song.selected, 'song-playing-row': $stores.playerStore.currentSong === song}\" sh-selectable=\"$index\" sh-selectable-object=\"song\" ng-repeat=\"(songIndex, song) in songs | orderBy:playlistTable.order track by song._id\"> <div class=\"song-table-column\" ng-style=\"{width: columnWidths[0]}\"><span class=\"song-play-icon\">&#9656;</span> <span ng-bind=\"::song.title\"></span></div> <div class=\"song-table-column\" ng-style=\"{width: columnWidths[3]}\" ng-bind=\"::song.artist\"></div> <div class=\"song-table-column\" ng-style=\"{width: columnWidths[1]}\" ng-bind=\"song.durationText\"></div> <div class=\"song-table-column\" ng-style=\"{width: columnWidths[2]}\"> <app-stars value=\"song.rating\"/> </div> </div> </div> </div> </div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("app/templates/search.html",v1)}]);
	module.exports=v1;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var refs = 0;
	var dispose;
	exports.use = exports.ref = function() {
		if(!(refs++)) {
			var content = __webpack_require__(92)
			if(typeof content === 'string') content = [[module.id, content, '']];
			dispose = __webpack_require__(117)(content);
		}
		return exports
	};
	exports.unuse = exports.unref = function() {
		if(!(--refs)) {
			dispose();
			dispose = null;
		}
	};
	if(false) {
		refs = module.hot.data && module.hot.data.refs || 0;
		if(refs) {
			refs--;
			exports.ref();
		}
		module.hot.accept();
		module.hot.dispose(function(data) {
			data.refs = refs;
			if(dispose) {
				dispose();
			}
		});
	}

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(115)();
	exports.push([module.id, "@charset \"UTF-8\";\n/*! normalize.css v3.0.1 | MIT License | git.io/normalize */\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\nbody {\n  margin: 0;\n}\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline;\n}\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n[hidden],\ntemplate {\n  display: none;\n}\n\na {\n  background: transparent;\n}\n\na:active,\na:hover {\n  outline: 0;\n}\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\nb,\nstrong {\n  font-weight: bold;\n}\n\ndfn {\n  font-style: italic;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nimg {\n  border: 0;\n}\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\nfigure {\n  margin: 1em 40px;\n}\n\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0;\n}\n\npre {\n  overflow: auto;\n}\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0;\n}\n\nbutton {\n  overflow: visible;\n}\n\nbutton,\nselect {\n  text-transform: none;\n}\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer;\n}\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\ninput {\n  line-height: normal;\n}\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0;\n}\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n}\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\nlegend {\n  border: 0;\n  padding: 0;\n}\n\ntextarea {\n  overflow: auto;\n}\n\noptgroup {\n  font-weight: bold;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n\n@media print {\n  * {\n    text-shadow: none !important;\n    color: #000 !important;\n    background: transparent !important;\n    box-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n\n  a[href^=\"javascript:\"]:after,\n  a[href^=\"#\"]:after {\n    content: \"\";\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n\n  select {\n    background: #fff !important;\n  }\n\n  .navbar {\n    display: none;\n  }\n\n  .table td,\n  .table th {\n    background-color: #fff !important;\n  }\n\n  .btn > .caret, .sh-btn > .caret,\n  .dropup > .btn > .caret,\n  .dropup > .sh-btn > .caret {\n    border-top-color: #000 !important;\n  }\n\n  .label {\n    border: 1px solid #000;\n  }\n\n  .table {\n    border-collapse: collapse !important;\n  }\n\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important;\n  }\n}\n* {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n*:before,\n*:after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nhtml {\n  font-size: 10px;\n  -webkit-tap-highlight-color: transparent;\n}\n\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #eeeeee;\n  background-color: #101010;\n}\n\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\n\na {\n  color: #428bca;\n  text-decoration: none;\n}\na:hover, a:focus {\n  color: #2a6496;\n  text-decoration: underline;\n}\na:focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n\nfigure {\n  margin: 0;\n}\n\nimg {\n  vertical-align: middle;\n}\n\n.img-responsive {\n  display: block;\n  width: 100% \\9;\n  max-width: 100%;\n  height: auto;\n}\n\n.img-rounded {\n  border-radius: 6px;\n}\n\n.img-thumbnail {\n  padding: 4px;\n  line-height: 1.42857;\n  background-color: #101010;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  display: inline-block;\n  width: 100% \\9;\n  max-width: 100%;\n  height: auto;\n}\n\n.img-circle {\n  border-radius: 50%;\n}\n\nhr {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  border: 0;\n  border-top: 1px solid #eeeeee;\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit;\n}\nh1 small,\nh1 .small, h2 small,\nh2 .small, h3 small,\nh3 .small, h4 small,\nh4 .small, h5 small,\nh5 .small, h6 small,\nh6 .small,\n.h1 small,\n.h1 .small, .h2 small,\n.h2 .small, .h3 small,\n.h3 .small, .h4 small,\n.h4 .small, .h5 small,\n.h5 .small, .h6 small,\n.h6 .small {\n  font-weight: normal;\n  line-height: 1;\n  color: #777777;\n}\n\nh1, .h1,\nh2, .h2,\nh3, .h3 {\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\nh1 small,\nh1 .small, .h1 small,\n.h1 .small,\nh2 small,\nh2 .small, .h2 small,\n.h2 .small,\nh3 small,\nh3 .small, .h3 small,\n.h3 .small {\n  font-size: 65%;\n}\n\nh4, .h4,\nh5, .h5,\nh6, .h6 {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\nh4 small,\nh4 .small, .h4 small,\n.h4 .small,\nh5 small,\nh5 .small, .h5 small,\n.h5 .small,\nh6 small,\nh6 .small, .h6 small,\n.h6 .small {\n  font-size: 75%;\n}\n\nh1, .h1 {\n  font-size: 36px;\n}\n\nh2, .h2 {\n  font-size: 30px;\n}\n\nh3, .h3 {\n  font-size: 24px;\n}\n\nh4, .h4 {\n  font-size: 18px;\n}\n\nh5, .h5 {\n  font-size: 14px;\n}\n\nh6, .h6 {\n  font-size: 12px;\n}\n\np {\n  margin: 0 0 10px;\n}\n\n.lead {\n  margin-bottom: 20px;\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 1.4;\n}\n@media (min-width: 768px) {\n  .lead {\n    font-size: 21px;\n  }\n}\n\nsmall,\n.small {\n  font-size: 85%;\n}\n\ncite {\n  font-style: normal;\n}\n\nmark,\n.mark {\n  background-color: #fcf8e3;\n  padding: .2em;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-justify {\n  text-align: justify;\n}\n\n.text-nowrap {\n  white-space: nowrap;\n}\n\n.text-lowercase {\n  text-transform: lowercase;\n}\n\n.text-uppercase {\n  text-transform: uppercase;\n}\n\n.text-capitalize {\n  text-transform: capitalize;\n}\n\n.text-muted {\n  color: #777777;\n}\n\n.text-primary {\n  color: #428bca;\n}\n\na.text-primary:hover {\n  color: #3071a9;\n}\n\n.text-success {\n  color: #3c763d;\n}\n\na.text-success:hover {\n  color: #2b542c;\n}\n\n.text-info {\n  color: #31708f;\n}\n\na.text-info:hover {\n  color: #245269;\n}\n\n.text-warning {\n  color: #8a6d3b;\n}\n\na.text-warning:hover {\n  color: #66512c;\n}\n\n.text-danger {\n  color: #a94442;\n}\n\na.text-danger:hover {\n  color: #843534;\n}\n\n.bg-primary {\n  color: #fff;\n}\n\n.bg-primary {\n  background-color: #428bca;\n}\n\na.bg-primary:hover {\n  background-color: #3071a9;\n}\n\n.bg-success {\n  background-color: #dff0d8;\n}\n\na.bg-success:hover {\n  background-color: #c1e2b3;\n}\n\n.bg-info {\n  background-color: #d9edf7;\n}\n\na.bg-info:hover {\n  background-color: #afd9ee;\n}\n\n.bg-warning {\n  background-color: #fcf8e3;\n}\n\na.bg-warning:hover {\n  background-color: #f7ecb5;\n}\n\n.bg-danger {\n  background-color: #f2dede;\n}\n\na.bg-danger:hover {\n  background-color: #e4b9b9;\n}\n\n.page-header {\n  padding-bottom: 9px;\n  margin: 40px 0 20px;\n  border-bottom: 1px solid #eeeeee;\n}\n\nul,\nol {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\nul ul,\nul ol,\nol ul,\nol ol {\n  margin-bottom: 0;\n}\n\n.list-unstyled, .list-inline {\n  padding-left: 0;\n  list-style: none;\n}\n\n.list-inline {\n  margin-left: -5px;\n}\n.list-inline > li {\n  display: inline-block;\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\ndl {\n  margin-top: 0;\n  margin-bottom: 20px;\n}\n\ndt,\ndd {\n  line-height: 1.42857;\n}\n\ndt {\n  font-weight: bold;\n}\n\ndd {\n  margin-left: 0;\n}\n\n.dl-horizontal dd:before, .dl-horizontal dd:after {\n  content: \" \";\n  display: table;\n}\n.dl-horizontal dd:after {\n  clear: both;\n}\n@media (min-width: 768px) {\n  .dl-horizontal dt {\n    float: left;\n    width: 160px;\n    clear: left;\n    text-align: right;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .dl-horizontal dd {\n    margin-left: 180px;\n  }\n}\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #777777;\n}\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase;\n}\n\nblockquote {\n  padding: 10px 20px;\n  margin: 0 0 20px;\n  font-size: 17.5px;\n  border-left: 5px solid #eeeeee;\n}\nblockquote p:last-child,\nblockquote ul:last-child,\nblockquote ol:last-child {\n  margin-bottom: 0;\n}\nblockquote footer,\nblockquote small,\nblockquote .small {\n  display: block;\n  font-size: 80%;\n  line-height: 1.42857;\n  color: #777777;\n}\nblockquote footer:before,\nblockquote small:before,\nblockquote .small:before {\n  content: '\\2014 \\00A0';\n}\n\n.blockquote-reverse,\nblockquote.pull-right {\n  padding-right: 15px;\n  padding-left: 0;\n  border-right: 5px solid #eeeeee;\n  border-left: 0;\n  text-align: right;\n}\n.blockquote-reverse footer:before,\n.blockquote-reverse small:before,\n.blockquote-reverse .small:before,\nblockquote.pull-right footer:before,\nblockquote.pull-right small:before,\nblockquote.pull-right .small:before {\n  content: '';\n}\n.blockquote-reverse footer:after,\n.blockquote-reverse small:after,\n.blockquote-reverse .small:after,\nblockquote.pull-right footer:after,\nblockquote.pull-right small:after,\nblockquote.pull-right .small:after {\n  content: '\\00A0 \\2014';\n}\n\nblockquote:before,\nblockquote:after {\n  content: \"\";\n}\n\naddress {\n  margin-bottom: 20px;\n  font-style: normal;\n  line-height: 1.42857;\n}\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace;\n}\n\ncode {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #c7254e;\n  background-color: #f9f2f4;\n  border-radius: 4px;\n}\n\nkbd {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #fff;\n  background-color: #333;\n  border-radius: 3px;\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);\n}\nkbd kbd {\n  padding: 0;\n  font-size: 100%;\n  box-shadow: none;\n}\n\npre {\n  display: block;\n  padding: 9.5px;\n  margin: 0 0 10px;\n  font-size: 13px;\n  line-height: 1.42857;\n  word-break: break-all;\n  word-wrap: break-word;\n  color: #333333;\n  background-color: #f5f5f5;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\npre code {\n  padding: 0;\n  font-size: inherit;\n  color: inherit;\n  white-space: pre-wrap;\n  background-color: transparent;\n  border-radius: 0;\n}\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll;\n}\n\n.container {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.container:before, .container:after {\n  content: \" \";\n  display: table;\n}\n.container:after {\n  clear: both;\n}\n@media (min-width: 768px) {\n  .container {\n    width: 750px;\n  }\n}\n@media (min-width: 992px) {\n  .container {\n    width: 970px;\n  }\n}\n@media (min-width: 1200px) {\n  .container {\n    width: 1170px;\n  }\n}\n\n.container-fluid {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.container-fluid:before, .container-fluid:after {\n  content: \" \";\n  display: table;\n}\n.container-fluid:after {\n  clear: both;\n}\n\n.row {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n.row:before, .row:after {\n  content: \" \";\n  display: table;\n}\n.row:after {\n  clear: both;\n}\n\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\n  float: left;\n}\n\n.col-xs-1 {\n  width: 8.33333%;\n}\n\n.col-xs-2 {\n  width: 16.66667%;\n}\n\n.col-xs-3 {\n  width: 25%;\n}\n\n.col-xs-4 {\n  width: 33.33333%;\n}\n\n.col-xs-5 {\n  width: 41.66667%;\n}\n\n.col-xs-6 {\n  width: 50%;\n}\n\n.col-xs-7 {\n  width: 58.33333%;\n}\n\n.col-xs-8 {\n  width: 66.66667%;\n}\n\n.col-xs-9 {\n  width: 75%;\n}\n\n.col-xs-10 {\n  width: 83.33333%;\n}\n\n.col-xs-11 {\n  width: 91.66667%;\n}\n\n.col-xs-12 {\n  width: 100%;\n}\n\n.col-xs-pull-0 {\n  right: auto;\n}\n\n.col-xs-pull-1 {\n  right: 8.33333%;\n}\n\n.col-xs-pull-2 {\n  right: 16.66667%;\n}\n\n.col-xs-pull-3 {\n  right: 25%;\n}\n\n.col-xs-pull-4 {\n  right: 33.33333%;\n}\n\n.col-xs-pull-5 {\n  right: 41.66667%;\n}\n\n.col-xs-pull-6 {\n  right: 50%;\n}\n\n.col-xs-pull-7 {\n  right: 58.33333%;\n}\n\n.col-xs-pull-8 {\n  right: 66.66667%;\n}\n\n.col-xs-pull-9 {\n  right: 75%;\n}\n\n.col-xs-pull-10 {\n  right: 83.33333%;\n}\n\n.col-xs-pull-11 {\n  right: 91.66667%;\n}\n\n.col-xs-pull-12 {\n  right: 100%;\n}\n\n.col-xs-push-0 {\n  left: auto;\n}\n\n.col-xs-push-1 {\n  left: 8.33333%;\n}\n\n.col-xs-push-2 {\n  left: 16.66667%;\n}\n\n.col-xs-push-3 {\n  left: 25%;\n}\n\n.col-xs-push-4 {\n  left: 33.33333%;\n}\n\n.col-xs-push-5 {\n  left: 41.66667%;\n}\n\n.col-xs-push-6 {\n  left: 50%;\n}\n\n.col-xs-push-7 {\n  left: 58.33333%;\n}\n\n.col-xs-push-8 {\n  left: 66.66667%;\n}\n\n.col-xs-push-9 {\n  left: 75%;\n}\n\n.col-xs-push-10 {\n  left: 83.33333%;\n}\n\n.col-xs-push-11 {\n  left: 91.66667%;\n}\n\n.col-xs-push-12 {\n  left: 100%;\n}\n\n.col-xs-offset-0 {\n  margin-left: 0%;\n}\n\n.col-xs-offset-1 {\n  margin-left: 8.33333%;\n}\n\n.col-xs-offset-2 {\n  margin-left: 16.66667%;\n}\n\n.col-xs-offset-3 {\n  margin-left: 25%;\n}\n\n.col-xs-offset-4 {\n  margin-left: 33.33333%;\n}\n\n.col-xs-offset-5 {\n  margin-left: 41.66667%;\n}\n\n.col-xs-offset-6 {\n  margin-left: 50%;\n}\n\n.col-xs-offset-7 {\n  margin-left: 58.33333%;\n}\n\n.col-xs-offset-8 {\n  margin-left: 66.66667%;\n}\n\n.col-xs-offset-9 {\n  margin-left: 75%;\n}\n\n.col-xs-offset-10 {\n  margin-left: 83.33333%;\n}\n\n.col-xs-offset-11 {\n  margin-left: 91.66667%;\n}\n\n.col-xs-offset-12 {\n  margin-left: 100%;\n}\n\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left;\n  }\n\n  .col-sm-1 {\n    width: 8.33333%;\n  }\n\n  .col-sm-2 {\n    width: 16.66667%;\n  }\n\n  .col-sm-3 {\n    width: 25%;\n  }\n\n  .col-sm-4 {\n    width: 33.33333%;\n  }\n\n  .col-sm-5 {\n    width: 41.66667%;\n  }\n\n  .col-sm-6 {\n    width: 50%;\n  }\n\n  .col-sm-7 {\n    width: 58.33333%;\n  }\n\n  .col-sm-8 {\n    width: 66.66667%;\n  }\n\n  .col-sm-9 {\n    width: 75%;\n  }\n\n  .col-sm-10 {\n    width: 83.33333%;\n  }\n\n  .col-sm-11 {\n    width: 91.66667%;\n  }\n\n  .col-sm-12 {\n    width: 100%;\n  }\n\n  .col-sm-pull-0 {\n    right: auto;\n  }\n\n  .col-sm-pull-1 {\n    right: 8.33333%;\n  }\n\n  .col-sm-pull-2 {\n    right: 16.66667%;\n  }\n\n  .col-sm-pull-3 {\n    right: 25%;\n  }\n\n  .col-sm-pull-4 {\n    right: 33.33333%;\n  }\n\n  .col-sm-pull-5 {\n    right: 41.66667%;\n  }\n\n  .col-sm-pull-6 {\n    right: 50%;\n  }\n\n  .col-sm-pull-7 {\n    right: 58.33333%;\n  }\n\n  .col-sm-pull-8 {\n    right: 66.66667%;\n  }\n\n  .col-sm-pull-9 {\n    right: 75%;\n  }\n\n  .col-sm-pull-10 {\n    right: 83.33333%;\n  }\n\n  .col-sm-pull-11 {\n    right: 91.66667%;\n  }\n\n  .col-sm-pull-12 {\n    right: 100%;\n  }\n\n  .col-sm-push-0 {\n    left: auto;\n  }\n\n  .col-sm-push-1 {\n    left: 8.33333%;\n  }\n\n  .col-sm-push-2 {\n    left: 16.66667%;\n  }\n\n  .col-sm-push-3 {\n    left: 25%;\n  }\n\n  .col-sm-push-4 {\n    left: 33.33333%;\n  }\n\n  .col-sm-push-5 {\n    left: 41.66667%;\n  }\n\n  .col-sm-push-6 {\n    left: 50%;\n  }\n\n  .col-sm-push-7 {\n    left: 58.33333%;\n  }\n\n  .col-sm-push-8 {\n    left: 66.66667%;\n  }\n\n  .col-sm-push-9 {\n    left: 75%;\n  }\n\n  .col-sm-push-10 {\n    left: 83.33333%;\n  }\n\n  .col-sm-push-11 {\n    left: 91.66667%;\n  }\n\n  .col-sm-push-12 {\n    left: 100%;\n  }\n\n  .col-sm-offset-0 {\n    margin-left: 0%;\n  }\n\n  .col-sm-offset-1 {\n    margin-left: 8.33333%;\n  }\n\n  .col-sm-offset-2 {\n    margin-left: 16.66667%;\n  }\n\n  .col-sm-offset-3 {\n    margin-left: 25%;\n  }\n\n  .col-sm-offset-4 {\n    margin-left: 33.33333%;\n  }\n\n  .col-sm-offset-5 {\n    margin-left: 41.66667%;\n  }\n\n  .col-sm-offset-6 {\n    margin-left: 50%;\n  }\n\n  .col-sm-offset-7 {\n    margin-left: 58.33333%;\n  }\n\n  .col-sm-offset-8 {\n    margin-left: 66.66667%;\n  }\n\n  .col-sm-offset-9 {\n    margin-left: 75%;\n  }\n\n  .col-sm-offset-10 {\n    margin-left: 83.33333%;\n  }\n\n  .col-sm-offset-11 {\n    margin-left: 91.66667%;\n  }\n\n  .col-sm-offset-12 {\n    margin-left: 100%;\n  }\n}\n@media (min-width: 992px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n    float: left;\n  }\n\n  .col-md-1 {\n    width: 8.33333%;\n  }\n\n  .col-md-2 {\n    width: 16.66667%;\n  }\n\n  .col-md-3 {\n    width: 25%;\n  }\n\n  .col-md-4 {\n    width: 33.33333%;\n  }\n\n  .col-md-5 {\n    width: 41.66667%;\n  }\n\n  .col-md-6 {\n    width: 50%;\n  }\n\n  .col-md-7 {\n    width: 58.33333%;\n  }\n\n  .col-md-8 {\n    width: 66.66667%;\n  }\n\n  .col-md-9 {\n    width: 75%;\n  }\n\n  .col-md-10 {\n    width: 83.33333%;\n  }\n\n  .col-md-11 {\n    width: 91.66667%;\n  }\n\n  .col-md-12 {\n    width: 100%;\n  }\n\n  .col-md-pull-0 {\n    right: auto;\n  }\n\n  .col-md-pull-1 {\n    right: 8.33333%;\n  }\n\n  .col-md-pull-2 {\n    right: 16.66667%;\n  }\n\n  .col-md-pull-3 {\n    right: 25%;\n  }\n\n  .col-md-pull-4 {\n    right: 33.33333%;\n  }\n\n  .col-md-pull-5 {\n    right: 41.66667%;\n  }\n\n  .col-md-pull-6 {\n    right: 50%;\n  }\n\n  .col-md-pull-7 {\n    right: 58.33333%;\n  }\n\n  .col-md-pull-8 {\n    right: 66.66667%;\n  }\n\n  .col-md-pull-9 {\n    right: 75%;\n  }\n\n  .col-md-pull-10 {\n    right: 83.33333%;\n  }\n\n  .col-md-pull-11 {\n    right: 91.66667%;\n  }\n\n  .col-md-pull-12 {\n    right: 100%;\n  }\n\n  .col-md-push-0 {\n    left: auto;\n  }\n\n  .col-md-push-1 {\n    left: 8.33333%;\n  }\n\n  .col-md-push-2 {\n    left: 16.66667%;\n  }\n\n  .col-md-push-3 {\n    left: 25%;\n  }\n\n  .col-md-push-4 {\n    left: 33.33333%;\n  }\n\n  .col-md-push-5 {\n    left: 41.66667%;\n  }\n\n  .col-md-push-6 {\n    left: 50%;\n  }\n\n  .col-md-push-7 {\n    left: 58.33333%;\n  }\n\n  .col-md-push-8 {\n    left: 66.66667%;\n  }\n\n  .col-md-push-9 {\n    left: 75%;\n  }\n\n  .col-md-push-10 {\n    left: 83.33333%;\n  }\n\n  .col-md-push-11 {\n    left: 91.66667%;\n  }\n\n  .col-md-push-12 {\n    left: 100%;\n  }\n\n  .col-md-offset-0 {\n    margin-left: 0%;\n  }\n\n  .col-md-offset-1 {\n    margin-left: 8.33333%;\n  }\n\n  .col-md-offset-2 {\n    margin-left: 16.66667%;\n  }\n\n  .col-md-offset-3 {\n    margin-left: 25%;\n  }\n\n  .col-md-offset-4 {\n    margin-left: 33.33333%;\n  }\n\n  .col-md-offset-5 {\n    margin-left: 41.66667%;\n  }\n\n  .col-md-offset-6 {\n    margin-left: 50%;\n  }\n\n  .col-md-offset-7 {\n    margin-left: 58.33333%;\n  }\n\n  .col-md-offset-8 {\n    margin-left: 66.66667%;\n  }\n\n  .col-md-offset-9 {\n    margin-left: 75%;\n  }\n\n  .col-md-offset-10 {\n    margin-left: 83.33333%;\n  }\n\n  .col-md-offset-11 {\n    margin-left: 91.66667%;\n  }\n\n  .col-md-offset-12 {\n    margin-left: 100%;\n  }\n}\n@media (min-width: 1200px) {\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\n    float: left;\n  }\n\n  .col-lg-1 {\n    width: 8.33333%;\n  }\n\n  .col-lg-2 {\n    width: 16.66667%;\n  }\n\n  .col-lg-3 {\n    width: 25%;\n  }\n\n  .col-lg-4 {\n    width: 33.33333%;\n  }\n\n  .col-lg-5 {\n    width: 41.66667%;\n  }\n\n  .col-lg-6 {\n    width: 50%;\n  }\n\n  .col-lg-7 {\n    width: 58.33333%;\n  }\n\n  .col-lg-8 {\n    width: 66.66667%;\n  }\n\n  .col-lg-9 {\n    width: 75%;\n  }\n\n  .col-lg-10 {\n    width: 83.33333%;\n  }\n\n  .col-lg-11 {\n    width: 91.66667%;\n  }\n\n  .col-lg-12 {\n    width: 100%;\n  }\n\n  .col-lg-pull-0 {\n    right: auto;\n  }\n\n  .col-lg-pull-1 {\n    right: 8.33333%;\n  }\n\n  .col-lg-pull-2 {\n    right: 16.66667%;\n  }\n\n  .col-lg-pull-3 {\n    right: 25%;\n  }\n\n  .col-lg-pull-4 {\n    right: 33.33333%;\n  }\n\n  .col-lg-pull-5 {\n    right: 41.66667%;\n  }\n\n  .col-lg-pull-6 {\n    right: 50%;\n  }\n\n  .col-lg-pull-7 {\n    right: 58.33333%;\n  }\n\n  .col-lg-pull-8 {\n    right: 66.66667%;\n  }\n\n  .col-lg-pull-9 {\n    right: 75%;\n  }\n\n  .col-lg-pull-10 {\n    right: 83.33333%;\n  }\n\n  .col-lg-pull-11 {\n    right: 91.66667%;\n  }\n\n  .col-lg-pull-12 {\n    right: 100%;\n  }\n\n  .col-lg-push-0 {\n    left: auto;\n  }\n\n  .col-lg-push-1 {\n    left: 8.33333%;\n  }\n\n  .col-lg-push-2 {\n    left: 16.66667%;\n  }\n\n  .col-lg-push-3 {\n    left: 25%;\n  }\n\n  .col-lg-push-4 {\n    left: 33.33333%;\n  }\n\n  .col-lg-push-5 {\n    left: 41.66667%;\n  }\n\n  .col-lg-push-6 {\n    left: 50%;\n  }\n\n  .col-lg-push-7 {\n    left: 58.33333%;\n  }\n\n  .col-lg-push-8 {\n    left: 66.66667%;\n  }\n\n  .col-lg-push-9 {\n    left: 75%;\n  }\n\n  .col-lg-push-10 {\n    left: 83.33333%;\n  }\n\n  .col-lg-push-11 {\n    left: 91.66667%;\n  }\n\n  .col-lg-push-12 {\n    left: 100%;\n  }\n\n  .col-lg-offset-0 {\n    margin-left: 0%;\n  }\n\n  .col-lg-offset-1 {\n    margin-left: 8.33333%;\n  }\n\n  .col-lg-offset-2 {\n    margin-left: 16.66667%;\n  }\n\n  .col-lg-offset-3 {\n    margin-left: 25%;\n  }\n\n  .col-lg-offset-4 {\n    margin-left: 33.33333%;\n  }\n\n  .col-lg-offset-5 {\n    margin-left: 41.66667%;\n  }\n\n  .col-lg-offset-6 {\n    margin-left: 50%;\n  }\n\n  .col-lg-offset-7 {\n    margin-left: 58.33333%;\n  }\n\n  .col-lg-offset-8 {\n    margin-left: 66.66667%;\n  }\n\n  .col-lg-offset-9 {\n    margin-left: 75%;\n  }\n\n  .col-lg-offset-10 {\n    margin-left: 83.33333%;\n  }\n\n  .col-lg-offset-11 {\n    margin-left: 91.66667%;\n  }\n\n  .col-lg-offset-12 {\n    margin-left: 100%;\n  }\n}\ntable {\n  background-color: transparent;\n}\n\nth {\n  text-align: left;\n}\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 20px;\n}\n.table > thead > tr > th,\n.table > thead > tr > td,\n.table > tbody > tr > th,\n.table > tbody > tr > td,\n.table > tfoot > tr > th,\n.table > tfoot > tr > td {\n  padding: 8px;\n  line-height: 1.42857;\n  vertical-align: top;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n.table > thead > tr > th {\n  vertical-align: bottom;\n  border-bottom: 2px solid rgba(255, 255, 255, 0.1);\n}\n.table > caption + thead > tr:first-child > th,\n.table > caption + thead > tr:first-child > td,\n.table > colgroup + thead > tr:first-child > th,\n.table > colgroup + thead > tr:first-child > td,\n.table > thead:first-child > tr:first-child > th,\n.table > thead:first-child > tr:first-child > td {\n  border-top: 0;\n}\n.table > tbody + tbody {\n  border-top: 2px solid rgba(255, 255, 255, 0.1);\n}\n.table .table {\n  background-color: #101010;\n}\n\n.table-condensed > thead > tr > th,\n.table-condensed > thead > tr > td,\n.table-condensed > tbody > tr > th,\n.table-condensed > tbody > tr > td,\n.table-condensed > tfoot > tr > th,\n.table-condensed > tfoot > tr > td {\n  padding: 5px;\n}\n\n.table-bordered {\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.table-bordered > thead > tr > th,\n.table-bordered > thead > tr > td,\n.table-bordered > tbody > tr > th,\n.table-bordered > tbody > tr > td,\n.table-bordered > tfoot > tr > th,\n.table-bordered > tfoot > tr > td {\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.table-bordered > thead > tr > th,\n.table-bordered > thead > tr > td {\n  border-bottom-width: 2px;\n}\n\n.table-striped > tbody > tr:nth-child(odd) > td,\n.table-striped > tbody > tr:nth-child(odd) > th {\n  background-color: rgba(0, 0, 0, 0.18);\n}\n\n.table-hover > tbody > tr:hover > td,\n.table-hover > tbody > tr:hover > th {\n  background-color: rgba(0, 0, 0, 0.25);\n}\n\ntable col[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-column;\n}\n\ntable td[class*=\"col-\"],\ntable th[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-cell;\n}\n\n.table > thead > tr > td.active,\n.table > thead > tr > th.active, .table > thead > tr.active > td, .table > thead > tr.active > th,\n.table > tbody > tr > td.active,\n.table > tbody > tr > th.active,\n.table > tbody > tr.active > td,\n.table > tbody > tr.active > th,\n.table > tfoot > tr > td.active,\n.table > tfoot > tr > th.active,\n.table > tfoot > tr.active > td,\n.table > tfoot > tr.active > th {\n  background-color: rgba(0, 0, 0, 0.25);\n}\n\n.table-hover > tbody > tr > td.active:hover,\n.table-hover > tbody > tr > th.active:hover, .table-hover > tbody > tr.active:hover > td, .table-hover > tbody > tr:hover > .active, .table-hover > tbody > tr.active:hover > th {\n  background-color: rgba(0, 0, 0, 0.25);\n}\n\n.table > thead > tr > td.success,\n.table > thead > tr > th.success, .table > thead > tr.success > td, .table > thead > tr.success > th,\n.table > tbody > tr > td.success,\n.table > tbody > tr > th.success,\n.table > tbody > tr.success > td,\n.table > tbody > tr.success > th,\n.table > tfoot > tr > td.success,\n.table > tfoot > tr > th.success,\n.table > tfoot > tr.success > td,\n.table > tfoot > tr.success > th {\n  background-color: #dff0d8;\n}\n\n.table-hover > tbody > tr > td.success:hover,\n.table-hover > tbody > tr > th.success:hover, .table-hover > tbody > tr.success:hover > td, .table-hover > tbody > tr:hover > .success, .table-hover > tbody > tr.success:hover > th {\n  background-color: #d0e9c6;\n}\n\n.table > thead > tr > td.info,\n.table > thead > tr > th.info, .table > thead > tr.info > td, .table > thead > tr.info > th,\n.table > tbody > tr > td.info,\n.table > tbody > tr > th.info,\n.table > tbody > tr.info > td,\n.table > tbody > tr.info > th,\n.table > tfoot > tr > td.info,\n.table > tfoot > tr > th.info,\n.table > tfoot > tr.info > td,\n.table > tfoot > tr.info > th {\n  background-color: #d9edf7;\n}\n\n.table-hover > tbody > tr > td.info:hover,\n.table-hover > tbody > tr > th.info:hover, .table-hover > tbody > tr.info:hover > td, .table-hover > tbody > tr:hover > .info, .table-hover > tbody > tr.info:hover > th {\n  background-color: #c4e3f3;\n}\n\n.table > thead > tr > td.warning,\n.table > thead > tr > th.warning, .table > thead > tr.warning > td, .table > thead > tr.warning > th,\n.table > tbody > tr > td.warning,\n.table > tbody > tr > th.warning,\n.table > tbody > tr.warning > td,\n.table > tbody > tr.warning > th,\n.table > tfoot > tr > td.warning,\n.table > tfoot > tr > th.warning,\n.table > tfoot > tr.warning > td,\n.table > tfoot > tr.warning > th {\n  background-color: #fcf8e3;\n}\n\n.table-hover > tbody > tr > td.warning:hover,\n.table-hover > tbody > tr > th.warning:hover, .table-hover > tbody > tr.warning:hover > td, .table-hover > tbody > tr:hover > .warning, .table-hover > tbody > tr.warning:hover > th {\n  background-color: #faf2cc;\n}\n\n.table > thead > tr > td.danger,\n.table > thead > tr > th.danger, .table > thead > tr.danger > td, .table > thead > tr.danger > th,\n.table > tbody > tr > td.danger,\n.table > tbody > tr > th.danger,\n.table > tbody > tr.danger > td,\n.table > tbody > tr.danger > th,\n.table > tfoot > tr > td.danger,\n.table > tfoot > tr > th.danger,\n.table > tfoot > tr.danger > td,\n.table > tfoot > tr.danger > th {\n  background-color: #f2dede;\n}\n\n.table-hover > tbody > tr > td.danger:hover,\n.table-hover > tbody > tr > th.danger:hover, .table-hover > tbody > tr.danger:hover > td, .table-hover > tbody > tr:hover > .danger, .table-hover > tbody > tr.danger:hover > th {\n  background-color: #ebcccc;\n}\n\n@media screen and (max-width: 767px) {\n  .table-responsive {\n    width: 100%;\n    margin-bottom: 15px;\n    overflow-y: hidden;\n    overflow-x: auto;\n    -ms-overflow-style: -ms-autohiding-scrollbar;\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    -webkit-overflow-scrolling: touch;\n  }\n  .table-responsive > .table {\n    margin-bottom: 0;\n  }\n  .table-responsive > .table > thead > tr > th,\n  .table-responsive > .table > thead > tr > td,\n  .table-responsive > .table > tbody > tr > th,\n  .table-responsive > .table > tbody > tr > td,\n  .table-responsive > .table > tfoot > tr > th,\n  .table-responsive > .table > tfoot > tr > td {\n    white-space: nowrap;\n  }\n  .table-responsive > .table-bordered {\n    border: 0;\n  }\n  .table-responsive > .table-bordered > thead > tr > th:first-child,\n  .table-responsive > .table-bordered > thead > tr > td:first-child,\n  .table-responsive > .table-bordered > tbody > tr > th:first-child,\n  .table-responsive > .table-bordered > tbody > tr > td:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n    border-left: 0;\n  }\n  .table-responsive > .table-bordered > thead > tr > th:last-child,\n  .table-responsive > .table-bordered > thead > tr > td:last-child,\n  .table-responsive > .table-bordered > tbody > tr > th:last-child,\n  .table-responsive > .table-bordered > tbody > tr > td:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n    border-right: 0;\n  }\n  .table-responsive > .table-bordered > tbody > tr:last-child > th,\n  .table-responsive > .table-bordered > tbody > tr:last-child > td,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > th,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > td {\n    border-bottom: 0;\n  }\n}\n\nfieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  min-width: 0;\n}\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: inherit;\n  color: #333333;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5;\n}\n\nlabel {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: bold;\n}\n\ninput[type=\"search\"] {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  line-height: normal;\n}\n\ninput[type=\"file\"] {\n  display: block;\n}\n\ninput[type=\"range\"] {\n  display: block;\n  width: 100%;\n}\n\nselect[multiple],\nselect[size] {\n  height: auto;\n}\n\ninput[type=\"file\"]:focus,\ninput[type=\"radio\"]:focus,\ninput[type=\"checkbox\"]:focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n\noutput {\n  display: block;\n  padding-top: 7px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #555555;\n}\n\n.form-control {\n  display: block;\n  width: 100%;\n  height: 34px;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #555555;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n.form-control:focus {\n  border-color: #555;\n  outline: 0;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(85, 85, 85, 0.6);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(85, 85, 85, 0.6);\n}\n.form-control::-moz-placeholder {\n  color: #777777;\n  opacity: 1;\n}\n.form-control:-ms-input-placeholder {\n  color: #777777;\n}\n.form-control::-webkit-input-placeholder {\n  color: #777777;\n}\n.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {\n  cursor: not-allowed;\n  background-color: #eeeeee;\n  opacity: 1;\n}\n\ntextarea.form-control {\n  height: auto;\n}\n\ninput[type=\"search\"] {\n  -webkit-appearance: none;\n}\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  line-height: 34px;\n  line-height: 1.42857 \\0;\n}\ninput[type=\"date\"].input-sm, .form-horizontal .form-group-sm input[type=\"date\"].form-control, .input-group-sm > input[type=\"date\"].form-control,\n.input-group-sm > input[type=\"date\"].input-group-addon,\n.input-group-sm > .input-group-btn > input[type=\"date\"].btn,\n.input-group-sm > .input-group-btn > input[type=\"date\"].sh-btn,\ninput[type=\"time\"].input-sm,\n.form-horizontal .form-group-sm input[type=\"time\"].form-control,\n.input-group-sm > input[type=\"time\"].form-control,\n.input-group-sm > input[type=\"time\"].input-group-addon,\n.input-group-sm > .input-group-btn > input[type=\"time\"].btn,\n.input-group-sm > .input-group-btn > input[type=\"time\"].sh-btn,\ninput[type=\"datetime-local\"].input-sm,\n.form-horizontal .form-group-sm input[type=\"datetime-local\"].form-control,\n.input-group-sm > input[type=\"datetime-local\"].form-control,\n.input-group-sm > input[type=\"datetime-local\"].input-group-addon,\n.input-group-sm > .input-group-btn > input[type=\"datetime-local\"].btn,\n.input-group-sm > .input-group-btn > input[type=\"datetime-local\"].sh-btn,\ninput[type=\"month\"].input-sm,\n.form-horizontal .form-group-sm input[type=\"month\"].form-control,\n.input-group-sm > input[type=\"month\"].form-control,\n.input-group-sm > input[type=\"month\"].input-group-addon,\n.input-group-sm > .input-group-btn > input[type=\"month\"].btn,\n.input-group-sm > .input-group-btn > input[type=\"month\"].sh-btn {\n  line-height: 30px;\n}\ninput[type=\"date\"].input-lg, .form-horizontal .form-group-lg input[type=\"date\"].form-control, .input-group-lg > input[type=\"date\"].form-control,\n.input-group-lg > input[type=\"date\"].input-group-addon,\n.input-group-lg > .input-group-btn > input[type=\"date\"].btn,\n.input-group-lg > .input-group-btn > input[type=\"date\"].sh-btn,\ninput[type=\"time\"].input-lg,\n.form-horizontal .form-group-lg input[type=\"time\"].form-control,\n.input-group-lg > input[type=\"time\"].form-control,\n.input-group-lg > input[type=\"time\"].input-group-addon,\n.input-group-lg > .input-group-btn > input[type=\"time\"].btn,\n.input-group-lg > .input-group-btn > input[type=\"time\"].sh-btn,\ninput[type=\"datetime-local\"].input-lg,\n.form-horizontal .form-group-lg input[type=\"datetime-local\"].form-control,\n.input-group-lg > input[type=\"datetime-local\"].form-control,\n.input-group-lg > input[type=\"datetime-local\"].input-group-addon,\n.input-group-lg > .input-group-btn > input[type=\"datetime-local\"].btn,\n.input-group-lg > .input-group-btn > input[type=\"datetime-local\"].sh-btn,\ninput[type=\"month\"].input-lg,\n.form-horizontal .form-group-lg input[type=\"month\"].form-control,\n.input-group-lg > input[type=\"month\"].form-control,\n.input-group-lg > input[type=\"month\"].input-group-addon,\n.input-group-lg > .input-group-btn > input[type=\"month\"].btn,\n.input-group-lg > .input-group-btn > input[type=\"month\"].sh-btn {\n  line-height: 46px;\n}\n\n.form-group {\n  margin-bottom: 15px;\n}\n\n.radio,\n.checkbox {\n  position: relative;\n  display: block;\n  min-height: 20px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.radio label,\n.checkbox label {\n  padding-left: 20px;\n  margin-bottom: 0;\n  font-weight: normal;\n  cursor: pointer;\n}\n\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  position: absolute;\n  margin-left: -20px;\n  margin-top: 4px \\9;\n}\n\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -5px;\n}\n\n.radio-inline,\n.checkbox-inline {\n  display: inline-block;\n  padding-left: 20px;\n  margin-bottom: 0;\n  vertical-align: middle;\n  font-weight: normal;\n  cursor: pointer;\n}\n\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: 10px;\n}\n\ninput[type=\"radio\"][disabled], input[type=\"radio\"].disabled, fieldset[disabled] input[type=\"radio\"],\ninput[type=\"checkbox\"][disabled],\ninput[type=\"checkbox\"].disabled, fieldset[disabled]\ninput[type=\"checkbox\"] {\n  cursor: not-allowed;\n}\n\n.radio-inline.disabled, fieldset[disabled] .radio-inline,\n.checkbox-inline.disabled, fieldset[disabled]\n.checkbox-inline {\n  cursor: not-allowed;\n}\n\n.radio.disabled label, fieldset[disabled] .radio label,\n.checkbox.disabled label, fieldset[disabled]\n.checkbox label {\n  cursor: not-allowed;\n}\n\n.form-control-static {\n  padding-top: 7px;\n  padding-bottom: 7px;\n  margin-bottom: 0;\n}\n.form-control-static.input-lg, .form-horizontal .form-group-lg .form-control-static.form-control, .input-group-lg > .form-control-static.form-control,\n.input-group-lg > .form-control-static.input-group-addon,\n.input-group-lg > .input-group-btn > .form-control-static.btn,\n.input-group-lg > .input-group-btn > .form-control-static.sh-btn, .form-control-static.input-sm, .form-horizontal .form-group-sm .form-control-static.form-control, .input-group-sm > .form-control-static.form-control,\n.input-group-sm > .form-control-static.input-group-addon,\n.input-group-sm > .input-group-btn > .form-control-static.btn,\n.input-group-sm > .input-group-btn > .form-control-static.sh-btn {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.input-sm, .form-horizontal .form-group-sm .form-control, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn,\n.input-group-sm > .input-group-btn > .sh-btn {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n\nselect.input-sm, .form-horizontal .form-group-sm select.form-control, .input-group-sm > select.form-control,\n.input-group-sm > select.input-group-addon,\n.input-group-sm > .input-group-btn > select.btn,\n.input-group-sm > .input-group-btn > select.sh-btn {\n  height: 30px;\n  line-height: 30px;\n}\n\ntextarea.input-sm, .form-horizontal .form-group-sm textarea.form-control, .input-group-sm > textarea.form-control,\n.input-group-sm > textarea.input-group-addon,\n.input-group-sm > .input-group-btn > textarea.btn,\n.input-group-sm > .input-group-btn > textarea.sh-btn,\nselect[multiple].input-sm,\n.form-horizontal .form-group-sm select[multiple].form-control,\n.input-group-sm > select[multiple].form-control,\n.input-group-sm > select[multiple].input-group-addon,\n.input-group-sm > .input-group-btn > select[multiple].btn,\n.input-group-sm > .input-group-btn > select[multiple].sh-btn {\n  height: auto;\n}\n\n.input-lg, .form-horizontal .form-group-lg .form-control, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn,\n.input-group-lg > .input-group-btn > .sh-btn {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33;\n  border-radius: 6px;\n}\n\nselect.input-lg, .form-horizontal .form-group-lg select.form-control, .input-group-lg > select.form-control,\n.input-group-lg > select.input-group-addon,\n.input-group-lg > .input-group-btn > select.btn,\n.input-group-lg > .input-group-btn > select.sh-btn {\n  height: 46px;\n  line-height: 46px;\n}\n\ntextarea.input-lg, .form-horizontal .form-group-lg textarea.form-control, .input-group-lg > textarea.form-control,\n.input-group-lg > textarea.input-group-addon,\n.input-group-lg > .input-group-btn > textarea.btn,\n.input-group-lg > .input-group-btn > textarea.sh-btn,\nselect[multiple].input-lg,\n.form-horizontal .form-group-lg select[multiple].form-control,\n.input-group-lg > select[multiple].form-control,\n.input-group-lg > select[multiple].input-group-addon,\n.input-group-lg > .input-group-btn > select[multiple].btn,\n.input-group-lg > .input-group-btn > select[multiple].sh-btn {\n  height: auto;\n}\n\n.has-feedback {\n  position: relative;\n}\n.has-feedback .form-control {\n  padding-right: 42.5px;\n}\n\n.form-control-feedback {\n  position: absolute;\n  top: 25px;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n}\n\n.input-lg + .form-control-feedback, .form-horizontal .form-group-lg .form-control + .form-control-feedback, .input-group-lg > .form-control + .form-control-feedback,\n.input-group-lg > .input-group-addon + .form-control-feedback,\n.input-group-lg > .input-group-btn > .btn + .form-control-feedback,\n.input-group-lg > .input-group-btn > .sh-btn + .form-control-feedback {\n  width: 46px;\n  height: 46px;\n  line-height: 46px;\n}\n\n.input-sm + .form-control-feedback, .form-horizontal .form-group-sm .form-control + .form-control-feedback, .input-group-sm > .form-control + .form-control-feedback,\n.input-group-sm > .input-group-addon + .form-control-feedback,\n.input-group-sm > .input-group-btn > .btn + .form-control-feedback,\n.input-group-sm > .input-group-btn > .sh-btn + .form-control-feedback {\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n}\n\n.has-success .help-block,\n.has-success .control-label,\n.has-success .radio,\n.has-success .checkbox,\n.has-success .radio-inline,\n.has-success .checkbox-inline {\n  color: #3c763d;\n}\n.has-success .form-control {\n  border-color: #3c763d;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-success .form-control:focus {\n  border-color: #2b542c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n}\n.has-success .input-group-addon {\n  color: #3c763d;\n  border-color: #3c763d;\n  background-color: #dff0d8;\n}\n.has-success .form-control-feedback {\n  color: #3c763d;\n}\n\n.has-warning .help-block,\n.has-warning .control-label,\n.has-warning .radio,\n.has-warning .checkbox,\n.has-warning .radio-inline,\n.has-warning .checkbox-inline {\n  color: #8a6d3b;\n}\n.has-warning .form-control {\n  border-color: #8a6d3b;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-warning .form-control:focus {\n  border-color: #66512c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n}\n.has-warning .input-group-addon {\n  color: #8a6d3b;\n  border-color: #8a6d3b;\n  background-color: #fcf8e3;\n}\n.has-warning .form-control-feedback {\n  color: #8a6d3b;\n}\n\n.has-error .help-block,\n.has-error .control-label,\n.has-error .radio,\n.has-error .checkbox,\n.has-error .radio-inline,\n.has-error .checkbox-inline {\n  color: #a94442;\n}\n.has-error .form-control {\n  border-color: #a94442;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-error .form-control:focus {\n  border-color: #843534;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n}\n.has-error .input-group-addon {\n  color: #a94442;\n  border-color: #a94442;\n  background-color: #f2dede;\n}\n.has-error .form-control-feedback {\n  color: #a94442;\n}\n\n.has-feedback label.sr-only ~ .form-control-feedback {\n  top: 0;\n}\n\n.help-block {\n  display: block;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  color: white;\n}\n\n@media (min-width: 768px) {\n  .form-inline .form-group, .navbar-form .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .form-control, .navbar-form .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .form-inline .input-group, .navbar-form .input-group {\n    display: inline-table;\n    vertical-align: middle;\n  }\n  .form-inline .input-group .input-group-addon, .navbar-form .input-group .input-group-addon,\n  .form-inline .input-group .input-group-btn,\n  .navbar-form .input-group .input-group-btn,\n  .form-inline .input-group .form-control,\n  .navbar-form .input-group .form-control {\n    width: auto;\n  }\n  .form-inline .input-group > .form-control, .navbar-form .input-group > .form-control {\n    width: 100%;\n  }\n  .form-inline .control-label, .navbar-form .control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .radio, .navbar-form .radio,\n  .form-inline .checkbox,\n  .navbar-form .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .radio label, .navbar-form .radio label,\n  .form-inline .checkbox label,\n  .navbar-form .checkbox label {\n    padding-left: 0;\n  }\n  .form-inline .radio input[type=\"radio\"], .navbar-form .radio input[type=\"radio\"],\n  .form-inline .checkbox input[type=\"checkbox\"],\n  .navbar-form .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0;\n  }\n  .form-inline .has-feedback .form-control-feedback, .navbar-form .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n\n.form-horizontal .radio,\n.form-horizontal .checkbox,\n.form-horizontal .radio-inline,\n.form-horizontal .checkbox-inline {\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-top: 7px;\n}\n.form-horizontal .radio,\n.form-horizontal .checkbox {\n  min-height: 27px;\n}\n.form-horizontal .form-group {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n.form-horizontal .form-group:before, .form-horizontal .form-group:after {\n  content: \" \";\n  display: table;\n}\n.form-horizontal .form-group:after {\n  clear: both;\n}\n@media (min-width: 768px) {\n  .form-horizontal .control-label {\n    text-align: right;\n    margin-bottom: 0;\n    padding-top: 7px;\n  }\n}\n.form-horizontal .has-feedback .form-control-feedback {\n  top: 0;\n  right: 15px;\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group-lg .control-label {\n    padding-top: 14.3px;\n  }\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group-sm .control-label {\n    padding-top: 6px;\n  }\n}\n\n.btn, .sh-btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.btn:focus, .sh-btn:focus, .btn:active:focus, .sh-btn:active:focus, .btn.active:focus, .active.sh-btn:focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n.btn:hover, .sh-btn:hover, .btn:focus, .sh-btn:focus {\n  color: #333;\n  text-decoration: none;\n}\n.btn:active, .sh-btn:active, .btn.active, .active.sh-btn {\n  outline: 0;\n  background-image: none;\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n.btn.disabled, .disabled.sh-btn, .btn[disabled], [disabled].sh-btn, fieldset[disabled] .btn, fieldset[disabled] .sh-btn {\n  cursor: not-allowed;\n  pointer-events: none;\n  opacity: 0.65;\n  filter: alpha(opacity=65);\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n\n.btn-default {\n  color: #333;\n  background-color: #fff;\n  border-color: #ccc;\n}\n.btn-default:hover, .btn-default:focus, .btn-default:active, .btn-default.active, .open > .btn-default.dropdown-toggle {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.btn-default:active, .btn-default.active, .open > .btn-default.dropdown-toggle {\n  background-image: none;\n}\n.btn-default.disabled, .btn-default.disabled:hover, .btn-default.disabled:focus, .btn-default.disabled:active, .btn-default.disabled.active, .btn-default[disabled], .btn-default[disabled]:hover, .btn-default[disabled]:focus, .btn-default[disabled]:active, .btn-default[disabled].active, fieldset[disabled] .btn-default, fieldset[disabled] .btn-default:hover, fieldset[disabled] .btn-default:focus, fieldset[disabled] .btn-default:active, fieldset[disabled] .btn-default.active {\n  background-color: #fff;\n  border-color: #ccc;\n}\n.btn-default .badge {\n  color: #fff;\n  background-color: #333;\n}\n\n.btn-primary {\n  color: #fff;\n  background-color: #428bca;\n  border-color: #357ebd;\n}\n.btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open > .btn-primary.dropdown-toggle {\n  color: #fff;\n  background-color: #3071a9;\n  border-color: #285e8e;\n}\n.btn-primary:active, .btn-primary.active, .open > .btn-primary.dropdown-toggle {\n  background-image: none;\n}\n.btn-primary.disabled, .btn-primary.disabled:hover, .btn-primary.disabled:focus, .btn-primary.disabled:active, .btn-primary.disabled.active, .btn-primary[disabled], .btn-primary[disabled]:hover, .btn-primary[disabled]:focus, .btn-primary[disabled]:active, .btn-primary[disabled].active, fieldset[disabled] .btn-primary, fieldset[disabled] .btn-primary:hover, fieldset[disabled] .btn-primary:focus, fieldset[disabled] .btn-primary:active, fieldset[disabled] .btn-primary.active {\n  background-color: #428bca;\n  border-color: #357ebd;\n}\n.btn-primary .badge {\n  color: #428bca;\n  background-color: #fff;\n}\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n}\n.btn-success:hover, .btn-success:focus, .btn-success:active, .btn-success.active, .open > .btn-success.dropdown-toggle {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #398439;\n}\n.btn-success:active, .btn-success.active, .open > .btn-success.dropdown-toggle {\n  background-image: none;\n}\n.btn-success.disabled, .btn-success.disabled:hover, .btn-success.disabled:focus, .btn-success.disabled:active, .btn-success.disabled.active, .btn-success[disabled], .btn-success[disabled]:hover, .btn-success[disabled]:focus, .btn-success[disabled]:active, .btn-success[disabled].active, fieldset[disabled] .btn-success, fieldset[disabled] .btn-success:hover, fieldset[disabled] .btn-success:focus, fieldset[disabled] .btn-success:active, fieldset[disabled] .btn-success.active {\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n}\n.btn-success .badge {\n  color: #5cb85c;\n  background-color: #fff;\n}\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #46b8da;\n}\n.btn-info:hover, .btn-info:focus, .btn-info:active, .btn-info.active, .open > .btn-info.dropdown-toggle {\n  color: #fff;\n  background-color: #31b0d5;\n  border-color: #269abc;\n}\n.btn-info:active, .btn-info.active, .open > .btn-info.dropdown-toggle {\n  background-image: none;\n}\n.btn-info.disabled, .btn-info.disabled:hover, .btn-info.disabled:focus, .btn-info.disabled:active, .btn-info.disabled.active, .btn-info[disabled], .btn-info[disabled]:hover, .btn-info[disabled]:focus, .btn-info[disabled]:active, .btn-info[disabled].active, fieldset[disabled] .btn-info, fieldset[disabled] .btn-info:hover, fieldset[disabled] .btn-info:focus, fieldset[disabled] .btn-info:active, fieldset[disabled] .btn-info.active {\n  background-color: #5bc0de;\n  border-color: #46b8da;\n}\n.btn-info .badge {\n  color: #5bc0de;\n  background-color: #fff;\n}\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #eea236;\n}\n.btn-warning:hover, .btn-warning:focus, .btn-warning:active, .btn-warning.active, .open > .btn-warning.dropdown-toggle {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #d58512;\n}\n.btn-warning:active, .btn-warning.active, .open > .btn-warning.dropdown-toggle {\n  background-image: none;\n}\n.btn-warning.disabled, .btn-warning.disabled:hover, .btn-warning.disabled:focus, .btn-warning.disabled:active, .btn-warning.disabled.active, .btn-warning[disabled], .btn-warning[disabled]:hover, .btn-warning[disabled]:focus, .btn-warning[disabled]:active, .btn-warning[disabled].active, fieldset[disabled] .btn-warning, fieldset[disabled] .btn-warning:hover, fieldset[disabled] .btn-warning:focus, fieldset[disabled] .btn-warning:active, fieldset[disabled] .btn-warning.active {\n  background-color: #f0ad4e;\n  border-color: #eea236;\n}\n.btn-warning .badge {\n  color: #f0ad4e;\n  background-color: #fff;\n}\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d43f3a;\n}\n.btn-danger:hover, .btn-danger:focus, .btn-danger:active, .btn-danger.active, .open > .btn-danger.dropdown-toggle {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #ac2925;\n}\n.btn-danger:active, .btn-danger.active, .open > .btn-danger.dropdown-toggle {\n  background-image: none;\n}\n.btn-danger.disabled, .btn-danger.disabled:hover, .btn-danger.disabled:focus, .btn-danger.disabled:active, .btn-danger.disabled.active, .btn-danger[disabled], .btn-danger[disabled]:hover, .btn-danger[disabled]:focus, .btn-danger[disabled]:active, .btn-danger[disabled].active, fieldset[disabled] .btn-danger, fieldset[disabled] .btn-danger:hover, fieldset[disabled] .btn-danger:focus, fieldset[disabled] .btn-danger:active, fieldset[disabled] .btn-danger.active {\n  background-color: #d9534f;\n  border-color: #d43f3a;\n}\n.btn-danger .badge {\n  color: #d9534f;\n  background-color: #fff;\n}\n\n.btn-link {\n  color: #428bca;\n  font-weight: normal;\n  cursor: pointer;\n  border-radius: 0;\n}\n.btn-link, .btn-link:active, .btn-link[disabled], fieldset[disabled] .btn-link {\n  background-color: transparent;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.btn-link, .btn-link:hover, .btn-link:focus, .btn-link:active {\n  border-color: transparent;\n}\n.btn-link:hover, .btn-link:focus {\n  color: #2a6496;\n  text-decoration: underline;\n  background-color: transparent;\n}\n.btn-link[disabled]:hover, .btn-link[disabled]:focus, fieldset[disabled] .btn-link:hover, fieldset[disabled] .btn-link:focus {\n  color: #777777;\n  text-decoration: none;\n}\n\n.btn-lg, .btn-group-lg > .btn, .btn-group-lg > .sh-btn {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33;\n  border-radius: 6px;\n}\n\n.btn-sm, .btn-group-sm > .btn, .btn-group-sm > .sh-btn {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n\n.btn-xs, .btn-group-xs > .btn, .btn-group-xs > .sh-btn {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n\n.btn-block {\n  display: block;\n  width: 100%;\n}\n\n.btn-block + .btn-block {\n  margin-top: 5px;\n}\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%;\n}\n\n.fade {\n  opacity: 0;\n  -webkit-transition: opacity 0.15s linear;\n  -o-transition: opacity 0.15s linear;\n  transition: opacity 0.15s linear;\n}\n.fade.in {\n  opacity: 1;\n}\n\n.collapse {\n  display: none;\n}\n.collapse.in {\n  display: block;\n}\n\ntr.collapse.in {\n  display: table-row;\n}\n\ntbody.collapse.in {\n  display: table-row-group;\n}\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition: height 0.35s ease;\n  -o-transition: height 0.35s ease;\n  transition: height 0.35s ease;\n}\n\n.caret {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 2px;\n  vertical-align: middle;\n  border-top: 4px solid;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n}\n\n.dropdown {\n  position: relative;\n}\n\n.dropdown-toggle:focus {\n  outline: 0;\n}\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  list-style: none;\n  font-size: 14px;\n  text-align: left;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  background-clip: padding-box;\n}\n.dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.dropdown-menu .divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.dropdown-menu > li > a {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.42857;\n  color: #333333;\n  white-space: nowrap;\n}\n\n.dropdown-menu > li > a:hover, .dropdown-menu > li > a:focus {\n  text-decoration: none;\n  color: #262626;\n  background-color: #f5f5f5;\n}\n\n.dropdown-menu > .active > a, .dropdown-menu > .active > a:hover, .dropdown-menu > .active > a:focus {\n  color: #fff;\n  text-decoration: none;\n  outline: 0;\n  background-color: #428bca;\n}\n\n.dropdown-menu > .disabled > a, .dropdown-menu > .disabled > a:hover, .dropdown-menu > .disabled > a:focus {\n  color: #777777;\n}\n\n.dropdown-menu > .disabled > a:hover, .dropdown-menu > .disabled > a:focus {\n  text-decoration: none;\n  background-color: transparent;\n  background-image: none;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\n  cursor: not-allowed;\n}\n\n.open > .dropdown-menu {\n  display: block;\n}\n.open > a {\n  outline: 0;\n}\n\n.dropdown-menu-right {\n  left: auto;\n  right: 0;\n}\n\n.dropdown-menu-left {\n  left: 0;\n  right: auto;\n}\n\n.dropdown-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: 12px;\n  line-height: 1.42857;\n  color: #777777;\n  white-space: nowrap;\n}\n\n.dropdown-backdrop {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  z-index: 990;\n}\n\n.pull-right > .dropdown-menu {\n  right: 0;\n  left: auto;\n}\n\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  border-top: 0;\n  border-bottom: 4px solid;\n  content: \"\";\n}\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 1px;\n}\n\n@media (min-width: 768px) {\n  .navbar-right .dropdown-menu {\n    right: 0;\n    left: auto;\n  }\n  .navbar-right .dropdown-menu-left {\n    left: 0;\n    right: auto;\n  }\n}\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n}\n.btn-group > .btn, .btn-group > .sh-btn,\n.btn-group-vertical > .btn,\n.btn-group-vertical > .sh-btn {\n  position: relative;\n  float: left;\n}\n.btn-group > .btn:hover, .btn-group > .sh-btn:hover, .btn-group > .btn:focus, .btn-group > .sh-btn:focus, .btn-group > .btn:active, .btn-group > .sh-btn:active, .btn-group > .btn.active, .btn-group > .active.sh-btn,\n.btn-group-vertical > .btn:hover,\n.btn-group-vertical > .sh-btn:hover,\n.btn-group-vertical > .btn:focus,\n.btn-group-vertical > .sh-btn:focus,\n.btn-group-vertical > .btn:active,\n.btn-group-vertical > .sh-btn:active,\n.btn-group-vertical > .btn.active,\n.btn-group-vertical > .active.sh-btn {\n  z-index: 2;\n}\n.btn-group > .btn:focus, .btn-group > .sh-btn:focus,\n.btn-group-vertical > .btn:focus,\n.btn-group-vertical > .sh-btn:focus {\n  outline: 0;\n}\n\n.btn-group .btn + .btn, .btn-group .sh-btn + .btn, .btn-group .btn + .sh-btn, .btn-group .sh-btn + .sh-btn,\n.btn-group .btn + .btn-group,\n.btn-group .sh-btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .sh-btn,\n.btn-group .btn-group + .btn-group {\n  margin-left: -1px;\n}\n\n.btn-toolbar {\n  margin-left: -5px;\n}\n.btn-toolbar:before, .btn-toolbar:after {\n  content: \" \";\n  display: table;\n}\n.btn-toolbar:after {\n  clear: both;\n}\n.btn-toolbar .btn-group,\n.btn-toolbar .input-group {\n  float: left;\n}\n.btn-toolbar > .btn, .btn-toolbar > .sh-btn,\n.btn-toolbar > .btn-group,\n.btn-toolbar > .input-group {\n  margin-left: 5px;\n}\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle), .btn-group > .sh-btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0;\n}\n\n.btn-group > .btn:first-child, .btn-group > .sh-btn:first-child {\n  margin-left: 0;\n}\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle), .btn-group > .sh-btn:first-child:not(:last-child):not(.dropdown-toggle) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.btn-group > .btn:last-child:not(:first-child), .btn-group > .sh-btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.btn-group > .btn-group {\n  float: left;\n}\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn, .btn-group > .btn-group:not(:first-child):not(:last-child) > .sh-btn {\n  border-radius: 0;\n}\n\n.btn-group > .btn-group:first-child > .btn:last-child, .btn-group > .btn-group:first-child > .sh-btn:last-child,\n.btn-group > .btn-group:first-child > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.btn-group > .btn-group:last-child > .btn:first-child, .btn-group > .btn-group:last-child > .sh-btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0;\n}\n\n.btn-group > .btn + .dropdown-toggle, .btn-group > .sh-btn + .dropdown-toggle {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\n.btn-group > .btn-lg + .dropdown-toggle, .btn-group-lg.btn-group > .btn + .dropdown-toggle, .btn-group-lg.btn-group > .sh-btn + .dropdown-toggle {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n\n.btn-group.open .dropdown-toggle {\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n.btn-group.open .dropdown-toggle.btn-link {\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n\n.btn .caret, .sh-btn .caret {\n  margin-left: 0;\n}\n\n.btn-lg .caret, .btn-group-lg > .btn .caret, .btn-group-lg > .sh-btn .caret {\n  border-width: 5px 5px 0;\n  border-bottom-width: 0;\n}\n\n.dropup .btn-lg .caret, .dropup .btn-group-lg > .btn .caret, .dropup .btn-group-lg > .sh-btn .caret {\n  border-width: 0 5px 5px;\n}\n\n.btn-group-vertical > .btn, .btn-group-vertical > .sh-btn,\n.btn-group-vertical > .btn-group,\n.btn-group-vertical > .btn-group > .btn,\n.btn-group-vertical > .btn-group > .sh-btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%;\n}\n.btn-group-vertical > .btn-group:before, .btn-group-vertical > .btn-group:after {\n  content: \" \";\n  display: table;\n}\n.btn-group-vertical > .btn-group:after {\n  clear: both;\n}\n.btn-group-vertical > .btn-group > .btn, .btn-group-vertical > .btn-group > .sh-btn {\n  float: none;\n}\n.btn-group-vertical > .btn + .btn, .btn-group-vertical > .sh-btn + .btn, .btn-group-vertical > .btn + .sh-btn, .btn-group-vertical > .sh-btn + .sh-btn,\n.btn-group-vertical > .btn + .btn-group,\n.btn-group-vertical > .sh-btn + .btn-group,\n.btn-group-vertical > .btn-group + .btn,\n.btn-group-vertical > .btn-group + .sh-btn,\n.btn-group-vertical > .btn-group + .btn-group {\n  margin-top: -1px;\n  margin-left: 0;\n}\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child), .btn-group-vertical > .sh-btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.btn-group-vertical > .btn:first-child:not(:last-child), .btn-group-vertical > .sh-btn:first-child:not(:last-child) {\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical > .btn:last-child:not(:first-child), .btn-group-vertical > .sh-btn:last-child:not(:first-child) {\n  border-bottom-left-radius: 4px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn, .btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .sh-btn {\n  border-radius: 0;\n}\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child, .btn-group-vertical > .btn-group:first-child:not(:last-child) > .sh-btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child, .btn-group-vertical > .btn-group:last-child:not(:first-child) > .sh-btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.btn-group-justified {\n  display: table;\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: separate;\n}\n.btn-group-justified > .btn, .btn-group-justified > .sh-btn,\n.btn-group-justified > .btn-group {\n  float: none;\n  display: table-cell;\n  width: 1%;\n}\n.btn-group-justified > .btn-group .btn, .btn-group-justified > .btn-group .sh-btn {\n  width: 100%;\n}\n.btn-group-justified > .btn-group .dropdown-menu {\n  left: auto;\n}\n\n[data-toggle=\"buttons\"] > .btn > input[type=\"radio\"], [data-toggle=\"buttons\"] > .sh-btn > input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn > input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .sh-btn > input[type=\"checkbox\"] {\n  position: absolute;\n  z-index: -1;\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n\n.input-group {\n  position: relative;\n  display: table;\n  border-collapse: separate;\n}\n.input-group[class*=\"col-\"] {\n  float: none;\n  padding-left: 0;\n  padding-right: 0;\n}\n.input-group .form-control {\n  position: relative;\n  z-index: 2;\n  float: left;\n  width: 100%;\n  margin-bottom: 0;\n}\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell;\n}\n.input-group-addon:not(:first-child):not(:last-child),\n.input-group-btn:not(:first-child):not(:last-child),\n.input-group .form-control:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n\n.input-group-addon {\n  padding: 6px 12px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1;\n  color: #555555;\n  text-align: center;\n  background-color: #eeeeee;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n.input-group-addon.input-sm, .form-horizontal .form-group-sm .input-group-addon.form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .input-group-addon.btn,\n.input-group-sm > .input-group-btn > .input-group-addon.sh-btn {\n  padding: 5px 10px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.input-group-addon.input-lg, .form-horizontal .form-group-lg .input-group-addon.form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .input-group-addon.btn,\n.input-group-lg > .input-group-btn > .input-group-addon.sh-btn {\n  padding: 10px 16px;\n  font-size: 18px;\n  border-radius: 6px;\n}\n.input-group-addon input[type=\"radio\"],\n.input-group-addon input[type=\"checkbox\"] {\n  margin-top: 0;\n}\n\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .sh-btn,\n.input-group-btn:first-child > .btn-group > .btn,\n.input-group-btn:first-child > .btn-group > .sh-btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:last-child > .sh-btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn,\n.input-group-btn:last-child > .btn-group:not(:last-child) > .sh-btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.input-group-addon:first-child {\n  border-right: 0;\n}\n\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .sh-btn,\n.input-group-btn:last-child > .btn-group > .btn,\n.input-group-btn:last-child > .btn-group > .sh-btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child),\n.input-group-btn:first-child > .sh-btn:not(:first-child),\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn,\n.input-group-btn:first-child > .btn-group:not(:first-child) > .sh-btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.input-group-addon:last-child {\n  border-left: 0;\n}\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap;\n}\n.input-group-btn > .btn, .input-group-btn > .sh-btn {\n  position: relative;\n}\n.input-group-btn > .btn + .btn, .input-group-btn > .sh-btn + .btn, .input-group-btn > .btn + .sh-btn, .input-group-btn > .sh-btn + .sh-btn {\n  margin-left: -1px;\n}\n.input-group-btn > .btn:hover, .input-group-btn > .sh-btn:hover, .input-group-btn > .btn:focus, .input-group-btn > .sh-btn:focus, .input-group-btn > .btn:active, .input-group-btn > .sh-btn:active {\n  z-index: 2;\n}\n.input-group-btn:first-child > .btn, .input-group-btn:first-child > .sh-btn,\n.input-group-btn:first-child > .btn-group {\n  margin-right: -1px;\n}\n.input-group-btn:last-child > .btn, .input-group-btn:last-child > .sh-btn,\n.input-group-btn:last-child > .btn-group {\n  margin-left: -1px;\n}\n\n.nav {\n  margin-bottom: 0;\n  padding-left: 0;\n  list-style: none;\n}\n.nav:before, .nav:after {\n  content: \" \";\n  display: table;\n}\n.nav:after {\n  clear: both;\n}\n.nav > li {\n  position: relative;\n  display: block;\n}\n.nav > li > a {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n}\n.nav > li > a:hover, .nav > li > a:focus {\n  text-decoration: none;\n  background-color: #eeeeee;\n}\n.nav > li.disabled > a {\n  color: #777777;\n}\n.nav > li.disabled > a:hover, .nav > li.disabled > a:focus {\n  color: #777777;\n  text-decoration: none;\n  background-color: transparent;\n  cursor: not-allowed;\n}\n.nav .open > a, .nav .open > a:hover, .nav .open > a:focus {\n  background-color: #eeeeee;\n  border-color: #428bca;\n}\n.nav .nav-divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.nav > li > a > img {\n  max-width: none;\n}\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd;\n}\n.nav-tabs > li {\n  float: left;\n  margin-bottom: -1px;\n}\n.nav-tabs > li > a {\n  margin-right: 2px;\n  line-height: 1.42857;\n  border: 1px solid transparent;\n  border-radius: 4px 4px 0 0;\n}\n.nav-tabs > li > a:hover {\n  border-color: #eeeeee #eeeeee #ddd;\n}\n.nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus {\n  color: #555555;\n  background-color: #101010;\n  border: 1px solid #ddd;\n  border-bottom-color: transparent;\n  cursor: default;\n}\n\n.nav-pills > li {\n  float: left;\n}\n.nav-pills > li > a {\n  border-radius: 4px;\n}\n.nav-pills > li + li {\n  margin-left: 2px;\n}\n.nav-pills > li.active > a, .nav-pills > li.active > a:hover, .nav-pills > li.active > a:focus {\n  color: #fff;\n  background-color: #428bca;\n}\n\n.nav-stacked > li {\n  float: none;\n}\n.nav-stacked > li + li {\n  margin-top: 2px;\n  margin-left: 0;\n}\n\n.nav-justified, .nav-tabs.nav-justified {\n  width: 100%;\n}\n.nav-justified > li, .nav-tabs.nav-justified > li {\n  float: none;\n}\n.nav-justified > li > a, .nav-tabs.nav-justified > li > a {\n  text-align: center;\n  margin-bottom: 5px;\n}\n.nav-justified > .dropdown .dropdown-menu {\n  top: auto;\n  left: auto;\n}\n@media (min-width: 768px) {\n  .nav-justified > li, .nav-tabs.nav-justified > li {\n    display: table-cell;\n    width: 1%;\n  }\n  .nav-justified > li > a, .nav-tabs.nav-justified > li > a {\n    margin-bottom: 0;\n  }\n}\n\n.nav-tabs-justified, .nav-tabs.nav-justified {\n  border-bottom: 0;\n}\n.nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {\n  margin-right: 0;\n  border-radius: 4px;\n}\n.nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a,\n.nav-tabs-justified > .active > a:hover,\n.nav-tabs.nav-justified > .active > a:hover,\n.nav-tabs-justified > .active > a:focus,\n.nav-tabs.nav-justified > .active > a:focus {\n  border: 1px solid #ddd;\n}\n@media (min-width: 768px) {\n  .nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {\n    border-bottom: 1px solid #ddd;\n    border-radius: 4px 4px 0 0;\n  }\n  .nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a,\n  .nav-tabs-justified > .active > a:hover,\n  .nav-tabs.nav-justified > .active > a:hover,\n  .nav-tabs-justified > .active > a:focus,\n  .nav-tabs.nav-justified > .active > a:focus {\n    border-bottom-color: #101010;\n  }\n}\n\n.tab-content > .tab-pane {\n  display: none;\n}\n.tab-content > .active {\n  display: block;\n}\n\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.navbar {\n  position: relative;\n  min-height: 50px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n}\n.navbar:before, .navbar:after {\n  content: \" \";\n  display: table;\n}\n.navbar:after {\n  clear: both;\n}\n@media (min-width: 768px) {\n  .navbar {\n    border-radius: 4px;\n  }\n}\n\n.navbar-header:before, .navbar-header:after {\n  content: \" \";\n  display: table;\n}\n.navbar-header:after {\n  clear: both;\n}\n@media (min-width: 768px) {\n  .navbar-header {\n    float: left;\n  }\n}\n\n.navbar-collapse {\n  overflow-x: visible;\n  padding-right: 15px;\n  padding-left: 15px;\n  border-top: 1px solid transparent;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  -webkit-overflow-scrolling: touch;\n}\n.navbar-collapse:before, .navbar-collapse:after {\n  content: \" \";\n  display: table;\n}\n.navbar-collapse:after {\n  clear: both;\n}\n.navbar-collapse.in {\n  overflow-y: auto;\n}\n@media (min-width: 768px) {\n  .navbar-collapse {\n    width: auto;\n    border-top: 0;\n    box-shadow: none;\n  }\n  .navbar-collapse.collapse {\n    display: block !important;\n    height: auto !important;\n    padding-bottom: 0;\n    overflow: visible !important;\n  }\n  .navbar-collapse.in {\n    overflow-y: visible;\n  }\n  .navbar-fixed-top .navbar-collapse, .navbar-static-top .navbar-collapse, .navbar-fixed-bottom .navbar-collapse {\n    padding-left: 0;\n    padding-right: 0;\n  }\n}\n\n.navbar-fixed-top .navbar-collapse,\n.navbar-fixed-bottom .navbar-collapse {\n  max-height: 340px;\n}\n@media (max-width: 480px) and (orientation: landscape) {\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    max-height: 200px;\n  }\n}\n\n.container > .navbar-header,\n.container > .navbar-collapse,\n.container-fluid > .navbar-header,\n.container-fluid > .navbar-collapse {\n  margin-right: -15px;\n  margin-left: -15px;\n}\n@media (min-width: 768px) {\n  .container > .navbar-header,\n  .container > .navbar-collapse,\n  .container-fluid > .navbar-header,\n  .container-fluid > .navbar-collapse {\n    margin-right: 0;\n    margin-left: 0;\n  }\n}\n\n.navbar-static-top {\n  z-index: 1000;\n  border-width: 0 0 1px;\n}\n@media (min-width: 768px) {\n  .navbar-static-top {\n    border-radius: 0;\n  }\n}\n\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n}\n@media (min-width: 768px) {\n  .navbar-fixed-top,\n  .navbar-fixed-bottom {\n    border-radius: 0;\n  }\n}\n\n.navbar-fixed-top {\n  top: 0;\n  border-width: 0 0 1px;\n}\n\n.navbar-fixed-bottom {\n  bottom: 0;\n  margin-bottom: 0;\n  border-width: 1px 0 0;\n}\n\n.navbar-brand {\n  float: left;\n  padding: 15px 15px;\n  font-size: 18px;\n  line-height: 20px;\n  height: 50px;\n}\n.navbar-brand:hover, .navbar-brand:focus {\n  text-decoration: none;\n}\n@media (min-width: 768px) {\n  .navbar > .container .navbar-brand, .navbar > .container-fluid .navbar-brand {\n    margin-left: -15px;\n  }\n}\n\n.navbar-toggle {\n  position: relative;\n  float: right;\n  margin-right: 15px;\n  padding: 9px 10px;\n  margin-top: 8px;\n  margin-bottom: 8px;\n  background-color: transparent;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.navbar-toggle:focus {\n  outline: 0;\n}\n.navbar-toggle .icon-bar {\n  display: block;\n  width: 22px;\n  height: 2px;\n  border-radius: 1px;\n}\n.navbar-toggle .icon-bar + .icon-bar {\n  margin-top: 4px;\n}\n@media (min-width: 768px) {\n  .navbar-toggle {\n    display: none;\n  }\n}\n\n.navbar-nav {\n  margin: 7.5px -15px;\n}\n.navbar-nav > li > a {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  line-height: 20px;\n}\n@media (max-width: 767px) {\n  .navbar-nav .open .dropdown-menu {\n    position: static;\n    float: none;\n    width: auto;\n    margin-top: 0;\n    background-color: transparent;\n    border: 0;\n    box-shadow: none;\n  }\n  .navbar-nav .open .dropdown-menu > li > a,\n  .navbar-nav .open .dropdown-menu .dropdown-header {\n    padding: 5px 15px 5px 25px;\n  }\n  .navbar-nav .open .dropdown-menu > li > a {\n    line-height: 20px;\n  }\n  .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-nav .open .dropdown-menu > li > a:focus {\n    background-image: none;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-nav {\n    float: left;\n    margin: 0;\n  }\n  .navbar-nav > li {\n    float: left;\n  }\n  .navbar-nav > li > a {\n    padding-top: 15px;\n    padding-bottom: 15px;\n  }\n  .navbar-nav.navbar-right:last-child {\n    margin-right: -15px;\n  }\n}\n\n@media (min-width: 768px) {\n  .navbar-left {\n    float: left !important;\n  }\n\n  .navbar-right {\n    float: right !important;\n  }\n}\n.navbar-form {\n  margin-left: -15px;\n  margin-right: -15px;\n  padding: 10px 15px;\n  border-top: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n@media (max-width: 767px) {\n  .navbar-form .form-group {\n    margin-bottom: 5px;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-form {\n    width: auto;\n    border: 0;\n    margin-left: 0;\n    margin-right: 0;\n    padding-top: 0;\n    padding-bottom: 0;\n    -webkit-box-shadow: none;\n    box-shadow: none;\n  }\n  .navbar-form.navbar-right:last-child {\n    margin-right: -15px;\n  }\n}\n\n.navbar-nav > li > .dropdown-menu {\n  margin-top: 0;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.navbar-btn {\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n.navbar-btn.btn-sm, .btn-group-sm > .navbar-btn.btn, .btn-group-sm > .navbar-btn.sh-btn {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.navbar-btn.btn-xs, .btn-group-xs > .navbar-btn.btn, .btn-group-xs > .navbar-btn.sh-btn {\n  margin-top: 14px;\n  margin-bottom: 14px;\n}\n\n.navbar-text {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n@media (min-width: 768px) {\n  .navbar-text {\n    float: left;\n    margin-left: 15px;\n    margin-right: 15px;\n  }\n  .navbar-text.navbar-right:last-child {\n    margin-right: 0;\n  }\n}\n\n.navbar-default {\n  background-color: #f8f8f8;\n  border-color: #e7e7e7;\n}\n.navbar-default .navbar-brand {\n  color: #777;\n}\n.navbar-default .navbar-brand:hover, .navbar-default .navbar-brand:focus {\n  color: #5e5e5e;\n  background-color: transparent;\n}\n.navbar-default .navbar-text {\n  color: #777;\n}\n.navbar-default .navbar-nav > li > a {\n  color: #777;\n}\n.navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus {\n  color: #333;\n  background-color: transparent;\n}\n.navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active > a:hover, .navbar-default .navbar-nav > .active > a:focus {\n  color: #555;\n  background-color: #e7e7e7;\n}\n.navbar-default .navbar-nav > .disabled > a, .navbar-default .navbar-nav > .disabled > a:hover, .navbar-default .navbar-nav > .disabled > a:focus {\n  color: #ccc;\n  background-color: transparent;\n}\n.navbar-default .navbar-toggle {\n  border-color: #ddd;\n}\n.navbar-default .navbar-toggle:hover, .navbar-default .navbar-toggle:focus {\n  background-color: #ddd;\n}\n.navbar-default .navbar-toggle .icon-bar {\n  background-color: #888;\n}\n.navbar-default .navbar-collapse,\n.navbar-default .navbar-form {\n  border-color: #e7e7e7;\n}\n.navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > .open > a:hover, .navbar-default .navbar-nav > .open > a:focus {\n  background-color: #e7e7e7;\n  color: #555;\n}\n@media (max-width: 767px) {\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a {\n    color: #777;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #333;\n    background-color: transparent;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a, .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #555;\n    background-color: #e7e7e7;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a, .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #ccc;\n    background-color: transparent;\n  }\n}\n.navbar-default .navbar-link {\n  color: #777;\n}\n.navbar-default .navbar-link:hover {\n  color: #333;\n}\n.navbar-default .btn-link {\n  color: #777;\n}\n.navbar-default .btn-link:hover, .navbar-default .btn-link:focus {\n  color: #333;\n}\n.navbar-default .btn-link[disabled]:hover, .navbar-default .btn-link[disabled]:focus, fieldset[disabled] .navbar-default .btn-link:hover, fieldset[disabled] .navbar-default .btn-link:focus {\n  color: #ccc;\n}\n\n.navbar-inverse {\n  background-color: #222;\n  border-color: #090909;\n}\n.navbar-inverse .navbar-brand {\n  color: #777777;\n}\n.navbar-inverse .navbar-brand:hover, .navbar-inverse .navbar-brand:focus {\n  color: #fff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-text {\n  color: #777777;\n}\n.navbar-inverse .navbar-nav > li > a {\n  color: #777777;\n}\n.navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {\n  color: #fff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-nav > .active > a, .navbar-inverse .navbar-nav > .active > a:hover, .navbar-inverse .navbar-nav > .active > a:focus {\n  color: #fff;\n  background-color: #090909;\n}\n.navbar-inverse .navbar-nav > .disabled > a, .navbar-inverse .navbar-nav > .disabled > a:hover, .navbar-inverse .navbar-nav > .disabled > a:focus {\n  color: #444;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-toggle {\n  border-color: #333;\n}\n.navbar-inverse .navbar-toggle:hover, .navbar-inverse .navbar-toggle:focus {\n  background-color: #333;\n}\n.navbar-inverse .navbar-toggle .icon-bar {\n  background-color: #fff;\n}\n.navbar-inverse .navbar-collapse,\n.navbar-inverse .navbar-form {\n  border-color: #101010;\n}\n.navbar-inverse .navbar-nav > .open > a, .navbar-inverse .navbar-nav > .open > a:hover, .navbar-inverse .navbar-nav > .open > a:focus {\n  background-color: #090909;\n  color: #fff;\n}\n@media (max-width: 767px) {\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {\n    border-color: #090909;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu .divider {\n    background-color: #090909;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {\n    color: #777777;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #fff;\n    background-color: transparent;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a, .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #fff;\n    background-color: #090909;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a, .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #444;\n    background-color: transparent;\n  }\n}\n.navbar-inverse .navbar-link {\n  color: #777777;\n}\n.navbar-inverse .navbar-link:hover {\n  color: #fff;\n}\n.navbar-inverse .btn-link {\n  color: #777777;\n}\n.navbar-inverse .btn-link:hover, .navbar-inverse .btn-link:focus {\n  color: #fff;\n}\n.navbar-inverse .btn-link[disabled]:hover, .navbar-inverse .btn-link[disabled]:focus, fieldset[disabled] .navbar-inverse .btn-link:hover, fieldset[disabled] .navbar-inverse .btn-link:focus {\n  color: #444;\n}\n\n.breadcrumb {\n  padding: 8px 15px;\n  margin-bottom: 20px;\n  list-style: none;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n}\n.breadcrumb > li {\n  display: inline-block;\n}\n.breadcrumb > li + li:before {\n  content: \"/ \";\n  padding: 0 5px;\n  color: #ccc;\n}\n.breadcrumb > .active {\n  color: #777777;\n}\n\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin: 20px 0;\n  border-radius: 4px;\n}\n.pagination > li {\n  display: inline;\n}\n.pagination > li > a,\n.pagination > li > span {\n  position: relative;\n  float: left;\n  padding: 6px 12px;\n  line-height: 1.42857;\n  text-decoration: none;\n  color: #428bca;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  margin-left: -1px;\n}\n.pagination > li:first-child > a,\n.pagination > li:first-child > span {\n  margin-left: 0;\n  border-bottom-left-radius: 4px;\n  border-top-left-radius: 4px;\n}\n.pagination > li:last-child > a,\n.pagination > li:last-child > span {\n  border-bottom-right-radius: 4px;\n  border-top-right-radius: 4px;\n}\n.pagination > li > a:hover, .pagination > li > a:focus,\n.pagination > li > span:hover,\n.pagination > li > span:focus {\n  color: #2a6496;\n  background-color: #eeeeee;\n  border-color: #ddd;\n}\n.pagination > .active > a, .pagination > .active > a:hover, .pagination > .active > a:focus,\n.pagination > .active > span,\n.pagination > .active > span:hover,\n.pagination > .active > span:focus {\n  z-index: 2;\n  color: #fff;\n  background-color: #428bca;\n  border-color: #428bca;\n  cursor: default;\n}\n.pagination > .disabled > span,\n.pagination > .disabled > span:hover,\n.pagination > .disabled > span:focus,\n.pagination > .disabled > a,\n.pagination > .disabled > a:hover,\n.pagination > .disabled > a:focus {\n  color: #777777;\n  background-color: #fff;\n  border-color: #ddd;\n  cursor: not-allowed;\n}\n\n.pagination-lg > li > a,\n.pagination-lg > li > span {\n  padding: 10px 16px;\n  font-size: 18px;\n}\n.pagination-lg > li:first-child > a,\n.pagination-lg > li:first-child > span {\n  border-bottom-left-radius: 6px;\n  border-top-left-radius: 6px;\n}\n.pagination-lg > li:last-child > a,\n.pagination-lg > li:last-child > span {\n  border-bottom-right-radius: 6px;\n  border-top-right-radius: 6px;\n}\n\n.pagination-sm > li > a,\n.pagination-sm > li > span {\n  padding: 5px 10px;\n  font-size: 12px;\n}\n.pagination-sm > li:first-child > a,\n.pagination-sm > li:first-child > span {\n  border-bottom-left-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.pagination-sm > li:last-child > a,\n.pagination-sm > li:last-child > span {\n  border-bottom-right-radius: 3px;\n  border-top-right-radius: 3px;\n}\n\n.pager {\n  padding-left: 0;\n  margin: 20px 0;\n  list-style: none;\n  text-align: center;\n}\n.pager:before, .pager:after {\n  content: \" \";\n  display: table;\n}\n.pager:after {\n  clear: both;\n}\n.pager li {\n  display: inline;\n}\n.pager li > a,\n.pager li > span {\n  display: inline-block;\n  padding: 5px 14px;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 15px;\n}\n.pager li > a:hover,\n.pager li > a:focus {\n  text-decoration: none;\n  background-color: #eeeeee;\n}\n.pager .next > a,\n.pager .next > span {\n  float: right;\n}\n.pager .previous > a,\n.pager .previous > span {\n  float: left;\n}\n.pager .disabled > a,\n.pager .disabled > a:hover,\n.pager .disabled > a:focus,\n.pager .disabled > span {\n  color: #777777;\n  background-color: #fff;\n  cursor: not-allowed;\n}\n\n.label {\n  display: inline;\n  padding: .2em .6em .3em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: .25em;\n}\n.label:empty {\n  display: none;\n}\n.btn .label, .sh-btn .label {\n  position: relative;\n  top: -1px;\n}\n\na.label:hover, a.label:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.label-default {\n  background-color: #777777;\n}\n.label-default[href]:hover, .label-default[href]:focus {\n  background-color: #5e5e5e;\n}\n\n.label-primary {\n  background-color: #428bca;\n}\n.label-primary[href]:hover, .label-primary[href]:focus {\n  background-color: #3071a9;\n}\n\n.label-success {\n  background-color: #5cb85c;\n}\n.label-success[href]:hover, .label-success[href]:focus {\n  background-color: #449d44;\n}\n\n.label-info {\n  background-color: #5bc0de;\n}\n.label-info[href]:hover, .label-info[href]:focus {\n  background-color: #31b0d5;\n}\n\n.label-warning {\n  background-color: #f0ad4e;\n}\n.label-warning[href]:hover, .label-warning[href]:focus {\n  background-color: #ec971f;\n}\n\n.label-danger {\n  background-color: #d9534f;\n}\n.label-danger[href]:hover, .label-danger[href]:focus {\n  background-color: #c9302c;\n}\n\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 12px;\n  font-weight: bold;\n  color: #fff;\n  line-height: 1;\n  vertical-align: baseline;\n  white-space: nowrap;\n  text-align: center;\n  background-color: #777777;\n  border-radius: 10px;\n}\n.badge:empty {\n  display: none;\n}\n.btn .badge, .sh-btn .badge {\n  position: relative;\n  top: -1px;\n}\n.btn-xs .badge, .btn-group-xs > .btn .badge, .btn-group-xs > .sh-btn .badge {\n  top: 0;\n  padding: 1px 5px;\n}\na.list-group-item.active > .badge, .nav-pills > .active > a > .badge {\n  color: #428bca;\n  background-color: #fff;\n}\n.nav-pills > li > a > .badge {\n  margin-left: 3px;\n}\n\na.badge:hover, a.badge:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.jumbotron {\n  padding: 30px;\n  margin-bottom: 30px;\n  color: inherit;\n  background-color: #eeeeee;\n}\n.jumbotron h1,\n.jumbotron .h1 {\n  color: inherit;\n}\n.jumbotron p {\n  margin-bottom: 15px;\n  font-size: 21px;\n  font-weight: 200;\n}\n.jumbotron > hr {\n  border-top-color: #d5d5d5;\n}\n.container .jumbotron {\n  border-radius: 6px;\n}\n.jumbotron .container {\n  max-width: 100%;\n}\n@media screen and (min-width: 768px) {\n  .jumbotron {\n    padding-top: 48px;\n    padding-bottom: 48px;\n  }\n  .container .jumbotron {\n    padding-left: 60px;\n    padding-right: 60px;\n  }\n  .jumbotron h1,\n  .jumbotron .h1 {\n    font-size: 63px;\n  }\n}\n\n.thumbnail {\n  display: block;\n  padding: 4px;\n  margin-bottom: 20px;\n  line-height: 1.42857;\n  background-color: #101010;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n}\n.thumbnail > img,\n.thumbnail a > img {\n  display: block;\n  width: 100% \\9;\n  max-width: 100%;\n  height: auto;\n  margin-left: auto;\n  margin-right: auto;\n}\n.thumbnail .caption {\n  padding: 9px;\n  color: #eeeeee;\n}\n\na.thumbnail:hover,\na.thumbnail:focus,\na.thumbnail.active {\n  border-color: #428bca;\n}\n\n.alert {\n  padding: 15px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.alert h4 {\n  margin-top: 0;\n  color: inherit;\n}\n.alert .alert-link {\n  font-weight: bold;\n}\n.alert > p,\n.alert > ul {\n  margin-bottom: 0;\n}\n.alert > p + p {\n  margin-top: 5px;\n}\n\n.alert-dismissable,\n.alert-dismissible {\n  padding-right: 35px;\n}\n.alert-dismissable .close,\n.alert-dismissible .close {\n  position: relative;\n  top: -2px;\n  right: -21px;\n  color: inherit;\n}\n\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n  color: #3c763d;\n}\n.alert-success hr {\n  border-top-color: #c9e2b3;\n}\n.alert-success .alert-link {\n  color: #2b542c;\n}\n\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n  color: #31708f;\n}\n.alert-info hr {\n  border-top-color: #a6e1ec;\n}\n.alert-info .alert-link {\n  color: #245269;\n}\n\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n  color: #8a6d3b;\n}\n.alert-warning hr {\n  border-top-color: #f7e1b5;\n}\n.alert-warning .alert-link {\n  color: #66512c;\n}\n\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebccd1;\n  color: #a94442;\n}\n.alert-danger hr {\n  border-top-color: #e4b9c0;\n}\n.alert-danger .alert-link {\n  color: #843534;\n}\n\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n.progress {\n  overflow: hidden;\n  height: 20px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n\n.progress-bar {\n  float: left;\n  width: 0%;\n  height: 100%;\n  font-size: 12px;\n  line-height: 20px;\n  color: #fff;\n  text-align: center;\n  background-color: #428bca;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  -webkit-transition: width 0.6s ease;\n  -o-transition: width 0.6s ease;\n  transition: width 0.6s ease;\n}\n\n.progress-striped .progress-bar,\n.progress-bar-striped {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0));\n  background-size: 40px 40px;\n}\n\n.progress.active .progress-bar,\n.progress-bar.active {\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\n  -o-animation: progress-bar-stripes 2s linear infinite;\n  animation: progress-bar-stripes 2s linear infinite;\n}\n\n.progress-bar[aria-valuenow=\"1\"], .progress-bar[aria-valuenow=\"2\"] {\n  min-width: 30px;\n}\n.progress-bar[aria-valuenow=\"0\"] {\n  color: #777777;\n  min-width: 30px;\n  background-color: transparent;\n  background-image: none;\n  box-shadow: none;\n}\n\n.progress-bar-success {\n  background-color: #5cb85c;\n}\n.progress-striped .progress-bar-success {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0));\n}\n\n.progress-bar-info {\n  background-color: #5bc0de;\n}\n.progress-striped .progress-bar-info {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0));\n}\n\n.progress-bar-warning {\n  background-color: #f0ad4e;\n}\n.progress-striped .progress-bar-warning {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0));\n}\n\n.progress-bar-danger {\n  background-color: #d9534f;\n}\n.progress-striped .progress-bar-danger {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0));\n}\n\n.media,\n.media-body {\n  overflow: hidden;\n  zoom: 1;\n}\n\n.media,\n.media .media {\n  margin-top: 15px;\n}\n\n.media:first-child {\n  margin-top: 0;\n}\n\n.media-object {\n  display: block;\n}\n\n.media-heading {\n  margin: 0 0 5px;\n}\n\n.media > .pull-left {\n  margin-right: 10px;\n}\n.media > .pull-right {\n  margin-left: 10px;\n}\n\n.media-list {\n  padding-left: 0;\n  list-style: none;\n}\n\n.list-group {\n  margin-bottom: 20px;\n  padding-left: 0;\n}\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid #ddd;\n}\n.list-group-item:first-child {\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n}\n.list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.list-group-item > .badge {\n  float: right;\n}\n.list-group-item > .badge + .badge {\n  margin-right: 5px;\n}\n\na.list-group-item {\n  color: #555;\n}\na.list-group-item .list-group-item-heading {\n  color: #333;\n}\na.list-group-item:hover, a.list-group-item:focus {\n  text-decoration: none;\n  color: #555;\n  background-color: #f5f5f5;\n}\n\n.list-group-item.disabled, .list-group-item.disabled:hover, .list-group-item.disabled:focus {\n  background-color: #eeeeee;\n  color: #777777;\n}\n.list-group-item.disabled .list-group-item-heading, .list-group-item.disabled:hover .list-group-item-heading, .list-group-item.disabled:focus .list-group-item-heading {\n  color: inherit;\n}\n.list-group-item.disabled .list-group-item-text, .list-group-item.disabled:hover .list-group-item-text, .list-group-item.disabled:focus .list-group-item-text {\n  color: #777777;\n}\n.list-group-item.active, .list-group-item.active:hover, .list-group-item.active:focus {\n  z-index: 2;\n  color: #fff;\n  background-color: #428bca;\n  border-color: #428bca;\n}\n.list-group-item.active .list-group-item-heading,\n.list-group-item.active .list-group-item-heading > small,\n.list-group-item.active .list-group-item-heading > .small, .list-group-item.active:hover .list-group-item-heading,\n.list-group-item.active:hover .list-group-item-heading > small,\n.list-group-item.active:hover .list-group-item-heading > .small, .list-group-item.active:focus .list-group-item-heading,\n.list-group-item.active:focus .list-group-item-heading > small,\n.list-group-item.active:focus .list-group-item-heading > .small {\n  color: inherit;\n}\n.list-group-item.active .list-group-item-text, .list-group-item.active:hover .list-group-item-text, .list-group-item.active:focus .list-group-item-text {\n  color: #e1edf7;\n}\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8;\n}\n\na.list-group-item-success {\n  color: #3c763d;\n}\na.list-group-item-success .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-success:hover, a.list-group-item-success:focus {\n  color: #3c763d;\n  background-color: #d0e9c6;\n}\na.list-group-item-success.active, a.list-group-item-success.active:hover, a.list-group-item-success.active:focus {\n  color: #fff;\n  background-color: #3c763d;\n  border-color: #3c763d;\n}\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7;\n}\n\na.list-group-item-info {\n  color: #31708f;\n}\na.list-group-item-info .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-info:hover, a.list-group-item-info:focus {\n  color: #31708f;\n  background-color: #c4e3f3;\n}\na.list-group-item-info.active, a.list-group-item-info.active:hover, a.list-group-item-info.active:focus {\n  color: #fff;\n  background-color: #31708f;\n  border-color: #31708f;\n}\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n}\n\na.list-group-item-warning {\n  color: #8a6d3b;\n}\na.list-group-item-warning .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-warning:hover, a.list-group-item-warning:focus {\n  color: #8a6d3b;\n  background-color: #faf2cc;\n}\na.list-group-item-warning.active, a.list-group-item-warning.active:hover, a.list-group-item-warning.active:focus {\n  color: #fff;\n  background-color: #8a6d3b;\n  border-color: #8a6d3b;\n}\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede;\n}\n\na.list-group-item-danger {\n  color: #a94442;\n}\na.list-group-item-danger .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-danger:hover, a.list-group-item-danger:focus {\n  color: #a94442;\n  background-color: #ebcccc;\n}\na.list-group-item-danger.active, a.list-group-item-danger.active:hover, a.list-group-item-danger.active:focus {\n  color: #fff;\n  background-color: #a94442;\n  border-color: #a94442;\n}\n\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3;\n}\n\n.panel {\n  margin-bottom: 20px;\n  background-color: #fff;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n\n.panel-body {\n  padding: 15px;\n}\n.panel-body:before, .panel-body:after {\n  content: \" \";\n  display: table;\n}\n.panel-body:after {\n  clear: both;\n}\n\n.panel-heading {\n  padding: 10px 15px;\n  border-bottom: 1px solid transparent;\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.panel-heading > .dropdown .dropdown-toggle {\n  color: inherit;\n}\n\n.panel-title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 16px;\n  color: inherit;\n}\n.panel-title > a {\n  color: inherit;\n}\n\n.panel-footer {\n  padding: 10px 15px;\n  background-color: #f5f5f5;\n  border-top: 1px solid #ddd;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n\n.panel > .list-group {\n  margin-bottom: 0;\n}\n.panel > .list-group .list-group-item {\n  border-width: 1px 0;\n  border-radius: 0;\n}\n.panel > .list-group:first-child .list-group-item:first-child {\n  border-top: 0;\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.panel > .list-group:last-child .list-group-item:last-child {\n  border-bottom: 0;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n\n.panel-heading + .list-group .list-group-item:first-child {\n  border-top-width: 0;\n}\n\n.list-group + .panel-footer {\n  border-top-width: 0;\n}\n\n.panel > .table,\n.panel > .table-responsive > .table,\n.panel > .panel-collapse > .table {\n  margin-bottom: 0;\n}\n.panel > .table:first-child,\n.panel > .table-responsive:first-child > .table:first-child {\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {\n  border-top-left-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {\n  border-top-right-radius: 3px;\n}\n.panel > .table:last-child,\n.panel > .table-responsive:last-child > .table:last-child {\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {\n  border-bottom-right-radius: 3px;\n}\n.panel > .panel-body + .table,\n.panel > .panel-body + .table-responsive {\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n.panel > .table > tbody:first-child > tr:first-child th,\n.panel > .table > tbody:first-child > tr:first-child td {\n  border-top: 0;\n}\n.panel > .table-bordered,\n.panel > .table-responsive > .table-bordered {\n  border: 0;\n}\n.panel > .table-bordered > thead > tr > th:first-child,\n.panel > .table-bordered > thead > tr > td:first-child,\n.panel > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-bordered > tfoot > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n  border-left: 0;\n}\n.panel > .table-bordered > thead > tr > th:last-child,\n.panel > .table-bordered > thead > tr > td:last-child,\n.panel > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-bordered > tfoot > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n  border-right: 0;\n}\n.panel > .table-bordered > thead > tr:first-child > td,\n.panel > .table-bordered > thead > tr:first-child > th,\n.panel > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-bordered > tbody > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {\n  border-bottom: 0;\n}\n.panel > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-bordered > tfoot > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {\n  border-bottom: 0;\n}\n.panel > .table-responsive {\n  border: 0;\n  margin-bottom: 0;\n}\n\n.panel-group {\n  margin-bottom: 20px;\n}\n.panel-group .panel {\n  margin-bottom: 0;\n  border-radius: 4px;\n}\n.panel-group .panel + .panel {\n  margin-top: 5px;\n}\n.panel-group .panel-heading {\n  border-bottom: 0;\n}\n.panel-group .panel-heading + .panel-collapse > .panel-body {\n  border-top: 1px solid #ddd;\n}\n.panel-group .panel-footer {\n  border-top: 0;\n}\n.panel-group .panel-footer + .panel-collapse .panel-body {\n  border-bottom: 1px solid #ddd;\n}\n\n.panel-default {\n  border-color: #ddd;\n}\n.panel-default > .panel-heading {\n  color: #333333;\n  background-color: #f5f5f5;\n  border-color: #ddd;\n}\n.panel-default > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #ddd;\n}\n.panel-default > .panel-heading .badge {\n  color: #f5f5f5;\n  background-color: #333333;\n}\n.panel-default > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #ddd;\n}\n\n.panel-primary {\n  border-color: #428bca;\n}\n.panel-primary > .panel-heading {\n  color: #fff;\n  background-color: #428bca;\n  border-color: #428bca;\n}\n.panel-primary > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #428bca;\n}\n.panel-primary > .panel-heading .badge {\n  color: #428bca;\n  background-color: #fff;\n}\n.panel-primary > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #428bca;\n}\n\n.panel-success {\n  border-color: #d6e9c6;\n}\n.panel-success > .panel-heading {\n  color: #3c763d;\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n}\n.panel-success > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #d6e9c6;\n}\n.panel-success > .panel-heading .badge {\n  color: #dff0d8;\n  background-color: #3c763d;\n}\n.panel-success > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #d6e9c6;\n}\n\n.panel-info {\n  border-color: #bce8f1;\n}\n.panel-info > .panel-heading {\n  color: #31708f;\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n}\n.panel-info > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #bce8f1;\n}\n.panel-info > .panel-heading .badge {\n  color: #d9edf7;\n  background-color: #31708f;\n}\n.panel-info > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #bce8f1;\n}\n\n.panel-warning {\n  border-color: #faebcc;\n}\n.panel-warning > .panel-heading {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n}\n.panel-warning > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #faebcc;\n}\n.panel-warning > .panel-heading .badge {\n  color: #fcf8e3;\n  background-color: #8a6d3b;\n}\n.panel-warning > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #faebcc;\n}\n\n.panel-danger {\n  border-color: #ebccd1;\n}\n.panel-danger > .panel-heading {\n  color: #a94442;\n  background-color: #f2dede;\n  border-color: #ebccd1;\n}\n.panel-danger > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #ebccd1;\n}\n.panel-danger > .panel-heading .badge {\n  color: #f2dede;\n  background-color: #a94442;\n}\n.panel-danger > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #ebccd1;\n}\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  height: 0;\n  padding: 0;\n  overflow: hidden;\n}\n.embed-responsive .embed-responsive-item,\n.embed-responsive iframe,\n.embed-responsive embed,\n.embed-responsive object {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  height: 100%;\n  width: 100%;\n  border: 0;\n}\n.embed-responsive.embed-responsive-16by9 {\n  padding-bottom: 56.25%;\n}\n.embed-responsive.embed-responsive-4by3 {\n  padding-bottom: 75%;\n}\n\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n.well blockquote {\n  border-color: #ddd;\n  border-color: rgba(0, 0, 0, 0.15);\n}\n\n.well-lg {\n  padding: 24px;\n  border-radius: 6px;\n}\n\n.well-sm {\n  padding: 9px;\n  border-radius: 3px;\n}\n\n.close {\n  float: right;\n  font-size: 21px;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: 0.2;\n  filter: alpha(opacity=20);\n}\n.close:hover, .close:focus {\n  color: #000;\n  text-decoration: none;\n  cursor: pointer;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none;\n}\n\n.modal-open {\n  overflow: hidden;\n}\n\n.modal {\n  display: none;\n  overflow: hidden;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  -webkit-overflow-scrolling: touch;\n  outline: 0;\n}\n.modal.fade .modal-dialog {\n  -webkit-transform: translate3d(0, -25%, 0);\n  transform: translate3d(0, -25%, 0);\n  -webkit-transition: -webkit-transform 0.3s ease-out;\n  -moz-transition: -moz-transform 0.3s ease-out;\n  -o-transition: -o-transform 0.3s ease-out;\n  transition: transform 0.3s ease-out;\n}\n.modal.in .modal-dialog {\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n}\n\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px;\n}\n\n.modal-content {\n  position: relative;\n  background-color: #fff;\n  border: 1px solid #999;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  background-clip: padding-box;\n  outline: 0;\n}\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000;\n}\n.modal-backdrop.fade {\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n.modal-backdrop.in {\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\n\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n  min-height: 16.42857px;\n}\n\n.modal-header .close {\n  margin-top: -2px;\n}\n\n.modal-title {\n  margin: 0;\n  line-height: 1.42857;\n}\n\n.modal-body {\n  position: relative;\n  padding: 15px;\n}\n\n.modal-footer {\n  padding: 15px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5;\n}\n.modal-footer:before, .modal-footer:after {\n  content: \" \";\n  display: table;\n}\n.modal-footer:after {\n  clear: both;\n}\n.modal-footer .btn + .btn, .modal-footer .sh-btn + .btn, .modal-footer .btn + .sh-btn, .modal-footer .sh-btn + .sh-btn {\n  margin-left: 5px;\n  margin-bottom: 0;\n}\n.modal-footer .btn-group .btn + .btn, .modal-footer .btn-group .sh-btn + .btn, .modal-footer .btn-group .btn + .sh-btn, .modal-footer .btn-group .sh-btn + .sh-btn {\n  margin-left: -1px;\n}\n.modal-footer .btn-block + .btn-block {\n  margin-left: 0;\n}\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll;\n}\n\n@media (min-width: 768px) {\n  .modal-dialog {\n    width: 600px;\n    margin: 30px auto;\n  }\n\n  .modal-content {\n    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n  }\n\n  .modal-sm {\n    width: 300px;\n  }\n}\n@media (min-width: 992px) {\n  .modal-lg {\n    width: 900px;\n  }\n}\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  visibility: visible;\n  font-size: 12px;\n  line-height: 1.4;\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n.tooltip.in {\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n}\n.tooltip.top {\n  margin-top: -3px;\n  padding: 5px 0;\n}\n.tooltip.right {\n  margin-left: 3px;\n  padding: 0 5px;\n}\n.tooltip.bottom {\n  margin-top: 3px;\n  padding: 5px 0;\n}\n.tooltip.left {\n  margin-left: -3px;\n  padding: 0 5px;\n}\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  background-color: #000;\n  border-radius: 4px;\n}\n\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n\n.tooltip.top .tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.top-left .tooltip-arrow {\n  bottom: 0;\n  left: 5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.top-right .tooltip-arrow {\n  bottom: 0;\n  right: 5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.right .tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-width: 5px 5px 5px 0;\n  border-right-color: #000;\n}\n.tooltip.left .tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-width: 5px 0 5px 5px;\n  border-left-color: #000;\n}\n.tooltip.bottom .tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.tooltip.bottom-left .tooltip-arrow {\n  top: 0;\n  left: 5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.tooltip.bottom-right .tooltip-arrow {\n  top: 0;\n  right: 5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: none;\n  max-width: 276px;\n  padding: 1px;\n  text-align: left;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  white-space: normal;\n}\n.popover.top {\n  margin-top: -10px;\n}\n.popover.right {\n  margin-left: 10px;\n}\n.popover.bottom {\n  margin-top: 10px;\n}\n.popover.left {\n  margin-left: -10px;\n}\n\n.popover-title {\n  margin: 0;\n  padding: 8px 14px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 18px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-radius: 5px 5px 0 0;\n}\n\n.popover-content {\n  padding: 9px 14px;\n}\n\n.popover > .arrow, .popover > .arrow:after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n\n.popover > .arrow {\n  border-width: 11px;\n}\n\n.popover > .arrow:after {\n  border-width: 10px;\n  content: \"\";\n}\n\n.popover.top > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-bottom-width: 0;\n  border-top-color: #999999;\n  border-top-color: rgba(0, 0, 0, 0.25);\n  bottom: -11px;\n}\n.popover.top > .arrow:after {\n  content: \" \";\n  bottom: 1px;\n  margin-left: -10px;\n  border-bottom-width: 0;\n  border-top-color: #fff;\n}\n.popover.right > .arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -11px;\n  border-left-width: 0;\n  border-right-color: #999999;\n  border-right-color: rgba(0, 0, 0, 0.25);\n}\n.popover.right > .arrow:after {\n  content: \" \";\n  left: 1px;\n  bottom: -10px;\n  border-left-width: 0;\n  border-right-color: #fff;\n}\n.popover.bottom > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-top-width: 0;\n  border-bottom-color: #999999;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n  top: -11px;\n}\n.popover.bottom > .arrow:after {\n  content: \" \";\n  top: 1px;\n  margin-left: -10px;\n  border-top-width: 0;\n  border-bottom-color: #fff;\n}\n.popover.left > .arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -11px;\n  border-right-width: 0;\n  border-left-color: #999999;\n  border-left-color: rgba(0, 0, 0, 0.25);\n}\n.popover.left > .arrow:after {\n  content: \" \";\n  right: 1px;\n  border-right-width: 0;\n  border-left-color: #fff;\n  bottom: -10px;\n}\n\n.carousel {\n  position: relative;\n}\n\n.carousel-inner {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n}\n.carousel-inner > .item {\n  display: none;\n  position: relative;\n  -webkit-transition: 0.6s ease-in-out left;\n  -o-transition: 0.6s ease-in-out left;\n  transition: 0.6s ease-in-out left;\n}\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  display: block;\n  width: 100% \\9;\n  max-width: 100%;\n  height: auto;\n  line-height: 1;\n}\n.carousel-inner > .active,\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  display: block;\n}\n.carousel-inner > .active {\n  left: 0;\n}\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n.carousel-inner > .next {\n  left: 100%;\n}\n.carousel-inner > .prev {\n  left: -100%;\n}\n.carousel-inner > .next.left,\n.carousel-inner > .prev.right {\n  left: 0;\n}\n.carousel-inner > .active.left {\n  left: -100%;\n}\n.carousel-inner > .active.right {\n  left: 100%;\n}\n\n.carousel-control {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 15%;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  font-size: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n}\n.carousel-control.left {\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);\n}\n.carousel-control.right {\n  left: auto;\n  right: 0;\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);\n}\n.carousel-control:hover, .carousel-control:focus {\n  outline: 0;\n  color: #fff;\n  text-decoration: none;\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n}\n.carousel-control .icon-prev,\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-left,\n.carousel-control .glyphicon-chevron-right {\n  position: absolute;\n  top: 50%;\n  z-index: 5;\n  display: inline-block;\n}\n.carousel-control .icon-prev,\n.carousel-control .glyphicon-chevron-left {\n  left: 50%;\n  margin-left: -10px;\n}\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-right {\n  right: 50%;\n  margin-right: -10px;\n}\n.carousel-control .icon-prev,\n.carousel-control .icon-next {\n  width: 20px;\n  height: 20px;\n  margin-top: -10px;\n  font-family: serif;\n}\n.carousel-control .icon-prev:before {\n  content: '\\2039';\n}\n.carousel-control .icon-next:before {\n  content: '\\203a';\n}\n\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 60%;\n  margin-left: -30%;\n  padding-left: 0;\n  list-style: none;\n  text-align: center;\n}\n.carousel-indicators li {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin: 1px;\n  text-indent: -999px;\n  border: 1px solid #fff;\n  border-radius: 10px;\n  cursor: pointer;\n  background-color: #000 \\9;\n  background-color: transparent;\n}\n.carousel-indicators .active {\n  margin: 0;\n  width: 12px;\n  height: 12px;\n  background-color: #fff;\n}\n\n.carousel-caption {\n  position: absolute;\n  left: 15%;\n  right: 15%;\n  bottom: 20px;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n}\n.carousel-caption .btn, .carousel-caption .sh-btn {\n  text-shadow: none;\n}\n\n@media screen and (min-width: 768px) {\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -15px;\n    font-size: 30px;\n  }\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .icon-prev {\n    margin-left: -15px;\n  }\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-next {\n    margin-right: -15px;\n  }\n\n  .carousel-caption {\n    left: 20%;\n    right: 20%;\n    padding-bottom: 30px;\n  }\n\n  .carousel-indicators {\n    bottom: 20px;\n  }\n}\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after {\n  clear: both;\n}\n\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.pull-right {\n  float: right !important;\n}\n\n.pull-left {\n  float: left !important;\n}\n\n.hide {\n  display: none !important;\n}\n\n.show {\n  display: block !important;\n}\n\n.invisible {\n  visibility: hidden;\n}\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n\n.hidden {\n  display: none !important;\n  visibility: hidden !important;\n}\n\n.affix {\n  position: fixed;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n}\n\n@-ms-viewport {\n  width: device-width;\n}\n.visible-xs, .visible-sm, .visible-md, .visible-lg {\n  display: none !important;\n}\n\n.visible-xs-block,\n.visible-xs-inline,\n.visible-xs-inline-block,\n.visible-sm-block,\n.visible-sm-inline,\n.visible-sm-inline-block,\n.visible-md-block,\n.visible-md-inline,\n.visible-md-inline-block,\n.visible-lg-block,\n.visible-lg-inline,\n.visible-lg-inline-block {\n  display: none !important;\n}\n\n@media (max-width: 767px) {\n  .visible-xs {\n    display: block !important;\n  }\n\n  table.visible-xs {\n    display: table;\n  }\n\n  tr.visible-xs {\n    display: table-row !important;\n  }\n\n  th.visible-xs,\n  td.visible-xs {\n    display: table-cell !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-block {\n    display: block !important;\n  }\n}\n\n@media (max-width: 767px) {\n  .visible-xs-inline {\n    display: inline !important;\n  }\n}\n\n@media (max-width: 767px) {\n  .visible-xs-inline-block {\n    display: inline-block !important;\n  }\n}\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: block !important;\n  }\n\n  table.visible-sm {\n    display: table;\n  }\n\n  tr.visible-sm {\n    display: table-row !important;\n  }\n\n  th.visible-sm,\n  td.visible-sm {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-block {\n    display: block !important;\n  }\n}\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline {\n    display: inline !important;\n  }\n}\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline-block {\n    display: inline-block !important;\n  }\n}\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md {\n    display: block !important;\n  }\n\n  table.visible-md {\n    display: table;\n  }\n\n  tr.visible-md {\n    display: table-row !important;\n  }\n\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-block {\n    display: block !important;\n  }\n}\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline {\n    display: inline !important;\n  }\n}\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline-block {\n    display: inline-block !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .visible-lg {\n    display: block !important;\n  }\n\n  table.visible-lg {\n    display: table;\n  }\n\n  tr.visible-lg {\n    display: table-row !important;\n  }\n\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-block {\n    display: block !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .visible-lg-inline {\n    display: inline !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .visible-lg-inline-block {\n    display: inline-block !important;\n  }\n}\n\n@media (max-width: 767px) {\n  .hidden-xs {\n    display: none !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .hidden-sm {\n    display: none !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .hidden-md {\n    display: none !important;\n  }\n}\n@media (min-width: 1200px) {\n  .hidden-lg {\n    display: none !important;\n  }\n}\n.visible-print {\n  display: none !important;\n}\n\n@media print {\n  .visible-print {\n    display: block !important;\n  }\n\n  table.visible-print {\n    display: table;\n  }\n\n  tr.visible-print {\n    display: table-row !important;\n  }\n\n  th.visible-print,\n  td.visible-print {\n    display: table-cell !important;\n  }\n}\n.visible-print-block {\n  display: none !important;\n}\n@media print {\n  .visible-print-block {\n    display: block !important;\n  }\n}\n\n.visible-print-inline {\n  display: none !important;\n}\n@media print {\n  .visible-print-inline {\n    display: inline !important;\n  }\n}\n\n.visible-print-inline-block {\n  display: none !important;\n}\n@media print {\n  .visible-print-inline-block {\n    display: inline-block !important;\n  }\n}\n\n@media print {\n  .hidden-print {\n    display: none !important;\n  }\n}\n/* ------------------------------------------- */\n/* Mixins\n/* ------------------------------------------- */\n/* ------------------------------------------- */\n/* Toggle Fade  \n/* ------------------------------------------- */\n.toggle {\n  -webkit-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n  -webkit-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n}\n.toggle.ng-enter {\n  opacity: 0;\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n}\n.toggle.ng-enter-active {\n  opacity: 1;\n}\n.toggle.ng-leave {\n  opacity: 1;\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n}\n.toggle.ng-leave-active {\n  opacity: 0;\n}\n.toggle.ng-hide-add {\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.toggle.ng-hide-add.ng-hide-add-active {\n  opacity: 0;\n}\n.toggle.ng-hide-remove {\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  display: block !important;\n  opacity: 0;\n}\n.toggle.ng-hide-remove.ng-hide-remove-active {\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Slide Top \n/* ------------------------------------------- */\n.slide-top {\n  -webkit-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n  -webkit-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n}\n.slide-top.ng-enter {\n  transform: translateY(60px);\n  -ms-transform: translateY(60px);\n  -webkit-transform: translateY(60px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 0;\n}\n.slide-top.ng-enter-active {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  opacity: 1;\n}\n.slide-top.ng-leave {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.slide-top.ng-leave-active {\n  transform: translateY(60px);\n  -ms-transform: translateY(60px);\n  -webkit-transform: translateY(60px);\n  opacity: 0;\n}\n.slide-top.ng-hide-add {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.slide-top.ng-hide-add.ng-hide-add-active {\n  transform: translateY(60px);\n  -ms-transform: translateY(60px);\n  -webkit-transform: translateY(60px);\n  opacity: 0;\n}\n.slide-top.ng-hide-remove {\n  transform: translateY(60px);\n  -ms-transform: translateY(60px);\n  -webkit-transform: translateY(60px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  display: block !important;\n  opacity: 0;\n}\n.slide-top.ng-hide-remove.ng-hide-remove-active {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Slide Rigth \n/* ------------------------------------------- */\n.slide-right {\n  -webkit-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n  -webkit-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n}\n.slide-right.ng-enter {\n  transform: translateX(60px);\n  -ms-transform: translateX(60px);\n  -webkit-transform: translateX(60px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 0;\n}\n.slide-right.ng-enter-active {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  opacity: 1;\n}\n.slide-right.ng-leave {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.slide-right.ng-leave-active {\n  transform: translateX(60px);\n  -ms-transform: translateX(60px);\n  -webkit-transform: translateX(60px);\n  opacity: 0;\n}\n.slide-right.ng-hide-add {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.slide-right.ng-hide-add.ng-hide-add-active {\n  transform: translateX(60px);\n  -ms-transform: translateX(60px);\n  -webkit-transform: translateX(60px);\n  opacity: 0;\n}\n.slide-right.ng-hide-remove {\n  transform: translateX(60px);\n  -ms-transform: translateX(60px);\n  -webkit-transform: translateX(60px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  display: block !important;\n  opacity: 0;\n}\n.slide-right.ng-hide-remove.ng-hide-remove-active {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Slide Left \n/* ------------------------------------------- */\n.slide-left {\n  -webkit-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n  -webkit-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n}\n.slide-left.ng-enter {\n  transform: translateX(-60px);\n  -ms-transform: translateX(-60px);\n  -webkit-transform: translateX(-60px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 0;\n}\n.slide-left.ng-enter-active {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  opacity: 1;\n}\n.slide-left.ng-leave {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.slide-left.ng-leave-active {\n  transform: translateX(-60px);\n  -ms-transform: translateX(-60px);\n  -webkit-transform: translateX(-60px);\n  opacity: 0;\n}\n.slide-left.ng-hide-add {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.slide-left.ng-hide-add.ng-hide-add-active {\n  transform: translateX(-60px);\n  -ms-transform: translateX(-60px);\n  -webkit-transform: translateX(-60px);\n  opacity: 0;\n}\n.slide-left.ng-hide-remove {\n  transform: translateX(-60px);\n  -ms-transform: translateX(-60px);\n  -webkit-transform: translateX(-60px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  display: block !important;\n  opacity: 0;\n}\n.slide-left.ng-hide-remove.ng-hide-remove-active {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Slide Down\n/* ------------------------------------------- */\n.slide-down {\n  -webkit-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n  -webkit-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n}\n.slide-down.ng-enter {\n  transform: translateY(-60px);\n  -ms-transform: translateY(-60px);\n  -webkit-transform: translateY(-60px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 0;\n}\n.slide-down.ng-enter-active {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  opacity: 1;\n}\n.slide-down.ng-leave {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.slide-down.ng-leave-active {\n  transform: translateY(-60px);\n  -ms-transform: translateY(-60px);\n  -webkit-transform: translateY(-60px);\n  opacity: 0;\n}\n.slide-down.ng-hide-add {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.slide-down.ng-hide-add.ng-hide-add-active {\n  transform: translateY(-60px);\n  -ms-transform: translateY(-60px);\n  -webkit-transform: translateY(-60px);\n  opacity: 0;\n}\n.slide-down.ng-hide-remove {\n  transform: translateY(-60px);\n  -ms-transform: translateY(-60px);\n  -webkit-transform: translateY(-60px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  display: block !important;\n  opacity: 0;\n}\n.slide-down.ng-hide-remove.ng-hide-remove-active {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Bouncy Slide Top \n/* ------------------------------------------- */\n.bouncy-slide-top {\n  -webkit-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1);\n  /* older webkit */\n  -webkit-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -moz-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -ms-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -o-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  /* easeOutBack */\n  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1);\n  /* older webkit */\n  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -moz-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -ms-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -o-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  /* custom */\n}\n.bouncy-slide-top.ng-enter {\n  transform: translateY(240px);\n  -ms-transform: translateY(240px);\n  -webkit-transform: translateY(240px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 0;\n}\n.bouncy-slide-top.ng-enter-active {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  opacity: 1;\n}\n.bouncy-slide-top.ng-leave {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.bouncy-slide-top.ng-leave-active {\n  transform: translateY(240px);\n  -ms-transform: translateY(240px);\n  -webkit-transform: translateY(240px);\n  opacity: 0;\n}\n.bouncy-slide-top.ng-hide-add {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.bouncy-slide-top.ng-hide-add.ng-hide-add-active {\n  transform: translateY(240px);\n  -ms-transform: translateY(240px);\n  -webkit-transform: translateY(240px);\n  opacity: 0;\n}\n.bouncy-slide-top.ng-hide-remove {\n  transform: translateY(240px);\n  -ms-transform: translateY(240px);\n  -webkit-transform: translateY(240px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  display: block !important;\n  opacity: 0;\n}\n.bouncy-slide-top.ng-hide-remove.ng-hide-remove-active {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Bouncy Slide Rigth \n/* ------------------------------------------- */\n.bouncy-slide-right {\n  -webkit-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1);\n  /* older webkit */\n  -webkit-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -moz-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -ms-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -o-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  /* easeOutBack */\n  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1);\n  /* older webkit */\n  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -moz-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -ms-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -o-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  /* custom */\n}\n.bouncy-slide-right.ng-enter {\n  transform: translateX(240px);\n  -ms-transform: translateX(240px);\n  -webkit-transform: translateX(240px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 0;\n}\n.bouncy-slide-right.ng-enter-active {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  opacity: 1;\n}\n.bouncy-slide-right.ng-leave {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.bouncy-slide-right.ng-leave-active {\n  transform: translateX(240px);\n  -ms-transform: translateX(240px);\n  -webkit-transform: translateX(240px);\n  opacity: 0;\n}\n.bouncy-slide-right.ng-hide-add {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.bouncy-slide-right.ng-hide-add.ng-hide-add-active {\n  transform: translateX(240px);\n  -ms-transform: translateX(240px);\n  -webkit-transform: translateX(240px);\n  opacity: 0;\n}\n.bouncy-slide-right.ng-hide-remove {\n  transform: translateX(240px);\n  -ms-transform: translateX(240px);\n  -webkit-transform: translateX(240px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  display: block !important;\n  opacity: 0;\n}\n.bouncy-slide-right.ng-hide-remove.ng-hide-remove-active {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Bouncy Slide Left \n/* ------------------------------------------- */\n.bouncy-slide-left {\n  -webkit-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1);\n  /* older webkit */\n  -webkit-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -moz-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -ms-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -o-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  /* easeOutBack */\n  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1);\n  /* older webkit */\n  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -moz-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -ms-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -o-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  /* custom */\n}\n.bouncy-slide-left.ng-enter {\n  transform: translateX(-240px);\n  -ms-transform: translateX(-240px);\n  -webkit-transform: translateX(-240px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 0;\n}\n.bouncy-slide-left.ng-enter-active {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  opacity: 1;\n}\n.bouncy-slide-left.ng-leave {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.bouncy-slide-left.ng-leave-active {\n  transform: translateX(-240px);\n  -ms-transform: translateX(-240px);\n  -webkit-transform: translateX(-240px);\n  opacity: 0;\n}\n.bouncy-slide-left.ng-hide-add {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.bouncy-slide-left.ng-hide-add.ng-hide-add-active {\n  transform: translateX(-240px);\n  -ms-transform: translateX(-240px);\n  -webkit-transform: translateX(-240px);\n  opacity: 0;\n}\n.bouncy-slide-left.ng-hide-remove {\n  transform: translateX(-240px);\n  -ms-transform: translateX(-240px);\n  -webkit-transform: translateX(-240px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  display: block !important;\n  opacity: 0;\n}\n.bouncy-slide-left.ng-hide-remove.ng-hide-remove-active {\n  transform: translateX(0);\n  -ms-transform: translateX(0);\n  -webkit-transform: translateX(0);\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Bouncy Slide Down\n/* ------------------------------------------- */\n.bouncy-slide-down {\n  -webkit-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1);\n  /* older webkit */\n  -webkit-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -moz-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -ms-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -o-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  /* easeOutBack */\n  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1);\n  /* older webkit */\n  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -moz-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -ms-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -o-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  /* custom */\n}\n.bouncy-slide-down.ng-enter {\n  transform: translateY(-240px);\n  -ms-transform: translateY(-240px);\n  -webkit-transform: translateY(-240px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 0;\n}\n.bouncy-slide-down.ng-enter-active {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  opacity: 1;\n}\n.bouncy-slide-down.ng-leave {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.bouncy-slide-down.ng-leave-active {\n  transform: translateY(-240px);\n  -ms-transform: translateY(-240px);\n  -webkit-transform: translateY(-240px);\n  opacity: 0;\n}\n.bouncy-slide-down.ng-hide-add {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.bouncy-slide-down.ng-hide-add.ng-hide-add-active {\n  transform: translateY(-240px);\n  -ms-transform: translateY(-240px);\n  -webkit-transform: translateY(-240px);\n  opacity: 0;\n}\n.bouncy-slide-down.ng-hide-remove {\n  transform: translateY(-240px);\n  -ms-transform: translateY(-240px);\n  -webkit-transform: translateY(-240px);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  display: block !important;\n  opacity: 0;\n}\n.bouncy-slide-down.ng-hide-remove.ng-hide-remove-active {\n  transform: translateY(0);\n  -ms-transform: translateY(0);\n  -webkit-transform: translateY(0);\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Scale Fade \n/* ------------------------------------------- */\n.scale-fade {\n  -webkit-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n  -webkit-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n}\n.scale-fade.ng-enter {\n  transform: scale(0.7);\n  -ms-transform: scale(0.7);\n  -webkit-transform: scale(0.7);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 0;\n}\n.scale-fade.ng-enter-active {\n  transform: scale(1);\n  -ms-transform: scale(1);\n  -webkit-transform: scale(1);\n  opacity: 1;\n}\n.scale-fade.ng-leave {\n  transform: scale(1);\n  -ms-transform: scale(1);\n  -webkit-transform: scale(1);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.scale-fade.ng-leave-active {\n  transform: scale(0.7);\n  -ms-transform: scale(0.7);\n  -webkit-transform: scale(0.7);\n  opacity: 0;\n}\n.scale-fade.ng-hide-add {\n  transform: scale(1);\n  -ms-transform: scale(1);\n  -webkit-transform: scale(1);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.scale-fade.ng-hide-add.ng-hide-add-active {\n  transform: scale(0.7);\n  -ms-transform: scale(0.7);\n  -webkit-transform: scale(0.7);\n  opacity: 0;\n}\n.scale-fade.ng-hide-remove {\n  transform: scale(0.7);\n  -ms-transform: scale(0.7);\n  -webkit-transform: scale(0.7);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  display: block !important;\n  opacity: 0;\n}\n.scale-fade.ng-hide-remove.ng-hide-remove-active {\n  transform: scale(1);\n  -ms-transform: scale(1);\n  -webkit-transform: scale(1);\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Spin Fade \n/* ------------------------------------------- */\n.spin-toggle {\n  -webkit-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n  -webkit-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n}\n.spin-toggle.ng-enter {\n  transform: rotate(225deg);\n  -ms-transform: rotate(225deg);\n  -webkit-transform: rotate(225deg);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 0;\n}\n.spin-toggle.ng-enter-active {\n  transform: rotate(0deg);\n  -ms-transform: rotate(0deg);\n  -webkit-transform: rotate(0deg);\n  opacity: 1;\n}\n.spin-toggle.ng-leave {\n  transform: rotate(0deg);\n  -ms-transform: rotate(0deg);\n  -webkit-transform: rotate(0deg);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.spin-toggle.ng-leave-active {\n  transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  -webkit-transform: rotate(90deg);\n  opacity: 0;\n}\n.spin-toggle.ng-hide-add {\n  transform: rotate(0deg);\n  -ms-transform: rotate(0deg);\n  -webkit-transform: rotate(0deg);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.spin-toggle.ng-hide-add.ng-hide-add-active {\n  transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  -webkit-transform: rotate(90deg);\n  opacity: 0;\n}\n.spin-toggle.ng-hide-remove {\n  transform: rotate(225deg);\n  -ms-transform: rotate(225deg);\n  -webkit-transform: rotate(225deg);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  display: block !important;\n  opacity: 0;\n}\n.spin-toggle.ng-hide-remove.ng-hide-remove-active {\n  transform: rotate(0deg);\n  -ms-transform: rotate(0deg);\n  -webkit-transform: rotate(0deg);\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Scale in Fade \n/* ------------------------------------------- */\n.scale-fade-in {\n  -webkit-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n  -webkit-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n}\n.scale-fade-in.ng-enter {\n  transform: scale(3);\n  -ms-transform: scale(3);\n  -webkit-transform: scale(3);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 0;\n}\n.scale-fade-in.ng-enter-active {\n  transform: scale(1);\n  -ms-transform: scale(1);\n  -webkit-transform: scale(1);\n  opacity: 1;\n}\n.scale-fade-in.ng-leave {\n  transform: scale(1);\n  -ms-transform: scale(1);\n  -webkit-transform: scale(1);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.scale-fade-in.ng-leave-active {\n  transform: scale(3);\n  -ms-transform: scale(3);\n  -webkit-transform: scale(3);\n  opacity: 0;\n}\n.scale-fade-in.ng-hide-add {\n  transform: scale(1);\n  -ms-transform: scale(1);\n  -webkit-transform: scale(1);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  opacity: 1;\n}\n.scale-fade-in.ng-hide-add.ng-hide-add-active {\n  transform: scale(3);\n  -ms-transform: scale(3);\n  -webkit-transform: scale(3);\n  opacity: 0;\n}\n.scale-fade-in.ng-hide-remove {\n  transform: scale(3);\n  -ms-transform: scale(3);\n  -webkit-transform: scale(3);\n  transition-duration: 250ms;\n  -webkit-transition-duration: 250ms;\n  display: block !important;\n  opacity: 0;\n}\n.scale-fade-in.ng-hide-remove.ng-hide-remove-active {\n  transform: scale(1);\n  -ms-transform: scale(1);\n  -webkit-transform: scale(1);\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Bouncy Scale in Fade \n/* ------------------------------------------- */\n.bouncy-scale-in {\n  -webkit-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1);\n  /* older webkit */\n  -webkit-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -moz-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -ms-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -o-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  /* easeOutBack */\n  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1);\n  /* older webkit */\n  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -moz-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -ms-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -o-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  /* custom */\n}\n.bouncy-scale-in.ng-enter {\n  transform: scale(3);\n  -ms-transform: scale(3);\n  -webkit-transform: scale(3);\n  transition-duration: 450ms;\n  -webkit-transition-duration: 450ms;\n  opacity: 0;\n}\n.bouncy-scale-in.ng-enter-active {\n  transform: scale(1);\n  -ms-transform: scale(1);\n  -webkit-transform: scale(1);\n  opacity: 1;\n}\n.bouncy-scale-in.ng-leave {\n  transform: scale(1);\n  -ms-transform: scale(1);\n  -webkit-transform: scale(1);\n  transition-duration: 450ms;\n  -webkit-transition-duration: 450ms;\n  opacity: 1;\n}\n.bouncy-scale-in.ng-leave-active {\n  transform: scale(3);\n  -ms-transform: scale(3);\n  -webkit-transform: scale(3);\n  opacity: 0;\n}\n.bouncy-scale-in.ng-hide-add {\n  transform: scale(1);\n  -ms-transform: scale(1);\n  -webkit-transform: scale(1);\n  transition-duration: 450ms;\n  -webkit-transition-duration: 450ms;\n  opacity: 1;\n}\n.bouncy-scale-in.ng-hide-add.ng-hide-add-active {\n  transform: scale(3);\n  -ms-transform: scale(3);\n  -webkit-transform: scale(3);\n  opacity: 0;\n}\n.bouncy-scale-in.ng-hide-remove {\n  transform: scale(3);\n  -ms-transform: scale(3);\n  -webkit-transform: scale(3);\n  transition-duration: 450ms;\n  -webkit-transition-duration: 450ms;\n  display: block !important;\n  opacity: 0;\n}\n.bouncy-scale-in.ng-hide-remove.ng-hide-remove-active {\n  transform: scale(1);\n  -ms-transform: scale(1);\n  -webkit-transform: scale(1);\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Flip In \n/* ------------------------------------------- */\n.flip-in {\n  -webkit-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n  -webkit-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -moz-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -ms-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  -o-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  /* easeOutQuad */\n}\n.flip-in.ng-enter {\n  transform: perspective(300px) rotateX(90deg);\n  -ms-transform: perspective(300px) rotateX(90deg);\n  -webkit-transform: perspective(300px) rotateX(90deg);\n  transition-duration: 550ms;\n  -webkit-transition-duration: 550ms;\n  opacity: 0.7;\n}\n.flip-in.ng-enter-active {\n  transform: perspective(300px) rotateX(0deg);\n  -ms-transform: perspective(300px) rotateX(0deg);\n  -webkit-transform: perspective(300px) rotateX(0deg);\n  opacity: 1;\n}\n.flip-in.ng-leave {\n  transform: perspective(300px) rotateX(0deg);\n  -ms-transform: perspective(300px) rotateX(0deg);\n  -webkit-transform: perspective(300px) rotateX(0deg);\n  transition-duration: 550ms;\n  -webkit-transition-duration: 550ms;\n  opacity: 1;\n}\n.flip-in.ng-leave-active {\n  transform: perspective(300px) rotateX(135deg);\n  -ms-transform: perspective(300px) rotateX(135deg);\n  -webkit-transform: perspective(300px) rotateX(135deg);\n  opacity: 0.7;\n}\n.flip-in.ng-hide-add {\n  transform: perspective(300px) rotateX(0deg);\n  -ms-transform: perspective(300px) rotateX(0deg);\n  -webkit-transform: perspective(300px) rotateX(0deg);\n  transition-duration: 550ms;\n  -webkit-transition-duration: 550ms;\n  opacity: 1;\n}\n.flip-in.ng-hide-add.ng-hide-add-active {\n  transform: perspective(300px) rotateX(135deg);\n  -ms-transform: perspective(300px) rotateX(135deg);\n  -webkit-transform: perspective(300px) rotateX(135deg);\n  opacity: 0;\n}\n.flip-in.ng-hide-remove {\n  transform: perspective(300px) rotateX(90deg);\n  -ms-transform: perspective(300px) rotateX(90deg);\n  -webkit-transform: perspective(300px) rotateX(90deg);\n  transition-duration: 550ms;\n  -webkit-transition-duration: 550ms;\n  display: block !important;\n  opacity: 0;\n}\n.flip-in.ng-hide-remove.ng-hide-remove-active {\n  transform: perspective(300px) rotateX(0deg);\n  -ms-transform: perspective(300px) rotateX(0deg);\n  -webkit-transform: perspective(300px) rotateX(0deg);\n  opacity: 1;\n}\n\n/* ------------------------------------------- */\n/* Rotate In \n/* ------------------------------------------- */\n.rotate-in {\n  -webkit-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1);\n  /* older webkit */\n  -webkit-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -moz-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -ms-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -o-transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  transition: all 0 cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  /* easeOutBack */\n  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1);\n  /* older webkit */\n  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -moz-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -ms-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  -o-transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  transition-timing-function: cubic-bezier(0.175, 0.885, 0.45, 1.595);\n  /* custom */\n}\n.rotate-in.ng-enter {\n  transform: perspective(300px) rotateY(40deg);\n  -ms-transform: perspective(300px) rotateY(40deg);\n  -webkit-transform: perspective(300px) rotateY(40deg);\n  transition-duration: 550ms;\n  -webkit-transition-duration: 550ms;\n  opacity: 0.7;\n}\n.rotate-in.ng-enter-active {\n  transform: perspective(300px) rotateY(0deg);\n  -ms-transform: perspective(300px) rotateY(0deg);\n  -webkit-transform: perspective(300px) rotateY(0deg);\n  opacity: 1;\n}\n.rotate-in.ng-leave {\n  transform: perspective(300px) rotateY(0deg);\n  -ms-transform: perspective(300px) rotateY(0deg);\n  -webkit-transform: perspective(300px) rotateY(0deg);\n  transition-duration: 550ms;\n  -webkit-transition-duration: 550ms;\n  opacity: 1;\n}\n.rotate-in.ng-leave-active {\n  transform: perspective(300px) rotateY(-40deg);\n  -ms-transform: perspective(300px) rotateY(-40deg);\n  -webkit-transform: perspective(300px) rotateY(-40deg);\n  opacity: 0.7;\n}\n.rotate-in.ng-hide-add {\n  transform: perspective(300px) rotateY(0deg);\n  -ms-transform: perspective(300px) rotateY(0deg);\n  -webkit-transform: perspective(300px) rotateY(0deg);\n  transition-duration: 550ms;\n  -webkit-transition-duration: 550ms;\n  opacity: 1;\n}\n.rotate-in.ng-hide-add.ng-hide-add-active {\n  transform: perspective(300px) rotateY(-40deg);\n  -ms-transform: perspective(300px) rotateY(-40deg);\n  -webkit-transform: perspective(300px) rotateY(-40deg);\n  opacity: 0;\n}\n.rotate-in.ng-hide-remove {\n  transform: perspective(300px) rotateY(40deg);\n  -ms-transform: perspective(300px) rotateY(40deg);\n  -webkit-transform: perspective(300px) rotateY(40deg);\n  transition-duration: 550ms;\n  -webkit-transition-duration: 550ms;\n  display: block !important;\n  opacity: 0;\n}\n.rotate-in.ng-hide-remove.ng-hide-remove-active {\n  transform: perspective(300px) rotateY(0deg);\n  -ms-transform: perspective(300px) rotateY(0deg);\n  -webkit-transform: perspective(300px) rotateY(0deg);\n  opacity: 1;\n}\n\n.star-rating {\n  font-size: 0;\n  white-space: nowrap;\n  display: inline-block;\n  width: 75px;\n  height: 15px;\n  overflow: hidden;\n  position: relative;\n  opacity: 0.5;\n  background: url(\"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjREREREREIiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=\");\n  background-size: auto 100%;\n}\n\n.star-rating:hover, .star-rating:focus {\n  opacity: 0.7;\n}\n\n.star-rating i {\n  opacity: 0;\n  position: absolute;\n  left: 0;\n  top: 0;\n  height: 100%;\n  width: 10%;\n  z-index: 1;\n  background: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwb2x5Z29uIGZpbGw9IiM0MzkwRkYiIHBvaW50cz0iMTAsMCAxMy4wOSw2LjU4MyAyMCw3LjYzOSAxNSwxMi43NjQgMTYuMTgsMjAgMTAsMTYuNTgzIDMuODIsMjAgNSwxMi43NjQgMCw3LjYzOSA2LjkxLDYuNTgzICIvPg0KPC9zdmc+DQo=\");\n  background-size: auto 100%;\n}\n\n.star-rating input {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  opacity: 0;\n  display: inline-block;\n  width: 10%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  z-index: 2;\n  position: relative;\n}\n\n.star-rating input:hover + i,\n.star-rating input:checked + i {\n  opacity: 1;\n}\n\n.star-rating i ~ i {\n  width: 20%;\n}\n\n.star-rating i ~ i ~ i {\n  width: 30%;\n}\n\n.star-rating i ~ i ~ i ~ i {\n  width: 40%;\n}\n\n.star-rating i ~ i ~ i ~ i ~ i {\n  width: 50%;\n}\n\n.star-rating i ~ i ~ i ~ i ~ i ~ i {\n  width: 60%;\n}\n\n.star-rating i ~ i ~ i ~ i ~ i ~ i ~ i {\n  width: 70%;\n}\n\n.star-rating i ~ i ~ i ~ i ~ i ~ i ~ i ~ i {\n  width: 80%;\n}\n\n.star-rating i ~ i ~ i ~ i ~ i ~ i ~ i ~ i ~ i {\n  width: 90%;\n}\n\n.star-rating i ~ i ~ i ~ i ~ i ~ i ~ i ~ i ~ i ~ i {\n  width: 100%;\n}\n\n.choice {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  text-align: center;\n  padding: 20px;\n  display: block;\n}\n\n.player-controls-sprite, .player-controls-back-small-activated, .player-controls-back-small.has-history, .player-controls-back-small, .player-controls-back, .player-controls-forward-small-activated, .player-controls-forward-small.has-history, .player-controls-forward-small, .player-controls-forward, .player-controls-pause, .player-controls-play, .player-controls-vol0, .player-controls-vol1, .player-controls-vol2, .player-controls-vol3 {\n  background-image: url("+__webpack_require__(121)+");\n  background-repeat: no-repeat;\n}\n\n.player-controls-back-small-activated, .player-controls-back-small.has-history {\n  background-position: 0 0;\n  height: 16px;\n  width: 14px;\n}\n\n.player-controls-back-small {\n  background-position: 0 -16px;\n  height: 16px;\n  width: 14px;\n}\n\n.player-controls-back {\n  background-position: 0 -32px;\n  height: 31px;\n  width: 18px;\n}\n.player-controls-back:hover, .player-controls-back.back-hover {\n  background-position: 0 -94px;\n}\n.player-controls-back:active, .player-controls-back.back-active {\n  background-position: 0 -63px;\n}\n\n.player-controls-forward-small-activated, .player-controls-forward-small.has-history {\n  background-position: 0 -125px;\n  height: 16px;\n  width: 14px;\n}\n\n.player-controls-forward-small {\n  background-position: 0 -141px;\n  height: 16px;\n  width: 14px;\n}\n\n.player-controls-forward {\n  background-position: 0 -157px;\n  height: 31px;\n  width: 18px;\n}\n.player-controls-forward:hover, .player-controls-forward.forward-hover {\n  background-position: 0 -219px;\n}\n.player-controls-forward:active, .player-controls-forward.forward-active {\n  background-position: 0 -188px;\n}\n\n.player-controls-pause {\n  background-position: 0 -250px;\n  height: 37px;\n  width: 37px;\n}\n.player-controls-pause:hover, .player-controls-pause.pause-hover {\n  background-position: 0 -324px;\n}\n.player-controls-pause:active, .player-controls-pause.pause-active {\n  background-position: 0 -287px;\n}\n\n.player-controls-play {\n  background-position: 0 -361px;\n  height: 37px;\n  width: 37px;\n}\n.player-controls-play:hover, .player-controls-play.play-hover {\n  background-position: 0 -435px;\n}\n.player-controls-play:active, .player-controls-play.play-active {\n  background-position: 0 -398px;\n}\n\n.player-controls-vol0 {\n  background-position: 0 -472px;\n  height: 18px;\n  width: 22px;\n}\n.player-controls-vol0:hover, .player-controls-vol0.vol0-hover {\n  background-position: 0 -490px;\n}\n\n.player-controls-vol1 {\n  background-position: 0 -508px;\n  height: 18px;\n  width: 22px;\n}\n.player-controls-vol1:hover, .player-controls-vol1.vol1-hover {\n  background-position: 0 -526px;\n}\n\n.player-controls-vol2 {\n  background-position: 0 -544px;\n  height: 18px;\n  width: 22px;\n}\n.player-controls-vol2:hover, .player-controls-vol2.vol2-hover {\n  background-position: 0 -562px;\n}\n\n.player-controls-vol3 {\n  background-position: 0 -580px;\n  height: 18px;\n  width: 22px;\n}\n.player-controls-vol3:hover, .player-controls-vol3.vol3-hover {\n  background-position: 0 -598px;\n}\n\n.history-nav {\n  margin-left: 8px;\n}\n\n.player-controls-forward-small,\n.player-controls-back-small {\n  margin-top: 13px;\n}\n\n.player-controls-forward-small.has-history,\n.player-controls-back-small.has-history {\n  opacity: 0.8;\n  filter: alpha(opacity=80);\n}\n.player-controls-forward-small.has-history:hover,\n.player-controls-back-small.has-history:hover {\n  opacity: 1;\n  filter: alpha(opacity=100);\n}\n.player-controls-forward-small.has-history:active,\n.player-controls-back-small.has-history:active {\n  opacity: 0.8;\n  filter: alpha(opacity=80);\n}\n\n.soundcloud-control {\n  width: 100%;\n  height: 100%;\n}\n.soundcloud-control .soundcloud-control-image {\n  width: 100%;\n  height: 100%;\n  -moz-background-size: 100% 100%;\n  -o-background-size: 100% 100%;\n  -webkit-background-size: 100% 100%;\n  background-size: 100% 100%;\n}\n\n.hide-player {\n  overflow: hidden;\n  width: 0;\n  height: 0;\n}\n\n.alert-ptr {\n  position: relative;\n  text-align: center;\n  padding: 3px;\n  background: rgba(0, 0, 0, 0.5);\n  font-size: 12px;\n}\n.alert-ptr:after {\n  content: '';\n  top: -13px;\n  left: 15px;\n  position: absolute;\n  border: 6px solid transparent;\n  border-bottom: 6px solid rgba(0, 0, 0, 0.5);\n}\n\n::-webkit-scrollbar {\n  width: 12px;\n  height: 12px;\n}\n\n::-webkit-scrollbar-track {\n  background-color: #141414;\n}\n\n::-webkit-scrollbar-track-piece {\n  background-color: transparent;\n}\n\n::-webkit-scrollbar-corner {\n  background-color: #141414;\n}\n\n::-webkit-scrollbar-thumb {\n  -moz-border-radius: 13px;\n  -webkit-border-radius: 13px;\n  border-radius: 13px;\n  background-clip: padding-box;\n  background-color: rgba(255, 255, 255, 0.1);\n  border: 2px solid transparent;\n}\n::-webkit-scrollbar-thumb:active {\n  background-color: #105d91;\n}\n\nhtml, body, a {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-user-drag: none;\n}\n\nh1, h2, h3 {\n  font-weight: 300;\n}\n\nbody {\n  padding-top: 80px;\n  font-family: \"Lato\", \"Helvetica Neue\", arial, sans-serif;\n  cursor: default;\n}\n\n::selection {\n  background: rgba(0, 153, 255, 0.6);\n  color: #fff;\n}\n\n::-webkit-selection {\n  background: rgba(0, 153, 255, 0.6);\n  color: #fff;\n}\n\ninput::selection {\n  background: rgba(0, 153, 255, 0.6);\n  color: #fff;\n}\n\ninput::-webkit-selection {\n  background: rgba(0, 153, 255, 0.6);\n  color: #fff;\n}\n\na, select, .btn, .sh-btn, .sh-btn {\n  cursor: inherit;\n}\na:focus, a:active, a:hover, select:focus, select:active, select:hover, .btn:focus, .sh-btn:focus, .btn:active, .sh-btn:active, .btn:hover, .sh-btn:hover, .sh-btn:focus, .sh-btn:active, .sh-btn:hover {\n  outline: none !important;\n}\n\nhtml, body {\n  height: 100%;\n  min-height: 100%;\n  overflow: hidden;\n}\n\nhr {\n  border-top: 1px solid #111;\n  border-bottom: 1px solid #222;\n  margin: 20px;\n}\n\ninput, textarea, .sh-editable {\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  -ms-user-select: text;\n}\ninput:focus, textarea:focus, .sh-editable:focus {\n  outline: 0;\n}\n\n.sh-drag-label {\n  padding: 3px;\n  background: #fff;\n  border: 1px solid #000;\n  color: #333;\n  font-size: 11px;\n  line-height: 15px;\n}\n\n.sh-editable-wrapper {\n  position: relative;\n}\n.sh-editable-wrapper .sh-editable-input {\n  width: 100%;\n  background: none;\n  color: inherit;\n  border: none;\n  padding: 0;\n  margin: 0;\n}\n.sh-editable-wrapper.sh-editable-editing .sh-editable-text {\n  display: none;\n}\n\n.sh-fixed-scroll-area-wrapper {\n  overflow-x: hidden;\n  z-index: 1000;\n}\n.sh-fixed-scroll-area-wrapper:before, .sh-fixed-scroll-area-wrapper:after {\n  content: \" \";\n  display: table;\n}\n.sh-fixed-scroll-area-wrapper:after {\n  clear: both;\n}\n\n.login-page {\n  border: 1px solid #333;\n  background: #4b4b4b;\n  font-family: \"Helvetica Neue\", arial, sans-serif;\n}\n.login-page .login-container {\n  margin-top: -35px;\n}\n.login-page .login-container .login-logo {\n  display: block;\n  margin: 0 auto;\n  background-repeat: no-repeat;\n  text-indent: -9999px;\n  background-position: center center;\n  width: 216px;\n  height: 50px;\n}\n.login-page .login-main-btn {\n  -moz-border-radius: 0;\n  -webkit-border-radius: 0;\n  border-radius: 0;\n  line-height: 30px;\n  background: #2e2e2e;\n  font-size: 13px;\n  border: 1px solid #222;\n  color: #bbb;\n  font-weight: bold;\n  text-transform: uppercase;\n  position: fixed;\n  display: block;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n}\n.login-page .login-main-btn:hover, .login-page .login-main-btn:focus {\n  background: #333;\n}\n.login-page .login-main-btn:active {\n  background: #222;\n  color: #eee;\n}\n.login-page .login-form-err, .login-page .login-form-loader {\n  position: absolute;\n  top: -35px;\n  left: 0;\n  width: 100%;\n}\n.login-page .login-form {\n  width: 100%;\n  position: relative;\n  max-width: 214px;\n  margin: 37px auto 0;\n  padding-bottom: 37px;\n}\n.login-page .login-form .form-control {\n  border: 0;\n  font-size: 13px;\n  height: 31px;\n  -moz-border-radius: 20px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  width: 100%;\n}\n.login-page .login-form .form-control:focus {\n  -webkit-box-shadow: 0 0 0 2px #7cf;\n  box-shadow: 0 0 0 2px #7cf;\n}\n.login-page .login-form .form-spacing:not(:last-child) {\n  margin-bottom: 18px;\n}\n\n.icon-lg {\n  font-size: 22px;\n}\n\n.icon-sm {\n  font-size: 15px;\n}\n\n.icon-md {\n  font-size: 17px;\n}\n\n.icon-xs {\n  font-size: 13px;\n}\n\n.col-resize {\n  cursor: col-resize !important;\n}\n\n.table-fixed {\n  table-layout: fixed;\n}\n\n.ellipsis, .song-table .song-table-row .song-table-column, .song-table .song-table-headers .song-table-header, .navbar-main .navbar-nav-tabs > li > a {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.drag-element {\n  -webkit-user-drag: element;\n}\n\n.btn-icon .icon {\n  vertical-align: middle;\n  margin-right: 5px;\n  position: relative;\n  top: -1px;\n}\n.btn-icon .icon-md, .btn-icon .icon-lg {\n  margin-right: 10px;\n}\n\n.toggler-label {\n  font-weight: normal;\n  color: #bbb;\n}\n\n.toggle-checkbox {\n  display: none;\n}\n\n.toggler,\n.toggler:after {\n  height: 24px;\n  -webkit-border-radius: 30px;\n  -moz-border-radius: 30px;\n  -ms-border-radius: 30px;\n  border-radius: 30px;\n  -webkit-transition: 0.1s linear all;\n  -moz-transition: 0.1s linear all;\n  -ms-transition: 0.1s linear all;\n  transition: 0.1s linear all;\n  display: block;\n}\n\n.toggler {\n  display: inline-block;\n  vertical-align: middle;\n  *vertical-align: auto;\n  *zoom: 1;\n  *display: inline;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  width: 50px;\n  background: #888;\n  position: relative;\n  text-indent: -99999px;\n}\n\n.toggler:after {\n  text-indent: 0;\n  margin: 4px;\n  content: 'OFF';\n  color: #888;\n  font-size: 8px;\n  text-align: center;\n  background: #fff;\n  position: absolute;\n  padding-top: 3px;\n  width: 20px;\n  height: 16px;\n  top: 0;\n  left: 0;\n}\n\n.toggler-label .toggler {\n  margin-right: 6px;\n}\n\n.toggle-checkbox:checked ~ .toggler {\n  background: #63cff2;\n}\n\n.toggle-checkbox:checked ~ .toggler:after {\n  left: 100%;\n  content: 'ON';\n  margin-left: -24px;\n  color: #195;\n}\n\n.toggle-checkbox:disabled ~ .toggler,\n.toggle-checkbox[disabled] ~ .toggler {\n  background: #eee;\n}\n\n.el-loader-screen {\n  position: absolute;\n  z-index: 1060;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  background: #090909;\n}\n\n.el-loader-container {\n  width: 70px;\n  height: 35px;\n  overflow: hidden;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-left: -35px;\n  margin-top: -17px;\n}\n\n.small-loader {\n  background: url("+__webpack_require__(122)+") no-repeat top left;\n  height: 24px;\n  background-size: 24px;\n  padding-left: 29px;\n  line-height: 24px;\n}\n\n.el-loader {\n  width: 70px;\n  height: 70px;\n  border-style: solid;\n  border-top-color: #157abf;\n  border-right-color: #157abf;\n  border-left-color: transparent;\n  border-bottom-color: transparent;\n  border-radius: 50%;\n  box-sizing: border-box;\n  animation: rotate 2.5s ease-in-out infinite;\n  -webkit-animation: rotate 2.5s ease-in-out infinite;\n  transform: rotate(-200deg);\n  -ms-transform: rotate(-200deg);\n  -webkit-transform: rotate(-200deg);\n}\n\n.main {\n  padding: 20px 20px 20px 20px;\n  position: absolute;\n  top: 85px;\n  left: 240px;\n  right: 0;\n  bottom: 50px;\n  overflow-y: auto;\n  overflow-x: auto;\n  z-index: 900;\n}\n.main.main-loading {\n  z-index: 1000;\n}\n.main .main-top {\n  margin-top: -20px;\n}\n.main .search-header, .main .hot-header {\n  margin: 20px 20px 10px;\n  color: #aaa;\n}\n.main .search-header > .search-header-term, .main .hot-header > .search-header-term {\n  color: #eee;\n}\n.main .hot-header {\n  margin-bottom: 15px;\n}\n.main .search-result-details {\n  margin: 0 20px 20px;\n  color: #aaa;\n}\n.main .end-element {\n  margin-bottom: 0;\n}\n.main .main-stretch {\n  margin-left: -20px;\n  margin-right: -20px;\n}\n.main .page-header {\n  margin-top: 0;\n}\n.main .full-container {\n  overflow-x: auto;\n  overflow-y: auto;\n  padding: 20px 20px 0 20px;\n  z-index: 1050;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n.popover {\n  color: #555555;\n}\n\n.hard-notice, .song-table .song-table-msg {\n  padding: 100px 0 20px;\n  text-align: center;\n  color: #777;\n  font-size: 18px;\n}\n\n.sh-btn, .sh-btn:active, .sh-btn:hover {\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.sh-btn.btn-xs, .btn-group-xs > .sh-btn {\n  line-height: 30px;\n}\n.sh-btn.sh-btn-long {\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.sh-btn.sh-btn-primary {\n  text-align: left;\n  line-height: 18px;\n  background: rgba(0, 0, 0, 0.4);\n  color: #aaa;\n}\n.sh-btn.sh-btn-primary:hover {\n  background: rgba(0, 0, 0, 0.6);\n}\n.sh-btn.sh-btn-primary:active {\n  background: #000;\n}\n\n.song-table .song-table-row {\n  border: 0;\n  border-color: #222425;\n  border-style: solid;\n  border-top-width: 1px;\n  background: rgba(0, 0, 0, 0.1);\n  min-width: 100%;\n}\n.song-table .song-table-row:before, .song-table .song-table-row:after {\n  content: \" \";\n  display: table;\n}\n.song-table .song-table-row:after {\n  clear: both;\n}\n.song-table .song-table-row .song-table-column {\n  float: left;\n  padding: 10px 20px;\n}\n.song-table .song-table-row:hover, .song-table .song-table-row:active {\n  background: #222425;\n}\n.song-table .song-table-row:hover, .song-table .song-table-row:hover + .song-table-row, .song-table .song-table-row:active, .song-table .song-table-row:active + .song-table-row {\n  border-color: #222425;\n}\n.song-table .song-table-row.sh-selected {\n  background: rgba(48, 48, 69, 0.6);\n}\n.song-table .song-table-row.sh-selected, .song-table .song-table-row.sh-selected + .song-table-row {\n  border-color: #303045;\n}\n.song-table .song-table-row:last-child {\n  border-bottom-width: 1px;\n}\n.song-table .song-playing-row {\n  color: #46a;\n}\n.song-table .song-play-icon {\n  position: relative;\n  top: -3px;\n  line-height: 0;\n  padding-right: 4px;\n  text-align: center;\n  vertical-align: middle;\n  font-size: 25px;\n  display: none;\n}\n.song-table .song-playing-row .song-play-icon {\n  display: inline-block;\n}\n.song-table .song-table-headers {\n  background: #000;\n  min-width: 100%;\n  box-sizing: border-box;\n}\n.song-table .song-table-headers:before, .song-table .song-table-headers:after {\n  content: \" \";\n  display: table;\n}\n.song-table .song-table-headers:after {\n  clear: both;\n}\n.song-table .song-table-headers .song-table-header {\n  position: relative;\n  box-sizing: border-box;\n  float: left;\n  font-size: 12px;\n  padding: 16px 20px 8px;\n  text-transform: uppercase;\n  -webkit-transition: 0.2s ease-in-out color;\n  -o-transition: 0.2s ease-in-out color;\n  transition: 0.2s ease-in-out color;\n  color: rgba(255, 255, 255, 0.35);\n  border: 0;\n  border-right: 1px solid #333333;\n}\n.song-table .song-table-headers .song-table-header:before {\n  left: -1px;\n  right: auto;\n}\n.song-table .song-table-headers .song-table-header:hover {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.navbar-main {\n  border: 0;\n}\n.navbar-main .navbar-window-buttons {\n  position: absolute;\n  z-index: 9999;\n  top: 0;\n  left: 0;\n  width: 100px;\n  height: 30px;\n  clear: right;\n}\n.navbar-main .navbar-window-buttons .navbar-window-button {\n  -webkit-transition: 0.1s linear box-shadow, 0.1s linear -moz-box-shadow, 0.1s linear -webkit-box-shadow;\n  -o-transition: 0.1s linear box-shadow, 0.1s linear -moz-box-shadow, 0.1s linear -webkit-box-shadow;\n  transition: 0.1s linear box-shadow, 0.1s linear -moz-box-shadow, 0.1s linear -webkit-box-shadow;\n  height: 14px;\n  margin-top: 14px;\n  width: 14px;\n  float: left;\n  margin-right: 5px;\n  background: #bccdd3;\n  -moz-border-radius: 20px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n}\n.navbar-main .navbar-window-buttons .navbar-window-button:last-child {\n  margin-right: 0;\n}\n.navbar-main .navbar-window-buttons:hover .navbar-window-button-close {\n  background: #df4030;\n}\n.navbar-main .navbar-window-buttons:hover .navbar-window-button-min {\n  background: #fac451;\n}\n.navbar-main .navbar-window-buttons:hover .navbar-window-button-max {\n  background: #6bc635;\n}\n.navbar-main .navbar-window-buttons .navbar-window-button:hover {\n  -webkit-box-shadow: inset 0 0 2px 3px rgba(255, 255, 255, 0.4);\n  box-shadow: inset 0 0 2px 3px rgba(255, 255, 255, 0.4);\n}\n.navbar-main .navbar-window-buttons .navbar-window-button:active {\n  -webkit-box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.3);\n  box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.3);\n}\n.navbar-main .navbar-nav-tabs {\n  padding-left: 6px;\n  position: relative;\n  float: none;\n  overflow: hidden;\n  height: 40px;\n}\n.navbar-main .navbar-nav-tabs:after {\n  content: '';\n  width: 50px;\n  display: block;\n  background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjEuMCIgeTE9IjAuNSIgeDI9IjAuMCIgeTI9IjAuNSI+PHN0b3Agb2Zmc2V0PSIzMCUiIHN0b3AtY29sb3I9IiMyMjIyMjIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4wIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');\n  background: -webkit-gradient(linear, 100% 50%, 0% 50%, color-stop(30%, #222222), color-stop(100%, rgba(0, 0, 0, 0)));\n  background: -moz-linear-gradient(right, #222222 30%, rgba(0, 0, 0, 0) 100%);\n  background: -webkit-linear-gradient(right, #222222 30%, rgba(0, 0, 0, 0) 100%);\n  background: linear-gradient(to left, #222222 30%, rgba(0, 0, 0, 0) 100%);\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n.navbar-main .navbar-nav-tabs > li > a {\n  font-size: 13px;\n  line-height: 18px;\n  margin-top: 12px;\n  margin-left: 10px;\n  max-width: 130px;\n  -moz-border-radius: 20px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  padding: 4px 9px;\n  color: #fff;\n}\n.navbar-main .navbar-nav-tabs > li > a .icon {\n  -moz-border-radius: 10px;\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  margin-left: -6px;\n  padding: 2px 3px;\n  color: #fff;\n}\n.navbar-main .navbar-nav-tabs > li > a .tab-close {\n  float: left;\n  font-size: 16px;\n  margin-top: -4px;\n  margin-bottom: -4px;\n  margin-right: 8px;\n  margin-left: -1px;\n  padding: 4px;\n}\n.navbar-main .navbar-nav-tabs > li > a .tab-close:hover {\n  color: #cd401f;\n}\n.navbar-main .navbar-nav-tabs > li > a, .navbar-main .navbar-nav-tabs > li > a:focus {\n  color: #fff;\n  background: #444;\n}\n.navbar-main .navbar-nav-tabs > li > a:hover {\n  background: #000;\n  color: #fff;\n}\n.navbar-main .navbar-nav-tabs > li.tab-active > a .icon, .navbar-main .navbar-nav-tabs > li.tab-active > a [class*=\"icon-\"] {\n  background: #05a0cf;\n}\n.navbar-main .navbar-nav-tabs > li.tab-active > a, .navbar-main .navbar-nav-tabs > li.tab-active > a:active, .navbar-main .navbar-nav-tabs > li.tab-active > a:focus, .navbar-main .navbar-nav-tabs > li.tab-active > a:hover {\n  background: #fff;\n  color: #444;\n}\n.navbar-main .search-form {\n  position: relative;\n  padding: 3px 2px 2px;\n  float: left;\n}\n.navbar-main .search-form .search-control, .navbar-main .search-form .search-icon, .navbar-main .search-form .search-label {\n  -webkit-transition: 0.1s ease-in-out background;\n  -o-transition: 0.1s ease-in-out background;\n  transition: 0.1s ease-in-out background;\n  background: #fff;\n  float: left;\n  height: 29px;\n  line-height: 29px;\n  font-size: 12px;\n}\n.navbar-main .search-form .search-control-wrap {\n  float: left;\n  max-width: 500px;\n}\n.navbar-main .search-form .search-control {\n  -webkit-transition: 0.2s ease-in-out width;\n  -o-transition: 0.2s ease-in-out width;\n  transition: 0.2s ease-in-out width;\n  border-bottom-right-radius: 43px;\n  border-top-right-radius: 43px;\n  border: 0;\n  width: 200px;\n  float: none;\n  padding-left: 10px;\n  line-height: 17px;\n  padding-right: 20px;\n}\n.navbar-main .search-form .search-control, .navbar-main .search-form .search-control:hover, .navbar-main .search-form .search-control:focus {\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.navbar-main .search-form .search-control:hover {\n  background: #fff;\n}\n.navbar-main .search-form .search-control:focus {\n  width: 300px;\n  background: #fff;\n}\n.navbar-main .search-form .search-label {\n  color: #fff;\n  padding: 0 12px;\n  height: 29px;\n  border-top: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  line-height: 24px;\n  font-weight: bold;\n  background: #888;\n}\n.navbar-main .search-form .search-label:hover, .navbar-main .search-form .search-label.search-focussed {\n  background: #00b9eb;\n  width: 400px;\n}\n.navbar-main .search-form .search-icon {\n  border-bottom-left-radius: 43px;\n  border-top-left-radius: 43px;\n  text-align: center;\n  width: 33px;\n  color: #888;\n}\n.navbar-main .search-form:hover .search-label, .navbar-main .search-form.search-form-focus .search-label {\n  background: #aaa;\n}\n.navbar-main .search-form:hover .search-icon, .navbar-main .search-form.search-form-focus .search-icon {\n  color: #bbb;\n}\n.navbar-main .search-form.search-form-focus .search-control-wrap {\n  max-width: 300px;\n}\n.navbar-main .navbar-titlebar {\n  position: relative;\n  padding: 10px 0 6px;\n}\n.navbar-main .navbar-titlebar .navbar-app-brand {\n  font-size: 14px;\n  text-shadow: 1px 1px 1px #000;\n}\n.navbar-main .navbar-titlebar .navbar-app-brand, .navbar-main .navbar-titlebar .navbar-app-brand:hover, .navbar-main .navbar-titlebar .navbar-app-brand:focus, .navbar-main .navbar-titlebar .navbar-app-brand:active {\n  color: #999;\n  text-decoration: none;\n}\n.navbar-main .navbar-titlebar .navbar-app-brand:hover {\n  color: #fff;\n}\n.navbar-main .navbar-titlebar .navbar-app-title {\n  text-align: center;\n}\n.navbar-main.navbar-login {\n  min-height: 42px;\n  background: #4b4b4b;\n}\n.navbar-main.navbar-login .navbar-titlebar .navbar-app-brand {\n  color: #ccc;\n  text-shadow: none;\n}\n\n.badge-alt {\n  padding: 1px 3px;\n  background-color: #468;\n  font-size: 11px;\n  line-height: 11px;\n}\n\n.sh-range-knob {\n  width: 30px;\n  height: 30px;\n  background: #fff;\n  border-radius: 10px;\n}\n\n.sort-asc:after {\n  content: ' \\25BC';\n}\n\n.sort-desc:after {\n  content: ' \\25B2';\n}\n\n.el-player {\n  position: absolute;\n  bottom: 0;\n  height: 50px;\n  padding: 0 10px;\n  left: 0;\n  width: 100%;\n  background: #141416;\n  border-top: 1px solid #222;\n  -webkit-box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1) inset;\n  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1) inset;\n}\n.el-player .player-time {\n  float: left;\n  color: #888;\n  font-weight: bold;\n  font-size: 12px;\n  font-weight: 700;\n  margin: 15px 12px 0;\n  min-width: 33px;\n  text-align: center;\n}\n.el-player .volume-control {\n  position: relative;\n  margin-top: 4px;\n  height: 40px;\n  margin-left: 10px;\n  padding: 10px 10px;\n  width: 35px;\n  z-index: 10000;\n  background: #141416;\n}\n.el-player .volume-control .volume-bar {\n  position: absolute;\n  left: -9999px;\n  top: -9999px;\n  opacity: 0;\n  filter: alpha(opacity=0);\n  background: rgba(255, 255, 255, 0.06);\n  -moz-border-radius: 10px;\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  height: 0;\n  width: 10px;\n  margin-bottom: 10px;\n  margin-left: 3px;\n  overflow: hidden;\n  border: 1px solid rgba(255, 255, 255, 0.15);\n}\n.el-player .volume-control .volume-bar .volume-bar-range {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  background: #555;\n  height: 0;\n  width: 10px;\n}\n.el-player .volume-control.change-active, .el-player .volume-control:hover {\n  top: -110px;\n  height: 150px;\n}\n.el-player .volume-control.change-active .volume-bar, .el-player .volume-control:hover .volume-bar {\n  opacity: 1;\n  filter: alpha(opacity=100);\n  position: relative;\n  left: 0;\n  top: 0;\n  height: 100px;\n}\n.el-player .player-bar {\n  position: relative;\n  height: 15px;\n  margin-right: 20px;\n  margin-top: 16px;\n  -moz-border-radius: 10px;\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  border: 1px solid #777;\n  background: #242627;\n  margin-left: 100px;\n  overflow: hidden;\n}\n.el-player .player-bar .player-bar-background {\n  position: absolute;\n  top: 0;\n  left: 0;\n  -moz-background-size: 100% 100%;\n  -o-background-size: 100% 100%;\n  -webkit-background-size: 100% 100%;\n  background-size: 100% 100%;\n  opacity: 0.2;\n  filter: alpha(opacity=20);\n  height: 13px;\n  width: 100%;\n}\n.el-player .player-bar .player-bar-range {\n  -webkit-transition: 0.05s linear width;\n  -o-transition: 0.05s linear width;\n  transition: 0.05s linear width;\n  background: #334c58;\n  border-bottom-left-radius: 10px;\n  border-top-left-radius: 10px;\n  -webkit-box-shadow: 0 0 5px 0 #05caff inset;\n  box-shadow: 0 0 5px 0 #05caff inset;\n  height: 13px;\n  width: 0;\n}\n.el-player .player-controls-play, .el-player .player-controls-pause {\n  cursor: pointer;\n  margin: 6px 0 0;\n}\n.el-player .player-controls-back, .el-player .player-controls-forward {\n  margin-top: 8px;\n  cursor: pointer;\n}\n.el-player .player-btn {\n  float: left;\n  color: #888;\n  padding: 5px;\n  margin-top: 0;\n  width: 36px;\n  height: 35px;\n  margin-right: 8px;\n  text-align: center;\n  -moz-border-radius: 18px;\n  -webkit-border-radius: 18px;\n  border-radius: 18px;\n  border: 2px solid #555;\n}\n.el-player .player-btn .icon:before {\n  width: 100%;\n  display: block;\n  text-align: center;\n  font-size: 24px;\n}\n\n.sidebar-artist-info {\n  position: absolute;\n  width: 239px;\n  height: 239px;\n  bottom: 0;\n  left: 0;\n  background: #444 url("+__webpack_require__(123)+") no-repeat center center;\n  -moz-background-size: 100% auto;\n  -o-background-size: 100% auto;\n  -webkit-background-size: 100% auto;\n  background-size: 100% auto;\n  border-top: 1px solid #000;\n}\n.sidebar-artist-info img {\n  max-width: 100%;\n  width: 100%;\n}\n\n.avatar-settings {\n  -webkit-transition: 0.2s ease-in-out all;\n  -o-transition: 0.2s ease-in-out all;\n  transition: 0.2s ease-in-out all;\n  margin-top: -35px;\n  width: 30px;\n  height: 30px;\n  -webkit-box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.3);\n  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.3);\n  -moz-border-radius: 30px;\n  -webkit-border-radius: 30px;\n  border-radius: 30px;\n}\n.avatar-settings:hover {\n  -webkit-box-shadow: 0 0 0 3px rgba(21, 122, 191, 0.5), 0 -4px 1px 0 rgba(0, 0, 0, 0.6), 0 2px 0 0 rgba(255, 255, 255, 0.2);\n  box-shadow: 0 0 0 3px rgba(21, 122, 191, 0.5), 0 -4px 1px 0 rgba(0, 0, 0, 0.6), 0 2px 0 0 rgba(255, 255, 255, 0.2);\n}\n\n.sidebar-wrapper {\n  position: fixed;\n  left: 0;\n  z-index: 1000;\n  border-right: 2px solid #141414;\n  background: #181818;\n  width: 240px;\n  bottom: 50px;\n  top: 85px;\n  padding-right: 2px;\n}\n\n.sidebar {\n  display: block;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 240px;\n  position: absolute;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.sidebar::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n.sidebar::-webkit-scrollbar-thumb {\n  border-right-width: 0;\n}\n.sidebar .sidebar-full {\n  position: relative;\n}\n.sidebar .sidebar-scroll {\n  padding: 20px 20px 20px 11px;\n}\n.sidebar hr {\n  margin-right: 0 20px;\n}\n.sidebar .navbar-section-header {\n  color: #555555;\n  font-weight: 400;\n  font-size: 11px;\n  text-transform: uppercase;\n  margin-top: 30px;\n}\n.sidebar .navbar-top-header {\n  margin-top: 0;\n}\n.sidebar .navbar-btn {\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n.sidebar .nav-sidebar {\n  margin-left: -11px;\n  margin-right: -20px;\n}\n.sidebar .nav-sidebar > li > a {\n  position: relative;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.sidebar .nav-sidebar > li > a.navEditing {\n  text-overflow: clip;\n}\n.sidebar .nav-sidebar > li > a .icon {\n  position: absolute;\n  left: 15px;\n  top: 7px;\n  font-size: 16px;\n}\n.sidebar .nav-sidebar > li > a, .sidebar .nav-sidebar > li > a:hover, .sidebar .nav-sidebar > li > a:focus {\n  background: none;\n  padding-left: 40px;\n  border-left: 2px solid #181818;\n  padding-top: 7px;\n  padding-bottom: 6px;\n  font-size: 13px;\n  color: #777777;\n}\n.sidebar .nav-sidebar > li.active > a {\n  background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjAuNSIgeDI9IjEuMCIgeTI9IjAuNSI+PHN0b3Agb2Zmc2V0PSI5NyUiIHN0b3AtY29sb3I9IiNmZmZmZmYiIHN0b3Atb3BhY2l0eT0iMC4wNSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIwLjAxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');\n  background: -webkit-gradient(linear, 0% 50%, 100% 50%, color-stop(97%, rgba(255, 255, 255, 0.05)), color-stop(100%, rgba(255, 255, 255, 0.01)));\n  background: -moz-linear-gradient(left, rgba(255, 255, 255, 0.05) 97%, rgba(255, 255, 255, 0.01));\n  background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0.05) 97%, rgba(255, 255, 255, 0.01));\n  background: linear-gradient(to right, rgba(255, 255, 255, 0.05) 97%, rgba(255, 255, 255, 0.01));\n  border-color: #157abf;\n  color: #eee;\n}\n\n.sh-dropdown:after {\n  content: '\\25BC';\n  font-size: 10px;\n  line-height: 20px;\n}\n\n.sh-selectable:focus, .sh-selectables:focus {\n  outline: none;\n}\n\n@media (max-width: 767px) {\n  .navbar-main .navbar-nav-tabs:before, .navbar-main .navbar-nav-tabs:after {\n    content: \" \";\n    display: table;\n  }\n  .navbar-main .navbar-nav-tabs:after {\n    clear: both;\n  }\n  .navbar-main .navbar-nav-tabs li {\n    float: left;\n  }\n}\n@media (min-width: 500px) {\n  .login-page .login-container {\n    padding-top: 30px;\n    background: rgba(0, 0, 0, 0.2);\n    width: 300px;\n    margin: 0 auto;\n  }\n  .login-page .login-main-btn {\n    position: relative;\n    top: auto;\n    left: auto;\n    bottom: auto;\n    right: auto;\n    margin-top: 20px;\n  }\n}\n@keyframes fading {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes fading {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes rotate {\n  0% {\n    border-width: 10px;\n  }\n  25% {\n    border-width: 3px;\n  }\n  50% {\n    transform: rotate(115deg);\n    -ms-transform: rotate(115deg);\n    -webkit-transform: rotate(115deg);\n    border-width: 10px;\n  }\n  75% {\n    border-width: 3px;\n  }\n  100% {\n    border-width: 10px;\n  }\n}\n@-webkit-keyframes rotate {\n  0% {\n    border-width: 10px;\n  }\n  25% {\n    border-width: 3px;\n  }\n  50% {\n    transform: rotate(115deg);\n    -ms-transform: rotate(115deg);\n    -webkit-transform: rotate(115deg);\n    border-width: 10px;\n  }\n  75% {\n    border-width: 3px;\n  }\n  100% {\n    border-width: 10px;\n  }\n}\n", ""]);

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(44);
	/* WEBPACK VAR INJECTION */(function(angular) {/**
	 * TODO:
	 *   - Add vertical resize support
	 *   - Rename to shPanel when panel options are done
	 *   - Add ability to stretch to element via absolute positioning
	 */
	(function () {
	  
	  (module.exports['shava.directives.columns.columnDirective'] = angular.module('shava.directives.columns.columnDirective', [
	    'shava.directives.columns'
	  ]))

	    .directive('shColumn', shColumn);

	  shColumn.$inject = ['$document', '$window', '$parse', '$timeout'];

	  function shColumn($document, $window, $parse, $timeout) {
	    return {
	      restrict: 'A',
	      require: '^shColumns',
	      scope: true,
	      link: function shColumnLinker(scope, element, attrs, shColumns) {

	        var $model = $parse(attrs.shColumnModel);

	        // Store data here about the element
	        var thEl = {};

	        var $body = angular.element($window.document.body);
	        var init = false;

	        // Default options
	        var defs = {
	          min: 54,
	          max: 500,
	          distance: 10,
	        };

	        var opts = $parse(attrs.shColumn);

	        thEl.element = element;
	        thEl.scope = scope;
	        thEl.model = $model;
	        
	        setOpts(opts(scope));

	        // If last option is set, the element will be ignored
	        if (! thEl.opts.hasOwnProperty('last') || ! thEl.opts.last) {
	          element.on('mousedown.shColumnsColumn', function (e) {
	            var rwidth, rleft, newWidth, winLength;

	            if (shColumns.$resizing || shColumns.$resizeEl == null) {
	              return;
	            }

	            shColumns.$resizing = true;
	            rwidth = shColumns.$resizeEl.element.outerWidth();
	            rleft = e.clientX;
	            winLength = $window.screen.availWidth - 1;

	            $body.addClass('col-resize');
	            $document.one('mouseup.shColumnsColumn', finishResize);
	            $document.one('mouseleave.shColumnsColumn', finishResize);
	            $document.on('mousemove.shColumnsColumn', function (e) {
	              if (shColumns.$resizing) {
	                newWidth = (rwidth + (e.clientX - rleft));
	                newWidth = Math.min(shColumns.$resizeEl.opts.max, Math.max(shColumns.$resizeEl.opts.min, newWidth));
	                shColumns.setWidth(shColumns.$resizeEl, newWidth);
	                return;
	              }
	            });
	          });

	          element.on('mousemove.shColumnsColumn', mouseMove);
	          element.on('mouseleave.shColumnsColumn', function () {
	            if (! shColumns.$resizing && shColumns.$resizeEl) {
	              shColumns.$resizeEl = null;
	              element.removeClass('col-resize');
	            }
	          });
	        }

	        scope.$on('$destroy', function () {
	          element.off('.shColumnsColumn');
	          $document.off('.shColumnsColumn');
	        });

	        function setOpts(opts) {
	          thEl.opts = angular.extend({}, defs, opts);
	            
	          if (! init) {
	            init = true;
	            shColumns.addElement(thEl);
	          }
	        }

	        function mouseMove(e) {
	          var s, left, width, before;

	          if (shColumns.$resizing) return;

	          left = element.offset().left;
	          width = element.outerWidth();
	          before = e.clientX >= left + width - thEl.opts.distance ? 0
	            : false;

	          if (before !== false && shColumns.$resizeEl == null) {
	            shColumns.$resizeEl = shColumns.getElement(thEl, before);
	            element.addClass('col-resize');
	          }
	          else if (before === false && shColumns.$resizeEl === thEl) {
	            shColumns.$resizeEl = null;
	            element.removeClass('col-resize');
	          }
	        }

	        function finishResize(e) {
	          $document.off('mousemove.shColumnsColumn');
	          $document.off('mouseup.shColumnsColumn');
	          $document.off('mouseleave.shColumnsColumn');
	          shColumns.$resizeEl = null;
	          shColumns.$resizing = false;
	          element.removeClass('col-resize');
	          $body.removeClass('col-resize');
	          $timeout(function () {
	            shColumns.finishCallback();
	          });
	        }
	      }

	    }
	  }
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.directives.columns.columnsController'] = angular.module('shava.directives.columns.columnsController', []))

	    .controller('ShColumnsController', ShColumnsController);

	  ShColumnsController.$inject = ['$rootScope', '$element', '$parse', '$timeout', '$scope', '$attrs'];

	  function ShColumnsController($rootScope, $element, $parse, $timeout, $scope, $attrs) {
	    var self = this, elements = [];

	    var totalWidth = 0;

	    self.addElement = addElement;
	    self.reset = reset;
	    self.getElement = getElement;
	    self.setWidth = setWidth;
	    self.finishCallback = finishCallback;
	    self.opts = {};

	    reset();

	    self.callback = $attrs.shColumnsCallback
	      ? $parse($attrs.shColumnsCallback)
	      : null;

	    $scope.$watch($attrs.shColumns, function (value) {
	      self.opts = angular.extend({}, value);
	    });

	    function addElement(elObj) {
	      elements.push(elObj);

	      if (! elObj.opts.last) {
	        if (angular.isDefined(elObj.model)) {
	          setWidth(elObj, elObj.model(elObj.scope));
	        }
	        else {
	          setWidth(elObj, elObj.element.outerWidth());
	        }
	      }
	      else {
	        setWidth(elObj, 'auto');
	      }

	      reset();
	    }

	    function reset() {
	      self.$resizeEl = null;
	      self.$resizing = false;
	    }

	    function finishCallback() {
	      if (self.callback != null) {
	        self.callback($scope);
	      }
	    }

	    function setWidth(elObj, width) {
	      $timeout(function(){

	        if (elObj.opts.last) { return true; }
	        else if (width > elObj.opts.max) { elObj.model.assign(elObj.scope, elObj.opts.max); }
	        else if (width < elObj.opts.min) { elObj.model.assign(elObj.scope, elObj.opts.min); }
	        else { elObj.model.assign(elObj.scope, width); }
	        $rootScope.$broadcast('shava:resize');
	      });
	    }

	    function getElement(element, offset) {
	      var index = elements.indexOf(element);

	      if (index !== -1) {
	        return elements[Math.max(index + offset, 0)];
	      }
	      else {
	        return null;
	      }
	    }

	    return self;
	  }
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(107);
	__webpack_require__(47);
	__webpack_require__(98);
	__webpack_require__(97);
	/* WEBPACK VAR INJECTION */(function(angular) {/* jshint strict:true */
	/* global angular:true, _:true */

	/**
	 * TODO:
	 *   - Add shift support
	 *   - Add ctrl support
	 *   - Add left/right support
	 */
	(function () {
	  
	  'use strict';
	  
	  (module.exports['shava.directives.selectables.selectablesController'] = angular.module('shava.directives.selectables.selectablesController', [
	    'shava.directives.selectables.selectableDirective',
	    'shava.directives.selectables.selectables',
	    'shava.directives.selectables',
	    'shava.services.util.watchChange'
	  ]))

	    .controller('ShSelectablesController', selController);

	  selController.$inject = [
	    
	    // module: shava.services.util.watchChange
	    '$$watch',    
	    
	    // module: shava.directives.selectables.selectables
	    // 'shSelectables',
	    
	    // module: ng
	    '$element',
	    '$parse',
	    '$scope',
	    '$timeout'
	  
	  ];

	  function selController(
	    $$watch,
	    // shSelectables,
	    $element,
	    $parse,
	    $scope,
	    $timeout
	  ) {
	    
	    /* jshint validthis:true */
	    
	    var undef
	      , selfCtrl
	      , lastActiveObject
	      , elements
	      , scroller
	      , selectRange;

	    // Constants
	    var SH_SELECTABLE_OBJECT = '$$shSelectableObject';
	    
	    // A reference to our controller
	    selfCtrl = this;
	    
	    // A scrollarea controller
	    scroller = null;

	    // The last object selected via gesture or keydown and up
	    // with alt, metaKey, ctrlKey, or shiftKey down
	    lastActiveObject = null;

	    // Elements associated with each object will go here
	    elements = [];

	    // Setup element
	    setupElementBindings();

	    // Controller defaults
	    angular.extend(selfCtrl, {

	      // Keys to be logged on keydown to handle user selections
	      metaKey: false,
	      shiftKey: false,
	      altKey: false,

	      // Register objects
	      registerObject: registerObject,
	      
	      // This is for scrolling support, for libraries
	      // such as shava.directives.scrollArea
	      setScroller: setScroller
	    });

	    // This exposes the array your elements created
	    // through the directives. It contains all your objects.
	    $scope.opts.all = [];
	    
	    angular.extend($scope.opts, {

	      // Optional bool (def: false) `toggleSelect` option allows the user to make multiple
	      // selections with the `selectEvent` without holding the ctrlKey/metaKey
	      toggleSelect: ($scope.opts.toggleSelect !== undef ? !!$scope.opts.toggleSelect : false),

	      // Optional function|string (def: UNDEFINED) `onSelect` is the callback for selections
	      // Accepts a function which will be given a callback with `($object, $selected)`
	      // `$object` being the object changed, and $selected will be `true` or `false`
	      // Also accepts a string to be parsed as an angular expression with locals `($object, $selected)`
	      onSelect: ($scope.opts.onSelect !== undef ? $scope.opts.onSelect : undef),
	  
	      bindVertical: ($scope.opts.bindVertical !== undef ? !!$scope.opts.bindVertical : true),

	      bindHorizontal: ($scope.opts.bindHorizontal !== undef ? !!$scope.opts.bindHorizontal : false),

	      useScroller: ($scope.opts.useScroller !== undef ? !!$scope.opts.useScroller : true),

	      // Optional array (def: []) `selected` option will be exposed to your scope via `scope.opts.selected`
	      // containing an array of the selected object references. You may set this array if `watch`
	      // option is enabled or at initialisation to change the selected objects at any time.
	      selected: (angular.isArray($scope.opts.selected) ? $scope.opts.selected : []),

	      // Optional bool (def: true) `toggleable` option if enabled allows items to be toggleable
	      toggleable: ($scope.opts.toggleable !== undef ? !!$scope.opts.toggleable : true),

	      // Optional bool (def: true) `watch` option if enabled, it will watch the attributes for
	      // changes in your `shSelectable` directive, this should be used if you are
	      // manipulating the array of objects. This is on by default but if you are
	      // using a one-time binding you should tick this off for performance
	      watch: (($scope.opts.watch !== undef) ? !!$scope.opts.watch : true),

	      // Optional bool (def: true) `keyboardNavigation` option to allow keyboard up and down navigation
	      keyboardNavigation: (($scope.opts.keyboardNavigation !== undef) ? $scope.opts.keyboardNavigation : true),

	      // Optional string (def: 'click') `selectEvent` option determines what event on the
	      // `shSelectable` directive's element triggers the selection
	      selectEvent: ($scope.opts.selectEvent !== undef ? $scope.opts.selectEvent : 'click'),
	      
	      // Optional bool (def: true) `alwaysOne` option if enabled forces one element to be selected at all times
	      alwaysOne: (($scope.opts.alwaysOne !== undef) ? !!$scope.opts.alwaysOne : false),
	      
	      // Optional bool (def: true) `multi` option allows multiple selections, on by default
	      multi: (($scope.opts.multi !== undef) ? !!$scope.opts.multi : true)

	    });

	    // Watch for adds and removes on selected and call the callback
	    //
	    // TODO: angular 1.3 has $watchGroup([], callback(newValues, oldValues, scope))
	    //       upgrade later.
	    //
	    $$watch($scope, function () { return $scope.opts.selected; }, function (adds, removes, newValue) {
	      // Emit callback as selected
	      if (adds.length > 0) {
	        angular.forEach(adds, function (obj) { cb(obj, true); });
	      }

	      // Emit callback as removed
	      if (removes.length > 0) {
	        angular.forEach(removes, function (obj) { cb(obj, false); });
	      }

	      // This option requires one object to be selected always
	      if ($scope.opts.alwaysOne) {
	        autoSelectObject(newValue);
	      }
	    });

	    // On destroy
	    $scope.$on('$destroy', function(){
	      angular.forEach($scope.opts.selected, function(obj){
	        cb(obj, false);
	      });
	    });

	    // Auto select an object if the selected object was removed
	    function autoSelectObject(selected) {
	      if (selected.length > 0 && $scope.opts.all.length > 0) {

	      }
	    }

	    // Select an object or toggle it
	    function handleObjectSelection(obj, toggle) {
	      if (! $scope.opts.multi) {
	        if (toggle && $scope.opts.selected[0] === obj) {
	          $scope.opts.selected.splice(0, 1);
	        }
	        else {
	          $scope.opts.selected[0] = obj;
	          cb(obj, true);
	        }
	        
	        return true;
	      }

	      var i = $scope.opts.selected.indexOf(obj);

	      // Check that object doesn't existence to avoid duplicates
	      if (!~i) {
	        cb(obj, true);
	        $scope.opts.selected.push(obj);
	        return true;
	      }

	      // If `toggle` is set, we remove the object when
	      // it is already selected. The `toggle` will be 
	      // passed usually as metaKey/ctrlKey
	      else if (toggle) {
	        cb(obj, false);
	        $scope.opts.selected.splice(i, 1);
	        return true;
	      }
	    }
	  
	    // Get the elements associated object
	    function getElementObject(element) {
	      return $scope.opts.all[element.data(SH_SELECTABLE_OBJECT)];
	    }

	    // Set elements associated object
	    function setElementObject(element, index, object) {
	      $scope.opts.all[index] = object;
	      elements[index] = angular.element(element);
	      element.data(SH_SELECTABLE_OBJECT, index);
	      return object;
	    }

	    // The `shSelectable` directives linker
	    function registerObject(scope, selectableChildEl) {
	      if (!!$scope.opts.watch || !!scope.shSelectableWatch) {

	        // If watch option is set, watch for changes in object index
	        scope.$watchCollection(function () { return [scope.shSelectable, scope.shSelectableObject]; },
	        function (newVal, oldVal) {
	          // Reset the element's object mapping
	          setElementObject(selectableChildEl, newVal[0], newVal[1]);        
	        });

	      }
	      else {
	        // Set element to object mapping
	        setElementObject(selectableChildEl, scope.shSelectable, scope.shSelectableObject);
	      }

	      // The `shSelectable` child
	      selectableChildEl

	        // Add generic class for styling associated
	        // with the `shSelectable` directive
	        .addClass('sh-selectable')

	        // Tab index is -999 so the object can listen for
	        // keypresses and be focussable
	        .attr('tabIndex', '-999')

	        // Bind the `selectEvent` option which defaults to `click`
	        .on($scope.opts.selectEvent, onSelectableSelect.bind(selectableChildEl))
	        
	        // Select on right clicks
	        .on('contextmenu', onSelectableContextMenu.bind(selectableChildEl));
	        
	        // `shSelectable` directive scope
	        // Bind the `shSelectable` children
	        scope.$on('$destroy', function () {
	          deregisterObject(scope, selectableChildEl);
	        });
	    }

	    // Clean up the `shSelectable` directives removal
	    function deregisterObject(scope, element) {
	      var index = $scope.opts.all.indexOf(scope.shSelectableObject)
	        , selectedIndex = $scope.opts.selected.indexOf(scope.shSelectableObject);

	      if (~selectedIndex) {
	        $scope.opts.selected.splice(selectedIndex, 1);
	      }

	      if (~index) {
	        $scope.opts.all.splice(index, 1);
	        elements.splice(index, 1);
	      }

	      cb(scope.shSelectableObject, false);
	    }
	    
	    // Get object index from `all` option array
	    function getObjectIndex(obj) {
	      return $scope.opts.all.indexOf(obj);
	    }
	    
	    // Get's the index of the last selected object from user navigation
	    function getLastActiveObjectIndex() {
	      var index = getObjectIndex(getLastActiveObject());
	      return ~index ? index : 0;
	    }

	    // The last selected object by clicking or key navigation
	    function getLastActiveObject() {

	      // This returns the last active object from
	      // click or key navigation selection
	      return lastActiveObject;
	    }

	    // `shSelectable` directive's select event, this is emitted
	    // on the `selectEvent` option and defaults to `click`
	    function onSelectableSelect(e) {
	      var obj = getElementObject(this);

	      runSelectEvent(e, obj, true);
	    }

	    // `shSelectable` directive's `contextMenu` binding
	    // to select on right clicks with possible keys down
	    function onSelectableContextMenu(e) {
	      // Pass `contextMenu` to directive `selectEvent`
	      onSelectableSelect.call(this, e);
	    }

	    // Select an array of objects.
	    function setSelected(selected, toggle, clear) {
	      // Clear unless toggling (via ctrlKey/metaKey)
	      if (clear || (! $scope.opts.toggleSelect && (! $scope.opts.toggleable || ! toggle))) {
	        $scope.opts.selected.splice(0, $scope.opts.selected.length);
	      }

	      // Let's assume selected may not be an array
	      // and just skip selection in this case
	      if (angular.isArray(selected) && selected.length !== 0) {

	        // Select each object in the `selected` argument array
	        angular.forEach(selected, function (object) {  
	          handleObjectSelection(object, $scope.opts.toggleable && toggle || $scope.opts.toggleSelect);
	        });
	      }

	      if (! $scope.$$phase) $scope.$apply();

	      // bool Passed
	      return true;
	    }

	    // Handle the offset
	    function getEventDirection(e) {
	      if ($scope.opts.bindVertical) {
	        // Bind `up` to previous
	        if (e.which === 38) {
	          return -1;
	        }

	        // Bind `down` to next
	        else if (e.which === 40) {
	          return 1;
	        }
	      }

	      if ($scope.opts.bindHorizontal) {
	        // Bind `left` to previous
	        if (e.which === 37) {
	          return -1;
	        }

	        // Bind `right` to next
	        else if (e.which === 39) {
	          return 1;
	        }
	      }
	    }

	    function updateCtrlKeys(e) {
	      selfCtrl.shiftKey = e.shiftKey;
	      selfCtrl.metaKey = e.metaKey || e.ctrlKey;
	      selfCtrl.altKey = e.altKey;      
	    }

	    // Runs the finalized selection actions
	    function runSelectEvent(e, obj, updateKeys) {
	      if (updateKeys && e !== undef) {
	        // Persist keydown/keyup
	        updateCtrlKeys(e);
	      }

	      if ($scope.opts.multi && selfCtrl.shiftKey) {
	        var lastIndex = getLastActiveObjectIndex()
	          , thisIndex = $scope.opts.all.indexOf(obj)
	          , arr;

	        if (~thisIndex && lastIndex > thisIndex) {
	          setSelected($scope.opts.all.slice(thisIndex, lastIndex + 1), false);
	        }
	        else {
	          setSelected($scope.opts.all.slice(lastIndex, thisIndex + 1), false);
	        }
	      }
	      else {
	        // Set last active object
	        lastActiveObject = obj;

	        // Set selections for non range
	        setSelected([ obj ], selfCtrl.metaKey);
	      }

	      elements[ $scope.opts.all.indexOf(obj) ].focus();
	    }

	    function setupElementBindings() {
	      if ($element) {
	        $element
	          .on('keydown', onKeydown)
	          .on('keyup', onKeyup);
	      }
	    }

	    function onKeydown(e) {
	      var index = getLastActiveObjectIndex();
	      var nextObj = index + getEventDirection(e);


	      if ($scope.opts.all[nextObj] !== undef) {
	        e.preventDefault();
	        if (scroller) scroller.scrollTo(elements[nextObj]);
	        runSelectEvent(e, $scope.opts.all[nextObj], true);
	      }
	    }

	    function onKeyup(e) {
	      updateCtrlKeys(e);
	    }

	    function setScroller(scrollerController) {
	      if ($scope.opts.useScroller) {
	        scroller = scrollerController;
	      }
	    }

	    function cb(obj, selected) {
	      if (angular.isFunction($scope.opts.onSelect)) {
	        $scope.opts.onSelect(obj, selected);
	      } else if (angular.isString($scope.opts.onSelect)) {
	        $parse($scope.opts.onSelect)($scope.$parent, { $selected: selected, $object: obj });
	      }
	    }
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(114);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.directives.scrollarea'] = angular.module('shava.directives.scrollarea', [
	    'shava.directives.scrollarea.scrollareaController'
	  ]))

	    .directive('shScrollarea', scrollerDirective);

	  function scrollerDirective() {
	    return {
	      restrict: 'A',
	      controller: 'ShScrollareaController',
	      link: function (scope, element, attrs, ctrl) {
	        attrs.$observe('shScrollarea', function (value) {
	          ctrl.setBodySpacing(value);
	        });
	      }
	    };
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(95);
	__webpack_require__(47);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.selectables.selectableDirective'] = angular.module('shava.directives.selectables.selectableDirective', [
	    'shava.directives.selectables',
	    'shava.directives.selectables.selectablesController'
	  ]))

	    .directive('shSelectable', shSelectable);

	  shSelectable.$inject = ['$document'];

	  function shSelectable($document) {

	    return {
	      restrict: 'A',
	      require: '^shSelectables',
	      link: { post: shSelectableLinker },
	      scope: {
	        'shSelectable': '=shSelectable',
	        'shSelectableObject': '=shSelectableObject',
	        'shSelectableWatch': '=shSelectableWatch',
	      }
	    };

	    function shSelectableLinker(scope, element, attrs, shSelectables) {
	      shSelectables.registerObject(scope, element, attrs);
	    }

	  }
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.selectables.selectables'] = angular.module('shava.directives.selectables.selectables', []))

	    .service('shSelectables', shSelectables);

	  function shSelectables() {
	    var undef;

	    this.$selectedCtrl = null;
	    this.$setSelectedCtrl = $setSelectedCtrl;
	    this.$focusCtrl = $focusCtrl;
	    this.$isSelectedCtrl = $isSelectedCtrl;
	    this.$registerCtrl = $registerCtrl;
	    this.$unregisterCtrl = $unregisterCtrl;
	    this.$$createIndex = $$createIndex;
	    this.$controllers = {};

	    function $registerCtrl(id, ctrl, index) {
	      // No need to register controllers with no ID
	      if (id === undef) {
	        return false;
	      }

	      if (this.$controllers[id] === undef) {
	        this.$controllers[id] = {
	          $$index: 0,
	          controllers: []
	        };
	      }

	      ctrl.$index = index || this.$$createIndex(id);
	      this.$controllers[id].controllers.push(ctrl);
	    }

	    function $focusCtrl(ctrl, firstOrLast) {
	      ctrl.$element.focus();

	      // first
	      if (firstOrLast) {
	        ctrl.selectFirst();
	      }
	      // last
	      else {
	        ctrl.selectLast();
	      }
	    }

	    function $$createIndex(id) {
	      if (id !== undef && this.$controllers[id] !== undef) {
	        return this.$controllers[id].$$index++;
	      }

	      return undef;
	    }

	    function $unregisterCtrl(id, ctrl) {
	      if (id !== undef && this.$controllers[id] !== undef) {
	        var ind = this.$controllers[id].indexOf(ctrl);
	        if (ind !== -1) {
	          this.$controllers[id].splice(ind, 1);
	        }
	      }

	      if (this.$selectedCtrl === ctrl) {
	        this.$selectedCtrl = null;
	      }
	    }

	    function $isSelectedCtrl(ctrl) {
	      return this.$selectedCtrl === ctrl;
	    }

	    function $setSelectedCtrl(ctrl) {
	      this.$selectedCtrl = ctrl;
	    }

	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.undoStack.undoStack'] = angular.module("shava.directives.undoStack.undoStack", []))

	    .factory("undoStackFactory", undoStackFactory);

	    undoStackFactory.$inject = ["$rootScope"];

	    function undoStackFactory($rootScope){
	      
	      function UndoStack() {

	      }

	      UndoStack.prototype = {

	      };

	      var undoStackFactory = {
	        $current: undoStackFactory.create(),

	        create: function (scope) {
	          return new UndoStack(scope || $rootScope);
	        },

	        remove: function () {

	        },
	        
	        get: function () {
	          return undoStackFactory.$current;
	        },
	        
	        set: function (stack) {
	          undoStackFactory.$current = stack;
	          return undoStackFactory;
	        }
	      };

	      return undoStackFactory;
	    }
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.focusable.focusable'] = angular.module('shava.directives.focusable.focusable', []))

	    .provider('shFocusableFactory', focusableFactoryProvider);

	  focusableFactoryProvider.$inject = [];
	  function focusableFactoryProvider() {
	    var defaults = {
	      overrideTab: true
	    };

	    function config(config) {
	      angular.extend(defaults, config);
	    }

	    focusableFactory.$inject = [];

	    function focusableFactory() {
	      
	    }

	    return {
	      $get: focusableFactory,
	      defaults: config
	    };

	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(50);
	__webpack_require__(100);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.focusable.focusableController'] = angular.module('shava.directives.focusable.focusableController', [
	    'shava.directives.focusable.focusable',
	    'shava.directives.focusable'
	  ]))

	  .controller('ShFocusableController', ShFocusableController);

	  ShFocusableController.$inject = ["focusableFactory"];
	  function ShFocusableController(focusableFactory) {
	    
	  }
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.range.rangeSliderDirective'] = angular.module('shava.directives.range.rangeSliderDirective', []))

	    .directive("shRangeSlider", ["$parse", function(){
	      return {
	        restrict: 'AC',
	        require: '^shRange',
	        scope: {
	          opts: '='
	        },
	        replace: true,
	        transclude: true,
	        template: '<div ng-style="playerStyle"><div ng-transclude></div></div>',
	        link: function (scope, element, attrs, RangeCtrl) {   
	          var cssProp;

	          scope.playerStyle = {};

	          cssProp = attrs.shRangeSlider === "vertical" ? "height" : "width";

	          scope.playerStyle[cssProp] = 0;
	          
	          scope.$watch(RangeCtrl.getRange, function(val){
	            scope.playerStyle[cssProp] = (((val / RangeCtrl.opts.max)*100) + '%');
	          });

	          RangeCtrl.initialize(cssProp);
	        }
	      };
	    }]);
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	__webpack_require__(104);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.sorter.sorterItemDirective'] = angular.module('shava.directives.sorter.sorterItemDirective', [
	    'shava.directives.sorter.sorterController',
	    'shava.directives.sorter'
	  ]))
	    .directive('shSorterItem', sorterItem);

	  sorterItem.$inject = ['$document', '$timeout'];

	  function sorterItem($document, $timeout) {
	    return {
	      restrict: 'A',
	      require: '^shSorter',
	      link: function (scope, element, attrs) {
	        element.attr('draggable', true);

	        element.on('draggesture dragstart', function (ev) {
	          var dt = ev.originalEvent.dataTransfer;
	          var el = document.createElement('span');

	          element.trigger($.Event('dragClick', {
	            shiftKey: ev.shiftKey,
	            metaKey: ev.metaKey,
	            ctrlKey: ev.ctrlKey
	          }));

	          el.innerHTML = scope.$eval(attrs.shSorterItem);
	          el.id = 'shDragLabelEl';
	          el.className = 'sh-drag-label';

	          $document[0].body.appendChild(el);
	          dt.effectAllowed = 'copyMove';
	          dt.setDragImage(el, -20, 0);          
	        });

	        element.on('dragend', function (ev) {
	          document.getElementById('shDragLabelEl').remove();
	        });

	      }
	    };
	  }
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.sorter.sorterController'] = angular.module('shava.directives.sorter.sorterController', []))
	    .controller('ShSorterController', SorterController);

	  function SorterController() {
	  }
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.nav.navValueDirective'] = angular.module('shava.directives.nav.navValueDirective', []))

	    .directive('shNavValue', shNavValue);

	  function shNavValue() {
	    return {
	      restrict: 'A',
	      replace: true,
	      transclude: true,
	      require: '^shNav',
	      scope: {
	        shNavValue: '=',
	        shNavCb: '&'
	      },
	      template: '<li ng-mousedown="selectValue(shNavValue, true)" ng-class="{active: shNav.curValue === shNavValue}" ng-transclude></li>',
	      link: function (scope, element, attrs, ShNavController) {
	        var oldVal;

	        scope.shNav = ShNavController;

	        scope.clearSelection = function () {
	          ShNavController.setValue(null);
	        };

	        scope.restoreSelection = function () {
	          ShNavController.setValue(oldVal);
	        };

	        scope.selectValue = function (value, clicked) {
	          ShNavController.setValue(value, clicked);
	        };

	      }
	    };
	  }
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.directives.nav.navController'] = angular.module('shava.directives.nav.navController', []))

	    .controller('ShNavController', ShNavController)


	  ShNavController.$inject = ['$scope', '$attrs', '$parse'];

	  function ShNavController($scope, $attrs, $parse) {
	    var valueVar = $attrs.shNav
	      , defaultVar = $attrs.shNavDefault
	      , cb = $attrs.shNavChanged
	      , self = this
	      , v;

	    this.curValue = null;

	    $scope.$watch($attrs.shNav, function (value) {
	      self.curValue = value;       
	    });

	    this.setValue = function (value, clicked) {
	      if (cb != null) {
	        $parse(cb)($scope, { $value: value, $clicked: true });
	      }
	      $parse('(' + valueVar + '= value)')($scope, { value: value });
	    };

	    this.getValue = function () {
	      return $parse(defaultVar)($scope);
	    };

	    if ($attrs.shNavDefault != null && this.getValue() == null) {
	      v = $parse(defaultVar)($scope);
	      this.setValue(v != null ? v : $attrs.shNavDefault);
	      v = null;
	    }
	  }
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  var _ = __webpack_require__(120);

	  (module.exports['shava.services.util.watchChange'] = angular.module('shava.services.util.watchChange', []))

	    .provider('$$watch', watchChangeProvider);

	  watchChangeProvider.$inject = [];

	  function watchChangeProvider() {
	    var provider = {};

	    provider.$get = watchChangeFactory;
	    watchChangeFactory.$inject = ['$rootScope'];

	    function watchChangeFactory($rootScope) {
	      function watchChange() {
	        var scope, watch, change, args;

	        args = Array.prototype.slice.call(arguments);

	        switch (args.length) {
	          case 3:
	            scope = args[0];
	            watch = args[1];
	            change = args[2];
	            break;
	          default:
	            scope = $rootScope;
	            change = args[2];
	            watch = args[1];
	            break;
	        }

	        function watcher(newVal, oldVal) {
	          if (! angular.isArray(newVal)) return;

	          oldVal = oldVal !== newVal && angular.isArray(oldVal) ? oldVal : [];

	          var adds = _.difference(newVal, oldVal)
	            , removes = _.difference(oldVal, newVal);

	          change(adds, removes, newVal, oldVal);
	        }

	        return scope.$watchCollection(watch, watcher);

	      }

	      return watchChange;
	      
	    }

	    return provider;
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  
	  (module.exports['shava.services.util.jquery'] = angular.module('shava.services.util.jquery', []))

	    .factory('$jQuery', shavaJquery);

	  shavaJquery.$inject = ['$window'];

	  function shavaJquery($window) {
	    return ($window['jQuery'] || $window['$']);
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(72);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  var EventEmitter = __webpack_require__(112).EventEmitter;
	  var Immutable = __webpack_require__(113);
	  var _ = __webpack_require__(120);

	  (module.exports['shava.services.store'] = angular.module('shava.services.store', [
	    'shava.services.dispatcher'
	  ]))
	    .factory('$store', [
	             '$dispatcher', '$window', '$timeout', '$injector', '$rootScope',
	    function ($dispatcher,   $window,   $timeout,   $injector,   $rootScope) {
	      var stores = {};

	      function storeFactory(name, contents){
	        if (! stores.hasOwnProperty(name)) {
	          stores[name] = new Store(name, contents);
	        }

	        if (contents == null) {
	          throw new Error("No store \"" + name + "\" loaded.");
	        }

	        return stores[name];
	      }

	      function contentFactory(contents) {
	        contents = Immutable.fromJS(contents);
	      }

	      storeFactory.get = function (storeService) {        
	        if (! stores.hasOwnProperty(name)) {
	          return $injector.invoke([storeService, function(store){
	            return store;
	          }]);
	        }

	        return stores[name];
	      };

	      storeFactory.bind = function (name, scope) {
	        var store = storeFactory.get(name);

	        if (store == null) {
	          throw new Error('Failed to find store with name "' + name + '"');
	        }

	        store.$registerScope(scope);
	      };

	      storeFactory.use = function () {
	        var res = [], i = 0;

	        for (; i < arguments.length; i++) {
	          res.push(storeFactory.get(arguments[i]).$dispatchToken);
	        }

	        return $dispatcher.waitFor(res);
	      };

	      function Store(name, contents) {
	        var prop, hasProp, setterFn
	          , getState, self = this;

	        this.name = 'Store';
	        this.$name = name;
	        this.$actions = {};
	        this.$dispatchToken = $dispatcher.register(function(payload){
	          self.$$dispatchPropagater(payload);
	        });

	        for (prop in contents) {
	          if (contents.hasOwnProperty(prop)) {
	            this[prop] = contents[prop];
	          }
	        }

	        getState = this.getState

	        this.$$dispatchPropagater = function (payload) {
	          if (this.$actions.hasOwnProperty(payload.actionType)) {
	            this.$actions[payload.actionType].call(this, payload);
	          }
	        };

	        this.$registerScope = function (scope) {
	          var self = this;
	          
	          if (scope.$stores == null) {
	            scope.$stores = {};
	          }

	          scope.$stores[self.$name] = this.getState();

	          if (scope.$$phase === 0) {
	            scope.$digest();
	          }

	          this.on('change', function(){
	            $timeout(function () {
	              scope.$stores[self.$name] = self.getState();
	            });
	          });
	        };

	        this.$bindAction = function (key, value) {
	          this.$actions[key] = value;
	        };

	        if (this.getState == null) {
	          this.getState = function () {
	            return {};
	          };
	        }

	        if (this.initialize != null) {
	          this.initialize();
	        }
	      }

	      Store.prototype = EventEmitter.prototype;

	      return storeFactory;
	    }]);
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(116);
	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.services.action'] = angular.module('shava.services.action', [
	    'shava.services.action.constants'
	  ]))

	    .factory('$action', actionFactory);

	  actionFactory.$inject = ['actionConstants'];

	  function actionFactory(actionConstants) {
	    function Action(name, opts) {
	      if (opts == null) {
	        opts = name != null ? name : {};
	        name = null;
	      }
	      else {
	        this.actionType = name;
	      }

	      if (opts.source == null) {
	        this.source = actionConstants.SOURCE_CLIENT;
	      }

	      angular.extend(this, opts);
	    }

	    function actionCreator(name, opts) {
	      return new Action(name, opts);
	    }

	    return actionCreator;
	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {

	function App() {
	}

	App.prototype = {
	  registerGlobalHotkey: noop,
	  unregisterGlobalHotKey: noop
	};

	function Window(window) {
	  this._window = window;
	  Window.opened.push(this);
	}

	Window.opened = [];

	Window.prototype = {
	  show: function(){},
	  showDevTools: function(){},
	  minimize: function(){},
	  maximize: function(){},
	  close: function(){
	    Window.opened.splice(Window.opened.indexOf(this), 1);
	    $window.location=$window.NW_CLOSE_URL||'about:blank';
	  }
	};

	function noop(){}

	function Menu() {
	  this.menu = [];
	}
	Menu.prototype = {
	  popup: function (x, y) {
	    var self = this;

	    var menuOptions = [

	      {
	        icon: 'fa-download',
	        text: 'DOWNLOAD'
	      }

	    ];

	    window.angular.injector(['shava.services.contextMenu', 'ng'])
	      .invoke(['shavaContextMenuFactory', function(shavaContextMenuFactory){
	        shavaContextMenuFactory({
	          options: menuOptions
	        });
	      }]);
	  },
	  append: function (menuItem) {
	    this.menu = menuItem;
	  },
	  removeAt: function (menuItemIndex) {
	    this.menu.splice(menuItemIndex, 1);
	  }
	};

	function Shortcut() {
	}

	Shortcut.prototype = {
	  on: noop,
	  off: noop
	};

	function MenuItem(opts) {
	  this.label = opts.label;
	  this.click = opts.click;
	  this.type = opts.type;
	}
	MenuItem.prototype = {

	};

	function Tray() {
	}

	Window.open = function (url) {
	  location.href = url;
	  return new Window();
	};

	Window.get = function () {
	  return Window._mainWindow;
	};

	Window._mainWindow = new Window();

	Window.show = Window.hide =
	Window.setMinimumSize = Window.setMaximumSize = 
	Window.setWidth = Window.setHeight = noop;

	module.exports = {
	  nodeless: true,
	  Menu: Menu,
	  MenuItem: MenuItem,
	  Shortcut: Shortcut,
	  Tray: Tray,
	  Window: Window,
	  App: App
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */
	(function (global, factory) {
	  true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.Immutable = factory()
	}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

	  function createClass(ctor, superClass) {
	    if (superClass) {
	      ctor.prototype = Object.create(superClass.prototype);
	    }
	    ctor.prototype.constructor = ctor;
	  }

	  // Used for setting prototype methods that IE8 chokes on.
	  var DELETE = 'delete';

	  // Constants describing the size of trie nodes.
	  var SHIFT = 5; // Resulted in best performance after ______?
	  var SIZE = 1 << SHIFT;
	  var MASK = SIZE - 1;

	  // A consistent shared value representing "not set" which equals nothing other
	  // than itself, and nothing that could be provided externally.
	  var NOT_SET = {};

	  // Boolean references, Rough equivalent of `bool &`.
	  var CHANGE_LENGTH = { value: false };
	  var DID_ALTER = { value: false };

	  function MakeRef(ref) {
	    ref.value = false;
	    return ref;
	  }

	  function SetRef(ref) {
	    ref && (ref.value = true);
	  }

	  // A function which returns a value representing an "owner" for transient writes
	  // to tries. The return value will only ever equal itself, and will not equal
	  // the return of any subsequent call of this function.
	  function OwnerID() {}

	  // http://jsperf.com/copy-array-inline
	  function arrCopy(arr, offset) {
	    offset = offset || 0;
	    var len = Math.max(0, arr.length - offset);
	    var newArr = new Array(len);
	    for (var ii = 0; ii < len; ii++) {
	      newArr[ii] = arr[ii + offset];
	    }
	    return newArr;
	  }

	  function ensureSize(iter) {
	    if (iter.size === undefined) {
	      iter.size = iter.__iterate(returnTrue);
	    }
	    return iter.size;
	  }

	  function wrapIndex(iter, index) {
	    return index >= 0 ? (+index) : ensureSize(iter) + (+index);
	  }

	  function returnTrue() {
	    return true;
	  }

	  function wholeSlice(begin, end, size) {
	    return (begin === 0 || (size !== undefined && begin <= -size)) &&
	      (end === undefined || (size !== undefined && end >= size));
	  }

	  function resolveBegin(begin, size) {
	    return resolveIndex(begin, size, 0);
	  }

	  function resolveEnd(end, size) {
	    return resolveIndex(end, size, size);
	  }

	  function resolveIndex(index, size, defaultIndex) {
	    return index === undefined ?
	      defaultIndex :
	      index < 0 ?
	        Math.max(0, size + index) :
	        size === undefined ?
	          index :
	          Math.min(size, index);
	  }

	  function Iterable(value) {
	      return isIterable(value) ? value : Seq(value);
	    }


	  createClass(KeyedIterable, Iterable);
	    function KeyedIterable(value) {
	      return isKeyed(value) ? value : KeyedSeq(value);
	    }


	  createClass(IndexedIterable, Iterable);
	    function IndexedIterable(value) {
	      return isIndexed(value) ? value : IndexedSeq(value);
	    }


	  createClass(SetIterable, Iterable);
	    function SetIterable(value) {
	      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
	    }



	  function isIterable(maybeIterable) {
	    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
	  }

	  function isKeyed(maybeKeyed) {
	    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	  }

	  function isIndexed(maybeIndexed) {
	    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	  }

	  function isAssociative(maybeAssociative) {
	    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	  }

	  function isOrdered(maybeOrdered) {
	    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	  }

	  Iterable.isIterable = isIterable;
	  Iterable.isKeyed = isKeyed;
	  Iterable.isIndexed = isIndexed;
	  Iterable.isAssociative = isAssociative;
	  Iterable.isOrdered = isOrdered;

	  Iterable.Keyed = KeyedIterable;
	  Iterable.Indexed = IndexedIterable;
	  Iterable.Set = SetIterable;


	  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  /* global Symbol */

	  var ITERATE_KEYS = 0;
	  var ITERATE_VALUES = 1;
	  var ITERATE_ENTRIES = 2;

	  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator';

	  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


	  function src_Iterator__Iterator(next) {
	      this.next = next;
	    }

	    src_Iterator__Iterator.prototype.toString = function() {
	      return '[Iterator]';
	    };


	  src_Iterator__Iterator.KEYS = ITERATE_KEYS;
	  src_Iterator__Iterator.VALUES = ITERATE_VALUES;
	  src_Iterator__Iterator.ENTRIES = ITERATE_ENTRIES;

	  src_Iterator__Iterator.prototype.inspect =
	  src_Iterator__Iterator.prototype.toSource = function () { return this.toString(); }
	  src_Iterator__Iterator.prototype[ITERATOR_SYMBOL] = function () {
	    return this;
	  };


	  function iteratorValue(type, k, v, iteratorResult) {
	    var value = type === 0 ? k : type === 1 ? v : [k, v];
	    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
	      value: value, done: false
	    });
	    return iteratorResult;
	  }

	  function iteratorDone() {
	    return { value: undefined, done: true };
	  }

	  function hasIterator(maybeIterable) {
	    return !!getIteratorFn(maybeIterable);
	  }

	  function isIterator(maybeIterator) {
	    return maybeIterator && typeof maybeIterator.next === 'function';
	  }

	  function getIterator(iterable) {
	    var iteratorFn = getIteratorFn(iterable);
	    return iteratorFn && iteratorFn.call(iterable);
	  }

	  function getIteratorFn(iterable) {
	    var iteratorFn = iterable && (
	      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
	      iterable[FAUX_ITERATOR_SYMBOL]
	    );
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  function isArrayLike(value) {
	    return value && typeof value.length === 'number';
	  }

	  createClass(Seq, Iterable);
	    function Seq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        isIterable(value) ? value.toSeq() : seqFromValue(value);
	    }

	    Seq.of = function(/*...values*/) {
	      return Seq(arguments);
	    };

	    Seq.prototype.toSeq = function() {
	      return this;
	    };

	    Seq.prototype.toString = function() {
	      return this.__toString('Seq {', '}');
	    };

	    Seq.prototype.cacheResult = function() {
	      if (!this._cache && this.__iterateUncached) {
	        this._cache = this.entrySeq().toArray();
	        this.size = this._cache.length;
	      }
	      return this;
	    };

	    // abstract __iterateUncached(fn, reverse)

	    Seq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, true);
	    };

	    // abstract __iteratorUncached(type, reverse)

	    Seq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, true);
	    };



	  createClass(KeyedSeq, Seq);
	    function KeyedSeq(value) {
	      return value === null || value === undefined ?
	        emptySequence().toKeyedSeq() :
	        isIterable(value) ?
	          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
	          keyedSeqFromValue(value);
	    }

	    KeyedSeq.prototype.toKeyedSeq = function() {
	      return this;
	    };



	  createClass(IndexedSeq, Seq);
	    function IndexedSeq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
	    }

	    IndexedSeq.of = function(/*...values*/) {
	      return IndexedSeq(arguments);
	    };

	    IndexedSeq.prototype.toIndexedSeq = function() {
	      return this;
	    };

	    IndexedSeq.prototype.toString = function() {
	      return this.__toString('Seq [', ']');
	    };

	    IndexedSeq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, false);
	    };

	    IndexedSeq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, false);
	    };



	  createClass(SetSeq, Seq);
	    function SetSeq(value) {
	      return (
	        value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value
	      ).toSetSeq();
	    }

	    SetSeq.of = function(/*...values*/) {
	      return SetSeq(arguments);
	    };

	    SetSeq.prototype.toSetSeq = function() {
	      return this;
	    };



	  Seq.isSeq = isSeq;
	  Seq.Keyed = KeyedSeq;
	  Seq.Set = SetSeq;
	  Seq.Indexed = IndexedSeq;

	  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

	  Seq.prototype[IS_SEQ_SENTINEL] = true;



	  // #pragma Root Sequences

	  createClass(ArraySeq, IndexedSeq);
	    function ArraySeq(array) {
	      this._array = array;
	      this.size = array.length;
	    }

	    ArraySeq.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	    };

	    ArraySeq.prototype.__iterate = function(fn, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ArraySeq.prototype.__iterator = function(type, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      var ii = 0;
	      return new src_Iterator__Iterator(function() 
	        {return ii > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
	      );
	    };



	  createClass(ObjectSeq, KeyedSeq);
	    function ObjectSeq(object) {
	      var keys = Object.keys(object);
	      this._object = object;
	      this._keys = keys;
	      this.size = keys.length;
	    }

	    ObjectSeq.prototype.get = function(key, notSetValue) {
	      if (notSetValue !== undefined && !this.has(key)) {
	        return notSetValue;
	      }
	      return this._object[key];
	    };

	    ObjectSeq.prototype.has = function(key) {
	      return this._object.hasOwnProperty(key);
	    };

	    ObjectSeq.prototype.__iterate = function(fn, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        if (fn(object[key], key, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ObjectSeq.prototype.__iterator = function(type, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      var ii = 0;
	      return new src_Iterator__Iterator(function()  {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, key, object[key]);
	      });
	    };

	  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(IterableSeq, IndexedSeq);
	    function IterableSeq(iterable) {
	      this._iterable = iterable;
	      this.size = iterable.length || iterable.size;
	    }

	    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      var iterations = 0;
	      if (isIterator(iterator)) {
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (fn(step.value, iterations++, this) === false) {
	            break;
	          }
	        }
	      }
	      return iterations;
	    };

	    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      if (!isIterator(iterator)) {
	        return new src_Iterator__Iterator(iteratorDone);
	      }
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step : iteratorValue(type, iterations++, step.value);
	      });
	    };



	  createClass(IteratorSeq, IndexedSeq);
	    function IteratorSeq(iterator) {
	      this._iterator = iterator;
	      this._iteratorCache = [];
	    }

	    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      while (iterations < cache.length) {
	        if (fn(cache[iterations], iterations++, this) === false) {
	          return iterations;
	        }
	      }
	      var step;
	      while (!(step = iterator.next()).done) {
	        var val = step.value;
	        cache[iterations] = val;
	        if (fn(val, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };

	    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        if (iterations >= cache.length) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          cache[iterations] = step.value;
	        }
	        return iteratorValue(type, iterations, cache[iterations++]);
	      });
	    };




	  // # pragma Helper functions

	  function isSeq(maybeSeq) {
	    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	  }

	  var EMPTY_SEQ;

	  function emptySequence() {
	    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	  }

	  function keyedSeqFromValue(value) {
	    var seq =
	      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
	      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
	      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
	      typeof value === 'object' ? new ObjectSeq(value) :
	      undefined;
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of [k, v] entries, '+
	        'or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function indexedSeqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value);
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values: ' + value
	      );
	    }
	    return seq;
	  }

	  function seqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value) ||
	      (typeof value === 'object' && new ObjectSeq(value));
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values, or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function maybeIndexedSeqFromValue(value) {
	    return (
	      isArrayLike(value) ? new ArraySeq(value) :
	      isIterator(value) ? new IteratorSeq(value) :
	      hasIterator(value) ? new IterableSeq(value) :
	      undefined
	    );
	  }

	  function seqIterate(seq, fn, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    }
	    return seq.__iterateUncached(fn, reverse);
	  }

	  function seqIterator(seq, type, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      var ii = 0;
	      return new src_Iterator__Iterator(function()  {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
	      });
	    }
	    return seq.__iteratorUncached(type, reverse);
	  }

	  createClass(Collection, Iterable);
	    function Collection() {
	      throw TypeError('Abstract');
	    }


	  createClass(KeyedCollection, Collection);function KeyedCollection() {}

	  createClass(IndexedCollection, Collection);function IndexedCollection() {}

	  createClass(SetCollection, Collection);function SetCollection() {}


	  Collection.Keyed = KeyedCollection;
	  Collection.Indexed = IndexedCollection;
	  Collection.Set = SetCollection;

	  /**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */
	  function is(valueA, valueB) {
	    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	    if (typeof valueA.valueOf === 'function' &&
	        typeof valueB.valueOf === 'function') {
	      valueA = valueA.valueOf();
	      valueB = valueB.valueOf();
	    }
	    return typeof valueA.equals === 'function' &&
	      typeof valueB.equals === 'function' ?
	        valueA.equals(valueB) :
	        valueA === valueB || (valueA !== valueA && valueB !== valueB);
	  }

	  function fromJS(json, converter) {
	    return converter ?
	      fromJSWith(converter, json, '', {'': json}) :
	      fromJSDefault(json);
	  }

	  function fromJSWith(converter, json, key, parentJSON) {
	    if (Array.isArray(json)) {
	      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    if (isPlainObj(json)) {
	      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    return json;
	  }

	  function fromJSDefault(json) {
	    if (Array.isArray(json)) {
	      return IndexedSeq(json).map(fromJSDefault).toList();
	    }
	    if (isPlainObj(json)) {
	      return KeyedSeq(json).map(fromJSDefault).toMap();
	    }
	    return json;
	  }

	  function isPlainObj(value) {
	    return value && (value.constructor === Object || value.constructor === undefined);
	  }

	  var src_Math__imul =
	    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
	    Math.imul :
	    function src_Math__imul(a, b) {
	      a = a | 0; // int
	      b = b | 0; // int
	      var c = a & 0xffff;
	      var d = b & 0xffff;
	      // Shift by 0 fixes the sign on the high part.
	      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
	    };

	  // v8 has an optimization for storing 31-bit signed numbers.
	  // Values which have either 00 or 11 as the high order bits qualify.
	  // This function drops the highest order bit in a signed number, maintaining
	  // the sign bit.
	  function smi(i32) {
	    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
	  }

	  function hash(o) {
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	    if (typeof o.valueOf === 'function') {
	      o = o.valueOf();
	      if (o === false || o === null || o === undefined) {
	        return 0;
	      }
	    }
	    if (o === true) {
	      return 1;
	    }
	    var type = typeof o;
	    if (type === 'number') {
	      var h = o | 0;
	      if (h !== o) {
	        h ^= o * 0xFFFFFFFF;
	      }
	      while (o > 0xFFFFFFFF) {
	        o /= 0xFFFFFFFF;
	        h ^= o;
	      }
	      return smi(h);
	    }
	    if (type === 'string') {
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
	    }
	    if (typeof o.hashCode === 'function') {
	      return o.hashCode();
	    }
	    return hashJSObj(o);
	  }

	  function cachedHashString(string) {
	    var hash = stringHashCache[string];
	    if (hash === undefined) {
	      hash = hashString(string);
	      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	        STRING_HASH_CACHE_SIZE = 0;
	        stringHashCache = {};
	      }
	      STRING_HASH_CACHE_SIZE++;
	      stringHashCache[string] = hash;
	    }
	    return hash;
	  }

	  // http://jsperf.com/hashing-strings
	  function hashString(string) {
	    // This is the hash from JVM
	    // The hash code for a string is computed as
	    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	    // where s[i] is the ith character of the string and n is the length of
	    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	    // (exclusive) by dropping high bits.
	    var hash = 0;
	    for (var ii = 0; ii < string.length; ii++) {
	      hash = 31 * hash + string.charCodeAt(ii) | 0;
	    }
	    return smi(hash);
	  }

	  function hashJSObj(obj) {
	    var hash = weakMap && weakMap.get(obj);
	    if (hash) return hash;

	    hash = obj[UID_HASH_KEY];
	    if (hash) return hash;

	    if (!canDefineProperty) {
	      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	      if (hash) return hash;

	      hash = getIENodeHash(obj);
	      if (hash) return hash;
	    }

	    if (Object.isExtensible && !Object.isExtensible(obj)) {
	      throw new Error('Non-extensible objects are not allowed as keys.');
	    }

	    hash = ++objHashUID;
	    if (objHashUID & 0x40000000) {
	      objHashUID = 0;
	    }

	    if (weakMap) {
	      weakMap.set(obj, hash);
	    } else if (canDefineProperty) {
	      Object.defineProperty(obj, UID_HASH_KEY, {
	        'enumerable': false,
	        'configurable': false,
	        'writable': false,
	        'value': hash
	      });
	    } else if (obj.propertyIsEnumerable &&
	               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	      // Since we can't define a non-enumerable property on the object
	      // we'll hijack one of the less-used non-enumerable properties to
	      // save our hash on it. Since this is a function it will not show up in
	      // `JSON.stringify` which is what we want.
	      obj.propertyIsEnumerable = function() {
	        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	      };
	      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
	    } else if (obj.nodeType) {
	      // At this point we couldn't get the IE `uniqueID` to use as a hash
	      // and we couldn't use a non-enumerable property to exploit the
	      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	      // itself.
	      obj[UID_HASH_KEY] = hash;
	    } else {
	      throw new Error('Unable to set a non-enumerable property on object.');
	    }

	    return hash;
	  }

	  // True if Object.defineProperty works as expected. IE8 fails this test.
	  var canDefineProperty = (function() {
	    try {
	      Object.defineProperty({}, '@', {});
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }());

	  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	  // and avoid memory leaks from the IE cloneNode bug.
	  function getIENodeHash(node) {
	    if (node && node.nodeType > 0) {
	      switch (node.nodeType) {
	        case 1: // Element
	          return node.uniqueID;
	        case 9: // Document
	          return node.documentElement && node.documentElement.uniqueID;
	      }
	    }
	  }

	  // If possible, use a WeakMap.
	  var weakMap = typeof WeakMap === 'function' && new WeakMap();

	  var objHashUID = 0;

	  var UID_HASH_KEY = '__immutablehash__';
	  if (typeof Symbol === 'function') {
	    UID_HASH_KEY = Symbol(UID_HASH_KEY);
	  }

	  var STRING_HASH_CACHE_MIN_STRLEN = 16;
	  var STRING_HASH_CACHE_MAX_SIZE = 255;
	  var STRING_HASH_CACHE_SIZE = 0;
	  var stringHashCache = {};

	  function invariant(condition, error) {
	    if (!condition) throw new Error(error);
	  }

	  function assertNotInfinite(size) {
	    invariant(
	      size !== Infinity,
	      'Cannot perform this action with an infinite size.'
	    );
	  }

	  createClass(ToKeyedSequence, KeyedSeq);
	    function ToKeyedSequence(indexed, useKeys) {
	      this._iter = indexed;
	      this._useKeys = useKeys;
	      this.size = indexed.size;
	    }

	    ToKeyedSequence.prototype.get = function(key, notSetValue) {
	      return this._iter.get(key, notSetValue);
	    };

	    ToKeyedSequence.prototype.has = function(key) {
	      return this._iter.has(key);
	    };

	    ToKeyedSequence.prototype.valueSeq = function() {
	      return this._iter.valueSeq();
	    };

	    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
	      var reversedSequence = reverseFactory(this, true);
	      if (!this._useKeys) {
	        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
	      }
	      return reversedSequence;
	    };

	    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
	      var mappedSequence = mapFactory(this, mapper, context);
	      if (!this._useKeys) {
	        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
	      }
	      return mappedSequence;
	    };

	    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var ii;
	      return this._iter.__iterate(
	        this._useKeys ?
	          function(v, k)  {return fn(v, k, this$0)} :
	          ((ii = reverse ? resolveSize(this) : 0),
	            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
	        reverse
	      );
	    };

	    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
	      if (this._useKeys) {
	        return this._iter.__iterator(type, reverse);
	      }
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var ii = reverse ? resolveSize(this) : 0;
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
	      });
	    };

	  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(ToIndexedSequence, IndexedSeq);
	    function ToIndexedSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToIndexedSequence.prototype.contains = function(value) {
	      return this._iter.contains(value);
	    };

	    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
	    };

	    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, iterations++, step.value, step)
	      });
	    };



	  createClass(ToSetSequence, SetSeq);
	    function ToSetSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToSetSequence.prototype.has = function(key) {
	      return this._iter.contains(key);
	    };

	    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
	    };

	    ToSetSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, step.value, step.value, step);
	      });
	    };



	  createClass(FromEntriesSequence, KeyedSeq);
	    function FromEntriesSequence(entries) {
	      this._iter = entries;
	      this.size = entries.size;
	    }

	    FromEntriesSequence.prototype.entrySeq = function() {
	      return this._iter.toSeq();
	    };

	    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(entry ) {
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          return fn(entry[1], entry[0], this$0);
	        }
	      }, reverse);
	    };

	    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new src_Iterator__Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          // Check if entry exists first so array access doesn't throw for holes
	          // in the parent iteration.
	          if (entry) {
	            validateEntry(entry);
	            return type === ITERATE_ENTRIES ? step :
	              iteratorValue(type, entry[0], entry[1], step);
	          }
	        }
	      });
	    };


	  ToIndexedSequence.prototype.cacheResult =
	  ToKeyedSequence.prototype.cacheResult =
	  ToSetSequence.prototype.cacheResult =
	  FromEntriesSequence.prototype.cacheResult =
	    cacheResultThrough;


	  function flipFactory(iterable) {
	    var flipSequence = makeSequence(iterable);
	    flipSequence._iter = iterable;
	    flipSequence.size = iterable.size;
	    flipSequence.flip = function()  {return iterable};
	    flipSequence.reverse = function () {
	      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
	      reversedSequence.flip = function()  {return iterable.reverse()};
	      return reversedSequence;
	    };
	    flipSequence.has = function(key ) {return iterable.contains(key)};
	    flipSequence.contains = function(key ) {return iterable.has(key)};
	    flipSequence.cacheResult = cacheResultThrough;
	    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
	    }
	    flipSequence.__iteratorUncached = function(type, reverse) {
	      if (type === ITERATE_ENTRIES) {
	        var iterator = iterable.__iterator(type, reverse);
	        return new src_Iterator__Iterator(function()  {
	          var step = iterator.next();
	          if (!step.done) {
	            var k = step.value[0];
	            step.value[0] = step.value[1];
	            step.value[1] = k;
	          }
	          return step;
	        });
	      }
	      return iterable.__iterator(
	        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
	        reverse
	      );
	    }
	    return flipSequence;
	  }


	  function mapFactory(iterable, mapper, context) {
	    var mappedSequence = makeSequence(iterable);
	    mappedSequence.size = iterable.size;
	    mappedSequence.has = function(key ) {return iterable.has(key)};
	    mappedSequence.get = function(key, notSetValue)  {
	      var v = iterable.get(key, NOT_SET);
	      return v === NOT_SET ?
	        notSetValue :
	        mapper.call(context, v, key, iterable);
	    };
	    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(
	        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
	        reverse
	      );
	    }
	    mappedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        return iteratorValue(
	          type,
	          key,
	          mapper.call(context, entry[1], key, iterable),
	          step
	        );
	      });
	    }
	    return mappedSequence;
	  }


	  function reverseFactory(iterable, useKeys) {
	    var reversedSequence = makeSequence(iterable);
	    reversedSequence._iter = iterable;
	    reversedSequence.size = iterable.size;
	    reversedSequence.reverse = function()  {return iterable};
	    if (iterable.flip) {
	      reversedSequence.flip = function () {
	        var flipSequence = flipFactory(iterable);
	        flipSequence.reverse = function()  {return iterable.flip()};
	        return flipSequence;
	      };
	    }
	    reversedSequence.get = function(key, notSetValue) 
	      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
	    reversedSequence.has = function(key )
	      {return iterable.has(useKeys ? key : -1 - key)};
	    reversedSequence.contains = function(value ) {return iterable.contains(value)};
	    reversedSequence.cacheResult = cacheResultThrough;
	    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
	    };
	    reversedSequence.__iterator =
	      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
	    return reversedSequence;
	  }


	  function filterFactory(iterable, predicate, context, useKeys) {
	    var filterSequence = makeSequence(iterable);
	    if (useKeys) {
	      filterSequence.has = function(key ) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
	      };
	      filterSequence.get = function(key, notSetValue)  {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
	          v : notSetValue;
	      };
	    }
	    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      }, reverse);
	      return iterations;
	    };
	    filterSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          var key = entry[0];
	          var value = entry[1];
	          if (predicate.call(context, value, key, iterable)) {
	            return iteratorValue(type, useKeys ? key : iterations++, value, step);
	          }
	        }
	      });
	    }
	    return filterSequence;
	  }


	  function countByFactory(iterable, grouper, context) {
	    var groups = src_Map__Map().asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        0,
	        function(a ) {return a + 1}
	      );
	    });
	    return groups.asImmutable();
	  }


	  function groupByFactory(iterable, grouper, context) {
	    var isKeyedIter = isKeyed(iterable);
	    var groups = (isOrdered(iterable) ? OrderedMap() : src_Map__Map()).asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
	      );
	    });
	    var coerce = iterableClass(iterable);
	    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
	  }


	  function sliceFactory(iterable, begin, end, useKeys) {
	    var originalSize = iterable.size;

	    if (wholeSlice(begin, end, originalSize)) {
	      return iterable;
	    }

	    var resolvedBegin = resolveBegin(begin, originalSize);
	    var resolvedEnd = resolveEnd(end, originalSize);

	    // begin or end will be NaN if they were provided as negative numbers and
	    // this iterable's size is unknown. In that case, cache first so there is
	    // a known size.
	    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
	    }

	    var sliceSize = resolvedEnd - resolvedBegin;
	    if (sliceSize < 0) {
	      sliceSize = 0;
	    }

	    var sliceSeq = makeSequence(iterable);

	    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

	    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
	      sliceSeq.get = function (index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 && index < sliceSize ?
	          iterable.get(index + resolvedBegin, notSetValue) :
	          notSetValue;
	      }
	    }

	    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (sliceSize === 0) {
	        return 0;
	      }
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var skipped = 0;
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k)  {
	        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
	                 iterations !== sliceSize;
	        }
	      });
	      return iterations;
	    };

	    sliceSeq.__iteratorUncached = function(type, reverse) {
	      if (sliceSize && reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      // Don't bother instantiating parent iterator if taking 0.
	      var iterator = sliceSize && iterable.__iterator(type, reverse);
	      var skipped = 0;
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        while (skipped++ !== resolvedBegin) {
	          iterator.next();
	        }
	        if (++iterations > sliceSize) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (useKeys || type === ITERATE_VALUES) {
	          return step;
	        } else if (type === ITERATE_KEYS) {
	          return iteratorValue(type, iterations - 1, undefined, step);
	        } else {
	          return iteratorValue(type, iterations - 1, step.value[1], step);
	        }
	      });
	    }

	    return sliceSeq;
	  }


	  function takeWhileFactory(iterable, predicate, context) {
	    var takeSequence = makeSequence(iterable);
	    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c) 
	        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
	      );
	      return iterations;
	    };
	    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterating = true;
	      return new src_Iterator__Iterator(function()  {
	        if (!iterating) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var k = entry[0];
	        var v = entry[1];
	        if (!predicate.call(context, v, k, this$0)) {
	          iterating = false;
	          return iteratorDone();
	        }
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return takeSequence;
	  }


	  function skipWhileFactory(iterable, predicate, context, useKeys) {
	    var skipSequence = makeSequence(iterable);
	    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      });
	      return iterations;
	    };
	    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var skipping = true;
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        var step, k, v;
	        do {
	          step = iterator.next();
	          if (step.done) {
	            if (useKeys || type === ITERATE_VALUES) {
	              return step;
	            } else if (type === ITERATE_KEYS) {
	              return iteratorValue(type, iterations++, undefined, step);
	            } else {
	              return iteratorValue(type, iterations++, step.value[1], step);
	            }
	          }
	          var entry = step.value;
	          k = entry[0];
	          v = entry[1];
	          skipping && (skipping = predicate.call(context, v, k, this$0));
	        } while (skipping);
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return skipSequence;
	  }


	  function concatFactory(iterable, values) {
	    var isKeyedIterable = isKeyed(iterable);
	    var iters = [iterable].concat(values).map(function(v ) {
	      if (!isIterable(v)) {
	        v = isKeyedIterable ?
	          keyedSeqFromValue(v) :
	          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedIterable) {
	        v = KeyedIterable(v);
	      }
	      return v;
	    }).filter(function(v ) {return v.size !== 0});

	    if (iters.length === 0) {
	      return iterable;
	    }

	    if (iters.length === 1) {
	      var singleton = iters[0];
	      if (singleton === iterable ||
	          isKeyedIterable && isKeyed(singleton) ||
	          isIndexed(iterable) && isIndexed(singleton)) {
	        return singleton;
	      }
	    }

	    var concatSeq = new ArraySeq(iters);
	    if (isKeyedIterable) {
	      concatSeq = concatSeq.toKeyedSeq();
	    } else if (!isIndexed(iterable)) {
	      concatSeq = concatSeq.toSetSeq();
	    }
	    concatSeq = concatSeq.flatten(true);
	    concatSeq.size = iters.reduce(
	      function(sum, seq)  {
	        if (sum !== undefined) {
	          var size = seq.size;
	          if (size !== undefined) {
	            return sum + size;
	          }
	        }
	      },
	      0
	    );
	    return concatSeq;
	  }


	  function flattenFactory(iterable, depth, useKeys) {
	    var flatSequence = makeSequence(iterable);
	    flatSequence.__iterateUncached = function(fn, reverse) {
	      var iterations = 0;
	      var stopped = false;
	      function flatDeep(iter, currentDepth) {var this$0 = this;
	        iter.__iterate(function(v, k)  {
	          if ((!depth || currentDepth < depth) && isIterable(v)) {
	            flatDeep(v, currentDepth + 1);
	          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
	            stopped = true;
	          }
	          return !stopped;
	        }, reverse);
	      }
	      flatDeep(iterable, 0);
	      return iterations;
	    }
	    flatSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(type, reverse);
	      var stack = [];
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        while (iterator) {
	          var step = iterator.next();
	          if (step.done !== false) {
	            iterator = stack.pop();
	            continue;
	          }
	          var v = step.value;
	          if (type === ITERATE_ENTRIES) {
	            v = v[1];
	          }
	          if ((!depth || stack.length < depth) && isIterable(v)) {
	            stack.push(iterator);
	            iterator = v.__iterator(type, reverse);
	          } else {
	            return useKeys ? step : iteratorValue(type, iterations++, v, step);
	          }
	        }
	        return iteratorDone();
	      });
	    }
	    return flatSequence;
	  }


	  function flatMapFactory(iterable, mapper, context) {
	    var coerce = iterableClass(iterable);
	    return iterable.toSeq().map(
	      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
	    ).flatten(true);
	  }


	  function interposeFactory(iterable, separator) {
	    var interposedSequence = makeSequence(iterable);
	    interposedSequence.size = iterable.size && iterable.size * 2 -1;
	    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k) 
	        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
	        fn(v, iterations++, this$0) !== false},
	        reverse
	      );
	      return iterations;
	    };
	    interposedSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      var step;
	      return new src_Iterator__Iterator(function()  {
	        if (!step || iterations % 2) {
	          step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	        }
	        return iterations % 2 ?
	          iteratorValue(type, iterations++, separator) :
	          iteratorValue(type, iterations++, step.value, step);
	      });
	    };
	    return interposedSequence;
	  }


	  function sortFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    var isKeyedIterable = isKeyed(iterable);
	    var index = 0;
	    var entries = iterable.toSeq().map(
	      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
	    ).toArray();
	    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
	      isKeyedIterable ?
	      function(v, i)  { entries[i].length = 2; } :
	      function(v, i)  { entries[i] = v[1]; }
	    );
	    return isKeyedIterable ? KeyedSeq(entries) :
	      isIndexed(iterable) ? IndexedSeq(entries) :
	      SetSeq(entries);
	  }


	  function maxFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    if (mapper) {
	      var entry = iterable.toSeq()
	        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
	        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
	      return entry && entry[0];
	    } else {
	      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
	    }
	  }

	  function maxCompare(comparator, a, b) {
	    var comp = comparator(b, a);
	    // b is considered the new max if the comparator declares them equal, but
	    // they are not equal and b is in fact a nullish value.
	    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
	  }


	  function zipWithFactory(keyIter, zipper, iters) {
	    var zipSequence = makeSequence(keyIter);
	    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
	    // Note: this a generic base implementation of __iterate in terms of
	    // __iterator which may be more generically useful in the future.
	    zipSequence.__iterate = function(fn, reverse) {
	      /* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */
	      // indexed:
	      var iterator = this.__iterator(ITERATE_VALUES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };
	    zipSequence.__iteratorUncached = function(type, reverse) {
	      var iterators = iters.map(function(i )
	        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
	      );
	      var iterations = 0;
	      var isDone = false;
	      return new src_Iterator__Iterator(function()  {
	        var steps;
	        if (!isDone) {
	          steps = iterators.map(function(i ) {return i.next()});
	          isDone = steps.some(function(s ) {return s.done});
	        }
	        if (isDone) {
	          return iteratorDone();
	        }
	        return iteratorValue(
	          type,
	          iterations++,
	          zipper.apply(null, steps.map(function(s ) {return s.value}))
	        );
	      });
	    };
	    return zipSequence
	  }


	  // #pragma Helper Functions

	  function reify(iter, seq) {
	    return isSeq(iter) ? seq : iter.constructor(seq);
	  }

	  function validateEntry(entry) {
	    if (entry !== Object(entry)) {
	      throw new TypeError('Expected [K, V] tuple: ' + entry);
	    }
	  }

	  function resolveSize(iter) {
	    assertNotInfinite(iter.size);
	    return ensureSize(iter);
	  }

	  function iterableClass(iterable) {
	    return isKeyed(iterable) ? KeyedIterable :
	      isIndexed(iterable) ? IndexedIterable :
	      SetIterable;
	  }

	  function makeSequence(iterable) {
	    return Object.create(
	      (
	        isKeyed(iterable) ? KeyedSeq :
	        isIndexed(iterable) ? IndexedSeq :
	        SetSeq
	      ).prototype
	    );
	  }

	  function cacheResultThrough() {
	    if (this._iter.cacheResult) {
	      this._iter.cacheResult();
	      this.size = this._iter.size;
	      return this;
	    } else {
	      return Seq.prototype.cacheResult.call(this);
	    }
	  }

	  function defaultComparator(a, b) {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  function forceIterator(keyPath) {
	    var iter = getIterator(keyPath);
	    if (!iter) {
	      // Array might not be iterable in this environment, so we need a fallback
	      // to our wrapped type.
	      if (!isArrayLike(keyPath)) {
	        throw new TypeError('Expected iterable or array-like: ' + keyPath);
	      }
	      iter = getIterator(Iterable(keyPath));
	    }
	    return iter;
	  }

	  createClass(src_Map__Map, KeyedCollection);

	    // @pragma Construction

	    function src_Map__Map(value) {
	      return value === null || value === undefined ? emptyMap() :
	        isMap(value) ? value :
	        emptyMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    src_Map__Map.prototype.toString = function() {
	      return this.__toString('Map {', '}');
	    };

	    // @pragma Access

	    src_Map__Map.prototype.get = function(k, notSetValue) {
	      return this._root ?
	        this._root.get(0, undefined, k, notSetValue) :
	        notSetValue;
	    };

	    // @pragma Modification

	    src_Map__Map.prototype.set = function(k, v) {
	      return updateMap(this, k, v);
	    };

	    src_Map__Map.prototype.setIn = function(keyPath, v) {
	      return this.updateIn(keyPath, NOT_SET, function()  {return v});
	    };

	    src_Map__Map.prototype.remove = function(k) {
	      return updateMap(this, k, NOT_SET);
	    };

	    src_Map__Map.prototype.deleteIn = function(keyPath) {
	      return this.updateIn(keyPath, function()  {return NOT_SET});
	    };

	    src_Map__Map.prototype.update = function(k, notSetValue, updater) {
	      return arguments.length === 1 ?
	        k(this) :
	        this.updateIn([k], notSetValue, updater);
	    };

	    src_Map__Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
	      if (!updater) {
	        updater = notSetValue;
	        notSetValue = undefined;
	      }
	      var updatedValue = updateInDeepMap(
	        this,
	        forceIterator(keyPath),
	        notSetValue,
	        updater
	      );
	      return updatedValue === NOT_SET ? undefined : updatedValue;
	    };

	    src_Map__Map.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._root = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyMap();
	    };

	    // @pragma Composition

	    src_Map__Map.prototype.merge = function(/*...iters*/) {
	      return mergeIntoMapWith(this, undefined, arguments);
	    };

	    src_Map__Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, merger, iters);
	    };

	    src_Map__Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(keyPath, emptyMap(), function(m ) {return m.merge.apply(m, iters)});
	    };

	    src_Map__Map.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoMapWith(this, deepMerger(undefined), arguments);
	    };

	    src_Map__Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, deepMerger(merger), iters);
	    };

	    src_Map__Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(keyPath, emptyMap(), function(m ) {return m.mergeDeep.apply(m, iters)});
	    };

	    src_Map__Map.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator));
	    };

	    src_Map__Map.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator, mapper));
	    };

	    // @pragma Mutability

	    src_Map__Map.prototype.withMutations = function(fn) {
	      var mutable = this.asMutable();
	      fn(mutable);
	      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	    };

	    src_Map__Map.prototype.asMutable = function() {
	      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	    };

	    src_Map__Map.prototype.asImmutable = function() {
	      return this.__ensureOwner();
	    };

	    src_Map__Map.prototype.wasAltered = function() {
	      return this.__altered;
	    };

	    src_Map__Map.prototype.__iterator = function(type, reverse) {
	      return new MapIterator(this, type, reverse);
	    };

	    src_Map__Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      this._root && this._root.iterate(function(entry ) {
	        iterations++;
	        return fn(entry[1], entry[0], this$0);
	      }, reverse);
	      return iterations;
	    };

	    src_Map__Map.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeMap(this.size, this._root, ownerID, this.__hash);
	    };


	  function isMap(maybeMap) {
	    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	  }

	  src_Map__Map.isMap = isMap;

	  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

	  var MapPrototype = src_Map__Map.prototype;
	  MapPrototype[IS_MAP_SENTINEL] = true;
	  MapPrototype[DELETE] = MapPrototype.remove;
	  MapPrototype.removeIn = MapPrototype.deleteIn;


	  // #pragma Trie Nodes



	    function ArrayMapNode(ownerID, entries) {
	      this.ownerID = ownerID;
	      this.entries = entries;
	    }

	    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && entries.length === 1) {
	        return; // undefined
	      }

	      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	        return createNodes(ownerID, entries, key, value);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new ArrayMapNode(ownerID, newEntries);
	    };




	    function BitmapIndexedNode(ownerID, bitmap, nodes) {
	      this.ownerID = ownerID;
	      this.bitmap = bitmap;
	      this.nodes = nodes;
	    }

	    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
	      var bitmap = this.bitmap;
	      return (bitmap & bit) === 0 ? notSetValue :
	        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
	    };

	    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var bit = 1 << keyHashFrag;
	      var bitmap = this.bitmap;
	      var exists = (bitmap & bit) !== 0;

	      if (!exists && value === NOT_SET) {
	        return this;
	      }

	      var idx = popCount(bitmap & (bit - 1));
	      var nodes = this.nodes;
	      var node = exists ? nodes[idx] : undefined;
	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	      if (newNode === node) {
	        return this;
	      }

	      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	      }

	      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	        return nodes[idx ^ 1];
	      }

	      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	        return newNode;
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	      var newNodes = exists ? newNode ?
	        setIn(nodes, idx, newNode, isEditable) :
	        spliceOut(nodes, idx, isEditable) :
	        spliceIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.bitmap = newBitmap;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	    };




	    function HashArrayMapNode(ownerID, count, nodes) {
	      this.ownerID = ownerID;
	      this.count = count;
	      this.nodes = nodes;
	    }

	    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var node = this.nodes[idx];
	      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	    };

	    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var removed = value === NOT_SET;
	      var nodes = this.nodes;
	      var node = nodes[idx];

	      if (removed && !node) {
	        return this;
	      }

	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	      if (newNode === node) {
	        return this;
	      }

	      var newCount = this.count;
	      if (!node) {
	        newCount++;
	      } else if (!newNode) {
	        newCount--;
	        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	          return packNodes(ownerID, nodes, newCount, idx);
	        }
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newNodes = setIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.count = newCount;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new HashArrayMapNode(ownerID, newCount, newNodes);
	    };




	    function HashCollisionNode(ownerID, keyHash, entries) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entries = entries;
	    }

	    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }

	      var removed = value === NOT_SET;

	      if (keyHash !== this.keyHash) {
	        if (removed) {
	          return this;
	        }
	        SetRef(didAlter);
	        SetRef(didChangeSize);
	        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	      }

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && len === 2) {
	        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	    };




	    function ValueNode(ownerID, keyHash, entry) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entry = entry;
	    }

	    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	    };

	    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;
	      var keyMatch = is(key, this.entry[0]);
	      if (keyMatch ? value === this.entry[1] : removed) {
	        return this;
	      }

	      SetRef(didAlter);

	      if (removed) {
	        SetRef(didChangeSize);
	        return; // undefined
	      }

	      if (keyMatch) {
	        if (ownerID && ownerID === this.ownerID) {
	          this.entry[1] = value;
	          return this;
	        }
	        return new ValueNode(ownerID, this.keyHash, [key, value]);
	      }

	      SetRef(didChangeSize);
	      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	    };



	  // #pragma Iterators

	  ArrayMapNode.prototype.iterate =
	  HashCollisionNode.prototype.iterate = function (fn, reverse) {
	    var entries = this.entries;
	    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	        return false;
	      }
	    }
	  }

	  BitmapIndexedNode.prototype.iterate =
	  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
	    var nodes = this.nodes;
	    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	      var node = nodes[reverse ? maxIndex - ii : ii];
	      if (node && node.iterate(fn, reverse) === false) {
	        return false;
	      }
	    }
	  }

	  ValueNode.prototype.iterate = function (fn, reverse) {
	    return fn(this.entry);
	  }

	  createClass(MapIterator, src_Iterator__Iterator);

	    function MapIterator(map, type, reverse) {
	      this._type = type;
	      this._reverse = reverse;
	      this._stack = map._root && mapIteratorFrame(map._root);
	    }

	    MapIterator.prototype.next = function() {
	      var type = this._type;
	      var stack = this._stack;
	      while (stack) {
	        var node = stack.node;
	        var index = stack.index++;
	        var maxIndex;
	        if (node.entry) {
	          if (index === 0) {
	            return mapIteratorValue(type, node.entry);
	          }
	        } else if (node.entries) {
	          maxIndex = node.entries.length - 1;
	          if (index <= maxIndex) {
	            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	          }
	        } else {
	          maxIndex = node.nodes.length - 1;
	          if (index <= maxIndex) {
	            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	            if (subNode) {
	              if (subNode.entry) {
	                return mapIteratorValue(type, subNode.entry);
	              }
	              stack = this._stack = mapIteratorFrame(subNode, stack);
	            }
	            continue;
	          }
	        }
	        stack = this._stack = this._stack.__prev;
	      }
	      return iteratorDone();
	    };


	  function mapIteratorValue(type, entry) {
	    return iteratorValue(type, entry[0], entry[1]);
	  }

	  function mapIteratorFrame(node, prev) {
	    return {
	      node: node,
	      index: 0,
	      __prev: prev
	    };
	  }

	  function makeMap(size, root, ownerID, hash) {
	    var map = Object.create(MapPrototype);
	    map.size = size;
	    map._root = root;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_MAP;
	  function emptyMap() {
	    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	  }

	  function updateMap(map, k, v) {
	    var newRoot;
	    var newSize;
	    if (!map._root) {
	      if (v === NOT_SET) {
	        return map;
	      }
	      newSize = 1;
	      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	    } else {
	      var didChangeSize = MakeRef(CHANGE_LENGTH);
	      var didAlter = MakeRef(DID_ALTER);
	      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
	      if (!didAlter.value) {
	        return map;
	      }
	      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	    }
	    if (map.__ownerID) {
	      map.size = newSize;
	      map._root = newRoot;
	      map.__hash = undefined;
	      map.__altered = true;
	      return map;
	    }
	    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	  }

	  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (!node) {
	      if (value === NOT_SET) {
	        return node;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return new ValueNode(ownerID, keyHash, [key, value]);
	    }
	    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	  }

	  function isLeafNode(node) {
	    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	  }

	  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	    if (node.keyHash === keyHash) {
	      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	    }

	    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	    var newNode;
	    var nodes = idx1 === idx2 ?
	      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
	      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

	    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
	  }

	  function createNodes(ownerID, entries, key, value) {
	    if (!ownerID) {
	      ownerID = new OwnerID();
	    }
	    var node = new ValueNode(ownerID, hash(key), [key, value]);
	    for (var ii = 0; ii < entries.length; ii++) {
	      var entry = entries[ii];
	      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	    }
	    return node;
	  }

	  function packNodes(ownerID, nodes, count, excluding) {
	    var bitmap = 0;
	    var packedII = 0;
	    var packedNodes = new Array(count);
	    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	      var node = nodes[ii];
	      if (node !== undefined && ii !== excluding) {
	        bitmap |= bit;
	        packedNodes[packedII++] = node;
	      }
	    }
	    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	  }

	  function expandNodes(ownerID, nodes, bitmap, including, node) {
	    var count = 0;
	    var expandedNodes = new Array(SIZE);
	    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	    }
	    expandedNodes[including] = node;
	    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	  }

	  function mergeIntoMapWith(map, merger, iterables) {
	    var iters = [];
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = KeyedIterable(value);
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    return mergeIntoCollectionWith(map, merger, iters);
	  }

	  function deepMerger(merger) {
	    return function(existing, value) 
	      {return existing && existing.mergeDeepWith && isIterable(value) ?
	        existing.mergeDeepWith(merger, value) :
	        merger ? merger(existing, value) : value};
	  }

	  function mergeIntoCollectionWith(collection, merger, iters) {
	    iters = iters.filter(function(x ) {return x.size !== 0});
	    if (iters.length === 0) {
	      return collection;
	    }
	    if (collection.size === 0 && iters.length === 1) {
	      return collection.constructor(iters[0]);
	    }
	    return collection.withMutations(function(collection ) {
	      var mergeIntoMap = merger ?
	        function(value, key)  {
	          collection.update(key, NOT_SET, function(existing )
	            {return existing === NOT_SET ? value : merger(existing, value)}
	          );
	        } :
	        function(value, key)  {
	          collection.set(key, value);
	        }
	      for (var ii = 0; ii < iters.length; ii++) {
	        iters[ii].forEach(mergeIntoMap);
	      }
	    });
	  }

	  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
	    var isNotSet = existing === NOT_SET;
	    var step = keyPathIter.next();
	    if (step.done) {
	      var existingValue = isNotSet ? notSetValue : existing;
	      var newValue = updater(existingValue);
	      return newValue === existingValue ? existing : newValue;
	    }
	    invariant(
	      isNotSet || (existing && existing.set),
	      'invalid keyPath'
	    );
	    var key = step.value;
	    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
	    var nextUpdated = updateInDeepMap(
	      nextExisting,
	      keyPathIter,
	      notSetValue,
	      updater
	    );
	    return nextUpdated === nextExisting ? existing :
	      nextUpdated === NOT_SET ? existing.remove(key) :
	      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
	  }

	  function popCount(x) {
	    x = x - ((x >> 1) & 0x55555555);
	    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
	    x = (x + (x >> 4)) & 0x0f0f0f0f;
	    x = x + (x >> 8);
	    x = x + (x >> 16);
	    return x & 0x7f;
	  }

	  function setIn(array, idx, val, canEdit) {
	    var newArray = canEdit ? array : arrCopy(array);
	    newArray[idx] = val;
	    return newArray;
	  }

	  function spliceIn(array, idx, val, canEdit) {
	    var newLen = array.length + 1;
	    if (canEdit && idx + 1 === newLen) {
	      array[idx] = val;
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        newArray[ii] = val;
	        after = -1;
	      } else {
	        newArray[ii] = array[ii + after];
	      }
	    }
	    return newArray;
	  }

	  function spliceOut(array, idx, canEdit) {
	    var newLen = array.length - 1;
	    if (canEdit && idx === newLen) {
	      array.pop();
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        after = 1;
	      }
	      newArray[ii] = array[ii + after];
	    }
	    return newArray;
	  }

	  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	  createClass(List, IndexedCollection);

	    // @pragma Construction

	    function List(value) {
	      var empty = emptyList();
	      if (value === null || value === undefined) {
	        return empty;
	      }
	      if (isList(value)) {
	        return value;
	      }
	      var iter = IndexedIterable(value);
	      var size = iter.size;
	      if (size === 0) {
	        return empty;
	      }
	      assertNotInfinite(size);
	      if (size > 0 && size < SIZE) {
	        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	      }
	      return empty.withMutations(function(list ) {
	        list.setSize(size);
	        iter.forEach(function(v, i)  {return list.set(i, v)});
	      });
	    }

	    List.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    List.prototype.toString = function() {
	      return this.__toString('List [', ']');
	    };

	    // @pragma Access

	    List.prototype.get = function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      if (index < 0 || index >= this.size) {
	        return notSetValue;
	      }
	      index += this._origin;
	      var node = listNodeFor(this, index);
	      return node && node.array[index & MASK];
	    };

	    // @pragma Modification

	    List.prototype.set = function(index, value) {
	      return updateList(this, index, value);
	    };

	    List.prototype.remove = function(index) {
	      return !this.has(index) ? this :
	        index === 0 ? this.shift() :
	        index === this.size - 1 ? this.pop() :
	        this.splice(index, 1);
	    };

	    List.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = this._origin = this._capacity = 0;
	        this._level = SHIFT;
	        this._root = this._tail = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyList();
	    };

	    List.prototype.push = function(/*...values*/) {
	      var values = arguments;
	      var oldSize = this.size;
	      return this.withMutations(function(list ) {
	        setListBounds(list, 0, oldSize + values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(oldSize + ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.pop = function() {
	      return setListBounds(this, 0, -1);
	    };

	    List.prototype.unshift = function(/*...values*/) {
	      var values = arguments;
	      return this.withMutations(function(list ) {
	        setListBounds(list, -values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.shift = function() {
	      return setListBounds(this, 1);
	    };

	    // @pragma Composition

	    List.prototype.merge = function(/*...iters*/) {
	      return mergeIntoListWith(this, undefined, arguments);
	    };

	    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, merger, iters);
	    };

	    List.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoListWith(this, deepMerger(undefined), arguments);
	    };

	    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, deepMerger(merger), iters);
	    };

	    List.prototype.setSize = function(size) {
	      return setListBounds(this, 0, size);
	    };

	    // @pragma Iteration

	    List.prototype.slice = function(begin, end) {
	      var size = this.size;
	      if (wholeSlice(begin, end, size)) {
	        return this;
	      }
	      return setListBounds(
	        this,
	        resolveBegin(begin, size),
	        resolveEnd(end, size)
	      );
	    };

	    List.prototype.__iterator = function(type, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      return new src_Iterator__Iterator(function()  {
	        var value = values();
	        return value === DONE ?
	          iteratorDone() :
	          iteratorValue(type, index++, value);
	      });
	    };

	    List.prototype.__iterate = function(fn, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      var value;
	      while ((value = values()) !== DONE) {
	        if (fn(value, index++, this) === false) {
	          break;
	        }
	      }
	      return index;
	    };

	    List.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        return this;
	      }
	      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	    };


	  function isList(maybeList) {
	    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	  }

	  List.isList = isList;

	  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

	  var ListPrototype = List.prototype;
	  ListPrototype[IS_LIST_SENTINEL] = true;
	  ListPrototype[DELETE] = ListPrototype.remove;
	  ListPrototype.setIn = MapPrototype.setIn;
	  ListPrototype.deleteIn =
	  ListPrototype.removeIn = MapPrototype.removeIn;
	  ListPrototype.update = MapPrototype.update;
	  ListPrototype.updateIn = MapPrototype.updateIn;
	  ListPrototype.mergeIn = MapPrototype.mergeIn;
	  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  ListPrototype.withMutations = MapPrototype.withMutations;
	  ListPrototype.asMutable = MapPrototype.asMutable;
	  ListPrototype.asImmutable = MapPrototype.asImmutable;
	  ListPrototype.wasAltered = MapPrototype.wasAltered;



	    function VNode(array, ownerID) {
	      this.array = array;
	      this.ownerID = ownerID;
	    }

	    // TODO: seems like these methods are very similar

	    VNode.prototype.removeBefore = function(ownerID, level, index) {
	      if (index === level ? 1 << level : 0 || this.array.length === 0) {
	        return this;
	      }
	      var originIndex = (index >>> level) & MASK;
	      if (originIndex >= this.array.length) {
	        return new VNode([], ownerID);
	      }
	      var removingFirst = originIndex === 0;
	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[originIndex];
	        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && removingFirst) {
	          return this;
	        }
	      }
	      if (removingFirst && !newChild) {
	        return this;
	      }
	      var editable = editableVNode(this, ownerID);
	      if (!removingFirst) {
	        for (var ii = 0; ii < originIndex; ii++) {
	          editable.array[ii] = undefined;
	        }
	      }
	      if (newChild) {
	        editable.array[originIndex] = newChild;
	      }
	      return editable;
	    };

	    VNode.prototype.removeAfter = function(ownerID, level, index) {
	      if (index === level ? 1 << level : 0 || this.array.length === 0) {
	        return this;
	      }
	      var sizeIndex = ((index - 1) >>> level) & MASK;
	      if (sizeIndex >= this.array.length) {
	        return this;
	      }
	      var removingLast = sizeIndex === this.array.length - 1;
	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[sizeIndex];
	        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && removingLast) {
	          return this;
	        }
	      }
	      if (removingLast && !newChild) {
	        return this;
	      }
	      var editable = editableVNode(this, ownerID);
	      if (!removingLast) {
	        editable.array.pop();
	      }
	      if (newChild) {
	        editable.array[sizeIndex] = newChild;
	      }
	      return editable;
	    };



	  var DONE = {};

	  function iterateList(list, reverse) {
	    var left = list._origin;
	    var right = list._capacity;
	    var tailPos = getTailOffset(right);
	    var tail = list._tail;

	    return iterateNodeOrLeaf(list._root, list._level, 0);

	    function iterateNodeOrLeaf(node, level, offset) {
	      return level === 0 ?
	        iterateLeaf(node, offset) :
	        iterateNode(node, level, offset);
	    }

	    function iterateLeaf(node, offset) {
	      var array = offset === tailPos ? tail && tail.array : node && node.array;
	      var from = offset > left ? 0 : left - offset;
	      var to = right - offset;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        return array && array[idx];
	      };
	    }

	    function iterateNode(node, level, offset) {
	      var values;
	      var array = node && node.array;
	      var from = offset > left ? 0 : (left - offset) >> level;
	      var to = ((right - offset) >> level) + 1;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        do {
	          if (values) {
	            var value = values();
	            if (value !== DONE) {
	              return value;
	            }
	            values = null;
	          }
	          if (from === to) {
	            return DONE;
	          }
	          var idx = reverse ? --to : from++;
	          values = iterateNodeOrLeaf(
	            array && array[idx], level - SHIFT, offset + (idx << level)
	          );
	        } while (true);
	      };
	    }
	  }

	  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	    var list = Object.create(ListPrototype);
	    list.size = capacity - origin;
	    list._origin = origin;
	    list._capacity = capacity;
	    list._level = level;
	    list._root = root;
	    list._tail = tail;
	    list.__ownerID = ownerID;
	    list.__hash = hash;
	    list.__altered = false;
	    return list;
	  }

	  var EMPTY_LIST;
	  function emptyList() {
	    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	  }

	  function updateList(list, index, value) {
	    index = wrapIndex(list, index);

	    if (index >= list.size || index < 0) {
	      return list.withMutations(function(list ) {
	        index < 0 ?
	          setListBounds(list, index).set(0, value) :
	          setListBounds(list, 0, index + 1).set(index, value)
	      });
	    }

	    index += list._origin;

	    var newTail = list._tail;
	    var newRoot = list._root;
	    var didAlter = MakeRef(DID_ALTER);
	    if (index >= getTailOffset(list._capacity)) {
	      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	    } else {
	      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	    }

	    if (!didAlter.value) {
	      return list;
	    }

	    if (list.__ownerID) {
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	  }

	  function updateVNode(node, ownerID, level, index, value, didAlter) {
	    var idx = (index >>> level) & MASK;
	    var nodeHas = node && idx < node.array.length;
	    if (!nodeHas && value === undefined) {
	      return node;
	    }

	    var newNode;

	    if (level > 0) {
	      var lowerNode = node && node.array[idx];
	      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
	      if (newLowerNode === lowerNode) {
	        return node;
	      }
	      newNode = editableVNode(node, ownerID);
	      newNode.array[idx] = newLowerNode;
	      return newNode;
	    }

	    if (nodeHas && node.array[idx] === value) {
	      return node;
	    }

	    SetRef(didAlter);

	    newNode = editableVNode(node, ownerID);
	    if (value === undefined && idx === newNode.array.length - 1) {
	      newNode.array.pop();
	    } else {
	      newNode.array[idx] = value;
	    }
	    return newNode;
	  }

	  function editableVNode(node, ownerID) {
	    if (ownerID && node && ownerID === node.ownerID) {
	      return node;
	    }
	    return new VNode(node ? node.array.slice() : [], ownerID);
	  }

	  function listNodeFor(list, rawIndex) {
	    if (rawIndex >= getTailOffset(list._capacity)) {
	      return list._tail;
	    }
	    if (rawIndex < 1 << (list._level + SHIFT)) {
	      var node = list._root;
	      var level = list._level;
	      while (node && level > 0) {
	        node = node.array[(rawIndex >>> level) & MASK];
	        level -= SHIFT;
	      }
	      return node;
	    }
	  }

	  function setListBounds(list, begin, end) {
	    var owner = list.__ownerID || new OwnerID();
	    var oldOrigin = list._origin;
	    var oldCapacity = list._capacity;
	    var newOrigin = oldOrigin + begin;
	    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
	    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	      return list;
	    }

	    // If it's going to end after it starts, it's empty.
	    if (newOrigin >= newCapacity) {
	      return list.clear();
	    }

	    var newLevel = list._level;
	    var newRoot = list._root;

	    // New origin might require creating a higher root.
	    var offsetShift = 0;
	    while (newOrigin + offsetShift < 0) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	      newLevel += SHIFT;
	      offsetShift += 1 << newLevel;
	    }
	    if (offsetShift) {
	      newOrigin += offsetShift;
	      oldOrigin += offsetShift;
	      newCapacity += offsetShift;
	      oldCapacity += offsetShift;
	    }

	    var oldTailOffset = getTailOffset(oldCapacity);
	    var newTailOffset = getTailOffset(newCapacity);

	    // New size might require creating a higher root.
	    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	      newLevel += SHIFT;
	    }

	    // Locate or create the new tail.
	    var oldTail = list._tail;
	    var newTail = newTailOffset < oldTailOffset ?
	      listNodeFor(list, newCapacity - 1) :
	      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

	    // Merge Tail into tree.
	    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	      newRoot = editableVNode(newRoot, owner);
	      var node = newRoot;
	      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	        var idx = (oldTailOffset >>> level) & MASK;
	        node = node.array[idx] = editableVNode(node.array[idx], owner);
	      }
	      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
	    }

	    // If the size has been reduced, there's a chance the tail needs to be trimmed.
	    if (newCapacity < oldCapacity) {
	      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	    }

	    // If the new origin is within the tail, then we do not need a root.
	    if (newOrigin >= newTailOffset) {
	      newOrigin -= newTailOffset;
	      newCapacity -= newTailOffset;
	      newLevel = SHIFT;
	      newRoot = null;
	      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	    // Otherwise, if the root has been trimmed, garbage collect.
	    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	      offsetShift = 0;

	      // Identify the new top root node of the subtree of the old root.
	      while (newRoot) {
	        var beginIndex = (newOrigin >>> newLevel) & MASK;
	        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
	          break;
	        }
	        if (beginIndex) {
	          offsetShift += (1 << newLevel) * beginIndex;
	        }
	        newLevel -= SHIFT;
	        newRoot = newRoot.array[beginIndex];
	      }

	      // Trim the new sides of the new root.
	      if (newRoot && newOrigin > oldOrigin) {
	        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	      }
	      if (newRoot && newTailOffset < oldTailOffset) {
	        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	      }
	      if (offsetShift) {
	        newOrigin -= offsetShift;
	        newCapacity -= offsetShift;
	      }
	    }

	    if (list.__ownerID) {
	      list.size = newCapacity - newOrigin;
	      list._origin = newOrigin;
	      list._capacity = newCapacity;
	      list._level = newLevel;
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	  }

	  function mergeIntoListWith(list, merger, iterables) {
	    var iters = [];
	    var maxSize = 0;
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = IndexedIterable(value);
	      if (iter.size > maxSize) {
	        maxSize = iter.size;
	      }
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    if (maxSize > list.size) {
	      list = list.setSize(maxSize);
	    }
	    return mergeIntoCollectionWith(list, merger, iters);
	  }

	  function getTailOffset(size) {
	    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
	  }

	  createClass(OrderedMap, src_Map__Map);

	    // @pragma Construction

	    function OrderedMap(value) {
	      return value === null || value === undefined ? emptyOrderedMap() :
	        isOrderedMap(value) ? value :
	        emptyOrderedMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    OrderedMap.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedMap.prototype.toString = function() {
	      return this.__toString('OrderedMap {', '}');
	    };

	    // @pragma Access

	    OrderedMap.prototype.get = function(k, notSetValue) {
	      var index = this._map.get(k);
	      return index !== undefined ? this._list.get(index)[1] : notSetValue;
	    };

	    // @pragma Modification

	    OrderedMap.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._map.clear();
	        this._list.clear();
	        return this;
	      }
	      return emptyOrderedMap();
	    };

	    OrderedMap.prototype.set = function(k, v) {
	      return updateOrderedMap(this, k, v);
	    };

	    OrderedMap.prototype.remove = function(k) {
	      return updateOrderedMap(this, k, NOT_SET);
	    };

	    OrderedMap.prototype.wasAltered = function() {
	      return this._map.wasAltered() || this._list.wasAltered();
	    };

	    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._list.__iterate(
	        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
	        reverse
	      );
	    };

	    OrderedMap.prototype.__iterator = function(type, reverse) {
	      return this._list.fromEntrySeq().__iterator(type, reverse);
	    };

	    OrderedMap.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      var newList = this._list.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        this._list = newList;
	        return this;
	      }
	      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	    };


	  function isOrderedMap(maybeOrderedMap) {
	    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	  }

	  OrderedMap.isOrderedMap = isOrderedMap;

	  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



	  function makeOrderedMap(map, list, ownerID, hash) {
	    var omap = Object.create(OrderedMap.prototype);
	    omap.size = map ? map.size : 0;
	    omap._map = map;
	    omap._list = list;
	    omap.__ownerID = ownerID;
	    omap.__hash = hash;
	    return omap;
	  }

	  var EMPTY_ORDERED_MAP;
	  function emptyOrderedMap() {
	    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	  }

	  function updateOrderedMap(omap, k, v) {
	    var map = omap._map;
	    var list = omap._list;
	    var i = map.get(k);
	    var has = i !== undefined;
	    var newMap;
	    var newList;
	    if (v === NOT_SET) { // removed
	      if (!has) {
	        return omap;
	      }
	      if (list.size >= SIZE && list.size >= map.size * 2) {
	        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
	        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
	        if (omap.__ownerID) {
	          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	        }
	      } else {
	        newMap = map.remove(k);
	        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	      }
	    } else {
	      if (has) {
	        if (v === list.get(i)[1]) {
	          return omap;
	        }
	        newMap = map;
	        newList = list.set(i, [k, v]);
	      } else {
	        newMap = map.set(k, list.size);
	        newList = list.set(list.size, [k, v]);
	      }
	    }
	    if (omap.__ownerID) {
	      omap.size = newMap.size;
	      omap._map = newMap;
	      omap._list = newList;
	      omap.__hash = undefined;
	      return omap;
	    }
	    return makeOrderedMap(newMap, newList);
	  }

	  createClass(Stack, IndexedCollection);

	    // @pragma Construction

	    function Stack(value) {
	      return value === null || value === undefined ? emptyStack() :
	        isStack(value) ? value :
	        emptyStack().unshiftAll(value);
	    }

	    Stack.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Stack.prototype.toString = function() {
	      return this.__toString('Stack [', ']');
	    };

	    // @pragma Access

	    Stack.prototype.get = function(index, notSetValue) {
	      var head = this._head;
	      index = wrapIndex(this, index);
	      while (head && index--) {
	        head = head.next;
	      }
	      return head ? head.value : notSetValue;
	    };

	    Stack.prototype.peek = function() {
	      return this._head && this._head.value;
	    };

	    // @pragma Modification

	    Stack.prototype.push = function(/*...values*/) {
	      if (arguments.length === 0) {
	        return this;
	      }
	      var newSize = this.size + arguments.length;
	      var head = this._head;
	      for (var ii = arguments.length - 1; ii >= 0; ii--) {
	        head = {
	          value: arguments[ii],
	          next: head
	        };
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pushAll = function(iter) {
	      iter = IndexedIterable(iter);
	      if (iter.size === 0) {
	        return this;
	      }
	      assertNotInfinite(iter.size);
	      var newSize = this.size;
	      var head = this._head;
	      iter.reverse().forEach(function(value ) {
	        newSize++;
	        head = {
	          value: value,
	          next: head
	        };
	      });
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pop = function() {
	      return this.slice(1);
	    };

	    Stack.prototype.unshift = function(/*...values*/) {
	      return this.push.apply(this, arguments);
	    };

	    Stack.prototype.unshiftAll = function(iter) {
	      return this.pushAll(iter);
	    };

	    Stack.prototype.shift = function() {
	      return this.pop.apply(this, arguments);
	    };

	    Stack.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._head = undefined;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyStack();
	    };

	    Stack.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      var resolvedBegin = resolveBegin(begin, this.size);
	      var resolvedEnd = resolveEnd(end, this.size);
	      if (resolvedEnd !== this.size) {
	        // super.slice(begin, end);
	        return IndexedCollection.prototype.slice.call(this, begin, end);
	      }
	      var newSize = this.size - resolvedBegin;
	      var head = this._head;
	      while (resolvedBegin--) {
	        head = head.next;
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    // @pragma Mutability

	    Stack.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeStack(this.size, this._head, ownerID, this.__hash);
	    };

	    // @pragma Iteration

	    Stack.prototype.__iterate = function(fn, reverse) {
	      if (reverse) {
	        return this.reverse().__iterate(fn);
	      }
	      var iterations = 0;
	      var node = this._head;
	      while (node) {
	        if (fn(node.value, iterations++, this) === false) {
	          break;
	        }
	        node = node.next;
	      }
	      return iterations;
	    };

	    Stack.prototype.__iterator = function(type, reverse) {
	      if (reverse) {
	        return this.reverse().__iterator(type);
	      }
	      var iterations = 0;
	      var node = this._head;
	      return new src_Iterator__Iterator(function()  {
	        if (node) {
	          var value = node.value;
	          node = node.next;
	          return iteratorValue(type, iterations++, value);
	        }
	        return iteratorDone();
	      });
	    };


	  function isStack(maybeStack) {
	    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	  }

	  Stack.isStack = isStack;

	  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	  var StackPrototype = Stack.prototype;
	  StackPrototype[IS_STACK_SENTINEL] = true;
	  StackPrototype.withMutations = MapPrototype.withMutations;
	  StackPrototype.asMutable = MapPrototype.asMutable;
	  StackPrototype.asImmutable = MapPrototype.asImmutable;
	  StackPrototype.wasAltered = MapPrototype.wasAltered;


	  function makeStack(size, head, ownerID, hash) {
	    var map = Object.create(StackPrototype);
	    map.size = size;
	    map._head = head;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_STACK;
	  function emptyStack() {
	    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	  }

	  createClass(src_Set__Set, SetCollection);

	    // @pragma Construction

	    function src_Set__Set(value) {
	      return value === null || value === undefined ? emptySet() :
	        isSet(value) ? value :
	        emptySet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    src_Set__Set.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    src_Set__Set.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    src_Set__Set.prototype.toString = function() {
	      return this.__toString('Set {', '}');
	    };

	    // @pragma Access

	    src_Set__Set.prototype.has = function(value) {
	      return this._map.has(value);
	    };

	    // @pragma Modification

	    src_Set__Set.prototype.add = function(value) {
	      return updateSet(this, this._map.set(value, true));
	    };

	    src_Set__Set.prototype.remove = function(value) {
	      return updateSet(this, this._map.remove(value));
	    };

	    src_Set__Set.prototype.clear = function() {
	      return updateSet(this, this._map.clear());
	    };

	    // @pragma Composition

	    src_Set__Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
	      iters = iters.filter(function(x ) {return x.size !== 0});
	      if (iters.length === 0) {
	        return this;
	      }
	      if (this.size === 0 && iters.length === 1) {
	        return this.constructor(iters[0]);
	      }
	      return this.withMutations(function(set ) {
	        for (var ii = 0; ii < iters.length; ii++) {
	          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
	        }
	      });
	    };

	    src_Set__Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (!iters.every(function(iter ) {return iter.contains(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    src_Set__Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (iters.some(function(iter ) {return iter.contains(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    src_Set__Set.prototype.merge = function() {
	      return this.union.apply(this, arguments);
	    };

	    src_Set__Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return this.union.apply(this, iters);
	    };

	    src_Set__Set.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator));
	    };

	    src_Set__Set.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator, mapper));
	    };

	    src_Set__Set.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    src_Set__Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
	    };

	    src_Set__Set.prototype.__iterator = function(type, reverse) {
	      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
	    };

	    src_Set__Set.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return this.__make(newMap, ownerID);
	    };


	  function isSet(maybeSet) {
	    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	  }

	  src_Set__Set.isSet = isSet;

	  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

	  var SetPrototype = src_Set__Set.prototype;
	  SetPrototype[IS_SET_SENTINEL] = true;
	  SetPrototype[DELETE] = SetPrototype.remove;
	  SetPrototype.mergeDeep = SetPrototype.merge;
	  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
	  SetPrototype.withMutations = MapPrototype.withMutations;
	  SetPrototype.asMutable = MapPrototype.asMutable;
	  SetPrototype.asImmutable = MapPrototype.asImmutable;

	  SetPrototype.__empty = emptySet;
	  SetPrototype.__make = makeSet;

	  function updateSet(set, newMap) {
	    if (set.__ownerID) {
	      set.size = newMap.size;
	      set._map = newMap;
	      return set;
	    }
	    return newMap === set._map ? set :
	      newMap.size === 0 ? set.__empty() :
	      set.__make(newMap);
	  }

	  function makeSet(map, ownerID) {
	    var set = Object.create(SetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_SET;
	  function emptySet() {
	    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	  }

	  createClass(OrderedSet, src_Set__Set);

	    // @pragma Construction

	    function OrderedSet(value) {
	      return value === null || value === undefined ? emptyOrderedSet() :
	        isOrderedSet(value) ? value :
	        emptyOrderedSet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    OrderedSet.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedSet.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    OrderedSet.prototype.toString = function() {
	      return this.__toString('OrderedSet {', '}');
	    };


	  function isOrderedSet(maybeOrderedSet) {
	    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	  }

	  OrderedSet.isOrderedSet = isOrderedSet;

	  var OrderedSetPrototype = OrderedSet.prototype;
	  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

	  OrderedSetPrototype.__empty = emptyOrderedSet;
	  OrderedSetPrototype.__make = makeOrderedSet;

	  function makeOrderedSet(map, ownerID) {
	    var set = Object.create(OrderedSetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_ORDERED_SET;
	  function emptyOrderedSet() {
	    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	  }

	  createClass(Record, KeyedCollection);

	    function Record(defaultValues, name) {
	      var RecordType = function Record(values) {
	        if (!(this instanceof RecordType)) {
	          return new RecordType(values);
	        }
	        this._map = src_Map__Map(values);
	      };

	      var keys = Object.keys(defaultValues);

	      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	      RecordTypePrototype.constructor = RecordType;
	      name && (RecordTypePrototype._name = name);
	      RecordTypePrototype._defaultValues = defaultValues;
	      RecordTypePrototype._keys = keys;
	      RecordTypePrototype.size = keys.length;

	      try {
	        keys.forEach(function(key ) {
	          Object.defineProperty(RecordType.prototype, key, {
	            get: function() {
	              return this.get(key);
	            },
	            set: function(value) {
	              invariant(this.__ownerID, 'Cannot set on an immutable record.');
	              this.set(key, value);
	            }
	          });
	        });
	      } catch (error) {
	        // Object.defineProperty failed. Probably IE8.
	      }

	      return RecordType;
	    }

	    Record.prototype.toString = function() {
	      return this.__toString(recordName(this) + ' {', '}');
	    };

	    // @pragma Access

	    Record.prototype.has = function(k) {
	      return this._defaultValues.hasOwnProperty(k);
	    };

	    Record.prototype.get = function(k, notSetValue) {
	      if (!this.has(k)) {
	        return notSetValue;
	      }
	      var defaultVal = this._defaultValues[k];
	      return this._map ? this._map.get(k, defaultVal) : defaultVal;
	    };

	    // @pragma Modification

	    Record.prototype.clear = function() {
	      if (this.__ownerID) {
	        this._map && this._map.clear();
	        return this;
	      }
	      var SuperRecord = Object.getPrototypeOf(this).constructor;
	      return SuperRecord._empty || (SuperRecord._empty = makeRecord(this, emptyMap()));
	    };

	    Record.prototype.set = function(k, v) {
	      if (!this.has(k)) {
	        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
	      }
	      var newMap = this._map && this._map.set(k, v);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.remove = function(k) {
	      if (!this.has(k)) {
	        return this;
	      }
	      var newMap = this._map && this._map.remove(k);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
	    };

	    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
	    };

	    Record.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map && this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return makeRecord(this, newMap, ownerID);
	    };


	  var RecordPrototype = Record.prototype;
	  RecordPrototype[DELETE] = RecordPrototype.remove;
	  RecordPrototype.deleteIn =
	  RecordPrototype.removeIn = MapPrototype.removeIn;
	  RecordPrototype.merge = MapPrototype.merge;
	  RecordPrototype.mergeWith = MapPrototype.mergeWith;
	  RecordPrototype.mergeIn = MapPrototype.mergeIn;
	  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
	  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
	  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  RecordPrototype.setIn = MapPrototype.setIn;
	  RecordPrototype.update = MapPrototype.update;
	  RecordPrototype.updateIn = MapPrototype.updateIn;
	  RecordPrototype.withMutations = MapPrototype.withMutations;
	  RecordPrototype.asMutable = MapPrototype.asMutable;
	  RecordPrototype.asImmutable = MapPrototype.asImmutable;


	  function makeRecord(likeRecord, map, ownerID) {
	    var record = Object.create(Object.getPrototypeOf(likeRecord));
	    record._map = map;
	    record.__ownerID = ownerID;
	    return record;
	  }

	  function recordName(record) {
	    return record._name || record.constructor.name;
	  }

	  function deepEqual(a, b) {
	    if (a === b) {
	      return true;
	    }

	    if (
	      !isIterable(b) ||
	      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
	      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
	      isKeyed(a) !== isKeyed(b) ||
	      isIndexed(a) !== isIndexed(b) ||
	      isOrdered(a) !== isOrdered(b)
	    ) {
	      return false;
	    }

	    if (a.size === 0 && b.size === 0) {
	      return true;
	    }

	    var notAssociative = !isAssociative(a);

	    if (isOrdered(a)) {
	      var entries = a.entries();
	      return b.every(function(v, k)  {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done;
	    }

	    var flipped = false;

	    if (a.size === undefined) {
	      if (b.size === undefined) {
	        a.cacheResult();
	      } else {
	        flipped = true;
	        var _ = a;
	        a = b;
	        b = _;
	      }
	    }

	    var allEqual = true;
	    var bSize = b.__iterate(function(v, k)  {
	      if (notAssociative ? !a.has(v) :
	          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	        allEqual = false;
	        return false;
	      }
	    });

	    return allEqual && a.size === bSize;
	  }

	  createClass(Range, IndexedSeq);

	    function Range(start, end, step) {
	      if (!(this instanceof Range)) {
	        return new Range(start, end, step);
	      }
	      invariant(step !== 0, 'Cannot step a Range by 0');
	      start = start || 0;
	      if (end === undefined) {
	        end = Infinity;
	      }
	      step = step === undefined ? 1 : Math.abs(step);
	      if (end < start) {
	        step = -step;
	      }
	      this._start = start;
	      this._end = end;
	      this._step = step;
	      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	      if (this.size === 0) {
	        if (EMPTY_RANGE) {
	          return EMPTY_RANGE;
	        }
	        EMPTY_RANGE = this;
	      }
	    }

	    Range.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Range []';
	      }
	      return 'Range [ ' +
	        this._start + '...' + this._end +
	        (this._step > 1 ? ' by ' + this._step : '') +
	      ' ]';
	    };

	    Range.prototype.get = function(index, notSetValue) {
	      return this.has(index) ?
	        this._start + wrapIndex(this, index) * this._step :
	        notSetValue;
	    };

	    Range.prototype.contains = function(searchValue) {
	      var possibleIndex = (searchValue - this._start) / this._step;
	      return possibleIndex >= 0 &&
	        possibleIndex < this.size &&
	        possibleIndex === Math.floor(possibleIndex);
	    };

	    Range.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      begin = resolveBegin(begin, this.size);
	      end = resolveEnd(end, this.size);
	      if (end <= begin) {
	        return new Range(0, 0);
	      }
	      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	    };

	    Range.prototype.indexOf = function(searchValue) {
	      var offsetValue = searchValue - this._start;
	      if (offsetValue % this._step === 0) {
	        var index = offsetValue / this._step;
	        if (index >= 0 && index < this.size) {
	          return index
	        }
	      }
	      return -1;
	    };

	    Range.prototype.lastIndexOf = function(searchValue) {
	      return this.indexOf(searchValue);
	    };

	    Range.prototype.__iterate = function(fn, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(value, ii, this) === false) {
	          return ii + 1;
	        }
	        value += reverse ? -step : step;
	      }
	      return ii;
	    };

	    Range.prototype.__iterator = function(type, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      var ii = 0;
	      return new src_Iterator__Iterator(function()  {
	        var v = value;
	        value += reverse ? -step : step;
	        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
	      });
	    };

	    Range.prototype.equals = function(other) {
	      return other instanceof Range ?
	        this._start === other._start &&
	        this._end === other._end &&
	        this._step === other._step :
	        deepEqual(this, other);
	    };


	  var EMPTY_RANGE;

	  createClass(Repeat, IndexedSeq);

	    function Repeat(value, times) {
	      if (!(this instanceof Repeat)) {
	        return new Repeat(value, times);
	      }
	      this._value = value;
	      this.size = times === undefined ? Infinity : Math.max(0, times);
	      if (this.size === 0) {
	        if (EMPTY_REPEAT) {
	          return EMPTY_REPEAT;
	        }
	        EMPTY_REPEAT = this;
	      }
	    }

	    Repeat.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Repeat []';
	      }
	      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	    };

	    Repeat.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._value : notSetValue;
	    };

	    Repeat.prototype.contains = function(searchValue) {
	      return is(this._value, searchValue);
	    };

	    Repeat.prototype.slice = function(begin, end) {
	      var size = this.size;
	      return wholeSlice(begin, end, size) ? this :
	        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	    };

	    Repeat.prototype.reverse = function() {
	      return this;
	    };

	    Repeat.prototype.indexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return 0;
	      }
	      return -1;
	    };

	    Repeat.prototype.lastIndexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return this.size;
	      }
	      return -1;
	    };

	    Repeat.prototype.__iterate = function(fn, reverse) {
	      for (var ii = 0; ii < this.size; ii++) {
	        if (fn(this._value, ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      var ii = 0;
	      return new src_Iterator__Iterator(function() 
	        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
	      );
	    };

	    Repeat.prototype.equals = function(other) {
	      return other instanceof Repeat ?
	        is(this._value, other._value) :
	        deepEqual(other);
	    };


	  var EMPTY_REPEAT;

	  /**
	   * Contributes additional methods to a constructor
	   */
	  function mixin(ctor, methods) {
	    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
	    Object.keys(methods).forEach(keyCopier);
	    Object.getOwnPropertySymbols &&
	      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	    return ctor;
	  }

	  Iterable.Iterator = src_Iterator__Iterator;

	  mixin(Iterable, {

	    // ### Conversion to other types

	    toArray: function() {
	      assertNotInfinite(this.size);
	      var array = new Array(this.size || 0);
	      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
	      return array;
	    },

	    toIndexedSeq: function() {
	      return new ToIndexedSequence(this);
	    },

	    toJS: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
	      ).__toJS();
	    },

	    toJSON: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
	      ).__toJS();
	    },

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, true);
	    },

	    toMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return src_Map__Map(this.toKeyedSeq());
	    },

	    toObject: function() {
	      assertNotInfinite(this.size);
	      var object = {};
	      this.__iterate(function(v, k)  { object[k] = v; });
	      return object;
	    },

	    toOrderedMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedMap(this.toKeyedSeq());
	    },

	    toOrderedSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return src_Set__Set(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSetSeq: function() {
	      return new ToSetSequence(this);
	    },

	    toSeq: function() {
	      return isIndexed(this) ? this.toIndexedSeq() :
	        isKeyed(this) ? this.toKeyedSeq() :
	        this.toSetSeq();
	    },

	    toStack: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Stack(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toList: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return List(isKeyed(this) ? this.valueSeq() : this);
	    },


	    // ### Common JavaScript methods and properties

	    toString: function() {
	      return '[Iterable]';
	    },

	    __toString: function(head, tail) {
	      if (this.size === 0) {
	        return head + tail;
	      }
	      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    concat: function() {var values = SLICE$0.call(arguments, 0);
	      return reify(this, concatFactory(this, values));
	    },

	    contains: function(searchValue) {
	      return this.some(function(value ) {return is(value, searchValue)});
	    },

	    entries: function() {
	      return this.__iterator(ITERATE_ENTRIES);
	    },

	    every: function(predicate, context) {
	      assertNotInfinite(this.size);
	      var returnValue = true;
	      this.__iterate(function(v, k, c)  {
	        if (!predicate.call(context, v, k, c)) {
	          returnValue = false;
	          return false;
	        }
	      });
	      return returnValue;
	    },

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, true));
	    },

	    find: function(predicate, context, notSetValue) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[1] : notSetValue;
	    },

	    findEntry: function(predicate, context) {
	      var found;
	      this.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          found = [k, v];
	          return false;
	        }
	      });
	      return found;
	    },

	    findLastEntry: function(predicate, context) {
	      return this.toSeq().reverse().findEntry(predicate, context);
	    },

	    forEach: function(sideEffect, context) {
	      assertNotInfinite(this.size);
	      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	    },

	    join: function(separator) {
	      assertNotInfinite(this.size);
	      separator = separator !== undefined ? '' + separator : ',';
	      var joined = '';
	      var isFirst = true;
	      this.__iterate(function(v ) {
	        isFirst ? (isFirst = false) : (joined += separator);
	        joined += v !== null && v !== undefined ? v.toString() : '';
	      });
	      return joined;
	    },

	    keys: function() {
	      return this.__iterator(ITERATE_KEYS);
	    },

	    map: function(mapper, context) {
	      return reify(this, mapFactory(this, mapper, context));
	    },

	    reduce: function(reducer, initialReduction, context) {
	      assertNotInfinite(this.size);
	      var reduction;
	      var useFirst;
	      if (arguments.length < 2) {
	        useFirst = true;
	      } else {
	        reduction = initialReduction;
	      }
	      this.__iterate(function(v, k, c)  {
	        if (useFirst) {
	          useFirst = false;
	          reduction = v;
	        } else {
	          reduction = reducer.call(context, reduction, v, k, c);
	        }
	      });
	      return reduction;
	    },

	    reduceRight: function(reducer, initialReduction, context) {
	      var reversed = this.toKeyedSeq().reverse();
	      return reversed.reduce.apply(reversed, arguments);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, true));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, true));
	    },

	    some: function(predicate, context) {
	      return !this.every(not(predicate), context);
	    },

	    sort: function(comparator) {
	      return reify(this, sortFactory(this, comparator));
	    },

	    values: function() {
	      return this.__iterator(ITERATE_VALUES);
	    },


	    // ### More sequential methods

	    butLast: function() {
	      return this.slice(0, -1);
	    },

	    isEmpty: function() {
	      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
	    },

	    count: function(predicate, context) {
	      return ensureSize(
	        predicate ? this.toSeq().filter(predicate, context) : this
	      );
	    },

	    countBy: function(grouper, context) {
	      return countByFactory(this, grouper, context);
	    },

	    equals: function(other) {
	      return deepEqual(this, other);
	    },

	    entrySeq: function() {
	      var iterable = this;
	      if (iterable._cache) {
	        // We cache as an entries array, so we can just return the cache!
	        return new ArraySeq(iterable._cache);
	      }
	      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
	      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
	      return entriesSequence;
	    },

	    filterNot: function(predicate, context) {
	      return this.filter(not(predicate), context);
	    },

	    findLast: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	    },

	    first: function() {
	      return this.find(returnTrue);
	    },

	    flatMap: function(mapper, context) {
	      return reify(this, flatMapFactory(this, mapper, context));
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, true));
	    },

	    fromEntrySeq: function() {
	      return new FromEntriesSequence(this);
	    },

	    get: function(searchKey, notSetValue) {
	      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
	    },

	    getIn: function(searchKeyPath, notSetValue) {
	      var nested = this;
	      // Note: in an ES6 environment, we would prefer:
	      // for (var key of searchKeyPath) {
	      var iter = forceIterator(searchKeyPath);
	      var step;
	      while (!(step = iter.next()).done) {
	        var key = step.value;
	        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
	        if (nested === NOT_SET) {
	          return notSetValue;
	        }
	      }
	      return nested;
	    },

	    groupBy: function(grouper, context) {
	      return groupByFactory(this, grouper, context);
	    },

	    has: function(searchKey) {
	      return this.get(searchKey, NOT_SET) !== NOT_SET;
	    },

	    hasIn: function(searchKeyPath) {
	      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
	    },

	    isSubset: function(iter) {
	      iter = typeof iter.contains === 'function' ? iter : Iterable(iter);
	      return this.every(function(value ) {return iter.contains(value)});
	    },

	    isSuperset: function(iter) {
	      return iter.isSubset(this);
	    },

	    keySeq: function() {
	      return this.toSeq().map(keyMapper).toIndexedSeq();
	    },

	    last: function() {
	      return this.toSeq().reverse().first();
	    },

	    max: function(comparator) {
	      return maxFactory(this, comparator);
	    },

	    maxBy: function(mapper, comparator) {
	      return maxFactory(this, comparator, mapper);
	    },

	    min: function(comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	    },

	    minBy: function(mapper, comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	    },

	    rest: function() {
	      return this.slice(1);
	    },

	    skip: function(amount) {
	      return this.slice(Math.max(0, amount));
	    },

	    skipLast: function(amount) {
	      return reify(this, this.toSeq().reverse().skip(amount).reverse());
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, true));
	    },

	    skipUntil: function(predicate, context) {
	      return this.skipWhile(not(predicate), context);
	    },

	    sortBy: function(mapper, comparator) {
	      return reify(this, sortFactory(this, comparator, mapper));
	    },

	    take: function(amount) {
	      return this.slice(0, Math.max(0, amount));
	    },

	    takeLast: function(amount) {
	      return reify(this, this.toSeq().reverse().take(amount).reverse());
	    },

	    takeWhile: function(predicate, context) {
	      return reify(this, takeWhileFactory(this, predicate, context));
	    },

	    takeUntil: function(predicate, context) {
	      return this.takeWhile(not(predicate), context);
	    },

	    valueSeq: function() {
	      return this.toIndexedSeq();
	    },


	    // ### Hashable Object

	    hashCode: function() {
	      return this.__hash || (this.__hash = hashIterable(this));
	    },


	    // ### Internal

	    // abstract __iterate(fn, reverse)

	    // abstract __iterator(type, reverse)
	  });

	  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  var IterablePrototype = Iterable.prototype;
	  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
	  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
	  IterablePrototype.__toJS = IterablePrototype.toArray;
	  IterablePrototype.__toStringMapper = quoteString;
	  IterablePrototype.inspect =
	  IterablePrototype.toSource = function() { return this.toString(); };
	  IterablePrototype.chain = IterablePrototype.flatMap;

	  // Temporary warning about using length
	  (function () {
	    try {
	      Object.defineProperty(IterablePrototype, 'length', {
	        get: function () {
	          if (!Iterable.noLengthWarning) {
	            var stack;
	            try {
	              throw new Error();
	            } catch (error) {
	              stack = error.stack;
	            }
	            if (stack.indexOf('_wrapObject') === -1) {
	              console && console.warn && console.warn(
	                'iterable.length has been deprecated, '+
	                'use iterable.size or iterable.count(). '+
	                'This warning will become a silent error in a future version. ' +
	                stack
	              );
	              return this.size;
	            }
	          }
	        }
	      });
	    } catch (e) {}
	  })();



	  mixin(KeyedIterable, {

	    // ### More sequential methods

	    flip: function() {
	      return reify(this, flipFactory(this));
	    },

	    findKey: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry && entry[0];
	    },

	    findLastKey: function(predicate, context) {
	      return this.toSeq().reverse().findKey(predicate, context);
	    },

	    keyOf: function(searchValue) {
	      return this.findKey(function(value ) {return is(value, searchValue)});
	    },

	    lastKeyOf: function(searchValue) {
	      return this.findLastKey(function(value ) {return is(value, searchValue)});
	    },

	    mapEntries: function(mapper, context) {var this$0 = this;
	      var iterations = 0;
	      return reify(this,
	        this.toSeq().map(
	          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
	        ).fromEntrySeq()
	      );
	    },

	    mapKeys: function(mapper, context) {var this$0 = this;
	      return reify(this,
	        this.toSeq().flip().map(
	          function(k, v)  {return mapper.call(context, k, v, this$0)}
	        ).flip()
	      );
	    },

	  });

	  var KeyedIterablePrototype = KeyedIterable.prototype;
	  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
	  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
	  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
	  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return k + ': ' + quoteString(v)};



	  mixin(IndexedIterable, {

	    // ### Conversion to other types

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, false);
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, false));
	    },

	    findIndex: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    indexOf: function(searchValue) {
	      var key = this.toKeyedSeq().keyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    lastIndexOf: function(searchValue) {
	      return this.toSeq().reverse().indexOf(searchValue);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, false));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, false));
	    },

	    splice: function(index, removeNum /*, ...values*/) {
	      var numArgs = arguments.length;
	      removeNum = Math.max(removeNum | 0, 0);
	      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
	        return this;
	      }
	      index = resolveBegin(index, this.size);
	      var spliced = this.slice(0, index);
	      return reify(
	        this,
	        numArgs === 1 ?
	          spliced :
	          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
	      );
	    },


	    // ### More collection methods

	    findLastIndex: function(predicate, context) {
	      var key = this.toKeyedSeq().findLastKey(predicate, context);
	      return key === undefined ? -1 : key;
	    },

	    first: function() {
	      return this.get(0);
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, false));
	    },

	    get: function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return (index < 0 || (this.size === Infinity ||
	          (this.size !== undefined && index > this.size))) ?
	        notSetValue :
	        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
	    },

	    has: function(index) {
	      index = wrapIndex(this, index);
	      return index >= 0 && (this.size !== undefined ?
	        this.size === Infinity || index < this.size :
	        this.indexOf(index) !== -1
	      );
	    },

	    interpose: function(separator) {
	      return reify(this, interposeFactory(this, separator));
	    },

	    interleave: function(/*...iterables*/) {
	      var iterables = [this].concat(arrCopy(arguments));
	      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
	      var interleaved = zipped.flatten(true);
	      if (zipped.size) {
	        interleaved.size = zipped.size * iterables.length;
	      }
	      return reify(this, interleaved);
	    },

	    last: function() {
	      return this.get(-1);
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, false));
	    },

	    zip: function(/*, ...iterables */) {
	      var iterables = [this].concat(arrCopy(arguments));
	      return reify(this, zipWithFactory(this, defaultZipper, iterables));
	    },

	    zipWith: function(zipper/*, ...iterables */) {
	      var iterables = arrCopy(arguments);
	      iterables[0] = this;
	      return reify(this, zipWithFactory(this, zipper, iterables));
	    },

	  });

	  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
	  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



	  mixin(SetIterable, {

	    // ### ES6 Collection methods (ES6 Array and Map)

	    get: function(value, notSetValue) {
	      return this.has(value) ? value : notSetValue;
	    },

	    contains: function(value) {
	      return this.has(value);
	    },


	    // ### More sequential methods

	    keySeq: function() {
	      return this.valueSeq();
	    },

	  });

	  SetIterable.prototype.has = IterablePrototype.contains;


	  // Mixin subclasses

	  mixin(KeyedSeq, KeyedIterable.prototype);
	  mixin(IndexedSeq, IndexedIterable.prototype);
	  mixin(SetSeq, SetIterable.prototype);

	  mixin(KeyedCollection, KeyedIterable.prototype);
	  mixin(IndexedCollection, IndexedIterable.prototype);
	  mixin(SetCollection, SetIterable.prototype);


	  // #pragma Helper functions

	  function keyMapper(v, k) {
	    return k;
	  }

	  function entryMapper(v, k) {
	    return [k, v];
	  }

	  function not(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    }
	  }

	  function neg(predicate) {
	    return function() {
	      return -predicate.apply(this, arguments);
	    }
	  }

	  function quoteString(value) {
	    return typeof value === 'string' ? JSON.stringify(value) : value;
	  }

	  function defaultZipper() {
	    return arrCopy(arguments);
	  }

	  function defaultNegComparator(a, b) {
	    return a < b ? 1 : a > b ? -1 : 0;
	  }

	  function hashIterable(iterable) {
	    if (iterable.size === Infinity) {
	      return 0;
	    }
	    var ordered = isOrdered(iterable);
	    var keyed = isKeyed(iterable);
	    var h = ordered ? 1 : 0;
	    var size = iterable.__iterate(
	      keyed ?
	        ordered ?
	          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
	          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
	        ordered ?
	          function(v ) { h = 31 * h + hash(v) | 0; } :
	          function(v ) { h = h + hash(v) | 0; }
	    );
	    return murmurHashOfSize(size, h);
	  }

	  function murmurHashOfSize(size, h) {
	    h = src_Math__imul(h, 0xCC9E2D51);
	    h = src_Math__imul(h << 15 | h >>> -15, 0x1B873593);
	    h = src_Math__imul(h << 13 | h >>> -13, 5);
	    h = (h + 0xE6546B64 | 0) ^ size;
	    h = src_Math__imul(h ^ h >>> 16, 0x85EBCA6B);
	    h = src_Math__imul(h ^ h >>> 13, 0xC2B2AE35);
	    h = smi(h ^ h >>> 16);
	    return h;
	  }

	  function hashMerge(a, b) {
	    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
	  }

	  var Immutable = {

	    Iterable: Iterable,

	    Seq: Seq,
	    Collection: Collection,
	    Map: src_Map__Map,
	    OrderedMap: OrderedMap,
	    List: List,
	    Stack: Stack,
	    Set: src_Set__Set,
	    OrderedSet: OrderedSet,

	    Record: Record,
	    Range: Range,
	    Repeat: Repeat,

	    is: is,
	    fromJS: fromJS,

	  };

	  return Immutable;

	}));

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {/**
	 * TODO:
	 *   - Add horizontal scroll support
	 *   - Add horizontal body spacing support
	 */
	(function () {
	  
	  (module.exports['shava.directives.scrollarea.scrollareaController'] = angular.module('shava.directives.scrollarea.scrollareaController', []))

	    .controller('ShScrollareaController', scrollerController);

	  scrollerController.$inject = ['$element', '$timeout', '$attrs'];

	  function scrollerController($element, $timeout, $attrs) {

	    var bodySpacing = 0;
	    var addSpacing = 0;

	    this.setBodySpacing = function (iSpacing) {
	      bodySpacing = parseInt(iSpacing);
	    };

	    this.incrementSpacing = function (iSpacing) {
	      addSpacing = addSpacing + iSpacing;
	    };

	    this.decrementSpacing = function (iSpacing) {
	      addSpacing = addSpacing - iSpacing;
	    };

	    this.onScroll = function (el, fn) {
	      $element.on('scroll', fn);
	      el.on('$destroy', function () {
	        $element.off('scroll', fn);
	      })
	    };

	    this.elOffsetTop = function (el) {
	      return el.offset().top - bodySpacing;
	    }

	    this.scrollTop = function () {
	      return $element.scrollTop();
	    };

	    this.scrollLeft = function () {
	      return $element.scrollLeft();
	    };

	    this.position = function () {
	      return $element.offset();
	    };

	    // This scrolls to an element with additional spacing
	    // of offSpacing, offSpacing defaults to `1.5`
	    // so it will scroll an extra half the element size 
	    this.scrollTo = function (el, offSpacing) {
	      // jQuery's offset() doesn't add the <body> padding
	      // so we use addSpacing for that
	      var height = $element.outerHeight()
	        , top = $element.scrollTop()
	        , posTop = this.elOffsetTop(el)
	        , elHeight = el.outerHeight()
	        , sizeOffset = (elHeight * (offSpacing != null ? offSpacing : 1.5));
	      if (posTop - addSpacing < 0) {
	        $element.scrollTop(top + posTop + elHeight - sizeOffset - addSpacing);
	      }
	      else if (posTop + elHeight > height) {
	        $element.scrollTop((top + posTop - height) + sizeOffset);
	      }

	    };

	  }

	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {(function () {
	  (module.exports['shava.services.action.constants'] = angular.module('shava.services.action.constants', []))
	    .constant('actionConstants', {
	      SOURCE_CLIENT: 1,
	      SOURCE_SERVER: 2
	    });
	})(); 
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"exports?window.angular!angular\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var now = __webpack_require__(125)
	  , global = typeof window === 'undefined' ? {} : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = global['request' + suffix]
	  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]
	  , isNative = true

	for(var i = 0; i < vendors.length && !raf; i++) {
	  raf = global[vendors[i] + 'Request' + suffix]
	  caf = global[vendors[i] + 'Cancel' + suffix]
	      || global[vendors[i] + 'CancelRequest' + suffix]
	}

	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  isNative = false

	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60

	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }

	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}

	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  if(!isNative) {
	    return raf.call(global, fn)
	  }
	  return raf.call(global, function() {
	    try{
	      fn.apply(this, arguments)
	    } catch(e) {
	      setTimeout(function() { throw e }, 0)
	    }
	  })
	}
	module.exports.cancel = function() {
	  caf.apply(global, arguments)
	}


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(124);


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.7.0
	//     http://underscorejs.org
	//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    concat           = ArrayProto.concat,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind;

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.7.0';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var createCallback = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  _.iteratee = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return createCallback(value, context, argCount);
	    if (_.isObject(value)) return _.matches(value);
	    return _.property(value);
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    if (obj == null) return obj;
	    iteratee = createCallback(iteratee, context);
	    var i, length = obj.length;
	    if (length === +length) {
	      for (i = 0; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    if (obj == null) return [];
	    iteratee = _.iteratee(iteratee, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length),
	        currentKey;
	    for (var index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  var reduceError = 'Reduce of empty array with no initial value';

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
	    if (obj == null) obj = [];
	    iteratee = createCallback(iteratee, context, 4);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index = 0, currentKey;
	    if (arguments.length < 3) {
	      if (!length) throw new TypeError(reduceError);
	      memo = obj[keys ? keys[index++] : index++];
	    }
	    for (; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      memo = iteratee(memo, obj[currentKey], currentKey, obj);
	    }
	    return memo;
	  };

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
	    if (obj == null) obj = [];
	    iteratee = createCallback(iteratee, context, 4);
	    var keys = obj.length !== + obj.length && _.keys(obj),
	        index = (keys || obj).length,
	        currentKey;
	    if (arguments.length < 3) {
	      if (!index) throw new TypeError(reduceError);
	      memo = obj[keys ? keys[--index] : --index];
	    }
	    while (index--) {
	      currentKey = keys ? keys[index] : index;
	      memo = iteratee(memo, obj[currentKey], currentKey, obj);
	    }
	    return memo;
	  };

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var result;
	    predicate = _.iteratee(predicate, context);
	    _.some(obj, function(value, index, list) {
	      if (predicate(value, index, list)) {
	        result = value;
	        return true;
	      }
	    });
	    return result;
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    if (obj == null) return results;
	    predicate = _.iteratee(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    if (obj == null) return true;
	    predicate = _.iteratee(predicate, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index, currentKey;
	    for (index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    if (obj == null) return false;
	    predicate = _.iteratee(predicate, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index, currentKey;
	    for (index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given value (using `===`).
	  // Aliased as `include`.
	  _.contains = _.include = function(obj, target) {
	    if (obj == null) return false;
	    if (obj.length !== +obj.length) obj = _.values(obj);
	    return _.indexOf(obj, target) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      return (isFunc ? method : value[method]).apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matches(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matches(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = obj.length === +obj.length ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = obj.length === +obj.length ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (obj.length !== +obj.length) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = _.iteratee(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = _.iteratee(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = array.length;
	    while (low < high) {
	      var mid = low + high >>> 1;
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (obj.length === +obj.length) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = _.iteratee(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    if (n < 0) return [];
	    return slice.call(array, 0, n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N. The **guard** check allows it to work with
	  // `_.map`.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array. The **guard** check allows it to work with `_.map`.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return slice.call(array, Math.max(array.length - n, 0));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array. The **guard**
	  // check allows it to work with `_.map`.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, output) {
	    if (shallow && _.every(input, _.isArray)) {
	      return concat.apply(output, input);
	    }
	    for (var i = 0, length = input.length; i < length; i++) {
	      var value = input[i];
	      if (!_.isArray(value) && !_.isArguments(value)) {
	        if (!strict) output.push(value);
	      } else if (shallow) {
	        push.apply(output, value);
	      } else {
	        flatten(value, shallow, strict, output);
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false, []);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (array == null) return [];
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = array.length; i < length; i++) {
	      var value = array[i];
	      if (isSorted) {
	        if (!i || seen !== value) result.push(value);
	        seen = value;
	      } else if (iteratee) {
	        var computed = iteratee(value, i, array);
	        if (_.indexOf(seen, computed) < 0) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (_.indexOf(result, value) < 0) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true, []));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    if (array == null) return [];
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = array.length; i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(slice.call(arguments, 1), true, true, []);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function(array) {
	    if (array == null) return [];
	    var length = _.max(arguments, 'length').length;
	    var results = Array(length);
	    for (var i = 0; i < length; i++) {
	      results[i] = _.pluck(arguments, i);
	    }
	    return results;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    if (list == null) return {};
	    var result = {};
	    for (var i = 0, length = list.length; i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = function(array, item, isSorted) {
	    if (array == null) return -1;
	    var i = 0, length = array.length;
	    if (isSorted) {
	      if (typeof isSorted == 'number') {
	        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
	      } else {
	        i = _.sortedIndex(array, item);
	        return array[i] === item ? i : -1;
	      }
	    }
	    for (; i < length; i++) if (array[i] === item) return i;
	    return -1;
	  };

	  _.lastIndexOf = function(array, item, from) {
	    if (array == null) return -1;
	    var idx = array.length;
	    if (typeof from == 'number') {
	      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
	    }
	    while (--idx >= 0) if (array[idx] === item) return idx;
	    return -1;
	  };

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (arguments.length <= 1) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Reusable constructor function for prototype setting.
	  var Ctor = function(){};

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    var args, bound;
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    args = slice.call(arguments, 2);
	    bound = function() {
	      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
	      Ctor.prototype = func.prototype;
	      var self = new Ctor;
	      Ctor.prototype = null;
	      var result = func.apply(self, args.concat(slice.call(arguments)));
	      if (_.isObject(result)) return result;
	      return self;
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    return function() {
	      var position = 0;
	      var args = boundArgs.slice();
	      for (var i = 0, length = args.length; i < length; i++) {
	        if (args[i] === _) args[i] = arguments[position++];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return func.apply(this, args);
	    };
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = hasher ? hasher.apply(this, arguments) : key;
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = function(func) {
	    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
	  };

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        clearTimeout(timeout);
	        timeout = null;
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last > 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed after being called N times.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed before being called N times.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      } else {
	        func = null;
	      }
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Retrieve the names of an object's properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      source = arguments[i];
	      for (prop in source) {
	        if (hasOwnProperty.call(source, prop)) {
	            obj[prop] = source[prop];
	        }
	      }
	    }
	    return obj;
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(obj, iteratee, context) {
	    var result = {}, key;
	    if (obj == null) return result;
	    if (_.isFunction(iteratee)) {
	      iteratee = createCallback(iteratee, context);
	      for (key in obj) {
	        var value = obj[key];
	        if (iteratee(value, key, obj)) result[key] = value;
	      }
	    } else {
	      var keys = concat.apply([], slice.call(arguments, 1));
	      obj = new Object(obj);
	      for (var i = 0, length = keys.length; i < length; i++) {
	        key = keys[i];
	        if (key in obj) result[key] = obj[key];
	      }
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      var source = arguments[i];
	      for (var prop in source) {
	        if (obj[prop] === void 0) obj[prop] = source[prop];
	      }
	    }
	    return obj;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	    if (typeof a != 'object' || typeof b != 'object') return false;
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	    // Objects with different constructors are not equivalent, but `Object`s
	    // from different frames are.
	    var aCtor = a.constructor, bCtor = b.constructor;
	    if (
	      aCtor !== bCtor &&
	      // Handle Object.create(x) cases
	      'constructor' in a && 'constructor' in b &&
	      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	        _.isFunction(bCtor) && bCtor instanceof bCtor)
	    ) {
	      return false;
	    }
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	    var size, result;
	    // Recursively compare objects and arrays.
	    if (className === '[object Array]') {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      size = a.length;
	      result = size === b.length;
	      if (result) {
	        // Deep compare the contents, ignoring non-numeric properties.
	        while (size--) {
	          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	        }
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      size = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      result = _.keys(b).length === size;
	      if (result) {
	        while (size--) {
	          // Deep compare each member
	          key = keys[size];
	          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	        }
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return result;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b, [], []);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
	    for (var key in obj) if (_.has(obj, key)) return false;
	    return true;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
	  if (true) {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = function(key) {
	    return function(obj) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
	  _.matches = function(attrs) {
	    var pairs = _.pairs(attrs), length = pairs.length;
	    return function(obj) {
	      if (obj == null) return !length;
	      obj = new Object(obj);
	      for (var i = 0; i < length; i++) {
	        var pair = pairs[i], key = pair[0];
	        if (pair[1] !== obj[key] || !(key in obj)) return false;
	      }
	      return true;
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = createCallback(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property) {
	    if (object == null) return void 0;
	    var value = object[property];
	    return _.isFunction(value) ? object[property]() : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(obj) {
	    return this._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result.call(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result.call(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result.call(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f6923f32419011f4b2e43b857be678f5.png";

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "864753efe21737bbba6ea1177b8c9d03.svg";

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "cbfd9590325897083aa4d6d71b40de6f.svg";

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * 
	 * @preventMunge
	 */

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var invariant = __webpack_require__(126);

	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *         case 'city-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	var Dispatcher = (function () {
	  function Dispatcher() {
	    _classCallCheck(this, Dispatcher);

	    this._callbacks = {};
	    this._isDispatching = false;
	    this._isHandled = {};
	    this._isPending = {};
	    this._lastID = 1;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   */

	  Dispatcher.prototype.register = function register(callback) {
	    var id = _prefix + this._lastID++;
	    this._callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   */

	  Dispatcher.prototype.unregister = function unregister(id) {
	    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	    delete this._callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   */

	  Dispatcher.prototype.waitFor = function waitFor(ids) {
	    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this._isPending[id]) {
	        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
	        continue;
	      }
	      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	      this._invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   */

	  Dispatcher.prototype.dispatch = function dispatch(payload) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
	    this._startDispatching(payload);
	    try {
	      for (var id in this._callbacks) {
	        if (this._isPending[id]) {
	          continue;
	        }
	        this._invokeCallback(id);
	      }
	    } finally {
	      this._stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   */

	  Dispatcher.prototype.isDispatching = function isDispatching() {
	    return this._isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	    this._isPending[id] = true;
	    this._callbacks[id](this._pendingPayload);
	    this._isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	    for (var id in this._callbacks) {
	      this._isPending[id] = false;
	      this._isHandled[id] = false;
	    }
	    this._pendingPayload = payload;
	    this._isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	    delete this._pendingPayload;
	    this._isDispatching = false;
	  };

	  return Dispatcher;
	})();

	module.exports = Dispatcher;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.6.3
	(function() {
	  var getNanoSeconds, hrtime, loadTime;

	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }

	}).call(this);

	/*
	//@ sourceMappingURL=performance-now.map
	*/
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function (condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ }
/******/ ])