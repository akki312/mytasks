const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.post('/api/send-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        await sendOTPByEmail(email, otp);
        res.status(200).json({ message: 'OTP sent and stored successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
async function sendOTPByEmail(email, otp) {
    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'akshithsistla@gmail.com',
            pass: 'jhlt dikb ijol qclu'
        }
    });

    // Email content
    const mailOptions = {
        from: 'akshithsistla@gmail.com',
        to: 'sistlaakshith@gmail.com',
        subject: 'OTP of Application',
        text: `Your OTP is: ${otp}`
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    // MongoDB connection
    const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // MongoDB insertion
    const database = client.db('staticOTPdatabase');
    const collection = database.collection('OTPCollection');
    await collection.insertOne({ email, otp });
    console.log('OTP stored in MongoDB');

    // Close MongoDB connection
    await client.close();
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
