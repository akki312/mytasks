// Insert a single document into a collection
async function insertDocument() {
    const result = await collection.insertOne({ name: "Alice", age: 25 });
    console.log("Document inserted with _id:", result.insertedId);
}

// Call the insertDocument function to insert a document
insertDocument();
