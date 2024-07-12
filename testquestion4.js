function DynamicArithmetic(i, j) {
    let x = i + j;
    let y = x * j;
    let z = i % j;
    let exp = i ** j; 

    console.log("x =", x);
    console.log("y =", y);
    console.log("z =", z);
    console.log("i ^ j =", exp);
}

let i = 5;
let j = 4;
DynamicArithmetic(i, j);
