function dirBtn() {
     directory = dialog.showOpenDialog({properties: ['openFile', 'openDirectory']});
     directory = directory.toString();  
}
