//melodiiCNTRL Class

class melodiiCNTRLClass {
    load() {

       melodiiDOM.makeURLCompatible(melodii.location, (result) => {
            melodii.location = result;
            musicPlayer.src = melodii.location;
       })
    }
    sliderVolume(e) { //used for slider control
        melodiiBtns.animateSliderBg(e, true, null);
        musicPlayer.volume = volRange.value;
        if (musicPlayer.muted) this.muteToggle();
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
    muteToggle() {
        if (musicPlayer.muted) { //Unlike the play/pause toggle, the button present should correspond to what's actually happening. See WMP
            musicPlayer.muted = false;
            muteToggle.removeChild(muteIcon);
            muteIcon = document.createElement('i'); //Creating Sound Icon
            muteIcon.className = 'fa fa-volume-up';
            muteIcon.id = 'muteIcon';
            muteIcon.setAttribute('aria-hidden', true);
            muteToggle.appendChild(muteIcon);

            
        } else {
            musicPlayer.muted = true;
            muteToggle.removeChild(muteIcon);
            muteIcon = document.createElement('i'); //Creating Mute Icon
            muteIcon.className = 'fa fa-volume-off';
            muteIcon.id = 'muteIcon';
            muteIcon.setAttribute('aria-hidden', true);
            muteToggle.appendChild(muteIcon);
        }
    }
}

const melodiiCNTRL = new melodiiCNTRLClass;


