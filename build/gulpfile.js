var gulp = require('gulp'),
    pkg
        = require('../package.json'),
    ngHtml2Js = require("gulp-ng-html2js"),
    minifyHtml = require("gulp-minify-html"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    concatCss = require('gulp-concat-css'),
    minifyCSS = require('gulp-minify-css'),
    insert = require('gulp-insert'),
    bower = require('gulp-bower');

gulp.task('bower-pkg', function() {
    return bower({directory: './bower_components', cwd: '../src/ui'})
        .pipe(gulp.dest('../dist/shell/src/ui/bower_components'));
});

gulp.task('bower-shell', function() {
    return bower({directory: './bower_components', cwd: '../dist/shell/src/ui'});
});

gulp.task('css', function () {
    return gulp.src('../src/ui/styles/*.css')
        .pipe(concatCss("app.min.css"))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('js', function() {
    return gulp.src([
        '../src/ui/app.js',
        '../src/ui/**/module.js',
        '../src/ui/**/*.js',
        '!../src/ui/**/{bower_components,bower_components/**}'
    ]).pipe(gulp.dest('../dist/js'));
});

gulp.task('template', ['css'], function () {
    return gulp.src([
        '../src/ui/**/*.html',
        '!../**/index.html',
        '!../src/ui/**/{bower_components,bower_components/**}'
    ])
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: pkg.name + '.templates',
            prefix: 'ui/'
        }))
        .pipe(concat("templates.min.js"))
        .pipe(insert.wrap('define(["angular"], function(angular){','});'))
        .pipe(uglify())
        .pipe(gulp.dest("../dist/templates"));
});

gulp.task('copyToShell', ['js','css','template'], function() {
    return gulp.src(['../dist/**/*',
        '!../dist/shell',
        '!../dist/shell/**'])
        .pipe(gulp.dest('../dist/shell/packages/'+pkg.name));
});
gulp.task('default', ['copyToShell', 'bower']);
gulp.task('bower', ['bower-pkg', 'bower-shell']);