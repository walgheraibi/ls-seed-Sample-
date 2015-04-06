define(['angular', 'lsModels'], function (angular) {
    'use strict';
    return angular.module('app.helloworld.ctrls', []).controller('helloCtrl', [
        '$scope', function($scope) {
            $scope.helloworld = 'helloworld';
            var user = LabUser({userName:'qaadmin1'});
            $scope.hello = 'Hello ' + user.userName;
        }
    ]).controller('testServiceCtrl', function($scope, helloWorldService) {
        helloWorldService.hello("http://0.0.0.0:9090", "James").then(
            function(response) {
                $scope.message = response.message;
            },
            function(errorMessage) {
                $scope.message = "ErrorHelloService";
            }
        );
    }).controller('searchDemoCtrl', function($scope, $filter) {

        $scope.filteredStores = [];
        $scope.search = function(searchKeywords) {
            $scope.filteredStores = $filter('filter')($scope.stores, searchKeywords);
        }
        $scope.$on('SEARCH/hello', function(event, searchKeywords) {
            $scope.search(searchKeywords);
        });
        $scope.stores = [
            {
                name: 'Nijiya Market',
                price: '$$',
                sales: 292,
                rating: 4.0
            }, {
                name: 'Eat On Monday Truck',
                price: '$',
                sales: 119,
                rating: 4.3
            }, {
                name: 'Tea Era',
                price: '$',
                sales: 874,
                rating: 4.0
            }, {
                name: 'Rogers Deli',
                price: '$',
                sales: 347,
                rating: 4.2
            }, {
                name: 'MoBowl',
                price: '$$$',
                sales: 24,
                rating: 4.6
            }
        ];
        var init = function() {
            $scope.search('');
        };
        return init();
    });
});