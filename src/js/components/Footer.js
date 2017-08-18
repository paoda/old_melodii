'use strict';
import React from 'react';

import AlbumArt from './Footer/AlbumArt';
import PlayPause from './Footer/PlayPause';
import SkipFwd from './Footer/SkipFwd';
import SkipBkwd from './Footer/SkipBkwd';
import VolBar from './Footer/VolBar';
import SongInfo from './Footer/SongInfo';
import Mute from './Footer/Mute';

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className='mediaControls'>
                    <SkipBkwd />
                    <PlayPause />
                    <SkipFwd />
                    <VolBar />
                </div>
                <div className='songInfo'>
                    <SongInfo />
                </div>
            </footer>
        )
    }
}