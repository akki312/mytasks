/**Write javascript code to remove duplicate elements from two arrays */
function removeDuplicatesFromArray(arr1, arr2) {
    
    let combinedArray = arr1.concat(arr2);


    let uniqueArray = combinedArray.filter((item, index) => {
        return combinedArray.indexOf(item) === index;
    });

    return uniqueArray;
}


const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
console.log("Array 1:", array1);
console.log("Array 2:", array2);
console.log("Arrays after removing duplicates:", removeDuplicatesFromArray(array1, array2));
/**output:
 * Array 1: (5) [1, 2, 3, 4, 5]
   Array 2: (5) [3, 4, 5, 6, 7]
   Arrays after removing duplicates: (7) [1, 2, 3, 4, 5, 6, 7]
 */