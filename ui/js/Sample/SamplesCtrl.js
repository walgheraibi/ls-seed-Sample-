/**
 * Created by weaamalgheraibi on 3/31/15.
 */
define(['angular'], (function () {
    'use strict';
    angular
        .module('samplesApp', ['ngMaterial'])
        .controller('SamplesCtrl', function  ($timeout, $q, $scope,  $mdSidenav, $log, $mdDialog, $mdToast, $animate) {
            var self = this;
            // list of `state` value/display objects
            self.states = loadAll();
            self.selectedItem = null;
            self.searchText = null;
            self.querySearch = querySearch;
            // ******************************
            // Internal methods
            // ******************************
            /**
             * Search for states... use $timeout to simulate
             * remote dataservice call.
             */
                $scope.toggleLeft = function() {
                    $mdSidenav('left').toggle()
                        .then(function(){
                            $log.debug("toggle left is done");
                        });
                };
                $scope.toggleRight = function() {
                    $mdSidenav('right').toggle()
                        .then(function(){
                            $log.debug("toggle RIGHT is done");
                        });
                };

            function querySearch(query) {
                var results = query ? self.states.filter(createFilterFor(query)) : [];
                return results;
            }

            /**
             * Build `states` list of key/value pairs
             */
            function loadAll() {
                var stepType = 'Wet AMD, artery occlusion, OU, ' +
                    'intermediate , large drusen, pigment change,  large drusen , 20/20 vision,  neovascularization, ' +
                    'Dry AMD , CNV , GA';
                return stepType.split(/, +/g).map(function (state) {
                    return {
                        value: state.toLowerCase(),
                        display: state
                    };
                });
            }
            $scope.showElement = function(value) {
                $scope.hide = true;

            };
            /**
             * Create filter function for a query string
             */
            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(state) {
                    return (state.value.indexOf(lowercaseQuery) === 0);
                };
            }
                    $scope.profile = {
                        diseaseType: "Unilateral",
                        age: "",
                        gender: "",
                        ethnicity: "",
                        diseaseCode: "",
                        lefteye: [],
                        righteye: [],
                        botheye: [],
                        comment: ""
                    }
                    var firstLeftAdd = true
                    var firstRightAdd = true
                    var firstAdd = true

            $scope.addItem = function () {

                if ($scope.eye == "Right") {
                    if (!($scope.profile.righteye.indexOf(self.selectedItem.display) > -1)) {
                        $scope.profile.righteye.push(self.selectedItem.display)
                    }
                   /*if($scope.profile.righteye.length>0)
                    $mdToast.show({
                        controller: 'ToastCtrl',
                        templateUrl: 'toast-template.html',
                        hideDelay: 6000
                    });*/
                }
                else if($scope.eye == "Left")
                {
                if (!($scope.profile.lefteye.indexOf(self.selectedItem.display) > -1)) {
                    $scope.profile.lefteye.push(self.selectedItem.display)
                }
            }
                else if($scope.eye == "Both")
                {
                    if (!($scope.profile.botheye.indexOf(self.selectedItem.display) > -1)) {
                        $scope.profile.botheye.push(self.selectedItem.display)
                    }
                }

            }


                 /*   $scope.addLeftEye = function() {
                        if ($scope.symptom.length > 0 && firstLeftAdd) {
                            firstLeftAdd = false
                            $scope.profile.lefteye.push("Lift eye:")
                        }
                        for (var i = 0; i < $scope.symptom.length; i++) {
                            $scope.profile.lefteye.push($scope.symptom[i])
                        }
                    }
                    $scope.addRightEye = function(){
                        if($scope.symptom.length>0 && firstRightAdd)
                        {
                            firstRightAdd = false
                            $scope.profile.righteye.push("Right eye:")
                        }
                        for (var i = 0; i < $scope.symptom.length; i++) {
                            $scope.profile.righteye.push($scope.symptom[i])
                        }
                    }
                    $scope.addBothEye = function(){
                        if($scope.symptom.length>0 && firstAdd)
                        {
                            firstAdd = false
                            $scope.profile.botheye.push("Billateral eye:")
                        }
                        for (var i = 0; i < $scope.symptom.length; i++) {
                            $scope.profile.botheye.push($scope.symptom[i])
                        }
                    }
                    */
                    $scope.cleanSelection = function(){
                        $scope.profile.lefteye = [];
                        $scope.profile.righteye = [];
                        $scope.profile.botheye = [];
                    }
  }).controller('ToastCtrl', function($scope, $mdToast) {
            $scope.closeToast = function() {
                $mdToast.hide();
            };
        }).controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
            $scope.close = function() {
                $mdSidenav('left').close()
                    .then(function(){
                        $log.debug("close LEFT is done");
                    });
            };
        }).controller('medCtrl', function($scope, $timeout, $mdSidenav, $log) {
            $scope.close = function() {
                $mdSidenav('left').close()
                    .then(function(){
                        $log.debug("close LEFT is done");
                    });
            };
        })
        .controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
            $scope.close = function() {
                $mdSidenav('right').close()
                    .then(function(){
                        $log.debug("close RIGHT is done");
                    });
            };
        });
}));