volRange.value = musicPlayer.volume; //Loading Volume the first time.
console.log("Initial Volume : " + musicPlayer.volume);

//Event Listeners
backward.addEventListener('click', () => {previousSong()})
toggle.addEventListener('click', () => {playPause()})
forward.addEventListener('click', () => {nextSong()})
volDown.addEventListener('click', () => {
    musicPlayer.volume -= 0.02;
    volRange.value = musicPlayer.volume;
    console.log('Button Pressed. New Vol: ' + musicPlayer.volume); //Sometimes decimal goes weird TODO Fix
})
volUp.addEventListener('click', () => {
    musicPlayer.volume += 0.02;
    volRange.value = musicPlayer.volume;
    console.log('Button Pressed. New Vol: ' + musicPlayer.volume); //Somtimes decimal goes weird TODO fix
});

function updateVolume() {
    musicPlayer.volume = volRange.value; 
    console.log('Slider Moved. New Vol: ' + musicPlayer.volume); //Debugging Purposes
}

function playPause() {
    if (pause == false){
        musicPlayer.play();

        toggle.removeChild(toggleIcon);
        toggleIcon = document.createElement('i'); //Creating Pause Icon
            toggleIcon.className = 'fa fa-pause';
            toggleIcon.id = 'toggleIcon';
            toggleIcon.setAttribute("aria-hidden", true);
        toggle.appendChild(toggleIcon);
       
        pause = true;
        volRange.value = musicPlayer.volume; //Just so Everythingis in Sync
        console.log('Playing Audio');
        console.log('Current Volume: ' + musicPlayer.volume);
    }else {
        musicPlayer.pause();

        toggle.removeChild(toggleIcon);
        toggleIcon = document.createElement('i'); //Creating Play Icon
            toggleIcon.className = 'fa fa-play';
            toggleIcon.id = 'toggleIcon';
            toggleIcon.setAttribute('aria-hidden', true);
        toggle.appendChild(toggleIcon);

        pause = false;
        console.log('Paused Audio');
    }
}