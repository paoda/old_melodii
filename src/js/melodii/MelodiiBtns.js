'use strict';
import {remote} from 'electron';

export default class MelodiiBtns {
    static quit() {
        remote.app.quit();
    }
    static minimize() {
        console.log('Hello World');
        remote.BrowserWindow.getFocusedWindow().minimize();
    }
}