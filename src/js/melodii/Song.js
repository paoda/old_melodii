'use strict';
import * as mm from 'music-metadata';
import noalbumart from '../../img/noalbumart.png';
import AlbumArt from '../components/Footer/AlbumArt';
import fs from 'fs';

export default class Song {
    constructor(path, albumArtBool) {
        this.location = path;
        this.metadata = null;

        let self = this;
        /*this.getMetadata(path, (err, res) => {
            if (err) throw err;
            self.location = path;
            self.metadata = res;
            self.getAlbumArt(res);
        });*/
        this.getMetadata(path, (res, err) => {
            if (err) throw err;
            this.metadata = res;
            this.location = path;
            console.log(this.metadata);
            if (albumArtBool) this.getAlbumArt(res);
        });
    }
    getAlbumArt(metadata) {
        if (metadata.common.picture) {
            if (metadata.common.picture.length > 0) {
                let picture = this.metadata.common.picture[0];
                let url = URL.createObjectURL(new Blob([picture.data], {
                    'type': 'image/' + picture.format
                }));
                let img = document.getElementById('albumImg');
                img.src= url;
            } else {
                console.error(metadata.common.title + ' has Album Art, but the Album Art is empty');
                let img = document.getElementById('albumImg');
                img.src = noalbumart;
            }
        } else {
            console.warn(metadata.common.title + ' does not have Album Art');
            let img = document.getElementById('albumimg');
            img.src = noalbumart;
        }
    }
    getMetadata(path, done) {
    if (typeof path === 'object') path = path.toString();
    mm.parseFile(path, {native: true, duration: true}).then((metadata) => {
        done(metadata, null);
    }).catch((err) => {
        done(null, err);
    });
    }
}