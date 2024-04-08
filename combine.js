const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');


const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', 
    port: 587, 
    secure: false, 
    auth: {
        user: 'akshithsistla@gmail.com', 
        pass: 'xnua tuis pqqd clbx' 
    }
});


const mongoURI = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';


function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
}


async function sendOTP(email, otp) {
    try {
       
        await transporter.sendMail({
            from: 'akshithsistla@gmail.com', 
            to: email, 
            subject: 'Your OTP', 
            text: `Your OTP is: ${otp}`
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
const userEmail = 'sistlaakshith@gmail.com';
const otp = generateOTP();
saveOTP(userEmail, otp);
sendOTP(userEmail, otp);
