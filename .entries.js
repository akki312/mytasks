const array = ['a', 'b', 'c'];
const iterator = array.entries();
console.log(iterator.next().value); 
console.log(iterator.next().value); 
console.log(iterator.next().value); 
/**[0, 'a']
 * [1, 'b']
 * [2, 'c']
 */