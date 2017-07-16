//melodiiCNTRL Class
'use strict';

let melodiiDOM = require('./melodiiDOM');
let melodii = require('./melodii');
let DOMElement = require('./DOMElement');
let melodiiBtns = require('./melodiiBtns');

class MelodiiCNTRL {
    load() {
        debugger;
        melodiiDOM.makeURLCompatible(melodii.location, (result) => {
            melodii.location = result;
            global.musicPlayer.src = melodii.location;
        });
    }
    sliderVolume(e) { //used for slider control
        melodiiBtns.animateSliderBg(e, true, null);
        global.musicPlayer.volume = DOMElement.volRange.value;
        if (global.musicPlayer.muted) this.muteToggle();
    }
    toggle() {
        if (global.musicPlayer.paused) {
            global.musicPlayer.play();
            DOMElement.toggle.removeChild(DOMElement.toggleIcon);
            DOMElement.toggleIcon = document.createElement('i'); //Creating Pause Icon
            DOMElement.toggleIcon.className = 'fa fa-pause';
            DOMElement.toggleIcon.id = 'toggleIcon';
            DOMElement.toggleIcon.setAttribute('aria-hidden', true);
            DOMElement.toggle.appendChild(DOMElement.toggleIcon);

            DOMElement.volRange.value = global.musicPlayer.volume;
        } else {
            global.musicPlayer.pause();
            DOMElement.toggle.removeChild(DOMElement.toggleIcon);
            DOMElement.toggleIcon = document.createElement('i'); //Creating Play Icon
            DOMElement.toggleIcon.className = 'fa fa-play';
            DOMElement.toggleIcon.id = 'toggleIcon';
            DOMElement.toggleIcon.setAttribute('aria-hidden', true);
            DOMElement.toggle.appendChild(DOMElement.toggleIcon);
        }
    }
    muteToggle() {
        if (global.musicPlayer.muted) { //Unlike the play/pause toggle, the button present should correspond to what's actually happening. See WMP
            global.musicPlayer.muted = false;
            DOMElement.muteToggle.removeChild(DOMElement.muteIcon);
            DOMElement.muteIcon = document.createElement('i'); //Creating Sound Icon
            DOMElement.muteIcon.className = 'fa fa-volume-up';
            DOMElement.muteIcon.id = 'muteIcon';
            DOMElement.muteIcon.setAttribute('aria-hidden', true);
            DOMElement.muteToggle.appendChild(DOMElement.muteIcon);


        } else {
            global.musicPlayer.muted = true;
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


