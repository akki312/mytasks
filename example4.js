//sum of cubes
function sumOfcubes(numbers) {
    let s = 0;
    for (let i = 0; i < numbers.length; i++) {
        s += numbers[i] * numbers[i] * numbers[i]; 
    }
    return s;
}

const numbers = [1, 2, 3, 4, 5];
console.log("Sum of cubes:", sumOfcubes(numbers)); 
