(function () {

  angular.module('shava.services.contextMenu', [])

    // Context menu
    .factory('shavaContextMenuFactory',
              ['$document', '$compile', '$rootScope', '$controller', '$timeout',
      function( $document,   $compile,   $rootScope,   $controller,   $timeout) {
        var defaults = {
          options: {},
          controller: null,
          x: 0,
          y: 0
        };

        var body = angular.element(document.body);
        var $window = angular.element(window);

        var instance;

        function ContextMenu(options) {
          var locals, ctrl, scope, cxtMenuEl, backdropEl
            , handleEscPressed, disableContextMenu, closeFn, self;

          options = angular.extend({}, defaults, options);

          if ($rootScope.stateLoading) return false;

          scope = options.scope || $rootScope.$new();

          self = this;

          cxtMenuEl = angular.element(
            '<div class="context-menu">\
              <div class="context-menu-top" ng-if="top">{{top}}</div>\
              <ul ng-repeat="opts in options">\
              <li ng-if="opts.label && opts.options.length > 0" class="cat" ng-bind="opts.label"></li>\
              <li ng-repeat="opt in opts.options">\
                <a target="_blank" href="{{opt.link || \'#\'}}" ng-click="$closeContextMenu($event, opt.binding)">\
                <i ng-if="opt.icon" ng-class="opt.iconClass" class="icon icon-{{opt.icon}}"></i> {{opt.text}}</a>\
              </li>\
              </ul>\
            </div>'
          );

          backdropEl = angular.element(
            '<div class="context-menu-backdrop"></div>' 
          );

          if (instance) {
            instance.closeFn();
          }

          instance = {};

          // Close when escape key is pressed
          handleEscPressed = function(e) {
            if (e.which === 27) {
              closeFn(e);
            }
          };

          // Close 
          disableContextMenu = function(e) {
            e.stopPropagation();
            e.preventDefault();
          };

          instance.closeFn = closeFn = function(e, fn) {
            if (e && ! fn) {
              e.preventDefault();
            }

            if (typeof fn === 'function' && fn.call(self, e, fn) === false) {
              return false;
            }

            body.off('keydown', handleEscPressed)
            backdropEl.off('mousedown', closeFn);
            backdropEl.remove();
            cxtMenuEl.remove();
          };

          backdropEl.on('mousedown', closeFn);

          if (options.options.length === 0) {
            closeFn();
            return false;
          }
          else if (typeof options.options[0].options === 'undefined') {
            options.options = [{ label: 'options', options: options.options }];
          }

          options.y += angular.element(window).scrollTop();

          scope.options = options.options;
          scope.right = options.right;
          scope.posX = options.x;
          scope.posY = options.y;
          scope.top  = options.top;
          scope.$closeContextMenu = closeFn;

          if (options.controller != null) {
            locals = angular.extend({ $scope: scope }, passedInLocals);
            ctrl = $controller(options.controller, locals);
            cxtMenuEl.contents().data('$ngControllerController', ctrl);
          }

          $compile(cxtMenuEl)(scope);

          if (options.x + 190 > $window.width()) {
            options.x = options.x - 190;
          }

          cxtMenuEl.css({ left: (options.x + 1) + 'px', top: options.y + 'px' });

          // Bind context menu to keydown
          body.on('keydown', handleEscPressed);
          cxtMenuEl.on('contextmenu', disableContextMenu);
          
          cxtMenuEl.on('mousedown', function (e) {
            e.stopPropagation();
          });

          backdropEl.on('contextmenu', disableContextMenu);

          // Append context menu element to body
          body.append(backdropEl);
          body.append(cxtMenuEl);
        };

        return function (opts) {
          return new ContextMenu(opts);
        };
      }]);

}());