/**
 * Created by james on 4/7/15.
 */
define(['./app'], function(app) {
    'use strict';
    app.value('shell-header', {
        active: true,
        leftMenuActive: true,
        rightMenuActive: true,
        logo: 'images/labshare-heading.png',
        title: 'Labshare'
    });
});