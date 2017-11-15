'use strict';

var mp = new Audio();

export default class MusicPlayer {
    constructor() {
        this.audioElement = mp;
        this.ispaused = false;

        let currentSong = null;
        let pastSongs = [];

        Object.defineProperty(this.audioElement, 'currentSong', {
            configurable: true,
            get: () => {
                return currentSong;
            },
            set: (value) => {
                if (!currentSong) pastSongs.push(currentSong);
                console.log(pastSongs);
                currentSong = value;
            }
        });

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
    load(obj) {
        let url = obj.location;
        this.audioElement.currentSong = obj;
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