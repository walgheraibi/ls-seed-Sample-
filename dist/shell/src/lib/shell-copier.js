/**
 * Created by James on 4/10/15.
 */
var path = require('path');
var exec = require('child_process').exec,
    child;

var shellCopier = module.exports;

shellCopier.copyShell = function(packagePath) {
    var gulpPath = path.resolve(__dirname, '..','..','build')
    console.log('package path: ' + packagePath);
    console.log('gulp path: ' + gulpPath);
    exec('gulp copyShell --cwd ' + gulpPath + ' --dir ' + packagePath);
};