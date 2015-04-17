var packageGenerator = require('../lib/package-generator'),
    package = module.exports;

package.usage = [App.Title,
    '',
    'lsc package load <package> - Load LabShare package ',
    'lsc package unload <package> - Unload LabShare package',
    'lsc package install <package> - Install LabShare package',
    'lsc package uninstall <package> - Uninstall LabShare package',
    'lsc package create <package> - Generate a basic LabShare package',
    ''
];

var getPackageName = function (arguments) {
    var callback = arguments[arguments.length - 1];

    var packageName = null;
    if (arguments.length > 1)
        packageName = arguments[0];

    if (!packageName) {
        var err = new Error("Invalid arguments. Package name is needed.");
        App.log.error(err.message);
        callback(err);
        return;
    }

    return packageName;
};

package.load = function () {

    var packageName = getPackageName(arguments);
    if (!packageName)
        return;

    App.log.info("Loading LabShare package: ", packageName);

};

package.unload = function () {

    var packageName = getPackageName(arguments);
    if (!packageName)
        return;
    App.log.info("Unloading LabShare package: ", packageName);

};

package.install = function () {

    var packageName = getPackageName(arguments);
    if (!packageName)
        return;
    App.log.info("Installing LabShare package: ", packageName);

};

package.uninstall = function () {

    var packageName = getPackageName(arguments);
    if (!packageName)
        return;
    App.log.info("Uninstalling LabShare package: ", packageName);

};

package.create = function () {

    var packageName = getPackageName(arguments);
    if (!packageName)
        return;
    App.log.info("Initializing LabShare package: ", packageName);
    try {
        packageGenerator.generateFromTemplate(process.cwd(), packageName);
    } catch (error) {
        App.log.error('Failed to generate LabShare package: ' + error.message);
    }
};