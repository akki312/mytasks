let v = ["akshith", "sistla", "abcd", "aksh"];
var shifted = v.shift();
let b = {person: "akshith", gender: "male"}
let a = [7, 8, 9, 1, 3];
const concatenated = v.concat(a);
v.splice(1, 2, 'ledd');
console.log(concatenated);
console.log(v);
console.log(v.toString());
a.sort();
console.log(a);
const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log(a.reduce(reducer)); 
v.push("files")
console.log(v);
v.pop("files")
console.log(v);
v.reverse();
console.log(v);
v.unshift("pop");
console.log(v);
let lengthOfArray = v.length;
console.log(lengthOfArray)
console.log(a.join());
const doubled = a.map(num => num * 2);
console.log(doubled); 
const iterator = a.keys();
console.log(iterator.next()); 
console.log(iterator.next()); 
console.log(iterator.next());
let new_arr = v.slice(1, 2);
console.log(new_arr);
delete b.gender;
console.log(b); 

console.log(shifted); 
a.forEach(element => {
    console.log(element);
})
