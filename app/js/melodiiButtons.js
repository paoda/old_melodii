'use strict';

class melodiiButtonsClass {
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
		
		melodiiButtons.createDirBtn();
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
}

const melodiiButtons = new melodiiButtonsClass;
//Minimize and Close Buttons