/**isarray:it is the function to check whether a array is true or false */
let array1 = [1, 2, 3];
let array2 = ['abcd', 'efgh', 'ijkl'];
let notAnArray = 'Hello, World!';

console.log(Array.isArray(array1)); // Output: true
console.log(Array.isArray(array2)); // Output: true
console.log(Array.isArray(notAnArray)); // Output: false
