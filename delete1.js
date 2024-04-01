
async function deleteDocument() {
    const filter = { name: "Akki" };
    const result = await collection.deleteOne(filter);
    console.log("Document deleted:", result.deletedCount);
}


deleteDocument();
