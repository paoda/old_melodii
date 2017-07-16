'use strict';
let eventEmitter = require('./eventEmitter');
let settings = require('./settings');
let fs = require('fs');
    


class Songs {
    constructor() {
        eventEmitter.on('Settings Loaded', () => {
            if (settings.general.defaultDir.enable) {
                fs.readFile('./app/user/songs.mld', { encoding: 'utf8' }, (err, data) => {
                    if (err) throw err;

                    this.list = data.toString('utf8');
                    this.list = this.list.split(',\n');

                    if (fs.existsSync(this.list[Math.floor(Math.random() * this.list.length)])) {
                        console.log('songs.mld passed rudimentary Test. Files Loaded');
                    } else {
                        window.alert('songs.mld failed rudimentary test. Reselect Default Directory');
                        this.list = null;

                        settings.general.defaultDir.enable = false;
                        settings.general.defaultDir.location = null;
                        settings.general.saveSettings();
                    }
                });
            } else {
                console.log('No Default Directory Set');
            }
            if (settings.general.defaultDir) {
                this.directory = settings.general.defaultDir.location;
            }else {
                this.directory = null;
            }
        });
    }
}

module.exports = new Songs();
