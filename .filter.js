/**filter:in this function it filters the numbers and perform according to
 * the function given by the user and it display the ouput given in a string or 
 * a array
 */
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


// function to check even numbers
function checkEven(number) {
  if (number % 2 == 0)
    return true;
  else
    return false;
}

// create a new array by filter even numbers from the numbers array
let evenNumbers = numbers.filter(checkEven);
console.log(evenNumbers);

// Output: [ 2, 4, 6, 8, 10 ]