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
            artist: 'Artist',
            title: 'Title',
            album: 'Album Name'
        };
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.check(), 1000/refreshRate);
    }
    check() {
        let loadedSong = mp.getLoadedSong();

        //TODO: Truncate based on widest character width (Japanese Characters for now?)
        try {
            this.setState({
                artist: loadedSong.metadata.common.artist,
                title: loadedSong.metadata.common.title,
                album: loadedSong.metadata.common.album
            });
        } catch (e) {
            console.warn('Song Information not found (possibly waiting for async process)');
        }
        
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        return (
            <span>{this.state.title} - {this.state.artist} | {this.state.album}</span>
        )
    }
}
