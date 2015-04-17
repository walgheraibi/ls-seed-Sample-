/**
 * Flatiron plugin that can load CLI command modules located in LabShare packages.
 *
 * How to use:
 * 1. Create a new Flatiron app:
 * flatiron = require('flatiron'),
 * var app = flatiron.app;
 *
 * 2. Assign the app the Flatiron cli plugin:
 * app.use(flatiron.plugins.cli, {
 *      // options
 * });
 *
 * 3. Assign the `cli-loader-plugin` to the app:
 * app.use(require('path/to/cli-loader-plugin'), {
 *      // options
 * });
 *
 * 4. Start the app:
 * app.start();
 *
 *
 * There are several options that can be passed to the cli-loader-plugin.
 *
 * options:
 * {String} cliFilePattern
 * The pattern used to match files that contain cli commands (e.g. 'src/cli/*.js')
 *
 * {String} packageDirectory
 * A relative or absolute path to a directory containing LabShare packages as subdirectories
 * Default: ''
 *
 * {Array} directories
 * A list of paths to LabShare packages that should be searched for CLI commands. Each directory
 * must contain a package.json to be considered valid.
 * Default: []
 *
 * {Array} ignoredPackageNames
 * A list of LabShare package names that should be ignored by the loader
 * Default: []
 */

var CliLoader = require('./cli-loader');
    cliLoaderPlugin = exports;

cliLoaderPlugin.name = 'cli-loader-plugin';

cliLoaderPlugin.attach = function (options) {
    cliLoaderPlugin.options = options;
};

cliLoaderPlugin.init = function (done) {
    var app = this;
    cliLoaderPlugin.loader = new CliLoader(app, cliLoaderPlugin.options);
    cliLoaderPlugin.loader.load();
    app.commands['help'] = function () {
        cliLoaderPlugin.loader.displayHelp();
    };
    done();
};

cliLoaderPlugin.detach = function () {
    delete app.commands['help'];
    cliLoaderPlugin.loader.unload();
    cliLoaderPlugin.loader = null;
};