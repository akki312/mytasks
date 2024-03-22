const fs = require('fs')
const util = require('util')
const targetdir = process.argv[2] || process.cwd()
const readdir = util.promisify(fs.readdir)
const readDirectory = async (path) => {
    const filenames = await readdir(path)
    for(let filename of filenames){
        console.log(filename)
    }
}
readDirectory(targetdir)
.catch(err => {
    console.log(`error occurs,
    error code -> ${err.code},
    error no -> ${err.errno}`);
})