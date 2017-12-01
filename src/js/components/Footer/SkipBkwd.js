'use strict';
import React from 'react';
import MusicPlayer from '../../melodii/MusicPlayer';

var mp = new MusicPlayer();
export default class SkipBkwd extends React.Component {
    handleClick(e) {
        if (mp.currentTime() < 5) {
            //Go Back a song
            let previousSongs = mp.getPreviousSongs();
            let currentSong = mp.getLoadedSong();

            let index;
            let pos = previousSongs.indexOf(currentSong);

            if (pos === -1) {
                //Song doesn't exist.
                index = previousSongs.length - 1;
            } else if (pos ===  0) index = 0;
            else index = pos -1;
            
            previousSongs[index].applyAlbumArt()
            mp.load(previousSongs[index]);
            mp.play();
        } else mp.seek(0);
    }
    render() {
        return (
            <i className='fa fa-step-backward' id='SkipBkwd' onClick={this.handleClick.bind(this)}></i>
        )
    }
}
