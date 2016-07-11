var gulp = require("gulp");
var path = require("path");
var gutil = require("gulp-util");
var compass = require("gulp-compass");
var plumber = require("gulp-plumber");
var NwBuilder = require("node-webkit-builder");
var rename = require("gulp-rename");
var path = require("path");
var watch = require("gulp-watch");
var clean = require("gulp-clean");
var mkdirp = require("mkdirp");
var fs = require("fs-extra");
var webpack = require("webpack");
var child_process = require("child_process");
var WebpackDevServer = require("webpack-dev-server");

/**
 * Configuration
 */
const DEV_SERVER_PORT = 15555;
const HTML_PATH = __dirname;
const BUILD_PATH = path.join(__dirname, "dist");
const BUILD_UNPACKED_DIRNAME = "public";
const BIN_BUILD_PATH = path.join(__dirname, "build");
const WEBPACK_CONFIG = require("./webpack.config.js");
const CSS_PATH = path.join(__dirname, "assets/sass");
const COMPASS_CONFIG = {
  config_file: path.join(__dirname, "/config.compass.rb"),
  sass: "assets/sass",
  css: "assets/stylesheets"
};

function noop(){}

function finishStaticBuild(platform) {
  if (platform === "node-webkit") {
    gutil.log("Building binary packages...");
    var platforms = ['osx64', 'osx32', 'win32', 'win64'];

    if (gulp.env.platforms) {
      platforms = gulp.env.platforms.split(/,/g);
    }


    child_process.exec("cd " + BUILD_PATH + " && npm install", function (error, stdout, stderr) {
      gutil.log(stdout);
      gutil.log(stderr);
      if (error) gutil.log('exec error: ' + error);

      var nw = new NwBuilder({
        files: BUILD_PATH + '/**/**',
        platforms: platforms,
        binaryBuildPath: BIN_BUILD_PATH,
        macIcns: HTML_PATH + "/icons/osx.icns"
        // winIco: HTML_PATH + "/icons/win.ico"
      });

      nw.on('log', console.log);

      nw.build().then(function () {
        console.log("Build complete.");
      })['catch'](function (err) {
        console.error(err);
      });

    });
  }
  else {
    gutil.log("Build complete.");
  }
}

function createBuild(platform, env) {
  var config = createPlatformConfig(env, platform);
  webpack(config).run(function (err, stats) {
    if (err) return gutil.log(err);

    var html_files = ['index.html', 'login.html'];

    if (config.output.path) {
      var build_source = path.resolve(__dirname, BUILD_UNPACKED_DIRNAME);
      var build_target = path.resolve(
        config.output.path,
        BUILD_PATH,
        BUILD_UNPACKED_DIRNAME
      );

      mkdirp(BUILD_UNPACKED_DIRNAME, function () {
        if (err) {
          console.error(err);
          return;
        }

        var ii = 0, gulps = [];

        if (platform === "node-webkit") {
          gulps.push(
            gulp.src(HTML_PATH + "/package-build.json")
              .pipe(rename(function (path) {
                path.basename = "package";
                return path;
              }))
              .pipe(gulp.dest(BUILD_PATH))
          );
        }

        gulps.push(
          gulp.src(BUILD_UNPACKED_DIRNAME + "/**/**")
            .pipe(gulp.dest(BUILD_PATH + "/public"))
        );

        gulps.push(
          gulp.src([HTML_PATH + "/player.html", HTML_PATH + "/player.js"])
            .pipe(gulp.dest(BUILD_PATH))
        );

        gulps.push(
          gulp.src(HTML_PATH + "/index-build.html")
            .pipe(rename(function (path) {
              path.basename = "index";
              return path;
            }))
            .pipe(gulp.dest(BUILD_PATH))
        );

        gulps.forEach(function (task) {
          task.on('end', function () {
            if (++ii === gulps.length) {
              finishStaticBuild(platform);
            }
          });
        });
      });

      console.log('Build success to ' + config.output.path);
    }
    else {
      console.error('Output path must be a directory');
    }
  });
}

function createDevServer(platform) {
  var config = createPlatformConfig("DEV", platform, true);

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    debug: true,
    devtool: 'inline-source-map',
    stats: {
      colors: true
    }
  }).listen(DEV_SERVER_PORT, function(err){
    if (err) throw new gutil.Pluginerror("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:"+DEV_SERVER_PORT+"/webpack-dev-server/");
  });

  if (config.target === "node-webkit") {
    var childFork = child_process.fork("node_modules/nw/bin/nw", ["."]);
    childFork.on('exit', function () {
      process.exit();
    });
  }

  return watch([CSS_PATH + "/**/*.scss"], function(evt){
    return gulp.src([CSS_PATH + "**/*.scss"])
      .pipe(plumber())
      .pipe(compass(COMPASS_CONFIG));
  });
}

function createPlatformConfig(env, platform, server) {
  const config = Object.create(WEBPACK_CONFIG);
  config.target = platform || "node-webkit";
  if (env === "DEV") {
    if (server) {
      config.output.publicPath = "http://localhost:15555/" + config.output.publicPath;
    }
    else {
      var dir = gulp.env.dir;
      config.output.publicPath = (dir ? "/" + dir + "/" : "/") + config.output.publicPath;
    }
  }
  return config;
}

/**
 * Webpack task
 */
gulp.task("dev:desktop", function(callback){
  return createDevServer("node-webkit");
});

gulp.task("dev:web", function(callback){
  return createDevServer("web");
});

gulp.task("build:clean", function(){
  return gulp.src([ BUILD_PATH, BIN_BUILD_PATH ], {read: false})
    .pipe(clean());
});

gulp.task("build:web", ["build:clean"], function(){
  return createBuild("web");
});

gulp.task("build:desktop", ["build:clean"], function(){
  return createBuild("node-webkit");
});