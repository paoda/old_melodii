'use strict';
import React from 'react';
import noalbumart from '../../../img/noalbumart.png';

export default class AlbumArt extends React.Component {
    constructor() {
        super();
        this.state = {albumArtLocation: noalbumart};
    }
    render() {
        return (
            <div id='albumContainer'>
                <img src={this.state.albumArtLocation} id='albumImg'></img>
            </div>
        )
    }
}
