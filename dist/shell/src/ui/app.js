define([
    'angular',
    'angular-animate',
    'angular-route',
    'angular-material',
    'angular-material-icons',
    'angular-aria',
    'angular-ui-router',
    './header/index',
    './menu/index'
], function (angular) {
    'use strict';
    return angular.module('lsshellApp', [
        'ngAnimate',
        'ngRoute',
        'ngMaterial',
        'ngMdIcons',
        'ngAria',
        'app.menu',
        'ui.router',
        'app.header'
    ]);
});