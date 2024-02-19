/**shift:this function represents the 1st element 
 * in the array or asked element 
 * in the array and displays it to the user
 */

var languages = ["JavaScript", "Python", "Java", "C++", "Lua"];

var shifted = languages.shift();

console.log(languages); // [ 'Python', 'Java', 'C++', 'Lua' ]
console.log(shifted); // JavaScript

// shift returns any type of object
var numbers = [
  [1, 2, 3],
  [4, 5, 6],
  [-5, -4, -3],
];
console.log(numbers.shift()); // [ 1, 2, 3 ]
console.log(numbers); // [ [ 4, 5, 6 ], [ -5, -4, -3 ] ]