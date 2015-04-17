#!/usr/bin/env node

var flatiron = require('flatiron'),
    path = require('path'),
    app = flatiron.app,
    pkg = require(path.join(__dirname, '..', '..', 'package.json'));

app.Title = pkg.description + "  v" + pkg.version;
app.config.file({ file: path.join(__dirname, '..', '..', 'config.json') });

app.use(flatiron.plugins.cli, {
    usage: [app.Title,
        '',
        'Usage:',
        'lsc <command>       - run a command',
        'lsc help            - list all commands',
        'lsc help <command>  - display help for a specific command'
    ],
    version: true
});

app.use(require('flatiron-cli-config'));
app.use(require('./cli-loader-plugin'), {
    packageDirectory: path.join(__dirname, '..', '..', 'packages'),
    directories: [process.cwd(), path.join(__dirname, '..', '..')]
});

global.App = app;
global.Config = app.config.load();

app.start();