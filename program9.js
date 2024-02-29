/**Write javascript code to remove duplicate elements from two arrays */
function removeDuplicatesFromArray(arr1, arr2) {
    
    let arr3 = arr1.concat(arr2);


    let array3 = arr3.filter((item, index) => {
        return arr3.indexOf(item) === index;
    });

    return array3 ;
}


const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
console.log("Array 1:", array1);
console.log("Array 2:", array2);
let array3 =  removeDuplicatesFromArray(array1, array2);
console.log(array3);
/**output:
 * Array 1: (5) [1, 2, 3, 4, 5]
   Array 2: (5) [3, 4, 5, 6, 7]
   Arrays after removing duplicates: (7) [1, 2, 3, 4, 5, 6, 7]
 */