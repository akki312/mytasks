// Importing File System and Utilities module 
const fs = require('fs') 
const util = require('util') 

// Convert callback based methods to 
// promise based methods 
const appendContent = util.promisify(fs.appendFile) 
const readFileContent = util.promisify(fs.readFile) 


// The readFileContent() method reads the 
// file and returns buffer form of the data 
readFileContent('./testFile.txt') 
.then(buff => { 

	// File content before append 
	const oldContent = buff.toString() 
	console.log(`\nBefore Append: ${oldContent}\n`) 

	// Append operation 
	return appendContent('./testFile.txt', 
			'\nHey, I am newly added..!!') 
}) 

.then(() => { 

	// Getting new file content 
	return readFileContent('./testFile.txt') 
}) 
	
.then(buff => { 

	// File content after append 
	const newContent = buff.toString() 
	console.log(`After Append: ${newContent}\n`) 
}) 
	
.catch(err => { 
console.log(`Error Occurs, 
	Error code -> ${err.code}, 
	Error NO -> ${err.errno}`) 
}) 
