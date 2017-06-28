/* Listen.MOE Support, no I'm not a weeb */

class ListenMoe {
    connect() {
        this.socket = new WebSocket('wss://listen.moe/api/v2/socket');

        this.socket.onopen = () => {
            console.log("Connection Established: LISTEN.moe Websocket");
            var img = document.getElementById('albumImg');
            img.style.width= '100%';
            img.style.height = 'auto';
            melodii.metadata = {format: {duration: null}};
            img.src = 'https://listen.moe/files/images/logo_big.png';
        }
        this.socket.onerror = (e) => console.log('LISTEN.moe Websocket Error: + ' + e);
        this.socket.onclose = () => {

            if (this.userExit == true) {
                console.log('LISTEN.moe Websocket Closed (User Requested)');
                var img = document.getElementById('albumImg');
                img.style.width= 'auto';
                img.style.height = '100%';
                this.socket = null;
            } else {
                console.error('LISTEN.moe Websocked Closed. Reopening...');
                window.setTimeout(this.createWebSocket, 10000);
            }
        }
        this.socket.onmessage = (msg) => {
            if (musicPlayer.src != 'http://listen.moe:9999/stream') {
                //User has loaded some other file, LISTEN.moe support can shutdown.
                this.userExit = true; //Allowing for Proper 
                this.socket.close();
            }

            try {
                this.metadata = JSON.parse(msg.data);
            } catch (e) {
                console.log('Faulty Response from LISTEN.moe Websocket');
                return -1;
            }
            this.loadSongInfo();
        }
    }
    listen() {
        musicPlayer.src = 'http://listen.moe:9999/stream';
        melodiiCNTRL.toggle();
    }
    loadSongInfo() {
        let title = this.metadata.song_name;
        let artist = this.metadata.artist_name;
        let listeners = this.metadata.listeners;

        songInfo.innerHTML = `${title} - ${artist} [Listeners: ${listeners}]`
    }
}

eventEmitter.on('Settings Loaded', () => {
    if (settings.general.listenmoe.enable) {
        var listenmoe = new ListenMoe();
    } else {
        console.log("LISTEN.MOE support Disabled");
    }
})

document.getElementById('listenmoeBtn').onclick = () => {
    settings.general.listenmoe.enable = true;
    settings.saveSettings();

    var listenmoe = new ListenMoe();
    listenmoe.connect();
    listenmoe.listen();
}