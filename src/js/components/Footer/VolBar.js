'use strict';
import React from 'react';
import MusicPlayer from '../../melodii/MusicPlayer';
import Settings from '../../melodii/Settings';

var settings = new Settings();

var mp = new MusicPlayer();

export default class VolBar extends React.Component {
    constructor() {
        super();
        this.setVolume = this.setVolume.bind(this);
        this.saveDefaultVolume = this.saveDefaultVolume.bind(this);
        this.state = {input: 0, max: 50};
        settings.wait((general) => {
            console.log('Volume Loaded: ' + general.volume);
            this.setState({input: general.volume});
        });
    }
    render() {
        return (
            <input style={{backgroundSize: this.state.input * 100 / this.state.max + '% 100%'}} value={this.state.input} id='volBar' type='range' max={this.state.max} onChange={this.setVolume} onMouseUp={this.saveDefaultVolume} />
        )
    }
    saveDefaultVolume() {
        settings.wait((general) => {general.volume = this.state.input; settings.save(general);}); //overwrites volume and saves volume
        console.log('Volume Saved: ' + this.state.input);
    }
    setVolume(e) {
        mp.setVolume((e.target.value / 50));
        this.setState({
            input: e.target.value,
        });
        this.forceUpdate();
    }
}
