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
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');

var rsync = require('gulp-rsync');
var sass = require('gulp-sass');

var frontend_path = 'frontend';
var common_path = 'common';
var backend_path = 'backend';
var components_path = "bower_components";
var modules_path = "node_modules";

var dist_path = "dist";
var server_main = backend_path + "/server.js";

var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var react = require('gulp-react');
var browserify = require('browserify');
var reactify = require('reactify');
var stripDebug = require('gulp-strip-debug');

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

var webpackFunc = function(name, ext, watch) {
  var options = {
    watch: watch,
    cache: true,
    output: {
      filename: name + ".js",
    },
    resolve: {
      extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".coffee"],
      modulesDirectories: [components_path, modules_path]
    },
    module: {
      loaders: [
         {
          test: [/\.js$/, /\.jsx$/],
          exclude: [new RegExp(modules_path), new RegExp(components_path)],
          loader: "babel-loader"
        }
      ]
    }
  };

  if(process.env.NODE_ENV !== 'production'){
    options.devtool = "source-map";
    options.output.sourceMapFilename = "[file].map";

   return gulp.src(frontend_path + "/" + name + "." + ext)
         .pipe(gwebpack(options))
         .pipe(gulp.dest(dist_path))
  } else{
    return gulp.src(frontend_path + "/" + name + "." + ext)
           .pipe(gwebpack(options))
           .pipe(stripDebug())
           .pipe(uglify())
           .pipe(gulp.dest(dist_path))
  }
};

var js = function(watch) {
  return webpackFunc("main", "js", watch); // cjsx
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


gulp.task('build', ['clean', 'copy', 'scss', 'js', 'copyToBuild']);
gulp.task('default', ['clean', 'copy', 'scss', 'server', 'js-dev', 'watch']);

gulp.task('watch', ['copy'], function() {
  livereload.listen();
  gulp.watch([dist_path + "/**/*"]).on('change', livereload.changed);
  gulp.watch([frontend_path + "/**/*.scss"], ['scss']);
  return gulp.watch([frontend_path + "/**/*.html"], ['copy']);
});


