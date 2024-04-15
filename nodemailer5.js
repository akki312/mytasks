const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; 
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
        to: 'sistlaakshith@gmail.com',
        subject: 'Your OTP', 
        text: `Your OTP is: ${otp}` 
    };

   
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}:`, info.response);
    } catch (error) {
        console.error(`Error sending OTP to ${email}:`, error);
    }
}


app.post('/send-otp', async (req, res) => {
    const { emails } = req.body; 
    try {
        for (const email of emails) {
            const otp = generateOTP();
            await sendOTPByEmail(email, otp);
        }
        res.status(200).json({ message: 'OTP emails sent successfully' });
    } catch (error) {
        console.error('Error sending OTP emails:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
