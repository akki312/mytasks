/**Write a JavaScript to find the longest string from a given array of strings. */
function findLongestString(strings) {

    let longestString = '';
    let maxLength = 0;

    
    for (let str of strings) {
        
        if (str.length > maxLength) {
           
            longestString = str;
            maxLength = str.length;
        }
    }

    return longestString;
}

// Test the function
const stringsArray = ['aksh', 'sis', 'aksih', 'itla', 'akshithsistla'];
console.log("Longest string:", findLongestString(stringsArray)); // Output: "pineapple"
