const array = ['a', 'b', 'c'];
const iterator = array.keys();
console.log(iterator.next()); 
console.log(iterator.next()); 
console.log(iterator.next()); 
/**output:{value:0, done:false}
       {value:1, done:false}
       { value:2, done:false}*/
