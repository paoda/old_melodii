'use strict';
import './js/react.js'; //Runs the React Code
//Test Code
import MusicPlayer from './js/melodii/MusicPlayer';
import Song from './js/melodii/Song';
import Settings from './js/melodii/Settings';

var settings = new Settings();
settings.wait((general) => {

    if (general.songs.filepaths.length > 0) {
        var song = new Song(general.songs.filepaths[0].list[~~(Math.random() * general.songs.filepaths[0].list.length)], true);
        
        if (song.location) {
            var musicPlayer = new MusicPlayer();
            musicPlayer.setVolume(1);
            musicPlayer.load(song);
            musicPlayer.play();
        }
    }
});

/*window.setTimeout(() => {
    otherPlayer.pause();
    console.log('Music Paused');
}, 30000);*/