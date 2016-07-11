/**
 * TODO:
 *   - Add vertical resize support
 *   - Rename to shPanel when panel options are done
 *   - Add ability to stretch to element via absolute positioning
 */
(function () {
  
  angular.module('shava.directives.columns.columnDirective', [
    'shava.directives.columns'
  ])

    .directive('shColumn', shColumn);

  shColumn.$inject = ['$document', '$window', '$parse', '$timeout'];

  function shColumn($document, $window, $parse, $timeout) {
    return {
      restrict: 'A',
      require: '^shColumns',
      scope: true,
      link: function shColumnLinker(scope, element, attrs, shColumns) {

        var $model = $parse(attrs.shColumnModel);

        // Store data here about the element
        var thEl = {};

        var $body = angular.element($window.document.body);
        var init = false;

        // Default options
        var defs = {
          min: 54,
          max: 500,
          distance: 10,
        };

        var opts = $parse(attrs.shColumn);

        thEl.element = element;
        thEl.scope = scope;
        thEl.model = $model;
        
        setOpts(opts(scope));

        // If last option is set, the element will be ignored
        if (! thEl.opts.hasOwnProperty('last') || ! thEl.opts.last) {
          element.on('mousedown.shColumnsColumn', function (e) {
            var rwidth, rleft, newWidth, winLength;

            if (shColumns.$resizing || shColumns.$resizeEl == null) {
              return;
            }

            shColumns.$resizing = true;
            rwidth = shColumns.$resizeEl.element.outerWidth();
            rleft = e.clientX;
            winLength = $window.screen.availWidth - 1;

            $body.addClass('col-resize');
            $document.one('mouseup.shColumnsColumn', finishResize);
            $document.one('mouseleave.shColumnsColumn', finishResize);
            $document.on('mousemove.shColumnsColumn', function (e) {
              if (shColumns.$resizing) {
                newWidth = (rwidth + (e.clientX - rleft));
                newWidth = Math.min(shColumns.$resizeEl.opts.max, Math.max(shColumns.$resizeEl.opts.min, newWidth));
                shColumns.setWidth(shColumns.$resizeEl, newWidth);
                return;
              }
            });
          });

          element.on('mousemove.shColumnsColumn', mouseMove);
          element.on('mouseleave.shColumnsColumn', function () {
            if (! shColumns.$resizing && shColumns.$resizeEl) {
              shColumns.$resizeEl = null;
              element.removeClass('col-resize');
            }
          });
        }

        scope.$on('$destroy', function () {
          element.off('.shColumnsColumn');
          $document.off('.shColumnsColumn');
        });

        function setOpts(opts) {
          thEl.opts = angular.extend({}, defs, opts);
            
          if (! init) {
            init = true;
            shColumns.addElement(thEl);
          }
        }

        function mouseMove(e) {
          var s, left, width, before;

          if (shColumns.$resizing) return;

          left = element.offset().left;
          width = element.outerWidth();
          before = e.clientX >= left + width - thEl.opts.distance ? 0
            : false;

          if (before !== false && shColumns.$resizeEl == null) {
            shColumns.$resizeEl = shColumns.getElement(thEl, before);
            element.addClass('col-resize');
          }
          else if (before === false && shColumns.$resizeEl === thEl) {
            shColumns.$resizeEl = null;
            element.removeClass('col-resize');
          }
        }

        function finishResize(e) {
          $document.off('mousemove.shColumnsColumn');
          $document.off('mouseup.shColumnsColumn');
          $document.off('mouseleave.shColumnsColumn');
          shColumns.$resizeEl = null;
          shColumns.$resizing = false;
          element.removeClass('col-resize');
          $body.removeClass('col-resize');
          $timeout(function () {
            shColumns.finishCallback();
          });
        }
      }

    }
  }
})(); 