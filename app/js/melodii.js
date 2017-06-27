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
        mm.parseStream(fileStream, {native: true}, (err, metadata, uAs) => {
            uAs.close();
            if (err) throw err;
            this.metadata = null;
            this.metadata = metadata;

             this.getAlbumArt();
        });
    }

    getAlbumArt() {
        if (this.metadata.common.picture.length > 0) {
            let picture = this.metadata.common.picture[0];
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
        melodiiCNTRL.load(); //Loads song to musicPlayer
    }
    loadRandom() {
        let num = ~~(Math.random() * songs.length + 1);
        console.log(num); //Checking to see if Thiss will choose any number
        this.getLocation(songs[num]);
        this.parseMetadata();
        melodiiCNTRL.load();

    }
    saveJSON(object, location) {
        let json = JSON.stringify(object);

        fs.writeFile(location, json, 'utf8', (err) => {
            if (err) throw err;
            console.log('JSON File Saved.')
        })
    }
    saveArray(array, location) {
        let t1 = performance.now();
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
        let t2 = performance.now() 
        console.log("Time (.saveArray): " + (t2-t1) /1000 + " seconds");
    }
    loadJSON(location) {
        fs.readFile(location, 'utf8', (err, data) => {
            if (err) throw err;
            return data;
        })
    }
    /*saveMetadata(file, object, num) {
        if (this.doOnce == true) {
            num--;
            this.doOnce = false;
        }
        let stream = fs.createReadStream(file[num]);
        mm.parseStream(stream,{native: true}, (err, metadata, uAS) => {
            if (err) throw err;
            uAS.close();

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
    } */
    saveMetadata() {

    }
}

const melodii = new melodiiClass;