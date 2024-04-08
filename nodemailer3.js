const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');

// Function to generate OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
}

// Function to send OTP via email and store in MongoDB
async function sendOTPByEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'akshithsistla@gmail.com', // Your Gmail email address
            pass: 'jhlt dikb ijol qclu' // Your Gmail password or app-specific password
        }
    });

    const mailOptions = {
        from: 'akshithsistla@gmail.com', // Sender address
        to: 'sistlaakshith@gmail.com', // Recipient address
        subject: 'Your OTP', // Subject line
        text: `Your OTP is: ${otp}` // Plain text body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        // Store user email and OTP in MongoDB
        const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/'; // MongoDB connection URI
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const database = client.db('mydatabase');
        const collection = database.collection('otpCollection');
        await collection.insertOne({ email, otp });
        console.log('OTP stored in MongoDB');
    } catch (error) {
        console.error('Error sending email or storing OTP:', error);
    } finally {
        await client.close(); // Close MongoDB connection
    }
}

// Example usage
const userEmail = 'sistlaakshith@gmail.com';
const otp = generateOTP();

sendOTPByEmail(userEmail, otp);
