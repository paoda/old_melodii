var musicPlayer = new Audio(); //Audio Player

function currentSong(location, artist, album, albumArt, year, genre, time) {
    //properties
    this.location = location;
    this.artist = artist;
    this.alum = album;
    this.year = year;
    this.genre = genre;
    this.time = time;

    //methods
    this.loadSong() {
        musicPlayer.load(location);
    }
}