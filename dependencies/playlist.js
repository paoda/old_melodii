//Debugging 
var playlistIndex = 0;

/*musicPlayer.onended = () => {
    playlistIndex++;
    musicPlayer.src = playlist.songs[playlistIndex].directory;
    musicPlayer.load();
};
*/
function nextSong() {
    //Somehow add +1 to array, this allows to go to next song 
    playlistIndex++;
    musicPlayer.src = playlist.songs[playlistIndex].directory;
    musicPlayer.load();
};

function previousSong() {
    //Somehow add -1 to array, this allows to go back to previous song
    playlistIndex--;
    musicPlayer.src = playlist.songs[playlistIndex].directory;
    musicPlayer.load();
}