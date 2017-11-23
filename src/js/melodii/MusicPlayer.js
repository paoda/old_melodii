'use strict';

var mp = new Audio();
var loadedSong; 

export default class MusicPlayer {
    constructor() {
        this.audioElement = mp;
        this.ispaused = false;

        let pastSongs = [];
    }
    getLoadedSong() {
        return loadedSong;
    }
    stop() {
        this.pause();
        this.ispaused = false;
        this.audioElement.currentTime = 0.0;
    }
    pause() {
        this.audioElement.pause();
        this.ispaused = true;
    }
    play() {
        if (this.ispaused) {
            this.audioElement.play();
            this.ispaused = false;
        }
    }
    editDOM() {

    }
    load(obj) {
        let url = obj.location;
        loadedSong = obj;
        if (!this.ispaused) this.pause();
        this.audioElement.src = url;
        this.audioElement.load();
    }
    seek(pos) {
        this.audioElement.currentTime = pos;
    }
    currentTime() {
        return this.audioElement.currentTime;
    }
    duration() {
        return this.audioElement.duration;
    }
    setVolume(num) {
        if (num <= 1) {
            this.audioElement.volume = num;
        }else if ( num < 0) {
            console.error(num + ' is smaller than 0');
        }else {
            console.error(num + ' is greater than 1');
        }
    }
}