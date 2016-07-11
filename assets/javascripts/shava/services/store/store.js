(function () {
  var EventEmitter = require('events').EventEmitter;
  var Immutable = require('immutable');
  var _ = require('underscore');

  angular.module('shava.services.store', [
    'shava.services.dispatcher'
  ])
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