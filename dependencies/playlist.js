//Debugging 
var playlistIndex = 0;

musicPlayer.addEventListener('ended', () => { //Something
    playlistIndex++;
    musicPlayer.src = playlist.songs[playlistIndex].directory;
    musicPlayer.load();
    console.log('Song Directory ' + musicPlayer.src + ' loaded.');
    musicPlayer.play();
})
