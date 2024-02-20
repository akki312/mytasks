/**here we have used the sort fucntion to sort the given elements in array in 
 * descending order by mentioning the condition ((a, b) => b - a); and display
 * the whole array
 */
let numbers = [10, 5, 20, 2];
numbers.sort((a, b) => b - a);
console.log(numbers); // Output: [20, 10, 5, 2]
