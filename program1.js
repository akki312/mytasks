/**Write a JavaScript program to get the difference between a given number
and 13, if the number is greater than 13 return double the absolute
difference */
function differenceFrom13(number) {
    const diff = Math.abs(number - 13);
    if (number > 13) {
        return diff * 2;
    } else {
        return diff;
    }
}


console.log(differenceFrom13(8));    
console.log(differenceFrom13(13));  
console.log(differenceFrom13(16));  
/**output: 5
 *         0
 *         14
 */