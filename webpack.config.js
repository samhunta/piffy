var webpack = require("webpack");
var path = require("path");
var ngPlugin = require("angular-webpack-plugin");

const BUILD_PATH = "dist";
const ASSETS_DIR = "assets";
const JS_PATH = ASSETS_DIR + "/javascripts/";

var appResolvers = {
  // Controller resolver
  "^(shava|app)\.controllers\.(.*)": function (full, mod, controller) {
    var controllerName = (''+controller).charAt(0).toUpperCase() + (''+controller).substring(1);
    return [
      __dirname,
      JS_PATH,
      mod,
      "controllers",
      controllerName + "Controller.js"
    ];
  },

  "^ng$": function (full) {
    return [__dirname, JS_PATH, "lib/stub.js"];
  },

  // Service resolver
  "^(shava|app)\.services(\.(.*))?": function (full, mod, __, service) {
    var path_build = [ __dirname, JS_PATH, mod, "services" ];

    if (service) {
      var all_services = service.split(/\./g);

      if (all_services.length === 1) {
        path_build.push(all_services[0]);
      }

      path_build.push(all_services.join("/") + ".js");
    }
    else {
      path_build.push("index.js");
    }

    return path_build;
  },

  // Templates & controllers resolver
  "^(shava|app)(\.(templates|controllers))?$": function (full, mod, __, mod2) {
    return [ __dirname, JS_PATH, mod, (mod2 ? mod2 + "/index.js" : "index.js") ];
  },

  // Configuration resolver
  "^app\.(config|routes|settings)$": function (full, mod) {
    return [ __dirname, JS_PATH, "app", mod + ".js" ];
  },

  // Model resolver
  "^(shava|app)\.models(\.(.*))?": function (full, mod, __, service) {
    var path_build = [ __dirname, JS_PATH, mod, "models" ];
    service && path_build.push(service + ".js") || path_build.push("index.js");
    return path_build;
  },

  // Directive resolver
  "^(shava|app)\.directives(\.(.*))?": function (full, mod, __, submod) {
    var path_build = [ __dirname, JS_PATH, mod, "directives" ];
    
    if (submod) {
      var submod_split = submod.split(/\./g);
      if (submod_split.length === 1) {
        path_build.push(submod);
        path_build.push(submod + "Directive.js");
      }
      else {
        path_build.push(submod_split.join('/') + ".js");
      }
    }
    else {
      path_build.push("index.js");
    }
    
    return path_build;
  }
};

function resolveNgAppModules (req, callback) {
  var i, regex, matched;

  for (i in appResolvers) {
    if (appResolvers.hasOwnProperty(i)) {
      regex = RegExp(i, 'gi');
      req.request.replace(regex, function(){
        var result = appResolvers[i].apply(this, arguments);
        matched = true;

        if (result != null && typeof result === 'object') {
          result = path.join.apply(path, result);
        }

        callback(null, {
          path: result,
          query: req.query,
          file: true, resolved: true
        });

        return null;
      });

      if (matched) {
        return true;
      }
    }
  }

  callback();
}

module.exports = {
  cache: true,
  context: __dirname,
  node: {
    global: true,
    process: true,
    Buffer: true,
    __dirname: path.join(__dirname, BUILD_PATH, ASSETS_DIR)
  },
  target: "node-webkit",
  entry: {
    app: [
      path.join(__dirname, JS_PATH, "app/index.js")
    ]
  },
  output: {
    path: path.join(__dirname, BUILD_PATH, ASSETS_DIR),
    publicPath: ASSETS_DIR + "/",
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "ng-cache?prefix=[dir]/[dir]" },
      { test: /\.css$/, loader: "style/useable!css" },
      { test: /\.(png|svg|jpg|gif|woff|ttf)(\?.+)?$/, loader: "file" },
      { test: /\.json$/, loader: "json" }
    ]
  },
  resolve: {
    alias: {
      ngAnimate: "angular-animate",
      "nw.gui": path.join( __dirname, JS_PATH, "shava/nw-gui.js"),
      "vs-repeat": path.join(__dirname, JS_PATH, "lib/angular-vs-repeat.min.js"),
      "ui.router": "angular-ui-router",
      "mgcrea.ngStrap": "angular-strap/dist/angular-strap.js",
      "jmdobry.angular-cache": "angular-cache",
      "build.json": path.join(__dirname, "build.json")
    },
    root: [
      path.join(__dirname, "bower_components"),
      JS_PATH,
    ]
  },
  plugins: [
    new ngPlugin(),
    function(){
      this.resolvers.normal.plugin("module", resolveNgAppModules);
    },
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ]
};