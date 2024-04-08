const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Your SMTP server hostname
    port: 587, // Your SMTP server port
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'akshithsistla@gmail.com', // Your SMTP username
        pass: 'xnua tuis pqqd clbx' // Your SMTP password
    }
});

// MongoDB connection URI
const mongoURI = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';

// Function to generate OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
}

// Function to send OTP via email
async function sendOTP(email, otp) {
    try {
        // Send email with OTP
        await transporter.sendMail({
            from: 'akshithsistla@gmail.com', // Sender email address
            to: email, // Recipient email address
            subject: 'Your OTP', // Email subject
            text: `Your OTP is: ${otp}` // Email body
        });
        console.log('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
}

// Function to save OTP in MongoDB
async function saveOTP(email, otp) {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db('mydatabase');
        const otpCollection = db.collection('otp');
        await otpCollection.insertOne({ email, otp, createdAt: new Date() });
        console.log('OTP saved in MongoDB');
    } catch (error) {
        console.error('Error saving OTP in MongoDB:', error);
    } finally {
        await client.close();
    }
}

// Example usage
const userEmail = 'user@example.com';
const otp = generateOTP();
saveOTP(userEmail, otp);
sendOTP(userEmail, otp);
