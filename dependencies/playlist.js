//Debugging 
var playlistIndex = 0;

musicPlayer.addEventListener('ended', () => { //Something
    playlistIndex++;
    musicPlayer.src = playlist.songs[playlistIndex].directory;
    musicPlayer.load();
    console.log('Song Directory ' + musicPlayer.src + ' loaded.');
    musicPlayer.play();
})

function nextSong() {
    toggle.removeChild(toggleIcon);
        toggleIcon = document.createElement('i'); //Creating Play Icon
            toggleIcon.className = 'fa fa-play';
            toggleIcon.id = 'toggleIcon';
            toggleIcon.setAttribute('aria-hidden', true);
        toggle.appendChild(toggleIcon);
    pause = false;

    //Somehow add +1 to array, this allows to go to next song 
    playlistIndex++;
    musicPlayer.src = playlist.songs[playlistIndex].directory;
    musicPlayer.load();
    console.log('Song Directory ' + musicPlayer.src + ' loaded.');
};

function previousSong() {
    toggle.removeChild(toggleIcon);
        toggleIcon = document.createElement('i'); //Creating Play Icon
            toggleIcon.className = 'fa fa-play';
            toggleIcon.id = 'toggleIcon';
            toggleIcon.setAttribute('aria-hidden', true);
        toggle.appendChild(toggleIcon);
    pause = false;

    //Somehow add -1 to array, this allows to go back to previous song
    playlistIndex--;
    musicPlayer.src = playlist.songs[playlistIndex].directory;
    musicPlayer.load();
    console.log('Song Directory ' + musicPlayer.src + ' loaded.');
}