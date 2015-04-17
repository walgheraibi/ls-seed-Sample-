module.exports = function (config) {
    'use strict';

    config.set({
        autoWatch: true,
        basePath: '../../',
        frameworks: ['jasmine-ajax', 'jasmine', 'requirejs'],
        files: [
            {pattern: 'src/ui/**/*.js', included: false},
            {pattern: 'test/ui/unit/**/*.js', included: false},
            'test/ui/main-test.js'
        ],
        reporters: ['progress'],
        exclude: [],
        port: 8080,
        browsers: ['Chrome'],
        singleRun: true,
        colors: true,
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO
    });
};