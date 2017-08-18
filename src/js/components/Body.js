'use strict';
import React from 'react';
import SongTable from './Body/SongTable';

export default class Body extends React.Component {
    render() {
        return (
            <div className='wrapper'>
            <SongTable />
            </div>
        )
    }
}