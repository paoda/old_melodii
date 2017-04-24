'use strict';

class melodiiDirClass {
    scanDirectory(dir, done) {
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
                        melodiiDir.scanDirectory(file, (err, res) => {
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
    }

    fileCheckFunc(arg) {
        if (arg.match(/^.*\.(flac|mp4|mp3|m4a|aac|wav|ogg)$/gi) !== null) {
            return true;
        } else {
            return false;
        }
    }
}

const melodiiDir = new melodiiDirClass;