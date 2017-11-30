'use strict';
import React from 'react';
import MusicPlayer from '../../melodii/MusicPlayer';

var mp = new MusicPlayer();

export default class VolBar extends React.Component {
    constructor() {
        super();
        this.state = {input:250, max: 250};

        this.setVolume = this.setVolume.bind(this);
    }
    render() {
        return (
            <input style={{backgroundSize: this.state.input * 100 / this.state.max + '% 100%'}} value={this.state.input} id='volBar' type='range' max={this.state.max} onChange={this.setVolume} />
        )
    }
    setVolume(e) {
        mp.setVolume((e.target.value / 250));
        this.setState({
            input: e.target.value,
        });
        this.forceUpdate();
    }
}
