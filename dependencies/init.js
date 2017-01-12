const remote = require('electron').remote;
const dialog = remote.dialog;
const app = remote.app;
const browserWindow = remote.BrowserWindow;
const fs = require('fs');
const process = require('os');

//All Aurora.js libraries
const av = require('aurora.js/aurora.js');
    require('aurora.js/aac.js');
    require('aurora.js/alac.js');
    require('aurora.js/flac.js');
    require('aurora.js/mp3.js');
    
var userOS = process.platform();
console.log('Client OS = ' + userOS);

var directory;