// Write a JavaScript function that reverses a number.
//Example x = 32243;
function reverseNumber(num) {
   let numStr = num.toString();
    let reversedStr = numStr.split('').reverse().join('');
    let reversedNum = parseFloat(reversedStr); 
    return reversedNum;
}
let x = 32243;
let reversedNum = reverseNumber(x);
console.log(reversedNum); 