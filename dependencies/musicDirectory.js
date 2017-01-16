//Beta Dialog Box
var dirBtn = document.getElementById('dirBtn');
dirBtn.addEventListener('click', () => {
    directory = dialog.showOpenDialog({
        properties: ['openDirectory', 'openFile']
    });

    if (directory !== 'undefined') {
        directory = directory.toString();
        
        scanDirectory(directory, (err, results) =>{
            if (err) throw err;
            songs = results;
        })
    }   
})

//http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
var scanDirectory = (dir, done) => {
    var results = [];
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            if (os.platform() !== 'win32'){
                file = dir + '/' + file;
            }else {
                file = dir + '\\' + file;
            }
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    scanDirectory(file, (err, res) => {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};