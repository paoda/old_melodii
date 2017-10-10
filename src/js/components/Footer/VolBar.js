'use strict';
import React from 'react';
import MusicPlayer from '../../melodii/MusicPlayer';

var mp = new MusicPlayer();

export default class VolBar extends React.Component {
    constructor() {
        super();
        this.state = {inputvalue: 1, step: 0.02};

        this.changeVol = this.changeVol.bind(this);
    }
    render() {
        return (
            <input value={this.state.inputValue} id='volBar' type='range' min='0' max='1' step={this.state.step} onChange={this.changeVol} />
        )
    }
    changeVol(e) {
       this.setState({
           inputValue: e.target.value
       });
       mp.changeVol(e.target.value);
    }
}
