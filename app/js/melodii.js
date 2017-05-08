'use strict';
var metadataObj = {};
//melodii Class
class melodiiClass {

    parseMetadata() {
        /*
            CHANGE ONCE JSON METADATA STORAGE IS WORKING
        */
        let fileStream = fs.createReadStream(this.location);
        console.log('Read Stream Opened.');
        let metadataParser = mm(fileStream, (err, metadata) => {
            fileStream.close();
            console.log('Read Stream Closed.');
            if (err) throw err;
            this.metadata = null;
            this.metadata = metadata;
            eventEmitter.emit('Metadata Done');
        });
    }

    getAlbumArt() {
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
    getLocation(location) {
        this.location = location;
    }

    loadSong(location) {
        melodii.getLocation(location); //Location of file now available to melodii + melodiiCNTRL
        melodii.parseMetadata(); //Loads metadata to property of melodii

        eventEmitter.on('Metadata Done', () => {
            melodii.getAlbumArt(); //Loads Album art
        });
        melodiiCNTRL.load(); //Loads song to musicPlayer
    }
    saveJSON(object, location) {
        let json = JSON.stringify(object);

        fs.writeFile(location, json, 'utf8', (err) => {
            if (err) throw err;
            console.log('JSON File Saved.')
        })
    }
    loadJSON(location) {
        fs.readFile(location, 'utf8', (err, data) => {
            if (err) throw err;
            return data;
        })
    }
    saveAllMetadata(file, object, num) {
        if (typeof aniToggle === 'undefined' || aniToggle === null){
            num--;
            var aniToggle = true;
        }
        let stream = fs.createReadStream(file[num]);
        let metadataParser = mm(stream, (err, metadata) => {
            if (err) throw err;
            stream.close();

            delete metadata.picture;
            object[`${num}`] = metadata;

            if (num == 0) {
                console.log('Scanned All Metadata');

                let json = JSON.stringify(object);
                
                aniToggle = null;
                return json;
            } else {
                melodii.saveAllMetadata(file, object, --num);
            }
        })
    }
}

const melodii = new melodiiClass;