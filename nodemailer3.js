const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');

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
        to: 'sistlaakshith@gmail.com',
        subject: 'otp of application',
        text: `Your OTP is: ${otp}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const database = client.db('otpdatabase');
        const collection = database.collection('otpCollection');
        await collection.insertOne({ email, otp });
        console.log('OTP stored in MongoDB');
    } catch (error) {
        console.error('Error sending email or storing OTP:', error);
    } finally {
        await client.close();
    }
}

const userEmail = 'sistlaakshith@gmail.com';
const staticOTP = '1234'; 

sendOTPByEmail(userEmail, staticOTP); 
