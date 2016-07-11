(function () {
  
  angular.module('shava.directives.columns.columnsController', [])

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