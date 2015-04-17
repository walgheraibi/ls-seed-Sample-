var gulp = require('gulp'),
    atomshell = require('gulp-atom-shell'),
    pkg = require('../package.json'),
    path = require('path'),
    sass = require('gulp-sass'),
    minimist = require('minimist'),
    bowerRequireJS = require('bower-requirejs');

var options = minimist(process.argv.slice(2));

gulp.task('default', function () {
    console.log('hello world');
});

gulp.task('updatePaths', function() {
    process.chdir('../src/ui'); //in order to execute bower-requirejs in context of bower.json
    console.log('changing cwd to: ' + process.cwd());
    var options = {
        config: 'require-config.js',
        'exclude-dev': true,
        transitive: true
    };

    bowerRequireJS(options, function(rjsConfigFromBower) {
        console.log('Updated require-config');
        process.chdir('../../build'); //restore cwd
        console.log('restored cwd: ' + process.cwd());
    });

});

gulp.task('copyShell', function() {
    console.log('test dir is: ' + options.dir);
    if(options.dir) {
        console.log('dir: ' + options.dir);
    }
    return gulp.src('../**/*')
        .pipe(gulp.dest(options.dir + '/dist/shell'));
});

gulp.task('sass', function() {
    gulp.src('../src/ui/styles/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('../src/ui/styles'));
});

gulp.task('build', function () {
    return gulp.src([
        '../package.json',
        '../src/**/*'
    ], {base: '../'})
        .pipe(atomshell({
            version: '0.21.3',
            productName: pkg.name,
            productVersion: pkg.version,
            platform: process.platform
        }))
        .pipe(atomshell.zfsdest(path.resolve('..', 'release', pkg.name + '.zip')));
});