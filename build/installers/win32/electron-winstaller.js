const electronInstaller = require('electron-winstaller');

installerSettings().then(electronInstaller.createWindowsInstaller).catch((err) => {
    console.error(error.message || error);
    process.exit(1);
})

function installerSettings() {
    console.log('Creating win32 instaler...');
    const rootPath = './';
    const output = './build/melodii64';

    return Promise.resolve({
        appDirectory: rootPath,
        authors: 'Rekai Musuka (Paoda)',
        noMsi: true,
        outputDirectory: output,
        exe: 'melodii.exe',
        setupExe: 'melodiiInstaller.exe',
        setupIcon: null
    })
}