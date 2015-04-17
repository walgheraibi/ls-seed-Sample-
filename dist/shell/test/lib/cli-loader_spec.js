var path = require('path'),
    _ = require('lodash');

describe('CliLoader', function () {

    var CliLoader,
        cliLoader,
        packagesPath,
        flatironAppMock,
        options;

    beforeEach(function () {
        this.addMatchers({
            toContainAllOf: function (expected) {
                return _.all(expected, function (value) {
                    return _.includes(this.actual, value);
                }, this);
            }
        });

        packagesPath = './test/fixtures';
        flatironAppMock = {
            commands: {},
            log: {
                warn: jasmine.createSpy('warn'),
                help: jasmine.createSpy('help'),
                error: jasmine.createSpy('error')
            },
            plugins: {
                cli: {}
            },
            cli: {}
        };
        options = {
            packageDirectory: packagesPath
        };
        CliLoader = require('../../src/lib/cli-loader');
        cliLoader = new CliLoader(flatironAppMock, options);
    });

    it('throws an exception when invalid arguments and/or options are provided', function () {
        var original = _.cloneDeep(flatironAppMock);
        expect(function () {
            new CliLoader(flatironAppMock, {
                packageDirectory: []
            });
        }).toThrow();

        expect(function () {
            flatironAppMock.plugins = null;
            new CliLoader(flatironAppMock);
        }).toThrow();
        _.assign(flatironAppMock, original);

        expect(function () {
            flatironAppMock.commands = null;
            new CliLoader(flatironAppMock);
        }).toThrow();
        _.assign(flatironAppMock, original);

        expect(function () {
            flatironAppMock.log = null;
            new CliLoader(flatironAppMock);
        }).toThrow();
        _.assign(flatironAppMock, original);

        expect(function () {
            new CliLoader(flatironAppMock, {
                directories: 42
            });
        }).toThrow();
        _.assign(flatironAppMock, original);

        expect(function () {
            new CliLoader(flatironAppMock, {
                directories: 'a/path/to/a/directory'
            });
        }).not.toThrow();
    });

    describe('.load', function () {

        it('adds CLI commands to the app and caches command information', function () {
            expect(cliLoader._commands['cli-package1']).toBeUndefined();
            expect(cliLoader._commands['cli-package2']).toBeUndefined();
            expect(_.isEmpty(_.keys(flatironAppMock.commands))).toBeTruthy();

            cliLoader.load();

            var commandInfo1 = cliLoader._commands['cli-package1'],
                commandInfo2 = cliLoader._commands['cli-package2'];
            expect(_.keys(commandInfo1).concat(_.keys(commandInfo2))).toContainAllOf(['hello', 'add', 'subtract', 'goodbye']);
            expect(_.keys(flatironAppMock.commands)).toContainAllOf(['hello', 'add', 'subtract', 'goodbye']);
        });

        it('attempts to load commands from each directory specified by the "directories" option', function () {
            var cliLoader = new CliLoader(flatironAppMock, {
                packageDirectory: './src/cli',
                directories: ['./test/fixtures/cli-package1']
            });
            expect(cliLoader._commands['cli-package1']).toBeUndefined();
            expect(cliLoader._commands['cli-package2']).toBeUndefined();
            expect(_.keys(flatironAppMock.commands)).not.toContainAllOf(['hello', 'goodbye']);

            cliLoader.load();

            var commandInfo1 = cliLoader._commands['cli-package1'],
                commandInfo2 = cliLoader._commands['cli-package2'];
            expect(commandInfo1['goodbye']).toBeDefined();
            expect(commandInfo1['hello']).toBeDefined();
            expect(commandInfo2).toBeUndefined();
            expect(_.keys(flatironAppMock.commands)).toContainAllOf(['hello', 'goodbye']);
        });

        it('does not load cli commands from packages in the "ignoredPackageNames" option array', function () {
            var cliLoader = new CliLoader(flatironAppMock, {
                packageDirectory: packagesPath,
                ignoredPackageNames: ['cli-package1']
            });
            expect(cliLoader._commands['cli-package1']).toBeUndefined();
            expect(cliLoader._commands['cli-package2']).toBeUndefined();

            cliLoader.load();

            expect(_.keys(flatironAppMock.commands)).toContainAllOf(['add', 'subtract', 'hello']);
            expect(_.keys(flatironAppMock.commands)).not.toContain('goodbye');

            expect(cliLoader._commands['cli-package1']).toBeUndefined();
            expect(cliLoader._commands['cli-package2']).toBeDefined();
        });

        it('logs an error if two different LabShare packages try to load a command with the same name', function () {
            cliLoader.load();
            expect(flatironAppMock.log.error.calls[0].args[0])
                .toMatch(/A command with the same name has already been loaded/);
        });

        it('logs an error if an exception is thrown', function () {
            cliLoader.options.packageDirectory = 'INVALID';
            cliLoader.load();
            expect(flatironAppMock.log.error.calls[0].args[0])
                .toMatch(/Failed to load package commands/);
        });

        it('logs a warning if a loaded command does not contain help text', function () {

            var cliLoader = new CliLoader(flatironAppMock, {
                packageDirectory: './src/cli',
                directories: ['./test/fixtures/cli-package2']
            });
            cliLoader.load();
            expect(flatironAppMock.log.warn).toHaveBeenCalled();
        });

    });

    describe('.unload', function () {

        it('deletes all the commands assigned to the app by .load', function () {
            cliLoader.load();
            expect(_.keys(flatironAppMock.commands)).toContainAllOf(['hello', 'add', 'subtract', 'goodbye']);
            expect(_.keys(cliLoader._commands).length).toBeGreaterThan(0);
            cliLoader.unload();
            expect(_.keys(flatironAppMock.commands)).not.toContainAllOf(['hello', 'add', 'subtract', 'goodbye']);
            expect(_.keys(cliLoader._commands).length).toBe(0);
        });

    });

    describe('.displayHelp', function () {

        function allArgs(mock) {
            var allArgs = [];
            mock.calls.forEach(function (call) {
               allArgs = allArgs.concat(call.args);
            });
            return allArgs;
        }

        it('logs messages for each command found by the cliLoader', function () {
            cliLoader.displayHelp();
            expect(flatironAppMock.log.help.calls[0].args).toMatch(/No commands found/);

            cliLoader.load();
            cliLoader.displayHelp();
            expect(allArgs(flatironAppMock.log.help)).toContainAllOf([
                'hello', 'goodbye', 'add', 'subtract', 'cli-package1', 'cli-package2'
            ]);
        });

        it('logs messages for uncategorized commands too', function () {
            flatironAppMock.commands['uncategorizedCmd'] = function () { };
            cliLoader = new CliLoader(flatironAppMock, options);
            cliLoader.displayHelp();
            expect(allArgs(flatironAppMock.log.help)).toContain('uncategorizedCmd');
        });

    });

});