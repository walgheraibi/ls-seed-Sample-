/**
 * Created by james on 4/3/15.
 */
define(['angular','./module'], function (angular, module) {
    'use strict';
    return module.provider('Menu', function () {
        var _menuLeft = [];
        var _menuRight = [];
        this.$get = function () {
            return {
                getItems: function (side) {
                    return (side === 'left') ? _menuLeft : _menuRight;
                }
            }
        }

        this.add = function (item, side) {
            if(side === 'left') _menuLeft.push(item);
            else _menuRight.push(item);
        }
    }).controller('MenuCtrl', ['$scope', 'Menu', function ($scope, Menu) {
        $scope.menuLeft = Menu.getItems('left');
        $scope.menuRight = Menu.getItems('right');
    }]);
});