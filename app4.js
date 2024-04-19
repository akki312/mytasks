const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();


const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';


app.get('/', async (req, res) => {
    try {
       
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();


        const db = client.db();
        const usersCollection = db.collection('users');

        
        const users = await usersCollection.find().toArray();

        
        await client.close();

        res.json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
