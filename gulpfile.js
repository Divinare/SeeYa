var autoprefixer, components_path, dist_path, err, gulp, gutil, gwebpack, js, less, livereload, modules_path, nodemon, plumber, postcss, rimraf, semantic_path, server_main, src_path, webpack,
  slice = [].slice;

gulp = require('gulp');

gutil = require('gulp-util');

livereload = require('gulp-livereload');

nodemon = require('gulp-nodemon');

plumber = require('gulp-plumber');

gwebpack = require('gulp-webpack');

less = require('gulp-less');

postcss = require('gulp-postcss');

autoprefixer = require('autoprefixer-core');

rimraf = require('rimraf');

GLOBAL.Promise = (require('es6-promise')).Promise;

src_path = "src";

components_path = "bower_components";

modules_path = "node_modules";

semantic_path = modules_path + "/semantic-ui-css";

dist_path = "dist";

var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');


err = function() {
  var x;
  x = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  gutil.log.apply(gutil, x);
  return gutil.beep.apply(gutil, x);
};

webpack = function(name, ext, watch) {
  var options;
  options = {
    watch: watch,
    cache: true,
    devtool: "source-map",
    output: {
      filename: name + ".js",
      sourceMapFilename: "[file].map"
    },
    resolve: {
      extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".coffee"], // , ".cjsx"
      modulesDirectories: [components_path, modules_path]
    },
    module: {
      loaders: [
        {
          test: /\.coffee$/,
          loader: "coffee-loader"
        }, {
          test: [/\.js$/, /\.jsx$/],
          exclude: [new RegExp(modules_path), new RegExp(components_path)],
          loader: "babel-loader"
        }, {
          test: /\.cjsx$/,
          loader: "transform?coffee-reactify"
        }
      ]
    }
  };
  return gulp.src(src_path + "/" + name + "." + ext).pipe(gwebpack(options)).pipe(gulp.dest(dist_path));
};

js = function(watch) {
  return webpack("client", "js", watch); // cjsx
};

gulp.task('js', function() {
  return js(false);
});

gulp.task('js-dev', function() {
  return js(true);
});


gulp.task('css', function () {
    return gulp.src(src_path + '/css/**/*.css')
        .on('error', err).pipe(postcss([
            autoprefixer({
                browsers: ["last 2 versions", "ie 8", "ie 9"]
            })
        ]))
       .pipe(concat('main.css'))
       .pipe(cssmin())
       .pipe(gulp.dest(dist_path));
});


/*

        .pipe(autoprefixer({
            browsers: ["last 2 versions", "ie 8", "ie 9"],
            cascade: false
        }))


gulp.task('css', function() {
  return gulp.src(src_path + "/styles.less").pipe(plumber()).pipe(less({
    paths: [components_path, modules_path]
  })).on('error', err).pipe(postcss([
    autoprefixer({
      browsers: ["last 2 versions", "ie 8", "ie 9"]
    })
  ])).pipe(gulp.dest(dist_path));
});


*/


gulp.task('clean', function() {
  return rimraf.sync(dist_path);
});

gulp.task('copy', function() {
  gulp.src(src_path + "/*.html").pipe(gulp.dest(dist_path));
  gulp.src(src_path + "/favicon.ico").pipe(gulp.dest(dist_path));
  return gulp.src(semantic_path + "/themes/default/assets/**/*").pipe(gulp.dest(dist_path + "/themes/default/assets/"));
});

gulp.task('build', ['clean', 'copy', 'css', 'js']);

server_main = src_path + "/server.js";

gulp.task('server', function() {
  return nodemon({
    script: server_main,
    watch: [server_main],
    execMap: {
      coffee: modules_path + "/.bin/coffee"
    },
    env: {
      PORT: process.env.PORT || 3000
    }
  });
});

gulp.task('default', ['clean', 'copy', 'css', 'server', 'js-dev', 'watch']);

gulp.task('watch', ['copy'], function() {
  livereload.listen();
  gulp.watch([dist_path + "/**/*"]).on('change', livereload.changed);
  gulp.watch([src_path + "/**/*.less"], ['css']);
  return gulp.watch([src_path + "/**/*.html"], ['copy']);
});