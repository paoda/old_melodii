'use strict'

//Minimize and Close Buttons
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


