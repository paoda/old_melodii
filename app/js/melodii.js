'use strict';

//melodii Object
function melodiiObj() {}
melodiiObj.prototype.parseMetadata = function () {
    let fileStream = fs.createReadStream(this.location);
    console.log('Read Stream Opened.');
    let metadataParser = mm(fileStream, (err, metadata) => {
        if (err) throw err;
        this.metadata = metadata;
        eventEmitter.emit('metadataDone');
    });

    eventEmitter.on('metadataDone', () => {
        fileStream.close();
        console.log('Read Stream Closed.');
    });
}

melodiiObj.prototype.getAlbumArt = function () {
    console.log(this.metadata);
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
    eventEmitter.on('metadataDone', () => { //We have to wait until metadata is done loading
        melodii.getAlbumArt(); //Loads Album art
    });
    melodiiCNTRL.load(); //Loads song to musicPlayer
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

function melodiiDOM() {};
melodiiDOM.prototype.getTable = function() {
    let body = document.getElementsByTagName('body')[0]; //reference for body tag.

    console.log('Started Creation of Table.');

    for (i = 0; i <= songs.length; i++) {

    }

}

const melodiiCNTRL = new melodiiCNTRLObj();
const melodii = new melodiiObj();