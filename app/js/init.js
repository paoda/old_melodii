'use strict';

let Global = {};

 Global.remote = require('electron').remote;
Global.dialog = Global.remote.dialog;
Global.app = Global.remote.app;
Global.browserWindow = Global.remote.BrowserWindow;
Global.fs = require('fs');
Global.os = require('os');
Global.mm = require('music-metadata');
Global.ee = require('events');

//EventEmitter stuffs
class eventClass extends Global.ee {}
Global.eventEmitter = new eventClass();
//eventEmitter.setMaxListeners(0);

console.log('Client OS = ' + Global.os.platform());

Global.musicPlayer = new Audio(); //Audio musicPlayer

Global.songs = null; //variable that holds user decided songs
Global.directory = null; //User defined directory;


//All assignments of HTML tags to variables
Global.dirBtn = document.getElementById('dirBtn'); //Button that opens Dialog Box
Global.quit = document.getElementById('quit'); //Button that quits melodii
Global.minimize = document.getElementById('minimize'); //Button that minimizes melodii
Global.volRange = document.getElementById('volRange'); //Range that handles music Volume
Global.forward = document.getElementById('forward'); //Button that calls melodiiCNTRL.next();
Global.backward = document.getElementById('backward'); //Button that calls melodiiCNTRL.previous();
//Global.volDown = document.getElementById('volDown'); //Button that calls melodiiCNTRL.volDown();
//Global.volUp = document.getElementById('volUp'); //Button that calss melodiiCNTRL.volUp();
Global.muteToggle = document.getElementById('muteToggle'); //Toggle for Mute and unmute
Global.muteIcon = document.getElementById('muteIcon'); //Icon for mute & unmute
Global.toggle = document.getElementById('toggle'); //Element which holds toggleIcon. 
Global.toggleIcon = document.getElementById('toggleIcon'); //Icon for mute & unmute
Global.seekRange = document.getElementById('seekRange'); //Seekbar
Global.songInfo = document.getElementById('songInfo'); //Gets div responsible for showing Song Information