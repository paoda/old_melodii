'use strict';

let Global = {};
Global.musicPlayer = new Audio();

let DOMElement = require('./js/DOMElement');
let eventEmitter = require('./js/eventEmitter');
let settings = require('./js/settings');
let songs = require('./js/songs');
let melodii = require('./js/melodii');
let melodiiBtns = require('./js/melodiiBtns');
let melodiiCNTRL = require('./js/melodiiCNTRL');
let melodiiDir = require('./js/melodiiDir');
let melodiiDOM = require('./js/melodiiDOM');
let lastfm = require('./js/lastfm');
//let listenmoe = require('./js/listenmoe');

melodiiBtns.createButtons();

document.getElementById('random').onclick = () => {
    melodii.loadRandom();
    melodiiCNTRL.toggle();
};
