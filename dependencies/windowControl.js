/*function quit(){
    app.quit();
}
function minimize() {
    browserWindow.getFocusedWindow().minimize();
}
*/
// Don't comment on this. Just let it be please.


quit.addEventListener('click', () => {
	app.quit();
})
minimize.addEventListener('click', () => {
	browserWindow.getFocusedWindow().minimize();
})
