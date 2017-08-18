'use strict';
import React from 'react';

export default class VolBar extends React.Component {
    render() {
        return (
            <input id='volBar' type='range' min='0' max='1' step='0.02' defaultValue='1'></input>
        )
    }
}
