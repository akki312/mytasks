/**.reduce:The .reduce() method in JavaScript is used to apply a function against an accumulator and each element in the
 *  array (from left to right) to reduce it to a single value */
const array = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log(array.reduce(reducer)); 
/**output:10*/
