//melodiiCNTRL Class

class melodiiCNTRLClass {
    constructor() {
        musicPlayer.onloadedmetadata = () => seekRange.max = musicPlayer.duration
        seekRange.onchange = () => musicPlayer.currentTime = seekRange.value
        musicPlayer.ontimeupdate = () => seekRange.value = musicPlayer.currentTime
    }
    load() {
        musicPlayer.src = melodii.location;
    }
    volUp() {
        musicPlayer.volume += 0.02;
        volRange.value = musicPlayer.volume;
        console.log('New Volume:' + musicPlayer.volume);
    }
    volDown() {
        musicPlayer.volume -= 0.02;
        volRange.value = musicPlayer.volume;
        console.log('New Volume:' + musicPlayer.volume);
    }
    sliderVolume(e) { //used for slider control
        melodiiBtns.animateSliderBg(e);
        musicPlayer.volume = volRange.value;
        console.log('new Volume:' + musicPlayer.volume);
    };
    toggle() {
        if (musicPlayer.paused) {
            musicPlayer.play();
            toggle.removeChild(toggleIcon);
            toggleIcon = document.createElement('i'); //Creating Pause Icon
            toggleIcon.className = 'fa fa-pause';
            toggleIcon.id = 'toggleIcon';
            toggleIcon.setAttribute("aria-hidden", true);
            toggle.appendChild(toggleIcon);

            volRange.value = musicPlayer.volume;
        } else {
            musicPlayer.pause();
            toggle.removeChild(toggleIcon);
            toggleIcon = document.createElement('i'); //Creating Play Icon
            toggleIcon.className = 'fa fa-play';
            toggleIcon.id = 'toggleIcon';
            toggleIcon.setAttribute('aria-hidden', true);
            toggle.appendChild(toggleIcon);
        }
    }
    updateSeek(e) {
        melodiiBtns.animateSliderBg(e);

    }

}

const melodiiCNTRL = new melodiiCNTRLClass;