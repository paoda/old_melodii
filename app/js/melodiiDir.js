'use strict';

class MelodiiDir {
    scanDirectory(dir, done) {
        let results = [];
        Global.fs.readdir(dir, (err, list) => {
            if (err) return done(err);
            let i = 0;
            (function next() {
                let file = list[i++];
                if (!file) return done(null, results);
                file = dir + '/' + file;
                Global.fs.stat(file, (err, stat) => {
                    if (stat && stat.isDirectory()) {
                        Global.melodiiDir.scanDirectory(file, (err, res) => { //Wont work if I change melodiiDir to this.
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

Global.melodiiDir = new MelodiiDir();