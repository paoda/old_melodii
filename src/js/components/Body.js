'use strict';
import React from 'react';
import SongTable from './Body/SongTable';
import BtnDir from './Body/BtnDir';



export default class Body extends React.Component {
    render() {
        return (
            <div className='wrapper'>
                <BtnDir />
            </div>
        )
    }
}