/**
 * Created by weaamalgheraibi on 4/17/15.
 */

define([
    'angular',
    'angular-ui-router'
], function(angular) {
    return angular.module('OSCTR.app.demo',['ui.router'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('OSCTR-demo', {
                url: 'OSCTR/sample',
                templateUrl: 'ui/sampleModule/sample.html',
                controller: 'OSCTR.sampleController',
                title: 'Demo'
            });
        }]).config(['MenuProvider', function(MenuProvider) {
            MenuProvider.add({
                state: 'OSCTR-demo',
                icon: 'star',
                title: 'Demo'
            });
        }]);
});