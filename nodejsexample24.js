const fs = require('fs');
fs.watch("example.txt", (eventType, filename) =>{
    console.log("this file", filename, " was modified!");
    console.log("it was a ", eventtype, "event type.");
});
setTimeout(
    () => fs.writeFileSync("example.txt", "asngklns;gjln"), 1000);