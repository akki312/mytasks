/**Write a javascript program to to print one month old date to the current
date (print day and month also) and one year old date to the current date
(print day and month also) */
function printOneMonthAndOneYearOldDates() {
    
    let currentDate = new Date();

   
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;

    
    let oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    let oneMonthAgoDay = oneMonthAgo.getDate();
    let oneMonthAgoMonth = oneMonthAgo.getMonth() + 1;

   
    let oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    let oneYearAgoDay = oneYearAgo.getDate();
    let oneYearAgoMonth = oneYearAgo.getMonth() + 1;

    
    console.log("One month old date:");
    console.log("Day:", oneMonthAgoDay);
    console.log("Month:", oneMonthAgoMonth);

   
    console.log("\nOne year old date:");
    console.log("Day:", oneYearAgoDay);
    console.log("Month:", oneYearAgoMonth);
}

printOneMonthAndOneYearOldDates();
/**ouput:
 * One month old date:
Day: 26
Month: 1

One year old date:
Day: 26
Month: 2
*/