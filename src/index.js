'use strict';
import './js/react.js'; //Runs the React Code
import MusicPlayer from './js/melodii/MusicPlayer';

var musicPlayer = new MusicPlayer();

musicPlayer.load('http://openings.moe/video/Opening1-AmagiBrilliantPark.webm');
musicPlayer.play();

var otherPlayer = new MusicPlayer();

window.setTimeout(() => {
    otherPlayer.pause();
    console.log('Music Paused');
}, 30000);