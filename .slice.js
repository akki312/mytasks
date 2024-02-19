/**slice:The .slice() method in JavaScript is used to extract a section of an array and returns
 a new array containing the extracted elements. */
 let languages = ["JavaScript", "Python", "C", "C++", "Java"];

 // slicing the array (from start to end)
 let new_arr = languages.slice();
 console.log(new_arr); // [ 'JavaScript', 'Python', 'C', 'C++', 'Java' ]
 
 // slicing from the third element
 let new_arr1 = languages.slice(2);
 console.log(new_arr1); // [ 'C', 'C++', 'Java' ]
 
 // slicing from the second element to fourth element
 let new_arr2 = languages.slice(1, 4);
 console.log(new_arr2); // [ 'Python', 'C', 'C++' ]