(function () {
  var raf = require('raf');

  angular.module('shava.directives.fixedScroll', [
    'shava.services.util.debounce',
    'shava.directives.scrollarea'
  ])

    .directive('shFixedScroll', fixedScrollDirective);

  fixedScrollDirective.$inject = ['$rootScope', 'shavaThrottle', '$compile', '$window'];

  function fixedScrollDirective($rootScope, shavaThrottle, $compile, $window) {
    return {
      restrict: 'E',
      scope: {},
      require: '^shScrollarea',
      compile: function (element, attrs) {
        element.html('<div class="sh-fixed-scroll-area">' + element.html() + '</div>');
        element.addClass('sh-fixed-scroll-area-wrapper');

        return {
          post: function (scope, element, attrs, shScrollarea) {
            var isFixed, bodySpacing, scrollAreaEl;
            var throttler = shavaThrottle(onScroll, 10, { leading: true });
            var $win = angular.element($window);
            var spaceEl = angular.element('<div></div>');

            scrollAreaEl = element.children(0);

            spaceEl.addClass('sh-fixed-scroll-spacer');

            shScrollarea.onScroll(element, throttler);

            if (attrs.hasOwnProperty('watch') && attrs.watch !== false) {
              $rootScope.$on('shava:resize', function(){
                if (isFixed) {
                  var pos = shScrollarea.position();
                  element.css({ position: 'fixed', top: pos.top, left: pos.left, right: ($win.width() - pos.left - spaceEl.outerWidth()) });
                }
              });
            }

            element.on('$destroy', function () {
              off();
            });

            function on(offset) {
              var $win = angular.element($window);
              var pos = shScrollarea.position();
              isFixed = offset;

              bodySpacing = scrollAreaEl.outerHeight();
              shScrollarea.incrementSpacing(bodySpacing);
              spaceEl.css({ height: bodySpacing, width: '100%' });
              element.after(spaceEl);
              element.css({ position: 'fixed', top: pos.top, left: pos.left, right: ($win.width() - pos.left - spaceEl.outerWidth()) });
            }

            function off() {
              isFixed = null;
              shScrollarea.decrementSpacing(bodySpacing);
              bodySpacing = null;
              spaceEl.remove();
              element.css({ position: '', top: '', left: '', right: '' });
              scrollAreaEl.css({ marginLeft: '' });
            }

            function onScroll(e) {
              var offset, top;

              offset = shScrollarea.elOffsetTop(element);
              top = shScrollarea.scrollTop();

              if (isFixed != null) {
                if (top < isFixed) off();
              }
              else {
                if (offset <= 0) on(top + offset);
              }

              if (isFixed != null) {
                raf(function(){
                  scrollAreaEl.css({ marginLeft: '-' + shScrollarea.scrollLeft() + 'px' });
                });
              }
            }

          }
        };

      }
    };

  }

})(); 