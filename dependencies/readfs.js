function readDirectory(dir) {
    fs.readdir(directory, (err, files) => {
        files.forEach(file => {
            console.log(file);
        })
    })
}