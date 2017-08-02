'use strict';
const eventEmitter = require('./eventEmitter');
const fs = require('fs');

class Songs {
    constructor() {
        if (Global.settings.general.defaultDir.enable) {
            fs.readFile('./app/user/songs.mld', {
                encoding: 'utf8'
            }, (err, data) => {
                if (err) throw err;

                this.list = data.toString('utf8');
                this.list = this.list.split(',\n');

                if (fs.existsSync(this.list[Math.floor(Math.random() * this.list.length)])) {
                    console.log('songs.mld passed rudimentary Test. Files Loaded');
                } else {
                    window.alert('songs.mld failed rudimentary test. Reselect Default Directory');
                    this.list = null;

                    Global.settings.general.defaultDir.enable = false;
                    Global.settings.general.defaultDir.location = null;
                    Global.settings.general.saveSettings();
                }
            });
        } else {
            console.log('No Default Directory Set');
        }
        if (Global.settings.general.defaultDir) {
            this.directory = Global.settings.general.defaultDir.location;
        } else {
            this.directory = null;
        }
    }
}

module.exports = new Songs();