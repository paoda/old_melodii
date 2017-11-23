'use strict';
import React from 'react';
import Song from '../../melodii/Song';
import MusicPlayer from '../../melodii/MusicPlayer';
const refreshRate = 30; //fps


var mp = new MusicPlayer();
export default class SongInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: ' ',
            title: ' ',
            album: ' '
        };
    }
    componentDidMount() {
        this.timerID = setInterval(this.check, 1000/refreshRate);
    }
    check() {
        let loadedSong = mp.getLoadedSong();

        console.log(loadedSong);
        this.setState = {
            artist: loadedSong.metadata.common.artist,
            title: loadedSong.metadata.common.title,
            album: loadedSong.metadata.common.album
        };
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        return (
            <div>{this.state.title} - {this.state.artist} | {this.state.album}</div>
        )
    }
}
