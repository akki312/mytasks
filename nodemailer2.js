const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');

// Function to generate OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
}

// Function to send OTP via email and store in MongoDB
async function sendOTPByEmail(email, otp) {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'akshithsistla@gmail.com', // Your Gmail email address
            pass: 'jhlt dikb ijol qclu' // Your Gmail password or app-specific password
        }
    });

    // Email content
    const mailOptions = {
        from: 'akshithsistla@gmail.com', // Sender address
        to: email, // Recipient address
        subject: 'Your OTP', // Subject line
        text: `Your OTP is: ${otp}` // Plain text body
    };

    // Store user email and OTP in MongoDB
    const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/'; // MongoDB connection URI
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Insert user email and OTP into MongoDB collection
        const database = client.db('emaildatabase');
        const collection = database.collection('otpCollection');
        await collection.insertOne({ email, otp });
        console.log('OTP stored in MongoDB');

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close MongoDB connection
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

// Example usage
const userEmail = 'sistlaakshith@gmail.com'; // Recipient's email address
const otp = generateOTP();

sendOTPByEmail(userEmail, otp);
