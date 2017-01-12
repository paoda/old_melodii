const remote = require('electron').remote;
const dialog = remote.dialog;
const app = remote.app;
const browserWindow = remote.BrowserWindow;
const fs = require('fs');
const process = require('os');

//All Aurora.js libraries
const av = require('av');
    require('flac.js');
    require('alac.js');
    require('mp3.js');
    require('aac.js');

var userOS = process.platform();
console.log('Client OS = ' + userOS);

var directory;