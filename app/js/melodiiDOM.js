'use strict';
const songs = require('./songs');
const melodii = require('./melodii');
const melodiiCNTRL = require('./melodiiCNTRL');
const DOMElement = require('./DOMElement');
const fs = require('fs');
const mm = require('music-metadata');


class MelodiiDOM {
    constructor() {
        //TODO Move to DOMElement
        this.img = document.getElementById('albumImg');
        this.img.src = './img/noalbumart.png';
    }
    generateTable() {
        //TODO Move to DOMElement
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

        let num = songs.list.length - 1;
        wrapper.appendChild(tbl);
        tbl.appendChild(tbody);
        this.createBody(num, songs.list, tbody, () => {
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
                tr.setAttribute('data-location', location);

                tr.addEventListener('dblclick', () => {
                    this.currentMetadata = require('./melodii').loadSong(tr.getAttribute('data-location'));
                    melodiiCNTRL.toggle();
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
    }
    parseMetadata(location, callback) {
        let stream = fs.createReadStream(location);
        mm.parseStream(stream, {
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
                let getDuration = new Audio(res);
                getDuration.onloadedmetadata = () => {
                    let metadataArr;
                    metadata.format.duration = getDuration.duration;
                    this.checkMetadata(metadata, (array) => metadataArr = array);
                    callback(metadataArr);
                };
            });
        } else {
            let metadataArr;
            this.checkMetadata(metadata, (array) => metadataArr = array);
            callback(metadataArr);
        }
    }
    createEventListeners() {
        document.onkeydown = (e) => this.keyDown(e);
    }
    checkMetadata(metadata, callback) {
        let artist, title, album, year, genre, length = 15;
        let duration = metadata.format.duration;

        let minutes = Math.floor((duration % 3600) / 60);
        let seconds = Math.floor(duration % 60);
        if (seconds < 10) seconds = '0' + seconds;
        let time = `${minutes}:${seconds}`;

        // If the item You're looking for is nonexsitent mark it is nonexistent in the table by having nothing there.
        if (!metadata.common.artist) {artist = '';} else {
            artist = metadata.common.artist;
            if (artist.length > length) artist = artist.substring(0, length) + '...';
        } if (!metadata.common.title) {title = '';} else {
            title = metadata.common.title;
            if (title.length > length) title = title.substring(0, length) + '...';
        }if (!metadata.common.album) {album = '';} else {
            album = metadata.common.album;
            if (album.length > length) album = album.substring(0, length) + '...';
        }if (!metadata.common.year) {year = '';} else {
            year = metadata.common.year;
        }if (!metadata.common.genre) {genre = '';} else {
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
    keyDown(e) {
        let table = document.getElementById('songTable');
        let tbody = table.childNodes[1];
        if (e.keyCode === 40) {
            e.preventDefault();
            //Move 'ACTIVE' class down one.
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
                    }
                    break;
                }
            }

        } else if (e.keyCode === 38) {
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
                    }
                    break;
                }
            }
        }
        if (e.keyCode === 13) {
            //TODO Fix bug (Need to figure out how to replicate);
            e.preventDefault();
            if (Global.musicPlayer.duration > 0) {
                if (this.currentActive.childNodes[2].innerHTML === this.currentMetadata.common.title) {
                    melodiiCNTRL.toggle();
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
    loadSongInfo(metadata) {
        let length = 40;
        let title = metadata.common.title;
        let artist = metadata.common.artist;
        let album = metadata.common.album;
        let string = `${title} - ${artist}`;
        if (string.length > length) string = string.substr(0, length) + '...';
        DOMElement.songInfo.innerHTML = string;
    }
    removeSongInfo() {
        DOMElement.songInfo.innerHTML = null;
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
module.exports = new MelodiiDOM();