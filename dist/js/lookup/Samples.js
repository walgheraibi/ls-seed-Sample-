/**
 * Created by weaamalgheraibi on 4/20/15.
 */


define([
    'angular',
    'angular-ui-router'
], function(angular) {
    return angular.module('OSCTR.app.sampleLookup',['ui.router'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('OSCTR-lookup', {
                url: 'OSCTR/lookup',
                templateUrl: 'ui/lookupModule/sampleLookup.html',
                controller: 'OSCTR.sampleLookup-ctrl',
                title: 'lookup'
            });
        }]).config(['MenuProvider', function(MenuProvider) {
            MenuProvider.add({
                state: 'OSCTR-lookup',
                icon: 'star',
                title: 'lookup'
            });
        }]);
});