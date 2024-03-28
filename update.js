// Update a document in a collection
async function updateDocument() {
    const filter = { name: "Alice" };
    const update = { $set: { age: 30 } };
    const result = await collection.updateOne(filter, update);
    console.log("Document updated:", result.modifiedCount);
}

// Call the updateDocument function to update a document
updateDocument();
