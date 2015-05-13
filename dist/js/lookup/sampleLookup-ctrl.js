/**
 * Created by weaamalgheraibi on 4/20/15.
 */

define(['./module'], function(module) {
    return module.controller('OSCTR.samplelookupCtrl', ['sampleService', '$rootScope','$scope', '$mdBottomSheet', '$mdDialog', function (sampleService, $rootScope, $scope, $mdBottomSheet, $mdDialog) {
        // Load samples from service
        //add a $rootScope
        $scope.actionButtonDisable=true;
        $scope.rowSelectLocked= false;
        $scope.selectedRow= null;

        $scope.gridOptions={
            //Row
            enableRowSelection: true,
            enableSelectAll : false,
            enableRowHeaderSelection : false,
            multiSelect: false,
            noUnslect: false,

            //scroll bar
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 2,

            //large data set
            flatEntityAcess: true,

            //column Menu
            enableColumnMenus:false,

            columnDefs: [
                {
                    name: "diseaseCode", displayName: 'Disease Code'
                },
                {
                    name: "diseaseType", displayName: 'Disease Type'
                },
                {
                    name: "eye", displayName: 'Affected Area'
                },
                {
                    name: "botheye", displayName: 'Disease Name'
                },
                {
                    name: "gender", displayName: 'Gender'
                },
                {
                    name: "age", displayName: 'Age'
                },
                {
                    name: "ethnicity", displayName: 'Ethnicity'
                },
                {
                    name: "comment", displayName: 'comment'
                }
            ]

            //row TEMPLATE
            //rowTemplate: "packages/OSCTR/ui/lookup/rowTemplate.html"
        }


        //grid API
        //$scope.gridOptions.onRegisterApi = function(gridApi){
       //     $scope.gridApi = gridApi;
        //};


        if(!$rootScope.SampleList){
            var profile1 = {
                "diseaseCode": "AMD00001",
                "diseaseType": "Bilateral",
                "eye": "Both",
                "age": "78",
                "gender": "Male",
                "ethnicity": "Caucasian",
                "botheye": ["Age-related macular degeneration (AMD) - advanced (geographic atrophy)"],
                "comment": ""
            }
            var profile2 = {
                "diseaseCode": "CNV00002",
                "diseaseType": "Bilateral",
                "eye": "Both",
                "age": "88",
                "gender": "Male",
                "ethnicity": "Caucasian",
                "botheye": ["choroidal neovascularization (CNV)"],
                "comment": ""
            }

            $rootScope.SampleList=[
                profile1,profile2
            ];
        };
        //$scope.stores = $rootScope.SampleList;
        $scope.gridOptions.data= $rootScope.SampleList;


        /*
        $scope.selectSample = function(row) {
            $scope.selectedRow = row;
        };
        */

        /*
        $scope.rowAction = function(row){
            if(row.isSelected){
                $scope.selectedRow=row;
            }
            else{
                $scope.selectedRow=null;
            }
        }
        */
/*
        $scope.DetailAction = function(ev){
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Affected Area')
                    .content('Not selectedRow' + $scope.selectedRow )
                    .ok('OK!')
                    .targetEvent(ev)
            );

            if($scope.selectedRow){
                $mdDialog.show(
                    $mdDialog.alert()
                        .title('Affected Area')
                        .content('selectedRow' + $scope.selectedRow )
                        .ok('OK!')
                        .targetEvent(ev));
            }
        }


      /*  sampleService.loadAllSamples().then(function (data) {
            $scope.stores = data;
        });
        $scope.DetailAction = function(){
            if($scope.selectedRow){
                var sessionType=_.findWhere($scope.selectedRow.entity.Properties, {internalName: "SessionType"});
                $state.go('session-detail', { workboxID: $scope.selectedRow.entity.lsID, sessionType:sessionType.value } );
            }
        }
        $scope.ZipAction = function(){
            if($scope.selectedRow){
                $state.go('download', { getID: $scope.selectedRow.entity.Properties[0].value } );
            }

        }
        $scope.AddAction = function(){
            $state.go('mode-create');
        }

        $scope.rowAction = function(row){
            if(row.isSelected){
                $scope.selectedRow=row;
            }
            else{
                $scope.selectedRow=null;
            }
        }
       /* $scope.actionButtonDisable=true;
        $scope.loading=true;
        $scope.rowSelectLocked=false;

        $scope.selectedRow= null;

        $scope.gridOptions = {
            //Sorting
            //Row
           enableRowSelection:true,
            enableSelectAll: false,
            enableRowHeaderSelection: false,
            multiSelect:false,
            noUnselect:false,

            //scroll bar
            enableHorizontalScrollbar : 0,
            enableVerticalScrollbar : 2,

            //lage data set
            flatEntityAccess:true,

            //columnMenus
            enableColumnMenus:false,
            //columnDefs
            columnDefs: [
                { name: "Session Date",               displayName: 'Session Date'        ,headerCellClass: 'ui-grid-header-white' , width:120 ,type: 'date', cellFilter: 'date:"MM-dd-yyyy"'
                },
                { name: 'Session Date',               displayName: 'Session Type'       , headerCellClass: 'ui-grid-header-white' , width:120
                },
                { name: 'Session Date',                displayName: 'Project'             ,headerCellClass: 'ui-grid-header-white' , width:'18.75%'
                },
                { name: 'Session Date',                displayName: 'Experiment'          ,headerCellClass: 'ui-grid-header-white' , width:'18.75%'
                },
                { name: 'Session Date', displayName: 'Owner',               headerCellClass: 'ui-grid-header-white' , width:240
                },
                { name: 'Session Date',  displayName: 'LabPI' ,              headerCellClass: 'ui-grid-header-white',  width:240
                }
            ]

        };*/
        //grid API
       // $scope.gridOptions.onRegisterApi = function(gridApi){
         //   $scope.gridApi = gridApi;
       // };
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