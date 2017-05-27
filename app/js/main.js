//All Code Should be Run here.
//Makes all Buttons Work. Uses Global varibales from init.js
melodiiBtns.createButtons();


if (fs.existsSync('./app/user/songs.mld')) {
    fs.readFile('./app/user/songs.mld', (err, data) => {
        if (err) throw err;
        
        songs = data.toString('utf8');
        songs = songs.split(',');
        console.log(songs);
    })
}