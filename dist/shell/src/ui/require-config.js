requirejs.config({
    paths: {
        angular: 'bower_components/angular/angular',
        'angular-animate': 'bower_components/angular-animate/angular-animate',
        'angular-cookies': 'bower_components/angular-cookies/angular-cookies',
        'angular-hotkeys': 'bower_components/angular-hotkeys/angular-hotkeys.min',
        'angular-aria': 'bower_components/angular-aria/angular-aria',
        'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
        'angular-scenario': 'bower_components/angular-scenario/angular-scenario',
        'angular-resource': 'bower_components/angular-resource/angular-resource',
        'angular-route': 'bower_components/angular-route/angular-route',
        'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize',
        'angular-touch': 'bower_components/angular-touch/angular-touch',
        'angular-material': 'bower_components/angular-material/angular-material',
        'angular-material-icons': 'bower_components/angular-material-icons/angular-material-icons.min',
        'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
        requirejs: 'bower_components/requirejs/require',
        'requirejs-domready': 'bower_components/requirejs-domready/domReady',
        async: 'bower_components/requirejs-plugins/src/async',
        depend: 'bower_components/requirejs-plugins/src/depend',
        font: 'bower_components/requirejs-plugins/src/font',
        goog: 'bower_components/requirejs-plugins/src/goog',
        image: 'bower_components/requirejs-plugins/src/image',
        json: 'bower_components/requirejs-plugins/src/json',
        mdown: 'bower_components/requirejs-plugins/src/mdown',
        noext: 'bower_components/requirejs-plugins/src/noext',
        propertyParser: 'bower_components/requirejs-plugins/src/propertyParser',
        'Markdown.Converter': 'bower_components/requirejs-plugins/lib/Markdown.Converter',
        text: 'bower_components/requirejs-plugins/lib/text',
        'requirejs-text': 'bower_components/requirejs-text/text',
        'ui-loader': './ui-loader'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        'angular-animate': [
            'angular'
        ],
        'angular-aria': [
            'angular'
        ],
        'angular-route': [
            'angular'
        ],
        'angular-resource': [
            'angular'
        ],
        'angular-material': [
            'angular'
        ],
        'angular-material-icons': [
            'angular'
        ],
        'angular-ui-router': [
            'angular'
        ]
    },
    packages: [

    ]
});

//After config requirejs, we need to call main.js
requirejs(['main']);