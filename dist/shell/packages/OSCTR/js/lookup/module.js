/**
 * Created by weaamalgheraibi on 4/21/15.
 */


define([
    'angular',
    'angular-ui-router'
], function(angular) {
    return angular.module('OSCTR.app.sampleLookup',['ui.router'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('OSCTR-samplelookup', {
                url: 'OSCTR/samplelookup',
                templateUrl: 'ui/lookup/sampleLookup.html',
                /*controller: 'OSCTR.sampleLookupCtrl',*/
                title: 'samplelookup'
            });
        }]).config(['MenuProvider', function(MenuProvider) {
            MenuProvider.add({
                state: 'OSCTR-samplelookup',
                icon: 'search',
                title: 'samplelookup'
            });
        }]);
});
