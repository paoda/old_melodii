//All Code Should be Run here.
//Makes all Buttons Work. Uses Global varibales from init.js
'use strict';
Global.melodiiBtns.createButtons();

Global.eventEmitter.on('Settings Loaded', () => {
    if (Global.settings.general.defaultDir.enable) {
        Global.fs.readFile('./app/user/songs.mld', {encoding: 'utf8'}, (err, data) => {
            if (err) throw err;

            Global.songs = data.toString('utf8');
            Global.songs = Global.songs.split(',\n');

            if(Global.fs.existsSync(Global.songs[Math.floor(Math.random() * Global.songs.length)])) {
                console.log('songs.mld passed rudimentary Test. Files Loaded');
            } else {
                window.alert('songs.mld failed rudimentary test. Reselect Default Directory');
                Global.songs = null;

                Global.settings.general.defaultDir.enable = false;
                Global.settings.general.defaultDir.location = null;
                Global.settings.saveGlobal.Settings();
            }
        });
    } else {
        console.log('No Default Directory Set');
    }
});

document.getElementById('random').onclick = () => {
    Global.melodii.loadRandom();
    Global.melodiiCNTRL.toggle();
};