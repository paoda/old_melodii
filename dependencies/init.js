const remote = require('electron').remote;
const dialog = remote.dialog;
const app = remote.app;
const browserWindow = remote.BrowserWindow;
const fs = require('fs');
const os = require('os');

//All Aurora.js libraries

var userOS = os.platform();
console.log('Client OS = ' + userOS);

var directory;
var songs;