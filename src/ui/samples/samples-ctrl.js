/**
 * Created by weaamalgheraibi on 4/17/15.
 */
define(['./module'] , function(module) {
    return module.controller('OSCTR.samplesController', ['$state','$rootScope','$scope', '$timeout', '$q', '$mdSidenav', '$log', '$mdDialog', '$mdToast', '$animate', function ($state, $rootScope, $scope, $timeout, $q, $mdSidenav, $log, $mdDialog, $mdToast, $animate) {
        var self = this;
        // list of `state` value/display objects
        self.states = loadAll();
        self.selectedItem = null;
        self.searchText = null;
        self.querySearch = querySearch;
        self.padNumber = function(number, length){
            var str = '' + number;
            while (str.length < length) {
                str = '0' + str;
            }
            return str
        };
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */

//add a $rootScope
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
                profile1, profile2
            ];


        };

        function querySearch(query) {
            var results = query ? self.states.filter(createFilterFor(query)) : [];
            return results;
        }

        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
            var stepType = 'Age-related macular degeneration (AMD) - advanced (geographic atrophy), Age-related macular degeneration (AMD) - intermediate, Age-related macular degeneration (AMD) - early, ' +
            'Age-related macular degeneration (AMD) - choroidal neovascularization (CNV), late-onset retinal degeneration (L-ORD), Best vitelliform macular dystrophy (BestDisease), ' +
            'Stargardt\'s disease (STGD), Albinism (ALBINO), Coloboma (CM), Microphthalmia (MAA), Anophthalmia (ANOP)';


            return stepType.split(/, +/g).map(function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }
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
            diseaseType: "",
            eye: "",
            eye2: "",
            age: "",
            gender: "",
            ethnicity: "",
            diseaseCode: "",
            lefteye: [],
            righteye: [],
            botheye: [],
            comment: ""
        }



        $scope.addItem = function (ev) {
            if ($scope.profile.diseaseType == "Unilateral") {
                if ($scope.profile.eye == "Right") {
                    if ($scope.profile.righteye.length >= 1) {
                        if (!($scope.profile.righteye.indexOf(self.selectedItem.display) > -1)) {
                            var confirm = $mdDialog.confirm()
                                .title(' Add another disease')
                                .content('Are you sure you want to add another disease?')
                                .ariaLabel('Lucky day')
                                .ok('Please add!')
                                .cancel('Cancel')
                                .targetEvent(ev);
                            $mdDialog.show(confirm).then(function () {
                                $scope.profile.righteye.push(self.selectedItem.display)
                            });
                        }
                        else {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .title('This disease is already added')
                                    .content('You can not add the same disease twice')
                                    .ok('Got it!')
                                    .targetEvent(ev)
                            );
                        }
                        ;
                    }
                    if ($scope.profile.righteye.length < 1) {
                        $scope.profile.righteye.push(self.selectedItem.display)
                    }
                    $scope.profile.lefteye = []
                    $scope.profile.lefteye.pop($scope.profile.lefteye)

                }
                else if ($scope.profile.eye == "Left") {

                    if ($scope.profile.lefteye.length >= 1) {
                        if (!($scope.profile.lefteye.indexOf(self.selectedItem.display) > -1)) {
                            var confirm = $mdDialog.confirm()
                                .title(' Add another disease')
                                .content('Are you sure you want to add another disease?')
                                .ariaLabel('Lucky day')
                                .ok('Please add!')
                                .cancel('Cancel')
                                .targetEvent(ev);
                            $mdDialog.show(confirm).then(function () {
                                $scope.profile.lefteye.push(self.selectedItem.display)
                            });
                        }
                        else {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .title('This disease is already added')
                                    .content('You can not add the same disease twice')
                                    .ok('Got it!')
                                    .targetEvent(ev)
                            );
                        }
                        ;
                    }
                    if ($scope.profile.lefteye.length < 1) {
                        $scope.profile.lefteye.push(self.selectedItem.display)
                    }
                    $scope.profile.righteye = []
                    $scope.profile.righteye.pop($scope.profile.righteye)
                }
                else {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('Affected Area')
                            .content('please choose the affected area')
                            .ok('OK!')
                            .targetEvent(ev)
                    );
                }

            }


            if ($scope.profile.diseaseType == "Bilateral") {

                if ($scope.profile.eye == "Both") {


                    if ($scope.profile.botheye.length >= 1) {
                        if (!($scope.profile.botheye.indexOf(self.selectedItem.display) > -1)) {
                            var confirm = $mdDialog.confirm()
                                .title(' Add another disease')
                                .content('Are you sure you want to add another disease?')
                                .ariaLabel('Lucky day')
                                .ok('Please add!')
                                .cancel('Cancel')
                                .targetEvent(ev);
                            $mdDialog.show(confirm).then(function () {
                                $scope.profile.botheye.push(self.selectedItem.display)
                            });
                        }
                        else {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .title('This disease is already added')
                                    .content('You can not add the same disease twice')
                                    .ok('Got it!')
                                    .targetEvent(ev)
                            );
                        }
                        ;
                    }
                    if ($scope.profile.botheye.length < 1) {
                        $scope.profile.botheye.push(self.selectedItem.display)
                    }

                    $scope.profile.righteye = []
                    $scope.profile.righteye.pop($scope.profile.righteye)

                    $scope.profile.lefteye = []
                    $scope.profile.lefteye.pop($scope.profile.lefteye)

                }


                else if ($scope.profile.eye == "Right") {

                    if ($scope.profile.lefteye.indexOf(self.selectedItem.display) > -1) {
                        var confirm = $mdDialog.confirm()
                            .title(' Both Eyes have the same disease')
                            .content('do you want to add the disease for both eyes?')
                            .ok('Please add!')
                            .cancel('Cancel')
                            .targetEvent(ev);
                        $mdDialog.show(confirm).then(function () {
                            $scope.profile.eye = "Both";
                            $scope.profile.righteye = [];
                            $scope.profile.righteye.pop($scope.profile.righteye);
                            $scope.profile.lefteye = [];
                            $scope.profile.lefteye.pop($scope.profile.lefteye);
                            $scope.profile.botheye.push(self.selectedItem.display);
                        });

                    }

                    else {
                        if ($scope.profile.righteye.length >= 1) {

                            if (!($scope.profile.righteye.indexOf(self.selectedItem.display) > -1)) {
                                var confirm = $mdDialog.confirm()
                                    .title(' Add another disease')
                                    .content('Are you sure you want to add another disease?')
                                    .ariaLabel('Lucky day')
                                    .ok('Please add!')
                                    .cancel('Cancel')
                                    .targetEvent(ev);
                                $mdDialog.show(confirm).then(function () {
                                    $scope.profile.righteye.push(self.selectedItem.display)

                                });
                            }
                            else {
                                $mdDialog.show(
                                    $mdDialog.alert()
                                        .title('This disease is already added')
                                        .content('You can not add the same disease twice')
                                        .ok('Got it!')
                                        .targetEvent(ev)
                                );
                            }
                        }
                         else if ($scope.profile.righteye.length < 1) {

                                $scope.profile.righteye.push(self.selectedItem.display)
                                $scope.profile.botheye = []
                                $scope.profile.botheye.pop($scope.profile.botheye)
                                if ($scope.profile.lefteye.length >= 1) {
                                    $scope.profile.eye = "Right";
                                    $scope.profile.eye2 = "Left";
                                }
                            }
                    }
                }


                else if ($scope.profile.eye == "Left") {

                    if ($scope.profile.righteye.indexOf(self.selectedItem.display) > -1) {
                        var confirm = $mdDialog.confirm()
                            .title(' Both Eyes have the same disease')
                            .content('do you want to add the disease for both eyes?')
                            .ok('Please add!')
                            .cancel('Cancel')
                            .targetEvent(ev);
                        $mdDialog.show(confirm).then(function () {
                            $scope.profile.eye = "Both";
                            $scope.profile.righteye = [];
                            $scope.profile.righteye.pop($scope.profile.righteye);
                            $scope.profile.lefteye = [];
                            $scope.profile.lefteye.pop($scope.profile.lefteye);
                            $scope.profile.botheye.push(self.selectedItem.display);
                        });

                    }

                   else
                    {
                        if ($scope.profile.lefteye.length >= 1) {
                            if (!($scope.profile.lefteye.indexOf(self.selectedItem.display) > -1)) {
                                var confirm = $mdDialog.confirm()
                                    .title(' Add another disease')
                                    .content('Are you sure you want to add another disease?')
                                    .ariaLabel('Lucky day')
                                    .ok('Please add!')
                                    .cancel('Cancel')
                                    .targetEvent(ev);
                                $mdDialog.show(confirm).then(function () {
                                    $scope.profile.lefteye.push(self.selectedItem.display)
                                });
                            }
                            else {
                                $mdDialog.show(
                                    $mdDialog.alert()
                                        .title('This disease is already added')
                                        .content('You can not add the same disease twice')
                                        .ok('Got it!')
                                        .targetEvent(ev)
                                );
                            }
                            ;
                        }
                        else if ($scope.profile.lefteye.length < 1) {
                            $scope.profile.lefteye.push(self.selectedItem.display)
                            $scope.profile.botheye = []
                            $scope.profile.botheye.pop($scope.profile.botheye)
                            if($scope.profile.righteye.length>=1)
                            {
                                $scope.profile.eye = "Right";
                                $scope.profile.eye2 = "Left";
                            }
                        }

                    }

                }

                else {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('Affected Area')
                            .content('please choose the affected area')
                            .ok('OK!')
                            .targetEvent(ev)
                    );
                }
            }
        };

        $scope.cleanSelection = function () {
            $scope.profile.lefteye = [];
            $scope.profile.righteye = [];
            $scope.profile.botheye = [];
        }

        $scope.showConfirm = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title(' Add another disease')
                .content('Are you sure you want to add another disease?')
                .ariaLabel('Lucky day')
                .ok('Please add!')
                .cancel('Cancel')
                .targetEvent(ev);
            $mdDialog.show(confirm).then(function () {
                $scope.alert = 'You decided to get rid of your debt.';
            }, function () {
                $scope.alert = 'You decided to keep your debt.';
            });
        };

      $scope.submit = function (ev) {

            if ($scope.profile.diseaseType != "" && $scope.profile.gender != "" && $scope.profile.ethnicity != "" && $scope.profile.eye != ""
                && $scope.profile.age != null && ($scope.profile.lefteye.length >= 1 || $scope.profile.righteye.length >= 1 || $scope.profile.botheye.length >= 1 )) {

                if($scope.profile.diseaseType == "Bilateral" && $scope.profile.eye != "Both" && $scope.profile.eye2 == "" )
                {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('Error ')
                            .content('Please make sure to add both disease in both eyes as you selected Bilateral')
                            .ok('OK!')
                            .targetEvent(ev))
                }
                else {
                 var dAbbrev;
                    if ($scope.profile.diseaseType == "Unilateral")
                    {
                        if ($scope.profile.eye =="Left")
                        {

                            dAbbrev = /\(.*?\)/.exec($scope.profile.lefteye)[0].slice(1, -1);
                        }
                        else
                            dAbbrev = /\(.*?\)/.exec($scope.profile.righteye)[0].slice(1, -1);
                    }

                    else
                    {
                        if ($scope.profile.eye =="Both")
                        {

                            dAbbrev = /\(.*?\)/.exec($scope.profile.botheye)[0].slice(1, -1);
                        }
                        else
                            dAbbrev = /\(.*?\)/.exec($scope.profile.lefteye)[0].slice(1, -1);
                    }

                    dAbbrev = dAbbrev + "" + self.padNumber($rootScope.SampleList.length+1, 5);

                    $scope.profile.diseaseCode= dAbbrev;
                    $rootScope.SampleList.push($scope.profile);
                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('Successful Submission')
                            .content('Your submission was successful')
                            .ok('OK!')
                            .targetEvent(ev)).then(
                        function () {
                            $state.go('OSCTR-samplelookup');
                        },
                        function () {
                            $state.go('home');
                        }
                    );
                }
            }

            else {
                if ($scope.profile.diseaseType != "" && $scope.profile.gender != "" && $scope.profile.ethnicity != "" && $scope.profile.eye != ""
                    && $scope.profile.age == null && ($scope.profile.lefteye.length >= 1 || $scope.profile.righteye.length >= 1 || $scope.profile.botheye.length >= 1 )) {
                    if (typeof $scope.profile.age != "undefined") {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .title('Error ')
                                .content('Please make sure you enter the age')
                                .ok('OK!')
                                .targetEvent(ev))
                    }
                }
                else {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('Error')
                            .content('Please make sure you fill all the required fields')
                            .ok('OK!')
                            .targetEvent(ev));

                }
            }
        };
        $scope.onSelect = function(e) {
            var message = $.map(e.files, function (file) {
                return file.name;
            })
        }
        }])
        });