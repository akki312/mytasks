//palindrome
function isPalindrome(str) {
    const len = str.length;
    for (let i = 0; i < Math.floor(len / 2); i++) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}
console.log(isPalindrome("hello")); 
