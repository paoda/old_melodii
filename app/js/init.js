const remote = require('electron').remote;
const dialog = remote.dialog;
const app = remote.app;
const browserWindow = remote.BrowserWindow;
const fs = require('fs');
const os = require('os');
const mm = require('musicmetadata');

var userOS = os.platform();
console.log('Client OS = ' + userOS);

var songs;

var dirBtn = document.getElementById('dirBtn');