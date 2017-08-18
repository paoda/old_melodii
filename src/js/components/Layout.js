'use strict';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
export default class Layout extends React.Component {
    render() {
        return (
            <div className='melodiiContainer'>
                <Header />
                <Body />
                <Footer />
            </div> 
        );
    }
}