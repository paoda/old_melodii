'use strict';
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import MelodiiBtns from '../../melodii/MelodiiBtns';

export default class Quit extends React.Component {
    render() {
        return (
            <i onClick={this.quit} className='fa fa-times'></i>
        )
    }
    quit() {
        MelodiiBtns.quit();
    }
}