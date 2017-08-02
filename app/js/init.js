'use strict';

let Global = {};
Global.musicPlayer = new Audio();

let songs, melodii, melodiiBtns, melodiiCNTRL, melodiiDir, melodiiDOM, lastfm;
let DOMElement = require('./js/DOMElement');
let eventEmitter = require('./js/eventEmitter');

Global.settings = require('./js/settings');
eventEmitter.on('Settings Loaded', () => {
    //Load All of the Other Files once Settings have been loaded.
    songs = require('./js/songs');
    melodii = require('./js/melodii');
    melodiiBtns = require('./js/melodiiBtns');
    melodiiCNTRL = require('./js/melodiiCNTRL');
    melodiiDir = require('./js/melodiiDir');
    melodiiDOM = require('./js/melodiiDOM');
    lastfm = require('./js/lastfm');
    melodiiBtns.createButtons();
    //let listenmoe = require('./js/listenmoe');
    document.getElementById('random').onclick = () => {
        melodii.loadRandom();
        melodiiCNTRL.toggle();
    };
});