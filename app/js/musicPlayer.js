'use strict';

function melodiiObj(location) {
    this.location = location;
}

melodiiObj.prototype.metadata = function () {
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

melodiiObj.prototype.createAlbumArt = function () {
    console.log(this.metadata);
    if (this.metadata.picture.length > 0) {
        let picture = this.metadata.picture[0];
        let url = URL.createObjectURL(new Blob([picture.data], {
            'type': 'image/' + picture.format
        }));
        this.albumArt = url;
    } else {
        throw "Metadata does not have album art";
    }
}

function melodiiCNTRLObj() {}
melodiiCNTRLObj.prototype.load = function () {
    musicPlayer.src = this.location;
}
melodiiCNTRLObj.prototype.play = function () {
    musicPlayer.play();
}
melodiiCNTRLObj.prototype.volUp = function () {
    musicPlayer.volume -= 0.02;
    //volRange.value = musicPlayer.volume;
    console.log('New Volume:' + musicPlayer.volume);
}
melodiiCNTRLObj.prototype.volDown = function () {
    musicPlayer.volume += 0.02;
    //volRange.value = musicPlayer.volume;
    console.log('New Volume:' + musicPlayer.volume);
}
melodiiCNTRLObj.prototype.updateVolume = function () { //used for slider control
    // musicPlayer.volume = volRange.value;
    console.log('new Volume:' + musicPlayer.volume);
};
const melodiiCNTRL = new melodiiCNTRLObj();
const melodii = new melodiiObj();