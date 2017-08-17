'use strict';
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import MelodiiBtns from '../../melodii/MelodiiBtns';

export default class Minimize extends React.Component {
    render() {
        return (
            <i onClick={this.minimize}className="fa fa-window-minimize"></i>
        )
    }
    minimize() {
        MelodiiBtns.minimize();
    }
}