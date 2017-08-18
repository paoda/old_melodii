'use strict';
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default class PlayPause extends React.Component {
    constructor() {
        super();
        this.state = { className: 'fa fa-play' };
    }
    render() {
        return (
            <i className={this.state.className} id='playPause' onClick={this.toggle.bind(this)}></i>
        )
    }
    toggle() {
        let currentState = this.state.ClassName;

        if (currentState == 'fa fa-play') this.state = { className: 'fa fa-pause' };
        else if (currentState == 'fa fa-pause') this.state = { className: 'fa fa-play' };
        else throw new ReferenceError('The Class of PlayPause isn\'t what it\'s supposed to be');
    }

}
