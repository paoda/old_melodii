/*function quit(){
    app.quit();
}
function minimize() {
    browserWindow.getFocusedWindow().minimize();
}
*/
// Don't comment on this. Just let it be please.

var quit = document.getElementById('close');
var minimize = document.getElementById('minimize');

quit.addEventListener('click', () => {
	app.quit();
})
minimize.addEventListner('click', () => {
	browserWindow.getFocusedWindow().minimize();
})
