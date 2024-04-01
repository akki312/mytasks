
async function insertDocument() {
    const result = await collection.insertOne({ name: "Akki", age: 25 });
    console.log("Document inserted with _id:", result.insertedId);
}


insertDocument();
