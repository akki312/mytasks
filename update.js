
async function updateDocument() {
    const filter = { name: "Akki" };
    const update = { $set: { age: 30 } };
    const result = await collection.updateOne(filter, update);
    console.log("Document updated:", result.modifiedCount);
}


updateDocument();
