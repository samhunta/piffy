(function(){
  var EventEmitter = require('events').EventEmitter;

  angular.module('shava.services.sessions', [
    'shava.services.util.driver',
    'shava.services.util.deepMerge'
  ])

    .provider('shavaSessionsFactory', shavaSessionsFactoryProvider);

    shavaSessionsFactoryProvider.$inject = ['shavaDriverFactoryProvider'];

    function shavaSessionsFactoryProvider(shavaDriverFactoryProvider) {
      var sessions = {};

      var undef;

      var driver = shavaDriverFactoryProvider.create('shavaSessionsFactory', {
        $contract: { get: 'function', set: 'function' },
        bindArray: function (key, autosave, method) {
          var dat, arr, session = this;

          var defObj = function (obj) {
            if (! obj || ! angular.isArray(obj.data)) {
              obj = { _id: 0, data: [] };
            }
            return obj;
          };

          dat = defObj(session.get(key, null));
          arr = dat.data;

          angular.extend(arr, new EventEmitter(), {
            find: function (attrs) {
              return arr.filter(function (value) {
                var result = true;

                Object.keys(attrs).forEach(function(key) {
                  result = result && (attrs[key] === value[key]);
                })

                return result;
              });
            },
            redirect: function (newKey) {
              dat = defObj(session.get(newKey, null));
              arr = dat.data;
            },
            getKey: function () { return ++dat._id; },
            push: function () { return patchArray(arr, save, 'push', arguments); },
            unshift: function () { return patchArray(arr, save, 'unshift', arguments); },
            splice: function () { return patchArray(arr, save, 'splice', arguments); },
            remove: function (index) { return arr.splice(index, 1); },
            data: function () { return arr.data; },
            set: function (index, value) { arr[index] = value; autosave && save(); },
            clear: function () { arr.splice(0, arr.length); },
            save: function () { return save(); }
          });

          if (method != null) {
            angular.extend(arr, method);
          }

          if (arr.$deserialize != null) {
            angular.forEach(arr, function (value, key) {
              arr[key] = arr.$deserialize(value);
            });
          }

          function save() {
            var data = Array.prototype.slice.call(arr);

            if (arr.$serialize != null) {
              angular.forEach(data, function (value, key) {
                data[key] = arr.$serialize(value);
              });
            }

            return session.set(key, { _id: dat._id, data: Array.prototype.slice.call(data) });
          }

          function patchArray(arr, after, method, args) {
            var ac = Array.prototype[method].apply(arr, args);
            autosave && after();
            return ac;
          }

          return arr;
        },
        bindObject: function (skey, autosave, applier) {
          var session = this
            , obj;
          
          var defObj = function (obj) {
            if (! angular.isObject(obj) || obj._id == null) {
              obj = { _id: 0, data: {} };
            }
            return obj;
          };

          obj = defObj(session.get(skey, null));

          return {
            save: function () {
              return session.set(skey, obj);
            },
            set: function (key, val) {
              try {
                eval('(obj.data.'+key+'=val);');
                autosave && session.save();
                return true;
              } catch (e) {
                return false;
              }
            },
            getKey: function () {
              return 'i'+(++obj._id);
            },
            get: function (key, def) {
              var val;
              try {
                val = eval('(obj.data.'+key+');');
                return val !== undef ? val : def;
              } catch (e) {
                return def;
              }
            },
            extend: function (vals, replace) {
              replace = replace !== undef || replace;
              if (replace) {
                angular.forEach(vals, function (val, key) {
                  session.set(key, val);
                });
              }
              else {
                angular.forEach(vals, function (val, key) {
                  if (session.get(key) == null) {
                    session.set(key, val);
                  }
                });                
              }
            },
            redirect: function (newKey) {
              dat = defObj(session.get(newKey, null));
              arr = dat.data;
            },
            create: function (add) {
              add._id = add._id || session.getKey();
              session.set(add._id, add);
            },
            setData: function (data) {
              obj.data = data;
            },
            data: function () {
              return obj.data;
            },
            remove: function (key) {
              try {
                eval('(delete obj.data.'+key+');');
                autosave && session.save();
              } catch (e) {}
            },
            clear: function () {
              var key;
              for (key in obj.data) {
                if (obj.data.hasOwnProperty(key)) {
                  delete obj.data[key];
                }
              }
              autosave && session.save();
            }
          };
        }
      });

      return driver;

    }

}());