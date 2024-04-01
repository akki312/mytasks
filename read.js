
async function findAllDocuments() {
    const cursor = collection.find();
    await cursor.forEach(document => console.log(document));
}


findAllDocuments();
