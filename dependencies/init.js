const remote = require('electron').remote;
const dialog = remote.dialog;
const app = remote.app;
const browserWindow = remote.BrowserWindow;
const fs = require('fs');
const os = require('os');
const mm = require('musicmetadata');

var userOS = os.platform();
console.log('Client OS = ' + userOS);

//Make Media Function
var musicPlayer = new Audio();
var playlist = require('./playlist.json'); //locaiton of Playlist.

var directory; //Contains user specified directory
var songs; //Used for Array of every song in directory.
var fixedSongs = []; //Used to hold an updated array of songs where "\" is replaced with 
var pause = false; //This controls the toggle for play and pause in mediaControls.js
const fileCheck = /^.*\.(flac|mp4|mp3|m4a|aac|wav|ogg)$/gi; //Regular expression for checking filetypes.

//Assigning Variables to Elements

    //windowControl.js
var quit = document.getElementById('close');
var minimize = document.getElementById('minimize');

    //mediaControls.js
var backward = document.getElementById('backward');
var toggle = document.getElementById('toggle');
var mediaControls = document.getElementById('mediaControls');
var forward = document.getElementById('forward');
var volDown = document.getElementById('volDown');
var volUp = document.getElementById('volUp');
var volRange = document.getElementById('volRange');
var toggleIcon = document.getElementById('toggleIcon');

    //TableGen.js
var table = document.getElementById('songTable');

    //musicDirectory.js
var dirBtn = document.getElementById('dirBtn');

