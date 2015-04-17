/**
 * Created by james on 4/9/15.
 */
define([
    'angular',
    './module'
], function (ng, module) {
    'use strict';
    return module.directive('leftShellMenu', [
        '$rootScope',
        function ($rootScope) {
            var menuController = ['$scope', '$state', '$log','$mdSidenav',
                function ($scope, $state, $log,$mdSidenav) {;
                    $scope.close = function(menuSide) {
                        $mdSidenav('left').close().then(function () {
                            $log.debug('closed nav: left');
                        });
                    };
                }

            ];
            return {
                restrict: 'E',
                link: function (scope, element, attrs) {

                },
                templateUrl: 'menu/leftMenu.html',
                controller: menuController
            };
        }
    ]);
});