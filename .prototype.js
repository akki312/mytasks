/**prototype:prototype property is a special property of constructor functions. 
 * It allows you to add new properties and methods to 
 * all objects created by that constructor function.*/
function Person(name) {
    this.name = name;
  }
  
  const person1 = new Person('Akshith');
  console.log(person1.__proto__ === Person.prototype); 
/**output:true*/
  
