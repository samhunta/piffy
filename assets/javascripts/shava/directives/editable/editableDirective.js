(function () {
  
  angular.module('shava.directives.editable', [])

    .directive('shEditable', shEditable)


  shEditable.$inject = ['$timeout', '$window', '$parse'];

  function shEditable($timeout, $window, $parse) {
    return {
      restrict: 'A',
      require: 'ngModel',
      transclude: true,
      replace: true,
      template: '<span class="sh-editable-wrapper"><span ng-transclude></span></span>',
      link: function (scope, element, attrs, ngModel) {
        var cb = angular.isDefined(attrs.shEditableCallback)
          ? $parse(attrs.shEditableCallback)
          : false;

        var subel, input = null;

        subel = element.find(':first-child');
        subel.addClass('sh-editable-text');

        scope.$watch(attrs.shEditable, function (value) {
          if (value) {
            element.addClass('sh-editable-editing');
            input = createEditableArea();
            element.append(input);
            refocus();
          }
          else {
            element.removeClass('sh-editable-editing');
            if (input !== null) {
              input.remove();
              input = null;
            }
          }
        });

        ngModel.$render = function () {
          subel.html(prepValue(ngModel.$modelValue));
        };

        element.on('$destroy', function () {
          if (input !== null) {
            input.remove();
          }
        });

        function prepValue(value) {
          return value.replace(/(^\s+|\<[^>]+\>|\&[a-z0-9]+\;|\s+$)/gi, '').replace(/\s+/g, ' ');
        }

        function createEditableArea() {
          var input = angular.element('<input>')
            .attr('type', 'text')
            .attr('autofocus', true)
            .val(ngModel.$modelValue);

          input.on('keydown', shEditableKeydown);
          input.on('blur', shEditableBlur);
          input.on('focus', shEditableFocus);

          input[0].className = ('sh-editable-input');
          return input;
        }

        function updateVal(value, render) {
          ngModel.$setViewValue(value);
          subel.html(value);
        }

        function refocus() {
          if (input !== null) {
            input.focus();
          }
        }

        function stopEdit() {
          $timeout(function () {
            cb !== false ? cb(scope, { $value: prepValue(input.val()), $update: updateVal, $refocus: refocus }) : updateVal(prepValue(input.val()));
          });
        }

        function shEditableBlur(e) {
          stopEdit();
        }

        function shEditableFocus(e) {
          $(this).select();
        }

        function shEditableKeydown(e) {
          switch (e.which) {
            case 27:
              e.preventDefault();
              input.val(ngModel.$modelValue);
              stopEdit();
              break;
            case 13:
            case 9:
              e.preventDefault();
              stopEdit();
              break;
          }
        }

      }
    }
  }

})(); 