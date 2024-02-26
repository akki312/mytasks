var today = new Date();

var previousDay = new Date(today);
previousDay.setDate(today.getDate());

var previousDayDate = previousDay.getDate();
var previousDayMonth = previousDay.getMonth() + 1; 
var previousDayYear = previousDay.getFullYear() - 1; 

console.log("year: " + previousDayYear);
console.log("month: " + previousDayMonth);
console.log("date: " + previousDayDate);

