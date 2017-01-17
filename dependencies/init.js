const remote = require('electron').remote;
const dialog = remote.dialog;
const app = remote.app;
const browserWindow = remote.BrowserWindow;
const fs = require('fs');
const os = require('os');

//All Aurora.js libraries
const AV = require('av');
    require('mp3');
    require('flac.js');
    require('alac');
    require('aac');
    require('ogg.js');
var userOS = os.platform();
console.log('Client OS = ' + userOS);

var directory;
var songs;