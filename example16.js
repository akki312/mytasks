const fs = require('fs');
const util = require('util');
const readDir = util.promisify(fs.readdir)
readDir(process.cwd())
.then(filenames => {
    for(let filename of filenames){
    console.log(filename)
    }
})
.catch(err => {
    console.log(`error occurs,
    error code -> ${err.code},
    error no -> ${err.errno}`);
})