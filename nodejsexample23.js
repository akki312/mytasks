var express = require('express');
var app = express();
const fs = require("fs");
function readandserve(path, res){
    fs.readFile(path, function(err, data){
        res.end(data);
    })
}
app.get('/:id' , function (req, res){
 console.log(req.params)
 if(req.params.id == "id1")
 readandserve("./id1.html", res);
else if (req.params.id == "id2")
readandserve("./id2.html", res);
else{
    res.end("invalid request");
}
});
app.listen(8080, () => { console.log("server listening on port 808") });