/**
 * requirejs.config
 *
 * The paths for third party libraries are automatically generated using the grunt-bower-requirejs task
 * ('grunt updatePaths').  The task is set to run after installing a new bower component in the .bowerrc post install script.
 */
requirejs.config({
    paths: {
        angular: 'bower_components/angular/angular',
        'angular-animate': 'bower_components/angular-animate/angular-animate',
        'angular-aria': 'bower_components/angular-aria/angular-aria',
        'angular-cookies': 'bower_components/angular-cookies/angular-cookies',
        'angular-material': 'bower_components/angular-material/angular-material',
        'angular-messages': 'bower_components/angular-messages/angular-messages',
        'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
        'angular-resource': 'bower_components/angular-resource/angular-resource',
        'angular-route': 'bower_components/angular-route/angular-route',
        'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize',
        'angular-scenario': 'bower_components/angular-scenario/angular-scenario',
        'angular-touch': 'bower_components/angular-touch/angular-touch',
        jquery: 'bower_components/jquery/dist/jquery',
        requirejs: 'bower_components/requirejs/require',
        'requirejs-domready': 'bower_components/requirejs-domready/domReady',
        xtk: 'vendors/XTK/xtk',
        lsModels: './lsModels',
        'material-design-icons': 'bower_components/material-design-icons/index.html'
    },
    shim: {
        angular: {
            deps: [
                'jquery'
            ],
            exports: 'angular'
        },
        'angular-animate': [
            'angular'
        ],
        'angular-aria': [
            'angular'
        ],
        'angular-cookies': [
            'angular'
        ],
        'angular-material': [
            'angular'
        ],
        'angular-messages': [
            'angular'
        ],
        'angular-resource': [
            'angular'
        ],
        'angular-route': [
            'angular'
        ],
        'angular-sanitize': [
            'angular'
        ],
        'angular-touch': [
            'angular'
        ],
        lsModels: {
            exports: 'lsModels'
        },
        xtk: {
            exports: 'X'
        },
        packages: [

        ]
    },
    packages: [

    ]
});

//After config requirejs, we need to call main.js
requirejs(['main']);
