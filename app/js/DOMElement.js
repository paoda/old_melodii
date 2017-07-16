'use strict';
exports = module.exports = {};
//All assignments of HTML tags to variables
exports.dirBtn = document.getElementById('dirBtn'); //Button that opens Dialog Box
exports.quit = document.getElementById('quit'); //Button that quits melodii
exports.minimize = document.getElementById('minimize'); //Button that minimizes melodii
exports.volRange = document.getElementById('volRange'); //Range that handles music Volume
exports.forward = document.getElementById('forward'); //Button that calls melodiiCNTRL.next();
exports.backward = document.getElementById('backward'); //Button that calls melodiiCNTRL.previous();
//exports.volDown = document.getElementById('volDown'); //Button that calls melodiiCNTRL.volDown();
//exports.volUp = document.getElementById('volUp'); //Button that calss melodiiCNTRL.volUp();
exports.muteToggle = document.getElementById('muteToggle'); //Toggle for Mute and unmute
exports.muteIcon = document.getElementById('muteIcon'); //Icon for mute & unmute
exports.toggle = document.getElementById('toggle'); //Element which holds toggleIcon. 
exports.toggleIcon = document.getElementById('toggleIcon'); //Icon for mute & unmute
exports.seekRange = document.getElementById('seekRange'); //Seekbar
exports.songInfo = document.getElementById('songInfo'); //Gets div responsible for showing Song Information