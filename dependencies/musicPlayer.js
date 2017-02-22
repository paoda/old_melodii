var musicPlayer = new Audio()
function works() {
    musicPlayer.src = playlist.songs[0].directory;
    musicPlayer.volume = 0.5;
    musicPlayer.load();
}

function broken() {
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
}