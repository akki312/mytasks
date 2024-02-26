/**Write a JavaScript program to find the number which appears most in a
given array of integers. */
function findMostFrequentNumber(array) {
    
    let frequencyMap = {};

    
    array.forEach(number => {
        frequencyMap[number] = (frequencyMap[number] || 0) + 1;
    });

   
    let mostFrequentNumber;
    let maxFrequency = 0;
    for (let number in frequencyMap) {
        if (frequencyMap[number] > maxFrequency) {
            mostFrequentNumber = parseInt(number);
            maxFrequency = frequencyMap[number];
        }
    }

    return mostFrequentNumber;
}

// Test the function
const array = [1, 2, 3, 4, 2, 2, 3, 2, 5, 2, 6, 2];
console.log("Number that appears most frequently:", findMostFrequentNumber(array)); 
/**ouput: 2 */
