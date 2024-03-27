const fs = require('fs');
fs.watchFile("example.txt", {
    bigint: false,
    persistent: true,
    interval: 1000,
},(curr, prev) => {
    console.log("\nthe file was edited");
    console.log("file was modified at: ", prev.mtime);
    console.log("file was again modified at: ", curr.mtime);
    console.log(
        "file content updated: ",
        fs.readFileSync("example.txt", "utf8")
    );
});
fs.writeFileSync("example.txt", "welcome to prgramming");
setTimeout(
    () => fs.writeFileSync("example.txt",
    "file is edited again!!!"),
    3000
);