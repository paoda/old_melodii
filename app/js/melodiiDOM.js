'use strict';

class melodiiDOMClass {
    tableGen() {
        let tableTitle = ["Artist", "Title", "Album", "Year", "Genre", "Time"];

        let wrapper = document.getElementsByClassName('wrapper')[0];
        let tbl = document.createElement('table');

        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        for (let i = 0; i < tableTitle.length; i++) {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(tableTitle[i]));
            tr.appendChild(td);
        }
        thead.appendChild(tr);

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
        tbl.appendChild(thead);
        tbl.appendChild(tbody);
        wrapper.appendChild(tbl);
    }

    generateTable() {
        let t1 = performance.now();
        let wrapper = document.getElementsByClassName('wrapper')[0];
        let tbl = document.createElement('table');
        tbl.id ='songTable';
        this.createHeader((header) => tbl.appendChild(header)); //Append Header to Table

        let tbody = document.createElement('tbody');

        let num = songs.length - 1;

        this.createBody(num, songs, tbody, () => tbl.appendChild(tbody));
        wrapper.appendChild(tbl);
        let t2 = performance.now();
        console.log('Table Gen: ' + (t2-t1)/1000 + ' seconds');
    }
    createHeader(callback) {
        let tableTitle = ["Artist", "Title", "Album", "Year", "Genre", "Time"]
        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        for (let i = 0; i < tableTitle.length; i++) {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(tableTitle[i]));
            tr.appendChild(td);
        }
        thead.appendChild(tr);
        callback(thead);
    }
    createBody(iterator, array, table, callback) {

        let location = array[iterator]
        this.parseMetadata(location, (results) => {
            let metadata = results;
            this.createMetadataArray(metadata, (array) => {
                let metadataArr = array;

                let tr = document.createElement('tr');

                tr.addEventListener('click', () => {
                    melodii.loadSong(location);
                    melodiiCNTRL.toggle();
                })

                for (let i = 0; i < 6; i++) {
                    let td = document.createElement('td');
                    td.appendChild(document.createTextNode(metadataArr[i]));
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            })
        })
        if (iterator == 0) {
            console.log('Recursive Method Done');
            callback();
        } else {
            this.createBody(--iterator, array, table, callback);
        }
    }
    parseMetadata(location, callback) {
        let stream = fs.createReadStream(location)
        mm.parseStream(stream, {
            native: true
        }, (err, metadata, uAs) => {
            stream.close();
            uAs.close();
            if (err) throw err
            callback(metadata);
        })
    }
    createMetadataArray(metadata, callback) {
        let minutes = ~~((metadata.format.duration % 3600) / 60);
        let seconds = ~~(metadata.format.duration % 60)
        if (seconds < 10) seconds = '0' + seconds;
        let time = `${minutes}:${seconds}`;
        try{metadata.common.genre[0]}catch(e){ metadata.common.genre = ['']};
        let metadataArr = [
            metadata.common.artist,
            metadata.common.title,
            metadata.common.album,
            metadata.common.year,
            metadata.common.genre[0],
            time
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