//Write a JavaScript function that returns a string that has letters in alphabetical order.
function sortStringAlphabetically(str) {
    // Convert the string to an array of characters
    let characters = str.split("");

    // Bubble sort algorithm to sort the array of characters
    for (let i = 0; i < characters.length; i++) {
        for (let j = 0; j < characters.length - i - 1; j++) {
            if (characters[j] > characters[j + 1]) {
                // Swap characters if they are in the wrong order
                let temp = characters[j];
                characters[j] = characters[j + 1];
                characters[j + 1] = temp;
            }
        }
    }

    // Join the sorted array of characters back into a string
    let sortedString = characters.join("");

    return sortedString;
}

// Test the function
let inputString = "webmaster";
console.log("Original string:", inputString);
console.log("String with letters sorted alphabetically:", sortStringAlphabetically(inputString));

