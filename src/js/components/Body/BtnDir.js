'use strict';
import React from 'react';
import Directory from '../../melodii/Directory';

var directory = new Directory();

export default class BtnDir extends React.Component {
    render() {
        return (
            <button id='btndir' onClick={this.launch.bind(this)}>Choose Directory</button>
        )
    }
    launch() {
        directory.get();
    }
}