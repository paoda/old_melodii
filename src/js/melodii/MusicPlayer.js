'use strict';

var mp = new Audio();

export default class MusicPlayer {
    constructor() {
        this.audioElement = mp;
        this.ispaused = false;
    }
    stop() {
        this.pause();
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
    load(url) {
        if (!this.audioElement.paused) this.pause();
        this.audioElement.src = url;
        this.audioElement.load();
    }
}