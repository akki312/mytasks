/**value of : it represents the number or element which is represented in the array or a
 * particular value of that array when asked by the user
 */
const obj = {
    value: 42,
    valueOf: function() {
      return this.value; // Returns the value property of the object
    }
  };
  
  console.log(obj.valueOf()); // Output: 42
  
  // Using the object in an addition operation
  const result = obj + 10;
  console.log(result); // Output: 52
  
