/** .some.js:The .some() method in JavaScript 
 * is used to test whether at least one element 
 * in the array passes the test implemented
 *  by the provided function*/ 
const array = [1, 2, 3, 4, 5];
const isEven = (num) => num % 2 === 0;
console.log(array.some(isEven)); 
/**output:true*/
