'use strict';
import {remote} from 'electron';
import Settings from './Settings';
import fs from 'fs';
import os from 'os';


var settings = new Settings();

export default class Directory {
    constructor() {
        this.button = document.getElementById('btndir');

        if (os.platform() !== 'win32') this.slash = '/';
        else this.slash = '\\';
    }
    //http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
    scan(dir, done) {
        let self = this;
        let results = [];
        fs.readdir(dir, (err, list) => {
            if (err) return done(err);
            let i = 0;
            (function next() {
                let file = list[i++];
                if (!file) return done(null, results);
                file = dir + self.slash + file;
                fs.stat(file, (err, stat) => {
                    if (stat && stat.isDirectory()) {
                        self.scan(file, (err, res) => {
                            results = results.concat(res);
                            next();
                        });
                    } else {
                        results.push(file);
                        next();
                    }
                });
            })();
        });
    }
    get() {
        try {
            this.location = remote.dialog.showOpenDialog({
                properties: ['openDirectory']
            });
        } catch (e) {
            console.log('Unexpected Closure of Dialog Box');
        }

        if (this.location !== 'undefined') {
            this.location = this.location.toString();

            console.log('Chosen Directory: ' + this.location);

            this.scan(this.location, (err, res) => {
                if (err) throw err;
                debugger;
                settings.general.songs.location.push(this.location); //Check to see if,

                var songs = res.filter((arg) => {
                    if (arg.match(/^.*\.(flac|mp4|mp3|m4a|aac|wav|ogg)$/gi) !== null) return true;
                    else return false;
                });

                settings.general.songs.list = settings.general.songs.list.concat(songs);

                if (settings.general.defaultDir.enable) {

                    let length = settings.general.defaultDir.location.length;
                    for (let i = 0; i < length; i++) if (settings.general.defaultDir.location[i] === this.location) this.overwrite = true;

                    if (this.overwrite) {
                        settings.save(settings.general);
                        alert('Updated "' + this.location + '"');
                    } else {
                        if (confirm('Would You like to add "' + this.location + '" as a default directory?')) {
                            settings.general.defaultDir.location.push(this.location);
                            settings.save(settings.general);
                            alert('Added "' + this.location + '" as a default directory');
                        }
                    }

                } else {
                    if (confirm('Do you Want to set "' + this.location + '" as your default directory?')) {
                        settings.general.defaultDir.enable = true;
                        settings.general.defaultDir.location.push(this.location);
                        settings.save(settings.general);
                    }
                }
            });
        } else {
            console.error('Melodii was unable to retrieve the directory chosen');
        }
    }
}