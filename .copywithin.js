/**.copyWithin() call rotates the array to the left by 3 positions. 
 * This is achieved by copying elements starting 
 * from index 3 and pasting them starting from index 0. */
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Suppose we want to:
// 1. Rotate the elements to the left by 3 positions
// 2. Replace elements at indices 2 and 3 with elements at indices 7 and 8

// Step 1: Rotate the elements to the left by 3 positions
array.copyWithin(0, 3); // Copy elements starting from index 3 and paste them starting from index 0

// Step 2: Replace elements at indices 2 and 3 with elements at indices 7 and 8
array.copyWithin(2, 7, 9); // Copy elements from index 7 to 9 (not including 9) and paste them starting from index 2

console.log(array); // Output: [ 4, 5, 8, 9, 10, 6, 7, 8, 9, 10 ]
