//All Code Should be Run here.
//Makes all Buttons Work. Uses Global varibales from init.js
melodiiBtns.createButtons();

eventEmitter.on('Settings Loaded', () => {
    if (settings.general.defaultDir.enable) {
        fs.readFile('./app/user/songs.mld', {encoding: 'utf8'}, (err, data) => {
            if (err) throw err;

            songs = data.toString('utf8');
            songs = songs.split(',\n');

            if(fs.existsSync(songs[~~(Math.random() * songs.length)])) {
                console.log('songs.mld passed rudimentary Test. Files Loaded');
            } else {
                window.alert('songs.mld failed rudimentary test. Reselect Default Directory')
                songs = null

                settings.general.defaultDir.enable = false;
                settings.general.defaultDir.location = null;
                settings.saveSettings();
            }
        })
    } else {
        console.log('No Default Directory Set');
    }
})

document.getElementById('random').onclick = () => {
    melodii.loadRandom();
    melodiiCNTRL.toggle();
}