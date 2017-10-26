'use strict';
import fs from 'fs';
import os from 'os';
import {remote} from 'electron';

export default class Settings {
    constructor() {
        this.general = { //Default Settings
            defaultDir: {
                enable: false,
                location: []
            },
            lastfm: {
                enable: false,
                apiKey: null,
                secret: null,
                sessionName: null
            },
            listenmoe: {
                enable: false
            },
            songs: {
                location: [],
                list: []
            }
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
            this.misc.found = fs.existsSync(this.misc.path);
        } else {
            this.misc.path = this.misc.appdata + '/melodii/user/user.json';
            this.misc.slash = '/';
            this.misc.found = fs.existsSync(this.misc.path);
        }

        if (this.misc.found) this.load();
        else this.createSettings();

    }
    createSettings() {
        //user.json does not exist :(
        fs.writeFile(this.misc.path, JSON.stringify(this.general), (err) => {
            if (err) throw err;
            console.log('Created Settings File\nLoaded Default Settings');  
        });

    }
    save(obj) {
        //Takes the modified setings overwrites them and then saves them to file.
        if(this.misc.found) this.load();
        this.general = Object.assign({}, this.general, obj);
        
        if (!this.misc.found) {
            try {
                fs.mkdirSync(this.misc.appdata + this.misc.slash + 'melodii');
            } catch (e) {
                console.warn('Whoops! The melodii folder already exists!');
            }
            try {
                fs.mkdirSync(this.misc.appdata + this.misc.slash + 'melodii' + this.misc.slash + 'user');
            } catch (e) {
                console.warn('Whoops! the user folder already exists!');
            }
            console.log('Finished Creating directories');
        }
        fs.writeFile(this.misc.path, JSON.stringify(obj), (err) => {
            if (err) throw err;
            console.log('Saved Settings');
        });
    }
    load() {
        fs.readFile(this.misc.path, 'utf8', (err, obj) => {
            if (err) throw err;
            this.general = JSON.parse(obj);
            console.log('Loaded Settings!');
        });
    }
    wait(done) { //The Exact same as load() but with callback
        fs.readFile(this.misc.path, 'utf8', (err, obj) => {
            if (err) throw err;
            this.general = JSON.parse(obj);
            done(JSON.parse(obj));
        });
    }
}