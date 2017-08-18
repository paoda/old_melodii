'use strict';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import SeekBar from './Footer/Seekbar';
import AlbumArt from './Footer/AlbumArt';

export default class Layout extends React.Component {
    render() {
        return (
            <div className='melodiiContainer'>
                <Header />
                <Body />
                <SeekBar />
                <AlbumArt />
                <Footer />
            </div> 
        );
    }
}