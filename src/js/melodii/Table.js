'use strict';
// import React from 'react';
// import ReactDOM from 'react-dom';

import Song from './Song';
import Settings from './Settings';

import ReactDOM from 'react-dom';

import SongTable from '../components/Body/SongTable';

var settings = new Settings();

export default class Table { //Table Generation
    constructor() {

    }
    static generate() {
        let wrapper = document.getElementsByClassName('wrapper')[0];

        let tbody;
        let num;
        let header;
        settings.wait((general) => {
            this.createHeader((res) => header = res); //Append Header to Table
            tbody = document.createElement('tbody');
            num = general.songs.filepaths[0].list.length -1;
        });


        //Add header and tbody as prop somehow
        // ReactDOM.render(<SongTable />, wrapper);
    }
    headGen(done) {
        let titles = ['Artist', 'Title', 'Album', 'Year', 'Genre', 'Time'];
        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        for (let i = 0; i < titles.length; i++) {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(titles[i]));
            tr.appendChild(td);
        }
        thead.appendChild(tr);
        done(thead);
    }
    bodyGen() {

    }
}