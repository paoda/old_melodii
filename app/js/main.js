//All Code Should be Run here.
//Makes all Buttons Work. Uses Global varibales from init.js
melodiiBtns.createButtons();


if (fs.existsSync('./app/user/songs.mld')) { //Does songs.mld Exist?
    fs.readFile('./app/user/songs.mld', (err, data) => {
        if (err) throw err;
        
        songs = data.toString('utf8'); //readFile will read .mld as a UInt8Array
        songs = songs.split(',\n'); //Each file name is separated by a , and then a newline

        //Loads Entire songs.mld file, maybe not the most efficient, especially since I check only 1 file before discarding the entire thing.

        if (fs.existsSync(songs[Math.round(Math.random() * songs.length + 1)])) {
            console.log('songs.mld passed rudimentary Test. Files Loaded');
        } else {
            window.alert('songs.mld failed rudimentary test. Reselect Default Directory');
            songs = null;
        }
    })
} else {
    console.log('songs.mld Not Found. No Default Directory Set');
}

document.getElementById('random').onclick = () => {
    melodii.loadRandom();
    melodiiCNTRL.toggle();
}