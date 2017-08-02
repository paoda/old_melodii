'use strict';
const eventEmitter = require('./eventEmitter');
const DOMElement = require('./DOMElement');
const melodii = require('./melodii');
const remote = require('electron').remote;

class LastFM {
    constructor() {
            this.api_key = Global.settings.general.lastfm.api_key;
            this.secret = Global.settings.general.lastfm.secret;

            const lastFmAPI = require('lastfmapi');
            this.lfm = new lastFmAPI({
                'api_key': this.api_key,
                'secret': this.secret
            });

            document.getElementById('lastfmBtn').onclick = () => this.enable();
    }
    enable() {

        if (Global.settings.general.lastfm.session_key === false) {
            let BrowserWindow = remote.BrowserWindow;

            let win = new BrowserWindow({
                width: 800,
                height: 600
            });

            win.webContents.on('did-finish-load', () => {
                win.show();
                win.focus();
            });
            win.loadURL(`http://www.last.fm/api/auth/?api_key=${this.api_key}`);

            win.webContents.on('will-navigate', (e, url) => {
                let match = url.match(/token=(.*)/g);
                this.token = match[0].substring(6, 38);
                win.close();

                this.authenticate();
            });
        } else {
            this.startSession();
        }
    }
    startSession() {
        this.lfm.setSessionCredentials(Global.settings.general.lastfm.session_name, Global.settings.general.lastfm.session_key);
        console.log('Loaded Credentials from User Settings');
        this.editDOM();
    }
    authenticate() {
        this.lfm.authenticate(this.token, (err, session) => {
            if (err) throw err;

            Global.settings.general.lastfm.session_name = session.username;
            Global.settings.general.lastfm.session_key = session.key;
            Global.settings.saveSettings();
            console.log('Session Keys Saved!');
        });
        this.editDOM();
    }
    editDOM() {
        Global.musicPlayer.onended = () => this.scrobble(); //Once Authenicated Scobbling can be enabled.
        Global.musicPlayer.onloadedmetadata = () => {
            DOMElement.seekRange.max = (melodii.metadata.format.duration === null) ? Math.floor(Global.musicPlayer.duration) : Math.floor(melodii.metadata.format.duration);
            this.nowPlaying(); //Once Authenticated, nowPlaying can be enabled. //TODO Make autonomous
        };
    }
    scrobble() {
        this.lfm.track.scrobble({
            'artist': melodii.metadata.common.artist,
            'track': melodii.metadata.common.title,
            'timestamp': Math.floor((new Date()).getTime() / 1000) - ((melodii.metadata.format.duration === null) ? Math.floor(Global.musicPlayer.duration) : Math.floor(melodii.metadata.format.duration)),
            'album': melodii.metadata.common.album,
            'albumArtist': melodii.metadata.common.albumartist
        }, (err, scrobble) => {
            if (err) console.error(err);
            console.log('Scrobbling Successful');
        });
    }
    nowPlaying() {
        this.lfm.track.updateNowPlaying({
            'artist': melodii.metadata.common.artist,
            'track': melodii.metadata.common.title,
            'album': melodii.metadata.common.album,
            'albumArtist': melodii.metadata.common.albumartist
        }, (err, nowPlaying) => {
            if (err) console.error(err);
            console.log('Now Playing Successful');
        });
    }
}

module.exports = new LastFM();
