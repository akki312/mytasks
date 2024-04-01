
const { MongoClient } = require('mongodb');


const uri = "mongodb://localhost:27017"; // MongoDB default URI


const dbName = "mydatabase";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function connectToMongoDB() {
    try {
    
        await client.connect();

        console.log("Connected to MongoDB");

      
        const db = client.db(dbName);

        
        const collection = db.collection('mycollection');
        await collection.insertOne({ name: "John", age: 30 });

        console.log("Document inserted successfully");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        
        await client.close();
        console.log("Disconnected from MongoDB");
    }
}


connectToMongoDB();
