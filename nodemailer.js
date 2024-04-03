const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const mongoURI = 'mongodb+srv://akshithsistla:<password>@cluster0.iljkeyx.mongodb.net/mycollection';
const collectionName = 'emails';

// Create a MongoDB client
const mongoClient = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'akshithsistla@gmail.com',
    pass: 'Akki@8008'
  }
});

// Connect to MongoDB and send email
async function sendEmail(recipient, subject, message) {
  try {
    // Connect to MongoDB
    await mongoClient.connect();
    console.log('Connected to MongoDB');

    // Get the database and collection
    const db = mongoClient.db();
    const collection = db.collection(collectionName);

    // Insert email data into MongoDB
    await collection.insertOne({ recipient, subject, message });
    console.log('Email data inserted into MongoDB');

    // Send email using Nodemailer
    const mailOptions = {
      from: 'akshithsistla@gmail.com',
      to: recipient,
      subject: subject,
      text: message
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    await mongoClient.close();
    console.log('Disconnected from MongoDB');
  }
}

// Example usage
sendEmail('recipient@example.com', 'Test Email', 'Hello from Nodemailer and MongoDB!');
