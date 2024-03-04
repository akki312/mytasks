// Write a JavaScript function that accepts a string as a parameter and finds the longest word within the string.
//Example string : 'Web Development Tutorial'
//Expected Output : 'Development'
function findLongestWord(str) {
    let words = str.split(" ");
    let longestWord = "";
    let maxLength = 0;
     for (let i = 0; i < words.length; i++) {
         if (words[i].length > maxLength) {
                longestWord = words[i];
            maxLength = words[i].length;
        }
    }
 return longestWord;
}
let exampleString = 'Web Development Tutorial';
console.log(findLongestWord(exampleString)); 
