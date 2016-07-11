/* jshint strict:true */
/* global angular:true, _:true */

/**
 * TODO:
 *   - Add shift support
 *   - Add ctrl support
 *   - Add left/right support
 */
(function () {
  
  'use strict';
  
  angular.module('shava.directives.selectables.selectablesController', [
    'shava.directives.selectables.selectableDirective',
    'shava.directives.selectables.selectables',
    'shava.directives.selectables',
    'shava.services.util.watchChange'
  ])

    .controller('ShSelectablesController', selController);

  selController.$inject = [
    
    // module: shava.services.util.watchChange
    '$$watch',    
    
    // module: shava.directives.selectables.selectables
    // 'shSelectables',
    
    // module: ng
    '$element',
    '$parse',
    '$scope',
    '$timeout'
  
  ];

  function selController(
    $$watch,
    // shSelectables,
    $element,
    $parse,
    $scope,
    $timeout
  ) {
    
    /* jshint validthis:true */
    
    var undef
      , selfCtrl
      , lastActiveObject
      , elements
      , scroller
      , selectRange;

    // Constants
    var SH_SELECTABLE_OBJECT = '$$shSelectableObject';
    
    // A reference to our controller
    selfCtrl = this;
    
    // A scrollarea controller
    scroller = null;

    // The last object selected via gesture or keydown and up
    // with alt, metaKey, ctrlKey, or shiftKey down
    lastActiveObject = null;

    // Elements associated with each object will go here
    elements = [];

    // Setup element
    setupElementBindings();

    // Controller defaults
    angular.extend(selfCtrl, {

      // Keys to be logged on keydown to handle user selections
      metaKey: false,
      shiftKey: false,
      altKey: false,

      // Register objects
      registerObject: registerObject,
      
      // This is for scrolling support, for libraries
      // such as shava.directives.scrollArea
      setScroller: setScroller
    });

    // This exposes the array your elements created
    // through the directives. It contains all your objects.
    $scope.opts.all = [];
    
    angular.extend($scope.opts, {

      // Optional bool (def: false) `toggleSelect` option allows the user to make multiple
      // selections with the `selectEvent` without holding the ctrlKey/metaKey
      toggleSelect: ($scope.opts.toggleSelect !== undef ? !!$scope.opts.toggleSelect : false),

      // Optional function|string (def: UNDEFINED) `onSelect` is the callback for selections
      // Accepts a function which will be given a callback with `($object, $selected)`
      // `$object` being the object changed, and $selected will be `true` or `false`
      // Also accepts a string to be parsed as an angular expression with locals `($object, $selected)`
      onSelect: ($scope.opts.onSelect !== undef ? $scope.opts.onSelect : undef),
  
      bindVertical: ($scope.opts.bindVertical !== undef ? !!$scope.opts.bindVertical : true),

      bindHorizontal: ($scope.opts.bindHorizontal !== undef ? !!$scope.opts.bindHorizontal : false),

      useScroller: ($scope.opts.useScroller !== undef ? !!$scope.opts.useScroller : true),

      // Optional array (def: []) `selected` option will be exposed to your scope via `scope.opts.selected`
      // containing an array of the selected object references. You may set this array if `watch`
      // option is enabled or at initialisation to change the selected objects at any time.
      selected: (angular.isArray($scope.opts.selected) ? $scope.opts.selected : []),

      // Optional bool (def: true) `toggleable` option if enabled allows items to be toggleable
      toggleable: ($scope.opts.toggleable !== undef ? !!$scope.opts.toggleable : true),

      // Optional bool (def: true) `watch` option if enabled, it will watch the attributes for
      // changes in your `shSelectable` directive, this should be used if you are
      // manipulating the array of objects. This is on by default but if you are
      // using a one-time binding you should tick this off for performance
      watch: (($scope.opts.watch !== undef) ? !!$scope.opts.watch : true),

      // Optional bool (def: true) `keyboardNavigation` option to allow keyboard up and down navigation
      keyboardNavigation: (($scope.opts.keyboardNavigation !== undef) ? $scope.opts.keyboardNavigation : true),

      // Optional string (def: 'click') `selectEvent` option determines what event on the
      // `shSelectable` directive's element triggers the selection
      selectEvent: ($scope.opts.selectEvent !== undef ? $scope.opts.selectEvent : 'click'),
      
      // Optional bool (def: true) `alwaysOne` option if enabled forces one element to be selected at all times
      alwaysOne: (($scope.opts.alwaysOne !== undef) ? !!$scope.opts.alwaysOne : false),
      
      // Optional bool (def: true) `multi` option allows multiple selections, on by default
      multi: (($scope.opts.multi !== undef) ? !!$scope.opts.multi : true)

    });

    // Watch for adds and removes on selected and call the callback
    //
    // TODO: angular 1.3 has $watchGroup([], callback(newValues, oldValues, scope))
    //       upgrade later.
    //
    $$watch($scope, function () { return $scope.opts.selected; }, function (adds, removes, newValue) {
      // Emit callback as selected
      if (adds.length > 0) {
        angular.forEach(adds, function (obj) { cb(obj, true); });
      }

      // Emit callback as removed
      if (removes.length > 0) {
        angular.forEach(removes, function (obj) { cb(obj, false); });
      }

      // This option requires one object to be selected always
      if ($scope.opts.alwaysOne) {
        autoSelectObject(newValue);
      }
    });

    // On destroy
    $scope.$on('$destroy', function(){
      angular.forEach($scope.opts.selected, function(obj){
        cb(obj, false);
      });
    });

    // Auto select an object if the selected object was removed
    function autoSelectObject(selected) {
      if (selected.length > 0 && $scope.opts.all.length > 0) {

      }
    }

    // Select an object or toggle it
    function handleObjectSelection(obj, toggle) {
      if (! $scope.opts.multi) {
        if (toggle && $scope.opts.selected[0] === obj) {
          $scope.opts.selected.splice(0, 1);
        }
        else {
          $scope.opts.selected[0] = obj;
          cb(obj, true);
        }
        
        return true;
      }

      var i = $scope.opts.selected.indexOf(obj);

      // Check that object doesn't existence to avoid duplicates
      if (!~i) {
        cb(obj, true);
        $scope.opts.selected.push(obj);
        return true;
      }

      // If `toggle` is set, we remove the object when
      // it is already selected. The `toggle` will be 
      // passed usually as metaKey/ctrlKey
      else if (toggle) {
        cb(obj, false);
        $scope.opts.selected.splice(i, 1);
        return true;
      }
    }
  
    // Get the elements associated object
    function getElementObject(element) {
      return $scope.opts.all[element.data(SH_SELECTABLE_OBJECT)];
    }

    // Set elements associated object
    function setElementObject(element, index, object) {
      $scope.opts.all[index] = object;
      elements[index] = angular.element(element);
      element.data(SH_SELECTABLE_OBJECT, index);
      return object;
    }

    // The `shSelectable` directives linker
    function registerObject(scope, selectableChildEl) {
      if (!!$scope.opts.watch || !!scope.shSelectableWatch) {

        // If watch option is set, watch for changes in object index
        scope.$watchCollection(function () { return [scope.shSelectable, scope.shSelectableObject]; },
        function (newVal, oldVal) {
          // Reset the element's object mapping
          setElementObject(selectableChildEl, newVal[0], newVal[1]);        
        });

      }
      else {
        // Set element to object mapping
        setElementObject(selectableChildEl, scope.shSelectable, scope.shSelectableObject);
      }

      // The `shSelectable` child
      selectableChildEl

        // Add generic class for styling associated
        // with the `shSelectable` directive
        .addClass('sh-selectable')

        // Tab index is -999 so the object can listen for
        // keypresses and be focussable
        .attr('tabIndex', '-999')

        // Bind the `selectEvent` option which defaults to `click`
        .on($scope.opts.selectEvent, onSelectableSelect.bind(selectableChildEl))
        
        // Select on right clicks
        .on('contextmenu', onSelectableContextMenu.bind(selectableChildEl));
        
        // `shSelectable` directive scope
        // Bind the `shSelectable` children
        scope.$on('$destroy', function () {
          deregisterObject(scope, selectableChildEl);
        });
    }

    // Clean up the `shSelectable` directives removal
    function deregisterObject(scope, element) {
      var index = $scope.opts.all.indexOf(scope.shSelectableObject)
        , selectedIndex = $scope.opts.selected.indexOf(scope.shSelectableObject);

      if (~selectedIndex) {
        $scope.opts.selected.splice(selectedIndex, 1);
      }

      if (~index) {
        $scope.opts.all.splice(index, 1);
        elements.splice(index, 1);
      }

      cb(scope.shSelectableObject, false);
    }
    
    // Get object index from `all` option array
    function getObjectIndex(obj) {
      return $scope.opts.all.indexOf(obj);
    }
    
    // Get's the index of the last selected object from user navigation
    function getLastActiveObjectIndex() {
      var index = getObjectIndex(getLastActiveObject());
      return ~index ? index : 0;
    }

    // The last selected object by clicking or key navigation
    function getLastActiveObject() {

      // This returns the last active object from
      // click or key navigation selection
      return lastActiveObject;
    }

    // `shSelectable` directive's select event, this is emitted
    // on the `selectEvent` option and defaults to `click`
    function onSelectableSelect(e) {
      var obj = getElementObject(this);

      runSelectEvent(e, obj, true);
    }

    // `shSelectable` directive's `contextMenu` binding
    // to select on right clicks with possible keys down
    function onSelectableContextMenu(e) {
      // Pass `contextMenu` to directive `selectEvent`
      onSelectableSelect.call(this, e);
    }

    // Select an array of objects.
    function setSelected(selected, toggle, clear) {
      // Clear unless toggling (via ctrlKey/metaKey)
      if (clear || (! $scope.opts.toggleSelect && (! $scope.opts.toggleable || ! toggle))) {
        $scope.opts.selected.splice(0, $scope.opts.selected.length);
      }

      // Let's assume selected may not be an array
      // and just skip selection in this case
      if (angular.isArray(selected) && selected.length !== 0) {

        // Select each object in the `selected` argument array
        angular.forEach(selected, function (object) {  
          handleObjectSelection(object, $scope.opts.toggleable && toggle || $scope.opts.toggleSelect);
        });
      }

      if (! $scope.$$phase) $scope.$apply();

      // bool Passed
      return true;
    }

    // Handle the offset
    function getEventDirection(e) {
      if ($scope.opts.bindVertical) {
        // Bind `up` to previous
        if (e.which === 38) {
          return -1;
        }

        // Bind `down` to next
        else if (e.which === 40) {
          return 1;
        }
      }

      if ($scope.opts.bindHorizontal) {
        // Bind `left` to previous
        if (e.which === 37) {
          return -1;
        }

        // Bind `right` to next
        else if (e.which === 39) {
          return 1;
        }
      }
    }

    function updateCtrlKeys(e) {
      selfCtrl.shiftKey = e.shiftKey;
      selfCtrl.metaKey = e.metaKey || e.ctrlKey;
      selfCtrl.altKey = e.altKey;      
    }

    // Runs the finalized selection actions
    function runSelectEvent(e, obj, updateKeys) {
      if (updateKeys && e !== undef) {
        // Persist keydown/keyup
        updateCtrlKeys(e);
      }

      if ($scope.opts.multi && selfCtrl.shiftKey) {
        var lastIndex = getLastActiveObjectIndex()
          , thisIndex = $scope.opts.all.indexOf(obj)
          , arr;

        if (~thisIndex && lastIndex > thisIndex) {
          setSelected($scope.opts.all.slice(thisIndex, lastIndex + 1), false);
        }
        else {
          setSelected($scope.opts.all.slice(lastIndex, thisIndex + 1), false);
        }
      }
      else {
        // Set last active object
        lastActiveObject = obj;

        // Set selections for non range
        setSelected([ obj ], selfCtrl.metaKey);
      }

      elements[ $scope.opts.all.indexOf(obj) ].focus();
    }

    function setupElementBindings() {
      if ($element) {
        $element
          .on('keydown', onKeydown)
          .on('keyup', onKeyup);
      }
    }

    function onKeydown(e) {
      var index = getLastActiveObjectIndex();
      var nextObj = index + getEventDirection(e);


      if ($scope.opts.all[nextObj] !== undef) {
        e.preventDefault();
        if (scroller) scroller.scrollTo(elements[nextObj]);
        runSelectEvent(e, $scope.opts.all[nextObj], true);
      }
    }

    function onKeyup(e) {
      updateCtrlKeys(e);
    }

    function setScroller(scrollerController) {
      if ($scope.opts.useScroller) {
        scroller = scrollerController;
      }
    }

    function cb(obj, selected) {
      if (angular.isFunction($scope.opts.onSelect)) {
        $scope.opts.onSelect(obj, selected);
      } else if (angular.isString($scope.opts.onSelect)) {
        $parse($scope.opts.onSelect)($scope.$parent, { $selected: selected, $object: obj });
      }
    }
  }

})(); 