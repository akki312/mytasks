// sum of squares
function sumOfSquares(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i] * numbers[i] * numbers[i]; // Square each number and add to the sum
    }
    return sum;
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
console.log("Sum of squares:", sumOfSquares(numbers)); // Output: 55 (1^2 + 2^2 + 3^2 + 4^2 + 5^2 = 55)
