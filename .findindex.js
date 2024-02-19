/**find index: this function will find the index of the given number 
 * in the string or the array and will display the ouput
 */
const numbers = [5, 10, 15, 20];
const index = numbers.findIndex(num => num === 15);
console.log(index); 
/**output:2*/
// function that returns odd number
function isOdd(element) {
    return element % 2 !== 0;
  }
  
  // defining an array of integers
  let  = [2, 8, 1, 3, 4];
  
  // returns the index of the first odd number in the array
  let firstOdd = numbers.findIndex(isOdd);
  
  console.log(firstOdd);
  
  // Output: 2