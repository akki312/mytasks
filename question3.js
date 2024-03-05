//Write a JavaScript function that accepts a string 
//as a parameter and converts the first letter of each word into upper case.
let v = "the quick brown fox";
let string = v.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
console.log(string);
