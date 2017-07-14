'use strict';

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
            let BrowserWindow = Global.remote.BrowserWindow;

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
        console.log('Session Keys Successfully loaded');
        
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
            Global.seekRange.max = (Global.melodii.metadata.format.duration === null) ? Math.floor(Global.musicPlayer.duration) : Math.floor(Global.melodii.metadata.format.duration);
            this.nowPlaying(); //Once Authenticated, nowPlaying can be enabled. //TODO Make autonomous
        };
    }
    scrobble() {
        this.lfm.track.scrobble({
            'artist': Global.melodii.metadata.common.artist,
            'track': Global.melodii.metadata.common.title,
            'timestamp': Math.floor((new Date()).getTime() / 1000) - ((Global.melodii.metadata.format.duration === null) ? Math.floor(Global.musicPlayer.duration) : Math.floor(Global.melodii.metadata.format.duration)),
            'album': Global.melodii.metadata.common.album,
            'albumArtist': Global.melodii.metadata.common.albumartist
        }, (err, scrobble) => {
            if (err) console.error(err);
            console.log('Scrobbling Successful');
        });
    }
    nowPlaying() {
        this.lfm.track.updateNowPlaying({
            'artist': Global.melodii.metadata.common.artist,
            'track': Global.melodii.metadata.common.title,
            'album': Global.melodii.metadata.common.album,
            'albumArtist': Global.melodii.metadata.common.albumartist
        }, (err, nowPlaying) => {
            if (err) console.error(err);
            console.log('Now Playing Successful');
        });
    }
}

Global.eventEmitter.on('Settings Loaded', () => {
    if (Global.settings.general.lastfm.enable) {
        Global.lastfm = new LastFM();
    } else {
        console.log('LastFM Support Disabled');
    }
});