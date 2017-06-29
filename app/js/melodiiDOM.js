'use strict';

class melodiiDOMClass {
    getTable() {
        let tableTitle = ["Artist", "Title", "Album", "Year", "Genre", "Time"];
        let table = document.createElement('table');
        document.body.insertBefore(table, document.getElementById('footer')) //Creates table Where I want it.

        console.log('Started Creation of Table.');

        //This is to create the Title Row which contains things like song information and such.
        let titleRow = document.createElement('tr');
        for (let i = 0; i < 6; i++) {
            let cellTitle = document.createElement('th');
            let cellTitleText = document.createTextNode(tableTitle[i]);

            cellTitle.appendChild(cellTitleText);
            titleRow.appendChild(cellTitle);
        }
        table.appendChild(titleRow);

        //This is for the song information of each individual song.



        /*for (let i = 0; i <= songs.length; i++) {
            let row = document.createElement('tr');

            melodii.location = songs[i];
            let songInfo = melodii.parseMetadata()
            eventEmitter.on('metadataDone', () => {
                console.log(songInfo);
            })
        } */

        console.log('Creation of Table Complete');
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
            console.log('URL Compatible: ' + (t2 - t1) / 1000 + ' seconds.');
            
            callback(string);
        }
    }

}

const melodiiDOM = new melodiiDOMClass;