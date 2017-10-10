//Goal: Create a new tab, in that tab load the visuliser, this visualiser must then attach to the currently playing song and visualise the song. 
'use strict';
import MusicPlayer from './MusicPlayer';
import {remote} from 'electron';

var BrowserWindow = remote.BrowserWindow;

var visWin = new BrowserWindow({
    width: 1024,
    height: 720,
    transparent: true,
    frame: false
});

visWin.webContents.loadURL('https://paoda.bitbucket.io/js-visualiser');

