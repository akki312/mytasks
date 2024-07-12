
const sampleArray = Array.from({ length: 1000000 }, (_, i) => i + 1);


function sumArrayUnoptimized(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }
console.time('Unoptimized');
sumArrayUnoptimized(sampleArray);
console.timeEnd('Unoptimized');


function sumArrayOptimized(arr) {
    let sum = 0;
    const length = arr.length;  
    for (let i = 0; i < length; i++) {
      sum += arr[i];
    }
    return sum;
  }
console.time('Optimized');
sumArrayOptimized(sampleArray);
console.timeEnd('Optimized');
