/**
 * Created by weaamalgheraibi on 4/24/15.
 */

define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('OSCTR.storageController',
        [
            '$rootScope',
            '$scope',
            '$state',
            '$stateParams',
            '$mdDialog',
            'CONFIG',
            'sessionListResource',
            '$filter',
            function ($rootScope, $scope, $state, $stateParams,$mdDialog, CONFIG, sessionListResource,$filter) {
                $scope.actionButtonDisable=true;
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
                        { name: "Properties[18].value",               displayName: 'Session Date'        ,headerCellClass: 'ui-grid-header-white' , width:120 ,type: 'date', cellFilter: 'date:"MM-dd-yyyy"'
                        },
                        { name: 'Properties[19].value',               displayName: 'Session Type'       , headerCellClass: 'ui-grid-header-white' , width:120
                        },
                        { name: 'Properties[5].value',                displayName: 'Project'             ,headerCellClass: 'ui-grid-header-white' , width:'18.75%'
                        },
                        { name: 'Properties[3].value',                displayName: 'Experiment'          ,headerCellClass: 'ui-grid-header-white' , width:'18.75%'
                        },
                        { name: 'Properties[13].value.Refs[0].Value', displayName: 'Owner',               headerCellClass: 'ui-grid-header-white' , width:240
                        },
                        { name: 'Properties[7].value.Refs[0].Value',  displayName: 'LabPI' ,              headerCellClass: 'ui-grid-header-white',  width:240
                        }
                    ],

                    //row Template
                    rowTemplate: "./app/modules/manage-sessions/rowTemplate.html"
                };
                //grid API
                $scope.gridOptions.onRegisterApi = function(gridApi){
                    $scope.gridApi = gridApi;
                };

                /*
                 $scope.rowSelect = function(row) {
                 if($scope.rowSelectLocked){
                 $scope.rowSelectLocked=false;
                 $scope.gridApi.selection.clearSelectedRows();
                 }
                 ($scope.gridApi.grid.isScrollingVertically||$scope.gridApi.grid.isScrollingHorizontally)?$scope.gridApi.selection.clearSelectedRows():row.isSelected = true;
                 }
                 $scope.rowUnSelect = function(row) {
                 ($scope.gridApi.grid.isScrollingVertically||$scope.gridApi.grid.isScrollingHorizontally)
                 ?
                 $scope.gridApi.selection.clearSelectedRows():
                 $scope.rowSelectLocked
                 ?
                 row.isSelected=true:row.isSelected = false;
                 }
                 $scope.rowFlurfunction = function(row){
                 $scope.rowSelectLocked
                 ?
                 row.isSelected=true:row.isSelected=false;
                 }
                 $scope.showToolbarAction = function(row,$event){
                 var tempRow=$scope.gridApi.selection.getSelectedRows();
                 $scope.rowSelectLocked=true;
                 row.isSelected=true;
                 $scope.actionButtonDisable=false;git
                 return row;
                 }
                 */


                //list action
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
                /*
                 $scope.showGridBottomSheet = function(row,$event) {

                 $scope.rowSelectLocked=true;
                 row.isSelected=true;
                 $mdBottomSheet.show({
                 templateUrl: './app/modules/manage-sessions/bottom-sheet-grid-template.html',
                 controller: 'SessionListController',
                 targetEvent: $event
                 }).then(function(clickedItem) {
                 $scope.rowSelectLocked=false;
                 row.isSelected=false;
                 switch(clickedItem.name) {
                 case 'detail':
                 $state.go('session-detail', { id: row.entity.ID } );
                 break;
                 case 'zip and download':
                 $state.go('session-zip', { id: row.entity.ID } );
                 break;
                 default:
                 break;
                 }
                 });
                 };
                 $scope.listItemClick = function($index) {
                 var clickedItem = $scope.items[$index];
                 $mdBottomSheet.hide(clickedItem);
                 $scope.rowSelectLocked=false;
                 };

                 $scope.items = [
                 { name: "detail",             icon: "mode_edit"    ,size:"24", style:"fill:lightgreen",  action:"$scope.itemEdit()"},
                 { name: "zip and download",   icon: "file_download",size:"24", style:"fill:wheat"       ,action:"$scope.zipDownload()"}
                 ];
                 */

                // Get session list and error
                var renderSessions = function (data) {
                    $scope.loading=false;
                    if (data.items) {

                        $scope.sessions = data.items;
                        $rootScope.sessionList=$scope.sessions;
                        $scope.gridOptions.data = $scope.sessions;
                    }
                    else{
                        $mdDialog.show(
                            $mdDialog.alert()
                                .title('Failure')
                                .content("My sessions list is empty. Please add some first")
                                .ok('OK')
                                .escapeToClose(false)
                                .clickOutsideToClose(false)

                        ).then(
                            function(){
                                //$state.go('mode-create');
                            },
                            function(){
                                //$state.go('session-list');
                            });
                    }
                };
                var renderSessionsError = function (data) {
                    /*
                     var data={};
                     data.status=500;
                     data.data={};
                     data.data.error="Test error..Something wrong on the server.";
                     */
                    if(data.status==400){
                        $scope.SessionError=data.message
                    }
                    else if(data.status==500){
                        $scope.findSessionError=data.data.error
                        $rootScope.errorMessage = data.data.error;
                        //$state.go('error-state');
                    }
                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('Failure')
                            .content($scope.findSessionError)
                            .ok('OK')
                            .escapeToClose(false)
                            .clickOutsideToClose(false)

                    ).then(
                        function(){
                            $scope.loading=false;
                            //$state.go('session-list');
                        },
                        function(){
                            $scope.loading=false;
                            //$state.go('session-list');
                        });
                }

                //Initial load and refresh
                if(!$rootScope.sessionList){
                    sessionListResource.workbox.get().$promise.then(renderSessions, renderSessionsError);
                }else{
                    $scope.loading=false;
                    $scope.sessions=$rootScope.sessionList;
                    $scope.gridOptions.data = $scope.sessions;
                }

                //var getWorkboxList = sessionListResource.workbox.get();
                //getWorkboxList.$promise.then(renderSessions, renderSessionsError);


                $scope.refresh_session_list= function(){
                    $scope.loading=true;
                    sessionListResource.workbox.get().$promise.then(renderSessions, renderSessionsError);
                }

                //Search
                $scope.$on('SEARCH.session-list', function(evt, keywords) {
                    $scope.search(keywords);
                });
                $scope.search =function(searchKeywords){
                    var keywords=searchKeywords.replace(/,/g,' ').replace(/\s+/g,' ').trim();
                    var KeywordsArray=keywords.split(' ');
                    $scope.filteredStores = $scope.sessions;
                    KeywordsArray.forEach(function(keyword) {
                        $scope.filteredStores = $filter('filter')($scope.filteredStores, keyword);
                    });
                    $scope.gridOptions.data = $scope.filteredStores;
                }
            }
        ])
});