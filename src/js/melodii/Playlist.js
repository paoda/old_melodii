'use strict';
import Song from './Song';
import MusicPlayer from './MusicPlayer';
import Settings from './Settings';

var settings = new Settings();
var mp = new MusicPlayer();

export default class Playlist {
    constructor(name, songs) {
        if (name) this.name = name; //Name of Playlist
        else this.name = "No Name";

        if (songs) this.list = songs; //If Given songs (in an array of course) set them.
        else this.list = [];


        this.position = 0;
    }
    getCurrentSong() {
        return this.list[this.position];
    }
    getPreviousSong() {
        if (this.position- 1 >= 0) return this.list[this.position - 1];
        else return undefined;
    }
    getNextSong() {
        if (this.position + 1 <= this.list.length) return this.list[this.position + 1];
        else return undefined;
    }
    getSong(index) {
        return this.list[index];
    }
    getPlaylist() {
        return this.list;
    }
    add(song) {
        let preExist = false;
        for (let i = 0; i < this.list.length; i++) {
            if (song.location === this.list[i].location) {
                preExist = true;
                console.warn('Song Already Exists in Playlist!');
            }
        }
        if (!preExist) this.list.push(song);
    }
    removeByIndex(index) {
        this.list.splice(index, 1);
    }
    removeByLocation(location) {
        for(var i = this.list.length - 1; i >= 0; i--) {
            if(this.list[i].location === location) {
               this.list.splice(i, 1);
            }
        }
    }
    rename(name) {
        this.name = name;
    }
    export() {
        return {
            name: this.name,
            songs: this.list
        };
    }
    static loadExisting(obj) {
        return new Playlist(obj.name, obj.songs)
    }
    static getRandomFromAll(done) {
        settings.wait((general) => {
            done(new Song(general.songs.filepaths[0].list[~~(Math.random() * general.songs.filepaths[0].list.length)], true));            
        });
    }
}
