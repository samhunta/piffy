(function () {
  angular.module('shava.directives.range.rangeSliderDirective', [])

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