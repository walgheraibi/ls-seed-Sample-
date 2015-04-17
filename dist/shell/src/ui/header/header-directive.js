/**
 * Created by james on 4/2/15.
 */
define([
    'angular',
    './module',
], function (ng, module) {
    'use strict';
    return module.directive('shellHeader', [
        '$rootScope',
        function ($rootScope) {
            var headerController = ['$rootScope', '$scope', '$state', '$log','$mdSidenav', 'shell-header',
                function ($rootScope, $scope, $state, $log, $mdSidenav, shellHeader) {
                    $scope.state = $state;
                    $scope.shellHeader = shellHeader;
                    $log.log('injected header');
                    $scope.contextSearch = function() {
                        var state = $state.current.name;
                        var eventName = 'SEARCH.' + state;
                        $log.debug('Search event: ' + eventName);
                        $log.debug('Keywords: ' + $scope.searchKeywords);
                        $rootScope.$broadcast(eventName, $scope.searchKeywords);
                    };

                    $scope.toggle = function(side) {
                        $mdSidenav(side).toggle().then(function() {
                            $log.debug('toggled: ' + side);
                        });
                    };
                    $rootScope.$on('$stateChangeSuccess', function() {
                        $log.debug('New state: ' + $state.current.name);
                        /*$scope.searchKeywords = ''; //reset search field on state change
                        if($rootScope.authInfo && !$scope.showSettings) {
                            var role = $rootScope.authInfo.role;
                            if (role === CONFIG.ROLES.ADMIN || role === CONFIG.ROLES.STAFF) {
                                $scope.showSettings = true;
                            }
                        }*/
                    });
                }];
            return {
                restrict: 'E',
                link: function (scope, element, attrs) {
                    //scope.showSettings = false;
                },
                templateUrl: './header/header.html',
                controller: headerController
            };
        }
    ]);
});
