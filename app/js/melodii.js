'use strict';
var metadataObj = {};
//melodii Class
class melodiiClass {
    constructor() {
        this.doOnce = true;
    }
    parseMetadata() {
        /*
            CHANGE ONCE JSON METADATA STORAGE IS WORKING
        */
        let fileStream = fs.createReadStream(this.location);
        let metadataParser = mm(fileStream, (err, metadata) => {
            fileStream.close();
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
        this.getLocation(location); //Location of file now available to melodii + melodiiCNTRL
        this.parseMetadata(); //Loads metadata to property of melodii

        eventEmitter.on('Metadata Done', () => {
            this.getAlbumArt(); //Loads Album art
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
    saveArray(array, location) {
        var convArray = [];
        let file = fs.createWriteStream(location);
        file.on('error', (err) => {
            throw err
        });

        for (let i = 0; i < array.length; i++) {
            convArray.push(array[i]);

            if (i == array.length - 1) { //Probably not as efficient but is less of a hack than removing 1 from an array
                file.write(convArray[i]);
            } else {
                file.write(convArray[i] + ',\n');
            }
        }
        file.end();
    }
    loadJSON(location) {
        fs.readFile(location, 'utf8', (err, data) => {
            if (err) throw err;
            return data;
        })
    }
    saveMetadata(file, object, num) {
        if (this.doOnce == true) {
            num--;
            this.doOnce = false;
        }
        let stream = fs.createReadStream(file[num]);
        let metadataParser = mm(stream, (err, metadata) => {
            if (err) throw err;
            stream.close();

            delete metadata.picture;
            object[`${num}`] = metadata;

            if (num == 0) {
                this.doOnce = true;
                console.log('Scanned All Metadata');

                this.saveJSON(object, './app/user/metadata.json');
            } else {
                this.saveMetadata(file, object, --num);
            }
        })
    }
}

const melodii = new melodiiClass;