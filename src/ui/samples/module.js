/**
 * Created by weaamalgheraibi on 4/17/15.
 */

define([
    'angular',
    'angular-ui-router'
], function(angular) {
    return angular.module('OSCTR.app.samples',['ui.router'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('OSCTR-samples', {
                url: 'OSCTR/samples',
                templateUrl: 'ui/samples/samples.html',
                title: 'samples'
            });
        }]).config(['MenuProvider', function(MenuProvider) {
            MenuProvider.add({
                state: 'OSCTR-samples',
                icon: 'tasks',
                title: 'samples'
            });
        }]);
});