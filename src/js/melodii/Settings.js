'use strict';
import fs from 'fs';
import os from 'os';
import {remote} from 'electron';

export default class Settings {
    constructor() {
        this.general = { //Default Settings
            defaultDir: {
                enable: false, //boolean
                filepaths: [] //array
            },
            lastfm: {
                enable: false, //boolean
                apiKey: null, //string
                secret: null, //string
                sessionName: null //string
            },
            listenmoe: {
                enable: false //boolean
            },
            songs: {
                filepaths: [] //array
            },
            table: undefined, //boolean
            volume: 50 //double
        };
        this.misc = {
            appdata: remote.app.getPath('appData'),
            os: os.platform(),
            found: null,
            slash: null,
            path: null
        };

        if (this.misc.os === 'win32') {
            this.misc.path = this.misc.appdata + '\\melodii\\user\\user.json';
            this.misc.slash = '\\';
        } else {
            this.misc.path = this.misc.appdata + '/melodii/user/user.json';
            this.misc.slash = '/';
        }
        this.misc.found = fs.existsSync(this.misc.path);

        if (!this.misc.found) this.createSettings(()=> {});

    }
    createSettings(done) {
        //Checking if directories exist:
        try {
            fs.mkdirSync(this.misc.appdata + this.misc.slash + 'melodii');
        } catch (e) {console.warn('Melodii folder already exists!');}
        try {
            fs.mkdirSync(this.misc.appdata + this.misc.slash + 'melodii' + this.misc.slash + 'user');
        } catch (e) {console.warn('Whoops! the user folder already exists!');}

        //creating user.json w/ default settings
        fs.writeFile(this.misc.path, JSON.stringify(this.general), (err) => {
            if (err) throw err;

            done();
        });
    }
    save(obj) {
        //Takes the modified setings overwrites them and then saves them to file.
        // if(this.misc.found) this.load();
        // this.general = Object.assign({}, this.general, obj);
        
        fs.writeFile(this.misc.path, JSON.stringify(obj), (err) => {
            if (err) throw err;
            console.log('Settings Saved!');
        });
    }
    load() {
        fs.readFile(this.misc.path, 'utf8', (err, obj) => {
            if (err) throw err;
            try {
                this.general = JSON.parse(obj);
            } catch (e) {
                console.error('Recreating user.json due to file corruption.');
                this.createSettings(() => {});
            }
        });
    }
    wait(done) { //The Exact same as load() but with callback
        fs.readFile(this.misc.path, 'utf8', (err, obj) => {
            if (err) throw err;
            try {
                this.general = JSON.parse(obj);
            } catch (e) {
                console.error('Error in Settings.wait(): unable to parse user.json');
                this.createSettings(() => {});
            }
            
            done(this.general);
        });
    }
}