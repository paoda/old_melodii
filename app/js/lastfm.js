'use strict';

class LastFM {
    constructor() {
        this.api_key = settings.general.lastfm.api_key;
        this.secret = settings.general.lastfm.secret;

        const lastFmAPI = require('lastfmapi');
        this.lfm = new lastFmAPI({
            'api_key': this.api_key,
            'secret': this.secret
        })

        document.getElementById('lastfmBtn').onclick = () => this.enable();
    }
    enable() {

        if (settings.general.lastfm.session_key == false) {
            let BrowserWindow = remote.BrowserWindow;

            let win = new BrowserWindow({
                width: 800,
                height: 600
            });

            win.webContents.on('did-finish-load', () => {
                win.show();
                win.focus();
            })
            win.loadURL(`http://www.last.fm/api/auth/?api_key=${this.api_key}`);

            win.webContents.on('will-navigate', (e, url) => {
                let match = url.match(/token=(.*)/g);
                this.token = match[0].substring(6, 38);
                win.close();

                this.authenticate();
            })
        } else {
            this.startSession();
        }
    }
    startSession() {
        this.lfm.setSessionCredentials(settings.general.lastfm.session_name, settings.general.lastfm.session_key);
        console.log('Session Keys Successfully loaded');
        
        this.editDOM();
    }
    authenticate() {
        this.lfm.authenticate(this.token, (err, session) => {
            if (err) throw err;

            settings.general.lastfm.session_name = session.username;
            settings.general.lastfm.session_key = session.key;
            settings.saveSettings();
            console.log("Session Keys Saved!");
        })
        this.editDOM();
    }
    editDOM() {
        musicPlayer.onended = () => this.scrobble(); //Once Authenicated Scobbling can be enabled.
        musicPlayer.onloadedmetadata = () => {
            seekRange.max = (melodii.metadata.format.duration == null) ? ~~musicPlayer.duration : ~~melodii.metadata.format.duration;
            this.nowPlaying(); //Once Authenticated, nowPlaying can be enabled. //TODO Make autonomous
        }
    }
    scrobble() {
        this.lfm.track.scrobble({
            'artist': melodii.metadata.common.artist,
            'track': melodii.metadata.common.title,
            'timestamp': ~~((new Date()).getTime() / 1000) - ((melodii.metadata.format.duration == null) ? ~~musicPlayer.duration : ~~melodii.metadata.format.duration),
            "album": melodii.metadata.common.album,
            "albumArtist": melodii.metadata.common.albumartist
        }, (err, scrobble) => {
            if (err) console.error(err);
            console.log("Scrobbling Successful");
        })
    }
    nowPlaying() {
        this.lfm.track.updateNowPlaying({
            'artist': melodii.metadata.common.artist,
            'track': melodii.metadata.common.title,
            'album': melodii.metadata.common.album,
            'albumArtist': melodii.metadata.common.albumartist
        }, (err, nowPlaying) => {
            if (err) console.error(err);
            console.log("Now Playing Successful");
        })
    }
}

eventEmitter.on('Settings Loaded', () => {
    if (settings.general.lastfm.enable) {
        var lastfm = new LastFM();
    } else {
        console.log('LastFM Support Disabled');
    }
})