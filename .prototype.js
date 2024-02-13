function Person(name) {
    this.name = name;
  }
  
  const person1 = new Person('Akshith');
  console.log(person1.__proto__ === Person.prototype); 
output:true
  
