'use strict';

class melodiiBtnsClass {
	constructor() {
		Object.defineProperty(seekRange, 'getValue', {
			get: function() {
				return value;
			},
			set: function(value) {
				seekRange.value = value;
				melodiiBtns.animateSliderBg(null, false, seekRange);
			}
		});
	}
	createButtons() { //I create Event Listners here so that we can not have  init.js so cluttered
		quit.onclick = () => app.quit();
		minimize.onclick = () => browserWindow.getFocusedWindow().minimize();

		//Media Buttons
		backward.onclick = () => melodiiCNTRL.previous();
		forward.onclick = () => melodiiCNTRL.next();
		//volDown.onclick = () => melodiiCNTRL.volDown();
		//volUp.onclick = () => melodiiCNTRL.volUp();
		muteToggle.onclick = () => melodiiCNTRL.muteToggle();
		toggle.onclick = () => melodiiCNTRL.toggle();

		//Volume Slider
		volRange.oninput = (e) => melodiiCNTRL.sliderVolume(e);
		//Seek
		musicPlayer.onloadedmetadata = () => seekRange.max = musicPlayer.duration;
        seekRange.oninput = (e) => {
			seekRange.getValue = seekRange.value;
			musicPlayer.currentTime = seekRange.value;
		}

        musicPlayer.ontimeupdate = () => seekRange.getValue = musicPlayer.currentTime

		this.createDirBtn();
	}
	createDirBtn() {
		dirBtn.onclick = () => {
			directory = dialog.showOpenDialog({
				properties: ['openDirectory', 'openFile']
			});

			if (directory !== 'undefined') {
				directory = directory.toString();

				console.log('Chosen Directory: ' + directory)

				melodiiDir.scanDirectory(directory, (err, results) => {
					if (err) throw err;
					songs = results.filter(melodiiDir.fileCheckFunc);

					if (confirm('Do You want to set "' + directory + '" as your default Directory?')) {
						melodii.saveArray(songs, './app/user/songs.mld');
					}
				});
			}
		}
	}
	animateSliderBg(e, bool, objectName) {

		if (bool) {//Doesn't Incorporate the Getter/Setter Solution. Can be run using normal code
			var target = e.target /*|| e.srcElement;*/

			target.getValue = target.value;
			target.style.backgroundSize = (e.target.value - e.target.min) * 100 / (e.target.max - e.target.min) + "% 100%";
		}else {
			objectName.style.backgroundSize = (objectName.value - objectName.min) * 100 / (objectName.max - objectName.min) + "% 100%";
		}
	}
}

const melodiiBtns = new melodiiBtnsClass;
//Minimize and Close Buttons