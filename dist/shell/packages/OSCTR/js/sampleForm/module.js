/**
 * Created by weaamalgheraibi on 4/21/15.
 */

define([
    'angular',
    'angular-ui-router'
], function(angular) {
    return angular.module('OSCTR.app.sampleForm',['ui.router'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('OSCTR-sampleForm', {
                url: 'OSCTR/sampleForm',
                templateUrl: 'ui/sampleForm/sampleForm.html',
                controller: 'OSCTR.sampleFormController',
                title: 'sampleForm'
            });
        }]).config(['MenuProvider', function(MenuProvider) {
            MenuProvider.add({
                state: 'OSCTR-sampleForm',
                icon: 'star',
                title: 'sampleForm'
            });
        }]);
});