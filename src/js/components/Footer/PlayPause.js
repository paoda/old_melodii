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
    toggle(e) {
        let currentState= this.state.className;
        if (currentState == 'fa fa-play') this.setState({className: 'fa fa-pause'});
        else if (currentState == 'fa fa-pause') this.setState({className: 'fa fa-play'});
        else console.error('\'' + currentState + '\'' + ' doesn\'t match \'fa fa-play\' or \'fa fa-pause\'');
    }

}
