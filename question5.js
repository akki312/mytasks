//Write a JavaScript function that accepts a number as a parameter and
 //checks whether it is prime or not using recursion.
//Note : A prime number (or a prime) is a natural number
// greater than 1 that has no positive divisors other than 1 and itself.
function isPrime(num, divisor = 2) {
    if (num <= 2) {
        return (num === 2) ? true : false;
    }
    if (num % divisor === 0) {
        return false;
    }
    if (divisor * divisor > num) {
        return true;
    }
    return isPrime(num, divisor + 1);
}
console.log(isPrime(5)); // true

