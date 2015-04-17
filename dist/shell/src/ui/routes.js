/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {
    'use strict';

    app.config(function ($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to state 'home'
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                template: '<h2>Shell\'s home page</h2>'
            });
    })
});