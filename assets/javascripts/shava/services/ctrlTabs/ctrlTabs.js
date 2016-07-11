(function () {
  var undef;
  
  angular.module('shava.services.ctrlTabs', [])

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