(function () {
  
  angular.module('shava.directives.autofocus', [])

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