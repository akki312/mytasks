//Write a JavaScript function that accepts a string 
//as a parameter and converts the first letter of each word into upper case.
function capitalizeFirstLetterOfEachWord(str) {
    // Split the string into words
    let words = str.split(" ");

    // Iterate through each word
    for (let i = 0; i < words.length; i++) {
        // Capitalize the first letter of each word
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back into a single string
    let capitalizedString = words.join(" ");

    return capitalizedString;
}


let inputString = "the quick brown fox";
console.log("Original string:", inputString);
console.log("String with first letter of each word capitalized:", capitalizeFirstLetterOfEachWord(inputString));
