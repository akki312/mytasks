/** Write a javascript program to print current date, day, month and year (Note:
    use predefined date methods in javascript)*/
    function printCurrentDate() {
        
        let currentDate = new Date();
    
        
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1; 
        let year = currentDate.getFullYear();
    
        
        let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let currentDayName = daysOfWeek[currentDate.getDay()];
    
        
        let monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let currentMonthName = monthsOfYear[currentDate.getMonth()];
    
        
        console.log("Current Date:", currentDayName + ', ' + currentMonthName + ' ' + day + ', ' + year);
    }
    
    
    printCurrentDate();
    /**output:Current Date: Monday, February 26, 2024 */