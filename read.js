// Find all documents in a collection
async function findAllDocuments() {
    const cursor = collection.find();
    await cursor.forEach(document => console.log(document));
}

// Call the findAllDocuments function to retrieve all documents
findAllDocuments();
