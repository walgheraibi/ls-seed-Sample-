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
                url: 'OSCTR/demo',
                templateUrl: 'ui/demoModule/demo.html',
                controller: 'OSCTR.demoController',
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