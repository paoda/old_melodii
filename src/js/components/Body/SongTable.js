'use strict';
import React from 'react';
import Song from '../../melodii/Song';
import MusicPlayer from '../../melodii/MusicPlayer';
import Settings from '../../melodii/Settings';
import fs from 'fs';

var settings = new Settings();

let general;
var musicPlayer;

let active = document.createElement('tr');
active.classList.toggle('active');

settings.wait((res) => {
    general = res;
    musicPlayer = new MusicPlayer();
});

export default class SongTable extends React.Component {
    constructor(props) {
        super(props);

        this.loadTableObject.bind(this);
        this.parseHead.bind(this);
        this.parseBody.bind(this);
    }
    measureText(text, font) { //https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
        let canvas = this.canvas || (this.canvas = document.createElement('canvas'));
        let ctx = canvas.getContext('2d');
        
        ctx.font = font;
        let metrics = ctx.measureText(text);
        return metrics.width;
    }
    truncateText(text, maxWidth, font) {
        let width = this.measureText(text, font);

        if (width > maxWidth) return 'TOO LONG!';
        else return text;
        
    }
    loadTableObject(obj) {
        this.headJSX = this.parseHead(obj.thead.tr);
        this.bodyJSX = this.parseBody(obj.tbody);
        this.saveTableObject(obj);
    }
    saveTableObject(obj) {
        if (!general.table) {
            let path;
            if (settings.misc.os === 'win32') path = settings.misc.appdata + '\\melodii\\user\\table.json';
            else path = settings.misc.appdata + '/melodii/user/table.json';
            
            fs.writeFile(path, JSON.stringify(obj), (err) => {
                if (err) throw err;
    
                general.table = true;
                settings.save(general);
                console.log('Table Saved!');
    
            });
        }
    }
    parseHead(arr) {
        return arr.map((string) => <th key={string}> {string} </th>);
    }
    parseBody(arr) {
        let maxWidth = (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 6);
        console.log("<td> max-width: " + maxWidth + "px.");

        let temp = arr.map( (obj) =>
        <tr key={obj.location} data-filepath={obj.location} onClick={this.handleClick.bind(this)} onKeyDown={this.handleKeyDown.bind(this)} tabIndex="0">
        <td>{this.truncateText(obj.artist, maxWidth, "Roboto")}</td>
        <td>{this.truncateText(obj.title, maxWidth, "Roboto")}</td>
        <td>{this.truncateText(obj.album, maxWidth, "Roboto")}</td>
        <td>{this.truncateText(obj.year, maxWidth, "Roboto")}</td>
        <td>{this.truncateText(obj.genre[0], maxWidth, "Roboto")}</td>
        <td>{this.truncateText(obj.time, maxWidth, "Roboto")}</td>
        </tr>);
        return temp;
    }
    handleClick(e) {
        if (active !== e.currentTarget) {
            active.classList.toggle('active');
            e.currentTarget.classList.toggle('active');
            active = e.currentTarget;
        } else {
            let filepath = e.currentTarget.dataset.filepath;
            musicPlayer.load(new Song(filepath, true));
            musicPlayer.play();
        }
    }
    handleKeyDown(e) {
        console.log(e.key);

        if (e.key === "Enter" && e.currentTarget === active) { //Active and Presses Enter
            let filepath = e.currentTarget.dataset.filepath;
            musicPlayer.load(new Song(filepath, true));
            musicPlayer.play();
        }
    }
    render() {
        this.loadTableObject(this.props.obj);
        return (
            <table id='songTable'>
                <thead>
                    <tr>
                        {this.headJSX}
                    </tr>
                </thead>
                <tbody>
                    {this.bodyJSX}
                </tbody>
            </table>
        )
    }
}