/**
 * Created by james on 4/2/15.
 */
define(['../app','angular-material'], function(app) {
    "use strict";
   app.config(['$mdThemingProvider', function($mdThemingProvider) {
       $mdThemingProvider.theme('default')
           .primaryPalette('grey').dark();
   }]);
});