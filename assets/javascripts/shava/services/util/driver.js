(function () {

  var annotationFn;
  
  angular.module('shava.services.util.driver', [])

    .provider('shavaDriverFactory', shavaDriverFactory);

  function shavaDriverFactory() {
    return {
      create: create,
      $get: angular.noop
    };
  }

  function create(providerName, data) {
    var driverName = null;    
    var newService = {};
    var driver;
    var cached;

    if (typeof data == null) {
      data = {};
    }

    driverGetter.$inject = ['$injector', '$log'];

    driver = {
      setDriver: setDriver,
      $get: driverGetter
    };

    return driver;
    
    function driverGetter($injector, $log) {        
      if (driverName == null) {
        throw new Error('Driver not set for "' + providerName + '"');
      }

      return (function () {
        if (cached == null) {
          cached = $injector.invoke([
            driverName,
            function (methods) {
              var errs, d, errFormat;

              for (d in data) {
                if (typeof d === 'string' && d.indexOf('$') === 0) {
                  driver[d.substring(1)] = data[d];
                  delete data[d];
                }
                else if (data.hasOwnProperty(d) && typeof data[d] === 'function') {
                  data[d] = angular.bind(newService, data[d]);
                }
              }

              angular.extend(newService, data, methods);

              if (driver.contract != null) {
                errs = Object.keys(driver.contract).filter(function (k) {
                  var o = driver.contract[k];

                  switch(o) {
                    case 'iterable':
                      return !(typeof newService[k] === 'object'
                          || typeof newService[k] === 'function'
                          || angular.isArray(k));
                    case 'object':
                    case 'function':
                      return (typeof newService[k] !== o);
                    default:
                      return !(newService[k] != null);
                  }
                });

                if (errs.length > 0) {
                  errFormat = [];
                  errs.forEach(function (name) {
                    errFormat.push(driverName + '.' + name + ' must '
                    + (driver.contract[name] != null ? 'implement '
                    + driver.contract[name] : 'not be null'));
                  });

                  throw new Error(errFormat.join('\r\n')+'\r\n');
                }
              }

              return newService;
            }]);
        }

        return cached;
      })();        
    }

    function setDriver(newDriverName) {
      cached = null;
      driverName = newDriverName;
    }
  }

})(); 