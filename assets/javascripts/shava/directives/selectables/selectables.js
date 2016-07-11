(function () {
  angular.module('shava.directives.selectables.selectables', [])

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