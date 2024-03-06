//reverse of a number
function reverseNumber(num) {
    
    let numStr = Math.abs(num).toString();
    let reversedStr = '';
    for (let i = numStr.length - 1; i >= 0; i--) {
        reversedStr += numStr[i];
    }
    let reversedNum = parseInt(reversedStr, 10);
        return reversedNum;
}
console.log(reverseNumber(143));  
