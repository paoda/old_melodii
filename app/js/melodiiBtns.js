'use strict';
const DOMElement = require('./DOMElement');
const melodiiDir = require('./melodiiDir');
const melodii = require('./melodii');
const songs = require('./songs');
const directory = require('./songs').directory;
const dialog = require('electron').remote.dialog;
const app = require('electron').remote.app;



class MelodiiBtns {
	constructor() {

		let animateSliderBg = this.animateSliderBg;
		Object.defineProperty(DOMElement.seekRange, 'getValue', {
			get: function(value) {
				return value;
			},
			set: function(value) {
				DOMElement.seekRange.value = value;
				animateSliderBg(null, false, DOMElement.seekRange);
			}
        });
        DOMElement.dirBtn.onclick = () => {
            this.createDirBtn();
		};
		
		this.quit = document.getElementById('quit');
		this.minimize = document.getElementById('minimize');
	}
	createButtons() { //I create Event Listners here so that we can not have  init.js so cluttered
		const melodiiCNTRL = require('./melodiiCNTRL');
		this.quit.onclick = () => app.quit();
		this.minimize.onclick = () => this.browserWindow.getFocusedWindow().minimize();

		//Media Buttons
		DOMElement.backward.onclick = () => melodiiCNTRL.previous();
		DOMElement.forward.onclick = () => melodiiCNTRL.next();
		DOMElement.muteToggle.onclick = () => melodiiCNTRL.muteToggle();
		DOMElement.toggle.onclick = () => melodiiCNTRL.toggle();

		//Volume Slider
		DOMElement.volRange.oninput = (e) => melodiiCNTRL.sliderVolume(e);
		//Seek
		Global.musicPlayer.onloadedmetadata = () => DOMElement.seekRange.max = Global.musicPlayer.duration;
        DOMElement.seekRange.oninput = (e) => {
			DOMElement.seekRange.getValue = DOMElement.seekRange.value;
			Global.musicPlayer.currentTime = DOMElement.seekRange.value;
		};

        Global.musicPlayer.ontimeupdate = () => DOMElement.seekRange.getValue = Global.musicPlayer.currentTime;

		document.getElementById('dirBtn').onclick = () => this.createDirBtn();
	}
	createDirBtn() {
			songs.directory = dialog.showOpenDialog({
				properties: ['openDirectory', 'openFile']
			});

			if (songs.directory !== 'undefined') {
				songs.directory = songs.directory.toString();

				console.log('Chosen Directory: ' + songs.directory);

				melodiiDir.scanDirectory(songs.directory, (err, results) => {
					if (err) throw err;
					songs.list = results.filter(melodiiDir.fileCheckFunc);

					if (Global.settings.general.defaultDir.enable) {
						if (Global.settings.general.defaultDir.location === songs.directory) {
							melodii.saveArray(songs.list, './app/user/songs.mld');

							alert('Updated "'+ songs.directory + '".');
						}else {
							if(confirm('Would you like to replace "' + Global.settings.general.defaultDir.location + '" with "' + songs.directory + '" as your default directory?')) {
								Global.settings.general.defaultDir.location = songs.directory;
								Global.settings.saveSettings();

								melodii.saveArray(songs.list, './app/user/songs.mld');
							}
						}
					} else {
						if (confirm('Do you want to set "'+ songs.directory + '" as your default directory?')) {
							Global.settings.general.defaultDir.enable = true;
							Global.settings.general.defaultDir.location = songs.directory;
							Global.settings.saveSettings();

							melodii.saveArray(songs.list, './app/user/songs.mld');
						}
					}
				});
			}
	}
	animateSliderBg(e, bool, objectName) {

		if (bool) {//Doesn't Incorporate the Getter/Setter Solution. Can be run using normal code
			let target = e.target; /*|| e.srcElement*/

			target.getValue = target.value;
			target.style.backgroundSize = (e.target.value - e.target.min) * 100 / (e.target.max - e.target.min) + '% 100%';
		}else {
			objectName.style.backgroundSize = (objectName.value - objectName.min) * 100 / (objectName.max - objectName.min) + '% 100%';
		}
	}
}

module.exports = new MelodiiBtns();