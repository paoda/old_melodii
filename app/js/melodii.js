'use strict';

//melodii Object
function melodiiObj() {}
melodiiObj.prototype.parseMetadata = function () {
    let fileStream = fs.createReadStream(this.location);
    console.log('Read Stream Opened.');
    let metadataParser = mm(fileStream, (err, metadata) => {
        fileStream.close();
        console.log('Read Stream Closed.');
        if (err) throw err;
        this.metadata = null;
        this.metadata = metadata;
    });
}

melodiiObj.prototype.getAlbumArt = function () {
    if (this.metadata.picture.length > 0) {
        let picture = this.metadata.picture[0];
        let url = URL.createObjectURL(new Blob([picture.data], {
            'type': 'image/' + picture.format
        }));
        let img = document.getElementById('albumImg');
        img.src = url;
        this.albumArt = url;

    } else {
        throw "Metadata does not have album art";
    }
}
melodiiObj.prototype.getLocation = function (location) {
    this.location = location;
}
melodiiObj.prototype.loadSong = function (location) {
    melodii.getLocation(location); //Location of file now available to melodii + melodiiCNTRL
    melodii.parseMetadata(); //Loads metadata to property of melodii

    melodii.getAlbumArt(); //Loads Album art
    melodiiCNTRL.load(); //Loads song to musicPlayer
}
melodiiObj.prototype.saveJSON = function (name, location) {

}
melodiiObj.prototype.loadJSON = function (location) {

}
melodiiObj.prototype.saveAllMetadata = function () {
    //Gets All metadata and saves to JSON File
    let allMetadata = [];
    let inc = 0;

    do {
        let tableStream = fs.createReadStream(songs[inc]);
        let metadataParser = mm(tableStream, (err, metadata) => {
            if (err) throw err;
            allMetadata.push(metadata);
            tableStream.close();
        })
        inc++;
    } while (inc < songs.length);



    console.log(allMetadata);

    let json = JSON.stringify(allMetadata);

    console.log('JSON: ' + json);

    fs.writeFile('./app/json/metadata.json', json, 'utf8', (err) => {
        if (err) throw err;
        console.log('metadata.json Saved.');
    })
}


//melodiiCNTRL Object
function melodiiCNTRLObj() {}
melodiiCNTRLObj.prototype.load = function () {
    musicPlayer.src = melodii.location;
}
melodiiCNTRLObj.prototype.volUp = function () {
    musicPlayer.volume += 0.02;
    volRange.value = musicPlayer.volume;
    console.log('New Volume:' + musicPlayer.volume);
}
melodiiCNTRLObj.prototype.volDown = function () {
    musicPlayer.volume -= 0.02;
    volRange.value = musicPlayer.volume;
    console.log('New Volume:' + musicPlayer.volume);
}
melodiiCNTRLObj.prototype.sliderVolume = function () { //used for slider control
    musicPlayer.volume = volRange.value;
    console.log('new Volume:' + musicPlayer.volume);
};
melodiiCNTRLObj.prototype.toggle = function () {
    if (musicPlayer.paused) {
        musicPlayer.play();
        toggle.removeChild(toggleIcon);
        toggleIcon = document.createElement('i'); //Creating Pause Icon
        toggleIcon.className = 'fa fa-pause';
        toggleIcon.id = 'toggleIcon';
        toggleIcon.setAttribute("aria-hidden", true);
        toggle.appendChild(toggleIcon);

        volRange.value = musicPlayer.volume;
    } else {
        musicPlayer.pause();
        toggle.removeChild(toggleIcon);
        toggleIcon = document.createElement('i'); //Creating Play Icon
        toggleIcon.className = 'fa fa-play';
        toggleIcon.id = 'toggleIcon';
        toggleIcon.setAttribute('aria-hidden', true);
        toggle.appendChild(toggleIcon);
    }
}

function melodiiDOMObj() {};
melodiiDOMObj.prototype.getTable = function () {
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
const melodiiDOM = new melodiiDOMObj();
const melodiiCNTRL = new melodiiCNTRLObj();
const melodii = new melodiiObj();
