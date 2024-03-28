// Delete a document from a collection
async function deleteDocument() {
    const filter = { name: "Alice" };
    const result = await collection.deleteOne(filter);
    console.log("Document deleted:", result.deletedCount);
}

// Call the deleteDocument function to delete a document
deleteDocument();
