//Write a JavaScript function that accepts a string 
//as a parameter and converts the first letter of each word into upper case.
let v = "the quick brown fox";
let words = v.split(" ");
for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
}
let string = words.join(" ");
console.log(string);
