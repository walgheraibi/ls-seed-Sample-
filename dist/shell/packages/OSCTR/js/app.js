/**
 * Created by weaamalgheraibi on 4/17/15.
 */
define([
        'angular',
        './demoModule/index',
        './sampleModule/index',
        '../templates/templates.min'
    ]
    , function(angular) {
        return angular.module('OSCTR', [
            'OSCTR.templates',
            'OSCTR.app.demo',
            'OSCTR.app.sample'
        ]).constant('CONFIG', {
            'package': 'OSCTR'
        });
    });

