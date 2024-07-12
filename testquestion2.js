const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/'; // Replace with your MongoDB URI
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('NEW_DATABASE_NAME'); // Replace with your database name
    const collection = database.collection('testdata'); // Replace with your collection name

    const pipeline = [
      {
        $match: {
          id: { $exists: true }
        }
      },
      {
        $group: {
          _id: '$category',
          totalcount: { $sum: '$employees' }
        }
      },
      {
        $sort: { totalcount: -1 }
      }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    console.log('Aggregation result:', result);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
