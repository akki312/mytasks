const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://akshithsistla:<password>@cluster0.iljkeyx.mongodb.net/"; // MongoDB default URI
const dbName = "mydatabase";
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db(dbName);
        const collection = db.collection('mycollection');
        await collection.insertOne({ name: "akshith", age: 30 });
        console.log("Document inserted successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB"); 
    }
}

connectToMongoDB();
