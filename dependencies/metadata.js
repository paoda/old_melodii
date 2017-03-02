 var metadataTest; //holds the metadata objects. TODO send to .json file;

 /* function parseMetadata() {
     for (let i = 0; i < fixedSongs.length; i++) {
         musicFileStream = fs.createReadStream(fixedSongs[i]);
         metadataParser = mm(musicFileStream, (err, metadata) => {
             if (err) throw err;
             console.log(metadata);
             metadataTest = metadata;
         })
     }
     musicFileStream.close();
 } */

 function parseMetadata(insertArgHere) {
     let musicFileStream = fs.createReadStream(insertArgHere);
     let metadataParser = mm(musicFileStream, (err, metadata) => {
         if (err) throw err;
         console.log(metadata);
         metadataTest = metadata;

         if (metadata.picture.length > 0) {
             var picture = metadata.picture[0];
             var url = URL.createObjectURL(new Blob([picture.data], {
                 'type': 'image/' + picture.format
             }));
             var image = document.getElementById('albumImg');
             image.src = url;
         }

         musicFileStream.close();
     });
 }