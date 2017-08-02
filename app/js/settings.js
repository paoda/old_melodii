'use strict';
const eventEmitter = require('./eventEmitter');
const fs = require('fs');


class Settings {
    constructor() {
        if (fs.existsSync('./app/user/settings.json')) {
            console.log('settings.json found');

            this.loadSettings();
        } else {
            fs.appendFile('./app/user/settings.json', '', {
                encoding: 'utf8'
            });
        }
    }
    saveSettings() {
        fs.writeFile('./app/user/settings.json', JSON.stringify(this.general), (err) => {
            if (err) throw err;
            console.log('Saved Settings');
        });
    }
    loadSettings() {
        fs.readFile('./app/user/settings.json', 'utf8', (err, data) => {
            if (err) throw err;
            this.general = JSON.parse(data);

            eventEmitter.emit('Settings Loaded');
        });
    }
}
module.exports = new Settings();
