/**The .splice() method in JavaScript is used to change the contents 
of an array by removing or replacing existing elements and/or adding new elements in place */ 
let array = ['apple', 'banana', 'cherry', 'date'];

// Remove 'banana' and 'cherry' and insert 'orange' at index 1
array.splice(1, 2, 'orange');

console.log(array); // Output: ['apple', 'orange', 'date']
