'use strict';
import './js/react.js'; //Runs the React Code

//Test Code
import MusicPlayer from './js/melodii/MusicPlayer';
import Song from './js/melodii/Song';
import Settings from './js/melodii/Settings';

var settings = new Settings();
settings.wait((general) => {
    var song = new Song(general.songs.list[652]);
    var musicPlayer = new MusicPlayer();
    musicPlayer.load(song.location);
    musicPlayer.play();
});

var otherPlayer = new MusicPlayer();

/*window.setTimeout(() => {
    otherPlayer.pause();
    console.log('Music Paused');
}, 30000);*/