const remote = require('electron').remote;
const dialog = remote.dialog;
const app = remote.app;
const browserWindow = remote.BrowserWindow;
const fs = require('fs');
const os = require('os');
const mm = require('musicmetadata');
const ee = require('events');

//EventEmitter stuffs
class eventClass extends ee {};
const eventEmitter = new eventClass();

//User Operating Sustem stuffs
var userOS = os.platform();
console.log('Client OS = ' + userOS);

var musicPlayer = new Audio(); //Audio musicPlayer

var songs; //variable that holds user decided songs
var directory; //User defined directory;


//All assignments of HTML tags to variables
var dirBtn = document.getElementById('dirBtn');  //Button that opens Dialog Box
var quit = document.getElementById('quit'); //Button that quits melodii
var minimize = document.getElementById('minimize'); //Button that minimizes melodii
var volRange = document.getElementById('volRange'); //Range that handles music Volume
var forward = document.getElementById('forward'); //Button that calls melodii.volUp();
var backward = document.getElementById('backward');
var volDown = document.getElementById('volDown');
var volUp = document.getElementById('volUp');


//var forward = document.getElementById('forward');

//var toggleIcon = document.getElementById('toggleIcon');
