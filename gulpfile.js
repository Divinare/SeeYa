var slice = [].slice;
var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var gwebpack = require('gulp-webpack');
var sass = require('gulp-sass');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var rimraf = require('rimraf');
//GLOBAL.Promise = (require('es6-promise')).Promise;
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');

var rsync = require('gulp-rsync');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

var frontend_path = 'frontend';
var common_path = 'common';
var backend_path = 'backend';
var components_path = "bower_components";
var modules_path = "node_modules";
//var semantic_path = modules_path + "/semantic-ui-css";
var dist_path = "dist";
var server_main = backend_path + "/server.js";


/*** RSYNC DEPLOY TO PRODUCTION ***/

gulp.task('deploy', function() {
  return gulp.src(dist_path + '/**')
    .pipe(rsync({
        destination: '~/Production',
        root: dist_path,
        hostname: '37.139.24.156',
        username: 'general',
        incremental: true,
        progress: true,
        relative: true,
        emptyDirectories: true,
        recursive: true,
        clean: true,
        exclude: ['.DS_Store'],
        include: []
    }));
});




var err = function() {
  var x;
  x = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  gutil.log.apply(gutil, x);
  return gutil.beep.apply(gutil, x);
};

var webpack = function(name, ext, watch) {
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
          test: /\.jsx$/, // .cjsx$/,
          loader: "transform?coffee-reactify"
        }
      ]
    }
  };
  return gulp.src(frontend_path + "/" + name + "." + ext).pipe(gwebpack(options)).pipe(gulp.dest(dist_path));
};

var js = function(watch) {
  return webpack("main", "js", watch); // cjsx
};

gulp.task('js', function() {
  return js(false);
});

gulp.task('js-dev', function() {
  return js(true);
});


gulp.task('css', function () {
    return gulp.src(frontend_path + '/css/**/*.css')
        .on('error', err).pipe(postcss([
            autoprefixer({
                browsers: ["last 2 versions", "ie 8", "ie 9"]
            })
        ]))
       .pipe(concat('main.css'))
       .pipe(cssmin())
       .pipe(gulp.dest(dist_path));
});

gulp.task('scss', function () {
    return gulp.src(frontend_path + '/css/**/*.scss')
       .pipe(concat('main.css'))
       .pipe(cssmin())
       .pipe(gulp.dest(dist_path));
});


//var sassOptions = {
//  errLogToConsole: true,
//  outputStyle: 'expanded'
//};

//gulp.task('sass', function () {
//  return gulp
//    .src(frontend_path + "./css/**/*.scss")
//    .pipe(sass(sassOptions).on('error', sass.logError))
//    .pipe(gulp.dest("./dist/css"));
//});

gulp.task('clean', function() {
  return rimraf.sync(dist_path);
});

gulp.task('copy', function() {
  gulp.src(frontend_path + "/*.html").pipe(gulp.dest(dist_path));
  gulp.src(frontend_path + "/favicon.ico").pipe(gulp.dest(dist_path));
  gulp.src(frontend_path + "/css/fonts/**/*").pipe(gulp.dest(dist_path + "/fonts/"));
  gulp.src(frontend_path + "/assets/**/*").pipe(gulp.dest(dist_path + "/assets/"));
  return 
});

gulp.task('server', function() {
  return nodemon({
    script: server_main,
    watch: [server_main],
    execMap: {
      coffee: modules_path + "/.bin/coffee"
    },
    env: {
      PORT: process.env.PORT || 1337
    }
  });
});

/*** BUILD TASKS ***/

gulp.task('copyToBuild', function() {
    gulp.src("/dist/**/*.*").pipe(gulp.dest("/build/dist"));
});

//copyToBuild

gulp.task('build', ['clean', 'copy', 'scss', 'js', 'copyToBuild']);

gulp.task('default', ['clean', 'copy', 'scss', 'server', 'js-dev', 'watch']);

gulp.task('watch', ['copy'], function() {
  livereload.listen();
  gulp.watch([dist_path + "/**/*"]).on('change', livereload.changed);
  gulp.watch([frontend_path + "/**/*.scss"], ['scss']);
  return gulp.watch([frontend_path + "/**/*.html"], ['copy']);
});


