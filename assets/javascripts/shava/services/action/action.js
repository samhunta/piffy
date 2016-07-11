(function () {
  angular.module('shava.services.action', [
    'shava.services.action.constants'
  ])

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