(function () {
  angular.module('shava.directives.nav.navController', [])

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