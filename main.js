const electron  = require('electron');
const path = require('path');
const url = require('url');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 640,
    height: 360
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  mainWindow.on('closed', function() {
    mainWindow = null;
  })
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
  app.quit();
})

//For OSX
app.on('activate', function() {
  if (mainWindow == null) {
    createWindow();
  }
})
