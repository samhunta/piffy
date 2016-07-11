(function () {
  
  angular.module('shava.directives.key', [])

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