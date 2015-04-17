#How to Create a LabShare Package

A LabShare package can extend the capabilities of the LabShare Shell by adding UI content, CLI commands, and/or APIs.

###LabShare Package Manifest

The locations of components included by the LabShare package need to be specified in its package.json's
"labshare-package" object.  Each component is optional.

Example:
```javascript
...
"labshare-package": {
    "ui": "path/to/ui/module/file",
    "styles": "path/to/stylesheet/file",
    "api": "path/to/api/directory"
},
...
```

###How to add UI content

To add new AngularJS content to the package, create a RequireJS module that returns an AngularJS module inside the 'ui' directory.
Third party dependencies that are not included in the Shell, such as Bower Components, will need to be included 
in the RequireJS module.  To avoid overriding components defined by other packages or the Shell,
all AngularJS components and sub-modules must be namespaced (e.g. myPackageName.MyController).

Example:
```javascript
// src/ui/app.js - The main AngularJS module
define([
    'angular',
    '../templates/templates.min', //Will show error. This is OK. This file is generated upon build.
    './demoModule/index',         //if however you have no html templates in package, then remove '../template/templates.min'
], function (angular) {
    'use strict';
    return angular.module('packageName', [
        'packageName.templates',
        'packageName.app.demo'
    ]);
});
```
```javascript
// src/ui/demoModule/index.js - File that brings module files together and referenced in app.js
define([
    './module',
    './demo-ctrl'
], function () {
});
```
```javascript
// src/ui/demoModule/module.js - Main file where module defined, routes added, menu items added
define([
    'angular',
    'angular-ui-router'
], function(angular) {
    return angular.module('packageName.app.demo',['ui.router'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('packageName-demo', {
                url: 'packageName/demo',
                templateUrl: 'ui/demoModule/demo.html',
                controller: 'packageName.demoController',
                title: 'Demo'
            });
        }]).config(['MenuProvider', function(MenuProvider) {
            /*
            * MenuProvider by default adds menu item to the right menu.
            * Add to left by adding argument 'left' as second parameter to add.
            * Ie. MenuProvider.add({},'left');
            */
            MenuProvider.add({
                state: 'packageName-demo', //state to navigate to
                icon: 'star', //Any valid font awesome icon
                title: 'Demo' //title shown in menu
            });
        }]);
});
```
```javascript
// src/ui/demoModule/demo-ctrl.js - example controller that extends angular module
define(['./module'], function(module) {
    return module.controller('ACOMM.demoController', ['$scope', function($scope) {
        $scope.message = 'This is a demo controller';
    }]);
});
```


####Style sheets
Custom style sheets included by the package must be compiled and concatenated to one file.  The resulting
style sheet file path needs to be added to the 'styles' key of the package's package.json so that it can be found by the
Shell.  All custom CSS classes/Ids must be namespaced to avoid interfering with the styles used by the Shell or other packages.

####UI Router routes/states
New routes/states must be defined using Angular UI Router.  To avoid interfering with the Shell's routes or the routes
of other packages, set the base state of the package's routes as 'your-package-name' with a url of '/your-package-name'.
All other states and routes defined by the package must be child states of the base state.

####HTML templates
To avoid relative path issues with HTML files, the most convenient option is to pre-load the views into the $templateCache
with a tool such as [gulp-ng-html2js](https://www.npmjs.com/package/gulp-ng-html2js).  The resulting template module can be included as
a dependency of the package's main AngularJS module.

####Images
TODO

###How to add CLI commands

To define new CLI commands, create NodeJS modules inside the specified 'cli' directory of the LabShare package.  Command help
text can be defined by adding a 'usage' array containing help text to the module exports object.  The basename of each CLI module file
defines the main command name and function names exported by the module define sub-commands.  Each main command name
must be unique.

Example:
```javascript
// src/cli/greeting.js
var greeting = module.exports;
// 'hello' is sub-command of 'greeting'
// After the LabShare Shell loads the 'greeting' module, 'hello' can be invoked using `lsc greeting hello <name>`.
greeting.hello = function (name, cb) {
    this.log.info('Hello ' + name + '!');
    cb(null);
};
greeting.goodbye = function (name, cb) {
    this.log.info('Goodbye ' + name + '!');
    cb(null);
};
// The help text for the 'greeting' command.  The help text can be displayed with `lsc help greeting`.
greeting.usage = [
    'lsc greeting hello <name> - Say hello to <name>',
    'lsc greeting goodbye <name> - Say goodbye to <name>'
];
```

###How to add APIs

TODO