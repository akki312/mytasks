// Import the MongoClient class from the mongodb package
const { MongoClient } = require('mongodb');

// Connection URI
const uri = "mongodb://localhost:27017"; // MongoDB default URI

// Database Name
const dbName = "mydatabase";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        // Connect the client to the server
        await client.connect();

        console.log("Connected to MongoDB");

        // Use the specified database
        const db = client.db(dbName);

        // Perform operations with the database
        // Example: Insert document into a collection
        const collection = db.collection('mycollection');
        await collection.insertOne({ name: "John", age: 30 });

        console.log("Document inserted successfully");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        // Close the connection when done
        await client.close();
        console.log("Disconnected from MongoDB");
    }
}

// Call the connectToMongoDB function to initiate the connection
connectToMongoDB();
