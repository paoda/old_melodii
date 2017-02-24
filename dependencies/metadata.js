
//These variables only need to be crated if music is going to be parsed. 
var musicFileStream; //Holds readableStream that will stream data to the metadata parser
var metadataParser; //Holds the musicmetadata function that will read metadata
var metadataTest; //holds the metadata objects. TODO send to .json file;

function parseMetadata() {
    for (let i = 0; i < fixedSongs.length; i++) {
        musicFileStream = fs.createReadStream(fixedSongs[i]);
        metadataParser = mm(musicFileStream, (err, metadata) => {
            if (err) throw err;
            console.log(metadata);
            metadataTest = metadata;
        })
    }
    musicFileStream.close();
}