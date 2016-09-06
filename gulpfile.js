var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var del = require('del');
var stripDebug = require('gulp-strip-debug');
var notify = require("gulp-notify");
var eslint = require("gulp-eslint");
var react = require("gulp-react");
var babel = require("gulp-babel")
var babelify = require("babelify");
var presetEs2015 = require("babel-preset-es2015");
var presetReact = require("babel-preset-react");
var _ = require('lodash');

var SOURCE = 'src';
var TARGET = 'build';
var MIN_DIR = 'min';

var MODULES = {
    'sandbox': './sample/sandbox/',
    'todo': './sample/todo/'
};

function build(module) {
    var dir = MODULES[module];
    var bundleStream = browserify({
        entries: [dir + SOURCE + '/index.js'],
        transform: [[babelify, {presets: [presetEs2015, presetReact]}], reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: false
    });

    var startBuild = function () {
        bundleStream.bundle()
            .on('error', function (err) {
                return notify().write(err);
            })
            .pipe(source(dir))
            .pipe(rename({dirname: '', basename: module, extname: '.js'}))
            .pipe(gulp.dest(dir + TARGET))
            .pipe(notify('Module built: ' + module));
    };

    startBuild();

    var watcher = watchify(bundleStream);
    watcher.on('update', startBuild);

    return watcher;
}

gulp.task('js-build', function () {
    Object.keys(MODULES).forEach(function (module) {
        build(module);
    });
});
Object.keys(MODULES).forEach(function (module) {
    gulp.task('js-build-' + module, function () {
        build(module);
    });
});

gulp.task('js-lint', function () {
    return gulp.src(SOURCE_DIR + '**/*.js')
        .on('error', function (err) {
            return notify().write(err);
        })
        .pipe(eslint({
          extends: 'eslint:recommended',
          ecmaFeatures: {
            modules: true,
            jsx: true
          },
          env: {
            browser: true,
            commonjs: true,
            jquery: true,
            es6: true
          },
          plugins: [
            "react"
          ],
          rules: {
            "react/display-name": 1,
            "react/forbid-prop-types": 1,
            "react/jsx-boolean-value": 1,
            "react/jsx-closing-bracket-location": 1,
            "react/jsx-curly-spacing": 1,
            "react/jsx-handler-names": [1, {
                "eventHandlerPrefix": 'on',
                "eventHandlerPropPrefix": 'on'
            }],
            "react/jsx-indent-props": 1,
            "react/jsx-key": 1,
            "react/jsx-max-props-per-line": 1,
            "react/jsx-no-bind": 1,
            "react/jsx-no-duplicate-props": 1,
            "react/jsx-no-literals": 0,
            "react/jsx-no-undef": 1,
            "react/jsx-pascal-case": 1,
            "react/jsx-sort-prop-types": 1,
            "react/jsx-sort-props": 1,
            "react/jsx-uses-react": 1,
            "react/jsx-uses-vars": 1,
            "react/no-danger": 1,
            "react/no-did-mount-set-state": 0,
            "react/no-did-update-set-state": 0,
            "react/no-direct-mutation-state": 1,
            "react/no-multi-comp": 1,
            "react/no-set-state": 0, // Clean up state handling later?
            "react/no-unknown-property": 1,
            "react/prefer-es6-class": 1,
            "react/prop-types": 1,
            "react/react-in-jsx-scope": 1,
            "react/require-extension": 1,
            "react/self-closing-comp": 1,
            "react/sort-comp": 1,
            "react/wrap-multilines": 1,
            "jsx-quotes": [1, 'prefer-single'],
            "no-console": 0,
            "indent": [1, 4, {"SwitchCase": 1}],
            "semi": [1, 'never']
          },
          globals: {
            "L": false // Leaflet
          }
        }))
        .pipe(eslint.format());
});

gulp.task('js-publish', function () {
    gulp.src(TARGET_DIR + '**/*.js')
        .on('error', function (err) {
            return notify().write(err);
        })
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(MIN_DIR))
        .pipe(notify('All modules published'));
});

gulp.task('js-clean', function () {
    del([TARGET_DIR, MIN_DIR], {force: true}, function (err, paths) {
        if (paths !== undefined) {
            notify().write('Deleted folders:');
            paths.forEach(function (path) {
                notify().write(path);
            });
        }
    })
});

gulp.task('default', ['js-build']);
