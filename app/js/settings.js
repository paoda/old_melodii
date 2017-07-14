'use strict';

class Settings {
    constructor() {
        if (Global.fs.existsSync('./app/user/settings.json')) {
            console.log('settings.json found');

            this.loadSettings();
        } else {
            Global.fs.appendFile('./app/user/settings.json', '', {
                encoding: 'utf8'
            });
        }
    }
    saveSettings() {
        Global.fs.writeFile('./app/user/settings.json', JSON.stringify(this.general), (err) => {
            if (err) throw err;
            console.log('Saved Settings');
        });
    }
    loadSettings() {
        Global.fs.readFile('./app/user/settings.json', 'utf8', (err, data) => {
            if (err) throw err;
            this.general = JSON.parse(data);

            Global.eventEmitter.emit('Settings Loaded');
        });
    }
}

Global.settings = new Settings();