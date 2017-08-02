//melodiiCNTRL Class
'use strict';

//const melodiiDOM = require('./melodiiDOM');
const melodii = require('./melodii');
const DOMElement = require('./DOMElement');
const melodiiBtns = require('./melodiiBtns');

class MelodiiCNTRL {
    load(location) {
        require('./melodiiDOM').makeURLCompatible(location, (result) => {
            melodii.location = result;
            Global.musicPlayer.src = melodii.location;
        });
    }
    sliderVolume(e) { //used for slider control
        melodiiBtns.animateSliderBg(e, true, null);
        Global.musicPlayer.volume = DOMElement.volRange.value;
        if (Global.musicPlayer.muted) this.muteToggle();
    }
    toggle() {
        if (Global.musicPlayer.paused) {
            Global.musicPlayer.play();
            DOMElement.toggle.removeChild(DOMElement.toggleIcon);
            DOMElement.toggleIcon = document.createElement('i'); //Creating Pause Icon
            DOMElement.toggleIcon.className = 'fa fa-pause';
            DOMElement.toggleIcon.id = 'toggleIcon';
            DOMElement.toggleIcon.setAttribute('aria-hidden', true);
            DOMElement.toggle.appendChild(DOMElement.toggleIcon);

            DOMElement.volRange.value = Global.musicPlayer.volume;
        } else {
            Global.musicPlayer.pause();
            DOMElement.toggle.removeChild(DOMElement.toggleIcon);
            DOMElement.toggleIcon = document.createElement('i'); //Creating Play Icon
            DOMElement.toggleIcon.className = 'fa fa-play';
            DOMElement.toggleIcon.id = 'toggleIcon';
            DOMElement.toggleIcon.setAttribute('aria-hidden', true);
            DOMElement.toggle.appendChild(DOMElement.toggleIcon);
        }
    }
    muteToggle() {
        if (Global.musicPlayer.muted) { //Unlike the play/pause toggle, the button present should correspond to what's actually happening. See WMP
            Global.musicPlayer.muted = false;
            DOMElement.muteToggle.removeChild(DOMElement.muteIcon);
            DOMElement.muteIcon = document.createElement('i'); //Creating Sound Icon
            DOMElement.muteIcon.className = 'fa fa-volume-up';
            DOMElement.muteIcon.id = 'muteIcon';
            DOMElement.muteIcon.setAttribute('aria-hidden', true);
            DOMElement.muteToggle.appendChild(DOMElement.muteIcon);


        } else {
            Global.musicPlayer.muted = true;
            DOMElement.muteToggle.removeChild(DOMElement.muteIcon);
            DOMElement.muteIcon = document.createElement('i'); //Creating Mute Icon
            DOMElement.muteIcon.className = 'fa fa-volume-off';
            DOMElement.muteIcon.id = 'muteIcon';
            DOMElement.muteIcon.setAttribute('aria-hidden', true);
            DOMElement.muteToggle.appendChild(DOMElement.muteIcon);
        }
    }
}

module.exports = new MelodiiCNTRL();


