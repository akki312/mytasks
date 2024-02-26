
var today = new Date();


var previousDay = new Date(today);
previousDay.setDate(today.getDate());


var previousDayDate = previousDay.getDate();
var previousDayMonth = previousDay.getMonth() + 1; 
var previousDayYear = previousDay.getFullYear() - 1; 



console.log("Previous day's year: " + previousDayYear);
console.log("Previous day's month: " + previousDayMonth);
console.log("Previous day's date: " + previousDayDate);

