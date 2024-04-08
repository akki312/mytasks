const { MongoClient} = require('mongodb');
const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) =>{
    if(err){
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('connected to MongoDB');

    const database = client.db();
    const collection = database.collection('mycollection');

    collection.insertOne({ name: 'John', age: 30}, (err, result) => {
        if(err) {
            console.error('Error inserting document:', err);
            return;
        }
        console.log('document inserted successfully:', result.ops[0]);
    });
    client.close();
})