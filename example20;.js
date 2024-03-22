const fs = require('fs');
const path = require('path');
fs.readdir(__dirname, (err, files) =>{
    if (err)
    console.log(err);
    else {
        console.log("\filesnames with .txt extension:");
        files.forEach(files => {
            if(path.extname(File) == ".txt")
            console.log(file);
        })
    }
})