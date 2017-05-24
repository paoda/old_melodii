'use strict';

class melodiiBtnsClass {
	createButtons() {
		quit.addEventListener('click', () => {
			app.quit();
		})
		minimize.addEventListener('click', () => {
			browserWindow.getFocusedWindow().minimize();
		})

		//Media Buttons
		backward.addEventListener('click', () => {
			melodiiCNTRL.previous();
		})
		forward.addEventListener('click', () => {
			melodiiCNTRL.next();
		})
		volDown.addEventListener('click', () => {
			melodiiCNTRL.volDown();
		})
		volUp.addEventListener('click', () => {
			melodiiCNTRL.volUp();
		})
		toggle.addEventListener('click', () => {
			melodiiCNTRL.toggle();
		
		})
		
		this.createDirBtn();
	}
	createDirBtn() {
		dirBtn.addEventListener('click', () => {
			directory = dialog.showOpenDialog({
				properties: ['openDirectory', 'openFile']
			});

			if (directory !== 'undefined') {
				directory = directory.toString();

				console.log('Chosen Directory: ' + directory)

				melodiiDir.scanDirectory(directory, (err, results) => {
					if (err) throw err;
					songs = results.filter(melodiiDir.fileCheckFunc);
				});
			}
		});
	}
	animateSliderBg(e) {
		var target = e.target /*|| e.srcElement;*/

		target.style.backgroundSize = (e.target.value - e.target.min) * 100 / (e.target.max - e.target.min) + "% 100%";
	}
}

const melodiiBtns = new melodiiBtnsClass;
//Minimize and Close Buttons