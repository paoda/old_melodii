//Beta Dialog Box
dirBtn.addEventListener('click', () => {
    directory = dialog.showOpenDialog({
        properties: ['openDirectory', 'openFile']
    });

    if (directory !== 'undefined') {
        directory = directory.toString();

        console.log('Chosen Directory: ' + directory)

        scanDirectory(directory, (err, results) => {
            if (err) throw err;
            songs = results;
            songs = songs.filter(fileCheckFunc);

            directoryConvert(songs);
        })
    }
})

//http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search - Recursive directory scanning.
//File type regex: /^.*\.(flac|mp4|mp3|m4a|aac|wav|ogg)$/gi
function scanDirectory(dir, done) {
    var results = [];
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            if (os.platform() !== 'win32') {
                file = dir + '/' + file;
            } else {
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

function fileCheckFunc(arg) {
    if (arg.match(/^.*\.(flac|mp4|mp3|m4a|aac|wav|ogg)$/gi) != null) {
        return true;
    } else {
        return false;
    }
}
var newSongs = [];

console.log(songs);

function directoryConvert(arg) {
	arg.forEach((value) => {
        value = value.replace(/\\/gi, "/");
		newSongs.push(value);
    })
}