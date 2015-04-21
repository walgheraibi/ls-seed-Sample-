/**
 * Created by weaamalgheraibi on 4/20/15.
 */

define(['./module'], function(module) {
    return module.controller('OSCTR.samplelookupCtrl', ['sampleService', '$scope', '$mdBottomSheet', function (sampleService, $scope, $mdBottomSheet) {
        // Load samples from service
        $scope.helloworld = "hello"
        sampleService.loadAllSamples().then(function (data) {
            $scope.stores = data;
        });

        // BottomSheet
        /*
        $scope.sampleBottomSheet = function ($event) {
            $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: '/ui/views/samples/sampleSheet.html',
                controller: ['$mdBottomSheet', SampleSheetController],
                controllerAs: "SampleSheetCtrl",
                targetEvent: $event
            }).then(function (clickedItem) {

            })
            function SampleSheetController($mdBottomSheet) {
                this.items = [
                    {name: 'View Sample Details', icon: "search"},
                    {name: 'Add To Cart', icon: "cart"}
                ]
                this.viewDetails = function (action) {
                    $mdBottomSheet.hide(action);
                }
            }
        }*/
    }]);
});