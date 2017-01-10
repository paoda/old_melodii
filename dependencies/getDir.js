const {dialog} = require('electron').remote;
var directory;
function dirBtn() {
     directory = dialog.showOpenDialog({properties: ['openFile', 'openDirectory']});
    
     directory = directory.toString();

     document.getElementById('text').innerHTML = directory;
}

