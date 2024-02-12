const count = true;
let countValue = new Promise(function (resolve, reject){
    if (count) {
        resolve("there is a count value.");
    } else {
        reject("there is no value");
        }
});
console.log(countValue);