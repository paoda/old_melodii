//Playlist management. 

var playlist = require('./playlist.json');    

for (let i = 0; i <= playlist.songs.length; i++) {
    console.log(playlist.songs[i]);
}
var playlistIndex = 0;
function nextSong() {
    //Somehow add +1 to array, this allows to go to next song 
    musicPlayer.onended = () => {
        playlistIndex++;
        musicPlayer.src = playlist.songs[playlistIndex].directory;
        musicPlayer.load();
    }
}

function previousSong() {
    //Somehow add -1 to array, this allows to go back to previous song

    if (musicPlayer.currentTime < 5) {
        playlistIndex--;
    }else {
        musicPlayer.currentTime(0);
    }
}