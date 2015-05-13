/**
 * Created by weaamalgheraibi on 4/17/15.
 */
define([
        'angular',
        'angular-ui-grid',
        './demoModule/index',
        './samples/index',
        './storage/index',
        './lookup/index',
        './templates.min'
    ]
    , function(angular) {
        return angular.module('OSCTR', [
            'OSCTR.templates',
            'OSCTR.app.demo',
            'OSCTR.app.samples',
            'OSCTR.app.storage',
            'OSCTR.app.sampleLookup'
        ]).constant('CONFIG', {
            'package': 'OSCTR'
        });
    });

