/**  Synchronous function:A synchronous function in JavaScript is a function that executes sequentially, 
 * blocking further execution of code until it completes its task*/
function addSync(a, b) {
    return a + b;
  }
  
  // Calling synchronous function
  console.log("Before addition");
  const result = addSync(1, 2);
  console.log("After addition:", result);

/**before addition: 1,2
after addition:3*/
