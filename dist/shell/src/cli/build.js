/**
 * Created by James on 4/10/15.
 */
var build = module.exports;
var shellCopier = require('../lib/shell-copier');

build.package = function() {
    App.log.info("Building package");
    try {
        console.log('cwd: ' + process.cwd());
        shellCopier.copyShell(process.cwd());
    } catch (error) {
        App.log.error('Failed to copy shell: ' + error.message);
    }
};
