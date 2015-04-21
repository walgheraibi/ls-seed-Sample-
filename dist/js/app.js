/**
 * Created by weaamalgheraibi on 4/17/15.
 */
define([
        'angular',
        './demoModule/index',
        './sampleModule/index',
        './lookup/index',
        '../templates/templates.min'
    ]
    , function(angular) {
        return angular.module('OSCTR', [
            'OSCTR.templates',
            'OSCTR.app.demo',
            'OSCTR.app.sample',
            'OSCTR.app.sampleLookup'
        ]).constant('CONFIG', {
            'package': 'OSCTR'
        });
    });

