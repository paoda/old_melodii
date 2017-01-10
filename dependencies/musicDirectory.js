//Beta Dialog Box
function dirBtn() {
     directory = dialog.showOpenDialog({properties: ['openFile', 'openDirectory']});
     directory = directory.toString();  
}
//Rather dissapointing crawler for files. 
function readDirectory(dir) {
    fs.readdir(directory, (err, files) => {
        files.forEach(file => {
            return file;
        })
    })
}