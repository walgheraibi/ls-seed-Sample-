/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
define([
    'require',
    'angular',
    './app',
    'ui-loader',
    './routes',
    './themes/module',
    './shell-config'
],function (requirejs, angular, app, uiLoader) {
    'use strict';

    // TODO: Replace '../../config.json' with a server request
    uiLoader.loadJSON('../../config.json', function (error, data) {
        if (error) {
            throw new Error('Failed to retrieve package config: ' + (error.message || error));
        }
        var packageData = uiLoader.getPackageData(data);

        requirejs(packageData.uiModulePaths, function () {
            uiLoader.setDependencies(arguments, app);  // add package UI modules
            requirejs(['requirejs-domready!'], function (document) {
                packageData.styleSheetPaths.forEach(function (cssFile) {
                    uiLoader.link(cssFile, document);  // add package stylesheets
                });
                angular.bootstrap(document, [app.name]);
            });
        });
    });
});