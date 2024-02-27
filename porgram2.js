/**Write a JavaScript program to remove a character at the specified position
of a given string and return the new string. */
function removeCharacterAtPosition(inputString, position) {
    
    if (position < 0 || position >= inputString.length) {
        return "Invalid position";
    }

    
    let firstPart = inputString.substring(0, position);
    let secondPart = inputString.substring(position + 1);

    
    return firstPart + secondPart;
}


console.log(removeCharacterAtPosition("akshith", 5));  
console.log(removeCharacterAtPosition("sistla", 2));  
console.log(removeCharacterAtPosition("akshithsistla", 7));   
/**ouput: akshih
 *        sitla
 *        akshithistla
 */



//git push
//git commit
//git pull
//git checkout
//git status
//git config user-name ""
//git config 