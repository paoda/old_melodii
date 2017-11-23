'use strict';
import './js/react.js'; //Runs the React Code

//Test Code
import MusicPlayer from './js/melodii/MusicPlayer';
import Song from './js/melodii/Song';
import Settings from './js/melodii/Settings';
import Playlist from './js/melodii/Playlist';
var settings = new Settings();
settings.wait((general) => {

    if (general.songs.filepaths.length > 0) {
        var song;
        Playlist.getRandomFromAll((res) => {
            if (res.location) {
                var musicPlayer = new MusicPlayer();
                musicPlayer.setVolume(1);
                musicPlayer.load(res);
                musicPlayer.play();
    
                musicPlayer.audioElement.onended = () => {
                    Playlist.getRandomFromAll((res) => {
                        musicPlayer.load(res);
                        musicPlayer.play();
                    });
                };
            }
        });
    }
});

/*window.setTimeout(() => {
    otherPlayer.pause();
    console.log('Music Paused');
}, 30000);*/