//All Code Should be Run here.
//Makes all Buttons Work. Uses Global varibales from init.js
melodiiBtns.createButtons();


if (fs.existsSync('./app/user/songs.mld')) { //Does songs.mld Exist?
    fs.readFile('./app/user/songs.mld', (err, data) => {
        if (err) throw err;
        
        songs = data.toString('utf8'); //readFile will read .mld as a UInt8Array
        songs = songs.split(',\n'); //Each file name is separated by a , and then a newline

        console.log('songs.mld Found & Loaded'); //TODO: Make sure Laoding of Files Work
    })
} else {
    console.log('songs.mld Not Found. No Default Directory Set');
}