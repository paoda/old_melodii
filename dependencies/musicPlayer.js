var musicPlayer = new Audio()
function works() {
    musicPlayer.src = 'C:\\Users\\musuk\\Google Drive\\Music\\Panda Eyes & Teminite\\Highscore\\Teminite & Panda Eyes - Highscore.mp3';
    musicPlayer.volume = 0.5;
    musicPlayer.load();
}

function broken() {
    var playdough = AV.Player.fromURL('C:\\Users\\Rekai\\Google Drive\\Music\\Aimer\\Ninelie\\01 ninelie.mp3');
    playdough.play();
}