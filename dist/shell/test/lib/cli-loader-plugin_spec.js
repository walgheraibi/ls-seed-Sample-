var path = require('path'),
    _ = require('lodash'),
    flatiron = require('flatiron');

describe('cliLoaderPlugin', function () {

    var cliLoaderPlugin,
        packagesPath,
        flatironApp,
        createFlatironApp;

    beforeEach(function () {
        packagesPath = './test/fixtures';
        cliLoaderPlugin = require('../../src/lib/cli-loader-plugin');
        createFlatironApp = function (options) {
            var app = flatiron.app;
            app.name = 'cli-test.js';
            app.use(flatiron.plugins.cli);
            app.use(cliLoaderPlugin, options);
            return app;
        };
        flatironApp = createFlatironApp({
            directories: [path.join(packagesPath, 'cli-package1')]
        });
    });

    describe('After attaching the plugin', function () {

        it('extends the Flatiron app with new CLI commands', function () {
            expect(_.keys(flatironApp.commands).length).toBe(0);
            flatironApp.start();
            var commandNames = _.keys(flatironApp.commands);
            expect(commandNames.length).toBe(3);
            _.each(['hello', 'help', 'goodbye'], function (name) {
                expect(commandNames).toContain(name);
            });
        });

    });

});