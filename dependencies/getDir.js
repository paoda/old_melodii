const remote = require('electron').remote;
const dialog = remote.require('dialog');

var DirBtn = document.getElementById('DirBtn');

DirBtn.addEventListner('click', function(){
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory', 'multiSelections']
    })
})
