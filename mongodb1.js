var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://akshithsistla:<password>@cluster0.iljkeyx.mongodb.net/";

// to connect, create database & collection
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("NodejsDB");
  dbo.createCollection("students",function(err,res){
    if(err) throw err;
    console.log("Database created!");
    db.close();
  });
});