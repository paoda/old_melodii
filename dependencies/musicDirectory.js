//Beta Dialog Box
function dirBtn() {
    directory = dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    directory = directory.toString();
}

// http://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
var scanDirectory = (dir, done) => {
    var results = [];
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
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