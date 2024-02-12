const array = [1, 30, 39, 29, 10, 13];
const isBelowThreshold = (currentValue) => currentValue < 40;
console.log(array.every(isBelowThreshold)); 
output:true
