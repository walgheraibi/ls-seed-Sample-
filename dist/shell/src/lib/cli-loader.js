/**
 * This module loads the CLI command modules located in LabShare packages.
 *
 * How to use:
 *  - Construct a CliLoader with a valid Flatiron app.  An options object can be passed as a
 *  second argument to the constructor.  To locate commands, specify options.packageDirectory
 *  and/or a list of package directories in options.directories.  View the constructor documentation
 *  for more details on the available options.
 *  - Call .load() to locate and load all the LabShare package cli commands specified by the options.
 *  - Call .unload() to remove all the commands assigned to the Flatiron app set by .load().
 *  - Call .displayHelp() to display the list of loaded commands to the console
 */

var fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    glob = require('glob'),
    assert = require('assert');

/**
 *
 * Throws an exception if the given app is not an initialized Flatiron app.
 *
 * @param {String} app An initialized Flatiron app with command storage and logging capabilities
 * @param {Object} options Overrides default settings
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
 *
 * @constructor
 */
function CliLoader(app, options) {
    assert.ok(app.commands && app.log && app.log.warn && app.log.error && app.log.help,
        'app must be a Flatiron app with command storage and logging capabilities');
    assert.ok(app.plugins && app.plugins.cli, 'The Flatiron cli plugin must be loaded by the app');

    this.app = app;
    this.options = options || {};
    this._commands = {};  // stored command format: {packageName1: {cmd1Name: true, cmd2Name: true, ...}, packageName2: ...}

    _.defaults(this.options, {
        packageDirectory: '',
        cliFilePattern: 'src/cli/*.js',
        directories: [],
        ignoredPackageNames: []
    });

    if (this.options.packageDirectory) {
        assert.ok(_.isString(this.options.packageDirectory), 'options.packageDirectory must be a string');
        this.options.packageDirectory = path.resolve(this.options.packageDirectory);
    }

    var directories = this.options.directories;
    this.options.directories = _.isString(directories) ? [directories] : directories;
    assert.ok(_.isArray(this.options.directories), 'options.directories must be an array');
    this.options.directories = _.map(this.options.directories, function (directory) {
        return path.resolve(directory);
    });
}

/*
 * Public methods
 */

/**
 * @description Synchronously loads and caches all the LabShare package CLI command modules
 * found in options.packageDirectory and/or options.directories.
 *
 * It stops and logs an error if it failed to load a command.
 */
CliLoader.prototype.load = function () {
    try {
        _.each(this.options.directories, function (directory) {
            this._setCommands(directory);
        }, this);
        if (this.options.packageDirectory) {
            this._loadCommandsFromPackageDirectory();
        }
    } catch (error) {
        this.app.log.error('Failed to load package commands:', error.message || error);
    }
};

/**
 * @description Synchronously unloads all the commands stored by the CLiLoader.
 */
CliLoader.prototype.unload = function () {
    var app = this.app;
    _.each(this._commands, function (pkg) {
        _.each(_.keys(pkg), function (name) {
            delete app.commands[name];
        });
    });
    this._commands = {};
};

/**
 * @description Displays a list of available commands.
 */
CliLoader.prototype.displayHelp = function () {
    var app = this.app,
        help = [],
        commands = this._getStoredCommandNames(),
        additionalCommands = this._getUncategorizedCommands();
    if (_.isEmpty(commands) && _.isEmpty(additionalCommands)) {
        return app.log.help('No commands found!');
    }
    help = help.concat(['All commands'], commands);
    if (!_.isEmpty(additionalCommands)) {
        help = help.concat(createCommandHeader('Additional commands'), additionalCommands);
    }
    _.each(help, function (message) {
        app.log.help(message);
    });
};

/*
 * Private methods
 */

function getBaseName(commandFile) {
    return path.basename(commandFile, path.extname(commandFile));
}

function createCommandHeader(name) {
    return ['', name, new Array(name.length + 1).join('-')];
}

function getCommands(directory, pattern) {
    var commands = {},
        commandFiles = glob.sync(pattern, {cwd: directory})
            .map(function (file) {
                return path.resolve(directory, file);
            });
    _.each(commandFiles, function (commandFile) {
        commands[getBaseName(commandFile)] = require(commandFile);
    });
    return commands;
}

/**
 * @description Assigns the given command to the Flatiron app. Duplicate command names are ignored
 * if the command(s) originated from the same package.
 *
 * An error is logged if two different packages try to load a command with the same name and
 * a warning is logged if the given command module does not contain help text.
 *
 * @param {String} name The name of the command
 * @param {String} command A CLI command module
 * @param {String} packageName The name of the LabShare package that contains the command
 * @private
 */
CliLoader.prototype._setCommand = function (name, command, packageName) {
    var app = this.app;
    this._commands[packageName] = this._commands[packageName] || {};

    if (_.has(this._commands[packageName], name)) {
        return;
    }
    if (_.has(app.commands, name)) {
        var error = 'Unable to load command: "' + name + '" from package "' + packageName +
            '". A command with the same name has already been loaded by a different package.';
        return app.log.error(error);
    }
    if (!command.usage) {
        app.log.warn('The command "' + name + '" is missing help text');
    }

    app.commands[name] = command;
    this._commands[packageName][name] = true;
};

/**
 * @description Locates all the command modules starting from the given directory.
 * Located commands are assigned using ._setCommand.
 * @param {String} directory An absolute path to a directory
 * @private
 */
CliLoader.prototype._setCommands = function (directory) {
    var cliFilePattern = this.options.cliFilePattern,
        packageJsonPath = path.join(directory, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
        return;
    }
    var pkgJson = require(packageJsonPath);
    if (this._isIgnored(pkgJson)) {
        return;
    }
    var commands = getCommands(directory, cliFilePattern);
    _.each(commands, function (command, name) {
        this._setCommand(name, command, pkgJson.name);
    }, this);
};

CliLoader.prototype._loadCommandsFromPackageDirectory = function () {
    var packageDirectory = this.options.packageDirectory,
        packages = fs.readdirSync(packageDirectory);
    _.each(packages, function (pkg) {
        var directory = path.join(packageDirectory, pkg);
        this._setCommands(directory);
    }, this);
};

/**
 * @description Retrieves the names of all the stored commands and formats them.
 * @returns {Array} of command names categorized by package names
 * @private
 */
CliLoader.prototype._getStoredCommandNames = function () {
    var allCommands = [],
        commands = this._commands;
    _.each(commands, function (pkgCommands, pkgName) {
        var commandList = _.keys(pkgCommands);
        if (_.isEmpty(commandList)) {
            return;
        }
        allCommands = allCommands.concat(createCommandHeader(pkgName), commandList);
    });
    return allCommands;
};

/**
 * @description Retrieves all the command names stored in the Flatiron app that were not
 * stored by the CliLoader.
 * @returns {Array} A list of command names.
 * @private
 */
CliLoader.prototype._getUncategorizedCommands = function () {
    var appCommands = _.keys(this.app.commands),
        storedCommands = _.values(this._commands);
    return _.filter(appCommands, function (command) {
        return !_.any(storedCommands, function (storedCommand) {
            return _.has(storedCommand, command);
        });
    });
};

/**
 * @param {Object} pkg A parsed package.json
 * @returns {Boolean} True if the given package is defined and is ignored by the loader, otherwise false
 * @private
 */
CliLoader.prototype._isIgnored = function (pkg) {
    return pkg && pkg.name
        && _.any(this.options.ignoredPackageNames, function isIgnored(name) {
            return pkg.name === name;
        })
};

module.exports = CliLoader;