/**Write a javascript program to convert 24 hrs time format to 12 hrs time
format. */
function convertTo12HourFormat(time24) {
    
    let [hours, minutes] = time24.split(':');

    
    hours = parseInt(hours);

   
    let suffix = hours >= 12 ? 'PM' : 'AM';

    
    hours = hours % 12 || 12;

  
    minutes = minutes.padStart(2, '0');

    
    return `${hours}:${minutes} ${suffix}`;
}


console.log(convertTo12HourFormat('23:30'));  
console.log(convertTo12HourFormat('22:45'));  
console.log(convertTo12HourFormat('23:15'));  
