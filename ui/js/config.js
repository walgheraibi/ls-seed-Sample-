define(['angular'], function(ng){
    'use strict';
    ng.module('app.config', [])
        .config(function($mdThemingProvider, $mdIconProvider){
            $mdIconProvider
                .defaultIconSet("./ui/assets/svg/avatars.svg", 128)
                .icon("search"     , "./ui/assets/svg/search.svg"      , 24)
                .icon("notifications" , "./ui/assets/svg/notifications.svg", 24)
                .icon("more"       , "./ui/assets/svg/more.svg"        , 24)
                .icon("menu"       , "./ui/assets/svg/menu.svg"        , 24)
                .icon("share"      , "./ui/assets/svg/share.svg"       , 24)
                .icon("google_plus", "./ui/assets/svg/google_plus.svg" , 512)
                .icon("hangouts"   , "./ui/assets/svg/hangouts.svg"    , 512)
                .icon("twitter"    , "./ui/assets/svg/twitter.svg"     , 512)
                .icon("phone"      , "./ui/assets/svg/phone.svg"       , 512);
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('red');

        });

})