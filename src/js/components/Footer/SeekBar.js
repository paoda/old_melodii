'use strict';
import React from 'react';

export default class SeekBar extends React.Component {
    render() {
        return (
            <div className="seekBar">
                <input id='seekRange' className='melodiiSlider' type='range' defaultValue='0' />
            </div>
        )
    }
}
