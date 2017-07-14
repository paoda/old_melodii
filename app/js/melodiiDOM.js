'use strict';

class MelodiiDOM {
    generateTable() {
        if (document.getElementById('songTable')) {
            let tbl = document.getElementById('songTable');
            let wrapper = document.getElementsByClassName('wrapper')[0];
            wrapper.removeChild(tbl); //Deletes Previous Table
        }
        let t1 = performance.now();
        let wrapper = document.getElementsByClassName('wrapper')[0];
        let tbl = document.createElement('table');
        tbl.id = 'songTable';
        this.createHeader((header) => tbl.appendChild(header)); //Append Header to Table

        let tbody = document.createElement('tbody');

        let num = Global.songs.length - 1;
        wrapper.appendChild(tbl);
        tbl.appendChild(tbody);
        this.createBody(num, Global.songs, tbody, () => {
            this.createEventListeners();
            let t2 = performance.now();
            console.log('Table Gen: ' + (t2 - t1) / 1000 + ' seconds');
            alert('Done Function');
        });
    }
    createHeader(callback) {
        let tableTitle = ['Artist', 'Title', 'Album', 'Year', 'Genre', 'Time'];
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

        let location = array[iterator];
        this.parseMetadata(location, (results) => {
            let metadata = results;
            this.createMetadataArray(metadata, location, (array) => {
                let metadataArr = array;

                let tr = document.createElement('tr');

                tr.addEventListener('dblclick', () => {
                    Global.melodii.loadSong(location);
                    Global.melodiiCNTRL.toggle();
                });
                tr.addEventListener('click', () => {
                    this.giveActive(tr);
                    this.currentActive = tr;
                });

                for (let i = 0; i < 6; i++) {
                    let td = document.createElement('td');
                    td.appendChild(document.createTextNode(metadataArr[i]));
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            });
            if (iterator === 0) {
                callback();
            } else {
                this.createBody(--iterator, array, tbody, callback);
            }
        });
    }
    giveActive(element) {
        if (this.currentActive) {
            this.currentActive.classList.remove('tableActive');
            element.classList.add('tableActive');
        } else {
            element.classList.add('tableActive');
        }
        element.id = 'scrollHere';
    }
    parseMetadata(location, callback) {
        let stream = Global.fs.createReadStream(location);
        Global.mm.parseStream(stream, {
            native: true
        }, (err, metadata, uAs) => {
            stream.close();
            uAs.close();
            if (err) throw err;
            callback(metadata);
        });
    }
    createMetadataArray(metadata, location, callback) {
        let duration;
        if (!metadata.format.duration) {
            this.makeURLCompatible(location, (res) => {
                let artist;
                let title;
                let album;
                let year;
                let genre;
                let time;
                let length = 15;

                let getDuration = new Audio(res);
                getDuration.onloadedmetadata = () => {
                    duration = getDuration.duration;
                    let minutes = Math.floor((duration % 3600) / 60);
                    let seconds = Math.floor(duration % 60);
                    if (seconds < 10) seconds = '0' + seconds;
                    time = `${minutes}:${seconds}`;

                    if (!metadata.common.artist) {
                        artist = '';
                    } else {
                        artist = metadata.common.artist;
                        if (artist.length > length) artist = artist.substring(0, length) + '...';
                    }
                    if (!metadata.common.title) {
                        title = '';
                    } else {
                        title = metadata.common.title;
                        if (title.length > length) title = title.substring(0, length) + '...';
                    }
                    if (!metadata.common.album) {
                        album = '';
                    } else {
                        album = metadata.common.album;
                        if (album.length > length) album = album.substring(0, length) + '...';
                    }
                    if (!metadata.common.year) {
                        year = '';
                    } else {
                        year = metadata.common.year;
                    }
                    if (!metadata.common.genre) {
                        genre = '';
                    } else {
                        genre = metadata.common.genre[0];
                        if (genre > length) genre = genre.substring(0, length) + '...';
                    }
                    let metadataArr = [
                        artist,
                        title,
                        album,
                        year,
                        genre,
                        time
                    ];
                    callback(metadataArr);
                };
            });
        } else {
            let artist;
            let title;
            let album;
            let year;
            let genre;
            let length = 15;
            duration = metadata.format.duration;
            let minutes = Math.floor((duration % 3600) / 60);
            let seconds = Math.floor(duration % 60);
            if (seconds < 10) seconds = '0' + seconds;
            let time = `${minutes}:${seconds}`;
            if (!metadata.common.artist) {
                artist = '';
            } else {
                artist = metadata.common.artist;
                if (artist.length > length) artist = artist.substring(0, length) + '...';
            }
            if (!metadata.common.title) {
                title = '';
            } else {
                title = metadata.common.title;
                if (title.length > length) title = title.substring(0, length) + '...';
            }
            if (!metadata.common.album) {
                album = '';
            } else {
                album = metadata.common.album;
                if (album.length > length) album = album.substring(0, length) + '...';
            }
            if (!metadata.common.year) {
                year = '';
            } else {
                year = metadata.common.year;
            }
            if (!metadata.common.genre) {
                genre = '';
            } else {
                genre = metadata.common.genre[0];
                if (genre > length) genre = genre.substring(0, length) + '...';
            }
            let metadataArr = [
                artist,
                title,
                album,
                year,
                genre,
                time
            ];
            callback(metadataArr);
        }
    }
    createEventListeners() {
        document.onkeydown = (e) => this.keyDown(e);
    }
    keyDown(e) {
        let table = document.getElementById('songTable');
        let tbody = table.childNodes[1];
        if (e.keyCode === '40') {
            e.preventDefault();
            //Move 'ACTIVE' class down one.
            window.location.hash = '';
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
                        this.currentActive.id = '';
                        currentNode.id = '';
                        nextNode.id = 'scrollHere';
                        window.location.hash = 'scrollHere';
                        this.currentActive = nextNode;
                        nextNode.focus();
                    }
                    break;
                }
            }

        } else if (e.keyCode === '38') {
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
                        nextNode.id = 'scrollHere';
                        window.location.hash = 'scrollHere';
                        this.currentActive = nextNode;
                        nextNode.focus();
                    }
                    break;
                }
            }
        }
        if (e.keyCode === '13') {
            e.preventDefault();
            if (Global.musicPlayer.duration > 0) {
                if (this.currentActive.childNodes[1].innerHTML === Global.melodii.metadata.common.title) {
                    Global.melodiiCNTRL.toggle();
                } else {
                    let dblClickEvent = new MouseEvent('dblclick', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': false
                    });
                    //Play the Song associated with the highlighted Table Row
                    this.currentActive.dispatchEvent(dblClickEvent);
                }
            } else {
                let dblClickEvent = new MouseEvent('dblclick', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': false
                });
                //Play the Song associated with the highlighted Table Row
                this.currentActive.dispatchEvent(dblClickEvent);
            }
        }
    }
    loadSongInfo() {
        let length = 40;
        let title = Global.melodii.metadata.common.title;
        let artist = Global.melodii.metadata.common.artist;
        let album = Global.melodii.metadata.common.album;
        let string = `${title} - ${artist}`;
        if (string.length > length) string = string.substr(0, length) + '...';
        Global.songInfo.innerHTML = string;
    }
    removeSongInfo() {
        Global.songInfo.innerHTML = null;
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
            ];
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
            ];

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

Global.melodiiDOM = new MelodiiDOM();