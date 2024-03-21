// Importing File System and Utilities module 
const fs = require('fs') 
const util = require('util') 

// Convert callback based methods to 
// promise based methods 
const appendContent = util.promisify(fs.appendFile) 
const readFileContent = util.promisify(fs.readFile) 

const appendDataToFile = async (path, data) => { 

// The readFileContent() method reads the file 
// and returns buffer form of the data 
const oldBuffer = await readFileContent(path) 

// File content before append 
const oldContent = oldBuffer.toString() 

// Append operation 
await appendContent(path, data) 

const newBuffer = await readFileContent(path) 

// File content after append 
const newContent = newBuffer.toString() 

console.log(`\nBefore Append: ${oldContent}\n`) 
console.log(`After Append: ${newContent}`) 
} 

appendDataToFile('./testFile.txt', 
	'\nHey, I am newly added..!!') 
.catch(err => { 
console.log(`Error Occurs, 
	Error code -> ${err.code}, 
	Error NO -> ${err.errno}`) 
}) 
