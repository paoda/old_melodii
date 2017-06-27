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
        //
    }

}

const melodiiDOM = new melodiiDOMClass;