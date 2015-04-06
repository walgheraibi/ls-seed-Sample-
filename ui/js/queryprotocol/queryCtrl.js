/**
 * Created by NhatDoan on 3/26/15.
 */
define(['angular'], function (angular) {
    'use strict';
    angular
        .module('autocompletequery', ['ngMaterial'])
        .controller('DemoCtrl', DemoCtrl);
    function DemoCtrl ($timeout, $q) {
        var self = this;
        // list of `state` value/display objects
        self.protocols        = loadAll();
        self.selectedItem  = null;
        self.searchText    = null;
        self.querySearch   = querySearch;
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch (query) {
            var results = query ? self.protocols.filter( createFilterFor(query) ) : [];
            return results;
        }
        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
            var protocol = 'Protocol1, Hedwig, Assay, Protocol2, SampleProtocol, Test, H1N1, Blah, Automation,\
             NhatProtocol, MaiProtocol, ZoyaProtocol, SuhasProtocol, Tim Protocol\
                ';
            return protocol.split(/, +/g).map( function (state) {
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
    }
});