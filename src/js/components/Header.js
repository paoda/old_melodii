'use strict';
import React from 'react';
import Minimize from './Header/Minimize';
import Quit from './Header/Quit';
export default class Header extends React.Component {
    render() {
        return (
            <header>
                Melodii Music Player
                <Minimize />
                <Quit />
            </header>
        )
    }
}