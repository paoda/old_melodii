'use strict';

class MelodiiBtns {
	constructor() {
		Object.defineProperty(Global.seekRange, 'getValue', {
			get: function(value) {
				return value;
			},
			set: function(value) {
				Global.seekRange.value = value;
				Global.melodiiBtns.animateSliderBg(null, false, Global.seekRange);
			}
		});
	}
	createButtons() { //I create Event Listners here so that we can not have  init.js so cluttered
		Global.quit.onclick = () => Global.app.quit();
		Global.minimize.onclick = () => Global.browserWindow.getFocusedWindow().minimize();

		//Media Buttons
		Global.backward.onclick = () => Global.melodiiCNTRL.previous();
		Global.forward.onclick = () => Global.melodiiCNTRL.next();
		Global.muteToggle.onclick = () => Global.melodiiCNTRL.muteToggle();
		Global.toggle.onclick = () => Global.melodiiCNTRL.toggle();

		//Volume Slider
		Global.volRange.oninput = (e) => Global.melodiiCNTRL.sliderVolume(e);
		//Seek
		Global.musicPlayer.onloadedmetadata = () => Global.seekRange.max = Global.musicPlayer.duration;
        Global.seekRange.oninput = (e) => {
			Global.seekRange.getValue = Global.seekRange.value;
			Global.musicPlayer.currentTime = Global.seekRange.value;
		};

        Global.musicPlayer.ontimeupdate = () => Global.seekRange.getValue = Global.musicPlayer.currentTime;

		this.createDirBtn();
	}
	createDirBtn() {
		Global.dirBtn.onclick = () => {
			Global.directory = Global.dialog.showOpenDialog({
				properties: ['openDirectory', 'openFile']
			});

			if (Global.directory !== 'undefined') {
				Global.directory = Global.directory.toString();

				console.log('Chosen Directory: ' + Global.directory);

				Global.melodiiDir.scanDirectory(Global.directory, (err, results) => {
					if (err) throw err;
					Global.songs = results.filter(Global.melodiiDir.fileCheckFunc);

					if (Global.settings.general.defaultDir.enable) {
						if (Global.settings.general.defaultDir.location === Global.directory) {
							Global.melodii.saveArray(Global.songs, './app/user/songs.mld');

							alert('Updated "'+ Global.directory + '".');
						}else {
							if(confirm('Would you like to replace "' + Global.settings.general.defaultDir.location + '" with "' + Global.directory + '" as your default directory?')) {
								Global.settings.general.defaultDir.location = Global.directory;
								Global.settings.saveSettings();

								Global.melodii.saveArray(Global.songs, './app/user/songs.mld');
							}
						}
					} else {
						if (confirm('Do you want to set "'+ Global.directory + '" as your default directory?')) {
							Global.settings.general.defaultDir.enable = true;
							Global.settings.general.defaultDir.location = Global.directory;
							Global.settings.saveSettings();

							Global.melodii.saveArray(Global.songs, './app/user/songs.mld');
						}
					}
				});
			}
		};
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

Global.melodiiBtns = new MelodiiBtns();
//Minimize and Close Buttons