var app = require('app');
var BrowserWindow = require('browser-window');
var url = require('url');
var path = require('path');

var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit();
});

app.on('ready', function () {

    mainWindow = new BrowserWindow({
        "title": "LabShare Shell",
        "width": 773,
        "height": 625,
        "min-width": 773,
        "min-height": 625,
        "resizable": true,
        "position": "center",
        "use-content-size": true
    });

    mainWindow.loadUrl(url.format({
        protocol: 'file',
        pathname: path.resolve(__dirname, '..', 'ui', 'index.html'),
        slashes: true
    }));
    mainWindow.focus();
});