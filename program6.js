/**Write a JavaScript program to replace all the numbers with a specified
number of a given array of integers. */
function replaceNumbers(array, originalNumber, replacementNumber) {
  
    for (let i = 0; i < array.length; i++) {
        
        if (array[i] === originalNumber) {
            
            array[i] = replacementNumber;
        }
    }
    return array;
}


const originalArray = [2];
const originalNumber = 2;
const replacementNumber = 99;

console.log("Original array:", originalArray);
console.log("Array after replacement:", replaceNumbers(originalArray, originalNumber, replacementNumber));
