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

        this.savedJSX = false; //Will be set to true once this.headJSX and this.bodyJSX exist.

        this.loadTableObject.bind(this);
        this.parseHead.bind(this);
        this.parseBody.bind(this);

        let self = this;
        (function() { //https://developer.mozilla.org/en-US/docs/Web/Events/resize
            window.addEventListener('resize', throttler, false);
          
            var resizeTimeout;
            function throttler() {
              // ignore resize events as long as an resizeHandler execution is in the queue
              if ( !resizeTimeout ) {
                resizeTimeout = setTimeout(function() {
                  resizeTimeout = null;
                  self.forceUpdate();
               
                 // The resizeHandler will execute at a rate of 15fps
                 }, 66);
              }
            }
          }());
    }
    measureText(text, font) { //https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
        let canvas = this.canvas || (this.canvas = document.createElement('canvas'));
        let ctx = canvas.getContext('2d');
        
        ctx.font = font;
        let metrics = ctx.measureText(text);
        return metrics.width;
    }
    average(arr) {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        return total / arr.length;
    }
    median(arr) {
        arr.sort((a, b) => {return a - b;});

        let half = ~~(arr.length /2);

        if (arr.length % 2) return arr[half];
        else return (arr[half -1] + arr [half]) / 2.0;
    }
    mode(arr) { //https://codereview.stackexchange.com/a/68431
        return arr.reduce(function(current, item) {
            var val = current.numMapping[item] = (current.numMapping[item] || 0) + 1;
            if (val > current.greatestFreq) {
                current.greatestFreq = val;
                current.mode = item;
            }
            return current;
        }, {mode: null, greatestFreq: -Infinity, numMapping: {}}, arr).mode;
    }
    truncateText(text, maxWidth, font) {
        let width = this.measureText(text, font);

        if (width > maxWidth) {
            //text needs truncating...
            let charWidths = [];
            let ellipsisWidth = this.measureText('...', font);

            //get Average width of every char in string
            for (let char in text) if (typeof char === 'string') charWidths.push(this.measureText(char, font));
            
            // let charWidth = this.median(charWidths);
            let charWidth = this.average(charWidths);
            // let charWidth = this.mode(charWidths);

            //Find out how many of these characters fit in max Width;
            let maxChars = (maxWidth - ellipsisWidth) / charWidth;

            let truncated = '';

            try {
                truncated = text.substr(0, maxChars);
            } catch(e) {
                // console.warn('\n' + e + ' ASSUMPTION: Melodii width shrunk to extremely small proportions');
                // console.warn('Text: "' + text + '"\nMaximum Width: ' + maxWidth + 'px.\nMaximum Space for Characters: ' + maxChars + 'px.');
            }
            return truncated + '...';
        }else return text;
    }
    loadTableObject(obj) {
        this.headJSX = this.parseHead(obj.thead.tr);
        this.bodyJSX = this.parseBody(obj.tbody);

        if (!this.savedJSX) {
            this.saveTableObject(obj);
            this.savedJSX = true;
        }
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
        console.log('<td> max-width: ' + maxWidth + 'px.');

        let temp = arr.map( (obj) =>
        <tr key={obj.location} data-filepath={obj.location} onClick={this.handleClick.bind(this)} onKeyDown={this.handleKeyDown.bind(this)} tabIndex='0'>
        <td>{this.truncateText(obj.artist, maxWidth, 'Roboto')}</td>
        <td>{this.truncateText(obj.title, maxWidth, 'Roboto')}</td>
        <td>{this.truncateText(obj.album, maxWidth, 'Roboto')}</td>
        <td>{this.truncateText(obj.year, maxWidth, 'Roboto')}</td>
        <td>{this.truncateText(obj.genre[0], maxWidth, 'Roboto')}</td>
        <td>{this.truncateText(obj.time, maxWidth, 'Roboto')}</td>
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
        console.log('Focus:' + e.currentTarget.dataset.filepath + ' Key: ' + e.key);

        if (e.keyCode === 13 && e.currentTarget === active) { //Active and Presses Enter
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