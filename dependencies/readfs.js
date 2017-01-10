var fsw = require('fs-web');
var path = require('path');
var directoryList = new Array();

function pleaseWork() {
    directoryList = fsw.readdir(directory);
}