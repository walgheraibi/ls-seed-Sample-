/**
 * Created by weaamalgheraibi on 4/17/15.
 */

define([
    'angular',
    'angular-ui-router'
], function(angular) {
    return angular.module('OSCTR.app.dragdrop',['ui.router'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('OSCTR-sample', {
                url: 'OSCTR/sample',
                templateUrl: 'ui/sampleModule/sample.html',
                controller: 'OSCTR.sampleController',
                title: 'sample'
            });
        }]).config(['MenuProvider', function(MenuProvider) {
            MenuProvider.add({
                state: 'OSCTR-sample',
                icon: 'star',
                title: 'sample'
            });
        }]);
});