(function () {
  
  angular.module('shava.services.util.debounce', [])

    .constant('shavaDebounce', shavaDebounce)
    .constant('shavaThrottle', shavaThrottle);

  function shavaDebounce(method, timeMs, triggerFn) {
    var timeoutObj;

    timeoutFn.$stop = $stop;

    if (triggerFn) {
      timeoutWrapper();
    }

    return timeoutFn;

    function timeoutFn() {
      var self = this
        , args = arguments;

      $stop();
      timeoutObj = timeoutWrapper(timeMs, self, args);
    };

    function $stop() {
      if (timeoutObj != null) {
        clearTimeout(timeoutObj);
        timeoutObj = null;
      }
    };

    function timeoutWrapper(time, self, args) {
      return setTimeout(function () {
        method.apply(self, args);
      }, time);
    }
  }

  function shavaThrottle(func, wait, options) {
    // copied from ngStrap to save tme 
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function () {
      previous = options.leading === false ? 0 : new Date();
      timeout = null;
      result = func.apply(context, args);
    };
    return function () {
      var now = new Date();
      if (!previous && options.leading === false)
        previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

})(); 