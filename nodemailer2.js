const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');


function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); 
}


async function sendOTPByEmail(email, otp) {
   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'akshithsistla@gmail.com', 
            pass: 'jhlt dikb ijol qclu' 
        }
    });

    
    const mailOptions = {
        from: 'akshithsistla@gmail.com', 
        to: email, 
        subject: 'Your OTP',
        text: `Your OTP is: ${otp}` 
    };

    
    const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/'; // MongoDB connection URI
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
       
        await client.connect();
        console.log('Connected to MongoDB');

        
        const database = client.db('emaildatabase');
        const collection = database.collection('otpCollection');
        await collection.insertOne({ email, otp });
        console.log('OTP stored in MongoDB');

        
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error:', error);
    } finally {
      
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}


const userEmail = 'sistlaakshith@gmail.com'; 
const otp = generateOTP();

sendOTPByEmail(userEmail, otp);
