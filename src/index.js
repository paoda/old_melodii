'use strict';
import './js/react.js'; //Runs the React Code
//Test Code
import MusicPlayer from './js/melodii/MusicPlayer';
import Song from './js/melodii/Song';
import Settings from './js/melodii/Settings';

var settings = new Settings();
settings.wait((general) => {
    var song = new Song(general.songs.list[~~(Math.random() * general.songs.list.length)], true);
    var musicPlayer = new MusicPlayer();
    musicPlayer.audioElement.volume = 1;
    musicPlayer.load(song);
    musicPlayer.play();

    let test = new Song(general.songs.list[~~(Math.random() * general.songs.list.length)], false);
    let otherPlayer = new MusicPlayer();
    console.log(otherPlayer.audioElement.currentSong);
});

/*window.setTimeout(() => {
    otherPlayer.pause();
    console.log('Music Paused');
}, 30000);*/