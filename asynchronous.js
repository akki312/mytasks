/**  Asynchronous function:An asynchronous function in JavaScript is a function that operates asynchronously, 
meaning it doesn't block the execution of the code.*/
function addAsync(a, b, callback) {
    setTimeout(() => {
      const result = a + b;
      callback(result);
    }, 1000); 
  }
  
  // Calling asynchronous function
  console.log("Before addition");
  addAsync(2, 1, (result) => {
    console.log("After addition:", result);
  });
/**output:
  before addition 2, 1
after addition 3*/
