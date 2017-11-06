'use strict';
import fs from 'fs';
import Settings from './Settings';
import os from 'os';
var settings = new Settings();

export default class Filepath {
    constructor(location) {

        if (os.platform() !== 'win32') this.slash = '/';
        else this.slash = '\\';

        settings.wait((res) => {
            this.location = location;
            this.getFiles(location);

        });

    }
    getFiles(location) {
        this.scan(location, (err, res) => {
            this.list = res.filter((arg) => {
                if (arg.match(/^.*\.(flac|mp4|mp3|m4a|aac|wav|ogg)$/gi) !== null) return true;
                else return false;
            });
        });

    }
    //http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
    scan(dir, done) {
        let self = this;
        let results = [];
        fs.readdir(dir, (err, list) => {
            if (err) return done(err);
            let i = 0;
            (function next() {
                let file = list[i++];
                if (!file) return done(null, results);
                file = dir + self.slash + file;
                fs.stat(file, (err, stat) => {
                    if (stat && stat.isDirectory()) {
                        self.scan(file, (err, res) => {
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
}