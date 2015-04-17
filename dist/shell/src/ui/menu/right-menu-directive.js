define([
    'angular',
    './module'
], function (ng, module) {
    'use strict';
    return module.directive('rightShellMenu', [
        '$rootScope',
        function ($rootScope) {
            var menuController = ['$scope', '$state', '$log','$mdSidenav',
                function ($scope, $state, $log,$mdSidenav) {;
                    $scope.close = function() {
                        $mdSidenav('right').close().then(function () {
                            $log.debug('closed nav: right');
                        });
                    };
                }

            ];
            return {
                restrict: 'E',
                link: function (scope, element, attrs) {

                },
                templateUrl: 'menu/rightMenu.html',
                controller: menuController
            };
        }
    ]);
});