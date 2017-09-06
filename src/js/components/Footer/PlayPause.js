'use strict';
import React from 'react';
import MusicPlayer from '../../melodii/MusicPlayer';
import 'font-awesome/css/font-awesome.min.css';

var musicPlayer = new MusicPlayer();

export default class PlayPause extends React.Component {
    constructor() {
        super();
        this.state = { className: 'fa fa-pause' };
    }
    render() {
        return (
            <i className={this.state.className} id='playPause' onClick={this.toggle.bind(this)}></i>
        )
    }
    toggle(e) {
        let currentState= this.state.className;
        if (currentState == 'fa fa-play') this.setState({className: 'fa fa-pause'});
        else if (currentState == 'fa fa-pause') this.setState({className: 'fa fa-play'});
        else console.error('\'' + currentState + '\'' + ' doesn\'t match \'fa fa-play\' or \'fa fa-pause\'');

        if (this.state.className == 'fa fa-pause') {
            musicPlayer.pause();
        } else {
            musicPlayer.play();
        }
    }

}
