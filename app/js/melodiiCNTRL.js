//melodiiCNTRL Class
'use strict';
class MelodiiCNTRL {
    load() {
       Global.melodiiDOM.makeURLCompatible(Global.melodii.location, (result) => {
            Global.melodii.location = result;
            Global.musicPlayer.src = Global.melodii.location;
       });
    }
    sliderVolume(e) { //used for slider control
        Global.melodiiBtns.animateSliderBg(e, true, null);
        Global.musicPlayer.volume = Global.volRange.value;
        if (Global.musicPlayer.muted) this.muteToggle();
    }
    toggle() {
        if (Global.musicPlayer.paused) {
            Global.musicPlayer.play();
            Global.toggle.removeChild(Global.toggleIcon);
            Global.toggleIcon = document.createElement('i'); //Creating Pause Icon
            Global.toggleIcon.className = 'fa fa-pause';
            Global.toggleIcon.id = 'toggleIcon';
            Global.toggleIcon.setAttribute('aria-hidden', true);
            Global.toggle.appendChild(Global.toggleIcon);

            Global.volRange.value = Global.musicPlayer.volume;
        } else {
            Global.musicPlayer.pause();
            Global.toggle.removeChild(Global.toggleIcon);
            Global.toggleIcon = document.createElement('i'); //Creating Play Icon
            Global.toggleIcon.className = 'fa fa-play';
            Global.toggleIcon.id = 'toggleIcon';
            Global.toggleIcon.setAttribute('aria-hidden', true);
            Global.toggle.appendChild(Global.toggleIcon);
        }
    }
    muteToggle() {
        if (Global.musicPlayer.muted) { //Unlike the play/pause toggle, the button present should correspond to what's actually happening. See WMP
            Global.musicPlayer.muted = false;
            Global.muteToggle.removeChild(Global.muteIcon);
            Global.muteIcon = document.createElement('i'); //Creating Sound Icon
            Global.muteIcon.className = 'fa fa-volume-up';
            Global.muteIcon.id = 'muteIcon';
            Global.muteIcon.setAttribute('aria-hidden', true);
            Global.muteToggle.appendChild(Global.muteIcon);

            
        } else {
            Global.musicPlayer.muted = true;
            Global.muteToggle.removeChild(Global.muteIcon);
            Global.muteIcon = document.createElement('i'); //Creating Mute Icon
            Global.muteIcon.className = 'fa fa-volume-off';
            Global.muteIcon.id = 'muteIcon';
            Global.muteIcon.setAttribute('aria-hidden', true);
            Global.muteToggle.appendChild(Global.muteIcon);
        }
    }
}

Global.melodiiCNTRL = new MelodiiCNTRL();


