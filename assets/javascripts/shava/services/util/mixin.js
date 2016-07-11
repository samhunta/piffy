(function () {
  /**
  * Mixin Module
  *
  * helper to mixin objects into class-like objects
  */
  angular.module('shava.services.util.mixin', [])

    .constant('mixin', mixin);

  function mixin(){
    var source;
    var recurse = false;
    var oldFn, i;
    
    if (arguments[0] === true) {
      recurse = true;
      source = arguments[1];
      i = 2;
    }
    else {
      source = arguments[0];
      i = 1;
    }

    for (; i < arguments.length; i++) {
      for (var i2 in arguments[i]) {
        if (arguments[i].hasOwnProperty(i2)) {
          if (typeof arguments[i][i2] === 'function') {
            oldFn = typeof source[i2] === 'function' ? source[i2] : angular.noop;
            source[i2] = arguments[i][i2].bind(source[i2]);
            source[i2]._super = oldFn;
          }
          else if (recurse && angular.isArray(arguments[i][i2]) && angular.isArray(source[i2])) {
            source[i2].concat(arguments[i][i2]);
          }
          else if (recurse && typeof arguments[i][i2] === 'object' && typeof source[i2] === 'object') {
            mixin(source[i2], arguments[i][i2]);
          }
          else {
            source[i2] = arguments[i][i2];
          }
        }
      }
    }
  }
})(); 