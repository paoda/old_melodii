/*function broken() {
   var readStream = fs.createReadStream('./example.flac')
   var result;
   readStream.on('open', () => {
       readStream.pipe(result);
   })
   console.log(result);
    var playdough = AV.Player.fromBuffer(result);
    playdough.preload();

    playdough.on('ready', () => {
        console.log('Aurora.js Ready');
        playdough.play();
    })
} */
createMusicPlayer(); //Assigns Default stuffs to musicPlayer
function createMusicPlayer() {
    musicPlayer.src = playlist.songs[0].directory; //Loads First song in .json file;
    musicPlayer.volume = 0.5;
    musicPlayer.load();
}
var auroraPlayer;

function aurora() {
     fs.readFile('./example.flac', (err, rekai) => {
        if (err) throw err;
        console.log(rekai);
        auroraPlayer = AV.Player.fromBuffer(rekai);
        
     });

}