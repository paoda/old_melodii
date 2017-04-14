var musicPlayer = new Audio(); //Audio musicPlayer

'use strict';

class melodii {
    constructor(location) {
        this.location = location;
    }

    metadata() {
        let fileStream = fs.createReadStream(this.location);
        let metadataParser = mm(fileStream, (err, metadata) => {
            if (err) throw err;
            console.log(metadata);
            this.metadata = metadata;
        })
        filestream.close();
    }

    createAlbumArt() {
        if (this.metadata.picture.length > 0) {
            let picture = metadata.picture[0];
            let url = URL.createObjectURL(new Blob([picture.data], {
                'type': 'image/' + picture.format
            }));
            this.albumArt = url;
        } else {
            throw "Metadata has Album Art";
        }
    }

    load() {
        musicPlayer.load(this.location);
    }
    play() {
        musicPlayer.play();
    }
    volUp() {
        musicPlayer.volume -= 0.02;
        //volRange.value = musicPlayer.volume;
        console.log('New Volume:' + musicPlayer.volume);
    }
    volDown() {
        musicPlayer.volume += 0.02;
        //volRange.value = musicPlayer.volume;
        console.log('New Volume:' + musicPlayer.volume);
    }
    updateVolume() { //used for slider control
       // musicPlayer.volume = volRange.value;
        console.log('new Volume:' + musicPlayer.volume);
    }
}