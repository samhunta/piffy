(function () {
  angular.module('shava.directives.range', [
    'shava.directives.range.rangeSliderDirective',
    'shava.services.util.debounce'
  ])

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