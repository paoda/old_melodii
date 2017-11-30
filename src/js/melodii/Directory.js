'use strict';
import {
    remote
} from 'electron';
import Settings from './Settings';
import FilePath from './Filepath';
import fs from 'fs';
import os from 'os';


var settings = new Settings();

export default class Directory {
    constructor() {
        this.button = document.getElementById('btndir');

        if (os.platform() !== 'win32') this.slash = '/';
        else this.slash = '\\';
    }
    get() {
        try {
            this.location = remote.dialog.showOpenDialog({
                properties: ['openDirectory']
            });
        } catch (e) {
            console.error('Unexpected Closure of Dialog Box');
        }

        if (this.location !== undefined) {
            this.location = this.location.toString();

            let filepath = new FilePath(this.location, (text) => {
                console.log(text);

                console.log('Chosen Directory: ' + this.location);

                settings.wait((general) => {
                    let preExist = false;

                    for (let i = 0; i < general.songs.filepaths.length; i++) {
                        if (general.songs.filepaths[i] === filepath) {
                            preExist = true;
                            general.songs.filepaths[i] = filepath;
                        }
                    }
                    if (!preExist) general.songs.filepaths.push(filepath);

                    if (general.defaultDir.enable) {
                        let length = general.defaultDir.location.length;
                        for (let i = 0; i < length; i++) {
                            if (general.defaultDir.filepaths[i].location === this.location) this.overwrite = true;
                        }

                        if (this.overwrite) {
                            settings.save(general);
                            window.alert('Updated "' + this.location + '"');
                        } else {
                            if (confirm('Would You like to add "' + this.location + '" as a default directory?')) {
                                general.defaultDir.filepaths.push({slash: filepath.slash, location: filepath.location});
                                settings.save(general);
                                window.alert('Added "' + this.location + '" as a default directory');
                            }
                        }
                    } else {
                        if (confirm('Do you Want to set "' + this.location + '" as your default directory?')) {
                            general.defaultDir.enable = true;
                            general.defaultDir.filepaths.push({slash: filepath.slash, location: filepath.location});
                            settings.save(general);
                        }
                    }
                });
            });
        } else {
            console.error('Melodii was unable to retrieve the directory chosen');
        }
    }
}