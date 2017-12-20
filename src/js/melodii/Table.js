'use strict';

import Song from './Song';
import Settings from './Settings';

import React from 'react';
import ReactDOM from 'react-dom';
import * as mm from 'music-metadata';
import fs from 'fs';

import Body from '../components/Body';
import BtnDir from '../components/Body/BtnDir';
import SongTable from '../components/Body/SongTable';

let settings = new Settings();

export default class Table { //Table Generation

    create() {
        //Check to see if Table has already been created, if so no need to generate a new one.
        settings.wait((general) => {
            if (general.table) { //Table already exists
                let wrapper = document.getElementsByClassName('wrapper')[0];
                let path;

                if (settings.misc.os === 'win32') path = settings.misc.appdata + '\\melodii\\user\\table.json';
                else path = settings.misc.appdata + '/melodii/user/table.json';

                if (fs.existsSync(path)) {
                    fs.readFile(path, 'utf8', (err, obj) => {
                        if (err) throw err;
                        let res, success = true;
                        try {
                            res = JSON.parse(obj);
                        } catch (e) {
                            success = false;
                            console.warn('Unable to Parse "table.json" Recreating...');
                        }
    
                        if (!success) this.generate();
                        else ReactDOM.render(<SongTable obj={res} />, wrapper);
                    });
                } else this.generate();
            } else this.generate();
        });
    }
    generate() {
        let wrapper = document.getElementsByClassName('wrapper')[0];

        settings.wait((general) => {
            let num = general.songs.filepaths[0].list.length -1;            
            let header;

            let table = {
                thead: {
                    tr: [] //array contains <th> information
                },
                tbody: [] //array contains <tr> <td>x6 information
            };

            table.thead.tr = ['Artist', 'Title', 'Album', 'Year', 'Genre', 'Time'];

            this.getBody(table, general.songs.filepaths[0].list, 0, num, (err) => {
                if (err) throw err; //Can Throw Error: File not found

                ReactDOM.render(<SongTable obj={table} />, wrapper);
            });
        });
    }
    getBody(table, arr, start, end, done) {
        let loc = arr[start];
        mm.parseFile(loc, {native: true, duration: true}).then((res) => {
            table.tbody.push(this.checkMetadata(loc, res));

            if (start === end) done(null);
            else this.getBody(table, arr, ++start, end, done);
        }).catch((err) => {
            done(err);
        });
    }
    checkMetadata(loc, metadata) {

        let min = ~~((metadata.format.duration % 3600) /60);
        let sec = ~~(metadata.format.duration % 60);
        if (sec < 10) sec = '0' + sec;
        let time = `${min}:${sec}`;

        let obj = {
            location: loc,
            time: time,
            artist: (metadata.common.artist) ? metadata.common.artist : '',
            title: (metadata.common.title) ? metadata.common.title : '',
            album: (metadata.common.album) ? metadata.common.album : '',
            year: (metadata.common.year) ? metadata.common.year : '',
            genre: (metadata.common.genre) ? metadata.common.genre : ''
        };

        return obj;
    }
}