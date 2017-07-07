'use strict';

class melodiiDOMClass {
    generateTable() {
        let t1 = performance.now();
        let wrapper = document.getElementsByClassName('wrapper')[0];
        let tbl = document.createElement('table');
        tbl.id = 'songTable';
        this.createHeader((header) => tbl.appendChild(header)); //Append Header to Table

        let tbody = document.createElement('tbody');

        let num = songs.length - 1;
        wrapper.appendChild(tbl);
        tbl.appendChild(tbody)
        this.createBody(num, songs, tbody, () => {
            this.createEventListeners();
            let t2 = performance.now();
            console.log('Table Gen: ' + (t2 - t1) / 1000 + ' seconds');
            alert('Done Function');
        });
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
    createBody(iterator, array, tbody, callback) {

        let location = array[iterator]
        this.parseMetadata(location, (results) => {
            let metadata = results;
            this.createMetadataArray(metadata, location, (array) => {
                let metadataArr = array;

                let tr = document.createElement('tr');

                tr.addEventListener('dblclick', () => {
                    melodii.loadSong(location);
                    melodiiCNTRL.toggle();
                })
                tr.addEventListener('click', () => {
                    this.giveActive(tr);
                    this.currentActive = tr;
                })

                for (let i = 0; i < 6; i++) {
                    let td = document.createElement('td');
                    td.appendChild(document.createTextNode(metadataArr[i]));
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            })
            if (iterator == 0) {
                callback();
            } else {
                this.createBody(--iterator, array, tbody, callback);
            }
        })
    }
    giveActive(element) {
        if (this.currentActive) {
            this.currentActive.classList.remove('tableActive');
            element.classList.add('tableActive');
        } else {
            element.classList.add('tableActive');
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
    createMetadataArray(metadata, location, callback) {
        let duration;
        if (metadata.format.duration == null) {

            this.makeURLCompatible(location, (res) => {
                let getDuration = new Audio(res);
                getDuration.onloadedmetadata = () => {
                    duration = getDuration.duration;
                    let minutes = ~~((duration % 3600) / 60);
                    let seconds = ~~(duration % 60)
                    if (seconds < 10) seconds = '0' + seconds;
                    let time = `${minutes}:${seconds}`;
                    try { metadata.common.genre[0] } catch (e) { metadata.common.genre = [''] };
                    let metadataArr = [
                        metadata.common.artist,
                        metadata.common.title,
                        metadata.common.album,
                        metadata.common.year,
                        metadata.common.genre[0],
                        time
                    ]
                    callback(metadataArr)

                }
            });
        } else {
            duration = metadata.format.duration
            let minutes = ~~((duration % 3600) / 60);
            let seconds = ~~(duration % 60)
            if (seconds < 10) seconds = '0' + seconds;
            let time = `${minutes}:${seconds}`;
            try { metadata.common.genre[0] } catch (e) { metadata.common.genre = [''] };
            let metadataArr = [
                metadata.common.artist,
                metadata.common.title,
                metadata.common.album,
                metadata.common.year,
                metadata.common.genre[0],
                time
            ]
            callback(metadataArr)
        };
    }
    createEventListeners() {
        document.onkeydown = (e) => this.keyDown(e);
    }
    keyDown(e) {
        let table = document.getElementById('songTable');
        let tbody = table.childNodes[1];
        if (e.keyCode == '40') {
            e.preventDefault();
            //Move "ACTIVE" class down one.
            let nodes = tbody.childNodes;
            let list = nodes.length;
            let currentNode = document.getElementsByClassName('tableActive')[0];
            let nextNode;
            for (let i = 0; i < list; i++) {
                if (nodes[i] === currentNode) {
                    if (i + 1 < list) {
                        nextNode = nodes[i + 1];
                        currentNode.classList.remove('tableActive');
                        nextNode.classList.add('tableActive');
                        this.currentActive = nextNode;
                        nextNode.focus();
                    } else {
                        //Nothing Happens, and things make sense.
                    }
                    break;
                }
            }

        } else if (e.keyCode == '38') {
            e.preventDefault();
            let nodes = tbody.childNodes;
            let list = nodes.length;
            let currentNode = document.getElementsByClassName('tableActive')[0];
            let nextNode;
            for (let i = 0; i < list; i++) {
                if (nodes[i] === currentNode) {
                    if (i > 0) {
                        nextNode = nodes[i - 1];
                        currentNode.classList.remove('tableActive');
                        nextNode.classList.add('tableActive');
                        this.currentActive = nextNode;
                        nextNode.focus();
                    } else {
                        //Nothing happens, you'd be giving active focus to a nonexistent row
                    }
                    break;
                }
            }
        }
        if (e.keyCode == '13') {
            let dblClickEvent = new MouseEvent("dblclick", {
                "view": window,
                "bubbles": true,
                "cancelable": false
            })
            e.preventDefault();
            //Play the Song associated with the highlighted Table Row
            this.currentActive.dispatchEvent(dblClickEvent);
        }
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