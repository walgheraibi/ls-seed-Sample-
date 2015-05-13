/**
 * Created by weaamalgheraibi on 4/24/15.
 */

define([
    'angular',
    'angular-ui-router'
], function(angular) {
    return angular.module('OSCTR.app.storage',['ui.router'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('OSCTR-storage', {
                url: 'OSCTR/storage',
                templateUrl: 'ui/storage/storage.html',
                controller: 'OSCTR.storageController',
                title: 'storage'
            });
        }]).config(['MenuProvider', function(MenuProvider) {
            MenuProvider.add({
                state: 'OSCTR-storage',
                icon: 'list',
                title: 'storage'
            });
        }]);
});