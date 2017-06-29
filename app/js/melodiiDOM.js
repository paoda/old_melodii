'use strict';

class melodiiDOMClass {
    getTable() {
        let tableTitle = ["Artist", "Title", "Album", "Year", "Genre", "Time"];

        let wrapper = document.getElementsByClassName('wrapper')[0];
        let tbl = document.createElement('table');
        tbl.style.width = '100%';

        let tbody = document.createElement('tbody');

        for (let i = 0; i < songs.length; i++) { //Iteration of the Songs Itself.

            this.parseMetadata(songs[i], (results) => {
                let metadata = results;

                this.createMetadataArray(metadata, (array) => {

                    let metadataArr = array;

                    let tr = document.createElement('tr');

                    for (let j = 0; j < tableTitle.length; j++) {
                        let td = document.createElement('td');
                        td.appendChild(document.createTextNode(metadataArr[j]));
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                });
            });
        };
        tbl.appendChild(tbody);
        wrapper.appendChild(tbl);
    }
    parseMetadata(location, callback) {
        let stream = fs.createReadStream(location)
        mm.parseStream(stream, { native: true }, (err, metadata, uAs) => {
            stream.close();
            uAs.close();
            if (err) throw err
            callback(metadata);
        })
    }
    createMetadataArray(metadata, callback) {
        let metadataArr = [
            metadata.common.artist,
            metadata.common.title,
            metadata.common.album,
            metadata.common.year,
            metadata.common.genre[0],
            metadata.format.duration
        ]
        callback(metadataArr);
    }
    loadSongInfo() {
        let title = melodii.metadata.common.title;
        let artist = melodii.metadata.common.artist;
        let album = melodii.metadata.common.album;
        songInfo.innerHTML = `${title} - ${artist}`;
    }
    removeSongInfo() {
        songInfo.innerHTML = null;
    }
    makeURLCompatible(input, callback) {
        if (input.match(/(!|#|\$|&|\'|\(|\)|\*|\+|,|\\|;|=|\?|\@|\[|\])/)) { //Removed /\//g and /:/g
            let string = input;
            let regexpSymbols = [
                /!/g,
                /#/g,
                /\$/g,
                /&/g,
                /\'/g,
                /\(/g,
                /\)/g,
                /\*/g,
                /\+/g,
                /,/g,
                /\\/g,
                ///:/g,
                /;/g,
                /=/g,
                /\?/g,
                /@/g,
                /\[/g,
                /\]/g,
            ]
            let replacements = [
                '%21',
                '%23',
                '%24',
                '%26',
                '%27',
                '%28',
                '%29',
                '%2A',
                '%2B',
                '%2C',
                '/',
                //'%3A',
                '%3B',
                '%3D',
                '%3F',
                '%40',
                '%5B',
                '%5D',
            ]

            for (let i = 0; i < 17; i++) {
                let num = string.match(regexpSymbols[i]);
                if (num !== null) {
                    num = num.length;
                    for (let j = 0; j < num; j++) {
                        string = string.replace(regexpSymbols[i], replacements[i]);
                    }
                }
            }
            callback(string);
        }
    }

}

const melodiiDOM = new melodiiDOMClass;