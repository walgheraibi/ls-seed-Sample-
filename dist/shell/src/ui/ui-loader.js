define(function () {
    "use strict";

    /**
     * @description Adds a stylesheet link to the HTML
     * @param {String} url
     * @param {HTML} document
     */
    function link(url, document) {
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = url;
        document.head.appendChild(css);
    }

    /**
     * @description Assigns the given AngularJS modules to the given AngularJS app module.
     * @param {Arguments} args An list of function arguments
     * @param {Module} app An AngularJS module
     */
    function setDependencies(args, app) {
        for (var i = 0, length = args.length; i < length; ++i) {
            var module = args[i];
            if (module && module.name) {
                app.requires.push(module.name);
            }
        }
    }

    /**
     * @description Retrieves package metadata from the given data object.
     * @param {Object} data
     * @returns {{uiModulePaths: Array, styleSheetPaths: Array}}
     */
    function getPackageData(data) {
        data = data || {};
        var packages = data['packages'] || [],
            uiModulePaths = [],
            styleSheetPaths = [];
        packages.forEach(function (pkg) {
            if (pkg['ui']) {
                uiModulePaths.push(pkg['ui']);
            }
            if (pkg['styles']) {
                styleSheetPaths.push(pkg['styles']);
            }
        });
        return {
            uiModulePaths: uiModulePaths,
            styleSheetPaths: styleSheetPaths
        }
    }

    /**
     * @param {String} url
     * @param {Function} callback Receives two values: the response object and the error.
     */
    function loadJSON(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            var data;
            if (xhr.readyState === 4) {
                try {
                    if ((xhr.status === 200 || xhr.status === 0) && xhr.responseText) {
                        data = JSON.parse(xhr.responseText) || {};
                        return callback(null, data);
                    }
                } catch (error) {
                    return callback(error, null);
                }
                callback(new Error('XHR.status is ' + xhr.status), null);
            }
        };
        xhr.send();
    }

    return {
        link: link,
        loadJSON: loadJSON,
        setDependencies: setDependencies,
        getPackageData: getPackageData
    };
});