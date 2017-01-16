var reader = new FileReader();

reader.addEventListener('loadend', () => {
    var player = AV.Player.fromFile('C:\\Users\\Rekai\\Google Drive\\Music\\Moe Shop\\Pure Pure\\Moe Shop - Pure Pure - 05 Kawaii Desho.flac');
player.play();
})
