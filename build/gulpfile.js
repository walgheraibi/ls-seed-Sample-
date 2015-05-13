var gulp = require('gulp');
var pkgGulp = require('ls-shell/build/pkgGulpFile');
var pkg = require('../package.json');

gulp.tasks = pkgGulp(pkg).tasks;

