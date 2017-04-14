'use strict'

//Minimize and Close Buttons
quit.addEventListener('click', () => {
	app.quit();
})
minimize.addEventListener('click', () => {
	browserWindow.getFocusedWindow().minimize();
})

//Media Buttons


