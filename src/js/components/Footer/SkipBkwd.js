'use strict';
import React from 'react';
import MusicPlayer from '../../melodii/MusicPlayer';

var mp = new MusicPlayer();
var index;
export default class SkipBkwd extends React.Component {
    handleClick(e) {
        if (mp.currentTime() < 5) {
            //Go Back a song
            let previousSongs = mp.getPreviousSongs();
            index = previousSongs.length - 1;
            console.log(previousSongs);
            mp.load(previousSongs[index]);
            mp.play();
            index--;
        } else mp.seek(0);
    }
    render() {
        return (
            <i className='fa fa-step-backward' id='SkipBkwd' onClick={this.handleClick.bind(this)}></i>
        )
    }
}
