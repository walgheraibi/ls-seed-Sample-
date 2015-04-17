/**
 * Created by weaamalgheraibi on 4/17/15.
 */
define(['./module'], function(module) {
    return module.controller('OSCTR.demoController', ['$scope', function($scope) {
        $scope.message = 'This is a demo controller';
    }]);
});